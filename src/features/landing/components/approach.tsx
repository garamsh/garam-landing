import type { Dictionary } from "@/features/i18n";
import { SectionHeading } from "./section-heading";

export function Approach({ copy }: { copy: Dictionary["approach"] }) {
  return (
    <section
      id="approach"
      aria-labelledby="approach-title"
      className="scroll-mt-20 border-b border-border bg-muted/40"
    >
      <div className="mx-auto w-full max-w-content px-6 py-16 lg:py-section">
        <SectionHeading
          id="approach-title"
          eyebrow={copy.eyebrow}
          title={copy.title}
          body={copy.intro}
        />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
          {copy.items.map((item, index) => (
            <li
              key={item.title}
              className="flex flex-col gap-3 bg-card p-6 md:p-8"
            >
              <span
                aria-hidden="true"
                className="text-sm font-medium text-brand tabular-nums"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg text-balance">{item.title}</h3>
              <p className="text-pretty text-muted-foreground">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
