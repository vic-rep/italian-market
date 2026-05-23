import { Link, useNavigate } from 'react-router-dom'
import { useI18n } from '../../i18n/I18nContext'
import { Container } from '../shared/Container'
import { LanguageSwitcher } from '../shared/LanguageSwitcher'
import { Logo } from '../shared/Logo'
import { ThemeToggle } from '../shared/ThemeToggle'

export function TopBar() {
  const { t } = useI18n()
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-page/85 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Logo onActivate={() => navigate('/')} />

          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            <a href="/#how" className="text-sm font-medium text-secondary transition-colors hover:text-primary">
              {t.nav.howItWorks}
            </a>
            <a href="/#rca" className="text-sm font-medium text-secondary transition-colors hover:text-primary">
              {t.nav.whatIsRca}
            </a>
            <Link to="/about" className="text-sm font-medium text-secondary transition-colors hover:text-primary">
              {t.nav.about}
            </Link>
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
