import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  base: "/tanuki-ui/",
  resolve: {
    alias: {
      "tanuki-ui": resolve(__dirname, "../../src"),
    },
  },
  publicDir: resolve(__dirname, "../../public"),
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          router: ["react-router"],
          "tanuki-ui-core": ["tanuki-ui"],
          "tanuki-ui": ["tanuki-ui"],
        },
      },
    },
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
});
