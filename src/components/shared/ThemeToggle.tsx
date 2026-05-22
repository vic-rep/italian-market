import { useI18n } from '../../i18n/I18nContext'
import { useTheme } from '../../theme/ThemeContext'
import { MoonIcon, SunIcon } from './icons'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useI18n()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={t.ui.theme}
      title={t.ui.theme}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-primary transition-colors hover:border-primary/30"
    >
      <SunIcon
        className={`absolute h-5 w-5 transition-all duration-300 ${
          isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'
        }`}
      />
      <MoonIcon
        className={`absolute h-5 w-5 transition-all duration-300 ${
          isDark ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
        }`}
      />
    </button>
  )
}
