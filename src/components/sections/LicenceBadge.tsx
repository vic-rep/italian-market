'use client'

import { motion, useReducedMotion } from 'motion/react'
import { useI18n } from '../../i18n/I18nContext'
import { Container } from '../shared/Container'

export function LicenceBadge() {
  const { t, locale } = useI18n()
  const reduce = useReducedMotion()
  const kfnBadge =
    locale === 'en' ? '/KFN-certified-EN.svg'
    : locale === 'bg' ? '/KFN-certified-BG.svg'
    : '/KFN-certified-IT.svg'

  return (
    <section className="py-14 lg:py-16">
      <Container>
        <div className="overflow-hidden rounded-3xl border border-border">
          <div className="grid lg:grid-cols-[340px_1fr]">
            {/* Seal panel */}
            <div className="relative flex flex-col items-center justify-center overflow-hidden bg-footer px-10 py-14">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage: "url('/perspective-grid.png')",
                  backgroundPosition: 'bottom center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '100% auto',
                  opacity: 0.2,
                }}
              />
              <motion.img
                src={kfnBadge}
                alt="KFN certified badge"
                className="relative w-52 drop-shadow-[0_12px_32px_rgba(0,0,0,0.4)]"
                draggable={false}
                whileHover={!reduce ? { scale: 1.07 } : {}}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            {/* Copy panel */}
            <div className="flex flex-col justify-center bg-surface px-10 py-14 lg:px-14">
              <h2 className="text-3xl font-semibold sm:text-4xl">
                {t.about.licence.heading}
              </h2>
              <p className="mt-5 max-w-xl leading-relaxed text-secondary">
                {t.about.licence.body}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
