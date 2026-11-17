import { describe, expect, it } from "vitest";
import { getDictionary } from "@/features/i18n";
import { buildRobots, buildSitemap } from "../crawl";
import { buildLocaleMetadata } from "../metadata";
import { organizationJsonLd, serializeJsonLd } from "../structured-data";

const origin = "https://garam.sh";

describe("buildLocaleMetadata", () => {
  it("uses the locale's own title and description", () => {
    const metadata = buildLocaleMetadata("ko");
    expect(metadata.title).toBe(getDictionary("ko").meta.title);
    expect(metadata.description).toBe(getDictionary("ko").meta.description);
  });

  it("canonicalizes to the locale's absolute URL", () => {
    expect(buildLocaleMetadata("en").alternates?.canonical).toBe(
      `${origin}/en`,
    );
    expect(buildLocaleMetadata("ko").alternates?.canonical).toBe(
      `${origin}/ko`,
    );
  });

  it("lists every locale and x-default as alternates", () => {
    expect(buildLocaleMetadata("ko").alternates?.languages).toEqual({
      en: `${origin}/en`,
      ko: `${origin}/ko`,
      "x-default": `${origin}/en`,
    });
  });

  it("sets Open Graph locale and the other locale", () => {
    const { openGraph } = buildLocaleMetadata("ko");
    expect(openGraph).toMatchObject({
      locale: "ko_KR",
      alternateLocale: ["en_US"],
      url: `${origin}/ko`,
    });
  });
});

describe("buildSitemap", () => {
  it("lists each locale with the full alternate set including itself", () => {
    const entries = buildSitemap();
    expect(entries.map((entry) => entry.url)).toEqual([
      `${origin}/en`,
      `${origin}/ko`,
    ]);
    for (const entry of entries) {
      expect(entry.alternates?.languages).toEqual({
        en: `${origin}/en`,
        ko: `${origin}/ko`,
        "x-default": `${origin}/en`,
      });
    }
  });

  it("omits lastModified, which would not be accurate", () => {
    for (const entry of buildSitemap()) {
      expect(entry.lastModified).toBeUndefined();
    }
  });
});

describe("buildRobots", () => {
  it("allows crawling and names the absolute sitemap", () => {
    expect(buildRobots()).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: `${origin}/sitemap.xml`,
    });
  });
});

describe("organizationJsonLd", () => {
  it("describes the organization with a logo and no profile links", () => {
    expect(organizationJsonLd()).toEqual({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Garam",
      alternateName: "가람",
      url: origin,
      logo: `${origin}/logo.svg`,
    });
  });

  it("carries no address, phone or sameAs", () => {
    const keys = Object.keys(organizationJsonLd());
    expect(keys).not.toContain("sameAs");
    expect(keys).not.toContain("address");
    expect(keys).not.toContain("telephone");
  });
});

describe("serializeJsonLd", () => {
  it("escapes < so a value cannot close the script element", () => {
    const output = serializeJsonLd({ name: "</script><b>" });
    expect(output).not.toContain("<");
    expect(JSON.parse(output)).toEqual({ name: "</script><b>" });
  });
});
