import { useI18n } from '../../i18n/I18nContext'
import { Container } from '../shared/Container'
import { PhoneIcon } from '../shared/icons'

export function Footer() {
  const { t } = useI18n()

  const columns = [
    { heading: t.footer.colProduct, links: t.footer.product },
    { heading: t.footer.colCompany, links: t.footer.company },
    { heading: t.footer.colLegal, links: t.footer.legal },
  ]

  return (
    <footer id="footer" className="dark-grid-bg bg-footer text-footer-text">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="max-w-xs">
            <img src="/logo-negative.svg" alt="Trusti" width={107} height={24} className="block" />
            <p className="mt-4 text-sm text-footer-text/70">{t.footer.companyLine}</p>
          </div>

          {columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h3 className="font-heading text-sm font-semibold text-footer-text">
                {column.heading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-footer-text/70 transition-colors hover:text-footer-text"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-footer-text">
            <PhoneIcon className="h-5 w-5 shrink-0 text-action" />
            {t.footer.humanLine}
          </p>
        </div>
      </Container>
    </footer>
  )
}
