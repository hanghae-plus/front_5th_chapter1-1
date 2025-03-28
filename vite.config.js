import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  // mode의 입력값: production(vite build), development(vite), test(vitest), ...
  return {
    base: mode === "production" ? "/front_5th_chapter1-1/" : "/",
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.hash.html"), // ✅ hash router용 HTML 지정
        },
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.js",
      exclude: ["**/e2e/**", "**/*.e2e.spec.js", "**/node_modules/**"],
    },
  };
});
