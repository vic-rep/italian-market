// Decoupled signal so the top bar / repeat-CTA can re-open and focus the hero
// form without prop-drilling through every section. The Hero listens for it.
export const FOCUS_FORM_EVENT = 'trusti:focus-form'

export function requestFormFocus(): void {
  window.dispatchEvent(new CustomEvent(FOCUS_FORM_EVENT))
}
