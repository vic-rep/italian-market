import type { ComponentType, SVGProps } from 'react'
import type { VehicleCategory } from '../api/checkPlate'
import { CarIcon, MotorcycleIcon, TruckIcon } from '../components/shared/icons'

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>

// Map the Italian scraper's vehicle category to an icon. We don't have a
// dedicated icon for every category; e.g. CICLOMOTORE (moped) shares the
// motorcycle silhouette, which is close enough.
const ICON_BY_CATEGORY: Record<VehicleCategory, IconComponent> = {
  AUTOVEICOLO: CarIcon,
  MOTOCICLO: MotorcycleIcon,
  CICLOMOTORE: MotorcycleIcon,
  AUTOCARRO: TruckIcon,
  ALTRO: CarIcon,
}

// Per-locale accessible label for the vehicle silhouette. Used for `aria-label`
// on the icon wrapper. Keep the labels short — they're read out, not displayed.
const LABEL_BY_CATEGORY_BY_LOCALE: Record<string, Record<VehicleCategory, string>> = {
  it: {
    AUTOVEICOLO: 'Autoveicolo',
    MOTOCICLO: 'Motociclo',
    CICLOMOTORE: 'Ciclomotore',
    AUTOCARRO: 'Autocarro',
    ALTRO: 'Veicolo',
  },
  en: {
    AUTOVEICOLO: 'Car',
    MOTOCICLO: 'Motorcycle',
    CICLOMOTORE: 'Moped',
    AUTOCARRO: 'Truck',
    ALTRO: 'Vehicle',
  },
  bg: {
    AUTOVEICOLO: 'Кола',
    MOTOCICLO: 'Мотоциклет',
    CICLOMOTORE: 'Мотопед',
    AUTOCARRO: 'Камион',
    ALTRO: 'Превозно средство',
  },
}

export function getVehicleIcon(category: VehicleCategory): IconComponent {
  return ICON_BY_CATEGORY[category] ?? CarIcon
}

export function getVehicleLabel(category: VehicleCategory, locale: string): string {
  const dict = LABEL_BY_CATEGORY_BY_LOCALE[locale] ?? LABEL_BY_CATEGORY_BY_LOCALE.en
  return dict[category] ?? dict.ALTRO
}
