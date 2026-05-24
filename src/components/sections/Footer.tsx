import { Link } from 'react-router-dom'
import { useI18n } from '../../i18n/I18nContext'
import { Container } from '../shared/Container'
import { PhoneIcon, FacebookIcon, InstagramIcon, LinkedinIcon } from '../shared/icons'
import { PerspectiveGrid } from '../shared/PerspectiveGrid'

const SOCIALS = [
  { label: 'Facebook', Icon: FacebookIcon },
  { label: 'Instagram', Icon: InstagramIcon },
  { label: 'LinkedIn', Icon: LinkedinIcon },
]

export function Footer() {
  const { t } = useI18n()

  const linkGroups = [
    { label: t.footer.colCompany, links: t.footer.company },
    { label: t.footer.colLegal, links: t.footer.legal },
  ]

  return (
    <footer id="footer" className="dark-grid-bg bg-footer text-footer-text">
      <PerspectiveGrid opacity={0.15} />
      <Container className="relative z-10 py-12 lg:py-16">
        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xs">
            <img src="/logo-negative.svg" alt="Trusti" width={107} height={24} className="block" />
            <p className="mt-4 text-sm text-footer-text/70">{t.footer.companyLine}</p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 lg:justify-end">
            {linkGroups.map((group) => (
              <nav
                key={group.label}
                aria-label={group.label}
                className="flex flex-wrap gap-x-6 gap-y-2"
              >
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-sm text-footer-text/70 transition-colors hover:text-footer-text"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-10 flex flex-col items-start gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-footer-text">
            <PhoneIcon className="h-5 w-5 shrink-0 text-action" />
            {t.footer.humanLine}
          </p>

          <div className="-mr-2 flex items-center gap-1">
            {SOCIALS.map(({ label, Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-footer-text/70 transition-colors hover:bg-white/10 hover:text-footer-text"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
