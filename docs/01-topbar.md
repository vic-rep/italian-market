# TopBar

## File
`src/components/sections/TopBar.tsx`

## Purpose
Sticky navigation bar at the top of the page. Contains: logo (click scrolls to top), nav links, language switcher, theme toggle.

## Layout
```
[Logo]   [How it works] [What is RC Auto] [About us]   [Lang] [Theme]
```
Nav links hidden on mobile (`hidden md:flex`). Logo and right controls always visible.

## Key Classes
- `sticky top-0 z-40` — stays visible while scrolling
- `border-b border-border bg-page/85 backdrop-blur` — frosted-glass effect
- `h-16` — fixed 64px height

## Logo Behaviour
Uses `<Logo onActivate={...} />` component. `onActivate` fires `window.scrollTo({ top: 0, behavior: 'smooth' })`.

Logo is **theme-aware**:
- Light mode → `/logo-positive.svg` (dark #191919 wordmark)
- Dark mode → `/logo-negative.svg` (white wordmark)
- Switching is handled by `useTheme()` inside `Logo.tsx`
- Size: `width={107} height={24}`

## Nav Links
| href | i18n key |
|---|---|
| `#how` | `t.nav.howItWorks` |
| `#rca` | `t.nav.whatIsRca` |
| `#footer` | `t.nav.about` |

## i18n Copy

### `nav.howItWorks`
| Locale | Value |
|---|---|
| it | Come funziona |
| en | How it works |
| bg | Как работи |

### `nav.whatIsRca`
| Locale | Value |
|---|---|
| it | Cos'è la RC Auto |
| en | What is RC Auto |
| bg | Какво е Гражданска отговорност |

### `nav.about`
| Locale | Value |
|---|---|
| it | Chi siamo |
| en | About us |
| bg | За нас |

## Dependencies
- `Container` — horizontal padding wrapper
- `Logo` — `src/components/shared/Logo.tsx`
- `LanguageSwitcher` — `src/components/shared/LanguageSwitcher.tsx`
- `ThemeToggle` — `src/components/shared/ThemeToggle.tsx`
- `useI18n()` — for nav labels
