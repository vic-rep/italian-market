// Prepend the build-time base URL to a /public-folder asset path.
//
// Vite rewrites absolute URLs (`/foo.png`) in HTML and CSS to honor the
// configured `base`, but it does NOT touch string literals inside JS/JSX.
// On a subpath deploy (e.g. /ftp/italian-lead-magnet/) those hard-coded
// absolute paths 404. Use this helper for every public-folder reference:
//
//   <img src={asset('/logo-positive.svg')} />
//   backgroundImage: `url('${asset('/perspective-grid.png')}')`
//
// In dev or root deploys this is a no-op (BASE_URL === '/').
export function asset(path: string): string {
  const trimmed = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${trimmed}`
}
