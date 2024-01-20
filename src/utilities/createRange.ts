const defaultInitializer = (index: number) => index;

export const createRange = <Type extends {}, Length extends number>(
  length: Length,
  initializer: (index: number) => Type,
): Type[] => {
  const _initializer = initializer ?? defaultInitializer;
  const range: Type[] = new Array(length);
  for (let i = 0; i < length; i++) {
    range[i] = _initializer(i);
  }
  return range;
};
