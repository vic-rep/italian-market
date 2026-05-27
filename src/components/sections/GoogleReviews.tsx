'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'motion/react'
import { useI18n } from '../../i18n/I18nContext'
import type { Locale } from '../../i18n/messages'
import { Container } from '../shared/Container'
import './googleReviews.css'

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

interface Review { id: string; name: string; text: string }

const REVIEWS: Record<Locale, Review[]> = {
  it: [
    { id: '1', name: 'Marco Ferretti',    text: 'Non avevo mai rinnovato online prima. Avevo paura di sbagliare qualcosa. Invece ci hanno guidato passo passo e il documento è arrivato in pochi minuti. Non ci voleva nemmeno un ufficio.' },
    { id: '2', name: 'Giulia Marchetti',  text: 'Ho avuto un dubbio sulla clausola di guida esclusiva. Ho chiamato, ha risposto subito una persona — non un bot, non una coda. Mi ha spiegato tutto in tre minuti. Ormai è raro trovare questo.' },
    { id: '3', name: 'Roberto Esposito',  text: 'Mi aspettavo di spendere quanto con il mio agente di sempre. Invece ho risparmiato 140€. Stessa copertura, compagnia diversa. Il risparmio c\'è, basta saperlo trovare.' },
    { id: '4', name: 'Chiara Bianchi',    text: 'Finalmente qualcuno che spiega cosa copre davvero la RC Auto e cosa no. Avevo una polizza da anni e non sapevo che i passeggeri erano già inclusi. Informazione utile, spiegata chiaramente.' },
    { id: '5', name: 'Luca Fontana',      text: 'Mi hanno chiamato trenta giorni prima della scadenza. Non me l\'aspettavo. Ho rinnovato al telefono in dieci minuti, a un prezzo migliore dell\'anno scorso. Lo uso da due anni ormai.' },
    { id: '6', name: 'Sara Conti',        text: 'Ho confrontato tre siti. Qui il prezzo era il più basso e non c\'erano costi nascosti al momento del pagamento. Quello che vedevo era quello che pagavo. Semplice.' },
  ],
  en: [
    { id: '1', name: 'Marco Ferretti',    text: 'I\'d never renewed online before. Was worried I\'d mess something up. They walked me through it step by step and the document arrived in minutes. No office could have done better.' },
    { id: '2', name: 'Giulia Marchetti',  text: 'I had a question about the exclusive-driver clause. Called, a real person answered straight away — no bot, no queue. Explained everything in three minutes. Rare to find that these days.' },
    { id: '3', name: 'Roberto Esposito',  text: 'I expected to pay the same as with my usual agent. Saved €140 instead. Same cover, different insurer. The saving is there — you just need to know where to look.' },
    { id: '4', name: 'Chiara Bianchi',    text: 'Finally someone who explains what RC Auto actually covers and what it doesn\'t. Had a policy for years and didn\'t know passengers were already included. Useful, and explained clearly.' },
    { id: '5', name: 'Luca Fontana',      text: 'They called me thirty days before my expiry. Didn\'t see that coming. Renewed over the phone in ten minutes, better price than last year. Been using them for two years now.' },
    { id: '6', name: 'Sara Conti',        text: 'I compared three sites. Here the price was the lowest and there were no hidden charges at checkout. What I saw was what I paid. Simple.' },
  ],
  bg: [
    { id: '1', name: 'Марко Ферети',     text: 'Никога преди не бях подновявал онлайн. Страхувах се да не объркам нещо. Но ме насочиха стъпка по стъпка и документът пристигна за минути. Нито един офис не би го направил по-добре.' },
    { id: '2', name: 'Джулия Маркети',   text: 'Имах въпрос за клаузата за изключителен шофьор. Обадих се, веднага отговори истински човек — не бот, не опашка. Обясни всичко за три минути. Рядко се среща вече.' },
    { id: '3', name: 'Роберто Еспозито', text: 'Очаквах да платя колкото при стария си агент. Вместо това спестих 140€. Същото покритие, различен застраховател. Спестяването съществува — просто трябва да знаеш къде да го търсиш.' },
    { id: '4', name: 'Киара Бианки',     text: 'Най-накрая някой, който обяснява какво покрива наистина Гражданска отговорност и какво не. Имах полица от години и не знаех, че пътниците вече са включени. Полезна информация, обяснена ясно.' },
    { id: '5', name: 'Лука Фонтана',     text: 'Обадиха ми се тридесет дни преди изтичането. Не го очаквах. Подновиха за десет минути по телефона, на по-добра цена от миналата година. Използвам ги от две години вече.' },
    { id: '6', name: 'Сара Конти',       text: 'Сравних три сайта. Тук цената беше най-ниска и нямаше скрити такси при плащане. Това, което виждах, беше това, което плащах. Просто.' },
  ],
}

