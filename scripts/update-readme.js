#!/usr/bin/env node

/**
 * README.md自動更新スクリプト
 * テーマファイル数、ビルドサイズなどの動的情報を自動的にREADME.mdに反映します
 */

import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';
import { gzipSync } from 'zlib';

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

// ファイルベースのサイズ取得
function getFileBasedSizes() {
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
      const content = fs.readFileSync(filePath);
      const stats = fs.statSync(filePath);
      const gzipped = gzipSync(content);
      const sizeKB = (stats.size / 1024).toFixed(1) + 'KB';
      const gzipSizeKB = (gzipped.length / 1024).toFixed(1) + 'KB';
      sizeInfo[file] = { size: sizeKB, gzipSize: gzipSizeKB };
    }
  }
  
  return sizeInfo;
}

// ビルドサイズ情報を取得
function getBuildSizes(skipBuild = false) {
  // 既存のビルドファイルがある場合は早期リターン
  if (skipBuild) {
    const distPath = path.join(rootDir, 'dist/lib');
    if (fs.existsSync(distPath)) {
      return getFileBasedSizes();
    }
    console.log('Build files not found, executing build...');
  }
  
  // Execute build
  console.log('Building...');
  const npmPath = process.env.npm_execpath || 'npm';
  execFileSync(npmPath, ['run', 'build'], { 
    cwd: rootDir, 
    stdio: 'inherit',
    env: process.env,
    timeout: 120000 // 2 minute timeout
  });
  console.log('Build completed.');
  
  // Get file sizes after build completion
  return getFileBasedSizes();
}

// テーマリストを生成（スキーマベース）
async function generateThemeList() {
  // 1. Run theme catalog generator to create latest themes.ts
  console.log('Generating theme catalog...');
  try {
    const catalogPath = process.env.npm_execpath || 'npm';
    execFileSync('node', ['scripts/generate-theme-catalog.js'], { 
      cwd: rootDir, 
      stdio: 'pipe',
      timeout: 30000
    });
  } catch (error) {
    throw new Error(`Theme catalog generation failed: ${error.message}`);
  }
  
  // 2. Safely load data from generated themes.ts file
  const themeDataPath = path.join(rootDir, 'tools/catalog/src/data/themes.ts');
  
  if (!fs.existsSync(themeDataPath)) {
    throw new Error('Theme catalog file not found after generation');
  }
  
  // 3. Convert themes.ts to temporary JS file and load with dynamic import
  const tempJsPath = path.join(rootDir, 'temp-themes.mjs');
  try {
    const fileContent = fs.readFileSync(themeDataPath, 'utf8');
    
    // Remove TypeScript type annotations and convert to JavaScript
    const jsContent = fileContent
      .replace(/export interface ThemeMetadata \{[\s\S]*?\}/g, '')
      .replace(/: ThemeMetadata\[\]/g, '')
      .replace(/: Record<string, ThemeMetadata\[\]>/g, '');
    
    fs.writeFileSync(tempJsPath, jsContent);
    
    // Safely load data with dynamic import
    const themeModule = await import(`file://${tempJsPath}`);
    const themes = themeModule.themes;
    
    if (!Array.isArray(themes)) {
      throw new Error('Invalid themes data structure');
    }
    
    // 4. Validate theme data
    for (const theme of themes) {
      if (!theme.value || !theme.label || !theme.category) {
        throw new Error(`Invalid theme data: ${JSON.stringify(theme)}`);
      }
    }
    
    // 5. Group by category
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
    
    // Adjust category order (by popularity/usage frequency)
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

    // Sort and display categories
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
      
      // Sort themes (monotone first, then alphabetical)
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
    
  } finally {
    // 6. Clean up temporary files
    if (fs.existsSync(tempJsPath)) {
      fs.unlinkSync(tempJsPath);
    }
  }
}

// ビルドサイズテーブルを生成
function generateBundleSizeTable(buildSizes) {
  if (Object.keys(buildSizes).length === 0) {
    throw new Error('Build sizes not available');
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
  console.log('📊 Collecting statistics data...');
  
  // 1. Collect statistics data once
  const themeFiles = getThemeFiles();
  const themeCount = themeFiles.length;
  console.log(`   - Theme count: ${themeCount}`);
  
  const buildSizes = getBuildSizes(true); // Use existing build, build if not found
  console.log(`   - Build sizes collected`);
  
  const themeList = await generateThemeList();
  console.log(`   - Theme list generated`);
  
  const statsData = {
    themeFiles,
    themeCount,
    buildSizes,
    themeList
  };
  
  // 2. Update each file with statistics data
  await updateReadmeFile('README.md', statsData);
  await updateReadmeFile('README.ja.md', statsData);
}

// 個別のREADMEファイルを更新
async function updateReadmeFile(filename, statsData) {
  const readmePath = path.join(rootDir, filename);
  
  // Skip if file doesn't exist
  if (!fs.existsSync(readmePath)) {
    console.log(`⚠️  ${filename} not found. Skipping.`);
    return;
  }
  
  let readmeContent = fs.readFileSync(readmePath, 'utf8');
  
  // Extract statistics data
  const { themeFiles, themeCount, buildSizes, themeList } = statsData;
  
  // Detect language
  const isJapanese = filename.includes('.ja.');
  const availableThemesPattern = isJapanese 
    ? /### 利用可能なテーマ \(\d+ 種類\)/g
    : /### Available Themes \(\d+ total\)/g;
  const availableThemesReplacement = isJapanese
    ? `### 利用可能なテーマ (${themeCount} 種類)`
    : `### Available Themes (${themeCount} total)`;
  
  console.log(`📝 Updating ${filename}...`);
  
  // Update theme count in Available Themes section
  readmeContent = readmeContent.replace(
    availableThemesPattern,
    availableThemesReplacement
  );
  
  // Update Core Components size in Bundle Size table
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
  
  // Update entire Bundle Size section (remove duplicates)
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
  
  // Remove duplicate Bundle Size sections
  readmeContent = readmeContent.replace(bundleSizeTableRegex, bundleSizeSection);
  readmeContent = readmeContent.replace(bundleSizeTableRegex2, ''); // 2つ目があれば削除
  
  // Update theme list
  const themeListRegex = isJapanese 
    ? /### 利用可能なテーマ \(\d+ 種類\)\s*\n([\s\S]*?)(?=\n## )/
    : /### Available Themes \(\d+ total\)\s*\n([\s\S]*?)(?=\n## )/;
  const newThemeSection = `${availableThemesReplacement}

${themeList}

`;
  
  readmeContent = readmeContent.replace(themeListRegex, newThemeSection);
  
  // Write file
  fs.writeFileSync(readmePath, readmeContent, 'utf8');
  
  console.log(`✅ ${filename} updated successfully`);
  if (buildSizes['index.js']) {
    console.log(`   - Core component size: ${buildSizes['index.js'].gzipSize}`);
  }
}

// Main execution
if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    await updateReadme();
    console.log('\n🎉 All README files updated successfully!');
  } catch (error) {
    console.error('❌ Failed to update README:', error.message);
    process.exit(1);
  }
}

export { updateReadme, updateReadmeFile, getThemeFiles, getBuildSizes };