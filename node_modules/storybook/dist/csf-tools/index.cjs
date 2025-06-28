"use strict";
var Ge = Object.create;
var A = Object.defineProperty;
var ze = Object.getOwnPropertyDescriptor;
var Xe = Object.getOwnPropertyNames;
var Ke = Object.getPrototypeOf, Je = Object.prototype.hasOwnProperty;
var f = (s, e) => A(s, "name", { value: e, configurable: !0 });
var Qe = (s, e) => () => (e || s((e = { exports: {} }).exports, e), e.exports), He = (s, e) => {
  for (var r in e)
    A(s, r, { get: e[r], enumerable: !0 });
}, fe = (s, e, r, t) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let i of Xe(e))
      !Je.call(s, i) && i !== r && A(s, i, { get: () => e[i], enumerable: !(t = ze(e, i)) || t.enumerable });
  return s;
};
var z = (s, e, r) => (r = s != null ? Ge(Ke(s)) : {}, fe(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  e || !s || !s.__esModule ? A(r, "default", { value: s, enumerable: !0 }) : r,
  s
)), Ye = (s) => fe(A({}, "__esModule", { value: !0 }), s);

// ../node_modules/ts-dedent/dist/index.js
var R = Qe(($) => {
  "use strict";
  Object.defineProperty($, "__esModule", { value: !0 });
  $.dedent = void 0;
  function de(s) {
    for (var e = [], r = 1; r < arguments.length; r++)
      e[r - 1] = arguments[r];
    var t = Array.from(typeof s == "string" ? [s] : s);
    t[t.length - 1] = t[t.length - 1].replace(/\r?\n([\t ]*)$/, "");
    var i = t.reduce(function(l, p) {
      var d = p.match(/\n([\t ]+|(?!\s).)/g);
      return d ? l.concat(d.map(function(g) {
        var x, h;
        return (h = (x = g.match(/[\t ]/g)) === null || x === void 0 ? void 0 : x.length) !== null && h !== void 0 ? h : 0;
      })) : l;
    }, []);
    if (i.length) {
      var o = new RegExp(`
[	 ]{` + Math.min.apply(Math, i) + "}", "g");
      t = t.map(function(l) {
        return l.replace(o, `
`);
      });
    }
    t[0] = t[0].replace(/^\r?\n/, "");
    var a = t[0];
    return e.forEach(function(l, p) {
      var d = a.match(/(?:^|\n)( *)$/), g = d ? d[1] : "", x = l;
      typeof l == "string" && l.includes(`
`) && (x = String(l).split(`
`).map(function(h, b) {
        return b === 0 ? h : "" + g + h;
      }).join(`
`)), a += x + t[p + 1];
    }), a;
  }
  f(de, "dedent");
  $.dedent = de;
  $.default = de;
});

// src/csf-tools/index.ts
var dt = {};
He(dt, {
  BadMetaError: () => U,
  ConfigFile: () => ee,
  CsfFile: () => K,
  MixedFactoryError: () => M,
  MultipleMetaError: () => X,
  NoMetaError: () => L,
  babelParse: () => $e.babelParse,
  babelParseFile: () => be,
  enrichCsf: () => pt,
  enrichCsfMeta: () => Ce,
  enrichCsfStory: () => we,
  extractDescription: () => ae,
  extractSource: () => Te,
  formatConfig: () => Pe,
  formatCsf: () => ie,
  getStorySortParameter: () => ct,
  isCsfFactoryPreview: () => lt,
  isModuleMock: () => ye,
  isValidPreviewPath: () => xe,
  loadConfig: () => Se,
  loadCsf: () => Q,
  printConfig: () => Oe,
  printCsf: () => he,
  readConfig: () => ot,
  readCsf: () => st,
  vitestTransform: () => Ae,
  writeConfig: () => at,
  writeCsf: () => nt
});
module.exports = Ye(dt);

// src/csf-tools/CsfFile.ts
var J = require("node:fs/promises"), c = require("storybook/internal/babel"), v = require("storybook/internal/csf"), re = require("storybook/internal/node-logger"),
O = z(R(), 1);

// src/csf-tools/findVarInitialization.ts
var w = require("storybook/internal/babel");
var P = /* @__PURE__ */ f((s, e) => {
  let r = null, t = null;
  return e.body.find((i) => (w.types.isVariableDeclaration(i) ? t = i.declarations : w.types.isExportNamedDeclaration(i) && w.types.isVariableDeclaration(
  i.declaration) && (t = i.declaration.declarations), t && t.find((o) => w.types.isVariableDeclarator(o) && w.types.isIdentifier(o.id) && o.
  id.name === s ? (r = o.init, !0) : !1))), r;
}, "findVarInitialization");

