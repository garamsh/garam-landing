# Landing page

What the landing page contains and how it is built. The code is `src/features/landing/` and the route `src/app/[locale]/`.

## Current decisions

- One page per locale, rendered as static HTML from Server Components. It ships no client JavaScript of its own.
- Sections in order: a sticky header with the GARAM mark, anchor links to the sections and the language switcher; the hero, which states what the company does; the mission (`#mission`, three beliefs); how the company works with AI agents (`#approach`, three steps); the company (`#company`, the meaning of the name and the business details); and a footer.
- The page reads as a corporate page. It has no follow, star or watch call to action and no section built around GitHub. The only GitHub link is a small link in the footer.
- The footer shows the trade name, representative and business registration number, shared with the company section through `company-details.ts`. It shows no address, phone number or email anywhere on the page.
- The page makes no claim about shipped products. It describes a position and a way of working.
- The route layout owns `<html lang>` and loads the font, so the language attribute always matches the path. `src/app/` holds routes only; the page body comes from the landing feature.
- Styling is Tailwind CSS v4 utilities over the Garam brand tokens declared in `src/styles/globals.css`: indigo accent, neutral surfaces, the display, title, lead and eyebrow type scale, the section spacing, the 75rem content container and the radii, in a light and a dark scheme under `prefers-color-scheme`. Markup uses the tokens, not raw colours. The hero backdrop is the brand's ruled-plane utility; the mark is the only illustration.
- Type is Pretendard Variable for both locales, self-hosted from the `pretendard` package's dynamic-subset stylesheet (Hangul and Latin, `font-display: swap`), imported by the route layout. It is not loaded through `next/font` because that cannot express the package's unicode-range subsets.
- The GARAM mark is the single path in `src/lib/brand-mark.ts`, drawn by `brand-mark.tsx` as a decorative inline SVG next to the visible wordmark. The favicon, the apple icon and the logo for structured data use the same mark.
- Accessibility baseline: a skip link, visible 3px focus rings, controls at least 44 pixels high, and a no-motion page (smooth scrolling is off under reduced motion). Colour contrast is measured by axe in both schemes.
- Korean text breaks between words, not syllables, through `word-break: keep-all` under `:lang(ko)`, and the eyebrow's wide tracking is reduced for Korean.
- A Playwright spec in `e2e/` runs against the built app and covers the root redirect, both locale pages, the corporate sections, the keyboard order, layout shift, axe violations in both locales and schemes, 404 for unknown paths, the sitemap and robots.txt.
- The feature imports `src/features/i18n` through its index and `src/lib/company.ts`. It does not import the seo feature.

## Rationale

- A static page with no client code is the cheapest thing that meets the brief, and it keeps the page crawlable and fast.
- Copy lives in the i18n dictionaries so the page has no locale branches in markup.
