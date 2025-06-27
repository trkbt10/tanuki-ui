var Q = (e) => {
  throw TypeError(e);
};
var ne = (e, r, t) => r.has(e) || Q("Cannot " + t);
var L = (e, r, t) => (ne(e, r, "read from private field"), t ? t.call(e) : r.get(e)), T = (e, r, t) => r.has(e) ? Q("Cannot add the same private member more than once") : r instanceof WeakSet ? r.add(e) : r.set(e, t);
import { jsx as h, jsxs as W, Fragment as F } from "react/jsx-runtime";
import * as g from "react";
import C, { useLayoutEffect as se, useEffect as A, useRef as O, useState as Y, useCallback as D, useMemo as ie } from "react";
import { u as oe, a as ae } from "./vendor/useMeasure-C5eiiuB0.js";
var ce = typeof window < "u", le = ce ? se : A;
const de = "lytbase", ue = {
  base: de
}, fe = (e) => /* @__PURE__ */ h("div", { className: ue.base, children: e.children });
fe.displayName = "ScrollView";
const he = (e, r) => {
  const [t, s] = Y(r);
  return A(() => {
    if (!e || typeof window > "u") return;
    const n = window.localStorage.getItem(e);
    if (n) {
      const l = Number(n);
      isNaN(l) || s(Math.min(Math.max(l, 120), 480));
    }
  }, [e]), A(() => {
    !e || typeof window > "u" || window.localStorage.setItem(e, String(t));
  }, [t, e]), [t, s];
}, me = (e, r, t) => {
  const s = O(null), n = O(null), l = O(null), c = e.asideId ? `SidebarLayout:width:${e.asideId}` : void 0, [f, d] = he(c, 240), m = O(!1), M = O(null), [v, b] = Y(!1), [o, a] = Y(0), [u, N] = Y(e.defaultMobileView), w = O(null), I = r !== void 0, i = I ? r : u, S = D((p) => {
    I || N(p), t == null || t(p);
  }, [I, t]);
  A(() => {
    const p = () => {
      const R = window.innerWidth;
      b(R < e.mobileBreakpoint), e.mobileSidebarMode === "overlay" ? a(Math.min(e.mobileOverlayMaxWidth, R)) : a(R);
    };
    return p(), window.addEventListener("resize", p), () => window.removeEventListener("resize", p);
  }, [e.mobileBreakpoint, e.mobileSidebarMode, e.mobileOverlayMaxWidth]);
  const y = D((p) => {
    var R;
    if (p.type === "pointerdown")
      m.current = !0, M.current = ((R = document.querySelector("[data-sidebar-base]")) == null ? void 0 : R.getBoundingClientRect()) ?? null;
    else if (p.type === "pointermove" && m.current && M.current) {
      const E = Math.min(Math.max(p.pageX - M.current.left, e.minAsideWidth), e.maxAsideWidth);
      d(E);
    } else p.type === "pointerend" && (m.current = !1, M.current = null);
  }, [e.minAsideWidth, e.maxAsideWidth]);
  oe(s, y);
  const $ = D((p) => {
    var E;
    if (!v) return;
    const R = p.touches[0];
    if (p.type === "touchstart")
      w.current = {
        startX: R.clientX,
        startY: R.clientY,
        currentX: R.clientX,
        isDragging: !1,
        direction: null
      };
    else if (p.type === "touchmove" && w.current) {
      const X = R.clientX - w.current.startX, P = R.clientY - w.current.startY;
      if (w.current.currentX = R.clientX, !w.current.direction && (Math.abs(X) > 8 || Math.abs(P) > 8) && (w.current.direction = Math.abs(X) > Math.abs(P) ? "horizontal" : "vertical", w.current.direction === "horizontal" && (w.current.isDragging = !0)), w.current.direction === "horizontal" && w.current.isDragging && l.current)
        if (p.preventDefault(), e.mobileSidebarMode === "overlay") {
          const x = l.current.querySelector('[data-sidebar="aside"]');
          if (x) {
            let B = i === "aside" ? X : -o + X;
            (i === "aside" && X < 0 || i === "main" && X > 0) && (i === "main" && X < o ? B = -o + X : B = X * 0.25), x.style.transform = `translateX(${Math.max(-o, Math.min(0, B))}px)`;
          }
        } else {
          const x = i === "aside" ? 0 : -o, B = i === "aside" && X > 0 || i === "main" && X < 0 ? X * 0.25 : X;
          l.current.style.transform = `translateX(${x + B}px)`;
        }
    } else if (p.type === "touchend" && ((E = w.current) != null && E.isDragging)) {
      const X = w.current.currentX - w.current.startX, P = window.innerWidth * 0.25;
      if (Math.abs(X) > P && (X > 0 && i === "main" ? S("aside") : X < 0 && i === "aside" && S("main")), l.current)
        if (e.mobileSidebarMode === "overlay") {
          const x = l.current.querySelector('[data-sidebar="aside"]');
          x && (x.style.transition = "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)", x.style.transform = i === "aside" ? "translateX(0)" : "translateX(-100%)", setTimeout(() => {
            x && (x.style.transition = "");
          }, 300));
        } else {
          const x = i === "aside" ? 0 : -o;
          l.current.style.transition = "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)", l.current.style.transform = `translateX(${x}px)`, setTimeout(() => {
            l.current && (l.current.style.transition = "");
          }, 300);
        }
      w.current = null;
    }
  }, [v, i, o, S]);
  return A(() => {
    const p = n.current;
    if (!p) return;
    const R = ["touchstart", "touchmove", "touchend", "touchcancel"];
    return R.forEach((E) => {
      p.addEventListener(E, $, { passive: E === "touchstart" });
    }), () => {
      R.forEach((E) => {
        p.removeEventListener(E, $);
      });
    };
  }, [$]), A(() => {
    if (!(!l.current || !v))
      if (e.mobileSidebarMode === "overlay") {
        const p = l.current.querySelector('[data-sidebar="aside"]');
        p && p.setAttribute("data-active", i === "aside" ? "true" : "false");
      } else {
        const p = i === "aside" ? 0 : -o;
        l.current.style.transform = `translateX(${p}px)`;
      }
  }, [i, v, o, e.mobileSidebarMode]), {
    // Refs
    resizerRef: s,
    containerRef: n,
    viewsContainerRef: l,
    // State
    isMobile: v,
    asideWidth: f,
    mobileSidebarWidth: o,
    currentMobileView: i,
    updateMobileView: S,
    // Config
    config: e
  };
}, ve = "lytbaseE4I", be = "lytaside", ye = "lytrsz", pe = "lytmain", we = "lytmobile", ge = "lytmobvie", Se = "lytmobviepsf", Me = "lytovr", Re = "lytovrbdr", Ne = "lytsliout", Xe = "lytslide-in", z = {
  base: ve,
  aside: be,
  resizer: ye,
  main: pe,
  mobile: we,
  mobileViewsContainer: ge,
  mobileView: Se,
  overlay: Me,
  overlayBackdrop: Re,
  slideOut: Ne,
  slideIn: Xe
}, $e = (e) => {
  const {
    aside: r,
    children: t,
    minAsideWidth: s = 120,
    maxAsideWidth: n = 480,
    defaultMobileView: l = "main",
    mobileBreakpoint: c = 768,
    mobileSidebarMode: f = "fullscreen",
    mobileOverlayMaxWidth: d = 320,
    mobileOverlayDimBackground: m = !0,
    ...M
  } = e, v = {
    minAsideWidth: s,
    maxAsideWidth: n,
    asideId: e.asideId,
    mobileBreakpoint: c,
    mobileSidebarMode: f,
    mobileOverlayMaxWidth: d,
    mobileOverlayDimBackground: m,
    defaultMobileView: l
  }, {
    resizerRef: b,
    containerRef: o,
    viewsContainerRef: a,
    isMobile: u,
    asideWidth: N,
    mobileSidebarWidth: w,
    currentMobileView: I,
    updateMobileView: i
  } = me(v, e.mobileView, e.onMobileViewChange), S = f === "overlay", y = `${z.base}${u ? ` ${z.mobile}` : ""}${S ? ` ${z.overlay}` : ""}`;
  return /* @__PURE__ */ h(
    "div",
    {
      className: y,
      ref: o,
      "data-sidebar-base": !0,
      style: u ? { "--mobile-sidebar-width": `${w}px` } : void 0,
      children: u ? /* @__PURE__ */ W(F, { children: [
        S && m && /* @__PURE__ */ h(
          "div",
          {
            className: z.overlayBackdrop,
            "data-visible": I === "aside" ? "true" : "false",
            onClick: () => i("main")
          }
        ),
        /* @__PURE__ */ W(
          "div",
          {
            className: z.mobileViewsContainer,
            ref: a,
            style: { viewTransitionName: "sidebar-layout" },
            children: [
              /* @__PURE__ */ h(
                "aside",
                {
                  className: `${z.aside} ${z.mobileView}`,
                  "data-sidebar": "aside",
                  "data-active": I === "aside" ? "true" : "false",
                  "aria-label": v.asideId,
                  id: v.asideId,
                  children: r
                }
              ),
              /* @__PURE__ */ h("main", { className: `${z.main} ${z.mobileView}`, children: t })
            ]
          }
        )
      ] }) : /* @__PURE__ */ W(F, { children: [
        /* @__PURE__ */ h("aside", { className: z.aside, style: { width: N }, "aria-label": v.asideId, id: v.asideId, children: r }),
        /* @__PURE__ */ h(
          "div",
          {
            className: z.resizer,
            ref: b,
            role: "separator",
            "aria-orientation": "vertical",
            tabIndex: 0,
            "aria-label": "resize",
            style: { left: N - 4 }
          }
        ),
        /* @__PURE__ */ h("main", { className: z.main, children: t })
      ] })
    }
  );
};
$e.displayName = "SidebarLayout";
const Ce = "lytbasefvK", Ee = "lythdr", xe = "lytmaina5F", K = {
  base: Ce,
  header: Ee,
  main: xe
}, ze = ({ header: e, children: r }) => /* @__PURE__ */ W("div", { className: K.base, children: [
  /* @__PURE__ */ h("header", { className: K.header, children: e }),
  /* @__PURE__ */ h("div", { className: K.main, children: r })
] });
ze.displayName = "HeaderMainLayout";
const Ie = "lytautsiz", Le = "lytbody", Z = {
  autoSizer: Ie,
  body: Le
}, Oe = (e) => {
  const r = g.useRef(null), [t] = ae(r);
  return /* @__PURE__ */ h("div", { ref: r, className: Z.autoSizer, children: /* @__PURE__ */ h("div", { className: Z.body, children: t && e.children(t) }) });
};
Oe.displayName = "AutoSizer";
const Ae = "lytbasebSr", De = "lythdrTR2", We = "lytmainzoo", Be = "lytftr", Te = "lytctn", V = {
  base: Ae,
  header: De,
  main: We,
  footer: Be,
  content: Te
}, Ve = ({
  header: e,
  children: r,
  footer: t
}) => /* @__PURE__ */ W("div", { className: V.base, children: [
  e && /* @__PURE__ */ h("header", { className: V.header, children: e }),
  /* @__PURE__ */ h("main", { className: V.main, children: r }),
  t && /* @__PURE__ */ h("footer", { className: V.footer, children: t })
] }), Ye = ({ children: e }) => /* @__PURE__ */ h("div", { className: V.content, children: e });
Ve.Content = Ye;
const He = ({ source: e, className: r }) => {
  const t = C.useRef(null);
  if (le(() => {
    const s = t.current;
    if (s)
      return e instanceof HTMLVideoElement || e instanceof HTMLImageElement || e instanceof HTMLCanvasElement || e instanceof HTMLObjectElement || e instanceof HTMLIFrameElement ? (s.appendChild(e), () => {
        s.contains(e) && s.removeChild(e);
      }) : () => {
      };
  }, [e]), typeof e == "string")
    return /* @__PURE__ */ h("img", { src: e, className: r });
  if (typeof e == "object" && "src" in e && typeof e.src == "string") {
    const s = "alt" in e && typeof e.alt == "string" ? e.alt : "";
    return /* @__PURE__ */ h("img", { src: e.src, alt: s, className: r });
  }
  return /* @__PURE__ */ h("div", { ref: t, className: r, children: C.isValidElement(e) ? C.cloneElement(e, {}) : /* @__PURE__ */ h("div", { className: r, children: "Unsupported media type" }) });
}, Pe = () => {
  const [e, r] = C.useState(0);
  return C.useEffect(() => {
    if (typeof window > "u")
      return;
    const t = () => {
      r(window.scrollY);
    };
    return window.addEventListener("scroll", t), () => window.removeEventListener("scroll", t);
  }, []), e;
}, G = typeof window < "u" ? C.useLayoutEffect : C.useEffect, _ = /* @__PURE__ */ new Map(), je = (e) => {
  var s, n, l;
  const r = "ovs-";
  if (_.has(r))
    return _.get(r);
  const t = new (l = class {
    constructor() {
      T(this, s, /* @__PURE__ */ new Map());
      T(this, n, new ResizeObserver((c, f) => {
        c.forEach((d) => {
          const m = L(this, s).get(d.target);
          m && m(d, f);
        });
      }));
    }
    observe(c, f) {
      return L(this, s).set(c, f), L(this, n).observe(c), () => {
        L(this, s).delete(c), L(this, n).unobserve(c);
      };
    }
  }, s = new WeakMap(), n = new WeakMap(), l)();
  return _.set(r, t), t;
};
function J(e, { box: r }) {
  const [t, s] = C.useState(null);
  C.useEffect(() => e.current ? je().observe(e.current, (c, f) => {
    s(c);
  }) : void 0, [r, e.current]);
  const n = C.useMemo(() => {
    var l;
    if (t)
      if (((l = t.borderBoxSize) == null ? void 0 : l.length) > 0) {
        const c = t.borderBoxSize[0];
        return new DOMRect(0, 0, c.inlineSize, c.blockSize);
      } else
        return t.contentRect;
  }, [t]);
  return { entry: t, rect: n };
}
const ke = "lytbaseSh4", Fe = "lythdri1w", qe = "lytcover", Ke = "lytbody7_6", j = {
  base: ke,
  header: Fe,
  cover: qe,
  body: Ke
}, _e = ({ cover: e, children: r }) => {
  const t = g.useRef(null), s = g.useRef(null), n = Pe(), l = g.useRef(n);
  l.current = n;
  const c = g.useRef(void 0), { rect: f } = J(t, {});
  return Object.is(c.current, f) || (c.current = f), G(() => {
    const d = t.current, m = s.current;
    if (!m || !d)
      return;
    let M = Number.NaN, v;
    const b = () => {
      const a = c.current;
      if (!a)
        return;
      const u = a.height - l.current;
      u !== M && (m.style.opacity = "1", m.style.height = `${u}px`, M = u), (a.x >= 0 || a.y >= 0 || a.width > 0) && v !== a && (m.style.left = `${a.x}px`, m.style.top = `${a.y}px`, m.style.width = `${a.width}px`, v = a);
    };
    let o = requestAnimationFrame(function a() {
      b(), o = requestAnimationFrame(a);
    });
    return () => {
      cancelAnimationFrame(o);
    };
  }, []), /* @__PURE__ */ W("div", { className: j.base, children: [
    /* @__PURE__ */ h("div", { className: j.cover, ref: s, children: /* @__PURE__ */ h(He, { source: e }) }),
    /* @__PURE__ */ h("div", { ref: t, className: j.header, children: /* @__PURE__ */ h("div", { className: j.body, children: r }) })
  ] });
};
_e.displayName = "StickyHeader";
const Ue = "lytpage", Ge = "lytline", Je = "lytghost", H = {
  page: Ue,
  line: Ge,
  ghost: Je
}, Qe = () => {
  let e = 0;
  const r = /* @__PURE__ */ new Map();
  return (t) => {
    if (t === void 0)
      return;
    if (r.has(t))
      return r.get(t);
    const s = e++;
    return r.set(t, s), s;
  };
}, Ze = Qe(), U = /* @__PURE__ */ new Map(), et = (e) => {
  var s, n, l;
  const r = `ovs-threshold:${e.threshold}-rootMargin:${e.rootMargin}-root:${Ze(e.root)}`;
  if (U.has(r))
    return U.get(r);
  const t = new (l = class {
    constructor() {
      T(this, s, /* @__PURE__ */ new Map());
      T(this, n, new IntersectionObserver((c) => {
        c.forEach((f) => {
          const d = L(this, s).get(f.target);
          d && d(f);
        });
      }, e));
    }
    observe(c, f) {
      return L(this, s).set(c, f), L(this, n).observe(c), () => {
        L(this, s).delete(c), L(this, n).unobserve(c);
      };
    }
  }, s = new WeakMap(), n = new WeakMap(), l)();
  return U.set(r, t), t;
}, ee = Object.freeze({
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
});
function te(e, { threshold: r = 0, rootMargin: t = "0px", root: s = null }) {
  const [n, l] = C.useState(null);
  return A(() => e.current ? et({
    threshold: r,
    rootMargin: t,
    root: s
  }).observe(e.current, (f) => {
    l({
      isIntersecting: f.isIntersecting,
      boundingClientRect: f.boundingClientRect,
      intersectionRatio: f.intersectionRatio,
      intersectionRect: f.intersectionRect,
      rootBounds: f.rootBounds,
      target: f.target,
      time: f.time
    });
  }) : void 0, [r, t, s, e.current]), C.useMemo(() => ({
    isIntersecting: (n == null ? void 0 : n.isIntersecting) ?? !1,
    boundingClientRect: (n == null ? void 0 : n.boundingClientRect) ?? ee,
    intersectionRatio: (n == null ? void 0 : n.intersectionRatio) ?? 0,
    intersectionRect: (n == null ? void 0 : n.intersectionRect) ?? ee,
    rootBounds: (n == null ? void 0 : n.rootBounds) ?? null,
    target: (n == null ? void 0 : n.target) ?? e.current,
    time: (n == null ? void 0 : n.time) ?? 0
  }), [n]);
}
const q = g.createContext(
  new Proxy(
    {},
    {
      get: () => {
        throw new Error("Context not initialized");
      }
    }
  )
);
q.displayName = "ParavirtualScrollContext";
const tt = g.memo(
  ({
    children: e,
    direction: r = "vertical",
    chunkSize: t = 1
  }) => {
    const [s, n] = g.useState(() => ({
      cache: /* @__PURE__ */ new Map(),
      offsets: [],
      totalSize: 0
    })), l = g.useCallback((o, a) => {
      n((u) => {
        if (u.cache.get(o) === a)
          return u;
        const w = new Map(u.cache);
        w.set(o, a);
        const I = [], i = Array.from(w.keys()).reduce((S, y) => {
          const $ = w.get(y) ?? 0;
          return I[y] = S, S += $, S;
        }, 0);
        return {
          cache: w,
          offsets: I,
          totalSize: i
        };
      });
    }, []), c = g.useMemo(() => {
      const o = {
        position: "relative"
      };
      return r === "vertical" ? o.minHeight = s.totalSize : (o.minWidth = s.totalSize, o.display = "flex"), o;
    }, [s.totalSize, r]), f = g.useRef(null), [d, m] = g.useState(null);
    g.useEffect(() => {
      if (!f.current) return;
      let o = f.current.parentElement;
      for (; o; ) {
        const a = window.getComputedStyle(o), u = a.overflow + a.overflowY + a.overflowX;
        if (u.includes("auto") || u.includes("scroll")) {
          m(o);
          return;
        }
        o = o.parentElement;
      }
      m(null);
    }, []);
    const M = g.useMemo(() => ({
      dimensionCache: s.cache,
      offsets: s.offsets,
      updateDimension: l,
      scrollContainer: d,
      direction: r,
      chunkSize: t
    }), [s.cache, s.offsets, l, d, r, t]), v = g.useMemo(() => g.Children.toArray(e), [e]), b = g.useMemo(() => {
      if (t <= 1)
        return v.map((a, u) => ({ children: [a], chunkIndex: u }));
      const o = [];
      for (let a = 0; a < v.length; a += t)
        o.push({
          children: v.slice(a, a + t),
          chunkIndex: Math.floor(a / t)
        });
      return o;
    }, [v, t]);
    return /* @__PURE__ */ h("div", { className: H.page, style: c, ref: f, children: /* @__PURE__ */ h(q.Provider, { value: M, children: b.map((o) => /* @__PURE__ */ h(re, { chunkIndex: o.chunkIndex, children: o.children }, o.chunkIndex)) }) });
  }
);
tt.displayName = "ParavirtualScroll";
const re = g.memo(({ children: e, chunkIndex: r }) => {
  const { dimensionCache: t, updateDimension: s, offsets: n, scrollContainer: l, direction: c, chunkSize: f } = g.useContext(q), d = g.useRef(null), { isIntersecting: m } = te(d, {
    rootMargin: "100px",
    threshold: 0,
    root: l
  }), M = J(d, {});
  G(() => {
    if (!M.rect || !m)
      return;
    const u = c === "vertical" ? M.rect.height : M.rect.width;
    s(r, u);
  }, [M.rect, m, c, r, s]);
  const v = g.useMemo(() => {
    if (m)
      return {};
    const u = t.get(r);
    return typeof u != "number" ? {} : c === "vertical" ? {
      height: u
    } : {
      width: u
    };
  }, [t, m, r, c]), b = t.has(r), o = m || !b, a = g.useMemo(() => {
    const u = n[r], N = {
      opacity: b ? 1 : 0
    };
    return c === "vertical" ? (N.top = u, N.width = "100%") : (N.left = u, N.height = "100%"), N;
  }, [b, r, n, c]);
  return /* @__PURE__ */ h("div", { ref: d, style: a, className: H.line, children: o ? /* @__PURE__ */ h(F, { children: f <= 1 ? e[0] : e.map((u, N) => /* @__PURE__ */ h(g.Fragment, { children: u }, N)) }) : /* @__PURE__ */ h("div", { className: H.ghost, style: v }) });
});
re.displayName = "ParavirtualScrollChunk";
const rt = g.memo(({ children: e, index: r }) => {
  const { dimensionCache: t, updateDimension: s, offsets: n, scrollContainer: l, direction: c } = g.useContext(q), f = g.useRef(null), { isIntersecting: d } = te(f, {
    rootMargin: "100px",
    threshold: 0,
    root: l
  }), m = J(f, {});
  G(() => {
    if (!m.rect || !d)
      return;
    const a = c === "vertical" ? m.rect.height : m.rect.width;
    s(r, a);
  }, [m.rect, d, c, r, s]);
  const M = g.useMemo(() => {
    if (d)
      return {};
    const a = t.get(r);
    return typeof a != "number" ? {} : c === "vertical" ? {
      height: a
    } : {
      width: a
    };
  }, [t, d, r, c]), v = t.has(r), b = d || !v, o = g.useMemo(() => {
    const a = n[r], u = {
      opacity: v ? 1 : 0
    };
    return c === "vertical" ? (u.top = a, u.width = "100%") : (u.left = a, u.height = "100%"), u;
  }, [v, r, n, c]);
  return /* @__PURE__ */ h("div", { ref: f, style: o, className: H.line, children: b ? /* @__PURE__ */ h(F, { children: e }) : /* @__PURE__ */ h("div", { className: H.ghost, style: M }) });
});
rt.displayName = "ParavirtualScrollItem";
const nt = "lytcnt", st = "lytcontrols", it = "lytviewscnt", ot = "lytview", k = {
  container: nt,
  controls: st,
  viewsContainer: it,
  view: ot
}, at = C.memo(({
  items: e,
  defaultSelected: r = 0,
  onViewChange: t,
  header: s,
  currentIndex: n,
  controlled: l = !1
}) => {
  const [c, f] = Y(r), d = l && n !== void 0 ? n : c, m = O(null), M = O(null), v = O(!1), b = O(null);
  A(() => {
    const i = document.body.style.overflowX;
    return document.body.style.overflowX = "hidden", () => {
      document.body.style.overflowX = i;
    };
  }, []);
  const o = D((i, S = !0) => {
    if (!M.current || v.current) return;
    const y = M.current, $ = -i * window.innerWidth;
    S ? (v.current = !0, y.style.transition = "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)", y.style.transform = `translateX(${$}px)`, setTimeout(() => {
      v.current = !1, y && (y.style.transition = "");
    }, 300)) : (y.style.transition = "", y.style.transform = `translateX(${$}px)`);
  }, []);
  A(() => {
    o(d, !1);
  }, [o, d]);
  const a = D((i) => {
    l || f(i);
  }, [l]), u = D(
    (i) => {
      if (v.current) return;
      const S = i.touches[0];
      b.current = {
        startX: S.clientX,
        startY: S.clientY,
        currentX: S.clientX,
        isDragging: !1,
        direction: null
      };
    },
    []
  ), N = D(
    (i) => {
      if (!b.current || !M.current || v.current) return;
      const S = i.touches[0], y = S.clientX - b.current.startX, $ = S.clientY - b.current.startY;
      if (b.current.currentX = S.clientX, !b.current.direction && (Math.abs(y) > 8 || Math.abs($) > 8) && (b.current.direction = Math.abs(y) > Math.abs($) ? "horizontal" : "vertical", b.current.direction === "horizontal" && (b.current.isDragging = !0)), b.current.direction === "horizontal" && b.current.isDragging) {
        i.preventDefault();
        const p = M.current, R = -d * window.innerWidth;
        let E = y;
        (d === 0 && y > 0 || d === e.length - 1 && y < 0) && (E = y * 0.25), p.style.transform = `translateX(${R + E}px)`;
      }
    },
    [d, e.length]
  ), w = D(() => {
    if (!b.current || !b.current.isDragging || v.current) {
      b.current = null;
      return;
    }
    const i = b.current.currentX - b.current.startX, S = window.innerWidth * 0.25;
    let y = d;
    Math.abs(i) > S && (i > 0 && d > 0 ? y = d - 1 : i < 0 && d < e.length - 1 && (y = d + 1)), a(y), o(y, !0), y !== d && (t == null || t(y)), b.current = null;
  }, [d, e.length, o, t, a]);
  A(() => {
    const i = m.current;
    if (i)
      return i.addEventListener("touchstart", u, { passive: !0 }), i.addEventListener("touchmove", N, { passive: !1 }), i.addEventListener("touchend", w, { passive: !0 }), i.addEventListener("touchcancel", w, { passive: !0 }), () => {
        i.removeEventListener("touchstart", u), i.removeEventListener("touchmove", N), i.removeEventListener("touchend", w), i.removeEventListener("touchcancel", w);
      };
  }, [u, N, w]);
  const I = ie(() => e.map((i, S) => {
    const y = i.component, $ = S === d, p = Math.abs(S - d) <= 1;
    return /* @__PURE__ */ h("div", { className: k.view, "aria-hidden": !$, children: p && y ? /* @__PURE__ */ h(y, {}) : null }, i.key || S);
  }), [e, d]);
  return /* @__PURE__ */ W("div", { ref: m, className: k.container, children: [
    s && /* @__PURE__ */ h("div", { className: k.controls, children: s }),
    /* @__PURE__ */ h("div", { ref: M, className: k.viewsContainer, children: I })
  ] });
});
at.displayName = "ViewSwitcher";
export {
  Ve as AppLayout,
  Oe as AutoSizer,
  ze as HeaderMainLayout,
  tt as ParavirtualScroll,
  fe as ScrollView,
  $e as SidebarLayout,
  _e as StickyHeader,
  at as ViewSwitcher
};
