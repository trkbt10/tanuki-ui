export type Point = {
    x: number;
    y: number;
};
export type Size = {
    width: number;
    height: number;
};
export type BoundingBox = Size & Point;
export type Rect = BoundingBox;
