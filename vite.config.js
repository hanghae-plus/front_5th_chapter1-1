import { defineConfig } from "vitest/config";
import { resolve } from "path";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    exclude: ["**/e2e/**", "**/*.e2e.spec.js", "**/node_modules/**"],
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"), // 메인 엔트리 파일
        hash: resolve(__dirname, "index.hash.html"), // 해시 페이지 포함
      },
    },
  },
  base: isProduction ? "/front_5th_chapter1-1/" : "/",
});
