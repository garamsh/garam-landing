import { en } from "./dictionaries/en";
import { ko } from "./dictionaries/ko";
import type { Dictionary } from "./dictionary";

interface LocaleEntry {
  /** Endonym shown in the language switcher. */
  name: string;
  /** Open Graph locale, `language_TERRITORY`. */
  ogLocale: string;
  dictionary: Dictionary;
}

// Adding a locale is one dictionary file plus one entry here. The key is the
// URL segment, the `<html lang>` value and the hreflang code.
const locales = {
  en: { name: "English", ogLocale: "en_US", dictionary: en },
  ko: { name: "한국어", ogLocale: "ko_KR", dictionary: ko },
} satisfies Record<string, LocaleEntry>;

export type Locale = keyof typeof locales;

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return Object.hasOwn(locales, value);
}

const codes = Object.keys(locales);

export const localeCodes: readonly Locale[] = codes.filter(isLocale);

export function getDictionary(locale: Locale): Dictionary {
  return locales[locale].dictionary;
}

export function getLocaleName(locale: Locale): string {
  return locales[locale].name;
}

export function getOgLocale(locale: Locale): string {
  return locales[locale].ogLocale;
}

export function localePath(locale: Locale): string {
  return `/${locale}`;
}
