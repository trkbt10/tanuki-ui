import { createComponentTest } from '../utils/component-test-helper';
import { COMMON_THEMES } from '../utils/theme-matrix';

createComponentTest('Button', {
  themes: COMMON_THEMES,
  variants: {
    'default': {},
    'primary': { variant: 'primary' },
    'secondary': { variant: 'secondary' },
    'disabled': { disabled: true },
    'small': { size: 'small' },
    'large': { size: 'large' }
  }
});