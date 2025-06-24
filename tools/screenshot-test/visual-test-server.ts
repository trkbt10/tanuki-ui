import { Hono } from 'hono';
import { serveStatic } from 'hono/node';
import { serve } from 'hono/node';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import path from 'path';
import fs from 'fs';
import { createRequire } from 'module';
import { getAvailableThemes } from '../tools-shared/themes.js';

const require = createRequire(import.meta.url);

const app = new Hono();
const port = 3000;

const getThemeStyles = () => {
  const stylesDir = path.join(process.cwd(), '..', '..', 'public', 'styles');
  return getAvailableThemes(stylesDir);
};

const createHTML = (componentHTML: string, theme: string = 'material-design') => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Visual Test</title>
  <link rel="stylesheet" href="/dist/style.css">
  <link rel="stylesheet" href="/styles/${theme}.css">
  <style>
    html, body {
      margin: 0;
      padding: 0;
      font-family: system-ui, -apple-system, sans-serif;
      background: var(--windowBackgroundColor, #ffffff);
      color: var(--textColor, #000000);
      font: var(--textFont, inherit);
    }
    .component-container {
      display: inline-block;
      padding: 16px;
      background: var(--windowBackgroundColor, #ffffff);
      color: var(--textColor, #000000);
    }
  </style>
</head>
<body>
  <div class="component-container">
    ${componentHTML}
  </div>
</body>
</html>
`;

app.use('/styles/*', serveStatic({ 
  root: path.join(process.cwd(), '..', '..', 'public', 'styles'),
  rewriteRequestPath: (path) => path.replace(/^\/styles/, '')
}));
app.use('/dist/*', serveStatic({ 
  root: path.join(process.cwd(), '..', '..', 'dist', 'lib'),
  rewriteRequestPath: (path) => path.replace(/^\/dist/, '')
}));

app.get('/component/:name', (c) => {
  const { name } = c.req.param();
  const theme = c.req.query('theme') || 'material-design';
  const variant = c.req.query('variant');
  
  try {
    const componentModule = require(path.join(process.cwd(), '..', '..', 'dist', 'lib', 'index.js'));
    const Component = componentModule[name];
    
    if (!Component) {
      return c.text(`Component ${name} not found`, 404);
    }
    
    const props: any = {
      children: name === 'Card' ? 'Sample card content' : 
                name === 'Button' ? 'Click me' :
                `Sample ${name} content`
    };
    
    // Add variant-specific props
    if (variant) {
      switch (name) {
        case 'Button':
          if (variant === 'primary') props.variant = 'primary';
          if (variant === 'secondary') props.variant = 'secondary';
          if (variant === 'small') props.size = 'small';
          if (variant === 'large') props.size = 'large';
          if (variant === 'disabled') props.disabled = true;
          break;
        case 'Card':
          if (variant === 'outlined') props.variant = 'outlined';
          if (variant === 'filled') props.variant = 'filled';
          if (variant === 'clickable') props.clickable = true;
          if (variant === 'disabled') props.disabled = true;
          break;
      }
    }
    
    const componentHTML = renderToString(createElement(Component, props));
    
    const html = createHTML(componentHTML, theme);
    return c.html(html);
  } catch (error) {
    console.error('Error rendering component:', error);
    return c.text(`Error rendering component: ${error.message}`, 500);
  }
});

app.get('/themes', (c) => {
  return c.json(getThemeStyles());
});

console.log(`Visual test server running at http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port: port,
});

export default app;