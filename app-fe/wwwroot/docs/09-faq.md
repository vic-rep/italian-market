# Faq

## File
`src/components/sections/Faq.tsx`

## Purpose
Five common questions about the service: cost, data use, broker status, plate ownership, and regional pricing. Addresses conversion objections. The last answer embeds the full regional price table (`RegionalPriceTable`). No dark background. Container is max-width 3xl (centred, narrower than full-width).

## Layout
```tsx
<section className="py-14 lg:py-20">
  <Container className="max-w-3xl">
    <h2 className="text-2xl sm:text-3xl">{t.faq.heading}</h2>
    <div className="mt-6">
      {items.map((item) => (
        <details key={item.q} className="group border-b border-border">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-semibold text-primary [&::-webkit-details-marker]:hidden">
            {item.q}
            <ChevronDownIcon className="h-5 w-5 shrink-0 text-secondary transition-transform duration-200 group-open:rotate-180" />
          </summary>
          <div className="pb-4 text-secondary">
            <p>{item.a}</p>
            {item.node && <div className="mt-4">{item.node}</div>}
          </div>
        </details>
      ))}
    </div>
  </Container>
</section>
```

## Accordion Mechanism
- Native HTML `<details>` / `<summary>` — no JS state needed
- `group` Tailwind class enables the `group-open:rotate-180` chevron flip
- `[&::-webkit-details-marker]:hidden` — removes the browser-default disclosure triangle in WebKit
- `ChevronDownIcon` rotates 180° when `details` is open, using `transition-transform duration-200`
- No `AnimatePresence` or Framer Motion — intentional, keeps this section dependency-free

## Items (hard-coded from `t.faq.*`)
```ts
const items: { q: string; a: string; node?: ReactNode }[] = [
  { q: t.faq.q1, a: t.faq.a1 },
  { q: t.faq.q2, a: t.faq.a2 },
  { q: t.faq.q3, a: t.faq.a3 },
  { q: t.faq.q4, a: t.faq.a4 },
  { q: t.faq.q5, a: t.faq.a5, node: <RegionalPriceTable /> },
]
```
The optional `node` renders below the answer paragraph — used only by q5 to embed the regional price table.

## i18n Copy

### `faq.heading`
| IT | EN | BG |
|---|---|---|
| Domande frequenti | Frequently asked questions | Често задавани въпроси |

### Q&A pairs
| Key | IT | EN | BG |
|---|---|---|---|
| q1 | È davvero gratis? | Is it really free? | Наистина ли е безплатно? |
| a1 | Sì. Controllare lo stato non costa nulla e non serve registrarsi. | Yes. Checking your status costs nothing, and there's no account to create. | Да. Проверката на статуса не струва нищо и не е нужна регистрация. |
| q2 | Cosa fate con il mio numero? | What do you do with my number? | Какво правите с номера ми? |
| a2 | Lo usiamo per ricordarti la scadenza. Mai ceduto, mai spam. | We use it to remind you before your policy expires. Never sold, never spammed. | Използваме го, за да ти напомним преди изтичане. Не го продаваме, без спам. |
| q3 | Siete una compagnia assicurativa? | Are you an insurer? | Застраховател ли сте? |
| a3 | No — siamo un broker regolamentato. Confrontiamo tutte le compagnie, troviamo il prezzo migliore e acquisti tramite noi. | No — we're a regulated broker. We compare every insurer, find you the best price, and you buy through us. | Не — ние сме регулиран брокер. Сравняваме всички застрахователи, намираме най-добрата цена и сключваш чрез нас. |
| q4 | Posso controllare qualsiasi targa? | Can I check any plate? | Мога ли да проверя всеки номер? |
| a4 | Solo la tua. Effettuando il controllo, confermi che il veicolo è tuo. | Only your own. By checking, you confirm the vehicle is yours. | Само твоя. С проверката потвърждаваш, че автомобилът е твой. |
| q5 | Quanto costa la RC Auto nella mia regione? | How much is RC Auto in my region? | Колко струва Гражданска отговорност в моя регион? |
| a5 | Medie annue indicative per regione — dati illustrativi, non un preventivo. | Rough yearly averages by region — illustrative figures, not a quote. | Ориентировъчни средни годишни стойности по регион — илюстративни данни, не оферта. |

The q5 answer is followed by the embedded `RegionalPriceTable` (the 20-region table).

## Dependencies
- `useI18n()` — for `t.faq.*`
- `Container` shared component
- `ChevronDownIcon` from `../shared/icons`
- `RegionalPriceTable` from `./RegionalPriceTable` (embedded in the q5 answer) — see `docs/09b-regional-price-table.md`
- `ReactNode` type — answers are a string plus an optional node
