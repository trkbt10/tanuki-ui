import { mergeConfig } from "vite";
import { createCommonConfig } from "./vite.common.config";
import { entryPoints, testConfig } from "./build.config";

// 環境変数からエントリーポイントを選択
const buildEntries = process.env.BUILD_ENTRIES?.split(',') || Object.keys(entryPoints);
const useIndividualDirs = process.env.USE_INDIVIDUAL_DIRS === 'true';

const defaultConfig = createCommonConfig(buildEntries, useIndividualDirs);

export default mergeConfig(defaultConfig, testConfig);