import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { flushSync } from 'react-dom'
import { motion, useReducedMotion } from 'motion/react'
import { checkPlate, type RcaResult, type VehicleType } from '../../api/checkPlate'
import { useI18n } from '../../i18n/I18nContext'
import { fmt } from '../../i18n/messages'
import {
  isValidPhone,
  isValidPlate,
  normalizePhone,
  normalizePlate,
  PLATE_EXAMPLE,
} from '../../utils/validation'
import { Container } from '../shared/Container'
import { Tooltip } from '../shared/Tooltip'
import { ShieldCheckIcon, UsersIcon } from '../shared/icons'
import { FOCUS_FORM_EVENT } from '../shared/formFocus'
import { LoadingCard } from './LoadingCard'
import { ResultCard } from './ResultCard'
import { VehicleToggle } from './VehicleToggle'

function startViewTransition(cb: () => void) {
  if ('startViewTransition' in document) {
    ;(document as Document & { startViewTransition(cb: () => void): void }).startViewTransition(cb)
  } else {
    cb()
  }
}

type Status = 'idle' | 'loading' | 'result'

export function Hero() {
  const { t } = useI18n()
  const [status, setStatus] = useState<Status>('idle')
  const [result, setResult] = useState<RcaResult | null>(null)
  const [plate, setPlate] = useState('')
  const [phone, setPhone] = useState('')
  const [vehicleType, setVehicleType] = useState<VehicleType>('car')
  const [submittedPlate, setSubmittedPlate] = useState('')
  // Errors only surface once a field has been blurred or submission attempted.
  const [touched, setTouched] = useState({ plate: false, phone: false })
  const plateRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const reduce = useReducedMotion()

  const plateError =
    touched.plate && !isValidPlate(plate, vehicleType)
      ? fmt(t.hero.plateError, { example: PLATE_EXAMPLE[vehicleType] })
      : ''
  const phoneError = touched.phone && !isValidPhone(phone) ? t.hero.phoneError : ''

  function reset() {
    setStatus('idle')
    setResult(null)
    setTouched({ plate: false, phone: false })
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
    setTouched({ plate: true, phone: true })
    const okPlate = isValidPlate(plate, vehicleType)
    const okPhone = isValidPhone(phone)
    if (!okPlate || !okPhone) {
      // Move focus to the first field that needs fixing.
      ;(okPlate ? phoneRef : plateRef).current?.focus()
      return
    }
    const cleanPlate = normalizePlate(plate)
    setSubmittedPlate(cleanPlate)
    // Morph the form → loading card, then the loading card → result card once
    // the lookup resolves — both via View Transitions (shared `result-card`).
    startViewTransition(() => {
      flushSync(() => setStatus('loading'))
    })
    const res = await checkPlate(cleanPlate, normalizePhone(phone), vehicleType)
    startViewTransition(() => {
      flushSync(() => {
        setResult(res)
        setStatus('result')
      })
    })
  }

  return (
    <section id="top" className="dark-grid-bg bg-footer">
      <Container className="grid items-center gap-10 pt-24 pb-12 lg:grid-cols-2 lg:gap-14 lg:py-20">
        <motion.div
          className="max-w-xl"
          initial={reduce ? {} : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Google rating — above the headline */}
          <div className="mb-5 inline-flex items-center gap-2">
            <span aria-hidden="true" className="text-lg tracking-tight text-action">
              {'★★★★★'}
            </span>
            <span className="text-sm font-medium text-footer-text/70">{t.social.rating}</span>
          </div>

          <h1 className="text-4xl font-bold leading-[1.0] tracking-tight text-balance text-footer-text sm:text-5xl lg:text-[4rem]">
            {t.hero.headline}
          </h1>
          <p className="mt-4 text-[0.9375rem] text-footer-text/60 sm:text-base">{t.hero.subhead}</p>

          {/* Trust badges — below the copy */}
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-footer-text/60">
              <ShieldCheckIcon className="h-4 w-4 text-footer-text/40" />
              {t.trust.regulated}
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-footer-text/60">
              <UsersIcon className="h-4 w-4 text-footer-text/40" />
              {t.trust.drivers}
            </span>
          </div>
        </motion.div>

        <div id="check" className="w-full max-w-md justify-self-stretch lg:flex lg:min-h-[480px] lg:flex-col lg:justify-center lg:justify-self-end">
          {status === 'result' && result ? (
            <ResultCard result={result} plate={submittedPlate} onReset={reset} />
          ) : status === 'loading' ? (
            <LoadingCard />
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="vt-result rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-7"
            >
              <VehicleToggle value={vehicleType} onChange={setVehicleType} />

              <div className="mt-4">
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
                  onBlur={() => setTouched((prev) => ({ ...prev, plate: true }))}
                  required
                  autoComplete="off"
                  autoCapitalize="characters"
                  spellCheck={false}
                  aria-invalid={!!plateError}
                  aria-describedby={plateError ? 'plate-error' : undefined}
                  className={`vt-plate w-full rounded-xl border bg-page px-4 py-3 text-base font-medium tracking-wide uppercase transition-[border-color,box-shadow] focus:outline-none focus:ring-2 ${
                    plateError
                      ? 'border-danger text-danger focus:border-danger focus:ring-danger'
                      : 'border-border text-primary focus:border-accent focus:ring-accent'
                  }`}
                />
                {plateError && (
                  <p id="plate-error" role="alert" className="mt-1.5 text-sm text-danger">
                    {plateError}
                  </p>
                )}
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
                  ref={phoneRef}
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, phone: true }))}
                  required
                  autoComplete="tel"
                  aria-invalid={!!phoneError}
                  aria-describedby={phoneError ? 'phone-error' : undefined}
                  className={`w-full rounded-xl border bg-page px-4 py-3 text-base transition-[border-color,box-shadow] focus:outline-none focus:ring-2 ${
                    phoneError
                      ? 'border-danger text-danger focus:border-danger focus:ring-danger'
                      : 'border-border text-primary focus:border-accent focus:ring-accent'
                  }`}
                />
                {phoneError && (
                  <p id="phone-error" role="alert" className="mt-1.5 text-sm text-danger">
                    {phoneError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-action px-5 py-3.5 text-base font-semibold text-on-action transition-[filter] duration-200 hover:brightness-95"
              >
                {t.hero.cta}
              </button>

              <p className="mt-3 text-center text-sm text-secondary">{t.hero.microcopy}</p>
            </form>
          )}
        </div>
      </Container>
    </section>
  )
}
