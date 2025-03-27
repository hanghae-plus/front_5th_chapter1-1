import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    base:
      process.env.NODE_ENV === "production" ? "/front-5th-chapter1-1/" : "/",
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    exclude: ["**/e2e/**", "**/*.e2e.spec.js", "**/node_modules/**"],
  },
});
