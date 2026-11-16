import type { Dictionary } from "@/features/i18n";
import { BrandGlyph } from "./brand-mark";

export function Hero({ copy }: { copy: Dictionary["hero"] }) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden="true"
        className="ruled-plane pointer-events-none absolute inset-0"
      />
      <div className="relative mx-auto grid w-full max-w-content gap-14 px-6 pt-16 pb-16 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16 lg:pt-28 lg:pb-section">
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
        <div
          aria-hidden="true"
          className="relative hidden aspect-square w-full max-w-md items-center justify-center justify-self-end overflow-hidden rounded-xl border border-border bg-card lg:flex"
        >
          <div className="ruled-plane absolute inset-0" />
          <BrandGlyph className="relative size-40 text-brand" />
        </div>
      </div>
    </section>
  );
}
