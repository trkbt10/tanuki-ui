import path from "node:path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const entryRoot = path.resolve(__dirname, "src");

export interface EntryPointConfig {
  path: string;
  description: string;
  dependencies?: string[];
}

export const entryPoints: Record<string, EntryPointConfig> = {
  index: {
    path: path.resolve(entryRoot, "index.tsx"),
    description: "Main library entry point",
  },
  layouts: {
    path: path.resolve(entryRoot, "layouts/index.tsx"),
    description: "Layout components",
  },
  "extended/panel": {
    path: path.resolve(entryRoot, "extended/panel/index.ts"),
    description: "Extended panel module",
  },
  "extended/node-editor": {
    path: path.resolve(entryRoot, "extended/node-editor/index.ts"),
    description: "Node editor module",
  },
  "themes/LiquidGlassFilter": {
    path: path.resolve(entryRoot, "themes/LiquidGlassFilter.tsx"),
    description: "Liquid glass theme",
  },
};

export const buildConfig = {
  outDir: "dist/lib",
  typesDir: "dist/types",
  formats: ["es", "cjs"] as const,
  external: ["react", "react-dom", "react/jsx-runtime"],
  globals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
};

// 個別ビルド用の出力ディレクトリ生成（ディレクトリ構造を維持）
export const getEntryOutputDir = (entryKey: string) => {
  return `dist/entries/${entryKey}`;
};

export const getEntryTypesDir = (entryKey: string) => {
  return `dist/types-entries/${entryKey}`;
};

export const testConfig = {
  test: {
    globals: true,
  },
};

export { entryRoot };
