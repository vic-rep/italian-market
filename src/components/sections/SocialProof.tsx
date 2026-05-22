import { useI18n } from '../../i18n/I18nContext'
import { Container } from '../shared/Container'
import { ImageIcon, PhoneIcon, ShieldCheckIcon, StarIcon } from '../shared/icons'

export function SocialProof() {
  const { t } = useI18n()

  return (
    <section id="social" className="py-14 lg:py-20">
      <Container>
        <h2 className="text-center text-2xl sm:text-3xl">{t.social.heading}</h2>

        {/* The Google rating appears exactly once, here. */}
        <figure className="mx-auto mt-8 max-w-2xl rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-0.5 text-accent" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon key={index} className="h-5 w-5" />
              ))}
            </div>
            <span className="text-sm font-semibold text-primary">{t.social.rating}</span>
          </div>

          <blockquote className="mt-4 text-lg leading-relaxed text-primary text-pretty">
            “{t.social.review}”
          </blockquote>

          <figcaption className="mt-5 flex items-center gap-3">
            <span
              role="img"
              aria-label="Real customer, natural relatable face — reflects diverse Italian drivers."
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-border bg-muted text-tertiary"
            >
              <ImageIcon className="h-5 w-5" />
            </span>
            <span className="text-sm font-medium text-secondary">[name]</span>
          </figcaption>
        </figure>

        <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:gap-8">
          <span className="inline-flex items-center gap-2 text-sm text-secondary">
            <ShieldCheckIcon className="h-5 w-5 shrink-0 text-accent" />
            {t.social.regulated}
          </span>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
            <PhoneIcon className="h-5 w-5 shrink-0 text-accent" />
            {t.social.humanPromise}
          </span>
        </div>
      </Container>
    </section>
  )
}
