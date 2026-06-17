import { useTheme } from '../../theme/ThemeContext'
import { asset } from '../../utils/asset'

export function Logo({ onActivate, onDark }: { onActivate?: () => void; onDark?: boolean }) {
  const { theme } = useTheme()
  const src = (onDark ?? theme === 'dark') ? asset('/logo-negative.svg') : asset('/logo-positive.svg')

  return (
    <button
      type="button"
      onClick={onActivate}
      aria-label="Trusti"
      className="rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-action"
    >
      <img src={src} alt="Trusti" width={107} height={24} className="block" />
    </button>
  )
}
