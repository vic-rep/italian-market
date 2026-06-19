// Source of truth for all visible copy. Written natively per language.
// `[bracketed]` values are pre-launch placeholders to be filled before launch.
//
// Additions beyond the original brief, needed to render accessible/SEO markup:
//   - faq.heading        (section heading for the FAQ block)
//   - price.colRegion / price.colPrice (column headers for the crawlable table)
// These are faithful translations, not copy changes.

export const messages = {
  en: {
    nav: { howItWorks: 'How it works', whatIsRca: 'What is RC Auto' },
    hero: {
      headline: 'The fastest way to check your RC Auto.',
      subhead:
        'Enter your plate. See your status, renewal date, and insurer — free, no account.',
      vehicleType: 'Vehicle type',
      vehicleCar: 'Car',
      vehicleMoto: 'Motorbike',
      plate: 'Number plate',
      plateTooltip: 'We use your plate to pull your policy details. Nothing else.',
      phone: 'Mobile number',
      phoneTooltip: 'So we can remind you before your policy expires. No spam, never sold.',
      cta: 'Check for free',
      microcopy: '10 seconds. No account. We never sell your data.',
      plateError: 'Enter a valid plate (e.g. {example}).',
      phoneError: 'Enter a valid mobile number (e.g. 333 1234567).',
    },
    lifestyle: {
      headline: 'Your agent, online.',
      body: 'No office, no queue. Check your policy, see your renewal date and insurer — all from your phone.',
      bullets: ['No office.', 'No paperwork.', 'No queue.', 'Quick, simple.', 'Secure and private.'],
      imageAlt: 'Person checking their car insurance on a phone',
    },
    trust: { regulated: 'Licensed & regulated', drivers: '14,000+ drivers' },
    social: {
      heading: "Zero surprises. Ask those who've already used it.",
      rating: 'The average among drivers who checked their RC Auto with us.',
    },
    how: {
      heading: 'How it works',
      steps: [
        { title: 'Enter your plate',            desc: 'Your plate and mobile number — that\'s all. About ten seconds, no account.' },
        { title: 'See your results instantly',  desc: 'Status, renewal date, and insurer — on screen right away. No waiting, no callback.' },
        { title: 'Never miss your renewal',     desc: "Get a reminder before your policy expires, so you're never caught uninsured." },
      ],
      illExpiry:    'Expires',
      illBmClass:   'BM class',
      illBmValue:   'Class 6',
      illExpDate:   '15 Apr 2026',
      illCallLabel: 'Reminder set',
      illCallBody:  'We call 30 days before',
    },
    rca: {
      heading: 'What is RC Auto?',
      body: "RC Auto — Responsabilità Civile Auto — is mandatory in Italy. It covers the damage you cause to other people when you're driving. Not your own car. Here's exactly what's in, and what's not.",
      ctaTitle: 'Is your RC Auto in order?',
      ctaButton: 'Call us now',
      ctaNote: 'A real person answers, not a bot.',
      covered: ['Injury to other people', 'Other vehicles and property', 'Your passengers'],
      notCovered: [
        'Your own car',
        'Theft and fire',
        'Vandalism',
        'Weather damage',
        "The at-fault driver's injuries",
      ],
    },
    price: {
      factorsHeading: 'What sets your price?',
      factors: [
        'Car type and power',
        'Where you live',
        'Your age and experience',
        'Your bonus-malus class',
      ],
      chartHeading: 'What does RC Auto cost in Italy in 2026?',
      chartSubhead: "Price swings a lot by region. Here's the rough yearly average.",
      footnote: 'Illustrative figures — replaced with sourced data before launch.',
      colRegion: 'Region',
      colPrice: 'Average €/year',
      mapHint: 'Tap a region to see its average.',
      statMostExpensive: 'Most expensive',
      statCheapest: 'Cheapest',
      statAverage: 'National average',
      perYear: 'per year',
      legendLow: 'Lower',
      legendHigh: 'Higher',
      perYearShort: '/yr',
    },
    faq: {
      heading: 'Frequently asked questions',
      q1: 'Is it really free?',
      a1: "Yes. Completely free — no account needed, no payment details asked. You can check as often as you like.",
      q2: 'What do you do with my number?',
      a2: "We use it only to send you a reminder before your policy expires. We never sell it to third parties and never use it for unsolicited messages. You can ask us to delete it at any time by writing to us.",
      q3: 'Are you an insurer?',
      a3: "No — we're a regulated broker. For now we help you check your policy status, renewal date, and insurer — and make sure you never miss your renewal.",
      q4: 'Can I check any plate?',
      a4: "Only your own. Checking another person's plate without their consent isn't permitted. By completing the check, you confirm the vehicle is yours or that you have the owner's authorisation.",
      q5: 'How much is RC Auto in my region?',
      a5: "The figures shown are indicative regional averages based on aggregated Italian RC Auto market data — not a quote. Your actual price depends on your plate, bonus-malus class, driver age, and other factors. We'll replace these with up-to-date sourced data before launch.",
    },
    repeatCta: { headline: 'Your plate. Ten seconds. Done.', cta: 'Check for free' },
    footer: {
      companyLine: 'Trusti — a licensed insurance broker. Reg. [IT number].',
      colCompany: 'Company',
      colLegal: 'Legal',
      company: [{ label: 'Contact', href: '/contact' }],
      legal: [{ label: 'Privacy', href: '/privacy' }, { label: 'Terms', href: '/terms' }, { label: 'Cookie', href: '/cookies' }],
      humanLine: 'Questions? Call us — a person answers. [phone] · [hours]',
    },
    result: {
      header: 'Your RC Auto · {plate}',
      insured: 'Insured',
      validUntil: 'Valid until {date}',
      notInsured: 'Not insured',
      notInsuredSub: 'This vehicle has no active policy.',
      getCovered: 'Get covered now',
      rowInsurer: 'Insurer',
      reminder: 'Reminder set',
      reminderSub: "We'll call you before it expires.",
      secondaryCta: 'Want a reminder before your policy expires?',
      checkAnother: 'Check another plate',
    },
    ui: {
      language: 'Language',
      theme: 'Theme',
      loading: 'Checking your policy…',
      loadingSteps: [
        'Retrieving your plate details…',
        'Querying the insurance databases…',
        'Identifying the vehicle type…',
        'Checking your RC Auto coverage…',
        'Reading the expiry date…',
        'Keeping your data secure…',
        'Preparing your result…',
      ],
    },
    licence: {
      heading: 'Licensed in Europe. Responsible to you.',
      body: "We're authorized by the Financial Supervisory Commission and passported to operate across the EU — live today in Bulgaria and Italy, building for the rest. That licence isn't just paperwork. It means we're legally obliged to give you an honest recommendation, protect your data, and answer for every policy we place — to you and to the regulator.",
    },
  },

  it: {
    nav: { howItWorks: 'Come funziona', whatIsRca: "Cos'è la RC Auto" },
    hero: {
      headline: 'Il modo più veloce per verificare la tua RC Auto.',
      subhead:
        'Inserisci la targa. Scopri stato, scadenza e compagnia — gratis, senza registrazione.',
      vehicleType: 'Tipo di veicolo',
      vehicleCar: 'Auto',
      vehicleMoto: 'Moto',
      plate: 'Targa',
      plateTooltip: 'Usiamo la targa solo per recuperare i dati della tua polizza. Nient’altro.',
      phone: 'Numero di cellulare',
      phoneTooltip: 'Per ricordarti la scadenza prima che arrivi. Niente spam, mai ceduto a terzi.',
      cta: 'Controlla gratis',
      microcopy: '10 secondi. Senza registrazione. Non vendiamo mai i tuoi dati.',
      plateError: 'Inserisci una targa valida (es. {example}).',
      phoneError: 'Inserisci un numero di cellulare valido (es. 333 1234567).',
    },
    lifestyle: {
      headline: 'Il tuo agente, online.',
      body: 'Niente ufficio, niente code. Controlla la polizza, verifica scadenza e compagnia — tutto dal telefono.',
      bullets: ['Nessun ufficio.', 'Nessuna burocrazia.', 'Nessuna coda.', 'Rapido e semplice.', 'Sicuro e riservato.'],
      imageAlt: 'Una persona controlla la sua RC Auto dal telefono',
    },
    trust: { regulated: 'Autorizzata e regolamentata', drivers: '14.000+ automobilisti' },
    social: {
      heading: "Zero sorprese. Chiedilo a chi l'ha già usato.",
      rating: 'La media di chi ha controllato la RC Auto con noi.',
    },
    how: {
      heading: 'Come funziona',
      steps: [
        { title: 'Inserisci la targa',          desc: 'La tua targa e il numero di cellulare — tutto qui. Circa dieci secondi, senza registrazione.' },
        { title: 'Vedi subito i risultati',      desc: 'Stato, scadenza e compagnia in un click. Nessuna attesa, nessuna richiamata.' },
        { title: 'Non perdere la scadenza',      desc: 'Ricevi un promemoria prima che la polizza scada, così non resti mai scoperto.' },
      ],
      illExpiry:    'Scadenza',
      illBmClass:   'Classe BM',
      illBmValue:   '6ª classe',
      illExpDate:   '15 apr 2026',
      illCallLabel: 'Promemoria attivato',
      illCallBody:  'Ti chiamiamo 30 giorni prima',
    },
    rca: {
      heading: "Cos'è la RC Auto?",
      body: 'La RC Auto — Responsabilità Civile Auto — è obbligatoria in Italia. Copre i danni che provochi agli altri quando guidi. Non la tua auto. Ecco cosa include, e cosa no.',
      ctaTitle: 'La tua RC Auto è in regola?',
      ctaButton: 'Chiamaci ora',
      ctaNote: 'Risponde una persona, non un bot.',
      covered: ['Lesioni ad altre persone', 'Veicoli e cose di terzi', 'I tuoi passeggeri'],
      notCovered: [
        'La tua auto',
        'Furto e incendio',
        'Atti vandalici',
        'Eventi atmosferici',
        'Lesioni del conducente responsabile',
      ],
    },
    price: {
      factorsHeading: 'Da cosa dipende il prezzo?',
      factors: [
        'Tipo e potenza del veicolo',
        'Dove vivi',
        'Età ed esperienza alla guida',
        'La tua classe di merito',
      ],
      chartHeading: 'Quanto costa la RC Auto in Italia nel 2026?',
      chartSubhead:
        'Il prezzo cambia molto da regione a regione. Ecco la media annua indicativa.',
      footnote: 'Dati illustrativi — sostituiti con fonti reali prima del lancio.',
      colRegion: 'Regione',
      colPrice: 'Media €/anno',
      mapHint: 'Tocca una regione per vedere la media.',
      statMostExpensive: 'Più cara',
      statCheapest: 'Più economica',
      statAverage: 'Media nazionale',
      perYear: "all'anno",
      legendLow: 'Più basso',
      legendHigh: 'Più alto',
      perYearShort: '/anno',
    },
    faq: {
      heading: 'Domande frequenti',
      q1: 'È davvero gratis?',
      a1: 'Sì. Non costa nulla, non è richiesta registrazione e non chiediamo dati di pagamento. Puoi controllare la tua polizza ogni volta che vuoi.',
      q2: 'Cosa fate con il mio numero?',
      a2: 'Lo usiamo esclusivamente per inviarti un promemoria prima della scadenza. Non lo cediamo mai a terzi e non lo usiamo per comunicazioni commerciali non richieste. Puoi chiederci di cancellarlo in qualsiasi momento scrivendoci.',
      q3: 'Siete una compagnia assicurativa?',
      a3: "No — siamo un broker regolamentato dall'IVASS. Per ora ti aiutiamo a verificare stato, scadenza e compagnia della tua RC Auto — e a non perdere mai la data di rinnovo.",
      q4: 'Posso controllare qualsiasi targa?',
      a4: "Solo la tua. Verificare la targa di un veicolo altrui senza consenso non è consentito. Completando il controllo, confermi di essere il proprietario del veicolo o di averne l'autorizzazione.",
      q5: 'Quanto costa la RC Auto nella mia regione?',
      a5: "Le cifre mostrate sono medie regionali indicative basate su dati aggregati del mercato RC Auto italiano. Non costituiscono un preventivo: il prezzo reale dipende da targa, classe di merito, età del conducente e altri fattori. Prima del lancio le sostituiremo con dati aggiornati da fonti ufficiali.",
    },
    repeatCta: { headline: 'La tua targa. Dieci secondi. Fatto.', cta: 'Controlla gratis' },
    footer: {
      companyLine: 'Trusti — broker assicurativo autorizzato. Iscr. [n. IT].',
      colCompany: 'Azienda',
      colLegal: 'Note legali',
      company: [{ label: 'Contatti', href: '/contact' }],
      legal: [{ label: 'Privacy', href: '/privacy' }, { label: 'Termini', href: '/terms' }, { label: 'Cookie', href: '/cookies' }],
      humanLine: 'Domande? Chiamaci — risponde una persona. [telefono] · [orari]',
    },
    result: {
      header: 'La tua RC Auto · {plate}',
      insured: 'Assicurata',
      validUntil: 'Valida fino al {date}',
      notInsured: 'Non assicurata',
      notInsuredSub: 'Questo veicolo non ha una polizza attiva.',
      getCovered: 'Assicurati ora',
      rowInsurer: 'Compagnia',
      reminder: 'Promemoria attivato',
      reminderSub: 'Ti chiamiamo prima della scadenza.',
      secondaryCta: 'Vuoi ricevere un promemoria prima della scadenza?',
      checkAnother: "Controlla un'altra targa",
    },
    ui: {
      language: 'Lingua',
      theme: 'Tema',
      loading: 'Controllo la tua polizza…',
      loadingSteps: [
        'Recupero i dati della targa…',
        'Interrogo le banche dati assicurative…',
        'Identifico il tipo di veicolo…',
        'Verifico lo stato della copertura RCA…',
        'Controllo la data di scadenza…',
        'Proteggo i tuoi dati durante la verifica…',
        'Preparo il risultato…',
      ],
    },
    licence: {
      heading: 'Autorizzati in Europa. Responsabili verso di te.',
      body: "Siamo autorizzati dalla Financial Supervisory Commission e abilitati a operare in tutta l'UE — attivi oggi in Bulgaria e Italia, in crescita verso il resto. Quella licenza non è burocrazia. Significa che siamo giuridicamente obbligati a darti una scelta onesta, proteggere i tuoi dati e rispondere di ogni polizza — davanti a te e al regolatore.",
    },
  },
} as const

export type Locale = keyof typeof messages
export const LOCALES: Locale[] = ['en', 'it']
export const DEFAULT_LOCALE: Locale = 'it'

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  it: 'Italiano',
}

// Maps app locale to a BCP-47 tag for Intl formatting (dates, etc.).
export const LOCALE_TAGS: Record<Locale, string> = {
  en: 'en-GB',
  it: 'it-IT',
}

// Tiny {placeholder} interpolation — replaces {key} with vars[key].
export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    key in vars ? String(vars[key]) : `{${key}}`,
  )
}
