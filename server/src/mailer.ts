import nodemailer from 'nodemailer';
import { config } from './config';

export function createTransport() {
  return nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.secure,
    auth: { user: config.smtp.user, pass: config.smtp.pass },
  });
}

export async function sendContactEmail(input: {
  name: string; email: string; company?: string; message: string; userAgent?: string; ip?: string;
}) {
  const transporter = createTransport();
  const subject = `New contact from ${input.name} (${input.email})`;
  const html = `
    <h2>CF Solutions — New Contact</h2>
    <ul>
      <li><b>Name:</b> ${input.name}</li>
      <li><b>Email:</b> ${input.email}</li>
      ${input.company ? `<li><b>Company:</b> ${input.company}</li>` : ''}
      <li><b>Message:</b><br/>${input.message.replace(/\\n/g, '<br/>')}</li>
      ${input.userAgent ? `<li><b>UA:</b> ${input.userAgent}</li>` : ''}
      ${input.ip ? `<li><b>IP:</b> ${input.ip}</li>` : ''}
    </ul>
  `;
  await transporter.sendMail({
    from: config.mail.from,
    to: config.mail.to,
    subject,
    html,
    replyTo: input.email,
  });
}
