import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { checkPlate, type RcaResult } from '../../api/checkPlate'
import { useI18n } from '../../i18n/I18nContext'
import { Container } from '../shared/Container'
import { Tooltip } from '../shared/Tooltip'
import { ShieldCheckIcon, UsersIcon } from '../shared/icons'
import { FOCUS_FORM_EVENT } from '../shared/formFocus'
import { ResultCard } from './ResultCard'

type Status = 'idle' | 'loading' | 'result'

export function Hero() {
  const { t } = useI18n()
  const [status, setStatus] = useState<Status>('idle')
  const [result, setResult] = useState<RcaResult | null>(null)
  const [plate, setPlate] = useState('')
  const [phone, setPhone] = useState('')
  const [submittedPlate, setSubmittedPlate] = useState('')
  const plateRef = useRef<HTMLInputElement>(null)

  function reset() {
    setStatus('idle')
    setResult(null)
  }

  // Re-open + focus the form when the logo / nav / repeat-CTA asks for it.
  useEffect(() => {
    function handleFocusRequest() {
      reset()
      requestAnimationFrame(() => {
        plateRef.current?.focus({ preventScroll: true })
        document
          .getElementById('check')
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      })
    }
    window.addEventListener(FOCUS_FORM_EVENT, handleFocusRequest)
    return () => window.removeEventListener(FOCUS_FORM_EVENT, handleFocusRequest)
  }, [])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!plate.trim() || !phone.trim()) return
    setSubmittedPlate(plate.trim().toUpperCase())
    setStatus('loading')
    const res = await checkPlate(plate.trim(), phone.trim())
    setResult(res)
    setStatus('result')
  }

  const isLoading = status === 'loading'

  return (
    <section id="top" className="dark-grid-bg bg-footer">
      <Container className="grid items-center gap-10 py-12 lg:grid-cols-2 lg:gap-14 lg:py-20">
        <div className="max-w-xl">
          {/* Google rating — above the headline */}
          <div className="mb-5 inline-flex items-center gap-2">
            <span aria-hidden="true" className="text-base tracking-tight text-action">
              {'★★★★★'}
            </span>
            <span className="text-sm font-medium text-footer-text/80">{t.social.rating}</span>
          </div>

          <h1 className="text-3xl leading-[1.1] text-balance text-footer-text sm:text-4xl lg:text-[2.6rem]">
            {t.hero.headline}
          </h1>
          <p className="mt-5 text-lg text-footer-text/70">{t.hero.subhead}</p>

          {/* Trust badges — below the copy */}
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-footer-text/70">
              <ShieldCheckIcon className="h-4 w-4 text-footer-text/50" />
              {t.trust.regulated}
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-footer-text/70">
              <UsersIcon className="h-4 w-4 text-footer-text/50" />
              {t.trust.drivers}
            </span>
          </div>
        </div>

        <div id="check" className="w-full max-w-md justify-self-stretch lg:flex lg:min-h-[480px] lg:flex-col lg:justify-center lg:justify-self-end">
          {status === 'result' && result ? (
            <ResultCard result={result} plate={submittedPlate} onReset={reset} />
          ) : (
            <form
              onSubmit={handleSubmit}
              aria-busy={isLoading}
              className="rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-7"
            >
              <div>
                <div className="mb-1.5 flex items-center gap-1.5">
                  <label htmlFor="plate-input" className="text-sm font-semibold text-primary">
                    {t.hero.plate}
                  </label>
                  <Tooltip text={t.hero.plateTooltip} triggerLabel={t.hero.plate} />
                </div>
                <input
                  id="plate-input"
                  name="plate"
                  ref={plateRef}
                  value={plate}
                  onChange={(event) => setPlate(event.target.value)}
                  required
                  autoComplete="off"
                  autoCapitalize="characters"
                  spellCheck={false}
                  disabled={isLoading}
                  className="w-full rounded-xl border border-border bg-page px-4 py-3 text-base font-medium tracking-wide text-primary uppercase transition-[border-color,box-shadow] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-60"
                />
              </div>

              <div className="mt-4">
                <div className="mb-1.5 flex items-center gap-1.5">
                  <label htmlFor="phone-input" className="text-sm font-semibold text-primary">
                    {t.hero.phone}
                  </label>
                  <Tooltip text={t.hero.phoneTooltip} triggerLabel={t.hero.phone} />
                </div>
                <input
                  id="phone-input"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  required
                  autoComplete="tel"
                  disabled={isLoading}
                  className="w-full rounded-xl border border-border bg-page px-4 py-3 text-base text-primary transition-[border-color,box-shadow] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-60"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-action px-5 py-3.5 text-base font-semibold text-on-action transition-[filter] hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-80"
              >
                {isLoading ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="h-5 w-5 animate-spin rounded-full border-2 border-on-action/30 border-t-on-action"
                    />
                    <span role="status">{t.ui.loading}</span>
                  </>
                ) : (
                  t.hero.cta
                )}
              </button>

              <p className="mt-3 text-center text-sm text-secondary">{t.hero.microcopy}</p>
            </form>
          )}
        </div>
      </Container>
    </section>
  )
}
