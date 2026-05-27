'use client'

import { useI18n } from '../../i18n/I18nContext'
import { LOCALES, LOCALE_LABELS, type Locale } from '../../i18n/messages'
import { ChevronDownIcon } from './icons'

const selectBase =
  'cursor-pointer appearance-none rounded-full border border-border bg-surface font-medium text-primary transition-colors hover:border-primary/30'

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setLocale(e.target.value as Locale)

  return (
    <>
      {/* Mobile: two-letter code */}
      <div className="relative inline-flex items-center sm:hidden">
        <select
          aria-label={t.ui.language}
          value={locale}
          onChange={handleChange}
          className={`${selectBase} py-2 pl-3 pr-7 text-sm`}
        >
          {LOCALES.map((code) => (
            <option key={code} value={code}>
              {code.toUpperCase()}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-2 h-4 w-4 text-tertiary" />
      </div>

      {/* Desktop: full label */}
      <div className="relative hidden sm:inline-flex items-center">
        <select
          aria-label={t.ui.language}
          value={locale}
          onChange={handleChange}
          className={`${selectBase} py-2 pl-3.5 pr-8 text-sm`}
        >
          {LOCALES.map((code) => (
            <option key={code} value={code}>
              {LOCALE_LABELS[code]}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-2.5 h-4 w-4 text-tertiary" />
      </div>
    </>
  )
}
