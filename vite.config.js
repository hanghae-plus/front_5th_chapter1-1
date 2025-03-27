import { defineConfig } from "vitest/config";

export default defineConfig({
  // GitHub Pages 배포 base URL
  base: "/front_5th_chapter1-1/",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    exclude: ["**/e2e/**", "**/*.e2e.spec.js", "**/node_modules/**"],
  },
});
