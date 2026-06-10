# 🎨 Premium Creative Portfolio - Darious J

Welcome to the premium React + Vite portfolio website built for **Darious J** (Creative Director, Video Editor & Graphic Designer). The website features sleek aesthetics, glassmorphism, dynamic motion cards, auto-playing YouTube preview clips, and a custom data management system.

---

## ✨ Features

- **Rich Aesthetics**: Vibrant, curated color themes, modern typography, glassmorphism filters, and smooth micro-animations.
- **Dynamic YouTube Grid**: Inline auto-playing muted preview loops with pointer-events protection, preventing users from clicking/pausing video overlays inside the gallery grid.
- **Infinite Testimonials Scroll**: Seamless looping marquee showcasing client reviews.
- **Interactive Playback Modal**: Click any card in the portfolio to open a modal that mounts a fully functional YouTube embed player allowing audio playback and video controls.
- **Swipe-Down Shorts Stack**: Slow, smooth transition stack animation for mobile-optimized vertical videos.
- **Clean Architecture**: Decoupled database state, allowing simple client-side updates without editing components directly.

---

## 🛠️ Data Architecture (JSON Databases)

All project records, client reviews, and editing tools are externalized in `/src/data/` for easy management:

- 📂 **[portfolio.json](src/data/portfolio.json)**: Manage your main project categories (`motion`, `short`, `ai`, `video`), YouTube IDs, aspect ratios, and grid column configurations.
- 📂 **[testimonials.json](src/data/testimonials.json)**: Manage your active client testimonials list (quotes, names, roles, avatar images).
- 📂 **[skills.json](src/data/skills.json)**: Manage software skills (names, shorthand abbreviations, customized badge colors, custom icon flags).

---

## 🖥️ Database TUI Manager

We have included a custom Text User Interface (TUI) tool to let you view and update your databases directly from your command-line environment.

### Launching the TUI Data Manager
Open your terminal and run:
```bash
npm run manage-data
```

### Capabilities
- 💼 **Manage Portfolio Items**: List, add, edit, or delete gallery cards and YouTube previews.
- 💬 **Manage Client Testimonials**: List, add, edit, or delete testimonials.
- 🛠️ **Manage Software Skills**: List, add, edit, or delete editing arsenal badges.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
Clone the repository, navigate to the folder, and run:
```bash
npm install
```

### Running Locally (Development)
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

### Previewing the Production Build
```bash
npm run preview
```
