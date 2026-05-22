import { useI18n } from '../../i18n/I18nContext'
import { Container } from '../shared/Container'
import { requestFormFocus } from '../shared/formFocus'

export function RepeatCta() {
  const { t } = useI18n()

  return (
    <section id="repeat" className="py-14 lg:py-16">
      <Container>
        <div className="dark-grid-bg overflow-hidden rounded-3xl bg-footer px-6 py-12 text-center text-footer-text sm:py-16">
          <h2 className="relative z-10 mx-auto max-w-xl text-2xl text-balance sm:text-3xl">
            {t.repeatCta.headline}
          </h2>
          <button
            type="button"
            onClick={requestFormFocus}
            className="relative z-10 mt-7 inline-flex rounded-xl bg-action px-7 py-3.5 text-base font-semibold text-on-action transition-[filter] hover:brightness-95"
          >
            {t.repeatCta.cta}
          </button>
        </div>
      </Container>
    </section>
  )
}
