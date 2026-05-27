'use client'

import type { ReactNode } from 'react'
import { useI18n } from '../../i18n/I18nContext'
import { Container } from '../shared/Container'
import { ChevronDownIcon } from '../shared/icons'
import { RegionalPriceTable } from './RegionalPriceTable'

export function Faq() {
  const { t } = useI18n()
  const items: { q: string; a: string; node?: ReactNode }[] = [
    { q: t.faq.q1, a: t.faq.a1 },
    { q: t.faq.q2, a: t.faq.a2 },
    { q: t.faq.q3, a: t.faq.a3 },
    { q: t.faq.q4, a: t.faq.a4 },
    { q: t.faq.q5, a: t.faq.a5, node: <RegionalPriceTable /> },
  ]

  return (
    <section className="py-14 lg:py-20">
      <Container className="max-w-3xl">
        <h2 className="text-3xl font-bold sm:text-4xl">{t.faq.heading}</h2>
        <div className="mt-6">
          {items.map((item) => (
            <details key={item.q} className="group border-b border-border">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-semibold text-primary [&::-webkit-details-marker]:hidden">
                {item.q}
                <ChevronDownIcon className="h-5 w-5 shrink-0 text-secondary transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="pb-4 text-secondary">
                <p>{item.a}</p>
                {item.node && <div className="mt-4">{item.node}</div>}
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  )
}
