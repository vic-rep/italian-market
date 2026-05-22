# WhyItMatters

## File
`src/components/sections/WhyItMatters.tsx`

## Purpose
Urgency section: explains the real-world consequences of an expired RC Auto policy (fine + impound). Bridges the "how" explanation with the emotional cost of inaction. Light section with a `bg-muted` background.

## Layout
```tsx
<section className="bg-muted">
  <Container className="grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-14 lg:py-20">
    {/* Copy column */}
    <div className="max-w-xl">
      <span aria-hidden="true" className="block h-1 w-10 rounded-full bg-accent" />
      <h2 className="mt-4 text-2xl text-balance sm:text-3xl">{t.why.heading}</h2>
      <p className="mt-5 text-base leading-relaxed text-secondary sm:text-lg">{t.why.body}</p>
    </div>
    {/* Image column */}
    <ImagePlaceholder
      tone="default"
      aspect="4 / 3"
      caption="Real-world driver moment — everyday, grounded, golden-hour light."
    />
  </Container>
</section>
```

## Visual Details
- **No `id` attribute** — not a nav target
- **Accent stripe:** `block h-1 w-10 rounded-full bg-accent` (`#9b5de5`) — purely decorative, `aria-hidden`. Small enough (~1px × 40px) to stay well within the 2% purple rule.
- **Background:** `bg-muted` (CSS var `--c-muted`, light grey in light mode, darker in dark mode). NOT a dark section — no `dark-grid-bg`.
- **2-column at `lg`:** copy left, image right, centred vertically. Stacks to single column on mobile (copy on top).
- **Image:** currently `ImagePlaceholder` component (placeholder for future real photo). Caption: "Real-world driver moment — everyday, grounded, golden-hour light."

## ImagePlaceholder
Defined in `src/components/shared/ImagePlaceholder.tsx`. Renders a styled `div` with `aspect-ratio`, background colour, and caption text. Drop-in replacement for a real `<img>` once the photo is sourced.

## i18n Copy

### `why.heading`
| IT | EN | BG |
|---|---|---|
| Guidare senza assicurazione non è solo una multa. È la tua auto sul carro attrezzi. | Driving uninsured isn't just a fine. It's your car on a tow truck. | Да караш без застраховка не е само глоба. Това е колата ти на пътна помощ. |

### `why.body`
| IT | EN | BG |
|---|---|---|
| In Italia, una polizza scaduta può voler dire multa, targa sospesa e auto sequestrata. Quasi nessuno salta la scadenza apposta — semplicemente la dimentica. Noi facciamo in modo che non succeda. | In Italy, an expired policy can mean a fine, a suspended plate, and your car impounded. Almost nobody misses the date on purpose — they just forget. We make sure you don't. | В Италия изтекла полица може да означава глоба, спрян регистрационен номер и иззета кола. Почти никой не пропуска датата нарочно — просто забравя. Ние се грижим да не ти се случи. |

## Dependencies
- `useI18n()` — for `t.why.*`
- `Container` shared component
- `ImagePlaceholder` from `src/components/shared/ImagePlaceholder`
