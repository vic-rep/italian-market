import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
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

// ─── Promise card illustrations ────────────────────────────────────────────────

function IllustrationCompare({ hovered }: { hovered: boolean }) {
  const reduce = useReducedMotion()
  return (
    <div className="flex h-full w-full items-center justify-center px-8">
      <div className="w-full max-w-[240px] rounded-2xl bg-surface p-4 shadow-lg ring-1 ring-border">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-secondary">
          RC Auto · AB 123 CD
        </p>
        {[
          { name: 'Generali', price: '€650 /yr', best: false },
          { name: 'AXA',      price: '€490 /yr', best: true  },
        ].map((row, i) => (
          <div
            key={row.name}
            className="flex items-center justify-between rounded-lg px-2.5 py-2 text-sm"
            style={{
              backgroundColor: hovered && row.best ? 'rgba(155,93,229,0.09)' : 'transparent',
              transition: `background-color ${hovered ? 200 : 100}ms ease`,
              transitionDelay: hovered ? `${i * 60}ms` : '0ms',
            }}
          >
            <span
              className="font-medium"
              style={{ color: hovered && !row.best ? 'var(--c-text-3)' : 'var(--c-text)', transition: 'color 200ms ease' }}
            >
              {row.name}
            </span>
            <span
              className="tabular-nums font-semibold"
              style={{ color: hovered && row.best ? '#9b5de5' : 'var(--c-text)', transition: 'color 200ms ease' }}
            >
              {row.price}
            </span>
          </div>
        ))}
        <motion.div
          animate={!reduce ? { opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 } : {}}
          initial={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.22, delay: hovered && !reduce ? 0.18 : 0 }}
          className="mt-2.5 rounded-xl bg-action/20 px-3 py-1.5 text-center text-xs font-bold text-on-action"
        >
          −€160 /year
        </motion.div>
      </div>
    </div>
  )
}

function IllustrationFast({ hovered }: { hovered: boolean }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex items-center">
        {[0, 1, 2].flatMap((i) => [
          <div
            key={`d${i}`}
            className="flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-bold text-accent"
            style={{
              borderColor: hovered ? '#9b5de5' : 'var(--c-border)',
              backgroundColor: hovered ? 'rgba(155,93,229,0.12)' : 'transparent',
              transition: `border-color ${hovered ? 220 : 120}ms ease, background-color ${hovered ? 220 : 120}ms ease`,
              transitionDelay: hovered ? `${i * 100}ms` : `${(2 - i) * 60}ms`,
            }}
          >
            {i + 1}
          </div>,
          ...(i < 2 ? [
            <div
              key={`l${i}`}
              className="h-px w-10"
              style={{
                backgroundColor: hovered ? 'rgba(155,93,229,0.5)' : 'var(--c-border)',
                transition: 'background-color 200ms ease',
                transitionDelay: hovered ? `${i * 100 + 80}ms` : '0ms',
              }}
            />,
          ] : []),
        ])}
      </div>
    </div>
  )
}

function IllustrationTimer({ hovered }: { hovered: boolean }) {
  return (
    <div className="flex h-full w-full items-center justify-center gap-4 px-10">
      <div
        className="flex flex-1 flex-col items-center gap-1 rounded-xl border border-border bg-surface p-3 text-center"
        style={{ opacity: hovered ? 0.3 : 1, transition: 'opacity 250ms ease' }}
      >
        <span className="text-xs font-medium text-secondary">Office</span>
        <span className="text-lg font-bold tabular-nums text-primary">~3 hrs</span>
      </div>
      <span className="shrink-0 text-xs font-medium text-secondary">vs</span>
      <div
        className="flex flex-1 flex-col items-center gap-1 rounded-xl p-3 text-center"
        style={{
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: hovered ? '#9b5de5' : 'var(--c-border)',
          backgroundColor: hovered ? 'rgba(155,93,229,0.07)' : 'var(--c-surface)',
          transition: `border-color ${hovered ? 200 : 150}ms ease, background-color ${hovered ? 200 : 150}ms ease`,
        }}
      >
        <span className="text-xs font-medium text-secondary">Trusti</span>
        <span
          className="text-lg font-bold tabular-nums"
          style={{ color: hovered ? '#9b5de5' : 'var(--c-text)', transition: 'color 200ms ease' }}
        >
          2 min
        </span>
      </div>
    </div>
  )
}

