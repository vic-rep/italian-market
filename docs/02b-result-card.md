# ResultCard

## File
`src/components/sections/ResultCard.tsx`

## Purpose
Shown in Hero's right column after a successful plate check. Displays policy status, details, and a reminder confirmation. Replaces the form entirely.

## Props
```ts
{ result: RcaResult; plate: string; onReset: () => void }
```

## RcaResult Shape (from mock API)
```ts
{
  status: 'insured' | 'uninsured'
  insurer: string          // e.g. 'Generali'
  validUntil: string       // ISO date string
  activeSince: string      // ISO date string
  vehicle: string          // e.g. 'Fiat Panda'
  powerCv: number
  bonusMalusClass: string  // e.g. '6ª classe'
  finesOnRecord: number
}
```

## Insured State Layout
1. Header: `t.result.header` (interpolated with plate)
2. Green badge: CheckIcon + `t.result.insured` + `t.result.validUntil` (formatted date)
3. `<dl>` detail rows: Insurer, Active since, Vehicle + CV, Bonus-malus class, Fines
4. Purple reminder box: CheckIcon + `t.result.reminder` + `t.result.reminderSub`
5. Secondary CTA button: `t.result.secondaryCta`
6. Reset link: `t.result.checkAnother`

## Uninsured State Layout
1. Header: `t.result.header`
2. Muted badge: XIcon + `t.result.notInsured`
3. Sub-text: `t.result.notInsuredSub`
4. Prominent `bg-action` CTA: `t.result.getCovered`
5. Reset link: `t.result.checkAnother`

## Date Formatting
```ts
function formatDate(iso: string, localeTag: string): string {
  return new Intl.DateTimeFormat(localeTag, {
    day: 'numeric', month: 'long', year: 'numeric',
  }).format(new Date(iso))
}
// localeTag: 'it-IT' | 'en-GB' | 'bg-BG'
```

## Reminder Box Styling
```tsx
<div className="rounded-2xl border border-accent/25 bg-accent/10 p-4">
  // Purple-tinted box — accent/10 bg is well within the 2% purple constraint
  // because this box is small and only visible after a result
```

## i18n Keys
| Key | IT | EN | BG |
|---|---|---|---|
| result.header | La tua RC Auto · {plate} | Your RC Auto · {plate} | Твоята Гражданска отговорност · {plate} |
| result.insured | Assicurata | Insured | Застрахована |
| result.validUntil | Valida fino al {date} | Valid until {date} | Валидна до {date} |
| result.notInsured | Non assicurata | Not insured | Незастрахована |
| result.notInsuredSub | Questo veicolo non ha una polizza attiva. | This vehicle has no active policy. | Този автомобил няма активна полица. |
| result.getCovered | Assicurati ora | Get covered now | Застраховай се сега |
| result.rowInsurer | Compagnia | Insurer | Застраховател |
| result.rowActiveSince | Attiva dal | Active since | Активна от |
| result.rowVehicle | Veicolo | Vehicle | Автомобил |
| result.rowBonusMalus | Classe di merito | Bonus-malus class | Бонус-малус клас |
| result.rowFines | Multe registrate | Fines on record | Регистрирани глоби |
| result.reminder | Promemoria attivato | Reminder set | Напомнянето е активирано |
| result.reminderSub | Ti chiamiamo prima della scadenza. | We'll call you before it expires. | Ще ти се обадим преди да изтече. |
| result.secondaryCta | Vuoi un prezzo migliore al rinnovo? | Want a better price at renewal? | Искаш по-добра цена при подновяване? |
| result.checkAnother | Controlla un'altra targa | Check another plate | Провери друг номер |

## Dependencies
- `useI18n()` — for `t` and `localeTag`
- `fmt()` from `src/i18n/messages.ts`
- `CheckIcon`, `XIcon` from `../shared/icons`
