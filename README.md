# Trusti Italy — RC Auto Landing Page

Marketing and lead-capture site for Trusti's Italian market. Lets drivers check their RC Auto (mandatory car insurance) status by plate number, compare insurers, and get a renewal reminder call.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 + TypeScript |
| Styling | Tailwind CSS v4 via `@tailwindcss/postcss` |
| Fonts | `next/font/google` — Montserrat (headings), Nunito (body) |
| Animation | Motion (formerly Framer Motion) |
| Maps | D3-geo + TopoJSON — regional price heatmap |

---

## Getting started

```bash
npm install
npm run dev        # dev server at http://localhost:5174
npm run build      # production build → .next/
npm start          # serve the production build
npm run typecheck  # type-check without emitting
```

---

## Project structure

```
app/                          # Next.js App Router — routes + root layout
├── layout.tsx                # Root layout: providers, fonts, pre-paint script
├── globals.css               # Tailwind base + design tokens
├── page.tsx                  # /        → HomePage
├── about/page.tsx            # /about   → AboutPage
├── contact/page.tsx          # /contact → ContactPage
├── privacy/page.tsx          # /privacy → PrivacyPage
├── terms/page.tsx            # /terms   → TermsPage
└── cookies/page.tsx          # /cookies → CookiesPage

src/
├── api/
│   └── checkPlate.ts         # Plate-check API call (mock-ready)
├── components/
│   ├── sections/             # Page-level sections (Hero, TopBar, Footer, ...)
│   └── shared/               # Reusable UI primitives (Container, Tooltip, icons, ...)
├── data/                     # Static data (regional prices, TopoJSON)
├── i18n/
│   ├── messages.ts           # All copy, written natively in IT / EN / BG
│   └── I18nContext.tsx       # Locale provider + useI18n hook
├── views/                    # Page-level components rendered by app/* routes
│   ├── HomePage.tsx          # Main lead-magnet page
│   ├── AboutPage.tsx         # Company / about page
│   ├── ContactPage.tsx       # Placeholder
│   ├── PrivacyPage.tsx       # Placeholder
│   ├── TermsPage.tsx         # Placeholder
│   └── CookiesPage.tsx       # Placeholder
└── theme/
    └── ThemeContext.tsx      # Light / dark theme provider
```

> The page-level components live in `src/views/` rather than `src/pages/` to avoid colliding with Next.js's Pages Router auto-detection.

---

## Routes

| Route | Description |
|---|---|
| `/` | Home — plate checker, how it works, RCA explainer, price heatmap, FAQ |
| `/about` | Company story, team, licence, European ambition |
| `/contact` | Placeholder |
| `/privacy` | Placeholder |
| `/terms` | Placeholder |
| `/cookies` | Placeholder |

All routes are statically prerendered at build time (`○ (Static)`).

---

## Server / Client components

The app uses App Router but most of the work runs client-side: every section under `src/components/sections/` and both context providers (`I18nContext`, `ThemeContext`) are marked `'use client'`. The route files under `app/` stay as thin Server Component wrappers that import and render the corresponding client view.

This is intentional: `localStorage`-backed theme and locale, the Motion animations, the d3-geo heatmap, and the plate-check form all need to run on the client.

---

## Internationalisation

All copy lives in `src/i18n/messages.ts`, written natively per language — not machine-translated. Default locale is `it` (Italian). Supported locales: `it`, `en`, `bg`.

To add a locale: add an entry to `messages`, `LOCALES`, and `LOCALE_LABELS` in `messages.ts`.

The active locale is persisted to `localStorage` under `trusti-locale` and applied to `<html lang>` by a pre-paint script in the root layout, so the document language is correct before React hydrates.

---

## Theming

Light/dark theme is a CSS-variable swap on `[data-theme]`. The persisted theme is loaded from `localStorage` (key `trusti-theme`) by an inline script in `<head>` *before* paint, so there's no flash of the wrong theme. After hydration, `ThemeContext` syncs React state from `localStorage` in an effect — this keeps SSR and the initial client render in agreement.

---

## Design tokens

Colours, typography scale, and component tokens are defined as CSS custom properties in `app/globals.css`. Light and dark themes are both declared there — the `[data-theme="dark"]` selector overrides the defaults. See `DESIGN_RULES.md` for guardrails specific to this project.

---

## Navigation behaviour

The top bar is `position: fixed`. At the very top of the page it is transparent with controls only (language + theme). On scroll down it hides; on scroll up it reappears with a frosted background and nav links. This keeps the dark hero sections full-bleed without a white bar breaking them.
