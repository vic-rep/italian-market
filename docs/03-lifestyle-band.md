# LifestyleBand

## File
`src/components/sections/LifestyleBand.tsx`

## Purpose
"Your agent, online" — bridges the hero form and the social proof section. A real photo on the left grounds the digital product in a human context. Light section, no dark background.

## Layout
- 2-column grid at `lg`: photo left, copy right (`grid lg:grid-cols-2`, `items-center`)
- Gaps: `gap-10 lg:gap-14`
- Mobile: stacked (photo on top)
- `py-12 lg:py-16`

## Photo
- **File:** `/public/the-italian.png`
- **Dimensions:** 1535 × 1024 px (≈3:2 ratio)
- **Subject:** Curly-haired, bearded man smiling in a warm, plant-filled interior — candid lifestyle shot, not staged/studio
- **Alt text:** driven by i18n (`lifestyle.imageAlt`), not hard-coded
- **Rendered:** `aspect-[4/3]`, `object-cover object-center`, `rounded-2xl overflow-hidden`

```tsx
<div className="overflow-hidden rounded-2xl aspect-[4/3] w-full">
  <img
    src="/the-italian.png"
    alt={t.lifestyle.imageAlt}
    className="h-full w-full object-cover object-center"
  />
</div>
```

## Copy Column
Wrapped in `max-w-xl`. Three parts:
- `h2` (`text-2xl sm:text-3xl`) — `lifestyle.headline`
- `p` (`mt-4 text-lg text-secondary`) — `lifestyle.body`
- `ul` (`mt-5 space-y-3`) — the `lifestyle.bullets` array, each rendered as an icon chip + label

Each bullet row is `flex items-center gap-3`:
- **Icon chip:** `h-10 w-10 rounded-xl bg-accent/10 text-accent`, icon sized `h-5 w-5`
- **Label:** `text-sm font-medium text-primary`

Icons come from a positional `BULLET_ICONS` array — they map to bullets by index, so **bullet order is significant**. Order: `PhoneIcon`, `ClipboardIcon`, `ClockIcon`, `ZapIcon`, `ShieldCheckIcon` (falls back to `PhoneIcon` if there are more bullets than icons).

```tsx
<ul className="mt-5 space-y-3">
  {t.lifestyle.bullets.map((bullet, index) => {
    const Icon = BULLET_ICONS[index] ?? PhoneIcon
    return (
      <li key={bullet} className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <Icon className="h-5 w-5" />
        </span>
        <span className="text-sm font-medium text-primary">{bullet}</span>
      </li>
    )
  })}
</ul>
```

## i18n Copy

### `lifestyle.headline`
| IT | EN | BG |
|---|---|---|
| Il tuo agente, online. | Your agent, online. | Твоят агент, онлайн. |

### `lifestyle.body`
| IT | EN | BG |
|---|---|---|
| Niente ufficio, niente code. Controlla la polizza, confronta tutte le compagnie e rinnova al prezzo giusto — dal telefono. | No office, no queue. Check your policy, compare every insurer, and renew at the right price — all from your phone. | Без офис, без опашки. Провери полицата, сравни всички застрахователи и поднови на правилната цена — направо от телефона. |

### `lifestyle.bullets` (5 items, icon order above)
| # | Icon | IT | EN | BG |
|---|---|---|---|---|
| 1 | PhoneIcon | Nessun ufficio. | No office. | Без офис. |
| 2 | ClipboardIcon | Nessuna burocrazia. | No paperwork. | Без бюрокрация. |
| 3 | ClockIcon | Nessuna coda. | No queue. | Без опашки. |
| 4 | ZapIcon | Rapido e semplice. | Quick, simple. | Бързо и лесно. |
| 5 | ShieldCheckIcon | Sicuro e riservato. | Secure and private. | Сигурно и поверително. |

### `lifestyle.imageAlt`
| IT | EN | BG |
|---|---|---|
| Una persona controlla la sua RC Auto dal telefono | Person checking their car insurance on a phone | Човек проверява автозастраховката си от телефона |

## Notes
- This section previously hosted the "Licensed & regulated" and "14,000+ drivers" trust badges — they were moved to the Hero section below the subhead. Do NOT add them back here.
- No `dark-grid-bg`. Light section only.
