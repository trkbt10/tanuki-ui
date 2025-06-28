import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // ルートのsrcディレクトリを直接参照
      "@": path.resolve(__dirname, "../../src"),
      "tanuki-ui": path.resolve(__dirname, "../../src/index.tsx"),
    },
  },
  build: {
    outDir: "dist",
  },
  optimizeDeps: {
    // 親ディレクトリのソースコードを含める
    include: ["tanuki-ui"],
  },
});
