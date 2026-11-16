# Structure

The structural rules of the system: what a unit is, what may reference what, and when a new unit is earned.

## Current decisions

### Shape

- **A domain is the unit.** One folder per domain, named for its subject matter and never for a technical role. Here a domain is a feature, `src/features/<name>/`.
- **A domain is reached only through what it declares public.** Everything else it holds is internal, and reaching past that surface is a defect even where the language permits it. A feature's public surface is its `index.ts`.
- **Whether a domain may depend on a sibling at all is contested.** *Domain-Driven Design* (Evans, 2003) gives no single answer: its relations between contexts run from Shared Kernel, where two share code, to Separate Ways, where neither may reference the other. A project takes one, records which, and a reference the recorded choice does not permit is a defect. Taken here (ADR 0001): a feature may reference a sibling only through that sibling's `index.ts`, and a reference past it is a defect.
- **Shared code sits below every domain, never beside one.** What two domains both need is extracted below them, or owned by one and reached through its declared surface; it never becomes a sibling folder no domain owns.
- **A cycle between domains means the split is wrong**, and so does a file that belongs in two of them. References between features form no cycle.
- **A new domain is earned** by subject matter with its own lifecycle and vocabulary, which something outside it depends on, and whose public surface can stay stable while its inside changes.

### Composition

- **The application has one composition site.** It is the one place that constructs concrete implementations, and it decides which implementation each declared abstraction receives. Here it is `src/app/`: routes compose features and construct nothing else.
- **Every other unit receives what it depends on and constructs none of it**, whatever the shape makes the unit — a domain, a layer, or an adapter.
- **The composition site stays thin.** It constructs and passes; it decides nothing else.

### Features and dependency direction

- `src/features/i18n/` — locales, dictionaries, locale helpers. Depends on no feature.
- `src/features/seo/` — site config, metadata, structured data. Depends on `i18n`.
- `src/features/landing/` — page sections. Depends on `i18n`.

## Rationale

- The shape and the sibling relation are recorded in `docs/architecture/adr/0001-domain-structure.md`, with the signs that would show the choice wrong.
- Each feature's own responsibility document states what it holds; this file states only how features relate.

## Open questions

- None.
