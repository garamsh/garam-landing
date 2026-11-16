import { getDictionary, type Locale } from "@/features/i18n";
import { Approach } from "./approach";
import { Beliefs } from "./beliefs";
import { Follow } from "./follow";
import { Hero } from "./hero";
import { NameNote } from "./name-note";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function LandingPage({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-10 focus:rounded-md focus:bg-action focus:px-4 focus:py-2 focus:text-on-action"
      >
        {dictionary.a11y.skipToContent}
      </a>
      <SiteHeader locale={locale} labels={dictionary.a11y} />
      <main id="main">
        <Hero copy={dictionary.hero} />
        <Beliefs copy={dictionary.beliefs} />
        <Approach copy={dictionary.approach} />
        <NameNote copy={dictionary.nameNote} />
        <Follow copy={dictionary.follow} />
      </main>
      <SiteFooter labels={dictionary.footer} />
    </>
  );
}
