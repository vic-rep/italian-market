# WhatIsRca

## File
`src/components/sections/WhatIsRca.tsx`

## Purpose
Educational section. Explains what RC Auto (Responsabilità Civile Auto) is, what it covers, and what it doesn't. Also introduces Kasko as an upsell. Nav target (`id="rca"`).

## Layout
```tsx
<section id="rca" className="py-14 lg:py-20">
  <Container className="grid gap-10 lg:grid-cols-2 lg:gap-14">
    {/* Left: explanation + kasko box */}
    <div className="max-w-xl">
      <h2>{t.rca.heading}</h2>
      <p className="mt-5 text-lg text-secondary">{t.rca.body}</p>
      <p className="mt-6 rounded-2xl border border-accent/25 bg-accent/10 p-4 font-medium text-primary">
        {t.rca.kasko}
      </p>
    </div>

    {/* Right: covered / not-covered lists */}
    <div className="rounded-2xl border border-border bg-surface p-6 sm:p-7">
      <ul> {/* covered items with green circle + CheckIcon */} </ul>
      <hr className="my-5 border-border" />
      <ul> {/* not-covered items with XIcon */} </ul>
    </div>
  </Container>
</section>
```

## Kasko Box
```tsx
<p className="mt-6 rounded-2xl border border-accent/25 bg-accent/10 p-4 font-medium text-primary">
  {t.rca.kasko}
</p>
```
Purple-tinted box. `bg-accent/10` and `border-accent/25` — small element, well within the 2% purple constraint.

## Covered Items (green check)
```tsx
<span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-action text-on-action">
  <CheckIcon className="h-3.5 w-3.5" />
</span>
```
`bg-action` = lime green `#b9e856`. `text-on-action` = dark text for contrast.

## Not-Covered Items (grey X)
```tsx
<XIcon className="mt-0.5 h-5 w-5 shrink-0 text-tertiary" />
```
No circle — just the icon in `text-tertiary` (muted).

## i18n Copy

### `rca.heading`
| IT | EN | BG |
|---|---|---|
| Cos'è la RC Auto? | What is RC Auto? | Какво е Гражданска отговорност? |

### `rca.body`
| IT | EN | BG |
|---|---|---|
| La RC Auto — Responsabilità Civile Auto — è obbligatoria in Italia. Copre i danni che provochi agli altri quando guidi. Non la tua auto. Ecco cosa include, e cosa no. | RC Auto — Responsabilità Civile Auto — is mandatory in Italy. It covers the damage you cause to other people when you're driving. Not your own car. Here's exactly what's in, and what's not. | Гражданската отговорност е задължителна. Покрива щетите, които причиняваш на други хора, докато шофираш. Не твоята кола. Ето какво включва и какво не. |

### `rca.kasko`
| IT | EN | BG |
|---|---|---|
| Vuoi coprire anche quelli? È la Kasko — ci pensiamo noi. | Want cover for those too? That's Kasko — we can sort that. | Искаш и това да е покрито? Това е Каско — ще го уредим. |

### `rca.covered` (string array, 3 items)
| # | IT | EN | BG |
|---|---|---|---|
| 0 | Lesioni ad altre persone | Injury to other people | Телесни повреди на трети лица |
| 1 | Veicoli e cose di terzi | Other vehicles and property | Чужди превозни средства и имущество |
| 2 | I tuoi passeggeri | Your passengers | Твоите пътници |

### `rca.notCovered` (string array, 5 items)
| # | IT | EN | BG |
|---|---|---|---|
| 0 | La tua auto | Your own car | Твоята кола |
| 1 | Furto e incendio | Theft and fire | Кражба и пожар |
| 2 | Atti vandalici | Vandalism | Вандализъм |
| 3 | Eventi atmosferici | Weather damage | Природни бедствия |
| 4 | Lesioni del conducente responsabile | The at-fault driver's injuries | Травми на виновния водач |

## Dependencies
- `useI18n()` — for `t.rca.*`
- `Container` shared component
- `CheckIcon`, `XIcon` from `../shared/icons`
