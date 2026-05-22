# GoogleReviews

## Files
- `src/components/sections/GoogleReviews.tsx`
- `src/components/sections/googleReviews.css`

## Purpose
Social proof section showing a Google 4.9 rating badge and a draggable/navigable carousel of 6 review cards. Dark, premium aesthetic.

## Visual Design
- Dark rounded container (`border-radius: 32px`, `#0a1517` bg) with a purple radial glow at bottom-centre
- Perspective grid overlay at 20% opacity (same PNG as Hero/Footer, via `::after`)
- Two-column layout: heading/badge left, carousel right
- Wrapped in `<Container>` for horizontal padding

## Container CSS
```css
.gr-container {
  background-color: #0a1517;
  background-image: radial-gradient(
    ellipse at 50% 120%,
    rgba(155, 93, 229, 0.14) 0%,   /* purple glow — well under 2% rule */
    rgba(155, 93, 229, 0) 65%
  );
  border-radius: 32px;
  padding: 64px;
  color: #f9faf5;
}
.gr-container::after { /* perspective grid, opacity: 0.2 */ }
```

## Left Column
1. `GoogleRatingBadge` — inline SVG, 84px tall
   - Google G logo (4-colour paths)
   - "Google reviews" label in Montserrat 600
   - "4.9" in Montserrat 700 36px
   - 4 full stars + 1 half-star (linearGradient `#halfStarIT`)
2. `<h2>` — `t.social.heading`
3. `<p>` — `t.social.rating`

## Carousel (Right Column)
- Viewport: `.gr-cards-viewport` — `position: relative`, `height: 373px`, `overflow: hidden`, `cursor: grab`
- 2 cards visible at a time, positioned absolute with `left: slot * (cardWidth + GAP)`
- `AnimatePresence` + `motion.div` — spring animation on enter/exit
- Drag: `motion.div drag="x"` — swipe triggers `navigate(1)` or `navigate(-1)`
- Arrow buttons: prev/next, both always enabled (wraps around)
- `useCarouselLayout` hook: ResizeObserver on container, computes `isMobile`, `forceColumn`, `cardWidth`
- On mobile: viewport overflows its container by padding width (`width: calc(100% + 64px)`)

## Card Variants (3, cycling by index)
```ts
type CardVariant = 'surface' | 'surface-adjacent' | 'surface-adjacent-2'
// surface:             background: #121f22
// surface-adjacent:    background: #1c2e32
// surface-adjacent-2:  background: #162428
```
Orange variants from the original Design-system are removed (orange is banned).

## Animation Config
```ts
initial: dir > 0 ? { x: cardWidth + GAP, scale: 0.3, opacity: 0 }
                 : { x: -(cardWidth + GAP), scale: 0.3, opacity: 0 }
animate: { x: 0, opacity: 1, scale: 1 }
exit:    dir > 0 ? { x: -(cardWidth + GAP), scale: 0.3, opacity: 0 }
                 : { x: cardWidth + GAP, scale: 0.3, opacity: 0 }
transition: spring stiffness 560, damping 36, mass 0.4
```

## Section Heading (t.social.heading)
| IT | EN | BG |
|---|---|---|
| Zero sorprese. Chiedilo a chi ha già rinnovato. | Zero surprises. Ask those who've already renewed. | Нула изненади. Питай тези, които вече са подновили. |

## Subline (t.social.rating)
| IT | EN | BG |
|---|---|---|
| La media di chi ha rinnovato la RC Auto con noi. | The average among drivers who renewed their RC Auto with us. | Средната оценка на шофьорите, подновили с нас. |