function IllustrationTimeline({ hovered }: { hovered: boolean }) {
  const reduce = useReducedMotion()
  const events = ['Renewal', 'Questions', 'Claims']
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-8">
      <div className="relative flex w-full max-w-[240px] items-center justify-between">
        <div className="absolute left-[1.1rem] right-[1.1rem] top-1/2 h-px -translate-y-1/2 bg-border" />
        <motion.div
          className="absolute left-[1.1rem] right-[1.1rem] top-1/2 h-px -translate-y-1/2 origin-left"
          style={{ backgroundColor: '#9b5de5' }}
          animate={!reduce ? { scaleX: hovered ? 1 : 0 } : {}}
          initial={{ scaleX: 0 }}
          transition={{ duration: hovered ? 0.4 : 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
        {events.map((_, i) => (
          <div
            key={i}
            className="relative z-10 h-5 w-5 rounded-full border-2"
            style={{
              borderColor: hovered ? '#9b5de5' : 'var(--c-border)',
              backgroundColor: hovered ? 'rgba(155,93,229,0.12)' : 'var(--c-surface)',
              transition: 'border-color 250ms ease, background-color 250ms ease',
              transitionDelay: hovered ? `${i * 100}ms` : '0ms',
            }}
          />
        ))}
      </div>
      <div className="flex w-full max-w-[240px] justify-between">
        {events.map((label, i) => (
          <span
            key={label}
            className="text-[10px] font-medium"
            style={{
              color: hovered ? 'var(--c-text)' : 'var(--c-text-3)',
              transition: 'color 200ms ease',
              transitionDelay: hovered ? `${i * 80}ms` : '0ms',
            }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

const PROMISE_ILLUSTRATIONS = [
  IllustrationCompare,
  IllustrationFast,
  IllustrationTimer,
  IllustrationTimeline,
]

function PromiseCard({ index, title, desc }: { index: number; title: string; desc: string }) {
  const [hovered, setHovered] = useState(false)
  const Illustration = PROMISE_ILLUSTRATIONS[index]
  const isWide = index === 0 || index === 3

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={['overflow-hidden rounded-2xl border border-border bg-surface', isWide ? 'sm:col-span-2' : ''].join(' ')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-40 overflow-hidden bg-muted">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "url('/perspective-grid.png')",
            backgroundPosition: 'bottom center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% auto',
            opacity: 0.07,
          }}
        />
        <Illustration hovered={hovered} />
      </div>
      <div className="p-6">
        <h3 className="font-semibold text-primary">{title}</h3>
        <p className="mt-2 text-secondary">{desc}</p>
      </div>
    </motion.div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export function AboutPage() {
  const { t, locale } = useI18n()
  const a = t.about
  const kfnBadge =
    locale === 'en' ? '/KFN-certified-EN.svg'
    : locale === 'bg' ? '/KFN-certified-BG.svg'
    : '/KFN-certified-IT.svg'

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
            <div className="flex items-center justify-center lg:justify-start">
              <img
                src={kfnBadge}
                alt="KFN certified badge"
                className="w-48 lg:w-56"
                draggable={false}
              />
            </div>
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
          <ImgPlaceholder
            aspect="aspect-[16/9]"
            caption="Team photo — candid, natural light."
            className="mt-10 w-full"
          />
        </Container>
      </section>


      {/* 8 · Promises */}
      <section className="py-16" aria-labelledby="about-promises-heading">
        <Container>
          <h2 id="about-promises-heading" className="text-3xl font-semibold sm:text-4xl">
            {a.promises.heading}
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {a.promises.items.map((item, i) => (
              <PromiseCard key={item.title} index={i} title={item.title} desc={item.desc} />
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
