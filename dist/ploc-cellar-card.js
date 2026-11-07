const Aa = globalThis, Hl = Aa.ShadowRoot && (Aa.ShadyCSS === void 0 || Aa.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ul = /* @__PURE__ */ Symbol(), Hu = /* @__PURE__ */ new WeakMap();
let ev = class {
  constructor(t, r, i) {
    if (this._$cssResult$ = !0, i !== Ul) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = r;
  }
  get styleSheet() {
    let t = this.o;
    const r = this.t;
    if (Hl && t === void 0) {
      const i = r !== void 0 && r.length === 1;
      i && (t = Hu.get(r)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Hu.set(r, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const cg = (e) => new ev(typeof e == "string" ? e : e + "", void 0, Ul), Hn = (e, ...t) => {
  const r = e.length === 1 ? e[0] : t.reduce((i, n, a) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[a + 1], e[0]);
  return new ev(r, e, Ul);
}, hg = (e, t) => {
  if (Hl) e.adoptedStyleSheets = t.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of t) {
    const i = document.createElement("style"), n = Aa.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = r.cssText, e.appendChild(i);
  }
}, Uu = Hl ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let r = "";
  for (const i of t.cssRules) r += i.cssText;
  return cg(r);
})(e) : e;
const { is: fg, defineProperty: vg, getOwnPropertyDescriptor: dg, getOwnPropertyNames: pg, getOwnPropertySymbols: gg, getPrototypeOf: _g } = Object, _o = globalThis, Vu = _o.trustedTypes, mg = Vu ? Vu.emptyScript : "", yg = _o.reactiveElementPolyfillSupport, cn = (e, t) => e, Va = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? mg : null;
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
} }, Vl = (e, t) => !fg(e, t), Gu = { attribute: !0, type: String, converter: Va, reflect: !1, useDefault: !1, hasChanged: Vl };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), _o.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let ci = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, r = Gu) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(t, r), !r.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(t, i, r);
      n !== void 0 && vg(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, r, i) {
    const { get: n, set: a } = dg(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? Gu;
  }
  static _$Ei() {
    if (this.hasOwnProperty(cn("elementProperties"))) return;
    const t = _g(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(cn("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(cn("properties"))) {
      const r = this.properties, i = [...pg(r), ...gg(r)];
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
      for (const n of i) r.unshift(Uu(n));
    } else t !== void 0 && r.push(Uu(t));
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
    return hg(t, this.constructor.elementStyles), t;
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
      const a = (i.converter?.toAttribute !== void 0 ? i.converter : Va).toAttribute(r, i.type);
      this._$Em = t, a == null ? this.removeAttribute(n) : this.setAttribute(n, a), this._$Em = null;
    }
  }
  _$AK(t, r) {
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const a = i.getPropertyOptions(n), o = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : Va;
      this._$Em = n;
      const s = o.fromAttribute(r, a.type);
      this[n] = s ?? this._$Ej?.get(n) ?? s, this._$Em = null;
    }
  }
  requestUpdate(t, r, i, n = !1, a) {
    if (t !== void 0) {
      const o = this.constructor;
      if (n === !1 && (a = this[t]), i ??= o.getPropertyOptions(t), !((i.hasChanged ?? Vl)(a, r) || i.useDefault && i.reflect && a === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, i)))) return;
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
ci.elementStyles = [], ci.shadowRootOptions = { mode: "open" }, ci[cn("elementProperties")] = /* @__PURE__ */ new Map(), ci[cn("finalized")] = /* @__PURE__ */ new Map(), yg?.({ ReactiveElement: ci }), (_o.reactiveElementVersions ??= []).push("2.1.2");
const Gl = globalThis, Wu = (e) => e, Ga = Gl.trustedTypes, Yu = Ga ? Ga.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, rv = "$lit$", nr = `lit$${Math.random().toFixed(9).slice(2)}$`, iv = "?" + nr, wg = `<${iv}>`, Wr = document, Tn = () => Wr.createComment(""), Cn = (e) => e === null || typeof e != "object" && typeof e != "function", Wl = Array.isArray, bg = (e) => Wl(e) || typeof e?.[Symbol.iterator] == "function", Bo = `[ 	
\f\r]`, Bi = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, qu = /-->/g, Xu = />/g, pr = RegExp(`>|${Bo}(?:([^\\s"'>=/]+)(${Bo}*=${Bo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Zu = /'/g, Ku = /"/g, nv = /^(?:script|style|textarea|title)$/i, Sg = (e) => (t, ...r) => ({ _$litType$: e, strings: t, values: r }), L = Sg(1), xi = /* @__PURE__ */ Symbol.for("lit-noChange"), $ = /* @__PURE__ */ Symbol.for("lit-nothing"), ju = /* @__PURE__ */ new WeakMap(), Nr = Wr.createTreeWalker(Wr, 129);
function av(e, t) {
  if (!Wl(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Yu !== void 0 ? Yu.createHTML(t) : t;
}
const xg = (e, t) => {
  const r = e.length - 1, i = [];
  let n, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = Bi;
  for (let s = 0; s < r; s++) {
    const l = e[s];
    let u, c, h = -1, v = 0;
    for (; v < l.length && (o.lastIndex = v, c = o.exec(l), c !== null); ) v = o.lastIndex, o === Bi ? c[1] === "!--" ? o = qu : c[1] !== void 0 ? o = Xu : c[2] !== void 0 ? (nv.test(c[2]) && (n = RegExp("</" + c[2], "g")), o = pr) : c[3] !== void 0 && (o = pr) : o === pr ? c[0] === ">" ? (o = n ?? Bi, h = -1) : c[1] === void 0 ? h = -2 : (h = o.lastIndex - c[2].length, u = c[1], o = c[3] === void 0 ? pr : c[3] === '"' ? Ku : Zu) : o === Ku || o === Zu ? o = pr : o === qu || o === Xu ? o = Bi : (o = pr, n = void 0);
    const f = o === pr && e[s + 1].startsWith("/>") ? " " : "";
    a += o === Bi ? l + wg : h >= 0 ? (i.push(u), l.slice(0, h) + rv + l.slice(h) + nr + f) : l + nr + (h === -2 ? s : f);
  }
  return [av(e, a + (e[r] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class Dn {
  constructor({ strings: t, _$litType$: r }, i) {
    let n;
    this.parts = [];
    let a = 0, o = 0;
    const s = t.length - 1, l = this.parts, [u, c] = xg(t, r);
    if (this.el = Dn.createElement(u, i), Nr.currentNode = this.el.content, r === 2 || r === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (n = Nr.nextNode()) !== null && l.length < s; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const h of n.getAttributeNames()) if (h.endsWith(rv)) {
          const v = c[o++], f = n.getAttribute(h).split(nr), d = /([.?@])?(.*)/.exec(v);
          l.push({ type: 1, index: a, name: d[2], strings: f, ctor: d[1] === "." ? Cg : d[1] === "?" ? Dg : d[1] === "@" ? Mg : mo }), n.removeAttribute(h);
        } else h.startsWith(nr) && (l.push({ type: 6, index: a }), n.removeAttribute(h));
        if (nv.test(n.tagName)) {
          const h = n.textContent.split(nr), v = h.length - 1;
          if (v > 0) {
            n.textContent = Ga ? Ga.emptyScript : "";
            for (let f = 0; f < v; f++) n.append(h[f], Tn()), Nr.nextNode(), l.push({ type: 2, index: ++a });
            n.append(h[v], Tn());
          }
        }
      } else if (n.nodeType === 8) if (n.data === iv) l.push({ type: 2, index: a });
      else {
        let h = -1;
        for (; (h = n.data.indexOf(nr, h + 1)) !== -1; ) l.push({ type: 7, index: a }), h += nr.length - 1;
      }
      a++;
    }
  }
  static createElement(t, r) {
    const i = Wr.createElement("template");
    return i.innerHTML = t, i;
  }
}
function Ti(e, t, r = e, i) {
  if (t === xi) return t;
  let n = i !== void 0 ? r._$Co?.[i] : r._$Cl;
  const a = Cn(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== a && (n?._$AO?.(!1), a === void 0 ? n = void 0 : (n = new a(e), n._$AT(e, r, i)), i !== void 0 ? (r._$Co ??= [])[i] = n : r._$Cl = n), n !== void 0 && (t = Ti(e, n._$AS(e, t.values), n, i)), t;
}
class Tg {
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
    const { el: { content: r }, parts: i } = this._$AD, n = (t?.creationScope ?? Wr).importNode(r, !0);
    Nr.currentNode = n;
    let a = Nr.nextNode(), o = 0, s = 0, l = i[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let u;
        l.type === 2 ? u = new Un(a, a.nextSibling, this, t) : l.type === 1 ? u = new l.ctor(a, l.name, l.strings, this, t) : l.type === 6 && (u = new Ag(a, this, t)), this._$AV.push(u), l = i[++s];
      }
      o !== l?.index && (a = Nr.nextNode(), o++);
    }
    return Nr.currentNode = Wr, n;
  }
  p(t) {
    let r = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, r), r += i.strings.length - 2) : i._$AI(t[r])), r++;
  }
}
class Un {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, r, i, n) {
    this.type = 2, this._$AH = $, this._$AN = void 0, this._$AA = t, this._$AB = r, this._$AM = i, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    t = Ti(this, t, r), Cn(t) ? t === $ || t == null || t === "" ? (this._$AH !== $ && this._$AR(), this._$AH = $) : t !== this._$AH && t !== xi && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : bg(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== $ && Cn(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Wr.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: r, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = Dn.createElement(av(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n) this._$AH.p(r);
    else {
      const a = new Tg(n, this), o = a.u(this.options);
      a.p(r), this.T(o), this._$AH = a;
    }
  }
  _$AC(t) {
    let r = ju.get(t.strings);
    return r === void 0 && ju.set(t.strings, r = new Dn(t)), r;
  }
  k(t) {
    Wl(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let i, n = 0;
    for (const a of t) n === r.length ? r.push(i = new Un(this.O(Tn()), this.O(Tn()), this, this.options)) : i = r[n], i._$AI(a), n++;
    n < r.length && (this._$AR(i && i._$AB.nextSibling, n), r.length = n);
  }
  _$AR(t = this._$AA.nextSibling, r) {
    for (this._$AP?.(!1, !0, r); t !== this._$AB; ) {
      const i = Wu(t).nextSibling;
      Wu(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class mo {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, r, i, n, a) {
    this.type = 1, this._$AH = $, this._$AN = void 0, this.element = t, this.name = r, this._$AM = n, this.options = a, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = $;
  }
  _$AI(t, r = this, i, n) {
    const a = this.strings;
    let o = !1;
    if (a === void 0) t = Ti(this, t, r, 0), o = !Cn(t) || t !== this._$AH && t !== xi, o && (this._$AH = t);
    else {
      const s = t;
      let l, u;
      for (t = a[0], l = 0; l < a.length - 1; l++) u = Ti(this, s[i + l], r, l), u === xi && (u = this._$AH[l]), o ||= !Cn(u) || u !== this._$AH[l], u === $ ? t = $ : t !== $ && (t += (u ?? "") + a[l + 1]), this._$AH[l] = u;
    }
    o && !n && this.j(t);
  }
  j(t) {
    t === $ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Cg extends mo {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === $ ? void 0 : t;
  }
}
class Dg extends mo {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== $);
  }
}
class Mg extends mo {
  constructor(t, r, i, n, a) {
    super(t, r, i, n, a), this.type = 5;
  }
  _$AI(t, r = this) {
    if ((t = Ti(this, t, r, 0) ?? $) === xi) return;
    const i = this._$AH, n = t === $ && i !== $ || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, a = t !== $ && (i === $ || n);
    n && this.element.removeEventListener(this.name, this, i), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ag {
  constructor(t, r, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Ti(this, t);
  }
}
const Pg = Gl.litHtmlPolyfillSupport;
Pg?.(Dn, Un), (Gl.litHtmlVersions ??= []).push("3.3.3");
const Ig = (e, t, r) => {
  const i = r?.renderBefore ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const a = r?.renderBefore ?? null;
    i._$litPart$ = n = new Un(t.insertBefore(Tn(), a), a, void 0, r ?? {});
  }
  return n._$AI(e), n;
};
const Yl = globalThis;
class Pe extends ci {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ig(r, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return xi;
  }
}
Pe._$litElement$ = !0, Pe.finalized = !0, Yl.litElementHydrateSupport?.({ LitElement: Pe });
const kg = Yl.litElementPolyfillSupport;
kg?.({ LitElement: Pe });
(Yl.litElementVersions ??= []).push("4.2.2");
const qr = (e) => (t, r) => {
  r !== void 0 ? r.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const Lg = { attribute: !0, type: String, converter: Va, reflect: !1, hasChanged: Vl }, Rg = (e = Lg, t, r) => {
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
function Ge(e) {
  return (t, r) => typeof r == "object" ? Rg(e, t, r) : ((i, n, a) => {
    const o = n.hasOwnProperty(a);
    return n.constructor.createProperty(a, i), o ? Object.getOwnPropertyDescriptor(n, a) : void 0;
  })(e, t, r);
}
function nt(e) {
  return Ge({ ...e, state: !0, attribute: !1 });
}
const $g = "Ploc Cellar", Eg = "Cellar storage", Og = "Refresh", Bg = "Loading…", Ng = "Never", Fg = "Bottles in cellar", zg = "Reconstructed stock", Hg = "Racks", Ug = "Empty positions", Vg = "Data may be stale: the latest synchronization failed.", Gg = "Stock reconstruction is incomplete: only physical quantities are available.", Wg = "Last successful synchronization", Yg = "Search wines", qg = "Search wines…", Xg = "No matching wines.", Zg = "Select a Ploc Cellar configuration in the card editor.", Kg = "Rack selection", jg = "occupied", Qg = "free", Jg = "Unknown wine", t_ = "Empty position", e_ = "Row", r_ = "Column", i_ = "No row/column coordinates are available for this rack.", n_ = "Positions without coordinates", a_ = "Not mapped", o_ = "No racks available.", s_ = "position(s) reference a missing rack.", l_ = "Wine inventory", u_ = "All colors", c_ = "All regions", h_ = "All appellations", f_ = "All vintages", v_ = "Sort by", d_ = "Name", p_ = "Quantity descending", g_ = "Vintage descending", __ = "{count} wine(s)", m_ = "{count} bottle(s)", y_ = "Clear filters", w_ = "btl.", b_ = "Unknown vintage", S_ = "Wine details", x_ = "Grapes", T_ = "Cuvée", C_ = "Volume", D_ = "Locations", M_ = "Ploc Cellar", A_ = "Cellar overview and stock indicators.", P_ = "Wine inventory", I_ = "Search, filter and browse the wine inventory.", k_ = "Cellar racks", L_ = "Visualize rack positions and the wines stored in them.", R_ = "Ploc Cellar configuration", $_ = "Select the PLOUD connection used by this card.", E_ = "Card title", O_ = "Optional. Leave empty to use the default title.", B_ = "Cellar statistics", N_ = "Bottles in stock", F_ = "wine references", z_ = "By color", H_ = "By region", U_ = "By appellation", V_ = "By vintage", G_ = "By bottle format", W_ = "Other", Y_ = "Not specified", q_ = "No data available for this category.", X_ = "Unknown", Z_ = "Wine references in stock", K_ = "Rack occupancy", j_ = "Stock diagnostics", Q_ = "Unlocated bottles", J_ = "Negative movement balance", tm = "Physical surplus", em = "Breakdowns include known wine references only.", rm = "{count} occupied position(s) have an unknown wine reference. They are included in total stock but not in the breakdowns.", im = "Show rack occupancy", nm = "Show diagnostics", am = "Show statistics", om = "Show chart legends", sm = "View details", lm = "Wine references with stock that is not assigned to a physical rack position.", um = "Wine references where recorded outgoing movements exceed incoming movements.", cm = "Wine references with more bottles physically stored than the reconstructed movement stock.", hm = "Bottles concerned", fm = "In cellar", vm = "Reconstructed stock", dm = "Incoming", pm = "Outgoing", gm = "Movement balance", _m = "No wine-level details are available for this diagnostic.", mm = "Vintage", ym = "Producer", wm = "Appellation", bm = "Classification", Sm = "Wine color", xm = "Region", Tm = "Country", Cm = "Region / country", Dm = "Grapes", Mm = "Cuvée", Am = "Bottle format", Pm = "Volume", Im = "Serving temperature", km = "Rack selection display", Lm = "Buttons", Rm = "Dropdown list", $m = "Stock", Em = "Physically in cellar", Om = "Reconstructed stock", Bm = "Effective stock", Nm = "PLOUD source stock", Fm = "Stock movements and diagnostics", zm = "Purchased", Hm = "Consumed", Um = "Movement balance", Vm = "Calculated stock", Gm = "Unlocated bottles", Wm = "Negative movement bottles", Ym = "Physical surplus", qm = "Wine characteristics", Xm = "Alcohol", Zm = "Notes", Km = "No physical location is assigned to this wine.", jm = "Rack positions are shown in a compact layout because their coordinates are too far apart.", Qm = {
  card_title: $g,
  rack_title: Eg,
  refresh: Og,
  loading: Bg,
  never: Ng,
  bottles_in_cellar: Fg,
  reconstructed_stock: zg,
  racks: Hg,
  empty_positions: Ug,
  stale: Vg,
  reconstruction_incomplete: Gg,
  last_sync: Wg,
  search_wine: Yg,
  search_placeholder: qg,
  no_matching_wines: Xg,
  select_config: Zg,
  rack_selection: Kg,
  occupied: jg,
  free: Qg,
  unknown_wine: Jg,
  empty_position: t_,
  row: e_,
  column: r_,
  no_coordinates: i_,
  positions_without_coordinates: n_,
  not_mapped: a_,
  no_racks: o_,
  missing_rack: s_,
  inventory_title: l_,
  filter_color: u_,
  filter_region: c_,
  filter_appellation: h_,
  filter_vintage: f_,
  sort_by: v_,
  sort_name: d_,
  sort_bottles: p_,
  sort_vintage: g_,
  inventory_results: __,
  inventory_bottle_total: m_,
  clear_filters: y_,
  bottles_short: w_,
  unknown_vintage: b_,
  wine_details: S_,
  grapes: x_,
  cuvee: T_,
  bottle_volume: C_,
  locations: D_,
  picker_overview_name: M_,
  picker_overview_description: A_,
  picker_inventory_name: P_,
  picker_inventory_description: I_,
  picker_rack_name: k_,
  picker_rack_description: L_,
  editor_configuration: R_,
  editor_configuration_helper: $_,
  editor_title: E_,
  editor_title_helper: O_,
  statistics_title: B_,
  statistics_bottles: N_,
  statistics_references: F_,
  statistics_color: z_,
  statistics_region: H_,
  statistics_appellation: U_,
  statistics_vintage: V_,
  statistics_format: G_,
  statistics_other: W_,
  statistics_unknown: Y_,
  statistics_empty: q_,
  unknown_value: X_,
  stocked_references: Z_,
  rack_occupancy: K_,
  inventory_diagnostics: j_,
  diagnostic_unlocated: Q_,
  diagnostic_negative: J_,
  diagnostic_surplus: tm,
  statistics_distribution_scope: em,
  statistics_unknown_wine_positions: rm,
  editor_show_occupancy: im,
  editor_show_diagnostics: nm,
  editor_show_statistics: am,
  editor_show_statistics_legends: om,
  diagnostic_detail_open: sm,
  diagnostic_detail_unlocated: lm,
  diagnostic_detail_negative: um,
  diagnostic_detail_surplus: cm,
  diagnostic_detail_quantity: hm,
  diagnostic_detail_in_cellar: fm,
  diagnostic_detail_stock: vm,
  diagnostic_detail_purchased: dm,
  diagnostic_detail_consumed: pm,
  diagnostic_detail_balance: gm,
  diagnostic_detail_empty: _m,
  tooltip_vintage: mm,
  tooltip_domain: ym,
  tooltip_appellation: wm,
  tooltip_classification: bm,
  tooltip_color: Sm,
  tooltip_region: xm,
  tooltip_country: Tm,
  tooltip_region_country: Cm,
  tooltip_grapes: Dm,
  tooltip_cuvee: Mm,
  tooltip_format: Am,
  tooltip_volume: Pm,
  tooltip_temperature: Im,
  editor_rack_picker_mode: km,
  editor_rack_picker_buttons: Lm,
  editor_rack_picker_dropdown: Rm,
  wine_detail_stock: $m,
  wine_detail_physical: Em,
  wine_detail_reconstructed: Om,
  wine_detail_effective: Bm,
  wine_detail_source_stock: Nm,
  wine_detail_movements: Fm,
  wine_detail_purchased: zm,
  wine_detail_consumed: Hm,
  wine_detail_balance: Um,
  wine_detail_calculated: Vm,
  wine_detail_unlocated: Gm,
  wine_detail_negative: Wm,
  wine_detail_surplus: Ym,
  wine_detail_characteristics: qm,
  wine_detail_alcohol: Xm,
  wine_detail_comment: Zm,
  wine_detail_no_locations: Km,
  rack_grid_compacted: jm
}, Jm = "Cave Ploc", ty = "Rangement de la cave", ey = "Actualiser", ry = "Chargement…", iy = "Jamais", ny = "Bouteilles en cave", ay = "Stock reconstitué", oy = "Casiers", sy = "Places libres", ly = "Données potentiellement obsolètes : la dernière synchronisation a échoué.", uy = "Reconstitution du stock en cours : seules les quantités physiques sont disponibles.", cy = "Dernière synchronisation réussie", hy = "Rechercher un vin", fy = "Rechercher un vin…", vy = "Aucun vin correspondant.", dy = "Sélectionnez une configuration Ploc Cellar dans l’éditeur de carte.", py = "Sélection du casier", gy = "occupées", _y = "libres", my = "Vin inconnu", yy = "Emplacement libre", wy = "Rangée", by = "Colonne", Sy = "Aucune coordonnée de rangée/colonne disponible pour ce casier.", xy = "Emplacements sans coordonnées", Ty = "Non renseigné", Cy = "Aucun casier disponible.", Dy = "emplacement(s) référencent un casier absent.", My = "Inventaire des vins", Ay = "Toutes les couleurs", Py = "Toutes les régions", Iy = "Toutes les appellations", ky = "Tous les millésimes", Ly = "Trier par", Ry = "Nom", $y = "Quantité décroissante", Ey = "Millésime décroissant", Oy = "{count} référence(s)", By = "{count} bouteille(s)", Ny = "Effacer les filtres", Fy = "bt.", zy = "Millésime inconnu", Hy = "Détails du vin", Uy = "Cépages", Vy = "Cuvée", Gy = "Volume", Wy = "Emplacements", Yy = "Cave Ploc", qy = "Vue d’ensemble de la cave et indicateurs de stock.", Xy = "Inventaire des vins", Zy = "Rechercher, filtrer et parcourir l’inventaire des vins.", Ky = "Casiers de la cave", jy = "Visualiser les emplacements des casiers et les vins qui y sont rangés.", Qy = "Configuration Ploc Cellar", Jy = "Sélectionnez la connexion PLOUD utilisée par cette carte.", t0 = "Titre de la carte", e0 = "Facultatif. Laissez vide pour utiliser le titre par défaut.", r0 = "Statistiques de la cave", i0 = "Bouteilles en stock", n0 = "références de vin", a0 = "Par couleur", o0 = "Par région", s0 = "Par appellation", l0 = "Par millésime", u0 = "Par format de bouteille", c0 = "Autres", h0 = "Non renseigné", f0 = "Aucune donnée disponible pour cette catégorie.", v0 = "Inconnu", d0 = "Références de vins en stock", p0 = "Occupation des casiers", g0 = "Diagnostics du stock", _0 = "Bouteilles non localisées", m0 = "Solde de mouvements négatif", y0 = "Excédent physique", w0 = "Les répartitions ne portent que sur les références de vins connues.", b0 = "{count} emplacement(s) occupé(s) font référence à un vin inconnu. Ils sont inclus dans le stock total, mais pas dans les répartitions.", S0 = "Afficher l’occupation des casiers", x0 = "Afficher les diagnostics", T0 = "Afficher les statistiques", C0 = "Afficher les légendes des graphiques", D0 = "Voir le détail", M0 = "Références de vins dont une partie du stock n’est affectée à aucun emplacement physique de casier.", A0 = "Références de vins pour lesquelles les sorties enregistrées dépassent les entrées.", P0 = "Références de vins ayant davantage de bouteilles physiquement rangées que le stock reconstitué à partir des mouvements.", I0 = "Bouteilles concernées", k0 = "En cave", L0 = "Stock reconstitué", R0 = "Entrées", $0 = "Sorties", E0 = "Solde des mouvements", O0 = "Aucun détail par référence de vin n’est disponible pour ce diagnostic.", B0 = "Millésime", N0 = "Domaine", F0 = "Appellation", z0 = "Classement", H0 = "Couleur du vin", U0 = "Région", V0 = "Pays", G0 = "Région / pays", W0 = "Cépages", Y0 = "Cuvée", q0 = "Format de bouteille", X0 = "Volume", Z0 = "Température de service", K0 = "Affichage du choix de la cave", j0 = "Boutons", Q0 = "Liste déroulante", J0 = "Stock", tw = "En cave physiquement", ew = "Stock reconstitué", rw = "Stock effectif", iw = "Stock source PLOUD", nw = "Mouvements et diagnostics du stock", aw = "Achats", ow = "Consommations", sw = "Solde des mouvements", lw = "Stock calculé", uw = "Bouteilles non localisées", cw = "Bouteilles au solde négatif", hw = "Excédent physique", fw = "Caractéristiques du vin", vw = "Degré d’alcool", dw = "Notes", pw = "Aucun emplacement physique n’est affecté à ce vin.", gw = "La disposition des emplacements est condensée car les coordonnées sont trop espacées.", _w = {
  card_title: Jm,
  rack_title: ty,
  refresh: ey,
  loading: ry,
  never: iy,
  bottles_in_cellar: ny,
  reconstructed_stock: ay,
  racks: oy,
  empty_positions: sy,
  stale: ly,
  reconstruction_incomplete: uy,
  last_sync: cy,
  search_wine: hy,
  search_placeholder: fy,
  no_matching_wines: vy,
  select_config: dy,
  rack_selection: py,
  occupied: gy,
  free: _y,
  unknown_wine: my,
  empty_position: yy,
  row: wy,
  column: by,
  no_coordinates: Sy,
  positions_without_coordinates: xy,
  not_mapped: Ty,
  no_racks: Cy,
  missing_rack: Dy,
  inventory_title: My,
  filter_color: Ay,
  filter_region: Py,
  filter_appellation: Iy,
  filter_vintage: ky,
  sort_by: Ly,
  sort_name: Ry,
  sort_bottles: $y,
  sort_vintage: Ey,
  inventory_results: Oy,
  inventory_bottle_total: By,
  clear_filters: Ny,
  bottles_short: Fy,
  unknown_vintage: zy,
  wine_details: Hy,
  grapes: Uy,
  cuvee: Vy,
  bottle_volume: Gy,
  locations: Wy,
  picker_overview_name: Yy,
  picker_overview_description: qy,
  picker_inventory_name: Xy,
  picker_inventory_description: Zy,
  picker_rack_name: Ky,
  picker_rack_description: jy,
  editor_configuration: Qy,
  editor_configuration_helper: Jy,
  editor_title: t0,
  editor_title_helper: e0,
  statistics_title: r0,
  statistics_bottles: i0,
  statistics_references: n0,
  statistics_color: a0,
  statistics_region: o0,
  statistics_appellation: s0,
  statistics_vintage: l0,
  statistics_format: u0,
  statistics_other: c0,
  statistics_unknown: h0,
  statistics_empty: f0,
  unknown_value: v0,
  stocked_references: d0,
  rack_occupancy: p0,
  inventory_diagnostics: g0,
  diagnostic_unlocated: _0,
  diagnostic_negative: m0,
  diagnostic_surplus: y0,
  statistics_distribution_scope: w0,
  statistics_unknown_wine_positions: b0,
  editor_show_occupancy: S0,
  editor_show_diagnostics: x0,
  editor_show_statistics: T0,
  editor_show_statistics_legends: C0,
  diagnostic_detail_open: D0,
  diagnostic_detail_unlocated: M0,
  diagnostic_detail_negative: A0,
  diagnostic_detail_surplus: P0,
  diagnostic_detail_quantity: I0,
  diagnostic_detail_in_cellar: k0,
  diagnostic_detail_stock: L0,
  diagnostic_detail_purchased: R0,
  diagnostic_detail_consumed: $0,
  diagnostic_detail_balance: E0,
  diagnostic_detail_empty: O0,
  tooltip_vintage: B0,
  tooltip_domain: N0,
  tooltip_appellation: F0,
  tooltip_classification: z0,
  tooltip_color: H0,
  tooltip_region: U0,
  tooltip_country: V0,
  tooltip_region_country: G0,
  tooltip_grapes: W0,
  tooltip_cuvee: Y0,
  tooltip_format: q0,
  tooltip_volume: X0,
  tooltip_temperature: Z0,
  editor_rack_picker_mode: K0,
  editor_rack_picker_buttons: j0,
  editor_rack_picker_dropdown: Q0,
  wine_detail_stock: J0,
  wine_detail_physical: tw,
  wine_detail_reconstructed: ew,
  wine_detail_effective: rw,
  wine_detail_source_stock: iw,
  wine_detail_movements: nw,
  wine_detail_purchased: aw,
  wine_detail_consumed: ow,
  wine_detail_balance: sw,
  wine_detail_calculated: lw,
  wine_detail_unlocated: uw,
  wine_detail_negative: cw,
  wine_detail_surplus: hw,
  wine_detail_characteristics: fw,
  wine_detail_alcohol: vw,
  wine_detail_comment: dw,
  wine_detail_no_locations: pw,
  rack_grid_compacted: gw
};
function Dt(e, t) {
  return (e.toLocaleLowerCase().startsWith("fr") ? _w : Qm)[t];
}
function Ci(e) {
  const t = typeof navigator > "u" ? "en" : navigator.language;
  return Dt(t, e);
}
var mw = Object.defineProperty, yw = Object.getOwnPropertyDescriptor, yo = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? yw(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (i ? o(t, r, n) : o(n)) || n);
  return i && n && mw(t, r, n), n;
};
let Di = class extends Pe {
  constructor() {
    super(...arguments), this.imageUrl = null, this.imageObjectUrl = null, this.loadedImagePath = null, this.pendingImagePath = null, this.imageRequest = 0;
  }
  updated(e) {
    (e.has("wine") || e.has("hass")) && this.loadWineImage();
  }
  connectedCallback() {
    super.connectedCallback(), this.wine?.image_url && this.hass && this.loadWineImage();
  }
  disconnectedCallback() {
    this.imageRequest += 1, this.loadedImagePath = null, this.pendingImagePath = null, this.revokeWineImage(), this.imageUrl = null, super.disconnectedCallback();
  }
  revokeWineImage() {
    this.imageObjectUrl !== null && (URL.revokeObjectURL(this.imageObjectUrl), this.imageObjectUrl = null);
  }
  async loadWineImage() {
    const e = this.wine?.image_url ?? null, t = this.hass;
    if (e === this.loadedImagePath && (this.imageObjectUrl !== null || this.pendingImagePath === e)) return;
    const r = ++this.imageRequest;
    if (this.revokeWineImage(), this.imageUrl = null, this.loadedImagePath = e, this.pendingImagePath = e, !e || !t) {
      this.pendingImagePath = null;
      return;
    }
    try {
      const i = await t.fetchWithAuth(e);
      if (!i.ok) return;
      const n = await i.blob();
      if (r !== this.imageRequest) return;
      const a = URL.createObjectURL(n);
      this.imageObjectUrl = a, this.imageUrl = a;
    } catch {
    } finally {
      r === this.imageRequest && (this.pendingImagePath = null);
    }
  }
  get language() {
    return this.hass?.language ?? "en";
  }
  t(e) {
    return Dt(this.language, e);
  }
  formatNumber(e) {
    return new Intl.NumberFormat(this.language, { maximumFractionDigits: 2 }).format(e);
  }
  field(e, t) {
    return t == null || t === "" ? $ : L`
      <div class="field">
        <dt>${this.t(e)}</dt>
        <dd>${t}</dd>
      </div>
    `;
  }
  stockItem(e, t) {
    return t == null ? $ : L`
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
    return L`
      <div class="identity">
        <span class="color-swatch" style=${this.colorStyle} aria-hidden="true"></span>
        <div class="identity-text">
          ${t.length ? L`<div class="subtitle">${t.join(" · ")}</div>` : $}
          ${r.length ? L`<div class="tags">${r.map((i) => L`<span class="tag">${i}</span>`)}</div>` : $}
        </div>
      </div>
    `;
  }
  renderStock(e) {
    const t = e.purchased !== null || e.consumed !== null || e.movement_balance !== null || e.calculated_stock !== null || e.negative_movement_bottles !== null || e.physical_surplus_bottles !== null || e.unlocated_bottles !== null;
    return L`
      <section>
        <h3>${this.t("wine_detail_stock")}</h3>
        <div class="stock">
          ${this.stockItem("wine_detail_physical", e.bottles_in_cellar)}
          ${this.stockItem("wine_detail_reconstructed", e.bottles)}
          ${this.stockItem("wine_detail_effective", e.effective_stock)}
          ${this.stockItem("wine_detail_source_stock", e.ploud_bottles)}
        </div>
        ${t ? L`
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
        ` : $}
      </section>
    `;
  }
  renderLocations(e) {
    return e.locations.length ? L`
      <div class="locations">
        ${e.locations.map((t) => L`
          <div class="location">
            <strong>${t.rack}</strong>
            ${t.row !== null && t.column !== null ? L`<span class="muted"> · ${this.t("row")} ${t.row + 1}, ${this.t("column")} ${t.column + 1}</span>` : $}
          </div>
        `)}
      </div>
    ` : L`<p class="muted">${this.t("wine_detail_no_locations")}</p>`;
  }
  onDialogClosed() {
    this.dispatchEvent(new CustomEvent("wine-detail-closed", {
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    const e = this.wine;
    if (!e) return $;
    const t = e.service_temperature_min !== null || e.service_temperature_max !== null ? `${e.service_temperature_min === null ? "—" : this.formatNumber(e.service_temperature_min)}–${e.service_temperature_max === null ? "—" : this.formatNumber(e.service_temperature_max)} °C` : null;
    return L`
      <ha-dialog .open=${!0} header-title=${e.name} @closed=${() => this.onDialogClosed()}>
        <div class="content">
          ${this.imageUrl ? L`
            <div class="wine-image-container">
              <img class="wine-image" src=${this.imageUrl} alt=${e.name} />
            </div>
          ` : $}
          ${this.renderIdentity(e)}
          ${this.renderStock(e)}
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
          ${e.comment ? L`
            <section>
              <h3>${this.t("wine_detail_comment")}</h3>
              <div class="comment">${e.comment}</div>
            </section>
          ` : $}
        </div>
      </ha-dialog>
    `;
  }
};
Di.styles = Hn`
    :host {
      color: var(--primary-text-color);
      --mdc-dialog-min-width: min(560px, calc(100vw - 32px));
      --mdc-dialog-max-width: min(760px, calc(100vw - 32px));
    }
    .content { display: grid; gap: 20px; min-width: 0; }
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
yo([
  Ge({ attribute: !1 })
], Di.prototype, "hass", 2);
yo([
  Ge({ attribute: !1 })
], Di.prototype, "wine", 2);
yo([
  nt()
], Di.prototype, "imageUrl", 2);
Di = yo([
  qr("ploc-cellar-wine-detail")
], Di);
const ww = 400, bw = 4;
function Sw(e) {
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
  if (Number.isSafeInteger(a) && Number.isSafeInteger(o) && a > 0 && o > 0 && a <= ww / o) {
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
    bw,
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
function xw(e, t, r, i, n, a, o = 12) {
  const s = Math.max(o, n - r - o), l = Math.max(o, a - i - o);
  return {
    left: Math.min(Math.max(o, e), s),
    top: Math.min(Math.max(o, t), l)
  };
}
var Tw = Object.defineProperty, Cw = Object.getOwnPropertyDescriptor, We = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? Cw(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (i ? o(t, r, n) : o(n)) || n);
  return i && n && Tw(t, r, n), n;
};
let de = class extends Pe {
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
      const n = await e.callWS({
        type: "call_service",
        domain: "ploc_cellar",
        service: "get_inventory",
        service_data: { config_entry_id: r },
        return_response: !0
      });
      i === this.requestGeneration && (this.inventory = n.response, (!this.selectedRackId || !this.inventory.racks.some((a) => a.id === this.selectedRackId)) && (this.selectedRackId = this.inventory.racks[0]?.id));
    } catch (n) {
      i === this.requestGeneration && (this.error = n instanceof Error ? n.message : String(n));
    } finally {
      i === this.requestGeneration && (this.loading = !1);
    }
  }
  get selectedItems() {
    return (this.inventory?.rack_items ?? []).filter((e) => e.rack_id === this.selectedRackId);
  }
  get positionedItems() {
    return this.selectedItems.filter(
      (e) => Number.isSafeInteger(e.row) && Number.isSafeInteger(e.column)
    );
  }
  get wineById() {
    return new Map((this.inventory?.wines ?? []).map((e) => [e.id, e]));
  }
  get selectedRackColorCounts() {
    const e = /* @__PURE__ */ new Map();
    for (const t of this.selectedItems) {
      if (!t.wine_id) continue;
      const r = this.wineById.get(t.wine_id)?.color?.trim();
      r && e.set(r, (e.get(r) ?? 0) + 1);
    }
    return [...e.entries()].sort(([t], [r]) => t.localeCompare(r, this.hass?.language));
  }
  selectRack(e) {
    e.currentTarget instanceof HTMLSelectElement && (this.selectedRackId = e.currentTarget.value);
  }
  wineLabel(e) {
    if (!e.wine_id) return "";
    const t = this.wineById.get(e.wine_id);
    return t ? t.name : Dt(this.hass?.language ?? "en", "unknown_wine");
  }
  displayWineLabel(e) {
    return this.wineLabel(e);
  }
  wineColor(e) {
    const t = e?.color_rgb;
    return !t || t.length !== 3 || !t.every((r) => Number.isInteger(r) && r >= 0 && r <= 255) ? "var(--secondary-text-color)" : `rgb(${t[0]} ${t[1]} ${t[2]})`;
  }
  wineTooltipFields(e) {
    const t = this.hass?.language ?? "en", r = (a) => Dt(t, a), i = [];
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
    const r = xw(
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
    const e = (l) => Dt(this.hass?.language ?? "en", l), t = this.inventory, r = t?.racks.find((l) => l.id === this.selectedRackId), i = this.positionedItems, n = Sw(
      i.map((l) => ({
        id: l.id,
        row: l.row,
        column: l.column
      }))
    ), a = new Map(
      n.positions.map((l) => [l.id, l])
    ), o = this.selectedItems.filter(
      (l) => !Number.isSafeInteger(l.row) || !Number.isSafeInteger(l.column)
    ), s = (t?.rack_items ?? []).filter(
      (l) => !t?.racks.some((u) => u.id === l.rack_id)
    );
    return L`
      <ha-card>
        <header>
          <h2>${this.config?.title ?? e("rack_title")}</h2>
          <button ?disabled=${this.loading} @click=${() => this.refresh()}>${this.loading ? "…" : e("refresh")}</button>
        </header>
        ${this.error ? L`<div class="error">${this.error}</div>` : $}
        ${this.config?.config_entry_id ? $ : L`<div class="muted">${e("select_config")}</div>`}
        ${t?.stale ? L`<div class="warning">${e("stale")}</div>` : $}
        ${t?.racks.length ? L`
          ${t.racks.length > 1 ? this.config?.rack_picker_mode === "dropdown" ? L`
                <div class="rack-picker">
                  <select class="rack-picker-select"
                    aria-label=${e("rack_selection")}
                    .value=${this.selectedRackId ?? ""}
                    @change=${this.selectRack}>
                    ${t.racks.map((l) => L`
                      <option value=${l.id}>${l.name}</option>
                    `)}
                  </select>
                </div>
              ` : L`
                <nav class="rack-picker" aria-label=${e("rack_selection")}>
                  ${t.racks.map((l) => L`
                    <button aria-pressed=${l.id === this.selectedRackId}
                      @click=${() => {
      this.selectedRackId = l.id;
    }}>${l.name}</button>
                  `)}
                </nav>
              ` : $}
          <div class="rack-summary">
            <div><strong>${r?.name ?? ""}</strong> · ${this.selectedItems.filter((l) => l.wine_id).length} ${e("occupied")} · ${this.selectedItems.filter((l) => !l.wine_id).length} ${e("free")}</div>
            ${this.selectedRackColorCounts.length ? L`<div class="color-counts">${this.selectedRackColorCounts.map(([l, u], c) => L`${c ? " · " : $}<span class="color-count">${l}: ${u}</span>`)}</div>` : $}
          </div>
          ${i.length ? L`
            ${n.compact ? L`<div class="warning">${e("rack_grid_compacted")}</div>` : $}
            <div class="grid-wrap">
              <div class="rack-grid" style=${`grid-template-columns: repeat(${n.columnCount}, 98px); grid-template-rows: repeat(${n.rowCount}, 98px);`}>
                ${i.map((l) => {
      const u = a.get(l.id);
      if (!u) return $;
      const c = !!l.wine_id, h = l.wine_id ? this.wineById.get(l.wine_id) : void 0, v = c ? this.wineLabel(l) : e("empty_position");
      return L`
                    <div class=${c ? "slot occupied" : "slot empty"}
                      style=${`grid-row: ${u.row}; grid-column: ${u.column};`}
                      aria-label=${v}
                      role=${h ? "button" : c ? "img" : $}
                      aria-haspopup=${h ? "dialog" : $}
                      tabindex=${c ? "0" : $}
                      @click=${h ? () => {
        this.selectedWine = h;
      } : $}
                      @keydown=${h ? (f) => {
        (f.key === "Enter" || f.key === " ") && (f.preventDefault(), this.selectedWine = h);
      } : $}
                      @pointerenter=${c ? (f) => this.showWineTooltip(f, h) : $}
                      @pointermove=${c ? (f) => this.moveWineTooltip(f) : $}
                      @pointerleave=${c ? () => this.hideWineTooltip() : $}
                      @focus=${c ? (f) => this.showWineTooltip(f, h) : $}
                      @blur=${c ? () => this.hideWineTooltip() : $}>
                      ${c ? L`<span class="bottle-marker" style=${`--bottle-color: ${this.wineColor(h)};`} aria-hidden="true"></span>` : $}
                      ${c ? L`<strong>${this.displayWineLabel(l)}</strong>` : L`<span class="empty-shelf" aria-hidden="true"></span>`}
                      <small>r${l.row + 1};c${l.column + 1}</small>
                    </div>
                  `;
    })}
                ${n.missingCoordinates.map((l) => L`
                  <div class="slot missing"
                    style=${`grid-row: ${l.row}; grid-column: ${l.column};`}>
                    <strong>—</strong>
                    <small>${e("not_mapped")}</small>
                  </div>
                `)}
              </div>
            </div>
          ` : L`<div class="warning">${e("no_coordinates")}</div>`}
          ${o.length ? L`
            <div class="unplaced">
              <strong>${e("positions_without_coordinates")}</strong>
              ${o.map((l) => L`<div class="unplaced-item">${this.wineLabel(l) || e("empty_position")}</div>`)}
            </div>
          ` : $}
        ` : L`<p class="muted">${e("no_racks")}</p>`}
        ${s.length ? L`
          <div class="warning">${s.length} ${e("missing_rack")}</div>
        ` : $}
        ${this.activeTooltip ? L`
          <div class="wine-tooltip"
            role="tooltip"
            style=${`left: 12px; top: 12px; --wine-tooltip-border-color: ${this.activeTooltip.color};`}>
            ${this.activeTooltip.wine ? L`
              <div class="wine-tooltip-name">${this.activeTooltip.wine.name}</div>
              <dl class="wine-tooltip-details">
                ${this.wineTooltipFields(this.activeTooltip.wine).map(([l, u]) => L`
                  <dt>${l}</dt><dd>${u}</dd>
                `)}
              </dl>
            ` : e("unknown_wine")}
          </div>
        ` : $}
        ${this.selectedWine ? L`
          <ploc-cellar-wine-detail
            .hass=${this.hass}
            .wine=${this.selectedWine}
            @wine-detail-closed=${() => {
      this.selectedWine = void 0;
    }}>
          </ploc-cellar-wine-detail>
        ` : $}
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
de.styles = Hn`
    :host { display: block; }
    ha-card { padding: 16px; color: var(--primary-text-color); }
    header { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    h2 { margin: 0; font-size: 1.2rem; font-weight: 500; }
    button { color: var(--primary-text-color); background: var(--secondary-background-color); border: 1px solid var(--divider-color); border-radius: 8px; padding: 8px 12px; cursor: pointer; }
    button[aria-pressed="true"] { border-color: var(--primary-color); background: var(--secondary-background-color); }
    button[disabled] { opacity: .5; cursor: default; }
    .rack-picker { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin: 14px 0; }
    .rack-picker-select { width: 100%; max-width: 360px; min-height: 40px; padding: 8px 12px; color: var(--primary-text-color); background: var(--card-background-color); border: 1px solid var(--divider-color); border-radius: 8px; font: inherit; }
    .grid-wrap { display: flex; justify-content: safe center; overflow-x: auto; padding: 4px 0 12px; }
    .rack-grid { display: grid; flex: 0 0 auto; gap: 6px; width: max-content; min-width: min-content; }
    .rack-summary { color: var(--secondary-text-color); font-size: .85rem; line-height: 1.2; text-align: center; margin: 8px 0; }
    .color-counts { text-align: center; margin-top: -2px; }
    .color-count { white-space: nowrap; }
    .slot { width: 98px; height: 98px; min-width: 98px; min-height: 98px; display: flex; overflow: hidden; flex-direction: column; justify-content: flex-start; align-items: center; gap: 3px; text-align: center; padding: 5px 4px; border-radius: 8px; border: 1px solid var(--divider-color); background: var(--secondary-background-color); box-sizing: border-box; }
    .slot.occupied { border-color: var(--primary-color); background: var(--card-background-color); cursor: help; }
    .slot.occupied[role="button"] { cursor: pointer; }
    .slot.occupied:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
    .wine-tooltip { position: fixed; z-index: 1000; max-width: min(360px, calc(100vw - 24px)); padding: 5px 8px; border: 1px solid var(--wine-tooltip-border-color, var(--secondary-text-color)); border-radius: 4px; background: var(--card-background-color); color: var(--primary-text-color); box-shadow: 0 2px 8px rgb(0 0 0 / 25%); font-size: 10px; pointer-events: none; overflow-wrap: anywhere; }
    .wine-tooltip-name { margin: 0 0 4px; font-weight: 600; }
    .wine-tooltip-details { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 2px 8px; margin: 0; }
    .wine-tooltip-details dt { color: var(--secondary-text-color); }
    .wine-tooltip-details dd { margin: 0; }
    .slot.missing { border-style: dashed; color: var(--secondary-text-color); background: transparent; }
    .slot.empty { position: relative; }
    .empty-shelf { display: block; position: relative; flex: 0 0 28px; width: 28px; height: 28px; margin: 0; box-sizing: border-box; }
    .empty-shelf::after { content: ""; position: absolute; right: 0; bottom: 0; left: 0; height: 14px; border: 2px solid var(--secondary-text-color); border-top: 0; border-radius: 0 0 14px 14px; box-sizing: border-box; opacity: .75; }
    .slot strong { display: -webkit-box; width: 100%; min-height: 3.45em; max-height: 3.45em; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 3; font-size: .76rem; line-height: 1.15; overflow-wrap: anywhere; }
    .slot small { color: var(--secondary-text-color); font-size: .68rem; margin-top: auto; }
    .bottle-marker { display: block; flex: 0 0 24px; width: 24px; height: 24px; border-radius: 50%; background: var(--bottle-color, var(--secondary-text-color)); border: 2px solid var(--divider-color); box-shadow: inset 0 1px 3px rgb(0 0 0 / 25%), 0 1px 2px rgb(0 0 0 / 15%); box-sizing: border-box; }
    .legend, .muted { color: var(--secondary-text-color); font-size: .85rem; }
    .warning { color: var(--warning-color); padding: 8px 0; }
    .error { color: var(--error-color); padding: 8px 0; }
    .unplaced { border-top: 1px solid var(--divider-color); padding-top: 10px; margin-top: 10px; }
    .unplaced-item { padding: 5px 0; }
  `;
We([
  Ge({ attribute: !1 })
], de.prototype, "hass", 2);
We([
  nt()
], de.prototype, "config", 2);
We([
  nt()
], de.prototype, "inventory", 2);
We([
  nt()
], de.prototype, "selectedRackId", 2);
We([
  nt()
], de.prototype, "loading", 2);
We([
  nt()
], de.prototype, "error", 2);
We([
  nt()
], de.prototype, "activeTooltip", 2);
We([
  nt()
], de.prototype, "selectedWine", 2);
de = We([
  qr("ploc-cellar-rack-card")
], de);
window.customCards ??= [];
window.customCards.push({
  type: "ploc-cellar-rack-card",
  name: Ci("picker_rack_name"),
  description: Ci("picker_rack_description")
});
var Dw = Object.defineProperty, Mw = Object.getOwnPropertyDescriptor, jt = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? Mw(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (i ? o(t, r, n) : o(n)) || n);
  return i && n && Dw(t, r, n), n;
};
let Et = class extends Pe {
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
    const r = ++this.requestGeneration;
    this.loading = !0, this.error = void 0;
    try {
      const i = await e.callWS({
        type: "call_service",
        domain: "ploc_cellar",
        service: "get_inventory",
        service_data: { config_entry_id: t.config_entry_id },
        return_response: !0
      });
      r === this.requestGeneration && (this.inventory = i.response);
    } catch (i) {
      r === this.requestGeneration && (this.error = i instanceof Error ? i.message : String(i));
    } finally {
      r === this.requestGeneration && (this.loading = !1);
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
    return L`
      <select aria-label=${t} .value=${r}
        @change=${(n) => {
      const a = n.target.value;
      e === "color" ? this.color = a : e === "region" ? this.region = a : e === "appellation" ? this.appellation = a : this.vintage = a;
    }}>
        <option value="" ?selected=${!r}>${t}</option>
        ${i.map((n) => L`<option value=${n} ?selected=${n === r}>${n}</option>`)}
      </select>
    `;
  }
  detail(e, t) {
    return t == null || t === "" ? $ : L`<div><span class="detail-label">${e}</span>${t}</div>`;
  }
  renderWine(e) {
    const t = (a) => Dt(this.hass?.language ?? "en", a), r = e.locations.map((a) => {
      const o = a.row !== null && a.column !== null ? ` · ${t("row")} ${a.row + 1}, ${t("column")} ${a.column + 1}` : "";
      return `${a.rack}${o}`;
    }), i = e.vintage === null ? t("unknown_vintage") : String(e.vintage), n = e.bottle_volume_l === null ? null : `${e.bottle_volume_l.toLocaleString(this.hass?.language ?? void 0)} L`;
    return L`
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
          ${e.color ? L`<span class="tag">${e.color}</span>` : $}
          <span class="tag">${i}</span>
          ${e.bottle_format ? L`<span class="tag">${e.bottle_format}</span>` : $}
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
    const e = (n) => Dt(this.hass?.language ?? "en", n), t = this.filteredWines, r = t.reduce((n, a) => n + a.bottles_in_cellar, 0), i = !!(this.search || this.color || this.region || this.appellation || this.vintage);
    return L`
      <ha-card>
        <header>
          <h2>${this.config?.title ?? e("inventory_title")}</h2>
          <div class="actions">
            <button ?disabled=${this.loading} @click=${() => this.refresh()}>
              ${this.loading ? e("loading") : e("refresh")}
            </button>
          </div>
        </header>
        ${this.error ? L`<div class="error">${this.error}</div>` : $}
        ${this.config?.config_entry_id ? $ : L`<div class="muted">${e("select_config")}</div>`}
        ${this.inventory?.stale ? L`<div class="warning">${e("stale")}</div>` : $}
        ${this.inventory ? L`
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
            ${i ? L`<button @click=${() => this.clearFilters()}>${e("clear_filters")}</button>` : $}
          </div>
          ${this.inventory.stock_reconstruction_complete ? $ : L`<div class="warning">${e("reconstruction_incomplete")}</div>`}
          <div class="wine-list">
            ${t.map((n) => this.renderWine(n))}
          </div>
          ${t.length === 0 ? L`<p class="muted">${e("no_matching_wines")}</p>` : $}
          ${this.selectedWine ? L`
            <ploc-cellar-wine-detail
              .hass=${this.hass}
              .wine=${this.selectedWine}
              @wine-detail-closed=${() => {
      this.selectedWine = void 0;
    }}>
            </ploc-cellar-wine-detail>
          ` : $}
        ` : $}
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
Et.styles = Hn`
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
    .wine-name { font-weight: 600; line-height: 1.35; overflow-wrap: anywhere; }
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
jt([
  Ge({ attribute: !1 })
], Et.prototype, "hass", 2);
jt([
  nt()
], Et.prototype, "config", 2);
jt([
  nt()
], Et.prototype, "inventory", 2);
jt([
  nt()
], Et.prototype, "loading", 2);
jt([
  nt()
], Et.prototype, "error", 2);
jt([
  nt()
], Et.prototype, "search", 2);
jt([
  nt()
], Et.prototype, "color", 2);
jt([
  nt()
], Et.prototype, "region", 2);
jt([
  nt()
], Et.prototype, "appellation", 2);
jt([
  nt()
], Et.prototype, "vintage", 2);
jt([
  nt()
], Et.prototype, "sort", 2);
jt([
  nt()
], Et.prototype, "selectedWine", 2);
Et = jt([
  qr("ploc-cellar-inventory-card")
], Et);
window.customCards ??= [];
window.customCards.push({
  type: "ploc-cellar-inventory-card",
  name: Ci("picker_inventory_name"),
  description: Ci("picker_inventory_description")
});
var Aw = Object.defineProperty, Pw = Object.getOwnPropertyDescriptor, ql = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? Pw(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (i ? o(t, r, n) : o(n)) || n);
  return i && n && Aw(t, r, n), n;
};
let Wa = class extends Pe {
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
      return Dt(
        this.hass?.language ?? "en",
        t[e.name]
      );
    }, this.computeHelper = (e) => {
      if (e.name === "config_entry_id")
        return Dt(this.hass?.language ?? "en", "editor_configuration_helper");
      if (e.name === "title")
        return Dt(this.hass?.language ?? "en", "editor_title_helper");
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
                label: Dt(this.hass?.language ?? "en", "editor_rack_picker_buttons"),
                value: "buttons"
              },
              {
                label: Dt(this.hass?.language ?? "en", "editor_rack_picker_dropdown"),
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
    return L`
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
ql([
  Ge({ attribute: !1 })
], Wa.prototype, "hass", 2);
ql([
  nt()
], Wa.prototype, "config", 2);
Wa = ql([
  qr("ploc-cellar-card-editor")
], Wa);
var Zs = function(e, t) {
  return Zs = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
    r.__proto__ = i;
  } || function(r, i) {
    for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (r[n] = i[n]);
  }, Zs(e, t);
};
function G(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  Zs(e, t);
  function r() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
}
var Iw = /* @__PURE__ */ (function() {
  function e() {
    this.firefox = !1, this.ie = !1, this.edge = !1, this.newEdge = !1, this.weChat = !1;
  }
  return e;
})(), kw = /* @__PURE__ */ (function() {
  function e() {
    this.browser = new Iw(), this.node = !1, this.wxa = !1, this.worker = !1, this.svgSupported = !1, this.touchEventsSupported = !1, this.pointerEventsSupported = !1, this.domSupported = !1, this.transformSupported = !1, this.transform3dSupported = !1, this.hasGlobalWindow = typeof window < "u";
  }
  return e;
})(), H = new kw();
typeof wx == "object" && typeof wx.getSystemInfoSync == "function" ? (H.wxa = !0, H.touchEventsSupported = !0) : typeof document > "u" && typeof self < "u" ? H.worker = !0 : !H.hasGlobalWindow || "Deno" in window ? (H.node = !0, H.svgSupported = !0) : Lw(navigator.userAgent, H);
function Lw(e, t) {
  var r = t.browser, i = e.match(/Firefox\/([\d.]+)/), n = e.match(/MSIE\s([\d.]+)/) || e.match(/Trident\/.+?rv:(([\d.]+))/), a = e.match(/Edge?\/([\d.]+)/), o = /micromessenger/i.test(e);
  i && (r.firefox = !0, r.version = i[1]), n && (r.ie = !0, r.version = n[1]), a && (r.edge = !0, r.version = a[1], r.newEdge = +a[1].split(".")[0] > 18), o && (r.weChat = !0), t.svgSupported = typeof SVGRect < "u", t.touchEventsSupported = "ontouchstart" in window && !r.ie && !r.edge, t.pointerEventsSupported = "onpointerdown" in window && (r.edge || r.ie && +r.version >= 11), t.domSupported = typeof document < "u";
  var s = document.documentElement.style;
  t.transform3dSupported = (r.ie && "transition" in s || r.edge || "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix() || "MozPerspective" in s) && !("OTransition" in s), t.transformSupported = t.transform3dSupported || r.ie && +r.version >= 9;
}
var Xl = 12, Rw = "sans-serif", Yr = Xl + "px " + Rw, $w = 20, Ew = 100, Ow = "007LLmW'55;N0500LLLLLLLLLL00NNNLzWW\\\\WQb\\0FWLg\\bWb\\WQ\\WrWWQ000CL5LLFLL0LL**F*gLLLL5F0LF\\FFF5.5N";
function Bw(e) {
  var t = {};
  if (typeof JSON > "u")
    return t;
  for (var r = 0; r < e.length; r++) {
    var i = String.fromCharCode(r + 32), n = (e.charCodeAt(r) - $w) / Ew;
    t[i] = n;
  }
  return t;
}
var Nw = Bw(Ow), Ii = {
  createCanvas: function() {
    return typeof document < "u" && document.createElement("canvas");
  },
  measureText: /* @__PURE__ */ (function() {
    var e, t;
    return function(r, i) {
      if (!e) {
        var n = Ii.createCanvas();
        e = n && n.getContext("2d");
      }
      if (e)
        return t !== i && (t = e.font = i || Yr), e.measureText(r);
      r = r || "", i = i || Yr;
      var a = /((?:\d+)?\.?\d*)px/.exec(i), o = a && +a[1] || Xl, s = 0;
      if (i.indexOf("mono") >= 0)
        s = o * r.length;
      else
        for (var l = 0; l < r.length; l++) {
          var u = Nw[r[l]];
          s += u == null ? o : u * o;
        }
      return { width: s };
    };
  })(),
  loadImage: function(e, t, r) {
    var i = new Image();
    return i.onload = t, i.onerror = r, i.src = e, i;
  }
}, ov = fr([
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
}, {}), sv = fr([
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
}, {}), Vn = Object.prototype.toString, wo = Array.prototype, Fw = wo.forEach, zw = wo.filter, Zl = wo.slice, Hw = wo.map, Qu = function() {
}.constructor, Kn = Qu ? Qu.prototype : null, Kl = "__proto__", Uw = 2311;
function lv() {
  return Uw++;
}
function jl() {
  for (var e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t];
  typeof console < "u" && console.error.apply(console, e);
}
function Q(e) {
  if (e == null || typeof e != "object")
    return e;
  var t = e, r = Vn.call(e);
  if (r === "[object Array]") {
    if (!fn(e)) {
      t = [];
      for (var i = 0, n = e.length; i < n; i++)
        t[i] = Q(e[i]);
    }
  } else if (sv[r]) {
    if (!fn(e)) {
      var a = e.constructor;
      if (a.from)
        t = a.from(e);
      else {
        t = new a(e.length);
        for (var i = 0, n = e.length; i < n; i++)
          t[i] = e[i];
      }
    }
  } else if (!ov[r] && !fn(e) && !Mn(e)) {
    t = {};
    for (var o in e)
      e.hasOwnProperty(o) && o !== Kl && (t[o] = Q(e[o]));
  }
  return t;
}
function _t(e, t, r) {
  if (!F(t) || !F(e))
    return r ? Q(t) : e;
  for (var i in t)
    if (t.hasOwnProperty(i) && i !== Kl) {
      var n = e[i], a = t[i];
      F(a) && F(n) && !B(a) && !B(n) && !Mn(a) && !Mn(n) && !Ju(a) && !Ju(n) && !fn(a) && !fn(n) ? _t(n, a, r) : (r || !(i in e)) && (e[i] = Q(t[i]));
    }
  return e;
}
function R(e, t) {
  if (Object.assign)
    Object.assign(e, t);
  else
    for (var r in t)
      t.hasOwnProperty(r) && r !== Kl && (e[r] = t[r]);
  return e;
}
function ct(e, t, r) {
  for (var i = pt(t), n = 0, a = i.length; n < a; n++) {
    var o = i[n];
    e[o] == null && (e[o] = t[o]);
  }
  return e;
}
function st(e, t) {
  if (e) {
    if (e.indexOf)
      return e.indexOf(t);
    for (var r = 0, i = e.length; r < i; r++)
      if (e[r] === t)
        return r;
  }
  return -1;
}
function Vw(e, t) {
  var r = e.prototype;
  function i() {
  }
  i.prototype = t.prototype, e.prototype = new i();
  for (var n in r)
    r.hasOwnProperty(n) && (e.prototype[n] = r[n]);
  e.prototype.constructor = e, e.superClass = t;
}
function Ye(e, t, r) {
  if (e = "prototype" in e ? e.prototype : e, t = "prototype" in t ? t.prototype : t, Object.getOwnPropertyNames)
    for (var i = Object.getOwnPropertyNames(t), n = 0; n < i.length; n++) {
      var a = i[n];
      a !== "constructor" && e[a] == null && (e[a] = t[a]);
    }
  else
    ct(e, t);
}
function Vt(e) {
  return !e || typeof e == "string" ? !1 : typeof e.length == "number";
}
function D(e, t, r) {
  if (e && t)
    if (e.forEach && e.forEach === Fw)
      e.forEach(t, r);
    else if (e.length === +e.length)
      for (var i = 0, n = e.length; i < n; i++)
        t.call(r, e[i], i, e);
    else
      for (var a in e)
        e.hasOwnProperty(a) && t.call(r, e[a], a, e);
}
function J(e, t, r) {
  if (!e)
    return [];
  if (!t)
    return Ql(e);
  if (e.map && e.map === Hw)
    return e.map(t, r);
  for (var i = [], n = 0, a = e.length; n < a; n++)
    i.push(t.call(r, e[n], n, e));
  return i;
}
function fr(e, t, r, i) {
  if (e && t) {
    for (var n = 0, a = e.length; n < a; n++)
      r = t.call(i, r, e[n], n, e);
    return r;
  }
}
function fe(e, t, r) {
  if (!e)
    return [];
  if (!t)
    return Ql(e);
  if (e.filter && e.filter === zw)
    return e.filter(t, r);
  for (var i = [], n = 0, a = e.length; n < a; n++)
    t.call(r, e[n], n, e) && i.push(e[n]);
  return i;
}
function pt(e) {
  if (!e)
    return [];
  if (Object.keys)
    return Object.keys(e);
  var t = [];
  for (var r in e)
    e.hasOwnProperty(r) && t.push(r);
  return t;
}
function Gw(e, t) {
  for (var r = [], i = 2; i < arguments.length; i++)
    r[i - 2] = arguments[i];
  return function() {
    return e.apply(t, r.concat(Zl.call(arguments)));
  };
}
var lt = Kn && rt(Kn.bind) ? Kn.call.bind(Kn.bind) : Gw;
function Zt(e) {
  for (var t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  return function() {
    return e.apply(this, t.concat(Zl.call(arguments)));
  };
}
function B(e) {
  return Array.isArray ? Array.isArray(e) : Vn.call(e) === "[object Array]";
}
function rt(e) {
  return typeof e == "function";
}
function U(e) {
  return typeof e == "string";
}
function Ks(e) {
  return Vn.call(e) === "[object String]";
}
function mt(e) {
  return typeof e == "number";
}
function F(e) {
  var t = typeof e;
  return t === "function" || !!e && t === "object";
}
function Ju(e) {
  return !!ov[Vn.call(e)];
}
function Gt(e) {
  return !!sv[Vn.call(e)];
}
function Mn(e) {
  return typeof e == "object" && typeof e.nodeType == "number" && typeof e.ownerDocument == "object";
}
function bo(e) {
  return e.colorStops != null;
}
function Ww(e) {
  return e.image != null;
}
function Yw(e) {
  return e !== e;
}
function An() {
  for (var e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t];
  for (var r = 0, i = e.length; r < i; r++)
    if (e[r] != null)
      return e[r];
}
function K(e, t) {
  return e ?? t;
}
function hn(e, t, r) {
  return e ?? t ?? r;
}
function Ql(e) {
  for (var t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  return Zl.apply(e, t);
}
function uv(e) {
  if (typeof e == "number")
    return [e, e, e, e];
  var t = e.length;
  return t === 2 ? [e[0], e[1], e[0], e[1]] : t === 3 ? [e[0], e[1], e[2], e[1]] : e;
}
function Ue(e, t) {
  if (!e)
    throw new Error(t);
}
function Me(e) {
  return e == null ? null : typeof e.trim == "function" ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}
var cv = "__ec_primitive__";
function js(e) {
  e[cv] = !0;
}
function fn(e) {
  return e[cv];
}
var qw = (function() {
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
    return pt(this.data);
  }, e.prototype.forEach = function(t) {
    var r = this.data;
    for (var i in r)
      r.hasOwnProperty(i) && t(r[i], i);
  }, e;
})(), hv = typeof Map == "function";
function Xw() {
  return hv ? /* @__PURE__ */ new Map() : new qw();
}
var Zw = (function() {
  function e(t) {
    var r = B(t);
    this.data = Xw();
    var i = this;
    t instanceof e ? t.each(n) : t && D(t, n);
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
    return hv ? Array.from(t) : t;
  }, e.prototype.removeKey = function(t) {
    this.data.delete(t);
  }, e;
})();
function tt(e) {
  return new Zw(e);
}
function Kw(e, t) {
  for (var r = new e.constructor(e.length + t.length), i = 0; i < e.length; i++)
    r[i] = e[i];
  for (var n = e.length, i = 0; i < t.length; i++)
    r[i + n] = t[i];
  return r;
}
function So(e, t) {
  var r;
  if (Object.create)
    r = Object.create(e);
  else {
    var i = function() {
    };
    i.prototype = e, r = new i();
  }
  return t && R(r, t), r;
}
function fv(e) {
  var t = e.style;
  t.webkitUserSelect = "none", t.userSelect = "none", t.webkitTapHighlightColor = "rgba(0,0,0,0)", t["-webkit-touch-callout"] = "none";
}
function Mi(e, t) {
  return e.hasOwnProperty(t);
}
function Ut() {
}
var jw = 180 / Math.PI;
function ki(e, t) {
  return e == null && (e = 0), t == null && (t = 0), [e, t];
}
function Qw(e) {
  return [e[0], e[1]];
}
function tc(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e;
}
function Jw(e, t, r) {
  return e[0] = t[0] - r[0], e[1] = t[1] - r[1], e;
}
function t1(e) {
  return Math.sqrt(e1(e));
}
function e1(e) {
  return e[0] * e[0] + e[1] * e[1];
}
function No(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e;
}
function r1(e, t) {
  var r = t1(t);
  return r === 0 ? (e[0] = 0, e[1] = 0) : (e[0] = t[0] / r, e[1] = t[1] / r), e;
}
function Qs(e, t) {
  return Math.sqrt((e[0] - t[0]) * (e[0] - t[0]) + (e[1] - t[1]) * (e[1] - t[1]));
}
var Js = Qs;
function i1(e, t) {
  return (e[0] - t[0]) * (e[0] - t[0]) + (e[1] - t[1]) * (e[1] - t[1]);
}
var _i = i1;
function Fo(e, t, r, i) {
  return e[0] = t[0] + i * (r[0] - t[0]), e[1] = t[1] + i * (r[1] - t[1]), e;
}
function Ie(e, t, r) {
  var i = t[0], n = t[1];
  return e[0] = r[0] * i + r[2] * n + r[4], e[1] = r[1] * i + r[3] * n + r[5], e;
}
function vi(e, t, r) {
  return e[0] = Math.min(t[0], r[0]), e[1] = Math.min(t[1], r[1]), e;
}
function di(e, t, r) {
  return e[0] = Math.max(t[0], r[0]), e[1] = Math.max(t[1], r[1]), e;
}
var jr = /* @__PURE__ */ (function() {
  function e(t, r) {
    this.target = t, this.topTarget = r && r.topTarget;
  }
  return e;
})(), n1 = (function() {
  function e(t) {
    this.handler = t, t.on("mousedown", this._dragStart, this), t.on("mousemove", this._drag, this), t.on("mouseup", this._dragEnd, this);
  }
  return e.prototype._dragStart = function(t) {
    for (var r = t.target; r && !r.draggable; )
      r = r.parent || r.__hostTarget;
    r && (this._draggingTarget = r, r.dragging = !0, this._x = t.offsetX, this._y = t.offsetY, this.handler.dispatchToElement(new jr(r, t), "dragstart", t.event));
  }, e.prototype._drag = function(t) {
    var r = this._draggingTarget;
    if (r) {
      var i = t.offsetX, n = t.offsetY, a = i - this._x, o = n - this._y;
      this._x = i, this._y = n, r.drift(a, o, t), this.handler.dispatchToElement(new jr(r, t), "drag", t.event);
      var s = this.handler.findHover(i, n, r).target, l = this._dropTarget;
      this._dropTarget = s, r !== s && (l && s !== l && this.handler.dispatchToElement(new jr(l, t), "dragleave", t.event), s && s !== l && this.handler.dispatchToElement(new jr(s, t), "dragenter", t.event));
    }
  }, e.prototype._dragEnd = function(t) {
    var r = this._draggingTarget;
    r && (r.dragging = !1), this.handler.dispatchToElement(new jr(r, t), "dragend", t.event), this._dropTarget && this.handler.dispatchToElement(new jr(this._dropTarget, t), "drop", t.event), this._draggingTarget = null, this._dropTarget = null;
  }, e;
})(), Re = (function() {
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
})(), a1 = Math.log(2);
function tl(e, t, r, i, n, a) {
  var o = i + "-" + n, s = e.length;
  if (a.hasOwnProperty(o))
    return a[o];
  if (t === 1) {
    var l = Math.round(Math.log((1 << s) - 1 & ~n) / a1);
    return e[r][l];
  }
  for (var u = i | 1 << r, c = r + 1; i & 1 << c; )
    c++;
  for (var h = 0, v = 0, f = 0; v < s; v++) {
    var d = 1 << v;
    d & n || (h += (f % 2 ? -1 : 1) * e[r][v] * tl(e, t - 1, c, u, n | d, a), f++);
  }
  return a[o] = h, h;
}
function ec(e, t) {
  var r = [
    [e[0], e[1], 1, 0, 0, 0, -t[0] * e[0], -t[0] * e[1]],
    [0, 0, 0, e[0], e[1], 1, -t[1] * e[0], -t[1] * e[1]],
    [e[2], e[3], 1, 0, 0, 0, -t[2] * e[2], -t[2] * e[3]],
    [0, 0, 0, e[2], e[3], 1, -t[3] * e[2], -t[3] * e[3]],
    [e[4], e[5], 1, 0, 0, 0, -t[4] * e[4], -t[4] * e[5]],
    [0, 0, 0, e[4], e[5], 1, -t[5] * e[4], -t[5] * e[5]],
    [e[6], e[7], 1, 0, 0, 0, -t[6] * e[6], -t[6] * e[7]],
    [0, 0, 0, e[6], e[7], 1, -t[7] * e[6], -t[7] * e[7]]
  ], i = {}, n = tl(r, 8, 0, 0, 0, i);
  if (n !== 0) {
    for (var a = [], o = 0; o < 8; o++)
      for (var s = 0; s < 8; s++)
        a[s] == null && (a[s] = 0), a[s] += ((o + s) % 2 ? -1 : 1) * tl(r, 7, o === 0 ? 1 : 0, 1 << o, 1 << s, i) / n * t[o];
    return function(l, u, c) {
      var h = u * a[6] + c * a[7] + 1;
      l[0] = (u * a[0] + c * a[1] + a[2]) / h, l[1] = (u * a[3] + c * a[4] + a[5]) / h;
    };
  }
}
var rc = "___zrEVENTSAVED", zo = [];
function o1(e, t, r, i, n) {
  return el(zo, t, i, n, !0) && el(e, r, zo[0], zo[1]);
}
function el(e, t, r, i, n) {
  if (t.getBoundingClientRect && H.domSupported && !vv(t)) {
    var a = t[rc] || (t[rc] = {}), o = s1(t, a), s = l1(o, a, n);
    if (s)
      return s(e, r, i), !0;
  }
  return !1;
}
function s1(e, t) {
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
  return r;
}
function l1(e, t, r) {
  for (var i = r ? "invTrans" : "trans", n = t[i], a = t.srcCoords, o = [], s = [], l = !0, u = 0; u < 4; u++) {
    var c = e[u].getBoundingClientRect(), h = 2 * u, v = c.left, f = c.top;
    o.push(v, f), l = l && a && v === a[h] && f === a[h + 1], s.push(e[u].offsetLeft, e[u].offsetTop);
  }
  return l && n ? n : (t.srcCoords = o, t[i] = r ? ec(s, o) : ec(o, s));
}
function vv(e) {
  return e.nodeName.toUpperCase() === "CANVAS";
}
var u1 = /([&<>"'])/g, c1 = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function Nt(e) {
  return e == null ? "" : (e + "").replace(u1, function(t, r) {
    return c1[r];
  });
}
var h1 = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, Ho = [], f1 = H.browser.firefox && +H.browser.version.split(".")[0] < 39;
function rl(e, t, r, i) {
  return r = r || {}, i ? ic(e, t, r) : f1 && t.layerX != null && t.layerX !== t.offsetX ? (r.zrX = t.layerX, r.zrY = t.layerY) : t.offsetX != null ? (r.zrX = t.offsetX, r.zrY = t.offsetY) : ic(e, t, r), r;
}
function ic(e, t, r) {
  if (H.domSupported && e.getBoundingClientRect) {
    var i = t.clientX, n = t.clientY;
    if (vv(e)) {
      var a = e.getBoundingClientRect();
      r.zrX = i - a.left, r.zrY = n - a.top;
      return;
    } else if (el(Ho, e, i, n)) {
      r.zrX = Ho[0], r.zrY = Ho[1];
      return;
    }
  }
  r.zrX = r.zrY = 0;
}
function Jl(e) {
  return e || window.event;
}
function re(e, t, r) {
  if (t = Jl(t), t.zrX != null)
    return t;
  var i = t.type, n = i && i.indexOf("touch") >= 0;
  if (n) {
    var o = i !== "touchend" ? t.targetTouches[0] : t.changedTouches[0];
    o && rl(e, o, t, r);
  } else {
    rl(e, t, t, r);
    var a = v1(t);
    t.zrDelta = a ? a / 120 : -(t.detail || 0) / 3;
  }
  var s = t.button;
  return t.which == null && s !== void 0 && h1.test(t.type) && (t.which = s & 1 ? 1 : s & 2 ? 3 : s & 4 ? 2 : 0), t;
}
function v1(e) {
  var t = e.wheelDelta;
  if (t)
    return t;
  var r = e.deltaX, i = e.deltaY;
  if (r == null || i == null)
    return t;
  var n = Math.abs(i !== 0 ? i : r), a = i > 0 ? -1 : i < 0 ? 1 : r > 0 ? -1 : 1;
  return 3 * n * a;
}
function d1(e, t, r, i) {
  e.addEventListener(t, r, i);
}
function p1(e, t, r, i) {
  e.removeEventListener(t, r, i);
}
var dv = function(e) {
  e.preventDefault(), e.stopPropagation(), e.cancelBubble = !0;
}, g1 = (function() {
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
        var l = n[o], u = rl(i, l, {});
        a.points.push([u.zrX, u.zrY]), a.touches.push(l);
      }
      this._track.push(a);
    }
  }, e.prototype._recognize = function(t) {
    for (var r in Uo)
      if (Uo.hasOwnProperty(r)) {
        var i = Uo[r](this._track, t);
        if (i)
          return i;
      }
  }, e;
})();
function nc(e) {
  var t = e[1][0] - e[0][0], r = e[1][1] - e[0][1];
  return Math.sqrt(t * t + r * r);
}
function _1(e) {
  return [
    (e[0][0] + e[1][0]) / 2,
    (e[0][1] + e[1][1]) / 2
  ];
}
var Uo = {
  pinch: function(e, t) {
    var r = e.length;
    if (r) {
      var i = (e[r - 1] || {}).points, n = (e[r - 2] || {}).points || i;
      if (n && n.length > 1 && i && i.length > 1) {
        var a = nc(i) / nc(n);
        !isFinite(a) && (a = 1), t.pinchScale = a;
        var o = _1(i);
        return t.pinchX = o[0], t.pinchY = o[1], {
          type: "pinch",
          target: e[0].target,
          event: t
        };
      }
    }
  }
};
function mi() {
  return [1, 0, 0, 1, 0, 0];
}
function tu(e) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 1, e[4] = 0, e[5] = 0, e;
}
function m1(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e;
}
function yi(e, t, r) {
  var i = t[0] * r[0] + t[2] * r[1], n = t[1] * r[0] + t[3] * r[1], a = t[0] * r[2] + t[2] * r[3], o = t[1] * r[2] + t[3] * r[3], s = t[0] * r[4] + t[2] * r[5] + t[4], l = t[1] * r[4] + t[3] * r[5] + t[5];
  return e[0] = i, e[1] = n, e[2] = a, e[3] = o, e[4] = s, e[5] = l, e;
}
function il(e, t, r) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4] + r[0], e[5] = t[5] + r[1], e;
}
function eu(e, t, r, i) {
  i === void 0 && (i = [0, 0]);
  var n = t[0], a = t[2], o = t[4], s = t[1], l = t[3], u = t[5], c = Math.sin(r), h = Math.cos(r);
  return e[0] = n * h + s * c, e[1] = -n * c + s * h, e[2] = a * h + l * c, e[3] = -a * c + h * l, e[4] = h * (o - i[0]) + c * (u - i[1]) + i[0], e[5] = h * (u - i[1]) - c * (o - i[0]) + i[1], e;
}
function y1(e, t, r) {
  var i = r[0], n = r[1];
  return e[0] = t[0] * i, e[1] = t[1] * n, e[2] = t[2] * i, e[3] = t[3] * n, e[4] = t[4] * i, e[5] = t[5] * n, e;
}
function pv(e, t) {
  var r = t[0], i = t[2], n = t[4], a = t[1], o = t[3], s = t[5], l = r * o - a * i;
  return l ? (l = 1 / l, e[0] = o * l, e[1] = -a * l, e[2] = -i * l, e[3] = r * l, e[4] = (i * s - o * n) * l, e[5] = (a * n - r * s) * l, e) : null;
}
var V = (function() {
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
})(), jn = Math.min, Qn = Math.max, gr = new V(), _r = new V(), mr = new V(), yr = new V(), Ni = new V(), Fi = new V(), it = (function() {
  function e(t, r, i, n) {
    i < 0 && (t = t + i, i = -i), n < 0 && (r = r + n, n = -n), this.x = t, this.y = r, this.width = i, this.height = n;
  }
  return e.prototype.union = function(t) {
    var r = jn(t.x, this.x), i = jn(t.y, this.y);
    isFinite(this.x) && isFinite(this.width) ? this.width = Qn(t.x + t.width, this.x + this.width) - r : this.width = t.width, isFinite(this.y) && isFinite(this.height) ? this.height = Qn(t.y + t.height, this.y + this.height) - i : this.height = t.height, this.x = r, this.y = i;
  }, e.prototype.applyTransform = function(t) {
    e.applyTransform(this, this, t);
  }, e.prototype.calculateTransform = function(t) {
    var r = this, i = t.width / r.width, n = t.height / r.height, a = mi();
    return il(a, a, [-r.x, -r.y]), y1(a, a, [i, n]), il(a, a, [t.x, t.y]), a;
  }, e.prototype.intersect = function(t, r) {
    if (!t)
      return !1;
    t instanceof e || (t = e.create(t));
    var i = this, n = i.x, a = i.x + i.width, o = i.y, s = i.y + i.height, l = t.x, u = t.x + t.width, c = t.y, h = t.y + t.height, v = !(a < l || u < n || s < c || h < o);
    if (r) {
      var f = 1 / 0, d = 0, _ = Math.abs(a - l), p = Math.abs(u - n), g = Math.abs(s - c), m = Math.abs(h - o), y = Math.min(_, p), w = Math.min(g, m);
      a < l || u < n ? y > d && (d = y, _ < p ? V.set(Fi, -_, 0) : V.set(Fi, p, 0)) : y < f && (f = y, _ < p ? V.set(Ni, _, 0) : V.set(Ni, -p, 0)), s < c || h < o ? w > d && (d = w, g < m ? V.set(Fi, 0, -g) : V.set(Fi, 0, m)) : y < f && (f = y, g < m ? V.set(Ni, 0, g) : V.set(Ni, 0, -m));
    }
    return r && V.copy(r, v ? Ni : Fi), v;
  }, e.prototype.contain = function(t, r) {
    var i = this;
    return t >= i.x && t <= i.x + i.width && r >= i.y && r <= i.y + i.height;
  }, e.prototype.clone = function() {
    return new e(this.x, this.y, this.width, this.height);
  }, e.prototype.copy = function(t) {
    e.copy(this, t);
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
    return new e(t.x, t.y, t.width, t.height);
  }, e.copy = function(t, r) {
    t.x = r.x, t.y = r.y, t.width = r.width, t.height = r.height;
  }, e.applyTransform = function(t, r, i) {
    if (!i) {
      t !== r && e.copy(t, r);
      return;
    }
    if (i[1] < 1e-5 && i[1] > -1e-5 && i[2] < 1e-5 && i[2] > -1e-5) {
      var n = i[0], a = i[3], o = i[4], s = i[5];
      t.x = r.x * n + o, t.y = r.y * a + s, t.width = r.width * n, t.height = r.height * a, t.width < 0 && (t.x += t.width, t.width = -t.width), t.height < 0 && (t.y += t.height, t.height = -t.height);
      return;
    }
    gr.x = mr.x = r.x, gr.y = yr.y = r.y, _r.x = yr.x = r.x + r.width, _r.y = mr.y = r.y + r.height, gr.transform(i), yr.transform(i), _r.transform(i), mr.transform(i), t.x = jn(gr.x, _r.x, mr.x, yr.x), t.y = jn(gr.y, _r.y, mr.y, yr.y);
    var l = Qn(gr.x, _r.x, mr.x, yr.x), u = Qn(gr.y, _r.y, mr.y, yr.y);
    t.width = l - t.x, t.height = u - t.y;
  }, e;
})(), gv = "silent";
function w1(e, t, r) {
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
    stop: b1
  };
}
function b1() {
  dv(this.event);
}
var S1 = (function(e) {
  G(t, e);
  function t() {
    var r = e !== null && e.apply(this, arguments) || this;
    return r.handler = null, r;
  }
  return t.prototype.dispose = function() {
  }, t.prototype.setCursor = function() {
  }, t;
})(Re), zi = /* @__PURE__ */ (function() {
  function e(t, r) {
    this.x = t, this.y = r;
  }
  return e;
})(), x1 = [
  "click",
  "dblclick",
  "mousewheel",
  "mouseout",
  "mouseup",
  "mousedown",
  "mousemove",
  "contextmenu"
], Vo = new it(0, 0, 0, 0), _v = (function(e) {
  G(t, e);
  function t(r, i, n, a, o) {
    var s = e.call(this) || this;
    return s._hovered = new zi(0, 0), s.storage = r, s.painter = i, s.painterRoot = a, s._pointerSize = o, n = n || new S1(), s.proxy = null, s.setHandlerProxy(n), s._draggingMgr = new n1(s), s;
  }
  return t.prototype.setHandlerProxy = function(r) {
    this.proxy && this.proxy.dispose(), r && (D(x1, function(i) {
      r.on && r.on(i, this[i], this);
    }, this), r.handler = this), this.proxy = r;
  }, t.prototype.mousemove = function(r) {
    var i = r.zrX, n = r.zrY, a = mv(this, i, n), o = this._hovered, s = o.target;
    s && !s.__zr && (o = this.findHover(o.x, o.y), s = o.target);
    var l = this._hovered = a ? new zi(i, n) : this.findHover(i, n), u = l.target, c = this.proxy;
    c.setCursor && c.setCursor(u ? u.cursor : "default"), s && u !== s && this.dispatchToElement(o, "mouseout", r), this.dispatchToElement(l, "mousemove", r), u && u !== s && this.dispatchToElement(l, "mouseover", r);
  }, t.prototype.mouseout = function(r) {
    var i = r.zrEventControl;
    i !== "only_globalout" && this.dispatchToElement(this._hovered, "mouseout", r), i !== "no_globalout" && this.trigger("globalout", { type: "globalout", event: r });
  }, t.prototype.resize = function() {
    this._hovered = new zi(0, 0);
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
      for (var o = "on" + i, s = w1(i, r, n); a && (a[o] && (s.cancelBubble = !!a[o].call(a, s)), a.trigger(i, s), a = a.__hostTarget ? a.__hostTarget : a.parent, !s.cancelBubble); )
        ;
      s.cancelBubble || (this.trigger(i, s), this.painter && this.painter.eachOtherLayer && this.painter.eachOtherLayer(function(l) {
        typeof l[o] == "function" && l[o].call(l, s), l.trigger && l.trigger(i, s);
      }));
    }
  }, t.prototype.findHover = function(r, i, n) {
    var a = this.storage.getDisplayList(), o = new zi(r, i);
    if (ac(a, o, r, i, n), this._pointerSize && !o.target) {
      for (var s = [], l = this._pointerSize, u = l / 2, c = new it(r - u, i - u, l, l), h = a.length - 1; h >= 0; h--) {
        var v = a[h];
        v !== n && !v.ignore && !v.ignoreCoarsePointer && (!v.parent || !v.parent.ignoreCoarsePointer) && (Vo.copy(v.getBoundingRect()), v.transform && Vo.applyTransform(v.transform), Vo.intersect(c) && s.push(v));
      }
      if (s.length)
        for (var f = 4, d = Math.PI / 12, _ = Math.PI * 2, p = 0; p < u; p += f)
          for (var g = 0; g < _; g += d) {
            var m = r + p * Math.cos(g), y = i + p * Math.sin(g);
            if (ac(s, o, m, y, n), o.target)
              return o;
          }
    }
    return o;
  }, t.prototype.processGesture = function(r, i) {
    this._gestureMgr || (this._gestureMgr = new g1());
    var n = this._gestureMgr;
    i === "start" && n.clear();
    var a = n.recognize(r, this.findHover(r.zrX, r.zrY, null).target, this.proxy.dom);
    if (i === "end" && n.clear(), a) {
      var o = a.type;
      r.gestureEvent = o;
      var s = new zi();
      s.target = a.target, this.dispatchToElement(s, o, a.event);
    }
  }, t;
})(Re);
D(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function(e) {
  _v.prototype[e] = function(t) {
    var r = t.zrX, i = t.zrY, n = mv(this, r, i), a, o;
    if ((e !== "mouseup" || !n) && (a = this.findHover(r, i), o = a.target), e === "mousedown")
      this._downEl = o, this._downPoint = [t.zrX, t.zrY], this._upEl = o;
    else if (e === "mouseup")
      this._upEl = o;
    else if (e === "click") {
      if (this._downEl !== this._upEl || !this._downPoint || Js(this._downPoint, [t.zrX, t.zrY]) > 4)
        return;
      this._downPoint = null;
    }
    this.dispatchToElement(a, e, t);
  };
});
function T1(e, t, r) {
  if (e[e.rectHover ? "rectContain" : "contain"](t, r)) {
    for (var i = e, n = void 0, a = !1; i; ) {
      if (i.ignoreClip && (a = !0), !a) {
        var o = i.getClipPath();
        if (o && !o.contain(t, r))
          return !1;
      }
      i.silent && (n = !0);
      var s = i.__hostTarget;
      i = s || i.parent;
    }
    return n ? gv : !0;
  }
  return !1;
}
function ac(e, t, r, i, n) {
  for (var a = e.length - 1; a >= 0; a--) {
    var o = e[a], s = void 0;
    if (o !== n && !o.ignore && (s = T1(o, r, i)) && (!t.topTarget && (t.topTarget = o), s !== gv)) {
      t.target = o;
      break;
    }
  }
}
function mv(e, t, r) {
  var i = e.painter;
  return t < 0 || t > i.getWidth() || r < 0 || r > i.getHeight();
}
var yv = 32, Hi = 7;
function C1(e) {
  for (var t = 0; e >= yv; )
    t |= e & 1, e >>= 1;
  return e + t;
}
function oc(e, t, r, i) {
  var n = t + 1;
  if (n === r)
    return 1;
  if (i(e[n++], e[t]) < 0) {
    for (; n < r && i(e[n], e[n - 1]) < 0; )
      n++;
    D1(e, t, n);
  } else
    for (; n < r && i(e[n], e[n - 1]) >= 0; )
      n++;
  return n - t;
}
function D1(e, t, r) {
  for (r--; t < r; ) {
    var i = e[t];
    e[t++] = e[r], e[r--] = i;
  }
}
function sc(e, t, r, i, n) {
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
function Go(e, t, r, i, n, a) {
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
function Wo(e, t, r, i, n, a) {
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
function M1(e, t) {
  var r = Hi, i, n, a = 0, o = [];
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
    var d = i[f], _ = n[f], p = i[f + 1], g = n[f + 1];
    n[f] = _ + g, f === a - 3 && (i[f + 1] = i[f + 2], n[f + 1] = n[f + 2]), a--;
    var m = Wo(e[p], e, d, _, 0, t);
    d += m, _ -= m, _ !== 0 && (g = Go(e[d + _ - 1], e, p, g, g - 1, t), g !== 0 && (_ <= g ? h(d, _, p, g) : v(d, _, p, g)));
  }
  function h(f, d, _, p) {
    var g = 0;
    for (g = 0; g < d; g++)
      o[g] = e[f + g];
    var m = 0, y = _, w = f;
    if (e[w++] = e[y++], --p === 0) {
      for (g = 0; g < d; g++)
        e[w + g] = o[m + g];
      return;
    }
    if (d === 1) {
      for (g = 0; g < p; g++)
        e[w + g] = e[y + g];
      e[w + p] = o[m];
      return;
    }
    for (var S = r, b, x, T; ; ) {
      b = 0, x = 0, T = !1;
      do
        if (t(e[y], o[m]) < 0) {
          if (e[w++] = e[y++], x++, b = 0, --p === 0) {
            T = !0;
            break;
          }
        } else if (e[w++] = o[m++], b++, x = 0, --d === 1) {
          T = !0;
          break;
        }
      while ((b | x) < S);
      if (T)
        break;
      do {
        if (b = Wo(e[y], o, m, d, 0, t), b !== 0) {
          for (g = 0; g < b; g++)
            e[w + g] = o[m + g];
          if (w += b, m += b, d -= b, d <= 1) {
            T = !0;
            break;
          }
        }
        if (e[w++] = e[y++], --p === 0) {
          T = !0;
          break;
        }
        if (x = Go(o[m], e, y, p, 0, t), x !== 0) {
          for (g = 0; g < x; g++)
            e[w + g] = e[y + g];
          if (w += x, y += x, p -= x, p === 0) {
            T = !0;
            break;
          }
        }
        if (e[w++] = o[m++], --d === 1) {
          T = !0;
          break;
        }
        S--;
      } while (b >= Hi || x >= Hi);
      if (T)
        break;
      S < 0 && (S = 0), S += 2;
    }
    if (r = S, r < 1 && (r = 1), d === 1) {
      for (g = 0; g < p; g++)
        e[w + g] = e[y + g];
      e[w + p] = o[m];
    } else {
      if (d === 0)
        throw new Error();
      for (g = 0; g < d; g++)
        e[w + g] = o[m + g];
    }
  }
  function v(f, d, _, p) {
    var g = 0;
    for (g = 0; g < p; g++)
      o[g] = e[_ + g];
    var m = f + d - 1, y = p - 1, w = _ + p - 1, S = 0, b = 0;
    if (e[w--] = e[m--], --d === 0) {
      for (S = w - (p - 1), g = 0; g < p; g++)
        e[S + g] = o[g];
      return;
    }
    if (p === 1) {
      for (w -= d, m -= d, b = w + 1, S = m + 1, g = d - 1; g >= 0; g--)
        e[b + g] = e[S + g];
      e[w] = o[y];
      return;
    }
    for (var x = r; ; ) {
      var T = 0, C = 0, M = !1;
      do
        if (t(o[y], e[m]) < 0) {
          if (e[w--] = e[m--], T++, C = 0, --d === 0) {
            M = !0;
            break;
          }
        } else if (e[w--] = o[y--], C++, T = 0, --p === 1) {
          M = !0;
          break;
        }
      while ((T | C) < x);
      if (M)
        break;
      do {
        if (T = d - Wo(o[y], e, f, d, d - 1, t), T !== 0) {
          for (w -= T, m -= T, d -= T, b = w + 1, S = m + 1, g = T - 1; g >= 0; g--)
            e[b + g] = e[S + g];
          if (d === 0) {
            M = !0;
            break;
          }
        }
        if (e[w--] = o[y--], --p === 1) {
          M = !0;
          break;
        }
        if (C = p - Go(e[m], o, 0, p, p - 1, t), C !== 0) {
          for (w -= C, y -= C, p -= C, b = w + 1, S = y + 1, g = 0; g < C; g++)
            e[b + g] = o[S + g];
          if (p <= 1) {
            M = !0;
            break;
          }
        }
        if (e[w--] = e[m--], --d === 0) {
          M = !0;
          break;
        }
        x--;
      } while (T >= Hi || C >= Hi);
      if (M)
        break;
      x < 0 && (x = 0), x += 2;
    }
    if (r = x, r < 1 && (r = 1), p === 1) {
      for (w -= d, m -= d, b = w + 1, S = m + 1, g = d - 1; g >= 0; g--)
        e[b + g] = e[S + g];
      e[w] = o[y];
    } else {
      if (p === 0)
        throw new Error();
      for (S = w - (p - 1), g = 0; g < p; g++)
        e[S + g] = o[g];
    }
  }
  return {
    mergeRuns: l,
    forceMergeRuns: u,
    pushRun: s
  };
}
function Pa(e, t, r, i) {
  r || (r = 0), i || (i = e.length);
  var n = i - r;
  if (!(n < 2)) {
    var a = 0;
    if (n < yv) {
      a = oc(e, r, i, t), sc(e, r, i, r + a, t);
      return;
    }
    var o = M1(e, t), s = C1(n);
    do {
      if (a = oc(e, r, i, t), a < s) {
        var l = n;
        l > s && (l = s), sc(e, r, r + l, r + a, t), a = l;
      }
      o.pushRun(r, a), o.mergeRuns(), n -= a, r += a;
    } while (n !== 0);
    o.forceMergeRuns();
  }
}
var Xt = 1, nn = 2, hi = 4, lc = !1;
function Yo() {
  lc || (lc = !0, console.warn("z / z2 / zlevel of displayable is invalid, which may cause unexpected errors"));
}
function uc(e, t) {
  return e.zlevel === t.zlevel ? e.z === t.z ? e.z2 - t.z2 : e.z - t.z : e.zlevel - t.zlevel;
}
var A1 = (function() {
  function e() {
    this._roots = [], this._displayList = [], this._displayListLen = 0, this.displayableSortFunc = uc;
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
    i.length = this._displayListLen, Pa(i, uc);
  }, e.prototype._updateAndAddDisplayable = function(t, r, i) {
    if (!(t.ignore && !i)) {
      t.beforeUpdate(), t.update(), t.afterUpdate();
      var n = t.getClipPath();
      if (t.ignoreClip)
        r = null;
      else if (n) {
        r ? r = r.slice() : r = [];
        for (var a = n, o = t; a; )
          a.parent = o, a.updateTransform(), r.push(a), o = a, a = a.getClipPath();
      }
      if (t.childrenRef) {
        for (var s = t.childrenRef(), l = 0; l < s.length; l++) {
          var u = s[l];
          t.__dirty && (u.__dirty |= Xt), this._updateAndAddDisplayable(u, r, i);
        }
        t.__dirty = 0;
      } else {
        var c = t;
        r && r.length ? c.__clipPaths = r : c.__clipPaths && c.__clipPaths.length > 0 && (c.__clipPaths = []), isNaN(c.z) && (Yo(), c.z = 0), isNaN(c.z2) && (Yo(), c.z2 = 0), isNaN(c.zlevel) && (Yo(), c.zlevel = 0), this._displayList[this._displayListLen++] = c;
      }
      var h = t.getDecalElement && t.getDecalElement();
      h && this._updateAndAddDisplayable(h, r, i);
      var v = t.getTextGuideLine();
      v && this._updateAndAddDisplayable(v, r, i);
      var f = t.getTextContent();
      f && this._updateAndAddDisplayable(f, r, i);
    }
  }, e.prototype.addRoot = function(t) {
    t.__zr && t.__zr.storage === this || this._roots.push(t);
  }, e.prototype.delRoot = function(t) {
    if (t instanceof Array) {
      for (var r = 0, i = t.length; r < i; r++)
        this.delRoot(t[r]);
      return;
    }
    var n = st(this._roots, t);
    n >= 0 && this._roots.splice(n, 1);
  }, e.prototype.delAllRoots = function() {
    this._roots = [], this._displayList = [], this._displayListLen = 0;
  }, e.prototype.getRoots = function() {
    return this._roots;
  }, e.prototype.dispose = function() {
    this._displayList = null, this._roots = null;
  }, e;
})(), Ya;
Ya = H.hasGlobalWindow && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function(e) {
  return setTimeout(e, 16);
};
var vn = {
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
    return 1 - vn.bounceOut(1 - e);
  },
  bounceOut: function(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  bounceInOut: function(e) {
    return e < 0.5 ? vn.bounceIn(e * 2) * 0.5 : vn.bounceOut(e * 2 - 1) * 0.5 + 0.5;
  }
}, Jn = Math.pow, ur = Math.sqrt, qa = 1e-8, wv = 1e-4, cc = ur(3), ta = 1 / 3, Ce = ki(), ae = ki(), wi = ki();
function ar(e) {
  return e > -qa && e < qa;
}
function bv(e) {
  return e > qa || e < -qa;
}
function Rt(e, t, r, i, n) {
  var a = 1 - n;
  return a * a * (a * e + 3 * n * t) + n * n * (n * i + 3 * a * r);
}
function hc(e, t, r, i, n) {
  var a = 1 - n;
  return 3 * (((t - e) * a + 2 * (r - t) * n) * a + (i - r) * n * n);
}
function Sv(e, t, r, i, n, a) {
  var o = i + 3 * (t - r) - e, s = 3 * (r - t * 2 + e), l = 3 * (t - e), u = e - n, c = s * s - 3 * o * l, h = s * l - 9 * o * u, v = l * l - 3 * s * u, f = 0;
  if (ar(c) && ar(h))
    if (ar(s))
      a[0] = 0;
    else {
      var d = -l / s;
      d >= 0 && d <= 1 && (a[f++] = d);
    }
  else {
    var _ = h * h - 4 * c * v;
    if (ar(_)) {
      var p = h / c, d = -s / o + p, g = -p / 2;
      d >= 0 && d <= 1 && (a[f++] = d), g >= 0 && g <= 1 && (a[f++] = g);
    } else if (_ > 0) {
      var m = ur(_), y = c * s + 1.5 * o * (-h + m), w = c * s + 1.5 * o * (-h - m);
      y < 0 ? y = -Jn(-y, ta) : y = Jn(y, ta), w < 0 ? w = -Jn(-w, ta) : w = Jn(w, ta);
      var d = (-s - (y + w)) / (3 * o);
      d >= 0 && d <= 1 && (a[f++] = d);
    } else {
      var S = (2 * c * s - 3 * o * h) / (2 * ur(c * c * c)), b = Math.acos(S) / 3, x = ur(c), T = Math.cos(b), d = (-s - 2 * x * T) / (3 * o), g = (-s + x * (T + cc * Math.sin(b))) / (3 * o), C = (-s + x * (T - cc * Math.sin(b))) / (3 * o);
      d >= 0 && d <= 1 && (a[f++] = d), g >= 0 && g <= 1 && (a[f++] = g), C >= 0 && C <= 1 && (a[f++] = C);
    }
  }
  return f;
}
function xv(e, t, r, i, n) {
  var a = 6 * r - 12 * t + 6 * e, o = 9 * t + 3 * i - 3 * e - 9 * r, s = 3 * t - 3 * e, l = 0;
  if (ar(o)) {
    if (bv(a)) {
      var u = -s / a;
      u >= 0 && u <= 1 && (n[l++] = u);
    }
  } else {
    var c = a * a - 4 * o * s;
    if (ar(c))
      n[0] = -a / (2 * o);
    else if (c > 0) {
      var h = ur(c), u = (-a + h) / (2 * o), v = (-a - h) / (2 * o);
      u >= 0 && u <= 1 && (n[l++] = u), v >= 0 && v <= 1 && (n[l++] = v);
    }
  }
  return l;
}
function Xa(e, t, r, i, n, a) {
  var o = (t - e) * n + e, s = (r - t) * n + t, l = (i - r) * n + r, u = (s - o) * n + o, c = (l - s) * n + s, h = (c - u) * n + u;
  a[0] = e, a[1] = o, a[2] = u, a[3] = h, a[4] = h, a[5] = c, a[6] = l, a[7] = i;
}
function P1(e, t, r, i, n, a, o, s, l, u, c) {
  var h, v = 5e-3, f = 1 / 0, d, _, p, g;
  Ce[0] = l, Ce[1] = u;
  for (var m = 0; m < 1; m += 0.05)
    ae[0] = Rt(e, r, n, o, m), ae[1] = Rt(t, i, a, s, m), p = _i(Ce, ae), p < f && (h = m, f = p);
  f = 1 / 0;
  for (var y = 0; y < 32 && !(v < wv); y++)
    d = h - v, _ = h + v, ae[0] = Rt(e, r, n, o, d), ae[1] = Rt(t, i, a, s, d), p = _i(ae, Ce), d >= 0 && p < f ? (h = d, f = p) : (wi[0] = Rt(e, r, n, o, _), wi[1] = Rt(t, i, a, s, _), g = _i(wi, Ce), _ <= 1 && g < f ? (h = _, f = g) : v *= 0.5);
  return ur(f);
}
function I1(e, t, r, i, n, a, o, s, l) {
  for (var u = e, c = t, h = 0, v = 1 / l, f = 1; f <= l; f++) {
    var d = f * v, _ = Rt(e, r, n, o, d), p = Rt(t, i, a, s, d), g = _ - u, m = p - c;
    h += Math.sqrt(g * g + m * m), u = _, c = p;
  }
  return h;
}
function Ft(e, t, r, i) {
  var n = 1 - i;
  return n * (n * e + 2 * i * t) + i * i * r;
}
function fc(e, t, r, i) {
  return 2 * ((1 - i) * (t - e) + i * (r - t));
}
function k1(e, t, r, i, n) {
  var a = e - 2 * t + r, o = 2 * (t - e), s = e - i, l = 0;
  if (ar(a)) {
    if (bv(o)) {
      var u = -s / o;
      u >= 0 && u <= 1 && (n[l++] = u);
    }
  } else {
    var c = o * o - 4 * a * s;
    if (ar(c)) {
      var u = -o / (2 * a);
      u >= 0 && u <= 1 && (n[l++] = u);
    } else if (c > 0) {
      var h = ur(c), u = (-o + h) / (2 * a), v = (-o - h) / (2 * a);
      u >= 0 && u <= 1 && (n[l++] = u), v >= 0 && v <= 1 && (n[l++] = v);
    }
  }
  return l;
}
function Tv(e, t, r) {
  var i = e + r - 2 * t;
  return i === 0 ? 0.5 : (e - t) / i;
}
function Za(e, t, r, i, n) {
  var a = (t - e) * i + e, o = (r - t) * i + t, s = (o - a) * i + a;
  n[0] = e, n[1] = a, n[2] = s, n[3] = s, n[4] = o, n[5] = r;
}
function L1(e, t, r, i, n, a, o, s, l) {
  var u, c = 5e-3, h = 1 / 0;
  Ce[0] = o, Ce[1] = s;
  for (var v = 0; v < 1; v += 0.05) {
    ae[0] = Ft(e, r, n, v), ae[1] = Ft(t, i, a, v);
    var f = _i(Ce, ae);
    f < h && (u = v, h = f);
  }
  h = 1 / 0;
  for (var d = 0; d < 32 && !(c < wv); d++) {
    var _ = u - c, p = u + c;
    ae[0] = Ft(e, r, n, _), ae[1] = Ft(t, i, a, _);
    var f = _i(ae, Ce);
    if (_ >= 0 && f < h)
      u = _, h = f;
    else {
      wi[0] = Ft(e, r, n, p), wi[1] = Ft(t, i, a, p);
      var g = _i(wi, Ce);
      p <= 1 && g < h ? (u = p, h = g) : c *= 0.5;
    }
  }
  return ur(h);
}
function R1(e, t, r, i, n, a, o) {
  for (var s = e, l = t, u = 0, c = 1 / o, h = 1; h <= o; h++) {
    var v = h * c, f = Ft(e, r, n, v), d = Ft(t, i, a, v), _ = f - s, p = d - l;
    u += Math.sqrt(_ * _ + p * p), s = f, l = d;
  }
  return u;
}
var $1 = /cubic-bezier\(([0-9,\.e ]+)\)/;
function Cv(e) {
  var t = e && $1.exec(e);
  if (t) {
    var r = t[1].split(","), i = +Me(r[0]), n = +Me(r[1]), a = +Me(r[2]), o = +Me(r[3]);
    if (isNaN(i + n + a + o))
      return;
    var s = [];
    return function(l) {
      return l <= 0 ? 0 : l >= 1 ? 1 : Sv(0, i, a, 1, l, s) && Rt(0, n, o, 1, s[0]);
    };
  }
}
var E1 = (function() {
  function e(t) {
    this._inited = !1, this._startTime = 0, this._pausedTime = 0, this._paused = !1, this._life = t.life || 1e3, this._delay = t.delay || 0, this.loop = t.loop || !1, this.onframe = t.onframe || Ut, this.ondestroy = t.ondestroy || Ut, this.onrestart = t.onrestart || Ut, t.easing && this.setEasing(t.easing);
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
    this.easing = t, this.easingFunc = rt(t) ? t : vn[t] || Cv(t);
  }, e;
})(), Dv = /* @__PURE__ */ (function() {
  function e(t) {
    this.value = t;
  }
  return e;
})(), O1 = (function() {
  function e() {
    this._len = 0;
  }
  return e.prototype.insert = function(t) {
    var r = new Dv(t);
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
})(), Gn = (function() {
  function e(t) {
    this._list = new O1(), this._maxSize = 10, this._map = {}, this._maxSize = t;
  }
  return e.prototype.put = function(t, r) {
    var i = this._list, n = this._map, a = null;
    if (n[t] == null) {
      var o = i.len(), s = this._lastRemovedEntry;
      if (o >= this._maxSize && o > 0) {
        var l = i.head;
        i.remove(l), delete n[l.key], a = l.value, this._lastRemovedEntry = l;
      }
      s ? s.value = r : s = new Dv(r), s.key = t, i.insertEntry(s), n[t] = s;
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
})(), vc = {
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
function dn(e) {
  return e = Math.round(e), e < 0 ? 0 : e > 255 ? 255 : e;
}
function dc(e) {
  return e < 0 ? 0 : e > 1 ? 1 : e;
}
function qo(e) {
  var t = e;
  return t.length && t.charAt(t.length - 1) === "%" ? dn(parseFloat(t) / 100 * 255) : dn(parseInt(t, 10));
}
function pn(e) {
  var t = e;
  return t.length && t.charAt(t.length - 1) === "%" ? dc(parseFloat(t) / 100) : dc(parseFloat(t));
}
function Xo(e, t, r) {
  return r < 0 ? r += 1 : r > 1 && (r -= 1), r * 6 < 1 ? e + (t - e) * r * 6 : r * 2 < 1 ? t : r * 3 < 2 ? e + (t - e) * (2 / 3 - r) * 6 : e;
}
function ee(e, t, r, i, n) {
  return e[0] = t, e[1] = r, e[2] = i, e[3] = n, e;
}
function nl(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e;
}
var Mv = new Gn(20), ea = null;
function Qr(e, t) {
  ea && nl(ea, t), ea = Mv.put(e, ea || t.slice());
}
function bi(e, t) {
  if (e) {
    t = t || [];
    var r = Mv.get(e);
    if (r)
      return nl(t, r);
    e = e + "";
    var i = e.replace(/ /g, "").toLowerCase();
    if (i in vc)
      return nl(t, vc[i]), Qr(e, t), t;
    var n = i.length;
    if (i.charAt(0) === "#") {
      if (n === 4 || n === 5) {
        var a = parseInt(i.slice(1, 4), 16);
        if (!(a >= 0 && a <= 4095)) {
          ee(t, 0, 0, 0, 1);
          return;
        }
        return ee(t, (a & 3840) >> 4 | (a & 3840) >> 8, a & 240 | (a & 240) >> 4, a & 15 | (a & 15) << 4, n === 5 ? parseInt(i.slice(4), 16) / 15 : 1), Qr(e, t), t;
      } else if (n === 7 || n === 9) {
        var a = parseInt(i.slice(1, 7), 16);
        if (!(a >= 0 && a <= 16777215)) {
          ee(t, 0, 0, 0, 1);
          return;
        }
        return ee(t, (a & 16711680) >> 16, (a & 65280) >> 8, a & 255, n === 9 ? parseInt(i.slice(7), 16) / 255 : 1), Qr(e, t), t;
      }
      return;
    }
    var o = i.indexOf("("), s = i.indexOf(")");
    if (o !== -1 && s + 1 === n) {
      var l = i.substr(0, o), u = i.substr(o + 1, s - (o + 1)).split(","), c = 1;
      switch (l) {
        case "rgba":
          if (u.length !== 4)
            return u.length === 3 ? ee(t, +u[0], +u[1], +u[2], 1) : ee(t, 0, 0, 0, 1);
          c = pn(u.pop());
        case "rgb":
          if (u.length >= 3)
            return ee(t, qo(u[0]), qo(u[1]), qo(u[2]), u.length === 3 ? c : pn(u[3])), Qr(e, t), t;
          ee(t, 0, 0, 0, 1);
          return;
        case "hsla":
          if (u.length !== 4) {
            ee(t, 0, 0, 0, 1);
            return;
          }
          return u[3] = pn(u[3]), pc(u, t), Qr(e, t), t;
        case "hsl":
          if (u.length !== 3) {
            ee(t, 0, 0, 0, 1);
            return;
          }
          return pc(u, t), Qr(e, t), t;
        default:
          return;
      }
    }
    ee(t, 0, 0, 0, 1);
  }
}
function pc(e, t) {
  var r = (parseFloat(e[0]) % 360 + 360) % 360 / 360, i = pn(e[1]), n = pn(e[2]), a = n <= 0.5 ? n * (i + 1) : n + i - n * i, o = n * 2 - a;
  return t = t || [], ee(t, dn(Xo(o, a, r + 1 / 3) * 255), dn(Xo(o, a, r) * 255), dn(Xo(o, a, r - 1 / 3) * 255), 1), e.length === 4 && (t[3] = e[3]), t;
}
function gc(e, t) {
  var r = bi(e);
  if (r) {
    for (var i = 0; i < 3; i++)
      r[i] = r[i] * (1 - t) | 0, r[i] > 255 ? r[i] = 255 : r[i] < 0 && (r[i] = 0);
    return Av(r, r.length === 4 ? "rgba" : "rgb");
  }
}
function Av(e, t) {
  if (!(!e || !e.length)) {
    var r = e[0] + "," + e[1] + "," + e[2];
    return (t === "rgba" || t === "hsva" || t === "hsla") && (r += "," + e[3]), t + "(" + r + ")";
  }
}
function Ka(e, t) {
  var r = bi(e);
  return r ? (0.299 * r[0] + 0.587 * r[1] + 0.114 * r[2]) * r[3] / 255 + (1 - r[3]) * t : 0;
}
var _c = new Gn(100);
function mc(e) {
  if (U(e)) {
    var t = _c.get(e);
    return t || (t = gc(e, -0.1), _c.put(e, t)), t;
  } else if (bo(e)) {
    var r = R({}, e);
    return r.colorStops = J(e.colorStops, function(i) {
      return {
        offset: i.offset,
        color: gc(i.color, -0.1)
      };
    }), r;
  }
  return e;
}
function B1(e) {
  return e.type === "linear";
}
function N1(e) {
  return e.type === "radial";
}
(function() {
  return H.hasGlobalWindow && rt(window.btoa) ? function(e) {
    return window.btoa(unescape(encodeURIComponent(e)));
  } : typeof Buffer < "u" ? function(e) {
    return Buffer.from(e).toString("base64");
  } : function(e) {
    return null;
  };
})();
var al = Array.prototype.slice;
function Fe(e, t, r) {
  return (t - e) * r + e;
}
function Zo(e, t, r, i) {
  for (var n = t.length, a = 0; a < n; a++)
    e[a] = Fe(t[a], r[a], i);
  return e;
}
function F1(e, t, r, i) {
  for (var n = t.length, a = n && t[0].length, o = 0; o < n; o++) {
    e[o] || (e[o] = []);
    for (var s = 0; s < a; s++)
      e[o][s] = Fe(t[o][s], r[o][s], i);
  }
  return e;
}
function ra(e, t, r, i) {
  for (var n = t.length, a = 0; a < n; a++)
    e[a] = t[a] + r[a] * i;
  return e;
}
function yc(e, t, r, i) {
  for (var n = t.length, a = n && t[0].length, o = 0; o < n; o++) {
    e[o] || (e[o] = []);
    for (var s = 0; s < a; s++)
      e[o][s] = t[o][s] + r[o][s] * i;
  }
  return e;
}
function z1(e, t) {
  for (var r = e.length, i = t.length, n = r > i ? t : e, a = Math.min(r, i), o = n[a - 1] || { color: [0, 0, 0, 0], offset: 0 }, s = a; s < Math.max(r, i); s++)
    n.push({
      offset: o.offset,
      color: o.color.slice()
    });
}
function H1(e, t, r) {
  var i = e, n = t;
  if (!(!i.push || !n.push)) {
    var a = i.length, o = n.length;
    if (a !== o) {
      var s = a > o;
      if (s)
        i.length = o;
      else
        for (var l = a; l < o; l++)
          i.push(r === 1 ? n[l] : al.call(n[l]));
    }
    for (var u = i[0] && i[0].length, l = 0; l < i.length; l++)
      if (r === 1)
        isNaN(i[l]) && (i[l] = n[l]);
      else
        for (var c = 0; c < u; c++)
          isNaN(i[l][c]) && (i[l][c] = n[l][c]);
  }
}
function Ia(e) {
  if (Vt(e)) {
    var t = e.length;
    if (Vt(e[0])) {
      for (var r = [], i = 0; i < t; i++)
        r.push(al.call(e[i]));
      return r;
    }
    return al.call(e);
  }
  return e;
}
function ka(e) {
  return e[0] = Math.floor(e[0]) || 0, e[1] = Math.floor(e[1]) || 0, e[2] = Math.floor(e[2]) || 0, e[3] = e[3] == null ? 1 : e[3], "rgba(" + e.join(",") + ")";
}
function U1(e) {
  return Vt(e && e[0]) ? 2 : 1;
}
var ia = 0, La = 1, Pv = 2, an = 3, ol = 4, sl = 5, wc = 6;
function bc(e) {
  return e === ol || e === sl;
}
function na(e) {
  return e === La || e === Pv;
}
var Ui = [0, 0, 0, 0], V1 = (function() {
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
    var n = this.keyframes, a = n.length, o = !1, s = wc, l = r;
    if (Vt(r)) {
      var u = U1(r);
      s = u, (u === 1 && !mt(r[0]) || u === 2 && !mt(r[0][0])) && (o = !0);
    } else if (mt(r) && !Yw(r))
      s = ia;
    else if (U(r))
      if (!isNaN(+r))
        s = ia;
      else {
        var c = bi(r);
        c && (l = c, s = an);
      }
    else if (bo(r)) {
      var h = R({}, l);
      h.colorStops = J(r.colorStops, function(f) {
        return {
          offset: f.offset,
          color: bi(f.color)
        };
      }), B1(r) ? s = ol : N1(r) && (s = sl), l = h;
    }
    a === 0 ? this.valType = s : (s !== this.valType || s === wc) && (o = !0), this.discrete = this.discrete || o;
    var v = {
      time: t,
      value: l,
      rawValue: r,
      percent: 0
    };
    return i && (v.easing = i, v.easingFunc = rt(i) ? i : vn[i] || Cv(i)), n.push(v), v;
  }, e.prototype.prepare = function(t, r) {
    var i = this.keyframes;
    this._needsSort && i.sort(function(_, p) {
      return _.time - p.time;
    });
    for (var n = this.valType, a = i.length, o = i[a - 1], s = this.discrete, l = na(n), u = bc(n), c = 0; c < a; c++) {
      var h = i[c], v = h.value, f = o.value;
      h.percent = h.time / t, s || (l && c !== a - 1 ? H1(v, f, n) : u && z1(v.colorStops, f.colorStops));
    }
    if (!s && n !== sl && r && this.needsAnimate() && r.needsAnimate() && n === r.valType && !r._finished) {
      this._additiveTrack = r;
      for (var d = i[0].value, c = 0; c < a; c++)
        n === ia ? i[c].additiveValue = i[c].value - d : n === an ? i[c].additiveValue = ra([], i[c].value, d, -1) : na(n) && (i[c].additiveValue = n === La ? ra([], i[c].value, d, -1) : yc([], i[c].value, d, -1));
    }
  }, e.prototype.step = function(t, r) {
    if (!this._finished) {
      this._additiveTrack && this._additiveTrack._finished && (this._additiveTrack = null);
      var i = this._additiveTrack != null, n = i ? "additiveValue" : "value", a = this.valType, o = this.keyframes, s = o.length, l = this.propName, u = a === an, c, h = this._lastFr, v = Math.min, f, d;
      if (s === 1)
        f = d = o[0];
      else {
        if (r < 0)
          c = 0;
        else if (r < this._lastFrP) {
          var _ = v(h + 1, s - 1);
          for (c = _; c >= 0 && !(o[c].percent <= r); c--)
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
        var p = d.percent - f.percent, g = p === 0 ? 1 : v((r - f.percent) / p, 1);
        d.easingFunc && (g = d.easingFunc(g));
        var m = i ? this._additiveValue : u ? Ui : t[l];
        if ((na(a) || u) && !m && (m = this._additiveValue = []), this.discrete)
          t[l] = g < 1 ? f.rawValue : d.rawValue;
        else if (na(a))
          a === La ? Zo(m, f[n], d[n], g) : F1(m, f[n], d[n], g);
        else if (bc(a)) {
          var y = f[n], w = d[n], S = a === ol;
          t[l] = {
            type: S ? "linear" : "radial",
            x: Fe(y.x, w.x, g),
            y: Fe(y.y, w.y, g),
            colorStops: J(y.colorStops, function(x, T) {
              var C = w.colorStops[T];
              return {
                offset: Fe(x.offset, C.offset, g),
                color: ka(Zo([], x.color, C.color, g))
              };
            }),
            global: w.global
          }, S ? (t[l].x2 = Fe(y.x2, w.x2, g), t[l].y2 = Fe(y.y2, w.y2, g)) : t[l].r = Fe(y.r, w.r, g);
        } else if (u)
          Zo(m, f[n], d[n], g), i || (t[l] = ka(m));
        else {
          var b = Fe(f[n], d[n], g);
          i ? this._additiveValue = b : t[l] = b;
        }
        i && this._addToTarget(t);
      }
    }
  }, e.prototype._addToTarget = function(t) {
    var r = this.valType, i = this.propName, n = this._additiveValue;
    r === ia ? t[i] = t[i] + n : r === an ? (bi(t[i], Ui), ra(Ui, Ui, n, 1), t[i] = ka(Ui)) : r === La ? ra(t[i], t[i], n, 1) : r === Pv && yc(t[i], t[i], n, 1);
  }, e;
})(), ru = (function() {
  function e(t, r, i, n) {
    if (this._tracks = {}, this._trackKeys = [], this._maxTime = 0, this._started = 0, this._clip = null, this._target = t, this._loop = r, r && n) {
      jl("Can' use additive animation on looped animation.");
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
    return this.whenWithKeys(t, r, pt(r), i);
  }, e.prototype.whenWithKeys = function(t, r, i, n) {
    for (var a = this._tracks, o = 0; o < i.length; o++) {
      var s = i[o], l = a[s];
      if (!l) {
        l = a[s] = new V1(s);
        var u = void 0, c = this._getAdditiveTrack(s);
        if (c) {
          var h = c.keyframes, v = h[h.length - 1];
          u = v && v.value, c.valType === an && u && (u = ka(u));
        } else
          u = this._target[s];
        if (u == null)
          continue;
        t > 0 && l.addKeyframe(0, Ia(u), n), this._trackKeys.push(s);
      }
      l.addKeyframe(t, Ia(r[s]), n);
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
        var v = new E1({
          life: n,
          loop: this._loop,
          delay: this._delay || 0,
          onframe: function(f) {
            r._started = 2;
            var d = r._additiveAnimators;
            if (d) {
              for (var _ = !1, p = 0; p < d.length; p++)
                if (d[p]._clip) {
                  _ = !0;
                  break;
                }
              _ || (r._additiveAnimators = null);
            }
            for (var p = 0; p < i.length; p++)
              i[p].step(r._target, f);
            var g = r._onframeCbs;
            if (g)
              for (var p = 0; p < g.length; p++)
                g[p](r._target, f);
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
    return J(this._trackKeys, function(r) {
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
          l && (t[a] = Ia(l.rawValue));
        }
      }
    }
  }, e.prototype.__changeFinalValue = function(t, r) {
    r = r || pt(t);
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
function pi() {
  return (/* @__PURE__ */ new Date()).getTime();
}
var G1 = (function(e) {
  G(t, e);
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
    for (var i = pi() - this._pausedTime, n = i - this._time, a = this._head; a; ) {
      var o = a.next, s = a.step(i, n);
      s && (a.ondestroy(), this.removeClip(a)), a = o;
    }
    this._time = i, r || (this.trigger("frame", n), this.stage.update && this.stage.update());
  }, t.prototype._startLoop = function() {
    var r = this;
    this._running = !0;
    function i() {
      r._running && (Ya(i), !r._paused && r.update());
    }
    Ya(i);
  }, t.prototype.start = function() {
    this._running || (this._time = pi(), this._pausedTime = 0, this._startLoop());
  }, t.prototype.stop = function() {
    this._running = !1;
  }, t.prototype.pause = function() {
    this._paused || (this._pauseStart = pi(), this._paused = !0);
  }, t.prototype.resume = function() {
    this._paused && (this._pausedTime += pi() - this._pauseStart, this._paused = !1);
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
    var n = new ru(r, i.loop);
    return this.addAnimator(n), n;
  }, t;
})(Re), W1 = 300, Ko = H.domSupported, jo = (function() {
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
  }, i = J(e, function(n) {
    var a = n.replace("mouse", "pointer");
    return r.hasOwnProperty(a) ? a : n;
  });
  return {
    mouse: e,
    touch: t,
    pointer: i
  };
})(), Sc = {
  mouse: ["mousemove", "mouseup"],
  pointer: ["pointermove", "pointerup"]
}, xc = !1;
function ll(e) {
  var t = e.pointerType;
  return t === "pen" || t === "touch";
}
function Y1(e) {
  e.touching = !0, e.touchTimer != null && (clearTimeout(e.touchTimer), e.touchTimer = null), e.touchTimer = setTimeout(function() {
    e.touching = !1, e.touchTimer = null;
  }, 700);
}
function Qo(e) {
  e && (e.zrByTouch = !0);
}
function q1(e, t) {
  return re(e.dom, new X1(e, t), !0);
}
function Iv(e, t) {
  for (var r = t, i = !1; r && r.nodeType !== 9 && !(i = r.domBelongToZr || r !== t && r === e.painterRoot); )
    r = r.parentNode;
  return i;
}
var X1 = /* @__PURE__ */ (function() {
  function e(t, r) {
    this.stopPropagation = Ut, this.stopImmediatePropagation = Ut, this.preventDefault = Ut, this.type = r.type, this.target = this.currentTarget = t.dom, this.pointerType = r.pointerType, this.clientX = r.clientX, this.clientY = r.clientY;
  }
  return e;
})(), ce = {
  mousedown: function(e) {
    e = re(this.dom, e), this.__mayPointerCapture = [e.zrX, e.zrY], this.trigger("mousedown", e);
  },
  mousemove: function(e) {
    e = re(this.dom, e);
    var t = this.__mayPointerCapture;
    t && (e.zrX !== t[0] || e.zrY !== t[1]) && this.__togglePointerCapture(!0), this.trigger("mousemove", e);
  },
  mouseup: function(e) {
    e = re(this.dom, e), this.__togglePointerCapture(!1), this.trigger("mouseup", e);
  },
  mouseout: function(e) {
    e = re(this.dom, e);
    var t = e.toElement || e.relatedTarget;
    Iv(this, t) || (this.__pointerCapturing && (e.zrEventControl = "no_globalout"), this.trigger("mouseout", e));
  },
  wheel: function(e) {
    xc = !0, e = re(this.dom, e), this.trigger("mousewheel", e);
  },
  mousewheel: function(e) {
    xc || (e = re(this.dom, e), this.trigger("mousewheel", e));
  },
  touchstart: function(e) {
    e = re(this.dom, e), Qo(e), this.__lastTouchMoment = /* @__PURE__ */ new Date(), this.handler.processGesture(e, "start"), ce.mousemove.call(this, e), ce.mousedown.call(this, e);
  },
  touchmove: function(e) {
    e = re(this.dom, e), Qo(e), this.handler.processGesture(e, "change"), ce.mousemove.call(this, e);
  },
  touchend: function(e) {
    e = re(this.dom, e), Qo(e), this.handler.processGesture(e, "end"), ce.mouseup.call(this, e), +/* @__PURE__ */ new Date() - +this.__lastTouchMoment < W1 && ce.click.call(this, e);
  },
  pointerdown: function(e) {
    ce.mousedown.call(this, e);
  },
  pointermove: function(e) {
    ll(e) || ce.mousemove.call(this, e);
  },
  pointerup: function(e) {
    ce.mouseup.call(this, e);
  },
  pointerout: function(e) {
    ll(e) || ce.mouseout.call(this, e);
  }
};
D(["click", "dblclick", "contextmenu"], function(e) {
  ce[e] = function(t) {
    t = re(this.dom, t), this.trigger(e, t);
  };
});
var ul = {
  pointermove: function(e) {
    ll(e) || ul.mousemove.call(this, e);
  },
  pointerup: function(e) {
    ul.mouseup.call(this, e);
  },
  mousemove: function(e) {
    this.trigger("mousemove", e);
  },
  mouseup: function(e) {
    var t = this.__pointerCapturing;
    this.__togglePointerCapture(!1), this.trigger("mouseup", e), t && (e.zrEventControl = "only_globalout", this.trigger("mouseout", e));
  }
};
function Z1(e, t) {
  var r = t.domHandlers;
  H.pointerEventsSupported ? D(jo.pointer, function(i) {
    Ra(t, i, function(n) {
      r[i].call(e, n);
    });
  }) : (H.touchEventsSupported && D(jo.touch, function(i) {
    Ra(t, i, function(n) {
      r[i].call(e, n), Y1(t);
    });
  }), D(jo.mouse, function(i) {
    Ra(t, i, function(n) {
      n = Jl(n), t.touching || r[i].call(e, n);
    });
  }));
}
function K1(e, t) {
  H.pointerEventsSupported ? D(Sc.pointer, r) : H.touchEventsSupported || D(Sc.mouse, r);
  function r(i) {
    function n(a) {
      a = Jl(a), Iv(e, a.target) || (a = q1(e, a), t.domHandlers[i].call(e, a));
    }
    Ra(t, i, n, { capture: !0 });
  }
}
function Ra(e, t, r, i) {
  e.mounted[t] = r, e.listenerOpts[t] = i, d1(e.domTarget, t, r, i);
}
function Jo(e) {
  var t = e.mounted;
  for (var r in t)
    t.hasOwnProperty(r) && p1(e.domTarget, r, t[r], e.listenerOpts[r]);
  e.mounted = {};
}
var Tc = /* @__PURE__ */ (function() {
  function e(t, r) {
    this.mounted = {}, this.listenerOpts = {}, this.touching = !1, this.domTarget = t, this.domHandlers = r;
  }
  return e;
})(), j1 = (function(e) {
  G(t, e);
  function t(r, i) {
    var n = e.call(this) || this;
    return n.__pointerCapturing = !1, n.dom = r, n.painterRoot = i, n._localHandlerScope = new Tc(r, ce), Ko && (n._globalHandlerScope = new Tc(document, ul)), Z1(n, n._localHandlerScope), n;
  }
  return t.prototype.dispose = function() {
    Jo(this._localHandlerScope), Ko && Jo(this._globalHandlerScope);
  }, t.prototype.setCursor = function(r) {
    this.dom.style && (this.dom.style.cursor = r || "default");
  }, t.prototype.__togglePointerCapture = function(r) {
    if (this.__mayPointerCapture = null, Ko && +this.__pointerCapturing ^ +r) {
      this.__pointerCapturing = r;
      var i = this._globalHandlerScope;
      r ? K1(this, i) : Jo(i);
    }
  }, t;
})(Re), kv = 1;
H.hasGlobalWindow && (kv = Math.max(window.devicePixelRatio || window.screen && window.screen.deviceXDPI / window.screen.logicalXDPI || 1, 1));
var ja = kv, cl = 0.4, hl = "#333", fl = "#ccc", Q1 = "#eee", Cc = tu, Dc = 5e-5;
function wr(e) {
  return e > Dc || e < -Dc;
}
var br = [], Jr = [], ts = mi(), es = Math.abs, iu = (function() {
  function e() {
  }
  return e.prototype.getLocalTransform = function(t) {
    return e.getLocalTransform(this, t);
  }, e.prototype.setPosition = function(t) {
    this.x = t[0], this.y = t[1];
  }, e.prototype.setScale = function(t) {
    this.scaleX = t[0], this.scaleY = t[1];
  }, e.prototype.setSkew = function(t) {
    this.skewX = t[0], this.skewY = t[1];
  }, e.prototype.setOrigin = function(t) {
    this.originX = t[0], this.originY = t[1];
  }, e.prototype.needLocalTransform = function() {
    return wr(this.rotation) || wr(this.x) || wr(this.y) || wr(this.scaleX - 1) || wr(this.scaleY - 1) || wr(this.skewX) || wr(this.skewY);
  }, e.prototype.updateTransform = function() {
    var t = this.parent && this.parent.transform, r = this.needLocalTransform(), i = this.transform;
    if (!(r || t)) {
      i && (Cc(i), this.invTransform = null);
      return;
    }
    i = i || mi(), r ? this.getLocalTransform(i) : Cc(i), t && (r ? yi(i, t, i) : m1(i, t)), this.transform = i, this._resolveGlobalScaleRatio(i);
  }, e.prototype._resolveGlobalScaleRatio = function(t) {
    var r = this.globalScaleRatio;
    if (r != null && r !== 1) {
      this.getGlobalScale(br);
      var i = br[0] < 0 ? -1 : 1, n = br[1] < 0 ? -1 : 1, a = ((br[0] - i) * r + i) / br[0] || 0, o = ((br[1] - n) * r + n) / br[1] || 0;
      t[0] *= a, t[1] *= a, t[2] *= o, t[3] *= o;
    }
    this.invTransform = this.invTransform || mi(), pv(this.invTransform, t);
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
      t && t.transform && (t.invTransform = t.invTransform || mi(), yi(Jr, t.invTransform, r), r = Jr);
      var i = this.originX, n = this.originY;
      (i || n) && (ts[4] = i, ts[5] = n, yi(Jr, r, ts), Jr[4] -= i, Jr[5] -= n, r = Jr), this.setLocalTransform(r);
    }
  }, e.prototype.getGlobalScale = function(t) {
    var r = this.transform;
    return t = t || [], r ? (t[0] = Math.sqrt(r[0] * r[0] + r[1] * r[1]), t[1] = Math.sqrt(r[2] * r[2] + r[3] * r[3]), r[0] < 0 && (t[0] = -t[0]), r[3] < 0 && (t[1] = -t[1]), t) : (t[0] = 1, t[1] = 1, t);
  }, e.prototype.transformCoordToLocal = function(t, r) {
    var i = [t, r], n = this.invTransform;
    return n && Ie(i, i, n), i;
  }, e.prototype.transformCoordToGlobal = function(t, r) {
    var i = [t, r], n = this.transform;
    return n && Ie(i, i, n), i;
  }, e.prototype.getLineScale = function() {
    var t = this.transform;
    return t && es(t[0] - 1) > 1e-10 && es(t[3] - 1) > 1e-10 ? Math.sqrt(es(t[0] * t[3] - t[2] * t[1])) : 1;
  }, e.prototype.copyTransform = function(t) {
    J1(this, t);
  }, e.getLocalTransform = function(t, r) {
    r = r || [];
    var i = t.originX || 0, n = t.originY || 0, a = t.scaleX, o = t.scaleY, s = t.anchorX, l = t.anchorY, u = t.rotation || 0, c = t.x, h = t.y, v = t.skewX ? Math.tan(t.skewX) : 0, f = t.skewY ? Math.tan(-t.skewY) : 0;
    if (i || n || s || l) {
      var d = i + s, _ = n + l;
      r[4] = -d * a - v * _ * o, r[5] = -_ * o - f * d * a;
    } else
      r[4] = r[5] = 0;
    return r[0] = a, r[3] = o, r[1] = f * a, r[2] = v * o, u && eu(r, r, u), r[4] += i + c, r[5] += n + h, r;
  }, e.initDefaultProps = (function() {
    var t = e.prototype;
    t.scaleX = t.scaleY = t.globalScaleRatio = 1, t.x = t.y = t.originX = t.originY = t.skewX = t.skewY = t.rotation = t.anchorX = t.anchorY = 0;
  })(), e;
})(), Pn = [
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
function J1(e, t) {
  for (var r = 0; r < Pn.length; r++) {
    var i = Pn[r];
    e[i] = t[i];
  }
}
var Mc = {};
function Kt(e, t) {
  t = t || Yr;
  var r = Mc[t];
  r || (r = Mc[t] = new Gn(500));
  var i = r.get(e);
  return i == null && (i = Ii.measureText(e, t).width, r.put(e, i)), i;
}
function Ac(e, t, r, i) {
  var n = Kt(e, t), a = nu(t), o = on(0, n, r), s = fi(0, a, i), l = new it(o, s, n, a);
  return l;
}
function Lv(e, t, r, i) {
  var n = ((e || "") + "").split(`
`), a = n.length;
  if (a === 1)
    return Ac(n[0], t, r, i);
  for (var o = new it(0, 0, 0, 0), s = 0; s < n.length; s++) {
    var l = Ac(n[s], t, r, i);
    s === 0 ? o.copy(l) : o.union(l);
  }
  return o;
}
function on(e, t, r) {
  return r === "right" ? e -= t : r === "center" && (e -= t / 2), e;
}
function fi(e, t, r) {
  return r === "middle" ? e -= t / 2 : r === "bottom" && (e -= t), e;
}
function nu(e) {
  return Kt("国", e);
}
function Ai(e, t) {
  return typeof e == "string" ? e.lastIndexOf("%") >= 0 ? parseFloat(e) / 100 * t : parseFloat(e) : e;
}
function Rv(e, t, r) {
  var i = t.position || "inside", n = t.distance != null ? t.distance : 5, a = r.height, o = r.width, s = a / 2, l = r.x, u = r.y, c = "left", h = "top";
  if (i instanceof Array)
    l += Ai(i[0], r.width), u += Ai(i[1], r.height), c = null, h = null;
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
var rs = "__zr_normal__", is = Pn.concat(["ignore"]), tb = fr(Pn, function(e, t) {
  return e[t] = !0, e;
}, { ignore: !1 }), ti = {}, eb = new it(0, 0, 0, 0), xo = (function() {
  function e(t) {
    this.id = lv(), this.animators = [], this.currentStates = [], this.states = {}, this._init(t);
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
      if (a.copyTransform(r), i.position != null) {
        var c = eb;
        i.layoutRect ? c.copy(i.layoutRect) : c.copy(this.getBoundingRect()), n || c.applyTransform(this.transform), this.calculateTextPosition ? this.calculateTextPosition(ti, i, c) : Rv(ti, i, c), a.x = ti.x, a.y = ti.y, o = ti.align, s = ti.verticalAlign;
        var h = i.origin;
        if (h && i.rotation != null) {
          var v = void 0, f = void 0;
          h === "center" ? (v = c.width * 0.5, f = c.height * 0.5) : (v = Ai(h[0], c.width), f = Ai(h[1], c.height)), u = !0, a.originX = -a.x + v + (n ? 0 : c.x), a.originY = -a.y + f + (n ? 0 : c.y);
        }
      }
      i.rotation != null && (a.rotation = i.rotation);
      var d = i.offset;
      d && (a.x += d[0], a.y += d[1], u || (a.originX = -d[0], a.originY = -d[1]));
      var _ = i.inside == null ? typeof i.position == "string" && i.position.indexOf("inside") >= 0 : i.inside, p = this._innerTextDefaultStyle || (this._innerTextDefaultStyle = {}), g = void 0, m = void 0, y = void 0;
      _ && this.canBeInsideText() ? (g = i.insideFill, m = i.insideStroke, (g == null || g === "auto") && (g = this.getInsideTextFill()), (m == null || m === "auto") && (m = this.getInsideTextStroke(g), y = !0)) : (g = i.outsideFill, m = i.outsideStroke, (g == null || g === "auto") && (g = this.getOutsideFill()), (m == null || m === "auto") && (m = this.getOutsideStroke(g), y = !0)), g = g || "#000", (g !== p.fill || m !== p.stroke || y !== p.autoStroke || o !== p.align || s !== p.verticalAlign) && (l = !0, p.fill = g, p.stroke = m, p.autoStroke = y, p.align = o, p.verticalAlign = s, r.setDefaultTextStyle(p)), r.__dirty |= Xt, l && r.dirtyStyle(!0);
    }
  }, e.prototype.canBeInsideText = function() {
    return !0;
  }, e.prototype.getInsideTextFill = function() {
    return "#fff";
  }, e.prototype.getInsideTextStroke = function(t) {
    return "#000";
  }, e.prototype.getOutsideFill = function() {
    return this.__zr && this.__zr.isDarkMode() ? fl : hl;
  }, e.prototype.getOutsideStroke = function(t) {
    var r = this.__zr && this.__zr.getBackgroundColor(), i = typeof r == "string" && bi(r);
    i || (i = [255, 255, 255, 1]);
    for (var n = i[3], a = this.__zr.isDarkMode(), o = 0; o < 3; o++)
      i[o] = i[o] * n + (a ? 0 : 255) * (1 - n);
    return i[3] = 1, Av(i, "rgba");
  }, e.prototype.traverse = function(t, r) {
  }, e.prototype.attrKV = function(t, r) {
    t === "textConfig" ? this.setTextConfig(r) : t === "textContent" ? this.setTextContent(r) : t === "clipPath" ? this.setClipPath(r) : t === "extra" ? (this.extra = this.extra || {}, R(this.extra, r)) : this[t] = r;
  }, e.prototype.hide = function() {
    this.ignore = !0, this.markRedraw();
  }, e.prototype.show = function() {
    this.ignore = !1, this.markRedraw();
  }, e.prototype.attr = function(t, r) {
    if (typeof t == "string")
      this.attrKV(t, r);
    else if (F(t))
      for (var i = t, n = pt(i), a = 0; a < n.length; a++) {
        var o = n[a];
        this.attrKV(o, t[o]);
      }
    return this.markRedraw(), this;
  }, e.prototype.saveCurrentToNormalState = function(t) {
    this._innerSaveToNormal(t);
    for (var r = this._normalState, i = 0; i < this.animators.length; i++) {
      var n = this.animators[i], a = n.__fromStateTransition;
      if (!(n.getLoop() || a && a !== rs)) {
        var o = n.targetName, s = o ? r[o] : r;
        n.saveTo(s);
      }
    }
  }, e.prototype._innerSaveToNormal = function(t) {
    var r = this._normalState;
    r || (r = this._normalState = {}), t.textConfig && !r.textConfig && (r.textConfig = this.textConfig), this._savePrimaryToNormal(t, r, is);
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
    this.useState(rs, !1, t);
  }, e.prototype.useState = function(t, r, i, n) {
    var a = t === rs, o = this.hasState();
    if (!(!o && a)) {
      var s = this.currentStates, l = this.stateTransition;
      if (!(st(s, t) >= 0 && (r || s.length === 1))) {
        var u;
        if (this.stateProxy && !a && (u = this.stateProxy(t)), u || (u = this.states && this.states[t]), !u && !a) {
          jl("State " + t + " not exists.");
          return;
        }
        a || this.saveCurrentToNormalState(u);
        var c = !!(u && u.hoverLayer || n);
        c && this._toggleHoverLayerFlag(!0), this._applyStateObj(t, u, this._normalState, r, !i && !this.__inHover && l && l.duration > 0, l);
        var h = this._textContent, v = this._textGuide;
        return h && h.useState(t, r, i, c), v && v.useState(t, r, i, c), a ? (this.currentStates = [], this._normalState = {}) : r ? this.currentStates.push(t) : this.currentStates = [t], this._updateAnimationTargets(), this.markRedraw(), !c && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~Xt), u;
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
      var h = n[o - 1], v = !!(h && h.hoverLayer || i);
      v && this._toggleHoverLayerFlag(!0);
      var f = this._mergeStates(n), d = this.stateTransition;
      this.saveCurrentToNormalState(f), this._applyStateObj(t.join(","), f, this._normalState, !1, !r && !this.__inHover && d && d.duration > 0, d);
      var _ = this._textContent, p = this._textGuide;
      _ && _.useStates(t, r, v), p && p.useStates(t, r, v), this._updateAnimationTargets(), this.currentStates = t.slice(), this.markRedraw(), !v && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~Xt);
    }
  }, e.prototype.isSilent = function() {
    for (var t = this.silent, r = this.parent; !t && r; ) {
      if (r.silent) {
        t = !0;
        break;
      }
      r = r.parent;
    }
    return t;
  }, e.prototype._updateAnimationTargets = function() {
    for (var t = 0; t < this.animators.length; t++) {
      var r = this.animators[t];
      r.targetName && r.changeTarget(this[r.targetName]);
    }
  }, e.prototype.removeState = function(t) {
    var r = st(this.currentStates, t);
    if (r >= 0) {
      var i = this.currentStates.slice();
      i.splice(r, 1), this.useStates(i);
    }
  }, e.prototype.replaceState = function(t, r, i) {
    var n = this.currentStates.slice(), a = st(n, t), o = st(n, r) >= 0;
    a >= 0 ? o ? n.splice(a, 1) : n[a] = r : i && !o && n.push(r), this.useStates(n);
  }, e.prototype.toggleState = function(t, r) {
    r ? this.useState(t, !0) : this.removeState(t);
  }, e.prototype._mergeStates = function(t) {
    for (var r = {}, i, n = 0; n < t.length; n++) {
      var a = t[n];
      R(r, a), a.textConfig && (i = i || {}, R(i, a.textConfig));
    }
    return i && (r.textConfig = i), r;
  }, e.prototype._applyStateObj = function(t, r, i, n, a, o) {
    var s = !(r && n);
    r && r.textConfig ? (this.textConfig = R({}, n ? this.textConfig : i.textConfig), R(this.textConfig, r.textConfig)) : s && i.textConfig && (this.textConfig = i.textConfig);
    for (var l = {}, u = !1, c = 0; c < is.length; c++) {
      var h = is[c], v = a && tb[h];
      r && r[h] != null ? v ? (u = !0, l[h] = r[h]) : this[h] = r[h] : s && i[h] != null && (v ? (u = !0, l[h] = i[h]) : this[h] = i[h]);
    }
    if (!a)
      for (var c = 0; c < this.animators.length; c++) {
        var f = this.animators[c], d = f.targetName;
        f.getLoop() || f.__changeFinalValue(d ? (r || i)[d] : r || i);
      }
    u && this._transitionState(t, l, o);
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
    r !== t && (r && r !== t && this.removeTextContent(), t.innerTransformable = new iu(), this._attachComponent(t), this._textContent = t, this.markRedraw());
  }, e.prototype.setTextConfig = function(t) {
    this.textConfig || (this.textConfig = {}), R(this.textConfig, t), this.markRedraw();
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
    this.__dirty |= Xt;
    var t = this.__zr;
    t && (this.__inHover ? t.refreshHover() : t.refresh()), this.__hostTarget && this.__hostTarget.markRedraw();
  }, e.prototype.dirty = function() {
    this.markRedraw();
  }, e.prototype._toggleHoverLayerFlag = function(t) {
    this.__inHover = t;
    var r = this._textContent, i = this._textGuide;
    r && (r.__inHover = t), i && (i.__inHover = t);
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
    var n = t ? this[t] : this, a = new ru(n, r, i);
    return t && (a.targetName = t), this.addAnimator(a, t), a;
  }, e.prototype.addAnimator = function(t, r) {
    var i = this.__zr, n = this;
    t.during(function() {
      n.updateDuringAnimation(r);
    }).done(function() {
      var a = n.animators, o = st(a, t);
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
    ns(this, t, r, i);
  }, e.prototype.animateFrom = function(t, r, i) {
    ns(this, t, r, i, !0);
  }, e.prototype._transitionState = function(t, r, i, n) {
    for (var a = ns(this, r, i, n), o = 0; o < a.length; o++)
      a[o].__fromStateTransition = t;
  }, e.prototype.getBoundingRect = function() {
    return null;
  }, e.prototype.getPaintRect = function() {
    return null;
  }, e.initDefaultProps = (function() {
    var t = e.prototype;
    t.type = "element", t.name = "", t.ignore = t.silent = t.isGroup = t.draggable = t.dragging = t.ignoreClip = t.__inHover = !1, t.__dirty = Xt;
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
Ye(xo, Re);
Ye(xo, iu);
function ns(e, t, r, i, n) {
  r = r || {};
  var a = [];
  $v(e, "", e, t, r, i, a, n);
  var o = a.length, s = !1, l = r.done, u = r.aborted, c = function() {
    s = !0, o--, o <= 0 && (s ? l && l() : u && u());
  }, h = function() {
    o--, o <= 0 && (s ? l && l() : u && u());
  };
  o || l && l(), a.length > 0 && r.during && a[0].during(function(d, _) {
    r.during(_);
  });
  for (var v = 0; v < a.length; v++) {
    var f = a[v];
    c && f.done(c), h && f.aborted(h), r.force && f.duration(r.duration), f.start(r.easing);
  }
  return a;
}
function as(e, t, r) {
  for (var i = 0; i < r; i++)
    e[i] = t[i];
}
function rb(e) {
  return Vt(e[0]);
}
function ib(e, t, r) {
  if (Vt(t[r]))
    if (Vt(e[r]) || (e[r] = []), Gt(t[r])) {
      var i = t[r].length;
      e[r].length !== i && (e[r] = new t[r].constructor(i), as(e[r], t[r], i));
    } else {
      var n = t[r], a = e[r], o = n.length;
      if (rb(n))
        for (var s = n[0].length, l = 0; l < o; l++)
          a[l] ? as(a[l], n[l], s) : a[l] = Array.prototype.slice.call(n[l]);
      else
        as(a, n, o);
      a.length = n.length;
    }
  else
    e[r] = t[r];
}
function nb(e, t) {
  return e === t || Vt(e) && Vt(t) && ab(e, t);
}
function ab(e, t) {
  var r = e.length;
  if (r !== t.length)
    return !1;
  for (var i = 0; i < r; i++)
    if (e[i] !== t[i])
      return !1;
  return !0;
}
function $v(e, t, r, i, n, a, o, s) {
  for (var l = pt(i), u = n.duration, c = n.delay, h = n.additive, v = n.setToFinal, f = !F(a), d = e.animators, _ = [], p = 0; p < l.length; p++) {
    var g = l[p], m = i[g];
    if (m != null && r[g] != null && (f || a[g]))
      if (F(m) && !Vt(m) && !bo(m)) {
        if (t) {
          s || (r[g] = m, e.updateDuringAnimation(t));
          continue;
        }
        $v(e, g, r[g], m, n, a && a[g], o, s);
      } else
        _.push(g);
    else s || (r[g] = m, e.updateDuringAnimation(t), _.push(g));
  }
  var y = _.length;
  if (!h && y)
    for (var w = 0; w < d.length; w++) {
      var S = d[w];
      if (S.targetName === t) {
        var b = S.stopTracks(_);
        if (b) {
          var x = st(d, S);
          d.splice(x, 1);
        }
      }
    }
  if (n.force || (_ = fe(_, function(A) {
    return !nb(i[A], r[A]);
  }), y = _.length), y > 0 || n.force && !o.length) {
    var T = void 0, C = void 0, M = void 0;
    if (s) {
      C = {}, v && (T = {});
      for (var w = 0; w < y; w++) {
        var g = _[w];
        C[g] = r[g], v ? T[g] = i[g] : r[g] = i[g];
      }
    } else if (v) {
      M = {};
      for (var w = 0; w < y; w++) {
        var g = _[w];
        M[g] = Ia(r[g]), ib(r, i, g);
      }
    }
    var S = new ru(r, !1, !1, h ? fe(d, function(I) {
      return I.targetName === t;
    }) : null);
    S.targetName = t, n.scope && (S.scope = n.scope), v && T && S.whenWithKeys(0, T, _), M && S.whenWithKeys(0, M, _), S.whenWithKeys(u ?? 500, s ? C : i, _).delay(c || 0), e.addAnimator(S, t), o.push(S);
  }
}
var Ve = (function(e) {
  G(t, e);
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
    var n = st(this._children, r);
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
    var i = this.__zr, n = this._children, a = st(n, r);
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
    for (var i = new it(0, 0, 0, 0), n = r || this._children, a = [], o = null, s = 0; s < n.length; s++) {
      var l = n[s];
      if (!(l.ignore || l.invisible)) {
        var u = l.getBoundingRect(), c = l.getLocalTransform(a);
        c ? (it.applyTransform(i, u, c), o = o || i.clone(), o.union(i)) : (o = o || u.clone(), o.union(u));
      }
    }
    return o || i;
  }, t;
})(xo);
Ve.prototype.type = "group";
var $a = {}, Ev = {};
function ob(e) {
  delete Ev[e];
}
function sb(e) {
  if (!e)
    return !1;
  if (typeof e == "string")
    return Ka(e, 1) < cl;
  if (e.colorStops) {
    for (var t = e.colorStops, r = 0, i = t.length, n = 0; n < i; n++)
      r += Ka(t[n].color, 1);
    return r /= i, r < cl;
  }
  return !1;
}
var lb = (function() {
  function e(t, r, i) {
    var n = this;
    this._sleepAfterStill = 10, this._stillFrameAccum = 0, this._needsRefresh = !0, this._needsRefreshHover = !0, this._darkMode = !1, i = i || {}, this.dom = r, this.id = t;
    var a = new A1(), o = i.renderer || "canvas";
    $a[o] || (o = pt($a)[0]), i.useDirtyRect = i.useDirtyRect == null ? !1 : i.useDirtyRect;
    var s = new $a[o](r, a, i, t), l = i.ssr || s.ssrOnly;
    this.storage = a, this.painter = s;
    var u = !H.node && !H.worker && !l ? new j1(s.getViewportRoot(), s.root) : null, c = i.useCoarsePointer, h = c == null || c === "auto" ? H.touchEventsSupported : !!c, v = 44, f;
    h && (f = K(i.pointerSize, v)), this.handler = new _v(a, s, u, s.root, f), this.animation = new G1({
      stage: {
        update: l ? null : function() {
          return n._flush(!0);
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
    this._disposed || (this.painter.setBackgroundColor && this.painter.setBackgroundColor(t), this.refresh(), this._backgroundColor = t, this._darkMode = sb(t));
  }, e.prototype.getBackgroundColor = function() {
    return this._backgroundColor;
  }, e.prototype.setDarkMode = function(t) {
    this._darkMode = t;
  }, e.prototype.isDarkMode = function() {
    return this._darkMode;
  }, e.prototype.refreshImmediately = function(t) {
    this._disposed || (t || this.animation.update(!0), this._needsRefresh = !1, this.painter.refresh(), this._needsRefresh = !1);
  }, e.prototype.refresh = function() {
    this._disposed || (this._needsRefresh = !0, this.animation.start());
  }, e.prototype.flush = function() {
    this._disposed || this._flush(!1);
  }, e.prototype._flush = function(t) {
    var r, i = pi();
    this._needsRefresh && (r = !0, this.refreshImmediately(t)), this._needsRefreshHover && (r = !0, this.refreshHoverImmediately());
    var n = pi();
    r ? (this._stillFrameAccum = 0, this.trigger("rendered", {
      elapsedTime: n - i
    })) : this._sleepAfterStill > 0 && (this._stillFrameAccum++, this._stillFrameAccum > this._sleepAfterStill && this.animation.stop());
  }, e.prototype.setSleepAfterStill = function(t) {
    this._sleepAfterStill = t;
  }, e.prototype.wakeUp = function() {
    this._disposed || (this.animation.start(), this._stillFrameAccum = 0);
  }, e.prototype.refreshHover = function() {
    this._needsRefreshHover = !0;
  }, e.prototype.refreshHoverImmediately = function() {
    this._disposed || (this._needsRefreshHover = !1, this.painter.refreshHover && this.painter.getType() === "canvas" && this.painter.refreshHover());
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
        t[r] instanceof Ve && t[r].removeSelfFromZr(this);
      this.storage.delAllRoots(), this.painter.clear();
    }
  }, e.prototype.dispose = function() {
    this._disposed || (this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), this.handler.dispose(), this.animation = this.storage = this.painter = this.handler = null, this._disposed = !0, ob(this.id));
  }, e;
})();
function Pc(e, t) {
  var r = new lb(lv(), e, t);
  return Ev[r.id] = r, r;
}
function ub(e, t) {
  $a[e] = t;
}
var Ic = 1e-4, Ov = 20;
function cb(e) {
  return e.replace(/^\s+|\s+$/g, "");
}
function hb(e, t, r, i) {
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
function yt(e, t) {
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
  return U(e) ? cb(e).match(/%$/) ? parseFloat(e) / 100 * t : parseFloat(e) : e == null ? NaN : +e;
}
function fb(e, t, r) {
  return t == null && (t = 10), t = Math.min(Math.max(0, t), Ov), e = (+e).toFixed(t), r ? e : +e;
}
function kc(e) {
  if (e = +e, isNaN(e))
    return 0;
  if (e > 1e-14) {
    for (var t = 1, r = 0; r < 15; r++, t *= 10)
      if (Math.round(e * t) / t === e)
        return r;
  }
  return vb(e);
}
function vb(e) {
  var t = e.toString().toLowerCase(), r = t.indexOf("e"), i = r > 0 ? +t.slice(r + 1) : 0, n = r > 0 ? r : t.length, a = t.indexOf("."), o = a < 0 ? 0 : n - 1 - a;
  return Math.max(0, o - i);
}
function db(e, t) {
  var r = fr(e, function(f, d) {
    return f + (isNaN(d) ? 0 : d);
  }, 0);
  if (r === 0)
    return [];
  for (var i = Math.pow(10, t), n = J(e, function(f) {
    return (isNaN(f) ? 0 : f) / r * i * 100;
  }), a = i * 100, o = J(n, function(f) {
    return Math.floor(f);
  }), s = fr(o, function(f, d) {
    return f + d;
  }, 0), l = J(n, function(f, d) {
    return f - o[d];
  }); s < a; ) {
    for (var u = Number.NEGATIVE_INFINITY, c = null, h = 0, v = l.length; h < v; ++h)
      l[h] > u && (u = l[h], c = h);
    ++o[c], l[c] = 0, ++s;
  }
  return J(o, function(f) {
    return f / i;
  });
}
function pb(e, t) {
  var r = Math.max(kc(e), kc(t)), i = e + t;
  return r > Ov ? i : fb(i, r);
}
function Bv(e) {
  var t = Math.PI * 2;
  return (e % t + t) % t;
}
function Qa(e) {
  return e > -Ic && e < Ic;
}
var gb = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d{1,2})(?::(\d{1,2})(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/;
function To(e) {
  if (e instanceof Date)
    return e;
  if (U(e)) {
    var t = gb.exec(e);
    if (!t)
      return /* @__PURE__ */ new Date(NaN);
    if (t[8]) {
      var r = +t[4] || 0;
      return t[8].toUpperCase() !== "Z" && (r -= +t[8].slice(0, 3)), new Date(Date.UTC(+t[1], +(t[2] || 1) - 1, +t[3] || 1, r, +(t[5] || 0), +t[6] || 0, t[7] ? +t[7].substring(0, 3) : 0));
    } else
      return new Date(+t[1], +(t[2] || 1) - 1, +t[3] || 1, +t[4] || 0, +(t[5] || 0), +t[6] || 0, t[7] ? +t[7].substring(0, 3) : 0);
  } else if (e == null)
    return /* @__PURE__ */ new Date(NaN);
  return new Date(Math.round(e));
}
function Ja(e) {
  var t = parseFloat(e);
  return t == e && (t !== 0 || !U(e) || e.indexOf("x") <= 0) ? t : NaN;
}
function _b(e) {
  return !isNaN(Ja(e));
}
function Nv() {
  return Math.round(Math.random() * 9);
}
function Fv(e, t) {
  return t === 0 ? e : Fv(t, e % t);
}
function Lc(e, t) {
  return e == null ? t : t == null ? e : e * t / Fv(e, t);
}
function zt(e) {
  throw new Error(e);
}
var zv = "series\0", mb = "\0_ec_\0";
function $t(e) {
  return e instanceof Array ? e : e == null ? [] : [e];
}
function vl(e, t, r) {
  if (e) {
    e[t] = e[t] || {}, e.emphasis = e.emphasis || {}, e.emphasis[t] = e.emphasis[t] || {};
    for (var i = 0, n = r.length; i < n; i++) {
      var a = r[i];
      !e.emphasis[t].hasOwnProperty(a) && e[t].hasOwnProperty(a) && (e.emphasis[t][a] = e[t][a]);
    }
  }
}
var Rc = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "rich", "tag", "color", "textBorderColor", "textBorderWidth", "width", "height", "lineHeight", "align", "verticalAlign", "baseline", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY", "backgroundColor", "borderColor", "borderWidth", "borderRadius", "padding"];
function Co(e) {
  return F(e) && !B(e) && !(e instanceof Date) ? e.value : e;
}
function yb(e) {
  return F(e) && !(e instanceof Array);
}
function wb(e, t, r) {
  var i = r === "normalMerge", n = r === "replaceMerge", a = r === "replaceAll";
  e = e || [], t = (t || []).slice();
  var o = tt();
  D(t, function(l, u) {
    if (!F(l)) {
      t[u] = null;
      return;
    }
  });
  var s = bb(e, o, r);
  return (i || n) && Sb(s, e, o, t), i && xb(s, t), i || n ? Tb(s, t, n) : a && Cb(s, t), Db(s), s;
}
function bb(e, t, r) {
  var i = [];
  if (r === "replaceAll")
    return i;
  for (var n = 0; n < e.length; n++) {
    var a = e[n];
    a && a.id != null && t.set(a.id, n), i.push({
      existing: r === "replaceMerge" || In(a) ? null : a,
      newOption: null,
      keyInfo: null,
      brandNew: null
    });
  }
  return i;
}
function Sb(e, t, r, i) {
  D(i, function(n, a) {
    if (!(!n || n.id == null)) {
      var o = gn(n.id), s = r.get(o);
      if (s != null) {
        var l = e[s];
        Ue(!l.newOption, 'Duplicated option on id "' + o + '".'), l.newOption = n, l.existing = t[s], i[a] = null;
      }
    }
  });
}
function xb(e, t) {
  D(t, function(r, i) {
    if (!(!r || r.name == null))
      for (var n = 0; n < e.length; n++) {
        var a = e[n].existing;
        if (!e[n].newOption && a && (a.id == null || r.id == null) && !In(r) && !In(a) && Hv("name", a, r)) {
          e[n].newOption = r, t[i] = null;
          return;
        }
      }
  });
}
function Tb(e, t, r) {
  D(t, function(i) {
    if (i) {
      for (
        var n, a = 0;
        // Be `!resultItem` only when `nextIdx >= result.length`.
        (n = e[a]) && (n.newOption || In(n.existing) || // In mode "replaceMerge", here no not-mapped-non-internal-existing.
        n.existing && i.id != null && !Hv("id", i, n.existing));
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
function Cb(e, t) {
  D(t, function(r) {
    e.push({
      newOption: r,
      brandNew: !0,
      existing: null,
      keyInfo: null
    });
  });
}
function Db(e) {
  var t = tt();
  D(e, function(r) {
    var i = r.existing;
    i && t.set(i.id, r);
  }), D(e, function(r) {
    var i = r.newOption;
    Ue(!i || i.id == null || !t.get(i.id) || t.get(i.id) === r, "id duplicates: " + (i && i.id)), i && i.id != null && t.set(i.id, r), !r.keyInfo && (r.keyInfo = {});
  }), D(e, function(r, i) {
    var n = r.existing, a = r.newOption, o = r.keyInfo;
    if (F(a)) {
      if (o.name = a.name != null ? gn(a.name) : n ? n.name : zv + i, n)
        o.id = gn(n.id);
      else if (a.id != null)
        o.id = gn(a.id);
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
function Hv(e, t, r) {
  var i = ke(t[e], null), n = ke(r[e], null);
  return i != null && n != null && i === n;
}
function gn(e) {
  return ke(e, "");
}
function ke(e, t) {
  return e == null ? t : U(e) ? e : mt(e) || Ks(e) ? e + "" : t;
}
function Uv(e) {
  var t = e.name;
  return !!(t && t.indexOf(zv));
}
function In(e) {
  return e && e.id != null && gn(e.id).indexOf(mb) === 0;
}
function Mb(e, t, r) {
  D(e, function(i) {
    var n = i.newOption;
    F(n) && (i.keyInfo.mainType = t, i.keyInfo.subType = Ab(t, n, i.existing, r));
  });
}
function Ab(e, t, r, i) {
  var n = t.type ? t.type : r ? r.subType : i.determineSubType(e, t);
  return n;
}
function Wn(e, t) {
  if (t.dataIndexInside != null)
    return t.dataIndexInside;
  if (t.dataIndex != null)
    return B(t.dataIndex) ? J(t.dataIndex, function(r) {
      return e.indexOfRawIndex(r);
    }) : e.indexOfRawIndex(t.dataIndex);
  if (t.name != null)
    return B(t.name) ? J(t.name, function(r) {
      return e.indexOfName(r);
    }) : e.indexOfName(t.name);
}
function wt() {
  var e = "__ec_inner_" + Pb++;
  return function(t) {
    return t[e] || (t[e] = {});
  };
}
var Pb = Nv();
function os(e, t, r) {
  var i = au(t, r), n = i.mainTypeSpecified, a = i.queryOptionMap, o = i.others, s = o, l = r ? r.defaultMainType : null;
  return !n && l && a.set(l, {}), a.each(function(u, c) {
    var h = Yn(e, c, u, {
      useDefault: l === c,
      enableAll: r && r.enableAll != null ? r.enableAll : !0,
      enableNone: r && r.enableNone != null ? r.enableNone : !0
    });
    s[c + "Models"] = h.models, s[c + "Model"] = h.models[0];
  }), s;
}
function au(e, t) {
  var r;
  if (U(e)) {
    var i = {};
    i[e + "Index"] = 0, r = i;
  } else
    r = e;
  var n = tt(), a = {}, o = !1;
  return D(r, function(s, l) {
    if (l === "dataIndex" || l === "dataIndexInside") {
      a[l] = s;
      return;
    }
    var u = l.match(/^(\w+)(Index|Id|Name)$/) || [], c = u[1], h = (u[2] || "").toLowerCase();
    if (!(!c || !h || t && t.includeMainTypes && st(t.includeMainTypes, c) < 0)) {
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
var ou = {
  useDefault: !0,
  enableAll: !1,
  enableNone: !1
};
function Yn(e, t, r, i) {
  i = i || ou;
  var n = r.index, a = r.id, o = r.name, s = {
    models: null,
    specified: n != null || a != null || o != null
  };
  if (!s.specified) {
    var l = void 0;
    return s.models = i.useDefault && (l = e.getComponent(t)) ? [l] : [], s;
  }
  return n === "none" || n === !1 ? (Ue(i.enableNone, '`"none"` or `false` is not a valid value on index option.'), s.models = [], s) : (n === "all" && (Ue(i.enableAll, '`"all"` is not a valid value on index option.'), n = a = o = null), s.models = e.queryComponents({
    mainType: t,
    index: n,
    id: a,
    name: o
  }), s);
}
function Vv(e, t, r) {
  e.setAttribute ? e.setAttribute(t, r) : e[t] = r;
}
function Ib(e, t) {
  return e.getAttribute ? e.getAttribute(t) : e[t];
}
function kb(e) {
  return e === "auto" ? H.domSupported ? "html" : "richText" : e || "html";
}
var Lb = ".", Sr = "___EC__COMPONENT__CONTAINER___", Gv = "___EC__EXTENDED_CLASS___";
function Ae(e) {
  var t = {
    main: "",
    sub: ""
  };
  if (e) {
    var r = e.split(Lb);
    t.main = r[0] || "", t.sub = r[1] || "";
  }
  return t;
}
function Rb(e) {
  Ue(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(e), 'componentType "' + e + '" illegal');
}
function $b(e) {
  return !!(e && e[Gv]);
}
function su(e, t) {
  e.$constructor = e, e.extend = function(r) {
    var i = this, n;
    return Eb(i) ? n = /** @class */
    (function(a) {
      G(o, a);
      function o() {
        return a.apply(this, arguments) || this;
      }
      return o;
    })(i) : (n = function() {
      (r.$constructor || i).apply(this, arguments);
    }, Vw(n, this)), R(n.prototype, r), n[Gv] = !0, n.extend = this.extend, n.superCall = Nb, n.superApply = Fb, n.superClass = i, n;
  };
}
function Eb(e) {
  return rt(e) && /^class\s/.test(Function.prototype.toString.call(e));
}
function Wv(e, t) {
  e.extend = t.extend;
}
var Ob = Math.round(Math.random() * 10);
function Bb(e) {
  var t = ["__\0is_clz", Ob++].join("_");
  e.prototype[t] = !0, e.isInstance = function(r) {
    return !!(r && r[t]);
  };
}
function Nb(e, t) {
  for (var r = [], i = 2; i < arguments.length; i++)
    r[i - 2] = arguments[i];
  return this.superClass.prototype[t].apply(e, r);
}
function Fb(e, t, r) {
  return this.superClass.prototype[t].apply(e, r);
}
function lu(e) {
  var t = {};
  e.registerClass = function(i) {
    var n = i.type || i.prototype.type;
    if (n) {
      Rb(n), i.prototype.type = n;
      var a = Ae(n);
      if (!a.sub)
        t[a.main] = i;
      else if (a.sub !== Sr) {
        var o = r(a);
        o[a.sub] = i;
      }
    }
    return i;
  }, e.getClass = function(i, n, a) {
    var o = t[i];
    if (o && o[Sr] && (o = n ? o[n] : null), a && !o)
      throw new Error(n ? "Component " + i + "." + (n || "") + " is used but not imported." : i + ".type should be specified.");
    return o;
  }, e.getClassesByMainType = function(i) {
    var n = Ae(i), a = [], o = t[n.main];
    return o && o[Sr] ? D(o, function(s, l) {
      l !== Sr && a.push(s);
    }) : a.push(o), a;
  }, e.hasClass = function(i) {
    var n = Ae(i);
    return !!t[n.main];
  }, e.getAllClassMainTypes = function() {
    var i = [];
    return D(t, function(n, a) {
      i.push(a);
    }), i;
  }, e.hasSubTypes = function(i) {
    var n = Ae(i), a = t[n.main];
    return a && a[Sr];
  };
  function r(i) {
    var n = t[i.main];
    return (!n || !n[Sr]) && (n = t[i.main] = {}, n[Sr] = !0), n;
  }
}
function kn(e, t) {
  for (var r = 0; r < e.length; r++)
    e[r][1] || (e[r][1] = e[r][0]);
  return t = t || !1, function(i, n, a) {
    for (var o = {}, s = 0; s < e.length; s++) {
      var l = e[s][1];
      if (!(n && st(n, l) >= 0 || a && st(a, l) < 0)) {
        var u = i.getShallow(l, t);
        u != null && (o[e[s][0]] = u);
      }
    }
    return o;
  };
}
var zb = [
  ["fill", "color"],
  ["shadowBlur"],
  ["shadowOffsetX"],
  ["shadowOffsetY"],
  ["opacity"],
  ["shadowColor"]
  // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
  // So do not transfer decal directly.
], Hb = kn(zb), Ub = (
  /** @class */
  (function() {
    function e() {
    }
    return e.prototype.getAreaStyle = function(t, r) {
      return Hb(this, t, r);
    }, e;
  })()
), dl = new Gn(50);
function Vb(e) {
  if (typeof e == "string") {
    var t = dl.get(e);
    return t && t.image;
  } else
    return e;
}
function Yv(e, t, r, i, n) {
  if (e)
    if (typeof e == "string") {
      if (t && t.__zrImageSrc === e || !r)
        return t;
      var a = dl.get(e), o = { hostEl: r, cb: i, cbPayload: n };
      return a ? (t = a.image, !Do(t) && a.pending.push(o)) : (t = Ii.loadImage(e, $c, $c), t.__zrImageSrc = e, dl.put(e, t.__cachedImgObj = {
        image: t,
        pending: [o]
      })), t;
    } else
      return e;
  else return t;
}
function $c() {
  var e = this.__cachedImgObj;
  this.onload = this.onerror = this.__cachedImgObj = null;
  for (var t = 0; t < e.pending.length; t++) {
    var r = e.pending[t], i = r.cb;
    i && i(this, r.cbPayload), r.hostEl.dirty();
  }
  e.pending.length = 0;
}
function Do(e) {
  return e && e.width && e.height;
}
var ss = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g;
function Gb(e, t, r, i, n, a) {
  if (!r) {
    e.text = "", e.isTruncated = !1;
    return;
  }
  var o = (t + "").split(`
`);
  a = qv(r, i, n, a);
  for (var s = !1, l = {}, u = 0, c = o.length; u < c; u++)
    Xv(l, o[u], a), o[u] = l.textLine, s = s || l.isTruncated;
  e.text = o.join(`
`), e.isTruncated = s;
}
function qv(e, t, r, i) {
  i = i || {};
  var n = R({}, i);
  n.font = t, r = K(r, "..."), n.maxIterations = K(i.maxIterations, 2);
  var a = n.minChar = K(i.minChar, 0);
  n.cnCharWidth = Kt("国", t);
  var o = n.ascCharWidth = Kt("a", t);
  n.placeholder = K(i.placeholder, "");
  for (var s = e = Math.max(0, e - 1), l = 0; l < a && s >= o; l++)
    s -= o;
  var u = Kt(r, t);
  return u > s && (r = "", u = 0), s = e - u, n.ellipsis = r, n.ellipsisWidth = u, n.contentWidth = s, n.containerWidth = e, n;
}
function Xv(e, t, r) {
  var i = r.containerWidth, n = r.font, a = r.contentWidth;
  if (!i) {
    e.textLine = "", e.isTruncated = !1;
    return;
  }
  var o = Kt(t, n);
  if (o <= i) {
    e.textLine = t, e.isTruncated = !1;
    return;
  }
  for (var s = 0; ; s++) {
    if (o <= a || s >= r.maxIterations) {
      t += r.ellipsis;
      break;
    }
    var l = s === 0 ? Wb(t, a, r.ascCharWidth, r.cnCharWidth) : o > 0 ? Math.floor(t.length * a / o) : 0;
    t = t.substr(0, l), o = Kt(t, n);
  }
  t === "" && (t = r.placeholder), e.textLine = t, e.isTruncated = !0;
}
function Wb(e, t, r, i) {
  for (var n = 0, a = 0, o = e.length; a < o && n < t; a++) {
    var s = e.charCodeAt(a);
    n += 0 <= s && s <= 127 ? r : i;
  }
  return a;
}
function Yb(e, t) {
  e != null && (e += "");
  var r = t.overflow, i = t.padding, n = t.font, a = r === "truncate", o = nu(n), s = K(t.lineHeight, o), l = !!t.backgroundColor, u = t.lineOverflow === "truncate", c = !1, h = t.width, v;
  h != null && (r === "break" || r === "breakAll") ? v = e ? Zv(e, t.font, h, r === "breakAll", 0).lines : [] : v = e ? e.split(`
`) : [];
  var f = v.length * s, d = K(t.height, f);
  if (f > d && u) {
    var _ = Math.floor(d / s);
    c = c || v.length > _, v = v.slice(0, _);
  }
  if (e && a && h != null)
    for (var p = qv(h, n, t.ellipsis, {
      minChar: t.truncateMinChar,
      placeholder: t.placeholder
    }), g = {}, m = 0; m < v.length; m++)
      Xv(g, v[m], p), v[m] = g.textLine, c = c || g.isTruncated;
  for (var y = d, w = 0, m = 0; m < v.length; m++)
    w = Math.max(Kt(v[m], n), w);
  h == null && (h = w);
  var S = w;
  return i && (y += i[0] + i[2], S += i[1] + i[3], h += i[1] + i[3]), l && (S = h), {
    lines: v,
    height: d,
    outerWidth: S,
    outerHeight: y,
    lineHeight: s,
    calculatedLineHeight: o,
    contentWidth: w,
    contentHeight: f,
    width: h,
    isTruncated: c
  };
}
var qb = /* @__PURE__ */ (function() {
  function e() {
  }
  return e;
})(), Ec = /* @__PURE__ */ (function() {
  function e(t) {
    this.tokens = [], t && (this.tokens = t);
  }
  return e;
})(), Xb = /* @__PURE__ */ (function() {
  function e() {
    this.width = 0, this.height = 0, this.contentWidth = 0, this.contentHeight = 0, this.outerWidth = 0, this.outerHeight = 0, this.lines = [], this.isTruncated = !1;
  }
  return e;
})();
function Zb(e, t) {
  var r = new Xb();
  if (e != null && (e += ""), !e)
    return r;
  for (var i = t.width, n = t.height, a = t.overflow, o = (a === "break" || a === "breakAll") && i != null ? { width: i, accumWidth: 0, breakAll: a === "breakAll" } : null, s = ss.lastIndex = 0, l; (l = ss.exec(e)) != null; ) {
    var u = l.index;
    u > s && ls(r, e.substring(s, u), t, o), ls(r, l[2], t, o, l[1]), s = ss.lastIndex;
  }
  s < e.length && ls(r, e.substring(s, e.length), t, o);
  var c = [], h = 0, v = 0, f = t.padding, d = a === "truncate", _ = t.lineOverflow === "truncate", p = {};
  function g(X, j, W) {
    X.width = j, X.lineHeight = W, h += W, v = Math.max(v, j);
  }
  t: for (var m = 0; m < r.lines.length; m++) {
    for (var y = r.lines[m], w = 0, S = 0, b = 0; b < y.tokens.length; b++) {
      var x = y.tokens[b], T = x.styleName && t.rich[x.styleName] || {}, C = x.textPadding = T.padding, M = C ? C[1] + C[3] : 0, A = x.font = T.font || t.font;
      x.contentHeight = nu(A);
      var I = K(T.height, x.contentHeight);
      if (x.innerHeight = I, C && (I += C[0] + C[2]), x.height = I, x.lineHeight = hn(T.lineHeight, t.lineHeight, I), x.align = T && T.align || t.align, x.verticalAlign = T && T.verticalAlign || "middle", _ && n != null && h + x.lineHeight > n) {
        var k = r.lines.length;
        b > 0 ? (y.tokens = y.tokens.slice(0, b), g(y, S, w), r.lines = r.lines.slice(0, m + 1)) : r.lines = r.lines.slice(0, m), r.isTruncated = r.isTruncated || r.lines.length < k;
        break t;
      }
      var P = T.width, E = P == null || P === "auto";
      if (typeof P == "string" && P.charAt(P.length - 1) === "%")
        x.percentWidth = P, c.push(x), x.contentWidth = Kt(x.text, A);
      else {
        if (E) {
          var O = T.backgroundColor, Y = O && O.image;
          Y && (Y = Vb(Y), Do(Y) && (x.width = Math.max(x.width, Y.width * I / Y.height)));
        }
        var q = d && i != null ? i - S : null;
        q != null && q < x.width ? !E || q < M ? (x.text = "", x.width = x.contentWidth = 0) : (Gb(p, x.text, q - M, A, t.ellipsis, { minChar: t.truncateMinChar }), x.text = p.text, r.isTruncated = r.isTruncated || p.isTruncated, x.width = x.contentWidth = Kt(x.text, A)) : x.contentWidth = Kt(x.text, A);
      }
      x.width += M, S += x.width, T && (w = Math.max(w, x.lineHeight));
    }
    g(y, S, w);
  }
  r.outerWidth = r.width = K(i, v), r.outerHeight = r.height = K(n, h), r.contentHeight = h, r.contentWidth = v, f && (r.outerWidth += f[1] + f[3], r.outerHeight += f[0] + f[2]);
  for (var m = 0; m < c.length; m++) {
    var x = c[m], N = x.percentWidth;
    x.width = parseInt(N, 10) / 100 * r.width;
  }
  return r;
}
function ls(e, t, r, i, n) {
  var a = t === "", o = n && r.rich[n] || {}, s = e.lines, l = o.font || r.font, u = !1, c, h;
  if (i) {
    var v = o.padding, f = v ? v[1] + v[3] : 0;
    if (o.width != null && o.width !== "auto") {
      var d = Ai(o.width, i.width) + f;
      s.length > 0 && d + i.accumWidth > i.width && (c = t.split(`
`), u = !0), i.accumWidth = d;
    } else {
      var _ = Zv(t, l, i.width, i.breakAll, i.accumWidth);
      i.accumWidth = _.accumWidth + f, h = _.linesWidths, c = _.lines;
    }
  } else
    c = t.split(`
`);
  for (var p = 0; p < c.length; p++) {
    var g = c[p], m = new qb();
    if (m.styleName = n, m.text = g, m.isLineHolder = !g && !a, typeof o.width == "number" ? m.width = o.width : m.width = h ? h[p] : Kt(g, l), !p && !u) {
      var y = (s[s.length - 1] || (s[0] = new Ec())).tokens, w = y.length;
      w === 1 && y[0].isLineHolder ? y[0] = m : (g || !w || a) && y.push(m);
    } else
      s.push(new Ec([m]));
  }
}
function Kb(e) {
  var t = e.charCodeAt(0);
  return t >= 32 && t <= 591 || t >= 880 && t <= 4351 || t >= 4608 && t <= 5119 || t >= 7680 && t <= 8303;
}
var jb = fr(",&?/;] ".split(""), function(e, t) {
  return e[t] = !0, e;
}, {});
function Qb(e) {
  return Kb(e) ? !!jb[e] : !0;
}
function Zv(e, t, r, i, n) {
  for (var a = [], o = [], s = "", l = "", u = 0, c = 0, h = 0; h < e.length; h++) {
    var v = e.charAt(h);
    if (v === `
`) {
      l && (s += l, c += u), a.push(s), o.push(c), s = "", l = "", u = 0, c = 0;
      continue;
    }
    var f = Kt(v, t), d = i ? !1 : !Qb(v);
    if (a.length ? c + f > r : n + c + f > r) {
      c ? (s || l) && (d ? (s || (s = l, l = "", u = 0, c = u), a.push(s), o.push(c - u), l += v, u += f, s = "", c = u) : (l && (s += l, l = "", u = 0), a.push(s), o.push(c), s = v, c = f)) : d ? (a.push(l), o.push(u), l = v, u = f) : (a.push(v), o.push(f));
      continue;
    }
    c += f, d ? (l += v, u += f) : (l && (s += l, l = "", u = 0), s += v);
  }
  return !a.length && !s && (s = e, l = "", u = 0), l && (s += l), s && (a.push(s), o.push(c)), a.length === 1 && (c += n), {
    accumWidth: c,
    lines: a,
    linesWidths: o
  };
}
var pl = "__zr_style_" + Math.round(Math.random() * 10), Ur = {
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowColor: "#000",
  opacity: 1,
  blend: "source-over"
}, Mo = {
  style: {
    shadowBlur: !0,
    shadowOffsetX: !0,
    shadowOffsetY: !0,
    shadowColor: !0,
    opacity: !0
  }
};
Ur[pl] = !0;
var Oc = ["z", "z2", "invisible"], Jb = ["invisible"], qn = (function(e) {
  G(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype._init = function(r) {
    for (var i = pt(r), n = 0; n < i.length; n++) {
      var a = i[n];
      a === "style" ? this.useStyle(r[a]) : e.prototype.attrKV.call(this, a, r[a]);
    }
    this.style || this.useStyle({});
  }, t.prototype.beforeBrush = function() {
  }, t.prototype.afterBrush = function() {
  }, t.prototype.innerBeforeBrush = function() {
  }, t.prototype.innerAfterBrush = function() {
  }, t.prototype.shouldBePainted = function(r, i, n, a) {
    var o = this.transform;
    if (this.ignore || this.invisible || this.style.opacity === 0 || this.culling && tS(this, r, i) || o && !o[0] && !o[3])
      return !1;
    if (n && this.__clipPaths) {
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
      r = this._paintRect || (this._paintRect = new it(0, 0, 0, 0)), i ? it.applyTransform(r, n, i) : r.copy(n), (o || s || l) && (r.width += o * 2 + Math.abs(s), r.height += o * 2 + Math.abs(l), r.x = Math.min(r.x, r.x + s - o), r.y = Math.min(r.y, r.y + l - o));
      var u = this.dirtyRectTolerance;
      r.isZero() || (r.x = Math.floor(r.x - u), r.y = Math.floor(r.y - u), r.width = Math.ceil(r.width + 1 + u * 2), r.height = Math.ceil(r.height + 1 + u * 2));
    }
    return r;
  }, t.prototype.setPrevPaintRect = function(r) {
    r ? (this._prevPaintRect = this._prevPaintRect || new it(0, 0, 0, 0), this._prevPaintRect.copy(r)) : this._prevPaintRect = null;
  }, t.prototype.getPrevPaintRect = function() {
    return this._prevPaintRect;
  }, t.prototype.animateStyle = function(r) {
    return this.animate("style", r);
  }, t.prototype.updateDuringAnimation = function(r) {
    r === "style" ? this.dirtyStyle() : this.markRedraw();
  }, t.prototype.attrKV = function(r, i) {
    r !== "style" ? e.prototype.attrKV.call(this, r, i) : this.style ? this.setStyle(i) : this.useStyle(i);
  }, t.prototype.setStyle = function(r, i) {
    return typeof r == "string" ? this.style[r] = i : R(this.style, r), this.dirtyStyle(), this;
  }, t.prototype.dirtyStyle = function(r) {
    r || this.markRedraw(), this.__dirty |= nn, this._rect && (this._rect = null);
  }, t.prototype.dirty = function() {
    this.dirtyStyle();
  }, t.prototype.styleChanged = function() {
    return !!(this.__dirty & nn);
  }, t.prototype.styleUpdated = function() {
    this.__dirty &= ~nn;
  }, t.prototype.createStyle = function(r) {
    return So(Ur, r);
  }, t.prototype.useStyle = function(r) {
    r[pl] || (r = this.createStyle(r)), this.__inHover ? this.__hoverStyle = r : this.style = r, this.dirtyStyle();
  }, t.prototype.isStyleObject = function(r) {
    return r[pl];
  }, t.prototype._innerSaveToNormal = function(r) {
    e.prototype._innerSaveToNormal.call(this, r);
    var i = this._normalState;
    r.style && !i.style && (i.style = this._mergeStyle(this.createStyle(), this.style)), this._savePrimaryToNormal(r, i, Oc);
  }, t.prototype._applyStateObj = function(r, i, n, a, o, s) {
    e.prototype._applyStateObj.call(this, r, i, n, a, o, s);
    var l = !(i && a), u;
    if (i && i.style ? o ? a ? u = i.style : (u = this._mergeStyle(this.createStyle(), n.style), this._mergeStyle(u, i.style)) : (u = this._mergeStyle(this.createStyle(), a ? this.style : n.style), this._mergeStyle(u, i.style)) : l && (u = n.style), u)
      if (o) {
        var c = this.style;
        if (this.style = this.createStyle(l ? {} : c), l)
          for (var h = pt(c), v = 0; v < h.length; v++) {
            var f = h[v];
            f in u && (u[f] = u[f], this.style[f] = c[f]);
          }
        for (var d = pt(u), v = 0; v < d.length; v++) {
          var f = d[v];
          this.style[f] = this.style[f];
        }
        this._transitionState(r, {
          style: u
        }, s, this.getAnimationStyleProps());
      } else
        this.useStyle(u);
    for (var _ = this.__inHover ? Jb : Oc, v = 0; v < _.length; v++) {
      var f = _[v];
      i && i[f] != null ? this[f] = i[f] : l && n[f] != null && (this[f] = n[f]);
    }
  }, t.prototype._mergeStates = function(r) {
    for (var i = e.prototype._mergeStates.call(this, r), n, a = 0; a < r.length; a++) {
      var o = r[a];
      o.style && (n = n || {}, this._mergeStyle(n, o.style));
    }
    return n && (i.style = n), i;
  }, t.prototype._mergeStyle = function(r, i) {
    return R(r, i), r;
  }, t.prototype.getAnimationStyleProps = function() {
    return Mo;
  }, t.initDefaultProps = (function() {
    var r = t.prototype;
    r.type = "displayable", r.invisible = !1, r.z = 0, r.z2 = 0, r.zlevel = 0, r.culling = !1, r.cursor = "pointer", r.rectHover = !1, r.incremental = !1, r._rect = null, r.dirtyRectTolerance = 0, r.__dirty = Xt | nn;
  })(), t;
})(xo), us = new it(0, 0, 0, 0), cs = new it(0, 0, 0, 0);
function tS(e, t, r) {
  return us.copy(e.getBoundingRect()), e.transform && us.applyTransform(e.transform), cs.width = t, cs.height = r, !us.intersect(cs);
}
var oe = Math.min, se = Math.max, hs = Math.sin, fs = Math.cos, xr = Math.PI * 2, aa = ki(), oa = ki(), sa = ki();
function Bc(e, t, r, i, n, a) {
  n[0] = oe(e, r), n[1] = oe(t, i), a[0] = se(e, r), a[1] = se(t, i);
}
var Nc = [], Fc = [];
function eS(e, t, r, i, n, a, o, s, l, u) {
  var c = xv, h = Rt, v = c(e, r, n, o, Nc);
  l[0] = 1 / 0, l[1] = 1 / 0, u[0] = -1 / 0, u[1] = -1 / 0;
  for (var f = 0; f < v; f++) {
    var d = h(e, r, n, o, Nc[f]);
    l[0] = oe(d, l[0]), u[0] = se(d, u[0]);
  }
  v = c(t, i, a, s, Fc);
  for (var f = 0; f < v; f++) {
    var _ = h(t, i, a, s, Fc[f]);
    l[1] = oe(_, l[1]), u[1] = se(_, u[1]);
  }
  l[0] = oe(e, l[0]), u[0] = se(e, u[0]), l[0] = oe(o, l[0]), u[0] = se(o, u[0]), l[1] = oe(t, l[1]), u[1] = se(t, u[1]), l[1] = oe(s, l[1]), u[1] = se(s, u[1]);
}
function rS(e, t, r, i, n, a, o, s) {
  var l = Tv, u = Ft, c = se(oe(l(e, r, n), 1), 0), h = se(oe(l(t, i, a), 1), 0), v = u(e, r, n, c), f = u(t, i, a, h);
  o[0] = oe(e, n, v), o[1] = oe(t, a, f), s[0] = se(e, n, v), s[1] = se(t, a, f);
}
function iS(e, t, r, i, n, a, o, s, l) {
  var u = vi, c = di, h = Math.abs(n - a);
  if (h % xr < 1e-4 && h > 1e-4) {
    s[0] = e - r, s[1] = t - i, l[0] = e + r, l[1] = t + i;
    return;
  }
  if (aa[0] = fs(n) * r + e, aa[1] = hs(n) * i + t, oa[0] = fs(a) * r + e, oa[1] = hs(a) * i + t, u(s, aa, oa), c(l, aa, oa), n = n % xr, n < 0 && (n = n + xr), a = a % xr, a < 0 && (a = a + xr), n > a && !o ? a += xr : n < a && o && (n += xr), o) {
    var v = a;
    a = n, n = v;
  }
  for (var f = 0; f < a; f += Math.PI / 2)
    f > n && (sa[0] = fs(f) * r + e, sa[1] = hs(f) * i + t, u(s, sa, s), c(l, sa, l));
}
var et = {
  M: 1,
  L: 2,
  C: 3,
  Q: 4,
  A: 5,
  Z: 6,
  R: 7
}, Tr = [], Cr = [], be = [], Ke = [], Se = [], xe = [], vs = Math.min, ds = Math.max, Dr = Math.cos, Mr = Math.sin, Be = Math.abs, gl = Math.PI, rr = gl * 2, ps = typeof Float32Array < "u", Vi = [];
function gs(e) {
  var t = Math.round(e / gl * 1e8) / 1e8;
  return t % 2 * gl;
}
function Kv(e, t) {
  var r = gs(e[0]);
  r < 0 && (r += rr);
  var i = r - e[0], n = e[1];
  n += i, !t && n - r >= rr ? n = r + rr : t && r - n >= rr ? n = r - rr : !t && r > n ? n = r + (rr - gs(r - n)) : t && r < n && (n = r - (rr - gs(n - r))), e[0] = r, e[1] = n;
}
var Pi = (function() {
  function e(t) {
    this.dpr = 1, this._xi = 0, this._yi = 0, this._x0 = 0, this._y0 = 0, this._len = 0, t && (this._saveData = !1), this._saveData && (this.data = []);
  }
  return e.prototype.increaseVersion = function() {
    this._version++;
  }, e.prototype.getVersion = function() {
    return this._version;
  }, e.prototype.setScale = function(t, r, i) {
    i = i || 0, i > 0 && (this._ux = Be(i / ja / t) || 0, this._uy = Be(i / ja / r) || 0);
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
    return this._drawPendingPt(), this.addData(et.M, t, r), this._ctx && this._ctx.moveTo(t, r), this._x0 = t, this._y0 = r, this._xi = t, this._yi = r, this;
  }, e.prototype.lineTo = function(t, r) {
    var i = Be(t - this._xi), n = Be(r - this._yi), a = i > this._ux || n > this._uy;
    if (this.addData(et.L, t, r), this._ctx && a && this._ctx.lineTo(t, r), a)
      this._xi = t, this._yi = r, this._pendingPtDist = 0;
    else {
      var o = i * i + n * n;
      o > this._pendingPtDist && (this._pendingPtX = t, this._pendingPtY = r, this._pendingPtDist = o);
    }
    return this;
  }, e.prototype.bezierCurveTo = function(t, r, i, n, a, o) {
    return this._drawPendingPt(), this.addData(et.C, t, r, i, n, a, o), this._ctx && this._ctx.bezierCurveTo(t, r, i, n, a, o), this._xi = a, this._yi = o, this;
  }, e.prototype.quadraticCurveTo = function(t, r, i, n) {
    return this._drawPendingPt(), this.addData(et.Q, t, r, i, n), this._ctx && this._ctx.quadraticCurveTo(t, r, i, n), this._xi = i, this._yi = n, this;
  }, e.prototype.arc = function(t, r, i, n, a, o) {
    this._drawPendingPt(), Vi[0] = n, Vi[1] = a, Kv(Vi, o), n = Vi[0], a = Vi[1];
    var s = a - n;
    return this.addData(et.A, t, r, i, i, n, s, 0, o ? 0 : 1), this._ctx && this._ctx.arc(t, r, i, n, a, o), this._xi = Dr(a) * i + t, this._yi = Mr(a) * i + r, this;
  }, e.prototype.arcTo = function(t, r, i, n, a) {
    return this._drawPendingPt(), this._ctx && this._ctx.arcTo(t, r, i, n, a), this;
  }, e.prototype.rect = function(t, r, i, n) {
    return this._drawPendingPt(), this._ctx && this._ctx.rect(t, r, i, n), this.addData(et.R, t, r, i, n), this;
  }, e.prototype.closePath = function() {
    this._drawPendingPt(), this.addData(et.Z);
    var t = this._ctx, r = this._x0, i = this._y0;
    return t && t.closePath(), this._xi = r, this._yi = i, this;
  }, e.prototype.fill = function(t) {
    t && t.fill(), this.toStatic();
  }, e.prototype.stroke = function(t) {
    t && t.stroke(), this.toStatic();
  }, e.prototype.len = function() {
    return this._len;
  }, e.prototype.setData = function(t) {
    var r = t.length;
    !(this.data && this.data.length === r) && ps && (this.data = new Float32Array(r));
    for (var i = 0; i < r; i++)
      this.data[i] = t[i];
    this._len = r;
  }, e.prototype.appendPath = function(t) {
    t instanceof Array || (t = [t]);
    for (var r = t.length, i = 0, n = this._len, a = 0; a < r; a++)
      i += t[a].len();
    ps && this.data instanceof Float32Array && (this.data = new Float32Array(n + i));
    for (var a = 0; a < r; a++)
      for (var o = t[a].data, s = 0; s < o.length; s++)
        this.data[n++] = o[s];
    this._len = n;
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
      t instanceof Array && (t.length = this._len, ps && this._len > 11 && (this.data = new Float32Array(t)));
    }
  }, e.prototype.getBoundingRect = function() {
    be[0] = be[1] = Se[0] = Se[1] = Number.MAX_VALUE, Ke[0] = Ke[1] = xe[0] = xe[1] = -Number.MAX_VALUE;
    var t = this.data, r = 0, i = 0, n = 0, a = 0, o;
    for (o = 0; o < this._len; ) {
      var s = t[o++], l = o === 1;
      switch (l && (r = t[o], i = t[o + 1], n = r, a = i), s) {
        case et.M:
          r = n = t[o++], i = a = t[o++], Se[0] = n, Se[1] = a, xe[0] = n, xe[1] = a;
          break;
        case et.L:
          Bc(r, i, t[o], t[o + 1], Se, xe), r = t[o++], i = t[o++];
          break;
        case et.C:
          eS(r, i, t[o++], t[o++], t[o++], t[o++], t[o], t[o + 1], Se, xe), r = t[o++], i = t[o++];
          break;
        case et.Q:
          rS(r, i, t[o++], t[o++], t[o], t[o + 1], Se, xe), r = t[o++], i = t[o++];
          break;
        case et.A:
          var u = t[o++], c = t[o++], h = t[o++], v = t[o++], f = t[o++], d = t[o++] + f;
          o += 1;
          var _ = !t[o++];
          l && (n = Dr(f) * h + u, a = Mr(f) * v + c), iS(u, c, h, v, f, d, _, Se, xe), r = Dr(d) * h + u, i = Mr(d) * v + c;
          break;
        case et.R:
          n = r = t[o++], a = i = t[o++];
          var p = t[o++], g = t[o++];
          Bc(n, a, n + p, a + g, Se, xe);
          break;
        case et.Z:
          r = n, i = a;
          break;
      }
      vi(be, be, Se), di(Ke, Ke, xe);
    }
    return o === 0 && (be[0] = be[1] = Ke[0] = Ke[1] = 0), new it(be[0], be[1], Ke[0] - be[0], Ke[1] - be[1]);
  }, e.prototype._calculateLength = function() {
    var t = this.data, r = this._len, i = this._ux, n = this._uy, a = 0, o = 0, s = 0, l = 0;
    this._pathSegLen || (this._pathSegLen = []);
    for (var u = this._pathSegLen, c = 0, h = 0, v = 0; v < r; ) {
      var f = t[v++], d = v === 1;
      d && (a = t[v], o = t[v + 1], s = a, l = o);
      var _ = -1;
      switch (f) {
        case et.M:
          a = s = t[v++], o = l = t[v++];
          break;
        case et.L: {
          var p = t[v++], g = t[v++], m = p - a, y = g - o;
          (Be(m) > i || Be(y) > n || v === r - 1) && (_ = Math.sqrt(m * m + y * y), a = p, o = g);
          break;
        }
        case et.C: {
          var w = t[v++], S = t[v++], p = t[v++], g = t[v++], b = t[v++], x = t[v++];
          _ = I1(a, o, w, S, p, g, b, x, 10), a = b, o = x;
          break;
        }
        case et.Q: {
          var w = t[v++], S = t[v++], p = t[v++], g = t[v++];
          _ = R1(a, o, w, S, p, g, 10), a = p, o = g;
          break;
        }
        case et.A:
          var T = t[v++], C = t[v++], M = t[v++], A = t[v++], I = t[v++], k = t[v++], P = k + I;
          v += 1, d && (s = Dr(I) * M + T, l = Mr(I) * A + C), _ = ds(M, A) * vs(rr, Math.abs(k)), a = Dr(P) * M + T, o = Mr(P) * A + C;
          break;
        case et.R: {
          s = a = t[v++], l = o = t[v++];
          var E = t[v++], O = t[v++];
          _ = E * 2 + O * 2;
          break;
        }
        case et.Z: {
          var m = s - a, y = l - o;
          _ = Math.sqrt(m * m + y * y), a = s, o = l;
          break;
        }
      }
      _ >= 0 && (u[h++] = _, c += _);
    }
    return this._pathLen = c, c;
  }, e.prototype.rebuildPath = function(t, r) {
    var i = this.data, n = this._ux, a = this._uy, o = this._len, s, l, u, c, h, v, f = r < 1, d, _, p = 0, g = 0, m, y = 0, w, S;
    if (!(f && (this._pathSegLen || this._calculateLength(), d = this._pathSegLen, _ = this._pathLen, m = r * _, !m)))
      t: for (var b = 0; b < o; ) {
        var x = i[b++], T = b === 1;
        switch (T && (u = i[b], c = i[b + 1], s = u, l = c), x !== et.L && y > 0 && (t.lineTo(w, S), y = 0), x) {
          case et.M:
            s = u = i[b++], l = c = i[b++], t.moveTo(u, c);
            break;
          case et.L: {
            h = i[b++], v = i[b++];
            var C = Be(h - u), M = Be(v - c);
            if (C > n || M > a) {
              if (f) {
                var A = d[g++];
                if (p + A > m) {
                  var I = (m - p) / A;
                  t.lineTo(u * (1 - I) + h * I, c * (1 - I) + v * I);
                  break t;
                }
                p += A;
              }
              t.lineTo(h, v), u = h, c = v, y = 0;
            } else {
              var k = C * C + M * M;
              k > y && (w = h, S = v, y = k);
            }
            break;
          }
          case et.C: {
            var P = i[b++], E = i[b++], O = i[b++], Y = i[b++], q = i[b++], N = i[b++];
            if (f) {
              var A = d[g++];
              if (p + A > m) {
                var I = (m - p) / A;
                Xa(u, P, O, q, I, Tr), Xa(c, E, Y, N, I, Cr), t.bezierCurveTo(Tr[1], Cr[1], Tr[2], Cr[2], Tr[3], Cr[3]);
                break t;
              }
              p += A;
            }
            t.bezierCurveTo(P, E, O, Y, q, N), u = q, c = N;
            break;
          }
          case et.Q: {
            var P = i[b++], E = i[b++], O = i[b++], Y = i[b++];
            if (f) {
              var A = d[g++];
              if (p + A > m) {
                var I = (m - p) / A;
                Za(u, P, O, I, Tr), Za(c, E, Y, I, Cr), t.quadraticCurveTo(Tr[1], Cr[1], Tr[2], Cr[2]);
                break t;
              }
              p += A;
            }
            t.quadraticCurveTo(P, E, O, Y), u = O, c = Y;
            break;
          }
          case et.A:
            var X = i[b++], j = i[b++], W = i[b++], gt = i[b++], bt = i[b++], Yt = i[b++], ye = i[b++], Qt = !i[b++], qt = W > gt ? W : gt, xt = Be(W - gt) > 1e-3, ht = bt + Yt, z = !1;
            if (f) {
              var A = d[g++];
              p + A > m && (ht = bt + Yt * (m - p) / A, z = !0), p += A;
            }
            if (xt && t.ellipse ? t.ellipse(X, j, W, gt, ye, bt, ht, Qt) : t.arc(X, j, qt, bt, ht, Qt), z)
              break t;
            T && (s = Dr(bt) * W + X, l = Mr(bt) * gt + j), u = Dr(ht) * W + X, c = Mr(ht) * gt + j;
            break;
          case et.R:
            s = u = i[b], l = c = i[b + 1], h = i[b++], v = i[b++];
            var Z = i[b++], we = i[b++];
            if (f) {
              var A = d[g++];
              if (p + A > m) {
                var St = m - p;
                t.moveTo(h, v), t.lineTo(h + vs(St, Z), v), St -= Z, St > 0 && t.lineTo(h + Z, v + vs(St, we)), St -= we, St > 0 && t.lineTo(h + ds(Z - St, 0), v + we), St -= Z, St > 0 && t.lineTo(h, v + ds(we - St, 0));
                break t;
              }
              p += A;
            }
            t.rect(h, v, Z, we);
            break;
          case et.Z:
            if (f) {
              var A = d[g++];
              if (p + A > m) {
                var I = (m - p) / A;
                t.lineTo(u * (1 - I) + s * I, c * (1 - I) + l * I);
                break t;
              }
              p += A;
            }
            t.closePath(), u = s, c = l;
        }
      }
  }, e.prototype.clone = function() {
    var t = new e(), r = this.data;
    return t.data = r.slice ? r.slice() : Array.prototype.slice.call(r), t._len = this._len, t;
  }, e.CMD = et, e.initDefaultProps = (function() {
    var t = e.prototype;
    t._saveData = !0, t._ux = 0, t._uy = 0, t._pendingPtDist = 0, t._version = 0;
  })(), e;
})();
function ei(e, t, r, i, n, a, o) {
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
function nS(e, t, r, i, n, a, o, s, l, u, c) {
  if (l === 0)
    return !1;
  var h = l;
  if (c > t + h && c > i + h && c > a + h && c > s + h || c < t - h && c < i - h && c < a - h && c < s - h || u > e + h && u > r + h && u > n + h && u > o + h || u < e - h && u < r - h && u < n - h && u < o - h)
    return !1;
  var v = P1(e, t, r, i, n, a, o, s, u, c);
  return v <= h / 2;
}
function aS(e, t, r, i, n, a, o, s, l) {
  if (o === 0)
    return !1;
  var u = o;
  if (l > t + u && l > i + u && l > a + u || l < t - u && l < i - u && l < a - u || s > e + u && s > r + u && s > n + u || s < e - u && s < r - u && s < n - u)
    return !1;
  var c = L1(e, t, r, i, n, a, s, l);
  return c <= u / 2;
}
var zc = Math.PI * 2;
function la(e) {
  return e %= zc, e < 0 && (e += zc), e;
}
var Gi = Math.PI * 2;
function oS(e, t, r, i, n, a, o, s, l) {
  if (o === 0)
    return !1;
  var u = o;
  s -= e, l -= t;
  var c = Math.sqrt(s * s + l * l);
  if (c - u > r || c + u < r)
    return !1;
  if (Math.abs(i - n) % Gi < 1e-4)
    return !0;
  if (a) {
    var h = i;
    i = la(n), n = la(h);
  } else
    i = la(i), n = la(n);
  i > n && (n += Gi);
  var v = Math.atan2(l, s);
  return v < 0 && (v += Gi), v >= i && v <= n || v + Gi >= i && v + Gi <= n;
}
function Ar(e, t, r, i, n, a) {
  if (a > t && a > i || a < t && a < i || i === t)
    return 0;
  var o = (a - t) / (i - t), s = i < t ? 1 : -1;
  (o === 1 || o === 0) && (s = i < t ? 0.5 : -0.5);
  var l = o * (r - e) + e;
  return l === n ? 1 / 0 : l > n ? s : 0;
}
var je = Pi.CMD, Pr = Math.PI * 2, sS = 1e-4;
function lS(e, t) {
  return Math.abs(e - t) < sS;
}
var kt = [-1, -1, -1], ne = [-1, -1];
function uS() {
  var e = ne[0];
  ne[0] = ne[1], ne[1] = e;
}
function cS(e, t, r, i, n, a, o, s, l, u) {
  if (u > t && u > i && u > a && u > s || u < t && u < i && u < a && u < s)
    return 0;
  var c = Sv(t, i, a, s, u, kt);
  if (c === 0)
    return 0;
  for (var h = 0, v = -1, f = void 0, d = void 0, _ = 0; _ < c; _++) {
    var p = kt[_], g = p === 0 || p === 1 ? 0.5 : 1, m = Rt(e, r, n, o, p);
    m < l || (v < 0 && (v = xv(t, i, a, s, ne), ne[1] < ne[0] && v > 1 && uS(), f = Rt(t, i, a, s, ne[0]), v > 1 && (d = Rt(t, i, a, s, ne[1]))), v === 2 ? p < ne[0] ? h += f < t ? g : -g : p < ne[1] ? h += d < f ? g : -g : h += s < d ? g : -g : p < ne[0] ? h += f < t ? g : -g : h += s < f ? g : -g);
  }
  return h;
}
function hS(e, t, r, i, n, a, o, s) {
  if (s > t && s > i && s > a || s < t && s < i && s < a)
    return 0;
  var l = k1(t, i, a, s, kt);
  if (l === 0)
    return 0;
  var u = Tv(t, i, a);
  if (u >= 0 && u <= 1) {
    for (var c = 0, h = Ft(t, i, a, u), v = 0; v < l; v++) {
      var f = kt[v] === 0 || kt[v] === 1 ? 0.5 : 1, d = Ft(e, r, n, kt[v]);
      d < o || (kt[v] < u ? c += h < t ? f : -f : c += a < h ? f : -f);
    }
    return c;
  } else {
    var f = kt[0] === 0 || kt[0] === 1 ? 0.5 : 1, d = Ft(e, r, n, kt[0]);
    return d < o ? 0 : a < t ? f : -f;
  }
}
function fS(e, t, r, i, n, a, o, s) {
  if (s -= t, s > r || s < -r)
    return 0;
  var l = Math.sqrt(r * r - s * s);
  kt[0] = -l, kt[1] = l;
  var u = Math.abs(i - n);
  if (u < 1e-4)
    return 0;
  if (u >= Pr - 1e-4) {
    i = 0, n = Pr;
    var c = a ? 1 : -1;
    return o >= kt[0] + e && o <= kt[1] + e ? c : 0;
  }
  if (i > n) {
    var h = i;
    i = n, n = h;
  }
  i < 0 && (i += Pr, n += Pr);
  for (var v = 0, f = 0; f < 2; f++) {
    var d = kt[f];
    if (d + e > o) {
      var _ = Math.atan2(s, d), c = a ? 1 : -1;
      _ < 0 && (_ = Pr + _), (_ >= i && _ <= n || _ + Pr >= i && _ + Pr <= n) && (_ > Math.PI / 2 && _ < Math.PI * 1.5 && (c = -c), v += c);
    }
  }
  return v;
}
function jv(e, t, r, i, n) {
  for (var a = e.data, o = e.len(), s = 0, l = 0, u = 0, c = 0, h = 0, v, f, d = 0; d < o; ) {
    var _ = a[d++], p = d === 1;
    switch (_ === je.M && d > 1 && (r || (s += Ar(l, u, c, h, i, n))), p && (l = a[d], u = a[d + 1], c = l, h = u), _) {
      case je.M:
        c = a[d++], h = a[d++], l = c, u = h;
        break;
      case je.L:
        if (r) {
          if (ei(l, u, a[d], a[d + 1], t, i, n))
            return !0;
        } else
          s += Ar(l, u, a[d], a[d + 1], i, n) || 0;
        l = a[d++], u = a[d++];
        break;
      case je.C:
        if (r) {
          if (nS(l, u, a[d++], a[d++], a[d++], a[d++], a[d], a[d + 1], t, i, n))
            return !0;
        } else
          s += cS(l, u, a[d++], a[d++], a[d++], a[d++], a[d], a[d + 1], i, n) || 0;
        l = a[d++], u = a[d++];
        break;
      case je.Q:
        if (r) {
          if (aS(l, u, a[d++], a[d++], a[d], a[d + 1], t, i, n))
            return !0;
        } else
          s += hS(l, u, a[d++], a[d++], a[d], a[d + 1], i, n) || 0;
        l = a[d++], u = a[d++];
        break;
      case je.A:
        var g = a[d++], m = a[d++], y = a[d++], w = a[d++], S = a[d++], b = a[d++];
        d += 1;
        var x = !!(1 - a[d++]);
        v = Math.cos(S) * y + g, f = Math.sin(S) * w + m, p ? (c = v, h = f) : s += Ar(l, u, v, f, i, n);
        var T = (i - g) * w / y + g;
        if (r) {
          if (oS(g, m, w, S, S + b, x, t, T, n))
            return !0;
        } else
          s += fS(g, m, w, S, S + b, x, T, n);
        l = Math.cos(S + b) * y + g, u = Math.sin(S + b) * w + m;
        break;
      case je.R:
        c = l = a[d++], h = u = a[d++];
        var C = a[d++], M = a[d++];
        if (v = c + C, f = h + M, r) {
          if (ei(c, h, v, h, t, i, n) || ei(v, h, v, f, t, i, n) || ei(v, f, c, f, t, i, n) || ei(c, f, c, h, t, i, n))
            return !0;
        } else
          s += Ar(v, h, v, f, i, n), s += Ar(c, f, c, h, i, n);
        break;
      case je.Z:
        if (r) {
          if (ei(l, u, c, h, t, i, n))
            return !0;
        } else
          s += Ar(l, u, c, h, i, n);
        l = c, u = h;
        break;
    }
  }
  return !r && !lS(u, h) && (s += Ar(l, u, c, h, i, n) || 0), s !== 0;
}
function vS(e, t, r) {
  return jv(e, 0, !1, t, r);
}
function dS(e, t, r, i) {
  return jv(e, t, !0, r, i);
}
var Qv = ct({
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
}, Ur), pS = {
  style: ct({
    fill: !0,
    stroke: !0,
    strokePercent: !0,
    fillOpacity: !0,
    strokeOpacity: !0,
    lineDashOffset: !0,
    lineWidth: !0,
    miterLimit: !0
  }, Mo.style)
}, _s = Pn.concat([
  "invisible",
  "culling",
  "z",
  "z2",
  "zlevel",
  "parent"
]), ot = (function(e) {
  G(t, e);
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
      for (var s = 0; s < _s.length; ++s)
        n[_s[s]] = this[_s[s]];
      n.__dirty |= Xt;
    } else this._decalEl && (this._decalEl = null);
  }, t.prototype.getDecalElement = function() {
    return this._decalEl;
  }, t.prototype._init = function(r) {
    var i = pt(r);
    this.shape = this.getDefaultShape();
    var n = this.getDefaultStyle();
    n && this.useStyle(n);
    for (var a = 0; a < i.length; a++) {
      var o = i[a], s = r[o];
      o === "style" ? this.style ? R(this.style, s) : this.useStyle(s) : o === "shape" ? R(this.shape, s) : e.prototype.attrKV.call(this, o, s);
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
      if (U(r)) {
        var i = Ka(r, 0);
        return i > 0.5 ? hl : i > 0.2 ? Q1 : fl;
      } else if (r)
        return fl;
    }
    return hl;
  }, t.prototype.getInsideTextStroke = function(r) {
    var i = this.style.fill;
    if (U(i)) {
      var n = this.__zr, a = !!(n && n.isDarkMode()), o = Ka(r, 0) < cl;
      if (a === o)
        return i;
    }
  }, t.prototype.buildPath = function(r, i, n) {
  }, t.prototype.pathUpdated = function() {
    this.__dirty &= ~hi;
  }, t.prototype.getUpdatedPathProxy = function(r) {
    return !this.path && this.createPathProxy(), this.path.beginPath(), this.buildPath(this.path, this.shape, r), this.path;
  }, t.prototype.createPathProxy = function() {
    this.path = new Pi(!1);
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
      (a || this.__dirty & hi) && (o.beginPath(), this.buildPath(o, this.shape, !1), this.pathUpdated()), r = o.getBoundingRect();
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
        if (u > 1e-10 && (this.hasFill() || (l = Math.max(l, this.strokeContainThreshold)), dS(s, l / u, r, i)))
          return !0;
      }
      if (this.hasFill())
        return vS(s, r, i);
    }
    return !1;
  }, t.prototype.dirtyShape = function() {
    this.__dirty |= hi, this._rect && (this._rect = null), this._decalEl && this._decalEl.dirtyShape(), this.markRedraw();
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
    return n || (n = this.shape = {}), typeof r == "string" ? n[r] = i : R(n, r), this.dirtyShape(), this;
  }, t.prototype.shapeChanged = function() {
    return !!(this.__dirty & hi);
  }, t.prototype.createStyle = function(r) {
    return So(Qv, r);
  }, t.prototype._innerSaveToNormal = function(r) {
    e.prototype._innerSaveToNormal.call(this, r);
    var i = this._normalState;
    r.shape && !i.shape && (i.shape = R({}, this.shape));
  }, t.prototype._applyStateObj = function(r, i, n, a, o, s) {
    e.prototype._applyStateObj.call(this, r, i, n, a, o, s);
    var l = !(i && a), u;
    if (i && i.shape ? o ? a ? u = i.shape : (u = R({}, n.shape), R(u, i.shape)) : (u = R({}, a ? this.shape : n.shape), R(u, i.shape)) : l && (u = n.shape), u)
      if (o) {
        this.shape = R({}, this.shape);
        for (var c = {}, h = pt(u), v = 0; v < h.length; v++) {
          var f = h[v];
          typeof u[f] == "object" ? this.shape[f] = u[f] : c[f] = u[f];
        }
        this._transitionState(r, {
          shape: c
        }, s);
      } else
        this.shape = u, this.dirtyShape();
  }, t.prototype._mergeStates = function(r) {
    for (var i = e.prototype._mergeStates.call(this, r), n, a = 0; a < r.length; a++) {
      var o = r[a];
      o.shape && (n = n || {}, this._mergeStyle(n, o.shape));
    }
    return n && (i.shape = n), i;
  }, t.prototype.getAnimationStyleProps = function() {
    return pS;
  }, t.prototype.isZeroArea = function() {
    return !1;
  }, t.extend = function(r) {
    var i = (function(a) {
      G(o, a);
      function o(s) {
        var l = a.call(this, s) || this;
        return r.init && r.init.call(l, s), l;
      }
      return o.prototype.getDefaultStyle = function() {
        return Q(r.style);
      }, o.prototype.getDefaultShape = function() {
        return Q(r.shape);
      }, o;
    })(t);
    for (var n in r)
      typeof r[n] == "function" && (i.prototype[n] = r[n]);
    return i;
  }, t.initDefaultProps = (function() {
    var r = t.prototype;
    r.type = "path", r.strokeContainThreshold = 5, r.segmentIgnoreThreshold = 0, r.subPixelOptimize = !1, r.autoBatch = !1, r.__dirty = Xt | nn | hi;
  })(), t;
})(qn), gS = ct({
  strokeFirst: !0,
  font: Yr,
  x: 0,
  y: 0,
  textAlign: "left",
  textBaseline: "top",
  miterLimit: 2
}, Qv), to = (function(e) {
  G(t, e);
  function t() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return t.prototype.hasStroke = function() {
    var r = this.style, i = r.stroke;
    return i != null && i !== "none" && r.lineWidth > 0;
  }, t.prototype.hasFill = function() {
    var r = this.style, i = r.fill;
    return i != null && i !== "none";
  }, t.prototype.createStyle = function(r) {
    return So(gS, r);
  }, t.prototype.setBoundingRect = function(r) {
    this._rect = r;
  }, t.prototype.getBoundingRect = function() {
    var r = this.style;
    if (!this._rect) {
      var i = r.text;
      i != null ? i += "" : i = "";
      var n = Lv(i, r.font, r.textAlign, r.textBaseline);
      if (n.x += r.x || 0, n.y += r.y || 0, this.hasStroke()) {
        var a = r.lineWidth;
        n.x -= a / 2, n.y -= a / 2, n.width += a, n.height += a;
      }
      this._rect = n;
    }
    return this._rect;
  }, t.initDefaultProps = (function() {
    var r = t.prototype;
    r.dirtyRectTolerance = 10;
  })(), t;
})(qn);
to.prototype.type = "tspan";
var _S = ct({
  x: 0,
  y: 0
}, Ur), mS = {
  style: ct({
    x: !0,
    y: !0,
    width: !0,
    height: !0,
    sx: !0,
    sy: !0,
    sWidth: !0,
    sHeight: !0
  }, Mo.style)
};
function yS(e) {
  return !!(e && typeof e != "string" && e.width && e.height);
}
var Xr = (function(e) {
  G(t, e);
  function t() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return t.prototype.createStyle = function(r) {
    return So(_S, r);
  }, t.prototype._getSize = function(r) {
    var i = this.style, n = i[r];
    if (n != null)
      return n;
    var a = yS(i.image) ? i.image : this.__image;
    if (!a)
      return 0;
    var o = r === "width" ? "height" : "width", s = i[o];
    return s == null ? a[r] : a[r] / a[o] * s;
  }, t.prototype.getWidth = function() {
    return this._getSize("width");
  }, t.prototype.getHeight = function() {
    return this._getSize("height");
  }, t.prototype.getAnimationStyleProps = function() {
    return mS;
  }, t.prototype.getBoundingRect = function() {
    var r = this.style;
    return this._rect || (this._rect = new it(r.x || 0, r.y || 0, this.getWidth(), this.getHeight())), this._rect;
  }, t;
})(qn);
Xr.prototype.type = "image";
function wS(e, t) {
  var r = t.x, i = t.y, n = t.width, a = t.height, o = t.r, s, l, u, c;
  n < 0 && (r = r + n, n = -n), a < 0 && (i = i + a, a = -a), typeof o == "number" ? s = l = u = c = o : o instanceof Array ? o.length === 1 ? s = l = u = c = o[0] : o.length === 2 ? (s = u = o[0], l = c = o[1]) : o.length === 3 ? (s = o[0], l = c = o[1], u = o[2]) : (s = o[0], l = o[1], u = o[2], c = o[3]) : s = l = u = c = 0;
  var h;
  s + l > n && (h = s + l, s *= n / h, l *= n / h), u + c > n && (h = u + c, u *= n / h, c *= n / h), l + u > a && (h = l + u, l *= a / h, u *= a / h), s + c > a && (h = s + c, s *= a / h, c *= a / h), e.moveTo(r + s, i), e.lineTo(r + n - l, i), l !== 0 && e.arc(r + n - l, i + l, l, -Math.PI / 2, 0), e.lineTo(r + n, i + a - u), u !== 0 && e.arc(r + n - u, i + a - u, u, 0, Math.PI / 2), e.lineTo(r + c, i + a), c !== 0 && e.arc(r + c, i + a - c, c, Math.PI / 2, Math.PI), e.lineTo(r, i + s), s !== 0 && e.arc(r + s, i + s, s, Math.PI, Math.PI * 1.5);
}
var gi = Math.round;
function Jv(e, t, r) {
  if (t) {
    var i = t.x1, n = t.x2, a = t.y1, o = t.y2;
    e.x1 = i, e.x2 = n, e.y1 = a, e.y2 = o;
    var s = r && r.lineWidth;
    return s && (gi(i * 2) === gi(n * 2) && (e.x1 = e.x2 = Fr(i, s, !0)), gi(a * 2) === gi(o * 2) && (e.y1 = e.y2 = Fr(a, s, !0))), e;
  }
}
function td(e, t, r) {
  if (t) {
    var i = t.x, n = t.y, a = t.width, o = t.height;
    e.x = i, e.y = n, e.width = a, e.height = o;
    var s = r && r.lineWidth;
    return s && (e.x = Fr(i, s, !0), e.y = Fr(n, s, !0), e.width = Math.max(Fr(i + a, s, !1) - e.x, a === 0 ? 0 : 1), e.height = Math.max(Fr(n + o, s, !1) - e.y, o === 0 ? 0 : 1)), e;
  }
}
function Fr(e, t, r) {
  if (!t)
    return e;
  var i = gi(e * 2);
  return (i + gi(t)) % 2 === 0 ? i / 2 : (i + (r ? 1 : -1)) / 2;
}
var bS = /* @__PURE__ */ (function() {
  function e() {
    this.x = 0, this.y = 0, this.width = 0, this.height = 0;
  }
  return e;
})(), SS = {}, ve = (function(e) {
  G(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new bS();
  }, t.prototype.buildPath = function(r, i) {
    var n, a, o, s;
    if (this.subPixelOptimize) {
      var l = td(SS, i, this.style);
      n = l.x, a = l.y, o = l.width, s = l.height, l.r = i.r, i = l;
    } else
      n = i.x, a = i.y, o = i.width, s = i.height;
    i.r ? wS(r, i) : r.rect(n, a, o, s);
  }, t.prototype.isZeroArea = function() {
    return !this.shape.width || !this.shape.height;
  }, t;
})(ot);
ve.prototype.type = "rect";
var Hc = {
  fill: "#000"
}, Uc = 2, xS = {
  style: ct({
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
  }, Mo.style)
}, pe = (function(e) {
  G(t, e);
  function t(r) {
    var i = e.call(this) || this;
    return i.type = "text", i._children = [], i._defaultStyle = Hc, i.attr(r), i;
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
    this._childCursor = 0, AS(this.style), this.style.rich ? this._updateRichTexts() : this._updatePlainTexts(), this._children.length = this._childCursor, this.styleUpdated();
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
      for (var r = new it(0, 0, 0, 0), i = this._children, n = [], a = null, o = 0; o < i.length; o++) {
        var s = i[o], l = s.getBoundingRect(), u = s.getLocalTransform(n);
        u ? (r.copy(l), r.applyTransform(u), a = a || r.clone(), a.union(r)) : (a = a || l.clone(), a.union(l));
      }
      this._rect = a || r;
    }
    return this._rect;
  }, t.prototype.setDefaultTextStyle = function(r) {
    this._defaultStyle = r || Hc;
  }, t.prototype.setTextContent = function(r) {
  }, t.prototype._mergeStyle = function(r, i) {
    if (!i)
      return r;
    var n = i.rich, a = r.rich || n && {};
    return R(r, i), n && a ? (this._mergeRich(a, n), r.rich = a) : a && (r.rich = a), r;
  }, t.prototype._mergeRich = function(r, i) {
    for (var n = pt(i), a = 0; a < n.length; a++) {
      var o = n[a];
      r[o] = r[o] || {}, R(r[o], i[o]);
    }
  }, t.prototype.getAnimationStyleProps = function() {
    return xS;
  }, t.prototype._getOrCreateChild = function(r) {
    var i = this._children[this._childCursor];
    return (!i || !(i instanceof r)) && (i = new r()), this._children[this._childCursor++] = i, i.__zr = this.__zr, i.parent = this, i;
  }, t.prototype._updatePlainTexts = function() {
    var r = this.style, i = r.font || Yr, n = r.padding, a = Zc(r), o = Yb(a, r), s = ms(r), l = !!r.backgroundColor, u = o.outerHeight, c = o.outerWidth, h = o.contentWidth, v = o.lines, f = o.lineHeight, d = this._defaultStyle;
    this.isTruncated = !!o.isTruncated;
    var _ = r.x || 0, p = r.y || 0, g = r.align || d.align || "left", m = r.verticalAlign || d.verticalAlign || "top", y = _, w = fi(p, o.contentHeight, m);
    if (s || n) {
      var S = on(_, c, g), b = fi(p, u, m);
      s && this._renderBackground(r, r, S, b, c, u);
    }
    w += f / 2, n && (y = Xc(_, g, n), m === "top" ? w += n[0] : m === "bottom" && (w -= n[2]));
    for (var x = 0, T = !1, C = qc("fill" in r ? r.fill : (T = !0, d.fill)), M = Yc("stroke" in r ? r.stroke : !l && (!d.autoStroke || T) ? (x = Uc, d.stroke) : null), A = r.textShadowBlur > 0, I = r.width != null && (r.overflow === "truncate" || r.overflow === "break" || r.overflow === "breakAll"), k = o.calculatedLineHeight, P = 0; P < v.length; P++) {
      var E = this._getOrCreateChild(to), O = E.createStyle();
      E.useStyle(O), O.text = v[P], O.x = y, O.y = w, O.textAlign = g, O.textBaseline = "middle", O.opacity = r.opacity, O.strokeFirst = !0, A && (O.shadowBlur = r.textShadowBlur || 0, O.shadowColor = r.textShadowColor || "transparent", O.shadowOffsetX = r.textShadowOffsetX || 0, O.shadowOffsetY = r.textShadowOffsetY || 0), O.stroke = M, O.fill = C, M && (O.lineWidth = r.lineWidth || x, O.lineDash = r.lineDash, O.lineDashOffset = r.lineDashOffset || 0), O.font = i, Gc(O, r), w += f, I && E.setBoundingRect(new it(on(O.x, h, O.textAlign), fi(O.y, k, O.textBaseline), h, k));
    }
  }, t.prototype._updateRichTexts = function() {
    var r = this.style, i = Zc(r), n = Zb(i, r), a = n.width, o = n.outerWidth, s = n.outerHeight, l = r.padding, u = r.x || 0, c = r.y || 0, h = this._defaultStyle, v = r.align || h.align, f = r.verticalAlign || h.verticalAlign;
    this.isTruncated = !!n.isTruncated;
    var d = on(u, o, v), _ = fi(c, s, f), p = d, g = _;
    l && (p += l[3], g += l[0]);
    var m = p + a;
    ms(r) && this._renderBackground(r, r, d, _, o, s);
    for (var y = !!r.backgroundColor, w = 0; w < n.lines.length; w++) {
      for (var S = n.lines[w], b = S.tokens, x = b.length, T = S.lineHeight, C = S.width, M = 0, A = p, I = m, k = x - 1, P = void 0; M < x && (P = b[M], !P.align || P.align === "left"); )
        this._placeToken(P, r, T, g, A, "left", y), C -= P.width, A += P.width, M++;
      for (; k >= 0 && (P = b[k], P.align === "right"); )
        this._placeToken(P, r, T, g, I, "right", y), C -= P.width, I -= P.width, k--;
      for (A += (a - (A - p) - (m - I) - C) / 2; M <= k; )
        P = b[M], this._placeToken(P, r, T, g, A + P.width / 2, "center", y), A += P.width, M++;
      g += T;
    }
  }, t.prototype._placeToken = function(r, i, n, a, o, s, l) {
    var u = i.rich[r.styleName] || {};
    u.text = r.text;
    var c = r.verticalAlign, h = a + n / 2;
    c === "top" ? h = a + r.height / 2 : c === "bottom" && (h = a + n - r.height / 2);
    var v = !r.isLineHolder && ms(u);
    v && this._renderBackground(u, i, s === "right" ? o - r.width : s === "center" ? o - r.width / 2 : o, h - r.height / 2, r.width, r.height);
    var f = !!u.backgroundColor, d = r.textPadding;
    d && (o = Xc(o, s, d), h -= r.height / 2 - d[0] - r.innerHeight / 2);
    var _ = this._getOrCreateChild(to), p = _.createStyle();
    _.useStyle(p);
    var g = this._defaultStyle, m = !1, y = 0, w = qc("fill" in u ? u.fill : "fill" in i ? i.fill : (m = !0, g.fill)), S = Yc("stroke" in u ? u.stroke : "stroke" in i ? i.stroke : !f && !l && (!g.autoStroke || m) ? (y = Uc, g.stroke) : null), b = u.textShadowBlur > 0 || i.textShadowBlur > 0;
    p.text = r.text, p.x = o, p.y = h, b && (p.shadowBlur = u.textShadowBlur || i.textShadowBlur || 0, p.shadowColor = u.textShadowColor || i.textShadowColor || "transparent", p.shadowOffsetX = u.textShadowOffsetX || i.textShadowOffsetX || 0, p.shadowOffsetY = u.textShadowOffsetY || i.textShadowOffsetY || 0), p.textAlign = s, p.textBaseline = "middle", p.font = r.font || Yr, p.opacity = hn(u.opacity, i.opacity, 1), Gc(p, u), S && (p.lineWidth = hn(u.lineWidth, i.lineWidth, y), p.lineDash = K(u.lineDash, i.lineDash), p.lineDashOffset = i.lineDashOffset || 0, p.stroke = S), w && (p.fill = w);
    var x = r.contentWidth, T = r.contentHeight;
    _.setBoundingRect(new it(on(p.x, x, p.textAlign), fi(p.y, T, p.textBaseline), x, T));
  }, t.prototype._renderBackground = function(r, i, n, a, o, s) {
    var l = r.backgroundColor, u = r.borderWidth, c = r.borderColor, h = l && l.image, v = l && !h, f = r.borderRadius, d = this, _, p;
    if (v || r.lineHeight || u && c) {
      _ = this._getOrCreateChild(ve), _.useStyle(_.createStyle()), _.style.fill = null;
      var g = _.shape;
      g.x = n, g.y = a, g.width = o, g.height = s, g.r = f, _.dirtyShape();
    }
    if (v) {
      var m = _.style;
      m.fill = l || null, m.fillOpacity = K(r.fillOpacity, 1);
    } else if (h) {
      p = this._getOrCreateChild(Xr), p.onload = function() {
        d.dirtyStyle();
      };
      var y = p.style;
      y.image = l.image, y.x = n, y.y = a, y.width = o, y.height = s;
    }
    if (u && c) {
      var m = _.style;
      m.lineWidth = u, m.stroke = c, m.strokeOpacity = K(r.strokeOpacity, 1), m.lineDash = r.borderDash, m.lineDashOffset = r.borderDashOffset || 0, _.strokeContainThreshold = 0, _.hasFill() && _.hasStroke() && (m.strokeFirst = !0, m.lineWidth *= 2);
    }
    var w = (_ || p).style;
    w.shadowBlur = r.shadowBlur || 0, w.shadowColor = r.shadowColor || "transparent", w.shadowOffsetX = r.shadowOffsetX || 0, w.shadowOffsetY = r.shadowOffsetY || 0, w.opacity = hn(r.opacity, i.opacity, 1);
  }, t.makeFont = function(r) {
    var i = "";
    return MS(r) && (i = [
      r.fontStyle,
      r.fontWeight,
      DS(r.fontSize),
      r.fontFamily || "sans-serif"
    ].join(" ")), i && Me(i) || r.textFont || r.font;
  }, t;
})(qn), TS = { left: !0, right: 1, center: 1 }, CS = { top: 1, bottom: 1, middle: 1 }, Vc = ["fontStyle", "fontWeight", "fontSize", "fontFamily"];
function DS(e) {
  return typeof e == "string" && (e.indexOf("px") !== -1 || e.indexOf("rem") !== -1 || e.indexOf("em") !== -1) ? e : isNaN(+e) ? Xl + "px" : e + "px";
}
function Gc(e, t) {
  for (var r = 0; r < Vc.length; r++) {
    var i = Vc[r], n = t[i];
    n != null && (e[i] = n);
  }
}
function MS(e) {
  return e.fontSize != null || e.fontFamily || e.fontWeight;
}
function AS(e) {
  return Wc(e), D(e.rich, Wc), e;
}
function Wc(e) {
  if (e) {
    e.font = pe.makeFont(e);
    var t = e.align;
    t === "middle" && (t = "center"), e.align = t == null || TS[t] ? t : "left";
    var r = e.verticalAlign;
    r === "center" && (r = "middle"), e.verticalAlign = r == null || CS[r] ? r : "top";
    var i = e.padding;
    i && (e.padding = uv(e.padding));
  }
}
function Yc(e, t) {
  return e == null || t <= 0 || e === "transparent" || e === "none" ? null : e.image || e.colorStops ? "#000" : e;
}
function qc(e) {
  return e == null || e === "none" ? null : e.image || e.colorStops ? "#000" : e;
}
function Xc(e, t, r) {
  return t === "right" ? e - r[1] : t === "center" ? e + r[3] / 2 - r[1] / 2 : e + r[3];
}
function Zc(e) {
  var t = e.text;
  return t != null && (t += ""), t;
}
function ms(e) {
  return !!(e.backgroundColor || e.lineHeight || e.borderWidth && e.borderColor);
}
var vt = wt(), PS = function(e, t, r, i) {
  if (i) {
    var n = vt(i);
    n.dataIndex = r, n.dataType = t, n.seriesIndex = e, n.ssrType = "chart", i.type === "group" && i.traverse(function(a) {
      var o = vt(a);
      o.seriesIndex = e, o.dataIndex = r, o.dataType = t, o.ssrType = "chart";
    });
  }
}, Kc = 1, jc = {}, ed = wt(), uu = wt(), rd = 0, cu = 1, hu = 2, Le = ["emphasis", "blur", "select"], eo = ["normal", "emphasis", "blur", "select"], IS = 10, kS = 9, Vr = "highlight", Ea = "downplay", _n = "select", Oa = "unselect", mn = "toggleSelect";
function ri(e) {
  return e != null && e !== "none";
}
function Ao(e, t, r) {
  e.onHoverStateChange && (e.hoverState || 0) !== r && e.onHoverStateChange(t), e.hoverState = r;
}
function id(e) {
  Ao(e, "emphasis", hu);
}
function nd(e) {
  e.hoverState === hu && Ao(e, "normal", rd);
}
function fu(e) {
  Ao(e, "blur", cu);
}
function ad(e) {
  e.hoverState === cu && Ao(e, "normal", rd);
}
function LS(e) {
  e.selected = !0;
}
function RS(e) {
  e.selected = !1;
}
function Qc(e, t, r) {
  t(e, r);
}
function qe(e, t, r) {
  Qc(e, t, r), e.isGroup && e.traverse(function(i) {
    Qc(i, t, r);
  });
}
function $S(e, t, r, i) {
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
function ES(e, t, r, i) {
  var n = r && st(r, "select") >= 0, a = !1;
  if (e instanceof ot) {
    var o = ed(e), s = n && o.selectFill || o.normalFill, l = n && o.selectStroke || o.normalStroke;
    if (ri(s) || ri(l)) {
      i = i || {};
      var u = i.style || {};
      u.fill === "inherit" ? (a = !0, i = R({}, i), u = R({}, u), u.fill = s) : !ri(u.fill) && ri(s) ? (a = !0, i = R({}, i), u = R({}, u), u.fill = mc(s)) : !ri(u.stroke) && ri(l) && (a || (i = R({}, i), u = R({}, u)), u.stroke = mc(l)), i.style = u;
    }
  }
  if (i && i.z2 == null) {
    a || (i = R({}, i));
    var c = e.z2EmphasisLift;
    i.z2 = e.z2 + (c ?? IS);
  }
  return i;
}
function OS(e, t, r) {
  if (r && r.z2 == null) {
    r = R({}, r);
    var i = e.z2SelectLift;
    r.z2 = e.z2 + (i ?? kS);
  }
  return r;
}
function BS(e, t, r) {
  var i = st(e.currentStates, t) >= 0, n = e.style.opacity, a = i ? null : $S(e, ["opacity"], t, {
    opacity: 1
  });
  r = r || {};
  var o = r.style || {};
  return o.opacity == null && (r = R({}, r), o = R({
    // Already being applied 'emphasis'. DON'T mul opacity multiple times.
    opacity: i ? n : a.opacity * 0.1
  }, o), r.style = o), r;
}
function ys(e, t) {
  var r = this.states[e];
  if (this.style) {
    if (e === "emphasis")
      return ES(this, e, t, r);
    if (e === "blur")
      return BS(this, e, r);
    if (e === "select")
      return OS(this, e, r);
  }
  return r;
}
function NS(e) {
  e.stateProxy = ys;
  var t = e.getTextContent(), r = e.getTextGuideLine();
  t && (t.stateProxy = ys), r && (r.stateProxy = ys);
}
function Jc(e, t) {
  !ud(e, t) && !e.__highByOuter && qe(e, id);
}
function th(e, t) {
  !ud(e, t) && !e.__highByOuter && qe(e, nd);
}
function _l(e, t) {
  e.__highByOuter |= 1 << (t || 0), qe(e, id);
}
function ml(e, t) {
  !(e.__highByOuter &= ~(1 << (t || 0))) && qe(e, nd);
}
function FS(e) {
  qe(e, fu);
}
function od(e) {
  qe(e, ad);
}
function sd(e) {
  qe(e, LS);
}
function ld(e) {
  qe(e, RS);
}
function ud(e, t) {
  return e.__highDownSilentOnTouch && t.zrByTouch;
}
function cd(e) {
  var t = e.getModel(), r = [], i = [];
  t.eachComponent(function(n, a) {
    var o = uu(a), s = n === "series", l = s ? e.getViewOfSeriesModel(a) : e.getViewOfComponentModel(a);
    !s && i.push(l), o.isBlured && (l.group.traverse(function(u) {
      ad(u);
    }), s && r.push(a)), o.isBlured = !1;
  }), D(i, function(n) {
    n && n.toggleBlurSeries && n.toggleBlurSeries(r, !1, t);
  });
}
function yl(e, t, r, i) {
  var n = i.getModel();
  r = r || "coordinateSystem";
  function a(u, c) {
    for (var h = 0; h < c.length; h++) {
      var v = u.getItemGraphicEl(c[h]);
      v && od(v);
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
          p.__highByOuter && c && t === "self" || fu(p);
        }), Vt(t))
          a(u.getData(), t);
        else if (F(t))
          for (var d = pt(t), _ = 0; _ < d.length; _++)
            a(u.getData(d[_]), t[d[_]]);
        l.push(u), uu(u).isBlured = !0;
      }
    }), n.eachComponent(function(u, c) {
      if (u !== "series") {
        var h = i.getViewOfComponentModel(c);
        h && h.toggleBlurSeries && h.toggleBlurSeries(l, !0, n);
      }
    });
  }
}
function wl(e, t, r) {
  if (!(e == null || t == null)) {
    var i = r.getModel().getComponent(e, t);
    if (i) {
      uu(i).isBlured = !0;
      var n = r.getViewOfComponentModel(i);
      !n || !n.focusBlurEnabled || n.group.traverse(function(a) {
        fu(a);
      });
    }
  }
}
function zS(e, t, r) {
  var i = e.seriesIndex, n = e.getData(t.dataType);
  if (n) {
    var a = Wn(n, t);
    a = (B(a) ? a[0] : a) || 0;
    var o = n.getItemGraphicEl(a);
    if (!o)
      for (var s = n.count(), l = 0; !o && l < s; )
        o = n.getItemGraphicEl(l++);
    if (o) {
      var u = vt(o);
      yl(i, u.focus, u.blurScope, r);
    } else {
      var c = e.get(["emphasis", "focus"]), h = e.get(["emphasis", "blurScope"]);
      c != null && yl(i, c, h, r);
    }
  }
}
function vu(e, t, r, i) {
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
    if (vt(s[u]).focus === "self") {
      l = !0;
      break;
    }
  return {
    focusSelf: l,
    dispatchers: s
  };
}
function HS(e, t, r) {
  var i = vt(e), n = vu(i.componentMainType, i.componentIndex, i.componentHighDownName, r), a = n.dispatchers, o = n.focusSelf;
  a ? (o && wl(i.componentMainType, i.componentIndex, r), D(a, function(s) {
    return Jc(s, t);
  })) : (yl(i.seriesIndex, i.focus, i.blurScope, r), i.focus === "self" && wl(i.componentMainType, i.componentIndex, r), Jc(e, t));
}
function US(e, t, r) {
  cd(r);
  var i = vt(e), n = vu(i.componentMainType, i.componentIndex, i.componentHighDownName, r).dispatchers;
  n ? D(n, function(a) {
    return th(a, t);
  }) : th(e, t);
}
function VS(e, t, r) {
  if (Sl(t)) {
    var i = t.dataType, n = e.getData(i), a = Wn(n, t);
    B(a) || (a = [a]), e[t.type === mn ? "toggleSelect" : t.type === _n ? "select" : "unselect"](a, i);
  }
}
function eh(e) {
  var t = e.getAllData();
  D(t, function(r) {
    var i = r.data, n = r.type;
    i.eachItemGraphicEl(function(a, o) {
      e.isSelected(o, n) ? sd(a) : ld(a);
    });
  });
}
function GS(e) {
  var t = [];
  return e.eachSeries(function(r) {
    var i = r.getAllData();
    D(i, function(n) {
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
function WS(e, t, r) {
  hd(e, !0), qe(e, NS), XS(e, t, r);
}
function YS(e) {
  hd(e, !1);
}
function qS(e, t, r, i) {
  i ? YS(e) : WS(e, t, r);
}
function XS(e, t, r) {
  var i = vt(e);
  t != null ? (i.focus = t, i.blurScope = r) : i.focus && (i.focus = null);
}
var rh = ["emphasis", "blur", "select"], ZS = {
  itemStyle: "getItemStyle",
  lineStyle: "getLineStyle",
  areaStyle: "getAreaStyle"
};
function KS(e, t, r, i) {
  r = r || "itemStyle";
  for (var n = 0; n < rh.length; n++) {
    var a = rh[n], o = t.getModel([a, r]), s = e.ensureState(a);
    s.style = o[ZS[r]]();
  }
}
function hd(e, t) {
  var r = t === !1, i = e;
  e.highDownSilentOnTouch && (i.__highDownSilentOnTouch = e.highDownSilentOnTouch), (!r || i.__highDownDispatcher) && (i.__highByOuter = i.__highByOuter || 0, i.__highDownDispatcher = !r);
}
function bl(e) {
  return !!(e && e.__highDownDispatcher);
}
function jS(e) {
  var t = jc[e];
  return t == null && Kc <= 32 && (t = jc[e] = Kc++), t;
}
function Sl(e) {
  var t = e.type;
  return t === _n || t === Oa || t === mn;
}
function ih(e) {
  var t = e.type;
  return t === Vr || t === Ea;
}
function QS(e) {
  var t = ed(e);
  t.normalFill = e.style.fill, t.normalStroke = e.style.stroke;
  var r = e.states.select || {};
  t.selectFill = r.style && r.style.fill || null, t.selectStroke = r.style && r.style.stroke || null;
}
var ii = Pi.CMD, JS = [[], [], []], nh = Math.sqrt, tx = Math.atan2;
function ex(e, t) {
  if (t) {
    var r = e.data, i = e.len(), n, a, o, s, l, u, c = ii.M, h = ii.C, v = ii.L, f = ii.R, d = ii.A, _ = ii.Q;
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
        case _:
          a = 2;
          break;
        case d:
          var p = t[4], g = t[5], m = nh(t[0] * t[0] + t[1] * t[1]), y = nh(t[2] * t[2] + t[3] * t[3]), w = tx(-t[1] / y, t[0] / m);
          r[o] *= m, r[o++] += p, r[o] *= y, r[o++] += g, r[o++] *= m, r[o++] *= y, r[o++] += w, r[o++] += w, o += 2, s = o;
          break;
        case f:
          u[0] = r[o++], u[1] = r[o++], Ie(u, u, t), r[s++] = u[0], r[s++] = u[1], u[0] += r[o++], u[1] += r[o++], Ie(u, u, t), r[s++] = u[0], r[s++] = u[1];
      }
      for (l = 0; l < a; l++) {
        var S = JS[l];
        S[0] = r[o++], S[1] = r[o++], Ie(S, S, t), r[s++] = S[0], r[s++] = S[1];
      }
    }
    e.increaseVersion();
  }
}
var ws = Math.sqrt, ua = Math.sin, ca = Math.cos, Wi = Math.PI;
function ah(e) {
  return Math.sqrt(e[0] * e[0] + e[1] * e[1]);
}
function xl(e, t) {
  return (e[0] * t[0] + e[1] * t[1]) / (ah(e) * ah(t));
}
function oh(e, t) {
  return (e[0] * t[1] < e[1] * t[0] ? -1 : 1) * Math.acos(xl(e, t));
}
function sh(e, t, r, i, n, a, o, s, l, u, c) {
  var h = l * (Wi / 180), v = ca(h) * (e - r) / 2 + ua(h) * (t - i) / 2, f = -1 * ua(h) * (e - r) / 2 + ca(h) * (t - i) / 2, d = v * v / (o * o) + f * f / (s * s);
  d > 1 && (o *= ws(d), s *= ws(d));
  var _ = (n === a ? -1 : 1) * ws((o * o * (s * s) - o * o * (f * f) - s * s * (v * v)) / (o * o * (f * f) + s * s * (v * v))) || 0, p = _ * o * f / s, g = _ * -s * v / o, m = (e + r) / 2 + ca(h) * p - ua(h) * g, y = (t + i) / 2 + ua(h) * p + ca(h) * g, w = oh([1, 0], [(v - p) / o, (f - g) / s]), S = [(v - p) / o, (f - g) / s], b = [(-1 * v - p) / o, (-1 * f - g) / s], x = oh(S, b);
  if (xl(S, b) <= -1 && (x = Wi), xl(S, b) >= 1 && (x = 0), x < 0) {
    var T = Math.round(x / Wi * 1e6) / 1e6;
    x = Wi * 2 + T % 2 * Wi;
  }
  c.addData(u, m, y, o, s, w, x, h, a);
}
var rx = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/ig, ix = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;
function nx(e) {
  var t = new Pi();
  if (!e)
    return t;
  var r = 0, i = 0, n = r, a = i, o, s = Pi.CMD, l = e.match(rx);
  if (!l)
    return t;
  for (var u = 0; u < l.length; u++) {
    for (var c = l[u], h = c.charAt(0), v = void 0, f = c.match(ix) || [], d = f.length, _ = 0; _ < d; _++)
      f[_] = parseFloat(f[_]);
    for (var p = 0; p < d; ) {
      var g = void 0, m = void 0, y = void 0, w = void 0, S = void 0, b = void 0, x = void 0, T = r, C = i, M = void 0, A = void 0;
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
          g = r, m = i, M = t.len(), A = t.data, o === s.C && (g += r - A[M - 4], m += i - A[M - 3]), v = s.C, T = f[p++], C = f[p++], r = f[p++], i = f[p++], t.addData(v, g, m, T, C, r, i);
          break;
        case "s":
          g = r, m = i, M = t.len(), A = t.data, o === s.C && (g += r - A[M - 4], m += i - A[M - 3]), v = s.C, T = r + f[p++], C = i + f[p++], r += f[p++], i += f[p++], t.addData(v, g, m, T, C, r, i);
          break;
        case "Q":
          T = f[p++], C = f[p++], r = f[p++], i = f[p++], v = s.Q, t.addData(v, T, C, r, i);
          break;
        case "q":
          T = f[p++] + r, C = f[p++] + i, r += f[p++], i += f[p++], v = s.Q, t.addData(v, T, C, r, i);
          break;
        case "T":
          g = r, m = i, M = t.len(), A = t.data, o === s.Q && (g += r - A[M - 4], m += i - A[M - 3]), r = f[p++], i = f[p++], v = s.Q, t.addData(v, g, m, r, i);
          break;
        case "t":
          g = r, m = i, M = t.len(), A = t.data, o === s.Q && (g += r - A[M - 4], m += i - A[M - 3]), r += f[p++], i += f[p++], v = s.Q, t.addData(v, g, m, r, i);
          break;
        case "A":
          y = f[p++], w = f[p++], S = f[p++], b = f[p++], x = f[p++], T = r, C = i, r = f[p++], i = f[p++], v = s.A, sh(T, C, r, i, b, x, y, w, S, v, t);
          break;
        case "a":
          y = f[p++], w = f[p++], S = f[p++], b = f[p++], x = f[p++], T = r, C = i, r += f[p++], i += f[p++], v = s.A, sh(T, C, r, i, b, x, y, w, S, v, t);
          break;
      }
    }
    (h === "z" || h === "Z") && (v = s.Z, t.addData(v), r = n, i = a), o = v;
  }
  return t.toStatic(), t;
}
var fd = (function(e) {
  G(t, e);
  function t() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return t.prototype.applyTransform = function(r) {
  }, t;
})(ot);
function vd(e) {
  return e.setData != null;
}
function dd(e, t) {
  var r = nx(e), i = R({}, t);
  return i.buildPath = function(n) {
    if (vd(n)) {
      n.setData(r.data);
      var a = n.getContext();
      a && n.rebuildPath(a, 1);
    } else {
      var a = n;
      r.rebuildPath(a, 1);
    }
  }, i.applyTransform = function(n) {
    ex(r, n), this.dirtyShape();
  }, i;
}
function ax(e, t) {
  return new fd(dd(e, t));
}
function ox(e, t) {
  var r = dd(e, t), i = (function(n) {
    G(a, n);
    function a(o) {
      var s = n.call(this, o) || this;
      return s.applyTransform = r.applyTransform, s.buildPath = r.buildPath, s;
    }
    return a;
  })(fd);
  return i;
}
function sx(e, t) {
  for (var r = [], i = e.length, n = 0; n < i; n++) {
    var a = e[n];
    r.push(a.getUpdatedPathProxy(!0));
  }
  var o = new ot(t);
  return o.createPathProxy(), o.buildPath = function(s) {
    if (vd(s)) {
      s.appendPath(r);
      var l = s.getContext();
      l && s.rebuildPath(l, 1);
    }
  }, o;
}
var lx = /* @__PURE__ */ (function() {
  function e() {
    this.cx = 0, this.cy = 0, this.r = 0;
  }
  return e;
})(), Po = (function(e) {
  G(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new lx();
  }, t.prototype.buildPath = function(r, i) {
    r.moveTo(i.cx + i.r, i.cy), r.arc(i.cx, i.cy, i.r, 0, Math.PI * 2);
  }, t;
})(ot);
Po.prototype.type = "circle";
var ux = /* @__PURE__ */ (function() {
  function e() {
    this.cx = 0, this.cy = 0, this.rx = 0, this.ry = 0;
  }
  return e;
})(), du = (function(e) {
  G(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new ux();
  }, t.prototype.buildPath = function(r, i) {
    var n = 0.5522848, a = i.cx, o = i.cy, s = i.rx, l = i.ry, u = s * n, c = l * n;
    r.moveTo(a - s, o), r.bezierCurveTo(a - s, o - c, a - u, o - l, a, o - l), r.bezierCurveTo(a + u, o - l, a + s, o - c, a + s, o), r.bezierCurveTo(a + s, o + c, a + u, o + l, a, o + l), r.bezierCurveTo(a - u, o + l, a - s, o + c, a - s, o), r.closePath();
  }, t;
})(ot);
du.prototype.type = "ellipse";
var pd = Math.PI, bs = pd * 2, Ir = Math.sin, ni = Math.cos, cx = Math.acos, Mt = Math.atan2, lh = Math.abs, yn = Math.sqrt, sn = Math.max, Te = Math.min, ue = 1e-4;
function hx(e, t, r, i, n, a, o, s) {
  var l = r - e, u = i - t, c = o - n, h = s - a, v = h * l - c * u;
  if (!(v * v < ue))
    return v = (c * (t - a) - h * (e - n)) / v, [e + v * l, t + v * u];
}
function ha(e, t, r, i, n, a, o) {
  var s = e - r, l = t - i, u = (o ? a : -a) / yn(s * s + l * l), c = u * l, h = -u * s, v = e + c, f = t + h, d = r + c, _ = i + h, p = (v + d) / 2, g = (f + _) / 2, m = d - v, y = _ - f, w = m * m + y * y, S = n - a, b = v * _ - d * f, x = (y < 0 ? -1 : 1) * yn(sn(0, S * S * w - b * b)), T = (b * y - m * x) / w, C = (-b * m - y * x) / w, M = (b * y + m * x) / w, A = (-b * m + y * x) / w, I = T - p, k = C - g, P = M - p, E = A - g;
  return I * I + k * k > P * P + E * E && (T = M, C = A), {
    cx: T,
    cy: C,
    x0: -c,
    y0: -h,
    x1: T * (n / S - 1),
    y1: C * (n / S - 1)
  };
}
function fx(e) {
  var t;
  if (B(e)) {
    var r = e.length;
    if (!r)
      return e;
    r === 1 ? t = [e[0], e[0], 0, 0] : r === 2 ? t = [e[0], e[0], e[1], e[1]] : r === 3 ? t = e.concat(e[2]) : t = e;
  } else
    t = [e, e, e, e];
  return t;
}
function vx(e, t) {
  var r, i = sn(t.r, 0), n = sn(t.r0 || 0, 0), a = i > 0, o = n > 0;
  if (!(!a && !o)) {
    if (a || (i = n, n = 0), n > i) {
      var s = i;
      i = n, n = s;
    }
    var l = t.startAngle, u = t.endAngle;
    if (!(isNaN(l) || isNaN(u))) {
      var c = t.cx, h = t.cy, v = !!t.clockwise, f = lh(u - l), d = f > bs && f % bs;
      if (d > ue && (f = d), !(i > ue))
        e.moveTo(c, h);
      else if (f > bs - ue)
        e.moveTo(c + i * ni(l), h + i * Ir(l)), e.arc(c, h, i, l, u, !v), n > ue && (e.moveTo(c + n * ni(u), h + n * Ir(u)), e.arc(c, h, n, u, l, v));
      else {
        var _ = void 0, p = void 0, g = void 0, m = void 0, y = void 0, w = void 0, S = void 0, b = void 0, x = void 0, T = void 0, C = void 0, M = void 0, A = void 0, I = void 0, k = void 0, P = void 0, E = i * ni(l), O = i * Ir(l), Y = n * ni(u), q = n * Ir(u), N = f > ue;
        if (N) {
          var X = t.cornerRadius;
          X && (r = fx(X), _ = r[0], p = r[1], g = r[2], m = r[3]);
          var j = lh(i - n) / 2;
          if (y = Te(j, g), w = Te(j, m), S = Te(j, _), b = Te(j, p), C = x = sn(y, w), M = T = sn(S, b), (x > ue || T > ue) && (A = i * ni(u), I = i * Ir(u), k = n * ni(l), P = n * Ir(l), f < pd)) {
            var W = hx(E, O, k, P, A, I, Y, q);
            if (W) {
              var gt = E - W[0], bt = O - W[1], Yt = A - W[0], ye = I - W[1], Qt = 1 / Ir(cx((gt * Yt + bt * ye) / (yn(gt * gt + bt * bt) * yn(Yt * Yt + ye * ye))) / 2), qt = yn(W[0] * W[0] + W[1] * W[1]);
              C = Te(x, (i - qt) / (Qt + 1)), M = Te(T, (n - qt) / (Qt - 1));
            }
          }
        }
        if (!N)
          e.moveTo(c + E, h + O);
        else if (C > ue) {
          var xt = Te(g, C), ht = Te(m, C), z = ha(k, P, E, O, i, xt, v), Z = ha(A, I, Y, q, i, ht, v);
          e.moveTo(c + z.cx + z.x0, h + z.cy + z.y0), C < x && xt === ht ? e.arc(c + z.cx, h + z.cy, C, Mt(z.y0, z.x0), Mt(Z.y0, Z.x0), !v) : (xt > 0 && e.arc(c + z.cx, h + z.cy, xt, Mt(z.y0, z.x0), Mt(z.y1, z.x1), !v), e.arc(c, h, i, Mt(z.cy + z.y1, z.cx + z.x1), Mt(Z.cy + Z.y1, Z.cx + Z.x1), !v), ht > 0 && e.arc(c + Z.cx, h + Z.cy, ht, Mt(Z.y1, Z.x1), Mt(Z.y0, Z.x0), !v));
        } else
          e.moveTo(c + E, h + O), e.arc(c, h, i, l, u, !v);
        if (!(n > ue) || !N)
          e.lineTo(c + Y, h + q);
        else if (M > ue) {
          var xt = Te(_, M), ht = Te(p, M), z = ha(Y, q, A, I, n, -ht, v), Z = ha(E, O, k, P, n, -xt, v);
          e.lineTo(c + z.cx + z.x0, h + z.cy + z.y0), M < T && xt === ht ? e.arc(c + z.cx, h + z.cy, M, Mt(z.y0, z.x0), Mt(Z.y0, Z.x0), !v) : (ht > 0 && e.arc(c + z.cx, h + z.cy, ht, Mt(z.y0, z.x0), Mt(z.y1, z.x1), !v), e.arc(c, h, n, Mt(z.cy + z.y1, z.cx + z.x1), Mt(Z.cy + Z.y1, Z.cx + Z.x1), v), xt > 0 && e.arc(c + Z.cx, h + Z.cy, xt, Mt(Z.y1, Z.x1), Mt(Z.y0, Z.x0), !v));
        } else
          e.lineTo(c + Y, h + q), e.arc(c, h, n, u, l, v);
      }
      e.closePath();
    }
  }
}
var dx = /* @__PURE__ */ (function() {
  function e() {
    this.cx = 0, this.cy = 0, this.r0 = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0, this.cornerRadius = 0;
  }
  return e;
})(), Xn = (function(e) {
  G(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new dx();
  }, t.prototype.buildPath = function(r, i) {
    vx(r, i);
  }, t.prototype.isZeroArea = function() {
    return this.shape.startAngle === this.shape.endAngle || this.shape.r === this.shape.r0;
  }, t;
})(ot);
Xn.prototype.type = "sector";
var px = /* @__PURE__ */ (function() {
  function e() {
    this.cx = 0, this.cy = 0, this.r = 0, this.r0 = 0;
  }
  return e;
})(), pu = (function(e) {
  G(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new px();
  }, t.prototype.buildPath = function(r, i) {
    var n = i.cx, a = i.cy, o = Math.PI * 2;
    r.moveTo(n + i.r, a), r.arc(n, a, i.r, 0, o, !1), r.moveTo(n + i.r0, a), r.arc(n, a, i.r0, 0, o, !0);
  }, t;
})(ot);
pu.prototype.type = "ring";
function gx(e, t, r, i) {
  var n = [], a = [], o = [], s = [], l, u, c, h;
  if (i) {
    c = [1 / 0, 1 / 0], h = [-1 / 0, -1 / 0];
    for (var v = 0, f = e.length; v < f; v++)
      vi(c, c, e[v]), di(h, h, e[v]);
    vi(c, c, i[0]), di(h, h, i[1]);
  }
  for (var v = 0, f = e.length; v < f; v++) {
    var d = e[v];
    if (r)
      l = e[v ? v - 1 : f - 1], u = e[(v + 1) % f];
    else if (v === 0 || v === f - 1) {
      n.push(Qw(e[v]));
      continue;
    } else
      l = e[v - 1], u = e[v + 1];
    Jw(a, u, l), No(a, a, t);
    var _ = Qs(d, l), p = Qs(d, u), g = _ + p;
    g !== 0 && (_ /= g, p /= g), No(o, a, -_), No(s, a, p);
    var m = tc([], d, o), y = tc([], d, s);
    i && (di(m, m, c), vi(m, m, h), di(y, y, c), vi(y, y, h)), n.push(m), n.push(y);
  }
  return r && n.push(n.shift()), n;
}
function gd(e, t, r) {
  var i = t.smooth, n = t.points;
  if (n && n.length >= 2) {
    if (i) {
      var a = gx(n, i, r, t.smoothConstraint);
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
var _x = /* @__PURE__ */ (function() {
  function e() {
    this.points = null, this.smooth = 0, this.smoothConstraint = null;
  }
  return e;
})(), gu = (function(e) {
  G(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new _x();
  }, t.prototype.buildPath = function(r, i) {
    gd(r, i, !0);
  }, t;
})(ot);
gu.prototype.type = "polygon";
var mx = /* @__PURE__ */ (function() {
  function e() {
    this.points = null, this.percent = 1, this.smooth = 0, this.smoothConstraint = null;
  }
  return e;
})(), Zn = (function(e) {
  G(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  }, t.prototype.getDefaultShape = function() {
    return new mx();
  }, t.prototype.buildPath = function(r, i) {
    gd(r, i, !1);
  }, t;
})(ot);
Zn.prototype.type = "polyline";
var yx = {}, bx = /* @__PURE__ */ (function() {
  function e() {
    this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.percent = 1;
  }
  return e;
})(), Li = (function(e) {
  G(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  }, t.prototype.getDefaultShape = function() {
    return new bx();
  }, t.prototype.buildPath = function(r, i) {
    var n, a, o, s;
    if (this.subPixelOptimize) {
      var l = Jv(yx, i, this.style);
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
})(ot);
Li.prototype.type = "line";
var Ot = [], Sx = /* @__PURE__ */ (function() {
  function e() {
    this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.cpx1 = 0, this.cpy1 = 0, this.percent = 1;
  }
  return e;
})();
function uh(e, t, r) {
  var i = e.cpx2, n = e.cpy2;
  return i != null || n != null ? [
    (r ? hc : Rt)(e.x1, e.cpx1, e.cpx2, e.x2, t),
    (r ? hc : Rt)(e.y1, e.cpy1, e.cpy2, e.y2, t)
  ] : [
    (r ? fc : Ft)(e.x1, e.cpx1, e.x2, t),
    (r ? fc : Ft)(e.y1, e.cpy1, e.y2, t)
  ];
}
var _u = (function(e) {
  G(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  }, t.prototype.getDefaultShape = function() {
    return new Sx();
  }, t.prototype.buildPath = function(r, i) {
    var n = i.x1, a = i.y1, o = i.x2, s = i.y2, l = i.cpx1, u = i.cpy1, c = i.cpx2, h = i.cpy2, v = i.percent;
    v !== 0 && (r.moveTo(n, a), c == null || h == null ? (v < 1 && (Za(n, l, o, v, Ot), l = Ot[1], o = Ot[2], Za(a, u, s, v, Ot), u = Ot[1], s = Ot[2]), r.quadraticCurveTo(l, u, o, s)) : (v < 1 && (Xa(n, l, c, o, v, Ot), l = Ot[1], c = Ot[2], o = Ot[3], Xa(a, u, h, s, v, Ot), u = Ot[1], h = Ot[2], s = Ot[3]), r.bezierCurveTo(l, u, c, h, o, s)));
  }, t.prototype.pointAt = function(r) {
    return uh(this.shape, r, !1);
  }, t.prototype.tangentAt = function(r) {
    var i = uh(this.shape, r, !0);
    return r1(i, i);
  }, t;
})(ot);
_u.prototype.type = "bezier-curve";
var xx = /* @__PURE__ */ (function() {
  function e() {
    this.cx = 0, this.cy = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0;
  }
  return e;
})(), Io = (function(e) {
  G(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  }, t.prototype.getDefaultShape = function() {
    return new xx();
  }, t.prototype.buildPath = function(r, i) {
    var n = i.cx, a = i.cy, o = Math.max(i.r, 0), s = i.startAngle, l = i.endAngle, u = i.clockwise, c = Math.cos(s), h = Math.sin(s);
    r.moveTo(c * o + n, h * o + a), r.arc(n, a, o, s, l, !u);
  }, t;
})(ot);
Io.prototype.type = "arc";
var Tx = (function(e) {
  G(t, e);
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
    return this._updatePathDirty.call(this), ot.prototype.getBoundingRect.call(this);
  }, t;
})(ot), _d = (function() {
  function e(t) {
    this.colorStops = t || [];
  }
  return e.prototype.addColorStop = function(t, r) {
    this.colorStops.push({
      offset: t,
      color: r
    });
  }, e;
})(), Cx = (function(e) {
  G(t, e);
  function t(r, i, n, a, o, s) {
    var l = e.call(this, o) || this;
    return l.x = r ?? 0, l.y = i ?? 0, l.x2 = n ?? 1, l.y2 = a ?? 0, l.type = "linear", l.global = s || !1, l;
  }
  return t;
})(_d), Dx = (function(e) {
  G(t, e);
  function t(r, i, n, a, o) {
    var s = e.call(this, a) || this;
    return s.x = r ?? 0.5, s.y = i ?? 0.5, s.r = n ?? 0.5, s.type = "radial", s.global = o || !1, s;
  }
  return t;
})(_d), kr = [0, 0], Lr = [0, 0], fa = new V(), va = new V(), ro = (function() {
  function e(t, r) {
    this._corners = [], this._axes = [], this._origin = [0, 0];
    for (var i = 0; i < 4; i++)
      this._corners[i] = new V();
    for (var i = 0; i < 2; i++)
      this._axes[i] = new V();
    t && this.fromBoundingRect(t, r);
  }
  return e.prototype.fromBoundingRect = function(t, r) {
    var i = this._corners, n = this._axes, a = t.x, o = t.y, s = a + t.width, l = o + t.height;
    if (i[0].set(a, o), i[1].set(s, o), i[2].set(s, l), i[3].set(a, l), r)
      for (var u = 0; u < 4; u++)
        i[u].transform(r);
    V.sub(n[0], i[1], i[0]), V.sub(n[1], i[3], i[0]), n[0].normalize(), n[1].normalize();
    for (var u = 0; u < 2; u++)
      this._origin[u] = n[u].dot(i[0]);
  }, e.prototype.intersect = function(t, r) {
    var i = !0, n = !r;
    return fa.set(1 / 0, 1 / 0), va.set(0, 0), !this._intersectCheckOneSide(this, t, fa, va, n, 1) && (i = !1, n) || !this._intersectCheckOneSide(t, this, fa, va, n, -1) && (i = !1, n) || n || V.copy(r, i ? fa : va), i;
  }, e.prototype._intersectCheckOneSide = function(t, r, i, n, a, o) {
    for (var s = !0, l = 0; l < 2; l++) {
      var u = this._axes[l];
      if (this._getProjMinMaxOnAxis(l, t._corners, kr), this._getProjMinMaxOnAxis(l, r._corners, Lr), kr[1] < Lr[0] || kr[0] > Lr[1]) {
        if (s = !1, a)
          return s;
        var c = Math.abs(Lr[0] - kr[1]), h = Math.abs(kr[0] - Lr[1]);
        Math.min(c, h) > n.len() && (c < h ? V.scale(n, u, -c * o) : V.scale(n, u, h * o));
      } else if (i) {
        var c = Math.abs(Lr[0] - kr[1]), h = Math.abs(kr[0] - Lr[1]);
        Math.min(c, h) < i.len() && (c < h ? V.scale(i, u, c * o) : V.scale(i, u, -h * o));
      }
    }
    return s;
  }, e.prototype._getProjMinMaxOnAxis = function(t, r, i) {
    for (var n = this._axes[t], a = this._origin, o = r[0].dot(n) + a[t], s = o, l = o, u = 1; u < r.length; u++) {
      var c = r[u].dot(n) + a[t];
      s = Math.min(c, s), l = Math.max(c, l);
    }
    i[0] = s, i[1] = l;
  }, e;
})(), Mx = [], Ax = (function(e) {
  G(t, e);
  function t() {
    var r = e !== null && e.apply(this, arguments) || this;
    return r.notClear = !0, r.incremental = !0, r._displayables = [], r._temporaryDisplayables = [], r._cursor = 0, r;
  }
  return t.prototype.traverse = function(r, i) {
    r.call(i, this);
  }, t.prototype.useStyle = function() {
    this.style = {};
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
      for (var r = new it(1 / 0, 1 / 0, -1 / 0, -1 / 0), i = 0; i < this._displayables.length; i++) {
        var n = this._displayables[i], a = n.getBoundingRect().clone();
        n.needLocalTransform() && a.applyTransform(n.getLocalTransform(Mx)), r.union(a);
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
})(qn), Px = wt();
function Ix(e, t, r, i, n) {
  var a;
  if (t && t.ecModel) {
    var o = t.ecModel.getUpdatePayload();
    a = o && o.animation;
  }
  var s = t && t.isAnimationEnabled(), l = e === "update";
  if (s) {
    var u = void 0, c = void 0, h = void 0;
    i ? (u = K(i.duration, 200), c = K(i.easing, "cubicOut"), h = 0) : (u = t.getShallow(l ? "animationDurationUpdate" : "animationDuration"), c = t.getShallow(l ? "animationEasingUpdate" : "animationEasing"), h = t.getShallow(l ? "animationDelayUpdate" : "animationDelay")), a && (a.duration != null && (u = a.duration), a.easing != null && (c = a.easing), a.delay != null && (h = a.delay)), rt(h) && (h = h(r, n)), rt(u) && (u = u(r));
    var v = {
      duration: u || 0,
      delay: h,
      easing: c
    };
    return v;
  } else
    return null;
}
function mu(e, t, r, i, n, a, o) {
  var s = !1, l;
  rt(n) ? (o = a, a = n, n = null) : F(n) && (a = n.cb, o = n.during, s = n.isFrom, l = n.removeOpt, n = n.dataIndex);
  var u = e === "leave";
  u || t.stopAnimation("leave");
  var c = Ix(e, i, n, u ? l || {} : null, i && i.getAnimationDelayParams ? i.getAnimationDelayParams(t, n) : null);
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
function Ln(e, t, r, i, n, a) {
  mu("update", e, t, r, i, n, a);
}
function Ba(e, t, r, i, n, a) {
  mu("enter", e, t, r, i, n, a);
}
function wn(e) {
  if (!e.__zr)
    return !0;
  for (var t = 0; t < e.animators.length; t++) {
    var r = e.animators[t];
    if (r.scope === "leave")
      return !0;
  }
  return !1;
}
function md(e, t, r, i, n, a) {
  wn(e) || mu("leave", e, t, r, i, n, a);
}
function ch(e, t, r, i) {
  e.removeTextContent(), e.removeTextGuideLine(), md(e, {
    style: {
      opacity: 0
    }
  }, t, r, i);
}
function yd(e, t, r) {
  function i() {
    e.parent && e.parent.remove(e);
  }
  e.isGroup ? e.traverse(function(n) {
    n.isGroup || ch(n, t, r, i);
  }) : ch(e, t, r, i);
}
function kx(e) {
  Px(e).oldStyle = e.style;
}
var io = Math.max, no = Math.min, Tl = {};
function Lx(e) {
  return ot.extend(e);
}
var Rx = ox;
function $x(e, t) {
  return Rx(e, t);
}
function _e(e, t) {
  Tl[e] = t;
}
function Ex(e) {
  if (Tl.hasOwnProperty(e))
    return Tl[e];
}
function yu(e, t, r, i) {
  var n = ax(e, t);
  return r && (i === "center" && (r = bd(r, n.getBoundingRect())), Sd(n, r)), n;
}
function wd(e, t, r) {
  var i = new Xr({
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
        i.setStyle(bd(t, a));
      }
    }
  });
  return i;
}
function bd(e, t) {
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
var Ox = sx;
function Sd(e, t) {
  if (e.applyTransform) {
    var r = e.getBoundingRect(), i = r.calculateTransform(t);
    e.applyTransform(i);
  }
}
function wu(e, t) {
  return Jv(e, e, {
    lineWidth: t
  }), e;
}
function Bx(e) {
  return td(e.shape, e.shape, e.style), e;
}
var Nx = Fr;
function Fx(e, t) {
  for (var r = tu([]); e && e !== t; )
    yi(r, e.getLocalTransform(), r), e = e.parent;
  return r;
}
function bu(e, t, r) {
  return t && !Vt(t) && (t = iu.getLocalTransform(t)), r && (t = pv([], t)), Ie([], e, t);
}
function zx(e, t, r) {
  var i = t[4] === 0 || t[5] === 0 || t[0] === 0 ? 1 : Math.abs(2 * t[4] / t[0]), n = t[4] === 0 || t[5] === 0 || t[2] === 0 ? 1 : Math.abs(2 * t[4] / t[2]), a = [e === "left" ? -i : e === "right" ? i : 0, e === "top" ? -n : e === "bottom" ? n : 0];
  return a = bu(a, t, r), Math.abs(a[0]) > Math.abs(a[1]) ? a[0] > 0 ? "right" : "left" : a[1] > 0 ? "bottom" : "top";
}
function hh(e) {
  return !e.isGroup;
}
function Hx(e) {
  return e.shape != null;
}
function Ux(e, t, r) {
  if (!e || !t)
    return;
  function i(o) {
    var s = {};
    return o.traverse(function(l) {
      hh(l) && l.anid && (s[l.anid] = l);
    }), s;
  }
  function n(o) {
    var s = {
      x: o.x,
      y: o.y,
      rotation: o.rotation
    };
    return Hx(o) && (s.shape = R({}, o.shape)), s;
  }
  var a = i(e);
  t.traverse(function(o) {
    if (hh(o) && o.anid) {
      var s = a[o.anid];
      if (s) {
        var l = n(o);
        o.attr(n(s)), Ln(o, l, r, vt(o).dataIndex);
      }
    }
  });
}
function Vx(e, t) {
  return J(e, function(r) {
    var i = r[0];
    i = io(i, t.x), i = no(i, t.x + t.width);
    var n = r[1];
    return n = io(n, t.y), n = no(n, t.y + t.height), [i, n];
  });
}
function Gx(e, t) {
  var r = io(e.x, t.x), i = no(e.x + e.width, t.x + t.width), n = io(e.y, t.y), a = no(e.y + e.height, t.y + t.height);
  if (i >= r && a >= n)
    return {
      x: r,
      y: n,
      width: i - r,
      height: a - n
    };
}
function xd(e, t, r) {
  var i = R({
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
    return e.indexOf("image://") === 0 ? (n.image = e.slice(8), ct(n, r), new Xr(i)) : yu(e.replace("path://", ""), i, r, "center");
}
function Wx(e, t, r, i, n) {
  for (var a = 0, o = n[n.length - 1]; a < n.length; a++) {
    var s = n[a];
    if (Td(e, t, r, i, s[0], s[1], o[0], o[1]))
      return !0;
    o = s;
  }
}
function Td(e, t, r, i, n, a, o, s) {
  var l = r - e, u = i - t, c = o - n, h = s - a, v = Ss(c, h, l, u);
  if (Yx(v))
    return !1;
  var f = e - n, d = t - a, _ = Ss(f, d, l, u) / v;
  if (_ < 0 || _ > 1)
    return !1;
  var p = Ss(f, d, c, h) / v;
  return !(p < 0 || p > 1);
}
function Ss(e, t, r, i) {
  return e * i - r * t;
}
function Yx(e) {
  return e <= 1e-6 && e >= -1e-6;
}
function Su(e) {
  var t = e.itemTooltipOption, r = e.componentModel, i = e.itemName, n = U(t) ? {
    formatter: t
  } : t, a = r.mainType, o = r.componentIndex, s = {
    componentType: a,
    name: i,
    $vars: ["name"]
  };
  s[a + "Index"] = o;
  var l = e.formatterParamsExtra;
  l && D(pt(l), function(c) {
    Mi(s, c) || (s[c] = l[c], s.$vars.push(c));
  });
  var u = vt(e.el);
  u.componentMainType = a, u.componentIndex = o, u.tooltipConfig = {
    name: i,
    option: ct({
      content: i,
      encodeHTMLContent: !0,
      formatterParams: s
    }, n)
  };
}
function fh(e, t) {
  var r;
  e.isGroup && (r = t(e)), r || e.traverse(t);
}
function Cd(e, t) {
  if (e)
    if (B(e))
      for (var r = 0; r < e.length; r++)
        fh(e[r], t);
    else
      fh(e, t);
}
_e("circle", Po);
_e("ellipse", du);
_e("sector", Xn);
_e("ring", pu);
_e("polygon", gu);
_e("polyline", Zn);
_e("rect", ve);
_e("line", Li);
_e("bezierCurve", _u);
_e("arc", Io);
const qx = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Arc: Io,
  BezierCurve: _u,
  BoundingRect: it,
  Circle: Po,
  CompoundPath: Tx,
  Ellipse: du,
  Group: Ve,
  Image: Xr,
  IncrementalDisplayable: Ax,
  Line: Li,
  LinearGradient: Cx,
  OrientedBoundingRect: ro,
  Path: ot,
  Point: V,
  Polygon: gu,
  Polyline: Zn,
  RadialGradient: Dx,
  Rect: ve,
  Ring: pu,
  Sector: Xn,
  Text: pe,
  applyTransform: bu,
  clipPointsByRect: Vx,
  clipRectByRect: Gx,
  createIcon: xd,
  extendPath: $x,
  extendShape: Lx,
  getShapeClass: Ex,
  getTransform: Fx,
  groupTransition: Ux,
  initProps: Ba,
  isElementRemoved: wn,
  lineLineIntersect: Td,
  linePolygonIntersect: Wx,
  makeImage: wd,
  makePath: yu,
  mergePath: Ox,
  registerShape: _e,
  removeElement: md,
  removeElementWithFadeOut: yd,
  resizePath: Sd,
  setTooltipConfig: Su,
  subPixelOptimize: Nx,
  subPixelOptimizeLine: wu,
  subPixelOptimizeRect: Bx,
  transformDirection: zx,
  traverseElements: Cd,
  updateProps: Ln
}, Symbol.toStringTag, { value: "Module" }));
var ko = {};
function Xx(e, t) {
  for (var r = 0; r < Le.length; r++) {
    var i = Le[r], n = t[i], a = e.ensureState(i);
    a.style = a.style || {}, a.style.text = n;
  }
  var o = e.currentStates.slice();
  e.clearStates(!0), e.setStyle({
    text: t.normal
  }), e.useStates(o, !0);
}
function vh(e, t, r) {
  var i = e.labelFetcher, n = e.labelDataIndex, a = e.labelDimIndex, o = t.normal, s;
  i && (s = i.getFormattedLabel(n, "normal", null, a, o && o.get("formatter"), r != null ? {
    interpolatedValue: r
  } : null)), s == null && (s = rt(e.defaultText) ? e.defaultText(n, e, r) : e.defaultText);
  for (var l = {
    normal: s
  }, u = 0; u < Le.length; u++) {
    var c = Le[u], h = t[c];
    l[c] = K(i ? i.getFormattedLabel(n, c, null, a, h && h.get("formatter")) : null, s);
  }
  return l;
}
function Zx(e, t, r, i) {
  r = r || ko;
  for (var n = e instanceof pe, a = !1, o = 0; o < eo.length; o++) {
    var s = t[eo[o]];
    if (s && s.getShallow("show")) {
      a = !0;
      break;
    }
  }
  var l = n ? e : e.getTextContent();
  if (a) {
    n || (l || (l = new pe(), e.setTextContent(l)), e.stateProxy && (l.stateProxy = e.stateProxy));
    var u = vh(r, t), c = t.normal, h = !!c.getShallow("show"), v = Rn(c, i, r, !1, !n);
    v.text = u.normal, n || e.setTextConfig(dh(c, r, !1));
    for (var o = 0; o < Le.length; o++) {
      var f = Le[o], s = t[f];
      if (s) {
        var d = l.ensureState(f), _ = !!K(s.getShallow("show"), h);
        if (_ !== h && (d.ignore = !_), d.style = Rn(s, i, r, !0, !n), d.style.text = u[f], !n) {
          var p = e.ensureState(f);
          p.textConfig = dh(s, r, !0);
        }
      }
    }
    l.silent = !!c.getShallow("silent"), l.style.x != null && (v.x = l.style.x), l.style.y != null && (v.y = l.style.y), l.ignore = !h, l.useStyle(v), l.dirty(), r.enableTextSetter && (tT(l).setLabelText = function(g) {
      var m = vh(r, t, g);
      Xx(l, m);
    });
  } else l && (l.ignore = !0);
  e.dirty();
}
function Kx(e, t) {
  t = t || "label";
  for (var r = {
    normal: e.getModel(t)
  }, i = 0; i < Le.length; i++) {
    var n = Le[i];
    r[n] = e.getModel([n, t]);
  }
  return r;
}
function Rn(e, t, r, i, n) {
  var a = {};
  return jx(a, e, r, i, n), t && R(a, t), a;
}
function dh(e, t, r) {
  t = t || {};
  var i = {}, n, a = e.getShallow("rotate"), o = K(e.getShallow("distance"), r ? null : 5), s = e.getShallow("offset");
  return n = e.getShallow("position") || (r ? null : "inside"), n === "outside" && (n = t.defaultOutsidePosition || "top"), n != null && (i.position = n), s != null && (i.offset = s), a != null && (a *= Math.PI / 180, i.rotation = a), o != null && (i.distance = o), i.outsideFill = e.get("color") === "inherit" ? t.inheritColor || null : "auto", i;
}
function jx(e, t, r, i, n) {
  r = r || ko;
  var a = t.ecModel, o = a && a.option.textStyle, s = Qx(t), l;
  if (s) {
    l = {};
    for (var u in s)
      if (s.hasOwnProperty(u)) {
        var c = t.getModel(["rich", u]);
        mh(l[u] = {}, c, o, r, i, n, !1, !0);
      }
  }
  l && (e.rich = l);
  var h = t.get("overflow");
  h && (e.overflow = h);
  var v = t.get("minMargin");
  v != null && (e.margin = v), mh(e, t, o, r, i, n, !0, !1);
}
function Qx(e) {
  for (var t; e && e !== e.ecModel; ) {
    var r = (e.option || ko).rich;
    if (r) {
      t = t || {};
      for (var i = pt(r), n = 0; n < i.length; n++) {
        var a = i[n];
        t[a] = 1;
      }
    }
    e = e.parentModel;
  }
  return t;
}
var ph = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY"], gh = ["align", "lineHeight", "width", "height", "tag", "verticalAlign", "ellipsis"], _h = ["padding", "borderWidth", "borderRadius", "borderDashOffset", "backgroundColor", "borderColor", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"];
function mh(e, t, r, i, n, a, o, s) {
  r = !n && r || ko;
  var l = i && i.inheritColor, u = t.getShallow("color"), c = t.getShallow("textBorderColor"), h = K(t.getShallow("opacity"), r.opacity);
  (u === "inherit" || u === "auto") && (l ? u = l : u = null), (c === "inherit" || c === "auto") && (l ? c = l : c = null), a || (u = u || r.color, c = c || r.textBorderColor), u != null && (e.fill = u), c != null && (e.stroke = c);
  var v = K(t.getShallow("textBorderWidth"), r.textBorderWidth);
  v != null && (e.lineWidth = v);
  var f = K(t.getShallow("textBorderType"), r.textBorderType);
  f != null && (e.lineDash = f);
  var d = K(t.getShallow("textBorderDashOffset"), r.textBorderDashOffset);
  d != null && (e.lineDashOffset = d), !n && h == null && !s && (h = i && i.defaultOpacity), h != null && (e.opacity = h), !n && !a && e.fill == null && i.inheritColor && (e.fill = i.inheritColor);
  for (var _ = 0; _ < ph.length; _++) {
    var p = ph[_], g = K(t.getShallow(p), r[p]);
    g != null && (e[p] = g);
  }
  for (var _ = 0; _ < gh.length; _++) {
    var p = gh[_], g = t.getShallow(p);
    g != null && (e[p] = g);
  }
  if (e.verticalAlign == null) {
    var m = t.getShallow("baseline");
    m != null && (e.verticalAlign = m);
  }
  if (!o || !i.disableBox) {
    for (var _ = 0; _ < _h.length; _++) {
      var p = _h[_], g = t.getShallow(p);
      g != null && (e[p] = g);
    }
    var y = t.getShallow("borderType");
    y != null && (e.borderDash = y), (e.backgroundColor === "auto" || e.backgroundColor === "inherit") && l && (e.backgroundColor = l), (e.borderColor === "auto" || e.borderColor === "inherit") && l && (e.borderColor = l);
  }
}
function Jx(e, t) {
  var r = t && t.getModel("textStyle");
  return Me([
    // FIXME in node-canvas fontWeight is before fontStyle
    e.fontStyle || r && r.getShallow("fontStyle") || "",
    e.fontWeight || r && r.getShallow("fontWeight") || "",
    (e.fontSize || r && r.getShallow("fontSize") || 12) + "px",
    e.fontFamily || r && r.getShallow("fontFamily") || "sans-serif"
  ].join(" "));
}
var tT = wt(), eT = ["textStyle", "color"], xs = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "padding", "lineHeight", "rich", "width", "height", "overflow"], Ts = new pe(), rT = (
  /** @class */
  (function() {
    function e() {
    }
    return e.prototype.getTextColor = function(t) {
      var r = this.ecModel;
      return this.getShallow("color") || (!t && r ? r.get(eT) : null);
    }, e.prototype.getFont = function() {
      return Jx({
        fontStyle: this.getShallow("fontStyle"),
        fontWeight: this.getShallow("fontWeight"),
        fontSize: this.getShallow("fontSize"),
        fontFamily: this.getShallow("fontFamily")
      }, this.ecModel);
    }, e.prototype.getTextRect = function(t) {
      for (var r = {
        text: t,
        verticalAlign: this.getShallow("verticalAlign") || this.getShallow("baseline")
      }, i = 0; i < xs.length; i++)
        r[xs[i]] = this.getShallow(xs[i]);
      return Ts.useStyle(r), Ts.update(), Ts.getBoundingRect();
    }, e;
  })()
), Dd = [
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
], iT = kn(Dd), nT = (
  /** @class */
  (function() {
    function e() {
    }
    return e.prototype.getLineStyle = function(t) {
      return iT(this, t);
    }, e;
  })()
), Md = [
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
], aT = kn(Md), oT = (
  /** @class */
  (function() {
    function e() {
    }
    return e.prototype.getItemStyle = function(t, r) {
      return aT(this, t, r);
    }, e;
  })()
), dt = (
  /** @class */
  (function() {
    function e(t, r, i) {
      this.parentModel = r, this.ecModel = i, this.option = t;
    }
    return e.prototype.init = function(t, r, i) {
    }, e.prototype.mergeOption = function(t, r) {
      _t(this.option, t, !0);
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
      return new t(Q(this.option));
    }, e.prototype.parsePath = function(t) {
      return typeof t == "string" ? t.split(".") : t;
    }, e.prototype.resolveParentPath = function(t) {
      return t;
    }, e.prototype.isAnimationEnabled = function() {
      if (!H.node && this.option) {
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
su(dt);
Bb(dt);
Ye(dt, nT);
Ye(dt, oT);
Ye(dt, Ub);
Ye(dt, rT);
var sT = Math.round(Math.random() * 10);
function Lo(e) {
  return [e || "", sT++].join("_");
}
function lT(e) {
  var t = {};
  e.registerSubTypeDefaulter = function(r, i) {
    var n = Ae(r);
    t[n.main] = i;
  }, e.determineSubType = function(r, i) {
    var n = i.type;
    if (!n) {
      var a = Ae(r).main;
      e.hasSubTypes(r) && t[a] && (n = t[a](i));
    }
    return n;
  };
}
function uT(e, t) {
  e.topologicalTravel = function(a, o, s, l) {
    if (!a.length)
      return;
    var u = r(o), c = u.graph, h = u.noEntryList, v = {};
    for (D(a, function(m) {
      v[m] = !0;
    }); h.length; ) {
      var f = h.pop(), d = c[f], _ = !!v[f];
      _ && (s.call(l, f, d.originalDeps.slice()), delete v[f]), D(d.successor, _ ? g : p);
    }
    D(v, function() {
      var m = "";
      throw new Error(m);
    });
    function p(m) {
      c[m].entryCount--, c[m].entryCount === 0 && h.push(m);
    }
    function g(m) {
      v[m] = !0, p(m);
    }
  };
  function r(a) {
    var o = {}, s = [];
    return D(a, function(l) {
      var u = i(o, l), c = u.originalDeps = t(l), h = n(c, a);
      u.entryCount = h.length, u.entryCount === 0 && s.push(l), D(h, function(v) {
        st(u.predecessor, v) < 0 && u.predecessor.push(v);
        var f = i(o, v);
        st(f.successor, v) < 0 && f.successor.push(l);
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
    return D(a, function(l) {
      st(o, l) >= 0 && s.push(l);
    }), s;
  }
}
const cT = {
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
}, hT = {
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
var ao = "ZH", xu = "EN", Si = xu, Na = {}, Tu = {}, Ad = H.domSupported ? (function() {
  var e = (
    /* eslint-disable-next-line */
    (document.documentElement.lang || navigator.language || navigator.browserLanguage || Si).toUpperCase()
  );
  return e.indexOf(ao) > -1 ? ao : Si;
})() : Si;
function Pd(e, t) {
  e = e.toUpperCase(), Tu[e] = new dt(t), Na[e] = t;
}
function fT(e) {
  if (U(e)) {
    var t = Na[e.toUpperCase()] || {};
    return e === ao || e === xu ? Q(t) : _t(Q(t), Q(Na[Si]), !1);
  } else
    return _t(Q(e), Q(Na[Si]), !1);
}
function vT(e) {
  return Tu[e];
}
function dT() {
  return Tu[Si];
}
Pd(xu, cT);
Pd(ao, hT);
function Qe(e, t) {
  return e += "", "0000".substr(0, t - e.length) + e;
}
function Id(e, t, r, i) {
  var n = To(e), a = n[pT(r)](), o = n[gT(r)]() + 1, s = Math.floor((o - 1) / 3) + 1, l = n[_T(r)](), u = n["get" + (r ? "UTC" : "") + "Day"](), c = n[mT(r)](), h = (c - 1) % 12 + 1, v = n[yT(r)](), f = n[wT(r)](), d = n[bT(r)](), _ = c >= 12 ? "pm" : "am", p = _.toUpperCase(), g = i instanceof dt ? i : vT(Ad) || dT(), m = g.getModel("time"), y = m.get("month"), w = m.get("monthAbbr"), S = m.get("dayOfWeek"), b = m.get("dayOfWeekAbbr");
  return (t || "").replace(/{a}/g, _ + "").replace(/{A}/g, p + "").replace(/{yyyy}/g, a + "").replace(/{yy}/g, Qe(a % 100 + "", 2)).replace(/{Q}/g, s + "").replace(/{MMMM}/g, y[o - 1]).replace(/{MMM}/g, w[o - 1]).replace(/{MM}/g, Qe(o, 2)).replace(/{M}/g, o + "").replace(/{dd}/g, Qe(l, 2)).replace(/{d}/g, l + "").replace(/{eeee}/g, S[u]).replace(/{ee}/g, b[u]).replace(/{e}/g, u + "").replace(/{HH}/g, Qe(c, 2)).replace(/{H}/g, c + "").replace(/{hh}/g, Qe(h + "", 2)).replace(/{h}/g, h + "").replace(/{mm}/g, Qe(v, 2)).replace(/{m}/g, v + "").replace(/{ss}/g, Qe(f, 2)).replace(/{s}/g, f + "").replace(/{SSS}/g, Qe(d, 3)).replace(/{S}/g, d + "");
}
function pT(e) {
  return e ? "getUTCFullYear" : "getFullYear";
}
function gT(e) {
  return e ? "getUTCMonth" : "getMonth";
}
function _T(e) {
  return e ? "getUTCDate" : "getDate";
}
function mT(e) {
  return e ? "getUTCHours" : "getHours";
}
function yT(e) {
  return e ? "getUTCMinutes" : "getMinutes";
}
function wT(e) {
  return e ? "getUTCSeconds" : "getSeconds";
}
function bT(e) {
  return e ? "getUTCMilliseconds" : "getMilliseconds";
}
function ST(e) {
  if (!_b(e))
    return U(e) ? e : "-";
  var t = (e + "").split(".");
  return t[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (t.length > 1 ? "." + t[1] : "");
}
function kd(e, t) {
  return e = (e || "").toLowerCase().replace(/-(.)/g, function(r, i) {
    return i.toUpperCase();
  }), t && e && (e = e.charAt(0).toUpperCase() + e.slice(1)), e;
}
var Cu = uv;
function Cl(e, t, r) {
  var i = "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}";
  function n(c) {
    return c && Me(c) ? c : "-";
  }
  function a(c) {
    return !!(c != null && !isNaN(c) && isFinite(c));
  }
  var o = t === "time", s = e instanceof Date;
  if (o || s) {
    var l = o ? To(e) : e;
    if (isNaN(+l)) {
      if (s)
        return "-";
    } else return Id(l, i, r);
  }
  if (t === "ordinal")
    return Ks(e) ? n(e) : mt(e) && a(e) ? e + "" : "-";
  var u = Ja(e);
  return a(u) ? ST(u) : Ks(e) ? n(e) : typeof e == "boolean" ? e + "" : "-";
}
var yh = ["a", "b", "c", "d", "e", "f", "g"], Cs = function(e, t) {
  return "{" + e + (t ?? "") + "}";
};
function Ld(e, t, r) {
  B(t) || (t = [t]);
  var i = t.length;
  if (!i)
    return "";
  for (var n = t[0].$vars || [], a = 0; a < n.length; a++) {
    var o = yh[a];
    e = e.replace(Cs(o), Cs(o, 0));
  }
  for (var s = 0; s < i; s++)
    for (var l = 0; l < n.length; l++) {
      var u = t[s][n[l]];
      e = e.replace(Cs(yh[l], s), r ? Nt(u) : u);
    }
  return e;
}
function xT(e, t) {
  var r = U(e) ? {
    color: e,
    extraCssText: t
  } : e || {}, i = r.color, n = r.type;
  t = r.extraCssText;
  var a = r.renderMode || "html";
  if (!i)
    return "";
  if (a === "html")
    return n === "subItem" ? '<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:' + Nt(i) + ";" + (t || "") + '"></span>' : '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:' + Nt(i) + ";" + (t || "") + '"></span>';
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
function $n(e, t) {
  return t = t || "transparent", U(e) ? e : F(e) && e.colorStops && (e.colorStops[0] || {}).color || t;
}
var Fa = D, TT = ["left", "right", "top", "bottom", "width", "height"], da = [["width", "left", "right"], ["height", "top", "bottom"]];
function Rd(e, t, r, i, n) {
  var a = 0, o = 0;
  i == null && (i = 1 / 0), n == null && (n = 1 / 0);
  var s = 0;
  t.eachChild(function(l, u) {
    var c = l.getBoundingRect(), h = t.childAt(u + 1), v = h && h.getBoundingRect(), f, d;
    if (e === "horizontal") {
      var _ = c.width + (v ? -v.x + c.x : 0);
      f = a + _, f > i || l.newline ? (a = 0, f = _, o += s + r, s = c.height) : s = Math.max(s, c.height);
    } else {
      var p = c.height + (v ? -v.y + c.y : 0);
      d = o + p, d > n || l.newline ? (a += s + r, o = 0, d = p, s = c.width) : s = Math.max(s, c.width);
    }
    l.newline || (l.x = a, l.y = o, l.markRedraw(), e === "horizontal" ? a = f + r : o = d + r);
  });
}
Zt(Rd, "vertical");
Zt(Rd, "horizontal");
function $d(e, t, r) {
  r = Cu(r || 0);
  var i = t.width, n = t.height, a = yt(e.left, i), o = yt(e.top, n), s = yt(e.right, i), l = yt(e.bottom, n), u = yt(e.width, i), c = yt(e.height, n), h = r[2] + r[0], v = r[1] + r[3], f = e.aspect;
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
  var d = new it(a + r[3], o + r[0], u, c);
  return d.margin = r, d;
}
function oo(e) {
  var t = e.layoutMode || e.constructor.layoutMode;
  return F(t) ? t : t ? {
    type: t
  } : null;
}
function so(e, t, r) {
  var i = r && r.ignoreSize;
  !B(i) && (i = [i, i]);
  var n = o(da[0], 0), a = o(da[1], 1);
  u(da[0], e, n), u(da[1], e, a);
  function o(c, h) {
    var v = {}, f = 0, d = {}, _ = 0, p = 2;
    if (Fa(c, function(y) {
      d[y] = e[y];
    }), Fa(c, function(y) {
      s(t, y) && (v[y] = d[y] = t[y]), l(v, y) && f++, l(d, y) && _++;
    }), i[h])
      return l(t, c[1]) ? d[c[2]] = null : l(t, c[2]) && (d[c[1]] = null), d;
    if (_ === p || !f)
      return d;
    if (f >= p)
      return v;
    for (var g = 0; g < c.length; g++) {
      var m = c[g];
      if (!s(v, m) && s(e, m)) {
        v[m] = e[m];
        break;
      }
    }
    return v;
  }
  function s(c, h) {
    return c.hasOwnProperty(h);
  }
  function l(c, h) {
    return c[h] != null && c[h] !== "auto";
  }
  function u(c, h, v) {
    Fa(c, function(f) {
      h[f] = v[f];
    });
  }
}
function Ed(e) {
  return CT({}, e);
}
function CT(e, t) {
  return t && e && Fa(TT, function(r) {
    t.hasOwnProperty(r) && (e[r] = t[r]);
  }), e;
}
var DT = wt(), at = (
  /** @class */
  (function(e) {
    G(t, e);
    function t(r, i, n) {
      var a = e.call(this, r, i, n) || this;
      return a.uid = Lo("ec_cpt_model"), a;
    }
    return t.prototype.init = function(r, i, n) {
      this.mergeDefaultAndTheme(r, n);
    }, t.prototype.mergeDefaultAndTheme = function(r, i) {
      var n = oo(this), a = n ? Ed(r) : {}, o = i.getTheme();
      _t(r, o.get(this.mainType)), _t(r, this.getDefaultOption()), n && so(r, a, n);
    }, t.prototype.mergeOption = function(r, i) {
      _t(this.option, r, !0);
      var n = oo(this);
      n && so(this.option, r, n);
    }, t.prototype.optionUpdated = function(r, i) {
    }, t.prototype.getDefaultOption = function() {
      var r = this.constructor;
      if (!$b(r))
        return r.defaultOption;
      var i = DT(this);
      if (!i.defaultOption) {
        for (var n = [], a = r; a; ) {
          var o = a.prototype.defaultOption;
          o && n.push(o), a = a.superClass;
        }
        for (var s = {}, l = n.length - 1; l >= 0; l--)
          s = _t(s, n[l], !0);
        i.defaultOption = s;
      }
      return i.defaultOption;
    }, t.prototype.getReferringComponents = function(r, i) {
      var n = r + "Index", a = r + "Id";
      return Yn(this.ecModel, r, {
        index: this.get(n, !0),
        id: this.get(a, !0)
      }, i);
    }, t.prototype.getBoxLayoutParams = function() {
      var r = this;
      return {
        left: r.get("left"),
        top: r.get("top"),
        right: r.get("right"),
        bottom: r.get("bottom"),
        width: r.get("width"),
        height: r.get("height")
      };
    }, t.prototype.getZLevelKey = function() {
      return "";
    }, t.prototype.setZLevel = function(r) {
      this.option.zlevel = r;
    }, t.protoInitialize = (function() {
      var r = t.prototype;
      r.type = "component", r.id = "", r.name = "", r.mainType = "", r.subType = "", r.componentIndex = 0;
    })(), t;
  })(dt)
);
Wv(at, dt);
lu(at);
lT(at);
uT(at, MT);
function MT(e) {
  var t = [];
  return D(at.getClassesByMainType(e), function(r) {
    t = t.concat(r.dependencies || r.prototype.dependencies || []);
  }), t = J(t, function(r) {
    return Ae(r).main;
  }), e !== "dataset" && st(t, "dataset") <= 0 && t.unshift("dataset"), t;
}
var Od = "";
typeof navigator < "u" && (Od = navigator.platform || "");
var ai = "rgba(0, 0, 0, 0.2)";
const AT = {
  darkMode: "auto",
  // backgroundColor: 'rgba(0,0,0,0)',
  colorBy: "series",
  color: ["#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de", "#3ba272", "#fc8452", "#9a60b4", "#ea7ccc"],
  gradientColor: ["#f6efa6", "#d88273", "#bf444c"],
  aria: {
    decal: {
      decals: [{
        color: ai,
        dashArrayX: [1, 0],
        dashArrayY: [2, 5],
        symbolSize: 1,
        rotation: Math.PI / 6
      }, {
        color: ai,
        symbol: "circle",
        dashArrayX: [[8, 8], [0, 8, 8, 0]],
        dashArrayY: [6, 0],
        symbolSize: 0.8
      }, {
        color: ai,
        dashArrayX: [1, 0],
        dashArrayY: [4, 3],
        rotation: -Math.PI / 4
      }, {
        color: ai,
        dashArrayX: [[6, 6], [0, 6, 6, 0]],
        dashArrayY: [6, 0]
      }, {
        color: ai,
        dashArrayX: [[1, 0], [1, 6]],
        dashArrayY: [1, 0, 6, 0],
        rotation: Math.PI / 4
      }, {
        color: ai,
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
    fontFamily: Od.match(/^Win/) ? "Microsoft YaHei" : "sans-serif",
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
var Bd = tt(["tooltip", "label", "itemName", "itemId", "itemGroupId", "itemChildGroupId", "seriesName"]), $e = "original", Wt = "arrayRows", me = "objectRows", Ee = "keyedColumns", cr = "typedArray", Nd = "unknown", He = "column", Ri = "row", Tt = {
  Must: 1,
  Might: 2,
  Not: 3
  // Other cases
}, PT = wt();
function IT(e) {
  PT(e).datasetMap = tt();
}
function kT(e, t, r) {
  var i = {}, n = Fd(e);
  if (!n)
    return i;
  var a = t.sourceFormat, o = t.dimensionsDefine, s;
  (a === me || a === Ee) && D(o, function(c, h) {
    (F(c) ? c.name : c) === "name" && (s = h);
  });
  var l = (function() {
    for (var c = {}, h = {}, v = [], f = 0, d = Math.min(5, r); f < d; f++) {
      var _ = Hd(t.data, a, t.seriesLayoutBy, o, t.startIndex, f);
      v.push(_);
      var p = _ === Tt.Not;
      if (p && c.v == null && f !== s && (c.v = f), (c.n == null || c.n === c.v || !p && v[c.n] === Tt.Not) && (c.n = f), g(c) && v[c.n] !== Tt.Not)
        return c;
      p || (_ === Tt.Might && h.v == null && f !== s && (h.v = f), (h.n == null || h.n === h.v) && (h.n = f));
    }
    function g(m) {
      return m.v != null && m.n != null;
    }
    return g(c) ? c : g(h) ? h : null;
  })();
  if (l) {
    i.value = [l.v];
    var u = s ?? l.n;
    i.itemName = [u], i.seriesName = [u];
  }
  return i;
}
function Fd(e) {
  var t = e.get("data", !0);
  if (!t)
    return Yn(e.ecModel, "dataset", {
      index: e.get("datasetIndex", !0),
      id: e.get("datasetId", !0)
    }, ou).models[0];
}
function LT(e) {
  return !e.get("transform", !0) && !e.get("fromTransformResult", !0) ? [] : Yn(e.ecModel, "dataset", {
    index: e.get("fromDatasetIndex", !0),
    id: e.get("fromDatasetId", !0)
  }, ou).models;
}
function zd(e, t) {
  return Hd(e.data, e.sourceFormat, e.seriesLayoutBy, e.dimensionsDefine, e.startIndex, t);
}
function Hd(e, t, r, i, n, a) {
  var o, s = 5;
  if (Gt(e))
    return Tt.Not;
  var l, u;
  if (i) {
    var c = i[a];
    F(c) ? (l = c.name, u = c.type) : U(c) && (l = c);
  }
  if (u != null)
    return u === "ordinal" ? Tt.Must : Tt.Not;
  if (t === Wt) {
    var h = e;
    if (r === Ri) {
      for (var v = h[a], f = 0; f < (v || []).length && f < s; f++)
        if ((o = w(v[n + f])) != null)
          return o;
    } else
      for (var f = 0; f < h.length && f < s; f++) {
        var d = h[n + f];
        if (d && (o = w(d[a])) != null)
          return o;
      }
  } else if (t === me) {
    var _ = e;
    if (!l)
      return Tt.Not;
    for (var f = 0; f < _.length && f < s; f++) {
      var p = _[f];
      if (p && (o = w(p[l])) != null)
        return o;
    }
  } else if (t === Ee) {
    var g = e;
    if (!l)
      return Tt.Not;
    var v = g[l];
    if (!v || Gt(v))
      return Tt.Not;
    for (var f = 0; f < v.length && f < s; f++)
      if ((o = w(v[f])) != null)
        return o;
  } else if (t === $e)
    for (var m = e, f = 0; f < m.length && f < s; f++) {
      var p = m[f], y = Co(p);
      if (!B(y))
        return Tt.Not;
      if ((o = w(y[a])) != null)
        return o;
    }
  function w(S) {
    var b = U(S);
    if (S != null && Number.isFinite(Number(S)) && S !== "")
      return b ? Tt.Might : Tt.Not;
    if (b && S !== "-")
      return Tt.Must;
  }
  return Tt.Not;
}
var RT = tt();
function $T(e, t, r) {
  var i = RT.get(t);
  if (!i)
    return r;
  var n = i(e);
  return n ? r.concat(n) : r;
}
var wh = wt();
wt();
var Du = (
  /** @class */
  (function() {
    function e() {
    }
    return e.prototype.getColorFromPalette = function(t, r, i) {
      var n = $t(this.get("color", !0)), a = this.get("colorLayer", !0);
      return OT(this, wh, n, a, t, r, i);
    }, e.prototype.clearColorPalette = function() {
      BT(this, wh);
    }, e;
  })()
);
function ET(e, t) {
  for (var r = e.length, i = 0; i < r; i++)
    if (e[i].length > t)
      return e[i];
  return e[r - 1];
}
function OT(e, t, r, i, n, a, o) {
  a = a || e;
  var s = t(a), l = s.paletteIdx || 0, u = s.paletteNameMap = s.paletteNameMap || {};
  if (u.hasOwnProperty(n))
    return u[n];
  var c = o == null || !i ? r : ET(i, o);
  if (c = c || r, !(!c || !c.length)) {
    var h = c[l];
    return n && (u[n] = h), s.paletteIdx = (l + 1) % c.length, h;
  }
}
function BT(e, t) {
  t(e).paletteIdx = 0, t(e).paletteNameMap = {};
}
var pa, Yi, bh, Sh = "\0_ec_inner", NT = 1, Mu = (
  /** @class */
  (function(e) {
    G(t, e);
    function t() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return t.prototype.init = function(r, i, n, a, o, s) {
      a = a || {}, this.option = null, this._theme = new dt(a), this._locale = new dt(o), this._optionManager = s;
    }, t.prototype.setOption = function(r, i, n) {
      var a = Ch(i);
      this._optionManager.setOption(r, n, a), this._resetOption(null, a);
    }, t.prototype.resetOption = function(r, i) {
      return this._resetOption(r, Ch(i));
    }, t.prototype._resetOption = function(r, i) {
      var n = !1, a = this._optionManager;
      if (!r || r === "recreate") {
        var o = a.mountOption(r === "recreate");
        !this.option || r === "recreate" ? bh(this, o) : (this.restoreData(), this._mergeOption(o, i)), n = !0;
      }
      if ((r === "timeline" || r === "media") && this.restoreData(), !r || r === "recreate" || r === "timeline") {
        var s = a.getTimelineOption(this);
        s && (n = !0, this._mergeOption(s, i));
      }
      if (!r || r === "recreate" || r === "media") {
        var l = a.getMediaOption(this);
        l.length && D(l, function(u) {
          n = !0, this._mergeOption(u, i);
        }, this);
      }
      return n;
    }, t.prototype.mergeOption = function(r) {
      this._mergeOption(r, null);
    }, t.prototype._mergeOption = function(r, i) {
      var n = this.option, a = this._componentsMap, o = this._componentsCount, s = [], l = tt(), u = i && i.replaceMergeMainTypeMap;
      IT(this), D(r, function(h, v) {
        h != null && (at.hasClass(v) ? v && (s.push(v), l.set(v, !0)) : n[v] = n[v] == null ? Q(h) : _t(n[v], h, !0));
      }), u && u.each(function(h, v) {
        at.hasClass(v) && !l.get(v) && (s.push(v), l.set(v, !0));
      }), at.topologicalTravel(s, at.getAllClassMainTypes(), c, this);
      function c(h) {
        var v = $T(this, h, $t(r[h])), f = a.get(h), d = (
          // `!oldCmptList` means init. See the comment in `mappingToExists`
          f ? u && u.get(h) ? "replaceMerge" : "normalMerge" : "replaceAll"
        ), _ = wb(f, v, d);
        Mb(_, h, at), n[h] = null, a.set(h, null), o.set(h, 0);
        var p = [], g = [], m = 0, y;
        D(_, function(w, S) {
          var b = w.existing, x = w.newOption;
          if (!x)
            b && (b.mergeOption({}, this), b.optionUpdated({}, !1));
          else {
            var T = h === "series", C = at.getClass(
              h,
              w.keyInfo.subType,
              !T
              // Give a more detailed warn later if series don't exists
            );
            if (!C)
              return;
            if (h === "tooltip") {
              if (y)
                return;
              y = !0;
            }
            if (b && b.constructor === C)
              b.name = w.keyInfo.name, b.mergeOption(x, this), b.optionUpdated(x, !1);
            else {
              var M = R({
                componentIndex: S
              }, w.keyInfo);
              b = new C(x, this, this, M), R(b, M), w.brandNew && (b.__requireNewView = !0), b.init(x, this, this), b.optionUpdated(null, !0);
            }
          }
          b ? (p.push(b.option), g.push(b), m++) : (p.push(void 0), g.push(void 0));
        }, this), n[h] = p, a.set(h, g), o.set(h, m), h === "series" && pa(this);
      }
      this._seriesIndices || pa(this);
    }, t.prototype.getOption = function() {
      var r = Q(this.option);
      return D(r, function(i, n) {
        if (at.hasClass(n)) {
          for (var a = $t(i), o = a.length, s = !1, l = o - 1; l >= 0; l--)
            a[l] && !In(a[l]) ? s = !0 : (a[l] = null, !s && o--);
          a.length = o, r[n] = a;
        }
      }), delete r[Sh], r;
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
      return n != null ? (l = [], D($t(n), function(u) {
        s[u] && l.push(s[u]);
      })) : a != null ? l = xh("id", a, s) : o != null ? l = xh("name", o, s) : l = fe(s, function(u) {
        return !!u;
      }), Th(l, r);
    }, t.prototype.findComponents = function(r) {
      var i = r.query, n = r.mainType, a = s(i), o = a ? this.queryComponents(a) : fe(this._componentsMap.get(n), function(u) {
        return !!u;
      });
      return l(Th(o, r));
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
        return r.filter ? fe(u, r.filter) : u;
      }
    }, t.prototype.eachComponent = function(r, i, n) {
      var a = this._componentsMap;
      if (rt(r)) {
        var o = i, s = r;
        a.each(function(h, v) {
          for (var f = 0; h && f < h.length; f++) {
            var d = h[f];
            d && s.call(o, v, d, d.componentIndex);
          }
        });
      } else
        for (var l = U(r) ? a.get(r) : F(r) ? this.findComponents(r) : null, u = 0; l && u < l.length; u++) {
          var c = l[u];
          c && i.call(n, c, c.componentIndex);
        }
    }, t.prototype.getSeriesByName = function(r) {
      var i = ke(r, null);
      return fe(this._componentsMap.get("series"), function(n) {
        return !!n && i != null && n.name === i;
      });
    }, t.prototype.getSeriesByIndex = function(r) {
      return this._componentsMap.get("series")[r];
    }, t.prototype.getSeriesByType = function(r) {
      return fe(this._componentsMap.get("series"), function(i) {
        return !!i && i.subType === r;
      });
    }, t.prototype.getSeries = function() {
      return fe(this._componentsMap.get("series"), function(r) {
        return !!r;
      });
    }, t.prototype.getSeriesCount = function() {
      return this._componentsCount.get("series");
    }, t.prototype.eachSeries = function(r, i) {
      Yi(this), D(this._seriesIndices, function(n) {
        var a = this._componentsMap.get("series")[n];
        r.call(i, a, n);
      }, this);
    }, t.prototype.eachRawSeries = function(r, i) {
      D(this._componentsMap.get("series"), function(n) {
        n && r.call(i, n, n.componentIndex);
      });
    }, t.prototype.eachSeriesByType = function(r, i, n) {
      Yi(this), D(this._seriesIndices, function(a) {
        var o = this._componentsMap.get("series")[a];
        o.subType === r && i.call(n, o, a);
      }, this);
    }, t.prototype.eachRawSeriesByType = function(r, i, n) {
      return D(this.getSeriesByType(r), i, n);
    }, t.prototype.isSeriesFiltered = function(r) {
      return Yi(this), this._seriesIndicesMap.get(r.componentIndex) == null;
    }, t.prototype.getCurrentSeriesIndices = function() {
      return (this._seriesIndices || []).slice();
    }, t.prototype.filterSeries = function(r, i) {
      Yi(this);
      var n = [];
      D(this._seriesIndices, function(a) {
        var o = this._componentsMap.get("series")[a];
        r.call(i, o, a) && n.push(a);
      }, this), this._seriesIndices = n, this._seriesIndicesMap = tt(n);
    }, t.prototype.restoreData = function(r) {
      pa(this);
      var i = this._componentsMap, n = [];
      i.each(function(a, o) {
        at.hasClass(o) && n.push(o);
      }), at.topologicalTravel(n, at.getAllClassMainTypes(), function(a) {
        D(i.get(a), function(o) {
          o && (a !== "series" || !FT(o, r)) && o.restoreData();
        });
      });
    }, t.internalField = (function() {
      pa = function(r) {
        var i = r._seriesIndices = [];
        D(r._componentsMap.get("series"), function(n) {
          n && i.push(n.componentIndex);
        }), r._seriesIndicesMap = tt(i);
      }, Yi = function(r) {
      }, bh = function(r, i) {
        r.option = {}, r.option[Sh] = NT, r._componentsMap = tt({
          series: []
        }), r._componentsCount = tt();
        var n = i.aria;
        F(n) && n.enabled == null && (n.enabled = !0), zT(i, r._theme.option), _t(i, AT, !1), r._mergeOption(i, null);
      };
    })(), t;
  })(dt)
);
function FT(e, t) {
  if (t) {
    var r = t.seriesIndex, i = t.seriesId, n = t.seriesName;
    return r != null && e.componentIndex !== r || i != null && e.id !== i || n != null && e.name !== n;
  }
}
function zT(e, t) {
  var r = e.color && !e.colorLayer;
  D(t, function(i, n) {
    n === "colorLayer" && r || at.hasClass(n) || (typeof i == "object" ? e[n] = e[n] ? _t(e[n], i, !1) : Q(i) : e[n] == null && (e[n] = i));
  });
}
function xh(e, t, r) {
  if (B(t)) {
    var i = tt();
    return D(t, function(a) {
      if (a != null) {
        var o = ke(a, null);
        o != null && i.set(a, !0);
      }
    }), fe(r, function(a) {
      return a && i.get(a[e]);
    });
  } else {
    var n = ke(t, null);
    return fe(r, function(a) {
      return a && n != null && a[e] === n;
    });
  }
}
function Th(e, t) {
  return t.hasOwnProperty("subType") ? fe(e, function(r) {
    return r && r.subType === t.subType;
  }) : e;
}
function Ch(e) {
  var t = tt();
  return e && D($t(e.replaceMerge), function(r) {
    t.set(r, !0);
  }), {
    replaceMergeMainTypeMap: t
  };
}
Ye(Mu, Du);
var HT = [
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
], Ud = (
  /** @class */
  /* @__PURE__ */ (function() {
    function e(t) {
      D(HT, function(r) {
        this[r] = lt(t[r], t);
      }, this);
    }
    return e;
  })()
), Ds = {}, Vd = (
  /** @class */
  (function() {
    function e() {
      this._coordinateSystems = [];
    }
    return e.prototype.create = function(t, r) {
      var i = [];
      D(Ds, function(n, a) {
        var o = n.create(t, r);
        i = i.concat(o || []);
      }), this._coordinateSystems = i;
    }, e.prototype.update = function(t, r) {
      D(this._coordinateSystems, function(i) {
        i.update && i.update(t, r);
      });
    }, e.prototype.getCoordinateSystems = function() {
      return this._coordinateSystems.slice();
    }, e.register = function(t, r) {
      Ds[t] = r;
    }, e.get = function(t) {
      return Ds[t];
    }, e;
  })()
), UT = /^(min|max)?(.+)$/, VT = (
  /** @class */
  (function() {
    function e(t) {
      this._timelineOptions = [], this._mediaList = [], this._currentMediaIndices = [], this._api = t;
    }
    return e.prototype.setOption = function(t, r, i) {
      t && (D($t(t.series), function(o) {
        o && o.data && Gt(o.data) && js(o.data);
      }), D($t(t.dataset), function(o) {
        o && o.source && Gt(o.source) && js(o.source);
      })), t = Q(t);
      var n = this._optionBackup, a = GT(t, r, !n);
      this._newBaseOption = a.baseOption, n ? (a.timelineOptions.length && (n.timelineOptions = a.timelineOptions), a.mediaList.length && (n.mediaList = a.mediaList), a.mediaDefault && (n.mediaDefault = a.mediaDefault)) : this._optionBackup = a;
    }, e.prototype.mountOption = function(t) {
      var r = this._optionBackup;
      return this._timelineOptions = r.timelineOptions, this._mediaList = r.mediaList, this._mediaDefault = r.mediaDefault, this._currentMediaIndices = [], Q(t ? r.baseOption : this._newBaseOption);
    }, e.prototype.getTimelineOption = function(t) {
      var r, i = this._timelineOptions;
      if (i.length) {
        var n = t.getComponent("timeline");
        n && (r = Q(
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
        WT(n[l].query, r, i) && o.push(l);
      return !o.length && a && (o = [-1]), o.length && !qT(o, this._currentMediaIndices) && (s = J(o, function(c) {
        return Q(c === -1 ? a.option : n[c].option);
      })), this._currentMediaIndices = o, s;
    }, e;
  })()
);
function GT(e, t, r) {
  var i = [], n, a, o = e.baseOption, s = e.timeline, l = e.options, u = e.media, c = !!e.media, h = !!(l || s || o && o.timeline);
  o ? (a = o, a.timeline || (a.timeline = s)) : ((h || c) && (e.options = e.media = null), a = e), c && B(u) && D(u, function(f) {
    f && f.option && (f.query ? i.push(f) : n || (n = f));
  }), v(a), D(l, function(f) {
    return v(f);
  }), D(i, function(f) {
    return v(f.option);
  });
  function v(f) {
    D(t, function(d) {
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
function WT(e, t, r) {
  var i = {
    width: t,
    height: r,
    aspectratio: t / r
    // lower case for convenience.
  }, n = !0;
  return D(e, function(a, o) {
    var s = o.match(UT);
    if (!(!s || !s[1] || !s[2])) {
      var l = s[1], u = s[2].toLowerCase();
      YT(i[u], a, l) || (n = !1);
    }
  }), n;
}
function YT(e, t, r) {
  return r === "min" ? e >= t : r === "max" ? e <= t : e === t;
}
function qT(e, t) {
  return e.join(",") === t.join(",");
}
var le = D, En = F, Dh = ["areaStyle", "lineStyle", "nodeStyle", "linkStyle", "chordStyle", "label", "labelLine"];
function Ms(e) {
  var t = e && e.itemStyle;
  if (t)
    for (var r = 0, i = Dh.length; r < i; r++) {
      var n = Dh[r], a = t.normal, o = t.emphasis;
      a && a[n] && (e[n] = e[n] || {}, e[n].normal ? _t(e[n].normal, a[n]) : e[n].normal = a[n], a[n] = null), o && o[n] && (e[n] = e[n] || {}, e[n].emphasis ? _t(e[n].emphasis, o[n]) : e[n].emphasis = o[n], o[n] = null);
    }
}
function It(e, t, r) {
  if (e && e[t] && (e[t].normal || e[t].emphasis)) {
    var i = e[t].normal, n = e[t].emphasis;
    i && (r ? (e[t].normal = e[t].emphasis = null, ct(e[t], i)) : e[t] = i), n && (e.emphasis = e.emphasis || {}, e.emphasis[t] = n, n.focus && (e.emphasis.focus = n.focus), n.blurScope && (e.emphasis.blurScope = n.blurScope));
  }
}
function ln(e) {
  It(e, "itemStyle"), It(e, "lineStyle"), It(e, "areaStyle"), It(e, "label"), It(e, "labelLine"), It(e, "upperLabel"), It(e, "edgeLabel");
}
function ft(e, t) {
  var r = En(e) && e[t], i = En(r) && r.textStyle;
  if (i)
    for (var n = 0, a = Rc.length; n < a; n++) {
      var o = Rc[n];
      i.hasOwnProperty(o) && (r[o] = i[o]);
    }
}
function ie(e) {
  e && (ln(e), ft(e, "label"), e.emphasis && ft(e.emphasis, "label"));
}
function XT(e) {
  if (En(e)) {
    Ms(e), ln(e), ft(e, "label"), ft(e, "upperLabel"), ft(e, "edgeLabel"), e.emphasis && (ft(e.emphasis, "label"), ft(e.emphasis, "upperLabel"), ft(e.emphasis, "edgeLabel"));
    var t = e.markPoint;
    t && (Ms(t), ie(t));
    var r = e.markLine;
    r && (Ms(r), ie(r));
    var i = e.markArea;
    i && ie(i);
    var n = e.data;
    if (e.type === "graph") {
      n = n || e.nodes;
      var a = e.links || e.edges;
      if (a && !Gt(a))
        for (var o = 0; o < a.length; o++)
          ie(a[o]);
      D(e.categories, function(u) {
        ln(u);
      });
    }
    if (n && !Gt(n))
      for (var o = 0; o < n.length; o++)
        ie(n[o]);
    if (t = e.markPoint, t && t.data)
      for (var s = t.data, o = 0; o < s.length; o++)
        ie(s[o]);
    if (r = e.markLine, r && r.data)
      for (var l = r.data, o = 0; o < l.length; o++)
        B(l[o]) ? (ie(l[o][0]), ie(l[o][1])) : ie(l[o]);
    e.type === "gauge" ? (ft(e, "axisLabel"), ft(e, "title"), ft(e, "detail")) : e.type === "treemap" ? (It(e.breadcrumb, "itemStyle"), D(e.levels, function(u) {
      ln(u);
    })) : e.type === "tree" && ln(e.leaves);
  }
}
function Ne(e) {
  return B(e) ? e : e ? [e] : [];
}
function Mh(e) {
  return (B(e) ? e[0] : e) || {};
}
function ZT(e, t) {
  le(Ne(e.series), function(i) {
    En(i) && XT(i);
  });
  var r = ["xAxis", "yAxis", "radiusAxis", "angleAxis", "singleAxis", "parallelAxis", "radar"];
  t && r.push("valueAxis", "categoryAxis", "logAxis", "timeAxis"), le(r, function(i) {
    le(Ne(e[i]), function(n) {
      n && (ft(n, "axisLabel"), ft(n.axisPointer, "label"));
    });
  }), le(Ne(e.parallel), function(i) {
    var n = i && i.parallelAxisDefault;
    ft(n, "axisLabel"), ft(n && n.axisPointer, "label");
  }), le(Ne(e.calendar), function(i) {
    It(i, "itemStyle"), ft(i, "dayLabel"), ft(i, "monthLabel"), ft(i, "yearLabel");
  }), le(Ne(e.radar), function(i) {
    ft(i, "name"), i.name && i.axisName == null && (i.axisName = i.name, delete i.name), i.nameGap != null && i.axisNameGap == null && (i.axisNameGap = i.nameGap, delete i.nameGap);
  }), le(Ne(e.geo), function(i) {
    En(i) && (ie(i), le(Ne(i.regions), function(n) {
      ie(n);
    }));
  }), le(Ne(e.timeline), function(i) {
    ie(i), It(i, "label"), It(i, "itemStyle"), It(i, "controlStyle", !0);
    var n = i.data;
    B(n) && D(n, function(a) {
      F(a) && (It(a, "label"), It(a, "itemStyle"));
    });
  }), le(Ne(e.toolbox), function(i) {
    It(i, "iconStyle"), le(i.feature, function(n) {
      It(n, "iconStyle");
    });
  }), ft(Mh(e.axisPointer), "label"), ft(Mh(e.tooltip).axisPointer, "label");
}
function KT(e, t) {
  for (var r = t.split(","), i = e, n = 0; n < r.length && (i = i && i[r[n]], i != null); n++)
    ;
  return i;
}
function jT(e, t, r, i) {
  for (var n = t.split(","), a = e, o, s = 0; s < n.length - 1; s++)
    o = n[s], a[o] == null && (a[o] = {}), a = a[o];
  a[n[s]] == null && (a[n[s]] = r);
}
function Ah(e) {
  e && D(QT, function(t) {
    t[0] in e && !(t[1] in e) && (e[t[1]] = e[t[0]]);
  });
}
var QT = [["x", "left"], ["y", "top"], ["x2", "right"], ["y2", "bottom"]], JT = ["grid", "geo", "parallel", "legend", "toolbox", "title", "visualMap", "dataZoom", "timeline"], As = [["borderRadius", "barBorderRadius"], ["borderColor", "barBorderColor"], ["borderWidth", "barBorderWidth"]];
function qi(e) {
  var t = e && e.itemStyle;
  if (t)
    for (var r = 0; r < As.length; r++) {
      var i = As[r][1], n = As[r][0];
      t[i] != null && (t[n] = t[i]);
    }
}
function Ph(e) {
  e && e.alignTo === "edge" && e.margin != null && e.edgeDistance == null && (e.edgeDistance = e.margin);
}
function Ih(e) {
  e && e.downplay && !e.blur && (e.blur = e.downplay);
}
function tC(e) {
  e && e.focusNodeAdjacency != null && (e.emphasis = e.emphasis || {}, e.emphasis.focus == null && (e.emphasis.focus = "adjacency"));
}
function Gd(e, t) {
  if (e)
    for (var r = 0; r < e.length; r++)
      t(e[r]), e[r] && Gd(e[r].children, t);
}
function Wd(e, t) {
  ZT(e, t), e.series = $t(e.series), D(e.series, function(r) {
    if (F(r)) {
      var i = r.type;
      if (i === "line")
        r.clipOverflow != null && (r.clip = r.clipOverflow);
      else if (i === "pie" || i === "gauge") {
        r.clockWise != null && (r.clockwise = r.clockWise), Ph(r.label);
        var n = r.data;
        if (n && !Gt(n))
          for (var a = 0; a < n.length; a++)
            Ph(n[a]);
        r.hoverOffset != null && (r.emphasis = r.emphasis || {}, (r.emphasis.scaleSize = null) && (r.emphasis.scaleSize = r.hoverOffset));
      } else if (i === "gauge") {
        var o = KT(r, "pointer.color");
        o != null && jT(r, "itemStyle.color", o);
      } else if (i === "bar") {
        qi(r), qi(r.backgroundStyle), qi(r.emphasis);
        var n = r.data;
        if (n && !Gt(n))
          for (var a = 0; a < n.length; a++)
            typeof n[a] == "object" && (qi(n[a]), qi(n[a] && n[a].emphasis));
      } else if (i === "sunburst") {
        var s = r.highlightPolicy;
        s && (r.emphasis = r.emphasis || {}, r.emphasis.focus || (r.emphasis.focus = s)), Ih(r), Gd(r.data, Ih);
      } else i === "graph" || i === "sankey" ? tC(r) : i === "map" && (r.mapType && !r.map && (r.map = r.mapType), r.mapLocation && ct(r, r.mapLocation));
      r.hoverAnimation != null && (r.emphasis = r.emphasis || {}, r.emphasis && r.emphasis.scale == null && (r.emphasis.scale = r.hoverAnimation)), Ah(r);
    }
  }), e.dataRange && (e.visualMap = e.dataRange), D(JT, function(r) {
    var i = e[r];
    i && (B(i) || (i = [i]), D(i, function(n) {
      Ah(n);
    }));
  });
}
function eC(e) {
  var t = tt();
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
      n.length && a.setCalculationInfo("stackedOnSeries", n[n.length - 1].seriesModel), n.push(o);
    }
  }), t.each(rC);
}
function rC(e) {
  D(e, function(t, r) {
    var i = [], n = [NaN, NaN], a = [t.stackResultDimension, t.stackedOverDimension], o = t.data, s = t.isStackedByIndex, l = t.seriesModel.get("stackStrategy") || "samesign";
    o.modify(a, function(u, c, h) {
      var v = o.get(t.stackedDimension, h);
      if (isNaN(v))
        return n;
      var f, d;
      s ? d = o.getRawIndex(h) : f = o.get(t.stackedByDimension, h);
      for (var _ = NaN, p = r - 1; p >= 0; p--) {
        var g = e[p];
        if (s || (d = g.data.rawIndexOf(g.stackedByDimension, f)), d >= 0) {
          var m = g.data.getByRawIndex(g.stackResultDimension, d);
          if (l === "all" || l === "positive" && m > 0 || l === "negative" && m < 0 || l === "samesign" && v >= 0 && m > 0 || l === "samesign" && v <= 0 && m < 0) {
            v = pb(v, m), _ = m;
            break;
          }
        }
      }
      return i[0] = v, i[1] = _, i;
    });
  });
}
var Ro = (
  /** @class */
  /* @__PURE__ */ (function() {
    function e(t) {
      this.data = t.data || (t.sourceFormat === Ee ? {} : []), this.sourceFormat = t.sourceFormat || Nd, this.seriesLayoutBy = t.seriesLayoutBy || He, this.startIndex = t.startIndex || 0, this.dimensionsDetectedCount = t.dimensionsDetectedCount, this.metaRawOption = t.metaRawOption;
      var r = this.dimensionsDefine = t.dimensionsDefine;
      if (r)
        for (var i = 0; i < r.length; i++) {
          var n = r[i];
          n.type == null && zd(this, i) === Tt.Must && (n.type = "ordinal");
        }
    }
    return e;
  })()
);
function Au(e) {
  return e instanceof Ro;
}
function Dl(e, t, r) {
  r = r || qd(e);
  var i = t.seriesLayoutBy, n = nC(e, r, i, t.sourceHeader, t.dimensions), a = new Ro({
    data: e,
    sourceFormat: r,
    seriesLayoutBy: i,
    dimensionsDefine: n.dimensionsDefine,
    startIndex: n.startIndex,
    dimensionsDetectedCount: n.dimensionsDetectedCount,
    metaRawOption: Q(t)
  });
  return a;
}
function Yd(e) {
  return new Ro({
    data: e,
    sourceFormat: Gt(e) ? cr : $e
  });
}
function iC(e) {
  return new Ro({
    data: e.data,
    sourceFormat: e.sourceFormat,
    seriesLayoutBy: e.seriesLayoutBy,
    dimensionsDefine: Q(e.dimensionsDefine),
    startIndex: e.startIndex,
    dimensionsDetectedCount: e.dimensionsDetectedCount
  });
}
function qd(e) {
  var t = Nd;
  if (Gt(e))
    t = cr;
  else if (B(e)) {
    e.length === 0 && (t = Wt);
    for (var r = 0, i = e.length; r < i; r++) {
      var n = e[r];
      if (n != null) {
        if (B(n) || Gt(n)) {
          t = Wt;
          break;
        } else if (F(n)) {
          t = me;
          break;
        }
      }
    }
  } else if (F(e)) {
    for (var a in e)
      if (Mi(e, a) && Vt(e[a])) {
        t = Ee;
        break;
      }
  }
  return t;
}
function nC(e, t, r, i, n) {
  var a, o;
  if (!e)
    return {
      dimensionsDefine: kh(n),
      startIndex: o,
      dimensionsDetectedCount: a
    };
  if (t === Wt) {
    var s = e;
    i === "auto" || i == null ? Lh(function(u) {
      u != null && u !== "-" && (U(u) ? o == null && (o = 1) : o = 0);
    }, r, s, 10) : o = mt(i) ? i : i ? 1 : 0, !n && o === 1 && (n = [], Lh(function(u, c) {
      n[c] = u != null ? u + "" : "";
    }, r, s, 1 / 0)), a = n ? n.length : r === Ri ? s.length : s[0] ? s[0].length : null;
  } else if (t === me)
    n || (n = aC(e));
  else if (t === Ee)
    n || (n = [], D(e, function(u, c) {
      n.push(c);
    }));
  else if (t === $e) {
    var l = Co(e[0]);
    a = B(l) && l.length || 1;
  }
  return {
    startIndex: o,
    dimensionsDefine: kh(n),
    dimensionsDetectedCount: a
  };
}
function aC(e) {
  for (var t = 0, r; t < e.length && !(r = e[t++]); )
    ;
  if (r)
    return pt(r);
}
function kh(e) {
  if (e) {
    var t = tt();
    return J(e, function(r, i) {
      r = F(r) ? r : {
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
function Lh(e, t, r, i) {
  if (t === Ri)
    for (var n = 0; n < r.length && n < i; n++)
      e(r[n] ? r[n][0] : null, n);
  else
    for (var a = r[0] || [], n = 0; n < a.length && n < i; n++)
      e(a[n], n);
}
function Xd(e) {
  var t = e.sourceFormat;
  return t === me || t === Ee;
}
var Rr, $r, Er, Rh, $h, Zd = (
  /** @class */
  (function() {
    function e(t, r) {
      var i = Au(t) ? t : Yd(t);
      this._source = i;
      var n = this._data = i.data;
      i.sourceFormat === cr && (this._offset = 0, this._dimSize = r, this._data = n), $h(this, n, i);
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
      $h = function(o, s, l) {
        var u = l.sourceFormat, c = l.seriesLayoutBy, h = l.startIndex, v = l.dimensionsDefine, f = Rh[Pu(u, c)];
        if (R(o, f), u === cr)
          o.getItem = r, o.count = n, o.fillStorage = i;
        else {
          var d = Kd(u, c);
          o.getItem = lt(d, null, s, h, v);
          var _ = jd(u, c);
          o.count = lt(_, null, s, h, v);
        }
      };
      var r = function(o, s) {
        o = o - this._offset, s = s || [];
        for (var l = this._data, u = this._dimSize, c = u * o, h = 0; h < u; h++)
          s[h] = l[c + h];
        return s;
      }, i = function(o, s, l, u) {
        for (var c = this._data, h = this._dimSize, v = 0; v < h; v++) {
          for (var f = u[v], d = f[0] == null ? 1 / 0 : f[0], _ = f[1] == null ? -1 / 0 : f[1], p = s - o, g = l[v], m = 0; m < p; m++) {
            var y = c[m * h + v];
            g[o + m] = y, y < d && (d = y), y > _ && (_ = y);
          }
          f[0] = d, f[1] = _;
        }
      }, n = function() {
        return this._data ? this._data.length / this._dimSize : 0;
      };
      Rh = (t = {}, t[Wt + "_" + He] = {
        pure: !0,
        appendData: a
      }, t[Wt + "_" + Ri] = {
        pure: !0,
        appendData: function() {
          throw new Error('Do not support appendData when set seriesLayoutBy: "row".');
        }
      }, t[me] = {
        pure: !0,
        appendData: a
      }, t[Ee] = {
        pure: !0,
        appendData: function(o) {
          var s = this._data;
          D(o, function(l, u) {
            for (var c = s[u] || (s[u] = []), h = 0; h < (l || []).length; h++)
              c.push(l[h]);
          });
        }
      }, t[$e] = {
        appendData: a
      }, t[cr] = {
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
), Eh = function(e, t, r, i) {
  return e[i];
}, oC = (Rr = {}, Rr[Wt + "_" + He] = function(e, t, r, i) {
  return e[i + t];
}, Rr[Wt + "_" + Ri] = function(e, t, r, i, n) {
  i += t;
  for (var a = n || [], o = e, s = 0; s < o.length; s++) {
    var l = o[s];
    a[s] = l ? l[i] : null;
  }
  return a;
}, Rr[me] = Eh, Rr[Ee] = function(e, t, r, i, n) {
  for (var a = n || [], o = 0; o < r.length; o++) {
    var s = r[o].name, l = e[s];
    a[o] = l ? l[i] : null;
  }
  return a;
}, Rr[$e] = Eh, Rr);
function Kd(e, t) {
  var r = oC[Pu(e, t)];
  return r;
}
var Oh = function(e, t, r) {
  return e.length;
}, sC = ($r = {}, $r[Wt + "_" + He] = function(e, t, r) {
  return Math.max(0, e.length - t);
}, $r[Wt + "_" + Ri] = function(e, t, r) {
  var i = e[0];
  return i ? Math.max(0, i.length - t) : 0;
}, $r[me] = Oh, $r[Ee] = function(e, t, r) {
  var i = r[0].name, n = e[i];
  return n ? n.length : 0;
}, $r[$e] = Oh, $r);
function jd(e, t) {
  var r = sC[Pu(e, t)];
  return r;
}
var Ps = function(e, t, r) {
  return e[t];
}, lC = (Er = {}, Er[Wt] = Ps, Er[me] = function(e, t, r) {
  return e[r];
}, Er[Ee] = Ps, Er[$e] = function(e, t, r) {
  var i = Co(e);
  return i instanceof Array ? i[t] : i;
}, Er[cr] = Ps, Er);
function Qd(e) {
  var t = lC[e];
  return t;
}
function Pu(e, t) {
  return e === Wt ? e + "_" + t : e;
}
function lo(e, t, r) {
  if (e) {
    var i = e.getRawDataItem(t);
    if (i != null) {
      var n = e.getStore(), a = n.getSource().sourceFormat;
      if (r != null) {
        var o = e.getDimensionIndex(r), s = n.getDimensionProperty(o);
        return Qd(a)(i, o, s);
      } else {
        var l = i;
        return a === $e && (l = Co(i)), l;
      }
    }
  }
}
var uC = /\{@(.+?)\}/g, cC = (
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
      if (o && (l.value = o.interpolatedValue), n != null && B(l.value) && (l.value = l.value[n]), !a) {
        var u = s.getItemModel(t);
        a = u.get(r === "normal" ? ["label", "formatter"] : [r, "label", "formatter"]);
      }
      if (rt(a))
        return l.status = r, l.dimensionIndex = n, a(l);
      if (U(a)) {
        var c = Ld(a, l);
        return c.replace(uC, function(h, v) {
          var f = v.length, d = v;
          d.charAt(0) === "[" && d.charAt(f - 1) === "]" && (d = +d.slice(1, f - 1));
          var _ = lo(s, t, d);
          if (o && B(o.interpolatedValue)) {
            var p = s.getDimensionIndex(d);
            p >= 0 && (_ = o.interpolatedValue[p]);
          }
          return _ != null ? _ + "" : "";
        });
      }
    }, e.prototype.getRawValue = function(t, r) {
      return lo(this.getData(r), t);
    }, e.prototype.formatTooltip = function(t, r, i) {
    }, e;
  })()
);
function Bh(e) {
  var t, r;
  return F(e) ? e.type && (r = e) : t = e, {
    text: t,
    // markers: markers || markersExisting,
    frag: r
  };
}
function bn(e) {
  return new hC(e);
}
var hC = (
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
      function c(m) {
        return !(m >= 1) && (m = 1), m;
      }
      var h;
      (this._dirty || a === "reset") && (this._dirty = !1, h = this._doReset(i)), this._modBy = l, this._modDataCount = u;
      var v = t && t.step;
      if (r ? this._dueEnd = r._outputDueEnd : this._dueEnd = this._count ? this._count(this.context) : 1 / 0, this._progress) {
        var f = this._dueIndex, d = Math.min(v != null ? this._dueIndex + v : 1 / 0, this._dueEnd);
        if (!i && (h || f < d)) {
          var _ = this._progress;
          if (B(_))
            for (var p = 0; p < _.length; p++)
              this._doProgress(_[p], f, d, l, u);
          else
            this._doProgress(_, f, d, l, u);
        }
        this._dueIndex = d;
        var g = this._settedOutputEnd != null ? this._settedOutputEnd : d;
        this._outputDueEnd = g;
      } else
        this._dueIndex = this._outputDueEnd = this._settedOutputEnd != null ? this._settedOutputEnd : this._dueEnd;
      return this.unfinished();
    }, e.prototype.dirty = function() {
      this._dirty = !0, this._onDirty && this._onDirty(this.context);
    }, e.prototype._doProgress = function(t, r, i, n, a) {
      Nh.reset(r, i, n, a), this._callingProgress = t, this._callingProgress({
        start: r,
        end: i,
        count: i - r,
        next: Nh.next
      }, this.context);
    }, e.prototype._doReset = function(t) {
      this._dueIndex = this._outputDueEnd = this._dueEnd = 0, this._settedOutputEnd = null;
      var r, i;
      !t && this._reset && (r = this._reset(this.context), r && r.progress && (i = r.forceFirstProgress, r = r.progress), B(r) && !r.length && (r = null)), this._progress = r, this._modBy = this._modDataCount = null;
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
), Nh = /* @__PURE__ */ (function() {
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
function za(e, t) {
  var r = t && t.type;
  return r === "ordinal" ? e : (r === "time" && !mt(e) && e != null && e !== "-" && (e = +To(e)), e == null || e === "" ? NaN : Number(e));
}
tt({
  number: function(e) {
    return parseFloat(e);
  },
  time: function(e) {
    return +To(e);
  },
  trim: function(e) {
    return U(e) ? Me(e) : e;
  }
});
var fC = (
  /** @class */
  (function() {
    function e(t, r) {
      var i = t === "desc";
      this._resultLT = i ? 1 : -1, r == null && (r = i ? "min" : "max"), this._incomparable = r === "min" ? -1 / 0 : 1 / 0;
    }
    return e.prototype.evaluate = function(t, r) {
      var i = mt(t) ? t : Ja(t), n = mt(r) ? r : Ja(r), a = isNaN(i), o = isNaN(n);
      if (a && (i = this._incomparable), o && (n = this._incomparable), a && o) {
        var s = U(t), l = U(r);
        s && (i = l ? t : 0), l && (n = s ? r : 0);
      }
      return i < n ? this._resultLT : i > n ? -this._resultLT : 0;
    }, e;
  })()
), vC = (
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
      return za(t, r);
    }, e;
  })()
);
function dC(e, t) {
  var r = new vC(), i = e.data, n = r.sourceFormat = e.sourceFormat, a = e.startIndex, o = "";
  e.seriesLayoutBy !== He && zt(o);
  var s = [], l = {}, u = e.dimensionsDefine;
  if (u)
    D(u, function(_, p) {
      var g = _.name, m = {
        index: p,
        name: g,
        displayName: _.displayName
      };
      if (s.push(m), g != null) {
        var y = "";
        Mi(l, g) && zt(y), l[g] = m;
      }
    });
  else
    for (var c = 0; c < e.dimensionsDetectedCount; c++)
      s.push({
        index: c
      });
  var h = Kd(n, He);
  t.__isBuiltIn && (r.getRawDataItem = function(_) {
    return h(i, a, s, _);
  }, r.getRawData = lt(pC, null, e)), r.cloneRawData = lt(gC, null, e);
  var v = jd(n, He);
  r.count = lt(v, null, i, a, s);
  var f = Qd(n);
  r.retrieveValue = function(_, p) {
    var g = h(i, a, s, _);
    return d(g, p);
  };
  var d = r.retrieveValueFromItem = function(_, p) {
    if (_ != null) {
      var g = s[p];
      if (g)
        return f(_, p, g.name);
    }
  };
  return r.getDimensionInfo = lt(_C, null, s, l), r.cloneAllDimensionInfo = lt(mC, null, s), r;
}
function pC(e) {
  var t = e.sourceFormat;
  if (!Iu(t)) {
    var r = "";
    zt(r);
  }
  return e.data;
}
function gC(e) {
  var t = e.sourceFormat, r = e.data;
  if (!Iu(t)) {
    var i = "";
    zt(i);
  }
  if (t === Wt) {
    for (var n = [], a = 0, o = r.length; a < o; a++)
      n.push(r[a].slice());
    return n;
  } else if (t === me) {
    for (var n = [], a = 0, o = r.length; a < o; a++)
      n.push(R({}, r[a]));
    return n;
  }
}
function _C(e, t, r) {
  if (r != null) {
    if (mt(r) || !isNaN(r) && !Mi(t, r))
      return e[r];
    if (Mi(t, r))
      return t[r];
  }
}
function mC(e) {
  return Q(e);
}
var Jd = tt();
function yC(e) {
  e = Q(e);
  var t = e.type, r = "";
  t || zt(r);
  var i = t.split(":");
  i.length !== 2 && zt(r);
  var n = !1;
  i[0] === "echarts" && (t = i[1], n = !0), e.__isBuiltIn = n, Jd.set(t, e);
}
function wC(e, t, r) {
  var i = $t(e), n = i.length, a = "";
  n || zt(a);
  for (var o = 0, s = n; o < s; o++) {
    var l = i[o];
    t = bC(l, t), o !== s - 1 && (t.length = Math.max(t.length, 1));
  }
  return t;
}
function bC(e, t, r, i) {
  var n = "";
  t.length || zt(n), F(e) || zt(n);
  var a = e.type, o = Jd.get(a);
  o || zt(n);
  var s = J(t, function(u) {
    return dC(u, o);
  }), l = $t(o.transform({
    upstream: s[0],
    upstreamList: s,
    config: Q(e.config)
  }));
  return J(l, function(u, c) {
    var h = "";
    F(u) || zt(h), u.data || zt(h);
    var v = qd(u.data);
    Iu(v) || zt(h);
    var f, d = t[0];
    if (d && c === 0 && !u.dimensions) {
      var _ = d.startIndex;
      _ && (u.data = d.data.slice(0, _).concat(u.data)), f = {
        seriesLayoutBy: He,
        sourceHeader: _,
        dimensions: d.metaRawOption.dimensions
      };
    } else
      f = {
        seriesLayoutBy: He,
        sourceHeader: 0,
        dimensions: u.dimensions
      };
    return Dl(u.data, f, null);
  });
}
function Iu(e) {
  return e === Wt || e === me;
}
var $o = "undefined", SC = typeof Uint32Array === $o ? Array : Uint32Array, xC = typeof Uint16Array === $o ? Array : Uint16Array, tp = typeof Int32Array === $o ? Array : Int32Array, Fh = typeof Float64Array === $o ? Array : Float64Array, ep = {
  float: Fh,
  int: tp,
  // Ordinal data type can be string or int
  ordinal: Array,
  number: Array,
  time: Fh
}, Is;
function oi(e) {
  return e > 65535 ? SC : xC;
}
function si() {
  return [1 / 0, -1 / 0];
}
function TC(e) {
  var t = e.constructor;
  return t === Array ? e.slice() : new t(e);
}
function zh(e, t, r, i, n) {
  var a = ep[r || "float"];
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
var Ml = (
  /** @class */
  (function() {
    function e() {
      this._chunks = [], this._rawExtent = [], this._extent = [], this._count = 0, this._rawCount = 0, this._calcDimNameToIdx = tt();
    }
    return e.prototype.initData = function(t, r, i) {
      this._provider = t, this._chunks = [], this._indices = null, this.getRawIndex = this._getRawIdxIdentity;
      var n = t.getSource(), a = this.defaultDimValueGetter = Is[n.sourceFormat];
      this._dimValueGetter = i || a, this._rawExtent = [], Xd(n), this._dimensions = J(r, function(o) {
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
      }, i.set(t, a), this._chunks[a] = new ep[r || "float"](this._rawCount), this._rawExtent[a] = si(), a;
    }, e.prototype.collectOrdinalMeta = function(t, r) {
      var i = this._chunks[t], n = this._dimensions[t], a = this._rawExtent, o = n.ordinalOffset || 0, s = i.length;
      o === 0 && (a[t] = si());
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
        zh(i, u, c.type, l, !0);
      }
      for (var h = [], v = s; v < l; v++)
        for (var f = v - s, d = 0; d < a; d++) {
          var c = n[d], _ = Is.arrayRows.call(this, t[f] || h, c.property, f, d);
          i[d][v] = _;
          var p = o[d];
          _ < p[0] && (p[0] = _), _ > p[1] && (p[1] = _);
        }
      return this._rawCount = this._count = l, {
        start: s,
        end: l
      };
    }, e.prototype._initDataFromProvider = function(t, r, i) {
      for (var n = this._provider, a = this._chunks, o = this._dimensions, s = o.length, l = this._rawExtent, u = J(o, function(m) {
        return m.property;
      }), c = 0; c < s; c++) {
        var h = o[c];
        l[c] || (l[c] = si()), zh(a, c, h.type, r, i);
      }
      if (n.fillStorage)
        n.fillStorage(t, r, a, l);
      else
        for (var v = [], f = t; f < r; f++) {
          v = n.getItem(f, v);
          for (var d = 0; d < s; d++) {
            var _ = a[d], p = this._dimValueGetter(v, u[d], f, d);
            _[f] = p;
            var g = l[d];
            p < g[0] && (g[0] = p), p > g[1] && (g[1] = p);
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
      this.each([t], function(a) {
        isNaN(a) || r.push(a);
      });
      var i = r.sort(function(a, o) {
        return a - o;
      }), n = this.count();
      return n === 0 ? 0 : n % 2 === 1 ? i[(n - 1) / 2] : (i[n / 2] + i[n / 2 - 1]) / 2;
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
    }, e.prototype.indicesOfNearest = function(t, r, i) {
      var n = this._chunks, a = n[t], o = [];
      if (!a)
        return o;
      i == null && (i = 1 / 0);
      for (var s = 1 / 0, l = -1, u = 0, c = 0, h = this.count(); c < h; c++) {
        var v = this.getRawIndex(c), f = r - a[v], d = Math.abs(f);
        d <= i && ((d < s || d === s && f >= 0 && l < 0) && (s = d, l = f, u = 0), f === l && (o[u++] = c));
      }
      return o.length = u, o;
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
        var i = oi(this._rawCount);
        t = new i(this.count());
        for (var a = 0; a < t.length; a++)
          t[a] = a;
      }
      return t;
    }, e.prototype.filter = function(t, r) {
      if (!this._count)
        return this;
      for (var i = this.clone(), n = i.count(), a = oi(i._rawCount), o = new a(n), s = [], l = t.length, u = 0, c = t[0], h = i._chunks, v = 0; v < n; v++) {
        var f = void 0, d = i.getRawIndex(v);
        if (l === 0)
          f = r(v);
        else if (l === 1) {
          var _ = h[c][d];
          f = r(_, v);
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
      var n = pt(t), a = n.length;
      if (!a)
        return this;
      var o = r.count(), s = oi(r._rawCount), l = new s(o), u = 0, c = n[0], h = t[c][0], v = t[c][1], f = r._chunks, d = !1;
      if (!r._indices) {
        var _ = 0;
        if (a === 1) {
          for (var p = f[n[0]], g = 0; g < i; g++) {
            var m = p[g];
            (m >= h && m <= v || isNaN(m)) && (l[u++] = _), _++;
          }
          d = !0;
        } else if (a === 2) {
          for (var p = f[n[0]], y = f[n[1]], w = t[n[1]][0], S = t[n[1]][1], g = 0; g < i; g++) {
            var m = p[g], b = y[g];
            (m >= h && m <= v || isNaN(m)) && (b >= w && b <= S || isNaN(b)) && (l[u++] = _), _++;
          }
          d = !0;
        }
      }
      if (!d)
        if (a === 1)
          for (var g = 0; g < o; g++) {
            var x = r.getRawIndex(g), m = f[n[0]][x];
            (m >= h && m <= v || isNaN(m)) && (l[u++] = x);
          }
        else
          for (var g = 0; g < o; g++) {
            for (var T = !0, x = r.getRawIndex(g), C = 0; C < a; C++) {
              var M = n[C], m = f[M][x];
              (m < t[M][0] || m > t[M][1]) && (T = !1);
            }
            T && (l[u++] = r.getRawIndex(g));
          }
      return u < o && (r._indices = l), r._count = u, r._extent = [], r._updateGetRawIdx(), r;
    }, e.prototype.map = function(t, r) {
      var i = this.clone(t);
      return this._updateDims(i, t, r), i;
    }, e.prototype.modify = function(t, r) {
      this._updateDims(this, t, r);
    }, e.prototype._updateDims = function(t, r, i) {
      for (var n = t._chunks, a = [], o = r.length, s = t.count(), l = [], u = t._rawExtent, c = 0; c < r.length; c++)
        u[r[c]] = si();
      for (var h = 0; h < s; h++) {
        for (var v = t.getRawIndex(h), f = 0; f < o; f++)
          l[f] = n[r[f]][v];
        l[o] = h;
        var d = i && i.apply(null, l);
        if (d != null) {
          typeof d != "object" && (a[0] = d, d = a);
          for (var c = 0; c < d.length; c++) {
            var _ = r[c], p = d[c], g = u[_], m = n[_];
            m && (m[v] = p), p < g[0] && (g[0] = p), p > g[1] && (g[1] = p);
          }
        }
      }
    }, e.prototype.lttbDownSample = function(t, r) {
      var i = this.clone([t], !0), n = i._chunks, a = n[t], o = this.count(), s = 0, l = Math.floor(1 / r), u = this.getRawIndex(0), c, h, v, f = new (oi(this._rawCount))(Math.min((Math.ceil(o / l) + 2) * 2, o));
      f[s++] = u;
      for (var d = 1; d < o - 1; d += l) {
        for (var _ = Math.min(d + l, o - 1), p = Math.min(d + l * 2, o), g = (p + _) / 2, m = 0, y = _; y < p; y++) {
          var w = this.getRawIndex(y), S = a[w];
          isNaN(S) || (m += S);
        }
        m /= p - _;
        var b = d, x = Math.min(d + l, o), T = d - 1, C = a[u];
        c = -1, v = b;
        for (var M = -1, A = 0, y = b; y < x; y++) {
          var w = this.getRawIndex(y), S = a[w];
          if (isNaN(S)) {
            A++, M < 0 && (M = w);
            continue;
          }
          h = Math.abs((T - g) * (S - C) - (T - y) * (m - C)), h > c && (c = h, v = w);
        }
        A > 0 && A < x - b && (f[s++] = Math.min(M, v), v = Math.max(M, v)), f[s++] = v, u = v;
      }
      return f[s++] = this.getRawIndex(o - 1), i._count = s, i._indices = f, i.getRawIndex = this._getRawIdx, i;
    }, e.prototype.minmaxDownSample = function(t, r) {
      for (var i = this.clone([t], !0), n = i._chunks, a = Math.floor(1 / r), o = n[t], s = this.count(), l = new (oi(this._rawCount))(Math.ceil(s / a) * 2), u = 0, c = 0; c < s; c += a) {
        var h = c, v = o[this.getRawIndex(h)], f = c, d = o[this.getRawIndex(f)], _ = a;
        c + a > s && (_ = s - c);
        for (var p = 0; p < _; p++) {
          var g = this.getRawIndex(c + p), m = o[g];
          m < v && (v = m, h = c + p), m > d && (d = m, f = c + p);
        }
        var y = this.getRawIndex(h), w = this.getRawIndex(f);
        h < f ? (l[u++] = y, l[u++] = w) : (l[u++] = w, l[u++] = y);
      }
      return i._count = u, i._indices = l, i._updateGetRawIdx(), i;
    }, e.prototype.downSample = function(t, r, i, n) {
      for (var a = this.clone([t], !0), o = a._chunks, s = [], l = Math.floor(1 / r), u = o[t], c = this.count(), h = a._rawExtent[t] = si(), v = new (oi(this._rawCount))(Math.ceil(c / l)), f = 0, d = 0; d < c; d += l) {
        l > c - d && (l = c - d, s.length = l);
        for (var _ = 0; _ < l; _++) {
          var p = this.getRawIndex(d + _);
          s[_] = u[p];
        }
        var g = i(s), m = this.getRawIndex(Math.min(d + n(s, g) || 0, c - 1));
        u[m] = g, g < h[0] && (h[0] = g), g > h[1] && (h[1] = g), v[f++] = m;
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
    }, e.prototype.getDataExtent = function(t) {
      var r = this._chunks[t], i = si();
      if (!r)
        return i;
      var n = this.count(), a = !this._indices, o;
      if (a)
        return this._rawExtent[t].slice();
      if (o = this._extent[t], o)
        return o.slice();
      o = i;
      for (var s = o[0], l = o[1], u = 0; u < n; u++) {
        var c = this.getRawIndex(u), h = r[c];
        h < s && (s = h), h > l && (l = h);
      }
      return o = [s, l], this._extent[t] = o, o;
    }, e.prototype.getRawDataItem = function(t) {
      var r = this.getRawIndex(t);
      if (this._provider.persistent)
        return this._provider.getItem(r);
      for (var i = [], n = this._chunks, a = 0; a < n.length; a++)
        i.push(n[a][r]);
      return i;
    }, e.prototype.clone = function(t, r) {
      var i = new e(), n = this._chunks, a = t && fr(t, function(s, l) {
        return s[l] = !0, s;
      }, {});
      if (a)
        for (var o = 0; o < n.length; o++)
          i._chunks[o] = a[o] ? TC(n[o]) : n[o];
      else
        i._chunks = n;
      return this._copyCommonProps(i), r || (i._indices = this._cloneIndices()), i._updateGetRawIdx(), i;
    }, e.prototype._copyCommonProps = function(t) {
      t._count = this._count, t._rawCount = this._rawCount, t._provider = this._provider, t._dimensions = this._dimensions, t._extent = Q(this._extent), t._rawExtent = Q(this._rawExtent);
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
        return za(r[a], this._dimensions[a]);
      }
      Is = {
        arrayRows: t,
        objectRows: function(r, i, n, a) {
          return za(r[i], this._dimensions[a]);
        },
        keyedColumns: t,
        original: function(r, i, n, a) {
          var o = r && (r.value == null ? r : r.value);
          return za(o instanceof Array ? o[a] : o, this._dimensions[a]);
        },
        typedArray: function(r, i, n, a) {
          return r[a];
        }
      };
    })(), e;
  })()
), CC = (
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
      if (ga(t)) {
        var o = t, s = void 0, l = void 0, u = void 0;
        if (i) {
          var c = r[0];
          c.prepareSource(), u = c.getSource(), s = u.data, l = u.sourceFormat, a = [c._getVersionSign()];
        } else
          s = o.get("data", !0), l = Gt(s) ? cr : $e, a = [];
        var h = this._getSourceMetaRawOption() || {}, v = u && u.metaRawOption || {}, f = K(h.seriesLayoutBy, v.seriesLayoutBy) || null, d = K(h.sourceHeader, v.sourceHeader), _ = K(h.dimensions, v.dimensions), p = f !== v.seriesLayoutBy || !!d != !!v.sourceHeader || _;
        n = p ? [Dl(s, {
          seriesLayoutBy: f,
          sourceHeader: d,
          dimensions: _
        }, l)] : [];
      } else {
        var g = t;
        if (i) {
          var m = this._applyTransform(r);
          n = m.sourceList, a = m.upstreamSignList;
        } else {
          var y = g.get("source", !0);
          n = [Dl(y, this._getSourceMetaRawOption(), null)], a = [];
        }
      }
      this._setLocalSource(n, a);
    }, e.prototype._applyTransform = function(t) {
      var r = this._sourceHost, i = r.get("transform", !0), n = r.get("fromTransformResult", !0);
      if (n != null) {
        var a = "";
        t.length !== 1 && Hh(a);
      }
      var o, s = [], l = [];
      return D(t, function(u) {
        u.prepareSource();
        var c = u.getSource(n || 0), h = "";
        n != null && !c && Hh(h), s.push(c), l.push(u._getVersionSign());
      }), i ? o = wC(i, s, {
        datasetIndex: r.componentIndex
      }) : n != null && (o = [iC(s[0])]), {
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
        ga(this._sourceHost) && l ? s = l._innerGetDataStore(t, r, i) : (s = new Ml(), s.initData(new Zd(r, t.length), t)), o[i] = s;
      }
      return s;
    }, e.prototype._getUpstreamSourceManagers = function() {
      var t = this._sourceHost;
      if (ga(t)) {
        var r = Fd(t);
        return r ? [r.getSourceManager()] : [];
      } else
        return J(LT(t), function(i) {
          return i.getSourceManager();
        });
    }, e.prototype._getSourceMetaRawOption = function() {
      var t = this._sourceHost, r, i, n;
      if (ga(t))
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
function ga(e) {
  return e.mainType === "series";
}
function Hh(e) {
  throw new Error(e);
}
var DC = "line-height:1";
function rp(e) {
  var t = e.lineHeight;
  return t == null ? DC : "line-height:" + Nt(t + "") + "px";
}
function ip(e, t) {
  var r = e.color || "#6e7079", i = e.fontSize || 12, n = e.fontWeight || "400", a = e.color || "#464646", o = e.fontSize || 14, s = e.fontWeight || "900";
  return t === "html" ? {
    // eslint-disable-next-line max-len
    nameStyle: "font-size:" + Nt(i + "") + "px;color:" + Nt(r) + ";font-weight:" + Nt(n + ""),
    // eslint-disable-next-line max-len
    valueStyle: "font-size:" + Nt(o + "") + "px;color:" + Nt(a) + ";font-weight:" + Nt(s + "")
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
var MC = [0, 10, 20, 30], AC = ["", `
`, `

`, `


`];
function On(e, t) {
  return t.type = e, t;
}
function Al(e) {
  return e.type === "section";
}
function np(e) {
  return Al(e) ? PC : IC;
}
function ap(e) {
  if (Al(e)) {
    var t = 0, r = e.blocks.length, i = r > 1 || r > 0 && !e.noHeader;
    return D(e.blocks, function(n) {
      var a = ap(n);
      a >= t && (t = a + +(i && // 0 always can not be readable gap level.
      (!a || Al(n) && !n.noHeader)));
    }), t;
  }
  return 0;
}
function PC(e, t, r, i) {
  var n = t.noHeader, a = kC(ap(t)), o = [], s = t.blocks || [];
  Ue(!s || B(s)), s = s || [];
  var l = e.orderMode;
  if (t.sortBlocks && l) {
    s = s.slice();
    var u = {
      valueAsc: "asc",
      valueDesc: "desc"
    };
    if (Mi(u, l)) {
      var c = new fC(u[l], null);
      s.sort(function(_, p) {
        return c.evaluate(_.sortParam, p.sortParam);
      });
    } else l === "seriesDesc" && s.reverse();
  }
  D(s, function(_, p) {
    var g = t.valueFormatter, m = np(_)(
      // Inherit valueFormatter
      g ? R(R({}, e), {
        valueFormatter: g
      }) : e,
      _,
      p > 0 ? a.html : 0,
      i
    );
    m != null && o.push(m);
  });
  var h = e.renderMode === "richText" ? o.join(a.richText) : Pl(i, o.join(""), n ? r : a.html);
  if (n)
    return h;
  var v = Cl(t.header, "ordinal", e.useUTC), f = ip(i, e.renderMode).nameStyle, d = rp(i);
  return e.renderMode === "richText" ? op(e, v, f) + a.richText + h : Pl(i, '<div style="' + f + ";" + d + ';">' + Nt(v) + "</div>" + h, r);
}
function IC(e, t, r, i) {
  var n = e.renderMode, a = t.noName, o = t.noValue, s = !t.markerType, l = t.name, u = e.useUTC, c = t.valueFormatter || e.valueFormatter || function(w) {
    return w = B(w) ? w : [w], J(w, function(S, b) {
      return Cl(S, B(f) ? f[b] : f, u);
    });
  };
  if (!(a && o)) {
    var h = s ? "" : e.markupStyleCreator.makeTooltipMarker(t.markerType, t.markerColor || "#333", n), v = a ? "" : Cl(l, "ordinal", u), f = t.valueType, d = o ? [] : c(t.value, t.dataIndex), _ = !s || !a, p = !s && a, g = ip(i, n), m = g.nameStyle, y = g.valueStyle;
    return n === "richText" ? (s ? "" : h) + (a ? "" : op(e, v, m)) + (o ? "" : $C(e, d, _, p, y)) : Pl(i, (s ? "" : h) + (a ? "" : LC(v, !s, m)) + (o ? "" : RC(d, _, p, y)), r);
  }
}
function Uh(e, t, r, i, n, a) {
  if (e) {
    var o = np(e), s = {
      useUTC: n,
      renderMode: r,
      orderMode: i,
      markupStyleCreator: t,
      valueFormatter: e.valueFormatter
    };
    return o(s, e, 0, a);
  }
}
function kC(e) {
  return {
    html: MC[e],
    richText: AC[e]
  };
}
function Pl(e, t, r) {
  var i = '<div style="clear:both"></div>', n = "margin: " + r + "px 0 0", a = rp(e);
  return '<div style="' + n + ";" + a + ';">' + t + i + "</div>";
}
function LC(e, t, r) {
  var i = t ? "margin-left:2px" : "";
  return '<span style="' + r + ";" + i + '">' + Nt(e) + "</span>";
}
function RC(e, t, r, i) {
  var n = r ? "10px" : "20px", a = t ? "float:right;margin-left:" + n : "";
  return e = B(e) ? e : [e], '<span style="' + a + ";" + i + '">' + J(e, function(o) {
    return Nt(o);
  }).join("&nbsp;&nbsp;") + "</span>";
}
function op(e, t, r) {
  return e.markupStyleCreator.wrapRichTextStyle(t, r);
}
function $C(e, t, r, i, n) {
  var a = [n], o = i ? 10 : 20;
  return r && a.push({
    padding: [0, 0, 0, o],
    align: "right"
  }), e.markupStyleCreator.wrapRichTextStyle(B(t) ? t.join("  ") : t, a);
}
function EC(e, t) {
  var r = e.getData().getItemVisual(t, "style"), i = r[e.visualDrawType];
  return $n(i);
}
function sp(e, t) {
  var r = e.get("padding");
  return r ?? (t === "richText" ? [8, 10] : 10);
}
var ks = (
  /** @class */
  (function() {
    function e() {
      this.richTextStyles = {}, this._nextStyleNameId = Nv();
    }
    return e.prototype._generateStyleName = function() {
      return "__EC_aUTo_" + this._nextStyleNameId++;
    }, e.prototype.makeTooltipMarker = function(t, r, i) {
      var n = i === "richText" ? this._generateStyleName() : null, a = xT({
        color: r,
        type: t,
        renderMode: i,
        markerId: n
      });
      return U(a) ? a : (this.richTextStyles[n] = a.style, a.content);
    }, e.prototype.wrapRichTextStyle = function(t, r) {
      var i = {};
      B(r) ? D(r, function(a) {
        return R(i, a);
      }) : R(i, r);
      var n = this._generateStyleName();
      return this.richTextStyles[n] = i, "{" + n + "|" + t + "}";
    }, e;
  })()
);
function OC(e) {
  var t = e.series, r = e.dataIndex, i = e.multipleSeries, n = t.getData(), a = n.mapDimensionsAll("defaultedTooltip"), o = a.length, s = t.getRawValue(r), l = B(s), u = EC(t, r), c, h, v, f;
  if (o > 1 || l && !o) {
    var d = BC(s, t, r, a, u);
    c = d.inlineValues, h = d.inlineValueTypes, v = d.blocks, f = d.inlineValues[0];
  } else if (o) {
    var _ = n.getDimensionInfo(a[0]);
    f = c = lo(n, r, a[0]), h = _.type;
  } else
    f = c = l ? s[0] : s;
  var p = Uv(t), g = p && t.name || "", m = n.getName(r), y = i ? g : m;
  return On("section", {
    header: g,
    // When series name is not specified, do not show a header line with only '-'.
    // This case always happens in tooltip.trigger: 'item'.
    noHeader: i || !p,
    sortParam: f,
    blocks: [On("nameValue", {
      markerType: "item",
      markerColor: u,
      // Do not mix display seriesName and itemName in one tooltip,
      // which might confuses users.
      name: y,
      // name dimension might be auto assigned, where the name might
      // be not readable. So we check trim here.
      noName: !Me(y),
      value: c,
      valueType: h,
      dataIndex: r
    })].concat(v || [])
  });
}
function BC(e, t, r, i, n) {
  var a = t.getData(), o = fr(e, function(h, v, f) {
    var d = a.getDimensionInfo(f);
    return h = h || d && d.tooltip !== !1 && d.displayName != null;
  }, !1), s = [], l = [], u = [];
  i.length ? D(i, function(h) {
    c(lo(a, r, h), h);
  }) : D(e, c);
  function c(h, v) {
    var f = a.getDimensionInfo(v);
    !f || f.otherDims.tooltip === !1 || (o ? u.push(On("nameValue", {
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
var Je = wt();
function _a(e, t) {
  return e.getName(t) || e.getId(t);
}
var NC = "__universalTransitionEnabled", vr = (
  /** @class */
  (function(e) {
    G(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r._selectedDataIndicesMap = {}, r;
    }
    return t.prototype.init = function(r, i, n) {
      this.seriesIndex = this.componentIndex, this.dataTask = bn({
        count: zC,
        reset: HC
      }), this.dataTask.context = {
        model: this
      }, this.mergeDefaultAndTheme(r, n);
      var a = Je(this).sourceManager = new CC(this);
      a.prepareSource();
      var o = this.getInitialData(r, n);
      Gh(o, this), this.dataTask.context.data = o, Je(this).dataBeforeProcessed = o, Vh(this), this._initSelectedMapFromData(o);
    }, t.prototype.mergeDefaultAndTheme = function(r, i) {
      var n = oo(this), a = n ? Ed(r) : {}, o = this.subType;
      at.hasClass(o) && (o += "Series"), _t(r, i.getTheme().get(this.subType)), _t(r, this.getDefaultOption()), vl(r, "label", ["show"]), this.fillDataTextStyle(r.data), n && so(r, a, n);
    }, t.prototype.mergeOption = function(r, i) {
      r = _t(this.option, r, !0), this.fillDataTextStyle(r.data);
      var n = oo(this);
      n && so(this.option, r, n);
      var a = Je(this).sourceManager;
      a.dirty(), a.prepareSource();
      var o = this.getInitialData(r, i);
      Gh(o, this), this.dataTask.dirty(), this.dataTask.context.data = o, Je(this).dataBeforeProcessed = o, Vh(this), this._initSelectedMapFromData(o);
    }, t.prototype.fillDataTextStyle = function(r) {
      if (r && !Gt(r))
        for (var i = ["show"], n = 0; n < r.length; n++)
          r[n] && r[n].label && vl(r[n], "label", i);
    }, t.prototype.getInitialData = function(r, i) {
    }, t.prototype.appendData = function(r) {
      var i = this.getRawData();
      i.appendData(r.data);
    }, t.prototype.getData = function(r) {
      var i = Il(this);
      if (i) {
        var n = i.context.data;
        return r == null || !n.getLinkedData ? n : n.getLinkedData(r);
      } else
        return Je(this).data;
    }, t.prototype.getAllData = function() {
      var r = this.getData();
      return r && r.getLinkedDataAll ? r.getLinkedDataAll() : [{
        data: r
      }];
    }, t.prototype.setData = function(r) {
      var i = Il(this);
      if (i) {
        var n = i.context;
        n.outputData = r, i !== this.dataTask && (n.data = r);
      }
      Je(this).data = r;
    }, t.prototype.getEncode = function() {
      var r = this.get("encode", !0);
      if (r)
        return tt(r);
    }, t.prototype.getSourceManager = function() {
      return Je(this).sourceManager;
    }, t.prototype.getSource = function() {
      return this.getSourceManager().getSource();
    }, t.prototype.getRawData = function() {
      return Je(this).dataBeforeProcessed;
    }, t.prototype.getColorBy = function() {
      var r = this.get("colorBy");
      return r || "series";
    }, t.prototype.isColorBySeries = function() {
      return this.getColorBy() === "series";
    }, t.prototype.getBaseAxis = function() {
      var r = this.coordinateSystem;
      return r && r.getBaseAxis && r.getBaseAxis();
    }, t.prototype.formatTooltip = function(r, i, n) {
      return OC({
        series: this,
        dataIndex: r,
        multipleSeries: i
      });
    }, t.prototype.isAnimationEnabled = function() {
      var r = this.ecModel;
      if (H.node && !(r && r.ssr))
        return !1;
      var i = this.getShallow("animation");
      return i && this.getData().count() > this.getShallow("animationThreshold") && (i = !1), !!i;
    }, t.prototype.restoreData = function() {
      this.dataTask.dirty();
    }, t.prototype.getColorFromPalette = function(r, i, n) {
      var a = this.ecModel, o = Du.prototype.getColorFromPalette.call(this, r, i, n);
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
          var l = r[s], u = _a(o, l);
          n[u] = !1, this._selectedDataIndicesMap[u] = -1;
        }
      }
    }, t.prototype.toggleSelect = function(r, i) {
      for (var n = [], a = 0; a < r.length; a++)
        n[0] = r[a], this.isSelected(r[a], i) ? this.unselect(n, i) : this.select(n, i);
    }, t.prototype.getSelectedDataIndices = function() {
      if (this.option.selectedMap === "all")
        return [].slice.call(this.getData().getIndices());
      for (var r = this._selectedDataIndicesMap, i = pt(r), n = [], a = 0; a < i.length; a++) {
        var o = r[i[a]];
        o >= 0 && n.push(o);
      }
      return n;
    }, t.prototype.isSelected = function(r, i) {
      var n = this.option.selectedMap;
      if (!n)
        return !1;
      var a = this.getData(i);
      return (n === "all" || n[_a(a, r)]) && !a.getItemModel(r).get(["select", "disabled"]);
    }, t.prototype.isUniversalTransitionEnabled = function() {
      if (this[NC])
        return !0;
      var r = this.option.universalTransition;
      return r ? r === !0 ? !0 : r && r.enabled : !1;
    }, t.prototype._innerSelect = function(r, i) {
      var n, a, o = this.option, s = o.selectedMode, l = i.length;
      if (!(!s || !l)) {
        if (s === "series")
          o.selectedMap = "all";
        else if (s === "multiple") {
          F(o.selectedMap) || (o.selectedMap = {});
          for (var u = o.selectedMap, c = 0; c < l; c++) {
            var h = i[c], v = _a(r, h);
            u[v] = !0, this._selectedDataIndicesMap[v] = r.getRawIndex(h);
          }
        } else if (s === "single" || s === !0) {
          var f = i[l - 1], v = _a(r, f);
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
      return at.registerClass(r);
    }, t.protoInitialize = (function() {
      var r = t.prototype;
      r.type = "series.__base__", r.seriesIndex = 0, r.ignoreStyleOnData = !1, r.hasSymbolVisual = !1, r.defaultSymbol = "circle", r.visualStyleAccessPath = "itemStyle", r.visualDrawType = "fill";
    })(), t;
  })(at)
);
Ye(vr, cC);
Ye(vr, Du);
Wv(vr, at);
function Vh(e) {
  var t = e.name;
  Uv(e) || (e.name = FC(e) || t);
}
function FC(e) {
  var t = e.getRawData(), r = t.mapDimensionsAll("seriesName"), i = [];
  return D(r, function(n) {
    var a = t.getDimensionInfo(n);
    a.displayName && i.push(a.displayName);
  }), i.join(" ");
}
function zC(e) {
  return e.model.getRawData().count();
}
function HC(e) {
  var t = e.model;
  return t.setData(t.getRawData().cloneShallow()), UC;
}
function UC(e, t) {
  t.outputData && e.end > t.outputData.count() && t.model.getRawData().cloneShallow(t.outputData);
}
function Gh(e, t) {
  D(Kw(e.CHANGABLE_METHODS, e.DOWNSAMPLE_METHODS), function(r) {
    e.wrapMethod(r, Zt(VC, t));
  });
}
function VC(e, t) {
  var r = Il(e);
  return r && r.setOutputEnd((t || this).count()), t;
}
function Il(e) {
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
var dr = (
  /** @class */
  (function() {
    function e() {
      this.group = new Ve(), this.uid = Lo("viewComponent");
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
su(dr);
lu(dr);
function GC() {
  var e = wt();
  return function(t) {
    var r = e(t), i = t.pipelineContext, n = !!r.large, a = !!r.progressiveRender, o = r.large = !!(i && i.large), s = r.progressiveRender = !!(i && i.progressiveRender);
    return (n !== o || a !== s) && "reset";
  };
}
var lp = wt(), WC = GC(), hr = (
  /** @class */
  (function() {
    function e() {
      this.group = new Ve(), this.uid = Lo("viewChart"), this.renderTask = bn({
        plan: YC,
        reset: qC
      }), this.renderTask.context = {
        view: this
      };
    }
    return e.prototype.init = function(t, r) {
    }, e.prototype.render = function(t, r, i, n) {
    }, e.prototype.highlight = function(t, r, i, n) {
      var a = t.getData(n && n.dataType);
      a && Yh(a, n, "emphasis");
    }, e.prototype.downplay = function(t, r, i, n) {
      var a = t.getData(n && n.dataType);
      a && Yh(a, n, "normal");
    }, e.prototype.remove = function(t, r) {
      this.group.removeAll();
    }, e.prototype.dispose = function(t, r) {
    }, e.prototype.updateView = function(t, r, i, n) {
      this.render(t, r, i, n);
    }, e.prototype.updateLayout = function(t, r, i, n) {
      this.render(t, r, i, n);
    }, e.prototype.updateVisual = function(t, r, i, n) {
      this.render(t, r, i, n);
    }, e.prototype.eachRendered = function(t) {
      Cd(this.group, t);
    }, e.markUpdateMethod = function(t, r) {
      lp(t).updateMethod = r;
    }, e.protoInitialize = (function() {
      var t = e.prototype;
      t.type = "chart";
    })(), e;
  })()
);
function Wh(e, t, r) {
  e && bl(e) && (t === "emphasis" ? _l : ml)(e, r);
}
function Yh(e, t, r) {
  var i = Wn(e, t), n = t && t.highlightKey != null ? jS(t.highlightKey) : null;
  i != null ? D($t(i), function(a) {
    Wh(e.getItemGraphicEl(a), r, n);
  }) : e.eachItemGraphicEl(function(a) {
    Wh(a, r, n);
  });
}
su(hr);
lu(hr);
function YC(e) {
  return WC(e.model);
}
function qC(e) {
  var t = e.model, r = e.ecModel, i = e.api, n = e.payload, a = t.pipelineContext.progressiveRender, o = e.view, s = n && lp(n).updateMethod, l = a ? "incrementalPrepareRender" : s && o[s] ? s : "render";
  return l !== "render" && o[l](t, r, i, n), XC[l];
}
var XC = {
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
}, uo = "\0__throttleOriginMethod", qh = "\0__throttleRate", Xh = "\0__throttleType";
function up(e, t, r) {
  var i, n = 0, a = 0, o = null, s, l, u, c;
  t = t || 0;
  function h() {
    a = (/* @__PURE__ */ new Date()).getTime(), o = null, e.apply(l, u || []);
  }
  var v = function() {
    for (var f = [], d = 0; d < arguments.length; d++)
      f[d] = arguments[d];
    i = (/* @__PURE__ */ new Date()).getTime(), l = this, u = f;
    var _ = c || t, p = c || r;
    c = null, s = i - (p ? n : a) - _, clearTimeout(o), p ? o = setTimeout(h, _) : s >= 0 ? h() : o = setTimeout(h, -s), n = i;
  };
  return v.clear = function() {
    o && (clearTimeout(o), o = null);
  }, v.debounceNextCall = function(f) {
    c = f;
  }, v;
}
function cp(e, t, r, i) {
  var n = e[t];
  if (n) {
    var a = n[uo] || n, o = n[Xh], s = n[qh];
    if (s !== r || o !== i) {
      if (r == null || !i)
        return e[t] = a;
      n = e[t] = up(a, r, i === "debounce"), n[uo] = a, n[Xh] = i, n[qh] = r;
    }
    return n;
  }
}
function kl(e, t) {
  var r = e[t];
  r && r[uo] && (r.clear && r.clear(), e[t] = r[uo]);
}
var Zh = wt(), Kh = {
  itemStyle: kn(Md, !0),
  lineStyle: kn(Dd, !0)
}, ZC = {
  lineStyle: "stroke",
  itemStyle: "fill"
};
function hp(e, t) {
  var r = e.visualStyleMapper || Kh[t];
  return r || (console.warn("Unknown style type '" + t + "'."), Kh.itemStyle);
}
function fp(e, t) {
  var r = e.visualDrawType || ZC[t];
  return r || (console.warn("Unknown style type '" + t + "'."), "fill");
}
var KC = {
  createOnAllSeries: !0,
  performRawSeries: !0,
  reset: function(e, t) {
    var r = e.getData(), i = e.visualStyleAccessPath || "itemStyle", n = e.getModel(i), a = hp(e, i), o = a(n), s = n.getShallow("decal");
    s && (r.setVisual("decal", s), s.dirty = !0);
    var l = fp(e, i), u = o[l], c = rt(u) ? u : null, h = o.fill === "auto" || o.stroke === "auto";
    if (!o[l] || c || h) {
      var v = e.getColorFromPalette(
        // TODO series count changed.
        e.name,
        null,
        t.getSeriesCount()
      );
      o[l] || (o[l] = v, r.setVisual("colorFromPalette", !0)), o.fill = o.fill === "auto" || rt(o.fill) ? v : o.fill, o.stroke = o.stroke === "auto" || rt(o.stroke) ? v : o.stroke;
    }
    if (r.setVisual("style", o), r.setVisual("drawType", l), !t.isSeriesFiltered(e) && c)
      return r.setVisual("colorFromPalette", !1), {
        dataEach: function(f, d) {
          var _ = e.getDataParams(d), p = R({}, o);
          p[l] = c(_), f.setItemVisual(d, "style", p);
        }
      };
  }
}, Xi = new dt(), jC = {
  createOnAllSeries: !0,
  performRawSeries: !0,
  reset: function(e, t) {
    if (!(e.ignoreStyleOnData || t.isSeriesFiltered(e))) {
      var r = e.getData(), i = e.visualStyleAccessPath || "itemStyle", n = hp(e, i), a = r.getVisual("drawType");
      return {
        dataEach: r.hasItemOption ? function(o, s) {
          var l = o.getRawDataItem(s);
          if (l && l[i]) {
            Xi.option = l[i];
            var u = n(Xi), c = o.ensureUniqueItemVisual(s, "style");
            R(c, u), Xi.option.decal && (o.setItemVisual(s, "decal", Xi.option.decal), Xi.option.decal.dirty = !0), a in u && o.setItemVisual(s, "colorFromPalette", !1);
          }
        } : null
      };
    }
  }
}, QC = {
  performRawSeries: !0,
  overallReset: function(e) {
    var t = tt();
    e.eachSeries(function(r) {
      var i = r.getColorBy();
      if (!r.isColorBySeries()) {
        var n = r.type + "-" + i, a = t.get(n);
        a || (a = {}, t.set(n, a)), Zh(r).scope = a;
      }
    }), e.eachSeries(function(r) {
      if (!(r.isColorBySeries() || e.isSeriesFiltered(r))) {
        var i = r.getRawData(), n = {}, a = r.getData(), o = Zh(r).scope, s = r.visualStyleAccessPath || "itemStyle", l = fp(r, s);
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
}, ma = Math.PI;
function JC(e, t) {
  t = t || {}, ct(t, {
    text: "loading",
    textColor: "#000",
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    fontFamily: "sans-serif",
    maskColor: "rgba(255, 255, 255, 0.8)",
    showSpinner: !0,
    color: "#5470c6",
    spinnerRadius: 10,
    lineWidth: 5,
    zlevel: 0
  });
  var r = new Ve(), i = new ve({
    style: {
      fill: t.maskColor
    },
    zlevel: t.zlevel,
    z: 1e4
  });
  r.add(i);
  var n = new pe({
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
  }), a = new ve({
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
  return t.showSpinner && (o = new Io({
    shape: {
      startAngle: -ma / 2,
      endAngle: -ma / 2 + 0.1,
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
    endAngle: ma * 3 / 2
  }).start("circularInOut"), o.animateShape(!0).when(1e3, {
    startAngle: ma * 3 / 2
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
var vp = (
  /** @class */
  (function() {
    function e(t, r, i, n) {
      this._stageTaskMap = tt(), this.ecInstance = t, this.api = r, i = this._dataProcessorHandlers = i.slice(), n = this._visualHandlers = n.slice(), this._allHandlers = i.concat(n);
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
      var i = this._pipelineMap.get(t.uid), n = t.getData(), a = n.count(), o = i.progressiveEnabled && r.incrementalPrepareRender && a >= i.threshold, s = t.get("large") && a >= t.get("largeThreshold"), l = t.get("progressiveChunkMode") === "mod" ? a : null;
      t.pipelineContext = i.context = {
        progressiveRender: o,
        modDataCount: l,
        large: s
      };
    }, e.prototype.restorePipelines = function(t) {
      var r = this, i = r._pipelineMap = tt();
      t.eachSeries(function(n) {
        var a = n.getProgressive(), o = n.uid;
        i.set(o, {
          id: o,
          head: null,
          tail: null,
          threshold: n.getProgressiveThreshold(),
          progressiveEnabled: a && !(n.preventIncremental && n.preventIncremental()),
          blockIndex: -1,
          step: Math.round(a || 700),
          count: 0
        }), r._pipe(n, n.dataTask);
      });
    }, e.prototype.prepareStageTasks = function() {
      var t = this._stageTaskMap, r = this.api.getModel(), i = this.api;
      D(this._allHandlers, function(n) {
        var a = t.get(n.uid) || t.set(n.uid, {}), o = "";
        Ue(!(n.reset && n.overallReset), o), n.reset && this._createSeriesStageTask(n, a, r, i), n.overallReset && this._createOverallStageTask(n, a, r, i);
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
      D(t, function(l, u) {
        if (!(n.visualType && n.visualType !== l.visualType)) {
          var c = o._stageTaskMap.get(l.uid), h = c.seriesTaskMap, v = c.overallTask;
          if (v) {
            var f, d = v.agentStubMap;
            d.each(function(p) {
              s(n, p) && (p.dirty(), f = !0);
            }), f && v.dirty(), o.updatePayload(v, i);
            var _ = o.getPerformArgs(v, n.block);
            d.each(function(p) {
              p.perform(_);
            }), v.perform(_) && (a = !0);
          } else h && h.each(function(p, g) {
            s(n, p) && p.dirty();
            var m = o.getPerformArgs(p, n.block);
            m.skip = !l.performRawSeries && r.isSeriesFiltered(p.context.model), o.updatePayload(p, i), p.perform(m) && (a = !0);
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
      var a = this, o = r.seriesTaskMap, s = r.seriesTaskMap = tt(), l = t.seriesType, u = t.getTargetSeries;
      t.createOnAllSeries ? i.eachRawSeries(c) : l ? i.eachRawSeriesByType(l, c) : u && u(i, n).each(c);
      function c(h) {
        var v = h.uid, f = s.set(v, o && o.get(v) || bn({
          plan: nD,
          reset: aD,
          count: sD
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
      var a = this, o = r.overallTask = r.overallTask || bn({
        reset: tD
      });
      o.context = {
        ecModel: i,
        api: n,
        overallReset: t.overallReset,
        scheduler: a
      };
      var s = o.agentStubMap, l = o.agentStubMap = tt(), u = t.seriesType, c = t.getTargetSeries, h = !0, v = !1, f = "";
      Ue(!t.createOnAllSeries, f), u ? i.eachRawSeriesByType(u, d) : c ? c(i, n).each(d) : (h = !1, D(i.getSeries(), d));
      function d(_) {
        var p = _.uid, g = l.set(p, s && s.get(p) || // When the result of `getTargetSeries` changed, the overallTask
        // should be set as dirty and re-performed.
        (v = !0, bn({
          reset: eD,
          onDirty: iD
        })));
        g.context = {
          model: _,
          overallProgress: h
          // FIXME:TS never used, so comment it
          // modifyOutputEnd: modifyOutputEnd
        }, g.agent = o, g.__block = h, a._pipe(_, g);
      }
      v && o.dirty();
    }, e.prototype._pipe = function(t, r) {
      var i = t.uid, n = this._pipelineMap.get(i);
      !n.head && (n.head = r), n.tail && n.tail.pipe(r), n.tail = r, r.__idxInPipeline = n.count++, r.__pipeline = n;
    }, e.wrapStageHandler = function(t, r) {
      return rt(t) && (t = {
        overallReset: t,
        seriesType: lD(t)
      }), t.uid = Lo("stageHandler"), r && (t.visualType = r), t;
    }, e;
  })()
);
function tD(e) {
  e.overallReset(e.ecModel, e.api, e.payload);
}
function eD(e) {
  return e.overallProgress && rD;
}
function rD() {
  this.agent.dirty(), this.getDownstream().dirty();
}
function iD() {
  this.agent && this.agent.dirty();
}
function nD(e) {
  return e.plan ? e.plan(e.model, e.ecModel, e.api, e.payload) : null;
}
function aD(e) {
  e.useClearVisual && e.data.clearAllVisual();
  var t = e.resetDefines = $t(e.reset(e.model, e.ecModel, e.api, e.payload));
  return t.length > 1 ? J(t, function(r, i) {
    return dp(i);
  }) : oD;
}
var oD = dp(0);
function dp(e) {
  return function(t, r) {
    var i = r.data, n = r.resetDefines[e];
    if (n && n.dataEach)
      for (var a = t.start; a < t.end; a++)
        n.dataEach(i, a);
    else n && n.progress && n.progress(t, i);
  };
}
function sD(e) {
  return e.data.count();
}
function lD(e) {
  co = null;
  try {
    e(Bn, pp);
  } catch {
  }
  return co;
}
var Bn = {}, pp = {}, co;
gp(Bn, Mu);
gp(pp, Ud);
Bn.eachSeriesByType = Bn.eachRawSeriesByType = function(e) {
  co = e;
};
Bn.eachComponent = function(e) {
  e.mainType === "series" && e.subType && (co = e.subType);
};
function gp(e, t) {
  for (var r in t.prototype)
    e[r] = Ut;
}
var jh = ["#37A2DA", "#32C5E9", "#67E0E3", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#E062AE", "#E690D1", "#e7bcf3", "#9d96f5", "#8378EA", "#96BFFF"];
const uD = {
  color: jh,
  colorLayer: [["#37A2DA", "#ffd85c", "#fd7b5f"], ["#37A2DA", "#67E0E3", "#FFDB5C", "#ff9f7f", "#E062AE", "#9d96f5"], ["#37A2DA", "#32C5E9", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#e7bcf3", "#8378EA", "#96BFFF"], jh]
};
var Pt = "#B9B8CE", Qh = "#100C2A", ya = function() {
  return {
    axisLine: {
      lineStyle: {
        color: Pt
      }
    },
    splitLine: {
      lineStyle: {
        color: "#484753"
      }
    },
    splitArea: {
      areaStyle: {
        color: ["rgba(255,255,255,0.02)", "rgba(255,255,255,0.05)"]
      }
    },
    minorSplitLine: {
      lineStyle: {
        color: "#20203B"
      }
    }
  };
}, Jh = ["#4992ff", "#7cffb2", "#fddd60", "#ff6e76", "#58d9f9", "#05c091", "#ff8a45", "#8d48e3", "#dd79ff"], _p = {
  darkMode: !0,
  color: Jh,
  backgroundColor: Qh,
  axisPointer: {
    lineStyle: {
      color: "#817f91"
    },
    crossStyle: {
      color: "#817f91"
    },
    label: {
      // TODO Contrast of label backgorundColor
      color: "#fff"
    }
  },
  legend: {
    textStyle: {
      color: Pt
    },
    pageTextStyle: {
      color: Pt
    }
  },
  textStyle: {
    color: Pt
  },
  title: {
    textStyle: {
      color: "#EEF1FA"
    },
    subtextStyle: {
      color: "#B9B8CE"
    }
  },
  toolbox: {
    iconStyle: {
      borderColor: Pt
    }
  },
  dataZoom: {
    borderColor: "#71708A",
    textStyle: {
      color: Pt
    },
    brushStyle: {
      color: "rgba(135,163,206,0.3)"
    },
    handleStyle: {
      color: "#353450",
      borderColor: "#C5CBE3"
    },
    moveHandleStyle: {
      color: "#B0B6C3",
      opacity: 0.3
    },
    fillerColor: "rgba(135,163,206,0.2)",
    emphasis: {
      handleStyle: {
        borderColor: "#91B7F2",
        color: "#4D587D"
      },
      moveHandleStyle: {
        color: "#636D9A",
        opacity: 0.7
      }
    },
    dataBackground: {
      lineStyle: {
        color: "#71708A",
        width: 1
      },
      areaStyle: {
        color: "#71708A"
      }
    },
    selectedDataBackground: {
      lineStyle: {
        color: "#87A3CE"
      },
      areaStyle: {
        color: "#87A3CE"
      }
    }
  },
  visualMap: {
    textStyle: {
      color: Pt
    }
  },
  timeline: {
    lineStyle: {
      color: Pt
    },
    label: {
      color: Pt
    },
    controlStyle: {
      color: Pt,
      borderColor: Pt
    }
  },
  calendar: {
    itemStyle: {
      color: Qh
    },
    dayLabel: {
      color: Pt
    },
    monthLabel: {
      color: Pt
    },
    yearLabel: {
      color: Pt
    }
  },
  timeAxis: ya(),
  logAxis: ya(),
  valueAxis: ya(),
  categoryAxis: ya(),
  line: {
    symbol: "circle"
  },
  graph: {
    color: Jh
  },
  gauge: {
    title: {
      color: Pt
    },
    axisLine: {
      lineStyle: {
        color: [[1, "rgba(207,212,219,0.2)"]]
      }
    },
    axisLabel: {
      color: Pt
    },
    detail: {
      color: "#EEF1FA"
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
  }
};
_p.categoryAxis.splitLine.show = !1;
var cD = (
  /** @class */
  (function() {
    function e() {
    }
    return e.prototype.normalizeQuery = function(t) {
      var r = {}, i = {}, n = {};
      if (U(t)) {
        var a = Ae(t);
        r.mainType = a.main || null, r.subType = a.sub || null;
      } else {
        var o = ["Index", "Name", "Id"], s = {
          name: 1,
          dataIndex: 1,
          dataType: 1
        };
        D(t, function(l, u) {
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
), Ll = ["symbol", "symbolSize", "symbolRotate", "symbolOffset"], tf = Ll.concat(["symbolKeepAspect"]), hD = {
  createOnAllSeries: !0,
  // For legend.
  performRawSeries: !0,
  reset: function(e, t) {
    var r = e.getData();
    if (e.legendIcon && r.setVisual("legendIcon", e.legendIcon), !e.hasSymbolVisual)
      return;
    for (var i = {}, n = {}, a = !1, o = 0; o < Ll.length; o++) {
      var s = Ll[o], l = e.get(s);
      rt(l) ? (a = !0, n[s] = l) : i[s] = l;
    }
    if (i.symbol = i.symbol || e.defaultSymbol, r.setVisual(R({
      legendIcon: e.legendIcon || i.symbol,
      symbolKeepAspect: e.get("symbolKeepAspect")
    }, i)), t.isSeriesFiltered(e))
      return;
    var u = pt(n);
    function c(h, v) {
      for (var f = e.getRawValue(v), d = e.getDataParams(v), _ = 0; _ < u.length; _++) {
        var p = u[_];
        h.setItemVisual(v, p, n[p](f, d));
      }
    }
    return {
      dataEach: a ? c : null
    };
  }
}, fD = {
  createOnAllSeries: !0,
  // For legend.
  performRawSeries: !0,
  reset: function(e, t) {
    if (!e.hasSymbolVisual || t.isSeriesFiltered(e))
      return;
    var r = e.getData();
    function i(n, a) {
      for (var o = n.getItemModel(a), s = 0; s < tf.length; s++) {
        var l = tf[s], u = o.getShallow(l, !0);
        u != null && n.setItemVisual(a, l, u);
      }
    }
    return {
      dataEach: r.hasItemOption ? i : null
    };
  }
};
function vD(e, t, r) {
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
function dD(e, t) {
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
function pD(e, t) {
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
  D([[e + "ToggleSelect", "toggleSelect"], [e + "Select", "select"], [e + "UnSelect", "unselect"]], function(i) {
    t(i[0], function(n, a, o) {
      n = R({}, n), o.dispatchAction(R(n, {
        type: i[1],
        seriesIndex: r(a, n)
      }));
    });
  });
}
function li(e, t, r, i, n) {
  var a = e + t;
  r.isSilent(a) || i.eachComponent({
    mainType: "series",
    subType: "pie"
  }, function(o) {
    for (var s = o.seriesIndex, l = o.option.selectedMap, u = n.selected, c = 0; c < u.length; c++)
      if (u[c].seriesIndex === s) {
        var h = o.getData(), v = Wn(h, n.fromActionPayload);
        r.trigger(a, {
          type: a,
          seriesId: o.id,
          name: B(v) ? h.getName(v[0]) : h.getName(v),
          selected: U(l) ? l : R({}, l)
        });
      }
  });
}
function gD(e, t, r) {
  e.on("selectchanged", function(i) {
    var n = r.getModel();
    i.isFromClick ? (li("map", "selectchanged", t, n, i), li("pie", "selectchanged", t, n, i)) : i.fromAction === "select" ? (li("map", "selected", t, n, i), li("pie", "selected", t, n, i)) : i.fromAction === "unselect" && (li("map", "unselected", t, n, i), li("pie", "unselected", t, n, i));
  });
}
function un(e, t, r) {
  for (var i; e && !(t(e) && (i = e, r)); )
    e = e.__hostTarget || e.parent;
  return i;
}
var _D = Math.round(Math.random() * 9), mD = typeof Object.defineProperty == "function", yD = (function() {
  function e() {
    this._id = "__ec_inner_" + _D++;
  }
  return e.prototype.get = function(t) {
    return this._guard(t)[this._id];
  }, e.prototype.set = function(t, r) {
    var i = this._guard(t);
    return mD ? Object.defineProperty(i, this._id, {
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
})(), wD = ot.extend({
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
}), bD = ot.extend({
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
}), SD = ot.extend({
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
}), xD = ot.extend({
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
}), TD = {
  line: Li,
  rect: ve,
  roundRect: ve,
  square: ve,
  circle: Po,
  diamond: bD,
  pin: SD,
  arrow: xD,
  triangle: wD
}, CD = {
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
}, Rl = {};
D(TD, function(e, t) {
  Rl[t] = new e();
});
var DD = ot.extend({
  type: "symbol",
  shape: {
    symbolType: "",
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  calculateTextPosition: function(e, t, r) {
    var i = Rv(e, t, r), n = this.shape;
    return n && n.symbolType === "pin" && t.position === "inside" && (i.y = r.y + r.height * 0.4), i;
  },
  buildPath: function(e, t, r) {
    var i = t.symbolType;
    if (i !== "none") {
      var n = Rl[i];
      n || (i = "rect", n = Rl[i]), CD[i](t.x, t.y, t.width, t.height, n.shape), n.buildPath(e, n.shape, r);
    }
  }
});
function MD(e, t) {
  if (this.type !== "image") {
    var r = this.style;
    this.__isEmptyBrush ? (r.stroke = e, r.fill = t || "#fff", r.lineWidth = 2) : this.shape.symbolType === "line" ? r.stroke = e : r.fill = e, this.markRedraw();
  }
}
function mp(e, t, r, i, n, a, o) {
  var s = e.indexOf("empty") === 0;
  s && (e = e.substr(5, 1).toLowerCase() + e.substr(6));
  var l;
  return e.indexOf("image://") === 0 ? l = wd(e.slice(8), new it(t, r, i, n), o ? "center" : "cover") : e.indexOf("path://") === 0 ? l = yu(e.slice(7), {}, new it(t, r, i, n), o ? "center" : "cover") : l = new DD({
    shape: {
      symbolType: e,
      x: t,
      y: r,
      width: i,
      height: n
    }
  }), l.__isEmptyBrush = s, l.setColor = MD, a && l.setColor(a), l;
}
function AD(e, t) {
  if (e != null)
    return B(e) || (e = [e, e]), [yt(e[0], t[0]) || 0, yt(K(e[1], e[0]), t[1]) || 0];
}
function zr(e) {
  return isFinite(e);
}
function PD(e, t, r) {
  var i = t.x == null ? 0 : t.x, n = t.x2 == null ? 1 : t.x2, a = t.y == null ? 0 : t.y, o = t.y2 == null ? 0 : t.y2;
  t.global || (i = i * r.width + r.x, n = n * r.width + r.x, a = a * r.height + r.y, o = o * r.height + r.y), i = zr(i) ? i : 0, n = zr(n) ? n : 1, a = zr(a) ? a : 0, o = zr(o) ? o : 0;
  var s = e.createLinearGradient(i, a, n, o);
  return s;
}
function ID(e, t, r) {
  var i = r.width, n = r.height, a = Math.min(i, n), o = t.x == null ? 0.5 : t.x, s = t.y == null ? 0.5 : t.y, l = t.r == null ? 0.5 : t.r;
  t.global || (o = o * i + r.x, s = s * n + r.y, l = l * a), o = zr(o) ? o : 0.5, s = zr(s) ? s : 0.5, l = l >= 0 && zr(l) ? l : 0.5;
  var u = e.createRadialGradient(o, s, 0, o, s, l);
  return u;
}
function $l(e, t, r) {
  for (var i = t.type === "radial" ? ID(e, t, r) : PD(e, t, r), n = t.colorStops, a = 0; a < n.length; a++)
    i.addColorStop(n[a].offset, n[a].color);
  return i;
}
function kD(e, t) {
  if (e === t || !e && !t)
    return !1;
  if (!e || !t || e.length !== t.length)
    return !0;
  for (var r = 0; r < e.length; r++)
    if (e[r] !== t[r])
      return !0;
  return !1;
}
function wa(e) {
  return parseInt(e, 10);
}
function ba(e, t, r) {
  var i = ["width", "height"][t], n = ["clientWidth", "clientHeight"][t], a = ["paddingLeft", "paddingTop"][t], o = ["paddingRight", "paddingBottom"][t];
  if (r[i] != null && r[i] !== "auto")
    return parseFloat(r[i]);
  var s = document.defaultView.getComputedStyle(e);
  return (e[n] || wa(s[i]) || wa(e.style[i])) - (wa(s[a]) || 0) - (wa(s[o]) || 0) | 0;
}
function LD(e, t) {
  return !e || e === "solid" || !(t > 0) ? null : e === "dashed" ? [4 * t, 2 * t] : e === "dotted" ? [t] : mt(e) ? [e] : B(e) ? e : null;
}
function yp(e) {
  var t = e.style, r = t.lineDash && t.lineWidth > 0 && LD(t.lineDash, t.lineWidth), i = t.lineDashOffset;
  if (r) {
    var n = t.strokeNoScale && e.getLineScale ? e.getLineScale() : 1;
    n && n !== 1 && (r = J(r, function(a) {
      return a / n;
    }), i /= n);
  }
  return [r, i];
}
var RD = new Pi(!0);
function ho(e) {
  var t = e.stroke;
  return !(t == null || t === "none" || !(e.lineWidth > 0));
}
function ef(e) {
  return typeof e == "string" && e !== "none";
}
function fo(e) {
  var t = e.fill;
  return t != null && t !== "none";
}
function rf(e, t) {
  if (t.fillOpacity != null && t.fillOpacity !== 1) {
    var r = e.globalAlpha;
    e.globalAlpha = t.fillOpacity * t.opacity, e.fill(), e.globalAlpha = r;
  } else
    e.fill();
}
function nf(e, t) {
  if (t.strokeOpacity != null && t.strokeOpacity !== 1) {
    var r = e.globalAlpha;
    e.globalAlpha = t.strokeOpacity * t.opacity, e.stroke(), e.globalAlpha = r;
  } else
    e.stroke();
}
function El(e, t, r) {
  var i = Yv(t.image, t.__image, r);
  if (Do(i)) {
    var n = e.createPattern(i, t.repeat || "repeat");
    if (typeof DOMMatrix == "function" && n && n.setTransform) {
      var a = new DOMMatrix();
      a.translateSelf(t.x || 0, t.y || 0), a.rotateSelf(0, 0, (t.rotation || 0) * jw), a.scaleSelf(t.scaleX || 1, t.scaleY || 1), n.setTransform(a);
    }
    return n;
  }
}
function $D(e, t, r, i) {
  var n, a = ho(r), o = fo(r), s = r.strokePercent, l = s < 1, u = !t.path;
  (!t.silent || l) && u && t.createPathProxy();
  var c = t.path || RD, h = t.__dirty;
  if (!i) {
    var v = r.fill, f = r.stroke, d = o && !!v.colorStops, _ = a && !!f.colorStops, p = o && !!v.image, g = a && !!f.image, m = void 0, y = void 0, w = void 0, S = void 0, b = void 0;
    (d || _) && (b = t.getBoundingRect()), d && (m = h ? $l(e, v, b) : t.__canvasFillGradient, t.__canvasFillGradient = m), _ && (y = h ? $l(e, f, b) : t.__canvasStrokeGradient, t.__canvasStrokeGradient = y), p && (w = h || !t.__canvasFillPattern ? El(e, v, t) : t.__canvasFillPattern, t.__canvasFillPattern = w), g && (S = h || !t.__canvasStrokePattern ? El(e, f, t) : t.__canvasStrokePattern, t.__canvasStrokePattern = w), d ? e.fillStyle = m : p && (w ? e.fillStyle = w : o = !1), _ ? e.strokeStyle = y : g && (S ? e.strokeStyle = S : a = !1);
  }
  var x = t.getGlobalScale();
  c.setScale(x[0], x[1], t.segmentIgnoreThreshold);
  var T, C;
  e.setLineDash && r.lineDash && (n = yp(t), T = n[0], C = n[1]);
  var M = !0;
  (u || h & hi) && (c.setDPR(e.dpr), l ? c.setContext(null) : (c.setContext(e), M = !1), c.reset(), t.buildPath(c, t.shape, i), c.toStatic(), t.pathUpdated()), M && c.rebuildPath(e, l ? s : 1), T && (e.setLineDash(T), e.lineDashOffset = C), i || (r.strokeFirst ? (a && nf(e, r), o && rf(e, r)) : (o && rf(e, r), a && nf(e, r))), T && e.setLineDash([]);
}
function ED(e, t, r) {
  var i = t.__image = Yv(r.image, t.__image, t, t.onload);
  if (!(!i || !Do(i))) {
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
function OD(e, t, r) {
  var i, n = r.text;
  if (n != null && (n += ""), n) {
    e.font = r.font || Yr, e.textAlign = r.textAlign, e.textBaseline = r.textBaseline;
    var a = void 0, o = void 0;
    e.setLineDash && r.lineDash && (i = yp(t), a = i[0], o = i[1]), a && (e.setLineDash(a), e.lineDashOffset = o), r.strokeFirst ? (ho(r) && e.strokeText(n, r.x, r.y), fo(r) && e.fillText(n, r.x, r.y)) : (fo(r) && e.fillText(n, r.x, r.y), ho(r) && e.strokeText(n, r.x, r.y)), a && e.setLineDash([]);
  }
}
var af = ["shadowBlur", "shadowOffsetX", "shadowOffsetY"], of = [
  ["lineCap", "butt"],
  ["lineJoin", "miter"],
  ["miterLimit", 10]
];
function wp(e, t, r, i, n) {
  var a = !1;
  if (!i && (r = r || {}, t === r))
    return !1;
  if (i || t.opacity !== r.opacity) {
    Ht(e, n), a = !0;
    var o = Math.max(Math.min(t.opacity, 1), 0);
    e.globalAlpha = isNaN(o) ? Ur.opacity : o;
  }
  (i || t.blend !== r.blend) && (a || (Ht(e, n), a = !0), e.globalCompositeOperation = t.blend || Ur.blend);
  for (var s = 0; s < af.length; s++) {
    var l = af[s];
    (i || t[l] !== r[l]) && (a || (Ht(e, n), a = !0), e[l] = e.dpr * (t[l] || 0));
  }
  return (i || t.shadowColor !== r.shadowColor) && (a || (Ht(e, n), a = !0), e.shadowColor = t.shadowColor || Ur.shadowColor), a;
}
function sf(e, t, r, i, n) {
  var a = Nn(t, n.inHover), o = i ? null : r && Nn(r, n.inHover) || {};
  if (a === o)
    return !1;
  var s = wp(e, a, o, i, n);
  if ((i || a.fill !== o.fill) && (s || (Ht(e, n), s = !0), ef(a.fill) && (e.fillStyle = a.fill)), (i || a.stroke !== o.stroke) && (s || (Ht(e, n), s = !0), ef(a.stroke) && (e.strokeStyle = a.stroke)), (i || a.opacity !== o.opacity) && (s || (Ht(e, n), s = !0), e.globalAlpha = a.opacity == null ? 1 : a.opacity), t.hasStroke()) {
    var l = a.lineWidth, u = l / (a.strokeNoScale && t.getLineScale ? t.getLineScale() : 1);
    e.lineWidth !== u && (s || (Ht(e, n), s = !0), e.lineWidth = u);
  }
  for (var c = 0; c < of.length; c++) {
    var h = of[c], v = h[0];
    (i || a[v] !== o[v]) && (s || (Ht(e, n), s = !0), e[v] = a[v] || h[1]);
  }
  return s;
}
function BD(e, t, r, i, n) {
  return wp(e, Nn(t, n.inHover), r && Nn(r, n.inHover), i, n);
}
function bp(e, t) {
  var r = t.transform, i = e.dpr || 1;
  r ? e.setTransform(i * r[0], i * r[1], i * r[2], i * r[3], i * r[4], i * r[5]) : e.setTransform(i, 0, 0, i, 0, 0);
}
function ND(e, t, r) {
  for (var i = !1, n = 0; n < e.length; n++) {
    var a = e[n];
    i = i || a.isZeroArea(), bp(t, a), t.beginPath(), a.buildPath(t, a.shape), t.clip();
  }
  r.allClipped = i;
}
function FD(e, t) {
  return e && t ? e[0] !== t[0] || e[1] !== t[1] || e[2] !== t[2] || e[3] !== t[3] || e[4] !== t[4] || e[5] !== t[5] : !(!e && !t);
}
var lf = 1, uf = 2, cf = 3, hf = 4;
function zD(e) {
  var t = fo(e), r = ho(e);
  return !(e.lineDash || !(+t ^ +r) || t && typeof e.fill != "string" || r && typeof e.stroke != "string" || e.strokePercent < 1 || e.strokeOpacity < 1 || e.fillOpacity < 1);
}
function Ht(e, t) {
  t.batchFill && e.fill(), t.batchStroke && e.stroke(), t.batchFill = "", t.batchStroke = "";
}
function Nn(e, t) {
  return t && e.__hoverStyle || e.style;
}
function Sp(e, t) {
  Hr(e, t, { inHover: !1, viewWidth: 0, viewHeight: 0 }, !0);
}
function Hr(e, t, r, i) {
  var n = t.transform;
  if (!t.shouldBePainted(r.viewWidth, r.viewHeight, !1, !1)) {
    t.__dirty &= ~Xt, t.__isRendered = !1;
    return;
  }
  var a = t.__clipPaths, o = r.prevElClipPaths, s = !1, l = !1;
  if ((!o || kD(a, o)) && (o && o.length && (Ht(e, r), e.restore(), l = s = !0, r.prevElClipPaths = null, r.allClipped = !1, r.prevEl = null), a && a.length && (Ht(e, r), e.save(), ND(a, e, r), s = !0), r.prevElClipPaths = a), r.allClipped) {
    t.__isRendered = !1;
    return;
  }
  t.beforeBrush && t.beforeBrush(), t.innerBeforeBrush();
  var u = r.prevEl;
  u || (l = s = !0);
  var c = t instanceof ot && t.autoBatch && zD(t.style);
  s || FD(n, u.transform) ? (Ht(e, r), bp(e, t)) : c || Ht(e, r);
  var h = Nn(t, r.inHover);
  t instanceof ot ? (r.lastDrawType !== lf && (l = !0, r.lastDrawType = lf), sf(e, t, u, l, r), (!c || !r.batchFill && !r.batchStroke) && e.beginPath(), $D(e, t, h, c), c && (r.batchFill = h.fill || "", r.batchStroke = h.stroke || "")) : t instanceof to ? (r.lastDrawType !== cf && (l = !0, r.lastDrawType = cf), sf(e, t, u, l, r), OD(e, t, h)) : t instanceof Xr ? (r.lastDrawType !== uf && (l = !0, r.lastDrawType = uf), BD(e, t, u, l, r), ED(e, t, h)) : t.getTemporalDisplayables && (r.lastDrawType !== hf && (l = !0, r.lastDrawType = hf), HD(e, t, r)), c && i && Ht(e, r), t.innerAfterBrush(), t.afterBrush && t.afterBrush(), r.prevEl = t, t.__dirty = 0, t.__isRendered = !0;
}
function HD(e, t, r) {
  var i = t.getDisplayables(), n = t.getTemporalDisplayables();
  e.save();
  var a = {
    prevElClipPaths: null,
    prevEl: null,
    allClipped: !1,
    viewWidth: r.viewWidth,
    viewHeight: r.viewHeight,
    inHover: r.inHover
  }, o, s;
  for (o = t.getCursor(), s = i.length; o < s; o++) {
    var l = i[o];
    l.beforeBrush && l.beforeBrush(), l.innerBeforeBrush(), Hr(e, l, a, o === s - 1), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), a.prevEl = l;
  }
  for (var u = 0, c = n.length; u < c; u++) {
    var l = n[u];
    l.beforeBrush && l.beforeBrush(), l.innerBeforeBrush(), Hr(e, l, a, u === c - 1), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), a.prevEl = l;
  }
  t.clearTemporalDisplayables(), t.notClear = !0, e.restore();
}
var Ls = new yD(), ff = new Gn(100), vf = ["symbol", "symbolSize", "symbolKeepAspect", "color", "backgroundColor", "dashArrayX", "dashArrayY", "maxTileWidth", "maxTileHeight"];
function df(e, t) {
  if (e === "none")
    return null;
  var r = t.getDevicePixelRatio(), i = t.getZr(), n = i.painter.type === "svg";
  e.dirty && Ls.delete(e);
  var a = Ls.get(e);
  if (a)
    return a;
  var o = ct(e, {
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
  return l(s), s.rotation = o.rotation, s.scaleX = s.scaleY = n ? 1 : 1 / r, Ls.set(e, s), e.dirty = !1, s;
  function l(u) {
    for (var c = [r], h = !0, v = 0; v < vf.length; ++v) {
      var f = o[vf[v]];
      if (f != null && !B(f) && !U(f) && !mt(f) && typeof f != "boolean") {
        h = !1;
        break;
      }
      c.push(f);
    }
    var d;
    if (h) {
      d = c.join(",") + (n ? "-svg" : "");
      var _ = ff.get(d);
      _ && (n ? u.svgElement = _ : u.image = _);
    }
    var p = Tp(o.dashArrayX), g = UD(o.dashArrayY), m = xp(o.symbol), y = VD(p), w = Cp(g), S = !n && Ii.createCanvas(), b = n && {
      tag: "g",
      attrs: {},
      key: "dcl",
      children: []
    }, x = C(), T;
    S && (S.width = x.width * r, S.height = x.height * r, T = S.getContext("2d")), M(), h && ff.put(d, S || b), u.image = S, u.svgElement = b, u.svgWidth = x.width, u.svgHeight = x.height;
    function C() {
      for (var A = 1, I = 0, k = y.length; I < k; ++I)
        A = Lc(A, y[I]);
      for (var P = 1, I = 0, k = m.length; I < k; ++I)
        P = Lc(P, m[I].length);
      A *= P;
      var E = w * y.length * m.length;
      return {
        width: Math.max(1, Math.min(A, o.maxTileWidth)),
        height: Math.max(1, Math.min(E, o.maxTileHeight))
      };
    }
    function M() {
      T && (T.clearRect(0, 0, S.width, S.height), o.backgroundColor && (T.fillStyle = o.backgroundColor, T.fillRect(0, 0, S.width, S.height)));
      for (var A = 0, I = 0; I < g.length; ++I)
        A += g[I];
      if (A <= 0)
        return;
      for (var k = -w, P = 0, E = 0, O = 0; k < x.height; ) {
        if (P % 2 === 0) {
          for (var Y = E / 2 % m.length, q = 0, N = 0, X = 0; q < x.width * 2; ) {
            for (var j = 0, I = 0; I < p[O].length; ++I)
              j += p[O][I];
            if (j <= 0)
              break;
            if (N % 2 === 0) {
              var W = (1 - o.symbolSize) * 0.5, gt = q + p[O][N] * W, bt = k + g[P] * W, Yt = p[O][N] * o.symbolSize, ye = g[P] * o.symbolSize, Qt = X / 2 % m[Y].length;
              qt(gt, bt, Yt, ye, m[Y][Qt]);
            }
            q += p[O][N], ++X, ++N, N === p[O].length && (N = 0);
          }
          ++O, O === p.length && (O = 0);
        }
        k += g[P], ++E, ++P, P === g.length && (P = 0);
      }
      function qt(xt, ht, z, Z, we) {
        var St = n ? 1 : r, Ze = mp(we, xt * St, ht * St, z * St, Z * St, o.color, o.symbolKeepAspect);
        if (n) {
          var Oe = i.painter.renderOneToVNode(Ze);
          Oe && b.children.push(Oe);
        } else
          Sp(T, Ze);
      }
    }
  }
}
function xp(e) {
  if (!e || e.length === 0)
    return [["rect"]];
  if (U(e))
    return [[e]];
  for (var t = !0, r = 0; r < e.length; ++r)
    if (!U(e[r])) {
      t = !1;
      break;
    }
  if (t)
    return xp([e]);
  for (var i = [], r = 0; r < e.length; ++r)
    U(e[r]) ? i.push([e[r]]) : i.push(e[r]);
  return i;
}
function Tp(e) {
  if (!e || e.length === 0)
    return [[0, 0]];
  if (mt(e)) {
    var t = Math.ceil(e);
    return [[t, t]];
  }
  for (var r = !0, i = 0; i < e.length; ++i)
    if (!mt(e[i])) {
      r = !1;
      break;
    }
  if (r)
    return Tp([e]);
  for (var n = [], i = 0; i < e.length; ++i)
    if (mt(e[i])) {
      var t = Math.ceil(e[i]);
      n.push([t, t]);
    } else {
      var t = J(e[i], function(s) {
        return Math.ceil(s);
      });
      t.length % 2 === 1 ? n.push(t.concat(t)) : n.push(t);
    }
  return n;
}
function UD(e) {
  if (!e || typeof e == "object" && e.length === 0)
    return [0, 0];
  if (mt(e)) {
    var t = Math.ceil(e);
    return [t, t];
  }
  var r = J(e, function(i) {
    return Math.ceil(i);
  });
  return e.length % 2 ? r.concat(r) : r;
}
function VD(e) {
  return J(e, function(t) {
    return Cp(t);
  });
}
function Cp(e) {
  for (var t = 0, r = 0; r < e.length; ++r)
    t += e[r];
  return e.length % 2 === 1 ? t * 2 : t;
}
function GD(e, t) {
  e.eachRawSeries(function(r) {
    if (!e.isSeriesFiltered(r)) {
      var i = r.getData();
      i.hasItemVisual() && i.each(function(o) {
        var s = i.getItemVisual(o, "decal");
        if (s) {
          var l = i.ensureUniqueItemVisual(o, "style");
          l.decal = df(s, t);
        }
      });
      var n = i.getVisual("decal");
      if (n) {
        var a = i.getVisual("style");
        a.decal = df(n, t);
      }
    }
  });
}
var he = new Re(), Dp = {};
function WD(e, t) {
  Dp[e] = t;
}
function YD(e) {
  return Dp[e];
}
var qD = 1, XD = 800, ZD = 900, KD = 1e3, jD = 2e3, QD = 5e3, Mp = 1e3, JD = 1100, ku = 2e3, Ap = 3e3, t2 = 4e3, Eo = 4500, e2 = 4600, r2 = 5e3, i2 = 6e3, Pp = 7e3, n2 = {
  PROCESSOR: {
    FILTER: KD,
    SERIES_FILTER: XD,
    STATISTIC: QD
  },
  VISUAL: {
    LAYOUT: Mp,
    PROGRESSIVE_LAYOUT: JD,
    GLOBAL: ku,
    CHART: Ap,
    POST_CHART_LAYOUT: e2,
    COMPONENT: t2,
    BRUSH: r2,
    CHART_ITEM: Eo,
    ARIA: i2,
    DECAL: Pp
  }
}, At = "__flagInMainProcess", Bt = "__pendingUpdate", Rs = "__needsUpdateStatus", pf = /^[a-zA-Z0-9_]+$/, $s = "__connectUpdateStatus", gf = 0, a2 = 1, o2 = 2;
function Ip(e) {
  return function() {
    for (var t = [], r = 0; r < arguments.length; r++)
      t[r] = arguments[r];
    if (this.isDisposed()) {
      this.id;
      return;
    }
    return Lp(this, e, t);
  };
}
function kp(e) {
  return function() {
    for (var t = [], r = 0; r < arguments.length; r++)
      t[r] = arguments[r];
    return Lp(this, e, t);
  };
}
function Lp(e, t, r) {
  return r[0] = r[0] && r[0].toLowerCase(), Re.prototype[t].apply(e, r);
}
var Rp = (
  /** @class */
  (function(e) {
    G(t, e);
    function t() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return t;
  })(Re)
), $p = Rp.prototype;
$p.on = kp("on");
$p.off = kp("off");
var ui, Es, Sa, tr, Os, Bs, Ns, Zi, Ki, _f, mf, Fs, yf, xa, wf, Ep, Jt, bf, Op = (
  /** @class */
  (function(e) {
    G(t, e);
    function t(r, i, n) {
      var a = e.call(this, new cD()) || this;
      a._chartsViews = [], a._chartsMap = {}, a._componentsViews = [], a._componentsMap = {}, a._pendingActions = [], n = n || {}, U(i) && (i = Bp[i]), a._dom = r;
      var o = "canvas", s = "auto", l = !1;
      n.ssr;
      var u = a._zr = Pc(r, {
        renderer: n.renderer || o,
        devicePixelRatio: n.devicePixelRatio,
        width: n.width,
        height: n.height,
        ssr: n.ssr,
        useDirtyRect: K(n.useDirtyRect, l),
        useCoarsePointer: K(n.useCoarsePointer, s),
        pointerSize: n.pointerSize
      });
      a._ssr = n.ssr, a._throttledZrFlush = up(lt(u.flush, u), 17), i = Q(i), i && Wd(i, !0), a._theme = i, a._locale = fT(n.locale || Ad), a._coordSysMgr = new Vd();
      var c = a._api = wf(a);
      function h(v, f) {
        return v.__prio - f.__prio;
      }
      return Pa(po, h), Pa(Ol, h), a._scheduler = new vp(a, c, Ol, po), a._messageCenter = new Rp(), a._initEvents(), a.resize = lt(a.resize, a), u.animation.on("frame", a._onframe, a), _f(u, a), mf(u, a), js(a), a;
    }
    return t.prototype._onframe = function() {
      if (!this._disposed) {
        bf(this);
        var r = this._scheduler;
        if (this[Bt]) {
          var i = this[Bt].silent;
          this[At] = !0;
          try {
            ui(this), tr.update.call(this, null, this[Bt].updateParams);
          } catch (l) {
            throw this[At] = !1, this[Bt] = null, l;
          }
          this._zr.flush(), this[At] = !1, this[Bt] = null, Zi.call(this, i), Ki.call(this, i);
        } else if (r.unfinished) {
          var n = qD, a = this._model, o = this._api;
          r.unfinished = !1;
          do {
            var s = +/* @__PURE__ */ new Date();
            r.performSeriesTasks(a), r.performDataProcessorTasks(a), Bs(this, a), r.performVisualTasks(a), xa(this, this._model, o, "remain", {}), n -= +/* @__PURE__ */ new Date() - s;
          } while (n > 0 && r.unfinished);
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
      if (!this[At]) {
        if (this._disposed) {
          this.id;
          return;
        }
        var a, o, s;
        if (F(i) && (n = i.lazyUpdate, a = i.silent, o = i.replaceMerge, s = i.transition, i = i.notMerge), this[At] = !0, !this._model || i) {
          var l = new VT(this._api), u = this._theme, c = this._model = new Mu();
          c.scheduler = this._scheduler, c.ssr = this._ssr, c.init(null, null, null, u, this._locale, l);
        }
        this._model.setOption(r, {
          replaceMerge: o
        }, Bl);
        var h = {
          seriesTransition: s,
          optionChanged: !0
        };
        if (n)
          this[Bt] = {
            silent: a,
            updateParams: h
          }, this[At] = !1, this.getZr().wakeUp();
        else {
          try {
            ui(this), tr.update.call(this, null, h);
          } catch (v) {
            throw this[Bt] = null, this[At] = !1, v;
          }
          this._ssr || this._zr.flush(), this[Bt] = null, this[At] = !1, Zi.call(this, a), Ki.call(this, a);
        }
      }
    }, t.prototype.setTheme = function() {
    }, t.prototype.getModel = function() {
      return this._model;
    }, t.prototype.getOption = function() {
      return this._model && this._model.getOption();
    }, t.prototype.getWidth = function() {
      return this._zr.getWidth();
    }, t.prototype.getHeight = function() {
      return this._zr.getHeight();
    }, t.prototype.getDevicePixelRatio = function() {
      return this._zr.painter.dpr || H.hasGlobalWindow && window.devicePixelRatio || 1;
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
      if (H.svgSupported) {
        var r = this._zr, i = r.storage.getDisplayList();
        return D(i, function(n) {
          n.stopAnimation(null, !0);
        }), r.painter.toDataURL();
      }
    }, t.prototype.getDataURL = function(r) {
      if (this._disposed) {
        this.id;
        return;
      }
      r = r || {};
      var i = r.excludeComponents, n = this._model, a = [], o = this;
      D(i, function(l) {
        n.eachComponent({
          mainType: l
        }, function(u) {
          var c = o._componentsMap[u.__viewId];
          c.group.ignore || (a.push(c), c.group.ignore = !0);
        });
      });
      var s = this._zr.painter.getType() === "svg" ? this.getSvgDataURL() : this.renderToCanvas(r).toDataURL("image/" + (r && r.type || "png"));
      return D(a, function(l) {
        l.group.ignore = !1;
      }), s;
    }, t.prototype.getConnectedDataURL = function(r) {
      if (this._disposed) {
        this.id;
        return;
      }
      var i = r.type === "svg", n = this.group, a = Math.min, o = Math.max, s = 1 / 0;
      if (Sf[n]) {
        var l = s, u = s, c = -s, h = -s, v = [], f = r && r.pixelRatio || this.getDevicePixelRatio();
        D(xn, function(y, w) {
          if (y.group === n) {
            var S = i ? y.getZr().painter.getSvgDom().innerHTML : y.renderToCanvas(Q(r)), b = y.getDom().getBoundingClientRect();
            l = a(b.left, l), u = a(b.top, u), c = o(b.right, c), h = o(b.bottom, h), v.push({
              dom: S,
              left: b.left,
              top: b.top
            });
          }
        }), l *= f, u *= f, c *= f, h *= f;
        var d = c - l, _ = h - u, p = Ii.createCanvas(), g = Pc(p, {
          renderer: i ? "svg" : "canvas"
        });
        if (g.resize({
          width: d,
          height: _
        }), i) {
          var m = "";
          return D(v, function(y) {
            var w = y.left - l, S = y.top - u;
            m += '<g transform="translate(' + w + "," + S + ')">' + y.dom + "</g>";
          }), g.painter.getSvgRoot().innerHTML = m, r.connectedBackgroundColor && g.painter.setBackgroundColor(r.connectedBackgroundColor), g.refreshImmediately(), g.painter.toDataURL();
        } else
          return r.connectedBackgroundColor && g.add(new ve({
            shape: {
              x: 0,
              y: 0,
              width: d,
              height: _
            },
            style: {
              fill: r.connectedBackgroundColor
            }
          })), D(v, function(y) {
            var w = new Xr({
              style: {
                x: y.left * f - l,
                y: y.top * f - u,
                image: y.dom
              }
            });
            g.add(w);
          }), g.refreshImmediately(), p.toDataURL("image/" + (r && r.type || "png"));
      } else
        return this.getDataURL(r);
    }, t.prototype.convertToPixel = function(r, i) {
      return Os(this, "convertToPixel", r, i);
    }, t.prototype.convertFromPixel = function(r, i) {
      return Os(this, "convertFromPixel", r, i);
    }, t.prototype.containPixel = function(r, i) {
      if (this._disposed) {
        this.id;
        return;
      }
      var n = this._model, a, o = os(n, r);
      return D(o, function(s, l) {
        l.indexOf("Models") >= 0 && D(s, function(u) {
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
      var n = this._model, a = os(n, r, {
        defaultMainType: "series"
      }), o = a.seriesModel, s = o.getData(), l = a.hasOwnProperty("dataIndexInside") ? a.dataIndexInside : a.hasOwnProperty("dataIndex") ? s.indexOfRawIndex(a.dataIndex) : null;
      return l != null ? vD(s, l, i) : dD(s, i);
    }, t.prototype.getViewOfComponentModel = function(r) {
      return this._componentsMap[r.__viewId];
    }, t.prototype.getViewOfSeriesModel = function(r) {
      return this._chartsMap[r.__viewId];
    }, t.prototype._initEvents = function() {
      var r = this;
      D(s2, function(i) {
        var n = function(a) {
          var o = r.getModel(), s = a.target, l, u = i === "globalout";
          if (u ? l = {} : s && un(s, function(d) {
            var _ = vt(d);
            if (_ && _.dataIndex != null) {
              var p = _.dataModel || o.getSeriesByIndex(_.seriesIndex);
              return l = p && p.getDataParams(_.dataIndex, _.dataType, s) || {}, !0;
            } else if (_.eventData)
              return l = R({}, _.eventData), !0;
          }, !0), l) {
            var c = l.componentType, h = l.componentIndex;
            (c === "markLine" || c === "markPoint" || c === "markArea") && (c = "series", h = l.seriesIndex);
            var v = c && h != null && o.getComponent(c, h), f = v && r[v.mainType === "series" ? "_chartsMap" : "_componentsMap"][v.__viewId];
            l.event = a, l.type = i, r._$eventProcessor.eventInfo = {
              targetEl: s,
              packedEvent: l,
              model: v,
              view: f
            }, r.trigger(i, l);
          }
        };
        n.zrEventfulCallAtLast = !0, r._zr.on(i, n, r);
      }), D(Sn, function(i, n) {
        r._messageCenter.on(n, function(a) {
          this.trigger(n, a);
        }, r);
      }), D(["selectchanged"], function(i) {
        r._messageCenter.on(i, function(n) {
          this.trigger(i, n);
        }, r);
      }), gD(this._messageCenter, this, this._api);
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
      r && Vv(this.getDom(), Ru, "");
      var i = this, n = i._api, a = i._model;
      D(i._componentsViews, function(o) {
        o.dispose(a, n);
      }), D(i._chartsViews, function(o) {
        o.dispose(a, n);
      }), i._zr.dispose(), i._dom = i._model = i._chartsMap = i._componentsMap = i._chartsViews = i._componentsViews = i._scheduler = i._api = i._zr = i._throttledZrFlush = i._theme = i._coordSysMgr = i._messageCenter = null, delete xn[i.id];
    }, t.prototype.resize = function(r) {
      if (!this[At]) {
        if (this._disposed) {
          this.id;
          return;
        }
        this._zr.resize(r);
        var i = this._model;
        if (this._loadingFX && this._loadingFX.resize(), !!i) {
          var n = i.resetOption("media"), a = r && r.silent;
          this[Bt] && (a == null && (a = this[Bt].silent), n = !0, this[Bt] = null), this[At] = !0;
          try {
            n && ui(this), tr.update.call(this, {
              type: "resize",
              animation: R({
                // Disable animation
                duration: 0
              }, r && r.animation)
            });
          } catch (o) {
            throw this[At] = !1, o;
          }
          this[At] = !1, Zi.call(this, a), Ki.call(this, a);
        }
      }
    }, t.prototype.showLoading = function(r, i) {
      if (this._disposed) {
        this.id;
        return;
      }
      if (F(r) && (i = r, r = ""), r = r || "default", this.hideLoading(), !!Nl[r]) {
        var n = Nl[r](this._api, i), a = this._zr;
        this._loadingFX = n, a.add(n);
      }
    }, t.prototype.hideLoading = function() {
      if (this._disposed) {
        this.id;
        return;
      }
      this._loadingFX && this._zr.remove(this._loadingFX), this._loadingFX = null;
    }, t.prototype.makeActionFromEvent = function(r) {
      var i = R({}, r);
      return i.type = Sn[r.type], i;
    }, t.prototype.dispatchAction = function(r, i) {
      if (this._disposed) {
        this.id;
        return;
      }
      if (F(i) || (i = {
        silent: !!i
      }), !!vo[r.type] && this._model) {
        if (this[At]) {
          this._pendingActions.push(r);
          return;
        }
        var n = i.silent;
        Ns.call(this, r, n);
        var a = i.flush;
        a ? this._zr.flush() : a !== !1 && H.browser.weChat && this._throttledZrFlush(), Zi.call(this, n), Ki.call(this, n);
      }
    }, t.prototype.updateLabelLayout = function() {
      he.trigger("series:layoutlabels", this._model, this._api, {
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
      ui = function(h) {
        var v = h._scheduler;
        v.restorePipelines(h._model), v.prepareStageTasks(), Es(h, !0), Es(h, !1), v.plan();
      }, Es = function(h, v) {
        for (var f = h._model, d = h._scheduler, _ = v ? h._componentsViews : h._chartsViews, p = v ? h._componentsMap : h._chartsMap, g = h._zr, m = h._api, y = 0; y < _.length; y++)
          _[y].__alive = !1;
        v ? f.eachComponent(function(b, x) {
          b !== "series" && w(x);
        }) : f.eachSeries(w);
        function w(b) {
          var x = b.__requireNewView;
          b.__requireNewView = !1;
          var T = "_ec_" + b.id + "_" + b.type, C = !x && p[T];
          if (!C) {
            var M = Ae(b.type), A = v ? dr.getClass(M.main, M.sub) : (
              // FIXME:TS
              // (ChartView as ChartViewConstructor).getClass('series', classType.sub)
              // For backward compat, still support a chart type declared as only subType
              // like "liquidfill", but recommend "series.liquidfill"
              // But need a base class to make a type series.
              hr.getClass(M.sub)
            );
            C = new A(), C.init(f, m), p[T] = C, _.push(C), g.add(C.group);
          }
          b.__viewId = C.__id = T, C.__alive = !0, C.__model = b, C.group.__ecComponentInfo = {
            mainType: b.mainType,
            index: b.componentIndex
          }, !v && d.prepareView(C, b, f, m);
        }
        for (var y = 0; y < _.length; ) {
          var S = _[y];
          S.__alive ? y++ : (!v && S.renderTask.dispose(), g.remove(S.group), S.dispose(f, m), _.splice(y, 1), p[S.__id] === S && delete p[S.__id], S.__id = S.group.__ecComponentInfo = null);
        }
      }, Sa = function(h, v, f, d, _) {
        var p = h._model;
        if (p.setUpdatePayload(f), !d) {
          D([].concat(h._componentsViews).concat(h._chartsViews), S);
          return;
        }
        var g = {};
        g[d + "Id"] = f[d + "Id"], g[d + "Index"] = f[d + "Index"], g[d + "Name"] = f[d + "Name"];
        var m = {
          mainType: d,
          query: g
        };
        _ && (m.subType = _);
        var y = f.excludeSeriesId, w;
        y != null && (w = tt(), D($t(y), function(b) {
          var x = ke(b, null);
          x != null && w.set(x, !0);
        })), p && p.eachComponent(m, function(b) {
          var x = w && w.get(b.id) != null;
          if (!x)
            if (ih(f))
              if (b instanceof vr)
                f.type === Vr && !f.notBlur && !b.get(["emphasis", "disabled"]) && zS(b, f, h._api);
              else {
                var T = vu(b.mainType, b.componentIndex, f.name, h._api), C = T.focusSelf, M = T.dispatchers;
                f.type === Vr && C && !f.notBlur && wl(b.mainType, b.componentIndex, h._api), M && D(M, function(A) {
                  f.type === Vr ? _l(A) : ml(A);
                });
              }
            else Sl(f) && b instanceof vr && (VS(b, f, h._api), eh(b), Jt(h));
        }, h), p && p.eachComponent(m, function(b) {
          var x = w && w.get(b.id) != null;
          x || S(h[d === "series" ? "_chartsMap" : "_componentsMap"][b.__viewId]);
        }, h);
        function S(b) {
          b && b.__alive && b[v] && b[v](b.__model, p, h._api, f);
        }
      }, tr = {
        prepareAndUpdate: function(h) {
          ui(this), tr.update.call(this, h, {
            // Needs to mark option changed if newOption is given.
            // It's from MagicType.
            // TODO If use a separate flag optionChanged in payload?
            optionChanged: h.newOption != null
          });
        },
        update: function(h, v) {
          var f = this._model, d = this._api, _ = this._zr, p = this._coordSysMgr, g = this._scheduler;
          if (f) {
            f.setUpdatePayload(h), g.restoreData(f, h), g.performSeriesTasks(f), p.create(f, d), g.performDataProcessorTasks(f, h), Bs(this, f), p.update(f, d), r(f), g.performVisualTasks(f, h), Fs(this, f, d, h, v);
            var m = f.get("backgroundColor") || "transparent", y = f.get("darkMode");
            _.setBackgroundColor(m), y != null && y !== "auto" && _.setDarkMode(y), he.trigger("afterupdate", f, d);
          }
        },
        updateTransform: function(h) {
          var v = this, f = this._model, d = this._api;
          if (f) {
            f.setUpdatePayload(h);
            var _ = [];
            f.eachComponent(function(g, m) {
              if (g !== "series") {
                var y = v.getViewOfComponentModel(m);
                if (y && y.__alive)
                  if (y.updateTransform) {
                    var w = y.updateTransform(m, f, d, h);
                    w && w.update && _.push(y);
                  } else
                    _.push(y);
              }
            });
            var p = tt();
            f.eachSeries(function(g) {
              var m = v._chartsMap[g.__viewId];
              if (m.updateTransform) {
                var y = m.updateTransform(g, f, d, h);
                y && y.update && p.set(g.uid, 1);
              } else
                p.set(g.uid, 1);
            }), r(f), this._scheduler.performVisualTasks(f, h, {
              setDirty: !0,
              dirtyMap: p
            }), xa(this, f, d, h, {}, p), he.trigger("afterupdate", f, d);
          }
        },
        updateView: function(h) {
          var v = this._model;
          v && (v.setUpdatePayload(h), hr.markUpdateMethod(h, "updateView"), r(v), this._scheduler.performVisualTasks(v, h, {
            setDirty: !0
          }), Fs(this, v, this._api, h, {}), he.trigger("afterupdate", v, this._api));
        },
        updateVisual: function(h) {
          var v = this, f = this._model;
          f && (f.setUpdatePayload(h), f.eachSeries(function(d) {
            d.getData().clearAllVisual();
          }), hr.markUpdateMethod(h, "updateVisual"), r(f), this._scheduler.performVisualTasks(f, h, {
            visualType: "visual",
            setDirty: !0
          }), f.eachComponent(function(d, _) {
            if (d !== "series") {
              var p = v.getViewOfComponentModel(_);
              p && p.__alive && p.updateVisual(_, f, v._api, h);
            }
          }), f.eachSeries(function(d) {
            var _ = v._chartsMap[d.__viewId];
            _.updateVisual(d, f, v._api, h);
          }), he.trigger("afterupdate", f, this._api));
        },
        updateLayout: function(h) {
          tr.update.call(this, h);
        }
      }, Os = function(h, v, f, d) {
        if (h._disposed) {
          h.id;
          return;
        }
        for (var _ = h._model, p = h._coordSysMgr.getCoordinateSystems(), g, m = os(_, f), y = 0; y < p.length; y++) {
          var w = p[y];
          if (w[v] && (g = w[v](_, m, d)) != null)
            return g;
        }
      }, Bs = function(h, v) {
        var f = h._chartsMap, d = h._scheduler;
        v.eachSeries(function(_) {
          d.updateStreamModes(_, f[_.__viewId]);
        });
      }, Ns = function(h, v) {
        var f = this, d = this.getModel(), _ = h.type, p = h.escapeConnect, g = vo[_], m = g.actionInfo, y = (m.update || "update").split(":"), w = y.pop(), S = y[0] != null && Ae(y[0]);
        this[At] = !0;
        var b = [h], x = !1;
        h.batch && (x = !0, b = J(h.batch, function(P) {
          return P = ct(R({}, P), h), P.batch = null, P;
        }));
        var T = [], C, M = Sl(h), A = ih(h);
        if (A && cd(this._api), D(b, function(P) {
          if (C = g.action(P, f._model, f._api), C = C || R({}, P), C.type = m.event || C.type, T.push(C), A) {
            var E = au(h), O = E.queryOptionMap, Y = E.mainTypeSpecified, q = Y ? O.keys()[0] : "series";
            Sa(f, w, P, q), Jt(f);
          } else M ? (Sa(f, w, P, "series"), Jt(f)) : S && Sa(f, w, P, S.main, S.sub);
        }), w !== "none" && !A && !M && !S)
          try {
            this[Bt] ? (ui(this), tr.update.call(this, h), this[Bt] = null) : tr[w].call(this, h);
          } catch (P) {
            throw this[At] = !1, P;
          }
        if (x ? C = {
          type: m.event || _,
          escapeConnect: p,
          batch: T
        } : C = T[0], this[At] = !1, !v) {
          var I = this._messageCenter;
          if (I.trigger(C.type, C), M) {
            var k = {
              type: "selectchanged",
              escapeConnect: p,
              selected: GS(d),
              isFromClick: h.isFromClick || !1,
              fromAction: h.type,
              fromActionPayload: h
            };
            I.trigger(k.type, k);
          }
        }
      }, Zi = function(h) {
        for (var v = this._pendingActions; v.length; ) {
          var f = v.shift();
          Ns.call(this, f, h);
        }
      }, Ki = function(h) {
        !h && this.trigger("updated");
      }, _f = function(h, v) {
        h.on("rendered", function(f) {
          v.trigger("rendered", f), // Although zr is dirty if initial animation is not finished
          // and this checking is called on frame, we also check
          // animation finished for robustness.
          h.animation.isFinished() && !v[Bt] && !v._scheduler.unfinished && !v._pendingActions.length && v.trigger("finished");
        });
      }, mf = function(h, v) {
        h.on("mouseover", function(f) {
          var d = f.target, _ = un(d, bl);
          _ && (HS(_, f, v._api), Jt(v));
        }).on("mouseout", function(f) {
          var d = f.target, _ = un(d, bl);
          _ && (US(_, f, v._api), Jt(v));
        }).on("click", function(f) {
          var d = f.target, _ = un(d, function(m) {
            return vt(m).dataIndex != null;
          }, !0);
          if (_) {
            var p = _.selected ? "unselect" : "select", g = vt(_);
            v._api.dispatchAction({
              type: p,
              dataType: g.dataType,
              dataIndexInside: g.dataIndex,
              seriesIndex: g.seriesIndex,
              isFromClick: !0
            });
          }
        });
      };
      function r(h) {
        h.clearColorPalette(), h.eachSeries(function(v) {
          v.clearColorPalette();
        });
      }
      function i(h) {
        var v = [], f = [], d = !1;
        if (h.eachComponent(function(m, y) {
          var w = y.get("zlevel") || 0, S = y.get("z") || 0, b = y.getZLevelKey();
          d = d || !!b, (m === "series" ? f : v).push({
            zlevel: w,
            z: S,
            idx: y.componentIndex,
            type: m,
            key: b
          });
        }), d) {
          var _ = v.concat(f), p, g;
          Pa(_, function(m, y) {
            return m.zlevel === y.zlevel ? m.z - y.z : m.zlevel - y.zlevel;
          }), D(_, function(m) {
            var y = h.getComponent(m.type, m.idx), w = m.zlevel, S = m.key;
            p != null && (w = Math.max(p, w)), S ? (w === p && S !== g && w++, g = S) : g && (w === p && w++, g = ""), p = w, y.setZLevel(w);
          });
        }
      }
      Fs = function(h, v, f, d, _) {
        i(v), yf(h, v, f, d, _), D(h._chartsViews, function(p) {
          p.__alive = !1;
        }), xa(h, v, f, d, _), D(h._chartsViews, function(p) {
          p.__alive || p.remove(v, f);
        });
      }, yf = function(h, v, f, d, _, p) {
        D(p || h._componentsViews, function(g) {
          var m = g.__model;
          u(m, g), g.render(m, v, f, d), s(m, g), c(m, g);
        });
      }, xa = function(h, v, f, d, _, p) {
        var g = h._scheduler;
        _ = R(_ || {}, {
          updatedSeries: v.getSeries()
        }), he.trigger("series:beforeupdate", v, f, _);
        var m = !1;
        v.eachSeries(function(y) {
          var w = h._chartsMap[y.__viewId];
          w.__alive = !0;
          var S = w.renderTask;
          g.updatePayload(S, d), u(y, w), p && p.get(y.uid) && S.dirty(), S.perform(g.getPerformArgs(S)) && (m = !0), w.group.silent = !!y.get("silent"), o(y, w), eh(y);
        }), g.unfinished = m || g.unfinished, he.trigger("series:layoutlabels", v, f, _), he.trigger("series:transition", v, f, _), v.eachSeries(function(y) {
          var w = h._chartsMap[y.__viewId];
          s(y, w), c(y, w);
        }), a(h, v), he.trigger("series:afterupdate", v, f, _);
      }, Jt = function(h) {
        h[Rs] = !0, h.getZr().wakeUp();
      }, bf = function(h) {
        h[Rs] && (h.getZr().storage.traverse(function(v) {
          wn(v) || n(v);
        }), h[Rs] = !1);
      };
      function n(h) {
        for (var v = [], f = h.currentStates, d = 0; d < f.length; d++) {
          var _ = f[d];
          _ === "emphasis" || _ === "blur" || _ === "select" || v.push(_);
        }
        h.selected && h.states.select && v.push("select"), h.hoverState === hu && h.states.emphasis ? v.push("emphasis") : h.hoverState === cu && h.states.blur && v.push("blur"), h.useStates(v);
      }
      function a(h, v) {
        var f = h._zr, d = f.storage, _ = 0;
        d.traverse(function(p) {
          p.isGroup || _++;
        }), _ > v.get("hoverLayerThreshold") && !H.node && !H.worker && v.eachSeries(function(p) {
          if (!p.preventUsingHoverLayer) {
            var g = h._chartsMap[p.__viewId];
            g.__alive && g.eachRendered(function(m) {
              m.states.emphasis && (m.states.emphasis.hoverLayer = !0);
            });
          }
        });
      }
      function o(h, v) {
        var f = h.get("blendMode") || null;
        v.eachRendered(function(d) {
          d.isGroup || (d.style.blend = f);
        });
      }
      function s(h, v) {
        if (!h.preventAutoZ) {
          var f = h.get("z") || 0, d = h.get("zlevel") || 0;
          v.eachRendered(function(_) {
            return l(_, f, d, -1 / 0), !0;
          });
        }
      }
      function l(h, v, f, d) {
        var _ = h.getTextContent(), p = h.getTextGuideLine(), g = h.isGroup;
        if (g)
          for (var m = h.childrenRef(), y = 0; y < m.length; y++)
            d = Math.max(l(m[y], v, f, d), d);
        else
          h.z = v, h.zlevel = f, d = Math.max(h.z2, d);
        if (_ && (_.z = v, _.zlevel = f, isFinite(d) && (_.z2 = d + 2)), p) {
          var w = h.textGuideLineConfig;
          p.z = v, p.zlevel = f, isFinite(d) && (p.z2 = d + (w && w.showAbove ? 1 : -1));
        }
        return d;
      }
      function u(h, v) {
        v.eachRendered(function(f) {
          if (!wn(f)) {
            var d = f.getTextContent(), _ = f.getTextGuideLine();
            f.stateTransition && (f.stateTransition = null), d && d.stateTransition && (d.stateTransition = null), _ && _.stateTransition && (_.stateTransition = null), f.hasState() ? (f.prevStates = f.currentStates, f.clearStates()) : f.prevStates && (f.prevStates = null);
          }
        });
      }
      function c(h, v) {
        var f = h.getModel("stateAnimation"), d = h.isAnimationEnabled(), _ = f.get("duration"), p = _ > 0 ? {
          duration: _,
          delay: f.get("delay"),
          easing: f.get("easing")
          // additive: stateAnimationModel.get('additive')
        } : null;
        v.eachRendered(function(g) {
          if (g.states && g.states.emphasis) {
            if (wn(g))
              return;
            if (g instanceof ot && QS(g), g.__dirty) {
              var m = g.prevStates;
              m && g.useStates(m);
            }
            if (d) {
              g.stateTransition = p;
              var y = g.getTextContent(), w = g.getTextGuideLine();
              y && (y.stateTransition = p), w && (w.stateTransition = p);
            }
            g.__dirty && n(g);
          }
        });
      }
      wf = function(h) {
        return new /** @class */
        ((function(v) {
          G(f, v);
          function f() {
            return v !== null && v.apply(this, arguments) || this;
          }
          return f.prototype.getCoordinateSystems = function() {
            return h._coordSysMgr.getCoordinateSystems();
          }, f.prototype.getComponentByElement = function(d) {
            for (; d; ) {
              var _ = d.__ecComponentInfo;
              if (_ != null)
                return h._model.getComponent(_.mainType, _.index);
              d = d.parent;
            }
          }, f.prototype.enterEmphasis = function(d, _) {
            _l(d, _), Jt(h);
          }, f.prototype.leaveEmphasis = function(d, _) {
            ml(d, _), Jt(h);
          }, f.prototype.enterBlur = function(d) {
            FS(d), Jt(h);
          }, f.prototype.leaveBlur = function(d) {
            od(d), Jt(h);
          }, f.prototype.enterSelect = function(d) {
            sd(d), Jt(h);
          }, f.prototype.leaveSelect = function(d) {
            ld(d), Jt(h);
          }, f.prototype.getModel = function() {
            return h.getModel();
          }, f.prototype.getViewOfComponentModel = function(d) {
            return h.getViewOfComponentModel(d);
          }, f.prototype.getViewOfSeriesModel = function(d) {
            return h.getViewOfSeriesModel(d);
          }, f;
        })(Ud))(h);
      }, Ep = function(h) {
        function v(f, d) {
          for (var _ = 0; _ < f.length; _++) {
            var p = f[_];
            p[$s] = d;
          }
        }
        D(Sn, function(f, d) {
          h._messageCenter.on(d, function(_) {
            if (Sf[h.group] && h[$s] !== gf) {
              if (_ && _.escapeConnect)
                return;
              var p = h.makeActionFromEvent(_), g = [];
              D(xn, function(m) {
                m !== h && m.group === h.group && g.push(m);
              }), v(g, gf), D(g, function(m) {
                m[$s] !== a2 && m.dispatchAction(p);
              }), v(g, o2);
            }
          });
        });
      };
    })(), t;
  })(Re)
), Lu = Op.prototype;
Lu.on = Ip("on");
Lu.off = Ip("off");
Lu.one = function(e, t, r) {
  var i = this;
  function n() {
    for (var a = [], o = 0; o < arguments.length; o++)
      a[o] = arguments[o];
    t && t.apply && t.apply(this, a), i.off(e, n);
  }
  this.on.call(this, e, n, r);
};
var s2 = ["click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "globalout", "contextmenu"];
var vo = {}, Sn = {}, Ol = [], Bl = [], po = [], Bp = {}, Nl = {}, xn = {}, Sf = {}, l2 = +/* @__PURE__ */ new Date() - 0, Ru = "_echarts_instance_";
function u2(e, t, r) {
  var i = !(r && r.ssr);
  if (i) {
    var n = c2(e);
    if (n)
      return n;
  }
  var a = new Op(e, t, r);
  return a.id = "ec_" + l2++, xn[a.id] = a, i && Vv(e, Ru, a.id), Ep(a), he.trigger("afterinit", a), a;
}
function c2(e) {
  return xn[Ib(e, Ru)];
}
function Np(e, t) {
  Bp[e] = t;
}
function Fp(e) {
  st(Bl, e) < 0 && Bl.push(e);
}
function zp(e, t) {
  Eu(Ol, e, t, jD);
}
function h2(e) {
  $u("afterinit", e);
}
function f2(e) {
  $u("afterupdate", e);
}
function $u(e, t) {
  he.on(e, t);
}
function $i(e, t, r) {
  rt(t) && (r = t, t = "");
  var i = F(e) ? e.type : [e, e = {
    event: t
  }][0];
  e.event = (e.event || i).toLowerCase(), t = e.event, !Sn[t] && (Ue(pf.test(i) && pf.test(t)), vo[i] || (vo[i] = {
    action: r,
    actionInfo: e
  }), Sn[t] = i);
}
function v2(e, t) {
  Vd.register(e, t);
}
function d2(e, t) {
  Eu(po, e, t, Mp, "layout");
}
function Zr(e, t) {
  Eu(po, e, t, Ap, "visual");
}
var xf = [];
function Eu(e, t, r, i, n) {
  if ((rt(t) || F(t)) && (r = t, t = i), !(st(xf, r) >= 0)) {
    xf.push(r);
    var a = vp.wrapStageHandler(r, n);
    a.__prio = t, a.__raw = r, e.push(a);
  }
}
function Hp(e, t) {
  Nl[e] = t;
}
function p2(e, t, r) {
  var i = YD("registerMap");
  i && i(e, t, r);
}
var g2 = yC;
Zr(ku, KC);
Zr(Eo, jC);
Zr(Eo, QC);
Zr(ku, hD);
Zr(Eo, fD);
Zr(Pp, GD);
Fp(Wd);
zp(ZD, eC);
Hp("default", JC);
$i({
  type: Vr,
  event: Vr,
  update: Vr
}, Ut);
$i({
  type: Ea,
  event: Ea,
  update: Ea
}, Ut);
$i({
  type: _n,
  event: _n,
  update: _n
}, Ut);
$i({
  type: Oa,
  event: Oa,
  update: Oa
}, Ut);
$i({
  type: mn,
  event: mn,
  update: mn
}, Ut);
Np("light", uD);
Np("dark", _p);
function ji(e) {
  return e == null ? 0 : e.length || 1;
}
function Tf(e) {
  return e;
}
var _2 = (
  /** @class */
  (function() {
    function e(t, r, i, n, a, o) {
      this._old = t, this._new = r, this._oldKeyGetter = i || Tf, this._newKeyGetter = n || Tf, this.context = a, this._diffModeMultiple = o === "multiple";
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
        var s = n[o], l = i[s], u = ji(l);
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
        var l = a[s], u = i[l], c = n[l], h = ji(u), v = ji(c);
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
        var n = t[i], a = r[n], o = ji(a);
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
          var l = r[s], u = ji(l);
          u === 0 ? (r[s] = o, a && i.push(s)) : u === 1 ? r[s] = [l, o] : l.push(o);
        }
      }
    }, e;
  })()
), m2 = (
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
function y2(e, t) {
  var r = {}, i = r.encode = {}, n = tt(), a = [], o = [], s = {};
  D(e.dimensions, function(v) {
    var f = e.getDimensionInfo(v), d = f.coordDim;
    if (d) {
      var _ = f.coordDimIndex;
      zs(i, d)[_] = v, f.isExtraCoord || (n.set(d, 1), w2(f.type) && (a[0] = v), zs(s, d)[_] = e.getDimensionIndex(f.name)), f.defaultTooltip && o.push(v);
    }
    Bd.each(function(p, g) {
      var m = zs(i, g), y = f.otherDims[g];
      y != null && y !== !1 && (m[y] = f.name);
    });
  });
  var l = [], u = {};
  n.each(function(v, f) {
    var d = i[f];
    u[f] = d[0], l = l.concat(d);
  }), r.dataDimsOnCoord = l, r.dataDimIndicesOnCoord = J(l, function(v) {
    return e.getDimensionInfo(v).storeDimIndex;
  }), r.encodeFirstDimNotExtra = u;
  var c = i.label;
  c && c.length && (a = c.slice());
  var h = i.tooltip;
  return h && h.length ? o = h.slice() : o.length || (o = a.slice()), i.defaultedLabel = a, i.defaultedTooltip = o, r.userOutput = new m2(s, t), r;
}
function zs(e, t) {
  return e.hasOwnProperty(t) || (e[t] = []), e[t];
}
function w2(e) {
  return !(e === "ordinal" || e === "time");
}
var Ha = (
  /** @class */
  /* @__PURE__ */ (function() {
    function e(t) {
      this.otherDims = {}, t != null && R(this, t);
    }
    return e;
  })()
), b2 = wt(), S2 = {
  float: "f",
  int: "i",
  ordinal: "o",
  number: "n",
  time: "t"
}, Up = (
  /** @class */
  (function() {
    function e(t) {
      this.dimensions = t.dimensions, this._dimOmitted = t.dimensionOmitted, this.source = t.source, this._fullDimCount = t.fullDimensionCount, this._updateDimOmitted(t.dimensionOmitted);
    }
    return e.prototype.isDimensionOmitted = function() {
      return this._dimOmitted;
    }, e.prototype._updateDimOmitted = function(t) {
      this._dimOmitted = t, t && (this._dimNameMap || (this._dimNameMap = Gp(this.source)));
    }, e.prototype.getSourceDimensionIndex = function(t) {
      return K(this._dimNameMap.get(t), -1);
    }, e.prototype.getSourceDimension = function(t) {
      var r = this.source.dimensionsDefine;
      if (r)
        return r[t];
    }, e.prototype.makeStoreSchema = function() {
      for (var t = this._fullDimCount, r = Xd(this.source), i = !Wp(t), n = "", a = [], o = 0, s = 0; o < t; o++) {
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
        }), r && l != null && (!h || !h.isCalculationCoord) && (n += i ? l.replace(/\`/g, "`1").replace(/\$/g, "`2") : l), n += "$", n += S2[u] || "f", c && (n += c.uid), n += "$";
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
function x2(e) {
  return e instanceof Up;
}
function Vp(e) {
  for (var t = tt(), r = 0; r < (e || []).length; r++) {
    var i = e[r], n = F(i) ? i.name : i;
    n != null && t.get(n) == null && t.set(n, r);
  }
  return t;
}
function Gp(e) {
  var t = b2(e);
  return t.dimNameMap || (t.dimNameMap = Vp(e.dimensionsDefine));
}
function Wp(e) {
  return e > 30;
}
var Qi = F, er = J, T2 = typeof Int32Array > "u" ? Array : Int32Array, C2 = "e\0\0", Cf = -1, D2 = ["hasItemOption", "_nameList", "_idList", "_invertedIndicesMap", "_dimSummary", "userOutput", "_rawData", "_dimValueGetter", "_nameDimIdx", "_idDimIdx", "_nameRepeatCount"], M2 = ["_approximateExtent"], Df, Ta, Ji, tn, Hs, en, Us, A2 = (
  /** @class */
  (function() {
    function e(t, r) {
      this.type = "list", this._dimOmitted = !1, this._nameList = [], this._idList = [], this._visual = {}, this._layout = {}, this._itemVisuals = [], this._itemLayouts = [], this._graphicEls = [], this._approximateExtent = {}, this._calculationInfo = {}, this.hasItemOption = !1, this.TRANSFERABLE_METHODS = ["cloneShallow", "downSample", "minmaxDownSample", "lttbDownSample", "map"], this.CHANGABLE_METHODS = ["filterSelf", "selectRange"], this.DOWNSAMPLE_METHODS = ["downSample", "minmaxDownSample", "lttbDownSample"];
      var i, n = !1;
      x2(t) ? (i = t.dimensions, this._dimOmitted = t.isDimensionOmitted(), this._schema = t) : (n = !0, i = t), i = i || ["x", "y"];
      for (var a = {}, o = [], s = {}, l = !1, u = {}, c = 0; c < i.length; c++) {
        var h = i[c], v = U(h) ? new Ha({
          name: h
        }) : h instanceof Ha ? h : new Ha(h), f = v.name;
        v.type = v.type || "float", v.coordDim || (v.coordDim = f, v.coordDimIndex = 0);
        var d = v.otherDims = v.otherDims || {};
        o.push(f), a[f] = v, u[f] != null && (l = !0), v.createInvertedIndices && (s[f] = []), d.itemName === 0 && (this._nameDimIdx = c), d.itemId === 0 && (this._idDimIdx = c), n && (v.storeDimIndex = c);
      }
      if (this.dimensions = o, this._dimInfos = a, this._initGetDimensionInfo(l), this.hostModel = r, this._invertedIndicesMap = s, this._dimOmitted) {
        var _ = this._dimIdxToName = tt();
        D(o, function(p) {
          _.set(a[p].storeDimIndex, p);
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
      if (mt(t) || t != null && !isNaN(t) && !this._getDimInfo(t) && (!this._dimOmitted || this._schema.getSourceDimensionIndex(t) < 0))
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
      if (t instanceof Ml && (a = t), !a) {
        var o = this.dimensions, s = Au(t) || Vt(t) ? new Zd(t, o.length) : t;
        a = new Ml();
        var l = er(o, function(u) {
          return {
            type: n._dimInfos[u].type,
            property: u
          };
        });
        a.initData(s, l, i);
      }
      this._store = a, this._nameList = (r || []).slice(), this._idList = [], this._nameRepeatCount = {}, this._doInit(0, a.count()), this._dimSummary = y2(this, this._schema), this.userOutput = this._dimSummary.userOutput;
    }, e.prototype.appendData = function(t) {
      var r = this._store.appendData(t);
      this._doInit(r[0], r[1]);
    }, e.prototype.appendValues = function(t, r) {
      var i = this._store.appendValues(t, r && r.length), n = i.start, a = i.end, o = this._shouldMakeIdFromName();
      if (this._updateOrdinalMeta(), r)
        for (var s = n; s < a; s++) {
          var l = s - n;
          this._nameList[s] = r[l], o && Us(this, s);
        }
    }, e.prototype._updateOrdinalMeta = function() {
      for (var t = this._store, r = this.dimensions, i = 0; i < r.length; i++) {
        var n = this._dimInfos[r[i]];
        n.ordinalMeta && t.collectOrdinalMeta(n.storeDimIndex, n.ordinalMeta);
      }
    }, e.prototype._shouldMakeIdFromName = function() {
      var t = this._store.getProvider();
      return this._idDimIdx == null && t.getSource().sourceFormat !== cr && !t.fillStorage;
    }, e.prototype._doInit = function(t, r) {
      if (!(t >= r)) {
        var i = this._store, n = i.getProvider();
        this._updateOrdinalMeta();
        var a = this._nameList, o = this._idList, s = n.getSource().sourceFormat, l = s === $e;
        if (l && !n.pure)
          for (var u = [], c = t; c < r; c++) {
            var h = n.getItem(c, u);
            if (!this.hasItemOption && yb(h) && (this.hasItemOption = !0), h) {
              var v = h.name;
              a[c] == null && v != null && (a[c] = ke(v, null));
              var f = h.id;
              o[c] == null && f != null && (o[c] = ke(f, null));
            }
          }
        if (this._shouldMakeIdFromName())
          for (var c = t; c < r; c++)
            Us(this, c);
        Df(this);
      }
    }, e.prototype.getApproximateExtent = function(t) {
      return this._approximateExtent[t] || this._store.getDataExtent(this._getStoreDimIndex(t));
    }, e.prototype.setApproximateExtent = function(t, r) {
      r = this.getDimension(r), this._approximateExtent[r] = t.slice();
    }, e.prototype.getCalculationInfo = function(t) {
      return this._calculationInfo[t];
    }, e.prototype.setCalculationInfo = function(t, r) {
      Qi(t) ? R(this._calculationInfo, t) : this._calculationInfo[t] = r;
    }, e.prototype.getName = function(t) {
      var r = this.getRawIndex(t), i = this._nameList[r];
      return i == null && this._nameDimIdx != null && (i = Ji(this, this._nameDimIdx, r)), i == null && (i = ""), i;
    }, e.prototype._getCategory = function(t, r) {
      var i = this._store.get(t, r), n = this._store.getOrdinalMeta(t);
      return n ? n.categories[i] : i;
    }, e.prototype.getId = function(t) {
      return Ta(this, this.getRawIndex(t));
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
      return this._store.getDataExtent(this._getStoreDimIndex(t));
    }, e.prototype.getSum = function(t) {
      return this._store.getSum(this._getStoreDimIndex(t));
    }, e.prototype.getMedian = function(t) {
      return this._store.getMedian(this._getStoreDimIndex(t));
    }, e.prototype.getValues = function(t, r) {
      var i = this, n = this._store;
      return B(t) ? n.getValues(er(t, function(a) {
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
      return n == null || isNaN(n) ? Cf : n;
    }, e.prototype.indicesOfNearest = function(t, r, i) {
      return this._store.indicesOfNearest(this._getStoreDimIndex(t), r, i);
    }, e.prototype.each = function(t, r, i) {
      rt(t) && (i = r, r = t, t = []);
      var n = i || this, a = er(tn(t), this._getStoreDimIndex, this);
      this._store.each(a, n ? lt(r, n) : r);
    }, e.prototype.filterSelf = function(t, r, i) {
      rt(t) && (i = r, r = t, t = []);
      var n = i || this, a = er(tn(t), this._getStoreDimIndex, this);
      return this._store = this._store.filter(a, n ? lt(r, n) : r), this;
    }, e.prototype.selectRange = function(t) {
      var r = this, i = {}, n = pt(t);
      return D(n, function(a) {
        var o = r._getStoreDimIndex(a);
        i[o] = t[a];
      }), this._store = this._store.selectRange(i), this;
    }, e.prototype.mapArray = function(t, r, i) {
      rt(t) && (i = r, r = t, t = []), i = i || this;
      var n = [];
      return this.each(t, function() {
        n.push(r && r.apply(this, arguments));
      }, i), n;
    }, e.prototype.map = function(t, r, i, n) {
      var a = i || n || this, o = er(tn(t), this._getStoreDimIndex, this), s = en(this);
      return s._store = this._store.map(o, a ? lt(r, a) : r), s;
    }, e.prototype.modify = function(t, r, i, n) {
      var a = i || n || this, o = er(tn(t), this._getStoreDimIndex, this);
      this._store.modify(o, a ? lt(r, a) : r);
    }, e.prototype.downSample = function(t, r, i, n) {
      var a = en(this);
      return a._store = this._store.downSample(this._getStoreDimIndex(t), r, i, n), a;
    }, e.prototype.minmaxDownSample = function(t, r) {
      var i = en(this);
      return i._store = this._store.minmaxDownSample(this._getStoreDimIndex(t), r), i;
    }, e.prototype.lttbDownSample = function(t, r) {
      var i = en(this);
      return i._store = this._store.lttbDownSample(this._getStoreDimIndex(t), r), i;
    }, e.prototype.getRawDataItem = function(t) {
      return this._store.getRawDataItem(t);
    }, e.prototype.getItemModel = function(t) {
      var r = this.hostModel, i = this.getRawDataItem(t);
      return new dt(i, r, r && r.ecModel);
    }, e.prototype.diff = function(t) {
      var r = this;
      return new _2(t ? t.getStore().getIndices() : [], this.getStore().getIndices(), function(i) {
        return Ta(t, i);
      }, function(i) {
        return Ta(r, i);
      });
    }, e.prototype.getVisual = function(t) {
      var r = this._visual;
      return r && r[t];
    }, e.prototype.setVisual = function(t, r) {
      this._visual = this._visual || {}, Qi(t) ? R(this._visual, t) : this._visual[t] = r;
    }, e.prototype.getItemVisual = function(t, r) {
      var i = this._itemVisuals[t], n = i && i[r];
      return n ?? this.getVisual(r);
    }, e.prototype.hasItemVisual = function() {
      return this._itemVisuals.length > 0;
    }, e.prototype.ensureUniqueItemVisual = function(t, r) {
      var i = this._itemVisuals, n = i[t];
      n || (n = i[t] = {});
      var a = n[r];
      return a == null && (a = this.getVisual(r), B(a) ? a = a.slice() : Qi(a) && (a = R({}, a)), n[r] = a), a;
    }, e.prototype.setItemVisual = function(t, r, i) {
      var n = this._itemVisuals[t] || {};
      this._itemVisuals[t] = n, Qi(r) ? R(n, r) : n[r] = i;
    }, e.prototype.clearAllVisual = function() {
      this._visual = {}, this._itemVisuals = [];
    }, e.prototype.setLayout = function(t, r) {
      Qi(t) ? R(this._layout, t) : this._layout[t] = r;
    }, e.prototype.getLayout = function(t) {
      return this._layout[t];
    }, e.prototype.getItemLayout = function(t) {
      return this._itemLayouts[t];
    }, e.prototype.setItemLayout = function(t, r, i) {
      this._itemLayouts[t] = i ? R(this._itemLayouts[t] || {}, r) : r;
    }, e.prototype.clearItemLayouts = function() {
      this._itemLayouts.length = 0;
    }, e.prototype.setItemGraphicEl = function(t, r) {
      var i = this.hostModel && this.hostModel.seriesIndex;
      PS(i, this.dataType, t, r), this._graphicEls[t] = r;
    }, e.prototype.getItemGraphicEl = function(t) {
      return this._graphicEls[t];
    }, e.prototype.eachItemGraphicEl = function(t, r) {
      D(this._graphicEls, function(i, n) {
        i && t && t.call(r, i, n);
      });
    }, e.prototype.cloneShallow = function(t) {
      return t || (t = new e(this._schema ? this._schema : er(this.dimensions, this._getDimInfo, this), this.hostModel)), Hs(t, this), t._store = this._store, t;
    }, e.prototype.wrapMethod = function(t, r) {
      var i = this[t];
      rt(i) && (this.__wrappedMethods = this.__wrappedMethods || [], this.__wrappedMethods.push(t), this[t] = function() {
        var n = i.apply(this, arguments);
        return r.apply(this, [n].concat(Ql(arguments)));
      });
    }, e.internalField = (function() {
      Df = function(t) {
        var r = t._invertedIndicesMap;
        D(r, function(i, n) {
          var a = t._dimInfos[n], o = a.ordinalMeta, s = t._store;
          if (o) {
            i = r[n] = new T2(o.categories.length);
            for (var l = 0; l < i.length; l++)
              i[l] = Cf;
            for (var l = 0; l < s.count(); l++)
              i[s.get(a.storeDimIndex, l)] = l;
          }
        });
      }, Ji = function(t, r, i) {
        return ke(t._getCategory(r, i), null);
      }, Ta = function(t, r) {
        var i = t._idList[r];
        return i == null && t._idDimIdx != null && (i = Ji(t, t._idDimIdx, r)), i == null && (i = C2 + r), i;
      }, tn = function(t) {
        return B(t) || (t = t != null ? [t] : []), t;
      }, en = function(t) {
        var r = new e(t._schema ? t._schema : er(t.dimensions, t._getDimInfo, t), t.hostModel);
        return Hs(r, t), r;
      }, Hs = function(t, r) {
        D(D2.concat(r.__wrappedMethods || []), function(i) {
          r.hasOwnProperty(i) && (t[i] = r[i]);
        }), t.__wrappedMethods = r.__wrappedMethods, D(M2, function(i) {
          t[i] = Q(r[i]);
        }), t._calculationInfo = R({}, r._calculationInfo);
      }, Us = function(t, r) {
        var i = t._nameList, n = t._idList, a = t._nameDimIdx, o = t._idDimIdx, s = i[r], l = n[r];
        if (s == null && a != null && (i[r] = s = Ji(t, a, r)), l == null && o != null && (n[r] = l = Ji(t, o, r)), l == null && s != null) {
          var u = t._nameRepeatCount, c = u[s] = (u[s] || 0) + 1;
          l = s, c > 1 && (l += "__ec__" + c), n[r] = l;
        }
      };
    })(), e;
  })()
);
function P2(e, t) {
  Au(e) || (e = Yd(e)), t = t || {};
  var r = t.coordDimensions || [], i = t.dimensionsDefine || e.dimensionsDefine || [], n = tt(), a = [], o = k2(e, r, i, t.dimensionsCount), s = t.canOmitUnusedDimensions && Wp(o), l = i === e.dimensionsDefine, u = l ? Gp(e) : Vp(i), c = t.encodeDefine;
  !c && t.encodeDefaulter && (c = t.encodeDefaulter(e, o));
  for (var h = tt(c), v = new tp(o), f = 0; f < v.length; f++)
    v[f] = -1;
  function d(C) {
    var M = v[C];
    if (M < 0) {
      var A = i[C], I = F(A) ? A : {
        name: A
      }, k = new Ha(), P = I.name;
      P != null && u.get(P) != null && (k.name = k.displayName = P), I.type != null && (k.type = I.type), I.displayName != null && (k.displayName = I.displayName);
      var E = a.length;
      return v[C] = E, k.storeDimIndex = C, a.push(k), k;
    }
    return a[M];
  }
  if (!s)
    for (var f = 0; f < o; f++)
      d(f);
  h.each(function(C, M) {
    var A = $t(C).slice();
    if (A.length === 1 && !U(A[0]) && A[0] < 0) {
      h.set(M, !1);
      return;
    }
    var I = h.set(M, []);
    D(A, function(k, P) {
      var E = U(k) ? u.get(k) : k;
      E != null && E < o && (I[P] = E, p(d(E), M, P));
    });
  });
  var _ = 0;
  D(r, function(C) {
    var M, A, I, k;
    if (U(C))
      M = C, k = {};
    else {
      k = C, M = k.name;
      var P = k.ordinalMeta;
      k.ordinalMeta = null, k = R({}, k), k.ordinalMeta = P, A = k.dimsDef, I = k.otherDims, k.name = k.coordDim = k.coordDimIndex = k.dimsDef = k.otherDims = null;
    }
    var E = h.get(M);
    if (E !== !1) {
      if (E = $t(E), !E.length)
        for (var O = 0; O < (A && A.length || 1); O++) {
          for (; _ < o && d(_).coordDim != null; )
            _++;
          _ < o && E.push(_++);
        }
      D(E, function(Y, q) {
        var N = d(Y);
        if (l && k.type != null && (N.type = k.type), p(ct(N, k), M, q), N.name == null && A) {
          var X = A[q];
          !F(X) && (X = {
            name: X
          }), N.name = N.displayName = X.name, N.defaultTooltip = X.defaultTooltip;
        }
        I && ct(N.otherDims, I);
      });
    }
  });
  function p(C, M, A) {
    Bd.get(M) != null ? C.otherDims[M] = A : (C.coordDim = M, C.coordDimIndex = A, n.set(M, !0));
  }
  var g = t.generateCoord, m = t.generateCoordCount, y = m != null;
  m = g ? m || 1 : 0;
  var w = g || "value";
  function S(C) {
    C.name == null && (C.name = C.coordDim);
  }
  if (s)
    D(a, function(C) {
      S(C);
    }), a.sort(function(C, M) {
      return C.storeDimIndex - M.storeDimIndex;
    });
  else
    for (var b = 0; b < o; b++) {
      var x = d(b), T = x.coordDim;
      T == null && (x.coordDim = L2(w, n, y), x.coordDimIndex = 0, (!g || m <= 0) && (x.isExtraCoord = !0), m--), S(x), x.type == null && (zd(e, b) === Tt.Must || x.isExtraCoord && (x.otherDims.itemName != null || x.otherDims.seriesName != null)) && (x.type = "ordinal");
    }
  return I2(a), new Up({
    source: e,
    dimensions: a,
    fullDimensionCount: o,
    dimensionOmitted: s
  });
}
function I2(e) {
  for (var t = tt(), r = 0; r < e.length; r++) {
    var i = e[r], n = i.name, a = t.get(n) || 0;
    a > 0 && (i.name = n + (a - 1)), a++, t.set(n, a);
  }
}
function k2(e, t, r, i) {
  var n = Math.max(e.dimensionsDetectedCount || 1, t.length, r.length, i || 0);
  return D(t, function(a) {
    var o;
    F(a) && (o = a.dimsDef) && (n = Math.max(n, o.length));
  }), n;
}
function L2(e, t, r) {
  if (r || t.hasKey(e)) {
    for (var i = 0; t.hasKey(e + i); )
      i++;
    e += i;
  }
  return t.set(e, !0), e;
}
function Yp(e, t) {
  return e.type === "category" ? e.scale.getLabel(t) : t.value;
}
function R2(e) {
  var t = e.get("interval");
  return t ?? "auto";
}
function $2(e) {
  return e.type === "category" && R2(e.getLabelModel()) === 0;
}
var Mf = [], E2 = {
  registerPreprocessor: Fp,
  registerProcessor: zp,
  registerPostInit: h2,
  registerPostUpdate: f2,
  registerUpdateLifecycle: $u,
  registerAction: $i,
  registerCoordinateSystem: v2,
  registerLayout: d2,
  registerVisual: Zr,
  registerTransform: g2,
  registerLoading: Hp,
  registerMap: p2,
  registerImpl: WD,
  PRIORITY: n2,
  ComponentModel: at,
  ComponentView: dr,
  SeriesModel: vr,
  ChartView: hr,
  // TODO Use ComponentModel and SeriesModel instead of Constructor
  registerComponentModel: function(e) {
    at.registerClass(e);
  },
  registerComponentView: function(e) {
    dr.registerClass(e);
  },
  registerSeriesModel: function(e) {
    vr.registerClass(e);
  },
  registerChartView: function(e) {
    hr.registerClass(e);
  },
  registerSubTypeDefaulter: function(e, t) {
    at.registerSubTypeDefaulter(e, t);
  },
  registerPainter: function(e, t) {
    ub(e, t);
  }
};
function Ou(e) {
  if (B(e)) {
    D(e, function(t) {
      Ou(t);
    });
    return;
  }
  st(Mf, e) >= 0 || (Mf.push(e), rt(e) && (e = {
    install: e
  }), e.install(E2));
}
function qp(e, t, r, i, n, a, o, s) {
  var l = n - e, u = a - t, c = r - e, h = i - t, v = Math.sqrt(c * c + h * h);
  c /= v, h /= v;
  var f = l * c + u * h, d = f / v;
  d *= v;
  var _ = o[0] = e + d * c, p = o[1] = t + d * h;
  return Math.sqrt((_ - n) * (_ - n) + (p - a) * (p - a));
}
var or = new V(), ut = new V(), Ct = new V(), sr = new V(), De = new V(), go = [], Lt = new V();
function O2(e, t) {
  if (t <= 180 && t > 0) {
    t = t / 180 * Math.PI, or.fromArray(e[0]), ut.fromArray(e[1]), Ct.fromArray(e[2]), V.sub(sr, or, ut), V.sub(De, Ct, ut);
    var r = sr.len(), i = De.len();
    if (!(r < 1e-3 || i < 1e-3)) {
      sr.scale(1 / r), De.scale(1 / i);
      var n = sr.dot(De), a = Math.cos(t);
      if (a < n) {
        var o = qp(ut.x, ut.y, Ct.x, Ct.y, or.x, or.y, go);
        Lt.fromArray(go), Lt.scaleAndAdd(De, o / Math.tan(Math.PI - t));
        var s = Ct.x !== ut.x ? (Lt.x - ut.x) / (Ct.x - ut.x) : (Lt.y - ut.y) / (Ct.y - ut.y);
        if (isNaN(s))
          return;
        s < 0 ? V.copy(Lt, ut) : s > 1 && V.copy(Lt, Ct), Lt.toArray(e[1]);
      }
    }
  }
}
function B2(e, t, r) {
  if (r <= 180 && r > 0) {
    r = r / 180 * Math.PI, or.fromArray(e[0]), ut.fromArray(e[1]), Ct.fromArray(e[2]), V.sub(sr, ut, or), V.sub(De, Ct, ut);
    var i = sr.len(), n = De.len();
    if (!(i < 1e-3 || n < 1e-3)) {
      sr.scale(1 / i), De.scale(1 / n);
      var a = sr.dot(t), o = Math.cos(r);
      if (a < o) {
        var s = qp(ut.x, ut.y, Ct.x, Ct.y, or.x, or.y, go);
        Lt.fromArray(go);
        var l = Math.PI / 2, u = Math.acos(De.dot(t)), c = l + u - r;
        if (c >= l)
          V.copy(Lt, Ct);
        else {
          Lt.scaleAndAdd(De, s / Math.tan(Math.PI / 2 - c));
          var h = Ct.x !== ut.x ? (Lt.x - ut.x) / (Ct.x - ut.x) : (Lt.y - ut.y) / (Ct.y - ut.y);
          if (isNaN(h))
            return;
          h < 0 ? V.copy(Lt, ut) : h > 1 && V.copy(Lt, Ct);
        }
        Lt.toArray(e[1]);
      }
    }
  }
}
function Vs(e, t, r, i) {
  var n = r === "normal", a = n ? e : e.ensureState(r);
  a.ignore = t;
  var o = i.get("smooth");
  o && o === !0 && (o = 0.3), a.shape = a.shape || {}, o > 0 && (a.shape.smooth = o);
  var s = i.getModel("lineStyle").getLineStyle();
  n ? e.useStyle(s) : a.style = s;
}
function N2(e, t) {
  var r = t.smooth, i = t.points;
  if (i)
    if (e.moveTo(i[0][0], i[0][1]), r > 0 && i.length >= 3) {
      var n = Js(i[0], i[1]), a = Js(i[1], i[2]);
      if (!n || !a) {
        e.lineTo(i[1][0], i[1][1]), e.lineTo(i[2][0], i[2][1]);
        return;
      }
      var o = Math.min(n, a) * r, s = Fo([], i[1], i[0], o / n), l = Fo([], i[1], i[2], o / a), u = Fo([], s, l, 0.5);
      e.bezierCurveTo(s[0], s[1], s[0], s[1], u[0], u[1]), e.bezierCurveTo(l[0], l[1], l[0], l[1], i[2][0], i[2][1]);
    } else
      for (var c = 1; c < i.length; c++)
        e.lineTo(i[c][0], i[c][1]);
}
function F2(e, t, r) {
  var i = e.getTextGuideLine(), n = e.getTextContent();
  if (!n) {
    i && e.removeTextGuideLine();
    return;
  }
  for (var a = t.normal, o = a.get("show"), s = n.ignore, l = 0; l < eo.length; l++) {
    var u = eo[l], c = t[u], h = u === "normal";
    if (c) {
      var v = c.get("show"), f = h ? s : K(n.states[u] && n.states[u].ignore, s);
      if (f || !K(v, o)) {
        var d = h ? i : i && i.states[u];
        d && (d.ignore = !0), i && Vs(i, !0, u, c);
        continue;
      }
      i || (i = new Zn(), e.setTextGuideLine(i), !h && (s || !o) && Vs(i, !0, "normal", t.normal), e.stateProxy && (i.stateProxy = e.stateProxy)), Vs(i, !1, u, c);
    }
  }
  if (i) {
    ct(i.style, r), i.style.fill = null;
    var _ = a.get("showAbove"), p = e.textGuideLineConfig = e.textGuideLineConfig || {};
    p.showAbove = _ || !1, i.buildPath = N2;
  }
}
function z2(e, t) {
  t = t || "labelLine";
  for (var r = {
    normal: e.getModel(t)
  }, i = 0; i < Le.length; i++) {
    var n = Le[i];
    r[n] = e.getModel([n, t]);
  }
  return r;
}
function H2(e) {
  for (var t = [], r = 0; r < e.length; r++) {
    var i = e[r];
    if (!i.defaultAttr.ignore) {
      var n = i.label, a = n.getComputedTransform(), o = n.getBoundingRect(), s = !a || a[1] < 1e-5 && a[2] < 1e-5, l = n.style.margin || 0, u = o.clone();
      u.applyTransform(a), u.x -= l / 2, u.y -= l / 2, u.width += l, u.height += l;
      var c = s ? new ro(o, a) : null;
      t.push({
        label: n,
        labelLine: i.labelLine,
        rect: u,
        localRect: o,
        obb: c,
        priority: i.priority,
        defaultAttr: i.defaultAttr,
        layoutOption: i.computedLayoutOption,
        axisAligned: s,
        transform: a
      });
    }
  }
  return t;
}
function U2(e, t, r, i, n, a) {
  var o = e.length;
  if (o < 2)
    return;
  e.sort(function(b, x) {
    return b.rect[t] - x.rect[t];
  });
  for (var s = 0, l, u = !1, c = 0; c < o; c++) {
    var h = e[c], v = h.rect;
    l = v[t] - s, l < 0 && (v[t] -= l, h.label[t] -= l, u = !0), s = v[t] + v[r];
  }
  var f = e[0], d = e[o - 1], _, p;
  g(), _ < 0 && w(-_, 0.8), p < 0 && w(p, 0.8), g(), m(_, p, 1), m(p, _, -1), g(), _ < 0 && S(-_), p < 0 && S(p);
  function g() {
    _ = f.rect[t] - i, p = n - d.rect[t] - d.rect[r];
  }
  function m(b, x, T) {
    if (b < 0) {
      var C = Math.min(x, -b);
      if (C > 0) {
        y(C * T, 0, o);
        var M = C + b;
        M < 0 && w(-M * T, 1);
      } else
        w(-b * T, 1);
    }
  }
  function y(b, x, T) {
    b !== 0 && (u = !0);
    for (var C = x; C < T; C++) {
      var M = e[C], A = M.rect;
      A[t] += b, M.label[t] += b;
    }
  }
  function w(b, x) {
    for (var T = [], C = 0, M = 1; M < o; M++) {
      var A = e[M - 1].rect, I = Math.max(e[M].rect[t] - A[t] - A[r], 0);
      T.push(I), C += I;
    }
    if (C) {
      var k = Math.min(Math.abs(b) / C, x);
      if (b > 0)
        for (var M = 0; M < o - 1; M++) {
          var P = T[M] * k;
          y(P, 0, M + 1);
        }
      else
        for (var M = o - 1; M > 0; M--) {
          var P = T[M - 1] * k;
          y(-P, M, o);
        }
    }
  }
  function S(b) {
    var x = b < 0 ? -1 : 1;
    b = Math.abs(b);
    for (var T = Math.ceil(b / (o - 1)), C = 0; C < o - 1; C++)
      if (x > 0 ? y(T, 0, C + 1) : y(-T, o - C - 1, o), b -= T, b <= 0)
        return;
  }
  return u;
}
function V2(e, t, r, i) {
  return U2(e, "y", "height", t, r);
}
function G2(e) {
  var t = [];
  e.sort(function(_, p) {
    return p.priority - _.priority;
  });
  var r = new it(0, 0, 0, 0);
  function i(_) {
    if (!_.ignore) {
      var p = _.ensureState("emphasis");
      p.ignore == null && (p.ignore = !1);
    }
    _.ignore = !0;
  }
  for (var n = 0; n < e.length; n++) {
    var a = e[n], o = a.axisAligned, s = a.localRect, l = a.transform, u = a.label, c = a.labelLine;
    r.copy(a.rect), r.width -= 0.1, r.height -= 0.1, r.x += 0.05, r.y += 0.05;
    for (var h = a.obb, v = !1, f = 0; f < t.length; f++) {
      var d = t[f];
      if (r.intersect(d.rect)) {
        if (o && d.axisAligned) {
          v = !0;
          break;
        }
        if (d.obb || (d.obb = new ro(d.localRect, d.transform)), h || (h = new ro(s, l)), h.intersect(d.obb)) {
          v = !0;
          break;
        }
      }
    }
    v ? (i(u), c && i(c)) : (u.attr("ignore", a.defaultAttr.ignore), c && c.attr("ignore", a.defaultAttr.labelGuideIgnore), t.push(a));
  }
}
function Ca(e, t, r) {
  var i = e.get("borderRadius");
  if (i == null)
    return r ? {
      cornerRadius: 0
    } : null;
  B(i) || (i = [i, i, i, i]);
  var n = Math.abs(t.r || 0 - t.r0 || 0);
  return {
    cornerRadius: J(i, function(a) {
      return Ai(a, n);
    })
  };
}
var Af = Math.PI * 2, Da = Math.PI / 180;
function Xp(e, t) {
  return $d(e.getBoxLayoutParams(), {
    width: t.getWidth(),
    height: t.getHeight()
  });
}
function Zp(e, t) {
  var r = Xp(e, t), i = e.get("center"), n = e.get("radius");
  B(n) || (n = [0, n]);
  var a = yt(r.width, t.getWidth()), o = yt(r.height, t.getHeight()), s = Math.min(a, o), l = yt(n[0], s / 2), u = yt(n[1], s / 2), c, h, v = e.coordinateSystem;
  if (v) {
    var f = v.dataToPoint(i);
    c = f[0] || 0, h = f[1] || 0;
  } else
    B(i) || (i = [i, i]), c = yt(i[0], a) + r.x, h = yt(i[1], o) + r.y;
  return {
    cx: c,
    cy: h,
    r0: l,
    r: u
  };
}
function W2(e, t, r) {
  t.eachSeriesByType(e, function(i) {
    var n = i.getData(), a = n.mapDimension("value"), o = Xp(i, r), s = Zp(i, r), l = s.cx, u = s.cy, c = s.r, h = s.r0, v = -i.get("startAngle") * Da, f = i.get("endAngle"), d = i.get("padAngle") * Da;
    f = f === "auto" ? v - Af : -f * Da;
    var _ = i.get("minAngle") * Da, p = _ + d, g = 0;
    n.each(a, function(Y) {
      !isNaN(Y) && g++;
    });
    var m = n.getSum(a), y = Math.PI / (m || g) * 2, w = i.get("clockwise"), S = i.get("roseType"), b = i.get("stillShowZeroSum"), x = n.getDataExtent(a);
    x[0] = 0;
    var T = w ? 1 : -1, C = [v, f], M = T * d / 2;
    Kv(C, !w), v = C[0], f = C[1];
    var A = Kp(i);
    A.startAngle = v, A.endAngle = f, A.clockwise = w;
    var I = Math.abs(f - v), k = I, P = 0, E = v;
    if (n.setLayout({
      viewRect: o,
      r: c
    }), n.each(a, function(Y, q) {
      var N;
      if (isNaN(Y)) {
        n.setItemLayout(q, {
          angle: NaN,
          startAngle: NaN,
          endAngle: NaN,
          clockwise: w,
          cx: l,
          cy: u,
          r0: h,
          r: S ? NaN : c
        });
        return;
      }
      S !== "area" ? N = m === 0 && b ? y : Y * y : N = I / g, N < p ? (N = p, k -= p) : P += Y;
      var X = E + T * N, j = 0, W = 0;
      d > N ? (j = E + T * N / 2, W = j) : (j = E + M, W = X - M), n.setItemLayout(q, {
        angle: N,
        startAngle: j,
        endAngle: W,
        clockwise: w,
        cx: l,
        cy: u,
        r0: h,
        r: S ? hb(Y, x, [h, c]) : c
      }), E = X;
    }), k < Af && g)
      if (k <= 1e-3) {
        var O = I / g;
        n.each(a, function(Y, q) {
          if (!isNaN(Y)) {
            var N = n.getItemLayout(q);
            N.angle = O;
            var X = 0, j = 0;
            O < d ? (X = v + T * (q + 1 / 2) * O, j = X) : (X = v + T * q * O + M, j = v + T * (q + 1) * O - M), N.startAngle = X, N.endAngle = j;
          }
        });
      } else
        y = k / P, E = v, n.each(a, function(Y, q) {
          if (!isNaN(Y)) {
            var N = n.getItemLayout(q), X = N.angle === p ? p : Y * y, j = 0, W = 0;
            X < d ? (j = E + T * X / 2, W = j) : (j = E + M, W = E + T * X - M), N.startAngle = j, N.endAngle = W, E += T * X;
          }
        });
  });
}
var Kp = wt();
function Y2(e) {
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
var q2 = Math.PI / 180;
function Pf(e, t, r, i, n, a, o, s, l, u) {
  if (e.length < 2)
    return;
  function c(_) {
    for (var p = _.rB, g = p * p, m = 0; m < _.list.length; m++) {
      var y = _.list[m], w = Math.abs(y.label.y - r), S = i + y.len, b = S * S, x = Math.sqrt(Math.abs((1 - w * w / g) * b)), T = t + (x + y.len2) * n, C = T - y.label.x, M = y.targetTextWidth - C * n;
      jp(y, M, !0), y.label.x = T;
    }
  }
  function h(_) {
    for (var p = {
      list: [],
      maxY: 0
    }, g = {
      list: [],
      maxY: 0
    }, m = 0; m < _.length; m++)
      if (_[m].labelAlignTo === "none") {
        var y = _[m], w = y.label.y > r ? g : p, S = Math.abs(y.label.y - r);
        if (S >= w.maxY) {
          var b = y.label.x - t - y.len2 * n, x = i + y.len, T = Math.abs(b) < x ? Math.sqrt(S * S / (1 - b * b / x / x)) : x;
          w.rB = T, w.maxY = S;
        }
        w.list.push(y);
      }
    c(p), c(g);
  }
  for (var v = e.length, f = 0; f < v; f++)
    if (e[f].position === "outer" && e[f].labelAlignTo === "labelLine") {
      var d = e[f].label.x - u;
      e[f].linePoints[1][0] += d, e[f].label.x = u;
    }
  V2(e, l, l + o) && h(e);
}
function X2(e, t, r, i, n, a, o, s) {
  for (var l = [], u = [], c = Number.MAX_VALUE, h = -Number.MAX_VALUE, v = 0; v < e.length; v++) {
    var f = e[v].label;
    Gs(e[v]) || (f.x < t ? (c = Math.min(c, f.x), l.push(e[v])) : (h = Math.max(h, f.x), u.push(e[v])));
  }
  for (var v = 0; v < e.length; v++) {
    var d = e[v];
    if (!Gs(d) && d.linePoints) {
      if (d.labelStyleWidth != null)
        continue;
      var f = d.label, _ = d.linePoints, p = void 0;
      d.labelAlignTo === "edge" ? f.x < t ? p = _[2][0] - d.labelDistance - o - d.edgeDistance : p = o + n - d.edgeDistance - _[2][0] - d.labelDistance : d.labelAlignTo === "labelLine" ? f.x < t ? p = c - o - d.bleedMargin : p = o + n - h - d.bleedMargin : f.x < t ? p = f.x - o - d.bleedMargin : p = o + n - f.x - d.bleedMargin, d.targetTextWidth = p, jp(d, p);
    }
  }
  Pf(u, t, r, i, 1, n, a, o, s, h), Pf(l, t, r, i, -1, n, a, o, s, c);
  for (var v = 0; v < e.length; v++) {
    var d = e[v];
    if (!Gs(d) && d.linePoints) {
      var f = d.label, _ = d.linePoints, g = d.labelAlignTo === "edge", m = f.style.padding, y = m ? m[1] + m[3] : 0, w = f.style.backgroundColor ? 0 : y, S = d.rect.width + w, b = _[1][0] - _[2][0];
      g ? f.x < t ? _[2][0] = o + d.edgeDistance + S + d.labelDistance : _[2][0] = o + n - d.edgeDistance - S - d.labelDistance : (f.x < t ? _[2][0] = f.x + d.labelDistance : _[2][0] = f.x - d.labelDistance, _[1][0] = _[2][0] + b), _[1][1] = _[2][1] = f.y;
    }
  }
}
function jp(e, t, r) {
  if (r === void 0 && (r = !1), e.labelStyleWidth == null) {
    var i = e.label, n = i.style, a = e.rect, o = n.backgroundColor, s = n.padding, l = s ? s[1] + s[3] : 0, u = n.overflow, c = a.width + (o ? 0 : l);
    if (t < c || r) {
      var h = a.height;
      if (u && u.match("break")) {
        i.setStyle("backgroundColor", null), i.setStyle("width", t - l);
        var v = i.getBoundingRect();
        i.setStyle("width", Math.ceil(v.width)), i.setStyle("backgroundColor", o);
      } else {
        var f = t - l, d = t < c ? f : (
          // Current available width is enough, but the text may have
          // already been wrapped with a smaller available width.
          r ? f > e.unconstrainedWidth ? null : f : null
        );
        i.setStyle("width", d);
      }
      var _ = i.getBoundingRect();
      a.width = _.width;
      var p = (i.style.margin || 0) + 2.1;
      a.height = _.height + p, a.y -= (a.height - h) / 2;
    }
  }
}
function Gs(e) {
  return e.position === "center";
}
function Z2(e) {
  var t = e.getData(), r = [], i, n, a = !1, o = (e.get("minShowLabelAngle") || 0) * q2, s = t.getLayout("viewRect"), l = t.getLayout("r"), u = s.width, c = s.x, h = s.y, v = s.height;
  function f(b) {
    b.ignore = !0;
  }
  function d(b) {
    if (!b.ignore)
      return !0;
    for (var x in b.states)
      if (b.states[x].ignore === !1)
        return !0;
    return !1;
  }
  t.each(function(b) {
    var x = t.getItemGraphicEl(b), T = x.shape, C = x.getTextContent(), M = x.getTextGuideLine(), A = t.getItemModel(b), I = A.getModel("label"), k = I.get("position") || A.get(["emphasis", "label", "position"]), P = I.get("distanceToLabelLine"), E = I.get("alignTo"), O = yt(I.get("edgeDistance"), u), Y = I.get("bleedMargin"), q = A.getModel("labelLine"), N = q.get("length");
    N = yt(N, u);
    var X = q.get("length2");
    if (X = yt(X, u), Math.abs(T.endAngle - T.startAngle) < o) {
      D(C.states, f), C.ignore = !0, M && (D(M.states, f), M.ignore = !0);
      return;
    }
    if (d(C)) {
      var j = (T.startAngle + T.endAngle) / 2, W = Math.cos(j), gt = Math.sin(j), bt, Yt, ye, Qt;
      i = T.cx, n = T.cy;
      var qt = k === "inside" || k === "inner";
      if (k === "center")
        bt = T.cx, Yt = T.cy, Qt = "center";
      else {
        var xt = (qt ? (T.r + T.r0) / 2 * W : T.r * W) + i, ht = (qt ? (T.r + T.r0) / 2 * gt : T.r * gt) + n;
        if (bt = xt + W * 3, Yt = ht + gt * 3, !qt) {
          var z = xt + W * (N + l - T.r), Z = ht + gt * (N + l - T.r), we = z + (W < 0 ? -1 : 1) * X, St = Z;
          E === "edge" ? bt = W < 0 ? c + O : c + u - O : bt = we + (W < 0 ? -P : P), Yt = St, ye = [[xt, ht], [z, Z], [we, St]];
        }
        Qt = qt ? "center" : E === "edge" ? W > 0 ? "right" : "left" : W > 0 ? "left" : "right";
      }
      var Ze = Math.PI, Oe = 0, Ei = I.get("rotate");
      if (mt(Ei))
        Oe = Ei * (Ze / 180);
      else if (k === "center")
        Oe = 0;
      else if (Ei === "radial" || Ei === !0) {
        var lg = W < 0 ? -j + Ze : -j;
        Oe = lg;
      } else if (Ei === "tangential" && k !== "outside" && k !== "outer") {
        var Kr = Math.atan2(W, gt);
        Kr < 0 && (Kr = Ze * 2 + Kr);
        var ug = gt > 0;
        ug && (Kr = Ze + Kr), Oe = Kr - Ze;
      }
      if (a = !!Oe, C.x = bt, C.y = Yt, C.rotation = Oe, C.setStyle({
        verticalAlign: "middle"
      }), qt) {
        C.setStyle({
          align: Qt
        });
        var Oo = C.states.select;
        Oo && (Oo.x += C.x, Oo.y += C.y);
      } else {
        var Oi = C.getBoundingRect().clone();
        Oi.applyTransform(C.getComputedTransform());
        var zu = (C.style.margin || 0) + 2.1;
        Oi.y -= zu / 2, Oi.height += zu, r.push({
          label: C,
          labelLine: M,
          position: k,
          len: N,
          len2: X,
          minTurnAngle: q.get("minTurnAngle"),
          maxSurfaceAngle: q.get("maxSurfaceAngle"),
          surfaceNormal: new V(W, gt),
          linePoints: ye,
          textAlign: Qt,
          labelDistance: P,
          labelAlignTo: E,
          edgeDistance: O,
          bleedMargin: Y,
          rect: Oi,
          unconstrainedWidth: Oi.width,
          labelStyleWidth: C.style.width
        });
      }
      x.setTextConfig({
        inside: qt
      });
    }
  }), !a && e.get("avoidLabelOverlap") && X2(r, i, n, l, u, v, c, h);
  for (var _ = 0; _ < r.length; _++) {
    var p = r[_], g = p.label, m = p.labelLine, y = isNaN(g.x) || isNaN(g.y);
    if (g) {
      g.setStyle({
        align: p.textAlign
      }), y && (D(g.states, f), g.ignore = !0);
      var w = g.states.select;
      w && (w.x += g.x, w.y += g.y);
    }
    if (m) {
      var S = p.linePoints;
      y || !S ? (D(m.states, f), m.ignore = !0) : (O2(S, p.minTurnAngle), B2(S, p.surfaceNormal, p.maxSurfaceAngle), m.setShape({
        points: S
      }), g.__hostTarget.textGuideLineConfig = {
        anchor: new V(S[0][0], S[0][1])
      });
    }
  }
}
var K2 = (
  /** @class */
  (function(e) {
    G(t, e);
    function t(r, i, n) {
      var a = e.call(this) || this;
      a.z2 = 2;
      var o = new pe();
      return a.setTextContent(o), a.updateData(r, i, n, !0), a;
    }
    return t.prototype.updateData = function(r, i, n, a) {
      var o = this, s = r.hostModel, l = r.getItemModel(i), u = l.getModel("emphasis"), c = r.getItemLayout(i), h = R(Ca(l.getModel("itemStyle"), c, !0), c);
      if (isNaN(h.startAngle)) {
        o.setShape(h);
        return;
      }
      if (a) {
        o.setShape(h);
        var v = s.getShallow("animationType");
        s.ecModel.ssr ? (Ba(o, {
          scaleX: 0,
          scaleY: 0
        }, s, {
          dataIndex: i,
          isFrom: !0
        }), o.originX = h.cx, o.originY = h.cy) : v === "scale" ? (o.shape.r = c.r0, Ba(o, {
          shape: {
            r: c.r
          }
        }, s, i)) : n != null ? (o.setShape({
          startAngle: n,
          endAngle: n
        }), Ba(o, {
          shape: {
            startAngle: c.startAngle,
            endAngle: c.endAngle
          }
        }, s, i)) : (o.shape.endAngle = c.startAngle, Ln(o, {
          shape: {
            endAngle: c.endAngle
          }
        }, s, i));
      } else
        kx(o), Ln(o, {
          shape: h
        }, s, i);
      o.useStyle(r.getItemVisual(i, "style")), KS(o, l);
      var f = (c.startAngle + c.endAngle) / 2, d = s.get("selectedOffset"), _ = Math.cos(f) * d, p = Math.sin(f) * d, g = l.getShallow("cursor");
      g && o.attr("cursor", g), this._updateLabel(s, r, i), o.ensureState("emphasis").shape = R({
        r: c.r + (u.get("scale") && u.get("scaleSize") || 0)
      }, Ca(u.getModel("itemStyle"), c)), R(o.ensureState("select"), {
        x: _,
        y: p,
        shape: Ca(l.getModel(["select", "itemStyle"]), c)
      }), R(o.ensureState("blur"), {
        shape: Ca(l.getModel(["blur", "itemStyle"]), c)
      });
      var m = o.getTextGuideLine(), y = o.getTextContent();
      m && R(m.ensureState("select"), {
        x: _,
        y: p
      }), R(y.ensureState("select"), {
        x: _,
        y: p
      }), qS(this, u.get("focus"), u.get("blurScope"), u.get("disabled"));
    }, t.prototype._updateLabel = function(r, i, n) {
      var a = this, o = i.getItemModel(n), s = o.getModel("labelLine"), l = i.getItemVisual(n, "style"), u = l && l.fill, c = l && l.opacity;
      Zx(a, Kx(o), {
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
      var v = r.get(["label", "position"]);
      if (v !== "outside" && v !== "outer")
        a.removeTextGuideLine();
      else {
        var f = this.getTextGuideLine();
        f || (f = new Zn(), this.setTextGuideLine(f)), F2(this, z2(o), {
          stroke: u,
          opacity: hn(s.get(["lineStyle", "opacity"]), c, 1)
        });
      }
    }, t;
  })(Xn)
), j2 = (
  /** @class */
  (function(e) {
    G(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.ignoreLabelLineUpdate = !0, r;
    }
    return t.prototype.render = function(r, i, n, a) {
      var o = r.getData(), s = this._data, l = this.group, u;
      if (!s && o.count() > 0) {
        for (var c = o.getItemLayout(0), h = 1; isNaN(c && c.startAngle) && h < o.count(); ++h)
          c = o.getItemLayout(h);
        c && (u = c.startAngle);
      }
      if (this._emptyCircleSector && l.remove(this._emptyCircleSector), o.count() === 0 && r.get("showEmptyCircle")) {
        var v = Kp(r), f = new Xn({
          shape: R(Zp(r, n), v)
        });
        f.useStyle(r.getModel("emptyCircleStyle").getItemStyle()), this._emptyCircleSector = f, l.add(f);
      }
      o.diff(s).add(function(d) {
        var _ = new K2(o, d, u);
        o.setItemGraphicEl(d, _), l.add(_);
      }).update(function(d, _) {
        var p = s.getItemGraphicEl(_);
        p.updateData(o, d, u), p.off("click"), l.add(p), o.setItemGraphicEl(d, p);
      }).remove(function(d) {
        var _ = s.getItemGraphicEl(d);
        yd(_, r, d);
      }).execute(), Z2(r), r.get("animationTypeUpdate") !== "expansion" && (this._data = o);
    }, t.prototype.dispose = function() {
    }, t.prototype.containPoint = function(r, i) {
      var n = i.getData(), a = n.getItemLayout(0);
      if (a) {
        var o = r[0] - a.cx, s = r[1] - a.cy, l = Math.sqrt(o * o + s * s);
        return l <= a.r && l >= a.r0;
      }
    }, t.type = "pie", t;
  })(hr)
);
function Q2(e, t, r) {
  t = B(t) && {
    coordDimensions: t
  } || R({
    encodeDefine: e.getEncode()
  }, t);
  var i = e.getSource(), n = P2(i, t).dimensions, a = new A2(n, e);
  return a.initData(i, r), a;
}
var J2 = (
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
), tM = wt(), eM = (
  /** @class */
  (function(e) {
    G(t, e);
    function t() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return t.prototype.init = function(r) {
      e.prototype.init.apply(this, arguments), this.legendVisualProvider = new J2(lt(this.getData, this), lt(this.getRawData, this)), this._defaultLabelLine(r);
    }, t.prototype.mergeOption = function() {
      e.prototype.mergeOption.apply(this, arguments);
    }, t.prototype.getInitialData = function() {
      return Q2(this, {
        coordDimensions: ["value"],
        encodeDefaulter: Zt(kT, this)
      });
    }, t.prototype.getDataParams = function(r) {
      var i = this.getData(), n = tM(i), a = n.seats;
      if (!a) {
        var o = [];
        i.each(i.mapDimension("value"), function(l) {
          o.push(l);
        }), a = n.seats = db(o, i.hostModel.get("percentPrecision"));
      }
      var s = e.prototype.getDataParams.call(this, r);
      return s.percent = a[r] || 0, s.$vars.push("percent"), s;
    }, t.prototype._defaultLabelLine = function(r) {
      vl(r, "labelLine", ["show"]);
      var i = r.labelLine, n = r.emphasis.labelLine;
      i.show = i.show && r.label.show, n.show = n.show && r.emphasis.label.show;
    }, t.type = "series.pie", t.defaultOption = {
      // zlevel: 0,
      z: 2,
      legendHoverLink: !0,
      colorBy: "data",
      // 默认全局居中
      center: ["50%", "50%"],
      radius: [0, "75%"],
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
        bleedMargin: 10,
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
        length2: 15,
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
  })(vr)
);
function rM(e) {
  return {
    seriesType: e,
    reset: function(t, r) {
      var i = t.getData();
      i.filterSelf(function(n) {
        var a = i.mapDimension("value"), o = i.get(a, n);
        return !(mt(o) && !isNaN(o) && o < 0);
      });
    }
  };
}
function iM(e) {
  e.registerChartView(j2), e.registerSeriesModel(eM), pD("pie", e.registerAction), e.registerLayout(Zt(W2, "pie")), e.registerProcessor(Y2("pie")), e.registerProcessor(rM("pie"));
}
function If(e, t, r) {
  r = r || {};
  var i = e.coordinateSystem, n = t.axis, a = {}, o = n.getAxesOnZeroOf()[0], s = n.position, l = o ? "onZero" : s, u = n.dim, c = i.getRect(), h = [c.x, c.x + c.width, c.y, c.y + c.height], v = {
    left: 0,
    right: 1,
    top: 0,
    bottom: 1,
    onZero: 2
  }, f = t.get("offset") || 0, d = u === "x" ? [h[2] - f, h[3] + f] : [h[0] - f, h[1] + f];
  if (o) {
    var _ = o.toGlobalCoord(o.dataToCoord(0));
    d[v.onZero] = Math.max(Math.min(_, d[1]), d[0]);
  }
  a.position = [u === "y" ? d[v[l]] : h[0], u === "x" ? d[v[l]] : h[3]], a.rotation = Math.PI / 2 * (u === "x" ? 0 : 1);
  var p = {
    top: -1,
    bottom: 1,
    left: -1,
    right: 1
  };
  a.labelDirection = a.tickDirection = a.nameDirection = p[s], a.labelOffset = o ? d[v[s]] - d[v.onZero] : 0, t.get(["axisTick", "inside"]) && (a.tickDirection = -a.tickDirection), An(r.labelInside, t.get(["axisLabel", "inside"])) && (a.labelDirection = -a.labelDirection);
  var g = t.get(["axisLabel", "rotate"]);
  return a.labelRotate = l === "top" ? -g : g, a.z2 = 1, a;
}
var lr = Math.PI, Gr = (
  /** @class */
  (function() {
    function e(t, r) {
      this.group = new Ve(), this.opt = r, this.axisModel = t, ct(r, {
        labelOffset: 0,
        nameDirection: 1,
        tickDirection: 1,
        labelDirection: 1,
        silent: !0,
        handleAutoShown: function() {
          return !0;
        }
      });
      var i = new Ve({
        x: r.position[0],
        y: r.position[1],
        rotation: r.rotation
      });
      i.updateTransform(), this._transformGroup = i;
    }
    return e.prototype.hasBuilder = function(t) {
      return !!kf[t];
    }, e.prototype.add = function(t) {
      kf[t](this.opt, this.axisModel, this.group, this._transformGroup);
    }, e.prototype.getGroup = function() {
      return this.group;
    }, e.innerTextLayout = function(t, r, i) {
      var n = Bv(r - t), a, o;
      return Qa(n) ? (o = i > 0 ? "top" : "bottom", a = "center") : Qa(n - lr) ? (o = i > 0 ? "bottom" : "top", a = "center") : (o = "middle", n > 0 && n < lr ? a = i > 0 ? "right" : "left" : a = i > 0 ? "left" : "right"), {
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
), kf = {
  axisLine: function(e, t, r, i) {
    var n = t.get(["axisLine", "show"]);
    if (n === "auto" && e.handleAutoShown && (n = e.handleAutoShown("axisLine")), !!n) {
      var a = t.axis.getExtent(), o = i.transform, s = [a[0], 0], l = [a[1], 0], u = s[0] > l[0];
      o && (Ie(s, s, o), Ie(l, l, o));
      var c = R({
        lineCap: "round"
      }, t.getModel(["axisLine", "lineStyle"]).getLineStyle()), h = new Li({
        shape: {
          x1: s[0],
          y1: s[1],
          x2: l[0],
          y2: l[1]
        },
        style: c,
        strokeContainThreshold: e.strokeContainThreshold || 5,
        silent: !0,
        z2: 1
      });
      wu(h.shape, h.style.lineWidth), h.anid = "line", r.add(h);
      var v = t.get(["axisLine", "symbol"]);
      if (v != null) {
        var f = t.get(["axisLine", "symbolSize"]);
        U(v) && (v = [v, v]), (U(f) || mt(f)) && (f = [f, f]);
        var d = AD(t.get(["axisLine", "symbolOffset"]) || 0, f), _ = f[0], p = f[1];
        D([{
          rotate: e.rotation + Math.PI / 2,
          offset: d[0],
          r: 0
        }, {
          rotate: e.rotation - Math.PI / 2,
          offset: d[1],
          r: Math.sqrt((s[0] - l[0]) * (s[0] - l[0]) + (s[1] - l[1]) * (s[1] - l[1]))
        }], function(g, m) {
          if (v[m] !== "none" && v[m] != null) {
            var y = mp(v[m], -_ / 2, -p / 2, _, p, c.stroke, !0), w = g.r + g.offset, S = u ? l : s;
            y.attr({
              rotation: g.rotate,
              x: S[0] + w * Math.cos(e.rotation),
              y: S[1] - w * Math.sin(e.rotation),
              silent: !0,
              z2: 11
            }), r.add(y);
          }
        });
      }
    }
  },
  axisTickLabel: function(e, t, r, i) {
    var n = oM(r, i, t, e), a = lM(r, i, t, e);
    if (aM(t, a, n), sM(r, i, t, e.tickDirection), t.get(["axisLabel", "hideOverlap"])) {
      var o = H2(J(a, function(s) {
        return {
          label: s,
          priority: s.z2,
          defaultAttr: {
            ignore: s.ignore
          }
        };
      }));
      G2(o);
    }
  },
  axisName: function(e, t, r, i) {
    var n = An(e.axisName, t.get("name"));
    if (n) {
      var a = t.get("nameLocation"), o = e.nameDirection, s = t.getModel("nameTextStyle"), l = t.get("nameGap") || 0, u = t.axis.getExtent(), c = u[0] > u[1] ? -1 : 1, h = [
        a === "start" ? u[0] - c * l : a === "end" ? u[1] + c * l : (u[0] + u[1]) / 2,
        // Reuse labelOffset.
        Rf(a) ? e.labelOffset + o * l : 0
      ], v, f = t.get("nameRotate");
      f != null && (f = f * lr / 180);
      var d;
      Rf(a) ? v = Gr.innerTextLayout(
        e.rotation,
        f ?? e.rotation,
        // Adapt to axis.
        o
      ) : (v = nM(e.rotation, a, f || 0, u), d = e.axisNameAvailableWidth, d != null && (d = Math.abs(d / Math.sin(v.rotation)), !isFinite(d) && (d = null)));
      var _ = s.getFont(), p = t.get("nameTruncate", !0) || {}, g = p.ellipsis, m = An(e.nameTruncateMaxWidth, p.maxWidth, d), y = new pe({
        x: h[0],
        y: h[1],
        rotation: v.rotation,
        silent: Gr.isLabelSilent(t),
        style: Rn(s, {
          text: n,
          font: _,
          overflow: "truncate",
          width: m,
          ellipsis: g,
          fill: s.getTextColor() || t.get(["axisLine", "lineStyle", "color"]),
          align: s.get("align") || v.textAlign,
          verticalAlign: s.get("verticalAlign") || v.textVerticalAlign
        }),
        z2: 1
      });
      if (Su({
        el: y,
        componentModel: t,
        itemName: n
      }), y.__fullText = n, y.anid = "name", t.get("triggerEvent")) {
        var w = Gr.makeAxisEventDataBase(t);
        w.targetType = "axisName", w.name = n, vt(y).eventData = w;
      }
      i.add(y), y.updateTransform(), r.add(y), y.decomposeTransform();
    }
  }
};
function nM(e, t, r, i) {
  var n = Bv(r - e), a, o, s = i[0] > i[1], l = t === "start" && !s || t !== "start" && s;
  return Qa(n - lr / 2) ? (o = l ? "bottom" : "top", a = "center") : Qa(n - lr * 1.5) ? (o = l ? "top" : "bottom", a = "center") : (o = "middle", n < lr * 1.5 && n > lr / 2 ? a = l ? "left" : "right" : a = l ? "right" : "left"), {
    rotation: n,
    textAlign: a,
    textVerticalAlign: o
  };
}
function aM(e, t, r) {
  if (!$2(e.axis)) {
    var i = e.get(["axisLabel", "showMinLabel"]), n = e.get(["axisLabel", "showMaxLabel"]);
    t = t || [], r = r || [];
    var a = t[0], o = t[1], s = t[t.length - 1], l = t[t.length - 2], u = r[0], c = r[1], h = r[r.length - 1], v = r[r.length - 2];
    i === !1 ? (te(a), te(u)) : Lf(a, o) && (i ? (te(o), te(c)) : (te(a), te(u))), n === !1 ? (te(s), te(h)) : Lf(l, s) && (n ? (te(l), te(v)) : (te(s), te(h)));
  }
}
function te(e) {
  e && (e.ignore = !0);
}
function Lf(e, t) {
  var r = e && e.getBoundingRect().clone(), i = t && t.getBoundingRect().clone();
  if (!(!r || !i)) {
    var n = tu([]);
    return eu(n, n, -e.rotation), r.applyTransform(yi([], n, e.getLocalTransform())), i.applyTransform(yi([], n, t.getLocalTransform())), r.intersect(i);
  }
}
function Rf(e) {
  return e === "middle" || e === "center";
}
function Qp(e, t, r, i, n) {
  for (var a = [], o = [], s = [], l = 0; l < e.length; l++) {
    var u = e[l].coord;
    o[0] = u, o[1] = 0, s[0] = u, s[1] = r, t && (Ie(o, o, t), Ie(s, s, t));
    var c = new Li({
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
    wu(c.shape, c.style.lineWidth), c.anid = n + "_" + e[l].tickValue, a.push(c);
  }
  return a;
}
function oM(e, t, r, i) {
  var n = r.axis, a = r.getModel("axisTick"), o = a.get("show");
  if (o === "auto" && i.handleAutoShown && (o = i.handleAutoShown("axisTick")), !(!o || n.scale.isBlank())) {
    for (var s = a.getModel("lineStyle"), l = i.tickDirection * a.get("length"), u = n.getTicksCoords(), c = Qp(u, t.transform, l, ct(s.getLineStyle(), {
      stroke: r.get(["axisLine", "lineStyle", "color"])
    }), "ticks"), h = 0; h < c.length; h++)
      e.add(c[h]);
    return c;
  }
}
function sM(e, t, r, i) {
  var n = r.axis, a = r.getModel("minorTick");
  if (!(!a.get("show") || n.scale.isBlank())) {
    var o = n.getMinorTicksCoords();
    if (o.length)
      for (var s = a.getModel("lineStyle"), l = i * a.get("length"), u = ct(s.getLineStyle(), ct(r.getModel("axisTick").getLineStyle(), {
        stroke: r.get(["axisLine", "lineStyle", "color"])
      })), c = 0; c < o.length; c++)
        for (var h = Qp(o[c], t.transform, l, u, "minorticks_" + c), v = 0; v < h.length; v++)
          e.add(h[v]);
  }
}
function lM(e, t, r, i) {
  var n = r.axis, a = An(i.axisLabelShow, r.get(["axisLabel", "show"]));
  if (!(!a || n.scale.isBlank())) {
    var o = r.getModel("axisLabel"), s = o.get("margin"), l = n.getViewLabels(), u = (An(i.labelRotate, o.get("rotate")) || 0) * lr / 180, c = Gr.innerTextLayout(i.rotation, u, i.labelDirection), h = r.getCategories && r.getCategories(!0), v = [], f = Gr.isLabelSilent(r), d = r.get("triggerEvent");
    return D(l, function(_, p) {
      var g = n.scale.type === "ordinal" ? n.scale.getRawOrdinalNumber(_.tickValue) : _.tickValue, m = _.formattedLabel, y = _.rawLabel, w = o;
      if (h && h[g]) {
        var S = h[g];
        F(S) && S.textStyle && (w = new dt(S.textStyle, o, r.ecModel));
      }
      var b = w.getTextColor() || r.get(["axisLine", "lineStyle", "color"]), x = n.dataToCoord(g), T = w.getShallow("align", !0) || c.textAlign, C = K(w.getShallow("alignMinLabel", !0), T), M = K(w.getShallow("alignMaxLabel", !0), T), A = w.getShallow("verticalAlign", !0) || w.getShallow("baseline", !0) || c.textVerticalAlign, I = K(w.getShallow("verticalAlignMinLabel", !0), A), k = K(w.getShallow("verticalAlignMaxLabel", !0), A), P = new pe({
        x,
        y: i.labelOffset + i.labelDirection * s,
        rotation: c.rotation,
        silent: f,
        z2: 10 + (_.level || 0),
        style: Rn(w, {
          text: m,
          align: p === 0 ? C : p === l.length - 1 ? M : T,
          verticalAlign: p === 0 ? I : p === l.length - 1 ? k : A,
          fill: rt(b) ? b(
            // (1) In category axis with data zoom, tick is not the original
            // index of axis.data. So tick should not be exposed to user
            // in category axis.
            // (2) Compatible with previous version, which always use formatted label as
            // input. But in interval scale the formatted label is like '223,445', which
            // maked user replace ','. So we modify it to return original val but remain
            // it as 'string' to avoid error in replacing.
            n.type === "category" ? y : n.type === "value" ? g + "" : g,
            p
          ) : b
        })
      });
      if (P.anid = "label_" + g, Su({
        el: P,
        componentModel: r,
        itemName: m,
        formatterParamsExtra: {
          isTruncated: function() {
            return P.isTruncated;
          },
          value: y,
          tickIndex: p
        }
      }), d) {
        var E = Gr.makeAxisEventDataBase(r);
        E.targetType = "axisLabel", E.value = y, E.tickIndex = p, n.type === "category" && (E.dataIndex = g), vt(P).eventData = E;
      }
      t.add(P), P.updateTransform(), v.push(P), e.add(P), P.decomposeTransform();
    }), v;
  }
}
function uM(e, t) {
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
  return cM(r, e, t), r.seriesInvolved && fM(r, e), r;
}
function cM(e, t, r) {
  var i = t.getComponent("tooltip"), n = t.getComponent("axisPointer"), a = n.get("link", !0) || [], o = [];
  D(r.getCoordinateSystems(), function(s) {
    if (!s.axisPointerEnabled)
      return;
    var l = Fn(s.model), u = e.coordSysAxesInfo[l] = {};
    e.coordSysMap[l] = s;
    var c = s.model, h = c.getModel("tooltip", i);
    if (D(s.getAxes(), Zt(_, !1, null)), s.getTooltipAxes && i && h.get("show")) {
      var v = h.get("trigger") === "axis", f = h.get(["axisPointer", "type"]) === "cross", d = s.getTooltipAxes(h.get(["axisPointer", "axis"]));
      (v || f) && D(d.baseAxes, Zt(_, f ? "cross" : !0, v)), f && D(d.otherAxes, Zt(_, "cross", !1));
    }
    function _(p, g, m) {
      var y = m.model.getModel("axisPointer", n), w = y.get("show");
      if (!(!w || w === "auto" && !p && !Fl(y))) {
        g == null && (g = y.get("triggerTooltip")), y = p ? hM(m, h, n, t, p, g) : y;
        var S = y.get("snap"), b = y.get("triggerEmphasis"), x = Fn(m.model), T = g || S || m.type === "category", C = e.axesInfo[x] = {
          key: x,
          axis: m,
          coordSys: s,
          axisPointerModel: y,
          triggerTooltip: g,
          triggerEmphasis: b,
          involveSeries: T,
          snap: S,
          useHandle: Fl(y),
          seriesModels: [],
          linkGroup: null
        };
        u[x] = C, e.seriesInvolved = e.seriesInvolved || T;
        var M = vM(a, m);
        if (M != null) {
          var A = o[M] || (o[M] = {
            axesInfo: {}
          });
          A.axesInfo[x] = C, A.mapper = a[M].mapper, C.linkGroup = A;
        }
      }
    }
  });
}
function hM(e, t, r, i, n, a) {
  var o = t.getModel("axisPointer"), s = ["type", "snap", "lineStyle", "shadowStyle", "label", "animation", "animationDurationUpdate", "animationEasingUpdate", "z"], l = {};
  D(s, function(v) {
    l[v] = Q(o.get(v));
  }), l.snap = e.type !== "category" && !!a, o.get("type") === "cross" && (l.type = "line");
  var u = l.label || (l.label = {});
  if (u.show == null && (u.show = !1), n === "cross") {
    var c = o.get(["label", "show"]);
    if (u.show = c ?? !0, !a) {
      var h = l.lineStyle = o.get("crossStyle");
      h && ct(u, h.textStyle);
    }
  }
  return e.model.getModel("axisPointer", new dt(l, r, i));
}
function fM(e, t) {
  t.eachSeries(function(r) {
    var i = r.coordinateSystem, n = r.get(["tooltip", "trigger"], !0), a = r.get(["tooltip", "show"], !0);
    !i || n === "none" || n === !1 || n === "item" || a === !1 || r.get(["axisPointer", "show"], !0) === !1 || D(e.coordSysAxesInfo[Fn(i.model)], function(o) {
      var s = o.axis;
      i.getAxis(s.dim) === s && (o.seriesModels.push(r), o.seriesDataCount == null && (o.seriesDataCount = 0), o.seriesDataCount += r.getData().count());
    });
  });
}
function vM(e, t) {
  for (var r = t.model, i = t.dim, n = 0; n < e.length; n++) {
    var a = e[n] || {};
    if (Ws(a[i + "AxisId"], r.id) || Ws(a[i + "AxisIndex"], r.componentIndex) || Ws(a[i + "AxisName"], r.name))
      return n;
  }
}
function Ws(e, t) {
  return e === "all" || B(e) && st(e, t) >= 0 || e === t;
}
function dM(e) {
  var t = Bu(e);
  if (t) {
    var r = t.axisPointerModel, i = t.axis.scale, n = r.option, a = r.get("status"), o = r.get("value");
    o != null && (o = i.parse(o));
    var s = Fl(r);
    a == null && (n.status = s ? "show" : "hide");
    var l = i.getExtent().slice();
    l[0] > l[1] && l.reverse(), // Pick a value on axis when initializing.
    (o == null || o > l[1]) && (o = l[1]), o < l[0] && (o = l[0]), n.value = o, s && (n.status = t.axis.scale.isBlank() ? "hide" : "show");
  }
}
function Bu(e) {
  var t = (e.ecModel.getComponent("axisPointer") || {}).coordSysAxesInfo;
  return t && t.axesInfo[Fn(e)];
}
function pM(e) {
  var t = Bu(e);
  return t && t.axisPointerModel;
}
function Fl(e) {
  return !!e.get(["handle", "show"]);
}
function Fn(e) {
  return e.type + "||" + e.id;
}
var $f = {}, gM = (
  /** @class */
  (function(e) {
    G(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.prototype.render = function(r, i, n, a) {
      this.axisPointerClass && dM(r), e.prototype.render.apply(this, arguments), this._doUpdateAxisPointerClass(r, n, !0);
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
        var o = pM(r);
        o ? (this._axisPointer || (this._axisPointer = new a())).render(r, o, i, n) : this._disposeAxisPointer(i);
      }
    }, t.prototype._disposeAxisPointer = function(r) {
      this._axisPointer && this._axisPointer.dispose(r), this._axisPointer = null;
    }, t.registerAxisPointerClass = function(r, i) {
      $f[r] = i;
    }, t.getAxisPointerClass = function(r) {
      return r && $f[r];
    }, t.type = "axis", t;
  })(dr)
);
function Ef(e, t, r) {
  var i = Ii.createCanvas(), n = t.getWidth(), a = t.getHeight(), o = i.style;
  return o && (o.position = "absolute", o.left = "0", o.top = "0", o.width = n + "px", o.height = a + "px", i.setAttribute("data-zr-dom-id", e)), i.width = n * r, i.height = a * r, i;
}
var Ys = (function(e) {
  G(t, e);
  function t(r, i, n) {
    var a = e.call(this) || this;
    a.motionBlur = !1, a.lastFrameAlpha = 0.7, a.dpr = 1, a.virtual = !1, a.config = {}, a.incremental = !1, a.zlevel = 0, a.maxRepaintRectCount = 5, a.__dirty = !0, a.__firstTimePaint = !0, a.__used = !1, a.__drawIndex = 0, a.__startIndex = 0, a.__endIndex = 0, a.__prevStartIndex = null, a.__prevEndIndex = null;
    var o;
    n = n || ja, typeof r == "string" ? o = Ef(r, i, n) : F(r) && (o = r, r = o.id), a.id = r, a.dom = o;
    var s = o.style;
    return s && (fv(o), o.onselectstart = function() {
      return !1;
    }, s.padding = "0", s.margin = "0", s.borderWidth = "0"), a.painter = i, a.dpr = n, a;
  }
  return t.prototype.getElementCount = function() {
    return this.__endIndex - this.__startIndex;
  }, t.prototype.afterBrush = function() {
    this.__prevStartIndex = this.__startIndex, this.__prevEndIndex = this.__endIndex;
  }, t.prototype.initContext = function() {
    this.ctx = this.dom.getContext("2d"), this.ctx.dpr = this.dpr;
  }, t.prototype.setUnpainted = function() {
    this.__firstTimePaint = !0;
  }, t.prototype.createBackBuffer = function() {
    var r = this.dpr;
    this.domBack = Ef("back-" + this.id, this.painter, r), this.ctxBack = this.domBack.getContext("2d"), r !== 1 && this.ctxBack.scale(r, r);
  }, t.prototype.createRepaintRects = function(r, i, n, a) {
    if (this.__firstTimePaint)
      return this.__firstTimePaint = !1, null;
    var o = [], s = this.maxRepaintRectCount, l = !1, u = new it(0, 0, 0, 0);
    function c(m) {
      if (!(!m.isFinite() || m.isZero()))
        if (o.length === 0) {
          var y = new it(0, 0, 0, 0);
          y.copy(m), o.push(y);
        } else {
          for (var w = !1, S = 1 / 0, b = 0, x = 0; x < o.length; ++x) {
            var T = o[x];
            if (T.intersect(m)) {
              var C = new it(0, 0, 0, 0);
              C.copy(T), C.union(m), o[x] = C, w = !0;
              break;
            } else if (l) {
              u.copy(m), u.union(T);
              var M = m.width * m.height, A = T.width * T.height, I = u.width * u.height, k = I - M - A;
              k < S && (S = k, b = x);
            }
          }
          if (l && (o[b].union(m), w = !0), !w) {
            var y = new it(0, 0, 0, 0);
            y.copy(m), o.push(y);
          }
          l || (l = o.length >= s);
        }
    }
    for (var h = this.__startIndex; h < this.__endIndex; ++h) {
      var v = r[h];
      if (v) {
        var f = v.shouldBePainted(n, a, !0, !0), d = v.__isRendered && (v.__dirty & Xt || !f) ? v.getPrevPaintRect() : null;
        d && c(d);
        var _ = f && (v.__dirty & Xt || !v.__isRendered) ? v.getPaintRect() : null;
        _ && c(_);
      }
    }
    for (var h = this.__prevStartIndex; h < this.__prevEndIndex; ++h) {
      var v = i[h], f = v && v.shouldBePainted(n, a, !0, !0);
      if (v && (!f || !v.__zr) && v.__isRendered) {
        var d = v.getPrevPaintRect();
        d && c(d);
      }
    }
    var p;
    do {
      p = !1;
      for (var h = 0; h < o.length; ) {
        if (o[h].isZero()) {
          o.splice(h, 1);
          continue;
        }
        for (var g = h + 1; g < o.length; )
          o[h].intersect(o[g]) ? (p = !0, o[h].union(o[g]), o.splice(g, 1)) : g++;
        h++;
      }
    } while (p);
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
    function d(_, p, g, m) {
      if (o.clearRect(_, p, g, m), i && i !== "transparent") {
        var y = void 0;
        if (bo(i)) {
          var w = i.global || i.__width === g && i.__height === m;
          y = w && i.__canvasGradient || $l(o, i, {
            x: 0,
            y: 0,
            width: g,
            height: m
          }), i.__canvasGradient = y, i.__width = g, i.__height = m;
        } else Ww(i) && (i.scaleX = i.scaleX || h, i.scaleY = i.scaleY || h, y = El(o, i, {
          dirty: function() {
            v.setUnpainted(), v.painter.refresh();
          }
        }));
        o.save(), o.fillStyle = y || i, o.fillRect(_, p, g, m), o.restore();
      }
      u && (o.save(), o.globalAlpha = c, o.drawImage(f, _, p, g, m), o.restore());
    }
    !n || u ? d(0, 0, s, l) : n.length && D(n, function(_) {
      d(_.x * h, _.y * h, _.width * h, _.height * h);
    });
  }, t;
})(Re), Of = 1e5, Or = 314159, Ma = 0.01, _M = 1e-3;
function mM(e) {
  return e ? e.__builtin__ ? !0 : !(typeof e.resize != "function" || typeof e.refresh != "function") : !1;
}
function yM(e, t) {
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
var wM = (function() {
  function e(t, r, i, n) {
    this.type = "canvas", this._zlevelList = [], this._prevDisplayList = [], this._layers = {}, this._layerConfig = {}, this._needsManuallyCompositing = !1, this.type = "canvas";
    var a = !t.nodeName || t.nodeName.toUpperCase() === "CANVAS";
    this._opts = i = R({}, i || {}), this.dpr = i.devicePixelRatio || ja, this._singleCanvas = a, this.root = t;
    var o = t.style;
    o && (fv(t), t.innerHTML = ""), this.storage = r;
    var s = this._zlevelList;
    this._prevDisplayList = [];
    var l = this._layers;
    if (a) {
      var c = t, h = c.width, v = c.height;
      i.width != null && (h = i.width), i.height != null && (v = i.height), this.dpr = i.devicePixelRatio || 1, c.width = h * this.dpr, c.height = v * this.dpr, this._width = h, this._height = v;
      var f = new Ys(c, this, this.dpr);
      f.__builtin__ = !0, f.initContext(), l[Or] = f, f.zlevel = Or, s.push(Or), this._domRoot = t;
    } else {
      this._width = ba(t, 0, i), this._height = ba(t, 1, i);
      var u = this._domRoot = yM(this._width, this._height);
      t.appendChild(u);
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
    var r = this.storage.getDisplayList(!0), i = this._prevDisplayList, n = this._zlevelList;
    this._redrawId = Math.random(), this._paintList(r, i, t, this._redrawId);
    for (var a = 0; a < n.length; a++) {
      var o = n[a], s = this._layers[o];
      if (!s.__builtin__ && s.refresh) {
        var l = a === 0 ? this._backgroundColor : null;
        s.refresh(l);
      }
    }
    return this._opts.useDirtyRect && (this._prevDisplayList = r.slice()), this;
  }, e.prototype.refreshHover = function() {
    this._paintHoverList(this.storage.getDisplayList(!1));
  }, e.prototype._paintHoverList = function(t) {
    var r = t.length, i = this._hoverlayer;
    if (i && i.clear(), !!r) {
      for (var n = {
        inHover: !0,
        viewWidth: this._width,
        viewHeight: this._height
      }, a, o = 0; o < r; o++) {
        var s = t[o];
        s.__inHover && (i || (i = this._hoverlayer = this.getLayer(Of)), a || (a = i.ctx, a.save()), Hr(a, s, n, o === r - 1));
      }
      a && a.restore();
    }
  }, e.prototype.getHoverLayer = function() {
    return this.getLayer(Of);
  }, e.prototype.paintOne = function(t, r) {
    Sp(t, r);
  }, e.prototype._paintList = function(t, r, i, n) {
    if (this._redrawId === n) {
      i = i || !1, this._updateLayerStatus(t);
      var a = this._doPaintList(t, r, i), o = a.finished, s = a.needsRefreshHover;
      if (this._needsManuallyCompositing && this._compositeManually(), s && this._paintHoverList(t), o)
        this.eachLayer(function(u) {
          u.afterBrush && u.afterBrush();
        });
      else {
        var l = this;
        Ya(function() {
          l._paintList(t, r, i, n);
        });
      }
    }
  }, e.prototype._compositeManually = function() {
    var t = this.getLayer(Or).ctx, r = this._domRoot.width, i = this._domRoot.height;
    t.clearRect(0, 0, r, i), this.eachBuiltinLayer(function(n) {
      n.virtual && t.drawImage(n.dom, 0, 0, r, i);
    });
  }, e.prototype._doPaintList = function(t, r, i) {
    for (var n = this, a = [], o = this._opts.useDirtyRect, s = 0; s < this._zlevelList.length; s++) {
      var l = this._zlevelList[s], u = this._layers[l];
      u.__builtin__ && u !== this._hoverlayer && (u.__dirty || i) && a.push(u);
    }
    for (var c = !0, h = !1, v = function(_) {
      var p = a[_], g = p.ctx, m = o && p.createRepaintRects(t, r, f._width, f._height), y = i ? p.__startIndex : p.__drawIndex, w = !i && p.incremental && Date.now, S = w && Date.now(), b = p.zlevel === f._zlevelList[0] ? f._backgroundColor : null;
      if (p.__startIndex === p.__endIndex)
        p.clear(!1, b, m);
      else if (y === p.__startIndex) {
        var x = t[y];
        (!x.incremental || !x.notClear || i) && p.clear(!1, b, m);
      }
      y === -1 && (console.error("For some unknown reason. drawIndex is -1"), y = p.__startIndex);
      var T, C = function(k) {
        var P = {
          inHover: !1,
          allClipped: !1,
          prevEl: null,
          viewWidth: n._width,
          viewHeight: n._height
        };
        for (T = y; T < p.__endIndex; T++) {
          var E = t[T];
          if (E.__inHover && (h = !0), n._doPaintEl(E, p, o, k, P, T === p.__endIndex - 1), w) {
            var O = Date.now() - S;
            if (O > 15)
              break;
          }
        }
        P.prevElClipPaths && g.restore();
      };
      if (m)
        if (m.length === 0)
          T = p.__endIndex;
        else
          for (var M = f.dpr, A = 0; A < m.length; ++A) {
            var I = m[A];
            g.save(), g.beginPath(), g.rect(I.x * M, I.y * M, I.width * M, I.height * M), g.clip(), C(I), g.restore();
          }
      else
        g.save(), C(), g.restore();
      p.__drawIndex = T, p.__drawIndex < p.__endIndex && (c = !1);
    }, f = this, d = 0; d < a.length; d++)
      v(d);
    return H.wxa && D(this._layers, function(_) {
      _ && _.ctx && _.ctx.draw && _.ctx.draw();
    }), {
      finished: c,
      needsRefreshHover: h
    };
  }, e.prototype._doPaintEl = function(t, r, i, n, a, o) {
    var s = r.ctx;
    if (i) {
      var l = t.getPaintRect();
      (!n || l && l.intersect(n)) && (Hr(s, t, a, o), t.setPrevPaintRect(l));
    } else
      Hr(s, t, a, o);
  }, e.prototype.getLayer = function(t, r) {
    this._singleCanvas && !this._needsManuallyCompositing && (t = Or);
    var i = this._layers[t];
    return i || (i = new Ys("zr_" + t, this, this.dpr), i.zlevel = t, i.__builtin__ = !0, this._layerConfig[t] ? _t(i, this._layerConfig[t], !0) : this._layerConfig[t - Ma] && _t(i, this._layerConfig[t - Ma], !0), r && (i.virtual = r), this.insertLayer(t, i), i.initContext()), i;
  }, e.prototype.insertLayer = function(t, r) {
    var i = this._layers, n = this._zlevelList, a = n.length, o = this._domRoot, s = null, l = -1;
    if (!i[t] && mM(r)) {
      if (a > 0 && t > n[0]) {
        for (l = 0; l < a - 1 && !(n[l] < t && n[l + 1] > t); l++)
          ;
        s = i[n[l]];
      }
      if (n.splice(l + 1, 0, t), i[t] = r, !r.virtual)
        if (s) {
          var u = s.dom;
          u.nextSibling ? o.insertBefore(r.dom, u.nextSibling) : o.appendChild(r.dom);
        } else
          o.firstChild ? o.insertBefore(r.dom, o.firstChild) : o.appendChild(r.dom);
      r.painter || (r.painter = this);
    }
  }, e.prototype.eachLayer = function(t, r) {
    for (var i = this._zlevelList, n = 0; n < i.length; n++) {
      var a = i[n];
      t.call(r, this._layers[a], a);
    }
  }, e.prototype.eachBuiltinLayer = function(t, r) {
    for (var i = this._zlevelList, n = 0; n < i.length; n++) {
      var a = i[n], o = this._layers[a];
      o.__builtin__ && t.call(r, o, a);
    }
  }, e.prototype.eachOtherLayer = function(t, r) {
    for (var i = this._zlevelList, n = 0; n < i.length; n++) {
      var a = i[n], o = this._layers[a];
      o.__builtin__ || t.call(r, o, a);
    }
  }, e.prototype.getLayers = function() {
    return this._layers;
  }, e.prototype._updateLayerStatus = function(t) {
    this.eachBuiltinLayer(function(h, v) {
      h.__dirty = h.__used = !1;
    });
    function r(h) {
      a && (a.__endIndex !== h && (a.__dirty = !0), a.__endIndex = h);
    }
    if (this._singleCanvas)
      for (var i = 1; i < t.length; i++) {
        var n = t[i];
        if (n.zlevel !== t[i - 1].zlevel || n.incremental) {
          this._needsManuallyCompositing = !0;
          break;
        }
      }
    var a = null, o = 0, s, l;
    for (l = 0; l < t.length; l++) {
      var n = t[l], u = n.zlevel, c = void 0;
      s !== u && (s = u, o = 0), n.incremental ? (c = this.getLayer(u + _M, this._needsManuallyCompositing), c.incremental = !0, o = 1) : c = this.getLayer(u + (o > 0 ? Ma : 0), this._needsManuallyCompositing), c.__builtin__ || jl("ZLevel " + u + " has been used by unkown layer " + c.id), c !== a && (c.__used = !0, c.__startIndex !== l && (c.__dirty = !0), c.__startIndex = l, c.incremental ? c.__drawIndex = -1 : c.__drawIndex = l, r(l), a = c), n.__dirty & Xt && !n.__inHover && (c.__dirty = !0, c.incremental && c.__drawIndex < 0 && (c.__drawIndex = l));
    }
    r(l), this.eachBuiltinLayer(function(h, v) {
      !h.__used && h.getElementCount() > 0 && (h.__dirty = !0, h.__startIndex = h.__endIndex = h.__drawIndex = 0), h.__dirty && h.__drawIndex < 0 && (h.__drawIndex = h.__startIndex);
    });
  }, e.prototype.clear = function() {
    return this.eachBuiltinLayer(this._clearLayer), this;
  }, e.prototype._clearLayer = function(t) {
    t.clear();
  }, e.prototype.setBackgroundColor = function(t) {
    this._backgroundColor = t, D(this._layers, function(r) {
      r.setUnpainted();
    });
  }, e.prototype.configLayer = function(t, r) {
    if (r) {
      var i = this._layerConfig;
      i[t] ? _t(i[t], r, !0) : i[t] = r;
      for (var n = 0; n < this._zlevelList.length; n++) {
        var a = this._zlevelList[n];
        if (a === t || a === t + Ma) {
          var o = this._layers[a];
          _t(o, i[t], !0);
        }
      }
    }
  }, e.prototype.delLayer = function(t) {
    var r = this._layers, i = this._zlevelList, n = r[t];
    n && (n.dom.parentNode.removeChild(n.dom), delete r[t], i.splice(st(i, t), 1));
  }, e.prototype.resize = function(t, r) {
    if (this._domRoot.style) {
      var i = this._domRoot;
      i.style.display = "none";
      var n = this._opts, a = this.root;
      if (t != null && (n.width = t), r != null && (n.height = r), t = ba(a, 0, n), r = ba(a, 1, n), i.style.display = "", this._width !== t || r !== this._height) {
        i.style.width = t + "px", i.style.height = r + "px";
        for (var o in this._layers)
          this._layers.hasOwnProperty(o) && this._layers[o].resize(t, r);
        this.refresh(!0);
      }
      this._width = t, this._height = r;
    } else {
      if (t == null || r == null)
        return;
      this._width = t, this._height = r, this.getLayer(Or).resize(t, r);
    }
    return this;
  }, e.prototype.clearLayer = function(t) {
    var r = this._layers[t];
    r && r.clear();
  }, e.prototype.dispose = function() {
    this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._layers = null;
  }, e.prototype.getRenderedCanvas = function(t) {
    if (t = t || {}, this._singleCanvas && !this._compositeManually)
      return this._layers[Or].dom;
    var r = new Ys("image", this, t.pixelRatio || this.dpr);
    r.initContext(), r.clear(!1, t.backgroundColor || this._backgroundColor);
    var i = r.ctx;
    if (t.pixelRatio <= this.dpr) {
      this.refresh();
      var n = r.dom.width, a = r.dom.height;
      this.eachLayer(function(h) {
        h.__builtin__ ? i.drawImage(h.dom, 0, 0, n, a) : h.renderToCanvas && (i.save(), h.renderToCanvas(i), i.restore());
      });
    } else
      for (var o = {
        inHover: !1,
        viewWidth: this._width,
        viewHeight: this._height
      }, s = this.storage.getDisplayList(!0), l = 0, u = s.length; l < u; l++) {
        var c = s[l];
        Hr(i, c, o, l === u - 1);
      }
    return r.dom;
  }, e.prototype.getWidth = function() {
    return this._width;
  }, e.prototype.getHeight = function() {
    return this._height;
  }, e;
})();
function bM(e) {
  e.registerPainter("canvas", wM);
}
var Br = wt(), Bf = Q, qs = lt, SM = (
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
          s = this._group = new Ve(), this.createPointerEl(s, u, t, r), this.createLabelEl(s, u, t, r), i.getZr().add(s);
        else {
          var v = Zt(Nf, r, h);
          this.updatePointerEl(s, u, v), this.updateLabelEl(s, u, v, r);
        }
        zf(s, r, !0), this._renderHandle(a);
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
        if (a && n.getBandWidth() > s)
          return !0;
        if (o) {
          var l = Bu(t).seriesDataCount, u = n.getExtent();
          return Math.abs(u[0] - u[1]) / l > s;
        }
        return !1;
      }
      return i === !0;
    }, e.prototype.makeElOption = function(t, r, i, n, a) {
    }, e.prototype.createPointerEl = function(t, r, i, n) {
      var a = r.pointer;
      if (a) {
        var o = Br(t).pointerEl = new qx[a.type](Bf(r.pointer));
        t.add(o);
      }
    }, e.prototype.createLabelEl = function(t, r, i, n) {
      if (r.label) {
        var a = Br(t).labelEl = new pe(Bf(r.label));
        t.add(a), Ff(a, n);
      }
    }, e.prototype.updatePointerEl = function(t, r, i) {
      var n = Br(t).pointerEl;
      n && r.pointer && (n.setStyle(r.pointer.style), i(n, {
        shape: r.pointer.shape
      }));
    }, e.prototype.updateLabelEl = function(t, r, i, n) {
      var a = Br(t).labelEl;
      a && (a.setStyle(r.label.style), i(a, {
        // Consider text length change in vertical axis, animation should
        // be used on shape, otherwise the effect will be weird.
        // TODOTODO
        // shape: elOption.label.shape,
        x: r.label.x,
        y: r.label.y
      }), Ff(a, n));
    }, e.prototype._renderHandle = function(t) {
      if (!(this._dragging || !this.updateHandleTransform)) {
        var r = this._axisPointerModel, i = this._api.getZr(), n = this._handle, a = r.getModel("handle"), o = r.get("status");
        if (!a.get("show") || !o || o === "hide") {
          n && i.remove(n), this._handle = null;
          return;
        }
        var s;
        this._handle || (s = !0, n = this._handle = xd(a.get("icon"), {
          cursor: "move",
          draggable: !0,
          onmousemove: function(u) {
            dv(u.event);
          },
          onmousedown: qs(this._onHandleDragMove, this, 0, 0),
          drift: qs(this._onHandleDragMove, this),
          ondragend: qs(this._onHandleDragEnd, this)
        }), i.add(n)), zf(n, r, !1), n.setStyle(a.getItemStyle(null, ["color", "borderColor", "borderWidth", "opacity", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"]));
        var l = a.get("size");
        B(l) || (l = [l, l]), n.scaleX = l[0] / 2, n.scaleY = l[1] / 2, cp(this, "_doDispatchAxisPointer", a.get("throttle") || 0, "fixRate"), this._moveHandleToValue(t, s);
      }
    }, e.prototype._moveHandleToValue = function(t, r) {
      Nf(this._axisPointerModel, !r && this._moveAnimation, this._handle, Xs(this.getHandleTransform(t, this._axisModel, this._axisPointerModel)));
    }, e.prototype._onHandleDragMove = function(t, r) {
      var i = this._handle;
      if (i) {
        this._dragging = !0;
        var n = this.updateHandleTransform(Xs(i), [t, r], this._axisModel, this._axisPointerModel);
        this._payloadInfo = n, i.stopAnimation(), i.attr(Xs(n)), Br(i).lastProp = null, this._doDispatchAxisPointer();
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
      r && i && (this._lastGraphicKey = null, i && r.remove(i), n && r.remove(n), this._group = null, this._handle = null, this._payloadInfo = null), kl(this, "_doDispatchAxisPointer");
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
function Nf(e, t, r, i) {
  Jp(Br(r).lastProp, i) || (Br(r).lastProp = i, t ? Ln(r, i, e) : (r.stopAnimation(), r.attr(i)));
}
function Jp(e, t) {
  if (F(e) && F(t)) {
    var r = !0;
    return D(t, function(i, n) {
      r = r && Jp(e[n], i);
    }), !!r;
  } else
    return e === t;
}
function Ff(e, t) {
  e[t.get(["label", "show"]) ? "show" : "hide"]();
}
function Xs(e) {
  return {
    x: e.x || 0,
    y: e.y || 0,
    rotation: e.rotation || 0
  };
}
function zf(e, t, r) {
  var i = t.get("z"), n = t.get("zlevel");
  e && e.traverse(function(a) {
    a.type !== "group" && (i != null && (a.z = i), n != null && (a.zlevel = n), a.silent = r);
  });
}
function xM(e) {
  var t = e.get("type"), r = e.getModel(t + "Style"), i;
  return t === "line" ? (i = r.getLineStyle(), i.fill = null) : t === "shadow" && (i = r.getAreaStyle(), i.stroke = null), i;
}
function TM(e, t, r, i, n) {
  var a = r.get("value"), o = tg(a, t.axis, t.ecModel, r.get("seriesDataIndices"), {
    precision: r.get(["label", "precision"]),
    formatter: r.get(["label", "formatter"])
  }), s = r.getModel("label"), l = Cu(s.get("padding") || 0), u = s.getFont(), c = Lv(o, u), h = n.position, v = c.width + l[1] + l[3], f = c.height + l[0] + l[2], d = n.align;
  d === "right" && (h[0] -= v), d === "center" && (h[0] -= v / 2);
  var _ = n.verticalAlign;
  _ === "bottom" && (h[1] -= f), _ === "middle" && (h[1] -= f / 2), CM(h, v, f, i);
  var p = s.get("backgroundColor");
  (!p || p === "auto") && (p = t.get(["axisLine", "lineStyle", "color"])), e.label = {
    // shape: {x: 0, y: 0, width: width, height: height, r: labelModel.get('borderRadius')},
    x: h[0],
    y: h[1],
    style: Rn(s, {
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
function CM(e, t, r, i) {
  var n = i.getWidth(), a = i.getHeight();
  e[0] = Math.min(e[0] + t, n) - t, e[1] = Math.min(e[1] + r, a) - r, e[0] = Math.max(e[0], 0), e[1] = Math.max(e[1], 0);
}
function tg(e, t, r, i, n) {
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
      value: Yp(t, {
        value: e
      }),
      axisDimension: t.dim,
      axisIndex: t.index,
      seriesData: []
    };
    D(i, function(l) {
      var u = r.getSeriesByIndex(l.seriesIndex), c = l.dataIndexInside, h = u && u.getDataParams(c);
      h && s.seriesData.push(h);
    }), U(o) ? a = o.replace("{value}", a) : rt(o) && (a = o(s));
  }
  return a;
}
function eg(e, t, r) {
  var i = mi();
  return eu(i, i, r.rotation), il(i, i, r.position), bu([e.dataToCoord(t), (r.labelOffset || 0) + (r.labelDirection || 1) * (r.labelMargin || 0)], i);
}
function DM(e, t, r, i, n, a) {
  var o = Gr.innerTextLayout(r.rotation, 0, r.labelDirection);
  r.labelMargin = n.get(["label", "margin"]), TM(t, i, n, a, {
    position: eg(i.axis, e, r),
    align: o.textAlign,
    verticalAlign: o.textVerticalAlign
  });
}
function MM(e, t, r) {
  return r = r || 0, {
    x1: e[r],
    y1: e[1 - r],
    x2: t[r],
    y2: t[1 - r]
  };
}
function AM(e, t, r) {
  return r = r || 0, {
    x: e[r],
    y: e[1 - r],
    width: t[r],
    height: t[1 - r]
  };
}
var PM = (
  /** @class */
  (function(e) {
    G(t, e);
    function t() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return t.prototype.makeElOption = function(r, i, n, a, o) {
      var s = n.axis, l = s.grid, u = a.get("type"), c = Hf(l, s).getOtherAxis(s).getGlobalExtent(), h = s.toGlobalCoord(s.dataToCoord(i, !0));
      if (u && u !== "none") {
        var v = xM(a), f = IM[u](s, h, c);
        f.style = v, r.graphicKey = f.type, r.pointer = f;
      }
      var d = If(l.model, n);
      DM(
        // @ts-ignore
        i,
        r,
        d,
        n,
        a,
        o
      );
    }, t.prototype.getHandleTransform = function(r, i, n) {
      var a = If(i.axis.grid.model, i, {
        labelInside: !1
      });
      a.labelMargin = n.get(["handle", "margin"]);
      var o = eg(i.axis, r, a);
      return {
        x: o[0],
        y: o[1],
        rotation: a.rotation + (a.labelDirection < 0 ? Math.PI : 0)
      };
    }, t.prototype.updateHandleTransform = function(r, i, n, a) {
      var o = n.axis, s = o.grid, l = o.getGlobalExtent(!0), u = Hf(s, o).getOtherAxis(o).getGlobalExtent(), c = o.dim === "x" ? 0 : 1, h = [r.x, r.y];
      h[c] += i[c], h[c] = Math.min(l[1], h[c]), h[c] = Math.max(l[0], h[c]);
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
  })(SM)
);
function Hf(e, t) {
  var r = {};
  return r[t.dim + "AxisIndex"] = t.index, e.getCartesian(r);
}
var IM = {
  line: function(e, t, r) {
    var i = MM([t, r[0]], [t, r[1]], Uf(e));
    return {
      type: "Line",
      subPixelOptimize: !0,
      shape: i
    };
  },
  shadow: function(e, t, r) {
    var i = Math.max(1, e.getBandWidth()), n = r[1] - r[0];
    return {
      type: "Rect",
      shape: AM([t - i / 2, r[0]], [i, n], Uf(e))
    };
  }
};
function Uf(e) {
  return e.dim === "x" ? 0 : 1;
}
var kM = (
  /** @class */
  (function(e) {
    G(t, e);
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
        color: "#B9BEC9",
        width: 1,
        type: "dashed"
      },
      shadowStyle: {
        color: "rgba(210,219,238,0.2)"
      },
      label: {
        show: !0,
        formatter: null,
        precision: "auto",
        margin: 3,
        color: "#fff",
        padding: [5, 7, 5, 7],
        backgroundColor: "auto",
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
        color: "#333",
        shadowBlur: 3,
        shadowColor: "#aaa",
        shadowOffsetX: 0,
        shadowOffsetY: 2,
        // For mobile performance
        throttle: 40
      }
    }, t;
  })(at)
), ze = wt(), LM = D;
function rg(e, t, r) {
  if (!H.node) {
    var i = t.getZr();
    ze(i).records || (ze(i).records = {}), RM(i, t);
    var n = ze(i).records[e] || (ze(i).records[e] = {});
    n.handler = r;
  }
}
function RM(e, t) {
  if (ze(e).initialized)
    return;
  ze(e).initialized = !0, r("click", Zt(Vf, "click")), r("mousemove", Zt(Vf, "mousemove")), r("globalout", EM);
  function r(i, n) {
    e.on(i, function(a) {
      var o = OM(t);
      LM(ze(e).records, function(s) {
        s && n(s, a, o.dispatchAction);
      }), $M(o.pendings, t);
    });
  }
}
function $M(e, t) {
  var r = e.showTip.length, i = e.hideTip.length, n;
  r ? n = e.showTip[r - 1] : i && (n = e.hideTip[i - 1]), n && (n.dispatchAction = null, t.dispatchAction(n));
}
function EM(e, t, r) {
  e.handler("leave", null, r);
}
function Vf(e, t, r, i) {
  t.handler(e, r, i);
}
function OM(e) {
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
function zl(e, t) {
  if (!H.node) {
    var r = t.getZr(), i = (ze(r).records || {})[e];
    i && (ze(r).records[e] = null);
  }
}
var BM = (
  /** @class */
  (function(e) {
    G(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.prototype.render = function(r, i, n) {
      var a = i.getComponent("tooltip"), o = r.get("triggerOn") || a && a.get("triggerOn") || "mousemove|click";
      rg("axisPointer", n, function(s, l, u) {
        o !== "none" && (s === "leave" || o.indexOf(s) >= 0) && u({
          type: "updateAxisPointer",
          currTrigger: s,
          x: l && l.offsetX,
          y: l && l.offsetY
        });
      });
    }, t.prototype.remove = function(r, i) {
      zl("axisPointer", i);
    }, t.prototype.dispose = function(r, i) {
      zl("axisPointer", i);
    }, t.type = "axisPointer", t;
  })(dr)
);
function ig(e, t) {
  var r = [], i = e.seriesIndex, n;
  if (i == null || !(n = t.getSeriesByIndex(i)))
    return {
      point: []
    };
  var a = n.getData(), o = Wn(a, e);
  if (o == null || o < 0 || B(o))
    return {
      point: []
    };
  var s = a.getItemGraphicEl(o), l = n.coordinateSystem;
  if (n.getTooltipPosition)
    r = n.getTooltipPosition(o) || [];
  else if (l && l.dataToPoint)
    if (e.isStacked) {
      var u = l.getBaseAxis(), c = l.getOtherAxis(u), h = c.dim, v = u.dim, f = h === "x" || h === "radius" ? 1 : 0, d = a.mapDimension(v), _ = [];
      _[f] = a.get(d, o), _[1 - f] = a.get(a.getCalculationInfo("stackResultDimension"), o), r = l.dataToPoint(_) || [];
    } else
      r = l.dataToPoint(a.getValues(J(l.dimensions, function(g) {
        return a.mapDimension(g);
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
var Gf = wt();
function NM(e, t, r) {
  var i = e.currTrigger, n = [e.x, e.y], a = e, o = e.dispatchAction || lt(r.dispatchAction, r), s = t.getComponent("axisPointer").coordSysAxesInfo;
  if (s) {
    Ua(n) && (n = ig({
      seriesIndex: a.seriesIndex,
      // Do not use dataIndexInside from other ec instance.
      // FIXME: auto detect it?
      dataIndex: a.dataIndex
    }, t).point);
    var l = Ua(n), u = a.axesInfo, c = s.axesInfo, h = i === "leave" || Ua(n), v = {}, f = {}, d = {
      list: [],
      map: {}
    }, _ = {
      showPointer: Zt(zM, f),
      showTooltip: Zt(HM, d)
    };
    D(s.coordSysMap, function(g, m) {
      var y = l || g.containPoint(n);
      D(s.coordSysAxesInfo[m], function(w, S) {
        var b = w.axis, x = WM(u, w);
        if (!h && y && (!u || x)) {
          var T = x && x.value;
          T == null && !l && (T = b.pointToData(n)), T != null && Wf(w, T, _, !1, v);
        }
      });
    });
    var p = {};
    return D(c, function(g, m) {
      var y = g.linkGroup;
      y && !f[m] && D(y.axesInfo, function(w, S) {
        var b = f[S];
        if (w !== g && b) {
          var x = b.value;
          y.mapper && (x = g.axis.scale.parse(y.mapper(x, Yf(w), Yf(g)))), p[g.key] = x;
        }
      });
    }), D(p, function(g, m) {
      Wf(c[m], g, _, !0, v);
    }), UM(f, c, v), VM(d, n, e, o), GM(c, o, r), v;
  }
}
function Wf(e, t, r, i, n) {
  var a = e.axis;
  if (!(a.scale.isBlank() || !a.containData(t))) {
    if (!e.involveSeries) {
      r.showPointer(e, t);
      return;
    }
    var o = FM(t, e), s = o.payloadBatch, l = o.snapToValue;
    s[0] && n.seriesIndex == null && R(n, s[0]), !i && e.snap && a.containData(l) && l != null && (t = l), r.showPointer(e, t, s), r.showTooltip(e, o, l);
  }
}
function FM(e, t) {
  var r = t.axis, i = r.dim, n = e, a = [], o = Number.MAX_VALUE, s = -1;
  return D(t.seriesModels, function(l, u) {
    var c = l.getData().mapDimensionsAll(i), h, v;
    if (l.getAxisTooltipData) {
      var f = l.getAxisTooltipData(c, e, r);
      v = f.dataIndices, h = f.nestestValue;
    } else {
      if (v = l.getData().indicesOfNearest(
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
    if (!(h == null || !isFinite(h))) {
      var d = e - h, _ = Math.abs(d);
      _ <= o && ((_ < o || d >= 0 && s < 0) && (o = _, s = d, n = h, a.length = 0), D(v, function(p) {
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
function zM(e, t, r, i) {
  e[t.key] = {
    value: r,
    payloadBatch: i
  };
}
function HM(e, t, r, i) {
  var n = r.payloadBatch, a = t.axis, o = a.model, s = t.axisPointerModel;
  if (!(!t.triggerTooltip || !n.length)) {
    var l = t.coordSys.model, u = Fn(l), c = e.map[u];
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
      // Caustion: viewHelper.getValueLabel is actually on "view stage", which
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
function UM(e, t, r) {
  var i = r.axesInfo = [];
  D(t, function(n, a) {
    var o = n.axisPointerModel.option, s = e[a];
    s ? (!n.useHandle && (o.status = "show"), o.value = s.value, o.seriesDataIndices = (s.payloadBatch || []).slice()) : !n.useHandle && (o.status = "hide"), o.status === "show" && i.push({
      axisDim: n.axis.dim,
      axisIndex: n.axis.model.componentIndex,
      value: o.value
    });
  });
}
function VM(e, t, r, i) {
  if (Ua(t) || !e.list.length) {
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
function GM(e, t, r) {
  var i = r.getZr(), n = "axisPointerLastHighlights", a = Gf(i)[n] || {}, o = Gf(i)[n] = {};
  D(e, function(u, c) {
    var h = u.axisPointerModel.option;
    h.status === "show" && u.triggerEmphasis && D(h.seriesDataIndices, function(v) {
      var f = v.seriesIndex + " | " + v.dataIndex;
      o[f] = v;
    });
  });
  var s = [], l = [];
  D(a, function(u, c) {
    !o[c] && l.push(u);
  }), D(o, function(u, c) {
    !a[c] && s.push(u);
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
function WM(e, t) {
  for (var r = 0; r < (e || []).length; r++) {
    var i = e[r];
    if (t.axis.dim === i.axisDim && t.axis.model.componentIndex === i.axisIndex)
      return i;
  }
}
function Yf(e) {
  var t = e.axis.model, r = {}, i = r.axisDim = e.axis.dim;
  return r.axisIndex = r[i + "AxisIndex"] = t.componentIndex, r.axisName = r[i + "AxisName"] = t.name, r.axisId = r[i + "AxisId"] = t.id, r;
}
function Ua(e) {
  return !e || e[0] == null || isNaN(e[0]) || e[1] == null || isNaN(e[1]);
}
function YM(e) {
  gM.registerAxisPointerClass("CartesianAxisPointer", PM), e.registerComponentModel(kM), e.registerComponentView(BM), e.registerPreprocessor(function(t) {
    if (t) {
      (!t.axisPointer || t.axisPointer.length === 0) && (t.axisPointer = {});
      var r = t.axisPointer.link;
      r && !B(r) && (t.axisPointer.link = [r]);
    }
  }), e.registerProcessor(e.PRIORITY.PROCESSOR.STATISTIC, function(t, r) {
    t.getComponent("axisPointer").coordSysAxesInfo = uM(t, r);
  }), e.registerAction({
    type: "updateAxisPointer",
    event: "updateAxisPointer",
    update: ":updateAxisPointer"
  }, NM);
}
var qM = (
  /** @class */
  (function(e) {
    G(t, e);
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
      triggerOn: "mousemove|click",
      alwaysShowContent: !1,
      displayMode: "single",
      renderMode: "auto",
      // whether restraint content inside viewRect.
      // If renderMode: 'richText', default true.
      // If renderMode: 'html', defaut false (for backward compat).
      confine: null,
      showDelay: 0,
      hideDelay: 100,
      // Animation transition time, unit is second
      transitionDuration: 0.4,
      enterable: !1,
      backgroundColor: "#fff",
      // box shadow
      shadowBlur: 10,
      shadowColor: "rgba(0, 0, 0, .2)",
      shadowOffsetX: 1,
      shadowOffsetY: 2,
      // tooltip border radius, unit is px, default is 4
      borderRadius: 4,
      // tooltip border width, unit is px, default is 0 (no border)
      borderWidth: 1,
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
          color: "#999",
          width: 1,
          type: "dashed",
          // TODO formatter
          textStyle: {}
        }
        // lineStyle and shadowStyle should not be specified here,
        // otherwise it will always override those styles on option.axisPointer.
      },
      textStyle: {
        color: "#666",
        fontSize: 14
      }
    }, t;
  })(at)
);
function ng(e) {
  var t = e.get("confine");
  return t != null ? !!t : e.get("renderMode") === "richText";
}
function ag(e) {
  if (H.domSupported) {
    for (var t = document.documentElement.style, r = 0, i = e.length; r < i; r++)
      if (e[r] in t)
        return e[r];
  }
}
var og = ag(["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]), XM = ag(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]);
function sg(e, t) {
  if (!e)
    return t;
  t = kd(t, !0);
  var r = e.indexOf(t);
  return e = r === -1 ? t : "-" + e.slice(0, r) + "-" + t, e.toLowerCase();
}
function ZM(e, t) {
  var r = e.currentStyle || document.defaultView && document.defaultView.getComputedStyle(e);
  return r ? r[t] : null;
}
var KM = sg(XM, "transition"), Nu = sg(og, "transform"), jM = "position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;" + (H.transform3dSupported ? "will-change:transform;" : "");
function QM(e) {
  return e = e === "left" ? "right" : e === "right" ? "left" : e === "top" ? "bottom" : "top", e;
}
function JM(e, t, r) {
  if (!U(r) || r === "inside")
    return "";
  var i = e.get("backgroundColor"), n = e.get("borderWidth");
  t = $n(t);
  var a = QM(r), o = Math.max(Math.round(n) * 1.5, 6), s = "", l = Nu + ":", u;
  st(["left", "right"], a) > -1 ? (s += "top:50%", l += "translateY(-50%) rotate(" + (u = a === "left" ? -225 : -45) + "deg)") : (s += "left:50%", l += "translateX(-50%) rotate(" + (u = a === "top" ? 225 : 45) + "deg)");
  var c = u * Math.PI / 180, h = o + n, v = h * Math.abs(Math.cos(c)) + h * Math.abs(Math.sin(c)), f = Math.round(((v - Math.SQRT2 * n) / 2 + Math.SQRT2 * n - (v - h) / 2) * 100) / 100;
  s += ";" + a + ":-" + f + "px";
  var d = t + " solid " + n + "px;", _ = ["position:absolute;width:" + o + "px;height:" + o + "px;z-index:-1;", s + ";" + l + ";", "border-bottom:" + d, "border-right:" + d, "background-color:" + i + ";"];
  return '<div style="' + _.join("") + '"></div>';
}
function tA(e, t) {
  var r = "cubic-bezier(0.23,1,0.32,1)", i = " " + e / 2 + "s " + r, n = "opacity" + i + ",visibility" + i;
  return t || (i = " " + e + "s " + r, n += H.transformSupported ? "," + Nu + i : ",left" + i + ",top" + i), KM + ":" + n;
}
function qf(e, t, r) {
  var i = e.toFixed(0) + "px", n = t.toFixed(0) + "px";
  if (!H.transformSupported)
    return r ? "top:" + n + ";left:" + i + ";" : [["top", n], ["left", i]];
  var a = H.transform3dSupported, o = "translate" + (a ? "3d" : "") + "(" + i + "," + n + (a ? ",0" : "") + ")";
  return r ? "top:0;left:0;" + Nu + ":" + o + ";" : [["top", 0], ["left", 0], [og, o]];
}
function eA(e) {
  var t = [], r = e.get("fontSize"), i = e.getTextColor();
  i && t.push("color:" + i), t.push("font:" + e.getFont());
  var n = K(e.get("lineHeight"), Math.round(r * 3 / 2));
  r && t.push("line-height:" + n + "px");
  var a = e.get("textShadowColor"), o = e.get("textShadowBlur") || 0, s = e.get("textShadowOffsetX") || 0, l = e.get("textShadowOffsetY") || 0;
  return a && o && t.push("text-shadow:" + s + "px " + l + "px " + o + "px " + a), D(["decoration", "align"], function(u) {
    var c = e.get(u);
    c && t.push("text-" + u + ":" + c);
  }), t.join(";");
}
function rA(e, t, r) {
  var i = [], n = e.get("transitionDuration"), a = e.get("backgroundColor"), o = e.get("shadowBlur"), s = e.get("shadowColor"), l = e.get("shadowOffsetX"), u = e.get("shadowOffsetY"), c = e.getModel("textStyle"), h = sp(e, "html"), v = l + "px " + u + "px " + o + "px " + s;
  return i.push("box-shadow:" + v), t && n && i.push(tA(n, r)), a && i.push("background-color:" + a), D(["width", "color", "radius"], function(f) {
    var d = "border-" + f, _ = kd(d), p = e.get(_);
    p != null && i.push(d + ":" + p + (f === "color" ? "" : "px"));
  }), i.push(eA(c)), h != null && i.push("padding:" + Cu(h).join("px ") + "px"), i.join(";") + ";";
}
function Xf(e, t, r, i, n) {
  var a = t && t.painter;
  if (r) {
    var o = a && a.getViewportRoot();
    o && o1(e, o, r, i, n);
  } else {
    e[0] = i, e[1] = n;
    var s = a && a.getViewportRootOffset();
    s && (e[0] += s.offsetLeft, e[1] += s.offsetTop);
  }
  e[2] = e[0] / t.getWidth(), e[3] = e[1] / t.getHeight();
}
var iA = (
  /** @class */
  (function() {
    function e(t, r) {
      if (this._show = !1, this._styleCoord = [0, 0, 0, 0], this._enterable = !0, this._alwaysShowContent = !1, this._firstShow = !0, this._longHide = !0, H.wxa)
        return null;
      var i = document.createElement("div");
      i.domBelongToZr = !0, this.el = i;
      var n = this._zr = t.getZr(), a = r.appendTo, o = a && (U(a) ? document.querySelector(a) : Mn(a) ? a : rt(a) && a(t.getDom()));
      Xf(this._styleCoord, n, o, t.getWidth() / 2, t.getHeight() / 2), (o || t.getDom()).appendChild(i), this._api = t, this._container = o;
      var s = this;
      i.onmouseenter = function() {
        s._enterable && (clearTimeout(s._hideTimeout), s._show = !0), s._inContent = !0;
      }, i.onmousemove = function(l) {
        if (l = l || window.event, !s._enterable) {
          var u = n.handler, c = n.painter.getViewportRoot();
          re(c, l, !0), u.dispatch("mousemove", l);
        }
      }, i.onmouseleave = function() {
        s._inContent = !1, s._enterable && s._show && s.hideLater(s._hideDelay);
      };
    }
    return e.prototype.update = function(t) {
      if (!this._container) {
        var r = this._api.getDom(), i = ZM(r, "position"), n = r.style;
        n.position !== "absolute" && i !== "absolute" && (n.position = "relative");
      }
      var a = t.get("alwaysShowContent");
      a && this._moveIfResized(), this._alwaysShowContent = a, this.el.className = t.get("className") || "";
    }, e.prototype.show = function(t, r) {
      clearTimeout(this._hideTimeout), clearTimeout(this._longHideTimeout);
      var i = this.el, n = i.style, a = this._styleCoord;
      i.innerHTML ? n.cssText = jM + rA(t, !this._firstShow, this._longHide) + qf(a[0], a[1], !0) + ("border-color:" + $n(r) + ";") + (t.get("extraCssText") || "") + (";pointer-events:" + (this._enterable ? "auto" : "none")) : n.display = "none", this._show = !0, this._firstShow = !1, this._longHide = !1;
    }, e.prototype.setContent = function(t, r, i, n, a) {
      var o = this.el;
      if (t == null) {
        o.innerHTML = "";
        return;
      }
      var s = "";
      if (U(a) && i.get("trigger") === "item" && !ng(i) && (s = JM(i, n, a)), U(t))
        o.innerHTML = t + s;
      else if (t) {
        o.innerHTML = "", B(t) || (t = [t]);
        for (var l = 0; l < t.length; l++)
          Mn(t[l]) && t[l].parentNode !== o && o.appendChild(t[l]);
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
        if (Xf(i, this._zr, this._container, t, r), i[0] != null && i[1] != null) {
          var n = this.el.style, a = qf(i[0], i[1]);
          D(a, function(o) {
            n[o[0]] = o[1];
          });
        }
      }
    }, e.prototype._moveIfResized = function() {
      var t = this._styleCoord[2], r = this._styleCoord[3];
      this.moveTo(t * this._zr.getWidth(), r * this._zr.getHeight());
    }, e.prototype.hide = function() {
      var t = this, r = this.el.style;
      r.visibility = "hidden", r.opacity = "0", H.transform3dSupported && (r.willChange = ""), this._show = !1, this._longHideTimeout = setTimeout(function() {
        return t._longHide = !0;
      }, 500);
    }, e.prototype.hideLater = function(t) {
      this._show && !(this._inContent && this._enterable) && !this._alwaysShowContent && (t ? (this._hideDelay = t, this._show = !1, this._hideTimeout = setTimeout(lt(this.hide, this), t)) : this.hide());
    }, e.prototype.isShow = function() {
      return this._show;
    }, e.prototype.dispose = function() {
      clearTimeout(this._hideTimeout), clearTimeout(this._longHideTimeout);
      var t = this.el.parentNode;
      t && t.removeChild(this.el), this.el = this._container = null;
    }, e;
  })()
), nA = (
  /** @class */
  (function() {
    function e(t) {
      this._show = !1, this._styleCoord = [0, 0, 0, 0], this._alwaysShowContent = !1, this._enterable = !0, this._zr = t.getZr(), Kf(this._styleCoord, this._zr, t.getWidth() / 2, t.getHeight() / 2);
    }
    return e.prototype.update = function(t) {
      var r = t.get("alwaysShowContent");
      r && this._moveIfResized(), this._alwaysShowContent = r;
    }, e.prototype.show = function() {
      this._hideTimeout && clearTimeout(this._hideTimeout), this.el.show(), this._show = !0;
    }, e.prototype.setContent = function(t, r, i, n, a) {
      var o = this;
      F(t) && zt(""), this.el && this._zr.remove(this.el);
      var s = i.getModel("textStyle");
      this.el = new pe({
        style: {
          rich: r.richTextStyles,
          text: t,
          lineHeight: 22,
          borderWidth: 1,
          borderColor: n,
          textShadowColor: s.get("textShadowColor"),
          fill: i.get(["textStyle", "color"]),
          padding: sp(i, "richText"),
          verticalAlign: "top",
          align: "left"
        },
        z: i.get("z")
      }), D(["backgroundColor", "borderRadius", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"], function(u) {
        o.el.style[u] = i.get(u);
      }), D(["textShadowBlur", "textShadowOffsetX", "textShadowOffsetY"], function(u) {
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
      var t = this.el, r = this.el.getBoundingRect(), i = Zf(t.style);
      return [r.width + i.left + i.right, r.height + i.top + i.bottom];
    }, e.prototype.moveTo = function(t, r) {
      var i = this.el;
      if (i) {
        var n = this._styleCoord;
        Kf(n, this._zr, t, r), t = n[0], r = n[1];
        var a = i.style, o = ir(a.borderWidth || 0), s = Zf(a);
        i.x = t + o + s.left, i.y = r + o + s.top, i.markRedraw();
      }
    }, e.prototype._moveIfResized = function() {
      var t = this._styleCoord[2], r = this._styleCoord[3];
      this.moveTo(t * this._zr.getWidth(), r * this._zr.getHeight());
    }, e.prototype.hide = function() {
      this.el && this.el.hide(), this._show = !1;
    }, e.prototype.hideLater = function(t) {
      this._show && !(this._inContent && this._enterable) && !this._alwaysShowContent && (t ? (this._hideDelay = t, this._show = !1, this._hideTimeout = setTimeout(lt(this.hide, this), t)) : this.hide());
    }, e.prototype.isShow = function() {
      return this._show;
    }, e.prototype.dispose = function() {
      this._zr.remove(this.el);
    }, e;
  })()
);
function ir(e) {
  return Math.max(0, e);
}
function Zf(e) {
  var t = ir(e.shadowBlur || 0), r = ir(e.shadowOffsetX || 0), i = ir(e.shadowOffsetY || 0);
  return {
    left: ir(t - r),
    right: ir(t + r),
    top: ir(t - i),
    bottom: ir(t + i)
  };
}
function Kf(e, t, r, i) {
  e[0] = r, e[1] = i, e[2] = e[0] / t.getWidth(), e[3] = e[1] / t.getHeight();
}
var aA = new ve({
  shape: {
    x: -1,
    y: -1,
    width: 2,
    height: 2
  }
}), oA = (
  /** @class */
  (function(e) {
    G(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.prototype.init = function(r, i) {
      if (!(H.node || !i.getDom())) {
        var n = r.getComponent("tooltip"), a = this._renderMode = kb(n.get("renderMode"));
        this._tooltipContent = a === "richText" ? new nA(i) : new iA(i, {
          appendTo: n.get("appendToBody", !0) ? "body" : n.get("appendTo", !0)
        });
      }
    }, t.prototype.render = function(r, i, n) {
      if (!(H.node || !n.getDom())) {
        this.group.removeAll(), this._tooltipModel = r, this._ecModel = i, this._api = n;
        var a = this._tooltipContent;
        a.update(r), a.setEnterable(r.get("enterable")), this._initGlobalListener(), this._keepShow(), this._renderMode !== "richText" && r.get("transitionDuration") ? cp(this, "_updatePosition", 50, "fixRate") : kl(this, "_updatePosition");
      }
    }, t.prototype._initGlobalListener = function() {
      var r = this._tooltipModel, i = r.get("triggerOn");
      rg("itemTooltip", this._api, lt(function(n, a, o) {
        i !== "none" && (i.indexOf(n) >= 0 ? this._tryShow(a, o) : n === "leave" && this._hide(o));
      }, this));
    }, t.prototype._keepShow = function() {
      var r = this._tooltipModel, i = this._ecModel, n = this._api, a = r.get("triggerOn");
      if (this._lastX != null && this._lastY != null && a !== "none" && a !== "click") {
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
      if (!(a.from === this.uid || H.node || !n.getDom())) {
        var o = jf(a, n);
        this._ticket = "";
        var s = a.dataByCoordSys, l = cA(a, i, n);
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
          var c = aA;
          c.x = a.x, c.y = a.y, c.update(), vt(c).tooltipConfig = {
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
          var h = ig(a, i), v = h.point[0], f = h.point[1];
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
      this._tooltipModel && o.hideLater(this._tooltipModel.get("hideDelay")), this._lastX = this._lastY = this._lastDataByCoordSys = null, a.from !== this.uid && this._hide(jf(a, n));
    }, t.prototype._manuallyAxisShowTip = function(r, i, n, a) {
      var o = a.seriesIndex, s = a.dataIndex, l = i.getComponent("axisPointer").coordSysAxesInfo;
      if (!(o == null || s == null || l == null)) {
        var u = i.getSeriesByIndex(o);
        if (u) {
          var c = u.getData(), h = rn([c.getItemModel(s), u, (u.coordinateSystem || {}).model], this._tooltipModel);
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
          var s = vt(n);
          if (s.ssrType === "legend")
            return;
          this._lastDataByCoordSys = null;
          var l, u;
          un(n, function(c) {
            if (vt(c).dataIndex != null)
              return l = c, !0;
            if (vt(c).tooltipConfig != null)
              return u = c, !0;
          }, !0), l ? this._showSeriesItemTooltip(r, l, i) : u ? this._showComponentItemTooltip(r, u, i) : this._hide(i);
        } else
          this._lastDataByCoordSys = null, this._hide(i);
      }
    }, t.prototype._showOrMove = function(r, i) {
      var n = r.get("showDelay");
      i = lt(i, this), clearTimeout(this._showTimout), n > 0 ? this._showTimout = setTimeout(i, n) : i();
    }, t.prototype._showAxisTooltip = function(r, i) {
      var n = this._ecModel, a = this._tooltipModel, o = [i.offsetX, i.offsetY], s = rn([i.tooltipOption], a), l = this._renderMode, u = [], c = On("section", {
        blocks: [],
        noHeader: !0
      }), h = [], v = new ks();
      D(r, function(m) {
        D(m.dataByAxis, function(y) {
          var w = n.getComponent(y.axisDim + "Axis", y.axisIndex), S = y.value;
          if (!(!w || S == null)) {
            var b = tg(S, w.axis, n, y.seriesDataIndices, y.valueLabelOpt), x = On("section", {
              header: b,
              noHeader: !Me(b),
              sortBlocks: !0,
              blocks: []
            });
            c.blocks.push(x), D(y.seriesDataIndices, function(T) {
              var C = n.getSeriesByIndex(T.seriesIndex), M = T.dataIndexInside, A = C.getDataParams(M);
              if (!(A.dataIndex < 0)) {
                A.axisDim = y.axisDim, A.axisIndex = y.axisIndex, A.axisType = y.axisType, A.axisId = y.axisId, A.axisValue = Yp(w.axis, {
                  value: S
                }), A.axisValueLabel = b, A.marker = v.makeTooltipMarker("item", $n(A.color), l);
                var I = Bh(C.formatTooltip(M, !0, null)), k = I.frag;
                if (k) {
                  var P = rn([C], a).get("valueFormatter");
                  x.blocks.push(P ? R({
                    valueFormatter: P
                  }, k) : k);
                }
                I.text && h.push(I.text), u.push(A);
              }
            });
          }
        });
      }), c.blocks.reverse(), h.reverse();
      var f = i.position, d = s.get("order"), _ = Uh(c, v, l, d, n.get("useUTC"), s.get("textStyle"));
      _ && h.unshift(_);
      var p = l === "richText" ? `

` : "<br/>", g = h.join(p);
      this._showOrMove(s, function() {
        this._updateContentNotChangedOnAxis(r, u) ? this._updatePosition(s, f, o[0], o[1], this._tooltipContent, u) : this._showTooltipContent(s, g, u, Math.random() + "", o[0], o[1], f, null, v);
      });
    }, t.prototype._showSeriesItemTooltip = function(r, i, n) {
      var a = this._ecModel, o = vt(i), s = o.seriesIndex, l = a.getSeriesByIndex(s), u = o.dataModel || l, c = o.dataIndex, h = o.dataType, v = u.getData(h), f = this._renderMode, d = r.positionDefault, _ = rn([v.getItemModel(c), u, l && (l.coordinateSystem || {}).model], this._tooltipModel, d ? {
        position: d
      } : null), p = _.get("trigger");
      if (!(p != null && p !== "item")) {
        var g = u.getDataParams(c, h), m = new ks();
        g.marker = m.makeTooltipMarker("item", $n(g.color), f);
        var y = Bh(u.formatTooltip(c, !1, h)), w = _.get("order"), S = _.get("valueFormatter"), b = y.frag, x = b ? Uh(S ? R({
          valueFormatter: S
        }, b) : b, m, f, w, a.get("useUTC"), _.get("textStyle")) : y.text, T = "item_" + u.name + "_" + c;
        this._showOrMove(_, function() {
          this._showTooltipContent(_, x, g, T, r.offsetX, r.offsetY, r.position, r.target, m);
        }), n({
          type: "showTip",
          dataIndexInside: c,
          dataIndex: v.getRawIndex(c),
          seriesIndex: s,
          from: this.uid
        });
      }
    }, t.prototype._showComponentItemTooltip = function(r, i, n) {
      var a = this._renderMode === "html", o = vt(i), s = o.tooltipConfig, l = s.option || {}, u = l.encodeHTMLContent;
      if (U(l)) {
        var c = l;
        l = {
          content: c,
          // Fixed formatter
          formatter: c
        }, u = !0;
      }
      u && a && l.content && (l = Q(l), l.content = Nt(l.content));
      var h = [l], v = this._ecModel.getComponent(o.componentMainType, o.componentIndex);
      v && h.push(v), h.push({
        formatter: l.content
      });
      var f = r.positionDefault, d = rn(h, this._tooltipModel, f ? {
        position: f
      } : null), _ = d.get("content"), p = Math.random() + "", g = new ks();
      this._showOrMove(d, function() {
        var m = Q(d.get("formatterParams") || {});
        this._showTooltipContent(d, _, m, p, r.offsetX, r.offsetY, r.position, i, g);
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
        var f = i, d = this._getNearestPoint([o, s], n, r.get("trigger"), r.get("borderColor")), _ = d.color;
        if (v)
          if (U(v)) {
            var p = r.ecModel.get("useUTC"), g = B(n) ? n[0] : n, m = g && g.axisType && g.axisType.indexOf("time") >= 0;
            f = v, m && (f = Id(g.axisValue, f, p)), f = Ld(f, n, !0);
          } else if (rt(v)) {
            var y = lt(function(w, S) {
              w === this._ticket && (h.setContent(S, c, r, _, l), this._updatePosition(r, l, o, s, h, n, u));
            }, this);
            this._ticket = a, f = v(n, a, y);
          } else
            f = v;
        h.setContent(f, c, r, _, l), h.show(r, _), this._updatePosition(r, l, o, s, h, n, u);
      }
    }, t.prototype._getNearestPoint = function(r, i, n, a) {
      if (n === "axis" || B(i))
        return {
          color: a || (this._renderMode === "html" ? "#fff" : "none")
        };
      if (!B(i))
        return {
          color: a || i.color || i.borderColor
        };
    }, t.prototype._updatePosition = function(r, i, n, a, o, s, l) {
      var u = this._api.getWidth(), c = this._api.getHeight();
      i = i || r.get("position");
      var h = o.getSize(), v = r.get("align"), f = r.get("verticalAlign"), d = l && l.getBoundingRect().clone();
      if (l && d.applyTransform(l.transform), rt(i) && (i = i([n, a], s, o.el, d, {
        viewSize: [u, c],
        contentSize: h.slice()
      })), B(i))
        n = yt(i[0], u), a = yt(i[1], c);
      else if (F(i)) {
        var _ = i;
        _.width = h[0], _.height = h[1];
        var p = $d(_, {
          width: u,
          height: c
        });
        n = p.x, a = p.y, v = null, f = null;
      } else if (U(i) && l) {
        var g = uA(i, d, h, r.get("borderWidth"));
        n = g[0], a = g[1];
      } else {
        var g = sA(n, a, o, u, c, v ? null : 20, f ? null : 20);
        n = g[0], a = g[1];
      }
      if (v && (n -= Qf(v) ? h[0] / 2 : v === "right" ? h[0] : 0), f && (a -= Qf(f) ? h[1] / 2 : f === "bottom" ? h[1] : 0), ng(r)) {
        var g = lA(n, a, o, u, c);
        n = g[0], a = g[1];
      }
      o.moveTo(n, a);
    }, t.prototype._updateContentNotChangedOnAxis = function(r, i) {
      var n = this._lastDataByCoordSys, a = this._cbParamsList, o = !!n && n.length === r.length;
      return o && D(n, function(s, l) {
        var u = s.dataByAxis || [], c = r[l] || {}, h = c.dataByAxis || [];
        o = o && u.length === h.length, o && D(u, function(v, f) {
          var d = h[f] || {}, _ = v.seriesDataIndices || [], p = d.seriesDataIndices || [];
          o = o && v.value === d.value && v.axisType === d.axisType && v.axisId === d.axisId && _.length === p.length, o && D(_, function(g, m) {
            var y = p[m];
            o = o && g.seriesIndex === y.seriesIndex && g.dataIndex === y.dataIndex;
          }), a && D(v.seriesDataIndices, function(g) {
            var m = g.seriesIndex, y = i[m], w = a[m];
            y && w && w.data !== y.data && (o = !1);
          });
        });
      }), this._lastDataByCoordSys = r, this._cbParamsList = i, !!o;
    }, t.prototype._hide = function(r) {
      this._lastDataByCoordSys = null, r({
        type: "hideTip",
        from: this.uid
      });
    }, t.prototype.dispose = function(r, i) {
      H.node || !i.getDom() || (kl(this, "_updatePosition"), this._tooltipContent.dispose(), zl("itemTooltip", i));
    }, t.type = "tooltip", t;
  })(dr)
);
function rn(e, t, r) {
  var i = t.ecModel, n;
  r ? (n = new dt(r, i, i), n = new dt(t.option, n, i)) : n = t;
  for (var a = e.length - 1; a >= 0; a--) {
    var o = e[a];
    o && (o instanceof dt && (o = o.get("tooltip", !0)), U(o) && (o = {
      formatter: o
    }), o && (n = new dt(o, n, i)));
  }
  return n;
}
function jf(e, t) {
  return e.dispatchAction || lt(t.dispatchAction, t);
}
function sA(e, t, r, i, n, a, o) {
  var s = r.getSize(), l = s[0], u = s[1];
  return a != null && (e + l + a + 2 > i ? e -= l + a : e += a), o != null && (t + u + o > n ? t -= u + o : t += o), [e, t];
}
function lA(e, t, r, i, n) {
  var a = r.getSize(), o = a[0], s = a[1];
  return e = Math.min(e + o, i) - o, t = Math.min(t + s, n) - s, e = Math.max(e, 0), t = Math.max(t, 0), [e, t];
}
function uA(e, t, r, i) {
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
function Qf(e) {
  return e === "center" || e === "middle";
}
function cA(e, t, r) {
  var i = au(e).queryOptionMap, n = i.keys()[0];
  if (!(!n || n === "series")) {
    var a = Yn(t, n, i.get(n), {
      useDefault: !1,
      enableAll: !1,
      enableNone: !1
    }), o = a.models[0];
    if (o) {
      var s = r.getViewOfComponentModel(o), l;
      if (s.group.traverse(function(u) {
        var c = vt(u).tooltipConfig;
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
function hA(e) {
  Ou(YM), e.registerComponentModel(qM), e.registerComponentView(oA), e.registerAction({
    type: "showTip",
    event: "showTip",
    update: "tooltip:manuallyShowTip"
  }, Ut), e.registerAction({
    type: "hideTip",
    event: "hideTip",
    update: "tooltip:manuallyHideTip"
  }, Ut);
}
var fA = Object.defineProperty, vA = Object.getOwnPropertyDescriptor, Fu = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? vA(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (i ? o(t, r, n) : o(n)) || n);
  return i && n && fA(t, r, n), n;
};
Ou([iM, hA, bM]);
let zn = class extends Pe {
  constructor() {
    super(...arguments), this.items = [], this.language = "en";
  }
  firstUpdated() {
    const e = this.renderRoot.querySelector(".chart");
    e && (this.chart = u2(e, void 0, { renderer: "canvas" }), this.resizeObserver = new ResizeObserver(() => this.chart?.resize()), this.resizeObserver.observe(e), this.updateChart());
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
    return L`<div class="chart" role="presentation"></div>`;
  }
};
zn.styles = Hn`
    :host { display: block; width: 100%; height: 100%; min-width: 0; min-height: 0; }
    .chart { width: 100%; height: 100%; min-height: 0; }
  `;
Fu([
  Ge({ attribute: !1 })
], zn.prototype, "items", 2);
Fu([
  Ge()
], zn.prototype, "language", 2);
zn = Fu([
  qr("ploc-cellar-donut-chart")
], zn);
var dA = Object.defineProperty, pA = Object.getOwnPropertyDescriptor, Xe = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? pA(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (i ? o(t, r, n) : o(n)) || n);
  return i && n && dA(t, r, n), n;
};
const Jf = [
  "#D55E00",
  "#0072B2",
  "#009E73",
  "#E69F00",
  "#CC79A7",
  "#56B4E9",
  "#F0E442",
  "#6A3D9A"
];
let ge = class extends Pe {
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
      const n = await e.callWS({
        type: "call_service",
        domain: "ploc_cellar",
        service: "get_inventory",
        service_data: { config_entry_id: r },
        return_response: !0
      });
      i === this.requestGeneration && (this.inventory = n.response);
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
    if (!e) return Dt(this.hass?.language ?? "en", "never");
    const t = new Date(e);
    return Number.isNaN(t.getTime()) ? e : new Intl.DateTimeFormat(this.hass?.language ?? void 0, {
      dateStyle: "short",
      timeStyle: "short"
    }).format(t);
  }
  metric(e, t) {
    return L`
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
    const t = (o) => Dt(this.hass?.language ?? "en", o), r = /* @__PURE__ */ new Map();
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
    const r = (s) => Dt(this.hass?.language ?? "en", s), i = this.distribution(e), n = i.reduce((s, l) => s + l.bottles, 0), a = i.filter((s) => s.bottles > 0).map((s, l) => ({
      ...s,
      color: s.color ?? Jf[l % Jf.length]
    })), o = i.map((s) => `${s.name}: ${this.formatNumber(s.bottles)}`).join(", ");
    return L`
      <section class="group">
        <h3 class="group-title">${r(t)}</h3>
        ${n > 0 ? L`
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
            ${this.config?.show_statistics_legends === !1 ? $ : L`
              <div class="legend">
                ${a.map((s) => L`
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
        ` : L`<p class="muted">${r("statistics_empty")}</p>`}
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
    if (!e) return $;
    const t = e === "unlocated" ? "diagnostic_unlocated" : e === "negative" ? "diagnostic_negative" : "diagnostic_surplus", r = e === "unlocated" ? "diagnostic_detail_unlocated" : e === "negative" ? "diagnostic_detail_negative" : "diagnostic_detail_surplus", i = this.getDiagnosticWines(e), n = (o) => Dt(this.hass?.language ?? "en", o), a = (o) => e === "unlocated" ? o.unlocated_bottles ?? 0 : e === "negative" ? o.negative_movement_bottles ?? 0 : o.physical_surplus_bottles ?? 0;
    return L`
      <ha-dialog .open=${!0} header-title=${n(t)} @closed=${() => {
      this.activeDiagnostic = void 0;
    }}>
        <div class="diagnostic-detail-list">
          <p class="muted">${n(r)}</p>
          ${i.length ? i.map((o) => L`
            <section class="diagnostic-detail-item">
              <h4 class="diagnostic-detail-name">
                ${this.inventory?.wines.some((s) => s.id === o.id) || o.wine ? L`<button class="diagnostic-wine-link" type="button"
                      aria-haspopup="dialog"
                      @click=${() => this.openDiagnosticWine(o)}>${o.name}${o.vintage ? ` · ${o.vintage}` : ""}</button>` : L`${o.name}${o.vintage ? ` · ${o.vintage}` : ""}`}
              </h4>
              <dl class="diagnostic-detail-meta">
                <div><dt>${n("diagnostic_detail_quantity")}</dt><dd>${this.formatNumber(a(o))}</dd></div>
                <div><dt>${n("diagnostic_detail_in_cellar")}</dt><dd>${this.formatNumber(o.bottles_in_cellar)}</dd></div>
                <div><dt>${n("diagnostic_detail_stock")}</dt><dd>${this.formatNumber(o.effective_stock)}</dd></div>
                ${e === "negative" ? L`
                  <div><dt>${n("diagnostic_detail_purchased")}</dt><dd>${this.formatNumber(o.purchased ?? 0)}</dd></div>
                  <div><dt>${n("diagnostic_detail_consumed")}</dt><dd>${this.formatNumber(o.consumed ?? 0)}</dd></div>
                  <div><dt>${n("diagnostic_detail_balance")}</dt><dd>${this.formatNumber(o.movement_balance ?? 0)}</dd></div>
                ` : $}
              </dl>
            </section>
          `) : L`<p class="muted">${n("diagnostic_detail_empty")}</p>`}
        </div>
      </ha-dialog>
    `;
  }
  render() {
    const e = (h) => Dt(this.hass?.language ?? "en", h), t = this.inventory, r = this.config?.title ?? e("card_title"), i = this.config?.show_occupancy !== !1, n = this.config?.show_diagnostics !== !1, a = this.config?.show_statistics !== !1, o = t && t.total_positions > 0 ? Math.round(t.occupied_positions / t.total_positions * 100) : 0, s = t?.stock_reconstruction_complete ? [
      { key: "diagnostic_unlocated", value: t.unlocated_bottles ?? 0 },
      { key: "diagnostic_negative", value: t.negative_movement_bottles ?? 0 },
      { key: "diagnostic_surplus", value: t.physical_surplus_bottles ?? 0 }
    ].filter((h) => h.value > 0) : [], l = !!(t && (!t.stock_reconstruction_complete || s.length > 0 || t.positions_with_unknown_wine > 0)), u = t?.wines ?? [], c = t?.wine_references ?? u.length;
    return L`
      <ha-card>
        <header>
          <h2>${r}</h2>
          <button ?disabled=${this.loading} @click=${() => this.refresh()}>
            ${this.loading ? e("loading") : e("refresh")}
          </button>
        </header>
        ${this.error ? L`<div class="error">${this.error}</div>` : $}
        ${this.config?.config_entry_id ? $ : L`<div class="muted">${e("select_config")}</div>`}
        ${t ? L`
          ${t.stale ? L`<div class="warning">${e("stale")}</div>` : $}
          <div class="summary">
            ${this.metric(t.total_bottles, e("bottles_in_cellar"))}
            ${this.metric(
      t.total_stock_bottles ?? e("unknown_value"),
      e("reconstructed_stock")
    )}
            ${this.metric(c, e("stocked_references"))}
            ${this.metric(t.rack_count, e("racks"))}
          </div>
          ${i ? L`
            <section class="section" aria-label=${e("rack_occupancy")}>
              <div class="occupancy-heading">
                <span>${e("rack_occupancy")}</span>
                <span>${this.formatNumber(t.occupied_positions)} / ${this.formatNumber(t.total_positions)}</span>
              </div>
              <div class="occupancy-bar" role="progressbar"
                aria-label=${e("rack_occupancy")}
                aria-valuemin="0" aria-valuemax=${t.total_positions}
                aria-valuenow=${t.occupied_positions}>
                <div class="occupancy-fill" style=${`width: ${o}%`}></div>
              </div>
              <div class="muted">${e("empty_positions")}: ${this.formatNumber(Math.max(0, t.total_positions - t.occupied_positions))}</div>
            </section>
          ` : $}
          ${n && l ? L`
            <section class="section">
              <h3 class="section-title">${e("inventory_diagnostics")}</h3>
              ${t.stock_reconstruction_complete ? $ : L`<div class="warning">${e("reconstruction_incomplete")}</div>`}
              ${s.length ? L`
                <div class="diagnostics">
                  ${s.map((h) => {
      const v = h.key === "diagnostic_unlocated" ? "unlocated" : h.key === "diagnostic_negative" ? "negative" : "surplus";
      return L`
                      <button class="diagnostic" type="button" aria-haspopup="dialog"
                        @click=${() => {
        this.activeDiagnostic = v;
      }}>
                        <span class="diagnostic-value">${this.formatNumber(h.value)}</span>
                        <span class="label">${e(h.key)}</span>
                        <span class="diagnostic-hint">${e("diagnostic_detail_open")}</span>
                      </button>
                    `;
    })}
                </div>
              ` : $}
              ${t.positions_with_unknown_wine > 0 ? L`<div class="warning">${e("statistics_unknown_wine_positions").replace("{count}", this.formatNumber(t.positions_with_unknown_wine))}</div>` : $}
            </section>
          ` : $}
          ${a ? L`
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
          ` : $}
          <div class="muted section">${e("last_sync")}: ${this.formatSync(t.last_sync)}</div>
          ${this.renderDiagnosticDialog()}
          ${this.selectedWine ? L`
            <ploc-cellar-wine-detail
              .hass=${this.hass}
              .wine=${this.selectedWine}
              @wine-detail-closed=${() => {
      this.selectedWine = void 0;
    }}>
            </ploc-cellar-wine-detail>
          ` : $}
        ` : $}
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
ge.styles = Hn`
    :host { display: block; }
    ha-card { padding: 16px; color: var(--primary-text-color); }
    header { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    h2 { margin: 0; font-size: 1.25rem; font-weight: 500; }
    button { color: var(--primary-text-color); background: var(--secondary-background-color); border: 0; border-radius: 8px; padding: 8px 12px; cursor: pointer; }
    button[disabled] { opacity: .5; cursor: default; }
    .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 8px; margin: 16px 0; }
    .metric { background: var(--secondary-background-color); border-radius: 10px; padding: 12px; min-width: 0; }
    .value { display: block; font-size: 1.4rem; font-weight: 600; font-variant-numeric: tabular-nums; }
    .label, .muted { color: var(--secondary-text-color); font-size: .85rem; }
    .section { margin-top: 16px; }
    .section-title { margin: 0 0 8px; font-size: .95rem; font-weight: 500; }
    .occupancy-heading { display: flex; justify-content: space-between; gap: 8px; margin-bottom: 6px; font-size: .85rem; }
    .occupancy-bar { height: 9px; border-radius: 999px; overflow: hidden; background: var(--divider-color); }
    .occupancy-fill { height: 100%; border-radius: inherit; background: var(--primary-color); }
    .diagnostics { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 8px; }
    .diagnostic { display: flex; flex-direction: column; align-items: flex-start; width: 100%; height: 100%; box-sizing: border-box; text-align: left; color: inherit; border: 1px solid var(--divider-color); border-radius: 8px; padding: 10px; min-width: 0; cursor: pointer; }
    .diagnostic:hover { background: var(--secondary-background-color); }
    .diagnostic:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
    .diagnostic-value { display: block; font-weight: 600; font-variant-numeric: tabular-nums; }
    .diagnostic-hint { display: block; align-self: flex-end; margin-top: auto; padding-top: 8px; color: var(--secondary-text-color); font-size: .75rem; text-align: right; }
    .diagnostic-detail-list { display: grid; gap: 12px; max-height: min(60vh, 520px); overflow: auto; }
    .diagnostic-detail-item { border-bottom: 1px solid var(--divider-color); padding: 0 0 10px; }
    .diagnostic-detail-name { margin: 0 0 6px; font-weight: 600; }
    .diagnostic-wine-link { padding: 0; border: 0; background: none; color: inherit; font: inherit; font-weight: inherit; text-align: left; cursor: pointer; }
    .diagnostic-wine-link:hover { color: var(--primary-color); text-decoration: underline; }
    .diagnostic-wine-link:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 3px; border-radius: 2px; }
    .diagnostic-detail-meta { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 6px 14px; }
    .diagnostic-detail-meta div { display: flex; justify-content: space-between; gap: 12px; }
    .diagnostic-detail-meta dt { color: var(--secondary-text-color); }
    .diagnostic-detail-meta dd { margin: 0; font-weight: 500; font-variant-numeric: tabular-nums; }
    .groups { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr)); gap: 12px; margin-top: 14px; }
    .group { min-width: 0; border: 1px solid var(--divider-color); border-radius: 10px; padding: 12px; }
    .group-title { margin: 0 0 12px; font-size: 1rem; font-weight: 500; }
    .chart-content { display: grid; grid-template-columns: minmax(112px, .85fr) minmax(0, 1.15fr); gap: 12px; align-items: center; }
    .chart-content.chart-content-no-legend { grid-template-columns: minmax(0, 1fr); }
    .donut { position: relative; display: block; width: 100%; max-width: 150px; aspect-ratio: 1; justify-self: center; }
    .donut-chart { display: block; width: 100%; height: 100%; }
    .donut-center { position: absolute; inset: 17%; display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 50%; background: var(--card-background-color, var(--ha-card-background, #fff)); pointer-events: none; }
    .donut-total { color: var(--primary-text-color); font-size: 1rem; font-weight: 600; font-variant-numeric: tabular-nums; }
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
Xe([
  Ge({ attribute: !1 })
], ge.prototype, "hass", 2);
Xe([
  nt()
], ge.prototype, "config", 2);
Xe([
  nt()
], ge.prototype, "inventory", 2);
Xe([
  nt()
], ge.prototype, "loading", 2);
Xe([
  nt()
], ge.prototype, "error", 2);
Xe([
  nt()
], ge.prototype, "activeDiagnostic", 2);
Xe([
  nt()
], ge.prototype, "selectedWine", 2);
ge = Xe([
  qr("ploc-cellar-card")
], ge);
let tv = class extends ge {
};
tv = Xe([
  qr("ploc-cellar-statistics-card")
], tv);
window.customCards ??= [];
window.customCards.push({
  type: "ploc-cellar-card",
  name: Ci("picker_overview_name"),
  description: Ci("picker_overview_description")
});
export {
  ge as PlocCellarCard,
  tv as PlocCellarStatisticsCard
};
