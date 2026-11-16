import type { Dictionary } from "@/features/i18n";
import { SectionHeading } from "./section-heading";

export function Mission({ copy }: { copy: Dictionary["mission"] }) {
  return (
    <section
      id="mission"
      aria-labelledby="mission-title"
      className="scroll-mt-20 border-b border-border"
    >
      <div className="mx-auto w-full max-w-content px-6 py-16 lg:py-section">
        <SectionHeading
          id="mission-title"
          eyebrow={copy.eyebrow}
          title={copy.title}
        />
        <ul className="mt-12 grid border-t border-l border-border md:grid-cols-3">
          {copy.items.map((item) => (
            <li
              key={item.title}
              className="flex flex-col gap-3 border-r border-b border-border p-6 md:p-8"
            >
              <span aria-hidden="true" className="size-2 rounded-xs bg-brand" />
              <h3 className="text-lg text-balance">{item.title}</h3>
              <p className="text-pretty text-muted-foreground">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
