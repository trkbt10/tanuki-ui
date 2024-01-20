export const isRelativeURL = (value: string) => {
  return value.startsWith("/") || value.startsWith(".");
};
