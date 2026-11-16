import type { Dictionary, Locale } from "@/features/i18n";
import { localePath } from "@/features/i18n";
import { company } from "@/lib/company";
import { BrandMark } from "./brand-mark";

interface SiteFooterProps {
  locale: Locale;
  labels: Dictionary["footer"];
}

export function SiteFooter({ locale, labels }: SiteFooterProps) {
  const details = [
    {
      label: labels.tradeNameLabel,
      value: `${company.localName} (${company.name})`,
    },
    { label: labels.representativeLabel, value: company.representative },
    {
      label: labels.registrationNumberLabel,
      value: company.businessRegistrationNumber,
    },
  ];

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-content flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <BrandMark href={localePath(locale)} className="self-start" />
        <div className="flex flex-col gap-3 text-sm text-muted-foreground md:items-end">
          <dl className="flex flex-col gap-1 md:flex-row md:flex-wrap md:justify-end md:gap-x-6">
            {details.map((row) => (
              <div key={row.label} className="flex gap-2">
                <dt>{row.label}</dt>
                <dd className="text-foreground tabular-nums">{row.value}</dd>
              </div>
            ))}
          </dl>
          <p className="flex flex-wrap items-center gap-x-6">
            <span>© 2026 {company.name}</span>
            <a
              href={company.githubUrl}
              className="inline-flex min-h-11 items-center transition-colors hover:text-foreground"
            >
              {labels.githubLabel}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
