# NOIR ROMA — Luxury Men's Footwear Landing Page

## Original Problem Statement
> Create a landing page for a luxury shoe brand with a sleek product carousel, size guide popup, live chat, testimonials, newsletter signup, and elegant minimal ui. use only relevant images

## User Choices (Dec 2025)
- **Brand name:** NOIR ROMA (Italian editorial luxury feel)
- **Product focus:** Men's oxfords & loafers (implemented as oxfords, derbys, monk-straps — honest to available imagery)
- **Live chat:** AI-powered (Claude Sonnet 4.5 via `emergentintegrations` + `EMERGENT_LLM_KEY`)
- **Newsletter:** UI-only toast confirmation (no backend persistence)
- **Images:** Auto-selected luxury footwear imagery via design guidelines + curated Pexels/Unsplash URLs (each image verified to match the product description)

## Architecture
- **Backend:** FastAPI @ `/api`
  - `GET /api/` — health
  - `POST /api/status`, `GET /api/status` — legacy
  - `POST /api/chat` — `{session_id, message}` → `{session_id, reply}`. Persists both turns to `db.chat_messages`. Uses `LlmChat` with `anthropic/claude-sonnet-4-5-20250929` and a concierge system prompt.
- **Frontend:** React + Tailwind + shadcn/ui
  - `pages/NoirRoma.jsx` composes the page
  - Components: `Header`, `Hero`, `Marquee`, `ProductCarousel`, `Craftsmanship`, `Testimonials`, `Newsletter`, `Footer`, `LiveChat`, `SizeGuideProvider` (Dialog context)
  - `Toaster` from `sonner` for toasts
  - Fonts: Cormorant Garamond (serif), Outfit (body), JetBrains Mono (numerical)

## Design System (from /app/design_guidelines.json)
- **Theme:** Dark editorial (Archetype 5 — Jewel & Luxury)
- **Palette:** `#070707` bg, `#121212` surface, `#F2F0E9` text, `#A69076` accent
- **Radius:** `0px` (sharp rectangles throughout)
- **Layout:** 12-col asymmetric grids, generous whitespace

## Implemented (Dec 2025)
- [x] Fixed glass-blur header with Size Guide trigger + mobile drawer
- [x] Full-viewport hero with "Architettura del Passo" headline, dual CTAs, scroll indicator
- [x] Italian-flavoured marquee strip (Goodyear Welt · Box-Calf Italiano · 120 Passaggi · …)
- [x] Horizontal product carousel (6 products, drag-scroll, animated arrows, per-card add-to-bag toast, N° numbering)
- [x] Craftsmanship section — asymmetric 12-col bento with atelier image, stats (48 / 120 / 1962)
- [x] Testimonials — 3 rotating quotes with dots + arrows, lifestyle bg
- [x] Newsletter — underlined input + arrow button, email validation, success/error toasts
- [x] Massive typographic footer with brand mark
- [x] Floating concierge chat widget (Sheet panel) with real Claude Sonnet 4.5 integration, typing indicator, session persistence via localStorage
- [x] Size Guide dialog — 8 EU/UK/US/CM rows, measurement instructions
- [x] All interactive elements tagged with kebab-case `data-testid`
- [x] Testing agent: **18/18 tests pass** (7 backend + 11 frontend)

## User Personas
- **Primary:** Male collector, 35-60, values craftsmanship over branding, budget €1,000-€2,000 per pair
- **Secondary:** Gift purchaser researching a significant present
- **Tertiary:** Style editorial / journalist researching the brand

## Backlog (Prioritized)
- **P1:** Persist chat history on page reload (fetch prior messages by `session_id` on mount)
- **P1:** Product detail drawer (click a card to see more leather/construction detail, not just Add-to-Bag)
- **P2:** Real cart state (currently count is `0` static)
- **P2:** Newsletter → backend save (Mongo) + double opt-in email (requires email integration)
- **P2:** Atelier appointment booking flow (calendar + backend slot reservation)
- **P3:** Bespoke configurator — pick last, leather, sole, monogram
- **P3:** Stripe integration for actual checkout
- **P3:** Multi-language (IT / EN toggle)

## Environment
- `EMERGENT_LLM_KEY` — injected into `/app/backend/.env`
- `REACT_APP_BACKEND_URL` — used by frontend `axios` calls
- MongoDB collections used: `status_checks`, `chat_messages`

## Test Report
- `/app/test_reports/iteration_1.json` — 100% pass
- `/app/backend/tests/test_noir_roma.py` — backend pytest suite
