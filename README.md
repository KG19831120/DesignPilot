# ⚡ DesignPilot

> AI-powered low-code UI component generator. Describe what you want → Get production-ready React + Tailwind CSS code.

![Version](https://img.shields.io/badge/version-1.0.0--MVP-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Built](https://img.shields.io/badge/built-4%20hours%20⚡-indigo)

---

## 🎯 What is DesignPilot?

DesignPilot is an AI-powered tool that generates production-ready UI components from natural language descriptions. It's inspired by the vision of Claude Design (Anthropic Labs) but focused on **code output** rather than design mockups.

**Built as part of the AI Incubator Broker daily pipeline** — scanning trending AI products on Product Hunt and rapidly building MVPs.

## ✨ Features

- **Natural Language → Code**: Describe what you want, get React + Tailwind CSS code
- **6 Component Types**: Button, Card, Navbar, Hero, Form, Pricing Table
- **Live Preview**: See your component rendered instantly
- **One-Click Copy**: Copy code directly to clipboard
- **HTML Export**: Download as standalone HTML file
- **Dark Mode UI**: Beautiful dark interface built with Tailwind
- **Quick Start Prompts**: One-click presets for common components
- **Generation History**: Browse and reload past generations

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/KG19831120/DesignPilot.git
cd DesignPilot

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS 3 |
| Language | JavaScript (ES6+) |
| Icons | Native Unicode |
| Fonts | Inter (Google Fonts) |

## 📦 Component Library

| Component | Description | Best For |
|-----------|-------------|----------|
| **Button** | Customizable buttons with color & size variants | CTAs, actions |
| **Card** | Content cards with optional glass morphism | Product features, testimonials |
| **Navbar** | Navigation bars with brand & CTA | Headers, menus |
| **Hero** | Landing page hero sections | First impressions |
| **Form** | Login, signup, contact forms | User onboarding |
| **Pricing** | Pricing table with 3 tiers | SaaS pricing pages |

## 🎨 Usage

1. **Select a component type** from the left sidebar
2. **Describe what you want** in the prompt bar (or use Quick Start)
3. **Click Generate** → See your component rendered
4. **Switch to Code tab** → Copy the React + Tailwind code
5. **Export as HTML** → Download a standalone preview

## 💡 Example Prompts

- `"a glassmorphism pricing card for a SaaS"`
- `"danger red delete button"`
- `"hero section for AI product"`
- `"login form with email and password"`

## 📁 Project Structure

```
DesignPilot/
├── index.html          # Entry HTML
├── package.json
├── tailwind.config.js  # Tailwind configuration
├── vite.config.js
└── src/
    ├── main.jsx        # React entry
    ├── index.css       # Global styles + Tailwind
    └── App.jsx         # Main application
```

## 🔗 Links

- **Live Demo**: https://KG19831120.github.io/DesignPilot
- **GitHub**: https://github.com/KG19831120/DesignPilot

## 📅 Build Info

- **Built**: 2026-04-19 (AI Incubator Pipeline)
- **Inspiration**: Claude Design by Anthropic Labs (Product Hunt #1, April 18 2026)
- **Cycle**: CEO scan → Engineer build → QA test → Ship

---

*Built with ⚡ by the AI Incubator Broker*
