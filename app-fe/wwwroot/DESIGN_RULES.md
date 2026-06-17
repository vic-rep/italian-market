# Trusti Design Rules

Working reference for all UI/design decisions on this project. Rules marked **non-negotiable** cannot be overridden without a product decision.

---

## 1. Color palette

| Token | Hex | Role |
|---|---|---|
| Porcelain | `#F9FAF5` | Light page background |
| Olive black | `#0A1517` | Dark bg · ink · footer |
| Clarity green | `#B9E856` | Action / CTA; text on green `#173404` |
| Lavender | `#9B5DE5` | Accent only; white text on large display text only |

**No other colors.** The brand is mid-rebrand. **Orange is the legacy color — banned entirely.**

---

## 2. Color balance — **non-negotiable**

Every screen must respect this ratio:

| Layer | Budget | What goes here |
|---|---|---|
| Surface | ~60% | `bg-page` / `bg-surface` / `bg-muted` / `bg-footer` |
| Subject | ~30% | Readable text blocks, images, illustrations |
| Action green | ≤ 8% | CTA buttons, data-viz bars, stat numbers |
| Accent purple | ≤ 2% | Small decorative lines, icon fills, thin badges |

Violating the 2% purple or 8% green caps makes pages feel branded rather than readable. Stay well under both.

---

## 3. Section backgrounds — **non-negotiable**

- **Never** apply `bg-accent` (purple) or `bg-action` (green) to a full `<section>` element.
- Coloured fills are permitted only on **contained elements within a neutral section**: cards (`rounded-2xl`), buttons, badges, icon circles, decorative lines, data-viz elements.
- Allowed section backgrounds: `bg-page`, `bg-muted`, `bg-surface`, `bg-footer`.

> Wrong: `<section className="bg-accent">…</section>`
> Right: `<section className="bg-muted"><div className="rounded-2xl bg-accent p-6">…</div></section>`

But even a card with `bg-accent` must stay within the 2% purple budget across the whole page.

---

## 4. Theme

- **Light is the default.** Porcelain canvas. Dark mode is opt-in via the theme toggle.
- **Hero exception (home page):** the home-page hero intentionally uses `bg-footer` (olive dark) — explicit product decision, not a pattern to repeat everywhere.
- **About page hero:** also `bg-footer` dark — intentional, matches the home-page entry beat.
- Every other section uses light-default tokens.

### Dark mode implementation

Use semantic CSS custom properties (`--c-page`, `--c-surface`, etc.) — they swap automatically on `[data-theme='dark']`. Never hardcode hex values or use `dark:` Tailwind variants; let the token layer do the work.

**Stats band dark-mode rule:** the olive stats band (`bg-stats-band`) must remain visually distinct from the `bg-page` olive in dark mode. Achieved via `--c-stats-band: #121f22` in dark + `border-y border-border`.

---

## 5. Typography

| Role | Family | Weights |
|---|---|---|
| Headings `h1`–`h4` | Montserrat | 500, 600, 700 |
| Body, UI | Nunito | 400, 500, 600, 700 |

- `h1` appears exactly once per page.
- Heading order must be logical (`h1 → h2 → h3`) — never skip levels for styling purposes.
- Use `letter-spacing: -0.01em` and `line-height: 1.15` on headings (set globally in `index.css`).

---

## 6. Contrast & accessibility — **non-negotiable**

- **Purple `#9B5DE5` + white text:** scores ~4.1:1 — passes AA only for **large text** (≥ 18px bold / ≥ 24px regular). Never place normal body copy directly on purple fill. Put body text on a surface card instead.
- All other color pairs must meet WCAG AA (4.5:1 normal, 3:1 large).
- Logical heading order on every page.
- All images need descriptive `alt` text.
- Interactive elements must be keyboard-reachable with a visible `:focus-visible` ring (2px `--c-accent` outline, set globally).
- Accordion/disclosure: use `<button>` with `aria-expanded`, not `<details>/<summary>`.

