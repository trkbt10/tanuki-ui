import { defineConfig, mergeConfig } from "vite";

import react from "@vitejs/plugin-react";
import path from "node:path";
import dts from "vite-plugin-dts";
import { generateShortClassName } from "./tools/build/css-modules";

const entryRoot = path.resolve(__dirname, "src");
const defaultConfig = defineConfig({
  build: {
    outDir: "dist/lib",
    cssCodeSplit: true,
    lib: {
      entry: {
        // Main library entry point
        index: path.resolve(entryRoot, "index.tsx"),

        // Layouts module (JS + CSS automatically included)
        layouts: path.resolve(entryRoot, "layouts/index.tsx"),

        // Node Editor module (JS + CSS automatically included)
        "extended/node-editor": path.resolve(entryRoot, "extended/node-editor/index.ts"),

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
        assetFileNames: (assetInfo) => {
          if (assetInfo.names?.some((name) => name.endsWith(".css"))) {
            const isLayoutDir = assetInfo.originalFileNames?.some((name) => name.startsWith("src/layouts/"));
            if (isLayoutDir) {
              return "layouts/style.css";
            }
            if (assetInfo.originalFileNames?.some((name) => name.startsWith("src/extended/node-editor/"))) {
              return "extended/node-editor/style.css";
            }
            return "style.css";
          }
          return "assets/[name]-[hash].[ext]";
        },
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
        const normalizedPath = relativePath.replace(/\\/g, '/');
        // Remove file extension and "src/" prefix
        const cleanPath = normalizedPath
          .replace(/\.module\.(css|scss|sass|less)$/, '')
          .replace(/^src\//, '');
        
        return generateShortClassName(name, cleanPath);
      },
      localsConvention: 'camelCaseOnly',
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
