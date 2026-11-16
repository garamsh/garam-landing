import { env } from "@/env";
import {
  defaultLocale,
  localeCodes,
  localePath,
  type Locale,
} from "@/features/i18n";

type HreflangCode = Locale | "x-default";

export function absoluteUrl(path: string): string {
  return new URL(path, env.siteUrl).toString();
}

export function localeUrl(locale: Locale): string {
  return absoluteUrl(localePath(locale));
}

/** Every locale's URL plus `x-default`, the same set on each locale's page. */
export function languageAlternates(): Partial<Record<HreflangCode, string>> {
  const alternates: Partial<Record<HreflangCode, string>> = {};
  for (const locale of localeCodes) {
    alternates[locale] = localeUrl(locale);
  }
  alternates["x-default"] = localeUrl(defaultLocale);
  return alternates;
}
