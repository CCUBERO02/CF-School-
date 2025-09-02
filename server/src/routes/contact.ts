import { Router } from 'express';
import { z } from 'zod';
import { sendContactEmail } from '../mailer';

const router = Router();

const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().max(120).optional(),
  message: z.string().min(10).max(5000),
  website: z.string().optional() // honeypot
});

router.post('/', async (req, res) => {
  try {
    if (typeof req.body.website === 'string' && req.body.website.trim() !== '') {
      return res.status(200).json({ ok: true });
    }
    const parsed = ContactSchema.parse(req.body);
    await sendContactEmail({
      ...parsed,
      userAgent: req.headers['user-agent'] as string,
      ip: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || undefined,
    });
    res.json({ ok: true });
  } catch (err: any) {
    if (err?.issues) return res.status(400).json({ ok: false, error: 'Invalid input', details: err.issues });
    console.error('Contact error', err);
    res.status(500).json({ ok: false, error: 'Internal error' });
  }
});

export default router;
