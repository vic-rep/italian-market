import { Navigate, Route, Routes } from 'react-router-dom'
import { I18nProvider } from './i18n/I18nContext'
import { ThemeProvider } from './theme/ThemeContext'
import { TopBar } from './components/sections/TopBar'
import { Footer } from './components/sections/Footer'
import { HomePage } from './pages/HomePage'
import { ContactPage } from './pages/ContactPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { TermsPage } from './pages/TermsPage'
import { CookiesPage } from './pages/CookiesPage'

function Layout() {
  return (
    <>
      <TopBar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
          {/* Unknown paths (incl. the removed /about) fall back to home. */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <Layout />
      </I18nProvider>
    </ThemeProvider>
  )
}
