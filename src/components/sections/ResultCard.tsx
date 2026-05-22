import type { RcaResult } from '../../api/checkPlate'
import { useI18n } from '../../i18n/I18nContext'
import { fmt } from '../../i18n/messages'
import { CheckIcon, XIcon } from '../shared/icons'

function formatDate(iso: string, localeTag: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return new Intl.DateTimeFormat(localeTag, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-2 last:border-0">
      <dt className="text-sm text-secondary">{label}</dt>
      <dd className="text-right text-sm font-semibold text-primary">{value}</dd>
    </div>
  )
}

export function ResultCard({
  result,
  plate,
  onReset,
}: {
  result: RcaResult
  plate: string
  onReset: () => void
}) {
  const { t, localeTag } = useI18n()

  return (
    <div
      aria-live="polite"
      className="rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-7"
    >
      <h2 className="text-lg font-semibold text-primary">{fmt(t.result.header, { plate })}</h2>

      {result.status === 'insured' ? (
        <>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-action px-3.5 py-1.5 text-sm font-semibold text-on-action">
            <CheckIcon className="h-4 w-4" />
            <span>
              {t.result.insured} · {fmt(t.result.validUntil, { date: formatDate(result.validUntil, localeTag) })}
            </span>
          </div>

          <dl className="mt-3">
            <DetailRow label={t.result.rowInsurer} value={result.insurer} />
            <DetailRow label={t.result.rowActiveSince} value={formatDate(result.activeSince, localeTag)} />
            <DetailRow
              label={t.result.rowVehicle}
              value={`${result.vehicle} · ${result.powerCv} CV`}
            />
            <DetailRow label={t.result.rowBonusMalus} value={result.bonusMalusClass} />
            <DetailRow label={t.result.rowFines} value={String(result.finesOnRecord)} />
          </dl>

          <div className="mt-3 flex items-center gap-3 rounded-2xl border border-accent/25 bg-accent/10 p-3">
            <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent">
              <CheckIcon className="h-3.5 w-3.5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-primary">{t.result.reminder}</p>
              <p className="text-xs text-secondary">{t.result.reminderSub}</p>
            </div>
          </div>

          <button
            type="button"
            className="mt-2 w-full rounded-xl border border-border px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-muted"
          >
            {t.result.secondaryCta}
          </button>
        </>
      ) : (
        <>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-muted px-3.5 py-1.5 text-sm font-semibold text-primary">
            <XIcon className="h-4 w-4 text-secondary" />
            <span>{t.result.notInsured}</span>
          </div>
          <p className="mt-2 text-secondary">{t.result.notInsuredSub}</p>

          {/* Prominent conversion CTA. The real quote/purchase flow is out of scope. */}
          <button
            type="button"
            className="mt-4 w-full rounded-xl bg-action px-5 py-3 text-base font-semibold text-on-action transition-[filter] hover:brightness-95"
          >
            {t.result.getCovered}
          </button>
        </>
      )}

      <button
        type="button"
        onClick={onReset}
        className="mt-3 block w-full text-center text-sm font-medium text-secondary underline-offset-4 transition-colors hover:text-primary hover:underline"
      >
        {t.result.checkAnother}
      </button>
    </div>
  )
}
