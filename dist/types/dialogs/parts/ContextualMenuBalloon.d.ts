import * as React from "react";
export declare const composeArrowPosition: ({ x, y, width, height, lookAtX, lookAtY, rx, shadowMargin, chevronSize, }: {
    x: number;
    y: number;
    width: number;
    height: number;
    lookAtX: number;
    lookAtY: number;
    rx?: number;
    shadowMargin?: number;
    chevronSize?: number;
}) => {
    arrowSnapPoint: {
        x: number;
        y: number;
    };
    angle: number;
};
export declare const ContextualMenuBalloon: React.FC<{
    x: number;
    y: number;
    width: number;
    height: number;
    lookAtX: number;
    lookAtY: number;
    rx?: number;
    shadowMargin?: number;
    chevronSize?: number;
}>;
