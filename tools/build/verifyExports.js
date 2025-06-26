#!/usr/bin/env node

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// プロジェクトルートを取得
const projectRoot = resolve(__dirname, '../../');
const packageJsonPath = resolve(projectRoot, 'package.json');

console.log('🔍 Verifying package.json exports...\n');

// package.jsonを読み込み
if (!existsSync(packageJsonPath)) {
  console.error('❌ package.json not found');
  process.exit(1);
}

const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
let hasErrors = false;

// メイン設定を検証
const mainFields = ['main', 'module', 'require', 'types'];
console.log('📦 Verifying main entry points:');

mainFields.forEach(field => {
  if (packageJson[field]) {
    const filePath = resolve(projectRoot, packageJson[field]);
    const exists = existsSync(filePath);
    const status = exists ? '✅' : '❌';
    console.log(`  ${status} ${field}: ${packageJson[field]}`);
    if (!exists) hasErrors = true;
  }
});

console.log('\n📂 Verifying exports configuration:');

// exports設定を検証
if (packageJson.exports) {
  for (const [exportKey, exportValue] of Object.entries(packageJson.exports)) {
    console.log(`\n  Export: "${exportKey}"`);
    
    if (typeof exportValue === 'string') {
      // 文字列の場合（CSSファイルなど）
      if (exportValue.includes('*')) {
        // ワイルドカードパターンの場合はディレクトリの存在確認
        const dirPath = exportValue.replace('/*.css', '').replace('/*', '').replace('*', '');
        const fullDirPath = resolve(projectRoot, dirPath);
        const exists = existsSync(fullDirPath);
        const status = exists ? '✅' : '❌';
        console.log(`    ${status} ${exportValue} (wildcard pattern - checking directory: ${dirPath})`);
        if (!exists) hasErrors = true;
      } else {
        // 通常のファイルパス
        const filePath = resolve(projectRoot, exportValue);
        const exists = existsSync(filePath);
        const status = exists ? '✅' : '❌';
        console.log(`    ${status} ${exportValue}`);
        if (!exists) hasErrors = true;
      }
    } else if (typeof exportValue === 'object') {
      // オブジェクトの場合（条件付きエクスポート）
      for (const [condition, conditionValue] of Object.entries(exportValue)) {
        if (typeof conditionValue === 'string') {
          const filePath = resolve(projectRoot, conditionValue);
          const exists = existsSync(filePath);
          const status = exists ? '✅' : '❌';
          console.log(`    ${status} ${condition}: ${conditionValue}`);
          if (!exists) hasErrors = true;
        }
      }
    }
  }
} else {
  console.log('  ⚠️  No exports configuration found');
}

// typesVersions設定を検証
if (packageJson.typesVersions) {
  console.log('\n🏷️  Verifying typesVersions configuration:');
  
  for (const [version, versionConfig] of Object.entries(packageJson.typesVersions)) {
    console.log(`\n  TypeScript version: ${version}`);
    
    if (versionConfig && typeof versionConfig === 'object') {
      for (const [pattern, paths] of Object.entries(versionConfig)) {
        console.log(`    Pattern: "${pattern}"`);
        
        if (Array.isArray(paths)) {
          paths.forEach(path => {
            const filePath = resolve(projectRoot, path);
            const exists = existsSync(filePath);
            const status = exists ? '✅' : '❌';
            console.log(`      ${status} ${path}`);
            if (!exists) hasErrors = true;
          });
        }
      }
    }
  }
}

// 結果の出力
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.log('❌ Export verification failed! Some files are missing.');
  console.log('💡 Make sure to build the project before publishing.');
  process.exit(1);
} else {
  console.log('✅ All exports verified successfully!');
  console.log('🎉 Package is ready for publishing.');
}