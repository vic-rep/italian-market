# LifestyleBand

## File
`src/components/sections/LifestyleBand.tsx`

## Purpose
"Your agent, online" — bridges the hero form and the social proof section. A real photo on the left grounds the digital product in a human context. Light section, no dark background.

## Layout
- 2-column grid at `lg`: photo left, copy right
- Mobile: stacked (photo on top)
- `py-12 lg:py-16`

## Photo
- **File:** `/public/why-photo.jpg`
- **Dimensions:** 4896 × 3264 px (3:2 ratio)
- **Subject:** Bearded man in a chair holding a phone, warm natural light — not staged/studio
- **Rendered:** `aspect-[4/3]`, `object-cover object-center`, `rounded-2xl overflow-hidden`

```tsx
<div className="overflow-hidden rounded-2xl aspect-[4/3] w-full">
  <img
    src="/why-photo.jpg"
    alt="Person checking their car insurance on a phone"
    className="h-full w-full object-cover object-center"
  />
</div>
```

## Copy Column
Simple: `h2` + `p`. No icons, no badges, no buttons.

## i18n Copy

### `lifestyle.headline`
| IT | EN | BG |
|---|---|---|
| Il tuo agente, online. | Your agent, online. | Твоят агент, онлайн. |

### `lifestyle.body`
| IT | EN | BG |
|---|---|---|
| Niente ufficio, niente code. Controlla la polizza, confronta tutte le compagnie e rinnova al prezzo giusto — dal telefono. | No office, no queue. Check your policy, compare every insurer, and renew at the right price — all from your phone. | Без офис, без опашки. Провери полицата, сравни всички застрахователи и поднови на правилната цена — направо от телефона. |

## Notes
- This section previously hosted the "Licensed & regulated" and "14,000+ drivers" trust badges — they were moved to the Hero section below the subhead. Do NOT add them back here.
- No `dark-grid-bg`. Light section only.
