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
        manualChunks: (id) => {
          // 各エントリーポイント専用のファイルはそのエントリーポイントのチャンクに含める
          for (const key of Object.keys(extendedEntrypoints)) {
            if (id.includes(`src/${key}/`)) {
              return key.replace("/", "-");
            }
          }

          // layoutsディレクトリのファイル
          if (id.includes("src/layouts/")) {
            return "layouts";
          }

          // themesディレクトリのファイル
          if (id.includes("src/themes/")) {
            const match = id.match(/src\/themes\/([^\/]+)/);
            if (match) {
              return `themes-${match[1]}`;
            }
          }

          // その他の共通ファイルは自動分割を許可
          return undefined;
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.names?.some((name) => name.endsWith(".css"))) {
            // チャンク名ベースでCSSファイル名を決定
            const chunkName = assetInfo.names?.[0]?.replace(/\.css$/, "");

            // extended entry points
            for (const key of Object.keys(extendedEntrypoints)) {
              const chunkKey = key.replace("/", "-");
              if (
                chunkName?.includes(chunkKey) ||
                assetInfo.originalFileNames?.some((name) => name.startsWith(`src/${key}/`))
              ) {
                return `${key}/style.css`;
              }
            }

            // layouts
            if (
              chunkName?.includes("layouts") ||
              assetInfo.originalFileNames?.some((name) => name.startsWith("src/layouts/"))
            ) {
              return "layouts/style.css";
            }

            // themes
            if (
              chunkName?.startsWith("themes-") ||
              assetInfo.originalFileNames?.some((name) => name.startsWith("src/themes/"))
            ) {
              const themeName =
                chunkName?.replace("themes-", "") ||
                assetInfo.originalFileNames
                  ?.find((name) => name.startsWith("src/themes/"))
                  ?.replace("src/themes/", "")
                  ?.replace(/\.(tsx|ts)$/, "");
              if (themeName) {
                return `themes/${themeName}/style.css`;
              }
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
