import { useI18n } from '../../i18n/I18nContext'
import { Container } from '../shared/Container'
import { PhoneIcon, ClipboardIcon, ClockIcon, ZapIcon, ShieldCheckIcon } from '../shared/icons'
import { asset } from '../../utils/asset'

const BULLET_ICONS = [PhoneIcon, ClipboardIcon, ClockIcon, ZapIcon, ShieldCheckIcon]

export function LifestyleBand() {
  const { t } = useI18n()

  return (
    <section className="py-12 lg:py-16">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="overflow-hidden rounded-2xl aspect-[4/3] w-full">
          <img
            src={asset('/the-italian.png')}
            alt={t.lifestyle.imageAlt}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="max-w-xl">
          <h2 className="text-2xl sm:text-3xl">{t.lifestyle.headline}</h2>
          <p className="mt-4 text-lg text-secondary">{t.lifestyle.body}</p>
          <ul className="mt-5 space-y-3">
            {t.lifestyle.bullets.map((bullet, index) => {
              const Icon = BULLET_ICONS[index] ?? PhoneIcon
              return (
                <li key={bullet} className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium text-primary">{bullet}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </Container>
    </section>
  )
}
