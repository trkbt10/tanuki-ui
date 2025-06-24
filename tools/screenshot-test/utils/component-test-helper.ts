import { test, expect, Page } from '@playwright/test';

export interface ComponentTestOptions {
  themes?: string[];
  variants?: Record<string, any>;
  sizes?: {
    width: number;
    height: number;
    name: string;
  }[];
}

export class ComponentTestHelper {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async testComponent(
    componentName: string,
    options: ComponentTestOptions = {}
  ) {
    const {
      themes = ['material-design'],
      variants = { default: {} }
    } = options;

    for (const theme of themes) {
      for (const [variantName, variantProps] of Object.entries(variants)) {
        await test.step(`${componentName} - ${theme} - ${variantName}`, async () => {
          const params = new URLSearchParams({ theme });
          if (variantName !== 'default') {
            params.set('variant', variantName);
          }
          
          const url = `/component/${componentName}?${params.toString()}`;
          await this.page.goto(url);
          
          await this.page.waitForLoadState('networkidle');
          
          // Take screenshot of just the component container
          const container = this.page.locator('.component-container');
          await container.waitFor({ state: 'visible' });
          
          const screenshotName = `${componentName}-${theme}-${variantName}.png`;
          await expect(container).toHaveScreenshot(screenshotName);
        });
      }
    }
  }

  async getAllThemes(): Promise<string[]> {
    const response = await this.page.request.get('/themes');
    return await response.json();
  }

  async waitForComponentLoad() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(100);
  }
}

export function createComponentTest(
  componentName: string,
  options: ComponentTestOptions = {}
) {
  test.describe(`${componentName} Visual Tests`, () => {
    test(`should render ${componentName} correctly across themes and variants`, async ({ page }) => {
      const helper = new ComponentTestHelper(page);
      await helper.testComponent(componentName, options);
    });
  });
}