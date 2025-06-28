import { default as React } from 'react';
interface SwipeIndicatorsProps {
    count: number;
    activeIndex: number;
    onIndexChange: (index: number) => void;
}
export declare const SwipeIndicators: React.FC<SwipeIndicatorsProps>;
export {};
