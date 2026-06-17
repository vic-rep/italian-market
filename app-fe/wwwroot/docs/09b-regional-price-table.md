# RegionalPriceTable

## File
`src/components/sections/RegionalPriceTable.tsx`

A small presentational table of all 20 regions and their average RC Auto premium, most-expensive first. Rendered as the answer to the "How much is RC Auto in my region?" FAQ (see `docs/09-faq.md`).

## Purpose
Holds the full per-region figures that the bento heatmap (`docs/08b-italy-heatmap.md`) only reveals on hover/tap. Because it sits inside a native `<details>` in the FAQ, its content stays in the DOM even when collapsed — so it doubles as the **crawlable / screen-reader-accessible** copy of the map data. (It previously lived as an `sr-only` block inside `RegionalPricing`.)

## Markup
```tsx
<table className="w-full border-collapse text-left text-sm">
  <caption className="sr-only">{t.price.chartHeading}</caption>
  <thead>
    <tr className="border-b border-border">
      <th scope="col" ...>{t.price.colRegion}</th>
      <th scope="col" ...>{t.price.colPrice}</th>
    </tr>
  </thead>
  <tbody>
    {regionalPrices.map((entry) => (
      <tr key={entry.code} className="border-b border-border last:border-0">
        <td ...>{entry.region}</td>
        <td ...>€{entry.eur}</td>
      </tr>
    ))}
  </tbody>
</table>
```
- Rows keyed by `entry.code` (ISTAT code); ordered most-expensive first (the array order).
- `<caption>` is `sr-only` — gives the table an accessible name without a visible title (the FAQ question already labels it visually).

## Data Source
`src/data/regionalPrices.ts` — `regionalPrices` (all 20). See `docs/08-regional-pricing.md` for the data shape + helpers.

## Dependencies
- `useI18n()` — `t.price.chartHeading`, `t.price.colRegion`, `t.price.colPrice`
- `regionalPrices` from `src/data/regionalPrices`
