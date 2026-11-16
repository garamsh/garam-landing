import type { Dictionary, Locale } from "@/features/i18n";
import { localePath } from "@/features/i18n";
import { company } from "@/lib/company";
import { BrandMark } from "./brand-mark";
import { companyDetails } from "./company-details";

interface SiteFooterProps {
  locale: Locale;
  labels: Dictionary["footer"];
}

export function SiteFooter({ locale, labels }: SiteFooterProps) {
  return (
    <footer>
      <div className="mx-auto flex w-full max-w-content flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <BrandMark href={localePath(locale)} className="self-start" />
        <dl className="flex flex-col gap-2 text-sm text-muted-foreground md:items-end">
          {companyDetails(labels).map((row) => (
            <div key={row.label} className="flex gap-2">
              <dt>{row.label}</dt>
              <dd className="text-foreground tabular-nums">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-content px-6 py-2 text-sm">
          <a
            href={company.githubUrl}
            className="inline-flex min-h-11 items-center text-muted-foreground transition-colors hover:text-foreground"
          >
            {labels.githubLabel}
          </a>
        </div>
      </div>
    </footer>
  );
}
