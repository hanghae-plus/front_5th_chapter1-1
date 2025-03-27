import { defineConfig } from "vitest/config";

export default defineConfig({
  base: "/hanghae99-chap1/",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    exclude: ["**/e2e/**", "**/*.e2e.spec.js", "**/node_modules/**"],
  },
});
