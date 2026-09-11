export const DIVISION_TO_SLUG = {
  project: 'project',
  ground: 'road',
  freight: 'ocean',
  teknoloji: 'technology',
}

export const SLUG_TO_DIVISION = Object.fromEntries(
  Object.entries(DIVISION_TO_SLUG).map(([id, slug]) => [slug, id]),
)

export const LEGAL_SLUGS = {
  notice: 'legal-notice',
  privacy: 'data-privacy',
  conduct: 'code-of-conduct',
}

export const SLUG_TO_LEGAL = Object.fromEntries(
  Object.entries(LEGAL_SLUGS).map(([id, slug]) => [slug, id]),
)

export function getRouteFromHash() {
  const hash = window.location.hash.replace(/^#/, '')
  if (hash === 'about') return { view: 'about' }
  if (hash === 'industries') return { view: 'industries' }
  if (hash.startsWith('industries-')) return { view: 'industries', sector: hash.slice('industries-'.length) }
  if (hash === 'memberships') return { view: 'memberships' }
  if (hash === 'trade') return { view: 'trade' }
  if (SLUG_TO_LEGAL[hash]) return { view: 'legal', id: SLUG_TO_LEGAL[hash] }
  if (SLUG_TO_DIVISION[hash]) return { view: 'division', id: SLUG_TO_DIVISION[hash] }
  return { view: 'home' }
}

export function pushRoute(slug) {
  const url = slug ? `#${slug}` : window.location.pathname + window.location.search
  window.history.pushState(null, '', url)
}
