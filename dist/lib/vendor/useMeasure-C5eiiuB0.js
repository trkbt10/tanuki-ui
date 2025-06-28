var c = Object.defineProperty;
var u = (s, t, e) => t in s ? c(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var a = (s, t, e) => u(s, typeof t != "symbol" ? t + "" : t, e);
import * as o from "react";
class l {
  constructor() {
    a(this, "rafId", 0);
    a(this, "pointerIds", []);
    a(this, "handlers", {});
    a(this, "targetPointers", {});
    a(this, "pointers", {});
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
    const e = this.pointerIds.indexOf(t.pointerId.toString());
    this.pointerIds.splice(e, 1);
  }
  tick() {
    this.rafId = requestAnimationFrame(() => this.tick());
    for (const t of this.pointerIds) {
      const e = this.targetPointers[t], n = this.pointers[t];
      if (!e || !n)
        continue;
      const [r, i] = [e.deltaX, e.deltaY];
      e.deltaX = n.pageX - e.startX, e.deltaY = n.pageY - e.startY, e.elapsedtime = performance.now() - e.timestamp, !(r === e.deltaX && i === e.deltaY) && this.emitChange(t, "pointermove");
    }
  }
  emitChange(t, e) {
    if (!this.handlers[t])
      return;
    const n = this.targetPointers[t], r = this.pointers[t];
    this.handlers[t]({
      pointerId: t.toString(),
      timestamp: n.timestamp,
      elapsedtime: n.elapsedtime,
      type: e,
      pageX: r.pageX,
      pageY: r.pageY,
      deltaX: n.deltaX,
      deltaY: n.deltaY,
      startX: n.startX,
      startY: n.startY,
      clientX: n.clientX,
      clientY: n.clientY,
      offsetX: n.offsetX,
      offsetY: n.offsetY,
      button: n.button,
      isFinal: e === "pointerend",
      target: n.target,
      ZIndexList: n.ZIndexList,
      defaultPrevented: n.defaultPrevented
    });
  }
  addTrackTarget(t, e) {
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
      ZIndexList: g(t.target),
      defaultPrevented: t.defaultPrevented
    }, this.pointerIds = this.pointerIds.sort((n, r) => {
      var i, d;
      return f(((i = this.targetPointers[n]) == null ? void 0 : i.ZIndexList) ?? [], ((d = this.targetPointers[r]) == null ? void 0 : d.ZIndexList) ?? []);
    }), this.pointers[t.pointerId] = {
      pageX: t.pageX,
      pageY: t.pageY
    }, this.handlers[t.pointerId] = e, this.emitChange(t.pointerId, "pointerdown"));
  }
}
const f = (s, t) => {
  const e = Math.max(s.length, t.length);
  if (e <= 0)
    return 0;
  for (let n = 0; n < e; n++) {
    const r = s[n], i = t[n];
    if (typeof r > "u")
      return -1;
    if (typeof i > "u")
      return 1;
    if (r !== i)
      return r > i ? -1 : 1;
  }
  return 0;
}, g = (s) => {
  const t = [], e = (n) => {
    const i = +window.getComputedStyle(n).getPropertyValue("z-index");
    Number.isNaN(i) || t.push(i), n.parentElement && e(n.parentElement);
  };
  return e(s), t.reverse();
};
let p;
const m = (s, t) => {
  p || (p = new l());
  const e = o.useRef(t);
  e.current = t, o.useEffect(() => {
    if (!s.current)
      return;
    const n = s.current, r = (i) => {
      i.defaultPrevented || (i.preventDefault(), p.addTrackTarget(i, (d) => {
        e.current && e.current(d);
      }));
    };
    return n.addEventListener("pointerdown", r), () => {
      n.removeEventListener("pointerdown", r);
    };
  }, []);
}, v = (s) => {
  const [t, e] = o.useState(), n = o.useDeferredValue(t), r = o.useCallback(() => {
    if (!s.current)
      return;
    const i = s.current.getBoundingClientRect();
    e({
      x: i.x,
      y: i.y,
      width: i.width,
      height: i.height
    });
  }, [e]);
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
  }, [r]), [n, r];
};
export {
  v as a,
  m as u
};
