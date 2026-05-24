import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

// ── Geometry (computed once at module level) ─────────────────────────────────
const W = 1440
const H = 600
const VP = { x: W / 2, y: -100 }
const BOTTOM_Y = H + 10
const LEFT_X = -80
const RIGHT_X = W + 80

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function tAtY(y: number) {
  return (y - VP.y) / (BOTTOM_Y - VP.y)
}

const N_RADIAL = 22
const radials = Array.from({ length: N_RADIAL + 1 }, (_, i) => ({
  x1: VP.x,
  y1: VP.y,
  x2: lerp(LEFT_X, RIGHT_X, i / N_RADIAL),
  y2: BOTTOM_Y,
}))

// Perspective-correct y positions: denser near vanishing point, sparser at base
const CROSS_YS = [520, 450, 372, 288, 200, 122, 56, 14]
const crossLines = CROSS_YS.map(y => {
  const t = tAtY(y)
  return { x1: lerp(VP.x, LEFT_X, t), y1: y, x2: lerp(VP.x, RIGHT_X, t), y2: y }
})

function len(x1: number, y1: number, x2: number, y2: number) {
  return Math.hypot(x2 - x1, y2 - y1)
}

// ── Component ────────────────────────────────────────────────────────────────

interface Props {
  enableParallax?: boolean
  opacity?: number
}

export function PerspectiveGrid({ enableParallax = false, opacity = 0.2 }: Props) {
  const svgRef = useRef<SVGSVGElement>(null)
  const reduce = useReducedMotion()
  const [drawn, setDrawn] = useState(!!reduce)

  // Double-rAF ensures the initial paint (lines hidden) happens before we
  // change to drawn=true, which triggers the CSS stroke-dashoffset transition.
  useEffect(() => {
    if (drawn) return
    let id1 = 0
    let id2 = 0
    id1 = requestAnimationFrame(() => {
      id2 = requestAnimationFrame(() => setDrawn(true))
    })
    return () => {
      cancelAnimationFrame(id1)
      cancelAnimationFrame(id2)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Mouse parallax — mild 3D tilt of the SVG layer only, not the content above it
  useEffect(() => {
    if (!enableParallax || reduce) return
    const section = svgRef.current?.closest('section')
    if (!section) return

    function onMove(e: MouseEvent) {
      const svg = svgRef.current
      if (!svg) return
      const { left, top, width, height } = section!.getBoundingClientRect()
      const cx = ((e.clientX - left) / width - 0.5) * 2
      const cy = ((e.clientY - top) / height - 0.5) * 2
      svg.style.transition = 'none'
      svg.style.transform = `perspective(1200px) rotateY(${cx * 3}deg) rotateX(${-cy * 2}deg)`
    }

    function onLeave() {
      const svg = svgRef.current
      if (!svg) return
      svg.style.transition = 'transform 0.9s cubic-bezier(0.16,1,0.3,1)'
      svg.style.transform = ''
    }

    section.addEventListener('mousemove', onMove)
    section.addEventListener('mouseleave', onLeave)
    return () => {
      section.removeEventListener('mousemove', onMove)
      section.removeEventListener('mouseleave', onLeave)
    }
  }, [enableParallax, reduce])

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ opacity }}
    >
      <g stroke="white" strokeWidth="0.75" fill="none">
        {radials.map((l, i) => {
          const length = len(l.x1, l.y1, l.x2, l.y2)
          return (
            <line
              key={`r${i}`}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              strokeDasharray={length}
              strokeDashoffset={drawn ? 0 : length}
              style={reduce ? undefined : {
                transition: `stroke-dashoffset ${1.55 + i * 0.01}s cubic-bezier(0.16,1,0.3,1) ${i * 0.022}s`,
              }}
            />
          )
        })}
        {crossLines.map((l, i) => {
          const length = len(l.x1, l.y1, l.x2, l.y2)
          return (
            <line
              key={`c${i}`}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              strokeDasharray={length}
              strokeDashoffset={drawn ? 0 : length}
              style={reduce ? undefined : {
                transition: `stroke-dashoffset 1.8s cubic-bezier(0.16,1,0.3,1) ${0.22 + i * 0.055}s`,
              }}
            />
          )
        })}
      </g>
    </svg>
  )
}
