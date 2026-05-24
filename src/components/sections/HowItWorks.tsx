import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { useI18n } from '../../i18n/I18nContext'
import { Container } from '../shared/Container'

// ─────────────────────────────────────────────────────────────────────────────
// Icons
// ─────────────────────────────────────────────────────────────────────────────

function PhoneLineIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M1.5 2.5A1 1 0 0 1 2.5 1.5h1.8l.9 2.2-1.3 1a6.5 6.5 0 0 0 4.4 4.4l1-1.3 2.2.9v1.8a1 1 0 0 1-1 1A10.5 10.5 0 0 1 1.5 2.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CheckSmIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
      <path
        d="M1.5 4.5l2 2L7.5 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PhoneCallIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14.5 4a5.5 5.5 0 0 1 5.5 5.5M14.5 8a1.5 1.5 0 0 1 1.5 1.5M3 5a2 2 0 0 1 2-2h2.28l1.31 3.28-1.88 1.41a10.5 10.5 0 0 0 6.6 6.6l1.41-1.88L18 13.72V16a2 2 0 0 1-2 2C9.16 18 3 11.84 3 5Z"
        stroke="#9b5de5"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Step 1 — Phone field focus animation
// ─────────────────────────────────────────────────────────────────────────────

function IllustrationPlate({ hovered }: { hovered: boolean }) {
  const reduce = useReducedMotion()
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-8">
      {/* EU-style Italian licence plate — static */}
      <div
        className="flex overflow-hidden rounded-md shadow-lg"
        style={{ outline: '2.5px solid rgba(0,51,153,0.25)' }}
      >
        <div className="flex flex-col items-center justify-center gap-0.5 bg-[#003399] px-2.5 py-2">
          <span style={{ color: '#FFD700', fontSize: 8, lineHeight: 1 }}>★</span>
          <span className="text-[9px] font-bold leading-none text-white">I</span>
        </div>
        <div className="flex items-center bg-white px-5 py-2.5">
          <span className="font-mono text-[1.3rem] font-bold tracking-[0.18em] text-[#0a1517]">
            AB 123 CD
          </span>
        </div>
      </div>

      {/* Phone field — transitions to focused state on card hover */}
      <div
        className="flex w-[190px] items-center gap-2 rounded-xl bg-surface px-3.5 py-2.5 text-sm"
        style={{
          border: `1.5px solid ${hovered ? '#9b5de5' : 'var(--c-border)'}`,
          boxShadow: hovered
            ? '0 0 0 3px rgba(155, 93, 229, 0.15), 0 1px 2px rgba(0,0,0,0.05)'
            : '0 0 0 0px rgba(155, 93, 229, 0)',
          transition: `border-color ${hovered ? 200 : 100}ms ease, box-shadow ${hovered ? 200 : 100}ms ease`,
        }}
      >
        <PhoneLineIcon />
        <div className="flex items-center text-secondary">
          <span>+39&nbsp;</span>
          {/* Blinking cursor appears when field is "focused" */}
          {hovered && (
            <motion.span
              className="inline-block h-[1em] w-[2px] bg-accent align-middle"
              animate={reduce ? { opacity: 1 } : { opacity: [1, 0] }}
              transition={reduce ? { duration: 0 } : { duration: 0.5, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
            />
          )}
          {/* Placeholder dots fade out on focus; kept in layout so field width stays stable */}
          <motion.span
            animate={{ opacity: hovered ? 0 : 1 }}
            transition={{ duration: hovered ? 0.12 : 0.28 }}
          >
            &nbsp;· · · · · · ·
          </motion.span>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Step 2 — Policy result: badge pulse + sequential row highlight
// ─────────────────────────────────────────────────────────────────────────────

function IllustrationPolicy({ hovered }: { hovered: boolean }) {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const rows: [string, string][] = [
    [t.result.rowInsurer, 'Generali'],
    [t.how.illExpiry,     t.how.illExpDate],
    [t.how.illBmClass,    t.how.illBmValue],
  ]

  return (
    <div className="flex h-full w-full items-center justify-center px-6">
      <div className="w-full max-w-[236px] rounded-2xl bg-surface p-4 shadow-lg ring-1 ring-border">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-primary">AB 123 CD</span>
          <motion.span
            className="flex items-center gap-1 rounded-full bg-action/20 px-2 py-0.5 text-[11px] font-bold text-on-action whitespace-nowrap"
            animate={hovered && !reduce ? { scale: 1.1 } : { scale: 1 }}
            transition={{ type: 'spring', stiffness: 380, damping: 22 }}
          >
            <CheckSmIcon />
            {t.result.insured}
          </motion.span>
        </div>

        <div className="my-3 h-px bg-border" />

        {/* Data rows — purple tint sweeps top-to-bottom on hover, reverses bottom-to-top on leave */}
        {rows.map(([label, value], i) => (
          <div
            key={label}
            className="flex justify-between rounded-md px-1 py-[3px] text-xs"
            style={{
              backgroundColor: hovered ? 'rgba(155, 93, 229, 0.08)' : 'transparent',
              transition: `background-color ${hovered ? 200 : 100}ms ease`,
              transitionDelay: hovered ? `${i * 70}ms` : `${(2 - i) * 35}ms`,
            }}
          >
            <span className="text-secondary">{label}</span>
            <span className="font-medium text-primary">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Step 3 — Phone call: ripple rings + wobble, hover-gated
// ─────────────────────────────────────────────────────────────────────────────

function IllustrationCall({ hovered }: { hovered: boolean }) {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <div className="relative flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-full bg-accent/10">
        {/* Two staggered ripple rings — only animate on hover */}
        {[0, 0.55].map((delay, i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            className="absolute inset-0 rounded-full ring-2 ring-accent/40"
            animate={
              hovered && !reduce
                ? { scale: [1, 1.75], opacity: [0.65, 0] }
                : { scale: 1, opacity: 0 }
            }
            transition={
              hovered && !reduce
                ? { duration: 1.1, repeat: Infinity, delay, ease: 'easeOut' }
                : { duration: 0.15 }
            }
          />
        ))}

        {/* Phone icon wobbles like it's ringing */}
        <motion.div
          animate={
            hovered && !reduce
              ? { rotate: [0, -14, 14, -10, 10, -5, 5, 0] }
              : { rotate: 0 }
          }
          transition={
            hovered && !reduce
              ? { duration: 0.65, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.4 }
              : { duration: 0.2 }
          }
        >
          <PhoneCallIcon />
        </motion.div>
      </div>

      {/* Notification badge */}
      <div className="rounded-2xl bg-surface px-5 py-3 text-center shadow-lg ring-1 ring-border">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-secondary">
          {t.how.illCallLabel}
        </p>
        <p className="mt-1 font-heading text-[0.9rem] font-semibold text-primary">
          {t.how.illCallBody}
        </p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Step card — owns hover state, passes it down to illustration
// ─────────────────────────────────────────────────────────────────────────────

const ILLUSTRATIONS = [IllustrationPlate, IllustrationPolicy, IllustrationCall]

interface StepCardProps { index: number; title: string; desc: string }

function StepCard({ index, title, desc }: StepCardProps) {
  const [hovered, setHovered] = useState(false)
  const reduce = useReducedMotion()
  const Illustration = ILLUSTRATIONS[index]

  return (
    <motion.li
      className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface"
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: index * 0.11 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Illustration slot */}
      <div className="relative h-[13.5rem] overflow-hidden bg-muted">
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

      {/* Text */}
      <div className="flex flex-1 flex-col p-6 pt-5">
        <span
          className="font-heading text-[3.5rem] font-bold leading-none text-accent/40 lg:text-[4.5rem]"
          aria-hidden="true"
        >
          {index + 1}
        </span>
        <span className="mt-3 font-heading text-lg font-semibold text-primary">{title}</span>
        <p className="mt-2 text-sm leading-relaxed text-secondary sm:text-[0.9375rem]">{desc}</p>
      </div>
    </motion.li>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────────────────────

export function HowItWorks() {
  const { t } = useI18n()

  return (
    <section id="how" className="py-16 lg:py-24">
      <Container>
        <h2 className="scroll-reveal mb-10 text-3xl font-bold sm:text-4xl lg:mb-14 lg:text-[2.75rem]">
          {t.how.heading}
        </h2>
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-label={t.how.heading}>
          {t.how.steps.map((step, i) => (
            <StepCard key={i} index={i} title={step.title} desc={step.desc} />
          ))}
        </ol>
      </Container>
    </section>
  )
}
