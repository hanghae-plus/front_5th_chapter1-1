import { defineConfig } from "vitest/config";

console.log("🚀 process.env.VITE_BASE_URL >> ", process.env.VITE_BASE_URL);

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    exclude: ["**/e2e/**", "**/*.e2e.spec.js", "**/node_modules/**"],
  },
  base: process.env.VITE_BASE_URL ?? "/",
});
