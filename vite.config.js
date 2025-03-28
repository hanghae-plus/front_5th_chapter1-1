import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";
import { resolve } from "path";
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log("env", env);
  console.log("env.VITE_APP_BASE_URL", env.VITE_APP_BASE_URL);
  return {
    base: env.VITE_APP_BASE_URL || "/",
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"), // 메인 엔트리 파일
          hash: resolve(__dirname, "index.hash.html"), // 해시 엔트리 파일
          404: resolve(__dirname, "404.html"), // 404 페이지 포함
        },
      },
      outDir: "dist",
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.js",
      exclude: ["**/e2e/**", "**/*.e2e.spec.js", "**/node_modules/**"],
    },
  };
});
