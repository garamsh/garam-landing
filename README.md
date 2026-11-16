# garam-landing

The multilingual landing page for Garam, built with Next.js (App Router), React, TypeScript and Tailwind CSS.

The site is served in English at `/en` and Korean at `/ko`; `/` redirects by the visitor's `Accept-Language`, falling back to English.

## Requirements

Node.js from `.nvmrc` and pnpm (the version is pinned in `package.json`).

## Commands

- `pnpm dev` starts the development server.
- `pnpm lint`, `pnpm format`, `pnpm typecheck`, `pnpm test` and `pnpm build` each run one check.
- `pnpm check` runs all of them in order; CI runs this.

The build downloads fonts from Google Fonts, so it needs network access.

## Configuration

Copy `.env.example` to `.env.local` to set `NEXT_PUBLIC_SITE_URL`, the public origin used for canonical URLs, the sitemap and structured data. It defaults to `https://garam.sh`.

## Layout

- `src/app/` holds routes only.
- `src/features/i18n/` holds locales, dictionaries and language negotiation.
- `src/features/seo/` holds metadata, sitemap, robots, structured data and the share image.
- `src/features/landing/` holds the page sections.
- `docs/architecture/` describes how each part is shaped; `docs/convention/` holds the rules contributions follow.
