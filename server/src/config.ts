import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  allowedOrigin: process.env.ALLOWED_ORIGIN || 'http://localhost:4200',

  // (kept for compatibility; not used with Resend)
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },

  mail: {
    to: process.env.MAIL_TO || '',
    // Use a sender that Resend accepts (see note below)
    from: process.env.MAIL_FROM || 'Escuela Canina CF <onboarding@resend.dev>',
  },

  // NEW
  resend: {
    apiKey: process.env.RESEND_API_KEY || '',
  },
};
