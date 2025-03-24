import { defineConfig } from "vite";

export default defineConfig(({ command }) => {
  const isProd = command === "build";

  return {
    base: isProd ? "/front_5th_chapter1-1/" : "/",
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.js",
      exclude: ["**/e2e/**", "**/*.e2e.spec.js", "**/node_modules/**"],
    },
  };
});
