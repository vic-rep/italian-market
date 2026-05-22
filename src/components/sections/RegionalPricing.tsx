import { useI18n } from '../../i18n/I18nContext'
import { Container } from '../shared/Container'
import { ItalyHeatmap } from './ItalyHeatmap'
import { CarIcon, GaugeIcon, MapPinIcon, UserIcon } from '../shared/icons'
import { cheapestRegion, priciestRegion, avgPrice } from '../../data/regionalPrices'

const LOW_SWATCH = 'color-mix(in srgb, var(--color-accent) 12%, var(--color-surface))'
const FACTOR_ICONS = [CarIcon, MapPinIcon, UserIcon, GaugeIcon]

export function RegionalPricing() {
  const { t } = useI18n()

  const stats = [
    {
      label: t.price.statMostExpensive,
      value: `€${priciestRegion.eur}`,
      sub: priciestRegion.region,
      swatch: 'var(--color-accent)',
      span: '',
    },
    {
      label: t.price.statCheapest,
      value: `€${cheapestRegion.eur}`,
      sub: cheapestRegion.region,
      swatch: LOW_SWATCH,
      span: '',
    },
    {
      label: t.price.statAverage,
      value: `€${avgPrice}`,
      sub: t.price.perYear,
      swatch: null,
      span: 'col-span-2 lg:col-span-1',
    },
  ]

  return (
    <section className="py-14 lg:py-20">
      <Container>
        <h2 className="text-2xl sm:text-3xl">{t.price.chartHeading}</h2>
        <p className="mt-3 max-w-2xl text-lg text-secondary">{t.price.chartSubhead}</p>

        {/*
          Bento grid: the Italy heatmap is the hero box (tall, left), price-stat
          callouts run across the top, and the "what sets your price?" factors sit
          in a wide box below. The map (legend/hint) is decorative and aria-hidden
          — the data table further down is the accessible, crawlable source.
        */}
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:grid-rows-2">
          <div
            aria-hidden="true"
            className="col-span-2 flex flex-col rounded-2xl border border-border bg-surface p-4 sm:p-5 lg:col-span-1 lg:row-span-2"
          >
            <div className="flex min-h-0 flex-1 items-center justify-center">
              <ItalyHeatmap />
            </div>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-xs text-tertiary">{t.price.legendLow}</span>
              <span
                className="h-2 flex-1 rounded-full"
                style={{
                  background:
                    'linear-gradient(to right, color-mix(in srgb, var(--color-accent) 8%, var(--color-surface)), var(--color-accent))',
                }}
              />
              <span className="text-xs text-tertiary">{t.price.legendHigh}</span>
            </div>
            <p className="mt-3 text-center text-xs text-tertiary">{t.price.mapHint}</p>
          </div>

          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`flex flex-col justify-center rounded-2xl border border-border bg-surface p-5 lg:p-6 ${stat.span}`}
            >
              <div className="flex items-center gap-2">
                {stat.swatch && (
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ background: stat.swatch }}
                  />
                )}
                <span className="text-sm font-medium text-secondary">{stat.label}</span>
              </div>
              <p className="mt-2 text-3xl font-semibold text-primary tabular-nums sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-secondary">{stat.sub}</p>
            </div>
          ))}

          {/* What sets your price? — the four factors that drive the premium. */}
          <div className="col-span-2 rounded-2xl border border-border bg-surface p-5 lg:col-span-3 lg:col-start-2 lg:row-start-2 lg:p-6">
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
          </div>
        </div>

        <p className="mt-4 text-sm text-secondary">{t.price.footnote}</p>
      </Container>
    </section>
  )
}
