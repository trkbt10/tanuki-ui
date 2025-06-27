import { jsx as S, jsxs as O, Fragment as ne } from "react/jsx-runtime";
import x, { createContext as re, useContext as oe, useMemo as N, useReducer as le, useCallback as b, useState as _, useRef as se, useEffect as ie } from "react";
var R = /* @__PURE__ */ ((e) => (e.ACTIVATE_TAB = "ACTIVATE_TAB", e.CLOSE_TAB = "CLOSE_TAB", e.CREATE_TAB = "CREATE_TAB", e.MOVE_TAB = "MOVE_TAB", e.REORDER_TAB = "REORDER_TAB", e.SPLIT_PANEL = "SPLIT_PANEL", e.CLOSE_PANEL = "CLOSE_PANEL", e.RESIZE_PANEL = "RESIZE_PANEL", e.FOCUS_PANEL = "FOCUS_PANEL", e.START_DRAG = "START_DRAG", e.SET_DROP_TARGET = "SET_DROP_TARGET", e.END_DRAG = "END_DRAG", e.EXECUTE_DROP = "EXECUTE_DROP", e.PRUNE_EMPTY_NODES = "PRUNE_EMPTY_NODES", e.RESTORE_TAB = "RESTORE_TAB", e.SET_STATE = "SET_STATE", e))(R || {});
const ce = (e) => ({
  activateTab: (t, r) => {
    e({
      type: "ACTIVATE_TAB",
      payload: { leafId: t, tabId: r }
    });
  },
  closeTab: (t, r) => {
    e({
      type: "CLOSE_TAB",
      payload: { leafId: t, tabId: r }
    });
  },
  createTab: (t, r) => {
    r && e({
      type: "CREATE_TAB",
      payload: { leafId: t, tab: r }
    });
  },
  moveTab: (t, r, o, a) => {
    console.log("🎭 ACTION moveTab dispatching:", { sourceLeafId: t, targetLeafId: r, tabId: o, targetIndex: a }), e({
      type: "MOVE_TAB",
      payload: { sourceLeafId: t, targetLeafId: r, tabId: o, targetIndex: a }
    });
  },
  reorderTab: (t, r, o) => {
    console.log("🎭 ACTION reorderTab dispatching:", { leafId: t, tabId: r, newIndex: o }), e({
      type: "REORDER_TAB",
      payload: { leafId: t, tabId: r, newIndex: o }
    });
  },
  splitPanel: (t, r, o) => {
    e({
      type: "SPLIT_PANEL",
      payload: { leafId: t, orientation: r, ratio: o }
    });
  },
  closePanel: (t) => {
    e({
      type: "CLOSE_PANEL",
      payload: { panelId: t }
    });
  },
  resizePanel: (t, r) => {
    e({
      type: "RESIZE_PANEL",
      payload: { panelId: t, sizes: r }
    });
  },
  focusPanel: (t) => {
    e({
      type: "FOCUS_PANEL",
      payload: { leafId: t }
    });
  },
  startDrag: (t, r) => {
    e({
      type: "START_DRAG",
      payload: { tabId: t, sourceLeafId: r }
    });
  },
  setDropTarget: (t, r, o) => {
    e({
      type: "SET_DROP_TARGET",
      payload: { leafId: t, direction: r, insertIndex: o }
    });
  },
  endDrag: () => {
    e({
      type: "END_DRAG"
      /* END_DRAG */
    });
  },
  executeDrop: () => {
    e({
      type: "EXECUTE_DROP"
      /* EXECUTE_DROP */
    });
  },
  pruneEmptyNodes: () => {
    e({
      type: "PRUNE_EMPTY_NODES"
      /* PRUNE_EMPTY_NODES */
    });
  },
  restoreTab: () => {
    e({
      type: "RESTORE_TAB"
      /* RESTORE_TAB */
    });
  }
}), U = () => Math.random().toString(36).substr(2, 9), P = (e, t) => {
  if (e.id === t) return e;
  if (e.type === "split")
    for (const r of e.children) {
      const o = P(r, t);
      if (o) return o;
    }
  return null;
}, j = (e, t) => {
  if (e.type === "split") {
    const r = e.children.findIndex((o) => o.id === t);
    if (r !== -1)
      return { parent: e, index: r };
    for (const o of e.children) {
      const a = j(o, t);
      if (a) return a;
    }
  }
  return null;
}, H = (e, t) => {
  if (e.id === t) return null;
  if (e.type === "split") {
    const r = e.children.map((o) => H(o, t)).filter((o) => o !== null);
    return { ...e, children: r };
  }
  return e;
}, w = (e) => {
  if (e.type === "leaf")
    return e.tabs.length > 0 ? e : null;
  const t = e.children.map((o) => w(o)).filter((o) => o !== null);
  if (t.length === 0)
    return null;
  if (t.length === 1)
    return t[0];
  const r = t.map(() => 1 / t.length);
  return {
    ...e,
    children: t,
    sizes: r
  };
}, de = (e, t, r) => {
  const o = (a) => a.id === t && a.type === "leaf" ? { ...a, activeTabId: r } : a.type === "split" ? { ...a, children: a.children.map(o) } : a;
  return {
    ...e,
    root: o(e.root),
    focusedLeafId: t
  };
}, pe = (e, t, r) => {
  const o = P(e.root, t);
  if (!o || o.type !== "leaf") return e;
  const a = o.tabs.findIndex((g) => g.id === r);
  if (a === -1) return e;
  const l = o.tabs[a], p = o.tabs.filter((g) => g.id !== r), i = [...e.recentlyClosedTabs || [], l];
  let c = o.activeTabId;
  o.activeTabId === r && (a < p.length ? c = p[a].id : p.length > 0 ? c = p[p.length - 1].id : c = "");
  const n = (g) => g.id === t && g.type === "leaf" ? { ...g, tabs: p, activeTabId: c } : g.type === "split" ? { ...g, children: g.children.map(n) } : g, d = n(e.root), s = w(d);
  return {
    ...e,
    root: s || B(),
    recentlyClosedTabs: i.slice(-10)
    // Keep last 10 closed tabs
  };
}, Q = (e, t, r) => {
  const o = (a) => a.id === t && a.type === "leaf" ? {
    ...a,
    tabs: [...a.tabs, r],
    activeTabId: r.id
  } : a.type === "split" ? { ...a, children: a.children.map(o) } : a;
  return {
    ...e,
    root: o(e.root),
    focusedLeafId: t
  };
}, M = (e, t, r, o, a) => {
  const l = P(e.root, t), p = P(e.root, r);
  if (!l || !p || l.type !== "leaf" || p.type !== "leaf")
    return e;
  const i = l.tabs.find((E) => E.id === o);
  if (!i) return e;
  const c = l.tabs.filter((E) => E.id !== o);
  let n = l.activeTabId;
  if (l.activeTabId === o && c.length > 0) {
    const E = l.tabs.findIndex((u) => u.id === o);
    E < c.length ? n = c[E].id : n = c[c.length - 1].id;
  }
  const d = a ?? p.tabs.length, s = Math.max(0, Math.min(d, p.tabs.length)), g = [...p.tabs];
  g.splice(s, 0, i), console.log("🚚 Move Tab:", {
    tabId: o,
    sourceLeafId: t,
    targetLeafId: r,
    requestedIndex: a,
    insertIndex: d,
    clampedInsertIndex: s,
    targetTabsLength: p.tabs.length,
    newTargetTabsLength: g.length
  });
  const m = (E) => E.id === t && E.type === "leaf" ? { ...E, tabs: c, activeTabId: n } : E.id === r && E.type === "leaf" ? { ...E, tabs: g, activeTabId: i.id } : E.type === "split" ? { ...E, children: E.children.map(m) } : E, D = m(e.root), y = w(D);
  return {
    ...e,
    root: y || B(),
    focusedLeafId: r
  };
}, W = (e, t, r, o = 0.5) => {
  const a = P(e.root, t);
  if (!a || a.type !== "leaf") return e;
  const p = {
    id: U(),
    type: "leaf",
    tabs: [],
    activeTabId: ""
  }, i = {
    id: U(),
    type: "split",
    orientation: r,
    children: [a, p],
    sizes: [o, 1 - o]
  }, c = (n) => n.id === t ? i : n.type === "split" ? { ...n, children: n.children.map(c) } : n;
  return e.root.id === t ? { ...e, root: i } : { ...e, root: c(e.root) };
}, ue = (e, t, r) => {
  const o = (a) => a.id === t && a.type === "split" ? { ...a, sizes: r } : a.type === "split" ? { ...a, children: a.children.map(o) } : a;
  return { ...e, root: o(e.root) };
}, fe = (e, t, r, o) => {
  const a = (l) => {
    if (l.id === t && l.type === "leaf") {
      const p = l.tabs.findIndex((d) => d.id === r);
      if (p === -1) return l;
      const i = [...l.tabs], [c] = i.splice(p, 1), n = Math.max(0, Math.min(o, i.length));
      return i.splice(n, 0, c), console.log("🔄 REORDER:", {
        tabId: r,
        from: p,
        to: n,
        originalTabs: l.tabs.map((d) => d.id),
        newTabs: i.map((d) => d.id)
      }), { ...l, tabs: i };
    }
    return l.type === "split" ? { ...l, children: l.children.map(a) } : l;
  };
  return { ...e, root: a(e.root) };
}, ge = (e) => {
  if (!e.recentlyClosedTabs || e.recentlyClosedTabs.length === 0)
    return e;
  const t = e.recentlyClosedTabs[e.recentlyClosedTabs.length - 1], r = e.recentlyClosedTabs.slice(0, -1), o = e.focusedLeafId || q(e.root);
  return o ? Q(
    { ...e, recentlyClosedTabs: r },
    o,
    t
  ) : e;
}, q = (e) => {
  if (e.type === "leaf") return e.id;
  if (e.type === "split")
    for (const t of e.children) {
      const r = q(t);
      if (r) return r;
    }
  return null;
}, B = () => ({
  id: U(),
  type: "leaf",
  tabs: [],
  activeTabId: ""
}), Te = (e, t) => {
  switch (t.type) {
    case R.ACTIVATE_TAB:
      return {
        ...e,
        panelState: de(
          e.panelState,
          t.payload.leafId,
          t.payload.tabId
        )
      };
    case R.CLOSE_TAB:
      return {
        ...e,
        panelState: pe(
          e.panelState,
          t.payload.leafId,
          t.payload.tabId
        )
      };
    case R.CREATE_TAB:
      return {
        ...e,
        panelState: Q(
          e.panelState,
          t.payload.leafId,
          t.payload.tab
        )
      };
    case R.MOVE_TAB:
      console.log("📢 REDUCER MOVE_TAB:", t.payload);
      const r = M(
        e.panelState,
        t.payload.sourceLeafId,
        t.payload.targetLeafId,
        t.payload.tabId,
        t.payload.targetIndex
      );
      return console.log("📢 REDUCER MOVE_TAB result:", {
        oldState: e.panelState,
        newState: r,
        changed: JSON.stringify(e.panelState) !== JSON.stringify(r)
      }), {
        ...e,
        panelState: r
      };
    case R.REORDER_TAB:
      console.log("📢 REDUCER REORDER_TAB:", t.payload);
      const o = fe(
        e.panelState,
        t.payload.leafId,
        t.payload.tabId,
        t.payload.newIndex
      );
      return console.log("📢 REDUCER REORDER_TAB result:", {
        oldState: e.panelState,
        newState: o,
        changed: JSON.stringify(e.panelState) !== JSON.stringify(o)
      }), {
        ...e,
        panelState: o
      };
    case R.SPLIT_PANEL:
      return {
        ...e,
        panelState: W(
          e.panelState,
          t.payload.leafId,
          t.payload.orientation,
          t.payload.ratio
        )
      };
    case R.CLOSE_PANEL: {
      const a = H(e.panelState.root, t.payload.panelId), l = a ? w(a) : null;
      return {
        ...e,
        panelState: {
          ...e.panelState,
          root: l || B()
        }
      };
    }
    case R.RESIZE_PANEL:
      return {
        ...e,
        panelState: ue(
          e.panelState,
          t.payload.panelId,
          t.payload.sizes
        )
      };
    case R.FOCUS_PANEL:
      return {
        ...e,
        panelState: {
          ...e.panelState,
          focusedLeafId: t.payload.leafId
        }
      };
    case R.START_DRAG:
      return {
        ...e,
        dragState: {
          isDragging: !0,
          draggedTabId: t.payload.tabId,
          sourceLeafId: t.payload.sourceLeafId
        }
      };
    case R.SET_DROP_TARGET:
      return {
        ...e,
        dragState: {
          ...e.dragState,
          dropTargetLeafId: t.payload.leafId,
          dropDirection: t.payload.direction,
          insertIndex: t.payload.insertIndex
        }
      };
    case R.END_DRAG:
      return {
        ...e,
        dragState: {
          isDragging: !1
        }
      };
    case R.EXECUTE_DROP: {
      const { dragState: a } = e;
      if (!a.isDragging || !a.draggedTabId || !a.sourceLeafId)
        return {
          ...e,
          dragState: { isDragging: !1 }
        };
      let l = e.panelState;
      if (a.dropTargetLeafId && a.dropDirection) {
        const p = a.dropDirection === "left" || a.dropDirection === "right" ? "horizontal" : "vertical", i = W(
          l,
          a.dropTargetLeafId,
          p,
          0.5
        );
        if (P(i.root, a.dropTargetLeafId)) {
          const n = j(i.root, a.dropTargetLeafId);
          if (n && n.parent.type === "split") {
            const d = n.parent.children.findIndex(
              (m) => m.id === a.dropTargetLeafId
            );
            let s;
            a.dropDirection === "right" || a.dropDirection === "bottom" ? s = d + 1 : s = d;
            const g = n.parent.children[s];
            g && g.type === "leaf" && (l = M(
              i,
              a.sourceLeafId,
              g.id,
              a.draggedTabId
            ));
          }
        }
      } else a.dropTargetLeafId && (l = M(
        l,
        a.sourceLeafId,
        a.dropTargetLeafId,
        a.draggedTabId,
        a.insertIndex
      ));
      return {
        ...e,
        panelState: l,
        dragState: { isDragging: !1 }
      };
    }
    case R.PRUNE_EMPTY_NODES: {
      const a = w(e.panelState.root);
      return {
        ...e,
        panelState: {
          ...e.panelState,
          root: a || B()
        }
      };
    }
    case R.RESTORE_TAB:
      return {
        ...e,
        panelState: ge(e.panelState)
      };
    case R.SET_STATE:
      return {
        ...e,
        panelState: t.payload.state
      };
    default:
      return e;
  }
}, be = (e) => {
  const t = {
    root: B(),
    pruneEmptyPanel: !0,
    recentlyClosedTabs: []
  };
  return {
    panelState: e || t,
    dragState: {
      isDragging: !1
    }
  };
}, ee = re(null), A = () => {
  const e = oe(ee);
  if (!e)
    throw new Error("usePanelContext must be used within a PanelProvider");
  return e;
}, De = {
  pruneEmptyGroups: !0,
  enableTabDrag: !0,
  enablePanelSplit: !0,
  enableTabReorder: !0,
  minPanelSize: 100,
  splitterSize: 4,
  showCloseButton: !0,
  maxTabWidth: 200,
  minTabWidth: 80,
  enableKeyboardShortcuts: !0,
  keyBindings: {
    closeTab: ["Ctrl+W", "Cmd+W"],
    newTab: ["Ctrl+T", "Cmd+T"],
    nextTab: ["Ctrl+Tab", "Cmd+Option+ArrowRight"],
    prevTab: ["Ctrl+Shift+Tab", "Cmd+Option+ArrowLeft"],
    splitRight: ["Ctrl+\\", "Cmd+\\"],
    splitDown: ["Ctrl+K Ctrl+\\", "Cmd+K Cmd+\\"],
    focusGroup: ["Ctrl+1", "Cmd+1"],
    moveTabRight: ["Ctrl+Alt+ArrowRight", "Cmd+Ctrl+ArrowRight"],
    moveTabLeft: ["Ctrl+Alt+ArrowLeft", "Cmd+Ctrl+ArrowLeft"]
  }
}, Ee = ({
  children: e,
  value: t,
  defaultValue: r,
  onChange: o,
  options: a = {}
}) => {
  const l = N(
    () => ({ ...De, ...a }),
    [a]
  ), [p, i] = le(
    Te,
    be(t || r)
  ), c = t || p.panelState, n = p.dragState, d = x.useRef(p.panelState);
  x.useEffect(() => {
    o && JSON.stringify(d.current) !== JSON.stringify(p.panelState) && (d.current = p.panelState, o(p.panelState));
  }, [p.panelState, o]);
  const s = N(() => ce(i), [i]), g = b((h, v) => {
    s.activateTab(h, v);
  }, [s]), m = b((h, v) => {
    s.closeTab(h, v);
  }, [s]), D = b((h, v) => {
    v && s.createTab(h, v);
  }, [s]), y = b((h, v, I, J) => {
    console.log("🚚 CONTEXT moveTab called:", { sourceLeafId: h, targetLeafId: v, tabId: I, targetIndex: J }), s.moveTab(h, v, I, J);
  }, [s]), E = b((h, v, I) => {
    console.log("🔄 CONTEXT reorderTab called:", { leafId: h, tabId: v, newIndex: I }), s.reorderTab(h, v, I);
  }, [s]), u = b((h, v, I) => {
    s.splitPanel(h, v, I);
  }, [s]), T = b((h) => {
    s.closePanel(h);
  }, [s]), C = b((h, v) => {
    s.resizePanel(h, v);
  }, [s]), Z = b((h) => {
    s.focusPanel(h);
  }, [s]), L = b((h, v) => {
    console.log("🚀 CONTEXT startDrag called:", { tabId: h, sourceLeafId: v, enableTabDrag: l.enableTabDrag }), l.enableTabDrag ? s.startDrag(h, v) : console.log("❌ Tab drag disabled in options");
  }, [s, l.enableTabDrag]), K = b((h, v, I) => {
    s.setDropTarget(h, v, I);
  }, [s]), k = b(() => {
    s.endDrag();
  }, [s]), V = b(() => {
    s.executeDrop();
  }, [s]), F = b(() => {
    l.pruneEmptyGroups && s.pruneEmptyNodes();
  }, [s, l.pruneEmptyGroups]), X = b(() => {
    s.restoreTab();
  }, [s]), Y = N(() => ({
    activateTab: g,
    closeTab: m,
    createTab: D,
    moveTab: y,
    reorderTab: E,
    splitPanel: u,
    closePanel: T,
    resizePanel: C,
    focusPanel: Z,
    startDrag: L,
    setDropTarget: K,
    endDrag: k,
    executeDrop: V,
    pruneEmptyNodes: F,
    restoreTab: X
  }), [
    g,
    m,
    D,
    y,
    E,
    u,
    T,
    C,
    Z,
    L,
    K,
    k,
    V,
    F,
    X
  ]), ae = N(
    () => ({
      state: c,
      dragState: n,
      actions: Y,
      options: l
    }),
    [c, n, Y, l]
  );
  return /* @__PURE__ */ S(ee.Provider, { value: ae, children: e });
}, Se = () => {
  const { state: e } = A();
  return e;
}, z = () => {
  const { dragState: e } = A();
  return e;
}, $ = () => {
  const { actions: e } = A();
  return e;
}, he = () => {
  const { options: e } = A();
  return e;
}, it = (e) => {
  const { actions: t } = A();
  return N(() => ({
    activateTab: (r) => t.activateTab(e, r),
    closeTab: (r) => t.closeTab(e, r),
    createTab: (r) => t.createTab(e, r),
    reorderTab: (r, o) => t.reorderTab(e, r, o)
  }), [t, e]);
}, ct = (e) => {
  const { actions: t } = A();
  return N(() => ({
    splitPanel: (r, o) => t.splitPanel(e, r, o),
    closePanel: () => t.closePanel(e),
    focusPanel: () => t.focusPanel(e)
  }), [t, e]);
}, dt = () => {
  const { actions: e } = A();
  return N(() => ({
    startDrag: e.startDrag,
    setDropTarget: e.setDropTarget,
    endDrag: e.endDrag,
    executeDrop: e.executeDrop
  }), [e]);
}, ve = "xtnpnlpnl", me = "xtnpnlpnlcnt", ye = "xtnpnlsplitcnt", Re = "xtnpnlpnlChild", Ce = "xtnpnlsplitter", Le = "xtnpnlvtspl", Ie = "xtnpnlhzspl", xe = "xtnpnlspl", Ae = "xtnpnlleafcnt", Ne = "xtnpnldrotar", Oe = "xtnpnltabBar", Pe = "xtnpnltabs", _e = "xtnpnltab", we = "xtnpnlactTab", Be = "xtnpnltabdrg", Ze = "xtnpnltabdraove", ze = "xtnpnltabdrozon", $e = "xtnpnltabTitle", Me = "xtnpnltab4wP", Ue = "xtnpnlnewtab", Ge = "xtnpnltabctn", Ke = "xtnpnldrozonlay", ke = "xtnpnldragact", Ve = "xtnpnldropZone", Fe = "xtnpnlact", Xe = "xtnpnldrozonlef", Ye = "xtnpnldrozonrig", Je = "xtnpnldrozontop", We = "xtnpnldrozonbot", je = "xtnpnldrozoncen", He = "xtnpnldrg", Qe = "xtnpnlresizing", f = {
  panel: ve,
  panelContainer: me,
  splitContainer: ye,
  panelChild: Re,
  splitter: Ce,
  verticalSplitter: Le,
  horizontalSplitter: Ie,
  splitterDragging: xe,
  leafContainer: Ae,
  dropTarget: Ne,
  tabBar: Oe,
  tabs: Pe,
  tab: _e,
  activeTab: we,
  tabDragging: Be,
  tabDragOver: Ze,
  tabDropZone: ze,
  tabTitle: $e,
  tabCloseButton: Me,
  newTabButton: Ue,
  tabContent: Ge,
  dropZoneLayer: Ke,
  dragActive: ke,
  dropZone: Ve,
  active: Fe,
  dropZoneLeft: Xe,
  dropZoneRight: Ye,
  dropZoneTop: Je,
  dropZoneBottom: We,
  dropZoneCenter: je,
  dragging: He,
  resizing: Qe
}, pt = ({
  value: e,
  defaultValue: t,
  onChange: r,
  style: o,
  className: a,
  children: l,
  onRequestTabCreate: p,
  onTabClose: i,
  onTabMove: c,
  onPanelSplit: n,
  onPanelClose: d,
  renderTabBar: s,
  renderSplitter: g,
  renderDropZone: m,
  options: D
}) => /* @__PURE__ */ S(
  Ee,
  {
    value: e,
    defaultValue: t,
    onChange: r,
    options: D,
    children: /* @__PURE__ */ S("div", { className: `${f.panel} ${a || ""}`, style: o, children: /* @__PURE__ */ S(
      qe,
      {
        children: l,
        onRequestTabCreate: p,
        onTabClose: i,
        onTabMove: c,
        onPanelSplit: n,
        onPanelClose: d,
        renderTabBar: s,
        renderSplitter: g,
        renderDropZone: m
      }
    ) })
  }
), qe = (e) => {
  const { state: t } = A(), r = z();
  return /* @__PURE__ */ S("div", { className: `${f.panelContainer} ${r.isDragging ? f.dragActive : ""}`, children: /* @__PURE__ */ S(te, { node: t.root, ...e }) });
}, te = x.memo(({ node: e, ...t }) => e.type === "split" ? /* @__PURE__ */ S(et, { node: e, ...t }) : /* @__PURE__ */ S(tt, { node: e, ...t })), et = x.memo(({
  node: e,
  renderSplitter: t,
  ...r
}) => {
  const o = $(), [a, l] = _(!1), p = se(null), i = b(
    (n, d) => {
      if (!p.current) return;
      const s = e.orientation === "horizontal" ? p.current.offsetWidth : p.current.offsetHeight, g = [...e.sizes], m = g.reduce((T, C) => T + C, 0), D = g.map((T) => T / m * s);
      D[n] += d, D[n + 1] -= d;
      const y = 50;
      if (D[n] < y) {
        const T = y - D[n];
        D[n] = y, D[n + 1] -= T;
      }
      if (D[n + 1] < y) {
        const T = y - D[n + 1];
        D[n + 1] = y, D[n] -= T;
      }
      const E = D.reduce((T, C) => T + C, 0), u = D.map((T) => T / E);
      o.resizePanel(e.id, u);
    },
    [e.id, e.orientation, e.sizes, o]
  ), c = {
    display: "flex",
    flexDirection: e.orientation === "horizontal" ? "row" : "column",
    width: "100%",
    height: "100%"
  };
  return /* @__PURE__ */ S("div", { ref: p, className: f.splitContainer, style: c, children: e.children.map((n, d) => /* @__PURE__ */ O(x.Fragment, { children: [
    /* @__PURE__ */ S(
      "div",
      {
        className: f.panelChild,
        style: {
          flex: e.sizes[d] || 1,
          minWidth: e.orientation === "horizontal" ? "50px" : void 0,
          minHeight: e.orientation === "vertical" ? "50px" : void 0
        },
        children: /* @__PURE__ */ S(te, { node: n, ...r })
      }
    ),
    d < e.children.length - 1 && /* @__PURE__ */ S(
      nt,
      {
        orientation: e.orientation,
        onResize: (s) => i(d, s),
        onResizeStart: () => l(!0),
        onResizeEnd: () => l(!1),
        isResizing: a,
        renderSplitter: t
      }
    )
  ] }, n.id)) });
}), tt = x.memo(({
  node: e,
  children: t,
  onRequestTabCreate: r,
  onTabClose: o,
  onTabMove: a,
  renderTabBar: l,
  ...p
}) => {
  const i = $(), c = z(), n = e.tabs.find((u) => u.id === e.activeTabId), d = b(
    (u) => {
      i.activateTab(e.id, u);
    },
    [i, e.id]
  ), s = b(
    (u) => {
      (o ? o(u, e.id) : !0) !== !1 && i.closeTab(e.id, u);
    },
    [i, e.id, o]
  ), g = b(() => {
    if (r) {
      const u = r(e.id);
      u && i.createTab(e.id, u);
    }
  }, [i, e.id, r]), m = b(
    (u, T) => {
      console.log("🚀 Tab Drag Start:", { tabId: u, leafId: e.id }), T.dataTransfer.effectAllowed = "move", T.dataTransfer.setData("text/tab-id", u), i.startDrag(u, e.id);
    },
    [i, e.id]
  ), D = b(() => {
    console.log("🏁 Tab Drag End - Scheduling cleanup"), setTimeout(() => {
      console.log("🧹 Executing endDrag cleanup"), i.endDrag();
    }, 200);
  }, [i]), y = b(
    (u, T) => {
      if (console.log("📍 LEAF DROP:", {
        draggedTabId: u,
        index: T,
        sourceLeaf: c.sourceLeafId,
        targetLeaf: e.id,
        currentDragState: c
      }), !u || !c.sourceLeafId) {
        console.log("❌ Missing essential data:", { draggedTabId: u, sourceLeafId: c.sourceLeafId });
        return;
      }
      console.log("✅ Proceeding with drop execution"), c.sourceLeafId === e.id ? (console.log("🔄 REORDER in same panel"), i.reorderTab(e.id, u, T)) : (console.log("🚚 MOVE to different panel"), (a ? a(u, c.sourceLeafId, e.id, T) : !0) !== !1 && i.moveTab(c.sourceLeafId, e.id, u, T));
    },
    [i, e.id, c, a]
  ), E = c.dropTargetLeafId === e.id;
  return /* @__PURE__ */ O("div", { className: `${f.leafContainer} ${E ? f.dropTarget : ""} ${c.isDragging ? f.dragging : ""}`, children: [
    /* @__PURE__ */ S(rt, { leafId: e.id }),
    l ? l({
      leafId: e.id,
      tabs: e.tabs,
      activeTabId: e.activeTabId,
      onTabClick: d,
      onTabClose: s,
      onTabDragStart: m,
      onTabDragEnd: D,
      onTabDrop: y,
      onNewTab: g,
      isDropTarget: E
    }) : /* @__PURE__ */ S(
      at,
      {
        leafId: e.id,
        tabs: e.tabs,
        activeTabId: e.activeTabId,
        onTabClick: d,
        onTabClose: s,
        onTabDragStart: m,
        onTabDragEnd: D,
        onTabDrop: y,
        onNewTab: g,
        isDropTarget: E
      }
    ),
    /* @__PURE__ */ S("div", { className: f.tabContent, children: n && t(n) })
  ] });
}), at = x.memo(({
  tabs: e,
  activeTabId: t,
  onTabClick: r,
  onTabClose: o,
  onTabDragStart: a,
  onTabDragEnd: l,
  onTabDrop: p,
  onNewTab: i,
  isDropTarget: c
}) => {
  const [n, d] = _(null), s = z(), g = b((u, T) => {
    console.log("🎯 START Drag:", { tabId: T }), u.dataTransfer.effectAllowed = "move", u.dataTransfer.setData("text/tab-id", T), a(T, u);
  }, [a]), m = b(() => {
    console.log("🏁 DefaultTabBar END Drag - clearing UI state only"), d(null), setTimeout(() => {
      console.log("🏁 DefaultTabBar calling onTabDragEnd"), l();
    }, 50);
  }, [l]), D = b((u, T) => {
    u.preventDefault(), u.dataTransfer.dropEffect = "move", d(T), console.log("🎯 OVER:", T);
  }, []), y = b(() => {
    d(null);
  }, []), E = b((u, T) => {
    u.preventDefault(), u.stopPropagation();
    const C = u.dataTransfer.getData("text/tab-id");
    console.log("💧 TabBar DROP:", { draggedTabId: C, dropIndex: T, isDragging: s.isDragging }), C ? (console.log("🚀 Executing tab drop immediately"), p(C, T)) : console.log("❌ No dragged tab ID found"), d(null);
  }, [p, s.isDragging]);
  return /* @__PURE__ */ O("div", { className: `${f.tabBar} ${c ? f.dropTarget : ""}`, children: [
    /* @__PURE__ */ O("div", { className: f.tabs, children: [
      e.map((u, T) => {
        const C = s.isDragging && s.draggedTabId === u.id, Z = n === T;
        return /* @__PURE__ */ O(
          "div",
          {
            className: `${f.tab} ${u.id === t ? f.activeTab : ""} ${C ? f.tabDragging : ""} ${Z ? f.tabDragOver : ""}`,
            draggable: !0,
            onDragStart: (L) => g(L, u.id),
            onDragEnd: m,
            onDragOver: (L) => D(L, T),
            onDragLeave: y,
            onDrop: (L) => E(L, T),
            onClick: () => r(u.id),
            children: [
              /* @__PURE__ */ S("span", { className: f.tabTitle, children: u.title }),
              u.isClosable !== !1 && /* @__PURE__ */ S(
                "button",
                {
                  className: f.tabCloseButton,
                  onClick: (L) => {
                    L.stopPropagation(), o(u.id);
                  },
                  children: "×"
                }
              )
            ]
          },
          u.id
        );
      }),
      /* @__PURE__ */ S(
        "div",
        {
          className: `${f.tabDropZone} ${n === e.length ? f.tabDragOver : ""}`,
          onDragOver: (u) => D(u, e.length),
          onDragLeave: y,
          onDrop: (u) => E(u, e.length)
        }
      )
    ] }),
    /* @__PURE__ */ S("button", { className: f.newTabButton, onClick: i, children: "+" })
  ] });
}), nt = x.memo(({
  orientation: e,
  onResize: t,
  onResizeStart: r,
  onResizeEnd: o,
  isResizing: a,
  renderSplitter: l
}) => {
  const [p, i] = _(!1), [c, n] = _({ x: 0, y: 0 }), d = b(
    (s) => {
      i(!0), n({ x: s.clientX, y: s.clientY }), r();
      const g = (D) => {
        const y = e === "horizontal" ? D.clientX - c.x : D.clientY - c.y;
        t(y), n({ x: D.clientX, y: D.clientY });
      }, m = () => {
        i(!1), o(), document.removeEventListener("mousemove", g), document.removeEventListener("mouseup", m);
      };
      document.addEventListener("mousemove", g), document.addEventListener("mouseup", m);
    },
    [e, t, r, o, c]
  );
  return l ? l({
    orientation: e,
    onResize: t,
    onResizeStart: r,
    onResizeEnd: o,
    isResizing: a
  }) : /* @__PURE__ */ S(
    "div",
    {
      className: `${f.splitter} ${e === "horizontal" ? f.verticalSplitter : f.horizontalSplitter} ${p ? f.splitterDragging : ""}`,
      onMouseDown: d
    }
  );
}), rt = x.memo(({ leafId: e }) => {
  const t = z(), r = $(), [o, a] = _(null), l = b(
    (n) => {
      console.log("💧 DropZone Drop:", { leafId: e, direction: n, dragState: t }), r.setDropTarget(e, n), r.executeDrop(), a(null);
    },
    [r, e, t]
  ), p = b((n) => {
    t.sourceLeafId !== e ? (console.log("🔥 DropZone activated:", { zone: n, leafId: e, sourceLeafId: t.sourceLeafId }), a(n)) : console.log("🚫 DropZone ignored (same panel):", { zone: n, leafId: e });
  }, [t.sourceLeafId, e]), i = b(() => {
    a(null);
  }, []);
  return t.isDragging ? t.sourceLeafId === e ? (console.log("🚫 DropZone hidden for same panel operation"), null) : /* @__PURE__ */ S("div", { className: f.dropZoneLayer, children: /* @__PURE__ */ O(ne, { children: [
    /* @__PURE__ */ S(
      "div",
      {
        className: `${f.dropZone} ${f.dropZoneLeft} ${o === "left" ? f.active : ""}`,
        onDragOver: (n) => n.preventDefault(),
        onDragEnter: () => p("left"),
        onDragLeave: i,
        onDrop: (n) => {
          n.preventDefault(), n.dataTransfer.getData("text/tab-id") && l("left");
        }
      }
    ),
    /* @__PURE__ */ S(
      "div",
      {
        className: `${f.dropZone} ${f.dropZoneRight} ${o === "right" ? f.active : ""}`,
        onDragOver: (n) => n.preventDefault(),
        onDragEnter: () => p("right"),
        onDragLeave: i,
        onDrop: (n) => {
          n.preventDefault(), n.dataTransfer.getData("text/tab-id") && l("right");
        }
      }
    ),
    /* @__PURE__ */ S(
      "div",
      {
        className: `${f.dropZone} ${f.dropZoneTop} ${o === "top" ? f.active : ""}`,
        onDragOver: (n) => n.preventDefault(),
        onDragEnter: () => p("top"),
        onDragLeave: i,
        onDrop: (n) => {
          n.preventDefault(), n.dataTransfer.getData("text/tab-id") && l("top");
        }
      }
    ),
    /* @__PURE__ */ S(
      "div",
      {
        className: `${f.dropZone} ${f.dropZoneBottom} ${o === "bottom" ? f.active : ""}`,
        onDragOver: (n) => n.preventDefault(),
        onDragEnter: () => p("bottom"),
        onDragLeave: i,
        onDrop: (n) => {
          n.preventDefault(), n.dataTransfer.getData("text/tab-id") && l("bottom");
        }
      }
    ),
    /* @__PURE__ */ S(
      "div",
      {
        className: `${f.dropZone} ${f.dropZoneCenter} ${o === "center" ? f.active : ""}`,
        onDragOver: (n) => n.preventDefault(),
        onDragEnter: () => p("center"),
        onDragLeave: i,
        onDrop: (n) => {
          n.preventDefault(), n.dataTransfer.getData("text/tab-id") && l();
        }
      }
    )
  ] }) }) : null;
}), G = (e) => e.type === "leaf" ? [e] : e.children.flatMap(G), ot = (e, t) => {
  if (!t) return null;
  const r = (o) => {
    if (o.type === "leaf" && o.id === t)
      return o;
    if (o.type === "split")
      for (const a of o.children) {
        const l = r(a);
        if (l) return l;
      }
    return null;
  };
  return r(e);
}, ut = () => {
  const e = Se(), t = $(), r = he(), o = b((a) => {
    if (!r.enableKeyboardShortcuts) return;
    const l = a.ctrlKey || a.metaKey, p = a.shiftKey, i = a.key, c = ot(e.root, e.focusedLeafId);
    if (c) {
      if (l && i === "w" && !p) {
        a.preventDefault(), c.activeTabId && t.closeTab(c.id, c.activeTabId);
        return;
      }
      if (l && i === "t" && !p) {
        a.preventDefault(), t.focusPanel(c.id);
        return;
      }
      if (l && i === "\\" && !p) {
        a.preventDefault(), t.splitPanel(c.id, "horizontal");
        return;
      }
      if (l && i === "Tab") {
        a.preventDefault();
        const n = c.tabs.findIndex(
          (d) => d.id === c.activeTabId
        );
        if (n !== -1) {
          let d;
          p ? d = n === 0 ? c.tabs.length - 1 : n - 1 : d = n === c.tabs.length - 1 ? 0 : n + 1;
          const s = c.tabs[d];
          s && t.activateTab(c.id, s.id);
        }
        return;
      }
      if (l && (i === "PageUp" || i === "PageDown")) {
        a.preventDefault();
        const n = c.tabs.findIndex(
          (d) => d.id === c.activeTabId
        );
        if (n !== -1) {
          let d;
          i === "PageUp" ? d = n === 0 ? c.tabs.length - 1 : n - 1 : d = n === c.tabs.length - 1 ? 0 : n + 1;
          const s = c.tabs[d];
          s && t.activateTab(c.id, s.id);
        }
        return;
      }
      if (l && i >= "1" && i <= "9") {
        a.preventDefault();
        const n = parseInt(i) - 1, d = c.tabs[n];
        d && t.activateTab(c.id, d.id);
        return;
      }
      if (!(l && i === "k")) {
        if (l && p && i === "t") {
          a.preventDefault(), t.restoreTab();
          return;
        }
        if (l && a.altKey && (i === "ArrowLeft" || i === "ArrowRight")) {
          if (a.preventDefault(), !c.activeTabId) return;
          const n = G(e.root), d = n.findIndex((s) => s.id === c.id);
          if (d !== -1) {
            let s;
            i === "ArrowRight" ? s = d === n.length - 1 ? 0 : d + 1 : s = d === 0 ? n.length - 1 : d - 1;
            const g = n[s];
            g && g.id !== c.id && t.moveTab(
              c.id,
              g.id,
              c.activeTabId
            );
          }
          return;
        }
        if (l && !p && !a.altKey && i >= "1" && i <= "3") {
          a.preventDefault();
          const n = G(e.root), d = parseInt(i) - 1, s = n[d];
          s && t.focusPanel(s.id);
          return;
        }
      }
    }
  }, [e, t, r.enableKeyboardShortcuts]);
  ie(() => {
    if (r.enableKeyboardShortcuts)
      return document.addEventListener("keydown", o), () => {
        document.removeEventListener("keydown", o);
      };
  }, [o, r.enableKeyboardShortcuts]);
};
export {
  pt as Panel,
  R as PanelActionType,
  Ee as PanelProvider,
  be as createInitialState,
  ce as createPanelActions,
  Te as panelReducer,
  dt as useDragOperations,
  z as useDragState,
  ut as useKeyboardShortcuts,
  $ as usePanelActions,
  A as usePanelContext,
  ct as usePanelOperations,
  he as usePanelOptions,
  Se as usePanelState,
  it as useTabOperations
};
