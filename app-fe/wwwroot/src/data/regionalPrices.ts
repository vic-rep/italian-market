// Illustrative figures — replace with sourced data before launch.
// `code` is the ISTAT region code ("01"–"20"), matching the `reg_istat_code`
// property in src/data/italyRegions.topo.json so the heatmap can join the two.
export type RegionalPrice = { code: string; region: string; eur: number }

// Sorted most-expensive first (drives the crawlable table order).
export const regionalPrices: RegionalPrice[] = [
  { code: '15', region: 'Campania', eur: 642 },
  { code: '18', region: 'Calabria', eur: 547 },
  { code: '16', region: 'Puglia', eur: 521 },
  { code: '19', region: 'Sicilia', eur: 519 },
  { code: '12', region: 'Lazio', eur: 478 },
  { code: '14', region: 'Molise', eur: 449 },
  { code: '17', region: 'Basilicata', eur: 446 },
  { code: '07', region: 'Liguria', eur: 433 },
  { code: '13', region: 'Abruzzo', eur: 428 },
  { code: '09', region: 'Toscana', eur: 421 },
  { code: '08', region: 'Emilia-Romagna', eur: 409 },
  { code: '20', region: 'Sardegna', eur: 401 },
  { code: '10', region: 'Umbria', eur: 396 },
  { code: '03', region: 'Lombardia', eur: 389 },
  { code: '11', region: 'Marche', eur: 384 },
  { code: '01', region: 'Piemonte', eur: 372 },
  { code: '06', region: 'Friuli-Venezia Giulia', eur: 351 },
  { code: '05', region: 'Veneto', eur: 338 },
  { code: '04', region: 'Trentino-Alto Adige', eur: 326 },
  { code: '02', region: "Valle d'Aosta", eur: 318 },
]

export const priceByCode: Record<string, RegionalPrice> = Object.fromEntries(
  regionalPrices.map((entry) => [entry.code, entry]),
)

export const minPrice = Math.min(...regionalPrices.map((entry) => entry.eur))
export const maxPrice = Math.max(...regionalPrices.map((entry) => entry.eur))
export const avgPrice = Math.round(
  regionalPrices.reduce((sum, entry) => sum + entry.eur, 0) / regionalPrices.length,
)

export const cheapestRegion = regionalPrices.reduce((a, b) => (b.eur < a.eur ? b : a))
export const priciestRegion = regionalPrices.reduce((a, b) => (b.eur > a.eur ? b : a))
