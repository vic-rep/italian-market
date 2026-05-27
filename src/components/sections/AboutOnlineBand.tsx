import { motion } from 'motion/react'
import { useI18n } from '../../i18n/I18nContext'
import { Container } from '../shared/Container'
import { PhoneIcon, ClipboardIcon, ClockIcon, ZapIcon, ShieldCheckIcon } from '../shared/icons'

const ICONS = [PhoneIcon, ClipboardIcon, ClockIcon, ZapIcon, ShieldCheckIcon]

export function AboutOnlineBand() {
  const { t } = useI18n()
  const { headline, body, bullets, bulletDescs, imageAlt } = t.lifestyle

  return (
    <section className="py-16" aria-labelledby="about-online-heading">
      <Container>
        <div className="mb-10">
          <h2
            id="about-online-heading"
            className="text-3xl font-semibold sm:text-4xl"
          >
            {headline}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-secondary">{body}</p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Photo */}
          <div className="overflow-hidden rounded-2xl aspect-[4/3] w-full">
            <img
              src="/the-italian.png"
              alt={imageAlt}
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Capability cards */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {bullets.map((bullet, i) => {
              const Icon = ICONS[i] ?? PhoneIcon
              const isLastOdd = i === bullets.length - 1 && bullets.length % 2 !== 0
              return (
                <motion.div
                  key={bullet}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.38, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className={[
                    'rounded-2xl border border-border bg-surface p-5',
                    isLastOdd ? 'sm:col-span-2 sm:max-w-[calc(50%-6px)]' : '',
                  ].join(' ')}
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <p className="mt-3 font-semibold leading-snug text-primary">{bullet}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-secondary">{bulletDescs[i]}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
