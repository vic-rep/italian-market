import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext'
import { Container } from '../components/shared/Container'
import { ChevronDownIcon } from '../components/shared/icons'

// ─── Placeholder image ────────────────────────────────────────────────────────
function ImgPlaceholder({
  aspect,
  caption,
  className = '',
}: {
  aspect: string
  caption: string
  className?: string
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-2xl bg-muted text-center ${aspect} ${className}`}
      role="img"
      aria-label={caption}
    >
      <p className="px-6 text-sm text-tertiary">{caption}</p>
    </div>
  )
}


// ─── FAQ accordion item ────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left text-base font-semibold text-primary"
      >
        {q}
        <ChevronDownIcon
          className={`h-5 w-5 shrink-0 text-secondary transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="pb-4 text-secondary">
          <p>{a}</p>
        </div>
      )}
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export function AboutPage() {
  const { t } = useI18n()
  const a = t.about

  return (
    <>
      {/* 1 · Hero */}
      <section className="dark-grid-bg bg-footer pt-24 pb-20 lg:py-32" aria-labelledby="about-hero-heading">
        <Container className="max-w-3xl text-center">
          <h1
            id="about-hero-heading"
            className="text-4xl font-semibold leading-tight text-footer-text sm:text-5xl lg:text-6xl"
          >
            {a.hero.headline}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-footer-text/75">{a.hero.subhead}</p>
        </Container>
      </section>

      {/* 2 · Origin */}
      <section className="py-16 bg-muted" aria-labelledby="about-origin-heading">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <ImgPlaceholder
              aspect="aspect-[4/3]"
              caption="Founders, candid — the ex-Uber story made human."
              className="order-last lg:order-first"
            />
            <div>
              <h2 id="about-origin-heading" className="text-3xl font-semibold sm:text-4xl">
                {a.origin.heading}
              </h2>
              <p className="mt-5 leading-relaxed text-secondary">{a.origin.body}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* 3 · Stats band */}
      <section className="border-y border-border bg-stats-band py-14" aria-label="Key statistics">
        <Container>
          <dl className="flex flex-col items-center gap-10 sm:flex-row sm:justify-center sm:gap-20">
            {a.stats.map((s) => (
              <div key={s.label} className="text-center">
                <dt className="text-5xl font-semibold text-action">{s.value}</dt>
                <dd className="mt-2 text-sm font-medium text-footer-text/80">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* 4 · Licence + regulation (combined) */}
      <section className="py-16 bg-muted" aria-labelledby="about-licence-heading">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <ImgPlaceholder
              aspect="aspect-square"
              caption="FSC certificate / licence visual — real asset to be provided."
              className="max-w-xs mx-auto lg:mx-0"
            />
            <div>
              <h2 id="about-licence-heading" className="text-3xl font-semibold sm:text-4xl">
                {a.licence.heading}
              </h2>
              <p className="mt-5 leading-relaxed text-secondary">{a.licence.body}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* 6 · Team */}
      <section className="py-16" aria-labelledby="about-team-heading">
        <Container>
          <h2 id="about-team-heading" className="text-3xl font-semibold sm:text-4xl">
            {a.team.heading}
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-secondary">{a.team.body}</p>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div
                  className="aspect-square w-full rounded-2xl bg-muted"
                  role="img"
                  aria-label={`Team member ${i + 1} portrait — real person, natural light`}
                />
                <span className="text-xs text-tertiary">Team member {i + 1}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 7 · Europe / ambition */}
      <section className="py-16 bg-muted" aria-labelledby="about-europe-heading">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-4 h-1 w-10 rounded-full bg-accent" aria-hidden="true" />
              <h2 id="about-europe-heading" className="text-3xl font-semibold sm:text-4xl">
                {a.europe.heading}
              </h2>
              <p className="mt-5 leading-relaxed text-secondary">{a.europe.body}</p>
            </div>
            <ImgPlaceholder
              aspect="aspect-[4/3]"
              caption="Topographic map of Europe — brand visual language; Bulgaria + Italy active."
            />
          </div>
        </Container>
      </section>

      {/* 8 · Promises */}
      <section className="py-16" aria-labelledby="about-promises-heading">
        <Container>
          <h2 id="about-promises-heading" className="text-3xl font-semibold sm:text-4xl">
            {a.promises.heading}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {a.promises.items.map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 9 · FAQ */}
      <section className="py-16 bg-muted" aria-labelledby="about-faq-heading">
        <Container className="max-w-3xl">
          <h2 id="about-faq-heading" className="text-3xl font-semibold sm:text-4xl">
            FAQ
          </h2>
          <div className="mt-6">
            {a.faq.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </Container>
      </section>

      {/* 10 · Closing CTA */}
      <section className="py-16" aria-labelledby="about-cta-heading">
        <Container className="max-w-2xl text-center">
          <h2 id="about-cta-heading" className="text-3xl font-semibold sm:text-4xl">
            {a.cta.headline}
          </h2>
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl bg-action px-8 py-4 text-base font-semibold text-on-action transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-action"
            >
              {a.cta.button} →
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
