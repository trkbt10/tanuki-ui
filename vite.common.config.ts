import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import dts from "vite-plugin-dts";
import { generateShortClassName } from "./tools/build/css-modules";
import { entryPoints, entryRoot, buildConfig, getEntryOutputDir, getEntryTypesDir } from "./build.config";

export const createCommonConfig = (selectedEntries: Record<string, string> | string[], useIndividualDirs: boolean = false) => {
  const entryConfig = Array.isArray(selectedEntries)
    ? selectedEntries.reduce((acc, key) => {
        const entryPoint = entryPoints[key];
        if (entryPoint) {
          acc[key] = entryPoint.path;
        }
        return acc;
      }, {} as Record<string, string>)
    : selectedEntries;

  // 個別ディレクトリの場合は単一エントリーポイントのみ対応
  const isIndividualBuild = useIndividualDirs && Array.isArray(selectedEntries) && selectedEntries.length === 1;
  const singleEntryKey = isIndividualBuild ? selectedEntries[0] : null;

  return defineConfig({
    build: {
      copyPublicDir: false,
      outDir: isIndividualBuild ? getEntryOutputDir(singleEntryKey!) : buildConfig.outDir,
      cssCodeSplit: true,
      lib: {
        entry: entryConfig,
        formats: buildConfig.formats as ["es", "cjs"],
      },

      rollupOptions: {
        external: buildConfig.external,
        output: [
          {
            format: "es",
            chunkFileNames: "vendor/[name]-[hash].js",
            globals: buildConfig.globals,
            entryFileNames: (chunkInfo) => {
              const entryName = chunkInfo.name;
              return `${entryName}.js`;
            },
          },
          {
            format: "cjs",
            chunkFileNames: "vendor/[name]-[hash].js",
            globals: buildConfig.globals,
            entryFileNames: (chunkInfo) => {
              const entryName = chunkInfo.name;
              return `${entryName}.cjs`;
            },
          },
        ],
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
        outDir: isIndividualBuild ? getEntryTypesDir(singleEntryKey!) : buildConfig.typesDir,
        include: ["src/**/*.{ts,tsx}"],
        exclude: ["src/**/*.stories.tsx"],
      }),
    ],
  });
};

export { entryRoot };
