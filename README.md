# NoirRoma

> **A luxury men's footwear landing page with an integrated AI concierge — where Italian craftsmanship meets modern intelligence.**

![NoirRoma Hero](https://images.unsplash.com/photo-1542060775-16c10d9617cd?q=80&w=1600&auto=format&fit=crop)

---

## Overview

NoirRoma is a high-fidelity, production-ready landing page for a bespoke Italian footwear brand. Designed with a dark, editorial aesthetic inspired by the finest fashion houses, it combines immersive storytelling with a real-time AI concierge powered by **Google Gemini Flash**.

The concierge assists customers with fit consultations, leather care advice, style pairings, and sizing — all within a seamless, conversational interface embedded directly in the page.

---

## Features

| Feature | Description |
|---|---|
| 🤖 **AI Concierge** | Real-time chat powered by Gemini Flash for fit, care, and style advice |
| 🎠 **Product Carousel** | Interactive showcase of curated collections (Oxfords, Loafers, Derbys) |
| 📐 **Size Guide** | Comprehensive global sizing charts (EU / UK / US / CM) |
| 🎨 **Editorial Design** | Dark, luxury UI with refined typography and micro-interactions |
| 📱 **Fully Responsive** | Optimized for mobile, tablet, and widescreen desktop |
| ✨ **Micro-animations** | Smooth hover effects and transitions for a premium tactile feel |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 18 |
| **Styling** | Tailwind CSS 3, tailwindcss-animate |
| **Component Library** | shadcn/ui (Radix UI primitives) |
| **AI Integration** | `@google/genai` (Gemini Flash) |
| **Routing** | React Router DOM v6 |
| **Build Tool** | Create React App + CRACO |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

---

## Project Structure

```
NoirRoma/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities and helpers
│   │   ├── pages/          # Page-level components
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
├── design_guidelines.json  # Brand and design tokens
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- A **Google AI (Gemini) API Key** — get one free at [aistudio.google.com](https://aistudio.google.com/app/apikey)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/your-username/noir-roma.git
cd noir-roma/frontend
```

**2. Install dependencies**
```bash
npm install
```

**3. Configure environment variables**

Create a `.env` file in the `frontend/` directory:
```env
REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
```

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

**4. Start the development server**
```bash
npm start
```

The app will be available at `http://localhost:3000`.

---

## Deployment

This project is pre-configured for zero-configuration deployment on **Vercel**.

1. Push your repository to GitHub.
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repo.
3. Set the **Root Directory** to `frontend`.
4. Under **Environment Variables**, add:
   ```
   REACT_APP_GEMINI_API_KEY = your_gemini_api_key_here
   ```
5. Click **Deploy**.

Vercel will automatically detect the Create React App setup and handle the build.

---

## AI Concierge

The embedded concierge is powered by **Gemini Flash** via the Google GenAI SDK. It is configured as a knowledgeable luxury footwear specialist, capable of:

- Recommending the right last and fit for a customer's foot shape
- Explaining leather grades, tanning methods, and care routines
- Advising on style pairings (business, black tie, casual)
- Answering sizing questions across international standards

Conversation context is preserved in-session for a coherent, natural dialogue flow. The integration runs entirely client-side with no backend required.

---

## License

This project is licensed under the **MIT License**.  
See [`LICENSE`](./LICENSE) for details.

---

<p align="center">
  <em>Crafted for the modern gentleman. Powered by intelligence. Built with NoirRoma.</em>
</p>
