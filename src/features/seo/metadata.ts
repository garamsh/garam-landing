import type { Metadata } from "next";
import { env } from "@/env";
import {
  getDictionary,
  getOgLocale,
  localeCodes,
  type Locale,
} from "@/features/i18n";
import { company } from "@/lib/company";
import { languageAlternates, localeUrl } from "./urls";

export function buildLocaleMetadata(locale: Locale): Metadata {
  const { title, description } = getDictionary(locale).meta;
  const url = localeUrl(locale);
  const otherLocales = localeCodes.filter((code) => code !== locale);

  return {
    metadataBase: new URL(env.siteUrl),
    title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(),
    },
    openGraph: {
      type: "website",
      url,
      siteName: company.name,
      title,
      description,
      locale: getOgLocale(locale),
      alternateLocale: otherLocales.map(getOgLocale),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
