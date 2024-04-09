export function addAPIPrefix(url: string | null) {
  return url ? `/api${url}` : null
}
