export interface BoundingRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ViewportInfo {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface PositionConfig {
  padding?: number;
  arrowOffset?: number;
  maxWidth?: number;
  maxHeight?: number;
}

export interface PositionResult {
  x: number;
  y: number;
  width: number;
  height: number;
  placement: 'top' | 'bottom' | 'left' | 'right';
}

const DEFAULT_CONFIG: Required<PositionConfig> = {
  padding: 16,
  arrowOffset: 8,
  maxWidth: 320,
  maxHeight: 240,
};

export function getViewportInfo(): ViewportInfo {
  if (typeof window === "undefined") {
    return { x: 0, y: 0, width: 0, height: 0 };
  }
  return {
    x: window.scrollX,
    y: window.scrollY,
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export function calculateMenuDimensions(
  viewport: ViewportInfo,
  config: PositionConfig = {}
): { width: number; height: number } {
  const { padding, maxWidth, maxHeight } = { ...DEFAULT_CONFIG, ...config };
  
  return {
    width: Math.min(viewport.width - padding * 2, maxWidth),
    height: Math.min(viewport.height - padding * 2, maxHeight),
  };
}

export function determineOptimalPlacement(
  target: BoundingRect,
  menuDimensions: { width: number; height: number },
  viewport: ViewportInfo,
  config: PositionConfig = {}
): 'top' | 'bottom' | 'left' | 'right' {
  const { padding, arrowOffset } = { ...DEFAULT_CONFIG, ...config };
  
  // 各方向に配置可能なスペースを計算
  const spaceTop = target.y - padding - arrowOffset;
  const spaceBottom = viewport.height - (target.y + target.height) - padding - arrowOffset;
  const spaceLeft = target.x - padding - arrowOffset;
  const spaceRight = viewport.width - (target.x + target.width) - padding - arrowOffset;
  
  // 必要なスペース
  const requiredHeight = menuDimensions.height;
  const requiredWidth = menuDimensions.width;
  
  // 各方向の配置可能性をチェック
  const canPlaceBottom = spaceBottom >= requiredHeight;
  const canPlaceTop = spaceTop >= requiredHeight;
  const canPlaceRight = spaceRight >= requiredWidth;
  const canPlaceLeft = spaceLeft >= requiredWidth;
  
  // 優先順位: 下 > 上 > 右 > 左（ただし十分なスペースがある場合のみ）
  if (canPlaceBottom) return 'bottom';
  if (canPlaceTop) return 'top';
  if (canPlaceRight) return 'right';
  if (canPlaceLeft) return 'left';
  
  // どこにも十分なスペースがない場合、最もスペースの大きい方向を選択
  const spaces = [
    { direction: 'bottom' as const, space: spaceBottom },
    { direction: 'top' as const, space: spaceTop },
    { direction: 'right' as const, space: spaceRight },
    { direction: 'left' as const, space: spaceLeft },
  ];
  
  const maxSpaceDirection = spaces.reduce((max, current) => 
    current.space > max.space ? current : max
  );
  
  return maxSpaceDirection.direction;
}

export function calculateMenuPosition(
  target: BoundingRect,
  menuDimensions: { width: number; height: number },
  placement: 'top' | 'bottom' | 'left' | 'right',
  viewport: ViewportInfo,
  config: PositionConfig = {}
): { x: number; y: number } {
  const { padding, arrowOffset } = { ...DEFAULT_CONFIG, ...config };
  
  const targetCenterX = target.x + target.width / 2;
  const targetCenterY = target.y + target.height / 2;
  
  let x: number;
  let y: number;
  
  switch (placement) {
    case 'bottom':
      x = targetCenterX - menuDimensions.width / 2;
      y = target.y + target.height + arrowOffset;
      break;
    case 'top':
      x = targetCenterX - menuDimensions.width / 2;
      y = target.y - menuDimensions.height - arrowOffset;
      break;
    case 'right':
      x = target.x + target.width + arrowOffset;
      y = targetCenterY - menuDimensions.height / 2;
      break;
    case 'left':
      x = target.x - menuDimensions.width - arrowOffset;
      y = targetCenterY - menuDimensions.height / 2;
      break;
  }
  
  // 境界調整
  x = Math.max(padding, Math.min(x, viewport.width - padding - menuDimensions.width));
  y = Math.max(padding, Math.min(y, viewport.height - padding - menuDimensions.height));
  
  return { x, y };
}

export function calculateContextualMenuPosition(
  target: BoundingRect,
  viewport: ViewportInfo = getViewportInfo(),
  config: PositionConfig = {}
): PositionResult {
  const menuDimensions = calculateMenuDimensions(viewport, config);
  const placement = determineOptimalPlacement(target, menuDimensions, viewport, config);
  const position = calculateMenuPosition(target, menuDimensions, placement, viewport, config);
  
  return {
    ...position,
    ...menuDimensions,
    placement,
  };
}

export interface ContextMenuPosition {
  x: number;
  y: number;
}

/**
 * Calculate the optimal position for a context menu to ensure it stays within viewport
 * while avoiding overlapping with the pointer position
 * @param pointerX - The X coordinate of the pointer
 * @param pointerY - The Y coordinate of the pointer
 * @param menuWidth - The width of the context menu
 * @param menuHeight - The height of the context menu
 * @param viewport - The viewport information (defaults to current viewport)
 * @param offset - Offset from the pointer position (defaults to 4px)
 * @returns The calculated position for the context menu
 */
export function calculateContextMenuPosition(
  pointerX: number,
  pointerY: number,
  menuWidth: number,
  menuHeight: number,
  viewport: ViewportInfo = getViewportInfo(),
  offset: number = 4
): ContextMenuPosition {
  const padding = 8; // Minimum padding from viewport edges
  
  // Calculate available space in each direction
  const spaceRight = viewport.width - pointerX - offset;
  const spaceLeft = pointerX - offset;
  const spaceBottom = viewport.height - pointerY - offset;
  const spaceTop = pointerY - offset;
  
  // Determine horizontal position
  let x: number;
  if (spaceRight >= menuWidth + padding) {
    // Place to the right of pointer
    x = pointerX + offset;
  } else if (spaceLeft >= menuWidth + padding) {
    // Place to the left of pointer
    x = pointerX - menuWidth - offset;
  } else {
    // Center horizontally in viewport if not enough space
    x = Math.max(padding, Math.min(viewport.width - menuWidth - padding, pointerX - menuWidth / 2));
  }
  
  // Determine vertical position
  let y: number;
  if (spaceBottom >= menuHeight + padding) {
    // Place below pointer
    y = pointerY + offset;
  } else if (spaceTop >= menuHeight + padding) {
    // Place above pointer
    y = pointerY - menuHeight - offset;
  } else {
    // Place at the bottom of viewport with padding if not enough space
    y = viewport.height - menuHeight - padding;
  }
  
  // Final boundary check to ensure menu stays within viewport
  x = Math.max(padding, Math.min(x, viewport.width - menuWidth - padding));
  y = Math.max(padding, Math.min(y, viewport.height - menuHeight - padding));
  
  return { x, y };
}