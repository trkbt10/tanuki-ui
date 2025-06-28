import { jsx as s, jsxs as K, Fragment as O } from "react/jsx-runtime";
import { useState as R, useRef as j, useCallback as m, useEffect as Q } from "react";
const ut = "xtndcntlooptgl", dt = "xtndcntbtn", mt = "xtndcntico", C = {
  loopToggle: ut,
  button: dt,
  icon: mt
}, Ge = ({
  className: a,
  isLooping: n = !1,
  disabled: e = !1,
  size: r = "medium",
  onToggle: x,
  onRangeSelect: o,
  children: p
}) => {
  const [i, f] = R(!1), [k, v] = R(null), N = j(null), h = m(() => {
    e || x == null || x(!n);
  }, [e, n, x]), w = m((l) => {
    if (l.altKey && N.current) {
      l.preventDefault(), f(!0);
      const V = N.current.getBoundingClientRect(), y = l.clientX - V.left;
      v(y);
    }
  }, []), g = m((l) => {
    if (i && k !== null && N.current) {
      const V = N.current.getBoundingClientRect(), y = l.clientX - V.left, L = V.width, $ = Math.min(k, y) / L, X = Math.max(k, y) / L;
      X - $ > 0.05 && (o == null || o($, X));
    }
  }, [i, k, o]), D = m(() => {
    f(!1), v(null);
  }, []);
  return Q(() => {
    if (i)
      return document.addEventListener("mousemove", g), document.addEventListener("mouseup", D), () => {
        document.removeEventListener("mousemove", g), document.removeEventListener("mouseup", D);
      };
  }, [i, g, D]), /* @__PURE__ */ s(
    "div",
    {
      ref: N,
      className: `${C.loopToggle} ${a || ""}`,
      "data-selecting": i,
      children: /* @__PURE__ */ s(
        "button",
        {
          className: C.button,
          onClick: h,
          onMouseDown: w,
          disabled: e,
          "data-size": r,
          "data-looping": n,
          "aria-label": n ? "Disable Loop" : "Enable Loop",
          type: "button",
          title: "Loop (Alt+drag to select range)",
          children: p || /* @__PURE__ */ s(
            "svg",
            {
              viewBox: "0 0 24 24",
              className: C.icon,
              "aria-hidden": "true",
              children: /* @__PURE__ */ s("path", { d: "M12 4V2L8 6l4 4V8c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 17.03 20 15.57 20 14c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v2l4-4-4-4v2z" })
            }
          )
        }
      )
    }
  );
}, ft = "xtndcntmet", vt = "xtndcntbtnvWG", ht = "xtndcnticoKaB", pt = "xtndcntbeat", bt = "xtndcntpulse", xt = "xtndcntsettings", gt = "xtndcntsetrow", yt = "xtndcntinp", $t = "xtndcntclsbtn", q = {
  metronomeToggle: ft,
  button: vt,
  icon: ht,
  beat: pt,
  pulse: bt,
  settings: xt,
  settingRow: gt,
  input: yt,
  closeButton: $t
}, Je = ({
  className: a,
  isActive: n = !1,
  disabled: e = !1,
  size: r = "medium",
  bpm: x = 120,
  timeSignature: o = "4/4",
  onToggle: p,
  onBpmChange: i,
  onTimeSignatureChange: f,
  children: k
}) => {
  const [v, N] = R(!1), [h, w] = R(x.toString()), [g, D] = R(o), l = m(() => {
    e || p == null || p(!n);
  }, [e, n, p]), V = m(($) => {
    $.preventDefault(), !e && N(!v);
  }, [e, v]), y = m(() => {
    const $ = parseInt(h, 10);
    !isNaN($) && $ > 0 && $ <= 999 && (i == null || i($));
  }, [h, i]), L = m(() => {
    /^\d+\/\d+$/.test(g) && (f == null || f(g));
  }, [g, f]);
  return /* @__PURE__ */ K("div", { className: `${q.metronomeToggle} ${a || ""}`, children: [
    /* @__PURE__ */ s(
      "button",
      {
        className: q.button,
        onClick: l,
        onContextMenu: V,
        disabled: e,
        "data-size": r,
        "data-active": n,
        "aria-label": n ? "Disable Metronome" : "Enable Metronome",
        type: "button",
        title: "Metronome (right-click for settings)",
        children: k || /* @__PURE__ */ K(
          "svg",
          {
            viewBox: "0 0 24 24",
            className: q.icon,
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ s("path", { d: "M12 2L4 20h16L12 2zm0 6l4 8H8l4-8z" }),
              n && /* @__PURE__ */ s(
                "circle",
                {
                  cx: "12",
                  cy: "14",
                  r: "2",
                  className: q.beat
                }
              )
            ]
          }
        )
      }
    ),
    v && /* @__PURE__ */ K("div", { className: q.settings, children: [
      /* @__PURE__ */ K("div", { className: q.settingRow, children: [
        /* @__PURE__ */ s("label", { htmlFor: "bpm", children: "BPM:" }),
        /* @__PURE__ */ s(
          "input",
          {
            id: "bpm",
            type: "number",
            min: "1",
            max: "999",
            value: h,
            onChange: ($) => w($.target.value),
            onBlur: y,
            onKeyDown: ($) => $.key === "Enter" && y(),
            className: q.input
          }
        )
      ] }),
      /* @__PURE__ */ K("div", { className: q.settingRow, children: [
        /* @__PURE__ */ s("label", { htmlFor: "timeSig", children: "Time:" }),
        /* @__PURE__ */ s(
          "input",
          {
            id: "timeSig",
            type: "text",
            value: g,
            onChange: ($) => D($.target.value),
            onBlur: L,
            onKeyDown: ($) => $.key === "Enter" && L(),
            className: q.input,
            pattern: "\\d+/\\d+"
          }
        )
      ] }),
      /* @__PURE__ */ s(
        "button",
        {
          className: q.closeButton,
          onClick: () => N(!1),
          "aria-label": "Close settings",
          children: "×"
        }
      )
    ] })
  ] });
}, Mt = "xtndcnttimrul", Nt = "xtndcnttickcnt", kt = "xtndcnttick", Lt = "xtndcntmajtic", Dt = "xtndcntticklbl", wt = "xtndcntbeatvzy", Vt = "xtndcntdownbeat", Bt = "xtndcntmarker", Xt = "xtndcntmar", Kt = "xtndcntcurtim", W = {
  timelineRuler: Mt,
  tickContainer: Nt,
  tick: kt,
  majorTick: Lt,
  tickLabel: Dt,
  beat: wt,
  downbeat: Vt,
  marker: Bt,
  markerLabel: Xt,
  currentTimeIndicator: Kt
}, Oe = ({
  className: a,
  duration: n = 300,
  currentTime: e = 0,
  zoom: r = 1,
  markers: x = [],
  showBeats: o = !0,
  showTime: p = !0,
  bpm: i = 120,
  timeSignature: f = "4/4",
  onSeek: k,
  onMarkerAdd: v,
  onMarkerRemove: N,
  onZoomChange: h,
  children: w
}) => {
  const g = j(null), [D, l] = R(!1), [V, y] = R(0), [L, $] = R(1), X = m((c) => {
    const M = Math.floor(c / 60), F = Math.floor(c % 60), B = Math.floor(c % 1 * 100);
    return `${M}:${F.toString().padStart(2, "0")}.${B.toString().padStart(2, "0")}`;
  }, []), T = m((c) => {
    const M = i / 60;
    return c / M / n * 100;
  }, [i, n]), z = m((c) => {
    if (!g.current) return;
    const M = g.current.getBoundingClientRect(), b = (c.clientX - M.left) / M.width * n;
    k == null || k(b);
  }, [n, k]), I = m((c) => {
    if (!g.current) return;
    const M = g.current.getBoundingClientRect(), B = (c.clientX - M.left) / M.width;
    v == null || v(B);
  }, [v]), S = m((c) => {
    c.shiftKey && (l(!0), y(c.clientX), $(r), c.preventDefault());
  }, [r]), Y = m((c) => {
    if (D) {
      const F = (c.clientX - V) / 100, B = Math.max(0.1, Math.min(10, L + F));
      h == null || h(B);
    }
  }, [D, V, L, h]), t = m(() => {
    l(!1);
  }, []);
  Q(() => {
    if (D)
      return document.addEventListener("mousemove", Y), document.addEventListener("mouseup", t), () => {
        document.removeEventListener("mousemove", Y), document.removeEventListener("mouseup", t);
      };
  }, [D, Y, t]);
  const u = () => {
    const c = [], M = 10 / r, F = Math.floor(n / M);
    for (let B = 0; B <= F; B++) {
      const b = B * M, H = b / n * 100, E = B % 5 === 0;
      c.push(
        /* @__PURE__ */ s(
          "div",
          {
            className: `${W.tick} ${E ? W.majorTick : ""}`,
            style: { left: `${H}%` },
            children: E && p && /* @__PURE__ */ s("span", { className: W.tickLabel, children: X(b) })
          },
          `tick-${B}`
        )
      );
    }
    return c;
  }, d = () => {
    if (!o) return null;
    const c = [], M = i / 60, F = Math.floor(n * M), [B] = f.split("/").map(Number);
    for (let b = 0; b <= F; b++) {
      const H = T(b), E = b % B === 0;
      c.push(
        /* @__PURE__ */ s(
          "div",
          {
            className: `${W.beat} ${E ? W.downbeat : ""}`,
            style: { left: `${H}%` }
          },
          `beat-${b}`
        )
      );
    }
    return c;
  };
  return /* @__PURE__ */ s(
    "div",
    {
      ref: g,
      className: `${W.timelineRuler} ${a || ""}`,
      onClick: z,
      onDoubleClick: I,
      onMouseDown: S,
      "data-dragging": D,
      style: { transform: `scaleX(${r})`, transformOrigin: "left" },
      children: w || /* @__PURE__ */ K(O, { children: [
        /* @__PURE__ */ K("div", { className: W.tickContainer, children: [
          u(),
          d()
        ] }),
        x.map((c) => /* @__PURE__ */ s(
          "div",
          {
            className: W.marker,
            style: {
              left: `${c.position * 100}%`,
              borderColor: c.color || "#ff4081"
            },
            title: c.label,
            onClick: (M) => {
              M.stopPropagation(), N == null || N(c.id);
            },
            children: c.label && /* @__PURE__ */ s("span", { className: W.markerLabel, children: c.label })
          },
          c.id
        )),
        /* @__PURE__ */ s(
          "div",
          {
            className: W.currentTimeIndicator,
            style: { left: `${e / n * 100}%` }
          }
        )
      ] })
    }
  );
}, Ft = "xtndcntpla", Rt = "xtndcntplayheadrm1", St = "xtndcnthdl", Et = "xtndcnttimdis", Z = {
  playheadContainer: Ft,
  playhead: Rt,
  handle: St,
  timeDisplay: Et
}, Qe = ({
  className: a,
  position: n = 0,
  duration: e = 300,
  height: r = "100%",
  color: x = "#2196f3",
  showTime: o = !0,
  scrubSpeed: p = 1,
  onSeek: i,
  onScrub: f,
  children: k
}) => {
  const [v, N] = R(!1), [h, w] = R(!1), [g, D] = R(0), [l, V] = R(0), y = j(null), L = j(null), $ = m((S) => {
    const Y = Math.floor(S / 60), t = Math.floor(S % 60);
    return `${Y}:${t.toString().padStart(2, "0")}`;
  }, []), X = m((S) => {
    S.button === 0 && (N(!0), D(S.clientX), V(n), w(S.shiftKey), S.preventDefault());
  }, [n]), T = m((S) => {
    if (!v || !y.current) return;
    const Y = y.current.getBoundingClientRect(), u = (S.clientX - g) / Y.width;
    let d = l + u * e;
    h && (d = l + u * e * p * 0.1), d = Math.max(0, Math.min(e, d)), h ? f == null || f(d) : i == null || i(d);
  }, [v, g, l, e, h, p, i, f]), z = m(() => {
    N(!1), w(!1);
  }, []);
  Q(() => {
    if (v)
      return document.addEventListener("mousemove", T), document.addEventListener("mouseup", z), document.body.style.cursor = h ? "ew-resize" : "grabbing", () => {
        document.removeEventListener("mousemove", T), document.removeEventListener("mouseup", z), document.body.style.cursor = "auto";
      };
  }, [v, h, T, z]);
  const I = n / e * 100;
  return /* @__PURE__ */ s(
    "div",
    {
      ref: y,
      className: `${Z.playheadContainer} ${a || ""}`,
      style: { height: r },
      children: /* @__PURE__ */ s(
        "div",
        {
          ref: L,
          className: Z.playhead,
          style: {
            left: `${I}%`,
            backgroundColor: x
          },
          onMouseDown: X,
          "data-dragging": v,
          "data-scrubbing": h,
          children: k || /* @__PURE__ */ K(O, { children: [
            /* @__PURE__ */ s("div", { className: Z.handle }),
            o && /* @__PURE__ */ s("div", { className: Z.timeDisplay, children: $(n) })
          ] })
        }
      )
    }
  );
}, Tt = "xtndcntvolfad", Yt = "xtndcnttracklo4", zt = "xtndcntfill", Ht = "xtndcntthumb", It = "xtndcntscaleIF2", Pt = "xtndcntscamar", Ut = "xtndcntscalelbl", jt = "xtndcntvaldisiXm", G = {
  volumeFader: Tt,
  track: Yt,
  fill: zt,
  thumb: Ht,
  scale: It,
  scaleMark: Pt,
  scaleLabel: Ut,
  valueDisplay: jt
};
function st({
  value: a,
  defaultValue: n,
  onChange: e,
  onChangeEnd: r
}) {
  const [x, o] = R(a ?? n), p = a ?? x, i = a !== void 0;
  return {
    value: p,
    setValue: (v) => {
      i || o(v), e == null || e(v);
    },
    setValueEnd: (v) => {
      r == null || r(v);
    },
    isControlled: i
  };
}
function rt({
  onDragStart: a,
  onDragMove: n,
  onDragEnd: e,
  disabled: r = !1,
  cursor: x = "ns-resize"
}) {
  const [o, p] = R(!1), i = m((v) => {
    r || (p(!0), a == null || a(v), v.preventDefault());
  }, [r, a]), f = m((v) => {
    o && (n == null || n(v));
  }, [o, n]), k = m(() => {
    o && (p(!1), e == null || e());
  }, [o, e]);
  return Q(() => {
    if (o)
      return document.addEventListener("mousemove", f), document.addEventListener("mouseup", k), x && (document.body.style.cursor = x), () => {
        document.removeEventListener("mousemove", f), document.removeEventListener("mouseup", k), x && (document.body.style.cursor = "auto");
      };
  }, [o, f, k, x]), {
    isDragging: o,
    handleMouseDown: i
  };
}
function qt({
  key: a,
  callback: n,
  disabled: e = !1,
  preventDefault: r = !0,
  target: x = "document",
  condition: o
}) {
  const p = m((i) => {
    const f = i;
    if (!a || e) return;
    const k = f.target;
    if (k.tagName === "INPUT" || k.tagName === "TEXTAREA") return;
    (f.key.toLowerCase() === a.toLowerCase() || f.code === a || a === "Space" && f.code === "Space") && (!o || o(f)) && (r && f.preventDefault(), n());
  }, [a, n, e, r, o]);
  Q(() => {
    if (a && !e) {
      const i = x === "document" ? document : document.body;
      return i.addEventListener("keydown", p), () => {
        i.removeEventListener("keydown", p);
      };
    }
  }, [a, e, p, x]);
}
const Wt = (a) => a === 0 ? "0 dB" : a > 0 ? `+${a.toFixed(1)} dB` : `${a.toFixed(1)} dB`, At = (a) => a === 0 ? "C" : a > 0 ? `${a}R` : `${Math.abs(a)}L`, Ze = (a) => {
  const n = Math.floor(a / 60), e = Math.floor(a % 60), r = Math.floor(a % 1 * 1e3);
  return `${n.toString().padStart(2, "0")}:${e.toString().padStart(2, "0")}.${r.toString().padStart(3, "0")}`;
}, Ce = (a) => `${a.toFixed(1)} BPM`, tn = (a) => a >= 1e3 ? `${(a / 1e3).toFixed(1)}kHz` : `${a.toFixed(0)}Hz`, en = (a) => `${Math.round(a)}%`, _t = (a, n, e) => (a - n) / (e - n) * 100, Gt = (a, n, e) => a / 100 * (e - n) + n, et = (a, n, e) => Math.max(n, Math.min(e, a)), nn = ({
  className: a,
  value: n,
  min: e = -60,
  max: r = 12,
  defaultValue: x = 0,
  disabled: o = !1,
  orientation: p = "vertical",
  showScale: i = !0,
  showValue: f = !0,
  onChange: k,
  onChangeEnd: v,
  children: N
}) => {
  const { value: h, setValue: w, setValueEnd: g } = st({
    value: n,
    defaultValue: x,
    onChange: k,
    onChangeEnd: v
  }), [D, l] = R(!1), V = j(null), y = j(null), L = m((t) => _t(t, e, r), [e, r]), $ = m((t) => Gt(t, e, r), [e, r]), X = m((t, u) => {
    if (!y.current) return;
    const d = y.current.getBoundingClientRect();
    let c;
    p === "vertical" ? c = 100 - (u - d.top) / d.height * 100 : c = (t - d.left) / d.width * 100, c = Math.max(0, Math.min(100, c));
    let M = $(c);
    if (D) {
      const F = L(h), B = (c - F) * 0.1;
      M = $(F + B);
    }
    M = et(M, e, r), w(M);
  }, [p, $, L, h, D, e, r, w]), { isDragging: T, handleMouseDown: z } = rt({
    onDragStart: (t) => {
      l(t.ctrlKey || t.metaKey), X(t.clientX, t.clientY);
    },
    onDragMove: (t) => {
      X(t.clientX, t.clientY);
    },
    onDragEnd: () => {
      l(!1), g(h);
    },
    disabled: o
  }), I = m(() => {
    o || (w(x), g(x));
  }, [o, x, w, g]), S = L(h), Y = () => {
    if (!i) return null;
    const t = [];
    return [12, 6, 0, -6, -12, -24, -48].forEach((d) => {
      if (d >= e && d <= r) {
        const c = L(d);
        t.push(
          /* @__PURE__ */ s(
            "div",
            {
              className: G.scaleMark,
              style: p === "vertical" ? { bottom: `${c}%` } : { left: `${c}%` },
              children: /* @__PURE__ */ s("span", { className: G.scaleLabel, children: d })
            },
            d
          )
        );
      }
    }), /* @__PURE__ */ s("div", { className: G.scale, children: t });
  };
  return /* @__PURE__ */ s(
    "div",
    {
      ref: V,
      className: `${G.volumeFader} ${a || ""}`,
      "data-orientation": p,
      "data-disabled": o,
      "data-dragging": T,
      children: N || /* @__PURE__ */ K(O, { children: [
        /* @__PURE__ */ K(
          "div",
          {
            ref: y,
            className: G.track,
            onMouseDown: z,
            onDoubleClick: I,
            children: [
              /* @__PURE__ */ s(
                "div",
                {
                  className: G.fill,
                  style: p === "vertical" ? { height: `${S}%` } : { width: `${S}%` }
                }
              ),
              /* @__PURE__ */ s(
                "div",
                {
                  className: G.thumb,
                  style: p === "vertical" ? { bottom: `${S}%` } : { left: `${S}%` }
                }
              )
            ]
          }
        ),
        Y(),
        f && /* @__PURE__ */ s("div", { className: G.valueDisplay, children: Wt(h) })
      ] })
    }
  );
}, Jt = "xtndcntpanKnob", Ot = "xtndcntknob", Qt = "xtndcntind", Zt = "xtndcntcendot", Ct = "xtndcntscale", te = "xtndcntscamarlef", ee = "xtndcntscamarcen", ne = "xtndcntscamarrig", ce = "xtndcntvaldis", A = {
  panKnob: Jt,
  knob: Ot,
  indicator: Qt,
  centerDot: Zt,
  scale: Ct,
  scaleMarkLeft: te,
  scaleMarkCenter: ee,
  scaleMarkRight: ne,
  valueDisplay: ce
}, cn = ({
  className: a,
  value: n,
  min: e = -100,
  max: r = 100,
  defaultValue: x = 0,
  disabled: o = !1,
  size: p = "medium",
  showValue: i = !0,
  onChange: f,
  onChangeEnd: k,
  children: v
}) => {
  const { value: N, setValue: h, setValueEnd: w } = st({
    value: n,
    defaultValue: x,
    onChange: f,
    onChangeEnd: k
  }), [g, D] = R(0), [l, V] = R(0), y = j(null), L = m((t) => {
    const u = r - e;
    return (t - e) / u * 270 - 135;
  }, [e, r]), $ = m((t, u) => {
    if (!y.current) return;
    const d = y.current.getBoundingClientRect(), c = d.left + d.width / 2, M = d.top + d.height / 2, F = t - c, B = u - M;
    let b = Math.atan2(B, F) * (180 / Math.PI);
    b = (b + 90 + 360) % 360, b > 315 || b < 45 ? b = b > 315 ? b - 360 : b : b >= 45 && b <= 135 ? b = Math.max(-135, Math.min(135, b - 90)) : b > 135 && b <= 225 ? b = 135 : b = -135;
    const H = (b + 135) / 270;
    let E = e + H * (r - e);
    E = et(E, e, r), h(E);
  }, [e, r, h]), X = m((t) => {
    const d = r - e, c = t * d * 0.5 / 100;
    let M = l - c;
    M = et(M, e, r), h(M);
  }, [l, e, r, h]), T = m((t) => {
    if (!o && (t.button === 1 || t.button === 0 && t.ctrlKey)) {
      h(x), w(x);
      return;
    }
  }, [o, x, h, w]), { isDragging: z, handleMouseDown: I } = rt({
    onDragStart: (t) => {
      t.shiftKey ? (D(t.clientY), V(N)) : ($(t.clientX, t.clientY), D(t.clientY), V(N));
    },
    onDragMove: (t) => {
      if (t.shiftKey) {
        const u = t.clientY - g;
        X(u);
      } else
        $(t.clientX, t.clientY);
    },
    onDragEnd: () => {
      w(N);
    },
    disabled: o
  }), S = m((t) => {
    T(t), t.button === 0 && !t.ctrlKey && I(t);
  }, [T, I]), Y = L(N);
  return /* @__PURE__ */ s(
    "div",
    {
      ref: y,
      className: `${A.panKnob} ${a || ""}`,
      "data-size": p,
      "data-disabled": o,
      "data-dragging": z,
      children: v || /* @__PURE__ */ K(O, { children: [
        /* @__PURE__ */ K(
          "div",
          {
            className: A.knob,
            onMouseDown: S,
            style: { transform: `rotate(${Y}deg)` },
            children: [
              /* @__PURE__ */ s("div", { className: A.indicator }),
              /* @__PURE__ */ s("div", { className: A.centerDot })
            ]
          }
        ),
        /* @__PURE__ */ K("div", { className: A.scale, children: [
          /* @__PURE__ */ s("div", { className: A.scaleMarkLeft }),
          /* @__PURE__ */ s("div", { className: A.scaleMarkCenter }),
          /* @__PURE__ */ s("div", { className: A.scaleMarkRight })
        ] }),
        i && /* @__PURE__ */ s("div", { className: A.valueDisplay, children: At(N) })
      ] })
    }
  );
}, se = "xtndcntsteseq", re = "xtndcnthdr", ae = "xtndcnttra", le = "xtndcntstephdr", oe = "xtndcnttrack", ie = "xtndcnttracklbl", ue = "xtndcntclearbtn", de = "xtndcntstep", J = {
  stepSequencer: se,
  header: re,
  trackLabelHeader: ae,
  stepHeader: le,
  track: oe,
  trackLabel: ie,
  clearButton: ue,
  step: de
}, sn = ({
  className: a,
  steps: n = 16,
  tracks: e = 8,
  pattern: r,
  currentStep: x = -1,
  isPlaying: o = !1,
  trackLabels: p = [],
  onStepToggle: i,
  onPatternChange: f,
  children: k
}) => {
  const [v, N] = R(
    () => Array(e).fill(null).map(() => Array(n).fill(!1))
  ), h = r || v, w = m((D, l) => {
    const V = !h[D][l];
    if (r)
      i == null || i(D, l, V);
    else {
      const y = h.map(
        (L, $) => $ === D ? L.map((X, T) => T === l ? V : X) : L
      );
      N(y), f == null || f(y);
    }
  }, [h, r, i, f]), g = m((D) => {
    if (r)
      for (let l = 0; l < n; l++)
        i == null || i(D, l, !1);
    else {
      const l = h.map(
        (V, y) => y === D ? Array(n).fill(!1) : V
      );
      N(l), f == null || f(l);
    }
  }, [h, r, n, i, f]);
  return /* @__PURE__ */ s("div", { className: `${J.stepSequencer} ${a || ""}`, children: k || /* @__PURE__ */ K(O, { children: [
    /* @__PURE__ */ K("div", { className: J.header, children: [
      /* @__PURE__ */ s("div", { className: J.trackLabelHeader }),
      Array.from({ length: n }, (D, l) => /* @__PURE__ */ s(
        "div",
        {
          className: J.stepHeader,
          "data-current": x === l && o,
          children: l % 4 === 0 ? l / 4 + 1 : ""
        },
        l
      ))
    ] }),
    Array.from({ length: e }, (D, l) => /* @__PURE__ */ K("div", { className: J.track, children: [
      /* @__PURE__ */ K("div", { className: J.trackLabel, children: [
        /* @__PURE__ */ s("span", { children: p[l] || `Track ${l + 1}` }),
        /* @__PURE__ */ s(
          "button",
          {
            className: J.clearButton,
            onClick: () => g(l),
            "aria-label": `Clear track ${l + 1}`,
            children: "×"
          }
        )
      ] }),
      Array.from({ length: n }, (V, y) => {
        var L;
        return /* @__PURE__ */ s(
          "button",
          {
            className: J.step,
            "data-active": (L = h[l]) == null ? void 0 : L[y],
            "data-current": x === y && o,
            "data-beat": y % 4 === 0,
            onClick: () => w(l, y),
            "aria-label": `Track ${l + 1}, Step ${y + 1}`
          },
          y
        );
      })
    ] }, l))
  ] }) });
}, me = "xtndcntwavedi", fe = "xtndcntcanvas", ve = "xtndcntplayhead", tt = {
  waveformEditor: me,
  canvas: fe,
  playhead: ve
}, rn = ({
  className: a,
  waveformData: n = [],
  width: e = 800,
  height: r = 200,
  selectionStart: x,
  selectionEnd: o,
  playheadPosition: p = 0,
  zoomLevel: i = 1,
  onSelectionChange: f,
  onCut: k,
  onCopy: v,
  onPaste: N,
  onFade: h,
  children: w
}) => {
  const [g, D] = R(!1), [l, V] = R(null), [y, L] = R(null), $ = j(null), X = j(null), T = m(() => {
    const t = $.current;
    if (!t || n.length === 0) return;
    const u = t.getContext("2d");
    if (!u) return;
    u.clearRect(0, 0, e, r);
    const d = Math.max(1, Math.floor(n.length / (e * i))), c = r / 2;
    u.strokeStyle = getComputedStyle(t).getPropertyValue("--waveform-color") || "#4caf50", u.lineWidth = 1, u.beginPath();
    for (let B = 0; B < e; B++) {
      const b = Math.floor(B * d);
      if (b < n.length) {
        const H = n[b], E = c - H * c;
        B === 0 ? u.moveTo(B, E) : u.lineTo(B, E);
      }
    }
    u.stroke(), u.strokeStyle = getComputedStyle(t).getPropertyValue("--waveform-center-line") || "#666", u.beginPath(), u.moveTo(0, c), u.lineTo(e, c), u.stroke();
    const M = x ?? l, F = o ?? y;
    if (M !== null && F !== null) {
      const B = M / n.length * e, b = F / n.length * e;
      u.fillStyle = getComputedStyle(t).getPropertyValue("--selection-color") || "rgba(33, 150, 243, 0.3)", u.fillRect(B, 0, b - B, r);
    }
  }, [n, e, r, i, x, o, l, y]);
  Q(() => {
    T();
  }, [T]);
  const z = m((t) => {
    if (!X.current) return;
    const u = X.current.getBoundingClientRect(), c = (t.clientX - u.left) / e * n.length;
    D(!0), V(c), L(c);
  }, [e, n.length]), I = m((t) => {
    if (!g || !X.current) return;
    const u = X.current.getBoundingClientRect(), d = t.clientX - u.left, c = Math.max(0, Math.min(n.length, d / e * n.length));
    if (L(c), l !== null) {
      const M = Math.min(l, c), F = Math.max(l, c);
      f == null || f(M, F);
    }
  }, [g, e, n.length, l, f]), S = m(() => {
    D(!1);
  }, []), Y = m((t) => {
    const u = x ?? l, d = o ?? y;
    if (!(u === null || d === null) && (t.ctrlKey || t.metaKey))
      switch (t.key) {
        case "x":
          t.preventDefault(), k == null || k(u, d);
          break;
        case "c":
          t.preventDefault(), v == null || v(u, d);
          break;
        case "v":
          t.preventDefault(), N == null || N(u);
          break;
        case "d":
          t.preventDefault(), v == null || v(u, d), N == null || N(d);
          break;
      }
  }, [x, o, l, y, k, v, N]);
  return /* @__PURE__ */ s(
    "div",
    {
      ref: X,
      className: `${tt.waveformEditor} ${a || ""}`,
      style: { width: e, height: r },
      onMouseDown: z,
      onMouseMove: I,
      onMouseUp: S,
      onKeyDown: Y,
      tabIndex: 0,
      children: w || /* @__PURE__ */ K(O, { children: [
        /* @__PURE__ */ s(
          "canvas",
          {
            ref: $,
            width: e,
            height: r,
            className: tt.canvas
          }
        ),
        p !== null && /* @__PURE__ */ s(
          "div",
          {
            className: tt.playhead,
            style: { left: `${p / n.length * 100}%` }
          }
        )
      ] })
    }
  );
}, he = "xtndcntautlan", pe = "xtndcnthdrBxq", be = "xtndcntlblcc3", xe = "xtndcntvalue", ge = "xtndcntsvg", ye = "xtndcntdeflin", $e = "xtndcntautpat", Me = "xtndcntpoint", Ne = "xtndcnthint", _ = {
  automationLane: he,
  header: pe,
  label: be,
  value: xe,
  svg: ge,
  defaultLine: ye,
  automationPath: $e,
  point: Me,
  hint: Ne
}, an = ({
  className: a,
  points: n = [],
  width: e = 800,
  height: r = 100,
  duration: x = 10,
  minValue: o = 0,
  maxValue: p = 100,
  defaultValue: i = 50,
  label: f = "Parameter",
  color: k = "#2196f3",
  onPointAdd: v,
  onPointUpdate: N,
  onPointRemove: h,
  children: w
}) => {
  var Y;
  const [g, D] = R(null), [l, V] = R(!1), y = j(null), L = m((t) => {
    const u = p - o, d = (t - o) / u;
    return r - d * r;
  }, [o, p, r]), $ = m((t) => (r - t) / r * (p - o) + o, [o, p, r]), X = m((t) => t / x * e, [x, e]), T = m((t) => t / e * x, [x, e]), z = m((t) => {
    if (!y.current || g) return;
    const u = y.current.getBoundingClientRect(), d = t.clientX - u.left, c = t.clientY - u.top;
    if (t.altKey) {
      const M = T(d), F = $(c);
      v == null || v({
        time: M,
        value: F,
        curve: "linear"
      });
    }
  }, [g, T, $, v]), I = m((t, u) => {
    t.stopPropagation(), D(u), V(!0), t.shiftKey && (h == null || h(u), D(null), V(!1));
  }, [h]), S = () => {
    if (n.length === 0) return null;
    const t = [...n].sort((d, c) => d.time - c.time);
    if (t.length === 1) {
      const d = t[0], c = X(d.time), M = L(d.value);
      return `M 0,${L(i)} L ${c},${M} L ${e},${M}`;
    }
    let u = `M ${X(t[0].time)},${L(t[0].value)}`;
    for (let d = 1; d < t.length; d++) {
      const c = t[d - 1], M = t[d], F = X(c.time), B = L(c.value), b = X(M.time), H = L(M.value);
      if (M.curve === "bezier") {
        const E = (F + b) / 2;
        u += ` Q ${E},${B} ${b},${H}`;
      } else
        u += ` L ${b},${H}`;
    }
    return u;
  };
  return /* @__PURE__ */ s("div", { className: `${_.automationLane} ${a || ""}`, style: { width: e, height: r }, children: w || /* @__PURE__ */ K(O, { children: [
    /* @__PURE__ */ K("div", { className: _.header, children: [
      /* @__PURE__ */ s("span", { className: _.label, children: f }),
      /* @__PURE__ */ s("span", { className: _.value, children: g ? (Y = n.find((t) => t.id === g)) == null ? void 0 : Y.value.toFixed(1) : i.toFixed(1) })
    ] }),
    /* @__PURE__ */ K(
      "svg",
      {
        ref: y,
        width: e,
        height: r,
        className: _.svg,
        onClick: z,
        children: [
          /* @__PURE__ */ s(
            "line",
            {
              x1: 0,
              y1: L(i),
              x2: e,
              y2: L(i),
              className: _.defaultLine
            }
          ),
          /* @__PURE__ */ s(
            "path",
            {
              d: S() || void 0,
              fill: "none",
              stroke: k,
              strokeWidth: "2",
              className: _.automationPath
            }
          ),
          n.map((t) => {
            const u = X(t.time), d = L(t.value);
            return /* @__PURE__ */ s(
              "circle",
              {
                cx: u,
                cy: d,
                r: "6",
                className: _.point,
                "data-selected": g === t.id,
                onMouseDown: (c) => I(c, t.id),
                style: { fill: k }
              },
              t.id
            );
          })
        ]
      }
    ),
    /* @__PURE__ */ s("div", { className: _.hint, children: "Alt+click to add point, Shift+click to remove" })
  ] }) });
}, ke = "xtndcntxyPad", Le = "xtndcntpadArea", De = "xtndcntgrilin", we = "xtndcntgridvt", Ve = "xtndcntgridhz", Be = "xtndcntposition", Xe = "xtndcntcro", Ke = "xtndcntcroh", Fe = "xtndcntcrov", Re = "xtndcntlbls", Se = "xtndcntlblX", Ee = "xtndcntlblY", U = {
  xyPad: ke,
  padArea: Le,
  gridLines: De,
  gridVertical: we,
  gridHorizontal: Ve,
  position: Be,
  crosshair: Xe,
  crosshairH: Ke,
  crosshairV: Fe,
  labels: Re,
  labelX: Se,
  labelY: Ee
}, ln = ({
  className: a,
  x: n,
  y: e,
  minX: r = 0,
  maxX: x = 100,
  minY: o = 0,
  maxY: p = 100,
  defaultX: i = 50,
  defaultY: f = 50,
  size: k = 200,
  labelX: v = "X",
  labelY: N = "Y",
  disabled: h = !1,
  onChange: w,
  onChangeEnd: g,
  children: D
}) => {
  const [l, V] = R(n ?? i), [y, L] = R(e ?? f), [$, X] = R(!1), T = j(null), z = n ?? l, I = e ?? y, S = m((b, H, E) => (b - H) / (E - H) * 100, []), Y = m((b, H, E) => b / 100 * (E - H) + H, []), t = m((b, H) => {
    if (!T.current) return;
    const E = T.current.getBoundingClientRect(), at = Math.max(0, Math.min(E.width, b - E.left)), lt = Math.max(0, Math.min(E.height, H - E.top)), ot = at / E.width * 100, it = 100 - lt / E.height * 100, nt = Y(ot, r, x), ct = Y(it, o, p);
    n === void 0 && V(nt), e === void 0 && L(ct), w == null || w(nt, ct);
  }, [n, e, r, x, o, p, Y, w]), u = m((b) => {
    h || (X(!0), t(b.clientX, b.clientY), b.preventDefault());
  }, [h, t]), d = m((b) => {
    $ && t(b.clientX, b.clientY);
  }, [$, t]), c = m(() => {
    $ && (X(!1), g == null || g(z, I));
  }, [$, z, I, g]), M = m(() => {
    h || (n === void 0 && V(i), e === void 0 && L(f), w == null || w(i, f), g == null || g(i, f));
  }, [h, n, e, i, f, w, g]);
  Q(() => {
    if ($)
      return document.addEventListener("mousemove", d), document.addEventListener("mouseup", c), () => {
        document.removeEventListener("mousemove", d), document.removeEventListener("mouseup", c);
      };
  }, [$, d, c]);
  const F = S(z, r, x), B = 100 - S(I, o, p);
  return /* @__PURE__ */ s("div", { className: `${U.xyPad} ${a || ""}`, style: { width: k, height: k }, children: D || /* @__PURE__ */ K(O, { children: [
    /* @__PURE__ */ K(
      "div",
      {
        ref: T,
        className: U.padArea,
        onMouseDown: u,
        onDoubleClick: M,
        "data-disabled": h,
        "data-dragging": $,
        children: [
          /* @__PURE__ */ K("div", { className: U.gridLines, children: [
            /* @__PURE__ */ s("div", { className: U.gridVertical }),
            /* @__PURE__ */ s("div", { className: U.gridHorizontal })
          ] }),
          /* @__PURE__ */ s(
            "div",
            {
              className: U.position,
              style: { left: `${F}%`, top: `${B}%` },
              children: /* @__PURE__ */ K("div", { className: U.crosshair, children: [
                /* @__PURE__ */ s("div", { className: U.crosshairH }),
                /* @__PURE__ */ s("div", { className: U.crosshairV })
              ] })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ K("div", { className: U.labels, children: [
      /* @__PURE__ */ K("div", { className: U.labelX, children: [
        v,
        ": ",
        z.toFixed(1)
      ] }),
      /* @__PURE__ */ K("div", { className: U.labelY, children: [
        N,
        ": ",
        I.toFixed(1)
      ] })
    ] })
  ] }) });
}, Te = "xtndcntaudiobtn", Ye = "xtndcntplavar", ze = "xtndcntstovar", He = "xtndcntrecvar", Ie = "xtndcntpulseurJ", Pe = "xtndcntmutvar", Ue = "xtndcntsolvar", je = "xtndcnttglvar", qe = "xtndcnticosHY", We = "xtndcntlbl", P = {
  audioButton: Te,
  playVariant: Ye,
  stopVariant: ze,
  recordVariant: He,
  pulse: Ie,
  muteVariant: Pe,
  soloVariant: Ue,
  toggleVariant: je,
  icon: qe,
  label: We
}, on = ({
  className: a,
  variant: n = "toggle",
  isActive: e = !1,
  isArmed: r = !1,
  isRecording: x = !1,
  isSoloed: o = !1,
  disabled: p = !1,
  size: i = "medium",
  shape: f = "circle",
  keyBinding: k,
  onClick: v,
  onDoubleClick: N,
  onRightClick: h,
  children: w
}) => {
  const g = m(() => {
    p || n === "mute" && o || v == null || v();
  }, [p, n, o, v]), D = m(() => {
    p || N == null || N();
  }, [p, N]), l = m((L) => {
    L.preventDefault(), !p && (h == null || h());
  }, [p, h]);
  qt({
    key: k,
    callback: g,
    disabled: p
  });
  const V = () => {
    switch (n) {
      case "play":
        return P.playVariant;
      case "stop":
        return P.stopVariant;
      case "record":
        return P.recordVariant;
      case "mute":
        return P.muteVariant;
      case "solo":
        return P.soloVariant;
      default:
        return P.toggleVariant;
    }
  }, y = () => {
    if (w) return w;
    switch (n) {
      case "play":
        return /* @__PURE__ */ s("svg", { viewBox: "0 0 24 24", className: P.icon, children: e ? /* @__PURE__ */ s("path", { d: "M6 4h4v16H6V4zm8 0h4v16h-4V4z" }) : /* @__PURE__ */ s("path", { d: "M8 5v14l11-7z" }) });
      case "stop":
        return /* @__PURE__ */ s("svg", { viewBox: "0 0 24 24", className: P.icon, children: /* @__PURE__ */ s("rect", { x: "6", y: "6", width: "12", height: "12" }) });
      case "record":
        return /* @__PURE__ */ s("svg", { viewBox: "0 0 24 24", className: P.icon, children: /* @__PURE__ */ s("circle", { cx: "12", cy: "12", r: "8" }) });
      case "mute":
        return /* @__PURE__ */ s("span", { className: P.label, children: "M" });
      case "solo":
        return /* @__PURE__ */ s("span", { className: P.label, children: "S" });
      default:
        return /* @__PURE__ */ s("span", { className: P.label, children: "T" });
    }
  };
  return /* @__PURE__ */ s(
    "button",
    {
      className: `${P.audioButton} ${V()} ${a || ""}`,
      onClick: g,
      onDoubleClick: D,
      onContextMenu: l,
      disabled: p || n === "mute" && o,
      "data-size": i,
      "data-shape": f,
      "data-active": e,
      "data-armed": r,
      "data-recording": x,
      "data-soloed": o,
      "aria-label": `${n} button`,
      type: "button",
      children: y()
    }
  );
};
export {
  on as AudioButton,
  an as AutomationLane,
  Ge as LoopToggle,
  Je as MetronomeToggle,
  cn as PanKnob,
  Qe as Playhead,
  sn as StepSequencer,
  Oe as TimelineRuler,
  nn as VolumeFader,
  rn as WaveformEditor,
  ln as XyPad,
  et as clampValue,
  Ce as formatBpm,
  Wt as formatDb,
  tn as formatFrequency,
  At as formatPan,
  en as formatPercentage,
  Ze as formatTime,
  Gt as percentageToValue,
  st as useControlledValue,
  rt as useDragInteraction,
  qt as useKeyboardShortcut,
  _t as valueToPercentage
};
