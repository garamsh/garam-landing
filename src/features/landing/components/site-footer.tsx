import type { Dictionary } from "@/features/i18n";
import { company } from "@/lib/company";

export function SiteFooter({ labels }: { labels: Dictionary["footer"] }) {
  const rows = [
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
    <footer className="border-t border-line">
      <dl className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-6 py-8 text-sm text-muted sm:flex-row sm:flex-wrap sm:gap-x-8">
        {rows.map((row) => (
          <div key={row.label} className="flex gap-2">
            <dt>{row.label}</dt>
            <dd className="text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>
    </footer>
  );
}
