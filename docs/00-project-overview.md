# Trusti Italy — Project Overview

## Purpose
Single-page RC Auto (mandatory Italian car insurance) lead-magnet. Users enter a plate + phone number, instantly see their policy status, and opt in to a renewal reminder call. Trusti is a licensed Italian insurance broker — not an insurer.

## Tech Stack
| Layer | Choice |
|---|---|
| Bundler | Vite 6 |
| Framework | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite` plugin) |
| Animation | `motion/react` (Framer Motion v12) |
| Maps | `d3-geo` + `topojson-client` (Italy regions choropleth) |
| Dev port | **5174** (not 5173 — port conflict) |

## Key File Paths
```
src/
  App.tsx                          — Section composition, provider wrappers
  index.css                        — CSS variables, @theme block, .dark-grid-bg
  i18n/
    messages.ts                    — All copy, 3 locales, as const
    I18nContext.tsx                 — useI18n() hook → { t, locale, setLocale, localeTag }
  theme/
    ThemeContext.tsx                — useTheme() hook → { theme, toggleTheme }
  api/
    checkPlate.ts                  — Mock API, returns RcaResult
  data/
    regionalPrices.ts              — { code, region, eur }[] + helpers (min/max/avg, priceByCode, cheapest/priciest)
    italyRegions.topo.json         — TopoJSON of 20 ISTAT regions (openpolis), bundled for the heatmap
  components/
    shared/
      Container.tsx                — max-w-6xl px-5 sm:px-8 wrapper
      Logo.tsx                     — Theme-aware SVG logo (positive/negative)
      LanguageSwitcher.tsx
      ThemeToggle.tsx
      Tooltip.tsx
      ImagePlaceholder.tsx
      formFocus.ts                 — FOCUS_FORM_EVENT + requestFormFocus()
      icons.tsx                    — Shared SVG icon components
    sections/
      TopBar.tsx / Hero.tsx / LifestyleBand.tsx / GoogleReviews.tsx
      HowItWorks.tsx / WhatIsRca.tsx
      RegionalPricing.tsx / ItalyHeatmap.tsx / RegionalPriceTable.tsx
      Faq.tsx / RepeatCta.tsx / Footer.tsx / ResultCard.tsx
      googleReviews.css            — Scoped CSS for the carousel section
public/
  logo-positive.svg               — Dark wordmark (#191919), used in light mode TopBar
  logo-negative.svg               — White wordmark, used in dark mode TopBar + Footer
  perspective-grid.png            — 10895×2185 RGBA, white grid on transparency
  why-photo.jpg                   — 4896×3264 JPEG, man with phone (LifestyleBand)
```

## Design Tokens (CSS Custom Properties)

Defined in `src/index.css`. Applied via `@theme` block to Tailwind utilities.

### Light mode (`:root`)
| Variable | Value | Tailwind utility |
|---|---|---|
| `--c-page` | `#f9faf5` | `bg-page` / `text-page` |
| `--c-surface` | `#ffffff` | `bg-surface` |
| `--c-muted` | `#f1efe8` | `bg-muted` |
| `--c-text` | `#0a1517` | `text-primary` |
| `--c-text-2` | `#5a6566` | `text-secondary` |
| `--c-text-3` | `#8a9293` | `text-tertiary` |
| `--c-border` | `rgba(10,21,23,0.12)` | `border-border` |
| `--c-action` | `#b9e856` | `bg-action` / `text-action` |
| `--c-on-action` | `#173404` | `text-on-action` |
| `--c-accent` | `#9b5de5` | `bg-accent` / `text-accent` |
| `--c-on-accent` | `#ffffff` | `text-on-accent` |
| `--c-footer-bg` | `#0a1517` | `bg-footer` |
| `--c-footer-text` | `#f9faf5` | `text-footer-text` |

### Dark mode (`[data-theme='dark']`)
Surface becomes `#121f22`, muted `#1a282b`, page `#0a1517`, text `#f9faf5`, border `rgba(249,250,245,0.14)`. Action/accent colours unchanged.

## Typography
- **Heading font:** `Montserrat` → Tailwind `font-heading`
- **Body font:** `Nunito` → Tailwind `font-body` (default body)
- Headings: `font-weight: 600`, `letter-spacing: -0.01em`, `line-height: 1.15`

## Brand Colour Constraints (non-negotiable)
| Colour | Rule |
|---|---|
| Orange | **Banned** — was the Design-system primary, replaced by purple for Italian market |
| Purple `#9b5de5` | Max ~2% of visible screen — accent only (step numbers, focus rings, small badges). **Exception:** the regional heatmap fills regions with a purple ramp (deliberate product choice). |
| Lime green `#b9e856` | Max ~8% of visible screen — action buttons, checkmark/insured badges, hero rating stars |

## Dark-Grid Background Utility
Applied to **Hero** and **Footer** sections. Adds the perspective grid at 20% opacity via `::after` pseudo-element (so content sits above it at full opacity):
```css
.dark-grid-bg { position: relative; }
.dark-grid-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('/perspective-grid.png');
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: 100% auto;
  opacity: 0.2;
  pointer-events: none;
}
```

## i18n System
- **File:** `src/i18n/messages.ts` — single source of truth, `as const`, all 3 locales must have identical keys
- **Locales:** `it` (default), `en`, `bg`
- **Hook:** `useI18n()` → `{ t, locale, setLocale, localeTag }`
- `localeTag` maps locale → BCP-47 tag (`it-IT`, `en-GB`, `bg-BG`) for `Intl` formatting
- Template interpolation: `fmt(template, { key: value })` replaces `{key}` in strings
- Adding a new key: add it to **all three locales simultaneously** or TypeScript will error

## Section Order (App.tsx)
1. `<TopBar />` — sticky header
2. `<Hero />` — dark, plate check form
3. `<LifestyleBand />` — photo + lifestyle copy
4. `<GoogleReviews />` — dark carousel with ratings
5. `<HowItWorks />` — 3 step cards
6. `<RegionalPricing />` — bento grid: interactive Italy heatmap + price stats + factors
7. `<WhatIsRca />` — RC Auto explainer
8. `<Faq />` — details/summary accordion; last answer embeds the regional price table
9. `<RepeatCta />` — muted bg CTA box
10. `<Footer />` — dark, logo + links

## Container Component
```tsx
// mx-auto w-full max-w-6xl px-5 sm:px-8
<Container className="...additional classes...">
```
All sections use `<Container>` for consistent horizontal padding.
