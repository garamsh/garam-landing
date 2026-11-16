import { getDictionary, type Locale } from "@/features/i18n";
import { Approach } from "./approach";
import { CompanySection } from "./company-section";
import { Hero } from "./hero";
import { Mission } from "./mission";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function LandingPage({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-20 focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-brand-foreground"
      >
        {dictionary.a11y.skipToContent}
      </a>
      <SiteHeader
        locale={locale}
        labels={dictionary.a11y}
        nav={dictionary.nav}
      />
      <main id="main" className="flex-1">
        <Hero copy={dictionary.hero} />
        <Mission copy={dictionary.mission} />
        <Approach copy={dictionary.approach} />
        <CompanySection copy={dictionary.company} />
      </main>
      <SiteFooter locale={locale} labels={dictionary.footer} />
    </>
  );
}
