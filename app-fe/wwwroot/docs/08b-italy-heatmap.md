# ItalyHeatmap

## File
`src/components/sections/ItalyHeatmap.tsx`

Child component of `RegionalPricing` (see `docs/08-regional-pricing.md`). Renders the interactive choropleth of Italy used as the bento hero box.

## Purpose
An SVG map of Italy's 20 regions, each filled by a purple "price ramp." Hovering (desktop) or tapping (mobile) a region reveals its average premium in a floating tooltip. Purely visual — the SVG is `aria-hidden`; the regional price table (now a FAQ answer, see `docs/09b-regional-price-table.md`) is the accessible source.

## Geometry
- **Source data:** `src/data/italyRegions.topo.json` — TopoJSON of the 20 ISTAT regions (from openpolis/geojson-italy), committed and bundled, so there's no runtime fetch / loading state.
- **Libraries:** `d3-geo` (`geoMercator`, `geoPath`) + `topojson-client` (`feature`). Chosen over `react-simple-maps`, which doesn't support React 19 and is unmaintained.
- Pipeline: `feature(topology, topology.objects.regions)` → GeoJSON FeatureCollection → `geoMercator().fitSize([600, 720], fc)` → `geoPath(projection)` produces each `<path d>` for a `viewBox="0 0 600 720"` SVG.
- Regions join to prices by `reg_istat_code` ↔ `priceByCode[code]`.
- The `.topo.json` import is typed via an ambient `declare module '*.topo.json'` in `src/vite-env.d.ts` (so TS doesn't infer a giant literal from the 106 KB file); the value is cast to `Topology` at use.

## Colour Ramp
```ts
function fillFor(eur) {
  if (eur == null) return 'var(--color-muted)'
  const t = (eur - minPrice) / (maxPrice - minPrice)
  const eased = Math.pow(t, 1.6)                 // gamma > 1 keeps low/mid pale
  const pct = Math.round((0.08 + eased * 0.92) * 100)
  return `color-mix(in srgb, var(--color-accent) ${pct}%, var(--color-surface))`
}
```
- Built on the brand accent (purple) token `--color-accent` (#9b5de5).
- Gamma `1.6` means only the few priciest regions saturate; most stay pale lavender. This map knowingly exceeds the ~2% purple budget (a deliberate product choice) — the gamma keeps strong purple minimal.
- Mixes toward `--color-surface` (not a fixed white), so the ramp adapts to dark mode automatically.

## Interaction
- State: `activeCode` (string | null) and pointer `coords`.
- `onMouseEnter` / `onClick` set the active region; `onMouseMove` tracks the cursor; the wrapper's `onMouseLeave` clears it. Taps persist (touch has no leave event) — this is the mobile tap-to-reveal behaviour.
- Active region styling: stroke `var(--color-primary)`, `stroke-width` 1.75, slight `brightness(1.04)`.
- Tooltip: an absolutely-positioned card following the pointer, `pointer-events-none`, showing the region name + `€{eur} /yr`.
- Accessibility: the SVG is `aria-hidden` and paths are intentionally not focusable — the regional price table (a FAQ answer) is the accessible equivalent.

## Legend & Hint
Rendered by the parent `RegionalPricing` map box, not here: a gradient bar (`legendLow` → `legendHigh`) using the same purple ramp, plus the `mapHint` line.

## Dependencies
- `d3-geo`, `topojson-client` (+ `@types/d3-geo`, `@types/topojson-client`)
- `italyRegions.topo.json`, `priceByCode`, `minPrice`, `maxPrice` from `src/data`
- React `useMemo`, `useRef`, `useState`
