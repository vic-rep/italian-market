import { useI18n } from '../../i18n/I18nContext'
import { Container } from '../shared/Container'
import { ShieldCheckIcon, UsersIcon } from '../shared/icons'

// Insurer names stand in for real logos (brand assets dropped in before launch).
const INSURERS = ['Allianz', 'Generali', 'UnipolSai']

export function TrustStrip() {
  const { t } = useI18n()

  return (
    <section className="border-y border-border bg-muted">
      <Container className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-5 text-sm">
        <span className="inline-flex items-center gap-2 font-medium text-secondary">
          <ShieldCheckIcon className="h-5 w-5 text-accent" />
          {t.trust.regulated}
        </span>
        <span className="inline-flex items-center gap-2 font-medium text-secondary">
          <UsersIcon className="h-5 w-5 text-accent" />
          {t.trust.drivers}
        </span>
        <span aria-hidden="true" className="hidden h-4 w-px bg-border sm:block" />
        {INSURERS.map((name) => (
          <span key={name} className="font-heading text-base font-semibold text-secondary">
            {name}
          </span>
        ))}
      </Container>
    </section>
  )
}
