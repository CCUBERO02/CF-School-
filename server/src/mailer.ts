// server/src/mailer.ts
import { config } from './config';

// Tip: en Resend, "reply_to" es admitido.
type ContactInput = {
  name: string;
  email: string;
  company?: string;
  message: string;
  userAgent?: string;
  ip?: string;
};

export async function sendContactEmail(input: ContactInput) {
  const subject = `Nuevo contacto - Escuela Canina CF: ${input.name}`;

  const text = `
Nombre: ${input.name}
Email: ${input.email}
Raza/Empresa: ${input.company || '-'}
Mensaje:
${input.message}

UA: ${input.userAgent || '-'}
IP: ${input.ip || '-'}
  `.trim();

  const html = `
    <h2>Escuela Canina CF — Nuevo contacto</h2>
    <ul>
      <li><b>Nombre:</b> ${escapeHtml(input.name)}</li>
      <li><b>Email:</b> ${escapeHtml(input.email)}</li>
      ${input.company ? `<li><b>Raza/Empresa:</b> ${escapeHtml(input.company)}</li>` : ''}
      <li><b>Mensaje:</b><br/>${escapeHtml(input.message).replace(/\\n/g,'<br/>')}</li>
      ${input.userAgent ? `<li><b>UA:</b> ${escapeHtml(input.userAgent)}</li>` : ''}
      ${input.ip ? `<li><b>IP:</b> ${escapeHtml(input.ip)}</li>` : ''}
    </ul>
  `;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.resend.apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: config.mail.from,   // remitente verificado en Resend
      to: config.mail.to,       // puede ser string o array
      subject,
      html,
      text,
      // para contestar al cliente directo
      reply_to: input.email
    })
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend ${res.status}: ${body}`);
  }

  return res.json();
}

// util sencillo para evitar inyección en HTML
function escapeHtml(s: string) {
  return s
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}
