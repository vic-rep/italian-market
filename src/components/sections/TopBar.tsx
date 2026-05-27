'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useI18n } from '../../i18n/I18nContext'
import { Container } from '../shared/Container'
import { LanguageSwitcher } from '../shared/LanguageSwitcher'
import { Logo } from '../shared/Logo'
import { ThemeToggle } from '../shared/ThemeToggle'

type NavState = 'top' | 'visible' | 'hidden'

export function TopBar() {
  const { t } = useI18n()
  const router = useRouter()

  const [navState, setNavState] = useState<NavState>(
    typeof window !== 'undefined' && window.scrollY >= 20 ? 'visible' : 'top'
  )
  const lastScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0)

  useEffect(() => {
    const update = () => {
      const y = window.scrollY
      const prev = lastScrollY.current

      if (y < 20) {
        setNavState('top')
      } else if (y < prev - 2) {
        setNavState('visible')
      } else if (y > prev + 4 && y > 80) {
        setNavState('hidden')
      }

      lastScrollY.current = y
    }

    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  const isTop = navState === 'top'
  const isHidden = navState === 'hidden'

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-40',
        'transition-[transform,background-color,border-color] duration-300 ease-out',
        isHidden ? '-translate-y-full' : 'translate-y-0',
        isTop
          ? 'border-b border-transparent bg-transparent'
          : 'border-b border-border bg-page/85 backdrop-blur',
      ].join(' ')}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">

          {/* Logo — negative on dark hero, theme-based when nav is styled */}
          <Logo onActivate={() => router.push('/')} onDark={isTop || undefined} />

          {/* Nav links — hidden at top */}
          <nav
            aria-label="Primary"
            className={[
              'hidden items-center gap-7 md:flex',
              'transition-opacity duration-200',
              isTop ? 'pointer-events-none opacity-0' : 'opacity-100',
            ].join(' ')}
          >
            <a href="/#how" className="text-sm font-medium text-secondary transition-colors hover:text-primary">
              {t.nav.howItWorks}
            </a>
            <a href="/#rca" className="text-sm font-medium text-secondary transition-colors hover:text-primary">
              {t.nav.whatIsRca}
            </a>
            <Link href="/about" className="text-sm font-medium text-secondary transition-colors hover:text-primary">
              {t.nav.about}
            </Link>
          </nav>

          {/* Controls — always visible */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

        </div>
      </Container>
    </header>
  )
}
