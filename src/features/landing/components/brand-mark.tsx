import Link from "next/link";
import { brandMarkPath } from "@/lib/brand-mark";

/** The mark alone, sized by the caller and coloured by `currentColor`. */
export function BrandGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <path fill="currentColor" fillRule="evenodd" d={brandMarkPath} />
    </svg>
  );
}

interface BrandMarkProps {
  href: string;
  className?: string;
}

/** The mark and the wordmark, linking home; one font-size scales the lockup. */
export function BrandMark({ href, className }: BrandMarkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center gap-[0.28em] rounded-md text-2xl ${className ?? ""}`}
    >
      <BrandGlyph className="size-[1em]" />
      <span className="text-[0.7143em] leading-none font-semibold tracking-[0.02em]">
        GARAM
      </span>
    </Link>
  );
}
