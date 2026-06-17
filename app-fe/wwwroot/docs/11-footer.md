# Footer

## File
`src/components/sections/Footer.tsx`

## Purpose
Dark footer with logo, three navigation columns (Product / Company / Legal), and a "human line" — a phone-number strip that reinforces the human-answers promise. Also a nav target (`id="footer"`, linked from TopBar "About us").

## Visual Design
- `dark-grid-bg bg-footer text-footer-text`
  - `bg-footer` = `#0a1517` (same olive-black as Hero)
  - `text-footer-text` = `#f9faf5` (near-white)
  - `dark-grid-bg` = perspective grid PNG at 20% opacity via `::after` pseudo-element (shared with Hero and GoogleReviews container)
- No rounded corners (full-bleed footer)

## Layout
```tsx
<footer id="footer" className="dark-grid-bg bg-footer text-footer-text">
  <Container className="py-12 lg:py-16">
    {/* 4-column grid: logo+blurb | Product | Company | Legal */}
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
      <div className="max-w-xs">
        <img src="/logo-negative.svg" alt="Trusti" width={107} height={24} className="block" />
        <p className="mt-4 text-sm text-footer-text/70">{t.footer.companyLine}</p>
      </div>
      {columns.map((column) => (
        <nav key={column.heading} aria-label={column.heading}>
          <h3 className="font-heading text-sm font-semibold text-footer-text">{column.heading}</h3>
          <ul className="mt-4 space-y-2.5">
            {column.links.map((link) => (
              <li key={link}>
                <a href="#" className="text-sm text-footer-text/70 transition-colors hover:text-footer-text">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ))}
    </div>

    {/* Human line */}
    <div className="mt-10 border-t border-white/10 pt-6">
      <p className="inline-flex items-center gap-2 text-sm font-medium text-footer-text">
        <PhoneIcon className="h-5 w-5 shrink-0 text-action" />
        {t.footer.humanLine}
      </p>
    </div>
  </Container>
</footer>
```

## Logo
- `/logo-negative.svg` — white wordmark (dark backgrounds). Width 107px, height 24px.
- TopBar uses `/logo-positive.svg` (dark wordmark) in light mode, same `/logo-negative.svg` in dark mode. Footer always uses negative.

## Columns (built from i18n arrays)
```ts
const columns = [
  { heading: t.footer.colProduct, links: t.footer.product },
  { heading: t.footer.colCompany, links: t.footer.company },
  { heading: t.footer.colLegal,   links: t.footer.legal },
]
```
All links are `href="#"` placeholders — not wired to real pages.

## Human Line
- `PhoneIcon` in `text-action` (lime green `#b9e856`) — the only green element in the footer
- Placed below a `border-t border-white/10` divider
- Reinforces "a person answers" — same promise as `social.humanPromise` and `hero` subtext

## i18n Copy

### `footer.companyLine`
| IT | EN | BG |
|---|---|---|
| Trusti — broker assicurativo autorizzato. Iscr. [n. IT]. | Trusti — a licensed insurance broker. Reg. [IT number]. | Trusti — лицензиран застрахователен брокер. Рег. № [номер]. |

### Column headings
| Key | IT | EN | BG |
|---|---|---|---|
| colProduct | Prodotti | Product | Продукти |
| colCompany | Azienda | Company | Компания |
| colLegal | Note legali | Legal | Правни |

### `footer.product` (array)
| IT | EN | BG |
|---|---|---|
| RC Auto, Kasko, Confronta | RC Auto, Kasko, Compare | Гражданска отговорност, Каско, Сравни |

### `footer.company` (array)
| IT | EN | BG |
|---|---|---|
| Chi siamo, Come funziona, Contatti | About, How it works, Contact | За нас, Как работи, Контакти |

### `footer.legal` (array)
| IT | EN | BG |
|---|---|---|
| Privacy, Termini, Cookie | Privacy, Terms, Cookie | Поверителност, Условия, Бисквитки |

### `footer.humanLine`
| IT | EN | BG |
|---|---|---|
| Domande? Chiamaci — risponde una persona. [telefono] · [orari] | Questions? Call us — a person answers. [phone] · [hours] | Въпроси? Обади ни се — вдига човек. [телефон] · [часове] |

## Pre-Launch Placeholders
All `[bracketed]` values in `companyLine` and `humanLine` must be replaced with real data before launch:
- IT broker registration number
- Phone number
- Operating hours

## Dependencies
- `useI18n()` — for all `t.footer.*`
- `Container` shared component
- `PhoneIcon` from `../shared/icons`
