import { jsx as n, Fragment as j, jsxs as k } from "react/jsx-runtime";
import * as i from "react";
import U, { useRef as te, useEffect as ue, useReducer as Tt, memo as y, useState as X, useCallback as L, useMemo as J, forwardRef as v, createElement as Rt, Children as Bt } from "react";
import { createPortal as Ot } from "react-dom";
import { u as nt, a as Ee } from "./vendor/useMeasure-C5eiiuB0.js";
const rt = ({
  onClose: e,
  id: t
}) => {
  const r = te(null), s = te(null), a = te(e);
  return a.current = e, ue(() => {
    let c;
    const d = (o) => {
      var l;
      if (!o.defaultPrevented && s.current && o.target instanceof HTMLElement && (o.type === "pointerdown" && (c = o.target), !(o.type !== "pointerdown" && c !== o.target))) {
        if (s.current.contains(o.target)) {
          o.stopPropagation();
          return;
        }
        if ((l = r.current) != null && l.contains(o.target)) {
          o.preventDefault(), o.stopPropagation(), a.current();
          return;
        }
      }
    };
    return window == null || window.addEventListener("pointerdown", d, !0), window == null || window.addEventListener("pointerup", d, !0), () => {
      window == null || window.removeEventListener("pointerdown", d, !0), window == null || window.removeEventListener("pointerup", d, !0);
    };
  }, []), [r, s];
}, Pt = "dlgdlg", Ft = "dlgbdr", Ht = "dlgfade-in", zt = "dlg_dlg_ovr", qt = "dlgfixed", Ut = "dlgdlgftr", jt = "dlgbodyLk3", Vt = "dlgshake", Ne = {
  dialog: Pt,
  backdrop: Ft,
  fadeIn: Ht,
  dialogOverlay: zt,
  fixed: qt,
  dialogFooter: Ut,
  body: jt,
  shake: Vt
}, Wt = () => U.useMemo(() => typeof window > "u" ? null : window.document, []), st = ({ children: e, parentNode: t }) => {
  const r = i.useId(), [s, a] = i.useState(), c = Wt();
  i.useEffect(() => {
    if (!c)
      return;
    const o = c.createElement("div");
    return o.setAttribute("id", r), c.body.appendChild(o), a(o), () => {
      c.body.contains(o) && c.body.removeChild(o), a(void 0);
    };
  }, [r, c]);
  const d = i.useMemo(() => t ? Xt(t) : [1], [t, r]);
  return s && d ? /* @__PURE__ */ n(j, { children: Ot(/* @__PURE__ */ n(at, { zIndexList: d, children: e }), s) }) : /* @__PURE__ */ n(j, {});
}, at = ({ zIndexList: e, children: t }) => {
  const [r, ...s] = e;
  return /* @__PURE__ */ n("div", { style: { position: "relative", zIndex: r }, children: s.length ? /* @__PURE__ */ n(at, { zIndexList: s, children: t }) : t });
}, Xt = (e) => {
  const t = [], r = (s) => {
    const c = +window.getComputedStyle(s).getPropertyValue("z-index");
    Number.isNaN(c) || t.push(c), s.parentElement && r(s.parentElement);
  };
  return r(e), t.reverse();
}, Zt = (e) => e ? "current" in e : !1, Gt = (...e) => U.useCallback(
  (r) => {
    for (const s of e)
      if (s) {
        if (typeof s == "string")
          throw new Error("LegacyRef is not supported");
        if (typeof s == "function") {
          s(r);
          continue;
        }
        if (Zt(s)) {
          s.current = r;
          continue;
        }
        if (s && "value" in s) {
          s.value = r;
          continue;
        }
      }
  },
  [e]
), ot = i.memo(
  i.forwardRef(({ onClose: e, modal: t = !0, open: r, ...s }, a) => {
    const [c, d] = rt({ onClose: e ?? (() => {
    }) }), o = i.useRef(null), l = Gt(a, o), m = t ? i.Fragment : st;
    i.useEffect(() => {
      const b = o.current;
      b && (r ? t ? b.showModal() : b.show() : b.close());
    }, [r, t]);
    const f = i.useCallback(
      (b) => {
        b.preventDefault(), b.stopPropagation(), e && e(b);
      },
      [e]
    ), p = /* @__PURE__ */ n("div", { ref: c, className: Ne.backdrop }), h = /* @__PURE__ */ n("div", { className: Ne.body, "data-role": "dialog-body", ref: d, children: s.children });
    return /* @__PURE__ */ n(m, { children: /* @__PURE__ */ n(
      "dialog",
      {
        className: Ne.dialog,
        ...s,
        open: t ? void 0 : r,
        ref: l,
        onClose: f,
        "data-role": t ? "modal" : "dialog-body",
        children: r && /* @__PURE__ */ k(j, { children: [
          p,
          h
        ] })
      }
    ) });
  })
);
ot.displayName = "Dialog";
const Dc = ({ children: e }) => /* @__PURE__ */ n("footer", { className: Ne.dialogFooter, children: e }), me = i.memo(
  ({ potal: e, open: t = !0, onClose: r, onCancel: s, children: a, variant: c, animationName: d, direction: o = "btt" }) => /* @__PURE__ */ n(
    ot,
    {
      onClose: r,
      onCancel: s,
      open: t,
      modal: !1,
      "data-variant": c,
      "data-animation": d,
      "data-direction": o,
      children: a
    }
  )
);
me.displayName = "PopupLayout";
const _t = "dlgctn", ct = {
  content: _t
}, Qt = ({ direction: e, open: t = !0, onClose: r, header: s, children: a, potal: c = !0 }) => /* @__PURE__ */ k(me, { open: t, onClose: r, potal: c, variant: "drawer", direction: e, children: [
  s,
  /* @__PURE__ */ n("section", { className: ct.content, children: a })
] });
Qt.displayName = "Drawer";
const Kt = "blctxt", Yt = {
  text: Kt
}, fe = ({ ruby: e, children: t }) => /* @__PURE__ */ n("span", { className: Yt.text, children: e ? /* @__PURE__ */ k("ruby", { children: [
  t,
  /* @__PURE__ */ n("rt", { children: e })
] }) : t });
fe.displayName = "Text";
const Jt = "frminp", en = "frmmediainp", tn = "frmmed", nn = "frmmedfil", rn = "frmmed9RB", sn = "frmmedhasfil", an = "frmmeddra", on = "frmbounce", cn = "frmsel", ln = "frmimgprv", dn = "frmedi", un = "frmerrLine", mn = "frmrange", fn = "frmprogress", hn = "frmbar", pn = "frmknob", q = {
  input: Jt,
  mediaInput: en,
  mediaInputPreview: tn,
  mediaInputFile: nn,
  mediaInputEmpty: rn,
  mediaInputHasFiles: sn,
  mediaInputDragActive: an,
  bounce: on,
  selectbox: cn,
  imagePreview: ln,
  editablelabel: dn,
  errorLine: un,
  range: mn,
  progress: fn,
  bar: hn,
  knob: pn
}, gn = ({ ...e }) => {
  const [t, r] = i.useState(!1), s = i.useCallback(() => {
    r(!0);
  }, []), a = i.useCallback(() => {
    r(!1);
  }, []), c = (d) => {
    d instanceof HTMLInputElement && d.focus();
  };
  return /* @__PURE__ */ k(j, { children: [
    /* @__PURE__ */ n(
      "input",
      {
        ...e,
        className: q.editablelabel,
        autoFocus: !0,
        ref: c,
        onBlur: a,
        type: "text",
        style: { display: t ? "block" : "none" }
      }
    ),
    !t && /* @__PURE__ */ n("span", { onClick: s, children: /* @__PURE__ */ n(fe, { children: e.value ?? e.defaultValue }) })
  ] });
};
gn.displayName = "EditableLabel";
const bn = "nvgtabnav", yn = "nvgsrtitm", vn = "nvgsrtcon", Nn = "nvghdl", wn = "nvgsrtbod", kn = "nvgico", xn = "nvgdel", ce = {
  tabnav: bn,
  sortableItem: yn,
  sortableItemControl: vn,
  handle: Nn,
  sortableItemBody: wn,
  icon: kn,
  deleteButton: xn
};
var In = function(e, t) {
  return typeof t == "boolean" ? t : !e;
}, Cn = function(e) {
  return Tt(In, e);
};
function De(e) {
  var t = te();
  return ue(function() {
    t.current = e;
  }), t.current;
}
const Sn = "cntsrtitm", $n = "cntsrtbod", Mn = "cntsrt", Me = {
  sortableItem: Sn,
  sortableItemBody: $n,
  sortableItemHandle: Mn
}, Ge = () => Math.random().toString(36).substring(2), Ln = ({
  value: e,
  onChange: t
}) => {
  const [r, s] = i.useState(() => (e ?? []).map((l) => ({ value: l, id: Ge() }))), a = De(r), c = i.useRef(t);
  c.current = t, i.useEffect(() => {
    if (!a || !c.current)
      return;
    const o = r.map((l) => l.value);
    c.current(o);
  }, [r]);
  const d = De(e);
  return i.useEffect(() => {
    if (!d || !e)
      return;
    const o = e;
    s((l) => {
      const m = l.map((u) => u.value), f = m.length === o.length;
      if (f && o.every((u, g) => u === m[g]))
        return l;
      const h = new WeakMap(l.map((u) => [u.value, u])), b = o.map((u, g) => h.has(u) ? -1 : g).filter((u) => u !== -1);
      return f ? l.map((u, g) => b.includes(g) ? { ...u, value: o[g] } : u) : o.map((u) => {
        const g = h.get(u);
        return g != null && g.value ? g : { value: u, id: Ge() };
      });
    });
  }, [e, s]), [r, s];
}, Dn = (e, t, r) => {
  const s = [...e], [a] = s.splice(t, 1);
  return s.splice(r, 0, a), s;
}, he = ({
  items: e,
  onChange: t,
  children: r,
  controlAs: s
}) => {
  const [a, c] = Ln({
    value: e,
    onChange: t
  }), d = i.useRef(/* @__PURE__ */ new WeakMap([])), [o, l] = i.useState(), [m, f] = i.useState(), p = {
    draggingId: o,
    draggingOverId: m
  }, h = i.useRef(p);
  h.current = p;
  const b = i.useCallback((w) => {
    const { draggingId: I, draggingOverId: C } = h.current;
    C !== w && (c((A) => {
      const D = A.findIndex((O) => O.id === w), M = A.findIndex((O) => O.id === C);
      return Dn(A, D, M);
    }), l(void 0), f(void 0));
  }, []), u = i.useCallback((w, I) => (d.current.set(I, w), () => {
    d.current.delete(I);
  }), []), g = a.map((w) => w.id), N = s ?? lt;
  return /* @__PURE__ */ n(
    it.Provider,
    {
      value: {
        observe: u,
        items: g,
        draggingId: o,
        setDraggingId: l,
        draggingOverId: m,
        setDraggingOverId: f,
        end: b
      },
      children: i.Children.map(r, (w, I) => {
        const C = g[I];
        return /* @__PURE__ */ n(N, { id: C, children: w }, C);
      })
    }
  );
}, An = (...e) => e.filter(Boolean).join(" "), lt = ({ id: e, children: t, className: r }) => {
  const { containerRef: s, listeners: a } = Te(e);
  return /* @__PURE__ */ k("div", { className: An(Me.sortableItem, r), ref: s, children: [
    /* @__PURE__ */ n("div", { className: Me.sortableItemHandle, ...a }),
    /* @__PURE__ */ n("div", { className: Me.sortableItemBody, children: t })
  ] });
};
he.SortableItem = lt;
const it = i.createContext({
  items: [],
  setDraggingId: () => {
  },
  setDraggingOverId: () => {
  },
  end: () => {
  },
  observe: () => () => {
  }
}), Te = (e) => {
  const t = i.useRef(null), r = i.useRef(null), { setDraggingId: s, setDraggingOverId: a, end: c, observe: d } = i.useContext(it);
  return i.useEffect(() => {
    const o = t.current, l = r.current;
    if (!o || !l)
      return;
    const m = d(e, o);
    o.setAttribute("draggable", "true"), o.setAttribute("data-draggable-id", e);
    const f = () => {
      a(e);
    };
    let p;
    const h = (w) => {
      p || (w.stopPropagation(), w.preventDefault(), w.dataTransfer && (w.dataTransfer.effectAllowed = "move"), s(e));
    }, b = (w) => (c(e), !1), u = (w) => (w.preventDefault && w.preventDefault(), w.dataTransfer && (w.dataTransfer.dropEffect = "move"), !1), g = (w) => (w.stopPropagation(), w.preventDefault(), !1), N = (w) => {
      if (w.target === l) {
        p = e;
        return;
      }
      return !1;
    };
    return o.addEventListener("pointerdown", N), o.addEventListener("dragstart", h), o.addEventListener("dragover", u), o.addEventListener("dragend", b), o.addEventListener("dragenter", f), o.addEventListener("drop", g, !1), () => {
      o.removeEventListener("pointerdown", N), o.removeEventListener("dragenter", f), o.removeEventListener("dragover", u), o.removeEventListener("dragstart", h), o.removeEventListener("dragend", b), o.removeEventListener("drop", g), m();
    };
  }, [e]), {
    containerRef: t,
    listeners: {
      ref: r
    }
  };
};
he.useSortable = Te;
const En = ({ itemWrapper: e = fe, value: t, onChange: r, setItems: s, items: a, defaultValue: c }) => {
  const [d, o] = i.useState(t ?? c);
  i.useEffect(() => {
    typeof t == "string" && t !== d && o(t);
  }, [d, t]);
  const l = i.useCallback((f) => {
    s((p) => p.filter(({ key: h }) => h !== f));
  }, []), m = i.useCallback(
    (f) => {
      if (!(f.currentTarget instanceof HTMLDivElement))
        return;
      const p = f.currentTarget.dataset.id;
      p && r(p);
    },
    [r]
  );
  return /* @__PURE__ */ n("nav", { className: ce.tabnav, children: /* @__PURE__ */ n(he, { items: a, onChange: s, controlAs: Tn, children: a.map((f) => /* @__PURE__ */ n(Rn, { item: f, onSelect: m, selected: d, onRequestClose: l, children: /* @__PURE__ */ n(e, { children: f.value }) }, f.key)) }) });
};
En.displayName = "TabNav";
const Tn = ({ children: e, id: t }) => {
  const { containerRef: r, listeners: s } = Te(t), a = i.Children.map(e, (c) => i.isValidElement(c) ? i.cloneElement(c, s) : c);
  return /* @__PURE__ */ n("div", { ref: r, className: ce.sortableItemControl, children: a });
}, Rn = i.forwardRef(({ selected: e, item: t, children: r, onSelect: s, onRequestClose: a, closeMark: c }, d) => {
  const o = i.useCallback(
    (l) => {
      l.preventDefault(), a && a(t.key);
    },
    [a]
  );
  return /* @__PURE__ */ k("div", { className: ce.sortableItem, "data-id": t.key, "aria-selected": e === t.key, onClick: s, children: [
    a ? /* @__PURE__ */ n("button", { type: "button", className: ce.deleteButton, value: `close ${t.value} tab`, onClick: o, children: c ?? "×" }) : /* @__PURE__ */ n("span", {}),
    /* @__PURE__ */ k("div", { className: ce.sortableItemBody, ref: d, children: [
      /* @__PURE__ */ n("div", {}),
      t.icon,
      r
    ] })
  ] });
}), Bn = "brstabbar", On = "brstabitm", Pn = "brstab", Fn = "brstabF_L", Hn = "brstabins", zn = "brstabwrp", qn = "brsdrg", Un = "brsdragOver", le = {
  tabbar: Bn,
  tabitem: On,
  tabitemIcon: Pn,
  tabitemLabel: Fn,
  tabInsertIndicator: Hn,
  tabWrapper: zn,
  dragging: qn,
  dragOver: Un
}, jn = y(({ items: e, onSelect: t, tabIndex: r, defaultSelected: s }) => {
  const [a, c] = X(() => s ?? 0), d = L(
    (o, l) => {
      t(o, l), c(l);
    },
    [t]
  );
  return /* @__PURE__ */ n("nav", { className: le.tabbar, tabIndex: r, children: /* @__PURE__ */ n("ul", { className: le.tabs, children: e.map((o, l) => /* @__PURE__ */ n(Vn, { item: o, tabIndex: l, onSelect: d, selected: l === a }, l)) }) });
});
jn.displayName = "TabBar";
const Vn = y(({ tabIndex: e, item: t, onSelect: r, selected: s }) => {
  const a = L(
    (c) => {
      c.preventDefault(), r(t, e);
    },
    [r, t, e]
  );
  return /* @__PURE__ */ n("li", { className: le.tabitem, "data-selected": s, children: /* @__PURE__ */ k("a", { tabIndex: e, onClick: a, children: [
    /* @__PURE__ */ n("div", { className: le.tabitemIcon, children: t.icon }),
    /* @__PURE__ */ n("span", { className: le.tabitemLabel, children: t.value })
  ] }) });
}), Wn = "blcmark", Xn = {
  mark: Wn
}, _ = ({ direction: e, size: t }) => {
  const r = i.useMemo(() => {
    const s = "1em";
    return {
      width: t ?? s,
      height: t ?? s
    };
  }, [t]);
  return /* @__PURE__ */ n("i", { className: Xn.mark, "data-direction": e ?? "down", role: "decoration", style: r, children: /* @__PURE__ */ n(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: /* @__PURE__ */ n("polyline", { points: "6 9 12 15 18 9" })
    }
  ) });
};
_.displayName = "ChevronMark";
const Zn = "brsinp", Gn = "brsbtn", _n = "brspuldowmar", Qn = "brslbl", Kn = "brspullDown", Yn = "brstitle", Jn = "brsbody", er = "brschild", tr = "brssep", nr = "brswithico", rr = "brsico", sr = "brstbr", ar = "brssegcon", or = "brssegment", H = {
  input: Zn,
  button: Gn,
  pullDownMark: _n,
  label: Qn,
  pullDown: Kn,
  title: Yn,
  body: Jn,
  child: er,
  separator: tr,
  withIcon: nr,
  icon: rr,
  toolbar: sr,
  segmentControl: ar,
  segment: or
}, Re = ({ size: e, className: t }) => /* @__PURE__ */ n(
  "svg",
  {
    className: t,
    stroke: "currentColor",
    fill: "currentColor",
    strokeWidth: "0",
    width: e,
    height: e,
    viewBox: "0 0 512 512",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ n("path", { d: "M456.69 421.39 362.6 327.3a173.81 173.81 0 0 0 34.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 0 0 327.3 362.6l94.09 94.09a25 25 0 0 0 35.3-35.3zM97.92 222.72a124.8 124.8 0 1 1 124.8 124.8 124.95 124.95 0 0 1-124.8-124.8z" })
  }
);
Re.displayName = "SearchIcon";
const Be = i.forwardRef(({ children: e, variant: t, ...r }, s) => {
  const a = r.as ?? "button";
  return /* @__PURE__ */ k(a, { className: H.button, "data-variant": t, ...r, ref: s, children: [
    e,
    t === "combobox" && /* @__PURE__ */ n("i", { className: H.pullDownMark, role: "none", children: /* @__PURE__ */ n(_, {}) })
  ] });
});
Be.displayName = "PushButton";
const pe = i.forwardRef(
  ({ variant: e, ...t }, r) => /* @__PURE__ */ k("div", { className: H.button, "data-variant": e, children: [
    /* @__PURE__ */ n("select", { ...t, ref: r, children: t.children }),
    /* @__PURE__ */ n("div", { role: "none", className: H.pullDownMark, children: /* @__PURE__ */ n(_, {}) })
  ] })
);
pe.displayName = "PullDown";
const Oe = (e) => /* @__PURE__ */ n(pe, { ...e, variant: "popup" });
Oe.displayName = "PopUpButton";
const Pe = (e) => /* @__PURE__ */ n(pe, { ...e, variant: ["combobox", e.variant].join(" ") });
Pe.displayName = "ComboBox";
const Ie = i.memo(
  i.forwardRef(({ children: e, variant: t, ...r }, s) => /* @__PURE__ */ n("input", { className: H.input, type: r.type ?? "text", ...r, ref: s, "data-vatiant": t, children: e }))
);
Ie.displayName = "InputField";
const Fe = (e) => /* @__PURE__ */ k("div", { className: H.withIcon, children: [
  /* @__PURE__ */ n("i", { className: H.icon, children: /* @__PURE__ */ n(Re, { size: 17 }) }),
  /* @__PURE__ */ n(Ie, { ...e, type: "search", placeholder: e.placeholder ?? "Search..." })
] });
Fe.displayName = "SearchField";
const He = i.memo(({ title: e, subTitle: t, children: r }) => /* @__PURE__ */ k("div", { className: H.title, children: [
  r,
  e && /* @__PURE__ */ n("strong", { children: e }),
  t && /* @__PURE__ */ n("small", { children: t })
] }));
He.displayName = "Title";
const ze = i.forwardRef(
  ({ children: e, ...t }, r) => /* @__PURE__ */ n("div", { className: H.body, ...t, ref: r, children: i.Children.map(e, (s, a) => /* @__PURE__ */ n("div", { className: H.child, children: s }, a)) })
);
ze.displayName = "Body";
const dt = i.memo(() => /* @__PURE__ */ n("hr", { className: H.separator, role: "separator" })), Ce = i.memo(({ onClick: e, index: t, isActive: r, children: s }) => {
  const a = i.useCallback(() => {
    e(t);
  }, [t, e]);
  return /* @__PURE__ */ n("div", { className: H.segment, "data-is-active": r, onClick: a, children: s });
});
Ce.displayName = "Segment";
const qe = i.memo(
  ({
    items: e,
    defaultSelected: t = 0,
    onSelect: r,
    children: s
  }) => {
    const [a, c] = i.useState(t), d = De(a);
    i.useEffect(() => {
      typeof d > "u" || !r || d === a || r(a);
    }, [a]);
    const o = i.useMemo(() => s ? i.Children.toArray(s) : e ?? [], [s, e]);
    return /* @__PURE__ */ n("div", { className: H.segmentControl, children: o.map((l, m) => /* @__PURE__ */ n(Ce, { index: m, onClick: c, isActive: a === m, children: l }, m)) });
  }
);
qe.displayName = "SegmentedControl";
const Ue = () => /* @__PURE__ */ n("div", {});
Ue.displayName = "Spacer";
const R = ({
  children: e,
  style: t
}) => /* @__PURE__ */ n("div", { className: H.toolbar, role: "toolbar", style: t, children: e });
R.displayName = "Toolbar";
const Ac = {
  SegmentedControl: qe,
  Toolbar: R,
  SearchField: Fe,
  InputField: Ie,
  Separator: dt,
  PushButton: Be,
  PullDown: pe,
  Title: He,
  Body: ze,
  Segment: Ce,
  ComboBox: Pe,
  PopUpButton: Oe,
  Spacer: Ue
};
R.SegmentedControl = qe;
R.Toolbar = R;
R.SearchField = Fe;
R.InputField = Ie;
R.Separator = dt;
R.PushButton = Be;
R.PullDown = pe;
R.Title = He;
R.Body = ze;
R.Segment = Ce;
R.ComboBox = Pe;
R.PopUpButton = Oe;
R.Spacer = Ue;
const cr = "blcico", lr = {
  icon: cr
}, ir = y(({ src: e, width: t, height: r, size: s }) => {
  const a = J(() => {
    const c = e.match(/-([a-zA-Z]+)$/);
    return c ? c[1] : null;
  }, [e]);
  return /* @__PURE__ */ n(
    "i",
    {
      "data-fa": !0,
      className: lr.icon,
      "data-icon": e,
      "data-postfix": a,
      style: {
        width: t,
        height: r,
        fontSize: s ?? t
      }
    }
  );
});
ir.displayName = "Icon";
const je = y(({ children: e, size: t }) => /* @__PURE__ */ n(
  "svg",
  {
    stroke: "currentColor",
    fill: "currentColor",
    strokeWidth: "0",
    width: t,
    height: t,
    viewBox: "0 0 256 256",
    xmlns: "http://www.w3.org/2000/svg",
    children: e
  }
)), dr = y(({ size: e }) => /* @__PURE__ */ n(je, { size: e, children: /* @__PURE__ */ n("path", { d: "M203.6,73.72c5.84-5.88,5.84-15.42,0-21.31-5.84-5.88-15.3-5.88-21.14,0l-54.47,53.65-54.47-53.05c-5.84-5.88-15.3-5.88-21.14,0-5.84,5.88-5.84,15.42,0,21.31l54.49,53.03-54.49,54.93c-5.84,5.88-5.84,15.42,0,21.31,5.84,5.88,15.3,5.88,21.14,0l54.47-54.95,54.49,54.93c5.84,5.88,15.3,5.88,21.14,0,5.84-5.88,5.84-15.42,0-21.31l-54.51-54.91,54.49-53.63Z" }) })), ur = y(({ size: e }) => /* @__PURE__ */ n(je, { size: e, children: /* @__PURE__ */ n("rect", { x: "29.34", y: "113.16", width: "198.32", height: "30.68", rx: "15.34", ry: "15.34" }) })), ut = ({ size: e }) => /* @__PURE__ */ n(je, { size: e, children: /* @__PURE__ */ n("path", { d: "M231.6,56.14c6,6,6,15.75,0,21.76l-122.96,122.96c-6,6-15.75,6-21.76,0l-61.48-61.48c-6-6-6-15.75,0-21.76,6-6,15.75-6,21.76,0l50.62,50.57,112.1-112.05c6-6,15.75-6,21.76,0h-.05Z" }) });
ut.displayName = "Checkmark";
const mr = "cntrsz", fr = {
  resizer: mr
}, hr = ({ autoplace: e = !0, onResize: t, originX: r, originY: s, max: a, min: c, step: d }) => {
  const o = i.useRef(null), l = i.useMemo(() => ({ x: r ?? 0.5, y: s ?? 0.5 }), [r, s]), m = i.useCallback(
    (p) => {
      p.type !== "pointerdown" && t(pr(p.deltaX, p.deltaY, l.x, l.y), p.isFinal);
    },
    [a, c, d, l]
  );
  nt(o, m);
  const f = i.useMemo(() => {
    if (e) {
      const p = Math.atan2(l.y, l.x), h = ["ew", "nwse", "ns", "nesw", "ew", "nwse", "ns", "nesw"], b = Math.round(p / (Math.PI / 4)), u = `${h.at(b)}-resize`, g = (l.x + 1) / 2, N = (l.y + 1) / 2;
      return {
        top: `${g * 100}%`,
        left: `${N * 100}%`,
        cursor: u,
        content: `${p}`
      };
    }
    return {};
  }, [e, l]);
  return /* @__PURE__ */ n("div", { className: fr.resizer, ref: o, style: f });
};
hr.displayName = "Resizer";
const pr = (e, t, r, s) => ({ x: r, y: s, width: e, height: t }), gr = "cntsegcon", br = "cntseg", yr = "cntind", oe = {
  segmentControl: gr,
  segmentButton: br,
  indicator: yr
}, vr = "cntsegment", Nr = {
  segment: vr
}, wr = y(({ children: e }) => /* @__PURE__ */ n("div", { className: Nr.segment, children: e })), kr = (e = !1) => {
  const [t, r] = X(e), s = L(() => {
    r((a) => !a);
  }, []);
  return [t, s, r];
}, xr = y(
  ({
    items: e,
    selectedIndex: t,
    defaultSelected: r = 0,
    onSelect: s,
    element: a = wr,
    controlled: c = !1,
    onPositionChange: d,
    onDragStart: o,
    onDragEnd: l,
    onDragPreview: m
  }) => {
    const [f, p] = X(r), [h, b] = X({}), u = te(null), [g, N] = X(!1), [w, I] = X(null), [C, A] = X(null), D = c ? t ?? r : f, M = g && C !== null ? C : D, T = L(
      ($) => {
        c || p($), s == null || s($);
      },
      [c, s]
    ), O = L(
      ($) => {
        if (!($.target instanceof HTMLButtonElement))
          return;
        const E = parseInt($.target.dataset.index ?? "0");
        T(E);
      },
      [T]
    ), W = L(
      ($) => {
        if (!($.target instanceof HTMLButtonElement)) return;
        const E = parseInt($.target.dataset.index ?? "0");
        E === D && (N(!0), I(E), A(E), o == null || o(E), $.currentTarget.setPointerCapture($.pointerId));
      },
      [D, o]
    ), Z = L(
      ($) => {
        if (!g || !u.current) return;
        const E = u.current.getBoundingClientRect(), $e = $.clientX - E.left, V = Array.from(u.current.children).filter(
          (G) => G.classList.contains(oe.segmentButton)
        );
        let Y = w;
        for (let G = 0; G < V.length; G++) {
          const Ze = V[G].getBoundingClientRect(), At = Ze.left - E.left, Et = Ze.right - E.left;
          if ($e >= At && $e <= Et) {
            Y = G;
            break;
          }
        }
        Y !== null && Y !== C && (A(Y), m == null || m(Y));
      },
      [g, w, C, m]
    ), ne = L(
      ($) => {
        if (!g) return;
        $.currentTarget.releasePointerCapture($.pointerId);
        const E = C !== null ? C : D;
        C !== null && C !== D && T(C), l == null || l(E), N(!1), I(null), A(null);
      },
      [g, C, D, T, l]
    ), P = L(
      ($) => {
        if (!u.current)
          return;
        const E = Array.from(u.current.children).filter((Xe) => Xe.classList.contains(oe.segmentButton));
        if (E.length === 0 || $ >= E.length)
          return;
        const V = E[$].getBoundingClientRect(), Y = u.current.getBoundingClientRect(), G = {
          top: V.top - Y.top,
          left: V.left - Y.left,
          width: V.width,
          height: V.height
        };
        b(G), d && d({
          ...G,
          // Also provide absolute position for advanced use cases
          x: V.x,
          y: V.y,
          right: V.right,
          bottom: V.bottom
        });
      },
      [d]
    );
    ue(() => {
      P(M);
    }, [M, P]), ue(() => {
      if (!u.current) return;
      const $ = new ResizeObserver(() => {
        P(M);
      });
      return $.observe(u.current), () => {
        $.disconnect();
      };
    }, [M, P]);
    const K = L(
      ($) => {
        if ($.target instanceof HTMLButtonElement) {
          if (!($.target.dataset.index === M.toString()))
            return;
          be(!0);
        }
      },
      [M]
    ), ge = L(
      ($) => {
        if ($.target instanceof HTMLButtonElement) {
          if (!($.target.dataset.index === M.toString()))
            return;
          be(!1);
        }
      },
      [M]
    ), [S, B, be] = kr(!1);
    return /* @__PURE__ */ k("div", { className: oe.segmentControl, ref: u, children: [
      e.map(($, E) => /* @__PURE__ */ n(
        Ir,
        {
          index: E,
          active: E === M,
          onClick: O,
          focus: K,
          blur: ge,
          onPointerDown: W,
          onPointerMove: Z,
          onPointerUp: ne,
          onPointerCancel: ne,
          children: /* @__PURE__ */ n(a, { children: $ })
        },
        E
      )),
      h && h.left !== void 0 && /* @__PURE__ */ n(
        "div",
        {
          className: oe.indicator,
          role: "presentation",
          "data-focus": S,
          style: {
            transform: `translate(${h.left}px, ${h.top}px) scale(${S ? 0.97 : 1})`,
            width: h.width,
            height: h.height
          },
          children: e.at(M)
        }
      )
    ] });
  }
);
xr.displayName = "SegmentedControl";
const Ir = ({ children: e, index: t, active: r, onClick: s, focus: a, blur: c, onPointerDown: d, onPointerMove: o, onPointerUp: l, onPointerCancel: m }) => {
  const f = L(
    (u) => {
      a(u), d == null || d(u);
    },
    [a, d]
  ), p = L(
    (u) => {
      c(u), l == null || l(u);
    },
    [c, l]
  ), h = L(
    (u) => {
      c(u), m == null || m(u);
    },
    [c, m]
  ), b = L(
    (u) => {
      u.currentTarget.hasPointerCapture(u.pointerId) || c(u);
    },
    [c]
  );
  return /* @__PURE__ */ n(
    "button",
    {
      onClick: s,
      type: "button",
      "data-index": t,
      "data-active": r,
      className: oe.segmentButton,
      onPointerDown: f,
      onPointerMove: o,
      onPointerUp: p,
      onPointerCancel: h,
      onPointerLeave: b,
      style: {
        touchAction: "none"
        // Prevent scrolling during drag
      },
      children: e
    }
  );
}, Cr = "lmnheading", Sr = "lmndetails", $r = "lmnsummary", Mr = "lmnarticle", Lr = "lmnsection", Dr = "lmnnav", Ar = "lmnmain", Er = "lmnhdr", Tr = "lmnftr", Rr = "lmnaside", Br = "lmnaddress", Or = "lmnblo", Pr = "lmnfigure", Fr = "lmnfig", Hr = "lmnpre", zr = "lmndiv", qr = "lmnlbl", Ur = "lmnmarker", jr = "lmndes", Vr = "lmncard", Wr = "lmnhzrule", Xr = "lmnimg", Zr = "lmna", Gr = "lmnstrong", _r = "lmnem", Qr = "lmnsmall", Kr = "lmnmark", Yr = "lmndel", Jr = "lmnins", es = "lmnsub", ts = "lmnsup", ns = "lmncode", rs = "lmnkbd", ss = "lmnsamp", as = "lmnabbr", os = "lmncite", cs = "lmndfn", ls = "lmnq", is = "lmnruby", ds = "lmnrt", us = "lmnol", ms = "lmndd", fs = "lmndt", hs = "lmnth", ps = "lmntd", gs = "lmncaption", x = {
  heading: Cr,
  details: Sr,
  summary: $r,
  article: Mr,
  section: Lr,
  nav: Dr,
  main: Ar,
  header: Er,
  footer: Tr,
  aside: Rr,
  address: Br,
  blockquote: Or,
  figure: Pr,
  figcaption: Fr,
  pre: Hr,
  div: zr,
  label: qr,
  marker: Ur,
  descriptions: jr,
  card: Vr,
  horizontalrule: Wr,
  image: Xr,
  a: Zr,
  strong: Gr,
  em: _r,
  small: Qr,
  mark: Kr,
  del: Yr,
  ins: Jr,
  sub: es,
  sup: ts,
  code: ns,
  kbd: rs,
  samp: ss,
  var: "lmnvar",
  abbr: as,
  cite: os,
  dfn: cs,
  q: ls,
  ruby: is,
  rt: ds,
  ol: us,
  dd: ms,
  dt: fs,
  th: hs,
  td: ps,
  caption: gs
}, bs = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6"
}, ee = y(
  v(
    ({ level: e, children: t, ...r }, s) => {
      const a = bs[e] ?? "h3";
      return Rt(
        a,
        {
          ...r,
          ref: s,
          className: x.heading
        },
        t
      );
    }
  )
);
ee.displayName = "Heading";
const Ec = v((e, t) => /* @__PURE__ */ n(ee, { level: 1, ...e, ref: t })), Tc = v((e, t) => /* @__PURE__ */ n(ee, { level: 2, ...e, ref: t })), Rc = v((e, t) => /* @__PURE__ */ n(ee, { level: 3, ...e, ref: t })), Bc = v((e, t) => /* @__PURE__ */ n(ee, { level: 4, ...e, ref: t })), Oc = v((e, t) => /* @__PURE__ */ n(ee, { level: 5, ...e, ref: t })), Pc = v((e, t) => /* @__PURE__ */ n(ee, { level: 6, ...e, ref: t })), ys = "frmbtndwp", vs = {
  button: ys
}, mt = (...e) => e.filter(Boolean).join(" "), xe = y(
  v(({ children: e, color: t, quiet: r, size: s, variant: a, rounded: c, ...d }, o) => {
    const l = J(() => [a, s, c ? "rounded" : "", t, d["data-variant"]].filter(Boolean).join(" ").trim(), [a, s, c, t]), m = mt(vs.button, d.className);
    return /* @__PURE__ */ n("button", { ...d, ref: o, className: m, "data-variant": l, children: e });
  })
);
xe.displayName = "Button";
const Ns = "dlgctnX-K", ws = "dlgdes", ks = "dlgtitle", xs = "dlgbtngrp", ie = {
  content: Ns,
  description: ws,
  title: ks,
  buttonGroup: xs
}, Ae = ({
  actions: e,
  onSelect: t,
  isLoading: r,
  children: s,
  title: a,
  error: c,
  description: d,
  direction: o,
  ...l
}) => {
  const m = L((f) => {
    f.stopPropagation(), f.preventDefault();
    const p = f.currentTarget.getAttribute("data-action");
    !p || !t || t(p);
  }, []);
  return /* @__PURE__ */ n(me, { ...l, variant: "alert", children: /* @__PURE__ */ k("div", { className: ie.content, "data-is-loading": r, children: [
    a && /* @__PURE__ */ n(ee, { level: 3, children: a }),
    d && /* @__PURE__ */ n("p", { className: ie.description, children: d }),
    c && /* @__PURE__ */ k("p", { children: [
      /* @__PURE__ */ n("strong", { children: c.name }),
      c.message,
      Is(c) && /* @__PURE__ */ k(j, { children: [
        "Caused by: ",
        c.cause.message
      ] })
    ] }),
    s,
    /* @__PURE__ */ n("div", { className: ie.buttonGroup, "data-direction": o, children: e == null ? void 0 : e.map((f, p) => /* @__PURE__ */ n(
      xe,
      {
        onClick: m,
        "data-action": f.key,
        type: "button",
        disabled: r,
        variant: `alert ${f.variant ?? ""}`.trim(),
        children: f.value
      },
      p
    )) })
  ] }) });
};
Ae.displayName = "Alert";
const Is = (e) => e instanceof Error ? e.hasOwnProperty("cause") : !1, Cs = "dlgbase", Ss = "dlgcnt", $s = "dlgdec", Ms = "dlgbody", Ls = "dlgctnvg-", Ds = "dlgblowout", As = "dlgfitbox", re = {
  base: Cs,
  container: Ss,
  decoration: $s,
  body: Ms,
  content: Ls,
  blowout: Ds,
  fitbox: As
}, Es = (e, t, r, s, a, c = 0) => (e += c / 2, t += c / 2, r -= c, s -= c, [
  `M ${e + a} ${t}`,
  `H ${e + r - a}`,
  `Q ${e + r} ${t} ${e + r} ${t + a}`,
  `V ${t + s - a}`,
  `Q ${e + r} ${t + s} ${e + r - a} ${t + s}`,
  `H ${e + a}`,
  `Q ${e} ${t + s} ${e} ${t + s - a}`,
  `V ${t + a}`,
  `Q ${e} ${t} ${e + a} ${t}`,
  "Z"
].join(" ").replace(/\s+/g, " ").replace(/\n/g, "")), Ts = ({
  x: e,
  y: t,
  width: r,
  height: s,
  lookAtX: a,
  lookAtY: c,
  rx: d = 10,
  shadowMargin: o = 40,
  chevronSize: l = 16
}) => {
  const m = r / 2, f = s / 2, p = e + m, h = t + f, b = Math.atan2(c - h, a - p);
  let u = Math.min(Math.max(a - p, -m), m), g = Math.min(Math.max(c - h, -f), f);
  const N = d * 2;
  ((A, D) => {
    const M = Math.abs(A) - m, T = Math.abs(D) - f;
    return M * M + T * T < N * N;
  })(u, g) && (Math.floor(4 * (b % (Math.PI * 2) / (Math.PI * 2))) % 2 === 0 ? (u = Math.min(Math.max(u, -m), m), g = Math.min(Math.max(g, -f + N), f - N)) : (u = Math.min(Math.max(u, -m + N), m - N), g = Math.min(Math.max(g, -f), f)));
  const I = {
    x: Math.min(Math.max(u, -m), m) + r / 2 - l / 2,
    y: Math.min(Math.max(g, -f), f) + s / 2 - l / 2
  }, C = (() => {
    const A = I.y < 0, D = I.x < 0, M = I.x > r - l;
    return I.y > s - l ? 0 : A ? 2 : D ? 3 : M ? 1 : 0;
  })();
  return {
    arrowSnapPoint: I,
    angle: C
  };
}, Rs = ({ width: e, height: t, x: r, y: s, lookAtX: a, lookAtY: c, rx: d = 10, shadowMargin: o = 40, chevronSize: l = 16 }) => {
  const m = [r, s, e, t, a, c, d, o, l], f = i.useMemo(() => {
    const { arrowSnapPoint: h, angle: b } = Ts({
      x: r,
      y: s,
      width: e,
      height: t,
      lookAtX: a,
      lookAtY: c,
      rx: d,
      shadowMargin: o,
      chevronSize: l
    });
    return /* @__PURE__ */ n(j, { children: /* @__PURE__ */ n("g", { transform: `translate(${h.x}, ${h.y})`, children: /* @__PURE__ */ k("g", { transform: `translate(8, 8) rotate(${b * 90}) translate(-8, -8)`, children: [
      /* @__PURE__ */ n("rect", { x: "0", y: "0", width: "16", height: "16", fill: "transparent" }),
      /* @__PURE__ */ n("g", { transform: "translate(-15, 16)", children: /* @__PURE__ */ n("path", { d: "M7,-8.105 L10.3641716,-8.105 C12.6069526,-8.105 14.569386,-7.41371956 16.2514718,-6.03115868 C18.7746005,-3.95731736 19.6156434,-2.9203967 21.2977292,-1.1921956 C22.979815,0.536005499 23.8208579,0.536005499 25.5029437,-1.1921956 C27.1850294,-2.9203967 28.8671152,-4.6485978 30.549201,-6.03115868 C32.2312868,-7.41371956 33.0723297,-8.105 37.2775442,-8.105 C40.0810205,-8.105 41.4827586,-8.105 41.4827586,-8.105 L7,-8.105 Z" }) })
    ] }) }) });
  }, m), p = i.useId();
  return /* @__PURE__ */ k(
    "svg",
    {
      style: {
        position: "absolute",
        left: -o,
        top: -o,
        width: e + o * 2,
        height: t + o * 2
      },
      viewBox: `${-o} ${-o} ${e + o * 2} ${t + o * 2}`,
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      children: [
        /* @__PURE__ */ n("defs", { children: /* @__PURE__ */ k("filter", { x: "-26.9%", y: "-32.0%", width: "161.5%", height: "164.0%", filterUnits: "objectBoundingBox", id: p, children: [
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
          /* @__PURE__ */ k("feMerge", { children: [
            /* @__PURE__ */ n("feMergeNode", { in: "shadowMatrixOuter1" }),
            /* @__PURE__ */ n("feMergeNode", { in: "shadowMatrixOuter2" })
          ] })
        ] }) }),
        /* @__PURE__ */ n("g", { fillRule: "evenodd", stroke: "none", strokeWidth: "1", children: /* @__PURE__ */ k("g", { style: { mixBlendMode: "multiply" }, children: [
          /* @__PURE__ */ k("g", { fill: "var(--textColor)", fillOpacity: "1", filter: `url(#${p})`, children: [
            /* @__PURE__ */ n(_e, { x: 0, y: 0, rx: d, width: e, height: t }),
            f
          ] }),
          /* @__PURE__ */ k("g", { fill: "var(--windowBackgroundColor)", filter: "var(--dialogBackgroundFilter)", children: [
            /* @__PURE__ */ n(_e, { x: 0, y: 0, rx: d, width: e, height: t }),
            f
          ] })
        ] }) })
      ]
    }
  );
}, _e = ({ x: e, y: t, width: r, height: s, rx: a }) => {
  const c = Es(e, t, r, s, a ?? 0);
  return /* @__PURE__ */ n("path", { d: c });
}, Bs = ({ open: e = !0, onClose: t, children: r, measure: s, render: a }) => {
  const c = i.useRef(null), [d] = Ee(c), o = i.useMemo(() => {
    if (typeof window > "u")
      return { x: 0, y: 0, overflowX: 0, overflowY: 0, width: 0, height: 0 };
    const h = {
      x: window.scrollX,
      y: window.scrollY,
      width: window.innerWidth,
      height: window.innerHeight
    }, b = {
      width: Math.min(h.width, 320),
      height: Math.min(h.height, 240)
    }, u = {
      x: (s.x < (h.width + h.x) / 2, s.x),
      y: s.y < (h.height + h.y) / 2 ? s.y : s.y - b.height - s.height,
      width: b.width,
      height: b.height
    }, g = u.x + u.width, N = u.x, w = Math.max(g - h.width, 0), I = Math.min(N, 0);
    u.x += -w + I;
    const C = u.y, A = u.y + u.height, D = Math.max(A - h.height, 0), M = Math.min(C, 0);
    return u.y += -D + M, u.y < (h.y + h.height) / 2 && (u.y += s.height), u;
  }, [s, d]), [l, m] = rt({
    onClose: t
  }), f = i.useRef(null), p = {
    x: s.x + s.width / 2,
    y: s.y + s.height / 2
  };
  return /* @__PURE__ */ k(j, { children: [
    /* @__PURE__ */ n("i", { ref: f }),
    /* @__PURE__ */ n(st, { parentNode: f.current, children: /* @__PURE__ */ n(
      "div",
      {
        className: re.base,
        "data-open": e,
        style: {
          pointerEvents: e ? "auto" : "none"
        },
        children: /* @__PURE__ */ n("div", { className: re.container, ref: l, children: /* @__PURE__ */ k(
          "div",
          {
            className: re.body,
            style: {
              width: o.width,
              height: o.height,
              transform: `translate(${o.x}px, ${o.y}px)`
            },
            children: [
              /* @__PURE__ */ n("div", { className: re.decoration, children: /* @__PURE__ */ n(
                Rs,
                {
                  width: o.width,
                  height: o.height,
                  x: o.x,
                  y: o.y,
                  lookAtX: p.x,
                  lookAtY: p.y
                }
              ) }),
              /* @__PURE__ */ n("div", { className: re.content, ref: m, children: /* @__PURE__ */ k("div", { ref: c, className: re.fitbox, children: [
                r,
                a && a(o)
              ] }) })
            ]
          }
        ) })
      }
    ) })
  ] });
};
Bs.displayName = "ContextualMenu";
const Fc = (e) => {
  const [t, r] = Cn(e ?? !1), s = i.useRef(null), [a, c] = Ee(s);
  return i.useEffect(() => {
    c();
  }, [t]), [s, t, r, a];
}, Os = ({ open: e = !0, onClose: t, children: r, potal: s = !0 }) => /* @__PURE__ */ n(me, { open: e, onClose: t, potal: s, children: /* @__PURE__ */ n("section", { className: ct.content, children: r }) });
Os.displayName = "Modal";
const Ps = "frmradio", Fs = {
  radio: Ps
}, Hs = "frmchk", zs = "frmbase", qs = "frmmark", we = {
  checkbox: Hs,
  base: zs,
  mark: qs
};
function Us(e) {
  if (!e || typeof e != "string")
    return !1;
  const t = e.replace(/^data:[^;]*;base64,/, "");
  if (t.length === 0 || !/^[A-Za-z0-9+/]*={0,2}$/.test(t) || t.length % 4 !== 0)
    return !1;
  try {
    return atob(t), !0;
  } catch {
    return !1;
  }
}
function js(e, t) {
  if (!e || typeof e != "string")
    return !1;
  const r = e.trim();
  if (r.length === 0)
    return !1;
  try {
    const s = new URL(r);
    return ["http:", "https:", "ftp:", "ftps:"].includes(s.protocol) ? !0 : (t == null || t.requireProtocol, !1);
  } catch {
    return !1;
  }
}
const Vs = () => {
  const e = te(/* @__PURE__ */ new Set()), t = L((a) => {
    const c = URL.createObjectURL(a);
    return e.current.add(c), c;
  }, []), r = L((a) => {
    e.current.has(a) && (URL.revokeObjectURL(a), e.current.delete(a));
  }, []), s = L(() => {
    e.current.forEach((a) => URL.revokeObjectURL(a)), e.current.clear();
  }, []);
  return ue(() => () => {
    e.current.forEach((a) => URL.revokeObjectURL(a)), e.current.clear();
  }, []), {
    createObjectURL: t,
    revokeObjectURL: r,
    revokeAllObjectURLs: s,
    get activeURLCount() {
      return e.current.size;
    }
  };
}, ye = {
  en: {
    clickToSelect: "Click to select files",
    orDragAndDrop: "or drag and drop",
    dropFilesHere: "Drop files here"
  },
  ja: {
    clickToSelect: "ファイルを選択",
    orDragAndDrop: "またはドラッグ&ドロップ",
    dropFilesHere: "ファイルをここにドロップ"
  },
  es: {
    clickToSelect: "Haz clic para seleccionar archivos",
    orDragAndDrop: "o arrastra y suelta",
    dropFilesHere: "Suelta los archivos aquí"
  },
  fr: {
    clickToSelect: "Cliquez pour sélectionner des fichiers",
    orDragAndDrop: "ou glissez-déposez",
    dropFilesHere: "Déposez les fichiers ici"
  },
  de: {
    clickToSelect: "Klicken Sie, um Dateien auszuwählen",
    orDragAndDrop: "oder ziehen und ablegen",
    dropFilesHere: "Dateien hier ablegen"
  },
  ko: {
    clickToSelect: "파일 선택하기",
    orDragAndDrop: "또는 드래그 앤 드롭",
    dropFilesHere: "파일을 여기에 드롭하세요"
  },
  "zh-CN": {
    clickToSelect: "点击选择文件",
    orDragAndDrop: "或拖拽上传",
    dropFilesHere: "将文件拖拽到这里"
  },
  "zh-TW": {
    clickToSelect: "點擊選擇檔案",
    orDragAndDrop: "或拖曳上傳",
    dropFilesHere: "將檔案拖曳到這裡"
  }
}, Ws = (e) => {
  const t = J(() => {
    if (e) return e;
    if (typeof window > "u") return "en";
    const s = navigator.language;
    if (ye[s])
      return s;
    const a = s.split("-")[0];
    return ye[a] ? a : "en";
  }, [e]), r = ye[t] || ye.en;
  return {
    locale: t,
    messages: r,
    getSelectText: (s) => s ? r.dropFilesHere : `${r.clickToSelect} ${r.orDragAndDrop}`
  };
}, Xs = "cstnptmed", Zs = "cstnptmediaprv", Gs = "cstnptspin", Qe = {
  mediaPreviewContainer: Xs,
  mediaPreview: Zs,
  spin: Gs
}, Ke = y(({
  src: e,
  alt: t = "Media preview",
  maxWidth: r = 256,
  maxHeight: s = 256,
  minWidth: a = 64,
  minHeight: c = 64,
  aspectRatioRange: d = { min: 0.25, max: 4 },
  // 1:4 to 4:1 ratio
  onLoad: o,
  onError: l,
  className: m
}) => {
  const f = L((h) => {
    const b = h.currentTarget, { naturalWidth: u, naturalHeight: g } = b;
    if (u === 0 || g === 0) {
      l == null || l();
      return;
    }
    o == null || o();
  }, [o, l]), p = J(() => ({
    "--max-width": `${r}px`,
    "--max-height": `${s}px`,
    "--min-width": `${a}px`,
    "--min-height": `${c}px`,
    "--aspect-ratio-min": d.min.toString(),
    "--aspect-ratio-max": d.max.toString()
  }), [r, s, a, c, d]);
  return /* @__PURE__ */ n(
    "div",
    {
      className: `${Qe.mediaPreviewContainer} ${m || ""}`,
      style: p,
      children: /* @__PURE__ */ n(
        "img",
        {
          src: e,
          alt: t,
          className: Qe.mediaPreview,
          onLoad: f,
          onError: l,
          loading: "lazy"
        }
      )
    }
  );
}), _s = (e) => e.startsWith("/") || e.startsWith("."), Qs = y(
  v(({
    defaultValue: e,
    value: t,
    variant: r = "preview",
    maxPreviewWidth: s = 96,
    maxPreviewHeight: a = 96,
    minPreviewWidth: c = 48,
    minPreviewHeight: d = 48,
    aspectRatioRange: o = { min: 0.25, max: 4 },
    locale: l,
    ...m
  }, f) => {
    const [p, h] = X(!1), [b, u] = X([]), [g, N] = X(!1), { createObjectURL: w, revokeAllObjectURLs: I } = Vs(), { getSelectText: C } = Ws(l), A = J(() => {
      var S;
      return (S = m.accept) == null ? void 0 : S.split(",").some((B) => B.trim().startsWith("image"));
    }, [m.accept]), D = J(() => {
      if (typeof e == "string" && (_s(e) || js(e) || Us(e)))
        return e;
    }, [e]), M = J(() => b.map(w), [b, w]), T = L((S) => {
      if (!S || S.length === 0)
        return u([]), h(!1), I(), [];
      const B = Array.from(S);
      return I(), u(B), h(!0), B;
    }, [I]), O = L(
      (S) => {
        var B;
        S.target instanceof HTMLInputElement && (T(S.target.files), (B = m.onChange) == null || B.call(m, S));
      },
      [m.onChange, T]
    ), W = L((S) => {
      S.preventDefault(), S.stopPropagation(), N(!0);
    }, []), Z = L((S) => {
      S.preventDefault(), S.stopPropagation(), S.currentTarget.contains(S.relatedTarget) || N(!1);
    }, []), ne = L((S) => {
      S.preventDefault(), S.stopPropagation();
    }, []), P = L((S) => {
      S.preventDefault(), S.stopPropagation(), N(!1);
      const B = S.dataTransfer.files;
      if (T(B), m.onChange) {
        const be = {
          target: { files: B },
          currentTarget: { files: B }
        };
        m.onChange(be);
      }
    }, [T, m.onChange]), K = b.length > 0 || !p && D;
    return r === "preview" ? /* @__PURE__ */ k(
      "div",
      {
        className: `${q.mediaInput} ${g ? q.mediaInputDragActive : ""} ${K ? q.mediaInputHasFiles : ""}`,
        "data-variant": "preview",
        onDragEnter: W,
        onDragLeave: Z,
        onDragOver: ne,
        onDrop: P,
        children: [
          /* @__PURE__ */ k("div", { className: q.mediaInputPreview, children: [
            A && M.map((S, B) => /* @__PURE__ */ n(
              Ke,
              {
                src: S,
                alt: `Selected file ${B + 1}`,
                maxWidth: s,
                maxHeight: a,
                minWidth: c,
                minHeight: d,
                aspectRatioRange: o
              },
              `selected-${B}`
            )),
            !p && D && A && /* @__PURE__ */ n(
              Ke,
              {
                src: D,
                alt: "Current file",
                maxWidth: s,
                maxHeight: a,
                minWidth: c,
                minHeight: d,
                aspectRatioRange: o
              }
            ),
            !K && /* @__PURE__ */ n("div", { className: q.mediaInputEmpty, children: C(g) })
          ] }),
          !p && /* @__PURE__ */ n(
            "input",
            {
              type: "hidden",
              name: m.name,
              defaultValue: e,
              value: t
            }
          ),
          /* @__PURE__ */ n(
            "input",
            {
              type: "file",
              ...m,
              name: p ? m.name : void 0,
              onChange: O,
              ref: f,
              className: q.mediaInputFile,
              "aria-label": K ? `${b.length} files selected` : "Select files"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ k(j, { children: [
      !p && /* @__PURE__ */ n(
        "input",
        {
          type: "hidden",
          name: m.name,
          defaultValue: e,
          value: t
        }
      ),
      /* @__PURE__ */ n(
        "input",
        {
          type: "file",
          ...m,
          name: p ? m.name : void 0,
          onChange: O,
          ref: f,
          className: q.input,
          "data-variant": "files"
        }
      )
    ] });
  })
), Ks = "cstnptbasezEm", Ys = "cstnptinpyTf", Ye = {
  base: Ks,
  input: Ys
}, se = (e, t) => Array.isArray(e) || e == null ? t : typeof e == "number" ? e : typeof e != "string" ? t : parseFloat(e), ft = i.forwardRef(
  ({ value: e, defaultValue: t, ...r }, s) => {
    const a = i.useRef(null), { min: c, max: d, step: o } = i.useMemo(() => ({
      min: se(r.min, Number.MIN_SAFE_INTEGER),
      max: se(r.max, Number.MAX_SAFE_INTEGER),
      step: typeof r.step > "u" ? void 0 : se(r.step, 1)
    }), [r.min, r.max, r.step]), [l, m] = i.useState(() => se(t, c)), f = i.useMemo(() => e !== void 0 ? se(e, c) : l, [e, l]), [p] = Ee(a), h = i.useMemo(() => (f - c) / (d - c), [f, c, d]), b = i.useCallback(
      (g) => {
        var O, W;
        const N = (O = a.current) == null ? void 0 : O.getBoundingClientRect();
        if (!N)
          return;
        const I = (g.pageX - N.left) / N.width, C = c + (d - c) * I, A = typeof o == "number" ? Math.round(C / o) * o : C, D = Math.min(Math.max(A, c), d), M = (W = a.current) == null ? void 0 : W.querySelector("input");
        if (!M || !(M instanceof HTMLInputElement))
          return;
        M.setAttribute("value", D.toString());
        const T = new Event("change", { bubbles: !0 });
        M.dispatchEvent(T), m(D);
      },
      [a, c, d, o, m, p]
    );
    nt(a, b), i.useEffect(() => {
      var N;
      if (!a.current)
        return;
      const g = (N = a.current) == null ? void 0 : N.querySelector("input");
      !g || !(g instanceof HTMLInputElement) || g.setAttribute("value", f.toString());
    }, [f]), i.useEffect(() => {
      a.current && a.current.style.setProperty("--progress", `${h}`);
    }, [h]);
    const u = i.useMemo(() => Math.round((d - c) / (o ?? 1)) < 100 ? "stepped" : "linear", [c, d, o]);
    return /* @__PURE__ */ n("div", { className: Ye.base, ref: a, "data-variant": u, children: /* @__PURE__ */ n("input", { type: "range", className: Ye.input, ...r, ref: s }) });
  }
);
ft.displayName = "RangeInput";
const Js = "cstnptbase", ea = "cstnptinp", ta = "cstnpttgl", na = "cstnptknob", ve = {
  base: Js,
  input: ea,
  toggle: ta,
  knob: na
}, ht = i.forwardRef(
  ({ defaultValue: e, value: t, ...r }, s) => /* @__PURE__ */ k("label", { className: ve.base, htmlFor: r.name, children: [
    /* @__PURE__ */ n("input", { type: "checkbox", ...r, ref: s, className: ve.input }),
    /* @__PURE__ */ n("div", { className: ve.toggle, children: /* @__PURE__ */ n("div", { className: ve.knob }) })
  ] })
);
ht.displayName = "SwitchInput";
const Je = (e) => {
  const t = new Date(e), r = t.getTimezoneOffset();
  return new Date(t.getTime() - r * 60 * 1e3).toISOString().replace("Z", "");
}, pt = i.forwardRef(
  ({ children: e, ...t }, r) => {
    const s = t.value && Je(t.value.toString()), a = t.defaultValue && Je(t.defaultValue.toString());
    return /* @__PURE__ */ n("input", { type: t.type ?? "text", ...t, value: s, defaultValue: a, ref: r, children: e });
  }
);
pt.displayName = "DateTimeInput";
const ra = {
  text: q.input,
  password: q.input,
  checkbox: we.checkbox,
  radio: Fs.radio
}, Se = U.forwardRef(({ children: e, ...t }, r) => {
  const s = t["aria-errormessage"], a = ra[t.type ?? "text"] ?? q.input, c = s ? /* @__PURE__ */ n("span", { className: q.errorLine, children: s }) : /* @__PURE__ */ n(j, {});
  return /* @__PURE__ */ k(j, { children: [
    /* @__PURE__ */ n(sa, { ...t, className: a, ref: r }),
    c
  ] });
});
Se.displayName = "Input";
const sa = v(({ children: e, className: t, ...r }, s) => {
  const a = r["data-variant"];
  return r.type === "file" ? /* @__PURE__ */ n(Qs, { ...r, variant: a, ref: s }) : r.type === "checkbox" && (a === "switch" || r.switch === "true") ? /* @__PURE__ */ n(ht, { ...r, switch: "false", ref: s }) : r.type === "range" ? /* @__PURE__ */ n(ft, { ...r, ref: s }) : r.type === "datetime-local" ? /* @__PURE__ */ n(pt, { type: r.type ?? "text", ...r, ref: s, className: t, children: e }) : r.type === "checkbox" ? /* @__PURE__ */ n(aa, { ...r, ref: s }) : /* @__PURE__ */ n("input", { type: r.type ?? "text", ...r, ref: s, className: t, children: e });
}), aa = ({
  indeterminate: e,
  ...t
}) => {
  const r = te(null);
  U.useEffect(() => {
    if (!r.current || typeof e != "boolean")
      return;
    const a = r.current.querySelector("input");
    a && (a.indeterminate = e);
  }, [e]);
  const s = e ? /* @__PURE__ */ n(ur, {}) : /* @__PURE__ */ n(ut, {});
  return /* @__PURE__ */ k("div", { role: "checkbox", className: we.base, ref: r, children: [
    /* @__PURE__ */ n(
      "input",
      {
        type: t.type,
        ...t,
        ref: t.ref,
        className: we.checkbox,
        role: "presentation",
        checked: t.checked,
        defaultChecked: t.defaultChecked,
        "aria-checked": t.checked,
        children: t.children
      }
    ),
    /* @__PURE__ */ n("i", { className: we.mark, role: "presentation", children: s })
  ] });
}, oa = "frmbtn", ca = "frmlbl", la = "frmform", ia = "frmprogressdTb", da = "frmmeter", ua = "frmoutput", ma = "frmoptgrp", fa = "frmoption", ha = "frmfieldset", pa = "frmlegend", Q = {
  button: oa,
  label: ca,
  form: la,
  progress: ia,
  meter: da,
  output: ua,
  optgroup: ma,
  option: fa,
  fieldset: ha,
  legend: pa
}, gt = y(
  v(({ children: e, ...t }, r) => {
    const s = mt(Q.label, t.className);
    return /* @__PURE__ */ n("label", { className: s, ...t, ref: r, children: Bt.map(e, (a) => typeof a == "string" ? /* @__PURE__ */ n(fe, { children: a }) : a) });
  })
);
gt.displayName = "Label";
const bt = ({
  isLoading: e,
  onSelect: t,
  message: r,
  defaultValue: s,
  open: a,
  onClose: c,
  potal: d,
  onCancel: o
}) => {
  const l = L(
    (m) => {
      if (m.preventDefault(), !(m.target instanceof HTMLFormElement))
        return;
      const f = m.target.querySelector('input[name="value"]');
      if (!(f instanceof HTMLInputElement))
        return;
      const p = f.value;
      t(p);
    },
    [t]
  );
  return /* @__PURE__ */ n(me, { open: a, onClose: c, potal: d, children: /* @__PURE__ */ n("div", { className: ie.content, "data-is-loading": e, children: /* @__PURE__ */ k("form", { onSubmit: l, children: [
    /* @__PURE__ */ n(gt, { children: r }),
    /* @__PURE__ */ n(Se, { defaultValue: s, name: "value" }),
    /* @__PURE__ */ k("div", { className: ie.buttonGroup, children: [
      /* @__PURE__ */ n(xe, { onClick: o, type: "reset", disabled: e, variant: "alert", children: "Cancel" }),
      /* @__PURE__ */ n(xe, { type: "submit", disabled: e, variant: "alert primary", children: "OK" })
    ] })
  ] }) }) });
};
bt.displayName = "Prompt";
const Hc = () => {
  const [e, t] = i.useState([]), r = i.useCallback(
    (l) => {
      t((m) => m.filter((f) => f.id !== l));
    },
    [t]
  ), s = i.useCallback(
    async (l) => new Promise((m, f) => {
      t((p) => [
        ...p,
        {
          type: "alert",
          id: Symbol("alert"),
          message: l,
          resolve: (h) => {
            r(h), m(void 0);
          },
          reject: (h) => {
            r(h), f();
          }
        }
      ]);
    }),
    [r]
  ), a = i.useCallback(async (l) => new Promise((m, f) => {
    t((p) => [
      ...p,
      {
        type: "confirm",
        id: Symbol("alert"),
        message: l,
        resolve: (h) => {
          r(h), m(h);
        },
        reject: (h) => {
          r(h), f();
        }
      }
    ]);
  }), []), c = i.useCallback(async (l, m) => new Promise((f, p) => {
    t((h) => [
      ...h,
      {
        type: "prompt",
        id: Symbol("alert"),
        defaultValue: m,
        message: l,
        resolve: (b, u) => {
          r(b), f(u);
        },
        reject: (b) => {
          r(b), p();
        }
      }
    ]);
  }), []), d = i.Fragment;
  return {
    confirm: a,
    alert: s,
    prompt: c,
    Outlet: () => /* @__PURE__ */ n(d, { children: e.map(({ id: l, type: m, title: f, message: p, defaultValue: h, resolve: b, reject: u }, g) => {
      switch (m) {
        case "alert":
          return /* @__PURE__ */ n(
            Ae,
            {
              open: !0,
              mark: "alert",
              title: f,
              description: p,
              onSelect: (N) => b(l),
              onClose: () => b(l),
              actions: [{ key: "confirm", value: "ok", variant: "primary" }]
            },
            g
          );
        case "confirm":
          return /* @__PURE__ */ n(
            Ae,
            {
              open: !0,
              mark: "alert",
              title: f,
              description: p,
              onSelect: (N) => {
                N === "confirm" ? b(l) : u(l);
              },
              onClose: () => u(l),
              actions: [
                { key: "confirm", value: "ok", variant: "primary" },
                { key: "dismiss", value: "Cancel" }
              ]
            },
            g
          );
        case "prompt":
          return /* @__PURE__ */ n(
            bt,
            {
              open: !0,
              message: p ?? "",
              onSelect: (N) => {
                b(l, N);
              },
              defaultValue: h,
              onClose: () => u(l),
              onCancel: () => u(l)
            },
            g
          );
      }
      return /* @__PURE__ */ n(j, {});
    }) })
  };
}, ga = ({
  variant: e,
  clickable: t = !1,
  disabled: r = !1,
  className: s,
  style: a,
  ...c
}) => /* @__PURE__ */ n(
  "div",
  {
    className: `${x.card} ${s || ""}`,
    "data-variant": e,
    "data-clickable": t,
    "data-disabled": r,
    tabIndex: t && !r ? 0 : void 0,
    role: t ? "button" : void 0,
    "aria-disabled": t && r ? !0 : void 0,
    style: {
      ...a,
      ...t && !r ? { cursor: "pointer" } : {}
    },
    ...c
  }
);
ga.displayName = "Card";
const zc = he, ba = ({
  items: e,
  setItems: t,
  element: r
}) => /* @__PURE__ */ n(he, { items: e, onChange: t, children: e.map((s, a) => /* @__PURE__ */ n(i.Fragment, { children: r(s, a) }, s.id)) });
ba.displayName = "SortableList";
const ya = "shrcon", va = "shrdropdown", Na = "shrdrobot", wa = "shrdroappbot", ka = "shrdrotop", xa = "shrdroapptop", Ia = "shrsea", Ca = "shrseazC3", Sa = "shrseanCa", $a = "shrconsea", Ma = "shrnoopt", La = "shroptions", Da = "shroption", Aa = "shropt", Ea = "shroptcpL", Ta = "shrchkemp", Ra = "shroptczS", F = {
  contextDialog: ya,
  dropdown: va,
  dropdownBottom: Na,
  dropdownAppearBottom: wa,
  dropdownTop: ka,
  dropdownAppearTop: xa,
  searchHeader: Ia,
  searchInputContainer: Ca,
  searchIcon: Sa,
  contextSearchInput: $a,
  noOptions: Ma,
  options: La,
  option: Da,
  optionButton: Aa,
  optionCheckbox: Ea,
  checkboxEmpty: Ta,
  optionLabel: Ra
}, yt = i.forwardRef(({
  isOpen: e,
  position: t,
  dialogPosition: r,
  options: s,
  selectedValues: a,
  multiple: c = !1,
  searchTerm: d,
  onSearchChange: o,
  onOptionToggle: l,
  onClose: m,
  searchPlaceholder: f = "Search options...",
  noOptionsMessage: p = "No options available",
  noMatchingMessage: h = "No matching options found"
}, b) => {
  const u = i.useRef(null);
  i.useEffect(() => {
    const N = (C) => {
      C.key === "Escape" && e && m();
    }, w = b && "current" in b ? b.current : null, I = (C) => {
      C.target === w && m();
    };
    return w && w.addEventListener("click", I), document.addEventListener("keydown", N), () => {
      w && w.removeEventListener("click", I), document.removeEventListener("keydown", N);
    };
  }, [e, m, b]), i.useEffect(() => {
    e && u.current && setTimeout(() => {
      u.current && u.current.focus();
    }, 50);
  }, [e]);
  const g = i.useMemo(() => d ? s.filter(
    (N) => N.label.toLowerCase().includes(d.toLowerCase())
  ) : s, [s, d]);
  return /* @__PURE__ */ n(
    "dialog",
    {
      ref: b,
      className: F.contextDialog,
      style: {
        top: `${r.top}px`,
        left: `${r.left}px`,
        width: `${r.width}px`
      },
      children: /* @__PURE__ */ k(
        "div",
        {
          className: `${F.dropdown} ${F[`dropdown${t === "top" ? "Top" : "Bottom"}`]}`,
          children: [
            /* @__PURE__ */ n("div", { className: F.searchHeader, children: /* @__PURE__ */ k("div", { className: F.searchInputContainer, children: [
              /* @__PURE__ */ n(Re, { size: 14, className: F.searchIcon }),
              /* @__PURE__ */ n(
                "input",
                {
                  ref: u,
                  type: "text",
                  value: d,
                  placeholder: f,
                  onChange: (N) => o(N.target.value),
                  className: F.contextSearchInput,
                  autoComplete: "off",
                  autoFocus: !0
                }
              )
            ] }) }),
            g.length === 0 ? /* @__PURE__ */ n("div", { className: F.noOptions, children: d ? h : p }) : /* @__PURE__ */ n("ul", { className: F.options, children: g.map((N, w) => {
              const I = a.includes(N.value);
              return /* @__PURE__ */ n("li", { className: F.option, children: /* @__PURE__ */ k(
                "button",
                {
                  type: "button",
                  className: F.optionButton,
                  onClick: () => l(N.value),
                  children: [
                    c && /* @__PURE__ */ n("span", { className: F.optionCheckbox, children: I ? /* @__PURE__ */ n("span", { children: "✓" }) : /* @__PURE__ */ n("span", { className: F.checkboxEmpty }) }),
                    /* @__PURE__ */ n("span", { className: F.optionLabel, children: N.label })
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
yt.displayName = "SelectDropdown";
const Ba = "shrselmar", Oa = "shrsel", Pa = "shrinpcnt shrsel0qy", Fa = "shrctn", Ha = "shrmark shrselmarbiW", Le = {
  selectMark: Ba,
  selectContainer: Oa,
  inputContainer: Pa,
  content: Fa,
  mark: Ha
}, vt = i.forwardRef(({
  children: e,
  onClick: t,
  disabled: r = !1,
  isOpen: s = !1,
  className: a
}, c) => /* @__PURE__ */ k(
  "div",
  {
    ref: c,
    className: `${Le.inputContainer} ${a || ""}`,
    onClick: r ? void 0 : t,
    "data-disabled": r,
    children: [
      /* @__PURE__ */ n("div", { className: Le.content, children: e }),
      /* @__PURE__ */ n("div", { className: Le.mark, role: "presentation", children: /* @__PURE__ */ n(_, { direction: s ? "up" : "down" }) })
    ]
  }
));
vt.displayName = "SelectInput";
const za = "shrtagseg", qa = "shrtagtxt", Ua = "shrtagrem", ja = "shrsinval", Va = "shrpla", ae = {
  tagSegment: za,
  tagText: qa,
  tagRemove: Ua,
  singleValue: ja,
  placeholder: Va
}, Nt = ({
  selectedValues: e,
  getOptionLabel: t,
  onRemoveTag: r,
  placeholder: s = "Select option...",
  multiple: a = !1,
  disabled: c = !1,
  renderSelected: d
}) => {
  if (e.length === 0)
    return /* @__PURE__ */ n("span", { className: ae.placeholder, children: s });
  if (!a && e.length > 0) {
    const o = e[0];
    return /* @__PURE__ */ n("span", { className: ae.singleValue, children: d ? d(o) : t(o) });
  }
  return /* @__PURE__ */ n(j, { children: e.map((o, l) => /* @__PURE__ */ k("span", { className: ae.tagSegment, children: [
    /* @__PURE__ */ n("span", { className: ae.tagText, children: t(o) }),
    !c && r && /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        className: ae.tagRemove,
        onClick: (m) => r(o, m),
        "aria-label": `Remove ${t(o)}`,
        children: "×"
      }
    )
  ] }, l)) });
};
Nt.displayName = "SelectTags";
const Wa = ({
  value: e,
  defaultValue: t,
  multiple: r = !1,
  disabled: s = !1,
  onChange: a
}) => {
  const [c, d] = i.useState(() => t), o = i.useMemo(() => e !== void 0 ? e : c, [e, c]), l = i.useMemo(() => r ? Array.isArray(o) ? o.map(String) : o ? [String(o)] : [] : o ? [String(o)] : [], [o, r]), m = i.useCallback((p) => {
    if (s) return;
    let h;
    if (r) {
      const b = Array.isArray(o) ? o.map(String) : o ? [String(o)] : [];
      b.includes(p) ? h = b.filter((u) => u !== p) : h = [...b, p];
    } else
      h = p;
    d(h), a && a(h);
  }, [s, r, o, a]), f = i.useCallback((p, h) => {
    if (s) return;
    h.stopPropagation();
    const u = (Array.isArray(o) ? o.map(String) : o ? [String(o)] : []).filter((g) => g !== p);
    d(u), a && a(u);
  }, [s, o, a]);
  return {
    currentValue: o,
    selectedValues: l,
    handleToggleOption: m,
    handleRemoveTag: f
  };
}, Xa = ({
  onClose: e
} = {}) => {
  const [t, r] = i.useState(!1), [s, a] = i.useState(""), [c, d] = i.useState("bottom"), [o, l] = i.useState({ top: 0, left: 0, width: 0 }), m = i.useRef(null), f = i.useRef(null), p = i.useCallback(() => {
    if (!m.current) return { position: "bottom", dialogPos: { top: 0, left: 0, width: 0 } };
    const g = m.current.getBoundingClientRect(), N = window.innerHeight, w = 200, I = N - g.bottom, C = g.top, A = {
      top: I < w && C >= w ? g.top - w - 8 : g.bottom + 4,
      // Position below
      left: g.left,
      width: g.width
    };
    return { position: I < w && C >= w ? "top" : "bottom", dialogPos: A };
  }, []), h = i.useCallback(() => {
    const { position: g, dialogPos: N } = p();
    d(g), l(N), r(!0), f.current && f.current.showModal();
  }, [p]), b = i.useCallback(() => {
    f.current && f.current.open && f.current.close();
  }, []), u = i.useCallback(() => {
    r(!1), a(""), e && e();
  }, [e]);
  return i.useEffect(() => {
    const g = () => {
      if (t && m.current) {
        const { position: w, dialogPos: I } = p();
        d(w), l(I);
      }
    }, N = f.current;
    return N && N.addEventListener("close", u), window.addEventListener("resize", g), window.addEventListener("scroll", g), () => {
      N && N.removeEventListener("close", u), window.removeEventListener("resize", g), window.removeEventListener("scroll", g);
    };
  }, [t, p, u]), {
    isOpen: t,
    searchTerm: s,
    dropdownPosition: c,
    dialogPosition: o,
    containerRef: m,
    dialogRef: f,
    openDialog: h,
    closeDialog: b,
    setSearchTerm: a
  };
}, Za = (e) => i.isValidElement(e) && e.type === "option", et = (e) => e === void 0 ? [] : Array.isArray(e) ? [...e] : [e], Ga = ({
  children: e,
  value: t,
  defaultValue: r,
  multiple: s = !0
}) => {
  const a = t !== void 0, [c, d] = i.useState(() => et(a ? t : r)), o = a ? et(t) : c, l = i.useMemo(() => i.Children.toArray(e).filter(Za).map((u) => {
    var g;
    return {
      value: u.props.value,
      label: ((g = u.props.children) == null ? void 0 : g.toString()) || u.props.value
    };
  }), [e]), m = i.useCallback((b, u) => {
    if (!s) {
      d(u ? [b] : []);
      return;
    }
    d((g) => u ? [...g, b] : g.filter((N) => N !== b));
  }, [s]), f = i.useCallback((b) => {
    d(b ? l.map((u) => u.value) : []);
  }, [l]), p = o.length > 0 && o.length < l.length, h = p ? !1 : o.length === l.length;
  return {
    options: l,
    selectedValues: o,
    handleToggleOption: m,
    handleToggleAll: f,
    isCheckedAll: h,
    isCheckedPartially: p
  };
}, _a = "frmcnt", Qa = "frmhid", Ka = {
  container: _a,
  hiddenInput: Qa
}, qc = ({
  value: e,
  defaultValue: t,
  name: r,
  list: s,
  renderSelected: a,
  placeholder: c = "Select option...",
  multiple: d = !1,
  disabled: o = !1,
  onChange: l,
  ...m
}) => {
  const {
    currentValue: f,
    selectedValues: p,
    handleToggleOption: h,
    handleRemoveTag: b
  } = Wa({ value: e, defaultValue: t, multiple: d, disabled: o, onChange: l }), {
    isOpen: u,
    searchTerm: g,
    dropdownPosition: N,
    dialogPosition: w,
    containerRef: I,
    dialogRef: C,
    openDialog: A,
    closeDialog: D,
    setSearchTerm: M
  } = Xa(), T = i.useCallback(() => {
    !u && !o && A();
  }, [u, o, A]), O = i.useCallback((P) => {
    h(P), d || D();
  }, [h, d, D]), { dataListElement: W, options: Z } = Ya({ list: s }), ne = i.useCallback((P) => {
    var K;
    return ((K = Z == null ? void 0 : Z.find((ge) => ge.value === P)) == null ? void 0 : K.label) || P;
  }, [Z]);
  return /* @__PURE__ */ k("div", { className: Ka.container, ref: I, children: [
    /* @__PURE__ */ n(
      vt,
      {
        onClick: T,
        disabled: o,
        isOpen: u,
        children: /* @__PURE__ */ n(
          Nt,
          {
            selectedValues: p,
            getOptionLabel: ne,
            onRemoveTag: b,
            placeholder: c,
            multiple: d,
            disabled: o,
            renderSelected: a ? (P) => a(P, W == null ? void 0 : W.querySelector(`option[value="${P}"]`)) : void 0
          }
        )
      }
    ),
    /* @__PURE__ */ n(
      yt,
      {
        ref: C,
        isOpen: u,
        position: N,
        dialogPosition: w,
        options: Z || [],
        selectedValues: p,
        multiple: d,
        searchTerm: g,
        onSearchChange: M,
        onOptionToggle: O,
        onClose: D
      }
    ),
    /* @__PURE__ */ n(
      "input",
      {
        type: "hidden",
        name: r,
        value: d ? JSON.stringify(p) : String(p[0] || "")
      }
    )
  ] });
}, Ya = ({ list: e }) => {
  const [t, r] = i.useState(), [s, a] = i.useState([]);
  return i.useEffect(() => {
    if (!(window != null && window.document) || !e)
      return;
    const c = document.getElementById(e);
    if (!c || !(c instanceof HTMLDataListElement))
      return;
    r(c);
    const o = Array.from(c.options).map((l) => ({
      value: l.value,
      label: l.label || l.textContent || l.value
    }));
    a(o);
  }, [e]), { dataListElement: t, options: s };
}, Ja = "frmclsbtn", eo = {
  closeButton: Ja
}, Uc = U.memo(
  U.forwardRef(({ children: e, ...t }, r) => /* @__PURE__ */ n("button", { ...t, ref: r, className: eo.closeButton, "aria-label": "Close", type: "button", "data-variant": "close", children: /* @__PURE__ */ n(dr, { size: 16 }) }))
), to = "blctime", no = {
  time: to
}, tt = (e) => e == null ? !1 : typeof e == "number" ? !0 : typeof e == "string" ? !isNaN(Date.parse(e)) : e instanceof Date && !isNaN(e.getTime()), ro = y(
  v((e, t) => {
    const r = U.useMemo(() => {
      if (e.type === "ulid")
        return typeof e.timestamp != "string" ? void 0 : ao(e.timestamp);
      if (!e.timestamp)
        return;
      if (e.type === "unix" || e.type === "unixtime") {
        const c = typeof e.timestamp == "number" ? e.timestamp : +e.timestamp;
        return new Date(c * 1e3);
      }
      return tt(e.timestamp) && e.timestamp instanceof Date ? e.timestamp : new Date(e.timestamp);
    }, [e.timestamp, e.type]), s = U.useMemo(() => {
      if (tt(r) && r instanceof Date) {
        if (!e.format)
          return r.toLocaleString();
        const a = {
          y: r.getFullYear(),
          M: r.getMonth() + 1,
          d: r.getDate(),
          H: r.getHours(),
          m: r.getMinutes(),
          s: r.getSeconds()
        };
        return e.format.replace(/yyyy|MM|dd|HH|mm|ss|yy/g, (c) => {
          const d = c.length, o = c.charAt(0), l = a[o];
          return typeof l > "u" ? c : l.toString().padStart(d, "0");
        });
      }
    }, [r, e.format]);
    return /* @__PURE__ */ n("time", { className: no.time, ...e, ref: t, children: /* @__PURE__ */ n(fe, { children: s }) });
  })
);
ro.displayName = "Time";
const so = "0123456789ABCDEFGHJKMNPQRSTVWXYZ", ao = (e) => {
  let t = 0;
  const r = e.substring(0, 10).toUpperCase();
  for (let s = 0; s < r.length; s++) {
    const a = r.charAt(s), c = so.indexOf(a), d = 9 - s;
    t += Math.pow(32, d) * c;
  }
  return new Date(t);
}, oo = "lmnlist", co = "lmnlistitm", lo = "lmnlis", io = "lmnlisare", uo = "lmnlischi", ke = {
  list: oo,
  listItem: co,
  listItemLabel: lo,
  listItemLabelArea: io,
  listItemChildren: uo
}, Ve = y(
  v(({ children: e, ...t }, r) => /* @__PURE__ */ n("ul", { className: ke.list, ...t, ref: r, children: e }))
), jc = Ve;
Ve.displayName = "List";
const mo = y(
  v(({ children: e, ...t }, r) => /* @__PURE__ */ n("li", { className: ke.listItem, ...t, ref: r, children: /* @__PURE__ */ n("div", { className: ke.listItemLabelArea, children: /* @__PURE__ */ n("span", { className: ke.listItemLabel, children: e }) }) }))
), Vc = mo, fo = y(
  v(({ children: e, ...t }, r) => /* @__PURE__ */ n("fieldset", { className: Q.fieldset, ...t, ref: r, children: e }))
);
fo.displayName = "Fieldset";
const ho = y(
  v((e, t) => /* @__PURE__ */ n("legend", { className: Q.legend, ref: t, children: e.children }))
);
ho.displayName = "Legend";
const po = "frmseliWx", go = "frmslc", bo = "frmslcAll", yo = "frmmarkI0Z", de = {
  selectbox: po,
  selectable: go,
  selectableAll: bo,
  mark: yo
}, vo = "lmntable", No = {
  table: vo
}, wt = y(
  v((e, t) => /* @__PURE__ */ n("table", { className: No.table, ...e, ref: t, children: e.children }))
);
wt.displayName = "Table";
const wo = v((e, t) => e["data-variant"] === "selectable" ? /* @__PURE__ */ n(ko, { switch: e.switch, children: e.children }) : /* @__PURE__ */ n(kt, { hidden: e.hidden, children: /* @__PURE__ */ n("select", { ...e, ref: t, children: e.children }) }));
wo.displayName = "Selectbox";
const ko = ({
  children: e,
  hidden: t,
  ...r
}) => {
  const s = i.useRef(null), {
    options: a,
    selectedValues: c,
    handleToggleOption: d,
    handleToggleAll: o,
    isCheckedAll: l,
    isCheckedPartially: m
  } = Ga({
    children: e,
    value: r.value,
    defaultValue: r.defaultValue,
    multiple: !0
  }), f = i.useCallback(
    (h, b) => {
      const u = s.current;
      if (!u)
        return;
      const g = u.querySelector(`option[value="${h}"]`);
      if (!g)
        return;
      d(h, b), g.setAttribute("checked", b.toString());
      const N = new Event("change", { bubbles: !0 });
      u.dispatchEvent(N);
    },
    [d]
  ), p = i.useCallback(
    (h) => {
      var N, w;
      const b = h.target.checked, u = h.target.indeterminate;
      o(!!(u || b));
      const g = (N = s.current) == null ? void 0 : N.querySelectorAll("option");
      if (g) {
        Array.from(g).forEach((C) => {
          C.setAttribute("checked", (u || b).toString());
        });
        const I = new Event("change", { bubbles: !0 });
        (w = s.current) == null || w.dispatchEvent(I);
      }
    },
    [o]
  );
  return /* @__PURE__ */ k("div", { className: de.selectable, "data-hidden": t, ...r, children: [
    /* @__PURE__ */ n(
      "select",
      {
        ...r,
        multiple: !0,
        ref: s,
        style: {
          display: "none"
        },
        children: e
      }
    ),
    /* @__PURE__ */ k(wt, { children: [
      /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ k("tr", { children: [
        /* @__PURE__ */ n("th", { className: de.selectableAll, children: /* @__PURE__ */ n(
          Se,
          {
            type: "checkbox",
            "data-size": "small",
            checked: l,
            onChange: p,
            id: r.id,
            indeterminate: m
          }
        ) }),
        /* @__PURE__ */ n("th", { children: r["aria-label"] })
      ] }) }),
      /* @__PURE__ */ n("tbody", { children: a.map((h, b) => /* @__PURE__ */ n(
        xo,
        {
          values: c,
          value: h.value,
          onChange: f,
          switch: r.switch,
          children: h.label
        },
        h.value
      )) })
    ] }),
    /* @__PURE__ */ n("div", { className: de.mark, role: "presentation", children: /* @__PURE__ */ n(_, {}) })
  ] });
}, xo = ({
  values: e,
  value: t,
  onChange: r,
  children: s,
  ...a
}) => {
  const c = e.includes(t), d = i.useId(), o = i.useCallback(
    (l) => {
      r(t, l.target.checked);
    },
    [t, r]
  );
  return /* @__PURE__ */ k("tr", { children: [
    /* @__PURE__ */ n("th", { children: /* @__PURE__ */ n(Se, { type: "checkbox", switch: a.switch, "data-size": "small", checked: c, onChange: o, id: d }) }),
    /* @__PURE__ */ n("td", { children: s })
  ] });
}, kt = ({ children: e, hidden: t, ...r }) => /* @__PURE__ */ k("div", { className: de.selectbox, "data-hidden": t, ...r, children: [
  e,
  /* @__PURE__ */ n("div", { className: de.mark, role: "presentation", children: /* @__PURE__ */ n(_, {}) })
] });
kt.displayName = "View";
const Io = y(
  v((e, t) => /* @__PURE__ */ n("textarea", { className: q.input, ...e, ref: t, children: e.children }))
);
Io.displayName = "Textarea";
const Co = "nvgsummary", So = "nvgmarker", $o = "nvgdetails", Mo = "nvgbtn", Lo = "nvgsectit", Do = "nvglistitm", Ao = "nvglisare", Eo = "nvglis", To = "nvglischi", z = {
  summary: Co,
  marker: So,
  details: $o,
  button: Mo,
  sectionTitle: Lo,
  listItem: Do,
  listItemLabelArea: Ao,
  listItemLabel: Eo,
  listItemChildren: To
}, xt = U.memo(
  U.forwardRef((e, t) => /* @__PURE__ */ n("details", { className: z.details, ...e, ref: t, children: e.children }))
);
xt.displayName = "Container";
const It = U.memo(({ title: e, children: t }) => /* @__PURE__ */ n(We, { children: /* @__PURE__ */ k("div", { className: z.sectionTitle, children: [
  /* @__PURE__ */ n("span", { children: e }),
  t,
  /* @__PURE__ */ n("i", { className: z.marker, children: /* @__PURE__ */ n(_, {}) })
] }) }));
It.displayName = "SectionTitle";
const Ct = U.forwardRef((e, t) => /* @__PURE__ */ n("button", { ...e, ref: t, className: z.button }));
Ct.displayName = "Button";
const Ro = y(({ label: e, onClick: t, icon: r, selected: s, children: a, open: c, ...d }) => {
  const l = /* @__PURE__ */ k(t ? "button" : "div", { className: z.listItemLabelArea, onClick: t, children: [
    typeof r == "string" ? /* @__PURE__ */ n("div", { className: z.listItemMarker, children: r }) : r,
    /* @__PURE__ */ n("span", { className: z.listItemLabel, children: e })
  ] });
  return /* @__PURE__ */ n("li", { className: z.listItem, "data-selected": s, ...d, children: a ? /* @__PURE__ */ k("details", { open: c, className: z.details, children: [
    /* @__PURE__ */ k("summary", { className: z.summary, children: [
      l,
      /* @__PURE__ */ n("i", { className: z.marker, children: /* @__PURE__ */ n(_, {}) })
    ] }),
    /* @__PURE__ */ n("div", { className: z.listItemChildren, children: a })
  ] }) : l });
}), We = U.memo(({ children: e }) => /* @__PURE__ */ n("summary", { className: z.summary, children: e }));
We.displayName = "Summary";
const Wc = {
  Button: Ct,
  Container: xt,
  SectionTitle: It,
  Summary: We,
  ListItem: Ro,
  List: Ve
}, St = v((e, t) => {
  const r = J(() => [x.a, e.className].join(" "), [e.className]);
  return /* @__PURE__ */ n("a", { ...e, className: r, ref: t, children: e.children });
});
St.displayName = "Anchor";
const Xc = St, $t = v((e, t) => /* @__PURE__ */ n("img", { className: x.image, ...e, ref: t, children: e.children }));
$t.displayName = "Image";
const Zc = $t, Bo = y(
  v((e, t) => /* @__PURE__ */ n("details", { className: x.details, ...e, ref: t, children: e.children }))
);
Bo.displayName = "Details";
const Oo = y(
  v((e, t) => /* @__PURE__ */ k("summary", { className: x.summary, ...e, ref: t, children: [
    /* @__PURE__ */ n("span", { className: x.label, children: e.children }),
    /* @__PURE__ */ n("i", { className: x.marker, children: /* @__PURE__ */ n(_, {}) })
  ] }))
);
Oo.displayName = "Summary";
const Mt = y(
  v((e, t) => /* @__PURE__ */ n("p", { className: x.paragraph, ...e, ref: t }))
);
Mt.displayName = "Paragraph";
const Gc = Mt, Lt = y(
  v((e, t) => /* @__PURE__ */ n("dl", { className: x.descriptions, ...e, ref: t, children: e.children }))
);
Lt.displayName = "Descriptions";
const _c = Lt, Dt = y(
  v((e, t) => /* @__PURE__ */ n("hr", { className: x.horizontalrule, ...e, ref: t, children: e.children }))
);
Dt.displayName = "HorizontalRule";
const Qc = Dt, Po = y(
  v((e, t) => /* @__PURE__ */ n("article", { className: x.article, ...e, ref: t }))
);
Po.displayName = "Article";
const Fo = y(
  v((e, t) => /* @__PURE__ */ n("section", { className: x.section, ...e, ref: t }))
);
Fo.displayName = "Section";
const Ho = y(
  v((e, t) => /* @__PURE__ */ n("nav", { className: x.nav, ...e, ref: t }))
);
Ho.displayName = "Nav";
const zo = y(
  v((e, t) => /* @__PURE__ */ n("main", { className: x.main, ...e, ref: t }))
);
zo.displayName = "Main";
const qo = y(
  v((e, t) => /* @__PURE__ */ n("header", { className: x.header, ...e, ref: t }))
);
qo.displayName = "Header";
const Uo = y(
  v((e, t) => /* @__PURE__ */ n("footer", { className: x.footer, ...e, ref: t }))
);
Uo.displayName = "Footer";
const jo = y(
  v((e, t) => /* @__PURE__ */ n("aside", { className: x.aside, ...e, ref: t }))
);
jo.displayName = "Aside";
const Vo = y(
  v((e, t) => /* @__PURE__ */ n("address", { className: x.address, ...e, ref: t }))
);
Vo.displayName = "Address";
const Wo = y(
  v((e, t) => /* @__PURE__ */ n("blockquote", { className: x.blockquote, ...e, ref: t }))
);
Wo.displayName = "Blockquote";
const Xo = y(
  v((e, t) => /* @__PURE__ */ n("figure", { className: x.figure, ...e, ref: t }))
);
Xo.displayName = "Figure";
const Zo = y(
  v((e, t) => /* @__PURE__ */ n("figcaption", { className: x.figcaption, ...e, ref: t }))
);
Zo.displayName = "Figcaption";
const Go = y(
  v((e, t) => /* @__PURE__ */ n("pre", { className: x.pre, ...e, ref: t }))
);
Go.displayName = "Pre";
const _o = y(
  v((e, t) => /* @__PURE__ */ n("div", { className: x.div, ...e, ref: t }))
);
_o.displayName = "Div";
const Qo = y(
  v((e, t) => /* @__PURE__ */ n("form", { className: Q.form, ...e, ref: t }))
);
Qo.displayName = "Form";
const Ko = y(
  v((e, t) => /* @__PURE__ */ n("progress", { className: Q.progress, ...e, ref: t }))
);
Ko.displayName = "Progress";
const Yo = y(
  v((e, t) => /* @__PURE__ */ n("meter", { className: Q.meter, ...e, ref: t }))
);
Yo.displayName = "Meter";
const Jo = y(
  v((e, t) => /* @__PURE__ */ n("output", { className: Q.output, ...e, ref: t }))
);
Jo.displayName = "Output";
const ec = y(
  v((e, t) => /* @__PURE__ */ n("optgroup", { className: Q.optgroup, ...e, ref: t }))
);
ec.displayName = "Optgroup";
const tc = y(
  v((e, t) => /* @__PURE__ */ n("option", { className: Q.option, ...e, ref: t }))
);
tc.displayName = "Option";
const nc = y(
  v((e, t) => /* @__PURE__ */ n("strong", { className: x.strong, ...e, ref: t }))
);
nc.displayName = "Strong";
const rc = y(
  v((e, t) => /* @__PURE__ */ n("em", { className: x.em, ...e, ref: t }))
);
rc.displayName = "Em";
const sc = y(
  v((e, t) => /* @__PURE__ */ n("small", { className: x.small, ...e, ref: t }))
);
sc.displayName = "Small";
const ac = y(
  v((e, t) => /* @__PURE__ */ n("mark", { className: x.mark, ...e, ref: t }))
);
ac.displayName = "Mark";
const oc = y(
  v((e, t) => /* @__PURE__ */ n("del", { className: x.del, ...e, ref: t }))
);
oc.displayName = "Del";
const cc = y(
  v((e, t) => /* @__PURE__ */ n("ins", { className: x.ins, ...e, ref: t }))
);
cc.displayName = "Ins";
const lc = y(
  v((e, t) => /* @__PURE__ */ n("sub", { className: x.sub, ...e, ref: t }))
);
lc.displayName = "Sub";
const ic = y(
  v((e, t) => /* @__PURE__ */ n("sup", { className: x.sup, ...e, ref: t }))
);
ic.displayName = "Sup";
const dc = y(
  v((e, t) => /* @__PURE__ */ n("code", { className: x.code, ...e, ref: t }))
);
dc.displayName = "Code";
const uc = y(
  v((e, t) => /* @__PURE__ */ n("kbd", { className: x.kbd, ...e, ref: t }))
);
uc.displayName = "Kbd";
const mc = y(
  v((e, t) => /* @__PURE__ */ n("samp", { className: x.samp, ...e, ref: t }))
);
mc.displayName = "Samp";
const fc = y(
  v((e, t) => /* @__PURE__ */ n("var", { className: x.var, ...e, ref: t }))
);
fc.displayName = "Var";
const hc = y(
  v((e, t) => /* @__PURE__ */ n("abbr", { className: x.abbr, ...e, ref: t }))
);
hc.displayName = "Abbr";
const pc = y(
  v((e, t) => /* @__PURE__ */ n("cite", { className: x.cite, ...e, ref: t }))
);
pc.displayName = "Cite";
const gc = y(
  v((e, t) => /* @__PURE__ */ n("dfn", { className: x.dfn, ...e, ref: t }))
);
gc.displayName = "Dfn";
const bc = y(
  v((e, t) => /* @__PURE__ */ n("q", { className: x.q, ...e, ref: t }))
);
bc.displayName = "Q";
const yc = y(
  v((e, t) => /* @__PURE__ */ n("ruby", { className: x.ruby, ...e, ref: t }))
);
yc.displayName = "Ruby";
const vc = y(
  v((e, t) => /* @__PURE__ */ n("rt", { className: x.rt, ...e, ref: t }))
);
vc.displayName = "Rt";
const Nc = y(
  v((e, t) => /* @__PURE__ */ n("ol", { className: x.ol, ...e, ref: t }))
);
Nc.displayName = "Ol";
const wc = y(
  v((e, t) => /* @__PURE__ */ n("dd", { className: x.dd, ...e, ref: t }))
);
wc.displayName = "Dd";
const kc = y(
  v((e, t) => /* @__PURE__ */ n("dt", { className: x.dt, ...e, ref: t }))
);
kc.displayName = "Dt";
const xc = y(
  v((e, t) => /* @__PURE__ */ n("th", { className: x.th, ...e, ref: t }))
);
xc.displayName = "Th";
const Ic = y(
  v((e, t) => /* @__PURE__ */ n("td", { className: x.td, ...e, ref: t }))
);
Ic.displayName = "Td";
const Cc = y(
  v((e, t) => /* @__PURE__ */ n("caption", { className: x.caption, ...e, ref: t }))
);
Cc.displayName = "Caption";
export {
  Xc as A,
  hc as Abbr,
  Vo as Address,
  Ae as Alert,
  St as Anchor,
  Po as Article,
  jo as Aside,
  Ac as BarItems,
  Wo as Blockquote,
  xe as Button,
  Cc as Caption,
  ga as Card,
  pc as Cite,
  Uc as CloseButton,
  dc as Code,
  Bs as ContextualMenu,
  qc as DataList,
  wc as Dd,
  oc as Del,
  Lt as Descriptions,
  Bo as Details,
  gc as Dfn,
  ot as Dialog,
  Dc as DialogFooter,
  _o as Div,
  _c as Dl,
  Qt as Drawer,
  kc as Dt,
  gn as EditableLabel,
  rc as Em,
  fo as Fieldset,
  Zo as Figcaption,
  Xo as Figure,
  Uo as Footer,
  Qo as Form,
  Ec as H1,
  Tc as H2,
  Rc as H3,
  Bc as H4,
  Oc as H5,
  Pc as H6,
  qo as Header,
  ee as Heading,
  Dt as HorizontalRule,
  Qc as Hr,
  ir as Icon,
  $t as Image,
  Zc as Img,
  Se as Input,
  cc as Ins,
  uc as Kbd,
  gt as Label,
  ho as Legend,
  Vc as Li,
  Ve as List,
  mo as ListItem,
  zo as Main,
  ac as Mark,
  Qs as MediaInput,
  Ke as MediaPreview,
  Yo as Meter,
  Os as Modal,
  Ho as Nav,
  Nc as Ol,
  ec as Optgroup,
  tc as Option,
  Jo as Output,
  Gc as P,
  Mt as Paragraph,
  st as Potal,
  Go as Pre,
  Ko as Progress,
  bc as Q,
  hr as Resizer,
  vc as Rt,
  yc as Ruby,
  mc as Samp,
  Fo as Section,
  wr as Segment,
  xr as SegmentedControl,
  wo as Select,
  wo as Selectbox,
  Wc as SidebarList,
  sc as Small,
  zc as Sortable,
  ba as SortableList,
  nc as Strong,
  lc as Sub,
  Oo as Summary,
  ic as Sup,
  jn as TabBar,
  En as TabNav,
  wt as Table,
  Ic as Td,
  fe as Text,
  Io as Textarea,
  xc as Th,
  ro as Time,
  R as Toolbar,
  jc as Ul,
  fc as Var,
  Fc as useContextualMenu,
  Ws as useMediaInputI18n,
  Hc as useNativeAlertLikeInterface,
  Vs as useObjectURLs,
  rt as usePopup,
  Te as useSortable,
  kr as useToggle
};