// src/csf-tools/CsfFile.ts
var Ze = /\/preview(.(js|jsx|mjs|ts|tsx))?$/, xe = /* @__PURE__ */ f((s) => Ze.test(s), "isValidPreviewPath");
function et(s) {
  if (c.types.isArrayExpression(s))
    return s.elements.map((e) => {
      if (c.types.isStringLiteral(e))
        return e.value;
      throw new Error(`Expected string literal: ${e}`);
    });
  if (c.types.isStringLiteral(s))
    return new RegExp(s.value);
  if (c.types.isRegExpLiteral(s))
    return new RegExp(s.pattern, s.flags);
  throw new Error(`Unknown include/exclude: ${s}`);
}
f(et, "parseIncludeExclude");
function me(s) {
  if (!c.types.isArrayExpression(s))
    throw new Error("CSF: Expected tags array");
  return s.elements.map((e) => {
    if (c.types.isStringLiteral(e))
      return e.value;
    throw new Error("CSF: Expected tag to be string literal");
  });
}
f(me, "parseTags");
var D = /* @__PURE__ */ f((s, e) => {
  let r = "";
  if (s.loc) {
    let { line: t, column: i } = s.loc?.start || {};
    r = `(line ${t}, col ${i})`;
  }
  return `${e || ""} ${r}`.trim();
}, "formatLocation"), ye = /* @__PURE__ */ f((s) => it.test(s), "isModuleMock"), ue = /* @__PURE__ */ f((s, e, r) => {
  let t = s;
  if (c.types.isCallExpression(s)) {
    let { callee: i, arguments: o } = s;
    if (c.types.isProgram(e) && c.types.isMemberExpression(i) && c.types.isIdentifier(i.object) && c.types.isIdentifier(i.property) && i.property.
    name === "bind" && (o.length === 0 || o.length === 1 && c.types.isObjectExpression(o[0]) && o[0].properties.length === 0)) {
      let a = i.object.name, l = P(a, e);
      l && (r._templates[a] = l, t = l);
    }
  }
  return c.types.isArrowFunctionExpression(t) || c.types.isFunctionDeclaration(t) ? t.params.length > 0 : !1;
}, "isArgsStory"), tt = /* @__PURE__ */ f((s) => {
  if (c.types.isArrayExpression(s))
    return s.elements.map((e) => {
      if (c.types.isStringLiteral(e))
        return e.value;
      throw new Error(`Expected string literal named export: ${e}`);
    });
  throw new Error(`Expected array of string literals: ${s}`);
}, "parseExportsOrder"), ge = /* @__PURE__ */ f((s, e) => e.reduce(
  (r, t) => {
    let i = s[t];
    return i && (r[t] = i), r;
  },
  {}
), "sortExports"), rt = /* @__PURE__ */ f((s) => {
  if (c.types.isArrowFunctionExpression(s) || c.types.isFunctionDeclaration(s)) {
    let e = s.params;
    if (e.length >= 1) {
      let [r] = e;
      if (c.types.isObjectPattern(r))
        return !!r.properties.find((t) => {
          if (c.types.isObjectProperty(t) && c.types.isIdentifier(t.key))
            return t.key.name === "mount";
        });
    }
  }
  return !1;
}, "hasMount"), it = /^[.\/#].*\.mock($|\.[^.]*$)/i, L = class extends Error {
  static {
    f(this, "NoMetaError");
  }
  constructor(e, r, t) {
    let i = e.trim();
    super(O.dedent`
      CSF: ${i} ${D(r, t)}
      
      More info: https://storybook.js.org/docs/writing-stories#default-export
    `), this.name = this.constructor.name;
  }
}, X = class extends Error {
  static {
    f(this, "MultipleMetaError");
  }
  constructor(e, r, t) {
    let i = `${e} ${D(r, t)}`.trim();
    super(O.dedent`
      CSF: ${e} ${D(r, t)}
      
      More info: https://storybook.js.org/docs/writing-stories#default-export
    `), this.name = this.constructor.name;
  }
}, M = class extends Error {
  static {
    f(this, "MixedFactoryError");
  }
  constructor(e, r, t) {
    let i = `${e} ${D(r, t)}`.trim();
    super(O.dedent`
      CSF: ${e} ${D(r, t)}
      
      More info: https://storybook.js.org/docs/writing-stories#default-export
    `), this.name = this.constructor.name;
  }
}, U = class extends Error {
  static {
    f(this, "BadMetaError");
  }
  constructor(e, r, t) {
    let i = "".trim();
    super(O.dedent`
      CSF: ${e} ${D(r, t)}
      
      More info: https://storybook.js.org/docs/writing-stories#default-export
    `), this.name = this.constructor.name;
  }
}, K = class {
  constructor(e, r, t) {
    this._stories = {};
    this._metaAnnotations = {};
    this._storyExports = {};
    this._storyPaths = {};
    this._storyStatements = {};
    this._storyAnnotations = {};
    this._templates = {};
    this._ast = e, this._file = t, this._options = r, this.imports = [];
  }
  static {
    f(this, "CsfFile");
  }
  _parseTitle(e) {
    let r = c.types.isIdentifier(e) ? P(e.name, this._ast.program) : e;
    if (c.types.isStringLiteral(r))
      return r.value;
    if (c.types.isTSSatisfiesExpression(r) && c.types.isStringLiteral(r.expression))
      return r.expression.value;
    throw new Error(O.dedent`
      CSF: unexpected dynamic title ${D(r, this._options.fileName)}

      More info: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#string-literal-titles
    `);
  }
  _parseMeta(e, r) {
    if (this._metaNode)
      throw new X("multiple meta objects", e, this._options.fileName);
    this._metaNode = e;
    let t = {};
    e.properties.forEach((i) => {
      if (c.types.isIdentifier(i.key)) {
        if (this._metaAnnotations[i.key.name] = i.value, i.key.name === "title")
          t.title = this._parseTitle(i.value);
        else if (["includeStories", "excludeStories"].includes(i.key.name))
          t[i.key.name] = et(i.value);
        else if (i.key.name === "component") {
          let o = i.value;
          if (c.types.isIdentifier(o)) {
            let l = o.name, p = r.body.find(
              (d) => c.types.isImportDeclaration(d) && d.specifiers.find((g) => g.local.name === l)
            );
            if (p) {
              let { source: d } = p;
              c.types.isStringLiteral(d) && (this._rawComponentPath = d.value);
            }
          }
          let { code: a } = c.recast.print(i.value, {});
          t.component = a;
        } else if (i.key.name === "tags") {
          let o = i.value;
          c.types.isIdentifier(o) && (o = P(o.name, this._ast.program)), t.tags = me(o);
        } else if (i.key.name === "id")
          if (c.types.isStringLiteral(i.value))
            t.id = i.value.value;
          else
            throw new Error(`Unexpected component id: ${i.value}`);
      }
    }), this._meta = t;
  }
  getStoryExport(e) {
    let r = this._storyExports[e];
    if (r = c.types.isVariableDeclarator(r) ? r.init : r, c.types.isCallExpression(r)) {
      let { callee: t, arguments: i } = r;
      if (c.types.isMemberExpression(t) && c.types.isIdentifier(t.object) && c.types.isIdentifier(t.property) && t.property.name === "bind" &&
      (i.length === 0 || i.length === 1 && c.types.isObjectExpression(i[0]) && i[0].properties.length === 0)) {
        let { name: o } = t.object;
        r = this._templates[o];
      }
    }
    return r;
  }
  parse() {
    let e = this;
    if ((0, c.traverse)(this._ast, {
      ExportDefaultDeclaration: {
        enter(t) {
          let { node: i, parent: o } = t, a = c.types.isIdentifier(i.declaration) && c.types.isProgram(o);
          if (e._options.transformInlineMeta && !a && c.types.isExpression(i.declaration)) {
            let d = t.scope.generateUidIdentifier("meta");
            e._metaVariableName = d.name;
            let g = [
              c.types.variableDeclaration("const", [c.types.variableDeclarator(d, i.declaration)]),
              c.types.exportDefaultDeclaration(d)
            ];
            g.forEach((x) => x.loc = t.node.loc), t.replaceWithMultiple(g);
            return;
          }
          let l, p;
          if (a) {
            let d = i.declaration.name;
            e._metaVariableName = d;
            let g = /* @__PURE__ */ f((x) => c.types.isIdentifier(x.id) && x.id.name === d, "isVariableDeclarator");
            e._metaStatement = e._ast.program.body.find(
              (x) => c.types.isVariableDeclaration(x) && x.declarations.find(g)
            ), p = (e?._metaStatement?.declarations || []).find(
              g
            )?.init;
          } else
            e._metaStatement = i, p = i.declaration;
          if (c.types.isObjectExpression(p) ? l = p : (
            // export default { ... } as Meta<...>
            (c.types.isTSAsExpression(p) || c.types.isTSSatisfiesExpression(p)) && c.types.isObjectExpression(p.expression) && (l = p.expression)
          ), l && c.types.isProgram(o) && e._parseMeta(l, o), e._metaStatement && !e._metaNode)
            throw new L(
              "default export must be an object",
              e._metaStatement,
              e._options.fileName
            );
          e._metaPath = t;
        }
      },
      ExportNamedDeclaration: {
        enter(t) {
          let { node: i, parent: o } = t, a;
          c.types.isVariableDeclaration(i.declaration) ? a = i.declaration.declarations.filter((l) => c.types.isVariableDeclarator(l)) : c.types.
          isFunctionDeclaration(i.declaration) && (a = [i.declaration]), a ? a.forEach((l) => {
            if (c.types.isIdentifier(l.id)) {
              let p = !1, { name: d } = l.id;
              if (d === "__namedExportsOrder" && c.types.isVariableDeclarator(l)) {
                e._namedExportsOrder = tt(l.init);
                return;
              }
              e._storyExports[d] = l, e._storyPaths[d] = t, e._storyStatements[d] = i;
              let g = (0, v.storyNameFromExport)(d);
              e._storyAnnotations[d] ? re.logger.warn(
                `Unexpected annotations for "${d}" before story declaration`
              ) : e._storyAnnotations[d] = {};
              let x;
              if (c.types.isVariableDeclarator(l) ? x = c.types.isTSAsExpression(l.init) || c.types.isTSSatisfiesExpression(l.init) ? l.init.
              expression : l.init : x = l, c.types.isCallExpression(x) && c.types.isMemberExpression(x.callee) && c.types.isIdentifier(x.callee.
              property) && x.callee.property.name === "story" && (p = !0, x = x.arguments[0]), e._metaIsFactory && !p)
                throw new M(
                  "expected factory story",
                  x,
                  e._options.fileName
                );
              if (!e._metaIsFactory && p)
                throw e._metaNode ? new M(
                  "expected non-factory story",
                  x,
                  e._options.fileName
                ) : new U(
                  "meta() factory must be imported from .storybook/preview configuration",
                  x,
                  e._options.fileName
                );
              let h = {};
              c.types.isObjectExpression(x) ? (h.__isArgsStory = !0, x.properties.forEach((b) => {
                if (c.types.isIdentifier(b.key)) {
                  if (b.key.name === "render")
                    h.__isArgsStory = ue(
                      b.value,
                      o,
                      e
                    );
                  else if (b.key.name === "name" && c.types.isStringLiteral(b.value))
                    g = b.value.value;
                  else if (b.key.name === "storyName" && c.types.isStringLiteral(b.value))
                    re.logger.warn(
                      `Unexpected usage of "storyName" in "${d}". Please use "name" instead.`
                    );
                  else if (b.key.name === "parameters" && c.types.isObjectExpression(b.value)) {
                    let E = b.value.properties.find(
                      (I) => c.types.isObjectProperty(I) && c.types.isIdentifier(I.key) && I.key.name === "__id"
                    );
                    E && (h.__id = E.value.value);
                  }
                  e._storyAnnotations[d][b.key.name] = b.value;
                }
              })) : h.__isArgsStory = ue(x, o, e), e._stories[d] = {
                id: "FIXME",
                name: g,
                parameters: h,
                __stats: {
                  factory: p
                }
              };
            }
          }) : i.specifiers.length > 0 && i.specifiers.forEach((l) => {
            if (c.types.isExportSpecifier(l) && c.types.isIdentifier(l.exported)) {
              let { name: p } = l.exported, { name: d } = l.local, g = c.types.isProgram(o) ? P(d, o) : l.local;
              if (p === "default") {
                let x;
                c.types.isObjectExpression(g) ? x = g : (
                  // export default { ... } as Meta<...>
                  c.types.isTSAsExpression(g) && c.types.isObjectExpression(g.expression) && (x = g.expression)
                ), x && c.types.isProgram(o) && e._parseMeta(x, o);
              } else {
                let x = {}, h = g;
                c.types.isObjectExpression(h) && h.properties.forEach((b) => {
                  c.types.isIdentifier(b.key) && (x[b.key.name] = b.value);
                }), e._storyAnnotations[p] = x, e._storyStatements[p] = g, e._storyPaths[p] = t, e._stories[p] = {
                  id: "FIXME",
                  name: p,
                  localName: d,
                  parameters: {},
                  __stats: {}
                };
              }
            }
          });
        }
      },
      ExpressionStatement: {
        enter({ node: t, parent: i }) {
          let { expression: o } = t;
          if (c.types.isProgram(i) && c.types.isAssignmentExpression(o) && c.types.isMemberExpression(o.left) && c.types.isIdentifier(o.left.
          object) && c.types.isIdentifier(o.left.property)) {
            let a = o.left.object.name, l = o.left.property.name, p = o.right;
            if (e._storyAnnotations[a] && (l === "story" && c.types.isObjectExpression(p) ? p.properties.forEach((d) => {
              c.types.isIdentifier(d.key) && (e._storyAnnotations[a][d.key.name] = d.value);
            }) : e._storyAnnotations[a][l] = p), l === "storyName" && c.types.isStringLiteral(p)) {
              let d = p.value, g = e._stories[a];
              if (!g)
                return;
              g.name = d;
            }
          }
        }
      },
      CallExpression: {
        enter(t) {
          let { node: i } = t, { callee: o } = i;
          if (c.types.isIdentifier(o) && o.name === "storiesOf")
            throw new Error(O.dedent`
              Unexpected \`storiesOf\` usage: ${D(i, e._options.fileName)}.

              SB8 does not support \`storiesOf\`. 
            `);
          if (c.types.isMemberExpression(o) && c.types.isIdentifier(o.property) && o.property.name === "meta" && c.types.isIdentifier(o.object) &&
          i.arguments.length > 0) {
            let l = t.scope.getBinding(o.object.name)?.path?.parentPath?.node;
            if (c.types.isImportDeclaration(l))
              if (xe(l.source.value)) {
                let p = i.arguments[0];
                e._metaVariableName = o.property.name, e._metaIsFactory = !0, e._parseMeta(p, e._ast.program);
              } else
                throw new U(
                  "meta() factory must be imported from .storybook/preview configuration",
                  l,
                  e._options.fileName
                );
          }
        }
      },
      ImportDeclaration: {
        enter({ node: t }) {
          let { source: i } = t;
          if (c.types.isStringLiteral(i))
            e.imports.push(i.value);
          else
            throw new Error("CSF: unexpected import source");
        }
      }
    }), !e._meta)
      throw new L("missing default export", e._ast, e._options.fileName);
    let r = Object.entries(e._stories);
    if (e._meta.title = this._options.makeTitle(e._meta?.title), e._metaAnnotations.play && (e._meta.tags = [...e._meta.tags || [], "play-fn"]),
    e._stories = r.reduce(
      (t, [i, o]) => {
        if (!(0, v.isExportStory)(i, e._meta))
          return t;
        let a = o.parameters?.__id ?? (0, v.toId)(e._meta?.id || e._meta?.title, (0, v.storyNameFromExport)(i)), l = { ...o.parameters, __id: a },
        { includeStories: p } = e._meta || {};
        i === "__page" && (r.length === 1 || Array.isArray(p) && p.length === 1) && (l.docsOnly = !0), t[i] = { ...o, id: a, parameters: l };
        let d = e._storyAnnotations[i], { tags: g, play: x } = d;
        if (g) {
          let E = c.types.isIdentifier(g) ? P(g.name, this._ast.program) : g;
          t[i].tags = me(E);
        }
        x && (t[i].tags = [...t[i].tags || [], "play-fn"]);
        let h = t[i].__stats;
        ["play", "render", "loaders", "beforeEach", "globals", "tags"].forEach((E) => {
          h[E] = !!d[E] || !!e._metaAnnotations[E];
        });
        let b = e.getStoryExport(i);
        return h.storyFn = !!(c.types.isArrowFunctionExpression(b) || c.types.isFunctionDeclaration(b)), h.mount = rt(d.play ?? e._metaAnnotations.
        play), h.moduleMock = !!e.imports.find((E) => ye(E)), t;
      },
      {}
    ), Object.keys(e._storyExports).forEach((t) => {
      (0, v.isExportStory)(t, e._meta) || (delete e._storyExports[t], delete e._storyAnnotations[t], delete e._storyStatements[t]);
    }), e._namedExportsOrder) {
      let t = Object.keys(e._storyExports);
      e._storyExports = ge(e._storyExports, e._namedExportsOrder), e._stories = ge(e._stories, e._namedExportsOrder);
      let i = Object.keys(e._storyExports);
      if (t.length !== i.length)
        throw new Error(
          `Missing exports after sort: ${t.filter(
            (o) => !i.includes(o)
          )}`
        );
    }
    return e;
  }
  get meta() {
    return this._meta;
  }
  get stories() {
    return Object.values(this._stories);
  }
  get indexInputs() {
    let { fileName: e } = this._options;
    if (!e)
      throw new Error(
        O.dedent`Cannot automatically create index inputs with CsfFile.indexInputs because the CsfFile instance was created without a the fileName option.
        Either add the fileName option when creating the CsfFile instance, or create the index inputs manually.`
      );
    return Object.entries(this._stories).map(([r, t]) => {
      let i = [...this._meta?.tags ?? [], ...t.tags ?? []];
      return {
        type: "story",
        importPath: e,
        rawComponentPath: this._rawComponentPath,
        exportName: r,
        name: t.name,
        title: this.meta?.title,
        metaId: this.meta?.id,
        tags: i,
        __id: t.id,
        __stats: t.__stats
      };
    });
  }
}, be = /* @__PURE__ */ f(({
  code: s,
  filename: e = "",
  ast: r
}) => new c.BabelFileClass({ filename: e }, { code: s, ast: r ?? (0, c.babelParse)(s) }), "babelParseFile"), Q = /* @__PURE__ */ f((s, e) => {
  let r = (0, c.babelParse)(s), t = be({ code: s, filename: e.fileName, ast: r });
  return new K(r, e, t);
}, "loadCsf"), ie = /* @__PURE__ */ f((s, e = { sourceMaps: !1 }, r) => {
  let t = (0, c.generate)(s._ast, e, r);
  return e.sourceMaps ? t : t.code;
}, "formatCsf"), he = /* @__PURE__ */ f((s, e = {}) => c.recast.print(s._ast, e), "printCsf"), st = /* @__PURE__ */ f(async (s, e) => {
  let r = (await (0, J.readFile)(s, "utf-8")).toString();
  return Q(r, { ...e, fileName: s });
}, "readCsf"), nt = /* @__PURE__ */ f(async (s, e) => {
  if (!(e || s._options.fileName))
    throw new Error("Please specify a fileName for writeCsf");
  await (0, J.writeFile)(e, he(s).code);
}, "writeCsf");

