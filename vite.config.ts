import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// `base` controls the public URL prefix written into the built index.html
// (asset src/href). Defaults to "/" — the site is served from the domain root.
// For staging or subdirectory deploys, set VITE_BASE, e.g.:
//   VITE_BASE=/ftp/italian-lead-magnet/ npm run build
// Always include the trailing slash.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')
  return {
    base: env.VITE_BASE ?? '/',
    plugins: [react(), tailwindcss()],
    server: { port: 5174 },
  }
})