---

## 7. Layout & responsive

- **Mobile-first.** Base styles target small screens; `sm:` / `lg:` breakpoints add complexity upward.
- All two-column rows collapse to a single stack on small screens (`grid-cols-1` default, `lg:grid-cols-2`).
- Max content width: `max-w-6xl` for standard sections, `max-w-3xl` for centred narrow sections, `max-w-2xl` for centred text-only.
- Standard section vertical padding: `py-16 lg:py-24` for hero; `py-16` for body sections; `py-14` for bands.
- Use `Container` (`mx-auto max-w-6xl px-5 sm:px-8`) for all section content — never `w-full` without a container wrapper.

---

## 8. Copy & content rules — **non-negotiable**

- **No AI language** anywhere — no "AI-powered", "AI broker", "chatbot", or "AI-enhanced." The promise is "a real person answers."
- **Banned vocabulary:** seamless · revolutionary · cutting-edge · game-changing · disruptive · leverage · ecosystem · unlock · empower · robust · streamline · peace of mind · your trusted partner · we've got you covered · loved ones · valued customer.
- **Google rating appears exactly once** on a page — in the social-proof block, as written reviews. Never a row of star-avatars, never repeated. (Repetition reads as fake in Italy.)
- Stats are real numbers: 14,000 customers · 30+ people · 4.9 Google rating · 981 reviews · reg. №936-ЗБ/05.06.2024.
- **Justify data asks:** plate and phone fields both carry tooltips explaining why the data is needed. Privacy microcopy below the form.

---

## 9. Data visualisation

- **Regional heatmap:** uses the accent **purple** ramp (not green). This is a deliberate exception to the 2% cap for the choropleth specifically — the map is a contained data element, not a UI surface.
- Green (`#B9E856`) is reserved for CTA buttons and stat numbers. Do not use it for map fills.

---

## 10. Component patterns

### Buttons
- Primary CTA: `bg-action text-on-action rounded-xl px-8 py-4 font-semibold` — green, always.
- Destructive / secondary patterns: TBD when needed.
- Buttons never use purple as background.

### Cards
- Standard: `rounded-2xl border border-border bg-surface p-6`.
- Accent card (purple, use sparingly — watch the 2% budget): `rounded-2xl bg-accent p-6 text-on-accent` — white body text only if font-size is large; otherwise use `text-on-accent` on a nested surface.

### Accordion / FAQ
- Implemented with `<button aria-expanded>` + controlled `useState`, not `<details>`.
- Chevron rotates 180° on open (`rotate-180`).
- Border separator: `border-b border-border`.

### Image placeholders
- Rendered as `rounded-2xl bg-muted` with `role="img"` and `aria-label` describing the photography brief.
- Caption text in `text-tertiary`.
- Always sized with an explicit aspect-ratio class so layout doesn't shift when real images drop in.

---

## 11. i18n

- Three locales: `en`, `it` (default), `bg`.
- All copy lives in `src/i18n/messages.ts` — no hardcoded strings in components.
- `Dictionary` type is derived from `messages.it`; all three locales must have identical key shapes.
- IT and BG copy is written natively — never machine-translated.
- Proper nouns that do not translate: `Trusti`, `Financial Supervisory Commission`, `№936-ЗБ/05.06.2024`.
- Country names follow each language's convention: IT → `Italia`/`Bulgaria`; BG → `Италия`/`България`.

---

## 12. Assets

- Logos: `logo-positive.svg` (light theme), `logo-negative.svg` (dark theme / footer).
- Perspective grid overlay (`.dark-grid-bg`): white grid lines on transparency, anchored bottom-center. Used on `bg-footer` sections only.
- Certificate badge: SVG placeholder until the real FSC asset is provided. Reg. №936-ЗБ/05.06.2024.
- Photography direction: human-first, real people, warm natural light, technology shown with a human hand, authentic diversity. No corporate stock.
