# Landing page

What the landing page contains and how it is built. The code is `src/features/landing/` and the route `src/app/[locale]/`.

## Current decisions

- One page per locale, rendered as static HTML from Server Components. It ships no client JavaScript of its own.
- Sections in order, alternating light and dark so the page has rhythm: a sticky header with the GARAM mark, anchor links to the two sections and the language switcher; the hero, which states what the company does in 80px display type beside the large GARAM mark over an indigo glow and two offset outlines of its plate (below the text on mobile); the mission (`#mission`, a full-bleed band in the brand's dark ink in both schemes, three beliefs as large statements with their text beside them); how the company works with AI agents (`#approach`, three numbered layered cards whose progress bar grows with the step); a closing statement with the mark and no link; and a footer. The page has no section about the name of the company.
- The page reads as a corporate page. It has no follow, star or watch call to action and no section built around GitHub. The only GitHub link is a small link in the footer.
- The business details appear once, in the footer: trade name, representative and business registration number, with the copyright line and the GitHub link. The page shows no address, phone number or email anywhere.
- The page makes no claim about shipped products. It describes a position and a way of working.
- The route layout owns `<html lang>` and loads the font, so the language attribute always matches the path. `src/app/` holds routes only; the page body comes from the landing feature.
- Styling is Tailwind CSS v4 utilities over the Garam brand tokens declared in `src/styles/globals.css`: indigo accent, neutral surfaces, the display, title, statement, lead and eyebrow type scale, the section spacing, the 75rem content container and the radii, in a light and a dark scheme under `prefers-color-scheme`. Markup uses the tokens, not raw colours. The `ink` utility redeclares the dark tokens for the mission band (a step deeper than the page when the page is dark), the `surface` utility draws the cards, and the hero backdrop is the brand's ruled-plane utility; the mark is the only illustration.
- Motion is CSS only: the hero text rises and the mark's plate outlines settle once on load, through the `animate-rise` and `animate-plate` theme animations behind `motion-safe:`, so nothing moves under reduced motion. Hover feedback exists on links only.
- Type is Pretendard Variable for both locales, self-hosted from the `pretendard` package's dynamic-subset stylesheet (Hangul and Latin, `font-display: swap`), imported by the route layout. It is not loaded through `next/font` because that cannot express the package's unicode-range subsets. Geist Mono, from the pinned `geist` package through `geist/font/mono` in the route layout, sets the step numbers only: it has no Hangul, so no Korean text uses it.
- The GARAM mark is the single path in `src/lib/brand-mark.ts`, drawn by `brand-mark.tsx` as a decorative inline SVG next to the visible wordmark. The favicon, the apple icon and the logo for structured data use the same mark.
- Accessibility baseline: a skip link, visible 3px focus rings, controls at least 44 pixels high, and a no-motion page (smooth scrolling is off under reduced motion). Colour contrast is measured by axe in both schemes.
- Korean text breaks between words, not syllables, through `word-break: keep-all` under `:lang(ko)`, and the eyebrow's wide tracking is reduced and its size raised to 13px for Korean.
- A Playwright spec in `e2e/` runs against the built app and covers the root redirect, both locale pages, the corporate sections, the keyboard order, layout shift, axe violations in both locales and schemes, 404 for unknown paths, the sitemap and robots.txt.
- The feature imports `src/features/i18n` through its index and `src/lib/company.ts`. It does not import the seo feature.

## Rationale

- A static page with no client code is the cheapest thing that meets the brief, and it keeps the page crawlable and fast.
- Copy lives in the i18n dictionaries so the page has no locale branches in markup.
