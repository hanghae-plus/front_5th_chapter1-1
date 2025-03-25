import { defineConfig } from "vitest/config";

export default defineConfig(({ command }) => ({
  // GitHub Pages 배포를 위한 base URL 설정
  // command가 'build'일 때는 GitHub Pages URL, 그 외에는 루트로 설정
  base: command === "build" ? "/front_5th_chapter1-1/" : "/",

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    exclude: ["**/e2e/**", "**/*.e2e.spec.js", "**/node_modules/**"],
  },
}));
