#!/usr/bin/env node

import { spawn } from "child_process";
import { promises as fs } from "fs";
import path from "path";
import { entryPoints, getEntryOutputDir, getEntryTypesDir } from "../../build.config";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const projectRoot = path.resolve(__dirname, "../..");

interface BuildOptions {
  entries: string[];
  parallel: boolean;
  merge: boolean;
  cleanup: boolean;
  configFile: string;
}

function showHelp() {
  console.log(`
Usage: bun tools/build/build.ts [options] [entries...]

Options:
  --help, -h           Show this help message
  --list, -l           List available entry points
  --all, -a            Build all entry points (default if no entries specified)
  --sequential, -s     Build entries sequentially instead of in parallel
  --merge, -m          Merge individual builds into dist/lib after building
  --no-cleanup         Don't cleanup individual build directories after merge
  --config <file>      Use specific config file (default: vite.build.config.ts)

Examples:
  # Build all entries in parallel (default)
  bun tools/build/build.ts

  # Build specific entries
  bun tools/build/build.ts extended/node-editor extended/panel

  # Build all sequentially and merge
  bun tools/build/build.ts --all --sequential --merge

  # Build specific entries and merge into dist/lib
  bun tools/build/build.ts --merge layouts themes/LiquidGlassFilter

Available entries:
${Object.entries(entryPoints)
  .map(([key, config]) => `  ${key.padEnd(35)} - ${config.description}`)
  .join("\n")}
`);
}

function listEntries() {
  console.log("Available entry points:");
  Object.entries(entryPoints).forEach(([key, config]) => {
    console.log(`  ${key.padEnd(35)} - ${config.description}`);
  });
}

function validateEntries(entries: string[]): string[] {
  const invalid = entries.filter((entry) => !(entry in entryPoints));
  if (invalid.length > 0) {
    console.error(`Error: Invalid entry points: ${invalid.join(", ")}`);
    console.error("Use --list to see available entries");
    process.exit(1);
  }
  return entries;
}

function runBuildForEntry(entryKey: string, configFile: string, useIndividualDirs: boolean): Promise<void> {
  return new Promise((resolve, reject) => {
    const env = {
      ...process.env,
      BUILD_ENTRIES: entryKey,
      USE_INDIVIDUAL_DIRS: useIndividualDirs ? "true" : "false",
    };

    const args = ["run", "build", "--", "--config", configFile];

    console.log(`🔧 Building ${entryKey}...`);

    const child = spawn("bun", args, {
      env,
      stdio: "pipe", // 常にpipeを使用してCI環境での問題を回避
      cwd: projectRoot,
    });

    let stdout = "";
    let stderr = "";

    child.stdout?.on("data", (data) => {
      const output = data.toString();
      stdout += output;
      if (!useIndividualDirs) {
        process.stdout.write(output); // 単体ビルドの場合はリアルタイム出力
      }
    });

    child.stderr?.on("data", (data) => {
      const output = data.toString();
      stderr += output;
      if (!useIndividualDirs) {
        process.stderr.write(output); // 単体ビルドの場合はリアルタイム出力
      }
    });

    child.on("exit", (code) => {
      if (code === 0) {
        console.log(`✅ ${entryKey} built successfully`);
        resolve();
      } else {
        console.error(`❌ ${entryKey} build failed (exit code: ${code})`);
        if (stderr) console.error(`Error output: ${stderr}`);
        if (stdout && useIndividualDirs) console.log(`Build output: ${stdout}`);
        reject(new Error(`Build failed for ${entryKey}`));
      }
    });

    child.on("error", (error) => {
      console.error(`❌ Failed to start build for ${entryKey}:`, error);
      reject(error);
    });
  });
}

async function buildEntries(options: BuildOptions): Promise<void> {
  const { entries, parallel, configFile, merge } = options;
  const useIndividualDirs = merge;

  console.log(`🚀 Building ${entries.length} entry point(s) ${parallel ? "in parallel" : "sequentially"}...`);
  console.log(`Entries: ${entries.join(", ")}`);

  if (merge) {
    console.log(`📦 Using individual directories for later merge`);
  }

  const startTime = Date.now();

  try {
    if (parallel && entries.length > 1) {
      // 並列実行
      await Promise.all(entries.map((entry) => runBuildForEntry(entry, configFile, useIndividualDirs)));
    } else {
      // 順次実行
      for (const entry of entries) {
        await runBuildForEntry(entry, configFile, useIndividualDirs);
      }
    }

    const duration = Math.round((Date.now() - startTime) / 1000);
    console.log(`✅ Build completed successfully in ${duration}s`);
  } catch (error) {
    console.error("💥 Build failed:", error);
    process.exit(1);
  }
}

