import { useI18n } from '../../i18n/I18nContext'
import { Container } from '../shared/Container'
import { CheckIcon, XIcon, PhoneIcon } from '../shared/icons'

export function WhatIsRca() {
  const { t } = useI18n()

  return (
    <section id="rca" className="py-14 lg:py-20">
      <Container className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="max-w-xl">
          <h2 className="text-2xl sm:text-3xl">{t.rca.heading}</h2>
          <p className="mt-5 text-lg text-secondary">{t.rca.body}</p>
          <div className="mt-6 flex items-center gap-3 rounded-2xl bg-action px-5 py-4 text-on-action">
            <PhoneIcon className="h-5 w-5 shrink-0" />
            <span className="font-semibold">{t.rca.kasko}</span>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-7">
          <ul className="space-y-3">
            {t.rca.covered.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-action text-on-action">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                <span className="text-primary">{item}</span>
              </li>
            ))}
          </ul>
          <hr className="my-5 border-border" />
          <ul className="space-y-3">
            {t.rca.notCovered.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <XIcon className="mt-0.5 h-5 w-5 shrink-0 text-tertiary" />
                <span className="text-secondary">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
