import { jsxs as q, Fragment as G, jsx as l } from "react/jsx-runtime";
import { useRef as R, useEffect as k } from "react";
function j({
  id: u = "liquid-glass-filter",
  scale: C = 1.2,
  animationDuration: E = "0.3s"
}) {
  const y = R(null), v = (e, a, z = "circle") => {
    const c = y.current;
    if (!c) return "";
    c.width = e, c.height = a;
    const p = c.getContext("2d");
    if (!p) return "";
    const g = p.createImageData(e, a), d = g.data, D = e / 2, b = a / 2, x = Math.min(D, b);
    for (let t = 0; t < a; t++)
      for (let n = 0; n < e; n++) {
        const f = (t * e + n) * 4;
        let r, s, m;
        if (z === "circle") {
          const o = n - D, i = t - b;
          if (Math.sqrt(o * o + i * i) <= x) {
            const h = o / x, M = i / x, F = Math.sqrt(Math.max(0, 1 - h * h - M * M));
            r = h, s = M, m = F;
          } else
            r = 0, s = 0, m = 1;
        } else {
          const o = Math.min(n, t, e - n - 1, a - t - 1), i = Math.min(o / 20, 1);
          r = (n / e - 0.5) * i, s = (t / a - 0.5) * i, m = Math.sqrt(Math.max(0, 1 - r * r - s * s));
        }
        d[f] = Math.floor((r + 1) * 127.5), d[f + 1] = Math.floor((s + 1) * 127.5), d[f + 2] = Math.floor(m * 255), d[f + 3] = 255;
      }
    return p.putImageData(g, 0, 0), c.toDataURL();
  };
  return k(() => {
    v(256, 256, "circle");
  }, []), /* @__PURE__ */ q(G, { children: [
    /* @__PURE__ */ l("canvas", { ref: y, style: { display: "none" }, width: 256, height: 256 }),
    /* @__PURE__ */ l("svg", { style: { position: "absolute", width: 0, height: 0, pointerEvents: "none" }, "aria-hidden": "true", children: /* @__PURE__ */ l("defs", { children: /* @__PURE__ */ q("filter", { id: u, x: "0%", y: "0%", width: "100%", height: "100%", children: [
      /* @__PURE__ */ l("feTurbulence", { type: "fractalNoise", baseFrequency: "0.008 0.008", numOctaves: "2", seed: "92", result: "noise" }),
      /* @__PURE__ */ l("feGaussianBlur", { in: "noise", stdDeviation: "2", result: "blurred" }),
      /* @__PURE__ */ l("feDisplacementMap", { in: "SourceGraphic", in2: "blurred", scale: "77", xChannelSelector: "R", yChannelSelector: "G" })
    ] }) }) })
  ] });
}
function B(u = "liquid-glass-filter") {
  return {
    style: {
      backdropFilter: `url(#${u}) blur(20px)`,
      WebkitBackdropFilter: `url(#${u}) blur(20px)`
    },
    className: "liquid-glass-element"
  };
}
export {
  j as LiquidGlassFilter,
  B as useLiquidGlass
};
