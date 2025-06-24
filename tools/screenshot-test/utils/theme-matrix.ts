// Re-export from shared utilities (viewport and component sizes)
export {
  VIEWPORT_SIZES,
  COMPONENT_SIZES,
  getAvailableThemes,
  type ThemeMetadata
} from '../../tools-shared/themes.js';

// Import themes directly from the central catalog
export {
  themes,
  groupThemesByCategory,
  type ThemeMetadata as CatalogThemeMetadata
} from '../../catalog/src/data/themes.js';

// Import the type for proper usage
import type { ThemeMetadata } from '../../catalog/src/data/themes.js';

// Legacy compatibility - derive from catalog
import { themes } from '../../catalog/src/data/themes.js';

export const ALL_THEMES = themes.map(theme => theme.value);
export const COMMON_THEMES = [
  'material-design',
  'apple-liquid-glass', 
  'github-dark',
  'windows11',
  'macOS12',
  'ios12',
  'android12'
].filter(value => ALL_THEMES.includes(value));

// Helper functions using catalog data
export function loadThemeMetadata(): Promise<ThemeMetadata[]> {
  return Promise.resolve(themes);
}

export function filterThemesByCategory(category: string): ThemeMetadata[] {
  return themes.filter(theme => theme.category === category);
}

export function getThemeNames(): string[] {
  return themes.map(theme => theme.value);
}