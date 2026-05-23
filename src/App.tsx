import { Route, Routes } from 'react-router-dom'
import { I18nProvider } from './i18n/I18nContext'
import { ThemeProvider } from './theme/ThemeContext'
import { TopBar } from './components/sections/TopBar'
import { Footer } from './components/sections/Footer'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'

function Layout() {
  return (
    <>
      <TopBar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
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
