import type { Dictionary } from "@/features/i18n";
import { SectionHeading } from "./section-heading";

export function Mission({ copy }: { copy: Dictionary["mission"] }) {
  return (
    <section
      id="mission"
      aria-labelledby="mission-title"
      className="scroll-mt-20 border-b border-border"
    >
      <div className="mx-auto grid w-full max-w-content gap-10 px-6 py-16 lg:grid-cols-12 lg:gap-16 lg:py-section">
        <div className="lg:col-span-4">
          <SectionHeading
            id="mission-title"
            eyebrow={copy.eyebrow}
            title={copy.title}
          />
        </div>
        <ul className="divide-y divide-border border-y border-border lg:col-span-8">
          {copy.items.map((item) => (
            <li
              key={item.title}
              className="flex flex-col gap-2 py-8 first:pt-6 last:pb-6"
            >
              <h3 className="text-title text-balance">{item.title}</h3>
              <p className="max-w-2xl text-lead text-pretty text-muted-foreground">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
