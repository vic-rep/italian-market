import type { VehicleType } from '../../api/checkPlate'
import { useI18n } from '../../i18n/I18nContext'
import { CarIcon, MotorcycleIcon } from '../shared/icons'

const OPTIONS = [
  { value: 'car', Icon: CarIcon, labelKey: 'vehicleCar' },
  { value: 'motorcycle', Icon: MotorcycleIcon, labelKey: 'vehicleMoto' },
] as const

// Segmented car/motorcycle selector at the top of the lead form. The choice is
// threaded into the lookup so the result card shows a matching vehicle.
export function VehicleToggle({
  value,
  onChange,
}: {
  value: VehicleType
  onChange: (value: VehicleType) => void
}) {
  const { t } = useI18n()
  return (
    <div
      role="radiogroup"
      aria-label={t.hero.vehicleType}
      className="grid grid-cols-2 gap-1 rounded-xl border border-border bg-page p-1"
    >
      {OPTIONS.map(({ value: optionValue, Icon, labelKey }) => {
        const active = optionValue === value
        return (
          <button
            key={optionValue}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(optionValue)}
            className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
              active ? 'bg-surface text-primary shadow-sm' : 'text-secondary hover:text-primary'
            }`}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
            {t.hero[labelKey]}
          </button>
        )
      })}
    </div>
  )
}
