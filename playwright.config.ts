import { defineConfig } from "@playwright/test";

const port = 3100;

export default defineConfig({
  testDir: "e2e",
  forbidOnly: Boolean(process.env.CI),
  reporter: process.env.CI ? "github" : "list",
  use: { baseURL: `http://localhost:${port}` },
  webServer: {
    // The built app, so `pnpm build` must have run.
    command: `pnpm start --port ${port}`,
    url: `http://localhost:${port}/en`,
    reuseExistingServer: false,
  },
});
