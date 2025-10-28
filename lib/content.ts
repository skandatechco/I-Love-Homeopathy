// Helper for "friendly URLs"
export function getRemedyHref(lang: string, slug: string) {
  return `/${lang}/remedies/${slug}`;
}

export function getGuideHref(lang: string, slug: string) {
  return `/${lang}/guides/${slug}`;
}
