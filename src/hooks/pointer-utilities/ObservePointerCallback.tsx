import { PointerInfo } from "../usePointerObserver";

export type ObservePointerCallback = (params: PointerInfo) => void;
type TargetPointer = Omit<PointerInfo, "pointerId" | "type" | "pageX" | "pageY" | "isFinal">;

export class PointerManager {
  private rafId: number = 0;
  private pointerIds: string[] = [];
  private handlers: { [pointerId: string]: ObservePointerCallback } = {};
  private targetPointers: {
    [pointerId: string]: TargetPointer;
  } = {};
  private pointers: {
    [pointerId: string]: {
      pageX: number;
      pageY: number;
    };
  } = {};
  constructor() {
    window.addEventListener("pointermove", (e) => {
      if (!this.pointers[e.pointerId]) {
        this.pointers[e.pointerId] = {
          pageX: e.pageX,
          pageY: e.pageY,
        };
      } else {
        this.pointers[e.pointerId].pageX = e.pageX;
        this.pointers[e.pointerId].pageY = e.pageY;
      }
    });
    window.addEventListener("pointercancel", (e) => this.removeTrackTarget(e));
    window.addEventListener("pointerup", (e) => this.removeTrackTarget(e));
    document.addEventListener("pointerleave", (e) => this.removeTrackTarget(e));
    this.start();
  }
  start() {
    this.tick();
  }
  end() {
    cancelAnimationFrame(this.rafId);
  }
  removeTrackTarget(e: PointerEvent) {
    this.emitChange(e.pointerId.toString(), "pointerend");
    delete this.pointers[e.pointerId];
    delete this.targetPointers[e.pointerId];
    delete this.handlers[e.pointerId];
    const index = this.pointerIds.indexOf(e.pointerId.toString());
    this.pointerIds.splice(index, 1);
  }

  tick() {
    this.rafId = requestAnimationFrame(() => this.tick());
    for (const pointerId of this.pointerIds) {
      const trackTarget = this.targetPointers[pointerId];
      const pointerInfo = this.pointers[pointerId];
      if (!trackTarget || !pointerInfo) {
        continue;
      }

      const [prevX, prevY] = [trackTarget.deltaX, trackTarget.deltaY];
      trackTarget.deltaX = pointerInfo.pageX - trackTarget.startX;
      trackTarget.deltaY = pointerInfo.pageY - trackTarget.startY;
      trackTarget.elapsedtime = performance.now() - trackTarget.timestamp;
      if (prevX === trackTarget.deltaX && prevY === trackTarget.deltaY) {
        continue;
      }
      this.emitChange(pointerId, "pointermove");
    }
  }
  emitChange(pointerId: string | number, eventType: PointerInfo["type"]) {
    if (!this.handlers[pointerId]) {
      return;
    }
    const trackTarget = this.targetPointers[pointerId];
    const pointerInfo = this.pointers[pointerId];
    this.handlers[pointerId]({
      pointerId: pointerId.toString(),
      timestamp: trackTarget.timestamp,
      elapsedtime: trackTarget.elapsedtime,
      type: eventType,
      pageX: pointerInfo.pageX,
      pageY: pointerInfo.pageY,
      deltaX: trackTarget.deltaX,
      deltaY: trackTarget.deltaY,
      startX: trackTarget.startX,
      startY: trackTarget.startY,
      clientX: trackTarget.clientX,
      clientY: trackTarget.clientY,
      offsetX: trackTarget.offsetX,
      offsetY: trackTarget.offsetY,
      button: trackTarget.button,
      isFinal: eventType === "pointerend",
      target: trackTarget.target,
      ZIndexList: trackTarget.ZIndexList,
      defaultPrevented: trackTarget.defaultPrevented,
    });
  }
  addTrackTarget(e: PointerEvent, callback: ObservePointerCallback) {
    if (!(e.target instanceof HTMLElement)) {
      return;
    }
    this.pointerIds.push(e.pointerId.toString());
    this.targetPointers[e.pointerId] = {
      timestamp: performance.now(),
      elapsedtime: 0,
      deltaX: 0,
      deltaY: 0,
      startX: e.pageX,
      startY: e.pageY,
      button: e.button,
      target: e.target,
      clientX: e.clientX,
      clientY: e.clientY,
      offsetX: e.offsetX,
      offsetY: e.offsetY,
      ZIndexList: getZIndexList(e.target),
      defaultPrevented: e.defaultPrevented,
    };
    this.pointerIds = this.pointerIds.sort((a, b) => {
      return compareTwoPointerIndex(this.targetPointers[a]?.ZIndexList ?? [], this.targetPointers[b]?.ZIndexList ?? []);
    });
    this.pointers[e.pointerId] = {
      pageX: e.pageX,
      pageY: e.pageY,
    };
    this.handlers[e.pointerId] = callback;
    this.emitChange(e.pointerId, "pointerdown");
  }
}
const compareTwoPointerIndex = (a: number[], b: number[]) => {
  const pointerSize = Math.max(a.length, b.length);
  if (pointerSize <= 0) {
    return 0;
  }
  for (let i = 0; i < pointerSize; i++) {
    const az = a[i];
    const bz = b[i];
    if (typeof az === "undefined") {
      return -1;
    }
    if (typeof bz === "undefined") {
      return 1;
    }
    if (az === bz) {
      continue;
    }
    return az > bz ? -1 : 1;
  }
  return 0;
};
const getZIndexList = (e: HTMLElement): number[] => {
  const results: number[] = [];
  const walker = (e: HTMLElement): any => {
    const z = window.getComputedStyle(e).getPropertyValue("z-index");

    const zNumber = +z;
    if (!Number.isNaN(zNumber)) {
      results.push(zNumber);
    }
    if (e.parentElement) {
      walker(e.parentElement);
    }
  };
  walker(e);
  return results.reverse();
};
