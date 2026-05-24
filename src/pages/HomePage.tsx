import { Hero } from '../components/sections/Hero'
import { LifestyleBand } from '../components/sections/LifestyleBand'
import { GoogleReviews } from '../components/sections/GoogleReviews'
import { HowItWorks } from '../components/sections/HowItWorks'
import { RegionalPricing } from '../components/sections/RegionalPricing'
import { WhatIsRca } from '../components/sections/WhatIsRca'
import { Faq } from '../components/sections/Faq'
import { LicenceBadge } from '../components/sections/LicenceBadge'

export function HomePage() {
  return (
    <>
      <Hero />
      <LifestyleBand />
      <GoogleReviews />
      <HowItWorks />
      <RegionalPricing />
      <WhatIsRca />
      <LicenceBadge />
      <Faq />
    </>
  )
}
