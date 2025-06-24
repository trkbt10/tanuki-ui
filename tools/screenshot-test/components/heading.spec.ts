import { createComponentTest } from '../utils/component-test-helper';
import { COMMON_THEMES, COMPONENT_SIZES } from '../utils/theme-matrix';

createComponentTest('Heading', {
  themes: COMMON_THEMES,
  variants: {
    'h1': { level: 1 },
    'h2': { level: 2 },
    'h3': { level: 3 },
    'h4': { level: 4 },
    'h5': { level: 5 },
    'h6': { level: 6 }
  },
  sizes: COMPONENT_SIZES
});