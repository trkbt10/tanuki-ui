#!/usr/bin/env node

/**
 * Theme Catalog Generator
 * Scans CSS files in public/styles and extracts metadata to generate theme catalog
 * Run: node scripts/generate-theme-catalog.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STYLES_DIR = path.join(__dirname, '../public/styles');
const OUTPUT_FILE = path.join(__dirname, '../tools/catalog/src/data/themes.ts');

/**
 * Parse CSS theme header metadata
 */
function parseThemeHeader(cssContent) {
  const headerMatch = cssContent.match(/\/\*\*([\s\S]*?)\*\//);
  if (!headerMatch) return {};

  const header = headerMatch[1];
  const metadata = {};

  // Extract @theme
  const themeMatch = header.match(/@theme\s+(.+)/);
  if (themeMatch) metadata.theme = themeMatch[1].trim();

  // Extract @description  
  const descMatch = header.match(/@description\s+(.+)/);
  if (descMatch) metadata.description = descMatch[1].trim();

  // Extract @author
  const authorMatch = header.match(/@author\s+(.+)/);
  if (authorMatch) metadata.author = authorMatch[1].trim();

  // Extract @version
  const versionMatch = header.match(/@version\s+(.+)/);
  if (versionMatch) metadata.version = versionMatch[1].trim();

  // Extract @category
  const categoryMatch = header.match(/@category\s+(.+)/);
  if (categoryMatch) metadata.category = categoryMatch[1].trim();

  return metadata;
}

/**
 * Generate theme value from filename
 */
function getThemeValue(filename) {
  return filename.replace('.css', '');
}

/**
 * Generate display label from theme name
 */
function getDisplayLabel(themeName, filename) {
  if (themeName) {
    // Add "(Default)" suffix for monotone theme
    return themeName === 'Monotone' ? `${themeName} (Default)` : themeName;
  }
  
  // Fallback: Convert filename to readable label
  return filename
    .replace('.css', '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Main function to generate theme catalog
 */
function generateThemeCatalog() {
  try {
    console.log('🎨 Generating theme catalog...');
    
    const files = fs.readdirSync(STYLES_DIR);
    const cssFiles = files.filter(file => file.endsWith('.css'));
    
    const themes = [];
    
    for (const filename of cssFiles) {
      try {
        const filePath = path.join(STYLES_DIR, filename);
        const content = fs.readFileSync(filePath, 'utf-8');
        const metadata = parseThemeHeader(content);
        
        const themeValue = getThemeValue(filename);
        const themeLabel = getDisplayLabel(metadata.theme || '', filename);
        
        themes.push({
          value: themeValue,
          label: themeLabel,
          file: `/tanuki-ui/styles/${filename}`,
          description: metadata.description || '',
          category: metadata.category || 'Other'
        });
        
        console.log(`  ✓ ${themeLabel} (${metadata.category || 'Other'})`);
      } catch (error) {
        console.warn(`  ⚠️  Failed to parse ${filename}:`, error.message);
      }
    }
    
    // Sort themes: Monotone first, then alphabetically
    themes.sort((a, b) => {
      if (a.value === 'monotone') return -1;
      if (b.value === 'monotone') return 1;
      return a.label.localeCompare(b.label);
    });
    
    // Generate TypeScript file
    const output = `// Auto-generated theme catalog
// Run: node scripts/generate-theme-catalog.js

export interface ThemeMetadata {
  value: string;
  label: string;
  file: string;
  description: string;
  category: string;
}

export const themes: ThemeMetadata[] = ${JSON.stringify(themes, null, 2)};

// Group themes by category
export function groupThemesByCategory(themes: ThemeMetadata[]): Record<string, ThemeMetadata[]> {
  const grouped: Record<string, ThemeMetadata[]> = {};
  
  for (const theme of themes) {
    const category = theme.category || 'Other';
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(theme);
  }
  
  return grouped;
}
`;

    // Ensure output directory exists
    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(OUTPUT_FILE, output);
    
    console.log(`\n✅ Generated theme catalog with ${themes.length} themes`);
    console.log(`📝 Output: ${OUTPUT_FILE}`);
    
    // Group by category for summary
    const categories = {};
    themes.forEach(theme => {
      const cat = theme.category || 'Other';
      categories[cat] = (categories[cat] || 0) + 1;
    });
    
    console.log('\n📊 Categories:');
    Object.entries(categories)
      .sort(([,a], [,b]) => b - a)
      .forEach(([category, count]) => {
        console.log(`  ${category}: ${count} theme${count !== 1 ? 's' : ''}`);
      });
      
  } catch (error) {
    console.error('❌ Failed to generate theme catalog:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateThemeCatalog();
}

export { generateThemeCatalog };