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
        d="M6 20C24 20 28 44 58 44"
        stroke="var(--ink)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        className={strand}
        pathLength="1"
        d="M6 44C24 44 28 20 58 20"
        stroke="var(--warm)"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}