// src/csf-tools/ConfigFile.ts
var te = require("node:fs/promises"), n = require("storybook/internal/babel"), H = require("storybook/internal/node-logger"), Ee = z(R(), 1);
var se = /* @__PURE__ */ f(({
  expectedType: s,
  foundType: e,
  node: r
}) => Ee.dedent`
      CSF Parsing error: Expected '${s}' but found '${e}' instead in '${r?.type}'.
    `, "getCsfParsingErrorMessage"), C = /* @__PURE__ */ f((s) => n.types.isIdentifier(s.key) ? s.key.name : n.types.isStringLiteral(s.key) ?
s.key.value : null, "propKey"), Y = /* @__PURE__ */ f((s) => n.types.isTSAsExpression(s) || n.types.isTSSatisfiesExpression(s) ? Y(s.expression) :
s, "unwrap"), _e = /* @__PURE__ */ f((s, e) => {
  if (s.length === 0)
    return e;
  if (n.types.isObjectExpression(e)) {
    let [r, ...t] = s, i = e.properties.find((o) => C(o) === r);
    if (i)
      return _e(t, i.value);
  }
}, "_getPath"), je = /* @__PURE__ */ f((s, e) => {
  if (s.length === 0) {
    if (n.types.isObjectExpression(e))
      return e.properties;
    throw new Error("Expected object expression");
  }
  if (n.types.isObjectExpression(e)) {
    let [r, ...t] = s, i = e.properties.find((o) => C(o) === r);
    if (i)
      return t.length === 0 ? e.properties : je(t, i.value);
  }
}, "_getPathProperties"), Z = /* @__PURE__ */ f((s, e) => {
  let r = null, t = null;
  return e.body.find((i) => (n.types.isVariableDeclaration(i) ? t = i.declarations : n.types.isExportNamedDeclaration(i) && n.types.isVariableDeclaration(
  i.declaration) && (t = i.declaration.declarations), t && t.find((o) => n.types.isVariableDeclarator(o) && n.types.isIdentifier(o.id) && o.
  id.name === s ? (r = o, !0) : !1))), r;
}, "_findVarDeclarator"), F = /* @__PURE__ */ f((s, e) => Z(s, e)?.init, "_findVarInitialization"), B = /* @__PURE__ */ f((s, e) => {
  if (s.length === 0)
    return e;
  let [r, ...t] = s, i = B(t, e);
  return n.types.objectExpression([n.types.objectProperty(n.types.identifier(r), i)]);
}, "_makeObjectExpression"), q = /* @__PURE__ */ f((s, e, r) => {
  let [t, ...i] = s, o = r.properties.find(
    (a) => C(a) === t
  );
  o ? n.types.isObjectExpression(o.value) && i.length > 0 ? q(i, e, o.value) : o.value = B(i, e) : r.properties.push(
    n.types.objectProperty(n.types.identifier(t), B(i, e))
  );
}, "_updateExportNode"), ee = class {
  constructor(e, r, t) {
    this._exports = {};
    // FIXME: this is a hack. this is only used in the case where the user is
    // modifying a named export that's a scalar. The _exports map is not suitable
    // for that. But rather than refactor the whole thing, we just use this as a stopgap.
    this._exportDecls = {};
    this.hasDefaultExport = !1;
    this._ast = e, this._code = r, this.fileName = t;
  }
  static {
    f(this, "ConfigFile");
  }
  _parseExportsObject(e) {
    this._exportsObject = e, e.properties.forEach((r) => {
      let t = C(r);
      if (t) {
        let i = r.value;
        n.types.isIdentifier(i) && (i = F(i.name, this._ast.program)), this._exports[t] = i;
      }
    });
  }
  parse() {
    let e = this;
    return (0, n.traverse)(this._ast, {
      ExportDefaultDeclaration: {
        enter({ node: r, parent: t }) {
          e.hasDefaultExport = !0;
          let i = n.types.isIdentifier(r.declaration) && n.types.isProgram(t) ? F(r.declaration.name, t) : r.declaration;
          i = Y(i), n.types.isCallExpression(i) && n.types.isObjectExpression(i.arguments[0]) && (i = i.arguments[0]), n.types.isObjectExpression(
          i) ? e._parseExportsObject(i) : H.logger.warn(
            se({
              expectedType: "ObjectExpression",
              foundType: i?.type,
              node: i || r.declaration
            })
          );
        }
      },
      ExportNamedDeclaration: {
        enter({ node: r, parent: t }) {
          if (n.types.isVariableDeclaration(r.declaration))
            r.declaration.declarations.forEach((i) => {
              if (n.types.isVariableDeclarator(i) && n.types.isIdentifier(i.id)) {
                let { name: o } = i.id, a = i.init;
                n.types.isIdentifier(a) && (a = F(a.name, t)), e._exports[o] = a, e._exportDecls[o] = i;
              }
            });
          else if (n.types.isFunctionDeclaration(r.declaration)) {
            let i = r.declaration;
            if (n.types.isIdentifier(i.id)) {
              let { name: o } = i.id;
              e._exportDecls[o] = i;
            }
          } else r.specifiers ? r.specifiers.forEach((i) => {
            if (n.types.isExportSpecifier(i) && n.types.isIdentifier(i.local) && n.types.isIdentifier(i.exported)) {
              let { name: o } = i.local, { name: a } = i.exported, l = Z(o, t);
              l && (e._exports[a] = l.init, e._exportDecls[a] = l);
            }
          }) : H.logger.warn(
            se({
              expectedType: "VariableDeclaration",
              foundType: r.declaration?.type,
              node: r.declaration
            })
          );
        }
      },
      ExpressionStatement: {
        enter({ node: r, parent: t }) {
          if (n.types.isAssignmentExpression(r.expression) && r.expression.operator === "=") {
            let { left: i, right: o } = r.expression;
            if (n.types.isMemberExpression(i) && n.types.isIdentifier(i.object) && i.object.name === "module" && n.types.isIdentifier(i.property) &&
            i.property.name === "exports") {
              let a = o;
              n.types.isIdentifier(o) && (a = F(o.name, t)), a = Y(a), n.types.isObjectExpression(a) ? (e._exportsObject = a, a.properties.forEach(
              (l) => {
                let p = C(l);
                if (p) {
                  let d = l.value;
                  n.types.isIdentifier(d) && (d = F(
                    d.name,
                    t
                  )), e._exports[p] = d;
                }
              })) : H.logger.warn(
                se({
                  expectedType: "ObjectExpression",
                  foundType: a?.type,
                  node: a
                })
              );
            }
          }
        }
      },
      CallExpression: {
        enter: /* @__PURE__ */ f(({ node: r }) => {
          n.types.isIdentifier(r.callee) && r.callee.name === "definePreview" && r.arguments.length === 1 && n.types.isObjectExpression(r.arguments[0]) &&
          e._parseExportsObject(r.arguments[0]);
        }, "enter")
      }
    }), e;
  }
  getFieldNode(e) {
    let [r, ...t] = e, i = this._exports[r];
    if (i)
      return _e(t, i);
  }
  getFieldProperties(e) {
    let [r, ...t] = e, i = this._exports[r];
    if (i)
      return je(t, i);
  }
  getFieldValue(e) {
    let r = this.getFieldNode(e);
    if (r) {
      let { code: t } = (0, n.generate)(r, {});
      return (0, eval)(`(() => (${t}))()`);
    }
  }
  getSafeFieldValue(e) {
    try {
      return this.getFieldValue(e);
    } catch {
    }
  }
  setFieldNode(e, r) {
    let [t, ...i] = e, o = this._exports[t];
    if (this._exportsObject) {
      let p = this._exportsObject.properties.find((d) => C(d) === t);
      if (p && n.types.isIdentifier(p.value)) {
        let d = Z(p.value.name, this._ast.program);
        if (d && n.types.isObjectExpression(d.init)) {
          q(i, r, d.init);
          return;
        }
      }
      q(e, r, this._exportsObject), this._exports[e[0]] = r;
      return;
    }
    if (o && n.types.isObjectExpression(o) && i.length > 0) {
      q(i, r, o);
      return;
    }
    let a = Z(t, this._ast.program);
    if (a && n.types.isObjectExpression(a.init)) {
      q(i, r, a.init);
      return;
    }
    if (o && i.length === 0 && this._exportDecls[e[0]]) {
      let l = this._exportDecls[e[0]];
      n.types.isVariableDeclarator(l) && (l.init = B([], r));
    } else {
      if (this.hasDefaultExport)
        throw new Error(
          `Could not set the "${e.join(
            "."
          )}" field as the default export is not an object in this file.`
        );
      {
        let l = B(i, r), p = n.types.exportNamedDeclaration(
          n.types.variableDeclaration("const", [n.types.variableDeclarator(n.types.identifier(t), l)])
        );
        this._exports[t] = l, this._ast.program.body.push(p);
      }
    }
  }
  /**
   * @example
   *
   * ```ts
   * // 1. { framework: 'framework-name' }
   * // 2. { framework: { name: 'framework-name', options: {} }
   * getNameFromPath(['framework']); // => 'framework-name'
   * ```
   *
   * @returns The name of a node in a given path, supporting the following formats:
   */
  getNameFromPath(e) {
    let r = this.getFieldNode(e);
    if (r)
      return this._getPresetValue(r, "name");
  }
  /**
   * Returns an array of names of a node in a given path, supporting the following formats:
   *
   * @example
   *
   * ```ts
   * const config = {
   *   addons: ['first-addon', { name: 'second-addon', options: {} }],
   * };
   * // => ['first-addon', 'second-addon']
   * getNamesFromPath(['addons']);
   * ```
   */
  getNamesFromPath(e) {
    let r = this.getFieldNode(e);
    if (!r)
      return;
    let t = [];
    return n.types.isArrayExpression(r) && r.elements.forEach((i) => {
      t.push(this._getPresetValue(i, "name"));
    }), t;
  }
  _getPnpWrappedValue(e) {
    if (n.types.isCallExpression(e)) {
      let r = e.arguments[0];
      if (n.types.isStringLiteral(r))
        return r.value;
    }
  }
  /**
   * Given a node and a fallback property, returns a **non-evaluated** string value of the node.
   *
   * 1. `{ node: 'value' }`
   * 2. `{ node: { fallbackProperty: 'value' } }`
   */
  _getPresetValue(e, r) {
    let t;
    if (n.types.isStringLiteral(e) ? t = e.value : n.types.isObjectExpression(e) ? e.properties.forEach((i) => {
      n.types.isObjectProperty(i) && n.types.isIdentifier(i.key) && i.key.name === r && (n.types.isStringLiteral(i.value) ? t = i.value.value :
      t = this._getPnpWrappedValue(i.value)), n.types.isObjectProperty(i) && n.types.isStringLiteral(i.key) && i.key.value === "name" && n.types.
      isStringLiteral(i.value) && (t = i.value.value);
    }) : n.types.isCallExpression(e) && (t = this._getPnpWrappedValue(e)), !t)
      throw new Error(
        `The given node must be a string literal or an object expression with a "${r}" property that is a string literal.`
      );
    return t;
  }
  removeField(e) {
    let r = /* @__PURE__ */ f((i, o) => {
      let a = i.findIndex(
        (l) => n.types.isIdentifier(l.key) && l.key.name === o || n.types.isStringLiteral(l.key) && l.key.value === o
      );
      a >= 0 && i.splice(a, 1);
    }, "removeProperty");
    if (e.length === 1) {
      let i = !1;
      if (this._ast.program.body.forEach((o) => {
        if (n.types.isExportNamedDeclaration(o) && n.types.isVariableDeclaration(o.declaration)) {
          let a = o.declaration.declarations[0];
          n.types.isIdentifier(a.id) && a.id.name === e[0] && (this._ast.program.body.splice(this._ast.program.body.indexOf(o), 1), i = !0);
        }
        if (n.types.isExportDefaultDeclaration(o)) {
          let a = o.declaration;
          if (n.types.isIdentifier(a) && (a = F(a.name, this._ast.program)), a = Y(a), n.types.isObjectExpression(a)) {
            let l = a.properties;
            r(l, e[0]), i = !0;
          }
        }
        if (n.types.isExpressionStatement(o) && n.types.isAssignmentExpression(o.expression) && n.types.isMemberExpression(o.expression.left) &&
        n.types.isIdentifier(o.expression.left.object) && o.expression.left.object.name === "module" && n.types.isIdentifier(o.expression.left.
        property) && o.expression.left.property.name === "exports" && n.types.isObjectExpression(o.expression.right)) {
          let a = o.expression.right.properties;
          r(a, e[0]), i = !0;
        }
      }), i)
        return;
    }
    let t = this.getFieldProperties(e);
    if (t) {
      let i = e.at(-1);
      r(t, i);
    }
  }
  appendValueToArray(e, r) {
    let t = this.valueToNode(r);
    t && this.appendNodeToArray(e, t);
  }
  appendNodeToArray(e, r) {
    let t = this.getFieldNode(e);
    if (!t)
      this.setFieldNode(e, n.types.arrayExpression([r]));
    else if (n.types.isArrayExpression(t))
      t.elements.push(r);
    else
      throw new Error(`Expected array at '${e.join(".")}', got '${t.type}'`);
  }
  /**
   * Specialized helper to remove addons or other array entries that can either be strings or
   * objects with a name property.
   */
  removeEntryFromArray(e, r) {
    let t = this.getFieldNode(e);
    if (t)
      if (n.types.isArrayExpression(t)) {
        let i = t.elements.findIndex((o) => n.types.isStringLiteral(o) ? o.value === r : n.types.isObjectExpression(o) ? this._getPresetValue(
        o, "name") === r : this._getPnpWrappedValue(o) === r);
        if (i >= 0)
          t.elements.splice(i, 1);
        else
          throw new Error(`Could not find '${r}' in array at '${e.join(".")}'`);
      } else
        throw new Error(`Expected array at '${e.join(".")}', got '${t.type}'`);
  }
  _inferQuotes() {
    if (!this._quotes) {
      let e = (this._ast.tokens || []).slice(0, 500).reduce(
        (r, t) => (t.type.label === "string" && (r[this._code[t.start]] += 1), r),
        { "'": 0, '"': 0 }
      );
      this._quotes = e["'"] > e['"'] ? "single" : "double";
    }
    return this._quotes;
  }
  valueToNode(e) {
    let r = this._inferQuotes(), t;
    if (r === "single") {
      let { code: i } = (0, n.generate)(n.types.valueToNode(e), { jsescOption: { quotes: r } }), o = (0, n.babelParse)(`const __x = ${i}`);
      (0, n.traverse)(o, {
        VariableDeclaration: {
          enter({ node: a }) {
            a.declarations.length === 1 && n.types.isVariableDeclarator(a.declarations[0]) && n.types.isIdentifier(a.declarations[0].id) && a.
            declarations[0].id.name === "__x" && (t = a.declarations[0].init);
          }
        }
      });
    } else
      t = n.types.valueToNode(e);
    return t;
  }
  setFieldValue(e, r) {
    let t = this.valueToNode(r);
    if (!t)
      throw new Error(`Unexpected value ${JSON.stringify(r)}`);
    this.setFieldNode(e, t);
  }
  getBodyDeclarations() {
    return this._ast.program.body;
  }
  setBodyDeclaration(e) {
    this._ast.program.body.push(e);
  }
  /**
   * Import specifiers for a specific require import
   *
   * @example
   *
   * ```ts
   * // const { foo } = require('bar');
   * setRequireImport(['foo'], 'bar');
   *
   * // const foo = require('bar');
   * setRequireImport('foo', 'bar');
   * ```
   *
   * @param importSpecifiers - The import specifiers to set. If a string is passed in, a default
   *   import will be set. Otherwise, an array of named imports will be set
   * @param fromImport - The module to import from
   */
  setRequireImport(e, r) {
    let t = this._ast.program.body.find((a) => {
      let l = n.types.isVariableDeclaration(a) && a.declarations.length === 1 && n.types.isVariableDeclarator(a.declarations[0]) && n.types.
      isCallExpression(a.declarations[0].init) && n.types.isIdentifier(a.declarations[0].init.callee) && a.declarations[0].init.callee.name ===
      "require" && n.types.isStringLiteral(a.declarations[0].init.arguments[0]) && (a.declarations[0].init.arguments[0].value === r || a.declarations[0].
      init.arguments[0].value === r.split("node:")[1]);
      return l && (r = a.declarations[0].init.arguments[0].value), l;
    }), i = /* @__PURE__ */ f((a) => n.types.isObjectPattern(t?.declarations[0].id) && t?.declarations[0].id.properties.find(
      (l) => n.types.isObjectProperty(l) && n.types.isIdentifier(l.key) && l.key.name === a
    ), "hasRequireSpecifier"), o = /* @__PURE__ */ f((a, l) => a.declarations.length === 1 && n.types.isVariableDeclarator(a.declarations[0]) &&
    n.types.isIdentifier(a.declarations[0].id) && a.declarations[0].id.name === l, "hasDefaultRequireSpecifier");
    if (typeof e == "string") {
      let a = /* @__PURE__ */ f(() => {
        this._ast.program.body.unshift(
          n.types.variableDeclaration("const", [
            n.types.variableDeclarator(
              n.types.identifier(e),
              n.types.callExpression(n.types.identifier("require"), [n.types.stringLiteral(r)])
            )
          ])
        );
      }, "addDefaultRequireSpecifier");
      t && o(t, e) || a();
    } else t ? e.forEach((a) => {
      i(a) || t.declarations[0].id.properties.push(
        n.types.objectProperty(n.types.identifier(a), n.types.identifier(a), void 0, !0)
      );
    }) : this._ast.program.body.unshift(
      n.types.variableDeclaration("const", [
        n.types.variableDeclarator(
          n.types.objectPattern(
            e.map(
              (a) => n.types.objectProperty(n.types.identifier(a), n.types.identifier(a), void 0, !0)
            )
          ),
          n.types.callExpression(n.types.identifier("require"), [n.types.stringLiteral(r)])
        )
      ])
    );
  }
  /**
   * Set import specifiers for a given import statement.
   *
   * Does not support setting type imports (yet)
   *
   * @example
   *
   * ```ts
   * // import { foo } from 'bar';
   * setImport(['foo'], 'bar');
   *
   * // import foo from 'bar';
   * setImport('foo', 'bar');
   *
   * // import * as foo from 'bar';
   * setImport({ namespace: 'foo' }, 'bar');
   *
   * // import 'bar';
   * setImport(null, 'bar');
   * ```
   *
   * @param importSpecifiers - The import specifiers to set. If a string is passed in, a default
   *   import will be set. Otherwise, an array of named imports will be set
   * @param fromImport - The module to import from
   */
  setImport(e, r) {
    let t = this._ast.program.body.find((p) => {
      let d = n.types.isImportDeclaration(p) && (p.source.value === r || p.source.value === r.split("node:")[1]);
      return d && (r = p.source.value), d;
    }), i = /* @__PURE__ */ f((p) => n.types.importSpecifier(n.types.identifier(p), n.types.identifier(p)), "getNewImportSpecifier"), o = /* @__PURE__ */ f(
    (p, d) => p.specifiers.find(
      (g) => n.types.isImportSpecifier(g) && n.types.isIdentifier(g.imported) && g.imported.name === d
    ), "hasImportSpecifier"), a = /* @__PURE__ */ f((p, d) => p.specifiers.find(
      (g) => n.types.isImportNamespaceSpecifier(g) && n.types.isIdentifier(g.local) && g.local.name === d
    ), "hasNamespaceImportSpecifier");
    e === null ? t || this._ast.program.body.unshift(n.types.importDeclaration([], n.types.stringLiteral(r))) : typeof e == "string" ? t ? (/* @__PURE__ */ f(
    (p, d) => p.specifiers.find(
      (g) => n.types.isImportDefaultSpecifier(g) && n.types.isIdentifier(g.local) && g.local.name === d
    ), "hasDefaultImportSpecifier"))(t, e) || t.specifiers.push(
      n.types.importDefaultSpecifier(n.types.identifier(e))
    ) : this._ast.program.body.unshift(
      n.types.importDeclaration(
        [n.types.importDefaultSpecifier(n.types.identifier(e))],
        n.types.stringLiteral(r)
      )
    ) : Array.isArray(e) ? t ? e.forEach((p) => {
      o(t, p) || t.specifiers.push(i(p));
    }) : this._ast.program.body.unshift(
      n.types.importDeclaration(
        e.map(i),
        n.types.stringLiteral(r)
      )
    ) : e.namespace && (t ? a(t, e.namespace) || t.specifiers.push(
      n.types.importNamespaceSpecifier(n.types.identifier(e.namespace))
    ) : this._ast.program.body.unshift(
      n.types.importDeclaration(
        [n.types.importNamespaceSpecifier(n.types.identifier(e.namespace))],
        n.types.stringLiteral(r)
      )
    ));
  }
}, Se = /* @__PURE__ */ f((s, e) => {
  let r = (0, n.babelParse)(s);
  return new ee(r, s, e);
}, "loadConfig"), Pe = /* @__PURE__ */ f((s) => Oe(s).code, "formatConfig"), Oe = /* @__PURE__ */ f((s, e = {}) => n.recast.print(s._ast, e),
"printConfig"), ot = /* @__PURE__ */ f(async (s) => {
  let e = (await (0, te.readFile)(s, "utf-8")).toString();
  return Se(e, s).parse();
}, "readConfig"), at = /* @__PURE__ */ f(async (s, e) => {
  let r = e || s.fileName;
  if (!r)
    throw new Error("Please specify a fileName for writeConfig");
  await (0, te.writeFile)(r, Pe(s));
}, "writeConfig"), lt = /* @__PURE__ */ f((s) => !!s._ast.program.body.find((r) => n.types.isImportDeclaration(r) && r.source.value.includes(
"@storybook") && r.specifiers.some((t) => n.types.isImportSpecifier(t) && n.types.isIdentifier(t.imported) && t.imported.name === "definePre\
view")), "isCsfFactoryPreview");

