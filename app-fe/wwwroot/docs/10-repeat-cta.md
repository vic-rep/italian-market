# RepeatCta

## File
`src/components/sections/RepeatCta.tsx`

## Purpose
Bottom-of-page reinforcement CTA. Repeats the primary action (plate check) for users who scrolled through the whole page without converting. Muted background box — not a dark section.

## Layout
```tsx
<section id="repeat" className="py-14 lg:py-16">
  <Container>
    <div className="rounded-3xl bg-muted px-6 py-12 text-center sm:py-16">
      <h2 className="mx-auto max-w-xl text-2xl text-balance sm:text-3xl">
        {t.repeatCta.headline}
      </h2>
      <button
        type="button"
        onClick={requestFormFocus}
        className="mt-7 inline-flex rounded-xl bg-action px-7 py-3.5 text-base font-semibold text-on-action transition-[filter] hover:brightness-95"
      >
        {t.repeatCta.cta}
      </button>
    </div>
  </Container>
</section>
```

## Button Behaviour
- `onClick={requestFormFocus}` — imported from `src/components/shared/formFocus.ts`
- `requestFormFocus` dispatches `CustomEvent('trusti:focus-form')` on `window`
- Hero listens for this event, calls `reset()`, scrolls `#check` into view, and focuses the plate input via `plateRef`
- Button is `type="button"` (not submit — there's no form here)

## Visual Details
- Container: `rounded-3xl bg-muted px-6 py-12 sm:py-16` — pill-shaped muted box, NOT `dark-grid-bg`
- CTA button: `bg-action text-on-action` — lime green, same as the Hero primary button
- Hover: `hover:brightness-95` via CSS filter — no colour override, just a slight dim
- `text-balance` on the headline for optical line-break control

## i18n Copy

### `repeatCta.headline`
| IT | EN | BG |
|---|---|---|
| La tua targa. Dieci secondi. Fatto. | Your plate. Ten seconds. Done. | Твоят номер. Десет секунди. Готово. |

### `repeatCta.cta`
| IT | EN | BG |
|---|---|---|
| Controlla gratis | Check for free | Провери безплатно |

## Dependencies
- `useI18n()` — for `t.repeatCta.*`
- `Container` shared component
- `requestFormFocus` from `src/components/shared/formFocus`
