import type { VehicleType } from '../api/checkPlate'

// ─────────────────────────────────────────────────────────────────────────────
// Italian plate + mobile-number validation for the lead form.
//
// Plate formats (current Italian scheme):
//   • car (auto):        2 letters + 3 digits + 2 letters   e.g. AB123CD
//   • motorcycle (moto): 2 letters + 5 digits               e.g. AB12345
// Real plates never use I/O/Q/U, but we accept any A–Z — the block structure is
// the real discriminator, and being lenient on letters avoids rejecting a valid
// plate over a look-alike (O/0, I/1) the caller can still sort out.
// ─────────────────────────────────────────────────────────────────────────────

const PLATE_PATTERN: Record<VehicleType, RegExp> = {
  car: /^[A-Z]{2}\d{3}[A-Z]{2}$/,
  motorcycle: /^[A-Z]{2}\d{5}$/,
}

export const PLATE_EXAMPLE: Record<VehicleType, string> = {
  car: 'AB123CD',
  motorcycle: 'AB12345',
}

// Uppercase and strip anything that isn't a letter or digit (spaces, dashes…).
export function normalizePlate(raw: string): string {
  return raw.toUpperCase().replace(/[^A-Z0-9]/g, '')
}

export function isValidPlate(raw: string, vehicleType: VehicleType): boolean {
  return PLATE_PATTERN[vehicleType].test(normalizePlate(raw))
}

// Italian mobile: starts with 3, 9–10 digits total. An optional +39 / 0039
// country code (and any spaces/dashes/parentheses) is stripped first.
export function normalizePhone(raw: string): string {
  return raw.replace(/[^\d+]/g, '').replace(/^(\+39|0039)/, '')
}

export function isValidPhone(raw: string): boolean {
  return /^3\d{8,9}$/.test(normalizePhone(raw))
}
