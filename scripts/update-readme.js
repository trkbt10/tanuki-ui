#!/usr/bin/env node

/**
 * README.md自動更新スクリプト
 * テーマファイル数、ビルドサイズなどの動的情報を自動的にREADME.mdに反映します
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// パッケージ情報を取得
const packageJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));

// テーマファイルを取得
function getThemeFiles() {
  const stylesDir = path.join(rootDir, 'public/styles');
  return fs.readdirSync(stylesDir)
    .filter(file => file.endsWith('.css'))
    .sort();
}

// ビルドサイズ情報を取得
function getBuildSizes(skipBuild = false) {
  try {
    if (skipBuild) {
      // 既存のビルドファイルがあるかチェック
      const distPath = path.join(rootDir, 'dist/lib');
      if (!fs.existsSync(distPath)) {
        console.log('ビルドファイルが存在しないため、ビルドを実行します...');
        skipBuild = false;
      }
    }
    
    if (!skipBuild) {
      // ビルドを実行
      console.log('ビルドを実行中...');
      const buildOutput = execSync('npm run build', { 
        cwd: rootDir, 
        encoding: 'utf8',
        stdio: 'pipe'
      });
      
      // ビルド出力からサイズ情報を抽出
      const lines = buildOutput.split('\n');
      const sizeInfo = {};
      
      for (const line of lines) {
        if (line.includes('dist/lib/')) {
          const match = line.match(/dist\/lib\/(.+?)\s+(.+?)\s+│\s+gzip:\s+(.+?)\s/);
          if (match) {
            const [, filename, size, gzipSize] = match;
            sizeInfo[filename] = { size, gzipSize };
          }
        }
      }
      
      return sizeInfo;
    } else {
      // 既存のファイルサイズを概算
      const distPath = path.join(rootDir, 'dist/lib');
      const sizeInfo = {};
      
      const files = [
        'index.js',
        'style.css',
        'layouts.js',
        'layouts/style.css',
        'extended/node-editor.js',
        'extended/node-editor/style.css'
      ];
      
      for (const file of files) {
        const filePath = path.join(distPath, file);
        if (fs.existsSync(filePath)) {
          const stats = fs.statSync(filePath);
          const sizeKB = (stats.size / 1024).toFixed(1) + 'KB';
          const gzipSizeKB = (stats.size / 1024 * 0.3).toFixed(1) + 'KB'; // 概算
          sizeInfo[file] = { size: sizeKB, gzipSize: gzipSizeKB };
        }
      }
      
      return sizeInfo;
    }
  } catch (error) {
    console.warn('ビルドサイズの取得に失敗しました:', error.message);
    return {};
  }
}

// テーマリストを生成（スキーマベース）
async function generateThemeList() {
  try {
    // 生成されたテーマカタログから取得（ファイル内容を直接読み込み）
    const themeDataPath = path.join(rootDir, 'tools/catalog/src/data/themes.ts');
    
    // ファイルが存在するかチェック
    if (!fs.existsSync(themeDataPath)) {
      throw new Error('Theme catalog file not found');
    }
    
    // ファイル内容を読み込み、themesデータを抽出
    const fileContent = fs.readFileSync(themeDataPath, 'utf8');
    
    // themes配列の部分を正規表現で抽出
    const themesMatch = fileContent.match(/export const themes: ThemeMetadata\[\] = (\[[\s\S]*?\]);/);
    if (!themesMatch) {
      throw new Error('Could not extract themes data from file');
    }
    
    // JSON.parseで配列をパース
    const themes = JSON.parse(themesMatch[1]);
    
    // groupThemesByCategory 関数を実装
    const groupThemesByCategory = (themes) => {
      const grouped = {};
      for (const theme of themes) {
        const category = theme.category || 'Other';
        if (!grouped[category]) {
          grouped[category] = [];
        }
        grouped[category].push(theme);
      }
      return grouped;
    };
    
    const themesByCategory = groupThemesByCategory(themes);

    let themeListMarkdown = '';
    
    // カテゴリ順を調整（人気順/使用頻度順）
    const categoryOrder = [
      'Accessibility',
      'Modern', 
      'Developer',
      'Apple',
      'Google', 
      'Microsoft',
      'Retro',
      'Gaming',
      'Design',
      'Enterprise',
      'Productivity',
      'AI',
      'Media',
      'Other'
    ];

    // カテゴリをソートして表示
    const sortedCategories = Object.keys(themesByCategory).sort((a, b) => {
      const indexA = categoryOrder.indexOf(a);
      const indexB = categoryOrder.indexOf(b);
      if (indexA === -1 && indexB === -1) return a.localeCompare(b);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });

    sortedCategories.forEach(category => {
      const categoryThemes = themesByCategory[category];
      themeListMarkdown += `**${category}**\n`;
      
      // テーマをソート（monotoneを最初に、その後はアルファベット順）
      const sortedThemes = categoryThemes.sort((a, b) => {
        if (a.value === 'monotone') return -1;
        if (b.value === 'monotone') return 1;
        return a.label.localeCompare(b.label);
      });
      
      sortedThemes.forEach(theme => {
        const filename = `${theme.value}.css`;
        themeListMarkdown += `- **${theme.label}** (\`${filename}\`) - ${theme.description}\n`;
      });
      themeListMarkdown += '\n';
    });

    return themeListMarkdown.trim();
  } catch (error) {
    console.warn('テーマカタログの読み込みに失敗しました。フォールバックを使用します:', error.message);
    
    // フォールバック: ファイルシステムから直接読み取り
    const themeFiles = getThemeFiles();
    const fallbackCategories = {
      'Accessibility': [],
      'Modern & Developer': [],
      'Platform Themes': [],
      'Retro & Gaming': [],
      'Others': []
    };
    
    themeFiles.forEach(file => {
      const themeName = file.replace('.css', '');
      const displayName = themeName.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      
      let category = 'Others';
      if (themeName === 'monotone') category = 'Accessibility';
      else if (['vercel', 'linear', 'openai', 'github-dark', 'figma', 'aws'].includes(themeName)) category = 'Modern & Developer';
      else if (['macos12', 'ios12', 'windows11', 'android12', 'youtube'].includes(themeName)) category = 'Platform Themes';
      else if (['windows98', 'windows-xp', 'handheld-console', '8bit-gameconsole-rpg'].includes(themeName)) category = 'Retro & Gaming';
      
      fallbackCategories[category].push({ 
        file, 
        name: displayName,
        description: `${displayName} theme`
      });
    });

    let themeListMarkdown = '';
    Object.entries(fallbackCategories).forEach(([category, themes]) => {
      if (themes.length > 0) {
        themeListMarkdown += `**${category}**\n`;
        themes.forEach(theme => {
          themeListMarkdown += `- **${theme.name}** (\`${theme.file}\`) - ${theme.description}\n`;
        });
        themeListMarkdown += '\n';
      }
    });

    return themeListMarkdown.trim();
  }
}

// ビルドサイズテーブルを生成
function generateBundleSizeTable(buildSizes) {
  if (Object.keys(buildSizes).length === 0) {
    return `| Package | Size (minified + gzipped) |
|---------|---------------------------|
| Core Components | 23.5KB |
| Core CSS | 9.9KB |
| Layouts | 12.6KB |
| Layouts CSS | 2.5KB |
| Node Editor | 49.5KB |
| Node Editor CSS | 6.9KB |
| Themes (each) | ~3-5KB |`;
  }

  let table = `| Package | Size (minified + gzipped) |\n|---------|---------------------------|\n`;
  
  if (buildSizes['index.js']) {
    table += `| Core Components | ${buildSizes['index.js'].gzipSize} |\n`;
  }
  if (buildSizes['style.css']) {
    table += `| Core CSS | ${buildSizes['style.css'].gzipSize} |\n`;
  }
  if (buildSizes['layouts.js']) {
    table += `| Layouts | ${buildSizes['layouts.js'].gzipSize} |\n`;
  }
  if (buildSizes['layouts/style.css']) {
    table += `| Layouts CSS | ${buildSizes['layouts/style.css'].gzipSize} |\n`;
  }
  if (buildSizes['extended/node-editor.js']) {
    table += `| Node Editor | ${buildSizes['extended/node-editor.js'].gzipSize} |\n`;
  }
  if (buildSizes['extended/node-editor/style.css']) {
    table += `| Node Editor CSS | ${buildSizes['extended/node-editor/style.css'].gzipSize} |\n`;
  }
  
  table += `| Themes (each) | ~3-5KB |`;
  
  return table;
}

// README.mdを更新
async function updateReadme() {
  await updateReadmeFile('README.md');
  await updateReadmeFile('README.ja.md');
}

// 個別のREADMEファイルを更新
async function updateReadmeFile(filename) {
  const readmePath = path.join(rootDir, filename);
  
  // ファイルが存在しない場合はスキップ
  if (!fs.existsSync(readmePath)) {
    console.log(`⚠️  ${filename} が見つかりません。スキップします。`);
    return;
  }
  
  let readmeContent = fs.readFileSync(readmePath, 'utf8');
  
  // データを取得
  const themeFiles = getThemeFiles();
  const buildSizes = getBuildSizes(true); // 初回は既存ビルドを使用
  const themeCount = themeFiles.length;
  
  // 言語判定
  const isJapanese = filename.includes('.ja.');
  const availableThemesPattern = isJapanese 
    ? /### 利用可能なテーマ \(\d+ 種類\)/g
    : /### Available Themes \(\d+ total\)/g;
  const availableThemesReplacement = isJapanese
    ? `### 利用可能なテーマ (${themeCount} 種類)`
    : `### Available Themes (${themeCount} total)`;
  
  console.log(`📝 ${filename} を更新中...`);
  console.log(`   - テーマ数: ${themeCount}`);
  
  // 🎨 Themes は固定値なので更新しない（手動管理）
  
  // Available Themes セクションのテーマ数を更新
  readmeContent = readmeContent.replace(
    availableThemesPattern,
    availableThemesReplacement
  );
  
  // Bundle Size table内のCore Componentsサイズを更新
  if (buildSizes['index.js']) {
    readmeContent = readmeContent.replace(
      /\| \*\*?Core Components\*\*? \| [\d.]+[KM]B \|/g,
      `| Core Components | ${buildSizes['index.js'].gzipSize} |`
    );
    readmeContent = readmeContent.replace(
      /\| \*\*?コアコンポーネント\*\*? \| [\d.]+[KM]B \|/g,
      `| コアコンポーネント | ${buildSizes['index.js'].gzipSize} |`
    );
  }
  
  // Bundle Size セクション全体を更新（重複削除）
  const bundleSizeTableRegex = /## 📦 Bundle Size[\s\S]*?\n\n(?=##)/;
  const bundleSizeTableRegex2 = /## Bundle Size[\s\S]*?\n\n(?=##|$)/;
  
  const bundleSizeSection = isJapanese ? `## 📦 バンドルサイズ

React UI ライブラリの中でも最軽量級：

${generateBundleSizeTable(buildSizes)}

> 💡 必要な分だけインポートすることで、さらに軽量化できます！

` : `## 📦 Bundle Size

One of the lightest React UI libraries available:

${generateBundleSizeTable(buildSizes)}

> 💡 Import only what you need to make it even smaller!

`;
  
  // Bundle Sizeセクションの重複を削除
  readmeContent = readmeContent.replace(bundleSizeTableRegex, bundleSizeSection);
  readmeContent = readmeContent.replace(bundleSizeTableRegex2, ''); // 2つ目があれば削除
  
  // テーマリストを更新
  const themeListRegex = isJapanese 
    ? /### 利用可能なテーマ \(\d+ 種類\)\s*\n([\s\S]*?)(?=\n## )/
    : /### Available Themes \(\d+ total\)\s*\n([\s\S]*?)(?=\n## )/;
  const themeList = await generateThemeList();
  const newThemeSection = `${availableThemesReplacement}

${themeList}

`;
  
  readmeContent = readmeContent.replace(themeListRegex, newThemeSection);
  
  // ファイルを書き込み
  fs.writeFileSync(readmePath, readmeContent, 'utf8');
  
  console.log(`✅ ${filename} が正常に更新されました`);
  if (buildSizes['index.js']) {
    console.log(`   - コアコンポーネントサイズ: ${buildSizes['index.js'].gzipSize}`);
  }
}

// メイン実行
if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    await updateReadme();
    console.log('\n🎉 すべてのREADMEファイルの更新が完了しました！');
  } catch (error) {
    console.error('❌ README の更新に失敗しました:', error.message);
    process.exit(1);
  }
}

export { updateReadme, updateReadmeFile, getThemeFiles, getBuildSizes };