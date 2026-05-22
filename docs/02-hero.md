# Hero

## File
`src/components/sections/Hero.tsx`

## Purpose
Primary conversion section. Left column: brand copy + trust signals. Right column: plate-check form that transitions to a result card on submission.

## Visual Design
- **Dark section:** `dark-grid-bg bg-footer` — olive-black (`#0a1517`) background with perspective-grid overlay at 20% opacity
- **Two-column grid:** `lg:grid-cols-2` — copy left, form/result right
- Text colours: `text-footer-text` (`#f9faf5`) and `text-footer-text/70`
- Stars use `text-action` (lime green `#b9e856`)

## Left Column Structure (top → bottom)
1. **Google rating row** — `★★★★★` (text, `text-action`) + `t.social.rating` (small text)
2. **`<h1>`** — `t.hero.headline`
3. **Subhead `<p>`** — `t.hero.subhead`
4. **Trust badges row** — `ShieldCheckIcon` + `t.trust.regulated` · `UsersIcon` + `t.trust.drivers`

## Right Column — Form
```tsx
<form id="check">
  <label + input for plate>   // uppercase, font-medium, tracking-wide
  <Tooltip for plate>
  <label + input for phone>
  <Tooltip for phone>
  <button type="submit">      // bg-action text-on-action
  <p class="microcopy">       // t.hero.microcopy
</form>
```
- `plateRef` is used for programmatic focus
- Button shows spinner + `t.ui.loading` while loading
- `disabled:opacity-60` on inputs during loading

## Right Column — Result State
When status === 'result', form is replaced by `<ResultCard result={result} plate={submittedPlate} onReset={reset} />`. See `docs/02b-result-card.md`.

## State
```ts
type Status = 'idle' | 'loading' | 'result'
const [status, setStatus]           // drives which UI is shown
const [result, setResult]           // RcaResult | null
const [plate, setPlate]             // controlled input
const [phone, setPhone]             // controlled input
const [submittedPlate, setSubmittedPlate]  // plate value frozen at submit time
```

## Focus Event System
`FOCUS_FORM_EVENT` (`'trusti:focus-form'`) is dispatched by:
- Logo click (TopBar)
- RepeatCta button

Hero listens for it, calls `reset()`, then scrolls `#check` into view and focuses `plateRef`.

## API
```ts
import { checkPlate, type RcaResult } from '../../api/checkPlate'
const res = await checkPlate(plate.trim(), phone.trim())
// Returns mock RcaResult { status: 'insured' | 'uninsured', ... }
```

## i18n Copy

### `hero.*`
| Key | IT | EN | BG |
|---|---|---|---|
| headline | La tua RC Auto, verificata in 10 secondi. | Your car insurance, checked in 10 seconds. | Твоята автозастраховка, проверена за 10 секунди. |
| subhead | Inserisci la targa. Scopri stato, scadenza e classe di merito — gratis, senza registrazione. | Enter your plate. See your status, renewal date, and bonus-malus class — free, no account. | Въведи регистрационния номер. Виж статус, дата на изтичане и бонус-малус клас — безплатно, без регистрация. |
| plate | Targa | Number plate | Регистрационен номер |
| phone | Numero di cellulare | Mobile number | Мобилен номер |
| cta | Controlla gratis | Check for free | Провери безплатно |
| microcopy | 10 secondi. Senza registrazione. Non vendiamo mai i tuoi dati. | 10 seconds. No account. We never sell your data. | 10 секунди. Без регистрация. Никога не продаваме данните ти. |

### `social.rating` (used in hero above headline)
| IT | EN | BG |
|---|---|---|
| La media di chi ha rinnovato la RC Auto con noi. | The average among drivers who renewed their RC Auto with us. | Средната оценка на шофьорите, подновили с нас. |

### `trust.*`
| Key | IT | EN | BG |
|---|---|---|---|
| regulated | Autorizzata e regolamentata | Licensed & regulated | Лицензиран и регулиран |
| drivers | 14.000+ automobilisti | 14,000+ drivers | 14 000+ шофьори |

### `hero.plateTooltip` / `hero.phoneTooltip`
| Key | IT | EN |
|---|---|---|
| plateTooltip | Usiamo la targa solo per recuperare i dati della tua polizza. Nient'altro. | We use your plate to pull your policy details. Nothing else. |
| phoneTooltip | Per ricordarti la scadenza prima che arrivi. Niente spam, mai ceduto a terzi. | So we can remind you before your policy expires. No spam, never sold. |

## Dependencies
- `Container`, `Tooltip`, `ShieldCheckIcon`, `UsersIcon`
- `FOCUS_FORM_EVENT`, `requestFormFocus` from `src/components/shared/formFocus.ts`
- `ResultCard` from `./ResultCard`
- `checkPlate` from `../../api/checkPlate`
- `useI18n()`
