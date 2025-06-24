import { test } from '@playwright/test';
import { ComponentTestHelper } from '../utils/component-test-helper';
import { COMMON_THEMES, COMPONENT_SIZES } from '../utils/theme-matrix';

const formComponents = ['Input', 'Select', 'Textarea', 'Checkbox', 'Radio'];

test.describe('Form Elements Visual Tests', () => {
  for (const componentName of formComponents) {
    test(`should render ${componentName} correctly across themes`, async ({ page }) => {
      const helper = new ComponentTestHelper(page);
      await helper.testComponent(componentName, {
        themes: COMMON_THEMES,
        variants: {
          'default': {},
          'disabled': { disabled: true },
          'error': { error: true },
          'focused': { autoFocus: true }
        },
        sizes: COMPONENT_SIZES
      });
    });
  }
});