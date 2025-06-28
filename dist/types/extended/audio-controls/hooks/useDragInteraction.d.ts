export interface UseDragInteractionOptions {
    onDragStart?: (e: React.MouseEvent) => void;
    onDragMove?: (e: MouseEvent) => void;
    onDragEnd?: () => void;
    disabled?: boolean;
    cursor?: string;
}
export declare function useDragInteraction({ onDragStart, onDragMove, onDragEnd, disabled, cursor, }: UseDragInteractionOptions): {
    isDragging: boolean;
    handleMouseDown: (e: React.MouseEvent) => void;
};
