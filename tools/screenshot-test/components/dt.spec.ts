import { createComponentTest } from '../utils/component-test-helper';
import { COMMON_THEMES, COMPONENT_SIZES } from '../utils/theme-matrix';

createComponentTest('Dt', {
  themes: COMMON_THEMES,
  variants: {
    'default': {}
  },
  sizes: COMPONENT_SIZES
});