import { PointerInfo } from '../usePointerObserver';
export type ObservePointerCallback = (params: PointerInfo) => void;
export declare class PointerManager {
    private rafId;
    private pointerIds;
    private handlers;
    private targetPointers;
    private pointers;
    constructor();
    start(): void;
    end(): void;
    removeTrackTarget(e: PointerEvent): void;
    tick(): void;
    emitChange(pointerId: string | number, eventType: PointerInfo["type"]): void;
    addTrackTarget(e: PointerEvent, callback: ObservePointerCallback): void;
}
