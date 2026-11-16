import type { Dictionary } from "@/features/i18n";
import { SectionHeading } from "./section-heading";

export function Mission({ copy }: { copy: Dictionary["mission"] }) {
  return (
    <section
      id="mission"
      aria-labelledby="mission-title"
      className="ink relative scroll-mt-20 overflow-hidden border-y border-foreground/15"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-1/3 -right-1/4 size-[60rem] bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-brand)_20%,transparent),transparent)]"
      />
      <div className="relative mx-auto w-full max-w-content px-6 py-20 lg:py-section">
        <SectionHeading
          id="mission-title"
          eyebrow={copy.eyebrow}
          title={copy.title}
        />
        <ul className="mt-14 border-t border-border lg:mt-20">
          {copy.items.map((item) => (
            <li
              key={item.title}
              className="grid gap-4 border-b border-border py-10 lg:grid-cols-12 lg:gap-8 lg:py-14"
            >
              <h3 className="text-statement text-balance lg:col-span-7">
                {item.title}
              </h3>
              <p className="text-lead text-pretty text-muted-foreground lg:col-span-5 lg:pt-1.5">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
