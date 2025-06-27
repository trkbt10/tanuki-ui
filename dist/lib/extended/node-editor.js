var Nn = Object.defineProperty;
var Cn = (e, t, n) => t in e ? Nn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var pe = (e, t, n) => Cn(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as l, jsxs as I, Fragment as de } from "react/jsx-runtime";
import * as d from "react";
import { c as W, I as Ne, L as ge, B as ze, C as Sn, T as nt, H as Be } from "../vendor/Toolbar-DRPiI57x.js";
const ot = (e) => {
  const t = [];
  return e.ctrl && t.push("ctrl"), e.shift && t.push("shift"), e.alt && t.push("alt"), e.meta && t.push("meta"), t.push(e.key.toLowerCase()), t.join("+");
}, wn = (e, t) => e.key.toLowerCase() === t.key.toLowerCase() && !!e.ctrlKey == !!t.ctrl && !!e.shiftKey == !!t.shift && !!e.altKey == !!t.alt && !!e.metaKey == !!t.meta, En = (e, t) => {
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
}, In = {
  shortcuts: /* @__PURE__ */ new Map(),
  isEnabled: !0
}, Ge = {
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
}, xt = d.createContext(null), Dn = ({
  children: e,
  initialState: t
}) => {
  const [n, o] = d.useReducer(
    En,
    { ...In, ...t }
  );
  d.useEffect(() => {
    const a = (c) => {
      if (!n.isEnabled) return;
      const u = c.target;
      if (!(u.tagName === "INPUT" || u.tagName === "TEXTAREA" || u.isContentEditable))
        for (const [p, h] of n.shortcuts) {
          const v = p.split("+"), y = v[v.length - 1], x = v.slice(0, -1), g = {
            key: y,
            ctrl: x.includes("ctrl"),
            shift: x.includes("shift"),
            alt: x.includes("alt"),
            meta: x.includes("meta")
          };
          if (wn(c, g)) {
            c.preventDefault(), c.stopPropagation(), h(c);
            break;
          }
        }
    };
    return document.addEventListener("keydown", a), () => document.removeEventListener("keydown", a);
  }, [n.shortcuts, n.isEnabled]);
  const r = d.useCallback(
    (a, c) => {
      o(Ge.registerShortcut(a, c));
    },
    [o]
  ), s = d.useCallback(
    (a) => {
      o(Ge.unregisterShortcut(a));
    },
    [o]
  ), i = {
    state: n,
    dispatch: o,
    actions: Ge,
    registerShortcut: r,
    unregisterShortcut: s
  };
  return /* @__PURE__ */ l(xt.Provider, { value: i, children: e });
}, Pn = () => {
  const e = d.useContext(xt);
  if (!e)
    throw new Error("useKeyboardShortcut must be used within a KeyboardShortcutProvider");
  return e;
}, ae = (e, t, n = []) => {
  const { registerShortcut: o, unregisterShortcut: r } = Pn();
  d.useEffect(() => (o(e, t), () => r(e)), [o, r, ...n]);
}, kn = (e, t) => {
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
      const { scale: n, center: o } = t.payload, r = Math.max(0.01, Math.min(64, n));
      if (o) {
        const s = r / e.viewport.scale, i = {
          x: o.x - (o.x - e.viewport.offset.x) * s,
          y: o.y - (o.y - e.viewport.offset.y) * s
        };
        return {
          ...e,
          viewport: {
            offset: i,
            scale: r
          }
        };
      }
      return {
        ...e,
        viewport: {
          ...e.viewport,
          scale: r
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
}, Tn = {
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
}, On = {
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
}, Mn = (e, t) => ({
  // Convert screen coordinates to canvas coordinates
  screenToCanvas: (n, o) => {
    if (!e.current)
      return console.warn("Canvas ref is not available for coordinate conversion"), { x: n, y: o };
    const r = e.current.getBoundingClientRect();
    return {
      x: (n - r.left - t.offset.x) / t.scale,
      y: (o - r.top - t.offset.y) / t.scale
    };
  },
  // Convert canvas coordinates to screen coordinates
  canvasToScreen: (n, o) => {
    if (!e.current)
      return console.warn("Canvas ref is not available for coordinate conversion"), { x: n, y: o };
    const r = e.current.getBoundingClientRect();
    return {
      x: n * t.scale + t.offset.x + r.left,
      y: o * t.scale + t.offset.y + r.top
    };
  }
}), bt = d.createContext(null), zn = ({ children: e, initialState: t }) => {
  const [n, o] = d.useReducer(kn, { ...Tn, ...t }), r = d.useRef(null), s = d.useMemo(() => Mn(r, n.viewport), [n.viewport]), i = {
    state: n,
    dispatch: o,
    actions: On,
    canvasRef: r,
    utils: s
  };
  return /* @__PURE__ */ l(bt.Provider, { value: i, children: e });
}, se = () => {
  const e = d.useContext(bt);
  if (!e)
    throw new Error("useNodeCanvas must be used within a NodeCanvasProvider");
  return e;
}, Rn = (e, t) => {
  switch (t.type) {
    case "SELECT_NODE": {
      const { nodeId: n, multiple: o } = t.payload;
      if (o) {
        const r = e.selectedNodeIds.includes(n);
        return {
          ...e,
          selectedNodeIds: r ? e.selectedNodeIds.filter((s) => s !== n) : [...e.selectedNodeIds, n]
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
        const r = e.selectedConnectionIds.includes(n);
        return {
          ...e,
          selectedConnectionIds: r ? e.selectedConnectionIds.filter((s) => s !== n) : [...e.selectedConnectionIds, n]
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
      const { nodeIds: n, startPosition: o, initialPositions: r, affectedChildNodes: s } = t.payload;
      return {
        ...e,
        dragState: {
          nodeIds: n,
          startPosition: o,
          offset: { x: 0, y: 0 },
          initialPositions: r,
          affectedChildNodes: s
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
      const { nodeId: n, startPosition: o, startSize: r, handle: s } = t.payload;
      return {
        ...e,
        resizeState: {
          nodeId: n,
          startPosition: o,
          startSize: r,
          currentSize: r,
          currentPosition: o,
          handle: s
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
}, An = {
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
}, Ln = {
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
}, Nt = d.createContext(null), Vn = ({
  children: e,
  initialState: t
}) => {
  const [n, o] = d.useReducer(
    Rn,
    { ...An, ...t }
  ), r = {
    state: n,
    dispatch: o,
    actions: Ln
  };
  return /* @__PURE__ */ l(Nt.Provider, { value: r, children: e });
}, Z = () => {
  const e = d.useContext(Nt);
  if (!e)
    throw new Error("useEditorActionState must be used within an EditorActionStateProvider");
  return e;
}, _n = (e, t) => {
  switch (t.type) {
    case "START_EDITING": {
      const { nodeId: n, field: o, value: r } = t.payload;
      return {
        editingNodeId: n,
        editingField: o,
        originalValue: r,
        currentValue: r,
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
}, $n = {
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
}, Ct = d.createContext(null), Hn = ({
  children: e,
  initialState: t
}) => {
  const [n, o] = d.useReducer(
    _n,
    { ...$n, ...t }
  ), r = d.useCallback(
    (p, h) => !(!n.isActive || n.editingNodeId !== p || h && n.editingField !== h),
    [n.isActive, n.editingNodeId, n.editingField]
  ), s = d.useCallback(
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
    isEditing: r,
    startEditing: s,
    updateValue: i,
    confirmEdit: a,
    cancelEdit: c
  };
  return /* @__PURE__ */ l(Ct.Provider, { value: u, children: e });
}, Bn = () => {
  const e = d.useContext(Ct);
  if (!e)
    throw new Error("useInlineEditing must be used within an InlineEditingProvider");
  return e;
};
function Gn() {
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
const Un = {
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
}, Xn = {
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
function sd(e) {
  return e;
}
function id(e) {
  return e.data;
}
function ad(e) {
  return (t) => {
    e({ data: t });
  };
}
function cd(e) {
  return e;
}
function dd(e) {
  return e;
}
const Ze = d.createContext(null), Yn = ({
  children: e,
  nodeDefinitions: t = [],
  includeDefaults: n = !0
}) => {
  const r = {
    registry: d.useMemo(() => {
      const s = Gn();
      return n && (s.register(Un), s.register(Xn)), t.forEach((i) => s.register(i)), s;
    }, [t, n])
  };
  return /* @__PURE__ */ l(Ze.Provider, { value: r, children: e });
}, qe = () => {
  const e = d.useContext(Ze);
  if (!e)
    throw new Error("useNodeDefinitions must be used within a NodeDefinitionProvider");
  return e;
}, Je = (e) => {
  const { registry: t } = qe();
  return t.get(e);
}, Qe = () => {
  const { registry: e } = qe();
  return e.getAll();
}, St = d.createContext(null), Fn = ({
  children: e,
  refs: t = {}
}) => {
  const n = {
    refs: t
  };
  return /* @__PURE__ */ l(St.Provider, { value: n, children: e });
}, jn = () => {
  const e = d.useContext(St);
  if (!e)
    throw new Error("useExternalDataRefs must be used within an ExternalDataProvider");
  return e;
}, wt = (e) => {
  const { refs: t } = jn();
  return t[e];
}, Et = (e = {}) => {
  const { dispatch: t, actions: n } = j(), { state: o, dispatch: r, actions: s } = Z(), {
    minWidth: i = 100,
    minHeight: a = 40,
    snapToGrid: c = !1,
    gridSize: u = 20
  } = e, p = d.useCallback((g, f, b, P) => {
    const w = {
      width: Math.max(i, f.width + b),
      height: Math.max(a, f.height + P)
    };
    return c && (w.width = Math.round(w.width / u) * u, w.height = Math.round(w.height / u) * u), w;
  }, [i, a, c, u]);
  d.useEffect(() => {
    if (!o.resizeState) return;
    const { nodeId: g, startPosition: f, startSize: b, handle: P } = o.resizeState, w = (m) => {
      const N = m.clientX - f.x, C = m.clientY - f.y, D = p(P, b, N, C);
      r(s.updateNodeResize(D));
    }, E = (m) => {
      if (o.resizeState) {
        const { nodeId: N, currentSize: C } = o.resizeState;
        t(n.updateNode(N, {
          size: C
        }));
      }
      r(s.endNodeResize());
    }, T = (m) => {
      m.key === "Escape" && r(s.endNodeResize());
    };
    return window.addEventListener("pointermove", w), window.addEventListener("pointerup", E), window.addEventListener("keydown", T), () => {
      window.removeEventListener("pointermove", w), window.removeEventListener("pointerup", E), window.removeEventListener("keydown", T);
    };
  }, [o.resizeState, p, r, s, t, n]);
  const h = d.useCallback((g, f, b, P) => {
    r(s.startNodeResize(g, b, P, f));
  }, [r, s]), v = d.useCallback((g) => {
    var f;
    return ((f = o.resizeState) == null ? void 0 : f.nodeId) === g;
  }, [o.resizeState]), y = d.useCallback((g) => {
    var f;
    return ((f = o.resizeState) == null ? void 0 : f.nodeId) === g ? o.resizeState.handle : null;
  }, [o.resizeState]), x = d.useCallback((g) => {
    var f;
    return ((f = o.resizeState) == null ? void 0 : f.nodeId) === g ? o.resizeState.currentSize : null;
  }, [o.resizeState]);
  return {
    startResize: h,
    isResizing: v,
    getResizeHandle: y,
    getCurrentSize: x
  };
}, rt = {
  width: 150,
  height: 50
};
function et(e) {
  var t, n;
  return {
    width: ((t = e.size) == null ? void 0 : t.width) || rt.width,
    height: ((n = e.size) == null ? void 0 : n.height) || rt.height
  };
}
function Re(e) {
  const { width: t, height: n } = et(e);
  return {
    left: e.position.x,
    top: e.position.y,
    right: e.position.x + t,
    bottom: e.position.y + n,
    width: t,
    height: n
  };
}
function ld(e, t) {
  return {
    left: e.x,
    top: e.y,
    right: e.x + t.width,
    bottom: e.y + t.height,
    width: t.width,
    height: t.height
  };
}
function ud(e, t) {
  return !(e.right < t.left || t.right < e.left || e.bottom < t.top || t.bottom < e.top);
}
function Wn(e, t) {
  return e.left >= t.left && e.top >= t.top && e.right <= t.right && e.bottom <= t.bottom;
}
function pd(e, t) {
  const n = /* @__PURE__ */ new Map();
  return Object.entries(e).forEach(([o, r]) => {
    (t ? t(o) : r.ports || []).forEach((i) => {
      n.set(i.id, o);
    });
  }), n;
}
function Kn(e) {
  const t = /* @__PURE__ */ new Map();
  return Object.entries(e).forEach(([n, o]) => {
    o.parentId && (t.has(o.parentId) || t.set(o.parentId, []), t.get(o.parentId).push(n));
  }), t;
}
function hd(e) {
  const t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
  return Object.values(e).forEach((i) => {
    t.has(i.fromNodeId) || t.set(i.fromNodeId, []), n.has(i.toNodeId) || n.set(i.toNodeId, []), t.get(i.fromNodeId).push(i), n.get(i.toNodeId).push(i), o.has(i.fromPortId) || o.set(i.fromPortId, []), r.has(i.toPortId) || r.set(i.toPortId, []), o.get(i.fromPortId).push(i), r.get(i.toPortId).push(i);
    const a = `${i.fromNodeId}:${i.fromPortId}`, c = `${i.toNodeId}:${i.toPortId}`;
    s.has(a) || s.set(a, []), s.has(c) || s.set(c, []), s.get(a).push(i), s.get(c).push(i);
  }), { byFromNode: t, byToNode: n, byFromPort: o, byToPort: r, byEndpoint: s };
}
class gd {
  constructor(t = 200) {
    pe(this, "cells", /* @__PURE__ */ new Map());
    pe(this, "cellSize");
    this.cellSize = t;
  }
  /**
   * Get cell key for a position
   */
  getCellKey(t, n) {
    const o = Math.floor(t / this.cellSize), r = Math.floor(n / this.cellSize);
    return `${o},${r}`;
  }
  /**
   * Insert item at position
   */
  insert(t, n, o) {
    const r = this.getCellKey(n, o);
    this.cells.has(r) || this.cells.set(r, []), this.cells.get(r).push(t);
  }
  /**
   * Get all items in cells near a position
   */
  getNearby(t, n, o = 1) {
    const r = [], s = Math.ceil(o / this.cellSize), i = Math.floor(t / this.cellSize), a = Math.floor(n / this.cellSize);
    for (let c = -s; c <= s; c++)
      for (let u = -s; u <= s; u++) {
        const p = `${i + c},${a + u}`, h = this.cells.get(p);
        h && r.push(...h);
      }
    return r;
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
  getInArea(t, n, o, r) {
    const s = [], i = Math.floor(t / this.cellSize), a = Math.floor(n / this.cellSize), c = Math.floor(o / this.cellSize), u = Math.floor(r / this.cellSize);
    for (let p = i; p <= c; p++)
      for (let h = a; h <= u; h++) {
        const v = `${p},${h}`, y = this.cells.get(v);
        y && s.push(...y);
      }
    return s;
  }
}
const Zn = (e, t) => {
  if (e.id === t.id || e.type === "group") return !1;
  const n = Re(e), o = Re(t);
  return Wn(n, o);
}, It = (e, t) => {
  const n = Object.values(t).filter((s) => s.type === "group");
  let o = null, r = 1 / 0;
  for (const s of n)
    if (Zn(e, s)) {
      const i = Re(s), a = i.width * i.height;
      a < r && (r = a, o = s);
    }
  return (o == null ? void 0 : o.id) || null;
};
let De = null, st = null;
const Dt = (e, t) => (st !== t && (De = Kn(t), st = t), ((De == null ? void 0 : De.get(e)) || []).map((o) => t[o]).filter(Boolean)), qn = (e, t) => {
  const n = [], o = [e];
  for (; o.length > 0; ) {
    const r = o.pop(), s = Dt(r, t);
    n.push(...s), o.push(...s.filter((i) => i.type === "group").map((i) => i.id));
  }
  return n;
}, Jn = (e) => {
  const t = {}, n = Object.values(e).filter((o) => o.type !== "group");
  for (const o of n) {
    const r = It(o, e);
    o.parentId !== r && (t[o.id] = {
      parentId: r || void 0
    });
  }
  return t;
}, Qn = (e, t, n) => {
  const o = n[e];
  if (!o || o.type !== "group") return !0;
  const r = { ...o, position: t };
  return It(r, n) === null;
}, Pt = (e = {}) => {
  const { state: t, dispatch: n, actions: o } = j(), { state: r } = Z(), { autoUpdateMembership: s = !0, membershipUpdateDelay: i = 100 } = e, a = d.useRef(void 0), c = d.useRef(t.nodes);
  c.current = t.nodes;
  const u = d.useCallback(() => {
    const f = Jn(c.current);
    Object.keys(f).length > 0 && n(o.updateGroupMembership(f));
  }, []);
  d.useEffect(() => s ? (a.current && clearTimeout(a.current), r.dragState !== null || (a.current = window.setTimeout(() => {
    u();
  }, i)), () => {
    a.current && clearTimeout(a.current);
  }) : void 0, [s, i, u]);
  const p = d.useCallback(
    (f) => {
      const b = c.current[f];
      return !!(b && b.parentId);
    },
    [c]
  ), h = d.useCallback((f) => {
    const b = c.current[f];
    return (b == null ? void 0 : b.parentId) || null;
  }, []), v = d.useCallback((f) => Dt(f, c.current), []), y = d.useCallback((f) => qn(f, c.current), []), x = d.useCallback(
    (f, b) => {
      n(o.moveGroupWithChildren(f, b));
    },
    [n, o]
  ), g = d.useCallback((f, b) => Qn(f, b, c.current), []);
  return {
    updateAllGroupMembership: u,
    isNodeInGroup: p,
    getNodeParentGroup: h,
    getGroupChildren: v,
    getGroupDescendants: y,
    moveGroupWithChildren: x,
    isValidGroupMove: g
  };
};
function fd(e) {
  const {
    onStart: t,
    onMove: n,
    onEnd: o,
    scale: r = 1,
    threshold: s = 2,
    disabled: i = !1
  } = e, [a, c] = d.useState({
    isDragging: !1,
    dragStarted: !1,
    delta: { x: 0, y: 0 }
  }), u = d.useRef(null), p = d.useRef({ x: 0, y: 0 }), h = d.useRef({ x: 0, y: 0 }), v = d.useCallback(
    (g) => {
      if (!u.current) return;
      const f = {
        x: (g.clientX - p.current.x) / r,
        y: (g.clientY - p.current.y) / r
      };
      h.current = f, a.dragStarted ? (c((b) => ({ ...b, delta: f })), n == null || n(g, f, u.current)) : Math.sqrt(f.x * f.x + f.y * f.y) >= s && (c({
        isDragging: !0,
        dragStarted: !0,
        delta: f
      }), t == null || t(g, u.current));
    },
    [r, s, a.dragStarted, t, n]
  ), y = d.useCallback(
    (g) => {
      if (!u.current) return;
      const f = a.dragStarted, b = h.current;
      document.removeEventListener("pointermove", v), document.removeEventListener("pointerup", y), document.removeEventListener("pointercancel", y), c({
        isDragging: !1,
        dragStarted: !1,
        delta: { x: 0, y: 0 }
      }), f && (o == null || o(g, b, u.current)), u.current = null, h.current = { x: 0, y: 0 };
    },
    [a.dragStarted, v, o]
  ), x = d.useCallback(
    (g, f) => {
      if (i) return;
      const b = "nativeEvent" in g ? g.nativeEvent : g;
      u.current = f, p.current = {
        x: b.clientX,
        y: b.clientY
      };
      const P = b.target;
      P != null && P.setPointerCapture && P.setPointerCapture(b.pointerId), document.addEventListener("pointermove", v), document.addEventListener("pointerup", y), document.addEventListener("pointercancel", y), c({
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
    startDrag: x,
    dragState: a
  };
}
function it({
  interactionState: e,
  viewport: t,
  onPointerMove: n,
  onPointerUp: o,
  canvasSelector: r = '[role="application"]',
  pointerMoveOptions: s = { passive: !0 }
}) {
  d.useEffect(() => {
    if (!e) return;
    const i = document.querySelector(r);
    if (!i) return;
    const a = (u) => {
      const p = i.getBoundingClientRect(), h = (u.clientX - p.left - t.offset.x) / t.scale, v = (u.clientY - p.top - t.offset.y) / t.scale;
      n({ x: h, y: v }, u);
    }, c = (u) => {
      o(u);
    };
    return window.addEventListener("pointermove", a, s), window.addEventListener("pointerup", c, { once: !0 }), () => {
      window.removeEventListener("pointermove", a), window.removeEventListener("pointerup", c);
    };
  }, [e, t, n, o, r, s]);
}
function eo(e, t) {
  d.useEffect(() => {
    if (!e) return;
    const { onMove: n, onUp: o, onCancel: r } = t;
    return n && document.addEventListener("pointermove", n, { passive: !1 }), o && document.addEventListener("pointerup", o), r && document.addEventListener("pointercancel", r), () => {
      n && document.removeEventListener("pointermove", n), o && document.removeEventListener("pointerup", o), r && document.removeEventListener("pointercancel", r);
    };
  }, [e, t.onMove, t.onUp, t.onCancel]);
}
function to(e, t, n) {
  d.useEffect(() => {
    const o = e.current;
    if (!(!t || !o || n === void 0))
      return o.setPointerCapture(n), () => {
        o.hasPointerCapture && o.hasPointerCapture(n) && o.releasePointerCapture(n);
      };
  }, [e, t, n]);
}
function no(e, t, n = ["pointerdown", "pointermove", "pointerup"]) {
  d.useEffect(() => {
    const o = e.current;
    if (!t || !o) return;
    const r = (s) => {
      s.preventDefault();
    };
    return n.forEach((s) => {
      o.addEventListener(s, r, { passive: !1 });
    }), () => {
      n.forEach((s) => {
        o.removeEventListener(s, r);
      });
    };
  }, [e, t, n]);
}
function md(e, t, n) {
  const {
    onMove: o,
    onUp: r,
    onCancel: s,
    pointerId: i,
    capturePointer: a = !0,
    preventDefaults: c = !0
  } = n;
  eo(t, { onMove: o, onUp: r, onCancel: s }), to(e, t && a, i), no(e, t && c);
}
function kt() {
  const { dispatch: e, actions: t } = j();
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
function yd() {
  const { state: e } = j(), t = kt();
  return { state: e, actions: t };
}
function Tt() {
  const { dispatch: e, actions: t } = se();
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
function vd() {
  const { state: e } = se(), t = Tt();
  return { state: e, actions: t };
}
function Ot() {
  const { dispatch: e, actions: t } = Z();
  return d.useMemo(() => ({
    selectNode: (n, o) => e(t.selectNode(n, o)),
    selectConnection: (n, o) => e(t.selectConnection(n, o)),
    clearSelection: () => e(t.clearSelection()),
    selectAllNodes: (n) => e(t.selectAllNodes(n)),
    setSelectionBox: (n) => e(t.setSelectionBox(n)),
    startNodeDrag: (n, o, r, s) => e(t.startNodeDrag(n, o, r, s)),
    updateNodeDrag: (n) => e(t.updateNodeDrag(n)),
    endNodeDrag: () => e(t.endNodeDrag()),
    setHoveredNode: (n) => e(t.setHoveredNode(n)),
    setHoveredConnection: (n) => e(t.setHoveredConnection(n)),
    startConnectionDrag: (n) => e(t.startConnectionDrag(n)),
    updateConnectionDrag: (n, o) => e(t.updateConnectionDrag(n, o)),
    endConnectionDrag: () => e(t.endConnectionDrag()),
    setHoveredPort: (n) => e(t.setHoveredPort(n)),
    updateConnectedPorts: (n) => e(t.updateConnectedPorts(n)),
    startConnectionDisconnect: (n, o, r, s) => e(t.startConnectionDisconnect(n, o, r, s)),
    updateConnectionDisconnect: (n, o) => e(t.updateConnectionDisconnect(n, o)),
    endConnectionDisconnect: () => e(t.endConnectionDisconnect()),
    startNodeResize: (n, o, r, s) => e(t.startNodeResize(n, o, r, s)),
    updateNodeResize: (n) => e(t.updateNodeResize(n)),
    endNodeResize: () => e(t.endNodeResize()),
    showContextMenu: (n, o, r) => e(t.showContextMenu(n, o, r)),
    hideContextMenu: () => e(t.hideContextMenu())
  }), [e, t]);
}
function xd() {
  const { state: e } = Z(), t = Ot();
  return { state: e, actions: t };
}
function oo() {
  const e = kt(), t = Tt(), n = Ot();
  return {
    /** Node editor actions (add/remove/update nodes and connections) */
    editor: e,
    /** Canvas viewport and grid actions */
    canvas: t,
    /** User interaction actions (drag, resize, selection) */
    interaction: n
  };
}
function bd() {
  const e = oo();
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
function ro(e) {
  return typeof e == "string" && ["light", "dark", "auto"].includes(e);
}
function ve(e, t, n) {
  const o = e.getValue(t);
  return typeof o == "boolean" ? o : n;
}
function Pe(e, t, n) {
  const o = e.getValue(t);
  return typeof o == "number" ? o : n;
}
function so(e, t, n) {
  const o = e.getValue(t);
  return typeof o == "string" ? o : n;
}
function io(e, t, n) {
  const o = e.getValue(t);
  return ro(o) ? o : n;
}
function Mt(e) {
  const [t, n] = d.useState(0);
  return d.useEffect(() => e ? e.on("change", () => {
    n((s) => s + 1);
  }) : void 0, [e]), d.useMemo(() => e ? {
    showGrid: ve(e, "appearance.showGrid", re.showGrid),
    showMinimap: ve(e, "appearance.showMinimap", re.showMinimap),
    showStatusBar: ve(e, "appearance.showStatusBar", re.showStatusBar),
    theme: io(e, "appearance.theme", re.theme),
    autoSave: ve(e, "general.autoSave", re.autoSave),
    autoSaveInterval: Pe(e, "general.autoSaveInterval", re.autoSaveInterval),
    smoothAnimations: ve(e, "behavior.smoothAnimations", re.smoothAnimations),
    doubleClickToEdit: ve(e, "behavior.doubleClickToEdit", re.doubleClickToEdit),
    fontSize: Pe(e, "appearance.fontSize", re.fontSize),
    gridSize: Pe(e, "appearance.gridSize", re.gridSize),
    gridOpacity: Pe(e, "appearance.gridOpacity", re.gridOpacity),
    canvasBackground: so(e, "appearance.canvasBackground", re.canvasBackground)
  } : re, [e, t]);
}
const ao = (e, t = 1.5) => {
  const { state: n } = se();
  return d.useMemo(() => {
    const { viewport: o } = n, r = window.innerWidth, s = window.innerHeight, i = Math.max(r, s) * (t - 1) / 2, a = {
      left: (-o.offset.x - i) / o.scale,
      top: (-o.offset.y - i) / o.scale,
      right: (r - o.offset.x + i) / o.scale,
      bottom: (s - o.offset.y + i) / o.scale
    };
    return Object.values(e).filter((c) => {
      var h, v;
      const u = ((h = c.size) == null ? void 0 : h.width) || 150, p = ((v = c.size) == null ? void 0 : v.height) || 50;
      return c.position.x + u >= a.left && c.position.x <= a.right && c.position.y + p >= a.top && c.position.y <= a.bottom;
    });
  }, [e, n.viewport, t]);
}, Nd = (e, t = {}) => {
  const { delay: n = 0, maxBatchSize: o = 100 } = t, [r, s] = d.useState(e), i = d.useRef([]), a = d.useRef(null), c = d.useRef(null), u = d.useCallback(() => {
    i.current.length !== 0 && (s((v) => {
      let y = v;
      for (const x of i.current)
        y = x(y);
      return y;
    }), i.current = [], a.current = null, c.current && (clearTimeout(c.current), c.current = null));
  }, []), p = d.useCallback((v) => {
    const y = typeof v == "function" ? v : (x) => v;
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
  }, []), [r, p, h];
}, Ae = {
  visualSize: 12,
  connectionMargin: 8,
  edgePadding: 20,
  relativePadding: 0.1
};
function co(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const o = n.position || "right";
    t.has(o) || t.set(o, []), t.get(o).push(n);
  }
  return t;
}
function zt(e, t, n) {
  if (t === 1)
    return 0.5;
  if (t === 2)
    return [0.3333, 0.6667][e] || 0.5;
  const r = (1 - n.relativePadding * 2) / (t - 1), s = n.relativePadding + r * e;
  return Math.max(0.1, Math.min(0.9, s));
}
function lo(e, t, n, o, r) {
  const s = zt(t, n, r), i = r.visualSize / 2;
  switch (e.position) {
    case "left":
      return {
        x: -i,
        y: o.height * s,
        transform: "translateY(-50%)"
      };
    case "right":
      return {
        x: o.width - i,
        y: o.height * s,
        transform: "translateY(-50%)"
      };
    case "top":
      return {
        x: o.width * s,
        y: -i,
        transform: "translateX(-50%)"
      };
    case "bottom":
      return {
        x: o.width * s,
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
function uo(e, t, n, o, r) {
  const s = et(o), { left: i, top: a } = Re(o), c = zt(t, n, r);
  switch (e.position) {
    case "left":
      return {
        x: i - r.connectionMargin,
        y: a + s.height * c
      };
    case "right":
      return {
        x: i + s.width + r.connectionMargin,
        y: a + s.height * c
      };
    case "top":
      return {
        x: i + s.width * c,
        y: a - r.connectionMargin
      };
    case "bottom":
      return {
        x: i + s.width * c,
        y: a + s.height + r.connectionMargin
      };
    default:
      return {
        x: i + s.width + r.connectionMargin,
        y: a + s.height * 0.5
      };
  }
}
function Le(e, t = Ae) {
  const n = /* @__PURE__ */ new Map(), o = e.ports || [];
  if (o.length === 0)
    return n;
  const r = et(e), s = co(o);
  for (const [i, a] of s)
    a.forEach((c, u) => {
      const p = lo(
        c,
        u,
        a.length,
        r,
        t
      ), h = uo(
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
function po(e, t = Ae) {
  const n = /* @__PURE__ */ new Map();
  for (const o of e) {
    const r = Le(o, t);
    r.size > 0 && n.set(o.id, r);
  }
  return n;
}
function Cd(e, t, n = Ae) {
  const o = new Map(e);
  for (const r of t) {
    const s = Le(r, n);
    s.size > 0 ? o.set(r.id, s) : o.delete(r.id);
  }
  return o;
}
function Rt(e, t) {
  var r, s, i, a, c, u;
  const { state: n, getNodePorts: o } = j();
  return d.useMemo(() => {
    const p = n.nodes[e];
    if (!p) return;
    const h = {
      ...p,
      ports: o(e)
    };
    return Le(h).get(t);
  }, [
    (r = n.nodes[e]) == null ? void 0 : r.position.x,
    (s = n.nodes[e]) == null ? void 0 : s.position.y,
    (a = (i = n.nodes[e]) == null ? void 0 : i.size) == null ? void 0 : a.width,
    (u = (c = n.nodes[e]) == null ? void 0 : c.size) == null ? void 0 : u.height,
    e,
    t,
    o
  ]);
}
function Ce(e, t) {
  const n = Rt(e, t);
  return n == null ? void 0 : n.connectionPoint;
}
function tt(e, t) {
  if (e.ports)
    return e.ports;
  const n = t.ports || [], o = e;
  return n.map((r) => {
    var a;
    const s = {
      id: r.id,
      type: r.type,
      label: r.label,
      nodeId: e.id,
      position: r.position,
      dataType: r.dataType,
      maxConnections: r.maxConnections
    }, i = (a = o.portOverrides) == null ? void 0 : a.find(
      (c) => c.portId === r.id
    );
    if (i) {
      if (i.disabled)
        return null;
      i.maxConnections !== void 0 && (s.maxConnections = i.maxConnections), i.allowedNodeTypes && (s.allowedNodeTypes = i.allowedNodeTypes), i.allowedPortTypes && (s.allowedPortTypes = i.allowedPortTypes);
    }
    return s;
  }).filter((r) => r !== null);
}
function ho(e, t, n) {
  return tt(e, n).find((r) => r.id === t);
}
function go(e, t) {
  const n = /* @__PURE__ */ new Map();
  for (const o of Object.values(e)) {
    const r = t(o.type);
    if (!r) continue;
    const s = tt(o, r);
    for (const i of s) {
      const a = `${o.id}:${i.id}`;
      n.set(a, { node: o, port: i });
    }
  }
  return n;
}
function fo() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  return {
    getNodePorts(n, o) {
      const r = n.id;
      if (e.has(r))
        return e.get(r);
      const s = tt(n, o);
      return e.set(r, s), s;
    },
    getPort(n, o, r) {
      const s = `${n.id}:${o}`;
      if (t.has(s))
        return t.get(s);
      const i = ho(n, o, r);
      return t.set(s, i), i;
    },
    createPortLookupMap(n, o) {
      return go(n, o);
    },
    clearCache() {
      e.clear(), t.clear();
    },
    clearNodeCache(n) {
      e.delete(n);
      const o = [];
      t.forEach((r, s) => {
        s.startsWith(`${n}:`) && o.push(s);
      }), o.forEach((r) => t.delete(r));
    }
  };
}
const At = {
  version: 2,
  portsStorageMethod: "inferred"
}, mo = {
  version: 1,
  portsStorageMethod: "embedded"
};
function yo(e) {
  return e.formatVersion ? e.formatVersion.portsStorageMethod === "embedded" : !0;
}
function vo(e, t) {
  const n = [];
  let o = 0, r = 0, s = 0;
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
      for (const g of u.ports) {
        const f = p.ports.find((w) => w.id === g.id);
        if (!f) {
          n.push(
            `Port ${g.id} on node ${c} not found in definition. It will be lost during migration.`
          );
          continue;
        }
        const b = { portId: g.id };
        let P = !1;
        g.maxConnections !== void 0 && g.maxConnections !== f.maxConnections && (b.maxConnections = g.maxConnections, P = !0), g.allowedNodeTypes && (b.allowedNodeTypes = g.allowedNodeTypes, P = !0), g.allowedPortTypes && (b.allowedPortTypes = g.allowedPortTypes, P = !0), P && (h.push(b), s++);
      }
    const { ports: v, ...y } = u;
    r += v.length;
    const x = {
      ...y,
      ...h.length > 0 ? { portOverrides: h } : {}
    };
    i[c] = x;
  }
  return {
    data: {
      nodes: i,
      connections: e.connections,
      formatVersion: At
    },
    statistics: {
      nodesProcessed: o,
      portsRemoved: r,
      portOverridesCreated: s
    },
    warnings: n
  };
}
function xo(e, t = !0) {
  if (!t)
    return {
      ...e,
      formatVersion: mo
    };
  const n = {};
  for (const [o, r] of Object.entries(e.nodes)) {
    const { ports: s, ...i } = r;
    n[o] = i;
  }
  return {
    nodes: n,
    connections: e.connections,
    formatVersion: At
  };
}
function bo(e, t, n = !0) {
  if (!yo(e) || !n)
    return { data: e, migrated: !1 };
  const o = vo(e, t);
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
function No() {
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
      const n = ke(), o = { ...t.payload.node, id: n };
      return {
        ...e,
        nodes: {
          ...e.nodes,
          [n]: o
        }
      };
    }
    case "UPDATE_NODE": {
      const { nodeId: n, updates: o } = t.payload, r = e.nodes[n];
      return r ? {
        ...e,
        nodes: {
          ...e.nodes,
          [n]: { ...r, ...o }
        }
      } : e;
    }
    case "DELETE_NODE": {
      const { nodeId: n } = t.payload, { [n]: o, ...r } = e.nodes, s = Object.entries(e.connections).reduce((i, [a, c]) => (c.fromNodeId !== n && c.toNodeId !== n && (i[a] = c), i), {});
      return {
        ...e,
        nodes: r,
        connections: s
      };
    }
    case "MOVE_NODE": {
      const { nodeId: n, position: o } = t.payload, r = e.nodes[n];
      return r ? {
        ...e,
        nodes: {
          ...e.nodes,
          [n]: { ...r, position: o }
        }
      } : e;
    }
    case "MOVE_NODES": {
      const { updates: n } = t.payload, o = { ...e.nodes };
      return Object.entries(n).forEach(([r, s]) => {
        const i = o[r];
        i && (o[r] = { ...i, position: s });
      }), {
        ...e,
        nodes: o
      };
    }
    case "ADD_CONNECTION": {
      const { connection: n } = t.payload, o = ke(), r = Object.entries(e.connections).filter(
        ([i, a]) => a.toNodeId === n.toNodeId && a.toPortId === n.toPortId
      ), s = { ...e.connections };
      return r.forEach(([i]) => {
        delete s[i];
      }), {
        ...e,
        connections: {
          ...s,
          [o]: { ...n, id: o }
        }
      };
    }
    case "DELETE_CONNECTION": {
      const { connectionId: n } = t.payload, { [n]: o, ...r } = e.connections;
      return {
        ...e,
        connections: r
      };
    }
    case "SET_NODE_DATA":
      return t.payload.data;
    case "RESTORE_STATE":
      return t.payload.data;
    case "DUPLICATE_NODES": {
      const { nodeIds: n } = t.payload;
      if (n.length === 0) return e;
      const o = { ...e.nodes }, r = [];
      return n.forEach((s) => {
        const i = e.nodes[s];
        if (!i) return;
        const a = ke();
        r.push(a);
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
        lastDuplicatedNodeIds: r
      };
    }
    case "GROUP_NODES": {
      const { nodeIds: n, groupId: o = ke() } = t.payload;
      if (n.length === 0) return e;
      let r = 1 / 0, s = 1 / 0, i = -1 / 0, a = -1 / 0;
      n.forEach((u) => {
        var h, v;
        const p = e.nodes[u];
        p && (r = Math.min(r, p.position.x), s = Math.min(s, p.position.y), i = Math.max(i, p.position.x + (((h = p.size) == null ? void 0 : h.width) || 100)), a = Math.max(a, p.position.y + (((v = p.size) == null ? void 0 : v.height) || 50)));
      });
      const c = {
        id: o,
        type: "group",
        position: { x: r - 20, y: s - 40 },
        size: { width: i - r + 40, height: a - s + 60 },
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
      const { [n]: r, ...s } = e.nodes;
      return {
        ...e,
        nodes: s
      };
    }
    case "UPDATE_GROUP_MEMBERSHIP": {
      const { updates: n } = t.payload, o = { ...e.nodes };
      return Object.entries(n).forEach(([r, s]) => {
        const i = o[r];
        i && (o[r] = { ...i, ...s });
      }), {
        ...e,
        nodes: o
      };
    }
    case "MOVE_GROUP_WITH_CHILDREN": {
      const { groupId: n, delta: o } = t.payload, r = { ...e.nodes }, s = r[n];
      return s && (r[n] = {
        ...s,
        position: {
          x: s.position.x + o.x,
          y: s.position.y + o.y
        }
      }, Object.values(r).forEach((i) => {
        i.parentId === n && (r[i.id] = {
          ...i,
          position: {
            x: i.position.x + o.x,
            y: i.position.y + o.y
          }
        });
      })), {
        ...e,
        nodes: r
      };
    }
    case "AUTO_LAYOUT": {
      const { layoutType: n, selectedOnly: o = !1 } = t.payload;
      return o && (Object.fromEntries(
        Object.entries(e.nodes).filter(
          ([r, s]) => (
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
function ke() {
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
}, Lt = d.createContext(null), Co = ({
  children: e,
  initialState: t,
  controlledData: n,
  onDataChange: o,
  onLoad: r,
  onSave: s,
  settingsManager: i
}) => {
  const a = d.useContext(Ze), c = a == null ? void 0 : a.registry, u = d.useMemo(() => No(), []), p = d.useMemo(() => fo(), []), h = d.useMemo(() => ({
    nodes: (t == null ? void 0 : t.nodes) || dt.nodes,
    connections: (t == null ? void 0 : t.connections) || dt.connections
  }), [t]), [v, y] = d.useReducer(ct, h), x = n || v, g = d.useRef(o);
  g.current = o;
  const f = d.useCallback(
    (k) => {
      if (!n)
        y(k);
      else if (g.current) {
        const O = ct(x, k);
        g.current(O);
      }
    },
    [n, x]
  ), [b, P] = d.useState(!1), [w, E] = d.useState(!1), T = Mt(i), { autoSave: m, autoSaveInterval: N } = T;
  d.useEffect(() => {
    r && !b && (P(!0), Promise.resolve(r()).then((k) => {
      const { data: O, migrated: z, migrationResult: _ } = bo(
        k,
        c,
        u.autoMigrateOnLoad
      );
      z && _ && u.showMigrationWarnings && (console.log("Node editor data migrated successfully:", _.statistics), _.warnings.length > 0 && console.warn("Migration warnings:", _.warnings)), f(lt.setNodeData(O));
    }).catch((k) => {
      console.error("Failed to load node editor data:", k);
    }).finally(() => {
      P(!1);
    }));
  }, [u]);
  const C = d.useCallback(async () => {
    if (s && !w) {
      E(!0);
      try {
        const k = xo(x, u.saveInNewFormat);
        await Promise.resolve(s(k));
      } catch (k) {
        console.error("Failed to save node editor data:", k);
      } finally {
        E(!1);
      }
    }
  }, [s, x, w]);
  d.useEffect(() => {
    if (!m || !s) return;
    const k = setInterval(() => {
      w || C();
    }, N * 1e3);
    return () => clearInterval(k);
  }, [m, N, C, w]);
  const D = d.useCallback(
    (k) => {
      const O = x.nodes[k];
      if (!O) return [];
      if (u.useInferredPortsOnly) {
        if (!c)
          return console.error("NodeDefinitionRegistry is required when useInferredPortsOnly is enabled"), [];
        const z = c.get(O.type);
        return z ? p.getNodePorts(O, z) : (console.warn(`No definition found for node type: ${O.type}`), []);
      }
      if (c) {
        const z = c.get(O.type);
        if (z)
          return p.getNodePorts(O, z);
      }
      return O.ports || [];
    },
    [x.nodes, c, p, u.useInferredPortsOnly]
  ), R = d.useCallback(
    (k, O) => {
      var _;
      const z = x.nodes[k];
      if (z) {
        if (u.useInferredPortsOnly) {
          if (!c) {
            console.error("NodeDefinitionRegistry is required when useInferredPortsOnly is enabled");
            return;
          }
          const V = c.get(z.type);
          if (!V) {
            console.warn(`No definition found for node type: ${z.type}`);
            return;
          }
          return p.getPort(z, O, V);
        }
        if (c) {
          const V = c.get(z.type);
          if (V)
            return p.getPort(z, O, V);
        }
        return (_ = z.ports) == null ? void 0 : _.find((V) => V.id === O);
      }
    },
    [x.nodes, c, p, u.useInferredPortsOnly]
  ), $ = d.useMemo(() => {
    if (u.useInferredPortsOnly)
      return c ? p.createPortLookupMap(
        x.nodes,
        (k) => c.get(k)
      ) : (console.error("NodeDefinitionRegistry is required when useInferredPortsOnly is enabled"), /* @__PURE__ */ new Map());
    if (!c) {
      const k = /* @__PURE__ */ new Map();
      for (const O of Object.values(x.nodes)) {
        const z = O.ports || [];
        for (const _ of z) {
          const V = `${O.id}:${_.id}`;
          k.set(V, { node: O, port: _ });
        }
      }
      return k;
    }
    return p.createPortLookupMap(
      x.nodes,
      (k) => c.get(k)
    );
  }, [x.nodes, c, p, u.useInferredPortsOnly]);
  d.useEffect(() => {
    p.clearCache();
  }, [x.nodes, p]);
  const S = d.useMemo(() => ({
    state: x,
    dispatch: f,
    actions: lt,
    isLoading: b,
    isSaving: w,
    handleSave: C,
    getNodePorts: D,
    getPort: R,
    portLookupMap: $
  }), [x, f, b, w, C, D, R, $]);
  return /* @__PURE__ */ l(Lt.Provider, { value: S, children: e });
}, j = () => {
  const e = d.useContext(Lt);
  if (!e)
    throw new Error("useNodeEditor must be used within a NodeEditorProvider");
  return e;
}, So = (e, t) => {
  switch (t.type) {
    case "PUSH_ENTRY": {
      if (!e.isRecording) return e;
      const { action: n, data: o } = t.payload, r = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        action: n,
        data: JSON.parse(JSON.stringify(o))
        // Deep clone
      }, a = [...e.entries.slice(0, e.currentIndex + 1), r].slice(-e.maxEntries);
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
}, wo = {
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
}, Vt = d.createContext(null), Eo = ({
  children: e,
  initialState: t
}) => {
  const [n, o] = d.useReducer(
    So,
    { ...wo, ...t }
  ), r = n.currentIndex > 0, s = n.currentIndex < n.entries.length - 1, i = n.currentIndex >= 0 ? n.entries[n.currentIndex] : null, a = d.useCallback(
    (h, v) => {
      o(Te.pushEntry(h, v));
    },
    [o]
  ), c = d.useCallback(() => r ? (o(Te.undo()), n.entries[n.currentIndex - 1] || null) : null, [r, n.entries, n.currentIndex, o]), u = d.useCallback(() => s ? (o(Te.redo()), n.entries[n.currentIndex + 1] || null) : null, [s, n.entries, n.currentIndex, o]), p = {
    state: n,
    dispatch: o,
    actions: Te,
    canUndo: r,
    canRedo: s,
    currentEntry: i,
    pushEntry: a,
    undo: c,
    redo: u
  };
  return /* @__PURE__ */ l(Vt.Provider, { value: p, children: e });
}, Io = () => {
  const e = d.useContext(Vt);
  if (!e)
    throw new Error("useHistory must be used within a HistoryProvider");
  return e;
}, Do = () => {
  const { state: e, dispatch: t, actions: n } = j(), { pushEntry: o, undo: r, redo: s, canUndo: i, canRedo: a } = Io(), c = d.useRef(e), u = d.useRef(null);
  d.useEffect(() => {
    const y = e, x = c.current;
    if (x === y || JSON.stringify(x) === JSON.stringify(y))
      return;
    const g = u.current || "Unknown Action";
    o(g, x), c.current = y, u.current = null;
  }, [e, o]);
  const p = d.useCallback((y) => {
    y && typeof y == "object" && y.type && (u.current = y.type), t(y);
  }, [t]), h = d.useCallback(() => {
    if (!i) return !1;
    const y = r();
    return y ? (u.current = null, c.current = y.data, t(n.restoreState(y.data)), !0) : !1;
  }, [i, r, t, n]), v = d.useCallback(() => {
    if (!a) return !1;
    const y = s();
    return y ? (u.current = null, c.current = y.data, t(n.restoreState(y.data)), !0) : !1;
  }, [a, s, t, n]);
  return {
    dispatchWithHistory: p,
    performUndo: h,
    performRedo: v,
    canUndo: i,
    canRedo: a
  };
}, Po = {
  iterations: 100,
  springLength: 150,
  springStrength: 0.3,
  repulsionStrength: 1e3,
  dampening: 0.9,
  maxForce: 50,
  padding: 100
};
function ko(e, t = {}) {
  const n = { ...Po, ...t }, o = Object.values(e.nodes), r = Object.values(e.connections);
  if (o.length === 0)
    return { nodePositions: {}, iterations: 0 };
  if (o.length === 1)
    return {
      nodePositions: { [o[0].id]: { x: 0, y: 0 } },
      iterations: 0
    };
  const s = {}, i = {};
  o.forEach((p, h) => {
    if (p.position)
      s[p.id] = { ...p.position };
    else {
      const v = h / o.length * 2 * Math.PI, y = Math.sqrt(o.length) * 50;
      s[p.id] = {
        x: Math.cos(v) * y,
        y: Math.sin(v) * y
      };
    }
    i[p.id] = { x: 0, y: 0 };
  });
  const a = {};
  o.forEach((p) => {
    a[p.id] = /* @__PURE__ */ new Set();
  }), r.forEach((p) => {
    a[p.fromNodeId] && a[p.toNodeId] && (a[p.fromNodeId].add(p.toNodeId), a[p.toNodeId].add(p.fromNodeId));
  });
  let c = 0;
  for (let p = 0; p < n.iterations; p++) {
    c++;
    const h = {};
    o.forEach((x) => {
      h[x.id] = { x: 0, y: 0 };
    });
    for (let x = 0; x < o.length; x++)
      for (let g = x + 1; g < o.length; g++) {
        const f = o[x], b = o[g], P = s[f.id], w = s[b.id], E = w.x - P.x, T = w.y - P.y, m = Math.sqrt(E * E + T * T);
        if (m < 0.01) continue;
        const N = n.repulsionStrength / (m * m), C = E / m * N, D = T / m * N;
        h[f.id].x -= C, h[f.id].y -= D, h[b.id].x += C, h[b.id].y += D;
      }
    r.forEach((x) => {
      const g = s[x.fromNodeId], f = s[x.toNodeId];
      if (!g || !f) return;
      const b = f.x - g.x, P = f.y - g.y, w = Math.sqrt(b * b + P * P);
      if (w < 0.01) return;
      const E = n.springStrength * (w - n.springLength), T = b / w * E, m = P / w * E;
      h[x.fromNodeId].x += T, h[x.fromNodeId].y += m, h[x.toNodeId].x -= T, h[x.toNodeId].y -= m;
    });
    let v = 0;
    if (o.forEach((x) => {
      const g = h[x.id], f = Math.sqrt(g.x * g.x + g.y * g.y);
      f > n.maxForce && (g.x = g.x / f * n.maxForce, g.y = g.y / f * n.maxForce), i[x.id].x = i[x.id].x * n.dampening + g.x, i[x.id].y = i[x.id].y * n.dampening + g.y;
      const b = { ...s[x.id] };
      s[x.id].x += i[x.id].x, s[x.id].y += i[x.id].y;
      const P = Math.sqrt(
        Math.pow(s[x.id].x - b.x, 2) + Math.pow(s[x.id].y - b.y, 2)
      );
      v += P;
    }), v / o.length < 0.1)
      break;
  }
  const u = Object.keys(s);
  if (u.length > 0) {
    let p = 1 / 0, h = -1 / 0, v = 1 / 0, y = -1 / 0;
    u.forEach((f) => {
      const b = s[f];
      p = Math.min(p, b.x), h = Math.max(h, b.x), v = Math.min(v, b.y), y = Math.max(y, b.y);
    });
    const x = (p + h) / 2, g = (v + y) / 2;
    u.forEach((f) => {
      s[f].x = s[f].x - x + n.padding, s[f].y = s[f].y - g + n.padding;
    });
  }
  return {
    nodePositions: s,
    iterations: c
  };
}
function To(e, t = {}) {
  const { spacing: n = 200, layerHeight: o = 150 } = t, r = Object.values(e.nodes), s = Object.values(e.connections);
  if (r.length === 0)
    return { nodePositions: {}, iterations: 0 };
  const i = {}, a = {};
  r.forEach((g) => {
    i[g.id] = /* @__PURE__ */ new Set(), a[g.id] = /* @__PURE__ */ new Set();
  }), s.forEach((g) => {
    i[g.fromNodeId] && a[g.toNodeId] && (i[g.fromNodeId].add(g.toNodeId), a[g.toNodeId].add(g.fromNodeId));
  });
  const c = r.filter((g) => a[g.id].size === 0);
  if (c.length === 0) {
    const g = Math.min(...r.map((f) => a[f.id].size));
    c.push(...r.filter((f) => a[f.id].size === g));
  }
  const u = [], p = {}, h = /* @__PURE__ */ new Set();
  u[0] = c.map((g) => g.id), c.forEach((g) => {
    p[g.id] = 0, h.add(g.id);
  });
  let v = 0;
  for (; u[v] && u[v].length > 0; ) {
    const g = [];
    if (u[v].forEach((f) => {
      i[f].forEach((b) => {
        h.has(b) || (g.push(b), p[b] = v + 1, h.add(b));
      });
    }), g.length > 0)
      u[v + 1] = g, v++;
    else
      break;
  }
  const y = r.filter((g) => !h.has(g.id));
  y.length > 0 && (u[v + 1] || (u[v + 1] = []), u[v + 1].push(...y.map((g) => g.id)), y.forEach((g) => {
    p[g.id] = v + 1;
  }));
  const x = {};
  return u.forEach((g, f) => {
    const b = f * o, w = -((g.length - 1) * n) / 2;
    g.forEach((E, T) => {
      x[E] = {
        x: w + T * n,
        y: b
      };
    });
  }), {
    nodePositions: x,
    iterations: u.length
  };
}
function Oo(e, t = {}) {
  const { spacing: n = 200, columns: o } = t, r = Object.values(e.nodes);
  if (r.length === 0)
    return { nodePositions: {}, iterations: 0 };
  const s = o || Math.ceil(Math.sqrt(r.length)), i = Math.ceil(r.length / s), a = {};
  return r.forEach((c, u) => {
    const p = Math.floor(u / s), h = u % s, v = (s - 1) * n, y = (i - 1) * n;
    a[c.id] = {
      x: h * n - v / 2,
      y: p * n - y / 2
    };
  }), {
    nodePositions: a,
    iterations: 0
  };
}
const Mo = () => {
  const { state: e, dispatch: t, actions: n } = j(), { state: o } = Z(), r = d.useCallback((c = !1) => {
    console.log("Applying force-directed layout");
    const p = {
      nodes: c ? Object.fromEntries(
        Object.entries(e.nodes).filter(
          ([v]) => o.selectedNodeIds.includes(v)
        )
      ) : e.nodes,
      connections: e.connections
    }, h = ko(p, {
      iterations: 150,
      springLength: 200,
      springStrength: 0.4,
      repulsionStrength: 2e3,
      dampening: 0.85
    });
    Object.keys(h.nodePositions).length > 0 && t(n.moveNodes(h.nodePositions));
  }, [e, o.selectedNodeIds, t, n]), s = d.useCallback((c = !1) => {
    console.log("Applying hierarchical layout");
    const p = {
      nodes: c ? Object.fromEntries(
        Object.entries(e.nodes).filter(
          ([v]) => o.selectedNodeIds.includes(v)
        )
      ) : e.nodes,
      connections: e.connections
    }, h = To(p, {
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
    }, h = Oo(p, {
      spacing: 250,
      columns: Math.ceil(Math.sqrt(Object.keys(u).length))
    });
    Object.keys(h.nodePositions).length > 0 && t(n.moveNodes(h.nodePositions));
  }, [e, o.selectedNodeIds, t, n]);
  return {
    applyLayout: d.useCallback((c, u = !1) => {
      switch (c) {
        case "force":
          r(u);
          break;
        case "hierarchical":
          s(u);
          break;
        case "grid":
          i(u);
          break;
        default:
          console.warn(`Unknown layout type: ${c}`);
      }
    }, [r, s, i]),
    applyForceLayout: r,
    applyHierarchicalLayout: s,
    applyGridLayout: i
  };
}, zo = () => {
  const { state: e, dispatch: t, actions: n } = j(), { state: o, dispatch: r, actions: s } = Z(), { performUndo: i, performRedo: a, canUndo: c, canRedo: u } = Do(), { applyLayout: p } = Mo();
  ae(
    { key: "Delete" },
    d.useCallback(() => {
      console.log("Delete shortcut triggered"), o.selectedNodeIds.length > 0 ? (o.selectedNodeIds.forEach((h) => {
        t(n.deleteNode(h));
      }), r(s.clearSelection())) : o.selectedConnectionIds.length > 0 && (o.selectedConnectionIds.forEach((h) => {
        t(n.deleteConnection(h));
      }), r(s.clearSelection()));
    }, [o.selectedNodeIds, o.selectedConnectionIds, t, n, r, s])
  ), ae(
    { key: "Backspace" },
    d.useCallback(() => {
      console.log("Backspace shortcut triggered"), o.selectedNodeIds.length > 0 ? (o.selectedNodeIds.forEach((h) => {
        t(n.deleteNode(h));
      }), r(s.clearSelection())) : o.selectedConnectionIds.length > 0 && (o.selectedConnectionIds.forEach((h) => {
        t(n.deleteConnection(h));
      }), r(s.clearSelection()));
    }, [o.selectedNodeIds, o.selectedConnectionIds, t, n, r, s])
  ), ae(
    { key: "a", ctrl: !0 },
    d.useCallback(() => {
      console.log("Select All shortcut triggered");
      const h = Object.keys(e.nodes);
      r(s.selectAllNodes(h));
    }, [e.nodes, r, s])
  ), ae(
    { key: "Escape" },
    d.useCallback(() => {
      console.log("Escape shortcut triggered"), r(s.clearSelection());
    }, [r, s])
  ), ae(
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
  ), ae(
    { key: "d", ctrl: !0 },
    d.useCallback(() => {
      console.log("Duplicate shortcut triggered"), o.selectedNodeIds.length > 0 && t(n.duplicateNodes(o.selectedNodeIds));
    }, [o.selectedNodeIds, t, n])
  ), d.useEffect(() => {
    e.lastDuplicatedNodeIds && e.lastDuplicatedNodeIds.length > 0 && (r(s.selectAllNodes(e.lastDuplicatedNodeIds)), t(n.setNodeData({
      ...e,
      lastDuplicatedNodeIds: void 0
    })));
  }, [e.lastDuplicatedNodeIds, r, s, t, n, e]), ae(
    { key: "s", ctrl: !0 },
    d.useCallback((h) => {
      console.log("Save shortcut triggered"), console.log("Save not yet implemented");
    }, [])
  ), ae(
    { key: "l", ctrl: !0 },
    d.useCallback(() => {
      console.log("Auto Layout shortcut triggered");
      const h = o.selectedNodeIds.length > 0;
      p("force", h);
    }, [o.selectedNodeIds, p])
  ), ae(
    { key: "z", ctrl: !0 },
    d.useCallback(() => {
      console.log("Undo shortcut triggered"), c && i();
    }, [c, i])
  ), ae(
    { key: "z", ctrl: !0, shift: !0 },
    d.useCallback(() => {
      console.log("Redo shortcut triggered"), u && a();
    }, [u, a])
  ), ae(
    { key: "y", ctrl: !0 },
    d.useCallback(() => {
      console.log("Redo (Ctrl+Y) shortcut triggered"), u && a();
    }, [u, a])
  );
}, Ro = "xtnnddtrnodedibas", Ao = "xtnnddtrcnt", Lo = "xtnnddtrcanvas", Vo = "xtnnddtrpanning", _o = "xtnnddtrspapan", $o = "xtnnddtrnodes", Ho = "xtnnddtrnode", Bo = "xtnnddtrlocked", Go = "xtnnddtrsel", Uo = "xtnnddtrdrg", Xo = "xtnnddtrnodehdr", Yo = "xtnnddtrintdra", Fo = "xtnnddtrnod", jo = "xtnnddtrlockico", Wo = "xtnnddtrnodectn", Ko = "xtnnddtrgrpNode", Zo = "xtnnddtrcold", qo = "xtnnddtrgrpcold", Jo = "xtnnddtrgrpexped", Qo = "xtnnddtrnodeinf", er = "xtnnddtrnodesuc", tr = "xtnnddtrnodewrn", nr = "xtnnddtrnodeerr", or = "xtnnddtrnodedis", rr = "xtnnddtrtbr", sr = "xtnnddtrtoolbtn", ir = "xtnnddtrconmen", ar = "xtnnddtrconmenrax", cr = "xtnnddtrgrid", dr = "xtnnddtrins", lr = "xtnnddtrinscIz", ur = "xtnnddtrinszAn", pr = "xtnnddtrinssec", hr = "xtnnddtrinsrow", gr = "xtnnddtrediwitins", fr = "xtnnddtredimai", mr = "xtnnddtrextdat", yr = "xtnnddtrdragui", vr = "xtnnddtrdraguiVp7", xr = "xtnnddtrdraguiPHl", br = "xtnnddtrdragui-eW", Nr = "xtnnddtrsnatar", Cr = "xtnnddtrdis", Sr = "xtnnddtrdislin", wr = "xtnnddtrstabar", Er = "xtnnddtrstasec", Ir = "xtnnddtrsta", Dr = "xtnnddtrstaval", Pr = "xtnnddtrstamod", kr = "xtnnddtrnodePort", Tr = "xtnnddtrportinp", Or = "xtnnddtrporout", Mr = "xtnnddtrporinn", zr = "xtnnddtrportlbl", Rr = "xtnnddtrportLeft", Ar = "xtnnddtrporrig", Lr = "xtnnddtrportTop", Vr = "xtnnddtrporbot", _r = "xtnnddtrcon", $r = "xtnnddtrinstab", Hr = "xtnnddtrinstab5EW", Br = "xtnnddtract", Gr = "xtnnddtrinsnopad", Ur = "xtnnddtrinsfie", Xr = "xtnnddtrinsj42", Yr = "xtnnddtrinskYN", Fr = "xtnnddtrinspos", jr = "xtnnddtrinsnum", Wr = "xtnnddtrinsreaonlfie", Kr = "xtnnddtrinssta", Zr = "xtnnddtrcan", qr = "xtnnddtrboxsel", Jr = "xtnnddtrgridSvg", Qr = "xtnnddtredi", es = "xtnnddtrediA9y", ts = "xtnnddtrediPTx", ns = "xtnnddtredi-tX", os = "xtnnddtrtoptbr", rs = "xtnnddtrnodlay", ss = "xtnnddtrnodeView", is = "xtnnddtrnodtit", as = "xtnnddtrnodtitpsF", cs = "xtnnddtrgrpaccdro", ds = "xtnnddtrgrpPulse", ls = "xtnnddtrgrphaschi", us = "xtnnddtrnodpor", ps = "xtnnddtrport", hs = "xtnnddtrporhov", gs = "xtnnddtrporcon", fs = "xtnnddtrpulse", ms = "xtnnddtrporcon7Fy", ys = "xtnnddtrporlef", vs = "xtnnddtrporrigtpL", xs = "xtnnddtrportop", bs = "xtnnddtrporbotsMk", Ns = "xtnnddtrconlay", Cs = "xtnnddtrconhUO", Ss = "xtnnddtrcongay", ws = "xtnnddtrconhov", Es = "xtnnddtrconDHx", Is = "xtnnddtrdracon", Ds = "xtnnddtrdasani", Ps = "xtnnddtrselbox", ks = "xtnnddtrseldzq", Ts = "xtnnddtrldgovr", Os = "xtnnddtrldgind", Ms = "xtnnddtrcusnod", zs = "xtnnddtrres", Rs = "xtnnddtrresVnb", As = "xtnnddtrmin", Ls = "xtnnddtrminimap", Vs = "xtnnddtrmintit", _s = "xtnnddtrminont", $s = "xtnnddtrminvie", Hs = "xtnnddtrminnod", Bs = "xtnnddtrdarthe", Gs = "xtnnddtrsmoani", Us = "xtnnddtrstasav", Xs = "xtnnddtruiovrcnt", M = {
  nodeEditorBase: Ro,
  container: Ao,
  canvas: Lo,
  panning: Vo,
  spacePanning: _o,
  nodes: $o,
  node: Ho,
  locked: Bo,
  selected: Go,
  dragging: Uo,
  nodeHeader: Xo,
  interactiveDragHandle: Yo,
  nodeHeaderInput: Fo,
  lockIcon: jo,
  nodeContent: Wo,
  groupNode: Ko,
  collapsed: Zo,
  groupCollapsed: qo,
  groupExpanded: Jo,
  nodeInfo: Qo,
  nodeSuccess: er,
  nodeWarning: tr,
  nodeError: nr,
  nodeDisabled: or,
  toolbar: rr,
  toolButton: sr,
  contextMenu: ir,
  contextMenuItem: ar,
  grid: cr,
  inspectorPanel: dr,
  inspectorHeader: lr,
  inspectorContent: ur,
  inspectorSection: pr,
  inspectorRow: hr,
  editorWithInspector: gr,
  editorMain: fr,
  externalDataInfo: mr,
  dragGuides: yr,
  dragGuide: vr,
  dragGuideVertical: xr,
  dragGuideHorizontal: br,
  snapTarget: Nr,
  distanceIndicator: Cr,
  distanceLine: Sr,
  statusBar: wr,
  statusSection: Er,
  statusLabel: Ir,
  statusValue: Dr,
  statusMode: Pr,
  nodePort: kr,
  portInput: Tr,
  portOutput: Or,
  portInner: Mr,
  portLabel: zr,
  portLeft: Rr,
  portRight: Ar,
  portTop: Lr,
  portBottom: Vr,
  connections: _r,
  inspectorTabs: $r,
  inspectorTab: Hr,
  active: Br,
  inspectorContentNoPadding: Gr,
  inspectorField: Ur,
  inspectorInput: Xr,
  inspectorTextarea: Yr,
  inspectorPositionInputs: Fr,
  inspectorNumberInput: jr,
  inspectorReadOnlyField: Wr,
  inspectorEmptyState: Kr,
  canvasContainer: Zr,
  boxSelecting: qr,
  gridSvg: Jr,
  editorLayout: Qr,
  editorToolbar: es,
  editorContent: ts,
  editorSidebar: ns,
  topToolbar: os,
  nodeLayer: rs,
  nodeView: ss,
  nodeTitle: is,
  nodeTitleInput: as,
  groupAcceptingDrop: cs,
  groupPulse: ds,
  groupHasChildren: ls,
  nodePorts: us,
  port: ps,
  portHovered: hs,
  portConnecting: gs,
  pulse: fs,
  portConnected: ms,
  portLabelLeft: ys,
  portLabelRight: vs,
  portLabelTop: xs,
  portLabelBottom: bs,
  connectionLayer: Ns,
  connectionGroup: Cs,
  connectionSelected: Ss,
  connectionHovered: ws,
  connectionDragging: Es,
  dragConnection: Is,
  dashAnimation: Ds,
  selectionBoxOverlay: Ps,
  selectionOverlay: ks,
  loadingOverlay: Ts,
  loadingIndicator: Os,
  customNodeContent: Ms,
  resizeHandle: zs,
  resizeHandleActive: Rs,
  minimapContainer: As,
  minimap: Ls,
  minimapTitle: Vs,
  minimapContent: _s,
  minimapViewport: $s,
  minimapNodes: Hs,
  darkTheme: Bs,
  smoothAnimations: Gs,
  statusSaving: Us,
  uiOverlayContainer: Xs
}, _t = ({
  children: e,
  className: t,
  style: n
}) => (zo(), /* @__PURE__ */ l(
  "div",
  {
    className: W(M.nodeEditorBase, t),
    style: n,
    tabIndex: 0,
    children: e
  }
));
_t.displayName = "NodeEditorBase";
function $t(e, t) {
  const n = Je((e == null ? void 0 : e.type) || ""), [o, r] = d.useState({
    data: void 0,
    isLoading: !1,
    error: null
  }), s = d.useCallback(async () => {
    if (!(!e || !t || !(n != null && n.loadExternalData))) {
      r((a) => ({ ...a, isLoading: !0, error: null }));
      try {
        const a = await Promise.resolve(
          n.loadExternalData(t)
        );
        r({ data: a, isLoading: !1, error: null });
      } catch (a) {
        r({
          data: void 0,
          isLoading: !1,
          error: a instanceof Error ? a : new Error(String(a))
        });
      }
    }
  }, [e, t, n]);
  d.useEffect(() => {
    s();
  }, [s]);
  const i = d.useCallback(
    async (a) => {
      if (!e || !t || !(n != null && n.updateExternalData))
        throw new Error("Cannot update external data: missing requirements");
      r((c) => ({ ...c, isLoading: !0, error: null }));
      try {
        await Promise.resolve(
          n.updateExternalData(t, a)
        ), r({ data: a, isLoading: !1, error: null });
      } catch (c) {
        throw r((u) => ({
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
    refresh: s,
    update: i
  };
}
const Ht = ({ size: e, className: t }) => /* @__PURE__ */ l(
  "svg",
  {
    className: t,
    fill: "currentColor",
    width: e,
    height: e,
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ l("path", { d: "M3 2v20h2V2H3zm4 5v2h14V7H7zm0 4v2h10v-2H7zm0 4v2h14v-2H7z" })
  }
);
Ht.displayName = "AlignLeftIcon";
const Bt = ({ size: e, className: t }) => /* @__PURE__ */ l(
  "svg",
  {
    className: t,
    fill: "currentColor",
    width: e,
    height: e,
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ l("path", { d: "M5 7v2h14V7H5zm2 4v2h10v-2H7zm-2 4v2h14v-2H5z" })
  }
);
Bt.displayName = "AlignCenterIcon";
const Gt = ({ size: e, className: t }) => /* @__PURE__ */ l(
  "svg",
  {
    className: t,
    fill: "currentColor",
    width: e,
    height: e,
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ l("path", { d: "M19 2v20h2V2h-2zM3 7v2h14V7H3zm4 4v2h10v-2H7zm-4 4v2h14v-2H3z" })
  }
);
Gt.displayName = "AlignRightIcon";
const Ut = ({ size: e, className: t }) => /* @__PURE__ */ l(
  "svg",
  {
    className: t,
    fill: "currentColor",
    width: e,
    height: e,
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ l("path", { d: "M2 3v2h20V3H2zm5 4v14h2V7H7zm4 0v10h2V7h-2zm4 0v14h2V7h-2z" })
  }
);
Ut.displayName = "AlignTopIcon";
const Xt = ({ size: e, className: t }) => /* @__PURE__ */ l(
  "svg",
  {
    className: t,
    fill: "currentColor",
    width: e,
    height: e,
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ l("path", { d: "M7 5v14h2V5H7zm4 2v10h2V7h-2zm4-2v14h2V5h-2zM2 11v2h20v-2H2z" })
  }
);
Xt.displayName = "AlignMiddleIcon";
const Yt = ({ size: e, className: t }) => /* @__PURE__ */ l(
  "svg",
  {
    className: t,
    fill: "currentColor",
    width: e,
    height: e,
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ l("path", { d: "M7 3v14h2V3H7zm4 4v10h2V7h-2zm4-4v14h2V3h-2zM2 19v2h20v-2H2z" })
  }
);
Yt.displayName = "AlignBottomIcon";
const Ft = ({ size: e, className: t }) => /* @__PURE__ */ l(
  "svg",
  {
    className: t,
    fill: "currentColor",
    width: e,
    height: e,
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ l("path", { d: "M4 6v12h3V6H4zm6.5 2v8h3V8h-3zM17 6v12h3V6h-3zM2 3v18h2V3H2zm18 0v18h2V3h-2z" })
  }
);
Ft.displayName = "DistributeHorizontalIcon";
const jt = ({ size: e, className: t }) => /* @__PURE__ */ l(
  "svg",
  {
    className: t,
    fill: "currentColor",
    width: e,
    height: e,
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ l("path", { d: "M6 4h12v3H6V4zm2 6.5h8v3H8v-3zM6 17h12v3H6v-3zM3 2h18v2H3V2zm0 18h18v2H3v-2z" })
  }
);
jt.displayName = "DistributeVerticalIcon";
const Ys = "xtnnddtralncon", Fs = "xtnnddtralnlbl", js = "xtnnddtralnGrid", Ws = "xtnnddtralnbtn", Oe = {
  alignmentControls: Ys,
  alignmentLabel: Fs,
  alignmentGrid: js,
  alignmentButton: Ws
}, Wt = d.memo(({ value: e, onChange: t, style: n, type: o = "text", placeholder: r, id: s, name: i, "aria-label": a }) => /* @__PURE__ */ l(
  Ne,
  {
    type: o,
    value: e,
    onChange: (c) => t(c.target.value),
    style: n,
    placeholder: r,
    id: s,
    name: i,
    "aria-label": a
  }
));
Wt.displayName = "InspectorInput";
const Kt = d.memo(({ value: e, onChange: t, style: n, id: o, name: r, "aria-label": s }) => /* @__PURE__ */ l("textarea", { value: e, onChange: (i) => t(i.target.value), style: n, id: o, name: r, "aria-label": s }));
Kt.displayName = "InspectorTextarea";
const Ee = d.memo(({ value: e, onChange: t, label: n, id: o, name: r, "aria-label": s }) => /* @__PURE__ */ I("div", { style: {
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
    Ne,
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
      name: r,
      "aria-label": s
    }
  )
] }));
Ee.displayName = "InspectorNumberInput";
const Fe = d.memo(({ checked: e, onChange: t, label: n, id: o, name: r }) => /* @__PURE__ */ I("label", { htmlFor: o, style: { display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }, children: [
  /* @__PURE__ */ l("input", { type: "checkbox", checked: e, onChange: (s) => t(s.target.checked), id: o, name: r }),
  /* @__PURE__ */ l("span", { style: { fontSize: "13px" }, children: n })
] }));
Fe.displayName = "InspectorCheckbox";
const Zt = d.memo(({ selectedNodes: e, onAlign: t }) => {
  const n = e.length < 2, o = [
    { type: "align-left", icon: Ht, title: "Align Left" },
    { type: "align-center-horizontal", icon: Bt, title: "Align Center Horizontal" },
    { type: "align-right", icon: Gt, title: "Align Right" },
    { type: "align-top", icon: Ut, title: "Align Top" },
    { type: "align-center-vertical", icon: Xt, title: "Align Center Vertical" },
    { type: "align-bottom", icon: Yt, title: "Align Bottom" },
    { type: "distribute-horizontal", icon: Ft, title: "Distribute Horizontally" },
    { type: "distribute-vertical", icon: jt, title: "Distribute Vertically" }
  ];
  return /* @__PURE__ */ I("div", { className: Oe.alignmentControls, children: [
    /* @__PURE__ */ I(ge, { className: Oe.alignmentLabel, children: [
      "Alignment ",
      e.length > 1 ? `(${e.length} nodes)` : "(select 2+ nodes)",
      ":"
    ] }),
    /* @__PURE__ */ l("div", { className: Oe.alignmentGrid, children: o.map((r) => {
      const s = r.icon;
      return /* @__PURE__ */ l(
        ze,
        {
          onClick: () => !n && t(r.type),
          className: Oe.alignmentButton,
          title: n ? "Select 2 or more nodes to enable alignment" : r.title,
          disabled: n,
          children: /* @__PURE__ */ l(s, { size: 14 })
        },
        r.type
      );
    }) })
  ] });
});
Zt.displayName = "AlignmentControls";
const qt = d.memo(
  ({ node: e, onUpdateNode: t, onDeleteNode: n, selectedNodes: o = [], onAlignNodes: r }) => {
    var b, P;
    const s = d.useMemo(
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
      (w) => {
        t({
          data: { ...e.data, title: w }
        });
      },
      [e.data, t]
    ), c = d.useCallback(
      (w) => {
        t({
          data: { ...e.data, content: w }
        });
      },
      [e.data, t]
    ), u = d.useCallback(
      (w) => {
        t({
          position: { ...e.position, x: w }
        });
      },
      [e.position, t]
    ), p = d.useCallback(
      (w) => {
        t({
          position: { ...e.position, y: w }
        });
      },
      [e.position, t]
    ), h = d.useCallback(
      (w) => {
        var E;
        t({
          size: { ...e.size, width: w, height: ((E = e.size) == null ? void 0 : E.height) ?? 0 }
        });
      },
      [e.size, t]
    ), v = d.useCallback(
      (w) => {
        var E;
        t({
          size: { ...e.size, height: w, width: ((E = e.size) == null ? void 0 : E.width) ?? 0 }
        });
      },
      [e.size, t]
    ), y = d.useCallback(
      (w) => {
        t({ locked: w });
      },
      [t]
    ), x = d.useCallback(
      (w) => {
        t({ visible: w });
      },
      [t]
    ), g = d.useCallback(
      (w) => {
        !r || o.length < 2 || r(w, o);
      },
      [r, o]
    ), f = d.useMemo(
      () => ({
        ...s,
        minHeight: "60px",
        resize: "vertical"
      }),
      [s]
    );
    return d.useMemo(
      () => ({
        ...s,
        width: "50%"
      }),
      [s]
    ), /* @__PURE__ */ I("div", { style: { display: "flex", flexDirection: "column", gap: "12px" }, children: [
      /* @__PURE__ */ l("h4", { style: { margin: 0, fontSize: "14px" }, children: "Node Properties" }),
      /* @__PURE__ */ I("div", { children: [
        /* @__PURE__ */ l(ge, { htmlFor: `node-${e.id}-title`, style: i, children: "Title:" }),
        /* @__PURE__ */ l(
          Wt,
          {
            id: `node-${e.id}-title`,
            name: "nodeTitle",
            value: e.data.title || "",
            onChange: a,
            style: s
          }
        )
      ] }),
      e.data.content !== void 0 && /* @__PURE__ */ I("div", { children: [
        /* @__PURE__ */ l(ge, { htmlFor: `node-${e.id}-content`, style: i, children: "Content:" }),
        /* @__PURE__ */ l(
          Kt,
          {
            id: `node-${e.id}-content`,
            name: "nodeContent",
            value: String(e.data.content) || "",
            onChange: c,
            style: f
          }
        )
      ] }),
      /* @__PURE__ */ l(Zt, { selectedNodes: o, onAlign: g }),
      /* @__PURE__ */ I("div", { children: [
        /* @__PURE__ */ l(ge, { style: i, children: "Position & Size:" }),
        /* @__PURE__ */ I("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px" }, children: [
          /* @__PURE__ */ l(
            Ee,
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
            Ee,
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
            Ee,
            {
              label: "W",
              value: ((b = e.size) == null ? void 0 : b.width) || 100,
              onChange: h,
              id: `node-${e.id}-width`,
              name: "nodeWidth",
              "aria-label": "Width"
            }
          ),
          /* @__PURE__ */ l(
            Ee,
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
      /* @__PURE__ */ I("div", { children: [
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
      e.type === "group" && /* @__PURE__ */ I("div", { style: { display: "flex", flexDirection: "column", gap: "12px" }, children: [
        /* @__PURE__ */ l(Fe, { checked: e.locked || !1, onChange: y, label: "Lock Layer" }),
        /* @__PURE__ */ l(Fe, { checked: e.visible !== !1, onChange: x, label: "Visible" })
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
qt.displayName = "DefaultInspectorRenderer";
function Jt(e) {
  var o, r;
  const t = ((o = e.size) == null ? void 0 : o.width) || 100, n = ((r = e.size) == null ? void 0 : r.height) || 100;
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
function Ks(e) {
  if (e.length === 0) return null;
  const t = e.map(Jt), n = Math.min(...t.map((i) => i.left)), o = Math.min(...t.map((i) => i.top)), r = Math.max(...t.map((i) => i.right)), s = Math.max(...t.map((i) => i.bottom));
  return {
    left: n,
    top: o,
    right: r,
    bottom: s,
    width: r - n,
    height: s - o,
    centerX: n + (r - n) / 2,
    centerY: o + (s - o) / 2
  };
}
function Qt(e, t) {
  if (e.length < 2) return {};
  const n = {}, o = e.map((s) => ({ node: s, bounds: Jt(s) })), r = Ks(e);
  if (!r) return {};
  switch (t) {
    case "align-left": {
      const s = Math.min(...o.map((i) => i.bounds.left));
      o.forEach(({ node: i }) => {
        n[i.id] = { x: s, y: i.position.y };
      });
      break;
    }
    case "align-center-horizontal": {
      o.forEach(({ node: s, bounds: i }) => {
        const a = r.centerX - i.width / 2;
        n[s.id] = { x: a, y: s.position.y };
      });
      break;
    }
    case "align-right": {
      const s = Math.max(...o.map((i) => i.bounds.right));
      o.forEach(({ node: i, bounds: a }) => {
        const c = s - a.width;
        n[i.id] = { x: c, y: i.position.y };
      });
      break;
    }
    case "align-top": {
      const s = Math.min(...o.map((i) => i.bounds.top));
      o.forEach(({ node: i }) => {
        n[i.id] = { x: i.position.x, y: s };
      });
      break;
    }
    case "align-center-vertical": {
      o.forEach(({ node: s, bounds: i }) => {
        const a = r.centerY - i.height / 2;
        n[s.id] = { x: s.position.x, y: a };
      });
      break;
    }
    case "align-bottom": {
      const s = Math.max(...o.map((i) => i.bounds.bottom));
      o.forEach(({ node: i, bounds: a }) => {
        const c = s - a.height;
        n[i.id] = { x: i.position.x, y: c };
      });
      break;
    }
    case "distribute-horizontal": {
      if (e.length < 3) break;
      const s = o.sort((p, h) => p.bounds.left - h.bounds.left), i = s[0], u = (s[s.length - 1].bounds.left - i.bounds.left) / (s.length - 1);
      s.forEach(({ node: p }, h) => {
        if (h === 0 || h === s.length - 1)
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
      const s = o.sort((p, h) => p.bounds.top - h.bounds.top), i = s[0], u = (s[s.length - 1].bounds.top - i.bounds.top) / (s.length - 1);
      s.forEach(({ node: p }, h) => {
        if (h === 0 || h === s.length - 1)
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
const en = d.memo(
  ({ node: e }) => {
    const { state: t, dispatch: n, actions: o } = j(), { state: r } = Z(), s = Je(e.type), i = wt(e.id), a = $t(e, i), c = d.useCallback(
      (x) => {
        n(o.updateNode(e.id, x));
      },
      [e.id, n, o]
    ), u = d.useCallback(
      async (x) => {
        a.update && await a.update(x);
      },
      [a.update]
    ), p = d.useCallback(() => {
      n(o.deleteNode(e.id));
    }, [e.id, n, o]), h = r.selectedNodeIds.map((x) => t.nodes[x]).filter(Boolean), v = d.useCallback(
      (x, g) => {
        const f = Qt(g, x);
        Object.keys(f).length > 0 && n(o.moveNodes(f));
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
    return /* @__PURE__ */ I(de, { children: [
      (s == null ? void 0 : s.renderInspector) && /* @__PURE__ */ l("div", { style: { marginBottom: "16px" }, children: s.renderInspector(y) }),
      /* @__PURE__ */ l(qt, { ...y })
    ] });
  },
  (e, t) => e.node.id === t.node.id && e.node.type === t.node.type && e.node.data === t.node.data && e.node.position === t.node.position && e.node.locked === t.node.locked && e.node.visible === t.node.visible
);
en.displayName = "NodeInspector";
const tn = (e, t) => {
  const n = t.find((o) => o.type === e);
  return n != null && n.icon ? n.icon : Zs(e);
}, Zs = (e) => {
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
}, qs = "xtnnddtrnodtrelis", Js = "xtnnddtrhdr", Qs = "xtnnddtrtitle", ei = "xtnnddtrnodcouU5z", ti = "xtnnddtrtreecnt", ni = "xtnnddtrempState", oi = "xtnnddtrtreeitm", ri = "xtnnddtrseligQ", si = "xtnnddtrnodeNamegua", ii = "xtnnddtrnodeicovQJ", ai = "xtnnddtrexpbtn", ci = "xtnnddtrvis", di = "xtnnddtrdel", li = "xtnnddtrdrgvgz", ui = "xtnnddtrdraoveins", pi = "xtnnddtrdropind", hi = "xtnnddtrdropul", Q = {
  nodeTreeList: qs,
  header: Js,
  title: Qs,
  nodeCount: ei,
  treeContainer: ti,
  emptyState: ni,
  treeItem: oi,
  selected: ri,
  nodeName: si,
  nodeIcon: ii,
  expandButton: ai,
  visibilityButton: ci,
  deleteButton: di,
  dragging: li,
  dragOverInside: ui,
  dropIndicator: pi,
  dropIndicatorPulse: hi
}, gi = ({
  node: e,
  level: t,
  isSelected: n,
  onSelect: o,
  onToggleVisibility: r,
  onToggleExpand: s,
  onDeleteNode: i,
  childNodes: a,
  dragState: c,
  onNodeDrop: u,
  onDragStateChange: p
}) => {
  var $;
  const h = Qe(), v = e.type === "group" && a.length > 0, y = e.type === "group" && e.expanded !== !1, x = e.type === "group", g = c.draggingNodeId === e.id, f = c.dragOverNodeId === e.id, b = f ? c.dragOverPosition : null, P = (S) => {
    S.stopPropagation(), o(e.id, S.ctrlKey || S.metaKey);
  }, w = (S) => {
    S.stopPropagation(), s && v && s(e.id);
  }, E = (S) => {
    S.stopPropagation(), r && r(e.id);
  }, T = (S) => {
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
    const k = S.currentTarget.getBoundingClientRect(), O = S.clientY - k.top, z = k.height;
    let _;
    x && O > z * 0.25 && O < z * 0.75 ? _ = "inside" : O < z / 2 ? _ = "before" : _ = "after", (c.dragOverNodeId !== e.id || c.dragOverPosition !== _) && p({
      dragOverNodeId: e.id,
      dragOverPosition: _
    });
  }, D = (S) => {
    S.currentTarget === S.target && p({
      dragOverNodeId: null,
      dragOverPosition: null
    });
  }, R = (S) => {
    S.preventDefault(), S.stopPropagation();
    const k = S.dataTransfer.getData("nodeId");
    k && c.dragOverPosition && u(k, e.id, c.dragOverPosition), p({
      draggingNodeId: null,
      dragOverNodeId: null,
      dragOverPosition: null
    });
  };
  return /* @__PURE__ */ I(de, { children: [
    f && b === "before" && /* @__PURE__ */ l("div", { className: Q.dropIndicator, style: { marginLeft: `${t * 16 + 8}px` } }),
    /* @__PURE__ */ I(
      "div",
      {
        className: `${Q.treeItem} ${n ? Q.selected : ""} ${g ? Q.dragging : ""} ${f && b === "inside" ? Q.dragOverInside : ""}`,
        style: { paddingLeft: `${t * 16 + 8}px` },
        onClick: P,
        draggable: !0,
        onDragStart: m,
        onDragEnd: N,
        onDragOver: C,
        onDragLeave: D,
        onDrop: R,
        children: [
          v && /* @__PURE__ */ l(
            "button",
            {
              className: Q.expandButton,
              onClick: w,
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
          /* @__PURE__ */ l("span", { className: Q.nodeIcon, children: tn(e.type, h) }),
          /* @__PURE__ */ l("span", { className: Q.nodeName, children: (($ = e.data) == null ? void 0 : $.title) || e.type }),
          /* @__PURE__ */ l(
            "button",
            {
              className: Q.visibilityButton,
              onClick: E,
              "aria-label": e.visible !== !1 ? "Hide" : "Show",
              children: /* @__PURE__ */ l("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", children: e.visible !== !1 ? /* @__PURE__ */ l("path", { d: "M8 3C4.5 3 1.73 5.11 1 8c.73 2.89 3.5 5 7 5s6.27-2.11 7-5c-.73-2.89-3.5-5-7-5zm0 8.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm0-5.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" }) : /* @__PURE__ */ I(de, { children: [
                /* @__PURE__ */ l("path", { d: "M8 3C4.5 3 1.73 5.11 1 8c.73 2.89 3.5 5 7 5s6.27-2.11 7-5c-.73-2.89-3.5-5-7-5zm0 8.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm0-5.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z", opacity: "0.3" }),
                /* @__PURE__ */ l("path", { d: "M2 2l12 12", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
              ] }) })
            }
          ),
          /* @__PURE__ */ l(
            "button",
            {
              className: Q.deleteButton,
              onClick: T,
              "aria-label": "Delete node",
              children: /* @__PURE__ */ l(Sn, { size: 12 })
            }
          )
        ]
      }
    ),
    v && y && a.map((S) => /* @__PURE__ */ l(
      nn,
      {
        nodeId: S.id,
        level: t + 1,
        dragState: c,
        onNodeDrop: u,
        onDragStateChange: p
      },
      S.id
    )),
    f && b === "after" && /* @__PURE__ */ l("div", { className: Q.dropIndicator, style: { marginLeft: `${t * 16 + 8}px` } })
  ] });
}, nn = ({
  nodeId: e,
  level: t,
  dragState: n,
  onNodeDrop: o,
  onDragStateChange: r
}) => {
  const { state: s, dispatch: i, actions: a } = j(), { state: c, dispatch: u, actions: p } = Z(), h = s.nodes[e];
  if (!h) return null;
  const v = c.selectedNodeIds.includes(e), y = Object.values(s.nodes).filter((P) => P.parentId === e), x = d.useCallback((P, w) => {
    u(p.selectNode(P, w));
  }, [u, p]), g = d.useCallback((P) => {
    const w = s.nodes[P];
    w && i(a.updateNode(P, { visible: w.visible === !1 }));
  }, [s.nodes, i, a]), f = d.useCallback((P) => {
    const w = s.nodes[P];
    w && w.type === "group" && i(a.updateNode(P, { expanded: !w.expanded }));
  }, [s.nodes, i, a]), b = d.useCallback((P) => {
    i(a.deleteNode(P));
  }, [i, a]);
  return /* @__PURE__ */ l(
    gi,
    {
      node: h,
      level: t,
      isSelected: v,
      onSelect: x,
      onToggleVisibility: g,
      onToggleExpand: f,
      onDeleteNode: b,
      childNodes: y,
      dragState: n,
      onNodeDrop: o,
      onDragStateChange: r
    }
  );
}, fi = ({ className: e }) => {
  const { state: t, dispatch: n, actions: o } = j(), { dispatch: r, actions: s } = Z(), [i, a] = d.useState({
    draggingNodeId: null,
    dragOverNodeId: null,
    dragOverPosition: null
  }), c = d.useMemo(() => Object.values(t.nodes).filter((y) => !y.parentId), [t.nodes]), u = d.useMemo(() => [...c].sort((y, x) => {
    var b, P;
    if (y.type === "group" && x.type !== "group") return -1;
    if (y.type !== "group" && x.type === "group") return 1;
    const g = ((b = y.data) == null ? void 0 : b.title) || y.type, f = ((P = x.data) == null ? void 0 : P.title) || x.type;
    return g.localeCompare(f);
  }), [c]), p = d.useCallback(() => {
    r(s.clearSelection());
  }, [r, s]), h = d.useCallback((y) => {
    a((x) => ({ ...x, ...y }));
  }, []), v = d.useCallback((y, x, g) => {
    const f = t.nodes[y], b = t.nodes[x];
    if (!f || !b) return;
    const P = (w, E) => {
      const T = t.nodes[w];
      return T ? T.parentId === E ? !0 : T.parentId ? P(T.parentId, E) : !1 : !1;
    };
    if (!(y === x || P(x, y)))
      if (g === "inside" && b.type === "group")
        n(o.updateNode(y, { parentId: x })), b.expanded || n(o.updateNode(x, { expanded: !0 }));
      else {
        const w = b.parentId || void 0;
        n(o.updateNode(y, { parentId: w }));
      }
  }, [t.nodes, n, o]);
  return /* @__PURE__ */ I("div", { className: `${Q.nodeTreeList} ${e || ""}`, children: [
    /* @__PURE__ */ I("div", { className: Q.header, children: [
      /* @__PURE__ */ l("h3", { className: Q.title, children: "Layers" }),
      /* @__PURE__ */ I("div", { className: Q.nodeCount, children: [
        Object.keys(t.nodes).length,
        " nodes"
      ] })
    ] }),
    /* @__PURE__ */ l("div", { className: Q.treeContainer, onClick: p, children: u.length === 0 ? /* @__PURE__ */ l("div", { className: Q.emptyState, children: "No nodes yet" }) : u.map((y) => /* @__PURE__ */ l(
      nn,
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
}, on = ({ className: e }) => {
  var y, x;
  const { state: t, actions: n, dispatch: o } = j(), { state: r } = Z(), { state: s, dispatch: i, actions: a } = se(), [c, u] = d.useState(0), p = ["Layers", "Properties"], h = r.selectedNodeIds.length > 0 ? t.nodes[r.selectedNodeIds[0]] : null;
  r.selectedNodeIds.map((g) => t.nodes[g]).filter(Boolean);
  const v = r.selectedConnectionIds.length > 0 ? t.connections[r.selectedConnectionIds[0]] : null;
  return d.useCallback(
    (g, f) => {
      const b = Qt(f, g);
      Object.keys(b).length > 0 && o(n.moveNodes(b));
    },
    [o, n]
  ), /* @__PURE__ */ I("div", { className: W(M.inspectorPanel, e), children: [
    /* @__PURE__ */ l("div", { className: M.inspectorHeader, children: /* @__PURE__ */ l(nt.Body, { children: /* @__PURE__ */ l(nt.SegmentedControl, { items: p, defaultSelected: c, onSelect: u }) }) }),
    /* @__PURE__ */ l("div", { className: W(M.inspectorContent, c === 0 && M.inspectorContentNoPadding), children: c === 0 ? /* @__PURE__ */ l(fi, {}) : /* @__PURE__ */ I(de, { children: [
      h && /* @__PURE__ */ l("div", { className: M.inspectorSection, children: /* @__PURE__ */ l(en, { node: h }) }),
      v && /* @__PURE__ */ I("div", { className: M.inspectorSection, children: [
        /* @__PURE__ */ l(Be, { children: "Connection Properties" }),
        /* @__PURE__ */ I("div", { className: M.inspectorField, children: [
          /* @__PURE__ */ l("label", { children: "From:" }),
          /* @__PURE__ */ I("span", { className: M.inspectorReadOnlyField, children: [
            ((y = t.nodes[v.fromNodeId]) == null ? void 0 : y.data.title) || v.fromNodeId,
            ".",
            v.fromPortId
          ] })
        ] }),
        /* @__PURE__ */ I("div", { className: M.inspectorField, children: [
          /* @__PURE__ */ l("label", { children: "To:" }),
          /* @__PURE__ */ I("span", { className: M.inspectorReadOnlyField, children: [
            ((x = t.nodes[v.toNodeId]) == null ? void 0 : x.data.title) || v.toNodeId,
            ".",
            v.toPortId
          ] })
        ] })
      ] }),
      !h && !v && /* @__PURE__ */ l("div", { className: M.inspectorEmptyState, children: /* @__PURE__ */ l("p", { children: "Select a node or connection to view its properties" }) }),
      r.selectedNodeIds.length > 1 && /* @__PURE__ */ I("div", { className: M.inspectorSection, children: [
        /* @__PURE__ */ l(Be, { children: "Multiple Selection" }),
        /* @__PURE__ */ I("p", { children: [
          r.selectedNodeIds.length,
          " nodes selected"
        ] })
      ] }),
      /* @__PURE__ */ I("div", { className: M.inspectorSection, children: [
        /* @__PURE__ */ l(Be, { children: "Grid Settings" }),
        /* @__PURE__ */ l("div", { className: M.inspectorField, children: /* @__PURE__ */ I(ge, { children: [
          /* @__PURE__ */ l(
            Ne,
            {
              id: "grid-show",
              name: "showGrid",
              type: "checkbox",
              checked: s.gridSettings.showGrid,
              onChange: (g) => {
                i(
                  a.updateGridSettings({
                    showGrid: g.target.checked
                  })
                );
              }
            }
          ),
          "Show Grid"
        ] }) }),
        /* @__PURE__ */ l("div", { className: M.inspectorField, children: /* @__PURE__ */ I(ge, { children: [
          /* @__PURE__ */ l(
            Ne,
            {
              id: "grid-snap",
              name: "snapToGrid",
              type: "checkbox",
              checked: s.gridSettings.snapToGrid,
              onChange: (g) => {
                i(
                  a.updateGridSettings({
                    snapToGrid: g.target.checked
                  })
                );
              }
            }
          ),
          "Snap to Grid"
        ] }) }),
        /* @__PURE__ */ l("div", { className: M.inspectorField, children: /* @__PURE__ */ I(ge, { htmlFor: "grid-size", children: [
          "Grid Size:",
          /* @__PURE__ */ l(
            Ne,
            {
              id: "grid-size",
              name: "gridSize",
              type: "number",
              className: M.inspectorInput,
              value: s.gridSettings.size,
              min: 10,
              max: 100,
              step: 5,
              onChange: (g) => {
                const f = parseInt(g.target.value, 10);
                !isNaN(f) && f > 0 && i(
                  a.updateGridSettings({
                    size: f
                  })
                );
              },
              "aria-label": "Grid size in pixels"
            }
          )
        ] }) }),
        /* @__PURE__ */ l("div", { className: M.inspectorField, children: /* @__PURE__ */ I(ge, { htmlFor: "snap-threshold", children: [
          "Snap Threshold:",
          /* @__PURE__ */ l(
            Ne,
            {
              id: "snap-threshold",
              name: "snapThreshold",
              type: "number",
              className: M.inspectorInput,
              value: s.gridSettings.snapThreshold,
              min: 1,
              max: 20,
              step: 1,
              onChange: (g) => {
                const f = parseInt(g.target.value, 10);
                !isNaN(f) && f > 0 && i(
                  a.updateGridSettings({
                    snapThreshold: f
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
on.displayName = "InspectorPanel";
const mi = "xtnnddtrhzdiv", yi = "xtnnddtrdrgBS7", ut = {
  horizontalDivider: mi,
  dragging: yi
}, pt = ({
  onResize: e,
  className: t
}) => {
  const [n, o] = d.useState(!1), r = d.useRef(0), s = d.useCallback((c) => {
    c.preventDefault(), o(!0), r.current = c.clientX, c.currentTarget.setPointerCapture(c.pointerId);
  }, []), i = d.useCallback((c) => {
    if (!n) return;
    const u = c.clientX - r.current;
    r.current = c.clientX, e(u);
  }, [n, e]), a = d.useCallback((c) => {
    o(!1), c.currentTarget.releasePointerCapture(c.pointerId);
  }, []);
  return /* @__PURE__ */ l(
    "div",
    {
      className: `${ut.horizontalDivider} ${t || ""} ${n ? ut.dragging : ""}`,
      onPointerDown: s,
      onPointerMove: i,
      onPointerUp: a
    }
  );
}, vi = "xtnnddtrcollyt", xi = "xtnnddtrrightsbr", bi = "xtnnddtrleftsbr", Ni = "xtnnddtrmainctn", Ci = "xtnnddtrleftrsz", Si = "xtnnddtrrightrsz", xe = {
  columnLayout: vi,
  rightSidebar: xi,
  leftSidebar: bi,
  mainContent: Ni,
  leftResizer: Ci,
  rightResizer: Si
}, wi = ({
  className: e,
  children: t,
  leftSidebar: n,
  rightSidebar: o,
  leftSidebarInitialWidth: r = 280,
  rightSidebarInitialWidth: s = 280,
  leftSidebarMinWidth: i = 200,
  rightSidebarMinWidth: a = 200,
  leftSidebarMaxWidth: c = 600,
  rightSidebarMaxWidth: u = 600,
  onLeftSidebarWidthChange: p,
  onRightSidebarWidthChange: h
}) => {
  const [v, y] = d.useState(r), [x, g] = d.useState(s), f = d.useCallback((P) => {
    y((w) => {
      const E = Math.max(
        i,
        Math.min(c, w + P)
      );
      return p == null || p(E), E;
    });
  }, [i, c, p]), b = d.useCallback((P) => {
    g((w) => {
      const E = Math.max(
        a,
        Math.min(u, w - P)
        // Subtract delta for right sidebar
      );
      return h == null || h(E), E;
    });
  }, [a, u, h]);
  return d.useEffect(() => {
    y(r);
  }, [r]), d.useEffect(() => {
    g(s);
  }, [s]), /* @__PURE__ */ I("div", { className: `${xe.columnLayout} ${e || ""}`, children: [
    n && /* @__PURE__ */ I(de, { children: [
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
          onResize: f,
          className: xe.leftResizer
        }
      )
    ] }),
    /* @__PURE__ */ l("div", { className: xe.mainContent, children: t }),
    o && /* @__PURE__ */ I(de, { children: [
      /* @__PURE__ */ l(
        pt,
        {
          onResize: b,
          className: xe.rightResizer
        }
      ),
      /* @__PURE__ */ l(
        "div",
        {
          className: xe.rightSidebar,
          style: { width: x },
          children: o
        }
      )
    ] })
  ] });
}, Ei = "xtnnddtrselboxiVu", Ii = {
  selectionBoxOverlay: Ei
}, rn = ({ className: e }) => {
  const { state: t } = Z();
  if (!t.selectionBox)
    return null;
  const { start: n, end: o } = t.selectionBox, r = Math.min(n.x, o.x), s = Math.min(n.y, o.y), i = Math.abs(o.x - n.x), a = Math.abs(o.y - n.y);
  return /* @__PURE__ */ l(
    "div",
    {
      className: W(Ii.selectionBoxOverlay, e),
      style: {
        left: r,
        top: s,
        width: i,
        height: a
      }
    }
  );
};
rn.displayName = "SelectionBox";
const Di = "xtnnddtrselHd3", Pi = {
  selectionOverlay: Di
}, sn = ({ className: e }) => /* @__PURE__ */ l(
  "div",
  {
    className: W(Pi.selectionOverlay, e),
    children: /* @__PURE__ */ l(rn, {})
  }
);
sn.displayName = "SelectionOverlay";
const an = ({ children: e, className: t, showGrid: n = !0 }) => {
  const { state: o, dispatch: r, actions: s, canvasRef: i, utils: a } = se(), { state: c, dispatch: u, actions: p } = Z(), { state: h } = j(), v = d.useRef(null), [y, x] = d.useState(!1), g = d.useMemo(() => {
    const { offset: m, scale: N } = o.viewport;
    return `translate(${m.x}px, ${m.y}px) scale(${N})`;
  }, [o.viewport]), f = d.useMemo(() => {
    if (!o.gridSettings.showGrid) return null;
    const { size: m } = o.gridSettings, { scale: N, offset: C } = o.viewport, D = m * N, R = C.x % D, $ = C.y % D;
    return /* @__PURE__ */ l("defs", { children: /* @__PURE__ */ l("pattern", { id: "grid", width: D, height: D, patternUnits: "userSpaceOnUse", x: R, y: $, children: /* @__PURE__ */ l("path", { d: `M ${D} 0 L 0 0 0 ${D}`, fill: "none", stroke: " #e0e0e0", strokeWidth: "1", opacity: "0.5" }) }) });
  }, [o.gridSettings, o.viewport]), b = d.useCallback(
    (m) => {
      var C;
      const N = (C = v.current) == null ? void 0 : C.getBoundingClientRect();
      if (N)
        if (m.ctrlKey || m.metaKey) {
          m.preventDefault();
          const D = {
            x: m.clientX - N.left,
            y: m.clientY - N.top
          }, R = m.deltaY * -0.01, $ = o.viewport.scale * (1 + R);
          r(s.zoomViewport($, D));
        } else {
          m.preventDefault();
          const D = -m.deltaX, R = -m.deltaY;
          r(s.panViewport({ x: D, y: R }));
        }
    },
    [o.viewport.scale, r, s]
  ), P = d.useCallback(
    (m) => {
      var D, R;
      if (m.button === 1 || o.isSpacePanning) {
        m.preventDefault(), r(s.startPan({ x: m.clientX, y: m.clientY })), v.current && v.current.setPointerCapture(m.pointerId);
        return;
      }
      const N = m.target, C = (D = N == null ? void 0 : N.closest) == null ? void 0 : D.call(N, '.nodeView, .port, .connectionGroup, button, input, textarea, [role="button"]');
      if (m.button === 0 && !C) {
        const $ = (R = v.current) == null ? void 0 : R.getBoundingClientRect();
        if (!$) return;
        const S = m.clientX - $.left, k = m.clientY - $.top;
        x(!0), u(p.setSelectionBox({
          start: { x: S, y: k },
          end: { x: S, y: k }
        })), !m.shiftKey && !m.ctrlKey && !m.metaKey && u(p.clearSelection()), v.current && v.current.setPointerCapture(m.pointerId);
      }
    },
    [o.isSpacePanning, o.viewport, r, s, u, p]
  ), w = d.useCallback(
    (m) => {
      var N;
      if (o.panState.isPanning)
        r(s.updatePan({ x: m.clientX, y: m.clientY }));
      else if (y && c.selectionBox) {
        const C = (N = v.current) == null ? void 0 : N.getBoundingClientRect();
        if (!C) return;
        const D = m.clientX - C.left, R = m.clientY - C.top;
        u(p.setSelectionBox({
          start: c.selectionBox.start,
          end: { x: D, y: R }
        }));
      }
    },
    [o.panState.isPanning, o.viewport, y, c.selectionBox, r, s, u, p]
  ), E = d.useCallback(
    (m) => {
      var N;
      if (o.panState.isPanning)
        r(s.endPan()), v.current && v.current.releasePointerCapture(m.pointerId);
      else if (y && c.selectionBox) {
        x(!1);
        const { start: C, end: D } = c.selectionBox;
        if (!((N = v.current) == null ? void 0 : N.getBoundingClientRect())) return;
        const $ = (C.x - o.viewport.offset.x) / o.viewport.scale, S = (C.y - o.viewport.offset.y) / o.viewport.scale, k = (D.x - o.viewport.offset.x) / o.viewport.scale, O = (D.y - o.viewport.offset.y) / o.viewport.scale, z = Math.min($, k), _ = Math.max($, k), V = Math.min(S, O), H = Math.max(S, O), X = [];
        if (Object.values(h.nodes).forEach((B) => {
          var ie, me;
          const U = ((ie = B.size) == null ? void 0 : ie.width) || 150, K = ((me = B.size) == null ? void 0 : me.height) || 50;
          B.position.x < _ && B.position.x + U > z && B.position.y < H && B.position.y + K > V && X.push(B.id);
        }), X.length > 0)
          if (m.shiftKey || m.ctrlKey || m.metaKey) {
            const B = [.../* @__PURE__ */ new Set([...c.selectedNodeIds, ...X])];
            u(p.selectAllNodes(B));
          } else
            u(p.selectAllNodes(X));
        u(p.setSelectionBox(null)), v.current && v.current.releasePointerCapture(m.pointerId);
      }
    },
    [o.panState.isPanning, y, c.selectionBox, c.selectedNodeIds, h.nodes, r, s, u, p]
  ), T = d.useCallback((m) => {
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
      if (C.code === "Space" && !C.repeat && !C.ctrlKey && !C.metaKey && (C.preventDefault(), r(s.setSpacePanning(!0))), (C.ctrlKey || C.metaKey) && !C.repeat)
        switch (C.key) {
          case "0":
            C.preventDefault(), r(s.resetViewport());
            break;
          case "1":
            C.preventDefault();
            break;
          case "=":
          case "+":
            C.preventDefault(), r(s.zoomViewport(o.viewport.scale * 1.2));
            break;
          case "-":
            C.preventDefault(), r(s.zoomViewport(o.viewport.scale * 0.8));
            break;
        }
    }, N = (C) => {
      C.code === "Space" && (C.preventDefault(), r(s.setSpacePanning(!1)));
    };
    return window.addEventListener("keydown", m), window.addEventListener("keyup", N), () => {
      window.removeEventListener("keydown", m), window.removeEventListener("keyup", N);
    };
  }, [r, s, o.viewport.scale]), d.useEffect(() => {
    const m = v.current;
    if (m)
      return m.addEventListener("wheel", b, { passive: !1 }), () => m.removeEventListener("wheel", b);
  }, [b]), /* @__PURE__ */ I(
    "div",
    {
      ref: v,
      className: W(
        M.canvasContainer,
        o.panState.isPanning && M.panning,
        o.isSpacePanning && M.spacePanning,
        y && M.boxSelecting,
        t
      ),
      onPointerDown: P,
      onPointerMove: w,
      onPointerUp: E,
      onContextMenu: T,
      role: "application",
      "aria-label": "Node Editor Canvas",
      children: [
        o.gridSettings.showGrid && /* @__PURE__ */ I("svg", { className: M.gridSvg, children: [
          f,
          /* @__PURE__ */ l("rect", { width: "100%", height: "100%", fill: "url(#grid)" })
        ] }),
        /* @__PURE__ */ l("div", { ref: i, className: M.canvas, style: { transform: g }, children: e }),
        /* @__PURE__ */ l(sn, {})
      ]
    }
  );
};
an.displayName = "CanvasBase";
const Ue = Ae.visualSize / 2, ki = {
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
  const { size: n, snapThreshold: o } = t, r = Math.round(e.x / n) * n, s = Math.round(e.y / n) * n, i = Math.abs(e.x - r), a = Math.abs(e.y - s);
  return {
    x: i <= o ? r : e.x,
    y: a <= o ? s : e.y
  };
}
function Ti(e, t, n) {
  if (!t.snapToGrid)
    return e;
  const o = e[n];
  if (!o) {
    const c = {};
    return Object.entries(e).forEach(([u, p]) => {
      c[u] = ht(p, t);
    }), c;
  }
  const r = ht(o, t), s = r.x - o.x, i = r.y - o.y, a = {};
  return Object.entries(e).forEach(([c, u]) => {
    a[c] = {
      x: u.x + s,
      y: u.y + i
    };
  }), a;
}
const Oi = "xtnnddtrportH4B", Mi = "xtnnddtrportinpJGc", zi = "xtnnddtrporout68f", Ri = "xtnnddtrportLeft2Oc", Ai = "xtnnddtrporrigHwV", Li = "xtnnddtrportTopuYu", Vi = "xtnnddtrporbotx0m", _i = "xtnnddtrporinnCiS", $i = "xtnnddtrporhovI-R", Hi = "xtnnddtrporconf0-", Bi = "xtnnddtrpulsexKp", Gi = "xtnnddtrporcontda", Ui = "xtnnddtrporcan", Xi = "xtnnddtrporcone8f", Yi = "xtnnddtrportlblMh9", Fi = "xtnnddtrporlefTQ3", ji = "xtnnddtrporrigj3t", Wi = "xtnnddtrportop2o0", Ki = "xtnnddtrporbot6kJ", ce = {
  port: Oi,
  portInput: Mi,
  portOutput: zi,
  portLeft: Ri,
  portRight: Ai,
  portTop: Li,
  portBottom: Vi,
  portInner: _i,
  portHovered: $i,
  portConnecting: Hi,
  pulse: Bi,
  portConnectable: Gi,
  portCandidate: Ui,
  portConnected: Xi,
  portLabel: Yi,
  portLabelLeft: Fi,
  portLabelRight: ji,
  portLabelTop: Wi,
  portLabelBottom: Ki
}, cn = ({
  port: e,
  onPointerDown: t,
  onPointerUp: n,
  onPointerEnter: o,
  onPointerLeave: r,
  isConnecting: s = !1,
  isConnectable: i = !1,
  isCandidate: a = !1,
  isHovered: c = !1,
  isConnected: u = !1
}) => {
  const p = Rt(e.nodeId, e.id), h = () => {
    if (!p)
      return {
        left: 0,
        top: 0,
        position: "absolute"
      };
    const { renderPosition: f } = p;
    return {
      left: f.x,
      top: f.y,
      transform: f.transform,
      position: "absolute"
    };
  }, v = (f) => {
    f.stopPropagation(), t == null || t(f, e);
  }, y = (f) => {
    f.stopPropagation(), n == null || n(f, e);
  }, x = (f) => {
    o == null || o(f, e);
  }, g = (f) => {
    r == null || r(f, e);
  };
  return /* @__PURE__ */ I(
    "div",
    {
      className: W(
        ce.port,
        ce[`port${e.type.charAt(0).toUpperCase()}${e.type.slice(1)}`],
        ce[`port${e.position.charAt(0).toUpperCase()}${e.position.slice(1)}`],
        s && ce.portConnecting,
        i && ce.portConnectable,
        a && ce.portCandidate,
        c && ce.portHovered,
        u && ce.portConnected
      ),
      style: h(),
      onPointerDown: v,
      onPointerUp: y,
      onPointerEnter: x,
      onPointerLeave: g,
      "data-port-id": e.id,
      "data-port-type": e.type,
      "data-node-id": e.nodeId,
      title: e.label,
      children: [
        /* @__PURE__ */ l("div", { className: ce.portInner }),
        e.label && /* @__PURE__ */ l(
          "span",
          {
            className: W(
              ce.portLabel,
              ce[`portLabel${e.position.charAt(0).toUpperCase()}${e.position.slice(1)}`]
            ),
            children: e.label
          }
        )
      ]
    }
  );
};
cn.displayName = "PortView";
const Zi = "xtnnddtrresMQd", qi = "xtnnddtrresvis", Ji = "xtnnddtrresnOA", Xe = {
  resizeHandle: Zi,
  resizeHandleVisible: qi,
  resizeHandleActive: Ji
}, dn = ({
  position: e,
  onResizeStart: t,
  isResizing: n = !1,
  isVisible: o = !1
}) => {
  const r = d.useCallback((i) => {
    i.stopPropagation(), i.preventDefault(), t(i, e);
  }, [t, e]), s = () => ({
    bottom: -2,
    right: -2,
    cursor: "se-resize",
    width: 10,
    height: 10
  });
  return /* @__PURE__ */ l(
    "div",
    {
      className: W(
        Xe.resizeHandle,
        o && Xe.resizeHandleVisible,
        n && Xe.resizeHandleActive
      ),
      style: {
        position: "absolute",
        zIndex: 10,
        ...s()
      },
      onPointerDown: r,
      "data-resize-handle": e
    }
  );
};
dn.displayName = "ResizeHandle";
const Qi = ({
  node: e,
  isSelected: t,
  isDragging: n,
  dragOffset: o,
  onPointerDown: r,
  onContextMenu: s,
  onPortPointerDown: i,
  onPortPointerUp: a,
  onPortPointerEnter: c,
  onPortPointerLeave: u,
  connectingPort: p,
  hoveredPort: h,
  connectedPorts: v,
  nodeRenderer: y,
  externalData: x,
  onUpdateNode: g
}) => {
  const { dispatch: f, actions: b, getNodePorts: P } = j(), { state: w } = Z(), { isEditing: E, startEditing: T, updateValue: m, confirmEdit: N, cancelEdit: C, state: D } = Bn(), R = Et(), $ = Pt({ autoUpdateMembership: !1 }), S = Je(e.type), k = wt(e.id), O = $t(e, k), z = d.useRef(null), _ = R.isResizing(e.id), V = R.getResizeHandle(e.id), H = e.type === "group" ? $.getGroupChildren(e.id) : [], X = H.length > 0, B = d.useMemo(
    () => ({
      x: e.position.x,
      y: e.position.y
    }),
    [e.position.x, e.position.y]
  );
  d.useLayoutEffect(() => {
    if (!z.current) return;
    let L = B.x, G = B.y;
    if (n && o)
      L += o.x, G += o.y;
    else if (w.dragState) {
      const { affectedChildNodes: Y, offset: J } = w.dragState;
      Object.entries(Y).some(
        ([ye, le]) => le.includes(e.id)
      ) && (L += J.x, G += J.y);
    }
    z.current.style.transform = `translate(${L}px, ${G}px)`;
  }, [B, n, o, w.dragState, e.id]);
  const U = d.useMemo(() => {
    var Y, J;
    const L = {
      width: ((Y = e.size) == null ? void 0 : Y.width) || 150,
      height: ((J = e.size) == null ? void 0 : J.height) || 50
    }, G = R.getCurrentSize(e.id);
    return _ && G ? G : L;
  }, [e.size, _, R, e.id]), K = d.useMemo(() => {
    switch (e.data.visualState) {
      case "info":
        return M.nodeInfo;
      case "success":
        return M.nodeSuccess;
      case "warning":
        return M.nodeWarning;
      case "error":
        return M.nodeError;
      case "disabled":
        return M.nodeDisabled;
      default:
        return null;
    }
  }, [e.data.visualState]), te = d.useCallback(
    (L) => {
      if (L.stopPropagation(), !e.locked) {
        const G = e.data.title || `Node ${e.id.slice(0, 6)}`;
        T(e.id, "title", G);
      }
    },
    [e.id, e.data.title, e.locked, T]
  ), ie = d.useCallback(
    (L) => {
      m(L.target.value);
    },
    [m]
  ), me = d.useCallback(
    (L) => {
      L.key === "Enter" ? (L.preventDefault(), L.stopPropagation(), f(
        b.updateNode(e.id, {
          data: {
            ...e.data,
            title: D.currentValue
          }
        })
      ), N()) : L.key === "Escape" && (L.preventDefault(), L.stopPropagation(), C());
    },
    [D.currentValue, e.id, e.data, f, b, N, C]
  ), Ie = d.useCallback(() => {
    f(
      b.updateNode(e.id, {
        data: {
          ...e.data,
          title: D.currentValue
        }
      })
    ), N();
  }, [D.currentValue, e.id, e.data, f, b, N]), Se = d.useCallback(
    (L) => {
      f(b.updateNode(e.id, L));
    },
    [e.id, f, b]
  ), Ve = d.useCallback(
    (L, G) => {
      var J, oe;
      if (L.stopPropagation(), L.preventDefault(), e.locked) return;
      const Y = {
        width: ((J = e.size) == null ? void 0 : J.width) || 150,
        height: ((oe = e.size) == null ? void 0 : oe.height) || 50
      };
      R.startResize(e.id, G, { x: L.clientX, y: L.clientY }, Y);
    },
    [e.id, e.size, e.locked, R]
  ), _e = (S == null ? void 0 : S.renderNode) && !E(e.id, "title"), $e = d.useMemo(
    () => ({
      node: e,
      isSelected: t,
      isDragging: n,
      isEditing: E(e.id, "title"),
      externalData: O.data,
      isLoadingExternalData: O.isLoading,
      externalDataError: O.error,
      onStartEdit: () => T(e.id, "title", e.data.title || ""),
      onUpdateNode: Se
    }),
    [e, t, n, O, T, Se, E]
  ), He = d.useMemo(() => {
    if (!w.dragState) return !1;
    const { affectedChildNodes: L } = w.dragState;
    return Object.entries(L).some(([G, Y]) => Y.includes(e.id));
  }, [w.dragState, e.id]), q = d.useCallback(
    (L) => {
      if ((S == null ? void 0 : S.interactive) && !t) {
        const J = L.target.closest('[data-drag-handle="true"]');
        r(L, e.id, !!J);
      } else
        r(L, e.id, !0);
    },
    [S == null ? void 0 : S.interactive, e.id, t, r]
  );
  return /* @__PURE__ */ I(
    "div",
    {
      ref: z,
      className: W(
        M.nodeView,
        e.type === "group" && M.groupNode,
        e.type === "group" && X && M.groupHasChildren,
        t && M.selected,
        (n || He) && M.dragging,
        _ && M.resizing,
        e.locked && M.locked,
        K || void 0
      ),
      style: {
        width: U.width,
        height: U.height,
        zIndex: n || _ ? 1e3 : e.type === "group" ? 1 : 2
      },
      onPointerDown: q,
      onContextMenu: (L) => s(L, e.id),
      "data-node-id": e.id,
      children: [
        _e && (S != null && S.renderNode) ? /* @__PURE__ */ l("div", { className: M.customNodeContent, children: S.renderNode($e) }) : /* @__PURE__ */ I(de, { children: [
          /* @__PURE__ */ I(
            "div",
            {
              className: W(
                M.nodeHeader,
                (S == null ? void 0 : S.interactive) && !t && M.interactiveDragHandle
              ),
              "data-drag-handle": S != null && S.interactive ? "true" : "false",
              children: [
                e.locked && /* @__PURE__ */ l("span", { className: M.lockIcon, children: "🔒" }),
                E(e.id, "title") ? /* @__PURE__ */ l(
                  "input",
                  {
                    id: `node-title-${e.id}`,
                    name: "nodeTitle",
                    className: M.nodeTitleInput,
                    type: "text",
                    value: D.currentValue,
                    onChange: ie,
                    onKeyDown: me,
                    onBlur: Ie,
                    autoFocus: !0,
                    onClick: (L) => L.stopPropagation(),
                    "aria-label": "Node title"
                  }
                ) : /* @__PURE__ */ l("span", { className: M.nodeTitle, onDoubleClick: te, children: e.data.title || `Node ${e.id.slice(0, 6)}` })
              ]
            }
          ),
          /* @__PURE__ */ l("div", { className: M.nodeContent, children: e.type === "group" ? /* @__PURE__ */ l(ea, { node: e, childCount: H.length }) : e.data.content || "Empty node" })
        ] }),
        (() => {
          const L = P(e.id);
          return !L || L.length === 0 ? null : (L.reduce((G, Y) => (G[Y.position] || (G[Y.position] = []), G[Y.position].push(Y), G), {}), /* @__PURE__ */ l("div", { className: M.nodePorts, children: L.map((G) => {
            var Y, J, oe;
            return /* @__PURE__ */ l(
              cn,
              {
                port: G,
                onPointerDown: i,
                onPointerUp: a,
                onPointerEnter: c,
                onPointerLeave: u,
                isConnecting: ((Y = w.connectionDragState) == null ? void 0 : Y.fromPort.id) === G.id,
                isConnectable: w.connectablePortIds.has(G.id),
                isCandidate: ((oe = (J = w.connectionDragState) == null ? void 0 : J.candidatePort) == null ? void 0 : oe.id) === G.id,
                isHovered: (h == null ? void 0 : h.id) === G.id,
                isConnected: v == null ? void 0 : v.has(G.id)
              },
              G.id
            );
          }) }));
        })(),
        t && !e.locked && /* @__PURE__ */ l(dn, { position: "se", onResizeStart: Ve, isResizing: V === "se" })
      ]
    }
  );
}, ea = ({ node: e, childCount: t }) => e.expanded ? /* @__PURE__ */ l("div", { className: M.groupExpanded, children: t > 0 ? `Contains ${t} nodes` : "Empty group - Drop nodes here" }) : /* @__PURE__ */ l("div", { className: M.groupCollapsed, children: t > 0 ? `${t} nodes - Click to expand` : "Empty group - Drop nodes here" }), ta = (e, t) => {
  var n, o, r, s, i, a, c, u, p, h, v, y, x, g;
  if (e.node.id !== t.node.id || e.isSelected !== t.isSelected || e.isDragging !== t.isDragging || e.isResizing !== t.isResizing || e.node.position.x !== t.node.position.x || e.node.position.y !== t.node.position.y || ((n = e.node.size) == null ? void 0 : n.width) !== ((o = t.node.size) == null ? void 0 : o.width) || ((r = e.node.size) == null ? void 0 : r.height) !== ((s = t.node.size) == null ? void 0 : s.height) || e.node.locked !== t.node.locked || e.node.data !== t.node.data || ((i = e.dragOffset) == null ? void 0 : i.x) !== ((a = t.dragOffset) == null ? void 0 : a.x) || ((c = e.dragOffset) == null ? void 0 : c.y) !== ((u = t.dragOffset) == null ? void 0 : u.y) || ((p = e.connectingPort) == null ? void 0 : p.id) !== ((h = t.connectingPort) == null ? void 0 : h.id) || ((v = e.hoveredPort) == null ? void 0 : v.id) !== ((y = t.hoveredPort) == null ? void 0 : y.id))
    return !1;
  if (e.node.ports)
    for (const f of e.node.ports) {
      const b = ((x = e.connectedPorts) == null ? void 0 : x.has(f.id)) ?? !1, P = ((g = t.connectedPorts) == null ? void 0 : g.has(f.id)) ?? !1;
      if (b !== P)
        return !1;
    }
  return !0;
}, ln = d.memo(Qi, ta);
ln.displayName = "NodeView";
function na(e, t) {
  return Object.values(t).filter(
    (n) => n.fromPortId === e.id && n.fromNodeId === e.nodeId || n.toPortId === e.id && n.toNodeId === e.nodeId
  );
}
function oa(e, t, n, o, r, s) {
  const i = o[e];
  if (!i || i.locked) return [];
  if (r && !s && !n.includes(e))
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
    if (r && !s)
      return [];
    a = [e];
  }
  return a;
}
function gt(e, t) {
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
function ra(e, t) {
  const n = e.type !== t.type, o = e.nodeId === t.nodeId;
  return n && !o;
}
function sa(e, t, n) {
  const o = {}, r = {};
  return e.forEach((s) => {
    const i = t[s];
    if (i && (o[s] = { ...i.position }, i.type === "group")) {
      const a = n(s);
      r[s] = a.map((c) => c.id), a.forEach((c) => {
        o[c.id] = { ...c.position };
      });
    }
  }), { initialPositions: o, affectedChildNodes: r };
}
function ia(e, t, n) {
  const o = {};
  return e.forEach((r) => {
    const s = t[r];
    s && (o[r] = {
      x: s.x + n.x,
      y: s.y + n.y
    });
  }), o;
}
function aa(e, t, n, o, r) {
  const s = e.filter((a) => {
    const c = t[a];
    return c && c.type === "group";
  });
  if (s.length === 0)
    return n;
  s.forEach((a) => {
    const c = o[a], u = n[a];
    if (c && u) {
      const p = {
        x: u.x - c.x,
        y: u.y - c.y
      };
      r(a, p);
    }
  });
  const i = {};
  return e.forEach((a) => {
    const c = t[a];
    c && c.type !== "group" && n[a] && (i[a] = n[a]);
  }), i;
}
function ca(e, t, n, o) {
  const r = e.fromPortId === t.id && e.fromNodeId === t.nodeId, s = r ? e.toNodeId : e.fromNodeId, i = r ? e.toPortId : e.fromPortId, a = n[s];
  if (!a) return null;
  const u = o(s).find((p) => p.id === i);
  return u ? { otherNode: a, otherPort: u, isFromPort: r } : null;
}
const un = ({ className: e, doubleClickToEdit: t = !0 }) => {
  const { state: n, dispatch: o, actions: r, getNodePorts: s } = j(), { state: i, dispatch: a, actions: c } = Z(), { state: u } = se(), p = qe();
  Et({
    minWidth: 100,
    minHeight: 40,
    snapToGrid: u.gridSettings.snapToGrid,
    gridSize: u.gridSettings.size
  });
  const h = Pt({
    autoUpdateMembership: !0,
    membershipUpdateDelay: 200
  }), v = ao(n.nodes), y = d.useMemo(() => v.sort((m, N) => m.type === "group" && N.type !== "group" ? -1 : m.type !== "group" && N.type === "group" ? 1 : 0), [v]), x = d.useMemo(() => {
    const m = /* @__PURE__ */ new Set();
    return Object.values(n.connections).forEach((N) => {
      m.add(N.fromPortId), m.add(N.toPortId);
    }), m;
  }, [n.connections]);
  d.useEffect(() => {
    a(c.updateConnectedPorts(x));
  }, [x, a, c]);
  const g = d.useCallback(
    (m, N) => {
      m.preventDefault(), m.stopPropagation();
      const C = {
        x: m.clientX,
        y: m.clientY
      };
      a(c.showContextMenu(C, N));
    },
    [a, c]
  ), f = d.useCallback(
    (m, N, C = !0) => {
      if (m.button !== 0) return;
      m.stopPropagation();
      const D = n.nodes[N], R = m.shiftKey || m.metaKey || m.ctrlKey;
      if (D != null && D.locked) {
        a(c.selectNode(N, R));
        return;
      }
      const $ = D ? p.registry.get(D.type) : void 0, S = ($ == null ? void 0 : $.interactive) || !1;
      if (S && !C && !i.selectedNodeIds.includes(N)) {
        a(c.selectNode(N, R));
        return;
      }
      const k = oa(
        N,
        R,
        i.selectedNodeIds,
        n.nodes,
        S,
        C
      );
      if (i.selectedNodeIds.includes(N) || a(c.selectNode(N, R)), k.length === 0) return;
      const O = {
        x: m.clientX,
        y: m.clientY
      }, { initialPositions: z, affectedChildNodes: _ } = sa(
        k,
        n.nodes,
        h.getGroupChildren
      );
      a(c.startNodeDrag(k, O, z, _));
    },
    [a, c, i.selectedNodeIds, n.nodes, h, p]
  ), b = d.useRef(null), P = d.useCallback(
    (m, N) => {
      m.stopPropagation();
      const C = n.nodes[N.nodeId];
      if (!C) return;
      const D = {
        ...C,
        ports: s(N.nodeId)
      }, $ = Le(D).get(N.id), S = ($ == null ? void 0 : $.connectionPoint) || { x: C.position.x, y: C.position.y }, k = na(N, n.connections);
      if (b.current = {
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
        if (!b.current) return;
        const H = V.clientX - b.current.x, X = V.clientY - b.current.y;
        Math.sqrt(H * H + X * X) > ki.DISCONNECT_THRESHOLD && (document.removeEventListener("pointermove", O), document.removeEventListener("pointerup", z), _());
      }, z = () => {
        b.current = null, document.removeEventListener("pointermove", O), document.removeEventListener("pointerup", z);
      }, _ = () => {
        const V = k[0], H = ca(V, N, n.nodes, s);
        if (!H) return;
        const { otherNode: X, otherPort: B, isFromPort: U } = H, K = {
          id: B.id,
          nodeId: X.id,
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
            U ? "from" : "to",
            K,
            S
          )
        ), o(r.deleteConnection(V.id)), b.current = null;
      };
      document.addEventListener("pointermove", O), document.addEventListener("pointerup", z);
    },
    [
      n.connections,
      n.nodes,
      a,
      c,
      o,
      r,
      s
    ]
  ), w = d.useCallback(
    (m, N) => {
      if (m.stopPropagation(), i.connectionDisconnectState) {
        const $ = i.connectionDisconnectState.fixedPort;
        if (ra($, N)) {
          const S = gt($, N);
          S && o(r.addConnection(S));
        }
        a(c.endConnectionDisconnect());
        return;
      }
      if (!i.connectionDragState) return;
      const C = i.connectionDragState.fromPort, D = gt(C, N);
      D && o(r.addConnection(D)), a(c.endConnectionDrag());
    },
    [
      i.connectionDragState,
      i.connectionDisconnectState,
      a,
      c,
      o,
      r
    ]
  ), E = d.useCallback(
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
  ), T = d.useCallback(() => {
    a(c.setHoveredPort(null));
  }, [a, c]);
  return d.useEffect(() => {
    if (!i.dragState) return;
    const m = (C) => {
      if (!i.dragState) return;
      const D = (C.clientX - i.dragState.startPosition.x) / u.viewport.scale, R = (C.clientY - i.dragState.startPosition.y) / u.viewport.scale;
      a(c.updateNodeDrag({ x: D, y: R }));
    }, N = () => {
      if (!i.dragState) return;
      const { nodeIds: C, initialPositions: D, offset: R } = i.dragState, $ = ia(C, D, R), S = u.gridSettings.snapToGrid ? Ti($, u.gridSettings, C[0]) : $, k = aa(
        C,
        n.nodes,
        S,
        D,
        h.moveGroupWithChildren
      );
      Object.keys(k).length > 0 && o(r.moveNodes(k)), a(c.endNodeDrag());
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
    r,
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
  }), /* @__PURE__ */ l("div", { className: W(M.nodeLayer, e), children: y.map((m) => {
    var N, C, D;
    return /* @__PURE__ */ l(
      ln,
      {
        node: m,
        isSelected: i.selectedNodeIds.includes(m.id),
        isDragging: ((N = i.dragState) == null ? void 0 : N.nodeIds.includes(m.id)) ?? !1,
        dragOffset: (C = i.dragState) != null && C.nodeIds.includes(m.id) ? i.dragState.offset : void 0,
        onPointerDown: f,
        onContextMenu: g,
        onPortPointerDown: P,
        onPortPointerUp: w,
        onPortPointerEnter: E,
        onPortPointerLeave: T,
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
        connectedPorts: x
      },
      m.id
    );
  }) });
};
un.displayName = "NodeLayer";
function da(e, t) {
  const n = t.x - e.x, o = t.y - e.y;
  return Math.sqrt(n * n + o * o);
}
function Sd(e, t) {
  const n = t.x - e.x, o = t.y - e.y, r = Math.sqrt(n * n + o * o);
  return { dx: n, dy: o, distance: r };
}
function wd(e, t) {
  return { x: e.x + t.x, y: e.y + t.y };
}
function Ed(e, t) {
  return { x: e.x - t.x, y: e.y - t.y };
}
function Id(e, t) {
  return { x: e.x * t, y: e.y * t };
}
const ft = (e) => ({
  left: "right",
  right: "left",
  top: "bottom",
  bottom: "top"
})[e] || "left", je = (e, t, n, o) => {
  const r = da(e, t);
  let a = Math.max(40, Math.min(120, r * 0.5));
  (n === "right" && o === "left" || n === "left" && o === "right" || n === "top" && o === "bottom" || n === "bottom" && o === "top") && (a = Math.max(a, r * 0.4));
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
}, la = ({
  connection: e,
  fromNode: t,
  toNode: n,
  fromPort: o,
  toPort: r,
  isSelected: s,
  isHovered: i,
  isDragging: a,
  dragProgress: c = 0,
  fromNodePosition: u,
  toNodePosition: p,
  fromNodeSize: h,
  toNodeSize: v,
  onPointerDown: y,
  onPointerEnter: x,
  onPointerLeave: g
}) => {
  const f = Ce(t.id, o.id), b = Ce(n.id, r.id), P = d.useMemo(() => {
    if (!f)
      return { x: t.position.x, y: t.position.y };
    if (u) {
      const D = u.x - t.position.x, R = u.y - t.position.y;
      return {
        x: f.x + D,
        y: f.y + R
      };
    }
    return f;
  }, [f, t.position.x, t.position.y, u == null ? void 0 : u.x, u == null ? void 0 : u.y]), w = d.useMemo(() => {
    if (!b)
      return { x: n.position.x, y: n.position.y };
    if (p) {
      const D = p.x - n.position.x, R = p.y - n.position.y;
      return {
        x: b.x + D,
        y: b.y + R
      };
    }
    return b;
  }, [b, n.position.x, n.position.y, p == null ? void 0 : p.x, p == null ? void 0 : p.y]), E = d.useMemo(
    () => je(P, w, o.position, r.position),
    [P.x, P.y, w.x, w.y, o.position, r.position]
  ), T = d.useMemo(() => a && c > 0 ? c > 0.5 ? "var(--cautionColor, #ff3b30)" : "var(--connectionColor, #999)" : s ? "var(--accentColor, #0066cc)" : i ? "var(--connectionHoverColor, #666)" : "var(--connectionColor, #999)", [a, c, s, i]), m = (D) => {
    D.stopPropagation(), y == null || y(D, e.id);
  }, N = (D) => {
    x == null || x(D, e.id);
  }, C = (D) => {
    g == null || g(D, e.id);
  };
  return /* @__PURE__ */ I(
    "g",
    {
      className: W(
        M.connectionGroup,
        s && M.connectionSelected,
        i && M.connectionHovered,
        a && M.connectionDragging
      ),
      "data-connection-id": e.id,
      children: [
        /* @__PURE__ */ l(
          "path",
          {
            d: E,
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
            d: E,
            fill: "none",
            stroke: T,
            strokeWidth: s || i ? 3 : 2,
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
            children: /* @__PURE__ */ l("path", { d: "M 0 0 L 10 5 L 0 10 z", fill: T, style: { transition: "fill 0.2s" } })
          }
        ) }),
        /* @__PURE__ */ l(
          "path",
          {
            d: E,
            fill: "none",
            stroke: "transparent",
            markerEnd: `url(#arrow-${e.id})`,
            style: { pointerEvents: "none" }
          }
        )
      ]
    }
  );
}, ua = (e, t) => {
  var n, o, r, s, i, a, c, u, p, h, v, y, x, g, f, b, P, w, E, T, m, N, C, D;
  return !(e.connection.id !== t.connection.id || e.isSelected !== t.isSelected || e.isHovered !== t.isHovered || e.isDragging !== t.isDragging || e.dragProgress !== t.dragProgress || e.fromNode.position.x !== t.fromNode.position.x || e.fromNode.position.y !== t.fromNode.position.y || e.toNode.position.x !== t.toNode.position.x || e.toNode.position.y !== t.toNode.position.y || ((n = e.fromNodePosition) == null ? void 0 : n.x) !== ((o = t.fromNodePosition) == null ? void 0 : o.x) || ((r = e.fromNodePosition) == null ? void 0 : r.y) !== ((s = t.fromNodePosition) == null ? void 0 : s.y) || ((i = e.toNodePosition) == null ? void 0 : i.x) !== ((a = t.toNodePosition) == null ? void 0 : a.x) || ((c = e.toNodePosition) == null ? void 0 : c.y) !== ((u = t.toNodePosition) == null ? void 0 : u.y) || ((p = e.fromNode.size) == null ? void 0 : p.width) !== ((h = t.fromNode.size) == null ? void 0 : h.width) || ((v = e.fromNode.size) == null ? void 0 : v.height) !== ((y = t.fromNode.size) == null ? void 0 : y.height) || ((x = e.toNode.size) == null ? void 0 : x.width) !== ((g = t.toNode.size) == null ? void 0 : g.width) || ((f = e.toNode.size) == null ? void 0 : f.height) !== ((b = t.toNode.size) == null ? void 0 : b.height) || ((P = e.fromNodeSize) == null ? void 0 : P.width) !== ((w = t.fromNodeSize) == null ? void 0 : w.width) || ((E = e.fromNodeSize) == null ? void 0 : E.height) !== ((T = t.fromNodeSize) == null ? void 0 : T.height) || ((m = e.toNodeSize) == null ? void 0 : m.width) !== ((N = t.toNodeSize) == null ? void 0 : N.width) || ((C = e.toNodeSize) == null ? void 0 : C.height) !== ((D = t.toNodeSize) == null ? void 0 : D.height) || e.fromPort.position !== t.fromPort.position || e.toPort.position !== t.toPort.position);
}, pn = d.memo(la, ua);
pn.displayName = "ConnectionView";
const hn = ({ className: e }) => {
  const { state: t } = j();
  return /* @__PURE__ */ I("svg", { className: W(M.connectionLayer, e), children: [
    Object.values(t.connections).map((n) => /* @__PURE__ */ l(ha, { connection: n }, n.id)),
    /* @__PURE__ */ l(pa, {})
  ] });
};
hn.displayName = "ConnectionLayer";
const pa = d.memo(() => {
  var u, p, h, v;
  const { state: e } = Z(), { state: t, getPort: n } = j(), o = (u = e.connectionDragState) == null ? void 0 : u.fromPort.id, r = (p = e.connectionDragState) == null ? void 0 : p.fromPort.nodeId, s = (h = e.connectionDisconnectState) == null ? void 0 : h.fixedPort.id, i = (v = e.connectionDisconnectState) == null ? void 0 : v.fixedPort.nodeId, a = Ce(r || "", o || ""), c = Ce(i || "", s || "");
  if (e.connectionDragState) {
    const y = e.connectionDragState.fromPort;
    if (!t.nodes[y.nodeId]) return null;
    const g = n(y.nodeId, y.id);
    if (!g || !a) return null;
    const f = e.connectionDragState.toPosition, b = je(
      a,
      f,
      g.position,
      ft(g.position)
    );
    return /* @__PURE__ */ l("g", { className: M.dragConnection, children: /* @__PURE__ */ l(
      "path",
      {
        d: b,
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
    const g = n(y.fixedPort.nodeId, y.fixedPort.id);
    if (!g || !c) return null;
    const f = y.draggingPosition, b = je(
      c,
      f,
      g.position,
      ft(g.position)
    );
    return /* @__PURE__ */ l("g", { className: M.dragConnection, children: /* @__PURE__ */ l(
      "path",
      {
        d: b,
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
}), ha = ({ connection: e }) => {
  const { state: t, getPort: n } = j(), { state: o, dispatch: r, actions: s } = Z(), { state: i } = se(), a = Ce(e.fromNodeId, e.fromPortId), c = Ce(e.toNodeId, e.toPortId), u = d.useCallback(
    (w, E) => {
      var k;
      const T = t.nodes[e.fromNodeId], m = t.nodes[e.toNodeId], N = n(e.fromNodeId, e.fromPortId), C = n(e.toNodeId, e.toPortId);
      if (!T || !m || !N || !C || !a || !c) return;
      const D = a, R = c;
      (D.x + R.x) / 2, (D.y + R.y) / 2;
      const $ = (k = w.currentTarget.closest("svg")) == null ? void 0 : k.getBoundingClientRect();
      if (!$) return;
      (w.clientX - $.left) / i.viewport.scale - i.viewport.offset.x, (w.clientY - $.top) / i.viewport.scale - i.viewport.offset.y, Math.sqrt(Math.pow(R.x - D.x, 2) + Math.pow(R.y - D.y, 2));
      const S = w.shiftKey || w.metaKey || w.ctrlKey;
      r(s.selectConnection(E, S));
    },
    [e, t, n, r, s, i.viewport]
  ), p = d.useCallback(
    (w, E) => {
      r(s.setHoveredConnection(E));
    },
    [r, s]
  ), h = d.useCallback(
    (w, E) => {
      r(s.setHoveredConnection(null));
    },
    [r, s]
  ), v = t.nodes[e.fromNodeId], y = t.nodes[e.toNodeId], x = n(e.fromNodeId, e.fromPortId), g = n(e.toNodeId, e.toPortId);
  if (!v || !y || !x || !g || v.visible === !1 || y.visible === !1) return null;
  const f = (w, E) => {
    let T = null, m = null;
    if (o.dragState) {
      const { nodeIds: N, offset: C, affectedChildNodes: D } = o.dragState;
      N.includes(E) ? T = {
        x: w.position.x + C.x,
        y: w.position.y + C.y
      } : Object.entries(D).some(
        ([$, S]) => S.includes(E)
      ) && (T = {
        x: w.position.x + C.x,
        y: w.position.y + C.y
      });
    }
    return o.resizeState && o.resizeState.nodeId === E && (m = o.resizeState.currentSize), { previewPosition: T, previewSize: m };
  }, b = f(v, e.fromNodeId), P = f(y, e.toNodeId);
  return /* @__PURE__ */ l(
    pn,
    {
      connection: e,
      fromNode: v,
      toNode: y,
      fromPort: x,
      toPort: g,
      fromNodePosition: b.previewPosition || void 0,
      toNodePosition: P.previewPosition || void 0,
      fromNodeSize: b.previewSize || void 0,
      toNodeSize: P.previewSize || void 0,
      isSelected: o.selectedConnectionIds.includes(e.id),
      isHovered: o.hoveredConnectionId === e.id,
      onPointerDown: u,
      onPointerEnter: p,
      onPointerLeave: h
    },
    e.id
  );
}, ga = "xtnnddtrstasecqAz", fa = "xtnnddtrstaE3x", ma = "xtnnddtrstavalKN5", ya = "xtnnddtrstamod3Xj", va = "xtnnddtrstasavozp", Me = {
  statusSection: ga,
  statusLabel: fa,
  statusValue: ma,
  statusMode: ya,
  statusSaving: va
}, he = ({
  label: e,
  value: t,
  className: n,
  labelClassName: o,
  valueClassName: r
}) => /* @__PURE__ */ I("div", { className: W(Me.statusSection, n), children: [
  /* @__PURE__ */ I("span", { className: W(Me.statusLabel, o), children: [
    e,
    ":"
  ] }),
  /* @__PURE__ */ l("span", { className: W(Me.statusValue, r), children: t })
] });
he.displayName = "StatusSection";
const mt = Me, xa = "xtnnddtrfltcnt", ba = "xtnnddtrtop", Na = "xtnnddtrbottom", Ca = "xtnnddtrtopLeft", Sa = "xtnnddtrtopRight", wa = "xtnnddtrbotlef", Ea = "xtnnddtrbotrig", fe = {
  floatingContainer: xa,
  top: ba,
  bottom: Na,
  topLeft: Ca,
  topRight: Sa,
  bottomLeft: wa,
  bottomRight: Ea
}, gn = ({
  position: e = "top",
  className: t,
  children: n
}) => {
  const o = d.useMemo(() => {
    switch (e) {
      case "top":
        return fe.top;
      case "bottom":
        return fe.bottom;
      case "top-left":
        return fe.topLeft;
      case "top-right":
        return fe.topRight;
      case "bottom-left":
        return fe.bottomLeft;
      case "bottom-right":
        return fe.bottomRight;
      default:
        return fe.top;
    }
  }, [e]);
  return /* @__PURE__ */ l("div", { className: `${fe.floatingContainer} ${o} ${t || ""}`, children: n });
}, fn = ({ className: e, autoSave: t, isSaving: n, settingsManager: o }) => {
  const { state: r } = j(), { state: s } = Z(), { state: i } = se(), a = s.selectedNodeIds.length, c = s.selectedConnectionIds.length, u = Object.keys(r.nodes).length, p = Object.keys(r.connections).length, h = Math.round(i.viewport.scale * 100), y = s.dragState ? "Moving" : s.selectionBox ? "Selecting" : s.connectionDragState ? "Connecting" : i.isSpacePanning || i.panState.isPanning ? "Panning" : "Ready", x = () => s.dragState ? `Offset: (${Math.round(s.dragState.offset.x)}, ${Math.round(s.dragState.offset.y)})` : `Canvas: (${Math.round(i.viewport.offset.x)}, ${Math.round(i.viewport.offset.y)})`;
  return /* @__PURE__ */ I("div", { className: W(M.statusBar, e), "data-testid": "status-bar", children: [
    /* @__PURE__ */ l(
      he,
      {
        label: "Selection",
        value: /* @__PURE__ */ I(de, { children: [
          a > 0 && `${a} node${a !== 1 ? "s" : ""}`,
          a > 0 && c > 0 && ", ",
          c > 0 && `${c} connection${c !== 1 ? "s" : ""}`,
          a === 0 && c === 0 && "None"
        ] })
      }
    ),
    /* @__PURE__ */ l(
      he,
      {
        label: "Total",
        value: `${u} nodes, ${p} connections`
      }
    ),
    /* @__PURE__ */ l(
      he,
      {
        label: "Mode",
        value: y,
        valueClassName: mt.statusMode
      }
    ),
    /* @__PURE__ */ l(
      he,
      {
        label: "Zoom",
        value: `${h}%`
      }
    ),
    /* @__PURE__ */ l(
      he,
      {
        label: "Position",
        value: x()
      }
    ),
    i.gridSettings.showGrid && /* @__PURE__ */ l(
      he,
      {
        label: "Grid",
        value: /* @__PURE__ */ I(de, { children: [
          i.gridSettings.size,
          "px",
          i.gridSettings.snapToGrid && " (Snap ON)"
        ] })
      }
    ),
    t && /* @__PURE__ */ l(
      he,
      {
        label: "Auto-save",
        value: n ? "Saving..." : "ON",
        valueClassName: n ? mt.statusSaving : void 0
      }
    ),
    o && /* @__PURE__ */ l(
      he,
      {
        label: "Theme",
        value: o.getValue("appearance.theme") || "light"
      }
    )
  ] });
};
fn.displayName = "StatusBar";
function mn() {
  return typeof window > "u" ? { x: 0, y: 0, width: 0, height: 0 } : {
    x: window.scrollX,
    y: window.scrollY,
    width: window.innerWidth,
    height: window.innerHeight
  };
}
function Ia(e, t, n, o, r = mn(), s = 4) {
  const a = r.width - e - s, c = e - s, u = r.height - t - s, p = t - s;
  let h;
  a >= n + 8 ? h = e + s : c >= n + 8 ? h = e - n - s : h = Math.max(8, Math.min(r.width - n - 8, e - n / 2));
  let v;
  return u >= o + 8 ? v = t + s : p >= o + 8 ? v = t - o - s : v = r.height - o - 8, h = Math.max(8, Math.min(h, r.width - n - 8)), v = Math.max(8, Math.min(v, r.height - o - 8)), { x: h, y: v };
}
const Da = "xtnnddtrnodseamen", Pa = "xtnnddtrnodseamen2we", ka = "xtnnddtrmenfadin", Ta = "xtnnddtrsea", Oa = "xtnnddtrseaFFM", Ma = "xtnnddtrseahin", za = "xtnnddtrseares", Ra = "xtnnddtrcatlis", Aa = "xtnnddtrcat", La = "xtnnddtrcatLLn", Va = "xtnnddtrselcat", _a = "xtnnddtrcatnam", $a = "xtnnddtrnodcou", Ha = "xtnnddtrnodeList", Ba = "xtnnddtrnodeitm", Ga = "xtnnddtrselNode", Ua = "xtnnddtrnodeico", Xa = "xtnnddtrnodeinfGlE", Ya = "xtnnddtrnodeName", Fa = "xtnnddtrnoddes", ja = "xtnnddtrnodeType", Wa = "xtnnddtrnores", Ka = "xtnnddtrnoresB5e", Za = "xtnnddtrsealRp", qa = "xtnnddtrselHCh", F = {
  nodeSearchMenuContainer: Da,
  nodeSearchMenu: Pa,
  menuFadeIn: ka,
  searchHeader: Ta,
  searchInput: Oa,
  searchHint: Ma,
  searchResults: za,
  categoryList: Ra,
  categoryGroup: Aa,
  categoryHeader: La,
  selectedCategory: Va,
  categoryName: _a,
  nodeCount: $a,
  nodeList: Ha,
  nodeItem: Ba,
  selectedNode: Ga,
  nodeIcon: Ua,
  nodeInfo: Xa,
  nodeName: Ya,
  nodeDescription: Fa,
  nodeType: ja,
  noResults: Wa,
  noResultsIcon: Ka,
  searchFooter: Za,
  selectionInfo: qa
}, yn = ({
  position: e,
  nodeDefinitions: t,
  onCreateNode: n,
  onClose: o,
  visible: r
}) => {
  const [s, i] = d.useState(""), [a, c] = d.useState(0), [u, p] = d.useState(null), [h, v] = d.useState({ x: e.x, y: e.y }), y = d.useRef(null), x = d.useRef(null), g = d.useMemo(() => {
    const E = /* @__PURE__ */ new Map();
    return t.forEach((T) => {
      const m = T.category || "Other";
      E.has(m) || E.set(m, []), E.get(m).push(T);
    }), Array.from(E.entries()).map(([T, m]) => ({
      name: T,
      nodes: m.sort((N, C) => N.displayName.localeCompare(C.displayName))
    }));
  }, [t]), f = d.useMemo(() => {
    if (!s.trim())
      return u ? g.filter((m) => m.name === u) : g;
    const E = s.toLowerCase(), T = [];
    return g.forEach((m) => {
      const N = m.nodes.filter(
        (C) => {
          var D;
          return C.displayName.toLowerCase().includes(E) || ((D = C.description) == null ? void 0 : D.toLowerCase().includes(E)) || C.type.toLowerCase().includes(E) || m.name.toLowerCase().includes(E);
        }
      );
      N.length > 0 && T.push({
        name: m.name,
        nodes: N
      });
    }), T;
  }, [s, g, u]), b = d.useMemo(() => {
    const E = [];
    return f.forEach((T) => {
      T.nodes.forEach((m) => {
        E.push({ category: T.name, node: m });
      });
    }), E;
  }, [f]);
  d.useEffect(() => {
    r && y.current && y.current.focus();
  }, [r]), d.useEffect(() => {
    r && (i(""), c(0), p(null), setTimeout(() => {
      if (x.current) {
        const E = x.current.getBoundingClientRect(), T = mn(), m = Ia(e.x, e.y, E.width, E.height, T);
        v(m);
      }
    }, 0));
  }, [r, e]);
  const P = d.useCallback(
    (E) => {
      var T;
      switch (E.key) {
        case "ArrowDown":
          E.preventDefault(), c((C) => Math.min(C + 1, b.length - 1));
          break;
        case "ArrowUp":
          E.preventDefault(), c((C) => Math.max(C - 1, 0));
          break;
        case "Enter":
          if (E.preventDefault(), b[a]) {
            const C = b[a].node;
            n(C.type, e), o();
          }
          break;
        case "Escape":
          E.preventDefault(), o();
          break;
        case "Tab":
          E.preventDefault();
          const N = (g.findIndex((C) => C.name === u) + 1) % g.length;
          p(((T = g[N]) == null ? void 0 : T.name) || null), c(0);
          break;
      }
    },
    [b, a, n, e, o, g, u]
  ), w = d.useCallback(
    (E) => {
      n(E, e), o();
    },
    [n, e, o]
  );
  return d.useEffect(() => {
    const E = (T) => {
      if (r && T.target instanceof Element) {
        const m = document.querySelector("[data-node-search-menu]");
        m && !m.contains(T.target) && o();
      }
    };
    return document.addEventListener("mousedown", E), () => document.removeEventListener("mousedown", E);
  }, [r, o]), r ? /* @__PURE__ */ I(
    "div",
    {
      ref: x,
      className: W(F.nodeSearchMenu, F.nodeSearchMenuContainer),
      style: {
        left: h.x,
        top: h.y
      },
      "data-node-search-menu": !0,
      onKeyDown: P,
      children: [
        /* @__PURE__ */ I("div", { className: F.searchHeader, children: [
          /* @__PURE__ */ l(
            "input",
            {
              ref: y,
              id: "node-search",
              name: "nodeSearch",
              type: "text",
              placeholder: "Search nodes...",
              value: s,
              onChange: (E) => i(E.target.value),
              className: F.searchInput,
              "aria-label": "Search for nodes",
              "aria-describedby": "search-hint"
            }
          ),
          /* @__PURE__ */ I("div", { id: "search-hint", className: F.searchHint, children: [
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
        /* @__PURE__ */ l("div", { className: F.searchResults, children: f.length === 0 ? /* @__PURE__ */ I("div", { className: F.noResults, children: [
          /* @__PURE__ */ l("div", { className: F.noResultsIcon, children: "🔍" }),
          /* @__PURE__ */ I("div", { children: [
            'No nodes found for "',
            s,
            '"'
          ] })
        ] }) : /* @__PURE__ */ l("div", { className: F.categoryList, children: f.map((E, T) => /* @__PURE__ */ I("div", { className: F.categoryGroup, children: [
          /* @__PURE__ */ I(
            "div",
            {
              className: W(F.categoryHeader, u === E.name && F.selectedCategory),
              onClick: () => p(u === E.name ? null : E.name),
              children: [
                /* @__PURE__ */ l("span", { className: F.categoryName, children: E.name }),
                /* @__PURE__ */ l("span", { className: F.nodeCount, children: E.nodes.length })
              ]
            }
          ),
          /* @__PURE__ */ l("div", { className: F.nodeList, children: E.nodes.map((m, N) => {
            const C = b.findIndex((R) => R.node.type === m.type), D = C === a;
            return /* @__PURE__ */ I(
              "div",
              {
                className: W(F.nodeItem, D && F.selectedNode),
                onClick: () => w(m.type),
                onMouseEnter: () => c(C),
                children: [
                  /* @__PURE__ */ l("div", { className: F.nodeIcon, children: tn(m.type, t) }),
                  /* @__PURE__ */ I("div", { className: F.nodeInfo, children: [
                    /* @__PURE__ */ l("div", { className: F.nodeName, children: m.displayName }),
                    m.description && /* @__PURE__ */ l("div", { className: F.nodeDescription, children: m.description })
                  ] }),
                  /* @__PURE__ */ l("div", { className: F.nodeType, children: m.type })
                ]
              },
              m.type
            );
          }) })
        ] }, E.name)) }) }),
        b.length > 0 && /* @__PURE__ */ l("div", { className: F.searchFooter, children: /* @__PURE__ */ I("div", { className: F.selectionInfo, children: [
          a + 1,
          " of ",
          b.length,
          " • ",
          f.length,
          " categories"
        ] }) })
      ]
    }
  ) : null;
};
yn.displayName = "NodeSearchMenu";
const vn = d.createContext(null), Ja = ({
  portPositions: e,
  children: t
}) => {
  const n = d.useMemo(() => ({
    portPositions: e,
    getPortPosition: (o, r) => {
      var s;
      return (s = e.get(o)) == null ? void 0 : s.get(r);
    },
    getNodePortPositions: (o) => e.get(o),
    computePortPosition: (o, r) => {
      var i;
      const s = (i = e.get(o.id)) == null ? void 0 : i.get(r.id);
      return s || {
        portId: r.id,
        renderPosition: { x: 0, y: 0 },
        connectionPoint: { x: o.position.x, y: o.position.y }
      };
    }
  }), [e]);
  return /* @__PURE__ */ l(vn.Provider, { value: n, children: t });
};
function xn() {
  const e = d.useContext(vn);
  if (!e)
    throw new Error("usePortPositions must be used within a PortPositionProvider");
  return e;
}
function Dd(e, t) {
  const { getPortPosition: n } = xn();
  return d.useMemo(
    () => n(e, t),
    [n, e, t]
  );
}
function Pd(e) {
  const { getNodePortPositions: t } = xn();
  return d.useMemo(
    () => t(e),
    [t, e]
  );
}
const Qa = ({
  initialData: e,
  data: t,
  onDataChange: n,
  onSave: o,
  onLoad: r,
  className: s,
  nodeDefinitions: i,
  includeDefaultDefinitions: a = !0,
  externalDataRefs: c,
  overlayLayers: u,
  backgroundLayers: p,
  uiOverlayLayers: h,
  settingsManager: v,
  toolbar: y,
  leftSidebar: x,
  rightSidebar: g,
  leftSidebarInitialWidth: f,
  rightSidebarInitialWidth: b,
  leftSidebarMinWidth: P,
  rightSidebarMinWidth: w,
  leftSidebarMaxWidth: E,
  rightSidebarMaxWidth: T,
  onLeftSidebarWidthChange: m,
  onRightSidebarWidthChange: N
}) => /* @__PURE__ */ l(Yn, { nodeDefinitions: i, includeDefaults: a, children: /* @__PURE__ */ l(Fn, { refs: c, children: /* @__PURE__ */ l(
  Co,
  {
    initialState: e,
    controlledData: t,
    onDataChange: n,
    onSave: o,
    onLoad: r,
    settingsManager: v,
    children: /* @__PURE__ */ l(Vn, { children: /* @__PURE__ */ l(zn, { children: /* @__PURE__ */ l(Eo, { children: /* @__PURE__ */ l(Hn, { children: /* @__PURE__ */ l(Dn, { children: /* @__PURE__ */ l(
      ec,
      {
        className: s,
        overlayLayers: u,
        backgroundLayers: p,
        uiOverlayLayers: h,
        settingsManager: v,
        toolbar: y,
        leftSidebar: x,
        rightSidebar: g,
        leftSidebarInitialWidth: f,
        rightSidebarInitialWidth: b,
        leftSidebarMinWidth: P,
        rightSidebarMinWidth: w,
        leftSidebarMaxWidth: E,
        rightSidebarMaxWidth: T,
        onLeftSidebarWidthChange: m,
        onRightSidebarWidthChange: N
      }
    ) }) }) }) }) })
  }
) }) }), ec = ({
  className: e,
  overlayLayers: t,
  backgroundLayers: n,
  uiOverlayLayers: o,
  settingsManager: r,
  toolbar: s,
  leftSidebar: i,
  rightSidebar: a,
  leftSidebarInitialWidth: c,
  rightSidebarInitialWidth: u,
  leftSidebarMinWidth: p,
  rightSidebarMinWidth: h,
  leftSidebarMaxWidth: v,
  rightSidebarMaxWidth: y,
  onLeftSidebarWidthChange: x,
  onRightSidebarWidthChange: g
}) => {
  const { state: f, handleSave: b, dispatch: P, actions: w, isLoading: E, isSaving: T, getNodePorts: m } = j(), { state: N, dispatch: C, actions: D } = Z(), { utils: R } = se(), $ = Qe(), [S, k] = d.useState(() => /* @__PURE__ */ new Map()), O = d.useRef(f.nodes);
  d.useEffect(() => {
    var G, Y, J, oe;
    if (!f.nodes) return;
    const q = O.current;
    let L = !1;
    if (!q || Object.keys(q).length !== Object.keys(f.nodes).length)
      L = !0;
    else
      for (const ye in f.nodes) {
        const le = f.nodes[ye], ue = q[ye];
        if (!ue || le.position.x !== ue.position.x || le.position.y !== ue.position.y || ((G = le.size) == null ? void 0 : G.width) !== ((Y = ue.size) == null ? void 0 : Y.width) || ((J = le.size) == null ? void 0 : J.height) !== ((oe = ue.size) == null ? void 0 : oe.height)) {
          L = !0;
          break;
        }
      }
    if (L) {
      const ye = Object.values(f.nodes).map((ue) => ({
        ...ue,
        ports: m(ue.id)
      })), le = po(ye);
      k(le), O.current = f.nodes;
    }
  }, [f.nodes, m]);
  const z = Mt(r), {
    showGrid: _,
    showMinimap: V,
    showStatusBar: H,
    theme: X,
    autoSave: B,
    autoSaveInterval: U,
    smoothAnimations: K,
    doubleClickToEdit: te,
    fontSize: ie,
    gridSize: me,
    gridOpacity: Ie,
    canvasBackground: Se
  } = z, Ve = d.useMemo(
    () => ({
      "--editor-font-size": `${ie}px`,
      "--editor-grid-size": `${me}px`,
      "--editor-grid-opacity": `${Ie}`,
      "--editor-canvas-background": Se
    }),
    [ie, me, Ie, Se]
  ), _e = d.useCallback(
    (q, L) => {
      const G = $.find((ue) => ue.type === q);
      if (!G) {
        console.warn(`Node definition not found for type: ${q}`);
        return;
      }
      let Y = N.contextMenu.canvasPosition;
      Y || (Y = R.screenToCanvas(L.x, L.y));
      const J = `${q}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`, oe = G.defaultSize || { width: 150, height: 50 }, ye = {
        x: Y.x - oe.width / 2,
        y: Y.y - oe.height / 2
      }, le = {
        id: J,
        type: q,
        position: ye,
        size: oe,
        data: G.defaultData || { title: G.displayName }
        // Ports are no longer assigned here - they will be inferred from NodeDefinition
      };
      P(w.addNode(le)), C(D.selectNode(J, !1)), C(D.hideContextMenu());
    },
    [$, P, w, C, D, N.contextMenu.canvasPosition, R]
  );
  d.useEffect(() => {
    const q = (L) => {
      (L.ctrlKey || L.metaKey) && L.key === "s" && (L.preventDefault(), b()), L.key === "Escape" && C(D.hideContextMenu());
    };
    return document.addEventListener("keydown", q), () => document.removeEventListener("keydown", q);
  }, [b, C, D]);
  const $e = i, He = a === void 0 ? /* @__PURE__ */ l(on, {}) : a;
  return /* @__PURE__ */ I(
    _t,
    {
      className: W(e, X === "dark" && M.darkTheme, K && M.smoothAnimations),
      style: Ve,
      "data-theme": X,
      children: [
        /* @__PURE__ */ I("div", { className: M.editorLayout, children: [
          s && /* @__PURE__ */ l("div", { className: M.editorToolbar, children: s }),
          /* @__PURE__ */ l("div", { className: M.editorContent, children: /* @__PURE__ */ l(
            wi,
            {
              leftSidebar: $e,
              rightSidebar: He,
              leftSidebarInitialWidth: c,
              rightSidebarInitialWidth: u,
              leftSidebarMinWidth: p,
              rightSidebarMinWidth: h,
              leftSidebarMaxWidth: v,
              rightSidebarMaxWidth: y,
              onLeftSidebarWidthChange: x,
              onRightSidebarWidthChange: g,
              children: /* @__PURE__ */ I("div", { className: M.editorMain, children: [
                /* @__PURE__ */ l(an, { showGrid: _, children: /* @__PURE__ */ I(Ja, { portPositions: S, children: [
                  n == null ? void 0 : n.map((q, L) => /* @__PURE__ */ l(d.Fragment, { children: q }, `background-layer-${L}`)),
                  /* @__PURE__ */ l(hn, {}),
                  /* @__PURE__ */ l(un, { doubleClickToEdit: te }),
                  t == null ? void 0 : t.map((q, L) => /* @__PURE__ */ l(d.Fragment, { children: q }, `overlay-layer-${L}`))
                ] }) }),
                H && /* @__PURE__ */ l(fn, { autoSave: B, isSaving: T, settingsManager: r })
              ] })
            }
          ) })
        ] }),
        (E || T) && /* @__PURE__ */ l("div", { className: M.loadingOverlay, children: /* @__PURE__ */ l("div", { className: M.loadingIndicator, children: E ? "Loading..." : "Saving..." }) }),
        /* @__PURE__ */ l(
          yn,
          {
            position: N.contextMenu.position,
            nodeDefinitions: $,
            onCreateNode: _e,
            onClose: () => C(D.hideContextMenu()),
            visible: N.contextMenu.visible
          }
        ),
        o && o.length > 0 && /* @__PURE__ */ l("div", { className: M.uiOverlayContainer, children: o.map((q, L) => /* @__PURE__ */ l(d.Fragment, { children: q }, `ui-overlay-layer-${L}`)) })
      ]
    }
  );
};
Qa.displayName = "NodeEditor";
const tc = "xtnnddtrminimapNm_", nc = "xtnnddtrminxip", oc = "xtnnddtrtopLeftyMq", rc = "xtnnddtrtopRights48", sc = "xtnnddtrbotlef8be", ic = "xtnnddtrbotrigo0n", ac = "xtnnddtrtopleft", cc = "xtnnddtrtopright", dc = "xtnnddtrbot", lc = "xtnnddtrbotBB1", uc = "xtnnddtrminudL", pc = "xtnnddtrminzoo", hc = "xtnnddtrmintitGxO", gc = "xtnnddtrminsta", fc = "xtnnddtrmincan", mc = "xtnnddtrmincan45s", yc = "xtnnddtrminvieSyB", vc = "xtnnddtrminnodljv", xc = "xtnnddtrminnodn73", bc = "xtnnddtrmincon", Nc = "xtnnddtrmincon7Oy", Cc = "xtnnddtrminvieS6m", ne = {
  minimap: tc,
  minimapContainer: nc,
  topLeft: oc,
  topRight: rc,
  bottomLeft: sc,
  bottomRight: ic,
  topleft: ac,
  topright: cc,
  bottomleft: dc,
  bottomright: lc,
  minimapHeader: uc,
  minimapZoom: pc,
  minimapTitle: hc,
  minimapStats: gc,
  minimapCanvas: fc,
  minimapCanvasDragging: mc,
  minimapViewport: yc,
  minimapNode: vc,
  minimapGroupNode: xc,
  minimapConnections: bc,
  minimapConnection: Nc,
  minimapViewportDragging: Cc
}, Sc = ({
  width: e = 200,
  height: t = 150,
  position: n = "top-right",
  className: o,
  visible: r = !0,
  scale: s = 0.1
}) => {
  const { state: i } = j(), { state: a, dispatch: c, actions: u } = se(), p = d.useRef(null), [h, v] = d.useState(!1), [y, x] = d.useState(null), [g, f] = d.useState(!1), b = d.useMemo(() => {
    const S = Object.values(i.nodes);
    if (S.length === 0)
      return { minX: 0, minY: 0, maxX: 1e3, maxY: 1e3 };
    let k = 1 / 0, O = 1 / 0, z = -1 / 0, _ = -1 / 0;
    S.forEach((H) => {
      var te, ie;
      const X = H.position.x, B = H.position.y, U = ((te = H.size) == null ? void 0 : te.width) || 150, K = ((ie = H.size) == null ? void 0 : ie.height) || 100;
      k = Math.min(k, X), O = Math.min(O, B), z = Math.max(z, X + U), _ = Math.max(_, B + K);
    });
    const V = 100;
    return {
      minX: k - V,
      minY: O - V,
      maxX: z + V,
      maxY: _ + V
    };
  }, [i.nodes]), P = d.useMemo(() => {
    const S = b.maxX - b.minX, k = b.maxY - b.minY, O = (e - 20) / S, z = (t - 40) / k;
    return Math.min(O, z, s);
  }, [b, e, t]), w = d.useCallback((S, k) => ({
    x: (S - b.minX) * P + 10,
    y: (k - b.minY) * P + 30
  }), [b, P]), E = d.useCallback((S, k) => ({
    x: (S - 10) / P + b.minX,
    y: (k - 30) / P + b.minY
  }), [b, P]), T = d.useMemo(() => {
    const S = a.viewport, k = window.innerWidth / S.scale, O = window.innerHeight / S.scale, z = {
      x: -S.offset.x / S.scale,
      y: -S.offset.y / S.scale
    }, _ = {
      x: z.x + k,
      y: z.y + O
    }, V = w(z.x, z.y), H = w(_.x, _.y);
    return {
      x: V.x,
      y: V.y,
      width: Math.max(1, H.x - V.x),
      height: Math.max(1, H.y - V.y)
    };
  }, [a.viewport, w]), m = d.useCallback((S, k) => {
    if (!p.current) return;
    const O = p.current.getBoundingClientRect(), z = S - O.left, _ = k - O.top, V = E(z, _), H = a.viewport, X = z / e * window.innerWidth, B = (_ - 30) / (t - 30) * window.innerHeight, U = X - V.x * H.scale, K = B - V.y * H.scale;
    c(u.setViewport({
      ...H,
      offset: { x: U, y: K }
    }));
  }, [a.viewport, c, u, E, e, t]), N = d.useCallback((S) => {
    S.preventDefault(), v(!0), f(!1), x({
      x: S.clientX,
      y: S.clientY,
      viewportOffset: { ...a.viewport.offset }
    }), p.current && p.current.setPointerCapture(S.pointerId);
  }, [a.viewport.offset]), C = d.useCallback((S) => {
    if (!h || !y) return;
    S.preventDefault();
    const k = S.clientX - y.x, O = S.clientY - y.y, z = 3;
    !g && (Math.abs(k) > z || Math.abs(O) > z) && f(!0);
    const _ = b.maxX - b.minX, V = b.maxY - b.minY, H = e - 20, X = t - 60, B = k / H * _, U = O / X * V, K = a.viewport, te = y.viewportOffset.x - B * K.scale, ie = y.viewportOffset.y - U * K.scale;
    c(u.setViewport({
      ...K,
      offset: { x: te, y: ie }
    }));
  }, [h, y, g, a.viewport, c, u, b, e, t]), D = d.useCallback((S) => {
    v(!1), x(null), p.current && p.current.releasePointerCapture(S.pointerId), setTimeout(() => {
      f(!1);
    }, 0);
  }, []), R = d.useCallback((S) => {
    !g && !h && !y && m(S.clientX, S.clientY);
  }, [g, h, y, m]), $ = n.replace("-", "");
  return r ? /* @__PURE__ */ I(
    "div",
    {
      className: `${ne.minimapContainer} ${ne[$]} ${o || ""}`,
      style: { width: e, height: t },
      children: [
        /* @__PURE__ */ I("div", { className: ne.minimapHeader, children: [
          /* @__PURE__ */ l("span", { className: ne.minimapTitle, children: "Minimap" }),
          /* @__PURE__ */ I("span", { className: ne.minimapStats, children: [
            Object.keys(i.nodes).length,
            " nodes"
          ] }),
          /* @__PURE__ */ I("span", { className: ne.minimapZoom, children: [
            Math.round(a.viewport.scale * 100),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ I(
          "div",
          {
            ref: p,
            className: `${ne.minimapCanvas} ${h ? ne.minimapCanvasDragging : ""}`,
            onPointerDown: N,
            onPointerMove: C,
            onPointerUp: D,
            onClick: R,
            style: {
              width: e,
              height: t - 30,
              cursor: h ? "grabbing" : "grab"
            },
            children: [
              /* @__PURE__ */ l("svg", { className: ne.minimapConnections, viewBox: `0 0 ${e} ${t - 30}`, children: Object.values(i.connections || {}).map((S) => {
                var V, H, X, B;
                const k = i.nodes[S.fromNodeId], O = i.nodes[S.toNodeId];
                if (!k || !O) return null;
                const z = w(
                  k.position.x + (((V = k.size) == null ? void 0 : V.width) || 150) / 2,
                  k.position.y + (((H = k.size) == null ? void 0 : H.height) || 100) / 2
                ), _ = w(
                  O.position.x + (((X = O.size) == null ? void 0 : X.width) || 150) / 2,
                  O.position.y + (((B = O.size) == null ? void 0 : B.height) || 100) / 2
                );
                return /* @__PURE__ */ l(
                  "line",
                  {
                    x1: z.x,
                    y1: z.y - 30,
                    x2: _.x,
                    y2: _.y - 30,
                    className: ne.minimapConnection
                  },
                  S.id
                );
              }) }),
              Object.values(i.nodes).map((S) => {
                var _, V;
                const k = w(S.position.x, S.position.y), O = {
                  width: (((_ = S.size) == null ? void 0 : _.width) || 150) * P,
                  height: (((V = S.size) == null ? void 0 : V.height) || 100) * P
                }, z = S.type === "group";
                return /* @__PURE__ */ l(
                  "div",
                  {
                    className: `${ne.minimapNode} ${z ? ne.minimapGroupNode : ""}`,
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
                  className: `${ne.minimapViewport} ${h ? ne.minimapViewportDragging : ""}`,
                  style: {
                    left: T.x,
                    top: T.y,
                    width: T.width,
                    height: T.height
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
Sc.displayName = "Minimap";
const wc = "xtnnddtrdebugovr", Ec = "xtnnddtrtopLeftXGk", Ic = "xtnnddtrtopRightHbt", Dc = "xtnnddtrbotlefhr9", Pc = "xtnnddtrbotrigW2u", kc = "xtnnddtrcold7Bg", Tc = "xtnnddtrdebughdr", Oc = "xtnnddtrdebtit", Mc = "xtnnddtrcolbtn", zc = "xtnnddtrdebugctn", Rc = "xtnnddtrdebsec", Ac = "xtnnddtrsectit", Lc = "xtnnddtrdebugitm", Vc = "xtnnddtrlbl", _c = "xtnnddtrvalue", A = {
  debugOverlay: wc,
  topLeft: Ec,
  topRight: Ic,
  bottomLeft: Dc,
  bottomRight: Pc,
  collapsed: kc,
  debugHeader: Tc,
  debugTitle: Oc,
  collapseButton: Mc,
  debugContent: zc,
  debugSection: Rc,
  sectionTitle: Ac,
  debugItem: Lc,
  label: Vc,
  value: _c
}, $c = ({
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
  const { state: r } = j(), { state: s } = se(), { state: i } = Z(), [a, c] = d.useState(!1), [u, p] = d.useState({
    renderCount: 0,
    lastRenderTime: 0
  });
  if (d.useEffect(() => {
    o.performance && p((g) => ({
      renderCount: g.renderCount + 1,
      lastRenderTime: Date.now() - (g.lastRenderTime || Date.now())
    }));
  }, [o.performance]), !n) return null;
  const h = {
    "top-left": A.topLeft,
    "top-right": A.topRight,
    "bottom-left": A.bottomLeft,
    "bottom-right": A.bottomRight
  }[e], v = Object.keys(r.nodes).length, y = Object.keys(r.connections).length, x = i.selectedNodeIds.length;
  return /* @__PURE__ */ I(
    "div",
    {
      className: W(
        A.debugOverlay,
        h,
        a && A.collapsed,
        t
      ),
      children: [
        /* @__PURE__ */ I("div", { className: A.debugHeader, children: [
          /* @__PURE__ */ l("span", { className: A.debugTitle, children: "Debug Info" }),
          /* @__PURE__ */ l(
            "button",
            {
              className: A.collapseButton,
              onClick: () => c(!a),
              "aria-label": a ? "Expand debug info" : "Collapse debug info",
              children: a ? "+" : "−"
            }
          )
        ] }),
        !a && /* @__PURE__ */ I("div", { className: A.debugContent, children: [
          o.viewport && /* @__PURE__ */ I("div", { className: A.debugSection, children: [
            /* @__PURE__ */ l("div", { className: A.sectionTitle, children: "Viewport" }),
            /* @__PURE__ */ I("div", { className: A.debugItem, children: [
              /* @__PURE__ */ l("span", { className: A.label, children: "Offset:" }),
              /* @__PURE__ */ I("span", { className: A.value, children: [
                Math.round(s.viewport.offset.x),
                ", ",
                Math.round(s.viewport.offset.y)
              ] })
            ] }),
            /* @__PURE__ */ I("div", { className: A.debugItem, children: [
              /* @__PURE__ */ l("span", { className: A.label, children: "Scale:" }),
              /* @__PURE__ */ I("span", { className: A.value, children: [
                s.viewport.scale.toFixed(2),
                "x"
              ] })
            ] }),
            /* @__PURE__ */ I("div", { className: A.debugItem, children: [
              /* @__PURE__ */ l("span", { className: A.label, children: "Grid:" }),
              /* @__PURE__ */ I("span", { className: A.value, children: [
                s.gridSettings.enabled ? "On" : "Off",
                s.gridSettings.enabled && ` (${s.gridSettings.size}px)`
              ] })
            ] })
          ] }),
          o.nodes && /* @__PURE__ */ I("div", { className: A.debugSection, children: [
            /* @__PURE__ */ l("div", { className: A.sectionTitle, children: "Nodes" }),
            /* @__PURE__ */ I("div", { className: A.debugItem, children: [
              /* @__PURE__ */ l("span", { className: A.label, children: "Total:" }),
              /* @__PURE__ */ l("span", { className: A.value, children: v })
            ] }),
            /* @__PURE__ */ I("div", { className: A.debugItem, children: [
              /* @__PURE__ */ l("span", { className: A.label, children: "Selected:" }),
              /* @__PURE__ */ l("span", { className: A.value, children: x })
            ] }),
            Object.entries(
              Object.values(r.nodes).reduce((g, f) => (g[f.type] = (g[f.type] || 0) + 1, g), {})
            ).map(([g, f]) => /* @__PURE__ */ I("div", { className: A.debugItem, children: [
              /* @__PURE__ */ I("span", { className: A.label, children: [
                g,
                ":"
              ] }),
              /* @__PURE__ */ l("span", { className: A.value, children: f })
            ] }, g))
          ] }),
          o.connections && /* @__PURE__ */ I("div", { className: A.debugSection, children: [
            /* @__PURE__ */ l("div", { className: A.sectionTitle, children: "Connections" }),
            /* @__PURE__ */ I("div", { className: A.debugItem, children: [
              /* @__PURE__ */ l("span", { className: A.label, children: "Total:" }),
              /* @__PURE__ */ l("span", { className: A.value, children: y })
            ] })
          ] }),
          o.actions && /* @__PURE__ */ I("div", { className: A.debugSection, children: [
            /* @__PURE__ */ l("div", { className: A.sectionTitle, children: "Actions" }),
            /* @__PURE__ */ I("div", { className: A.debugItem, children: [
              /* @__PURE__ */ l("span", { className: A.label, children: "Dragging:" }),
              /* @__PURE__ */ l("span", { className: A.value, children: i.dragState ? `${i.dragState.nodeIds.length} nodes` : "None" })
            ] }),
            /* @__PURE__ */ I("div", { className: A.debugItem, children: [
              /* @__PURE__ */ l("span", { className: A.label, children: "Resizing:" }),
              /* @__PURE__ */ l("span", { className: A.value, children: i.resizeState ? i.resizeState.nodeId : "None" })
            ] }),
            /* @__PURE__ */ I("div", { className: A.debugItem, children: [
              /* @__PURE__ */ l("span", { className: A.label, children: "Connecting:" }),
              /* @__PURE__ */ l("span", { className: A.value, children: i.connectionDragState ? "Active" : "None" })
            ] }),
            /* @__PURE__ */ I("div", { className: A.debugItem, children: [
              /* @__PURE__ */ l("span", { className: A.label, children: "Panning:" }),
              /* @__PURE__ */ l("span", { className: A.value, children: s.panState.isPanning ? "Active" : "None" })
            ] })
          ] }),
          o.performance && /* @__PURE__ */ I("div", { className: A.debugSection, children: [
            /* @__PURE__ */ l("div", { className: A.sectionTitle, children: "Performance" }),
            /* @__PURE__ */ I("div", { className: A.debugItem, children: [
              /* @__PURE__ */ l("span", { className: A.label, children: "Renders:" }),
              /* @__PURE__ */ l("span", { className: A.value, children: u.renderCount })
            ] }),
            /* @__PURE__ */ I("div", { className: A.debugItem, children: [
              /* @__PURE__ */ l("span", { className: A.label, children: "Last render:" }),
              /* @__PURE__ */ I("span", { className: A.value, children: [
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
$c.displayName = "DebugOverlay";
const Hc = "xtnnddtrtbru6T", Bc = "xtnnddtrtbrsec", Gc = "xtnnddtrtoolbtn7BP", Uc = "xtnnddtractD7C", Xc = "xtnnddtrsep", Yc = "xtnnddtrzoodis", Fc = "xtnnddtrzoosel", jc = "xtnnddtrtbrspa", Wc = "xtnnddtrstaAUh", Kc = "xtnnddtrstaXT3", Zc = "xtnnddtrstaval87E", ee = {
  toolbar: Hc,
  toolbarSection: Bc,
  toolButton: Gc,
  active: Uc,
  separator: Xc,
  zoomDisplay: Yc,
  zoomSelect: Fc,
  toolbarSpacer: jc,
  statusIndicator: Wc,
  statusLabel: Kc,
  statusValue: Zc
}, yt = [5, 10, 25, 50, 100, 200, 400, 800], be = d.memo(({ onClick: e, title: t, ariaLabel: n, disabled: o, children: r }) => /* @__PURE__ */ l(
  "button",
  {
    className: ee.toolButton,
    onClick: e,
    title: t,
    "aria-label": n,
    disabled: o,
    children: r
  }
));
be.displayName = "ZoomButton";
const We = d.memo(({ active: e, onClick: t, title: n, ariaLabel: o, children: r }) => /* @__PURE__ */ l(
  "button",
  {
    className: `${ee.toolButton} ${e ? ee.active : ""}`,
    onClick: t,
    title: n,
    "aria-label": o,
    children: r
  }
));
We.displayName = "ToggleButton";
const Ke = d.memo(({ label: e, value: t }) => /* @__PURE__ */ I("div", { className: ee.statusIndicator, children: [
  /* @__PURE__ */ I("span", { className: ee.statusLabel, children: [
    e,
    ":"
  ] }),
  /* @__PURE__ */ l("span", { className: ee.statusValue, children: t })
] }));
Ke.displayName = "StatusIndicator";
const qc = d.memo(({
  className: e,
  useFloatingContainer: t = !1,
  position: n = "bottom"
}) => {
  const { state: o, actions: r, dispatch: s } = se(), { state: i } = j(), { state: a } = Z(), c = d.useMemo(
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
    s(
      r.setViewport({
        ...o.viewport,
        scale: m
      })
    );
  }, [o.viewport, s, r]), y = d.useCallback(() => {
    const m = Math.max(o.viewport.scale * 0.8, 0.1);
    s(
      r.setViewport({
        ...o.viewport,
        scale: m
      })
    );
  }, [o.viewport, s, r]), x = d.useCallback(() => {
    s(
      r.setViewport({
        ...o.viewport,
        scale: 1
      })
    );
  }, [o.viewport, s, r]), g = d.useCallback(() => {
    const m = Object.values(i.nodes);
    if (m.length === 0) return;
    let N = 1 / 0, C = 1 / 0, D = -1 / 0, R = -1 / 0;
    m.forEach((U) => {
      var K, te;
      N = Math.min(N, U.position.x), C = Math.min(C, U.position.y), D = Math.max(D, U.position.x + (((K = U.size) == null ? void 0 : K.width) ?? 150)), R = Math.max(R, U.position.y + (((te = U.size) == null ? void 0 : te.height) ?? 50));
    });
    const $ = 50, S = D - N + $ * 2, k = R - C + $ * 2, O = window.innerWidth, z = window.innerHeight, _ = O / S, V = z / k, H = Math.min(_, V, 1), X = (N + D) / 2, B = (C + R) / 2;
    s(
      r.setViewport({
        scale: H,
        offset: {
          x: -(X * H - O / 2),
          y: -(B * H - z / 2)
        }
      })
    );
  }, [i.nodes, s, r]), f = d.useCallback(() => {
    if (h === 0) return;
    const m = a.selectedNodeIds.map((U) => i.nodes[U]).filter((U) => U != null);
    if (m.length === 0) return;
    let N = 1 / 0, C = 1 / 0, D = -1 / 0, R = -1 / 0;
    m.forEach((U) => {
      var K, te;
      N = Math.min(N, U.position.x), C = Math.min(C, U.position.y), D = Math.max(D, U.position.x + (((K = U.size) == null ? void 0 : K.width) ?? 150)), R = Math.max(R, U.position.y + (((te = U.size) == null ? void 0 : te.height) ?? 50));
    });
    const $ = 50, S = D - N + $ * 2, k = R - C + $ * 2, O = window.innerWidth, z = window.innerHeight, _ = O / S, V = z / k, H = Math.min(_, V, 2), X = (N + D) / 2, B = (C + R) / 2;
    s(
      r.setViewport({
        scale: H,
        offset: {
          x: -(X * H - O / 2),
          y: -(B * H - z / 2)
        }
      })
    );
  }, [i.nodes, a.selectedNodeIds, h, s, r]), b = d.useCallback(
    (m) => {
      s(
        r.setViewport({
          ...o.viewport,
          scale: m / 100
        })
      );
    },
    [o.viewport, s, r]
  ), P = d.useCallback(() => {
    s(
      r.updateGridSettings({
        showGrid: !o.gridSettings.showGrid
      })
    );
  }, [o.gridSettings.showGrid, s, r]), w = d.useCallback(() => {
    s(
      r.updateGridSettings({
        snapToGrid: !o.gridSettings.snapToGrid
      })
    );
  }, [o.gridSettings.snapToGrid, s, r]), E = d.useMemo(() => {
    const m = yt.map((N) => /* @__PURE__ */ I("option", { value: N, children: [
      N,
      "%"
    ] }, N));
    return yt.includes(c) || m.push(
      /* @__PURE__ */ I("option", { value: c, children: [
        c,
        "%"
      ] }, c)
    ), m;
  }, [c]), T = /* @__PURE__ */ I(de, { children: [
    /* @__PURE__ */ I("div", { className: ee.toolbarSection, children: [
      /* @__PURE__ */ l(
        be,
        {
          onClick: y,
          title: "Zoom Out (Cmd -)",
          ariaLabel: "Zoom Out",
          children: /* @__PURE__ */ l("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", children: /* @__PURE__ */ l("path", { d: "M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" }) })
        }
      ),
      /* @__PURE__ */ l("div", { className: ee.zoomDisplay, children: /* @__PURE__ */ l(
        "select",
        {
          className: ee.zoomSelect,
          value: c,
          onChange: (m) => b(Number(m.target.value)),
          children: E
        }
      ) }),
      /* @__PURE__ */ l(
        be,
        {
          onClick: v,
          title: "Zoom In (Cmd +)",
          ariaLabel: "Zoom In",
          children: /* @__PURE__ */ l("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", children: /* @__PURE__ */ l("path", { d: "M8 4a.5.5 0 0 1 .5.5V7.5H11.5a.5.5 0 0 1 0 1H8.5V11.5a.5.5 0 0 1-1 0V8.5H4.5a.5.5 0 0 1 0-1H7.5V4.5A.5.5 0 0 1 8 4z" }) })
        }
      )
    ] }),
    /* @__PURE__ */ l("div", { className: ee.separator }),
    /* @__PURE__ */ I("div", { className: ee.toolbarSection, children: [
      /* @__PURE__ */ l(
        be,
        {
          onClick: g,
          title: "Zoom to Fit All (Shift 1)",
          ariaLabel: "Zoom to Fit All",
          children: /* @__PURE__ */ I("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", children: [
            /* @__PURE__ */ l("path", { d: "M3.5 2.5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1h-9zm0 1h9v9h-9v-9z" }),
            /* @__PURE__ */ l("path", { d: "M6 6h4v4H6V6z", opacity: "0.5" })
          ] })
        }
      ),
      /* @__PURE__ */ l(
        be,
        {
          onClick: f,
          title: "Zoom to Selection (Shift 2)",
          ariaLabel: "Zoom to Selection",
          disabled: h === 0,
          children: /* @__PURE__ */ I("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", children: [
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
        be,
        {
          onClick: x,
          title: "Reset Zoom (Cmd 0)",
          ariaLabel: "Reset Zoom",
          children: /* @__PURE__ */ l("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", children: /* @__PURE__ */ l("text", { x: "8", y: "12", textAnchor: "middle", fontSize: "10", fontWeight: "600", children: "1:1" }) })
        }
      )
    ] }),
    /* @__PURE__ */ l("div", { className: ee.separator }),
    /* @__PURE__ */ I("div", { className: ee.toolbarSection, children: [
      /* @__PURE__ */ l(
        We,
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
        We,
        {
          active: o.gridSettings.snapToGrid,
          onClick: w,
          title: "Toggle Snap to Grid",
          ariaLabel: "Toggle Snap to Grid",
          children: /* @__PURE__ */ I("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", children: [
            /* @__PURE__ */ l("path", { d: "M8 2v12M2 8h12", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", opacity: "0.4" }),
            /* @__PURE__ */ l("circle", { cx: "8", cy: "8", r: "2", fill: "currentColor" })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ l("div", { className: ee.toolbarSpacer }),
    /* @__PURE__ */ I("div", { className: ee.toolbarSection, children: [
      /* @__PURE__ */ l(Ke, { label: "Nodes", value: u }),
      /* @__PURE__ */ l(Ke, { label: "Connections", value: p })
    ] })
  ] });
  return t ? /* @__PURE__ */ l(gn, { position: n, className: e, children: T }) : /* @__PURE__ */ l("div", { className: `${ee.toolbar} ${e || ""}`, children: T });
});
qc.displayName = "GridToolbox";
const Jc = "xtnnddtrtbrico", Qc = "xtnnddtrtbrdKk", ed = "xtnnddtrtbrsep", Ye = {
  toolbarIcon: Jc,
  toolbarIconText: Qc,
  toolbarSeparator: ed
}, kd = ({
  className: e,
  floating: t = !1,
  position: n = "top"
}) => {
  const o = Qe(), { actions: r, dispatch: s } = Z(), { state: i } = se(), { dispatch: a, actions: c } = j(), u = d.useMemo(() => o.filter(
    (y) => ["standard", "input", "output", "process", "group"].includes(y.type)
  ).slice(0, 5), [o]), p = d.useCallback((y) => {
    const x = o.find((E) => E.type === y);
    if (!x) {
      console.warn(`Node definition not found for type: ${y}`);
      return;
    }
    const g = i.viewport, f = (-g.offset.x + window.innerWidth / 2) / g.scale, b = (-g.offset.y + window.innerHeight / 2) / g.scale, P = `${y}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`, w = {
      id: P,
      type: y,
      position: { x: f, y: b },
      size: x.defaultSize || { width: 150, height: 50 },
      data: x.defaultData || { title: x.displayName }
      // Ports are no longer assigned here - they will be inferred from NodeDefinition
    };
    a(c.addNode(w)), s(r.selectNode(P, !1));
  }, [o, i.viewport, a, c, s, r]), h = d.useCallback(() => {
    const y = i.viewport, x = window.innerWidth / 2, g = window.innerHeight / 2, f = (-y.offset.x + x) / y.scale, b = (-y.offset.y + g) / y.scale;
    s(r.showContextMenu(
      { x, y: g },
      void 0,
      { x: f, y: b }
    ));
  }, [i.viewport, s, r]), v = /* @__PURE__ */ I(de, { children: [
    u.map((y) => /* @__PURE__ */ l(
      ze,
      {
        className: M.toolButton,
        onClick: () => p(y.type),
        title: `Add ${y.displayName}`,
        "aria-label": `Add ${y.displayName}`,
        children: y.icon ? /* @__PURE__ */ l("span", { className: Ye.toolbarIcon, children: y.icon }) : /* @__PURE__ */ l("span", { className: Ye.toolbarIconText, children: y.displayName.charAt(0).toUpperCase() })
      },
      y.type
    )),
    u.length > 0 && /* @__PURE__ */ l("div", { className: Ye.toolbarSeparator }),
    /* @__PURE__ */ l(
      ze,
      {
        className: M.toolButton,
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
  return t ? /* @__PURE__ */ l(gn, { position: n, className: e, children: v }) : /* @__PURE__ */ l("div", { className: `${M.topToolbar} ${e || ""}`, children: v });
};
function Td(e) {
  if (!e) return {};
  const t = {};
  return e.nodeIds.forEach((n) => {
    t[n] = e.offset;
  }), Object.entries(e.affectedChildNodes).forEach(([n, o]) => {
    o.forEach((r) => {
      t[r] = e.offset;
    });
  }), t;
}
function Od(e, t, n = { x: 0, y: 0 }) {
  if (e.length === 0) return null;
  let o = 1 / 0, r = 1 / 0, s = -1 / 0, i = -1 / 0;
  return e.forEach((a) => {
    var y, x;
    const c = t[a];
    if (!c) return;
    const u = c.position.x + n.x, p = c.position.y + n.y, h = ((y = c.size) == null ? void 0 : y.width) || 150, v = ((x = c.size) == null ? void 0 : x.height) || 50;
    o = Math.min(o, u), r = Math.min(r, p), s = Math.max(s, u + h), i = Math.max(i, p + v);
  }), { minX: o, minY: r, maxX: s, maxY: i };
}
class bn {
  constructor() {
    pe(this, "listeners", /* @__PURE__ */ new Map());
  }
  on(t, n) {
    return this.listeners.has(t) || this.listeners.set(t, []), this.listeners.get(t).push(n), () => {
      const o = this.listeners.get(t);
      if (o) {
        const r = o.indexOf(n);
        r > -1 && o.splice(r, 1);
      }
    };
  }
  emit(t, n) {
    const o = this.listeners.get(t);
    o && o.forEach((r) => {
      try {
        r(n);
      } catch (s) {
        console.error(`Error in settings event handler for ${t}:`, s);
      }
    });
  }
  removeAllListeners() {
    this.listeners.clear();
  }
}
class td {
  constructor(t = "node-editor-settings") {
    pe(this, "prefix");
    pe(this, "eventEmitter", new bn());
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
      const r = localStorage.key(o);
      r && r.startsWith(n) && t.push(r.substring(n.length));
    }
    return t;
  }
  getMany(t) {
    const n = {};
    return t.forEach((o) => {
      const r = this.get(o);
      r !== void 0 && (n[o] = r);
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
class Md extends bn {
  constructor(n) {
    super();
    pe(this, "settings", /* @__PURE__ */ new Map());
    pe(this, "categories", /* @__PURE__ */ new Map());
    pe(this, "values", /* @__PURE__ */ new Map());
    pe(this, "storage");
    this.storage = n || new td(), Object.values(vt).forEach((o) => {
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
    return Array.from(this.settings.values()).filter((o) => o.category === n).sort((o, r) => (o.order || 0) - (r.order || 0));
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
    const r = this.settings.get(n);
    if (!r) {
      console.warn(`Setting ${n} is not registered`);
      return;
    }
    const s = this.validateSetting(n, o);
    if (s)
      throw new Error(`Invalid value for setting ${n}: ${s}`);
    const i = this.values.get(n);
    this.values.set(n, o), r.persistent !== !1 && this.storage.set(n, o);
    const a = {
      key: n,
      value: o,
      previousValue: i,
      category: r.category
    };
    this.emit("change", a);
  }
  setValues(n) {
    Object.entries(n).forEach(([o, r]) => {
      r !== void 0 && this.setValue(o, r);
    });
  }
  getAllValues() {
    return Object.fromEntries(this.values);
  }
  resetToDefaults(n) {
    const o = n || Array.from(this.settings.keys());
    o.forEach((r) => {
      const s = this.settings.get(r);
      s && this.setValue(r, s.defaultValue);
    }), this.emit("reset", { keys: o });
  }
  // Validation
  validateSetting(n, o) {
    const r = this.settings.get(n);
    if (!r)
      return "Setting not found";
    if (r.required && (o == null || o === ""))
      return "This setting is required";
    if (o != null)
      switch (r.type) {
        case "number":
        case "range":
          if (typeof o != "number")
            return "Value must be a number";
          if (r.min !== void 0 && o < r.min)
            return `Value must be at least ${r.min}`;
          if (r.max !== void 0 && o > r.max)
            return `Value must be at most ${r.max}`;
          break;
        case "text":
        case "textarea":
        case "email":
        case "url":
        case "password":
          if (typeof o != "string")
            return "Value must be a string";
          if (r.minLength !== void 0 && o.length < r.minLength)
            return `Value must be at least ${r.minLength} characters long`;
          if (r.maxLength !== void 0 && o.length > r.maxLength)
            return `Value must be at most ${r.maxLength} characters long`;
          if (r.pattern && !new RegExp(r.pattern).test(o))
            return "Value does not match required pattern";
          break;
        case "boolean":
          if (typeof o != "boolean")
            return "Value must be a boolean";
          break;
        case "select":
          if (r.options && !r.options.map((i) => i.value).includes(o))
            return "Value must be one of the valid options";
          break;
        case "multiselect":
          if (!Array.isArray(o))
            return "Value must be an array";
          if (r.options) {
            const s = r.options.map((i) => i.value);
            for (const i of o)
              if (!s.includes(i))
                return "All values must be valid options";
          }
          break;
      }
    return r.validator ? r.validator(o) : null;
  }
  validateAll() {
    const n = {}, o = {};
    return this.settings.forEach((r, s) => {
      const i = this.values.get(s), a = this.validateSetting(s, i);
      a && (n[s] = a);
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
          const r = this.values.get(o);
          r !== void 0 && this.storage.set(o, r);
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
    return this.settings.forEach((o, r) => {
      const s = {
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
          s.type = "string", o.minLength && (s.minLength = o.minLength), o.maxLength && (s.maxLength = o.maxLength), o.pattern && (s.pattern = o.pattern);
          break;
        case "number":
        case "range":
          s.type = "number", o.min !== void 0 && (s.minimum = o.min), o.max !== void 0 && (s.maximum = o.max);
          break;
        case "boolean":
          s.type = "boolean";
          break;
        case "select":
          s.type = "string", o.options && (s.enum = o.options.map((i) => i.value));
          break;
        case "multiselect":
          s.type = "array", o.options && (s.items = {
            type: "string",
            enum: o.options.map((i) => i.value)
          });
          break;
        default:
          s.type = "string";
      }
      n.properties[r] = s, o.required && n.required.push(r);
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
        const r = this.storage.get(o);
        r !== void 0 ? this.values.set(o, r) : this.values.set(o, n.defaultValue);
      } else
        this.values.set(o, n.defaultValue);
    });
  }
}
const zd = [
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
  wi as ColumnLayout,
  rt as DEFAULT_NODE_SIZE,
  Ae as DEFAULT_PORT_POSITION_CONFIG,
  $c as DebugOverlay,
  Vn as EditorActionStateProvider,
  Fn as ExternalDataProvider,
  gn as FloatingContainer,
  qc as GridToolbox,
  Eo as HistoryProvider,
  Hn as InlineEditingProvider,
  on as InspectorPanel,
  Dn as KeyboardShortcutProvider,
  td as LocalSettingsStorage,
  Sc as Minimap,
  zn as NodeCanvasProvider,
  Yn as NodeDefinitionProvider,
  Qa as NodeEditor,
  Co as NodeEditorProvider,
  en as NodeInspector,
  Ja as PortPositionProvider,
  Md as SettingsManager,
  gd as SpatialGrid,
  kd as Toolbar,
  wd as addVectors,
  dd as asOriginalInspectorRender,
  cd as asOriginalNodeRender,
  Td as calculateNodeDragOffsets,
  po as computeAllPortPositions,
  Le as computeNodePortPositions,
  ld as createBoundingBox,
  hd as createConnectionLookupMaps,
  ad as createNodeDataUpdater,
  sd as createNodeDefinition,
  Kn as createParentToChildrenMap,
  pd as createPortToNodeMap,
  zd as defaultSettings,
  ud as doRectanglesIntersect,
  da as getDistance,
  Od as getDraggedNodesBounds,
  Re as getNodeBoundingBox,
  id as getTypedNodeData,
  Sd as getVector,
  Wn as isRectangleInsideAnother,
  Id as scaleVector,
  Ed as subtractVectors,
  Cd as updatePortPositions,
  xd as useActionState,
  Ot as useActionStateActions,
  Nd as useBatchedUpdates,
  Tt as useCanvasActions,
  vd as useCanvasState,
  bd as useCommonActions,
  eo as useDocumentPointerEvents,
  md as useDragPointerEvents,
  Ce as useDynamicConnectionPoint,
  Rt as useDynamicPortPosition,
  Z as useEditorActionState,
  oo as useEditorActions,
  wt as useExternalDataRef,
  Pt as useGroupManagement,
  Bn as useInlineEditing,
  se as useNodeCanvas,
  Je as useNodeDefinition,
  Qe as useNodeDefinitionList,
  qe as useNodeDefinitions,
  j as useNodeEditor,
  kt as useNodeEditorActions,
  yd as useNodeEditorState,
  Pd as useNodePortPositions,
  Et as useNodeResize,
  to as usePointerCapture,
  fd as usePointerDrag,
  it as usePointerInteraction,
  Dd as usePortPosition,
  xn as usePortPositions,
  no as usePreventPointerDefaults,
  Mt as useSettings,
  ao as useVisibleNodes
};
