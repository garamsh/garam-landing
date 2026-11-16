import { defaultLocale, isLocale, type Locale } from "./locales";

interface Preference {
  tag: string;
  quality: number;
}

function parsePreference(part: string): Preference {
  const [rawTag = "", ...params] = part.split(";");
  const qParam = params.find((param) => param.trim().startsWith("q="));
  const quality = qParam === undefined ? 1 : Number(qParam.trim().slice(2));
  return {
    tag: rawTag.trim().toLowerCase(),
    quality: Number.isNaN(quality) ? 0 : quality,
  };
}

/**
 * Picks the supported locale a visitor prefers from an `Accept-Language`
 * header value, matching on the primary language subtag (`ko-KR` is `ko`).
 * Falls back to the default locale when nothing matches.
 */
export function negotiateLocale(acceptLanguage: string | null): Locale {
  if (acceptLanguage === null) return defaultLocale;

  const preferences = acceptLanguage.split(",").map(parsePreference);
  const acceptable = preferences.filter(({ quality }) => quality > 0);
  const ranked = acceptable.sort((a, b) => b.quality - a.quality);

  for (const { tag } of ranked) {
    const primary = tag.split("-")[0] ?? "";
    if (isLocale(primary)) return primary;
  }
  return defaultLocale;
}
