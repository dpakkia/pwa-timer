# ⏱️ PWA Work Phase Timer

A beautiful, minimalist **Progressive Web App** for managing work/editing sessions using custom Pomodoro-style phases.

Built with **React**, **Tailwind CSS**, **Vite**, and installable as a PWA on both desktop and mobile.

---

## 🧠 Features

- 🔵 Circular timer with animated bottom-up fill
- 🎯 Phases: `Work (45 min)` → `Stand Up (10 min)` → `Break (5 min)`
- ⏯️ Tap to pause/resume
- ✋ Long-press opens a floating menu:
  - 🔁 Reset current phase
  - ⏭ Skip phase
  - ✅ End day (coming soon: QR or summary view)
- 💡 Works offline thanks to PWA support
- 📱 Mobile-first UI, installable on any device

---

## 🛠 Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS (via plugin)](https://tailwindcss.com/docs/installation/using-vite)
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/)

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run the app locally
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📦 PWA Manifest

Includes:
- Icons: `192x192`, `512x512`
- Theme color
- Install support for desktop and mobile

---

## 📁 Project Structure

```
src/
  ├── App.tsx          # Main layout wrapper
  ├── TimerApp.tsx     # Timer logic & UI
  ├── index.css        # Tailwind CSS imports
  └── main.tsx         # Entry point
vite.config.ts         # Vite config with Tailwind & PWA
public/icons/          # App icons (for manifest)
```

---

## 📄 License

MIT — use, modify, share freely 🙌

---

## 🧪 Next Features (Coming Soon)

- Show QR code on End Day
- Add sound or vibration feedback
- Visual statistics / phase history
- Dark mode and animations
