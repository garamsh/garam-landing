// The two strands of the braid mark, in the mark's 64-unit viewBox. The page
// mark and the share image both draw from here so the two cannot drift.
export const braidStrandPaths = {
  ink: "M6 20C24 20 28 44 58 44",
  warm: "M6 44C24 44 28 20 58 20",
} as const;
