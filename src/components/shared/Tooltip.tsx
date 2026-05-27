'use client'

import { useId, useState } from 'react'
import { InfoIcon } from './icons'

// Accessible tooltip: the trigger is a real <button>, reachable by keyboard,
// shows on hover AND focus, dismisses on Escape/blur, and is wired to the
// popup via aria-describedby.
export function Tooltip({ text, triggerLabel }: { text: string; triggerLabel: string }) {
  const id = useId()
  const [open, setOpen] = useState(false)

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        aria-label={triggerLabel}
        aria-describedby={open ? id : undefined}
        className="-m-1.5 inline-flex h-8 w-8 items-center justify-center rounded-full text-tertiary transition-colors hover:text-secondary"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setOpen(false)
        }}
      >
        <InfoIcon className="h-4 w-4" />
      </button>
      {open && (
        <span
          role="tooltip"
          id={id}
          className="absolute bottom-full left-1/2 z-30 mb-2 w-60 max-w-[80vw] -translate-x-1/2 rounded-lg border border-border bg-surface p-3 text-sm leading-snug font-normal text-secondary shadow-lg"
        >
          {text}
        </span>
      )}
    </span>
  )
}
