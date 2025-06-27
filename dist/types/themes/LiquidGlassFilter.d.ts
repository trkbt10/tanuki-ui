import { default as React } from 'react';
interface LiquidGlassFilterProps {
    id?: string;
    scale?: number;
    animationDuration?: string;
}
export declare function LiquidGlassFilter({ id, scale, animationDuration, }: LiquidGlassFilterProps): React.JSX.Element;
export declare function useLiquidGlass(filterId?: string): {
    style: {
        backdropFilter: string;
        WebkitBackdropFilter: string;
    };
    className: string;
};
export {};