const N        = 6
const GAP      = 16
const MIN_CARD = 230
const PEEK     = 40
const PADDING_M  = 20
const PADDING_D  = 64
const MOBILE_BP  = 767
const GR_LEFT_W  = 354
const LAYOUT_GAP = 24

type CardVariant = 'surface' | 'surface-adjacent' | 'surface-adjacent-2'
const VARIANTS: CardVariant[] = ['surface', 'surface-adjacent', 'surface-adjacent-2']

// ─────────────────────────────────────────────────────────────────────────────
// Layout hook (unchanged from Design-system)
// ─────────────────────────────────────────────────────────────────────────────

function useCarouselLayout(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [state, setState] = useState({ isMobile: false, forceColumn: false, cardWidth: 0 })

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return
      const cw       = containerRef.current.offsetWidth
      const isColumn = window.innerWidth <= MOBILE_BP
      const grRightInRow  = cw - 2 * PADDING_D - GR_LEFT_W - LAYOUT_GAP
      const isMobile      = (grRightInRow - GAP) / 2 < MIN_CARD
      const forceColumn   = isMobile && !isColumn
      const cardWidth     = isMobile
        ? isColumn
          ? Math.max(cw - PADDING_M - GAP - PEEK, MIN_CARD)
          : Math.max(cw - PADDING_D - GAP - PEEK, MIN_CARD)
        : Math.max((grRightInRow - GAP) / 2, MIN_CARD)
      setState({ isMobile, forceColumn, cardWidth })
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [containerRef])

  return state
}

// ─────────────────────────────────────────────────────────────────────────────
// Icons
// ─────────────────────────────────────────────────────────────────────────────

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1 9.854 5.567l4.9.713-3.545 3.454.837 4.876L8 12.267l-4.046 2.343.837-4.876L1.246 6.28l4.9-.713z" fill="#FBBC04" />
    </svg>
  )
}

function GoogleRatingBadge() {
  return (
    <svg viewBox="0 0 315 84" fill="none" xmlns="http://www.w3.org/2000/svg" className="gr-google-badge" aria-label="Google rating 4.9" role="img">
      <g>
        <path d="M42 21.6C42 19.9 41.8 18.3 41.5 16.8H21V25.9H32.9C32.4 28.6 30.8 30.9 28.4 32.4V38.2H35.5C39.6 34.4 42 28.6 42 21.6Z" fill="#4285F4" />
        <path d="M21 44C26.7 44 31.5 42.1 35.5 38.2L28.4 32.4C26.5 33.7 24 34.5 21 34.5C15.5 34.5 10.8 30.7 9.1 25.5H1.8V31.5C5.8 39.4 12.8 44 21 44Z" fill="#34A853" />
        <path d="M9.1 25.5C8.6 24.1 8.4 22.6 8.4 21C8.4 19.4 8.7 17.9 9.1 16.5V10.5H1.8C0.6 12.9 0 15.4 0 18C0 20.6 0.6 23.1 1.8 25.5L9.1 25.5Z" fill="#FBBC04" />
        <path d="M21 7.5C24.2 7.5 27.1 8.6 29.4 10.8L35.7 4.5C31.5 0.7 26.6 -1.5 21 0.2C12.8 0.2 5.8 4.8 1.8 12.5L9.1 18.5C10.8 13.3 15.5 7.5 21 7.5Z" fill="#EA4335" />
      </g>
      <text x="52" y="18" fontFamily="Montserrat, system-ui, sans-serif" fontWeight="600" fontSize="13" fill="rgba(249,250,245,0.55)" letterSpacing="0.5">Google reviews</text>
      <text x="52" y="52" fontFamily="Montserrat, system-ui, sans-serif" fontWeight="700" fontSize="36" fill="#f9faf5" letterSpacing="-1">4.9</text>
      {[0, 1, 2, 3].map(i => (
        <g key={i} transform={`translate(${52 + 60 + i * 18},30)`}>
          <path d="M8 1 9.854 5.567l4.9.713-3.545 3.454.837 4.876L8 12.267l-4.046 2.343.837-4.876L1.246 6.28l4.9-.713z" fill="#FBBC04" />
        </g>
      ))}
      <g transform={`translate(${52 + 60 + 4 * 18},30)`}>
        <defs>
          <linearGradient id="halfStarIT" x1="0" x2="1" y1="0" y2="0">
            <stop offset="50%" stopColor="#FBBC04" />
            <stop offset="50%" stopColor="rgba(249,250,245,0.2)" />
          </linearGradient>
        </defs>
        <path d="M8 1 9.854 5.567l4.9.713-3.545 3.454.837 4.876L8 12.267l-4.046 2.343.837-4.876L1.246 6.28l4.9-.713z" fill="url(#halfStarIT)" />
      </g>
    </svg>
  )
}

