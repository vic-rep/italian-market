'use client'

import { useI18n } from '../../i18n/I18nContext'
import { regionalPrices } from '../../data/regionalPrices'

// All 20 regions, most-expensive first. Used as the answer to the regional
// pricing FAQ; also serves as the accessible/crawlable copy of the map data.
export function RegionalPriceTable() {
  const { t } = useI18n()

  return (
    <table className="w-full border-collapse text-left text-sm">
      <caption className="sr-only">{t.price.chartHeading}</caption>
      <thead>
        <tr className="border-b border-border">
          <th scope="col" className="py-2.5 pr-4 font-semibold text-primary">
            {t.price.colRegion}
          </th>
          <th scope="col" className="py-2.5 text-right font-semibold text-primary">
            {t.price.colPrice}
          </th>
        </tr>
      </thead>
      <tbody>
        {regionalPrices.map((entry) => (
          <tr key={entry.code} className="border-b border-border last:border-0">
            <td className="py-2.5 pr-4 text-primary">{entry.region}</td>
            <td className="py-2.5 text-right font-medium text-primary tabular-nums">
              €{entry.eur}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
