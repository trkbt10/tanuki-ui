import * as React from "react";
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Visual variant of the card
     * @default "elevated"
     */
    variant?: "elevated" | "outlined" | "filled";
    /**
     * Whether the card is interactive/clickable
     * @default false
     */
    clickable?: boolean;
    /**
     * Whether the card is disabled
     * @default false
     */
    disabled?: boolean;
}
export declare const Card: React.FC<React.PropsWithChildren<CardProps>>;
