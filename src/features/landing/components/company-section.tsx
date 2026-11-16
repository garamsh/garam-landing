import type { Dictionary } from "@/features/i18n";
import { company } from "@/lib/company";
import { SectionHeading } from "./section-heading";

export function CompanySection({ copy }: { copy: Dictionary["company"] }) {
  return (
    <section
      id="company"
      aria-labelledby="company-title"
      className="scroll-mt-20 border-b border-border"
    >
      <div className="mx-auto grid w-full max-w-content items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:py-section">
        <SectionHeading
          id="company-title"
          eyebrow={copy.eyebrow}
          title={copy.title}
          body={copy.body}
        />
        <div
          aria-hidden="true"
          className="relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-border bg-card py-16"
        >
          <div className="ruled-plane absolute inset-0" />
          <span className="relative text-8xl leading-none font-semibold text-brand sm:text-9xl">
            {company.localName}
          </span>
          <span className="relative text-lg font-medium tracking-[0.2em] text-muted-foreground uppercase">
            {company.name}
          </span>
        </div>
      </div>
    </section>
  );
}
