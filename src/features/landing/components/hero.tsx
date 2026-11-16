import type { CSSProperties } from "react";
import type { Dictionary } from "@/features/i18n";
import { brandMarkPath } from "@/lib/brand-mark";

// Two outlines of the mark's plate sit behind it, offset toward the upper
// right, and settle into place once on load.
const echoes = [
  { x: 16, y: -16, opacity: 0.35, delay: "0ms" },
  { x: 8, y: -8, opacity: 0.6, delay: "120ms" },
];

export function Hero({ copy }: { copy: Dictionary["hero"] }) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden="true"
        className="ruled-plane pointer-events-none absolute inset-0"
      />
      <div className="relative mx-auto grid w-full max-w-content items-center gap-12 px-6 pt-16 pb-20 lg:grid-cols-12 lg:gap-8 lg:pt-32 lg:pb-section">
        <div className="flex flex-col items-start gap-8 motion-safe:animate-rise lg:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3.5 py-1.5 text-eyebrow font-medium text-muted-foreground backdrop-blur">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-brand"
            />
            {copy.eyebrow}
          </span>
          <h1 className="text-display font-bold text-balance">{copy.title}</h1>
          <p className="max-w-xl text-lead text-pretty text-muted-foreground">
            {copy.lead}
          </p>
        </div>
        <div
          aria-hidden="true"
          className="relative mx-auto aspect-square w-full max-w-64 lg:col-span-5 lg:max-w-sm lg:justify-self-center"
        >
          <div className="absolute -inset-[30%] bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-brand)_32%,transparent),transparent)]" />
          <svg
            viewBox="-4 -20 124 124"
            className="relative size-full overflow-visible text-brand"
          >
            {echoes.map((echo) => (
              <rect
                key={echo.x}
                width="100"
                height="100"
                rx="4"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.4"
                strokeOpacity={echo.opacity}
                style={
                  {
                    "--x": `${echo.x}px`,
                    "--y": `${echo.y}px`,
                    transform: "translate(var(--x), var(--y))",
                    animationDelay: echo.delay,
                  } as CSSProperties
                }
                className="motion-safe:animate-plate"
              />
            ))}
            <path
              d={brandMarkPath}
              fill="currentColor"
              fillRule="evenodd"
              className="motion-safe:animate-rise"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
