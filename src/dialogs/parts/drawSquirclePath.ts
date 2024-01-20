export const drawSquirclePath = (
  x: number,
  y: number,
  width: number,
  height: number,
  cornerRadius: number,
  borderWidth: number = 0,
): string => {
  x += borderWidth / 2;
  y += borderWidth / 2;
  width -= borderWidth;
  height -= borderWidth;
  const d = [
    `M ${x + cornerRadius} ${y}`,
    `H ${x + width - cornerRadius}`,
    `Q ${x + width} ${y} ${x + width} ${y + cornerRadius}`,
    `V ${y + height - cornerRadius}`,
    `Q ${x + width} ${y + height} ${x + width - cornerRadius} ${y + height}`,
    `H ${x + cornerRadius}`,
    `Q ${x} ${y + height} ${x} ${y + height - cornerRadius}`,
    `V ${y + cornerRadius}`,
    `Q ${x} ${y} ${x + cornerRadius} ${y}`,
    `Z`,
  ]
    .join(" ")
    .replace(/\s+/g, " ")
    .replace(/\n/g, "");
  return d;
};
