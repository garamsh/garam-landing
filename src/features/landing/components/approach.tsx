import type { Dictionary } from "@/features/i18n";

export function Approach({ copy }: { copy: Dictionary["approach"] }) {
  return (
    <section
      id="approach"
      aria-labelledby="approach-title"
      className="mx-auto w-full max-w-5xl scroll-mt-6 px-6 py-20"
    >
      <h2
        id="approach-title"
        className="font-display text-3xl font-semibold md:text-4xl"
      >
        {copy.title}
      </h2>
      <p className="mt-4 max-w-2xl text-lg text-muted">{copy.intro}</p>
      <ol className="mt-10 grid gap-8 md:grid-cols-3">
        {copy.items.map((item, index) => (
          <li key={item.title} className="flex gap-4">
            <span
              aria-hidden="true"
              className="font-display text-4xl leading-none font-semibold text-action"
            >
              {index + 1}
            </span>
            <div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{item.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
