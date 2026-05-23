# Trusti Italy — RC Auto Landing Page

Marketing and lead-capture site for Trusti's Italian market. Lets drivers check their RC Auto (mandatory car insurance) status by plate number, compare insurers, and get a renewal reminder call.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS v4 (CSS custom properties, no config file) |
| Routing | React Router v7 |
| Animation | Motion (formerly Framer Motion) |
| Maps | D3-geo + TopoJSON — regional price heatmap |

---

## Getting started

```bash
npm install
npm run dev        # dev server at http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview the production build locally
npm run typecheck  # type-check without emitting
```

---

## Project structure

```
src/
├── api/
│   └── checkPlate.ts       # Plate-check API call (mock-ready)
├── components/
│   ├── sections/           # Page-level sections (Hero, TopBar, Footer, ...)
│   └── shared/             # Reusable UI primitives (Container, Tooltip, icons, ...)
├── data/                   # Static data (regional prices, TopoJSON)
├── i18n/
│   ├── messages.ts         # All copy, written natively in IT / EN / BG
│   └── I18nContext.tsx     # Locale provider + useI18n hook
├── pages/
│   ├── HomePage.tsx        # Main lead-magnet page
│   ├── AboutPage.tsx       # Company / about page
│   ├── ContactPage.tsx     # Placeholder
│   ├── PrivacyPage.tsx     # Placeholder
│   ├── TermsPage.tsx       # Placeholder
│   └── CookiesPage.tsx     # Placeholder
├── theme/
│   └── ThemeContext.tsx     # Light / dark theme provider
└── index.css               # Tailwind base + design tokens (OKLCH colour palette)
```

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — plate checker, how it works, RCA explainer, price heatmap, FAQ |
| `/about` | Company story, team, licence, European ambition |
| `/contact` | Placeholder |
| `/privacy` | Placeholder |
| `/terms` | Placeholder |
| `/cookies` | Placeholder |

---

## Internationalisation

All copy lives in `src/i18n/messages.ts`, written natively per language — not machine-translated. Default locale is `it` (Italian). Supported locales: `it`, `en`, `bg`.

To add a locale: add an entry to `messages`, `LOCALES`, and `LOCALE_LABELS` in `messages.ts`.

---

## Design tokens

Colours, typography scale, and component tokens are defined as CSS custom properties in `src/index.css`. Light and dark themes are both declared there — the `[data-theme="dark"]` selector overrides the defaults. See `DESIGN_RULES.md` for guardrails specific to this project.

---

## Navigation behaviour

The top bar is `position: fixed`. At the very top of the page it is transparent with controls only (language + theme). On scroll down it hides; on scroll up it reappears with a frosted background and nav links. This keeps the dark hero sections full-bleed without a white bar breaking them.
