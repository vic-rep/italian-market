# HowItWorks

## File
`src/components/sections/HowItWorks.tsx`

## Purpose
Explains the three-step flow: enter plate → see results → get renewal reminder. Light section (`py-16 lg:py-24`), no dark background. Cards animate on hover; animations reverse at 2× speed on mouse out.

## Layout
- `<section id="how">`
- `<h2>` centred, reads `t.how.heading`
- `<ol>` — `grid gap-6 sm:grid-cols-2 lg:grid-cols-3`

## StepCard Component
Owns `hovered: boolean` state. Sets it `true` on `onMouseEnter`, `false` on `onMouseLeave`. Passes `hovered` as prop to the active `Illustration*` component.

```tsx
<li
  className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface"
  onMouseEnter={() => setHovered(true)}
  onMouseLeave={() => setHovered(false)}
>
  {/* Illustration slot — h-[13.5rem], bg-muted, perspective grid overlay at 7% opacity */}
  <div className="relative h-[13.5rem] overflow-hidden bg-muted">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: "url('/perspective-grid.png')",
        backgroundPosition: 'bottom center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
        opacity: 0.07,
      }}
    />
    <Illustration hovered={hovered} />
  </div>
  {/* Text */}
  <div className="flex flex-1 flex-col gap-2 p-6">
    <div className="flex items-center gap-3">
      <span className="font-heading text-2xl font-semibold text-accent">{index + 1}</span>
      <span className="font-heading text-lg font-semibold text-primary">{title}</span>
    </div>
    <p className="text-sm leading-relaxed text-secondary sm:text-[0.9375rem]">{desc}</p>
  </div>
</li>
```

## Illustration Components

### `IllustrationPlate` (Card 1) — phone field focus animation
**Props:** `{ hovered: boolean }`

- **Top element:** EU-style Italian licence plate (static)
  - Left strip: `bg-[#003399]`, gold star (`#FFD700`, 8px), "I" in white 9px bold
  - Right strip: `bg-white`, "AB 123 CD" in `font-mono text-[1.3rem] tracking-[0.18em] text-[#0a1517]`
  - Container: `rounded-md shadow-lg`, outline `2.5px solid rgba(0,51,153,0.25)`
- **Bottom element:** phone input field (simulated focus state)
  - `w-[190px]`, `rounded-xl bg-surface px-3.5 py-2.5`
  - Border transitions: `1.5px solid #9b5de5` (hovered) ↔ `var(--c-border)` (rest)
  - Box-shadow transitions: `0 0 0 3px rgba(155,93,229,0.15)` (hovered) ↔ `0 0 0 0px` (rest)
  - `transition` duration: `200ms` forward, `100ms` reverse (inline style, `hovered ? 200 : 100`)
  - Content: `PhoneLineIcon` + `+39 ` prefix
  - **Blinking cursor** — `motion.span`, `bg-accent`, `2px` wide, `animate={{ opacity: [1,0] }}`, `duration: 0.5, repeat: Infinity, repeatType: 'reverse'` — only rendered when `hovered`
  - **Placeholder dots** `· · · · · · ·` — `motion.span`, `animate={{ opacity: hovered ? 0 : 1 }}`, `transition={{ duration: hovered ? 0.12 : 0.28 }}` — kept in DOM for layout stability

### `IllustrationPolicy` (Card 2) — policy card: badge scale + row tint sweep
**Props:** `{ hovered: boolean }` | Calls `useI18n()`

- Card: `w-full max-w-[236px] rounded-2xl bg-surface p-4 shadow-lg ring-1 ring-border`
- Header row: plate "AB 123 CD" (left) + insured badge (right)
- **Badge** — `motion.span`, `bg-action/20 px-2 py-0.5 text-[11px] text-on-action whitespace-nowrap`
  - `animate={hovered ? { scale: 1.1 } : { scale: 1 }}`
  - `transition={{ type: 'spring', stiffness: 380, damping: 22 }}`
  - Content: `CheckSmIcon` + `t.result.insured`
- Divider: `h-px bg-border`
- **3 data rows** — label / value pairs, top→bottom tint sweep on hover:
  - Row 0: `t.result.rowInsurer` / "Generali"
  - Row 1: `t.how.illExpiry` / `t.how.illExpDate`
  - Row 2: `t.how.illBmClass` / `t.how.illBmValue`
  - Each row inline style:
    ```ts
    backgroundColor: hovered ? 'rgba(155, 93, 229, 0.08)' : 'transparent'
    transition: `background-color ${hovered ? 200 : 100}ms ease`
    transitionDelay: hovered ? `${i * 70}ms` : `${(2 - i) * 35}ms`
    ```
    Forward: top first (0ms → 70ms → 140ms). Reverse: bottom first (70ms → 35ms → 0ms).

### `IllustrationCall` (Card 3) — phone wobble + ripple rings
**Props:** `{ hovered: boolean }` | Calls `useI18n()`

