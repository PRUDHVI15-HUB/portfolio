# Prudhvi Chinthapalli — Personal Developer Portfolio

A modern, high-performance developer portfolio built with **React**, **Vite**, and a custom **Vanilla CSS Design System**. Features glassmorphism, dynamic canvas particle animation, responsive layouts, interactive project modals, and a developer-first dark mode aesthetic.

![Portfolio Preview](public/favicon.svg)

---

## 🌟 Key Highlights & Features

- **⚡ Blazing Fast Performance:** Powered by Vite & React with sub-second production builds and zero heavy runtime dependencies.
- **🎨 Custom Design System:** Handcrafted dark theme with curated CSS custom properties, neon cyan (`#06b6d4`) and violet (`#8b5cf6`) accents, and subtle glassmorphic surfaces.
- **🌌 Interactive Particle Canvas:** Physics-based interactive particle constellation in the hero section that reacts to cursor proximity and floating animation.
- **📁 Real Featured Projects:**
  - **[ZenScore AI](https://zenscore-ai.vercel.app/)** — AI-powered developer resume & application scoring platform.
  - **[Projvanta](https://projvanta.vercel.app/)** — Project collaboration & team productivity suite.
  - **[Decentralized Cloud Storage](https://github.com/PRUDHVI15-HUB/A-Novel-Blockchain-Driven-Approach-for-Decentralized-Cloud-Storage)** — Blockchain-driven approach for secure, decentralized IPFS storage.
- **🔍 Deep-Dive Project Modals:** Interactive modals with feature breakdowns, architecture overview, tech tags, and direct live demo & GitHub repository links.
- **💼 Research & Publications Section:** Highlighting academic research contributions in decentralized systems and cloud computing.
- **🛠️ Categorized Skills Matrix:** Interactive category filtering (Frontend, Backend, AI & Data, Tools & DevOps) with proficiency badges.
- **📬 Working Contact Form:** Validated input fields with auto-clearing feedback, mailto fallback, and direct social access (LinkedIn, GitHub, Email).
- **🕹️ Developer Easter Eggs:** Try the **Konami Code** (`↑ ↑ ↓ ↓ ← → ← → B A`) or click on terminal elements for surprise developer interactions!
- **📱 Fully Responsive:** Optimized across mobile, tablet, laptop, and ultra-wide screens.
- **🚀 100% SEO Ready:** Open Graph, Twitter Cards, meta tags, and `robots.txt` configured.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) |
| **Build Tool** | [Vite 8](https://vite.dev/) |
| **Styling** | Vanilla CSS (CSS Variables, Grid, Flexbox, Keyframes) |
| **Icons** | [Lucide React](https://lucide.dev/) + Custom SVG Brand Icons |
| **Fonts** | Inter & JetBrains Mono (via Google Fonts) |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18+ recommended)
- [npm](https://www.npmjs.com/) or `pnpm` / `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/PRUDHVI15-HUB/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```
   The optimized production bundle will be generated in the `dist/` directory.

5. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## 📂 Project Architecture

```
PORTFOLIO/
├── index.html                   # HTML entry point with SEO metadata
├── public/
│   ├── favicon.svg              # Custom CP monogram SVG favicon
│   └── robots.txt               # SEO search bot instructions
├── src/
│   ├── config/
│   │   └── site.js              # Site owner metadata, links & contact info
│   ├── data/
│   │   ├── projects.js          # All portfolio projects, tags, descriptions & links
│   │   ├── skills.js            # Tech skills categorized with mastery levels
│   │   ├── experience.js        # Timeline of roles & academic milestones
│   │   └── research.js          # Research papers & publications
│   ├── hooks/
│   │   └── useScrollReveal.js   # IntersectionObserver hook for fade-in animations
│   ├── components/
│   │   ├── Icons.jsx            # GitHub & LinkedIn SVG brand icons
│   │   ├── Navbar/              # Sticky backdrop navbar with active state & mobile menu
│   │   ├── Hero/                # Hero section with interactive particle canvas & CTAs
│   │   ├── About/               # Bio, terminal profile card, and quick metrics
│   │   ├── Skills/              # Filterable skills grid
│   │   ├── Projects/            # Project cards & comprehensive modal inspector
│   │   ├── Research/            # Academic research publication cards
│   │   ├── Education/           # Education journey & academic achievements
│   │   ├── Contact.jsx          # Contact form with input validation & social badges
│   │   └── Footer.jsx           # Clean footer with quick links & terminal quote
│   ├── App.jsx                  # Main application structure & Easter egg listener
│   ├── index.css                # Global design system, tokens, typography & reset
│   └── main.jsx                 # React root renderer
└── package.json
```

---

## ⚙️ Customization Guide

### Updating Personal Information
Edit [`src/config/site.js`](file:///c:/Users/USER/Documents/PORTFOLIO/src/config/site.js) to modify your name, title, bio, email, GitHub handle, and LinkedIn URL.

### Adding or Modifying Projects
Edit [`src/data/projects.js`](file:///c:/Users/USER/Documents/PORTFOLIO/src/data/projects.js) to add new projects, update screenshots/visual banners, tags, GitHub repositories, or live deployment URLs.

### Updating Skills
Edit [`src/data/skills.js`](file:///c:/Users/USER/Documents/PORTFOLIO/src/data/skills.js) to add new technologies or change categories.

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: developer portfolio"
   git branch -M main
   git remote add origin https://github.com/PRUDHVI15-HUB/portfolio.git
   git push -u origin main
   ```
2. Go to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your `portfolio` repository.
4. Framework Preset will be automatically detected as **Vite**.
5. Click **Deploy**. Your portfolio will be live in seconds!

### Deploy to Netlify

1. Drag and drop the `dist/` folder into [Netlify Drop](https://app.netlify.com/drop), or
2. Connect your GitHub repository with Build Command `npm run build` and Publish Directory `dist`.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Feel free to use and customize it!
