import { useI18n } from '../../i18n/I18nContext'
import { LOCALES, LOCALE_LABELS, type Locale } from '../../i18n/messages'
import { ChevronDownIcon } from './icons'

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n()

  return (
    <div className="relative inline-flex items-center">
      <select
        aria-label={t.ui.language}
        value={locale}
        onChange={(event) => setLocale(event.target.value as Locale)}
        className="cursor-pointer appearance-none rounded-full border border-border bg-surface py-2 pr-8 pl-3.5 text-sm font-medium text-primary transition-colors hover:border-primary/30"
      >
        {LOCALES.map((code) => (
          <option key={code} value={code}>
            {LOCALE_LABELS[code]}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-2.5 h-4 w-4 text-tertiary" />
    </div>
  )
}
