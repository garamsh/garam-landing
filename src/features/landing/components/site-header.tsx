import Link from "next/link";
import {
  getLocaleName,
  localeCodes,
  localePath,
  type Dictionary,
  type Locale,
} from "@/features/i18n";
import { company } from "@/lib/company";
import { BraidMark } from "./braid-mark";

interface SiteHeaderProps {
  locale: Locale;
  labels: Dictionary["a11y"];
}

export function SiteHeader({ locale, labels }: SiteHeaderProps) {
  return (
    <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6">
      <Link
        href={localePath(locale)}
        className="flex items-center gap-3 rounded-md"
      >
        <BraidMark className="size-9" />
        <span className="font-display text-2xl font-semibold tracking-tight">
          {company.name}
        </span>
      </Link>
      <nav aria-label={labels.languageSwitcher}>
        <ul className="flex items-center gap-1">
          {localeCodes.map((code) => (
            <li key={code}>
              <Link
                href={localePath(code)}
                lang={code}
                hrefLang={code}
                aria-current={code === locale ? "page" : undefined}
                className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-muted underline-offset-4 hover:text-ink aria-[current=page]:text-ink aria-[current=page]:underline"
              >
                {getLocaleName(code)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
