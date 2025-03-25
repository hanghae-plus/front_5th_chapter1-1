import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/front_5th_chapter1-1/" : "/",

  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        hash: resolve(__dirname, "index.hash.html"),
        notFound: resolve(__dirname, "404.html"),
      },
    },
  },
});
