var hn = Object.defineProperty;
var fn = (e, t, n) => t in e ? hn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var he = (e, t, n) => fn(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as l, jsxs as w, Fragment as le } from "react/jsx-runtime";
import * as d from "react";
import gn from "react";
const ze = ({
  variant: e = "primary",
  size: t = "medium",
  className: n = "",
  children: o,
  ...s
}) => {
  const r = "ne-button", i = `ne-button--${e}`, a = `ne-button--${t}`, c = [r, i, a, n].filter(Boolean).join(" ");
  return /* @__PURE__ */ l("button", { className: c, ...s, children: o });
}, Ce = ({
  error: e = !1,
  variant: t = "default",
  className: n = "",
  ...o
}) => {
  const s = "ne-input", r = `ne-input--${t}`, a = [s, r, e ? "ne-input--error" : "", n].filter(Boolean).join(" ");
  return /* @__PURE__ */ l("input", { className: a, ...o });
}, ge = ({
  required: e = !1,
  disabled: t = !1,
  className: n = "",
  children: o,
  ...s
}) => {
  const a = ["ne-label", t ? "ne-label--disabled" : "", n].filter(Boolean).join(" ");
  return /* @__PURE__ */ w("label", { className: a, ...s, children: [
    o,
    e && /* @__PURE__ */ l("span", { className: "ne-label__required", children: "*" })
  ] });
}, mn = ({
  error: e = !1,
  variant: t = "default",
  resize: n = "vertical",
  className: o = "",
  ...s
}) => {
  const r = "ne-textarea", i = `ne-textarea--${t}`, a = e ? "ne-textarea--error" : "", c = `ne-textarea--resize-${n}`, u = [r, i, a, c, o].filter(Boolean).join(" ");
  return /* @__PURE__ */ l("textarea", { className: u, ...s });
}, yn = ({
  level: e = 1,
  size: t,
  weight: n = "semibold",
  color: o = "primary",
  className: s = "",
  children: r,
  ...i
}) => {
  const a = `h${e}`, c = "ne-heading", u = `ne-heading--h${e}`, p = t ? `ne-heading--${t}` : "", h = `ne-heading--${n}`, v = `ne-heading--${o}`, y = [c, u, p, h, v, s].filter(Boolean).join(" ");
  return /* @__PURE__ */ l(a, { className: y, ...i, children: r });
}, Ge = (e) => /* @__PURE__ */ l(yn, { level: 4, ...e }), q = (e, t = "0 0 24 24") => gn.forwardRef(({
  size: n = 16,
  color: o = "currentColor",
  className: s = "",
  ...r
}, i) => /* @__PURE__ */ l(
  "svg",
  {
    ref: i,
    className: `ne-icon ${s}`,
    width: n,
    height: n,
    viewBox: t,
    fill: "none",
    stroke: o,
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...r,
    children: typeof e == "string" ? /* @__PURE__ */ l("path", { d: e }) : e
  }
)), vn = q(
  "M17 10H3M21 6H3M21 14H3M17 18H3"
), bn = q(
  "M18 10H6M21 6H3M21 14H3M18 18H6"
), xn = q(
  "M21 10H7M21 6H3M21 14H3M21 18H7"
), Nn = q(
  "M3 3H21M8 8V21M16 8V21M12 8V21"
), Cn = q(
  "M3 12H21M8 3V21M16 3V21M12 3V21"
), Sn = q(
  "M3 21H21M8 3V16M16 3V16M12 3V16"
), En = q(
  "M3 3V21M21 3V21M8 6H16M8 12H16M8 18H16"
), wn = q(
  "M3 3H21M3 21H21M6 8V16M12 8V16M18 8V16"
), In = q(
  "M18 6L6 18M6 6L18 18"
);
q(
  "M20 6L9 17L4 12"
);
q(
  "M6 9L12 15L18 9"
);
q(
  "M18 15L12 9L6 15"
);
q(
  "M15 18L9 12L15 6"
);
q(
  "M9 18L15 12L9 6"
);
q(
  "M12 5V19M5 12H19"
);
q(
  "M5 12H19"
);
q(
  "M11 4H4A2 2 0 0 0 2 6V18A2 2 0 0 0 4 20H16A2 2 0 0 0 18 18V11M18.5 2.5A2.121 2.121 0 0 1 21 5L5.5 20.5L2 22L3.5 18.5L18.5 2.5Z"
);
q(
  "M3 6H5H21M8 6V4A2 2 0 0 1 10 2H14A2 2 0 0 1 16 4V6M19 6V20A2 2 0 0 1 17 22H7A2 2 0 0 1 5 20V6H19Z"
);
q(
  "M21 21L16.514 16.506L21 21ZM18 10.5A7.5 7.5 0 1 1 3 10.5A7.5 7.5 0 0 1 18 10.5Z"
);
q(
  "M12 15A3 3 0 1 0 12 9A3 3 0 0 0 12 15ZM19.4 15A1.65 1.65 0 0 0 19.04 13.36L20.55 12L19.04 10.64A1.65 1.65 0 0 0 19.4 9L18.76 7.4A1.65 1.65 0 0 0 17.45 6.63L15.55 7.1A7.1 7.1 0 0 0 14.12 6.16L13.91 4.23A1.65 1.65 0 0 0 12.29 3H11.71A1.65 1.65 0 0 0 10.09 4.23L9.88 6.16A7.1 7.1 0 0 0 8.45 7.1L6.55 6.63A1.65 1.65 0 0 0 5.24 7.4L4.6 9A1.65 1.65 0 0 0 4.96 10.64L3.45 12L4.96 13.36A1.65 1.65 0 0 0 4.6 15L5.24 16.6A1.65 1.65 0 0 0 6.55 17.37L8.45 16.9A7.1 7.1 0 0 0 9.88 17.84L10.09 19.77A1.65 1.65 0 0 0 11.71 21H12.29A1.65 1.65 0 0 0 13.91 19.77L14.12 17.84A7.1 7.1 0 0 0 15.55 16.9L17.45 17.37A1.65 1.65 0 0 0 18.76 16.6L19.4 15Z"
);
function Y(...e) {
  const t = [];
  for (const n of e) {
    if (!n) continue;
    const o = typeof n;
    if (o === "string" || o === "number")
      t.push(String(n));
    else if (Array.isArray(n)) {
      const s = Y(...n);
      s && t.push(s);
    } else if (o === "object") {
      const s = n;
      for (const r in s)
        s[r] && t.push(r);
    }
  }
  return t.join(" ");
}
function Dn() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    scrollX: window.scrollX,
    scrollY: window.scrollY
  };
}
function Pn(e, t, n, o, s) {
  let r = e, i = t;
  return e + n > s.width && (r = Math.max(0, s.width - n)), t + o > s.height && (i = Math.max(0, s.height - o)), r < 0 && (r = 0), i < 0 && (i = 0), {
    x: r,
    y: i
  };
}
const ot = (e) => {
  const t = [];
  return e.ctrl && t.push("ctrl"), e.shift && t.push("shift"), e.alt && t.push("alt"), e.meta && t.push("meta"), t.push(e.key.toLowerCase()), t.join("+");
}, kn = (e, t) => e.key.toLowerCase() === t.key.toLowerCase() && !!e.ctrlKey == !!t.ctrl && !!e.shiftKey == !!t.shift && !!e.altKey == !!t.alt && !!e.metaKey == !!t.meta, Mn = (e, t) => {
  switch (t.type) {
    case "REGISTER_SHORTCUT": {
      const n = ot(t.payload.shortcut), o = new Map(e.shortcuts);
      return o.set(n, t.payload.handler), {
        ...e,
        shortcuts: o
      };
    }
    case "UNREGISTER_SHORTCUT": {
      const n = ot(t.payload.shortcut), o = new Map(e.shortcuts);
      return o.delete(n), {
        ...e,
        shortcuts: o
      };
    }
    case "ENABLE_SHORTCUTS":
      return {
        ...e,
        isEnabled: !0
      };
    case "DISABLE_SHORTCUTS":
      return {
        ...e,
        isEnabled: !1
      };
    default:
      return e;
  }
}, Tn = {
  shortcuts: /* @__PURE__ */ new Map(),
  isEnabled: !0
}, Xe = {
  registerShortcut: (e, t) => ({
    type: "REGISTER_SHORTCUT",
    payload: { shortcut: e, handler: t }
  }),
  unregisterShortcut: (e) => ({
    type: "UNREGISTER_SHORTCUT",
    payload: { shortcut: e }
  }),
  enableShortcuts: () => ({
    type: "ENABLE_SHORTCUTS"
  }),
  disableShortcuts: () => ({
    type: "DISABLE_SHORTCUTS"
  })
}, bt = d.createContext(null), On = ({
  children: e,
  initialState: t
}) => {
  const [n, o] = d.useReducer(
    Mn,
    { ...Tn, ...t }
  );
  d.useEffect(() => {
    const a = (c) => {
      if (!n.isEnabled) return;
      const u = c.target;
      if (!(u.tagName === "INPUT" || u.tagName === "TEXTAREA" || u.isContentEditable))
        for (const [p, h] of n.shortcuts) {
          const v = p.split("+"), y = v[v.length - 1], b = v.slice(0, -1), f = {
            key: y,
            ctrl: b.includes("ctrl"),
            shift: b.includes("shift"),
            alt: b.includes("alt"),
            meta: b.includes("meta")
          };
          if (kn(c, f)) {
            c.preventDefault(), c.stopPropagation(), h(c);
            break;
          }
        }
    };
    return document.addEventListener("keydown", a), () => document.removeEventListener("keydown", a);
  }, [n.shortcuts, n.isEnabled]);
  const s = d.useCallback(
    (a, c) => {
      o(Xe.registerShortcut(a, c));
    },
    [o]
  ), r = d.useCallback(
    (a) => {
      o(Xe.unregisterShortcut(a));
    },
    [o]
  ), i = {
    state: n,
    dispatch: o,
    actions: Xe,
    registerShortcut: s,
    unregisterShortcut: r
  };
  return /* @__PURE__ */ l(bt.Provider, { value: i, children: e });
}, An = () => {
  const e = d.useContext(bt);
  if (!e)
    throw new Error("useKeyboardShortcut must be used within a KeyboardShortcutProvider");
  return e;
}, ce = (e, t, n = []) => {
  const { registerShortcut: o, unregisterShortcut: s } = An();
  d.useEffect(() => (o(e, t), () => s(e)), [o, s, ...n]);
}, zn = (e, t) => {
  switch (t.type) {
    case "SET_VIEWPORT":
      return {
        ...e,
        viewport: t.payload.viewport
      };
    case "PAN_VIEWPORT": {
      const { delta: n } = t.payload;
      return {
        ...e,
        viewport: {
          ...e.viewport,
          offset: {
            x: e.viewport.offset.x + n.x,
            y: e.viewport.offset.y + n.y
          }
        }
      };
    }
    case "ZOOM_VIEWPORT": {
      const { scale: n, center: o } = t.payload, s = Math.max(0.01, Math.min(64, n));
      if (o) {
        const r = s / e.viewport.scale, i = {
          x: o.x - (o.x - e.viewport.offset.x) * r,
          y: o.y - (o.y - e.viewport.offset.y) * r
        };
        return {
          ...e,
          viewport: {
            offset: i,
            scale: s
          }
        };
      }
      return {
        ...e,
        viewport: {
          ...e.viewport,
          scale: s
        }
      };
    }
    case "RESET_VIEWPORT":
      return {
        ...e,
        viewport: {
          offset: { x: 0, y: 0 },
          scale: 1
        }
      };
    case "UPDATE_GRID_SETTINGS":
      return {
        ...e,
        gridSettings: {
          ...e.gridSettings,
          ...t.payload.settings
        }
      };
    case "SET_SPACE_PANNING":
      return {
        ...e,
        isSpacePanning: t.payload.isSpacePanning
      };
    case "START_PAN":
      return {
        ...e,
        panState: {
          isPanning: !0,
          startPosition: t.payload.position
        }
      };
    case "UPDATE_PAN": {
      if (!e.panState.isPanning || !e.panState.startPosition) return e;
      const n = t.payload.position.x - e.panState.startPosition.x, o = t.payload.position.y - e.panState.startPosition.y;
      return {
        ...e,
        viewport: {
          ...e.viewport,
          offset: {
            x: e.viewport.offset.x + n,
            y: e.viewport.offset.y + o
          }
        },
        panState: {
          ...e.panState,
          startPosition: t.payload.position
        }
      };
    }
    case "END_PAN":
      return {
        ...e,
        panState: {
          isPanning: !1,
          startPosition: null
        }
      };
    default:
      return e;
  }
}, Rn = {
  viewport: {
    offset: { x: 0, y: 0 },
    scale: 1
  },
  gridSettings: {
    enabled: !1,
    size: 20,
    showGrid: !0,
    snapToGrid: !1,
    snapThreshold: 8
  },
  isSpacePanning: !1,
  panState: {
    isPanning: !1,
    startPosition: null
  }
}, Ln = {
  setViewport: (e) => ({
    type: "SET_VIEWPORT",
    payload: { viewport: e }
  }),
  panViewport: (e) => ({
    type: "PAN_VIEWPORT",
    payload: { delta: e }
  }),
  zoomViewport: (e, t) => ({
    type: "ZOOM_VIEWPORT",
    payload: { scale: e, center: t }
  }),
  resetViewport: () => ({
    type: "RESET_VIEWPORT"
  }),
  updateGridSettings: (e) => ({
    type: "UPDATE_GRID_SETTINGS",
    payload: { settings: e }
  }),
  setSpacePanning: (e) => ({
    type: "SET_SPACE_PANNING",
    payload: { isSpacePanning: e }
  }),
  startPan: (e) => ({
    type: "START_PAN",
    payload: { position: e }
  }),
  updatePan: (e) => ({
    type: "UPDATE_PAN",
    payload: { position: e }
  }),
  endPan: () => ({
    type: "END_PAN"
  })
}, Vn = (e, t) => ({
  // Convert screen coordinates to canvas coordinates
  screenToCanvas: (n, o) => {
    if (!e.current)
      return console.warn("Canvas ref is not available for coordinate conversion"), { x: n, y: o };
    const s = e.current.getBoundingClientRect();
    return {
      x: (n - s.left - t.offset.x) / t.scale,
      y: (o - s.top - t.offset.y) / t.scale
    };
  },
  // Convert canvas coordinates to screen coordinates
  canvasToScreen: (n, o) => {
    if (!e.current)
      return console.warn("Canvas ref is not available for coordinate conversion"), { x: n, y: o };
    const s = e.current.getBoundingClientRect();
    return {
      x: n * t.scale + t.offset.x + s.left,
      y: o * t.scale + t.offset.y + s.top
    };
  }
}), xt = d.createContext(null), $n = ({ children: e, initialState: t }) => {
  const [n, o] = d.useReducer(zn, { ...Rn, ...t }), s = d.useRef(null), r = d.useMemo(() => Vn(s, n.viewport), [n.viewport]), i = {
    state: n,
    dispatch: o,
    actions: Ln,
    canvasRef: s,
    utils: r
  };
  return /* @__PURE__ */ l(xt.Provider, { value: i, children: e });
}, ie = () => {
  const e = d.useContext(xt);
  if (!e)
    throw new Error("useNodeCanvas must be used within a NodeCanvasProvider");
  return e;
}, _n = (e, t) => {
  switch (t.type) {
    case "SELECT_NODE": {
      const { nodeId: n, multiple: o } = t.payload;
      if (o) {
        const s = e.selectedNodeIds.includes(n);
        return {
          ...e,
          selectedNodeIds: s ? e.selectedNodeIds.filter((r) => r !== n) : [...e.selectedNodeIds, n]
        };
      }
      return {
        ...e,
        selectedNodeIds: [n],
        selectedConnectionIds: []
        // Clear connection selection
      };
    }
    case "SELECT_CONNECTION": {
      const { connectionId: n, multiple: o } = t.payload;
      if (o) {
        const s = e.selectedConnectionIds.includes(n);
        return {
          ...e,
          selectedConnectionIds: s ? e.selectedConnectionIds.filter((r) => r !== n) : [...e.selectedConnectionIds, n]
        };
      }
      return {
        ...e,
        selectedConnectionIds: [n],
        selectedNodeIds: []
        // Clear node selection
      };
    }
    case "CLEAR_SELECTION":
      return {
        ...e,
        selectedNodeIds: [],
        selectedConnectionIds: [],
        selectionBox: null
      };
    case "SELECT_ALL_NODES":
      return {
        ...e,
        selectedNodeIds: t.payload.nodeIds,
        selectedConnectionIds: []
      };
    case "SET_SELECTION_BOX":
      return {
        ...e,
        selectionBox: t.payload.box
      };
    case "START_NODE_DRAG": {
      const { nodeIds: n, startPosition: o, initialPositions: s, affectedChildNodes: r } = t.payload;
      return {
        ...e,
        dragState: {
          nodeIds: n,
          startPosition: o,
          offset: { x: 0, y: 0 },
          initialPositions: s,
          affectedChildNodes: r
        }
      };
    }
    case "UPDATE_NODE_DRAG":
      return e.dragState ? {
        ...e,
        dragState: {
          ...e.dragState,
          offset: t.payload.offset
        }
      } : e;
    case "END_NODE_DRAG":
      return {
        ...e,
        dragState: null
      };
    case "SET_HOVERED_NODE":
      return {
        ...e,
        hoveredNodeId: t.payload.nodeId
      };
    case "SET_HOVERED_CONNECTION":
      return {
        ...e,
        hoveredConnectionId: t.payload.connectionId
      };
    case "START_CONNECTION_DRAG":
      return {
        ...e,
        connectionDragState: {
          fromPort: t.payload.fromPort,
          toPosition: { x: 0, y: 0 },
          validTarget: null,
          candidatePort: null
        }
      };
    case "UPDATE_CONNECTION_DRAG":
      return e.connectionDragState ? {
        ...e,
        connectionDragState: {
          ...e.connectionDragState,
          toPosition: t.payload.toPosition,
          candidatePort: t.payload.candidatePort
        }
      } : e;
    case "END_CONNECTION_DRAG":
      return {
        ...e,
        connectionDragState: null
      };
    case "START_CONNECTION_DISCONNECT":
      return {
        ...e,
        connectionDisconnectState: {
          connectionId: t.payload.originalConnection.id,
          fixedPort: t.payload.fixedPort,
          draggingEnd: t.payload.disconnectedEnd,
          draggingPosition: t.payload.draggingPosition,
          originalConnection: t.payload.originalConnection,
          disconnectedEnd: t.payload.disconnectedEnd,
          candidatePort: null
        }
      };
    case "UPDATE_CONNECTION_DISCONNECT":
      return e.connectionDisconnectState ? {
        ...e,
        connectionDisconnectState: {
          ...e.connectionDisconnectState,
          draggingPosition: t.payload.draggingPosition,
          candidatePort: t.payload.candidatePort
        }
      } : e;
    case "END_CONNECTION_DISCONNECT":
      return {
        ...e,
        connectionDisconnectState: null
      };
    case "SET_HOVERED_PORT":
      return {
        ...e,
        hoveredPort: t.payload.port
      };
    case "UPDATE_CONNECTED_PORTS":
      return {
        ...e,
        connectedPorts: t.payload.connectedPorts
      };
    case "UPDATE_CONNECTABLE_PORTS":
      return {
        ...e,
        connectablePortIds: t.payload.connectablePortIds
      };
    case "START_NODE_RESIZE": {
      const { nodeId: n, startPosition: o, startSize: s, handle: r } = t.payload;
      return {
        ...e,
        resizeState: {
          nodeId: n,
          startPosition: o,
          startSize: s,
          currentSize: s,
          currentPosition: o,
          handle: r
        }
      };
    }
    case "UPDATE_NODE_RESIZE":
      return e.resizeState ? {
        ...e,
        resizeState: {
          ...e.resizeState,
          currentSize: t.payload.currentSize
        }
      } : e;
    case "END_NODE_RESIZE":
      return {
        ...e,
        resizeState: null
      };
    case "SHOW_CONTEXT_MENU":
      return {
        ...e,
        contextMenu: {
          visible: !0,
          position: t.payload.position,
          canvasPosition: t.payload.canvasPosition,
          nodeId: t.payload.nodeId
        }
      };
    case "HIDE_CONTEXT_MENU":
      return {
        ...e,
        contextMenu: {
          visible: !1,
          position: { x: 0, y: 0 },
          canvasPosition: void 0,
          nodeId: void 0
        }
      };
    default:
      return e;
  }
}, Hn = {
  selectedNodeIds: [],
  selectedConnectionIds: [],
  selectionBox: null,
  dragState: null,
  resizeState: null,
  hoveredNodeId: null,
  hoveredConnectionId: null,
  connectionDragState: null,
  connectionDisconnectState: null,
  hoveredPort: null,
  connectedPorts: /* @__PURE__ */ new Set(),
  connectablePortIds: /* @__PURE__ */ new Set(),
  contextMenu: {
    visible: !1,
    position: { x: 0, y: 0 },
    canvasPosition: void 0,
    nodeId: void 0
  }
}, Bn = {
  selectNode: (e, t = !1) => ({
    type: "SELECT_NODE",
    payload: { nodeId: e, multiple: t }
  }),
  selectConnection: (e, t = !1) => ({
    type: "SELECT_CONNECTION",
    payload: { connectionId: e, multiple: t }
  }),
  clearSelection: () => ({
    type: "CLEAR_SELECTION"
  }),
  selectAllNodes: (e) => ({
    type: "SELECT_ALL_NODES",
    payload: { nodeIds: e }
  }),
  setSelectionBox: (e) => ({
    type: "SET_SELECTION_BOX",
    payload: { box: e }
  }),
  startNodeDrag: (e, t, n, o) => ({
    type: "START_NODE_DRAG",
    payload: { nodeIds: e, startPosition: t, initialPositions: n, affectedChildNodes: o }
  }),
  updateNodeDrag: (e) => ({
    type: "UPDATE_NODE_DRAG",
    payload: { offset: e }
  }),
  endNodeDrag: () => ({
    type: "END_NODE_DRAG"
  }),
  setHoveredNode: (e) => ({
    type: "SET_HOVERED_NODE",
    payload: { nodeId: e }
  }),
  setHoveredConnection: (e) => ({
    type: "SET_HOVERED_CONNECTION",
    payload: { connectionId: e }
  }),
  startConnectionDrag: (e) => ({
    type: "START_CONNECTION_DRAG",
    payload: { fromPort: e }
  }),
  updateConnectionDrag: (e, t) => ({
    type: "UPDATE_CONNECTION_DRAG",
    payload: { toPosition: e, candidatePort: t }
  }),
  endConnectionDrag: () => ({
    type: "END_CONNECTION_DRAG"
  }),
  setHoveredPort: (e) => ({
    type: "SET_HOVERED_PORT",
    payload: { port: e }
  }),
  updateConnectedPorts: (e) => ({
    type: "UPDATE_CONNECTED_PORTS",
    payload: { connectedPorts: e }
  }),
  updateConnectablePorts: (e) => ({
    type: "UPDATE_CONNECTABLE_PORTS",
    payload: { connectablePortIds: e }
  }),
  startConnectionDisconnect: (e, t, n, o) => ({
    type: "START_CONNECTION_DISCONNECT",
    payload: { originalConnection: e, disconnectedEnd: t, fixedPort: n, draggingPosition: o }
  }),
  updateConnectionDisconnect: (e, t) => ({
    type: "UPDATE_CONNECTION_DISCONNECT",
    payload: { draggingPosition: e, candidatePort: t }
  }),
  endConnectionDisconnect: () => ({
    type: "END_CONNECTION_DISCONNECT"
  }),
  startNodeResize: (e, t, n, o) => ({
    type: "START_NODE_RESIZE",
    payload: { nodeId: e, startPosition: t, startSize: n, handle: o }
  }),
  updateNodeResize: (e) => ({
    type: "UPDATE_NODE_RESIZE",
    payload: { currentSize: e }
  }),
  endNodeResize: () => ({
    type: "END_NODE_RESIZE"
  }),
  showContextMenu: (e, t, n) => ({
    type: "SHOW_CONTEXT_MENU",
    payload: { position: e, nodeId: t, canvasPosition: n }
  }),
  hideContextMenu: () => ({
    type: "HIDE_CONTEXT_MENU"
  })
}, Nt = d.createContext(null), Gn = ({
  children: e,
  initialState: t
}) => {
  const [n, o] = d.useReducer(
    _n,
    { ...Hn, ...t }
  ), s = {
    state: n,
    dispatch: o,
    actions: Bn
  };
  return /* @__PURE__ */ l(Nt.Provider, { value: s, children: e });
}, Z = () => {
  const e = d.useContext(Nt);
  if (!e)
    throw new Error("useEditorActionState must be used within an EditorActionStateProvider");
  return e;
}, Xn = (e, t) => {
  switch (t.type) {
    case "START_EDITING": {
      const { nodeId: n, field: o, value: s } = t.payload;
      return {
        editingNodeId: n,
        editingField: o,
        originalValue: s,
        currentValue: s,
        isActive: !0
      };
    }
    case "UPDATE_VALUE":
      return e.isActive ? {
        ...e,
        currentValue: t.payload.value
      } : e;
    case "CONFIRM_EDIT":
    case "CANCEL_EDIT":
    case "END_EDITING":
      return {
        editingNodeId: null,
        editingField: null,
        originalValue: "",
        currentValue: "",
        isActive: !1
      };
    default:
      return e;
  }
}, Un = {
  editingNodeId: null,
  editingField: null,
  originalValue: "",
  currentValue: "",
  isActive: !1
}, we = {
  startEditing: (e, t, n) => ({
    type: "START_EDITING",
    payload: { nodeId: e, field: t, value: n }
  }),
  updateValue: (e) => ({
    type: "UPDATE_VALUE",
    payload: { value: e }
  }),
  confirmEdit: () => ({
    type: "CONFIRM_EDIT"
  }),
  cancelEdit: () => ({
    type: "CANCEL_EDIT"
  }),
  endEditing: () => ({
    type: "END_EDITING"
  })
}, Ct = d.createContext(null), Yn = ({
  children: e,
  initialState: t
}) => {
  const [n, o] = d.useReducer(
    Xn,
    { ...Un, ...t }
  ), s = d.useCallback(
    (p, h) => !(!n.isActive || n.editingNodeId !== p || h && n.editingField !== h),
    [n.isActive, n.editingNodeId, n.editingField]
  ), r = d.useCallback(
    (p, h, v) => {
      o(we.startEditing(p, h, v));
    },
    [o]
  ), i = d.useCallback(
    (p) => {
      o(we.updateValue(p));
    },
    [o]
  ), a = d.useCallback(() => {
    o(we.confirmEdit());
  }, [o]), c = d.useCallback(() => {
    o(we.cancelEdit());
  }, [o]), u = {
    state: n,
    dispatch: o,
    actions: we,
    isEditing: s,
    startEditing: r,
    updateValue: i,
    confirmEdit: a,
    cancelEdit: c
  };
  return /* @__PURE__ */ l(Ct.Provider, { value: u, children: e });
}, Fn = () => {
  const e = d.useContext(Ct);
  if (!e)
    throw new Error("useInlineEditing must be used within an InlineEditingProvider");
  return e;
};
function jn() {
  const e = /* @__PURE__ */ new Map();
  return {
    definitions: e,
    register(t) {
      e.set(t.type, t);
    },
    unregister(t) {
      e.delete(t);
    },
    get(t) {
      return e.get(t);
    },
    getAll() {
      return Array.from(e.values());
    },
    getByCategory(t) {
      return Array.from(e.values()).filter(
        (n) => n.category === t
      );
    }
  };
}
const Wn = {
  type: "standard",
  displayName: "Standard Node",
  description: "A basic node with customizable properties",
  category: "Basic",
  defaultData: {
    title: "New Node",
    content: ""
  },
  defaultSize: { width: 200, height: 100 },
  ports: [
    {
      id: "input",
      type: "input",
      label: "Input",
      position: "left"
    },
    {
      id: "output",
      type: "output",
      label: "Output",
      position: "right"
    }
  ]
}, Kn = {
  type: "group",
  displayName: "Group",
  description: "A container node that can hold other nodes",
  category: "Structure",
  defaultData: {
    title: "Group"
  },
  defaultSize: { width: 300, height: 200 },
  supportsChildren: !0,
  visualState: "info"
};
function pd(e) {
  return e;
}
function hd(e) {
  return e.data;
}
function fd(e) {
  return (t) => {
    e({ data: t });
  };
}
function gd(e) {
  return e;
}
function md(e) {
  return e;
}
const qe = d.createContext(null), Zn = ({
  children: e,
  nodeDefinitions: t = [],
  includeDefaults: n = !0
}) => {
  const s = {
    registry: d.useMemo(() => {
      const r = jn();
      return n && (r.register(Wn), r.register(Kn)), t.forEach((i) => r.register(i)), r;
    }, [t, n])
  };
  return /* @__PURE__ */ l(qe.Provider, { value: s, children: e });
}, Je = () => {
  const e = d.useContext(qe);
  if (!e)
    throw new Error("useNodeDefinitions must be used within a NodeDefinitionProvider");
  return e;
}, Qe = (e) => {
  const { registry: t } = Je();
  return t.get(e);
}, et = () => {
  const { registry: e } = Je();
  return e.getAll();
}, St = d.createContext(null), qn = ({
  children: e,
  refs: t = {}
}) => {
  const n = {
    refs: t
  };
  return /* @__PURE__ */ l(St.Provider, { value: n, children: e });
}, Jn = () => {
  const e = d.useContext(St);
  if (!e)
    throw new Error("useExternalDataRefs must be used within an ExternalDataProvider");
  return e;
}, Et = (e) => {
  const { refs: t } = Jn();
  return t[e];
}, wt = (e = {}) => {
  const { dispatch: t, actions: n } = W(), { state: o, dispatch: s, actions: r } = Z(), {
    minWidth: i = 100,
    minHeight: a = 40,
    snapToGrid: c = !1,
    gridSize: u = 20
  } = e, p = d.useCallback((f, g, x, P) => {
    const E = {
      width: Math.max(i, g.width + x),
      height: Math.max(a, g.height + P)
    };
    return c && (E.width = Math.round(E.width / u) * u, E.height = Math.round(E.height / u) * u), E;
  }, [i, a, c, u]);
  d.useEffect(() => {
    if (!o.resizeState) return;
    const { nodeId: f, startPosition: g, startSize: x, handle: P } = o.resizeState, E = (m) => {
      const N = m.clientX - g.x, C = m.clientY - g.y, D = p(P, x, N, C);
      s(r.updateNodeResize(D));
    }, I = (m) => {
      if (o.resizeState) {
        const { nodeId: N, currentSize: C } = o.resizeState;
        t(n.updateNode(N, {
          size: C
        }));
      }
      s(r.endNodeResize());
    }, M = (m) => {
      m.key === "Escape" && s(r.endNodeResize());
    };
    return window.addEventListener("pointermove", E), window.addEventListener("pointerup", I), window.addEventListener("keydown", M), () => {
      window.removeEventListener("pointermove", E), window.removeEventListener("pointerup", I), window.removeEventListener("keydown", M);
    };
  }, [o.resizeState, p, s, r, t, n]);
  const h = d.useCallback((f, g, x, P) => {
    s(r.startNodeResize(f, x, P, g));
  }, [s, r]), v = d.useCallback((f) => {
    var g;
    return ((g = o.resizeState) == null ? void 0 : g.nodeId) === f;
  }, [o.resizeState]), y = d.useCallback((f) => {
    var g;
    return ((g = o.resizeState) == null ? void 0 : g.nodeId) === f ? o.resizeState.handle : null;
  }, [o.resizeState]), b = d.useCallback((f) => {
    var g;
    return ((g = o.resizeState) == null ? void 0 : g.nodeId) === f ? o.resizeState.currentSize : null;
  }, [o.resizeState]);
  return {
    startResize: h,
    isResizing: v,
    getResizeHandle: y,
    getCurrentSize: b
  };
}, st = {
  width: 150,
  height: 50
};
function tt(e) {
  var t, n;
  return {
    width: ((t = e.size) == null ? void 0 : t.width) || st.width,
    height: ((n = e.size) == null ? void 0 : n.height) || st.height
  };
}
function Re(e) {
  const { width: t, height: n } = tt(e);
  return {
    left: e.position.x,
    top: e.position.y,
    right: e.position.x + t,
    bottom: e.position.y + n,
    width: t,
    height: n
  };
}
function yd(e, t) {
  return {
    left: e.x,
    top: e.y,
    right: e.x + t.width,
    bottom: e.y + t.height,
    width: t.width,
    height: t.height
  };
}
function vd(e, t) {
  return !(e.right < t.left || t.right < e.left || e.bottom < t.top || t.bottom < e.top);
}
function Qn(e, t) {
  return e.left >= t.left && e.top >= t.top && e.right <= t.right && e.bottom <= t.bottom;
}
function bd(e, t) {
  const n = /* @__PURE__ */ new Map();
  return Object.entries(e).forEach(([o, s]) => {
    (t ? t(o) : s.ports || []).forEach((i) => {
      n.set(i.id, o);
    });
  }), n;
}
function eo(e) {
  const t = /* @__PURE__ */ new Map();
  return Object.entries(e).forEach(([n, o]) => {
    o.parentId && (t.has(o.parentId) || t.set(o.parentId, []), t.get(o.parentId).push(n));
  }), t;
}
function xd(e) {
  const t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  return Object.values(e).forEach((i) => {
    t.has(i.fromNodeId) || t.set(i.fromNodeId, []), n.has(i.toNodeId) || n.set(i.toNodeId, []), t.get(i.fromNodeId).push(i), n.get(i.toNodeId).push(i), o.has(i.fromPortId) || o.set(i.fromPortId, []), s.has(i.toPortId) || s.set(i.toPortId, []), o.get(i.fromPortId).push(i), s.get(i.toPortId).push(i);
    const a = `${i.fromNodeId}:${i.fromPortId}`, c = `${i.toNodeId}:${i.toPortId}`;
    r.has(a) || r.set(a, []), r.has(c) || r.set(c, []), r.get(a).push(i), r.get(c).push(i);
  }), { byFromNode: t, byToNode: n, byFromPort: o, byToPort: s, byEndpoint: r };
}
class Nd {
  constructor(t = 200) {
    he(this, "cells", /* @__PURE__ */ new Map());
    he(this, "cellSize");
    this.cellSize = t;
  }
  /**
   * Get cell key for a position
   */
  getCellKey(t, n) {
    const o = Math.floor(t / this.cellSize), s = Math.floor(n / this.cellSize);
    return `${o},${s}`;
  }
  /**
   * Insert item at position
   */
  insert(t, n, o) {
    const s = this.getCellKey(n, o);
    this.cells.has(s) || this.cells.set(s, []), this.cells.get(s).push(t);
  }
  /**
   * Get all items in cells near a position
   */
  getNearby(t, n, o = 1) {
    const s = [], r = Math.ceil(o / this.cellSize), i = Math.floor(t / this.cellSize), a = Math.floor(n / this.cellSize);
    for (let c = -r; c <= r; c++)
      for (let u = -r; u <= r; u++) {
        const p = `${i + c},${a + u}`, h = this.cells.get(p);
        h && s.push(...h);
      }
    return s;
  }
  /**
   * Clear all items
   */
  clear() {
    this.cells.clear();
  }
  /**
   * Get all items in a rectangular area
   */
  getInArea(t, n, o, s) {
    const r = [], i = Math.floor(t / this.cellSize), a = Math.floor(n / this.cellSize), c = Math.floor(o / this.cellSize), u = Math.floor(s / this.cellSize);
    for (let p = i; p <= c; p++)
      for (let h = a; h <= u; h++) {
        const v = `${p},${h}`, y = this.cells.get(v);
        y && r.push(...y);
      }
    return r;
  }
}
const to = (e, t) => {
  if (e.id === t.id || e.type === "group") return !1;
  const n = Re(e), o = Re(t);
  return Qn(n, o);
}, It = (e, t) => {
  const n = Object.values(t).filter((r) => r.type === "group");
  let o = null, s = 1 / 0;
  for (const r of n)
    if (to(e, r)) {
      const i = Re(r), a = i.width * i.height;
      a < s && (s = a, o = r);
    }
  return (o == null ? void 0 : o.id) || null;
};
let Pe = null, rt = null;
const Dt = (e, t) => (rt !== t && (Pe = eo(t), rt = t), ((Pe == null ? void 0 : Pe.get(e)) || []).map((o) => t[o]).filter(Boolean)), no = (e, t) => {
  const n = [], o = [e];
  for (; o.length > 0; ) {
    const s = o.pop(), r = Dt(s, t);
    n.push(...r), o.push(...r.filter((i) => i.type === "group").map((i) => i.id));
  }
  return n;
}, oo = (e) => {
  const t = {}, n = Object.values(e).filter((o) => o.type !== "group");
  for (const o of n) {
    const s = It(o, e);
    o.parentId !== s && (t[o.id] = {
      parentId: s || void 0
    });
  }
  return t;
}, so = (e, t, n) => {
  const o = n[e];
  if (!o || o.type !== "group") return !0;
  const s = { ...o, position: t };
  return It(s, n) === null;
}, Pt = (e = {}) => {
  const { state: t, dispatch: n, actions: o } = W(), { state: s } = Z(), { autoUpdateMembership: r = !0, membershipUpdateDelay: i = 100 } = e, a = d.useRef(void 0), c = d.useRef(t.nodes);
  c.current = t.nodes;
  const u = d.useCallback(() => {
    const g = oo(c.current);
    Object.keys(g).length > 0 && n(o.updateGroupMembership(g));
  }, []);
  d.useEffect(() => r ? (a.current && clearTimeout(a.current), s.dragState !== null || (a.current = window.setTimeout(() => {
    u();
  }, i)), () => {
    a.current && clearTimeout(a.current);
  }) : void 0, [r, i, u]);
  const p = d.useCallback(
    (g) => {
      const x = c.current[g];
      return !!(x && x.parentId);
    },
    [c]
  ), h = d.useCallback((g) => {
    const x = c.current[g];
    return (x == null ? void 0 : x.parentId) || null;
  }, []), v = d.useCallback((g) => Dt(g, c.current), []), y = d.useCallback((g) => no(g, c.current), []), b = d.useCallback(
    (g, x) => {
      n(o.moveGroupWithChildren(g, x));
    },
    [n, o]
  ), f = d.useCallback((g, x) => so(g, x, c.current), []);
  return {
    updateAllGroupMembership: u,
    isNodeInGroup: p,
    getNodeParentGroup: h,
    getGroupChildren: v,
    getGroupDescendants: y,
    moveGroupWithChildren: b,
    isValidGroupMove: f
  };
};
function Cd(e) {
  const {
    onStart: t,
    onMove: n,
    onEnd: o,
    scale: s = 1,
    threshold: r = 2,
    disabled: i = !1
  } = e, [a, c] = d.useState({
    isDragging: !1,
    dragStarted: !1,
    delta: { x: 0, y: 0 }
  }), u = d.useRef(null), p = d.useRef({ x: 0, y: 0 }), h = d.useRef({ x: 0, y: 0 }), v = d.useCallback(
    (f) => {
      if (!u.current) return;
      const g = {
        x: (f.clientX - p.current.x) / s,
        y: (f.clientY - p.current.y) / s
      };
      h.current = g, a.dragStarted ? (c((x) => ({ ...x, delta: g })), n == null || n(f, g, u.current)) : Math.sqrt(g.x * g.x + g.y * g.y) >= r && (c({
        isDragging: !0,
        dragStarted: !0,
        delta: g
      }), t == null || t(f, u.current));
    },
    [s, r, a.dragStarted, t, n]
  ), y = d.useCallback(
    (f) => {
      if (!u.current) return;
      const g = a.dragStarted, x = h.current;
      document.removeEventListener("pointermove", v), document.removeEventListener("pointerup", y), document.removeEventListener("pointercancel", y), c({
        isDragging: !1,
        dragStarted: !1,
        delta: { x: 0, y: 0 }
      }), g && (o == null || o(f, x, u.current)), u.current = null, h.current = { x: 0, y: 0 };
    },
    [a.dragStarted, v, o]
  ), b = d.useCallback(
    (f, g) => {
      if (i) return;
      const x = "nativeEvent" in f ? f.nativeEvent : f;
      u.current = g, p.current = {
        x: x.clientX,
        y: x.clientY
      };
      const P = x.target;
      P != null && P.setPointerCapture && P.setPointerCapture(x.pointerId), document.addEventListener("pointermove", v), document.addEventListener("pointerup", y), document.addEventListener("pointercancel", y), c({
        isDragging: !0,
        dragStarted: !1,
        delta: { x: 0, y: 0 }
      });
    },
    [i, v, y]
  );
  return d.useEffect(() => () => {
    document.removeEventListener("pointermove", v), document.removeEventListener("pointerup", y), document.removeEventListener("pointercancel", y);
  }, [v, y]), {
    startDrag: b,
    dragState: a
  };
}
function it({
  interactionState: e,
  viewport: t,
  onPointerMove: n,
  onPointerUp: o,
  canvasSelector: s = '[role="application"]',
  pointerMoveOptions: r = { passive: !0 }
}) {
  d.useEffect(() => {
    if (!e) return;
    const i = document.querySelector(s);
    if (!i) return;
    const a = (u) => {
      const p = i.getBoundingClientRect(), h = (u.clientX - p.left - t.offset.x) / t.scale, v = (u.clientY - p.top - t.offset.y) / t.scale;
      n({ x: h, y: v }, u);
    }, c = (u) => {
      o(u);
    };
    return window.addEventListener("pointermove", a, r), window.addEventListener("pointerup", c, { once: !0 }), () => {
      window.removeEventListener("pointermove", a), window.removeEventListener("pointerup", c);
    };
  }, [e, t, n, o, s, r]);
}
function ro(e, t) {
  d.useEffect(() => {
    if (!e) return;
    const { onMove: n, onUp: o, onCancel: s } = t;
    return n && document.addEventListener("pointermove", n, { passive: !1 }), o && document.addEventListener("pointerup", o), s && document.addEventListener("pointercancel", s), () => {
      n && document.removeEventListener("pointermove", n), o && document.removeEventListener("pointerup", o), s && document.removeEventListener("pointercancel", s);
    };
  }, [e, t.onMove, t.onUp, t.onCancel]);
}
function io(e, t, n) {
  d.useEffect(() => {
    const o = e.current;
    if (!(!t || !o || n === void 0))
      return o.setPointerCapture(n), () => {
        o.hasPointerCapture && o.hasPointerCapture(n) && o.releasePointerCapture(n);
      };
  }, [e, t, n]);
}
function ao(e, t, n = ["pointerdown", "pointermove", "pointerup"]) {
  d.useEffect(() => {
    const o = e.current;
    if (!t || !o) return;
    const s = (r) => {
      r.preventDefault();
    };
    return n.forEach((r) => {
      o.addEventListener(r, s, { passive: !1 });
    }), () => {
      n.forEach((r) => {
        o.removeEventListener(r, s);
      });
    };
  }, [e, t, n]);
}
function Sd(e, t, n) {
  const {
    onMove: o,
    onUp: s,
    onCancel: r,
    pointerId: i,
    capturePointer: a = !0,
    preventDefaults: c = !0
  } = n;
  ro(t, { onMove: o, onUp: s, onCancel: r }), io(e, t && a, i), ao(e, t && c);
}
function kt() {
  const { dispatch: e, actions: t } = W();
  return d.useMemo(() => ({
    addNode: (n) => e(t.addNode(n)),
    updateNode: (n, o) => e(t.updateNode(n, o)),
    deleteNode: (n) => e(t.deleteNode(n)),
    moveNode: (n, o) => e(t.moveNode(n, o)),
    moveNodes: (n) => e(t.moveNodes(n)),
    addConnection: (n) => e(t.addConnection(n)),
    deleteConnection: (n) => e(t.deleteConnection(n)),
    setNodeData: (n) => e(t.setNodeData(n)),
    restoreState: (n) => e(t.restoreState(n)),
    duplicateNodes: (n) => e(t.duplicateNodes(n)),
    groupNodes: (n, o) => e(t.groupNodes(n, o)),
    ungroupNode: (n) => e(t.ungroupNode(n)),
    updateGroupMembership: (n) => e(t.updateGroupMembership(n)),
    moveGroupWithChildren: (n, o) => e(t.moveGroupWithChildren(n, o)),
    autoLayout: (n, o) => e(t.autoLayout(n, o))
  }), [e, t]);
}
function Ed() {
  const { state: e } = W(), t = kt();
  return { state: e, actions: t };
}
function Mt() {
  const { dispatch: e, actions: t } = ie();
  return d.useMemo(() => ({
    setViewport: (n) => e(t.setViewport(n)),
    panViewport: (n) => e(t.panViewport(n)),
    zoomViewport: (n, o) => e(t.zoomViewport(n, o)),
    resetViewport: () => e(t.resetViewport()),
    startPan: (n) => e(t.startPan(n)),
    updatePan: (n) => e(t.updatePan(n)),
    endPan: () => e(t.endPan())
  }), [e, t]);
}
function wd() {
  const { state: e } = ie(), t = Mt();
  return { state: e, actions: t };
}
function Tt() {
  const { dispatch: e, actions: t } = Z();
  return d.useMemo(() => ({
    selectNode: (n, o) => e(t.selectNode(n, o)),
    selectConnection: (n, o) => e(t.selectConnection(n, o)),
    clearSelection: () => e(t.clearSelection()),
    selectAllNodes: (n) => e(t.selectAllNodes(n)),
    setSelectionBox: (n) => e(t.setSelectionBox(n)),
    startNodeDrag: (n, o, s, r) => e(t.startNodeDrag(n, o, s, r)),
    updateNodeDrag: (n) => e(t.updateNodeDrag(n)),
    endNodeDrag: () => e(t.endNodeDrag()),
    setHoveredNode: (n) => e(t.setHoveredNode(n)),
    setHoveredConnection: (n) => e(t.setHoveredConnection(n)),
    startConnectionDrag: (n) => e(t.startConnectionDrag(n)),
    updateConnectionDrag: (n, o) => e(t.updateConnectionDrag(n, o)),
    endConnectionDrag: () => e(t.endConnectionDrag()),
    setHoveredPort: (n) => e(t.setHoveredPort(n)),
    updateConnectedPorts: (n) => e(t.updateConnectedPorts(n)),
    startConnectionDisconnect: (n, o, s, r) => e(t.startConnectionDisconnect(n, o, s, r)),
    updateConnectionDisconnect: (n, o) => e(t.updateConnectionDisconnect(n, o)),
    endConnectionDisconnect: () => e(t.endConnectionDisconnect()),
    startNodeResize: (n, o, s, r) => e(t.startNodeResize(n, o, s, r)),
    updateNodeResize: (n) => e(t.updateNodeResize(n)),
    endNodeResize: () => e(t.endNodeResize()),
    showContextMenu: (n, o, s) => e(t.showContextMenu(n, o, s)),
    hideContextMenu: () => e(t.hideContextMenu())
  }), [e, t]);
}
function Id() {
  const { state: e } = Z(), t = Tt();
  return { state: e, actions: t };
}
function co() {
  const e = kt(), t = Mt(), n = Tt();
  return {
    /** Node editor actions (add/remove/update nodes and connections) */
    editor: e,
    /** Canvas viewport and grid actions */
    canvas: t,
    /** User interaction actions (drag, resize, selection) */
    interaction: n
  };
}
function Dd() {
  const e = co();
  return {
    // Node operations
    addNode: e.editor.addNode,
    removeNode: e.editor.deleteNode,
    updateNode: e.editor.updateNode,
    duplicateNodes: e.editor.duplicateNodes,
    // Connection operations
    addConnection: e.editor.addConnection,
    removeConnection: e.editor.deleteConnection,
    // Selection operations
    selectNode: e.interaction.selectNode,
    selectAllNodes: e.interaction.selectAllNodes,
    clearSelection: e.interaction.clearSelection,
    // Viewport operations
    setViewport: e.canvas.setViewport,
    panViewport: e.canvas.panViewport,
    zoomViewport: e.canvas.zoomViewport,
    resetViewport: e.canvas.resetViewport,
    // Context menu
    showContextMenu: e.interaction.showContextMenu,
    hideContextMenu: e.interaction.hideContextMenu
  };
}
const re = {
  showGrid: !0,
  showMinimap: !0,
  showStatusBar: !0,
  theme: "light",
  autoSave: !0,
  autoSaveInterval: 30,
  smoothAnimations: !0,
  doubleClickToEdit: !0,
  fontSize: 14,
  gridSize: 20,
  gridOpacity: 0.3,
  canvasBackground: "#ffffff"
};
function lo(e) {
  return typeof e == "string" && ["light", "dark", "auto"].includes(e);
}
function be(e, t, n) {
  const o = e.getValue(t);
  return typeof o == "boolean" ? o : n;
}
function ke(e, t, n) {
  const o = e.getValue(t);
  return typeof o == "number" ? o : n;
}
function uo(e, t, n) {
  const o = e.getValue(t);
  return typeof o == "string" ? o : n;
}
function po(e, t, n) {
  const o = e.getValue(t);
  return lo(o) ? o : n;
}
function Ot(e) {
  const [t, n] = d.useState(0);
  return d.useEffect(() => e ? e.on("change", () => {
    n((r) => r + 1);
  }) : void 0, [e]), d.useMemo(() => e ? {
    showGrid: be(e, "appearance.showGrid", re.showGrid),
    showMinimap: be(e, "appearance.showMinimap", re.showMinimap),
    showStatusBar: be(e, "appearance.showStatusBar", re.showStatusBar),
    theme: po(e, "appearance.theme", re.theme),
    autoSave: be(e, "general.autoSave", re.autoSave),
    autoSaveInterval: ke(e, "general.autoSaveInterval", re.autoSaveInterval),
    smoothAnimations: be(e, "behavior.smoothAnimations", re.smoothAnimations),
    doubleClickToEdit: be(e, "behavior.doubleClickToEdit", re.doubleClickToEdit),
    fontSize: ke(e, "appearance.fontSize", re.fontSize),
    gridSize: ke(e, "appearance.gridSize", re.gridSize),
    gridOpacity: ke(e, "appearance.gridOpacity", re.gridOpacity),
    canvasBackground: uo(e, "appearance.canvasBackground", re.canvasBackground)
  } : re, [e, t]);
}
const ho = (e, t = 1.5) => {
  const { state: n } = ie();
  return d.useMemo(() => {
    const { viewport: o } = n, s = window.innerWidth, r = window.innerHeight, i = Math.max(s, r) * (t - 1) / 2, a = {
      left: (-o.offset.x - i) / o.scale,
      top: (-o.offset.y - i) / o.scale,
      right: (s - o.offset.x + i) / o.scale,
      bottom: (r - o.offset.y + i) / o.scale
    };
    return Object.values(e).filter((c) => {
      var h, v;
      const u = ((h = c.size) == null ? void 0 : h.width) || 150, p = ((v = c.size) == null ? void 0 : v.height) || 50;
      return c.position.x + u >= a.left && c.position.x <= a.right && c.position.y + p >= a.top && c.position.y <= a.bottom;
    });
  }, [e, n.viewport, t]);
}, Pd = (e, t = {}) => {
  const { delay: n = 0, maxBatchSize: o = 100 } = t, [s, r] = d.useState(e), i = d.useRef([]), a = d.useRef(null), c = d.useRef(null), u = d.useCallback(() => {
    i.current.length !== 0 && (r((v) => {
      let y = v;
      for (const b of i.current)
        y = b(y);
      return y;
    }), i.current = [], a.current = null, c.current && (clearTimeout(c.current), c.current = null));
  }, []), p = d.useCallback((v) => {
    const y = typeof v == "function" ? v : (b) => v;
    if (i.current.push(y), i.current.length >= o) {
      u();
      return;
    }
    a.current !== null && cancelAnimationFrame(a.current), c.current !== null && clearTimeout(c.current), n > 0 ? c.current = setTimeout(() => {
      a.current = requestAnimationFrame(u);
    }, n) : a.current = requestAnimationFrame(u);
  }, [u, n, o]), h = d.useCallback(() => {
    a.current !== null && cancelAnimationFrame(a.current), c.current !== null && clearTimeout(c.current), u();
  }, [u]);
  return d.useEffect(() => () => {
    a.current !== null && cancelAnimationFrame(a.current), c.current !== null && clearTimeout(c.current);
  }, []), [s, p, h];
}, Le = {
  visualSize: 12,
  connectionMargin: 8,
  edgePadding: 20,
  relativePadding: 0.1
};
function fo(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const o = n.position || "right";
    t.has(o) || t.set(o, []), t.get(o).push(n);
  }
  return t;
}
function At(e, t, n) {
  if (t === 1)
    return 0.5;
  if (t === 2)
    return [0.3333, 0.6667][e] || 0.5;
  const s = (1 - n.relativePadding * 2) / (t - 1), r = n.relativePadding + s * e;
  return Math.max(0.1, Math.min(0.9, r));
}
function go(e, t, n, o, s) {
  const r = At(t, n, s), i = s.visualSize / 2;
  switch (e.position) {
    case "left":
      return {
        x: -i,
        y: o.height * r,
        transform: "translateY(-50%)"
      };
    case "right":
      return {
        x: o.width - i,
        y: o.height * r,
        transform: "translateY(-50%)"
      };
    case "top":
      return {
        x: o.width * r,
        y: -i,
        transform: "translateX(-50%)"
      };
    case "bottom":
      return {
        x: o.width * r,
        y: o.height - i,
        transform: "translateX(-50%)"
      };
    default:
      return {
        x: o.width - i,
        y: o.height * 0.5,
        transform: "translateY(-50%)"
      };
  }
}
function mo(e, t, n, o, s) {
  const r = tt(o), { left: i, top: a } = Re(o), c = At(t, n, s);
  switch (e.position) {
    case "left":
      return {
        x: i - s.connectionMargin,
        y: a + r.height * c
      };
    case "right":
      return {
        x: i + r.width + s.connectionMargin,
        y: a + r.height * c
      };
    case "top":
      return {
        x: i + r.width * c,
        y: a - s.connectionMargin
      };
    case "bottom":
      return {
        x: i + r.width * c,
        y: a + r.height + s.connectionMargin
      };
    default:
      return {
        x: i + r.width + s.connectionMargin,
        y: a + r.height * 0.5
      };
  }
}
function Ve(e, t = Le) {
  const n = /* @__PURE__ */ new Map(), o = e.ports || [];
  if (o.length === 0)
    return n;
  const s = tt(e), r = fo(o);
  for (const [i, a] of r)
    a.forEach((c, u) => {
      const p = go(
        c,
        u,
        a.length,
        s,
        t
      ), h = mo(
        c,
        u,
        a.length,
        e,
        t
      );
      n.set(c.id, {
        portId: c.id,
        renderPosition: p,
        connectionPoint: h
      });
    });
  return n;
}
function yo(e, t = Le) {
  const n = /* @__PURE__ */ new Map();
  for (const o of e) {
    const s = Ve(o, t);
    s.size > 0 && n.set(o.id, s);
  }
  return n;
}
function kd(e, t, n = Le) {
  const o = new Map(e);
  for (const s of t) {
    const r = Ve(s, n);
    r.size > 0 ? o.set(s.id, r) : o.delete(s.id);
  }
  return o;
}
function zt(e, t) {
  var s, r, i, a, c, u;
  const { state: n, getNodePorts: o } = W();
  return d.useMemo(() => {
    const p = n.nodes[e];
    if (!p) return;
    const h = {
      ...p,
      ports: o(e)
    };
    return Ve(h).get(t);
  }, [
    (s = n.nodes[e]) == null ? void 0 : s.position.x,
    (r = n.nodes[e]) == null ? void 0 : r.position.y,
    (a = (i = n.nodes[e]) == null ? void 0 : i.size) == null ? void 0 : a.width,
    (u = (c = n.nodes[e]) == null ? void 0 : c.size) == null ? void 0 : u.height,
    e,
    t,
    o
  ]);
}
function Se(e, t) {
  const n = zt(e, t);
  return n == null ? void 0 : n.connectionPoint;
}
function nt(e, t) {
  if (e.ports)
    return e.ports;
  const n = t.ports || [], o = e;
  return n.map((s) => {
    var a;
    const r = {
      id: s.id,
      type: s.type,
      label: s.label,
      nodeId: e.id,
      position: s.position,
      dataType: s.dataType,
      maxConnections: s.maxConnections
    }, i = (a = o.portOverrides) == null ? void 0 : a.find(
      (c) => c.portId === s.id
    );
    if (i) {
      if (i.disabled)
        return null;
      i.maxConnections !== void 0 && (r.maxConnections = i.maxConnections), i.allowedNodeTypes && (r.allowedNodeTypes = i.allowedNodeTypes), i.allowedPortTypes && (r.allowedPortTypes = i.allowedPortTypes);
    }
    return r;
  }).filter((s) => s !== null);
}
function vo(e, t, n) {
  return nt(e, n).find((s) => s.id === t);
}
function bo(e, t) {
  const n = /* @__PURE__ */ new Map();
  for (const o of Object.values(e)) {
    const s = t(o.type);
    if (!s) continue;
    const r = nt(o, s);
    for (const i of r) {
      const a = `${o.id}:${i.id}`;
      n.set(a, { node: o, port: i });
    }
  }
  return n;
}
function xo() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  return {
    getNodePorts(n, o) {
      const s = n.id;
      if (e.has(s))
        return e.get(s);
      const r = nt(n, o);
      return e.set(s, r), r;
    },
    getPort(n, o, s) {
      const r = `${n.id}:${o}`;
      if (t.has(r))
        return t.get(r);
      const i = vo(n, o, s);
      return t.set(r, i), i;
    },
    createPortLookupMap(n, o) {
      return bo(n, o);
    },
    clearCache() {
      e.clear(), t.clear();
    },
    clearNodeCache(n) {
      e.delete(n);
      const o = [];
      t.forEach((s, r) => {
        r.startsWith(`${n}:`) && o.push(r);
      }), o.forEach((s) => t.delete(s));
    }
  };
}
const Rt = {
  version: 2,
  portsStorageMethod: "inferred"
}, No = {
  version: 1,
  portsStorageMethod: "embedded"
};
function Co(e) {
  return e.formatVersion ? e.formatVersion.portsStorageMethod === "embedded" : !0;
}
function So(e, t) {
  const n = [];
  let o = 0, s = 0, r = 0;
  const i = {};
  for (const [c, u] of Object.entries(e.nodes)) {
    if (o++, !u.ports || u.ports.length === 0) {
      i[c] = u;
      continue;
    }
    const p = t == null ? void 0 : t.get(u.type);
    p || n.push(
      `Node ${c} (type: ${u.type}) has no definition in registry. Ports will be removed without creating overrides.`
    );
    const h = [];
    if (p && p.ports)
      for (const f of u.ports) {
        const g = p.ports.find((E) => E.id === f.id);
        if (!g) {
          n.push(
            `Port ${f.id} on node ${c} not found in definition. It will be lost during migration.`
          );
          continue;
        }
        const x = { portId: f.id };
        let P = !1;
        f.maxConnections !== void 0 && f.maxConnections !== g.maxConnections && (x.maxConnections = f.maxConnections, P = !0), f.allowedNodeTypes && (x.allowedNodeTypes = f.allowedNodeTypes, P = !0), f.allowedPortTypes && (x.allowedPortTypes = f.allowedPortTypes, P = !0), P && (h.push(x), r++);
      }
    const { ports: v, ...y } = u;
    s += v.length;
    const b = {
      ...y,
      ...h.length > 0 ? { portOverrides: h } : {}
    };
    i[c] = b;
  }
  return {
    data: {
      nodes: i,
      connections: e.connections,
      formatVersion: Rt
    },
    statistics: {
      nodesProcessed: o,
      portsRemoved: s,
      portOverridesCreated: r
    },
    warnings: n
  };
}
function Eo(e, t = !0) {
  if (!t)
    return {
      ...e,
      formatVersion: No
    };
  const n = {};
  for (const [o, s] of Object.entries(e.nodes)) {
    const { ports: r, ...i } = s;
    n[o] = i;
  }
  return {
    nodes: n,
    connections: e.connections,
    formatVersion: Rt
  };
}
function wo(e, t, n = !0) {
  if (!Co(e) || !n)
    return { data: e, migrated: !1 };
  const o = So(e, t);
  return {
    data: o.data,
    migrated: !0,
    migrationResult: o
  };
}
const at = {
  useInferredPortsOnly: !1,
  showMigrationWarnings: !0,
  autoMigrateOnLoad: !0,
  saveInNewFormat: !0
};
function Io() {
  if (typeof process < "u" && process.env)
    return {
      useInferredPortsOnly: process.env.NODE_EDITOR_USE_INFERRED_PORTS_ONLY === "true",
      showMigrationWarnings: process.env.NODE_EDITOR_SHOW_MIGRATION_WARNINGS !== "false",
      autoMigrateOnLoad: process.env.NODE_EDITOR_AUTO_MIGRATE !== "false",
      saveInNewFormat: process.env.NODE_EDITOR_SAVE_NEW_FORMAT !== "false"
    };
  if (typeof window < "u" && window.localStorage)
    try {
      const e = window.localStorage.getItem("nodeEditorFeatureFlags");
      if (e)
        return { ...at, ...JSON.parse(e) };
    } catch (e) {
      console.warn("Failed to parse feature flags from localStorage", e);
    }
  return at;
}
const ct = (e, t) => {
  switch (t.type) {
    case "ADD_NODE": {
      const n = Me(), o = { ...t.payload.node, id: n };
      return {
        ...e,
        nodes: {
          ...e.nodes,
          [n]: o
        }
      };
    }
    case "UPDATE_NODE": {
      const { nodeId: n, updates: o } = t.payload, s = e.nodes[n];
      return s ? {
        ...e,
        nodes: {
          ...e.nodes,
          [n]: { ...s, ...o }
        }
      } : e;
    }
    case "DELETE_NODE": {
      const { nodeId: n } = t.payload, { [n]: o, ...s } = e.nodes, r = Object.entries(e.connections).reduce((i, [a, c]) => (c.fromNodeId !== n && c.toNodeId !== n && (i[a] = c), i), {});
      return {
        ...e,
        nodes: s,
        connections: r
      };
    }
    case "MOVE_NODE": {
      const { nodeId: n, position: o } = t.payload, s = e.nodes[n];
      return s ? {
        ...e,
        nodes: {
          ...e.nodes,
          [n]: { ...s, position: o }
        }
      } : e;
    }
    case "MOVE_NODES": {
      const { updates: n } = t.payload, o = { ...e.nodes };
      return Object.entries(n).forEach(([s, r]) => {
        const i = o[s];
        i && (o[s] = { ...i, position: r });
      }), {
        ...e,
        nodes: o
      };
    }
    case "ADD_CONNECTION": {
      const { connection: n } = t.payload, o = Me(), s = Object.entries(e.connections).filter(
        ([i, a]) => a.toNodeId === n.toNodeId && a.toPortId === n.toPortId
      ), r = { ...e.connections };
      return s.forEach(([i]) => {
        delete r[i];
      }), {
        ...e,
        connections: {
          ...r,
          [o]: { ...n, id: o }
        }
      };
    }
    case "DELETE_CONNECTION": {
      const { connectionId: n } = t.payload, { [n]: o, ...s } = e.connections;
      return {
        ...e,
        connections: s
      };
    }
    case "SET_NODE_DATA":
      return t.payload.data;
    case "RESTORE_STATE":
      return t.payload.data;
    case "DUPLICATE_NODES": {
      const { nodeIds: n } = t.payload;
      if (n.length === 0) return e;
      const o = { ...e.nodes }, s = [];
      return n.forEach((r) => {
        const i = e.nodes[r];
        if (!i) return;
        const a = Me();
        s.push(a);
        const c = {
          ...i,
          id: a,
          position: {
            x: i.position.x + 50,
            y: i.position.y + 50
          },
          data: {
            ...i.data,
            title: i.data.title ? `${i.data.title} Copy` : "Node Copy",
            createdAt: Date.now()
            // Track creation time for selection
          }
          // Ports are no longer duplicated - they will be inferred from NodeDefinition
        };
        c.type === "group" && (c.children = []), o[a] = c;
      }), {
        ...e,
        nodes: o,
        // Store duplicated node IDs for selection
        lastDuplicatedNodeIds: s
      };
    }
    case "GROUP_NODES": {
      const { nodeIds: n, groupId: o = Me() } = t.payload;
      if (n.length === 0) return e;
      let s = 1 / 0, r = 1 / 0, i = -1 / 0, a = -1 / 0;
      n.forEach((u) => {
        var h, v;
        const p = e.nodes[u];
        p && (s = Math.min(s, p.position.x), r = Math.min(r, p.position.y), i = Math.max(i, p.position.x + (((h = p.size) == null ? void 0 : h.width) || 100)), a = Math.max(a, p.position.y + (((v = p.size) == null ? void 0 : v.height) || 50)));
      });
      const c = {
        id: o,
        type: "group",
        position: { x: s - 20, y: r - 40 },
        size: { width: i - s + 40, height: a - r + 60 },
        data: { title: "Group" },
        children: n,
        expanded: !0
      };
      return {
        ...e,
        nodes: {
          ...e.nodes,
          [o]: c
        }
      };
    }
    case "UNGROUP_NODE": {
      const { groupId: n } = t.payload, o = e.nodes[n];
      if (!o || o.type !== "group") return e;
      const { [n]: s, ...r } = e.nodes;
      return {
        ...e,
        nodes: r
      };
    }
    case "UPDATE_GROUP_MEMBERSHIP": {
      const { updates: n } = t.payload, o = { ...e.nodes };
      return Object.entries(n).forEach(([s, r]) => {
        const i = o[s];
        i && (o[s] = { ...i, ...r });
      }), {
        ...e,
        nodes: o
      };
    }
    case "MOVE_GROUP_WITH_CHILDREN": {
      const { groupId: n, delta: o } = t.payload, s = { ...e.nodes }, r = s[n];
      return r && (s[n] = {
        ...r,
        position: {
          x: r.position.x + o.x,
          y: r.position.y + o.y
        }
      }, Object.values(s).forEach((i) => {
        i.parentId === n && (s[i.id] = {
          ...i,
          position: {
            x: i.position.x + o.x,
            y: i.position.y + o.y
          }
        });
      })), {
        ...e,
        nodes: s
      };
    }
    case "AUTO_LAYOUT": {
      const { layoutType: n, selectedOnly: o = !1 } = t.payload;
      return o && (Object.fromEntries(
        Object.entries(e.nodes).filter(
          ([s, r]) => (
            // This will be filtered by selected nodes in the hook
            !0
          )
        )
      ), e.connections), e;
    }
    default:
      return e;
  }
};
function Me() {
  return Math.random().toString(36).slice(2, 10);
}
const dt = {
  nodes: {},
  connections: {}
}, lt = {
  addNode: (e) => ({
    type: "ADD_NODE",
    payload: { node: e }
  }),
  updateNode: (e, t) => ({
    type: "UPDATE_NODE",
    payload: { nodeId: e, updates: t }
  }),
  deleteNode: (e) => ({
    type: "DELETE_NODE",
    payload: { nodeId: e }
  }),
  moveNode: (e, t) => ({
    type: "MOVE_NODE",
    payload: { nodeId: e, position: t }
  }),
  moveNodes: (e) => ({
    type: "MOVE_NODES",
    payload: { updates: e }
  }),
  addConnection: (e) => ({
    type: "ADD_CONNECTION",
    payload: { connection: e }
  }),
  deleteConnection: (e) => ({
    type: "DELETE_CONNECTION",
    payload: { connectionId: e }
  }),
  setNodeData: (e) => ({
    type: "SET_NODE_DATA",
    payload: { data: e }
  }),
  restoreState: (e) => ({
    type: "RESTORE_STATE",
    payload: { data: e }
  }),
  duplicateNodes: (e) => ({
    type: "DUPLICATE_NODES",
    payload: { nodeIds: e }
  }),
  groupNodes: (e, t) => ({
    type: "GROUP_NODES",
    payload: { nodeIds: e, groupId: t }
  }),
  ungroupNode: (e) => ({
    type: "UNGROUP_NODE",
    payload: { groupId: e }
  }),
  updateGroupMembership: (e) => ({
    type: "UPDATE_GROUP_MEMBERSHIP",
    payload: { updates: e }
  }),
  moveGroupWithChildren: (e, t) => ({
    type: "MOVE_GROUP_WITH_CHILDREN",
    payload: { groupId: e, delta: t }
  }),
  autoLayout: (e, t) => ({
    type: "AUTO_LAYOUT",
    payload: { layoutType: e, selectedOnly: t }
  })
}, Lt = d.createContext(null), Do = ({
  children: e,
  initialState: t,
  controlledData: n,
  onDataChange: o,
  onLoad: s,
  onSave: r,
  settingsManager: i
}) => {
  const a = d.useContext(qe), c = a == null ? void 0 : a.registry, u = d.useMemo(() => Io(), []), p = d.useMemo(() => xo(), []), h = d.useMemo(() => ({
    nodes: (t == null ? void 0 : t.nodes) || dt.nodes,
    connections: (t == null ? void 0 : t.connections) || dt.connections
  }), [t]), [v, y] = d.useReducer(ct, h), b = n || v, f = d.useRef(o);
  f.current = o;
  const g = d.useCallback(
    (k) => {
      if (!n)
        y(k);
      else if (f.current) {
        const O = ct(b, k);
        f.current(O);
      }
    },
    [n, b]
  ), [x, P] = d.useState(!1), [E, I] = d.useState(!1), M = Ot(i), { autoSave: m, autoSaveInterval: N } = M;
  d.useEffect(() => {
    s && !x && (P(!0), Promise.resolve(s()).then((k) => {
      const { data: O, migrated: A, migrationResult: $ } = wo(
        k,
        c,
        u.autoMigrateOnLoad
      );
      A && $ && u.showMigrationWarnings && (console.log("Node editor data migrated successfully:", $.statistics), $.warnings.length > 0 && console.warn("Migration warnings:", $.warnings)), g(lt.setNodeData(O));
    }).catch((k) => {
      console.error("Failed to load node editor data:", k);
    }).finally(() => {
      P(!1);
    }));
  }, [u]);
  const C = d.useCallback(async () => {
    if (r && !E) {
      I(!0);
      try {
        const k = Eo(b, u.saveInNewFormat);
        await Promise.resolve(r(k));
      } catch (k) {
        console.error("Failed to save node editor data:", k);
      } finally {
        I(!1);
      }
    }
  }, [r, b, E]);
  d.useEffect(() => {
    if (!m || !r) return;
    const k = setInterval(() => {
      E || C();
    }, N * 1e3);
    return () => clearInterval(k);
  }, [m, N, C, E]);
  const D = d.useCallback(
    (k) => {
      const O = b.nodes[k];
      if (!O) return [];
      if (u.useInferredPortsOnly) {
        if (!c)
          return console.error("NodeDefinitionRegistry is required when useInferredPortsOnly is enabled"), [];
        const A = c.get(O.type);
        return A ? p.getNodePorts(O, A) : (console.warn(`No definition found for node type: ${O.type}`), []);
      }
      if (c) {
        const A = c.get(O.type);
        if (A)
          return p.getNodePorts(O, A);
      }
      return O.ports || [];
    },
    [b.nodes, c, p, u.useInferredPortsOnly]
  ), z = d.useCallback(
    (k, O) => {
      var $;
      const A = b.nodes[k];
      if (A) {
        if (u.useInferredPortsOnly) {
          if (!c) {
            console.error("NodeDefinitionRegistry is required when useInferredPortsOnly is enabled");
            return;
          }
          const V = c.get(A.type);
          if (!V) {
            console.warn(`No definition found for node type: ${A.type}`);
            return;
          }
          return p.getPort(A, O, V);
        }
        if (c) {
          const V = c.get(A.type);
          if (V)
            return p.getPort(A, O, V);
        }
        return ($ = A.ports) == null ? void 0 : $.find((V) => V.id === O);
      }
    },
    [b.nodes, c, p, u.useInferredPortsOnly]
  ), _ = d.useMemo(() => {
    if (u.useInferredPortsOnly)
      return c ? p.createPortLookupMap(
        b.nodes,
        (k) => c.get(k)
      ) : (console.error("NodeDefinitionRegistry is required when useInferredPortsOnly is enabled"), /* @__PURE__ */ new Map());
    if (!c) {
      const k = /* @__PURE__ */ new Map();
      for (const O of Object.values(b.nodes)) {
        const A = O.ports || [];
        for (const $ of A) {
          const V = `${O.id}:${$.id}`;
          k.set(V, { node: O, port: $ });
        }
      }
      return k;
    }
    return p.createPortLookupMap(
      b.nodes,
      (k) => c.get(k)
    );
  }, [b.nodes, c, p, u.useInferredPortsOnly]);
  d.useEffect(() => {
    p.clearCache();
  }, [b.nodes, p]);
  const S = d.useMemo(() => ({
    state: b,
    dispatch: g,
    actions: lt,
    isLoading: x,
    isSaving: E,
    handleSave: C,
    getNodePorts: D,
    getPort: z,
    portLookupMap: _
  }), [b, g, x, E, C, D, z, _]);
  return /* @__PURE__ */ l(Lt.Provider, { value: S, children: e });
}, W = () => {
  const e = d.useContext(Lt);
  if (!e)
    throw new Error("useNodeEditor must be used within a NodeEditorProvider");
  return e;
}, Po = (e, t) => {
  switch (t.type) {
    case "PUSH_ENTRY": {
      if (!e.isRecording) return e;
      const { action: n, data: o } = t.payload, s = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        action: n,
        data: JSON.parse(JSON.stringify(o))
        // Deep clone
      }, a = [...e.entries.slice(0, e.currentIndex + 1), s].slice(-e.maxEntries);
      return {
        ...e,
        entries: a,
        currentIndex: a.length - 1
      };
    }
    case "UNDO":
      return e.currentIndex <= 0 ? e : {
        ...e,
        currentIndex: e.currentIndex - 1
      };
    case "REDO":
      return e.currentIndex >= e.entries.length - 1 ? e : {
        ...e,
        currentIndex: e.currentIndex + 1
      };
    case "CLEAR_HISTORY":
      return {
        ...e,
        entries: [],
        currentIndex: -1
      };
    case "SET_RECORDING":
      return {
        ...e,
        isRecording: t.payload.isRecording
      };
    case "SET_MAX_ENTRIES": {
      const { maxEntries: n } = t.payload, o = e.entries.slice(-n);
      return {
        ...e,
        maxEntries: n,
        entries: o,
        currentIndex: Math.min(e.currentIndex, o.length - 1)
      };
    }
    default:
      return e;
  }
}, ko = {
  entries: [],
  currentIndex: -1,
  maxEntries: 50,
  isRecording: !0
}, Te = {
  pushEntry: (e, t) => ({
    type: "PUSH_ENTRY",
    payload: { action: e, data: t }
  }),
  undo: () => ({
    type: "UNDO"
  }),
  redo: () => ({
    type: "REDO"
  }),
  clearHistory: () => ({
    type: "CLEAR_HISTORY"
  }),
  setRecording: (e) => ({
    type: "SET_RECORDING",
    payload: { isRecording: e }
  }),
  setMaxEntries: (e) => ({
    type: "SET_MAX_ENTRIES",
    payload: { maxEntries: e }
  })
}, Vt = d.createContext(null), Mo = ({
  children: e,
  initialState: t
}) => {
  const [n, o] = d.useReducer(
    Po,
    { ...ko, ...t }
  ), s = n.currentIndex > 0, r = n.currentIndex < n.entries.length - 1, i = n.currentIndex >= 0 ? n.entries[n.currentIndex] : null, a = d.useCallback(
    (h, v) => {
      o(Te.pushEntry(h, v));
    },
    [o]
  ), c = d.useCallback(() => s ? (o(Te.undo()), n.entries[n.currentIndex - 1] || null) : null, [s, n.entries, n.currentIndex, o]), u = d.useCallback(() => r ? (o(Te.redo()), n.entries[n.currentIndex + 1] || null) : null, [r, n.entries, n.currentIndex, o]), p = {
    state: n,
    dispatch: o,
    actions: Te,
    canUndo: s,
    canRedo: r,
    currentEntry: i,
    pushEntry: a,
    undo: c,
    redo: u
  };
  return /* @__PURE__ */ l(Vt.Provider, { value: p, children: e });
}, To = () => {
  const e = d.useContext(Vt);
  if (!e)
    throw new Error("useHistory must be used within a HistoryProvider");
  return e;
}, Oo = () => {
  const { state: e, dispatch: t, actions: n } = W(), { pushEntry: o, undo: s, redo: r, canUndo: i, canRedo: a } = To(), c = d.useRef(e), u = d.useRef(null);
  d.useEffect(() => {
    const y = e, b = c.current;
    if (b === y || JSON.stringify(b) === JSON.stringify(y))
      return;
    const f = u.current || "Unknown Action";
    o(f, b), c.current = y, u.current = null;
  }, [e, o]);
  const p = d.useCallback((y) => {
    y && typeof y == "object" && y.type && (u.current = y.type), t(y);
  }, [t]), h = d.useCallback(() => {
    if (!i) return !1;
    const y = s();
    return y ? (u.current = null, c.current = y.data, t(n.restoreState(y.data)), !0) : !1;
  }, [i, s, t, n]), v = d.useCallback(() => {
    if (!a) return !1;
    const y = r();
    return y ? (u.current = null, c.current = y.data, t(n.restoreState(y.data)), !0) : !1;
  }, [a, r, t, n]);
  return {
    dispatchWithHistory: p,
    performUndo: h,
    performRedo: v,
    canUndo: i,
    canRedo: a
  };
}, Ao = {
  iterations: 100,
  springLength: 150,
  springStrength: 0.3,
  repulsionStrength: 1e3,
  dampening: 0.9,
  maxForce: 50,
  padding: 100
};
function zo(e, t = {}) {
  const n = { ...Ao, ...t }, o = Object.values(e.nodes), s = Object.values(e.connections);
  if (o.length === 0)
    return { nodePositions: {}, iterations: 0 };
  if (o.length === 1)
    return {
      nodePositions: { [o[0].id]: { x: 0, y: 0 } },
      iterations: 0
    };
  const r = {}, i = {};
  o.forEach((p, h) => {
    if (p.position)
      r[p.id] = { ...p.position };
    else {
      const v = h / o.length * 2 * Math.PI, y = Math.sqrt(o.length) * 50;
      r[p.id] = {
        x: Math.cos(v) * y,
        y: Math.sin(v) * y
      };
    }
    i[p.id] = { x: 0, y: 0 };
  });
  const a = {};
  o.forEach((p) => {
    a[p.id] = /* @__PURE__ */ new Set();
  }), s.forEach((p) => {
    a[p.fromNodeId] && a[p.toNodeId] && (a[p.fromNodeId].add(p.toNodeId), a[p.toNodeId].add(p.fromNodeId));
  });
  let c = 0;
  for (let p = 0; p < n.iterations; p++) {
    c++;
    const h = {};
    o.forEach((b) => {
      h[b.id] = { x: 0, y: 0 };
    });
    for (let b = 0; b < o.length; b++)
      for (let f = b + 1; f < o.length; f++) {
        const g = o[b], x = o[f], P = r[g.id], E = r[x.id], I = E.x - P.x, M = E.y - P.y, m = Math.sqrt(I * I + M * M);
        if (m < 0.01) continue;
        const N = n.repulsionStrength / (m * m), C = I / m * N, D = M / m * N;
        h[g.id].x -= C, h[g.id].y -= D, h[x.id].x += C, h[x.id].y += D;
      }
    s.forEach((b) => {
      const f = r[b.fromNodeId], g = r[b.toNodeId];
      if (!f || !g) return;
      const x = g.x - f.x, P = g.y - f.y, E = Math.sqrt(x * x + P * P);
      if (E < 0.01) return;
      const I = n.springStrength * (E - n.springLength), M = x / E * I, m = P / E * I;
      h[b.fromNodeId].x += M, h[b.fromNodeId].y += m, h[b.toNodeId].x -= M, h[b.toNodeId].y -= m;
    });
    let v = 0;
    if (o.forEach((b) => {
      const f = h[b.id], g = Math.sqrt(f.x * f.x + f.y * f.y);
      g > n.maxForce && (f.x = f.x / g * n.maxForce, f.y = f.y / g * n.maxForce), i[b.id].x = i[b.id].x * n.dampening + f.x, i[b.id].y = i[b.id].y * n.dampening + f.y;
      const x = { ...r[b.id] };
      r[b.id].x += i[b.id].x, r[b.id].y += i[b.id].y;
      const P = Math.sqrt(
        Math.pow(r[b.id].x - x.x, 2) + Math.pow(r[b.id].y - x.y, 2)
      );
      v += P;
    }), v / o.length < 0.1)
      break;
  }
  const u = Object.keys(r);
  if (u.length > 0) {
    let p = 1 / 0, h = -1 / 0, v = 1 / 0, y = -1 / 0;
    u.forEach((g) => {
      const x = r[g];
      p = Math.min(p, x.x), h = Math.max(h, x.x), v = Math.min(v, x.y), y = Math.max(y, x.y);
    });
    const b = (p + h) / 2, f = (v + y) / 2;
    u.forEach((g) => {
      r[g].x = r[g].x - b + n.padding, r[g].y = r[g].y - f + n.padding;
    });
  }
  return {
    nodePositions: r,
    iterations: c
  };
}
function Ro(e, t = {}) {
  const { spacing: n = 200, layerHeight: o = 150 } = t, s = Object.values(e.nodes), r = Object.values(e.connections);
  if (s.length === 0)
    return { nodePositions: {}, iterations: 0 };
  const i = {}, a = {};
  s.forEach((f) => {
    i[f.id] = /* @__PURE__ */ new Set(), a[f.id] = /* @__PURE__ */ new Set();
  }), r.forEach((f) => {
    i[f.fromNodeId] && a[f.toNodeId] && (i[f.fromNodeId].add(f.toNodeId), a[f.toNodeId].add(f.fromNodeId));
  });
  const c = s.filter((f) => a[f.id].size === 0);
  if (c.length === 0) {
    const f = Math.min(...s.map((g) => a[g.id].size));
    c.push(...s.filter((g) => a[g.id].size === f));
  }
  const u = [], p = {}, h = /* @__PURE__ */ new Set();
  u[0] = c.map((f) => f.id), c.forEach((f) => {
    p[f.id] = 0, h.add(f.id);
  });
  let v = 0;
  for (; u[v] && u[v].length > 0; ) {
    const f = [];
    if (u[v].forEach((g) => {
      i[g].forEach((x) => {
        h.has(x) || (f.push(x), p[x] = v + 1, h.add(x));
      });
    }), f.length > 0)
      u[v + 1] = f, v++;
    else
      break;
  }
  const y = s.filter((f) => !h.has(f.id));
  y.length > 0 && (u[v + 1] || (u[v + 1] = []), u[v + 1].push(...y.map((f) => f.id)), y.forEach((f) => {
    p[f.id] = v + 1;
  }));
  const b = {};
  return u.forEach((f, g) => {
    const x = g * o, E = -((f.length - 1) * n) / 2;
    f.forEach((I, M) => {
      b[I] = {
        x: E + M * n,
        y: x
      };
    });
  }), {
    nodePositions: b,
    iterations: u.length
  };
}
function Lo(e, t = {}) {
  const { spacing: n = 200, columns: o } = t, s = Object.values(e.nodes);
  if (s.length === 0)
    return { nodePositions: {}, iterations: 0 };
  const r = o || Math.ceil(Math.sqrt(s.length)), i = Math.ceil(s.length / r), a = {};
  return s.forEach((c, u) => {
    const p = Math.floor(u / r), h = u % r, v = (r - 1) * n, y = (i - 1) * n;
    a[c.id] = {
      x: h * n - v / 2,
      y: p * n - y / 2
    };
  }), {
    nodePositions: a,
    iterations: 0
  };
}
const Vo = () => {
  const { state: e, dispatch: t, actions: n } = W(), { state: o } = Z(), s = d.useCallback((c = !1) => {
    console.log("Applying force-directed layout");
    const p = {
      nodes: c ? Object.fromEntries(
        Object.entries(e.nodes).filter(
          ([v]) => o.selectedNodeIds.includes(v)
        )
      ) : e.nodes,
      connections: e.connections
    }, h = zo(p, {
      iterations: 150,
      springLength: 200,
      springStrength: 0.4,
      repulsionStrength: 2e3,
      dampening: 0.85
    });
    Object.keys(h.nodePositions).length > 0 && t(n.moveNodes(h.nodePositions));
  }, [e, o.selectedNodeIds, t, n]), r = d.useCallback((c = !1) => {
    console.log("Applying hierarchical layout");
    const p = {
      nodes: c ? Object.fromEntries(
        Object.entries(e.nodes).filter(
          ([v]) => o.selectedNodeIds.includes(v)
        )
      ) : e.nodes,
      connections: e.connections
    }, h = Ro(p, {
      spacing: 250,
      layerHeight: 200
    });
    Object.keys(h.nodePositions).length > 0 && t(n.moveNodes(h.nodePositions));
  }, [e, o.selectedNodeIds, t, n]), i = d.useCallback((c = !1) => {
    console.log("Applying grid layout");
    const u = c ? Object.fromEntries(
      Object.entries(e.nodes).filter(
        ([v]) => o.selectedNodeIds.includes(v)
      )
    ) : e.nodes, p = {
      nodes: u,
      connections: e.connections
    }, h = Lo(p, {
      spacing: 250,
      columns: Math.ceil(Math.sqrt(Object.keys(u).length))
    });
    Object.keys(h.nodePositions).length > 0 && t(n.moveNodes(h.nodePositions));
  }, [e, o.selectedNodeIds, t, n]);
  return {
    applyLayout: d.useCallback((c, u = !1) => {
      switch (c) {
        case "force":
          s(u);
          break;
        case "hierarchical":
          r(u);
          break;
        case "grid":
          i(u);
          break;
        default:
          console.warn(`Unknown layout type: ${c}`);
      }
    }, [s, r, i]),
    applyForceLayout: s,
    applyHierarchicalLayout: r,
    applyGridLayout: i
  };
}, $o = () => {
  const { state: e, dispatch: t, actions: n } = W(), { state: o, dispatch: s, actions: r } = Z(), { performUndo: i, performRedo: a, canUndo: c, canRedo: u } = Oo(), { applyLayout: p } = Vo();
  ce(
    { key: "Delete" },
    d.useCallback(() => {
      console.log("Delete shortcut triggered"), o.selectedNodeIds.length > 0 ? (o.selectedNodeIds.forEach((h) => {
        t(n.deleteNode(h));
      }), s(r.clearSelection())) : o.selectedConnectionIds.length > 0 && (o.selectedConnectionIds.forEach((h) => {
        t(n.deleteConnection(h));
      }), s(r.clearSelection()));
    }, [o.selectedNodeIds, o.selectedConnectionIds, t, n, s, r])
  ), ce(
    { key: "Backspace" },
    d.useCallback(() => {
      console.log("Backspace shortcut triggered"), o.selectedNodeIds.length > 0 ? (o.selectedNodeIds.forEach((h) => {
        t(n.deleteNode(h));
      }), s(r.clearSelection())) : o.selectedConnectionIds.length > 0 && (o.selectedConnectionIds.forEach((h) => {
        t(n.deleteConnection(h));
      }), s(r.clearSelection()));
    }, [o.selectedNodeIds, o.selectedConnectionIds, t, n, s, r])
  ), ce(
    { key: "a", ctrl: !0 },
    d.useCallback(() => {
      console.log("Select All shortcut triggered");
      const h = Object.keys(e.nodes);
      s(r.selectAllNodes(h));
    }, [e.nodes, s, r])
  ), ce(
    { key: "Escape" },
    d.useCallback(() => {
      console.log("Escape shortcut triggered"), s(r.clearSelection());
    }, [s, r])
  ), ce(
    { key: "n", ctrl: !0 },
    d.useCallback(() => {
      console.log("Add Node shortcut triggered");
      const h = `node-${Date.now()}`, v = {
        title: "New Node",
        type: "default",
        position: { x: 100, y: 100 },
        data: { title: "New Node" },
        ports: [
          {
            id: `port-input-${Date.now()}`,
            type: "input",
            label: "Input",
            position: "left",
            nodeId: h
          },
          {
            id: `port-output-${Date.now()}`,
            type: "output",
            label: "Output",
            position: "right",
            nodeId: h
          }
        ]
      };
      t(n.addNode(v));
    }, [t, n])
  ), ce(
    { key: "d", ctrl: !0 },
    d.useCallback(() => {
      console.log("Duplicate shortcut triggered"), o.selectedNodeIds.length > 0 && t(n.duplicateNodes(o.selectedNodeIds));
    }, [o.selectedNodeIds, t, n])
  ), d.useEffect(() => {
    e.lastDuplicatedNodeIds && e.lastDuplicatedNodeIds.length > 0 && (s(r.selectAllNodes(e.lastDuplicatedNodeIds)), t(n.setNodeData({
      ...e,
      lastDuplicatedNodeIds: void 0
    })));
  }, [e.lastDuplicatedNodeIds, s, r, t, n, e]), ce(
    { key: "s", ctrl: !0 },
    d.useCallback((h) => {
      console.log("Save shortcut triggered"), console.log("Save not yet implemented");
    }, [])
  ), ce(
    { key: "l", ctrl: !0 },
    d.useCallback(() => {
      console.log("Auto Layout shortcut triggered");
      const h = o.selectedNodeIds.length > 0;
      p("force", h);
    }, [o.selectedNodeIds, p])
  ), ce(
    { key: "z", ctrl: !0 },
    d.useCallback(() => {
      console.log("Undo shortcut triggered"), c && i();
    }, [c, i])
  ), ce(
    { key: "z", ctrl: !0, shift: !0 },
    d.useCallback(() => {
      console.log("Redo shortcut triggered"), u && a();
    }, [u, a])
  ), ce(
    { key: "y", ctrl: !0 },
    d.useCallback(() => {
      console.log("Redo (Ctrl+Y) shortcut triggered"), u && a();
    }, [u, a])
  );
}, _o = "xtnnddtrnodedibas", Ho = "xtnnddtrcnt", Bo = "xtnnddtrcanvas", Go = "xtnnddtrpanning", Xo = "xtnnddtrspapan", Uo = "xtnnddtrnodes", Yo = "xtnnddtrnode", Fo = "xtnnddtrlocked", jo = "xtnnddtrsel", Wo = "xtnnddtrdrg", Ko = "xtnnddtrnodehdr", Zo = "xtnnddtrintdra", qo = "xtnnddtrnod", Jo = "xtnnddtrlockico", Qo = "xtnnddtrnodectn", es = "xtnnddtrgrpNode", ts = "xtnnddtrcold", ns = "xtnnddtrgrpcold", os = "xtnnddtrgrpexped", ss = "xtnnddtrnodeinf", rs = "xtnnddtrnodesuc", is = "xtnnddtrnodewrn", as = "xtnnddtrnodeerr", cs = "xtnnddtrnodedis", ds = "xtnnddtrtbr", ls = "xtnnddtrtoolbtn", us = "xtnnddtrconmen", ps = "xtnnddtrconmenrax", hs = "xtnnddtrgrid", fs = "xtnnddtrins", gs = "xtnnddtrinscIz", ms = "xtnnddtrinszAn", ys = "xtnnddtrinssec", vs = "xtnnddtrinsrow", bs = "xtnnddtrediwitins", xs = "xtnnddtredimai", Ns = "xtnnddtrextdat", Cs = "xtnnddtrdragui", Ss = "xtnnddtrdraguiVp7", Es = "xtnnddtrdraguiPHl", ws = "xtnnddtrdragui-eW", Is = "xtnnddtrsnatar", Ds = "xtnnddtrdis", Ps = "xtnnddtrdislin", ks = "xtnnddtrstabar", Ms = "xtnnddtrstasec", Ts = "xtnnddtrsta", Os = "xtnnddtrstaval", As = "xtnnddtrstamod", zs = "xtnnddtrnodePort", Rs = "xtnnddtrportinp", Ls = "xtnnddtrporout", Vs = "xtnnddtrporinn", $s = "xtnnddtrportlbl", _s = "xtnnddtrportLeft", Hs = "xtnnddtrporrig", Bs = "xtnnddtrportTop", Gs = "xtnnddtrporbot", Xs = "xtnnddtrcon", Us = "xtnnddtrinstab", Ys = "xtnnddtrinstab5EW", Fs = "xtnnddtract", js = "xtnnddtrinsnopad", Ws = "xtnnddtrinsfie", Ks = "xtnnddtrinsj42", Zs = "xtnnddtrinskYN", qs = "xtnnddtrinspos", Js = "xtnnddtrinsnum", Qs = "xtnnddtrinsreaonlfie", er = "xtnnddtrinssta", tr = "xtnnddtrcan", nr = "xtnnddtrboxsel", or = "xtnnddtrgridSvg", sr = "xtnnddtredi", rr = "xtnnddtrediA9y", ir = "xtnnddtrediPTx", ar = "xtnnddtredi-tX", cr = "xtnnddtrtoptbr", dr = "xtnnddtrnodlay", lr = "xtnnddtrnodeView", ur = "xtnnddtrnodtit", pr = "xtnnddtrnodtitpsF", hr = "xtnnddtrgrpaccdro", fr = "xtnnddtrgrpPulse", gr = "xtnnddtrgrphaschi", mr = "xtnnddtrnodpor", yr = "xtnnddtrport", vr = "xtnnddtrporhov", br = "xtnnddtrporcon", xr = "xtnnddtrpulse", Nr = "xtnnddtrporcon7Fy", Cr = "xtnnddtrporlef", Sr = "xtnnddtrporrigtpL", Er = "xtnnddtrportop", wr = "xtnnddtrporbotsMk", Ir = "xtnnddtrconlay", Dr = "xtnnddtrconhUO", Pr = "xtnnddtrcongay", kr = "xtnnddtrconhov", Mr = "xtnnddtrconDHx", Tr = "xtnnddtrdracon", Or = "xtnnddtrdasani", Ar = "xtnnddtrselbox", zr = "xtnnddtrseldzq", Rr = "xtnnddtrldgovr", Lr = "xtnnddtrldgind", Vr = "xtnnddtrcusnod", $r = "xtnnddtrres", _r = "xtnnddtrresVnb", Hr = "xtnnddtrmin", Br = "xtnnddtrminimap", Gr = "xtnnddtrmintit", Xr = "xtnnddtrminont", Ur = "xtnnddtrminvie", Yr = "xtnnddtrminnod", Fr = "xtnnddtrdarthe", jr = "xtnnddtrsmoani", Wr = "xtnnddtrstasav", Kr = "xtnnddtruiovrcnt", Zr = "xtnnddtrtabNav", qr = "xtnnddtrtabbtn", Jr = "xtnnddtrtab", T = {
  nodeEditorBase: _o,
  container: Ho,
  canvas: Bo,
  panning: Go,
  spacePanning: Xo,
  nodes: Uo,
  node: Yo,
  locked: Fo,
  selected: jo,
  dragging: Wo,
  nodeHeader: Ko,
  interactiveDragHandle: Zo,
  nodeHeaderInput: qo,
  lockIcon: Jo,
  nodeContent: Qo,
  groupNode: es,
  collapsed: ts,
  groupCollapsed: ns,
  groupExpanded: os,
  nodeInfo: ss,
  nodeSuccess: rs,
  nodeWarning: is,
  nodeError: as,
  nodeDisabled: cs,
  toolbar: ds,
  toolButton: ls,
  contextMenu: us,
  contextMenuItem: ps,
  grid: hs,
  inspectorPanel: fs,
  inspectorHeader: gs,
  inspectorContent: ms,
  inspectorSection: ys,
  inspectorRow: vs,
  editorWithInspector: bs,
  editorMain: xs,
  externalDataInfo: Ns,
  dragGuides: Cs,
  dragGuide: Ss,
  dragGuideVertical: Es,
  dragGuideHorizontal: ws,
  snapTarget: Is,
  distanceIndicator: Ds,
  distanceLine: Ps,
  statusBar: ks,
  statusSection: Ms,
  statusLabel: Ts,
  statusValue: Os,
  statusMode: As,
  nodePort: zs,
  portInput: Rs,
  portOutput: Ls,
  portInner: Vs,
  portLabel: $s,
  portLeft: _s,
  portRight: Hs,
  portTop: Bs,
  portBottom: Gs,
  connections: Xs,
  inspectorTabs: Us,
  inspectorTab: Ys,
  active: Fs,
  inspectorContentNoPadding: js,
  inspectorField: Ws,
  inspectorInput: Ks,
  inspectorTextarea: Zs,
  inspectorPositionInputs: qs,
  inspectorNumberInput: Js,
  inspectorReadOnlyField: Qs,
  inspectorEmptyState: er,
  canvasContainer: tr,
  boxSelecting: nr,
  gridSvg: or,
  editorLayout: sr,
  editorToolbar: rr,
  editorContent: ir,
  editorSidebar: ar,
  topToolbar: cr,
  nodeLayer: dr,
  nodeView: lr,
  nodeTitle: ur,
  nodeTitleInput: pr,
  groupAcceptingDrop: hr,
  groupPulse: fr,
  groupHasChildren: gr,
  nodePorts: mr,
  port: yr,
  portHovered: vr,
  portConnecting: br,
  pulse: xr,
  portConnected: Nr,
  portLabelLeft: Cr,
  portLabelRight: Sr,
  portLabelTop: Er,
  portLabelBottom: wr,
  connectionLayer: Ir,
  connectionGroup: Dr,
  connectionSelected: Pr,
  connectionHovered: kr,
  connectionDragging: Mr,
  dragConnection: Tr,
  dashAnimation: Or,
  selectionBoxOverlay: Ar,
  selectionOverlay: zr,
  loadingOverlay: Rr,
  loadingIndicator: Lr,
  customNodeContent: Vr,
  resizeHandle: $r,
  resizeHandleActive: _r,
  minimapContainer: Hr,
  minimap: Br,
  minimapTitle: Gr,
  minimapContent: Xr,
  minimapViewport: Ur,
  minimapNodes: Yr,
  darkTheme: Fr,
  smoothAnimations: jr,
  statusSaving: Wr,
  uiOverlayContainer: Kr,
  tabNav: Zr,
  tabButton: qr,
  tabButtonActive: Jr
}, $t = ({
  children: e,
  className: t,
  style: n
}) => ($o(), /* @__PURE__ */ l(
  "div",
  {
    className: Y(T.nodeEditorBase, t),
    style: n,
    tabIndex: 0,
    children: e
  }
));
$t.displayName = "NodeEditorBase";
function _t(e, t) {
  const n = Qe((e == null ? void 0 : e.type) || ""), [o, s] = d.useState({
    data: void 0,
    isLoading: !1,
    error: null
  }), r = d.useCallback(async () => {
    if (!(!e || !t || !(n != null && n.loadExternalData))) {
      s((a) => ({ ...a, isLoading: !0, error: null }));
      try {
        const a = await Promise.resolve(
          n.loadExternalData(t)
        );
        s({ data: a, isLoading: !1, error: null });
      } catch (a) {
        s({
          data: void 0,
          isLoading: !1,
          error: a instanceof Error ? a : new Error(String(a))
        });
      }
    }
  }, [e, t, n]);
  d.useEffect(() => {
    r();
  }, [r]);
  const i = d.useCallback(
    async (a) => {
      if (!e || !t || !(n != null && n.updateExternalData))
        throw new Error("Cannot update external data: missing requirements");
      s((c) => ({ ...c, isLoading: !0, error: null }));
      try {
        await Promise.resolve(
          n.updateExternalData(t, a)
        ), s({ data: a, isLoading: !1, error: null });
      } catch (c) {
        throw s((u) => ({
          ...u,
          isLoading: !1,
          error: c instanceof Error ? c : new Error(String(c))
        })), c;
      }
    },
    [e, t, n]
  );
  return {
    ...o,
    refresh: r,
    update: i
  };
}
const Qr = "xtnnddtralncon", ei = "xtnnddtralnlbl", ti = "xtnnddtralnGrid", ni = "xtnnddtralnbtn", Oe = {
  alignmentControls: Qr,
  alignmentLabel: ei,
  alignmentGrid: ti,
  alignmentButton: ni
}, Ht = d.memo(({ value: e, onChange: t, style: n, type: o = "text", placeholder: s, id: r, name: i, "aria-label": a }) => /* @__PURE__ */ l(
  Ce,
  {
    type: o,
    value: e,
    onChange: (c) => t(c.target.value),
    style: n,
    placeholder: s,
    id: r,
    name: i,
    "aria-label": a
  }
));
Ht.displayName = "InspectorInput";
const Bt = d.memo(({ value: e, onChange: t, style: n, id: o, name: s, "aria-label": r }) => /* @__PURE__ */ l(mn, { value: e, onChange: (i) => t(i.target.value), style: n, id: o, name: s, "aria-label": r }));
Bt.displayName = "InspectorTextarea";
const Ie = d.memo(({ value: e, onChange: t, label: n, id: o, name: s, "aria-label": r }) => /* @__PURE__ */ w("div", { style: {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  backgroundColor: "#f5f5f5",
  border: "1px solid #ddd",
  borderRadius: "4px",
  padding: "4px 8px",
  fontSize: "12px"
}, children: [
  /* @__PURE__ */ l("span", { style: {
    color: "#666",
    fontSize: "11px",
    fontWeight: 500,
    minWidth: "12px",
    textAlign: "center"
  }, children: n }),
  /* @__PURE__ */ l(
    Ce,
    {
      type: "number",
      value: e,
      onChange: (u) => t(Number(u.target.value)),
      style: {
        border: "none",
        background: "transparent",
        fontSize: "12px",
        outline: "none",
        width: "100%",
        textAlign: "right"
      },
      id: o,
      name: s,
      "aria-label": r
    }
  )
] }));
Ie.displayName = "InspectorNumberInput";
const je = d.memo(({ checked: e, onChange: t, label: n, id: o, name: s }) => /* @__PURE__ */ w("label", { htmlFor: o, style: { display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }, children: [
  /* @__PURE__ */ l("input", { type: "checkbox", checked: e, onChange: (r) => t(r.target.checked), id: o, name: s }),
  /* @__PURE__ */ l("span", { style: { fontSize: "13px" }, children: n })
] }));
je.displayName = "InspectorCheckbox";
const Gt = d.memo(({ selectedNodes: e, onAlign: t }) => {
  const n = e.length < 2, o = [
    { type: "align-left", icon: vn, title: "Align Left" },
    { type: "align-center-horizontal", icon: bn, title: "Align Center Horizontal" },
    { type: "align-right", icon: xn, title: "Align Right" },
    { type: "align-top", icon: Nn, title: "Align Top" },
    { type: "align-center-vertical", icon: Cn, title: "Align Center Vertical" },
    { type: "align-bottom", icon: Sn, title: "Align Bottom" },
    { type: "distribute-horizontal", icon: En, title: "Distribute Horizontally" },
    { type: "distribute-vertical", icon: wn, title: "Distribute Vertically" }
  ];
  return /* @__PURE__ */ w("div", { className: Oe.alignmentControls, children: [
    /* @__PURE__ */ w(ge, { className: Oe.alignmentLabel, children: [
      "Alignment ",
      e.length > 1 ? `(${e.length} nodes)` : "(select 2+ nodes)",
      ":"
    ] }),
    /* @__PURE__ */ l("div", { className: Oe.alignmentGrid, children: o.map((s) => {
      const r = s.icon;
      return /* @__PURE__ */ l(
        ze,
        {
          onClick: () => !n && t(s.type),
          className: Oe.alignmentButton,
          title: n ? "Select 2 or more nodes to enable alignment" : s.title,
          disabled: n,
          children: /* @__PURE__ */ l(r, { size: 14 })
        },
        s.type
      );
    }) })
  ] });
});
Gt.displayName = "AlignmentControls";
const Xt = d.memo(
  ({ node: e, onUpdateNode: t, onDeleteNode: n, selectedNodes: o = [], onAlignNodes: s }) => {
    var x, P;
    const r = d.useMemo(
      () => ({
        width: "100%",
        padding: "4px 8px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        fontSize: "13px"
      }),
      []
    ), i = d.useMemo(
      () => ({
        display: "block",
        marginBottom: "4px",
        fontSize: "12px",
        fontWeight: 500,
        color: "#666"
      }),
      []
    ), a = d.useCallback(
      (E) => {
        t({
          data: { ...e.data, title: E }
        });
      },
      [e.data, t]
    ), c = d.useCallback(
      (E) => {
        t({
          data: { ...e.data, content: E }
        });
      },
      [e.data, t]
    ), u = d.useCallback(
      (E) => {
        t({
          position: { ...e.position, x: E }
        });
      },
      [e.position, t]
    ), p = d.useCallback(
      (E) => {
        t({
          position: { ...e.position, y: E }
        });
      },
      [e.position, t]
    ), h = d.useCallback(
      (E) => {
        var I;
        t({
          size: { ...e.size, width: E, height: ((I = e.size) == null ? void 0 : I.height) ?? 0 }
        });
      },
      [e.size, t]
    ), v = d.useCallback(
      (E) => {
        var I;
        t({
          size: { ...e.size, height: E, width: ((I = e.size) == null ? void 0 : I.width) ?? 0 }
        });
      },
      [e.size, t]
    ), y = d.useCallback(
      (E) => {
        t({ locked: E });
      },
      [t]
    ), b = d.useCallback(
      (E) => {
        t({ visible: E });
      },
      [t]
    ), f = d.useCallback(
      (E) => {
        !s || o.length < 2 || s(E, o);
      },
      [s, o]
    ), g = d.useMemo(
      () => ({
        ...r,
        minHeight: "60px",
        resize: "vertical"
      }),
      [r]
    );
    return d.useMemo(
      () => ({
        ...r,
        width: "50%"
      }),
      [r]
    ), /* @__PURE__ */ w("div", { style: { display: "flex", flexDirection: "column", gap: "12px" }, children: [
      /* @__PURE__ */ l("h4", { style: { margin: 0, fontSize: "14px" }, children: "Node Properties" }),
      /* @__PURE__ */ w("div", { children: [
        /* @__PURE__ */ l(ge, { htmlFor: `node-${e.id}-title`, style: i, children: "Title:" }),
        /* @__PURE__ */ l(
          Ht,
          {
            id: `node-${e.id}-title`,
            name: "nodeTitle",
            value: e.data.title || "",
            onChange: a,
            style: r
          }
        )
      ] }),
      e.data.content !== void 0 && /* @__PURE__ */ w("div", { children: [
        /* @__PURE__ */ l(ge, { htmlFor: `node-${e.id}-content`, style: i, children: "Content:" }),
        /* @__PURE__ */ l(
          Bt,
          {
            id: `node-${e.id}-content`,
            name: "nodeContent",
            value: String(e.data.content) || "",
            onChange: c,
            style: g
          }
        )
      ] }),
      /* @__PURE__ */ l(Gt, { selectedNodes: o, onAlign: f }),
      /* @__PURE__ */ w("div", { children: [
        /* @__PURE__ */ l(ge, { style: i, children: "Position & Size:" }),
        /* @__PURE__ */ w("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px" }, children: [
          /* @__PURE__ */ l(
            Ie,
            {
              label: "X",
              value: e.position.x,
              onChange: u,
              id: `node-${e.id}-pos-x`,
              name: "nodePosX",
              "aria-label": "X position"
            }
          ),
          /* @__PURE__ */ l(
            Ie,
            {
              label: "Y",
              value: e.position.y,
              onChange: p,
              id: `node-${e.id}-pos-y`,
              name: "nodePosY",
              "aria-label": "Y position"
            }
          ),
          /* @__PURE__ */ l(
            Ie,
            {
              label: "W",
              value: ((x = e.size) == null ? void 0 : x.width) || 100,
              onChange: h,
              id: `node-${e.id}-width`,
              name: "nodeWidth",
              "aria-label": "Width"
            }
          ),
          /* @__PURE__ */ l(
            Ie,
            {
              label: "H",
              value: ((P = e.size) == null ? void 0 : P.height) || 100,
              onChange: v,
              id: `node-${e.id}-height`,
              name: "nodeHeight",
              "aria-label": "Height"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ w("div", { children: [
        /* @__PURE__ */ l(ge, { style: i, children: "Type:" }),
        /* @__PURE__ */ l(
          "div",
          {
            style: {
              padding: "4px 8px",
              backgroundColor: "#f5f5f5",
              borderRadius: "4px",
              fontSize: "13px"
            },
            children: e.type
          }
        )
      ] }),
      e.type === "group" && /* @__PURE__ */ w("div", { style: { display: "flex", flexDirection: "column", gap: "12px" }, children: [
        /* @__PURE__ */ l(je, { checked: e.locked || !1, onChange: y, label: "Lock Layer" }),
        /* @__PURE__ */ l(je, { checked: e.visible !== !1, onChange: b, label: "Visible" })
      ] }),
      /* @__PURE__ */ l("div", { style: { paddingTop: "16px", borderTop: "1px solid #eee" }, children: /* @__PURE__ */ l(
        ze,
        {
          onClick: n,
          style: {
            width: "100%"
          },
          variant: "danger",
          children: "Delete Node"
        }
      ) })
    ] });
  }
);
Xt.displayName = "DefaultInspectorRenderer";
function Ut(e) {
  var o, s;
  const t = ((o = e.size) == null ? void 0 : o.width) || 100, n = ((s = e.size) == null ? void 0 : s.height) || 100;
  return {
    left: e.position.x,
    top: e.position.y,
    right: e.position.x + t,
    bottom: e.position.y + n,
    width: t,
    height: n,
    centerX: e.position.x + t / 2,
    centerY: e.position.y + n / 2
  };
}
function oi(e) {
  if (e.length === 0) return null;
  const t = e.map(Ut), n = Math.min(...t.map((i) => i.left)), o = Math.min(...t.map((i) => i.top)), s = Math.max(...t.map((i) => i.right)), r = Math.max(...t.map((i) => i.bottom));
  return {
    left: n,
    top: o,
    right: s,
    bottom: r,
    width: s - n,
    height: r - o,
    centerX: n + (s - n) / 2,
    centerY: o + (r - o) / 2
  };
}
function Yt(e, t) {
  if (e.length < 2) return {};
  const n = {}, o = e.map((r) => ({ node: r, bounds: Ut(r) })), s = oi(e);
  if (!s) return {};
  switch (t) {
    case "align-left": {
      const r = Math.min(...o.map((i) => i.bounds.left));
      o.forEach(({ node: i }) => {
        n[i.id] = { x: r, y: i.position.y };
      });
      break;
    }
    case "align-center-horizontal": {
      o.forEach(({ node: r, bounds: i }) => {
        const a = s.centerX - i.width / 2;
        n[r.id] = { x: a, y: r.position.y };
      });
      break;
    }
    case "align-right": {
      const r = Math.max(...o.map((i) => i.bounds.right));
      o.forEach(({ node: i, bounds: a }) => {
        const c = r - a.width;
        n[i.id] = { x: c, y: i.position.y };
      });
      break;
    }
    case "align-top": {
      const r = Math.min(...o.map((i) => i.bounds.top));
      o.forEach(({ node: i }) => {
        n[i.id] = { x: i.position.x, y: r };
      });
      break;
    }
    case "align-center-vertical": {
      o.forEach(({ node: r, bounds: i }) => {
        const a = s.centerY - i.height / 2;
        n[r.id] = { x: r.position.x, y: a };
      });
      break;
    }
    case "align-bottom": {
      const r = Math.max(...o.map((i) => i.bounds.bottom));
      o.forEach(({ node: i, bounds: a }) => {
        const c = r - a.height;
        n[i.id] = { x: i.position.x, y: c };
      });
      break;
    }
    case "distribute-horizontal": {
      if (e.length < 3) break;
      const r = o.sort((p, h) => p.bounds.left - h.bounds.left), i = r[0], u = (r[r.length - 1].bounds.left - i.bounds.left) / (r.length - 1);
      r.forEach(({ node: p }, h) => {
        if (h === 0 || h === r.length - 1)
          n[p.id] = { x: p.position.x, y: p.position.y };
        else {
          const v = i.bounds.left + u * h;
          n[p.id] = { x: v, y: p.position.y };
        }
      });
      break;
    }
    case "distribute-vertical": {
      if (e.length < 3) break;
      const r = o.sort((p, h) => p.bounds.top - h.bounds.top), i = r[0], u = (r[r.length - 1].bounds.top - i.bounds.top) / (r.length - 1);
      r.forEach(({ node: p }, h) => {
        if (h === 0 || h === r.length - 1)
          n[p.id] = { x: p.position.x, y: p.position.y };
        else {
          const v = i.bounds.top + u * h;
          n[p.id] = { x: p.position.x, y: v };
        }
      });
      break;
    }
  }
  return n;
}
const Ft = d.memo(
  ({ node: e }) => {
    const { state: t, dispatch: n, actions: o } = W(), { state: s } = Z(), r = Qe(e.type), i = Et(e.id), a = _t(e, i), c = d.useCallback(
      (b) => {
        n(o.updateNode(e.id, b));
      },
      [e.id, n, o]
    ), u = d.useCallback(
      async (b) => {
        a.update && await a.update(b);
      },
      [a.update]
    ), p = d.useCallback(() => {
      n(o.deleteNode(e.id));
    }, [e.id, n, o]), h = s.selectedNodeIds.map((b) => t.nodes[b]).filter(Boolean), v = d.useCallback(
      (b, f) => {
        const g = Yt(f, b);
        Object.keys(g).length > 0 && n(o.moveNodes(g));
      },
      [n, o]
    ), y = d.useMemo(
      () => ({
        node: e,
        externalData: a.data,
        isLoadingExternalData: a.isLoading,
        externalDataError: a.error,
        onUpdateNode: c,
        onUpdateExternalData: u,
        onDeleteNode: p,
        selectedNodes: h,
        onAlignNodes: v
      }),
      [
        e,
        a.data,
        a.isLoading,
        a.error,
        c,
        u,
        p,
        h,
        v
      ]
    );
    return /* @__PURE__ */ w(le, { children: [
      (r == null ? void 0 : r.renderInspector) && /* @__PURE__ */ l("div", { style: { marginBottom: "16px" }, children: r.renderInspector(y) }),
      /* @__PURE__ */ l(Xt, { ...y })
    ] });
  },
  (e, t) => e.node.id === t.node.id && e.node.type === t.node.type && e.node.data === t.node.data && e.node.position === t.node.position && e.node.locked === t.node.locked && e.node.visible === t.node.visible
);
Ft.displayName = "NodeInspector";
const jt = (e, t) => {
  const n = t.find((o) => o.type === e);
  return n != null && n.icon ? n.icon : si(e);
}, si = (e) => {
  switch (e) {
    case "group":
      return "📁";
    case "input":
      return "📥";
    case "output":
      return "📤";
    case "process":
      return "⚙️";
    case "code-editor":
      return "💻";
    case "chart":
      return "📊";
    case "form-builder":
      return "📝";
    case "task":
      return "✅";
    case "standard":
      return "🔗";
    default:
      return "📦";
  }
}, ri = "xtnnddtrnodtrelis", ii = "xtnnddtrhdr", ai = "xtnnddtrtitle", ci = "xtnnddtrnodcouU5z", di = "xtnnddtrtreecnt", li = "xtnnddtrempState", ui = "xtnnddtrtreeitm", pi = "xtnnddtrseligQ", hi = "xtnnddtrnodeNamegua", fi = "xtnnddtrnodeicovQJ", gi = "xtnnddtrexpbtn", mi = "xtnnddtrvis", yi = "xtnnddtrdel", vi = "xtnnddtrdrgvgz", bi = "xtnnddtrdraoveins", xi = "xtnnddtrdropind", Ni = "xtnnddtrdropul", ee = {
  nodeTreeList: ri,
  header: ii,
  title: ai,
  nodeCount: ci,
  treeContainer: di,
  emptyState: li,
  treeItem: ui,
  selected: pi,
  nodeName: hi,
  nodeIcon: fi,
  expandButton: gi,
  visibilityButton: mi,
  deleteButton: yi,
  dragging: vi,
  dragOverInside: bi,
  dropIndicator: xi,
  dropIndicatorPulse: Ni
}, Ci = ({
  node: e,
  level: t,
  isSelected: n,
  onSelect: o,
  onToggleVisibility: s,
  onToggleExpand: r,
  onDeleteNode: i,
  childNodes: a,
  dragState: c,
  onNodeDrop: u,
  onDragStateChange: p
}) => {
  var _;
  const h = et(), v = e.type === "group" && a.length > 0, y = e.type === "group" && e.expanded !== !1, b = e.type === "group", f = c.draggingNodeId === e.id, g = c.dragOverNodeId === e.id, x = g ? c.dragOverPosition : null, P = (S) => {
    S.stopPropagation(), o(e.id, S.ctrlKey || S.metaKey);
  }, E = (S) => {
    S.stopPropagation(), r && v && r(e.id);
  }, I = (S) => {
    S.stopPropagation(), s && s(e.id);
  }, M = (S) => {
    S.stopPropagation(), i && i(e.id);
  }, m = (S) => {
    S.dataTransfer.effectAllowed = "move", S.dataTransfer.setData("nodeId", e.id), p({ draggingNodeId: e.id });
  }, N = () => {
    p({
      draggingNodeId: null,
      dragOverNodeId: null,
      dragOverPosition: null
    });
  }, C = (S) => {
    if (S.preventDefault(), S.stopPropagation(), c.draggingNodeId === e.id) return;
    const k = S.currentTarget.getBoundingClientRect(), O = S.clientY - k.top, A = k.height;
    let $;
    b && O > A * 0.25 && O < A * 0.75 ? $ = "inside" : O < A / 2 ? $ = "before" : $ = "after", (c.dragOverNodeId !== e.id || c.dragOverPosition !== $) && p({
      dragOverNodeId: e.id,
      dragOverPosition: $
    });
  }, D = (S) => {
    S.currentTarget === S.target && p({
      dragOverNodeId: null,
      dragOverPosition: null
    });
  }, z = (S) => {
    S.preventDefault(), S.stopPropagation();
    const k = S.dataTransfer.getData("nodeId");
    k && c.dragOverPosition && u(k, e.id, c.dragOverPosition), p({
      draggingNodeId: null,
      dragOverNodeId: null,
      dragOverPosition: null
    });
  };
  return /* @__PURE__ */ w(le, { children: [
    g && x === "before" && /* @__PURE__ */ l("div", { className: ee.dropIndicator, style: { marginLeft: `${t * 16 + 8}px` } }),
    /* @__PURE__ */ w(
      "div",
      {
        className: `${ee.treeItem} ${n ? ee.selected : ""} ${f ? ee.dragging : ""} ${g && x === "inside" ? ee.dragOverInside : ""}`,
        style: { paddingLeft: `${t * 16 + 8}px` },
        onClick: P,
        draggable: !0,
        onDragStart: m,
        onDragEnd: N,
        onDragOver: C,
        onDragLeave: D,
        onDrop: z,
        children: [
          v && /* @__PURE__ */ l(
            "button",
            {
              className: ee.expandButton,
              onClick: E,
              "aria-label": y ? "Collapse" : "Expand",
              children: /* @__PURE__ */ l(
                "svg",
                {
                  width: "8",
                  height: "8",
                  viewBox: "0 0 8 8",
                  fill: "currentColor",
                  style: {
                    transform: y ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 0.2s"
                  },
                  children: /* @__PURE__ */ l("path", { d: "M2 1l4 3-4 3V1z" })
                }
              )
            }
          ),
          /* @__PURE__ */ l("span", { className: ee.nodeIcon, children: jt(e.type, h) }),
          /* @__PURE__ */ l("span", { className: ee.nodeName, children: ((_ = e.data) == null ? void 0 : _.title) || e.type }),
          /* @__PURE__ */ l(
            "button",
            {
              className: ee.visibilityButton,
              onClick: I,
              "aria-label": e.visible !== !1 ? "Hide" : "Show",
              children: /* @__PURE__ */ l("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", children: e.visible !== !1 ? /* @__PURE__ */ l("path", { d: "M8 3C4.5 3 1.73 5.11 1 8c.73 2.89 3.5 5 7 5s6.27-2.11 7-5c-.73-2.89-3.5-5-7-5zm0 8.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm0-5.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" }) : /* @__PURE__ */ w(le, { children: [
                /* @__PURE__ */ l("path", { d: "M8 3C4.5 3 1.73 5.11 1 8c.73 2.89 3.5 5 7 5s6.27-2.11 7-5c-.73-2.89-3.5-5-7-5zm0 8.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm0-5.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z", opacity: "0.3" }),
                /* @__PURE__ */ l("path", { d: "M2 2l12 12", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
              ] }) })
            }
          ),
          /* @__PURE__ */ l(
            "button",
            {
              className: ee.deleteButton,
              onClick: M,
              "aria-label": "Delete node",
              children: /* @__PURE__ */ l(In, { size: 12 })
            }
          )
        ]
      }
    ),
    v && y && a.map((S) => /* @__PURE__ */ l(
      Wt,
      {
        nodeId: S.id,
        level: t + 1,
        dragState: c,
        onNodeDrop: u,
        onDragStateChange: p
      },
      S.id
    )),
    g && x === "after" && /* @__PURE__ */ l("div", { className: ee.dropIndicator, style: { marginLeft: `${t * 16 + 8}px` } })
  ] });
}, Wt = ({
  nodeId: e,
  level: t,
  dragState: n,
  onNodeDrop: o,
  onDragStateChange: s
}) => {
  const { state: r, dispatch: i, actions: a } = W(), { state: c, dispatch: u, actions: p } = Z(), h = r.nodes[e];
  if (!h) return null;
  const v = c.selectedNodeIds.includes(e), y = Object.values(r.nodes).filter((P) => P.parentId === e), b = d.useCallback((P, E) => {
    u(p.selectNode(P, E));
  }, [u, p]), f = d.useCallback((P) => {
    const E = r.nodes[P];
    E && i(a.updateNode(P, { visible: E.visible === !1 }));
  }, [r.nodes, i, a]), g = d.useCallback((P) => {
    const E = r.nodes[P];
    E && E.type === "group" && i(a.updateNode(P, { expanded: !E.expanded }));
  }, [r.nodes, i, a]), x = d.useCallback((P) => {
    i(a.deleteNode(P));
  }, [i, a]);
  return /* @__PURE__ */ l(
    Ci,
    {
      node: h,
      level: t,
      isSelected: v,
      onSelect: b,
      onToggleVisibility: f,
      onToggleExpand: g,
      onDeleteNode: x,
      childNodes: y,
      dragState: n,
      onNodeDrop: o,
      onDragStateChange: s
    }
  );
}, Si = ({ className: e }) => {
  const { state: t, dispatch: n, actions: o } = W(), { dispatch: s, actions: r } = Z(), [i, a] = d.useState({
    draggingNodeId: null,
    dragOverNodeId: null,
    dragOverPosition: null
  }), c = d.useMemo(() => Object.values(t.nodes).filter((y) => !y.parentId), [t.nodes]), u = d.useMemo(() => [...c].sort((y, b) => {
    var x, P;
    if (y.type === "group" && b.type !== "group") return -1;
    if (y.type !== "group" && b.type === "group") return 1;
    const f = ((x = y.data) == null ? void 0 : x.title) || y.type, g = ((P = b.data) == null ? void 0 : P.title) || b.type;
    return f.localeCompare(g);
  }), [c]), p = d.useCallback(() => {
    s(r.clearSelection());
  }, [s, r]), h = d.useCallback((y) => {
    a((b) => ({ ...b, ...y }));
  }, []), v = d.useCallback((y, b, f) => {
    const g = t.nodes[y], x = t.nodes[b];
    if (!g || !x) return;
    const P = (E, I) => {
      const M = t.nodes[E];
      return M ? M.parentId === I ? !0 : M.parentId ? P(M.parentId, I) : !1 : !1;
    };
    if (!(y === b || P(b, y)))
      if (f === "inside" && x.type === "group")
        n(o.updateNode(y, { parentId: b })), x.expanded || n(o.updateNode(b, { expanded: !0 }));
      else {
        const E = x.parentId || void 0;
        n(o.updateNode(y, { parentId: E }));
      }
  }, [t.nodes, n, o]);
  return /* @__PURE__ */ w("div", { className: `${ee.nodeTreeList} ${e || ""}`, children: [
    /* @__PURE__ */ w("div", { className: ee.header, children: [
      /* @__PURE__ */ l("h3", { className: ee.title, children: "Layers" }),
      /* @__PURE__ */ w("div", { className: ee.nodeCount, children: [
        Object.keys(t.nodes).length,
        " nodes"
      ] })
    ] }),
    /* @__PURE__ */ l("div", { className: ee.treeContainer, onClick: p, children: u.length === 0 ? /* @__PURE__ */ l("div", { className: ee.emptyState, children: "No nodes yet" }) : u.map((y) => /* @__PURE__ */ l(
      Wt,
      {
        nodeId: y.id,
        level: 0,
        dragState: i,
        onNodeDrop: v,
        onDragStateChange: h
      },
      y.id
    )) })
  ] });
}, Kt = ({ tabs: e, activeTabIndex: t, onTabChange: n, className: o }) => /* @__PURE__ */ l("div", { className: Y(T.tabNav, o), children: e.map((s, r) => /* @__PURE__ */ l(
  "button",
  {
    className: Y(
      T.tabButton,
      r === t && T.tabButtonActive
    ),
    onClick: () => n(r),
    type: "button",
    children: s
  },
  r
)) });
Kt.displayName = "TabNav";
const Zt = ({ className: e }) => {
  var y, b;
  const { state: t, actions: n, dispatch: o } = W(), { state: s } = Z(), { state: r, dispatch: i, actions: a } = ie(), [c, u] = d.useState(0), p = ["Layers", "Properties"], h = s.selectedNodeIds.length > 0 ? t.nodes[s.selectedNodeIds[0]] : null;
  s.selectedNodeIds.map((f) => t.nodes[f]).filter(Boolean);
  const v = s.selectedConnectionIds.length > 0 ? t.connections[s.selectedConnectionIds[0]] : null;
  return d.useCallback(
    (f, g) => {
      const x = Yt(g, f);
      Object.keys(x).length > 0 && o(n.moveNodes(x));
    },
    [o, n]
  ), /* @__PURE__ */ w("div", { className: Y(T.inspectorPanel, e), children: [
    /* @__PURE__ */ l("div", { className: T.inspectorHeader, children: /* @__PURE__ */ l(Kt, { tabs: p, activeTabIndex: c, onTabChange: u }) }),
    /* @__PURE__ */ l("div", { className: Y(T.inspectorContent, c === 0 && T.inspectorContentNoPadding), children: c === 0 ? /* @__PURE__ */ l(Si, {}) : /* @__PURE__ */ w(le, { children: [
      h && /* @__PURE__ */ l("div", { className: T.inspectorSection, children: /* @__PURE__ */ l(Ft, { node: h }) }),
      v && /* @__PURE__ */ w("div", { className: T.inspectorSection, children: [
        /* @__PURE__ */ l(Ge, { children: "Connection Properties" }),
        /* @__PURE__ */ w("div", { className: T.inspectorField, children: [
          /* @__PURE__ */ l("label", { children: "From:" }),
          /* @__PURE__ */ w("span", { className: T.inspectorReadOnlyField, children: [
            ((y = t.nodes[v.fromNodeId]) == null ? void 0 : y.data.title) || v.fromNodeId,
            ".",
            v.fromPortId
          ] })
        ] }),
        /* @__PURE__ */ w("div", { className: T.inspectorField, children: [
          /* @__PURE__ */ l("label", { children: "To:" }),
          /* @__PURE__ */ w("span", { className: T.inspectorReadOnlyField, children: [
            ((b = t.nodes[v.toNodeId]) == null ? void 0 : b.data.title) || v.toNodeId,
            ".",
            v.toPortId
          ] })
        ] })
      ] }),
      !h && !v && /* @__PURE__ */ l("div", { className: T.inspectorEmptyState, children: /* @__PURE__ */ l("p", { children: "Select a node or connection to view its properties" }) }),
      s.selectedNodeIds.length > 1 && /* @__PURE__ */ w("div", { className: T.inspectorSection, children: [
        /* @__PURE__ */ l(Ge, { children: "Multiple Selection" }),
        /* @__PURE__ */ w("p", { children: [
          s.selectedNodeIds.length,
          " nodes selected"
        ] })
      ] }),
      /* @__PURE__ */ w("div", { className: T.inspectorSection, children: [
        /* @__PURE__ */ l(Ge, { children: "Grid Settings" }),
        /* @__PURE__ */ l("div", { className: T.inspectorField, children: /* @__PURE__ */ w(ge, { children: [
          /* @__PURE__ */ l(
            Ce,
            {
              id: "grid-show",
              name: "showGrid",
              type: "checkbox",
              checked: r.gridSettings.showGrid,
              onChange: (f) => {
                i(
                  a.updateGridSettings({
                    showGrid: f.target.checked
                  })
                );
              }
            }
          ),
          "Show Grid"
        ] }) }),
        /* @__PURE__ */ l("div", { className: T.inspectorField, children: /* @__PURE__ */ w(ge, { children: [
          /* @__PURE__ */ l(
            Ce,
            {
              id: "grid-snap",
              name: "snapToGrid",
              type: "checkbox",
              checked: r.gridSettings.snapToGrid,
              onChange: (f) => {
                i(
                  a.updateGridSettings({
                    snapToGrid: f.target.checked
                  })
                );
              }
            }
          ),
          "Snap to Grid"
        ] }) }),
        /* @__PURE__ */ l("div", { className: T.inspectorField, children: /* @__PURE__ */ w(ge, { htmlFor: "grid-size", children: [
          "Grid Size:",
          /* @__PURE__ */ l(
            Ce,
            {
              id: "grid-size",
              name: "gridSize",
              type: "number",
              className: T.inspectorInput,
              value: r.gridSettings.size,
              min: 10,
              max: 100,
              step: 5,
              onChange: (f) => {
                const g = parseInt(f.target.value, 10);
                !isNaN(g) && g > 0 && i(
                  a.updateGridSettings({
                    size: g
                  })
                );
              },
              "aria-label": "Grid size in pixels"
            }
          )
        ] }) }),
        /* @__PURE__ */ l("div", { className: T.inspectorField, children: /* @__PURE__ */ w(ge, { htmlFor: "snap-threshold", children: [
          "Snap Threshold:",
          /* @__PURE__ */ l(
            Ce,
            {
              id: "snap-threshold",
              name: "snapThreshold",
              type: "number",
              className: T.inspectorInput,
              value: r.gridSettings.snapThreshold,
              min: 1,
              max: 20,
              step: 1,
              onChange: (f) => {
                const g = parseInt(f.target.value, 10);
                !isNaN(g) && g > 0 && i(
                  a.updateGridSettings({
                    snapThreshold: g
                  })
                );
              },
              "aria-label": "Snap threshold in pixels"
            }
          )
        ] }) })
      ] })
    ] }) })
  ] });
};
Zt.displayName = "InspectorPanel";
const Ei = "xtnnddtrhzdiv", wi = "xtnnddtrdrgBS7", ut = {
  horizontalDivider: Ei,
  dragging: wi
}, pt = ({
  onResize: e,
  className: t
}) => {
  const [n, o] = d.useState(!1), s = d.useRef(0), r = d.useCallback((c) => {
    c.preventDefault(), o(!0), s.current = c.clientX, c.currentTarget.setPointerCapture(c.pointerId);
  }, []), i = d.useCallback((c) => {
    if (!n) return;
    const u = c.clientX - s.current;
    s.current = c.clientX, e(u);
  }, [n, e]), a = d.useCallback((c) => {
    o(!1), c.currentTarget.releasePointerCapture(c.pointerId);
  }, []);
  return /* @__PURE__ */ l(
    "div",
    {
      className: `${ut.horizontalDivider} ${t || ""} ${n ? ut.dragging : ""}`,
      onPointerDown: r,
      onPointerMove: i,
      onPointerUp: a
    }
  );
}, Ii = "xtnnddtrcollyt", Di = "xtnnddtrrightsbr", Pi = "xtnnddtrleftsbr", ki = "xtnnddtrmainctn", Mi = "xtnnddtrleftrsz", Ti = "xtnnddtrrightrsz", xe = {
  columnLayout: Ii,
  rightSidebar: Di,
  leftSidebar: Pi,
  mainContent: ki,
  leftResizer: Mi,
  rightResizer: Ti
}, Oi = ({
  className: e,
  children: t,
  leftSidebar: n,
  rightSidebar: o,
  leftSidebarInitialWidth: s = 280,
  rightSidebarInitialWidth: r = 280,
  leftSidebarMinWidth: i = 200,
  rightSidebarMinWidth: a = 200,
  leftSidebarMaxWidth: c = 600,
  rightSidebarMaxWidth: u = 600,
  onLeftSidebarWidthChange: p,
  onRightSidebarWidthChange: h
}) => {
  const [v, y] = d.useState(s), [b, f] = d.useState(r), g = d.useCallback((P) => {
    y((E) => {
      const I = Math.max(
        i,
        Math.min(c, E + P)
      );
      return p == null || p(I), I;
    });
  }, [i, c, p]), x = d.useCallback((P) => {
    f((E) => {
      const I = Math.max(
        a,
        Math.min(u, E - P)
        // Subtract delta for right sidebar
      );
      return h == null || h(I), I;
    });
  }, [a, u, h]);
  return d.useEffect(() => {
    y(s);
  }, [s]), d.useEffect(() => {
    f(r);
  }, [r]), /* @__PURE__ */ w("div", { className: `${xe.columnLayout} ${e || ""}`, children: [
    n && /* @__PURE__ */ w(le, { children: [
      /* @__PURE__ */ l(
        "div",
        {
          className: xe.leftSidebar,
          style: { width: v },
          children: n
        }
      ),
      /* @__PURE__ */ l(
        pt,
        {
          onResize: g,
          className: xe.leftResizer
        }
      )
    ] }),
    /* @__PURE__ */ l("div", { className: xe.mainContent, children: t }),
    o && /* @__PURE__ */ w(le, { children: [
      /* @__PURE__ */ l(
        pt,
        {
          onResize: x,
          className: xe.rightResizer
        }
      ),
      /* @__PURE__ */ l(
        "div",
        {
          className: xe.rightSidebar,
          style: { width: b },
          children: o
        }
      )
    ] })
  ] });
}, Ai = "xtnnddtrselboxiVu", zi = {
  selectionBoxOverlay: Ai
}, qt = ({ className: e }) => {
  const { state: t } = Z();
  if (!t.selectionBox)
    return null;
  const { start: n, end: o } = t.selectionBox, s = Math.min(n.x, o.x), r = Math.min(n.y, o.y), i = Math.abs(o.x - n.x), a = Math.abs(o.y - n.y);
  return /* @__PURE__ */ l(
    "div",
    {
      className: Y(zi.selectionBoxOverlay, e),
      style: {
        left: s,
        top: r,
        width: i,
        height: a
      }
    }
  );
};
qt.displayName = "SelectionBox";
const Ri = "xtnnddtrselHd3", Li = {
  selectionOverlay: Ri
}, Jt = ({ className: e }) => /* @__PURE__ */ l(
  "div",
  {
    className: Y(Li.selectionOverlay, e),
    children: /* @__PURE__ */ l(qt, {})
  }
);
Jt.displayName = "SelectionOverlay";
const Qt = ({ children: e, className: t, showGrid: n = !0 }) => {
  const { state: o, dispatch: s, actions: r, canvasRef: i, utils: a } = ie(), { state: c, dispatch: u, actions: p } = Z(), { state: h } = W(), v = d.useRef(null), [y, b] = d.useState(!1), f = d.useMemo(() => {
    const { offset: m, scale: N } = o.viewport;
    return `translate(${m.x}px, ${m.y}px) scale(${N})`;
  }, [o.viewport]), g = d.useMemo(() => {
    if (!o.gridSettings.showGrid) return null;
    const { size: m } = o.gridSettings, { scale: N, offset: C } = o.viewport, D = m * N, z = C.x % D, _ = C.y % D;
    return /* @__PURE__ */ l("defs", { children: /* @__PURE__ */ l("pattern", { id: "grid", width: D, height: D, patternUnits: "userSpaceOnUse", x: z, y: _, children: /* @__PURE__ */ l("path", { d: `M ${D} 0 L 0 0 0 ${D}`, fill: "none", stroke: " #e0e0e0", strokeWidth: "1", opacity: "0.5" }) }) });
  }, [o.gridSettings, o.viewport]), x = d.useCallback(
    (m) => {
      var C;
      const N = (C = v.current) == null ? void 0 : C.getBoundingClientRect();
      if (N)
        if (m.ctrlKey || m.metaKey) {
          m.preventDefault();
          const D = {
            x: m.clientX - N.left,
            y: m.clientY - N.top
          }, z = m.deltaY * -0.01, _ = o.viewport.scale * (1 + z);
          s(r.zoomViewport(_, D));
        } else {
          m.preventDefault();
          const D = -m.deltaX, z = -m.deltaY;
          s(r.panViewport({ x: D, y: z }));
        }
    },
    [o.viewport.scale, s, r]
  ), P = d.useCallback(
    (m) => {
      var D, z;
      if (m.button === 1 || o.isSpacePanning) {
        m.preventDefault(), s(r.startPan({ x: m.clientX, y: m.clientY })), v.current && v.current.setPointerCapture(m.pointerId);
        return;
      }
      const N = m.target, C = (D = N == null ? void 0 : N.closest) == null ? void 0 : D.call(N, '.nodeView, .port, .connectionGroup, button, input, textarea, [role="button"]');
      if (m.button === 0 && !C) {
        const _ = (z = v.current) == null ? void 0 : z.getBoundingClientRect();
        if (!_) return;
        const S = m.clientX - _.left, k = m.clientY - _.top;
        b(!0), u(p.setSelectionBox({
          start: { x: S, y: k },
          end: { x: S, y: k }
        })), !m.shiftKey && !m.ctrlKey && !m.metaKey && u(p.clearSelection()), v.current && v.current.setPointerCapture(m.pointerId);
      }
    },
    [o.isSpacePanning, o.viewport, s, r, u, p]
  ), E = d.useCallback(
    (m) => {
      var N;
      if (o.panState.isPanning)
        s(r.updatePan({ x: m.clientX, y: m.clientY }));
      else if (y && c.selectionBox) {
        const C = (N = v.current) == null ? void 0 : N.getBoundingClientRect();
        if (!C) return;
        const D = m.clientX - C.left, z = m.clientY - C.top;
        u(p.setSelectionBox({
          start: c.selectionBox.start,
          end: { x: D, y: z }
        }));
      }
    },
    [o.panState.isPanning, o.viewport, y, c.selectionBox, s, r, u, p]
  ), I = d.useCallback(
    (m) => {
      var N;
      if (o.panState.isPanning)
        s(r.endPan()), v.current && v.current.releasePointerCapture(m.pointerId);
      else if (y && c.selectionBox) {
        b(!1);
        const { start: C, end: D } = c.selectionBox;
        if (!((N = v.current) == null ? void 0 : N.getBoundingClientRect())) return;
        const _ = (C.x - o.viewport.offset.x) / o.viewport.scale, S = (C.y - o.viewport.offset.y) / o.viewport.scale, k = (D.x - o.viewport.offset.x) / o.viewport.scale, O = (D.y - o.viewport.offset.y) / o.viewport.scale, A = Math.min(_, k), $ = Math.max(_, k), V = Math.min(S, O), H = Math.max(S, O), U = [];
        if (Object.values(h.nodes).forEach((B) => {
          var ae, ye;
          const X = ((ae = B.size) == null ? void 0 : ae.width) || 150, K = ((ye = B.size) == null ? void 0 : ye.height) || 50;
          B.position.x < $ && B.position.x + X > A && B.position.y < H && B.position.y + K > V && U.push(B.id);
        }), U.length > 0)
          if (m.shiftKey || m.ctrlKey || m.metaKey) {
            const B = [.../* @__PURE__ */ new Set([...c.selectedNodeIds, ...U])];
            u(p.selectAllNodes(B));
          } else
            u(p.selectAllNodes(U));
        u(p.setSelectionBox(null)), v.current && v.current.releasePointerCapture(m.pointerId);
      }
    },
    [o.panState.isPanning, y, c.selectionBox, c.selectedNodeIds, h.nodes, s, r, u, p]
  ), M = d.useCallback((m) => {
    m.preventDefault(), m.stopPropagation();
    const N = a.screenToCanvas(m.clientX, m.clientY), C = {
      x: m.clientX,
      // Keep screen coordinates for menu positioning
      y: m.clientY
    };
    u(p.showContextMenu(C, void 0, N));
  }, [u, p, a]);
  return d.useEffect(() => {
    const m = (C) => {
      if (C.code === "Space" && !C.repeat && !C.ctrlKey && !C.metaKey && (C.preventDefault(), s(r.setSpacePanning(!0))), (C.ctrlKey || C.metaKey) && !C.repeat)
        switch (C.key) {
          case "0":
            C.preventDefault(), s(r.resetViewport());
            break;
          case "1":
            C.preventDefault();
            break;
          case "=":
          case "+":
            C.preventDefault(), s(r.zoomViewport(o.viewport.scale * 1.2));
            break;
          case "-":
            C.preventDefault(), s(r.zoomViewport(o.viewport.scale * 0.8));
            break;
        }
    }, N = (C) => {
      C.code === "Space" && (C.preventDefault(), s(r.setSpacePanning(!1)));
    };
    return window.addEventListener("keydown", m), window.addEventListener("keyup", N), () => {
      window.removeEventListener("keydown", m), window.removeEventListener("keyup", N);
    };
  }, [s, r, o.viewport.scale]), d.useEffect(() => {
    const m = v.current;
    if (m)
      return m.addEventListener("wheel", x, { passive: !1 }), () => m.removeEventListener("wheel", x);
  }, [x]), /* @__PURE__ */ w(
    "div",
    {
      ref: v,
      className: Y(
        T.canvasContainer,
        o.panState.isPanning && T.panning,
        o.isSpacePanning && T.spacePanning,
        y && T.boxSelecting,
        t
      ),
      onPointerDown: P,
      onPointerMove: E,
      onPointerUp: I,
      onContextMenu: M,
      role: "application",
      "aria-label": "Node Editor Canvas",
      children: [
        o.gridSettings.showGrid && /* @__PURE__ */ w("svg", { className: T.gridSvg, children: [
          g,
          /* @__PURE__ */ l("rect", { width: "100%", height: "100%", fill: "url(#grid)" })
        ] }),
        /* @__PURE__ */ l("div", { ref: i, className: T.canvas, style: { transform: f }, children: e }),
        /* @__PURE__ */ l(Jt, {})
      ]
    }
  );
};
Qt.displayName = "CanvasBase";
const Ue = Le.visualSize / 2, Vi = {
  /** Minimum distance to drag before disconnecting a connection (1 port radius) */
  DISCONNECT_THRESHOLD: Ue,
  /** Minimum distance to start a new connection (small threshold for responsiveness) */
  NEW_CONNECTION_THRESHOLD: 2,
  /** Distance within which a port becomes a candidate for connection */
  CONNECTION_SNAP_DISTANCE: Ue * 4,
  /** Distance within which hovering over a port is detected */
  HOVER_DISTANCE: Ue * 2
};
function ht(e, t) {
  if (!t.snapToGrid)
    return e;
  const { size: n, snapThreshold: o } = t, s = Math.round(e.x / n) * n, r = Math.round(e.y / n) * n, i = Math.abs(e.x - s), a = Math.abs(e.y - r);
  return {
    x: i <= o ? s : e.x,
    y: a <= o ? r : e.y
  };
}
function $i(e, t, n) {
  if (!t.snapToGrid)
    return e;
  const o = e[n];
  if (!o) {
    const c = {};
    return Object.entries(e).forEach(([u, p]) => {
      c[u] = ht(p, t);
    }), c;
  }
  const s = ht(o, t), r = s.x - o.x, i = s.y - o.y, a = {};
  return Object.entries(e).forEach(([c, u]) => {
    a[c] = {
      x: u.x + r,
      y: u.y + i
    };
  }), a;
}
const _i = "xtnnddtrportH4B", Hi = "xtnnddtrportinpJGc", Bi = "xtnnddtrporout68f", Gi = "xtnnddtrportLeft2Oc", Xi = "xtnnddtrporrigHwV", Ui = "xtnnddtrportTopuYu", Yi = "xtnnddtrporbotx0m", Fi = "xtnnddtrporinnCiS", ji = "xtnnddtrporhovI-R", Wi = "xtnnddtrporconf0-", Ki = "xtnnddtrpulsexKp", Zi = "xtnnddtrporcontda", qi = "xtnnddtrporcan", Ji = "xtnnddtrporcone8f", Qi = "xtnnddtrportlblMh9", ea = "xtnnddtrporlefTQ3", ta = "xtnnddtrporrigj3t", na = "xtnnddtrportop2o0", oa = "xtnnddtrporbot6kJ", de = {
  port: _i,
  portInput: Hi,
  portOutput: Bi,
  portLeft: Gi,
  portRight: Xi,
  portTop: Ui,
  portBottom: Yi,
  portInner: Fi,
  portHovered: ji,
  portConnecting: Wi,
  pulse: Ki,
  portConnectable: Zi,
  portCandidate: qi,
  portConnected: Ji,
  portLabel: Qi,
  portLabelLeft: ea,
  portLabelRight: ta,
  portLabelTop: na,
  portLabelBottom: oa
}, en = ({
  port: e,
  onPointerDown: t,
  onPointerUp: n,
  onPointerEnter: o,
  onPointerLeave: s,
  isConnecting: r = !1,
  isConnectable: i = !1,
  isCandidate: a = !1,
  isHovered: c = !1,
  isConnected: u = !1
}) => {
  const p = zt(e.nodeId, e.id), h = () => {
    if (!p)
      return {
        left: 0,
        top: 0,
        position: "absolute"
      };
    const { renderPosition: g } = p;
    return {
      left: g.x,
      top: g.y,
      transform: g.transform,
      position: "absolute"
    };
  }, v = (g) => {
    g.stopPropagation(), t == null || t(g, e);
  }, y = (g) => {
    g.stopPropagation(), n == null || n(g, e);
  }, b = (g) => {
    o == null || o(g, e);
  }, f = (g) => {
    s == null || s(g, e);
  };
  return /* @__PURE__ */ w(
    "div",
    {
      className: Y(
        de.port,
        de[`port${e.type.charAt(0).toUpperCase()}${e.type.slice(1)}`],
        de[`port${e.position.charAt(0).toUpperCase()}${e.position.slice(1)}`],
        r && de.portConnecting,
        i && de.portConnectable,
        a && de.portCandidate,
        c && de.portHovered,
        u && de.portConnected
      ),
      style: h(),
      onPointerDown: v,
      onPointerUp: y,
      onPointerEnter: b,
      onPointerLeave: f,
      "data-port-id": e.id,
      "data-port-type": e.type,
      "data-node-id": e.nodeId,
      title: e.label,
      children: [
        /* @__PURE__ */ l("div", { className: de.portInner }),
        e.label && /* @__PURE__ */ l(
          "span",
          {
            className: Y(
              de.portLabel,
              de[`portLabel${e.position.charAt(0).toUpperCase()}${e.position.slice(1)}`]
            ),
            children: e.label
          }
        )
      ]
    }
  );
};
en.displayName = "PortView";
const sa = "xtnnddtrresMQd", ra = "xtnnddtrresvis", ia = "xtnnddtrresnOA", Ye = {
  resizeHandle: sa,
  resizeHandleVisible: ra,
  resizeHandleActive: ia
}, tn = ({
  position: e,
  onResizeStart: t,
  isResizing: n = !1,
  isVisible: o = !1
}) => {
  const s = d.useCallback((i) => {
    i.stopPropagation(), i.preventDefault(), t(i, e);
  }, [t, e]), r = () => ({
    bottom: -2,
    right: -2,
    cursor: "se-resize",
    width: 10,
    height: 10
  });
  return /* @__PURE__ */ l(
    "div",
    {
      className: Y(
        Ye.resizeHandle,
        o && Ye.resizeHandleVisible,
        n && Ye.resizeHandleActive
      ),
      style: {
        position: "absolute",
        zIndex: 10,
        ...r()
      },
      onPointerDown: s,
      "data-resize-handle": e
    }
  );
};
tn.displayName = "ResizeHandle";
const aa = ({
  node: e,
  isSelected: t,
  isDragging: n,
  dragOffset: o,
  onPointerDown: s,
  onContextMenu: r,
  onPortPointerDown: i,
  onPortPointerUp: a,
  onPortPointerEnter: c,
  onPortPointerLeave: u,
  connectingPort: p,
  hoveredPort: h,
  connectedPorts: v,
  nodeRenderer: y,
  externalData: b,
  onUpdateNode: f
}) => {
  const { dispatch: g, actions: x, getNodePorts: P } = W(), { state: E } = Z(), { isEditing: I, startEditing: M, updateValue: m, confirmEdit: N, cancelEdit: C, state: D } = Fn(), z = wt(), _ = Pt({ autoUpdateMembership: !1 }), S = Qe(e.type), k = Et(e.id), O = _t(e, k), A = d.useRef(null), $ = z.isResizing(e.id), V = z.getResizeHandle(e.id), H = e.type === "group" ? _.getGroupChildren(e.id) : [], U = H.length > 0, B = d.useMemo(
    () => ({
      x: e.position.x,
      y: e.position.y
    }),
    [e.position.x, e.position.y]
  );
  d.useLayoutEffect(() => {
    if (!A.current) return;
    let L = B.x, G = B.y;
    if (n && o)
      L += o.x, G += o.y;
    else if (E.dragState) {
      const { affectedChildNodes: F, offset: Q } = E.dragState;
      Object.entries(F).some(
        ([ve, ue]) => ue.includes(e.id)
      ) && (L += Q.x, G += Q.y);
    }
    A.current.style.transform = `translate(${L}px, ${G}px)`;
  }, [B, n, o, E.dragState, e.id]);
  const X = d.useMemo(() => {
    var F, Q;
    const L = {
      width: ((F = e.size) == null ? void 0 : F.width) || 150,
      height: ((Q = e.size) == null ? void 0 : Q.height) || 50
    }, G = z.getCurrentSize(e.id);
    return $ && G ? G : L;
  }, [e.size, $, z, e.id]), K = d.useMemo(() => {
    switch (e.data.visualState) {
      case "info":
        return T.nodeInfo;
      case "success":
        return T.nodeSuccess;
      case "warning":
        return T.nodeWarning;
      case "error":
        return T.nodeError;
      case "disabled":
        return T.nodeDisabled;
      default:
        return null;
    }
  }, [e.data.visualState]), ne = d.useCallback(
    (L) => {
      if (L.stopPropagation(), !e.locked) {
        const G = e.data.title || `Node ${e.id.slice(0, 6)}`;
        M(e.id, "title", G);
      }
    },
    [e.id, e.data.title, e.locked, M]
  ), ae = d.useCallback(
    (L) => {
      m(L.target.value);
    },
    [m]
  ), ye = d.useCallback(
    (L) => {
      L.key === "Enter" ? (L.preventDefault(), L.stopPropagation(), g(
        x.updateNode(e.id, {
          data: {
            ...e.data,
            title: D.currentValue
          }
        })
      ), N()) : L.key === "Escape" && (L.preventDefault(), L.stopPropagation(), C());
    },
    [D.currentValue, e.id, e.data, g, x, N, C]
  ), De = d.useCallback(() => {
    g(
      x.updateNode(e.id, {
        data: {
          ...e.data,
          title: D.currentValue
        }
      })
    ), N();
  }, [D.currentValue, e.id, e.data, g, x, N]), Ee = d.useCallback(
    (L) => {
      g(x.updateNode(e.id, L));
    },
    [e.id, g, x]
  ), $e = d.useCallback(
    (L, G) => {
      var Q, se;
      if (L.stopPropagation(), L.preventDefault(), e.locked) return;
      const F = {
        width: ((Q = e.size) == null ? void 0 : Q.width) || 150,
        height: ((se = e.size) == null ? void 0 : se.height) || 50
      };
      z.startResize(e.id, G, { x: L.clientX, y: L.clientY }, F);
    },
    [e.id, e.size, e.locked, z]
  ), _e = (S == null ? void 0 : S.renderNode) && !I(e.id, "title"), He = d.useMemo(
    () => ({
      node: e,
      isSelected: t,
      isDragging: n,
      isEditing: I(e.id, "title"),
      externalData: O.data,
      isLoadingExternalData: O.isLoading,
      externalDataError: O.error,
      onStartEdit: () => M(e.id, "title", e.data.title || ""),
      onUpdateNode: Ee
    }),
    [e, t, n, O, M, Ee, I]
  ), Be = d.useMemo(() => {
    if (!E.dragState) return !1;
    const { affectedChildNodes: L } = E.dragState;
    return Object.entries(L).some(([G, F]) => F.includes(e.id));
  }, [E.dragState, e.id]), J = d.useCallback(
    (L) => {
      if ((S == null ? void 0 : S.interactive) && !t) {
        const Q = L.target.closest('[data-drag-handle="true"]');
        s(L, e.id, !!Q);
      } else
        s(L, e.id, !0);
    },
    [S == null ? void 0 : S.interactive, e.id, t, s]
  );
  return /* @__PURE__ */ w(
    "div",
    {
      ref: A,
      className: Y(
        T.nodeView,
        e.type === "group" && T.groupNode,
        e.type === "group" && U && T.groupHasChildren,
        t && T.selected,
        (n || Be) && T.dragging,
        $ && T.resizing,
        e.locked && T.locked,
        K || void 0
      ),
      style: {
        width: X.width,
        height: X.height,
        zIndex: n || $ ? 1e3 : e.type === "group" ? 1 : 2
      },
      onPointerDown: J,
      onContextMenu: (L) => r(L, e.id),
      "data-node-id": e.id,
      children: [
        _e && (S != null && S.renderNode) ? /* @__PURE__ */ l("div", { className: T.customNodeContent, children: S.renderNode(He) }) : /* @__PURE__ */ w(le, { children: [
          /* @__PURE__ */ w(
            "div",
            {
              className: Y(
                T.nodeHeader,
                (S == null ? void 0 : S.interactive) && !t && T.interactiveDragHandle
              ),
              "data-drag-handle": S != null && S.interactive ? "true" : "false",
              children: [
                e.locked && /* @__PURE__ */ l("span", { className: T.lockIcon, children: "🔒" }),
                I(e.id, "title") ? /* @__PURE__ */ l(
                  "input",
                  {
                    id: `node-title-${e.id}`,
                    name: "nodeTitle",
                    className: T.nodeTitleInput,
                    type: "text",
                    value: D.currentValue,
                    onChange: ae,
                    onKeyDown: ye,
                    onBlur: De,
                    autoFocus: !0,
                    onClick: (L) => L.stopPropagation(),
                    "aria-label": "Node title"
                  }
                ) : /* @__PURE__ */ l("span", { className: T.nodeTitle, onDoubleClick: ne, children: e.data.title || `Node ${e.id.slice(0, 6)}` })
              ]
            }
          ),
          /* @__PURE__ */ l("div", { className: T.nodeContent, children: e.type === "group" ? /* @__PURE__ */ l(ca, { node: e, childCount: H.length }) : e.data.content || "Empty node" })
        ] }),
        (() => {
          const L = P(e.id);
          return !L || L.length === 0 ? null : (L.reduce((G, F) => (G[F.position] || (G[F.position] = []), G[F.position].push(F), G), {}), /* @__PURE__ */ l("div", { className: T.nodePorts, children: L.map((G) => {
            var F, Q, se;
            return /* @__PURE__ */ l(
              en,
              {
                port: G,
                onPointerDown: i,
                onPointerUp: a,
                onPointerEnter: c,
                onPointerLeave: u,
                isConnecting: ((F = E.connectionDragState) == null ? void 0 : F.fromPort.id) === G.id,
                isConnectable: E.connectablePortIds.has(G.id),
                isCandidate: ((se = (Q = E.connectionDragState) == null ? void 0 : Q.candidatePort) == null ? void 0 : se.id) === G.id,
                isHovered: (h == null ? void 0 : h.id) === G.id,
                isConnected: v == null ? void 0 : v.has(G.id)
              },
              G.id
            );
          }) }));
        })(),
        t && !e.locked && /* @__PURE__ */ l(tn, { position: "se", onResizeStart: $e, isResizing: V === "se" })
      ]
    }
  );
}, ca = ({ node: e, childCount: t }) => e.expanded ? /* @__PURE__ */ l("div", { className: T.groupExpanded, children: t > 0 ? `Contains ${t} nodes` : "Empty group - Drop nodes here" }) : /* @__PURE__ */ l("div", { className: T.groupCollapsed, children: t > 0 ? `${t} nodes - Click to expand` : "Empty group - Drop nodes here" }), da = (e, t) => {
  var n, o, s, r, i, a, c, u, p, h, v, y, b, f;
  if (e.node.id !== t.node.id || e.isSelected !== t.isSelected || e.isDragging !== t.isDragging || e.isResizing !== t.isResizing || e.node.position.x !== t.node.position.x || e.node.position.y !== t.node.position.y || ((n = e.node.size) == null ? void 0 : n.width) !== ((o = t.node.size) == null ? void 0 : o.width) || ((s = e.node.size) == null ? void 0 : s.height) !== ((r = t.node.size) == null ? void 0 : r.height) || e.node.locked !== t.node.locked || e.node.data !== t.node.data || ((i = e.dragOffset) == null ? void 0 : i.x) !== ((a = t.dragOffset) == null ? void 0 : a.x) || ((c = e.dragOffset) == null ? void 0 : c.y) !== ((u = t.dragOffset) == null ? void 0 : u.y) || ((p = e.connectingPort) == null ? void 0 : p.id) !== ((h = t.connectingPort) == null ? void 0 : h.id) || ((v = e.hoveredPort) == null ? void 0 : v.id) !== ((y = t.hoveredPort) == null ? void 0 : y.id))
    return !1;
  if (e.node.ports)
    for (const g of e.node.ports) {
      const x = ((b = e.connectedPorts) == null ? void 0 : b.has(g.id)) ?? !1, P = ((f = t.connectedPorts) == null ? void 0 : f.has(g.id)) ?? !1;
      if (x !== P)
        return !1;
    }
  return !0;
}, nn = d.memo(aa, da);
nn.displayName = "NodeView";
function la(e, t) {
  return Object.values(t).filter(
    (n) => n.fromPortId === e.id && n.fromNodeId === e.nodeId || n.toPortId === e.id && n.toNodeId === e.nodeId
  );
}
function ua(e, t, n, o, s, r) {
  const i = o[e];
  if (!i || i.locked) return [];
  if (s && !r && !n.includes(e))
    return [];
  let a;
  if (n.includes(e))
    a = n.filter((c) => {
      const u = o[c];
      return !(!u || u.locked || u.parentId && n.includes(u.parentId));
    });
  else if (t) {
    const c = [...n, e];
    a = c.filter((u) => {
      const p = o[u];
      return !(!p || p.locked || p.parentId && c.includes(p.parentId));
    });
  } else {
    if (s && !r)
      return [];
    a = [e];
  }
  return a;
}
function ft(e, t) {
  return e.type === t.type || e.nodeId === t.nodeId ? null : e.type === "output" ? {
    fromNodeId: e.nodeId,
    fromPortId: e.id,
    toNodeId: t.nodeId,
    toPortId: t.id
  } : {
    fromNodeId: t.nodeId,
    fromPortId: t.id,
    toNodeId: e.nodeId,
    toPortId: e.id
  };
}
function pa(e, t) {
  const n = e.type !== t.type, o = e.nodeId === t.nodeId;
  return n && !o;
}
function ha(e, t, n) {
  const o = {}, s = {};
  return e.forEach((r) => {
    const i = t[r];
    if (i && (o[r] = { ...i.position }, i.type === "group")) {
      const a = n(r);
      s[r] = a.map((c) => c.id), a.forEach((c) => {
        o[c.id] = { ...c.position };
      });
    }
  }), { initialPositions: o, affectedChildNodes: s };
}
function fa(e, t, n) {
  const o = {};
  return e.forEach((s) => {
    const r = t[s];
    r && (o[s] = {
      x: r.x + n.x,
      y: r.y + n.y
    });
  }), o;
}
function ga(e, t, n, o, s) {
  const r = e.filter((a) => {
    const c = t[a];
    return c && c.type === "group";
  });
  if (r.length === 0)
    return n;
  r.forEach((a) => {
    const c = o[a], u = n[a];
    if (c && u) {
      const p = {
        x: u.x - c.x,
        y: u.y - c.y
      };
      s(a, p);
    }
  });
  const i = {};
  return e.forEach((a) => {
    const c = t[a];
    c && c.type !== "group" && n[a] && (i[a] = n[a]);
  }), i;
}
function ma(e, t, n, o) {
  const s = e.fromPortId === t.id && e.fromNodeId === t.nodeId, r = s ? e.toNodeId : e.fromNodeId, i = s ? e.toPortId : e.fromPortId, a = n[r];
  if (!a) return null;
  const u = o(r).find((p) => p.id === i);
  return u ? { otherNode: a, otherPort: u, isFromPort: s } : null;
}
const on = ({ className: e, doubleClickToEdit: t = !0 }) => {
  const { state: n, dispatch: o, actions: s, getNodePorts: r } = W(), { state: i, dispatch: a, actions: c } = Z(), { state: u } = ie(), p = Je();
  wt({
    minWidth: 100,
    minHeight: 40,
    snapToGrid: u.gridSettings.snapToGrid,
    gridSize: u.gridSettings.size
  });
  const h = Pt({
    autoUpdateMembership: !0,
    membershipUpdateDelay: 200
  }), v = ho(n.nodes), y = d.useMemo(() => v.sort((m, N) => m.type === "group" && N.type !== "group" ? -1 : m.type !== "group" && N.type === "group" ? 1 : 0), [v]), b = d.useMemo(() => {
    const m = /* @__PURE__ */ new Set();
    return Object.values(n.connections).forEach((N) => {
      m.add(N.fromPortId), m.add(N.toPortId);
    }), m;
  }, [n.connections]);
  d.useEffect(() => {
    a(c.updateConnectedPorts(b));
  }, [b, a, c]);
  const f = d.useCallback(
    (m, N) => {
      m.preventDefault(), m.stopPropagation();
      const C = {
        x: m.clientX,
        y: m.clientY
      };
      a(c.showContextMenu(C, N));
    },
    [a, c]
  ), g = d.useCallback(
    (m, N, C = !0) => {
      if (m.button !== 0) return;
      m.stopPropagation();
      const D = n.nodes[N], z = m.shiftKey || m.metaKey || m.ctrlKey;
      if (D != null && D.locked) {
        a(c.selectNode(N, z));
        return;
      }
      const _ = D ? p.registry.get(D.type) : void 0, S = (_ == null ? void 0 : _.interactive) || !1;
      if (S && !C && !i.selectedNodeIds.includes(N)) {
        a(c.selectNode(N, z));
        return;
      }
      const k = ua(
        N,
        z,
        i.selectedNodeIds,
        n.nodes,
        S,
        C
      );
      if (i.selectedNodeIds.includes(N) || a(c.selectNode(N, z)), k.length === 0) return;
      const O = {
        x: m.clientX,
        y: m.clientY
      }, { initialPositions: A, affectedChildNodes: $ } = ha(
        k,
        n.nodes,
        h.getGroupChildren
      );
      a(c.startNodeDrag(k, O, A, $));
    },
    [a, c, i.selectedNodeIds, n.nodes, h, p]
  ), x = d.useRef(null), P = d.useCallback(
    (m, N) => {
      m.stopPropagation();
      const C = n.nodes[N.nodeId];
      if (!C) return;
      const D = {
        ...C,
        ports: r(N.nodeId)
      }, _ = Ve(D).get(N.id), S = (_ == null ? void 0 : _.connectionPoint) || { x: C.position.x, y: C.position.y }, k = la(N, n.connections);
      if (x.current = {
        x: m.clientX,
        y: m.clientY,
        port: N,
        hasConnection: k.length > 0
      }, k.length === 0) {
        const V = {
          id: N.id,
          nodeId: N.nodeId,
          type: N.type,
          label: N.label,
          position: N.position
        };
        a(c.startConnectionDrag(V)), a(c.updateConnectionDrag(S, null));
        return;
      }
      const O = (V) => {
        if (!x.current) return;
        const H = V.clientX - x.current.x, U = V.clientY - x.current.y;
        Math.sqrt(H * H + U * U) > Vi.DISCONNECT_THRESHOLD && (document.removeEventListener("pointermove", O), document.removeEventListener("pointerup", A), $());
      }, A = () => {
        x.current = null, document.removeEventListener("pointermove", O), document.removeEventListener("pointerup", A);
      }, $ = () => {
        const V = k[0], H = ma(V, N, n.nodes, r);
        if (!H) return;
        const { otherNode: U, otherPort: B, isFromPort: X } = H, K = {
          id: B.id,
          nodeId: U.id,
          type: B.type,
          label: B.label,
          position: B.position
        };
        a(
          c.startConnectionDisconnect(
            {
              id: V.id,
              fromNodeId: V.fromNodeId,
              fromPortId: V.fromPortId,
              toNodeId: V.toNodeId,
              toPortId: V.toPortId
            },
            X ? "from" : "to",
            K,
            S
          )
        ), o(s.deleteConnection(V.id)), x.current = null;
      };
      document.addEventListener("pointermove", O), document.addEventListener("pointerup", A);
    },
    [
      n.connections,
      n.nodes,
      a,
      c,
      o,
      s,
      r
    ]
  ), E = d.useCallback(
    (m, N) => {
      if (m.stopPropagation(), i.connectionDisconnectState) {
        const _ = i.connectionDisconnectState.fixedPort;
        if (pa(_, N)) {
          const S = ft(_, N);
          S && o(s.addConnection(S));
        }
        a(c.endConnectionDisconnect());
        return;
      }
      if (!i.connectionDragState) return;
      const C = i.connectionDragState.fromPort, D = ft(C, N);
      D && o(s.addConnection(D)), a(c.endConnectionDrag());
    },
    [
      i.connectionDragState,
      i.connectionDisconnectState,
      a,
      c,
      o,
      s
    ]
  ), I = d.useCallback(
    (m, N) => {
      const C = {
        id: N.id,
        nodeId: N.nodeId,
        type: N.type,
        label: N.label,
        position: N.position
      };
      a(c.setHoveredPort(C));
    },
    [a, c]
  ), M = d.useCallback(() => {
    a(c.setHoveredPort(null));
  }, [a, c]);
  return d.useEffect(() => {
    if (!i.dragState) return;
    const m = (C) => {
      if (!i.dragState) return;
      const D = (C.clientX - i.dragState.startPosition.x) / u.viewport.scale, z = (C.clientY - i.dragState.startPosition.y) / u.viewport.scale;
      a(c.updateNodeDrag({ x: D, y: z }));
    }, N = () => {
      if (!i.dragState) return;
      const { nodeIds: C, initialPositions: D, offset: z } = i.dragState, _ = fa(C, D, z), S = u.gridSettings.snapToGrid ? $i(_, u.gridSettings, C[0]) : _, k = ga(
        C,
        n.nodes,
        S,
        D,
        h.moveGroupWithChildren
      );
      Object.keys(k).length > 0 && o(s.moveNodes(k)), a(c.endNodeDrag());
    };
    return window.addEventListener("pointermove", m, { passive: !0 }), window.addEventListener("pointerup", N, { once: !0 }), () => {
      window.removeEventListener("pointermove", m), window.removeEventListener("pointerup", N);
    };
  }, [
    i.dragState,
    u.viewport.scale,
    u.gridSettings,
    a,
    c,
    o,
    s,
    n.nodes,
    h
  ]), it({
    interactionState: i.connectionDragState,
    viewport: u.viewport,
    onPointerMove: (m) => {
      a(c.updateConnectionDrag(m, null));
    },
    onPointerUp: () => {
      a(c.endConnectionDrag());
    }
  }), it({
    interactionState: i.connectionDisconnectState,
    viewport: u.viewport,
    onPointerMove: (m) => {
      a(c.updateConnectionDisconnect(m, null));
    },
    onPointerUp: () => {
      a(c.endConnectionDisconnect());
    }
  }), /* @__PURE__ */ l("div", { className: Y(T.nodeLayer, e), children: y.map((m) => {
    var N, C, D;
    return /* @__PURE__ */ l(
      nn,
      {
        node: m,
        isSelected: i.selectedNodeIds.includes(m.id),
        isDragging: ((N = i.dragState) == null ? void 0 : N.nodeIds.includes(m.id)) ?? !1,
        dragOffset: (C = i.dragState) != null && C.nodeIds.includes(m.id) ? i.dragState.offset : void 0,
        onPointerDown: g,
        onContextMenu: f,
        onPortPointerDown: P,
        onPortPointerUp: E,
        onPortPointerEnter: I,
        onPortPointerLeave: M,
        connectingPort: (D = i.connectionDragState) != null && D.fromPort ? {
          id: i.connectionDragState.fromPort.id,
          type: i.connectionDragState.fromPort.type,
          label: i.connectionDragState.fromPort.label,
          nodeId: i.connectionDragState.fromPort.nodeId,
          position: i.connectionDragState.fromPort.position
        } : void 0,
        hoveredPort: i.hoveredPort ? {
          id: i.hoveredPort.id,
          type: i.hoveredPort.type,
          label: i.hoveredPort.label,
          nodeId: i.hoveredPort.nodeId,
          position: i.hoveredPort.position
        } : void 0,
        connectedPorts: b
      },
      m.id
    );
  }) });
};
on.displayName = "NodeLayer";
function ya(e, t) {
  const n = t.x - e.x, o = t.y - e.y;
  return Math.sqrt(n * n + o * o);
}
function Md(e, t) {
  const n = t.x - e.x, o = t.y - e.y, s = Math.sqrt(n * n + o * o);
  return { dx: n, dy: o, distance: s };
}
function Td(e, t) {
  return { x: e.x + t.x, y: e.y + t.y };
}
function Od(e, t) {
  return { x: e.x - t.x, y: e.y - t.y };
}
function Ad(e, t) {
  return { x: e.x * t, y: e.y * t };
}
const gt = (e) => ({
  left: "right",
  right: "left",
  top: "bottom",
  bottom: "top"
})[e] || "left", We = (e, t, n, o) => {
  const s = ya(e, t);
  let a = Math.max(40, Math.min(120, s * 0.5));
  (n === "right" && o === "left" || n === "left" && o === "right" || n === "top" && o === "bottom" || n === "bottom" && o === "top") && (a = Math.max(a, s * 0.4));
  let u = e.x, p = e.y, h = t.x, v = t.y;
  switch (n) {
    case "left":
      u = e.x - a;
      break;
    case "right":
      u = e.x + a;
      break;
    case "top":
      p = e.y - a;
      break;
    case "bottom":
      p = e.y + a;
      break;
    default:
      u = e.x + a;
  }
  switch (o) {
    case "left":
      h = t.x - a;
      break;
    case "right":
      h = t.x + a;
      break;
    case "top":
      v = t.y - a;
      break;
    case "bottom":
      v = t.y + a;
      break;
    default:
      h = t.x - a;
  }
  return `M ${e.x} ${e.y} C ${u} ${p}, ${h} ${v}, ${t.x} ${t.y}`;
}, va = ({
  connection: e,
  fromNode: t,
  toNode: n,
  fromPort: o,
  toPort: s,
  isSelected: r,
  isHovered: i,
  isDragging: a,
  dragProgress: c = 0,
  fromNodePosition: u,
  toNodePosition: p,
  fromNodeSize: h,
  toNodeSize: v,
  onPointerDown: y,
  onPointerEnter: b,
  onPointerLeave: f
}) => {
  const g = Se(t.id, o.id), x = Se(n.id, s.id), P = d.useMemo(() => {
    if (!g)
      return { x: t.position.x, y: t.position.y };
    if (u) {
      const D = u.x - t.position.x, z = u.y - t.position.y;
      return {
        x: g.x + D,
        y: g.y + z
      };
    }
    return g;
  }, [g, t.position.x, t.position.y, u == null ? void 0 : u.x, u == null ? void 0 : u.y]), E = d.useMemo(() => {
    if (!x)
      return { x: n.position.x, y: n.position.y };
    if (p) {
      const D = p.x - n.position.x, z = p.y - n.position.y;
      return {
        x: x.x + D,
        y: x.y + z
      };
    }
    return x;
  }, [x, n.position.x, n.position.y, p == null ? void 0 : p.x, p == null ? void 0 : p.y]), I = d.useMemo(
    () => We(P, E, o.position, s.position),
    [P.x, P.y, E.x, E.y, o.position, s.position]
  ), M = d.useMemo(() => a && c > 0 ? c > 0.5 ? "var(--cautionColor, #ff3b30)" : "var(--connectionColor, #999)" : r ? "var(--accentColor, #0066cc)" : i ? "var(--connectionHoverColor, #666)" : "var(--connectionColor, #999)", [a, c, r, i]), m = (D) => {
    D.stopPropagation(), y == null || y(D, e.id);
  }, N = (D) => {
    b == null || b(D, e.id);
  }, C = (D) => {
    f == null || f(D, e.id);
  };
  return /* @__PURE__ */ w(
    "g",
    {
      className: Y(
        T.connectionGroup,
        r && T.connectionSelected,
        i && T.connectionHovered,
        a && T.connectionDragging
      ),
      "data-connection-id": e.id,
      children: [
        /* @__PURE__ */ l(
          "path",
          {
            d: I,
            fill: "none",
            stroke: "transparent",
            strokeWidth: 20,
            style: { cursor: "pointer" },
            onPointerDown: m,
            onPointerEnter: N,
            onPointerLeave: C
          }
        ),
        /* @__PURE__ */ l(
          "path",
          {
            d: I,
            fill: "none",
            stroke: M,
            strokeWidth: r || i ? 3 : 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            style: {
              transition: "stroke 0.2s, stroke-width 0.2s",
              pointerEvents: "none"
            }
          }
        ),
        /* @__PURE__ */ l("defs", { children: /* @__PURE__ */ l(
          "marker",
          {
            id: `arrow-${e.id}`,
            viewBox: "0 0 10 10",
            refX: "9",
            refY: "5",
            markerWidth: "6",
            markerHeight: "6",
            orient: "auto",
            children: /* @__PURE__ */ l("path", { d: "M 0 0 L 10 5 L 0 10 z", fill: M, style: { transition: "fill 0.2s" } })
          }
        ) }),
        /* @__PURE__ */ l(
          "path",
          {
            d: I,
            fill: "none",
            stroke: "transparent",
            markerEnd: `url(#arrow-${e.id})`,
            style: { pointerEvents: "none" }
          }
        )
      ]
    }
  );
}, ba = (e, t) => {
  var n, o, s, r, i, a, c, u, p, h, v, y, b, f, g, x, P, E, I, M, m, N, C, D;
  return !(e.connection.id !== t.connection.id || e.isSelected !== t.isSelected || e.isHovered !== t.isHovered || e.isDragging !== t.isDragging || e.dragProgress !== t.dragProgress || e.fromNode.position.x !== t.fromNode.position.x || e.fromNode.position.y !== t.fromNode.position.y || e.toNode.position.x !== t.toNode.position.x || e.toNode.position.y !== t.toNode.position.y || ((n = e.fromNodePosition) == null ? void 0 : n.x) !== ((o = t.fromNodePosition) == null ? void 0 : o.x) || ((s = e.fromNodePosition) == null ? void 0 : s.y) !== ((r = t.fromNodePosition) == null ? void 0 : r.y) || ((i = e.toNodePosition) == null ? void 0 : i.x) !== ((a = t.toNodePosition) == null ? void 0 : a.x) || ((c = e.toNodePosition) == null ? void 0 : c.y) !== ((u = t.toNodePosition) == null ? void 0 : u.y) || ((p = e.fromNode.size) == null ? void 0 : p.width) !== ((h = t.fromNode.size) == null ? void 0 : h.width) || ((v = e.fromNode.size) == null ? void 0 : v.height) !== ((y = t.fromNode.size) == null ? void 0 : y.height) || ((b = e.toNode.size) == null ? void 0 : b.width) !== ((f = t.toNode.size) == null ? void 0 : f.width) || ((g = e.toNode.size) == null ? void 0 : g.height) !== ((x = t.toNode.size) == null ? void 0 : x.height) || ((P = e.fromNodeSize) == null ? void 0 : P.width) !== ((E = t.fromNodeSize) == null ? void 0 : E.width) || ((I = e.fromNodeSize) == null ? void 0 : I.height) !== ((M = t.fromNodeSize) == null ? void 0 : M.height) || ((m = e.toNodeSize) == null ? void 0 : m.width) !== ((N = t.toNodeSize) == null ? void 0 : N.width) || ((C = e.toNodeSize) == null ? void 0 : C.height) !== ((D = t.toNodeSize) == null ? void 0 : D.height) || e.fromPort.position !== t.fromPort.position || e.toPort.position !== t.toPort.position);
}, sn = d.memo(va, ba);
sn.displayName = "ConnectionView";
const rn = ({ className: e }) => {
  const { state: t } = W();
  return /* @__PURE__ */ w("svg", { className: Y(T.connectionLayer, e), children: [
    Object.values(t.connections).map((n) => /* @__PURE__ */ l(Na, { connection: n }, n.id)),
    /* @__PURE__ */ l(xa, {})
  ] });
};
rn.displayName = "ConnectionLayer";
const xa = d.memo(() => {
  var u, p, h, v;
  const { state: e } = Z(), { state: t, getPort: n } = W(), o = (u = e.connectionDragState) == null ? void 0 : u.fromPort.id, s = (p = e.connectionDragState) == null ? void 0 : p.fromPort.nodeId, r = (h = e.connectionDisconnectState) == null ? void 0 : h.fixedPort.id, i = (v = e.connectionDisconnectState) == null ? void 0 : v.fixedPort.nodeId, a = Se(s || "", o || ""), c = Se(i || "", r || "");
  if (e.connectionDragState) {
    const y = e.connectionDragState.fromPort;
    if (!t.nodes[y.nodeId]) return null;
    const f = n(y.nodeId, y.id);
    if (!f || !a) return null;
    const g = e.connectionDragState.toPosition, x = We(
      a,
      g,
      f.position,
      gt(f.position)
    );
    return /* @__PURE__ */ l("g", { className: T.dragConnection, children: /* @__PURE__ */ l(
      "path",
      {
        d: x,
        fill: "none",
        stroke: "var(--accentColor, #0066cc)",
        strokeWidth: 2,
        strokeDasharray: "5,5",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        style: { pointerEvents: "none" }
      }
    ) });
  }
  if (e.connectionDisconnectState) {
    const y = e.connectionDisconnectState;
    if (!t.nodes[y.fixedPort.nodeId]) return null;
    const f = n(y.fixedPort.nodeId, y.fixedPort.id);
    if (!f || !c) return null;
    const g = y.draggingPosition, x = We(
      c,
      g,
      f.position,
      gt(f.position)
    );
    return /* @__PURE__ */ l("g", { className: T.dragConnection, children: /* @__PURE__ */ l(
      "path",
      {
        d: x,
        fill: "none",
        stroke: "var(--cautionColor, #ff3b30)",
        strokeWidth: 3,
        strokeDasharray: "8,4",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        style: { pointerEvents: "none" }
      }
    ) });
  }
  return null;
}), Na = ({ connection: e }) => {
  const { state: t, getPort: n } = W(), { state: o, dispatch: s, actions: r } = Z(), { state: i } = ie(), a = Se(e.fromNodeId, e.fromPortId), c = Se(e.toNodeId, e.toPortId), u = d.useCallback(
    (E, I) => {
      var k;
      const M = t.nodes[e.fromNodeId], m = t.nodes[e.toNodeId], N = n(e.fromNodeId, e.fromPortId), C = n(e.toNodeId, e.toPortId);
      if (!M || !m || !N || !C || !a || !c) return;
      const D = a, z = c;
      (D.x + z.x) / 2, (D.y + z.y) / 2;
      const _ = (k = E.currentTarget.closest("svg")) == null ? void 0 : k.getBoundingClientRect();
      if (!_) return;
      (E.clientX - _.left) / i.viewport.scale - i.viewport.offset.x, (E.clientY - _.top) / i.viewport.scale - i.viewport.offset.y, Math.sqrt(Math.pow(z.x - D.x, 2) + Math.pow(z.y - D.y, 2));
      const S = E.shiftKey || E.metaKey || E.ctrlKey;
      s(r.selectConnection(I, S));
    },
    [e, t, n, s, r, i.viewport]
  ), p = d.useCallback(
    (E, I) => {
      s(r.setHoveredConnection(I));
    },
    [s, r]
  ), h = d.useCallback(
    (E, I) => {
      s(r.setHoveredConnection(null));
    },
    [s, r]
  ), v = t.nodes[e.fromNodeId], y = t.nodes[e.toNodeId], b = n(e.fromNodeId, e.fromPortId), f = n(e.toNodeId, e.toPortId);
  if (!v || !y || !b || !f || v.visible === !1 || y.visible === !1) return null;
  const g = (E, I) => {
    let M = null, m = null;
    if (o.dragState) {
      const { nodeIds: N, offset: C, affectedChildNodes: D } = o.dragState;
      N.includes(I) ? M = {
        x: E.position.x + C.x,
        y: E.position.y + C.y
      } : Object.entries(D).some(
        ([_, S]) => S.includes(I)
      ) && (M = {
        x: E.position.x + C.x,
        y: E.position.y + C.y
      });
    }
    return o.resizeState && o.resizeState.nodeId === I && (m = o.resizeState.currentSize), { previewPosition: M, previewSize: m };
  }, x = g(v, e.fromNodeId), P = g(y, e.toNodeId);
  return /* @__PURE__ */ l(
    sn,
    {
      connection: e,
      fromNode: v,
      toNode: y,
      fromPort: b,
      toPort: f,
      fromNodePosition: x.previewPosition || void 0,
      toNodePosition: P.previewPosition || void 0,
      fromNodeSize: x.previewSize || void 0,
      toNodeSize: P.previewSize || void 0,
      isSelected: o.selectedConnectionIds.includes(e.id),
      isHovered: o.hoveredConnectionId === e.id,
      onPointerDown: u,
      onPointerEnter: p,
      onPointerLeave: h
    },
    e.id
  );
}, Ca = "xtnnddtrstasecqAz", Sa = "xtnnddtrstaE3x", Ea = "xtnnddtrstavalKN5", wa = "xtnnddtrstamod3Xj", Ia = "xtnnddtrstasavozp", Ae = {
  statusSection: Ca,
  statusLabel: Sa,
  statusValue: Ea,
  statusMode: wa,
  statusSaving: Ia
}, fe = ({
  label: e,
  value: t,
  className: n,
  labelClassName: o,
  valueClassName: s
}) => /* @__PURE__ */ w("div", { className: Y(Ae.statusSection, n), children: [
  /* @__PURE__ */ w("span", { className: Y(Ae.statusLabel, o), children: [
    e,
    ":"
  ] }),
  /* @__PURE__ */ l("span", { className: Y(Ae.statusValue, s), children: t })
] });
fe.displayName = "StatusSection";
const mt = Ae, Da = "xtnnddtrfltcnt", Pa = "xtnnddtrtop", ka = "xtnnddtrbottom", Ma = "xtnnddtrtopLeft", Ta = "xtnnddtrtopRight", Oa = "xtnnddtrbotlef", Aa = "xtnnddtrbotrig", me = {
  floatingContainer: Da,
  top: Pa,
  bottom: ka,
  topLeft: Ma,
  topRight: Ta,
  bottomLeft: Oa,
  bottomRight: Aa
}, an = ({
  position: e = "top",
  className: t,
  children: n
}) => {
  const o = d.useMemo(() => {
    switch (e) {
      case "top":
        return me.top;
      case "bottom":
        return me.bottom;
      case "top-left":
        return me.topLeft;
      case "top-right":
        return me.topRight;
      case "bottom-left":
        return me.bottomLeft;
      case "bottom-right":
        return me.bottomRight;
      default:
        return me.top;
    }
  }, [e]);
  return /* @__PURE__ */ l("div", { className: `${me.floatingContainer} ${o} ${t || ""}`, children: n });
}, cn = ({ className: e, autoSave: t, isSaving: n, settingsManager: o }) => {
  const { state: s } = W(), { state: r } = Z(), { state: i } = ie(), a = r.selectedNodeIds.length, c = r.selectedConnectionIds.length, u = Object.keys(s.nodes).length, p = Object.keys(s.connections).length, h = Math.round(i.viewport.scale * 100), y = r.dragState ? "Moving" : r.selectionBox ? "Selecting" : r.connectionDragState ? "Connecting" : i.isSpacePanning || i.panState.isPanning ? "Panning" : "Ready", b = () => r.dragState ? `Offset: (${Math.round(r.dragState.offset.x)}, ${Math.round(r.dragState.offset.y)})` : `Canvas: (${Math.round(i.viewport.offset.x)}, ${Math.round(i.viewport.offset.y)})`;
  return /* @__PURE__ */ w("div", { className: Y(T.statusBar, e), "data-testid": "status-bar", children: [
    /* @__PURE__ */ l(
      fe,
      {
        label: "Selection",
        value: /* @__PURE__ */ w(le, { children: [
          a > 0 && `${a} node${a !== 1 ? "s" : ""}`,
          a > 0 && c > 0 && ", ",
          c > 0 && `${c} connection${c !== 1 ? "s" : ""}`,
          a === 0 && c === 0 && "None"
        ] })
      }
    ),
    /* @__PURE__ */ l(
      fe,
      {
        label: "Total",
        value: `${u} nodes, ${p} connections`
      }
    ),
    /* @__PURE__ */ l(
      fe,
      {
        label: "Mode",
        value: y,
        valueClassName: mt.statusMode
      }
    ),
    /* @__PURE__ */ l(
      fe,
      {
        label: "Zoom",
        value: `${h}%`
      }
    ),
    /* @__PURE__ */ l(
      fe,
      {
        label: "Position",
        value: b()
      }
    ),
    i.gridSettings.showGrid && /* @__PURE__ */ l(
      fe,
      {
        label: "Grid",
        value: /* @__PURE__ */ w(le, { children: [
          i.gridSettings.size,
          "px",
          i.gridSettings.snapToGrid && " (Snap ON)"
        ] })
      }
    ),
    t && /* @__PURE__ */ l(
      fe,
      {
        label: "Auto-save",
        value: n ? "Saving..." : "ON",
        valueClassName: n ? mt.statusSaving : void 0
      }
    ),
    o && /* @__PURE__ */ l(
      fe,
      {
        label: "Theme",
        value: o.getValue("appearance.theme") || "light"
      }
    )
  ] });
};
cn.displayName = "StatusBar";
const za = "xtnnddtrnodseamen", Ra = "xtnnddtrnodseamen2we", La = "xtnnddtrmenfadin", Va = "xtnnddtrsea", $a = "xtnnddtrseaFFM", _a = "xtnnddtrseahin", Ha = "xtnnddtrseares", Ba = "xtnnddtrcatlis", Ga = "xtnnddtrcat", Xa = "xtnnddtrcatLLn", Ua = "xtnnddtrselcat", Ya = "xtnnddtrcatnam", Fa = "xtnnddtrnodcou", ja = "xtnnddtrnodeList", Wa = "xtnnddtrnodeitm", Ka = "xtnnddtrselNode", Za = "xtnnddtrnodeico", qa = "xtnnddtrnodeinfGlE", Ja = "xtnnddtrnodeName", Qa = "xtnnddtrnoddes", ec = "xtnnddtrnodeType", tc = "xtnnddtrnores", nc = "xtnnddtrnoresB5e", oc = "xtnnddtrsealRp", sc = "xtnnddtrselHCh", j = {
  nodeSearchMenuContainer: za,
  nodeSearchMenu: Ra,
  menuFadeIn: La,
  searchHeader: Va,
  searchInput: $a,
  searchHint: _a,
  searchResults: Ha,
  categoryList: Ba,
  categoryGroup: Ga,
  categoryHeader: Xa,
  selectedCategory: Ua,
  categoryName: Ya,
  nodeCount: Fa,
  nodeList: ja,
  nodeItem: Wa,
  selectedNode: Ka,
  nodeIcon: Za,
  nodeInfo: qa,
  nodeName: Ja,
  nodeDescription: Qa,
  nodeType: ec,
  noResults: tc,
  noResultsIcon: nc,
  searchFooter: oc,
  selectionInfo: sc
}, dn = ({
  position: e,
  nodeDefinitions: t,
  onCreateNode: n,
  onClose: o,
  visible: s
}) => {
  const [r, i] = d.useState(""), [a, c] = d.useState(0), [u, p] = d.useState(null), [h, v] = d.useState({ x: e.x, y: e.y }), y = d.useRef(null), b = d.useRef(null), f = d.useMemo(() => {
    const I = /* @__PURE__ */ new Map();
    return t.forEach((M) => {
      const m = M.category || "Other";
      I.has(m) || I.set(m, []), I.get(m).push(M);
    }), Array.from(I.entries()).map(([M, m]) => ({
      name: M,
      nodes: m.sort((N, C) => N.displayName.localeCompare(C.displayName))
    }));
  }, [t]), g = d.useMemo(() => {
    if (!r.trim())
      return u ? f.filter((m) => m.name === u) : f;
    const I = r.toLowerCase(), M = [];
    return f.forEach((m) => {
      const N = m.nodes.filter(
        (C) => {
          var D;
          return C.displayName.toLowerCase().includes(I) || ((D = C.description) == null ? void 0 : D.toLowerCase().includes(I)) || C.type.toLowerCase().includes(I) || m.name.toLowerCase().includes(I);
        }
      );
      N.length > 0 && M.push({
        name: m.name,
        nodes: N
      });
    }), M;
  }, [r, f, u]), x = d.useMemo(() => {
    const I = [];
    return g.forEach((M) => {
      M.nodes.forEach((m) => {
        I.push({ category: M.name, node: m });
      });
    }), I;
  }, [g]);
  d.useEffect(() => {
    s && y.current && y.current.focus();
  }, [s]), d.useEffect(() => {
    s && (i(""), c(0), p(null), setTimeout(() => {
      if (b.current) {
        const I = b.current.getBoundingClientRect(), M = Dn(), m = Pn(e.x, e.y, I.width, I.height, M);
        v(m);
      }
    }, 0));
  }, [s, e]);
  const P = d.useCallback(
    (I) => {
      var M;
      switch (I.key) {
        case "ArrowDown":
          I.preventDefault(), c((C) => Math.min(C + 1, x.length - 1));
          break;
        case "ArrowUp":
          I.preventDefault(), c((C) => Math.max(C - 1, 0));
          break;
        case "Enter":
          if (I.preventDefault(), x[a]) {
            const C = x[a].node;
            n(C.type, e), o();
          }
          break;
        case "Escape":
          I.preventDefault(), o();
          break;
        case "Tab":
          I.preventDefault();
          const N = (f.findIndex((C) => C.name === u) + 1) % f.length;
          p(((M = f[N]) == null ? void 0 : M.name) || null), c(0);
          break;
      }
    },
    [x, a, n, e, o, f, u]
  ), E = d.useCallback(
    (I) => {
      n(I, e), o();
    },
    [n, e, o]
  );
  return d.useEffect(() => {
    const I = (M) => {
      if (s && M.target instanceof Element) {
        const m = document.querySelector("[data-node-search-menu]");
        m && !m.contains(M.target) && o();
      }
    };
    return document.addEventListener("mousedown", I), () => document.removeEventListener("mousedown", I);
  }, [s, o]), s ? /* @__PURE__ */ w(
    "div",
    {
      ref: b,
      className: Y(j.nodeSearchMenu, j.nodeSearchMenuContainer),
      style: {
        left: h.x,
        top: h.y
      },
      "data-node-search-menu": !0,
      onKeyDown: P,
      children: [
        /* @__PURE__ */ w("div", { className: j.searchHeader, children: [
          /* @__PURE__ */ l(
            "input",
            {
              ref: y,
              id: "node-search",
              name: "nodeSearch",
              type: "text",
              placeholder: "Search nodes...",
              value: r,
              onChange: (I) => i(I.target.value),
              className: j.searchInput,
              "aria-label": "Search for nodes",
              "aria-describedby": "search-hint"
            }
          ),
          /* @__PURE__ */ w("div", { id: "search-hint", className: j.searchHint, children: [
            /* @__PURE__ */ l("kbd", { children: "↑↓" }),
            " Navigate • ",
            /* @__PURE__ */ l("kbd", { children: "⏎" }),
            " Create • ",
            /* @__PURE__ */ l("kbd", { children: "⇥" }),
            " Category • ",
            /* @__PURE__ */ l("kbd", { children: "⎋" }),
            " Close"
          ] })
        ] }),
        /* @__PURE__ */ l("div", { className: j.searchResults, children: g.length === 0 ? /* @__PURE__ */ w("div", { className: j.noResults, children: [
          /* @__PURE__ */ l("div", { className: j.noResultsIcon, children: "🔍" }),
          /* @__PURE__ */ w("div", { children: [
            'No nodes found for "',
            r,
            '"'
          ] })
        ] }) : /* @__PURE__ */ l("div", { className: j.categoryList, children: g.map((I, M) => /* @__PURE__ */ w("div", { className: j.categoryGroup, children: [
          /* @__PURE__ */ w(
            "div",
            {
              className: Y(j.categoryHeader, u === I.name && j.selectedCategory),
              onClick: () => p(u === I.name ? null : I.name),
              children: [
                /* @__PURE__ */ l("span", { className: j.categoryName, children: I.name }),
                /* @__PURE__ */ l("span", { className: j.nodeCount, children: I.nodes.length })
              ]
            }
          ),
          /* @__PURE__ */ l("div", { className: j.nodeList, children: I.nodes.map((m, N) => {
            const C = x.findIndex((z) => z.node.type === m.type), D = C === a;
            return /* @__PURE__ */ w(
              "div",
              {
                className: Y(j.nodeItem, D && j.selectedNode),
                onClick: () => E(m.type),
                onMouseEnter: () => c(C),
                children: [
                  /* @__PURE__ */ l("div", { className: j.nodeIcon, children: jt(m.type, t) }),
                  /* @__PURE__ */ w("div", { className: j.nodeInfo, children: [
                    /* @__PURE__ */ l("div", { className: j.nodeName, children: m.displayName }),
                    m.description && /* @__PURE__ */ l("div", { className: j.nodeDescription, children: m.description })
                  ] }),
                  /* @__PURE__ */ l("div", { className: j.nodeType, children: m.type })
                ]
              },
              m.type
            );
          }) })
        ] }, I.name)) }) }),
        x.length > 0 && /* @__PURE__ */ l("div", { className: j.searchFooter, children: /* @__PURE__ */ w("div", { className: j.selectionInfo, children: [
          a + 1,
          " of ",
          x.length,
          " • ",
          g.length,
          " categories"
        ] }) })
      ]
    }
  ) : null;
};
dn.displayName = "NodeSearchMenu";
const ln = d.createContext(null), rc = ({
  portPositions: e,
  children: t
}) => {
  const n = d.useMemo(() => ({
    portPositions: e,
    getPortPosition: (o, s) => {
      var r;
      return (r = e.get(o)) == null ? void 0 : r.get(s);
    },
    getNodePortPositions: (o) => e.get(o),
    computePortPosition: (o, s) => {
      var i;
      const r = (i = e.get(o.id)) == null ? void 0 : i.get(s.id);
      return r || {
        portId: s.id,
        renderPosition: { x: 0, y: 0 },
        connectionPoint: { x: o.position.x, y: o.position.y }
      };
    }
  }), [e]);
  return /* @__PURE__ */ l(ln.Provider, { value: n, children: t });
};
function un() {
  const e = d.useContext(ln);
  if (!e)
    throw new Error("usePortPositions must be used within a PortPositionProvider");
  return e;
}
function zd(e, t) {
  const { getPortPosition: n } = un();
  return d.useMemo(
    () => n(e, t),
    [n, e, t]
  );
}
function Rd(e) {
  const { getNodePortPositions: t } = un();
  return d.useMemo(
    () => t(e),
    [t, e]
  );
}
const ic = ({
  initialData: e,
  data: t,
  onDataChange: n,
  onSave: o,
  onLoad: s,
  className: r,
  nodeDefinitions: i,
  includeDefaultDefinitions: a = !0,
  externalDataRefs: c,
  overlayLayers: u,
  backgroundLayers: p,
  uiOverlayLayers: h,
  settingsManager: v,
  toolbar: y,
  leftSidebar: b,
  rightSidebar: f,
  leftSidebarInitialWidth: g,
  rightSidebarInitialWidth: x,
  leftSidebarMinWidth: P,
  rightSidebarMinWidth: E,
  leftSidebarMaxWidth: I,
  rightSidebarMaxWidth: M,
  onLeftSidebarWidthChange: m,
  onRightSidebarWidthChange: N
}) => /* @__PURE__ */ l(Zn, { nodeDefinitions: i, includeDefaults: a, children: /* @__PURE__ */ l(qn, { refs: c, children: /* @__PURE__ */ l(
  Do,
  {
    initialState: e,
    controlledData: t,
    onDataChange: n,
    onSave: o,
    onLoad: s,
    settingsManager: v,
    children: /* @__PURE__ */ l(Gn, { children: /* @__PURE__ */ l($n, { children: /* @__PURE__ */ l(Mo, { children: /* @__PURE__ */ l(Yn, { children: /* @__PURE__ */ l(On, { children: /* @__PURE__ */ l(
      ac,
      {
        className: r,
        overlayLayers: u,
        backgroundLayers: p,
        uiOverlayLayers: h,
        settingsManager: v,
        toolbar: y,
        leftSidebar: b,
        rightSidebar: f,
        leftSidebarInitialWidth: g,
        rightSidebarInitialWidth: x,
        leftSidebarMinWidth: P,
        rightSidebarMinWidth: E,
        leftSidebarMaxWidth: I,
        rightSidebarMaxWidth: M,
        onLeftSidebarWidthChange: m,
        onRightSidebarWidthChange: N
      }
    ) }) }) }) }) })
  }
) }) }), ac = ({
  className: e,
  overlayLayers: t,
  backgroundLayers: n,
  uiOverlayLayers: o,
  settingsManager: s,
  toolbar: r,
  leftSidebar: i,
  rightSidebar: a,
  leftSidebarInitialWidth: c,
  rightSidebarInitialWidth: u,
  leftSidebarMinWidth: p,
  rightSidebarMinWidth: h,
  leftSidebarMaxWidth: v,
  rightSidebarMaxWidth: y,
  onLeftSidebarWidthChange: b,
  onRightSidebarWidthChange: f
}) => {
  const { state: g, handleSave: x, dispatch: P, actions: E, isLoading: I, isSaving: M, getNodePorts: m } = W(), { state: N, dispatch: C, actions: D } = Z(), { utils: z } = ie(), _ = et(), [S, k] = d.useState(() => /* @__PURE__ */ new Map()), O = d.useRef(g.nodes);
  d.useEffect(() => {
    var G, F, Q, se;
    if (!g.nodes) return;
    const J = O.current;
    let L = !1;
    if (!J || Object.keys(J).length !== Object.keys(g.nodes).length)
      L = !0;
    else
      for (const ve in g.nodes) {
        const ue = g.nodes[ve], pe = J[ve];
        if (!pe || ue.position.x !== pe.position.x || ue.position.y !== pe.position.y || ((G = ue.size) == null ? void 0 : G.width) !== ((F = pe.size) == null ? void 0 : F.width) || ((Q = ue.size) == null ? void 0 : Q.height) !== ((se = pe.size) == null ? void 0 : se.height)) {
          L = !0;
          break;
        }
      }
    if (L) {
      const ve = Object.values(g.nodes).map((pe) => ({
        ...pe,
        ports: m(pe.id)
      })), ue = yo(ve);
      k(ue), O.current = g.nodes;
    }
  }, [g.nodes, m]);
  const A = Ot(s), {
    showGrid: $,
    showMinimap: V,
    showStatusBar: H,
    theme: U,
    autoSave: B,
    autoSaveInterval: X,
    smoothAnimations: K,
    doubleClickToEdit: ne,
    fontSize: ae,
    gridSize: ye,
    gridOpacity: De,
    canvasBackground: Ee
  } = A, $e = d.useMemo(
    () => ({
      "--editor-font-size": `${ae}px`,
      "--editor-grid-size": `${ye}px`,
      "--editor-grid-opacity": `${De}`,
      "--editor-canvas-background": Ee
    }),
    [ae, ye, De, Ee]
  ), _e = d.useCallback(
    (J, L) => {
      const G = _.find((pe) => pe.type === J);
      if (!G) {
        console.warn(`Node definition not found for type: ${J}`);
        return;
      }
      let F = N.contextMenu.canvasPosition;
      F || (F = z.screenToCanvas(L.x, L.y));
      const Q = `${J}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`, se = G.defaultSize || { width: 150, height: 50 }, ve = {
        x: F.x - se.width / 2,
        y: F.y - se.height / 2
      }, ue = {
        id: Q,
        type: J,
        position: ve,
        size: se,
        data: G.defaultData || { title: G.displayName }
        // Ports are no longer assigned here - they will be inferred from NodeDefinition
      };
      P(E.addNode(ue)), C(D.selectNode(Q, !1)), C(D.hideContextMenu());
    },
    [_, P, E, C, D, N.contextMenu.canvasPosition, z]
  );
  d.useEffect(() => {
    const J = (L) => {
      (L.ctrlKey || L.metaKey) && L.key === "s" && (L.preventDefault(), x()), L.key === "Escape" && C(D.hideContextMenu());
    };
    return document.addEventListener("keydown", J), () => document.removeEventListener("keydown", J);
  }, [x, C, D]);
  const He = i, Be = a === void 0 ? /* @__PURE__ */ l(Zt, {}) : a;
  return /* @__PURE__ */ w(
    $t,
    {
      className: Y(e, U === "dark" && T.darkTheme, K && T.smoothAnimations),
      style: $e,
      "data-theme": U,
      children: [
        /* @__PURE__ */ w("div", { className: T.editorLayout, children: [
          r && /* @__PURE__ */ l("div", { className: T.editorToolbar, children: r }),
          /* @__PURE__ */ l("div", { className: T.editorContent, children: /* @__PURE__ */ l(
            Oi,
            {
              leftSidebar: He,
              rightSidebar: Be,
              leftSidebarInitialWidth: c,
              rightSidebarInitialWidth: u,
              leftSidebarMinWidth: p,
              rightSidebarMinWidth: h,
              leftSidebarMaxWidth: v,
              rightSidebarMaxWidth: y,
              onLeftSidebarWidthChange: b,
              onRightSidebarWidthChange: f,
              children: /* @__PURE__ */ w("div", { className: T.editorMain, children: [
                /* @__PURE__ */ l(Qt, { showGrid: $, children: /* @__PURE__ */ w(rc, { portPositions: S, children: [
                  n == null ? void 0 : n.map((J, L) => /* @__PURE__ */ l(d.Fragment, { children: J }, `background-layer-${L}`)),
                  /* @__PURE__ */ l(rn, {}),
                  /* @__PURE__ */ l(on, { doubleClickToEdit: ne }),
                  t == null ? void 0 : t.map((J, L) => /* @__PURE__ */ l(d.Fragment, { children: J }, `overlay-layer-${L}`))
                ] }) }),
                H && /* @__PURE__ */ l(cn, { autoSave: B, isSaving: M, settingsManager: s })
              ] })
            }
          ) })
        ] }),
        (I || M) && /* @__PURE__ */ l("div", { className: T.loadingOverlay, children: /* @__PURE__ */ l("div", { className: T.loadingIndicator, children: I ? "Loading..." : "Saving..." }) }),
        /* @__PURE__ */ l(
          dn,
          {
            position: N.contextMenu.position,
            nodeDefinitions: _,
            onCreateNode: _e,
            onClose: () => C(D.hideContextMenu()),
            visible: N.contextMenu.visible
          }
        ),
        o && o.length > 0 && /* @__PURE__ */ l("div", { className: T.uiOverlayContainer, children: o.map((J, L) => /* @__PURE__ */ l(d.Fragment, { children: J }, `ui-overlay-layer-${L}`)) })
      ]
    }
  );
};
ic.displayName = "NodeEditor";
const cc = "xtnnddtrminimapNm_", dc = "xtnnddtrminxip", lc = "xtnnddtrtopLeftyMq", uc = "xtnnddtrtopRights48", pc = "xtnnddtrbotlef8be", hc = "xtnnddtrbotrigo0n", fc = "xtnnddtrtopleft", gc = "xtnnddtrtopright", mc = "xtnnddtrbot", yc = "xtnnddtrbotBB1", vc = "xtnnddtrminudL", bc = "xtnnddtrminzoo", xc = "xtnnddtrmintitGxO", Nc = "xtnnddtrminsta", Cc = "xtnnddtrmincan", Sc = "xtnnddtrmincan45s", Ec = "xtnnddtrminvieSyB", wc = "xtnnddtrminnodljv", Ic = "xtnnddtrminnodn73", Dc = "xtnnddtrmincon", Pc = "xtnnddtrmincon7Oy", kc = "xtnnddtrminvieS6m", oe = {
  minimap: cc,
  minimapContainer: dc,
  topLeft: lc,
  topRight: uc,
  bottomLeft: pc,
  bottomRight: hc,
  topleft: fc,
  topright: gc,
  bottomleft: mc,
  bottomright: yc,
  minimapHeader: vc,
  minimapZoom: bc,
  minimapTitle: xc,
  minimapStats: Nc,
  minimapCanvas: Cc,
  minimapCanvasDragging: Sc,
  minimapViewport: Ec,
  minimapNode: wc,
  minimapGroupNode: Ic,
  minimapConnections: Dc,
  minimapConnection: Pc,
  minimapViewportDragging: kc
}, Mc = ({
  width: e = 200,
  height: t = 150,
  position: n = "top-right",
  className: o,
  visible: s = !0,
  scale: r = 0.1
}) => {
  const { state: i } = W(), { state: a, dispatch: c, actions: u } = ie(), p = d.useRef(null), [h, v] = d.useState(!1), [y, b] = d.useState(null), [f, g] = d.useState(!1), x = d.useMemo(() => {
    const S = Object.values(i.nodes);
    if (S.length === 0)
      return { minX: 0, minY: 0, maxX: 1e3, maxY: 1e3 };
    let k = 1 / 0, O = 1 / 0, A = -1 / 0, $ = -1 / 0;
    S.forEach((H) => {
      var ne, ae;
      const U = H.position.x, B = H.position.y, X = ((ne = H.size) == null ? void 0 : ne.width) || 150, K = ((ae = H.size) == null ? void 0 : ae.height) || 100;
      k = Math.min(k, U), O = Math.min(O, B), A = Math.max(A, U + X), $ = Math.max($, B + K);
    });
    const V = 100;
    return {
      minX: k - V,
      minY: O - V,
      maxX: A + V,
      maxY: $ + V
    };
  }, [i.nodes]), P = d.useMemo(() => {
    const S = x.maxX - x.minX, k = x.maxY - x.minY, O = (e - 20) / S, A = (t - 40) / k;
    return Math.min(O, A, r);
  }, [x, e, t]), E = d.useCallback((S, k) => ({
    x: (S - x.minX) * P + 10,
    y: (k - x.minY) * P + 30
  }), [x, P]), I = d.useCallback((S, k) => ({
    x: (S - 10) / P + x.minX,
    y: (k - 30) / P + x.minY
  }), [x, P]), M = d.useMemo(() => {
    const S = a.viewport, k = window.innerWidth / S.scale, O = window.innerHeight / S.scale, A = {
      x: -S.offset.x / S.scale,
      y: -S.offset.y / S.scale
    }, $ = {
      x: A.x + k,
      y: A.y + O
    }, V = E(A.x, A.y), H = E($.x, $.y);
    return {
      x: V.x,
      y: V.y,
      width: Math.max(1, H.x - V.x),
      height: Math.max(1, H.y - V.y)
    };
  }, [a.viewport, E]), m = d.useCallback((S, k) => {
    if (!p.current) return;
    const O = p.current.getBoundingClientRect(), A = S - O.left, $ = k - O.top, V = I(A, $), H = a.viewport, U = A / e * window.innerWidth, B = ($ - 30) / (t - 30) * window.innerHeight, X = U - V.x * H.scale, K = B - V.y * H.scale;
    c(u.setViewport({
      ...H,
      offset: { x: X, y: K }
    }));
  }, [a.viewport, c, u, I, e, t]), N = d.useCallback((S) => {
    S.preventDefault(), v(!0), g(!1), b({
      x: S.clientX,
      y: S.clientY,
      viewportOffset: { ...a.viewport.offset }
    }), p.current && p.current.setPointerCapture(S.pointerId);
  }, [a.viewport.offset]), C = d.useCallback((S) => {
    if (!h || !y) return;
    S.preventDefault();
    const k = S.clientX - y.x, O = S.clientY - y.y, A = 3;
    !f && (Math.abs(k) > A || Math.abs(O) > A) && g(!0);
    const $ = x.maxX - x.minX, V = x.maxY - x.minY, H = e - 20, U = t - 60, B = k / H * $, X = O / U * V, K = a.viewport, ne = y.viewportOffset.x - B * K.scale, ae = y.viewportOffset.y - X * K.scale;
    c(u.setViewport({
      ...K,
      offset: { x: ne, y: ae }
    }));
  }, [h, y, f, a.viewport, c, u, x, e, t]), D = d.useCallback((S) => {
    v(!1), b(null), p.current && p.current.releasePointerCapture(S.pointerId), setTimeout(() => {
      g(!1);
    }, 0);
  }, []), z = d.useCallback((S) => {
    !f && !h && !y && m(S.clientX, S.clientY);
  }, [f, h, y, m]), _ = n.replace("-", "");
  return s ? /* @__PURE__ */ w(
    "div",
    {
      className: `${oe.minimapContainer} ${oe[_]} ${o || ""}`,
      style: { width: e, height: t },
      children: [
        /* @__PURE__ */ w("div", { className: oe.minimapHeader, children: [
          /* @__PURE__ */ l("span", { className: oe.minimapTitle, children: "Minimap" }),
          /* @__PURE__ */ w("span", { className: oe.minimapStats, children: [
            Object.keys(i.nodes).length,
            " nodes"
          ] }),
          /* @__PURE__ */ w("span", { className: oe.minimapZoom, children: [
            Math.round(a.viewport.scale * 100),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ w(
          "div",
          {
            ref: p,
            className: `${oe.minimapCanvas} ${h ? oe.minimapCanvasDragging : ""}`,
            onPointerDown: N,
            onPointerMove: C,
            onPointerUp: D,
            onClick: z,
            style: {
              width: e,
              height: t - 30,
              cursor: h ? "grabbing" : "grab"
            },
            children: [
              /* @__PURE__ */ l("svg", { className: oe.minimapConnections, viewBox: `0 0 ${e} ${t - 30}`, children: Object.values(i.connections || {}).map((S) => {
                var V, H, U, B;
                const k = i.nodes[S.fromNodeId], O = i.nodes[S.toNodeId];
                if (!k || !O) return null;
                const A = E(
                  k.position.x + (((V = k.size) == null ? void 0 : V.width) || 150) / 2,
                  k.position.y + (((H = k.size) == null ? void 0 : H.height) || 100) / 2
                ), $ = E(
                  O.position.x + (((U = O.size) == null ? void 0 : U.width) || 150) / 2,
                  O.position.y + (((B = O.size) == null ? void 0 : B.height) || 100) / 2
                );
                return /* @__PURE__ */ l(
                  "line",
                  {
                    x1: A.x,
                    y1: A.y - 30,
                    x2: $.x,
                    y2: $.y - 30,
                    className: oe.minimapConnection
                  },
                  S.id
                );
              }) }),
              Object.values(i.nodes).map((S) => {
                var $, V;
                const k = E(S.position.x, S.position.y), O = {
                  width: ((($ = S.size) == null ? void 0 : $.width) || 150) * P,
                  height: (((V = S.size) == null ? void 0 : V.height) || 100) * P
                }, A = S.type === "group";
                return /* @__PURE__ */ l(
                  "div",
                  {
                    className: `${oe.minimapNode} ${A ? oe.minimapGroupNode : ""}`,
                    style: {
                      left: k.x,
                      top: k.y,
                      width: Math.max(2, O.width),
                      height: Math.max(2, O.height)
                    },
                    "data-node-type": S.type
                  },
                  S.id
                );
              }),
              /* @__PURE__ */ l(
                "div",
                {
                  className: `${oe.minimapViewport} ${h ? oe.minimapViewportDragging : ""}`,
                  style: {
                    left: M.x,
                    top: M.y,
                    width: M.width,
                    height: M.height
                  }
                }
              )
            ]
          }
        )
      ]
    }
  ) : null;
};
Mc.displayName = "Minimap";
const Tc = "xtnnddtrdebugovr", Oc = "xtnnddtrtopLeftXGk", Ac = "xtnnddtrtopRightHbt", zc = "xtnnddtrbotlefhr9", Rc = "xtnnddtrbotrigW2u", Lc = "xtnnddtrcold7Bg", Vc = "xtnnddtrdebughdr", $c = "xtnnddtrdebtit", _c = "xtnnddtrcolbtn", Hc = "xtnnddtrdebugctn", Bc = "xtnnddtrdebsec", Gc = "xtnnddtrsectit", Xc = "xtnnddtrdebugitm", Uc = "xtnnddtrlbl", Yc = "xtnnddtrvalue", R = {
  debugOverlay: Tc,
  topLeft: Oc,
  topRight: Ac,
  bottomLeft: zc,
  bottomRight: Rc,
  collapsed: Lc,
  debugHeader: Vc,
  debugTitle: $c,
  collapseButton: _c,
  debugContent: Hc,
  debugSection: Bc,
  sectionTitle: Gc,
  debugItem: Xc,
  label: Uc,
  value: Yc
}, Fc = ({
  position: e = "top-left",
  className: t,
  visible: n = !0,
  showSections: o = {
    viewport: !0,
    nodes: !0,
    connections: !0,
    actions: !0,
    performance: !1
  }
}) => {
  const { state: s } = W(), { state: r } = ie(), { state: i } = Z(), [a, c] = d.useState(!1), [u, p] = d.useState({
    renderCount: 0,
    lastRenderTime: 0
  });
  if (d.useEffect(() => {
    o.performance && p((f) => ({
      renderCount: f.renderCount + 1,
      lastRenderTime: Date.now() - (f.lastRenderTime || Date.now())
    }));
  }, [o.performance]), !n) return null;
  const h = {
    "top-left": R.topLeft,
    "top-right": R.topRight,
    "bottom-left": R.bottomLeft,
    "bottom-right": R.bottomRight
  }[e], v = Object.keys(s.nodes).length, y = Object.keys(s.connections).length, b = i.selectedNodeIds.length;
  return /* @__PURE__ */ w(
    "div",
    {
      className: Y(
        R.debugOverlay,
        h,
        a && R.collapsed,
        t
      ),
      children: [
        /* @__PURE__ */ w("div", { className: R.debugHeader, children: [
          /* @__PURE__ */ l("span", { className: R.debugTitle, children: "Debug Info" }),
          /* @__PURE__ */ l(
            "button",
            {
              className: R.collapseButton,
              onClick: () => c(!a),
              "aria-label": a ? "Expand debug info" : "Collapse debug info",
              children: a ? "+" : "−"
            }
          )
        ] }),
        !a && /* @__PURE__ */ w("div", { className: R.debugContent, children: [
          o.viewport && /* @__PURE__ */ w("div", { className: R.debugSection, children: [
            /* @__PURE__ */ l("div", { className: R.sectionTitle, children: "Viewport" }),
            /* @__PURE__ */ w("div", { className: R.debugItem, children: [
              /* @__PURE__ */ l("span", { className: R.label, children: "Offset:" }),
              /* @__PURE__ */ w("span", { className: R.value, children: [
                Math.round(r.viewport.offset.x),
                ", ",
                Math.round(r.viewport.offset.y)
              ] })
            ] }),
            /* @__PURE__ */ w("div", { className: R.debugItem, children: [
              /* @__PURE__ */ l("span", { className: R.label, children: "Scale:" }),
              /* @__PURE__ */ w("span", { className: R.value, children: [
                r.viewport.scale.toFixed(2),
                "x"
              ] })
            ] }),
            /* @__PURE__ */ w("div", { className: R.debugItem, children: [
              /* @__PURE__ */ l("span", { className: R.label, children: "Grid:" }),
              /* @__PURE__ */ w("span", { className: R.value, children: [
                r.gridSettings.enabled ? "On" : "Off",
                r.gridSettings.enabled && ` (${r.gridSettings.size}px)`
              ] })
            ] })
          ] }),
          o.nodes && /* @__PURE__ */ w("div", { className: R.debugSection, children: [
            /* @__PURE__ */ l("div", { className: R.sectionTitle, children: "Nodes" }),
            /* @__PURE__ */ w("div", { className: R.debugItem, children: [
              /* @__PURE__ */ l("span", { className: R.label, children: "Total:" }),
              /* @__PURE__ */ l("span", { className: R.value, children: v })
            ] }),
            /* @__PURE__ */ w("div", { className: R.debugItem, children: [
              /* @__PURE__ */ l("span", { className: R.label, children: "Selected:" }),
              /* @__PURE__ */ l("span", { className: R.value, children: b })
            ] }),
            Object.entries(
              Object.values(s.nodes).reduce((f, g) => (f[g.type] = (f[g.type] || 0) + 1, f), {})
            ).map(([f, g]) => /* @__PURE__ */ w("div", { className: R.debugItem, children: [
              /* @__PURE__ */ w("span", { className: R.label, children: [
                f,
                ":"
              ] }),
              /* @__PURE__ */ l("span", { className: R.value, children: g })
            ] }, f))
          ] }),
          o.connections && /* @__PURE__ */ w("div", { className: R.debugSection, children: [
            /* @__PURE__ */ l("div", { className: R.sectionTitle, children: "Connections" }),
            /* @__PURE__ */ w("div", { className: R.debugItem, children: [
              /* @__PURE__ */ l("span", { className: R.label, children: "Total:" }),
              /* @__PURE__ */ l("span", { className: R.value, children: y })
            ] })
          ] }),
          o.actions && /* @__PURE__ */ w("div", { className: R.debugSection, children: [
            /* @__PURE__ */ l("div", { className: R.sectionTitle, children: "Actions" }),
            /* @__PURE__ */ w("div", { className: R.debugItem, children: [
              /* @__PURE__ */ l("span", { className: R.label, children: "Dragging:" }),
              /* @__PURE__ */ l("span", { className: R.value, children: i.dragState ? `${i.dragState.nodeIds.length} nodes` : "None" })
            ] }),
            /* @__PURE__ */ w("div", { className: R.debugItem, children: [
              /* @__PURE__ */ l("span", { className: R.label, children: "Resizing:" }),
              /* @__PURE__ */ l("span", { className: R.value, children: i.resizeState ? i.resizeState.nodeId : "None" })
            ] }),
            /* @__PURE__ */ w("div", { className: R.debugItem, children: [
              /* @__PURE__ */ l("span", { className: R.label, children: "Connecting:" }),
              /* @__PURE__ */ l("span", { className: R.value, children: i.connectionDragState ? "Active" : "None" })
            ] }),
            /* @__PURE__ */ w("div", { className: R.debugItem, children: [
              /* @__PURE__ */ l("span", { className: R.label, children: "Panning:" }),
              /* @__PURE__ */ l("span", { className: R.value, children: r.panState.isPanning ? "Active" : "None" })
            ] })
          ] }),
          o.performance && /* @__PURE__ */ w("div", { className: R.debugSection, children: [
            /* @__PURE__ */ l("div", { className: R.sectionTitle, children: "Performance" }),
            /* @__PURE__ */ w("div", { className: R.debugItem, children: [
              /* @__PURE__ */ l("span", { className: R.label, children: "Renders:" }),
              /* @__PURE__ */ l("span", { className: R.value, children: u.renderCount })
            ] }),
            /* @__PURE__ */ w("div", { className: R.debugItem, children: [
              /* @__PURE__ */ l("span", { className: R.label, children: "Last render:" }),
              /* @__PURE__ */ w("span", { className: R.value, children: [
                u.lastRenderTime.toFixed(2),
                "ms"
              ] })
            ] })
          ] })
        ] })
      ]
    }
  );
};
Fc.displayName = "DebugOverlay";
const jc = "xtnnddtrtbru6T", Wc = "xtnnddtrtbrsec", Kc = "xtnnddtrtoolbtn7BP", Zc = "xtnnddtractD7C", qc = "xtnnddtrsep", Jc = "xtnnddtrzoodis", Qc = "xtnnddtrzoosel", ed = "xtnnddtrtbrspa", td = "xtnnddtrstaAUh", nd = "xtnnddtrstaXT3", od = "xtnnddtrstaval87E", te = {
  toolbar: jc,
  toolbarSection: Wc,
  toolButton: Kc,
  active: Zc,
  separator: qc,
  zoomDisplay: Jc,
  zoomSelect: Qc,
  toolbarSpacer: ed,
  statusIndicator: td,
  statusLabel: nd,
  statusValue: od
}, yt = [5, 10, 25, 50, 100, 200, 400, 800], Ne = d.memo(({ onClick: e, title: t, ariaLabel: n, disabled: o, children: s }) => /* @__PURE__ */ l(
  "button",
  {
    className: te.toolButton,
    onClick: e,
    title: t,
    "aria-label": n,
    disabled: o,
    children: s
  }
));
Ne.displayName = "ZoomButton";
const Ke = d.memo(({ active: e, onClick: t, title: n, ariaLabel: o, children: s }) => /* @__PURE__ */ l(
  "button",
  {
    className: `${te.toolButton} ${e ? te.active : ""}`,
    onClick: t,
    title: n,
    "aria-label": o,
    children: s
  }
));
Ke.displayName = "ToggleButton";
const Ze = d.memo(({ label: e, value: t }) => /* @__PURE__ */ w("div", { className: te.statusIndicator, children: [
  /* @__PURE__ */ w("span", { className: te.statusLabel, children: [
    e,
    ":"
  ] }),
  /* @__PURE__ */ l("span", { className: te.statusValue, children: t })
] }));
Ze.displayName = "StatusIndicator";
const sd = d.memo(({
  className: e,
  useFloatingContainer: t = !1,
  position: n = "bottom"
}) => {
  const { state: o, actions: s, dispatch: r } = ie(), { state: i } = W(), { state: a } = Z(), c = d.useMemo(
    () => Math.round(o.viewport.scale * 100),
    [o.viewport.scale]
  ), u = d.useMemo(
    () => Object.keys(i.nodes).length,
    [i.nodes]
  ), p = d.useMemo(
    () => Object.keys(i.connections).length,
    [i.connections]
  ), h = d.useMemo(
    () => a.selectedNodeIds.length,
    [a.selectedNodeIds]
  ), v = d.useCallback(() => {
    const m = Math.min(o.viewport.scale * 1.25, 10);
    r(
      s.setViewport({
        ...o.viewport,
        scale: m
      })
    );
  }, [o.viewport, r, s]), y = d.useCallback(() => {
    const m = Math.max(o.viewport.scale * 0.8, 0.1);
    r(
      s.setViewport({
        ...o.viewport,
        scale: m
      })
    );
  }, [o.viewport, r, s]), b = d.useCallback(() => {
    r(
      s.setViewport({
        ...o.viewport,
        scale: 1
      })
    );
  }, [o.viewport, r, s]), f = d.useCallback(() => {
    const m = Object.values(i.nodes);
    if (m.length === 0) return;
    let N = 1 / 0, C = 1 / 0, D = -1 / 0, z = -1 / 0;
    m.forEach((X) => {
      var K, ne;
      N = Math.min(N, X.position.x), C = Math.min(C, X.position.y), D = Math.max(D, X.position.x + (((K = X.size) == null ? void 0 : K.width) ?? 150)), z = Math.max(z, X.position.y + (((ne = X.size) == null ? void 0 : ne.height) ?? 50));
    });
    const _ = 50, S = D - N + _ * 2, k = z - C + _ * 2, O = window.innerWidth, A = window.innerHeight, $ = O / S, V = A / k, H = Math.min($, V, 1), U = (N + D) / 2, B = (C + z) / 2;
    r(
      s.setViewport({
        scale: H,
        offset: {
          x: -(U * H - O / 2),
          y: -(B * H - A / 2)
        }
      })
    );
  }, [i.nodes, r, s]), g = d.useCallback(() => {
    if (h === 0) return;
    const m = a.selectedNodeIds.map((X) => i.nodes[X]).filter((X) => X != null);
    if (m.length === 0) return;
    let N = 1 / 0, C = 1 / 0, D = -1 / 0, z = -1 / 0;
    m.forEach((X) => {
      var K, ne;
      N = Math.min(N, X.position.x), C = Math.min(C, X.position.y), D = Math.max(D, X.position.x + (((K = X.size) == null ? void 0 : K.width) ?? 150)), z = Math.max(z, X.position.y + (((ne = X.size) == null ? void 0 : ne.height) ?? 50));
    });
    const _ = 50, S = D - N + _ * 2, k = z - C + _ * 2, O = window.innerWidth, A = window.innerHeight, $ = O / S, V = A / k, H = Math.min($, V, 2), U = (N + D) / 2, B = (C + z) / 2;
    r(
      s.setViewport({
        scale: H,
        offset: {
          x: -(U * H - O / 2),
          y: -(B * H - A / 2)
        }
      })
    );
  }, [i.nodes, a.selectedNodeIds, h, r, s]), x = d.useCallback(
    (m) => {
      r(
        s.setViewport({
          ...o.viewport,
          scale: m / 100
        })
      );
    },
    [o.viewport, r, s]
  ), P = d.useCallback(() => {
    r(
      s.updateGridSettings({
        showGrid: !o.gridSettings.showGrid
      })
    );
  }, [o.gridSettings.showGrid, r, s]), E = d.useCallback(() => {
    r(
      s.updateGridSettings({
        snapToGrid: !o.gridSettings.snapToGrid
      })
    );
  }, [o.gridSettings.snapToGrid, r, s]), I = d.useMemo(() => {
    const m = yt.map((N) => /* @__PURE__ */ w("option", { value: N, children: [
      N,
      "%"
    ] }, N));
    return yt.includes(c) || m.push(
      /* @__PURE__ */ w("option", { value: c, children: [
        c,
        "%"
      ] }, c)
    ), m;
  }, [c]), M = /* @__PURE__ */ w(le, { children: [
    /* @__PURE__ */ w("div", { className: te.toolbarSection, children: [
      /* @__PURE__ */ l(
        Ne,
        {
          onClick: y,
          title: "Zoom Out (Cmd -)",
          ariaLabel: "Zoom Out",
          children: /* @__PURE__ */ l("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", children: /* @__PURE__ */ l("path", { d: "M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" }) })
        }
      ),
      /* @__PURE__ */ l("div", { className: te.zoomDisplay, children: /* @__PURE__ */ l(
        "select",
        {
          className: te.zoomSelect,
          value: c,
          onChange: (m) => x(Number(m.target.value)),
          children: I
        }
      ) }),
      /* @__PURE__ */ l(
        Ne,
        {
          onClick: v,
          title: "Zoom In (Cmd +)",
          ariaLabel: "Zoom In",
          children: /* @__PURE__ */ l("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", children: /* @__PURE__ */ l("path", { d: "M8 4a.5.5 0 0 1 .5.5V7.5H11.5a.5.5 0 0 1 0 1H8.5V11.5a.5.5 0 0 1-1 0V8.5H4.5a.5.5 0 0 1 0-1H7.5V4.5A.5.5 0 0 1 8 4z" }) })
        }
      )
    ] }),
    /* @__PURE__ */ l("div", { className: te.separator }),
    /* @__PURE__ */ w("div", { className: te.toolbarSection, children: [
      /* @__PURE__ */ l(
        Ne,
        {
          onClick: f,
          title: "Zoom to Fit All (Shift 1)",
          ariaLabel: "Zoom to Fit All",
          children: /* @__PURE__ */ w("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", children: [
            /* @__PURE__ */ l("path", { d: "M3.5 2.5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1h-9zm0 1h9v9h-9v-9z" }),
            /* @__PURE__ */ l("path", { d: "M6 6h4v4H6V6z", opacity: "0.5" })
          ] })
        }
      ),
      /* @__PURE__ */ l(
        Ne,
        {
          onClick: g,
          title: "Zoom to Selection (Shift 2)",
          ariaLabel: "Zoom to Selection",
          disabled: h === 0,
          children: /* @__PURE__ */ w("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", children: [
            /* @__PURE__ */ l("path", { d: "M6 6h4v4H6V6z" }),
            /* @__PURE__ */ l(
              "path",
              {
                d: "M3.5 2.5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1h-9zm0 1h9v9h-9v-9z",
                opacity: "0.5"
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ l(
        Ne,
        {
          onClick: b,
          title: "Reset Zoom (Cmd 0)",
          ariaLabel: "Reset Zoom",
          children: /* @__PURE__ */ l("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", children: /* @__PURE__ */ l("text", { x: "8", y: "12", textAnchor: "middle", fontSize: "10", fontWeight: "600", children: "1:1" }) })
        }
      )
    ] }),
    /* @__PURE__ */ l("div", { className: te.separator }),
    /* @__PURE__ */ w("div", { className: te.toolbarSection, children: [
      /* @__PURE__ */ l(
        Ke,
        {
          active: o.gridSettings.showGrid,
          onClick: P,
          title: "Toggle Grid (Cmd ')",
          ariaLabel: "Toggle Grid",
          children: /* @__PURE__ */ l("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", children: /* @__PURE__ */ l(
            "path",
            {
              d: "M2 2h2v2H2V2zm4 0h2v2H6V2zm4 0h2v2h-2V2zm4 0h2v2h-2V2zM2 6h2v2H2V6zm4 0h2v2H6V6zm4 0h2v2h-2V6zm4 0h2v2h-2V6zM2 10h2v2H2v-2zm4 0h2v2H6v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zM2 14h2v2H2v-2zm4 0h2v2H6v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z",
              opacity: "0.6"
            }
          ) })
        }
      ),
      /* @__PURE__ */ l(
        Ke,
        {
          active: o.gridSettings.snapToGrid,
          onClick: E,
          title: "Toggle Snap to Grid",
          ariaLabel: "Toggle Snap to Grid",
          children: /* @__PURE__ */ w("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", children: [
            /* @__PURE__ */ l("path", { d: "M8 2v12M2 8h12", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", opacity: "0.4" }),
            /* @__PURE__ */ l("circle", { cx: "8", cy: "8", r: "2", fill: "currentColor" })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ l("div", { className: te.toolbarSpacer }),
    /* @__PURE__ */ w("div", { className: te.toolbarSection, children: [
      /* @__PURE__ */ l(Ze, { label: "Nodes", value: u }),
      /* @__PURE__ */ l(Ze, { label: "Connections", value: p })
    ] })
  ] });
  return t ? /* @__PURE__ */ l(an, { position: n, className: e, children: M }) : /* @__PURE__ */ l("div", { className: `${te.toolbar} ${e || ""}`, children: M });
});
sd.displayName = "GridToolbox";
const rd = "xtnnddtrtbrico", id = "xtnnddtrtbrdKk", ad = "xtnnddtrtbrsep", Fe = {
  toolbarIcon: rd,
  toolbarIconText: id,
  toolbarSeparator: ad
}, Ld = ({
  className: e,
  floating: t = !1,
  position: n = "top"
}) => {
  const o = et(), { actions: s, dispatch: r } = Z(), { state: i } = ie(), { dispatch: a, actions: c } = W(), u = d.useMemo(() => o.filter(
    (y) => ["standard", "input", "output", "process", "group"].includes(y.type)
  ).slice(0, 5), [o]), p = d.useCallback((y) => {
    const b = o.find((I) => I.type === y);
    if (!b) {
      console.warn(`Node definition not found for type: ${y}`);
      return;
    }
    const f = i.viewport, g = (-f.offset.x + window.innerWidth / 2) / f.scale, x = (-f.offset.y + window.innerHeight / 2) / f.scale, P = `${y}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`, E = {
      id: P,
      type: y,
      position: { x: g, y: x },
      size: b.defaultSize || { width: 150, height: 50 },
      data: b.defaultData || { title: b.displayName }
      // Ports are no longer assigned here - they will be inferred from NodeDefinition
    };
    a(c.addNode(E)), r(s.selectNode(P, !1));
  }, [o, i.viewport, a, c, r, s]), h = d.useCallback(() => {
    const y = i.viewport, b = window.innerWidth / 2, f = window.innerHeight / 2, g = (-y.offset.x + b) / y.scale, x = (-y.offset.y + f) / y.scale;
    r(s.showContextMenu(
      { x: b, y: f },
      void 0,
      { x: g, y: x }
    ));
  }, [i.viewport, r, s]), v = /* @__PURE__ */ w(le, { children: [
    u.map((y) => /* @__PURE__ */ l(
      ze,
      {
        className: T.toolButton,
        onClick: () => p(y.type),
        title: `Add ${y.displayName}`,
        "aria-label": `Add ${y.displayName}`,
        children: y.icon ? /* @__PURE__ */ l("span", { className: Fe.toolbarIcon, children: y.icon }) : /* @__PURE__ */ l("span", { className: Fe.toolbarIconText, children: y.displayName.charAt(0).toUpperCase() })
      },
      y.type
    )),
    u.length > 0 && /* @__PURE__ */ l("div", { className: Fe.toolbarSeparator }),
    /* @__PURE__ */ l(
      ze,
      {
        className: T.toolButton,
        onClick: h,
        title: "Add Node...",
        "aria-label": "Add Node...",
        children: /* @__PURE__ */ l(
          "svg",
          {
            width: "16",
            height: "16",
            viewBox: "0 0 16 16",
            fill: "currentColor",
            children: /* @__PURE__ */ l("path", { d: "M8 3a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2H9v3a1 1 0 1 1-2 0V9H4a1 1 0 0 1 0-2h3V4a1 1 0 0 1 1-1z" })
          }
        )
      }
    )
  ] });
  return t ? /* @__PURE__ */ l(an, { position: n, className: e, children: v }) : /* @__PURE__ */ l("div", { className: `${T.topToolbar} ${e || ""}`, children: v });
};
function Vd(e) {
  if (!e) return {};
  const t = {};
  return e.nodeIds.forEach((n) => {
    t[n] = e.offset;
  }), Object.entries(e.affectedChildNodes).forEach(([n, o]) => {
    o.forEach((s) => {
      t[s] = e.offset;
    });
  }), t;
}
function $d(e, t, n = { x: 0, y: 0 }) {
  if (e.length === 0) return null;
  let o = 1 / 0, s = 1 / 0, r = -1 / 0, i = -1 / 0;
  return e.forEach((a) => {
    var y, b;
    const c = t[a];
    if (!c) return;
    const u = c.position.x + n.x, p = c.position.y + n.y, h = ((y = c.size) == null ? void 0 : y.width) || 150, v = ((b = c.size) == null ? void 0 : b.height) || 50;
    o = Math.min(o, u), s = Math.min(s, p), r = Math.max(r, u + h), i = Math.max(i, p + v);
  }), { minX: o, minY: s, maxX: r, maxY: i };
}
class pn {
  constructor() {
    he(this, "listeners", /* @__PURE__ */ new Map());
  }
  on(t, n) {
    return this.listeners.has(t) || this.listeners.set(t, []), this.listeners.get(t).push(n), () => {
      const o = this.listeners.get(t);
      if (o) {
        const s = o.indexOf(n);
        s > -1 && o.splice(s, 1);
      }
    };
  }
  emit(t, n) {
    const o = this.listeners.get(t);
    o && o.forEach((s) => {
      try {
        s(n);
      } catch (r) {
        console.error(`Error in settings event handler for ${t}:`, r);
      }
    });
  }
  removeAllListeners() {
    this.listeners.clear();
  }
}
class cd {
  constructor(t = "node-editor-settings") {
    he(this, "prefix");
    he(this, "eventEmitter", new pn());
    this.prefix = t;
  }
  getStorageKey(t) {
    return `${this.prefix}-${t}`;
  }
  get(t) {
    try {
      const n = localStorage.getItem(this.getStorageKey(t));
      return n ? JSON.parse(n) : void 0;
    } catch {
      return;
    }
  }
  set(t, n) {
    try {
      localStorage.setItem(this.getStorageKey(t), JSON.stringify(n)), this.eventEmitter.emit("change", { key: t, value: n });
    } catch (o) {
      console.warn(`Failed to save setting ${t}:`, o);
    }
  }
  delete(t) {
    localStorage.removeItem(this.getStorageKey(t)), this.eventEmitter.emit("change", { key: t, value: void 0 });
  }
  clear() {
    this.keys().forEach((n) => {
      localStorage.removeItem(this.getStorageKey(n));
    });
  }
  keys() {
    const t = [], n = `${this.prefix}-`;
    for (let o = 0; o < localStorage.length; o++) {
      const s = localStorage.key(o);
      s && s.startsWith(n) && t.push(s.substring(n.length));
    }
    return t;
  }
  getMany(t) {
    const n = {};
    return t.forEach((o) => {
      const s = this.get(o);
      s !== void 0 && (n[o] = s);
    }), n;
  }
  setMany(t) {
    Object.entries(t).forEach(([n, o]) => {
      this.set(n, o);
    });
  }
  on(t, n) {
    return this.eventEmitter.on(t, (o) => n(o.key, o.value));
  }
}
const vt = {
  general: {
    key: "general",
    label: "General",
    description: "General editor settings",
    order: 1
  },
  appearance: {
    key: "appearance",
    label: "Appearance",
    description: "Visual appearance and theming",
    order: 2
  },
  behavior: {
    key: "behavior",
    label: "Behavior",
    description: "Editor behavior and interactions",
    order: 3
  },
  performance: {
    key: "performance",
    label: "Performance",
    description: "Performance and optimization settings",
    order: 4
  },
  keyboard: {
    key: "keyboard",
    label: "Keyboard",
    description: "Keyboard shortcuts and bindings",
    order: 5
  },
  plugins: {
    key: "plugins",
    label: "Plugins",
    description: "Plugin management and configuration",
    order: 6
  },
  advanced: {
    key: "advanced",
    label: "Advanced",
    description: "Advanced settings for power users",
    order: 7
  }
};
class _d extends pn {
  constructor(n) {
    super();
    he(this, "settings", /* @__PURE__ */ new Map());
    he(this, "categories", /* @__PURE__ */ new Map());
    he(this, "values", /* @__PURE__ */ new Map());
    he(this, "storage");
    this.storage = n || new cd(), Object.values(vt).forEach((o) => {
      this.registerCategory(o);
    }), this.loadFromStorage();
  }
  // Setting definitions
  registerSetting(n) {
    if (!n.key)
      throw new Error("Setting key is required");
    if (!n.category)
      throw new Error("Setting category is required");
    this.categories.has(n.category) || this.registerCategory({
      key: n.category,
      label: n.category.charAt(0).toUpperCase() + n.category.slice(1)
    }), this.settings.set(n.key, n), this.values.has(n.key) || this.values.set(n.key, n.defaultValue), this.emit("setting-registered", { setting: n });
  }
  unregisterSetting(n) {
    this.settings.delete(n), this.values.delete(n), this.emit("setting-unregistered", { key: n });
  }
  getSetting(n) {
    return this.settings.get(n);
  }
  getAllSettings() {
    return Object.fromEntries(this.settings);
  }
  getSettingsByCategory(n) {
    return Array.from(this.settings.values()).filter((o) => o.category === n).sort((o, s) => (o.order || 0) - (s.order || 0));
  }
  // Categories
  registerCategory(n) {
    this.categories.set(n.key, n), this.emit("category-registered", { category: n });
  }
  unregisterCategory(n) {
    this.categories.delete(n), this.emit("category-unregistered", { key: n });
  }
  getCategory(n) {
    return this.categories.get(n);
  }
  getAllCategories() {
    return Array.from(this.categories.values()).sort((n, o) => (n.order || 0) - (o.order || 0));
  }
  // Values
  getValue(n) {
    return this.values.get(n);
  }
  setValue(n, o) {
    const s = this.settings.get(n);
    if (!s) {
      console.warn(`Setting ${n} is not registered`);
      return;
    }
    const r = this.validateSetting(n, o);
    if (r)
      throw new Error(`Invalid value for setting ${n}: ${r}`);
    const i = this.values.get(n);
    this.values.set(n, o), s.persistent !== !1 && this.storage.set(n, o);
    const a = {
      key: n,
      value: o,
      previousValue: i,
      category: s.category
    };
    this.emit("change", a);
  }
  setValues(n) {
    Object.entries(n).forEach(([o, s]) => {
      s !== void 0 && this.setValue(o, s);
    });
  }
  getAllValues() {
    return Object.fromEntries(this.values);
  }
  resetToDefaults(n) {
    const o = n || Array.from(this.settings.keys());
    o.forEach((s) => {
      const r = this.settings.get(s);
      r && this.setValue(s, r.defaultValue);
    }), this.emit("reset", { keys: o });
  }
  // Validation
  validateSetting(n, o) {
    const s = this.settings.get(n);
    if (!s)
      return "Setting not found";
    if (s.required && (o == null || o === ""))
      return "This setting is required";
    if (o != null)
      switch (s.type) {
        case "number":
        case "range":
          if (typeof o != "number")
            return "Value must be a number";
          if (s.min !== void 0 && o < s.min)
            return `Value must be at least ${s.min}`;
          if (s.max !== void 0 && o > s.max)
            return `Value must be at most ${s.max}`;
          break;
        case "text":
        case "textarea":
        case "email":
        case "url":
        case "password":
          if (typeof o != "string")
            return "Value must be a string";
          if (s.minLength !== void 0 && o.length < s.minLength)
            return `Value must be at least ${s.minLength} characters long`;
          if (s.maxLength !== void 0 && o.length > s.maxLength)
            return `Value must be at most ${s.maxLength} characters long`;
          if (s.pattern && !new RegExp(s.pattern).test(o))
            return "Value does not match required pattern";
          break;
        case "boolean":
          if (typeof o != "boolean")
            return "Value must be a boolean";
          break;
        case "select":
          if (s.options && !s.options.map((i) => i.value).includes(o))
            return "Value must be one of the valid options";
          break;
        case "multiselect":
          if (!Array.isArray(o))
            return "Value must be an array";
          if (s.options) {
            const r = s.options.map((i) => i.value);
            for (const i of o)
              if (!r.includes(i))
                return "All values must be valid options";
          }
          break;
      }
    return s.validator ? s.validator(o) : null;
  }
  validateAll() {
    const n = {}, o = {};
    return this.settings.forEach((s, r) => {
      const i = this.values.get(r), a = this.validateSetting(r, i);
      a && (n[r] = a);
    }), {
      isValid: Object.keys(n).length === 0,
      errors: n,
      warnings: o
    };
  }
  // Persistence
  async save() {
    try {
      this.settings.forEach((n, o) => {
        if (n.persistent !== !1) {
          const s = this.values.get(o);
          s !== void 0 && this.storage.set(o, s);
        }
      }), this.emit("save", { timestamp: (/* @__PURE__ */ new Date()).toISOString() });
    } catch (n) {
      throw this.emit("save-error", { error: n }), n;
    }
  }
  async load() {
    try {
      this.loadFromStorage(), this.emit("load", { timestamp: (/* @__PURE__ */ new Date()).toISOString() });
    } catch (n) {
      throw this.emit("load-error", { error: n }), n;
    }
  }
  export() {
    const n = {
      version: "1.0.0",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      settings: this.getAllValues(),
      metadata: {
        editorVersion: "1.0.0",
        platform: typeof window < "u" ? navigator.platform : "unknown"
      }
    };
    return JSON.stringify(n, null, 2);
  }
  import(n) {
    try {
      const o = JSON.parse(n);
      if (!o.settings)
        throw new Error("Invalid settings data");
      this.setValues(o.settings), this.emit("import", { data: o });
    } catch (o) {
      throw this.emit("import-error", { error: o }), o;
    }
  }
  // Utilities
  getSchema() {
    const n = {
      type: "object",
      properties: {},
      required: []
    };
    return this.settings.forEach((o, s) => {
      const r = {
        title: o.label,
        description: o.description,
        default: o.defaultValue
      };
      switch (o.type) {
        case "text":
        case "textarea":
        case "email":
        case "url":
        case "password":
          r.type = "string", o.minLength && (r.minLength = o.minLength), o.maxLength && (r.maxLength = o.maxLength), o.pattern && (r.pattern = o.pattern);
          break;
        case "number":
        case "range":
          r.type = "number", o.min !== void 0 && (r.minimum = o.min), o.max !== void 0 && (r.maximum = o.max);
          break;
        case "boolean":
          r.type = "boolean";
          break;
        case "select":
          r.type = "string", o.options && (r.enum = o.options.map((i) => i.value));
          break;
        case "multiselect":
          r.type = "array", o.options && (r.items = {
            type: "string",
            enum: o.options.map((i) => i.value)
          });
          break;
        default:
          r.type = "string";
      }
      n.properties[s] = r, o.required && n.required.push(s);
    }), n;
  }
  reset() {
    this.settings.clear(), this.categories.clear(), this.values.clear(), this.storage.clear(), Object.values(vt).forEach((n) => {
      this.registerCategory(n);
    }), this.emit("reset-all", {});
  }
  loadFromStorage() {
    this.settings.forEach((n, o) => {
      if (n.persistent !== !1) {
        const s = this.storage.get(o);
        s !== void 0 ? this.values.set(o, s) : this.values.set(o, n.defaultValue);
      } else
        this.values.set(o, n.defaultValue);
    });
  }
}
const Hd = [
  // General settings
  {
    key: "general.language",
    label: "Language",
    description: "Interface language",
    category: "general",
    type: "select",
    defaultValue: "en",
    options: [
      { value: "en", label: "English" },
      { value: "ja", label: "日本語" },
      { value: "zh", label: "中文" },
      { value: "ko", label: "한국어" },
      { value: "es", label: "Español" },
      { value: "fr", label: "Français" },
      { value: "de", label: "Deutsch" }
    ],
    order: 1
  },
  {
    key: "general.autoSave",
    label: "Auto Save",
    description: "Automatically save changes",
    category: "general",
    type: "boolean",
    defaultValue: !0,
    order: 2
  },
  {
    key: "general.autoSaveInterval",
    label: "Auto Save Interval",
    description: "Auto save interval in seconds",
    category: "general",
    type: "number",
    defaultValue: 30,
    min: 5,
    max: 300,
    dependsOn: "general.autoSave",
    showWhen: (e) => e["general.autoSave"] === !0,
    order: 3
  },
  {
    key: "general.confirmBeforeExit",
    label: "Confirm Before Exit",
    description: "Show confirmation dialog before closing",
    category: "general",
    type: "boolean",
    defaultValue: !0,
    order: 4
  },
  // Appearance settings
  {
    key: "appearance.theme",
    label: "Theme",
    description: "Visual theme",
    category: "appearance",
    type: "select",
    defaultValue: "light",
    options: [
      { value: "light", label: "Light" },
      { value: "dark", label: "Dark" },
      { value: "auto", label: "Auto (System)" }
    ],
    order: 1
  },
  {
    key: "appearance.fontSize",
    label: "Font Size",
    description: "Base font size in pixels",
    category: "appearance",
    type: "range",
    defaultValue: 14,
    min: 10,
    max: 24,
    step: 1,
    order: 2
  },
  {
    key: "appearance.fontFamily",
    label: "Font Family",
    description: "Font family for the interface",
    category: "appearance",
    type: "select",
    defaultValue: "system",
    options: [
      { value: "system", label: "System Default" },
      { value: "Inter", label: "Inter" },
      { value: "Roboto", label: "Roboto" },
      { value: "Arial", label: "Arial" },
      { value: "monospace", label: "Monospace" }
    ],
    order: 3
  },
  {
    key: "appearance.showGrid",
    label: "Show Grid",
    description: "Display grid lines on canvas",
    category: "appearance",
    type: "boolean",
    defaultValue: !0,
    order: 4
  },
  {
    key: "appearance.gridSize",
    label: "Grid Size",
    description: "Grid size in pixels",
    category: "appearance",
    type: "number",
    defaultValue: 20,
    min: 5,
    max: 100,
    dependsOn: "appearance.showGrid",
    showWhen: (e) => e["appearance.showGrid"] === !0,
    order: 5
  },
  {
    key: "appearance.gridOpacity",
    label: "Grid Opacity",
    description: "Grid line opacity",
    category: "appearance",
    type: "range",
    defaultValue: 0.3,
    min: 0.1,
    max: 1,
    step: 0.1,
    dependsOn: "appearance.showGrid",
    showWhen: (e) => e["appearance.showGrid"] === !0,
    order: 6
  },
  {
    key: "appearance.snapToGrid",
    label: "Snap to Grid",
    description: "Snap nodes to grid when moving",
    category: "appearance",
    type: "boolean",
    defaultValue: !1,
    order: 7
  },
  {
    key: "appearance.showMinimap",
    label: "Show Minimap",
    description: "Display minimap overlay",
    category: "appearance",
    type: "boolean",
    defaultValue: !0,
    order: 8
  },
  {
    key: "appearance.showStatusBar",
    label: "Show Status Bar",
    description: "Display status bar at bottom",
    category: "appearance",
    type: "boolean",
    defaultValue: !0,
    order: 9
  },
  {
    key: "appearance.showToolbar",
    label: "Show Toolbar",
    description: "Display toolbar",
    category: "appearance",
    type: "boolean",
    defaultValue: !0,
    order: 10
  },
  {
    key: "appearance.canvasBackground",
    label: "Canvas Background",
    description: "Canvas background color",
    category: "appearance",
    type: "color",
    defaultValue: "#ffffff",
    order: 11
  },
  // Behavior settings
  {
    key: "behavior.doubleClickToEdit",
    label: "Double Click to Edit",
    description: "Double click nodes to edit properties",
    category: "behavior",
    type: "boolean",
    defaultValue: !0,
    order: 1
  },
  {
    key: "behavior.autoConnect",
    label: "Auto Connect",
    description: "Automatically connect compatible ports when dragging",
    category: "behavior",
    type: "boolean",
    defaultValue: !0,
    order: 2
  },
  {
    key: "behavior.smoothAnimations",
    label: "Smooth Animations",
    description: "Enable smooth animations for transitions",
    category: "behavior",
    type: "boolean",
    defaultValue: !0,
    order: 3
  },
  {
    key: "behavior.dragThreshold",
    label: "Drag Threshold",
    description: "Minimum distance to start dragging (pixels)",
    category: "behavior",
    type: "number",
    defaultValue: 5,
    min: 1,
    max: 20,
    order: 4
  },
  {
    key: "behavior.connectionStyle",
    label: "Connection Style",
    description: "Style of connection lines",
    category: "behavior",
    type: "select",
    defaultValue: "curved",
    options: [
      { value: "straight", label: "Straight" },
      { value: "curved", label: "Curved" },
      { value: "orthogonal", label: "Orthogonal" }
    ],
    order: 5
  },
  {
    key: "behavior.selectionMode",
    label: "Selection Mode",
    description: "How to select multiple nodes",
    category: "behavior",
    type: "select",
    defaultValue: "click",
    options: [
      { value: "click", label: "Click with Modifier" },
      { value: "drag", label: "Drag Selection Box" }
    ],
    order: 6
  },
  {
    key: "behavior.wheelZoomSensitivity",
    label: "Zoom Sensitivity",
    description: "Mouse wheel zoom sensitivity",
    category: "behavior",
    type: "range",
    defaultValue: 1,
    min: 0.1,
    max: 3,
    step: 0.1,
    order: 7
  },
  // Performance settings
  {
    key: "performance.maxHistorySteps",
    label: "Max History Steps",
    description: "Maximum number of undo/redo steps",
    category: "performance",
    type: "number",
    defaultValue: 50,
    min: 10,
    max: 200,
    order: 1
  },
  {
    key: "performance.renderOptimization",
    label: "Render Optimization",
    description: "Enable render optimization techniques",
    category: "performance",
    type: "boolean",
    defaultValue: !0,
    order: 2
  },
  {
    key: "performance.lazyLoading",
    label: "Lazy Loading",
    description: "Load nodes and connections lazily",
    category: "performance",
    type: "boolean",
    defaultValue: !0,
    order: 3
  },
  {
    key: "performance.virtualScrolling",
    label: "Virtual Scrolling",
    description: "Use virtual scrolling for large node lists",
    category: "performance",
    type: "boolean",
    defaultValue: !0,
    order: 4
  },
  {
    key: "performance.maxVisibleNodes",
    label: "Max Visible Nodes",
    description: "Maximum number of nodes to render at once",
    category: "performance",
    type: "number",
    defaultValue: 1e3,
    min: 100,
    max: 5e3,
    order: 5
  },
  // Keyboard shortcuts
  {
    key: "keyboard.undo",
    label: "Undo",
    description: "Keyboard shortcut for undo",
    category: "keyboard",
    type: "text",
    defaultValue: "Ctrl+Z",
    pattern: "^(Ctrl\\+|Cmd\\+|Alt\\+|Shift\\+)*[A-Za-z0-9]+$",
    order: 1
  },
  {
    key: "keyboard.redo",
    label: "Redo",
    description: "Keyboard shortcut for redo",
    category: "keyboard",
    type: "text",
    defaultValue: "Ctrl+Y",
    pattern: "^(Ctrl\\+|Cmd\\+|Alt\\+|Shift\\+)*[A-Za-z0-9]+$",
    order: 2
  },
  {
    key: "keyboard.selectAll",
    label: "Select All",
    description: "Keyboard shortcut for select all",
    category: "keyboard",
    type: "text",
    defaultValue: "Ctrl+A",
    pattern: "^(Ctrl\\+|Cmd\\+|Alt\\+|Shift\\+)*[A-Za-z0-9]+$",
    order: 3
  },
  {
    key: "keyboard.delete",
    label: "Delete",
    description: "Keyboard shortcut for delete",
    category: "keyboard",
    type: "text",
    defaultValue: "Delete",
    order: 4
  },
  {
    key: "keyboard.copy",
    label: "Copy",
    description: "Keyboard shortcut for copy",
    category: "keyboard",
    type: "text",
    defaultValue: "Ctrl+C",
    pattern: "^(Ctrl\\+|Cmd\\+|Alt\\+|Shift\\+)*[A-Za-z0-9]+$",
    order: 5
  },
  {
    key: "keyboard.paste",
    label: "Paste",
    description: "Keyboard shortcut for paste",
    category: "keyboard",
    type: "text",
    defaultValue: "Ctrl+V",
    pattern: "^(Ctrl\\+|Cmd\\+|Alt\\+|Shift\\+)*[A-Za-z0-9]+$",
    order: 6
  },
  {
    key: "keyboard.duplicate",
    label: "Duplicate",
    description: "Keyboard shortcut for duplicate",
    category: "keyboard",
    type: "text",
    defaultValue: "Ctrl+D",
    pattern: "^(Ctrl\\+|Cmd\\+|Alt\\+|Shift\\+)*[A-Za-z0-9]+$",
    order: 7
  },
  {
    key: "keyboard.group",
    label: "Group",
    description: "Keyboard shortcut for group nodes",
    category: "keyboard",
    type: "text",
    defaultValue: "Ctrl+G",
    pattern: "^(Ctrl\\+|Cmd\\+|Alt\\+|Shift\\+)*[A-Za-z0-9]+$",
    order: 8
  },
  {
    key: "keyboard.save",
    label: "Save",
    description: "Keyboard shortcut for save",
    category: "keyboard",
    type: "text",
    defaultValue: "Ctrl+S",
    pattern: "^(Ctrl\\+|Cmd\\+|Alt\\+|Shift\\+)*[A-Za-z0-9]+$",
    order: 9
  },
  // Plugin settings
  {
    key: "plugins.autoUpdate",
    label: "Auto Update Plugins",
    description: "Automatically update plugins when available",
    category: "plugins",
    type: "boolean",
    defaultValue: !1,
    order: 1
  },
  {
    key: "plugins.allowUnsafe",
    label: "Allow Unsafe Plugins",
    description: "Allow loading plugins without security verification",
    category: "plugins",
    type: "boolean",
    defaultValue: !1,
    order: 2
  },
  {
    key: "plugins.maxMemoryUsage",
    label: "Max Memory Usage",
    description: "Maximum memory usage for plugins (MB)",
    category: "plugins",
    type: "number",
    defaultValue: 100,
    min: 10,
    max: 1e3,
    order: 3
  },
  // Advanced settings
  {
    key: "advanced.debugMode",
    label: "Debug Mode",
    description: "Enable debug mode with additional logging",
    category: "advanced",
    type: "boolean",
    defaultValue: !1,
    order: 1
  },
  {
    key: "advanced.showPerformanceMetrics",
    label: "Show Performance Metrics",
    description: "Display performance metrics in the UI",
    category: "advanced",
    type: "boolean",
    defaultValue: !1,
    order: 2
  },
  {
    key: "advanced.logLevel",
    label: "Log Level",
    description: "Minimum log level to display",
    category: "advanced",
    type: "select",
    defaultValue: "info",
    options: [
      { value: "debug", label: "Debug" },
      { value: "info", label: "Info" },
      { value: "warn", label: "Warning" },
      { value: "error", label: "Error" }
    ],
    order: 3
  },
  {
    key: "advanced.experimentalFeatures",
    label: "Experimental Features",
    description: "Enable experimental features (may be unstable)",
    category: "advanced",
    type: "boolean",
    defaultValue: !1,
    order: 4
  },
  {
    key: "advanced.customCSS",
    label: "Custom CSS",
    description: "Custom CSS to apply to the editor",
    category: "advanced",
    type: "textarea",
    defaultValue: "",
    placeholder: "/* Enter custom CSS here */",
    order: 5
  }
];
export {
  Oi as ColumnLayout,
  st as DEFAULT_NODE_SIZE,
  Le as DEFAULT_PORT_POSITION_CONFIG,
  Fc as DebugOverlay,
  Gn as EditorActionStateProvider,
  qn as ExternalDataProvider,
  an as FloatingContainer,
  sd as GridToolbox,
  Mo as HistoryProvider,
  Yn as InlineEditingProvider,
  Zt as InspectorPanel,
  On as KeyboardShortcutProvider,
  cd as LocalSettingsStorage,
  Mc as Minimap,
  $n as NodeCanvasProvider,
  Zn as NodeDefinitionProvider,
  ic as NodeEditor,
  Do as NodeEditorProvider,
  Ft as NodeInspector,
  rc as PortPositionProvider,
  _d as SettingsManager,
  Nd as SpatialGrid,
  Ld as Toolbar,
  Td as addVectors,
  md as asOriginalInspectorRender,
  gd as asOriginalNodeRender,
  Vd as calculateNodeDragOffsets,
  yo as computeAllPortPositions,
  Ve as computeNodePortPositions,
  yd as createBoundingBox,
  xd as createConnectionLookupMaps,
  fd as createNodeDataUpdater,
  pd as createNodeDefinition,
  eo as createParentToChildrenMap,
  bd as createPortToNodeMap,
  Hd as defaultSettings,
  vd as doRectanglesIntersect,
  ya as getDistance,
  $d as getDraggedNodesBounds,
  Re as getNodeBoundingBox,
  hd as getTypedNodeData,
  Md as getVector,
  Qn as isRectangleInsideAnother,
  Ad as scaleVector,
  Od as subtractVectors,
  kd as updatePortPositions,
  Id as useActionState,
  Tt as useActionStateActions,
  Pd as useBatchedUpdates,
  Mt as useCanvasActions,
  wd as useCanvasState,
  Dd as useCommonActions,
  ro as useDocumentPointerEvents,
  Sd as useDragPointerEvents,
  Se as useDynamicConnectionPoint,
  zt as useDynamicPortPosition,
  Z as useEditorActionState,
  co as useEditorActions,
  Et as useExternalDataRef,
  Pt as useGroupManagement,
  Fn as useInlineEditing,
  ie as useNodeCanvas,
  Qe as useNodeDefinition,
  et as useNodeDefinitionList,
  Je as useNodeDefinitions,
  W as useNodeEditor,
  kt as useNodeEditorActions,
  Ed as useNodeEditorState,
  Rd as useNodePortPositions,
  wt as useNodeResize,
  io as usePointerCapture,
  Cd as usePointerDrag,
  it as usePointerInteraction,
  zd as usePortPosition,
  un as usePortPositions,
  ao as usePreventPointerDefaults,
  Ot as useSettings,
  ho as useVisibleNodes
};
