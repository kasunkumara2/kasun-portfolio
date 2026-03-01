# Kasun Portfolio + Admin Panel (Next.js)

Modern, dark-neon portfolio website with a private admin panel to update content (projects, profile, images) and instantly reflect on the public site.

## ✨ Features

- **Modern UI**: dark + neon (purple/pink/cyan) glassmorphism style
- **Hero “anime vibe”**: background image + animated lines + subtle motion
- **Portfolio**: filter by category, featured projects, project detail pages
- **Contact form**: stores messages in DB (view from Admin)
- **Admin panel** (private):
  - Login + logout
  - Edit **Profile** (headline, about, contacts, socials, hero images)
  - Manage **Categories**
  - Manage **Projects** (Design / Photo / Video)
  - Upload images (Cloudinary recommended; local fallback for dev)

---

## 1) Requirements

- Node.js **18+**
- npm / pnpm / yarn (examples use npm)

---

## 2) Setup (Local)

```bash
npm install
cp .env.example .env
```

Edit `.env`:

- Set `ADMIN_EMAIL` and `ADMIN_PASSWORD`
- Set `JWT_SECRET` (random long string)

Then migrate + seed:

```bash
npm run db:migrate
npm run db:seed
npm run dev
```

Open:

- Public site: http://localhost:3000
- Admin: http://localhost:3000/admin/login

---

## 3) Uploads (Recommended)

For production, configure **Cloudinary**:

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

If Cloudinary is NOT configured, uploads will be saved into `/public/uploads` (OK for local dev, not recommended for serverless hosting like Vercel).

---

## 4) Deploy

### Option A: Vercel (recommended)
- Push the project to GitHub
- Import into Vercel
- Use a hosted DB (Postgres) like Neon / Supabase
- Update `DATABASE_URL` in Vercel env variables
- Run Prisma migrations on deployment (use Vercel build command or CI)

### Option B: VPS (Node)
- Use Postgres or SQLite
- Run `npm run build` and `npm start`

---

## 5) Customize the Theme

Main theme colors are in:

- `tailwind.config.ts`
- `app/globals.css`

Assets (hero background, avatar, CV) are in:

- `public/assets/*`

---

## Security notes

- Change default admin password immediately.
- Keep `JWT_SECRET` private.
- Use HTTPS in production.

---

Made for Kasun.
