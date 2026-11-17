import AxeBuilder from "@axe-core/playwright";
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
      page
        .getByRole("banner")
        .getByRole("link", { name: "GARAM", exact: true }),
    ).toBeVisible();
  });
});

test.describe("corporate page", () => {
  for (const locale of ["en", "ko"]) {
    test(`/${locale} has the corporate sections and no follow call`, async ({
      page,
    }) => {
      await page.goto(`/${locale}`);

      for (const id of ["mission", "approach"]) {
        await expect(page.locator(`main section#${id}`)).toBeVisible();
      }

      // The page closes with a statement, then the footer.
      await expect(
        page.locator("main section").last().getByRole("heading", { level: 2 }),
      ).toBeVisible();

      // The name section is gone: no section, nav link or text about the name.
      await expect(page.locator("#company")).toHaveCount(0);
      await expect(page.locator('a[href="#company"]')).toHaveCount(0);
      await expect(page.getByText(/about the name|이름에 대하여/i)).toHaveCount(
        0,
      );

      // The page does not point to the organization's GitHub.
      // The control: the same attribute selector does match the three links
      // to this locale's home (header mark, language switcher, footer mark).
      await expect(page.locator(`a[href="/${locale}"]`)).toHaveCount(3);
      await expect(page.locator('a[href*="github.com"]')).toHaveCount(0);

      // The business details are stated once, in the footer.
      await expect(page.getByText("605-37-70404")).toHaveCount(1);
      await expect(
        page.getByRole("contentinfo").getByText("605-37-70404"),
      ).toHaveCount(1);

      // No contact details: no email or phone links.
      await expect(
        page.locator('a[href^="mailto:"], a[href^="tel:"]'),
      ).toHaveCount(0);
    });
  }
});

test.describe("keyboard", () => {
  test("tabs through the skip link, header, content and footer in order", async ({
    page,
  }) => {
    await page.goto("/en");
    const expected = [
      "#main",
      "/en",
      "#mission",
      "#approach",
      "/en",
      "/ko",
      "/en",
    ];

    for (const href of expected) {
      await page.keyboard.press("Tab");
      const focused = page.locator(":focus");
      await expect(focused).toHaveAttribute("href", href);
      // The focus ring is drawn, not removed.
      await expect(focused).toHaveCSS("outline-style", "solid");
      await expect(focused).toHaveCSS("outline-width", "3px");
    }
  });

  test("the skip link moves focus past the header", async ({ page }) => {
    await page.goto("/ko");
    await page.keyboard.press("Tab");
    await expect(page.locator(":focus")).toHaveText("본문으로 건너뛰기");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });
});

test.describe("motion", () => {
  test("the hero rises once on load and holds still under reduced motion", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/en");
    const title = page.getByRole("heading", { level: 1 });
    await expect(title.locator("xpath=..")).not.toHaveCSS(
      "animation-name",
      "none",
    );

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/en");
    await expect(title.locator("xpath=..")).toHaveCSS("animation-name", "none");
  });
});

test.describe("brand mark", () => {
  test("appears in the header and footer only", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("svg")).toHaveCount(2);
    await expect(page.getByRole("banner").locator("svg")).toHaveCount(1);
    await expect(page.getByRole("contentinfo").locator("svg")).toHaveCount(1);
    await expect(page.locator("main svg")).toHaveCount(0);
  });
});

test.describe("layout stability", () => {
  for (const locale of ["en", "ko"]) {
    test(`/${locale} shifts less than 0.1 while fonts load`, async ({
      page,
    }) => {
      await page.goto(`/${locale}`, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      const shift = await page.evaluate(
        () =>
          new Promise<number>((resolve) => {
            let total = 0;
            const observer = new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                const { hadRecentInput, value } = entry as PerformanceEntry & {
                  hadRecentInput: boolean;
                  value: number;
                };
                if (!hadRecentInput) total += value;
              }
            });
            observer.observe({ type: "layout-shift", buffered: true });
            setTimeout(() => resolve(total), 500);
          }),
      );
      expect(shift).toBeLessThan(0.1);
    });
  }
});

test.describe("contrast", () => {
  for (const locale of ["en", "ko"]) {
    for (const colorScheme of ["light", "dark"] as const) {
      test(`/${locale} in ${colorScheme} has no axe violations`, async ({
        page,
      }) => {
        await page.emulateMedia({ colorScheme });
        await page.goto(`/${locale}`);
        // Read the scheme back: the check must run in the scheme it names.
        expect(
          await page.evaluate(
            (scheme) =>
              window.matchMedia(`(prefers-color-scheme: ${scheme})`).matches,
            colorScheme,
          ),
        ).toBe(true);

        const results = await new AxeBuilder({ page }).analyze();
        expect(results.violations).toEqual([]);
        // Colour contrast was evaluated, not skipped.
        expect(
          results.passes.some((rule) => rule.id === "color-contrast"),
        ).toBe(true);
      });
    }
  }
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
