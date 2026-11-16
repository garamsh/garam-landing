import type { Dictionary } from "@/features/i18n";
import { company } from "@/lib/company";
import { BraidMark } from "./braid-mark";

export function Hero({ copy }: { copy: Dictionary["hero"] }) {
  return (
    <section className="mx-auto grid w-full max-w-5xl items-center gap-12 px-6 pt-10 pb-20 md:grid-cols-[3fr_2fr] md:pt-20 md:pb-28">
      <div>
        <p className="text-sm font-semibold tracking-widest text-warm uppercase">
          {copy.eyebrow}
        </p>
        <h1 className="mt-4 font-display text-4xl leading-tight font-semibold text-balance sm:text-5xl md:text-6xl">
          {copy.title}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          {copy.lead}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={company.githubUrl}
            className="inline-flex min-h-12 items-center rounded-md bg-action px-6 font-semibold text-on-action hover:opacity-90"
          >
            {copy.primaryCta}
          </a>
          <a
            href="#approach"
            className="inline-flex min-h-12 items-center rounded-md border border-line px-6 font-semibold hover:bg-surface"
          >
            {copy.secondaryCta}
          </a>
        </div>
      </div>
      <BraidMark animated className="mx-auto w-full max-w-xs" />
    </section>
  );
}
