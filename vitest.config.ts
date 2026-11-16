import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/__tests__/*.test.ts"],
    // An empty value means unset to `src/env.ts`, so a developer's shell
    // setting cannot change the expected URLs.
    env: { NEXT_PUBLIC_SITE_URL: "" },
  },
});