async function mergeBuilds(entries: string[]): Promise<void> {
  console.log("📦 Merging builds into dist/lib...");

  const distDir = path.join(projectRoot, "dist");
  const libDir = path.join(distDir, "lib");
  const typesDir = path.join(distDir, "types");

  // 出力ディレクトリを作成
  await fs.mkdir(libDir, { recursive: true });
  await fs.mkdir(typesDir, { recursive: true });

  // 各エントリーの出力をマージ
  for (const entryKey of entries) {
    const entryLibDir = path.join(projectRoot, getEntryOutputDir(entryKey));
    const entryTypesDir = path.join(projectRoot, getEntryTypesDir(entryKey));

    try {
      // ディレクトリの存在確認
      try {
        await fs.access(entryLibDir);
      } catch {
        console.warn(`⚠️  Skipping ${entryKey}: build directory ${entryLibDir} does not exist`);
        continue;
      }

      // JSファイルをコピー（フォルダ構造を維持）
      const copyLibFilesRecursively = async (srcDir: string, destDir: string) => {
        const items = await fs.readdir(srcDir, { withFileTypes: true });
        for (const item of items) {
          const srcPath = path.join(srcDir, item.name);
          const destPath = path.join(destDir, item.name);

          if (item.isDirectory()) {
            await fs.mkdir(destPath, { recursive: true });
            await copyLibFilesRecursively(srcPath, destPath);
          } else if (item.name.endsWith(".js") || item.name.endsWith(".cjs") || item.name.endsWith(".css")) {
            await fs.copyFile(srcPath, destPath);
            //            console.log(`📄 Copied ${path.relative(projectRoot, destPath)}`);
          }
        }
      };

      await copyLibFilesRecursively(entryLibDir, libDir);

      // 型定義ファイルをコピー
      const copyTypesRecursively = async (srcDir: string, destDir: string) => {
        const items = await fs.readdir(srcDir, { withFileTypes: true });
        for (const item of items) {
          const srcPath = path.join(srcDir, item.name);
          const destPath = path.join(destDir, item.name);

          if (item.isDirectory()) {
            await fs.mkdir(destPath, { recursive: true });
            await copyTypesRecursively(srcPath, destPath);
          } else if (item.name.endsWith(".d.ts")) {
            await fs.copyFile(srcPath, destPath);
            //              console.log(`📝 Copied type ${path.relative(projectRoot, destPath)}`);
          }
        }
      };

      // 型定義ディレクトリの存在確認
      try {
        await fs.access(entryTypesDir);
        await copyTypesRecursively(entryTypesDir, typesDir);
      } catch {
        console.warn(`⚠️  No types directory for ${entryKey}: ${entryTypesDir}`);
      }
    } catch (error) {
      console.warn(`⚠️  Could not process ${entryKey}: ${error}`);
    }
  }
}

async function cleanupIndividualBuilds(): Promise<void> {
  console.log("🧹 Cleaning up individual build directories...");

  try {
    await fs.rm(path.join(projectRoot, "dist/entries"), { recursive: true, force: true });
    await fs.rm(path.join(projectRoot, "dist/types-entries"), { recursive: true, force: true });
    console.log("✅ Cleanup completed");
  } catch (error) {
    console.warn("⚠️  Cleanup failed:", error);
  }
}

async function main() {
  const args = process.argv.slice(2);

  const options: BuildOptions = {
    entries: [],
    parallel: true,
    merge: false,
    cleanup: true,
    configFile: "vite.build.config.ts",
  };

  // Parse command line arguments
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case "--help":
      case "-h":
        showHelp();
        process.exit(0);
        break;

      case "--list":
      case "-l":
        listEntries();
        process.exit(0);
        break;

      case "--all":
      case "-a":
        options.entries = Object.keys(entryPoints);
        break;

      case "--sequential":
      case "-s":
        options.parallel = false;
        break;

      case "--merge":
      case "-m":
        options.merge = true;
        break;

      case "--no-cleanup":
        options.cleanup = false;
        break;

      case "--config":
        if (i + 1 >= args.length) {
          console.error("Error: --config requires a file path");
          process.exit(1);
        }
        options.configFile = args[++i];
        break;

      default:
        if (arg.startsWith("--")) {
          console.error(`Error: Unknown option ${arg}`);
          process.exit(1);
        }
        options.entries.push(arg);
        break;
    }
  }

  // Default to all entries if none specified
  if (options.entries.length === 0) {
    options.entries = Object.keys(entryPoints);
  }

  validateEntries(options.entries);

  const startTime = Date.now();

  try {
    await buildEntries(options);

    if (options.merge) {
      await mergeBuilds(options.entries);

      if (options.cleanup) {
        await cleanupIndividualBuilds();
      }
    }

    const totalDuration = Math.round((Date.now() - startTime) / 1000);
    console.log(`🎉 All operations completed successfully in ${totalDuration}s`);
  } catch (error) {
    console.error("💥 Operation failed:", error);
    process.exit(1);
  }
}

// エラーハンドリングを追加
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

main();
