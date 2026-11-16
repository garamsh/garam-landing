# ADR 0001: Partition the system by domain, one feature per domain

> Status: accepted
> Date: 2026-11-17

Append-only: once merged, the body below is not rewritten. A fact later found wrong is corrected in an appended note, not edited out; a revised decision is a new ADR that supersedes this one.

## Context

The repository is a Next.js App Router and Tailwind CSS landing page (the kept stack files are `docs/convention/stack-nextjs.md` and `docs/convention/stack-tailwind.md`). Bootstrap requires one structure, chosen from three candidates: domain, layered, hexagonal.

- The subject areas are already named by the work asked for: locales and dictionaries, site metadata and structured data, page sections.
- Most changes belong to one of those areas.
- `docs/convention/stack-nextjs.md` §1 already spells the unit as a vertical slice, `src/features/<name>/`.
- The system is one deployable with no backend, so the layered and hexagonal candidates have no persistence or external-adapter boundary to divide along.
- Whether a domain may depend on a sibling is contested; the choice has to be recorded.

## Decision

The system is partitioned by domain, and the unit is a feature under `src/features/<name>/`. The sibling relation taken: a feature may reference a sibling only through that sibling's public entry point (`index.ts`), and references between features form no cycle. The structural rules are in `docs/architecture/structure.md`.

## Consequences

- One change lands inside one feature folder; each feature has one subject matter and one vocabulary.
- A feature's inside is free to change while its `index.ts` surface stays stable.
- `seo` and `landing` depend on `i18n`, so the surface of `i18n` is the one most costly to change.
- Work belonging to no single feature has no home; shared code sits below the features and has no owner by default.
- This rules out sibling references past an `index.ts`, and a shared sibling folder no feature owns.

## Signs the decision was wrong

- Most changes touch several domains at once, and the pair that always move together cannot be released independently.
- The same fix is applied once per domain, and a domain keeps being missed.
- The shared code every domain imports is growing faster than any domain.
- Which domain a new file belongs to cannot be settled without asking someone.
- A domain's public surface has grown until it names what the domain keeps inside.
