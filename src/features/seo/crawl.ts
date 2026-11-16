import type { MetadataRoute } from "next";
import { localeCodes } from "@/features/i18n";
import { absoluteUrl, languageAlternates, localeUrl } from "./urls";

export function buildSitemap(): MetadataRoute.Sitemap {
  const languages = languageAlternates();
  return localeCodes.map((locale) => ({
    url: localeUrl(locale),
    alternates: { languages },
  }));
}

export function buildRobots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
