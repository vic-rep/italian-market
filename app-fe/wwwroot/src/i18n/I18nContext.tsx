import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_TAGS,
  messages,
  type Locale,
} from './messages'

const STORAGE_KEY = 'trusti-locale'

// All locales share the same shape; expose the IT shape for autocomplete.
type Dictionary = (typeof messages)['it']

type I18nValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Dictionary
  /** BCP-47 tag for the active locale, for Intl formatting. */
  localeTag: string
}

const I18nContext = createContext<I18nValue | null>(null)

function readStoredLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && (LOCALES as string[]).includes(stored)) return stored as Locale
  } catch {
    // localStorage unavailable — fall through to default.
  }
  return DEFAULT_LOCALE
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale)

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Persistence is best-effort.
    }
  }, [])

  const value = useMemo<I18nValue>(
    () => ({
      locale,
      setLocale,
      t: messages[locale] as Dictionary,
      localeTag: LOCALE_TAGS[locale],
    }),
    [locale, setLocale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within an I18nProvider')
  return ctx
}
