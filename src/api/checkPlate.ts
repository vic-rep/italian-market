// ─────────────────────────────────────────────────────────────────────────────
// RcaResult — modelled on the actual scraper payload, not a richer mock.
//
// Real fields per the source (Italian motor insurance lookup):
//   • plate           — echoed back (we already know it)
//   • vehicleCategory — "AUTOVEICOLO" | "MOTOCICLO" | "CICLOMOTORE" | "AUTOCARRO"
//                       | "ALTRO" — Italian vehicle category, not model
//   • insurer         — present only when insured
//   • validUntil      — ISO date string; scraper gives DD/MM/YYYY, the adapter
//                       converts before constructing an RcaResult
//   • statusMessage   — raw Italian sentence from the source, kept verbatim
//                       (currently not rendered in the UI but preserved for
//                       logging / future use)
// ─────────────────────────────────────────────────────────────────────────────

export type VehicleCategory =
  | 'AUTOVEICOLO'
  | 'MOTOCICLO'
  | 'CICLOMOTORE'
  | 'AUTOCARRO'
  | 'ALTRO'

export type RcaResult =
  | {
      status: 'insured'
      vehicleCategory: VehicleCategory
      insurer: string
      validUntil: string
      statusMessage: string
    }
  | {
      status: 'not_insured'
      vehicleCategory: VehicleCategory
      statusMessage: string
    }

const MOCK_DELAY_MS = 800

const INSURED_SAMPLE: RcaResult = {
  status: 'insured',
  vehicleCategory: 'AUTOVEICOLO',
  insurer: 'VERTI ASSICURAZIONI S.P.A.',
  validUntil: '2026-10-11',
  statusMessage: 'Il veicolo risulta assicurato',
}

const NOT_INSURED_SAMPLE: RcaResult = {
  status: 'not_insured',
  vehicleCategory: 'AUTOVEICOLO',
  statusMessage:
    'Il veicolo non risulta in regola con gli obblighi assicurativi RCA',
}

// Demo selector — replace this whole module with a real API call later.
// Two easy ways to demo the "not insured" variant:
//   1. Append `?result=not_insured` (or `?result=insured`) to the URL.
//   2. Enter a plate starting with "X" or "Z" (e.g. "XY000ZZ").
function pickResult(plate: string): RcaResult {
  try {
    const override = new URLSearchParams(window.location.search).get('result')
    if (override === 'not_insured') return NOT_INSURED_SAMPLE
    if (override === 'insured') return INSURED_SAMPLE
  } catch {
    // No window/search available — fall through to plate-based logic.
  }

  const normalized = plate.replace(/\s+/g, '').toUpperCase()
  if (normalized.startsWith('X') || normalized.startsWith('Z')) return NOT_INSURED_SAMPLE
  return INSURED_SAMPLE
}

// MOCK — swap for a real API call later. Resolves after ~800ms.
export async function checkPlate(plate: string, _phone: string): Promise<RcaResult> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS))
  return pickResult(plate)
}
