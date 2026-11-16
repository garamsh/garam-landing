# Search and sharing metadata

How the site presents itself to crawlers and link previews: metadata, alternates, sitemap, robots, structured data and the share image. The code is `src/features/seo/` and the route files `src/app/sitemap.ts`, `src/app/robots.ts` and `src/app/[locale]/opengraph-image.tsx`.

## Current decisions

- The site origin comes from `NEXT_PUBLIC_SITE_URL`, parsed in `src/env.ts`, default `https://garam.sh`. An invalid value fails at startup. Every absolute URL below is built from it.
- Each locale page sets a title and description from its own dictionary, a self-referencing absolute canonical, and hreflang alternates for every locale plus `x-default` pointing at `/en`. The alternate set is identical on every locale page, so each page lists itself and every reciprocal.
- The sitemap lists each locale URL with the same alternate set as `xhtml:link` entries. It carries no `lastmod`, `priority` or `changefreq`.
- `robots.txt` allows all crawlers and names the absolute sitemap URL.
- Open Graph and Twitter metadata use the locale's title and description, `og:locale` with the other locales as alternates, and the `summary_large_image` card.
- The share image is one language-neutral card, the wordmark and the strand mark, with no copy, so it serves every locale. It is rendered by the same function for `opengraph-image` and `twitter-image`; each route file declares its own size and content type, as Next.js requires.
- Structured data is one Organization object: name, alternate name, url, logo and the GitHub organization as `sameAs`. It carries no address or telephone. It is serialized with `<` escaped and rendered as a native script element.
- The feature imports `src/features/i18n` through its index and shares `src/lib/company.ts`. It does not import the landing feature.

## Rationale

- The choices follow Google Search Central: localized versions (reciprocal hreflang, `x-default`, sitemap alternates that include the URL itself), consolidating duplicate URLs (absolute self-canonical, consistent with the sitemap), title links, snippets, the Organization structured-data guide, robots.txt and the sitemap build guide (`lastmod` only when accurate, so it is omitted).
- The share image has no text because the Next.js image renderer accepts only ttf, otf and woff fonts within a 500 KB bundle, which rules out a CJK font; a text-free card avoids showing Hangul as missing glyphs.

## Open questions

- A `lastmod` needs a source that tracks real content changes; none exists yet.
- A per-locale share image with copy needs a CJK font that fits the renderer's limit.
