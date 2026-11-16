import type { Dictionary } from "@/features/i18n";
import { BrandGlyph } from "./brand-mark";

export function Hero({ copy }: { copy: Dictionary["hero"] }) {
  const roles = [copy.people, copy.agents];

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden="true"
        className="ruled-plane pointer-events-none absolute inset-0"
      />
      <div className="relative mx-auto grid w-full max-w-content gap-14 px-6 pt-16 pb-16 lg:pb-section lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16 lg:pt-28">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-eyebrow font-medium text-muted-foreground uppercase">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-brand"
            />
            {copy.eyebrow}
          </span>
          <h1 className="text-display text-balance">{copy.title}</h1>
          <p className="max-w-xl text-lead text-pretty text-muted-foreground">
            {copy.lead}
          </p>
          <a
            href="#approach"
            className="mt-2 inline-flex min-h-12 items-center rounded-lg bg-brand px-6 font-medium text-brand-foreground transition-opacity hover:opacity-90"
          >
            {copy.cta}
          </a>
        </div>
        <figure className="overflow-hidden rounded-xl border border-border bg-card">
          <ul className="divide-y divide-border">
            {roles.map((role) => (
              <li key={role.title} className="flex flex-col gap-2 px-6 py-6">
                <span className="text-eyebrow font-medium text-brand uppercase">
                  {role.title}
                </span>
                <p className="text-pretty">{role.body}</p>
              </li>
            ))}
          </ul>
          <figcaption className="flex items-center justify-between gap-4 border-t border-border bg-muted px-6 py-4 text-sm text-muted-foreground">
            <span className="text-pretty">{copy.caption}</span>
            <BrandGlyph className="size-6 shrink-0 text-brand" />
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
