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
app.use(cors({ origin: config.allowedOrigin, credentials: false }));

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
});
