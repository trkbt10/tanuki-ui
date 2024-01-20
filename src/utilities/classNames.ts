export const classNames = (...names: (string | boolean | undefined)[]) => {
  return names.filter(Boolean).join(" ");
};
