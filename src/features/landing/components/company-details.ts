import type { Dictionary } from "@/features/i18n";
import { company } from "@/lib/company";

/** The business facts the company section and the footer both show. */
export function companyDetails(labels: Dictionary["footer"]) {
  return [
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
}
