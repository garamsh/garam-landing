import type { Dictionary } from "@/features/i18n";

export function Closing({ copy }: { copy: Dictionary["closing"] }) {
  return (
    <section
      aria-labelledby="closing-title"
      className="relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_70%_at_50%_100%,color-mix(in_oklab,var(--color-brand)_16%,transparent),transparent)]"
      />
      <div className="relative mx-auto flex w-full max-w-content flex-col items-center px-6 py-24 text-center lg:py-40">
        <h2 id="closing-title" className="max-w-3xl text-title text-balance">
          {copy.title}
        </h2>
      </div>
    </section>
  );
}
