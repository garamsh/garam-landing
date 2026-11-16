import type { Dictionary } from "@/features/i18n";

export function Hero({ copy }: { copy: Dictionary["hero"] }) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden="true"
        className="ruled-plane pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-1/4 -bottom-1/3 h-[120%] w-3/4 bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-brand)_24%,transparent),transparent)]"
      />
      <div className="relative mx-auto flex w-full max-w-content flex-col items-start gap-8 px-6 pt-20 pb-24 motion-safe:animate-rise lg:pt-36 lg:pb-section">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3.5 py-1.5 text-eyebrow font-medium text-muted-foreground backdrop-blur">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
          {copy.eyebrow}
        </span>
        <h1 className="max-w-5xl text-display font-bold text-balance">
          {copy.title}
        </h1>
        <p className="max-w-xl border-l-2 border-brand/40 pl-5 text-lead text-pretty text-muted-foreground lg:mt-8 lg:ml-[41.667%]">
          {copy.lead}
        </p>
      </div>
    </section>
  );
}
