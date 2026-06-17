import { useI18n } from '../../i18n/I18nContext'
import { Container } from '../shared/Container'
import { CheckIcon, XIcon, PhoneIcon } from '../shared/icons'

// Pre-launch placeholder — replace with Trusti's real inbound number before launch.
const PHONE = { display: '800 123 456', href: 'tel:+39800123456' }

export function WhatIsRca() {
  const { t } = useI18n()

  return (
    <section id="rca" className="py-14 lg:py-20">
      <Container className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-[2.5rem]">{t.rca.heading}</h2>
          <p className="mt-5 max-w-xl text-base text-secondary sm:text-lg">{t.rca.body}</p>

          <div className="mt-8 rounded-2xl border border-border bg-surface p-6 sm:p-7">
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
        </div>

        <div className="grid-depth relative flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-footer p-8 text-center text-footer-text sm:p-10">
          <h3 className="relative z-10 max-w-sm text-3xl font-bold text-balance sm:text-4xl lg:text-[2.5rem]">
            {t.rca.ctaTitle}
          </h3>
          <div className="relative z-10 mt-7 flex flex-col items-center gap-4">
            <a
              href={PHONE.href}
              className="inline-flex items-center gap-2.5 rounded-xl bg-action px-7 py-3.5 text-base font-semibold text-on-action transition-[filter] hover:brightness-95"
            >
              <PhoneIcon className="h-5 w-5" />
              {t.rca.ctaButton}
            </a>
            <a
              href={PHONE.href}
              className="text-lg font-semibold text-footer-text underline-offset-4 hover:underline"
            >
              {PHONE.display}
            </a>
          </div>
          <p className="relative z-10 mt-4 text-sm text-footer-text/70">{t.rca.ctaNote}</p>
        </div>
      </Container>
    </section>
  )
}
