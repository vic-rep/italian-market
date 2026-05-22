# RegionalPricing

## File
`src/components/sections/RegionalPricing.tsx`

## Purpose
The "What does RC Auto cost?" section, presented as a **bento grid**:
- an interactive **Italy heatmap** as the hero box — see `docs/08b-italy-heatmap.md`
- three **stat callouts** — most expensive / cheapest / national average
- a wide **"What sets your price?"** box listing the four factors that drive the premium

The map, legend, hint, stat swatches and factor icons are all decorative. The full per-region table is **not** in this section any more — it now lives as a FAQ answer (`RegionalPriceTable`, see `docs/09b-regional-price-table.md`), which keeps the figures crawlable / screen-reader-accessible. No dark background.

## Bento Grid Layout
`grid grid-cols-2 gap-4 lg:grid-cols-4 lg:grid-rows-2`

| Box | Mobile (`grid-cols-2`) | Desktop (`lg:grid-cols-4`, 2 rows) |
|---|---|---|
| Heatmap | `col-span-2` (full width) | `col-span-1 row-span-2` (tall, left) |
| Most expensive | 1 cell | row 1, col 2 |
| Cheapest | 1 cell | row 1, col 3 |
| National average | `col-span-2` (full-width band) | `col-span-1` — row 1, col 4 |
| Factors | `col-span-2` (full width) | `col-span-3 col-start-2 row-start-2` (wide, under the stats) |

The map occupies col 1 of both rows, so auto-placement lays the three stats across row 1 (cols 2–4); the factors box is pinned to row 2 / cols 2–4 via `lg:col-start-2 lg:row-start-2`. On mobile everything stacks: map → Most expensive | Cheapest → National average (band) → Factors.

## Stat Boxes
Driven by helpers from `regionalPrices.ts`. Each box: optional colour swatch + label, a large value, a sub-label.

| Box | Value | Sub | Swatch |
|---|---|---|---|
| `statMostExpensive` | `€{priciestRegion.eur}` (€642) | region name (Campania) | `var(--color-accent)` — full purple, the ramp's high end |
| `statCheapest` | `€{cheapestRegion.eur}` (€318) | region name (Valle d'Aosta) | `color-mix(in srgb, var(--color-accent) 12%, var(--color-surface))` — pale purple, the ramp's low end |
| `statAverage` | `€{avgPrice}` (€428) | `price.perYear` | none |

Swatch markup: `h-2.5 w-2.5 rounded-full` with an inline `background`. The two extreme swatches deliberately echo the heatmap ramp's endpoints.

## Factors Box
A small heading plus a grid of the four premium factors, each an accent-tinted icon + label. The grid is **1 column on mobile, 2 columns on desktop**.

```tsx
<h3 className="text-sm font-medium text-secondary">{t.price.factorsHeading}</h3>
<div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-4 lg:grid-cols-2">
  {t.price.factors.map((factor, index) => {
    const Icon = FACTOR_ICONS[index] ?? CarIcon
    return (
      <div key={factor} className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <Icon className="h-5 w-5" />
        </span>
        <span className="text-sm font-medium text-primary">{factor}</span>
      </div>
    )
  })}
</div>
```

### Icon mapping (fixed, by index)
| Index | Icon | Factor |
|---|---|---|
| 0 | `CarIcon` | Car type and power |
| 1 | `MapPinIcon` | Where you live |
| 2 | `UserIcon` | Age and experience |
| 3 | `GaugeIcon` | Bonus-malus class |

Fallback `CarIcon` if the index exceeds the array. The icon spot is `bg-accent/10 text-accent` — small purple squares, well within the ~2% purple rule.

## Regional price table (relocated)
The full 20-region table used to sit here (latterly as an `sr-only` block). It now lives in its own component, `RegionalPriceTable`, rendered as the answer to the "How much is RC Auto in my region?" FAQ — see `docs/09b-regional-price-table.md`. Native `<details>` keeps that content in the DOM even when collapsed, so it stays crawlable / screen-reader-accessible.

## Data Source
`src/data/regionalPrices.ts`

```ts
type RegionalPrice = { code: string; region: string; eur: number }
```
- `code` — ISTAT region code (`"01"`–`"20"`); joins to `reg_istat_code` in `italyRegions.topo.json`
- Array is sorted most-expensive first (drives the table order)
- Helpers: `priceByCode`, `minPrice`, `maxPrice`, `avgPrice`, `cheapestRegion`, `priciestRegion`

All 20 regions carry **illustrative** figures (replace with sourced data before launch): Campania €642 (high) → Valle d'Aosta €318 (low); national average €428.

## i18n Copy (`price.*`)
| Key | IT | EN | BG |
|---|---|---|---|
| chartHeading | Quanto costa la RC Auto in Italia nel 2026? | What does RC Auto cost in Italy in 2026? | Колко струва Гражданска отговорност в Италия през 2026? |
| chartSubhead | Il prezzo cambia molto da regione a regione. Ecco la media annua indicativa. | Price swings a lot by region. Here's the rough yearly average. | Цената се различава силно по региони. Ето ориентировъчната средна годишна стойност. |
| footnote | Dati illustrativi — sostituiti con fonti reali prima del lancio. | Illustrative figures — replaced with sourced data before launch. | Илюстративни данни — ще бъдат заменени с реални източници преди старта. |
| colRegion / colPrice | Regione / Media €/anno | Region / Average €/year | Регион / Средно €/година |
| statMostExpensive | Più cara | Most expensive | Най-скъп |
| statCheapest | Più economica | Cheapest | Най-евтин |
| statAverage | Media nazionale | National average | Средно за страната |
| perYear | all'anno | per year | на година |
| legendLow / legendHigh | Più basso / Più alto | Lower / Higher | По-ниско / По-високо |
| mapHint | Tocca una regione per vedere la media. | Tap a region to see its average. | Докоснете регион, за да видите средната цена. |
| factorsHeading | Da cosa dipende il prezzo? | What sets your price? | От какво зависи цената? |
| factors[0..3] | Tipo e potenza del veicolo · Dove vivi · Età ed esperienza alla guida · La tua classe di merito | Car type and power · Where you live · Your age and experience · Your bonus-malus class | Тип и мощност на автомобила · Къде живееш · Възраст и опит зад волана · Твоят бонус-малус клас |

## Dependencies
- `useI18n()` — all `t.price.*` keys
- `cheapestRegion`, `priciestRegion`, `avgPrice` from `src/data/regionalPrices`
- `ItalyHeatmap` (`./ItalyHeatmap`) — see `docs/08b-italy-heatmap.md`
- `CarIcon`, `GaugeIcon`, `MapPinIcon`, `UserIcon` from `../shared/icons`
- `Container` shared component