## Review Cards — IT Locale
| # | Name | Text |
|---|---|---|
| 1 | Marco Ferretti | Non avevo mai rinnovato online prima. Avevo paura di sbagliare qualcosa. Invece ci hanno guidato passo passo e il documento è arrivato in pochi minuti. Non ci voleva nemmeno un ufficio. |
| 2 | Giulia Marchetti | Ho avuto un dubbio sulla clausola di guida esclusiva. Ho chiamato, ha risposto subito una persona — non un bot, non una coda. Mi ha spiegato tutto in tre minuti. Ormai è raro trovare questo. |
| 3 | Roberto Esposito | Mi aspettavo di spendere quanto con il mio agente di sempre. Invece ho risparmiato 140€. Stessa copertura, compagnia diversa. Il risparmio c'è, basta saperlo trovare. |
| 4 | Chiara Bianchi | Finalmente qualcuno che spiega cosa copre davvero la RC Auto e cosa no. Avevo una polizza da anni e non sapevo che i passeggeri erano già inclusi. Informazione utile, spiegata chiaramente. |
| 5 | Luca Fontana | Mi hanno chiamato trenta giorni prima della scadenza. Non me l'aspettavo. Ho rinnovato al telefono in dieci minuti, a un prezzo migliore dell'anno scorso. Lo uso da due anni ormai. |
| 6 | Sara Conti | Ho confrontato tre siti. Qui il prezzo era il più basso e non c'erano costi nascosti al momento del pagamento. Quello che vedevo era quello che pagavo. Semplice. |

## Review Cards — EN Locale
| # | Name | Text |
|---|---|---|
| 1 | Marco Ferretti | I'd never renewed online before. Was worried I'd mess something up. They walked me through it step by step and the document arrived in minutes. No office could have done better. |
| 2 | Giulia Marchetti | I had a question about the exclusive-driver clause. Called, a real person answered straight away — no bot, no queue. Explained everything in three minutes. Rare to find that these days. |
| 3 | Roberto Esposito | I expected to pay the same as with my usual agent. Saved €140 instead. Same cover, different insurer. The saving is there — you just need to know where to look. |
| 4 | Chiara Bianchi | Finally someone who explains what RC Auto actually covers and what it doesn't. Had a policy for years and didn't know passengers were already included. Useful, and explained clearly. |
| 5 | Luca Fontana | They called me thirty days before my expiry. Didn't see that coming. Renewed over the phone in ten minutes, better price than last year. Been using them for two years now. |
| 6 | Sara Conti | I compared three sites. Here the price was the lowest and there were no hidden charges at checkout. What I saw was what I paid. Simple. |

## Review Cards — BG Locale
| # | Name | Text |
|---|---|---|
| 1 | Марко Ферети | Никога преди не бях подновявал онлайн. Страхувах се да не объркам нещо. Но ме насочиха стъпка по стъпка и документът пристигна за минути. Нито един офис не би го направил по-добре. |
| 2 | Джулия Маркети | Имах въпрос за клаузата за изключителен шофьор. Обадих се, веднага отговори истински човек — не бот, не опашка. Обясни всичко за три минути. Рядко се среща вече. |
| 3 | Роберто Еспозито | Очаквах да платя колкото при стария си агент. Вместо това спестих 140€. Същото покритие, различен застраховател. Спестяването съществува — просто трябва да знаеш къде да го търсиш. |
| 4 | Киара Бианки | Най-накрая някой, който обяснява какво покрива наистина Гражданска отговорност и какво не. Имах полица от години и не знаех, че пътниците вече са включени. Полезна информация, обяснена ясно. |
| 5 | Лука Фонтана | Обадиха ми се тридесет дни преди изтичането. Не го очаквах. Подновиха за десет минути по телефона, на по-добра цена от миналата година. Използвам ги от две години вече. |
| 6 | Сара Конти | Сравних три сайта. Тук цената беше най-ниска и нямаше скрити такси при плащане. Това, което виждах, беше това, което плащах. Просто. |

## Constants
```ts
const N        = 6     // total reviews
const GAP      = 16    // px between cards
const MIN_CARD = 230   // minimum card width
const PEEK     = 40    // next-card peek amount
const PADDING_M  = 20  // mobile container padding
const PADDING_D  = 64  // desktop container padding
const MOBILE_BP  = 767 // breakpoint px
const GR_LEFT_W  = 354 // left column width px
const LAYOUT_GAP = 24  // gap between left and right columns
```

## Dependencies
- `motion/react` — AnimatePresence, motion.div (drag + animation)
- `useI18n()` — locale + t.social.*
- `Container` shared component
- `./googleReviews.css` — scoped CSS with `.gr-*` prefix
