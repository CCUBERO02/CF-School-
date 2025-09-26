import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { config } from './config';
import contactRouter from './routes/contact';

console.log('SMTP host:', config.smtp.host);

const app = express();
app.set('trust proxy', 1);
app.use(helmet());
app.use(express.json());

/** CORS: permite varios orígenes (coma-separados en ALLOWED_ORIGIN) */
const allowed = (config.allowedOrigin || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

const corsOptions: cors.CorsOptions = {
  origin: (origin, cb) => {
    // Permitir requests sin header Origin (curl, monitores, SSR)
    if (!origin) return cb(null, true);
    return cb(null, allowed.includes(origin));
  },
  // si no compartes cookies/autenticación cross-site, déjalo en false
  credentials: false,
};

// Aplica CORS (y preflight explícito por si alguna librería hace OPTIONS)
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/contact', contactRouter);

app.listen(config.port, () => {
  console.log(`API running on http://localhost:${config.port}`);
  console.log('CORS allowed origins:', allowed);
});
