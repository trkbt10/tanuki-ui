import * as React from "react";
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: "windows11",
    toolbar: {
      icon: "circlehollow",
      // Array of plain string values or MenuItem shape (see below)
      items: ["macOS13", "macOS12", "windows11", "iOS12", "android12"],
      // Property that specifies if the name of the item will be displayed
      showName: true,
    },
  },
};
const withThemeProvider = (Story, context) => {
  React.useEffect(() => {
    document.body.dataset["theme"] = context.globals.theme;
    const linker = document.createElement("link");
    linker.href = `./styles/${context.globals.theme}.css`;
    document.body.appendChild(linker);
    linker.rel = "stylesheet";
    return () => {
      document.body.removeChild(linker);
    };
  }, [context.globals.theme]);
  return (
    <>
      <Story {...context} />
    </>
  );
};
export const decorators = [withThemeProvider];