// src/csf-tools/getStorySortParameter.ts
var y = require("storybook/internal/babel"), De = require("storybook/internal/node-logger"), Ie = z(R(), 1);
var ne = /* @__PURE__ */ f((s, e) => {
  let r;
  return s.properties.forEach((t) => {
    y.types.isIdentifier(t.key) && t.key.name === e && (r = t.value);
  }), r;
}, "getValue"), oe = /* @__PURE__ */ f((s) => {
  let e = W(s);
  if (y.types.isArrayExpression(e))
    return e.elements.map((r) => oe(r));
  if (y.types.isObjectExpression(e))
    return e.properties.reduce((r, t) => (y.types.isIdentifier(t.key) && (r[t.key.name] = oe(t.value)), r), {});
  if (y.types.isLiteral(e))
    return e.value;
  if (y.types.isIdentifier(e))
    return T(e.name, !0);
  throw new Error(`Unknown node type ${e.type}`);
}, "parseValue"), T = /* @__PURE__ */ f((s, e) => {
  let r = Ie.dedent`
    Unexpected '${s}'. Parameter 'options.storySort' should be defined inline e.g.:

    export default {
      parameters: {
        options: {
          storySort: <array | object | function>
        },
      },
    };
  `;
  if (e)
    throw new Error(r);
  De.logger.log(r);
}, "unsupported"), W = /* @__PURE__ */ f((s) => y.types.isTSAsExpression(s) || y.types.isTSSatisfiesExpression(s) ? s.expression : s, "strip\
TSModifiers"), Ne = /* @__PURE__ */ f((s) => {
  let e = W(s);
  if (y.types.isObjectExpression(e)) {
    let r = ne(e, "options");
    if (r) {
      if (y.types.isObjectExpression(r))
        return ne(r, "storySort");
      T("options", !0);
    }
  }
}, "parseParameters"), ve = /* @__PURE__ */ f((s, e) => {
  let r = W(s);
  if (y.types.isObjectExpression(r)) {
    let t = ne(r, "parameters");
    if (y.types.isIdentifier(t) && (t = P(t.name, e)), t)
      return Ne(t);
  } else
    T("default", !0);
}, "parseDefault"), ct = /* @__PURE__ */ f((s) => {
  if (!s.includes("storySort"))
    return;
  let e, r = (0, y.babelParse)(s);
  if ((0, y.traverse)(r, {
    ExportNamedDeclaration: {
      enter({ node: t }) {
        y.types.isVariableDeclaration(t.declaration) ? t.declaration.declarations.forEach((i) => {
          if (y.types.isVariableDeclarator(i) && y.types.isIdentifier(i.id)) {
            let { name: o } = i.id;
            if (o === "parameters" && i.init) {
              let a = W(i.init);
              e = Ne(a);
            }
          }
        }) : t.specifiers.forEach((i) => {
          y.types.isIdentifier(i.exported) && i.exported.name === "parameters" && T("parameters", !1);
        });
      }
    },
    ExportDefaultDeclaration: {
      enter({ node: t }) {
        let i = t.declaration;
        y.types.isIdentifier(i) && (i = P(i.name, r.program)), i = W(i), y.types.isCallExpression(i) && y.types.isObjectExpression(i.arguments?.[0]) ?
        e = ve(i.arguments[0], r.program) : y.types.isObjectExpression(i) ? e = ve(i, r.program) : T("default", !1);
      }
    }
  }), !!e) {
    if (y.types.isArrowFunctionExpression(e)) {
      let { code: t } = (0, y.generate)(e, {});
      return (0, eval)(t);
    }
    if (y.types.isFunctionExpression(e)) {
      let { code: t } = (0, y.generate)(e, {}), i = e.id?.name, o = `(a, b) => {
      ${t};
      return ${i}(a, b)
    }`;
      return (0, eval)(o);
    }
    return y.types.isLiteral(e) || y.types.isArrayExpression(e) || y.types.isObjectExpression(e) ? oe(e) : T("storySort", !0);
  }
}, "getStorySortParameter");

