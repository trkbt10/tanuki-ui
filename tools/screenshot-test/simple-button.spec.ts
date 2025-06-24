import { test, expect } from '@playwright/test';

test.describe('Button Simple Test', () => {
  test('Button with different themes', async ({ page }) => {
    const themes = ['material-design', 'apple-liquid-glass', 'github-dark', 'windows11'];
    
    for (const theme of themes) {
      await test.step(`Button - ${theme}`, async () => {
        await page.goto(`/component/Button?theme=${theme}`);
        await page.waitForLoadState('networkidle');
        
        // Get the container element and its bounding box
        const container = page.locator('.component-container');
        await container.waitFor({ state: 'visible' });
        
        await expect(container).toHaveScreenshot(`button-${theme}.png`);
      });
    }
  });

  test('Button variants', async ({ page }) => {
    const variants = ['default', 'primary', 'secondary', 'disabled'];
    
    for (const variant of variants) {
      await test.step(`Button - ${variant}`, async () => {
        const url = variant === 'default' 
          ? '/component/Button?theme=material-design'
          : `/component/Button?theme=material-design&variant=${variant}`;
          
        await page.goto(url);
        await page.waitForLoadState('networkidle');
        
        // Get the container element and its bounding box
        const container = page.locator('.component-container');
        await container.waitFor({ state: 'visible' });
        
        await expect(container).toHaveScreenshot(`button-variant-${variant}.png`);
      });
    }
  });
});