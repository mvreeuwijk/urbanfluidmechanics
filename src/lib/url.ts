// Prefix an internal, root-absolute path with the configured base so links work
// under a sub-path deploy (e.g. /urbanfluidmechanics) AND at a domain root (base '/').
// External links (mailto:, http(s)://, #…) are returned unchanged.
const BASE = import.meta.env.BASE_URL; // '/urbanfluidmechanics/' or '/'

export function withBase(path: string): string {
  if (!path.startsWith('/')) return path;
  return (BASE.replace(/\/$/, '') + path) || '/';
}
