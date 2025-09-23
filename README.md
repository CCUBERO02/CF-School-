<<<<<<< HEAD
# CF Solutions — Marketing Site (Angular + Node.js)

This mono-repo contains an Angular marketing site and a Node.js API that sends contact emails.

## Local Development
1. **Server**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Set your SMTP credentials in .env
   npm run dev
   ```

2. **Client**
   ```bash
   cd client
   npm install
   npm start
   ```
   - Client runs on http://localhost:4200
   - API runs on http://localhost:3000 (proxied via /api)

## Production
- Set environment variables on your host (Render, Railway, Fly.io, Docker, etc.).
- Build server:
  ```bash
  cd server
  npm install && npm run build && npm start
  ```
- Build client:
  ```bash
  cd client
  npm install && npm run build
  ```
  Deploy `client/dist/cf-client` to static hosting, or serve behind a reverse proxy alongside the API.

### SMTP Providers
Use any SMTP provider. For Gmail, create an App Password. For higher deliverability, prefer a transactional provider (SendGrid, Mailgun, AWS SES).

### Next Steps
- Add analytics (Plausible or Google Analytics) by inserting the script tag in `client/src/index.html`.
- Add reCAPTCHA v3 if spam increases.
- Add tests (Jasmine/Karma for Angular; Vitest/Jest for server).
- Containerize with Docker, or one-click deploy to Render/Railway.
=======
# CFSolutions-WebPage
>>>>>>> bc3c85c1 (Initial commit)
