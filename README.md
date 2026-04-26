# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

<div align="center">

# 🌻 Daily Gratitude Journal

**Reflect. Appreciate. Grow.**

*A beautiful, mobile-first web app for building a daily gratitude practice*

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_App-4caf50?style=for-the-badge)](https://gratitude-app-u7dc.vercel.app/)
[![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000?style=for-the-badge&logo=vercel)](https://vercel.com)

</div>

---

## ✨ Features

| Screen | Description |
|--------|-------------|
| 🏠 **Home** | Daily motivational quotes, quick navigation to all sections |
| ✏️ **Daily Entry** | Log 3 things you're grateful for + a journal entry, with date picker |
| 📖 **Past Entries** | Browse, search, and filter all previous entries. Export to `.txt` |
| 📊 **Trends** | Calendar heatmap, streak tracker, weekly chart, top gratitude words, and to-do progress |
| 📝 **To-Do List** | Date-stamped tasks with complete/pending toggle and progress tracking |
| 📸 **My Fav Pics** | Upload and caption your favourite photos |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Eshdo/gratitude-app.git

# 2. Navigate into the project
cd gratitude-app

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder, ready to deploy anywhere.

---

## 🌐 Deployment

This app is deployed for free on **Vercel**.

To deploy your own copy:

1. Fork this repository
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **Add New Project** → Import your fork
4. Leave all settings as default → click **Deploy**

Every push to `main` triggers an automatic re-deploy. ✅

---

## 🛠️ Tech Stack

- **[React 18](https://react.dev)** — UI components and state management
- **[Vite 5](https://vitejs.dev)** — Fast build tool and dev server
- **[Vercel](https://vercel.com)** — Free hosting and CI/CD

No external UI libraries. All components are hand-crafted with inline styles for maximum portability.

---

## 📁 Project Structure

```
gratitude-app/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx              # Root component & navigation
│   ├── index-screen.jsx     # Home / landing screen
│   ├── daily-entry.jsx      # Daily gratitude entry form
│   ├── past-entries.jsx     # Browse & search past entries
│   ├── trends.jsx           # Analytics & trends dashboard
│   ├── todo.jsx             # To-do list
│   ├── my-fav-pics.jsx      # Photo gallery
│   ├── index.js             # React entry point
│   └── index.css            # Global styles
├── index.html
├── vite.config.js
└── package.json
```

---

## 🔮 Planned Features

- [ ] LocalStorage / IndexedDB persistence (data saved between sessions)
- [ ] Dark mode support
- [ ] Push notification reminders
- [ ] Export entries as PDF
- [ ] Mood tracking with emoji ratings
- [ ] Cloud sync with user accounts

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

*"Little things make big days 🌻"*

</div>
