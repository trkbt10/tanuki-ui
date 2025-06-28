import { default as React, FC } from 'react';
import { Segment } from './Segment';
export interface SegmentedControlProps {
    items: React.ReactNode[];
    selectedIndex?: number;
    defaultSelected?: number;
    onSelect?: (index: number) => void;
    element?: React.FC<React.PropsWithChildren<React.ComponentProps<typeof Segment>>>;
    controlled?: boolean;
    onPositionChange?: (rect: {
        left: number;
        top: number;
        width: number;
        height: number;
        x?: number;
        y?: number;
        right?: number;
        bottom?: number;
    }) => void;
    onDragStart?: (index: number) => void;
    onDragEnd?: (index: number) => void;
    onDragPreview?: (index: number) => void;
}
export interface LegacySegmentedControlProps {
    items: React.ReactNode[];
    defaultSelected?: number;
    onSelect?: (item: number) => void;
    element?: React.FC<React.PropsWithChildren<React.ComponentProps<typeof Segment>>>;
}
export declare const SegmentedControl: FC<SegmentedControlProps>;
