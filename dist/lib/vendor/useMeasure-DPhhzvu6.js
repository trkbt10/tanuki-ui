import * as o from "react";
class p {
  rafId = 0;
  pointerIds = [];
  handlers = {};
  targetPointers = {};
  pointers = {};
  constructor() {
    window.addEventListener("pointermove", (t) => {
      this.pointers[t.pointerId] ? (this.pointers[t.pointerId].pageX = t.pageX, this.pointers[t.pointerId].pageY = t.pageY) : this.pointers[t.pointerId] = {
        pageX: t.pageX,
        pageY: t.pageY
      };
    }), window.addEventListener("pointercancel", (t) => this.removeTrackTarget(t)), window.addEventListener("pointerup", (t) => this.removeTrackTarget(t)), document.addEventListener("pointerleave", (t) => this.removeTrackTarget(t)), this.start();
  }
  start() {
    this.tick();
  }
  end() {
    cancelAnimationFrame(this.rafId);
  }
  removeTrackTarget(t) {
    this.emitChange(t.pointerId.toString(), "pointerend"), delete this.pointers[t.pointerId], delete this.targetPointers[t.pointerId], delete this.handlers[t.pointerId];
    const n = this.pointerIds.indexOf(t.pointerId.toString());
    this.pointerIds.splice(n, 1);
  }
  tick() {
    this.rafId = requestAnimationFrame(() => this.tick());
    for (const t of this.pointerIds) {
      const n = this.targetPointers[t], e = this.pointers[t];
      if (!n || !e)
        continue;
      const [r, i] = [n.deltaX, n.deltaY];
      n.deltaX = e.pageX - n.startX, n.deltaY = e.pageY - n.startY, n.elapsedtime = performance.now() - n.timestamp, !(r === n.deltaX && i === n.deltaY) && this.emitChange(t, "pointermove");
    }
  }
  emitChange(t, n) {
    if (!this.handlers[t])
      return;
    const e = this.targetPointers[t], r = this.pointers[t];
    this.handlers[t]({
      pointerId: t.toString(),
      timestamp: e.timestamp,
      elapsedtime: e.elapsedtime,
      type: n,
      pageX: r.pageX,
      pageY: r.pageY,
      deltaX: e.deltaX,
      deltaY: e.deltaY,
      startX: e.startX,
      startY: e.startY,
      clientX: e.clientX,
      clientY: e.clientY,
      offsetX: e.offsetX,
      offsetY: e.offsetY,
      button: e.button,
      isFinal: n === "pointerend",
      target: e.target,
      ZIndexList: e.ZIndexList,
      defaultPrevented: e.defaultPrevented
    });
  }
  addTrackTarget(t, n) {
    t.target instanceof HTMLElement && (this.pointerIds.push(t.pointerId.toString()), this.targetPointers[t.pointerId] = {
      timestamp: performance.now(),
      elapsedtime: 0,
      deltaX: 0,
      deltaY: 0,
      startX: t.pageX,
      startY: t.pageY,
      button: t.button,
      target: t.target,
      clientX: t.clientX,
      clientY: t.clientY,
      offsetX: t.offsetX,
      offsetY: t.offsetY,
      ZIndexList: u(t.target),
      defaultPrevented: t.defaultPrevented
    }, this.pointerIds = this.pointerIds.sort((e, r) => c(this.targetPointers[e]?.ZIndexList ?? [], this.targetPointers[r]?.ZIndexList ?? [])), this.pointers[t.pointerId] = {
      pageX: t.pageX,
      pageY: t.pageY
    }, this.handlers[t.pointerId] = n, this.emitChange(t.pointerId, "pointerdown"));
  }
}
const c = (s, t) => {
  const n = Math.max(s.length, t.length);
  if (n <= 0)
    return 0;
  for (let e = 0; e < n; e++) {
    const r = s[e], i = t[e];
    if (typeof r > "u")
      return -1;
    if (typeof i > "u")
      return 1;
    if (r !== i)
      return r > i ? -1 : 1;
  }
  return 0;
}, u = (s) => {
  const t = [], n = (e) => {
    const i = +window.getComputedStyle(e).getPropertyValue("z-index");
    Number.isNaN(i) || t.push(i), e.parentElement && n(e.parentElement);
  };
  return n(s), t.reverse();
};
let a;
const l = (s, t) => {
  a || (a = new p());
  const n = o.useRef(t);
  n.current = t, o.useEffect(() => {
    if (!s.current)
      return;
    const e = s.current, r = (i) => {
      i.defaultPrevented || (i.preventDefault(), a.addTrackTarget(i, (d) => {
        n.current && n.current(d);
      }));
    };
    return e.addEventListener("pointerdown", r), () => {
      e.removeEventListener("pointerdown", r);
    };
  }, []);
}, f = (s) => {
  const [t, n] = o.useState(), e = o.useDeferredValue(t), r = o.useCallback(() => {
    if (!s.current)
      return;
    const i = s.current.getBoundingClientRect();
    n({
      x: i.x,
      y: i.y,
      width: i.width,
      height: i.height
    });
  }, [n]);
  return o.useEffect(() => (window.addEventListener("scroll", r), () => {
    window.removeEventListener("scroll", r);
  }), []), o.useEffect(() => (window.addEventListener("resize", r, !1), r(), () => {
    window.removeEventListener("resize", r, !1);
  }), [r]), o.useEffect(() => {
    const i = new ResizeObserver((d) => {
      r();
    });
    return s.current && i.observe(s.current), () => {
      s.current && i.unobserve(s.current), i.disconnect();
    };
  }, [r]), [e, r];
};
export {
  f as a,
  l as u
};
