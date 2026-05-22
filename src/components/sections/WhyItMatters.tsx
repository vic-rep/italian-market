import { useI18n } from '../../i18n/I18nContext'
import { Container } from '../shared/Container'
import { ImagePlaceholder } from '../shared/ImagePlaceholder'

export function WhyItMatters() {
  const { t } = useI18n()

  return (
    <section className="bg-muted">
      <Container className="grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-14 lg:py-20">
        <div className="max-w-xl">
          {/* Accent stripe — the only purple touch in this section */}
          <span aria-hidden="true" className="block h-1 w-10 rounded-full bg-accent" />
          <h2 className="mt-4 text-2xl text-balance sm:text-3xl">{t.why.heading}</h2>
          <p className="mt-5 text-base leading-relaxed text-secondary sm:text-lg">{t.why.body}</p>
        </div>
        <ImagePlaceholder
          tone="default"
          aspect="4 / 3"
          caption="Real-world driver moment — everyday, grounded, golden-hour light."
        />
      </Container>
    </section>
  )
}
