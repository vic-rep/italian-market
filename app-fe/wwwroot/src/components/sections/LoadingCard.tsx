import { useEffect, useState } from 'react'
import { useI18n } from '../../i18n/I18nContext'

// How long each status line stays before the next. Seven steps × ~3.2s ≈ 22s,
// matching the real lookup; if it resolves sooner the result simply swaps in,
// if later the card parks on the final line.
const STEP_INTERVAL_MS = 3200

export function LoadingCard() {
  const { t } = useI18n()
  const steps = t.ui.loadingSteps
  const [step, setStep] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setStep((prev) => (prev >= steps.length - 1 ? prev : prev + 1))
    }, STEP_INTERVAL_MS)
    return () => clearInterval(id)
  }, [steps.length])

  // Fill toward — but never reaching — 100%, so it never reads as "done" before
  // the result actually arrives.
  const pct = Math.min(95, Math.round(((step + 1) / steps.length) * 100))

  return (
    <div
      aria-busy="true"
      className="vt-result flex min-h-[20rem] flex-col items-center justify-center gap-5 rounded-3xl border border-border bg-surface p-6 text-center shadow-sm sm:min-h-[21rem] sm:p-7"
    >
      {/* Stable polite live region announces the active step. The animated line
          below is keyed (it remounts each step to replay the crossfade), so it
          stays decorative for assistive tech. */}
      <p className="sr-only" role="status" aria-live="polite">
        {steps[step]}
      </p>

      <span
        aria-hidden="true"
        className="inline-block h-10 w-10 animate-spin rounded-full border-2 border-accent/30 border-t-accent"
      />
      <p
        key={step}
        aria-hidden="true"
        className="loading-line flex min-h-[2.75rem] max-w-[16rem] items-center text-base font-medium text-primary"
      >
        {steps[step]}
      </p>
      <div
        aria-hidden="true"
        className="h-1.5 w-full max-w-[18rem] overflow-hidden rounded-full bg-muted"
      >
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