- Circle container: `h-[3.5rem] w-[3.5rem] rounded-full bg-accent/10 relative`
- **2 ripple rings** — `motion.span`, `ring-2 ring-accent/40 rounded-full absolute inset-0`
  - Delays: `[0, 0.55]` seconds
  - `animate={hovered ? { scale: [1, 1.75], opacity: [0.65, 0] } : { scale: 1, opacity: 0 }}`
  - `transition={hovered ? { duration: 1.1, repeat: Infinity, delay, ease: 'easeOut' } : { duration: 0.15 }}`
- **Phone icon wobble** — `motion.div` wrapping `PhoneCallIcon`
  - `animate={hovered ? { rotate: [0, -14, 14, -10, 10, -5, 5, 0] } : { rotate: 0 }}`
  - `transition={hovered ? { duration: 0.65, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.4 } : { duration: 0.2 }}`
  - `PhoneCallIcon`: stroke `#9b5de5`, 26×26px SVG
- **Notification badge** below circle:
  - `rounded-2xl bg-surface px-5 py-3 shadow-lg ring-1 ring-border`
  - Label: `text-[10px] font-semibold uppercase tracking-widest text-secondary` → `t.how.illCallLabel`
  - Body: `font-heading text-[0.9rem] font-semibold text-primary` → `t.how.illCallBody`

## Icons (local, inline SVG)
| Name | Usage |
|---|---|
| `PhoneLineIcon` | 14×14px, card 1 phone field |
| `CheckSmIcon` | 9×9px, card 2 badge |
| `PhoneCallIcon` | 26×26px, card 3 wobble, stroke `#9b5de5` |

## i18n Keys

### `how.heading`
| IT | EN | BG |
|---|---|---|
| Come funziona | How it works | Как работи |

### `how.steps` (array of `{ title, desc }`)
| # | IT title | EN title | BG title |
|---|---|---|---|
| 0 | Inserisci la targa | Enter your plate | Въведи регистрационния номер |
| 1 | Vedi subito i risultati | See your results instantly | Виж резултатите веднага |
| 2 | Non perdere la scadenza | Never miss your renewal | Не пропускай подновяването |

| # | IT desc | EN desc | BG desc |
|---|---|---|---|
| 0 | La tua targa e il numero di cellulare — tutto qui. Circa dieci secondi, senza registrazione. | Your plate and mobile number — that's all. About ten seconds, no account. | Само номерът и мобилният ти телефон. Около десет секунди, без регистрация. |
| 1 | Stato, scadenza, compagnia, classe di merito e anche eventuali multe — subito a schermo. Nessuna attesa, nessuna richiamata. | Status, renewal date, insurer, bonus-malus class, even any open fines — on screen right away. No waiting, no callback. | Статус, дата на изтичане, застраховател, бонус-малус клас и дори регистрирани глоби — веднага на екрана. Без чакане, без обратно обаждане. |
| 2 | Ricevi un promemoria prima che la polizza scada, così non resti mai scoperto — e trovi il prezzo migliore al momento giusto. | Get a reminder before your policy expires, so you're never caught uninsured — and find the best price when it's time. | Получаваш напомняне преди полицата да изтече, за да не оставаш без покритие — и да хванеш най-добрата цена в точния момент. |

### Illustration text keys
| Key | IT | EN | BG |
|---|---|---|---|
| `how.illExpiry` | Scadenza | Expires | Изтича |
| `how.illBmClass` | Classe BM | BM class | БМ клас |
| `how.illBmValue` | 6ª classe | Class 6 | Клас 6 |
| `how.illExpDate` | 15 apr 2026 | 15 Apr 2026 | 15 апр 2026 |
| `how.illCallLabel` | Promemoria attivato | Reminder set | Напомняне активирано |
| `how.illCallBody` | Ti chiamiamo 30 giorni prima | We call 30 days before | Обаждаме се 30 дни преди |

## Key Implementation Notes
- `StepCard` calls `useI18n()` indirectly through `IllustrationPolicy` and `IllustrationCall`. The illustration components call `useI18n()` themselves — this is why the animation text is locale-reactive without prop-drilling.
- No `useEffect` / `useRef` in `IllustrationPlate` — the cursor blink is pure Framer Motion `animate` with `repeat: Infinity`.
- Placeholder dots are kept in the DOM (`opacity: 0`, not `display: none`) so the field width is stable.
- The reverse animation uses `hovered ? 200 : 100` inline for `transition-duration` — effectively 2× faster on mouse out.
- `whitespace-nowrap` on the policy badge prevents "Напомняне активирано" (longer BG string) from wrapping inside the card header.

## Dependencies
- `motion/react` — motion.div, motion.span
- `useI18n()` — inside `IllustrationPolicy` and `IllustrationCall`
- `Container` shared component
- No CSS file — all styling via Tailwind + inline styles
