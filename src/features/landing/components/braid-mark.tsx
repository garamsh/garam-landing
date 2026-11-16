import { braidStrandPaths } from "@/lib/braid-mark";

interface BraidMarkProps {
  className?: string;
  /** Plays the draw-in animation; the hero uses it, the header does not. */
  animated?: boolean;
}

/** Two strands crossing once: people and agents moving as one current. */
export function BraidMark({ className, animated = false }: BraidMarkProps) {
  const strand = animated ? "braid-strand" : undefined;
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className={strand}
        pathLength="1"
        d={braidStrandPaths.ink}
        stroke="var(--ink)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        className={strand}
        pathLength="1"
        d={braidStrandPaths.warm}
        stroke="var(--warm)"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}
