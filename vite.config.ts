import { defineConfig } from "vitest/config";

export default defineConfig({
  // GitHub Pages project sites are served from /<repo>/. CI sets BASE_URL.
  base: process.env.BASE_URL ?? "/",
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
