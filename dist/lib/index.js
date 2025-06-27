import { jsx as n, Fragment as F, jsxs as x } from "react/jsx-runtime";
import * as u from "react";
import P, { useReducer as Je, useRef as ae, useEffect as ue, memo as y, useState as j, useCallback as A, forwardRef as v, useMemo as et } from "react";
import { createPortal as tt } from "react-dom";
import { s as Le, a as he, u as xe, b as nt, B as me, L as st, I as pe, d as I, S as at, e as G, C as rt, f as q } from "./vendor/Toolbar-DRPiI57x.js";
import { g as ar, l as rr, m as or, n as lr, H as cr, o as ir, p as dr, h as ur, M as mr, i as fr, T as hr, k as pr, j as gr } from "./vendor/Toolbar-DRPiI57x.js";
import { u as ot, a as $e } from "./vendor/useMeasure-C5eiiuB0.js";
var lt = function(e, t) {
  return typeof t == "boolean" ? t : !e;
}, ct = function(e) {
  return Je(lt, e);
};
const Ee = ({
  onClose: e,
  id: t
}) => {
  const s = ae(null), a = ae(null), o = ae(e);
  return o.current = e, ue(() => {
    let l;
    const d = (r) => {
      var c;
      if (!r.defaultPrevented && a.current && r.target instanceof HTMLElement && (r.type === "pointerdown" && (l = r.target), !(r.type !== "pointerdown" && l !== r.target))) {
        if (a.current.contains(r.target)) {
          r.stopPropagation();
          return;
        }
        if ((c = s.current) != null && c.contains(r.target)) {
          r.preventDefault(), r.stopPropagation(), o.current();
          return;
        }
      }
    };
    return window == null || window.addEventListener("pointerdown", d, !0), window == null || window.addEventListener("pointerup", d, !0), () => {
      window == null || window.removeEventListener("pointerdown", d, !0), window == null || window.removeEventListener("pointerup", d, !0);
    };
  }, []), [s, a];
}, it = "dlgdlg", dt = "dlgbdr", ut = "dlgfade-in", mt = "dlg_dlg_ovr", ft = "dlgfixed", ht = "dlgdlgftr", pt = "dlgbodyLk3", gt = "dlgshake", re = {
  dialog: it,
  backdrop: dt,
  fadeIn: ut,
  dialogOverlay: mt,
  fixed: ft,
  dialogFooter: ht,
  body: pt,
  shake: gt
}, bt = () => P.useMemo(() => typeof window > "u" ? null : window.document, []), Ae = ({ children: e, parentNode: t }) => {
  const s = u.useId(), [a, o] = u.useState(), l = bt();
  u.useEffect(() => {
    if (!l)
      return;
    const r = l.createElement("div");
    return r.setAttribute("id", s), l.body.appendChild(r), o(r), () => {
      l.body.contains(r) && l.body.removeChild(r), o(void 0);
    };
  }, [s, l]);
  const d = u.useMemo(() => t ? yt(t) : [1], [t, s]);
  return a && d ? /* @__PURE__ */ n(F, { children: tt(/* @__PURE__ */ n(Re, { zIndexList: d, children: e }), a) }) : /* @__PURE__ */ n(F, {});
}, Re = ({ zIndexList: e, children: t }) => {
  const [s, ...a] = e;
  return /* @__PURE__ */ n("div", { style: { position: "relative", zIndex: s }, children: a.length ? /* @__PURE__ */ n(Re, { zIndexList: a, children: t }) : t });
}, yt = (e) => {
  const t = [], s = (a) => {
    const l = +window.getComputedStyle(a).getPropertyValue("z-index");
    Number.isNaN(l) || t.push(l), a.parentElement && s(a.parentElement);
  };
  return s(e), t.reverse();
}, vt = (e) => e ? "current" in e : !1, Nt = (...e) => P.useCallback(
  (s) => {
    for (const a of e)
      if (a) {
        if (typeof a == "string")
          throw new Error("LegacyRef is not supported");
        if (typeof a == "function") {
          a(s);
          continue;
        }
        if (vt(a)) {
          a.current = s;
          continue;
        }
        if (a && "value" in a) {
          a.value = s;
          continue;
        }
      }
  },
  [e]
), Te = u.memo(
  u.forwardRef(({ onClose: e, modal: t = !0, open: s, ...a }, o) => {
    const [l, d] = Ee({ onClose: e ?? (() => {
    }) }), r = u.useRef(null), c = Nt(o, r), p = t ? u.Fragment : Ae;
    u.useEffect(() => {
      const b = r.current;
      b && (s ? t ? b.showModal() : b.show() : b.close());
    }, [s, t]);
    const m = u.useCallback(
      (b) => {
        b.preventDefault(), b.stopPropagation(), e && e(b);
      },
      [e]
    ), h = /* @__PURE__ */ n("div", { ref: l, className: re.backdrop }), f = /* @__PURE__ */ n("div", { className: re.body, "data-role": "dialog-body", ref: d, children: a.children });
    return /* @__PURE__ */ n(p, { children: /* @__PURE__ */ n(
      "dialog",
      {
        className: re.dialog,
        ...a,
        open: t ? void 0 : s,
        ref: c,
        onClose: m,
        "data-role": t ? "modal" : "dialog-body",
        children: s && /* @__PURE__ */ x(F, { children: [
          h,
          f
        ] })
      }
    ) });
  })
);
Te.displayName = "Dialog";
const qa = ({ children: e }) => /* @__PURE__ */ n("footer", { className: re.dialogFooter, children: e }), ee = u.memo(
  ({ potal: e, open: t = !0, onClose: s, onCancel: a, children: o, variant: l, animationName: d, direction: r = "btt" }) => /* @__PURE__ */ n(
    Te,
    {
      onClose: s,
      onCancel: a,
      open: t,
      modal: !1,
      "data-variant": l,
      "data-animation": d,
      "data-direction": r,
      children: o
    }
  )
);
ee.displayName = "PopupLayout";
const wt = "dlgctn", Oe = {
  content: wt
}, It = ({ direction: e, open: t = !0, onClose: s, header: a, children: o, potal: l = !0 }) => /* @__PURE__ */ x(ee, { open: t, onClose: s, potal: l, variant: "drawer", direction: e, children: [
  a,
  /* @__PURE__ */ n("section", { className: Oe.content, children: o })
] });
It.displayName = "Drawer";
const xt = ({ ...e }) => {
  const [t, s] = u.useState(!1), a = u.useCallback(() => {
    s(!0);
  }, []), o = u.useCallback(() => {
    s(!1);
  }, []), l = (d) => {
    d instanceof HTMLInputElement && d.focus();
  };
  return /* @__PURE__ */ x(F, { children: [
    /* @__PURE__ */ n(
      "input",
      {
        ...e,
        className: Le.editablelabel,
        autoFocus: !0,
        ref: l,
        onBlur: o,
        type: "text",
        style: { display: t ? "block" : "none" }
      }
    ),
    !t && /* @__PURE__ */ n("span", { onClick: a, children: /* @__PURE__ */ n(he, { children: e.value ?? e.defaultValue }) })
  ] });
};
xt.displayName = "EditableLabel";
const Ct = "nvgtabnav", kt = "nvgsrtitm", St = "nvgsrtcon", Mt = "nvghdl", Lt = "nvgsrtbod", $t = "nvgico", Et = "nvgdel", K = {
  tabnav: Ct,
  sortableItem: kt,
  sortableItemControl: St,
  handle: Mt,
  sortableItemBody: Lt,
  icon: $t,
  deleteButton: Et
}, At = "cntsrtitm", Rt = "cntsrtbod", Tt = "cntsrt", ie = {
  sortableItem: At,
  sortableItemBody: Rt,
  sortableItemHandle: Tt
}, Ce = () => Math.random().toString(36).substring(2), Ot = ({
  value: e,
  onChange: t
}) => {
  const [s, a] = u.useState(() => (e ?? []).map((c) => ({ value: c, id: Ce() }))), o = xe(s), l = u.useRef(t);
  l.current = t, u.useEffect(() => {
    if (!o || !l.current)
      return;
    const r = s.map((c) => c.value);
    l.current(r);
  }, [s]);
  const d = xe(e);
  return u.useEffect(() => {
    if (!d || !e)
      return;
    const r = e;
    a((c) => {
      const p = c.map((i) => i.value), m = p.length === r.length;
      if (m && r.every((i, g) => i === p[g]))
        return c;
      const f = new WeakMap(c.map((i) => [i.value, i])), b = r.map((i, g) => f.has(i) ? -1 : g).filter((i) => i !== -1);
      return m ? c.map((i, g) => b.includes(g) ? { ...i, value: r[g] } : i) : r.map((i) => {
        const g = f.get(i);
        return g != null && g.value ? g : { value: i, id: Ce() };
      });
    });
  }, [e, a]), [s, a];
}, Dt = (e, t, s) => {
  const a = [...e], [o] = a.splice(t, 1);
  return a.splice(s, 0, o), a;
}, te = ({
  items: e,
  onChange: t,
  children: s,
  controlAs: a
}) => {
  const [o, l] = Ot({
    value: e,
    onChange: t
  }), d = u.useRef(/* @__PURE__ */ new WeakMap([])), [r, c] = u.useState(), [p, m] = u.useState(), h = {
    draggingId: r,
    draggingOverId: p
  }, f = u.useRef(h);
  f.current = h;
  const b = u.useCallback((w) => {
    const { draggingId: k, draggingOverId: C } = f.current;
    C !== w && (l(($) => {
      const E = $.findIndex((z) => z.id === w), L = $.findIndex((z) => z.id === C);
      return Dt($, E, L);
    }), c(void 0), m(void 0));
  }, []), i = u.useCallback((w, k) => (d.current.set(k, w), () => {
    d.current.delete(k);
  }), []), g = o.map((w) => w.id), N = a ?? De;
  return /* @__PURE__ */ n(
    Be.Provider,
    {
      value: {
        observe: i,
        items: g,
        draggingId: r,
        setDraggingId: c,
        draggingOverId: p,
        setDraggingOverId: m,
        end: b
      },
      children: u.Children.map(s, (w, k) => {
        const C = g[k];
        return /* @__PURE__ */ n(N, { id: C, children: w }, C);
      })
    }
  );
}, Bt = (...e) => e.filter(Boolean).join(" "), De = ({ id: e, children: t, className: s }) => {
  const { containerRef: a, listeners: o } = ge(e);
  return /* @__PURE__ */ x("div", { className: Bt(ie.sortableItem, s), ref: a, children: [
    /* @__PURE__ */ n("div", { className: ie.sortableItemHandle, ...o }),
    /* @__PURE__ */ n("div", { className: ie.sortableItemBody, children: t })
  ] });
};
te.SortableItem = De;
const Be = u.createContext({
  items: [],
  setDraggingId: () => {
  },
  setDraggingOverId: () => {
  },
  end: () => {
  },
  observe: () => () => {
  }
}), ge = (e) => {
  const t = u.useRef(null), s = u.useRef(null), { setDraggingId: a, setDraggingOverId: o, end: l, observe: d } = u.useContext(Be);
  return u.useEffect(() => {
    const r = t.current, c = s.current;
    if (!r || !c)
      return;
    const p = d(e, r);
    r.setAttribute("draggable", "true"), r.setAttribute("data-draggable-id", e);
    const m = () => {
      o(e);
    };
    let h;
    const f = (w) => {
      h || (w.stopPropagation(), w.preventDefault(), w.dataTransfer && (w.dataTransfer.effectAllowed = "move"), a(e));
    }, b = (w) => (l(e), !1), i = (w) => (w.preventDefault && w.preventDefault(), w.dataTransfer && (w.dataTransfer.dropEffect = "move"), !1), g = (w) => (w.stopPropagation(), w.preventDefault(), !1), N = (w) => {
      if (w.target === c) {
        h = e;
        return;
      }
      return !1;
    };
    return r.addEventListener("pointerdown", N), r.addEventListener("dragstart", f), r.addEventListener("dragover", i), r.addEventListener("dragend", b), r.addEventListener("dragenter", m), r.addEventListener("drop", g, !1), () => {
      r.removeEventListener("pointerdown", N), r.removeEventListener("dragenter", m), r.removeEventListener("dragover", i), r.removeEventListener("dragstart", f), r.removeEventListener("dragend", b), r.removeEventListener("drop", g), p();
    };
  }, [e]), {
    containerRef: t,
    listeners: {
      ref: s
    }
  };
};
te.useSortable = ge;
const Pt = ({ itemWrapper: e = he, value: t, onChange: s, setItems: a, items: o, defaultValue: l }) => {
  const [d, r] = u.useState(t ?? l);
  u.useEffect(() => {
    typeof t == "string" && t !== d && r(t);
  }, [d, t]);
  const c = u.useCallback((m) => {
    a((h) => h.filter(({ key: f }) => f !== m));
  }, []), p = u.useCallback(
    (m) => {
      if (!(m.currentTarget instanceof HTMLDivElement))
        return;
      const h = m.currentTarget.dataset.id;
      h && s(h);
    },
    [s]
  );
  return /* @__PURE__ */ n("nav", { className: K.tabnav, children: /* @__PURE__ */ n(te, { items: o, onChange: a, controlAs: Ht, children: o.map((m) => /* @__PURE__ */ n(Ft, { item: m, onSelect: p, selected: d, onRequestClose: c, children: /* @__PURE__ */ n(e, { children: m.value }) }, m.key)) }) });
};
Pt.displayName = "TabNav";
const Ht = ({ children: e, id: t }) => {
  const { containerRef: s, listeners: a } = ge(t), o = u.Children.map(e, (l) => u.isValidElement(l) ? u.cloneElement(l, a) : l);
  return /* @__PURE__ */ n("div", { ref: s, className: K.sortableItemControl, children: o });
}, Ft = u.forwardRef(({ selected: e, item: t, children: s, onSelect: a, onRequestClose: o, closeMark: l }, d) => {
  const r = u.useCallback(
    (c) => {
      c.preventDefault(), o && o(t.key);
    },
    [o]
  );
  return /* @__PURE__ */ x("div", { className: K.sortableItem, "data-id": t.key, "aria-selected": e === t.key, onClick: a, children: [
    o ? /* @__PURE__ */ n("button", { type: "button", className: K.deleteButton, value: `close ${t.value} tab`, onClick: r, children: l ?? "×" }) : /* @__PURE__ */ n("span", {}),
    /* @__PURE__ */ x("div", { className: K.sortableItemBody, ref: d, children: [
      /* @__PURE__ */ n("div", {}),
      t.icon,
      s
    ] })
  ] });
}), zt = "brstabbar", Vt = "brstabitm", qt = "brstab", Wt = "brstabF_L", jt = "brstabins", Xt = "brstabwrp", Gt = "brsdrg", Qt = "brsdragOver", _ = {
  tabbar: zt,
  tabitem: Vt,
  tabitemIcon: qt,
  tabitemLabel: Wt,
  tabInsertIndicator: jt,
  tabWrapper: Xt,
  dragging: Gt,
  dragOver: Qt
}, Yt = y(({ items: e, onSelect: t, tabIndex: s, defaultSelected: a }) => {
  const [o, l] = j(() => a ?? 0), d = A(
    (r, c) => {
      t(r, c), l(c);
    },
    [t]
  );
  return /* @__PURE__ */ n("nav", { className: _.tabbar, tabIndex: s, children: /* @__PURE__ */ n("ul", { className: _.tabs, children: e.map((r, c) => /* @__PURE__ */ n(Zt, { item: r, tabIndex: c, onSelect: d, selected: c === o }, c)) }) });
});
Yt.displayName = "TabBar";
const Zt = y(({ tabIndex: e, item: t, onSelect: s, selected: a }) => {
  const o = A(
    (l) => {
      l.preventDefault(), s(t, e);
    },
    [s, t, e]
  );
  return /* @__PURE__ */ n("li", { className: _.tabitem, "data-selected": a, children: /* @__PURE__ */ x("a", { tabIndex: e, onClick: o, children: [
    /* @__PURE__ */ n("div", { className: _.tabitemIcon, children: t.icon }),
    /* @__PURE__ */ n("span", { className: _.tabitemLabel, children: t.value })
  ] }) });
}), Kt = "cntrsz", _t = {
  resizer: Kt
}, Ut = ({ autoplace: e = !0, onResize: t, originX: s, originY: a, max: o, min: l, step: d }) => {
  const r = u.useRef(null), c = u.useMemo(() => ({ x: s ?? 0.5, y: a ?? 0.5 }), [s, a]), p = u.useCallback(
    (h) => {
      h.type !== "pointerdown" && t(Jt(h.deltaX, h.deltaY, c.x, c.y), h.isFinal);
    },
    [o, l, d, c]
  );
  ot(r, p);
  const m = u.useMemo(() => {
    if (e) {
      const h = Math.atan2(c.y, c.x), f = ["ew", "nwse", "ns", "nesw", "ew", "nwse", "ns", "nesw"], b = Math.round(h / (Math.PI / 4)), i = `${f.at(b)}-resize`, g = (c.x + 1) / 2, N = (c.y + 1) / 2;
      return {
        top: `${g * 100}%`,
        left: `${N * 100}%`,
        cursor: i,
        content: `${h}`
      };
    }
    return {};
  }, [e, c]);
  return /* @__PURE__ */ n("div", { className: _t.resizer, ref: r, style: m });
};
Ut.displayName = "Resizer";
const Jt = (e, t, s, a) => ({ x: s, y: a, width: e, height: t }), en = "cntsegcon", tn = "cntseg", nn = "cntind", Z = {
  segmentControl: en,
  segmentButton: tn,
  indicator: nn
}, sn = "cntsegment", an = {
  segment: sn
}, rn = y(({ children: e }) => /* @__PURE__ */ n("div", { className: an.segment, children: e })), on = (e = !1) => {
  const [t, s] = j(e), a = A(() => {
    s((o) => !o);
  }, []);
  return [t, a, s];
}, ln = y(
  ({
    items: e,
    selectedIndex: t,
    defaultSelected: s = 0,
    onSelect: a,
    element: o = rn,
    controlled: l = !1,
    onPositionChange: d,
    onDragStart: r,
    onDragEnd: c,
    onDragPreview: p
  }) => {
    const [m, h] = j(s), [f, b] = j({}), i = ae(null), [g, N] = j(!1), [w, k] = j(null), [C, $] = j(null), E = l ? t ?? s : m, L = g && C !== null ? C : E, D = A(
      (S) => {
        l || h(S), a == null || a(S);
      },
      [l, a]
    ), z = A(
      (S) => {
        if (!(S.target instanceof HTMLButtonElement))
          return;
        const M = parseInt(S.target.dataset.index ?? "0");
        D(M);
      },
      [D]
    ), Q = A(
      (S) => {
        if (!(S.target instanceof HTMLButtonElement)) return;
        const M = parseInt(S.target.dataset.index ?? "0");
        M === E && (N(!0), k(M), $(M), r == null || r(M), S.currentTarget.setPointerCapture(S.pointerId));
      },
      [E, r]
    ), W = A(
      (S) => {
        if (!g || !i.current) return;
        const M = i.current.getBoundingClientRect(), ce = S.clientX - M.left, B = Array.from(i.current.children).filter(
          (H) => H.classList.contains(Z.segmentButton)
        );
        let V = w;
        for (let H = 0; H < B.length; H++) {
          const Ie = B[H].getBoundingClientRect(), _e = Ie.left - M.left, Ue = Ie.right - M.left;
          if (ce >= _e && ce <= Ue) {
            V = H;
            break;
          }
        }
        V !== null && V !== C && ($(V), p == null || p(V));
      },
      [g, w, C, p]
    ), ne = A(
      (S) => {
        if (!g) return;
        S.currentTarget.releasePointerCapture(S.pointerId);
        const M = C !== null ? C : E;
        C !== null && C !== E && D(C), c == null || c(M), N(!1), k(null), $(null);
      },
      [g, C, E, D, c]
    ), O = A(
      (S) => {
        if (!i.current)
          return;
        const M = Array.from(i.current.children).filter((we) => we.classList.contains(Z.segmentButton));
        if (M.length === 0 || S >= M.length)
          return;
        const B = M[S].getBoundingClientRect(), V = i.current.getBoundingClientRect(), H = {
          top: B.top - V.top,
          left: B.left - V.left,
          width: B.width,
          height: B.height
        };
        b(H), d && d({
          ...H,
          // Also provide absolute position for advanced use cases
          x: B.x,
          y: B.y,
          right: B.right,
          bottom: B.bottom
        });
      },
      [d]
    );
    ue(() => {
      O(L);
    }, [L, O]), ue(() => {
      if (!i.current) return;
      const S = new ResizeObserver(() => {
        O(L);
      });
      return S.observe(i.current), () => {
        S.disconnect();
      };
    }, [L, O]);
    const se = A(
      (S) => {
        if (S.target instanceof HTMLButtonElement) {
          if (!(S.target.dataset.index === L.toString()))
            return;
          Ne(!0);
        }
      },
      [L]
    ), le = A(
      (S) => {
        if (S.target instanceof HTMLButtonElement) {
          if (!(S.target.dataset.index === L.toString()))
            return;
          Ne(!1);
        }
      },
      [L]
    ), [ve, Ba, Ne] = on(!1);
    return /* @__PURE__ */ x("div", { className: Z.segmentControl, ref: i, children: [
      e.map((S, M) => /* @__PURE__ */ n(
        cn,
        {
          index: M,
          active: M === L,
          onClick: z,
          focus: se,
          blur: le,
          onPointerDown: Q,
          onPointerMove: W,
          onPointerUp: ne,
          onPointerCancel: ne,
          children: /* @__PURE__ */ n(o, { children: S })
        },
        M
      )),
      f && f.left !== void 0 && /* @__PURE__ */ n(
        "div",
        {
          className: Z.indicator,
          role: "presentation",
          "data-focus": ve,
          style: {
            transform: `translate(${f.left}px, ${f.top}px) scale(${ve ? 0.97 : 1})`,
            width: f.width,
            height: f.height
          },
          children: e.at(L)
        }
      )
    ] });
  }
);
ln.displayName = "SegmentedControl";
const cn = ({ children: e, index: t, active: s, onClick: a, focus: o, blur: l, onPointerDown: d, onPointerMove: r, onPointerUp: c, onPointerCancel: p }) => {
  const m = A(
    (i) => {
      o(i), d == null || d(i);
    },
    [o, d]
  ), h = A(
    (i) => {
      l(i), c == null || c(i);
    },
    [l, c]
  ), f = A(
    (i) => {
      l(i), p == null || p(i);
    },
    [l, p]
  ), b = A(
    (i) => {
      i.currentTarget.hasPointerCapture(i.pointerId) || l(i);
    },
    [l]
  );
  return /* @__PURE__ */ n(
    "button",
    {
      onClick: a,
      type: "button",
      "data-index": t,
      "data-active": s,
      className: Z.segmentButton,
      onPointerDown: m,
      onPointerMove: r,
      onPointerUp: h,
      onPointerCancel: f,
      onPointerLeave: b,
      style: {
        touchAction: "none"
        // Prevent scrolling during drag
      },
      children: e
    }
  );
}, dn = "dlgctnX-K", un = "dlgdes", mn = "dlgtitle", fn = "dlgbtngrp", U = {
  content: dn,
  description: un,
  title: mn,
  buttonGroup: fn
}, fe = ({
  actions: e,
  onSelect: t,
  isLoading: s,
  children: a,
  title: o,
  error: l,
  description: d,
  direction: r,
  ...c
}) => {
  const p = A((m) => {
    m.stopPropagation(), m.preventDefault();
    const h = m.currentTarget.getAttribute("data-action");
    !h || !t || t(h);
  }, []);
  return /* @__PURE__ */ n(ee, { ...c, variant: "alert", children: /* @__PURE__ */ x("div", { className: U.content, "data-is-loading": s, children: [
    o && /* @__PURE__ */ n(nt, { level: 3, children: o }),
    d && /* @__PURE__ */ n("p", { className: U.description, children: d }),
    l && /* @__PURE__ */ x("p", { children: [
      /* @__PURE__ */ n("strong", { children: l.name }),
      l.message,
      hn(l) && /* @__PURE__ */ x(F, { children: [
        "Caused by: ",
        l.cause.message
      ] })
    ] }),
    a,
    /* @__PURE__ */ n("div", { className: U.buttonGroup, "data-direction": r, children: e == null ? void 0 : e.map((m, h) => /* @__PURE__ */ n(
      me,
      {
        onClick: p,
        "data-action": m.key,
        type: "button",
        disabled: s,
        variant: `alert ${m.variant ?? ""}`.trim(),
        children: m.value
      },
      h
    )) })
  ] }) });
};
fe.displayName = "Alert";
const hn = (e) => e instanceof Error ? e.hasOwnProperty("cause") : !1, pn = "dlgbase", gn = "dlgcnt", bn = "dlgdec", yn = "dlgbody", vn = "dlgctnvg-", Nn = "dlgblowout", wn = "dlgfitbox", X = {
  base: pn,
  container: gn,
  decoration: bn,
  body: yn,
  content: vn,
  blowout: Nn,
  fitbox: wn
}, In = (e, t, s, a, o, l = 0) => (e += l / 2, t += l / 2, s -= l, a -= l, [
  `M ${e + o} ${t}`,
  `H ${e + s - o}`,
  `Q ${e + s} ${t} ${e + s} ${t + o}`,
  `V ${t + a - o}`,
  `Q ${e + s} ${t + a} ${e + s - o} ${t + a}`,
  `H ${e + o}`,
  `Q ${e} ${t + a} ${e} ${t + a - o}`,
  `V ${t + o}`,
  `Q ${e} ${t} ${e + o} ${t}`,
  "Z"
].join(" ").replace(/\s+/g, " ").replace(/\n/g, "")), xn = ({
  x: e,
  y: t,
  width: s,
  height: a,
  lookAtX: o,
  lookAtY: l,
  rx: d = 10,
  shadowMargin: r = 40,
  chevronSize: c = 16
}) => {
  const p = s / 2, m = a / 2, h = e + p, f = t + m, b = Math.atan2(l - f, o - h);
  let i = Math.min(Math.max(o - h, -p), p), g = Math.min(Math.max(l - f, -m), m);
  const N = d * 2;
  (($, E) => {
    const L = Math.abs($) - p, D = Math.abs(E) - m;
    return L * L + D * D < N * N;
  })(i, g) && (Math.floor(4 * (b % (Math.PI * 2) / (Math.PI * 2))) % 2 === 0 ? (i = Math.min(Math.max(i, -p), p), g = Math.min(Math.max(g, -m + N), m - N)) : (i = Math.min(Math.max(i, -p + N), p - N), g = Math.min(Math.max(g, -m), m)));
  const k = {
    x: Math.min(Math.max(i, -p), p) + s / 2 - c / 2,
    y: Math.min(Math.max(g, -m), m) + a / 2 - c / 2
  }, C = (() => {
    const $ = k.y < 0, E = k.x < 0, L = k.x > s - c;
    return k.y > a - c ? 0 : $ ? 2 : E ? 3 : L ? 1 : 0;
  })();
  return {
    arrowSnapPoint: k,
    angle: C
  };
}, Cn = ({ width: e, height: t, x: s, y: a, lookAtX: o, lookAtY: l, rx: d = 10, shadowMargin: r = 40, chevronSize: c = 16 }) => {
  const p = [s, a, e, t, o, l, d, r, c], m = u.useMemo(() => {
    const { arrowSnapPoint: f, angle: b } = xn({
      x: s,
      y: a,
      width: e,
      height: t,
      lookAtX: o,
      lookAtY: l,
      rx: d,
      shadowMargin: r,
      chevronSize: c
    });
    return /* @__PURE__ */ n(F, { children: /* @__PURE__ */ n("g", { transform: `translate(${f.x}, ${f.y})`, children: /* @__PURE__ */ x("g", { transform: `translate(8, 8) rotate(${b * 90}) translate(-8, -8)`, children: [
      /* @__PURE__ */ n("rect", { x: "0", y: "0", width: "16", height: "16", fill: "transparent" }),
      /* @__PURE__ */ n("g", { transform: "translate(-15, 16)", children: /* @__PURE__ */ n("path", { d: "M7,-8.105 L10.3641716,-8.105 C12.6069526,-8.105 14.569386,-7.41371956 16.2514718,-6.03115868 C18.7746005,-3.95731736 19.6156434,-2.9203967 21.2977292,-1.1921956 C22.979815,0.536005499 23.8208579,0.536005499 25.5029437,-1.1921956 C27.1850294,-2.9203967 28.8671152,-4.6485978 30.549201,-6.03115868 C32.2312868,-7.41371956 33.0723297,-8.105 37.2775442,-8.105 C40.0810205,-8.105 41.4827586,-8.105 41.4827586,-8.105 L7,-8.105 Z" }) })
    ] }) }) });
  }, p), h = u.useId();
  return /* @__PURE__ */ x(
    "svg",
    {
      style: {
        position: "absolute",
        left: -r,
        top: -r,
        width: e + r * 2,
        height: t + r * 2
      },
      viewBox: `${-r} ${-r} ${e + r * 2} ${t + r * 2}`,
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      children: [
        /* @__PURE__ */ n("defs", { children: /* @__PURE__ */ x("filter", { x: "-26.9%", y: "-32.0%", width: "161.5%", height: "164.0%", filterUnits: "objectBoundingBox", id: h, children: [
          /* @__PURE__ */ n("feOffset", { dx: "0", dy: "0", in: "SourceAlpha", result: "shadowOffsetOuter1" }),
          /* @__PURE__ */ n("feGaussianBlur", { stdDeviation: "1.5", in: "shadowOffsetOuter1", result: "shadowBlurOuter1" }),
          /* @__PURE__ */ n(
            "feColorMatrix",
            {
              values: "0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.55 0",
              type: "matrix",
              in: "shadowBlurOuter1",
              result: "shadowMatrixOuter1"
            }
          ),
          /* @__PURE__ */ n("feOffset", { dx: "8", dy: "0", in: "SourceAlpha", result: "shadowOffsetOuter2" }),
          /* @__PURE__ */ n("feGaussianBlur", { stdDeviation: "20", in: "shadowOffsetOuter2", result: "shadowBlurOuter2" }),
          /* @__PURE__ */ n(
            "feColorMatrix",
            {
              values: "0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.25 0",
              type: "matrix",
              in: "shadowBlurOuter2",
              result: "shadowMatrixOuter2"
            }
          ),
          /* @__PURE__ */ x("feMerge", { children: [
            /* @__PURE__ */ n("feMergeNode", { in: "shadowMatrixOuter1" }),
            /* @__PURE__ */ n("feMergeNode", { in: "shadowMatrixOuter2" })
          ] })
        ] }) }),
        /* @__PURE__ */ n("g", { fillRule: "evenodd", stroke: "none", strokeWidth: "1", children: /* @__PURE__ */ x("g", { style: { mixBlendMode: "multiply" }, children: [
          /* @__PURE__ */ x("g", { fill: "var(--textColor)", fillOpacity: "1", filter: `url(#${h})`, children: [
            /* @__PURE__ */ n(ke, { x: 0, y: 0, rx: d, width: e, height: t }),
            m
          ] }),
          /* @__PURE__ */ x("g", { fill: "var(--windowBackgroundColor)", filter: "var(--dialogBackgroundFilter)", children: [
            /* @__PURE__ */ n(ke, { x: 0, y: 0, rx: d, width: e, height: t }),
            m
          ] })
        ] }) })
      ]
    }
  );
}, ke = ({ x: e, y: t, width: s, height: a, rx: o }) => {
  const l = In(e, t, s, a, o ?? 0);
  return /* @__PURE__ */ n("path", { d: l });
}, kn = ({ open: e = !0, onClose: t, children: s, measure: a, render: o }) => {
  const l = u.useRef(null), [d] = $e(l), r = u.useMemo(() => {
    if (typeof window > "u")
      return { x: 0, y: 0, overflowX: 0, overflowY: 0, width: 0, height: 0 };
    const f = {
      x: window.scrollX,
      y: window.scrollY,
      width: window.innerWidth,
      height: window.innerHeight
    }, b = {
      width: Math.min(f.width, 320),
      height: Math.min(f.height, 240)
    }, i = {
      x: (a.x < (f.width + f.x) / 2, a.x),
      y: a.y < (f.height + f.y) / 2 ? a.y : a.y - b.height - a.height,
      width: b.width,
      height: b.height
    }, g = i.x + i.width, N = i.x, w = Math.max(g - f.width, 0), k = Math.min(N, 0);
    i.x += -w + k;
    const C = i.y, $ = i.y + i.height, E = Math.max($ - f.height, 0), L = Math.min(C, 0);
    return i.y += -E + L, i.y < (f.y + f.height) / 2 && (i.y += a.height), i;
  }, [a, d]), [c, p] = Ee({
    onClose: t
  }), m = u.useRef(null), h = {
    x: a.x + a.width / 2,
    y: a.y + a.height / 2
  };
  return /* @__PURE__ */ x(F, { children: [
    /* @__PURE__ */ n("i", { ref: m }),
    /* @__PURE__ */ n(Ae, { parentNode: m.current, children: /* @__PURE__ */ n(
      "div",
      {
        className: X.base,
        "data-open": e,
        style: {
          pointerEvents: e ? "auto" : "none"
        },
        children: /* @__PURE__ */ n("div", { className: X.container, ref: c, children: /* @__PURE__ */ x(
          "div",
          {
            className: X.body,
            style: {
              width: r.width,
              height: r.height,
              transform: `translate(${r.x}px, ${r.y}px)`
            },
            children: [
              /* @__PURE__ */ n("div", { className: X.decoration, children: /* @__PURE__ */ n(
                Cn,
                {
                  width: r.width,
                  height: r.height,
                  x: r.x,
                  y: r.y,
                  lookAtX: h.x,
                  lookAtY: h.y
                }
              ) }),
              /* @__PURE__ */ n("div", { className: X.content, ref: p, children: /* @__PURE__ */ x("div", { ref: l, className: X.fitbox, children: [
                s,
                o && o(r)
              ] }) })
            ]
          }
        ) })
      }
    ) })
  ] });
};
kn.displayName = "ContextualMenu";
const Wa = (e) => {
  const [t, s] = ct(e ?? !1), a = u.useRef(null), [o, l] = $e(a);
  return u.useEffect(() => {
    l();
  }, [t]), [a, t, s, o];
}, Sn = ({ open: e = !0, onClose: t, children: s, potal: a = !0 }) => /* @__PURE__ */ n(ee, { open: e, onClose: t, potal: a, children: /* @__PURE__ */ n("section", { className: Oe.content, children: s }) });
Sn.displayName = "Modal";
const Pe = ({
  isLoading: e,
  onSelect: t,
  message: s,
  defaultValue: a,
  open: o,
  onClose: l,
  potal: d,
  onCancel: r
}) => {
  const c = A(
    (p) => {
      if (p.preventDefault(), !(p.target instanceof HTMLFormElement))
        return;
      const m = p.target.querySelector('input[name="value"]');
      if (!(m instanceof HTMLInputElement))
        return;
      const h = m.value;
      t(h);
    },
    [t]
  );
  return /* @__PURE__ */ n(ee, { open: o, onClose: l, potal: d, children: /* @__PURE__ */ n("div", { className: U.content, "data-is-loading": e, children: /* @__PURE__ */ x("form", { onSubmit: c, children: [
    /* @__PURE__ */ n(st, { children: s }),
    /* @__PURE__ */ n(pe, { defaultValue: a, name: "value" }),
    /* @__PURE__ */ x("div", { className: U.buttonGroup, children: [
      /* @__PURE__ */ n(me, { onClick: r, type: "reset", disabled: e, variant: "alert", children: "Cancel" }),
      /* @__PURE__ */ n(me, { type: "submit", disabled: e, variant: "alert primary", children: "OK" })
    ] })
  ] }) }) });
};
Pe.displayName = "Prompt";
const ja = () => {
  const [e, t] = u.useState([]), s = u.useCallback(
    (c) => {
      t((p) => p.filter((m) => m.id !== c));
    },
    [t]
  ), a = u.useCallback(
    async (c) => new Promise((p, m) => {
      t((h) => [
        ...h,
        {
          type: "alert",
          id: Symbol("alert"),
          message: c,
          resolve: (f) => {
            s(f), p(void 0);
          },
          reject: (f) => {
            s(f), m();
          }
        }
      ]);
    }),
    [s]
  ), o = u.useCallback(async (c) => new Promise((p, m) => {
    t((h) => [
      ...h,
      {
        type: "confirm",
        id: Symbol("alert"),
        message: c,
        resolve: (f) => {
          s(f), p(f);
        },
        reject: (f) => {
          s(f), m();
        }
      }
    ]);
  }), []), l = u.useCallback(async (c, p) => new Promise((m, h) => {
    t((f) => [
      ...f,
      {
        type: "prompt",
        id: Symbol("alert"),
        defaultValue: p,
        message: c,
        resolve: (b, i) => {
          s(b), m(i);
        },
        reject: (b) => {
          s(b), h();
        }
      }
    ]);
  }), []), d = u.Fragment;
  return {
    confirm: o,
    alert: a,
    prompt: l,
    Outlet: () => /* @__PURE__ */ n(d, { children: e.map(({ id: c, type: p, title: m, message: h, defaultValue: f, resolve: b, reject: i }, g) => {
      switch (p) {
        case "alert":
          return /* @__PURE__ */ n(
            fe,
            {
              open: !0,
              mark: "alert",
              title: m,
              description: h,
              onSelect: (N) => b(c),
              onClose: () => b(c),
              actions: [{ key: "confirm", value: "ok", variant: "primary" }]
            },
            g
          );
        case "confirm":
          return /* @__PURE__ */ n(
            fe,
            {
              open: !0,
              mark: "alert",
              title: m,
              description: h,
              onSelect: (N) => {
                N === "confirm" ? b(c) : i(c);
              },
              onClose: () => i(c),
              actions: [
                { key: "confirm", value: "ok", variant: "primary" },
                { key: "dismiss", value: "Cancel" }
              ]
            },
            g
          );
        case "prompt":
          return /* @__PURE__ */ n(
            Pe,
            {
              open: !0,
              message: h ?? "",
              onSelect: (N) => {
                b(c, N);
              },
              defaultValue: f,
              onClose: () => i(c),
              onCancel: () => i(c)
            },
            g
          );
      }
      return /* @__PURE__ */ n(F, {});
    }) })
  };
}, Mn = ({
  variant: e,
  clickable: t = !1,
  disabled: s = !1,
  className: a,
  style: o,
  ...l
}) => /* @__PURE__ */ n(
  "div",
  {
    className: `${I.card} ${a || ""}`,
    "data-variant": e,
    "data-clickable": t,
    "data-disabled": s,
    tabIndex: t && !s ? 0 : void 0,
    role: t ? "button" : void 0,
    "aria-disabled": t && s ? !0 : void 0,
    style: {
      ...o,
      ...t && !s ? { cursor: "pointer" } : {}
    },
    ...l
  }
);
Mn.displayName = "Card";
const Xa = te, Ln = ({
  items: e,
  setItems: t,
  element: s
}) => /* @__PURE__ */ n(te, { items: e, onChange: t, children: e.map((a, o) => /* @__PURE__ */ n(u.Fragment, { children: s(a, o) }, a.id)) });
Ln.displayName = "SortableList";
const $n = "shrcon", En = "shrdropdown", An = "shrdrobot", Rn = "shrdroappbot", Tn = "shrdrotop", On = "shrdroapptop", Dn = "shrsea", Bn = "shrseazC3", Pn = "shrseanCa", Hn = "shrconsea", Fn = "shrnoopt", zn = "shroptions", Vn = "shroption", qn = "shropt", Wn = "shroptcpL", jn = "shrchkemp", Xn = "shroptczS", R = {
  contextDialog: $n,
  dropdown: En,
  dropdownBottom: An,
  dropdownAppearBottom: Rn,
  dropdownTop: Tn,
  dropdownAppearTop: On,
  searchHeader: Dn,
  searchInputContainer: Bn,
  searchIcon: Pn,
  contextSearchInput: Hn,
  noOptions: Fn,
  options: zn,
  option: Vn,
  optionButton: qn,
  optionCheckbox: Wn,
  checkboxEmpty: jn,
  optionLabel: Xn
}, He = u.forwardRef(({
  isOpen: e,
  position: t,
  dialogPosition: s,
  options: a,
  selectedValues: o,
  multiple: l = !1,
  searchTerm: d,
  onSearchChange: r,
  onOptionToggle: c,
  onClose: p,
  searchPlaceholder: m = "Search options...",
  noOptionsMessage: h = "No options available",
  noMatchingMessage: f = "No matching options found"
}, b) => {
  const i = u.useRef(null);
  u.useEffect(() => {
    const N = (C) => {
      C.key === "Escape" && e && p();
    }, w = b && "current" in b ? b.current : null, k = (C) => {
      C.target === w && p();
    };
    return w && w.addEventListener("click", k), document.addEventListener("keydown", N), () => {
      w && w.removeEventListener("click", k), document.removeEventListener("keydown", N);
    };
  }, [e, p, b]), u.useEffect(() => {
    e && i.current && setTimeout(() => {
      i.current && i.current.focus();
    }, 50);
  }, [e]);
  const g = u.useMemo(() => d ? a.filter(
    (N) => N.label.toLowerCase().includes(d.toLowerCase())
  ) : a, [a, d]);
  return /* @__PURE__ */ n(
    "dialog",
    {
      ref: b,
      className: R.contextDialog,
      style: {
        top: `${s.top}px`,
        left: `${s.left}px`,
        width: `${s.width}px`
      },
      children: /* @__PURE__ */ x(
        "div",
        {
          className: `${R.dropdown} ${R[`dropdown${t === "top" ? "Top" : "Bottom"}`]}`,
          children: [
            /* @__PURE__ */ n("div", { className: R.searchHeader, children: /* @__PURE__ */ x("div", { className: R.searchInputContainer, children: [
              /* @__PURE__ */ n(at, { size: 14, className: R.searchIcon }),
              /* @__PURE__ */ n(
                "input",
                {
                  ref: i,
                  type: "text",
                  value: d,
                  placeholder: m,
                  onChange: (N) => r(N.target.value),
                  className: R.contextSearchInput,
                  autoComplete: "off",
                  autoFocus: !0
                }
              )
            ] }) }),
            g.length === 0 ? /* @__PURE__ */ n("div", { className: R.noOptions, children: d ? f : h }) : /* @__PURE__ */ n("ul", { className: R.options, children: g.map((N, w) => {
              const k = o.includes(N.value);
              return /* @__PURE__ */ n("li", { className: R.option, children: /* @__PURE__ */ x(
                "button",
                {
                  type: "button",
                  className: R.optionButton,
                  onClick: () => c(N.value),
                  children: [
                    l && /* @__PURE__ */ n("span", { className: R.optionCheckbox, children: k ? /* @__PURE__ */ n("span", { children: "✓" }) : /* @__PURE__ */ n("span", { className: R.checkboxEmpty }) }),
                    /* @__PURE__ */ n("span", { className: R.optionLabel, children: N.label })
                  ]
                }
              ) }, w);
            }) })
          ]
        }
      )
    }
  );
});
He.displayName = "SelectDropdown";
const Gn = "shrselmar", Qn = "shrsel", Yn = "shrinpcnt shrsel0qy", Zn = "shrctn", Kn = "shrmark shrselmarbiW", de = {
  selectMark: Gn,
  selectContainer: Qn,
  inputContainer: Yn,
  content: Zn,
  mark: Kn
}, Fe = u.forwardRef(({
  children: e,
  onClick: t,
  disabled: s = !1,
  isOpen: a = !1,
  className: o
}, l) => /* @__PURE__ */ x(
  "div",
  {
    ref: l,
    className: `${de.inputContainer} ${o || ""}`,
    onClick: s ? void 0 : t,
    "data-disabled": s,
    children: [
      /* @__PURE__ */ n("div", { className: de.content, children: e }),
      /* @__PURE__ */ n("div", { className: de.mark, role: "presentation", children: /* @__PURE__ */ n(G, { direction: a ? "up" : "down" }) })
    ]
  }
));
Fe.displayName = "SelectInput";
const _n = "shrtagseg", Un = "shrtagtxt", Jn = "shrtagrem", es = "shrsinval", ts = "shrpla", Y = {
  tagSegment: _n,
  tagText: Un,
  tagRemove: Jn,
  singleValue: es,
  placeholder: ts
}, ze = ({
  selectedValues: e,
  getOptionLabel: t,
  onRemoveTag: s,
  placeholder: a = "Select option...",
  multiple: o = !1,
  disabled: l = !1,
  renderSelected: d
}) => {
  if (e.length === 0)
    return /* @__PURE__ */ n("span", { className: Y.placeholder, children: a });
  if (!o && e.length > 0) {
    const r = e[0];
    return /* @__PURE__ */ n("span", { className: Y.singleValue, children: d ? d(r) : t(r) });
  }
  return /* @__PURE__ */ n(F, { children: e.map((r, c) => /* @__PURE__ */ x("span", { className: Y.tagSegment, children: [
    /* @__PURE__ */ n("span", { className: Y.tagText, children: t(r) }),
    !l && s && /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        className: Y.tagRemove,
        onClick: (p) => s(r, p),
        "aria-label": `Remove ${t(r)}`,
        children: "×"
      }
    )
  ] }, c)) });
};
ze.displayName = "SelectTags";
const ns = ({
  value: e,
  defaultValue: t,
  multiple: s = !1,
  disabled: a = !1,
  onChange: o
}) => {
  const [l, d] = u.useState(() => t), r = u.useMemo(() => e !== void 0 ? e : l, [e, l]), c = u.useMemo(() => s ? Array.isArray(r) ? r.map(String) : r ? [String(r)] : [] : r ? [String(r)] : [], [r, s]), p = u.useCallback((h) => {
    if (a) return;
    let f;
    if (s) {
      const b = Array.isArray(r) ? r.map(String) : r ? [String(r)] : [];
      b.includes(h) ? f = b.filter((i) => i !== h) : f = [...b, h];
    } else
      f = h;
    d(f), o && o(f);
  }, [a, s, r, o]), m = u.useCallback((h, f) => {
    if (a) return;
    f.stopPropagation();
    const i = (Array.isArray(r) ? r.map(String) : r ? [String(r)] : []).filter((g) => g !== h);
    d(i), o && o(i);
  }, [a, r, o]);
  return {
    currentValue: r,
    selectedValues: c,
    handleToggleOption: p,
    handleRemoveTag: m
  };
}, ss = ({
  onClose: e
} = {}) => {
  const [t, s] = u.useState(!1), [a, o] = u.useState(""), [l, d] = u.useState("bottom"), [r, c] = u.useState({ top: 0, left: 0, width: 0 }), p = u.useRef(null), m = u.useRef(null), h = u.useCallback(() => {
    if (!p.current) return { position: "bottom", dialogPos: { top: 0, left: 0, width: 0 } };
    const g = p.current.getBoundingClientRect(), N = window.innerHeight, w = 200, k = N - g.bottom, C = g.top, $ = {
      top: k < w && C >= w ? g.top - w - 8 : g.bottom + 4,
      // Position below
      left: g.left,
      width: g.width
    };
    return { position: k < w && C >= w ? "top" : "bottom", dialogPos: $ };
  }, []), f = u.useCallback(() => {
    const { position: g, dialogPos: N } = h();
    d(g), c(N), s(!0), m.current && m.current.showModal();
  }, [h]), b = u.useCallback(() => {
    m.current && m.current.open && m.current.close();
  }, []), i = u.useCallback(() => {
    s(!1), o(""), e && e();
  }, [e]);
  return u.useEffect(() => {
    const g = () => {
      if (t && p.current) {
        const { position: w, dialogPos: k } = h();
        d(w), c(k);
      }
    }, N = m.current;
    return N && N.addEventListener("close", i), window.addEventListener("resize", g), window.addEventListener("scroll", g), () => {
      N && N.removeEventListener("close", i), window.removeEventListener("resize", g), window.removeEventListener("scroll", g);
    };
  }, [t, h, i]), {
    isOpen: t,
    searchTerm: a,
    dropdownPosition: l,
    dialogPosition: r,
    containerRef: p,
    dialogRef: m,
    openDialog: f,
    closeDialog: b,
    setSearchTerm: o
  };
}, as = (e) => u.isValidElement(e) && e.type === "option", Se = (e) => e === void 0 ? [] : Array.isArray(e) ? [...e] : [e], rs = ({
  children: e,
  value: t,
  defaultValue: s,
  multiple: a = !0
}) => {
  const o = t !== void 0, [l, d] = u.useState(() => Se(o ? t : s)), r = o ? Se(t) : l, c = u.useMemo(() => u.Children.toArray(e).filter(as).map((i) => {
    var g;
    return {
      value: i.props.value,
      label: ((g = i.props.children) == null ? void 0 : g.toString()) || i.props.value
    };
  }), [e]), p = u.useCallback((b, i) => {
    if (!a) {
      d(i ? [b] : []);
      return;
    }
    d((g) => i ? [...g, b] : g.filter((N) => N !== b));
  }, [a]), m = u.useCallback((b) => {
    d(b ? c.map((i) => i.value) : []);
  }, [c]), h = r.length > 0 && r.length < c.length, f = h ? !1 : r.length === c.length;
  return {
    options: c,
    selectedValues: r,
    handleToggleOption: p,
    handleToggleAll: m,
    isCheckedAll: f,
    isCheckedPartially: h
  };
}, os = "frmcnt", ls = "frmhid", cs = {
  container: os,
  hiddenInput: ls
}, Ga = ({
  value: e,
  defaultValue: t,
  name: s,
  list: a,
  renderSelected: o,
  placeholder: l = "Select option...",
  multiple: d = !1,
  disabled: r = !1,
  onChange: c,
  ...p
}) => {
  const {
    currentValue: m,
    selectedValues: h,
    handleToggleOption: f,
    handleRemoveTag: b
  } = ns({ value: e, defaultValue: t, multiple: d, disabled: r, onChange: c }), {
    isOpen: i,
    searchTerm: g,
    dropdownPosition: N,
    dialogPosition: w,
    containerRef: k,
    dialogRef: C,
    openDialog: $,
    closeDialog: E,
    setSearchTerm: L
  } = ss(), D = u.useCallback(() => {
    !i && !r && $();
  }, [i, r, $]), z = u.useCallback((O) => {
    f(O), d || E();
  }, [f, d, E]), { dataListElement: Q, options: W } = is({ list: a }), ne = u.useCallback((O) => {
    var se;
    return ((se = W == null ? void 0 : W.find((le) => le.value === O)) == null ? void 0 : se.label) || O;
  }, [W]);
  return /* @__PURE__ */ x("div", { className: cs.container, ref: k, children: [
    /* @__PURE__ */ n(
      Fe,
      {
        onClick: D,
        disabled: r,
        isOpen: i,
        children: /* @__PURE__ */ n(
          ze,
          {
            selectedValues: h,
            getOptionLabel: ne,
            onRemoveTag: b,
            placeholder: l,
            multiple: d,
            disabled: r,
            renderSelected: o ? (O) => o(O, Q == null ? void 0 : Q.querySelector(`option[value="${O}"]`)) : void 0
          }
        )
      }
    ),
    /* @__PURE__ */ n(
      He,
      {
        ref: C,
        isOpen: i,
        position: N,
        dialogPosition: w,
        options: W || [],
        selectedValues: h,
        multiple: d,
        searchTerm: g,
        onSearchChange: L,
        onOptionToggle: z,
        onClose: E
      }
    ),
    /* @__PURE__ */ n(
      "input",
      {
        type: "hidden",
        name: s,
        value: d ? JSON.stringify(h) : String(h[0] || "")
      }
    )
  ] });
}, is = ({ list: e }) => {
  const [t, s] = u.useState(), [a, o] = u.useState([]);
  return u.useEffect(() => {
    if (!(window != null && window.document) || !e)
      return;
    const l = document.getElementById(e);
    if (!l || !(l instanceof HTMLDataListElement))
      return;
    s(l);
    const r = Array.from(l.options).map((c) => ({
      value: c.value,
      label: c.label || c.textContent || c.value
    }));
    o(r);
  }, [e]), { dataListElement: t, options: a };
}, ds = "frmclsbtn", us = {
  closeButton: ds
}, Qa = P.memo(
  P.forwardRef(({ children: e, ...t }, s) => /* @__PURE__ */ n("button", { ...t, ref: s, className: us.closeButton, "aria-label": "Close", type: "button", "data-variant": "close", children: /* @__PURE__ */ n(rt, { size: 16 }) }))
), ms = "blctime", fs = {
  time: ms
}, Me = (e) => e == null ? !1 : typeof e == "number" ? !0 : typeof e == "string" ? !isNaN(Date.parse(e)) : e instanceof Date && !isNaN(e.getTime()), hs = y(
  v((e, t) => {
    const s = P.useMemo(() => {
      if (e.type === "ulid")
        return typeof e.timestamp != "string" ? void 0 : gs(e.timestamp);
      if (!e.timestamp)
        return;
      if (e.type === "unix" || e.type === "unixtime") {
        const l = typeof e.timestamp == "number" ? e.timestamp : +e.timestamp;
        return new Date(l * 1e3);
      }
      return Me(e.timestamp) && e.timestamp instanceof Date ? e.timestamp : new Date(e.timestamp);
    }, [e.timestamp, e.type]), a = P.useMemo(() => {
      if (Me(s) && s instanceof Date) {
        if (!e.format)
          return s.toLocaleString();
        const o = {
          y: s.getFullYear(),
          M: s.getMonth() + 1,
          d: s.getDate(),
          H: s.getHours(),
          m: s.getMinutes(),
          s: s.getSeconds()
        };
        return e.format.replace(/yyyy|MM|dd|HH|mm|ss|yy/g, (l) => {
          const d = l.length, r = l.charAt(0), c = o[r];
          return typeof c > "u" ? l : c.toString().padStart(d, "0");
        });
      }
    }, [s, e.format]);
    return /* @__PURE__ */ n("time", { className: fs.time, ...e, ref: t, children: /* @__PURE__ */ n(he, { children: a }) });
  })
);
hs.displayName = "Time";
const ps = "0123456789ABCDEFGHJKMNPQRSTVWXYZ", gs = (e) => {
  let t = 0;
  const s = e.substring(0, 10).toUpperCase();
  for (let a = 0; a < s.length; a++) {
    const o = s.charAt(a), l = ps.indexOf(o), d = 9 - a;
    t += Math.pow(32, d) * l;
  }
  return new Date(t);
}, bs = "lmnlist", ys = "lmnlistitm", vs = "lmnlis", Ns = "lmnlisare", ws = "lmnlischi", oe = {
  list: bs,
  listItem: ys,
  listItemLabel: vs,
  listItemLabelArea: Ns,
  listItemChildren: ws
}, be = y(
  v(({ children: e, ...t }, s) => /* @__PURE__ */ n("ul", { className: oe.list, ...t, ref: s, children: e }))
), Ya = be;
be.displayName = "List";
const Is = y(
  v(({ children: e, ...t }, s) => /* @__PURE__ */ n("li", { className: oe.listItem, ...t, ref: s, children: /* @__PURE__ */ n("div", { className: oe.listItemLabelArea, children: /* @__PURE__ */ n("span", { className: oe.listItemLabel, children: e }) }) }))
), Za = Is, xs = y(
  v(({ children: e, ...t }, s) => /* @__PURE__ */ n("fieldset", { className: q.fieldset, ...t, ref: s, children: e }))
);
xs.displayName = "Fieldset";
const Cs = y(
  v((e, t) => /* @__PURE__ */ n("legend", { className: q.legend, ref: t, children: e.children }))
);
Cs.displayName = "Legend";
const ks = "frmseliWx", Ss = "frmslc", Ms = "frmslcAll", Ls = "frmmarkI0Z", J = {
  selectbox: ks,
  selectable: Ss,
  selectableAll: Ms,
  mark: Ls
}, $s = "lmntable", Es = {
  table: $s
}, Ve = y(
  v((e, t) => /* @__PURE__ */ n("table", { className: Es.table, ...e, ref: t, children: e.children }))
);
Ve.displayName = "Table";
const As = v((e, t) => e["data-variant"] === "selectable" ? /* @__PURE__ */ n(Rs, { switch: e.switch, children: e.children }) : /* @__PURE__ */ n(qe, { hidden: e.hidden, children: /* @__PURE__ */ n("select", { ...e, ref: t, children: e.children }) }));
As.displayName = "Selectbox";
const Rs = ({
  children: e,
  hidden: t,
  ...s
}) => {
  const a = u.useRef(null), {
    options: o,
    selectedValues: l,
    handleToggleOption: d,
    handleToggleAll: r,
    isCheckedAll: c,
    isCheckedPartially: p
  } = rs({
    children: e,
    value: s.value,
    defaultValue: s.defaultValue,
    multiple: !0
  }), m = u.useCallback(
    (f, b) => {
      const i = a.current;
      if (!i)
        return;
      const g = i.querySelector(`option[value="${f}"]`);
      if (!g)
        return;
      d(f, b), g.setAttribute("checked", b.toString());
      const N = new Event("change", { bubbles: !0 });
      i.dispatchEvent(N);
    },
    [d]
  ), h = u.useCallback(
    (f) => {
      var N, w;
      const b = f.target.checked, i = f.target.indeterminate;
      r(!!(i || b));
      const g = (N = a.current) == null ? void 0 : N.querySelectorAll("option");
      if (g) {
        Array.from(g).forEach((C) => {
          C.setAttribute("checked", (i || b).toString());
        });
        const k = new Event("change", { bubbles: !0 });
        (w = a.current) == null || w.dispatchEvent(k);
      }
    },
    [r]
  );
  return /* @__PURE__ */ x("div", { className: J.selectable, "data-hidden": t, ...s, children: [
    /* @__PURE__ */ n(
      "select",
      {
        ...s,
        multiple: !0,
        ref: a,
        style: {
          display: "none"
        },
        children: e
      }
    ),
    /* @__PURE__ */ x(Ve, { children: [
      /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ x("tr", { children: [
        /* @__PURE__ */ n("th", { className: J.selectableAll, children: /* @__PURE__ */ n(
          pe,
          {
            type: "checkbox",
            "data-size": "small",
            checked: c,
            onChange: h,
            id: s.id,
            indeterminate: p
          }
        ) }),
        /* @__PURE__ */ n("th", { children: s["aria-label"] })
      ] }) }),
      /* @__PURE__ */ n("tbody", { children: o.map((f, b) => /* @__PURE__ */ n(
        Ts,
        {
          values: l,
          value: f.value,
          onChange: m,
          switch: s.switch,
          children: f.label
        },
        f.value
      )) })
    ] }),
    /* @__PURE__ */ n("div", { className: J.mark, role: "presentation", children: /* @__PURE__ */ n(G, {}) })
  ] });
}, Ts = ({
  values: e,
  value: t,
  onChange: s,
  children: a,
  ...o
}) => {
  const l = e.includes(t), d = u.useId(), r = u.useCallback(
    (c) => {
      s(t, c.target.checked);
    },
    [t, s]
  );
  return /* @__PURE__ */ x("tr", { children: [
    /* @__PURE__ */ n("th", { children: /* @__PURE__ */ n(pe, { type: "checkbox", switch: o.switch, "data-size": "small", checked: l, onChange: r, id: d }) }),
    /* @__PURE__ */ n("td", { children: a })
  ] });
}, qe = ({ children: e, hidden: t, ...s }) => /* @__PURE__ */ x("div", { className: J.selectbox, "data-hidden": t, ...s, children: [
  e,
  /* @__PURE__ */ n("div", { className: J.mark, role: "presentation", children: /* @__PURE__ */ n(G, {}) })
] });
qe.displayName = "View";
const Os = y(
  v((e, t) => /* @__PURE__ */ n("textarea", { className: Le.input, ...e, ref: t, children: e.children }))
);
Os.displayName = "Textarea";
const Ds = "nvgsummary", Bs = "nvgmarker", Ps = "nvgdetails", Hs = "nvgbtn", Fs = "nvgsectit", zs = "nvglistitm", Vs = "nvglisare", qs = "nvglis", Ws = "nvglischi", T = {
  summary: Ds,
  marker: Bs,
  details: Ps,
  button: Hs,
  sectionTitle: Fs,
  listItem: zs,
  listItemLabelArea: Vs,
  listItemLabel: qs,
  listItemChildren: Ws
}, We = P.memo(
  P.forwardRef((e, t) => /* @__PURE__ */ n("details", { className: T.details, ...e, ref: t, children: e.children }))
);
We.displayName = "Container";
const je = P.memo(({ title: e, children: t }) => /* @__PURE__ */ n(ye, { children: /* @__PURE__ */ x("div", { className: T.sectionTitle, children: [
  /* @__PURE__ */ n("span", { children: e }),
  t,
  /* @__PURE__ */ n("i", { className: T.marker, children: /* @__PURE__ */ n(G, {}) })
] }) }));
je.displayName = "SectionTitle";
const Xe = P.forwardRef((e, t) => /* @__PURE__ */ n("button", { ...e, ref: t, className: T.button }));
Xe.displayName = "Button";
const js = y(({ label: e, onClick: t, icon: s, selected: a, children: o, open: l, ...d }) => {
  const c = /* @__PURE__ */ x(t ? "button" : "div", { className: T.listItemLabelArea, onClick: t, children: [
    typeof s == "string" ? /* @__PURE__ */ n("div", { className: T.listItemMarker, children: s }) : s,
    /* @__PURE__ */ n("span", { className: T.listItemLabel, children: e })
  ] });
  return /* @__PURE__ */ n("li", { className: T.listItem, "data-selected": a, ...d, children: o ? /* @__PURE__ */ x("details", { open: l, className: T.details, children: [
    /* @__PURE__ */ x("summary", { className: T.summary, children: [
      c,
      /* @__PURE__ */ n("i", { className: T.marker, children: /* @__PURE__ */ n(G, {}) })
    ] }),
    /* @__PURE__ */ n("div", { className: T.listItemChildren, children: o })
  ] }) : c });
}), ye = P.memo(({ children: e }) => /* @__PURE__ */ n("summary", { className: T.summary, children: e }));
ye.displayName = "Summary";
const Ka = {
  Button: Xe,
  Container: We,
  SectionTitle: je,
  Summary: ye,
  ListItem: js,
  List: be
}, Ge = v((e, t) => {
  const s = et(() => [I.a, e.className].join(" "), [e.className]);
  return /* @__PURE__ */ n("a", { ...e, className: s, ref: t, children: e.children });
});
Ge.displayName = "Anchor";
const _a = Ge, Qe = v((e, t) => /* @__PURE__ */ n("img", { className: I.image, ...e, ref: t, children: e.children }));
Qe.displayName = "Image";
const Ua = Qe, Xs = y(
  v((e, t) => /* @__PURE__ */ n("details", { className: I.details, ...e, ref: t, children: e.children }))
);
Xs.displayName = "Details";
const Gs = y(
  v((e, t) => /* @__PURE__ */ x("summary", { className: I.summary, ...e, ref: t, children: [
    /* @__PURE__ */ n("span", { className: I.label, children: e.children }),
    /* @__PURE__ */ n("i", { className: I.marker, children: /* @__PURE__ */ n(G, {}) })
  ] }))
);
Gs.displayName = "Summary";
const Ye = y(
  v((e, t) => /* @__PURE__ */ n("p", { className: I.paragraph, ...e, ref: t }))
);
Ye.displayName = "Paragraph";
const Ja = Ye, Ze = y(
  v((e, t) => /* @__PURE__ */ n("dl", { className: I.descriptions, ...e, ref: t, children: e.children }))
);
Ze.displayName = "Descriptions";
const er = Ze, Ke = y(
  v((e, t) => /* @__PURE__ */ n("hr", { className: I.horizontalrule, ...e, ref: t, children: e.children }))
);
Ke.displayName = "HorizontalRule";
const tr = Ke, Qs = y(
  v((e, t) => /* @__PURE__ */ n("article", { className: I.article, ...e, ref: t }))
);
Qs.displayName = "Article";
const Ys = y(
  v((e, t) => /* @__PURE__ */ n("section", { className: I.section, ...e, ref: t }))
);
Ys.displayName = "Section";
const Zs = y(
  v((e, t) => /* @__PURE__ */ n("nav", { className: I.nav, ...e, ref: t }))
);
Zs.displayName = "Nav";
const Ks = y(
  v((e, t) => /* @__PURE__ */ n("main", { className: I.main, ...e, ref: t }))
);
Ks.displayName = "Main";
const _s = y(
  v((e, t) => /* @__PURE__ */ n("header", { className: I.header, ...e, ref: t }))
);
_s.displayName = "Header";
const Us = y(
  v((e, t) => /* @__PURE__ */ n("footer", { className: I.footer, ...e, ref: t }))
);
Us.displayName = "Footer";
const Js = y(
  v((e, t) => /* @__PURE__ */ n("aside", { className: I.aside, ...e, ref: t }))
);
Js.displayName = "Aside";
const ea = y(
  v((e, t) => /* @__PURE__ */ n("address", { className: I.address, ...e, ref: t }))
);
ea.displayName = "Address";
const ta = y(
  v((e, t) => /* @__PURE__ */ n("blockquote", { className: I.blockquote, ...e, ref: t }))
);
ta.displayName = "Blockquote";
const na = y(
  v((e, t) => /* @__PURE__ */ n("figure", { className: I.figure, ...e, ref: t }))
);
na.displayName = "Figure";
const sa = y(
  v((e, t) => /* @__PURE__ */ n("figcaption", { className: I.figcaption, ...e, ref: t }))
);
sa.displayName = "Figcaption";
const aa = y(
  v((e, t) => /* @__PURE__ */ n("pre", { className: I.pre, ...e, ref: t }))
);
aa.displayName = "Pre";
const ra = y(
  v((e, t) => /* @__PURE__ */ n("div", { className: I.div, ...e, ref: t }))
);
ra.displayName = "Div";
const oa = y(
  v((e, t) => /* @__PURE__ */ n("form", { className: q.form, ...e, ref: t }))
);
oa.displayName = "Form";
const la = y(
  v((e, t) => /* @__PURE__ */ n("progress", { className: q.progress, ...e, ref: t }))
);
la.displayName = "Progress";
const ca = y(
  v((e, t) => /* @__PURE__ */ n("meter", { className: q.meter, ...e, ref: t }))
);
ca.displayName = "Meter";
const ia = y(
  v((e, t) => /* @__PURE__ */ n("output", { className: q.output, ...e, ref: t }))
);
ia.displayName = "Output";
const da = y(
  v((e, t) => /* @__PURE__ */ n("optgroup", { className: q.optgroup, ...e, ref: t }))
);
da.displayName = "Optgroup";
const ua = y(
  v((e, t) => /* @__PURE__ */ n("option", { className: q.option, ...e, ref: t }))
);
ua.displayName = "Option";
const ma = y(
  v((e, t) => /* @__PURE__ */ n("strong", { className: I.strong, ...e, ref: t }))
);
ma.displayName = "Strong";
const fa = y(
  v((e, t) => /* @__PURE__ */ n("em", { className: I.em, ...e, ref: t }))
);
fa.displayName = "Em";
const ha = y(
  v((e, t) => /* @__PURE__ */ n("small", { className: I.small, ...e, ref: t }))
);
ha.displayName = "Small";
const pa = y(
  v((e, t) => /* @__PURE__ */ n("mark", { className: I.mark, ...e, ref: t }))
);
pa.displayName = "Mark";
const ga = y(
  v((e, t) => /* @__PURE__ */ n("del", { className: I.del, ...e, ref: t }))
);
ga.displayName = "Del";
const ba = y(
  v((e, t) => /* @__PURE__ */ n("ins", { className: I.ins, ...e, ref: t }))
);
ba.displayName = "Ins";
const ya = y(
  v((e, t) => /* @__PURE__ */ n("sub", { className: I.sub, ...e, ref: t }))
);
ya.displayName = "Sub";
const va = y(
  v((e, t) => /* @__PURE__ */ n("sup", { className: I.sup, ...e, ref: t }))
);
va.displayName = "Sup";
const Na = y(
  v((e, t) => /* @__PURE__ */ n("code", { className: I.code, ...e, ref: t }))
);
Na.displayName = "Code";
const wa = y(
  v((e, t) => /* @__PURE__ */ n("kbd", { className: I.kbd, ...e, ref: t }))
);
wa.displayName = "Kbd";
const Ia = y(
  v((e, t) => /* @__PURE__ */ n("samp", { className: I.samp, ...e, ref: t }))
);
Ia.displayName = "Samp";
const xa = y(
  v((e, t) => /* @__PURE__ */ n("var", { className: I.var, ...e, ref: t }))
);
xa.displayName = "Var";
const Ca = y(
  v((e, t) => /* @__PURE__ */ n("abbr", { className: I.abbr, ...e, ref: t }))
);
Ca.displayName = "Abbr";
const ka = y(
  v((e, t) => /* @__PURE__ */ n("cite", { className: I.cite, ...e, ref: t }))
);
ka.displayName = "Cite";
const Sa = y(
  v((e, t) => /* @__PURE__ */ n("dfn", { className: I.dfn, ...e, ref: t }))
);
Sa.displayName = "Dfn";
const Ma = y(
  v((e, t) => /* @__PURE__ */ n("q", { className: I.q, ...e, ref: t }))
);
Ma.displayName = "Q";
const La = y(
  v((e, t) => /* @__PURE__ */ n("ruby", { className: I.ruby, ...e, ref: t }))
);
La.displayName = "Ruby";
const $a = y(
  v((e, t) => /* @__PURE__ */ n("rt", { className: I.rt, ...e, ref: t }))
);
$a.displayName = "Rt";
const Ea = y(
  v((e, t) => /* @__PURE__ */ n("ol", { className: I.ol, ...e, ref: t }))
);
Ea.displayName = "Ol";
const Aa = y(
  v((e, t) => /* @__PURE__ */ n("dd", { className: I.dd, ...e, ref: t }))
);
Aa.displayName = "Dd";
const Ra = y(
  v((e, t) => /* @__PURE__ */ n("dt", { className: I.dt, ...e, ref: t }))
);
Ra.displayName = "Dt";
const Ta = y(
  v((e, t) => /* @__PURE__ */ n("th", { className: I.th, ...e, ref: t }))
);
Ta.displayName = "Th";
const Oa = y(
  v((e, t) => /* @__PURE__ */ n("td", { className: I.td, ...e, ref: t }))
);
Oa.displayName = "Td";
const Da = y(
  v((e, t) => /* @__PURE__ */ n("caption", { className: I.caption, ...e, ref: t }))
);
Da.displayName = "Caption";
export {
  _a as A,
  Ca as Abbr,
  ea as Address,
  fe as Alert,
  Ge as Anchor,
  Qs as Article,
  Js as Aside,
  ar as BarItems,
  ta as Blockquote,
  me as Button,
  Da as Caption,
  Mn as Card,
  ka as Cite,
  Qa as CloseButton,
  Na as Code,
  kn as ContextualMenu,
  Ga as DataList,
  Aa as Dd,
  ga as Del,
  Ze as Descriptions,
  Xs as Details,
  Sa as Dfn,
  Te as Dialog,
  qa as DialogFooter,
  ra as Div,
  er as Dl,
  It as Drawer,
  Ra as Dt,
  xt as EditableLabel,
  fa as Em,
  xs as Fieldset,
  sa as Figcaption,
  na as Figure,
  Us as Footer,
  oa as Form,
  rr as H1,
  or as H2,
  lr as H3,
  cr as H4,
  ir as H5,
  dr as H6,
  _s as Header,
  nt as Heading,
  Ke as HorizontalRule,
  tr as Hr,
  ur as Icon,
  Qe as Image,
  Ua as Img,
  pe as Input,
  ba as Ins,
  wa as Kbd,
  st as Label,
  Cs as Legend,
  Za as Li,
  be as List,
  Is as ListItem,
  Ks as Main,
  pa as Mark,
  mr as MediaInput,
  fr as MediaPreview,
  ca as Meter,
  Sn as Modal,
  Zs as Nav,
  Ea as Ol,
  da as Optgroup,
  ua as Option,
  ia as Output,
  Ja as P,
  Ye as Paragraph,
  Ae as Potal,
  aa as Pre,
  la as Progress,
  Ma as Q,
  Ut as Resizer,
  $a as Rt,
  La as Ruby,
  Ia as Samp,
  Ys as Section,
  rn as Segment,
  ln as SegmentedControl,
  As as Select,
  As as Selectbox,
  Ka as SidebarList,
  ha as Small,
  Xa as Sortable,
  Ln as SortableList,
  ma as Strong,
  ya as Sub,
  Gs as Summary,
  va as Sup,
  Yt as TabBar,
  Pt as TabNav,
  Ve as Table,
  Oa as Td,
  he as Text,
  Os as Textarea,
  Ta as Th,
  hs as Time,
  hr as Toolbar,
  Ya as Ul,
  xa as Var,
  Wa as useContextualMenu,
  pr as useMediaInputI18n,
  ja as useNativeAlertLikeInterface,
  gr as useObjectURLs,
  Ee as usePopup,
  ge as useSortable,
  on as useToggle
};
