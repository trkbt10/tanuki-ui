import { mergeConfig } from "vite";
import { createCommonConfig } from "./vite.common.config";
import { entryPoints, testConfig } from "./build.config";

// デフォルトは全てのエントリーポイントをビルド
const entryPaths = Object.fromEntries(Object.entries(entryPoints).map(([key, config]) => [key, config.path]));
const defaultConfig = createCommonConfig(entryPaths);

export default mergeConfig(defaultConfig, testConfig);
