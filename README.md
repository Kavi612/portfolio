# Kavii Portfolio

Personal portfolio of **Kavirathna Velmurugan (Kavii)** — AI/ML Engineer, Full Stack Developer, AWS Certified.

## Tech Stack

- React 18 + Vite
- Tailwind CSS
- Framer Motion
- Three.js + React Three Fiber + Drei
- Lucide React

## Prerequisites

- Node.js 18+ (recommended)
- npm

## Run Locally

```bash
# 1. Go to the project folder
cd "path/to/protfolio"

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open the URL shown in the terminal (usually **http://localhost:5173**).

### Other commands

```bash
# Production build
npm run build

# Preview the production build locally
npm run preview
```

## Project Structure

```text
src/
  components/
    layout/      → Navbar, Footer
    sections/    → Hero, About, Projects, Skills, Experience, Certifications, Contact
    ui/          → Globe, cards, loader, badges, timeline
  data/          → portfolioData.js
  hooks/         → useTypewriter.js
  styles/        → globals.css
  assets/projects/ → project screenshots
```

## Optional: Resume PDF

Place your resume file at:

```text
public/resume.pdf
```

The **Download Resume** button in the Hero links to `/resume.pdf`.

## Deploy Manually to Vercel

### Option A — Deploy from GitHub (recommended)

1. Create a new GitHub repository named `kavii-portfolio` (under `Kavi612`).
2. In the project folder, push the code:

```bash
git remote add origin https://github.com/Kavi612/kavii-portfolio.git
git branch -M main
git push -u origin main
```

> If `git remote add` fails because origin already exists, use:
>
> ```bash
> git remote set-url origin https://github.com/Kavi612/kavii-portfolio.git
> git push -u origin main
> ```

3. Go to [vercel.com](https://vercel.com) → **Add New Project**.
4. Import **kavii-portfolio** from GitHub.
5. Use these settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
6. Click **Deploy**.
7. After deploy, optionally set domain to `kavirathna.vercel.app` (or keep the generated URL).

### Option B — Deploy with Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
vercel --prod
```

## After Deploy

Update these with your live URL:

1. `index.html` → `og:url`, `twitter:url`, and canonical link  
2. `src/components/sections/Contact.jsx` → `portfolio` URL  
3. Add the live portfolio link to your resume and LinkedIn  

Live URL: **https://kavii-portfolio-henna.vercel.app**

## Contact Form Note

The contact form uses [FormSubmit](https://formsubmit.co) with a mailto fallback.  
The first submission to FormSubmit may require email confirmation for `kavirathna125@gmail.com`.

## License

Personal portfolio — all rights reserved.
