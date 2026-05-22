export type RcaResult =
  | {
      status: 'insured'
      validUntil: string
      insurer: string
      activeSince: string
      vehicle: string
      powerCv: number
      bonusMalusClass: string
      finesOnRecord: number
    }
  | { status: 'not_insured' }

const MOCK_DELAY_MS = 800

// Sample policy returned for the "insured" variant. Dates are ISO strings;
// the result UI formats them per the active locale.
const INSURED_SAMPLE: RcaResult = {
  status: 'insured',
  validUntil: '2026-11-14',
  insurer: 'Allianz',
  activeSince: '2019-03-01',
  vehicle: 'Fiat 500 1.2 Lounge',
  powerCv: 69,
  bonusMalusClass: '1',
  finesOnRecord: 0,
}

const NOT_INSURED_SAMPLE: RcaResult = { status: 'not_insured' }

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
