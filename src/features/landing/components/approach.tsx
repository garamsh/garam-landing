import type { Dictionary } from "@/features/i18n";
import { SectionHeading } from "./section-heading";

// The bar under each step grows with the step: start small, then widen.
const reach = ["w-1/4", "w-1/2", "w-full"];

export function Approach({ copy }: { copy: Dictionary["approach"] }) {
  return (
    <section
      id="approach"
      aria-labelledby="approach-title"
      className="scroll-mt-20 bg-muted/50"
    >
      <div className="mx-auto w-full max-w-content px-6 py-20 lg:py-section">
        <SectionHeading
          id="approach-title"
          eyebrow={copy.eyebrow}
          title={copy.title}
          body={copy.intro}
        />
        <ol className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-3 lg:gap-6">
          {copy.items.map((item, index) => (
            <li
              key={item.title}
              className="surface flex flex-col gap-4 rounded-2xl p-7 lg:p-9"
            >
              <span
                aria-hidden="true"
                className="font-mono text-sm text-brand tabular-nums"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                aria-hidden="true"
                className="h-1 w-full rounded-full bg-border"
              >
                <span
                  className={`block h-full rounded-full bg-brand ${reach[index]}`}
                />
              </span>
              <h3 className="mt-4 text-2xl text-pretty">{item.title}</h3>
              <p className="text-pretty text-muted-foreground">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
