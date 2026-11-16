const defaultSiteUrl = "https://garam.sh";

/** Returns the origin of `NEXT_PUBLIC_SITE_URL`, or the default when unset. */
export function parseSiteUrl(value: string | undefined): string {
  if (value === undefined || value === "") return defaultSiteUrl;

  const url = URL.canParse(value) ? new URL(value) : null;
  if (url === null || !["http:", "https:"].includes(url.protocol)) {
    throw new Error(`NEXT_PUBLIC_SITE_URL is not an http(s) URL: ${value}`);
  }
  return url.origin;
}

// The literal `process.env.NEXT_PUBLIC_*` read is what Next.js inlines.
export const env = {
  siteUrl: parseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
};
