import { useMemo, useRef, useState } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'
import { geoMercator, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import type { FeatureCollection } from 'geojson'
import type { GeometryCollection, Topology } from 'topojson-specification'
import topologyJson from '../../data/italyRegions.topo.json'
import { priceByCode, minPrice, maxPrice } from '../../data/regionalPrices'
import { useI18n } from '../../i18n/I18nContext'

const VB_W = 600
const VB_H = 720

type RegionShape = { code: string; name: string; eur: number | undefined; d: string }

function buildRegions(): RegionShape[] {
  const topology = topologyJson as unknown as Topology
  const fc = feature(
    topology,
    topology.objects.regions as GeometryCollection,
  ) as unknown as FeatureCollection
  const projection = geoMercator().fitSize([VB_W, VB_H], fc)
  const path = geoPath(projection)
  return fc.features.map((f) => {
    const props = (f.properties ?? {}) as Record<string, unknown>
    const code = String(props.reg_istat_code ?? '')
    const price = priceByCode[code]
    return {
      code,
      name: price?.region ?? String(props.reg_name ?? code),
      eur: price?.eur,
      d: path(f) ?? '',
    }
  })
}

// Purple ramp built on the brand accent token. The gamma (>1) keeps low/mid
// regions pale so fully-saturated purple stays confined to the few priciest
// regions. Mixing toward --color-surface (not a fixed white) lets the ramp
// adapt to the dark theme automatically.
function fillFor(eur: number | undefined): string {
  if (eur == null) return 'var(--color-muted)'
  const t = (eur - minPrice) / (maxPrice - minPrice)
  const eased = Math.pow(t, 1.6)
  const pct = Math.round((0.08 + eased * 0.92) * 100)
  return `color-mix(in srgb, var(--color-accent) ${pct}%, var(--color-surface))`
}

export function ItalyHeatmap() {
  const { t } = useI18n()
  const regions = useMemo(buildRegions, [])
  const [activeCode, setActiveCode] = useState<string | null>(null)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const wrapRef = useRef<HTMLDivElement>(null)

  const active = regions.find((r) => r.code === activeCode) ?? null

  function trackPointer(e: ReactMouseEvent) {
    const rect = wrapRef.current?.getBoundingClientRect()
    if (!rect) return
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div ref={wrapRef} className="relative" onMouseLeave={() => setActiveCode(null)}>
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="mx-auto block h-auto w-full max-h-[60vh] lg:max-h-none"
      >
        {regions.map((r) => {
          const isActive = r.code === activeCode
          return (
            <path
              key={r.code}
              d={r.d}
              fill={fillFor(r.eur)}
              stroke={isActive ? 'var(--color-primary)' : 'var(--color-surface)'}
              strokeWidth={isActive ? 1.75 : 0.75}
              strokeLinejoin="round"
              className="cursor-pointer transition-[stroke,stroke-width,filter] duration-150"
              style={{ filter: isActive ? 'brightness(1.04)' : undefined }}
              onMouseEnter={(e) => {
                setActiveCode(r.code)
                trackPointer(e)
              }}
              onMouseMove={trackPointer}
              onClick={(e) => {
                setActiveCode(r.code)
                trackPointer(e)
              }}
            />
          )
        })}
      </svg>

      {active && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute z-10 min-w-28 -translate-x-1/2 -translate-y-[calc(100%+14px)] rounded-xl border border-border bg-surface px-3 py-2 text-center shadow-lg"
          style={{ left: coords.x, top: coords.y }}
        >
          <p className="text-xs font-medium text-secondary">{active.name}</p>
          <p className="text-base font-semibold text-primary tabular-nums">
            {active.eur != null ? `€${active.eur}` : '—'}
            {active.eur != null && (
              <span className="text-xs font-normal text-secondary">{' '}{t.price.perYearShort}</span>
            )}
          </p>
        </div>
      )}
    </div>
  )
}
