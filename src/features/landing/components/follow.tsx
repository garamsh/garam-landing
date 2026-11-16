import type { Dictionary } from "@/features/i18n";
import { company } from "@/lib/company";

export function Follow({ copy }: { copy: Dictionary["follow"] }) {
  return (
    <section
      aria-labelledby="follow-title"
      className="border-t border-line bg-surface"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col items-start gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between">
        <div>
          <h2
            id="follow-title"
            className="font-display text-3xl font-semibold"
          >
            {copy.title}
          </h2>
          <p className="mt-3 max-w-xl text-muted">{copy.body}</p>
        </div>
        <a
          href={company.githubUrl}
          className="inline-flex min-h-12 items-center rounded-md bg-action px-6 font-semibold text-on-action hover:opacity-90"
        >
          {copy.cta}
        </a>
      </div>
    </section>
  );
}
