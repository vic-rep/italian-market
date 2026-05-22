import { useI18n } from '../../i18n/I18nContext'
import { Container } from '../shared/Container'
import { LanguageSwitcher } from '../shared/LanguageSwitcher'
import { Logo } from '../shared/Logo'
import { ThemeToggle } from '../shared/ThemeToggle'

export function TopBar() {
  const { t } = useI18n()
  const navLinks = [
    { href: '#how', label: t.nav.howItWorks },
    { href: '#rca', label: t.nav.whatIsRca },
    { href: '#footer', label: t.nav.about },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-page/85 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Logo onActivate={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />

          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-secondary transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  )
}
