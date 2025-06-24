import { createComponentTest } from '../utils/component-test-helper';
import { COMMON_THEMES, COMPONENT_SIZES } from '../utils/theme-matrix';

createComponentTest('Table', {
  themes: COMMON_THEMES,
  variants: {
    'default': {},
    'striped': { striped: true },
    'bordered': { bordered: true },
    'compact': { size: 'compact' },
    'large': { size: 'large' }
  },
  sizes: COMPONENT_SIZES
});