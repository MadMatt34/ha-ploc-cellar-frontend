const no = globalThis, tc = no.ShadowRoot && (no.ShadyCSS === void 0 || no.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ec = /* @__PURE__ */ Symbol(), uh = /* @__PURE__ */ new WeakMap();
let Fd = class {
  constructor(t, r, i) {
    if (this._$cssResult$ = !0, i !== ec) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = r;
  }
  get styleSheet() {
    let t = this.o;
    const r = this.t;
    if (tc && t === void 0) {
      const i = r !== void 0 && r.length === 1;
      i && (t = uh.get(r)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && uh.set(r, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const xy = (e) => new Fd(typeof e == "string" ? e : e + "", void 0, ec), ca = (e, ...t) => {
  const r = e.length === 1 ? e[0] : t.reduce((i, n, a) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[a + 1], e[0]);
  return new Fd(r, e, ec);
}, Ty = (e, t) => {
  if (tc) e.adoptedStyleSheets = t.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of t) {
    const i = document.createElement("style"), n = no.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = r.cssText, e.appendChild(i);
  }
}, ch = tc ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let r = "";
  for (const i of t.cssRules) r += i.cssText;
  return xy(r);
})(e) : e;
const { is: Cy, defineProperty: Ay, getOwnPropertyDescriptor: My, getOwnPropertyNames: Dy, getOwnPropertySymbols: ky, getPrototypeOf: Ly } = Object, $o = globalThis, hh = $o.trustedTypes, Iy = hh ? hh.emptyScript : "", Ey = $o.reactiveElementPolyfillSupport, Nn = (e, t) => e, bo = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Iy : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let r = e;
  switch (t) {
    case Boolean:
      r = e !== null;
      break;
    case Number:
      r = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        r = JSON.parse(e);
      } catch {
        r = null;
      }
  }
  return r;
} }, rc = (e, t) => !Cy(e, t), fh = { attribute: !0, type: String, converter: bo, reflect: !1, useDefault: !1, hasChanged: rc };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), $o.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Fi = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, r = fh) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(t, r), !r.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(t, i, r);
      n !== void 0 && Ay(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, r, i) {
    const { get: n, set: a } = My(this.prototype, t) ?? { get() {
      return this[r];
    }, set(o) {
      this[r] = o;
    } };
    return { get: n, set(o) {
      const s = n?.call(this);
      a?.call(this, o), this.requestUpdate(t, s, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? fh;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Nn("elementProperties"))) return;
    const t = Ly(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Nn("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Nn("properties"))) {
      const r = this.properties, i = [...Dy(r), ...ky(r)];
      for (const n of i) this.createProperty(n, r[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const r = litPropertyMetadata.get(t);
      if (r !== void 0) for (const [i, n] of r) this.elementProperties.set(i, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [r, i] of this.elementProperties) {
      const n = this._$Eu(r, i);
      n !== void 0 && this._$Eh.set(n, r);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const r = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const n of i) r.unshift(ch(n));
    } else t !== void 0 && r.push(ch(t));
    return r;
  }
  static _$Eu(t, r) {
    const i = r.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), r = this.constructor.elementProperties;
    for (const i of r.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ty(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, r, i) {
    this._$AK(t, i);
  }
  _$ET(t, r) {
    const i = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, i);
    if (n !== void 0 && i.reflect === !0) {
      const a = (i.converter?.toAttribute !== void 0 ? i.converter : bo).toAttribute(r, i.type);
      this._$Em = t, a == null ? this.removeAttribute(n) : this.setAttribute(n, a), this._$Em = null;
    }
  }
  _$AK(t, r) {
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const a = i.getPropertyOptions(n), o = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : bo;
      this._$Em = n;
      const s = o.fromAttribute(r, a.type);
      this[n] = s ?? this._$Ej?.get(n) ?? s, this._$Em = null;
    }
  }
  requestUpdate(t, r, i, n = !1, a) {
    if (t !== void 0) {
      const o = this.constructor;
      if (n === !1 && (a = this[t]), i ??= o.getPropertyOptions(t), !((i.hasChanged ?? rc)(a, r) || i.useDefault && i.reflect && a === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, i)))) return;
      this.C(t, r, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, r, { useDefault: i, reflect: n, wrapped: a }, o) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? r ?? this[t]), a !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (r = void 0), this._$AL.set(t, r)), n === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (r) {
      Promise.reject(r);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [n, a] of this._$Ep) this[n] = a;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, a] of i) {
        const { wrapped: o } = a, s = this[n];
        o !== !0 || this._$AL.has(n) || s === void 0 || this.C(n, void 0, a, s);
      }
    }
    let t = !1;
    const r = this._$AL;
    try {
      t = this.shouldUpdate(r), t ? (this.willUpdate(r), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(r)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(r);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((r) => r.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((r) => this._$ET(r, this[r])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
Fi.elementStyles = [], Fi.shadowRootOptions = { mode: "open" }, Fi[Nn("elementProperties")] = /* @__PURE__ */ new Map(), Fi[Nn("finalized")] = /* @__PURE__ */ new Map(), Ey?.({ ReactiveElement: Fi }), ($o.reactiveElementVersions ??= []).push("2.1.2");
const ic = globalThis, vh = (e) => e, So = ic.trustedTypes, dh = So ? So.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Ud = "$lit$", _r = `lit$${Math.random().toFixed(9).slice(2)}$`, zd = "?" + _r, Py = `<${zd}>`, mi = document, Qn = () => mi.createComment(""), Kn = (e) => e === null || typeof e != "object" && typeof e != "function", nc = Array.isArray, Ry = (e) => nc(e) || typeof e?.[Symbol.iterator] == "function", Cs = `[ 	
\f\r]`, hn = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ph = /-->/g, gh = />/g, Pr = RegExp(`>|${Cs}(?:([^\\s"'>=/]+)(${Cs}*=${Cs}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), mh = /'/g, yh = /"/g, Vd = /^(?:script|style|textarea|title)$/i, Oy = (e) => (t, ...r) => ({ _$litType$: e, strings: t, values: r }), E = Oy(1), Ji = /* @__PURE__ */ Symbol.for("lit-noChange"), O = /* @__PURE__ */ Symbol.for("lit-nothing"), _h = /* @__PURE__ */ new WeakMap(), ai = mi.createTreeWalker(mi, 129);
function Hd(e, t) {
  if (!nc(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return dh !== void 0 ? dh.createHTML(t) : t;
}
const By = (e, t) => {
  const r = e.length - 1, i = [];
  let n, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = hn;
  for (let s = 0; s < r; s++) {
    const l = e[s];
    let u, c, h = -1, v = 0;
    for (; v < l.length && (o.lastIndex = v, c = o.exec(l), c !== null); ) v = o.lastIndex, o === hn ? c[1] === "!--" ? o = ph : c[1] !== void 0 ? o = gh : c[2] !== void 0 ? (Vd.test(c[2]) && (n = RegExp("</" + c[2], "g")), o = Pr) : c[3] !== void 0 && (o = Pr) : o === Pr ? c[0] === ">" ? (o = n ?? hn, h = -1) : c[1] === void 0 ? h = -2 : (h = o.lastIndex - c[2].length, u = c[1], o = c[3] === void 0 ? Pr : c[3] === '"' ? yh : mh) : o === yh || o === mh ? o = Pr : o === ph || o === gh ? o = hn : (o = Pr, n = void 0);
    const f = o === Pr && e[s + 1].startsWith("/>") ? " " : "";
    a += o === hn ? l + Py : h >= 0 ? (i.push(u), l.slice(0, h) + Ud + l.slice(h) + _r + f) : l + _r + (h === -2 ? s : f);
  }
  return [Hd(e, a + (e[r] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class Jn {
  constructor({ strings: t, _$litType$: r }, i) {
    let n;
    this.parts = [];
    let a = 0, o = 0;
    const s = t.length - 1, l = this.parts, [u, c] = By(t, r);
    if (this.el = Jn.createElement(u, i), ai.currentNode = this.el.content, r === 2 || r === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (n = ai.nextNode()) !== null && l.length < s; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const h of n.getAttributeNames()) if (h.endsWith(Ud)) {
          const v = c[o++], f = n.getAttribute(h).split(_r), d = /([.?@])?(.*)/.exec(v);
          l.push({ type: 1, index: a, name: d[2], strings: f, ctor: d[1] === "." ? Fy : d[1] === "?" ? Uy : d[1] === "@" ? zy : ts }), n.removeAttribute(h);
        } else h.startsWith(_r) && (l.push({ type: 6, index: a }), n.removeAttribute(h));
        if (Vd.test(n.tagName)) {
          const h = n.textContent.split(_r), v = h.length - 1;
          if (v > 0) {
            n.textContent = So ? So.emptyScript : "";
            for (let f = 0; f < v; f++) n.append(h[f], Qn()), ai.nextNode(), l.push({ type: 2, index: ++a });
            n.append(h[v], Qn());
          }
        }
      } else if (n.nodeType === 8) if (n.data === zd) l.push({ type: 2, index: a });
      else {
        let h = -1;
        for (; (h = n.data.indexOf(_r, h + 1)) !== -1; ) l.push({ type: 7, index: a }), h += _r.length - 1;
      }
      a++;
    }
  }
  static createElement(t, r) {
    const i = mi.createElement("template");
    return i.innerHTML = t, i;
  }
}
function ji(e, t, r = e, i) {
  if (t === Ji) return t;
  let n = i !== void 0 ? r._$Co?.[i] : r._$Cl;
  const a = Kn(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== a && (n?._$AO?.(!1), a === void 0 ? n = void 0 : (n = new a(e), n._$AT(e, r, i)), i !== void 0 ? (r._$Co ??= [])[i] = n : r._$Cl = n), n !== void 0 && (t = ji(e, n._$AS(e, t.values), n, i)), t;
}
class Ny {
  constructor(t, r) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = r;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: r }, parts: i } = this._$AD, n = (t?.creationScope ?? mi).importNode(r, !0);
    ai.currentNode = n;
    let a = ai.nextNode(), o = 0, s = 0, l = i[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let u;
        l.type === 2 ? u = new ha(a, a.nextSibling, this, t) : l.type === 1 ? u = new l.ctor(a, l.name, l.strings, this, t) : l.type === 6 && (u = new Vy(a, this, t)), this._$AV.push(u), l = i[++s];
      }
      o !== l?.index && (a = ai.nextNode(), o++);
    }
    return ai.currentNode = mi, n;
  }
  p(t) {
    let r = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, r), r += i.strings.length - 2) : i._$AI(t[r])), r++;
  }
}
class ha {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, r, i, n) {
    this.type = 2, this._$AH = O, this._$AN = void 0, this._$AA = t, this._$AB = r, this._$AM = i, this.options = n, this._$Cv = n?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const r = this._$AM;
    return r !== void 0 && t?.nodeType === 11 && (t = r.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, r = this) {
    t = ji(this, t, r), Kn(t) ? t === O || t == null || t === "" ? (this._$AH !== O && this._$AR(), this._$AH = O) : t !== this._$AH && t !== Ji && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ry(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== O && Kn(this._$AH) ? this._$AA.nextSibling.data = t : this.T(mi.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: r, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = Jn.createElement(Hd(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n) this._$AH.p(r);
    else {
      const a = new Ny(n, this), o = a.u(this.options);
      a.p(r), this.T(o), this._$AH = a;
    }
  }
  _$AC(t) {
    let r = _h.get(t.strings);
    return r === void 0 && _h.set(t.strings, r = new Jn(t)), r;
  }
  k(t) {
    nc(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let i, n = 0;
    for (const a of t) n === r.length ? r.push(i = new ha(this.O(Qn()), this.O(Qn()), this, this.options)) : i = r[n], i._$AI(a), n++;
    n < r.length && (this._$AR(i && i._$AB.nextSibling, n), r.length = n);
  }
  _$AR(t = this._$AA.nextSibling, r) {
    for (this._$AP?.(!1, !0, r); t !== this._$AB; ) {
      const i = vh(t).nextSibling;
      vh(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class ts {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, r, i, n, a) {
    this.type = 1, this._$AH = O, this._$AN = void 0, this.element = t, this.name = r, this._$AM = n, this.options = a, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = O;
  }
  _$AI(t, r = this, i, n) {
    const a = this.strings;
    let o = !1;
    if (a === void 0) t = ji(this, t, r, 0), o = !Kn(t) || t !== this._$AH && t !== Ji, o && (this._$AH = t);
    else {
      const s = t;
      let l, u;
      for (t = a[0], l = 0; l < a.length - 1; l++) u = ji(this, s[i + l], r, l), u === Ji && (u = this._$AH[l]), o ||= !Kn(u) || u !== this._$AH[l], u === O ? t = O : t !== O && (t += (u ?? "") + a[l + 1]), this._$AH[l] = u;
    }
    o && !n && this.j(t);
  }
  j(t) {
    t === O ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Fy extends ts {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === O ? void 0 : t;
  }
}
class Uy extends ts {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== O);
  }
}
class zy extends ts {
  constructor(t, r, i, n, a) {
    super(t, r, i, n, a), this.type = 5;
  }
  _$AI(t, r = this) {
    if ((t = ji(this, t, r, 0) ?? O) === Ji) return;
    const i = this._$AH, n = t === O && i !== O || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, a = t !== O && (i === O || n);
    n && this.element.removeEventListener(this.name, this, i), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Vy {
  constructor(t, r, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    ji(this, t);
  }
}
const Hy = ic.litHtmlPolyfillSupport;
Hy?.(Jn, ha), (ic.litHtmlVersions ??= []).push("3.3.3");
const Wy = (e, t, r) => {
  const i = r?.renderBefore ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const a = r?.renderBefore ?? null;
    i._$litPart$ = n = new ha(t.insertBefore(Qn(), a), a, void 0, r ?? {});
  }
  return n._$AI(e), n;
};
const ac = globalThis;
class Ue extends Fi {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Wy(r, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Ji;
  }
}
Ue._$litElement$ = !0, Ue.finalized = !0, ac.litElementHydrateSupport?.({ LitElement: Ue });
const Gy = ac.litElementPolyfillSupport;
Gy?.({ LitElement: Ue });
(ac.litElementVersions ??= []).push("4.2.2");
const Yy = "data:font/woff2;base64,d09GMgABAAAAAFsQABAAAAABLUAAAFqsAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGoNeG7tkHJNMBmA/U1RBVEQAhTARCAqD0miC7xkLhWwAATYCJAOLVAQgBYVWB5NBDAcbbvcl4m2Xi9vBmKP+381ZwY69hNtBVJMC340MBBsHUPDYq87+/3tyMoYwF8P0avUGKVSVxXb1m3sfdKMsiARhwmTbbBJ60Cv+XW7xVse83sGAoISptEfho9AWympaTtnBm/599Srw52JZUUEQL65Af1X2wI5OtW7sQzNjhGdg28if5OQdnp9b78eCbcCimx5r2Ea1gESLSghGJFadePapZ2Vf6WnfnddKUez37/fsuUFwKpqFY5avYqNQAyoyLp6Vig9/oCd/4d7s3pE0gCO+TqEcwRgD/YNz1mZ39kEYEvKVIlB2Z1sbGEHaFHEAmDZHbvpUHq1OA7GpY9xmRF8PyMXmrZkBGOiHTt9Fvz3pDhEjMDlK+xjb4FJ/rcOSMq2ZUgD/LTAAQBD+bfdlNykomXTJlwFPXN5872bN3HlSTiM1A19xz2SAaQmyXfbcy2/5jSCtA4WlhYrqW7b9v6FrgtsDFb1G10Zni07d5i2j618oWqejhEy3rjQTQv1gBBIEYPwZgWBrLW+foYASfSs7HvDu8h1EITGxid1HaCvMg6tED0ldfT3/Oq3a/604keNk15q5RU4WsGgcb3bgiFuCopG/ZEuWrNiWg86gPRRP5jbxsOfAsq3/Y0jiOFkCDizNHCFVu1wdAHbA3T2lW6ByymLvqquAu+aKcsstymvK6xj6n1ser4ybxWawlbX3wRiEBUFrMW7RZsum4N9PVeoXeaPq1LUyNjIqjWEvsGOjEJJ7kSP//PyM7fzs5bhrSHKGrE44ASlLWanjLnWsCVDRmIQVoMI/tMxZZl760D51z4EMUSdsWJpxGHlJ3/3UHdocpTaHQ8gIjXCopsCiFMJFyMAYHNCAIZy9yjDooCswt3qxCjRaeo3/touhkrQTxRpESsN/5kzfL3BFc2K5hg3w6zBly5jb3nrf6B49Nu+WNIQggwx2EJEwHaxdQpD0+mqtxC22RQPBLBW7tikUeTG58PM/+7X+o9FmXnfpc5atKVFQUFHA7RyEtLrvfRJA4JgBEANA7zNiBMBfPnjpgUuO2GWT5eaaoNsADSoVyRIU5AKDlSgFwA6nwCAoqAOjmW9OMC82LzALPctO2Qiw9DQ0ZVvAn2CHDaujKTEGn8N2mQyyLwhzyiTwpa8LYHGZDr5WupMqhrFkeeVgNnQH40UUg0pbGFZmO6hA22lnAy4HBnKNgdzdIeSBhyAvGMhPDOR1G+SdDyPz2Wfb3/5ZKwBhUAjD4CAcQ4AIjJaOMTIxbj4mLMxkyFCzGDGP3g+DqtEcAgIDgA8AEhhcjcYAdE1zWBCopiAAELi1Qfd/r05EeWFoI4nySkcmCPdmNWqihALf/4W5DvmREHPjp9FE/e00jfBv9UOE0IHVlnBEFIxAYfz3TAgA+B2TPoWPUbt5sGCCOlRYZBACCLQpLxdoEwGQYOkpiXHRxYBMn+VBvu8vkJOjDTJkHgapcaE1Y+PmSxPYAFhz66aPTfTWlbxoEZH/LZm8ZSB40MYX8x9o49JIyJULiyeEgl9ds8dyU3Srk8fNSApet0cbO1xlXDASrOd23BNkhWedWvtLVF+7i9a22s22ThO8HEXW84vJS13AUN6lSnS4UtdulH7cj2qpNNU+5mZpx9hD17cy1QfmN3P7PO6yhXfQOln6g9mrpbvisRg9qqqS+Fj9ZQsBGrZl85evWUZoUSLI/jAhtcjXM0ACAgYQMICAAQQMIJCBdZPxseoBgCFAIAAECASAAIEAECAQAAIEAkCAgAEEDCBgAQKNdJGb1r8ddtltj332O+iQw4446pjjTokSSKIDCozt6yJix6+5PVtm3PiR7wvZd3zz131V+tLP/9LwWZ/ycR/hZcje/ba3vA4qk0ue94zswbufePuA8epLpyIg/JkV8+QTUBT50l996k0jm4Gfe9aDVAm71ZXOdaJD7WE/0P59bWtTa3IK8nlsK1vc3Es4uRlNagzQxRvWoAbUVE3lcNVAUXJO4fxWruKzpk+ZOG70ZvcYBI/A8H8+e9lUwh+81a9+9MQ9N1xyxrFKhtwH7LLVhvDVFVlejbH/TE0V+addaI5pJhhliA6tlmtQpUyBLOm8JetkTh+YackJsZlPWFGRYCxMOID+9HvvvOzpu/FpX3jkjmsuOOWIfXbYbN1+Wa4E+dot52j1THv7dM4pve3rZm+vpslXCYeXhD3Ebld6kout57JwGQuNXy1YXRDnvamOT83thbA+zEL/YvyHYRVn+cenQL3T1s5MkCO0Eeb6vvPhRh5ePoSKGwgt08s5A7ozWt/IzptJ3EUZMckt/+y4yrP4aKpI8sCfmfy70aLWstlHDJ/5k6+83/F7f83H5WTJfMH4E3dLC5zPW0B4aArGuLg9VeIxVmNmtepmfbsTknGenhdTNW1KNXo2sMQvA/FlDkB72+vVvQIz1tVznMpXqpuzTk1L87xw+w1kp2d8Xk11kiHAbTJ2dC95wTgVQBlDLBQuMVUT5hePi/OcxB4HHuZ5RMBTMIZ5vWFXXJutAqfPC9CzfgYPNyxkNw+5UQDUKiGlxB0FeXyzSwOhdD7ucVswzvbNYOPm4i0b37ODnexiN3vZx34OcJgjHOM4JznF6XD2oafz+cBFLnGZK76+bWq8fUgOzmAO2iD/nRAkuxlBpsjuLQPHSWNa6P3idu9UotBmfnOZm5E+nzTjSPyYL/vIERD0aPjL8X/55M30nz3zwK3RK+PnZj/RHML699hmkzVWWmwuTJ9hkjGGvTzIM1+8sTVzaRDXnIhpJw0oTWrqZo35YbkiOTQYvy/MzyWeFdBLSTx6aJx7cNf66WJgPAyjgf7rcx8eZv7qR0/ce/HG6Cc8Vs4+JFiLhy6ZPWcm/JJjDti1brYarm6w2vx9uYXmuOeJaSbMSqOUOhHo+QMwY9b6SspsJKgqMJzaVzcp1etIkdDNWJjyeCp1cs8XPJx+NJMXHyR/c4TvWcpn/oxfU2iclPzFOCYzg/9Ywqv4UwpwIxalNrISPTYCXCWDSvyQGEMsFC4xkel0swxVLJuyOlnjDZYRQEidBgjYd6KG+l5jg8W0iFD5cpXtyj0I2uqdvvdB2/zj7ZXPjtd35eZtd4Wzj/0c0GHQfixICEzeiXEYvjYfFnYPCkBf6SMgAAAAsEacUZz40Z/nEAnNV42t30wB0NMC9WA+OMbIo3mb1/ThaUE7FRv5Y9UNNsj9/7CzLrjsrvshEBEiQdEQHQMbj4CQiISMgoqahpmFlY2dg1OceAkSJfELSBdSHowLBoOcdRbW+SCcC8K7KJzLwvnt1aiIUDRAUv0gNCZWmNjoQpOeDfaNqCAJyaqMq9DkVZgUXXA2Z4P9UBOaU19oVo6QYULwpQuBLuQ6I6Ry5bCN5GNsJsbcVQrG/bAdH5IBLqtReDGfVR7logwQ8Cg8b4Bmh4CBgIGBA7TRePC2OxHAG2+FAqT1UT8nJRE0yRLo21vB/2VFt+QK8a2DmigELZutAttnO8K86cXnLB8cdczyjXezu3WPiOF5cXLH8bNQEbKu/JRSofzlWMUFwKad/h6SeEgXfNMps0BwPgcAmiJl2gXLUZ5Uv62k4q4uPfesAsi+fEC7EC6Ygmj1urWGVPSu/TKyrtavkPdCCAqQu2mVQrtyn1NA9JU2+fH3JghLOQb8q6EI8DxzBWW56Q3Z1DT4lBydTINelZ29DCcS8o1AxYtp0fAmuM4CF4uGwAW1uAnH9ooZbV57tboIgIG6zhYzR4pGMqwBNpUDpwd42YnkgggRQKtajmY747SK/R6NnAopgcNQNujGxQuoO5SiRlN7+XSQuaxH0fc8fryBq2bIgWDQgW+v42Q29QVRUj9ja3AplJe8+SkfNZo6qAXKCXeKk+eGFnZ6++YRbXuyjhwOcgi09x2lAB0laZG0JETcun19m5+276snfdZ100fXlJsx8ra7Lz/zFkcxqEWnoNezKoAAI+EitFCbRnsTRYNBhw7/+hkLBy8WCxsHF4+CkoqahpaOnoGRiYWVjYNTnHgJEiVJlsIllVtAULqQsIgMmbJky1GgUJESpfooV6FKjWYDdeg0SJduwww3wSSTTTHVNDPMNc8CCy2yVK8NNtrkO5ttsdX3dthlj/0OOuyoY045uzmmK+s8mgqQGOCHOAhMmK5gBrMJZheV4/VYTkmQwksMF8wuv0TzQHwBwYJChAaxPywHRq78phDCKDK8KiVWGYTVR0TlwqsQpHLA6quqqYGIasVVJ1SjuJol1PonkYHaEXXohhpe9eONMB5kgvAmCjJJqMkimiK8qUJN62eabgbULKMSFJL5EGqBxXIUmsUQaqkgy8S1XJCV4vpGIquE19tPsdp6WBtEsbEfb5MtIFtF9r3wtgvrlMjOiuO8eC5I4KJ4Lpu3/Ydg+s4EFnSiIECHDosooqBDh0AUBAgQLkXVSQuKcEQbcAL6EAXDkoRiLaqdwsCBCRVUiCwQn8MUtQARC88xCimQdDIDCqwAJkOBlUAUpcLoI0S5aCqEVyW8GmE0S2Cgo8QvGMMgjOFGwEiFGREcMSxxzTgZLfW8yJBMl3dRQEfXoGmigYdaaHYEIXYJsUcY+xXloBCHhXFUUY61iLwJ1UwZwZktoNl7OSRgwYGDDRYsbNjgwIIDB85YeMoBIXX3NlErkOY7kc+/x7sHFB5xCEZnKA925zX2o4oQ5SkLiME/Pk/BqBe+vOpCemFWtSPiKauWZmX4q3E5GZGupSA8cE1edOIRMFHLB7zfigGxgIzVia5DqkOsQ6gTVQdfBwd2+Xj7azw+f9lISm116yBwqba2fxs4UTdgYH9w6N9K/Cewp7W5sRpsax3Q1R9sah1Y2wrWOFaymLnMYBJjGNYMOjbsAAM+nwAHkKZZYsGDgwgBLFFgIIFChQslkG2aIUMlDvh2TGy8DR1vwvvOfe7e9fJZuu+CO/H6a3Xv2ndNuur292XXltlhsTY15JjF6yT7uARxABPT8lPg+vkalptvhglGGKRVnXJFcoT5ucSz0lM6CdbmBFit42DTHQOb7CjYQEfAWh0Gq7ETrNoOsD4OQVSb7uAoTXZAarNfGmif1GqvVGuPVGO3VG0X63MkSku5oYQ4QJBxtNpWUGGj7P//CbsgBIA8EgJL902xzZBGajMAHC8vTeFZQQ1hiDQUGjgALD4Ro4BCTqZQOJ1UZBW3mRL9cjFNMUCBRGJY8MYNB6w2QQsvKa/LC4xIjKlmmNUG5ZC/dG+s4cbotXpDUpS+dApl9eKxgbOpqL9w4KLtf7hr4CBurPMyUvO1h2mNsbYHheG2HKJNNo4oG62JiNWWRViv2Yk3y7j0cacZBRlt4n1oJ7af/OwXL73yq9feeOuhRx574qlnnnvhBz96l4y8U5cQ6qwHALQXfTPAmTEav5HJ+v6kYlxzw0233HbHXffcd70cufLkB0OcdRXoVs8cVYbsCHVLyuP9ByUyioFgI8OHAiRJ58KM0oVwJVfEPTGCcUTtCIuBDUvMg7+g8y667EGu95OM4L2PPvnN7/7w2Z+/SqYKAvde/vav//zvi68BKAgG/9w0RajzZ9RhXxQPnCBIkKghV7tZWz07lBJXGwMkXJwKQLQvcM1iqlMK1XGytlb0wBioNOlWtonzULDUCkbyEfn4dxifq9Ayy62w3dKagxAR0WjFi2g0xiyrbaoukkK7GyzFWOvTIEZBk2IEhUY6wej0V4YcNchoOV+7RuQXqDgEztGBvl8obbGJMfvPC8fssdlqi41SxyuekRwEVQWufnKVCTMTofiYyAhGLcnoUWxohFjbyPK6X3ChQ1FhsP8QoUvoFAYhd3l9kvKGyYWaxSUW1IJGUPqrBJkg8ZcKIkHgErqoDsL9xIpCwSem4BRWq27LOvNwM/TaqMp+OQxuEMgYXz6Ak7GnF8NgSdeqv2+gvfI7DAA/nJIAiFzOhU5n1fFcNAZohJYkPP4vbPdNjhH/d5e/ngfQI3hPAD0NAHAkvxIAMSSgRw4A3dnk+9z+LdEgAvA3wisNEjgdSkqGiwaAQW9dAFoH9VwABoTSKTiK6Cz/kr3cMGAWCUbZ5WsW+XNozsyDebQQgiJRiOwJix/id/GXmCsWiqVipdgmThT7xUYplfSU8yrql+cEgJhVolX2ZJE3B+MzAbIgHPGpNDFbzF+TVZxQutB6v3qcL+u/zP8y70vtl5r4fwSeRz+Peo5/TgcAgGf/Pfv0nPrs67Pps95n4qdXn1556oNjJQ0gXgDU+DVqAHptDZwIvYKzemQxdEI7ce7e95qhrxRJtHRECjAo0ElaP+4CP4IyJUrxJBeGlQsnSqx8ZBQsHFyljbewKWDvYii9i+t5MpIyqaTRr95OBa+0cYNDa+q7eaA2bbJJXQo2/Urm+/e7OL0gg3IUXGFZIrKlSdXC3emcKih5tPHp8xBq5aLrtyOCM8XBQCiEhfhldU7EHJn3j5EnBhFJNCYaOgY8OUNHJmjynopYUh/mYd2stllrtW+tt8Y6G1TY0jd51/00atKsr2HGG2OsicZV3AQ9ZpltjoUmW8Ts+wbpbG3t7Bw1Xkosel/0/2JFAK3dEMDfAsi+QO5xAvp+8Ow1ayZAdsf4wuArAkNnDoEBByPkMcTYUQWUSNkodBOIRbGIuBCAZMPQNyNEdCEaHgYvo1wDVN3sJpJnLMyj4NqbkqlC1YFYdNmMgkaKfQEMx8EMIgopTsvwbGaQjYWtcp0waChTQ9auRGDQPAeE064QhXJX8QggyhAgqkcjdJU1ZoTeRBjWDLWxkD5kWjmGOWrBWixvhUu7Ct6cKpwapfTIjdQi+Jn9IPKh3Nx6jQfxrxyJAsCAAhqfOXM3U7N6UJnxjGYGM54U6Bi5xcK427vM5yCcVfgNolkCyzJbIDK+AJL0WbrAXwWycf7zrPgR2MePqyu54iu60rjiRTaErXNhGHEcbwteOZ59FfHqCQoZGbMMKKgx+VlzrAxD/ewNCzEsi974ovyvZzuWLGrbOi96VErWVBetblsJndBSa8DLQ6azDJULq8oURX2vwzlU1uWZN83is8gAIBQASXqSgF+KNGmdZjJqbnNKcxaFAQAFNPhZ6XtpQ3d3hzuNIUOluLWLnGRffp0Fm1z+FKGAghqTn7V2lF75caXYaW2jSmmwf2nPtPlUqD/5JTZk08Guqecsq82W1hruSUoPvasx3ZqdOB4zkEgJWa2ImsBZ4OoowOkQmX20LZeW/O4VRjmGJcv7q3I6re97a+vlbojyob7rZ9ZeOhKiL9vMmrJfT10+mewnYhpK9ExP1+wI9uI+4YF49tmQic2QFRjA2Z6MRRUYiG0HwXyeZTFFAMv59n7N5/33aO3zU3C7FGDp1RzLuAtxadEVzs9dGKlHRBEwY4DQpV3UkGxxQyRnZ0Ta0/CCRzdRQaJ5LtLIxuXXiOO/Z3T6T+duABy5LaBqaM6vApaijVMIqstWjMeMYw2ngYwrXhJ6EAbbU3rxImWK5Q4Q8ZW3+hUBJ77SZBHLQBZhYIF7gSTTxNHf47R3Lm5YDoLPUj/oPGTvmdMBV8fD+WNEw6yjdz5KXvJLjfj00qpJ7UGZEYZcuDUtVyivQaYroTgaopgwvlnTx8uhcBAmi/JrV2k5RSgshT0wPeKtUXuqhoCpxulhr/NlAQh+BiiFqE8WR6Fz5plxC3v9+cdpI3ChAiooU0gioAFoAgT/cDB7A2A5inOKV1TGVqoNKXHNfk7n4awkFjZdi/FwGYXkrdVM2QPn9uuq2gioDnpS8/rZho2I7tz1UXkHzJgw0uiwQJnKpOyrCxEFd0ktfdsfUQOvinJ+Kzt5Bnm6Wo487/mdGvHj/Jxh3QZy2P1dAJrIIgVwoiCjaA5rkHSaqQJe3lgxANc5P7mYo+2py45mZxRAc5OUSF7UeKRLio9TjWvmb2aFksmBDPLgu8YAj3KqdEaoh9m3Se02ufD33DAjLqo0tQoTg8zVcHBl0egHrn2CCXRRYlzV1ba09NUPgDQHdvMOmKrhcO9T504JsysKI8ttnJYRvz7HrEr1MTXoMvYzNJtNpuJHgQDAyZFfzXmvplt/Dpadd0uaPNBSqIoYKbs6arQd7+ntreNIadR3+Y3QI+ilzmsvZYH7cu+jHI6K81dLHJclDU+RVCwmq5UqXB3klfll4xmLs7YVjUXQaGQK7gpOveNaslrUg4D7curABMZPYq4j71iWFweeU2/O0maK6iPJKNNbX0SJIZSTnzisIRTBtjZIHE37fFx2toUBNnSfz5QUqJs601VP+vkTLIPPVZcGFC3D1YPrT5xyDMdc01dRpJHK/6ZJzMt0hFUsRC4ocLCw5G2B4zKtX+aDGDPdEqd7XpkV556udMBSUwW7qipzKmYVSb6KzBUrXrayBMelyCqETjjSTqNwb/B4X9vYDkrSXO3rzXjpytOx4DDne1dT6no8zjfPjEL7QTdDBhVBO4fZsJsK03LM0sWcHcvnIHGYudYr0LGg57aaky7pvoygBZhvd3SoKCLF6d9SdIx5TQRfpw0DBJhXMvSUwWpqb36ixe/QDFgW1GDpTMGogF6BWdIF4kTYZV7aHBkOGjsks09pm0QYJQHV0m8nlj3ZamSBc2Um9AEprvxQvbhxwHGZtFg9uOrP0EyNaIm4JDYpXf187Jr5yFSxy056Dlkk5YOnI6fDgs4uZhS+yFwSue1nV1JQ173HaKa8Rfk1YIWJ7pFFiH8Iz/dKTNGjY5evcP/+SXY7NuGkODfhrWyR4jGakYABViWdPsngHb51p6GBpmWkqzi1ANYgE5JCGhHmpQxfPyoe58s0ERQC6i9voBihXEO4nrxnAw5icx60WbBMbQI1GSsjIquuetU/Rn2U0zKPA3Q4zpAineEBwkydBAjjzqrpj3DvU/ZEmFlkuvog7CKAi98eV3COGiNcsGgykQLN1MEQIbjQV5JNjiaWa2suRtomYnNVUBowK1zagS9hbG2hktLHx4K757c2GFaWKNLkrIr4aJtZpHeKmeleIoutx7nHfkgtjWVnnls/S7ySVkBVAaZ4ZsHHnO+JsOOc2OCXorsIZnQLdI05HJG3puEEKNsD465RbVec6+tlt36FkL4jGb4r79b/xV+STv6ylXHlKrJdjrv8BV5qz3HobZhVsrW4XoDUezWxJCajNpq8kqAlJYymU40PYDKM68FTbjqFALE8PY2Ky8blAeveBLVaCKHmKMnr/fhnoNg4zcbNr3u+A2Xze7RXLVgBlmKUxvyQQnXXqdPt9UQdP2uQcTdMNrY6vAesEFNUyr93I8Dec8/i+vmqTxhJMdvEpa8+W8nb8pJdSVbkDxPcibwIBBmAPbweBQgyuTCiNTNbS9t4dxhhFL6T1uNwxXw3kUn73ixkHunB5kXwQ2zylpNc9VVsLQt1JLlFbSRM7PMZoBvcR/ce5jBrwrz5JXZMSXR75vk0qDA5cq1wMgBUoL6Q+lSdYM4hDJxghW5OZIDcm1wkPF8LFJfEZ3XRpJ9TSvipIARUMvrcSudQhWBKMMqXNhftOa0i9gLoGFVhQKYA/Yn1U6Stb6MhtUyOHh60M8jQusZRiZ9SMSTP7fSVGlHlMa6cGI+D0d5DkghI+W5DHU2WxPCtjkR6WGjrTquHeWhRpFB8hJA9f2S2OITHvaxUPHmVMzGqxRG10XW2K6lzXb1md/IspEaeuTrTPG109j6pXY2ek8//2+jER8JjdWHSSwtOmuyE1Ux8mzDAaMnoV1SeX/WfronN93qS72MJQjU9pxL6IT2JEhSjh/SOJKbPWV+GkEM7CuihS33RFI/ipBtIw+Tvhj05oa3XoSOUs4zRLpcuSnhz9ljqDP/2dLJxuSi51Fm8257p+0Sx27+agcWauE7bPCubPG1wlt2uxF4M4AF+2tD0dVxcqNHp9g2ZsJu7VpDB0BzVx9NugLMBNbL4TAGFmuaj41PHgDVmSAwyNb1cByEXIgkIcIslv4L2+jJYTR1cwzbNZmyRhjXbd2SHzVibJ5eMljpahXM4GplBHFGZMQkVsWzpgk1yLAXLIMdB02nIHVLaFDFm0ovuZmK5wCYzstnHOjOaLwwhSQUh0tJJceo760jx0ZxqIXr029wwPqVeKHpl3SeDoAAraXrzxa+HMCuEGsN3iOAh76o2r/qTTf5gsf3CBaobPjh78NN9PCEBIF1tYd9eo9kSDIQYh5zehm3+QrRHcbbhR/XbZZnJ17NFu3IWcKBWLPM35ODW8Wu/cCB3gR4qukYILXNyXUKbJ14nA4/TQKTHFkIUkheVMvT6vqN5i71+CpNlEorBoz0yGaRNGN+JMtH0YiQPqeEBSX4J8IFoKdPyvZLkqWexVxSvcsaLZZUrlL1kiVINF9RnvZt109Zqm1MFO2u9prZkL7BcHxd8XKZHSW3drm03xECh6UH002qMBcchpVZgSOdztr3qaEi6CE7Hki7gwxMnGt/PxyAtz7HJ2hEXtXW9OonEgBPMKcsrQkOznGGh6Cl4YxSPAO4onk4faWgT5NQWS6dX46M+ux45WTH/a1uOLdddVn2JKe1kFzY/LK8OxPrz/ZB6U4l9nq0I/tE6O1xWT6PxCroBxsREFyC7kJr3Ck3UIlMO91o/XfBQ1hsYupy5jHJ5h8J0XkeANHz0pkc9wOpphVP7782i1MWgXUgvZOiS/PX4DdeMJxMCpUQ8NUyLDtjDieTzJa+enU3pem1098Ms9PVcXoUclLJ5KpiB5O3R54o2Vu0KT+k/ucZiF0ntH865iA0nLYr52kHuVHdvMkcUaaeHTA1qMbxgjphSh4i0siColOGSeBS2b8664GqeeY2eA3teb6PsvNg9eDPN0WwtJbVmL5YwxqgathWPL4IX+1gbh+N00eG6RA8du2hDbYzawchbSS0342pjfKMyvmYYv58mPzBk/IBry9zacB55MHicsTePwOTE4zxvD2VyzJwQwp9sa00hsuLoAGTTx4fnjoFQcvE52C8Z4akIBMATx/w99naMpJ/El758LedesEEtwawhm0TnQkTdVLZI+7nXv+7vuHWHgyoAyke03ubs5M7Ls2l8OV1U874VFCGY5tlvw5C8rZJwHzkGjm5cYZOO84v5Bo0NnuwRQHhzWy46lydjtq16KlgNUf1cwfLJAjfeBpw/HjypH9Yu3bMaNfmN4K8kf1keRagwdsKVxt1xgokJvItod4C5/5G+8hwdZCEWyn/kH2P8aR/So5G0q2l5ha15ih1h7tU3ngXBC3xyGhK8DfUuKFYQG8WohuFsOi2xFbl2WsHtAeJifs0ITHOi8x6XwkKuJhZZ3s3Z85iVl8suBbNeMgXBNlhOQ1IRrwYuSGXXLHtQ3tufEdpM/d7ZBipZ9vj+MZhi7UtoYcrNJN2KwIdCtWL44PfkJovEpoF2kz2F2WNWjFzntTxcdXp0B1Xsl1UVfizn6hcoQBj65KD16COWqLyySaSGXGtOrfAs0V6wUUSUvSRaYrdcwrhZdc7f1xSmvjJJfzObtp7aXfPnJiF1o2PIvN7gzY24WxtsNme6gG3TuXDD4Iny0r4iFCpviB3HJ7KGOdfvDsaoP53NiqiJlJRVjU5H4GnMdiZm7EfcHpOLelWuGWd8Hxo8X82pTgpvt5ie0jK88agmW0t2lGgKRninOxVEKVTDxTOwbEzR/RyJEyuBjYtAecVovCYy5UPphoUyFQnYkmUwnoakHJsYtxouWqhiLIbtak9wi6G6t8ZuNz1PIkdcINDiaWFe0/v3cb7Eq5jM1PelAPJRK07XM0QVgDl6iZQercQ9INnTRjYGmpyAEO1kG6SwxTWrccOCA/68DjL051PpsWBT6rBIcwa6I41jT3b29Lgiu/B3zdE4IfbHuIDjgIwDMs7JOCAxFCIV3q020NcUPkeynqppFFwse6S2OfA2NG7+uGTucUfbEJCfUFHYdZjkAYdu92JNAboaqceCPqRH/w/xGeg2bvQQYOdzI2T7kGrcqbBCbTQJuu1MbI/tUT70e1jK0c6l9kGYVpYTEKjwr+1ae27FjiyJUSyrfAffx4QVcGcO9yNf1AISVxi58sEFnD5hxoRpxAFUWQVwkRySnU5nIS1qOEalzmv1LdfTqYe5VgpZx/1yoJqLyQBGMtlmskSbolps5JoRjAfT7h45ouWhhG5IyInpgJRKMil+WmotUS+CNdctm9VUGM9KgA53MoIsIJQT8IikOFP7ofiY5w21KB3GSb5TErC0xXKfvwyeP1Xayf6hkJhS02selJk+yzcxmA/3aor6rO/KHrLiInQJTtxrFYLOuMgrri5HhioNvjTw7B1QYrnr0DNxenTce0Rp3nGhZvYQUQuR1z966M2fWdp4ymVa5hVv6p08MzLqyQmN2U7dZtm07yNvANsSD5RKw0FQZ0FGb4g6EIYpWBl4R4nzwxqY3tFaURJZWFP5pUu8Ukdvmo5HzDSdoz0s8cfLJoJt9dWcDiogBXwQSa+WmdZxJvpg4SHNJF6id6pdZuN6Tfge9oGxBxC3TspafGlz0wKLpoPxglDTIa9jzqnnXDJz414DF6AezBJkON9fFLWqYyWx+JyE9655gzy6dUZ8cK0/ocwx4qOti1P53sFIjwEPtsUZhBzQlO+USYgGwwjkN6a5HBXPrRW2aji8oL0PlSbUXTto5wbecSOwI/MNpTF949aWc6WG7K3FCwmcak2NzQfYNnYW0JgQ+Lbk7XNiQGQVc3LUN021WHv6HJt06DJntxBqnQnEvT5V4OmkVL4kWuUh8bzrf7L7mKg5scemMexa+38KpLTAGTfV4nHE2xMQjhJZEethMOfiUm82qVfsKCqxUlx/V4/YIhDz7Lh7TNCdlU6VhdFhMgACGPbRySGEQC+0/vurIronSahQtK5B27MYkbfzYAEy4f/ZgqIiWYXCkCDL+uX2vDF8U/SOFdmq0gqq6/Z0kf2YVZ/43Y+82FEcdEgCOaHL3k2gpkiSbK0ed8AlPQ5AlSS7G44a4OJrhzctz8Sn1ifoiekpfmZ+LPgu4Wx5ztLgTflNfYj/fE4cr+rj5xEj973ugaZMYFxlsmVIXKbMS8i6TbE/3JTkEktFXRDIVIiRhl4br7VvweO6d7BlsVfLMX/uX3CVdJ6YHx62wFqvudkwJX1RIYGLCK0mjWVHY51aLQZnkfcqouFwMJVS9XxwCLK9a/bQrcZ2mdLh3CBytvszGOiuf81cXRW8ioVdJDa+1FI8GgvbuSrstljRSvrWRumF55lTl+/0VYSHPKyfyV+jMZbWvdBNfe1CyIUH9Lv+lCMbOxMmp44KpXjNjW7Jvl+U+J4nUlHCWB01kSSgdid+bwUto8S5CuNVMcgolDnqNIBAru+YosNZtsy45ccc3ge8OZrLYvWVhwrT3NCTvRTlTtFrhWm9RV8R5R/FlB6slSsmOA2lqz6KVhU8TtPHKK4k4uze7IdOBv0IbeU6q0JHC869MXQk9zXlvIvHXdUn3CIsOQqQ3XKgtYVBxGEuEZsk53cpZ3LuXZHk+792NmF9XRp3FpjSCcsW0h6WlNogX9FOezv7ZPZI1y4Alvl7LQ6e/LVr9NJbx6ZfyG5a9/Am3BqeHvCIkfKQSRogxVzt3ATWcvus5GQF9WXKy1jbRI/SK14n9o7/4mct+GWd1BuoE/tlEpmn0iv3SuuCXsm6iSMmSdfVin3bpWypuT5H0r6uvc4jWNe+TpxtrjdPLAkGjJJ1knq/USxdBwI79ug2qaQIAYkik2PcUQgBkR4jIW2UzccQOQEmwHgGBstAMIylc76BRx839aokMAGOEpOjc/AwAZaBO+6frzSgdgwJIzgpEP8gQEmopbLizpGvi+XyB6kYEkZIUypOilESyhuUln/rV3gb8v5dm5Ke6nk4tNBaQl26M0G25jUv70ZQU8n+DCccMCcCGqa/UeFe0rKWURooGwh0xoxlHIZoE7mOOvx7LJXc7yIAKAmVhpKma/drMlwICZlPiIJGIqtg3m+pYhv/r/OsC+wDF3ge8diNg5BeRIuJiGNje2ESLNUcFvx7NPl+6fQUDAkjztdKxmMTfr7f8Chfh3csZC2231DAJFgE0VgCLkwEhvzNrnKdNWJ1OAsqzUnCXIxUep2DkBBJwmXBVcEhrRQmwZwTUp4Hw03OEJep4vPz+//P3LBZdAr3cQ4STMlOlE8SEvJC3rA/nFuZbbZ8++B/1qVW4ECExRiF9DkHJsGyhMN8GISE/CBSmoXyW5ZnF08titiHVBQMNWRSIh0ez5jy4pRpA/Iyk1X6E+ouYNchXC7CRAgEhG7aBG5vMhZINZmUxYp8Nhv+stuEfx9gn2VvesDzJoS8j5HtSGI0cvAnHd7Zw5pv+6SAiaoChusIiUtUS6Zmfdfw2+DS6TO+Y8NvwHBjFHAHyN0TlkTx+jSrU3r3P16VN7ZRwfcOkJc3Ghr9Mfb6RnERuZ+t1QYaNh0v/8CczGRM6mY0MIzj31YSvd7I+0uYdkLZpPDEtun+Oyt1plnXm7VABZNgheYy26X0d6UXhF901vy1k2RAZunHnPu6+ITRrHFxNHlHWooELALBlojyYGf2C5XUDbM/8bLwIcFVweGQ7IeN3ZBU9XwwZWiLYOFL1gHWk5eZ8kOJMZwbUvULjgAgwnr1cGkXjXKvq6UfjwwjDx0GV3MEWzSyrnjg43LZdUuQE7cb35DJb7ABDw/dsdRtEcjuGCG24opOmWJm2DLWL1lsSKs0SLCRS23byFjEZCxkMBsYzMYRzMFR7tYWXHVQPHGKPrzZ+W0ICRE8XCGw1vcdWi5bwiQr6XTfgx9ihKKM0lLBo2FqmAQLvbBcUgNueT3kcrn766cyTO6rGFX5l+CSln813g2xtIYZYxiumz3ZrBxgMd2B5MLOnJ6sUX6iKtJlkdGRpu3yPm85/5cvOrFz3rENSWmTnh2nZlasd8YQr+GiOSOX4HYBuPC2LXGbVaeFmXjxVDXKTeB/cFx4gbvppajQkxu5gqxC9JhcWWzsDWZ8B+Lka2S/yHd35h6mftF/1bM2MRkbmeypDOY00N0e9cvYqJ+QaiNCQpjXBbyPDBfWjj1kqe226zJJD2vzH2Mt+7W0O41wCRJNQ5nSYCpMgqnVMbTn+JhPH15cyv6girwh4Dwx/Fw6TILNR/D0i/zDHL4jYpcqmxTe2Cref2etLX+dTSxooYtLzInivVpAtRmVPEsvT6CpLvRfrNGEBUPbX/b8bM/V5KKMXh6XYpTD6dv/DsNjyHcMar2ePQe0XDK7nRC9p3XibdxC4qw3di9lZAeX80mc3u9gUHThIFsjz7JoWad9kSfX9IOXY1JdmH8xRhOG10C3nBhuf3DUn5g+yJpXqh/kzXUNbcwZrkoJD7Lnlmrbk4Nxg6tKR1kdqQ3uxBF9KtxzuvPymjtmDk+TDwv06WvNVDhzeUsw6dZFZPg0OJbVf6X1DCHS0P0rPKa5NGOo6Joq7xTGZMT8i3GlYsqoLB/rrNazxEjR4OaRjxCfet3hcbCd0c0wjnvzGG6G0YtrjjwcNHEYpa6/hG8Ld7I0ojk8h3OR5m9ySqYWRZyD+xaO1AfFOZBMGIXinktE/0ksSRD8vZ91gXXwAi9N3LOkE16FEBeMNUvSkKpXMJG2vwCkEsqLNumOer9AcJb/ZIU6c4jHN7qiOHX6oDxwtkD47l/zZX5xGNJLnnNGR7iF2vxm4dyQcMMYZWK5JC4tyq6IuC1ZLCVp7GqzXjxWglP+pgrHO+Uhj0rH/+WwCHSLBIf+EaPDmNUSfQiW9NxLEd+JzgjfEc0xVhKC9JJedk6/EPL3YYGgB5+JFSZVCRODJLoq40MGSxE9rtesF4+R4uU/KMOJeQX5PkFTPbiL/zY7p1SvJkiqxBqyfyHD1KKtLehf0Vq/5pcA9dD/HAG/Re81W6yZ5QYPN/1rkjUNHzULXYXMejq/V8WTfdGaNR6PKaBwm0YZnPGBEolJ9O/S8SUYdATSQxNbyW6l7NEocKbcFfCTIxAR4WfHySgYEoYQPzeqEO4M5sMqaXo2QkSFCg2FhBARbKbH45GpN/IvCy43a2ASzPNCaqUX4iMkRDX1seAq74ATJP1vPaVHSAiLKuDADJgEqydYeZGkfv3i08MD41OaQx6IRe+QoXH0mlWq2yLgD2nsLi+pbq3J2mcodSjfgEM3Le3Vg3yLKk9haqLcisfdmrWRJP3yf5qrEeVYX3MKkAGdWaoua0swXIvpIh6h0f7hox4DWCo6dw5NmZMb+x1KfYN56XDCsdd/vXHMRuC+UAqk4EXaqCDlzIP9N9PjtSXXKDFnnZF881TRyNTLFJZjfpNyO3naKOpxZGkRavruaTv2K/GKGTb2Ddnyv6f4v+cvFsEkmHjczORS2Z/qEpY14zhYGifK/tn18waJGAdE51I1AZhXnCj7F8+rhX1V+yiFrzm+wZqHiVjqZx5/MG6f6Se2w/Moat5HVcKDUbusZ02fAVX9xMo2VKZjMrDwZz65/tlwiwqkWs4L0DEcMxF45r3aselr4TclxJKtZH4ORHUWRyTiej+Fcdn4d4ItHMez9bhcGiEMbxQ2xQ2FuvmDhBkjwnIYV9QFh4n3zx+HtsOqVdB2SFKqTN46HhNPG5Jup+Kyhit0D7vrYQISPR5xYkJgDVgbQePnUEYJaHxUW3/YUiqZdiFBupury/0h0+Q+FpaMz0bfzCIzvTVgFnGxniYQ7URxfx61hCTTDoSkslXfzMQ1r9bfHITK+Vmt/RuqBIkdipy1jXOCA+hucv3zv/yoZFLJu2ZhIAis5cQqMmzCZ1Y31A+opnrG2molQgo2HuxLy8cxEH4jwyr7e8eWDJuXo3SaPlbE/fiBpewvYd94/p3UJKNyhEb62WnsDOQD/4HvN8OVbuzs5R1KImkkvBph59UXZOcMDvkmlfs17eGCGkNCTk22IJfagxDaiYFaZTnV0bImr2Judbqzq7ZwgiH1PzsZI2eJfBURmoBZ8UUt9DFirNHkq4OeUkRSbvrfazUV47s3TQXLiEWTrOWl5i5vJL6rsWCqPtdeTnk2nkEiDUd6aCu5riDPFB7sD4wpcyu7In0G2NMNwUFG86HHdiwZ40FawFxMDMbt8jgkqUY81lad2BELpOT0jPpZqTVeev6QQbNLXRqEhMSngc6CkmBSfGpxgyWJNGfV8xAR77O3SjUVXNnnMuJszJDe+CfNCiVBe/MaRAon+droxCYssIQoSw8MR98TERIZxajDp9+be911Q1Y5LYdNThQzgoz22Ny0XbSHcXCDPwFnLvmQ6MgNzlKUn7GE82cH3INa1ObZ2Zlf8kfUVdxkSVmLYfX2rxyqojOSowF4Go0AKyE0BIzLcnl8MtYBQWUZqrbwPSEfxOtd/c1vsUP+/l8kas3h864lTRsvlxoErw7wdtZvSeg3JQUERXSWoY/jzqukKX4vNQvQWvumtcQ2xMjS3ixYrvzYQkLDAgntq3Lg/gi3HhyEr6iIo4+TugIBMPxsrKoH8Yq0a1XXs+1v4GPIeG1LYDmGCvF4EM1PfHaHab+y/Uam3gSMvTVnXoClHaWyNE2ncXKh0+x8mnRcW5b1p6UgCWPBxG7WbtP/sI7KvP2jgqpmUS1kWlHPDzx1QcJ2iYhO2WQJe0wWMYUr+vo8QqurVw5xUBiDaYTCXRFVdKHxypWFjBDGL+NCJE0G12Cvtn53nuNILM0r95c6lW7twe6gyC3S6NLVhlxXRmpdrYWMM8dZevepX8ufUmMPWZLE41LFMNqFLgW/EANFieoyk1WV6XZk81T8gcn0mCCd1lU1fiHfkVicZpUUpdkS+TEDJY0SYZow8Qr+Xhnrq4ggAmZmjEqY37GrUK7WvacItxcftZZT0Tlp6f8dPULSBo3awqQkbZ7fls2Ry0/3xKY1bTMlBnMLE8S5w2V6j+n65LRBQfm+u31kX6hRE36xhCXd8RaEZNJD8qvUKOfP5oh4QioZQbrA0A8xnuw0hz2UnxMvr/TE66VifnZavm5FeGpN//GWEku2bHT/sgmmnlBhUnOtOTm5xGksc8Qps922MEcq93CmfpwibtFLKGPNLXoLeEF0FTm1xZaUhKqaeFfCKSMxBZeWWqywxeWnxcuKAmYLt3IgpYlqDvG2s2OeoVTsVzfl1SpESIh2qO45e8EdIRKDqHfi0bVtM1uc79jUcbEU8oodd7g278hZDYLLU7VPz+ZHCV/yKqcpiFGzlCHMeCQlCl8N2Gb3rLZoYdlVSuwlSR/xRDcEQWg9Okw7TOEttI/ef85f66UdJbI0TUdkUVG8Oe5o0vFdAFg+otz+PO+TPaXiA3fMYctklxhC6tEonuWAtkVhwlcvH/3/sDawmOtZzMlMM8FCM8A5Mbo9arJfrXjvw6shw3u44RSD9rD0vIeU1bBvrn/usSP5/kLp9N3dfZXWP3JvGcWwbbE88R2EfqsBMbyH5sJg85jCU0/y8ko8CfPJYTJdWVGYI7uadS3JFBe5QNvFXzet7vMF+gL1JtffkxyfKoaRrkh6dYF8CPrNEevSJuzYPUvg2a3h+Mr2jb2RBaP1BwxTQxtFp7rOkAXZR9ySf4CSnx9Aiga4ORHxxFQywMTta/ooUBJKhfj6Ezy9S1zWRhZjA4s1hcGaCkyD/OD5Up+mI2lwfrzJPj218rZswzwuxGwAdPYueTLvhkb70qQzQjUkGvm4tmhPit9SCQuxlkTJsEQzHNVH89Pj6Mgl7tEdhHGqG9FrwujI0evuXBR1VJCCU08vynjjaa/9ioSFRllQPT5pclGCOe5q0smouyJ2huCR0b8zGoFfxvUBzAikqfDpRRlD7PMW9dbf5XxJSilJMFXF25WRDxGWwlWcZKywpyaVV1lOWJwZ2T5VldeutdjDoVRFgycxaUHWNaPHma6AftN0cZIB1uDnXjjZNDXc1+ZRIvtR6m9T5lJHOZxZ+3XdcLSJNdvVWxa0YBhl7AzK2kbp5RkcDLOXBOsD3g+Vzbpb0nf0qIV/msPiwQkSNDrF8In/eJoGISE8D6TgUa5jlLMD6SvP26zukqLCSJFD+/baFG2Fw6wNaLW5SS51kdcRYgMiFSbBymYdY0qSxyPZKDqT/3aayyHxGQEIqCwls6DHlGE7NoVLWzRmHQi/+MdJ2jSNPi85WVn0OZOtzPJpLSUKyRBxQkJhUam3j13lIDy7jtQPMgxMgq3ndcIBKku8pXWS+JWuee4CaJ++RGPB/JiyCpGVzFhCj7VTyBIxGZ8AJpmtezr/7TSVylwZP4xAczp73NDy5W/uS8V/fTKz/51DcaBQPrIK2uZ+xeP/H81fM6Rs+MPzUvXYz1K6M248jspgIiSE8cdfXMZpcIDIfnJa/AtrcDETiUW2NdXCMUipZqKcM/a8tcma9dBfPiSE0bDUYcy3aPitnAv24W2J7sRFyuOUaLYlYu5ykmG0C32VOEkrD2rGhhcVxW+eSpO+pUY1YC1hyfBEMoLXaw8rr5Oj1ZKkezwykcEAi6Yum5FnnrEGQRFnViy/CMKS51j/d76V92F0d3fybFV87qRphfXq7rEruIbL4w5X0qn0OYaM/UsPnWJz2QoLk4YTGdePhJwd9J/oFoQ4ZK+UeRwcA7MNkWm0eTRWwpJKaDvzP6wdASnb9yDDFllQWduRhcRheWAa9QMSl0spawpi142Kb8XGddIQGgA6H5tze/2/Ez5St5GPsVILIo2Z/fO6f9e7vlvIFki8WP6r3ZGmi/7az21t4mLijh7d5K6eP8+cHH320OsY3i9nwfaxcr3Yzf92J8n6egYEDFrWjwxqTgwtKYnMPmhpEpehvWl9pg1AUUouRSrJ7xIkV9dNoh6pJP//qrRGYFFwrNjkjMCuOKNoOQsavh/a79dqZ5SvmBy3G+qFZVOgbZC3n1DRmo5Jo72sdEalZuMw+2bDBATqhwZRc2t/K5rmemB26D+69OywlFj/8/lmSBccIOTfroqfdTVhjqcqv/APzvFnlvKgpSkrQ6g9Tbz7qM+SOQoSgb64HU+8TiT5McntU3u+97p+5HEenDBSNUw6jcSoP+qmcDU/2vZt7iQQWtSThew5Ufp2jb5M/tPsz2T2F1aU4+4aQbqpqj+HhZzP4NWQ0ZzIcys6+QXOIs+yf/5T+EWe72zdY4SOyshzU00Plj/AJ1o1YJMXz5dKzCsB4+xS3gOdwIB0t0NriaawVJcNe6EArqycw/35Nov4iEO3Uih/uE8JlD4dLy2CSIie9Va1yJhHaaKKfbx1uJiTCHWdQp9/sNQW5xiVSEyICiQZBAZL0QWlZoiQNfoVv12jK5MvHc5iHeVF1Z87TUq3zp4JnhJd+U5tsTU5vqo6PjnxVXx0Fi6Q1F9lceanJciKAiarpLd1CDodb8XFPEWo1AX5j4Y8zBmLwU+QAeb0/W54uG4BM4/Cvfdnyx+JO9mBHJdZF8hL03w3fECzSIn5TuXK9ifrBgXwpjFB3BWp7Myh9VUuOuvsOQvvRLVWrVWFAvFlYuYKs1+eIVWeD4sMNq+cI1Z8F5LN5g+z6h9+4Qk1BsP799XrwB/r5YgxitTHsjuBEZ2/E9wiJRQM17cLisi1dJYsPmJXFdu81ppCZ4/GXJDTN70j0eDIjCTL694kkVPyzeo8a3JcQ1WKK/6Mi0NMQ/2DpPa4inBBXl8/d2Q1pYnqDvE242JuIFRQTdDKRbF0GhksXi8h894YlSlvvsYF9NLt7n1q3h8BaWLC9BH9daVqmARzj7H5bob/OAp+Yk08E99ZIPluAA8/vX5qs3HZQa5ght07mC1zuMlTrt8RiV0+lb3Eo+csJdY3ft+IMQiNYamC2J/2oTB74KBNeepESzrX96bfV7nk95dHo/t6/vv8pRaY4yw9+9RABy14F4sQEbC+LkWbwdHp3aeDBnlcwiUNZlLQtKo2lKr4TyxSkTSkMSFoCTOTJf7JEaM2KdI+5OklKrQwx/0k3laQRE/JIY89gh9Q3IGSUM1U3XP2WlVmU4XjwUxHvEqepUKVft3MFWMqHGbV6Gb5//V7r0j/ILmIpXfDGMqCJ8ENtREwrBswKJwWhwp0Z3xdJFoQBGESrJ26D6ExaE08U/WJ45pSA5aQolDqHxtO0iWHRo6v7A7nl1LthyfCzJJ5J8B0tG/Fj6K4CUhuySX3LIqslRhJA5SdxyFwu05Jlk0s4pl3ze4xqH7MWtU8t7U9Dn2Sa/i8p3pHNrRq80ILrsR+Z0zRtii92ZO50D9+znDieqP0Ms2qk4vdpw1agU+WAUmTmlPSk9N04lgZhRmxEyWqz/LuviV52llhP15BlwcxtYgritCWkokTQ/afdz01p3omO6gTwvaGFRYmM2n+CLCdreF+nUTjcSri547DIIfFqKq0MMf+8xpzmWVKqmUyilOPpsgT15LbMMY1j4oW2z2kTFTN2S7SMPIfhq+Lm7hj9yw+3EYXO/Kk6U1cYW9k/ujkAwZHNSrRqo4zQ+oraZX858pUWTtwZpMtfO6/WfG/QjFI1FVnJFQqJ7f5CY/hWdwQUBRuMdTMp2rWFVImihdZxn88zHM3xgvJ11R9o4ivsNpopyZ2iLbcYVEHQ21ruTRFHuPWtdxvaLusZLJ15Y5THJt31KzDi72OyH6yW/yKNm9xJVRANxVDq3oefzMEjkVKNV1yzpgLvjL6os+WjtFuGMHMQzKzV8sq9GX8lK0hqf/6nMQ68YkwO9wrl/IvkcYtOjMW59WE0ym3swckT2rp0hZWv3KtWytDIgGfhX7HRahmQcK0yljRYruHFImKpTMyI9alBUYJZiEqxCPpVbxrEWml6JQLk7KckJRDNP5G1yTByqGV0IIJLk8D1x7tbEf6rPM20xSgETzMKYgu40IEEXi6+vgNFVAh3UyPfct7YwtkXILIAFUZxIuMM1SKhcq4a1IlzZfstMyHV9IVAUxnMDnzUq0T8M4jKpmSalnED1AgBB4BJSVMMweegJYyClTwS8Vv0ia2P9tl0XryfJplEX6RUP3XDGVqlj9FOyGAM2iDuCMy2dlD66uEVNbesybezdwktVYdDiSUin4K5Jyp7svza77rl7wRfrkqMW2DAjdOU55j3NDMGS8hPqki7E0oFNFWWJwTm97meylEyu/SZaN5LY6klHS9kGPUPXlesw4wPCxVzPw0ldOcedV6okYyOGgeWCnQTP9prxyV98R+lt0JTGLtTiAXIEIB/BwRCBFr9qky0WDp1ngirULOmUshfSGSNg46ROFYlF3SPhct8ZSzYsYkMqXuQZM8KkNw+yGJ9NWc7fQsJ6wMTwFKJqbf/pZ4ZLpqwXuFYaObL9J0P5IpK36oFBWZE6zZaonEpGB5BoP3pORKh70iJdleVmlLSe5jt5UnJ9vKy+2xCc7q7HR5yX5ZQnJtVpKk7Cbw/pCXwc3lqk4q1Q6PDtoOqVfAOyjmjTgyTeVYpxPebQgnbbfaUG8hpJ0SgHthcgsaRNNWhTGVIJ5qDpvdjPxEs5fm4cuGwSpi9UlxkjlCS01LtYQ0uj+Toe2wvIe6GjIfwJELlUkpAb1C6ndb760Yk66WuuXGlLpxJeAXtNGmHkw9juETOkMTiD9ffyWT2tD4YhCC0qE5CIaBVGfCxaAVgMyTdUNMzvy4hMTyEUX1RnOpJV9bXiAv0OU1lzeQeKLtWGtbYVRf0r5LGngVQitI3kU6hEQLmSOAgW+euFhkcmb1McQX1nW0VOTvWDVrgMKcIKnUjZrh6s1OEtec1+ud7iSbwW9hz50onQR/H5CCdXcTpnbuIBdCuHQnPr8f9OeXX7zwdkSxhLIKMrMlsa6sbBGmhAa4xc0ThKY4pXiBRJRzBqlLMxs8ZltCVrU+MaXEYArpjaac7JQnxX86S+P1ikyvWSfre0dmehLQF9D21cp08nSOVPc0liOJCyaCzS22B0dERpM/T+VwlyVYGoI+46SyIRMqCjjikCUoaKkItku742Ux2ZJgq9rwv8NhSbex+3ZQF1KJ4B9SanmOtae2xtpTke12leVY5tbWWOb0yTYpjT7m+L5t4tnxXpXSEmBPqqoXzkwKARdMgvWvUgRTkwXRE25bSiU7xnlhLE4m+D/KAJNgQQTSqDMgoEZXWm2eyq70fpp6q+uK3ep1XIN64ehgZWYwklPgsWj6uktDOe5AYjCqoAnZ3IeNkBAwHHVibIOHgLPESn+YNlm2NMASm9dzvGqdwB/R+NFoTLJXulmZutmijCjY0LdwYbkrxeyTZ6mUsjSf7SVrfIZWFdHHmQsKjaAwR7DivgAmwYxcsdIN8RASoh18WHTkl5/DzqiMNlALtyMoilgHwlNBJVoki9tBPY4B2RkknoiIteP71IEf/w1Dc5DobN666CtotIF1SkVtcbNk6e5SXzi9MpuNP0m2Q7f8ZG1pQ1W5x1Zaqo83hRS/0yYDdb7Jp5eFjE5rQbE5wV2UrG0Npmtn5HV1hyIIyhZfKQsntwhGuI3kfLFHLjdrM9wRe4GF0k9i6Yb6HQBHGBlDohIwDfQPHCe+sBW6++SsEW19JbwNTsVLf3WGqICc90WYa0wp0yhHy7Ut/wWCAbsuPc7hzKrUJrrLjMYsk8NekJs0s5hgLXXbpNlug96Z5Euw6nx+c0DxuEJv/hISKvVeSbosLtynApwVWANGWabRac0u1ie4C5O0/dLTtDPyu4akZ6JirflxeTilWTDCbYrNF7sdMosm5MpKKLbF8kySwdTZYLxZsCVBjpAQdq9UcpyFkGBZwmXBsyM0azu9nW1BpLsv+EPvYLXNMbX/CgSHyFHRm8ZZmiWXF+RBj6HMqXE85xRBZlMJxl9gvH8Y9wOv/w2b6+PbzXi82lOfJ7E9qpwaXxdGbcZN8fgZOT5Sx8X56wxzM96O9tTNYectvQAjXyoKmwyi0DK5olUYMhqFoWGvxayIP0eaLRJzs33p4gKgh0mwcO9IUbfOe6Kvpcw8NN5SiLwV9V8fCPhj03EOFwK7W6/x/03hCpYx2MIGZDU865BeO0QoDFifDoYRU975HWYYD4MSDKqu16Fg6Bp8x241e8RjuXrvDGQ7Um0UsJJViiEyhIQwdh2j8DYzmSY/sgOe/VCj2ShkTWwCp9W0TWKIBMUeo7PbqBAJknHoz/9tXUtFdT3SDzAP7q1BMhCHZOVDGYQA0zoMNmYKFmurGlvPoODgKnx0K4TDEcqZkzYdoSqOShWvNIRxnVAMqC5mGLeZpP8zeTzPc8oU8O13hh6RzuMwOOMCdrO+T35KO4UIn13Mydbx5x/nciQydSeXmY8FnSB6ORjGrZksglahsJXqV/5uqpRk0tC443tWaOExEKMPPJaCm0Am2JIYsAwCi7YoLjEE1ezYKibnt0eP/+BxoxqklnYR9/GxovgtnTxpWMb+OuZ+vHjpdz7v+hGG/Eceb+tVMGaW7Uep2mMxOGYlOpR9CuK9MCBCk+fRss2Cedt5bJfYcEtMRc6QB4H/dWCBsTHBUqafMGxK3yjsz5Vm0Vn++fKBzg4TYzjYmmMeWwS/MxP78hLj8l5k9aFCgfXczspSlL6PW1PFHvmo2p6Z8A6kZv0UpXIwzd1aXexDtiOzHgERaLRV0L4rJQJiGdckYVbXwCYpQGs8nKAKsk7eaJX/CqJrlIDJZc/G+B0mWweZULoESEFHaR6TXTupHEHuy2+mvg8OjaFiwQuKDhjw8c5yrJxPpmsU976esP10vwnQlKuuHmTCt/ZAzCbKyTNQo+2JMsxOu7tl1tgkVs67lz/VHnFrxx4heFQM1lLs7oYDnZJAZUjmqN8GKogdEzINfaeWFwsP1ZoF3pc+hzKwEpdd7LGJLZVUdXMbcLtn+4u69b6T670VVe59PngfAW9R63X+v8lc0TIGW9QI91AVQv9EuecBZkMnvmOXGjy27ZuO0NUmNVk95ZQQ4RZ/AAYiPAnVEZhX3NuY7CFfHENBfa4oyWTRFTRZi6g9r6WCtxuLgIfCaKQz11P1YbHTOGxeZUmwD+PgXps9nxvvXyCQ3oygY0mkHpT2lDw/aj7ihXt6YNiLnx87X2rfVuzAlf+OdFyAeJA5c5CxALeA8HcSfMOtqmZfEhEGAyqDHS1K09qVbk6BRjyrwBy7V07SiKg34IPRASbfeeVokkRDVbXmEFyLZLOQKTZhmm6Iv+vVkpl14th9MqmET9BHrlrVNCHP1upFrHpcFPtdf9kc/j9HBPzD//EFD4/wBUcegNlDFb8b+lsW5lO6KLbN4g1QN5RT5389wu26MEJc7VKWSEd1iePvcb+jwWryYENNUfai8wbsaPyh9B5a2jI4CszKRtx2uEaPWAJwicbRUPUQHgfcOhOh0+EBQzMSOqMe2hfQnl3g/RbyqeDYkx1UWzwV0L+N3dkOq32eo0IqH2g8GeTZeFQ/z6JehIGFUaOYyRADyXqEQYePIXQGokr+NWVSkWciwVRp/bbvKL+MbKekpbmvTp7cs68VkR1kv7zvSOsa8I+pwromrhrwU9LTUlliqZniBys28aq0fgtEGiQaQYUefJU1lZj55yw9SkLFTirIxjSknK2qPpeKqQdZVKdYLx/jrPvEjFRbVJXAA/5JYxll2IbECUPZ6GOH1kNZsFMSn9vswEmx7HjrQ5JxsqTLgjX8K0kXeMvEWuPZWBk4GmdlJVjlOqtObklg7buiXPEZqOvH8InH/pvn+AzPRUObMGK06guKrYW0Mf9JBO82VA6OwVw3rrPK4uBi4GOXOMm4mgkkQriuzKiFE6KoAValESVP4OB9CYq6snR8q9o13x5jG+ZQ6yltS0MEKloG+8bsnC/tOHAppQE8bdJmW4ydh4Dr4bYlbcug+uU7Wn0xfptpX9KeSsveA08T4VmIa6V8wm/RzGE4SdD2OTD5E25iwcQlCf5rLLB0BrW0tSG12G8Rs+nlpZqsJLdXIaQ7OSd6dxopHyD104xv+Vy7PM3hTW0ZkJqWNSCSOCKU4x88wptniNAuUooprS1cfe54d+awonRHV3lBt9Gd1eFyNbkSbNWFCXbFN00wbUXN4wEhelubQZk+rHIoSJ2k13l98RkOX6LOrzdcU8gSDQ5ja3ZLfXWzx9w/XmUmIByflDT6r88/VZZl1Yy6+DvPpA1n6h2icTq5dqvfHjH7HFqPTqMNZGrshnSZi5tnUl80IET0PkBIiIT0pnAMP8MQ9rkqFKm+Qq3aB/KOicsYZAaN8UPTTgrFgs/2dn34yLC3cIuTHXWRofOGjJakYXT8cRyEhOjuq8CjseFuYCUM2Y3wDcbM02lSueF+Gk/J3/jXGiKuESHChiLFBi5XopAjRWvLBXru29ljf+JtxFkbMdhGmAilFKP7uFyLQkEt2l1u0PPezK4cshsR6I0Vt4ulcsOvQS4Y1BDXIi9Ot7WGgo72itxuvTurIzW5yZXsbm5PTfdkGeVpCqctkqPUsC7eBTEIOUYWWtnA1grd8Vp+mlvn1IYVpswEr6ulxR3I7p8WNzg9aGrJDtbIbLIzt2zkoGR5Gxf0n+psUhSGLC1+n61/n+xBWnfx6FBgeIbX3F5Y0GE6PhEmwYJ3gnu8ZwKYBMe0UWgvyMYvMvmcEINCW1xq1Lzgsviy24IYEUyCYyxMSs+85khzalxHRn5w1LBgVl6L397m9Rn7ZYdqlOObCZZSeejtWXWwcyIZD4t1oKFOcMgLk2AWhUpEtqF4ahTtGkcgJlN8HIgIExhUPEyEpVt4zCOM/cz/hTAJjs1h0nNiIRIkiGYeYB766Qr2shR7QSKHSTAhJyZ6FREiQcziPBZMgqPJNAY5BiJBwmgG9oK3E08lUjufnXtLgEkwLheDz0XxD+bVnd3Y/IG1F4NQCLGS6muUMSAKsxPzGKwb5IqE42TsFxpXKOx0hkL9BAfHiEdkCw6tFtvFfiC2oIbzybJZQXgV2GzBGM5Dztletk2Hgju6l3RhvFbMELB6o6kDdqi4zjrdiapAllKgZuzJNUk+S1LrF2F27MAsQodhpCFZSczhDgUOd/frtwosX5k71Zbp1Fa69KxiU1pYa03M8TADtB6E0IxzjN+aR5RmNhpdYV6RKpjef0QqGFvG2hhENgXexG073vB/AnK3dGrDwEe6fV8khl8DfInqRoZS9yggoonbjNL+e8SCVpM4dSO4UL8Ic2I1ZhG6+kTkrVg78OrXNa1QrsiQOxR+6kBrPB7fgK6ibdd57svpA+cJpamdT5/WmmTqM2k8DXf6sPFBLFqC9sKGIsZZvroZ7Dg8x1AQsTsSCpNZbrgXia7ABTq35hFlBa3J8eXf6Au+xfCGY5ZgdDpM+mQMcThmFKrTPR4VrhoSF9FkxfROWBxSlkBzkRqVV6IyZ1qNZRxQo1usu5BfA29D7Bm82NgwQhSnl59mYe99ucqPs7hzBAba7Sk/RmPrUQJt5umTEkn//9lqmo/uU0uS3hA9N5+tyP8Mpc6geQEdx8KJMqAXO5vcd1PDR9lr59tOKOgdFDeC+MjSui1tw49OXHXmiI6LYUuOXbMNIyzEt2+pjRNs0ZwqI5xehfjjwK555AmHBXFufhivAK+Jn5SVTfiZWyFT36STBEx69wLVpVhfSnNVpFvltvZh3TSmm/pDY9FquTdT6kir9zoHg5xX9ZkdpoxsXXVNOSnk66r2J7obMkU5tLlwzEBiUSdaSZmLQ3U69OCOf3fblovqtegjDHcEBozRH9d+GNoBr4IFiQZ6bOxkhCi2JyWbSH7uJWU4sU+l1sGZ/M9PRNwAlEBr1TVp9CZ6WGVhZTOzLKYyBiik0nasiRZa/Uiu0LgJDYv+5xE+guhxm/Xcvv6f2N8XQFvGCVZo6qvKZAuNC3Oy8dKbVKZI2+xZiCeH95LrQYI+caBPAkR6Cr16Jfn/qQQLoKv/Q69eSq79L0kQv3YHawmLsZjFugHXxHQ4RAvZahAa6AnTkNnTbypSPc9px2WvwJM51yJVWRImcBImWpVyK5BtDljHK1N6h/KoZB5ARqhUODLsFQn9VE6YS+e4X4UJ58UvD1MaKB22/ymCjxSRYA0F1EPfqy5xWM89oF8G4vHAx7UhDULXJbUgYzhlAmX0N4F9vjKhUX+hdBQsMMYFw3Gyv3vkcb6I0+EPvZGQjCNSpTS30cbz293yuf/IC1XnyhU1v8qd8G14eKoku/rMimKg2xugdhHlzD4IsG37X8hQWELZS89mkXXvgv0LKN13+iIWC6xAzGYELN7YmxiydK6CLWZEAe/YZxC69/aaQtmdt8Yo/nfc2opu0RtIMS95nohLYz5TKbLxbbL8xzW+pcY8gFbBBWOjH1FoeWQcUkNppBDDFJGAyVxtagOhE6zFLOYiFmsw0wzIFy1Ntv98vumyBRffmoB5nbLffQ9949ybr/0GlfY3emha+XdrJ/SRMuHGjVTLxyKBu61B0PfmJKMvKIFjSx6DwV/d7gFdKyyNUs8UFvPZvBDNS6U1MlinGYI/Zcp00H/9QwAAFHgLUk9P6Rub/AceQV7O1hIA4PndUQoAgB/epTC+Lnn9dG9ZZwBgwRlcP3NdvFOg/3ORpc2TWZdf84fKMhLPifPvKOEOPP9NYurZl6iyZmHqeBBQzN9EZaerQJJXdyNFaeeqQKqZkWg4lU2WcJL85sE6fWGpXfAzWDxemmIEqd1/vd8EZmTKORTPWrn4fNkVYTMtwtQRorEoRxlxe7DcqANpqDAM3Zp9o2/zzVlGcJVvTO1Hevy+qVdjUq4IQNma+XgAcH2TzK4c8Eq+E69ll7LE6jOoGMCBAKvscopqRQDJyvk6KAwgb7IAgM9n8NvWi2T8cVL4fv3n7fnsDWk/F8rLSAVL+gizctf5e75dxd7wbTuPGhekKCduI5Yd9SJV2Q7UfVZrso06JztNNl3MdjTh7I41tCioXOJjsIzcq6rKZdwLKkg1SB1DHqkiKCZLYHN4Jhm0YCLtDAm2OIulM2GcxLni9Zj65yZp8tr6dPSWFN/19G2J1iuQ6yXxD/q7s3YkbjuTdTdSRzP1pkQLYRLV08IzMvY6VQ+5EAcZoIQgJEIA9MxuQynUgQ6awAVOUIONjuJHEo4FfP/ikRUjAiD7ShQ9oU9pG70y4XwqKFlU/79kaiqnjPuzY8zwF7SNDko0jdmTuJeYkgD0HQC/WrZz1fBRK9XuCWvyD5yzvPE/6XiqMlKVFstJ5uKydyzbxIDESuJWKRxXxXXki6dnDLwAweKCp1mio0RRkAR4IrW87DJHyOtrL/M4hv7QlRwIJWZ+gfl+JSnNppwbpc3R3DMhZ+eKuMlrWnk7QRlZzCaJv8QGHquF5JnSDStpK7NU9x43kTRti9XP54s/Beb74vqL4nIEy1lk8fElz8gtiIsSUpG7/2CmptNsU0oYV+x2xrQWAYAPMkiARFBBGDghbN4S3IZbwf8wJkfOxlg8lT7+S1zP5dlA7y47CIDWOohwvaHb3zPGVghoFRXnrWlCOsRVMB0WU3w6IsdLIxqfjsF1JR0r0fz0GE6V6WRmxjQKEumJEAZAdDCB5CDQ6NLHzzNQf9UGCBn08m3VrFax+lCjpjXJZFI34UmXhfr+9SDa3yG9fxCxNI8LRApXUFeeEYdvhS57m06JTGRgJPUG2kBjgxKhRzpHauQ8TGMC3Yv6EmvITSxSzzs138LF7IzMwWiZfJNkyZYlME1JII80grZSp3RNzMQrikCG1qoQteZJHB9SsIL6qPwkB4UutUW9Wu7RteIYJp00qNao+RrZpYZRrdCDJj7VCKteqeZOQTHO1MmUpFMD9lzQ11dZ/cTQWgAaCIFQCAPmUFB5RR0W1Dvngos0dPThwCWXXXGVITwwMhUFzBEgIkQClqKhGCgWNLBGRkFF65rrGt3U43vb2Lxl5xQnPnq33NbkjhgmTcHXvjoGk4VkNg7uw/KTO++sGlvU2kqpjpaD4RIRey4tsNXPl+bXZIVEZLibnKJBug1OWZdMxjxilmyaw55hUF9uBq6NLUPksWO6aUMNN8IwvUbK9467079UrCR7o4wx1milyvRR7o0DKtg04XvOkvNr1k+rFgP0t0q6tuNm+HZh200thUsqu0cLL2Lf1BqUxsDp4x0WkSFTlmw5rbASDQOTk5SXz9VkGQUKFSnm+vDeWRa9PspVqNRXlWo1atWp16BRk2Yt+mnV3wADtWnXodMgXboNNsRQwww3wkijjDbGWOM6xLjkfbTxJphoksmmmGqa6SHNMNOsKGIJCH0H9S2p1U6aLBoWVWqzzYlcTzvs5EVEUqmKi9spp5mkynvZwyAWqRthEMg+PKeYZLppZhjfXPPq62XzLWiCw3AtbKKFLbLYEkuL8d4H+4hJiMxTbQ0PfMsst8JK31il12rfWtMsPjPd89h9DzxprXXWv1DTpVm3XXOww5eiff9yaXex/ji327HplNsPkMk0S0DF7ljZz7eyCKLkimf5tkoB3XXwd5XzEXZrV67w7TmwiXe8ob791n4rbwvWUKnpcg5rNRc+gp/jqeQbDXQ0s/Pmc+50sK15Dtrzxeab1cheaMgPuVstP/sWuo/owjwcNPKodQpOvqlDzjdVFrrRenfJVPg3BTRiuSuLSkTQZtrDp8PS3NYjd73Ad7hJ2iuHqiTttUNdkvZgDw6hJO2vZu4gc8AcgIPrU33m8TGtd+nvZ0TaWXkQd+K3nZtO4jedt0aoDLEQDwlbWp9/WEKjQ200rF5pe9wWX17ynlXfmjmb1bLTKYKiNA+84pnMKehMtPAOlcVmOvalaeI07TG7xbUv7EFTrmGRmTXaY81SS5eDDnrooosOeuihjUBtYwiXR32fV05OlJUtKSBFgSQotaRUIkihgbn0wzgoeGWjIECgFCAEAKAQJAVAgJB+mAwFaA4AAqUAIQAAhSApAIREDsKwcelpkxpdXC0JKi990q7MM9BUfzO3a/W6k/FkkncXSdi026K5mMjlta29+/aPvFl+knQyopzAa2oWd+262KldL1X5dkB2atswcZx20ItecT6yfTT/lStOcKtnpoODqNndr5U9A9NtruTU47HLir5d79v1hHAbqwQQUQyknZcC8u5Gq/+TJj1bf39cwOrybqrh7GLw7+tE5zMBAAA=", Xy = "data:font/woff2;base64,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", wh = "ploc-cellar-wine-typography";
if (typeof document < "u" && !document.getElementById(wh)) {
  const e = document.createElement("style");
  e.id = wh, e.textContent = `
    @font-face {
      font-family: "Cormorant Garamond";
      font-style: normal;
      font-weight: 500;
      font-display: swap;
      src: url("${Yy}") format("woff2");
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    @font-face {
      font-family: "Cormorant Garamond";
      font-style: normal;
      font-weight: 500;
      font-display: swap;
      src: url("${Xy}") format("woff2");
      unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }

    :root {
      --ploc-wine-font-family: "Cormorant Garamond", Georgia, serif;
    }
  `, document.head.append(e);
}
const qy = "data:font/woff2;base64,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", bh = "ploc-cellar-numeric-typography";
if (typeof document < "u" && !document.getElementById(bh)) {
  const e = document.createElement("style");
  e.id = bh, e.textContent = `
    @font-face {
      font-family: "DJB Get Digital";
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url("${qy}") format("woff2");
    }

    :root {
      --ploc-numeric-font-family: "DJB Get Digital", monospace;
    }
  `, document.head.append(e);
}
const yi = (e) => (t, r) => {
  r !== void 0 ? r.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const Zy = { attribute: !0, type: String, converter: bo, reflect: !1, hasChanged: rc }, Qy = (e = Zy, t, r) => {
  const { kind: i, metadata: n } = r;
  let a = globalThis.litPropertyMetadata.get(n);
  if (a === void 0 && globalThis.litPropertyMetadata.set(n, a = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(r.name, e), i === "accessor") {
    const { name: o } = r;
    return { set(s) {
      const l = t.get.call(this);
      t.set.call(this, s), this.requestUpdate(o, l, e, !0, s);
    }, init(s) {
      return s !== void 0 && this.C(o, void 0, e, s), s;
    } };
  }
  if (i === "setter") {
    const { name: o } = r;
    return function(s) {
      const l = this[o];
      t.call(this, s), this.requestUpdate(o, l, e, !0, s);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function or(e) {
  return (t, r) => typeof r == "object" ? Qy(e, t, r) : ((i, n, a) => {
    const o = n.hasOwnProperty(a);
    return n.constructor.createProperty(a, i), o ? Object.getOwnPropertyDescriptor(n, a) : void 0;
  })(e, t, r);
}
function ut(e) {
  return or({ ...e, state: !0, attribute: !1 });
}
const Ky = "Ploc Cellar", Jy = "Cellar storage", jy = "Refresh", $y = "Loading…", t0 = "Never", e0 = "Bottles in cellar", r0 = "Reconstructed stock", i0 = "Racks", n0 = "positions", a0 = "Empty positions", o0 = "Data may be stale: the latest synchronization failed.", s0 = "Stock reconstruction is incomplete: only physical quantities are available.", l0 = "Last successful synchronization", u0 = "Search wines", c0 = "Search wines…", h0 = "No matching wines.", f0 = "Select a Ploc Cellar configuration in the card editor.", v0 = "Rack selection", d0 = "occupied", p0 = "free", g0 = "Unknown wine", m0 = "Empty position", y0 = "Row", _0 = "Column", w0 = "No row/column coordinates are available for this rack.", b0 = "Positions without coordinates", S0 = "Not mapped", x0 = "No racks available.", T0 = "position(s) reference a missing rack.", C0 = "Wine inventory", A0 = "All colors", M0 = "All regions", D0 = "All appellations", k0 = "All vintages", L0 = "Sort by", I0 = "Name", E0 = "Quantity descending", P0 = "Vintage descending", R0 = "{count} wine(s)", O0 = "{count} bottle(s)", B0 = "Clear filters", N0 = "btl.", F0 = "Unknown vintage", U0 = "Wine details", z0 = "Grapes", V0 = "Cuvée", H0 = "Volume", W0 = "Locations", G0 = "Ploc Cellar", Y0 = "Cellar overview and stock indicators.", X0 = "Wine inventory", q0 = "Search, filter and browse the wine inventory.", Z0 = "Cellar racks", Q0 = "Visualize rack positions and the wines stored in them.", K0 = "Ploc Cellar configuration", J0 = "Select the PLOUD connection used by this card.", j0 = "Card title", $0 = "Optional. Leave empty to use the default title.", t_ = "Cellar statistics", e_ = "Bottles in stock", r_ = "wine references", i_ = "By color", n_ = "By region", a_ = "By appellation", o_ = "By vintage", s_ = "By bottle format", l_ = "Other", u_ = "Not specified", c_ = "No data available for this category.", h_ = "Unknown", f_ = "Wine references in stock", v_ = "Rack occupancy", d_ = "Stock diagnostics", p_ = "Unlocated bottles", g_ = "Negative movement balance", m_ = "Physical surplus", y_ = "Breakdowns include known wine references only.", __ = "{count} occupied position(s) have an unknown wine reference. They are included in total stock but not in the breakdowns.", w_ = "Show rack occupancy", b_ = "Show diagnostics", S_ = "Show statistics", x_ = "Show chart legends", T_ = "View details", C_ = "Wine references with stock that is not assigned to a physical rack position.", A_ = "Wine references where recorded outgoing movements exceed incoming movements.", M_ = "Wine references with more bottles physically stored than the reconstructed movement stock.", D_ = "Bottles concerned", k_ = "In cellar", L_ = "Reconstructed stock", I_ = "Incoming", E_ = "Outgoing", P_ = "Movement balance", R_ = "No wine-level details are available for this diagnostic.", O_ = "Vintage", B_ = "Producer", N_ = "Appellation", F_ = "Classification", U_ = "Wine color", z_ = "Region", V_ = "Country", H_ = "Region / country", W_ = "Grapes", G_ = "Cuvée", Y_ = "Bottle format", X_ = "Volume", q_ = "Serving temperature", Z_ = "Rack selection display", Q_ = "Buttons", K_ = "Dropdown list", J_ = "Stock", j_ = "Physically in cellar", $_ = "Reconstructed stock", tw = "Effective stock", ew = "PLOUD source stock", rw = "Stock movements and diagnostics", iw = "Purchased", nw = "Consumed", aw = "Movement balance", ow = "Calculated stock", sw = "Unlocated bottles", lw = "Negative movement bottles", uw = "Physical surplus", cw = "Wine characteristics", hw = "Alcohol", fw = "Notes", vw = "Food pairings", dw = "Aperitif", pw = "Soup", gw = "Starter", mw = "Pork and charcuterie", yw = "Seafood", _w = "Fish", ww = "White meat", bw = "Game", Sw = "Poultry", xw = "Red meat", Tw = "Dishes and vegetables", Cw = "Cheese", Aw = "Dessert", Mw = "No physical location is assigned to this wine.", Dw = "Rack positions are shown in a compact layout because their coordinates are too far apart.", kw = {
  card_title: Ky,
  rack_title: Jy,
  refresh: jy,
  loading: $y,
  never: t0,
  bottles_in_cellar: e0,
  reconstructed_stock: r0,
  racks: i0,
  positions: n0,
  empty_positions: a0,
  stale: o0,
  reconstruction_incomplete: s0,
  last_sync: l0,
  search_wine: u0,
  search_placeholder: c0,
  no_matching_wines: h0,
  select_config: f0,
  rack_selection: v0,
  occupied: d0,
  free: p0,
  unknown_wine: g0,
  empty_position: m0,
  row: y0,
  column: _0,
  no_coordinates: w0,
  positions_without_coordinates: b0,
  not_mapped: S0,
  no_racks: x0,
  missing_rack: T0,
  inventory_title: C0,
  filter_color: A0,
  filter_region: M0,
  filter_appellation: D0,
  filter_vintage: k0,
  sort_by: L0,
  sort_name: I0,
  sort_bottles: E0,
  sort_vintage: P0,
  inventory_results: R0,
  inventory_bottle_total: O0,
  clear_filters: B0,
  bottles_short: N0,
  unknown_vintage: F0,
  wine_details: U0,
  grapes: z0,
  cuvee: V0,
  bottle_volume: H0,
  locations: W0,
  picker_overview_name: G0,
  picker_overview_description: Y0,
  picker_inventory_name: X0,
  picker_inventory_description: q0,
  picker_rack_name: Z0,
  picker_rack_description: Q0,
  editor_configuration: K0,
  editor_configuration_helper: J0,
  editor_title: j0,
  editor_title_helper: $0,
  statistics_title: t_,
  statistics_bottles: e_,
  statistics_references: r_,
  statistics_color: i_,
  statistics_region: n_,
  statistics_appellation: a_,
  statistics_vintage: o_,
  statistics_format: s_,
  statistics_other: l_,
  statistics_unknown: u_,
  statistics_empty: c_,
  unknown_value: h_,
  stocked_references: f_,
  rack_occupancy: v_,
  inventory_diagnostics: d_,
  diagnostic_unlocated: p_,
  diagnostic_negative: g_,
  diagnostic_surplus: m_,
  statistics_distribution_scope: y_,
  statistics_unknown_wine_positions: __,
  editor_show_occupancy: w_,
  editor_show_diagnostics: b_,
  editor_show_statistics: S_,
  editor_show_statistics_legends: x_,
  diagnostic_detail_open: T_,
  diagnostic_detail_unlocated: C_,
  diagnostic_detail_negative: A_,
  diagnostic_detail_surplus: M_,
  diagnostic_detail_quantity: D_,
  diagnostic_detail_in_cellar: k_,
  diagnostic_detail_stock: L_,
  diagnostic_detail_purchased: I_,
  diagnostic_detail_consumed: E_,
  diagnostic_detail_balance: P_,
  diagnostic_detail_empty: R_,
  tooltip_vintage: O_,
  tooltip_domain: B_,
  tooltip_appellation: N_,
  tooltip_classification: F_,
  tooltip_color: U_,
  tooltip_region: z_,
  tooltip_country: V_,
  tooltip_region_country: H_,
  tooltip_grapes: W_,
  tooltip_cuvee: G_,
  tooltip_format: Y_,
  tooltip_volume: X_,
  tooltip_temperature: q_,
  editor_rack_picker_mode: Z_,
  editor_rack_picker_buttons: Q_,
  editor_rack_picker_dropdown: K_,
  wine_detail_stock: J_,
  wine_detail_physical: j_,
  wine_detail_reconstructed: $_,
  wine_detail_effective: tw,
  wine_detail_source_stock: ew,
  wine_detail_movements: rw,
  wine_detail_purchased: iw,
  wine_detail_consumed: nw,
  wine_detail_balance: aw,
  wine_detail_calculated: ow,
  wine_detail_unlocated: sw,
  wine_detail_negative: lw,
  wine_detail_surplus: uw,
  wine_detail_characteristics: cw,
  wine_detail_alcohol: hw,
  wine_detail_comment: fw,
  wine_detail_meals: vw,
  meal_aperitif: dw,
  meal_soup: pw,
  meal_entry: gw,
  meal_pork_butchery: mw,
  meal_seafood: yw,
  meal_fish: _w,
  meal_white_meat: ww,
  meal_game: bw,
  meal_poultry: Sw,
  meal_red_meat: xw,
  meal_dish_vegetable: Tw,
  meal_cheese: Cw,
  meal_dessert: Aw,
  wine_detail_no_locations: Mw,
  rack_grid_compacted: Dw
}, Lw = "Cave Ploc", Iw = "Rangement de la cave", Ew = "Actualiser", Pw = "Chargement…", Rw = "Jamais", Ow = "Bouteilles en cave", Bw = "Stock reconstitué", Nw = "Casiers", Fw = "places", Uw = "Places libres", zw = "Données potentiellement obsolètes : la dernière synchronisation a échoué.", Vw = "Reconstitution du stock en cours : seules les quantités physiques sont disponibles.", Hw = "Dernière synchronisation réussie", Ww = "Rechercher un vin", Gw = "Rechercher un vin…", Yw = "Aucun vin correspondant.", Xw = "Sélectionnez une configuration Ploc Cellar dans l’éditeur de carte.", qw = "Sélection du casier", Zw = "occupées", Qw = "libres", Kw = "Vin inconnu", Jw = "Emplacement libre", jw = "Rangée", $w = "Colonne", t1 = "Aucune coordonnée de rangée/colonne disponible pour ce casier.", e1 = "Emplacements sans coordonnées", r1 = "Non renseigné", i1 = "Aucun casier disponible.", n1 = "emplacement(s) référencent un casier absent.", a1 = "Inventaire des vins", o1 = "Toutes les couleurs", s1 = "Toutes les régions", l1 = "Toutes les appellations", u1 = "Tous les millésimes", c1 = "Trier par", h1 = "Nom", f1 = "Quantité décroissante", v1 = "Millésime décroissant", d1 = "{count} référence(s)", p1 = "{count} bouteille(s)", g1 = "Effacer les filtres", m1 = "bt.", y1 = "Millésime inconnu", _1 = "Détails du vin", w1 = "Cépages", b1 = "Cuvée", S1 = "Volume", x1 = "Emplacements", T1 = "Cave Ploc", C1 = "Vue d’ensemble de la cave et indicateurs de stock.", A1 = "Inventaire des vins", M1 = "Rechercher, filtrer et parcourir l’inventaire des vins.", D1 = "Casiers de la cave", k1 = "Visualiser les emplacements des casiers et les vins qui y sont rangés.", L1 = "Configuration Ploc Cellar", I1 = "Sélectionnez la connexion PLOUD utilisée par cette carte.", E1 = "Titre de la carte", P1 = "Facultatif. Laissez vide pour utiliser le titre par défaut.", R1 = "Statistiques de la cave", O1 = "Bouteilles en stock", B1 = "références de vin", N1 = "Par couleur", F1 = "Par région", U1 = "Par appellation", z1 = "Par millésime", V1 = "Par format de bouteille", H1 = "Autres", W1 = "Non renseigné", G1 = "Aucune donnée disponible pour cette catégorie.", Y1 = "Inconnu", X1 = "Références de vins en stock", q1 = "Occupation des casiers", Z1 = "Diagnostics du stock", Q1 = "Bouteilles non localisées", K1 = "Solde de mouvements négatif", J1 = "Excédent physique", j1 = "Les répartitions ne portent que sur les références de vins connues.", $1 = "{count} emplacement(s) occupé(s) font référence à un vin inconnu. Ils sont inclus dans le stock total, mais pas dans les répartitions.", tb = "Afficher l’occupation des casiers", eb = "Afficher les diagnostics", rb = "Afficher les statistiques", ib = "Afficher les légendes des graphiques", nb = "Voir le détail", ab = "Références de vins dont une partie du stock n’est affectée à aucun emplacement physique de casier.", ob = "Références de vins pour lesquelles les sorties enregistrées dépassent les entrées.", sb = "Références de vins ayant davantage de bouteilles physiquement rangées que le stock reconstitué à partir des mouvements.", lb = "Bouteilles concernées", ub = "En cave", cb = "Stock reconstitué", hb = "Entrées", fb = "Sorties", vb = "Solde des mouvements", db = "Aucun détail par référence de vin n’est disponible pour ce diagnostic.", pb = "Millésime", gb = "Domaine", mb = "Appellation", yb = "Classement", _b = "Couleur du vin", wb = "Région", bb = "Pays", Sb = "Région / pays", xb = "Cépages", Tb = "Cuvée", Cb = "Format de bouteille", Ab = "Volume", Mb = "Température de service", Db = "Affichage du choix de la cave", kb = "Boutons", Lb = "Liste déroulante", Ib = "Stock", Eb = "En cave physiquement", Pb = "Stock reconstitué", Rb = "Stock effectif", Ob = "Stock source PLOUD", Bb = "Mouvements et diagnostics du stock", Nb = "Achats", Fb = "Consommations", Ub = "Solde des mouvements", zb = "Stock calculé", Vb = "Bouteilles non localisées", Hb = "Bouteilles au solde négatif", Wb = "Excédent physique", Gb = "Caractéristiques du vin", Yb = "Degré d’alcool", Xb = "Notes", qb = "Accords mets et vins", Zb = "Apéritif", Qb = "Soupe", Kb = "Entrée", Jb = "Charcuterie et porc", jb = "Fruits de mer", $b = "Poissons", tS = "Viandes blanches", eS = "Gibier", rS = "Volailles", iS = "Viandes rouges", nS = "Plats et légumes", aS = "Fromages", oS = "Desserts", sS = "Aucun emplacement physique n’est affecté à ce vin.", lS = "La disposition des emplacements est condensée car les coordonnées sont trop espacées.", uS = {
  card_title: Lw,
  rack_title: Iw,
  refresh: Ew,
  loading: Pw,
  never: Rw,
  bottles_in_cellar: Ow,
  reconstructed_stock: Bw,
  racks: Nw,
  positions: Fw,
  empty_positions: Uw,
  stale: zw,
  reconstruction_incomplete: Vw,
  last_sync: Hw,
  search_wine: Ww,
  search_placeholder: Gw,
  no_matching_wines: Yw,
  select_config: Xw,
  rack_selection: qw,
  occupied: Zw,
  free: Qw,
  unknown_wine: Kw,
  empty_position: Jw,
  row: jw,
  column: $w,
  no_coordinates: t1,
  positions_without_coordinates: e1,
  not_mapped: r1,
  no_racks: i1,
  missing_rack: n1,
  inventory_title: a1,
  filter_color: o1,
  filter_region: s1,
  filter_appellation: l1,
  filter_vintage: u1,
  sort_by: c1,
  sort_name: h1,
  sort_bottles: f1,
  sort_vintage: v1,
  inventory_results: d1,
  inventory_bottle_total: p1,
  clear_filters: g1,
  bottles_short: m1,
  unknown_vintage: y1,
  wine_details: _1,
  grapes: w1,
  cuvee: b1,
  bottle_volume: S1,
  locations: x1,
  picker_overview_name: T1,
  picker_overview_description: C1,
  picker_inventory_name: A1,
  picker_inventory_description: M1,
  picker_rack_name: D1,
  picker_rack_description: k1,
  editor_configuration: L1,
  editor_configuration_helper: I1,
  editor_title: E1,
  editor_title_helper: P1,
  statistics_title: R1,
  statistics_bottles: O1,
  statistics_references: B1,
  statistics_color: N1,
  statistics_region: F1,
  statistics_appellation: U1,
  statistics_vintage: z1,
  statistics_format: V1,
  statistics_other: H1,
  statistics_unknown: W1,
  statistics_empty: G1,
  unknown_value: Y1,
  stocked_references: X1,
  rack_occupancy: q1,
  inventory_diagnostics: Z1,
  diagnostic_unlocated: Q1,
  diagnostic_negative: K1,
  diagnostic_surplus: J1,
  statistics_distribution_scope: j1,
  statistics_unknown_wine_positions: $1,
  editor_show_occupancy: tb,
  editor_show_diagnostics: eb,
  editor_show_statistics: rb,
  editor_show_statistics_legends: ib,
  diagnostic_detail_open: nb,
  diagnostic_detail_unlocated: ab,
  diagnostic_detail_negative: ob,
  diagnostic_detail_surplus: sb,
  diagnostic_detail_quantity: lb,
  diagnostic_detail_in_cellar: ub,
  diagnostic_detail_stock: cb,
  diagnostic_detail_purchased: hb,
  diagnostic_detail_consumed: fb,
  diagnostic_detail_balance: vb,
  diagnostic_detail_empty: db,
  tooltip_vintage: pb,
  tooltip_domain: gb,
  tooltip_appellation: mb,
  tooltip_classification: yb,
  tooltip_color: _b,
  tooltip_region: wb,
  tooltip_country: bb,
  tooltip_region_country: Sb,
  tooltip_grapes: xb,
  tooltip_cuvee: Tb,
  tooltip_format: Cb,
  tooltip_volume: Ab,
  tooltip_temperature: Mb,
  editor_rack_picker_mode: Db,
  editor_rack_picker_buttons: kb,
  editor_rack_picker_dropdown: Lb,
  wine_detail_stock: Ib,
  wine_detail_physical: Eb,
  wine_detail_reconstructed: Pb,
  wine_detail_effective: Rb,
  wine_detail_source_stock: Ob,
  wine_detail_movements: Bb,
  wine_detail_purchased: Nb,
  wine_detail_consumed: Fb,
  wine_detail_balance: Ub,
  wine_detail_calculated: zb,
  wine_detail_unlocated: Vb,
  wine_detail_negative: Hb,
  wine_detail_surplus: Wb,
  wine_detail_characteristics: Gb,
  wine_detail_alcohol: Yb,
  wine_detail_comment: Xb,
  wine_detail_meals: qb,
  meal_aperitif: Zb,
  meal_soup: Qb,
  meal_entry: Kb,
  meal_pork_butchery: Jb,
  meal_seafood: jb,
  meal_fish: $b,
  meal_white_meat: tS,
  meal_game: eS,
  meal_poultry: rS,
  meal_red_meat: iS,
  meal_dish_vegetable: nS,
  meal_cheese: aS,
  meal_dessert: oS,
  wine_detail_no_locations: sS,
  rack_grid_compacted: lS
};
function Ot(e, t) {
  return (e.toLocaleLowerCase().startsWith("fr") ? uS : kw)[t];
}
function $i(e) {
  const t = typeof navigator > "u" ? "en" : navigator.language;
  return Ot(t, e);
}
const As = /* @__PURE__ */ new WeakMap();
function oc(e, t) {
  let r = As.get(e);
  r || (r = /* @__PURE__ */ new Map(), As.set(e, r));
  const i = r.get(t);
  if (i) return i;
  const n = e.callWS({
    type: "call_service",
    domain: "ploc_cellar",
    service: "get_inventory",
    service_data: { config_entry_id: t },
    return_response: !0
  }).then((o) => o.response);
  let a;
  return a = n.finally(() => {
    r?.get(t) === a && (r.delete(t), r.size === 0 && As.delete(e));
  }), r.set(t, a), a;
}
class cS {
  constructor(t = (i) => URL.createObjectURL(i), r = (i) => URL.revokeObjectURL(i)) {
    this.createObjectUrl = t, this.revokeObjectUrl = r, this.objectUrl = null, this.loadedPath = null, this.pendingPath = null, this.request = 0;
  }
  async load(t, r, i) {
    if (t === this.loadedPath && (this.objectUrl !== null || this.pendingPath === t)) return;
    const n = ++this.request;
    if (this.revokeCurrent(), i(null), this.loadedPath = t, this.pendingPath = t, !t || !r) {
      this.pendingPath = null;
      return;
    }
    try {
      const a = await r(t);
      if (!a.ok) return;
      const o = await a.blob();
      if (n !== this.request) return;
      const s = this.createObjectUrl(o);
      this.objectUrl = s, i(s);
    } catch {
    } finally {
      n === this.request && (this.pendingPath = null);
    }
  }
  dispose(t) {
    this.request += 1, this.loadedPath = null, this.pendingPath = null, this.revokeCurrent(), t?.(null);
  }
  revokeCurrent() {
    this.objectUrl !== null && (this.revokeObjectUrl(this.objectUrl), this.objectUrl = null);
  }
}
const hS = [
  [1, "meal_aperitif"],
  [2, "meal_soup"],
  [4, "meal_entry"],
  [8, "meal_pork_butchery"],
  [16, "meal_seafood"],
  [32, "meal_fish"],
  [64, "meal_white_meat"],
  [128, "meal_game"],
  [256, "meal_poultry"],
  [512, "meal_red_meat"],
  [1024, "meal_dish_vegetable"],
  [2048, "meal_cheese"],
  [4096, "meal_dessert"]
];
function fS(e) {
  return e == null || !Number.isSafeInteger(e) || e < 0 ? [] : hS.filter(([t]) => Math.floor(e / t) % 2 === 1).map(([, t]) => t);
}
var vS = Object.defineProperty, dS = Object.getOwnPropertyDescriptor, es = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? dS(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (i ? o(t, r, n) : o(n)) || n);
  return i && n && vS(t, r, n), n;
};
let tn = class extends Ue {
  constructor() {
    super(...arguments), this.imageUrl = null, this.imageLoader = new cS();
  }
  updated(e) {
    (e.has("wine") || e.has("hass")) && this.loadWineImage();
  }
  connectedCallback() {
    super.connectedCallback(), this.wine?.image_url && this.hass && this.loadWineImage();
  }
  disconnectedCallback() {
    this.imageLoader.dispose((e) => {
      this.imageUrl = e;
    }), super.disconnectedCallback();
  }
  async loadWineImage() {
    const e = this.hass;
    this.imageHass !== e && (this.imageHass = e, this.imageLoader.dispose((t) => {
      this.imageUrl = t;
    })), await this.imageLoader.load(
      this.wine?.image_url ?? null,
      e ? (t) => e.fetchWithAuth(t) : void 0,
      (t) => {
        this.imageUrl = t;
      }
    );
  }
  get language() {
    return this.hass?.language ?? "en";
  }
  t(e) {
    return Ot(this.language, e);
  }
  formatNumber(e) {
    return new Intl.NumberFormat(this.language, { maximumFractionDigits: 2 }).format(e);
  }
  field(e, t) {
    return t == null || t === "" ? O : E`
      <div class="field">
        <dt>${this.t(e)}</dt>
        <dd>${t}</dd>
      </div>
    `;
  }
  stockItem(e, t) {
    return t == null ? O : E`
      <div class="stock-item">
        <span class="stock-value">${this.formatNumber(t)}</span>
        <span class="stock-label">${this.t(e)}</span>
      </div>
    `;
  }
  get colorStyle() {
    const e = this.wine?.color_rgb;
    return !e || e.length !== 3 || !e.every(
      (t) => Number.isInteger(t) && t >= 0 && t <= 255
    ) ? "background: var(--secondary-text-color);" : `background: rgb(${e[0]} ${e[1]} ${e[2]});`;
  }
  renderIdentity(e) {
    const t = [e.domain, e.appellation, e.region, e.country].filter((i) => !!i), r = [
      e.vintage === null ? this.t("unknown_vintage") : String(e.vintage),
      e.color,
      e.bottle_format
    ].filter((i) => !!i);
    return E`
      <div class="identity">
        <span class="color-swatch" style=${this.colorStyle} aria-hidden="true"></span>
        <div class="identity-text">
          ${t.length ? E`<div class="subtitle">${t.join(" · ")}</div>` : O}
          ${r.length ? E`<div class="tags">${r.map((i) => E`<span class="tag">${i}</span>`)}</div>` : O}
        </div>
      </div>
    `;
  }
  renderStock(e) {
    const t = e.purchased !== null || e.consumed !== null || e.movement_balance !== null || e.calculated_stock !== null || e.negative_movement_bottles !== null || e.physical_surplus_bottles !== null || e.unlocated_bottles !== null;
    return E`
      <section>
        <h3>${this.t("wine_detail_stock")}</h3>
        <div class="stock">
          ${this.stockItem("wine_detail_physical", e.bottles_in_cellar)}
          ${this.stockItem("wine_detail_reconstructed", e.bottles)}
          ${this.stockItem("wine_detail_effective", e.effective_stock)}
          ${this.stockItem("wine_detail_source_stock", e.ploud_bottles)}
        </div>
        ${t ? E`
          <h3 style="margin-top: 16px">${this.t("wine_detail_movements")}</h3>
          <dl>
            ${this.field("wine_detail_purchased", e.purchased)}
            ${this.field("wine_detail_consumed", e.consumed)}
            ${this.field("wine_detail_balance", e.movement_balance)}
            ${this.field("wine_detail_calculated", e.calculated_stock)}
            ${this.field("wine_detail_unlocated", e.unlocated_bottles)}
            ${this.field("wine_detail_negative", e.negative_movement_bottles)}
            ${this.field("wine_detail_surplus", e.physical_surplus_bottles)}
          </dl>
        ` : O}
      </section>
    `;
  }
  renderMeals(e) {
    const t = fS(e.meals);
    return t.length ? E`
      <section>
        <h3>${this.t("wine_detail_meals")}</h3>
        <div class="tags">
          ${t.map((r) => E`<span class="tag">${this.t(r)}</span>`)}
        </div>
      </section>
    ` : O;
  }
  renderLocations(e) {
    return e.locations.length ? E`
      <div class="locations">
        ${e.locations.map((t) => E`
          <div class="location">
            <strong>${t.rack}</strong>
            ${t.row !== null && t.column !== null ? E`<span class="muted"> · ${this.t("row")} ${t.row + 1}, ${this.t("column")} ${t.column + 1}</span>` : O}
          </div>
        `)}
      </div>
    ` : E`<p class="muted">${this.t("wine_detail_no_locations")}</p>`;
  }
  onDialogClosed() {
    this.dispatchEvent(new CustomEvent("wine-detail-closed", {
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    const e = this.wine;
    if (!e) return O;
    const t = e.service_temperature_min !== null || e.service_temperature_max !== null ? `${e.service_temperature_min === null ? "—" : this.formatNumber(e.service_temperature_min)}–${e.service_temperature_max === null ? "—" : this.formatNumber(e.service_temperature_max)} °C` : null;
    return E`
      <ha-dialog .open=${!0} .accessibleLabel=${e.name} @closed=${() => this.onDialogClosed()}>
        <span slot="headerTitle" class="wine-dialog-title">${e.name}</span>
        <div class="content">
          ${this.imageUrl ? E`
            <div class="wine-image-container">
              <img class="wine-image" src=${this.imageUrl} alt=${e.name} />
            </div>
          ` : O}
          ${this.renderIdentity(e)}
          ${this.renderStock(e)}
          ${this.renderMeals(e)}
          <section>
            <h3>${this.t("wine_detail_characteristics")}</h3>
            <dl>
              ${this.field("tooltip_domain", e.domain)}
              ${this.field("tooltip_vintage", e.vintage)}
              ${this.field("tooltip_appellation", e.appellation)}
              ${this.field("tooltip_classification", e.classification)}
              ${this.field("tooltip_color", e.color)}
              ${this.field("tooltip_region", e.region)}
              ${this.field("tooltip_country", e.country)}
              ${this.field("tooltip_grapes", e.grapes)}
              ${this.field("tooltip_cuvee", e.cuvee)}
              ${this.field("tooltip_format", e.bottle_format)}
              ${this.field("tooltip_volume", e.bottle_volume_l === null ? null : `${this.formatNumber(e.bottle_volume_l)} L`)}
              ${this.field("wine_detail_alcohol", e.alcohol_percent === null ? null : `${this.formatNumber(e.alcohol_percent)} %`)}
              ${this.field("tooltip_temperature", t)}
            </dl>
          </section>
          <section>
            <h3>${this.t("locations")}</h3>
            ${this.renderLocations(e)}
          </section>
          ${e.comment ? E`
            <section>
              <h3>${this.t("wine_detail_comment")}</h3>
              <div class="comment">${e.comment}</div>
            </section>
          ` : O}
        </div>
      </ha-dialog>
    `;
  }
};
tn.styles = ca`
    :host {
      color: var(--primary-text-color);
      --mdc-dialog-min-width: min(560px, calc(100vw - 32px));
      --mdc-dialog-max-width: min(760px, calc(100vw - 32px));
    }
    :host { --ploc-wine-font-family: "Cormorant Garamond", Georgia, serif; }
    .content { display: grid; gap: 20px; min-width: 0; }
    .wine-dialog-title { font-family: var(--ploc-wine-font-family); font-size: 1.45rem; font-weight: 500; line-height: 1.2; white-space: normal; }
    .wine-image-container { display: flex; justify-content: center; min-width: 0; max-height: 320px; overflow: hidden; }
    .wine-image { display: block; max-width: 100%; max-height: 320px; object-fit: contain; border-radius: 10px; }
    .identity { display: flex; align-items: flex-start; gap: 12px; min-width: 0; }
    .color-swatch {
      display: block;
      flex: 0 0 24px;
      width: 24px;
      height: 24px;
      border: 2px solid var(--divider-color);
      border-radius: 50%;
      box-shadow: inset 0 1px 3px rgb(0 0 0 / 25%), 0 1px 2px rgb(0 0 0 / 15%);
      box-sizing: border-box;
    }
    .identity-text { min-width: 0; }
    .subtitle { margin-top: 4px; color: var(--secondary-text-color); line-height: 1.45; }
    .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
    .tag {
      padding: 4px 9px;
      border-radius: 999px;
      background: var(--secondary-background-color);
      font-size: .82rem;
    }
    section { min-width: 0; }
    h3 {
      margin: 0 0 10px;
      font-size: .95rem;
      font-weight: 600;
    }
    dl {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 210px), 1fr));
      gap: 12px 20px;
      margin: 0;
    }
    .field { min-width: 0; }
    dt { color: var(--secondary-text-color); font-size: .82rem; }
    dd { margin: 3px 0 0; overflow-wrap: anywhere; line-height: 1.4; }
    .stock { display: grid; grid-template-columns: repeat(auto-fit, minmax(125px, 1fr)); gap: 8px; }
    .stock-item {
      min-width: 0;
      padding: 10px 12px;
      border-radius: 9px;
      background: var(--secondary-background-color);
    }
    .stock-value { display: block; font-size: 1.2rem; font-weight: 600; font-variant-numeric: tabular-nums; }
    .stock-label { display: block; margin-top: 3px; color: var(--secondary-text-color); font-size: .8rem; }
    .locations { display: grid; gap: 7px; }
    .location { padding: 8px 10px; border: 1px solid var(--divider-color); border-radius: 8px; }
    .muted { color: var(--secondary-text-color); font-size: .88rem; }
    .comment { white-space: pre-wrap; overflow-wrap: anywhere; line-height: 1.5; }
    @media (max-width: 480px) {
      .content { gap: 16px; }
      dl { grid-template-columns: minmax(0, 1fr); }
    }
  `;
es([
  or({ attribute: !1 })
], tn.prototype, "hass", 2);
es([
  or({ attribute: !1 })
], tn.prototype, "wine", 2);
es([
  ut()
], tn.prototype, "imageUrl", 2);
tn = es([
  yi("ploc-cellar-wine-detail")
], tn);
const pS = 400, gS = 4;
function mS(e) {
  if (e.length === 0)
    return {
      compact: !1,
      rowCount: 0,
      columnCount: 0,
      positions: [],
      missingCoordinates: []
    };
  let t = Number.POSITIVE_INFINITY, r = Number.NEGATIVE_INFINITY, i = Number.POSITIVE_INFINITY, n = Number.NEGATIVE_INFINITY;
  for (const c of e)
    t = Math.min(t, c.row), r = Math.max(r, c.row), i = Math.min(i, c.column), n = Math.max(n, c.column);
  const a = r - t + 1, o = n - i + 1;
  if (Number.isSafeInteger(a) && Number.isSafeInteger(o) && a > 0 && o > 0 && a <= pS / o) {
    const c = new Set(e.map((v) => `${v.row}:${v.column}`)), h = [];
    for (let v = t; v <= r; v += 1)
      for (let f = i; f <= n; f += 1)
        c.has(`${v}:${f}`) || h.push({ row: v, column: f });
    return {
      compact: !1,
      rowCount: a,
      columnCount: o,
      positions: e.map((v) => ({
        id: v.id,
        row: v.row - t + 1,
        column: v.column - i + 1
      })),
      missingCoordinates: h.map((v) => ({
        row: v.row - t + 1,
        column: v.column - i + 1
      }))
    };
  }
  const l = Math.min(
    gS,
    Math.max(1, Math.ceil(Math.sqrt(e.length)))
  ), u = [...e].sort(
    (c, h) => c.row - h.row || c.column - h.column || c.id.localeCompare(h.id)
  );
  return {
    compact: !0,
    rowCount: Math.ceil(u.length / l),
    columnCount: l,
    positions: u.map((c, h) => ({
      id: c.id,
      row: Math.floor(h / l) + 1,
      column: h % l + 1
    })),
    missingCoordinates: []
  };
}
function yS(e, t, r, i, n, a, o = 12) {
  const s = Math.max(o, n - r - o), l = Math.max(o, a - i - o);
  return {
    left: Math.min(Math.max(o, e), s),
    top: Math.min(Math.max(o, t), l)
  };
}
var _S = Object.defineProperty, wS = Object.getOwnPropertyDescriptor, sr = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? wS(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (i ? o(t, r, n) : o(n)) || n);
  return i && n && _S(t, r, n), n;
};
let Se = class extends Ue {
  constructor() {
    super(...arguments), this.loading = !1, this.requestGeneration = 0;
  }
  static getConfigElement() {
    return document.createElement("ploc-cellar-card-editor");
  }
  static getStubConfig() {
    return {};
  }
  setConfig(e) {
    this.requestGeneration += 1, this.loading = !1, this.config = e, this.inventory = void 0, this.error = void 0, this.config.config_entry_id && this.refresh();
  }
  updated() {
    this.hass && this.config && !this.inventory && !this.loading && !this.error && this.refresh(), this.activeTooltip && this.applyTooltipPosition();
  }
  async refresh() {
    const e = this.hass, t = this.config;
    if (!e || !t?.config_entry_id || this.loading) return;
    const r = t.config_entry_id, i = ++this.requestGeneration;
    this.loading = !0, this.error = void 0;
    try {
      const n = await oc(e, r);
      i === this.requestGeneration && (this.inventory = n, (!this.selectedRackId || !this.inventory.racks.some((a) => a.id === this.selectedRackId)) && (this.selectedRackId = this.inventory.racks[0]?.id));
    } catch (n) {
      i === this.requestGeneration && (this.error = n instanceof Error ? n.message : String(n));
    } finally {
      i === this.requestGeneration && (this.loading = !1);
    }
  }
  selectRack(e) {
    e.currentTarget instanceof HTMLSelectElement && (this.selectedRackId = e.currentTarget.value);
  }
  wineLabel(e, t) {
    if (!e.wine_id) return "";
    const r = t.get(e.wine_id);
    return r ? r.name : Ot(this.hass?.language ?? "en", "unknown_wine");
  }
  displayWineLabel(e, t) {
    return this.wineLabel(e, t);
  }
  wineColor(e) {
    const t = e?.color_rgb;
    return !t || t.length !== 3 || !t.every((r) => Number.isInteger(r) && r >= 0 && r <= 255) ? "var(--secondary-text-color)" : `rgb(${t[0]} ${t[1]} ${t[2]})`;
  }
  wineTooltipFields(e) {
    const t = this.hass?.language ?? "en", r = (a) => Ot(t, a), i = [];
    e.vintage !== null && i.push([r("tooltip_vintage"), String(e.vintage)]), e.appellation && i.push([r("tooltip_appellation"), e.appellation]);
    const n = [e.region, e.country].filter(Boolean).join(" / ");
    return n && i.push([r("tooltip_region_country"), n]), i;
  }
  showWineTooltip(e, t) {
    const r = e.currentTarget;
    if (!(r instanceof HTMLElement)) return;
    const i = r.getBoundingClientRect(), n = "clientX" in e;
    this.tooltipPosition = {
      left: n ? e.clientX + 12 : i.right + 8,
      top: n ? e.clientY + 12 : i.top
    }, this.activeTooltip = { wine: t, color: this.wineColor(t) };
  }
  /**
   * Move an already-rendered tooltip without scheduling a Lit update for every
   * pointer event. Lit remains responsible for its content and visibility.
   */
  moveWineTooltip(e) {
    this.activeTooltip && (this.tooltipPosition = {
      left: e.clientX + 12,
      top: e.clientY + 12
    }, this.applyTooltipPosition());
  }
  applyTooltipPosition() {
    const e = this.renderRoot.querySelector(".wine-tooltip"), t = this.tooltipPosition;
    if (!e || !t) return;
    const r = yS(
      t.left,
      t.top,
      e.offsetWidth,
      e.offsetHeight,
      window.innerWidth,
      window.innerHeight
    );
    e.style.left = `${r.left}px`, e.style.top = `${r.top}px`;
  }
  hideWineTooltip() {
    this.activeTooltip = void 0, this.tooltipPosition = void 0;
  }
  render() {
    const e = (g) => Ot(this.hass?.language ?? "en", g), t = this.inventory, r = t?.racks.find((g) => g.id === this.selectedRackId), i = (t?.rack_items ?? []).filter((g) => g.rack_id === this.selectedRackId), n = new Map((t?.wines ?? []).map((g) => [g.id, g])), a = i.reduce((g, p) => g + +!!p.wine_id, 0), o = i.length - a, s = i.length ? a / i.length * 100 : 0, l = i.filter(
      (g) => Number.isSafeInteger(g.row) && Number.isSafeInteger(g.column)
    ), u = /* @__PURE__ */ new Map();
    for (const g of i) {
      if (!g.wine_id) continue;
      const p = n.get(g.wine_id)?.color?.trim();
      p && u.set(p, (u.get(p) ?? 0) + 1);
    }
    const c = [...u.entries()].sort(([g], [p]) => g.localeCompare(p, this.hass?.language)), h = mS(
      l.map((g) => ({
        id: g.id,
        row: g.row,
        column: g.column
      }))
    ), v = new Map(
      h.positions.map((g) => [g.id, g])
    ), f = i.filter(
      (g) => !Number.isSafeInteger(g.row) || !Number.isSafeInteger(g.column)
    ), d = (t?.rack_items ?? []).filter(
      (g) => !t?.racks.some((p) => p.id === g.rack_id)
    );
    return E`
      <ha-card>
        <header>
          <h2>${this.config?.title ?? e("rack_title")}</h2>
          <button ?disabled=${this.loading} @click=${() => this.refresh()}>${this.loading ? "…" : e("refresh")}</button>
        </header>
        ${this.error ? E`<div class="error">${this.error}</div>` : O}
        ${this.config?.config_entry_id ? O : E`<div class="muted">${e("select_config")}</div>`}
        ${t?.stale ? E`<div class="warning">${e("stale")}</div>` : O}
        ${t?.racks.length ? E`
          ${t.racks.length > 1 ? this.config?.rack_picker_mode === "dropdown" ? E`
                <div class="rack-picker">
                  <select class="rack-picker-select"
                    aria-label=${e("rack_selection")}
                    .value=${this.selectedRackId ?? ""}
                    @change=${this.selectRack}>
                    ${t.racks.map((g) => E`
                      <option value=${g.id}>${g.name}</option>
                    `)}
                  </select>
                </div>
              ` : E`
                <nav class="rack-picker" aria-label=${e("rack_selection")}>
                  ${t.racks.map((g) => E`
                    <button aria-pressed=${g.id === this.selectedRackId}
                      @click=${() => {
      this.selectedRackId = g.id;
    }}>${g.name}</button>
                  `)}
                </nav>
              ` : O}
          <div class="rack-summary">
            <div class="rack-name">${r?.name ?? ""}</div>
            ${c.length ? E`<div class="color-counts">${c.map(([g, p], m) => E`${m ? " · " : O}<span class="color-count">${g}: <span class="numeric-value">${p}</span></span>`)}</div>` : O}
          </div>
          <div class="rack-occupancy"
            role="progressbar"
            aria-label="${e("occupied")} / ${e("free")}"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow=${Math.round(s)}
            aria-valuetext=${`${i.length} ${e("positions")}, ${a} ${e("occupied")}, ${o} ${e("free")}`}>
            <div class="rack-occupancy-fill" style=${`width: ${s}%;`}></div>
            <div class="rack-occupancy-label">
              <span class="numeric-value">${i.length}</span>&nsp;${e("positions")}&nbsp;·&nbsp;<span class="numeric-value">${a}</span>&nbsp;${e("occupied")}&nbsp;·&nbsp;<span class="numeric-value">${o}</span>&nbsp;${e("free")}
            </div>
          </div>
          ${l.length ? E`
            ${h.compact ? E`<div class="warning">${e("rack_grid_compacted")}</div>` : O}
            <div class="grid-wrap">
              <div class="rack-grid" style=${`grid-template-columns: repeat(${h.columnCount}, 98px); grid-template-rows: repeat(${h.rowCount}, 98px);`}>
                ${l.map((g) => {
      const p = v.get(g.id);
      if (!p) return O;
      const m = !!g.wine_id, y = g.wine_id ? n.get(g.wine_id) : void 0, _ = m ? this.wineLabel(g, n) : e("empty_position");
      return E`
                    <div class=${m ? "slot occupied" : "slot empty"}
                      style=${`grid-row: ${p.row}; grid-column: ${p.column};`}
                      aria-label=${_}
                      aria-describedby=${m && this.activeTooltip?.wine === y ? "ploc-cellar-wine-tooltip" : O}
                      role=${y ? "button" : m ? "img" : O}
                      aria-haspopup=${y ? "dialog" : O}
                      tabindex=${m ? "0" : O}
                      @click=${y ? () => {
        this.selectedWine = y;
      } : O}
                      @keydown=${y ? (w) => {
        (w.key === "Enter" || w.key === " ") && (w.preventDefault(), this.selectedWine = y);
      } : O}
                      @pointerenter=${m ? (w) => this.showWineTooltip(w, y) : O}
                      @pointermove=${m ? (w) => this.moveWineTooltip(w) : O}
                      @pointerleave=${m ? () => this.hideWineTooltip() : O}
                      @focus=${m ? (w) => this.showWineTooltip(w, y) : O}
                      @blur=${m ? () => this.hideWineTooltip() : O}>
                      ${m ? E`<span class="bottle-marker" style=${`--bottle-color: ${this.wineColor(y)};`} aria-hidden="true"></span>` : O}
                      ${m ? E`<strong>${this.displayWineLabel(g, n)}</strong>` : E`<span class="empty-shelf" aria-hidden="true"></span>`}
                      <small>r${g.row + 1};c${g.column + 1}</small>
                    </div>
                  `;
    })}
                ${h.missingCoordinates.map((g) => E`
                  <div class="slot missing"
                    style=${`grid-row: ${g.row}; grid-column: ${g.column};`}>
                    <strong>—</strong>
                    <small>${e("not_mapped")}</small>
                  </div>
                `)}
              </div>
            </div>
          ` : E`<div class="warning">${e("no_coordinates")}</div>`}
          ${f.length ? E`
            <div class="unplaced">
              <strong>${e("positions_without_coordinates")}</strong>
              ${f.map((g) => E`<div class="unplaced-item">${this.wineLabel(g, n) || e("empty_position")}</div>`)}
            </div>
          ` : O}
        ` : E`<p class="muted">${e("no_racks")}</p>`}
        ${d.length ? E`
          <div class="warning"><span class="numeric-value">${d.length}</span> ${e("missing_rack")}</div>
        ` : O}
        ${this.activeTooltip ? E`
          <div class="wine-tooltip"
            id="ploc-cellar-wine-tooltip"
            role="tooltip"
            style=${`left: 12px; top: 12px; --wine-tooltip-border-color: ${this.activeTooltip.color};`}>
            ${this.activeTooltip.wine ? E`
              <div class="wine-tooltip-name">${this.activeTooltip.wine.name}</div>
              <dl class="wine-tooltip-details">
                ${this.wineTooltipFields(this.activeTooltip.wine).map(([g, p]) => E`
                  <dt>${g}</dt><dd>${p}</dd>
                `)}
              </dl>
            ` : e("unknown_wine")}
          </div>
        ` : O}
        ${this.selectedWine ? E`
          <ploc-cellar-wine-detail
            .hass=${this.hass}
            .wine=${this.selectedWine}
            @wine-detail-closed=${() => {
      this.selectedWine = void 0;
    }}>
          </ploc-cellar-wine-detail>
        ` : O}
      </ha-card>
    `;
  }
  getCardSize() {
    return 5;
  }
  getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      rows: "auto"
    };
  }
};
Se.styles = ca`
    :host { display: block; }
    ha-card { padding: 16px; color: var(--primary-text-color); }
    header { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    h2 { margin: 0; font-size: 1.2rem; font-weight: 500; }
    button { color: var(--primary-text-color); background: var(--secondary-background-color); border: 1px solid var(--divider-color); border-radius: 8px; padding: 8px 12px; cursor: pointer; }
    button[aria-pressed="true"] { border-color: var(--primary-color); background: var(--secondary-background-color); }
    button[disabled] { opacity: .5; cursor: default; }
    .rack-picker { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin: 14px 0; }
    .rack-picker-select { width: 100%; max-width: 360px; min-height: 40px; padding: 8px 12px; color: var(--primary-text-color); background: var(--card-background-color); border: 1px solid var(--divider-color); border-radius: 8px; font: inherit; }
    .grid-wrap { display: flex; justify-content: safe center; overflow-x: auto; padding: 0; }
    .rack-grid { display: grid; flex: 0 0 auto; gap: 6px; width: max-content; min-width: min-content; }
    .rack-summary { color: var(--secondary-text-color); font-size: .85rem; line-height: 1.2; text-align: center; }
    .rack-name { color: var(--primary-text-color); font-size: 1rem; font-weight: 500; }
    .color-counts { color: var(--secondary-text-color); text-align: center; }
    .rack-occupancy { position: relative; height: 20px; margin: 0 0 0; overflow: hidden; border-radius: 6px; background: var(--secondary-background-color); margin: 4px 0 8px 0; }
    .rack-occupancy-fill { height: 100%; background: var(--primary-color); transition: width 180ms ease; }
    .rack-occupancy-label { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding: 0 8px; color: var(--primary-text-color); font-size: .9rem; font-weight: 500; line-height: 1; text-align: center; text-shadow: 0 1px 2px var(--card-background-color), 1px 0 2px var(--card-background-color), 0 -1px 2px var(--card-background-color), -1px 0 2px var(--card-background-color); white-space: nowrap; }
    .numeric-value { font-family: var(--ploc-numeric-font-family); font-weight: 400; font-variant-numeric: tabular-nums; }
    .color-count { white-space: nowrap; }
    .slot { width: 98px; height: 98px; min-width: 98px; min-height: 98px; display: flex; overflow: hidden; flex-direction: column; justify-content: flex-start; align-items: center; gap: 3px; text-align: center; padding: 5px 4px; border-radius: 8px; border: 1px solid var(--divider-color); background: var(--secondary-background-color); box-sizing: border-box; }
    .slot.occupied { border-color: var(--primary-color); background: var(--card-background-color); cursor: help; }
    .slot.occupied[role="button"] { cursor: pointer; }
    .slot.occupied:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
    .wine-tooltip { position: fixed; z-index: 1000; max-width: min(360px, calc(100vw - 24px)); padding: 5px 8px; border: 1px solid var(--wine-tooltip-border-color, var(--secondary-text-color)); border-radius: 4px; background: var(--card-background-color); color: var(--primary-text-color); box-shadow: 0 2px 8px rgb(0 0 0 / 25%); font-size: 10px; pointer-events: none; overflow-wrap: anywhere; }
    .wine-tooltip-name { margin: 0 0 4px; font-size: 1.12em; font-weight: 500; line-height: 1.2; }
    .wine-tooltip-details { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 2px 8px; margin: 0; }
    .wine-tooltip-details dt { color: var(--secondary-text-color); }
    .wine-tooltip-details dd { margin: 0; }
    .slot.missing { border-style: dashed; color: var(--secondary-text-color); background: transparent; }
    .slot.empty { position: relative; }
    .empty-shelf { display: block; position: relative; flex: 0 0 28px; width: 28px; height: 28px; margin: 0; box-sizing: border-box; }
    .empty-shelf::after { content: ""; position: absolute; right: 0; bottom: 0; left: 0; height: 14px; border: 2px solid var(--secondary-text-color); border-top: 0; border-radius: 0 0 14px 14px; box-sizing: border-box; opacity: .75; }
    .slot strong { display: -webkit-box; width: 100%; min-height: 3.45em; max-height: 3.45em; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 3; font-size: .76rem; line-height: 1.15; overflow-wrap: anywhere; }
    .slot.occupied strong { min-height: calc(3 * 1.05em); max-height: calc(3 * 1.05em); -webkit-line-clamp: 3; font-size: .84rem; font-weight: 500; line-height: 1.05; }
    .slot small { color: var(--secondary-text-color); font-size: .68rem; margin-top: auto; }
    .bottle-marker { display: block; flex: 0 0 24px; width: 24px; height: 24px; border-radius: 50%; background: var(--bottle-color, var(--secondary-text-color)); border: 2px solid var(--divider-color); box-shadow: inset 0 1px 3px rgb(0 0 0 / 25%), 0 1px 2px rgb(0 0 0 / 15%); box-sizing: border-box; }
    .legend, .muted { color: var(--secondary-text-color); font-size: .85rem; }
    .warning { color: var(--warning-color); padding: 8px 0; }
    .error { color: var(--error-color); padding: 8px 0; }
    .unplaced { border-top: 1px solid var(--divider-color); padding-top: 10px; margin-top: 10px; }
    .unplaced-item { padding: 5px 0; }
  `;
sr([
  or({ attribute: !1 })
], Se.prototype, "hass", 2);
sr([
  ut()
], Se.prototype, "config", 2);
sr([
  ut()
], Se.prototype, "inventory", 2);
sr([
  ut()
], Se.prototype, "selectedRackId", 2);
sr([
  ut()
], Se.prototype, "loading", 2);
sr([
  ut()
], Se.prototype, "error", 2);
sr([
  ut()
], Se.prototype, "activeTooltip", 2);
sr([
  ut()
], Se.prototype, "selectedWine", 2);
Se = sr([
  yi("ploc-cellar-rack-card")
], Se);
window.customCards ??= [];
window.customCards.push({
  type: "ploc-cellar-rack-card",
  name: $i("picker_rack_name"),
  description: $i("picker_rack_description")
});
var bS = Object.defineProperty, SS = Object.getOwnPropertyDescriptor, se = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? SS(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (i ? o(t, r, n) : o(n)) || n);
  return i && n && bS(t, r, n), n;
};
let qt = class extends Ue {
  constructor() {
    super(...arguments), this.loading = !1, this.search = "", this.color = "", this.region = "", this.appellation = "", this.vintage = "", this.sort = "name", this.requestGeneration = 0;
  }
  static getConfigElement() {
    return document.createElement("ploc-cellar-card-editor");
  }
  static getStubConfig() {
    return {};
  }
  setConfig(e) {
    this.requestGeneration += 1, this.loading = !1, this.config = e, this.inventory = void 0, this.error = void 0, e.config_entry_id && this.refresh();
  }
  updated() {
    this.hass && this.config && !this.inventory && !this.loading && !this.error && this.refresh();
  }
  async refresh() {
    const e = this.hass, t = this.config;
    if (!e || !t?.config_entry_id || this.loading) return;
    const r = t.config_entry_id, i = ++this.requestGeneration;
    this.loading = !0, this.error = void 0;
    try {
      const n = await oc(e, r);
      i === this.requestGeneration && (this.inventory = n);
    } catch (n) {
      i === this.requestGeneration && (this.error = n instanceof Error ? n.message : String(n));
    } finally {
      i === this.requestGeneration && (this.loading = !1);
    }
  }
  valuesFor(e) {
    const t = (this.inventory?.wines ?? []).map((r) => r[e]).filter((r) => r !== null && r !== "");
    return [...new Set(t.map(String))].sort(
      (r, i) => r.localeCompare(i, this.hass?.language ?? void 0, { numeric: !0, sensitivity: "base" })
    );
  }
  get filteredWines() {
    const e = this.search.trim().toLocaleLowerCase(), t = (this.inventory?.wines ?? []).filter((i) => this.color && i.color !== this.color || this.region && i.region !== this.region || this.appellation && i.appellation !== this.appellation || this.vintage && String(i.vintage ?? "") !== this.vintage ? !1 : e ? [
      i.name,
      i.domain,
      i.appellation,
      i.region,
      i.country,
      i.grapes,
      i.cuvee,
      i.color,
      i.vintage,
      i.bottle_format
    ].filter((n) => n != null).join(" ").toLocaleLowerCase().includes(e) : !0), r = new Intl.Collator(this.hass?.language ?? void 0, {
      numeric: !0,
      sensitivity: "base"
    });
    return [...t].sort((i, n) => this.sort === "bottles" ? n.bottles_in_cellar - i.bottles_in_cellar || r.compare(i.name, n.name) : this.sort === "vintage" && (n.vintage ?? 0) - (i.vintage ?? 0) || r.compare(i.name, n.name));
  }
  clearFilters() {
    this.search = "", this.color = "", this.region = "", this.appellation = "", this.vintage = "", this.sort = "name";
  }
  selectFilter(e, t, r, i) {
    return E`
      <select aria-label=${t} .value=${r}
        @change=${(n) => {
      const a = n.target.value;
      e === "color" ? this.color = a : e === "region" ? this.region = a : e === "appellation" ? this.appellation = a : this.vintage = a;
    }}>
        <option value="" ?selected=${!r}>${t}</option>
        ${i.map((n) => E`<option value=${n} ?selected=${n === r}>${n}</option>`)}
      </select>
    `;
  }
  detail(e, t) {
    return t == null || t === "" ? O : E`<div><span class="detail-label">${e}</span>${t}</div>`;
  }
  renderWine(e) {
    const t = (a) => Ot(this.hass?.language ?? "en", a), r = e.locations.map((a) => {
      const o = a.row !== null && a.column !== null ? ` · ${t("row")} ${a.row + 1}, ${t("column")} ${a.column + 1}` : "";
      return `${a.rack}${o}`;
    }), i = e.vintage === null ? t("unknown_vintage") : String(e.vintage), n = e.bottle_volume_l === null ? null : `${e.bottle_volume_l.toLocaleString(this.hass?.language ?? void 0)} L`;
    return E`
      <article class="wine">
        <div class="wine-main">
          <div>
            <div class="wine-name"><button class="wine-name-button" type="button" aria-haspopup="dialog" @click=${() => {
      this.selectedWine = e;
    }}>${e.name}</button></div>
            <div class="metadata">${[
      e.domain,
      e.appellation,
      e.region,
      e.country
    ].filter(Boolean).join(" · ")}</div>
          </div>
          <div class="quantity">${e.bottles_in_cellar} ${t("bottles_short")}</div>
        </div>
        <div class="tags">
          ${e.color ? E`<span class="tag">${e.color}</span>` : O}
          <span class="tag">${i}</span>
          ${e.bottle_format ? E`<span class="tag">${e.bottle_format}</span>` : O}
        </div>
        <details>
          <summary class="metadata">${t("wine_details")}</summary>
          <div class="details">
            ${this.detail(t("grapes"), e.grapes)}
            ${this.detail(t("cuvee"), e.cuvee)}
            ${this.detail(t("bottle_volume"), n)}
            ${this.detail(t("locations"), r.length ? r.join(" · ") : null)}
          </div>
        </details>
      </article>
    `;
  }
  render() {
    const e = (n) => Ot(this.hass?.language ?? "en", n), t = this.filteredWines, r = t.reduce((n, a) => n + a.bottles_in_cellar, 0), i = !!(this.search || this.color || this.region || this.appellation || this.vintage);
    return E`
      <ha-card>
        <header>
          <h2>${this.config?.title ?? e("inventory_title")}</h2>
          <div class="actions">
            <button ?disabled=${this.loading} @click=${() => this.refresh()}>
              ${this.loading ? e("loading") : e("refresh")}
            </button>
          </div>
        </header>
        ${this.error ? E`<div class="error">${this.error}</div>` : O}
        ${this.config?.config_entry_id ? O : E`<div class="muted">${e("select_config")}</div>`}
        ${this.inventory?.stale ? E`<div class="warning">${e("stale")}</div>` : O}
        ${this.inventory ? E`
          <div class="toolbar">
            <input class="search" type="search" aria-label=${e("search_wine")}
              placeholder=${e("search_placeholder")} .value=${this.search}
              @input=${(n) => {
      this.search = n.target.value;
    }} />
            ${this.selectFilter("color", e("filter_color"), this.color, this.valuesFor("color"))}
            ${this.selectFilter("region", e("filter_region"), this.region, this.valuesFor("region"))}
            ${this.selectFilter("appellation", e("filter_appellation"), this.appellation, this.valuesFor("appellation"))}
            ${this.selectFilter("vintage", e("filter_vintage"), this.vintage, this.valuesFor("vintage"))}
            <select aria-label=${e("sort_by")} .value=${this.sort}
              @change=${(n) => {
      this.sort = n.target.value;
    }}>
              <option value="name" ?selected=${this.sort === "name"}>${e("sort_name")}</option>
              <option value="bottles" ?selected=${this.sort === "bottles"}>${e("sort_bottles")}</option>
              <option value="vintage" ?selected=${this.sort === "vintage"}>${e("sort_vintage")}</option>
            </select>
          </div>
          <div class="summary">
            <span>${e("inventory_results").replace("{count}", String(t.length))}</span>
            <span>${e("inventory_bottle_total").replace("{count}", String(r))}</span>
            ${i ? E`<button @click=${() => this.clearFilters()}>${e("clear_filters")}</button>` : O}
          </div>
          ${this.inventory.stock_reconstruction_complete ? O : E`<div class="warning">${e("reconstruction_incomplete")}</div>`}
          <div class="wine-list">
            ${t.map((n) => this.renderWine(n))}
          </div>
          ${t.length === 0 ? E`<p class="muted">${e("no_matching_wines")}</p>` : O}
          ${this.selectedWine ? E`
            <ploc-cellar-wine-detail
              .hass=${this.hass}
              .wine=${this.selectedWine}
              @wine-detail-closed=${() => {
      this.selectedWine = void 0;
    }}>
            </ploc-cellar-wine-detail>
          ` : O}
        ` : O}
      </ha-card>
    `;
  }
  getCardSize() {
    return 6;
  }
  getGridOptions() {
    return { columns: 12, min_columns: 6, rows: "auto" };
  }
};
qt.styles = ca`
    :host { display: block; }
    ha-card { padding: 16px; color: var(--primary-text-color); }
    header { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    h2 { margin: 0; font-size: 1.2rem; font-weight: 500; }
    button, select, input {
      color: var(--primary-text-color);
      background: var(--card-background-color);
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      padding: 9px 10px;
      min-width: 0;
    }
    button { background: var(--secondary-background-color); cursor: pointer; }
    button[disabled] { opacity: .5; cursor: default; }
    input { box-sizing: border-box; width: 100%; }
    .toolbar { display: grid; grid-template-columns: repeat(auto-fit, minmax(145px, 1fr)); gap: 8px; margin: 14px 0; }
    .search { grid-column: 1 / -1; }
    .summary { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px; color: var(--secondary-text-color); font-size: .85rem; margin: 12px 0; }
    .wine-list { display: grid; gap: 8px; }
    .wine { border: 1px solid var(--divider-color); border-radius: 10px; padding: 12px; min-width: 0; }
    .wine-main { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
    .wine-name { font-family: var(--ploc-wine-font-family); font-size: 1.12rem; font-weight: 500; line-height: 1.25; overflow-wrap: anywhere; }
    .wine-name-button { padding: 0; border: 0; background: none; color: inherit; font: inherit; font-weight: inherit; line-height: inherit; text-align: left; cursor: pointer; }
    .wine-name-button:hover { color: var(--primary-color); text-decoration: underline; }
    .wine-name-button:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 3px; border-radius: 2px; }
    .quantity { flex: 0 0 auto; white-space: nowrap; font-weight: 600; }
    .metadata { color: var(--secondary-text-color); font-size: .85rem; margin-top: 5px; line-height: 1.45; }
    .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 9px; }
    .tag { border-radius: 999px; background: var(--secondary-background-color); padding: 3px 8px; font-size: .75rem; }
    .details { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 6px 12px; margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--divider-color); font-size: .82rem; }
    .detail-label { color: var(--secondary-text-color); display: block; }
    .warning { color: var(--warning-color); padding: 8px 0; }
    .error { color: var(--error-color); padding: 8px 0; }
    .muted { color: var(--secondary-text-color); font-size: .85rem; }
    .actions { display: flex; gap: 8px; align-items: center; }
    @media (max-width: 420px) {
      ha-card { padding: 12px; }
      .toolbar { grid-template-columns: 1fr 1fr; }
    }
  `;
se([
  or({ attribute: !1 })
], qt.prototype, "hass", 2);
se([
  ut()
], qt.prototype, "config", 2);
se([
  ut()
], qt.prototype, "inventory", 2);
se([
  ut()
], qt.prototype, "loading", 2);
se([
  ut()
], qt.prototype, "error", 2);
se([
  ut()
], qt.prototype, "search", 2);
se([
  ut()
], qt.prototype, "color", 2);
se([
  ut()
], qt.prototype, "region", 2);
se([
  ut()
], qt.prototype, "appellation", 2);
se([
  ut()
], qt.prototype, "vintage", 2);
se([
  ut()
], qt.prototype, "sort", 2);
se([
  ut()
], qt.prototype, "selectedWine", 2);
qt = se([
  yi("ploc-cellar-inventory-card")
], qt);
window.customCards ??= [];
window.customCards.push({
  type: "ploc-cellar-inventory-card",
  name: $i("picker_inventory_name"),
  description: $i("picker_inventory_description")
});
var xS = Object.defineProperty, TS = Object.getOwnPropertyDescriptor, sc = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? TS(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (i ? o(t, r, n) : o(n)) || n);
  return i && n && xS(t, r, n), n;
};
let xo = class extends Ue {
  constructor() {
    super(...arguments), this.computeLabel = (e) => {
      const t = {
        config_entry_id: "editor_configuration",
        title: "editor_title",
        rack_picker_mode: "editor_rack_picker_mode",
        show_occupancy: "editor_show_occupancy",
        show_diagnostics: "editor_show_diagnostics",
        show_statistics: "editor_show_statistics",
        show_statistics_legends: "editor_show_statistics_legends"
      };
      return Ot(
        this.hass?.language ?? "en",
        t[e.name]
      );
    }, this.computeHelper = (e) => {
      if (e.name === "config_entry_id")
        return Ot(this.hass?.language ?? "en", "editor_configuration_helper");
      if (e.name === "title")
        return Ot(this.hass?.language ?? "en", "editor_title_helper");
    };
  }
  get isOverviewCard() {
    return this.config?.type === "custom:ploc-cellar-card" || this.config?.type === "custom:ploc-cellar-statistics-card";
  }
  get isRackCard() {
    return this.config?.type === "custom:ploc-cellar-rack-card";
  }
  get schema() {
    const e = [
      {
        name: "config_entry_id",
        required: !0,
        selector: { config_entry: { integration: "ploc_cellar" } }
      }
    ];
    return this.isOverviewCard ? (e.push(
      { name: "title", selector: { text: {} } },
      { name: "show_occupancy", selector: { boolean: {} } },
      { name: "show_diagnostics", selector: { boolean: {} } },
      { name: "show_statistics", selector: { boolean: {} } }
    ), this.config?.show_statistics !== !1 && e.push({
      name: "show_statistics_legends",
      selector: { boolean: {} }
    })) : this.isRackCard && e.push(
      { name: "title", selector: { text: {} } },
      {
        name: "rack_picker_mode",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              {
                label: Ot(this.hass?.language ?? "en", "editor_rack_picker_buttons"),
                value: "buttons"
              },
              {
                label: Ot(this.hass?.language ?? "en", "editor_rack_picker_dropdown"),
                value: "dropdown"
              }
            ]
          }
        }
      }
    ), e;
  }
  setConfig(e) {
    const t = { ...e };
    this.isOverviewType(e.type) ? (t.show_occupancy = e.show_occupancy !== !1, t.show_diagnostics = e.show_diagnostics !== !1, t.show_statistics = e.show_statistics !== !1, t.show_statistics_legends = e.show_statistics_legends !== !1) : e.type === "custom:ploc-cellar-rack-card" && (t.rack_picker_mode = e.rack_picker_mode ?? "buttons"), this.config = t;
  }
  isOverviewType(e) {
    return e === "custom:ploc-cellar-card" || e === "custom:ploc-cellar-statistics-card";
  }
  valueChanged(e) {
    e.stopPropagation();
    const t = { ...this.config, ...e.detail.value };
    this.config = t, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: t },
        bubbles: !0,
        composed: !0
      })
    );
  }
  render() {
    return E`
      <ha-form
        .hass=${this.hass}
        .data=${this.config ?? {}}
        .schema=${this.schema}
        .computeLabel=${this.computeLabel}
        .computeHelper=${this.computeHelper}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
sc([
  or({ attribute: !1 })
], xo.prototype, "hass", 2);
sc([
  ut()
], xo.prototype, "config", 2);
xo = sc([
  yi("ploc-cellar-card-editor")
], xo);
var Ql = function(e, t) {
  return Ql = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
    r.__proto__ = i;
  } || function(r, i) {
    for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (r[n] = i[n]);
  }, Ql(e, t);
};
function Q(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  Ql(e, t);
  function r() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
}
var CS = /* @__PURE__ */ (function() {
  function e() {
    this.firefox = !1, this.ie = !1, this.edge = !1, this.newEdge = !1, this.weChat = !1;
  }
  return e;
})(), AS = /* @__PURE__ */ (function() {
  function e() {
    this.browser = new CS(), this.node = !1, this.wxa = !1, this.worker = !1, this.svgSupported = !1, this.touchEventsSupported = !1, this.pointerEventsSupported = !1, this.domSupported = !1, this.transformSupported = !1, this.transform3dSupported = !1, this.hasGlobalWindow = typeof window < "u";
  }
  return e;
})(), K = new AS();
typeof wx == "object" && typeof wx.getSystemInfoSync == "function" ? (K.wxa = !0, K.touchEventsSupported = !0) : typeof document > "u" && typeof self < "u" ? K.worker = !0 : !K.hasGlobalWindow || "Deno" in window || typeof navigator < "u" && typeof navigator.userAgent == "string" && navigator.userAgent.indexOf("Node.js") > -1 ? (K.node = !0, K.svgSupported = !0) : MS(navigator.userAgent, K);
function MS(e, t) {
  var r = t.browser, i = e.match(/Firefox\/([\d.]+)/), n = e.match(/MSIE\s([\d.]+)/) || e.match(/Trident\/.+?rv:(([\d.]+))/), a = e.match(/Edge?\/([\d.]+)/), o = /micromessenger/i.test(e);
  i && (r.firefox = !0, r.version = i[1]), n && (r.ie = !0, r.version = n[1]), a && (r.edge = !0, r.version = a[1], r.newEdge = +a[1].split(".")[0] > 18), o && (r.weChat = !0), t.svgSupported = typeof SVGRect < "u", t.touchEventsSupported = "ontouchstart" in window && !r.ie && !r.edge, t.pointerEventsSupported = "onpointerdown" in window && (r.edge || r.ie && +r.version >= 11);
  var s = t.domSupported = typeof document < "u";
  if (s) {
    var l = document.documentElement.style;
    t.transform3dSupported = (r.ie && "transition" in l || r.edge || "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix() || "MozPerspective" in l) && !("OTransition" in l), t.transformSupported = t.transform3dSupported || r.ie && +r.version >= 9;
  }
}
var lc = 12, DS = "sans-serif", Dr = lc + "px " + DS, kS = 20, LS = 100, IS = "007LLmW'55;N0500LLLLLLLLLL00NNNLzWW\\\\WQb\\0FWLg\\bWb\\WQ\\WrWWQ000CL5LLFLL0LL**F*gLLLL5F0LF\\FFF5.5N";
function ES(e) {
  var t = {};
  if (typeof JSON > "u")
    return t;
  for (var r = 0; r < e.length; r++) {
    var i = String.fromCharCode(r + 32), n = (e.charCodeAt(r) - kS) / LS;
    t[i] = n;
  }
  return t;
}
var PS = ES(IS), ne = {
  createCanvas: function() {
    return typeof document < "u" && document.createElement("canvas");
  },
  measureText: /* @__PURE__ */ (function() {
    var e, t;
    return function(r, i) {
      if (!e) {
        var n = ne.createCanvas();
        e = n && n.getContext("2d");
      }
      if (e)
        return t !== i && (t = e.font = i || Dr), e.measureText(r);
      r = r || "", i = i || Dr;
      var a = /((?:\d+)?\.?\d*)px/.exec(i), o = a && +a[1] || lc, s = 0;
      if (i.indexOf("mono") >= 0)
        s = o * r.length;
      else
        for (var l = 0; l < r.length; l++) {
          var u = PS[r[l]];
          s += u == null ? o : u * o;
        }
      return { width: s };
    };
  })(),
  loadImage: function(e, t, r) {
    var i = new Image();
    return i.onload = t, i.onerror = r, i.src = e, i;
  },
  getTime: function() {
    return Date.now ? Date.now() : +/* @__PURE__ */ new Date();
  }
}, Wd = kr([
  "Function",
  "RegExp",
  "Date",
  "Error",
  "CanvasGradient",
  "CanvasPattern",
  "Image",
  "Canvas"
], function(e, t) {
  return e["[object " + t + "]"] = !0, e;
}, {}), Gd = kr([
  "Int8",
  "Uint8",
  "Uint8Clamped",
  "Int16",
  "Uint16",
  "Int32",
  "Uint32",
  "Float32",
  "Float64"
], function(e, t) {
  return e["[object " + t + "Array]"] = !0, e;
}, {}), fa = Object.prototype.toString, rs = Array.prototype, RS = rs.forEach, OS = rs.filter, uc = rs.slice, BS = rs.map, Sh = function() {
}.constructor, wa = Sh ? Sh.prototype : null, cc = "__proto__", Ms = 2311, NS = Math.pow(2, 53) - 1;
function Yd() {
  return Ms >= NS && (Ms = 0), Ms++;
}
function hc() {
  for (var e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t];
  typeof console < "u" && console.error.apply(console, e);
}
function tt(e) {
  if (e == null || typeof e != "object")
    return e;
  var t = e, r = fa.call(e);
  if (r === "[object Array]") {
    if (!Fn(e)) {
      t = [];
      for (var i = 0, n = e.length; i < n; i++)
        t[i] = tt(e[i]);
    }
  } else if (Gd[r]) {
    if (!Fn(e)) {
      var a = e.constructor;
      if (a.from)
        t = a.from(e);
      else {
        t = new a(e.length);
        for (var i = 0, n = e.length; i < n; i++)
          t[i] = e[i];
      }
    }
  } else if (!Wd[r] && !Fn(e) && !jn(e)) {
    t = {};
    for (var o in e)
      e.hasOwnProperty(o) && o !== cc && (t[o] = tt(e[o]));
  }
  return t;
}
function At(e, t, r) {
  if (!H(t) || !H(e))
    return r ? tt(t) : e;
  for (var i in t)
    if (t.hasOwnProperty(i) && i !== cc) {
      var n = e[i], a = t[i];
      H(a) && H(n) && !F(a) && !F(n) && !jn(a) && !jn(n) && !xh(a) && !xh(n) && !Fn(a) && !Fn(n) ? At(n, a, r) : (r || !(i in e)) && (e[i] = tt(t[i]));
    }
  return e;
}
function P(e, t) {
  if (Object.assign)
    Object.assign(e, t);
  else
    for (var r in t)
      t.hasOwnProperty(r) && r !== cc && (e[r] = t[r]);
  return e;
}
function FS(e, t, r) {
  e = e || {};
  for (var i = 0; i < r.length; i++) {
    var n = r[i];
    e[n] = t[n];
  }
  return e;
}
function wt(e, t, r) {
  for (var i = yt(t), n = 0, a = i.length; n < a; n++) {
    var o = i[n];
    e[o] == null && (e[o] = t[o]);
  }
  return e;
}
function dt(e, t) {
  if (e) {
    if (e.indexOf)
      return e.indexOf(t);
    for (var r = 0, i = e.length; r < i; r++)
      if (e[r] === t)
        return r;
  }
  return -1;
}
function US(e, t) {
  var r = e.prototype;
  function i() {
  }
  i.prototype = t.prototype, e.prototype = new i();
  for (var n in r)
    r.hasOwnProperty(n) && (e.prototype[n] = r[n]);
  e.prototype.constructor = e, e.superClass = t;
}
function lr(e, t, r) {
  if (e = "prototype" in e ? e.prototype : e, t = "prototype" in t ? t.prototype : t, Object.getOwnPropertyNames)
    for (var i = Object.getOwnPropertyNames(t), n = 0; n < i.length; n++) {
      var a = i[n];
      a !== "constructor" && e[a] == null && (e[a] = t[a]);
    }
  else
    wt(e, t);
}
function te(e) {
  return !e || typeof e == "string" ? !1 : typeof e.length == "number";
}
function A(e, t, r) {
  if (e && t)
    if (e.forEach && e.forEach === RS)
      e.forEach(t, r);
    else if (e.length === +e.length)
      for (var i = 0, n = e.length; i < n; i++)
        t.call(r, e[i], i, e);
    else
      for (var a in e)
        e.hasOwnProperty(a) && t.call(r, e[a], a, e);
}
function it(e, t, r) {
  if (!e)
    return [];
  if (!t)
    return fc(e);
  if (e.map && e.map === BS)
    return e.map(t, r);
  for (var i = [], n = 0, a = e.length; n < a; n++)
    i.push(t.call(r, e[n], n, e));
  return i;
}
function kr(e, t, r, i) {
  if (e && t) {
    for (var n = 0, a = e.length; n < a; n++)
      r = t.call(i, r, e[n], n, e);
    return r;
  }
}
function de(e, t, r) {
  if (!e)
    return [];
  if (!t)
    return fc(e);
  if (e.filter && e.filter === OS)
    return e.filter(t, r);
  for (var i = [], n = 0, a = e.length; n < a; n++)
    t.call(r, e[n], n, e) && i.push(e[n]);
  return i;
}
function yt(e) {
  if (!e)
    return [];
  if (Object.keys)
    return Object.keys(e);
  var t = [];
  for (var r in e)
    e.hasOwnProperty(r) && t.push(r);
  return t;
}
function zS(e, t) {
  for (var r = [], i = 2; i < arguments.length; i++)
    r[i - 2] = arguments[i];
  return function() {
    return e.apply(t, r.concat(uc.call(arguments)));
  };
}
var ft = wa && at(wa.bind) ? wa.call.bind(wa.bind) : zS;
function ae(e) {
  for (var t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  return function() {
    return e.apply(this, t.concat(uc.call(arguments)));
  };
}
function F(e) {
  return Array.isArray ? Array.isArray(e) : fa.call(e) === "[object Array]";
}
function at(e) {
  return typeof e == "function";
}
function X(e) {
  return typeof e == "string";
}
function Kl(e) {
  return fa.call(e) === "[object String]";
}
function _t(e) {
  return typeof e == "number";
}
function H(e) {
  var t = typeof e;
  return t === "function" || !!e && t === "object";
}
function xh(e) {
  return !!Wd[fa.call(e)];
}
function ee(e) {
  return !!Gd[fa.call(e)];
}
function jn(e) {
  return typeof e == "object" && typeof e.nodeType == "number" && typeof e.ownerDocument == "object";
}
function is(e) {
  return e.colorStops != null;
}
function VS(e) {
  return e.image != null;
}
function HS(e) {
  return e !== e;
}
function To() {
  for (var e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t];
  for (var r = 0, i = e.length; r < i; r++)
    if (e[r] != null)
      return e[r];
}
function W(e, t) {
  return e ?? t;
}
function ci(e, t, r) {
  return e ?? t ?? r;
}
function fc(e) {
  for (var t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  return uc.apply(e, t);
}
function vc(e) {
  if (typeof e == "number")
    return [e, e, e, e];
  var t = e.length;
  return t === 2 ? [e[0], e[1], e[0], e[1]] : t === 3 ? [e[0], e[1], e[2], e[1]] : e;
}
function nr(e, t) {
  if (!e)
    throw new Error(t);
}
function Be(e) {
  return e == null ? null : typeof e.trim == "function" ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}
var Xd = "__ec_primitive__";
function Jl(e) {
  e[Xd] = !0;
}
function Fn(e) {
  return e[Xd];
}
var WS = (function() {
  function e() {
    this.data = {};
  }
  return e.prototype.delete = function(t) {
    var r = this.has(t);
    return r && delete this.data[t], r;
  }, e.prototype.has = function(t) {
    return this.data.hasOwnProperty(t);
  }, e.prototype.get = function(t) {
    return this.data[t];
  }, e.prototype.set = function(t, r) {
    return this.data[t] = r, this;
  }, e.prototype.keys = function() {
    return yt(this.data);
  }, e.prototype.forEach = function(t) {
    var r = this.data;
    for (var i in r)
      r.hasOwnProperty(i) && t(r[i], i);
  }, e;
})(), qd = typeof Map == "function";
function GS() {
  return qd ? /* @__PURE__ */ new Map() : new WS();
}
var YS = (function() {
  function e(t) {
    var r = F(t);
    this.data = GS();
    var i = this;
    t instanceof e ? t.each(n) : t && A(t, n);
    function n(a, o) {
      r ? i.set(a, o) : i.set(o, a);
    }
  }
  return e.prototype.hasKey = function(t) {
    return this.data.has(t);
  }, e.prototype.get = function(t) {
    return this.data.get(t);
  }, e.prototype.set = function(t, r) {
    return this.data.set(t, r), r;
  }, e.prototype.each = function(t, r) {
    this.data.forEach(function(i, n) {
      t.call(r, i, n);
    });
  }, e.prototype.keys = function() {
    var t = this.data.keys();
    return qd ? Array.from(t) : t;
  }, e.prototype.removeKey = function(t) {
    this.data.delete(t);
  }, e;
})();
function et(e) {
  return new YS(e);
}
function XS(e, t) {
  for (var r = new e.constructor(e.length + t.length), i = 0; i < e.length; i++)
    r[i] = e[i];
  for (var n = e.length, i = 0; i < t.length; i++)
    r[i + n] = t[i];
  return r;
}
function ns(e, t) {
  var r;
  if (Object.create)
    r = Object.create(e);
  else {
    var i = function() {
    };
    i.prototype = e, r = new i();
  }
  return t && P(r, t), r;
}
function Zd(e) {
  var t = e.style;
  t.webkitUserSelect = "none", t.userSelect = "none", t.webkitTapHighlightColor = "rgba(0,0,0,0)", t["-webkit-touch-callout"] = "none";
}
function ze(e, t) {
  return e.hasOwnProperty(t);
}
function $t() {
}
var qS = 180 / Math.PI;
function ln(e, t) {
  return e == null && (e = 0), t == null && (t = 0), [e, t];
}
function ZS(e) {
  return [e[0], e[1]];
}
function Ds(e, t, r) {
  return e[0] = t, e[1] = r, e;
}
function Th(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e;
}
function QS(e, t, r) {
  return e[0] = t[0] - r[0], e[1] = t[1] - r[1], e;
}
function KS(e) {
  return Math.sqrt(JS(e));
}
function JS(e) {
  return e[0] * e[0] + e[1] * e[1];
}
function ks(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e;
}
function jS(e, t) {
  var r = KS(t);
  return r === 0 ? (e[0] = 0, e[1] = 0) : (e[0] = t[0] / r, e[1] = t[1] / r), e;
}
function jl(e, t) {
  return Math.sqrt((e[0] - t[0]) * (e[0] - t[0]) + (e[1] - t[1]) * (e[1] - t[1]));
}
var $l = jl;
function $S(e, t) {
  return (e[0] - t[0]) * (e[0] - t[0]) + (e[1] - t[1]) * (e[1] - t[1]);
}
var qi = $S;
function Ls(e, t, r, i) {
  return e[0] = t[0] + i * (r[0] - t[0]), e[1] = t[1] + i * (r[1] - t[1]), e;
}
function Ve(e, t, r) {
  var i = t[0], n = t[1];
  return e[0] = r[0] * i + r[2] * n + r[4], e[1] = r[1] * i + r[3] * n + r[5], e;
}
function Vi(e, t, r) {
  return e[0] = Math.min(t[0], r[0]), e[1] = Math.min(t[1], r[1]), e;
}
function Hi(e, t, r) {
  return e[0] = Math.max(t[0], r[0]), e[1] = Math.max(t[1], r[1]), e;
}
var xi = /* @__PURE__ */ (function() {
  function e(t, r) {
    this.target = t, this.topTarget = r && r.topTarget;
  }
  return e;
})(), tx = (function() {
  function e(t) {
    this.handler = t, t.on("mousedown", this._dragStart, this), t.on("mousemove", this._drag, this), t.on("mouseup", this._dragEnd, this);
  }
  return e.prototype._dragStart = function(t) {
    for (var r = t.target; r && !r.draggable; )
      r = r.parent || r.__hostTarget;
    r && (this._draggingTarget = r, r.dragging = !0, this._x = t.offsetX, this._y = t.offsetY, this.handler.dispatchToElement(new xi(r, t), "dragstart", t.event));
  }, e.prototype._drag = function(t) {
    var r = this._draggingTarget;
    if (r) {
      var i = t.offsetX, n = t.offsetY, a = i - this._x, o = n - this._y;
      this._x = i, this._y = n, r.drift(a, o, t), this.handler.dispatchToElement(new xi(r, t), "drag", t.event);
      var s = this.handler.findHover(i, n, r).target, l = this._dropTarget;
      this._dropTarget = s, r !== s && (l && s !== l && this.handler.dispatchToElement(new xi(l, t), "dragleave", t.event), s && s !== l && this.handler.dispatchToElement(new xi(s, t), "dragenter", t.event));
    }
  }, e.prototype._dragEnd = function(t) {
    var r = this._draggingTarget;
    r && (r.dragging = !1), this.handler.dispatchToElement(new xi(r, t), "dragend", t.event), this._dropTarget && this.handler.dispatchToElement(new xi(this._dropTarget, t), "drop", t.event), this._draggingTarget = null, this._dropTarget = null;
  }, e;
})(), Ke = (function() {
  function e(t) {
    t && (this._$eventProcessor = t);
  }
  return e.prototype.on = function(t, r, i, n) {
    this._$handlers || (this._$handlers = {});
    var a = this._$handlers;
    if (typeof r == "function" && (n = i, i = r, r = null), !i || !t)
      return this;
    var o = this._$eventProcessor;
    r != null && o && o.normalizeQuery && (r = o.normalizeQuery(r)), a[t] || (a[t] = []);
    for (var s = 0; s < a[t].length; s++)
      if (a[t][s].h === i)
        return this;
    var l = {
      h: i,
      query: r,
      ctx: n || this,
      callAtLast: i.zrEventfulCallAtLast
    }, u = a[t].length - 1, c = a[t][u];
    return c && c.callAtLast ? a[t].splice(u, 0, l) : a[t].push(l), this;
  }, e.prototype.isSilent = function(t) {
    var r = this._$handlers;
    return !r || !r[t] || !r[t].length;
  }, e.prototype.off = function(t, r) {
    var i = this._$handlers;
    if (!i)
      return this;
    if (!t)
      return this._$handlers = {}, this;
    if (r) {
      if (i[t]) {
        for (var n = [], a = 0, o = i[t].length; a < o; a++)
          i[t][a].h !== r && n.push(i[t][a]);
        i[t] = n;
      }
      i[t] && i[t].length === 0 && delete i[t];
    } else
      delete i[t];
    return this;
  }, e.prototype.trigger = function(t) {
    for (var r = [], i = 1; i < arguments.length; i++)
      r[i - 1] = arguments[i];
    if (!this._$handlers)
      return this;
    var n = this._$handlers[t], a = this._$eventProcessor;
    if (n)
      for (var o = r.length, s = n.length, l = 0; l < s; l++) {
        var u = n[l];
        if (!(a && a.filter && u.query != null && !a.filter(t, u.query)))
          switch (o) {
            case 0:
              u.h.call(u.ctx);
              break;
            case 1:
              u.h.call(u.ctx, r[0]);
              break;
            case 2:
              u.h.call(u.ctx, r[0], r[1]);
              break;
            default:
              u.h.apply(u.ctx, r);
              break;
          }
      }
    return a && a.afterTrigger && a.afterTrigger(t), this;
  }, e.prototype.triggerWithContext = function(t) {
    for (var r = [], i = 1; i < arguments.length; i++)
      r[i - 1] = arguments[i];
    if (!this._$handlers)
      return this;
    var n = this._$handlers[t], a = this._$eventProcessor;
    if (n)
      for (var o = r.length, s = r[o - 1], l = n.length, u = 0; u < l; u++) {
        var c = n[u];
        if (!(a && a.filter && c.query != null && !a.filter(t, c.query)))
          switch (o) {
            case 0:
              c.h.call(s);
              break;
            case 1:
              c.h.call(s, r[0]);
              break;
            case 2:
              c.h.call(s, r[0], r[1]);
              break;
            default:
              c.h.apply(s, r.slice(1, o - 1));
              break;
          }
      }
    return a && a.afterTrigger && a.afterTrigger(t), this;
  }, e;
})(), ex = Math.log(2);
function tu(e, t, r, i, n, a) {
  var o = i + "-" + n, s = e.length;
  if (a.hasOwnProperty(o))
    return a[o];
  if (t === 1) {
    var l = Math.round(Math.log((1 << s) - 1 & ~n) / ex);
    return e[r][l];
  }
  for (var u = i | 1 << r, c = r + 1; i & 1 << c; )
    c++;
  for (var h = 0, v = 0, f = 0; v < s; v++) {
    var d = 1 << v;
    d & n || (h += (f % 2 ? -1 : 1) * e[r][v] * tu(e, t - 1, c, u, n | d, a), f++);
  }
  return a[o] = h, h;
}
function Ch(e, t) {
  var r = [
    [e[0], e[1], 1, 0, 0, 0, -t[0] * e[0], -t[0] * e[1]],
    [0, 0, 0, e[0], e[1], 1, -t[1] * e[0], -t[1] * e[1]],
    [e[2], e[3], 1, 0, 0, 0, -t[2] * e[2], -t[2] * e[3]],
    [0, 0, 0, e[2], e[3], 1, -t[3] * e[2], -t[3] * e[3]],
    [e[4], e[5], 1, 0, 0, 0, -t[4] * e[4], -t[4] * e[5]],
    [0, 0, 0, e[4], e[5], 1, -t[5] * e[4], -t[5] * e[5]],
    [e[6], e[7], 1, 0, 0, 0, -t[6] * e[6], -t[6] * e[7]],
    [0, 0, 0, e[6], e[7], 1, -t[7] * e[6], -t[7] * e[7]]
  ], i = {}, n = tu(r, 8, 0, 0, 0, i);
  if (n !== 0) {
    for (var a = [], o = 0; o < 8; o++)
      for (var s = 0; s < 8; s++)
        a[s] == null && (a[s] = 0), a[s] += ((o + s) % 2 ? -1 : 1) * tu(r, 7, o === 0 ? 1 : 0, 1 << o, 1 << s, i) / n * t[o];
    return function(l, u, c) {
      var h = u * a[6] + c * a[7] + 1;
      l[0] = (u * a[0] + c * a[1] + a[2]) / h, l[1] = (u * a[3] + c * a[4] + a[5]) / h;
    };
  }
}
var Co = "___zrEVENTSAVED", Is = [];
function rx(e, t, r, i, n) {
  return eu(Is, t, i, n, !0) && eu(e, r, Is[0], Is[1]);
}
function ix(e, t) {
  e && r(e), t && r(t);
  function r(i) {
    var n = i[Co];
    n && (n.clearMarkers && n.clearMarkers(), delete i[Co]);
  }
}
function eu(e, t, r, i, n) {
  if (t.getBoundingClientRect && K.domSupported && !Qd(t)) {
    var a = t[Co] || (t[Co] = {}), o = nx(t, a), s = ax(o, a, n);
    if (s)
      return s(e, r, i), !0;
  }
  return !1;
}
function nx(e, t) {
  var r = t.markers;
  if (r)
    return r;
  r = t.markers = [];
  for (var i = ["left", "right"], n = ["top", "bottom"], a = 0; a < 4; a++) {
    var o = document.createElement("div"), s = o.style, l = a % 2, u = (a >> 1) % 2;
    s.cssText = [
      "position: absolute",
      "visibility: hidden",
      "padding: 0",
      "margin: 0",
      "border-width: 0",
      "user-select: none",
      "width:0",
      "height:0",
      i[l] + ":0",
      n[u] + ":0",
      i[1 - l] + ":auto",
      n[1 - u] + ":auto",
      ""
    ].join("!important;"), e.appendChild(o), r.push(o);
  }
  return t.clearMarkers = function() {
    A(r, function(c) {
      c.parentNode && c.parentNode.removeChild(c);
    });
  }, r;
}
function ax(e, t, r) {
  for (var i = r ? "invTrans" : "trans", n = t[i], a = t.srcCoords, o = [], s = [], l = !0, u = 0; u < 4; u++) {
    var c = e[u].getBoundingClientRect(), h = 2 * u, v = c.left, f = c.top;
    o.push(v, f), l = l && a && v === a[h] && f === a[h + 1], s.push(e[u].offsetLeft, e[u].offsetTop);
  }
  return l && n ? n : (t.srcCoords = o, t[i] = r ? Ch(s, o) : Ch(o, s));
}
function Qd(e) {
  return e.nodeName.toUpperCase() === "CANVAS";
}
var ox = /([&<>"'])/g, sx = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function Qt(e) {
  return e == null ? "" : (e + "").replace(ox, function(t, r) {
    return sx[r];
  });
}
var lx = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, Es = [], ux = K.browser.firefox && +K.browser.version.split(".")[0] < 39;
function ru(e, t, r, i) {
  return r = r || {}, i ? Ah(e, t, r) : ux && t.layerX != null && t.layerX !== t.offsetX ? (r.zrX = t.layerX, r.zrY = t.layerY) : t.offsetX != null ? (r.zrX = t.offsetX, r.zrY = t.offsetY) : Ah(e, t, r), r;
}
function Ah(e, t, r) {
  if (K.domSupported && e.getBoundingClientRect) {
    var i = t.clientX, n = t.clientY;
    if (Qd(e)) {
      var a = e.getBoundingClientRect();
      r.zrX = i - a.left, r.zrY = n - a.top;
      return;
    } else if (eu(Es, e, i, n)) {
      r.zrX = Es[0], r.zrY = Es[1];
      return;
    }
  }
  r.zrX = r.zrY = 0;
}
function dc(e) {
  return e || window.event;
}
function he(e, t, r) {
  if (t = dc(t), t.zrX != null)
    return t;
  var i = t.type, n = i && i.indexOf("touch") >= 0;
  if (n) {
    var o = i !== "touchend" ? t.targetTouches[0] : t.changedTouches[0];
    o && ru(e, o, t, r);
  } else {
    ru(e, t, t, r);
    var a = cx(t);
    t.zrDelta = a ? a / 120 : -(t.detail || 0) / 3;
  }
  var s = t.button;
  return t.which == null && s !== void 0 && lx.test(t.type) && (t.which = s & 1 ? 1 : s & 2 ? 3 : s & 4 ? 2 : 0), t;
}
function cx(e) {
  var t = e.wheelDelta;
  if (t)
    return t;
  var r = e.deltaX, i = e.deltaY;
  if (r == null || i == null)
    return t;
  var n = Math.abs(i !== 0 ? i : r), a = i > 0 ? -1 : i < 0 ? 1 : r > 0 ? -1 : 1;
  return 3 * n * a;
}
function hx(e, t, r, i) {
  e.addEventListener(t, r, i);
}
function fx(e, t, r, i) {
  e.removeEventListener(t, r, i);
}
var Kd = function(e) {
  e.preventDefault(), e.stopPropagation(), e.cancelBubble = !0;
}, vx = (function() {
  function e() {
    this._track = [];
  }
  return e.prototype.recognize = function(t, r, i) {
    return this._doTrack(t, r, i), this._recognize(t);
  }, e.prototype.clear = function() {
    return this._track.length = 0, this;
  }, e.prototype._doTrack = function(t, r, i) {
    var n = t.touches;
    if (n) {
      for (var a = {
        points: [],
        touches: [],
        target: r,
        event: t
      }, o = 0, s = n.length; o < s; o++) {
        var l = n[o], u = ru(i, l, {});
        a.points.push([u.zrX, u.zrY]), a.touches.push(l);
      }
      this._track.push(a);
    }
  }, e.prototype._recognize = function(t) {
    for (var r in Ps)
      if (Ps.hasOwnProperty(r)) {
        var i = Ps[r](this._track, t);
        if (i)
          return i;
      }
  }, e;
})();
function Mh(e) {
  var t = e[1][0] - e[0][0], r = e[1][1] - e[0][1];
  return Math.sqrt(t * t + r * r);
}
function dx(e) {
  return [
    (e[0][0] + e[1][0]) / 2,
    (e[0][1] + e[1][1]) / 2
  ];
}
var Ps = {
  pinch: function(e, t) {
    var r = e.length;
    if (r) {
      var i = (e[r - 1] || {}).points, n = (e[r - 2] || {}).points || i;
      if (n && n.length > 1 && i && i.length > 1) {
        var a = Mh(i) / Mh(n);
        !isFinite(a) && (a = 1), t.pinchScale = a;
        var o = dx(i);
        return t.pinchX = o[0], t.pinchY = o[1], {
          type: "pinch",
          target: e[0].target,
          event: t
        };
      }
    }
  }
};
function He() {
  return [1, 0, 0, 1, 0, 0];
}
function va(e) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 1, e[4] = 0, e[5] = 0, e;
}
function pc(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e;
}
function Un(e, t, r) {
  var i = t[0] * r[0] + t[2] * r[1], n = t[1] * r[0] + t[3] * r[1], a = t[0] * r[2] + t[2] * r[3], o = t[1] * r[2] + t[3] * r[3], s = t[0] * r[4] + t[2] * r[5] + t[4], l = t[1] * r[4] + t[3] * r[5] + t[5];
  return e[0] = i, e[1] = n, e[2] = a, e[3] = o, e[4] = s, e[5] = l, e;
}
function iu(e, t, r) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4] + r[0], e[5] = t[5] + r[1], e;
}
function gc(e, t, r, i) {
  i === void 0 && (i = [0, 0]);
  var n = t[0], a = t[2], o = t[4], s = t[1], l = t[3], u = t[5], c = Math.sin(r), h = Math.cos(r);
  return e[0] = n * h + s * c, e[1] = -n * c + s * h, e[2] = a * h + l * c, e[3] = -a * c + h * l, e[4] = h * (o - i[0]) + c * (u - i[1]) + i[0], e[5] = h * (u - i[1]) - c * (o - i[0]) + i[1], e;
}
function px(e, t, r) {
  var i = r[0], n = r[1];
  return e[0] = t[0] * i, e[1] = t[1] * n, e[2] = t[2] * i, e[3] = t[3] * n, e[4] = t[4] * i, e[5] = t[5] * n, e;
}
function as(e, t) {
  var r = t[0], i = t[2], n = t[4], a = t[1], o = t[3], s = t[5], l = r * o - a * i;
  return l ? (l = 1 / l, e[0] = o * l, e[1] = -a * l, e[2] = -i * l, e[3] = r * l, e[4] = (i * s - o * n) * l, e[5] = (a * n - r * s) * l, e) : null;
}
var Z = (function() {
  function e(t, r) {
    this.x = t || 0, this.y = r || 0;
  }
  return e.prototype.copy = function(t) {
    return this.x = t.x, this.y = t.y, this;
  }, e.prototype.clone = function() {
    return new e(this.x, this.y);
  }, e.prototype.set = function(t, r) {
    return this.x = t, this.y = r, this;
  }, e.prototype.equal = function(t) {
    return t.x === this.x && t.y === this.y;
  }, e.prototype.add = function(t) {
    return this.x += t.x, this.y += t.y, this;
  }, e.prototype.scale = function(t) {
    this.x *= t, this.y *= t;
  }, e.prototype.scaleAndAdd = function(t, r) {
    this.x += t.x * r, this.y += t.y * r;
  }, e.prototype.sub = function(t) {
    return this.x -= t.x, this.y -= t.y, this;
  }, e.prototype.dot = function(t) {
    return this.x * t.x + this.y * t.y;
  }, e.prototype.len = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }, e.prototype.lenSquare = function() {
    return this.x * this.x + this.y * this.y;
  }, e.prototype.normalize = function() {
    var t = this.len();
    return this.x /= t, this.y /= t, this;
  }, e.prototype.distance = function(t) {
    var r = this.x - t.x, i = this.y - t.y;
    return Math.sqrt(r * r + i * i);
  }, e.prototype.distanceSquare = function(t) {
    var r = this.x - t.x, i = this.y - t.y;
    return r * r + i * i;
  }, e.prototype.negate = function() {
    return this.x = -this.x, this.y = -this.y, this;
  }, e.prototype.transform = function(t) {
    if (t) {
      var r = this.x, i = this.y;
      return this.x = t[0] * r + t[2] * i + t[4], this.y = t[1] * r + t[3] * i + t[5], this;
    }
  }, e.prototype.toArray = function(t) {
    return t[0] = this.x, t[1] = this.y, t;
  }, e.prototype.fromArray = function(t) {
    this.x = t[0], this.y = t[1];
  }, e.set = function(t, r, i) {
    t.x = r, t.y = i;
  }, e.copy = function(t, r) {
    t.x = r.x, t.y = r.y;
  }, e.len = function(t) {
    return Math.sqrt(t.x * t.x + t.y * t.y);
  }, e.lenSquare = function(t) {
    return t.x * t.x + t.y * t.y;
  }, e.dot = function(t, r) {
    return t.x * r.x + t.y * r.y;
  }, e.add = function(t, r, i) {
    t.x = r.x + i.x, t.y = r.y + i.y;
  }, e.sub = function(t, r, i) {
    t.x = r.x - i.x, t.y = r.y - i.y;
  }, e.scale = function(t, r, i) {
    t.x = r.x * i, t.y = r.y * i;
  }, e.scaleAndAdd = function(t, r, i, n) {
    t.x = r.x + i.x * n, t.y = r.y + i.y * n;
  }, e.lerp = function(t, r, i, n) {
    var a = 1 - n;
    t.x = a * r.x + n * i.x, t.y = a * r.y + n * i.y;
  }, e;
})(), oi = Math.min, Wi = Math.max, nu = Math.abs, Dh = ["x", "y"], gx = ["width", "height"], Rr = new Z(), Or = new Z(), Br = new Z(), Nr = new Z(), ie = Jd(), kn = ie.minTv, au = ie.maxTv, zn = [0, 0], Y = (function() {
  function e(t, r, i, n) {
    Rs(this, t, r, i, n);
  }
  return e.set = function(t, r, i, n, a) {
    return n < 0 && (r = r + n, n = -n), a < 0 && (i = i + a, a = -a), t.x = r, t.y = i, t.width = n, t.height = a, t;
  }, e.prototype.union = function(t) {
    var r = oi(t.x, this.x), i = oi(t.y, this.y);
    isFinite(this.x) && isFinite(this.width) ? this.width = Wi(t.x + t.width, this.x + this.width) - r : this.width = t.width, isFinite(this.y) && isFinite(this.height) ? this.height = Wi(t.y + t.height, this.y + this.height) - i : this.height = t.height, this.x = r, this.y = i;
  }, e.prototype.applyTransform = function(t) {
    e.applyTransform(this, this, t);
  }, e.prototype.calculateTransform = function(t) {
    return mx(He(), this, t);
  }, e.prototype.intersect = function(t, r, i) {
    return e.intersect(this, t, r, i);
  }, e.intersect = function(t, r, i, n) {
    i && Z.set(i, 0, 0);
    var a = n && n.outIntersectRect || null, o = n && n.clamp;
    if (a && (a.x = a.y = a.width = a.height = NaN), !t || !r)
      return !1;
    t instanceof e || (t = Rs(yx, t.x, t.y, t.width, t.height)), r instanceof e || (r = Rs(_x, r.x, r.y, r.width, r.height));
    var s = !!i;
    ie.reset(n, s);
    var l = ie.touchThreshold, u = t.x + l, c = t.x + t.width - l, h = t.y + l, v = t.y + t.height - l, f = r.x + l, d = r.x + r.width - l, g = r.y + l, p = r.y + r.height - l;
    if (u > c || h > v || f > d || g > p)
      return !1;
    var m = !(c < f || d < u || v < g || p < h);
    return (s || a) && (zn[0] = 1 / 0, zn[1] = 0, Lh(u, c, f, d, 0, s, a, o), Lh(h, v, g, p, 1, s, a, o), s && Z.copy(i, m ? ie.useDir ? ie.dirMinTv : kn : au)), m;
  }, e.contain = function(t, r, i) {
    return r >= t.x && r <= t.x + t.width && i >= t.y && i <= t.y + t.height;
  }, e.prototype.contain = function(t, r) {
    return e.contain(this, t, r);
  }, e.prototype.clone = function() {
    return new e(this.x, this.y, this.width, this.height);
  }, e.prototype.copy = function(t) {
    kh(this, t);
  }, e.prototype.plain = function() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }, e.prototype.isFinite = function() {
    return isFinite(this.x) && isFinite(this.y) && isFinite(this.width) && isFinite(this.height);
  }, e.prototype.isZero = function() {
    return this.width === 0 || this.height === 0;
  }, e.create = function(t) {
    return new e(t ? t.x : 0, t ? t.y : 0, t ? t.width : 0, t ? t.height : 0);
  }, e.copy = function(t, r) {
    return t.x = r.x, t.y = r.y, t.width = r.width, t.height = r.height, t;
  }, e.applyTransform = function(t, r, i) {
    if (!i) {
      t !== r && kh(t, r);
      return;
    }
    if (i[1] < 1e-5 && i[1] > -1e-5 && i[2] < 1e-5 && i[2] > -1e-5) {
      var n = i[0], a = i[3], o = i[4], s = i[5];
      t.x = r.x * n + o, t.y = r.y * a + s, t.width = r.width * n, t.height = r.height * a, t.width < 0 && (t.x += t.width, t.width = -t.width), t.height < 0 && (t.y += t.height, t.height = -t.height);
      return;
    }
    Rr.x = Br.x = r.x, Rr.y = Nr.y = r.y, Or.x = Nr.x = r.x + r.width, Or.y = Br.y = r.y + r.height, Rr.transform(i), Nr.transform(i), Or.transform(i), Br.transform(i), t.x = oi(Rr.x, Or.x, Br.x, Nr.x), t.y = oi(Rr.y, Or.y, Br.y, Nr.y);
    var l = Wi(Rr.x, Or.x, Br.x, Nr.x), u = Wi(Rr.y, Or.y, Br.y, Nr.y);
    t.width = l - t.x, t.height = u - t.y;
  }, e.calculateTransform = function(t, r, i) {
    var n = i.width / r.width, a = i.height / r.height;
    return t = va(t || []), iu(t, t, Ds(Os, -r.x, -r.y)), px(t, t, Ds(Os, n, a)), iu(t, t, Ds(Os, i.x, i.y)), t;
  }, e;
})();
Y.create;
var Rs = Y.set, kh = Y.copy, mx = Y.calculateTransform;
Y.applyTransform;
Y.contain;
var yx = new Y(0, 0, 0, 0), _x = new Y(0, 0, 0, 0), Os = [];
function Lh(e, t, r, i, n, a, o, s) {
  var l = nu(t - r), u = nu(i - e), c = oi(l, u), h = Dh[n], v = Dh[1 - n], f = gx[n];
  t < r || i < e ? l < u ? (a && (au[h] = -l), s && (o[h] = t, o[f] = 0)) : (a && (au[h] = u), s && (o[h] = e, o[f] = 0)) : (o && (o[h] = Wi(e, r), o[f] = oi(t, i) - o[h]), a && (c < zn[0] || ie.useDir) && (zn[0] = oi(c, zn[0]), (l < u || !ie.bidirectional) && (kn[h] = l, kn[v] = 0, ie.useDir && ie.calcDirMTV()), (l >= u || !ie.bidirectional) && (kn[h] = -u, kn[v] = 0, ie.useDir && ie.calcDirMTV())));
}
function Jd() {
  var e = 0, t = new Z(), r = new Z(), i = {
    minTv: new Z(),
    maxTv: new Z(),
    useDir: !1,
    dirMinTv: new Z(),
    touchThreshold: 0,
    bidirectional: !0,
    negativeSize: !1,
    reset: function(a, o) {
      i.touchThreshold = 0, a && a.touchThreshold != null && (i.touchThreshold = Wi(0, a.touchThreshold)), i.negativeSize = !1, o && (i.minTv.set(1 / 0, 1 / 0), i.maxTv.set(0, 0), i.useDir = !1, a && a.direction != null && (i.useDir = !0, i.dirMinTv.copy(i.minTv), r.copy(i.minTv), e = a.direction, i.bidirectional = a.bidirectional == null || !!a.bidirectional, i.bidirectional || t.set(Math.cos(e), Math.sin(e))));
    },
    calcDirMTV: function() {
      var a = i.minTv, o = i.dirMinTv, s = a.y * a.y + a.x * a.x, l = Math.sin(e), u = Math.cos(e), c = l * a.y + u * a.x;
      if (n(c)) {
        n(a.x) && n(a.y) && o.set(0, 0);
        return;
      }
      if (r.x = s * u / c, r.y = s * l / c, n(r.x) && n(r.y)) {
        o.set(0, 0);
        return;
      }
      (i.bidirectional || t.dot(r) > 0) && r.len() < o.len() && o.copy(r);
    }
  };
  function n(a) {
    return nu(a) < 1e-10;
  }
  return i;
}
var jd = "silent";
function bx(e, t, r) {
  return {
    type: e,
    event: r,
    target: t.target,
    topTarget: t.topTarget,
    cancelBubble: !1,
    offsetX: r.zrX,
    offsetY: r.zrY,
    gestureEvent: r.gestureEvent,
    pinchX: r.pinchX,
    pinchY: r.pinchY,
    pinchScale: r.pinchScale,
    wheelDelta: r.zrDelta,
    zrByTouch: r.zrByTouch,
    which: r.which,
    stop: Sx
  };
}
function Sx() {
  Kd(this.event);
}
var xx = (function(e) {
  Q(t, e);
  function t() {
    var r = e !== null && e.apply(this, arguments) || this;
    return r.handler = null, r;
  }
  return t.prototype.dispose = function() {
  }, t.prototype.setCursor = function() {
  }, t;
})(Ke), fn = /* @__PURE__ */ (function() {
  function e(t, r) {
    this.x = t, this.y = r;
  }
  return e;
})(), Tx = [
  "click",
  "dblclick",
  "mousewheel",
  "mouseout",
  "mouseup",
  "mousedown",
  "mousemove",
  "contextmenu"
], Bs = new Y(0, 0, 0, 0), $d = (function(e) {
  Q(t, e);
  function t(r, i, n, a, o) {
    var s = e.call(this) || this;
    return s._hovered = new fn(0, 0), s.storage = r, s.painter = i, s.painterRoot = a, s._pointerSize = o, n = n || new xx(), s.proxy = null, s.setHandlerProxy(n), s._draggingMgr = new tx(s), s;
  }
  return t.prototype.setHandlerProxy = function(r) {
    this.proxy && this.proxy.dispose(), r && (A(Tx, function(i) {
      r.on && r.on(i, this[i], this);
    }, this), r.handler = this), this.proxy = r;
  }, t.prototype.mousemove = function(r) {
    var i = r.zrX, n = r.zrY, a = tp(this, i, n), o = this._hovered, s = o.target;
    s && !s.__zr && (o = this.findHover(o.x, o.y), s = o.target);
    var l = this._hovered = a ? new fn(i, n) : this.findHover(i, n), u = l.target, c = this.proxy;
    c.setCursor && c.setCursor(u ? u.cursor : "default"), s && u !== s && this.dispatchToElement(o, "mouseout", r), this.dispatchToElement(l, "mousemove", r), u && u !== s && this.dispatchToElement(l, "mouseover", r);
  }, t.prototype.mouseout = function(r) {
    var i = r.zrEventControl;
    i !== "only_globalout" && this.dispatchToElement(this._hovered, "mouseout", r), i !== "no_globalout" && this.trigger("globalout", { type: "globalout", event: r });
  }, t.prototype.resize = function() {
    this._hovered = new fn(0, 0);
  }, t.prototype.dispatch = function(r, i) {
    var n = this[r];
    n && n.call(this, i);
  }, t.prototype.dispose = function() {
    this.proxy.dispose(), this.storage = null, this.proxy = null, this.painter = null;
  }, t.prototype.setCursorStyle = function(r) {
    var i = this.proxy;
    i.setCursor && i.setCursor(r);
  }, t.prototype.dispatchToElement = function(r, i, n) {
    r = r || {};
    var a = r.target;
    if (!(a && a.silent)) {
      for (var o = "on" + i, s = bx(i, r, n); a && (a[o] && (s.cancelBubble = !!a[o].call(a, s)), a.trigger(i, s), a = a.__hostTarget ? a.__hostTarget : a.parent, !s.cancelBubble); )
        ;
      s.cancelBubble || (this.trigger(i, s), this.painter && this.painter.eachOtherLayer && this.painter.eachOtherLayer(function(l) {
        typeof l[o] == "function" && l[o].call(l, s), l.trigger && l.trigger(i, s);
      }));
    }
  }, t.prototype.findHover = function(r, i, n) {
    var a = this.storage.getDisplayList(), o = new fn(r, i);
    if (Ih(a, o, r, i, n), this._pointerSize && !o.target) {
      for (var s = [], l = this._pointerSize, u = l / 2, c = new Y(r - u, i - u, l, l), h = a.length - 1; h >= 0; h--) {
        var v = a[h];
        v !== n && !v.ignore && !v.ignoreCoarsePointer && (!v.parent || !v.parent.ignoreCoarsePointer) && (Bs.copy(v.getBoundingRect()), v.transform && Bs.applyTransform(v.transform), Bs.intersect(c) && s.push(v));
      }
      if (s.length)
        for (var f = 4, d = Math.PI / 12, g = Math.PI * 2, p = 0; p < u; p += f)
          for (var m = 0; m < g; m += d) {
            var y = r + p * Math.cos(m), _ = i + p * Math.sin(m);
            if (Ih(s, o, y, _, n), o.target)
              return o;
          }
    }
    return o;
  }, t.prototype.processGesture = function(r, i) {
    this._gestureMgr || (this._gestureMgr = new vx());
    var n = this._gestureMgr;
    i === "start" && n.clear();
    var a = n.recognize(r, this.findHover(r.zrX, r.zrY, null).target, this.proxy.dom);
    if (i === "end" && n.clear(), a) {
      var o = a.type;
      r.gestureEvent = o;
      var s = new fn();
      s.target = a.target, this.dispatchToElement(s, o, a.event);
    }
  }, t;
})(Ke);
A(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function(e) {
  $d.prototype[e] = function(t) {
    var r = t.zrX, i = t.zrY, n = tp(this, r, i), a, o;
    if ((e !== "mouseup" || !n) && (a = this.findHover(r, i), o = a.target), e === "mousedown")
      this._downEl = o, this._downPoint = [t.zrX, t.zrY], this._upEl = o;
    else if (e === "mouseup")
      this._upEl = o;
    else if (e === "click") {
      if (this._downEl !== this._upEl || !this._downPoint || $l(this._downPoint, [t.zrX, t.zrY]) > 4)
        return;
      this._downPoint = null;
    }
    this.dispatchToElement(a, e, t);
  };
});
function Cx(e, t, r) {
  if (e[e.rectHover ? "rectContain" : "contain"](t, r)) {
    for (var i = e, n = void 0, a = !1; i; ) {
      if (i.ignoreClip && (a = !0), !a) {
        var o = i.getClipPath();
        if (o && !o.contain(t, r))
          return !1;
      }
      i.silent && (n = !0);
      var s = i.__hostTarget;
      i = s ? i.ignoreHostSilent ? null : s : i.parent;
    }
    return n ? jd : !0;
  }
  return !1;
}
function Ih(e, t, r, i, n) {
  for (var a = e.length - 1; a >= 0; a--) {
    var o = e[a], s = void 0;
    if (o !== n && !o.ignore && (s = Cx(o, r, i)) && (!t.topTarget && (t.topTarget = o), s !== jd)) {
      t.target = o;
      break;
    }
  }
}
function tp(e, t, r) {
  var i = e.painter;
  return t < 0 || t > i.getWidth() || r < 0 || r > i.getHeight();
}
var ep = 32, vn = 7;
function Ax(e) {
  for (var t = 0; e >= ep; )
    t |= e & 1, e >>= 1;
  return e + t;
}
function Eh(e, t, r, i) {
  var n = t + 1;
  if (n === r)
    return 1;
  if (i(e[n++], e[t]) < 0) {
    for (; n < r && i(e[n], e[n - 1]) < 0; )
      n++;
    Mx(e, t, n);
  } else
    for (; n < r && i(e[n], e[n - 1]) >= 0; )
      n++;
  return n - t;
}
function Mx(e, t, r) {
  for (r--; t < r; ) {
    var i = e[t];
    e[t++] = e[r], e[r--] = i;
  }
}
function Ph(e, t, r, i, n) {
  for (i === t && i++; i < r; i++) {
    for (var a = e[i], o = t, s = i, l; o < s; )
      l = o + s >>> 1, n(a, e[l]) < 0 ? s = l : o = l + 1;
    var u = i - o;
    switch (u) {
      case 3:
        e[o + 3] = e[o + 2];
      case 2:
        e[o + 2] = e[o + 1];
      case 1:
        e[o + 1] = e[o];
        break;
      default:
        for (; u > 0; )
          e[o + u] = e[o + u - 1], u--;
    }
    e[o] = a;
  }
}
function Ns(e, t, r, i, n, a) {
  var o = 0, s = 0, l = 1;
  if (a(e, t[r + n]) > 0) {
    for (s = i - n; l < s && a(e, t[r + n + l]) > 0; )
      o = l, l = (l << 1) + 1, l <= 0 && (l = s);
    l > s && (l = s), o += n, l += n;
  } else {
    for (s = n + 1; l < s && a(e, t[r + n - l]) <= 0; )
      o = l, l = (l << 1) + 1, l <= 0 && (l = s);
    l > s && (l = s);
    var u = o;
    o = n - l, l = n - u;
  }
  for (o++; o < l; ) {
    var c = o + (l - o >>> 1);
    a(e, t[r + c]) > 0 ? o = c + 1 : l = c;
  }
  return l;
}
function Fs(e, t, r, i, n, a) {
  var o = 0, s = 0, l = 1;
  if (a(e, t[r + n]) < 0) {
    for (s = n + 1; l < s && a(e, t[r + n - l]) < 0; )
      o = l, l = (l << 1) + 1, l <= 0 && (l = s);
    l > s && (l = s);
    var u = o;
    o = n - l, l = n - u;
  } else {
    for (s = i - n; l < s && a(e, t[r + n + l]) >= 0; )
      o = l, l = (l << 1) + 1, l <= 0 && (l = s);
    l > s && (l = s), o += n, l += n;
  }
  for (o++; o < l; ) {
    var c = o + (l - o >>> 1);
    a(e, t[r + c]) < 0 ? l = c : o = c + 1;
  }
  return l;
}
function Dx(e, t) {
  var r = vn, i, n, a = 0, o = [];
  i = [], n = [];
  function s(f, d) {
    i[a] = f, n[a] = d, a += 1;
  }
  function l() {
    for (; a > 1; ) {
      var f = a - 2;
      if (f >= 1 && n[f - 1] <= n[f] + n[f + 1] || f >= 2 && n[f - 2] <= n[f] + n[f - 1])
        n[f - 1] < n[f + 1] && f--;
      else if (n[f] > n[f + 1])
        break;
      c(f);
    }
  }
  function u() {
    for (; a > 1; ) {
      var f = a - 2;
      f > 0 && n[f - 1] < n[f + 1] && f--, c(f);
    }
  }
  function c(f) {
    var d = i[f], g = n[f], p = i[f + 1], m = n[f + 1];
    n[f] = g + m, f === a - 3 && (i[f + 1] = i[f + 2], n[f + 1] = n[f + 2]), a--;
    var y = Fs(e[p], e, d, g, 0, t);
    d += y, g -= y, g !== 0 && (m = Ns(e[d + g - 1], e, p, m, m - 1, t), m !== 0 && (g <= m ? h(d, g, p, m) : v(d, g, p, m)));
  }
  function h(f, d, g, p) {
    var m = 0;
    for (m = 0; m < d; m++)
      o[m] = e[f + m];
    var y = 0, _ = g, w = f;
    if (e[w++] = e[_++], --p === 0) {
      for (m = 0; m < d; m++)
        e[w + m] = o[y + m];
      return;
    }
    if (d === 1) {
      for (m = 0; m < p; m++)
        e[w + m] = e[_ + m];
      e[w + p] = o[y];
      return;
    }
    for (var b = r, S, T, C; ; ) {
      S = 0, T = 0, C = !1;
      do
        if (t(e[_], o[y]) < 0) {
          if (e[w++] = e[_++], T++, S = 0, --p === 0) {
            C = !0;
            break;
          }
        } else if (e[w++] = o[y++], S++, T = 0, --d === 1) {
          C = !0;
          break;
        }
      while ((S | T) < b);
      if (C)
        break;
      do {
        if (S = Fs(e[_], o, y, d, 0, t), S !== 0) {
          for (m = 0; m < S; m++)
            e[w + m] = o[y + m];
          if (w += S, y += S, d -= S, d <= 1) {
            C = !0;
            break;
          }
        }
        if (e[w++] = e[_++], --p === 0) {
          C = !0;
          break;
        }
        if (T = Ns(o[y], e, _, p, 0, t), T !== 0) {
          for (m = 0; m < T; m++)
            e[w + m] = e[_ + m];
          if (w += T, _ += T, p -= T, p === 0) {
            C = !0;
            break;
          }
        }
        if (e[w++] = o[y++], --d === 1) {
          C = !0;
          break;
        }
        b--;
      } while (S >= vn || T >= vn);
      if (C)
        break;
      b < 0 && (b = 0), b += 2;
    }
    if (r = b, r < 1 && (r = 1), d === 1) {
      for (m = 0; m < p; m++)
        e[w + m] = e[_ + m];
      e[w + p] = o[y];
    } else {
      if (d === 0)
        throw new Error();
      for (m = 0; m < d; m++)
        e[w + m] = o[y + m];
    }
  }
  function v(f, d, g, p) {
    var m = 0;
    for (m = 0; m < p; m++)
      o[m] = e[g + m];
    var y = f + d - 1, _ = p - 1, w = g + p - 1, b = 0, S = 0;
    if (e[w--] = e[y--], --d === 0) {
      for (b = w - (p - 1), m = 0; m < p; m++)
        e[b + m] = o[m];
      return;
    }
    if (p === 1) {
      for (w -= d, y -= d, S = w + 1, b = y + 1, m = d - 1; m >= 0; m--)
        e[S + m] = e[b + m];
      e[w] = o[_];
      return;
    }
    for (var T = r; ; ) {
      var C = 0, x = 0, M = !1;
      do
        if (t(o[_], e[y]) < 0) {
          if (e[w--] = e[y--], C++, x = 0, --d === 0) {
            M = !0;
            break;
          }
        } else if (e[w--] = o[_--], x++, C = 0, --p === 1) {
          M = !0;
          break;
        }
      while ((C | x) < T);
      if (M)
        break;
      do {
        if (C = d - Fs(o[_], e, f, d, d - 1, t), C !== 0) {
          for (w -= C, y -= C, d -= C, S = w + 1, b = y + 1, m = C - 1; m >= 0; m--)
            e[S + m] = e[b + m];
          if (d === 0) {
            M = !0;
            break;
          }
        }
        if (e[w--] = o[_--], --p === 1) {
          M = !0;
          break;
        }
        if (x = p - Ns(e[y], o, 0, p, p - 1, t), x !== 0) {
          for (w -= x, _ -= x, p -= x, S = w + 1, b = _ + 1, m = 0; m < x; m++)
            e[S + m] = o[b + m];
          if (p <= 1) {
            M = !0;
            break;
          }
        }
        if (e[w--] = e[y--], --d === 0) {
          M = !0;
          break;
        }
        T--;
      } while (C >= vn || x >= vn);
      if (M)
        break;
      T < 0 && (T = 0), T += 2;
    }
    if (r = T, r < 1 && (r = 1), p === 1) {
      for (w -= d, y -= d, S = w + 1, b = y + 1, m = d - 1; m >= 0; m--)
        e[S + m] = e[b + m];
      e[w] = o[_];
    } else {
      if (p === 0)
        throw new Error();
      for (b = w - (p - 1), m = 0; m < p; m++)
        e[b + m] = o[m];
    }
  }
  return {
    mergeRuns: l,
    forceMergeRuns: u,
    pushRun: s
  };
}
function ao(e, t, r, i) {
  r || (r = 0), i || (i = e.length);
  var n = i - r;
  if (!(n < 2)) {
    var a = 0;
    if (n < ep) {
      a = Eh(e, r, i, t), Ph(e, r, i, r + a, t);
      return;
    }
    var o = Dx(e, t), s = Ax(n);
    do {
      if (a = Eh(e, r, i, t), a < s) {
        var l = n;
        l > s && (l = s), Ph(e, r, r + l, r + a, t), a = l;
      }
      o.pushRun(r, a), o.mergeRuns(), n -= a, r += a;
    } while (n !== 0);
    o.forceMergeRuns();
  }
}
var jt = 1, Ln = 2, Ui = 4, Rh = !1;
function Us() {
  Rh || (Rh = !0, console.warn("z / z2 / zlevel of displayable is invalid, which may cause unexpected errors"));
}
function Oh(e, t) {
  return e.zlevel === t.zlevel ? e.z === t.z ? e.z2 - t.z2 : e.z - t.z : e.zlevel - t.zlevel;
}
var kx = (function() {
  function e() {
    this._roots = [], this._displayList = [], this._displayListLen = 0, this.displayableSortFunc = Oh;
  }
  return e.prototype.traverse = function(t, r) {
    for (var i = 0; i < this._roots.length; i++)
      this._roots[i].traverse(t, r);
  }, e.prototype.getDisplayList = function(t, r) {
    r = r || !1;
    var i = this._displayList;
    return (t || !i.length) && this.updateDisplayList(r), i;
  }, e.prototype.updateDisplayList = function(t) {
    this._displayListLen = 0;
    for (var r = this._roots, i = this._displayList, n = 0, a = r.length; n < a; n++)
      this._updateAndAddDisplayable(r[n], null, t);
    i.length = this._displayListLen, ao(i, Oh);
  }, e.prototype._updateAndAddDisplayable = function(t, r, i) {
    if (!(t.ignore && !i)) {
      t.beforeUpdate(), t.update(), t.afterUpdate();
      var n = t.getClipPath(), a = r && r.length, o = 0, s = t.__clipPaths;
      if (!t.ignoreClip && (a || n)) {
        if (s || (s = t.__clipPaths = []), a)
          for (var l = 0; l < r.length; l++)
            s[o++] = r[l];
        for (var u = n, c = t; u; )
          u.parent = c, u.updateTransform(), s[o++] = u, c = u, u = u.getClipPath();
      }
      if (s && (s.length = o), t.childrenRef) {
        for (var h = t.childrenRef(), v = 0; v < h.length; v++) {
          var f = h[v];
          t.__dirty && (f.__dirty |= jt), this._updateAndAddDisplayable(f, s, i);
        }
        t.__dirty = 0;
      } else {
        var d = t;
        isNaN(d.z) && (Us(), d.z = 0), isNaN(d.z2) && (Us(), d.z2 = 0), isNaN(d.zlevel) && (Us(), d.zlevel = 0), this._displayList[this._displayListLen++] = d;
      }
      var g = t.getDecalElement && t.getDecalElement();
      g && this._updateAndAddDisplayable(g, s, i);
      var p = t.getTextGuideLine();
      p && this._updateAndAddDisplayable(p, s, i);
      var m = t.getTextContent();
      m && this._updateAndAddDisplayable(m, s, i);
    }
  }, e.prototype.addRoot = function(t) {
    t.__zr && t.__zr.storage === this || this._roots.push(t);
  }, e.prototype.delRoot = function(t) {
    if (t instanceof Array) {
      for (var r = 0, i = t.length; r < i; r++)
        this.delRoot(t[r]);
      return;
    }
    var n = dt(this._roots, t);
    n >= 0 && this._roots.splice(n, 1);
  }, e.prototype.delAllRoots = function() {
    this._roots = [], this._displayList = [], this._displayListLen = 0;
  }, e.prototype.getRoots = function() {
    return this._roots;
  }, e.prototype.dispose = function() {
    this._displayList = null, this._roots = null;
  }, e;
})(), Ao;
Ao = K.hasGlobalWindow && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function(e) {
  return setTimeout(e, 16);
};
var Vn = {
  linear: function(e) {
    return e;
  },
  quadraticIn: function(e) {
    return e * e;
  },
  quadraticOut: function(e) {
    return e * (2 - e);
  },
  quadraticInOut: function(e) {
    return (e *= 2) < 1 ? 0.5 * e * e : -0.5 * (--e * (e - 2) - 1);
  },
  cubicIn: function(e) {
    return e * e * e;
  },
  cubicOut: function(e) {
    return --e * e * e + 1;
  },
  cubicInOut: function(e) {
    return (e *= 2) < 1 ? 0.5 * e * e * e : 0.5 * ((e -= 2) * e * e + 2);
  },
  quarticIn: function(e) {
    return e * e * e * e;
  },
  quarticOut: function(e) {
    return 1 - --e * e * e * e;
  },
  quarticInOut: function(e) {
    return (e *= 2) < 1 ? 0.5 * e * e * e * e : -0.5 * ((e -= 2) * e * e * e - 2);
  },
  quinticIn: function(e) {
    return e * e * e * e * e;
  },
  quinticOut: function(e) {
    return --e * e * e * e * e + 1;
  },
  quinticInOut: function(e) {
    return (e *= 2) < 1 ? 0.5 * e * e * e * e * e : 0.5 * ((e -= 2) * e * e * e * e + 2);
  },
  sinusoidalIn: function(e) {
    return 1 - Math.cos(e * Math.PI / 2);
  },
  sinusoidalOut: function(e) {
    return Math.sin(e * Math.PI / 2);
  },
  sinusoidalInOut: function(e) {
    return 0.5 * (1 - Math.cos(Math.PI * e));
  },
  exponentialIn: function(e) {
    return e === 0 ? 0 : Math.pow(1024, e - 1);
  },
  exponentialOut: function(e) {
    return e === 1 ? 1 : 1 - Math.pow(2, -10 * e);
  },
  exponentialInOut: function(e) {
    return e === 0 ? 0 : e === 1 ? 1 : (e *= 2) < 1 ? 0.5 * Math.pow(1024, e - 1) : 0.5 * (-Math.pow(2, -10 * (e - 1)) + 2);
  },
  circularIn: function(e) {
    return 1 - Math.sqrt(1 - e * e);
  },
  circularOut: function(e) {
    return Math.sqrt(1 - --e * e);
  },
  circularInOut: function(e) {
    return (e *= 2) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
  },
  elasticIn: function(e) {
    var t, r = 0.1, i = 0.4;
    return e === 0 ? 0 : e === 1 ? 1 : (!r || r < 1 ? (r = 1, t = i / 4) : t = i * Math.asin(1 / r) / (2 * Math.PI), -(r * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * (2 * Math.PI) / i)));
  },
  elasticOut: function(e) {
    var t, r = 0.1, i = 0.4;
    return e === 0 ? 0 : e === 1 ? 1 : (!r || r < 1 ? (r = 1, t = i / 4) : t = i * Math.asin(1 / r) / (2 * Math.PI), r * Math.pow(2, -10 * e) * Math.sin((e - t) * (2 * Math.PI) / i) + 1);
  },
  elasticInOut: function(e) {
    var t, r = 0.1, i = 0.4;
    return e === 0 ? 0 : e === 1 ? 1 : (!r || r < 1 ? (r = 1, t = i / 4) : t = i * Math.asin(1 / r) / (2 * Math.PI), (e *= 2) < 1 ? -0.5 * (r * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * (2 * Math.PI) / i)) : r * Math.pow(2, -10 * (e -= 1)) * Math.sin((e - t) * (2 * Math.PI) / i) * 0.5 + 1);
  },
  backIn: function(e) {
    var t = 1.70158;
    return e * e * ((t + 1) * e - t);
  },
  backOut: function(e) {
    var t = 1.70158;
    return --e * e * ((t + 1) * e + t) + 1;
  },
  backInOut: function(e) {
    var t = 2.5949095;
    return (e *= 2) < 1 ? 0.5 * (e * e * ((t + 1) * e - t)) : 0.5 * ((e -= 2) * e * ((t + 1) * e + t) + 2);
  },
  bounceIn: function(e) {
    return 1 - Vn.bounceOut(1 - e);
  },
  bounceOut: function(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  bounceInOut: function(e) {
    return e < 0.5 ? Vn.bounceIn(e * 2) * 0.5 : Vn.bounceOut(e * 2 - 1) * 0.5 + 0.5;
  }
}, ba = Math.pow, Tr = Math.sqrt, Mo = 1e-8, rp = 1e-4, Bh = Tr(3), Sa = 1 / 3, Re = ln(), pe = ln(), Zi = ln();
function wr(e) {
  return e > -Mo && e < Mo;
}
function ip(e) {
  return e > Mo || e < -Mo;
}
function Gt(e, t, r, i, n) {
  var a = 1 - n;
  return a * a * (a * e + 3 * n * t) + n * n * (n * i + 3 * a * r);
}
function Nh(e, t, r, i, n) {
  var a = 1 - n;
  return 3 * (((t - e) * a + 2 * (r - t) * n) * a + (i - r) * n * n);
}
function np(e, t, r, i, n, a) {
  var o = i + 3 * (t - r) - e, s = 3 * (r - t * 2 + e), l = 3 * (t - e), u = e - n, c = s * s - 3 * o * l, h = s * l - 9 * o * u, v = l * l - 3 * s * u, f = 0;
  if (wr(c) && wr(h))
    if (wr(s))
      a[0] = 0;
    else {
      var d = -l / s;
      d >= 0 && d <= 1 && (a[f++] = d);
    }
  else {
    var g = h * h - 4 * c * v;
    if (wr(g)) {
      var p = h / c, d = -s / o + p, m = -p / 2;
      d >= 0 && d <= 1 && (a[f++] = d), m >= 0 && m <= 1 && (a[f++] = m);
    } else if (g > 0) {
      var y = Tr(g), _ = c * s + 1.5 * o * (-h + y), w = c * s + 1.5 * o * (-h - y);
      _ < 0 ? _ = -ba(-_, Sa) : _ = ba(_, Sa), w < 0 ? w = -ba(-w, Sa) : w = ba(w, Sa);
      var d = (-s - (_ + w)) / (3 * o);
      d >= 0 && d <= 1 && (a[f++] = d);
    } else {
      var b = (2 * c * s - 3 * o * h) / (2 * Tr(c * c * c)), S = Math.acos(b) / 3, T = Tr(c), C = Math.cos(S), d = (-s - 2 * T * C) / (3 * o), m = (-s + T * (C + Bh * Math.sin(S))) / (3 * o), x = (-s + T * (C - Bh * Math.sin(S))) / (3 * o);
      d >= 0 && d <= 1 && (a[f++] = d), m >= 0 && m <= 1 && (a[f++] = m), x >= 0 && x <= 1 && (a[f++] = x);
    }
  }
  return f;
}
function ap(e, t, r, i, n) {
  var a = 6 * r - 12 * t + 6 * e, o = 9 * t + 3 * i - 3 * e - 9 * r, s = 3 * t - 3 * e, l = 0;
  if (wr(o)) {
    if (ip(a)) {
      var u = -s / a;
      u >= 0 && u <= 1 && (n[l++] = u);
    }
  } else {
    var c = a * a - 4 * o * s;
    if (wr(c))
      n[0] = -a / (2 * o);
    else if (c > 0) {
      var h = Tr(c), u = (-a + h) / (2 * o), v = (-a - h) / (2 * o);
      u >= 0 && u <= 1 && (n[l++] = u), v >= 0 && v <= 1 && (n[l++] = v);
    }
  }
  return l;
}
function Do(e, t, r, i, n, a) {
  var o = (t - e) * n + e, s = (r - t) * n + t, l = (i - r) * n + r, u = (s - o) * n + o, c = (l - s) * n + s, h = (c - u) * n + u;
  a[0] = e, a[1] = o, a[2] = u, a[3] = h, a[4] = h, a[5] = c, a[6] = l, a[7] = i;
}
function Lx(e, t, r, i, n, a, o, s, l, u, c) {
  var h, v = 5e-3, f = 1 / 0, d, g, p, m;
  Re[0] = l, Re[1] = u;
  for (var y = 0; y < 1; y += 0.05)
    pe[0] = Gt(e, r, n, o, y), pe[1] = Gt(t, i, a, s, y), p = qi(Re, pe), p < f && (h = y, f = p);
  f = 1 / 0;
  for (var _ = 0; _ < 32 && !(v < rp); _++)
    d = h - v, g = h + v, pe[0] = Gt(e, r, n, o, d), pe[1] = Gt(t, i, a, s, d), p = qi(pe, Re), d >= 0 && p < f ? (h = d, f = p) : (Zi[0] = Gt(e, r, n, o, g), Zi[1] = Gt(t, i, a, s, g), m = qi(Zi, Re), g <= 1 && m < f ? (h = g, f = m) : v *= 0.5);
  return Tr(f);
}
function Ix(e, t, r, i, n, a, o, s, l) {
  for (var u = e, c = t, h = 0, v = 1 / l, f = 1; f <= l; f++) {
    var d = f * v, g = Gt(e, r, n, o, d), p = Gt(t, i, a, s, d), m = g - u, y = p - c;
    h += Math.sqrt(m * m + y * y), u = g, c = p;
  }
  return h;
}
function Kt(e, t, r, i) {
  var n = 1 - i;
  return n * (n * e + 2 * i * t) + i * i * r;
}
function Fh(e, t, r, i) {
  return 2 * ((1 - i) * (t - e) + i * (r - t));
}
function Ex(e, t, r, i, n) {
  var a = e - 2 * t + r, o = 2 * (t - e), s = e - i, l = 0;
  if (wr(a)) {
    if (ip(o)) {
      var u = -s / o;
      u >= 0 && u <= 1 && (n[l++] = u);
    }
  } else {
    var c = o * o - 4 * a * s;
    if (wr(c)) {
      var u = -o / (2 * a);
      u >= 0 && u <= 1 && (n[l++] = u);
    } else if (c > 0) {
      var h = Tr(c), u = (-o + h) / (2 * a), v = (-o - h) / (2 * a);
      u >= 0 && u <= 1 && (n[l++] = u), v >= 0 && v <= 1 && (n[l++] = v);
    }
  }
  return l;
}
function op(e, t, r) {
  var i = e + r - 2 * t;
  return i === 0 ? 0.5 : (e - t) / i;
}
function ko(e, t, r, i, n) {
  var a = (t - e) * i + e, o = (r - t) * i + t, s = (o - a) * i + a;
  n[0] = e, n[1] = a, n[2] = s, n[3] = s, n[4] = o, n[5] = r;
}
function Px(e, t, r, i, n, a, o, s, l) {
  var u, c = 5e-3, h = 1 / 0;
  Re[0] = o, Re[1] = s;
  for (var v = 0; v < 1; v += 0.05) {
    pe[0] = Kt(e, r, n, v), pe[1] = Kt(t, i, a, v);
    var f = qi(Re, pe);
    f < h && (u = v, h = f);
  }
  h = 1 / 0;
  for (var d = 0; d < 32 && !(c < rp); d++) {
    var g = u - c, p = u + c;
    pe[0] = Kt(e, r, n, g), pe[1] = Kt(t, i, a, g);
    var f = qi(pe, Re);
    if (g >= 0 && f < h)
      u = g, h = f;
    else {
      Zi[0] = Kt(e, r, n, p), Zi[1] = Kt(t, i, a, p);
      var m = qi(Zi, Re);
      p <= 1 && m < h ? (u = p, h = m) : c *= 0.5;
    }
  }
  return Tr(h);
}
function Rx(e, t, r, i, n, a, o) {
  for (var s = e, l = t, u = 0, c = 1 / o, h = 1; h <= o; h++) {
    var v = h * c, f = Kt(e, r, n, v), d = Kt(t, i, a, v), g = f - s, p = d - l;
    u += Math.sqrt(g * g + p * p), s = f, l = d;
  }
  return u;
}
var Ox = /cubic-bezier\(([0-9,\.e ]+)\)/;
function sp(e) {
  var t = e && Ox.exec(e);
  if (t) {
    var r = t[1].split(","), i = +Be(r[0]), n = +Be(r[1]), a = +Be(r[2]), o = +Be(r[3]);
    if (isNaN(i + n + a + o))
      return;
    var s = [];
    return function(l) {
      return l <= 0 ? 0 : l >= 1 ? 1 : np(0, i, a, 1, l, s) && Gt(0, n, o, 1, s[0]);
    };
  }
}
var Bx = (function() {
  function e(t) {
    this._inited = !1, this._startTime = 0, this._pausedTime = 0, this._paused = !1, this._life = t.life || 1e3, this._delay = t.delay || 0, this.loop = t.loop || !1, this.onframe = t.onframe || $t, this.ondestroy = t.ondestroy || $t, this.onrestart = t.onrestart || $t, t.easing && this.setEasing(t.easing);
  }
  return e.prototype.step = function(t, r) {
    if (this._inited || (this._startTime = t + this._delay, this._inited = !0), this._paused) {
      this._pausedTime += r;
      return;
    }
    var i = this._life, n = t - this._startTime - this._pausedTime, a = n / i;
    a < 0 && (a = 0), a = Math.min(a, 1);
    var o = this.easingFunc, s = o ? o(a) : a;
    if (this.onframe(s), a === 1)
      if (this.loop) {
        var l = n % i;
        this._startTime = t - l, this._pausedTime = 0, this.onrestart();
      } else
        return !0;
    return !1;
  }, e.prototype.pause = function() {
    this._paused = !0;
  }, e.prototype.resume = function() {
    this._paused = !1;
  }, e.prototype.setEasing = function(t) {
    this.easing = t, this.easingFunc = at(t) ? t : Vn[t] || sp(t);
  }, e;
})(), lp = /* @__PURE__ */ (function() {
  function e(t) {
    this.value = t;
  }
  return e;
})(), Nx = (function() {
  function e() {
    this._len = 0;
  }
  return e.prototype.insert = function(t) {
    var r = new lp(t);
    return this.insertEntry(r), r;
  }, e.prototype.insertEntry = function(t) {
    this.head ? (this.tail.next = t, t.prev = this.tail, t.next = null, this.tail = t) : this.head = this.tail = t, this._len++;
  }, e.prototype.remove = function(t) {
    var r = t.prev, i = t.next;
    r ? r.next = i : this.head = i, i ? i.prev = r : this.tail = r, t.next = t.prev = null, this._len--;
  }, e.prototype.len = function() {
    return this._len;
  }, e.prototype.clear = function() {
    this.head = this.tail = null, this._len = 0;
  }, e;
})(), en = (function() {
  function e(t) {
    this._list = new Nx(), this._maxSize = 10, this._map = {}, this._maxSize = t;
  }
  return e.prototype.put = function(t, r) {
    var i = this._list, n = this._map, a = null;
    if (n[t] == null) {
      var o = i.len(), s = this._lastRemovedEntry;
      if (o >= this._maxSize && o > 0) {
        var l = i.head;
        i.remove(l), delete n[l.key], a = l.value, this._lastRemovedEntry = l;
      }
      s ? s.value = r : s = new lp(r), s.key = t, i.insertEntry(s), n[t] = s;
    }
    return a;
  }, e.prototype.get = function(t) {
    var r = this._map[t], i = this._list;
    if (r != null)
      return r !== i.tail && (i.remove(r), i.insertEntry(r)), r.value;
  }, e.prototype.clear = function() {
    this._list.clear(), this._map = {};
  }, e.prototype.len = function() {
    return this._list.len();
  }, e;
})(), Uh = {
  transparent: [0, 0, 0, 0],
  aliceblue: [240, 248, 255, 1],
  antiquewhite: [250, 235, 215, 1],
  aqua: [0, 255, 255, 1],
  aquamarine: [127, 255, 212, 1],
  azure: [240, 255, 255, 1],
  beige: [245, 245, 220, 1],
  bisque: [255, 228, 196, 1],
  black: [0, 0, 0, 1],
  blanchedalmond: [255, 235, 205, 1],
  blue: [0, 0, 255, 1],
  blueviolet: [138, 43, 226, 1],
  brown: [165, 42, 42, 1],
  burlywood: [222, 184, 135, 1],
  cadetblue: [95, 158, 160, 1],
  chartreuse: [127, 255, 0, 1],
  chocolate: [210, 105, 30, 1],
  coral: [255, 127, 80, 1],
  cornflowerblue: [100, 149, 237, 1],
  cornsilk: [255, 248, 220, 1],
  crimson: [220, 20, 60, 1],
  cyan: [0, 255, 255, 1],
  darkblue: [0, 0, 139, 1],
  darkcyan: [0, 139, 139, 1],
  darkgoldenrod: [184, 134, 11, 1],
  darkgray: [169, 169, 169, 1],
  darkgreen: [0, 100, 0, 1],
  darkgrey: [169, 169, 169, 1],
  darkkhaki: [189, 183, 107, 1],
  darkmagenta: [139, 0, 139, 1],
  darkolivegreen: [85, 107, 47, 1],
  darkorange: [255, 140, 0, 1],
  darkorchid: [153, 50, 204, 1],
  darkred: [139, 0, 0, 1],
  darksalmon: [233, 150, 122, 1],
  darkseagreen: [143, 188, 143, 1],
  darkslateblue: [72, 61, 139, 1],
  darkslategray: [47, 79, 79, 1],
  darkslategrey: [47, 79, 79, 1],
  darkturquoise: [0, 206, 209, 1],
  darkviolet: [148, 0, 211, 1],
  deeppink: [255, 20, 147, 1],
  deepskyblue: [0, 191, 255, 1],
  dimgray: [105, 105, 105, 1],
  dimgrey: [105, 105, 105, 1],
  dodgerblue: [30, 144, 255, 1],
  firebrick: [178, 34, 34, 1],
  floralwhite: [255, 250, 240, 1],
  forestgreen: [34, 139, 34, 1],
  fuchsia: [255, 0, 255, 1],
  gainsboro: [220, 220, 220, 1],
  ghostwhite: [248, 248, 255, 1],
  gold: [255, 215, 0, 1],
  goldenrod: [218, 165, 32, 1],
  gray: [128, 128, 128, 1],
  green: [0, 128, 0, 1],
  greenyellow: [173, 255, 47, 1],
  grey: [128, 128, 128, 1],
  honeydew: [240, 255, 240, 1],
  hotpink: [255, 105, 180, 1],
  indianred: [205, 92, 92, 1],
  indigo: [75, 0, 130, 1],
  ivory: [255, 255, 240, 1],
  khaki: [240, 230, 140, 1],
  lavender: [230, 230, 250, 1],
  lavenderblush: [255, 240, 245, 1],
  lawngreen: [124, 252, 0, 1],
  lemonchiffon: [255, 250, 205, 1],
  lightblue: [173, 216, 230, 1],
  lightcoral: [240, 128, 128, 1],
  lightcyan: [224, 255, 255, 1],
  lightgoldenrodyellow: [250, 250, 210, 1],
  lightgray: [211, 211, 211, 1],
  lightgreen: [144, 238, 144, 1],
  lightgrey: [211, 211, 211, 1],
  lightpink: [255, 182, 193, 1],
  lightsalmon: [255, 160, 122, 1],
  lightseagreen: [32, 178, 170, 1],
  lightskyblue: [135, 206, 250, 1],
  lightslategray: [119, 136, 153, 1],
  lightslategrey: [119, 136, 153, 1],
  lightsteelblue: [176, 196, 222, 1],
  lightyellow: [255, 255, 224, 1],
  lime: [0, 255, 0, 1],
  limegreen: [50, 205, 50, 1],
  linen: [250, 240, 230, 1],
  magenta: [255, 0, 255, 1],
  maroon: [128, 0, 0, 1],
  mediumaquamarine: [102, 205, 170, 1],
  mediumblue: [0, 0, 205, 1],
  mediumorchid: [186, 85, 211, 1],
  mediumpurple: [147, 112, 219, 1],
  mediumseagreen: [60, 179, 113, 1],
  mediumslateblue: [123, 104, 238, 1],
  mediumspringgreen: [0, 250, 154, 1],
  mediumturquoise: [72, 209, 204, 1],
  mediumvioletred: [199, 21, 133, 1],
  midnightblue: [25, 25, 112, 1],
  mintcream: [245, 255, 250, 1],
  mistyrose: [255, 228, 225, 1],
  moccasin: [255, 228, 181, 1],
  navajowhite: [255, 222, 173, 1],
  navy: [0, 0, 128, 1],
  oldlace: [253, 245, 230, 1],
  olive: [128, 128, 0, 1],
  olivedrab: [107, 142, 35, 1],
  orange: [255, 165, 0, 1],
  orangered: [255, 69, 0, 1],
  orchid: [218, 112, 214, 1],
  palegoldenrod: [238, 232, 170, 1],
  palegreen: [152, 251, 152, 1],
  paleturquoise: [175, 238, 238, 1],
  palevioletred: [219, 112, 147, 1],
  papayawhip: [255, 239, 213, 1],
  peachpuff: [255, 218, 185, 1],
  peru: [205, 133, 63, 1],
  pink: [255, 192, 203, 1],
  plum: [221, 160, 221, 1],
  powderblue: [176, 224, 230, 1],
  purple: [128, 0, 128, 1],
  red: [255, 0, 0, 1],
  rosybrown: [188, 143, 143, 1],
  royalblue: [65, 105, 225, 1],
  saddlebrown: [139, 69, 19, 1],
  salmon: [250, 128, 114, 1],
  sandybrown: [244, 164, 96, 1],
  seagreen: [46, 139, 87, 1],
  seashell: [255, 245, 238, 1],
  sienna: [160, 82, 45, 1],
  silver: [192, 192, 192, 1],
  skyblue: [135, 206, 235, 1],
  slateblue: [106, 90, 205, 1],
  slategray: [112, 128, 144, 1],
  slategrey: [112, 128, 144, 1],
  snow: [255, 250, 250, 1],
  springgreen: [0, 255, 127, 1],
  steelblue: [70, 130, 180, 1],
  tan: [210, 180, 140, 1],
  teal: [0, 128, 128, 1],
  thistle: [216, 191, 216, 1],
  tomato: [255, 99, 71, 1],
  turquoise: [64, 224, 208, 1],
  violet: [238, 130, 238, 1],
  wheat: [245, 222, 179, 1],
  white: [255, 255, 255, 1],
  whitesmoke: [245, 245, 245, 1],
  yellow: [255, 255, 0, 1],
  yellowgreen: [154, 205, 50, 1]
};
function Hn(e) {
  return e = Math.round(e), e < 0 ? 0 : e > 255 ? 255 : e;
}
function zh(e) {
  return e < 0 ? 0 : e > 1 ? 1 : e;
}
function zs(e) {
  var t = e;
  return t.length && t.charAt(t.length - 1) === "%" ? Hn(parseFloat(t) / 100 * 255) : Hn(parseInt(t, 10));
}
function hi(e) {
  var t = e;
  return t.length && t.charAt(t.length - 1) === "%" ? zh(parseFloat(t) / 100) : zh(parseFloat(t));
}
function Vs(e, t, r) {
  return r < 0 ? r += 1 : r > 1 && (r -= 1), r * 6 < 1 ? e + (t - e) * r * 6 : r * 2 < 1 ? t : r * 3 < 2 ? e + (t - e) * (2 / 3 - r) * 6 : e;
}
function ue(e, t, r, i, n) {
  return e[0] = t, e[1] = r, e[2] = i, e[3] = n, e;
}
function ou(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e;
}
var up = new en(20), xa = null;
function Ti(e, t) {
  xa && ou(xa, t), xa = up.put(e, xa || t.slice());
}
function fi(e, t) {
  if (e) {
    t = t || [];
    var r = up.get(e);
    if (r)
      return ou(t, r);
    e = e + "";
    var i = e.replace(/ /g, "").toLowerCase();
    if (i in Uh)
      return ou(t, Uh[i]), Ti(e, t), t;
    var n = i.length;
    if (i.charAt(0) === "#") {
      if (n === 4 || n === 5) {
        var a = parseInt(i.slice(1, 4), 16);
        if (!(a >= 0 && a <= 4095)) {
          ue(t, 0, 0, 0, 1);
          return;
        }
        return ue(t, (a & 3840) >> 4 | (a & 3840) >> 8, a & 240 | (a & 240) >> 4, a & 15 | (a & 15) << 4, n === 5 ? parseInt(i.slice(4), 16) / 15 : 1), Ti(e, t), t;
      } else if (n === 7 || n === 9) {
        var a = parseInt(i.slice(1, 7), 16);
        if (!(a >= 0 && a <= 16777215)) {
          ue(t, 0, 0, 0, 1);
          return;
        }
        return ue(t, (a & 16711680) >> 16, (a & 65280) >> 8, a & 255, n === 9 ? parseInt(i.slice(7), 16) / 255 : 1), Ti(e, t), t;
      }
      return;
    }
    var o = i.indexOf("("), s = i.indexOf(")");
    if (o !== -1 && s + 1 === n) {
      var l = i.substr(0, o), u = i.substr(o + 1, s - (o + 1)).split(","), c = 1;
      switch (l) {
        case "rgba":
          if (u.length !== 4)
            return u.length === 3 ? ue(t, +u[0], +u[1], +u[2], 1) : ue(t, 0, 0, 0, 1);
          c = hi(u.pop());
        case "rgb":
          if (u.length >= 3)
            return ue(t, zs(u[0]), zs(u[1]), zs(u[2]), u.length === 3 ? c : hi(u[3])), Ti(e, t), t;
          ue(t, 0, 0, 0, 1);
          return;
        case "hsla":
          if (u.length !== 4) {
            ue(t, 0, 0, 0, 1);
            return;
          }
          return u[3] = hi(u[3]), su(u, t), Ti(e, t), t;
        case "hsl":
          if (u.length !== 3) {
            ue(t, 0, 0, 0, 1);
            return;
          }
          return su(u, t), Ti(e, t), t;
        default:
          return;
      }
    }
    ue(t, 0, 0, 0, 1);
  }
}
function su(e, t) {
  var r = (parseFloat(e[0]) % 360 + 360) % 360 / 360, i = hi(e[1]), n = hi(e[2]), a = n <= 0.5 ? n * (i + 1) : n + i - n * i, o = n * 2 - a;
  return t = t || [], ue(t, Hn(Vs(o, a, r + 1 / 3) * 255), Hn(Vs(o, a, r) * 255), Hn(Vs(o, a, r - 1 / 3) * 255), 1), e.length === 4 && (t[3] = e[3]), t;
}
function Fx(e) {
  if (e) {
    var t = e[0] / 255, r = e[1] / 255, i = e[2] / 255, n = Math.min(t, r, i), a = Math.max(t, r, i), o = a - n, s = (a + n) / 2, l, u;
    if (o === 0)
      l = 0, u = 0;
    else {
      s < 0.5 ? u = o / (a + n) : u = o / (2 - a - n);
      var c = ((a - t) / 6 + o / 2) / o, h = ((a - r) / 6 + o / 2) / o, v = ((a - i) / 6 + o / 2) / o;
      t === a ? l = v - h : r === a ? l = 1 / 3 + c - v : i === a && (l = 2 / 3 + h - c), l < 0 && (l += 1), l > 1 && (l -= 1);
    }
    var f = [l * 360, u, s];
    return e[3] != null && f.push(e[3]), f;
  }
}
function Vh(e, t) {
  var r = fi(e);
  if (r) {
    for (var i = 0; i < 3; i++)
      r[i] = r[i] * (1 - t) | 0, r[i] > 255 ? r[i] = 255 : r[i] < 0 && (r[i] = 0);
    return mc(r, r.length === 4 ? "rgba" : "rgb");
  }
}
function lu(e, t, r, i) {
  var n = fi(e);
  if (e)
    return n = Fx(n), r != null && (n[1] = hi(at(r) ? r(n[1]) : r)), i != null && (n[2] = hi(at(i) ? i(n[2]) : i)), mc(su(n), "rgba");
}
function mc(e, t) {
  if (!(!e || !e.length)) {
    var r = e[0] + "," + e[1] + "," + e[2];
    return (t === "rgba" || t === "hsva" || t === "hsla") && (r += "," + e[3]), t + "(" + r + ")";
  }
}
function Lo(e, t) {
  var r = fi(e);
  return r ? (0.299 * r[0] + 0.587 * r[1] + 0.114 * r[2]) * r[3] / 255 + (1 - r[3]) * t : 0;
}
var Hh = new en(100);
function Wh(e) {
  if (X(e)) {
    var t = Hh.get(e);
    return t || (t = Vh(e, -0.1), Hh.put(e, t)), t;
  } else if (is(e)) {
    var r = P({}, e);
    return r.colorStops = it(e.colorStops, function(i) {
      return {
        offset: i.offset,
        color: Vh(i.color, -0.1)
      };
    }), r;
  }
  return e;
}
function Ux(e) {
  return e.type === "linear";
}
function zx(e) {
  return e.type === "radial";
}
(function() {
  return typeof Buffer < "u" && typeof Buffer.from == "function" ? function(e) {
    return Buffer.from(e).toString("base64");
  } : typeof btoa == "function" && typeof unescape == "function" && typeof encodeURIComponent == "function" ? function(e) {
    return btoa(unescape(encodeURIComponent(e)));
  } : function(e) {
    return null;
  };
})();
var uu = Array.prototype.slice;
function rr(e, t, r) {
  return (t - e) * r + e;
}
function Hs(e, t, r, i) {
  for (var n = t.length, a = 0; a < n; a++)
    e[a] = rr(t[a], r[a], i);
  return e;
}
function Vx(e, t, r, i) {
  for (var n = t.length, a = n && t[0].length, o = 0; o < n; o++) {
    e[o] || (e[o] = []);
    for (var s = 0; s < a; s++)
      e[o][s] = rr(t[o][s], r[o][s], i);
  }
  return e;
}
function Ta(e, t, r, i) {
  for (var n = t.length, a = 0; a < n; a++)
    e[a] = t[a] + r[a] * i;
  return e;
}
function Gh(e, t, r, i) {
  for (var n = t.length, a = n && t[0].length, o = 0; o < n; o++) {
    e[o] || (e[o] = []);
    for (var s = 0; s < a; s++)
      e[o][s] = t[o][s] + r[o][s] * i;
  }
  return e;
}
function Hx(e, t) {
  for (var r = e.length, i = t.length, n = r > i ? t : e, a = Math.min(r, i), o = n[a - 1] || { color: [0, 0, 0, 0], offset: 0 }, s = a; s < Math.max(r, i); s++)
    n.push({
      offset: o.offset,
      color: o.color.slice()
    });
}
function Wx(e, t, r) {
  var i = e, n = t;
  if (!(!i.push || !n.push)) {
    var a = i.length, o = n.length;
    if (a !== o) {
      var s = a > o;
      if (s)
        i.length = o;
      else
        for (var l = a; l < o; l++)
          i.push(r === 1 ? n[l] : uu.call(n[l]));
    }
    for (var u = i[0] && i[0].length, l = 0; l < i.length; l++)
      if (r === 1)
        isNaN(i[l]) && (i[l] = n[l]);
      else
        for (var c = 0; c < u; c++)
          isNaN(i[l][c]) && (i[l][c] = n[l][c]);
  }
}
function oo(e) {
  if (te(e)) {
    var t = e.length;
    if (te(e[0])) {
      for (var r = [], i = 0; i < t; i++)
        r.push(uu.call(e[i]));
      return r;
    }
    return uu.call(e);
  }
  return e;
}
function so(e) {
  return e[0] = Math.floor(e[0]) || 0, e[1] = Math.floor(e[1]) || 0, e[2] = Math.floor(e[2]) || 0, e[3] = e[3] == null ? 1 : e[3], "rgba(" + e.join(",") + ")";
}
function Gx(e) {
  return te(e && e[0]) ? 2 : 1;
}
var Ca = 0, lo = 1, cp = 2, In = 3, cu = 4, hu = 5, Yh = 6;
function Xh(e) {
  return e === cu || e === hu;
}
function Aa(e) {
  return e === lo || e === cp;
}
var dn = [0, 0, 0, 0], Yx = (function() {
  function e(t) {
    this.keyframes = [], this.discrete = !1, this._invalid = !1, this._needsSort = !1, this._lastFr = 0, this._lastFrP = 0, this.propName = t;
  }
  return e.prototype.isFinished = function() {
    return this._finished;
  }, e.prototype.setFinished = function() {
    this._finished = !0, this._additiveTrack && this._additiveTrack.setFinished();
  }, e.prototype.needsAnimate = function() {
    return this.keyframes.length >= 1;
  }, e.prototype.getAdditiveTrack = function() {
    return this._additiveTrack;
  }, e.prototype.addKeyframe = function(t, r, i) {
    this._needsSort = !0;
    var n = this.keyframes, a = n.length, o = !1, s = Yh, l = r;
    if (te(r)) {
      var u = Gx(r);
      s = u, (u === 1 && !_t(r[0]) || u === 2 && !_t(r[0][0])) && (o = !0);
    } else if (_t(r) && !HS(r))
      s = Ca;
    else if (X(r))
      if (!isNaN(+r))
        s = Ca;
      else {
        var c = fi(r);
        c && (l = c, s = In);
      }
    else if (is(r)) {
      var h = P({}, l);
      h.colorStops = it(r.colorStops, function(f) {
        return {
          offset: f.offset,
          color: fi(f.color)
        };
      }), Ux(r) ? s = cu : zx(r) && (s = hu), l = h;
    }
    a === 0 ? this.valType = s : (s !== this.valType || s === Yh) && (o = !0), this.discrete = this.discrete || o;
    var v = {
      time: t,
      value: l,
      rawValue: r,
      percent: 0
    };
    return i && (v.easing = i, v.easingFunc = at(i) ? i : Vn[i] || sp(i)), n.push(v), v;
  }, e.prototype.prepare = function(t, r) {
    var i = this.keyframes;
    this._needsSort && i.sort(function(g, p) {
      return g.time - p.time;
    });
    for (var n = this.valType, a = i.length, o = i[a - 1], s = this.discrete, l = Aa(n), u = Xh(n), c = 0; c < a; c++) {
      var h = i[c], v = h.value, f = o.value;
      h.percent = h.time / t, s || (l && c !== a - 1 ? Wx(v, f, n) : u && Hx(v.colorStops, f.colorStops));
    }
    if (!s && n !== hu && r && this.needsAnimate() && r.needsAnimate() && n === r.valType && !r._finished) {
      this._additiveTrack = r;
      for (var d = i[0].value, c = 0; c < a; c++)
        n === Ca ? i[c].additiveValue = i[c].value - d : n === In ? i[c].additiveValue = Ta([], i[c].value, d, -1) : Aa(n) && (i[c].additiveValue = n === lo ? Ta([], i[c].value, d, -1) : Gh([], i[c].value, d, -1));
    }
  }, e.prototype.step = function(t, r) {
    if (!this._finished) {
      this._additiveTrack && this._additiveTrack._finished && (this._additiveTrack = null);
      var i = this._additiveTrack != null, n = i ? "additiveValue" : "value", a = this.valType, o = this.keyframes, s = o.length, l = this.propName, u = a === In, c, h = this._lastFr, v = Math.min, f, d;
      if (s === 1)
        f = d = o[0];
      else {
        if (r < 0)
          c = 0;
        else if (r < this._lastFrP) {
          var g = v(h + 1, s - 1);
          for (c = g; c >= 0 && !(o[c].percent <= r); c--)
            ;
          c = v(c, s - 2);
        } else {
          for (c = h; c < s && !(o[c].percent > r); c++)
            ;
          c = v(c - 1, s - 2);
        }
        d = o[c + 1], f = o[c];
      }
      if (f && d) {
        this._lastFr = c, this._lastFrP = r;
        var p = d.percent - f.percent, m = p === 0 ? 1 : v((r - f.percent) / p, 1);
        d.easingFunc && (m = d.easingFunc(m));
        var y = i ? this._additiveValue : u ? dn : t[l];
        if ((Aa(a) || u) && !y && (y = this._additiveValue = []), this.discrete)
          t[l] = m < 1 ? f.rawValue : d.rawValue;
        else if (Aa(a))
          a === lo ? Hs(y, f[n], d[n], m) : Vx(y, f[n], d[n], m);
        else if (Xh(a)) {
          var _ = f[n], w = d[n], b = a === cu;
          t[l] = {
            type: b ? "linear" : "radial",
            x: rr(_.x, w.x, m),
            y: rr(_.y, w.y, m),
            colorStops: it(_.colorStops, function(T, C) {
              var x = w.colorStops[C];
              return {
                offset: rr(T.offset, x.offset, m),
                color: so(Hs([], T.color, x.color, m))
              };
            }),
            global: w.global
          }, b ? (t[l].x2 = rr(_.x2, w.x2, m), t[l].y2 = rr(_.y2, w.y2, m)) : t[l].r = rr(_.r, w.r, m);
        } else if (u)
          Hs(y, f[n], d[n], m), i || (t[l] = so(y));
        else {
          var S = rr(f[n], d[n], m);
          i ? this._additiveValue = S : t[l] = S;
        }
        i && this._addToTarget(t);
      }
    }
  }, e.prototype._addToTarget = function(t) {
    var r = this.valType, i = this.propName, n = this._additiveValue;
    r === Ca ? t[i] = t[i] + n : r === In ? (fi(t[i], dn), Ta(dn, dn, n, 1), t[i] = so(dn)) : r === lo ? Ta(t[i], t[i], n, 1) : r === cp && Gh(t[i], t[i], n, 1);
  }, e;
})(), yc = (function() {
  function e(t, r, i, n) {
    if (this._tracks = {}, this._trackKeys = [], this._maxTime = 0, this._started = 0, this._clip = null, this._target = t, this._loop = r, r && n) {
      hc("Can' use additive animation on looped animation.");
      return;
    }
    this._additiveAnimators = n, this._allowDiscrete = i;
  }
  return e.prototype.getMaxTime = function() {
    return this._maxTime;
  }, e.prototype.getDelay = function() {
    return this._delay;
  }, e.prototype.getLoop = function() {
    return this._loop;
  }, e.prototype.getTarget = function() {
    return this._target;
  }, e.prototype.changeTarget = function(t) {
    this._target = t;
  }, e.prototype.when = function(t, r, i) {
    return this.whenWithKeys(t, r, yt(r), i);
  }, e.prototype.whenWithKeys = function(t, r, i, n) {
    for (var a = this._tracks, o = 0; o < i.length; o++) {
      var s = i[o], l = a[s];
      if (!l) {
        l = a[s] = new Yx(s);
        var u = void 0, c = this._getAdditiveTrack(s);
        if (c) {
          var h = c.keyframes, v = h[h.length - 1];
          u = v && v.value, c.valType === In && u && (u = so(u));
        } else
          u = this._target[s];
        if (u == null)
          continue;
        t > 0 && l.addKeyframe(0, oo(u), n), this._trackKeys.push(s);
      }
      l.addKeyframe(t, oo(r[s]), n);
    }
    return this._maxTime = Math.max(this._maxTime, t), this;
  }, e.prototype.pause = function() {
    this._clip.pause(), this._paused = !0;
  }, e.prototype.resume = function() {
    this._clip.resume(), this._paused = !1;
  }, e.prototype.isPaused = function() {
    return !!this._paused;
  }, e.prototype.duration = function(t) {
    return this._maxTime = t, this._force = !0, this;
  }, e.prototype._doneCallback = function() {
    this._setTracksFinished(), this._clip = null;
    var t = this._doneCbs;
    if (t)
      for (var r = t.length, i = 0; i < r; i++)
        t[i].call(this);
  }, e.prototype._abortedCallback = function() {
    this._setTracksFinished();
    var t = this.animation, r = this._abortedCbs;
    if (t && t.removeClip(this._clip), this._clip = null, r)
      for (var i = 0; i < r.length; i++)
        r[i].call(this);
  }, e.prototype._setTracksFinished = function() {
    for (var t = this._tracks, r = this._trackKeys, i = 0; i < r.length; i++)
      t[r[i]].setFinished();
  }, e.prototype._getAdditiveTrack = function(t) {
    var r, i = this._additiveAnimators;
    if (i)
      for (var n = 0; n < i.length; n++) {
        var a = i[n].getTrack(t);
        a && (r = a);
      }
    return r;
  }, e.prototype.start = function(t) {
    if (!(this._started > 0)) {
      this._started = 1;
      for (var r = this, i = [], n = this._maxTime || 0, a = 0; a < this._trackKeys.length; a++) {
        var o = this._trackKeys[a], s = this._tracks[o], l = this._getAdditiveTrack(o), u = s.keyframes, c = u.length;
        if (s.prepare(n, l), s.needsAnimate())
          if (!this._allowDiscrete && s.discrete) {
            var h = u[c - 1];
            h && (r._target[s.propName] = h.rawValue), s.setFinished();
          } else
            i.push(s);
      }
      if (i.length || this._force) {
        var v = new Bx({
          life: n,
          loop: this._loop,
          delay: this._delay || 0,
          onframe: function(f) {
            r._started = 2;
            var d = r._additiveAnimators;
            if (d) {
              for (var g = !1, p = 0; p < d.length; p++)
                if (d[p]._clip) {
                  g = !0;
                  break;
                }
              g || (r._additiveAnimators = null);
            }
            for (var p = 0; p < i.length; p++)
              i[p].step(r._target, f);
            var m = r._onframeCbs;
            if (m)
              for (var p = 0; p < m.length; p++)
                m[p](r._target, f);
          },
          ondestroy: function() {
            r._doneCallback();
          }
        });
        this._clip = v, this.animation && this.animation.addClip(v), t && v.setEasing(t);
      } else
        this._doneCallback();
      return this;
    }
  }, e.prototype.stop = function(t) {
    if (this._clip) {
      var r = this._clip;
      t && r.onframe(1), this._abortedCallback();
    }
  }, e.prototype.delay = function(t) {
    return this._delay = t, this;
  }, e.prototype.during = function(t) {
    return t && (this._onframeCbs || (this._onframeCbs = []), this._onframeCbs.push(t)), this;
  }, e.prototype.done = function(t) {
    return t && (this._doneCbs || (this._doneCbs = []), this._doneCbs.push(t)), this;
  }, e.prototype.aborted = function(t) {
    return t && (this._abortedCbs || (this._abortedCbs = []), this._abortedCbs.push(t)), this;
  }, e.prototype.getClip = function() {
    return this._clip;
  }, e.prototype.getTrack = function(t) {
    return this._tracks[t];
  }, e.prototype.getTracks = function() {
    var t = this;
    return it(this._trackKeys, function(r) {
      return t._tracks[r];
    });
  }, e.prototype.stopTracks = function(t, r) {
    if (!t.length || !this._clip)
      return !0;
    for (var i = this._tracks, n = this._trackKeys, a = 0; a < t.length; a++) {
      var o = i[t[a]];
      o && !o.isFinished() && (r ? o.step(this._target, 1) : this._started === 1 && o.step(this._target, 0), o.setFinished());
    }
    for (var s = !0, a = 0; a < n.length; a++)
      if (!i[n[a]].isFinished()) {
        s = !1;
        break;
      }
    return s && this._abortedCallback(), s;
  }, e.prototype.saveTo = function(t, r, i) {
    if (t) {
      r = r || this._trackKeys;
      for (var n = 0; n < r.length; n++) {
        var a = r[n], o = this._tracks[a];
        if (!(!o || o.isFinished())) {
          var s = o.keyframes, l = s[i ? 0 : s.length - 1];
          l && (t[a] = oo(l.rawValue));
        }
      }
    }
  }, e.prototype.__changeFinalValue = function(t, r) {
    r = r || yt(t);
    for (var i = 0; i < r.length; i++) {
      var n = r[i], a = this._tracks[n];
      if (a) {
        var o = a.keyframes;
        if (o.length > 1) {
          var s = o.pop();
          a.addKeyframe(s.time, t[n]), a.prepare(this._maxTime, a.getAdditiveTrack());
        }
      }
    }
  }, e;
})();
function Gi() {
  return (/* @__PURE__ */ new Date()).getTime();
}
var Xx = (function(e) {
  Q(t, e);
  function t(r) {
    var i = e.call(this) || this;
    return i._running = !1, i._time = 0, i._pausedTime = 0, i._pauseStart = 0, i._paused = !1, r = r || {}, i.stage = r.stage || {}, i;
  }
  return t.prototype.addClip = function(r) {
    r.animation && this.removeClip(r), this._head ? (this._tail.next = r, r.prev = this._tail, r.next = null, this._tail = r) : this._head = this._tail = r, r.animation = this;
  }, t.prototype.addAnimator = function(r) {
    r.animation = this;
    var i = r.getClip();
    i && this.addClip(i);
  }, t.prototype.removeClip = function(r) {
    if (r.animation) {
      var i = r.prev, n = r.next;
      i ? i.next = n : this._head = n, n ? n.prev = i : this._tail = i, r.next = r.prev = r.animation = null;
    }
  }, t.prototype.removeAnimator = function(r) {
    var i = r.getClip();
    i && this.removeClip(i), r.animation = null;
  }, t.prototype.update = function(r) {
    for (var i = Gi() - this._pausedTime, n = i - this._time, a = this._head; a; ) {
      var o = a.next, s = a.step(i, n);
      s && (a.ondestroy(), this.removeClip(a)), a = o;
    }
    this._time = i, r || (this.trigger("frame", n), this.stage.update && this.stage.update());
  }, t.prototype._startLoop = function() {
    var r = this;
    this._running = !0;
    function i() {
      r._running && (Ao(i), !r._paused && r.update());
    }
    Ao(i);
  }, t.prototype.start = function() {
    this._running || (this._time = Gi(), this._pausedTime = 0, this._startLoop());
  }, t.prototype.stop = function() {
    this._running = !1;
  }, t.prototype.pause = function() {
    this._paused || (this._pauseStart = Gi(), this._paused = !0);
  }, t.prototype.resume = function() {
    this._paused && (this._pausedTime += Gi() - this._pauseStart, this._paused = !1);
  }, t.prototype.clear = function() {
    for (var r = this._head; r; ) {
      var i = r.next;
      r.prev = r.next = r.animation = null, r = i;
    }
    this._head = this._tail = null;
  }, t.prototype.isFinished = function() {
    return this._head == null;
  }, t.prototype.animate = function(r, i) {
    i = i || {}, this.start();
    var n = new yc(r, i.loop);
    return this.addAnimator(n), n;
  }, t;
})(Ke), qx = 300, Ws = K.domSupported, Gs = (function() {
  var e = [
    "click",
    "dblclick",
    "mousewheel",
    "wheel",
    "mouseout",
    "mouseup",
    "mousedown",
    "mousemove",
    "contextmenu"
  ], t = [
    "touchstart",
    "touchend",
    "touchmove"
  ], r = {
    pointerdown: 1,
    pointerup: 1,
    pointermove: 1,
    pointerout: 1
  }, i = it(e, function(n) {
    var a = n.replace("mouse", "pointer");
    return r.hasOwnProperty(a) ? a : n;
  });
  return {
    mouse: e,
    touch: t,
    pointer: i
  };
})(), qh = {
  mouse: ["mousemove", "mouseup"],
  pointer: ["pointermove", "pointerup"]
}, Zh = !1;
function fu(e) {
  var t = e.pointerType;
  return t === "pen" || t === "touch";
}
function Zx(e) {
  e.touching = !0, e.touchTimer != null && (clearTimeout(e.touchTimer), e.touchTimer = null), e.touchTimer = setTimeout(function() {
    e.touching = !1, e.touchTimer = null;
  }, 700);
}
function Ys(e) {
  e && (e.zrByTouch = !0);
}
function Qx(e, t) {
  return he(e.dom, new Kx(e, t), !0);
}
function hp(e, t) {
  for (var r = t, i = !1; r && r.nodeType !== 9 && !(i = r.domBelongToZr || r !== t && r === e.painterRoot); )
    r = r.parentNode;
  return i;
}
var Kx = /* @__PURE__ */ (function() {
  function e(t, r) {
    this.stopPropagation = $t, this.stopImmediatePropagation = $t, this.preventDefault = $t, this.type = r.type, this.target = this.currentTarget = t.dom, this.pointerType = r.pointerType, this.clientX = r.clientX, this.clientY = r.clientY;
  }
  return e;
})(), be = {
  mousedown: function(e) {
    e = he(this.dom, e), this.__mayPointerCapture = [e.zrX, e.zrY], this.trigger("mousedown", e);
  },
  mousemove: function(e) {
    e = he(this.dom, e);
    var t = this.__mayPointerCapture;
    t && (e.zrX !== t[0] || e.zrY !== t[1]) && this.__togglePointerCapture(!0), this.trigger("mousemove", e);
  },
  mouseup: function(e) {
    e = he(this.dom, e), this.__togglePointerCapture(!1), this.trigger("mouseup", e);
  },
  mouseout: function(e) {
    e = he(this.dom, e);
    var t = e.toElement || e.relatedTarget;
    hp(this, t) || (this.__pointerCapturing && (e.zrEventControl = "no_globalout"), this.trigger("mouseout", e));
  },
  wheel: function(e) {
    Zh = !0, e = he(this.dom, e), this.trigger("mousewheel", e);
  },
  mousewheel: function(e) {
    Zh || (e = he(this.dom, e), this.trigger("mousewheel", e));
  },
  touchstart: function(e) {
    e = he(this.dom, e), Ys(e), this.__lastTouchMoment = /* @__PURE__ */ new Date(), this.handler.processGesture(e, "start"), be.mousemove.call(this, e), be.mousedown.call(this, e);
  },
  touchmove: function(e) {
    e = he(this.dom, e), Ys(e), this.handler.processGesture(e, "change"), be.mousemove.call(this, e);
  },
  touchend: function(e) {
    e = he(this.dom, e), Ys(e), this.handler.processGesture(e, "end"), be.mouseup.call(this, e), +/* @__PURE__ */ new Date() - +this.__lastTouchMoment < qx && be.click.call(this, e);
  },
  pointerdown: function(e) {
    be.mousedown.call(this, e);
  },
  pointermove: function(e) {
    fu(e) || be.mousemove.call(this, e);
  },
  pointerup: function(e) {
    be.mouseup.call(this, e);
  },
  pointerout: function(e) {
    fu(e) || be.mouseout.call(this, e);
  }
};
A(["click", "dblclick", "contextmenu"], function(e) {
  be[e] = function(t) {
    t = he(this.dom, t), this.trigger(e, t);
  };
});
var vu = {
  pointermove: function(e) {
    fu(e) || vu.mousemove.call(this, e);
  },
  pointerup: function(e) {
    vu.mouseup.call(this, e);
  },
  mousemove: function(e) {
    this.trigger("mousemove", e);
  },
  mouseup: function(e) {
    var t = this.__pointerCapturing;
    this.__togglePointerCapture(!1), this.trigger("mouseup", e), t && (e.zrEventControl = "only_globalout", this.trigger("mouseout", e));
  }
};
function Jx(e, t) {
  var r = t.domHandlers;
  K.pointerEventsSupported ? A(Gs.pointer, function(i) {
    uo(t, i, function(n) {
      r[i].call(e, n);
    });
  }) : (K.touchEventsSupported && A(Gs.touch, function(i) {
    uo(t, i, function(n) {
      r[i].call(e, n), Zx(t);
    });
  }), A(Gs.mouse, function(i) {
    uo(t, i, function(n) {
      n = dc(n), t.touching || r[i].call(e, n);
    });
  }));
}
function jx(e, t) {
  K.pointerEventsSupported ? A(qh.pointer, r) : K.touchEventsSupported || A(qh.mouse, r);
  function r(i) {
    function n(a) {
      a = dc(a), hp(e, a.target) || (a = Qx(e, a), t.domHandlers[i].call(e, a));
    }
    uo(t, i, n, { capture: !0 });
  }
}
function uo(e, t, r, i) {
  e.mounted[t] = r, e.listenerOpts[t] = i, hx(e.domTarget, t, r, i);
}
function Xs(e) {
  var t = e.mounted;
  for (var r in t)
    t.hasOwnProperty(r) && fx(e.domTarget, r, t[r], e.listenerOpts[r]);
  e.mounted = {};
}
var Qh = /* @__PURE__ */ (function() {
  function e(t, r) {
    this.mounted = {}, this.listenerOpts = {}, this.touching = !1, this.domTarget = t, this.domHandlers = r;
  }
  return e;
})(), $x = (function(e) {
  Q(t, e);
  function t(r, i) {
    var n = e.call(this) || this;
    return n.__pointerCapturing = !1, n.dom = r, n.painterRoot = i, n._localHandlerScope = new Qh(r, be), Ws && (n._globalHandlerScope = new Qh(document, vu)), Jx(n, n._localHandlerScope), n;
  }
  return t.prototype.dispose = function() {
    Xs(this._localHandlerScope), Ws && Xs(this._globalHandlerScope);
  }, t.prototype.setCursor = function(r) {
    this.dom.style && (this.dom.style.cursor = r || "default");
  }, t.prototype.__togglePointerCapture = function(r) {
    if (this.__mayPointerCapture = null, Ws && +this.__pointerCapturing ^ +r) {
      this.__pointerCapturing = r;
      var i = this._globalHandlerScope;
      r ? jx(this, i) : Xs(i);
    }
  }, t;
})(Ke), fp = 1;
K.hasGlobalWindow && (fp = Math.max(window.devicePixelRatio || window.screen && window.screen.deviceXDPI / window.screen.logicalXDPI || 1, 1));
var Io = fp, du = 0.4, pu = "#333", gu = "#ccc", tT = "#eee", Kh = va, Jh = 5e-5;
function Fr(e) {
  return e > Jh || e < -Jh;
}
var Ur = [], Ci = [], qs = He(), Zs = Math.abs, da = (function() {
  function e() {
  }
  return e.prototype.getLocalTransform = function(t) {
    return eT(this, t);
  }, e.prototype.setPosition = function(t) {
    this.x = t[0], this.y = t[1];
  }, e.prototype.setScale = function(t) {
    this.scaleX = t[0], this.scaleY = t[1];
  }, e.prototype.setSkew = function(t) {
    this.skewX = t[0], this.skewY = t[1];
  }, e.prototype.setOrigin = function(t) {
    this.originX = t[0], this.originY = t[1];
  }, e.prototype.needLocalTransform = function() {
    return Fr(this.rotation) || Fr(this.x) || Fr(this.y) || Fr(this.scaleX - 1) || Fr(this.scaleY - 1) || Fr(this.skewX) || Fr(this.skewY);
  }, e.prototype.updateTransform = function() {
    var t = this.parent && this.parent.transform, r = this.needLocalTransform(), i = this.transform;
    if (!(r || t)) {
      i && (Kh(i), this.invTransform = null);
      return;
    }
    i = i || He(), r ? this.getLocalTransform(i) : Kh(i), t && (r ? Un(i, t, i) : pc(i, t)), this.transform = i, this._resolveGlobalScaleRatio(i), this.invTransform = this.invTransform || He(), as(this.invTransform, i);
  }, e.prototype._resolveGlobalScaleRatio = function(t) {
    var r = this.globalScaleRatio;
    if (r != null && r !== 1) {
      this.getGlobalScale(Ur);
      var i = Ur[0] < 0 ? -1 : 1, n = Ur[1] < 0 ? -1 : 1, a = ((Ur[0] - i) * r + i) / Ur[0] || 0, o = ((Ur[1] - n) * r + n) / Ur[1] || 0;
      t[0] *= a, t[1] *= a, t[2] *= o, t[3] *= o;
    }
  }, e.prototype.getComputedTransform = function() {
    for (var t = this, r = []; t; )
      r.push(t), t = t.parent;
    for (; t = r.pop(); )
      t.updateTransform();
    return this.transform;
  }, e.prototype.setLocalTransform = function(t) {
    if (t) {
      var r = t[0] * t[0] + t[1] * t[1], i = t[2] * t[2] + t[3] * t[3], n = Math.atan2(t[1], t[0]), a = Math.PI / 2 + n - Math.atan2(t[3], t[2]);
      i = Math.sqrt(i) * Math.cos(a), r = Math.sqrt(r), this.skewX = a, this.skewY = 0, this.rotation = -n, this.x = +t[4], this.y = +t[5], this.scaleX = r, this.scaleY = i, this.originX = 0, this.originY = 0;
    }
  }, e.prototype.decomposeTransform = function() {
    if (this.transform) {
      var t = this.parent, r = this.transform;
      t && t.transform && (t.invTransform = t.invTransform || He(), Un(Ci, t.invTransform, r), r = Ci);
      var i = this.originX, n = this.originY;
      (i || n) && (qs[4] = i, qs[5] = n, Un(Ci, r, qs), Ci[4] -= i, Ci[5] -= n, r = Ci), this.setLocalTransform(r);
    }
  }, e.prototype.getGlobalScale = function(t) {
    var r = this.transform;
    return t = t || [], r ? (t[0] = Math.sqrt(r[0] * r[0] + r[1] * r[1]), t[1] = Math.sqrt(r[2] * r[2] + r[3] * r[3]), r[0] < 0 && (t[0] = -t[0]), r[3] < 0 && (t[1] = -t[1]), t) : (t[0] = 1, t[1] = 1, t);
  }, e.prototype.transformCoordToLocal = function(t, r) {
    var i = [t, r], n = this.invTransform;
    return n && Ve(i, i, n), i;
  }, e.prototype.transformCoordToGlobal = function(t, r) {
    var i = [t, r], n = this.transform;
    return n && Ve(i, i, n), i;
  }, e.prototype.getLineScale = function() {
    var t = this.transform;
    return t && Zs(t[0] - 1) > 1e-10 && Zs(t[3] - 1) > 1e-10 ? Math.sqrt(Zs(t[0] * t[3] - t[2] * t[1])) : 1;
  }, e.prototype.copyTransform = function(t) {
    Eo(this, t);
  }, e.getLocalTransform = function(t, r) {
    r = r || [];
    var i = t.originX || 0, n = t.originY || 0, a = t.scaleX, o = t.scaleY, s = t.anchorX, l = t.anchorY, u = t.rotation || 0, c = t.x, h = t.y, v = t.skewX ? Math.tan(t.skewX) : 0, f = t.skewY ? Math.tan(-t.skewY) : 0;
    if (i || n || s || l) {
      var d = i + s, g = n + l;
      r[4] = -d * a - v * g * o, r[5] = -g * o - f * d * a;
    } else
      r[4] = r[5] = 0;
    return r[0] = a, r[3] = o, r[1] = f * a, r[2] = v * o, u && gc(r, r, u), r[4] += i + c, r[5] += n + h, r;
  }, e.initDefaultProps = (function() {
    var t = e.prototype;
    t.scaleX = t.scaleY = t.globalScaleRatio = 1, t.x = t.y = t.originX = t.originY = t.skewX = t.skewY = t.rotation = t.anchorX = t.anchorY = 0;
  })(), e;
})(), eT = da.getLocalTransform, os = [
  "x",
  "y",
  "originX",
  "originY",
  "anchorX",
  "anchorY",
  "rotation",
  "scaleX",
  "scaleY",
  "skewX",
  "skewY"
];
function Eo(e, t) {
  return FS(e, t, os);
}
function We(e) {
  Ma || (Ma = new en(100)), e = e || Dr;
  var t = Ma.get(e);
  return t || (t = {
    font: e,
    strWidthCache: new en(500),
    asciiWidthMap: null,
    asciiWidthMapTried: !1,
    stWideCharWidth: ne.measureText("国", e).width,
    asciiCharWidth: ne.measureText("a", e).width
  }, Ma.put(e, t)), t;
}
var Ma;
function rT(e) {
  if (!(Qs >= jh)) {
    e = e || Dr;
    for (var t = [], r = +/* @__PURE__ */ new Date(), i = 0; i <= 127; i++)
      t[i] = ne.measureText(String.fromCharCode(i), e).width;
    var n = +/* @__PURE__ */ new Date() - r;
    return n > 16 ? Qs = jh : n > 2 && Qs++, t;
  }
}
var Qs = 0, jh = 5;
function vp(e, t) {
  return e.asciiWidthMapTried || (e.asciiWidthMap = rT(e.font), e.asciiWidthMapTried = !0), 0 <= t && t <= 127 ? e.asciiWidthMap != null ? e.asciiWidthMap[t] : e.asciiCharWidth : e.stWideCharWidth;
}
function Ge(e, t) {
  var r = e.strWidthCache, i = r.get(t);
  return i == null && (i = ne.measureText(t, e.font).width, r.put(t, i)), i;
}
function $h(e, t, r, i) {
  var n = Ge(We(t), e), a = ss(t), o = rn(0, n, r), s = vi(0, a, i), l = new Y(o, s, n, a);
  return l;
}
function iT(e, t, r, i) {
  var n = ((e || "") + "").split(`
`), a = n.length;
  if (a === 1)
    return $h(n[0], t, r, i);
  for (var o = new Y(0, 0, 0, 0), s = 0; s < n.length; s++) {
    var l = $h(n[s], t, r, i);
    s === 0 ? o.copy(l) : o.union(l);
  }
  return o;
}
function rn(e, t, r, i) {
  return r === "right" ? i ? e += t : e -= t : r === "center" && (i ? e += t / 2 : e -= t / 2), e;
}
function vi(e, t, r, i) {
  return r === "middle" ? i ? e += t / 2 : e -= t / 2 : r === "bottom" && (i ? e += t : e -= t), e;
}
function ss(e) {
  return We(e).stWideCharWidth;
}
function nn(e, t) {
  return typeof e == "string" ? e.lastIndexOf("%") >= 0 ? parseFloat(e) / 100 * t : parseFloat(e) : e;
}
function dp(e, t, r) {
  var i = t.position || "inside", n = t.distance != null ? t.distance : 5, a = r.height, o = r.width, s = a / 2, l = r.x, u = r.y, c = "left", h = "top";
  if (i instanceof Array)
    l += nn(i[0], r.width), u += nn(i[1], r.height), c = null, h = null;
  else
    switch (i) {
      case "left":
        l -= n, u += s, c = "right", h = "middle";
        break;
      case "right":
        l += n + o, u += s, h = "middle";
        break;
      case "top":
        l += o / 2, u -= n, c = "center", h = "bottom";
        break;
      case "bottom":
        l += o / 2, u += a + n, c = "center";
        break;
      case "inside":
        l += o / 2, u += s, c = "center", h = "middle";
        break;
      case "insideLeft":
        l += n, u += s, h = "middle";
        break;
      case "insideRight":
        l += o - n, u += s, c = "right", h = "middle";
        break;
      case "insideTop":
        l += o / 2, u += n, c = "center";
        break;
      case "insideBottom":
        l += o / 2, u += a - n, c = "center", h = "bottom";
        break;
      case "insideTopLeft":
        l += n, u += n;
        break;
      case "insideTopRight":
        l += o - n, u += n, c = "right";
        break;
      case "insideBottomLeft":
        l += n, u += a - n, h = "bottom";
        break;
      case "insideBottomRight":
        l += o - n, u += a - n, c = "right", h = "bottom";
        break;
    }
  return e = e || {}, e.x = l, e.y = u, e.align = c, e.verticalAlign = h, e;
}
var Ks = "__zr_normal__", Js = os.concat(["ignore"]), nT = kr(os, function(e, t) {
  return e[t] = !0, e;
}, { ignore: !1 }), Ai = {}, aT = new Y(0, 0, 0, 0), Da = [], co = 0, ls = 1, us = (function() {
  function e(t) {
    this.id = Yd(), this.animators = [], this.currentStates = [], this.states = {}, this._init(t);
  }
  return e.prototype._init = function(t) {
    this.attr(t);
  }, e.prototype.drift = function(t, r, i) {
    switch (this.draggable) {
      case "horizontal":
        r = 0;
        break;
      case "vertical":
        t = 0;
        break;
    }
    var n = this.transform;
    n || (n = this.transform = [1, 0, 0, 1, 0, 0]), n[4] += t, n[5] += r, this.decomposeTransform(), this.markRedraw();
  }, e.prototype.beforeUpdate = function() {
  }, e.prototype.afterUpdate = function() {
  }, e.prototype.update = function() {
    this.updateTransform(), this.__dirty && this.updateInnerText();
  }, e.prototype.updateInnerText = function(t) {
    var r = this._textContent;
    if (r && (!r.ignore || t)) {
      this.textConfig || (this.textConfig = {});
      var i = this.textConfig, n = i.local, a = r.innerTransformable, o = void 0, s = void 0, l = !1;
      a.parent = n ? this : null;
      var u = !1;
      a.copyTransform(r);
      var c = i.position != null, h = i.autoOverflowArea, v = void 0;
      if ((h || c) && (v = aT, i.layoutRect ? v.copy(i.layoutRect) : v.copy(this.getBoundingRect()), n || v.applyTransform(this.transform)), c) {
        this.calculateTextPosition ? this.calculateTextPosition(Ai, i, v) : dp(Ai, i, v), a.x = Ai.x, a.y = Ai.y, o = Ai.align, s = Ai.verticalAlign;
        var f = i.origin;
        if (f && i.rotation != null) {
          var d = void 0, g = void 0;
          f === "center" ? (d = v.width * 0.5, g = v.height * 0.5) : (d = nn(f[0], v.width), g = nn(f[1], v.height)), u = !0, a.originX = -a.x + d + (n ? 0 : v.x), a.originY = -a.y + g + (n ? 0 : v.y);
        }
      }
      i.rotation != null && (a.rotation = i.rotation);
      var p = i.offset;
      p && (a.x += p[0], a.y += p[1], u || (a.originX = -p[0], a.originY = -p[1]));
      var m = this._innerTextDefaultStyle || (this._innerTextDefaultStyle = {});
      if (h) {
        var y = m.overflowRect = m.overflowRect || new Y(0, 0, 0, 0);
        a.getLocalTransform(Da), as(Da, Da), Y.copy(y, v), y.applyTransform(Da);
      } else
        m.overflowRect = null;
      var _ = i.inside == null ? typeof i.position == "string" && i.position.indexOf("inside") >= 0 : i.inside, w = void 0, b = void 0, S = void 0;
      _ && this.canBeInsideText() ? (w = i.insideFill, b = i.insideStroke, (w == null || w === "auto") && (w = this.getInsideTextFill()), (b == null || b === "auto") && (b = this.getInsideTextStroke(w), S = !0)) : (w = i.outsideFill, b = i.outsideStroke, (w == null || w === "auto") && (w = this.getOutsideFill()), (b == null || b === "auto") && (b = this.getOutsideStroke(w), S = !0)), w = w || "#000", (w !== m.fill || b !== m.stroke || S !== m.autoStroke || o !== m.align || s !== m.verticalAlign) && (l = !0, m.fill = w, m.stroke = b, m.autoStroke = S, m.align = o, m.verticalAlign = s, r.setDefaultTextStyle(m)), r.__dirty |= jt, l && r.dirtyStyle(!0);
    }
  }, e.prototype.canBeInsideText = function() {
    return !0;
  }, e.prototype.getInsideTextFill = function() {
    return "#fff";
  }, e.prototype.getInsideTextStroke = function(t) {
    return "#000";
  }, e.prototype.getOutsideFill = function() {
    return this.__zr && this.__zr.isDarkMode() ? gu : pu;
  }, e.prototype.getOutsideStroke = function(t) {
    var r = this.__zr && this.__zr.getBackgroundColor(), i = typeof r == "string" && fi(r);
    i || (i = [255, 255, 255, 1]);
    for (var n = i[3], a = this.__zr.isDarkMode(), o = 0; o < 3; o++)
      i[o] = i[o] * n + (a ? 0 : 255) * (1 - n);
    return i[3] = 1, mc(i, "rgba");
  }, e.prototype.traverse = function(t, r) {
  }, e.prototype.attrKV = function(t, r) {
    t === "textConfig" ? this.setTextConfig(r) : t === "textContent" ? this.setTextContent(r) : t === "clipPath" ? this.setClipPath(r) : t === "extra" ? (this.extra = this.extra || {}, P(this.extra, r)) : this[t] = r;
  }, e.prototype.hide = function() {
    this.ignore = !0, this.markRedraw();
  }, e.prototype.show = function() {
    this.ignore = !1, this.markRedraw();
  }, e.prototype.attr = function(t, r) {
    if (typeof t == "string")
      this.attrKV(t, r);
    else if (H(t))
      for (var i = t, n = yt(i), a = 0; a < n.length; a++) {
        var o = n[a];
        this.attrKV(o, t[o]);
      }
    return this.markRedraw(), this;
  }, e.prototype.saveCurrentToNormalState = function(t) {
    this._innerSaveToNormal(t);
    for (var r = this._normalState, i = 0; i < this.animators.length; i++) {
      var n = this.animators[i], a = n.__fromStateTransition;
      if (!(n.getLoop() || a && a !== Ks)) {
        var o = n.targetName, s = o ? r[o] : r;
        n.saveTo(s);
      }
    }
  }, e.prototype._innerSaveToNormal = function(t) {
    var r = this._normalState;
    r || (r = this._normalState = {}), t.textConfig && !r.textConfig && (r.textConfig = this.textConfig), this._savePrimaryToNormal(t, r, Js);
  }, e.prototype._savePrimaryToNormal = function(t, r, i) {
    for (var n = 0; n < i.length; n++) {
      var a = i[n];
      t[a] != null && !(a in r) && (r[a] = this[a]);
    }
  }, e.prototype.hasState = function() {
    return this.currentStates.length > 0;
  }, e.prototype.getState = function(t) {
    return this.states[t];
  }, e.prototype.ensureState = function(t) {
    var r = this.states;
    return r[t] || (r[t] = {}), r[t];
  }, e.prototype.clearStates = function(t) {
    this.useState(Ks, !1, t);
  }, e.prototype.useState = function(t, r, i, n) {
    var a = t === Ks, o = this.hasState();
    if (!(!o && a)) {
      var s = this.currentStates, l = this.stateTransition;
      if (!(dt(s, t) >= 0 && (r || s.length === 1))) {
        var u;
        if (this.stateProxy && !a && (u = this.stateProxy(t)), u || (u = this.states && this.states[t]), !u && !a) {
          hc("State " + t + " not exists.");
          return;
        }
        a || this.saveCurrentToNormalState(u);
        var c = this._textContent, h = tf(this, c, u, n);
        h && !this.__inHover && (this.__inHover = h), this._applyStateObj(t, u, this._normalState, r, rf(this, i, l), l);
        var v = this._textGuide;
        return c && c.useState(t, r, i, !!h), v && v.useState(t, r, i, !!h), a ? (this.currentStates = [], this._normalState = {}) : r ? this.currentStates.push(t) : this.currentStates = [t], this._updateAnimationTargets(), this.markRedraw(), !h && this.__inHover && (this.__inHover = co, this.__dirty &= ~jt), u;
      }
    }
  }, e.prototype.useStates = function(t, r, i) {
    if (!t.length)
      this.clearStates();
    else {
      var n = [], a = this.currentStates, o = t.length, s = o === a.length;
      if (s) {
        for (var l = 0; l < o; l++)
          if (t[l] !== a[l]) {
            s = !1;
            break;
          }
      }
      if (s)
        return;
      for (var l = 0; l < o; l++) {
        var u = t[l], c = void 0;
        this.stateProxy && (c = this.stateProxy(u, t)), c || (c = this.states[u]), c && n.push(c);
      }
      var h = n[o - 1], v = this._textContent, f = tf(this, v, h, i);
      f && !this.__inHover && (this.__inHover = f);
      var d = this._mergeStates(n), g = this.stateTransition;
      this.saveCurrentToNormalState(d), this._applyStateObj(t.join(","), d, this._normalState, !1, rf(this, r, g), g);
      var p = this._textGuide;
      v && v.useStates(t, r, !!f), p && p.useStates(t, r, !!f), this._updateAnimationTargets(), this.currentStates = t.slice(), this.markRedraw(), !f && this.__inHover && (this.__inHover = co, this.__dirty &= ~jt);
    }
  }, e.prototype.isSilent = function() {
    for (var t = this; t; ) {
      if (t.silent)
        return !0;
      var r = t.__hostTarget;
      t = r ? t.ignoreHostSilent ? null : r : t.parent;
    }
    return !1;
  }, e.prototype._updateAnimationTargets = function() {
    for (var t = 0; t < this.animators.length; t++) {
      var r = this.animators[t];
      r.targetName && r.changeTarget(this[r.targetName]);
    }
  }, e.prototype.removeState = function(t) {
    var r = dt(this.currentStates, t);
    if (r >= 0) {
      var i = this.currentStates.slice();
      i.splice(r, 1), this.useStates(i);
    }
  }, e.prototype.replaceState = function(t, r, i) {
    var n = this.currentStates.slice(), a = dt(n, t), o = dt(n, r) >= 0;
    a >= 0 ? o ? n.splice(a, 1) : n[a] = r : i && !o && n.push(r), this.useStates(n);
  }, e.prototype.toggleState = function(t, r) {
    r ? this.useState(t, !0) : this.removeState(t);
  }, e.prototype._mergeStates = function(t) {
    for (var r = {}, i, n = 0; n < t.length; n++) {
      var a = t[n];
      P(r, a), a.textConfig && (i = i || {}, P(i, a.textConfig));
    }
    return i && (r.textConfig = i), r;
  }, e.prototype._applyStateObj = function(t, r, i, n, a, o) {
    if (this.__inHover !== ls) {
      var s = !(r && n);
      r && r.textConfig ? (this.textConfig = P({}, n ? this.textConfig : i.textConfig), P(this.textConfig, r.textConfig)) : s && i.textConfig && (this.textConfig = i.textConfig);
      for (var l = {}, u = !1, c = 0; c < Js.length; c++) {
        var h = Js[c], v = a && nT[h];
        r && r[h] != null ? v ? (u = !0, l[h] = r[h]) : this[h] = r[h] : s && i[h] != null && (v ? (u = !0, l[h] = i[h]) : this[h] = i[h]);
      }
      if (!a)
        for (var c = 0; c < this.animators.length; c++) {
          var f = this.animators[c], d = f.targetName;
          f.getLoop() || f.__changeFinalValue(d ? (r || i)[d] : r || i);
        }
      u && this._transitionState(t, l, o);
    }
  }, e.prototype._attachComponent = function(t) {
    if (!(t.__zr && !t.__hostTarget) && t !== this) {
      var r = this.__zr;
      r && t.addSelfToZr(r), t.__zr = r, t.__hostTarget = this;
    }
  }, e.prototype._detachComponent = function(t) {
    t.__zr && t.removeSelfFromZr(t.__zr), t.__zr = null, t.__hostTarget = null;
  }, e.prototype.getClipPath = function() {
    return this._clipPath;
  }, e.prototype.setClipPath = function(t) {
    this._clipPath && this._clipPath !== t && this.removeClipPath(), this._attachComponent(t), this._clipPath = t, this.markRedraw();
  }, e.prototype.removeClipPath = function() {
    var t = this._clipPath;
    t && (this._detachComponent(t), this._clipPath = null, this.markRedraw());
  }, e.prototype.getTextContent = function() {
    return this._textContent;
  }, e.prototype.setTextContent = function(t) {
    var r = this._textContent;
    r !== t && (r && r !== t && this.removeTextContent(), t.innerTransformable = new da(), this._attachComponent(t), this._textContent = t, this.markRedraw());
  }, e.prototype.setTextConfig = function(t) {
    this.textConfig || (this.textConfig = {}), P(this.textConfig, t), this.markRedraw();
  }, e.prototype.removeTextConfig = function() {
    this.textConfig = null, this.markRedraw();
  }, e.prototype.removeTextContent = function() {
    var t = this._textContent;
    t && (t.innerTransformable = null, this._detachComponent(t), this._textContent = null, this._innerTextDefaultStyle = null, this.markRedraw());
  }, e.prototype.getTextGuideLine = function() {
    return this._textGuide;
  }, e.prototype.setTextGuideLine = function(t) {
    this._textGuide && this._textGuide !== t && this.removeTextGuideLine(), this._attachComponent(t), this._textGuide = t, this.markRedraw();
  }, e.prototype.removeTextGuideLine = function() {
    var t = this._textGuide;
    t && (this._detachComponent(t), this._textGuide = null, this.markRedraw());
  }, e.prototype.markRedraw = function() {
    this.__dirty |= jt;
    var t = this.__zr;
    t && (this.__inHover ? t.refreshHover() : t.refresh()), this.__hostTarget && this.__hostTarget.markRedraw();
  }, e.prototype.dirty = function() {
    this.markRedraw();
  }, e.prototype.addSelfToZr = function(t) {
    if (this.__zr !== t) {
      this.__zr = t;
      var r = this.animators;
      if (r)
        for (var i = 0; i < r.length; i++)
          t.animation.addAnimator(r[i]);
      this._clipPath && this._clipPath.addSelfToZr(t), this._textContent && this._textContent.addSelfToZr(t), this._textGuide && this._textGuide.addSelfToZr(t);
    }
  }, e.prototype.removeSelfFromZr = function(t) {
    if (this.__zr) {
      this.__zr = null;
      var r = this.animators;
      if (r)
        for (var i = 0; i < r.length; i++)
          t.animation.removeAnimator(r[i]);
      this._clipPath && this._clipPath.removeSelfFromZr(t), this._textContent && this._textContent.removeSelfFromZr(t), this._textGuide && this._textGuide.removeSelfFromZr(t);
    }
  }, e.prototype.animate = function(t, r, i) {
    var n = t ? this[t] : this, a = new yc(n, r, i);
    return t && (a.targetName = t), this.addAnimator(a, t), a;
  }, e.prototype.addAnimator = function(t, r) {
    var i = this.__zr, n = this;
    t.during(function() {
      n.updateDuringAnimation(r);
    }).done(function() {
      var a = n.animators, o = dt(a, t);
      o >= 0 && a.splice(o, 1);
    }), this.animators.push(t), i && i.animation.addAnimator(t), i && i.wakeUp();
  }, e.prototype.updateDuringAnimation = function(t) {
    this.markRedraw();
  }, e.prototype.stopAnimation = function(t, r) {
    for (var i = this.animators, n = i.length, a = [], o = 0; o < n; o++) {
      var s = i[o];
      !t || t === s.scope ? s.stop(r) : a.push(s);
    }
    return this.animators = a, this;
  }, e.prototype.animateTo = function(t, r, i) {
    js(this, t, r, i);
  }, e.prototype.animateFrom = function(t, r, i) {
    js(this, t, r, i, !0);
  }, e.prototype._transitionState = function(t, r, i, n) {
    for (var a = js(this, r, i, n), o = 0; o < a.length; o++)
      a[o].__fromStateTransition = t;
  }, e.prototype.getBoundingRect = function() {
    return null;
  }, e.prototype.getPaintRect = function() {
    return null;
  }, e.initDefaultProps = (function() {
    var t = e.prototype;
    t.type = "element", t.name = "", t.ignore = t.silent = t.ignoreHostSilent = t.isGroup = t.draggable = t.dragging = t.ignoreClip = !1, t.__inHover = co, t.__dirty = jt;
    function r(i, n, a, o) {
      Object.defineProperty(t, i, {
        get: function() {
          if (!this[n]) {
            var l = this[n] = [];
            s(this, l);
          }
          return this[n];
        },
        set: function(l) {
          this[a] = l[0], this[o] = l[1], this[n] = l, s(this, l);
        }
      });
      function s(l, u) {
        Object.defineProperty(u, 0, {
          get: function() {
            return l[a];
          },
          set: function(c) {
            l[a] = c;
          }
        }), Object.defineProperty(u, 1, {
          get: function() {
            return l[o];
          },
          set: function(c) {
            l[o] = c;
          }
        });
      }
    }
    Object.defineProperty && (r("position", "_legacyPos", "x", "y"), r("scale", "_legacyScale", "scaleX", "scaleY"), r("origin", "_legacyOrigin", "originX", "originY"));
  })(), e;
})();
lr(us, Ke);
lr(us, da);
function js(e, t, r, i, n) {
  r = r || {};
  var a = [];
  pp(e, "", e, t, r, i, a, n);
  var o = a.length, s = !1, l = r.done, u = r.aborted, c = function() {
    s = !0, o--, o <= 0 && (s ? l && l() : u && u());
  }, h = function() {
    o--, o <= 0 && (s ? l && l() : u && u());
  };
  o || l && l(), a.length > 0 && r.during && a[0].during(function(d, g) {
    r.during(g);
  });
  for (var v = 0; v < a.length; v++) {
    var f = a[v];
    c && f.done(c), h && f.aborted(h), r.force && f.duration(r.duration), f.start(r.easing);
  }
  return a;
}
function $s(e, t, r) {
  for (var i = 0; i < r; i++)
    e[i] = t[i];
}
function oT(e) {
  return te(e[0]);
}
function sT(e, t, r) {
  if (te(t[r]))
    if (te(e[r]) || (e[r] = []), ee(t[r])) {
      var i = t[r].length;
      e[r].length !== i && (e[r] = new t[r].constructor(i), $s(e[r], t[r], i));
    } else {
      var n = t[r], a = e[r], o = n.length;
      if (oT(n))
        for (var s = n[0].length, l = 0; l < o; l++)
          a[l] ? $s(a[l], n[l], s) : a[l] = Array.prototype.slice.call(n[l]);
      else
        $s(a, n, o);
      a.length = n.length;
    }
  else
    e[r] = t[r];
}
function lT(e, t) {
  return e === t || te(e) && te(t) && uT(e, t);
}
function uT(e, t) {
  var r = e.length;
  if (r !== t.length)
    return !1;
  for (var i = 0; i < r; i++)
    if (e[i] !== t[i])
      return !1;
  return !0;
}
function pp(e, t, r, i, n, a, o, s) {
  for (var l = yt(i), u = n.duration, c = n.delay, h = n.additive, v = n.setToFinal, f = !H(a), d = e.animators, g = [], p = 0; p < l.length; p++) {
    var m = l[p], y = i[m];
    if (y != null && r[m] != null && (f || a[m]))
      if (H(y) && !te(y) && !is(y)) {
        if (t) {
          s || (r[m] = y, e.updateDuringAnimation(t));
          continue;
        }
        pp(e, m, r[m], y, n, a && a[m], o, s);
      } else
        g.push(m);
    else s || (r[m] = y, e.updateDuringAnimation(t), g.push(m));
  }
  var _ = g.length;
  if (!h && _)
    for (var w = 0; w < d.length; w++) {
      var b = d[w];
      if (b.targetName === t) {
        var S = b.stopTracks(g);
        if (S) {
          var T = dt(d, b);
          d.splice(T, 1);
        }
      }
    }
  if (n.force || (g = de(g, function(D) {
    return !lT(i[D], r[D]);
  }), _ = g.length), _ > 0 || n.force && !o.length) {
    var C = void 0, x = void 0, M = void 0;
    if (s) {
      x = {}, v && (C = {});
      for (var w = 0; w < _; w++) {
        var m = g[w];
        x[m] = r[m], v ? C[m] = i[m] : r[m] = i[m];
      }
    } else if (v) {
      M = {};
      for (var w = 0; w < _; w++) {
        var m = g[w];
        M[m] = oo(r[m]), sT(r, i, m);
      }
    }
    var b = new yc(r, !1, !1, h ? de(d, function(I) {
      return I.targetName === t;
    }) : null);
    b.targetName = t, n.scope && (b.scope = n.scope), v && C && b.whenWithKeys(0, C, g), M && b.whenWithKeys(0, M, g), b.whenWithKeys(u ?? 500, s ? x : i, g).delay(c || 0), e.addAnimator(b, t), o.push(b);
  }
}
function tf(e, t, r, i) {
  return !(r && r.hoverLayer || i) || ef(e) || t && ef(t) ? co : ls;
}
function ef(e) {
  return e.type === "text" || e.type === "tspan";
}
function rf(e, t, r) {
  return !t && !e.__inHover && r && r.duration > 0;
}
var qe = (function(e) {
  Q(t, e);
  function t(r) {
    var i = e.call(this) || this;
    return i.isGroup = !0, i._children = [], i.attr(r), i;
  }
  return t.prototype.childrenRef = function() {
    return this._children;
  }, t.prototype.children = function() {
    return this._children.slice();
  }, t.prototype.childAt = function(r) {
    return this._children[r];
  }, t.prototype.childOfName = function(r) {
    for (var i = this._children, n = 0; n < i.length; n++)
      if (i[n].name === r)
        return i[n];
  }, t.prototype.childCount = function() {
    return this._children.length;
  }, t.prototype.add = function(r) {
    return r && r !== this && r.parent !== this && (this._children.push(r), this._doAdd(r)), this;
  }, t.prototype.addBefore = function(r, i) {
    if (r && r !== this && r.parent !== this && i && i.parent === this) {
      var n = this._children, a = n.indexOf(i);
      a >= 0 && (n.splice(a, 0, r), this._doAdd(r));
    }
    return this;
  }, t.prototype.replace = function(r, i) {
    var n = dt(this._children, r);
    return n >= 0 && this.replaceAt(i, n), this;
  }, t.prototype.replaceAt = function(r, i) {
    var n = this._children, a = n[i];
    if (r && r !== this && r.parent !== this && r !== a) {
      n[i] = r, a.parent = null;
      var o = this.__zr;
      o && a.removeSelfFromZr(o), this._doAdd(r);
    }
    return this;
  }, t.prototype._doAdd = function(r) {
    r.parent && r.parent.remove(r), r.parent = this;
    var i = this.__zr;
    i && i !== r.__zr && r.addSelfToZr(i), i && i.refresh();
  }, t.prototype.remove = function(r) {
    var i = this.__zr, n = this._children, a = dt(n, r);
    return a < 0 ? this : (n.splice(a, 1), r.parent = null, i && r.removeSelfFromZr(i), i && i.refresh(), this);
  }, t.prototype.removeAll = function() {
    for (var r = this._children, i = this.__zr, n = 0; n < r.length; n++) {
      var a = r[n];
      i && a.removeSelfFromZr(i), a.parent = null;
    }
    return r.length = 0, this;
  }, t.prototype.eachChild = function(r, i) {
    for (var n = this._children, a = 0; a < n.length; a++) {
      var o = n[a];
      r.call(i, o, a);
    }
    return this;
  }, t.prototype.traverse = function(r, i) {
    for (var n = 0; n < this._children.length; n++) {
      var a = this._children[n], o = r.call(i, a);
      a.isGroup && !o && a.traverse(r, i);
    }
    return this;
  }, t.prototype.addSelfToZr = function(r) {
    e.prototype.addSelfToZr.call(this, r);
    for (var i = 0; i < this._children.length; i++) {
      var n = this._children[i];
      n.addSelfToZr(r);
    }
  }, t.prototype.removeSelfFromZr = function(r) {
    e.prototype.removeSelfFromZr.call(this, r);
    for (var i = 0; i < this._children.length; i++) {
      var n = this._children[i];
      n.removeSelfFromZr(r);
    }
  }, t.prototype.getBoundingRect = function(r) {
    for (var i = new Y(0, 0, 0, 0), n = r || this._children, a = [], o = null, s = 0; s < n.length; s++) {
      var l = n[s];
      if (!(l.ignore || l.invisible)) {
        var u = l.getBoundingRect(), c = l.getLocalTransform(a);
        c ? (Y.applyTransform(i, u, c), o = o || i.clone(), o.union(i)) : (o = o || u.clone(), o.union(u));
      }
    }
    return o || i;
  }, t;
})(us);
qe.prototype.type = "group";
var ho = {}, gp = {};
function cT(e) {
  delete gp[e];
}
function hT(e) {
  if (!e)
    return !1;
  if (typeof e == "string")
    return Lo(e, 1) < du;
  if (e.colorStops) {
    for (var t = e.colorStops, r = 0, i = t.length, n = 0; n < i; n++)
      r += Lo(t[n].color, 1);
    return r /= i, r < du;
  }
  return !1;
}
var fT = (function() {
  function e(t, r, i) {
    var n = this;
    this._sleepAfterStill = 10, this._stillFrameAccum = 0, this._needsRefresh = !0, this._needsRefreshHover = !1, this._darkMode = !1, i = i || {}, this.dom = r, this.id = t;
    var a = new kx(), o = i.renderer || "canvas";
    ho[o] || (o = yt(ho)[0]), i.useDirtyRect = i.useDirtyRect == null ? !1 : i.useDirtyRect;
    var s = new ho[o](r, a, i, t), l = i.ssr || s.ssrOnly;
    this.storage = a, this.painter = s;
    var u = !K.node && !K.worker && !l ? new $x(s.getViewportRoot(), s.root) : null, c = i.useCoarsePointer, h = c == null || c === "auto" ? K.touchEventsSupported : !!c, v = 44, f;
    h && (f = W(i.pointerSize, v)), this.handler = new $d(a, s, u, s.root, f), this.animation = new Xx({
      stage: {
        update: l ? null : function() {
          return n._flush(!1);
        }
      }
    }), l || this.animation.start();
  }
  return e.prototype.add = function(t) {
    this._disposed || !t || (this.storage.addRoot(t), t.addSelfToZr(this), this.refresh());
  }, e.prototype.remove = function(t) {
    this._disposed || !t || (this.storage.delRoot(t), t.removeSelfFromZr(this), this.refresh());
  }, e.prototype.configLayer = function(t, r) {
    this._disposed || (this.painter.configLayer && this.painter.configLayer(t, r), this.refresh());
  }, e.prototype.setBackgroundColor = function(t) {
    this._disposed || (this.painter.setBackgroundColor && this.painter.setBackgroundColor(t), this.refresh(), this._backgroundColor = t, this._darkMode = hT(t));
  }, e.prototype.getBackgroundColor = function() {
    return this._backgroundColor;
  }, e.prototype.setDarkMode = function(t) {
    this._darkMode = t;
  }, e.prototype.isDarkMode = function() {
    return this._darkMode;
  }, e.prototype.refreshImmediately = function(t) {
    this._disposed || this._refresh({
      animUpdate: !t,
      refresh: !0,
      refreshHover: !1
    });
  }, e.prototype._refresh = function(t) {
    t.animUpdate && this.animation.update(!0), this._needsRefresh = this._needsRefreshHover = !1, this.painter.refresh({
      refresh: t.refresh,
      refreshHover: t.refreshHover
    }), this._needsRefresh = this._needsRefreshHover = !1;
  }, e.prototype.refresh = function() {
    this._disposed || (this._needsRefresh = !0, this.animation.start());
  }, e.prototype.flush = function() {
    this._disposed || this._flush(!0);
  }, e.prototype._flush = function(t) {
    var r, i = Gi(), n = this._needsRefresh, a = this._needsRefreshHover;
    (n || a) && (r = !0, this._refresh({
      animUpdate: t,
      refresh: n,
      refreshHover: a
    }));
    var o = Gi();
    r ? (this._stillFrameAccum = 0, this.trigger("rendered", {
      elapsedTime: o - i
    })) : this._sleepAfterStill > 0 && (this._stillFrameAccum++, this._stillFrameAccum > this._sleepAfterStill && this.animation.stop());
  }, e.prototype.setSleepAfterStill = function(t) {
    this._sleepAfterStill = t;
  }, e.prototype.wakeUp = function() {
    this._disposed || (this.animation.start(), this._stillFrameAccum = 0);
  }, e.prototype.refreshHover = function() {
    this._needsRefreshHover = !0;
  }, e.prototype.refreshHoverImmediately = function() {
    this._disposed || this._refresh({
      animUpdate: !1,
      refresh: !1,
      refreshHover: !0
    });
  }, e.prototype.resize = function(t) {
    this._disposed || (t = t || {}, this.painter.resize(t.width, t.height), this.handler.resize());
  }, e.prototype.clearAnimation = function() {
    this._disposed || this.animation.clear();
  }, e.prototype.getWidth = function() {
    if (!this._disposed)
      return this.painter.getWidth();
  }, e.prototype.getHeight = function() {
    if (!this._disposed)
      return this.painter.getHeight();
  }, e.prototype.setCursorStyle = function(t) {
    this._disposed || this.handler.setCursorStyle(t);
  }, e.prototype.findHover = function(t, r) {
    if (!this._disposed)
      return this.handler.findHover(t, r);
  }, e.prototype.on = function(t, r, i) {
    return this._disposed || this.handler.on(t, r, i), this;
  }, e.prototype.off = function(t, r) {
    this._disposed || this.handler.off(t, r);
  }, e.prototype.trigger = function(t, r) {
    this._disposed || this.handler.trigger(t, r);
  }, e.prototype.clear = function() {
    if (!this._disposed) {
      for (var t = this.storage.getRoots(), r = 0; r < t.length; r++)
        t[r] instanceof qe && t[r].removeSelfFromZr(this);
      this.storage.delAllRoots(), this.painter.clear();
    }
  }, e.prototype.dispose = function() {
    this._disposed || (this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), this.handler.dispose(), this.animation = this.storage = this.painter = this.handler = null, this._disposed = !0, cT(this.id));
  }, e;
})();
function nf(e, t) {
  var r = new fT(Yd(), e, t);
  return gp[r.id] = r, r;
}
function vT(e, t) {
  ho[e] = t;
}
var af = 1e-4, mp = 20;
function dT(e) {
  return e.replace(/^\s+|\s+$/g, "");
}
var ar = Math.min, It = Math.max, Ne = Math.abs, _c = Math.round, pT = Math.floor, gT = Math.pow, mT = Math.PI, yT = Math.random;
function _T(e, t, r, i) {
  var n = t[0], a = t[1], o = r[0], s = r[1], l = a - n, u = s - o;
  if (l === 0)
    return u === 0 ? o : (o + s) / 2;
  {
    if (e === n)
      return o;
    if (e === a)
      return s;
  }
  return (e - n) / l * u + o;
}
var Ct = wT;
function wT(e, t, r) {
  switch (e) {
    case "center":
    case "middle":
      e = "50%";
      break;
    case "left":
    case "top":
      e = "0%";
      break;
    case "right":
    case "bottom":
      e = "100%";
      break;
  }
  return bT(e, t, r);
}
function bT(e, t, r) {
  return X(e) ? ST(e) ? parseFloat(e) / 100 * t + (r || 0) : parseFloat(e) : e == null ? NaN : +e;
}
function ST(e) {
  return !!dT(e).match(/%$/);
}
function xT(e, t, r) {
  return isNaN(t) ? r ? "" + e : +e : (t = ar(It(0, t), mp), e = (+e).toFixed(t), r ? e : +e);
}
function TT(e) {
  return e.sort(function(t, r) {
    return t - r;
  }), e;
}
function of(e) {
  if (e = +e, isNaN(e))
    return 0;
  if (e > 1e-14) {
    for (var t = 1, r = 0; r < 15; r++, t *= 10)
      if (_c(e * t) / t === e)
        return r;
  }
  return CT(e);
}
function CT(e) {
  var t = e.toString().toLowerCase(), r = t.indexOf("e"), i = r > 0 ? +t.slice(r + 1) : 0, n = r > 0 ? r : t.length, a = t.indexOf("."), o = a < 0 ? 0 : n - 1 - a;
  return It(0, o - i);
}
function AT(e, t) {
  var r = kr(e, function(f, d) {
    return f + (isNaN(d) ? 0 : d);
  }, 0);
  if (r === 0)
    return [];
  for (var i = gT(10, t), n = it(e, function(f) {
    return (isNaN(f) ? 0 : f) / r * i * 100;
  }), a = i * 100, o = it(n, function(f) {
    return pT(f);
  }), s = kr(o, function(f, d) {
    return f + d;
  }, 0), l = it(n, function(f, d) {
    return f - o[d];
  }); s < a; ) {
    for (var u = Number.NEGATIVE_INFINITY, c = null, h = 0, v = l.length; h < v; ++h)
      l[h] > u && (u = l[h], c = h);
    ++o[c], l[c] = 0, ++s;
  }
  return it(o, function(f) {
    return f / i;
  });
}
function MT(e, t) {
  var r = It(of(e), of(t)), i = e + t;
  return r > mp ? i : xT(i, r);
}
function yp(e) {
  var t = mT * 2;
  return (e % t + t) % t;
}
function Po(e) {
  return e > -af && e < af;
}
var DT = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d{1,2})(?::(\d{1,2})(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/;
function cs(e) {
  if (e instanceof Date)
    return e;
  if (X(e)) {
    var t = DT.exec(e);
    if (!t)
      return /* @__PURE__ */ new Date(NaN);
    if (t[8]) {
      var r = +t[4] || 0;
      return t[8].toUpperCase() !== "Z" && (r -= +t[8].slice(0, 3)), new Date(Date.UTC(+t[1], +(t[2] || 1) - 1, +t[3] || 1, r, +(t[5] || 0), +t[6] || 0, t[7] ? +t[7].substring(0, 3) : 0));
    } else
      return new Date(+t[1], +(t[2] || 1) - 1, +t[3] || 1, +t[4] || 0, +(t[5] || 0), +t[6] || 0, t[7] ? +t[7].substring(0, 3) : 0);
  } else if (e == null)
    return /* @__PURE__ */ new Date(NaN);
  return new Date(_c(e));
}
function Ro(e) {
  var t = parseFloat(e);
  return t == e && (t !== 0 || !X(e) || e.indexOf("x") <= 0) ? t : NaN;
}
function kT(e) {
  return !isNaN(Ro(e));
}
function _p() {
  return _c(yT() * 9);
}
function wp(e, t) {
  return t === 0 ? e : wp(t, e % t);
}
function sf(e, t) {
  return e == null ? t : t == null ? e : e * t / wp(e, t);
}
function an(e) {
  return e != null && isFinite(e);
}
var LT = "[ECharts] ", IT = typeof console < "u" && console.warn && console.log;
function ET(e, t, r) {
  IT && console[e](LT + t);
}
function bp(e, t) {
  ET("error", e);
}
function Jt(e) {
  throw new Error(e);
}
var Sp = "series\0", PT = "\0_ec_\0";
function Xt(e) {
  return e instanceof Array ? e : e == null ? [] : [e];
}
function mu(e, t, r) {
  if (e) {
    e[t] = e[t] || {}, e.emphasis = e.emphasis || {}, e.emphasis[t] = e.emphasis[t] || {};
    for (var i = 0, n = r.length; i < n; i++) {
      var a = r[i];
      !e.emphasis[t].hasOwnProperty(a) && e[t].hasOwnProperty(a) && (e.emphasis[t][a] = e[t][a]);
    }
  }
}
var lf = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "rich", "tag", "color", "textBorderColor", "textBorderWidth", "width", "height", "lineHeight", "align", "verticalAlign", "baseline", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY", "backgroundColor", "borderColor", "borderWidth", "borderRadius", "padding"];
function hs(e) {
  return H(e) && !F(e) && !(e instanceof Date) ? e.value : e;
}
function RT(e) {
  return H(e) && !(e instanceof Array);
}
function OT(e, t, r) {
  var i = r === "normalMerge", n = r === "replaceMerge", a = r === "replaceAll";
  e = e || [], t = (t || []).slice();
  var o = et();
  A(t, function(l, u) {
    if (!H(l)) {
      t[u] = null;
      return;
    }
  });
  var s = BT(e, o, r);
  return (i || n) && NT(s, e, o, t), i && FT(s, t), i || n ? UT(s, t, n) : a && zT(s, t), VT(s), s;
}
function BT(e, t, r) {
  var i = [];
  if (r === "replaceAll")
    return i;
  for (var n = 0; n < e.length; n++) {
    var a = e[n];
    a && a.id != null && t.set(a.id, n), i.push({
      existing: r === "replaceMerge" || $n(a) ? null : a,
      newOption: null,
      keyInfo: null,
      brandNew: null
    });
  }
  return i;
}
function NT(e, t, r, i) {
  A(i, function(n, a) {
    if (!(!n || n.id == null)) {
      var o = Wn(n.id), s = r.get(o);
      if (s != null) {
        var l = e[s];
        nr(!l.newOption, 'Duplicated option on id "' + o + '".'), l.newOption = n, l.existing = t[s], i[a] = null;
      }
    }
  });
}
function FT(e, t) {
  A(t, function(r, i) {
    if (!(!r || r.name == null))
      for (var n = 0; n < e.length; n++) {
        var a = e[n].existing;
        if (!e[n].newOption && a && (a.id == null || r.id == null) && !$n(r) && !$n(a) && xp("name", a, r)) {
          e[n].newOption = r, t[i] = null;
          return;
        }
      }
  });
}
function UT(e, t, r) {
  A(t, function(i) {
    if (i) {
      for (
        var n, a = 0;
        // Be `!resultItem` only when `nextIdx >= result.length`.
        (n = e[a]) && (n.newOption || $n(n.existing) || // In mode "replaceMerge", here no not-mapped-non-internal-existing.
        n.existing && i.id != null && !xp("id", i, n.existing));
      )
        a++;
      n ? (n.newOption = i, n.brandNew = r) : e.push({
        newOption: i,
        brandNew: r,
        existing: null,
        keyInfo: null
      }), a++;
    }
  });
}
function zT(e, t) {
  A(t, function(r) {
    e.push({
      newOption: r,
      brandNew: !0,
      existing: null,
      keyInfo: null
    });
  });
}
function VT(e) {
  var t = et();
  A(e, function(r) {
    var i = r.existing;
    i && t.set(i.id, r);
  }), A(e, function(r) {
    var i = r.newOption;
    nr(!i || i.id == null || !t.get(i.id) || t.get(i.id) === r, "id duplicates: " + (i && i.id)), i && i.id != null && t.set(i.id, r), !r.keyInfo && (r.keyInfo = {});
  }), A(e, function(r, i) {
    var n = r.existing, a = r.newOption, o = r.keyInfo;
    if (H(a)) {
      if (o.name = a.name != null ? Wn(a.name) : n ? n.name : Sp + i, n)
        o.id = Wn(n.id);
      else if (a.id != null)
        o.id = Wn(a.id);
      else {
        var s = 0;
        do
          o.id = "\0" + o.name + "\0" + s++;
        while (t.get(o.id));
      }
      t.set(o.id, r);
    }
  });
}
function xp(e, t, r) {
  var i = Ye(t[e], null), n = Ye(r[e], null);
  return i != null && n != null && i === n;
}
function Wn(e) {
  return Ye(e, "");
}
function Ye(e, t) {
  return e == null ? t : X(e) ? e : _t(e) || Kl(e) ? e + "" : t;
}
function Tp(e) {
  var t = e.name;
  return !!(t && t.indexOf(Sp));
}
function $n(e) {
  return e && e.id != null && Wn(e.id).indexOf(PT) === 0;
}
function HT(e, t, r) {
  A(e, function(i) {
    var n = i.newOption;
    H(n) && (i.keyInfo.mainType = t, i.keyInfo.subType = WT(t, n, i.existing, r));
  });
}
function WT(e, t, r, i) {
  var n = t.type ? t.type : r ? r.subType : i.determineSubType(e, t);
  return n;
}
function pa(e, t) {
  if (t.dataIndexInside != null)
    return t.dataIndexInside;
  if (t.dataIndex != null)
    return F(t.dataIndex) ? it(t.dataIndex, function(r) {
      return e.indexOfRawIndex(r);
    }) : e.indexOfRawIndex(t.dataIndex);
  if (t.name != null)
    return F(t.name) ? it(t.name, function(r) {
      return e.indexOfName(r);
    }) : e.indexOfName(t.name);
}
function st() {
  var e = "__ec_inner_" + GT++;
  return function(t) {
    return t[e] || (t[e] = {});
  };
}
var GT = _p();
function tl(e, t, r) {
  var i = wc(t, r), n = i.mainTypeSpecified, a = i.queryOptionMap, o = i.others, s = o, l = r ? r.defaultMainType : null;
  return !n && l && a.set(l, {}), a.each(function(u, c) {
    var h = ga(e, c, u, {
      useDefault: l === c,
      enableAll: r && r.enableAll != null ? r.enableAll : !0,
      enableNone: r && r.enableNone != null ? r.enableNone : !0
    });
    s[c + "Models"] = h.models, s[c + "Model"] = h.models[0];
  }), s;
}
function wc(e, t) {
  var r;
  if (X(e)) {
    var i = {};
    i[e + "Index"] = 0, r = i;
  } else
    r = e;
  var n = et(), a = {}, o = !1;
  return A(r, function(s, l) {
    if (l === "dataIndex" || l === "dataIndexInside") {
      a[l] = s;
      return;
    }
    var u = l.match(/^(\w+)(Index|Id|Name)$/) || [], c = u[1], h = (u[2] || "").toLowerCase();
    if (!(!c || !h || t && t.includeMainTypes && dt(t.includeMainTypes, c) < 0)) {
      o = o || !!c;
      var v = n.get(c) || n.set(c, {});
      v[h] = s;
    }
  }), {
    mainTypeSpecified: o,
    queryOptionMap: n,
    others: a
  };
}
var bc = {
  useDefault: !0,
  enableAll: !1,
  enableNone: !1
};
function ga(e, t, r, i) {
  i = i || bc;
  var n = r.index, a = r.id, o = r.name, s = {
    models: null,
    specified: n != null || a != null || o != null
  };
  if (!s.specified) {
    var l = void 0;
    return s.models = i.useDefault && (l = e.getComponent(t)) ? [l] : [], s;
  }
  if (n === "none" || n === !1) {
    if (i.enableNone)
      return s.models = [], s;
    n = -1;
  }
  return n === "all" && (i.enableAll ? n = a = o = null : n = -1), s.models = e.queryComponents({
    mainType: t,
    index: n,
    id: a,
    name: o
  }), s;
}
function YT(e, t, r) {
  var i = {};
  i[t + "Id"] = e[t + "Id"], i[t + "Index"] = e[t + "Index"], i[t + "Name"] = e[t + "Name"];
  var n = {
    mainType: t,
    query: i
  };
  return r && (n.subType = r), n;
}
function Cp(e, t, r) {
  e.setAttribute ? e.setAttribute(t, r) : e[t] = r;
}
function XT(e, t) {
  return e.getAttribute ? e.getAttribute(t) : e[t];
}
function qT(e) {
  return e === "auto" ? K.domSupported ? "html" : "richText" : e || "html";
}
function Mi() {
  return [1 / 0, -1 / 0];
}
function ZT(e, t, r) {
  var i = et(), n = 0;
  A(e, function(a) {
    var o = t(a), s = i.get(o) || 0;
    r && r(a, s), !s && !r && (e[n++] = a), i.set(o, s + 1);
  }), r || (e.length = n);
}
function QT(e, t, r) {
  var i = e.getData().count();
  return {
    progressiveRender: r.progressiveEnabled && t.incrementalPrepareRender && i >= r.threshold,
    large: e.get("large") && i >= e.get("largeThreshold"),
    // TODO: modDataCount should not updated if `appendData`, otherwise cause whole repaint.
    // see `test/candlestick-large3.html`
    modDataCount: e.get("progressiveChunkMode") === "mod" ? e.getData().count() : null
  };
}
function KT(e, t) {
  return {
    seriesType: e,
    overallReset: t
  };
}
function Ap(e) {
  return {
    overallReset: e
  };
}
var JT = ".", zr = "___EC__COMPONENT__CONTAINER___", Mp = "___EC__EXTENDED_CLASS___";
function Fe(e) {
  var t = {
    main: "",
    sub: ""
  };
  if (e) {
    var r = e.split(JT);
    t.main = r[0] || "", t.sub = r[1] || "";
  }
  return t;
}
function jT(e) {
  nr(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(e), 'componentType "' + e + '" illegal');
}
function $T(e) {
  return !!(e && e[Mp]);
}
function Sc(e, t) {
  e.$constructor = e, e.extend = function(r) {
    var i = this, n;
    return tC(i) ? n = /** @class */
    (function(a) {
      Q(o, a);
      function o() {
        return a.apply(this, arguments) || this;
      }
      return o;
    })(i) : (n = function() {
      (r.$constructor || i).apply(this, arguments);
    }, US(n, this)), P(n.prototype, r), n[Mp] = !0, n.extend = this.extend, n.superCall = iC, n.superApply = nC, n.superClass = i, n;
  };
}
function tC(e) {
  return at(e) && /^class\s/.test(Function.prototype.toString.call(e));
}
function Dp(e, t) {
  e.extend = t.extend;
}
var eC = Math.round(Math.random() * 10);
function rC(e) {
  var t = ["__\0is_clz", eC++].join("_");
  e.prototype[t] = !0, e.isInstance = function(r) {
    return !!(r && r[t]);
  };
}
function iC(e, t) {
  for (var r = [], i = 2; i < arguments.length; i++)
    r[i - 2] = arguments[i];
  return this.superClass.prototype[t].apply(e, r);
}
function nC(e, t, r) {
  return this.superClass.prototype[t].apply(e, r);
}
function xc(e) {
  var t = {};
  e.registerClass = function(i) {
    var n = i.type || i.prototype.type;
    if (n) {
      jT(n), i.prototype.type = n;
      var a = Fe(n);
      if (!a.sub)
        t[a.main] = i;
      else if (a.sub !== zr) {
        var o = r(a);
        o[a.sub] = i;
      }
    }
    return i;
  }, e.getClass = function(i, n, a) {
    var o = t[i];
    if (o && o[zr] && (o = n ? o[n] : null), a && !o)
      throw new Error(n ? "Component " + i + "." + (n || "") + " is used but not imported." : i + ".type should be specified.");
    return o;
  }, e.getClassesByMainType = function(i) {
    var n = Fe(i), a = [], o = t[n.main];
    return o && o[zr] ? A(o, function(s, l) {
      l !== zr && a.push(s);
    }) : a.push(o), a;
  }, e.hasClass = function(i) {
    var n = Fe(i);
    return !!t[n.main];
  }, e.getAllClassMainTypes = function() {
    var i = [];
    return A(t, function(n, a) {
      i.push(a);
    }), i;
  }, e.hasSubTypes = function(i) {
    var n = Fe(i), a = t[n.main];
    return a && a[zr];
  };
  function r(i) {
    var n = t[i.main];
    return (!n || !n[zr]) && (n = t[i.main] = {}, n[zr] = !0), n;
  }
}
function ta(e, t) {
  for (var r = 0; r < e.length; r++)
    e[r][1] || (e[r][1] = e[r][0]);
  return t = t || !1, function(i, n, a) {
    for (var o = {}, s = 0; s < e.length; s++) {
      var l = e[s][1];
      if (!(n && dt(n, l) >= 0 || a && dt(a, l) < 0)) {
        var u = i.getShallow(l, t);
        u != null && (o[e[s][0]] = u);
      }
    }
    return o;
  };
}
var aC = [
  ["fill", "color"],
  ["shadowBlur"],
  ["shadowOffsetX"],
  ["shadowOffsetY"],
  ["opacity"],
  ["shadowColor"]
  // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
  // So do not transfer decal directly.
], oC = ta(aC), sC = (
  /** @class */
  (function() {
    function e() {
    }
    return e.prototype.getAreaStyle = function(t, r) {
      return oC(this, t, r);
    }, e;
  })()
), yu = new en(50);
function lC(e) {
  if (typeof e == "string") {
    var t = yu.get(e);
    return t && t.image;
  } else
    return e;
}
function kp(e, t, r, i, n) {
  if (e)
    if (typeof e == "string") {
      if (t && t.__zrImageSrc === e || !r)
        return t;
      var a = yu.get(e), o = { hostEl: r, cb: i, cbPayload: n };
      return a ? (t = a.image, !fs(t) && a.pending.push(o)) : (t = ne.loadImage(e, uf, uf), t.__zrImageSrc = e, yu.put(e, t.__cachedImgObj = {
        image: t,
        pending: [o]
      })), t;
    } else
      return e;
  else return t;
}
function uf() {
  var e = this.__cachedImgObj;
  this.onload = this.onerror = this.__cachedImgObj = null;
  for (var t = 0; t < e.pending.length; t++) {
    var r = e.pending[t], i = r.cb;
    i && i(this, r.cbPayload), r.hostEl.dirty();
  }
  e.pending.length = 0;
}
function fs(e) {
  return e && e.width && e.height;
}
var el = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g;
function uC(e, t, r, i, n, a) {
  if (!r) {
    e.text = "", e.isTruncated = !1;
    return;
  }
  var o = (t + "").split(`
`);
  a = Lp(r, i, n, a);
  for (var s = !1, l = {}, u = 0, c = o.length; u < c; u++)
    Ip(l, o[u], a), o[u] = l.textLine, s = s || l.isTruncated;
  e.text = o.join(`
`), e.isTruncated = s;
}
function Lp(e, t, r, i) {
  i = i || {};
  var n = P({}, i);
  r = W(r, "..."), n.maxIterations = W(i.maxIterations, 2);
  var a = n.minChar = W(i.minChar, 0), o = n.fontMeasureInfo = We(t), s = o.asciiCharWidth;
  n.placeholder = W(i.placeholder, "");
  for (var l = e = Math.max(0, e - 1), u = 0; u < a && l >= s; u++)
    l -= s;
  var c = Ge(o, r);
  return c > l && (r = "", c = 0), l = e - c, n.ellipsis = r, n.ellipsisWidth = c, n.contentWidth = l, n.containerWidth = e, n;
}
function Ip(e, t, r) {
  var i = r.containerWidth, n = r.contentWidth, a = r.fontMeasureInfo;
  if (!i) {
    e.textLine = "", e.isTruncated = !1;
    return;
  }
  var o = Ge(a, t);
  if (o <= i) {
    e.textLine = t, e.isTruncated = !1;
    return;
  }
  for (var s = 0; ; s++) {
    if (o <= n || s >= r.maxIterations) {
      t += r.ellipsis;
      break;
    }
    var l = s === 0 ? cC(t, n, a) : o > 0 ? Math.floor(t.length * n / o) : 0;
    t = t.substr(0, l), o = Ge(a, t);
  }
  t === "" && (t = r.placeholder), e.textLine = t, e.isTruncated = !0;
}
function cC(e, t, r) {
  for (var i = 0, n = 0, a = e.length; n < a && i < t; n++)
    i += vp(r, e.charCodeAt(n));
  return n;
}
function hC(e, t, r, i) {
  var n = Tc(e), a = t.overflow, o = t.padding, s = o ? o[1] + o[3] : 0, l = o ? o[0] + o[2] : 0, u = t.font, c = a === "truncate", h = ss(u), v = W(t.lineHeight, h), f = t.lineOverflow === "truncate", d = !1, g = t.width;
  g == null && r != null && (g = r - s);
  var p = t.height;
  p == null && i != null && (p = i - l);
  var m;
  g != null && (a === "break" || a === "breakAll") ? m = n ? Ep(n, t.font, g, a === "breakAll", 0).lines : [] : m = n ? n.split(`
`) : [];
  var y = m.length * v;
  if (p == null && (p = y), y > p && f) {
    var _ = Math.floor(p / v);
    d = d || m.length > _, m = m.slice(0, _), y = m.length * v;
  }
  if (n && c && g != null)
    for (var w = Lp(g, u, t.ellipsis, {
      minChar: t.truncateMinChar,
      placeholder: t.placeholder
    }), b = {}, S = 0; S < m.length; S++)
      Ip(b, m[S], w), m[S] = b.textLine, d = d || b.isTruncated;
  for (var T = p, C = 0, x = We(u), S = 0; S < m.length; S++)
    C = Math.max(Ge(x, m[S]), C);
  g == null && (g = C);
  var M = g;
  return T += l, M += s, {
    lines: m,
    height: p,
    outerWidth: M,
    outerHeight: T,
    lineHeight: v,
    calculatedLineHeight: h,
    contentWidth: C,
    contentHeight: y,
    width: g,
    isTruncated: d
  };
}
var fC = /* @__PURE__ */ (function() {
  function e() {
  }
  return e;
})(), cf = /* @__PURE__ */ (function() {
  function e(t) {
    this.tokens = [], t && (this.tokens = t);
  }
  return e;
})(), vC = /* @__PURE__ */ (function() {
  function e() {
    this.width = 0, this.height = 0, this.contentWidth = 0, this.contentHeight = 0, this.outerWidth = 0, this.outerHeight = 0, this.lines = [], this.isTruncated = !1;
  }
  return e;
})();
function dC(e, t, r, i, n) {
  var a = new vC(), o = Tc(e);
  if (!o)
    return a;
  var s = t.padding, l = s ? s[1] + s[3] : 0, u = s ? s[0] + s[2] : 0, c = t.width;
  c == null && r != null && (c = r - l);
  var h = t.height;
  h == null && i != null && (h = i - u);
  for (var v = t.overflow, f = (v === "break" || v === "breakAll") && c != null ? { width: c, accumWidth: 0, breakAll: v === "breakAll" } : null, d = el.lastIndex = 0, g; (g = el.exec(o)) != null; ) {
    var p = g.index;
    p > d && rl(a, o.substring(d, p), t, f), rl(a, g[2], t, f, g[1]), d = el.lastIndex;
  }
  d < o.length && rl(a, o.substring(d, o.length), t, f);
  var m = [], y = 0, _ = 0, w = v === "truncate", b = t.lineOverflow === "truncate", S = {};
  function T(re, Vt, Bt) {
    re.width = Vt, re.lineHeight = Bt, y += Bt, _ = Math.max(_, Vt);
  }
  t: for (var C = 0; C < a.lines.length; C++) {
    for (var x = a.lines[C], M = 0, D = 0, I = 0; I < x.tokens.length; I++) {
      var k = x.tokens[I], L = k.styleName && t.rich[k.styleName] || {}, B = k.textPadding = L.padding, N = B ? B[1] + B[3] : 0, q = k.font = L.font || t.font;
      k.contentHeight = ss(q);
      var U = W(L.height, k.contentHeight);
      if (k.innerHeight = U, B && (U += B[0] + B[2]), k.height = U, k.lineHeight = ci(L.lineHeight, t.lineHeight, U), k.align = L && L.align || n, k.verticalAlign = L && L.verticalAlign || "middle", b && h != null && y + k.lineHeight > h) {
        var z = a.lines.length;
        I > 0 ? (x.tokens = x.tokens.slice(0, I), T(x, D, M), a.lines = a.lines.slice(0, C + 1)) : a.lines = a.lines.slice(0, C), a.isTruncated = a.isTruncated || a.lines.length < z;
        break t;
      }
      var V = L.width, J = V == null || V === "auto";
      if (typeof V == "string" && V.charAt(V.length - 1) === "%")
        k.percentWidth = V, m.push(k), k.contentWidth = Ge(We(q), k.text);
      else {
        if (J) {
          var j = L.backgroundColor, rt = j && j.image;
          rt && (rt = lC(rt), fs(rt) && (k.width = Math.max(k.width, rt.width * U / rt.height)));
        }
        var ot = w && c != null ? c - D : null;
        ot != null && ot < k.width ? !J || ot < N ? (k.text = "", k.width = k.contentWidth = 0) : (uC(S, k.text, ot - N, q, t.ellipsis, { minChar: t.truncateMinChar }), k.text = S.text, a.isTruncated = a.isTruncated || S.isTruncated, k.width = k.contentWidth = Ge(We(q), k.text)) : k.contentWidth = Ge(We(q), k.text);
      }
      k.width += N, D += k.width, L && (M = Math.max(M, k.lineHeight));
    }
    T(x, D, M);
  }
  a.outerWidth = a.width = W(c, _), a.outerHeight = a.height = W(h, y), a.contentHeight = y, a.contentWidth = _, a.outerWidth += l, a.outerHeight += u;
  for (var C = 0; C < m.length; C++) {
    var k = m[C], Mt = k.percentWidth;
    k.width = parseInt(Mt, 10) / 100 * a.width;
  }
  return a;
}
function rl(e, t, r, i, n) {
  var a = t === "", o = n && r.rich[n] || {}, s = e.lines, l = o.font || r.font, u = !1, c, h;
  if (i) {
    var v = o.padding, f = v ? v[1] + v[3] : 0;
    if (o.width != null && o.width !== "auto") {
      var d = nn(o.width, i.width) + f;
      s.length > 0 && d + i.accumWidth > i.width && (c = t.split(`
`), u = !0), i.accumWidth = d;
    } else {
      var g = Ep(t, l, i.width, i.breakAll, i.accumWidth);
      i.accumWidth = g.accumWidth + f, h = g.linesWidths, c = g.lines;
    }
  }
  c || (c = t.split(`
`));
  for (var p = We(l), m = 0; m < c.length; m++) {
    var y = c[m], _ = new fC();
    if (_.styleName = n, _.text = y, _.isLineHolder = !y && !a, typeof o.width == "number" ? _.width = o.width : _.width = h ? h[m] : Ge(p, y), !m && !u) {
      var w = (s[s.length - 1] || (s[0] = new cf())).tokens, b = w.length;
      b === 1 && w[0].isLineHolder ? w[0] = _ : (y || !b || a) && w.push(_);
    } else
      s.push(new cf([_]));
  }
}
function pC(e) {
  var t = e.charCodeAt(0);
  return t >= 32 && t <= 591 || t >= 880 && t <= 4351 || t >= 4608 && t <= 5119 || t >= 7680 && t <= 8303;
}
var gC = kr(",&?/;] ".split(""), function(e, t) {
  return e[t] = !0, e;
}, {});
function mC(e) {
  return pC(e) ? !!gC[e] : !0;
}
function Ep(e, t, r, i, n) {
  for (var a = [], o = [], s = "", l = "", u = 0, c = 0, h = We(t), v = 0; v < e.length; v++) {
    var f = e.charAt(v);
    if (f === `
`) {
      l && (s += l, c += u), a.push(s), o.push(c), s = "", l = "", u = 0, c = 0;
      continue;
    }
    var d = vp(h, f.charCodeAt(0)), g = i ? !1 : !mC(f);
    if (a.length ? c + d > r : n + c + d > r) {
      c ? (s || l) && (g ? (s || (s = l, l = "", u = 0, c = u), a.push(s), o.push(c - u), l += f, u += d, s = "", c = u) : (l && (s += l, l = "", u = 0), a.push(s), o.push(c), s = f, c = d)) : g ? (a.push(l), o.push(u), l = f, u = d) : (a.push(f), o.push(d));
      continue;
    }
    c += d, g ? (l += f, u += d) : (l && (s += l, l = "", u = 0), s += f);
  }
  return l && (s += l), s && (a.push(s), o.push(c)), a.length === 1 && (c += n), {
    accumWidth: c,
    lines: a,
    linesWidths: o
  };
}
function hf(e, t, r, i, n, a) {
  if (e.baseX = r, e.baseY = i, e.outerWidth = e.outerHeight = null, !!t) {
    var o = t.width * 2, s = t.height * 2;
    Y.set(ff, rn(r, o, n), vi(i, s, a), o, s), Y.intersect(t, ff, null, vf);
    var l = vf.outIntersectRect;
    e.outerWidth = l.width, e.outerHeight = l.height, e.baseX = rn(l.x, l.width, n, !0), e.baseY = vi(l.y, l.height, a, !0);
  }
}
var ff = new Y(0, 0, 0, 0), vf = { outIntersectRect: {}, clamp: !0 };
function Tc(e) {
  return e != null ? e += "" : e = "";
}
function yC(e) {
  var t = Tc(e.text), r = e.font, i = Ge(We(r), t), n = ss(r);
  return _u(e, i, n, null);
}
function _u(e, t, r, i) {
  var n = new Y(rn(e.x || 0, t, e.textAlign), vi(e.y || 0, r, e.textBaseline), t, r), a = i ?? (Pp(e) ? e.lineWidth : 0);
  return a > 0 && (n.x -= a / 2, n.y -= a / 2, n.width += a, n.height += a), n;
}
function Pp(e) {
  var t = e.stroke;
  return t != null && t !== "none" && e.lineWidth > 0;
}
var wu = "__zr_style_" + Math.round(Math.random() * 10), di = {
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowColor: "#000",
  opacity: 1,
  blend: "source-over"
}, vs = {
  style: {
    shadowBlur: !0,
    shadowOffsetX: !0,
    shadowOffsetY: !0,
    shadowColor: !0,
    opacity: !0
  }
};
di[wu] = !0;
var df = ["z", "z2", "invisible"], _C = ["invisible"], ma = (function(e) {
  Q(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype._init = function(r) {
    for (var i = yt(r), n = 0; n < i.length; n++) {
      var a = i[n];
      a === "style" ? this.useStyle(r[a]) : e.prototype.attrKV.call(this, a, r[a]);
    }
    this.style || this.useStyle({});
  }, t.prototype.beforeBrush = function(r) {
  }, t.prototype.afterBrush = function() {
  }, t.prototype.innerBeforeBrush = function() {
  }, t.prototype.innerAfterBrush = function() {
  }, t.prototype.shouldBePainted = function(r, i, n, a) {
    var o = this.transform;
    if (this.ignore || this.invisible || this.style.opacity === 0 || this.culling && wC(this, r, i) || o && !o[0] && !o[3])
      return !1;
    if (n && this.__clipPaths && this.__clipPaths.length) {
      for (var s = 0; s < this.__clipPaths.length; ++s)
        if (this.__clipPaths[s].isZeroArea())
          return !1;
    }
    if (a && this.parent)
      for (var l = this.parent; l; ) {
        if (l.ignore)
          return !1;
        l = l.parent;
      }
    return !0;
  }, t.prototype.contain = function(r, i) {
    return this.rectContain(r, i);
  }, t.prototype.traverse = function(r, i) {
    r.call(i, this);
  }, t.prototype.rectContain = function(r, i) {
    var n = this.transformCoordToLocal(r, i), a = this.getBoundingRect();
    return a.contain(n[0], n[1]);
  }, t.prototype.getPaintRect = function() {
    var r = this._paintRect;
    if (!this._paintRect || this.__dirty) {
      var i = this.transform, n = this.getBoundingRect(), a = this.style, o = a.shadowBlur || 0, s = a.shadowOffsetX || 0, l = a.shadowOffsetY || 0;
      r = this._paintRect || (this._paintRect = new Y(0, 0, 0, 0)), i ? Y.applyTransform(r, n, i) : r.copy(n), (o || s || l) && (r.width += o * 2 + Math.abs(s), r.height += o * 2 + Math.abs(l), r.x = Math.min(r.x, r.x + s - o), r.y = Math.min(r.y, r.y + l - o));
      var u = this.dirtyRectTolerance;
      r.isZero() || (r.x = Math.floor(r.x - u), r.y = Math.floor(r.y - u), r.width = Math.ceil(r.width + 1 + u * 2), r.height = Math.ceil(r.height + 1 + u * 2));
    }
    return r;
  }, t.prototype.setPrevPaintRect = function(r) {
    r ? (this._prevPaintRect = this._prevPaintRect || new Y(0, 0, 0, 0), this._prevPaintRect.copy(r)) : this._prevPaintRect = null;
  }, t.prototype.getPrevPaintRect = function() {
    return this._prevPaintRect;
  }, t.prototype.animateStyle = function(r) {
    return this.animate("style", r);
  }, t.prototype.updateDuringAnimation = function(r) {
    r === "style" ? this.dirtyStyle() : this.markRedraw();
  }, t.prototype.attrKV = function(r, i) {
    r !== "style" ? e.prototype.attrKV.call(this, r, i) : this.style ? this.setStyle(i) : this.useStyle(i);
  }, t.prototype.setStyle = function(r, i) {
    return typeof r == "string" ? this.style[r] = i : P(this.style, r), this.dirtyStyle(), this;
  }, t.prototype.dirtyStyle = function(r) {
    r || this.markRedraw(), this.__dirty |= Ln, this._rect && (this._rect = null);
  }, t.prototype.dirty = function() {
    this.dirtyStyle();
  }, t.prototype.styleChanged = function() {
    return !!(this.__dirty & Ln);
  }, t.prototype.styleUpdated = function() {
    this.__dirty &= ~Ln;
  }, t.prototype.createStyle = function(r) {
    return ns(di, r);
  }, t.prototype.useStyle = function(r) {
    r[wu] || (r = this.createStyle(r)), this.style = r, this.dirtyStyle();
  }, t.prototype._useHoverStyle = function(r) {
    this.__hoverStyle = r;
  }, t.prototype.isStyleObject = function(r) {
    return r[wu];
  }, t.prototype._innerSaveToNormal = function(r) {
    e.prototype._innerSaveToNormal.call(this, r);
    var i = this._normalState;
    r.style && !i.style && (i.style = this._mergeStyle(this.createStyle(), this.style)), this._savePrimaryToNormal(r, i, df);
  }, t.prototype._applyStateObj = function(r, i, n, a, o, s) {
    e.prototype._applyStateObj.call(this, r, i, n, a, o, s);
    var l = !(i && a), u = this.__inHover === ls, c;
    if (i && i.style ? o ? a ? c = i.style : (c = this._mergeStyle(this.createStyle(), n.style), this._mergeStyle(c, i.style)) : (c = this._mergeStyle(this.createStyle(), a ? this.style : n.style), this._mergeStyle(c, i.style)) : l && (c = n.style), c)
      if (o) {
        var h = this.style;
        if (this.style = this.createStyle(l ? {} : h), l)
          for (var v = yt(h), f = 0; f < v.length; f++) {
            var d = v[f];
            d in c && (c[d] = c[d], this.style[d] = h[d]);
          }
        for (var g = yt(c), f = 0; f < g.length; f++) {
          var d = g[f];
          this.style[d] = this.style[d];
        }
        this._transitionState(r, {
          style: c
        }, s, this.getAnimationStyleProps());
      } else
        u ? this._useHoverStyle(c) : this.useStyle(c);
    if (!u)
      for (var p = this.__inHover ? _C : df, f = 0; f < p.length; f++) {
        var d = p[f];
        i && i[d] != null ? this[d] = i[d] : l && n[d] != null && (this[d] = n[d]);
      }
  }, t.prototype._mergeStates = function(r) {
    for (var i = e.prototype._mergeStates.call(this, r), n, a = 0; a < r.length; a++) {
      var o = r[a];
      o.style && (n = n || {}, this._mergeStyle(n, o.style));
    }
    return n && (i.style = n), i;
  }, t.prototype._mergeStyle = function(r, i) {
    return P(r, i), r;
  }, t.prototype.getAnimationStyleProps = function() {
    return vs;
  }, t.initDefaultProps = (function() {
    var r = t.prototype;
    r.type = "displayable", r.invisible = !1, r.z = 0, r.z2 = 0, r.zlevel = 0, r.culling = !1, r.cursor = "pointer", r.rectHover = !1, r.incremental = 0, r._rect = null, r.dirtyRectTolerance = 0, r.__dirty = jt | Ln;
  })(), t;
})(us), il = new Y(0, 0, 0, 0), nl = new Y(0, 0, 0, 0);
function wC(e, t, r) {
  return il.copy(e.getBoundingRect()), e.transform && il.applyTransform(e.transform), nl.width = t, nl.height = r, !il.intersect(nl);
}
var ge = Math.min, me = Math.max, al = Math.sin, ol = Math.cos, Vr = Math.PI * 2, ka = ln(), La = ln(), Ia = ln();
function pf(e, t, r, i, n, a) {
  n[0] = ge(e, r), n[1] = ge(t, i), a[0] = me(e, r), a[1] = me(t, i);
}
var gf = [], mf = [];
function bC(e, t, r, i, n, a, o, s, l, u) {
  var c = ap, h = Gt, v = c(e, r, n, o, gf);
  l[0] = 1 / 0, l[1] = 1 / 0, u[0] = -1 / 0, u[1] = -1 / 0;
  for (var f = 0; f < v; f++) {
    var d = h(e, r, n, o, gf[f]);
    l[0] = ge(d, l[0]), u[0] = me(d, u[0]);
  }
  v = c(t, i, a, s, mf);
  for (var f = 0; f < v; f++) {
    var g = h(t, i, a, s, mf[f]);
    l[1] = ge(g, l[1]), u[1] = me(g, u[1]);
  }
  l[0] = ge(e, l[0]), u[0] = me(e, u[0]), l[0] = ge(o, l[0]), u[0] = me(o, u[0]), l[1] = ge(t, l[1]), u[1] = me(t, u[1]), l[1] = ge(s, l[1]), u[1] = me(s, u[1]);
}
function SC(e, t, r, i, n, a, o, s) {
  var l = op, u = Kt, c = me(ge(l(e, r, n), 1), 0), h = me(ge(l(t, i, a), 1), 0), v = u(e, r, n, c), f = u(t, i, a, h);
  o[0] = ge(e, n, v), o[1] = ge(t, a, f), s[0] = me(e, n, v), s[1] = me(t, a, f);
}
function xC(e, t, r, i, n, a, o, s, l) {
  var u = Vi, c = Hi, h = Math.abs(n - a);
  if (h % Vr < 1e-4 && h > 1e-4) {
    s[0] = e - r, s[1] = t - i, l[0] = e + r, l[1] = t + i;
    return;
  }
  if (ka[0] = ol(n) * r + e, ka[1] = al(n) * i + t, La[0] = ol(a) * r + e, La[1] = al(a) * i + t, u(s, ka, La), c(l, ka, La), n = n % Vr, n < 0 && (n = n + Vr), a = a % Vr, a < 0 && (a = a + Vr), n > a && !o ? a += Vr : n < a && o && (n += Vr), o) {
    var v = a;
    a = n, n = v;
  }
  for (var f = 0; f < a; f += Math.PI / 2)
    f > n && (Ia[0] = ol(f) * r + e, Ia[1] = al(f) * i + t, u(s, Ia, s), c(l, Ia, l));
}
var nt = {
  M: 1,
  L: 2,
  C: 3,
  Q: 4,
  A: 5,
  Z: 6,
  R: 7
}, Hr = [], Wr = [], ke = [], fr = [], Le = [], Ie = [], sl = Math.min, ll = Math.max, Gr = Math.cos, Yr = Math.sin, je = Math.abs, bu = Math.PI, mr = bu * 2, ul = typeof Float32Array < "u", pn = [];
function cl(e) {
  var t = Math.round(e / bu * 1e8) / 1e8;
  return t % 2 * bu;
}
function Rp(e, t) {
  var r = cl(e[0]);
  r < 0 && (r += mr);
  var i = r - e[0], n = e[1];
  n += i, !t && n - r >= mr ? n = r + mr : t && r - n >= mr ? n = r - mr : !t && r > n ? n = r + (mr - cl(r - n)) : t && r < n && (n = r - (mr - cl(n - r))), e[0] = r, e[1] = n;
}
var on = (function() {
  function e(t) {
    this.dpr = 1, this._xi = 0, this._yi = 0, this._x0 = 0, this._y0 = 0, this._len = 0, t && (this._saveData = !1), this._saveData && (this.data = []);
  }
  return e.prototype.increaseVersion = function() {
    this._version++;
  }, e.prototype.getVersion = function() {
    return this._version;
  }, e.prototype.setScale = function(t, r, i) {
    i = i || 0, i > 0 && (this._ux = je(i / Io / t) || 0, this._uy = je(i / Io / r) || 0);
  }, e.prototype.setDPR = function(t) {
    this.dpr = t;
  }, e.prototype.setContext = function(t) {
    this._ctx = t;
  }, e.prototype.getContext = function() {
    return this._ctx;
  }, e.prototype.beginPath = function() {
    return this._ctx && this._ctx.beginPath(), this.reset(), this;
  }, e.prototype.reset = function() {
    this._saveData && (this._len = 0), this._pathSegLen && (this._pathSegLen = null, this._pathLen = 0), this._version++;
  }, e.prototype.moveTo = function(t, r) {
    return this._drawPendingPt(), this.addData(nt.M, t, r), this._ctx && this._ctx.moveTo(t, r), this._x0 = t, this._y0 = r, this._xi = t, this._yi = r, this;
  }, e.prototype.lineTo = function(t, r) {
    var i = je(t - this._xi), n = je(r - this._yi), a = i > this._ux || n > this._uy;
    if (this.addData(nt.L, t, r), this._ctx && a && this._ctx.lineTo(t, r), a)
      this._xi = t, this._yi = r, this._pendingPtDist = 0;
    else {
      var o = i * i + n * n;
      o > this._pendingPtDist && (this._pendingPtX = t, this._pendingPtY = r, this._pendingPtDist = o);
    }
    return this;
  }, e.prototype.bezierCurveTo = function(t, r, i, n, a, o) {
    return this._drawPendingPt(), this.addData(nt.C, t, r, i, n, a, o), this._ctx && this._ctx.bezierCurveTo(t, r, i, n, a, o), this._xi = a, this._yi = o, this;
  }, e.prototype.quadraticCurveTo = function(t, r, i, n) {
    return this._drawPendingPt(), this.addData(nt.Q, t, r, i, n), this._ctx && this._ctx.quadraticCurveTo(t, r, i, n), this._xi = i, this._yi = n, this;
  }, e.prototype.arc = function(t, r, i, n, a, o) {
    this._drawPendingPt(), pn[0] = n, pn[1] = a, Rp(pn, o), n = pn[0], a = pn[1];
    var s = a - n;
    return this.addData(nt.A, t, r, i, i, n, s, 0, o ? 0 : 1), this._ctx && this._ctx.arc(t, r, i, n, a, o), this._xi = Gr(a) * i + t, this._yi = Yr(a) * i + r, this;
  }, e.prototype.arcTo = function(t, r, i, n, a) {
    return this._drawPendingPt(), this._ctx && this._ctx.arcTo(t, r, i, n, a), this;
  }, e.prototype.rect = function(t, r, i, n) {
    return this._drawPendingPt(), this._ctx && this._ctx.rect(t, r, i, n), this.addData(nt.R, t, r, i, n), this;
  }, e.prototype.closePath = function() {
    this._drawPendingPt(), this.addData(nt.Z);
    var t = this._ctx, r = this._x0, i = this._y0;
    return t && t.closePath(), this._xi = r, this._yi = i, this;
  }, e.prototype.fill = function(t) {
    t && t.fill(), this.toStatic();
  }, e.prototype.stroke = function(t) {
    t && t.stroke(), this.toStatic();
  }, e.prototype.len = function() {
    return this._len;
  }, e.prototype.setData = function(t) {
    if (this._saveData) {
      var r = t.length;
      !(this.data && this.data.length === r) && ul && (this.data = new Float32Array(r));
      for (var i = 0; i < r; i++)
        this.data[i] = t[i];
      this._len = r;
    }
  }, e.prototype.appendPath = function(t) {
    if (this._saveData) {
      t instanceof Array || (t = [t]);
      for (var r = t.length, i = 0, n = this._len, a = 0; a < r; a++)
        i += t[a].len();
      var o = this.data;
      if (ul && (o instanceof Float32Array || !o) && (this.data = new Float32Array(n + i), n > 0 && o))
        for (var s = 0; s < n; s++)
          this.data[s] = o[s];
      for (var a = 0; a < r; a++)
        for (var l = t[a].data, s = 0; s < l.length; s++)
          this.data[n++] = l[s];
      this._len = n;
    }
  }, e.prototype.addData = function(t, r, i, n, a, o, s, l, u) {
    if (this._saveData) {
      var c = this.data;
      this._len + arguments.length > c.length && (this._expandData(), c = this.data);
      for (var h = 0; h < arguments.length; h++)
        c[this._len++] = arguments[h];
    }
  }, e.prototype._drawPendingPt = function() {
    this._pendingPtDist > 0 && (this._ctx && this._ctx.lineTo(this._pendingPtX, this._pendingPtY), this._pendingPtDist = 0);
  }, e.prototype._expandData = function() {
    if (!(this.data instanceof Array)) {
      for (var t = [], r = 0; r < this._len; r++)
        t[r] = this.data[r];
      this.data = t;
    }
  }, e.prototype.toStatic = function() {
    if (this._saveData) {
      this._drawPendingPt();
      var t = this.data;
      t instanceof Array && (t.length = this._len, ul && this._len > 11 && (this.data = new Float32Array(t)));
    }
  }, e.prototype.getBoundingRect = function() {
    ke[0] = ke[1] = Le[0] = Le[1] = Number.MAX_VALUE, fr[0] = fr[1] = Ie[0] = Ie[1] = -Number.MAX_VALUE;
    var t = this.data, r = 0, i = 0, n = 0, a = 0, o;
    for (o = 0; o < this._len; ) {
      var s = t[o++], l = o === 1;
      switch (l && (r = t[o], i = t[o + 1], n = r, a = i), s) {
        case nt.M:
          r = n = t[o++], i = a = t[o++], Le[0] = n, Le[1] = a, Ie[0] = n, Ie[1] = a;
          break;
        case nt.L:
          pf(r, i, t[o], t[o + 1], Le, Ie), r = t[o++], i = t[o++];
          break;
        case nt.C:
          bC(r, i, t[o++], t[o++], t[o++], t[o++], t[o], t[o + 1], Le, Ie), r = t[o++], i = t[o++];
          break;
        case nt.Q:
          SC(r, i, t[o++], t[o++], t[o], t[o + 1], Le, Ie), r = t[o++], i = t[o++];
          break;
        case nt.A:
          var u = t[o++], c = t[o++], h = t[o++], v = t[o++], f = t[o++], d = t[o++] + f;
          o += 1;
          var g = !t[o++];
          l && (n = Gr(f) * h + u, a = Yr(f) * v + c), xC(u, c, h, v, f, d, g, Le, Ie), r = Gr(d) * h + u, i = Yr(d) * v + c;
          break;
        case nt.R:
          n = r = t[o++], a = i = t[o++];
          var p = t[o++], m = t[o++];
          pf(n, a, n + p, a + m, Le, Ie);
          break;
        case nt.Z:
          r = n, i = a;
          break;
      }
      Vi(ke, ke, Le), Hi(fr, fr, Ie);
    }
    return o === 0 && (ke[0] = ke[1] = fr[0] = fr[1] = 0), new Y(ke[0], ke[1], fr[0] - ke[0], fr[1] - ke[1]);
  }, e.prototype._calculateLength = function() {
    var t = this.data, r = this._len, i = this._ux, n = this._uy, a = 0, o = 0, s = 0, l = 0;
    this._pathSegLen || (this._pathSegLen = []);
    for (var u = this._pathSegLen, c = 0, h = 0, v = 0; v < r; ) {
      var f = t[v++], d = v === 1;
      d && (a = t[v], o = t[v + 1], s = a, l = o);
      var g = -1;
      switch (f) {
        case nt.M:
          a = s = t[v++], o = l = t[v++];
          break;
        case nt.L: {
          var p = t[v++], m = t[v++], y = p - a, _ = m - o;
          (je(y) > i || je(_) > n || v === r - 1) && (g = Math.sqrt(y * y + _ * _), a = p, o = m);
          break;
        }
        case nt.C: {
          var w = t[v++], b = t[v++], p = t[v++], m = t[v++], S = t[v++], T = t[v++];
          g = Ix(a, o, w, b, p, m, S, T, 10), a = S, o = T;
          break;
        }
        case nt.Q: {
          var w = t[v++], b = t[v++], p = t[v++], m = t[v++];
          g = Rx(a, o, w, b, p, m, 10), a = p, o = m;
          break;
        }
        case nt.A:
          var C = t[v++], x = t[v++], M = t[v++], D = t[v++], I = t[v++], k = t[v++], L = k + I;
          v += 1, d && (s = Gr(I) * M + C, l = Yr(I) * D + x), g = ll(M, D) * sl(mr, Math.abs(k)), a = Gr(L) * M + C, o = Yr(L) * D + x;
          break;
        case nt.R: {
          s = a = t[v++], l = o = t[v++];
          var B = t[v++], N = t[v++];
          g = B * 2 + N * 2;
          break;
        }
        case nt.Z: {
          var y = s - a, _ = l - o;
          g = Math.sqrt(y * y + _ * _), a = s, o = l;
          break;
        }
      }
      g >= 0 && (u[h++] = g, c += g);
    }
    return this._pathLen = c, c;
  }, e.prototype.rebuildPath = function(t, r) {
    var i = this.data, n = this._ux, a = this._uy, o = this._len, s, l, u, c, h, v, f = r < 1, d, g, p = 0, m = 0, y, _ = 0, w, b;
    if (!(f && (this._pathSegLen || this._calculateLength(), d = this._pathSegLen, g = this._pathLen, y = r * g, !y)))
      t: for (var S = 0; S < o; ) {
        var T = i[S++], C = S === 1;
        switch (C && (u = i[S], c = i[S + 1], s = u, l = c), T !== nt.L && _ > 0 && (t.lineTo(w, b), _ = 0), T) {
          case nt.M:
            s = u = i[S++], l = c = i[S++], t.moveTo(u, c);
            break;
          case nt.L: {
            h = i[S++], v = i[S++];
            var x = je(h - u), M = je(v - c);
            if (x > n || M > a) {
              if (f) {
                var D = d[m++];
                if (p + D > y) {
                  var I = (y - p) / D;
                  t.lineTo(u * (1 - I) + h * I, c * (1 - I) + v * I);
                  break t;
                }
                p += D;
              }
              t.lineTo(h, v), u = h, c = v, _ = 0;
            } else {
              var k = x * x + M * M;
              k > _ && (w = h, b = v, _ = k);
            }
            break;
          }
          case nt.C: {
            var L = i[S++], B = i[S++], N = i[S++], q = i[S++], U = i[S++], z = i[S++];
            if (f) {
              var D = d[m++];
              if (p + D > y) {
                var I = (y - p) / D;
                Do(u, L, N, U, I, Hr), Do(c, B, q, z, I, Wr), t.bezierCurveTo(Hr[1], Wr[1], Hr[2], Wr[2], Hr[3], Wr[3]);
                break t;
              }
              p += D;
            }
            t.bezierCurveTo(L, B, N, q, U, z), u = U, c = z;
            break;
          }
          case nt.Q: {
            var L = i[S++], B = i[S++], N = i[S++], q = i[S++];
            if (f) {
              var D = d[m++];
              if (p + D > y) {
                var I = (y - p) / D;
                ko(u, L, N, I, Hr), ko(c, B, q, I, Wr), t.quadraticCurveTo(Hr[1], Wr[1], Hr[2], Wr[2]);
                break t;
              }
              p += D;
            }
            t.quadraticCurveTo(L, B, N, q), u = N, c = q;
            break;
          }
          case nt.A:
            var V = i[S++], J = i[S++], j = i[S++], rt = i[S++], ot = i[S++], Mt = i[S++], re = i[S++], Vt = !i[S++], Bt = j > rt ? j : rt, Et = je(j - rt) > 1e-3, bt = ot + Mt, G = !1;
            if (f) {
              var D = d[m++];
              p + D > y && (bt = ot + Mt * (y - p) / D, G = !0), p += D;
            }
            if (Et && t.ellipse ? t.ellipse(V, J, j, rt, re, ot, bt, Vt) : t.arc(V, J, Bt, ot, bt, Vt), G)
              break t;
            C && (s = Gr(ot) * j + V, l = Yr(ot) * rt + J), u = Gr(bt) * j + V, c = Yr(bt) * rt + J;
            break;
          case nt.R:
            s = u = i[S], l = c = i[S + 1], h = i[S++], v = i[S++];
            var $ = i[S++], De = i[S++];
            if (f) {
              var D = d[m++];
              if (p + D > y) {
                var Dt = y - p;
                t.moveTo(h, v), t.lineTo(h + sl(Dt, $), v), Dt -= $, Dt > 0 && t.lineTo(h + $, v + sl(Dt, De)), Dt -= De, Dt > 0 && t.lineTo(h + ll($ - Dt, 0), v + De), Dt -= $, Dt > 0 && t.lineTo(h, v + ll(De - Dt, 0));
                break t;
              }
              p += D;
            }
            t.rect(h, v, $, De);
            break;
          case nt.Z:
            if (f) {
              var D = d[m++];
              if (p + D > y) {
                var I = (y - p) / D;
                t.lineTo(u * (1 - I) + s * I, c * (1 - I) + l * I);
                break t;
              }
              p += D;
            }
            t.closePath(), u = s, c = l;
        }
      }
  }, e.prototype.clone = function() {
    var t = new e(), r = this.data;
    return t.data = r.slice ? r.slice() : Array.prototype.slice.call(r), t._len = this._len, t;
  }, e.prototype.canSave = function() {
    return !!this._saveData;
  }, e.CMD = nt, e.initDefaultProps = (function() {
    var t = e.prototype;
    t._saveData = !0, t._ux = 0, t._uy = 0, t._pendingPtDist = 0, t._version = 0;
  })(), e;
})();
function Di(e, t, r, i, n, a, o) {
  if (n === 0)
    return !1;
  var s = n, l = 0, u = e;
  if (o > t + s && o > i + s || o < t - s && o < i - s || a > e + s && a > r + s || a < e - s && a < r - s)
    return !1;
  if (e !== r)
    l = (t - i) / (e - r), u = (e * i - r * t) / (e - r);
  else
    return Math.abs(a - e) <= s / 2;
  var c = l * a - o + u, h = c * c / (l * l + 1);
  return h <= s / 2 * s / 2;
}
function TC(e, t, r, i, n, a, o, s, l, u, c) {
  if (l === 0)
    return !1;
  var h = l;
  if (c > t + h && c > i + h && c > a + h && c > s + h || c < t - h && c < i - h && c < a - h && c < s - h || u > e + h && u > r + h && u > n + h && u > o + h || u < e - h && u < r - h && u < n - h && u < o - h)
    return !1;
  var v = Lx(e, t, r, i, n, a, o, s, u, c);
  return v <= h / 2;
}
function CC(e, t, r, i, n, a, o, s, l) {
  if (o === 0)
    return !1;
  var u = o;
  if (l > t + u && l > i + u && l > a + u || l < t - u && l < i - u && l < a - u || s > e + u && s > r + u && s > n + u || s < e - u && s < r - u && s < n - u)
    return !1;
  var c = Px(e, t, r, i, n, a, s, l);
  return c <= u / 2;
}
var yf = Math.PI * 2;
function Ea(e) {
  return e %= yf, e < 0 && (e += yf), e;
}
var gn = Math.PI * 2;
function AC(e, t, r, i, n, a, o, s, l) {
  if (o === 0)
    return !1;
  var u = o;
  s -= e, l -= t;
  var c = Math.sqrt(s * s + l * l);
  if (c - u > r || c + u < r)
    return !1;
  if (Math.abs(i - n) % gn < 1e-4)
    return !0;
  if (a) {
    var h = i;
    i = Ea(n), n = Ea(h);
  } else
    i = Ea(i), n = Ea(n);
  i > n && (n += gn);
  var v = Math.atan2(l, s);
  return v < 0 && (v += gn), v >= i && v <= n || v + gn >= i && v + gn <= n;
}
function Xr(e, t, r, i, n, a) {
  if (a > t && a > i || a < t && a < i || i === t)
    return 0;
  var o = (a - t) / (i - t), s = i < t ? 1 : -1;
  (o === 1 || o === 0) && (s = i < t ? 0.5 : -0.5);
  var l = o * (r - e) + e;
  return l === n ? 1 / 0 : l > n ? s : 0;
}
var vr = on.CMD, qr = Math.PI * 2, MC = 1e-4;
function DC(e, t) {
  return Math.abs(e - t) < MC;
}
var Ht = [-1, -1, -1], ve = [-1, -1];
function kC() {
  var e = ve[0];
  ve[0] = ve[1], ve[1] = e;
}
function LC(e, t, r, i, n, a, o, s, l, u) {
  if (u > t && u > i && u > a && u > s || u < t && u < i && u < a && u < s)
    return 0;
  var c = np(t, i, a, s, u, Ht);
  if (c === 0)
    return 0;
  for (var h = 0, v = -1, f = void 0, d = void 0, g = 0; g < c; g++) {
    var p = Ht[g], m = p === 0 || p === 1 ? 0.5 : 1, y = Gt(e, r, n, o, p);
    y < l || (v < 0 && (v = ap(t, i, a, s, ve), ve[1] < ve[0] && v > 1 && kC(), f = Gt(t, i, a, s, ve[0]), v > 1 && (d = Gt(t, i, a, s, ve[1]))), v === 2 ? p < ve[0] ? h += f < t ? m : -m : p < ve[1] ? h += d < f ? m : -m : h += s < d ? m : -m : p < ve[0] ? h += f < t ? m : -m : h += s < f ? m : -m);
  }
  return h;
}
function IC(e, t, r, i, n, a, o, s) {
  if (s > t && s > i && s > a || s < t && s < i && s < a)
    return 0;
  var l = Ex(t, i, a, s, Ht);
  if (l === 0)
    return 0;
  var u = op(t, i, a);
  if (u >= 0 && u <= 1) {
    for (var c = 0, h = Kt(t, i, a, u), v = 0; v < l; v++) {
      var f = Ht[v] === 0 || Ht[v] === 1 ? 0.5 : 1, d = Kt(e, r, n, Ht[v]);
      d < o || (Ht[v] < u ? c += h < t ? f : -f : c += a < h ? f : -f);
    }
    return c;
  } else {
    var f = Ht[0] === 0 || Ht[0] === 1 ? 0.5 : 1, d = Kt(e, r, n, Ht[0]);
    return d < o ? 0 : a < t ? f : -f;
  }
}
function EC(e, t, r, i, n, a, o, s) {
  if (s -= t, s > r || s < -r)
    return 0;
  var l = Math.sqrt(r * r - s * s);
  Ht[0] = -l, Ht[1] = l;
  var u = Math.abs(i - n);
  if (u < 1e-4)
    return 0;
  if (u >= qr - 1e-4) {
    i = 0, n = qr;
    var c = a ? 1 : -1;
    return o >= Ht[0] + e && o <= Ht[1] + e ? c : 0;
  }
  if (i > n) {
    var h = i;
    i = n, n = h;
  }
  i < 0 && (i += qr, n += qr);
  for (var v = 0, f = 0; f < 2; f++) {
    var d = Ht[f];
    if (d + e > o) {
      var g = Math.atan2(s, d), c = a ? 1 : -1;
      g < 0 && (g = qr + g), (g >= i && g <= n || g + qr >= i && g + qr <= n) && (g > Math.PI / 2 && g < Math.PI * 1.5 && (c = -c), v += c);
    }
  }
  return v;
}
function Op(e, t, r, i, n) {
  for (var a = e.data, o = e.len(), s = 0, l = 0, u = 0, c = 0, h = 0, v, f, d = 0; d < o; ) {
    var g = a[d++], p = d === 1;
    switch (g === vr.M && d > 1 && (r || (s += Xr(l, u, c, h, i, n))), p && (l = a[d], u = a[d + 1], c = l, h = u), g) {
      case vr.M:
        c = a[d++], h = a[d++], l = c, u = h;
        break;
      case vr.L:
        if (r) {
          if (Di(l, u, a[d], a[d + 1], t, i, n))
            return !0;
        } else
          s += Xr(l, u, a[d], a[d + 1], i, n) || 0;
        l = a[d++], u = a[d++];
        break;
      case vr.C:
        if (r) {
          if (TC(l, u, a[d++], a[d++], a[d++], a[d++], a[d], a[d + 1], t, i, n))
            return !0;
        } else
          s += LC(l, u, a[d++], a[d++], a[d++], a[d++], a[d], a[d + 1], i, n) || 0;
        l = a[d++], u = a[d++];
        break;
      case vr.Q:
        if (r) {
          if (CC(l, u, a[d++], a[d++], a[d], a[d + 1], t, i, n))
            return !0;
        } else
          s += IC(l, u, a[d++], a[d++], a[d], a[d + 1], i, n) || 0;
        l = a[d++], u = a[d++];
        break;
      case vr.A:
        var m = a[d++], y = a[d++], _ = a[d++], w = a[d++], b = a[d++], S = a[d++];
        d += 1;
        var T = !!(1 - a[d++]);
        v = Math.cos(b) * _ + m, f = Math.sin(b) * w + y, p ? (c = v, h = f) : s += Xr(l, u, v, f, i, n);
        var C = (i - m) * w / _ + m;
        if (r) {
          if (AC(m, y, w, b, b + S, T, t, C, n))
            return !0;
        } else
          s += EC(m, y, w, b, b + S, T, C, n);
        l = Math.cos(b + S) * _ + m, u = Math.sin(b + S) * w + y;
        break;
      case vr.R:
        c = l = a[d++], h = u = a[d++];
        var x = a[d++], M = a[d++];
        if (v = c + x, f = h + M, r) {
          if (Di(c, h, v, h, t, i, n) || Di(v, h, v, f, t, i, n) || Di(v, f, c, f, t, i, n) || Di(c, f, c, h, t, i, n))
            return !0;
        } else
          s += Xr(v, h, v, f, i, n), s += Xr(c, f, c, h, i, n);
        break;
      case vr.Z:
        if (r) {
          if (Di(l, u, c, h, t, i, n))
            return !0;
        } else
          s += Xr(l, u, c, h, i, n);
        l = c, u = h;
        break;
    }
  }
  return !r && !DC(u, h) && (s += Xr(l, u, c, h, i, n) || 0), s !== 0;
}
function PC(e, t, r) {
  return Op(e, 0, !1, t, r);
}
function RC(e, t, r, i) {
  return Op(e, t, !0, r, i);
}
var Bp = wt({
  fill: "#000",
  stroke: null,
  strokePercent: 1,
  fillOpacity: 1,
  strokeOpacity: 1,
  lineDashOffset: 0,
  lineWidth: 1,
  lineCap: "butt",
  miterLimit: 10,
  strokeNoScale: !1,
  strokeFirst: !1
}, di), OC = {
  style: wt({
    fill: !0,
    stroke: !0,
    strokePercent: !0,
    fillOpacity: !0,
    strokeOpacity: !0,
    lineDashOffset: !0,
    lineWidth: !0,
    miterLimit: !0
  }, vs.style)
}, hl = os.concat([
  "invisible",
  "culling",
  "z",
  "z2",
  "zlevel",
  "parent"
]), ht = (function(e) {
  Q(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.update = function() {
    var r = this;
    e.prototype.update.call(this);
    var i = this.style;
    if (i.decal) {
      var n = this._decalEl = this._decalEl || new t();
      n.buildPath === t.prototype.buildPath && (n.buildPath = function(l) {
        r.buildPath(l, r.shape);
      }), n.silent = !0;
      var a = n.style;
      for (var o in i)
        a[o] !== i[o] && (a[o] = i[o]);
      a.fill = i.fill ? i.decal : null, a.decal = null, a.shadowColor = null, i.strokeFirst && (a.stroke = null);
      for (var s = 0; s < hl.length; ++s)
        n[hl[s]] = this[hl[s]];
      n.__dirty |= jt;
    } else this._decalEl && (this._decalEl = null);
  }, t.prototype.getDecalElement = function() {
    return this._decalEl;
  }, t.prototype._init = function(r) {
    var i = yt(r);
    this.shape = this.getDefaultShape();
    var n = this.getDefaultStyle();
    n && this.useStyle(n);
    for (var a = 0; a < i.length; a++) {
      var o = i[a], s = r[o];
      o === "style" ? this.style ? P(this.style, s) : this.useStyle(s) : o === "shape" ? P(this.shape, s) : e.prototype.attrKV.call(this, o, s);
    }
    this.style || this.useStyle({});
  }, t.prototype.getDefaultStyle = function() {
    return null;
  }, t.prototype.getDefaultShape = function() {
    return {};
  }, t.prototype.canBeInsideText = function() {
    return this.hasFill();
  }, t.prototype.getInsideTextFill = function() {
    var r = this.style.fill;
    if (r !== "none") {
      if (X(r)) {
        var i = Lo(r, 0);
        return i > 0.5 ? pu : i > 0.2 ? tT : gu;
      } else if (r)
        return gu;
    }
    return pu;
  }, t.prototype.getInsideTextStroke = function(r) {
    var i = this.style.fill;
    if (X(i)) {
      var n = this.__zr, a = !!(n && n.isDarkMode()), o = Lo(r, 0) < du;
      if (a === o)
        return i;
    }
  }, t.prototype.buildPath = function(r, i, n) {
  }, t.prototype.pathUpdated = function() {
    this.__dirty &= ~Ui;
  }, t.prototype.getUpdatedPathProxy = function(r) {
    return !this.path && this.createPathProxy(), this.path.beginPath(), this.buildPath(this.path, this.shape, r), this.path;
  }, t.prototype.createPathProxy = function() {
    this.path = new on(!1);
  }, t.prototype.hasStroke = function() {
    var r = this.style, i = r.stroke;
    return !(i == null || i === "none" || !(r.lineWidth > 0));
  }, t.prototype.hasFill = function() {
    var r = this.style, i = r.fill;
    return i != null && i !== "none";
  }, t.prototype.getBoundingRect = function() {
    var r = this._rect, i = this.style, n = !r;
    if (n) {
      var a = !1;
      this.path || (a = !0, this.createPathProxy());
      var o = this.path;
      (a || this.__dirty & Ui) && (o.beginPath(), this.buildPath(o, this.shape, !1), this.pathUpdated()), r = o.getBoundingRect();
    }
    if (this._rect = r, this.hasStroke() && this.path && this.path.len() > 0) {
      var s = this._rectStroke || (this._rectStroke = r.clone());
      if (this.__dirty || n) {
        s.copy(r);
        var l = i.strokeNoScale ? this.getLineScale() : 1, u = i.lineWidth;
        if (!this.hasFill()) {
          var c = this.strokeContainThreshold;
          u = Math.max(u, c ?? 4);
        }
        l > 1e-10 && (s.width += u / l, s.height += u / l, s.x -= u / l / 2, s.y -= u / l / 2);
      }
      return s;
    }
    return r;
  }, t.prototype.contain = function(r, i) {
    var n = this.transformCoordToLocal(r, i), a = this.getBoundingRect(), o = this.style;
    if (r = n[0], i = n[1], a.contain(r, i)) {
      var s = this.path;
      if (this.hasStroke()) {
        var l = o.lineWidth, u = o.strokeNoScale ? this.getLineScale() : 1;
        if (u > 1e-10 && (this.hasFill() || (l = Math.max(l, this.strokeContainThreshold)), RC(s, l / u, r, i)))
          return !0;
      }
      if (this.hasFill())
        return PC(s, r, i);
    }
    return !1;
  }, t.prototype.dirtyShape = function() {
    this.__dirty |= Ui, this._rect && (this._rect = null), this._decalEl && this._decalEl.dirtyShape(), this.markRedraw();
  }, t.prototype.dirty = function() {
    this.dirtyStyle(), this.dirtyShape();
  }, t.prototype.animateShape = function(r) {
    return this.animate("shape", r);
  }, t.prototype.updateDuringAnimation = function(r) {
    r === "style" ? this.dirtyStyle() : r === "shape" ? this.dirtyShape() : this.markRedraw();
  }, t.prototype.attrKV = function(r, i) {
    r === "shape" ? this.setShape(i) : e.prototype.attrKV.call(this, r, i);
  }, t.prototype.setShape = function(r, i) {
    var n = this.shape;
    return n || (n = this.shape = {}), typeof r == "string" ? n[r] = i : P(n, r), this.dirtyShape(), this;
  }, t.prototype.shapeChanged = function() {
    return !!(this.__dirty & Ui);
  }, t.prototype.createStyle = function(r) {
    return ns(Bp, r);
  }, t.prototype._innerSaveToNormal = function(r) {
    e.prototype._innerSaveToNormal.call(this, r);
    var i = this._normalState;
    r.shape && !i.shape && (i.shape = P({}, this.shape));
  }, t.prototype._applyStateObj = function(r, i, n, a, o, s) {
    if (e.prototype._applyStateObj.call(this, r, i, n, a, o, s), this.__inHover !== ls) {
      var l = !(i && a), u;
      if (i && i.shape ? o ? a ? u = i.shape : (u = P({}, n.shape), P(u, i.shape)) : (u = P({}, a ? this.shape : n.shape), P(u, i.shape)) : l && (u = n.shape), u)
        if (o) {
          this.shape = P({}, this.shape);
          for (var c = {}, h = yt(u), v = 0; v < h.length; v++) {
            var f = h[v];
            typeof u[f] == "object" ? this.shape[f] = u[f] : c[f] = u[f];
          }
          this._transitionState(r, {
            shape: c
          }, s);
        } else
          this.shape = u, this.dirtyShape();
    }
  }, t.prototype._mergeStates = function(r) {
    for (var i = e.prototype._mergeStates.call(this, r), n, a = 0; a < r.length; a++) {
      var o = r[a];
      o.shape && (n = n || {}, this._mergeStyle(n, o.shape));
    }
    return n && (i.shape = n), i;
  }, t.prototype.getAnimationStyleProps = function() {
    return OC;
  }, t.prototype.isZeroArea = function() {
    return !1;
  }, t.extend = function(r) {
    var i = (function(a) {
      Q(o, a);
      function o(s) {
        var l = a.call(this, s) || this;
        return r.init && r.init.call(l, s), l;
      }
      return o.prototype.getDefaultStyle = function() {
        return tt(r.style);
      }, o.prototype.getDefaultShape = function() {
        return tt(r.shape);
      }, o;
    })(t);
    for (var n in r)
      typeof r[n] == "function" && (i.prototype[n] = r[n]);
    return i;
  }, t.initDefaultProps = (function() {
    var r = t.prototype;
    r.type = "path", r.strokeContainThreshold = 5, r.segmentIgnoreThreshold = 0, r.subPixelOptimize = !1, r.autoBatch = !1, r.__dirty = jt | Ln | Ui;
  })(), t;
})(ma), BC = wt({
  strokeFirst: !0,
  font: Dr,
  x: 0,
  y: 0,
  textAlign: "left",
  textBaseline: "top",
  miterLimit: 2
}, Bp), Oo = (function(e) {
  Q(t, e);
  function t() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return t.prototype.hasStroke = function() {
    return Pp(this.style);
  }, t.prototype.hasFill = function() {
    var r = this.style, i = r.fill;
    return i != null && i !== "none";
  }, t.prototype.createStyle = function(r) {
    return ns(BC, r);
  }, t.prototype.setBoundingRect = function(r) {
    this._rect = r;
  }, t.prototype.getBoundingRect = function() {
    return this._rect || (this._rect = yC(this.style)), this._rect;
  }, t.initDefaultProps = (function() {
    var r = t.prototype;
    r.dirtyRectTolerance = 10;
  })(), t;
})(ma);
Oo.prototype.type = "tspan";
var NC = wt({
  x: 0,
  y: 0
}, di), FC = {
  style: wt({
    x: !0,
    y: !0,
    width: !0,
    height: !0,
    sx: !0,
    sy: !0,
    sWidth: !0,
    sHeight: !0
  }, vs.style)
};
function UC(e) {
  return !!(e && typeof e != "string" && e.width && e.height);
}
var _i = (function(e) {
  Q(t, e);
  function t() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return t.prototype.createStyle = function(r) {
    return ns(NC, r);
  }, t.prototype._getSize = function(r) {
    var i = this.style, n = i[r];
    if (n != null)
      return n;
    var a = UC(i.image) ? i.image : this.__image;
    if (!a)
      return 0;
    var o = r === "width" ? "height" : "width", s = i[o];
    return s == null ? a[r] : a[r] / a[o] * s;
  }, t.prototype.getWidth = function() {
    return this._getSize("width");
  }, t.prototype.getHeight = function() {
    return this._getSize("height");
  }, t.prototype.getAnimationStyleProps = function() {
    return FC;
  }, t.prototype.getBoundingRect = function() {
    var r = this.style;
    return this._rect || (this._rect = new Y(r.x || 0, r.y || 0, this.getWidth(), this.getHeight())), this._rect;
  }, t;
})(ma);
_i.prototype.type = "image";
function zC(e, t) {
  var r = t.x, i = t.y, n = t.width, a = t.height, o = t.r, s, l, u, c;
  n < 0 && (r = r + n, n = -n), a < 0 && (i = i + a, a = -a), typeof o == "number" ? s = l = u = c = o : o instanceof Array ? o.length === 1 ? s = l = u = c = o[0] : o.length === 2 ? (s = u = o[0], l = c = o[1]) : o.length === 3 ? (s = o[0], l = c = o[1], u = o[2]) : (s = o[0], l = o[1], u = o[2], c = o[3]) : s = l = u = c = 0;
  var h;
  s + l > n && (h = s + l, s *= n / h, l *= n / h), u + c > n && (h = u + c, u *= n / h, c *= n / h), l + u > a && (h = l + u, l *= a / h, u *= a / h), s + c > a && (h = s + c, s *= a / h, c *= a / h), e.moveTo(r + s, i), e.lineTo(r + n - l, i), l !== 0 && e.arc(r + n - l, i + l, l, -Math.PI / 2, 0), e.lineTo(r + n, i + a - u), u !== 0 && e.arc(r + n - u, i + a - u, u, 0, Math.PI / 2), e.lineTo(r + c, i + a), c !== 0 && e.arc(r + c, i + a - c, c, Math.PI / 2, Math.PI), e.lineTo(r, i + s), s !== 0 && e.arc(r + s, i + s, s, Math.PI, Math.PI * 1.5), e.closePath();
}
var Yi = Math.round;
function Np(e, t, r) {
  if (t) {
    var i = t.x1, n = t.x2, a = t.y1, o = t.y2;
    e.x1 = i, e.x2 = n, e.y1 = a, e.y2 = o;
    var s = r && r.lineWidth;
    return s && (Yi(i * 2) === Yi(n * 2) && (e.x1 = e.x2 = si(i, s, !0)), Yi(a * 2) === Yi(o * 2) && (e.y1 = e.y2 = si(a, s, !0))), e;
  }
}
function Fp(e, t, r) {
  if (t) {
    var i = t.x, n = t.y, a = t.width, o = t.height;
    e.x = i, e.y = n, e.width = a, e.height = o;
    var s = r && r.lineWidth;
    return s && (e.x = si(i, s, !0), e.y = si(n, s, !0), e.width = Math.max(si(i + a, s, !1) - e.x, a === 0 ? 0 : 1), e.height = Math.max(si(n + o, s, !1) - e.y, o === 0 ? 0 : 1)), e;
  }
}
function si(e, t, r) {
  if (!t)
    return e;
  var i = Yi(e * 2);
  return (i + Yi(t)) % 2 === 0 ? i / 2 : (i + (r ? 1 : -1)) / 2;
}
var VC = /* @__PURE__ */ (function() {
  function e() {
    this.x = 0, this.y = 0, this.width = 0, this.height = 0;
  }
  return e;
})(), HC = {}, oe = (function(e) {
  Q(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new VC();
  }, t.prototype.buildPath = function(r, i) {
    var n, a, o, s;
    if (this.subPixelOptimize) {
      var l = Fp(HC, i, this.style);
      n = l.x, a = l.y, o = l.width, s = l.height, l.r = i.r, i = l;
    } else
      n = i.x, a = i.y, o = i.width, s = i.height;
    i.r ? zC(r, i) : r.rect(n, a, o, s);
  }, t.prototype.isZeroArea = function() {
    return !this.shape.width || !this.shape.height;
  }, t;
})(ht);
oe.prototype.type = "rect";
var _f = {
  fill: "#000"
}, wf = 2, Ee = {}, WC = {
  style: wt({
    fill: !0,
    stroke: !0,
    fillOpacity: !0,
    strokeOpacity: !0,
    lineWidth: !0,
    fontSize: !0,
    lineHeight: !0,
    width: !0,
    height: !0,
    textShadowColor: !0,
    textShadowBlur: !0,
    textShadowOffsetX: !0,
    textShadowOffsetY: !0,
    backgroundColor: !0,
    padding: !0,
    borderColor: !0,
    borderWidth: !0,
    borderRadius: !0
  }, vs.style)
}, xe = (function(e) {
  Q(t, e);
  function t(r) {
    var i = e.call(this) || this;
    return i.type = "text", i._children = [], i._defaultStyle = _f, i.attr(r), i;
  }
  return t.prototype.childrenRef = function() {
    return this._children;
  }, t.prototype.update = function() {
    e.prototype.update.call(this), this.styleChanged() && this._updateSubTexts();
    for (var r = 0; r < this._children.length; r++) {
      var i = this._children[r];
      i.zlevel = this.zlevel, i.z = this.z, i.z2 = this.z2, i.culling = this.culling, i.cursor = this.cursor, i.invisible = this.invisible;
    }
  }, t.prototype.updateTransform = function() {
    var r = this.innerTransformable;
    r ? (r.updateTransform(), r.transform && (this.transform = r.transform)) : e.prototype.updateTransform.call(this);
  }, t.prototype.getLocalTransform = function(r) {
    var i = this.innerTransformable;
    return i ? i.getLocalTransform(r) : e.prototype.getLocalTransform.call(this, r);
  }, t.prototype.getComputedTransform = function() {
    return this.__hostTarget && (this.__hostTarget.getComputedTransform(), this.__hostTarget.updateInnerText(!0)), e.prototype.getComputedTransform.call(this);
  }, t.prototype._updateSubTexts = function() {
    this._childCursor = 0, ZC(this.style), this.style.rich ? this._updateRichTexts() : this._updatePlainTexts(), this._children.length = this._childCursor, this.styleUpdated();
  }, t.prototype.addSelfToZr = function(r) {
    e.prototype.addSelfToZr.call(this, r);
    for (var i = 0; i < this._children.length; i++)
      this._children[i].__zr = r;
  }, t.prototype.removeSelfFromZr = function(r) {
    e.prototype.removeSelfFromZr.call(this, r);
    for (var i = 0; i < this._children.length; i++)
      this._children[i].__zr = null;
  }, t.prototype.getBoundingRect = function() {
    if (this.styleChanged() && this._updateSubTexts(), !this._rect) {
      for (var r = new Y(0, 0, 0, 0), i = this._children, n = [], a = null, o = 0; o < i.length; o++) {
        var s = i[o], l = s.getBoundingRect(), u = s.getLocalTransform(n);
        u ? (r.copy(l), r.applyTransform(u), a = a || r.clone(), a.union(r)) : (a = a || l.clone(), a.union(l));
      }
      this._rect = a || r;
    }
    return this._rect;
  }, t.prototype.setDefaultTextStyle = function(r) {
    this._defaultStyle = r || _f;
  }, t.prototype.setTextContent = function(r) {
  }, t.prototype._mergeStyle = function(r, i) {
    if (!i)
      return r;
    var n = i.rich, a = r.rich || n && {};
    return P(r, i), n && a ? (this._mergeRich(a, n), r.rich = a) : a && (r.rich = a), r;
  }, t.prototype._mergeRich = function(r, i) {
    for (var n = yt(i), a = 0; a < n.length; a++) {
      var o = n[a];
      r[o] = r[o] || {}, P(r[o], i[o]);
    }
  }, t.prototype.getAnimationStyleProps = function() {
    return WC;
  }, t.prototype._getOrCreateChild = function(r) {
    var i = this._children[this._childCursor];
    return (!i || !(i instanceof r)) && (i = new r()), this._children[this._childCursor++] = i, i.__zr = this.__zr, i.parent = this, i;
  }, t.prototype._updatePlainTexts = function() {
    var r = this.style, i = r.font || Dr, n = r.padding, a = this._defaultStyle, o = r.x || 0, s = r.y || 0, l = r.align || a.align || "left", u = r.verticalAlign || a.verticalAlign || "top";
    hf(Ee, a.overflowRect, o, s, l, u), o = Ee.baseX, s = Ee.baseY;
    var c = Mf(r), h = hC(c, r, Ee.outerWidth, Ee.outerHeight), v = fl(r), f = !!r.backgroundColor, d = h.outerHeight, g = h.outerWidth, p = h.lines, m = h.lineHeight;
    this.isTruncated = !!h.isTruncated;
    var y = o, _ = vi(s, h.contentHeight, u);
    if (v || n) {
      var w = rn(o, g, l), b = vi(s, d, u);
      v && this._renderBackground(r, r, w, b, g, d);
    }
    _ += m / 2, n && (y = Af(o, l, n), u === "top" ? _ += n[0] : u === "bottom" && (_ -= n[2]));
    for (var S = 0, T = !1, C = !1, x = Cf("fill" in r ? r.fill : (C = !0, a.fill)), M = Tf("stroke" in r ? r.stroke : !f && (!a.autoStroke || C) ? (S = wf, T = !0, a.stroke) : null), D = r.textShadowBlur > 0, I = 0; I < p.length; I++) {
      var k = this._getOrCreateChild(Oo), L = k.createStyle();
      k.useStyle(L), L.text = p[I], L.x = y, L.y = _, L.textAlign = l, L.textBaseline = "middle", L.opacity = r.opacity, L.strokeFirst = !0, D && (L.shadowBlur = r.textShadowBlur || 0, L.shadowColor = r.textShadowColor || "transparent", L.shadowOffsetX = r.textShadowOffsetX || 0, L.shadowOffsetY = r.textShadowOffsetY || 0), L.stroke = M, L.fill = x, M && (L.lineWidth = r.lineWidth || S, L.lineDash = r.lineDash, L.lineDashOffset = r.lineDashOffset || 0), L.font = i, Sf(L, r), _ += m, k.setBoundingRect(_u(L, h.contentWidth, h.calculatedLineHeight, T ? 0 : null));
    }
  }, t.prototype._updateRichTexts = function() {
    var r = this.style, i = this._defaultStyle, n = r.align || i.align, a = r.verticalAlign || i.verticalAlign, o = r.x || 0, s = r.y || 0;
    hf(Ee, i.overflowRect, o, s, n, a), o = Ee.baseX, s = Ee.baseY;
    var l = Mf(r), u = dC(l, r, Ee.outerWidth, Ee.outerHeight, n), c = u.width, h = u.outerWidth, v = u.outerHeight, f = r.padding;
    this.isTruncated = !!u.isTruncated;
    var d = rn(o, h, n), g = vi(s, v, a), p = d, m = g;
    f && (p += f[3], m += f[0]);
    var y = p + c;
    fl(r) && this._renderBackground(r, r, d, g, h, v);
    for (var _ = !!r.backgroundColor, w = 0; w < u.lines.length; w++) {
      for (var b = u.lines[w], S = b.tokens, T = S.length, C = b.lineHeight, x = b.width, M = 0, D = p, I = y, k = T - 1, L = void 0; M < T && (L = S[M], !L.align || L.align === "left"); )
        this._placeToken(L, r, C, m, D, "left", _), x -= L.width, D += L.width, M++;
      for (; k >= 0 && (L = S[k], L.align === "right"); )
        this._placeToken(L, r, C, m, I, "right", _), x -= L.width, I -= L.width, k--;
      for (D += (c - (D - p) - (y - I) - x) / 2; M <= k; )
        L = S[M], this._placeToken(L, r, C, m, D + L.width / 2, "center", _), D += L.width, M++;
      m += C;
    }
  }, t.prototype._placeToken = function(r, i, n, a, o, s, l) {
    var u = i.rich[r.styleName] || {};
    u.text = r.text;
    var c = r.verticalAlign, h = a + n / 2;
    c === "top" ? h = a + r.height / 2 : c === "bottom" && (h = a + n - r.height / 2);
    var v = !r.isLineHolder && fl(u);
    v && this._renderBackground(u, i, s === "right" ? o - r.width : s === "center" ? o - r.width / 2 : o, h - r.height / 2, r.width, r.height);
    var f = !!u.backgroundColor, d = r.textPadding;
    d && (o = Af(o, s, d), h -= r.height / 2 - d[0] - r.innerHeight / 2);
    var g = this._getOrCreateChild(Oo), p = g.createStyle();
    g.useStyle(p);
    var m = this._defaultStyle, y = !1, _ = 0, w = !1, b = Cf("fill" in u ? u.fill : "fill" in i ? i.fill : (y = !0, m.fill)), S = Tf("stroke" in u ? u.stroke : "stroke" in i ? i.stroke : !f && !l && (!m.autoStroke || y) ? (_ = wf, w = !0, m.stroke) : null), T = u.textShadowBlur > 0 || i.textShadowBlur > 0;
    p.text = r.text, p.x = o, p.y = h, T && (p.shadowBlur = u.textShadowBlur || i.textShadowBlur || 0, p.shadowColor = u.textShadowColor || i.textShadowColor || "transparent", p.shadowOffsetX = u.textShadowOffsetX || i.textShadowOffsetX || 0, p.shadowOffsetY = u.textShadowOffsetY || i.textShadowOffsetY || 0), p.textAlign = s, p.textBaseline = "middle", p.font = r.font || Dr, p.opacity = ci(u.opacity, i.opacity, 1), Sf(p, u), S && (p.lineWidth = ci(u.lineWidth, i.lineWidth, _), p.lineDash = W(u.lineDash, i.lineDash), p.lineDashOffset = i.lineDashOffset || 0, p.stroke = S), b && (p.fill = b), g.setBoundingRect(_u(p, r.contentWidth, r.contentHeight, w ? 0 : null));
  }, t.prototype._renderBackground = function(r, i, n, a, o, s) {
    var l = r.backgroundColor, u = r.borderWidth, c = r.borderColor, h = l && l.image, v = l && !h, f = r.borderRadius, d = this, g, p;
    if (v || r.lineHeight || u && c) {
      g = this._getOrCreateChild(oe), g.useStyle(g.createStyle()), g.style.fill = null;
      var m = g.shape;
      m.x = n, m.y = a, m.width = o, m.height = s, m.r = f, g.dirtyShape();
    }
    if (v) {
      var y = g.style;
      y.fill = l || null, y.fillOpacity = W(r.fillOpacity, 1);
    } else if (h) {
      p = this._getOrCreateChild(_i), p.onload = function() {
        d.dirtyStyle();
      };
      var _ = p.style;
      _.image = l.image, _.x = n, _.y = a, _.width = o, _.height = s;
    }
    if (u && c) {
      var y = g.style;
      y.lineWidth = u, y.stroke = c, y.strokeOpacity = W(r.strokeOpacity, 1), y.lineDash = r.borderDash, y.lineDashOffset = r.borderDashOffset || 0, g.strokeContainThreshold = 0, g.hasFill() && g.hasStroke() && (y.strokeFirst = !0, y.lineWidth *= 2);
    }
    var w = (g || p).style;
    w.shadowBlur = r.shadowBlur || 0, w.shadowColor = r.shadowColor || "transparent", w.shadowOffsetX = r.shadowOffsetX || 0, w.shadowOffsetY = r.shadowOffsetY || 0, w.opacity = ci(r.opacity, i.opacity, 1);
  }, t.makeFont = function(r) {
    var i = "";
    return qC(r) && (i = [
      r.fontStyle,
      r.fontWeight,
      XC(r.fontSize),
      r.fontFamily || "sans-serif"
    ].join(" ")), i && Be(i) || r.textFont || r.font;
  }, t;
})(ma), GC = { left: !0, right: 1, center: 1 }, YC = { top: 1, bottom: 1, middle: 1 }, bf = ["fontStyle", "fontWeight", "fontSize", "fontFamily"];
function XC(e) {
  return typeof e == "string" && (e.indexOf("px") !== -1 || e.indexOf("rem") !== -1 || e.indexOf("em") !== -1) ? e : isNaN(+e) ? lc + "px" : e + "px";
}
function Sf(e, t) {
  for (var r = 0; r < bf.length; r++) {
    var i = bf[r], n = t[i];
    n != null && (e[i] = n);
  }
}
function qC(e) {
  return e.fontSize != null || e.fontFamily || e.fontWeight;
}
function ZC(e) {
  return xf(e), A(e.rich, xf), e;
}
function xf(e) {
  if (e) {
    e.font = xe.makeFont(e);
    var t = e.align;
    t === "middle" && (t = "center"), e.align = t == null || GC[t] ? t : "left";
    var r = e.verticalAlign;
    r === "center" && (r = "middle"), e.verticalAlign = r == null || YC[r] ? r : "top";
    var i = e.padding;
    i && (e.padding = vc(e.padding));
  }
}
function Tf(e, t) {
  return e == null || t <= 0 || e === "transparent" || e === "none" ? null : e.image || e.colorStops ? "#000" : e;
}
function Cf(e) {
  return e == null || e === "none" ? null : e.image || e.colorStops ? "#000" : e;
}
function Af(e, t, r) {
  return t === "right" ? e - r[1] : t === "center" ? e + r[3] / 2 - r[1] / 2 : e + r[3];
}
function Mf(e) {
  var t = e.text;
  return t != null && (t += ""), t;
}
function fl(e) {
  return !!(e.backgroundColor || e.lineHeight || e.borderWidth && e.borderColor);
}
var xt = st(), QC = function(e, t, r, i) {
  if (i) {
    var n = xt(i);
    n.dataIndex = r, n.dataType = t, n.seriesIndex = e, n.ssrType = "chart", i.type === "group" && i.traverse(function(a) {
      var o = xt(a);
      o.seriesIndex = e, o.dataIndex = r, o.dataType = t, o.ssrType = "chart";
    });
  }
}, ds = "undefined", Up = "series", zp = et(["tooltip", "label", "itemName", "itemId", "itemGroupId", "itemChildGroupId", "seriesName"]), Ce = "original", zt = "arrayRows", ye = "objectRows", Ae = "keyedColumns", Cr = "typedArray", Vp = "unknown", Xe = "column", wi = "row", KC = [
  "getDom",
  "getZr",
  "getWidth",
  "getHeight",
  "getDevicePixelRatio",
  "dispatchAction",
  "isSSR",
  "isDisposed",
  "on",
  "off",
  "getDataURL",
  "getConnectedDataURL",
  // 'getModel',
  "getOption",
  // 'getViewOfComponentModel',
  // 'getViewOfSeriesModel',
  "getId",
  "updateLabelLayout"
], Hp = (
  /** @class */
  /* @__PURE__ */ (function() {
    function e(t) {
      A(KC, function(r) {
        this[r] = ft(t[r], t);
      }, this);
    }
    return e;
  })()
);
function JC(e, t) {
  return t.mainType === Up ? e.getViewOfSeriesModel(t) : e.getViewOfComponentModel(t);
}
var Df = 1, kf = {}, Wp = st(), Cc = st(), Gp = 0, Ac = 1, Mc = 2, Ze = ["emphasis", "blur", "select"], Bo = ["normal", "emphasis", "blur", "select"], jC = 10, $C = 9, pi = "highlight", fo = "downplay", No = "select", Su = "unselect", Fo = "toggleSelect", Dc = "selectchanged";
function ki(e) {
  return e != null && e !== "none";
}
function ps(e, t, r) {
  e.onHoverStateChange && (e.hoverState || 0) !== r && e.onHoverStateChange(t), e.hoverState = r;
}
function Yp(e) {
  ps(e, "emphasis", Mc);
}
function Xp(e) {
  e.hoverState === Mc && ps(e, "normal", Gp);
}
function kc(e) {
  ps(e, "blur", Ac);
}
function qp(e) {
  e.hoverState === Ac && ps(e, "normal", Gp);
}
function tA(e) {
  e.selected = !0;
}
function eA(e) {
  e.selected = !1;
}
function Lf(e, t, r) {
  t(e, r);
}
function ur(e, t, r) {
  Lf(e, t, r), e.isGroup && e.traverse(function(i) {
    Lf(i, t, r);
  });
}
function rA(e, t, r, i) {
  for (var n = e.style, a = {}, o = 0; o < t.length; o++) {
    var s = t[o], l = n[s];
    a[s] = l ?? (i && i[s]);
  }
  for (var o = 0; o < e.animators.length; o++) {
    var u = e.animators[o];
    u.__fromStateTransition && u.__fromStateTransition.indexOf(r) < 0 && u.targetName === "style" && u.saveTo(a, t);
  }
  return a;
}
function iA(e, t, r, i) {
  var n = r && dt(r, "select") >= 0, a = !1;
  if (e instanceof ht) {
    var o = Wp(e), s = n && o.selectFill || o.normalFill, l = n && o.selectStroke || o.normalStroke;
    if (ki(s) || ki(l)) {
      i = i || {};
      var u = i.style || {};
      u.fill === "inherit" ? (a = !0, i = P({}, i), u = P({}, u), u.fill = s) : !ki(u.fill) && ki(s) ? (a = !0, i = P({}, i), u = P({}, u), u.fill = Wh(s)) : !ki(u.stroke) && ki(l) && (a || (i = P({}, i), u = P({}, u)), u.stroke = Wh(l)), i.style = u;
    }
  }
  if (i && i.z2 == null) {
    a || (i = P({}, i));
    var c = e.z2EmphasisLift;
    i.z2 = e.z2 + (c ?? jC);
  }
  return i;
}
function nA(e, t, r) {
  if (r && r.z2 == null) {
    r = P({}, r);
    var i = e.z2SelectLift;
    r.z2 = e.z2 + (i ?? $C);
  }
  return r;
}
function aA(e, t, r) {
  var i = dt(e.currentStates, t) >= 0, n = e.style.opacity, a = i ? null : rA(e, ["opacity"], t, {
    opacity: 1
  });
  r = r || {};
  var o = r.style || {};
  return o.opacity == null && (r = P({}, r), o = P({
    // Already being applied 'emphasis'. DON'T mul opacity multiple times.
    opacity: i ? n : a.opacity * 0.1
  }, o), r.style = o), r;
}
function vl(e, t) {
  var r = this.states[e];
  if (this.style) {
    if (e === "emphasis")
      return iA(this, e, t, r);
    if (e === "blur")
      return aA(this, e, r);
    if (e === "select")
      return nA(this, e, r);
  }
  return r;
}
function oA(e) {
  e.stateProxy = vl;
  var t = e.getTextContent(), r = e.getTextGuideLine();
  t && (t.stateProxy = vl), r && (r.stateProxy = vl);
}
function If(e, t) {
  !Jp(e, t) && !e.__highByOuter && ur(e, Yp);
}
function Ef(e, t) {
  !Jp(e, t) && !e.__highByOuter && ur(e, Xp);
}
function xu(e, t) {
  e.__highByOuter |= 1 << (t || 0), ur(e, Yp);
}
function Tu(e, t) {
  !(e.__highByOuter &= ~(1 << (t || 0))) && ur(e, Xp);
}
function sA(e) {
  ur(e, kc);
}
function Zp(e) {
  ur(e, qp);
}
function Qp(e) {
  ur(e, tA);
}
function Kp(e) {
  ur(e, eA);
}
function Jp(e, t) {
  return e.__highDownSilentOnTouch && t.zrByTouch;
}
function jp(e) {
  var t = e.getModel(), r = [], i = [];
  t.eachComponent(function(n, a) {
    var o = Cc(a), s = JC(e, a), l = n === "series";
    !l && i.push(s), o.isBlured && (s.group.traverse(function(u) {
      qp(u);
    }), l && r.push(a)), o.isBlured = !1;
  }), A(i, function(n) {
    n && n.toggleBlurSeries && n.toggleBlurSeries(r, !1, t);
  });
}
function Cu(e, t, r, i) {
  var n = i.getModel();
  r = r || "coordinateSystem";
  function a(u, c) {
    for (var h = 0; h < c.length; h++) {
      var v = u.getItemGraphicEl(c[h]);
      v && Zp(v);
    }
  }
  if (e != null && !(!t || t === "none")) {
    var o = n.getSeriesByIndex(e), s = o.coordinateSystem;
    s && s.master && (s = s.master);
    var l = [];
    n.eachSeries(function(u) {
      var c = o === u, h = u.coordinateSystem;
      h && h.master && (h = h.master);
      var v = h && s ? h === s : c;
      if (!// Not blur other series if blurScope series
      (r === "series" && !c || r === "coordinateSystem" && !v || t === "series" && c)) {
        var f = i.getViewOfSeriesModel(u);
        if (f.group.traverse(function(p) {
          p.__highByOuter && c && t === "self" || kc(p);
        }), te(t))
          a(u.getData(), t);
        else if (H(t))
          for (var d = yt(t), g = 0; g < d.length; g++)
            a(u.getData(d[g]), t[d[g]]);
        l.push(u), Cc(u).isBlured = !0;
      }
    }), n.eachComponent(function(u, c) {
      if (u !== "series") {
        var h = i.getViewOfComponentModel(c);
        h && h.toggleBlurSeries && h.toggleBlurSeries(l, !0, n);
      }
    });
  }
}
function Au(e, t, r) {
  if (!(e == null || t == null)) {
    var i = r.getModel().getComponent(e, t);
    if (i) {
      Cc(i).isBlured = !0;
      var n = r.getViewOfComponentModel(i);
      !n || !n.focusBlurEnabled || n.group.traverse(function(a) {
        kc(a);
      });
    }
  }
}
function lA(e, t, r) {
  var i = e.seriesIndex, n = e.getData(t.dataType);
  if (n) {
    var a = pa(n, t);
    a = (F(a) ? a[0] : a) || 0;
    var o = n.getItemGraphicEl(a);
    if (!o)
      for (var s = n.count(), l = 0; !o && l < s; )
        o = n.getItemGraphicEl(l++);
    if (o) {
      var u = xt(o);
      Cu(i, u.focus, u.blurScope, r);
    } else {
      var c = e.get(["emphasis", "focus"]), h = e.get(["emphasis", "blurScope"]);
      c != null && Cu(i, c, h, r);
    }
  }
}
function Lc(e, t, r, i) {
  var n = {
    focusSelf: !1,
    dispatchers: null
  };
  if (e == null || e === "series" || t == null || r == null)
    return n;
  var a = i.getModel().getComponent(e, t);
  if (!a)
    return n;
  var o = i.getViewOfComponentModel(a);
  if (!o || !o.findHighDownDispatchers)
    return n;
  for (var s = o.findHighDownDispatchers(r), l, u = 0; u < s.length; u++)
    if (xt(s[u]).focus === "self") {
      l = !0;
      break;
    }
  return {
    focusSelf: l,
    dispatchers: s
  };
}
function uA(e, t, r) {
  var i = xt(e), n = Lc(i.componentMainType, i.componentIndex, i.componentHighDownName, r), a = n.dispatchers, o = n.focusSelf;
  a ? (o && Au(i.componentMainType, i.componentIndex, r), A(a, function(s) {
    return If(s, t);
  })) : (Cu(i.seriesIndex, i.focus, i.blurScope, r), i.focus === "self" && Au(i.componentMainType, i.componentIndex, r), If(e, t));
}
function cA(e, t, r) {
  jp(r);
  var i = xt(e), n = Lc(i.componentMainType, i.componentIndex, i.componentHighDownName, r).dispatchers;
  n ? A(n, function(a) {
    return Ef(a, t);
  }) : Ef(e, t);
}
function hA(e, t, r) {
  if (Du(t)) {
    var i = t.dataType, n = e.getData(i), a = pa(n, t);
    F(a) || (a = [a]), e[t.type === Fo ? "toggleSelect" : t.type === No ? "select" : "unselect"](a, i);
  }
}
function Pf(e) {
  var t = e.getAllData();
  A(t, function(r) {
    var i = r.data, n = r.type;
    i.eachItemGraphicEl(function(a, o) {
      e.isSelected(o, n) ? Qp(a) : Kp(a);
    });
  });
}
function fA(e) {
  var t = [];
  return e.eachSeries(function(r) {
    var i = r.getAllData();
    A(i, function(n) {
      n.data;
      var a = n.type, o = r.getSelectedDataIndices();
      if (o.length > 0) {
        var s = {
          dataIndex: o,
          seriesIndex: r.seriesIndex
        };
        a != null && (s.dataType = a), t.push(s);
      }
    });
  }), t;
}
function vA(e, t, r) {
  $p(e, !0), ur(e, oA), gA(e, t, r);
}
function dA(e) {
  $p(e, !1);
}
function pA(e, t, r, i) {
  i ? dA(e) : vA(e, t, r);
}
function gA(e, t, r) {
  var i = xt(e);
  t != null ? (i.focus = t, i.blurScope = r) : i.focus && (i.focus = null);
}
var Rf = ["emphasis", "blur", "select"], mA = {
  itemStyle: "getItemStyle",
  lineStyle: "getLineStyle",
  areaStyle: "getAreaStyle"
};
function yA(e, t, r, i) {
  r = r || "itemStyle";
  for (var n = 0; n < Rf.length; n++) {
    var a = Rf[n], o = t.getModel([a, r]), s = e.ensureState(a);
    s.style = o[mA[r]]();
  }
}
function $p(e, t) {
  var r = t === !1, i = e;
  e.highDownSilentOnTouch && (i.__highDownSilentOnTouch = e.highDownSilentOnTouch), (!r || i.__highDownDispatcher) && (i.__highByOuter = i.__highByOuter || 0, i.__highDownDispatcher = !r);
}
function Mu(e) {
  return !!(e && e.__highDownDispatcher);
}
function _A(e) {
  var t = kf[e];
  return t == null && Df <= 32 && (t = kf[e] = Df++), t;
}
function Du(e) {
  var t = e.type;
  return t === No || t === Su || t === Fo;
}
function Of(e) {
  var t = e.type;
  return t === pi || t === fo;
}
function wA(e) {
  var t = Wp(e);
  t.normalFill = e.style.fill, t.normalStroke = e.style.stroke;
  var r = e.states.select || {};
  t.selectFill = r.style && r.style.fill || null, t.selectStroke = r.style && r.style.stroke || null;
}
var Li = on.CMD, bA = [[], [], []], Bf = Math.sqrt, SA = Math.atan2;
function xA(e, t) {
  if (t) {
    var r = e.data, i = e.len(), n, a, o, s, l, u, c = Li.M, h = Li.C, v = Li.L, f = Li.R, d = Li.A, g = Li.Q;
    for (o = 0, s = 0; o < i; ) {
      switch (n = r[o++], s = o, a = 0, n) {
        case c:
          a = 1;
          break;
        case v:
          a = 1;
          break;
        case h:
          a = 3;
          break;
        case g:
          a = 2;
          break;
        case d:
          var p = t[4], m = t[5], y = Bf(t[0] * t[0] + t[1] * t[1]), _ = Bf(t[2] * t[2] + t[3] * t[3]), w = SA(-t[1] / _, t[0] / y);
          r[o] *= y, r[o++] += p, r[o] *= _, r[o++] += m, r[o++] *= y, r[o++] *= _, r[o++] += w, r[o++] += w, o += 2, s = o;
          break;
        case f:
          u[0] = r[o++], u[1] = r[o++], Ve(u, u, t), r[s++] = u[0], r[s++] = u[1], u[0] += r[o++], u[1] += r[o++], Ve(u, u, t), r[s++] = u[0], r[s++] = u[1];
      }
      for (l = 0; l < a; l++) {
        var b = bA[l];
        b[0] = r[o++], b[1] = r[o++], Ve(b, b, t), r[s++] = b[0], r[s++] = b[1];
      }
    }
    e.increaseVersion();
  }
}
var dl = Math.sqrt, Pa = Math.sin, Ra = Math.cos, mn = Math.PI;
function Nf(e) {
  return Math.sqrt(e[0] * e[0] + e[1] * e[1]);
}
function ku(e, t) {
  return (e[0] * t[0] + e[1] * t[1]) / (Nf(e) * Nf(t));
}
function Ff(e, t) {
  return (e[0] * t[1] < e[1] * t[0] ? -1 : 1) * Math.acos(ku(e, t));
}
function Uf(e, t, r, i, n, a, o, s, l, u, c) {
  var h = l * (mn / 180), v = Ra(h) * (e - r) / 2 + Pa(h) * (t - i) / 2, f = -1 * Pa(h) * (e - r) / 2 + Ra(h) * (t - i) / 2, d = v * v / (o * o) + f * f / (s * s);
  d > 1 && (o *= dl(d), s *= dl(d));
  var g = (n === a ? -1 : 1) * dl((o * o * (s * s) - o * o * (f * f) - s * s * (v * v)) / (o * o * (f * f) + s * s * (v * v))) || 0, p = g * o * f / s, m = g * -s * v / o, y = (e + r) / 2 + Ra(h) * p - Pa(h) * m, _ = (t + i) / 2 + Pa(h) * p + Ra(h) * m, w = Ff([1, 0], [(v - p) / o, (f - m) / s]), b = [(v - p) / o, (f - m) / s], S = [(-1 * v - p) / o, (-1 * f - m) / s], T = Ff(b, S);
  if (ku(b, S) <= -1 && (T = mn), ku(b, S) >= 1 && (T = 0), T < 0) {
    var C = Math.round(T / mn * 1e6) / 1e6;
    T = mn * 2 + C % 2 * mn;
  }
  c.addData(u, y, _, o, s, w, T, h, a);
}
var TA = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/ig, CA = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;
function AA(e) {
  var t = new on();
  if (!e)
    return t;
  var r = 0, i = 0, n = r, a = i, o, s = on.CMD, l = e.match(TA);
  if (!l)
    return t;
  for (var u = 0; u < l.length; u++) {
    for (var c = l[u], h = c.charAt(0), v = void 0, f = c.match(CA) || [], d = f.length, g = 0; g < d; g++)
      f[g] = parseFloat(f[g]);
    for (var p = 0; p < d; ) {
      var m = void 0, y = void 0, _ = void 0, w = void 0, b = void 0, S = void 0, T = void 0, C = r, x = i, M = void 0, D = void 0;
      switch (h) {
        case "l":
          r += f[p++], i += f[p++], v = s.L, t.addData(v, r, i);
          break;
        case "L":
          r = f[p++], i = f[p++], v = s.L, t.addData(v, r, i);
          break;
        case "m":
          r += f[p++], i += f[p++], v = s.M, t.addData(v, r, i), n = r, a = i, h = "l";
          break;
        case "M":
          r = f[p++], i = f[p++], v = s.M, t.addData(v, r, i), n = r, a = i, h = "L";
          break;
        case "h":
          r += f[p++], v = s.L, t.addData(v, r, i);
          break;
        case "H":
          r = f[p++], v = s.L, t.addData(v, r, i);
          break;
        case "v":
          i += f[p++], v = s.L, t.addData(v, r, i);
          break;
        case "V":
          i = f[p++], v = s.L, t.addData(v, r, i);
          break;
        case "C":
          v = s.C, t.addData(v, f[p++], f[p++], f[p++], f[p++], f[p++], f[p++]), r = f[p - 2], i = f[p - 1];
          break;
        case "c":
          v = s.C, t.addData(v, f[p++] + r, f[p++] + i, f[p++] + r, f[p++] + i, f[p++] + r, f[p++] + i), r += f[p - 2], i += f[p - 1];
          break;
        case "S":
          m = r, y = i, M = t.len(), D = t.data, o === s.C && (m += r - D[M - 4], y += i - D[M - 3]), v = s.C, C = f[p++], x = f[p++], r = f[p++], i = f[p++], t.addData(v, m, y, C, x, r, i);
          break;
        case "s":
          m = r, y = i, M = t.len(), D = t.data, o === s.C && (m += r - D[M - 4], y += i - D[M - 3]), v = s.C, C = r + f[p++], x = i + f[p++], r += f[p++], i += f[p++], t.addData(v, m, y, C, x, r, i);
          break;
        case "Q":
          C = f[p++], x = f[p++], r = f[p++], i = f[p++], v = s.Q, t.addData(v, C, x, r, i);
          break;
        case "q":
          C = f[p++] + r, x = f[p++] + i, r += f[p++], i += f[p++], v = s.Q, t.addData(v, C, x, r, i);
          break;
        case "T":
          m = r, y = i, M = t.len(), D = t.data, o === s.Q && (m += r - D[M - 4], y += i - D[M - 3]), r = f[p++], i = f[p++], v = s.Q, t.addData(v, m, y, r, i);
          break;
        case "t":
          m = r, y = i, M = t.len(), D = t.data, o === s.Q && (m += r - D[M - 4], y += i - D[M - 3]), r += f[p++], i += f[p++], v = s.Q, t.addData(v, m, y, r, i);
          break;
        case "A":
          _ = f[p++], w = f[p++], b = f[p++], S = f[p++], T = f[p++], C = r, x = i, r = f[p++], i = f[p++], v = s.A, Uf(C, x, r, i, S, T, _, w, b, v, t);
          break;
        case "a":
          _ = f[p++], w = f[p++], b = f[p++], S = f[p++], T = f[p++], C = r, x = i, r += f[p++], i += f[p++], v = s.A, Uf(C, x, r, i, S, T, _, w, b, v, t);
          break;
      }
    }
    (h === "z" || h === "Z") && (v = s.Z, t.addData(v), r = n, i = a), o = v;
  }
  return t.toStatic(), t;
}
var tg = (function(e) {
  Q(t, e);
  function t() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return t.prototype.applyTransform = function(r) {
  }, t;
})(ht);
function eg(e) {
  return e.setData != null;
}
function rg(e, t) {
  var r = AA(e), i = P({}, t);
  return i.buildPath = function(n) {
    var a = eg(n);
    if (a && n.canSave()) {
      n.appendPath(r);
      var o = n.getContext();
      o && n.rebuildPath(o, 1);
    } else {
      var o = a ? n.getContext() : n;
      o && r.rebuildPath(o, 1);
    }
  }, i.applyTransform = function(n) {
    xA(r, n), this.dirtyShape();
  }, i;
}
function MA(e, t) {
  return new tg(rg(e, t));
}
function DA(e, t) {
  var r = rg(e, t), i = (function(n) {
    Q(a, n);
    function a(o) {
      var s = n.call(this, o) || this;
      return s.applyTransform = r.applyTransform, s.buildPath = r.buildPath, s;
    }
    return a;
  })(tg);
  return i;
}
function kA(e, t) {
  for (var r = [], i = e.length, n = 0; n < i; n++) {
    var a = e[n];
    r.push(a.getUpdatedPathProxy(!0));
  }
  var o = new ht(t);
  return o.createPathProxy(), o.buildPath = function(s) {
    if (eg(s)) {
      s.appendPath(r);
      var l = s.getContext();
      l && s.rebuildPath(l, 1);
    }
  }, o;
}
var LA = /* @__PURE__ */ (function() {
  function e() {
    this.cx = 0, this.cy = 0, this.r = 0;
  }
  return e;
})(), gs = (function(e) {
  Q(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new LA();
  }, t.prototype.buildPath = function(r, i) {
    r.moveTo(i.cx + i.r, i.cy), r.arc(i.cx, i.cy, i.r, 0, Math.PI * 2);
  }, t;
})(ht);
gs.prototype.type = "circle";
var IA = /* @__PURE__ */ (function() {
  function e() {
    this.cx = 0, this.cy = 0, this.rx = 0, this.ry = 0;
  }
  return e;
})(), Ic = (function(e) {
  Q(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new IA();
  }, t.prototype.buildPath = function(r, i) {
    var n = 0.5522848, a = i.cx, o = i.cy, s = i.rx, l = i.ry, u = s * n, c = l * n;
    r.moveTo(a - s, o), r.bezierCurveTo(a - s, o - c, a - u, o - l, a, o - l), r.bezierCurveTo(a + u, o - l, a + s, o - c, a + s, o), r.bezierCurveTo(a + s, o + c, a + u, o + l, a, o + l), r.bezierCurveTo(a - u, o + l, a - s, o + c, a - s, o), r.closePath();
  }, t;
})(ht);
Ic.prototype.type = "ellipse";
var ig = Math.PI, pl = ig * 2, Zr = Math.sin, Ii = Math.cos, EA = Math.acos, Nt = Math.atan2, zf = Math.abs, Gn = Math.sqrt, En = Math.max, Pe = Math.min, we = 1e-4;
function PA(e, t, r, i, n, a, o, s) {
  var l = r - e, u = i - t, c = o - n, h = s - a, v = h * l - c * u;
  if (!(v * v < we))
    return v = (c * (t - a) - h * (e - n)) / v, [e + v * l, t + v * u];
}
function Oa(e, t, r, i, n, a, o) {
  var s = e - r, l = t - i, u = (o ? a : -a) / Gn(s * s + l * l), c = u * l, h = -u * s, v = e + c, f = t + h, d = r + c, g = i + h, p = (v + d) / 2, m = (f + g) / 2, y = d - v, _ = g - f, w = y * y + _ * _, b = n - a, S = v * g - d * f, T = (_ < 0 ? -1 : 1) * Gn(En(0, b * b * w - S * S)), C = (S * _ - y * T) / w, x = (-S * y - _ * T) / w, M = (S * _ + y * T) / w, D = (-S * y + _ * T) / w, I = C - p, k = x - m, L = M - p, B = D - m;
  return I * I + k * k > L * L + B * B && (C = M, x = D), {
    cx: C,
    cy: x,
    x0: -c,
    y0: -h,
    x1: C * (n / b - 1),
    y1: x * (n / b - 1)
  };
}
function RA(e) {
  var t;
  if (F(e)) {
    var r = e.length;
    if (!r)
      return e;
    r === 1 ? t = [e[0], e[0], 0, 0] : r === 2 ? t = [e[0], e[0], e[1], e[1]] : r === 3 ? t = e.concat(e[2]) : t = e;
  } else
    t = [e, e, e, e];
  return t;
}
function OA(e, t) {
  var r, i = En(t.r, 0), n = En(t.r0 || 0, 0), a = i > 0, o = n > 0;
  if (!(!a && !o)) {
    if (a || (i = n, n = 0), n > i) {
      var s = i;
      i = n, n = s;
    }
    var l = t.startAngle, u = t.endAngle;
    if (!(isNaN(l) || isNaN(u))) {
      var c = t.cx, h = t.cy, v = !!t.clockwise, f = zf(u - l), d = f > pl && f % pl;
      if (d > we && (f = d), !(i > we))
        e.moveTo(c, h);
      else if (f > pl - we)
        e.moveTo(c + i * Ii(l), h + i * Zr(l)), e.arc(c, h, i, l, u, !v), n > we && (e.moveTo(c + n * Ii(u), h + n * Zr(u)), e.arc(c, h, n, u, l, v));
      else {
        var g = void 0, p = void 0, m = void 0, y = void 0, _ = void 0, w = void 0, b = void 0, S = void 0, T = void 0, C = void 0, x = void 0, M = void 0, D = void 0, I = void 0, k = void 0, L = void 0, B = i * Ii(l), N = i * Zr(l), q = n * Ii(u), U = n * Zr(u), z = f > we;
        if (z) {
          var V = t.cornerRadius;
          V && (r = RA(V), g = r[0], p = r[1], m = r[2], y = r[3]);
          var J = zf(i - n) / 2;
          if (_ = Pe(J, m), w = Pe(J, y), b = Pe(J, g), S = Pe(J, p), x = T = En(_, w), M = C = En(b, S), (T > we || C > we) && (D = i * Ii(u), I = i * Zr(u), k = n * Ii(l), L = n * Zr(l), f < ig)) {
            var j = PA(B, N, k, L, D, I, q, U);
            if (j) {
              var rt = B - j[0], ot = N - j[1], Mt = D - j[0], re = I - j[1], Vt = 1 / Zr(EA((rt * Mt + ot * re) / (Gn(rt * rt + ot * ot) * Gn(Mt * Mt + re * re))) / 2), Bt = Gn(j[0] * j[0] + j[1] * j[1]);
              x = Pe(T, (i - Bt) / (Vt + 1)), M = Pe(C, (n - Bt) / (Vt - 1));
            }
          }
        }
        if (!z)
          e.moveTo(c + B, h + N);
        else if (x > we) {
          var Et = Pe(m, x), bt = Pe(y, x), G = Oa(k, L, B, N, i, Et, v), $ = Oa(D, I, q, U, i, bt, v);
          e.moveTo(c + G.cx + G.x0, h + G.cy + G.y0), x < T && Et === bt ? e.arc(c + G.cx, h + G.cy, x, Nt(G.y0, G.x0), Nt($.y0, $.x0), !v) : (Et > 0 && e.arc(c + G.cx, h + G.cy, Et, Nt(G.y0, G.x0), Nt(G.y1, G.x1), !v), e.arc(c, h, i, Nt(G.cy + G.y1, G.cx + G.x1), Nt($.cy + $.y1, $.cx + $.x1), !v), bt > 0 && e.arc(c + $.cx, h + $.cy, bt, Nt($.y1, $.x1), Nt($.y0, $.x0), !v));
        } else
          e.moveTo(c + B, h + N), e.arc(c, h, i, l, u, !v);
        if (!(n > we) || !z)
          e.lineTo(c + q, h + U);
        else if (M > we) {
          var Et = Pe(g, M), bt = Pe(p, M), G = Oa(q, U, D, I, n, -bt, v), $ = Oa(B, N, k, L, n, -Et, v);
          e.lineTo(c + G.cx + G.x0, h + G.cy + G.y0), M < C && Et === bt ? e.arc(c + G.cx, h + G.cy, M, Nt(G.y0, G.x0), Nt($.y0, $.x0), !v) : (bt > 0 && e.arc(c + G.cx, h + G.cy, bt, Nt(G.y0, G.x0), Nt(G.y1, G.x1), !v), e.arc(c, h, n, Nt(G.cy + G.y1, G.cx + G.x1), Nt($.cy + $.y1, $.cx + $.x1), v), Et > 0 && e.arc(c + $.cx, h + $.cy, Et, Nt($.y1, $.x1), Nt($.y0, $.x0), !v));
        } else
          e.lineTo(c + q, h + U), e.arc(c, h, n, u, l, v);
      }
      e.closePath();
    }
  }
}
var BA = /* @__PURE__ */ (function() {
  function e() {
    this.cx = 0, this.cy = 0, this.r0 = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0, this.cornerRadius = 0;
  }
  return e;
})(), ya = (function(e) {
  Q(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new BA();
  }, t.prototype.buildPath = function(r, i) {
    OA(r, i);
  }, t.prototype.isZeroArea = function() {
    return this.shape.startAngle === this.shape.endAngle || this.shape.r === this.shape.r0;
  }, t;
})(ht);
ya.prototype.type = "sector";
var NA = /* @__PURE__ */ (function() {
  function e() {
    this.cx = 0, this.cy = 0, this.r = 0, this.r0 = 0;
  }
  return e;
})(), Ec = (function(e) {
  Q(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new NA();
  }, t.prototype.buildPath = function(r, i) {
    var n = i.cx, a = i.cy, o = Math.PI * 2;
    r.moveTo(n + i.r, a), r.arc(n, a, i.r, 0, o, !1), r.moveTo(n + i.r0, a), r.arc(n, a, i.r0, 0, o, !0);
  }, t;
})(ht);
Ec.prototype.type = "ring";
function FA(e, t, r, i) {
  var n = [], a = [], o = [], s = [], l, u, c, h;
  if (i) {
    c = [1 / 0, 1 / 0], h = [-1 / 0, -1 / 0];
    for (var v = 0, f = e.length; v < f; v++)
      Vi(c, c, e[v]), Hi(h, h, e[v]);
    Vi(c, c, i[0]), Hi(h, h, i[1]);
  }
  for (var v = 0, f = e.length; v < f; v++) {
    var d = e[v];
    if (r)
      l = e[v ? v - 1 : f - 1], u = e[(v + 1) % f];
    else if (v === 0 || v === f - 1) {
      n.push(ZS(e[v]));
      continue;
    } else
      l = e[v - 1], u = e[v + 1];
    QS(a, u, l), ks(a, a, t);
    var g = jl(d, l), p = jl(d, u), m = g + p;
    m !== 0 && (g /= m, p /= m), ks(o, a, -g), ks(s, a, p);
    var y = Th([], d, o), _ = Th([], d, s);
    i && (Hi(y, y, c), Vi(y, y, h), Hi(_, _, c), Vi(_, _, h)), n.push(y), n.push(_);
  }
  return r && n.push(n.shift()), n;
}
function ng(e, t, r) {
  var i = t.smooth, n = t.points;
  if (n && n.length >= 2) {
    if (i) {
      var a = FA(n, i, r, t.smoothConstraint);
      e.moveTo(n[0][0], n[0][1]);
      for (var o = n.length, s = 0; s < (r ? o : o - 1); s++) {
        var l = a[s * 2], u = a[s * 2 + 1], c = n[(s + 1) % o];
        e.bezierCurveTo(l[0], l[1], u[0], u[1], c[0], c[1]);
      }
    } else {
      e.moveTo(n[0][0], n[0][1]);
      for (var s = 1, h = n.length; s < h; s++)
        e.lineTo(n[s][0], n[s][1]);
    }
    r && e.closePath();
  }
}
var UA = /* @__PURE__ */ (function() {
  function e() {
    this.points = null, this.smooth = 0, this.smoothConstraint = null;
  }
  return e;
})(), Pc = (function(e) {
  Q(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new UA();
  }, t.prototype.buildPath = function(r, i) {
    ng(r, i, !0);
  }, t;
})(ht);
Pc.prototype.type = "polygon";
var zA = /* @__PURE__ */ (function() {
  function e() {
    this.points = null, this.percent = 1, this.smooth = 0, this.smoothConstraint = null;
  }
  return e;
})(), _a = (function(e) {
  Q(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  }, t.prototype.getDefaultShape = function() {
    return new zA();
  }, t.prototype.buildPath = function(r, i) {
    ng(r, i, !1);
  }, t;
})(ht);
_a.prototype.type = "polyline";
var VA = {}, HA = /* @__PURE__ */ (function() {
  function e() {
    this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.percent = 1;
  }
  return e;
})(), un = (function(e) {
  Q(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  }, t.prototype.getDefaultShape = function() {
    return new HA();
  }, t.prototype.buildPath = function(r, i) {
    var n, a, o, s;
    if (this.subPixelOptimize) {
      var l = Np(VA, i, this.style);
      n = l.x1, a = l.y1, o = l.x2, s = l.y2;
    } else
      n = i.x1, a = i.y1, o = i.x2, s = i.y2;
    var u = i.percent;
    u !== 0 && (r.moveTo(n, a), u < 1 && (o = n * (1 - u) + o * u, s = a * (1 - u) + s * u), r.lineTo(o, s));
  }, t.prototype.pointAt = function(r) {
    var i = this.shape;
    return [
      i.x1 * (1 - r) + i.x2 * r,
      i.y1 * (1 - r) + i.y2 * r
    ];
  }, t;
})(ht);
un.prototype.type = "line";
var Zt = [], WA = /* @__PURE__ */ (function() {
  function e() {
    this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.cpx1 = 0, this.cpy1 = 0, this.percent = 1;
  }
  return e;
})();
function Vf(e, t, r) {
  var i = e.cpx2, n = e.cpy2;
  return i != null || n != null ? [
    (r ? Nh : Gt)(e.x1, e.cpx1, e.cpx2, e.x2, t),
    (r ? Nh : Gt)(e.y1, e.cpy1, e.cpy2, e.y2, t)
  ] : [
    (r ? Fh : Kt)(e.x1, e.cpx1, e.x2, t),
    (r ? Fh : Kt)(e.y1, e.cpy1, e.y2, t)
  ];
}
var Rc = (function(e) {
  Q(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  }, t.prototype.getDefaultShape = function() {
    return new WA();
  }, t.prototype.buildPath = function(r, i) {
    var n = i.x1, a = i.y1, o = i.x2, s = i.y2, l = i.cpx1, u = i.cpy1, c = i.cpx2, h = i.cpy2, v = i.percent;
    v !== 0 && (r.moveTo(n, a), c == null || h == null ? (v < 1 && (ko(n, l, o, v, Zt), l = Zt[1], o = Zt[2], ko(a, u, s, v, Zt), u = Zt[1], s = Zt[2]), r.quadraticCurveTo(l, u, o, s)) : (v < 1 && (Do(n, l, c, o, v, Zt), l = Zt[1], c = Zt[2], o = Zt[3], Do(a, u, h, s, v, Zt), u = Zt[1], h = Zt[2], s = Zt[3]), r.bezierCurveTo(l, u, c, h, o, s)));
  }, t.prototype.pointAt = function(r) {
    return Vf(this.shape, r, !1);
  }, t.prototype.tangentAt = function(r) {
    var i = Vf(this.shape, r, !0);
    return jS(i, i);
  }, t;
})(ht);
Rc.prototype.type = "bezier-curve";
var GA = /* @__PURE__ */ (function() {
  function e() {
    this.cx = 0, this.cy = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0;
  }
  return e;
})(), ms = (function(e) {
  Q(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  }, t.prototype.getDefaultShape = function() {
    return new GA();
  }, t.prototype.buildPath = function(r, i) {
    var n = i.cx, a = i.cy, o = Math.max(i.r, 0), s = i.startAngle, l = i.endAngle, u = i.clockwise, c = Math.cos(s), h = Math.sin(s);
    r.moveTo(c * o + n, h * o + a), r.arc(n, a, o, s, l, !u);
  }, t;
})(ht);
ms.prototype.type = "arc";
var YA = (function(e) {
  Q(t, e);
  function t() {
    var r = e !== null && e.apply(this, arguments) || this;
    return r.type = "compound", r;
  }
  return t.prototype._updatePathDirty = function() {
    for (var r = this.shape.paths, i = this.shapeChanged(), n = 0; n < r.length; n++)
      i = i || r[n].shapeChanged();
    i && this.dirtyShape();
  }, t.prototype.beforeBrush = function() {
    this._updatePathDirty();
    for (var r = this.shape.paths || [], i = this.getGlobalScale(), n = 0; n < r.length; n++)
      r[n].path || r[n].createPathProxy(), r[n].path.setScale(i[0], i[1], r[n].segmentIgnoreThreshold);
  }, t.prototype.buildPath = function(r, i) {
    for (var n = i.paths || [], a = 0; a < n.length; a++)
      n[a].buildPath(r, n[a].shape, !0);
  }, t.prototype.afterBrush = function() {
    for (var r = this.shape.paths || [], i = 0; i < r.length; i++)
      r[i].pathUpdated();
  }, t.prototype.getBoundingRect = function() {
    return this._updatePathDirty.call(this), ht.prototype.getBoundingRect.call(this);
  }, t;
})(ht), ag = (function() {
  function e(t) {
    this.colorStops = t || [];
  }
  return e.prototype.addColorStop = function(t, r) {
    this.colorStops.push({
      offset: t,
      color: r
    });
  }, e;
})(), XA = (function(e) {
  Q(t, e);
  function t(r, i, n, a, o, s) {
    var l = e.call(this, o) || this;
    return l.x = r ?? 0, l.y = i ?? 0, l.x2 = n ?? 1, l.y2 = a ?? 0, l.type = "linear", l.global = s || !1, l;
  }
  return t;
})(ag), qA = (function(e) {
  Q(t, e);
  function t(r, i, n, a, o) {
    var s = e.call(this, a) || this;
    return s.x = r ?? 0.5, s.y = i ?? 0.5, s.r = n ?? 0.5, s.type = "radial", s.global = o || !1, s;
  }
  return t;
})(ag), gl = Math.min, ZA = Math.max, Ba = Math.abs, Qr = [0, 0], Kr = [0, 0], Lt = Jd(), Na = Lt.minTv, Fa = Lt.maxTv, og = (function() {
  function e(t, r) {
    this._corners = [], this._axes = [], this._origin = [0, 0];
    for (var i = 0; i < 4; i++)
      this._corners[i] = new Z();
    for (var i = 0; i < 2; i++)
      this._axes[i] = new Z();
    t && this.fromBoundingRect(t, r);
  }
  return e.prototype.fromBoundingRect = function(t, r) {
    var i = this._corners, n = this._axes, a = t.x, o = t.y, s = a + t.width, l = o + t.height;
    if (i[0].set(a, o), i[1].set(s, o), i[2].set(s, l), i[3].set(a, l), r)
      for (var u = 0; u < 4; u++)
        i[u].transform(r);
    Z.sub(n[0], i[1], i[0]), Z.sub(n[1], i[3], i[0]), n[0].normalize(), n[1].normalize();
    for (var u = 0; u < 2; u++)
      this._origin[u] = n[u].dot(i[0]);
  }, e.prototype.intersect = function(t, r, i) {
    var n = !0, a = !r;
    return r && Z.set(r, 0, 0), Lt.reset(i, !a), !this._intersectCheckOneSide(this, t, a, 1) && (n = !1, a) || !this._intersectCheckOneSide(t, this, a, -1) && (n = !1, a) || !a && !Lt.negativeSize && Z.copy(r, n ? Lt.useDir ? Lt.dirMinTv : Na : Fa), n;
  }, e.prototype._intersectCheckOneSide = function(t, r, i, n) {
    for (var a = !0, o = 0; o < 2; o++) {
      var s = t._axes[o];
      if (t._getProjMinMaxOnAxis(o, t._corners, Qr), t._getProjMinMaxOnAxis(o, r._corners, Kr), Lt.negativeSize || Qr[1] < Kr[0] || Qr[0] > Kr[1]) {
        if (a = !1, Lt.negativeSize || i)
          return a;
        var l = Ba(Kr[0] - Qr[1]), u = Ba(Qr[0] - Kr[1]);
        gl(l, u) > Fa.len() && (l < u ? Z.scale(Fa, s, -l * n) : Z.scale(Fa, s, u * n));
      } else if (!i) {
        var l = Ba(Kr[0] - Qr[1]), u = Ba(Qr[0] - Kr[1]);
        (Lt.useDir || gl(l, u) < Na.len()) && ((l < u || !Lt.bidirectional) && (Z.scale(Na, s, l * n), Lt.useDir && Lt.calcDirMTV()), (l >= u || !Lt.bidirectional) && (Z.scale(Na, s, -u * n), Lt.useDir && Lt.calcDirMTV()));
      }
    }
    return a;
  }, e.prototype._getProjMinMaxOnAxis = function(t, r, i) {
    for (var n = this._axes[t], a = this._origin, o = r[0].dot(n) + a[t], s = o, l = o, u = 1; u < r.length; u++) {
      var c = r[u].dot(n) + a[t];
      s = gl(c, s), l = ZA(c, l);
    }
    i[0] = s + Lt.touchThreshold, i[1] = l - Lt.touchThreshold, Lt.negativeSize = i[1] < i[0];
  }, e;
})(), sg = 0, QA = 1, KA = 2, JA = 1, vo = 0, jA = [], $A = (function(e) {
  Q(t, e);
  function t() {
    var r = e !== null && e.apply(this, arguments) || this;
    return r.notClear = !0, r.incremental = QA, r._displayables = [], r._temporaryDisplayables = [], r._cursor = 0, r;
  }
  return t.prototype.traverse = function(r, i) {
    r.call(i, this);
  }, t.prototype.useStyle = function() {
    this.style = {};
  }, t.prototype._useHoverStyle = function() {
    this.__hoverStyle = null;
  }, t.prototype.getCursor = function() {
    return this._cursor;
  }, t.prototype.innerAfterBrush = function() {
    this._cursor = this._displayables.length;
  }, t.prototype.clearDisplaybles = function() {
    this._displayables = [], this._temporaryDisplayables = [], this._cursor = 0, this.markRedraw(), this.notClear = !1;
  }, t.prototype.clearTemporalDisplayables = function() {
    this._temporaryDisplayables = [];
  }, t.prototype.addDisplayable = function(r, i) {
    i ? this._temporaryDisplayables.push(r) : this._displayables.push(r), this.markRedraw();
  }, t.prototype.addDisplayables = function(r, i) {
    i = i || !1;
    for (var n = 0; n < r.length; n++)
      this.addDisplayable(r[n], i);
  }, t.prototype.getDisplayables = function() {
    return this._displayables;
  }, t.prototype.getTemporalDisplayables = function() {
    return this._temporaryDisplayables;
  }, t.prototype.eachPendingDisplayable = function(r) {
    for (var i = this._cursor; i < this._displayables.length; i++)
      r && r(this._displayables[i]);
    for (var i = 0; i < this._temporaryDisplayables.length; i++)
      r && r(this._temporaryDisplayables[i]);
  }, t.prototype.update = function() {
    this.updateTransform();
    for (var r = this._cursor; r < this._displayables.length; r++) {
      var i = this._displayables[r];
      i.parent = this, i.update(), i.parent = null;
    }
    for (var r = 0; r < this._temporaryDisplayables.length; r++) {
      var i = this._temporaryDisplayables[r];
      i.parent = this, i.update(), i.parent = null;
    }
  }, t.prototype.getBoundingRect = function() {
    if (!this._rect) {
      for (var r = new Y(1 / 0, 1 / 0, -1 / 0, -1 / 0), i = 0; i < this._displayables.length; i++) {
        var n = this._displayables[i], a = n.getBoundingRect().clone();
        n.needLocalTransform() && a.applyTransform(n.getLocalTransform(jA)), r.union(a);
      }
      this._rect = r;
    }
    return this._rect;
  }, t.prototype.contain = function(r, i) {
    var n = this.transformCoordToLocal(r, i), a = this.getBoundingRect();
    if (a.contain(n[0], n[1]))
      for (var o = 0; o < this._displayables.length; o++) {
        var s = this._displayables[o];
        if (s.contain(r, i))
          return !0;
      }
    return !1;
  }, t;
})(ma), tM = st();
function eM(e, t, r, i, n) {
  var a;
  if (t && t.ecModel) {
    var o = t.ecModel.getUpdatePayload();
    a = o && o.animation;
  }
  var s = t && t.isAnimationEnabled(), l = e === "update";
  if (s) {
    var u = void 0, c = void 0, h = void 0;
    i ? (u = W(i.duration, 200), c = W(i.easing, "cubicOut"), h = 0) : (u = t.getShallow(l ? "animationDurationUpdate" : "animationDuration"), c = t.getShallow(l ? "animationEasingUpdate" : "animationEasing"), h = t.getShallow(l ? "animationDelayUpdate" : "animationDelay")), a && (a.duration != null && (u = a.duration), a.easing != null && (c = a.easing), a.delay != null && (h = a.delay)), at(h) && (h = h(r, n)), at(u) && (u = u(r));
    var v = {
      duration: u || 0,
      delay: h,
      easing: c
    };
    return v;
  } else
    return null;
}
function Oc(e, t, r, i, n, a, o) {
  var s = !1, l;
  at(n) ? (o = a, a = n, n = null) : H(n) && (a = n.cb, o = n.during, s = n.isFrom, l = n.removeOpt, n = n.dataIndex);
  var u = e === "leave";
  u || t.stopAnimation("leave");
  var c = eM(e, i, n, u ? l || {} : null, i && i.getAnimationDelayParams ? i.getAnimationDelayParams(t, n) : null);
  if (c && c.duration > 0) {
    var h = c.duration, v = c.delay, f = c.easing, d = {
      duration: h,
      delay: v || 0,
      easing: f,
      done: a,
      force: !!a || !!o,
      // Set to final state in update/init animation.
      // So the post processing based on the path shape can be done correctly.
      setToFinal: !u,
      scope: e,
      during: o
    };
    s ? t.animateFrom(r, d) : t.animateTo(r, d);
  } else
    t.stopAnimation(), !s && t.attr(r), o && o(1), a && a();
}
function ea(e, t, r, i, n, a) {
  Oc("update", e, t, r, i, n, a);
}
function po(e, t, r, i, n, a) {
  Oc("enter", e, t, r, i, n, a);
}
function Yn(e) {
  if (!e.__zr)
    return !0;
  for (var t = 0; t < e.animators.length; t++) {
    var r = e.animators[t];
    if (r.scope === "leave")
      return !0;
  }
  return !1;
}
function lg(e, t, r, i, n, a) {
  Yn(e) || Oc("leave", e, t, r, i, n, a);
}
function Hf(e, t, r, i) {
  e.removeTextContent(), e.removeTextGuideLine(), lg(e, {
    style: {
      opacity: 0
    }
  }, t, r, i);
}
function ug(e, t, r) {
  function i() {
    e.parent && e.parent.remove(e);
  }
  e.isGroup ? e.traverse(function(n) {
    n.isGroup || Hf(n, t, r, i);
  }) : Hf(e, t, r, i);
}
function rM(e) {
  tM(e).oldStyle = e.style;
}
var Lu = {}, cg = ["x", "y"], hg = ["width", "height"], fg = 0, vg = 1, dg = 2;
function iM(e) {
  return ht.extend(e);
}
var nM = DA;
function aM(e, t) {
  return nM(e, t);
}
function Me(e, t) {
  Lu[e] = t;
}
function oM(e) {
  if (Lu.hasOwnProperty(e))
    return Lu[e];
}
function Bc(e, t, r, i) {
  var n = MA(e, t);
  return r && (i === "center" && (r = gg(r, n.getBoundingRect())), mg(n, r)), n;
}
function pg(e, t, r) {
  var i = new _i({
    style: {
      image: e,
      x: t.x,
      y: t.y,
      width: t.width,
      height: t.height
    },
    onload: function(n) {
      if (r === "center") {
        var a = {
          width: n.width,
          height: n.height
        };
        i.setStyle(gg(t, a));
      }
    }
  });
  return i;
}
function gg(e, t) {
  var r = t.width / t.height, i = e.height * r, n;
  i <= e.width ? n = e.height : (i = e.width, n = i / r);
  var a = e.x + e.width / 2, o = e.y + e.height / 2;
  return {
    x: a - i / 2,
    y: o - n / 2,
    width: i,
    height: n
  };
}
var sM = kA;
function mg(e, t) {
  if (e.applyTransform) {
    var r = e.getBoundingRect(), i = r.calculateTransform(t);
    e.applyTransform(i);
  }
}
function Nc(e, t) {
  return Np(e, e, {
    lineWidth: t
  }), e;
}
function lM(e, t) {
  return Fp(e, e, t), e;
}
var uM = si;
function cM(e, t) {
  for (var r = va([]); e && e !== t; )
    Un(r, e.getLocalTransform(), r), e = e.parent;
  return r;
}
function Fc(e, t, r) {
  return t && !te(t) && (t = da.getLocalTransform(t)), r && (t = as([], t)), Ve([], e, t);
}
function hM(e, t, r) {
  var i = t[4] === 0 || t[5] === 0 || t[0] === 0 ? 1 : Ne(2 * t[4] / t[0]), n = t[4] === 0 || t[5] === 0 || t[2] === 0 ? 1 : Ne(2 * t[4] / t[2]), a = [e === "left" ? -i : e === "right" ? i : 0, e === "top" ? -n : e === "bottom" ? n : 0];
  return a = Fc(a, t, r), Ne(a[0]) > Ne(a[1]) ? a[0] > 0 ? "right" : "left" : a[1] > 0 ? "bottom" : "top";
}
function Wf(e) {
  return !e.isGroup;
}
function fM(e) {
  return e.shape != null;
}
function vM(e, t, r) {
  if (!e || !t)
    return;
  function i(o) {
    var s = {};
    return o.traverse(function(l) {
      Wf(l) && l.anid && (s[l.anid] = l);
    }), s;
  }
  function n(o) {
    var s = {
      x: o.x,
      y: o.y,
      rotation: o.rotation
    };
    return fM(o) && (s.shape = tt(o.shape)), s;
  }
  var a = i(e);
  t.traverse(function(o) {
    if (Wf(o) && o.anid) {
      var s = a[o.anid];
      if (s) {
        var l = n(o);
        o.attr(n(s)), ea(o, l, r, xt(o).dataIndex);
      }
    }
  });
}
function dM(e, t) {
  return it(e, function(r) {
    var i = r[0];
    i = It(i, t.x), i = ar(i, t.x + t.width);
    var n = r[1];
    return n = It(n, t.y), n = ar(n, t.y + t.height), [i, n];
  });
}
function pM(e, t) {
  var r = It(e.x, t.x), i = ar(e.x + e.width, t.x + t.width), n = It(e.y, t.y), a = ar(e.y + e.height, t.y + t.height);
  if (i >= r && a >= n)
    return {
      x: r,
      y: n,
      width: i - r,
      height: a - n
    };
}
function yg(e, t, r) {
  var i = P({
    rectHover: !0
  }, t), n = i.style = {
    strokeNoScale: !0
  };
  if (r = r || {
    x: -1,
    y: -1,
    width: 2,
    height: 2
  }, e)
    return e.indexOf("image://") === 0 ? (n.image = e.slice(8), wt(n, r), new _i(i)) : Bc(e.replace("path://", ""), i, r, "center");
}
function gM(e, t, r, i, n) {
  for (var a = 0, o = n[n.length - 1]; a < n.length; a++) {
    var s = n[a];
    if (_g(e, t, r, i, s[0], s[1], o[0], o[1]))
      return !0;
    o = s;
  }
}
function _g(e, t, r, i, n, a, o, s) {
  var l = r - e, u = i - t, c = o - n, h = s - a, v = ml(c, h, l, u);
  if (mM(v))
    return !1;
  var f = e - n, d = t - a, g = ml(f, d, l, u) / v;
  if (g < 0 || g > 1)
    return !1;
  var p = ml(f, d, c, h) / v;
  return !(p < 0 || p > 1);
}
function ml(e, t, r, i) {
  return e * i - r * t;
}
function mM(e) {
  return e <= 1e-6 && e >= -1e-6;
}
function Iu(e, t, r, i, n) {
  return t == null || (_t(t) ? lt[0] = lt[1] = lt[2] = lt[3] = t : (lt[0] = t[0], lt[1] = t[1], lt[2] = t[2], lt[3] = t[3]), i && (lt[0] = It(0, lt[0]), lt[1] = It(0, lt[1]), lt[2] = It(0, lt[2]), lt[3] = It(0, lt[3])), r && (lt[0] = -lt[0], lt[1] = -lt[1], lt[2] = -lt[2], lt[3] = -lt[3]), Gf(e, lt, "x", "width", 3, 1, n && n[0] || 0), Gf(e, lt, "y", "height", 0, 2, n && n[1] || 0)), e;
}
var lt = [0, 0, 0, 0];
function Gf(e, t, r, i, n, a, o) {
  var s = t[a] + t[n], l = e[i];
  e[i] += s, o = It(0, ar(o, l)), e[i] < o ? (e[i] = o, e[r] += t[n] >= 0 ? -t[n] : t[a] >= 0 ? l + t[a] : Ne(s) > 1e-8 ? (l - o) * t[n] / s : 0) : e[r] -= t[n];
}
function Uc(e) {
  var t = e.itemTooltipOption, r = e.componentModel, i = e.itemName, n = X(t) ? {
    formatter: t
  } : t, a = r.mainType, o = r.componentIndex, s = {
    componentType: a,
    name: i,
    $vars: ["name"]
  };
  s[a + "Index"] = o;
  var l = e.formatterParamsExtra;
  l && A(yt(l), function(c) {
    ze(s, c) || (s[c] = l[c], s.$vars.push(c));
  });
  var u = xt(e.el);
  u.componentMainType = a, u.componentIndex = o, u.tooltipConfig = {
    name: i,
    option: wt({
      content: i,
      encodeHTMLContent: !0,
      formatterParams: s
    }, n)
  };
}
function Eu(e, t) {
  var r;
  e.isGroup && (r = t(e)), r || e.traverse(t);
}
function wg(e, t) {
  if (e)
    if (F(e))
      for (var r = 0; r < e.length; r++)
        Eu(e[r], t);
    else
      Eu(e, t);
}
function zc(e) {
  return !e || Ne(e[1]) < Ua && Ne(e[2]) < Ua || Ne(e[0]) < Ua && Ne(e[3]) < Ua;
}
var Ua = 1e-5;
function ra(e, t) {
  return e ? Y.copy(e, t) : t.clone();
}
function Vc(e, t) {
  return t ? pc(e || He(), t) : void 0;
}
function bg(e) {
  return {
    z: e.get("z") || 0,
    zlevel: e.get("zlevel") || 0
  };
}
function yM(e) {
  var t = -1 / 0, r = 1 / 0;
  Eu(e, function(a) {
    i(a), i(a.getTextContent()), i(a.getTextGuideLine());
  });
  function i(a) {
    if (!(!a || a.isGroup)) {
      var o = a.currentStates;
      if (o.length)
        for (var s = 0; s < o.length; s++)
          n(a.states[o[s]]);
      n(a);
    }
  }
  function n(a) {
    if (a) {
      var o = a.z2;
      o > t && (t = o), o < r && (r = o);
    }
  }
  return r > t && (r = t = 0), {
    min: r,
    max: t
  };
}
function Sg(e, t, r) {
  xg(e, t, r, -1 / 0);
}
function xg(e, t, r, i) {
  if (e.ignoreModelZ)
    return i;
  var n = e.getTextContent(), a = e.getTextGuideLine(), o = e.isGroup;
  if (o)
    for (var s = e.childrenRef(), l = 0; l < s.length; l++)
      i = It(xg(s[l], t, r, i), i);
  else
    e.z = t, e.zlevel = r, i = It(e.z2 || 0, i);
  if (n && (n.z = t, n.zlevel = r, isFinite(i) && (n.z2 = i + 2)), a) {
    var u = e.textGuideLineConfig;
    a.z = t, a.zlevel = r, isFinite(i) && (a.z2 = i + (u && u.showAbove ? 1 : -1));
  }
  return i;
}
function _M(e) {
  return e.animation = {
    duration: 0
  }, e;
}
function wM(e, t) {
  return t ? pc(Pn.transform, t) : va(Pn.transform), Pn.decomposeTransform(), Eo(e, Pn), e;
}
var Pn = new da();
Pn.transform = He();
function bM(e) {
  var t = e.getZr().painter;
  return t.getType() === "canvas" ? t : null;
}
Me("circle", gs);
Me("ellipse", Ic);
Me("sector", ya);
Me("ring", Ec);
Me("polygon", Pc);
Me("polyline", _a);
Me("rect", oe);
Me("line", un);
Me("bezierCurve", Rc);
Me("arc", ms);
const SM = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Arc: ms,
  BezierCurve: Rc,
  BoundingRect: Y,
  Circle: gs,
  CompoundPath: YA,
  Ellipse: Ic,
  Group: qe,
  HOVER_LAYER_FOR_INCREMENTAL: dg,
  HOVER_LAYER_FROM_THRESHOLD: vg,
  HOVER_LAYER_NO: fg,
  Image: _i,
  IncrementalDisplayable: $A,
  Line: un,
  LinearGradient: XA,
  OrientedBoundingRect: og,
  Path: ht,
  Point: Z,
  Polygon: Pc,
  Polyline: _a,
  RadialGradient: qA,
  Rect: oe,
  Ring: Ec,
  Sector: ya,
  Text: xe,
  WH: hg,
  XY: cg,
  applyTransform: Fc,
  calcZ2Range: yM,
  clipPointsByRect: dM,
  clipRectByRect: pM,
  createIcon: yg,
  decomposeTransform: wM,
  ensureCopyRect: ra,
  ensureCopyTransform: Vc,
  expandOrShrinkRect: Iu,
  extendPath: aM,
  extendShape: iM,
  getCurrentCanvasPainter: bM,
  getShapeClass: oM,
  getTransform: cM,
  groupTransition: vM,
  initProps: po,
  isBoundingRectAxisAligned: zc,
  isElementRemoved: Yn,
  lineLineIntersect: _g,
  linePolygonIntersect: gM,
  makeImage: pg,
  makePath: Bc,
  mergePath: sM,
  payloadDisableAnimation: _M,
  registerShape: Me,
  removeElement: lg,
  removeElementWithFadeOut: ug,
  resizePath: mg,
  retrieveZInfo: bg,
  setTooltipConfig: Uc,
  subPixelOptimize: uM,
  subPixelOptimizeLine: Nc,
  subPixelOptimizeRect: lM,
  transformDirection: hM,
  traverseElements: wg,
  traverseUpdateZ: Sg,
  updateProps: ea
}, Symbol.toStringTag, { value: "Module" }));
var ys = {};
function xM(e, t) {
  for (var r = 0; r < Ze.length; r++) {
    var i = Ze[r], n = t[i], a = e.ensureState(i);
    a.style = a.style || {}, a.style.text = n;
  }
  var o = e.currentStates.slice();
  e.clearStates(!0), e.setStyle({
    text: t.normal
  }), e.useStates(o, !0);
}
function Yf(e, t, r) {
  var i = e.labelFetcher, n = e.labelDataIndex, a = e.labelDimIndex, o = t.normal, s;
  i && (s = i.getFormattedLabel(n, "normal", null, a, o && o.get("formatter"), r != null ? {
    interpolatedValue: r
  } : null)), s == null && (s = at(e.defaultText) ? e.defaultText(n, e, r) : e.defaultText);
  for (var l = {
    normal: s
  }, u = 0; u < Ze.length; u++) {
    var c = Ze[u], h = t[c];
    l[c] = W(i ? i.getFormattedLabel(n, c, null, a, h && h.get("formatter")) : null, s);
  }
  return l;
}
function TM(e, t, r, i) {
  r = r || ys;
  for (var n = e instanceof xe, a = !1, o = 0; o < Bo.length; o++) {
    var s = t[Bo[o]];
    if (s && s.getShallow("show")) {
      a = !0;
      break;
    }
  }
  var l = n ? e : e.getTextContent();
  if (a) {
    n || (l || (l = new xe(), e.setTextContent(l)), e.stateProxy && (l.stateProxy = e.stateProxy));
    var u = Yf(r, t), c = t.normal, h = !!c.getShallow("show"), v = ia(c, i, r, !1, !n);
    v.text = u.normal, n || e.setTextConfig(Xf(c, r, !1));
    for (var o = 0; o < Ze.length; o++) {
      var f = Ze[o], s = t[f];
      if (s) {
        var d = l.ensureState(f), g = !!W(s.getShallow("show"), h);
        if (g !== h && (d.ignore = !g), d.style = ia(s, i, r, !0, !n), d.style.text = u[f], !n) {
          var p = e.ensureState(f);
          p.textConfig = Xf(s, r, !0);
        }
      }
    }
    l.silent = !!c.getShallow("silent"), l.style.x != null && (v.x = l.style.x), l.style.y != null && (v.y = l.style.y), l.ignore = !h, l.useStyle(v), l.dirty(), r.enableTextSetter && (kM(l).setLabelText = function(m) {
      var y = Yf(r, t, m);
      xM(l, y);
    });
  } else l && (l.ignore = !0);
  e.dirty();
}
function CM(e, t) {
  t = t || "label";
  for (var r = {
    normal: e.getModel(t)
  }, i = 0; i < Ze.length; i++) {
    var n = Ze[i];
    r[n] = e.getModel([n, t]);
  }
  return r;
}
function ia(e, t, r, i, n) {
  var a = {};
  return AM(a, e, r, i, n), t && P(a, t), a;
}
function Xf(e, t, r) {
  t = t || {};
  var i = {}, n, a = e.getShallow("rotate"), o = W(e.getShallow("distance"), r ? null : 5), s = e.getShallow("offset");
  return n = e.getShallow("position") || (r ? null : "inside"), n === "outside" && (n = t.defaultOutsidePosition || "top"), n != null && (i.position = n), s != null && (i.offset = s), a != null && (a *= Math.PI / 180, i.rotation = a), o != null && (i.distance = o), i.outsideFill = e.get("color") === "inherit" ? t.inheritColor || null : "auto", t.autoOverflowArea != null && (i.autoOverflowArea = t.autoOverflowArea), t.layoutRect != null && (i.layoutRect = t.layoutRect), i;
}
function AM(e, t, r, i, n) {
  r = r || ys;
  var a = t.ecModel, o = a && a.option.textStyle, s = MM(t), l;
  if (s) {
    l = {};
    var u = "richInheritPlainLabel", c = W(t.get(u), a ? a.get(u) : void 0);
    for (var h in s)
      if (s.hasOwnProperty(h)) {
        var v = t.getModel(["rich", h]);
        Kf(l[h] = {}, v, o, t, c, r, i, n, !1, !0);
      }
  }
  l && (e.rich = l);
  var f = t.get("overflow");
  f && (e.overflow = f);
  var d = t.get("lineOverflow");
  d && (e.lineOverflow = d);
  var g = e, p = t.get("minMargin");
  if (p != null)
    p = _t(p) ? p / 2 : 0, g.margin = [p, p, p, p], g.__marginType = Xi.minMargin;
  else {
    var m = t.get("textMargin");
    m != null && (g.margin = vc(m), g.__marginType = Xi.textMargin);
  }
  Kf(e, t, o, null, null, r, i, n, !0, !1);
}
function MM(e) {
  for (var t; e && e !== e.ecModel; ) {
    var r = (e.option || ys).rich;
    if (r) {
      t = t || {};
      for (var i = yt(r), n = 0; n < i.length; n++) {
        var a = i[n];
        t[a] = 1;
      }
    }
    e = e.parentModel;
  }
  return t;
}
var qf = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY"], Zf = ["align", "lineHeight", "width", "height", "tag", "verticalAlign", "ellipsis"], Qf = ["padding", "borderWidth", "borderRadius", "borderDashOffset", "backgroundColor", "borderColor", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"];
function Kf(e, t, r, i, n, a, o, s, l, u) {
  r = !o && r || ys;
  var c = a && a.inheritColor, h = t.getShallow("color"), v = t.getShallow("textBorderColor"), f = W(t.getShallow("opacity"), r.opacity);
  (h === "inherit" || h === "auto") && (c ? h = c : h = null), (v === "inherit" || v === "auto") && (c ? v = c : v = null), s || (h = h || r.color, v = v || r.textBorderColor), h != null && (e.fill = h), v != null && (e.stroke = v);
  var d = W(t.getShallow("textBorderWidth"), r.textBorderWidth);
  d != null && (e.lineWidth = d);
  var g = W(t.getShallow("textBorderType"), r.textBorderType);
  g != null && (e.lineDash = g);
  var p = W(t.getShallow("textBorderDashOffset"), r.textBorderDashOffset);
  p != null && (e.lineDashOffset = p), !o && f == null && !u && (f = a && a.defaultOpacity), f != null && (e.opacity = f), !o && !s && e.fill == null && a.inheritColor && (e.fill = a.inheritColor);
  for (var m = 0; m < qf.length; m++) {
    var y = qf[m], _ = n !== !1 && i ? ci(t.getShallow(y), i.getShallow(y), r[y]) : W(t.getShallow(y), r[y]);
    _ != null && (e[y] = _);
  }
  for (var m = 0; m < Zf.length; m++) {
    var y = Zf[m], _ = t.getShallow(y);
    _ != null && (e[y] = _);
  }
  if (e.verticalAlign == null) {
    var w = t.getShallow("baseline");
    w != null && (e.verticalAlign = w);
  }
  if (!l || !a.disableBox) {
    for (var m = 0; m < Qf.length; m++) {
      var y = Qf[m], _ = t.getShallow(y);
      _ != null && (e[y] = _);
    }
    var b = t.getShallow("borderType");
    b != null && (e.borderDash = b), (e.backgroundColor === "auto" || e.backgroundColor === "inherit") && c && (e.backgroundColor = c), (e.borderColor === "auto" || e.borderColor === "inherit") && c && (e.borderColor = c);
  }
}
function DM(e, t) {
  var r = t && t.getModel("textStyle");
  return Be([
    // FIXME in node-canvas fontWeight is before fontStyle
    e.fontStyle || r && r.getShallow("fontStyle") || "",
    e.fontWeight || r && r.getShallow("fontWeight") || "",
    (e.fontSize || r && r.getShallow("fontSize") || 12) + "px",
    e.fontFamily || r && r.getShallow("fontFamily") || "sans-serif"
  ].join(" "));
}
var kM = st(), Xi = {
  minMargin: 1,
  textMargin: 2
}, LM = ["textStyle", "color"], yl = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "padding", "lineHeight", "rich", "width", "height", "overflow"], _l = new xe(), IM = (
  /** @class */
  (function() {
    function e() {
    }
    return e.prototype.getTextColor = function(t) {
      var r = this.ecModel;
      return this.getShallow("color") || (!t && r ? r.get(LM) : null);
    }, e.prototype.getFont = function() {
      return DM({
        fontStyle: this.getShallow("fontStyle"),
        fontWeight: this.getShallow("fontWeight"),
        fontSize: this.getShallow("fontSize"),
        fontFamily: this.getShallow("fontFamily")
      }, this.ecModel);
    }, e.prototype.getTextRect = function(t) {
      for (var r = {
        text: t,
        verticalAlign: this.getShallow("verticalAlign") || this.getShallow("baseline")
      }, i = 0; i < yl.length; i++)
        r[yl[i]] = this.getShallow(yl[i]);
      return _l.useStyle(r), _l.update(), _l.getBoundingRect();
    }, e;
  })()
), Tg = [
  ["lineWidth", "width"],
  ["stroke", "color"],
  ["opacity"],
  ["shadowBlur"],
  ["shadowOffsetX"],
  ["shadowOffsetY"],
  ["shadowColor"],
  ["lineDash", "type"],
  ["lineDashOffset", "dashOffset"],
  ["lineCap", "cap"],
  ["lineJoin", "join"],
  ["miterLimit"]
  // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
  // So do not transfer decal directly.
], EM = ta(Tg), PM = (
  /** @class */
  (function() {
    function e() {
    }
    return e.prototype.getLineStyle = function(t) {
      return EM(this, t);
    }, e;
  })()
), Cg = [
  ["fill", "color"],
  ["stroke", "borderColor"],
  ["lineWidth", "borderWidth"],
  ["opacity"],
  ["shadowBlur"],
  ["shadowOffsetX"],
  ["shadowOffsetY"],
  ["shadowColor"],
  ["lineDash", "borderType"],
  ["lineDashOffset", "borderDashOffset"],
  ["lineCap", "borderCap"],
  ["lineJoin", "borderJoin"],
  ["miterLimit", "borderMiterLimit"]
  // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
  // So do not transfer decal directly.
], RM = ta(Cg), OM = (
  /** @class */
  (function() {
    function e() {
    }
    return e.prototype.getItemStyle = function(t, r) {
      return RM(this, t, r);
    }, e;
  })()
), mt = (
  /** @class */
  (function() {
    function e(t, r, i) {
      this.parentModel = r, this.ecModel = i, this.option = t;
    }
    return e.prototype.init = function(t, r, i) {
    }, e.prototype.mergeOption = function(t, r) {
      At(this.option, t, !0);
    }, e.prototype.get = function(t, r) {
      return t == null ? this.option : this._doGet(this.parsePath(t), !r && this.parentModel);
    }, e.prototype.getShallow = function(t, r) {
      var i = this.option, n = i == null ? i : i[t];
      if (n == null && !r) {
        var a = this.parentModel;
        a && (n = a.getShallow(t));
      }
      return n;
    }, e.prototype.getModel = function(t, r) {
      var i = t != null, n = i ? this.parsePath(t) : null, a = i ? this._doGet(n) : this.option;
      return r = r || this.parentModel && this.parentModel.getModel(this.resolveParentPath(n)), new e(a, r, this.ecModel);
    }, e.prototype.isEmpty = function() {
      return this.option == null;
    }, e.prototype.restoreData = function() {
    }, e.prototype.clone = function() {
      var t = this.constructor;
      return new t(tt(this.option));
    }, e.prototype.parsePath = function(t) {
      return typeof t == "string" ? t.split(".") : t;
    }, e.prototype.resolveParentPath = function(t) {
      return t;
    }, e.prototype.isAnimationEnabled = function() {
      if (!K.node && this.option) {
        if (this.option.animation != null)
          return !!this.option.animation;
        if (this.parentModel)
          return this.parentModel.isAnimationEnabled();
      }
    }, e.prototype._doGet = function(t, r) {
      var i = this.option;
      if (!t)
        return i;
      for (var n = 0; n < t.length && !(t[n] && (i = i && typeof i == "object" ? i[t[n]] : null, i == null)); n++)
        ;
      return i == null && r && (i = r._doGet(this.resolveParentPath(t), r.parentModel)), i;
    }, e;
  })()
);
Sc(mt);
rC(mt);
lr(mt, PM);
lr(mt, OM);
lr(mt, sC);
lr(mt, IM);
var BM = Math.round(Math.random() * 10);
function _s(e) {
  return [e || "", BM++].join("_");
}
function NM(e) {
  var t = {};
  e.registerSubTypeDefaulter = function(r, i) {
    var n = Fe(r);
    t[n.main] = i;
  }, e.determineSubType = function(r, i) {
    var n = i.type;
    if (!n) {
      var a = Fe(r).main;
      e.hasSubTypes(r) && t[a] && (n = t[a](i));
    }
    return n;
  };
}
function FM(e, t) {
  e.topologicalTravel = function(a, o, s, l) {
    if (!a.length)
      return;
    var u = r(o), c = u.graph, h = u.noEntryList, v = {};
    for (A(a, function(y) {
      v[y] = !0;
    }); h.length; ) {
      var f = h.pop(), d = c[f], g = !!v[f];
      g && (s.call(l, f, d.originalDeps.slice()), delete v[f]), A(d.successor, g ? m : p);
    }
    A(v, function() {
      var y = "";
      throw new Error(y);
    });
    function p(y) {
      c[y].entryCount--, c[y].entryCount === 0 && h.push(y);
    }
    function m(y) {
      v[y] = !0, p(y);
    }
  };
  function r(a) {
    var o = {}, s = [];
    return A(a, function(l) {
      var u = i(o, l), c = u.originalDeps = t(l), h = n(c, a);
      u.entryCount = h.length, u.entryCount === 0 && s.push(l), A(h, function(v) {
        dt(u.predecessor, v) < 0 && u.predecessor.push(v);
        var f = i(o, v);
        dt(f.successor, v) < 0 && f.successor.push(l);
      });
    }), {
      graph: o,
      noEntryList: s
    };
  }
  function i(a, o) {
    return a[o] || (a[o] = {
      predecessor: [],
      successor: []
    }), a[o];
  }
  function n(a, o) {
    var s = [];
    return A(a, function(l) {
      dt(o, l) >= 0 && s.push(l);
    }), s;
  }
}
const UM = {
  time: {
    month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    dayOfWeekAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  },
  legend: {
    selector: {
      all: "All",
      inverse: "Inv"
    }
  },
  toolbox: {
    brush: {
      title: {
        rect: "Box Select",
        polygon: "Lasso Select",
        lineX: "Horizontally Select",
        lineY: "Vertically Select",
        keep: "Keep Selections",
        clear: "Clear Selections"
      }
    },
    dataView: {
      title: "Data View",
      lang: ["Data View", "Close", "Refresh"]
    },
    dataZoom: {
      title: {
        zoom: "Zoom",
        back: "Zoom Reset"
      }
    },
    magicType: {
      title: {
        line: "Switch to Line Chart",
        bar: "Switch to Bar Chart",
        stack: "Stack",
        tiled: "Tile"
      }
    },
    restore: {
      title: "Restore"
    },
    saveAsImage: {
      title: "Save as Image",
      lang: ["Right Click to Save Image"]
    }
  },
  series: {
    typeNames: {
      pie: "Pie chart",
      bar: "Bar chart",
      line: "Line chart",
      scatter: "Scatter plot",
      effectScatter: "Ripple scatter plot",
      radar: "Radar chart",
      tree: "Tree",
      treemap: "Treemap",
      boxplot: "Boxplot",
      candlestick: "Candlestick",
      k: "K line chart",
      heatmap: "Heat map",
      map: "Map",
      parallel: "Parallel coordinate map",
      lines: "Line graph",
      graph: "Relationship graph",
      sankey: "Sankey diagram",
      funnel: "Funnel chart",
      gauge: "Gauge",
      pictorialBar: "Pictorial bar",
      themeRiver: "Theme River Map",
      sunburst: "Sunburst",
      custom: "Custom chart",
      chart: "Chart"
    }
  },
  aria: {
    general: {
      withTitle: 'This is a chart about "{title}"',
      withoutTitle: "This is a chart"
    },
    series: {
      single: {
        prefix: "",
        withName: " with type {seriesType} named {seriesName}.",
        withoutName: " with type {seriesType}."
      },
      multiple: {
        prefix: ". It consists of {seriesCount} series count.",
        withName: " The {seriesId} series is a {seriesType} representing {seriesName}.",
        withoutName: " The {seriesId} series is a {seriesType}.",
        separator: {
          middle: "",
          end: ""
        }
      }
    },
    data: {
      allData: "The data is as follows: ",
      partialData: "The first {displayCnt} items are: ",
      withName: "the data for {name} is {value}",
      withoutName: "{value}",
      separator: {
        middle: ", ",
        end: ". "
      }
    }
  }
}, zM = {
  time: {
    month: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    monthAbbr: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    dayOfWeek: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    dayOfWeekAbbr: ["日", "一", "二", "三", "四", "五", "六"]
  },
  legend: {
    selector: {
      all: "全选",
      inverse: "反选"
    }
  },
  toolbox: {
    brush: {
      title: {
        rect: "矩形选择",
        polygon: "圈选",
        lineX: "横向选择",
        lineY: "纵向选择",
        keep: "保持选择",
        clear: "清除选择"
      }
    },
    dataView: {
      title: "数据视图",
      lang: ["数据视图", "关闭", "刷新"]
    },
    dataZoom: {
      title: {
        zoom: "区域缩放",
        back: "区域缩放还原"
      }
    },
    magicType: {
      title: {
        line: "切换为折线图",
        bar: "切换为柱状图",
        stack: "切换为堆叠",
        tiled: "切换为平铺"
      }
    },
    restore: {
      title: "还原"
    },
    saveAsImage: {
      title: "保存为图片",
      lang: ["右键另存为图片"]
    }
  },
  series: {
    typeNames: {
      pie: "饼图",
      bar: "柱状图",
      line: "折线图",
      scatter: "散点图",
      effectScatter: "涟漪散点图",
      radar: "雷达图",
      tree: "树图",
      treemap: "矩形树图",
      boxplot: "箱型图",
      candlestick: "K线图",
      k: "K线图",
      heatmap: "热力图",
      map: "地图",
      parallel: "平行坐标图",
      lines: "线图",
      graph: "关系图",
      sankey: "桑基图",
      funnel: "漏斗图",
      gauge: "仪表盘图",
      pictorialBar: "象形柱图",
      themeRiver: "主题河流图",
      sunburst: "旭日图",
      custom: "自定义图表",
      chart: "图表"
    }
  },
  aria: {
    general: {
      withTitle: "这是一个关于“{title}”的图表。",
      withoutTitle: "这是一个图表，"
    },
    series: {
      single: {
        prefix: "",
        withName: "图表类型是{seriesType}，表示{seriesName}。",
        withoutName: "图表类型是{seriesType}。"
      },
      multiple: {
        prefix: "它由{seriesCount}个图表系列组成。",
        withName: "第{seriesId}个系列是一个表示{seriesName}的{seriesType}，",
        withoutName: "第{seriesId}个系列是一个{seriesType}，",
        separator: {
          middle: "；",
          end: "。"
        }
      }
    },
    data: {
      allData: "其数据是——",
      partialData: "其中，前{displayCnt}项是——",
      withName: "{name}的数据是{value}",
      withoutName: "{value}",
      separator: {
        middle: "，",
        end: ""
      }
    }
  }
};
var Uo = "ZH", Hc = "EN", Qi = Hc, go = {}, Wc = {}, Ag = K.domSupported ? (function() {
  var e = (document.documentElement.lang || navigator.language || navigator.browserLanguage || Qi).toUpperCase();
  return e.indexOf(Uo) > -1 ? Uo : Qi;
})() : Qi;
function Mg(e, t) {
  e = e.toUpperCase(), Wc[e] = new mt(t), go[e] = t;
}
function VM(e) {
  if (X(e)) {
    var t = go[e.toUpperCase()] || {};
    return e === Uo || e === Hc ? tt(t) : At(tt(t), tt(go[Qi]), !1);
  } else
    return At(tt(e), tt(go[Qi]), !1);
}
function HM(e) {
  return Wc[e];
}
function WM() {
  return Wc[Qi];
}
Mg(Hc, UM);
Mg(Uo, zM);
var GM = null;
function YM() {
  return GM;
}
function XM(e) {
  var t = e.brk;
  return t ? t.hasBreaks() : !1;
}
function dr(e, t) {
  return e += "", "0000".substr(0, t - e.length) + e;
}
function Dg(e, t, r, i) {
  var n = cs(e), a = n[qM(r)](), o = n[ZM(r)]() + 1, s = Math.floor((o - 1) / 3) + 1, l = n[QM(r)](), u = n["get" + (r ? "UTC" : "") + "Day"](), c = n[KM(r)](), h = (c - 1) % 12 + 1, v = n[JM(r)](), f = n[jM(r)](), d = n[$M(r)](), g = c >= 12 ? "pm" : "am", p = g.toUpperCase(), m = i instanceof mt ? i : HM(Ag) || WM(), y = m.getModel("time"), _ = y.get("month"), w = y.get("monthAbbr"), b = y.get("dayOfWeek"), S = y.get("dayOfWeekAbbr");
  return (t || "").replace(/{a}/g, g + "").replace(/{A}/g, p + "").replace(/{yyyy}/g, a + "").replace(/{yy}/g, dr(a % 100 + "", 2)).replace(/{Q}/g, s + "").replace(/{MMMM}/g, _[o - 1]).replace(/{MMM}/g, w[o - 1]).replace(/{MM}/g, dr(o, 2)).replace(/{M}/g, o + "").replace(/{dd}/g, dr(l, 2)).replace(/{d}/g, l + "").replace(/{eeee}/g, b[u]).replace(/{ee}/g, S[u]).replace(/{e}/g, u + "").replace(/{HH}/g, dr(c, 2)).replace(/{H}/g, c + "").replace(/{hh}/g, dr(h + "", 2)).replace(/{h}/g, h + "").replace(/{mm}/g, dr(v, 2)).replace(/{m}/g, v + "").replace(/{ss}/g, dr(f, 2)).replace(/{s}/g, f + "").replace(/{SSS}/g, dr(d, 3)).replace(/{S}/g, d + "");
}
function qM(e) {
  return e ? "getUTCFullYear" : "getFullYear";
}
function ZM(e) {
  return e ? "getUTCMonth" : "getMonth";
}
function QM(e) {
  return e ? "getUTCDate" : "getDate";
}
function KM(e) {
  return e ? "getUTCHours" : "getHours";
}
function JM(e) {
  return e ? "getUTCMinutes" : "getMinutes";
}
function jM(e) {
  return e ? "getUTCSeconds" : "getSeconds";
}
function $M(e) {
  return e ? "getUTCMilliseconds" : "getMilliseconds";
}
function tD(e) {
  if (!kT(e))
    return X(e) ? e : "-";
  var t = (e + "").split(".");
  return t[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (t.length > 1 ? "." + t[1] : "");
}
function kg(e, t) {
  return e = (e || "").toLowerCase().replace(/-(.)/g, function(r, i) {
    return i.toUpperCase();
  }), t && e && (e = e.charAt(0).toUpperCase() + e.slice(1)), e;
}
var Gc = vc;
function Pu(e, t, r) {
  var i = "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}";
  function n(c) {
    return c && Be(c) ? c : "-";
  }
  function a(c) {
    return an(c);
  }
  var o = t === "time", s = e instanceof Date;
  if (o || s) {
    var l = o ? cs(e) : e;
    if (isNaN(+l)) {
      if (s)
        return "-";
    } else return Dg(l, i, r);
  }
  if (t === "ordinal")
    return Kl(e) ? n(e) : _t(e) && a(e) ? e + "" : "-";
  var u = Ro(e);
  return a(u) ? tD(u) : Kl(e) ? n(e) : typeof e == "boolean" ? e + "" : "-";
}
var Jf = ["a", "b", "c", "d", "e", "f", "g"], wl = function(e, t) {
  return "{" + e + (t ?? "") + "}";
};
function Lg(e, t, r) {
  F(t) || (t = [t]);
  var i = t.length;
  if (!i)
    return "";
  for (var n = t[0].$vars || [], a = 0; a < n.length; a++) {
    var o = Jf[a];
    e = e.replace(wl(o), wl(o, 0));
  }
  for (var s = 0; s < i; s++)
    for (var l = 0; l < n.length; l++) {
      var u = t[s][n[l]];
      e = e.replace(wl(Jf[l], s), r ? Qt(u) : u);
    }
  return e;
}
function eD(e, t) {
  var r = X(e) ? {
    color: e,
    extraCssText: t
  } : e || {}, i = r.color, n = r.type;
  t = r.extraCssText;
  var a = r.renderMode || "html";
  if (!i)
    return "";
  if (a === "html")
    return n === "subItem" ? '<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:' + Qt(i) + ";" + (t || "") + '"></span>' : '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:' + Qt(i) + ";" + (t || "") + '"></span>';
  var o = r.markerId || "markerX";
  return {
    renderMode: a,
    content: "{" + o + "|}  ",
    style: n === "subItem" ? {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: i
    } : {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: i
    }
  };
}
function na(e, t) {
  return t = t || "transparent", X(e) ? e : H(e) && e.colorStops && (e.colorStops[0] || {}).color || t;
}
var bl = {}, Sl = {}, Ig = (
  /** @class */
  (function() {
    function e() {
      this._normalMasterList = [], this._nonSeriesBoxMasterList = [];
    }
    return e.prototype.create = function(t, r) {
      this._nonSeriesBoxMasterList = i(bl), this._normalMasterList = i(Sl);
      function i(n, a) {
        var o = [];
        return A(n, function(s, l) {
          var u = s.create(t, r);
          o = o.concat(u || []);
        }), o;
      }
    }, e.prototype.update = function(t, r) {
      A(this._normalMasterList, function(i) {
        i.update && i.update(t, r);
      });
    }, e.prototype.getCoordinateSystems = function() {
      return this._normalMasterList.concat(this._nonSeriesBoxMasterList);
    }, e.register = function(t, r) {
      if (t === "matrix" || t === "calendar") {
        bl[t] = r;
        return;
      }
      Sl[t] = r;
    }, e.get = function(t) {
      return Sl[t] || bl[t];
    }, e;
  })()
), rD = 1, Eg = 2;
function iD(e) {
  Pg.set(e.fullType, {
    getCoord2: void 0
  }).getCoord2 = e.getCoord2;
}
var Pg = et();
function nD(e) {
  var t = e.getShallow("coord", !0), r = rD;
  if (t == null) {
    var i = Pg.get(e.type);
    i && i.getCoord2 && (r = Eg, t = i.getCoord2(e));
  }
  return {
    coord: t,
    from: r
  };
}
var mo = A, aD = ["left", "right", "top", "bottom", "width", "height"], za = [["width", "left", "right"], ["height", "top", "bottom"]];
function Rg(e, t, r, i, n) {
  var a = 0, o = 0;
  i == null && (i = 1 / 0), n == null && (n = 1 / 0);
  var s = 0;
  t.eachChild(function(l, u) {
    var c = l.getBoundingRect(), h = t.childAt(u + 1), v = h && h.getBoundingRect(), f, d;
    if (e === "horizontal") {
      var g = c.width + (v ? -v.x + c.x : 0);
      f = a + g, f > i || l.newline ? (a = 0, f = g, o += s + r, s = c.height) : s = Math.max(s, c.height);
    } else {
      var p = c.height + (v ? -v.y + c.y : 0);
      d = o + p, d > n || l.newline ? (a += s + r, o = 0, d = p, s = c.width) : s = Math.max(s, c.width);
    }
    l.newline || (l.x = a, l.y = o, l.markRedraw(), e === "horizontal" ? a = f + r : o = d + r);
  });
}
ae(Rg, "vertical");
ae(Rg, "horizontal");
function oD(e, t) {
  return {
    left: e.getShallow("left", t),
    top: e.getShallow("top", t),
    right: e.getShallow("right", t),
    bottom: e.getShallow("bottom", t),
    width: e.getShallow("width", t),
    height: e.getShallow("height", t)
  };
}
function sD(e, t) {
  var r = uD(e, t, {
    enableLayoutOnlyByCenter: !0
  }), i = e.getBoxLayoutParams(), n, a;
  if (r.type === Rn.point)
    a = r.refPoint, n = Ru(i, {
      width: t.getWidth(),
      height: t.getHeight()
    });
  else {
    var o = e.get("center"), s = F(o) ? o : [o, o];
    n = Ru(i, r.refContainer), a = r.boxCoordFrom === Eg ? r.refPoint : [Ct(s[0], n.width) + n.x, Ct(s[1], n.height) + n.y];
  }
  return {
    viewRect: n,
    center: a
  };
}
function lD(e, t) {
  var r = sD(e, t), i = r.viewRect, n = r.center, a = e.get("radius");
  F(a) || (a = [0, a]);
  var o = Ct(i.width, t.getWidth()), s = Ct(i.height, t.getHeight()), l = Math.min(o, s), u = Ct(a[0], l / 2), c = Ct(a[1], l / 2);
  return {
    cx: n[0],
    cy: n[1],
    r0: u,
    r: c,
    viewRect: i
  };
}
function Ru(e, t, r) {
  r = Gc(r || 0);
  var i = t.width, n = t.height, a = Ct(e.left, i), o = Ct(e.top, n), s = Ct(e.right, i), l = Ct(e.bottom, n), u = Ct(e.width, i), c = Ct(e.height, n), h = r[2] + r[0], v = r[1] + r[3], f = e.aspect;
  switch (isNaN(u) && (u = i - s - v - a), isNaN(c) && (c = n - l - h - o), f != null && (isNaN(u) && isNaN(c) && (f > i / n ? u = i * 0.8 : c = n * 0.8), isNaN(u) && (u = f * c), isNaN(c) && (c = u / f)), isNaN(a) && (a = i - s - u - v), isNaN(o) && (o = n - l - c - h), e.left || e.right) {
    case "center":
      a = i / 2 - u / 2 - r[3];
      break;
    case "right":
      a = i - u - v;
      break;
  }
  switch (e.top || e.bottom) {
    case "middle":
    case "center":
      o = n / 2 - c / 2 - r[0];
      break;
    case "bottom":
      o = n - c - h;
      break;
  }
  a = a || 0, o = o || 0, isNaN(u) && (u = i - v - a - (s || 0)), isNaN(c) && (c = n - h - o - (l || 0));
  var d = new Y((t.x || 0) + a + r[3], (t.y || 0) + o + r[0], u, c);
  return d.margin = r, d;
}
var Rn = {
  rect: 1,
  point: 2
};
function uD(e, t, r) {
  var i, n, a, o = e.boxCoordinateSystem, s;
  if (o) {
    var l = nD(e), u = l.coord, c = l.from;
    if (o.dataToLayout) {
      a = Rn.rect, s = c;
      var h = o.dataToLayout(u);
      i = h.contentRect || h.rect;
    } else r && r.enableLayoutOnlyByCenter && o.dataToPoint && (a = Rn.point, s = c, n = o.dataToPoint(u));
  }
  return a == null && (a = Rn.rect), a === Rn.rect && (i || (i = {
    x: 0,
    y: 0,
    width: t.getWidth(),
    height: t.getHeight()
  }), n = [i.x + i.width / 2, i.y + i.height / 2]), {
    type: a,
    refContainer: i,
    refPoint: n,
    boxCoordFrom: s
  };
}
function zo(e) {
  var t = e.layoutMode || e.constructor.layoutMode;
  return H(t) ? t : t ? {
    type: t
  } : null;
}
function Vo(e, t, r) {
  var i = r && r.ignoreSize;
  !F(i) && (i = [i, i]);
  var n = o(za[0], 0), a = o(za[1], 1);
  l(za[0], e, n), l(za[1], e, a);
  function o(u, c) {
    var h = {}, v = 0, f = {}, d = 0, g = 2;
    if (mo(u, function(y) {
      f[y] = e[y];
    }), mo(u, function(y) {
      ze(t, y) && (h[y] = f[y] = t[y]), s(h, y) && v++, s(f, y) && d++;
    }), i[c])
      return s(t, u[1]) ? f[u[2]] = null : s(t, u[2]) && (f[u[1]] = null), f;
    if (d === g || !v)
      return f;
    if (v >= g)
      return h;
    for (var p = 0; p < u.length; p++) {
      var m = u[p];
      if (!ze(h, m) && ze(e, m)) {
        h[m] = e[m];
        break;
      }
    }
    return h;
  }
  function s(u, c) {
    return u[c] != null && u[c] !== "auto";
  }
  function l(u, c, h) {
    mo(u, function(v) {
      c[v] = h[v];
    });
  }
}
function Og(e) {
  return cD({}, e);
}
function cD(e, t) {
  return t && e && mo(aD, function(r) {
    ze(t, r) && (e[r] = t[r]);
  }), e;
}
var hD = st(), ct = (
  /** @class */
  (function(e) {
    Q(t, e);
    function t(r, i, n) {
      var a = e.call(this, r, i, n) || this;
      return a.uid = _s("ec_cpt_model"), a;
    }
    return t.prototype.init = function(r, i, n) {
      this.mergeDefaultAndTheme(r, n);
    }, t.prototype.mergeDefaultAndTheme = function(r, i) {
      var n = zo(this), a = n ? Og(r) : {}, o = i.getTheme();
      At(r, o.get(this.mainType)), At(r, this.getDefaultOption()), n && Vo(r, a, n);
    }, t.prototype.mergeOption = function(r, i) {
      At(this.option, r, !0);
      var n = zo(this);
      n && Vo(this.option, r, n);
    }, t.prototype.optionUpdated = function(r, i) {
    }, t.prototype.getDefaultOption = function() {
      var r = this.constructor;
      if (!$T(r))
        return r.defaultOption;
      var i = hD(this);
      if (!i.defaultOption) {
        for (var n = [], a = r; a; ) {
          var o = a.prototype.defaultOption;
          o && n.push(o), a = a.superClass;
        }
        for (var s = {}, l = n.length - 1; l >= 0; l--)
          s = At(s, n[l], !0);
        i.defaultOption = s;
      }
      return i.defaultOption;
    }, t.prototype.getReferringComponents = function(r, i) {
      var n = r + "Index", a = r + "Id";
      return ga(this.ecModel, r, {
        index: this.get(n, !0),
        id: this.get(a, !0)
      }, i);
    }, t.prototype.getBoxLayoutParams = function() {
      return oD(this, !1);
    }, t.prototype.getZLevelKey = function() {
      return "";
    }, t.prototype.setZLevel = function(r) {
      this.option.zlevel = r;
    }, t.protoInitialize = (function() {
      var r = t.prototype;
      r.type = "component", r.id = "", r.name = "", r.mainType = "", r.subType = "", r.componentIndex = 0;
    })(), t;
  })(mt)
);
Dp(ct, mt);
xc(ct);
NM(ct);
FM(ct, fD);
function fD(e) {
  var t = [];
  return A(ct.getClassesByMainType(e), function(r) {
    t = t.concat(r.dependencies || r.prototype.dependencies || []);
  }), t = it(t, function(r) {
    return Fe(r).main;
  }), e !== "dataset" && dt(t, "dataset") <= 0 && t.unshift("dataset"), t;
}
var vt = {
  color: {},
  darkColor: {},
  size: {}
}, pt = vt.color = {
  theme: ["#5070dd", "#b6d634", "#505372", "#ff994d", "#0ca8df", "#ffd10a", "#fb628b", "#785db0", "#3fbe95"],
  neutral00: "#fff",
  neutral05: "#f4f7fd",
  neutral10: "#e8ebf0",
  neutral15: "#dbdee4",
  neutral20: "#cfd2d7",
  neutral25: "#c3c5cb",
  neutral30: "#b7b9be",
  neutral35: "#aaacb2",
  neutral40: "#9ea0a5",
  neutral45: "#929399",
  neutral50: "#86878c",
  neutral55: "#797b7f",
  neutral60: "#6d6e73",
  neutral65: "#616266",
  neutral70: "#54555a",
  neutral75: "#48494d",
  neutral80: "#3c3c41",
  neutral85: "#303034",
  neutral90: "#232328",
  neutral95: "#17171b",
  neutral99: "#000",
  accent05: "#eff1f9",
  accent10: "#e0e4f2",
  accent15: "#d0d6ec",
  accent20: "#c0c9e6",
  accent25: "#b1bbdf",
  accent30: "#a1aed9",
  accent35: "#91a0d3",
  accent40: "#8292cc",
  accent45: "#7285c6",
  accent50: "#6578ba",
  accent55: "#5c6da9",
  accent60: "#536298",
  accent65: "#4a5787",
  accent70: "#404c76",
  accent75: "#374165",
  accent80: "#2e3654",
  accent85: "#252b43",
  accent90: "#1b2032",
  accent95: "#121521",
  transparent: "rgba(0,0,0,0)",
  highlight: "rgba(255,231,130,0.8)"
};
P(pt, {
  primary: pt.neutral80,
  secondary: pt.neutral70,
  tertiary: pt.neutral60,
  quaternary: pt.neutral50,
  disabled: pt.neutral20,
  border: pt.neutral30,
  borderTint: pt.neutral20,
  borderShade: pt.neutral40,
  background: pt.neutral05,
  backgroundTint: "rgba(234,237,245,0.5)",
  backgroundTransparent: "rgba(255,255,255,0)",
  backgroundShade: pt.neutral10,
  shadow: "rgba(0,0,0,0.2)",
  shadowTint: "rgba(129,130,136,0.2)",
  axisLine: pt.neutral70,
  axisLineTint: pt.neutral40,
  axisTick: pt.neutral70,
  axisTickMinor: pt.neutral60,
  axisLabel: pt.neutral70,
  axisSplitLine: pt.neutral15,
  axisMinorSplitLine: pt.neutral05
});
for (var Jr in pt)
  if (pt.hasOwnProperty(Jr)) {
    var jf = pt[Jr];
    Jr === "theme" ? vt.darkColor.theme = pt.theme.slice() : Jr === "highlight" ? vt.darkColor.highlight = "rgba(255,231,130,0.4)" : Jr.indexOf("accent") === 0 ? vt.darkColor[Jr] = lu(jf, null, function(e) {
      return e * 0.5;
    }, function(e) {
      return Math.min(1, 1.3 - e);
    }) : vt.darkColor[Jr] = lu(jf, null, function(e) {
      return e * 0.9;
    }, function(e) {
      return 1 - Math.pow(e, 1.5);
    });
  }
vt.size = {
  xxs: 2,
  xs: 5,
  s: 10,
  m: 15,
  l: 20,
  xl: 30,
  xxl: 40,
  xxxl: 50
};
var Bg = "";
typeof navigator < "u" && (Bg = navigator.platform || "");
var Ei = "rgba(0, 0, 0, 0.2)", Ng = vt.color.theme[0], vD = lu(Ng, null, null, 0.9);
const Fg = {
  darkMode: "auto",
  // backgroundColor: 'rgba(0,0,0,0)',
  colorBy: "series",
  color: vt.color.theme,
  gradientColor: [vD, Ng],
  aria: {
    decal: {
      decals: [{
        color: Ei,
        dashArrayX: [1, 0],
        dashArrayY: [2, 5],
        symbolSize: 1,
        rotation: Math.PI / 6
      }, {
        color: Ei,
        symbol: "circle",
        dashArrayX: [[8, 8], [0, 8, 8, 0]],
        dashArrayY: [6, 0],
        symbolSize: 0.8
      }, {
        color: Ei,
        dashArrayX: [1, 0],
        dashArrayY: [4, 3],
        rotation: -Math.PI / 4
      }, {
        color: Ei,
        dashArrayX: [[6, 6], [0, 6, 6, 0]],
        dashArrayY: [6, 0]
      }, {
        color: Ei,
        dashArrayX: [[1, 0], [1, 6]],
        dashArrayY: [1, 0, 6, 0],
        rotation: Math.PI / 4
      }, {
        color: Ei,
        symbol: "triangle",
        dashArrayX: [[9, 9], [0, 9, 9, 0]],
        dashArrayY: [7, 2],
        symbolSize: 0.75
      }]
    }
  },
  // If xAxis and yAxis declared, grid is created by default.
  // grid: {},
  textStyle: {
    // color: '#000',
    // decoration: 'none',
    // PENDING
    fontFamily: Bg.match(/^Win/) ? "Microsoft YaHei" : "sans-serif",
    // fontFamily: 'Arial, Verdana, sans-serif',
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "normal"
  },
  // http://blogs.adobe.com/webplatform/2014/02/24/using-blend-modes-in-html-canvas/
  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
  // Default is source-over
  blendMode: null,
  stateAnimation: {
    duration: 300,
    easing: "cubicOut"
  },
  animation: "auto",
  animationDuration: 1e3,
  animationDurationUpdate: 500,
  animationEasing: "cubicInOut",
  animationEasingUpdate: "cubicInOut",
  animationThreshold: 2e3,
  // Configuration for progressive/incremental rendering
  progressiveThreshold: 3e3,
  progressive: 400,
  // Threshold of if use single hover layer to optimize.
  // It is recommended that `hoverLayerThreshold` is equivalent to or less than
  // `progressiveThreshold`, otherwise hover will cause restart of progressive,
  // which is unexpected.
  // see example <echarts/test/heatmap-large.html>.
  hoverLayerThreshold: 3e3,
  // See: module:echarts/scale/Time
  useUTC: !1
};
var Pt = {
  Must: 1,
  Might: 2,
  Not: 3
  // Other cases
}, dD = st();
function pD(e) {
  dD(e).datasetMap = et();
}
function gD(e, t, r) {
  var i = {}, n = Ug(e);
  if (!n)
    return i;
  var a = t.sourceFormat, o = t.dimensionsDefine, s;
  (a === ye || a === Ae) && A(o, function(c, h) {
    (H(c) ? c.name : c) === "name" && (s = h);
  });
  var l = (function() {
    for (var c = {}, h = {}, v = [], f = 0, d = Math.min(5, r); f < d; f++) {
      var g = Vg(t.data, a, t.seriesLayoutBy, o, t.startIndex, f);
      v.push(g);
      var p = g === Pt.Not;
      if (p && c.v == null && f !== s && (c.v = f), (c.n == null || c.n === c.v || !p && v[c.n] === Pt.Not) && (c.n = f), m(c) && v[c.n] !== Pt.Not)
        return c;
      p || (g === Pt.Might && h.v == null && f !== s && (h.v = f), (h.n == null || h.n === h.v) && (h.n = f));
    }
    function m(y) {
      return y.v != null && y.n != null;
    }
    return m(c) ? c : m(h) ? h : null;
  })();
  if (l) {
    i.value = [l.v];
    var u = s ?? l.n;
    i.itemName = [u], i.seriesName = [u];
  }
  return i;
}
function Ug(e) {
  var t = e.get("data", !0);
  if (!t)
    return ga(e.ecModel, "dataset", {
      index: e.get("datasetIndex", !0),
      id: e.get("datasetId", !0)
    }, bc).models[0];
}
function mD(e) {
  return !e.get("transform", !0) && !e.get("fromTransformResult", !0) ? [] : ga(e.ecModel, "dataset", {
    index: e.get("fromDatasetIndex", !0),
    id: e.get("fromDatasetId", !0)
  }, bc).models;
}
function zg(e, t) {
  return Vg(e.data, e.sourceFormat, e.seriesLayoutBy, e.dimensionsDefine, e.startIndex, t);
}
function Vg(e, t, r, i, n, a) {
  var o, s = 5;
  if (ee(e))
    return Pt.Not;
  var l, u;
  if (i) {
    var c = i[a];
    H(c) ? (l = c.name, u = c.type) : X(c) && (l = c);
  }
  if (u != null)
    return u === "ordinal" ? Pt.Must : Pt.Not;
  if (t === zt) {
    var h = e;
    if (r === wi) {
      for (var v = h[a], f = 0; f < (v || []).length && f < s; f++)
        if ((o = w(v[n + f])) != null)
          return o;
    } else
      for (var f = 0; f < h.length && f < s; f++) {
        var d = h[n + f];
        if (d && (o = w(d[a])) != null)
          return o;
      }
  } else if (t === ye) {
    var g = e;
    if (!l)
      return Pt.Not;
    for (var f = 0; f < g.length && f < s; f++) {
      var p = g[f];
      if (p && (o = w(p[l])) != null)
        return o;
    }
  } else if (t === Ae) {
    var m = e;
    if (!l)
      return Pt.Not;
    var v = m[l];
    if (!v || ee(v))
      return Pt.Not;
    for (var f = 0; f < v.length && f < s; f++)
      if ((o = w(v[f])) != null)
        return o;
  } else if (t === Ce)
    for (var y = e, f = 0; f < y.length && f < s; f++) {
      var p = y[f], _ = hs(p);
      if (!F(_))
        return Pt.Not;
      if ((o = w(_[a])) != null)
        return o;
    }
  function w(b) {
    var S = X(b);
    if (b != null && isFinite(Number(b)) && b !== "")
      return S ? Pt.Might : Pt.Not;
    if (S && b !== "-")
      return Pt.Must;
  }
  return Pt.Not;
}
var yD = et();
function _D(e, t, r) {
  var i = yD.get(t);
  if (!i)
    return r;
  var n = i(e);
  return n ? r.concat(n) : r;
}
var $f = st();
st();
var Yc = (
  /** @class */
  (function() {
    function e() {
    }
    return e.prototype.getColorFromPalette = function(t, r, i) {
      var n = Xt(this.get("color", !0)), a = this.get("colorLayer", !0);
      return bD(this, $f, n, a, t, r, i);
    }, e.prototype.clearColorPalette = function() {
      SD(this, $f);
    }, e;
  })()
);
function wD(e, t) {
  for (var r = e.length, i = 0; i < r; i++)
    if (e[i].length > t)
      return e[i];
  return e[r - 1];
}
function bD(e, t, r, i, n, a, o) {
  a = a || e;
  var s = t(a), l = s.paletteIdx || 0, u = s.paletteNameMap = s.paletteNameMap || {};
  if (u.hasOwnProperty(n))
    return u[n];
  var c = o == null || !i ? r : wD(i, o);
  if (c = c || r, !(!c || !c.length)) {
    var h = c[l];
    return n && (u[n] = h), s.paletteIdx = (l + 1) % c.length, h;
  }
}
function SD(e, t) {
  t(e).paletteIdx = 0, t(e).paletteNameMap = {};
}
var Va, yn, tv, ev = "\0_ec_inner", xD = 1, Xc = (
  /** @class */
  (function(e) {
    Q(t, e);
    function t() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return t.prototype.init = function(r, i, n, a, o, s) {
      a = a || {}, this.option = null, this._theme = new mt(a), this._locale = new mt(o), this._optionManager = s;
    }, t.prototype.setOption = function(r, i, n) {
      var a = nv(i);
      this._optionManager.setOption(r, n, a), this._resetOption(null, a);
    }, t.prototype.resetOption = function(r, i) {
      return this._resetOption(r, nv(i));
    }, t.prototype._resetOption = function(r, i) {
      var n = !1, a = this._optionManager;
      if (!r || r === "recreate") {
        var o = a.mountOption(r === "recreate");
        !this.option || r === "recreate" ? tv(this, o) : (this.restoreData(), this._mergeOption(o, i)), n = !0;
      }
      if ((r === "timeline" || r === "media") && this.restoreData(), !r || r === "recreate" || r === "timeline") {
        var s = a.getTimelineOption(this);
        s && (n = !0, this._mergeOption(s, i));
      }
      if (!r || r === "recreate" || r === "media") {
        var l = a.getMediaOption(this);
        l.length && A(l, function(u) {
          n = !0, this._mergeOption(u, i);
        }, this);
      }
      return n;
    }, t.prototype.mergeOption = function(r) {
      this._mergeOption(r, null);
    }, t.prototype._mergeOption = function(r, i) {
      var n = this.option, a = this._componentsMap, o = this._componentsCount, s = [], l = et(), u = i && i.replaceMergeMainTypeMap;
      pD(this), A(r, function(h, v) {
        h != null && (ct.hasClass(v) ? v && (s.push(v), l.set(v, !0)) : n[v] = n[v] == null ? tt(h) : At(n[v], h, !0));
      }), u && u.each(function(h, v) {
        ct.hasClass(v) && !l.get(v) && (s.push(v), l.set(v, !0));
      }), ct.topologicalTravel(s, ct.getAllClassMainTypes(), c, this);
      function c(h) {
        var v = _D(this, h, Xt(r[h])), f = a.get(h), d = (
          // `!oldCmptList` means init. See the comment in `mappingToExists`
          f ? u && u.get(h) ? "replaceMerge" : "normalMerge" : "replaceAll"
        ), g = OT(f, v, d);
        HT(g, h, ct), n[h] = null, a.set(h, null), o.set(h, 0);
        var p = [], m = [], y = 0, _;
        A(g, function(w, b) {
          var S = w.existing, T = w.newOption;
          if (!T)
            S && (S.mergeOption({}, this), S.optionUpdated({}, !1));
          else {
            var C = h === "series", x = ct.getClass(
              h,
              w.keyInfo.subType,
              !C
              // Give a more detailed warn later if series don't exists
            );
            if (!x)
              return;
            if (h === "tooltip") {
              if (_)
                return;
              _ = !0;
            }
            if (S && S.constructor === x)
              S.name = w.keyInfo.name, S.mergeOption(T, this), S.optionUpdated(T, !1);
            else {
              var M = P({
                componentIndex: b
              }, w.keyInfo);
              S = new x(T, this, this, M), P(S, M), w.brandNew && (S.__requireNewView = !0), S.init(T, this, this), S.optionUpdated(null, !0);
            }
          }
          S ? (p.push(S.option), m.push(S), y++) : (p.push(void 0), m.push(void 0));
        }, this), n[h] = p, a.set(h, m), o.set(h, y), h === "series" && Va(this);
      }
      this._seriesIndices || Va(this);
    }, t.prototype.getOption = function() {
      var r = tt(this.option);
      return A(r, function(i, n) {
        if (ct.hasClass(n)) {
          for (var a = Xt(i), o = a.length, s = !1, l = o - 1; l >= 0; l--)
            a[l] && !$n(a[l]) ? s = !0 : (a[l] = null, !s && o--);
          a.length = o, r[n] = a;
        }
      }), delete r[ev], r;
    }, t.prototype.setTheme = function(r) {
      this._theme = new mt(r), this._resetOption("recreate", null);
    }, t.prototype.getTheme = function() {
      return this._theme;
    }, t.prototype.getLocaleModel = function() {
      return this._locale;
    }, t.prototype.setUpdatePayload = function(r) {
      this._payload = r;
    }, t.prototype.getUpdatePayload = function() {
      return this._payload;
    }, t.prototype.getComponent = function(r, i) {
      var n = this._componentsMap.get(r);
      if (n) {
        var a = n[i || 0];
        if (a)
          return a;
        if (i == null) {
          for (var o = 0; o < n.length; o++)
            if (n[o])
              return n[o];
        }
      }
    }, t.prototype.queryComponents = function(r) {
      var i = r.mainType;
      if (!i)
        return [];
      var n = r.index, a = r.id, o = r.name, s = this._componentsMap.get(i);
      if (!s || !s.length)
        return [];
      var l;
      return n != null ? (l = [], A(Xt(n), function(u) {
        s[u] && l.push(s[u]);
      })) : a != null ? l = rv("id", a, s) : o != null ? l = rv("name", o, s) : l = de(s, function(u) {
        return !!u;
      }), iv(l, r);
    }, t.prototype.findComponents = function(r) {
      var i = r.query, n = r.mainType, a = s(i), o = a ? this.queryComponents(a) : de(this._componentsMap.get(n), function(u) {
        return !!u;
      });
      return l(iv(o, r));
      function s(u) {
        var c = n + "Index", h = n + "Id", v = n + "Name";
        return u && (u[c] != null || u[h] != null || u[v] != null) ? {
          mainType: n,
          // subType will be filtered finally.
          index: u[c],
          id: u[h],
          name: u[v]
        } : null;
      }
      function l(u) {
        return r.filter ? de(u, r.filter) : u;
      }
    }, t.prototype.eachComponent = function(r, i, n) {
      var a = this._componentsMap;
      if (at(r)) {
        var o = i, s = r;
        a.each(function(h, v) {
          for (var f = 0; h && f < h.length; f++) {
            var d = h[f];
            d && s.call(o, v, d, d.componentIndex);
          }
        });
      } else
        for (var l = X(r) ? a.get(r) : H(r) ? this.findComponents(r) : null, u = 0; l && u < l.length; u++) {
          var c = l[u];
          c && i.call(n, c, c.componentIndex);
        }
    }, t.prototype.getSeriesByName = function(r) {
      var i = Ye(r, null);
      return de(this._componentsMap.get("series"), function(n) {
        return !!n && i != null && n.name === i;
      });
    }, t.prototype.getSeriesByIndex = function(r) {
      return this._componentsMap.get("series")[r];
    }, t.prototype.getSeriesByType = function(r) {
      return de(this._componentsMap.get("series"), function(i) {
        return !!i && i.subType === r;
      });
    }, t.prototype.getSeries = function() {
      return de(this._componentsMap.get("series"), function(r) {
        return !!r;
      });
    }, t.prototype.getSeriesCount = function() {
      return this._componentsCount.get("series");
    }, t.prototype.eachSeries = function(r, i) {
      yn(this), A(this._seriesIndices, function(n) {
        var a = this._componentsMap.get("series")[n];
        r.call(i, a, n);
      }, this);
    }, t.prototype.eachRawSeries = function(r, i) {
      A(this._componentsMap.get("series"), function(n) {
        n && r.call(i, n, n.componentIndex);
      });
    }, t.prototype.eachSeriesByType = function(r, i, n) {
      yn(this), A(this._seriesIndices, function(a) {
        var o = this._componentsMap.get("series")[a];
        o.subType === r && i.call(n, o, a);
      }, this);
    }, t.prototype.eachRawSeriesByType = function(r, i, n) {
      return A(this.getSeriesByType(r), i, n);
    }, t.prototype.isSeriesFiltered = function(r) {
      return yn(this), this._seriesIndicesMap.get(r.componentIndex) == null;
    }, t.prototype.getCurrentSeriesIndices = function() {
      return (this._seriesIndices || []).slice();
    }, t.prototype.filterSeries = function(r, i) {
      yn(this);
      var n = [];
      A(this._seriesIndices, function(a) {
        var o = this._componentsMap.get("series")[a];
        r.call(i, o, a) && n.push(a);
      }, this), this._seriesIndices = n, this._seriesIndicesMap = et(n);
    }, t.prototype.restoreData = function(r) {
      Va(this);
      var i = this._componentsMap, n = [];
      i.each(function(a, o) {
        ct.hasClass(o) && n.push(o);
      }), ct.topologicalTravel(n, ct.getAllClassMainTypes(), function(a) {
        A(i.get(a), function(o) {
          o && (a !== "series" || !TD(o, r)) && o.restoreData();
        });
      });
    }, t.internalField = (function() {
      Va = function(r) {
        var i = r._seriesIndices = [];
        A(r._componentsMap.get("series"), function(n) {
          n && i.push(n.componentIndex);
        }), r._seriesIndicesMap = et(i);
      }, yn = function(r) {
      }, tv = function(r, i) {
        r.option = {}, r.option[ev] = xD, r._componentsMap = et({
          series: []
        }), r._componentsCount = et();
        var n = i.aria;
        H(n) && n.enabled == null && (n.enabled = !0), CD(i, r._theme.option), At(i, Fg, !1), r._mergeOption(i, null);
      };
    })(), t;
  })(mt)
);
function TD(e, t) {
  if (t) {
    var r = t.seriesIndex, i = t.seriesId, n = t.seriesName;
    return r != null && e.componentIndex !== r || i != null && e.id !== i || n != null && e.name !== n;
  }
}
function CD(e, t) {
  var r = e.color && !e.colorLayer;
  A(t, function(i, n) {
    n === "colorLayer" && r || n === "color" && e.color || ct.hasClass(n) || (typeof i == "object" ? e[n] = e[n] ? At(e[n], i, !1) : tt(i) : e[n] == null && (e[n] = i));
  });
}
function rv(e, t, r) {
  if (F(t)) {
    var i = et();
    return A(t, function(a) {
      if (a != null) {
        var o = Ye(a, null);
        o != null && i.set(a, !0);
      }
    }), de(r, function(a) {
      return a && i.get(a[e]);
    });
  } else {
    var n = Ye(t, null);
    return de(r, function(a) {
      return a && n != null && a[e] === n;
    });
  }
}
function iv(e, t) {
  return t.hasOwnProperty("subType") ? de(e, function(r) {
    return r && r.subType === t.subType;
  }) : e;
}
function nv(e) {
  var t = et();
  return e && A(Xt(e.replaceMerge), function(r) {
    t.set(r, !0);
  }), {
    replaceMergeMainTypeMap: t
  };
}
lr(Xc, Yc);
var AD = /^(min|max)?(.+)$/, MD = (
  /** @class */
  (function() {
    function e(t) {
      this._timelineOptions = [], this._mediaList = [], this._currentMediaIndices = [], this._api = t;
    }
    return e.prototype.setOption = function(t, r, i) {
      t && (A(Xt(t.series), function(o) {
        o && o.data && ee(o.data) && Jl(o.data);
      }), A(Xt(t.dataset), function(o) {
        o && o.source && ee(o.source) && Jl(o.source);
      })), t = tt(t);
      var n = this._optionBackup, a = DD(t, r, !n);
      this._newBaseOption = a.baseOption, n ? (a.timelineOptions.length && (n.timelineOptions = a.timelineOptions), a.mediaList.length && (n.mediaList = a.mediaList), a.mediaDefault && (n.mediaDefault = a.mediaDefault)) : this._optionBackup = a;
    }, e.prototype.mountOption = function(t) {
      var r = this._optionBackup;
      return this._timelineOptions = r.timelineOptions, this._mediaList = r.mediaList, this._mediaDefault = r.mediaDefault, this._currentMediaIndices = [], tt(t ? r.baseOption : this._newBaseOption);
    }, e.prototype.getTimelineOption = function(t) {
      var r, i = this._timelineOptions;
      if (i.length) {
        var n = t.getComponent("timeline");
        n && (r = tt(
          // FIXME:TS as TimelineModel or quivlant interface
          i[n.getCurrentIndex()]
        ));
      }
      return r;
    }, e.prototype.getMediaOption = function(t) {
      var r = this._api.getWidth(), i = this._api.getHeight(), n = this._mediaList, a = this._mediaDefault, o = [], s = [];
      if (!n.length && !a)
        return s;
      for (var l = 0, u = n.length; l < u; l++)
        kD(n[l].query, r, i) && o.push(l);
      return !o.length && a && (o = [-1]), o.length && !ID(o, this._currentMediaIndices) && (s = it(o, function(c) {
        return tt(c === -1 ? a.option : n[c].option);
      })), this._currentMediaIndices = o, s;
    }, e;
  })()
);
function DD(e, t, r) {
  var i = [], n, a, o = e.baseOption, s = e.timeline, l = e.options, u = e.media, c = !!e.media, h = !!(l || s || o && o.timeline);
  o ? (a = o, a.timeline || (a.timeline = s)) : ((h || c) && (e.options = e.media = null), a = e), c && F(u) && A(u, function(f) {
    f && f.option && (f.query ? i.push(f) : n || (n = f));
  }), v(a), A(l, function(f) {
    return v(f);
  }), A(i, function(f) {
    return v(f.option);
  });
  function v(f) {
    A(t, function(d) {
      d(f, r);
    });
  }
  return {
    baseOption: a,
    timelineOptions: l || [],
    mediaDefault: n,
    mediaList: i
  };
}
function kD(e, t, r) {
  var i = {
    width: t,
    height: r,
    aspectratio: t / r
    // lower case for convenience.
  }, n = !0;
  return A(e, function(a, o) {
    var s = o.match(AD);
    if (!(!s || !s[1] || !s[2])) {
      var l = s[1], u = s[2].toLowerCase();
      LD(i[u], a, l) || (n = !1);
    }
  }), n;
}
function LD(e, t, r) {
  return r === "min" ? e >= t : r === "max" ? e <= t : e === t;
}
function ID(e, t) {
  return e.join(",") === t.join(",");
}
var _e = A, aa = H, av = ["areaStyle", "lineStyle", "nodeStyle", "linkStyle", "chordStyle", "label", "labelLine"];
function xl(e) {
  var t = e && e.itemStyle;
  if (t)
    for (var r = 0, i = av.length; r < i; r++) {
      var n = av[r], a = t.normal, o = t.emphasis;
      a && a[n] && (e[n] = e[n] || {}, e[n].normal ? At(e[n].normal, a[n]) : e[n].normal = a[n], a[n] = null), o && o[n] && (e[n] = e[n] || {}, e[n].emphasis ? At(e[n].emphasis, o[n]) : e[n].emphasis = o[n], o[n] = null);
    }
}
function Ut(e, t, r) {
  if (e && e[t] && (e[t].normal || e[t].emphasis)) {
    var i = e[t].normal, n = e[t].emphasis;
    i && (r ? (e[t].normal = e[t].emphasis = null, wt(e[t], i)) : e[t] = i), n && (e.emphasis = e.emphasis || {}, e.emphasis[t] = n, n.focus && (e.emphasis.focus = n.focus), n.blurScope && (e.emphasis.blurScope = n.blurScope));
  }
}
function On(e) {
  Ut(e, "itemStyle"), Ut(e, "lineStyle"), Ut(e, "areaStyle"), Ut(e, "label"), Ut(e, "labelLine"), Ut(e, "upperLabel"), Ut(e, "edgeLabel");
}
function St(e, t) {
  var r = aa(e) && e[t], i = aa(r) && r.textStyle;
  if (i)
    for (var n = 0, a = lf.length; n < a; n++) {
      var o = lf[n];
      i.hasOwnProperty(o) && (r[o] = i[o]);
    }
}
function fe(e) {
  e && (On(e), St(e, "label"), e.emphasis && St(e.emphasis, "label"));
}
function ED(e) {
  if (aa(e)) {
    xl(e), On(e), St(e, "label"), St(e, "upperLabel"), St(e, "edgeLabel"), e.emphasis && (St(e.emphasis, "label"), St(e.emphasis, "upperLabel"), St(e.emphasis, "edgeLabel"));
    var t = e.markPoint;
    t && (xl(t), fe(t));
    var r = e.markLine;
    r && (xl(r), fe(r));
    var i = e.markArea;
    i && fe(i);
    var n = e.data;
    if (e.type === "graph") {
      n = n || e.nodes;
      var a = e.links || e.edges;
      if (a && !ee(a))
        for (var o = 0; o < a.length; o++)
          fe(a[o]);
      A(e.categories, function(u) {
        On(u);
      });
    }
    if (n && !ee(n))
      for (var o = 0; o < n.length; o++)
        fe(n[o]);
    if (t = e.markPoint, t && t.data)
      for (var s = t.data, o = 0; o < s.length; o++)
        fe(s[o]);
    if (r = e.markLine, r && r.data)
      for (var l = r.data, o = 0; o < l.length; o++)
        F(l[o]) ? (fe(l[o][0]), fe(l[o][1])) : fe(l[o]);
    e.type === "gauge" ? (St(e, "axisLabel"), St(e, "title"), St(e, "detail")) : e.type === "treemap" ? (Ut(e.breadcrumb, "itemStyle"), A(e.levels, function(u) {
      On(u);
    })) : e.type === "tree" && On(e.leaves);
  }
}
function $e(e) {
  return F(e) ? e : e ? [e] : [];
}
function ov(e) {
  return (F(e) ? e[0] : e) || {};
}
function PD(e, t) {
  _e($e(e.series), function(i) {
    aa(i) && ED(i);
  });
  var r = ["xAxis", "yAxis", "radiusAxis", "angleAxis", "singleAxis", "parallelAxis", "radar"];
  t && r.push("valueAxis", "categoryAxis", "logAxis", "timeAxis"), _e(r, function(i) {
    _e($e(e[i]), function(n) {
      n && (St(n, "axisLabel"), St(n.axisPointer, "label"));
    });
  }), _e($e(e.parallel), function(i) {
    var n = i && i.parallelAxisDefault;
    St(n, "axisLabel"), St(n && n.axisPointer, "label");
  }), _e($e(e.calendar), function(i) {
    Ut(i, "itemStyle"), St(i, "dayLabel"), St(i, "monthLabel"), St(i, "yearLabel");
  }), _e($e(e.radar), function(i) {
    St(i, "name"), i.name && i.axisName == null && (i.axisName = i.name, delete i.name), i.nameGap != null && i.axisNameGap == null && (i.axisNameGap = i.nameGap, delete i.nameGap);
  }), _e($e(e.geo), function(i) {
    aa(i) && (fe(i), _e($e(i.regions), function(n) {
      fe(n);
    }));
  }), _e($e(e.timeline), function(i) {
    fe(i), Ut(i, "label"), Ut(i, "itemStyle"), Ut(i, "controlStyle", !0);
    var n = i.data;
    F(n) && A(n, function(a) {
      H(a) && (Ut(a, "label"), Ut(a, "itemStyle"));
    });
  }), _e($e(e.toolbox), function(i) {
    Ut(i, "iconStyle"), _e(i.feature, function(n) {
      Ut(n, "iconStyle");
    });
  }), St(ov(e.axisPointer), "label"), St(ov(e.tooltip).axisPointer, "label");
}
function RD(e, t) {
  for (var r = t.split(","), i = e, n = 0; n < r.length && (i = i && i[r[n]], i != null); n++)
    ;
  return i;
}
function OD(e, t, r, i) {
  for (var n = t.split(","), a = e, o, s = 0; s < n.length - 1; s++)
    o = n[s], a[o] == null && (a[o] = {}), a = a[o];
  a[n[s]] == null && (a[n[s]] = r);
}
function sv(e) {
  e && A(BD, function(t) {
    t[0] in e && !(t[1] in e) && (e[t[1]] = e[t[0]]);
  });
}
var BD = [["x", "left"], ["y", "top"], ["x2", "right"], ["y2", "bottom"]], ND = ["grid", "geo", "parallel", "legend", "toolbox", "title", "visualMap", "dataZoom", "timeline"], Tl = [["borderRadius", "barBorderRadius"], ["borderColor", "barBorderColor"], ["borderWidth", "barBorderWidth"]];
function _n(e) {
  var t = e && e.itemStyle;
  if (t)
    for (var r = 0; r < Tl.length; r++) {
      var i = Tl[r][1], n = Tl[r][0];
      t[i] != null && (t[n] = t[i]);
    }
}
function lv(e) {
  e && e.alignTo === "edge" && e.margin != null && e.edgeDistance == null && (e.edgeDistance = e.margin);
}
function uv(e) {
  e && e.downplay && !e.blur && (e.blur = e.downplay);
}
function FD(e) {
  e && e.focusNodeAdjacency != null && (e.emphasis = e.emphasis || {}, e.emphasis.focus == null && (e.emphasis.focus = "adjacency"));
}
function Hg(e, t) {
  if (e)
    for (var r = 0; r < e.length; r++)
      t(e[r]), e[r] && Hg(e[r].children, t);
}
function Wg(e, t) {
  PD(e, t), e.series = Xt(e.series), A(e.series, function(r) {
    if (H(r)) {
      var i = r.type;
      if (i === "line")
        r.clipOverflow != null && (r.clip = r.clipOverflow);
      else if (i === "pie" || i === "gauge") {
        r.clockWise != null && (r.clockwise = r.clockWise), lv(r.label);
        var n = r.data;
        if (n && !ee(n))
          for (var a = 0; a < n.length; a++)
            lv(n[a]);
        r.hoverOffset != null && (r.emphasis = r.emphasis || {}, (r.emphasis.scaleSize = null) && (r.emphasis.scaleSize = r.hoverOffset));
      } else if (i === "gauge") {
        var o = RD(r, "pointer.color");
        o != null && OD(r, "itemStyle.color", o);
      } else if (i === "bar") {
        _n(r), _n(r.backgroundStyle), _n(r.emphasis);
        var n = r.data;
        if (n && !ee(n))
          for (var a = 0; a < n.length; a++)
            typeof n[a] == "object" && (_n(n[a]), _n(n[a] && n[a].emphasis));
      } else if (i === "sunburst") {
        var s = r.highlightPolicy;
        s && (r.emphasis = r.emphasis || {}, r.emphasis.focus || (r.emphasis.focus = s)), uv(r), Hg(r.data, uv);
      } else i === "graph" || i === "sankey" ? FD(r) : i === "map" && (r.mapType && !r.map && (r.map = r.mapType), r.mapLocation && wt(r, r.mapLocation));
      r.hoverAnimation != null && (r.emphasis = r.emphasis || {}, r.emphasis && r.emphasis.scale == null && (r.emphasis.scale = r.hoverAnimation)), sv(r);
    }
  }), e.dataRange && (e.visualMap = e.dataRange), A(ND, function(r) {
    var i = e[r];
    i && (F(i) || (i = [i]), A(i, function(n) {
      sv(n);
    }));
  });
}
var UD = Ap(zD);
function zD(e) {
  var t = et();
  e.eachSeries(function(r) {
    var i = r.get("stack");
    if (i) {
      var n = t.get(i) || t.set(i, []), a = r.getData(), o = {
        // Used for calculate axis extent automatically.
        // TODO: Type getCalculationInfo return more specific type?
        stackResultDimension: a.getCalculationInfo("stackResultDimension"),
        stackedOverDimension: a.getCalculationInfo("stackedOverDimension"),
        stackedDimension: a.getCalculationInfo("stackedDimension"),
        stackedByDimension: a.getCalculationInfo("stackedByDimension"),
        isStackedByIndex: a.getCalculationInfo("isStackedByIndex"),
        data: a,
        seriesModel: r
      };
      if (!o.stackedDimension || !(o.isStackedByIndex || o.stackedByDimension))
        return;
      n.push(o);
    }
  }), t.each(function(r) {
    if (r.length !== 0) {
      var i = r[0].seriesModel, n = i.get("stackOrder") || "seriesAsc";
      n === "seriesDesc" && r.reverse(), A(r, function(a, o) {
        a.data.setCalculationInfo("stackedOnSeries", o > 0 ? r[o - 1].seriesModel : null);
      }), VD(r);
    }
  });
}
function VD(e) {
  A(e, function(t, r) {
    var i = [], n = [NaN, NaN], a = [t.stackResultDimension, t.stackedOverDimension], o = t.data, s = t.isStackedByIndex, l = t.seriesModel.get("stackStrategy") || "samesign";
    o.modify(a, function(u, c, h) {
      var v = o.get(t.stackedDimension, h);
      if (isNaN(v))
        return n;
      var f, d;
      s ? d = o.getRawIndex(h) : f = o.get(t.stackedByDimension, h);
      for (var g = NaN, p = r - 1; p >= 0; p--) {
        var m = e[p];
        if (s || (d = m.data.rawIndexOf(m.stackedByDimension, f)), d >= 0) {
          var y = m.data.getByRawIndex(m.stackResultDimension, d);
          if (l === "all" || l === "positive" && y > 0 || l === "negative" && y < 0 || l === "samesign" && v >= 0 && y > 0 || l === "samesign" && v <= 0 && y < 0) {
            v = MT(v, y), g = y;
            break;
          }
        }
      }
      return i[0] = v, i[1] = g, i;
    });
  });
}
var ws = (
  /** @class */
  /* @__PURE__ */ (function() {
    function e(t) {
      this.data = t.data || (t.sourceFormat === Ae ? {} : []), this.sourceFormat = t.sourceFormat || Vp, this.seriesLayoutBy = t.seriesLayoutBy || Xe, this.startIndex = t.startIndex || 0, this.dimensionsDetectedCount = t.dimensionsDetectedCount, this.metaRawOption = t.metaRawOption;
      var r = this.dimensionsDefine = t.dimensionsDefine;
      if (r)
        for (var i = 0; i < r.length; i++) {
          var n = r[i];
          n.type == null && zg(this, i) === Pt.Must && (n.type = "ordinal");
        }
    }
    return e;
  })()
);
function qc(e) {
  return e instanceof ws;
}
function Ou(e, t, r) {
  r = r || Yg(e);
  var i = t.seriesLayoutBy, n = WD(e, r, i, t.sourceHeader, t.dimensions), a = new ws({
    data: e,
    sourceFormat: r,
    seriesLayoutBy: i,
    dimensionsDefine: n.dimensionsDefine,
    startIndex: n.startIndex,
    dimensionsDetectedCount: n.dimensionsDetectedCount,
    metaRawOption: tt(t)
  });
  return a;
}
function Gg(e) {
  return new ws({
    data: e,
    sourceFormat: ee(e) ? Cr : Ce
  });
}
function HD(e) {
  return new ws({
    data: e.data,
    sourceFormat: e.sourceFormat,
    seriesLayoutBy: e.seriesLayoutBy,
    dimensionsDefine: tt(e.dimensionsDefine),
    startIndex: e.startIndex,
    dimensionsDetectedCount: e.dimensionsDetectedCount
  });
}
function Yg(e) {
  var t = Vp;
  if (ee(e))
    t = Cr;
  else if (F(e)) {
    e.length === 0 && (t = zt);
    for (var r = 0, i = e.length; r < i; r++) {
      var n = e[r];
      if (n != null) {
        if (F(n) || ee(n)) {
          t = zt;
          break;
        } else if (H(n)) {
          t = ye;
          break;
        }
      }
    }
  } else if (H(e)) {
    for (var a in e)
      if (ze(e, a) && te(e[a])) {
        t = Ae;
        break;
      }
  }
  return t;
}
function WD(e, t, r, i, n) {
  var a, o;
  if (!e)
    return {
      dimensionsDefine: cv(n),
      startIndex: o,
      dimensionsDetectedCount: a
    };
  if (t === zt) {
    var s = e;
    i === "auto" || i == null ? hv(function(u) {
      u != null && u !== "-" && (X(u) ? o == null && (o = 1) : o = 0);
    }, r, s, 10) : o = _t(i) ? i : i ? 1 : 0, !n && o === 1 && (n = [], hv(function(u, c) {
      n[c] = u != null ? u + "" : "";
    }, r, s, 1 / 0)), a = n ? n.length : r === wi ? s.length : s[0] ? s[0].length : null;
  } else if (t === ye)
    n || (n = GD(e));
  else if (t === Ae)
    n || (n = [], A(e, function(u, c) {
      n.push(c);
    }));
  else if (t === Ce) {
    var l = hs(e[0]);
    a = F(l) && l.length || 1;
  }
  return {
    startIndex: o,
    dimensionsDefine: cv(n),
    dimensionsDetectedCount: a
  };
}
function GD(e) {
  for (var t = 0, r; t < e.length && !(r = e[t++]); )
    ;
  if (r)
    return yt(r);
}
function cv(e) {
  if (e) {
    var t = et();
    return it(e, function(r, i) {
      r = H(r) ? r : {
        name: r
      };
      var n = {
        name: r.name,
        displayName: r.displayName,
        type: r.type
      };
      if (n.name == null)
        return n;
      n.name += "", n.displayName == null && (n.displayName = n.name);
      var a = t.get(n.name);
      return a ? n.name += "-" + a.count++ : t.set(n.name, {
        count: 1
      }), n;
    });
  }
}
function hv(e, t, r, i) {
  if (t === wi)
    for (var n = 0; n < r.length && n < i; n++)
      e(r[n] ? r[n][0] : null, n);
  else
    for (var a = r[0] || [], n = 0; n < a.length && n < i; n++)
      e(a[n], n);
}
function Xg(e) {
  var t = e.sourceFormat;
  return t === ye || t === Ae;
}
var jr, $r, ti, ei, fv, vv, qg = (
  /** @class */
  (function() {
    function e(t, r) {
      var i = qc(t) ? t : Gg(t);
      this._source = i;
      var n = this._data = i.data, a = i.sourceFormat;
      i.seriesLayoutBy, a === Cr && (this._offset = 0, this._dimSize = r, this._data = n), vv(this, n, i);
    }
    return e.prototype.getSource = function() {
      return this._source;
    }, e.prototype.count = function() {
      return 0;
    }, e.prototype.getItem = function(t, r) {
    }, e.prototype.appendData = function(t) {
    }, e.prototype.clean = function() {
    }, e.protoInitialize = (function() {
      var t = e.prototype;
      t.pure = !1, t.persistent = !0;
    })(), e.internalField = (function() {
      var t;
      vv = function(o, s, l) {
        var u = l.sourceFormat, c = l.seriesLayoutBy, h = l.startIndex, v = l.dimensionsDefine, f = fv[Zc(u, c)];
        if (P(o, f), u === Cr)
          o.getItem = r, o.count = n, o.fillStorage = i;
        else {
          var d = Zg(u, c);
          o.getItem = ft(d, null, s, h, v);
          var g = Qg(u, c);
          o.count = ft(g, null, s, h, v);
        }
      };
      var r = function(o, s) {
        o = o - this._offset, s = s || [];
        for (var l = this._data, u = this._dimSize, c = u * o, h = 0; h < u; h++)
          s[h] = l[c + h];
        return s;
      }, i = function(o, s, l, u) {
        for (var c = this._data, h = this._dimSize, v = 0; v < h; v++) {
          for (var f = u[v], d = f[0] == null ? 1 / 0 : f[0], g = f[1] == null ? -1 / 0 : f[1], p = s - o, m = l[v], y = 0; y < p; y++) {
            var _ = c[y * h + v];
            m[o + y] = _, _ < d && (d = _), _ > g && (g = _);
          }
          f[0] = d, f[1] = g;
        }
      }, n = function() {
        return this._data ? this._data.length / this._dimSize : 0;
      };
      fv = (t = {}, t[zt + "_" + Xe] = {
        pure: !0,
        appendData: a
      }, t[zt + "_" + wi] = {
        pure: !0,
        appendData: function() {
          throw new Error('Do not support appendData when set seriesLayoutBy: "row".');
        }
      }, t[ye] = {
        pure: !0,
        appendData: a
      }, t[Ae] = {
        pure: !0,
        appendData: function(o) {
          var s = this._data;
          A(o, function(l, u) {
            for (var c = s[u] || (s[u] = []), h = 0; h < (l || []).length; h++)
              c.push(l[h]);
          });
        }
      }, t[Ce] = {
        appendData: a
      }, t[Cr] = {
        persistent: !1,
        pure: !0,
        appendData: function(o) {
          this._data = o;
        },
        // Clean self if data is already used.
        clean: function() {
          this._offset += this.count(), this._data = null;
        }
      }, t);
      function a(o) {
        for (var s = 0; s < o.length; s++)
          this._data.push(o[s]);
      }
    })(), e;
  })()
), Ha = function(e) {
  F(e) || bp("series.data or dataset.source must be an array.");
};
jr = {}, jr[zt + "_" + Xe] = Ha, jr[zt + "_" + wi] = Ha, jr[ye] = Ha, jr[Ae] = function(e, t) {
  for (var r = 0; r < t.length; r++) {
    var i = t[r].name;
    i == null && bp("dimension name must not be null/undefined.");
  }
}, jr[Ce] = Ha;
var dv = function(e, t, r, i) {
  return e[i];
}, YD = ($r = {}, $r[zt + "_" + Xe] = function(e, t, r, i) {
  return e[i + t];
}, $r[zt + "_" + wi] = function(e, t, r, i, n) {
  i += t;
  for (var a = n || [], o = e, s = 0; s < o.length; s++) {
    var l = o[s];
    a[s] = l ? l[i] : null;
  }
  return a;
}, $r[ye] = dv, $r[Ae] = function(e, t, r, i, n) {
  for (var a = n || [], o = 0; o < r.length; o++) {
    var s = r[o].name, l = s != null ? e[s] : null;
    a[o] = l ? l[i] : null;
  }
  return a;
}, $r[Ce] = dv, $r);
function Zg(e, t) {
  var r = YD[Zc(e, t)];
  return r;
}
var pv = function(e, t, r) {
  return e.length;
}, XD = (ti = {}, ti[zt + "_" + Xe] = function(e, t, r) {
  return Math.max(0, e.length - t);
}, ti[zt + "_" + wi] = function(e, t, r) {
  var i = e[0];
  return i ? Math.max(0, i.length - t) : 0;
}, ti[ye] = pv, ti[Ae] = function(e, t, r) {
  var i = r[0].name, n = i != null ? e[i] : null;
  return n ? n.length : 0;
}, ti[Ce] = pv, ti);
function Qg(e, t) {
  var r = XD[Zc(e, t)];
  return r;
}
var Cl = function(e, t, r) {
  return e[t];
}, qD = (ei = {}, ei[zt] = Cl, ei[ye] = function(e, t, r) {
  return e[r];
}, ei[Ae] = Cl, ei[Ce] = function(e, t, r) {
  var i = hs(e);
  return i instanceof Array ? i[t] : i;
}, ei[Cr] = Cl, ei);
function Kg(e) {
  var t = qD[e];
  return t;
}
function Zc(e, t) {
  return e === zt ? e + "_" + t : e;
}
function Ho(e, t, r) {
  if (e) {
    var i = e.getRawDataItem(t);
    if (i != null) {
      var n = e.getStore(), a = n.getSource().sourceFormat;
      if (r != null) {
        var o = e.getDimensionIndex(r), s = n.getDimensionProperty(o);
        return Kg(a)(i, o, s);
      } else {
        var l = i;
        return a === Ce && (l = hs(i)), l;
      }
    }
  }
}
var ZD = /\{@(.+?)\}/g, QD = (
  /** @class */
  (function() {
    function e() {
    }
    return e.prototype.getDataParams = function(t, r) {
      var i = this.getData(r), n = this.getRawValue(t, r), a = i.getRawIndex(t), o = i.getName(t), s = i.getRawDataItem(t), l = i.getItemVisual(t, "style"), u = l && l[i.getItemVisual(t, "drawType") || "fill"], c = l && l.stroke, h = this.mainType, v = h === "series", f = i.userOutput && i.userOutput.get();
      return {
        componentType: h,
        componentSubType: this.subType,
        componentIndex: this.componentIndex,
        seriesType: v ? this.subType : null,
        seriesIndex: this.seriesIndex,
        seriesId: v ? this.id : null,
        seriesName: v ? this.name : null,
        name: o,
        dataIndex: a,
        data: s,
        dataType: r,
        value: n,
        color: u,
        borderColor: c,
        dimensionNames: f ? f.fullDimensions : null,
        encode: f ? f.encode : null,
        // Param name list for mapping `a`, `b`, `c`, `d`, `e`
        $vars: ["seriesName", "name", "value"]
      };
    }, e.prototype.getFormattedLabel = function(t, r, i, n, a, o) {
      r = r || "normal";
      var s = this.getData(i), l = this.getDataParams(t, i);
      if (o && (l.value = o.interpolatedValue), n != null && F(l.value) && (l.value = l.value[n]), !a) {
        var u = s.getItemModel(t);
        a = u.get(r === "normal" ? ["label", "formatter"] : [r, "label", "formatter"]);
      }
      if (at(a))
        return l.status = r, l.dimensionIndex = n, a(l);
      if (X(a)) {
        var c = Lg(a, l);
        return c.replace(ZD, function(h, v) {
          var f = v.length, d = v;
          d.charAt(0) === "[" && d.charAt(f - 1) === "]" && (d = +d.slice(1, f - 1));
          var g = Ho(s, t, d);
          if (o && F(o.interpolatedValue)) {
            var p = s.getDimensionIndex(d);
            p >= 0 && (g = o.interpolatedValue[p]);
          }
          return g != null ? g + "" : "";
        });
      }
    }, e.prototype.getRawValue = function(t, r) {
      return Ho(this.getData(r), t);
    }, e.prototype.formatTooltip = function(t, r, i) {
    }, e;
  })()
);
function gv(e) {
  var t, r;
  return H(e) ? e.type && (r = e) : t = e, {
    text: t,
    // markers: markers || markersExisting,
    frag: r
  };
}
function Xn(e) {
  return new KD(e);
}
var KD = (
  /** @class */
  (function() {
    function e(t) {
      t = t || {}, this._reset = t.reset, this._plan = t.plan, this._count = t.count, this._onDirty = t.onDirty, this._dirty = !0;
    }
    return e.prototype.perform = function(t) {
      var r = this._upstream, i = t && t.skip;
      if (this._dirty && r) {
        var n = this.context;
        n.data = n.outputData = r.context.outputData;
      }
      this.__pipeline && (this.__pipeline.currentTask = this);
      var a;
      this._plan && !i && (a = this._plan(this.context));
      var o = c(this._modBy), s = this._modDataCount || 0, l = c(t && t.modBy), u = t && t.modDataCount || 0;
      (o !== l || s !== u) && (a = "reset");
      function c(y) {
        return !(y >= 1) && (y = 1), y;
      }
      var h;
      (this._dirty || a === "reset") && (this._dirty = !1, h = this._doReset(i)), this._modBy = l, this._modDataCount = u;
      var v = t && t.step;
      if (r ? this._dueEnd = r._outputDueEnd : this._dueEnd = this._count ? this._count(this.context) : 1 / 0, this._progress) {
        var f = this._dueIndex, d = Math.min(v != null ? this._dueIndex + v : 1 / 0, this._dueEnd);
        if (!i && (h || f < d)) {
          var g = this._progress;
          if (F(g))
            for (var p = 0; p < g.length; p++)
              this._doProgress(g[p], f, d, l, u);
          else
            this._doProgress(g, f, d, l, u);
        }
        this._dueIndex = d;
        var m = this._settedOutputEnd != null ? this._settedOutputEnd : d;
        this._outputDueEnd = m;
      } else
        this._dueIndex = this._outputDueEnd = this._settedOutputEnd != null ? this._settedOutputEnd : this._dueEnd;
      return this.unfinished();
    }, e.prototype.dirty = function() {
      this._dirty = !0, this._onDirty && this._onDirty(this.context);
    }, e.prototype._doProgress = function(t, r, i, n, a) {
      mv.reset(r, i, n, a), this._callingProgress = t, this._callingProgress({
        start: r,
        end: i,
        count: i - r,
        next: mv.next
      }, this.context);
    }, e.prototype._doReset = function(t) {
      this._dueIndex = this._outputDueEnd = this._dueEnd = 0, this._settedOutputEnd = null;
      var r, i;
      !t && this._reset && (r = this._reset(this.context), r && r.progress && (i = r.forceFirstProgress, r = r.progress), F(r) && !r.length && (r = null)), this._progress = r, this._modBy = this._modDataCount = null;
      var n = this._downstream;
      return n && n.dirty(), i;
    }, e.prototype.unfinished = function() {
      return this._progress && this._dueIndex < this._dueEnd;
    }, e.prototype.pipe = function(t) {
      (this._downstream !== t || this._dirty) && (this._downstream = t, t._upstream = this, t.dirty());
    }, e.prototype.dispose = function() {
      this._disposed || (this._upstream && (this._upstream._downstream = null), this._downstream && (this._downstream._upstream = null), this._dirty = !1, this._disposed = !0);
    }, e.prototype.getUpstream = function() {
      return this._upstream;
    }, e.prototype.getDownstream = function() {
      return this._downstream;
    }, e.prototype.setOutputEnd = function(t) {
      this._outputDueEnd = this._settedOutputEnd = t;
    }, e;
  })()
), mv = /* @__PURE__ */ (function() {
  var e, t, r, i, n, a = {
    reset: function(l, u, c, h) {
      t = l, e = u, r = c, i = h, n = Math.ceil(i / r), a.next = r > 1 && i > 0 ? s : o;
    }
  };
  return a;
  function o() {
    return t < e ? t++ : null;
  }
  function s() {
    var l = t % n * r + Math.ceil(t / n), u = t >= e ? null : l < i ? l : t;
    return t++, u;
  }
})();
function yo(e, t) {
  var r = t && t.type;
  return r === "ordinal" ? e : (r === "time" && !_t(e) && e != null && e !== "-" && (e = +cs(e)), e == null || e === "" ? NaN : Number(e));
}
et({
  number: function(e) {
    return parseFloat(e);
  },
  time: function(e) {
    return +cs(e);
  },
  trim: function(e) {
    return X(e) ? Be(e) : e;
  }
});
var JD = (
  /** @class */
  (function() {
    function e(t, r) {
      var i = t === "desc";
      this._resultLT = i ? 1 : -1, r == null && (r = i ? "min" : "max"), this._incomparable = r === "min" ? -1 / 0 : 1 / 0;
    }
    return e.prototype.evaluate = function(t, r) {
      var i = _t(t) ? t : Ro(t), n = _t(r) ? r : Ro(r), a = isNaN(i), o = isNaN(n);
      if (a && (i = this._incomparable), o && (n = this._incomparable), a && o) {
        var s = X(t), l = X(r);
        s && (i = l ? t : 0), l && (n = s ? r : 0);
      }
      return i < n ? this._resultLT : i > n ? -this._resultLT : 0;
    }, e;
  })()
);
function jD(e) {
  var t = "", r = -1 / 0, i = -1 / 0, n = 1 / 0, a = 1 / 0;
  return e && (e.g != null && (t += "G" + e.g, r = e.g), e.ge != null && (t += "GE" + e.ge, i = e.ge), e.l != null && (t += "L" + e.l, n = e.l), e.le != null && (t += "LE" + e.le, a = e.le)), {
    key: t,
    g: r,
    ge: i,
    l: n,
    le: a
  };
}
function $D(e, t) {
  return t > e.g && t >= e.ge && t < e.l && t <= e.le;
}
var t2 = (
  /** @class */
  (function() {
    function e() {
    }
    return e.prototype.getRawData = function() {
      throw new Error("not supported");
    }, e.prototype.getRawDataItem = function(t) {
      throw new Error("not supported");
    }, e.prototype.cloneRawData = function() {
    }, e.prototype.getDimensionInfo = function(t) {
    }, e.prototype.cloneAllDimensionInfo = function() {
    }, e.prototype.count = function() {
    }, e.prototype.retrieveValue = function(t, r) {
    }, e.prototype.retrieveValueFromItem = function(t, r) {
    }, e.prototype.convertValue = function(t, r) {
      return yo(t, r);
    }, e;
  })()
);
function e2(e, t) {
  var r = new t2(), i = e.data, n = r.sourceFormat = e.sourceFormat, a = e.startIndex, o = "";
  e.seriesLayoutBy !== Xe && Jt(o);
  var s = [], l = {}, u = e.dimensionsDefine;
  if (u)
    A(u, function(g, p) {
      var m = g.name, y = {
        index: p,
        name: m,
        displayName: g.displayName
      };
      if (s.push(y), m != null) {
        var _ = "";
        ze(l, m) && Jt(_), l[m] = y;
      }
    });
  else
    for (var c = 0; c < e.dimensionsDetectedCount; c++)
      s.push({
        index: c
      });
  var h = Zg(n, Xe);
  t.__isBuiltIn && (r.getRawDataItem = function(g) {
    return h(i, a, s, g);
  }, r.getRawData = ft(r2, null, e)), r.cloneRawData = ft(i2, null, e);
  var v = Qg(n, Xe);
  r.count = ft(v, null, i, a, s);
  var f = Kg(n);
  r.retrieveValue = function(g, p) {
    var m = h(i, a, s, g);
    return d(m, p);
  };
  var d = r.retrieveValueFromItem = function(g, p) {
    if (g != null) {
      var m = s[p];
      if (m)
        return f(g, p, m.name);
    }
  };
  return r.getDimensionInfo = ft(n2, null, s, l), r.cloneAllDimensionInfo = ft(a2, null, s), r;
}
function r2(e) {
  var t = e.sourceFormat;
  if (!Qc(t)) {
    var r = "";
    Jt(r);
  }
  return e.data;
}
function i2(e) {
  var t = e.sourceFormat, r = e.data;
  if (!Qc(t)) {
    var i = "";
    Jt(i);
  }
  if (t === zt) {
    for (var n = [], a = 0, o = r.length; a < o; a++)
      n.push(r[a].slice());
    return n;
  } else if (t === ye) {
    for (var n = [], a = 0, o = r.length; a < o; a++)
      n.push(P({}, r[a]));
    return n;
  }
}
function n2(e, t, r) {
  if (r != null) {
    if (_t(r) || !isNaN(r) && !ze(t, r))
      return e[r];
    if (ze(t, r))
      return t[r];
  }
}
function a2(e) {
  return tt(e);
}
var Jg = et();
function o2(e) {
  e = tt(e);
  var t = e.type, r = "";
  t || Jt(r);
  var i = t.split(":");
  i.length !== 2 && Jt(r);
  var n = !1;
  i[0] === "echarts" && (t = i[1], n = !0), e.__isBuiltIn = n, Jg.set(t, e);
}
function s2(e, t, r) {
  var i = Xt(e), n = i.length, a = "";
  n || Jt(a);
  for (var o = 0, s = n; o < s; o++) {
    var l = i[o];
    t = l2(l, t), o !== s - 1 && (t.length = Math.max(t.length, 1));
  }
  return t;
}
function l2(e, t, r, i) {
  var n = "";
  t.length || Jt(n), H(e) || Jt(n);
  var a = e.type, o = Jg.get(a);
  o || Jt(n);
  var s = it(t, function(u) {
    return e2(u, o);
  }), l = Xt(o.transform({
    upstream: s[0],
    upstreamList: s,
    config: tt(e.config)
  }));
  return it(l, function(u, c) {
    var h = "";
    H(u) || Jt(h), u.data || Jt(h);
    var v = Yg(u.data);
    Qc(v) || Jt(h);
    var f, d = t[0];
    if (d && c === 0 && !u.dimensions) {
      var g = d.startIndex;
      g && (u.data = d.data.slice(0, g).concat(u.data)), f = {
        seriesLayoutBy: Xe,
        sourceHeader: g,
        dimensions: d.metaRawOption.dimensions
      };
    } else
      f = {
        seriesLayoutBy: Xe,
        sourceHeader: 0,
        dimensions: u.dimensions
      };
    return Ou(u.data, f, null);
  });
}
function Qc(e) {
  return e === zt || e === ye;
}
var u2 = typeof Uint32Array === ds ? Array : Uint32Array, c2 = typeof Uint16Array === ds ? Array : Uint16Array, jg = typeof Int32Array === ds ? Array : Int32Array, yv = typeof Float64Array === ds ? Array : Float64Array, $g = {
  float: yv,
  int: jg,
  // Ordinal data type can be string or int
  ordinal: Array,
  number: Array,
  time: yv
}, Al;
function Pi(e) {
  return e > 65535 ? u2 : c2;
}
function h2(e) {
  var t = e.constructor;
  return t === Array ? e.slice() : new t(e);
}
function _v(e, t, r, i, n) {
  var a = $g[r || "float"];
  if (n) {
    var o = e[t], s = o && o.length;
    if (s !== i) {
      for (var l = new a(i), u = 0; u < s; u++)
        l[u] = o[u];
      e[t] = l;
    }
  } else
    e[t] = new a(i);
}
var Bu = (
  /** @class */
  (function() {
    function e() {
      this._chunks = [], this._rawExtent = [], this._extent = [], this._count = 0, this._rawCount = 0, this._calcDimNameToIdx = et();
    }
    return e.prototype.initData = function(t, r, i) {
      this._provider = t, this._chunks = [], this._indices = null, this.getRawIndex = this._getRawIdxIdentity;
      var n = t.getSource(), a = this.defaultDimValueGetter = Al[n.sourceFormat];
      this._dimValueGetter = i || a, this._rawExtent = [], Xg(n), this._dimensions = it(r, function(o) {
        return {
          // Only pick these two props. Not leak other properties like orderMeta.
          type: o.type,
          property: o.property
        };
      }), this._initDataFromProvider(0, t.count());
    }, e.prototype.getProvider = function() {
      return this._provider;
    }, e.prototype.getSource = function() {
      return this._provider.getSource();
    }, e.prototype.ensureCalculationDimension = function(t, r) {
      var i = this._calcDimNameToIdx, n = this._dimensions, a = i.get(t);
      if (a != null) {
        if (n[a].type === r)
          return a;
      } else
        a = n.length;
      return n[a] = {
        type: r
      }, i.set(t, a), this._chunks[a] = new $g[r || "float"](this._rawCount), this._rawExtent[a] = Mi(), a;
    }, e.prototype.collectOrdinalMeta = function(t, r) {
      var i = this._chunks[t], n = this._dimensions[t], a = this._rawExtent, o = n.ordinalOffset || 0, s = i.length;
      o === 0 && (a[t] = Mi());
      for (var l = a[t], u = o; u < s; u++) {
        var c = i[u] = r.parseAndCollect(i[u]);
        isNaN(c) || (l[0] = Math.min(c, l[0]), l[1] = Math.max(c, l[1]));
      }
      n.ordinalMeta = r, n.ordinalOffset = s, n.type = "ordinal";
    }, e.prototype.getOrdinalMeta = function(t) {
      var r = this._dimensions[t], i = r.ordinalMeta;
      return i;
    }, e.prototype.getDimensionProperty = function(t) {
      var r = this._dimensions[t];
      return r && r.property;
    }, e.prototype.appendData = function(t) {
      var r = this._provider, i = this.count();
      r.appendData(t);
      var n = r.count();
      return r.persistent || (n += i), i < n && this._initDataFromProvider(i, n, !0), [i, n];
    }, e.prototype.appendValues = function(t, r) {
      for (var i = this._chunks, n = this._dimensions, a = n.length, o = this._rawExtent, s = this.count(), l = s + Math.max(t.length, r || 0), u = 0; u < a; u++) {
        var c = n[u];
        _v(i, u, c.type, l, !0);
      }
      for (var h = [], v = s; v < l; v++)
        for (var f = v - s, d = 0; d < a; d++) {
          var c = n[d], g = Al.arrayRows.call(this, t[f] || h, c.property, f, d);
          i[d][v] = g;
          var p = o[d];
          g < p[0] && (p[0] = g), g > p[1] && (p[1] = g);
        }
      return this._rawCount = this._count = l, {
        start: s,
        end: l
      };
    }, e.prototype._initDataFromProvider = function(t, r, i) {
      for (var n = this._provider, a = this._chunks, o = this._dimensions, s = o.length, l = this._rawExtent, u = it(o, function(y) {
        return y.property;
      }), c = 0; c < s; c++) {
        var h = o[c];
        l[c] || (l[c] = Mi()), _v(a, c, h.type, r, i);
      }
      if (n.fillStorage)
        n.fillStorage(t, r, a, l);
      else
        for (var v = [], f = t; f < r; f++) {
          v = n.getItem(f, v);
          for (var d = 0; d < s; d++) {
            var g = a[d], p = this._dimValueGetter(v, u[d], f, d);
            g[f] = p;
            var m = l[d];
            p < m[0] && (m[0] = p), p > m[1] && (m[1] = p);
          }
        }
      !n.persistent && n.clean && n.clean(), this._rawCount = this._count = r, this._extent = [];
    }, e.prototype.count = function() {
      return this._count;
    }, e.prototype.get = function(t, r) {
      if (!(r >= 0 && r < this._count))
        return NaN;
      var i = this._chunks[t];
      return i ? i[this.getRawIndex(r)] : NaN;
    }, e.prototype.getValues = function(t, r) {
      var i = [], n = [];
      if (r == null) {
        r = t, t = [];
        for (var a = 0; a < this._dimensions.length; a++)
          n.push(a);
      } else
        n = t;
      for (var a = 0, o = n.length; a < o; a++)
        i.push(this.get(n[a], r));
      return i;
    }, e.prototype.getByRawIndex = function(t, r) {
      if (!(r >= 0 && r < this._rawCount))
        return NaN;
      var i = this._chunks[t];
      return i ? i[r] : NaN;
    }, e.prototype.getSum = function(t) {
      var r = this._chunks[t], i = 0;
      if (r)
        for (var n = 0, a = this.count(); n < a; n++) {
          var o = this.get(t, n);
          isNaN(o) || (i += o);
        }
      return i;
    }, e.prototype.getMedian = function(t) {
      var r = [];
      this.each([t], function(n) {
        isNaN(n) || r.push(n);
      }), TT(r);
      var i = this.count();
      return i === 0 ? 0 : i % 2 === 1 ? r[(i - 1) / 2] : (r[i / 2] + r[i / 2 - 1]) / 2;
    }, e.prototype.indexOfRawIndex = function(t) {
      if (t >= this._rawCount || t < 0)
        return -1;
      if (!this._indices)
        return t;
      var r = this._indices, i = r[t];
      if (i != null && i < this._count && i === t)
        return t;
      for (var n = 0, a = this._count - 1; n <= a; ) {
        var o = (n + a) / 2 | 0;
        if (r[o] < t)
          n = o + 1;
        else if (r[o] > t)
          a = o - 1;
        else
          return o;
      }
      return -1;
    }, e.prototype.getIndices = function() {
      var t, r = this._indices;
      if (r) {
        var i = r.constructor, n = this._count;
        if (i === Array) {
          t = new i(n);
          for (var a = 0; a < n; a++)
            t[a] = r[a];
        } else
          t = new i(r.buffer, 0, n);
      } else {
        var i = Pi(this._rawCount);
        t = new i(this.count());
        for (var a = 0; a < t.length; a++)
          t[a] = a;
      }
      return t;
    }, e.prototype.filter = function(t, r) {
      if (!this._count)
        return this;
      for (var i = this.clone(), n = i.count(), a = Pi(i._rawCount), o = new a(n), s = [], l = t.length, u = 0, c = t[0], h = i._chunks, v = 0; v < n; v++) {
        var f = void 0, d = i.getRawIndex(v);
        if (l === 0)
          f = r(v);
        else if (l === 1) {
          var g = h[c][d];
          f = r(g, v);
        } else {
          for (var p = 0; p < l; p++)
            s[p] = h[t[p]][d];
          s[p] = v, f = r.apply(null, s);
        }
        f && (o[u++] = d);
      }
      return u < n && (i._indices = o), i._count = u, i._extent = [], i._updateGetRawIdx(), i;
    }, e.prototype.selectRange = function(t) {
      var r = this.clone(), i = r._count;
      if (!i)
        return this;
      var n = yt(t), a = n.length;
      if (!a)
        return this;
      var o = r.count(), s = Pi(r._rawCount), l = new s(o), u = 0, c = n[0], h = t[c][0], v = t[c][1], f = r._chunks, d = !1;
      if (!r._indices) {
        var g = 0;
        if (a === 1) {
          for (var p = f[n[0]], m = 0; m < i; m++) {
            var y = p[m];
            (y >= h && y <= v || isNaN(y)) && (l[u++] = g), g++;
          }
          d = !0;
        } else if (a === 2) {
          for (var p = f[n[0]], _ = f[n[1]], w = t[n[1]][0], b = t[n[1]][1], m = 0; m < i; m++) {
            var y = p[m], S = _[m];
            (y >= h && y <= v || isNaN(y)) && (S >= w && S <= b || isNaN(S)) && (l[u++] = g), g++;
          }
          d = !0;
        }
      }
      if (!d)
        if (a === 1)
          for (var m = 0; m < o; m++) {
            var T = r.getRawIndex(m), y = f[n[0]][T];
            (y >= h && y <= v || isNaN(y)) && (l[u++] = T);
          }
        else
          for (var m = 0; m < o; m++) {
            for (var C = !0, T = r.getRawIndex(m), x = 0; x < a; x++) {
              var M = n[x], y = f[M][T];
              (y < t[M][0] || y > t[M][1]) && (C = !1);
            }
            C && (l[u++] = r.getRawIndex(m));
          }
      return u < o && (r._indices = l), r._count = u, r._extent = [], r._updateGetRawIdx(), r;
    }, e.prototype.map = function(t, r) {
      var i = this.clone(t);
      return this._updateDims(i, t, r), i;
    }, e.prototype.modify = function(t, r) {
      this._updateDims(this, t, r);
    }, e.prototype._updateDims = function(t, r, i) {
      for (var n = t._chunks, a = [], o = r.length, s = t.count(), l = [], u = t._rawExtent, c = 0; c < r.length; c++)
        u[r[c]] = Mi();
      for (var h = 0; h < s; h++) {
        for (var v = t.getRawIndex(h), f = 0; f < o; f++)
          l[f] = n[r[f]][v];
        l[o] = h;
        var d = i && i.apply(null, l);
        if (d != null) {
          typeof d != "object" && (a[0] = d, d = a);
          for (var c = 0; c < d.length; c++) {
            var g = r[c], p = d[c], m = u[g], y = n[g];
            y && (y[v] = p), p < m[0] && (m[0] = p), p > m[1] && (m[1] = p);
          }
        }
      }
    }, e.prototype.lttbDownSample = function(t, r) {
      var i = this.clone([t], !0), n = i._chunks, a = n[t], o = this.count(), s = 0, l = Math.floor(1 / r), u = this.getRawIndex(0), c, h, v, f = new (Pi(this._rawCount))(Math.min((Math.ceil(o / l) + 2) * 2, o));
      f[s++] = u;
      for (var d = 1; d < o - 1; d += l) {
        for (var g = Math.min(d + l, o - 1), p = Math.min(d + l * 2, o), m = (p + g) / 2, y = 0, _ = g; _ < p; _++) {
          var w = this.getRawIndex(_), b = a[w];
          isNaN(b) || (y += b);
        }
        y /= p - g;
        var S = d, T = Math.min(d + l, o), C = d - 1, x = a[u];
        c = -1, v = S;
        for (var M = -1, D = 0, _ = S; _ < T; _++) {
          var w = this.getRawIndex(_), b = a[w];
          if (isNaN(b)) {
            D++, M < 0 && (M = w);
            continue;
          }
          h = Math.abs((C - m) * (b - x) - (C - _) * (y - x)), h > c && (c = h, v = w);
        }
        D > 0 && D < T - S && (f[s++] = Math.min(M, v), v = Math.max(M, v)), f[s++] = v, u = v;
      }
      return f[s++] = this.getRawIndex(o - 1), i._count = s, i._indices = f, i.getRawIndex = this._getRawIdx, i;
    }, e.prototype.minmaxDownSample = function(t, r) {
      for (var i = this.clone([t], !0), n = i._chunks, a = Math.floor(1 / r), o = n[t], s = this.count(), l = new (Pi(this._rawCount))(Math.ceil(s / a) * 2), u = 0, c = 0; c < s; c += a) {
        var h = c, v = o[this.getRawIndex(h)], f = c, d = o[this.getRawIndex(f)], g = a;
        c + a > s && (g = s - c);
        for (var p = 0; p < g; p++) {
          var m = this.getRawIndex(c + p), y = o[m];
          y < v && (v = y, h = c + p), y > d && (d = y, f = c + p);
        }
        var _ = this.getRawIndex(h), w = this.getRawIndex(f);
        h < f ? (l[u++] = _, l[u++] = w) : (l[u++] = w, l[u++] = _);
      }
      return i._count = u, i._indices = l, i._updateGetRawIdx(), i;
    }, e.prototype.downSample = function(t, r, i, n) {
      for (var a = this.clone([t], !0), o = a._chunks, s = [], l = Math.floor(1 / r), u = o[t], c = this.count(), h = a._rawExtent[t] = Mi(), v = new (Pi(this._rawCount))(Math.ceil(c / l)), f = 0, d = 0; d < c; d += l) {
        l > c - d && (l = c - d, s.length = l);
        for (var g = 0; g < l; g++) {
          var p = this.getRawIndex(d + g);
          s[g] = u[p];
        }
        var m = i(s), y = this.getRawIndex(Math.min(d + n(s, m) || 0, c - 1));
        u[y] = m, m < h[0] && (h[0] = m), m > h[1] && (h[1] = m), v[f++] = y;
      }
      return a._count = f, a._indices = v, a._updateGetRawIdx(), a;
    }, e.prototype.each = function(t, r) {
      if (this._count)
        for (var i = t.length, n = this._chunks, a = 0, o = this.count(); a < o; a++) {
          var s = this.getRawIndex(a);
          switch (i) {
            case 0:
              r(a);
              break;
            case 1:
              r(n[t[0]][s], a);
              break;
            case 2:
              r(n[t[0]][s], n[t[1]][s], a);
              break;
            default:
              for (var l = 0, u = []; l < i; l++)
                u[l] = n[t[l]][s];
              u[l] = a, r.apply(null, u);
          }
        }
    }, e.prototype.getDataExtent = function(t, r) {
      var i = this._chunks[t], n = Mi();
      if (!i)
        return n;
      var a = this.count(), o = !this._indices && !r;
      if (o)
        return this._rawExtent[t].slice();
      var s = this._extent, l = s[t] || (s[t] = {}), u = jD(r), c = u.key, h = l[c];
      if (h)
        return h.slice();
      for (var v = n[0], f = n[1], d = 0; d < a; d++) {
        var g = this.getRawIndex(d), p = i[g];
        (!r || $D(u, p)) && (p < v && (v = p), p > f && (f = p));
      }
      return l[c] = [v, f];
    }, e.prototype.getRawDataItem = function(t) {
      var r = this.getRawIndex(t);
      if (this._provider.persistent)
        return this._provider.getItem(r);
      for (var i = [], n = this._chunks, a = 0; a < n.length; a++)
        i.push(n[a][r]);
      return i;
    }, e.prototype.clone = function(t, r) {
      var i = new e(), n = this._chunks, a = t && kr(t, function(s, l) {
        return s[l] = !0, s;
      }, {});
      if (a)
        for (var o = 0; o < n.length; o++)
          i._chunks[o] = a[o] ? h2(n[o]) : n[o];
      else
        i._chunks = n;
      return this._copyCommonProps(i), r || (i._indices = this._cloneIndices()), i._updateGetRawIdx(), i;
    }, e.prototype._copyCommonProps = function(t) {
      t._count = this._count, t._rawCount = this._rawCount, t._provider = this._provider, t._dimensions = this._dimensions, t._extent = tt(this._extent), t._rawExtent = tt(this._rawExtent);
    }, e.prototype._cloneIndices = function() {
      if (this._indices) {
        var t = this._indices.constructor, r = void 0;
        if (t === Array) {
          var i = this._indices.length;
          r = new t(i);
          for (var n = 0; n < i; n++)
            r[n] = this._indices[n];
        } else
          r = new t(this._indices);
        return r;
      }
      return null;
    }, e.prototype._getRawIdxIdentity = function(t) {
      return t;
    }, e.prototype._getRawIdx = function(t) {
      return t < this._count && t >= 0 ? this._indices[t] : -1;
    }, e.prototype._updateGetRawIdx = function() {
      this.getRawIndex = this._indices ? this._getRawIdx : this._getRawIdxIdentity;
    }, e.internalField = (function() {
      function t(r, i, n, a) {
        return yo(r[a], this._dimensions[a]);
      }
      Al = {
        arrayRows: t,
        objectRows: function(r, i, n, a) {
          return yo(r[i], this._dimensions[a]);
        },
        keyedColumns: t,
        original: function(r, i, n, a) {
          var o = r && (r.value == null ? r : r.value);
          return yo(o instanceof Array ? o[a] : o, this._dimensions[a]);
        },
        typedArray: function(r, i, n, a) {
          return r[a];
        }
      };
    })(), e;
  })()
), f2 = (
  /** @class */
  (function() {
    function e(t) {
      this._sourceList = [], this._storeList = [], this._upstreamSignList = [], this._versionSignBase = 0, this._dirty = !0, this._sourceHost = t;
    }
    return e.prototype.dirty = function() {
      this._setLocalSource([], []), this._storeList = [], this._dirty = !0;
    }, e.prototype._setLocalSource = function(t, r) {
      this._sourceList = t, this._upstreamSignList = r, this._versionSignBase++, this._versionSignBase > 9e10 && (this._versionSignBase = 0);
    }, e.prototype._getVersionSign = function() {
      return this._sourceHost.uid + "_" + this._versionSignBase;
    }, e.prototype.prepareSource = function() {
      this._isDirty() && (this._createSource(), this._dirty = !1);
    }, e.prototype._createSource = function() {
      this._setLocalSource([], []);
      var t = this._sourceHost, r = this._getUpstreamSourceManagers(), i = !!r.length, n, a;
      if (Wa(t)) {
        var o = t, s = void 0, l = void 0, u = void 0;
        if (i) {
          var c = r[0];
          c.prepareSource(), u = c.getSource(), s = u.data, l = u.sourceFormat, a = [c._getVersionSign()];
        } else
          s = o.get("data", !0), l = ee(s) ? Cr : Ce, a = [];
        var h = this._getSourceMetaRawOption() || {}, v = u && u.metaRawOption || {}, f = W(h.seriesLayoutBy, v.seriesLayoutBy) || null, d = W(h.sourceHeader, v.sourceHeader), g = W(h.dimensions, v.dimensions), p = f !== v.seriesLayoutBy || !!d != !!v.sourceHeader || g;
        n = p ? [Ou(s, {
          seriesLayoutBy: f,
          sourceHeader: d,
          dimensions: g
        }, l)] : [];
      } else {
        var m = t;
        if (i) {
          var y = this._applyTransform(r);
          n = y.sourceList, a = y.upstreamSignList;
        } else {
          var _ = m.get("source", !0);
          n = [Ou(_, this._getSourceMetaRawOption(), null)], a = [];
        }
      }
      this._setLocalSource(n, a);
    }, e.prototype._applyTransform = function(t) {
      var r = this._sourceHost, i = r.get("transform", !0), n = r.get("fromTransformResult", !0);
      if (n != null) {
        var a = "";
        t.length !== 1 && wv(a);
      }
      var o, s = [], l = [];
      return A(t, function(u) {
        u.prepareSource();
        var c = u.getSource(n || 0), h = "";
        n != null && !c && wv(h), s.push(c), l.push(u._getVersionSign());
      }), i ? o = s2(i, s, {
        datasetIndex: r.componentIndex
      }) : n != null && (o = [HD(s[0])]), {
        sourceList: o,
        upstreamSignList: l
      };
    }, e.prototype._isDirty = function() {
      if (this._dirty)
        return !0;
      for (var t = this._getUpstreamSourceManagers(), r = 0; r < t.length; r++) {
        var i = t[r];
        if (
          // Consider the case that there is ancestor diry, call it recursively.
          // The performance is probably not an issue because usually the chain is not long.
          i._isDirty() || this._upstreamSignList[r] !== i._getVersionSign()
        )
          return !0;
      }
    }, e.prototype.getSource = function(t) {
      t = t || 0;
      var r = this._sourceList[t];
      if (!r) {
        var i = this._getUpstreamSourceManagers();
        return i[0] && i[0].getSource(t);
      }
      return r;
    }, e.prototype.getSharedDataStore = function(t) {
      var r = t.makeStoreSchema();
      return this._innerGetDataStore(r.dimensions, t.source, r.hash);
    }, e.prototype._innerGetDataStore = function(t, r, i) {
      var n = 0, a = this._storeList, o = a[n];
      o || (o = a[n] = {});
      var s = o[i];
      if (!s) {
        var l = this._getUpstreamSourceManagers()[0];
        Wa(this._sourceHost) && l ? s = l._innerGetDataStore(t, r, i) : (s = new Bu(), s.initData(new qg(r, t.length), t)), o[i] = s;
      }
      return s;
    }, e.prototype._getUpstreamSourceManagers = function() {
      var t = this._sourceHost;
      if (Wa(t)) {
        var r = Ug(t);
        return r ? [r.getSourceManager()] : [];
      } else
        return it(mD(t), function(i) {
          return i.getSourceManager();
        });
    }, e.prototype._getSourceMetaRawOption = function() {
      var t = this._sourceHost, r, i, n;
      if (Wa(t))
        r = t.get("seriesLayoutBy", !0), i = t.get("sourceHeader", !0), n = t.get("dimensions", !0);
      else if (!this._getUpstreamSourceManagers().length) {
        var a = t;
        r = a.get("seriesLayoutBy", !0), i = a.get("sourceHeader", !0), n = a.get("dimensions", !0);
      }
      return {
        seriesLayoutBy: r,
        sourceHeader: i,
        dimensions: n
      };
    }, e;
  })()
);
function Wa(e) {
  return e.mainType === "series";
}
function wv(e) {
  throw new Error(e);
}
var v2 = "line-height:1";
function tm(e) {
  var t = e.lineHeight;
  return t == null ? v2 : "line-height:" + Qt(t + "") + "px";
}
function em(e, t) {
  var r = e.color || vt.color.tertiary, i = e.fontSize || 12, n = e.fontWeight || "400", a = e.color || vt.color.secondary, o = e.fontSize || 14, s = e.fontWeight || "900";
  return t === "html" ? {
    // eslint-disable-next-line max-len
    nameStyle: "font-size:" + Qt(i + "") + "px;color:" + Qt(r) + ";font-weight:" + Qt(n + ""),
    // eslint-disable-next-line max-len
    valueStyle: "font-size:" + Qt(o + "") + "px;color:" + Qt(a) + ";font-weight:" + Qt(s + "")
  } : {
    nameStyle: {
      fontSize: i,
      fill: r,
      fontWeight: n
    },
    valueStyle: {
      fontSize: o,
      fill: a,
      fontWeight: s
    }
  };
}
var d2 = [0, 10, 20, 30], p2 = ["", `
`, `

`, `


`];
function oa(e, t) {
  return t.type = e, t;
}
function Nu(e) {
  return e.type === "section";
}
function rm(e) {
  return Nu(e) ? g2 : m2;
}
function im(e) {
  if (Nu(e)) {
    var t = 0, r = e.blocks.length, i = r > 1 || r > 0 && !e.noHeader;
    return A(e.blocks, function(n) {
      var a = im(n);
      a >= t && (t = a + +(i && // 0 always can not be readable gap level.
      (!a || Nu(n) && !n.noHeader)));
    }), t;
  }
  return 0;
}
function g2(e, t, r, i) {
  var n = t.noHeader, a = y2(im(t)), o = [], s = t.blocks || [];
  nr(!s || F(s)), s = s || [];
  var l = e.orderMode;
  if (t.sortBlocks && l) {
    s = s.slice();
    var u = {
      valueAsc: "asc",
      valueDesc: "desc"
    };
    if (ze(u, l)) {
      var c = new JD(u[l], null);
      s.sort(function(g, p) {
        return c.evaluate(g.sortParam, p.sortParam);
      });
    } else l === "seriesDesc" && s.reverse();
  }
  A(s, function(g, p) {
    var m = t.valueFormatter, y = rm(g)(
      // Inherit valueFormatter
      m ? P(P({}, e), {
        valueFormatter: m
      }) : e,
      g,
      p > 0 ? a.html : 0,
      i
    );
    y != null && o.push(y);
  });
  var h = e.renderMode === "richText" ? o.join(a.richText) : Fu(i, o.join(""), n ? r : a.html);
  if (n)
    return h;
  var v = Pu(t.header, "ordinal", e.useUTC), f = em(i, e.renderMode).nameStyle, d = tm(i);
  return e.renderMode === "richText" ? nm(e, v, f) + a.richText + h : Fu(i, '<div style="' + f + ";" + d + ';">' + Qt(v) + "</div>" + h, r);
}
function m2(e, t, r, i) {
  var n = e.renderMode, a = t.noName, o = t.noValue, s = !t.markerType, l = t.name, u = e.useUTC, c = t.valueFormatter || e.valueFormatter || function(w) {
    return w = F(w) ? w : [w], it(w, function(b, S) {
      return Pu(b, F(f) ? f[S] : f, u);
    });
  };
  if (!(a && o)) {
    var h = s ? "" : e.markupStyleCreator.makeTooltipMarker(t.markerType, t.markerColor || vt.color.secondary, n), v = a ? "" : Pu(l, "ordinal", u), f = t.valueType, d = o ? [] : c(t.value, t.rawDataIndex), g = !s || !a, p = !s && a, m = em(i, n), y = m.nameStyle, _ = m.valueStyle;
    return n === "richText" ? (s ? "" : h) + (a ? "" : nm(e, v, y)) + (o ? "" : b2(e, d, g, p, _)) : Fu(i, (s ? "" : h) + (a ? "" : _2(v, !s, y)) + (o ? "" : w2(d, g, p, _)), r);
  }
}
function bv(e, t, r, i, n, a) {
  if (e) {
    var o = rm(e), s = {
      useUTC: n,
      renderMode: r,
      orderMode: i,
      markupStyleCreator: t,
      valueFormatter: e.valueFormatter
    };
    return o(s, e, 0, a);
  }
}
function y2(e) {
  return {
    html: d2[e],
    richText: p2[e]
  };
}
function Fu(e, t, r) {
  var i = '<div style="clear:both"></div>', n = "margin: " + r + "px 0 0", a = tm(e);
  return '<div style="' + n + ";" + a + ';">' + t + i + "</div>";
}
function _2(e, t, r) {
  var i = t ? "margin-left:2px" : "";
  return '<span style="' + r + ";" + i + '">' + Qt(e) + "</span>";
}
function w2(e, t, r, i) {
  var n = r ? "10px" : "20px", a = t ? "float:right;margin-left:" + n : "";
  return e = F(e) ? e : [e], '<span style="' + a + ";" + i + '">' + it(e, function(o) {
    return Qt(o);
  }).join("&nbsp;&nbsp;") + "</span>";
}
function nm(e, t, r) {
  return e.markupStyleCreator.wrapRichTextStyle(t, r);
}
function b2(e, t, r, i, n) {
  var a = [n], o = i ? 10 : 20;
  return r && a.push({
    padding: [0, 0, 0, o],
    align: "right"
  }), e.markupStyleCreator.wrapRichTextStyle(F(t) ? t.join("  ") : t, a);
}
function S2(e, t) {
  var r = e.getData().getItemVisual(t, "style"), i = r[e.visualDrawType];
  return na(i);
}
function am(e, t) {
  var r = e.get("padding");
  return r ?? (t === "richText" ? [8, 10] : 10);
}
var Ml = (
  /** @class */
  (function() {
    function e() {
      this.richTextStyles = {}, this._nextStyleNameId = _p();
    }
    return e.prototype._generateStyleName = function() {
      return "__EC_aUTo_" + this._nextStyleNameId++;
    }, e.prototype.makeTooltipMarker = function(t, r, i) {
      var n = i === "richText" ? this._generateStyleName() : null, a = eD({
        color: r,
        type: t,
        renderMode: i,
        markerId: n
      });
      return X(a) ? a : (this.richTextStyles[n] = a.style, a.content);
    }, e.prototype.wrapRichTextStyle = function(t, r) {
      var i = {};
      F(r) ? A(r, function(a) {
        return P(i, a);
      }) : P(i, r);
      var n = this._generateStyleName();
      return this.richTextStyles[n] = i, "{" + n + "|" + t + "}";
    }, e;
  })()
);
function x2(e) {
  var t = e.series, r = e.dataIndex, i = e.multipleSeries, n = t.getData(), a = n.mapDimensionsAll("defaultedTooltip"), o = a.length, s = t.getRawValue(r), l = F(s), u = S2(t, r), c, h, v, f;
  if (o > 1 || l && !o) {
    var d = T2(s, t, r, a, u);
    c = d.inlineValues, h = d.inlineValueTypes, v = d.blocks, f = d.inlineValues[0];
  } else if (o) {
    var g = n.getDimensionInfo(a[0]);
    f = c = Ho(n, r, a[0]), h = g.type;
  } else
    f = c = l ? s[0] : s;
  var p = Tp(t), m = p && t.name || "", y = n.getName(r), _ = i ? m : y;
  return oa("section", {
    header: m,
    // When series name is not specified, do not show a header line with only '-'.
    // This case always happens in tooltip.trigger: 'item'.
    noHeader: i || !p,
    sortParam: f,
    blocks: [oa("nameValue", {
      markerType: "item",
      markerColor: u,
      // Do not mix display seriesName and itemName in one tooltip,
      // which might confuses users.
      name: _,
      // name dimension might be auto assigned, where the name might
      // be not readable. So we check trim here.
      noName: !Be(_),
      value: c,
      valueType: h,
      rawDataIndex: n.getRawIndex(r)
    })].concat(v || [])
  });
}
function T2(e, t, r, i, n) {
  var a = t.getData(), o = kr(e, function(h, v, f) {
    var d = a.getDimensionInfo(f);
    return h = h || d && d.tooltip !== !1 && d.displayName != null;
  }, !1), s = [], l = [], u = [];
  i.length ? A(i, function(h) {
    c(Ho(a, r, h), h);
  }) : A(e, c);
  function c(h, v) {
    var f = a.getDimensionInfo(v);
    !f || f.otherDims.tooltip === !1 || (o ? u.push(oa("nameValue", {
      markerType: "subItem",
      markerColor: n,
      name: f.displayName,
      value: h,
      valueType: f.type
    })) : (s.push(h), l.push(f.type)));
  }
  return {
    inlineValues: s,
    inlineValueTypes: l,
    blocks: u
  };
}
var pr = st();
function Ga(e, t) {
  return e.getName(t) || e.getId(t);
}
var C2 = "__universalTransitionEnabled", Lr = (
  /** @class */
  (function(e) {
    Q(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r._selectedDataIndicesMap = {}, r;
    }
    return t.prototype.init = function(r, i, n) {
      this.seriesIndex = this.componentIndex, this.dataTask = Xn({
        count: M2,
        reset: D2
      }), this.dataTask.context = {
        model: this
      }, this.mergeDefaultAndTheme(r, n);
      var a = pr(this).sourceManager = new f2(this);
      a.prepareSource();
      var o = this.getInitialData(r, n);
      xv(o, this), this.dataTask.context.data = o, pr(this).dataBeforeProcessed = o, Sv(this), this._initSelectedMapFromData(o);
    }, t.prototype.mergeDefaultAndTheme = function(r, i) {
      var n = zo(this), a = n ? Og(r) : {}, o = this.subType;
      ct.hasClass(o) && (o += "Series"), At(r, i.getTheme().get(this.subType)), At(r, this.getDefaultOption()), mu(r, "label", ["show"]), this.fillDataTextStyle(r.data), n && Vo(r, a, n);
    }, t.prototype.mergeOption = function(r, i) {
      r = At(this.option, r, !0), this.fillDataTextStyle(r.data);
      var n = zo(this);
      n && Vo(this.option, r, n);
      var a = pr(this).sourceManager;
      a.dirty(), a.prepareSource();
      var o = this.getInitialData(r, i);
      xv(o, this), this.dataTask.dirty(), this.dataTask.context.data = o, pr(this).dataBeforeProcessed = o, Sv(this), this._initSelectedMapFromData(o);
    }, t.prototype.fillDataTextStyle = function(r) {
      if (r && !ee(r))
        for (var i = ["show"], n = 0; n < r.length; n++)
          r[n] && r[n].label && mu(r[n], "label", i);
    }, t.prototype.getInitialData = function(r, i) {
    }, t.prototype.appendData = function(r) {
      var i = this.getRawData();
      i.appendData(r.data);
    }, t.prototype.getData = function(r) {
      var i = Uu(this);
      if (i) {
        var n = i.context.data;
        return r == null || !n.getLinkedData ? n : n.getLinkedData(r);
      } else
        return pr(this).data;
    }, t.prototype.getAllData = function() {
      var r = this.getData();
      return r && r.getLinkedDataAll ? r.getLinkedDataAll() : [{
        data: r
      }];
    }, t.prototype.setData = function(r) {
      var i = Uu(this);
      if (i) {
        var n = i.context;
        n.outputData = r, i !== this.dataTask && (n.data = r);
      }
      pr(this).data = r;
    }, t.prototype.getEncode = function() {
      var r = this.get("encode", !0);
      if (r)
        return et(r);
    }, t.prototype.getSourceManager = function() {
      return pr(this).sourceManager;
    }, t.prototype.getSource = function() {
      return this.getSourceManager().getSource();
    }, t.prototype.getRawData = function() {
      return pr(this).dataBeforeProcessed;
    }, t.prototype.getColorBy = function() {
      var r = this.get("colorBy");
      return r || "series";
    }, t.prototype.isColorBySeries = function() {
      return this.getColorBy() === "series";
    }, t.prototype.getBaseAxis = function() {
      var r = this.coordinateSystem;
      return r && r.getBaseAxis && r.getBaseAxis();
    }, t.prototype.indicesOfNearest = function(r, i, n, a) {
      var o = this.getData(), s = this.coordinateSystem, l = s && s.getAxis(r);
      if (!s || !l)
        return [];
      var u = l.dataToCoord(n);
      a == null && (a = 1 / 0);
      for (var c = [], h = 1 / 0, v = -1, f = 0, d = o.getDimensionIndex(i), g = o.getStore(), p = 0, m = g.count(); p < m; p++) {
        var y = g.get(d, p), _ = l.dataToCoord(y), w = u - _, b = Math.abs(w);
        b <= a && ((b < h || b === h && w >= 0 && v < 0) && (h = b, v = w, f = 0), w === v && (c[f++] = p));
      }
      return c.length = f, c;
    }, t.prototype.formatTooltip = function(r, i, n) {
      return x2({
        series: this,
        dataIndex: r,
        multipleSeries: i
      });
    }, t.prototype.isAnimationEnabled = function() {
      var r = this.ecModel;
      if (K.node && !(r && r.ssr))
        return !1;
      var i = this.getShallow("animation");
      return i && this.getData().count() > this.getShallow("animationThreshold") && (i = !1), !!i;
    }, t.prototype.restoreData = function() {
      this.dataTask.dirty();
    }, t.prototype.getColorFromPalette = function(r, i, n) {
      var a = this.ecModel, o = Yc.prototype.getColorFromPalette.call(this, r, i, n);
      return o || (o = a.getColorFromPalette(r, i, n)), o;
    }, t.prototype.coordDimToDataDim = function(r) {
      return this.getRawData().mapDimensionsAll(r);
    }, t.prototype.getProgressive = function() {
      return this.get("progressive");
    }, t.prototype.getProgressiveThreshold = function() {
      return this.get("progressiveThreshold");
    }, t.prototype.select = function(r, i) {
      this._innerSelect(this.getData(i), r);
    }, t.prototype.unselect = function(r, i) {
      var n = this.option.selectedMap;
      if (n) {
        var a = this.option.selectedMode, o = this.getData(i);
        if (a === "series" || n === "all") {
          this.option.selectedMap = {}, this._selectedDataIndicesMap = {};
          return;
        }
        for (var s = 0; s < r.length; s++) {
          var l = r[s], u = Ga(o, l);
          n[u] = !1, this._selectedDataIndicesMap[u] = -1;
        }
      }
    }, t.prototype.toggleSelect = function(r, i) {
      for (var n = [], a = 0; a < r.length; a++)
        n[0] = r[a], this.isSelected(r[a], i) ? this.unselect(n, i) : this.select(n, i);
    }, t.prototype.getSelectedDataIndices = function() {
      if (this.option.selectedMap === "all")
        return [].slice.call(this.getData().getIndices());
      for (var r = this._selectedDataIndicesMap, i = yt(r), n = [], a = 0; a < i.length; a++) {
        var o = r[i[a]];
        o >= 0 && n.push(o);
      }
      return n;
    }, t.prototype.isSelected = function(r, i) {
      var n = this.option.selectedMap;
      if (!n)
        return !1;
      var a = this.getData(i);
      return (n === "all" || n[Ga(a, r)]) && !a.getItemModel(r).get(["select", "disabled"]);
    }, t.prototype.isUniversalTransitionEnabled = function() {
      if (this[C2])
        return !0;
      var r = this.option.universalTransition;
      return r ? r === !0 ? !0 : r && r.enabled : !1;
    }, t.prototype._innerSelect = function(r, i) {
      var n, a, o = this.option, s = o.selectedMode, l = i.length;
      if (!(!s || !l)) {
        if (s === "series")
          o.selectedMap = "all";
        else if (s === "multiple") {
          H(o.selectedMap) || (o.selectedMap = {});
          for (var u = o.selectedMap, c = 0; c < l; c++) {
            var h = i[c], v = Ga(r, h);
            u[v] = !0, this._selectedDataIndicesMap[v] = r.getRawIndex(h);
          }
        } else if (s === "single" || s === !0) {
          var f = i[l - 1], v = Ga(r, f);
          o.selectedMap = (n = {}, n[v] = !0, n), this._selectedDataIndicesMap = (a = {}, a[v] = r.getRawIndex(f), a);
        }
      }
    }, t.prototype._initSelectedMapFromData = function(r) {
      if (!this.option.selectedMap) {
        var i = [];
        r.hasItemOption && r.each(function(n) {
          var a = r.getRawDataItem(n);
          a && a.selected && i.push(n);
        }), i.length > 0 && this._innerSelect(r, i);
      }
    }, t.registerClass = function(r) {
      return ct.registerClass(r);
    }, t.protoInitialize = (function() {
      var r = t.prototype;
      r.type = "series.__base__", r.seriesIndex = 0, r.ignoreStyleOnData = !1, r.hasSymbolVisual = !1, r.defaultSymbol = "circle", r.visualStyleAccessPath = "itemStyle", r.visualDrawType = "fill";
    })(), t;
  })(ct)
);
lr(Lr, QD);
lr(Lr, Yc);
Dp(Lr, ct);
function Sv(e) {
  var t = e.name;
  Tp(e) || (e.name = A2(e) || t);
}
function A2(e) {
  var t = e.getRawData(), r = t.mapDimensionsAll("seriesName"), i = [];
  return A(r, function(n) {
    var a = t.getDimensionInfo(n);
    a.displayName && i.push(a.displayName);
  }), i.join(" ");
}
function M2(e) {
  return e.model.getRawData().count();
}
function D2(e) {
  var t = e.model;
  return t.setData(t.getRawData().cloneShallow()), k2;
}
function k2(e, t) {
  t.outputData && e.end > t.outputData.count() && t.model.getRawData().cloneShallow(t.outputData);
}
function xv(e, t) {
  A(XS(e.CHANGABLE_METHODS, e.DOWNSAMPLE_METHODS), function(r) {
    e.wrapMethod(r, ae(L2, t));
  });
}
function L2(e, t) {
  var r = Uu(e);
  return r && r.setOutputEnd((t || this).count()), t;
}
function Uu(e) {
  var t = (e.ecModel || {}).scheduler, r = t && t.getPipeline(e.uid);
  if (r) {
    var i = r.currentTask;
    if (i) {
      var n = i.agentStubMap;
      n && (i = n.get(e.uid));
    }
    return i;
  }
}
var Ir = (
  /** @class */
  (function() {
    function e() {
      this.group = new qe(), this.uid = _s("viewComponent");
    }
    return e.prototype.init = function(t, r) {
    }, e.prototype.render = function(t, r, i, n) {
    }, e.prototype.dispose = function(t, r) {
    }, e.prototype.updateView = function(t, r, i, n) {
    }, e.prototype.updateLayout = function(t, r, i, n) {
    }, e.prototype.updateVisual = function(t, r, i, n) {
    }, e.prototype.toggleBlurSeries = function(t, r, i) {
    }, e.prototype.eachRendered = function(t) {
      var r = this.group;
      r && r.traverse(t);
    }, e;
  })()
);
Sc(Ir);
xc(Ir);
function I2() {
  var e = st();
  return function(t) {
    var r = e(t), i = t.pipelineContext, n = !!r.large, a = !!r.progressiveRender, o = r.large = !!(i && i.large), s = r.progressiveRender = !!(i && i.progressiveRender);
    return (n !== o || a !== s) && "reset";
  };
}
var om = st(), E2 = I2(), Ar = (
  /** @class */
  (function() {
    function e() {
      this.group = new qe(), this.uid = _s("viewChart"), this.renderTask = Xn({
        plan: P2,
        reset: R2
      }), this.renderTask.context = {
        view: this
      };
    }
    return e.prototype.init = function(t, r) {
    }, e.prototype.render = function(t, r, i, n) {
    }, e.prototype.highlight = function(t, r, i, n) {
      var a = t.getData(n && n.dataType);
      a && Cv(a, n, "emphasis");
    }, e.prototype.downplay = function(t, r, i, n) {
      var a = t.getData(n && n.dataType);
      a && Cv(a, n, "normal");
    }, e.prototype.remove = function(t, r) {
      this.group.removeAll();
    }, e.prototype.dispose = function(t, r) {
    }, e.prototype.updateView = function(t, r, i, n) {
      this.render(t, r, i, n);
    }, e.prototype.updateVisual = function(t, r, i, n) {
      this.render(t, r, i, n);
    }, e.prototype.eachRendered = function(t) {
      wg(this.group, t);
    }, e.markUpdateMethod = function(t, r) {
      om(t).updateMethod = r;
    }, e.protoInitialize = (function() {
      var t = e.prototype;
      t.type = "chart";
    })(), e;
  })()
);
function Tv(e, t, r) {
  e && Mu(e) && (t === "emphasis" ? xu : Tu)(e, r);
}
function Cv(e, t, r) {
  var i = pa(e, t), n = t && t.highlightKey != null ? _A(t.highlightKey) : null;
  i != null ? A(Xt(i), function(a) {
    Tv(e.getItemGraphicEl(a), r, n);
  }) : e.eachItemGraphicEl(function(a) {
    Tv(a, r, n);
  });
}
Sc(Ar);
xc(Ar);
function P2(e) {
  return E2(e.model);
}
function R2(e) {
  var t = e.model, r = e.ecModel, i = e.api, n = e.payload, a = t.pipelineContext.progressiveRender, o = e.view, s = n && om(n).updateMethod, l = a ? "incrementalPrepareRender" : s && o[s] ? s : "render";
  return l !== "render" && o[l](t, r, i, n), O2[l];
}
var O2 = {
  incrementalPrepareRender: {
    progress: function(e, t) {
      t.view.incrementalRender(e, t.model, t.ecModel, t.api, t.payload);
    }
  },
  render: {
    // Put view.render in `progress` to support appendData. But in this case
    // view.render should not be called in reset, otherwise it will be called
    // twise. Use `forceFirstProgress` to make sure that view.render is called
    // in any cases.
    forceFirstProgress: !0,
    progress: function(e, t) {
      t.view.render(t.model, t.ecModel, t.api, t.payload);
    }
  }
}, Wo = "\0__throttleOriginMethod", Av = "\0__throttleRate", Mv = "\0__throttleType";
function sm(e, t, r) {
  var i, n = 0, a = 0, o = null, s, l, u, c;
  t = t || 0;
  function h() {
    a = (/* @__PURE__ */ new Date()).getTime(), o = null, e.apply(l, u || []);
  }
  var v = function() {
    for (var f = [], d = 0; d < arguments.length; d++)
      f[d] = arguments[d];
    i = (/* @__PURE__ */ new Date()).getTime(), l = this, u = f;
    var g = c || t, p = c || r;
    c = null, s = i - (p ? n : a) - g, clearTimeout(o), p ? o = setTimeout(h, g) : s >= 0 ? h() : o = setTimeout(h, -s), n = i;
  };
  return v.clear = function() {
    o && (clearTimeout(o), o = null);
  }, v.debounceNextCall = function(f) {
    c = f;
  }, v;
}
function lm(e, t, r, i) {
  var n = e[t];
  if (n) {
    var a = n[Wo] || n, o = n[Mv], s = n[Av];
    if (s !== r || o !== i) {
      if (r == null || !i)
        return e[t] = a;
      n = e[t] = sm(a, r, i === "debounce"), n[Wo] = a, n[Mv] = i, n[Av] = r;
    }
    return n;
  }
}
function zu(e, t) {
  var r = e[t];
  r && r[Wo] && (r.clear && r.clear(), e[t] = r[Wo]);
}
var Dv = st(), kv = {
  itemStyle: ta(Cg, !0),
  lineStyle: ta(Tg, !0)
}, B2 = {
  lineStyle: "stroke",
  itemStyle: "fill"
};
function um(e, t) {
  var r = e.visualStyleMapper || kv[t];
  return r || (console.warn("Unknown style type '" + t + "'."), kv.itemStyle);
}
function cm(e, t) {
  var r = e.visualDrawType || B2[t];
  return r || (console.warn("Unknown style type '" + t + "'."), "fill");
}
var N2 = {
  createOnAllSeries: !0,
  performRawSeries: !0,
  reset: function(e, t) {
    var r = e.getData(), i = e.visualStyleAccessPath || "itemStyle", n = e.getModel(i), a = um(e, i), o = a(n), s = n.getShallow("decal");
    s && (r.setVisual("decal", s), s.dirty = !0);
    var l = cm(e, i), u = o[l], c = at(u) ? u : null, h = o.fill === "auto" || o.stroke === "auto";
    if (!o[l] || c || h) {
      var v = e.getColorFromPalette(
        // TODO series count changed.
        e.name,
        null,
        t.getSeriesCount()
      );
      o[l] || (o[l] = v, r.setVisual("colorFromPalette", !0)), o.fill = o.fill === "auto" || at(o.fill) ? v : o.fill, o.stroke = o.stroke === "auto" || at(o.stroke) ? v : o.stroke;
    }
    if (r.setVisual("style", o), r.setVisual("drawType", l), !t.isSeriesFiltered(e) && c)
      return r.setVisual("colorFromPalette", !1), {
        dataEach: function(f, d) {
          var g = e.getDataParams(d), p = P({}, o);
          p[l] = c(g), f.setItemVisual(d, "style", p);
        }
      };
  }
}, wn = new mt(), F2 = {
  createOnAllSeries: !0,
  reset: function(e, t) {
    if (!e.ignoreStyleOnData) {
      var r = e.getData(), i = e.visualStyleAccessPath || "itemStyle", n = um(e, i), a = r.getVisual("drawType");
      return {
        dataEach: r.hasItemOption ? function(o, s) {
          var l = o.getRawDataItem(s);
          if (l && l[i]) {
            wn.option = l[i];
            var u = n(wn), c = o.ensureUniqueItemVisual(s, "style");
            P(c, u), wn.option.decal && (o.setItemVisual(s, "decal", wn.option.decal), wn.option.decal.dirty = !0), a in u && o.setItemVisual(s, "colorFromPalette", !1);
          }
        } : null
      };
    }
  }
}, U2 = {
  performRawSeries: !0,
  overallReset: function(e) {
    var t = et();
    e.eachSeries(function(r) {
      if (!r.isColorBySeries()) {
        var i = r.type + "-" + r.getColorBy();
        Dv(r).scope = t.get(i) || t.set(i, {});
      }
    }), e.eachSeries(function(r) {
      if (!r.isColorBySeries()) {
        var i = r.getRawData(), n = {}, a = r.getData(), o = Dv(r).scope, s = r.visualStyleAccessPath || "itemStyle", l = cm(r, s);
        a.each(function(u) {
          var c = a.getRawIndex(u);
          n[c] = u;
        }), i.each(function(u) {
          var c = n[u], h = a.getItemVisual(c, "colorFromPalette");
          if (h) {
            var v = a.ensureUniqueItemVisual(c, "style"), f = i.getName(u) || u + "", d = i.count();
            v[l] = r.getColorFromPalette(f, o, d);
          }
        });
      }
    });
  }
}, Ya = Math.PI;
function z2(e, t) {
  t = t || {}, wt(t, {
    text: "loading",
    textColor: vt.color.primary,
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    fontFamily: "sans-serif",
    maskColor: "rgba(255,255,255,0.8)",
    showSpinner: !0,
    color: vt.color.theme[0],
    spinnerRadius: 10,
    lineWidth: 5,
    zlevel: 0
  });
  var r = new qe(), i = new oe({
    style: {
      fill: t.maskColor
    },
    zlevel: t.zlevel,
    z: 1e4
  });
  r.add(i);
  var n = new xe({
    style: {
      text: t.text,
      fill: t.textColor,
      fontSize: t.fontSize,
      fontWeight: t.fontWeight,
      fontStyle: t.fontStyle,
      fontFamily: t.fontFamily
    },
    zlevel: t.zlevel,
    z: 10001
  }), a = new oe({
    style: {
      fill: "none"
    },
    textContent: n,
    textConfig: {
      position: "right",
      distance: 10
    },
    zlevel: t.zlevel,
    z: 10001
  });
  r.add(a);
  var o;
  return t.showSpinner && (o = new ms({
    shape: {
      startAngle: -Ya / 2,
      endAngle: -Ya / 2 + 0.1,
      r: t.spinnerRadius
    },
    style: {
      stroke: t.color,
      lineCap: "round",
      lineWidth: t.lineWidth
    },
    zlevel: t.zlevel,
    z: 10001
  }), o.animateShape(!0).when(1e3, {
    endAngle: Ya * 3 / 2
  }).start("circularInOut"), o.animateShape(!0).when(1e3, {
    startAngle: Ya * 3 / 2
  }).delay(300).start("circularInOut"), r.add(o)), r.resize = function() {
    var s = n.getBoundingRect().width, l = t.showSpinner ? t.spinnerRadius : 0, u = (e.getWidth() - l * 2 - (t.showSpinner && s ? 10 : 0) - s) / 2 - (t.showSpinner && s ? 0 : 5 + s / 2) + (t.showSpinner ? 0 : s / 2) + (s ? 0 : l), c = e.getHeight() / 2;
    t.showSpinner && o.setShape({
      cx: u,
      cy: c
    }), a.setShape({
      x: u - l,
      y: c - l,
      width: l * 2,
      height: l * 2
    }), i.setShape({
      x: 0,
      y: 0,
      width: e.getWidth(),
      height: e.getHeight()
    });
  }, r.resize(), r;
}
var hm = (
  /** @class */
  (function() {
    function e(t, r, i, n) {
      this._stageTaskMap = et(), this.ecInstance = t, this.api = r, i = this._dataProcessorHandlers = i.slice(), n = this._visualHandlers = n.slice(), this._allHandlers = i.concat(n);
    }
    return e.prototype.restoreData = function(t, r) {
      t.restoreData(r), this._stageTaskMap.each(function(i) {
        var n = i.overallTask;
        n && n.dirty();
      });
    }, e.prototype.getPerformArgs = function(t, r) {
      if (t.__pipeline) {
        var i = this._pipelineMap.get(t.__pipeline.id), n = i.context, a = !r && i.progressiveEnabled && (!n || n.progressiveRender) && t.__idxInPipeline > i.blockIndex, o = a ? i.step : null, s = n && n.modDataCount, l = s != null ? Math.ceil(s / o) : null;
        return {
          step: o,
          modBy: l,
          modDataCount: s
        };
      }
    }, e.prototype.getPipeline = function(t) {
      return this._pipelineMap.get(t);
    }, e.prototype.updateStreamModes = function(t, r) {
      var i = this._pipelineMap.get(t.uid), n = t.__preparePipelineContext ? t.__preparePipelineContext(r, i) : QT(t, r, i);
      t.pipelineContext = i.context = n;
    }, e.prototype.restorePipelines = function(t, r) {
      var i = this, n = i._pipelineMap = et();
      r.eachSeries(function(a) {
        var o = t.painter.type === "canvas" && a.getProgressive(), s = a.uid;
        n.set(s, {
          id: s,
          head: null,
          tail: null,
          threshold: a.getProgressiveThreshold(),
          progressiveEnabled: o && !(a.preventIncremental && a.preventIncremental()),
          blockIndex: -1,
          step: Math.round(o || 700),
          count: 0
        }), i._pipe(a, a.dataTask);
      });
    }, e.prototype.prepareStageTasks = function() {
      var t = this._stageTaskMap, r = this.api.getModel(), i = this.api;
      A(this._allHandlers, function(n) {
        var a = t.get(n.uid) || t.set(n.uid, {}), o = "";
        nr(!(n.reset && n.overallReset), o), n.reset && this._createSeriesStageTask(n, a, r, i), n.overallReset && this._createOverallStageTask(n, a, r, i);
      }, this);
    }, e.prototype.prepareView = function(t, r, i, n) {
      var a = t.renderTask, o = a.context;
      o.model = r, o.ecModel = i, o.api = n, a.__block = !t.incrementalPrepareRender, this._pipe(r, a);
    }, e.prototype.performDataProcessorTasks = function(t, r) {
      this._performStageTasks(this._dataProcessorHandlers, t, r, {
        block: !0
      });
    }, e.prototype.performVisualTasks = function(t, r, i) {
      this._performStageTasks(this._visualHandlers, t, r, i);
    }, e.prototype._performStageTasks = function(t, r, i, n) {
      n = n || {};
      var a = !1, o = this;
      A(t, function(l, u) {
        if (!(n.visualType && n.visualType !== l.visualType)) {
          var c = o._stageTaskMap.get(l.uid), h = c.seriesTaskMap, v = c.overallTask;
          if (v) {
            var f, d = v.agentStubMap;
            d.each(function(p) {
              s(n, p) && (p.dirty(), f = !0);
            }), f && v.dirty(), o.updatePayload(v, i);
            var g = o.getPerformArgs(v, n.block);
            d.each(function(p) {
              p.perform(g);
            }), v.perform(g) && (a = !0);
          } else h && h.each(function(p, m) {
            s(n, p) && p.dirty();
            var y = o.getPerformArgs(p, n.block);
            y.skip = !l.performRawSeries && r.isSeriesFiltered(p.context.model), o.updatePayload(p, i), p.perform(y) && (a = !0);
          });
        }
      });
      function s(l, u) {
        return l.setDirty && (!l.dirtyMap || l.dirtyMap.get(u.__pipeline.id));
      }
      this.unfinished = a || this.unfinished;
    }, e.prototype.performSeriesTasks = function(t) {
      var r;
      t.eachSeries(function(i) {
        r = i.dataTask.perform() || r;
      }), this.unfinished = r || this.unfinished;
    }, e.prototype.plan = function() {
      this._pipelineMap.each(function(t) {
        var r = t.tail;
        do {
          if (r.__block) {
            t.blockIndex = r.__idxInPipeline;
            break;
          }
          r = r.getUpstream();
        } while (r);
      });
    }, e.prototype.updatePayload = function(t, r) {
      r !== "remain" && (t.context.payload = r);
    }, e.prototype._createSeriesStageTask = function(t, r, i, n) {
      var a = this, o = r.seriesTaskMap, s = r.seriesTaskMap = et(), l = t.seriesType, u = t.getTargetSeries;
      t.createOnAllSeries ? i.eachRawSeries(c) : l ? i.eachRawSeriesByType(l, c) : u && u(i, n).each(c);
      function c(h) {
        var v = h.uid, f = s.set(v, o && o.get(v) || Xn({
          plan: Y2,
          reset: X2,
          count: Z2
        }));
        f.context = {
          model: h,
          ecModel: i,
          api: n,
          // PENDING: `useClearVisual` not used?
          useClearVisual: t.isVisual && !t.isLayout,
          plan: t.plan,
          reset: t.reset,
          scheduler: a
        }, a._pipe(h, f);
      }
    }, e.prototype._createOverallStageTask = function(t, r, i, n) {
      var a = this, o = r.overallTask = r.overallTask || Xn({
        reset: V2
      });
      o.context = {
        ecModel: i,
        api: n,
        overallReset: t.overallReset,
        scheduler: a
      };
      var s = o.agentStubMap, l = o.agentStubMap = et(), u = t.seriesType, c = t.getTargetSeries, h = t.dirtyOnOverallProgress, v = !1, f = "";
      nr(!t.createOnAllSeries, f), u ? i.eachRawSeriesByType(u, d) : c ? c(i, n).each(d) : A(i.getSeries(), d);
      function d(g) {
        var p = g.uid, m = l.set(p, s && s.get(p) || // When the result of `getTargetSeries` changed, the overallTask
        // should be set as dirty and re-performed.
        (v = !0, Xn({
          reset: H2,
          onDirty: G2
        })));
        m.context = {
          model: g,
          dirtyOnOverallProgress: h
          // FIXME:TS never used, so comment it
          // modifyOutputEnd: modifyOutputEnd
        }, m.agent = o, m.__block = h, a._pipe(g, m);
      }
      v && o.dirty();
    }, e.prototype._pipe = function(t, r) {
      var i = t.uid, n = this._pipelineMap.get(i);
      !n.head && (n.head = r), n.tail && n.tail.pipe(r), n.tail = r, r.__idxInPipeline = n.count++, r.__pipeline = n;
    }, e.wrapStageHandler = function(t, r) {
      return at(t) && (t = {
        overallReset: t,
        seriesType: Q2(t)
      }), t.uid = _s("stageHandler"), r && (t.visualType = r), t;
    }, e;
  })()
);
function V2(e) {
  e.overallReset(e.ecModel, e.api, e.payload);
}
function H2(e) {
  return e.dirtyOnOverallProgress && W2;
}
function W2() {
  this.agent.dirty(), this.getDownstream().dirty();
}
function G2() {
  this.agent && this.agent.dirty();
}
function Y2(e) {
  return e.plan ? e.plan(e.model, e.ecModel, e.api, e.payload) : null;
}
function X2(e) {
  e.useClearVisual && e.data.clearAllVisual();
  var t = e.resetDefines = Xt(e.reset(e.model, e.ecModel, e.api, e.payload));
  return t.length > 1 ? it(t, function(r, i) {
    return fm(i);
  }) : q2;
}
var q2 = fm(0);
function fm(e) {
  return function(t, r) {
    var i = r.data, n = r.resetDefines[e];
    if (n && n.dataEach)
      for (var a = t.start; a < t.end; a++)
        n.dataEach(i, a);
    else n && n.progress && n.progress(t, i);
  };
}
function Z2(e) {
  return e.data.count();
}
function Q2(e) {
  Go = null;
  try {
    e(sa, vm);
  } catch {
  }
  return Go;
}
var sa = {}, vm = {}, Go;
dm(sa, Xc);
dm(vm, Hp);
sa.eachSeriesByType = sa.eachRawSeriesByType = function(e) {
  Go = e;
};
sa.eachComponent = function(e) {
  e.mainType === "series" && e.subType && (Go = e.subType);
};
function dm(e, t) {
  for (var r in t.prototype)
    e[r] = $t;
}
var R = vt.darkColor, Lv = R.background, bn = function() {
  return {
    axisLine: {
      lineStyle: {
        color: R.axisLine
      }
    },
    splitLine: {
      lineStyle: {
        color: R.axisSplitLine
      }
    },
    splitArea: {
      areaStyle: {
        color: [R.backgroundTint, R.backgroundTransparent]
      }
    },
    minorSplitLine: {
      lineStyle: {
        color: R.axisMinorSplitLine
      }
    },
    axisLabel: {
      color: R.axisLabel
    },
    axisName: {}
  };
}, Iv = {
  label: {
    color: R.secondary
  },
  itemStyle: {
    borderColor: R.borderTint
  },
  dividerLineStyle: {
    color: R.border
  }
}, pm = {
  darkMode: !0,
  color: R.theme,
  backgroundColor: Lv,
  axisPointer: {
    lineStyle: {
      color: R.border
    },
    crossStyle: {
      color: R.borderShade
    },
    label: {
      color: R.tertiary
    }
  },
  legend: {
    textStyle: {
      color: R.secondary
    },
    pageTextStyle: {
      color: R.tertiary
    }
  },
  textStyle: {
    color: R.secondary
  },
  title: {
    textStyle: {
      color: R.primary
    },
    subtextStyle: {
      color: R.quaternary
    }
  },
  toolbox: {
    iconStyle: {
      borderColor: R.accent50
    },
    feature: {
      dataView: {
        backgroundColor: Lv,
        textColor: R.primary,
        textareaColor: R.background,
        textareaBorderColor: R.border,
        buttonColor: R.accent50,
        buttonTextColor: R.neutral00
      }
    }
  },
  tooltip: {
    backgroundColor: R.neutral20,
    defaultBorderColor: R.border,
    textStyle: {
      color: R.tertiary
    }
  },
  dataZoom: {
    borderColor: R.accent10,
    textStyle: {
      color: R.tertiary
    },
    brushStyle: {
      color: R.backgroundTint
    },
    handleStyle: {
      color: R.neutral00,
      borderColor: R.accent20
    },
    moveHandleStyle: {
      color: R.accent40
    },
    emphasis: {
      handleStyle: {
        borderColor: R.accent50
      }
    },
    dataBackground: {
      lineStyle: {
        color: R.accent30
      },
      areaStyle: {
        color: R.accent20
      }
    },
    selectedDataBackground: {
      lineStyle: {
        color: R.accent50
      },
      areaStyle: {
        color: R.accent30
      }
    }
  },
  visualMap: {
    textStyle: {
      color: R.secondary
    },
    handleStyle: {
      borderColor: R.neutral30
    }
  },
  timeline: {
    lineStyle: {
      color: R.accent10
    },
    label: {
      color: R.tertiary
    },
    controlStyle: {
      color: R.accent30,
      borderColor: R.accent30
    }
  },
  calendar: {
    itemStyle: {
      color: R.neutral00,
      borderColor: R.neutral20
    },
    dayLabel: {
      color: R.tertiary
    },
    monthLabel: {
      color: R.secondary
    },
    yearLabel: {
      color: R.secondary
    }
  },
  matrix: {
    x: Iv,
    y: Iv,
    backgroundColor: {
      borderColor: R.axisLine
    },
    body: {
      itemStyle: {
        borderColor: R.borderTint
      }
    }
  },
  timeAxis: bn(),
  logAxis: bn(),
  valueAxis: bn(),
  categoryAxis: bn(),
  line: {
    symbol: "circle"
  },
  graph: {
    color: R.theme
  },
  gauge: {
    title: {
      color: R.secondary
    },
    axisLine: {
      lineStyle: {
        color: [[1, R.neutral05]]
      }
    },
    axisLabel: {
      color: R.axisLabel
    },
    detail: {
      color: R.primary
    }
  },
  candlestick: {
    itemStyle: {
      color: "#f64e56",
      color0: "#54ea92",
      borderColor: "#f64e56",
      borderColor0: "#54ea92"
      // borderColor: '#ca2824',
      // borderColor0: '#09a443'
    }
  },
  funnel: {
    itemStyle: {
      borderColor: R.background
    }
  },
  radar: (function() {
    var e = bn();
    return e.axisName = {
      color: R.axisLabel
    }, e.axisLine.lineStyle.color = R.neutral20, e;
  })(),
  treemap: {
    breadcrumb: {
      itemStyle: {
        color: R.neutral20,
        textStyle: {
          color: R.secondary
        }
      },
      emphasis: {
        itemStyle: {
          color: R.neutral30
        }
      }
    }
  },
  sunburst: {
    itemStyle: {
      borderColor: R.background
    }
  },
  map: {
    itemStyle: {
      borderColor: R.border,
      areaColor: R.neutral10
    },
    label: {
      color: R.tertiary
    },
    emphasis: {
      label: {
        color: R.primary
      },
      itemStyle: {
        areaColor: R.highlight
      }
    },
    select: {
      label: {
        color: R.primary
      },
      itemStyle: {
        areaColor: R.highlight
      }
    }
  },
  geo: {
    itemStyle: {
      borderColor: R.border,
      areaColor: R.neutral10
    },
    emphasis: {
      label: {
        color: R.primary
      },
      itemStyle: {
        areaColor: R.highlight
      }
    },
    select: {
      label: {
        color: R.primary
      },
      itemStyle: {
        color: R.highlight
      }
    }
  }
};
pm.categoryAxis.splitLine.show = !1;
var K2 = (
  /** @class */
  (function() {
    function e() {
    }
    return e.prototype.normalizeQuery = function(t) {
      var r = {}, i = {}, n = {};
      if (X(t)) {
        var a = Fe(t);
        r.mainType = a.main || null, r.subType = a.sub || null;
      } else {
        var o = ["Index", "Name", "Id"], s = {
          name: 1,
          dataIndex: 1,
          dataType: 1
        };
        A(t, function(l, u) {
          for (var c = !1, h = 0; h < o.length; h++) {
            var v = o[h], f = u.lastIndexOf(v);
            if (f > 0 && f === u.length - v.length) {
              var d = u.slice(0, f);
              d !== "data" && (r.mainType = d, r[v.toLowerCase()] = l, c = !0);
            }
          }
          s.hasOwnProperty(u) && (i[u] = l, c = !0), c || (n[u] = l);
        });
      }
      return {
        cptQuery: r,
        dataQuery: i,
        otherQuery: n
      };
    }, e.prototype.filter = function(t, r) {
      var i = this.eventInfo;
      if (!i)
        return !0;
      var n = i.targetEl, a = i.packedEvent, o = i.model, s = i.view;
      if (!o || !s)
        return !0;
      var l = r.cptQuery, u = r.dataQuery;
      return c(l, o, "mainType") && c(l, o, "subType") && c(l, o, "index", "componentIndex") && c(l, o, "name") && c(l, o, "id") && c(u, a, "name") && c(u, a, "dataIndex") && c(u, a, "dataType") && (!s.filterForExposedEvent || s.filterForExposedEvent(t, r.otherQuery, n, a));
      function c(h, v, f, d) {
        return h[f] == null || v[d || f] === h[f];
      }
    }, e.prototype.afterTrigger = function() {
      this.eventInfo = null;
    }, e;
  })()
), Vu = ["symbol", "symbolSize", "symbolRotate", "symbolOffset"], Ev = Vu.concat(["symbolKeepAspect"]), J2 = {
  createOnAllSeries: !0,
  // For legend.
  performRawSeries: !0,
  reset: function(e, t) {
    var r = e.getData();
    if (e.legendIcon && r.setVisual("legendIcon", e.legendIcon), !e.hasSymbolVisual)
      return;
    for (var i = {}, n = {}, a = !1, o = 0; o < Vu.length; o++) {
      var s = Vu[o], l = e.get(s);
      at(l) ? (a = !0, n[s] = l) : i[s] = l;
    }
    if (i.symbol = i.symbol || e.defaultSymbol, r.setVisual(P({
      legendIcon: e.legendIcon || i.symbol,
      symbolKeepAspect: e.get("symbolKeepAspect")
    }, i)), t.isSeriesFiltered(e))
      return;
    var u = yt(n);
    function c(h, v) {
      for (var f = e.getRawValue(v), d = e.getDataParams(v), g = 0; g < u.length; g++) {
        var p = u[g];
        h.setItemVisual(v, p, n[p](f, d));
      }
    }
    return {
      dataEach: a ? c : null
    };
  }
}, j2 = {
  createOnAllSeries: !0,
  // For legend.
  performRawSeries: !0,
  reset: function(e, t) {
    if (!e.hasSymbolVisual || t.isSeriesFiltered(e))
      return;
    var r = e.getData();
    function i(n, a) {
      for (var o = n.getItemModel(a), s = 0; s < Ev.length; s++) {
        var l = Ev[s], u = o.getShallow(l, !0);
        u != null && n.setItemVisual(a, l, u);
      }
    }
    return {
      dataEach: r.hasItemOption ? i : null
    };
  }
};
function $2(e, t, r) {
  switch (r) {
    case "color":
      var i = e.getItemVisual(t, "style");
      return i[e.getVisual("drawType")];
    case "opacity":
      return e.getItemVisual(t, "style").opacity;
    case "symbol":
    case "symbolSize":
    case "liftZ":
      return e.getItemVisual(t, r);
  }
}
function tk(e, t) {
  switch (t) {
    case "color":
      var r = e.getVisual("style");
      return r[e.getVisual("drawType")];
    case "opacity":
      return e.getVisual("style").opacity;
    case "symbol":
    case "symbolSize":
    case "liftZ":
      return e.getVisual(t);
  }
}
function ek(e, t) {
  function r(i, n) {
    var a = [];
    return i.eachComponent({
      mainType: "series",
      subType: e,
      query: n
    }, function(o) {
      a.push(o.seriesIndex);
    }), a;
  }
  A([[e + "ToggleSelect", "toggleSelect"], [e + "Select", "select"], [e + "UnSelect", "unselect"]], function(i) {
    t(i[0], function(n, a, o) {
      n = P({}, n), o.dispatchAction(P(n, {
        type: i[1],
        seriesIndex: r(a, n)
      }));
    });
  });
}
function Ri(e, t, r, i, n) {
  var a = e + t;
  r.isSilent(a) || i.eachComponent({
    mainType: "series",
    subType: "pie"
  }, function(o) {
    for (var s = o.seriesIndex, l = o.option.selectedMap, u = n.selected, c = 0; c < u.length; c++)
      if (u[c].seriesIndex === s) {
        var h = o.getData(), v = pa(h, n.fromActionPayload);
        r.trigger(a, {
          type: a,
          seriesId: o.id,
          name: F(v) ? h.getName(v[0]) : h.getName(v),
          selected: X(l) ? l : P({}, l)
        });
      }
  });
}
function rk(e, t, r) {
  e.on("selectchanged", function(i) {
    var n = r.getModel();
    i.isFromClick ? (Ri("map", "selectchanged", t, n, i), Ri("pie", "selectchanged", t, n, i)) : i.fromAction === "select" ? (Ri("map", "selected", t, n, i), Ri("pie", "selected", t, n, i)) : i.fromAction === "unselect" && (Ri("map", "unselected", t, n, i), Ri("pie", "unselected", t, n, i));
  });
}
function Bn(e, t, r) {
  for (var i; e && !(t(e) && (i = e, r)); )
    e = e.__hostTarget || e.parent;
  return i;
}
var ce = new Ke(), gm = {};
function ik(e, t) {
  gm[e] = t;
}
function nk(e) {
  return gm[e];
}
var Kc = st();
function ak(e) {
  Kc(e).prepare = {};
}
function ok(e) {
  Kc(e).fullUpdate = {};
}
function mm(e) {
  return Kc(e).fullUpdate;
}
var sk = Math.round(Math.random() * 9), lk = typeof Object.defineProperty == "function", uk = (function() {
  function e() {
    this._id = "__ec_inner_" + sk++;
  }
  return e.prototype.get = function(t) {
    return this._guard(t)[this._id];
  }, e.prototype.set = function(t, r) {
    var i = this._guard(t);
    return lk ? Object.defineProperty(i, this._id, {
      value: r,
      enumerable: !1,
      configurable: !0
    }) : i[this._id] = r, this;
  }, e.prototype.delete = function(t) {
    return this.has(t) ? (delete this._guard(t)[this._id], !0) : !1;
  }, e.prototype.has = function(t) {
    return !!this._guard(t)[this._id];
  }, e.prototype._guard = function(t) {
    if (t !== Object(t))
      throw TypeError("Value of WeakMap is not a non-null object.");
    return t;
  }, e;
})(), ck = ht.extend({
  type: "triangle",
  shape: {
    cx: 0,
    cy: 0,
    width: 0,
    height: 0
  },
  buildPath: function(e, t) {
    var r = t.cx, i = t.cy, n = t.width / 2, a = t.height / 2;
    e.moveTo(r, i - a), e.lineTo(r + n, i + a), e.lineTo(r - n, i + a), e.closePath();
  }
}), hk = ht.extend({
  type: "diamond",
  shape: {
    cx: 0,
    cy: 0,
    width: 0,
    height: 0
  },
  buildPath: function(e, t) {
    var r = t.cx, i = t.cy, n = t.width / 2, a = t.height / 2;
    e.moveTo(r, i - a), e.lineTo(r + n, i), e.lineTo(r, i + a), e.lineTo(r - n, i), e.closePath();
  }
}), fk = ht.extend({
  type: "pin",
  shape: {
    // x, y on the cusp
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  buildPath: function(e, t) {
    var r = t.x, i = t.y, n = t.width / 5 * 3, a = Math.max(n, t.height), o = n / 2, s = o * o / (a - o), l = i - a + o + s, u = Math.asin(s / o), c = Math.cos(u) * o, h = Math.sin(u), v = Math.cos(u), f = o * 0.6, d = o * 0.7;
    e.moveTo(r - c, l + s), e.arc(r, l, o, Math.PI - u, Math.PI * 2 + u), e.bezierCurveTo(r + c - h * f, l + s + v * f, r, i - d, r, i), e.bezierCurveTo(r, i - d, r - c + h * f, l + s + v * f, r - c, l + s), e.closePath();
  }
}), vk = ht.extend({
  type: "arrow",
  shape: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  buildPath: function(e, t) {
    var r = t.height, i = t.width, n = t.x, a = t.y, o = i / 3 * 2;
    e.moveTo(n, a), e.lineTo(n + o, a + r), e.lineTo(n, a + r / 4 * 3), e.lineTo(n - o, a + r), e.lineTo(n, a), e.closePath();
  }
}), dk = {
  line: un,
  rect: oe,
  roundRect: oe,
  square: oe,
  circle: gs,
  diamond: hk,
  pin: fk,
  arrow: vk,
  triangle: ck
}, pk = {
  line: function(e, t, r, i, n) {
    n.x1 = e, n.y1 = t + i / 2, n.x2 = e + r, n.y2 = t + i / 2;
  },
  rect: function(e, t, r, i, n) {
    n.x = e, n.y = t, n.width = r, n.height = i;
  },
  roundRect: function(e, t, r, i, n) {
    n.x = e, n.y = t, n.width = r, n.height = i, n.r = Math.min(r, i) / 4;
  },
  square: function(e, t, r, i, n) {
    var a = Math.min(r, i);
    n.x = e, n.y = t, n.width = a, n.height = a;
  },
  circle: function(e, t, r, i, n) {
    n.cx = e + r / 2, n.cy = t + i / 2, n.r = Math.min(r, i) / 2;
  },
  diamond: function(e, t, r, i, n) {
    n.cx = e + r / 2, n.cy = t + i / 2, n.width = r, n.height = i;
  },
  pin: function(e, t, r, i, n) {
    n.x = e + r / 2, n.y = t + i / 2, n.width = r, n.height = i;
  },
  arrow: function(e, t, r, i, n) {
    n.x = e + r / 2, n.y = t + i / 2, n.width = r, n.height = i;
  },
  triangle: function(e, t, r, i, n) {
    n.cx = e + r / 2, n.cy = t + i / 2, n.width = r, n.height = i;
  }
}, Hu = {};
A(dk, function(e, t) {
  Hu[t] = new e();
});
var gk = ht.extend({
  type: "symbol",
  shape: {
    symbolType: "",
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  calculateTextPosition: function(e, t, r) {
    var i = dp(e, t, r), n = this.shape;
    return n && n.symbolType === "pin" && t.position === "inside" && (i.y = r.y + r.height * 0.4), i;
  },
  buildPath: function(e, t, r) {
    var i = t.symbolType;
    if (i !== "none") {
      var n = Hu[i];
      n || (i = "rect", n = Hu[i]), pk[i](t.x, t.y, t.width, t.height, n.shape), n.buildPath(e, n.shape, r);
    }
  }
});
function mk(e, t) {
  if (this.type !== "image") {
    var r = this.style;
    this.__isEmptyBrush ? (r.stroke = e, r.fill = t || vt.color.neutral00, r.lineWidth = 2) : this.shape.symbolType === "line" ? r.stroke = e : r.fill = e, this.markRedraw();
  }
}
function ym(e, t, r, i, n, a, o) {
  var s = e.indexOf("empty") === 0;
  s && (e = e.substr(5, 1).toLowerCase() + e.substr(6));
  var l;
  return e.indexOf("image://") === 0 ? l = pg(e.slice(8), new Y(t, r, i, n), o ? "center" : "cover") : e.indexOf("path://") === 0 ? l = Bc(e.slice(7), {}, new Y(t, r, i, n), o ? "center" : "cover") : l = new gk({
    shape: {
      symbolType: e,
      x: t,
      y: r,
      width: i,
      height: n
    }
  }), l.__isEmptyBrush = s, l.setColor = mk, a && l.setColor(a), l;
}
function yk(e, t) {
  if (e != null)
    return F(e) || (e = [e, e]), [Ct(e[0], t[0]) || 0, Ct(W(e[1], e[0]), t[1]) || 0];
}
function li(e) {
  return isFinite(e);
}
function _k(e, t, r) {
  var i = t.x == null ? 0 : t.x, n = t.x2 == null ? 1 : t.x2, a = t.y == null ? 0 : t.y, o = t.y2 == null ? 0 : t.y2;
  t.global || (i = i * r.width + r.x, n = n * r.width + r.x, a = a * r.height + r.y, o = o * r.height + r.y), i = li(i) ? i : 0, n = li(n) ? n : 1, a = li(a) ? a : 0, o = li(o) ? o : 0;
  var s = e.createLinearGradient(i, a, n, o);
  return s;
}
function wk(e, t, r) {
  var i = r.width, n = r.height, a = Math.min(i, n), o = t.x == null ? 0.5 : t.x, s = t.y == null ? 0.5 : t.y, l = t.r == null ? 0.5 : t.r;
  t.global || (o = o * i + r.x, s = s * n + r.y, l = l * a), o = li(o) ? o : 0.5, s = li(s) ? s : 0.5, l = l >= 0 && li(l) ? l : 0.5;
  var u = e.createRadialGradient(o, s, 0, o, s, l);
  return u;
}
function Wu(e, t, r) {
  for (var i = t.type === "radial" ? wk(e, t, r) : _k(e, t, r), n = t.colorStops, a = 0; a < n.length; a++)
    i.addColorStop(n[a].offset, n[a].color);
  return i;
}
function bk(e, t) {
  if (e === t || !e && !t)
    return !1;
  if (!e || !t || e.length !== t.length)
    return !0;
  for (var r = 0; r < e.length; r++)
    if (e[r] !== t[r])
      return !0;
  return !1;
}
function Xa(e) {
  return parseInt(e, 10);
}
function qa(e, t, r) {
  var i = ["width", "height"][t], n = ["clientWidth", "clientHeight"][t], a = ["paddingLeft", "paddingTop"][t], o = ["paddingRight", "paddingBottom"][t];
  if (r[i] != null && r[i] !== "auto")
    return parseFloat(r[i]);
  var s = document.defaultView.getComputedStyle(e);
  return (e[n] || Xa(s[i]) || Xa(e.style[i])) - (Xa(s[a]) || 0) - (Xa(s[o]) || 0) || 0;
}
function Sk(e, t) {
  return !e || e === "solid" || !(t > 0) ? null : e === "dashed" ? [4 * t, 2 * t] : e === "dotted" ? [t] : _t(e) ? [e] : F(e) ? e : null;
}
function _m(e) {
  var t = e.style, r = t.lineDash && t.lineWidth > 0 && Sk(t.lineDash, t.lineWidth), i = t.lineDashOffset;
  if (r) {
    var n = t.strokeNoScale && e.getLineScale ? e.getLineScale() : 1;
    n && n !== 1 && (r = it(r, function(a) {
      return a / n;
    }), i /= n);
  }
  return [r, i];
}
var xk = new on(!0);
function Yo(e) {
  var t = e.stroke;
  return !(t == null || t === "none" || !(e.lineWidth > 0));
}
function Pv(e) {
  return typeof e == "string" && e !== "none";
}
function Xo(e) {
  var t = e.fill;
  return t != null && t !== "none";
}
function Rv(e, t) {
  if (t.fillOpacity != null && t.fillOpacity !== 1) {
    var r = e.globalAlpha;
    e.globalAlpha = t.fillOpacity * t.opacity, e.fill(), e.globalAlpha = r;
  } else
    e.fill();
}
function Ov(e, t) {
  if (t.strokeOpacity != null && t.strokeOpacity !== 1) {
    var r = e.globalAlpha;
    e.globalAlpha = t.strokeOpacity * t.opacity, e.stroke(), e.globalAlpha = r;
  } else
    e.stroke();
}
function Gu(e, t, r) {
  var i = kp(t.image, t.__image, r);
  if (fs(i)) {
    var n = e.createPattern(i, t.repeat || "repeat");
    if (typeof DOMMatrix == "function" && n && n.setTransform) {
      var a = new DOMMatrix();
      a.translateSelf(t.x || 0, t.y || 0), a.rotateSelf(0, 0, (t.rotation || 0) * qS), a.scaleSelf(t.scaleX || 1, t.scaleY || 1), n.setTransform(a);
    }
    return n;
  }
}
function Tk(e, t, r, i, n) {
  var a, o = Yo(r), s = Xo(r), l = r.strokePercent, u = l < 1, c = !t.path;
  (!t.silent || u) && c && t.createPathProxy();
  var h = t.path || xk, v = t.__dirty;
  if (!i) {
    var f = r.fill, d = r.stroke, g = s && !!f.colorStops, p = o && !!d.colorStops, m = s && !!f.image, y = o && !!d.image, _ = void 0, w = void 0, b = void 0, S = void 0, T = void 0;
    (g || p) && (T = t.getBoundingRect()), g && (_ = v ? Wu(e, f, T) : t.__canvasFillGradient, t.__canvasFillGradient = _), p && (w = v ? Wu(e, d, T) : t.__canvasStrokeGradient, t.__canvasStrokeGradient = w), m && (b = v || !t.__canvasFillPattern ? Gu(e, f, t) : t.__canvasFillPattern, t.__canvasFillPattern = b), y && (S = v || !t.__canvasStrokePattern ? Gu(e, d, t) : t.__canvasStrokePattern, t.__canvasStrokePattern = S), g ? e.fillStyle = _ : m && (b ? e.fillStyle = b : s = !1), p ? e.strokeStyle = w : y && (S ? e.strokeStyle = S : o = !1);
  }
  var C = t.getGlobalScale();
  h.setScale(C[0], C[1], t.segmentIgnoreThreshold);
  var x, M;
  e.setLineDash && r.lineDash && (a = _m(t), x = a[0], M = a[1]);
  var D = !0;
  (c || v & Ui) && (h.setDPR(e.dpr), u ? h.setContext(null) : (h.setContext(e), D = !1), h.reset(), t.buildPath(h, t.shape, i), h.toStatic(), t.pathUpdated()), D && h.rebuildPath(e, u ? l : 1), x && (e.setLineDash(x), e.lineDashOffset = M), i ? (n.batchFill = s, n.batchStroke = o) : r.strokeFirst ? (o && Ov(e, r), s && Rv(e, r)) : (s && Rv(e, r), o && Ov(e, r)), x && e.setLineDash([]);
}
function Ck(e, t, r) {
  var i = t.__image = kp(r.image, t.__image, t, t.onload);
  if (!(!i || !fs(i))) {
    var n = r.x || 0, a = r.y || 0, o = t.getWidth(), s = t.getHeight(), l = i.width / i.height;
    if (o == null && s != null ? o = s * l : s == null && o != null ? s = o / l : o == null && s == null && (o = i.width, s = i.height), r.sWidth && r.sHeight) {
      var u = r.sx || 0, c = r.sy || 0;
      e.drawImage(i, u, c, r.sWidth, r.sHeight, n, a, o, s);
    } else if (r.sx && r.sy) {
      var u = r.sx, c = r.sy, h = o - u, v = s - c;
      e.drawImage(i, u, c, h, v, n, a, o, s);
    } else
      e.drawImage(i, n, a, o, s);
  }
}
function Ak(e, t, r) {
  var i, n = r.text;
  if (n != null && (n += ""), n) {
    e.font = r.font || Dr, e.textAlign = r.textAlign, e.textBaseline = r.textBaseline;
    var a = void 0, o = void 0;
    e.setLineDash && r.lineDash && (i = _m(t), a = i[0], o = i[1]), a && (e.setLineDash(a), e.lineDashOffset = o), r.strokeFirst ? (Yo(r) && e.strokeText(n, r.x, r.y), Xo(r) && e.fillText(n, r.x, r.y)) : (Xo(r) && e.fillText(n, r.x, r.y), Yo(r) && e.strokeText(n, r.x, r.y)), a && e.setLineDash([]);
  }
}
var Bv = ["shadowBlur", "shadowOffsetX", "shadowOffsetY"], Nv = [
  ["lineCap", "butt"],
  ["lineJoin", "miter"],
  ["miterLimit", 10]
];
function wm(e, t, r, i, n) {
  var a = !1;
  if (!i && (r = r || {}, t === r))
    return !1;
  if (i || t.opacity !== r.opacity) {
    Yt(e, n), a = !0;
    var o = Math.max(Math.min(t.opacity, 1), 0);
    e.globalAlpha = isNaN(o) ? di.opacity : o;
  }
  (i || t.blend !== r.blend) && (a || (Yt(e, n), a = !0), e.globalCompositeOperation = t.blend || di.blend);
  for (var s = 0; s < Bv.length; s++) {
    var l = Bv[s];
    (i || t[l] !== r[l]) && (a || (Yt(e, n), a = !0), e[l] = e.dpr * (t[l] || 0));
  }
  return (i || t.shadowColor !== r.shadowColor) && (a || (Yt(e, n), a = !0), e.shadowColor = t.shadowColor || di.shadowColor), a;
}
function Fv(e, t, r, i, n) {
  var a = t.style, o = i ? null : r && r.style || {};
  if (a === o)
    return !1;
  var s = wm(e, a, o, i, n);
  if ((i || a.fill !== o.fill) && (s || (Yt(e, n), s = !0), Pv(a.fill) && (e.fillStyle = a.fill)), (i || a.stroke !== o.stroke) && (s || (Yt(e, n), s = !0), Pv(a.stroke) && (e.strokeStyle = a.stroke)), (i || a.opacity !== o.opacity) && (s || (Yt(e, n), s = !0), e.globalAlpha = a.opacity == null ? 1 : a.opacity), t.hasStroke()) {
    var l = a.lineWidth, u = l / (a.strokeNoScale && t.getLineScale ? t.getLineScale() : 1);
    e.lineWidth !== u && (s || (Yt(e, n), s = !0), e.lineWidth = u);
  }
  for (var c = 0; c < Nv.length; c++) {
    var h = Nv[c], v = h[0];
    (i || a[v] !== o[v]) && (s || (Yt(e, n), s = !0), e[v] = a[v] || h[1]);
  }
  return s;
}
function Mk(e, t, r, i, n) {
  return wm(e, t.style, r && r.style, i, n);
}
function bm(e, t) {
  var r = t.transform, i = e.dpr || 1;
  r ? e.setTransform(i * r[0], i * r[1], i * r[2], i * r[3], i * r[4], i * r[5]) : e.setTransform(i, 0, 0, i, 0, 0);
}
function Dk(e, t, r) {
  for (var i = !1, n = 0; n < e.length; n++) {
    var a = e[n];
    i = i || a.isZeroArea(), bm(t, a), t.beginPath(), a.buildPath(t, a.shape), t.clip();
  }
  r.allClipped = i;
}
function kk(e, t) {
  return e && t ? e[0] !== t[0] || e[1] !== t[1] || e[2] !== t[2] || e[3] !== t[3] || e[4] !== t[4] || e[5] !== t[5] : !(!e && !t);
}
var Uv = 1, zv = 2, Vv = 3, Hv = 4;
function Lk(e) {
  var t = Xo(e), r = Yo(e);
  return !(e.lineDash || !(+t ^ +r) || t && typeof e.fill != "string" || r && typeof e.stroke != "string" || e.strokePercent < 1 || e.strokeOpacity < 1 || e.fillOpacity < 1);
}
function Yt(e, t) {
  t.batchFill && (t.batchFill = !1, e.fill()), t.batchStroke && (t.batchStroke = !1, e.stroke());
}
function Sm(e, t) {
  var r = { inHover: !1, viewWidth: 0, viewHeight: 0, beforeBrushParam: {} };
  ui(e, t, r), Ki(e, r);
}
function ui(e, t, r) {
  var i = t.transform;
  if (!t.shouldBePainted(r.viewWidth, r.viewHeight, !1, !1)) {
    t.__dirty &= ~jt, t.__isRendered = !1;
    return;
  }
  var n = t.__clipPaths, a = r.prevElClipPaths, o = t.style, s = !1, l = !1;
  if ((!a || bk(n, a)) && (a && (Yt(e, r), e.restore(), l = s = !0, r.prevElClipPaths = null, r.allClipped = !1, r.prevEl = null), n && n.length && (Yt(e, r), e.save(), Dk(n, e, r), s = !0, r.prevElClipPaths = n)), r.allClipped) {
    t.__dirty &= ~jt, t.__isRendered = !1;
    return;
  }
  t.beforeBrush && t.beforeBrush(r.beforeBrushParam), t.innerBeforeBrush();
  var u = r.prevEl;
  u || (l = s = !0);
  var c = t instanceof ht && t.autoBatch && Lk(o);
  s || kk(i, u.transform) ? (Yt(e, r), bm(e, t)) : c || Yt(e, r), t instanceof ht ? (r.lastDrawType !== Uv && (l = !0, r.lastDrawType = Uv), Fv(e, t, u, l, r), (!c || !r.batchFill && !r.batchStroke) && e.beginPath(), Tk(e, t, o, c, r)) : t instanceof Oo ? (r.lastDrawType !== Vv && (l = !0, r.lastDrawType = Vv), Fv(e, t, u, l, r), Ak(e, t, o)) : t instanceof _i ? (r.lastDrawType !== zv && (l = !0, r.lastDrawType = zv), Mk(e, t, u, l, r), Ck(e, t, o)) : t.getTemporalDisplayables && (r.lastDrawType !== Hv && (l = !0, r.lastDrawType = Hv), Ik(e, t, r)), t.innerAfterBrush(), t.afterBrush && (c && Yt(e, r), t.afterBrush()), r.prevEl = t, t.__dirty = 0, t.__isRendered = !0;
}
function Ki(e, t) {
  Yt(e, t), t.prevElClipPaths && e.restore();
}
function Ik(e, t, r) {
  var i = t.getDisplayables(), n = t.getTemporalDisplayables();
  e.save();
  var a = {
    prevElClipPaths: null,
    prevEl: null,
    allClipped: !1,
    viewWidth: r.viewWidth,
    viewHeight: r.viewHeight,
    inHover: r.inHover,
    beforeBrushParam: {}
  }, o, s;
  for (o = t.getCursor(), s = i.length; o < s; o++) {
    var l = i[o];
    l.beforeBrush && l.beforeBrush(r.beforeBrushParam), l.innerBeforeBrush(), ui(e, l, a), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), a.prevEl = l;
  }
  Ki(e, a);
  for (var u = 0, c = n.length; u < c; u++) {
    var l = n[u];
    l.beforeBrush && l.beforeBrush(r.beforeBrushParam), l.innerBeforeBrush(), ui(e, l, a), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), a.prevEl = l;
  }
  Ki(e, a), t.clearTemporalDisplayables(), t.notClear = !0, e.restore();
}
var Dl = new uk(), Wv = new en(100), Gv = ["symbol", "symbolSize", "symbolKeepAspect", "color", "backgroundColor", "dashArrayX", "dashArrayY", "maxTileWidth", "maxTileHeight"];
function Yv(e, t) {
  if (e === "none")
    return null;
  var r = t.getDevicePixelRatio(), i = t.getZr(), n = i.painter.type === "svg";
  e.dirty && Dl.delete(e);
  var a = Dl.get(e);
  if (a)
    return a;
  var o = wt(e, {
    symbol: "rect",
    symbolSize: 1,
    symbolKeepAspect: !0,
    color: "rgba(0, 0, 0, 0.2)",
    backgroundColor: null,
    dashArrayX: 5,
    dashArrayY: 5,
    rotation: 0,
    maxTileWidth: 512,
    maxTileHeight: 512
  });
  o.backgroundColor === "none" && (o.backgroundColor = null);
  var s = {
    repeat: "repeat"
  };
  return l(s), s.rotation = o.rotation, s.scaleX = s.scaleY = n ? 1 : 1 / r, Dl.set(e, s), e.dirty = !1, s;
  function l(u) {
    for (var c = [r], h = !0, v = 0; v < Gv.length; ++v) {
      var f = o[Gv[v]];
      if (f != null && !F(f) && !X(f) && !_t(f) && typeof f != "boolean") {
        h = !1;
        break;
      }
      c.push(f);
    }
    var d;
    if (h) {
      d = c.join(",") + (n ? "-svg" : "");
      var g = Wv.get(d);
      g && (n ? u.svgElement = g : u.image = g);
    }
    var p = Tm(o.dashArrayX), m = Ek(o.dashArrayY), y = xm(o.symbol), _ = Pk(p), w = Cm(m), b = !n && ne.createCanvas(), S = n && {
      tag: "g",
      attrs: {},
      key: "dcl",
      children: []
    }, T = x(), C;
    b && (b.width = T.width * r, b.height = T.height * r, C = b.getContext("2d")), M(), h && Wv.put(d, b || S), u.image = b, u.svgElement = S, u.svgWidth = T.width, u.svgHeight = T.height;
    function x() {
      for (var D = 1, I = 0, k = _.length; I < k; ++I)
        D = sf(D, _[I]);
      for (var L = 1, I = 0, k = y.length; I < k; ++I)
        L = sf(L, y[I].length);
      D *= L;
      var B = w * _.length * y.length;
      return {
        width: Math.max(1, Math.min(D, o.maxTileWidth)),
        height: Math.max(1, Math.min(B, o.maxTileHeight))
      };
    }
    function M() {
      C && (C.clearRect(0, 0, b.width, b.height), o.backgroundColor && (C.fillStyle = o.backgroundColor, C.fillRect(0, 0, b.width, b.height)));
      for (var D = 0, I = 0; I < m.length; ++I)
        D += m[I];
      if (D <= 0)
        return;
      for (var k = -w, L = 0, B = 0, N = 0; k < T.height; ) {
        if (L % 2 === 0) {
          for (var q = B / 2 % y.length, U = 0, z = 0, V = 0; U < T.width * 2; ) {
            for (var J = 0, I = 0; I < p[N].length; ++I)
              J += p[N][I];
            if (J <= 0)
              break;
            if (z % 2 === 0) {
              var j = (1 - o.symbolSize) * 0.5, rt = U + p[N][z] * j, ot = k + m[L] * j, Mt = p[N][z] * o.symbolSize, re = m[L] * o.symbolSize, Vt = V / 2 % y[q].length;
              Bt(rt, ot, Mt, re, y[q][Vt]);
            }
            U += p[N][z], ++V, ++z, z === p[N].length && (z = 0);
          }
          ++N, N === p.length && (N = 0);
        }
        k += m[L], ++B, ++L, L === m.length && (L = 0);
      }
      function Bt(Et, bt, G, $, De) {
        var Dt = n ? 1 : r, hr = ym(De, Et * Dt, bt * Dt, G * Dt, $ * Dt, o.color, o.symbolKeepAspect);
        if (n) {
          var Je = i.painter.renderOneToVNode(hr);
          Je && S.children.push(Je);
        } else
          Sm(C, hr);
      }
    }
  }
}
function xm(e) {
  if (!e || e.length === 0)
    return [["rect"]];
  if (X(e))
    return [[e]];
  for (var t = !0, r = 0; r < e.length; ++r)
    if (!X(e[r])) {
      t = !1;
      break;
    }
  if (t)
    return xm([e]);
  for (var i = [], r = 0; r < e.length; ++r)
    X(e[r]) ? i.push([e[r]]) : i.push(e[r]);
  return i;
}
function Tm(e) {
  if (!e || e.length === 0)
    return [[0, 0]];
  if (_t(e)) {
    var t = Math.ceil(e);
    return [[t, t]];
  }
  for (var r = !0, i = 0; i < e.length; ++i)
    if (!_t(e[i])) {
      r = !1;
      break;
    }
  if (r)
    return Tm([e]);
  for (var n = [], i = 0; i < e.length; ++i)
    if (_t(e[i])) {
      var t = Math.ceil(e[i]);
      n.push([t, t]);
    } else {
      var t = it(e[i], function(s) {
        return Math.ceil(s);
      });
      t.length % 2 === 1 ? n.push(t.concat(t)) : n.push(t);
    }
  return n;
}
function Ek(e) {
  if (!e || typeof e == "object" && e.length === 0)
    return [0, 0];
  if (_t(e)) {
    var t = Math.ceil(e);
    return [t, t];
  }
  var r = it(e, function(i) {
    return Math.ceil(i);
  });
  return e.length % 2 ? r.concat(r) : r;
}
function Pk(e) {
  return it(e, function(t) {
    return Cm(t);
  });
}
function Cm(e) {
  for (var t = 0, r = 0; r < e.length; ++r)
    t += e[r];
  return e.length % 2 === 1 ? t * 2 : t;
}
var Rk = Ap(Ok);
function Ok(e, t) {
  e.eachRawSeries(function(r) {
    if (!e.isSeriesFiltered(r)) {
      var i = r.getData();
      i.hasItemVisual() && i.each(function(o) {
        var s = i.getItemVisual(o, "decal");
        if (s) {
          var l = i.ensureUniqueItemVisual(o, "style");
          l.decal = Yv(s, t);
        }
      });
      var n = i.getVisual("decal");
      if (n) {
        var a = i.getVisual("style");
        a.decal = Yv(n, t);
      }
    }
  });
}
var Bk = 1, Nk = 800, Fk = 900, Uk = 920, zk = 1e3, Vk = 2e3, Xv = 5e3, Am = 1e3, Hk = 1100, Jc = 2e3, Mm = 3e3, Wk = 4e3, bs = 4500, Gk = 4600, Yk = 5e3, Xk = 6e3, Dm = 7e3, qk = {
  PROCESSOR: {
    SERIES_FILTER: Nk,
    AXIS_STATISTICS: Uk,
    FILTER: zk,
    STATISTIC: Xv,
    STATISTICS: Xv
  },
  VISUAL: {
    LAYOUT: Am,
    PROGRESSIVE_LAYOUT: Hk,
    GLOBAL: Jc,
    CHART: Mm,
    POST_CHART_LAYOUT: Gk,
    COMPONENT: Wk,
    BRUSH: Yk,
    CHART_ITEM: bs,
    ARIA: Xk,
    DECAL: Dm
  }
}, Tt = "__flagInMainProcess", Za = "__mainProcessVersion", kt = "__pendingUpdate", kl = "__needsUpdateStatus", qv = /^[a-zA-Z0-9_]+$/, Ll = "__connectUpdateStatus", Zv = 0, Zk = 1, Qk = 2;
function km(e) {
  return function() {
    for (var t = [], r = 0; r < arguments.length; r++)
      t[r] = arguments[r];
    if (this.isDisposed()) {
      this.id;
      return;
    }
    return Im(this, e, t);
  };
}
function Lm(e) {
  return function() {
    for (var t = [], r = 0; r < arguments.length; r++)
      t[r] = arguments[r];
    return Im(this, e, t);
  };
}
function Im(e, t, r) {
  return r[0] = r[0] && r[0].toLowerCase(), Ke.prototype[t].apply(e, r);
}
var Em = (
  /** @class */
  (function(e) {
    Q(t, e);
    function t() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return t;
  })(Ke)
), Pm = Em.prototype;
Pm.on = Lm("on");
Pm.off = Lm("off");
var ri, Il, Qa, tr, Ka, El, Pl, Oi, Bi, Qv, Kv, Rl, Jv, Ja, jv, Rm, le, $v, Ni, Om = (
  /** @class */
  (function(e) {
    Q(t, e);
    function t(r, i, n) {
      var a = e.call(this, new K2()) || this;
      a._chartsViews = [], a._chartsMap = {}, a._componentsViews = [], a._componentsMap = {}, a._pendingActions = [], n = n || {}, a.__v_skip = !0, a._dom = r;
      var o = "canvas", s = "auto", l = !1;
      a[Za] = 1, n.ssr;
      var u = a._zr = nf(r, {
        renderer: n.renderer || o,
        devicePixelRatio: n.devicePixelRatio,
        width: n.width,
        height: n.height,
        ssr: n.ssr,
        useDirtyRect: W(n.useDirtyRect, l),
        useCoarsePointer: W(n.useCoarsePointer, s),
        pointerSize: n.pointerSize
      });
      a._ssr = n.ssr, a._throttledZrFlush = sm(ft(u.flush, u), 17), a._updateTheme(i), a._locale = VM(n.locale || Ag), a._coordSysMgr = new Ig();
      var c = a._api = jv(a);
      function h(v, f) {
        return v.__prio - f.__prio;
      }
      return ao(Zo, h), ao(qu, h), a._scheduler = new hm(a, c, qu, Zo), a._messageCenter = new Em(), a._initEvents(), a.resize = ft(a.resize, a), u.animation.on("frame", a._onframe, a), Qv(u, a), Kv(u, a), Jl(a), a;
    }
    return t.prototype._onframe = function() {
      if (!this._disposed) {
        var r = this._scheduler, i = this._model, n = this._api;
        if ($v(this), this[kt]) {
          var a = this[kt].silent;
          this[Tt] = !0, Ni(this);
          try {
            ri(this), tr.update.call(this, null, this[kt].updateParams);
          } catch (l) {
            throw this[Tt] = !1, this[kt] = null, l;
          }
          this._zr.flush(), this[Tt] = !1, this[kt] = null, Oi.call(this, a), Bi.call(this, a);
        } else if (r.unfinished) {
          var o = Bk;
          do {
            r.unfinished = !1;
            var s = ne.getTime();
            r.performSeriesTasks(i), r.performDataProcessorTasks(i), El(this, i), r.performVisualTasks(i), Ja(this, this._model, n, "remain", {}), o -= ne.getTime() - s;
          } while (o > 0 && r.unfinished);
          r.unfinished || this._zr.flush();
        }
      }
    }, t.prototype.getDom = function() {
      return this._dom;
    }, t.prototype.getId = function() {
      return this.id;
    }, t.prototype.getZr = function() {
      return this._zr;
    }, t.prototype.isSSR = function() {
      return this._ssr;
    }, t.prototype.setOption = function(r, i, n) {
      if (!this[Tt]) {
        if (this._disposed) {
          this.id;
          return;
        }
        var a, o, s;
        if (H(i) && (n = i.lazyUpdate, a = i.silent, o = i.replaceMerge, s = i.transition, i = i.notMerge), this[Tt] = !0, Ni(this), !this._model || i) {
          var l = new MD(this._api), u = this._theme, c = this._model = new Xc();
          c.scheduler = this._scheduler, c.ssr = this._ssr, c.init(null, null, null, u, this._locale, l);
        }
        this._model.setOption(r, {
          replaceMerge: o
        }, Zu);
        var h = {
          seriesTransition: s,
          optionChanged: !0
        };
        if (n)
          this[kt] = {
            silent: a,
            updateParams: h
          }, this[Tt] = !1, this.getZr().wakeUp();
        else {
          try {
            ri(this), tr.update.call(this, null, h);
          } catch (v) {
            throw this[kt] = null, this[Tt] = !1, v;
          }
          this._ssr || this._zr.flush(), this[kt] = null, this[Tt] = !1, Oi.call(this, a), Bi.call(this, a);
        }
      }
    }, t.prototype.setTheme = function(r, i) {
      if (!this[Tt]) {
        if (this._disposed) {
          this.id;
          return;
        }
        var n = this._model;
        if (n) {
          var a = i && i.silent, o = null;
          this[kt] && (a == null && (a = this[kt].silent), o = this[kt].updateParams, this[kt] = null), this[Tt] = !0, Ni(this);
          try {
            this._updateTheme(r), n.setTheme(this._theme), ri(this), tr.update.call(this, {
              type: "setTheme"
            }, o);
          } catch (s) {
            throw this[Tt] = !1, s;
          }
          this[Tt] = !1, Oi.call(this, a), Bi.call(this, a);
        }
      }
    }, t.prototype._updateTheme = function(r) {
      X(r) && (r = Bm[r]), r && (r = tt(r), r && Wg(r, !0), this._theme = r);
    }, t.prototype.getModel = function() {
      return this._model;
    }, t.prototype.getOption = function() {
      return this._model && this._model.getOption();
    }, t.prototype.getWidth = function() {
      return this._zr.getWidth();
    }, t.prototype.getHeight = function() {
      return this._zr.getHeight();
    }, t.prototype.getDevicePixelRatio = function() {
      return this._zr.painter.dpr || K.hasGlobalWindow && window.devicePixelRatio || 1;
    }, t.prototype.getRenderedCanvas = function(r) {
      return this.renderToCanvas(r);
    }, t.prototype.renderToCanvas = function(r) {
      r = r || {};
      var i = this._zr.painter;
      return i.getRenderedCanvas({
        backgroundColor: r.backgroundColor || this._model.get("backgroundColor"),
        pixelRatio: r.pixelRatio || this.getDevicePixelRatio()
      });
    }, t.prototype.renderToSVGString = function(r) {
      r = r || {};
      var i = this._zr.painter;
      return i.renderToString({
        useViewBox: r.useViewBox
      });
    }, t.prototype.getSvgDataURL = function() {
      var r = this._zr, i = r.storage.getDisplayList();
      return A(i, function(n) {
        n.stopAnimation(null, !0);
      }), r.painter.toDataURL();
    }, t.prototype.getDataURL = function(r) {
      if (this._disposed) {
        this.id;
        return;
      }
      r = r || {};
      var i = r.excludeComponents, n = this._model, a = [], o = this;
      A(i, function(l) {
        n.eachComponent({
          mainType: l
        }, function(u) {
          var c = o._componentsMap[u.__viewId];
          c.group.ignore || (a.push(c), c.group.ignore = !0);
        });
      });
      var s = this._zr.painter.getType() === "svg" ? this.getSvgDataURL() : this.renderToCanvas(r).toDataURL("image/" + (r && r.type || "png"));
      return A(a, function(l) {
        l.group.ignore = !1;
      }), s;
    }, t.prototype.getConnectedDataURL = function(r) {
      if (this._disposed) {
        this.id;
        return;
      }
      var i = r.type === "svg", n = this.group, a = Math.min, o = Math.max, s = 1 / 0;
      if (td[n]) {
        var l = s, u = s, c = -s, h = -s, v = [], f = r && r.pixelRatio || this.getDevicePixelRatio();
        A(qn, function(_, w) {
          if (_.group === n) {
            var b = i ? _.getZr().painter.getSvgDom().innerHTML : _.renderToCanvas(tt(r)), S = _.getDom().getBoundingClientRect();
            l = a(S.left, l), u = a(S.top, u), c = o(S.right, c), h = o(S.bottom, h), v.push({
              dom: b,
              left: S.left,
              top: S.top
            });
          }
        }), l *= f, u *= f, c *= f, h *= f;
        var d = c - l, g = h - u, p = ne.createCanvas(), m = nf(p, {
          renderer: i ? "svg" : "canvas"
        });
        if (m.resize({
          width: d,
          height: g
        }), i) {
          var y = "";
          return A(v, function(_) {
            var w = _.left - l, b = _.top - u;
            y += '<g transform="translate(' + w + "," + b + ')">' + _.dom + "</g>";
          }), m.painter.getSvgRoot().innerHTML = y, r.connectedBackgroundColor && m.painter.setBackgroundColor(r.connectedBackgroundColor), m.refreshImmediately(), m.painter.toDataURL();
        } else
          return r.connectedBackgroundColor && m.add(new oe({
            shape: {
              x: 0,
              y: 0,
              width: d,
              height: g
            },
            style: {
              fill: r.connectedBackgroundColor
            }
          })), A(v, function(_) {
            var w = new _i({
              style: {
                x: _.left * f - l,
                y: _.top * f - u,
                image: _.dom
              }
            });
            m.add(w);
          }), m.refreshImmediately(), p.toDataURL("image/" + (r && r.type || "png"));
      } else
        return this.getDataURL(r);
    }, t.prototype.convertToPixel = function(r, i, n) {
      return Ka(this, "convertToPixel", r, i, n);
    }, t.prototype.convertToLayout = function(r, i, n) {
      return Ka(this, "convertToLayout", r, i, n);
    }, t.prototype.convertFromPixel = function(r, i, n) {
      return Ka(this, "convertFromPixel", r, i, n);
    }, t.prototype.containPixel = function(r, i) {
      if (this._disposed) {
        this.id;
        return;
      }
      var n = this._model, a, o = tl(n, r);
      return A(o, function(s, l) {
        l.indexOf("Models") >= 0 && A(s, function(u) {
          var c = u.coordinateSystem;
          if (c && c.containPoint)
            a = a || !!c.containPoint(i);
          else if (l === "seriesModels") {
            var h = this._chartsMap[u.__viewId];
            h && h.containPoint && (a = a || h.containPoint(i, u));
          }
        }, this);
      }, this), !!a;
    }, t.prototype.getVisual = function(r, i) {
      var n = this._model, a = tl(n, r, {
        defaultMainType: "series"
      }), o = a.seriesModel, s = o.getData(), l = a.hasOwnProperty("dataIndexInside") ? a.dataIndexInside : a.hasOwnProperty("dataIndex") ? s.indexOfRawIndex(a.dataIndex) : null;
      return l != null ? $2(s, l, i) : tk(s, i);
    }, t.prototype.getViewOfComponentModel = function(r) {
      return this._componentsMap[r.__viewId];
    }, t.prototype.getViewOfSeriesModel = function(r) {
      return this._chartsMap[r.__viewId];
    }, t.prototype._initEvents = function() {
      var r = this;
      A(Kk, function(n) {
        var a = function(o) {
          var s = r.getModel(), l = o.target, u, c = n === "globalout";
          if (c ? u = {} : l && Bn(l, function(g) {
            var p = xt(g);
            if (p && p.dataIndex != null) {
              var m = p.dataModel || s.getSeriesByIndex(p.seriesIndex);
              return u = m && m.getDataParams(p.dataIndex, p.dataType, l) || {}, !0;
            } else if (p.eventData)
              return u = P({}, p.eventData), !0;
          }, !0), u) {
            var h = u.componentType, v = u.componentIndex;
            (h === "markLine" || h === "markPoint" || h === "markArea") && (h = "series", v = u.seriesIndex);
            var f = h && v != null && s.getComponent(h, v), d = f && r[f.mainType === "series" ? "_chartsMap" : "_componentsMap"][f.__viewId];
            u.event = o, u.type = n, r._$eventProcessor.eventInfo = {
              targetEl: l,
              packedEvent: u,
              model: f,
              view: d
            }, r.trigger(n, u);
          }
        };
        a.zrEventfulCallAtLast = !0, r._zr.on(n, a, r);
      });
      var i = this._messageCenter;
      A(Xu, function(n, a) {
        i.on(a, function(o) {
          r.trigger(a, o);
        });
      }), rk(i, this, this._api);
    }, t.prototype.isDisposed = function() {
      return this._disposed;
    }, t.prototype.clear = function() {
      if (this._disposed) {
        this.id;
        return;
      }
      this.setOption({
        series: []
      }, !0);
    }, t.prototype.dispose = function() {
      if (this._disposed) {
        this.id;
        return;
      }
      this._disposed = !0;
      var r = this.getDom();
      r && Cp(this.getDom(), $c, "");
      var i = this, n = i._api, a = i._model;
      A(i._componentsViews, function(o) {
        o.dispose(a, n);
      }), A(i._chartsViews, function(o) {
        o.dispose(a, n);
      }), i._zr.dispose(), i._dom = i._model = i._chartsMap = i._componentsMap = i._chartsViews = i._componentsViews = i._scheduler = i._api = i._zr = i._throttledZrFlush = i._theme = i._coordSysMgr = i._messageCenter = null, delete qn[i.id];
    }, t.prototype.resize = function(r) {
      if (!this[Tt]) {
        if (this._disposed) {
          this.id;
          return;
        }
        this._zr.resize(r);
        var i = this._model;
        if (this._loadingFX && this._loadingFX.resize(), !!i) {
          var n = i.resetOption("media"), a = r && r.silent;
          this[kt] && (a == null && (a = this[kt].silent), n = !0, this[kt] = null), this[Tt] = !0, Ni(this);
          try {
            n && ri(this), tr.update.call(this, {
              type: "resize",
              animation: P({
                // Disable animation
                duration: 0
              }, r && r.animation)
            });
          } catch (o) {
            throw this[Tt] = !1, o;
          }
          this[Tt] = !1, Oi.call(this, a), Bi.call(this, a);
        }
      }
    }, t.prototype.showLoading = function(r, i) {
      if (this._disposed) {
        this.id;
        return;
      }
      if (H(r) && (i = r, r = ""), r = r || "default", this.hideLoading(), !!Qu[r]) {
        var n = Qu[r](this._api, i), a = this._zr;
        this._loadingFX = n, a.add(n);
      }
    }, t.prototype.hideLoading = function() {
      if (this._disposed) {
        this.id;
        return;
      }
      this._loadingFX && this._zr.remove(this._loadingFX), this._loadingFX = null;
    }, t.prototype.makeActionFromEvent = function(r) {
      var i = P({}, r);
      return i.type = Yu[r.type], i;
    }, t.prototype.dispatchAction = function(r, i) {
      if (this._disposed) {
        this.id;
        return;
      }
      if (H(i) || (i = {
        silent: !!i
      }), !!qo[r.type] && this._model) {
        if (this[Tt]) {
          this._pendingActions.push(r);
          return;
        }
        var n = i.silent;
        Pl.call(this, r, n);
        var a = i.flush;
        a ? this._zr.flush() : a !== !1 && K.browser.weChat && this._throttledZrFlush(), Oi.call(this, n), Bi.call(this, n);
      }
    }, t.prototype.updateLabelLayout = function() {
      ce.trigger("series:layoutlabels", this._model, this._api, {
        // Not adding series labels.
        // TODO
        updatedSeries: []
      });
    }, t.prototype.appendData = function(r) {
      if (this._disposed) {
        this.id;
        return;
      }
      var i = r.seriesIndex, n = this.getModel(), a = n.getSeriesByIndex(i);
      a.appendData(r), this._scheduler.unfinished = !0, this.getZr().wakeUp();
    }, t.internalField = (function() {
      ri = function(h) {
        ak(h._model);
        var v = h._scheduler;
        v.restorePipelines(h._zr, h._model), v.prepareStageTasks(), Il(h, !0), Il(h, !1), v.plan();
      }, Il = function(h, v) {
        for (var f = h._model, d = h._scheduler, g = v ? h._componentsViews : h._chartsViews, p = v ? h._componentsMap : h._chartsMap, m = h._zr, y = h._api, _ = 0; _ < g.length; _++)
          g[_].__alive = !1;
        v ? f.eachComponent(function(S, T) {
          S !== "series" && w(T);
        }) : f.eachSeries(w);
        function w(S) {
          var T = S.__requireNewView;
          S.__requireNewView = !1;
          var C = "_ec_" + S.id + "_" + S.type, x = !T && p[C];
          if (!x) {
            var M = Fe(S.type), D = v ? Ir.getClass(M.main, M.sub) : (
              // FIXME:TS
              // (ChartView as ChartViewConstructor).getClass('series', classType.sub)
              // For backward compat, still support a chart type declared as only subType
              // like "liquidfill", but recommend "series.liquidfill"
              // But need a base class to make a type series.
              Ar.getClass(M.sub)
            );
            x = new D(), x.init(f, y), p[C] = x, g.push(x), m.add(x.group);
          }
          S.__viewId = x.__id = C, x.__alive = !0, x.__model = S, x.group.__ecComponentInfo = {
            mainType: S.mainType,
            index: S.componentIndex
          }, !v && d.prepareView(x, S, f, y);
        }
        for (var _ = 0; _ < g.length; ) {
          var b = g[_];
          b.__alive ? _++ : (!v && b.renderTask.dispose(), m.remove(b.group), b.dispose(f, y), g.splice(_, 1), p[b.__id] === b && delete p[b.__id], b.__id = b.group.__ecComponentInfo = null);
        }
      }, Qa = function(h, v, f, d, g) {
        var p = h._model;
        if (p.setUpdatePayload(f), !d) {
          A([].concat(h._componentsViews).concat(h._chartsViews), w);
          return;
        }
        var m = YT(f, d, g), y = f.excludeSeriesId, _;
        y != null && (_ = et(), A(Xt(y), function(b) {
          var S = Ye(b, null);
          S != null && _.set(S, !0);
        })), p && p.eachComponent(m, function(b) {
          var S = _ && _.get(b.id) != null;
          if (!S)
            if (Of(f))
              if (b instanceof Lr)
                f.type === pi && !f.notBlur && !b.get(["emphasis", "disabled"]) && lA(b, f, h._api);
              else {
                var T = Lc(b.mainType, b.componentIndex, f.name, h._api), C = T.focusSelf, x = T.dispatchers;
                f.type === pi && C && !f.notBlur && Au(b.mainType, b.componentIndex, h._api), x && A(x, function(M) {
                  f.type === pi ? xu(M) : Tu(M);
                });
              }
            else Du(f) && b instanceof Lr && (hA(b, f, h._api), Pf(b), le(h));
        }, h), p && p.eachComponent(m, function(b) {
          var S = _ && _.get(b.id) != null;
          S || w(h[d === "series" ? "_chartsMap" : "_componentsMap"][b.__viewId]);
        }, h);
        function w(b) {
          b && b.__alive && b[v] && b[v](b.__model, p, h._api, f);
        }
      }, tr = {
        prepareAndUpdate: function(h) {
          ri(this), tr.update.call(this, h, h && {
            // Needs to mark option changed if newOption is given.
            // It's from MagicType.
            // TODO If use a separate flag optionChanged in payload?
            optionChanged: h.newOption != null
          });
        },
        update: function(h, v) {
          var f = this._model, d = this._api, g = this._zr, p = this._coordSysMgr, m = this._scheduler;
          if (f) {
            ok(f), f.setUpdatePayload(h), m.restoreData(f, h), m.performSeriesTasks(f), p.create(f, d), ce.trigger("coordsys:aftercreate", f, d), m.performDataProcessorTasks(f, h), El(this, f), p.update(f, d), i(f), m.performVisualTasks(f, h);
            var y = f.get("backgroundColor") || "transparent";
            g.setBackgroundColor(y);
            var _ = f.get("darkMode");
            _ != null && _ !== "auto" && g.setDarkMode(_), Rl(this, f, d, h, v), ce.trigger("afterupdate", f, d);
          }
        },
        /**
         * PENDING: See INCONSISTENCY_OF_BRUSH_SELECTED_EVENT_IN_UPDATE_TRANSFORM
         */
        updateTransform: function(h) {
          var v = this, f = v._model, d = v._api;
          if (f) {
            f.setUpdatePayload(h);
            var g = [];
            f.eachComponent(function(m, y) {
              if (m !== Up) {
                var _ = v.getViewOfComponentModel(y);
                if (_ && _.__alive)
                  if (_.updateTransform) {
                    var w = _.updateTransform(y, f, d, h);
                    w && w.update && g.push(_);
                  } else
                    g.push(_);
              }
            });
            var p = et();
            f.eachSeries(function(m) {
              var y = v._chartsMap[m.__viewId], _ = m.pipelineContext;
              if (y.updateTransform && !_.progressiveRender) {
                var w = y.updateTransform(m, f, d, h);
                w && w.update && p.set(m.uid, 1);
              } else
                p.set(m.uid, 1);
            }), v._scheduler.performVisualTasks(f, h, {
              setDirty: !0,
              dirtyMap: p
            }), Ja(v, f, d, h, {}, p), ce.trigger("afterupdate", f, d);
          }
        },
        updateView: function(h) {
          var v = this._model;
          v && (v.setUpdatePayload(h), Ar.markUpdateMethod(h, "updateView"), i(v), this._scheduler.performVisualTasks(v, h, {
            setDirty: !0
          }), Rl(this, v, this._api, h, {}), ce.trigger("afterupdate", v, this._api));
        },
        updateVisual: function(h) {
          var v = this, f = this._model;
          f && (f.setUpdatePayload(h), f.eachSeries(function(d) {
            d.getData().clearAllVisual();
          }), Ar.markUpdateMethod(h, "updateVisual"), i(f), this._scheduler.performVisualTasks(f, h, {
            visualType: "visual",
            setDirty: !0
          }), f.eachComponent(function(d, g) {
            if (d !== "series") {
              var p = v.getViewOfComponentModel(g);
              p && p.__alive && p.updateVisual(g, f, v._api, h);
            }
          }), f.eachSeries(function(d) {
            var g = v._chartsMap[d.__viewId];
            g.updateVisual(d, f, v._api, h);
          }), ce.trigger("afterupdate", f, this._api));
        },
        /**
         * @deprecated
         */
        updateLayout: function(h) {
          tr.update.call(this, h);
        }
      };
      function r(h, v, f, d, g) {
        if (h._disposed) {
          h.id;
          return;
        }
        for (var p = h._model, m = h._coordSysMgr.getCoordinateSystems(), y, _ = tl(p, f), w = 0; w < m.length; w++) {
          var b = m[w];
          if (b[v] && (y = b[v](p, _, d, g)) != null)
            return y;
        }
      }
      Ka = r, El = function(h, v) {
        var f = h._chartsMap, d = h._scheduler;
        v.eachSeries(function(g) {
          d.updateStreamModes(g, f[g.__viewId]);
        });
      }, Pl = function(h, v) {
        var f = this, d = this.getModel(), g = h.type, p = h.escapeConnect, m = qo[g], y = (m.update || "update").split(":"), _ = y.pop(), w = y[0] != null && Fe(y[0]);
        this[Tt] = !0, Ni(this);
        var b = [h], S = !1;
        h.batch && (S = !0, b = it(h.batch, function(N) {
          return N = wt(P({}, N), h), N.batch = null, N;
        }));
        var T = [], C, x = [], M = m.nonRefinedEventType, D = Du(h), I = Of(h);
        if (I && jp(this._api), A(b, function(N) {
          var q = m.action(N, d, f._api);
          if (m.refineEvent ? x.push(q) : C = q, C = C || P({}, N), C.type = M, T.push(C), I) {
            var U = wc(h), z = U.queryOptionMap, V = U.mainTypeSpecified, J = V ? z.keys()[0] : "series";
            Qa(f, _, N, J), le(f);
          } else D ? (Qa(f, _, N, "series"), le(f)) : w && Qa(f, _, N, w.main, w.sub);
        }), _ !== "none" && !I && !D && !w)
          try {
            this[kt] ? (ri(this), tr.update.call(this, h), this[kt] = null) : tr[_].call(this, h);
          } catch (N) {
            throw this[Tt] = !1, N;
          }
        if (S ? C = {
          type: M,
          escapeConnect: p,
          batch: T
        } : C = T[0], this[Tt] = !1, !v) {
          var k = void 0;
          if (m.refineEvent) {
            var L = m.refineEvent(x, h, d, this._api).eventContent;
            nr(H(L)), k = wt({
              type: m.refinedEventType
            }, L), k.fromAction = h.type, k.fromActionPayload = h, k.escapeConnect = !0;
          }
          var B = this._messageCenter;
          B.trigger(C.type, C), k && B.trigger(k.type, k);
        }
      }, Oi = function(h) {
        for (var v = this._pendingActions; v.length; ) {
          var f = v.shift();
          Pl.call(this, f, h);
        }
      }, Bi = function(h) {
        !h && this.trigger("updated");
      }, Qv = function(h, v) {
        h.on("rendered", function(f) {
          v.trigger("rendered", f), // Although zr is dirty if initial animation is not finished
          // and this checking is called on frame, we also check
          // animation finished for robustness.
          h.animation.isFinished() && !v[kt] && !v._scheduler.unfinished && !v._pendingActions.length ? v.trigger("finished") : h.refresh();
        });
      }, Kv = function(h, v) {
        h.on("mouseover", function(f) {
          var d = f.target, g = Bn(d, Mu);
          g && (uA(g, f, v._api), le(v));
        }).on("mouseout", function(f) {
          var d = f.target, g = Bn(d, Mu);
          g && (cA(g, f, v._api), le(v));
        }).on("click", function(f) {
          var d = f.target, g = Bn(d, function(y) {
            return xt(y).dataIndex != null;
          }, !0);
          if (g) {
            var p = g.selected ? "unselect" : "select", m = xt(g);
            v._api.dispatchAction({
              type: p,
              dataType: m.dataType,
              dataIndexInside: m.dataIndex,
              seriesIndex: m.seriesIndex,
              isFromClick: !0
            });
          }
        });
      };
      function i(h) {
        h.clearColorPalette(), h.eachSeries(function(v) {
          v.clearColorPalette();
        });
      }
      function n(h) {
        var v = [], f = [], d = !1;
        if (h.eachComponent(function(y, _) {
          var w = _.get("zlevel") || 0, b = _.get("z") || 0, S = _.getZLevelKey();
          d = d || !!S, (y === "series" ? f : v).push({
            zlevel: w,
            z: b,
            idx: _.componentIndex,
            type: y,
            key: S
          });
        }), d) {
          var g = v.concat(f), p, m;
          ao(g, function(y, _) {
            return y.zlevel === _.zlevel ? y.z - _.z : y.zlevel - _.zlevel;
          }), A(g, function(y) {
            var _ = h.getComponent(y.type, y.idx), w = y.zlevel, b = y.key;
            p != null && (w = Math.max(p, w)), b ? (w === p && b !== m && w++, m = b) : m && (w === p && w++, m = ""), p = w, _.setZLevel(w);
          });
        }
      }
      Rl = function(h, v, f, d, g) {
        n(v), Jv(h, v, f, d, g), A(h._chartsViews, function(p) {
          p.__alive = !1;
        }), Ja(h, v, f, d, g), A(h._chartsViews, function(p) {
          p.__alive || p.remove(v, f);
        });
      }, Jv = function(h, v, f, d, g, p) {
        A(p || h._componentsViews, function(m) {
          var y = m.__model;
          u(y, m), m.render(y, v, f, d), l(y, m), c(y, m);
        });
      }, Ja = function(h, v, f, d, g, p) {
        var m = h._scheduler;
        g = P(g || {}, {
          updatedSeries: v.getSeries()
        }), ce.trigger("series:beforeupdate", v, f, g);
        var y = !1;
        v.eachSeries(function(_) {
          var w = h._chartsMap[_.__viewId];
          w.__alive = !0;
          var b = w.renderTask;
          m.updatePayload(b, d), u(_, w), p && p.get(_.uid) && b.dirty(), b.perform(m.getPerformArgs(b)) && (y = !0), w.group.silent = !!_.get("silent"), s(_, w), Pf(_);
        }), m.unfinished = y || m.unfinished, ce.trigger("series:layoutlabels", v, f, g), ce.trigger("series:transition", v, f, g), v.eachSeries(function(_) {
          var w = h._chartsMap[_.__viewId];
          l(_, w), c(_, w);
        }), o(h, v), ce.trigger("series:afterupdate", v, f, g);
      }, le = function(h) {
        h[kl] = !0, h.getZr().wakeUp();
      }, Ni = function(h) {
        h[Za] = (h[Za] + 1) % 1e6;
      }, $v = function(h) {
        h[kl] && (h.getZr().storage.traverse(function(v) {
          Yn(v) || a(v);
        }), h[kl] = !1);
      };
      function a(h) {
        for (var v = [], f = h.currentStates, d = 0; d < f.length; d++) {
          var g = f[d];
          g === "emphasis" || g === "blur" || g === "select" || v.push(g);
        }
        h.selected && h.states.select && v.push("select"), h.hoverState === Mc && h.states.emphasis ? v.push("emphasis") : h.hoverState === Ac && h.states.blur && v.push("blur"), h.useStates(v);
      }
      function o(h, v) {
        var f = h._zr;
        if (f.painter.type === "canvas") {
          var d = f.storage, g = 0;
          d.traverse(function(m) {
            m.isGroup || g++;
          });
          var p = g > W(v.get("hoverLayerThreshold"), Fg.hoverLayerThreshold) && !K.node && !K.worker;
          (h._usingTHL || p) && (v.eachSeries(function(m) {
            if (!m.preventUsingHoverLayer) {
              var y = h._chartsMap[m.__viewId];
              y.__alive && y.eachRendered(function(_) {
                var w = _.states.emphasis;
                w && w.hoverLayer !== dg && (w.hoverLayer = p ? vg : fg);
              });
            }
          }), h._usingTHL = p);
        }
      }
      function s(h, v) {
        var f = h.get("blendMode") || null;
        v.eachRendered(function(d) {
          d.isGroup || (d.style.blend = f);
        });
      }
      function l(h, v) {
        if (!h.preventAutoZ) {
          var f = bg(h);
          v.eachRendered(function(d) {
            return Sg(d, f.z, f.zlevel), !0;
          });
        }
      }
      function u(h, v) {
        v.eachRendered(function(f) {
          if (!Yn(f)) {
            var d = f.getTextContent(), g = f.getTextGuideLine();
            f.stateTransition && (f.stateTransition = null), d && d.stateTransition && (d.stateTransition = null), g && g.stateTransition && (g.stateTransition = null), f.hasState() ? (f.prevStates = f.currentStates, f.clearStates()) : f.prevStates && (f.prevStates = null);
          }
        });
      }
      function c(h, v) {
        var f = h.getModel("stateAnimation"), d = h.isAnimationEnabled(), g = f.get("duration"), p = g > 0 ? {
          duration: g,
          delay: f.get("delay"),
          easing: f.get("easing")
          // additive: stateAnimationModel.get('additive')
        } : null;
        v.eachRendered(function(m) {
          if (m.states && m.states.emphasis) {
            if (Yn(m))
              return;
            if (m instanceof ht && wA(m), m.__dirty) {
              var y = m.prevStates;
              y && m.useStates(y);
            }
            if (d) {
              m.stateTransition = p;
              var _ = m.getTextContent(), w = m.getTextGuideLine();
              _ && (_.stateTransition = p), w && (w.stateTransition = p);
            }
            m.__dirty && a(m);
          }
        });
      }
      jv = function(h) {
        return new /** @class */
        ((function(v) {
          Q(f, v);
          function f() {
            return v !== null && v.apply(this, arguments) || this;
          }
          return f.prototype.getCoordinateSystems = function() {
            return h._coordSysMgr.getCoordinateSystems();
          }, f.prototype.getComponentByElement = function(d) {
            for (; d; ) {
              var g = d.__ecComponentInfo;
              if (g != null)
                return h._model.getComponent(g.mainType, g.index);
              d = d.parent;
            }
          }, f.prototype.enterEmphasis = function(d, g) {
            xu(d, g), le(h);
          }, f.prototype.leaveEmphasis = function(d, g) {
            Tu(d, g), le(h);
          }, f.prototype.enterBlur = function(d) {
            sA(d), le(h);
          }, f.prototype.leaveBlur = function(d) {
            Zp(d), le(h);
          }, f.prototype.enterSelect = function(d) {
            Qp(d), le(h);
          }, f.prototype.leaveSelect = function(d) {
            Kp(d), le(h);
          }, f.prototype.getModel = function() {
            return h.getModel();
          }, f.prototype.getViewOfComponentModel = function(d) {
            return h.getViewOfComponentModel(d);
          }, f.prototype.getViewOfSeriesModel = function(d) {
            return h.getViewOfSeriesModel(d);
          }, f.prototype.getECUpdateCycleVersion = function() {
            return h[Za];
          }, f.prototype.usingTHL = function() {
            return h._usingTHL;
          }, f;
        })(Hp))(h);
      }, Rm = function(h) {
        function v(f, d) {
          for (var g = 0; g < f.length; g++) {
            var p = f[g];
            p[Ll] = d;
          }
        }
        A(Yu, function(f, d) {
          h._messageCenter.on(d, function(g) {
            if (td[h.group] && h[Ll] !== Zv) {
              if (g && g.escapeConnect)
                return;
              var p = h.makeActionFromEvent(g), m = [];
              A(qn, function(y) {
                y !== h && y.group === h.group && m.push(y);
              }), v(m, Zv), A(m, function(y) {
                y[Ll] !== Zk && y.dispatchAction(p);
              }), v(m, Qk);
            }
          });
        });
      };
    })(), t;
  })(Ke)
), jc = Om.prototype;
jc.on = km("on");
jc.off = km("off");
jc.one = function(e, t, r) {
  var i = this;
  function n() {
    for (var a = [], o = 0; o < arguments.length; o++)
      a[o] = arguments[o];
    t && t.apply && t.apply(this, a), i.off(e, n);
  }
  this.on.call(this, e, n, r);
};
var Kk = ["click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "globalout", "contextmenu"];
var qo = {}, Yu = {}, Xu = {}, qu = [], Zu = [], Zo = [], Bm = {}, Qu = {}, qn = {}, td = {}, Jk = +/* @__PURE__ */ new Date() - 0, $c = "_echarts_instance_";
function jk(e, t, r) {
  var i = !(r && r.ssr);
  if (i) {
    var n = $k(e);
    if (n)
      return n;
  }
  var a = new Om(e, t, r);
  return a.id = "ec_" + Jk++, qn[a.id] = a, i && Cp(e, $c, a.id), Rm(a), ce.trigger("afterinit", a), a;
}
function $k(e) {
  return qn[XT(e, $c)];
}
function Nm(e, t) {
  Bm[e] = t;
}
function Fm(e) {
  dt(Zu, e) < 0 && Zu.push(e);
}
function Um(e, t) {
  eh(qu, e, t, Vk);
}
function tL(e) {
  th("afterinit", e);
}
function eL(e) {
  th("afterupdate", e);
}
function th(e, t) {
  ce.on(e, t);
}
function cn(e, t, r) {
  var i, n, a, o, s;
  at(t) && (r = t, t = ""), H(e) ? (i = e.type, n = e.event, o = e.update, s = e.publishNonRefinedEvent, r || (r = e.action), a = e.refineEvent) : (i = e, n = t);
  function l(c) {
    return c.toLowerCase();
  }
  n = l(n || i);
  var u = a ? l(i) : n;
  qo[i] || (nr(qv.test(i) && qv.test(n)), a && nr(n !== i), qo[i] = {
    actionType: i,
    refinedEventType: n,
    nonRefinedEventType: u,
    update: o,
    action: r,
    refineEvent: a
  }, Xu[n] = 1, a && s && (Xu[u] = 1), Yu[u] = i);
}
function rL(e, t) {
  Ig.register(e, t);
}
function iL(e, t) {
  eh(Zo, e, t, Am, "layout");
}
function bi(e, t) {
  eh(Zo, e, t, Mm, "visual");
}
var ed = [];
function eh(e, t, r, i, n, a) {
  if ((at(t) || H(t)) && (r = t, t = i), !(dt(ed, r) >= 0)) {
    ed.push(r);
    var o = hm.wrapStageHandler(r, n);
    o.__prio = t, o.__raw = r, e.push(o);
  }
}
function zm(e, t) {
  Qu[e] = t;
}
function nL(e, t, r) {
  var i = nk("registerMap");
  i && i(e, t, r);
}
var aL = o2;
bi(Jc, N2);
bi(bs, F2);
bi(bs, U2);
bi(Jc, J2);
bi(bs, j2);
bi(Dm, Rk);
Fm(Wg);
Um(Fk, UD);
zm("default", z2);
cn({
  type: pi,
  event: pi,
  update: pi
}, $t);
cn({
  type: fo,
  event: fo,
  update: fo
}, $t);
cn({
  type: No,
  event: Dc,
  update: No,
  action: $t,
  refineEvent: rh,
  publishNonRefinedEvent: !0
});
cn({
  type: Su,
  event: Dc,
  update: Su,
  action: $t,
  refineEvent: rh,
  publishNonRefinedEvent: !0
});
cn({
  type: Fo,
  event: Dc,
  update: Fo,
  action: $t,
  refineEvent: rh,
  publishNonRefinedEvent: !0
});
function rh(e, t, r, i) {
  return {
    eventContent: {
      selected: fA(r),
      isFromClick: t.isFromClick || !1
    }
  };
}
Nm("default", {});
Nm("dark", pm);
function Sn(e) {
  return e == null ? 0 : e.length || 1;
}
function rd(e) {
  return e;
}
var oL = (
  /** @class */
  (function() {
    function e(t, r, i, n, a, o) {
      this._old = t, this._new = r, this._oldKeyGetter = i || rd, this._newKeyGetter = n || rd, this.context = a, this._diffModeMultiple = o === "multiple";
    }
    return e.prototype.add = function(t) {
      return this._add = t, this;
    }, e.prototype.update = function(t) {
      return this._update = t, this;
    }, e.prototype.updateManyToOne = function(t) {
      return this._updateManyToOne = t, this;
    }, e.prototype.updateOneToMany = function(t) {
      return this._updateOneToMany = t, this;
    }, e.prototype.updateManyToMany = function(t) {
      return this._updateManyToMany = t, this;
    }, e.prototype.remove = function(t) {
      return this._remove = t, this;
    }, e.prototype.execute = function() {
      this[this._diffModeMultiple ? "_executeMultiple" : "_executeOneToOne"]();
    }, e.prototype._executeOneToOne = function() {
      var t = this._old, r = this._new, i = {}, n = new Array(t.length), a = new Array(r.length);
      this._initIndexMap(t, null, n, "_oldKeyGetter"), this._initIndexMap(r, i, a, "_newKeyGetter");
      for (var o = 0; o < t.length; o++) {
        var s = n[o], l = i[s], u = Sn(l);
        if (u > 1) {
          var c = l.shift();
          l.length === 1 && (i[s] = l[0]), this._update && this._update(c, o);
        } else u === 1 ? (i[s] = null, this._update && this._update(l, o)) : this._remove && this._remove(o);
      }
      this._performRestAdd(a, i);
    }, e.prototype._executeMultiple = function() {
      var t = this._old, r = this._new, i = {}, n = {}, a = [], o = [];
      this._initIndexMap(t, i, a, "_oldKeyGetter"), this._initIndexMap(r, n, o, "_newKeyGetter");
      for (var s = 0; s < a.length; s++) {
        var l = a[s], u = i[l], c = n[l], h = Sn(u), v = Sn(c);
        if (h > 1 && v === 1)
          this._updateManyToOne && this._updateManyToOne(c, u), n[l] = null;
        else if (h === 1 && v > 1)
          this._updateOneToMany && this._updateOneToMany(c, u), n[l] = null;
        else if (h === 1 && v === 1)
          this._update && this._update(c, u), n[l] = null;
        else if (h > 1 && v > 1)
          this._updateManyToMany && this._updateManyToMany(c, u), n[l] = null;
        else if (h > 1)
          for (var f = 0; f < h; f++)
            this._remove && this._remove(u[f]);
        else
          this._remove && this._remove(u);
      }
      this._performRestAdd(o, n);
    }, e.prototype._performRestAdd = function(t, r) {
      for (var i = 0; i < t.length; i++) {
        var n = t[i], a = r[n], o = Sn(a);
        if (o > 1)
          for (var s = 0; s < o; s++)
            this._add && this._add(a[s]);
        else o === 1 && this._add && this._add(a);
        r[n] = null;
      }
    }, e.prototype._initIndexMap = function(t, r, i, n) {
      for (var a = this._diffModeMultiple, o = 0; o < t.length; o++) {
        var s = "_ec_" + this[n](t[o], o);
        if (a || (i[o] = s), !!r) {
          var l = r[s], u = Sn(l);
          u === 0 ? (r[s] = o, a && i.push(s)) : u === 1 ? r[s] = [l, o] : l.push(o);
        }
      }
    }, e;
  })()
), sL = (
  /** @class */
  (function() {
    function e(t, r) {
      this._encode = t, this._schema = r;
    }
    return e.prototype.get = function() {
      return {
        // Do not generate full dimension name until fist used.
        fullDimensions: this._getFullDimensionNames(),
        encode: this._encode
      };
    }, e.prototype._getFullDimensionNames = function() {
      return this._cachedDimNames || (this._cachedDimNames = this._schema ? this._schema.makeOutputDimensionNames() : []), this._cachedDimNames;
    }, e;
  })()
);
function lL(e, t) {
  var r = {}, i = r.encode = {}, n = et(), a = [], o = [], s = {};
  A(e.dimensions, function(v) {
    var f = e.getDimensionInfo(v), d = f.coordDim;
    if (d) {
      var g = f.coordDimIndex;
      Ol(i, d)[g] = v, f.isExtraCoord || (n.set(d, 1), uL(f.type) && (a[0] = v), Ol(s, d)[g] = e.getDimensionIndex(f.name)), f.defaultTooltip && o.push(v);
    }
    zp.each(function(p, m) {
      var y = Ol(i, m), _ = f.otherDims[m];
      _ != null && _ !== !1 && (y[_] = f.name);
    });
  });
  var l = [], u = {};
  n.each(function(v, f) {
    var d = i[f];
    u[f] = d[0], l = l.concat(d);
  }), r.dataDimsOnCoord = l, r.dataDimIndicesOnCoord = it(l, function(v) {
    return e.getDimensionInfo(v).storeDimIndex;
  }), r.encodeFirstDimNotExtra = u;
  var c = i.label;
  c && c.length && (a = c.slice());
  var h = i.tooltip;
  return h && h.length ? o = h.slice() : o.length || (o = a.slice()), i.defaultedLabel = a, i.defaultedTooltip = o, r.userOutput = new sL(s, t), r;
}
function Ol(e, t) {
  return e.hasOwnProperty(t) || (e[t] = []), e[t];
}
function uL(e) {
  return !(e === "ordinal" || e === "time");
}
var _o = (
  /** @class */
  /* @__PURE__ */ (function() {
    function e(t) {
      this.otherDims = {}, t != null && P(this, t);
    }
    return e;
  })()
), cL = st(), hL = {
  float: "f",
  int: "i",
  ordinal: "o",
  number: "n",
  time: "t"
}, Vm = (
  /** @class */
  (function() {
    function e(t) {
      this.dimensions = t.dimensions, this._dimOmitted = t.dimensionOmitted, this.source = t.source, this._fullDimCount = t.fullDimensionCount, this._updateDimOmitted(t.dimensionOmitted);
    }
    return e.prototype.isDimensionOmitted = function() {
      return this._dimOmitted;
    }, e.prototype._updateDimOmitted = function(t) {
      this._dimOmitted = t, t && (this._dimNameMap || (this._dimNameMap = Wm(this.source)));
    }, e.prototype.getSourceDimensionIndex = function(t) {
      return W(this._dimNameMap.get(t), -1);
    }, e.prototype.getSourceDimension = function(t) {
      var r = this.source.dimensionsDefine;
      if (r)
        return r[t];
    }, e.prototype.makeStoreSchema = function() {
      for (var t = this._fullDimCount, r = Xg(this.source), i = !Gm(t), n = "", a = [], o = 0, s = 0; o < t; o++) {
        var l = void 0, u = void 0, c = void 0, h = this.dimensions[s];
        if (h && h.storeDimIndex === o)
          l = r ? h.name : null, u = h.type, c = h.ordinalMeta, s++;
        else {
          var v = this.getSourceDimension(o);
          v && (l = r ? v.name : null, u = v.type);
        }
        a.push({
          property: l,
          type: u,
          ordinalMeta: c
        }), r && l != null && (!h || !h.isCalculationCoord) && (n += i ? l.replace(/\`/g, "`1").replace(/\$/g, "`2") : l), n += "$", n += hL[u] || "f", c && (n += c.uid), n += "$";
      }
      var f = this.source, d = [f.seriesLayoutBy, f.startIndex, n].join("$$");
      return {
        dimensions: a,
        hash: d
      };
    }, e.prototype.makeOutputDimensionNames = function() {
      for (var t = [], r = 0, i = 0; r < this._fullDimCount; r++) {
        var n = void 0, a = this.dimensions[i];
        if (a && a.storeDimIndex === r)
          a.isCalculationCoord || (n = a.name), i++;
        else {
          var o = this.getSourceDimension(r);
          o && (n = o.name);
        }
        t.push(n);
      }
      return t;
    }, e.prototype.appendCalculationDimension = function(t) {
      this.dimensions.push(t), t.isCalculationCoord = !0, this._fullDimCount++, this._updateDimOmitted(!0);
    }, e;
  })()
);
function fL(e) {
  return e instanceof Vm;
}
function Hm(e) {
  for (var t = et(), r = 0; r < (e || []).length; r++) {
    var i = e[r], n = H(i) ? i.name : i;
    n != null && t.get(n) == null && t.set(n, r);
  }
  return t;
}
function Wm(e) {
  var t = cL(e);
  return t.dimNameMap || (t.dimNameMap = Hm(e.dimensionsDefine));
}
function Gm(e) {
  return e > 30;
}
var xn = H, gr = it, vL = typeof Int32Array > "u" ? Array : Int32Array, dL = "e\0\0", id = -1, pL = ["hasItemOption", "_nameList", "_idList", "_invertedIndicesMap", "_dimSummary", "userOutput", "_rawData", "_dimValueGetter", "_nameDimIdx", "_idDimIdx", "_nameRepeatCount"], gL = ["_approximateExtent"], nd, ja, Tn, Cn, Bl, An, Nl, mL = (
  /** @class */
  (function() {
    function e(t, r) {
      this.type = "list", this._dimOmitted = !1, this._nameList = [], this._idList = [], this._visual = {}, this._layout = {}, this._itemVisuals = [], this._itemLayouts = [], this._graphicEls = [], this._approximateExtent = {}, this._calculationInfo = {}, this.hasItemOption = !1, this.TRANSFERABLE_METHODS = ["cloneShallow", "downSample", "minmaxDownSample", "lttbDownSample", "map"], this.CHANGABLE_METHODS = ["filterSelf", "selectRange"], this.DOWNSAMPLE_METHODS = ["downSample", "minmaxDownSample", "lttbDownSample"];
      var i, n = !1;
      fL(t) ? (i = t.dimensions, this._dimOmitted = t.isDimensionOmitted(), this._schema = t) : (n = !0, i = t), i = i || ["x", "y"];
      for (var a = {}, o = [], s = {}, l = !1, u = {}, c = 0; c < i.length; c++) {
        var h = i[c], v = X(h) ? new _o({
          name: h
        }) : h instanceof _o ? h : new _o(h), f = v.name;
        v.type = v.type || "float", v.coordDim || (v.coordDim = f, v.coordDimIndex = 0);
        var d = v.otherDims = v.otherDims || {};
        o.push(f), a[f] = v, u[f] != null && (l = !0), v.createInvertedIndices && (s[f] = []), n && (v.storeDimIndex = c), d.itemName === 0 && (this._nameDimIdx = v.storeDimIndex), d.itemId === 0 && (this._idDimIdx = v.storeDimIndex);
      }
      if (this.dimensions = o, this._dimInfos = a, this._initGetDimensionInfo(l), this.hostModel = r, this._invertedIndicesMap = s, this._dimOmitted) {
        var g = this._dimIdxToName = et();
        A(o, function(p) {
          g.set(a[p].storeDimIndex, p);
        });
      }
    }
    return e.prototype.getDimension = function(t) {
      var r = this._recognizeDimIndex(t);
      if (r == null)
        return t;
      if (r = t, !this._dimOmitted)
        return this.dimensions[r];
      var i = this._dimIdxToName.get(r);
      if (i != null)
        return i;
      var n = this._schema.getSourceDimension(r);
      if (n)
        return n.name;
    }, e.prototype.getDimensionIndex = function(t) {
      var r = this._recognizeDimIndex(t);
      if (r != null)
        return r;
      if (t == null)
        return -1;
      var i = this._getDimInfo(t);
      return i ? i.storeDimIndex : this._dimOmitted ? this._schema.getSourceDimensionIndex(t) : -1;
    }, e.prototype._recognizeDimIndex = function(t) {
      if (_t(t) || t != null && !isNaN(t) && !this._getDimInfo(t) && (!this._dimOmitted || this._schema.getSourceDimensionIndex(t) < 0))
        return +t;
    }, e.prototype._getStoreDimIndex = function(t) {
      var r = this.getDimensionIndex(t);
      return r;
    }, e.prototype.getDimensionInfo = function(t) {
      return this._getDimInfo(this.getDimension(t));
    }, e.prototype._initGetDimensionInfo = function(t) {
      var r = this._dimInfos;
      this._getDimInfo = t ? function(i) {
        return r.hasOwnProperty(i) ? r[i] : void 0;
      } : function(i) {
        return r[i];
      };
    }, e.prototype.getDimensionsOnCoord = function() {
      return this._dimSummary.dataDimsOnCoord.slice();
    }, e.prototype.mapDimension = function(t, r) {
      var i = this._dimSummary;
      if (r == null)
        return i.encodeFirstDimNotExtra[t];
      var n = i.encode[t];
      return n ? n[r] : null;
    }, e.prototype.mapDimensionsAll = function(t) {
      var r = this._dimSummary, i = r.encode[t];
      return (i || []).slice();
    }, e.prototype.getStore = function() {
      return this._store;
    }, e.prototype.initData = function(t, r, i) {
      var n = this, a;
      if (t instanceof Bu && (a = t), !a) {
        var o = this.dimensions, s = qc(t) || te(t) ? new qg(t, o.length) : t;
        a = new Bu();
        var l = gr(o, function(u) {
          return {
            type: n._dimInfos[u].type,
            property: u
          };
        });
        a.initData(s, l, i);
      }
      this._store = a, this._nameList = (r || []).slice(), this._idList = [], this._nameRepeatCount = {}, this._doInit(0, a.count()), this._dimSummary = lL(this, this._schema), this.userOutput = this._dimSummary.userOutput;
    }, e.prototype.appendData = function(t) {
      var r = this._store.appendData(t);
      this._doInit(r[0], r[1]);
    }, e.prototype.appendValues = function(t, r) {
      var i = this._store.appendValues(t, r && r.length), n = i.start, a = i.end, o = this._shouldMakeIdFromName();
      if (this._updateOrdinalMeta(), r)
        for (var s = n; s < a; s++) {
          var l = s - n;
          this._nameList[s] = r[l], o && Nl(this, s);
        }
    }, e.prototype._updateOrdinalMeta = function() {
      for (var t = this._store, r = this.dimensions, i = 0; i < r.length; i++) {
        var n = this._dimInfos[r[i]];
        n.ordinalMeta && t.collectOrdinalMeta(n.storeDimIndex, n.ordinalMeta);
      }
    }, e.prototype._shouldMakeIdFromName = function() {
      var t = this._store.getProvider();
      return this._idDimIdx == null && t.getSource().sourceFormat !== Cr && !t.fillStorage;
    }, e.prototype._doInit = function(t, r) {
      if (!(t >= r)) {
        var i = this._store, n = i.getProvider();
        this._updateOrdinalMeta();
        var a = this._nameList, o = this._idList, s = n.getSource().sourceFormat, l = s === Ce;
        if (l && !n.pure)
          for (var u = [], c = t; c < r; c++) {
            var h = n.getItem(c, u);
            if (!this.hasItemOption && RT(h) && (this.hasItemOption = !0), h) {
              var v = h.name;
              a[c] == null && v != null && (a[c] = Ye(v, null));
              var f = h.id;
              o[c] == null && f != null && (o[c] = Ye(f, null));
            }
          }
        if (this._shouldMakeIdFromName())
          for (var c = t; c < r; c++)
            Nl(this, c);
        nd(this);
      }
    }, e.prototype.getApproximateExtent = function(t, r) {
      return this._approximateExtent[t] || this._store.getDataExtent(this._getStoreDimIndex(t), r);
    }, e.prototype.setApproximateExtent = function(t, r) {
      r = this.getDimension(r), this._approximateExtent[r] = t.slice();
    }, e.prototype.getCalculationInfo = function(t) {
      return this._calculationInfo[t];
    }, e.prototype.setCalculationInfo = function(t, r) {
      xn(t) ? P(this._calculationInfo, t) : this._calculationInfo[t] = r;
    }, e.prototype.getName = function(t) {
      var r = this.getRawIndex(t), i = this._nameList[r];
      return i == null && this._nameDimIdx != null && (i = Tn(this, this._nameDimIdx, r)), i == null && (i = ""), i;
    }, e.prototype._getCategory = function(t, r) {
      var i = this._store.get(t, r), n = this._store.getOrdinalMeta(t);
      return n ? n.categories[i] : i;
    }, e.prototype.getId = function(t) {
      return ja(this, this.getRawIndex(t));
    }, e.prototype.count = function() {
      return this._store.count();
    }, e.prototype.get = function(t, r) {
      var i = this._store, n = this._dimInfos[t];
      if (n)
        return i.get(n.storeDimIndex, r);
    }, e.prototype.getByRawIndex = function(t, r) {
      var i = this._store, n = this._dimInfos[t];
      if (n)
        return i.getByRawIndex(n.storeDimIndex, r);
    }, e.prototype.getIndices = function() {
      return this._store.getIndices();
    }, e.prototype.getDataExtent = function(t) {
      return this._store.getDataExtent(this._getStoreDimIndex(t), null);
    }, e.prototype.getSum = function(t) {
      return this._store.getSum(this._getStoreDimIndex(t));
    }, e.prototype.getMedian = function(t) {
      return this._store.getMedian(this._getStoreDimIndex(t));
    }, e.prototype.getValues = function(t, r) {
      var i = this, n = this._store;
      return F(t) ? n.getValues(gr(t, function(a) {
        return i._getStoreDimIndex(a);
      }), r) : n.getValues(t);
    }, e.prototype.hasValue = function(t) {
      for (var r = this._dimSummary.dataDimIndicesOnCoord, i = 0, n = r.length; i < n; i++)
        if (isNaN(this._store.get(r[i], t)))
          return !1;
      return !0;
    }, e.prototype.indexOfName = function(t) {
      for (var r = 0, i = this._store.count(); r < i; r++)
        if (this.getName(r) === t)
          return r;
      return -1;
    }, e.prototype.getRawIndex = function(t) {
      return this._store.getRawIndex(t);
    }, e.prototype.indexOfRawIndex = function(t) {
      return this._store.indexOfRawIndex(t);
    }, e.prototype.rawIndexOf = function(t, r) {
      var i = t && this._invertedIndicesMap[t], n = i && i[r];
      return n == null || isNaN(n) ? id : n;
    }, e.prototype.each = function(t, r, i) {
      at(t) && (i = r, r = t, t = []);
      var n = i || this, a = gr(Cn(t), this._getStoreDimIndex, this);
      this._store.each(a, n ? ft(r, n) : r);
    }, e.prototype.filterSelf = function(t, r, i) {
      at(t) && (i = r, r = t, t = []);
      var n = i || this, a = gr(Cn(t), this._getStoreDimIndex, this);
      return this._store = this._store.filter(a, n ? ft(r, n) : r), this;
    }, e.prototype.selectRange = function(t) {
      var r = this, i = {}, n = yt(t);
      return A(n, function(a) {
        var o = r._getStoreDimIndex(a);
        i[o] = t[a];
      }), this._store = this._store.selectRange(i), this;
    }, e.prototype.mapArray = function(t, r, i) {
      at(t) && (i = r, r = t, t = []), i = i || this;
      var n = [];
      return this.each(t, function() {
        n.push(r && r.apply(this, arguments));
      }, i), n;
    }, e.prototype.map = function(t, r, i, n) {
      var a = i || n || this, o = gr(Cn(t), this._getStoreDimIndex, this), s = An(this);
      return s._store = this._store.map(o, a ? ft(r, a) : r), s;
    }, e.prototype.modify = function(t, r, i, n) {
      var a = i || n || this, o = gr(Cn(t), this._getStoreDimIndex, this);
      this._store.modify(o, a ? ft(r, a) : r);
    }, e.prototype.downSample = function(t, r, i, n) {
      var a = An(this);
      return a._store = this._store.downSample(this._getStoreDimIndex(t), r, i, n), a;
    }, e.prototype.minmaxDownSample = function(t, r) {
      var i = An(this);
      return i._store = this._store.minmaxDownSample(this._getStoreDimIndex(t), r), i;
    }, e.prototype.lttbDownSample = function(t, r) {
      var i = An(this);
      return i._store = this._store.lttbDownSample(this._getStoreDimIndex(t), r), i;
    }, e.prototype.getRawDataItem = function(t) {
      return this._store.getRawDataItem(t);
    }, e.prototype.getItemModel = function(t) {
      var r = this.hostModel, i = this.getRawDataItem(t);
      return new mt(i, r, r && r.ecModel);
    }, e.prototype.diff = function(t) {
      var r = this;
      return new oL(t ? t.getStore().getIndices() : [], this.getStore().getIndices(), function(i) {
        return ja(t, i);
      }, function(i) {
        return ja(r, i);
      });
    }, e.prototype.getVisual = function(t) {
      var r = this._visual;
      return r && r[t];
    }, e.prototype.setVisual = function(t, r) {
      this._visual = this._visual || {}, xn(t) ? P(this._visual, t) : this._visual[t] = r;
    }, e.prototype.getItemVisual = function(t, r) {
      var i = this._itemVisuals[t], n = i && i[r];
      return n ?? this.getVisual(r);
    }, e.prototype.hasItemVisual = function() {
      return this._itemVisuals.length > 0;
    }, e.prototype.ensureUniqueItemVisual = function(t, r) {
      var i = this._itemVisuals, n = i[t];
      n || (n = i[t] = {});
      var a = n[r];
      return a == null && (a = this.getVisual(r), F(a) ? a = a.slice() : xn(a) && (a = P({}, a)), n[r] = a), a;
    }, e.prototype.setItemVisual = function(t, r, i) {
      var n = this._itemVisuals[t] || {};
      this._itemVisuals[t] = n, xn(r) ? P(n, r) : n[r] = i;
    }, e.prototype.clearAllVisual = function() {
      this._visual = {}, this._itemVisuals = [];
    }, e.prototype.setLayout = function(t, r) {
      xn(t) ? P(this._layout, t) : this._layout[t] = r;
    }, e.prototype.getLayout = function(t) {
      return this._layout[t];
    }, e.prototype.getItemLayout = function(t) {
      return this._itemLayouts[t];
    }, e.prototype.setItemLayout = function(t, r, i) {
      this._itemLayouts[t] = i ? P(this._itemLayouts[t] || {}, r) : r;
    }, e.prototype.clearItemLayouts = function() {
      this._itemLayouts.length = 0;
    }, e.prototype.setItemGraphicEl = function(t, r) {
      var i = this.hostModel && this.hostModel.seriesIndex;
      QC(i, this.dataType, t, r), this._graphicEls[t] = r;
    }, e.prototype.getItemGraphicEl = function(t) {
      return this._graphicEls[t];
    }, e.prototype.eachItemGraphicEl = function(t, r) {
      A(this._graphicEls, function(i, n) {
        i && t && t.call(r, i, n);
      });
    }, e.prototype.cloneShallow = function(t) {
      return t || (t = new e(this._schema ? this._schema : gr(this.dimensions, this._getDimInfo, this), this.hostModel)), Bl(t, this), t._store = this._store, t;
    }, e.prototype.wrapMethod = function(t, r) {
      var i = this[t];
      at(i) && (this.__wrappedMethods = this.__wrappedMethods || [], this.__wrappedMethods.push(t), this[t] = function() {
        var n = i.apply(this, arguments);
        return r.apply(this, [n].concat(fc(arguments)));
      });
    }, e.internalField = (function() {
      nd = function(t) {
        var r = t._invertedIndicesMap;
        A(r, function(i, n) {
          var a = t._dimInfos[n], o = a.ordinalMeta, s = t._store;
          if (o) {
            i = r[n] = new vL(o.categories.length);
            for (var l = 0; l < i.length; l++)
              i[l] = id;
            for (var l = 0; l < s.count(); l++)
              i[s.get(a.storeDimIndex, l)] = l;
          }
        });
      }, Tn = function(t, r, i) {
        return Ye(t._getCategory(r, i), null);
      }, ja = function(t, r) {
        var i = t._idList[r];
        return i == null && t._idDimIdx != null && (i = Tn(t, t._idDimIdx, r)), i == null && (i = dL + r), i;
      }, Cn = function(t) {
        return F(t) || (t = t != null ? [t] : []), t;
      }, An = function(t) {
        var r = new e(t._schema ? t._schema : gr(t.dimensions, t._getDimInfo, t), t.hostModel);
        return Bl(r, t), r;
      }, Bl = function(t, r) {
        A(pL.concat(r.__wrappedMethods || []), function(i) {
          r.hasOwnProperty(i) && (t[i] = r[i]);
        }), t.__wrappedMethods = r.__wrappedMethods, A(gL, function(i) {
          t[i] = tt(r[i]);
        }), t._calculationInfo = P({}, r._calculationInfo);
      }, Nl = function(t, r) {
        var i = t._nameList, n = t._idList, a = t._nameDimIdx, o = t._idDimIdx, s = i[r], l = n[r];
        if (s == null && a != null && (i[r] = s = Tn(t, a, r)), l == null && o != null && (n[r] = l = Tn(t, o, r)), l == null && s != null) {
          var u = t._nameRepeatCount, c = u[s] = (u[s] || 0) + 1;
          l = s, c > 1 && (l += "__ec__" + c), n[r] = l;
        }
      };
    })(), e;
  })()
);
function yL(e, t) {
  qc(e) || (e = Gg(e)), t = t || {};
  var r = t.coordDimensions || [], i = t.dimensionsDefine || e.dimensionsDefine || [], n = et(), a = [], o = _L(e, r, i, t.dimensionsCount), s = t.canOmitUnusedDimensions && Gm(o), l = i === e.dimensionsDefine, u = l ? Wm(e) : Hm(i), c = t.encodeDefine;
  !c && t.encodeDefaulter && (c = t.encodeDefaulter(e, o));
  for (var h = et(c), v = new jg(o), f = 0; f < v.length; f++)
    v[f] = -1;
  function d(x) {
    var M = v[x];
    if (M < 0) {
      var D = i[x], I = H(D) ? D : {
        name: D
      }, k = new _o(), L = I.name;
      L != null && u.get(L) != null && (k.name = k.displayName = L), I.type != null && (k.type = I.type), I.displayName != null && (k.displayName = I.displayName);
      var B = a.length;
      return v[x] = B, k.storeDimIndex = x, a.push(k), k;
    }
    return a[M];
  }
  if (!s)
    for (var f = 0; f < o; f++)
      d(f);
  h.each(function(x, M) {
    var D = Xt(x).slice();
    if (D.length === 1 && !X(D[0]) && D[0] < 0) {
      h.set(M, !1);
      return;
    }
    var I = h.set(M, []);
    A(D, function(k, L) {
      var B = X(k) ? u.get(k) : k;
      B != null && B < o && (I[L] = B, p(d(B), M, L));
    });
  });
  var g = 0;
  A(r, function(x) {
    var M, D, I, k;
    if (X(x))
      M = x, k = {};
    else {
      k = x, M = k.name;
      var L = k.ordinalMeta;
      k.ordinalMeta = null, k = P({}, k), k.ordinalMeta = L, D = k.dimsDef, I = k.otherDims, k.name = k.coordDim = k.coordDimIndex = k.dimsDef = k.otherDims = null;
    }
    var B = h.get(M);
    if (B !== !1) {
      if (B = Xt(B), !B.length)
        for (var N = 0; N < (D && D.length || 1); N++) {
          for (; g < o && d(g).coordDim != null; )
            g++;
          g < o && B.push(g++);
        }
      A(B, function(q, U) {
        var z = d(q);
        if (l && k.type != null && (z.type = k.type), p(wt(z, k), M, U), z.name == null && D) {
          var V = D[U];
          !H(V) && (V = {
            name: V
          }), z.name = z.displayName = V.name, z.defaultTooltip = V.defaultTooltip;
        }
        I && wt(z.otherDims, I);
      });
    }
  });
  function p(x, M, D) {
    zp.get(M) != null ? x.otherDims[M] = D : (x.coordDim = M, x.coordDimIndex = D, n.set(M, !0));
  }
  var m = t.generateCoord, y = t.generateCoordCount, _ = y != null;
  y = m ? y || 1 : 0;
  var w = m || "value";
  function b(x) {
    x.name == null && (x.name = x.coordDim);
  }
  if (s)
    A(a, function(x) {
      b(x);
    }), a.sort(function(x, M) {
      return x.storeDimIndex - M.storeDimIndex;
    });
  else
    for (var S = 0; S < o; S++) {
      var T = d(S), C = T.coordDim;
      C == null && (T.coordDim = wL(w, n, _), T.coordDimIndex = 0, (!m || y <= 0) && (T.isExtraCoord = !0), y--), b(T), T.type == null && (zg(e, S) === Pt.Must || T.isExtraCoord && (T.otherDims.itemName != null || T.otherDims.seriesName != null)) && (T.type = "ordinal");
    }
  return ZT(a, function(x) {
    return x.name;
  }, function(x, M) {
    M > 0 && (x.name = x.name + (M - 1));
  }), new Vm({
    source: e,
    dimensions: a,
    fullDimensionCount: o,
    dimensionOmitted: s
  });
}
function _L(e, t, r, i) {
  var n = Math.max(e.dimensionsDetectedCount || 1, t.length, r.length, i || 0);
  return A(t, function(a) {
    var o;
    H(a) && (o = a.dimsDef) && (n = Math.max(n, o.length));
  }), n;
}
function wL(e, t, r) {
  if (r || t.hasKey(e)) {
    for (var i = 0; t.hasKey(e + i); )
      i++;
    e += i;
  }
  return t.set(e, !0), e;
}
var bL = 0, SL = 1, xL = {
  needTransform: 1,
  normalize: 1,
  scale: 1,
  transformIn: 1,
  transformOut: 1,
  contain: 1,
  getExtent: 1,
  getExtentUnsafe: 1,
  setExtent: 1,
  setExtent2: 1,
  getFilter: 1,
  sanitize: 1,
  getDefaultStartValue: 1,
  freeze: 1
};
yt(xL);
var TL = 3;
function CL(e, t) {
  return e.getExtentUnsafe(SL, t) || e.getExtentUnsafe(bL, t);
}
function AL(e) {
  var t = CL(e, TL);
  return t[1] - t[0];
}
function ML(e) {
  return e.type === "time";
}
function Ss(e) {
  return e.type === "ordinal";
}
st();
function Ym(e, t) {
  var r = e.scale;
  return Ss(r) ? r.getLabel(t) : t.value;
}
function DL(e) {
  var t = e.get("interval");
  return t ?? "auto";
}
function kL(e) {
  return e.type === "category" && DL(e.getLabelModel()) === 0;
}
function Qo(e) {
  return e === "middle" || e === "center";
}
function Xm(e, t) {
  return Ss(e) ? e.getRawOrdinalNumber(t.value) : t.value;
}
var qm = st(), LL = -2;
st();
function IL(e, t) {
  var r = e.model, i = qm(mm(r.ecModel)).keyed, n = i && i.get(t);
  return n && n.get(r.uid);
}
function EL(e, t) {
  return Zm(IL(e, t));
}
function PL(e, t) {
  var r = [];
  return RL(e.model.ecModel, function(i) {
    for (var n = 0; n < t.length; n++)
      t[n] && i.serByIdx[t[n].seriesIndex] && r.push(Zm(i));
  }), r;
}
function RL(e, t) {
  var r = qm(mm(e)).keyed;
  r && r.each(function(i, n) {
    i.each(function(a, o) {
      t(a, n, o);
    });
  });
}
function Zm(e) {
  return {
    liPosMinGap: e ? e.liPosMinGap : void 0
  };
}
et();
var ad = [], OL = {
  registerPreprocessor: Fm,
  registerProcessor: Um,
  registerPostInit: tL,
  registerPostUpdate: eL,
  registerUpdateLifecycle: th,
  registerAction: cn,
  registerCoordinateSystem: rL,
  registerLayout: iL,
  registerVisual: bi,
  registerTransform: aL,
  registerLoading: zm,
  registerMap: nL,
  registerImpl: ik,
  PRIORITY: qk,
  ComponentModel: ct,
  ComponentView: Ir,
  SeriesModel: Lr,
  ChartView: Ar,
  // TODO Use ComponentModel and SeriesModel instead of Constructor
  registerComponentModel: function(e) {
    ct.registerClass(e);
  },
  registerComponentView: function(e) {
    Ir.registerClass(e);
  },
  registerSeriesModel: function(e) {
    Lr.registerClass(e);
  },
  registerChartView: function(e) {
    Ar.registerClass(e);
  },
  registerCustomSeries: function(e, t) {
  },
  registerSubTypeDefaulter: function(e, t) {
    ct.registerSubTypeDefaulter(e, t);
  },
  registerPainter: function(e, t) {
    vT(e, t);
  }
};
function ih(e) {
  if (F(e)) {
    A(e, function(t) {
      ih(t);
    });
    return;
  }
  dt(ad, e) >= 0 || (ad.push(e), at(e) && (e = {
    install: e
  }), e.install(OL));
}
st();
st();
var od = {
  estimate: 1,
  determine: 2
};
function BL(e) {
  return {
    out: {
      noPxChangeTryDetermine: []
    },
    kind: e
  };
}
var NL = 0.8;
function Qm(e, t) {
  t = t || {};
  var r = {
    w: NaN,
    w2: NaN
  }, i = e.scale, n = t.fromStat, a = t.min, o = AL(i);
  an(o) || (o = NaN);
  var s = e.getExtent(), l = Ne(s[1] - s[0]);
  return Ss(i) ? FL(r, e, o, l) : n && UL(r, e, o, l, n), a != null && (r.w = an(r.w) ? It(a, r.w) : a), r;
}
function FL(e, t, r, i) {
  var n = t.onBand, a = r + (n ? 1 : 0);
  a === 0 && (a = 1), e.w = i / a, !n && r && i && (e.w2 = e.w * r / i);
}
function UL(e, t, r, i, n) {
  var a = !1, o = -1 / 0;
  A(n.key ? [EL(t, n.key)] : PL(t, n.sers || []), function(s) {
    var l = s.liPosMinGap;
    l != null && (l > 0 ? (l > o && (o = l), a = !1) : l === LL && (a = !0));
  }), an(r) && r > 0 && an(o) ? (e.w = i / r * o, e.w2 = o) : a && (e.w = i * NL, e.w2 = e.w * r / i);
}
function Km(e, t, r, i, n, a, o, s) {
  var l = n - e, u = a - t, c = r - e, h = i - t, v = Math.sqrt(c * c + h * h);
  c /= v, h /= v;
  var f = l * c + u * h, d = f / v;
  d *= v;
  var g = o[0] = e + d * c, p = o[1] = t + d * h;
  return Math.sqrt((g - n) * (g - n) + (p - a) * (p - a));
}
var br = new Z(), gt = new Z(), Rt = new Z(), Sr = new Z(), Oe = new Z(), Ko = [], Wt = new Z();
function zL(e, t) {
  if (t <= 180 && t > 0) {
    t = t / 180 * Math.PI, br.fromArray(e[0]), gt.fromArray(e[1]), Rt.fromArray(e[2]), Z.sub(Sr, br, gt), Z.sub(Oe, Rt, gt);
    var r = Sr.len(), i = Oe.len();
    if (!(r < 1e-3 || i < 1e-3)) {
      Sr.scale(1 / r), Oe.scale(1 / i);
      var n = Sr.dot(Oe), a = Math.cos(t);
      if (a < n) {
        var o = Km(gt.x, gt.y, Rt.x, Rt.y, br.x, br.y, Ko);
        Wt.fromArray(Ko), Wt.scaleAndAdd(Oe, o / Math.tan(Math.PI - t));
        var s = Rt.x !== gt.x ? (Wt.x - gt.x) / (Rt.x - gt.x) : (Wt.y - gt.y) / (Rt.y - gt.y);
        if (isNaN(s))
          return;
        s < 0 ? Z.copy(Wt, gt) : s > 1 && Z.copy(Wt, Rt), Wt.toArray(e[1]);
      }
    }
  }
}
function VL(e, t, r) {
  if (r <= 180 && r > 0) {
    r = r / 180 * Math.PI, br.fromArray(e[0]), gt.fromArray(e[1]), Rt.fromArray(e[2]), Z.sub(Sr, gt, br), Z.sub(Oe, Rt, gt);
    var i = Sr.len(), n = Oe.len();
    if (!(i < 1e-3 || n < 1e-3)) {
      Sr.scale(1 / i), Oe.scale(1 / n);
      var a = Sr.dot(t), o = Math.cos(r);
      if (a < o) {
        var s = Km(gt.x, gt.y, Rt.x, Rt.y, br.x, br.y, Ko);
        Wt.fromArray(Ko);
        var l = Math.PI / 2, u = Math.acos(Oe.dot(t)), c = l + u - r;
        if (c >= l)
          Z.copy(Wt, Rt);
        else {
          Wt.scaleAndAdd(Oe, s / Math.tan(Math.PI / 2 - c));
          var h = Rt.x !== gt.x ? (Wt.x - gt.x) / (Rt.x - gt.x) : (Wt.y - gt.y) / (Rt.y - gt.y);
          if (isNaN(h))
            return;
          h < 0 ? Z.copy(Wt, gt) : h > 1 && Z.copy(Wt, Rt);
        }
        Wt.toArray(e[1]);
      }
    }
  }
}
function Fl(e, t, r, i) {
  var n = r === "normal", a = n ? e : e.ensureState(r);
  a.ignore = t;
  var o = i.get("smooth");
  o = o === !0 ? 0.3 : Math.max(+o, 0) || 0, a.shape = a.shape || {}, a.shape.smooth = o;
  var s = i.getModel("lineStyle").getLineStyle();
  n ? e.useStyle(s) : a.style = s;
}
function HL(e, t) {
  var r = t.smooth, i = t.points;
  if (i)
    if (e.moveTo(i[0][0], i[0][1]), r > 0 && i.length >= 3) {
      var n = $l(i[0], i[1]), a = $l(i[1], i[2]);
      if (!n || !a) {
        e.lineTo(i[1][0], i[1][1]), e.lineTo(i[2][0], i[2][1]);
        return;
      }
      var o = Math.min(n, a) * r, s = Ls([], i[1], i[0], o / n), l = Ls([], i[1], i[2], o / a), u = Ls([], s, l, 0.5);
      e.bezierCurveTo(s[0], s[1], s[0], s[1], u[0], u[1]), e.bezierCurveTo(l[0], l[1], l[0], l[1], i[2][0], i[2][1]);
    } else
      for (var c = 1; c < i.length; c++)
        e.lineTo(i[c][0], i[c][1]);
}
function WL(e, t, r) {
  var i = e.getTextGuideLine(), n = e.getTextContent();
  if (!n) {
    i && e.removeTextGuideLine();
    return;
  }
  for (var a = t.normal, o = a.get("show"), s = n.ignore, l = 0; l < Bo.length; l++) {
    var u = Bo[l], c = t[u], h = u === "normal";
    if (c) {
      var v = c.get("show"), f = h ? s : W(n.states[u] && n.states[u].ignore, s);
      if (f || !W(v, o)) {
        var d = h ? i : i && i.states[u];
        d && (d.ignore = !0), i && Fl(i, !0, u, c);
        continue;
      }
      i || (i = new _a(), e.setTextGuideLine(i), !h && (s || !o) && Fl(i, !0, "normal", t.normal), e.stateProxy && (i.stateProxy = e.stateProxy)), Fl(i, !1, u, c);
    }
  }
  if (i) {
    wt(i.style, r), i.style.fill = null;
    var g = a.get("showAbove"), p = e.textGuideLineConfig = e.textGuideLineConfig || {};
    p.showAbove = g || !1, i.buildPath = HL;
  }
}
function GL(e, t) {
  t = t || "labelLine";
  for (var r = {
    normal: e.getModel(t)
  }, i = 0; i < Ze.length; i++) {
    var n = Ze[i];
    r[n] = e.getModel([n, t]);
  }
  return r;
}
var sd = ["label", "labelLine", "layoutOption", "priority", "defaultAttr", "marginForce", "minMarginForce", "marginDefault", "suggestIgnore"], YL = 1, Jo = 2, Jm = YL | Jo;
function jo(e, t, r) {
  r = r || Jm, t ? e.dirty |= r : e.dirty &= ~r;
}
function jm(e, t) {
  return t = t || Jm, e.dirty == null || !!(e.dirty & t);
}
function Qe(e) {
  if (e)
    return jm(e) && $m(e, e.label, e), e;
}
function $m(e, t, r) {
  var i = t.getComputedTransform();
  e.transform = Vc(e.transform, i);
  var n = e.localRect = ra(e.localRect, t.getBoundingRect()), a = t.style, o = a.margin, s = r && r.marginForce, l = r && r.minMarginForce, u = r && r.marginDefault, c = a.__marginType;
  c == null && u && (o = u, c = Xi.textMargin);
  for (var h = 0; h < 4; h++)
    Ul[h] = c === Xi.minMargin && l && l[h] != null ? l[h] : s && s[h] != null ? s[h] : o ? o[h] : 0;
  c === Xi.textMargin && Iu(n, Ul, !1, !1);
  var v = e.rect = ra(e.rect, n);
  return i && v.applyTransform(i), c === Xi.minMargin && Iu(v, Ul, !1, !1), e.axisAligned = zc(i), (e.label = e.label || {}).ignore = t.ignore, jo(e, !1), jo(e, !0, Jo), e;
}
var Ul = [0, 0, 0, 0];
function XL(e, t, r) {
  return e.transform = Vc(e.transform, r), e.localRect = ra(e.localRect, t), e.rect = ra(e.rect, t), r && e.rect.applyTransform(r), e.axisAligned = zc(r), e.obb = void 0, (e.label = e.label || {}).ignore = !1, e;
}
function qL(e, t) {
  if (e) {
    e.label.x += t.x, e.label.y += t.y, e.label.markRedraw();
    var r = e.transform;
    r && (r[4] += t.x, r[5] += t.y);
    var i = e.rect;
    i && (i.x += t.x, i.y += t.y);
    var n = e.obb;
    n && n.fromBoundingRect(e.localRect, r);
  }
}
function ld(e, t) {
  for (var r = 0; r < sd.length; r++) {
    var i = sd[r];
    e[i] == null && (e[i] = t[i]);
  }
  return Qe(e);
}
function ud(e) {
  var t = e.obb;
  return (!t || jm(e, Jo)) && (e.obb = t = t || new og(), t.fromBoundingRect(e.localRect, e.transform), jo(e, !1, Jo)), t;
}
function ZL(e, t, r, i, n) {
  var a = e.length, o = cg[t], s = hg[t];
  if (a < 2)
    return !1;
  e.sort(function(T, C) {
    return T.rect[o] - C.rect[o];
  });
  for (var l = 0, u, c = !1, h = 0; h < a; h++) {
    var v = e[h], f = v.rect;
    u = f[o] - l, u < 0 && (f[o] -= u, v.label[o] -= u, c = !0), l = f[o] + f[s];
  }
  var d = e[0], g = e[a - 1], p, m;
  y(), p < 0 && b(-p, 0.8), m < 0 && b(m, 0.8), y(), _(p, m, 1), _(m, p, -1), y(), p < 0 && S(-p), m < 0 && S(m);
  function y() {
    p = d.rect[o] - r, m = i - g.rect[o] - g.rect[s];
  }
  function _(T, C, x) {
    if (T < 0) {
      var M = Math.min(C, -T);
      if (M > 0) {
        w(M * x, 0, a);
        var D = M + T;
        D < 0 && b(-D * x, 1);
      } else
        b(-T * x, 1);
    }
  }
  function w(T, C, x) {
    T !== 0 && (c = !0);
    for (var M = C; M < x; M++) {
      var D = e[M], I = D.rect;
      I[o] += T, D.label[o] += T;
    }
  }
  function b(T, C) {
    for (var x = [], M = 0, D = 1; D < a; D++) {
      var I = e[D - 1].rect, k = Math.max(e[D].rect[o] - I[o] - I[s], 0);
      x.push(k), M += k;
    }
    if (M) {
      var L = Math.min(Math.abs(T) / M, C);
      if (T > 0)
        for (var D = 0; D < a - 1; D++) {
          var B = x[D] * L;
          w(B, 0, D + 1);
        }
      else
        for (var D = a - 1; D > 0; D--) {
          var B = x[D - 1] * L;
          w(-B, D, a);
        }
    }
  }
  function S(T) {
    var C = T < 0 ? -1 : 1;
    T = Math.abs(T);
    for (var x = Math.ceil(T / (a - 1)), M = 0; M < a - 1; M++)
      if (C > 0 ? w(x, 0, M + 1) : w(-x, a - M - 1, a), T -= x, T <= 0)
        return;
  }
  return c;
}
function QL(e) {
  var t = [];
  e.sort(function(u, c) {
    return (c.suggestIgnore ? 1 : 0) - (u.suggestIgnore ? 1 : 0) || c.priority - u.priority;
  });
  function r(u) {
    if (!u.ignore) {
      var c = u.ensureState("emphasis");
      c.ignore == null && (c.ignore = !1);
    }
    u.ignore = !0;
  }
  for (var i = 0; i < e.length; i++) {
    var n = Qe(e[i]);
    if (!n.label.ignore) {
      for (var a = n.label, o = n.labelLine, s = !1, l = 0; l < t.length; l++)
        if (nh(n, t[l], null, {
          touchThreshold: 0.05
        })) {
          s = !0;
          break;
        }
      s ? (r(a), o && r(o)) : t.push(n);
    }
  }
}
function nh(e, t, r, i) {
  return !e || !t || e.label && e.label.ignore || t.label && t.label.ignore || !e.rect.intersect(t.rect, r, i) ? !1 : e.axisAligned && t.axisAligned ? !0 : ud(e).intersect(ud(t), r, i);
}
var KL = null;
function ty() {
  return KL;
}
var JL = "expandAxisBreak", xr = Math.PI, jL = [[1, 2, 1, 2], [5, 3, 5, 3], [8, 3, 8, 3]], $L = [[0, 1, 0, 1], [0, 3, 0, 3], [0, 3, 0, 3]], sn = st(), ey = st(), tI = (
  /** @class */
  (function() {
    function e(t) {
      this.recordMap = {}, this.resolveAxisNameOverlap = t;
    }
    return e.prototype.ensureRecord = function(t) {
      var r = t.axis.dim, i = t.componentIndex, n = this.recordMap, a = n[r] || (n[r] = []);
      return a[i] || (a[i] = {
        ready: {}
      });
    }, e;
  })()
);
function eI(e, t, r, i) {
  var n = r.axis, a = t.ensureRecord(r), o = [], s, l = ah(e.axisName) && Qo(e.nameLocation);
  A(i, function(d) {
    var g = Qe(d);
    if (!(!g || g.label.ignore)) {
      o.push(g);
      var p = a.transGroup;
      l && (p.transform ? as(Mn, p.transform) : va(Mn), g.transform && Un(Mn, Mn, g.transform), Y.copy($a, g.localRect), $a.applyTransform(Mn), s ? s.union($a) : Y.copy(s = new Y(0, 0, 0, 0), $a));
    }
  });
  var u = Math.abs(a.dirVec.x) > 0.1 ? "x" : "y", c = a.transGroup[u];
  if (o.sort(function(d, g) {
    return Math.abs(d.label[u] - c) - Math.abs(g.label[u] - c);
  }), l && s) {
    var h = n.getExtent(), v = Math.min(h[0], h[1]), f = Math.max(h[0], h[1]) - v;
    s.union(new Y(v, 0, f, 1));
  }
  a.stOccupiedRect = s, a.labelInfoList = o;
}
var Mn = He(), $a = new Y(0, 0, 0, 0), rI = function(e, t, r, i, n, a) {
  if (Qo(e.nameLocation)) {
    var o = a.stOccupiedRect;
    o && ry(XL({}, o, a.transGroup.transform), i, n);
  } else
    iI(a.labelInfoList, a.dirVec, i, n);
};
function ry(e, t, r) {
  var i = new Z();
  nh(e, t, i, {
    direction: Math.atan2(r.y, r.x),
    bidirectional: !1,
    touchThreshold: 0.05
  }) && qL(t, i);
}
function iI(e, t, r, i) {
  for (var n = Z.dot(i, t) >= 0, a = 0, o = e.length; a < o; a++) {
    var s = e[n ? a : o - 1 - a];
    s.label.ignore || ry(s, r, i);
  }
}
var gi = (
  /** @class */
  (function() {
    function e(t, r, i, n) {
      this.group = new qe(), this._axisModel = t, this._api = r, this._local = {}, this._shared = n || new tI(rI), this._resetCfgDetermined(i);
    }
    return e.prototype.updateCfg = function(t) {
      var r = this._cfg.raw;
      r.position = t.position, r.labelOffset = t.labelOffset, this._resetCfgDetermined(r);
    }, e.prototype.__getRawCfg = function() {
      return this._cfg.raw;
    }, e.prototype._resetCfgDetermined = function(t) {
      var r = this._axisModel, i = r.getDefaultOption ? r.getDefaultOption() : {}, n = W(t.axisName, r.get("name")), a = r.get("nameMoveOverlap");
      (a == null || a === "auto") && (a = W(t.defaultNameMoveOverlap, !0));
      var o = {
        raw: t,
        position: t.position,
        rotation: t.rotation,
        nameDirection: W(t.nameDirection, 1),
        tickDirection: W(t.tickDirection, 1),
        labelDirection: W(t.labelDirection, 1),
        labelOffset: W(t.labelOffset, 0),
        silent: W(t.silent, !0),
        axisName: n,
        nameLocation: ci(r.get("nameLocation"), i.nameLocation, "end"),
        shouldNameMoveOverlap: ah(n) && a,
        optionHideOverlap: r.get(["axisLabel", "hideOverlap"]),
        showMinorTicks: r.get(["minorTick", "show"])
      };
      this._cfg = o;
      var s = new qe({
        x: o.position[0],
        y: o.position[1],
        rotation: o.rotation
      });
      s.updateTransform(), this._transformGroup = s;
      var l = this._shared.ensureRecord(r);
      l.transGroup = this._transformGroup, l.dirVec = new Z(Math.cos(-o.rotation), Math.sin(-o.rotation));
    }, e.prototype.build = function(t, r) {
      var i = this;
      return t || (t = {
        axisLine: !0,
        axisTickLabelEstimate: !1,
        axisTickLabelDetermine: !0,
        axisName: !0
      }), A(nI, function(n) {
        t[n] && aI[n](i._cfg, i._local, i._shared, i._axisModel, i.group, i._transformGroup, i._api, r || {});
      }), this;
    }, e.innerTextLayout = function(t, r, i) {
      var n = yp(r - t), a, o;
      return Po(n) ? (o = i > 0 ? "top" : "bottom", a = "center") : Po(n - xr) ? (o = i > 0 ? "bottom" : "top", a = "center") : (o = "middle", n > 0 && n < xr ? a = i > 0 ? "right" : "left" : a = i > 0 ? "left" : "right"), {
        rotation: n,
        textAlign: a,
        textVerticalAlign: o
      };
    }, e.makeAxisEventDataBase = function(t) {
      var r = {
        componentType: t.mainType,
        componentIndex: t.componentIndex
      };
      return r[t.mainType + "Index"] = t.componentIndex, r;
    }, e.isLabelSilent = function(t) {
      var r = t.get("tooltip");
      return t.get("silent") || !(t.get("triggerEvent") || r && r.show);
    }, e;
  })()
), nI = ["axisLine", "axisTickLabelEstimate", "axisTickLabelDetermine", "axisName"], aI = {
  axisLine: function(e, t, r, i, n, a, o) {
    var s = i.get(["axisLine", "show"]);
    if (s === "auto" && (s = !0, e.raw.axisLineAutoShow != null && (s = !!e.raw.axisLineAutoShow)), !!s) {
      var l = i.axis.getExtent(), u = a.transform, c = [l[0], 0], h = [l[1], 0], v = c[0] > h[0];
      u && (Ve(c, c, u), Ve(h, h, u));
      var f = P({
        lineCap: "round"
      }, i.getModel(["axisLine", "lineStyle"]).getLineStyle()), d = {
        strokeContainThreshold: e.raw.strokeContainThreshold || 5,
        silent: !0,
        z2: 1,
        style: f
      };
      if (i.get(["axisLine", "breakLine"]) && XM(i.axis.scale))
        ty().buildAxisBreakLine(i, n, a, d);
      else {
        var g = new un(P({
          shape: {
            x1: c[0],
            y1: c[1],
            x2: h[0],
            y2: h[1]
          }
        }, d));
        Nc(g.shape, g.style.lineWidth), g.anid = "line", n.add(g);
      }
      var p = i.get(["axisLine", "symbol"]);
      if (p != null) {
        var m = i.get(["axisLine", "symbolSize"]);
        X(p) && (p = [p, p]), (X(m) || _t(m)) && (m = [m, m]);
        var y = yk(i.get(["axisLine", "symbolOffset"]) || 0, m), _ = m[0], w = m[1];
        A([{
          rotate: e.rotation + Math.PI / 2,
          offset: y[0],
          r: 0
        }, {
          rotate: e.rotation - Math.PI / 2,
          offset: y[1],
          r: Math.sqrt((c[0] - h[0]) * (c[0] - h[0]) + (c[1] - h[1]) * (c[1] - h[1]))
        }], function(b, S) {
          if (p[S] !== "none" && p[S] != null) {
            var T = ym(p[S], -_ / 2, -w / 2, _, w, f.stroke, !0), C = b.r + b.offset, x = v ? h : c;
            T.attr({
              rotation: b.rotate,
              x: x[0] + C * Math.cos(e.rotation),
              y: x[1] - C * Math.sin(e.rotation),
              silent: !0,
              z2: 11
            }), n.add(T);
          }
        });
      }
    }
  },
  /**
   * [CAUTION] This method can be called multiple times, following the change due to `resetCfg` called
   *  in size measurement. Thus this method should be idempotent, and should be performant.
   */
  axisTickLabelEstimate: function(e, t, r, i, n, a, o, s) {
    var l = hd(t, n, s);
    l && cd(e, t, r, i, n, a, o, od.estimate);
  },
  /**
   * Finish axis tick label build.
   * Can be only called once.
   */
  axisTickLabelDetermine: function(e, t, r, i, n, a, o, s) {
    var l = hd(t, n, s);
    l && cd(e, t, r, i, n, a, o, od.determine);
    var u = uI(e, n, a, i);
    lI(e, t.labelLayoutList, u), cI(e, n, a, i, e.tickDirection);
  },
  /**
   * [CAUTION] This method can be called multiple times, following the change due to `resetCfg` called
   *  in size measurement. Thus this method should be idempotent, and should be performant.
   */
  axisName: function(e, t, r, i, n, a, o, s) {
    var l = r.ensureRecord(i);
    t.nameEl && (n.remove(t.nameEl), t.nameEl = l.nameLayout = l.nameLocation = null);
    var u = e.axisName;
    if (ah(u)) {
      var c = e.nameLocation, h = e.nameDirection, v = i.getModel("nameTextStyle"), f = i.get("nameGap") || 0, d = i.axis.getExtent(), g = i.axis.inverse ? -1 : 1, p = new Z(0, 0), m = new Z(0, 0);
      c === "start" ? (p.x = d[0] - g * f, m.x = -g) : c === "end" ? (p.x = d[1] + g * f, m.x = g) : (p.x = (d[0] + d[1]) / 2, p.y = e.labelOffset + h * f, m.y = h);
      var y = He();
      m.transform(gc(y, y, e.rotation));
      var _ = i.get("nameRotate");
      _ != null && (_ = _ * xr / 180);
      var w, b;
      Qo(c) ? w = gi.innerTextLayout(
        e.rotation,
        _ ?? e.rotation,
        // Adapt to axis.
        h
      ) : (w = oI(e.rotation, c, _ || 0, d), b = e.raw.axisNameAvailableWidth, b != null && (b = Math.abs(b / Math.sin(w.rotation)), !isFinite(b) && (b = null)));
      var S = v.getFont(), T = i.get("nameTruncate", !0) || {}, C = T.ellipsis, x = To(e.raw.nameTruncateMaxWidth, T.maxWidth, b), M = s.nameMarginLevel || 0, D = new xe({
        x: p.x,
        y: p.y,
        rotation: w.rotation,
        silent: gi.isLabelSilent(i),
        style: ia(v, {
          text: u,
          font: S,
          overflow: "truncate",
          width: x,
          ellipsis: C,
          fill: v.getTextColor() || i.get(["axisLine", "lineStyle", "color"]),
          align: v.get("align") || w.textAlign,
          verticalAlign: v.get("verticalAlign") || w.textVerticalAlign
        }),
        z2: 1
      });
      if (Uc({
        el: D,
        componentModel: i,
        itemName: u
      }), D.__fullText = u, D.anid = "name", i.get("triggerEvent")) {
        var I = gi.makeAxisEventDataBase(i);
        I.targetType = "axisName", I.name = u, xt(D).eventData = I;
      }
      a.add(D), D.updateTransform(), t.nameEl = D;
      var k = l.nameLayout = Qe({
        label: D,
        priority: D.z2,
        defaultAttr: {
          ignore: D.ignore
        },
        marginDefault: Qo(c) ? jL[M] : $L[M]
      });
      if (l.nameLocation = c, n.add(D), D.decomposeTransform(), e.shouldNameMoveOverlap && k) {
        var L = r.ensureRecord(i);
        r.resolveAxisNameOverlap(e, r, i, k, m, L);
      }
    }
  }
};
function cd(e, t, r, i, n, a, o, s) {
  ny(t) || hI(e, t, n, s, i, o);
  var l = t.labelLayoutList;
  fI(e, i, l, a), pI(i, e.rotation, l);
  var u = e.optionHideOverlap;
  sI(i, l, u), u && QL(
    // Filter the already ignored labels by the previous overlap resolving methods.
    de(l, function(c) {
      return c && !c.label.ignore;
    })
  ), eI(e, r, i, l);
}
function oI(e, t, r, i) {
  var n = yp(r - e), a, o, s = i[0] > i[1], l = t === "start" && !s || t !== "start" && s;
  return Po(n - xr / 2) ? (o = l ? "bottom" : "top", a = "center") : Po(n - xr * 1.5) ? (o = l ? "top" : "bottom", a = "center") : (o = "middle", n < xr * 1.5 && n > xr / 2 ? a = l ? "left" : "right" : a = l ? "right" : "left"), {
    rotation: n,
    textAlign: a,
    textVerticalAlign: o
  };
}
function sI(e, t, r) {
  var i = e.axis, n = e.get(["axisLabel", "customValues"]);
  if (kL(i))
    return;
  function a(u, c, h) {
    var v = Qe(t[c]), f = Qe(t[h]), d = i.scale;
    if (!(!v || !f)) {
      if (u == null) {
        if (!r && n)
          return;
        var g = sn(v.label).labelInfo.tick;
        if (
          // TimeScale does not expand extent to "nice", so eliminate labels that are not nice.
          ML(d) && g.notNice || Ss(d) && g.offInterval
        ) {
          zi(v.label);
          return;
        }
      }
      if (u === !1 || v.suggestIgnore) {
        zi(v.label);
        return;
      }
      if (f.suggestIgnore) {
        zi(f.label);
        return;
      }
      var p = 0.1;
      if (!r) {
        var m = [0, 0, 0, 0];
        v = ld({
          marginForce: m
        }, v), f = ld({
          marginForce: m
        }, f);
      }
      nh(v, f, null, {
        touchThreshold: p
      }) && zi(u ? f.label : v.label);
    }
  }
  var o = e.get(["axisLabel", "showMinLabel"]), s = e.get(["axisLabel", "showMaxLabel"]), l = t.length;
  a(o, 0, 1), a(s, l - 1, l - 2);
}
function lI(e, t, r) {
  e.showMinorTicks || A(t, function(i) {
    if (i && i.label.ignore)
      for (var n = 0; n < r.length; n++) {
        var a = r[n], o = ey(a), s = sn(i.label);
        if (o.tickValue != null && !o.onBand && o.tickValue === s.labelInfo.tick.value) {
          zi(a);
          return;
        }
      }
  });
}
function zi(e) {
  e && (e.ignore = !0);
}
function iy(e, t, r, i, n) {
  for (var a = [], o = [], s = [], l = 0; l < e.length; l++) {
    var u = e[l].coord;
    o[0] = u, o[1] = 0, s[0] = u, s[1] = r, t && (Ve(o, o, t), Ve(s, s, t));
    var c = new un({
      shape: {
        x1: o[0],
        y1: o[1],
        x2: s[0],
        y2: s[1]
      },
      style: i,
      z2: 2,
      autoBatch: !0,
      silent: !0
    });
    Nc(c.shape, c.style.lineWidth), c.anid = n + "_" + e[l].tickValue, a.push(c);
    var h = ey(c);
    h.onBand = !!e[l].onBand, h.tickValue = e[l].tickValue;
  }
  return a;
}
function uI(e, t, r, i) {
  var n = i.axis, a = i.getModel("axisTick"), o = a.get("show");
  if (o === "auto" && (o = !0, e.raw.axisTickAutoShow != null && (o = !!e.raw.axisTickAutoShow)), !o || n.scale.isBlank())
    return [];
  for (var s = a.getModel("lineStyle"), l = e.tickDirection * a.get("length"), u = n.getTicksCoords(), c = iy(u, r.transform, l, wt(s.getLineStyle(), {
    stroke: i.get(["axisLine", "lineStyle", "color"])
  }), "ticks"), h = 0; h < c.length; h++)
    t.add(c[h]);
  return c;
}
function cI(e, t, r, i, n) {
  var a = i.axis, o = i.getModel("minorTick");
  if (!(!e.showMinorTicks || a.scale.isBlank())) {
    var s = a.getMinorTicksCoords();
    if (s.length)
      for (var l = o.getModel("lineStyle"), u = n * o.get("length"), c = wt(l.getLineStyle(), wt(i.getModel("axisTick").getLineStyle(), {
        stroke: i.get(["axisLine", "lineStyle", "color"])
      })), h = 0; h < s.length; h++)
        for (var v = iy(s[h], r.transform, u, c, "minorticks_" + h), f = 0; f < v.length; f++)
          t.add(v[f]);
  }
}
function hd(e, t, r) {
  if (ny(e)) {
    var i = e.axisLabelsCreationContext, n = i.out.noPxChangeTryDetermine;
    if (r.noPxChange) {
      for (var a = !0, o = 0; o < n.length; o++)
        a = a && n[o]();
      if (a)
        return !1;
    }
    n.length && (t.remove(e.labelGroup), Ku(e, null, null, null));
  }
  return !0;
}
function hI(e, t, r, i, n, a) {
  var o = n.axis, s = To(e.raw.axisLabelShow, n.get(["axisLabel", "show"])), l = new qe();
  r.add(l);
  var u = BL(i);
  if (!s || o.scale.isBlank()) {
    Ku(t, [], l, u);
    return;
  }
  var c = n.getModel("axisLabel"), h = o.getViewLabels(u), v = (To(e.raw.labelRotate, c.get("rotate")) || 0) * xr / 180, f = gi.innerTextLayout(e.rotation, v, e.labelDirection), d = n.getCategories && n.getCategories(!0), g = [], p = n.get("triggerEvent"), m = 1 / 0, y = -1 / 0;
  A(h, function(w, b) {
    var S, T = w.tick, C = w.formattedLabel, x = w.rawLabel, M = c, D = Xm(o.scale, T);
    if (d && d[D]) {
      var I = d[D];
      H(I) && I.textStyle && (M = new mt(I.textStyle, c, n.ecModel));
    }
    var k = M.getTextColor() || n.get(["axisLine", "lineStyle", "color"]), L = M.getShallow("align", !0) || f.textAlign, B = W(M.getShallow("alignMinLabel", !0), L), N = W(M.getShallow("alignMaxLabel", !0), L), q = M.getShallow("verticalAlign", !0) || M.getShallow("baseline", !0) || f.textVerticalAlign, U = W(M.getShallow("verticalAlignMinLabel", !0), q), z = W(M.getShallow("verticalAlignMaxLabel", !0), q), V = 10 + (((S = T.time) === null || S === void 0 ? void 0 : S.level) || 0);
    m = Math.min(m, V), y = Math.max(y, V);
    var J = new xe({
      // --- transform props start ---
      // All of the transform props MUST not be set here, but should be set in
      // `updateAxisLabelChangableProps`, because they may change in estimation,
      // and need to calculate based on global coord sys by `decomposeTransform`.
      x: 0,
      y: 0,
      rotation: 0,
      // --- transform props end ---
      silent: gi.isLabelSilent(n),
      z2: V,
      style: ia(M, {
        text: C,
        align: b === 0 ? B : b === h.length - 1 ? N : L,
        verticalAlign: b === 0 ? U : b === h.length - 1 ? z : q,
        fill: at(k) ? k(
          // (1) In category axis with data zoom, tick is not the original
          // index of axis.data. So tick should not be exposed to user
          // in category axis.
          // (2) Compatible with previous version, which always use formatted label as
          // input. But in interval scale the formatted label is like '223,445', which
          // maked user replace ','. So we modify it to return original val but remain
          // it as 'string' to avoid error in replacing.
          o.type === "category" ? x : o.type === "value" ? D + "" : D,
          b
        ) : k
      })
    });
    J.anid = "label_" + D;
    var j = sn(J);
    if (j.labelInfo = w, j.layoutRotation = f.rotation, Uc({
      el: J,
      componentModel: n,
      itemName: C,
      formatterParamsExtra: {
        isTruncated: function() {
          return J.isTruncated;
        },
        value: x,
        tickIndex: b
      }
    }), p) {
      var rt = gi.makeAxisEventDataBase(n);
      rt.targetType = "axisLabel", rt.value = x, rt.tickIndex = b;
      var ot = w.tick.break;
      if (ot) {
        var Mt = ot.parsedBreak;
        rt.break = {
          // type: labelItem.break.type,
          start: Mt.vmin,
          end: Mt.vmax
        };
      }
      o.type === "category" && (rt.dataIndex = D), xt(J).eventData = rt, ot && dI(n, a, J, ot);
    }
    g.push(J), l.add(J);
  });
  var _ = it(g, function(w) {
    return {
      label: w,
      priority: sn(w).labelInfo.tick.break ? w.z2 + (y - m + 1) : w.z2,
      defaultAttr: {
        ignore: w.ignore
      }
    };
  });
  Ku(t, _, l, u);
}
function ny(e) {
  return !!e.labelLayoutList;
}
function Ku(e, t, r, i) {
  e.labelLayoutList = t, e.labelGroup = r, e.axisLabelsCreationContext = i;
}
function fI(e, t, r, i) {
  var n = t.get(["axisLabel", "margin"]);
  A(r, function(a, o) {
    var s = Qe(a);
    if (s) {
      var l = s.label, u = sn(l);
      s.suggestIgnore = l.ignore, l.ignore = !1, Eo(er, vI);
      var c = t.axis;
      er.x = c.dataToCoord(Xm(c.scale, u.labelInfo.tick)), er.y = e.labelOffset + e.labelDirection * n, er.rotation = u.layoutRotation, i.add(er), er.updateTransform(), i.remove(er), er.decomposeTransform(), Eo(l, er), l.markRedraw(), jo(s, !0), Qe(s);
    }
  });
}
var er = new oe(), vI = new oe();
function ah(e) {
  return !!e;
}
function dI(e, t, r, i) {
  r.on("click", function(n) {
    var a = {
      type: JL,
      breaks: [{
        start: i.parsedBreak.breakOption.start,
        end: i.parsedBreak.breakOption.end
      }]
    };
    a[e.axis.dim + "AxisIndex"] = e.componentIndex, t.dispatchAction(a);
  });
}
function pI(e, t, r) {
  var i = YM();
  if (i) {
    var n = i.retrieveAxisBreakPairs(r, function(o) {
      return o && sn(o.label).labelInfo.tick.break;
    }, !0), a = e.get(["breakLabelLayout", "moveOverlap"], !0);
    (a === !0 || a === "auto") && A(n, function(o) {
      ty().adjustBreakLabelPair(e.axis.inverse, t, [Qe(r[o[0]]), Qe(r[o[1]])]);
    });
  }
}
function fd(e, t, r) {
  r = r || {};
  var i = t.axis, n = {}, a = i.getAxesOnZeroOf()[0], o = i.position, s = a ? "onZero" : o, l = i.dim, u = [e.x, e.x + e.width, e.y, e.y + e.height], c = {
    left: 0,
    right: 1,
    top: 0,
    bottom: 1,
    onZero: 2
  }, h = t.get("offset") || 0, v = l === "x" ? [u[2] - h, u[3] + h] : [u[0] - h, u[1] + h];
  if (a) {
    var f = a.toGlobalCoord(a.dataToCoord(0));
    v[c.onZero] = Math.max(Math.min(f, v[1]), v[0]);
  }
  n.position = [l === "y" ? v[c[s]] : u[0], l === "x" ? v[c[s]] : u[3]], n.rotation = Math.PI / 2 * (l === "x" ? 0 : 1);
  var d = {
    top: -1,
    bottom: 1,
    left: -1,
    right: 1
  };
  n.labelDirection = n.tickDirection = n.nameDirection = d[o], n.labelOffset = a ? v[c[o]] - v[c.onZero] : 0, t.get(["axisTick", "inside"]) && (n.tickDirection = -n.tickDirection), To(r.labelInside, t.get(["axisLabel", "inside"])) && (n.labelDirection = -n.labelDirection);
  var g = t.get(["axisLabel", "rotate"]);
  return n.labelRotate = s === "top" ? -g : g, n.z2 = 1, n;
}
function to(e, t, r) {
  var i = e.get("borderRadius");
  if (i == null)
    return r ? {
      cornerRadius: 0
    } : null;
  F(i) || (i = [i, i, i, i]);
  var n = Math.abs(t.r || 0 - t.r0 || 0);
  return {
    cornerRadius: it(i, function(a) {
      return nn(a, n);
    })
  };
}
function gI(e) {
  return {
    seriesType: e,
    reset: function(t, r) {
      var i = r.findComponents({
        mainType: "legend"
      });
      if (!(!i || !i.length)) {
        var n = t.getData();
        n.filterSelf(function(a) {
          for (var o = n.getName(a), s = 0; s < i.length; s++)
            if (!i[s].isSelected(o))
              return !1;
          return !0;
        });
      }
    }
  };
}
function mI(e, t, r) {
  t = F(t) && {
    coordDimensions: t
  } || P({
    encodeDefine: e.getEncode()
  }, t);
  var i = e.getSource(), n = yL(i, t).dimensions, a = new mL(n, e);
  return a.initData(i, r), a;
}
var yI = (
  /** @class */
  (function() {
    function e(t, r) {
      this._getDataWithEncodedVisual = t, this._getRawData = r;
    }
    return e.prototype.getAllNames = function() {
      var t = this._getRawData();
      return t.mapArray(t.getName);
    }, e.prototype.containName = function(t) {
      var r = this._getRawData();
      return r.indexOfName(t) >= 0;
    }, e.prototype.indexOfName = function(t) {
      var r = this._getDataWithEncodedVisual();
      return r.indexOfName(t);
    }, e.prototype.getItemVisual = function(t, r) {
      var i = this._getDataWithEncodedVisual();
      return i.getItemVisual(t, r);
    }, e;
  })()
), Mr = "pie", _I = st(), ay = (
  /** @class */
  (function(e) {
    Q(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.prototype.init = function(r) {
      e.prototype.init.apply(this, arguments), this.legendVisualProvider = new yI(ft(this.getData, this), ft(this.getRawData, this)), this._defaultLabelLine(r);
    }, t.prototype.mergeOption = function() {
      e.prototype.mergeOption.apply(this, arguments);
    }, t.prototype.getInitialData = function() {
      return mI(this, {
        coordDimensions: ["value"],
        encodeDefaulter: ae(gD, this)
      });
    }, t.prototype.getDataParams = function(r) {
      var i = this.getData(), n = _I(i), a = n.seats;
      if (!a) {
        var o = [];
        i.each(i.mapDimension("value"), function(l) {
          o.push(l);
        }), a = n.seats = AT(o, i.hostModel.get("percentPrecision"));
      }
      var s = e.prototype.getDataParams.call(this, r);
      return s.percent = a[r] || 0, s.$vars.push("percent"), s;
    }, t.prototype._defaultLabelLine = function(r) {
      mu(r, "labelLine", ["show"]);
      var i = r.labelLine, n = r.emphasis.labelLine;
      i.show = i.show && r.label.show, n.show = n.show && r.emphasis.label.show;
    }, t.type = "series." + Mr, t.defaultOption = {
      // zlevel: 0,
      z: 2,
      legendHoverLink: !0,
      colorBy: "data",
      // 默认全局居中
      center: ["50%", "50%"],
      radius: [0, "50%"],
      // 默认顺时针
      clockwise: !0,
      startAngle: 90,
      endAngle: "auto",
      padAngle: 0,
      // 最小角度改为0
      minAngle: 0,
      // If the angle of a sector less than `minShowLabelAngle`,
      // the label will not be displayed.
      minShowLabelAngle: 0,
      // 选中时扇区偏移量
      selectedOffset: 10,
      // 选择模式，默认关闭，可选single，multiple
      // selectedMode: false,
      // 南丁格尔玫瑰图模式，'radius'（半径） | 'area'（面积）
      // roseType: null,
      percentPrecision: 2,
      // If still show when all data zero.
      stillShowZeroSum: !0,
      // cursor: null,
      coordinateSystemUsage: "box",
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      width: null,
      height: null,
      label: {
        // color: 'inherit',
        // If rotate around circle
        rotate: 0,
        show: !0,
        overflow: "truncate",
        // 'outer', 'inside', 'center'
        position: "outer",
        // 'none', 'labelLine', 'edge'. Works only when position is 'outer'
        alignTo: "none",
        // Closest distance between label and chart edge.
        // Works only position is 'outer' and alignTo is 'edge'.
        edgeDistance: "25%",
        // Works only position is 'outer' and alignTo is not 'edge'.
        // The default `bleedMargin` is auto determined according to view rect size.
        // bleedMargin: 10,
        // Distance between text and label line.
        distanceToLabelLine: 5
        // formatter: 标签文本格式器，同 tooltip.formatter，不支持异步回调
        // 默认使用全局文本样式，详见 textStyle
        // distance: 当position为inner时有效，为label位置到圆心的距离与圆半径(环状图为内外半径和)的比例系数
      },
      // Enabled when label.normal.position is 'outer'
      labelLine: {
        show: !0,
        // 引导线两段中的第一段长度
        length: 15,
        // 引导线两段中的第二段长度
        length2: 30,
        smooth: !1,
        minTurnAngle: 90,
        maxSurfaceAngle: 90,
        lineStyle: {
          // color: 各异,
          width: 1,
          type: "solid"
        }
      },
      itemStyle: {
        borderWidth: 1,
        borderJoin: "round"
      },
      showEmptyCircle: !0,
      emptyCircleStyle: {
        color: "lightgray",
        opacity: 1
      },
      labelLayout: {
        // Hide the overlapped label.
        hideOverlap: !0
      },
      emphasis: {
        scale: !0,
        scaleSize: 5
      },
      // If use strategy to avoid label overlapping
      avoidLabelOverlap: !0,
      // Animation type. Valid values: expansion, scale
      animationType: "expansion",
      animationDuration: 1e3,
      // Animation type when update. Valid values: transition, expansion
      animationTypeUpdate: "transition",
      animationEasingUpdate: "cubicInOut",
      animationDurationUpdate: 500,
      animationEasing: "cubicInOut"
    }, t;
  })(Lr)
);
iD({
  fullType: ay.type,
  getCoord2: function(e) {
    return e.getShallow("center");
  }
});
var wI = Math.PI / 180;
function vd(e, t, r, i, n, a, o, s, l, u) {
  if (e.length < 2)
    return;
  function c(g) {
    for (var p = g.rB, m = p * p, y = 0; y < g.list.length; y++) {
      var _ = g.list[y], w = Math.abs(_.label.y - r), b = i + _.len, S = b * b, T = Math.sqrt(Math.abs((1 - w * w / m) * S)), C = t + (T + _.len2) * n, x = C - _.label.x, M = _.targetTextWidth - x * n;
      oy(_, M, !0), _.label.x = C;
    }
  }
  function h(g) {
    for (var p = {
      list: [],
      maxY: 0
    }, m = {
      list: [],
      maxY: 0
    }, y = 0; y < g.length; y++)
      if (g[y].labelAlignTo === "none") {
        var _ = g[y], w = _.label.y > r ? m : p, b = Math.abs(_.label.y - r);
        if (b >= w.maxY) {
          var S = _.label.x - t - _.len2 * n, T = i + _.len, C = Math.abs(S) < T ? Math.sqrt(b * b / (1 - S * S / T / T)) : T;
          w.rB = C, w.maxY = b;
        }
        w.list.push(_);
      }
    c(p), c(m);
  }
  for (var v = e.length, f = 0; f < v; f++)
    if (e[f].position === "outer" && e[f].labelAlignTo === "labelLine") {
      var d = e[f].label.x - u;
      e[f].linePoints[1][0] += d, e[f].label.x = u;
    }
  ZL(e, 1, l, l + o) && h(e);
}
function bI(e, t, r, i, n, a, o, s) {
  for (var l = [], u = [], c = Number.MAX_VALUE, h = -Number.MAX_VALUE, v = 0; v < e.length; v++) {
    var f = e[v].label;
    zl(e[v]) || (f.x < t ? (c = Math.min(c, f.x), l.push(e[v])) : (h = Math.max(h, f.x), u.push(e[v])));
  }
  for (var v = 0; v < e.length; v++) {
    var d = e[v];
    if (!zl(d) && d.linePoints) {
      if (d.labelStyleWidth != null)
        continue;
      var f = d.label, g = d.linePoints, p = void 0;
      d.labelAlignTo === "edge" ? f.x < t ? p = g[2][0] - d.labelDistance - o - d.edgeDistance : p = o + n - d.edgeDistance - g[2][0] - d.labelDistance : d.labelAlignTo === "labelLine" ? f.x < t ? p = c - o - d.bleedMargin : p = o + n - h - d.bleedMargin : f.x < t ? p = f.x - o - d.bleedMargin : p = o + n - f.x - d.bleedMargin, d.targetTextWidth = p, oy(d, p, !1);
    }
  }
  vd(u, t, r, i, 1, n, a, o, s, h), vd(l, t, r, i, -1, n, a, o, s, c);
  for (var v = 0; v < e.length; v++) {
    var d = e[v];
    if (!zl(d) && d.linePoints) {
      var f = d.label, g = d.linePoints, m = d.labelAlignTo === "edge", y = f.style.padding, _ = y ? y[1] + y[3] : 0, w = f.style.backgroundColor ? 0 : _, b = d.rect.width + w, S = g[1][0] - g[2][0];
      m ? f.x < t ? g[2][0] = o + d.edgeDistance + b + d.labelDistance : g[2][0] = o + n - d.edgeDistance - b - d.labelDistance : (f.x < t ? g[2][0] = f.x + d.labelDistance : g[2][0] = f.x - d.labelDistance, g[1][0] = g[2][0] + S), g[1][1] = g[2][1] = f.y;
    }
  }
}
function oy(e, t, r) {
  if (e.labelStyleWidth == null) {
    var i = e.label, n = i.style, a = e.rect, o = n.backgroundColor, s = n.padding, l = s ? s[1] + s[3] : 0, u = n.overflow, c = a.width + (o ? 0 : l);
    if (t < c || r) {
      if (u && u.match("break")) {
        i.setStyle("backgroundColor", null), i.setStyle("width", t - l);
        var h = i.getBoundingRect();
        i.setStyle("width", Math.ceil(h.width)), i.setStyle("backgroundColor", o);
      } else {
        var v = t - l, f = t < c ? v : (
          // Current available width is enough, but the text may have
          // already been wrapped with a smaller available width.
          r ? v > e.unconstrainedWidth ? null : v : null
        );
        i.setStyle("width", f);
      }
      sy(a, i);
    }
  }
}
function sy(e, t) {
  dd.rect = e, $m(dd, t, SI);
}
var SI = {
  minMarginForce: [null, 0, null, 0],
  marginDefault: [1, 0, 1, 0]
}, dd = {};
function zl(e) {
  return e.position === "center";
}
function xI(e) {
  var t = e.getData(), r = [], i, n, a = !1, o = (e.get("minShowLabelAngle") || 0) * wI, s = t.getLayout("viewRect"), l = t.getLayout("r"), u = s.width, c = s.x, h = s.y, v = s.height;
  function f(S) {
    S.ignore = !0;
  }
  function d(S) {
    if (!S.ignore)
      return !0;
    for (var T in S.states)
      if (S.states[T].ignore === !1)
        return !0;
    return !1;
  }
  t.each(function(S) {
    var T = t.getItemGraphicEl(S), C = T.shape, x = T.getTextContent(), M = T.getTextGuideLine(), D = t.getItemModel(S), I = D.getModel("label"), k = I.get("position") || D.get(["emphasis", "label", "position"]), L = I.get("distanceToLabelLine"), B = I.get("alignTo"), N = Ct(I.get("edgeDistance"), u), q = I.get("bleedMargin");
    q == null && (q = Math.min(u, v) > 200 ? 10 : 2);
    var U = D.getModel("labelLine"), z = U.get("length");
    z = Ct(z, u);
    var V = U.get("length2");
    if (V = Ct(V, u), Math.abs(C.endAngle - C.startAngle) < o) {
      A(x.states, f), x.ignore = !0, M && (A(M.states, f), M.ignore = !0);
      return;
    }
    if (d(x)) {
      var J = (C.startAngle + C.endAngle) / 2, j = Math.cos(J), rt = Math.sin(J), ot, Mt, re, Vt;
      i = C.cx, n = C.cy;
      var Bt = k === "inside" || k === "inner";
      if (k === "center")
        ot = C.cx, Mt = C.cy, Vt = "center";
      else {
        var Et = (Bt ? (C.r + C.r0) / 2 * j : C.r * j) + i, bt = (Bt ? (C.r + C.r0) / 2 * rt : C.r * rt) + n;
        if (ot = Et + j * 3, Mt = bt + rt * 3, !Bt) {
          var G = Et + j * (z + l - C.r), $ = bt + rt * (z + l - C.r), De = G + (j < 0 ? -1 : 1) * V, Dt = $;
          B === "edge" ? ot = j < 0 ? c + N : c + u - N : ot = De + (j < 0 ? -L : L), Mt = Dt, re = [[Et, bt], [G, $], [De, Dt]];
        }
        Vt = Bt ? "center" : B === "edge" ? j > 0 ? "right" : "left" : j > 0 ? "left" : "right";
      }
      var hr = Math.PI, Je = 0, Er = I.get("rotate");
      if (_t(Er))
        Je = Er * (hr / 180);
      else if (k === "center")
        Je = 0;
      else if (Er === "radial" || Er === !0) {
        var by = j < 0 ? -J + hr : -J;
        Je = by;
      } else if (Er === "tangential" || Er === "tangential-noflip" && k !== "outside" && k !== "outer") {
        var Si = Math.atan2(j, rt);
        Si < 0 && (Si = hr * 2 + Si);
        var Sy = rt > 0;
        Sy && Er !== "tangential-noflip" && (Si = hr + Si), Je = Si - hr;
      }
      if (a = !!Je, x.x = ot, x.y = Mt, x.rotation = Je, x.setStyle({
        verticalAlign: "middle"
      }), Bt) {
        x.setStyle({
          align: Vt
        });
        var Ts = x.states.select;
        Ts && (Ts.x += x.x, Ts.y += x.y);
      } else {
        var xs = new Y(0, 0, 0, 0);
        sy(xs, x), r.push({
          label: x,
          labelLine: M,
          position: k,
          len: z,
          len2: V,
          minTurnAngle: U.get("minTurnAngle"),
          maxSurfaceAngle: U.get("maxSurfaceAngle"),
          surfaceNormal: new Z(j, rt),
          linePoints: re,
          textAlign: Vt,
          labelDistance: L,
          labelAlignTo: B,
          edgeDistance: N,
          bleedMargin: q,
          rect: xs,
          unconstrainedWidth: xs.width,
          labelStyleWidth: x.style.width
        });
      }
      T.setTextConfig({
        inside: Bt
      });
    }
  }), !a && e.get("avoidLabelOverlap") && bI(r, i, n, l, u, v, c, h);
  for (var g = 0; g < r.length; g++) {
    var p = r[g], m = p.label, y = p.labelLine, _ = isNaN(m.x) || isNaN(m.y);
    if (m) {
      m.setStyle({
        align: p.textAlign
      }), _ && (A(m.states, f), m.ignore = !0);
      var w = m.states.select;
      w && (w.x += m.x, w.y += m.y);
    }
    if (y) {
      var b = p.linePoints;
      _ || !b ? (A(y.states, f), y.ignore = !0) : (zL(b, p.minTurnAngle), VL(b, p.surfaceNormal, p.maxSurfaceAngle), y.setShape({
        points: b
      }), m.__hostTarget.textGuideLineConfig = {
        anchor: new Z(b[0][0], b[0][1])
      });
    }
  }
}
var pd = Math.PI * 2, eo = Math.PI / 180, TI = KT(Mr, CI);
function CI(e, t) {
  e.eachSeriesByType(Mr, function(r) {
    var i = r.getData(), n = i.mapDimension("value"), a = lD(r, t), o = a.cx, s = a.cy, l = a.r, u = a.r0, c = a.viewRect, h = -r.get("startAngle") * eo, v = r.get("endAngle"), f = r.get("padAngle") * eo;
    v = v === "auto" ? h - pd : -v * eo;
    var d = r.get("minAngle") * eo, g = d + f, p = 0;
    i.each(n, function(N) {
      !isNaN(N) && p++;
    });
    var m = i.getSum(n), y = Math.PI / (m || p) * 2, _ = r.get("clockwise"), w = r.get("roseType"), b = r.get("stillShowZeroSum"), S = i.getDataExtent(n);
    S[0] = 0;
    var T = _ ? 1 : -1, C = [h, v], x = T * f / 2;
    Rp(C, !_), h = C[0], v = C[1];
    var M = ly(r);
    M.startAngle = h, M.endAngle = v, M.clockwise = _, M.cx = o, M.cy = s, M.r = l, M.r0 = u;
    var D = Math.abs(v - h), I = D, k = 0, L = h;
    if (i.setLayout({
      viewRect: c,
      r: l
    }), i.each(n, function(N, q) {
      var U;
      if (isNaN(N)) {
        i.setItemLayout(q, {
          angle: NaN,
          startAngle: NaN,
          endAngle: NaN,
          clockwise: _,
          cx: o,
          cy: s,
          r0: u,
          r: w ? NaN : l
        });
        return;
      }
      w !== "area" ? U = m === 0 && b ? y : N * y : U = D / p, U < g ? (U = g, I -= g) : k += N;
      var z = L + T * U, V = 0, J = 0;
      f > U ? (V = L + T * U / 2, J = V) : (V = L + x, J = z - x), i.setItemLayout(q, {
        angle: U,
        startAngle: V,
        endAngle: J,
        clockwise: _,
        cx: o,
        cy: s,
        r0: u,
        r: w ? _T(N, S, [u, l]) : l
      }), L = z;
    }), I < pd && p)
      if (I <= 1e-3) {
        var B = D / p;
        i.each(n, function(N, q) {
          if (!isNaN(N)) {
            var U = i.getItemLayout(q);
            U.angle = B;
            var z = 0, V = 0;
            B < f ? (z = h + T * (q + 1 / 2) * B, V = z) : (z = h + T * q * B + x, V = h + T * (q + 1) * B - x), U.startAngle = z, U.endAngle = V;
          }
        });
      } else
        y = I / k, L = h, i.each(n, function(N, q) {
          if (!isNaN(N)) {
            var U = i.getItemLayout(q), z = U.angle === g ? g : N * y, V = 0, J = 0;
            z < f ? (V = L + T * z / 2, J = V) : (V = L + x, J = L + T * z - x), U.startAngle = V, U.endAngle = J, L += T * z;
          }
        });
  });
}
var ly = st(), AI = (
  /** @class */
  (function(e) {
    Q(t, e);
    function t(r, i, n) {
      var a = e.call(this) || this;
      a.z2 = 2;
      var o = new xe();
      return a.setTextContent(o), a.updateData(r, i, n, !0), a;
    }
    return t.prototype.updateData = function(r, i, n, a) {
      var o = this, s = r.hostModel, l = r.getItemModel(i), u = l.getModel("emphasis"), c = r.getItemLayout(i), h = P(to(l.getModel("itemStyle"), c, !0), c);
      if (isNaN(h.startAngle)) {
        o.setShape(h);
        return;
      }
      if (a) {
        o.setShape(h);
        var v = s.getShallow("animationType");
        s.ecModel.ssr ? (po(o, {
          scaleX: 0,
          scaleY: 0
        }, s, {
          dataIndex: i,
          isFrom: !0
        }), o.originX = h.cx, o.originY = h.cy) : v === "scale" ? (o.shape.r = c.r0, po(o, {
          shape: {
            r: c.r
          }
        }, s, i)) : n != null ? (o.setShape({
          startAngle: n,
          endAngle: n
        }), po(o, {
          shape: {
            startAngle: c.startAngle,
            endAngle: c.endAngle
          }
        }, s, i)) : (o.shape.endAngle = c.startAngle, ea(o, {
          shape: {
            endAngle: c.endAngle
          }
        }, s, i));
      } else
        rM(o), ea(o, {
          shape: h
        }, s, i);
      o.useStyle(r.getItemVisual(i, "style")), yA(o, l);
      var f = (c.startAngle + c.endAngle) / 2, d = s.get("selectedOffset"), g = Math.cos(f) * d, p = Math.sin(f) * d, m = l.getShallow("cursor");
      m && o.attr("cursor", m), this._updateLabel(s, r, i), o.ensureState("emphasis").shape = P({
        r: c.r + (u.get("scale") && u.get("scaleSize") || 0)
      }, to(u.getModel("itemStyle"), c)), P(o.ensureState("select"), {
        x: g,
        y: p,
        shape: to(l.getModel(["select", "itemStyle"]), c)
      }), P(o.ensureState("blur"), {
        shape: to(l.getModel(["blur", "itemStyle"]), c)
      });
      var y = o.getTextGuideLine(), _ = o.getTextContent();
      y && P(y.ensureState("select"), {
        x: g,
        y: p
      }), P(_.ensureState("select"), {
        x: g,
        y: p
      }), pA(this, u.get("focus"), u.get("blurScope"), u.get("disabled"));
    }, t.prototype._updateLabel = function(r, i, n) {
      var a = this, o = i.getItemModel(n), s = o.getModel("labelLine"), l = i.getItemVisual(n, "style"), u = l && l.fill, c = l && l.opacity;
      TM(a, CM(o), {
        labelFetcher: i.hostModel,
        labelDataIndex: n,
        inheritColor: u,
        defaultOpacity: c,
        defaultText: r.getFormattedLabel(n, "normal") || i.getName(n)
      });
      var h = a.getTextContent();
      a.setTextConfig({
        // reset position, rotation
        position: null,
        rotation: null
      }), h.attr({
        z2: 10
      });
      var v = o.get(["label", "position"]);
      if (v !== "outside" && v !== "outer")
        a.removeTextGuideLine();
      else {
        var f = this.getTextGuideLine();
        f || (f = new _a(), this.setTextGuideLine(f)), WL(this, GL(o), {
          stroke: u,
          opacity: ci(s.get(["lineStyle", "opacity"]), c, 1)
        });
      }
    }, t;
  })(ya)
), MI = (
  /** @class */
  (function(e) {
    Q(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = Mr, r.ignoreLabelLineUpdate = !0, r;
    }
    return t.prototype.render = function(r, i, n, a) {
      var o = r.getData(), s = this._data, l = this.group, u;
      if (!s && o.count() > 0) {
        for (var c = o.getItemLayout(0), h = 1; isNaN(c && c.startAngle) && h < o.count(); ++h)
          c = o.getItemLayout(h);
        c && (u = c.startAngle);
      }
      if (this._emptyCircleSector && l.remove(this._emptyCircleSector), o.count() === 0 && r.get("showEmptyCircle")) {
        var v = ly(r), f = new ya({
          shape: tt(v)
        });
        f.useStyle(r.getModel("emptyCircleStyle").getItemStyle()), this._emptyCircleSector = f, l.add(f);
      }
      o.diff(s).add(function(d) {
        var g = new AI(o, d, u);
        o.setItemGraphicEl(d, g), l.add(g);
      }).update(function(d, g) {
        var p = s.getItemGraphicEl(g);
        p.updateData(o, d, u), p.off("click"), l.add(p), o.setItemGraphicEl(d, p);
      }).remove(function(d) {
        var g = s.getItemGraphicEl(d);
        ug(g, r, d);
      }).execute(), xI(r), r.get("animationTypeUpdate") !== "expansion" && (this._data = o);
    }, t.prototype.dispose = function() {
    }, t.prototype.containPoint = function(r, i) {
      var n = i.getData(), a = n.getItemLayout(0);
      if (a) {
        var o = r[0] - a.cx, s = r[1] - a.cy, l = Math.sqrt(o * o + s * s);
        return l <= a.r && l >= a.r0;
      }
    }, t.type = Mr, t;
  })(Ar)
);
function DI(e) {
  return {
    seriesType: e,
    reset: function(t, r) {
      var i = t.getData();
      i.filterSelf(function(n) {
        var a = i.mapDimension("value"), o = i.get(a, n);
        return !(_t(o) && !isNaN(o) && o < 0);
      });
    }
  };
}
function kI(e) {
  e.registerChartView(MI), e.registerSeriesModel(ay), ek(Mr, e.registerAction), e.registerLayout(TI), e.registerProcessor(gI(Mr)), e.registerProcessor(DI(Mr));
}
function LI(e, t) {
  var r = {
    /**
     * key: makeKey(axis.model)
     * value: {
     *      axis,
     *      coordSys,
     *      axisPointerModel,
     *      triggerTooltip,
     *      triggerEmphasis,
     *      involveSeries,
     *      snap,
     *      seriesModels,
     *      seriesDataCount
     * }
     */
    axesInfo: {},
    seriesInvolved: !1,
    /**
     * key: makeKey(coordSys.model)
     * value: Object: key makeKey(axis.model), value: axisInfo
     */
    coordSysAxesInfo: {},
    coordSysMap: {}
  };
  return II(r, e, t), r.seriesInvolved && PI(r, e), r;
}
function II(e, t, r) {
  var i = t.getComponent("tooltip"), n = t.getComponent("axisPointer"), a = n.get("link", !0) || [], o = [];
  A(r.getCoordinateSystems(), function(s) {
    if (!s.axisPointerEnabled)
      return;
    var l = la(s.model), u = e.coordSysAxesInfo[l] = {};
    e.coordSysMap[l] = s;
    var c = s.model, h = c.getModel("tooltip", i);
    if (A(s.getAxes(), ae(g, !1, null)), s.getTooltipAxes && i && h.get("show")) {
      var v = h.get("trigger") === "axis", f = h.get(["axisPointer", "type"]) === "cross", d = s.getTooltipAxes(h.get(["axisPointer", "axis"]));
      (v || f) && A(d.baseAxes, ae(g, f ? "cross" : !0, v)), f && A(d.otherAxes, ae(g, "cross", !1));
    }
    function g(p, m, y) {
      var _ = y.model.getModel("axisPointer", n), w = _.get("show");
      if (!(!w || w === "auto" && !p && !Ju(_))) {
        m == null && (m = _.get("triggerTooltip")), _ = p ? EI(y, h, n, t, p, m) : _;
        var b = _.get("snap"), S = _.get("triggerEmphasis"), T = la(y.model), C = m || b || y.type === "category", x = e.axesInfo[T] = {
          key: T,
          axis: y,
          coordSys: s,
          axisPointerModel: _,
          triggerTooltip: m,
          triggerEmphasis: S,
          involveSeries: C,
          snap: b,
          useHandle: Ju(_),
          seriesModels: [],
          linkGroup: null
        };
        u[T] = x, e.seriesInvolved = e.seriesInvolved || C;
        var M = RI(a, y);
        if (M != null) {
          var D = o[M] || (o[M] = {
            axesInfo: {}
          });
          D.axesInfo[T] = x, D.mapper = a[M].mapper, x.linkGroup = D;
        }
      }
    }
  });
}
function EI(e, t, r, i, n, a) {
  var o = t.getModel("axisPointer"), s = ["type", "snap", "lineStyle", "shadowStyle", "label", "animation", "animationDurationUpdate", "animationEasingUpdate", "z"], l = {};
  A(s, function(v) {
    l[v] = tt(o.get(v));
  }), l.snap = e.type !== "category" && !!a, o.get("type") === "cross" && (l.type = "line");
  var u = l.label || (l.label = {});
  if (u.show == null && (u.show = !1), n === "cross") {
    var c = o.get(["label", "show"]);
    if (u.show = c ?? !0, !a) {
      var h = l.lineStyle = o.get("crossStyle");
      h && wt(u, h.textStyle);
    }
  }
  return e.model.getModel("axisPointer", new mt(l, r, i));
}
function PI(e, t) {
  t.eachSeries(function(r) {
    var i = r.coordinateSystem, n = r.get(["tooltip", "trigger"], !0), a = r.get(["tooltip", "show"], !0);
    !i || !i.model || n === "none" || n === !1 || n === "item" || a === !1 || r.get(["axisPointer", "show"], !0) === !1 || A(e.coordSysAxesInfo[la(i.model)], function(o) {
      var s = o.axis;
      i.getAxis(s.dim) === s && (o.seriesModels.push(r), o.seriesDataCount == null && (o.seriesDataCount = 0), o.seriesDataCount += r.getData().count());
    });
  });
}
function RI(e, t) {
  for (var r = t.model, i = t.dim, n = 0; n < e.length; n++) {
    var a = e[n] || {};
    if (Vl(a[i + "AxisId"], r.id) || Vl(a[i + "AxisIndex"], r.componentIndex) || Vl(a[i + "AxisName"], r.name))
      return n;
  }
}
function Vl(e, t) {
  return e === "all" || F(e) && dt(e, t) >= 0 || e === t;
}
function OI(e) {
  var t = oh(e);
  if (t) {
    var r = t.axisPointerModel, i = t.axis.scale, n = r.option, a = r.get("status"), o = r.get("value");
    o != null && (o = i.parse(o));
    var s = Ju(r);
    a == null && (n.status = s ? "show" : "hide");
    var l = i.getExtent();
    // Pick a value on axis when initializing.
    (o == null || o > l[1]) && (o = l[1]), o < l[0] && (o = l[0]), n.value = o, s && (n.status = t.axis.scale.isBlank() ? "hide" : "show");
  }
}
function oh(e) {
  var t = (e.ecModel.getComponent("axisPointer") || {}).coordSysAxesInfo;
  return t && t.axesInfo[la(e)];
}
function BI(e) {
  var t = oh(e);
  return t && t.axisPointerModel;
}
function Ju(e) {
  return !!e.get(["handle", "show"]);
}
function la(e) {
  return e.type + "||" + e.id;
}
var gd = {}, NI = (
  /** @class */
  (function(e) {
    Q(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.prototype.render = function(r, i, n, a) {
      this.axisPointerClass && OI(r), e.prototype.render.apply(this, arguments), this._doUpdateAxisPointerClass(r, n, !0);
    }, t.prototype.updateAxisPointer = function(r, i, n, a) {
      this._doUpdateAxisPointerClass(r, n, !1);
    }, t.prototype.remove = function(r, i) {
      var n = this._axisPointer;
      n && n.remove(i);
    }, t.prototype.dispose = function(r, i) {
      this._disposeAxisPointer(i), e.prototype.dispose.apply(this, arguments);
    }, t.prototype._doUpdateAxisPointerClass = function(r, i, n) {
      var a = t.getAxisPointerClass(this.axisPointerClass);
      if (a) {
        var o = BI(r);
        o ? (this._axisPointer || (this._axisPointer = new a())).render(r, o, i, n) : this._disposeAxisPointer(i);
      }
    }, t.prototype._disposeAxisPointer = function(r) {
      this._axisPointer && this._axisPointer.dispose(r), this._axisPointer = null;
    }, t.registerAxisPointerClass = function(r, i) {
      gd[r] = i;
    }, t.getAxisPointerClass = function(r) {
      return r && gd[r];
    }, t.type = "axis", t;
  })(Ir)
);
function md(e, t, r) {
  var i = ne.createCanvas(), n = t.getWidth(), a = t.getHeight(), o = i.style;
  return o && (o.position = "absolute", o.left = "0", o.top = "0", o.width = n + "px", o.height = a + "px", i.setAttribute("data-zr-dom-id", e)), i.width = n * r, i.height = a * r, i;
}
function Hl(e) {
  return !e.__cursors.get(sg);
}
function yd(e) {
  var t = e.__cursors.get(sg);
  return {
    startIdx: t ? t.startIdx : 0,
    endIdx: t ? t.endIdx : 0
  };
}
var uy = (function(e) {
  Q(t, e);
  function t(r, i, n) {
    var a = e.call(this) || this;
    a.motionBlur = !1, a.lastFrameAlpha = 0.7, a.dpr = 1, a.virtual = !1, a.config = {}, a.zlevel = 0, a.zlevel2 = vo, a.maxRepaintRectCount = 5, a.__dirty = !0, a.__firstTimePaint = !0, a.__prevIdx = { startIdx: 0, endIdx: 0 };
    var o;
    n = n || Io, typeof r == "string" ? o = md(r, i, n) : H(r) && (o = r, r = o.id), a.id = r, a.dom = o;
    var s = o.style;
    return s && (Zd(o), o.onselectstart = function() {
      return !1;
    }, s.padding = "0", s.margin = "0", s.borderWidth = "0"), a.painter = i, a.dpr = n, a;
  }
  return t.prototype.afterBrush = function() {
    this.__prevIdx = yd(this);
  }, t.prototype.initContext = function() {
    this.ctx = this.dom.getContext("2d"), this.ctx.dpr = this.dpr;
  }, t.prototype.setUnpainted = function() {
    this.__firstTimePaint = !0;
  }, t.prototype.createBackBuffer = function() {
    var r = this.dpr;
    this.domBack = md("back-" + this.id, this.painter, r), this.ctxBack = this.domBack.getContext("2d"), r !== 1 && this.ctxBack.scale(r, r);
  }, t.prototype.createRepaintRects = function(r, i, n, a) {
    if (this.__firstTimePaint)
      return this.__firstTimePaint = !1, null;
    var o = [], s = this.maxRepaintRectCount, l = !1, u = new Y(0, 0, 0, 0);
    function c(w) {
      if (!(!w.isFinite() || w.isZero()))
        if (o.length === 0) {
          var b = new Y(0, 0, 0, 0);
          b.copy(w), o.push(b);
        } else {
          for (var S = !1, T = 1 / 0, C = 0, x = 0; x < o.length; ++x) {
            var M = o[x];
            if (M.intersect(w)) {
              var D = new Y(0, 0, 0, 0);
              D.copy(M), D.union(w), o[x] = D, S = !0;
              break;
            } else if (l) {
              u.copy(w), u.union(M);
              var I = w.width * w.height, k = M.width * M.height, L = u.width * u.height, B = L - I - k;
              B < T && (T = B, C = x);
            }
          }
          if (l && (o[C].union(w), S = !0), !S) {
            var b = new Y(0, 0, 0, 0);
            b.copy(w), o.push(b);
          }
          l || (l = o.length >= s);
        }
    }
    for (var h = yd(this), v = h.startIdx; v < h.endIdx; ++v) {
      var f = r[v];
      if (f) {
        var d = f.shouldBePainted(n, a, !0, !0), g = f.__isRendered && (f.__dirty & jt || !d) ? f.getPrevPaintRect() : null;
        g && c(g);
        var p = d && (f.__dirty & jt || !f.__isRendered) ? f.getPaintRect() : null;
        p && c(p);
      }
    }
    for (var m = this.__prevIdx, v = m.startIdx; v < m.endIdx; ++v) {
      var f = i[v], d = f && f.shouldBePainted(n, a, !0, !0);
      if (f && (!d || !f.__zr) && f.__isRendered) {
        var g = f.getPrevPaintRect();
        g && c(g);
      }
    }
    var y;
    do {
      y = !1;
      for (var v = 0; v < o.length; ) {
        if (o[v].isZero()) {
          o.splice(v, 1);
          continue;
        }
        for (var _ = v + 1; _ < o.length; )
          o[v].intersect(o[_]) ? (y = !0, o[v].union(o[_]), o.splice(_, 1)) : _++;
        v++;
      }
    } while (y);
    return this._paintRects = o, o;
  }, t.prototype.debugGetPaintRects = function() {
    return (this._paintRects || []).slice();
  }, t.prototype.resize = function(r, i) {
    var n = this.dpr, a = this.dom, o = a.style, s = this.domBack;
    o && (o.width = r + "px", o.height = i + "px"), a.width = r * n, a.height = i * n, s && (s.width = r * n, s.height = i * n, n !== 1 && this.ctxBack.scale(n, n));
  }, t.prototype.clear = function(r, i, n) {
    var a = this.dom, o = this.ctx, s = a.width, l = a.height;
    i = i || this.clearColor;
    var u = this.motionBlur && !r, c = this.lastFrameAlpha, h = this.dpr, v = this;
    u && (this.domBack || this.createBackBuffer(), this.ctxBack.globalCompositeOperation = "copy", this.ctxBack.drawImage(a, 0, 0, s / h, l / h));
    var f = this.domBack;
    function d(g, p, m, y) {
      if (o.clearRect(g, p, m, y), i && i !== "transparent") {
        var _ = void 0;
        if (is(i)) {
          var w = i.global || i.__width === m && i.__height === y;
          _ = w && i.__canvasGradient || Wu(o, i, {
            x: 0,
            y: 0,
            width: m,
            height: y
          }), i.__canvasGradient = _, i.__width = m, i.__height = y;
        } else VS(i) && (i.scaleX = i.scaleX || h, i.scaleY = i.scaleY || h, _ = Gu(o, i, {
          dirty: function() {
            v.setUnpainted(), v.painter.refresh();
          }
        }));
        o.save(), o.fillStyle = _ || i, o.fillRect(g, p, m, y), o.restore();
      }
      u && (o.save(), o.globalAlpha = c, o.drawImage(f, g, p, m, y), o.restore());
    }
    !n || u ? d(0, 0, s, l) : n.length && A(n, function(g) {
      d(g.x * h, g.y * h, g.width * h, g.height * h);
    });
  }, t;
})(Ke), _d = 1e5, ii = 314159, Wl = void 0, FI = 1, Gl = 2;
function UI(e) {
  return e ? e.__builtin__ ? !0 : !(typeof e.resize != "function" || typeof e.refresh != "function") : !1;
}
function zI(e, t) {
  var r = document.createElement("div");
  return r.style.cssText = [
    "position:relative",
    "width:" + e + "px",
    "height:" + t + "px",
    "padding:0",
    "margin:0",
    "border-width:0"
  ].join(";") + ";", r;
}
function wd(e, t, r, i) {
  var n = new uy(e, t, t.dpr);
  return n.zlevel = r, n.zlevel2 = i, n.__builtin__ = !0, cy(n), n;
}
function cy(e) {
  e.__cursorStack = [], e.__cursors = et();
}
function VI(e) {
  return e.startIdx = e.drawIdx = e.endIdx = e.endIdxNew = 0, e.used = !1, e.first = e.last = NaN, e.notClearIdx = -1, e;
}
function HI(e, t) {
  var r = e.__cursors, i = +t;
  return r.get(i) || (e.__cursorStack.push(i), r.set(i, VI({ key: i })));
}
function ro(e, t) {
  for (var r = e.__cursorStack, i = 0; i < r.length; i++)
    t(e.__cursors.get(r[i]));
}
function Yl(e, t) {
  var r = e.layers;
  return r[t] || (r[t] = new Array(3));
}
function Ft(e, t, r) {
  for (var i = e.layerStack, n = 0; n < i.length; n++) {
    var a = i[n].zl, o = i[n].zl2, s = e.layers[a][o];
    (!r || (!(r & Zn) || s.__builtin__) && (!(r & ju) || !s.__builtin__) && (!(r & hy) || s !== e.hoverlayer)) && t(s, a, o, n);
  }
}
var Zn = 1, ju = 2, hy = 4, io = Zn | hy, WI = (function() {
  function e(t, r, i, n) {
    this.type = "canvas", this._prevDisplayList = [], this._layerConfig = {}, this._needsManuallyCompositing = !1, this.type = "canvas", this._i = {
      layerStack: [],
      layers: []
    };
    var a = !t.nodeName || t.nodeName.toUpperCase() === "CANVAS";
    this._opts = i = P({}, i || {}), this.dpr = i.devicePixelRatio || Io, this._singleCanvas = a, this.root = t;
    var o = t.style;
    if (o && (Zd(t), t.innerHTML = ""), this.storage = r, this._prevDisplayList = [], a) {
      var l = t, u = l.width, c = l.height;
      i.width != null && (u = i.width), i.height != null && (c = i.height), this.dpr = i.devicePixelRatio || 1, l.width = u * this.dpr, l.height = c * this.dpr, this._width = u, this._height = c;
      var h = wd(l, this, ii, vo);
      h.initContext(), this._insertLayer(h, ii, vo, !0), this._domRoot = t;
    } else {
      this._width = qa(t, 0, i), this._height = qa(t, 1, i);
      var s = this._domRoot = zI(this._width, this._height);
      t.appendChild(s);
    }
  }
  return e.prototype.getType = function() {
    return "canvas";
  }, e.prototype.isSingleCanvas = function() {
    return this._singleCanvas;
  }, e.prototype.getViewportRoot = function() {
    return this._domRoot;
  }, e.prototype.getViewportRootOffset = function() {
    var t = this.getViewportRoot();
    if (t)
      return {
        offsetLeft: t.offsetLeft || 0,
        offsetTop: t.offsetTop || 0
      };
  }, e.prototype.refresh = function(t) {
    var r;
    t && !H(t) ? r = { paintAll: !!t } : r = t || {};
    var i = W(r.refresh, !0), n = W(r.refreshHover, !1);
    if (n && (this._hoverLayerDirty = Gl), !i)
      return n && this._paintHoverList(this.storage.getDisplayList(!1)), this;
    var a = this.storage.getDisplayList(!0);
    this._updateLayerStatus(a, r.paintAll), this._redrawId = Math.random();
    var o = this._prevDisplayList;
    this._paintList(a, o, this._redrawId);
    var s = this._backgroundColor;
    return Ft(this._i, function(l, u, c, h) {
      l.refresh && l.refresh(h === 0 ? s : null);
    }, ju), this._opts.useDirtyRect && (this._prevDisplayList = a.slice()), this;
  }, e.prototype._paintHoverList = function(t) {
    var r = this._i.hoverlayer, i = this._hoverLayerDirty;
    if (this._hoverLayerDirty = Wl, i !== Wl && (!r && i === Gl && (r = this._i.hoverlayer = this._ensureLayer(_d)), !!r)) {
      r.clear();
      for (var n = {
        inHover: !0,
        viewWidth: this._width,
        viewHeight: this._height,
        beforeBrushParam: {}
      }, a, o = 0, s = t.length; o < s; o++) {
        var l = t[o];
        if (l.__inHover) {
          a || (a = r.ctx, a.save());
          var u = l.__hoverStyle, c = void 0;
          u && (c = l.style, l.style = u), ui(a, l, n), u && (l.style = c);
        }
      }
      a && (Ki(a, n), a.restore());
    }
  }, e.prototype.getHoverLayer = function() {
    return this._ensureLayer(_d);
  }, e.prototype.paintOne = function(t, r) {
    Sm(t, r);
  }, e.prototype._paintList = function(t, r, i) {
    if (this._redrawId === i) {
      var n = this._doPaintList(t, r);
      if (this._needsManuallyCompositing && this._compositeManually(), n)
        Ft(this._i, function(o) {
          o.afterBrush && o.afterBrush();
        }, io), this._paintHoverList(t);
      else {
        var a = this;
        Ao(function() {
          a._paintList(t, r, i);
        });
      }
    }
  }, e.prototype._compositeManually = function() {
    var t = this._ensureLayer(ii).ctx, r = this._domRoot.width, i = this._domRoot.height;
    t.clearRect(0, 0, r, i), Ft(this._i, function(n) {
      n.virtual && t.drawImage(n.dom, 0, 0, r, i);
    }, Zn);
  }, e.prototype._doPaintList = function(t, r) {
    var i = this, n = !0;
    return Ft(this._i, function(a) {
      var o = !1;
      if (ro(a, function(h) {
        (h.drawIdx < h.endIdx || h.notClearIdx >= 0) && (o = !0);
      }), !(!o && !a.__dirty)) {
        var s = i._opts.useDirtyRect && !Hl(a) ? a.createRepaintRects(t, r, i._width, i._height) : null, l = i._i.layerStack[0], u = !0;
        if (a.__dirty) {
          u = !1, a.__dirty = !1;
          var c = a.zlevel === l.zl && a.zlevel2 === l.zl2 ? i._backgroundColor : null;
          a.clear(!1, c, s);
        }
        ro(a, function(h) {
          var v = i._paintPerCursor(a, h, t, s, u);
          n = n && v;
        });
      }
    }, io), K.wxa && Ft(this._i, function(a) {
      a && a.ctx && a.ctx.draw && a.ctx.draw();
    }), n;
  }, e.prototype._paintPerCursor = function(t, r, i, n, a) {
    var o = t.ctx;
    if (n)
      if (!n.length)
        r.drawIdx = r.endIdx;
      else
        for (var s = this.dpr, l = 0; l < n.length; ++l) {
          var u = n[l];
          o.save(), o.beginPath(), o.rect(u.x * s, u.y * s, u.width * s, u.height * s), o.clip(), this._paintPerCursorInRect(t, r, i, u, a), o.restore();
        }
    else
      o.save(), this._paintPerCursorInRect(t, r, i, null, a), o.restore();
    return r.drawIdx >= r.endIdx;
  }, e.prototype._paintPerCursorInRect = function(t, r, i, n, a) {
    for (var o = {
      inHover: !1,
      allClipped: !1,
      prevEl: null,
      viewWidth: this._width,
      viewHeight: this._height,
      beforeBrushParam: { contentRetained: a }
    }, s = t.ctx, l = Hl(t), u = l && ne.getTime(), c = r.drawIdx, h = r.notClearIdx, v = h >= 0 ? Math.min(h, c) : c; v < r.endIdx; v++) {
      var f = i[v];
      if (!(v < c && !f.notClear)) {
        if (f.__inHover && (this._hoverLayerDirty = Gl), n != null) {
          var d = f.getPaintRect();
          d && d.intersect(n) && (ui(s, f, o), f.setPrevPaintRect(d));
        } else
          ui(s, f, o);
        if (l) {
          var g = ne.getTime() - u;
          if (g > 15) {
            v++;
            break;
          }
        }
      }
    }
    Ki(s, o), r.drawIdx = Math.max(v, c);
  }, e.prototype.getLayer = function(t, r) {
    return this._ensureLayer(t, 0, r);
  }, e.prototype._ensureLayer = function(t, r, i) {
    r = r || 0;
    var n = this._singleCanvas;
    n && !this._needsManuallyCompositing && (t = ii, r = 0);
    var a = Yl(this._i, t)[r];
    return a || (a = wd("zr_" + t + "." + r, this, t, r), this._layerConfig[t] && At(a, this._layerConfig[t], !0), (i || n && t !== ii) && (a.virtual = !0), this._insertLayer(a, t, r, !1), a.initContext()), a;
  }, e.prototype.insertLayer = function(t, r) {
    this._insertLayer(r, t, 0, !1);
  }, e.prototype._insertLayer = function(t, r, i, n) {
    var a = this._i, o = a.layers, s = a.layerStack, l = this._domRoot, u = null;
    if (!(o[r] && o[r][i]) && UI(t)) {
      for (var c = s.length, h = 0; h < c && (s[h].zl < r || s[h].zl === r && s[h].zl2 < i); )
        h++;
      if (h > 0 && (u = Yl(a, s[h - 1].zl)[s[h - 1].zl2]), s.splice(h, 0, { zl: r, zl2: i }), Yl(a, r)[i] = t, !n && !t.virtual)
        if (u) {
          var v = u.dom;
          v.nextSibling ? l.insertBefore(t.dom, v.nextSibling) : l.appendChild(t.dom);
        } else
          l.firstChild ? l.insertBefore(t.dom, l.firstChild) : l.appendChild(t.dom);
      t.painter || (t.painter = this);
    }
  }, e.prototype.eachLayer = function(t, r) {
    return Ft(this._i, function(i, n) {
      t.call(r, i, n);
    });
  }, e.prototype.eachBuiltinLayer = function(t, r) {
    return Ft(this._i, function(i, n) {
      t.call(r, i, n);
    }, Zn);
  }, e.prototype.eachOtherLayer = function(t, r) {
    return Ft(this._i, function(i, n) {
      t.call(r, i, n);
    }, ju);
  }, e.prototype.getLayers = function() {
    var t = {};
    return Ft(this._i, function(r, i, n) {
      t[r.id] = r;
    }), t;
  }, e.prototype._updateLayerStatus = function(t, r) {
    var i = this;
    if (i._singleCanvas)
      for (var n = 1; n < t.length; n++) {
        var a = t[n];
        if (a.zlevel !== t[n - 1].zlevel || a.incremental) {
          i._needsManuallyCompositing = !0;
          break;
        }
      }
    Ft(i._i, function(p) {
      p.__dirty = !1, ro(p, function(m) {
        m.used = !1, m.endIdxNew = 0, m.notClearIdx = -1;
      });
    }, io);
    for (var o, s = null, l = null, u = !1, c = 0, h = t.length; c < h; c++) {
      var a = t[c], v = a.zlevel, f = a.incremental, d = void 0;
      if (o !== v && (o = v, u = !1), f ? (u = !0, d = JA) : d = u ? KA : vo, (!s || v !== s.zlevel || d !== s.zlevel2) && (s = i._ensureLayer(v, d), l = null, !s.__builtin__)) {
        hc("ZLevel " + v + " has been used by unknown layer " + s.id);
        continue;
      }
      if ((!l || f !== l.key) && (l = HI(s, f), !l.used))
        if (l.used = !0, !r && l.first === a.id) {
          var g = c - l.startIdx;
          l.startIdx = c, l.drawIdx += g, l.endIdx += g;
        } else
          s.__dirty = !0, l.first = a.id, l.startIdx = l.drawIdx = c, l.endIdx = c + 1;
      l.endIdxNew = c + 1, a.__dirty & jt && !a.__inHover && ((!f || !a.notClear && c < l.drawIdx) && (s.__dirty = !0), f && a.notClear && l.notClearIdx < 0 && (l.notClearIdx = c));
    }
    Ft(i._i, function(p) {
      for (var m = p.__cursorStack, y = p.__cursors, _ = m.length - 1; _ >= 0; _--) {
        var w = y.get(m[_]);
        if (!w.used)
          p.__dirty = !0, y.removeKey(m[_]), m.splice(_, 1);
        else {
          var b = w.endIdxNew;
          (Hl(p) ? b < w.drawIdx : b !== w.endIdx || !b || t[b - 1].id !== w.last) && (p.__dirty = !0), w.endIdx = w.endIdxNew, w.last = b ? t[b - 1].id : NaN;
        }
      }
      p.__dirty && (ro(p, function(S) {
        S.drawIdx = S.startIdx;
      }), i._hoverLayerDirty === Wl && (i._hoverLayerDirty = FI));
    }, io);
  }, e.prototype.clear = function() {
    return Ft(this._i, function(t) {
      t.clear(), cy(t);
    }, Zn), this;
  }, e.prototype.setBackgroundColor = function(t) {
    this._backgroundColor = t, Ft(this._i, function(r) {
      r.setUnpainted();
    });
  }, e.prototype.configLayer = function(t, r) {
    if (r) {
      var i = this._layerConfig;
      i[t] ? At(i[t], r, !0) : i[t] = r, Ft(this._i, function(n, a) {
        At(n, i[a], !0);
      });
    }
  }, e.prototype.delLayer = function(t) {
    for (var r = this._i.layerStack, i = this._i.layers, n = r.length - 1; n >= 0; n--) {
      var a = r[n];
      if (a.zl === t) {
        var o = i[t][a.zl2];
        if (o.__builtin__)
          continue;
        if (r.splice(n, 1), i[t][a.zl2] = void 0, !o.virtual) {
          var s = o.dom.parentNode;
          s && s.removeChild(o.dom);
        }
      }
    }
  }, e.prototype.resize = function(t, r) {
    if (this._domRoot.style) {
      var i = this._domRoot;
      i.style.display = "none";
      var n = this._opts, a = this.root;
      t != null && (n.width = t), r != null && (n.height = r), t = qa(a, 0, n), r = qa(a, 1, n), i.style.display = "", (this._width !== t || r !== this._height) && (i.style.width = t + "px", i.style.height = r + "px", Ft(this._i, function(o) {
        o.resize(t, r);
      }), this.refresh({ paintAll: !0 })), this._width = t, this._height = r;
    } else {
      if (t == null || r == null)
        return;
      this._width = t, this._height = r, this._ensureLayer(ii).resize(t, r);
    }
    return this;
  }, e.prototype.clearLayer = function(t) {
    A(this._i.layers[t], function(r) {
      r && !r.__builtin__ && r.clear();
    });
  }, e.prototype.dispose = function() {
    this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._i = null;
  }, e.prototype.getRenderedCanvas = function(t) {
    if (t = t || {}, this._singleCanvas && !this._compositeManually)
      return this._i.layers[ii][0].dom;
    var r = new uy("image", this, t.pixelRatio || this.dpr);
    r.initContext(), r.clear(!1, t.backgroundColor || this._backgroundColor);
    var i = r.ctx;
    if (t.pixelRatio <= this.dpr) {
      this.refresh();
      var n = r.dom.width, a = r.dom.height;
      Ft(this._i, function(h) {
        h.__builtin__ ? i.drawImage(h.dom, 0, 0, n, a) : h.renderToCanvas && (i.save(), h.renderToCanvas(i), i.restore());
      });
    } else {
      for (var o = {
        inHover: !1,
        viewWidth: this._width,
        viewHeight: this._height,
        beforeBrushParam: {}
      }, s = this.storage.getDisplayList(!0), l = 0, u = s.length; l < u; l++) {
        var c = s[l];
        ui(i, c, o);
      }
      Ki(i, o);
    }
    return r.dom;
  }, e.prototype.getWidth = function() {
    return this._width;
  }, e.prototype.getHeight = function() {
    return this._height;
  }, e;
})();
function GI(e) {
  e.registerPainter("canvas", WI);
}
var ni = st(), bd = tt, Xl = ft, YI = (
  /** @class */
  (function() {
    function e() {
      this._dragging = !1, this.animationThreshold = 15;
    }
    return e.prototype.render = function(t, r, i, n) {
      var a = r.get("value"), o = r.get("status");
      if (this._axisModel = t, this._axisPointerModel = r, this._api = i, !(!n && this._lastValue === a && this._lastStatus === o)) {
        this._lastValue = a, this._lastStatus = o;
        var s = this._group, l = this._handle;
        if (!o || o === "hide") {
          s && s.hide(), l && l.hide();
          return;
        }
        s && s.show(), l && l.show();
        var u = {};
        this.makeElOption(u, a, t, r, i);
        var c = u.graphicKey;
        c !== this._lastGraphicKey && this.clear(i), this._lastGraphicKey = c;
        var h = this._moveAnimation = this.determineAnimation(t, r);
        if (!s)
          s = this._group = new qe(), this.createPointerEl(s, u, t, r), this.createLabelEl(s, u, t, r), i.getZr().add(s);
        else {
          var v = ae(Sd, r, h);
          this.updatePointerEl(s, u, v), this.updateLabelEl(s, u, v, r);
        }
        Td(s, r, !0), this._renderHandle(a);
      }
    }, e.prototype.remove = function(t) {
      this.clear(t);
    }, e.prototype.dispose = function(t) {
      this.clear(t);
    }, e.prototype.determineAnimation = function(t, r) {
      var i = r.get("animation"), n = t.axis, a = n.type === "category", o = r.get("snap");
      if (!o && !a)
        return !1;
      if (i === "auto" || i == null) {
        var s = this.animationThreshold;
        if (a && Qm(n).w > s)
          return !0;
        if (o) {
          var l = oh(t).seriesDataCount, u = n.getExtent();
          return Math.abs(u[0] - u[1]) / l > s;
        }
        return !1;
      }
      return i === !0;
    }, e.prototype.makeElOption = function(t, r, i, n, a) {
    }, e.prototype.createPointerEl = function(t, r, i, n) {
      var a = r.pointer;
      if (a) {
        var o = ni(t).pointerEl = new SM[a.type](bd(r.pointer));
        t.add(o);
      }
    }, e.prototype.createLabelEl = function(t, r, i, n) {
      if (r.label) {
        var a = ni(t).labelEl = new xe(bd(r.label));
        t.add(a), xd(a, n);
      }
    }, e.prototype.updatePointerEl = function(t, r, i) {
      var n = ni(t).pointerEl;
      n && r.pointer && (n.setStyle(r.pointer.style), i(n, {
        shape: r.pointer.shape
      }));
    }, e.prototype.updateLabelEl = function(t, r, i, n) {
      var a = ni(t).labelEl;
      a && (a.setStyle(r.label.style), i(a, {
        // Consider text length change in vertical axis, animation should
        // be used on shape, otherwise the effect will be weird.
        // TODOTODO
        // shape: elOption.label.shape,
        x: r.label.x,
        y: r.label.y
      }), xd(a, n));
    }, e.prototype._renderHandle = function(t) {
      if (!(this._dragging || !this.updateHandleTransform)) {
        var r = this._axisPointerModel, i = this._api.getZr(), n = this._handle, a = r.getModel("handle"), o = r.get("status");
        if (!a.get("show") || !o || o === "hide") {
          n && i.remove(n), this._handle = null;
          return;
        }
        var s;
        this._handle || (s = !0, n = this._handle = yg(a.get("icon"), {
          cursor: "move",
          draggable: !0,
          onmousemove: function(u) {
            Kd(u.event);
          },
          onmousedown: Xl(this._onHandleDragMove, this, 0, 0),
          drift: Xl(this._onHandleDragMove, this),
          ondragend: Xl(this._onHandleDragEnd, this)
        }), i.add(n)), Td(n, r, !1), n.setStyle(a.getItemStyle(null, ["color", "borderColor", "borderWidth", "opacity", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"]));
        var l = a.get("size");
        F(l) || (l = [l, l]), n.scaleX = l[0] / 2, n.scaleY = l[1] / 2, lm(this, "_doDispatchAxisPointer", a.get("throttle") || 0, "fixRate"), this._moveHandleToValue(t, s);
      }
    }, e.prototype._moveHandleToValue = function(t, r) {
      Sd(this._axisPointerModel, !r && this._moveAnimation, this._handle, ql(this.getHandleTransform(t, this._axisModel, this._axisPointerModel)));
    }, e.prototype._onHandleDragMove = function(t, r) {
      var i = this._handle;
      if (i) {
        this._dragging = !0;
        var n = this.updateHandleTransform(ql(i), [t, r], this._axisModel, this._axisPointerModel);
        this._payloadInfo = n, i.stopAnimation(), i.attr(ql(n)), ni(i).lastProp = null, this._doDispatchAxisPointer();
      }
    }, e.prototype._doDispatchAxisPointer = function() {
      var t = this._handle;
      if (t) {
        var r = this._payloadInfo, i = this._axisModel;
        this._api.dispatchAction({
          type: "updateAxisPointer",
          x: r.cursorPoint[0],
          y: r.cursorPoint[1],
          tooltipOption: r.tooltipOption,
          axesInfo: [{
            axisDim: i.axis.dim,
            axisIndex: i.componentIndex
          }]
        });
      }
    }, e.prototype._onHandleDragEnd = function() {
      this._dragging = !1;
      var t = this._handle;
      if (t) {
        var r = this._axisPointerModel.get("value");
        this._moveHandleToValue(r), this._api.dispatchAction({
          type: "hideTip"
        });
      }
    }, e.prototype.clear = function(t) {
      this._lastValue = null, this._lastStatus = null;
      var r = t.getZr(), i = this._group, n = this._handle;
      r && i && (this._lastGraphicKey = null, i && r.remove(i), n && r.remove(n), this._group = null, this._handle = null, this._payloadInfo = null), zu(this, "_doDispatchAxisPointer");
    }, e.prototype.doClear = function() {
    }, e.prototype.buildLabel = function(t, r, i) {
      return i = i || 0, {
        x: t[i],
        y: t[1 - i],
        width: r[i],
        height: r[1 - i]
      };
    }, e;
  })()
);
function Sd(e, t, r, i) {
  fy(ni(r).lastProp, i) || (ni(r).lastProp = i, t ? ea(r, i, e) : (r.stopAnimation(), r.attr(i)));
}
function fy(e, t) {
  if (H(e) && H(t)) {
    var r = !0;
    return A(t, function(i, n) {
      r = r && fy(e[n], i);
    }), !!r;
  } else
    return e === t;
}
function xd(e, t) {
  e[t.get(["label", "show"]) ? "show" : "hide"]();
}
function ql(e) {
  return {
    x: e.x || 0,
    y: e.y || 0,
    rotation: e.rotation || 0
  };
}
function Td(e, t, r) {
  var i = t.get("z"), n = t.get("zlevel");
  e && e.traverse(function(a) {
    a.type !== "group" && (i != null && (a.z = i), n != null && (a.zlevel = n), a.silent = r);
  });
}
function XI(e) {
  var t = e.get("type"), r = e.getModel(t + "Style"), i;
  return t === "line" ? (i = r.getLineStyle(), i.fill = null) : t === "shadow" && (i = r.getAreaStyle(), i.stroke = null), i;
}
function qI(e, t, r, i, n) {
  var a = r.get("value"), o = vy(a, t.axis, t.ecModel, r.get("seriesDataIndices"), {
    precision: r.get(["label", "precision"]),
    formatter: r.get(["label", "formatter"])
  }), s = r.getModel("label"), l = Gc(s.get("padding") || 0), u = s.getFont(), c = iT(o, u), h = n.position, v = c.width + l[1] + l[3], f = c.height + l[0] + l[2], d = n.align;
  d === "right" && (h[0] -= v), d === "center" && (h[0] -= v / 2);
  var g = n.verticalAlign;
  g === "bottom" && (h[1] -= f), g === "middle" && (h[1] -= f / 2), ZI(h, v, f, i);
  var p = s.get("backgroundColor");
  (!p || p === "auto") && (p = t.get(["axisLine", "lineStyle", "color"])), e.label = {
    // shape: {x: 0, y: 0, width: width, height: height, r: labelModel.get('borderRadius')},
    x: h[0],
    y: h[1],
    style: ia(s, {
      text: o,
      font: u,
      fill: s.getTextColor(),
      padding: l,
      backgroundColor: p
    }),
    // Label should be over axisPointer.
    z2: 10
  };
}
function ZI(e, t, r, i) {
  var n = i.getWidth(), a = i.getHeight();
  e[0] = Math.min(e[0] + t, n) - t, e[1] = Math.min(e[1] + r, a) - r, e[0] = Math.max(e[0], 0), e[1] = Math.max(e[1], 0);
}
function vy(e, t, r, i, n) {
  e = t.scale.parse(e);
  var a = t.scale.getLabel({
    value: e
  }, {
    // If `precision` is set, width can be fixed (like '12.00500'), which
    // helps to debounce when when moving label.
    precision: n.precision
  }), o = n.formatter;
  if (o) {
    var s = {
      value: Ym(t, {
        value: e
      }),
      axisDimension: t.dim,
      axisIndex: t.index,
      seriesData: []
    };
    A(i, function(l) {
      var u = r.getSeriesByIndex(l.seriesIndex), c = l.dataIndexInside, h = u && u.getDataParams(c);
      h && s.seriesData.push(h);
    }), X(o) ? a = o.replace("{value}", a) : at(o) && (a = o(s));
  }
  return a;
}
function dy(e, t, r) {
  var i = He();
  return gc(i, i, r.rotation), iu(i, i, r.position), Fc([e.dataToCoord(t), (r.labelOffset || 0) + (r.labelDirection || 1) * (r.labelMargin || 0)], i);
}
function QI(e, t, r, i, n, a) {
  var o = gi.innerTextLayout(r.rotation, 0, r.labelDirection);
  r.labelMargin = n.get(["label", "margin"]), qI(t, i, n, a, {
    position: dy(i.axis, e, r),
    align: o.textAlign,
    verticalAlign: o.textVerticalAlign
  });
}
function KI(e, t, r) {
  return r = r || 0, {
    x1: e[r],
    y1: e[1 - r],
    x2: t[r],
    y2: t[1 - r]
  };
}
function JI(e, t, r) {
  return r = r || 0, {
    x: e[r],
    y: e[1 - r],
    width: t[r],
    height: t[1 - r]
  };
}
function jI(e, t, r) {
  return Qm(e, {
    fromStat: {
      sers: it(t, function(i) {
        return r.getSeriesByIndex(i.seriesIndex);
      })
    },
    min: 1
  }).w;
}
function $I(e, t, r) {
  return [It(ar(t[0], t[1]), e - r / 2), ar(e + r / 2, It(t[0], t[1]))];
}
var tE = (
  /** @class */
  (function(e) {
    Q(t, e);
    function t() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return t.prototype.makeElOption = function(r, i, n, a, o) {
      var s = n.axis, l = s.grid, u = a.get("type"), c = s.getGlobalExtent(), h = Cd(l, s).getOtherAxis(s).getGlobalExtent(), v = s.toGlobalCoord(s.dataToCoord(i, !0));
      if (u && u !== "none") {
        var f = XI(a), d = eE[u](s, v, c, h, a.get("seriesDataIndices"), a.ecModel);
        d.style = f, r.graphicKey = d.type, r.pointer = d;
      }
      var g = fd(l.getRect(), n);
      QI(i, r, g, n, a, o);
    }, t.prototype.getHandleTransform = function(r, i, n) {
      var a = fd(i.axis.grid.getRect(), i, {
        labelInside: !1
      });
      a.labelMargin = n.get(["handle", "margin"]);
      var o = dy(i.axis, r, a);
      return {
        x: o[0],
        y: o[1],
        rotation: a.rotation + (a.labelDirection < 0 ? Math.PI : 0)
      };
    }, t.prototype.updateHandleTransform = function(r, i, n, a) {
      var o = n.axis, s = o.grid, l = o.getGlobalExtent(!0), u = Cd(s, o).getOtherAxis(o).getGlobalExtent(), c = o.dim === "x" ? 0 : 1, h = [r.x, r.y];
      h[c] += i[c], h[c] = ar(l[1], h[c]), h[c] = It(l[0], h[c]);
      var v = (u[1] + u[0]) / 2, f = [v, v];
      f[c] = h[c];
      var d = [{
        verticalAlign: "middle"
      }, {
        align: "center"
      }];
      return {
        x: h[0],
        y: h[1],
        rotation: r.rotation,
        cursorPoint: f,
        tooltipOption: d[c]
      };
    }, t;
  })(YI)
);
function Cd(e, t) {
  var r = {};
  return r[t.dim + "AxisIndex"] = t.index, e.getCartesian(r);
}
var eE = {
  line: function(e, t, r, i) {
    var n = KI([t, i[0]], [t, i[1]], Ad(e));
    return {
      type: "Line",
      subPixelOptimize: !0,
      shape: n
    };
  },
  shadow: function(e, t, r, i, n, a) {
    var o = jI(e, n, a), s = i[1] - i[0], l = $I(t, r, o), u = l[0], c = l[1];
    return {
      type: "Rect",
      shape: JI([u, i[0]], [c - u, s], Ad(e))
    };
  }
};
function Ad(e) {
  return e.dim === "x" ? 0 : 1;
}
var rE = (
  /** @class */
  (function(e) {
    Q(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.type = "axisPointer", t.defaultOption = {
      // 'auto' means that show when triggered by tooltip or handle.
      show: "auto",
      // zlevel: 0,
      z: 50,
      type: "line",
      // axispointer triggered by tootip determine snap automatically,
      // see `modelHelper`.
      snap: !1,
      triggerTooltip: !0,
      triggerEmphasis: !0,
      value: null,
      status: null,
      link: [],
      // Do not set 'auto' here, otherwise global animation: false
      // will not effect at this axispointer.
      animation: null,
      animationDurationUpdate: 200,
      lineStyle: {
        color: vt.color.border,
        width: 1,
        type: "dashed"
      },
      shadowStyle: {
        color: vt.color.shadowTint
      },
      label: {
        show: !0,
        formatter: null,
        precision: "auto",
        margin: 3,
        color: vt.color.neutral00,
        padding: [5, 7, 5, 7],
        backgroundColor: vt.color.accent60,
        borderColor: null,
        borderWidth: 0,
        borderRadius: 3
      },
      handle: {
        show: !1,
        // eslint-disable-next-line
        icon: "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z",
        size: 45,
        // handle margin is from symbol center to axis, which is stable when circular move.
        margin: 50,
        // color: '#1b8bbd'
        // color: '#2f4554'
        color: vt.color.accent40,
        // For mobile performance
        throttle: 40
      }
    }, t;
  })(ct)
), ir = st(), iE = A;
function py(e, t, r) {
  if (!K.node) {
    var i = t.getZr();
    ir(i).records || (ir(i).records = {}), nE(i, t);
    var n = ir(i).records[e] || (ir(i).records[e] = {});
    n.handler = r;
  }
}
function nE(e, t) {
  if (ir(e).initialized)
    return;
  ir(e).initialized = !0, r("click", ae(Zl, "click")), r("mousemove", ae(Zl, "mousemove")), r("mousewheel", ae(Zl, "mousewheel")), r("globalout", oE);
  function r(i, n) {
    e.on(i, function(a) {
      var o = sE(t);
      iE(ir(e).records, function(s) {
        s && n(s, a, o.dispatchAction);
      }), aE(o.pendings, t);
    });
  }
}
function aE(e, t) {
  var r = e.showTip.length, i = e.hideTip.length, n;
  r ? n = e.showTip[r - 1] : i && (n = e.hideTip[i - 1]), n && (n.dispatchAction = null, t.dispatchAction(n));
}
function oE(e, t, r) {
  e.handler("leave", null, r);
}
function Zl(e, t, r, i) {
  t.handler(e, r, i);
}
function sE(e) {
  var t = {
    showTip: [],
    hideTip: []
  }, r = function(i) {
    var n = t[i.type];
    n ? n.push(i) : (i.dispatchAction = r, e.dispatchAction(i));
  };
  return {
    dispatchAction: r,
    pendings: t
  };
}
function $u(e, t) {
  if (!K.node) {
    var r = t.getZr(), i = (ir(r).records || {})[e];
    i && (ir(r).records[e] = null);
  }
}
var lE = (
  /** @class */
  (function(e) {
    Q(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.prototype.render = function(r, i, n) {
      var a = i.getComponent("tooltip"), o = r.get("triggerOn") || a && a.get("triggerOn") || "mousemove|click|mousewheel";
      py("axisPointer", n, function(s, l, u) {
        o !== "none" && (s === "leave" || o.indexOf(s) >= 0) && u({
          type: "updateAxisPointer",
          currTrigger: s,
          x: l && l.offsetX,
          y: l && l.offsetY
        });
      });
    }, t.prototype.remove = function(r, i) {
      $u("axisPointer", i);
    }, t.prototype.dispose = function(r, i) {
      $u("axisPointer", i);
    }, t.type = "axisPointer", t;
  })(Ir)
);
function gy(e, t) {
  var r = [], i = e.seriesIndex, n;
  if (i == null || !(n = t.getSeriesByIndex(i)))
    return {
      point: []
    };
  var a = n.getData(), o = pa(a, e);
  if (o == null || o < 0 || F(o))
    return {
      point: []
    };
  var s = a.getItemGraphicEl(o), l = n.coordinateSystem;
  if (n.getTooltipPosition)
    r = n.getTooltipPosition(o) || [];
  else if (l && l.dataToPoint)
    if (e.isStacked) {
      var u = l.getBaseAxis(), c = l.getOtherAxis(u), h = c.dim, v = u.dim, f = h === "x" || h === "radius" ? 1 : 0, d = a.mapDimension(v), g = [];
      g[f] = a.get(d, o), g[1 - f] = a.get(a.getCalculationInfo("stackResultDimension"), o), r = l.dataToPoint(g) || [];
    } else
      r = l.dataToPoint(a.getValues(it(l.dimensions, function(m) {
        return a.mapDimension(m);
      }), o)) || [];
  else if (s) {
    var p = s.getBoundingRect().clone();
    p.applyTransform(s.transform), r = [p.x + p.width / 2, p.y + p.height / 2];
  }
  return {
    point: r,
    el: s
  };
}
var Md = st();
function uE(e, t, r) {
  var i = e.currTrigger, n = [e.x, e.y], a = e, o = e.dispatchAction || ft(r.dispatchAction, r), s = t.getComponent("axisPointer").coordSysAxesInfo;
  if (s) {
    wo(n) && (n = gy({
      seriesIndex: a.seriesIndex,
      // Do not use dataIndexInside from other ec instance.
      // FIXME: auto detect it?
      dataIndex: a.dataIndex
    }, t).point);
    var l = wo(n), u = a.axesInfo, c = s.axesInfo, h = i === "leave" || wo(n), v = {}, f = {}, d = {
      list: [],
      map: {}
    }, g = {
      showPointer: ae(hE, f),
      showTooltip: ae(fE, d)
    };
    A(s.coordSysMap, function(m, y) {
      var _ = l || m.containPoint(n);
      A(s.coordSysAxesInfo[y], function(w, b) {
        var S = w.axis, T = gE(u, w);
        if (!h && _ && (!u || T)) {
          var C = T && T.value;
          C == null && !l && (C = S.pointToData(n)), C != null && Dd(w, C, g, !1, v);
        }
      });
    });
    var p = {};
    return A(c, function(m, y) {
      var _ = m.linkGroup;
      _ && !f[y] && A(_.axesInfo, function(w, b) {
        var S = f[b];
        if (w !== m && S) {
          var T = S.value;
          _.mapper && (T = m.axis.scale.parse(_.mapper(T, kd(w), kd(m)))), p[m.key] = T;
        }
      });
    }), A(p, function(m, y) {
      Dd(c[y], m, g, !0, v);
    }), vE(f, c, v), dE(d, n, e, o), pE(c, o, r), v;
  }
}
function Dd(e, t, r, i, n) {
  var a = e.axis;
  if (!(a.scale.isBlank() || !a.containData(t))) {
    if (!e.involveSeries) {
      r.showPointer(e, t);
      return;
    }
    var o = cE(t, e), s = o.payloadBatch, l = o.snapToValue;
    s[0] && n.seriesIndex == null && P(n, s[0]), !i && e.snap && a.containData(l) && l != null && (t = l), r.showPointer(e, t, s), r.showTooltip(e, o, l);
  }
}
function cE(e, t) {
  var r = t.axis, i = r.dim, n = e, a = [], o = Number.MAX_VALUE, s = -1;
  return A(t.seriesModels, function(l, u) {
    var c = l.getData().mapDimensionsAll(i), h, v;
    if (l.getAxisTooltipData) {
      var f = l.getAxisTooltipData(c, e, r);
      v = f.dataIndices, h = f.nestestValue;
    } else {
      if (v = l.indicesOfNearest(
        i,
        c[0],
        e,
        // Add a threshold to avoid find the wrong dataIndex
        // when data length is not same.
        // false,
        r.type === "category" ? 0.5 : null
      ), !v.length)
        return;
      h = l.getData().get(c[0], v[0]);
    }
    if (an(h)) {
      var d = e - h, g = Math.abs(d);
      g <= o && ((g < o || d >= 0 && s < 0) && (o = g, s = d, n = h, a.length = 0), A(v, function(p) {
        a.push({
          seriesIndex: l.seriesIndex,
          dataIndexInside: p,
          dataIndex: l.getData().getRawIndex(p)
        });
      }));
    }
  }), {
    payloadBatch: a,
    snapToValue: n
  };
}
function hE(e, t, r, i) {
  e[t.key] = {
    value: r,
    payloadBatch: i
  };
}
function fE(e, t, r, i) {
  var n = r.payloadBatch, a = t.axis, o = a.model, s = t.axisPointerModel;
  if (!(!t.triggerTooltip || !n.length)) {
    var l = t.coordSys.model, u = la(l), c = e.map[u];
    c || (c = e.map[u] = {
      coordSysId: l.id,
      coordSysIndex: l.componentIndex,
      coordSysType: l.type,
      coordSysMainType: l.mainType,
      dataByAxis: []
    }, e.list.push(c)), c.dataByAxis.push({
      axisDim: a.dim,
      axisIndex: o.componentIndex,
      axisType: o.type,
      axisId: o.id,
      value: i,
      // Caution: viewHelper.getValueLabel is actually on "view stage", which
      // depends that all models have been updated. So it should not be performed
      // here. Considering axisPointerModel used here is volatile, which is hard
      // to be retrieve in TooltipView, we prepare parameters here.
      valueLabelOpt: {
        precision: s.get(["label", "precision"]),
        formatter: s.get(["label", "formatter"])
      },
      seriesDataIndices: n.slice()
    });
  }
}
function vE(e, t, r) {
  var i = r.axesInfo = [];
  A(t, function(n, a) {
    var o = n.axisPointerModel.option, s = e[a];
    s ? (!n.useHandle && (o.status = "show"), o.value = s.value, o.seriesDataIndices = (s.payloadBatch || []).slice()) : !n.useHandle && (o.status = "hide"), o.status === "show" && i.push({
      axisDim: n.axis.dim,
      axisIndex: n.axis.model.componentIndex,
      value: o.value
    });
  });
}
function dE(e, t, r, i) {
  if (wo(t) || !e.list.length) {
    i({
      type: "hideTip"
    });
    return;
  }
  var n = ((e.list[0].dataByAxis[0] || {}).seriesDataIndices || [])[0] || {};
  i({
    type: "showTip",
    escapeConnect: !0,
    x: t[0],
    y: t[1],
    tooltipOption: r.tooltipOption,
    position: r.position,
    dataIndexInside: n.dataIndexInside,
    dataIndex: n.dataIndex,
    seriesIndex: n.seriesIndex,
    dataByCoordSys: e.list
  });
}
function pE(e, t, r) {
  var i = r.getZr(), n = "axisPointerLastHighlights", a = Md(i)[n] || {}, o = Md(i)[n] = {};
  A(e, function(c, h) {
    var v = c.axisPointerModel.option;
    v.status === "show" && c.triggerEmphasis && A(v.seriesDataIndices, function(f) {
      o[f.seriesIndex + "|" + f.dataIndex] = f;
    });
  });
  var s = [], l = [];
  function u(c) {
    return {
      seriesIndex: c.seriesIndex,
      dataIndex: c.dataIndex
    };
  }
  A(a, function(c, h) {
    !o[h] && l.push(u(c));
  }), A(o, function(c, h) {
    !a[h] && s.push(u(c));
  }), l.length && r.dispatchAction({
    type: "downplay",
    escapeConnect: !0,
    // Not blur others when highlight in axisPointer.
    notBlur: !0,
    batch: l
  }), s.length && r.dispatchAction({
    type: "highlight",
    escapeConnect: !0,
    // Not blur others when highlight in axisPointer.
    notBlur: !0,
    batch: s
  });
}
function gE(e, t) {
  for (var r = 0; r < (e || []).length; r++) {
    var i = e[r];
    if (t.axis.dim === i.axisDim && t.axis.model.componentIndex === i.axisIndex)
      return i;
  }
}
function kd(e) {
  var t = e.axis.model, r = {}, i = r.axisDim = e.axis.dim;
  return r.axisIndex = r[i + "AxisIndex"] = t.componentIndex, r.axisName = r[i + "AxisName"] = t.name, r.axisId = r[i + "AxisId"] = t.id, r;
}
function wo(e) {
  return !e || e[0] == null || isNaN(e[0]) || e[1] == null || isNaN(e[1]);
}
function mE(e) {
  NI.registerAxisPointerClass("CartesianAxisPointer", tE), e.registerComponentModel(rE), e.registerComponentView(lE), e.registerPreprocessor(function(t) {
    if (t) {
      (!t.axisPointer || t.axisPointer.length === 0) && (t.axisPointer = {});
      var r = t.axisPointer.link;
      r && !F(r) && (t.axisPointer.link = [r]);
    }
  }), e.registerProcessor(e.PRIORITY.PROCESSOR.STATISTIC, {
    overallReset: function(t, r) {
      t.getComponent("axisPointer").coordSysAxesInfo = LI(t, r);
    }
  }), e.registerAction({
    type: "updateAxisPointer",
    event: "updateAxisPointer",
    update: ":updateAxisPointer"
  }, uE);
}
var yE = (
  /** @class */
  (function(e) {
    Q(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.type = "tooltip", t.dependencies = ["axisPointer"], t.defaultOption = {
      // zlevel: 0,
      z: 60,
      show: !0,
      // tooltip main content
      showContent: !0,
      // 'trigger' only works on coordinate system.
      // 'item' | 'axis' | 'none'
      trigger: "item",
      // 'click' | 'mousemove' | 'none'
      triggerOn: "mousemove|click|mousewheel",
      alwaysShowContent: !1,
      renderMode: "auto",
      // whether restraint content inside viewRect.
      // If renderMode: 'richText', default true.
      // If renderMode: 'html', defaults to `false` (for backward compat).
      confine: null,
      showDelay: 0,
      hideDelay: 100,
      // Animation transition time, unit is second
      transitionDuration: 0.4,
      displayTransition: !0,
      enterable: !1,
      backgroundColor: vt.color.neutral00,
      // box shadow
      shadowBlur: 10,
      shadowColor: "rgba(0, 0, 0, .2)",
      shadowOffsetX: 1,
      shadowOffsetY: 2,
      // tooltip border radius, unit is px, default is 4
      borderRadius: 4,
      // tooltip border width, unit is px, default is 0 (no border)
      borderWidth: 1,
      defaultBorderColor: vt.color.border,
      // Tooltip inside padding, default is 5 for all direction
      // Array is allowed to set up, right, bottom, left, same with css
      // The default value: See `tooltip/tooltipMarkup.ts#getPaddingFromTooltipModel`.
      padding: null,
      // Extra css text
      extraCssText: "",
      // axis indicator, trigger by axis
      axisPointer: {
        // default is line
        // legal values: 'line' | 'shadow' | 'cross'
        type: "line",
        // Valid when type is line, appoint tooltip line locate on which line. Optional
        // legal values: 'x' | 'y' | 'angle' | 'radius' | 'auto'
        // default is 'auto', chose the axis which type is category.
        // for multiply y axis, cartesian coord chose x axis, polar chose angle axis
        axis: "auto",
        animation: "auto",
        animationDurationUpdate: 200,
        animationEasingUpdate: "exponentialOut",
        crossStyle: {
          color: vt.color.borderShade,
          width: 1,
          type: "dashed",
          // TODO formatter
          textStyle: {}
        }
        // lineStyle and shadowStyle should not be specified here,
        // otherwise it will always override those styles on option.axisPointer.
      },
      textStyle: {
        color: vt.color.tertiary,
        fontSize: 14
      }
    }, t;
  })(ct)
);
function my(e) {
  var t = e.get("confine");
  return t != null ? !!t : e.get("renderMode") === "richText";
}
function yy(e) {
  if (K.domSupported) {
    for (var t = document.documentElement.style, r = 0, i = e.length; r < i; r++)
      if (e[r] in t)
        return e[r];
  }
}
var _y = yy(["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]), _E = yy(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]);
function wy(e, t) {
  if (!e)
    return t;
  t = kg(t, !0);
  var r = e.indexOf(t);
  return e = r === -1 ? t : "-" + e.slice(0, r) + "-" + t, e.toLowerCase();
}
function wE(e, t) {
  var r = e.currentStyle || document.defaultView && document.defaultView.getComputedStyle(e);
  return r ? r[t] : null;
}
var bE = wy(_E, "transition"), sh = wy(_y, "transform"), SE = "position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;" + (K.transform3dSupported ? "will-change:transform;" : "");
function xE(e) {
  return e = e === "left" ? "right" : e === "right" ? "left" : e === "top" ? "bottom" : "top", e;
}
function TE(e, t, r) {
  if (!X(r) || r === "inside")
    return "";
  var i = e.get("backgroundColor"), n = e.get("borderWidth");
  t = na(t);
  var a = xE(r), o = Math.max(Math.round(n) * 1.5, 6), s = "", l = sh + ":", u;
  dt(["left", "right"], a) > -1 ? (s += "top:50%", l += "translateY(-50%) rotate(" + (u = a === "left" ? -225 : -45) + "deg)") : (s += "left:50%", l += "translateX(-50%) rotate(" + (u = a === "top" ? 225 : 45) + "deg)");
  var c = u * Math.PI / 180, h = o + n, v = h * Math.abs(Math.cos(c)) + h * Math.abs(Math.sin(c)), f = Math.round(((v - Math.SQRT2 * n) / 2 + Math.SQRT2 * n - (v - h) / 2) * 100) / 100;
  s += ";" + a + ":-" + f + "px";
  var d = t + " solid " + n + "px;", g = ["position:absolute;width:" + o + "px;height:" + o + "px;z-index:-1;", s + ";" + l + ";", "border-bottom:" + d, "border-right:" + d, "background-color:" + i + ";"];
  return '<div style="' + g.join("") + '"></div>';
}
function CE(e, t, r) {
  var i = "cubic-bezier(0.23,1,0.32,1)", n = "", a = "";
  return r && (n = " " + e / 2 + "s " + i, a = "opacity" + n + ",visibility" + n), t || (n = " " + e + "s " + i, a += (a.length ? "," : "") + (K.transformSupported ? "" + sh + n : ",left" + n + ",top" + n)), bE + ":" + a;
}
function Ld(e, t, r) {
  var i = e.toFixed(0) + "px", n = t.toFixed(0) + "px";
  if (!K.transformSupported)
    return r ? "top:" + n + ";left:" + i + ";" : [["top", n], ["left", i]];
  var a = K.transform3dSupported, o = "translate" + (a ? "3d" : "") + "(" + i + "," + n + (a ? ",0" : "") + ")";
  return r ? "top:0;left:0;" + sh + ":" + o + ";" : [["top", 0], ["left", 0], [_y, o]];
}
function AE(e) {
  var t = [], r = e.get("fontSize"), i = e.getTextColor();
  i && t.push("color:" + i), t.push("font:" + e.getFont());
  var n = W(e.get("lineHeight"), Math.round(r * 3 / 2));
  r && t.push("line-height:" + n + "px");
  var a = e.get("textShadowColor"), o = e.get("textShadowBlur") || 0, s = e.get("textShadowOffsetX") || 0, l = e.get("textShadowOffsetY") || 0;
  return a && o && t.push("text-shadow:" + s + "px " + l + "px " + o + "px " + a), A(["decoration", "align"], function(u) {
    var c = e.get(u);
    c && t.push("text-" + u + ":" + c);
  }), t.join(";");
}
function ME(e, t, r, i) {
  var n = [], a = e.get("transitionDuration"), o = e.get("backgroundColor"), s = e.get("shadowBlur"), l = e.get("shadowColor"), u = e.get("shadowOffsetX"), c = e.get("shadowOffsetY"), h = e.getModel("textStyle"), v = am(e, "html"), f = u + "px " + c + "px " + s + "px " + l;
  return n.push("box-shadow:" + f), t && a > 0 && n.push(CE(a, r, i)), o && n.push("background-color:" + o), A(["width", "color", "radius"], function(d) {
    var g = "border-" + d, p = kg(g), m = e.get(p);
    m != null && n.push(g + ":" + m + (d === "color" ? "" : "px"));
  }), n.push(AE(h)), v != null && n.push("padding:" + Gc(v).join("px ") + "px"), n.join(";") + ";";
}
function Id(e, t, r, i, n) {
  var a = t && t.painter;
  if (r) {
    var o = a && a.getViewportRoot();
    o && rx(e, o, r, i, n);
  } else {
    e[0] = i, e[1] = n;
    var s = a && a.getViewportRootOffset();
    s && (e[0] += s.offsetLeft, e[1] += s.offsetTop);
  }
  e[2] = e[0] / t.getWidth(), e[3] = e[1] / t.getHeight();
}
var DE = (
  /** @class */
  (function() {
    function e(t, r) {
      if (this._show = !1, this._styleCoord = [0, 0, 0, 0], this._enterable = !0, this._alwaysShowContent = !1, this._firstShow = !0, this._longHide = !0, K.wxa)
        return null;
      var i = document.createElement("div");
      i.domBelongToZr = !0, this.el = i;
      var n = this._zr = t.getZr(), a = r.appendTo, o = a && (X(a) ? document.querySelector(a) : jn(a) ? a : at(a) && a(t.getDom()));
      Id(this._styleCoord, n, o, t.getWidth() / 2, t.getHeight() / 2), (o || t.getDom()).appendChild(i), this._api = t, this._container = o;
      var s = this;
      i.onmouseenter = function() {
        s._enterable && (clearTimeout(s._hideTimeout), s._show = !0), s._inContent = !0;
      }, i.onmousemove = function(l) {
        if (l = l || window.event, !s._enterable) {
          var u = n.handler, c = n.painter.getViewportRoot();
          he(c, l, !0), u.dispatch("mousemove", l);
        }
      }, i.onmouseleave = function() {
        s._inContent = !1, s._enterable && s._show && s.hideLater(s._hideDelay);
      };
    }
    return e.prototype.update = function(t) {
      if (!this._container) {
        var r = this._api.getDom(), i = wE(r, "position"), n = r.style;
        n.position !== "absolute" && i !== "absolute" && (n.position = "relative");
      }
      var a = t.get("alwaysShowContent");
      a && this._moveIfResized(), this._alwaysShowContent = a, this._enableDisplayTransition = t.get("displayTransition") && t.get("transitionDuration") > 0, this.el.className = t.get("className") || "";
    }, e.prototype.show = function(t, r) {
      clearTimeout(this._hideTimeout), clearTimeout(this._longHideTimeout);
      var i = this.el, n = i.style, a = this._styleCoord;
      i.innerHTML ? n.cssText = SE + ME(t, !this._firstShow, this._longHide, this._enableDisplayTransition) + Ld(a[0], a[1], !0) + ("border-color:" + na(r) + ";") + (t.get("extraCssText") || "") + (";pointer-events:" + (this._enterable ? "auto" : "none")) : n.display = "none", this._show = !0, this._firstShow = !1, this._longHide = !1;
    }, e.prototype.setContent = function(t, r, i, n, a) {
      var o = this.el;
      if (t == null) {
        o.innerHTML = "";
        return;
      }
      var s = "";
      if (X(a) && i.get("trigger") === "item" && !my(i) && (s = TE(i, n, a)), X(t))
        o.innerHTML = t + s;
      else if (t) {
        o.innerHTML = "", F(t) || (t = [t]);
        for (var l = 0; l < t.length; l++)
          jn(t[l]) && t[l].parentNode !== o && o.appendChild(t[l]);
        if (s && o.childNodes.length) {
          var u = document.createElement("div");
          u.innerHTML = s, o.appendChild(u);
        }
      }
    }, e.prototype.setEnterable = function(t) {
      this._enterable = t;
    }, e.prototype.getSize = function() {
      var t = this.el;
      return t ? [t.offsetWidth, t.offsetHeight] : [0, 0];
    }, e.prototype.moveTo = function(t, r) {
      if (this.el) {
        var i = this._styleCoord;
        if (Id(i, this._zr, this._container, t, r), i[0] != null && i[1] != null) {
          var n = this.el.style, a = Ld(i[0], i[1]);
          A(a, function(o) {
            n[o[0]] = o[1];
          });
        }
      }
    }, e.prototype._moveIfResized = function() {
      var t = this._styleCoord[2], r = this._styleCoord[3];
      this.moveTo(t * this._zr.getWidth(), r * this._zr.getHeight());
    }, e.prototype.hide = function() {
      var t = this, r = this.el.style;
      this._enableDisplayTransition ? (r.visibility = "hidden", r.opacity = "0") : r.display = "none", K.transform3dSupported && (r.willChange = ""), this._show = !1, this._longHideTimeout = setTimeout(function() {
        return t._longHide = !0;
      }, 500);
    }, e.prototype.hideLater = function(t) {
      this._show && !(this._inContent && this._enterable) && !this._alwaysShowContent && (t ? (this._hideDelay = t, this._show = !1, this._hideTimeout = setTimeout(ft(this.hide, this), t)) : this.hide());
    }, e.prototype.isShow = function() {
      return this._show;
    }, e.prototype.dispose = function() {
      clearTimeout(this._hideTimeout), clearTimeout(this._longHideTimeout);
      var t = this._zr;
      ix(t && t.painter && t.painter.getViewportRoot(), this._container);
      var r = this.el;
      if (r) {
        r.onmouseenter = r.onmousemove = r.onmouseleave = null;
        var i = r.parentNode;
        i && i.removeChild(r);
      }
      this.el = this._container = null;
    }, e;
  })()
), kE = (
  /** @class */
  (function() {
    function e(t) {
      this._show = !1, this._styleCoord = [0, 0, 0, 0], this._alwaysShowContent = !1, this._enterable = !0, this._zr = t.getZr(), Pd(this._styleCoord, this._zr, t.getWidth() / 2, t.getHeight() / 2);
    }
    return e.prototype.update = function(t) {
      var r = t.get("alwaysShowContent");
      r && this._moveIfResized(), this._alwaysShowContent = r;
    }, e.prototype.show = function() {
      this._hideTimeout && clearTimeout(this._hideTimeout), this.el.show(), this._show = !0;
    }, e.prototype.setContent = function(t, r, i, n, a) {
      var o = this;
      H(t) && Jt(""), this.el && this._zr.remove(this.el);
      var s = i.getModel("textStyle");
      this.el = new xe({
        style: {
          rich: r.richTextStyles,
          text: t,
          lineHeight: 22,
          borderWidth: 1,
          borderColor: n,
          textShadowColor: s.get("textShadowColor"),
          fill: i.get(["textStyle", "color"]),
          padding: am(i, "richText"),
          verticalAlign: "top",
          align: "left"
        },
        z: i.get("z")
      }), A(["backgroundColor", "borderRadius", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"], function(u) {
        o.el.style[u] = i.get(u);
      }), A(["textShadowBlur", "textShadowOffsetX", "textShadowOffsetY"], function(u) {
        o.el.style[u] = s.get(u) || 0;
      }), this._zr.add(this.el);
      var l = this;
      this.el.on("mouseover", function() {
        l._enterable && (clearTimeout(l._hideTimeout), l._show = !0), l._inContent = !0;
      }), this.el.on("mouseout", function() {
        l._enterable && l._show && l.hideLater(l._hideDelay), l._inContent = !1;
      });
    }, e.prototype.setEnterable = function(t) {
      this._enterable = t;
    }, e.prototype.getSize = function() {
      var t = this.el, r = this.el.getBoundingRect(), i = Ed(t.style);
      return [r.width + i.left + i.right, r.height + i.top + i.bottom];
    }, e.prototype.moveTo = function(t, r) {
      var i = this.el;
      if (i) {
        var n = this._styleCoord;
        Pd(n, this._zr, t, r), t = n[0], r = n[1];
        var a = i.style, o = yr(a.borderWidth || 0), s = Ed(a);
        i.x = t + o + s.left, i.y = r + o + s.top, i.markRedraw();
      }
    }, e.prototype._moveIfResized = function() {
      var t = this._styleCoord[2], r = this._styleCoord[3];
      this.moveTo(t * this._zr.getWidth(), r * this._zr.getHeight());
    }, e.prototype.hide = function() {
      this.el && this.el.hide(), this._show = !1;
    }, e.prototype.hideLater = function(t) {
      this._show && !(this._inContent && this._enterable) && !this._alwaysShowContent && (t ? (this._hideDelay = t, this._show = !1, this._hideTimeout = setTimeout(ft(this.hide, this), t)) : this.hide());
    }, e.prototype.isShow = function() {
      return this._show;
    }, e.prototype.dispose = function() {
      this._zr.remove(this.el);
    }, e;
  })()
);
function yr(e) {
  return Math.max(0, e);
}
function Ed(e) {
  var t = yr(e.shadowBlur || 0), r = yr(e.shadowOffsetX || 0), i = yr(e.shadowOffsetY || 0);
  return {
    left: yr(t - r),
    right: yr(t + r),
    top: yr(t - i),
    bottom: yr(t + i)
  };
}
function Pd(e, t, r, i) {
  e[0] = r, e[1] = i, e[2] = e[0] / t.getWidth(), e[3] = e[1] / t.getHeight();
}
var LE = new oe({
  shape: {
    x: -1,
    y: -1,
    width: 2,
    height: 2
  }
}), IE = (
  /** @class */
  (function(e) {
    Q(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.prototype.init = function(r, i) {
      if (!(K.node || !i.getDom())) {
        var n = r.getComponent("tooltip"), a = this._renderMode = qT(n.get("renderMode"));
        this._tooltipContent = a === "richText" ? new kE(i) : new DE(i, {
          appendTo: n.get("appendToBody", !0) ? "body" : n.get("appendTo", !0)
        });
      }
    }, t.prototype.render = function(r, i, n) {
      if (!(K.node || !n.getDom())) {
        this.group.removeAll(), this._tooltipModel = r, this._ecModel = i, this._api = n;
        var a = this._tooltipContent;
        a.update(r), a.setEnterable(r.get("enterable")), this._initGlobalListener(), this._keepShow(), this._renderMode !== "richText" && r.get("transitionDuration") ? lm(this, "_updatePosition", 50, "fixRate") : zu(this, "_updatePosition");
      }
    }, t.prototype._initGlobalListener = function() {
      var r = this._tooltipModel, i = r.get("triggerOn");
      py("itemTooltip", this._api, ft(function(n, a, o) {
        i !== "none" && (i.indexOf(n) >= 0 ? this._tryShow(a, o) : n === "leave" && this._hide(o));
      }, this));
    }, t.prototype._keepShow = function() {
      var r = this._tooltipModel, i = this._ecModel, n = this._api, a = r.get("triggerOn");
      if (r.get("trigger") !== "axis" && (this._lastDataByCoordSys = null, this._cbParamsList = null), this._lastX != null && this._lastY != null && a !== "none" && a !== "click") {
        var o = this;
        clearTimeout(this._refreshUpdateTimeout), this._refreshUpdateTimeout = setTimeout(function() {
          !n.isDisposed() && o.manuallyShowTip(r, i, n, {
            x: o._lastX,
            y: o._lastY,
            dataByCoordSys: o._lastDataByCoordSys
          });
        });
      }
    }, t.prototype.manuallyShowTip = function(r, i, n, a) {
      if (!(a.from === this.uid || K.node || !n.getDom())) {
        var o = Rd(a, n);
        this._ticket = "";
        var s = a.dataByCoordSys, l = OE(a, i, n);
        if (l) {
          var u = l.el.getBoundingRect().clone();
          u.applyTransform(l.el.transform), this._tryShow({
            offsetX: u.x + u.width / 2,
            offsetY: u.y + u.height / 2,
            target: l.el,
            position: a.position,
            // When manully trigger, the mouse is not on the el, so we'd better to
            // position tooltip on the bottom of the el and display arrow is possible.
            positionDefault: "bottom"
          }, o);
        } else if (a.tooltip && a.x != null && a.y != null) {
          var c = LE;
          c.x = a.x, c.y = a.y, c.update(), xt(c).tooltipConfig = {
            name: null,
            option: a.tooltip
          }, this._tryShow({
            offsetX: a.x,
            offsetY: a.y,
            target: c
          }, o);
        } else if (s)
          this._tryShow({
            offsetX: a.x,
            offsetY: a.y,
            position: a.position,
            dataByCoordSys: s,
            tooltipOption: a.tooltipOption
          }, o);
        else if (a.seriesIndex != null) {
          if (this._manuallyAxisShowTip(r, i, n, a))
            return;
          var h = gy(a, i), v = h.point[0], f = h.point[1];
          v != null && f != null && this._tryShow({
            offsetX: v,
            offsetY: f,
            target: h.el,
            position: a.position,
            // When manully trigger, the mouse is not on the el, so we'd better to
            // position tooltip on the bottom of the el and display arrow is possible.
            positionDefault: "bottom"
          }, o);
        } else a.x != null && a.y != null && (n.dispatchAction({
          type: "updateAxisPointer",
          x: a.x,
          y: a.y
        }), this._tryShow({
          offsetX: a.x,
          offsetY: a.y,
          position: a.position,
          target: n.getZr().findHover(a.x, a.y).target
        }, o));
      }
    }, t.prototype.manuallyHideTip = function(r, i, n, a) {
      var o = this._tooltipContent;
      this._tooltipModel && o.hideLater(this._tooltipModel.get("hideDelay")), this._lastX = this._lastY = this._lastDataByCoordSys = null, this._cbParamsList = null, a.from !== this.uid && this._hide(Rd(a, n));
    }, t.prototype._manuallyAxisShowTip = function(r, i, n, a) {
      var o = a.seriesIndex, s = a.dataIndex, l = i.getComponent("axisPointer").coordSysAxesInfo;
      if (!(o == null || s == null || l == null)) {
        var u = i.getSeriesByIndex(o);
        if (u) {
          var c = u.getData(), h = Dn([c.getItemModel(s), u, (u.coordinateSystem || {}).model], this._tooltipModel);
          if (h.get("trigger") === "axis")
            return n.dispatchAction({
              type: "updateAxisPointer",
              seriesIndex: o,
              dataIndex: s,
              position: a.position
            }), !0;
        }
      }
    }, t.prototype._tryShow = function(r, i) {
      var n = r.target, a = this._tooltipModel;
      if (a) {
        this._lastX = r.offsetX, this._lastY = r.offsetY;
        var o = r.dataByCoordSys;
        if (o && o.length)
          this._showAxisTooltip(o, r);
        else if (n) {
          var s = xt(n);
          if (s.ssrType === "legend")
            return;
          this._lastDataByCoordSys = null, this._cbParamsList = null;
          var l, u;
          Bn(n, function(c) {
            if (c.tooltipDisabled)
              return l = u = null, !0;
            l || u || (xt(c).dataIndex != null ? l = c : xt(c).tooltipConfig != null && (u = c));
          }, !0), l ? this._showSeriesItemTooltip(r, l, i) : u ? this._showComponentItemTooltip(r, u, i) : this._hide(i);
        } else
          this._lastDataByCoordSys = null, this._cbParamsList = null, this._hide(i);
      }
    }, t.prototype._showOrMove = function(r, i) {
      var n = r.get("showDelay");
      i = ft(i, this), clearTimeout(this._showTimout), n > 0 ? this._showTimout = setTimeout(i, n) : i();
    }, t.prototype._showAxisTooltip = function(r, i) {
      var n = this._ecModel, a = this._tooltipModel, o = [i.offsetX, i.offsetY], s = Dn([i.tooltipOption], a), l = this._renderMode, u = [], c = oa("section", {
        blocks: [],
        noHeader: !0
      }), h = [], v = new Ml();
      A(r, function(y) {
        A(y.dataByAxis, function(_) {
          var w = n.getComponent(_.axisDim + "Axis", _.axisIndex), b = _.value, S = w.axis, T = S.scale.parse(b);
          if (!(!w || b == null)) {
            var C = vy(b, S, n, _.seriesDataIndices, _.valueLabelOpt), x = oa("section", {
              header: C,
              noHeader: !Be(C),
              sortBlocks: !0,
              blocks: []
            });
            c.blocks.push(x), A(_.seriesDataIndices, function(M) {
              var D = n.getSeriesByIndex(M.seriesIndex), I = M.dataIndexInside, k = D.getDataParams(I);
              if (!(k.dataIndex < 0)) {
                k.axisDim = _.axisDim, k.axisIndex = _.axisIndex, k.axisType = _.axisType, k.axisId = _.axisId, k.axisValue = Ym(w.axis, {
                  value: T
                }), k.axisValueLabel = C, k.marker = v.makeTooltipMarker("item", na(k.color), l);
                var L = gv(D.formatTooltip(I, !0, null)), B = L.frag;
                if (B) {
                  var N = Dn([D], a).get("valueFormatter");
                  x.blocks.push(N ? P({
                    valueFormatter: N
                  }, B) : B);
                }
                L.text && h.push(L.text), u.push(k);
              }
            });
          }
        });
      }), c.blocks.reverse(), h.reverse();
      var f = i.position, d = s.get("order"), g = bv(c, v, l, d, n.get("useUTC"), s.get("textStyle"));
      g && h.unshift(g);
      var p = l === "richText" ? `

` : "<br/>", m = h.join(p);
      this._showOrMove(s, function() {
        this._updateContentNotChangedOnAxis(r, u) ? this._updatePosition(s, f, o[0], o[1], this._tooltipContent, u) : this._showTooltipContent(s, m, u, Math.random() + "", o[0], o[1], f, null, v);
      });
    }, t.prototype._showSeriesItemTooltip = function(r, i, n) {
      var a = this._ecModel, o = xt(i), s = o.seriesIndex, l = a.getSeriesByIndex(s), u = o.dataModel || l, c = o.dataIndex, h = o.dataType, v = u.getData(h), f = this._renderMode, d = r.positionDefault, g = Dn([v.getItemModel(c), u, l && (l.coordinateSystem || {}).model], this._tooltipModel, d ? {
        position: d
      } : null), p = g.get("trigger");
      if (!(p != null && p !== "item")) {
        var m = u.getDataParams(c, h), y = new Ml();
        m.marker = y.makeTooltipMarker("item", na(m.color), f);
        var _ = gv(u.formatTooltip(c, !1, h)), w = g.get("order"), b = g.get("valueFormatter"), S = _.frag, T = S ? bv(b ? P({
          valueFormatter: b
        }, S) : S, y, f, w, a.get("useUTC"), g.get("textStyle")) : _.text, C = "item_" + u.name + "_" + c;
        this._showOrMove(g, function() {
          this._showTooltipContent(g, T, m, C, r.offsetX, r.offsetY, r.position, r.target, y);
        }), n({
          type: "showTip",
          dataIndexInside: c,
          dataIndex: v.getRawIndex(c),
          seriesIndex: s,
          from: this.uid
        });
      }
    }, t.prototype._showComponentItemTooltip = function(r, i, n) {
      var a = this._renderMode === "html", o = xt(i), s = o.tooltipConfig, l = s.option || {}, u = l.encodeHTMLContent;
      if (X(l)) {
        var c = l;
        l = {
          content: c,
          // Fixed formatter
          formatter: c
        }, u = !0;
      }
      u && a && l.content && (l = tt(l), l.content = Qt(l.content));
      var h = [l], v = this._ecModel.getComponent(o.componentMainType, o.componentIndex);
      v && h.push(v), h.push({
        formatter: l.content
      });
      var f = r.positionDefault, d = Dn(h, this._tooltipModel, f ? {
        position: f
      } : null), g = d.get("content"), p = Math.random() + "", m = new Ml();
      this._showOrMove(d, function() {
        var y = tt(d.get("formatterParams") || {});
        this._showTooltipContent(d, g, y, p, r.offsetX, r.offsetY, r.position, i, m);
      }), n({
        type: "showTip",
        from: this.uid
      });
    }, t.prototype._showTooltipContent = function(r, i, n, a, o, s, l, u, c) {
      if (this._ticket = "", !(!r.get("showContent") || !r.get("show"))) {
        var h = this._tooltipContent;
        h.setEnterable(r.get("enterable"));
        var v = r.get("formatter");
        l = l || r.get("position");
        var f = i, d = this._getNearestPoint([o, s], n, r.get("trigger"), r.get("borderColor"), r.get("defaultBorderColor", !0)), g = d.color;
        if (v)
          if (X(v)) {
            var p = r.ecModel.get("useUTC"), m = F(n) ? n[0] : n, y = m && m.axisType && m.axisType.indexOf("time") >= 0;
            f = v, y && (f = Dg(m.axisValue, f, p)), f = Lg(f, n, !0);
          } else if (at(v)) {
            var _ = ft(function(w, b) {
              w === this._ticket && (h.setContent(b, c, r, g, l), this._updatePosition(r, l, o, s, h, n, u));
            }, this);
            this._ticket = a, f = v(n, a, _);
          } else
            f = v;
        h.setContent(f, c, r, g, l), h.show(r, g), this._updatePosition(r, l, o, s, h, n, u);
      }
    }, t.prototype._getNearestPoint = function(r, i, n, a, o) {
      if (n === "axis" || F(i))
        return {
          color: a || o
        };
      if (!F(i))
        return {
          color: a || i.color || i.borderColor
        };
    }, t.prototype._updatePosition = function(r, i, n, a, o, s, l) {
      var u = this._api.getWidth(), c = this._api.getHeight();
      i = i || r.get("position");
      var h = o.getSize(), v = r.get("align"), f = r.get("verticalAlign"), d = l && l.getBoundingRect().clone();
      if (l && d.applyTransform(l.transform), at(i) && (i = i([n, a], s, o.el, d, {
        viewSize: [u, c],
        contentSize: h.slice()
      })), F(i))
        n = Ct(i[0], u), a = Ct(i[1], c);
      else if (H(i)) {
        var g = i;
        g.width = h[0], g.height = h[1];
        var p = Ru(g, {
          width: u,
          height: c
        });
        n = p.x, a = p.y, v = null, f = null;
      } else if (X(i) && l) {
        var m = RE(i, d, h, r.get("borderWidth"));
        n = m[0], a = m[1];
      } else {
        var m = EE(n, a, o, u, c, v ? null : 20, f ? null : 20);
        n = m[0], a = m[1];
      }
      if (v && (n -= Od(v) ? h[0] / 2 : v === "right" ? h[0] : 0), f && (a -= Od(f) ? h[1] / 2 : f === "bottom" ? h[1] : 0), my(r)) {
        var m = PE(n, a, o, u, c);
        n = m[0], a = m[1];
      }
      o.moveTo(n, a);
    }, t.prototype._updateContentNotChangedOnAxis = function(r, i) {
      var n = this._lastDataByCoordSys, a = this._cbParamsList, o = !!n && n.length === r.length;
      return o && A(n, function(s, l) {
        var u = s.dataByAxis || [], c = r[l] || {}, h = c.dataByAxis || [];
        o = o && u.length === h.length, o && A(u, function(v, f) {
          var d = h[f] || {}, g = v.seriesDataIndices || [], p = d.seriesDataIndices || [];
          o = o && v.value === d.value && v.axisType === d.axisType && v.axisId === d.axisId && g.length === p.length, o && A(g, function(m, y) {
            var _ = p[y];
            o = o && m.seriesIndex === _.seriesIndex && m.dataIndex === _.dataIndex;
          }), a && A(v.seriesDataIndices, function(m) {
            var y = m.seriesIndex, _ = i[y], w = a[y];
            _ && w && w.data !== _.data && (o = !1);
          });
        });
      }), this._lastDataByCoordSys = r, this._cbParamsList = i, !!o;
    }, t.prototype._hide = function(r) {
      this._lastDataByCoordSys = null, this._cbParamsList = null, r({
        type: "hideTip",
        from: this.uid
      });
    }, t.prototype.dispose = function(r, i) {
      K.node || !i.getDom() || (zu(this, "_updatePosition"), this._tooltipContent.dispose(), $u("itemTooltip", i), this._tooltipContent = null, this._tooltipModel = null, this._lastDataByCoordSys = null, this._cbParamsList = null);
    }, t.type = "tooltip", t;
  })(Ir)
);
function Dn(e, t, r) {
  var i = t.ecModel, n;
  r ? (n = new mt(r, i, i), n = new mt(t.option, n, i)) : n = t;
  for (var a = e.length - 1; a >= 0; a--) {
    var o = e[a];
    o && (o instanceof mt && (o = o.get("tooltip", !0)), X(o) && (o = {
      formatter: o
    }), o && (n = new mt(o, n, i)));
  }
  return n;
}
function Rd(e, t) {
  return e.dispatchAction || ft(t.dispatchAction, t);
}
function EE(e, t, r, i, n, a, o) {
  var s = r.getSize(), l = s[0], u = s[1];
  return a != null && (e + l + a + 2 > i ? e -= l + a : e += a), o != null && (t + u + o > n ? t -= u + o : t += o), [e, t];
}
function PE(e, t, r, i, n) {
  var a = r.getSize(), o = a[0], s = a[1];
  return e = Math.min(e + o, i) - o, t = Math.min(t + s, n) - s, e = Math.max(e, 0), t = Math.max(t, 0), [e, t];
}
function RE(e, t, r, i) {
  var n = r[0], a = r[1], o = Math.ceil(Math.SQRT2 * i) + 8, s = 0, l = 0, u = t.width, c = t.height;
  switch (e) {
    case "inside":
      s = t.x + u / 2 - n / 2, l = t.y + c / 2 - a / 2;
      break;
    case "top":
      s = t.x + u / 2 - n / 2, l = t.y - a - o;
      break;
    case "bottom":
      s = t.x + u / 2 - n / 2, l = t.y + c + o;
      break;
    case "left":
      s = t.x - n - o, l = t.y + c / 2 - a / 2;
      break;
    case "right":
      s = t.x + u + o, l = t.y + c / 2 - a / 2;
  }
  return [s, l];
}
function Od(e) {
  return e === "center" || e === "middle";
}
function OE(e, t, r) {
  var i = wc(e).queryOptionMap, n = i.keys()[0];
  if (!(!n || n === "series")) {
    var a = ga(t, n, i.get(n), {
      useDefault: !1,
      enableAll: !1,
      enableNone: !1
    }), o = a.models[0];
    if (o) {
      var s = r.getViewOfComponentModel(o), l;
      if (s.group.traverse(function(u) {
        var c = xt(u).tooltipConfig;
        if (c && c.name === e.name)
          return l = u, !0;
      }), l)
        return {
          componentMainType: n,
          componentIndex: o.componentIndex,
          el: l
        };
    }
  }
}
function BE(e) {
  ih(mE), e.registerComponentModel(yE), e.registerComponentView(IE), e.registerAction({
    type: "showTip",
    event: "showTip",
    update: "tooltip:manuallyShowTip"
  }, $t), e.registerAction({
    type: "hideTip",
    event: "hideTip",
    update: "tooltip:manuallyHideTip"
  }, $t);
}
var NE = Object.defineProperty, FE = Object.getOwnPropertyDescriptor, lh = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? FE(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (i ? o(t, r, n) : o(n)) || n);
  return i && n && NE(t, r, n), n;
};
ih([kI, BE, GI]);
let ua = class extends Ue {
  constructor() {
    super(...arguments), this.items = [], this.language = "en";
  }
  firstUpdated() {
    this.initializeChart();
  }
  connectedCallback() {
    super.connectedCallback(), this.hasUpdated && this.updateComplete.then(() => {
      this.isConnected && this.initializeChart();
    });
  }
  initializeChart() {
    if (!this.isConnected || this.chart) return;
    const e = this.renderRoot.querySelector(".chart");
    e && (this.chart = jk(e, void 0, { renderer: "canvas" }), this.resizeObserver = new ResizeObserver(() => this.chart?.resize()), this.resizeObserver.observe(e), this.updateChart());
  }
  updated() {
    this.updateChart();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.resizeObserver?.disconnect(), this.resizeObserver = void 0, this.chart?.dispose(), this.chart = void 0;
  }
  updateChart() {
    if (!this.chart) return;
    const e = new Intl.NumberFormat(this.language), t = {
      animation: !1,
      tooltip: {
        trigger: "item",
        renderMode: "html",
        confine: !0,
        // Keep the HTML tooltip inside this component's shadow tree so HA theme
        // variables are inherited and resolved by the browser.
        appendTo: () => this.chart?.getDom() ?? this.renderRoot.querySelector(".chart"),
        backgroundColor: "var(--card-background-color)",
        borderWidth: 1,
        textStyle: {
          color: "var(--primary-text-color)",
          fontSize: 10
        },
        extraCssText: "border-radius: 6px; line-height: normal; box-shadow: 0 2px 8px rgb(0 0 0 / 20%);",
        valueFormatter: (r) => e.format(Number(r))
      },
      series: [{
        type: "pie",
        radius: ["62%", "90%"],
        center: ["50%", "50%"],
        clockwise: !0,
        startAngle: 90,
        avoidLabelOverlap: !0,
        label: { show: !1 },
        labelLine: { show: !1 },
        itemStyle: { borderWidth: 2, borderColor: "transparent" },
        emphasis: { scale: !0, scaleSize: 4 },
        data: this.items.map((r) => ({
          name: r.name,
          value: r.bottles,
          itemStyle: { color: r.color },
          tooltip: { borderColor: r.color }
        }))
      }]
    };
    this.chart.setOption(t, { notMerge: !0, lazyUpdate: !0 });
  }
  render() {
    return E`<div class="chart" role="presentation"></div>`;
  }
};
ua.styles = ca`
    :host { display: block; width: 100%; height: 100%; min-width: 0; min-height: 0; }
    .chart { width: 100%; height: 100%; min-height: 0; }
  `;
lh([
  or({ attribute: !1 })
], ua.prototype, "items", 2);
lh([
  or()
], ua.prototype, "language", 2);
ua = lh([
  yi("ploc-cellar-donut-chart")
], ua);
var UE = Object.defineProperty, zE = Object.getOwnPropertyDescriptor, cr = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? zE(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (i ? o(t, r, n) : o(n)) || n);
  return i && n && UE(t, r, n), n;
};
const Bd = [
  "#D55E00",
  "#0072B2",
  "#009E73",
  "#E69F00",
  "#CC79A7",
  "#56B4E9",
  "#F0E442",
  "#6A3D9A"
];
let Te = class extends Ue {
  constructor() {
    super(...arguments), this.loading = !1, this.requestGeneration = 0;
  }
  static getConfigElement() {
    return document.createElement("ploc-cellar-card-editor");
  }
  static getStubConfig() {
    return {};
  }
  setConfig(e) {
    this.requestGeneration += 1, this.loading = !1, this.config = {
      ...e,
      show_occupancy: e.show_occupancy !== !1,
      show_diagnostics: e.show_diagnostics !== !1,
      show_statistics: e.show_statistics !== !1,
      show_statistics_legends: e.show_statistics_legends !== !1
    }, this.inventory = void 0, this.error = void 0, e.config_entry_id && this.refresh();
  }
  updated() {
    this.hass && this.config && !this.inventory && !this.loading && !this.error && this.refresh();
  }
  async refresh() {
    const e = this.hass, t = this.config;
    if (!e || !t?.config_entry_id || this.loading) return;
    const r = t.config_entry_id, i = ++this.requestGeneration;
    this.loading = !0, this.error = void 0;
    try {
      const n = await oc(e, r);
      i === this.requestGeneration && (this.inventory = n);
    } catch (n) {
      i === this.requestGeneration && (this.error = n instanceof Error ? n.message : String(n));
    } finally {
      i === this.requestGeneration && (this.loading = !1);
    }
  }
  formatNumber(e) {
    return new Intl.NumberFormat(this.hass?.language ?? void 0).format(e);
  }
  formatSync(e) {
    if (!e) return Ot(this.hass?.language ?? "en", "never");
    const t = new Date(e);
    return Number.isNaN(t.getTime()) ? e : new Intl.DateTimeFormat(this.hass?.language ?? void 0, {
      dateStyle: "short",
      timeStyle: "short"
    }).format(t);
  }
  metric(e, t) {
    return E`
      <div class="metric">
        <span class="value">${typeof e == "number" ? this.formatNumber(e) : e}</span>
        <span class="label">${t}</span>
      </div>
    `;
  }
  getBottleCount(e) {
    return this.inventory?.stock_reconstruction_complete ? e.bottles ?? e.bottles_in_cellar : e.bottles_in_cellar;
  }
  distribution(e) {
    const t = (o) => Ot(this.hass?.language ?? "en", o), r = /* @__PURE__ */ new Map();
    for (const o of this.inventory?.wines ?? []) {
      const s = o[e], l = s === null || s === "" ? t("statistics_unknown") : String(s), u = r.get(l) ?? { name: l, bottles: 0, wines: 0 };
      if (u.bottles += this.getBottleCount(o), u.wines += 1, e === "color" && o.color_rgb && !u.color) {
        const c = o.color_rgb.map(
          (h) => Math.min(255, Math.max(0, Math.round(h)))
        );
        u.color = `rgb(${c.join(", ")})`;
      }
      r.set(l, u);
    }
    const i = [...r.values()].sort(
      (o, s) => s.bottles - o.bottles || o.name.localeCompare(s.name, this.hass?.language)
    );
    if (i.length <= 8) return i;
    const n = i.slice(0, 7), a = i.slice(7).reduce(
      (o, s) => ({
        name: t("statistics_other"),
        bottles: o.bottles + s.bottles,
        wines: o.wines + s.wines
      }),
      { name: t("statistics_other"), bottles: 0, wines: 0 }
    );
    return [...n, a];
  }
  renderDistribution(e, t) {
    const r = (s) => Ot(this.hass?.language ?? "en", s), i = this.distribution(e), n = i.reduce((s, l) => s + l.bottles, 0), a = i.filter((s) => s.bottles > 0).map((s, l) => ({
      ...s,
      color: s.color ?? Bd[l % Bd.length]
    })), o = i.map((s) => `${s.name}: ${this.formatNumber(s.bottles)}`).join(", ");
    return E`
      <section class="group">
        <h3 class="group-title">${r(t)}</h3>
        ${n > 0 ? E`
          <div class=${this.config?.show_statistics_legends === !1 ? "chart-content chart-content-no-legend" : "chart-content"}>
            <div class="donut" role="img"
              aria-label=${r(t) + ": " + o}>
              <ploc-cellar-donut-chart
                class="donut-chart"
                .items=${a}
                .language=${this.hass?.language ?? "en"}>
              </ploc-cellar-donut-chart>
              <div class="donut-center">
                <span class="donut-total">${this.formatNumber(n)}</span>
                <span class="donut-caption">${r("statistics_bottles")}</span>
              </div>
            </div>
            ${this.config?.show_statistics_legends === !1 ? O : E`
              <div class="legend">
                ${a.map((s) => E`
                <div class="legend-item">
                  <span class="legend-swatch" style=${`background: ${s.color}`}></span>
                  <span class="legend-name">${s.name}</span>
                  <span class="legend-value">${this.formatNumber(s.bottles)}</span>
                  <span class="legend-meta">
                    ${new Intl.NumberFormat(this.hass?.language ?? void 0, {
      style: "percent",
      maximumFractionDigits: 1
    }).format(s.bottles / n)}
                    · ${this.formatNumber(s.wines)} ${r("statistics_references")}
                  </span>
                </div>
                `)}
              </div>
            `}
          </div>
        ` : E`<p class="muted">${r("statistics_empty")}</p>`}
      </section>
    `;
  }
  getDiagnosticWines(e) {
    const t = e === "unlocated" ? "unlocated_bottles" : e === "negative" ? "negative_movement_bottles" : "physical_surplus_bottles";
    return (this.inventory?.wine_diagnostics ?? []).filter((r) => (r[t] ?? 0) > 0).sort((r, i) => (i[t] ?? 0) - (r[t] ?? 0) || r.name.localeCompare(i.name, this.hass?.language));
  }
  openDiagnosticWine(e) {
    const t = this.inventory?.wines.find((r) => r.id === e.id) ?? e.wine;
    t && (this.activeDiagnostic = void 0, this.selectedWine = t);
  }
  renderDiagnosticDialog() {
    const e = this.activeDiagnostic;
    if (!e) return O;
    const t = e === "unlocated" ? "diagnostic_unlocated" : e === "negative" ? "diagnostic_negative" : "diagnostic_surplus", r = e === "unlocated" ? "diagnostic_detail_unlocated" : e === "negative" ? "diagnostic_detail_negative" : "diagnostic_detail_surplus", i = this.getDiagnosticWines(e), n = (o) => Ot(this.hass?.language ?? "en", o), a = (o) => e === "unlocated" ? o.unlocated_bottles ?? 0 : e === "negative" ? o.negative_movement_bottles ?? 0 : o.physical_surplus_bottles ?? 0;
    return E`
      <ha-dialog .open=${!0} header-title=${n(t)} @closed=${() => {
      this.activeDiagnostic = void 0;
    }}>
        <div class="diagnostic-detail-list">
          <p class="muted">${n(r)}</p>
          ${i.length ? i.map((o) => E`
            <section class="diagnostic-detail-item">
              <h4 class="diagnostic-detail-name">
                ${this.inventory?.wines.some((s) => s.id === o.id) || o.wine ? E`<button class="diagnostic-wine-link" type="button"
                      aria-haspopup="dialog"
                      @click=${() => this.openDiagnosticWine(o)}>${o.name}${o.vintage ? ` · ${o.vintage}` : ""}</button>` : E`${o.name}${o.vintage ? ` · ${o.vintage}` : ""}`}
              </h4>
              <dl class="diagnostic-detail-meta">
                <div><dt>${n("diagnostic_detail_quantity")}</dt><dd>${this.formatNumber(a(o))}</dd></div>
                <div><dt>${n("diagnostic_detail_in_cellar")}</dt><dd>${this.formatNumber(o.bottles_in_cellar)}</dd></div>
                <div><dt>${n("diagnostic_detail_stock")}</dt><dd>${this.formatNumber(o.effective_stock)}</dd></div>
                ${e === "negative" ? E`
                  <div><dt>${n("diagnostic_detail_purchased")}</dt><dd>${this.formatNumber(o.purchased ?? 0)}</dd></div>
                  <div><dt>${n("diagnostic_detail_consumed")}</dt><dd>${this.formatNumber(o.consumed ?? 0)}</dd></div>
                  <div><dt>${n("diagnostic_detail_balance")}</dt><dd>${this.formatNumber(o.movement_balance ?? 0)}</dd></div>
                ` : O}
              </dl>
            </section>
          `) : E`<p class="muted">${n("diagnostic_detail_empty")}</p>`}
        </div>
      </ha-dialog>
    `;
  }
  render() {
    const e = (f) => Ot(this.hass?.language ?? "en", f), t = this.inventory, r = this.config?.title ?? e("card_title"), i = this.config?.show_occupancy !== !1, n = this.config?.show_diagnostics !== !1, a = this.config?.show_statistics !== !1, o = t ? Math.min(t.total_positions, Math.max(0, t.occupied_positions)) : 0, s = t ? Math.max(0, t.total_positions - o) : 0, l = t && t.total_positions > 0 ? Math.round(o / t.total_positions * 100) : 0, u = t?.stock_reconstruction_complete ? [
      { key: "diagnostic_unlocated", value: t.unlocated_bottles ?? 0 },
      { key: "diagnostic_negative", value: t.negative_movement_bottles ?? 0 },
      { key: "diagnostic_surplus", value: t.physical_surplus_bottles ?? 0 }
    ].filter((f) => f.value > 0) : [], c = !!(t && (!t.stock_reconstruction_complete || u.length > 0 || t.positions_with_unknown_wine > 0)), h = t?.wines ?? [], v = t?.wine_references ?? h.length;
    return E`
      <ha-card>
        <header>
          <h2>${r}</h2>
          <button ?disabled=${this.loading} @click=${() => this.refresh()}>
            ${this.loading ? e("loading") : e("refresh")}
          </button>
        </header>
        ${this.error ? E`<div class="error">${this.error}</div>` : O}
        ${this.config?.config_entry_id ? O : E`<div class="muted">${e("select_config")}</div>`}
        ${t ? E`
          ${t.stale ? E`<div class="warning">${e("stale")}</div>` : O}
          <div class="summary">
            ${this.metric(t.total_bottles, e("bottles_in_cellar"))}
            ${this.metric(
      t.total_stock_bottles ?? e("unknown_value"),
      e("reconstructed_stock")
    )}
            ${this.metric(v, e("stocked_references"))}
            ${this.metric(t.rack_count, e("racks"))}
          </div>
          ${i ? E`
            <section class="section" aria-label=${e("rack_occupancy")}>
              <div class="occupancy-bar" role="progressbar"
                aria-label=${e("rack_occupancy")}
                aria-valuemin="0" aria-valuemax=${t.total_positions}
                aria-valuenow=${o}
                aria-valuetext=${`${o} ${e("occupied")}, ${s} ${e("free")}, ${t.total_positions} ${e("positions")}`}>
                <div class="occupancy-fill" style=${`width: ${l}%`}></div>
                <div class="occupancy-label">
                  <span>${e("rack_occupancy")}:</span>
                  <span class="numeric-value">${this.formatNumber(t.total_positions)} ${e("positions")}</span>
                  <span>·</span>
                  <span class="numeric-value">${this.formatNumber(o)} ${e("occupied")}</span>
                  <span>·</span>
                  <span class="numeric-value">${this.formatNumber(s)} ${e("free")}</span>
                </div>
              </div>
            </section>
          ` : O}
          ${n && c ? E`
            <section class="section">
              <h3 class="section-title">${e("inventory_diagnostics")}</h3>
              ${t.stock_reconstruction_complete ? O : E`<div class="warning">${e("reconstruction_incomplete")}</div>`}
              ${u.length ? E`
                <div class="diagnostics">
                  ${u.map((f) => {
      const d = f.key === "diagnostic_unlocated" ? "unlocated" : f.key === "diagnostic_negative" ? "negative" : "surplus";
      return E`
                      <button class="diagnostic" type="button" aria-haspopup="dialog"
                        @click=${() => {
        this.activeDiagnostic = d;
      }}>
                        <span class="diagnostic-value">${this.formatNumber(f.value)}</span>
                        <span class="label">${e(f.key)}</span>
                        <span class="diagnostic-hint">${e("diagnostic_detail_open")}</span>
                      </button>
                    `;
    })}
                </div>
              ` : O}
              ${t.positions_with_unknown_wine > 0 ? E`<div class="warning">${e("statistics_unknown_wine_positions").replace("{count}", this.formatNumber(t.positions_with_unknown_wine))}</div>` : O}
            </section>
          ` : O}
          ${a ? E`
            <section class="section">
              <h3 class="section-title">${e("statistics_title")}</h3>
              <p class="muted">${e("statistics_distribution_scope")}</p>
              <div class="groups">
                ${this.renderDistribution("color", "statistics_color")}
                ${this.renderDistribution("region", "statistics_region")}
                ${this.renderDistribution("appellation", "statistics_appellation")}
                ${this.renderDistribution("vintage", "statistics_vintage")}
                ${this.renderDistribution("bottle_format", "statistics_format")}
              </div>
            </section>
          ` : O}
          <div class="muted section">${e("last_sync")}: ${this.formatSync(t.last_sync)}</div>
          ${this.renderDiagnosticDialog()}
          ${this.selectedWine ? E`
            <ploc-cellar-wine-detail
              .hass=${this.hass}
              .wine=${this.selectedWine}
              @wine-detail-closed=${() => {
      this.selectedWine = void 0;
    }}>
            </ploc-cellar-wine-detail>
          ` : O}
        ` : O}
      </ha-card>
    `;
  }
  getCardSize() {
    return 12;
  }
  getGridOptions() {
    return { columns: 12, min_columns: 6 };
  }
};
Te.styles = ca`
    :host { display: block; }
    ha-card { padding: 16px; color: var(--primary-text-color); }
    header { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    h2 { margin: 0; font-size: 1.25rem; font-weight: 500; }
    button { color: var(--primary-text-color); background: var(--secondary-background-color); border: 0; border-radius: 8px; padding: 8px 12px; cursor: pointer; }
    button[disabled] { opacity: .5; cursor: default; }
    .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 8px; margin: 16px 0; }
    .metric { background: var(--secondary-background-color); border-radius: 10px; padding: 12px; min-width: 0; }
    .value { display: block; font-family: var(--ploc-numeric-font-family); font-size: 1.4rem; font-weight: 400; font-variant-numeric: tabular-nums; }
    .label, .muted { color: var(--secondary-text-color); font-size: .85rem; }
    .section { margin-top: 16px; }
    .section-title { margin: 0 0 8px; font-size: .95rem; font-weight: 500; }
    .occupancy-bar { position: relative; height: 20px; overflow: hidden; border-radius: 6px; background: var(--secondary-background-color); }
    .occupancy-fill { height: 100%; background: var(--primary-color); transition: width 180ms ease; }
    .occupancy-label { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 4px; padding: 0 8px; color: var(--primary-text-color); font-size: .9rem; font-weight: 500; line-height: 1; text-align: center; text-shadow: 0 1px 2px var(--card-background-color), 1px 0 2px var(--card-background-color), 0 -1px 2px var(--card-background-color), -1px 0 2px var(--card-background-color); white-space: nowrap; }
    .diagnostics { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 8px; }
    .diagnostic { display: flex; flex-direction: column; align-items: flex-start; width: 100%; height: 100%; box-sizing: border-box; text-align: left; color: inherit; border: 1px solid var(--divider-color); border-radius: 8px; padding: 10px; min-width: 0; cursor: pointer; }
    .diagnostic:hover { background: var(--secondary-background-color); }
    .diagnostic:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
    .diagnostic-value { display: block; font-family: var(--ploc-numeric-font-family); font-size: 1.4rem; font-weight: 400; font-variant-numeric: tabular-nums; }
    .diagnostic-hint { display: block; align-self: flex-end; margin-top: auto; padding-top: 8px; color: var(--secondary-text-color); font-size: .75rem; text-align: right; }
    .diagnostic-detail-list { display: grid; gap: 12px; max-height: min(60vh, 520px); overflow: auto; }
    .diagnostic-detail-item { border-bottom: 1px solid var(--divider-color); padding: 0 0 10px; }
    .diagnostic-detail-name { margin: 0 0 6px; font-family: var(--ploc-wine-font-family); font-size: 1.08rem; font-weight: 500; line-height: 1.25; }
    .diagnostic-wine-link { padding: 0; border: 0; background: none; color: inherit; font: inherit; font-weight: inherit; text-align: left; cursor: pointer; }
    .diagnostic-wine-link:hover { color: var(--primary-color); text-decoration: underline; }
    .diagnostic-wine-link:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 3px; border-radius: 2px; }
    .diagnostic-detail-meta { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 6px 14px; }
    .diagnostic-detail-meta div { display: flex; justify-content: space-between; gap: 12px; }
    .diagnostic-detail-meta dt { color: var(--secondary-text-color); }
    .numeric-value { font-family: var(--ploc-numeric-font-family); font-weight: 400; font-variant-numeric: tabular-nums; }
    .diagnostic-detail-meta dd { margin: 0; font-family: var(--ploc-numeric-font-family); font-weight: 400; font-variant-numeric: tabular-nums; }
    .groups { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr)); gap: 12px; margin-top: 14px; }
    .group { min-width: 0; border: 1px solid var(--divider-color); border-radius: 10px; padding: 12px; }
    .group-title { margin: 0 0 12px; font-size: 1rem; font-weight: 500; }
    .chart-content { display: grid; grid-template-columns: minmax(112px, .85fr) minmax(0, 1.15fr); gap: 12px; align-items: center; }
    .chart-content.chart-content-no-legend { grid-template-columns: minmax(0, 1fr); }
    .donut { position: relative; display: block; width: 100%; max-width: 150px; aspect-ratio: 1; justify-self: center; }
    .donut-chart { display: block; width: 100%; height: 100%; }
    .donut-center { position: absolute; inset: 17%; display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 50%; background: var(--card-background-color, var(--ha-card-background, #fff)); pointer-events: none; }
    .donut-total { color: var(--primary-text-color); font-family: var(--ploc-numeric-font-family); font-size: 1.4rem; font-weight: 400; font-variant-numeric: tabular-nums; }
    .donut-caption { color: var(--secondary-text-color); font-size: .48rem; }
    .legend { display: grid; gap: 4px; min-width: 0; }
    .legend-item { display: grid; grid-template-columns: 10px minmax(0, 1fr) auto; align-items: center; column-gap: 7px; row-gap: 2px; font-size: .82rem; }
    .legend-swatch { width: 9px; height: 9px; border-radius: 50%; }
    .legend-name { min-width: 0; overflow-wrap: anywhere; }
    .legend-value { white-space: nowrap; font-variant-numeric: tabular-nums; font-weight: 600; }
    .legend-meta { grid-column: 2 / 4; margin-top: -2px; color: var(--secondary-text-color); font-size: .72rem; }
    .warning { color: var(--warning-color); padding: 8px 0; }
    .error { color: var(--error-color); padding: 8px 0; }
    @media (max-width: 420px) {
      ha-card { padding: 12px; }
      .chart-content { grid-template-columns: minmax(96px, .7fr) minmax(0, 1.3fr); gap: 8px; }
      .legend { gap: 6px; }
      .legend-item { font-size: .78rem; }
    }
  `;
cr([
  or({ attribute: !1 })
], Te.prototype, "hass", 2);
cr([
  ut()
], Te.prototype, "config", 2);
cr([
  ut()
], Te.prototype, "inventory", 2);
cr([
  ut()
], Te.prototype, "loading", 2);
cr([
  ut()
], Te.prototype, "error", 2);
cr([
  ut()
], Te.prototype, "activeDiagnostic", 2);
cr([
  ut()
], Te.prototype, "selectedWine", 2);
Te = cr([
  yi("ploc-cellar-card")
], Te);
let Nd = class extends Te {
};
Nd = cr([
  yi("ploc-cellar-statistics-card")
], Nd);
window.customCards ??= [];
window.customCards.push({
  type: "ploc-cellar-card",
  name: $i("picker_overview_name"),
  description: $i("picker_overview_description")
});
export {
  Te as PlocCellarCard,
  Nd as PlocCellarStatisticsCard
};
