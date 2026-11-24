# Geo-Science Society (GSS) Official Web Portal
> **Pan-India Earth Sciences Collegiate Federation** · Uniting 100+ Geology & Geophysics Departments across 19 States.

[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![Lenis](https://img.shields.io/badge/Lenis-Smooth_Scroll-black)](https://lenis.darkroom.engineering/)

---

## 🌍 About Geo-Science Society
The **Geo-Science Society (GSS)** is India’s non-profit, student-led collegiate Earth science federation. Founded in 2021 by student geologists, GSS bridges the gap between classroom theory and real outcrop geology. We democratize field excursions, host national conclaves like **Geogenesis**, publish open thin-section catalogs, and curate authentic geological datasets for university students.

---

## ⚡ Key Highlights & Architecture

### 1. Geological Sub-Surface "Strata" Experience
The web platform is designed around authentic subsurface geological strata with contour lines, depth markers, and a live Brunton Clinometer HUD:
- **Strata 01: Surface Hero & Foundation (`0m` to `-120m`)**: Morphing GSAP pinned scroll showcasing the official Society Emblem, mission statement, and core metrics.
- **Strata 02: Field Activities & Calendar (`-120m` to `-260m`)**: Single-layer horizontal moving card carousel with the signature `#7b9e29` to `#adcd60` green gradient, filter pills, Google Calendar integrations, and event registration.
- **Strata 03: GSS YouTube Talk Shows & Masterclasses (`-260m` to `-420m`)**: Dark broadcast studio theme (`#0E1012`) with official red rounded-corner YouTube play badges, duration counters, view counts, and video modals.
- **Strata 04: Open Mindat.org Mineral Gallery (`-420m` to `-580m`)**: Live mineral search, crystal system filtering, authentic museum specimen photography (Cavansite, Apophyllite, Amethyst, Stilbite, etc.), chemical formulas, and interactive specimen dossiers.
- **Strata 05: Frequently Asked Questions (`-580m`)**: Crisp knowledge base accordion on the website's original ivory background (`#FAF8F5`).
- **Strata 06: Field Dispatch Base & Secretariat**: Interactive dispatch form to contact the Academic Secretariat.

### 2. Single-Layer Moving Card Carousels (`CardsSlider`)
- Strictly renders a single row of cards (eliminating tall, multi-row stacked grids).
- **Auto-Swipe**: Cards continuously advance right-to-left every 4.5–5 seconds.
- **Pause-on-Hover**: Hovering any card halts the auto-swipe timer (`PAUSED (HOVER)`) so users can interact without interruption.
- **Touch & Drag Gestures**: Native touch swiping for smartphones/tablets and drag navigation for desktop.
- **Tactile Chevrons & Telemetry**: Prev/Next buttons, live card counters (`1 - 3 of 6`), and position indicator dots.

### 3. Interactive Geological Brunton Clinometer
- Floating in the bottom-left corner of the interface.
- Tracks real-time scroll depth, rotating compass needle, azimuth strike (`N 45° E · 22° SE`), and dip angle.
- Expandable drawer allows one-click jumping to any subsurface geological waypoint.

### 4. Official GSS Social Channels Connected
Centrally configured in `src/components/SocialIcons.tsx` with authentic SVG badges:
- **YouTube**: [youtube.com/@geo-sciencesociety](https://youtube.com/@geo-sciencesociety?si=NNHT0n_Sl217P)
- **Instagram**: [instagram.com/geoscience_society](https://www.instagram.com/geoscience_society?mdxt=MTJ2a2JuNTk3MXI5ZQ==)
- **LinkedIn**: [linkedin.com/company/geoscience-society](https://lnkd.in/dJMKPJU7)
- **WhatsApp Community**: [GSS Community Hub](https://chat.whatsapp.com/FKcEXAW1NaQGhexqr56GAg)
- **Telegram**: [t.me/geosciencesociety](https://t.me/geosciencesociety)
- **WhatsApp Channel**: [Official Announcement Channel](https://whatsapp.com/channel/0029Vb9FAKL5K3zNwJ72lv40)

---

## 🛠️ Tech Stack & Dependencies

| Category | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 8](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + PostCSS |
| **Animations** | [GSAP 3](https://greensock.com/gsap/) with `ScrollTrigger` |
| **Smooth Scroll** | [@studio-freight/lenis](https://lenis.darkroom.engineering/) |
| **Icons** | [Lucide React](https://lucide.dev/) + Custom Geological SVGs |
| **Confetti** | [canvas-confetti](https://github.com/catdad/canvas-confetti) |
| **Mineral Data** | Powered by [Mindat.org](https://www.mindat.org/) Open Locality Schema |

---

## 📁 Repository Structure

```
geo-science-society-website/
├── public/                     # Static assets, favicon, and brand marks
├── src/
│   ├── components/             # Reusable UI & geological modules
│   │   ├── CardsSlider.tsx     # Single-layer moving card carousel with auto-swipe
│   │   ├── ClinometerCompass.tsx # Floating Brunton clinometer navigation HUD
│   │   ├── FieldBackground.tsx # Geological topography & contour canvas
│   │   ├── FieldTelemetryHud.tsx # Minimal monospace status & coordinates strip
│   │   ├── Footer.tsx          # Grounding footer with socials & directory
│   │   ├── GssEmblem.tsx       # Vector society crest with hammer, chisel & aura
│   │   ├── MindatGallery.tsx   # Interactive mineral repository & specimen modal
│   │   ├── Navbar.tsx          # Sticky glassmorphic navigation header
│   │   ├── SocialIcons.tsx     # Official social media icon library & URLs
│   │   ├── StrataDivider.tsx   # Geological strata horizon depth dividers
│   │   └── Modals/             # JoinModal, SearchModal, VideoModal, etc.
│   ├── data/
│   │   └── gssData.ts          # Authentic dataset (Chapters, Events, Videos, Minerals, FAQs)
│   ├── views/                  # Primary page views
│   │   ├── HomeView.tsx        # Multi-strata homepage with single-layer moving carousels
│   │   ├── AboutView.tsx       # Society constitution, leadership & history
│   │   ├── CommunityView.tsx   # 100+ Collegiate chapters map & directory
│   │   ├── EventsView.tsx      # Conclaves, talk shows, field workshops archive
│   │   ├── LearnView.tsx       # Thin-section microscope & GATE masterclasses
│   │   └── PartnerView.tsx     # Academic and industry partnership portal
│   ├── App.tsx                 # Central router, Lenis smooth scroll & GSAP ticker
│   ├── index.css               # Tailwind CSS v4 design tokens & fonts
│   └── main.tsx                # React root application entry point
├── package.json                # Project dependencies and npm scripts
├── tsconfig.json               # TypeScript strict configuration
└── vite.config.ts              # Vite configuration
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/geo-sciencesociety/geo-science-society-website.git
   cd geo-science-society-website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for production**:
   ```bash
   npm run build
   ```
   The production-optimized static bundle will be generated in the `dist/` directory.

5. **Preview production build**:
   ```bash
   npm run preview
   ```

---

## 📜 License & Acknowledgements
- **Geo-Science Society**: All content, emblems, chapter registries, and event data are property of Geo-Science Society.
- **Mineral Data**: Locality data and mineralogical attributes powered by [Mindat.org](https://www.mindat.org/). Museum specimen photography licensed under Creative Commons via Wikimedia Commons.
- **License**: Released under the MIT License.
