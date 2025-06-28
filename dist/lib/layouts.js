var re = (e) => {
  throw TypeError(e);
};
var Ne = (e, t, n) => t.has(e) || re("Cannot " + n);
var L = (e, t, n) => (Ne(e, t, "read from private field"), n ? n.call(e) : t.get(e)), H = (e, t, n) => t.has(e) ? re("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n);
import { jsx as m, jsxs as B, Fragment as _ } from "react/jsx-runtime";
import * as y from "react";
import I, { useLayoutEffect as We, useEffect as x, useRef as E, useState as P, useCallback as $, useMemo as ae } from "react";
import { u as $e, a as ze } from "./vendor/useMeasure-C5eiiuB0.js";
var Ie = typeof window < "u", Xe = Ie ? We : x;
const ge = "lytbase", Ee = {
  base: ge
}, xe = (e) => /* @__PURE__ */ m("div", { className: Ee.base, children: e.children });
xe.displayName = "ScrollView";
const Ae = (e, t) => {
  const [n, s] = P(t);
  return x(() => {
    if (!e || typeof window > "u") return;
    const r = window.localStorage.getItem(e);
    if (r) {
      const o = Number(r);
      isNaN(o) || s(Math.min(Math.max(o, 120), 480));
    }
  }, [e]), x(() => {
    !e || typeof window > "u" || window.localStorage.setItem(e, String(n));
  }, [n, e]), [n, s];
}, Le = (e, t, n) => {
  const s = E(null), r = E(null), o = E(null), i = e.asideId ? `SidebarLayout:width:${e.asideId}` : void 0, [a, c] = Ae(i, 240), f = E(!1), R = E(null), [v, b] = P(!1), [l, u] = P(0), [h, V] = P(e.defaultMobileView), S = E(null), N = t !== void 0, d = N ? t : h, C = $((p) => {
    N || V(p), n == null || n(p);
  }, [N, n]);
  x(() => {
    const p = () => {
      const W = window.innerWidth;
      b(W < e.mobileBreakpoint), e.mobileSidebarMode === "overlay" ? u(Math.min(e.mobileOverlayMaxWidth, W)) : u(W);
    };
    return p(), window.addEventListener("resize", p), () => window.removeEventListener("resize", p);
  }, [e.mobileBreakpoint, e.mobileSidebarMode, e.mobileOverlayMaxWidth]);
  const w = $((p) => {
    var W;
    if (p.type === "pointerdown")
      f.current = !0, R.current = ((W = document.querySelector("[data-sidebar-base]")) == null ? void 0 : W.getBoundingClientRect()) ?? null;
    else if (p.type === "pointermove" && f.current && R.current) {
      const X = Math.min(Math.max(p.pageX - R.current.left, e.minAsideWidth), e.maxAsideWidth);
      c(X);
    } else p.type === "pointerend" && (f.current = !1, R.current = null);
  }, [e.minAsideWidth, e.maxAsideWidth]);
  $e(s, w);
  const z = $((p) => {
    var X;
    if (!v) return;
    const W = p.touches[0];
    if (p.type === "touchstart")
      S.current = {
        startX: W.clientX,
        startY: W.clientY,
        currentX: W.clientX,
        isDragging: !1,
        direction: null
      };
    else if (p.type === "touchmove" && S.current) {
      const M = W.clientX - S.current.startX, T = W.clientY - S.current.startY;
      if (S.current.currentX = W.clientX, !S.current.direction && (Math.abs(M) > 8 || Math.abs(T) > 8) && (S.current.direction = Math.abs(M) > Math.abs(T) ? "horizontal" : "vertical", S.current.direction === "horizontal" && (S.current.isDragging = !0)), S.current.direction === "horizontal" && S.current.isDragging && o.current)
        if (p.preventDefault(), e.mobileSidebarMode === "overlay") {
          const g = o.current.querySelector('[data-sidebar="aside"]');
          if (g) {
            let O = d === "aside" ? M : -l + M;
            (d === "aside" && M < 0 || d === "main" && M > 0) && (d === "main" && M < l ? O = -l + M : O = M * 0.25), g.style.transform = `translateX(${Math.max(-l, Math.min(0, O))}px)`;
          }
        } else {
          const g = d === "aside" ? 0 : -l, O = d === "aside" && M > 0 || d === "main" && M < 0 ? M * 0.25 : M;
          o.current.style.transform = `translateX(${g + O}px)`;
        }
    } else if (p.type === "touchend" && ((X = S.current) != null && X.isDragging)) {
      const M = S.current.currentX - S.current.startX, T = window.innerWidth * 0.25;
      if (Math.abs(M) > T && (M > 0 && d === "main" ? C("aside") : M < 0 && d === "aside" && C("main")), o.current)
        if (e.mobileSidebarMode === "overlay") {
          const g = o.current.querySelector('[data-sidebar="aside"]');
          g && (g.style.transition = "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)", g.style.transform = d === "aside" ? "translateX(0)" : "translateX(-100%)", setTimeout(() => {
            g && (g.style.transition = "");
          }, 300));
        } else {
          const g = d === "aside" ? 0 : -l;
          o.current.style.transition = "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)", o.current.style.transform = `translateX(${g}px)`, setTimeout(() => {
            o.current && (o.current.style.transition = "");
          }, 300);
        }
      S.current = null;
    }
  }, [v, d, l, C]);
  return x(() => {
    const p = r.current;
    if (!p) return;
    const W = ["touchstart", "touchmove", "touchend", "touchcancel"];
    return W.forEach((X) => {
      p.addEventListener(X, z, { passive: X === "touchstart" });
    }), () => {
      W.forEach((X) => {
        p.removeEventListener(X, z);
      });
    };
  }, [z]), x(() => {
    if (!(!o.current || !v))
      if (e.mobileSidebarMode === "overlay") {
        const p = o.current.querySelector('[data-sidebar="aside"]');
        p && p.setAttribute("data-active", d === "aside" ? "true" : "false");
      } else {
        const p = d === "aside" ? 0 : -l;
        o.current.style.transform = `translateX(${p}px)`;
      }
  }, [d, v, l, e.mobileSidebarMode]), {
    // Refs
    resizerRef: s,
    containerRef: r,
    viewsContainerRef: o,
    // State
    isMobile: v,
    asideWidth: a,
    mobileSidebarWidth: l,
    currentMobileView: d,
    updateMobileView: C,
    // Config
    config: e
  };
}, Oe = "lytbaseE4I", De = "lytaside", Be = "lytrsz", Pe = "lytmain", Te = "lytmobile", Ye = "lytmobvie", je = "lytmobviepsf", He = "lytovr", ke = "lytovrbdr", qe = "lytsliout", Fe = "lytslide-in", A = {
  base: Oe,
  aside: De,
  resizer: Be,
  main: Pe,
  mobile: Te,
  mobileViewsContainer: Ye,
  mobileView: je,
  overlay: He,
  overlayBackdrop: ke,
  slideOut: qe,
  slideIn: Fe
}, Ke = (e) => {
  const {
    aside: t,
    children: n,
    minAsideWidth: s = 120,
    maxAsideWidth: r = 480,
    defaultMobileView: o = "main",
    mobileBreakpoint: i = 768,
    mobileSidebarMode: a = "fullscreen",
    mobileOverlayMaxWidth: c = 320,
    mobileOverlayDimBackground: f = !0,
    ...R
  } = e, v = {
    minAsideWidth: s,
    maxAsideWidth: r,
    asideId: e.asideId,
    mobileBreakpoint: i,
    mobileSidebarMode: a,
    mobileOverlayMaxWidth: c,
    mobileOverlayDimBackground: f,
    defaultMobileView: o
  }, {
    resizerRef: b,
    containerRef: l,
    viewsContainerRef: u,
    isMobile: h,
    asideWidth: V,
    mobileSidebarWidth: S,
    currentMobileView: N,
    updateMobileView: d
  } = Le(v, e.mobileView, e.onMobileViewChange), C = a === "overlay", w = `${A.base}${h ? ` ${A.mobile}` : ""}${C ? ` ${A.overlay}` : ""}`;
  return /* @__PURE__ */ m(
    "div",
    {
      className: w,
      ref: l,
      "data-sidebar-base": !0,
      style: h ? { "--mobile-sidebar-width": `${S}px` } : void 0,
      children: h ? /* @__PURE__ */ B(_, { children: [
        C && f && /* @__PURE__ */ m(
          "div",
          {
            className: A.overlayBackdrop,
            "data-visible": N === "aside" ? "true" : "false",
            onClick: () => d("main")
          }
        ),
        /* @__PURE__ */ B(
          "div",
          {
            className: A.mobileViewsContainer,
            ref: u,
            style: { viewTransitionName: "sidebar-layout" },
            children: [
              /* @__PURE__ */ m(
                "aside",
                {
                  className: `${A.aside} ${A.mobileView}`,
                  "data-sidebar": "aside",
                  "data-active": N === "aside" ? "true" : "false",
                  "aria-label": v.asideId,
                  id: v.asideId,
                  children: t
                }
              ),
              /* @__PURE__ */ m("main", { className: `${A.main} ${A.mobileView}`, children: n })
            ]
          }
        )
      ] }) : /* @__PURE__ */ B(_, { children: [
        /* @__PURE__ */ m("aside", { className: A.aside, style: { width: V }, "aria-label": v.asideId, id: v.asideId, children: t }),
        /* @__PURE__ */ m(
          "div",
          {
            className: A.resizer,
            ref: b,
            role: "separator",
            "aria-orientation": "vertical",
            tabIndex: 0,
            "aria-label": "resize",
            style: { left: V - 4 }
          }
        ),
        /* @__PURE__ */ m("main", { className: A.main, children: n })
      ] })
    }
  );
};
Ke.displayName = "SidebarLayout";
const _e = "lytbasefvK", Ue = "lythdr", Ze = "lytmaina5F", G = {
  base: _e,
  header: Ue,
  main: Ze
}, Ge = ({ header: e, children: t }) => /* @__PURE__ */ B("div", { className: G.base, children: [
  /* @__PURE__ */ m("header", { className: G.header, children: e }),
  /* @__PURE__ */ m("div", { className: G.main, children: t })
] });
Ge.displayName = "HeaderMainLayout";
const Je = "lytautsiz", Qe = "lytbody", se = {
  autoSizer: Je,
  body: Qe
}, et = (e) => {
  const t = y.useRef(null), [n] = ze(t);
  return /* @__PURE__ */ m("div", { ref: t, className: se.autoSizer, children: /* @__PURE__ */ m("div", { className: se.body, children: n && e.children(n) }) });
};
et.displayName = "AutoSizer";
const tt = "lytbasebSr", nt = "lythdrTR2", rt = "lytmainzoo", st = "lytftr", it = "lytctn", k = {
  base: tt,
  header: nt,
  main: rt,
  footer: st,
  content: it
}, ot = ({
  header: e,
  children: t,
  footer: n
}) => /* @__PURE__ */ B("div", { className: k.base, children: [
  e && /* @__PURE__ */ m("header", { className: k.header, children: e }),
  /* @__PURE__ */ m("main", { className: k.main, children: t }),
  n && /* @__PURE__ */ m("footer", { className: k.footer, children: n })
] }), at = ({ children: e }) => /* @__PURE__ */ m("div", { className: k.content, children: e });
ot.Content = at;
const ct = ({ source: e, className: t }) => {
  const n = I.useRef(null);
  if (Xe(() => {
    const s = n.current;
    if (s)
      return e instanceof HTMLVideoElement || e instanceof HTMLImageElement || e instanceof HTMLCanvasElement || e instanceof HTMLObjectElement || e instanceof HTMLIFrameElement ? (s.appendChild(e), () => {
        s.contains(e) && s.removeChild(e);
      }) : () => {
      };
  }, [e]), typeof e == "string")
    return /* @__PURE__ */ m("img", { src: e, className: t });
  if (typeof e == "object" && "src" in e && typeof e.src == "string") {
    const s = "alt" in e && typeof e.alt == "string" ? e.alt : "";
    return /* @__PURE__ */ m("img", { src: e.src, alt: s, className: t });
  }
  return /* @__PURE__ */ m("div", { ref: n, className: t, children: I.isValidElement(e) ? I.cloneElement(e, {}) : /* @__PURE__ */ m("div", { className: t, children: "Unsupported media type" }) });
}, lt = () => {
  const [e, t] = I.useState(0);
  return I.useEffect(() => {
    if (typeof window > "u")
      return;
    const n = () => {
      t(window.scrollY);
    };
    return window.addEventListener("scroll", n), () => window.removeEventListener("scroll", n);
  }, []), e;
}, ee = typeof window < "u" ? I.useLayoutEffect : I.useEffect, J = /* @__PURE__ */ new Map(), ut = (e) => {
  var s, r, o;
  const t = "ovs-";
  if (J.has(t))
    return J.get(t);
  const n = new (o = class {
    constructor() {
      H(this, s, /* @__PURE__ */ new Map());
      H(this, r, new ResizeObserver((i, a) => {
        i.forEach((c) => {
          const f = L(this, s).get(c.target);
          f && f(c, a);
        });
      }));
    }
    observe(i, a) {
      return L(this, s).set(i, a), L(this, r).observe(i), () => {
        L(this, s).delete(i), L(this, r).unobserve(i);
      };
    }
  }, s = new WeakMap(), r = new WeakMap(), o)();
  return J.set(t, n), n;
};
function U(e, { box: t }) {
  const [n, s] = I.useState(null);
  I.useEffect(() => e.current ? ut().observe(e.current, (i, a) => {
    s(i);
  }) : void 0, [t, e.current]);
  const r = I.useMemo(() => {
    var o;
    if (n)
      if (((o = n.borderBoxSize) == null ? void 0 : o.length) > 0) {
        const i = n.borderBoxSize[0];
        return new DOMRect(0, 0, i.inlineSize, i.blockSize);
      } else
        return n.contentRect;
  }, [n]);
  return { entry: n, rect: r };
}
const dt = "lytbaseSh4", ht = "lythdri1w", mt = "lytcover", ft = "lytbody7_6", F = {
  base: dt,
  header: ht,
  cover: mt,
  body: ft
}, vt = ({ cover: e, children: t }) => {
  const n = y.useRef(null), s = y.useRef(null), r = lt(), o = y.useRef(r);
  o.current = r;
  const i = y.useRef(void 0), { rect: a } = U(n, {});
  return Object.is(i.current, a) || (i.current = a), ee(() => {
    const c = n.current, f = s.current;
    if (!f || !c)
      return;
    let R = Number.NaN, v;
    const b = () => {
      const u = i.current;
      if (!u)
        return;
      const h = u.height - o.current;
      h !== R && (f.style.opacity = "1", f.style.height = `${h}px`, R = h), (u.x >= 0 || u.y >= 0 || u.width > 0) && v !== u && (f.style.left = `${u.x}px`, f.style.top = `${u.y}px`, f.style.width = `${u.width}px`, v = u);
    };
    let l = requestAnimationFrame(function u() {
      b(), l = requestAnimationFrame(u);
    });
    return () => {
      cancelAnimationFrame(l);
    };
  }, []), /* @__PURE__ */ B("div", { className: F.base, children: [
    /* @__PURE__ */ m("div", { className: F.cover, ref: s, children: /* @__PURE__ */ m(ct, { source: e }) }),
    /* @__PURE__ */ m("div", { ref: n, className: F.header, children: /* @__PURE__ */ m("div", { className: F.body, children: t }) })
  ] });
};
vt.displayName = "StickyHeader";
const wt = "lytpage", bt = "lytline", yt = "lytghost", q = {
  page: wt,
  line: bt,
  ghost: yt
}, pt = () => {
  let e = 0;
  const t = /* @__PURE__ */ new Map();
  return (n) => {
    if (n === void 0)
      return;
    if (t.has(n))
      return t.get(n);
    const s = e++;
    return t.set(n, s), s;
  };
}, Mt = pt(), Q = /* @__PURE__ */ new Map(), St = (e) => {
  var s, r, o;
  const t = `ovs-threshold:${e.threshold}-rootMargin:${e.rootMargin}-root:${Mt(e.root)}`;
  if (Q.has(t))
    return Q.get(t);
  const n = new (o = class {
    constructor() {
      H(this, s, /* @__PURE__ */ new Map());
      H(this, r, new IntersectionObserver((i) => {
        i.forEach((a) => {
          const c = L(this, s).get(a.target);
          c && c(a);
        });
      }, e));
    }
    observe(i, a) {
      return L(this, s).set(i, a), L(this, r).observe(i), () => {
        L(this, s).delete(i), L(this, r).unobserve(i);
      };
    }
  }, s = new WeakMap(), r = new WeakMap(), o)();
  return Q.set(t, n), n;
}, ie = Object.freeze({
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
});
function ce(e, { threshold: t = 0, rootMargin: n = "0px", root: s = null }) {
  const [r, o] = I.useState(null);
  return x(() => e.current ? St({
    threshold: t,
    rootMargin: n,
    root: s
  }).observe(e.current, (a) => {
    o({
      isIntersecting: a.isIntersecting,
      boundingClientRect: a.boundingClientRect,
      intersectionRatio: a.intersectionRatio,
      intersectionRect: a.intersectionRect,
      rootBounds: a.rootBounds,
      target: a.target,
      time: a.time
    });
  }) : void 0, [t, n, s, e.current]), I.useMemo(() => ({
    isIntersecting: (r == null ? void 0 : r.isIntersecting) ?? !1,
    boundingClientRect: (r == null ? void 0 : r.boundingClientRect) ?? ie,
    intersectionRatio: (r == null ? void 0 : r.intersectionRatio) ?? 0,
    intersectionRect: (r == null ? void 0 : r.intersectionRect) ?? ie,
    rootBounds: (r == null ? void 0 : r.rootBounds) ?? null,
    target: (r == null ? void 0 : r.target) ?? e.current,
    time: (r == null ? void 0 : r.time) ?? 0
  }), [r]);
}
const Z = y.createContext(
  new Proxy(
    {},
    {
      get: () => {
        throw new Error("Context not initialized");
      }
    }
  )
);
Z.displayName = "ParavirtualScrollContext";
const Ct = y.memo(
  ({
    children: e,
    direction: t = "vertical",
    chunkSize: n = 1
  }) => {
    const [s, r] = y.useState(() => ({
      cache: /* @__PURE__ */ new Map(),
      offsets: [],
      totalSize: 0
    })), o = y.useCallback((l, u) => {
      r((h) => {
        if (h.cache.get(l) === u)
          return h;
        const S = new Map(h.cache);
        S.set(l, u);
        const N = [], d = Array.from(S.keys()).reduce((C, w) => {
          const z = S.get(w) ?? 0;
          return N[w] = C, C += z, C;
        }, 0);
        return {
          cache: S,
          offsets: N,
          totalSize: d
        };
      });
    }, []), i = y.useMemo(() => {
      const l = {
        position: "relative"
      };
      return t === "vertical" ? l.minHeight = s.totalSize : (l.minWidth = s.totalSize, l.display = "flex"), l;
    }, [s.totalSize, t]), a = y.useRef(null), [c, f] = y.useState(null);
    y.useEffect(() => {
      if (!a.current) return;
      let l = a.current.parentElement;
      for (; l; ) {
        const u = window.getComputedStyle(l), h = u.overflow + u.overflowY + u.overflowX;
        if (h.includes("auto") || h.includes("scroll")) {
          f(l);
          return;
        }
        l = l.parentElement;
      }
      f(null);
    }, []);
    const R = y.useMemo(() => ({
      dimensionCache: s.cache,
      offsets: s.offsets,
      updateDimension: o,
      scrollContainer: c,
      direction: t,
      chunkSize: n
    }), [s.cache, s.offsets, o, c, t, n]), v = y.useMemo(() => y.Children.toArray(e), [e]), b = y.useMemo(() => {
      if (n <= 1)
        return v.map((u, h) => ({ children: [u], chunkIndex: h }));
      const l = [];
      for (let u = 0; u < v.length; u += n)
        l.push({
          children: v.slice(u, u + n),
          chunkIndex: Math.floor(u / n)
        });
      return l;
    }, [v, n]);
    return /* @__PURE__ */ m("div", { className: q.page, style: i, ref: a, children: /* @__PURE__ */ m(Z.Provider, { value: R, children: b.map((l) => /* @__PURE__ */ m(le, { chunkIndex: l.chunkIndex, children: l.children }, l.chunkIndex)) }) });
  }
);
Ct.displayName = "ParavirtualScroll";
const le = y.memo(({ children: e, chunkIndex: t }) => {
  const { dimensionCache: n, updateDimension: s, offsets: r, scrollContainer: o, direction: i, chunkSize: a } = y.useContext(Z), c = y.useRef(null), { isIntersecting: f } = ce(c, {
    rootMargin: "100px",
    threshold: 0,
    root: o
  }), R = U(c, {});
  ee(() => {
    if (!R.rect || !f)
      return;
    const h = i === "vertical" ? R.rect.height : R.rect.width;
    s(t, h);
  }, [R.rect, f, i, t, s]);
  const v = y.useMemo(() => {
    if (f)
      return {};
    const h = n.get(t);
    return typeof h != "number" ? {} : i === "vertical" ? {
      height: h
    } : {
      width: h
    };
  }, [n, f, t, i]), b = n.has(t), l = f || !b, u = y.useMemo(() => {
    const h = r[t], V = {
      opacity: b ? 1 : 0
    };
    return i === "vertical" ? (V.top = h, V.width = "100%") : (V.left = h, V.height = "100%"), V;
  }, [b, t, r, i]);
  return /* @__PURE__ */ m("div", { ref: c, style: u, className: q.line, children: l ? /* @__PURE__ */ m(_, { children: a <= 1 ? e[0] : e.map((h, V) => /* @__PURE__ */ m(y.Fragment, { children: h }, V)) }) : /* @__PURE__ */ m("div", { className: q.ghost, style: v }) });
});
le.displayName = "ParavirtualScrollChunk";
const Rt = y.memo(({ children: e, index: t }) => {
  const { dimensionCache: n, updateDimension: s, offsets: r, scrollContainer: o, direction: i } = y.useContext(Z), a = y.useRef(null), { isIntersecting: c } = ce(a, {
    rootMargin: "100px",
    threshold: 0,
    root: o
  }), f = U(a, {});
  ee(() => {
    if (!f.rect || !c)
      return;
    const u = i === "vertical" ? f.rect.height : f.rect.width;
    s(t, u);
  }, [f.rect, c, i, t, s]);
  const R = y.useMemo(() => {
    if (c)
      return {};
    const u = n.get(t);
    return typeof u != "number" ? {} : i === "vertical" ? {
      height: u
    } : {
      width: u
    };
  }, [n, c, t, i]), v = n.has(t), b = c || !v, l = y.useMemo(() => {
    const u = r[t], h = {
      opacity: v ? 1 : 0
    };
    return i === "vertical" ? (h.top = u, h.width = "100%") : (h.left = u, h.height = "100%"), h;
  }, [v, t, r, i]);
  return /* @__PURE__ */ m("div", { ref: a, style: l, className: q.line, children: b ? /* @__PURE__ */ m(_, { children: e }) : /* @__PURE__ */ m("div", { className: q.ghost, style: R }) });
});
Rt.displayName = "ParavirtualScrollItem";
const Vt = "lytcnt", Nt = "lytcontrols", Wt = "lytviewscnt", $t = "lytview", K = {
  container: Vt,
  controls: Nt,
  viewsContainer: Wt,
  view: $t
}, zt = I.memo(({
  items: e,
  defaultSelected: t = 0,
  onViewChange: n,
  header: s,
  currentIndex: r,
  controlled: o = !1
}) => {
  const [i, a] = P(t), c = o && r !== void 0 ? r : i, f = E(null), R = E(null), v = E(!1), b = E(null);
  x(() => {
    const d = document.body.style.overflowX;
    return document.body.style.overflowX = "hidden", () => {
      document.body.style.overflowX = d;
    };
  }, []);
  const l = $((d, C = !0) => {
    if (!R.current || v.current) return;
    const w = R.current, z = -d * window.innerWidth;
    C ? (v.current = !0, w.style.transition = "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)", w.style.transform = `translateX(${z}px)`, setTimeout(() => {
      v.current = !1, w && (w.style.transition = "");
    }, 300)) : (w.style.transition = "", w.style.transform = `translateX(${z}px)`);
  }, []);
  x(() => {
    l(c, !1);
  }, [l, c]);
  const u = $((d) => {
    o || a(d);
  }, [o]), h = $(
    (d) => {
      if (v.current) return;
      const C = d.touches[0];
      b.current = {
        startX: C.clientX,
        startY: C.clientY,
        currentX: C.clientX,
        isDragging: !1,
        direction: null
      };
    },
    []
  ), V = $(
    (d) => {
      if (!b.current || !R.current || v.current) return;
      const C = d.touches[0], w = C.clientX - b.current.startX, z = C.clientY - b.current.startY;
      if (b.current.currentX = C.clientX, !b.current.direction && (Math.abs(w) > 8 || Math.abs(z) > 8) && (b.current.direction = Math.abs(w) > Math.abs(z) ? "horizontal" : "vertical", b.current.direction === "horizontal" && (b.current.isDragging = !0)), b.current.direction === "horizontal" && b.current.isDragging) {
        d.preventDefault();
        const p = R.current, W = -c * window.innerWidth;
        let X = w;
        (c === 0 && w > 0 || c === e.length - 1 && w < 0) && (X = w * 0.25), p.style.transform = `translateX(${W + X}px)`;
      }
    },
    [c, e.length]
  ), S = $(() => {
    if (!b.current || !b.current.isDragging || v.current) {
      b.current = null;
      return;
    }
    const d = b.current.currentX - b.current.startX, C = window.innerWidth * 0.25;
    let w = c;
    Math.abs(d) > C && (d > 0 && c > 0 ? w = c - 1 : d < 0 && c < e.length - 1 && (w = c + 1)), u(w), l(w, !0), w !== c && (n == null || n(w)), b.current = null;
  }, [c, e.length, l, n, u]);
  x(() => {
    const d = f.current;
    if (d)
      return d.addEventListener("touchstart", h, { passive: !0 }), d.addEventListener("touchmove", V, { passive: !1 }), d.addEventListener("touchend", S, { passive: !0 }), d.addEventListener("touchcancel", S, { passive: !0 }), () => {
        d.removeEventListener("touchstart", h), d.removeEventListener("touchmove", V), d.removeEventListener("touchend", S), d.removeEventListener("touchcancel", S);
      };
  }, [h, V, S]);
  const N = ae(() => e.map((d, C) => {
    const w = d.component, z = C === c, p = Math.abs(C - c) <= 1;
    return /* @__PURE__ */ m("div", { className: K.view, "aria-hidden": !z, children: p && w ? /* @__PURE__ */ m(w, {}) : null }, d.key || C);
  }), [e, c]);
  return /* @__PURE__ */ B("div", { ref: f, className: K.container, children: [
    s && /* @__PURE__ */ m("div", { className: K.controls, children: s }),
    /* @__PURE__ */ m("div", { ref: R, className: K.viewsContainer, children: N })
  ] });
});
zt.displayName = "ViewSwitcher";
const It = (e) => {
  const [t, n] = P(() => typeof window < "u" ? window.innerWidth < e : !1);
  return x(() => {
    const s = () => {
      n(window.innerWidth < e);
    };
    return s(), window.addEventListener("resize", s), () => window.removeEventListener("resize", s);
  }, [e]), t;
}, Xt = (e) => {
  const [t, n] = P(e.defaultView), s = e.controlled !== void 0, r = s ? e.controlled ?? e.defaultView : t, o = $((i) => {
    var c;
    const a = e.hasMenu ? -1 : 0;
    i < a || i >= e.viewCount || i !== r && (s || n(i), (c = e.onChange) == null || c.call(e, i));
  }, [s, r, e]);
  return {
    activeViewIndex: r,
    setActiveViewIndex: o
  };
}, gt = (e) => {
  const t = E(null), n = E(!1), s = $((r, o = !0) => {
    if (!t.current) return;
    let i;
    if (e.dynamicSizing && e.getViewOffset && !e.isMobile)
      i = e.getViewOffset(r);
    else {
      const a = e.getViewWidth(), c = e.isMobile && e.hasMenu ? 1 : 0;
      i = r === -1 ? 0 : (r + c) * a;
    }
    n.current = !0, t.current.scrollTo({
      left: i,
      behavior: "auto"
      // Always instant to avoid bounce
    }), setTimeout(() => {
      n.current = !1;
    }, 100);
  }, [e.dynamicSizing, e.getViewOffset, e.isMobile, e.hasMenu, e.getViewWidth]);
  return x(() => {
    t.current && s(e.activeIndex, !1);
  }, [e.activeIndex, s]), x(() => {
    const r = t.current;
    if (!r) return;
    const o = () => {
      if (!n.current && e.isMobile && e.hasMenu && e.onMenuProgress) {
        const i = r.scrollLeft;
        e.getViewWidth();
        const a = Math.min(window.innerWidth * 0.8, 320);
        if (i < a) {
          const c = Math.max(0, (a - i) / a);
          e.onMenuProgress(c);
        } else
          e.onMenuProgress(0);
      }
    };
    return r.addEventListener("scroll", o, { passive: !0 }), () => {
      r.removeEventListener("scroll", o);
    };
  }, [e]), {
    scrollContainerRef: t,
    scrollToIndex: s
  };
}, Et = (e) => {
  const t = E(null), [n, s] = y.useState(0), r = It(e.desktopBreakpoint), { activeViewIndex: o, setActiveViewIndex: i } = Xt({
    viewCount: e.viewCount,
    controlled: e.controlledActiveView,
    defaultView: e.defaultView,
    onChange: e.onViewChange,
    hasMenu: e.hasMenu
  }), a = $((l) => r ? window.innerWidth : e.defaultViewWidth, [r, e.defaultViewWidth]), { scrollContainerRef: c } = gt({
    activeIndex: o,
    viewCount: e.viewCount,
    isMobile: r,
    hasMenu: e.hasMenu,
    onIndexChange: i,
    getViewWidth: a,
    dynamicSizing: e.dynamicSizing,
    onMenuProgress: s
  }), f = E(null), R = $((l) => {
    i(l);
  }, [i]), v = $((l) => {
  }, []), b = $((l) => {
  }, []);
  return {
    containerRef: t,
    scrollContainerRef: c,
    menuRef: f,
    isMobile: r,
    activeViewIndex: o,
    setActiveViewIndex: R,
    menuProgress: n,
    handleTouchStart: v,
    handleTouchEnd: b
  };
}, xt = "cmpinds", At = "cmpind", oe = {
  indicators: xt,
  indicator: At
}, ue = I.memo(({
  count: e,
  activeIndex: t,
  onIndexChange: n
}) => {
  if (e <= 1) return null;
  const s = I.useMemo(
    () => Array.from({ length: e }, (r, o) => /* @__PURE__ */ m(
      "button",
      {
        className: oe.indicator,
        "data-active": o === t,
        onClick: () => n(o),
        "aria-label": `View ${o + 1}`,
        "aria-current": o === t ? "true" : "false",
        type: "button"
      },
      o
    )),
    [e, t, n]
  );
  return /* @__PURE__ */ m(
    "nav",
    {
      className: oe.indicators,
      role: "tablist",
      "aria-label": "Navigation indicators",
      children: s
    }
  );
});
ue.displayName = "SwipeIndicators";
const Lt = (e) => {
  const [t, n] = P(() => ({
    cache: /* @__PURE__ */ new Map(),
    offsets: [],
    totalWidth: 0
  })), s = $((a, c) => {
    !e.dynamicSizing || e.isMobile || n((f) => {
      if (f.cache.get(a) === c) return f;
      const v = new Map(f.cache);
      v.set(a, c);
      const b = [];
      let l = 0;
      for (let u = 0; u < e.viewCount; u++) {
        b[u] = l;
        const h = v.get(u) ?? e.defaultViewWidth ?? 400;
        l += h;
      }
      return {
        cache: v,
        offsets: b,
        totalWidth: l
      };
    });
  }, [e.dynamicSizing, e.isMobile, e.viewCount, e.defaultViewWidth]), r = $((a) => e.isMobile ? window.innerWidth : !e.dynamicSizing || e.viewCount === 1 ? e.defaultViewWidth ?? 400 : t.cache.get(a) ?? e.defaultViewWidth ?? 400, [e.isMobile, e.dynamicSizing, e.viewCount, e.defaultViewWidth, t.cache]), o = $((a) => {
    if (e.isMobile) {
      const c = e.hasMenu ? 1 : 0;
      return (a + c) * window.innerWidth;
    }
    return !e.dynamicSizing || e.viewCount === 1 ? a * (e.defaultViewWidth ?? 400) : t.offsets[a] ?? 0;
  }, [e.isMobile, e.hasMenu, e.dynamicSizing, e.viewCount, e.defaultViewWidth, t.offsets]), i = ae(() => {
    if (e.isMobile) {
      const a = e.hasMenu ? 1 : 0;
      return (e.viewCount + a) * window.innerWidth;
    }
    return !e.dynamicSizing || e.viewCount === 1 ? e.viewCount * (e.defaultViewWidth ?? 400) : t.totalWidth;
  }, [e.isMobile, e.hasMenu, e.viewCount, e.dynamicSizing, e.defaultViewWidth, t.totalWidth]);
  return {
    updateViewDimension: s,
    getViewWidth: r,
    getViewOffset: o,
    containerWidth: i,
    dimensionCache: t.cache
  };
}, Ot = (e, t, n = !0) => {
  const s = y.useRef(null), { rect: r } = U(s, { box: "border-box" }), o = y.useRef(0);
  return y.useEffect(() => {
    if (!n || !r) return;
    const i = r.width;
    i > 0 && Math.abs(i - o.current) > 1 && (o.current = i, t(e, i));
  }, [r, e, t, n]), { measureRef: s };
}, Dt = "lytcntFwi", Bt = "lytscr", Pt = "lytmobileZxa", Tt = "lytviewoAY", Yt = "lytmenuView", jt = "lytmenuact", Ht = "lytsinvie", kt = "lytdynsiz", qt = "lytmenu", D = {
  container: Dt,
  scrollContainer: Bt,
  mobile: Pt,
  view: Tt,
  menuView: Yt,
  menuActive: jt,
  singleView: Ht,
  dynamicSizing: kt,
  menu: qt
}, Ft = ({
  children: e,
  menu: t,
  menuWidth: n = 280,
  menuVisible: s = !0,
  activeView: r,
  defaultView: o = 0,
  onViewChange: i,
  swipeEnabled: a = !0,
  edgeSwipeWidth: c = 20,
  swipeThreshold: f = 0.25,
  swipeVelocityThreshold: R = 0.5,
  desktopBreakpoint: v = 768,
  className: b,
  viewClassName: l,
  menuClassName: u,
  transitionDuration: h = 150,
  transitionTimingFunction: V = "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  showIndicators: S = !1,
  dynamicSizing: N = !1,
  defaultViewWidth: d = 400
}) => {
  const C = y.Children.toArray(e), w = C.length, z = y.useMemo(
    () => ({
      viewCount: w,
      hasMenu: !!t,
      menuWidth: n,
      menuVisible: s,
      swipeEnabled: a,
      edgeSwipeWidth: c,
      swipeThreshold: f,
      swipeVelocityThreshold: R,
      desktopBreakpoint: v,
      controlledActiveView: r,
      defaultView: o,
      onViewChange: i,
      transitionDuration: h,
      transitionTimingFunction: V,
      dynamicSizing: N,
      defaultViewWidth: d
    }),
    [
      w,
      t,
      n,
      s,
      a,
      c,
      f,
      R,
      v,
      r,
      o,
      i,
      h,
      V,
      N,
      d
    ]
  ), {
    containerRef: p,
    scrollContainerRef: W,
    menuRef: X,
    isMobile: M,
    activeViewIndex: T,
    setActiveViewIndex: g,
    menuProgress: O,
    handleTouchStart: de,
    handleTouchEnd: he
  } = Et(z), { updateViewDimension: me, getViewWidth: fe, getViewOffset: ve, containerWidth: te, dimensionCache: we } = Lt({
    viewCount: w,
    isMobile: M,
    hasMenu: !!t,
    menuWidth: n,
    defaultViewWidth: d,
    dynamicSizing: N
  }), ne = y.useMemo(() => typeof n == "number" ? `${n}px` : n, [n]), be = y.useMemo(
    () => [
      D.container,
      M && D.mobile,
      !M && w === 1 && D.singleView,
      !M && N && D.dynamicSizing,
      M && t && O > 0.1 && D.menuActive,
      b
    ].filter(Boolean).join(" "),
    [M, w, N, t, O, b]
  ), ye = y.useMemo(() => [D.menu, u].filter(Boolean).join(" "), [u]), pe = y.useMemo(
    () => ({
      "--menu-width": ne,
      "--transition-duration": `${h}ms`,
      "--transition-timing": V,
      "--view-count": w,
      "--container-width": N && !M ? `${te}px` : void 0,
      "--menu-progress": O
    }),
    [
      ne,
      h,
      V,
      w,
      te,
      N,
      M,
      O
    ]
  );
  return /* @__PURE__ */ B("div", { ref: p, className: be, style: pe, children: [
    t && !M && s && /* @__PURE__ */ m("div", { ref: X, className: ye, "data-menu": "desktop", children: t }),
    /* @__PURE__ */ B(
      "div",
      {
        ref: W,
        className: D.scrollContainer,
        onTouchStart: a && M ? de : void 0,
        onTouchEnd: a && M ? he : void 0,
        children: [
          t && M && /* @__PURE__ */ m(
            "div",
            {
              className: [D.view, D.menuView, l].filter(Boolean).join(" "),
              "data-view": "menu",
              style: {
                width: "min(80vw, 320px)",
                flexShrink: 0
              },
              children: t
            }
          ),
          C.map((Me, Y) => {
            const { measureRef: Se } = Ot(
              Y,
              me,
              N && !M && w > 1
            ), j = {}, Ce = we.has(Y);
            if (N && !M && w > 1 && Ce) {
              const Re = fe(Y), Ve = ve(Y);
              j.width = Re, j.transform = `translateX(${Ve}px)`, j.position = "absolute", j.left = 0;
            }
            return /* @__PURE__ */ m(
              "div",
              {
                ref: Se,
                className: [D.view, l].filter(Boolean).join(" "),
                "data-view": Y,
                "data-active": Y === T,
                style: j,
                children: Me
              },
              Y
            );
          })
        ]
      }
    ),
    S && /* @__PURE__ */ m(ue, { count: w, activeIndex: Math.max(0, T ?? 0), onIndexChange: g })
  ] });
};
Ft.displayName = "SwipeNavigation";
export {
  ot as AppLayout,
  et as AutoSizer,
  Ge as HeaderMainLayout,
  Ct as ParavirtualScroll,
  xe as ScrollView,
  Ke as SidebarLayout,
  vt as StickyHeader,
  ue as SwipeIndicators,
  Ft as SwipeNavigation,
  zt as ViewSwitcher
};