function ArrowLeftIcon()  {
  return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M12.5 15L7.5 10l5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}
function ArrowRightIcon() {
  return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M7.5 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

// ─────────────────────────────────────────────────────────────────────────────
// ReviewCard
// ─────────────────────────────────────────────────────────────────────────────

function ReviewCard({ review, variant }: { review: Review; variant: CardVariant }) {
  return (
    <article className={`gr-card gr-card--${variant}`} aria-label={`Review by ${review.name}`}>
      <div className="gr-card-body">
        <div className="gr-stars" aria-label="5 stars out of 5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="gr-star"><StarIcon /></span>
          ))}
        </div>
        <div className="gr-card-text">{review.text}</div>
      </div>
      <p className="gr-reviewer-name">{review.name}</p>
    </article>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// GoogleReviews
// ─────────────────────────────────────────────────────────────────────────────

export function GoogleReviews() {
  const { t, locale } = useI18n()
  const reviews = REVIEWS[locale]
  const reduce = useReducedMotion()

  const containerRef                          = useRef<HTMLDivElement>(null)
  const viewportRef                           = useRef<HTMLDivElement>(null)
  const { cardWidth, isMobile, forceColumn }  = useCarouselLayout(containerRef)

  const [startIdx,  setStartIdx]  = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)

  const navigate = useCallback((d: 1 | -1) => {
    setDirection(d)
    setStartIdx(prev => (prev + d + N) % N)
  }, [])

  const slots = [0, 1]

  // Direction-aware slide. Defined here so the resolvers close over the current
  // cardWidth; `direction` (1 | -1) is supplied via the `custom` prop.
  const slideVariants: Variants = reduce
    ? {
        enter:  { opacity: 0 },
        center: { opacity: 1 },
        exit:   { opacity: 0 },
      }
    : {
        enter:  (dir: number) => ({ x: dir > 0 ? cardWidth + GAP : -(cardWidth + GAP), scale: 0.3, opacity: 0 }),
        center: { x: 0, opacity: 1, scale: 1 },
        exit:   (dir: number) => ({ x: dir > 0 ? -(cardWidth + GAP) : cardWidth + GAP, scale: 0.3, opacity: 0 }),
      }

  return (
    <section className="gr-section" aria-label={t.social.heading}>
      <Container>
      <div ref={containerRef} className="gr-container">
        <div className={`gr-layout${forceColumn ? ' gr-layout--mobile' : ''}`}>

          {/* ── Left ──────────────────────────────────────────────────────── */}
          <div className="gr-left">
            <div className="gr-heading-group">
              <GoogleRatingBadge />
              <h2 className="font-heading text-2xl font-semibold leading-snug text-balance" style={{ color: '#f9faf5' }}>
                {t.social.heading}
              </h2>
            </div>
            <p className="text-base" style={{ color: 'rgba(249,250,245,0.65)' }}>
              {t.social.rating}
            </p>
          </div>

          {/* ── Right ─────────────────────────────────────────────────────── */}
          <div className={`gr-right${isMobile ? ' gr-right--mobile' : ''}`}>
            <nav className="gr-arrows" aria-label="Review navigation">
              <button className="gr-arrow-btn" onClick={() => navigate(-1)} aria-label="Previous review">
                <ArrowLeftIcon />
              </button>
              <button className="gr-arrow-btn" onClick={() => navigate(1)} aria-label="Next review">
                <ArrowRightIcon />
              </button>
            </nav>

            <motion.div
              ref={viewportRef}
              className="gr-cards-viewport"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.06}
              dragMomentum={false}
              onDragEnd={(_, info) => {
                if      (info.offset.x < -40 || info.velocity.x < -300) navigate(1)
                else if (info.offset.x >  40 || info.velocity.x >  300) navigate(-1)
              }}
            >
              <AnimatePresence custom={direction} initial={false}>
                {slots.map(slot => {
                  const reviewIdx = (startIdx + slot) % N
                  const review    = reviews[reviewIdx]
                  const variant   = VARIANTS[reviewIdx % VARIANTS.length]
                  const leftPos   = slot * (cardWidth + GAP)

                  return (
                    <motion.div
                      key={review.id}
                      layout={!reduce}
                      custom={direction}
                      variants={slideVariants}
                      style={{ position: 'absolute', top: 0, bottom: 0, left: leftPos, width: cardWidth || undefined }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={
                        reduce
                          ? { duration: 0.2 }
                          : {
                              layout:  { type: 'spring', stiffness: 560, damping: 36, mass: 0.4 },
                              x:       { type: 'spring', stiffness: 560, damping: 36, mass: 0.4 },
                              scale:   { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
                              opacity: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
                            }
                      }
                    >
                      <ReviewCard review={review} variant={variant} />
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>
      </Container>
    </section>
  )
}
