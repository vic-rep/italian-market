import { ImageIcon } from './icons'

// Clearly-marked placeholder sized to the final image's aspect ratio, so real
// photography (per the brand book) can be dropped in without layout changes.
// `caption` encodes the brand-book photography brief.
export function ImagePlaceholder({
  caption,
  aspect = '4 / 3',
  tone = 'default',
  className = '',
}: {
  caption: string
  aspect?: string
  tone?: 'default' | 'onAccent'
  className?: string
}) {
  const tones = {
    default: 'border-border bg-muted text-tertiary',
    onAccent: 'border-white/45 bg-white/10 text-white/85',
  }

  return (
    <div
      role="img"
      aria-label={caption}
      style={{ aspectRatio: aspect }}
      className={`flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-6 text-center ${tones[tone]} ${className}`}
    >
      <ImageIcon className="h-9 w-9 opacity-80" />
      <span className="max-w-xs text-sm leading-snug">{caption}</span>
    </div>
  )
}
