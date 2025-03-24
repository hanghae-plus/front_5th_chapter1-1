import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig(({ command }) => {
  const isProd = command === "build";

  return {
    base: isProd ? "/front-5th-chapter1-1/" : "/",
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.js",
      exclude: [
        ...configDefaults.exclude,
        "**/e2e/**",
        "**/*.e2e.spec.js",
        "**/node_modules/**",
      ],
    },
  };
});
