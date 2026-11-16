import type { Dictionary } from "@/features/i18n";

export function Beliefs({ copy }: { copy: Dictionary["beliefs"] }) {
  return (
    <section
      aria-labelledby="beliefs-title"
      className="border-y border-line bg-surface"
    >
      <div className="mx-auto w-full max-w-5xl px-6 py-20">
        <h2
          id="beliefs-title"
          className="font-display text-3xl font-semibold md:text-4xl"
        >
          {copy.title}
        </h2>
        <ul className="mt-10 grid gap-10 md:grid-cols-3">
          {copy.items.map((item) => (
            <li key={item.title} className="border-t-2 border-warm pt-5">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
