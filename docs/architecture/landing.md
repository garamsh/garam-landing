# Landing page

What the landing page contains and how it is built. The code is `src/features/landing/` and the route `src/app/[locale]/`.

## Current decisions

- One page per locale, rendered as static HTML from Server Components. It ships no client JavaScript of its own.
- Sections in order: header with the language switcher, hero, three beliefs, the approach (anchor `#approach`), a note on the name, a call to follow the GitHub organization, and a footer.
- The footer shows the trade name, representative and business registration number. It shows no address or phone number.
- The page makes no claim about shipped products. It describes a position and a way of working, and links to the GitHub organization.
- The route layout owns `<html lang>` and loads the fonts, so the language attribute always matches the path. `src/app/` holds routes only; the page body comes from the landing feature.
- Styling is Tailwind CSS v4 utilities over colour tokens declared in `src/styles/globals.css`: a warm paper and deep teal palette with a coral accent, with a dark scheme under `prefers-color-scheme`. Markup uses the tokens, not raw colours.
- Type is Fraunces for English headings and Noto Sans KR for body text and Korean headings, loaded with `next/font`.
- The hero mark is a decorative inline SVG hidden from assistive technology. Its draw-in animation runs only when the visitor has not asked for reduced motion.
- Accessibility baseline: a skip link, visible focus rings, controls at least 44 pixels high, and text and background colour pairs chosen to target AA contrast in both schemes.
- Korean text breaks between words, not syllables, through `word-break: keep-all` under `:lang(ko)`.
- A Playwright spec in `e2e/` runs against the built app and covers the root redirect, both locale pages, 404 for unknown paths, the sitemap and robots.txt.
- The feature imports `src/features/i18n` through its index and `src/lib/company.ts`. It does not import the seo feature.

## Rationale

- A static page with no client code is the cheapest thing that meets the brief, and it keeps the page crawlable and fast.
- Copy lives in the i18n dictionaries so the page has no locale branches in markup.

## Open questions

- Text and background contrast has not been measured with a tool in either scheme.
