type UpdateFunction<T> = (prevState: T) => T;
type BatchedUpdate<T> = T | UpdateFunction<T>;
interface BatchedUpdatesOptions {
    delay?: number;
    maxBatchSize?: number;
}
/**
 * Hook for batching multiple state updates to reduce re-renders
 * Uses requestAnimationFrame for optimal performance
 */
export declare const useBatchedUpdates: <T>(initialState: T, options?: BatchedUpdatesOptions) => [T, (update: BatchedUpdate<T>) => void, () => void];
export {};
