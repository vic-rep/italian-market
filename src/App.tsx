import { I18nProvider } from './i18n/I18nContext'
import { ThemeProvider } from './theme/ThemeContext'
import { TopBar } from './components/sections/TopBar'
import { Hero } from './components/sections/Hero'
import { LifestyleBand } from './components/sections/LifestyleBand'
import { GoogleReviews } from './components/sections/GoogleReviews'
import { HowItWorks } from './components/sections/HowItWorks'
import { WhatIsRca } from './components/sections/WhatIsRca'
import { RegionalPricing } from './components/sections/RegionalPricing'
import { Faq } from './components/sections/Faq'
import { RepeatCta } from './components/sections/RepeatCta'
import { Footer } from './components/sections/Footer'

export function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <TopBar />
        <main>
          <Hero />
          <LifestyleBand />
          <GoogleReviews />
          <HowItWorks />
          <RegionalPricing />
          <WhatIsRca />
          <Faq />
          <RepeatCta />
        </main>
        <Footer />
      </I18nProvider>
    </ThemeProvider>
  )
}
