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

// What the driver selects in the form's car/motorcycle toggle. It decides which
// backend endpoint the lookup calls (cars and motorcycles are separate
// services) — see ENDPOINT_BY_TYPE below.
export type VehicleType = 'car' | 'motorcycle'

// The toggle selects the endpoint. Fill in the real URLs when they go live.
const ENDPOINT_BY_TYPE: Record<VehicleType, string> = {
  car: '/api/rca/auto', // [real URL TBD]
  motorcycle: '/api/rca/moto', // [real URL TBD]
}

// Mock-only: the real endpoint's response carries the category; until then we
// derive it from the toggle so the result card shows a matching vehicle.
const CATEGORY_BY_TYPE: Record<VehicleType, VehicleCategory> = {
  car: 'AUTOVEICOLO',
  motorcycle: 'MOTOCICLO',
}

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

// Resolve the mock delay. Defaults to MOCK_DELAY_MS; override with `?delay=ms`
// (e.g. `?delay=20000`) to rehearse the real ~20–30s lookup and watch the
// loading card cycle. Mirrors the `?result=` demo override above.
function resolveDelay(): number {
  try {
    const raw = new URLSearchParams(window.location.search).get('delay')
    if (raw !== null) {
      const ms = Number(raw)
      if (Number.isFinite(ms) && ms >= 0) return ms
    }
  } catch {
    // No window/search available — fall through to the default.
  }
  return MOCK_DELAY_MS
}

// Look up a plate's RC Auto status. The vehicle type chooses the endpoint.
export async function checkPlate(
  plate: string,
  _phone: string,
  vehicleType: VehicleType = 'car',
): Promise<RcaResult> {
  const endpoint = ENDPOINT_BY_TYPE[vehicleType]
  if (import.meta.env.DEV) {
    // Confirms the toggle routes to the right endpoint while it's still mocked.
    console.debug(`[checkPlate] ${vehicleType} → ${endpoint}`)
  }

  // Real call (once the endpoints are live) — replaces the mock below:
  //   const res = await fetch(endpoint, {
  //     method: 'POST',
  //     headers: { 'content-type': 'application/json' },
  //     body: JSON.stringify({ plate, phone: _phone }),
  //   })
  //   return toRcaResult(await res.json())

  // MOCK — resolves after ~800ms by default (override with `?delay=ms`).
  await new Promise((resolve) => setTimeout(resolve, resolveDelay()))
  return { ...pickResult(plate), vehicleCategory: CATEGORY_BY_TYPE[vehicleType] }
}
