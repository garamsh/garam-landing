import type { Dictionary } from "@/features/i18n";

export function NameNote({ copy }: { copy: Dictionary["nameNote"] }) {
  return (
    <section
      aria-labelledby="name-title"
      className="mx-auto w-full max-w-5xl px-6 pb-20"
    >
      <h2 id="name-title" className="text-sm font-semibold text-warm uppercase">
        {copy.title}
      </h2>
      <p className="mt-3 max-w-2xl font-display text-2xl leading-snug">
        {copy.body}
      </p>
    </section>
  );
}
