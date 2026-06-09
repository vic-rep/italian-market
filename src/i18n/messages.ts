// Source of truth for all visible copy. Written natively per language.
// `[bracketed]` values are pre-launch placeholders to be filled before launch.
//
// Additions beyond the original brief, needed to render accessible/SEO markup:
//   - faq.heading        (section heading for the FAQ block)
//   - price.colRegion / price.colPrice (column headers for the crawlable table)
// These are faithful translations, not copy changes.

export const messages = {
  en: {
    nav: { howItWorks: 'How it works', whatIsRca: 'What is RC Auto', about: 'About us' },
    hero: {
      headline: 'Your car insurance, checked in 10 seconds.',
      subhead:
        'Enter your plate. See your status, renewal date, and insurer — free, no account.',
      plate: 'Number plate',
      plateTooltip: 'We use your plate to pull your policy details. Nothing else.',
      phone: 'Mobile number',
      phoneTooltip: 'So we can remind you before your policy expires. No spam, never sold.',
      cta: 'Check for free',
      microcopy: '10 seconds. No account. We never sell your data.',
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
      company: [{ label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }],
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
    ui: { language: 'Language', theme: 'Theme', loading: 'Checking your policy…' },
    about: {
      hero: {
        headline: "The best agent you'll never have to visit.",
        subhead: 'We think insurance should be the easy part of your day — not an afternoon in an office. So we built the agent who sorts it, online.',
      },
      origin: {
        heading: "We've killed a queue before.",
        body: 'Our founders came from Uber, where getting across a city became a single tap. They looked at insurance — still a number, still a waiting room, still paperwork — and saw the same problem, unsolved. So they built Trusti: the agent who knows every insurer and answers the phone. Online.',
      },
      stats: [
        { value: '14,000', label: 'customers sorted' },
        { value: '30+',    label: 'people, and growing' },
        { value: '4.9',    label: 'on Google · 981 reviews' },
      ],
      licence: {
        heading: 'Licensed in Europe. Responsible to you.',
        body: "We're authorized by the Financial Supervisory Commission and passported to operate across the EU — live today in Bulgaria and Italy, building for the rest. That licence isn't just paperwork. It means we're legally obliged to give you an honest recommendation, protect your data, and answer for every policy we place — to you and to the regulator.",
      },
      certificate: {
        heading: 'Authorized. Regulated. Responsible to you.',
        body: "The licence from the Financial Supervisory Commission isn't just a document. It means we're obliged to give you an honest choice, to protect your data, and to be accountable — to you, and to the State.",
        regNo: '№936-ЗБ / 05.06.2024',
        badgeLabel: 'СЕРТИФИЦИРАН БРОКЕР',
        authority: 'КОМИСИЯ ЗА ФИНАНСОВ НАДЗОР',
      },
      team: {
        heading: 'The people who pick up.',
        body: "A 30-strong team who know the industry inside out — and answer the phone. Not a faceless platform. The agent you'd want, if you got to pick.",
      },
      europe: {
        heading: 'Two countries today. A continent in mind.',
        body: "We started in Bulgaria and we're live in Italy. The goal is simple: the online agent Europe actually prefers — one market at a time.",
      },
      promises: {
        heading: 'What you can expect from us',
        items: [
          { title: 'Compare all. Save more.',       desc: 'Every insurer, side by side — so your money goes further.' },
          { title: 'Fast. Clear. Yours.',           desc: 'Insurance that works the way everything else on your phone does.' },
          { title: 'Two minutes, not an afternoon', desc: 'All of it, on your phone.' },
          { title: 'With you, start to finish.',    desc: 'A renewal, a question, a claim — someone here always picks up.' },
        ],
      },
      faq: [
        { q: 'Are you an insurer or a broker?',  a: "A broker — and an independent one. We don't sell our own policies; we compare every insurer and find you the best one. You buy through us, the cover is theirs." },
        { q: 'Who regulates you?',               a: "The Financial Supervisory Commission. We're a licensed broker (Reg. №936-ЗБ/05.06.2024), passported to operate across the EU." },
        { q: 'Which countries do you cover?',    a: "We're live in Bulgaria and Italy today, with more of Europe to come." },
        { q: 'How do you make money?',           a: "The insurer pays us a commission when you buy — the same whether you come through us or walk into their office. Using Trusti costs you nothing extra." },
        { q: 'Is my data safe?',                 a: 'Yes. Your details are encrypted, used only to find and manage your cover, and never sold. Ask us to delete them anytime.' },
      ],
      cta: { headline: "See what we'd find for you.", button: 'Check for free' },
    },
  },

  it: {
    nav: { howItWorks: 'Come funziona', whatIsRca: "Cos'è la RC Auto", about: 'Chi siamo' },
    hero: {
      headline: 'La tua RC Auto, verificata in 10 secondi.',
      subhead:
        'Inserisci la targa. Scopri stato, scadenza e compagnia — gratis, senza registrazione.',
      plate: 'Targa',
      plateTooltip: 'Usiamo la targa solo per recuperare i dati della tua polizza. Nient’altro.',
      phone: 'Numero di cellulare',
      phoneTooltip: 'Per ricordarti la scadenza prima che arrivi. Niente spam, mai ceduto a terzi.',
      cta: 'Controlla gratis',
      microcopy: '10 secondi. Senza registrazione. Non vendiamo mai i tuoi dati.',
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
      company: [{ label: 'Chi siamo', href: '/about' }, { label: 'Contatti', href: '/contact' }],
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
    ui: { language: 'Lingua', theme: 'Tema', loading: 'Controllo la tua polizza…' },
    about: {
      hero: {
        headline: 'Il miglior agente che non dovrai mai andare a trovare.',
        subhead: "L'assicurazione dovrebbe essere la parte semplice della giornata — non un pomeriggio in ufficio. Così abbiamo creato l'agente che la risolve, online.",
      },
      origin: {
        heading: 'Abbiamo già eliminato le code.',
        body: "I nostri fondatori venivano da Uber, dove attraversare una città era diventato un singolo tocco. Hanno guardato il settore assicurativo — ancora un numero, ancora una sala d'attesa, ancora burocrazia — e hanno visto lo stesso problema, irrisolto. Così hanno fondato Trusti: l'agente che conosce ogni assicuratore e risponde al telefono. Online.",
      },
      stats: [
        { value: '14,000', label: 'clienti assistiti' },
        { value: '30+',    label: 'persone, e cresciamo' },
        { value: '4.9',    label: 'su Google · 981 recensioni' },
      ],
      licence: {
        heading: 'Autorizzati in Europa. Responsabili verso di te.',
        body: "Siamo autorizzati dalla Financial Supervisory Commission e abilitati a operare in tutta l'UE — attivi oggi in Bulgaria e Italia, in crescita verso il resto. Quella licenza non è burocrazia. Significa che siamo giuridicamente obbligati a darti una scelta onesta, proteggere i tuoi dati e rispondere di ogni polizza — davanti a te e al regolatore.",
      },
      certificate: {
        heading: 'Autorizzati. Regolamentati. Responsabili verso di te.',
        body: "L'autorizzazione della Financial Supervisory Commission non è solo un documento. Significa che siamo obbligati a darti una scelta onesta, a proteggere i tuoi dati e a rispondere delle nostre azioni — davanti a te e allo Stato.",
        regNo: '№936-ЗБ / 05.06.2024',
        badgeLabel: 'СЕРТИФИЦИРАН БРОКЕР',
        authority: 'КОМИСИЯ ЗА ФИНАНСОВ НАДЗОР',
      },
      team: {
        heading: 'Le persone che rispondono.',
        body: 'Un team di 30 persone che conosce il settore a fondo — e risponde al telefono. Non una piattaforma anonima. L\'agente che vorresti, se potessi scegliere.',
      },
      europe: {
        heading: 'Due paesi oggi. Un continente in testa.',
        body: "Abbiamo iniziato in Bulgaria e siamo attivi in Italia. L'obiettivo è semplice: diventare l'agente online che l'Europa sceglie davvero — un mercato alla volta.",
      },
      promises: {
        heading: 'Cosa puoi aspettarti da noi',
        items: [
          { title: 'Confronta tutto. Risparmia di più.',  desc: "Tutte le compagnie, una accanto all'altra — così i tuoi soldi rendono di più." },
          { title: 'Veloce. Chiaro. Tuo.',                desc: 'Un\'assicurazione che funziona come tutto il resto sul tuo telefono.' },
          { title: 'Due minuti, non un pomeriggio',       desc: 'Tutto dal tuo telefono.' },
          { title: "Con te, dall'inizio alla fine.",      desc: 'Un rinnovo, una domanda, un sinistro — da noi c\'è sempre qualcuno che risponde.' },
        ],
      },
      faq: [
        { q: 'Siete una compagnia assicurativa o un broker?', a: "Un broker — e indipendente. Non vendiamo polizze nostre; confrontiamo ogni assicuratore e troviamo la migliore per te. Acquisti tramite noi, la copertura è loro." },
        { q: 'Chi vi regolamenta?',         a: "La Financial Supervisory Commission. Siamo un broker autorizzato (Reg. №936-ЗБ/05.06.2024), abilitato a operare in tutta l'UE." },
        { q: 'In quali paesi operate?',     a: 'Siamo attivi in Bulgaria e Italia, con altri mercati europei in arrivo.' },
        { q: 'Come guadagnate?',            a: 'L\'assicuratore ci paga una commissione quando acquisti — la stessa che otterrebbe portandoti direttamente al loro sportello. Usare Trusti non ti costa nulla in più.' },
        { q: 'I miei dati sono al sicuro?', a: 'Sì. I tuoi dati sono crittografati, usati solo per trovare e gestire la tua copertura, e non vengono mai venduti. Puoi chiederci di cancellarli in qualsiasi momento.' },
      ],
      cta: { headline: 'Scopri cosa troveremmo per te.', button: 'Controlla gratis' },
    },
  },

  bg: {
    nav: {
      howItWorks: 'Как работи',
      whatIsRca: 'Какво е Гражданска отговорност',
      about: 'За нас',
    },
    hero: {
      headline: 'Твоята автозастраховка, проверена за 10 секунди.',
      subhead:
        'Въведи регистрационния номер. Виж статус, дата на изтичане и застраховател — безплатно, без регистрация.',
      plate: 'Регистрационен номер',
      plateTooltip: 'Използваме номера само за да извлечем данните на полицата ти. Нищо друго.',
      phone: 'Мобилен номер',
      phoneTooltip: 'За да ти напомним преди да изтече полицата. Без спам, никога не го продаваме.',
      cta: 'Провери безплатно',
      microcopy: '10 секунди. Без регистрация. Никога не продаваме данните ти.',
    },
    lifestyle: {
      headline: 'Твоят агент, онлайн.',
      body: 'Без офис, без опашки. Провери полицата, сравни всички застрахователи и поднови на правилната цена — направо от телефона.',
      bullets: ['Без офис.', 'Без бюрокрация.', 'Без опашки.', 'Бързо и лесно.', 'Сигурно и поверително.'],
      imageAlt: 'Човек проверява автозастраховката си от телефона',
    },
    trust: { regulated: 'Лицензиран и регулиран', drivers: '14 000+ шофьори' },
    social: {
      heading: 'Нула изненади. Питай тези, които вече са подновили.',
      rating: 'Средната оценка на шофьорите, подновили с нас.',
    },
    how: {
      heading: 'Как работи',
      steps: [
        { title: 'Въведи регистрационния номер', desc: 'Само номерът и мобилният ти телефон. Около десет секунди, без регистрация.' },
        { title: 'Виж резултатите веднага',       desc: 'Статус, дата на изтичане и застраховател — веднага на екрана. Без чакане, без обратно обаждане.' },
        { title: 'Не пропускай подновяването',    desc: 'Получаваш напомняне преди полицата да изтече, за да не оставаш без покритие — и да хванеш най-добрата цена в точния момент.' },
      ],
      illExpiry:    'Изтича',
      illBmClass:   'БМ клас',
      illBmValue:   'Клас 6',
      illExpDate:   '15 апр 2026',
      illCallLabel: 'Напомняне активирано',
      illCallBody:  'Обаждаме се 30 дни преди',
    },
    rca: {
      heading: 'Какво е Гражданска отговорност?',
      body: 'Гражданската отговорност е задължителна. Покрива щетите, които причиняваш на други хора, докато шофираш. Не твоята кола. Ето какво включва и какво не.',
      ctaTitle: 'Твоята Гражданска отговорност наред ли е?',
      ctaButton: 'Обади ни се сега',
      ctaNote: 'Отговаря ти човек, не бот.',
      covered: [
        'Телесни повреди на трети лица',
        'Чужди превозни средства и имущество',
        'Твоите пътници',
      ],
      notCovered: [
        'Твоята кола',
        'Кражба и пожар',
        'Вандализъм',
        'Природни бедствия',
        'Травми на виновния водач',
      ],
    },
    price: {
      factorsHeading: 'От какво зависи цената?',
      factors: [
        'Тип и мощност на автомобила',
        'Къде живееш',
        'Възраст и опит зад волана',
        'Твоят бонус-малус клас',
      ],
      chartHeading: 'Колко струва Гражданска отговорност в Италия през 2026?',
      chartSubhead:
        'Цената се различава силно по региони. Ето ориентировъчната средна годишна стойност.',
      footnote: 'Илюстративни данни — ще бъдат заменени с реални източници преди старта.',
      colRegion: 'Регион',
      colPrice: 'Средно €/година',
      mapHint: 'Докоснете регион, за да видите средната цена.',
      statMostExpensive: 'Най-скъп',
      statCheapest: 'Най-евтин',
      statAverage: 'Средно за страната',
      perYear: 'на година',
      legendLow: 'По-ниско',
      legendHigh: 'По-високо',
      perYearShort: '/год.',
    },
    faq: {
      heading: 'Често задавани въпроси',
      q1: 'Наистина ли е безплатно?',
      a1: 'Да. Проверката на статуса не струва нищо и не е нужна регистрация.',
      q2: 'Какво правите с номера ми?',
      a2: 'Използваме го, за да ти напомним преди изтичане. Не го продаваме, без спам.',
      q3: 'Застраховател ли сте?',
      a3: 'Не — ние сме регулиран брокер. Сравняваме всички застрахователи, намираме най-добрата цена и сключваш чрез нас.',
      q4: 'Мога ли да проверя всеки номер?',
      a4: 'Само твоя. С проверката потвърждаваш, че автомобилът е твой.',
      q5: 'Колко струва Гражданска отговорност в моя регион?',
      a5: 'Ориентировъчни средни годишни стойности по регион — илюстративни данни, не оферта.',
    },
    repeatCta: { headline: 'Твоят номер. Десет секунди. Готово.', cta: 'Провери безплатно' },
    footer: {
      companyLine: 'Trusti — лицензиран застрахователен брокер. Рег. № [номер].',
      colCompany: 'Компания',
      colLegal: 'Правни',
      company: [{ label: 'За нас', href: '/about' }, { label: 'Контакти', href: '/contact' }],
      legal: [{ label: 'Поверителност', href: '/privacy' }, { label: 'Условия', href: '/terms' }, { label: 'Бисквитки', href: '/cookies' }],
      humanLine: 'Въпроси? Обади ни се — вдига човек. [телефон] · [часове]',
    },
    result: {
      header: 'Твоята Гражданска отговорност · {plate}',
      insured: 'Застрахована',
      validUntil: 'Валидна до {date}',
      notInsured: 'Незастрахована',
      notInsuredSub: 'Този автомобил няма активна полица.',
      getCovered: 'Застраховай се сега',
      rowInsurer: 'Застраховател',
      reminder: 'Напомнянето е активирано',
      reminderSub: 'Ще ти се обадим преди да изтече.',
      secondaryCta: 'Искаш по-добра цена при подновяване?',
      checkAnother: 'Провери друг номер',
    },
    ui: { language: 'Език', theme: 'Тема', loading: 'Проверявам полицата ти…' },
    about: {
      hero: {
        headline: 'Най-добрият агент, при когото не трябва да идваш.',
        subhead: 'Застраховката трябва да е лесната част на деня ти — не едно следобедче в офис. Затова създадохме агента, който я оправя — онлайн.',
      },
      origin: {
        heading: 'Вече сме убивали опашки.',
        body: 'Основателите ни идват от Uber, където да прекосиш града стана въпрос на едно докосване. Погледнаха застраховането — пак номер в опашка, пак чакалня, пак документи — и видяха същия проблем, неразрешен. Затова създадоха Trusti: агентът, който познава всеки застраховател и вдига телефона. Онлайн.',
      },
      stats: [
        { value: '14,000', label: 'обслужени клиенти' },
        { value: '30+',    label: 'души, и растем' },
        { value: '4.9',    label: 'в Google · 981 отзива' },
      ],
      licence: {
        heading: 'Лицензирани в Европа. Отговорни пред теб.',
        body: 'Лицензирани сме от Комисията за финансов надзор и упълномощени да работим в целия ЕС — активни в България и Италия, и изграждаме останалото. Лицензът не е просто формалност. Означава, че сме задължени по закон да ти дадем честна препоръка, да защитим данните ти и да носим отговорност за всяка полица — пред теб и пред регулатора.',
      },
      certificate: {
        heading: 'Упълномощени. Регулирани. Отговорни пред теб.',
        body: 'Лицензът от Комисията за финансов надзор не е просто документ. Означава, че сме длъжни да ти предложим честен избор, да защитим данните ти и да носим отговорност — пред теб и пред държавата.',
        regNo: '№936-ЗБ / 05.06.2024',
        badgeLabel: 'СЕРТИФИЦИРАН БРОКЕР',
        authority: 'КОМИСИЯ ЗА ФИНАНСОВ НАДЗОР',
      },
      team: {
        heading: 'Хората, които вдигат.',
        body: 'Екип от 30 души, които познават индустрията отвътре — и вдигат телефона. Не безлична платформа. Агентът, когото би избрал, ако имаш избор.',
      },
      europe: {
        heading: 'Две страни днес. Един континент в плана.',
        body: 'Започнахме от България и сме активни в Италия. Целта е проста: да станем онлайн агентът, когото Европа наистина предпочита — един пазар в даден момент.',
      },
      promises: {
        heading: 'Какво да очакваш от нас',
        items: [
          { title: 'Сравни всичко. Спести повече.',   desc: 'Всички застрахователи, един до друг — за да отиват парите ти по-далеч.' },
          { title: 'Бързо. Ясно. Твое.',              desc: 'Застраховка, която работи така, както всичко останало на телефона ти.' },
          { title: 'Две минути, не цял следобед',     desc: 'Всичко от телефона ти.' },
          { title: 'С теб, от начало до край.',       desc: 'Подновяване, въпрос, щета — от наша страна винаги има някой, който вдига.' },
        ],
      },
      faq: [
        { q: 'Застраховател ли сте или брокер?', a: 'Брокер — и независим. Не продаваме собствени полици; сравняваме всеки застраховател и намираме най-добрия за теб. Купуваш чрез нас, покритието е тяхно.' },
        { q: 'Кой ви регулира?',               a: 'Комисията за финансов надзор. Ние сме лицензиран брокер (Рег. №936-ЗБ/05.06.2024), с право да работим в целия ЕС.' },
        { q: 'В кои страни работите?',         a: 'Активни сме в България и Италия, с още европейски пазари в план.' },
        { q: 'Как печелите?',                  a: 'Застрахователят ни плаща комисиона, когато купиш — същата, независимо дали ни се обърнеш или влезеш директно в техния офис. Trusti не те струва нищо повече.' },
        { q: 'Данните ми в безопасност ли са?', a: 'Да. Данните ти са криптирани, използват се само за намиране и управление на покритието ти и никога не се продават. Поискай ни да ги изтрием по всяко време.' },
      ],
      cta: { headline: 'Виж какво бихме намерили за теб.', button: 'Провери безплатно' },
    },
  },
} as const

export type Locale = keyof typeof messages
export const LOCALES: Locale[] = ['en', 'it', 'bg']
export const DEFAULT_LOCALE: Locale = 'it'

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  it: 'Italiano',
  bg: 'Български',
}

// Maps app locale to a BCP-47 tag for Intl formatting (dates, etc.).
export const LOCALE_TAGS: Record<Locale, string> = {
  en: 'en-GB',
  it: 'it-IT',
  bg: 'bg-BG',
}

// Tiny {placeholder} interpolation — replaces {key} with vars[key].
export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    key in vars ? String(vars[key]) : `{${key}}`,
  )
}
