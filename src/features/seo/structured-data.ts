import { env } from "@/env";
import { company } from "@/lib/company";
import { absoluteUrl } from "./urls";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    alternateName: company.localName,
    url: env.siteUrl,
    logo: absoluteUrl("/logo.svg"),
  };
}

/** Serializes for a `<script>` body; `<` is escaped so no string can close it. */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
