import * as fs from 'fs';
import * as path from 'path';
import { themes, type ThemeMetadata } from '../catalog/src/data/themes.js';

// Re-export ThemeMetadata from the central catalog data
export type { ThemeMetadata };

// Load themes from the central catalog
let cachedThemes: ThemeMetadata[] | null = null;

function getThemes(): ThemeMetadata[] {
  if (cachedThemes) return cachedThemes;
  
  try {
    cachedThemes = themes;
    return themes;
  } catch (error) {
    console.warn('Could not load themes from catalog, using fallback');
    // Fallback for environments where the catalog is not available
    return getFallbackThemes();
  }
}

function getFallbackThemes(): ThemeMetadata[] {
  const fallbackThemeNames = [
    'monotone', 'material-design', 'apple-liquid-glass', 'aws', 'figma',
    'github-dark', 'handheld-console', 'ios12', 'linear', 'macOS12', 'naver-line',
    'openai', 'vercel', 'windows-xp', 'windows11', 'windows98',
    'android12', '8bit-gameconsole-rpg', 'youtube'
  ];
  
  return fallbackThemeNames.map(theme => ({
    value: theme,
    label: theme.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    file: `/styles/${theme}.css`,
    description: `${theme} theme`,
    category: 'General'
  }));
}

// Common themes used for quick testing (derived from schema)
export const COMMON_THEMES_VALUES = [
  'material-design',
  'apple-liquid-glass',
  'github-dark',
  'windows11',
  'macOS12',
  'ios12',
  'android12'
];

// Get common themes metadata
export function getCommonThemes(): ThemeMetadata[] {
  const allThemes = getThemes();
  return allThemes.filter(theme => COMMON_THEMES_VALUES.includes(theme.value));
}

// Get all themes metadata
export function getAllThemes(): ThemeMetadata[] {
  return getThemes();
}

// Legacy exports for backward compatibility
export const COMMON_THEMES = COMMON_THEMES_VALUES;

// Get all theme values (legacy compatibility)
export function getAllThemeValues(): string[] {
  const themes = getThemes();
  return themes.map(theme => theme.value);
}

// Synchronous fallback for cases where async is not possible
export const ALL_THEMES = [
  'monotone', 'material-design', 'apple-liquid-glass', 'aws', 'figma',
  'github-dark', 'handheld-console', 'ios12', 'linear', 'macOS12', 'naver-line',
  'openai', 'vercel', 'windows-xp', 'windows11', 'windows98',
  'android12', '8bit-gameconsole-rpg', 'youtube'
];

// Viewport sizes for responsive testing
export const VIEWPORT_SIZES = [
  { width: 320, height: 568, name: 'mobile' },
  { width: 768, height: 1024, name: 'tablet' },
  { width: 1200, height: 800, name: 'desktop' },
  { width: 1920, height: 1080, name: 'large-desktop' }
];

// Component sizes for testing
export const COMPONENT_SIZES = [
  { width: 400, height: 300, name: 'small' },
  { width: 800, height: 600, name: 'medium' },
  { width: 1200, height: 800, name: 'large' }
];

/**
 * Get available theme files from the file system
 */
export function getAvailableThemes(stylesDir?: string): string[] {
  const defaultStylesDir = path.join(process.cwd(), 'public', 'styles');
  const targetDir = stylesDir || defaultStylesDir;
  
  try {
    const themeFiles = fs.readdirSync(targetDir).filter(file => file.endsWith('.css'));
    return themeFiles.map(file => file.replace('.css', ''));
  } catch (error) {
    console.warn(`Could not read themes from ${targetDir}, using fallback list`);
    return ALL_THEMES;
  }
}

/**
 * Load detailed theme metadata from a themes data file
 */
export function loadThemeMetadata(): ThemeMetadata[] {
  return themes;
}

/**
 * Group themes by category
 */
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

/**
 * Filter themes by category
 */
export function filterThemesByCategory(themes: ThemeMetadata[], category: string): ThemeMetadata[] {
  return themes.filter(theme => theme.category === category);
}

/**
 * Get theme names only (for backward compatibility)
 */
export function getThemeNames(themes: ThemeMetadata[]): string[] {
  return themes.map(theme => theme.value);
}