// src/csf-tools/enrichCsf.ts
var u = require("storybook/internal/babel");
var we = /* @__PURE__ */ f((s, e, r, t) => {
  let i = e.getStoryExport(r), o = u.types.isCallExpression(i) && u.types.isMemberExpression(i.callee) && u.types.isIdentifier(i.callee.object) &&
  i.callee.object.name === "meta", a = !t?.disableSource && Te(i), l = !t?.disableDescription && ae(e._storyStatements[r]), p = [], d = o ? u.types.
  memberExpression(u.types.identifier(r), u.types.identifier("input")) : u.types.identifier(r), g = u.types.memberExpression(d, u.types.identifier(
  "parameters"));
  p.push(u.types.spreadElement(g));
  let x = u.types.optionalMemberExpression(
    g,
    u.types.identifier("docs"),
    !1,
    !0
  ), h = [];
  if (a) {
    let b = u.types.optionalMemberExpression(
      x,
      u.types.identifier("source"),
      !1,
      !0
    );
    h.push(
      u.types.objectProperty(
        u.types.identifier("source"),
        u.types.objectExpression([
          u.types.objectProperty(u.types.identifier("originalSource"), u.types.stringLiteral(a)),
          u.types.spreadElement(b)
        ])
      )
    );
  }
  if (l) {
    let b = u.types.optionalMemberExpression(
      x,
      u.types.identifier("description"),
      !1,
      !0
    );
    h.push(
      u.types.objectProperty(
        u.types.identifier("description"),
        u.types.objectExpression([
          u.types.objectProperty(u.types.identifier("story"), u.types.stringLiteral(l)),
          u.types.spreadElement(b)
        ])
      )
    );
  }
  if (h.length > 0) {
    p.push(
      u.types.objectProperty(
        u.types.identifier("docs"),
        u.types.objectExpression([u.types.spreadElement(x), ...h])
      )
    );
    let b = u.types.expressionStatement(
      u.types.assignmentExpression("=", g, u.types.objectExpression(p))
    );
    s._ast.program.body.push(b);
  }
}, "enrichCsfStory"), Fe = /* @__PURE__ */ f((s, e, r) => {
  if (!e.length) {
    s.properties.find(
      (p) => u.types.isObjectProperty(p) && u.types.isIdentifier(p.key) && p.key.name === "component"
    ) || s.properties.unshift(r);
    return;
  }
  let [t, ...i] = e, o = s.properties.find(
    (l) => u.types.isObjectProperty(l) && u.types.isIdentifier(l.key) && l.key.name === t && u.types.isObjectExpression(l.value)
  ), a;
  o ? a = o.value : (a = u.types.objectExpression([]), s.properties.push(u.types.objectProperty(u.types.identifier(t), a))), Fe(a, i, r);
}, "addComponentDescription"), Ce = /* @__PURE__ */ f((s, e, r) => {
  let t = !r?.disableDescription && ae(e._metaStatement);
  if (t) {
    let i = s._metaNode;
    i && u.types.isObjectExpression(i) && Fe(
      i,
      ["parameters", "docs", "description"],
      u.types.objectProperty(u.types.identifier("component"), u.types.stringLiteral(t))
    );
  }
}, "enrichCsfMeta"), pt = /* @__PURE__ */ f((s, e, r) => {
  Ce(s, e, r), Object.keys(s._storyExports).forEach((t) => {
    we(s, e, t, r);
  });
}, "enrichCsf"), Te = /* @__PURE__ */ f((s) => {
  let e = u.types.isVariableDeclarator(s) ? s.init : s, { code: r } = (0, u.generate)(e, {});
  return r;
}, "extractSource"), ae = /* @__PURE__ */ f((s) => s?.leadingComments ? s.leadingComments.map((r) => r.type === "CommentLine" || !r.value.startsWith(
"*") ? null : r.value.split(`
`).map((t) => t.replace(/^(\s+)?(\*+)?(\s)?/, "")).join(`
`).trim()).filter(Boolean).join(`
`) : "", "extractDescription");

