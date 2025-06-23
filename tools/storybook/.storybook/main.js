module.exports = {
  stories: ["../../../src/**/*.stories.mdx", "../../../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  features: {
    storyStoreV7: true,
  },
  async viteFinal(config) {
    const { default: react } = await import('@vitejs/plugin-react');
    
    config.base = "./";
    
    // Remove existing React plugin if any
    config.plugins = config.plugins.filter(
      plugin => !plugin.name || !plugin.name.includes('vite:react')
    );
    
    // Add React plugin with automatic JSX runtime
    config.plugins.push(
      react({
        jsxRuntime: 'automatic',
      })
    );
    
    return config;
  },
  docs: {
    autodocs: true,
  },
};
