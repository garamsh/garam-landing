import { expect, test } from "@playwright/test";

const origin = "https://garam.sh";

test.describe("root redirect", () => {
  const cases = [
    { header: "ko-KR,ko;q=0.9,en;q=0.8", target: "/ko" },
    { header: "en-GB,en;q=0.9", target: "/en" },
    { header: "fr-FR,fr;q=0.9", target: "/en" },
  ];

  for (const { header, target } of cases) {
    test(`sends Accept-Language ${header} to ${target}`, async ({
      request,
    }) => {
      const response = await request.get("/", {
        headers: { "Accept-Language": header },
        maxRedirects: 0,
      });
      expect(response.status()).toBe(307);
      const location = response.headers()["location"] ?? "";
      expect(new URL(location, "http://localhost").pathname).toBe(target);
      expect(response.headers()["vary"]).toContain("Accept-Language");
    });
  }
});

test.describe("locale pages", () => {
  for (const locale of ["en", "ko"]) {
    test(`serves /${locale} with its metadata`, async ({ page }) => {
      const response = await page.goto(`/${locale}`);
      expect(response?.status()).toBe(200);

      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `${origin}/${locale}`,
      );

      const alternates = page.locator('link[rel="alternate"][hreflang]');
      await expect(alternates).toHaveCount(3);
      await expect(alternates.nth(0)).toHaveAttribute("hreflang", "en");
      await expect(alternates.nth(1)).toHaveAttribute("hreflang", "ko");
      await expect(alternates.nth(2)).toHaveAttribute("hreflang", "x-default");

      const json = await page
        .locator('script[type="application/ld+json"]')
        .textContent();
      expect(JSON.parse(json ?? "")).toMatchObject({
        "@type": "Organization",
        name: "Garam",
      });

      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });
  }

  test("names the home link by its visible text", async ({ page }) => {
    await page.goto("/ko");
    await expect(
      page.getByRole("link", { name: "Garam", exact: true }),
    ).toBeVisible();
  });
});

test.describe("unknown paths", () => {
  for (const path of ["/fr", "/does-not-exist"]) {
    test(`answers 404 for ${path}`, async ({ request }) => {
      const response = await request.get(path);
      expect(response.status()).toBe(404);
    });
  }
});

test.describe("crawler files", () => {
  test("lists both locales in the sitemap with alternates", async ({
    request,
  }) => {
    const body = await (await request.get("/sitemap.xml")).text();
    expect(body).toContain(`<loc>${origin}/en</loc>`);
    expect(body).toContain(`<loc>${origin}/ko</loc>`);
    expect(body).toContain('hreflang="x-default"');
  });

  test("allows crawling and names the sitemap in robots.txt", async ({
    request,
  }) => {
    const body = await (await request.get("/robots.txt")).text();
    expect(body).toContain("Allow: /");
    expect(body).toContain(`Sitemap: ${origin}/sitemap.xml`);
  });
});
