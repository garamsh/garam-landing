import type { Dictionary } from "@/features/i18n";
import { companyDetails } from "./company-details";
import { SectionHeading } from "./section-heading";

interface CompanySectionProps {
  copy: Dictionary["company"];
  labels: Dictionary["footer"];
}

export function CompanySection({ copy, labels }: CompanySectionProps) {
  return (
    <section
      id="company"
      aria-labelledby="company-title"
      className="scroll-mt-20 border-b border-border"
    >
      <div className="mx-auto grid w-full max-w-content gap-12 px-6 py-16 lg:py-section lg:grid-cols-2 lg:gap-16">
        <SectionHeading
          id="company-title"
          eyebrow={copy.eyebrow}
          title={copy.title}
          body={copy.body}
        />
        <div className="rounded-xl border border-border bg-card">
          <h3 className="border-b border-border px-6 py-4 text-eyebrow font-medium text-muted-foreground uppercase">
            {copy.detailsTitle}
          </h3>
          <dl className="divide-y divide-border">
            {companyDetails(labels).map((row) => (
              <div
                key={row.label}
                className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:gap-6"
              >
                <dt className="text-muted-foreground sm:w-48 sm:shrink-0">
                  {row.label}
                </dt>
                <dd className="font-medium tabular-nums">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
