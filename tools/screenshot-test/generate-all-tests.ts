import { writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const srcDir = join(process.cwd(), 'src', 'elements');
const componentsDir = join(process.cwd(), 'tests', 'visual', 'components');

const componentFiles = readdirSync(srcDir)
  .filter(file => file.endsWith('.tsx') && !file.includes('.stories.'))
  .map(file => file.replace('.tsx', ''));

const existingTests = readdirSync(componentsDir)
  .filter(file => file.endsWith('.spec.ts'))
  .map(file => file.replace('.spec.ts', ''));

const missingComponents = componentFiles.filter(component => 
  !existingTests.some(test => test.includes(component.toLowerCase()))
);

console.log('Existing components:', componentFiles.length);
console.log('Existing tests:', existingTests.length);
console.log('Missing tests for:', missingComponents);

for (const componentName of missingComponents) {
  const testContent = `import { createComponentTest } from '../utils/component-test-helper';
import { COMMON_THEMES, COMPONENT_SIZES } from '../utils/theme-matrix';

createComponentTest('${componentName}', {
  themes: COMMON_THEMES,
  variants: {
    'default': {}
  },
  sizes: COMPONENT_SIZES
});`;

  const testFilePath = join(componentsDir, `${componentName.toLowerCase()}.spec.ts`);
  writeFileSync(testFilePath, testContent);
  console.log(`Created test for ${componentName}`);
}

console.log('Test generation complete!');