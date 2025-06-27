import { defineConfig, mergeConfig } from "vite";

import react from "@vitejs/plugin-react";
import path from "node:path";
import dts from "vite-plugin-dts";
import { generateShortClassName } from "./tools/build/css-modules";

const entryRoot = path.resolve(__dirname, "src");
const extendedEntrypoints = {
  // Node Editor module (JS + CSS automatically included)
  "extended/node-editor": path.resolve(entryRoot, "extended/node-editor/index.ts"),
  // Panel module (JS + CSS automatically included)
  "extended/panel": path.resolve(entryRoot, "extended/panel/index.ts"),
  // Main library entry point
  index: path.resolve(entryRoot, "index.tsx"),

  // Layouts module (JS + CSS automatically included)
  layouts: path.resolve(entryRoot, "layouts/index.tsx"),
};
const defaultConfig = defineConfig({
  build: {
    outDir: "dist/lib",
    cssCodeSplit: true,
    lib: {
      entry: {
        // Extended modules
        ...extendedEntrypoints,
        // Theme modules
        "themes/LiquidGlassFilter": path.resolve(entryRoot, "themes/LiquidGlassFilter.tsx"),
      },
      name: "tanuki-ui",
      formats: ["es", "cjs"],
      fileName: (format) => {
        switch (format) {
          case "es":
            return "[name].js";
          case "cjs":
            return "[name].cjs";
        }
        return "[name].js";
      },
    },

    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        chunkFileNames: "vendor/[name]-[hash].js",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  css: {
    modules: {
      generateScopedName: (name, filename) => {
        const relativePath = path.relative(entryRoot, filename);
        // Normalize path separators for consistent naming across platforms
        const normalizedPath = relativePath.replace(/\\/g, "/");
        // Remove file extension and "src/" prefix
        const cleanPath = normalizedPath.replace(/\.module\.(css|scss|sass|less)$/, "").replace(/^src\//, "");

        return generateShortClassName(name, cleanPath);
      },
      localsConvention: "camelCaseOnly",
    },
  },
  plugins: [
    react({
      jsxRuntime: "automatic",
    }),
    dts({
      entryRoot,
      outDir: "dist/types",
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/*.stories.tsx"],
    }),
  ],
});
const testConfig = {
  test: {
    globals: true,
  },
};
export default mergeConfig(defaultConfig, testConfig);
