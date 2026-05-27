import type { Metadata, Viewport } from 'next'
import { Montserrat, Nunito } from 'next/font/google'
import { I18nProvider } from '../src/i18n/I18nContext'
import { ThemeProvider } from '../src/theme/ThemeContext'
import { TopBar } from '../src/components/sections/TopBar'
import { Footer } from '../src/components/sections/Footer'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-nunito',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Trusti — Verifica la tua RC Auto in 10 secondi',
  description:
    'Inserisci la targa e scopri subito stato, scadenza e classe di merito della tua RC Auto. Gratis, senza registrazione. Trusti, broker assicurativo autorizzato.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F9FAF5' },
    { media: '(prefers-color-scheme: dark)', color: '#0A1517' },
  ],
}

// Runs before paint to avoid a flash of the wrong theme/locale.
const PRE_PAINT_SCRIPT = `(function () {
  try {
    var t = localStorage.getItem('trusti-theme');
    if (t !== 'light' && t !== 'dark') {
      t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', t);
    var l = localStorage.getItem('trusti-locale');
    if (l !== 'en' && l !== 'it' && l !== 'bg') l = 'it';
    document.documentElement.lang = l;
  } catch (e) {}
})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${montserrat.variable} ${nunito.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: PRE_PAINT_SCRIPT }} />
      </head>
      <body>
        <ThemeProvider>
          <I18nProvider>
            <TopBar />
            <main>{children}</main>
            <Footer />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
