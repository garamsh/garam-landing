import Link from "next/link";
import {
  getLocaleName,
  localeCodes,
  localePath,
  type Dictionary,
  type Locale,
} from "@/features/i18n";
import { BrandMark } from "./brand-mark";

interface SiteHeaderProps {
  locale: Locale;
  labels: Dictionary["a11y"];
  nav: Dictionary["nav"];
}

const linkClass =
  "inline-flex min-h-11 items-center rounded-md px-3 text-sm text-muted-foreground transition-colors hover:text-foreground";

export function SiteHeader({ locale, labels, nav }: SiteHeaderProps) {
  const sections = [
    { id: "mission", label: nav.mission },
    { id: "approach", label: nav.approach },
    { id: "company", label: nav.company },
  ];

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-content items-center gap-6 px-6 py-2">
        <BrandMark href={localePath(locale)} />
        <nav aria-label={labels.sections} className="hidden md:block">
          <ul className="flex items-center gap-3">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className={linkClass}>
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={labels.languageSwitcher} className="ml-auto">
          <ul className="flex items-center gap-1">
            {localeCodes.map((code) => (
              <li key={code}>
                <Link
                  href={localePath(code)}
                  lang={code}
                  hrefLang={code}
                  aria-current={code === locale ? "page" : undefined}
                  className={`${linkClass} aria-[current=page]:bg-muted aria-[current=page]:font-medium aria-[current=page]:text-foreground`}
                >
                  {getLocaleName(code)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