// src/csf-tools/index.ts
var $e = require("storybook/internal/babel");

// src/csf-tools/vitest-plugin/transformer.ts
var m = require("storybook/internal/babel"), ke = require("storybook/internal/common"), Ve = require("storybook/internal/csf"), le = require("storybook/internal/node-logger"),
ce = z(R(), 1);
var ft = /* @__PURE__ */ f((s, e) => !(e.include.length && !e.include.some((r) => s?.includes(r)) || e.exclude.some((r) => s?.includes(r))),
"isValidTest");
async function Ae({
  code: s,
  fileName: e,
  configDir: r,
  stories: t,
  tagsFilter: i,
  previewLevelTags: o = []
}) {
  if (!/\.stor(y|ies)\./.test(e))
    return s;
  let l = Q(s, {
    fileName: e,
    transformInlineMeta: !0,
    makeTitle: /* @__PURE__ */ f((_) => {
      let S = (0, ke.getStoryTitle)({
        storyFilePath: e,
        configDir: r,
        stories: t,
        userTitle: _
      }) || "unknown";
      return S === "unknown" && le.logger.warn(
        ce.dedent`
            [Storybook]: Could not calculate story title for "${e}".
            Please make sure that this file matches the globs included in the "stories" field in your Storybook configuration at "${r}".
          `
      ), S;
    }, "makeTitle")
  }).parse(), p = l._ast, d = l._metaVariableName, g = l._metaNode, x = g.properties.find(
    (_) => m.types.isObjectProperty(_) && m.types.isIdentifier(_.key) && _.key.name === "title"
  ), h = m.types.stringLiteral(l._meta?.title || "unknown");
  if (x ? m.types.isObjectProperty(x) && (x.value = h) : g.properties.push(m.types.objectProperty(m.types.identifier("title"), h)), !g || !l.
  _meta)
    throw new Error(
      `The Storybook vitest plugin could not detect the meta (default export) object in the story file. 

Please make sure you have a default export with the meta object. If you are using a different export format that is not supported, please fi\
le an issue with details about your use case.`
    );
  let b = {};
  Object.keys(l._stories).map((_) => {
    let S = (0, Ve.combineTags)(
      "test",
      "dev",
      ...o,
      ...l.meta?.tags || [],
      ...l._stories[_].tags || []
    );
    ft(S, i) && (b[_] = l._storyStatements[_]);
  });
  let E = l._file.path.scope.generateUidIdentifier("test"), I = l._file.path.scope.generateUidIdentifier("describe");
  if (Object.keys(b).length === 0) {
    let _ = m.types.expressionStatement(
      m.types.callExpression(m.types.memberExpression(I, m.types.identifier("skip")), [
        m.types.stringLiteral("No valid tests found")
      ])
    );
    p.program.body.push(_);
    let S = [
      m.types.importDeclaration(
        [
          m.types.importSpecifier(E, m.types.identifier("test")),
          m.types.importSpecifier(I, m.types.identifier("describe"))
        ],
        m.types.stringLiteral("vitest")
      )
    ];
    p.program.body.unshift(...S);
  } else {
    let pe = function() {
      let j = l._file.path.scope.generateUidIdentifier("isRunningFromThisFile"), N = m.types.memberExpression(
        m.types.callExpression(m.types.memberExpression(_, m.types.identifier("getState")), []),
        m.types.identifier("testPath")
      ), k = m.types.memberExpression(
        m.types.memberExpression(m.types.identifier("globalThis"), m.types.identifier("__vitest_worker__")),
        m.types.identifier("filepath")
      ), V = m.types.logicalExpression(
        "??",
        // TODO: switch order of testPathProperty and filePathProperty when the bug is fixed
        // https://github.com/vitest-dev/vitest/issues/6367 (or probably just use testPathProperty)
        k,
        N
      ), G = m.types.callExpression(
        m.types.memberExpression(
          m.types.callExpression(m.types.identifier("convertToFilePath"), [
            m.types.memberExpression(
              m.types.memberExpression(m.types.identifier("import"), m.types.identifier("meta")),
              m.types.identifier("url")
            )
          ]),
          m.types.identifier("includes")
        ),
        [V]
      );
      return { isRunningFromThisFileDeclaration: m.types.variableDeclaration("const", [
        m.types.variableDeclarator(j, G)
      ]), isRunningFromThisFileId: j };
    };
    var mt = pe;
    f(pe, "getTestGuardDeclaration");
    let _ = l._file.path.scope.generateUidIdentifier("expect"), S = l._file.path.scope.generateUidIdentifier("testStory"), Re = m.types.identifier(
    JSON.stringify(i.skip)), { isRunningFromThisFileDeclaration: Le, isRunningFromThisFileId: Me } = pe();
    p.program.body.push(Le);
    let Ue = /* @__PURE__ */ f(({
      localName: j,
      exportName: N,
      testTitle: k,
      node: V
    }) => {
      let G = m.types.expressionStatement(
        m.types.callExpression(E, [
          m.types.stringLiteral(k),
          m.types.callExpression(S, [
            m.types.stringLiteral(N),
            m.types.identifier(j),
            m.types.identifier(d),
            Re
          ])
        ])
      );
      return G.loc = V.loc, G;
    }, "getTestStatementForStory"), qe = Object.entries(b).map(([j, N]) => {
      if (N === null) {
        le.logger.warn(
          ce.dedent`
            [Storybook]: Could not transform "${j}" story into test at "${e}".
            Please make sure to define stories in the same file and not re-export stories coming from other files".
          `
        );
        return;
      }
      let k = l._stories[j].localName ?? j, V = l._stories[j].name ?? j;
      return Ue({ testTitle: V, localName: k, exportName: j, node: N });
    }).filter((j) => !!j), Be = m.types.ifStatement(Me, m.types.blockStatement(qe));
    p.program.body.push(Be);
    let We = [
      m.types.importDeclaration(
        [
          m.types.importSpecifier(E, m.types.identifier("test")),
          m.types.importSpecifier(_, m.types.identifier("expect"))
        ],
        m.types.stringLiteral("vitest")
      ),
      m.types.importDeclaration(
        [
          m.types.importSpecifier(S, m.types.identifier("testStory")),
          m.types.importSpecifier(m.types.identifier("convertToFilePath"), m.types.identifier("convertToFilePath"))
        ],
        m.types.stringLiteral("@storybook/addon-vitest/internal/test-utils")
      )
    ];
    p.program.body.unshift(...We);
  }
  return ie(l, { sourceMaps: !0, sourceFileName: e }, s);
}
f(Ae, "vitestTransform");
