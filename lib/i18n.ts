export const SUPPORTED_LANGS = ["en", "hi", "ta"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

export function isSupportedLang(maybe: string): maybe is Lang {
  return SUPPORTED_LANGS.includes(maybe as Lang);
}

export const DEFAULT_LANG: Lang = "en";
