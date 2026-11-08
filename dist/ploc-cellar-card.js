const Da = globalThis, Wl = Da.ShadowRoot && (Da.ShadyCSS === void 0 || Da.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Hl = /* @__PURE__ */ Symbol(), Hu = /* @__PURE__ */ new WeakMap();
let ad = class {
  constructor(t, r, i) {
    if (this._$cssResult$ = !0, i !== Hl) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = r;
  }
  get styleSheet() {
    let t = this.o;
    const r = this.t;
    if (Wl && t === void 0) {
      const i = r !== void 0 && r.length === 1;
      i && (t = Hu.get(r)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Hu.set(r, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const vg = (e) => new ad(typeof e == "string" ? e : e + "", void 0, Hl), Vn = (e, ...t) => {
  const r = e.length === 1 ? e[0] : t.reduce((i, n, a) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[a + 1], e[0]);
  return new ad(r, e, Hl);
}, pg = (e, t) => {
  if (Wl) e.adoptedStyleSheets = t.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of t) {
    const i = document.createElement("style"), n = Da.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = r.cssText, e.appendChild(i);
  }
}, Gu = Wl ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let r = "";
  for (const i of t.cssRules) r += i.cssText;
  return vg(r);
})(e) : e;
const { is: gg, defineProperty: mg, getOwnPropertyDescriptor: yg, getOwnPropertyNames: _g, getOwnPropertySymbols: wg, getPrototypeOf: bg } = Object, mo = globalThis, Yu = mo.trustedTypes, Sg = Yu ? Yu.emptyScript : "", xg = mo.reactiveElementPolyfillSupport, cn = (e, t) => e, Ha = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Sg : null;
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
} }, Gl = (e, t) => !gg(e, t), Xu = { attribute: !0, type: String, converter: Ha, reflect: !1, useDefault: !1, hasChanged: Gl };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), mo.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let ci = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, r = Xu) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(t, r), !r.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(t, i, r);
      n !== void 0 && mg(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, r, i) {
    const { get: n, set: a } = yg(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? Xu;
  }
  static _$Ei() {
    if (this.hasOwnProperty(cn("elementProperties"))) return;
    const t = bg(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(cn("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(cn("properties"))) {
      const r = this.properties, i = [..._g(r), ...wg(r)];
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
      for (const n of i) r.unshift(Gu(n));
    } else t !== void 0 && r.push(Gu(t));
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
    return pg(t, this.constructor.elementStyles), t;
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
      const a = (i.converter?.toAttribute !== void 0 ? i.converter : Ha).toAttribute(r, i.type);
      this._$Em = t, a == null ? this.removeAttribute(n) : this.setAttribute(n, a), this._$Em = null;
    }
  }
  _$AK(t, r) {
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const a = i.getPropertyOptions(n), o = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : Ha;
      this._$Em = n;
      const s = o.fromAttribute(r, a.type);
      this[n] = s ?? this._$Ej?.get(n) ?? s, this._$Em = null;
    }
  }
  requestUpdate(t, r, i, n = !1, a) {
    if (t !== void 0) {
      const o = this.constructor;
      if (n === !1 && (a = this[t]), i ??= o.getPropertyOptions(t), !((i.hasChanged ?? Gl)(a, r) || i.useDefault && i.reflect && a === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, i)))) return;
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
ci.elementStyles = [], ci.shadowRootOptions = { mode: "open" }, ci[cn("elementProperties")] = /* @__PURE__ */ new Map(), ci[cn("finalized")] = /* @__PURE__ */ new Map(), xg?.({ ReactiveElement: ci }), (mo.reactiveElementVersions ??= []).push("2.1.2");
const Yl = globalThis, qu = (e) => e, Ga = Yl.trustedTypes, Zu = Ga ? Ga.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, od = "$lit$", nr = `lit$${Math.random().toFixed(9).slice(2)}$`, sd = "?" + nr, Tg = `<${sd}>`, Yr = document, Tn = () => Yr.createComment(""), Cn = (e) => e === null || typeof e != "object" && typeof e != "function", Xl = Array.isArray, Cg = (e) => Xl(e) || typeof e?.[Symbol.iterator] == "function", No = `[ 	
\f\r]`, Ni = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Qu = /-->/g, Ku = />/g, pr = RegExp(`>|${No}(?:([^\\s"'>=/]+)(${No}*=${No}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ju = /'/g, ju = /"/g, ld = /^(?:script|style|textarea|title)$/i, Ag = (e) => (t, ...r) => ({ _$litType$: e, strings: t, values: r }), I = Ag(1), xi = /* @__PURE__ */ Symbol.for("lit-noChange"), R = /* @__PURE__ */ Symbol.for("lit-nothing"), $u = /* @__PURE__ */ new WeakMap(), Fr = Yr.createTreeWalker(Yr, 129);
function ud(e, t) {
  if (!Xl(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Zu !== void 0 ? Zu.createHTML(t) : t;
}
const Mg = (e, t) => {
  const r = e.length - 1, i = [];
  let n, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = Ni;
  for (let s = 0; s < r; s++) {
    const l = e[s];
    let u, c, h = -1, d = 0;
    for (; d < l.length && (o.lastIndex = d, c = o.exec(l), c !== null); ) d = o.lastIndex, o === Ni ? c[1] === "!--" ? o = Qu : c[1] !== void 0 ? o = Ku : c[2] !== void 0 ? (ld.test(c[2]) && (n = RegExp("</" + c[2], "g")), o = pr) : c[3] !== void 0 && (o = pr) : o === pr ? c[0] === ">" ? (o = n ?? Ni, h = -1) : c[1] === void 0 ? h = -2 : (h = o.lastIndex - c[2].length, u = c[1], o = c[3] === void 0 ? pr : c[3] === '"' ? ju : Ju) : o === ju || o === Ju ? o = pr : o === Qu || o === Ku ? o = Ni : (o = pr, n = void 0);
    const f = o === pr && e[s + 1].startsWith("/>") ? " " : "";
    a += o === Ni ? l + Tg : h >= 0 ? (i.push(u), l.slice(0, h) + od + l.slice(h) + nr + f) : l + nr + (h === -2 ? s : f);
  }
  return [ud(e, a + (e[r] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class An {
  constructor({ strings: t, _$litType$: r }, i) {
    let n;
    this.parts = [];
    let a = 0, o = 0;
    const s = t.length - 1, l = this.parts, [u, c] = Mg(t, r);
    if (this.el = An.createElement(u, i), Fr.currentNode = this.el.content, r === 2 || r === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (n = Fr.nextNode()) !== null && l.length < s; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const h of n.getAttributeNames()) if (h.endsWith(od)) {
          const d = c[o++], f = n.getAttribute(h).split(nr), v = /([.?@])?(.*)/.exec(d);
          l.push({ type: 1, index: a, name: v[2], strings: f, ctor: v[1] === "." ? kg : v[1] === "?" ? Pg : v[1] === "@" ? Lg : yo }), n.removeAttribute(h);
        } else h.startsWith(nr) && (l.push({ type: 6, index: a }), n.removeAttribute(h));
        if (ld.test(n.tagName)) {
          const h = n.textContent.split(nr), d = h.length - 1;
          if (d > 0) {
            n.textContent = Ga ? Ga.emptyScript : "";
            for (let f = 0; f < d; f++) n.append(h[f], Tn()), Fr.nextNode(), l.push({ type: 2, index: ++a });
            n.append(h[d], Tn());
          }
        }
      } else if (n.nodeType === 8) if (n.data === sd) l.push({ type: 2, index: a });
      else {
        let h = -1;
        for (; (h = n.data.indexOf(nr, h + 1)) !== -1; ) l.push({ type: 7, index: a }), h += nr.length - 1;
      }
      a++;
    }
  }
  static createElement(t, r) {
    const i = Yr.createElement("template");
    return i.innerHTML = t, i;
  }
}
function Ti(e, t, r = e, i) {
  if (t === xi) return t;
  let n = i !== void 0 ? r._$Co?.[i] : r._$Cl;
  const a = Cn(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== a && (n?._$AO?.(!1), a === void 0 ? n = void 0 : (n = new a(e), n._$AT(e, r, i)), i !== void 0 ? (r._$Co ??= [])[i] = n : r._$Cl = n), n !== void 0 && (t = Ti(e, n._$AS(e, t.values), n, i)), t;
}
class Dg {
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
    const { el: { content: r }, parts: i } = this._$AD, n = (t?.creationScope ?? Yr).importNode(r, !0);
    Fr.currentNode = n;
    let a = Fr.nextNode(), o = 0, s = 0, l = i[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let u;
        l.type === 2 ? u = new Wn(a, a.nextSibling, this, t) : l.type === 1 ? u = new l.ctor(a, l.name, l.strings, this, t) : l.type === 6 && (u = new Ig(a, this, t)), this._$AV.push(u), l = i[++s];
      }
      o !== l?.index && (a = Fr.nextNode(), o++);
    }
    return Fr.currentNode = Yr, n;
  }
  p(t) {
    let r = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, r), r += i.strings.length - 2) : i._$AI(t[r])), r++;
  }
}
class Wn {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, r, i, n) {
    this.type = 2, this._$AH = R, this._$AN = void 0, this._$AA = t, this._$AB = r, this._$AM = i, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    t = Ti(this, t, r), Cn(t) ? t === R || t == null || t === "" ? (this._$AH !== R && this._$AR(), this._$AH = R) : t !== this._$AH && t !== xi && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Cg(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== R && Cn(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Yr.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: r, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = An.createElement(ud(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n) this._$AH.p(r);
    else {
      const a = new Dg(n, this), o = a.u(this.options);
      a.p(r), this.T(o), this._$AH = a;
    }
  }
  _$AC(t) {
    let r = $u.get(t.strings);
    return r === void 0 && $u.set(t.strings, r = new An(t)), r;
  }
  k(t) {
    Xl(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let i, n = 0;
    for (const a of t) n === r.length ? r.push(i = new Wn(this.O(Tn()), this.O(Tn()), this, this.options)) : i = r[n], i._$AI(a), n++;
    n < r.length && (this._$AR(i && i._$AB.nextSibling, n), r.length = n);
  }
  _$AR(t = this._$AA.nextSibling, r) {
    for (this._$AP?.(!1, !0, r); t !== this._$AB; ) {
      const i = qu(t).nextSibling;
      qu(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class yo {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, r, i, n, a) {
    this.type = 1, this._$AH = R, this._$AN = void 0, this.element = t, this.name = r, this._$AM = n, this.options = a, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = R;
  }
  _$AI(t, r = this, i, n) {
    const a = this.strings;
    let o = !1;
    if (a === void 0) t = Ti(this, t, r, 0), o = !Cn(t) || t !== this._$AH && t !== xi, o && (this._$AH = t);
    else {
      const s = t;
      let l, u;
      for (t = a[0], l = 0; l < a.length - 1; l++) u = Ti(this, s[i + l], r, l), u === xi && (u = this._$AH[l]), o ||= !Cn(u) || u !== this._$AH[l], u === R ? t = R : t !== R && (t += (u ?? "") + a[l + 1]), this._$AH[l] = u;
    }
    o && !n && this.j(t);
  }
  j(t) {
    t === R ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class kg extends yo {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === R ? void 0 : t;
  }
}
class Pg extends yo {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== R);
  }
}
class Lg extends yo {
  constructor(t, r, i, n, a) {
    super(t, r, i, n, a), this.type = 5;
  }
  _$AI(t, r = this) {
    if ((t = Ti(this, t, r, 0) ?? R) === xi) return;
    const i = this._$AH, n = t === R && i !== R || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, a = t !== R && (i === R || n);
    n && this.element.removeEventListener(this.name, this, i), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ig {
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
const Eg = Yl.litHtmlPolyfillSupport;
Eg?.(An, Wn), (Yl.litHtmlVersions ??= []).push("3.3.3");
const Rg = (e, t, r) => {
  const i = r?.renderBefore ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const a = r?.renderBefore ?? null;
    i._$litPart$ = n = new Wn(t.insertBefore(Tn(), a), a, void 0, r ?? {});
  }
  return n._$AI(e), n;
};
const ql = globalThis;
class ke extends ci {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Rg(r, this.renderRoot, this.renderOptions);
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
ke._$litElement$ = !0, ke.finalized = !0, ql.litElementHydrateSupport?.({ LitElement: ke });
const Bg = ql.litElementPolyfillSupport;
Bg?.({ LitElement: ke });
(ql.litElementVersions ??= []).push("4.2.2");
const Og = "data:font/woff2;base64,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", Ng = "data:font/woff2;base64,d09GMgABAAAAAE7oABAAAAABSRQAAE6DAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGoE0G6g8HIUgBmA/U1RBVEQAiDIRCAqEoxyDsHQLhT4AATYCJAOKeAQgBYVWB5xlDAdbFQxxAG86aQW6AxCtp5e6r2DbMrbdDsqf31PrmVFh4wCghL2b4P//lKRDrnZWvbsLCCGJzD2sa3pIavdEZpB6KDN3RXFCM9vqYPMkOKk5DVCvo2XtZ8oQgosgeM66Q2aOzGRK74/yV2aEst4tskKGMCLGvGR9oFbL3fIg7qbrH/AjKA6CIDRNQJLbVMkPPkLu0V5Q8qgq5TsekiigkfCSrtYWJzwH3Jh4yUac/POw9rRz38yfdcQ8FMhicdmKehPtRE9iJdKCdZLJDM/Prf//+3/5WRbLpsaobbCNbEEFJWxCAaPAxI4TTjEK7dPGuDu9EyP6vCgjD3WmnpQn3LP+t32izUF2gc/yVZZJEYWGcSr1+As3+77XTZoKSQXmMBblCEJYFFcA//avTlwUuq9/seVIfgqyXaAQz107rc0MscCDe/d35VFaoEsksShN60/wqV/nWm+suTrLr3W0a3tshJ785IV24kgj8PvYNMw3OGftLBn30j4L+cK92mxqk3TtgAoZcZHu1nGaDM0r5EGHSayf/n9zWl+TRblZNJQo7RCBZDl2GycpvnaJT9bVvlKJkgIPIHqaw3WxYHf7SALzoIF55jyCFwZOt/lAeOLvv96xKE+49gBZJB7+iKgucoFG93g+nez3ctnUzLReiiAojEE+ja6YIcF/mittZt8RTXHPYQqywp6v80lmt7d/384B53LE6QEWEIWssUyujoQiXeF9iaAddZtQbGjVNXPSffFWTpPuyqlyWmWmmQBAJKXppG9Fz2yWXjgJ/OD0n+b8stOmsLfqgDygMUsgTZpJO2mm+Snu7/YvtgsE8wLzkqbd9sMBk2KygiQ6P/LLE1KekOvl/f/7adn/k0IyRHT8LABaIDv005TSDvy0HcT8waSD6VB2Tt5NO3T7kiGGzHKywOABQALSi6usXLkr3Ai9ZHWFrKxcY1cDWbV+31Kl0tv9Lq0gdgUgG1ATcrrdcd1RH9dOnVZPRn5BJ6OIWTClseDAUBhCWHxn9vmfxNhdEohRhRCuaoxrMptnz623PlZqQPCitxygohltX73GXr+amr6ezWtmprGX6C7gHxQEFBIw8e5mzdpTm4jIBu7xLoT9iYJwg5wF8iEKQE2CAwYIbUkPhoKjyXzSaB8IywmMSHZf6IfeVP1RaHWKdBl9kYRkSIKz+NC2bNqdW8cXr715tb9gnFE+0NnfAbkC5CQEUka5oB4uHwEMLg8McpxHHfTuezsTon0vdUq0nxoTIrrA5kQLBT3DNWnN4Flv2YtP65zo/2LDRPKV8CMIB2QQEKsC5xgUZv2aMMjRk3NP9t/eummTKQZiIWCAUcDg7Zx48NYKR2CmJSfCQQObtdVgO3sPdmpGsJbdAasUfesX1iY1ZlOwAyVPvDnxpvjEQzPzMWl3paunhwTeSgXAG8sVIpsWD8BRcQnc6k2e2AIpK06sLYMbH2fse+H0ELnOcBaSI4evWN904H4IT4+lY4FCefLdCA+tmB6PUmISjIcxMAqGohT96r5H/0G/1r9Bn6MPC2/zKtZeQH9Ce9AjsPv3qBvdAlkPrF1Yji5EZ0Om4f5J6Bg01i0jYYdr/bVoJQUDdKBlwikcQbPRVJIkVB1BZ5tRDwyg8agLdaJmhQu5XovKUZHLQWkoKUTAZ8QLwVvwF+R1HngK7iP/5ubL4Bec5YldHwJ7wx1gE4WdYDVtXQrmSzuOnQImgBZ0OWiADIWqjvqDUkg+VKbkY2sy8IWxIHJvsUOMsGpQhosJICy04Kol0AyE/A0gwq+5X/ASUAoEws/LeTx35/pchJxL3/r0HJuDs3u2Tdesm5WzeObOjGmdcdM0dTN4Bh7Sp+8UT+6BgvHWI1NbBLamq1SSttqSLdVTauWdJ4q+vZLsLWM048B2yW4X93/iUodfmS/r9PON5Ivq3HM2lHjenss7Us3cEQmsw/VqNLnqKue6a23S6/ET16Po7eEqzfZf9fyoDdGVK+yyNthRt21bjlU40dIx+BP+seff2mgQ3MtOH1bQEXPVynb13inrbOsRmATf+Bu4jWjDSbanQqv9tEecDpnZODOvidt0eP0Laj/YW/qz50UX+9RXjgBgf1wgpvDDjaoLkc3mG3JhFgxxKYM+1UqCxLEY1AMY9QEuH7sGTbamOs30JsTdAoGCmok5aVqjLpPSmqaMy5hssJGJhL2ddnT22LWOVbLnQnPHJrKC4rAFuU1xArKxYXZEXnuk9xLpWtBW6/R5WuXJJ1FK4ELrda+bn+NDECSCAhAfSoY2QUnQVug+tOE1NLulnndgwaunhkM1LNewQsNKDas0rO7Cmtcu8ZWMZSTtNFLdc5bLIFgWPHv5m3PndoGTCKLd6Tjpa655bSCcdRn6RmVTs8rlagqQyhfbXzjdBh5fajnZhSsdk7xdRpIMl6xd3FJGYSGaTZKaJQmMZ7pgEKzrFPyNZiKHcrRFfTJc+Fa1fwGv+VQESC/yYbQMNcvr0KtUDi63/LLScUgdkh1CNnkyndyD0la7bUduymbWuZcw1OCEpW4KJznNTqS/i5Fq1ECGOoOVHcDfhSAOhsB5yEfkPzCU2pE/sAfFyEt5DLkLvlzZKcg5DtY2j61ueyyfpLhwnWoluRJq8ea5sxgzwtZlqPNi46CaGqvDYA4Uy/uut+flLH5lWLR2r2WTTsHiKQal3pfwqsAUXl5yvKfxlRd63NS/3I7sOZTkKi2SucBHfkB04i4UCUfxv8RjxF0GdmEnV1dgNVZhJf9ukBC0R+CSCCVho6HfsoQBp0fodhBnhGIGpnMa5SidGiPxvlQrZwtM3/j1digpP4OvI4h0AYQQ8IxvwaALQfoNFKOYxV3rQhC3atjMPOJa0FpBMxCBMPYC9ejLQAMEEEAS+4A0GzTgmMpJxFnEliC0oIVNE0UT14CrGAYYYKAOLNMSpR3Wi8SmjiawHUeqgE4qiSmhSNFBEA7mKoPGmgx5N67Y8YX42Atb8Q4dK9EEmzSvbXTiOp6ACwmkkCEUcii0EiybsCnvx+vzIEgRgpMHriP6NBSRshmGEKo6GNk+o0BWNB+7nbN245kEuUP7N+t7x1jL8ttxnhPcRvQK3zZ/O191xGSmS1oZRhIIbvlGyrNwfPaGyg15e4SD+23/DAnQG3ILmiMnY4imFgBVwoG2D+Ub+z3Q9G9cLxFfndu3yyDCl5KQoPMmp9VxmAaJC4hiJ+9/yr5zzvz06eqNZO/4M9Mvzx/qOBo7PFif0mKT9Emmd/MI++X5q4PbpXP1qtTdErPZev9SKZn73H6jIu0yFFQaT5WO78t9e9PBxjINs1V1ZjuTQSeA9L+8ItUDYDe+RQYXw+4u0/Zw4sQvoZ92WoZ7lbL2m6I2lJt46KbLJ/Z1Qqv84P9CO2RIwADIhgwQECLSsCGL5ccRFCSTJV+oQmU0+hrBrNkE8dq0CZhhnqDFlsqy3Cq5OqxXaI/9Sh13Xl9XXDHEdfcM9cADIz3yyChPPNPkd38Y7aOPxvoSERoXL63pGTJYXkklVkC4wWAsCAQRgMGwsCEEhEDnglAUwOj/8SzJMjBkysQbRYV83gDAQDVwtUagatSIM9bLMBO1QkwxHWJ+oRHLSBpuJWy1dUgjKrLsE7KfZ1AHHNP0cSflDDzWP/pJn3M+/MWFCN2rN77oMngmnqavuia3C426R3Q+YIGt2X4LUW9BdEoKHYGg4/1YAjFDYKBpFMYyBE5C3Ig+MlQkITT8tRAcDeYixIuPnuCSLZQnp1iRFg1kzVmxoAFHoRZMWGBHrEOif3gERM5USX9gKDgaAJ4tQogTkYcHaKCBAAxEYABggwOuw/WzELOXQT2fOodCVkSEWIOCCQIAGOCs5ICZoQvxymILBzFdE+p3LQrOsltXiPWz/QGgjnWXhy/g6A+9/0yvKP3R74hk7LPTTppf/S4lF4kF2M0Q9cYIjWEt6GVkAfrVSE8+nlpS9mbZlBReggPJvnKXkdRLspQkMeLhojOAMIACAQAGEqBhAnJJnqZ/OWu92TKF43y+68KSRK9rtQ4cbCnflyA8CBZYaJHFlliK4Ei3tdqgCHLEfB0KM8NM7WabY14fJ+or9Wlfk4B+AZrUVlx3bddEgxpplCbzMfMwAXUmOsPiQDgcAucPP7mL3pUVk3+aXE+8mnmKHI+8HNz5dlSTNBmqUrFMSdzstCTT4EM1WYoHJ7Grnrs8t3tu8RzvmeSp8BS6M88YFYOAXKJxNtum25XYyaDD6L8zTTsfTHHAQ9vMe4TTS4eGX4Hef0irIfxnJE6TE+S/s8Hq//9B6wOJrwF/BuKiJAvkGkA9s5qQCwR3Q5jXn43sGhWC/mGUsHhUDxUe1EQK+ROBlY10gF/x+NEsUTUBWCZFV9mPwVs8MG5y67KX08TmtbBlddTd3Z7024gnbKImaXKmZCqmdmbOkTk+P80vc2+BiQAoIAOVtFtGlylkGplJ5pDFyNJkA2QjZFNl82SLZMtka2Uf5HJ5h3y9fKN8q3yHfLd8n/yQ/KiCvdGwcfa3b6XSQ05A1a+8eltPvggMb1Vkfe6zi+xwsstRZyHxirroirFYiqP4V3sSqTf3f9KyNufS3plb87DncNiJVU5mFUknM0F/nETtqjWmriMzYx+bMnkAr5Q4/d8N/s/6+z/03VUGlBYAtH7nT2T8ad+85aX8fl8CNqRyfzTVL7YdvHDlZg+8Ms7WnQdPXrwhRMvNBRMn26Qg5ioHcW743ni0o9e5m8z/30Nvx9IcDRoX20TLTbZSq1UmWYFgNaI16ElREghJjJEMNaGpqUxJYXoa01Lj+R5HB5WdQm0lsoHcNlICm6ntprPPfnoHGP3A4CCTQ2yOCdMj0lnhTjslxnk+l8X6hcdFM1zX7qaZbgi4L9VjKR5J9lCOl7K9kOW5AT7r74NCf6r0SV/vVPioyle1wdAgdZGghihQfWRYJ0Gvcm+1RIfEusT5VZG/lPlfiX+U+lcf/8HiY6WktVeiK6L9bEJcaDx+14yOYUxMeCK0JCQ2ktkk3gVel8xyy1x3FftbP++leSLXK8MjwH0qrajyCiuurIxykaxF9h12WnzrcXXS2MPsMIsjrI6yO87hBKeTovzI5Sdu50Q4Y7bb5rhjnnvSPZXhmTy/yfdGTRD0lC+qfTM4BGqMCg0NhYYEoGFh0IiIcEyOXDkLy1Zs7iIEPQCD92/oIHoExHwPWs+CoMf+QK99EAjcAcJxAAKFQoEtiiplBFnUQZgDITLzQZtFeRbUFNtpaASO8VY1RIh04Q5Kg0QxkUVLrKHCgCkkCWvjolEalkKYBfopFkyBHbmIFYXDYyAG2N5FMjKnPsD03uEZimfgYIWLRAGZiBA4KxDm9xCJYszh7SoIDqtRbJactLMHVjhXDC68+UvhFSeg6w5UrTGS+cyU2EN+jM+3cxvTphp44eAtfPUOWpBfvUUCMNzlSU9YGxDnqG1ZJ21SD1pet+tkjXWeecZy3VloaHse1GuxZIkSky3lMO45UPoj/dHiiXjv6SeVkfawn5BlmFqJe0JbpKulAYkHMrTZ6Ny8MrvqdeL+Eq/2Kn/x+ehnMuOUD7DbuZ3uSGyJCBZfEXYnglfvJNlhFww3dp1+EYjUjkCsQsgVDNhdLFBck11Hrzo/+EN/2B+/+Rmu+AFTuhRakKZMDHoThXICC6B+ZEtzd6r3qLZZkBuVcU8MAgKWBHaiQLMkqYxKXPMmRvkccz2OZTAE0IATjrsjTIbgHUNHMne2NlAm6cvm+wxU+TwHlvPY73dOdOwDL+qY6P1kzDHGcWzH4hPG4Go4nACVbI0miAajImImRBEnKR20BWAtDXQItaCOkE0dFFEQISIOroUjV0c9Tq4Uj+KXMFAb/MT5yE4W4ePNAL1B5h1DBdoyRdy5RNgzERQ9g7MCkpOlsrPtIIWKlCc46UmiqaV7Xu8UKLQQLFM2uWAwzdqOoF1AASSAvd4Q3Jo0wqexcQgVKBA6eAuvYJZfEqbOTauKSv6Ob8W3zGcb3e6xRSsBO+jhiHqsD0b1endM4rGsGdOqr13qeT3t4MyCJ/XzuUzDuO8oALY8EPo49eEJRkB3Og/Xute5lXbx2SKJwPXyBYtG44fgXx10hU1SGVsO+FfT6n/h1gUcYWAEJHcRpkgA0nU+UpMQbRXwgHZgDeQme89AMbDenDq2tRSKb7jd3y0oqxOTKMAbJFEGS92CGvXJgdLfIkGT4Js5zW5kkdOV+iptLhSad8X2g3VGIErx+fDaYsdtLlYm42WBmowqXqVU9UcrEt/XMqkt14g6tT9Qr2vzHHNHSgcUKSPwaq8PyjiCm4LXvNDNsRtFahvvrr98pluKBJRfMEaC4yMugDboANDsYuUG3/bRqB0+jtPGgSA4yMUpm2E7wa+pyeXLmm8aOuKCU30ENPFVUbPemkOc+YgTP6eA4pqqL0qUBUgkLjAQ09EVrMlm4pea2hPEp4IzBiguaf54NK+82NXThx5pi1eliT/a81TdflT6gtR5vq64Fv0L/jd48FcB5FM8UZ6IlvpK8njpWkVyFSAk9M88IMA9Fys5KdFGXReaByW4QnxwmZVINwMQCo6uBEgcK7D9QJyTiCdUxdaUzRaadk7ouzEPScQMgd9FQfWxt/d0AfEuI7r6Bxxy6jirDADJA1B8GCZ4DQ+QtW3s75FIZRHf1ZpfygNj9nnNKAqN07Z/XmyRrMxIEo1UesUkL0NSLoK74DwRR4Bim1H8b2myQJCoB2WVuJhYJDUZk/5eNytCgPb75x4ChXZDZQFoa2/v9LNdUK7lalE57LjK2/FkbiKju9RI/ymRZWGAMSGp+KAP2SqLCVF9yirtJSVlIbBxK6ks/6igC3ZJZAXW12TTaA2g+H+97hoVXDFE1qCZxHdPGdg+mLYooov1I6c3BGd/qf1aotitBirWoNQ7Ozl28U/BSL5ETImdpZ6j96pb45krCCDwjWgT99Mtd7o4j6fbk0bLqEgLCL2CmV1vPp+/RFyWayWCOZ3MZwzMOXCur3lD56EgJGLUGS/9DBILoz/z4N86ROOTW+IpUo+Ak7r/J5REqEidivgFdLGvsAB5otr+24yYNrDKyh2mxz/y1CdMS/V9rS6Q2xYu8/0q72ipJL7bDMRFn3a0jM7jO6VLbbygFhVxsJQ6LZJs/4zEHMsyyYkpC8ptt78QU8cLljQZnyyNHJ1N2BmCdFdgnoASwMx2trpYUY2YyUD/TD9MfDDPYkIuUofK3K7nTPX15F0qXau2eHAw2Ojt/2PBHiX2pepdtbPTm9l6tRb9iU4fRHzmHz/Fr0OvDtixuKzWtrI1wswfTfsrfGkgjOELBrW5QuOc2C7nEMf+6W47LwsPmvAJyXiHxlr4smxQQ5dKpotFDATvZaZNZwPrb/Hui621hrP2Pit8teVakTOwnV2u8TEa+mrnut8VnNMsQnfrdXYfXKftacxDfq4F918/gDHFQPUX7B4VHNWTdoXEAugc6QIdIIaYmJ9X39Ecj2VcMLtqRdpo1J3ywr2tPla6k1EWUYIGKCZmMDsHtWNFdYuaAUefCUJ4ozdcQnb45n3nNlhWACuhTwWunfdOUYRzAuVLhjNExUEieXZnauxu6LO0ml9yFnEBCnrDw94XS13hH5fkhx6VQIDVTzgInPcCPUZXG6M30aBQKgD9MOp72txJ+vEJBhMrFcgIIqEAsGDq0kP6a0fVgSTN5sx/EWSdZFTg3kC/l/dxHuMgAgHCAQuqY1GwDfs9/yJCBjPydgmFBvRgqpQJBho5oju/w0hIktxcYcEtM/zvaJFIJWK2ZfOumV2tdslUFYNaPFjY0ArCeWcdhYIUwKWOM24M07q6vMH2ufM7svPy8ezUdMa5L6CH6uwWzQVyomuS/bbVpaZ5PIKsiO82WnI65fK6W8f6vJSm6ebk7MK47zWy2e4hjx5fria6waU4WWDRKJ75TDyd1KYeNxZ5O1rYhSEHaPoFxdvlZKN63zs18ydsvOgSShi4NWOJ1kPH9W0fbPxFzFET2Hwcn0mlBsc2Ldcze93diE+wDadudfSItqkaRj1FRlgPolc5oKLpHmoPsEHduTpV7NUpmJsdaihGT2x1Uc7vPz0oCwS4QLzAbGxjU3VIBwIzuews2s5xsrN5Qv05H1RXUxjXr2TEVRQDlN4uDOQVNIqiaNjLMfajkgtgkl4ZCKJsLNCvkmEGTZihspnqWBhZH9d4UJaNxCbgqb/aDPH4zp3hxWXbR6ZLYhQvHnK92kVbURQUm6vTl6Q3a6+H+PSK3bKQXEwv+PohS/r0vh5+SNud6lEEgHE0jp/LWYDgWlB8GuJogdhORSARIraPa+RlsbPzobwE+CiKPrKeKAhWsSbiMJXlk+45cCPlirfr8UZBEnnVnCW0N3dFr/+EC5TwXvYhQ4MuwUUdSFvLI1dXHIDU13WVlaV3ElttjtR8WJoMd3N3cco3z91uA+LtVQ/jVRV8IKKKZAPVtbMipAIv5VWpkTCoioHD+5eKkPGMJlOEgqtVWqJUYlrbjrKUP7aiEnPOn0wMVQjAL7xMxpcatKCAqYYOxVYJOpC/IjQ478zPJaf54jq2y7PuP96+s0wi5VPB3qDIqMlg+D2LxsM4cct302ugnTcXdk2C+mp5rXnqKtVnPv0t94AjlosmOOISyGduzFTFu8USDuLMAdthA5l5FCGvqnzV8dhbaH5S986rvYjZKS5xqiwgBwWCEFdw/o+wFRqzYvPjnya6/4gKiZvYemJdq8bsnFg8LBrqYiS0EG80KE1y9reUrjx2QhuvkSrCtUZs/i66XI5zeL875DZkqP4kJhMbPNZmMqEzKwwmKwJ7qQP6BZld3j/ROAnl4ciTUFQHIp7ka1lbIjkSEPboFkDc2rPhwjPxwPaNsvjIrmH1+Y8fvgcwA4oARNRvGRSYmhoinrHbJWRCJLjchgaJZpSAN0AcxE3Uw2UMrlAioSKWOVryBlkW5cncTaOlL4XRDyFujzGd4D0eBwjSkwrVU3T689edqsxuBB1qxwdIwsXbZ9QhAa0gdbKAfz2xliF7ULq9sffj888i60s2GQWP6I2Q5VwzvDJkmYHiTQ0JIYr4kKTUIlRSCu24kMVdUsY1QiSH00onfj2riLcta552EIc6Xw3ObstIVJ6o0Iqqfy2Syn2MKIIVNMsW03GBytupPjsS09ymUdeTQ2c5ZtoAwYGXNQPCD0I2cSsaeJTjD5gyHADHvgK91BUyGehQfCaZhHGaZlCASjXrkM0Kv7iwcD88/zhtqROl52OLhioIODFMGV/rM1RRz7DMMN/iopXlhCrqbdmGOgk9Qk22x52KTdHogSF0GPmFBdlkH9AuWouUol1DvnM148xFdcE/FOWmJnZggxkuEJRSCOeAcgQD11cUESCB0kBGEu7notTQm58RTsCQ+TBrfi2WMafB6iVMHpYGWpav3T+rkC+u12StGcTjF4Kzj3k1bRaoG2GSMBFisblkIFVOhrDwYzpvYeENGY/JxaIC1zJY78G2SaFVURA9tJOABpal9cPMB42cqV+53oVuF/es24rr7szCuMwwcvimhec91aRlXH1NIa30kFpfS4MNtiCTBpaoRtZIA1qkTl6XiHMXYRO6P9CJZw5DYLuvadQQCj0lX6n+zB7qhJjmcplzcH3SZvZYd40zFSv0VfaC0FiU5ms9SoyKYvRPGy1oqFDGoAEmqXMNXn3DhsriVRs4MVQjEzZkFu8rTNgsT5UtRmERe8ZcLix2shZCkWby/XHV8CrrZ6Di4XrP+3i8xjoNDa0dl8LEJ44WsZfJJcmPpcUDDxjttrNBn5lEzZnpwYL4bqM/lI7r6Rt2lmsuUMukd+XYiGBCKwEMLAslzr6zkgo0hCUwbynWLtbCpKg9acDsE/s5VgxDlJ3Ljf4FyZjaeDxAoc5op3lQ9zYfmlvJiC9ddDIfoOELKgENLehUa28yApyZvgxfrGoubecvZos+FtpAmFDyisMlqLyzODnknRahYX0VzUn+9MRjR8qX9PK9d5Wqt8AESvMh2WwjPWKHKdv2X+S2SugoMtDtZCjg2csXm5hEXKXj97aunBKTxu5SogKDgcLE9F3cY0L7eIdQT2x8YQIms80q6oELjx5Reyp8iKkRTWipmz1D65p8t3nl8s2LQ+4lntRZEBfMv/qGfFmAxJtUlxmQOesC3QNiPOwT5Ro5+wYjYyMkJSOsRqrS8ozLgeWNxDi6tRT66xNLRnkwgiQU9V2ZyEAQlJuMgt7TRwpB6Fy930/pZaoZ4cCwICKq5XZAIog5kfpmKLATpvb7WHw3Xy/wK9E1WziTRrot8Pzxx3oL+DK7jni8TSKcYj3CevrsfhINuCH37bidjrgHgrBmR7c9m+vYdu7572Vlkydh2d6Q/bnTR1AUpgsFTGGS0MJTuXGGMBw/A5JULS87dWe4txQmL04glQn6xas0svhSpSi2y3QEm7F0cOemQAWfOEZmWCG5VLBe5Nr955j58Otl2X/H189Cog3QqafrXaxc4czorkhW/JK4g0QXypcZLnK4QaXxXb1anNu/7qOIAjBamO93qBivCDCwfzTrbiDO5O5eqW2IviwHLcUzBb4RyPSuY8mdlTv27YnoW9jq/CNQUC+wQOpTLnrQoG86VVivdpEe6V4Ztvn45vXr7KymSE2vb6ivP6ZY/kMwa8VSFtxI+x4bm3uJ3sHoiIci4QQ0js/pKDw36Ze7UbUv98XYwVSgU+q6OXipX1/c0zFIus4eHvCpS8KmJNNhsO2StjDWCuU8dwgdmYEzN46TMUTUjWLf5nOHXXkhm/QR97BdqFF9LlXnV3rpo26bmSeB2Vh1TY/P7lmb6Z+pXLH7UVe3UE11aDXoT2tfz6wF2RdoF5C7NrfhBKMHDAp41mJ9e9zeNifKLc2k0/eQsashVl1ZYYEkkp90NQW23+4jEONowgR9fwCw3P2f9voIRSl3f64AS4ViIMzblkh3hMDZGlangtkDTxGHSP/4no5cj//NZ+msWr2F/tiD7LckT90uxh870jFWEwGuhQ5ed79UT4lz07Wssnt5oOBBcg4VDLK8XzDOs6qoisYvBc+qd79Ev/HOXL2uHP8TiiVMLeuo2E7656aUnSkMumukh3TY04RYplakQya0K002WTS9twdYofLKx0dVEaBAovsaUDdEhFdVkix9icwUipL7VpXrNQMKrqsjLpiAVpRrgSLNnoYo7tkREbbjjbliC6Bgl4qr9kIml1/dHuiZ6ttcr189tY+4oTeVk79a4JSltbOcyd2ZZxBe+DzbWDeOsalGvZ5tzPcBqckdVG24bTkdzV10t7N5RHebuU0S+ccsl1KhQaNie8lubUGOb2tsbvcWwdsDUbmhMbfTULM3UFpwlufYeSUF6rHqKihAN51jG/LnxtXNxbJmb1ztnuOuFw8QHwK9vpw36bKciQ0yiKRazdikWS/DpG5Q4dKH6G54p/yqEg/KPobq7ObWwlg+nXnSlZWGQBKTP4NJoUKj/LXm/PQ+8w/wHGpJCt2iRxctjYCnUunJ+2SSSEWdxkOIl2SnKgon0TSRX30axhcDdJI/Z08vQp4e7QHaxqvYUPrAwYOqwzDXqsLMCJVcB+QQY5Am5lM8/NWR7mZevJFgmleURZA72AzJpIapdS2sjCFPHXWKW4kxFBm+7DGxJFKaZyuGaRAWT75yOy3SKcPyY+ZrbQG09ow0kZAW8ToxGcM+9xlqgZMOlbZnTnI8x9Tlm5aE1XZyuxcwPSksl2OGIzOt5EdBjAV0Zw1s+Lo8dkf1CEOB2/uDxffZxmMH+1o/HXszMK+p4b3gZYfy5Rnv22CDWkoWIa5n4Jlj73X+v+P/r/NmHDbVq/XJu+S+6m9+NkAvupQ+/0B5kkqh8vb1qX3KgQGfomvquGnKrgHyxF1KgdJela2o76of6JV21XfJs+xV9qnFAb9V0aWoSrLKlV2Qf/d+0xadElAAmcGgeciAApQncFDH3HYCqCkIBSFxMQIXYNyV879DJp60degUCAUhyxkh2SSEgqig657nF6rRcAzHpKek8idSFEcdfcuvH/vWE6++nYDhmIyt1ZySozgqHhnMu/oa6QZ//lGn5QCcjCNLncWslXuiVet/E+deDhj6CvL5KboevwGCZn+TQZkSM8v4gyE9HuBgMYUMjwfrEPG/CfIwyfuf+ecEh86JvfLJm0eCDmDE0uR0egeCI0rDUemn47G3SmbFYTgmzzMq2gjRz29V380zkSKW8peHX9YgOBIKs/lSEUKl9jjc8gMBZ6Tzx8+wv49eo2HgG4X612hCPPoJi0/AoAggK8I0ykdCBEdU0UelvdIjRiXAgbBHqcxEJYNXZxXNLEwLbynPH23JYKY1eL2Tyori2ofnZsTqzD36UcnrqqtYVfBQ55AwZoBZVR1Gg8JNQCQCPEChAI6NCiybd7tlF/nL+bxlfH4zzw6qVUzuPn2C1UaArm15AVIawAKX95mD1e/Dw2QfDgl+FGy5LfZFp/jugV3Ana458MxEilzAXxz2jwah9gpniRXBm361pPoBFY70qxT+AEJF/W4i9NZzg8RGFink2GRKFTT0Uy6+wwUYaasYyVP+Cj53OZ/fwuWPho8NuXwaWQfII8r7UEag60AwSaFKIhIT+e81lhCPfcKsNuwUa068dzonVGv/YGXfWaqoURwYKI742WyOK6ZE33xBZb3LLKHWrcvPm1ec6mqpLmq35dj6MHqn6El4M+gAwuSRWfnNExaMG5i2tK2gwJLTFmY/ci+MwMA8YDC0EKNhHqs3QpFgJRESK2Lq6emHxDVeoYIdMujYbcln1yGVbk/TAhwIHuuUHkSgGKtSj0h7pUdTVP+azQMrdY9Wpk3ZLl3q5x/i3/cPxTviloSXlfrHSqSeJu1XaSYeLVGukuiSXvn3rzp1ylH1xjWSpGQvt56XscNrJ4N1iM6l1ybrkHUgPSzD6QzPIB0LvKS1uiaJFl5VrShkDAkbGgZVf2LCW+nd/Ody6fbo4uikWob792BWQD3hY6X6Md+Ul8p0VHou93nFMsskKY5vGRGX4qsxu31KdjKX75p2pElvLc0aVFosvTtGB3BE5kPUigYi23dJtLOKLmf6pV2PUHsixg51E+9fQkG92dLthho1OalWXWqkR690WaW+LPh18qbtUt2iGYMMjK8YqWHz5wRiTPSDZ4rUJ1cjyy1ynVhd6G3tkpsYTKgN3WhWJiqbibEdB4AAh6PQarGVf13cL0upTBwmZEZPY9Ywp59GWy8p75DDLd8YdEYqb/CHaLaYUrL/+k/23ZoSq9a1rLrOytzKrGZuEnE4s7cKuKFbGANZY78jsBhjz0OSOoAD6Z01UmdVv9FlqhU8hpbDSbz9hCYLTS8pkd4dI+y1Ki+lqYjENXLcmG1ghah7Kun/64fwq8Wu6WznS9mynj2LTmyKCU57eJJFmzZH0qgXiSHC8SuIeyHkzLWwgjqnyYjwhMXUVWq3QF/iF7Qb05Spi1aMIaaTC75L56hxOGfweRc7U1g+FruWI7jKkb1QaZOhk7Jzoi0vQwu8OWkXwDpgxnJUdPplkmozQOjzEMFj5kYrOto6uNsIY92lrg1H1UOlQPcXsg5BmRrjduz7rHptza675tdm/hYedzNPMJPLa/9CVV91DOEGmaDUZectNPUIVwcJdq4pHiLjnzJa3IyP85iDUhRNmwHPCNRUT34xmfwMVFgBDniXpOK/uQiOGCcfcUz9BpdUigVzmV3HD0b29RqkGISwUZ4ykGA5sawKGvsRifbPX49/yfpLl/aGQvTSJDkcvyr7MRLnvOSo8PwKO2YJOiKV15PU+RjMUo3ZDjrC38znbuLzZnD5MwnixguiYH90/csFz8NzDAiOcDvEIibvWp25/kMqMolx3aI3j2Yn2DkMQT0lZP/QqdeIS6lz34T7SjXcLRL+U7XBNpSOHGvw8FRsnPqBT0IPegNVM6qrLTte3ved2ZwyFvkdNQqf6oKngz8stR7gkaPT5//44Wn80pHaWo2XXmf6/KMyMujcaDe+obEbVjFWa2nFHW+ctEsPi1gBJoteWPSAoTHk++sLfGWUY1RHmRz+cjIrkwulhYTnknqdD6dCw6jJI525JeaRvpz40TXZY3VxqSPDc0qM9bGBqOb+JROcEQnVHve4PuWe+U25uYMa5owNqsf4+/RzGjfap0CgVNl63gfKrC5abruK36e4+1QJDIWnQzDZkiLVULd8R+OepvNiWfJ5l0EdSljmTFGu3BPNXv+bqfJy0NBX6IxmX8Fe3Pcq2aXb19rNQEmo3NOYzYoJIxBY4xKw1+tm4Ke5bYxmscXIPclzXNx95BLhqWOYA4cpJGGpjWTp1tXw769XQPrRnyP8SQ6zz+5wZpRZvKLkb0dnkESei64Dcx8s7tCJVV+NdoPXa/NrPLYJlkiXv1hhC/20sq0YQ8eBBWy5k+HRqu5OIE2nEheTehn5rwHHW/9jhXiYi8iLER/KQGEfaTFjUQWo5fMcMcwcfhXTIF9LDxuWBqS88q86WR6X5gxhPBj4gCVTipI/bBCWN05bOZMulbhsccLMoTNCo9NR4/C1aLxtOdlRxkUOD9o887EzKJaP9N///NlBFb0uG6Algjp0AZh+7oLMGuVzab5eu5aHcYbc+DPAD+Dy8ESdojDJJ93+QQlwIPJCItV8EcCB85VJalGXp2eNcRTylP8+hqkt4Ugrc8wH/m1ZklbBDXxN00L7IxGxCGEBkRjAmnh/EiMNpgJJVpSKieEYxbWQXIA0BvIQnTI5C1BRmcbAxAEVEDK8Xq9Kv1nyq/TXQQYER8Q+WK/1wRKAA93Me9Je8aFI6GwZLjUlRwcxRcmoInVfCm9YGns6yPScL23vyAfMJK4P+75TS3b0rKI9VBioW4SxRRKdkgsYU0SQ8uLCyctNIqvVFfc6T5vH9fgsqRDhxuPWT3GK02KGDHElp45wxQ1K8a7XFbtVfnzhYU9p2i6VtNQ0lRVXDK2EYr7gSGd6rakRRlDiCDUkNPXSL/wImvVD2QknHiidZyo+xx7t4OfapznPfnErUuiNat4c3nQeZxqPW82xtl0CJRirdyF9WBWzCmqMqncxChRDq8NCcoe9nY6EnGkN6hR6hejLdeXSXDvRYbg6ymLlVPN4lKSV1+zbhJWbOB703brkdjPET7NcDJo/jK77tfCLNhhbPTQyJXVYRGxVIA13A9qRg+oKSwbWlOkqZWjvEeCz14QYqitqHEe4d1Nwbyu50qL9uMmq/D4lgTg3IIWjFL9Rt9kgTXHWcB2g6nBolPjGWQMJGbzoziOy+JzzyfPFkbDC/fT1oTk0VPTPXwLtcIXg8aN2uV3FEsis3B/bKUQazXL2ZhZybCvtHYYeBycEAJv9UXJ42DbOGxwLyZnPVlxk0gAO9OmxV04Xjk/4lYnccLDtPKlAjX+VolTPW8fUtzIoqczQT3fiNfWCHRwTXFZJlTuZSTsly0MRHKGetPNELGeVoYLvTD/Z2NfEVbtK5HUuxAh1ynDb0JUSg9qJvOk87jRvwLW2ci99n7gWs5WZtWX31dZqfPT+4s83XBXGbsghmXP/0tvA899AaRQ+zlbHc0PeRa92b/kGmXOxkwwnQ5INsxAcUVOJHf+kErNIf0jXOLwbCk6qVI/7BDclNb7qcSEIkQTbhYnVSqRqaseAtkt+ZmCEEHY2292s4NfTsvmbYpqNfN50VjLqkgKnEytE4lbCo+F1sL/1810mJ5dO+q+S0aSgpjJDpTzu97Y6eih1vJJmBN3WCd8/4np9nT0uVY0QC0chqdRbP5+EdyG6dfAuWFGijd3RhrnYLcnhLGLmWI3pTlMVQgEhbSASS4HWQxvSUNf3a9y9YKjU9xvsPbAEo8eFGAwQvT3Pt/BuzBjNn80sB6CPBjfCWiOXs41GtisV+FwDVM0xbV01599D6D5G1aP3oYVPZ/I2WFL9KBUJRKiU/kiYCvxuzFn066yuQgp8MjBZu6+X+oqV7ad8jAYBQz+BL9kV6pOAEOh452qwDqWMKCu7VxiwDolKUqrCMdGlnhXe/clnubxuhxa9GTwB3TiKIMRPvBbn8udwnY6NUTHZZaFy+A2tvOqCgt3cxqxhtjrH8vcxqiBrPF5nd89xjiRncSrHgGny58nSpYZXIt6bCzxdjYT7+x+rFGrZJ6FcKTqZPMkeLW88LlfM2PGZsKIPB/purNZDmLe6QUvFxyOdQJBblZ+V3ZySOK0syVCfml9pic6uzJLmsBYASj3VP0BbxooYvD63fGFFcuSoAQVTLO0qCxY5wt1qCzaJcKVpBptEikqXh78MUdRApSkuXVLpoiYR0qsimvuEuSpKlrWWOxcPKE4z5im8XhroQIxdnDbE8fu/X4BqKGh0BApCh8cPy1k2M2OVBtmE8qBV1MJpzrIS+yhfmmtUTf5Mc054GfNhGxfHx4IF7LWi+IDYltqc5J9U6tGOSuszPDzZEhhptR+5F05gYN7INPf42Q+rcDfQ44/ePWGOHLW7xzJjLrPJTngAyF4bhrva189SJSM5vWpuQqWPk9cycl5JvAHgwBWEGvOLAzGuhKJqRww+f92j8AztJWHIpOxXjSg8xuEepTwLa+lw3R+k0VKMVy7CeGpM4k2hfRp53QOX92eSJLVNOcLYTGzyrvUJskm6H2g8JxSbDKCITKck+8QQ7d/AEDYJ069IHu2xSRPt/TZDg0po7LVYW5u6Q43ICczVlJ2Nas6b5/c4MqQw757GvGof1PiiWkdcWq7TNyzhaF2L9NjEB0J9XSkQtsIkRWq70lRjMhEL1qpYvoVfmITNauGecjeipIsySslcCDBPqy5NtZDfmKSLfvo2Qb/mu5ei8+l0adEuXZEvNitUr35VaBB1bRBqJ8ryItOiS5zCZ3VQU1HCn7PJchM/cvVxZgMik//GIjf970hxjIlhQC+o/kK3vtTm1GV4IrLEOsmIWA4twGGP6t+2VBLhLgo6FYXBMLeENkJRo5AFZdZnSCds+ZNVeJXDBnnoHfcI6YCTFiYuZC5g+d6jHA5SM8UL5kKWL3+Of6QTTjxgM0Gm3tyO4caA1VgQE2PMTQrLEqrVZxbQg7XdNncgpyBanjNWZfbaLk0PjgyoD97oo/rKIk954UhVNLkcALeZYXUvixz53J4mn5LAAGCUFwkwVMDzYy6H/0dNRtSAGk2oBiHGEOvfSkriwk4ZiBWWGGxx0k4J4jMMCl5dCNtHTVVKRQdFQf9ZvlwueuNtfUsiskM4+iqAyL+hYhFqREViVPw/giOawUZE1cuk/6LoI5/qgWEYrULHGMdoAA7Yf4vF8Mdb7/HKhmJV0NCQtqzQZY86HnPyY8BDAjhrnRmbGligQTX+vspg4TuSu8exV6F7BtRjjAdVD1gk/3V7qmN6vBwGVShZ7DhkHFxWwYKH9LdiRI2JgARTrsmChHAHCQDt4lsSSIlUI9HnPCI4T014NxAqmhae6XSGZaahVESXrNW7PlHSx/aqAo8eOuYYn7jYG72YkcrgaMsLslW9MGkVM+IZ/dk4qnMr+po5bae57B8LSCFzfjEiCXI90CCkW2AghE0K/0+jUiQOd3MTQbUlFwfCpueNWr99BxCLwDFAoYKjOwj0l142u/0BcpRtPobG8Yz2sK6MySsWcuwroIHILJpnTGYNtG3SMKhuJTVUZpebRFXI7ERmuaMe7bNsS5AjYFTq90o4IwrOlXFdwSm7982VIjjC/luird/ckbZkovmQxZzQMU26S1xoV3DMo/io2uUISu84+xkwR63GhUPVD7kF47ICqBLWqNkWHbsU9NNY16ZQPxnbFTV1974J0t431lVs7uizZGLsIQ+9ACme5IpMi/7qtyEG7nkET8l/Z5O73jpSFWPddoScZnj2GQRp61IZgrlIFv2II00+NYHBTS3S0EeD4igLllCFN5xW5hc36r6KqsdJgf7pBPMLRvayjOrE7FrzYYJ+EQWqy/lml7TMmDPIZnWpiadUkPkgyN5YriO7xDE6jnGsrhrXdMfpOQcRsl19ksYYVzbkKRMNDTHNeS5b+KyEk8bBHw3EIpg37EKWIlfly2INXxlz1ocr/dmJ/2DBKIZFWUpwuBVjuD7d/w3wSG8ZyzWII99H2801km0n9wS4Ct7zNdFLraqAvi1memG0Pao35lTau6HYlpfmvjgCqHCqPMbqMBXUOAvYC35TSP/YVAh5mdxaDq/r/VS6TFQ/wjZbxhwCB4XFFImYqltppYeeamCi4r12WGowQcnyiiZmAjua/djzFqMYdh1wrlYDy5/wQuTNMlllOSDjyt0MjrakICK6y6oM6hvTvu7MruMxST5xoTfKCumbF7yXeFxxtK2/K1yb9lcaXxNfFGMtD0+IKevv6HFEpmcl6vr7wo2O8NSUBE211501yC4niUVz9a7QSeKEVF8Z0yNxgOhzHkm4p5K16XEpEi1l1Q469zSDm8GUz3uMhExXFDMSfvZZkHy3lnRp1UC0ayxu+YScIp0XmW+yRJYMg66JgjprnYF/5MDeBP0tDoNmAs+S3VkPYVAmvGQMc/Js5oYa5a+zU8y80s1PUItppeWhTgZ3BYcezmQo5AxSNDTNPokaSn5v18VhS7BGDE/QB3IrHB7Nfo2bwUADc2SnaYC8JjQBQveZ+xo2neYAPlXngWHXKO8RzNEagbxkAQ/N7BRhKOieqhffYCdLucx9tQ9KFrSOLlv95pZS/v4fu+DTfGYECueBdXC355VY8iVEsr6ldOydn5X6yW+VnMioNiKLywM44P7/XsQ9kzBK9EIi6zaoPAxeYjaSG1WAAdikRkYjKVpIPV8CwraXVDU3NLE88J5LdHNqQjegZDGUtzVtgaNEm9/sZAWEtSm66Z4qID7yLjVJARG37deKzvObPPyfuR/eDiy7Ibh/Rv6C31zEA3TQXTsAoYESw1S1cPLPzlpn5p2kspYUzMDXp2LfgzgyKQc6RC2Iyoc/i04WZOhqcuY+iaTiCCEhCm5TQ+WSmixk0LOtkaHheUGiZOFQNauXCFfF4pQaexNRIvAUGlXciSGsyrgytkT7I7vQ6pZVpsYkokXKKT2RZB3EmoSiJZz5V7c+SlZLBdnGhIiqCvdDnPYamD8scRY7f+JCIoeVbOeFyTgQ5va4l2lPMkMEjjT7qEgGgo5CX7mnGdUBw+TUZYWubTPZyt9Z5GqC7bdWBiCZjUe1lxghekWxGQymQgdJYNbIr41CeAq0f7JXP/Dolrm+MiT6nAdPJEh8fFMHv9QdyLhJuNymgNZLfjyAp1pj66Ghvq8wDVH1LrmfOezJDkYPI0uONzVu70jOd0RXb+LyYpLJvBrfauCm9f3p79Y/JDdI/DxrvMn/CGogA2w8jMbDTvRHKfZsUpqMRx4/Vxds+vKhg0VjSnOIXwlG6pfFSs8cVYVvQJR9xmnWvubaOfAUkLz0IRo47tHmJBd7ZJkxKp/BOt/I/2Xj4mFzIIsaafKMHzcJ/DOfAEmO/MVXXloZHxHCk/EtNGozV3nt6WxuPPQZOwHNs6S1sxEcoSv4SgUH4EDy14ZxsLae84xjYOrxO5T8XWxh9cJc0Vgtm/UXmG9J/+F2PXqOQMnkwUqk9K4JcORQQlQjDMQeeXedxBgV2pn79hZjpKzK72zUYIxeGMYtwD3dBMxuFXHXZNzTP+hTU4yqn3e432LkP+WysmnsmBiG4LCjVl6KdgT7tLOeEjOHqVS48x+bit6uaaxjfRlfXjkQHBF0KHknR5Q8DGEAHx1r8SqxAB29apLekDrfT8VCErdwphjuRpLqQ+4y2bl00r+VzGbFp1SmXMrj7Q6dRAvFlq/PGEC2tWH2BohXx5DXFZHkxCJG1D64A1HNgLth3xCZZmgyFmS/7BtJTsgiYgfnIRQAD0EDqH3oMCca3Hhp4Ucch1by66qOOBja/I9tS/x92xvOEfRKOeg/7ixmlUR5+Kq9H0wVhzvyB9OdoxW/bA7Yp1+ZcjoK9Ffzbx6uVaIr9n7o8vyC/EF05yDmoMMHyooFBS4oBnNg9G3GA/FPxcLbPVaWgcdh49yq4x6myPA07KAilMPc4kj1yhz66TLBfLK53mAuVT+b95Yh+MonR9xYL0229R9mabJ34UlQeXcHHB4+eOZDTlS5gLrLY4CKVeV9iwT+GyU9X1PBA9uwDN+EyjAVrIIlATxF7Di0ESLxmz+391LKp8wGqi1VacpCfLCfWFomFD2/xqfeFXKcTOb/ntNSbaJJHEwDCqp3o1Mfas1l1rLkieIuIu0UYHVpzHmHS8KiIia4qdFkf4xFanEUntMaWmT8ia8k9QZTqXrlWD7/uJhc9dMZPNk5b07nQ++s6zCAtM/3eHojekCNz4s0FjljXf0rXLHuV66QTKI/ZpjOEZkXjFYV+m1ORcdQZi3LniLeQaQ9AKyDDdOaMByt4+ZilTCUDfBdVy1hRJTzxbFKGMXa9tsTmzAc6n2sodvgssIGmqptTyHXj7fnWc0VWs7QZYoaRfPTHAI4I4jhhlrcv6P5F4XcAszA3778SGNxWIyzrDQixhNIjqemEwOozx40GB0pybHSyjt2+eFto+FdiGoGsguOrHkL7RH4s+PtJn9u0LB17PBBoVpsqy4+KynWNNJPsk0KEC8oVWePbOwfz+H/+JND3FNh1Bt1KX5XqZy3xp6kTldqf04NtYT51EK5ZmuKap5kjNN85yuUGSyWP/+s6IL+36gGVjLex7EvmhuSt6dHxLWuVBXa1kkC70rVwPg0c93VEkcLsh01Cu8MAe/hwlS2j8Wu4fLPcKXvvMwuxBDqs2Ex4EosoFvtU1wIdbo2jKNNjwRLrssADehPkUCdfVpZTKJzroC1kMEOvKni293j5ldLtxs0AAehC2QSBSQrLT97IveQ4NKYltrYgPk/kypY5LFqYtLqW7w8he/o498IAv8PG/9lVV8z3eCGqFjMv8smxuKir7xGcq35bSEj+Y1xsNwtx9WZhCL5VH7BUilKQzW7SdQR5mkZsYn5IEsonCsv8ZP1QJuCQT/s5wWciQZuTwKzhtVnjEI9O8Qmq5NO88W6jBZrjL0+q9+ARIs8Wn61six6UorrKF+wkzIKWvUzJOelhyQdvnSZZHmyrfJ9Rvr7iuXPrRbOseTCPU8Kk7dbUNvVLRXEuDhS5cp9Tu3z3jUMfypPDhEvgQRVy7Ddu7Fl6O7dkhRVMe1og4ZIrAYdgJ9Y6kkIy4g09o0384tswVSj053t5fnZCwBlEDGibUcuVZlRY41PFRfqAsnDxiVAg4rZ3UvB77M4u7rYmngJz78zgyY9XLznrKOsdc6kpKEtnlS4zpMeaewbp2dne4WHQcgy9ptZnBNLOdZnb6JlKwccflclY6g8SuKMUvWyYvQcsE/zeJdhi9UPWeSWt163t7zZ4e2v2P/qArmTIK+j6KIcyWkqjfTlNLLHv8wmj42KsvvUyoSKJuKVxYH6QjL9rQnSUfNHJsUOjc0K1E+OLTJm0HYOEJBI5UgnEPmKE+LyBo4c4nfUlroTbCf+zYRV+0MJDOxJ+i6MhkHE22SKUBmJ4Ky0VuL5JR15sUETmYAN0hE20h6cd1usv+CQ7riePy2xiBVeao1UeTlr9brJ0P/kq69r28M6bSZDk0Enub8Z3gWHToUXABqdRqceDo09Y7aMQqA9x4RcqtL9hhqy3HQ+txLpBuEZIjo9FVDlyWVn+MRCe0zmc4yHPQc8JEnguddJ7nJPJSfK4cmWWtjXZjwNIVShFPacM6cUimFfBNI9tZAd4EA32pTlUUHDjYAdrKxjDEO6gSPBzEepKBOnyg+8y2IkZDbZOxwPxjsWKh7YOKn9wQRpe8FS0+g7nxIHEUlYLptV6dpNdZBB8IzIJeaVCT6uwiNC82xqcSQ9dkSXw+cuYAlXpJYeWUwvr6MMQOYz9l3vuRa/f0DSTuW22n4NhPs8BEdoF3EiZR2TQftpcPP8eblR30wER9i5PF4ni9wHenpULmQrWU/ikNYTOTNQ2YVVeoADiQfWyur5CI6E3toudUq33Q5FcIRfKRP9L0kvjQra4opkkWzFRSbkudhNM/rX6rznHexlRxWQrWU9iUtaT+TOSL4DGvyg/coOx1A6+qRzrWj5Rm1IlQ1rNw7KSuGQXoS/2NoC7dpeApxwMk+v70wil2gJBv8mL5Gufl06Hq/Bqayi8NgwfREv6iCRR+y2ZNZoY88w+4OwCFIzS8bFDj4d1SezNtGkRnDEmfT2LoFHUMdvsoXfd1oxHpbpD9qsRmdSgSFS2EDkEkOIXCJtGJFHDCHxSFAZIjsjoVXiCI5QEhXvLDU4wAHDgdPqcQRHQmrN/6tPaSw83ydLjALggFXP5uWwERyRkMzfDve2Inl6ZJPTRJZ4O5xKnuSazJ/k9e+1FIWsSXQ4JKQD0Q4+2rQ38X+z9qXNbBFjD33SSZx5CZqCF5Iq+lfpS0HqIbndlU7ORqjIrnNQN4IjM3hJ87Syn0aLX0q3R6s9LPbVqketBxwAByF2RbRo43biLjkg6aXJ/4eB14YkueIHVUXeLi1KjbZ3OP6ertjt+Ntt77T/PUOxx9GVNlen1yp/7FmJUBFpaTwbo2L0gbS/MiCD7aRQWZPFogBcyhBQECqib/xJpWvXVULVVTFYTycWg3b2RD8zVzLujyyiUJrBAiDMbErNTR3sc7XkBPRjU8r6h7uSBmWF5oEOENIsDrT9U86w9p/hLuiva4xOiWmsyWuzQOsNSPcShH4HXrAeHL6NdG/Ia79jPVt/ZbwB/zbmJCb9+bP8uV+ggT3p5jT8jV/5rS+WVNqD0Q0D8iZY/fAyORllx9CnacKhonJpJhsl+nU/6qUDKoUuxMvXhjk3hr393p4mn+FRLEPhCMUjR6oiPlbnteoKYmL0ud6wdKFacW3yBhpFRELTAk+FLW0AFQyJkGh8RDsJA+q+y8//z0FSzbTlbk8LstemFORf8RC3hCVtMUqUqZd1ESkpwky0ExlCLWxckMnRJ2ZqJAq7LZCpi60K5mpjFA5bMEtnZUlrYmTKUqfRlZ0qzCi3Eby6cXce+yULNZnQKVhRA2tLP6ounafQOYI0nmUr5UJVJ41/jW5A1iFSt4VDp08HVHl4TKxyZMBDYaNiMcoGc1WR1OTG8T5skDDV3aevMUI4/eMzKnE4SmEPNdUazDZOqk5xsB3azINPGv7m2nP1nmTtgBiwDqmmJXeB79muLgK1f98/K+Qpw1+hd0ymztn2DgdlkaPTQfnd3plJl/DLpplKU8lm+bFiBbC3AwqnoFy0FeNik5NRDkyegyljN+wB8pgL31AxfyexEZnEeKcB6rnYQ/+XBZ86Ok++FGT0Pzw43PHZaXgHFL4L5aAfc6m6TPbHJ9kfWp4KmxWPhDud89vl2y524WWFKBXTussUUUFyuCbN48jka/HJnXazfLKCqP1Xl+qKVKd4dSbJi6OhUPhF9JAPfjLWifHHbnxjepPiC6UmyNU4MuN3QinzMvzR6WC82YmMrNrVRxbpC4fCe1E2OjYf8gtCK/5gpqV9BXA8qVxrT3aWTKsY8xPKQU8XFKRl2OQBr95BzpHPUBB3ZWUvslUnMp3lGZNiMxeq3wbRaYa4FxyuJtnlSYrN8MQ4snI3UpOX53M7ovMrnO6o+UjoBskCFArInPt9BqHNiCoVM9MrGQiOMFeY6ixBOqCi9L+6yfgjilq1N8M8XA6lSINZgaImyx3Dlk1QwZcwO5XpzWMKB+b+jzT1ZUJTr0koU+zxnDxDX0xeVZpTJLYU0a+2uJdCQv5mEVq1uDjJn6D8eYTiZ0sawdIutZ7KUUCHX9roO+I2nCaJ/EeW1CBd5fr1NSqTfIoo2dkWyfCdHo09sE6bBH8X8JyzexRLRAemwgPV0o7tBnkGFtanMVoMjLhux0JHbKGj0xG3U1Hslp/r//A1kYRfOtloD5Ry835PZG7Tgx+NKu41PmLGSbdcRBg/68FawlXCLDvfsphDkPWBTyf0pNvwOiR/8mOEJAwi0NYwX6SUlMfrDJcSIH6SGOcdtWGfExNnqZacpww4098Fcc74heMTVWr3s3ZQpD9aI07o4gM7BkesirTW/n/gVVGK/mLeyS8T+42KHM/TnF/sLGRNTi67t5lrPlH7oSVXnBs16lVhGIGAiXbLQ3uEwZRmkKXOuck8QyvDUBwV7ZKHnhKiONR2DfXlomPRXB8KtZ3eFWOw/odBh0seBkEonzknZUw/euz/JAA8uJcgfvyeAMTPP3H+7f/0sn7pBNkg1V7/T12V5XMXt6Yik99f75H+V+abTr6e/VO6ZcQe7XcOCt3zMvrkv3Ds9oPQZPtoM5TFhHZZ2zaFRq93GNxvZ7ZQ2mKhRgiO1eSkUmCn7vZe+sqhOCSj/uX3WarsIW6nrcddC+3G3/aRI8T7OWv2ZKfMwN0UihBGFfpUaeqzNS3lp71o0G0c0K0Qvl6YYE9vplfV+/WjHtHh6DVV323PIGVXdvsWnIIGCcVvzxE0BipAg9gmlBpAeNLf9k/cn7cDuC+IYRDjpvz2odRv7UCcA0FHd+KQylgfEXtMdeTfo6weyTCX1VWRsseolkcBUwSykFSxhKH/G4Ze/M8zyny/+zhwde9fu1lCI4ypiqu9XhjxztKGpVsWw4FvFZXfChrycTIYEiDexARrqoHXIGyy0zvfAhnlEo9PedPrOsdM0pkfOOvGby/LXLi9FAq+V9clbCo0+0jYP0i/NRw1iZB1fa2Jzdd7mlEg1bqo6aEhTrPKLjOsR+jGi7xVV6sFuUJdr+5Ud6mb1YPq0o/fcqDExvGMKhamTcxOM9x2NnqgxL2jYVCPGI+ysE++ve0sOwDwSoYg3zVFc2HxBVwELZcLjiTb//NRr4sRueASuC12aSL1dRnsrA1MOOX1a1tQe/k8tZ9P4cEgDxdJGZBrsnLXlMB8gSEXWdJlCbM4v5SrRMsgBbXLraIgUI3pGSpsSY8ISi/tPGW8s8kITdDNfzXWNg0MMYLX8ZfgzU6ajk8XfupTf4aRIbalReGs7MX5DmUmRqb+LlWco4ZqJBxM687qfC5SnK6BLLfjfHT2LBGK5BsOnrqVZMNL9THE+rzc9I1XDMV6NURe6QSuDTj1+EYiMC1MbcConQyN69+8teHZpVonA4el0h6o+h8J6wFmWlo7tHWkox3reCc62anO6uzOQSBRaAwWhycAIAQXYJFEplBpdAaTxeZweXyBMKKSWCKVyRVKlVqj1ekNRpMZAASBIdAoIdbgCCQKjcHi8AQiiUyh0ugMJovN4fL4AqFILGkzWCZXKFXqmJpand5gNJktVpvdUQwp+s/FNQ973T08IVAYHIFEoTFYHJ5AJJUg6KNQgX1EZzBZbA6XxxcIRWKJVCZXKFVqjVanNxhNZos1skW7g6OTs4urm7uHp5e3fQcOHTl24tSZcxcuXbl249adew8eo0X45NmLV2/effj05duPX3/+EUgUGoPF4QlEEplCpdEZTBabw+XxBbGFIrFECoYPQlE13TAt23G5PV4fIh84FBqDxeEJAf50gWmFYCKJTKHS6Awmi83h8vgCoUgskcrkCqVKrdHq9AajyWzJL8u/bnc4XbBYY9/l4h7LvDw/GqTe9e/vLW/W328xEgpa8KrAnMXC7ZqcoXJsYkfLvIyoDJYakWCHLzhUA40zJMNsZP/AGE/VUFpguy0g0nEO1czHrOWq3HqBJCdw44/R2lMV2KJ1XcU75+2lEcj01KhbY6PCyydXRbTreNNs7adJPRtNl6z/0uc7V3igoekImoEPVsO/bAWaVqQh7rVsi2ByXIVnkqGjJYqJNMyT2NIhUc4QFaq9O+I+Q0+l6hHVqWqJCc8RukzvnvXn9baac9pPRPegF/raj6TOD6oI3+GgXZaCq86wh76NT3QPFm/FP7n1TQom8q4w7o1feC/VtnGKYpVMHklGqPn3zZdJAJpOEhXzGFkounN6U4zgR6RFKOK53HG7wvbS6kcc4k9TDr7zy3+85WthrlC/5BX6JczU3pfwPt35EgrcsH00NMY1zD74rS241vJsPsI3VkK7Z9si/L73Ct/NpHe/T4dJUpXPxV+/vvnczww67cMx2v+9Qr3sqJ2zPq4JM8qIGZbgxcteuwdqedfLgA3cU97aLXtpLbXVmdrqjOaznXjrVBep0lGfbIzqrHY2U3aMycWrO0+KKXSuVs54/bkctNs3YM5awe2bsUg+MLbybu5rr/6unDriYaKNBd/K0jQcQMEB6Th5kGmJjqXFbYsaEoje1SjY7q/tRsT7afLQYVEviMBP8mCvguhVaq502ZRF2u1HFQhtr+zJBhvofH73GU3LplJi/agv6dpCQYNhggYF8tW9Mt6MQ3RvTyNs1awwGDISClp/u0WfBA+OVYbJhTNImDKvZH2fjF1SWQ8UliSDPOiQhglmAS7eN4MG2pXFLj6fhWjrboXH1U07zG3TVBu4vOgolO5RodzhXl5d3kJckQosX2kRKqednnvnrXM9D15iLniCJV4gQ2+wClzVy32NzRL4YsPvXfxR6ygchK3eSlkBAIIfWyEa3kBo1LSTVwH/2Sgk9Zl0zwmPyT7GIgFtAgNfrUxbahXgmu/f44s1K63cLsY2puKawh43x0D9Wb++hWmTweqwRVNBhZP3RHKMlo4rN2X2VXfDgl5uhi8gFmb4VFxSoQHp9HpDM0zRzBKZ6Q5DN1F954oX3zXffPl5O37NNdYL37mad78T39m4XvAmQSroXbvmjR23knx36M4zWltK9f1OpWbdpOxMsN41q6lPolLxHBgMcb8Zj0jKBAIpcbYfSrsPjPi1cCK+3Ju246Ur1NZtHVN7d++v1H/ffiszBwAAAA==", tc = "ploc-cellar-wine-typography";
if (typeof document < "u" && !document.getElementById(tc)) {
  const e = document.createElement("style");
  e.id = tc, e.textContent = `
    @font-face {
      font-family: "Cormorant Garamond";
      font-style: normal;
      font-weight: 500;
      font-display: swap;
      src: url("${Og}") format("woff2");
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    @font-face {
      font-family: "Cormorant Garamond";
      font-style: normal;
      font-weight: 500;
      font-display: swap;
      src: url("${Ng}") format("woff2");
      unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }

    :root {
      --ploc-wine-font-family: "Cormorant Garamond", Georgia, serif;
    }
  `, document.head.append(e);
}
const Fg = "data:font/woff2;base64,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", ec = "ploc-cellar-numeric-typography";
if (typeof document < "u" && !document.getElementById(ec)) {
  const e = document.createElement("style");
  e.id = ec, e.textContent = `
    @font-face {
      font-family: "DJB Get Digital";
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url("${Fg}") format("woff2");
    }

    :root {
      --ploc-numeric-font-family: "DJB Get Digital", monospace;
    }
  `, document.head.append(e);
}
const qr = (e) => (t, r) => {
  r !== void 0 ? r.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const zg = { attribute: !0, type: String, converter: Ha, reflect: !1, hasChanged: Gl }, Ug = (e = zg, t, r) => {
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
  return (t, r) => typeof r == "object" ? Ug(e, t, r) : ((i, n, a) => {
    const o = n.hasOwnProperty(a);
    return n.constructor.createProperty(a, i), o ? Object.getOwnPropertyDescriptor(n, a) : void 0;
  })(e, t, r);
}
function nt(e) {
  return Ge({ ...e, state: !0, attribute: !1 });
}
const Vg = "Ploc Cellar", Wg = "Cellar storage", Hg = "Refresh", Gg = "Loading…", Yg = "Never", Xg = "Bottles in cellar", qg = "Reconstructed stock", Zg = "Racks", Qg = "positions", Kg = "Empty positions", Jg = "Data may be stale: the latest synchronization failed.", jg = "Stock reconstruction is incomplete: only physical quantities are available.", $g = "Last successful synchronization", tm = "Search wines", em = "Search wines…", rm = "No matching wines.", im = "Select a Ploc Cellar configuration in the card editor.", nm = "Rack selection", am = "occupied", om = "free", sm = "Unknown wine", lm = "Empty position", um = "Row", cm = "Column", hm = "No row/column coordinates are available for this rack.", fm = "Positions without coordinates", dm = "Not mapped", vm = "No racks available.", pm = "position(s) reference a missing rack.", gm = "Wine inventory", mm = "All colors", ym = "All regions", _m = "All appellations", wm = "All vintages", bm = "Sort by", Sm = "Name", xm = "Quantity descending", Tm = "Vintage descending", Cm = "{count} wine(s)", Am = "{count} bottle(s)", Mm = "Clear filters", Dm = "btl.", km = "Unknown vintage", Pm = "Wine details", Lm = "Grapes", Im = "Cuvée", Em = "Volume", Rm = "Locations", Bm = "Ploc Cellar", Om = "Cellar overview and stock indicators.", Nm = "Wine inventory", Fm = "Search, filter and browse the wine inventory.", zm = "Cellar racks", Um = "Visualize rack positions and the wines stored in them.", Vm = "Ploc Cellar configuration", Wm = "Select the PLOUD connection used by this card.", Hm = "Card title", Gm = "Optional. Leave empty to use the default title.", Ym = "Cellar statistics", Xm = "Bottles in stock", qm = "wine references", Zm = "By color", Qm = "By region", Km = "By appellation", Jm = "By vintage", jm = "By bottle format", $m = "Other", ty = "Not specified", ey = "No data available for this category.", ry = "Unknown", iy = "Wine references in stock", ny = "Rack occupancy", ay = "Stock diagnostics", oy = "Unlocated bottles", sy = "Negative movement balance", ly = "Physical surplus", uy = "Breakdowns include known wine references only.", cy = "{count} occupied position(s) have an unknown wine reference. They are included in total stock but not in the breakdowns.", hy = "Show rack occupancy", fy = "Show diagnostics", dy = "Show statistics", vy = "Show chart legends", py = "View details", gy = "Wine references with stock that is not assigned to a physical rack position.", my = "Wine references where recorded outgoing movements exceed incoming movements.", yy = "Wine references with more bottles physically stored than the reconstructed movement stock.", _y = "Bottles concerned", wy = "In cellar", by = "Reconstructed stock", Sy = "Incoming", xy = "Outgoing", Ty = "Movement balance", Cy = "No wine-level details are available for this diagnostic.", Ay = "Vintage", My = "Producer", Dy = "Appellation", ky = "Classification", Py = "Wine color", Ly = "Region", Iy = "Country", Ey = "Region / country", Ry = "Grapes", By = "Cuvée", Oy = "Bottle format", Ny = "Volume", Fy = "Serving temperature", zy = "Rack selection display", Uy = "Buttons", Vy = "Dropdown list", Wy = "Stock", Hy = "Physically in cellar", Gy = "Reconstructed stock", Yy = "Effective stock", Xy = "PLOUD source stock", qy = "Stock movements and diagnostics", Zy = "Purchased", Qy = "Consumed", Ky = "Movement balance", Jy = "Calculated stock", jy = "Unlocated bottles", $y = "Negative movement bottles", t0 = "Physical surplus", e0 = "Wine characteristics", r0 = "Alcohol", i0 = "Notes", n0 = "Food pairings", a0 = "Aperitif", o0 = "Soup", s0 = "Starter", l0 = "Pork and charcuterie", u0 = "Seafood", c0 = "Fish", h0 = "White meat", f0 = "Game", d0 = "Poultry", v0 = "Red meat", p0 = "Dishes and vegetables", g0 = "Cheese", m0 = "Dessert", y0 = "No physical location is assigned to this wine.", _0 = "Rack positions are shown in a compact layout because their coordinates are too far apart.", w0 = {
  card_title: Vg,
  rack_title: Wg,
  refresh: Hg,
  loading: Gg,
  never: Yg,
  bottles_in_cellar: Xg,
  reconstructed_stock: qg,
  racks: Zg,
  positions: Qg,
  empty_positions: Kg,
  stale: Jg,
  reconstruction_incomplete: jg,
  last_sync: $g,
  search_wine: tm,
  search_placeholder: em,
  no_matching_wines: rm,
  select_config: im,
  rack_selection: nm,
  occupied: am,
  free: om,
  unknown_wine: sm,
  empty_position: lm,
  row: um,
  column: cm,
  no_coordinates: hm,
  positions_without_coordinates: fm,
  not_mapped: dm,
  no_racks: vm,
  missing_rack: pm,
  inventory_title: gm,
  filter_color: mm,
  filter_region: ym,
  filter_appellation: _m,
  filter_vintage: wm,
  sort_by: bm,
  sort_name: Sm,
  sort_bottles: xm,
  sort_vintage: Tm,
  inventory_results: Cm,
  inventory_bottle_total: Am,
  clear_filters: Mm,
  bottles_short: Dm,
  unknown_vintage: km,
  wine_details: Pm,
  grapes: Lm,
  cuvee: Im,
  bottle_volume: Em,
  locations: Rm,
  picker_overview_name: Bm,
  picker_overview_description: Om,
  picker_inventory_name: Nm,
  picker_inventory_description: Fm,
  picker_rack_name: zm,
  picker_rack_description: Um,
  editor_configuration: Vm,
  editor_configuration_helper: Wm,
  editor_title: Hm,
  editor_title_helper: Gm,
  statistics_title: Ym,
  statistics_bottles: Xm,
  statistics_references: qm,
  statistics_color: Zm,
  statistics_region: Qm,
  statistics_appellation: Km,
  statistics_vintage: Jm,
  statistics_format: jm,
  statistics_other: $m,
  statistics_unknown: ty,
  statistics_empty: ey,
  unknown_value: ry,
  stocked_references: iy,
  rack_occupancy: ny,
  inventory_diagnostics: ay,
  diagnostic_unlocated: oy,
  diagnostic_negative: sy,
  diagnostic_surplus: ly,
  statistics_distribution_scope: uy,
  statistics_unknown_wine_positions: cy,
  editor_show_occupancy: hy,
  editor_show_diagnostics: fy,
  editor_show_statistics: dy,
  editor_show_statistics_legends: vy,
  diagnostic_detail_open: py,
  diagnostic_detail_unlocated: gy,
  diagnostic_detail_negative: my,
  diagnostic_detail_surplus: yy,
  diagnostic_detail_quantity: _y,
  diagnostic_detail_in_cellar: wy,
  diagnostic_detail_stock: by,
  diagnostic_detail_purchased: Sy,
  diagnostic_detail_consumed: xy,
  diagnostic_detail_balance: Ty,
  diagnostic_detail_empty: Cy,
  tooltip_vintage: Ay,
  tooltip_domain: My,
  tooltip_appellation: Dy,
  tooltip_classification: ky,
  tooltip_color: Py,
  tooltip_region: Ly,
  tooltip_country: Iy,
  tooltip_region_country: Ey,
  tooltip_grapes: Ry,
  tooltip_cuvee: By,
  tooltip_format: Oy,
  tooltip_volume: Ny,
  tooltip_temperature: Fy,
  editor_rack_picker_mode: zy,
  editor_rack_picker_buttons: Uy,
  editor_rack_picker_dropdown: Vy,
  wine_detail_stock: Wy,
  wine_detail_physical: Hy,
  wine_detail_reconstructed: Gy,
  wine_detail_effective: Yy,
  wine_detail_source_stock: Xy,
  wine_detail_movements: qy,
  wine_detail_purchased: Zy,
  wine_detail_consumed: Qy,
  wine_detail_balance: Ky,
  wine_detail_calculated: Jy,
  wine_detail_unlocated: jy,
  wine_detail_negative: $y,
  wine_detail_surplus: t0,
  wine_detail_characteristics: e0,
  wine_detail_alcohol: r0,
  wine_detail_comment: i0,
  wine_detail_meals: n0,
  meal_aperitif: a0,
  meal_soup: o0,
  meal_entry: s0,
  meal_pork_butchery: l0,
  meal_seafood: u0,
  meal_fish: c0,
  meal_white_meat: h0,
  meal_game: f0,
  meal_poultry: d0,
  meal_red_meat: v0,
  meal_dish_vegetable: p0,
  meal_cheese: g0,
  meal_dessert: m0,
  wine_detail_no_locations: y0,
  rack_grid_compacted: _0
}, b0 = "Cave Ploc", S0 = "Rangement de la cave", x0 = "Actualiser", T0 = "Chargement…", C0 = "Jamais", A0 = "Bouteilles en cave", M0 = "Stock reconstitué", D0 = "Casiers", k0 = "places", P0 = "Places libres", L0 = "Données potentiellement obsolètes : la dernière synchronisation a échoué.", I0 = "Reconstitution du stock en cours : seules les quantités physiques sont disponibles.", E0 = "Dernière synchronisation réussie", R0 = "Rechercher un vin", B0 = "Rechercher un vin…", O0 = "Aucun vin correspondant.", N0 = "Sélectionnez une configuration Ploc Cellar dans l’éditeur de carte.", F0 = "Sélection du casier", z0 = "occupées", U0 = "libres", V0 = "Vin inconnu", W0 = "Emplacement libre", H0 = "Rangée", G0 = "Colonne", Y0 = "Aucune coordonnée de rangée/colonne disponible pour ce casier.", X0 = "Emplacements sans coordonnées", q0 = "Non renseigné", Z0 = "Aucun casier disponible.", Q0 = "emplacement(s) référencent un casier absent.", K0 = "Inventaire des vins", J0 = "Toutes les couleurs", j0 = "Toutes les régions", $0 = "Toutes les appellations", t_ = "Tous les millésimes", e_ = "Trier par", r_ = "Nom", i_ = "Quantité décroissante", n_ = "Millésime décroissant", a_ = "{count} référence(s)", o_ = "{count} bouteille(s)", s_ = "Effacer les filtres", l_ = "bt.", u_ = "Millésime inconnu", c_ = "Détails du vin", h_ = "Cépages", f_ = "Cuvée", d_ = "Volume", v_ = "Emplacements", p_ = "Cave Ploc", g_ = "Vue d’ensemble de la cave et indicateurs de stock.", m_ = "Inventaire des vins", y_ = "Rechercher, filtrer et parcourir l’inventaire des vins.", __ = "Casiers de la cave", w_ = "Visualiser les emplacements des casiers et les vins qui y sont rangés.", b_ = "Configuration Ploc Cellar", S_ = "Sélectionnez la connexion PLOUD utilisée par cette carte.", x_ = "Titre de la carte", T_ = "Facultatif. Laissez vide pour utiliser le titre par défaut.", C_ = "Statistiques de la cave", A_ = "Bouteilles en stock", M_ = "références de vin", D_ = "Par couleur", k_ = "Par région", P_ = "Par appellation", L_ = "Par millésime", I_ = "Par format de bouteille", E_ = "Autres", R_ = "Non renseigné", B_ = "Aucune donnée disponible pour cette catégorie.", O_ = "Inconnu", N_ = "Références de vins en stock", F_ = "Occupation des casiers", z_ = "Diagnostics du stock", U_ = "Bouteilles non localisées", V_ = "Solde de mouvements négatif", W_ = "Excédent physique", H_ = "Les répartitions ne portent que sur les références de vins connues.", G_ = "{count} emplacement(s) occupé(s) font référence à un vin inconnu. Ils sont inclus dans le stock total, mais pas dans les répartitions.", Y_ = "Afficher l’occupation des casiers", X_ = "Afficher les diagnostics", q_ = "Afficher les statistiques", Z_ = "Afficher les légendes des graphiques", Q_ = "Voir le détail", K_ = "Références de vins dont une partie du stock n’est affectée à aucun emplacement physique de casier.", J_ = "Références de vins pour lesquelles les sorties enregistrées dépassent les entrées.", j_ = "Références de vins ayant davantage de bouteilles physiquement rangées que le stock reconstitué à partir des mouvements.", $_ = "Bouteilles concernées", tw = "En cave", ew = "Stock reconstitué", rw = "Entrées", iw = "Sorties", nw = "Solde des mouvements", aw = "Aucun détail par référence de vin n’est disponible pour ce diagnostic.", ow = "Millésime", sw = "Domaine", lw = "Appellation", uw = "Classement", cw = "Couleur du vin", hw = "Région", fw = "Pays", dw = "Région / pays", vw = "Cépages", pw = "Cuvée", gw = "Format de bouteille", mw = "Volume", yw = "Température de service", _w = "Affichage du choix de la cave", ww = "Boutons", bw = "Liste déroulante", Sw = "Stock", xw = "En cave physiquement", Tw = "Stock reconstitué", Cw = "Stock effectif", Aw = "Stock source PLOUD", Mw = "Mouvements et diagnostics du stock", Dw = "Achats", kw = "Consommations", Pw = "Solde des mouvements", Lw = "Stock calculé", Iw = "Bouteilles non localisées", Ew = "Bouteilles au solde négatif", Rw = "Excédent physique", Bw = "Caractéristiques du vin", Ow = "Degré d’alcool", Nw = "Notes", Fw = "Accords mets et vins", zw = "Apéritif", Uw = "Soupe", Vw = "Entrée", Ww = "Charcuterie et porc", Hw = "Fruits de mer", Gw = "Poissons", Yw = "Viandes blanches", Xw = "Gibier", qw = "Volailles", Zw = "Viandes rouges", Qw = "Plats et légumes", Kw = "Fromages", Jw = "Desserts", jw = "Aucun emplacement physique n’est affecté à ce vin.", $w = "La disposition des emplacements est condensée car les coordonnées sont trop espacées.", t1 = {
  card_title: b0,
  rack_title: S0,
  refresh: x0,
  loading: T0,
  never: C0,
  bottles_in_cellar: A0,
  reconstructed_stock: M0,
  racks: D0,
  positions: k0,
  empty_positions: P0,
  stale: L0,
  reconstruction_incomplete: I0,
  last_sync: E0,
  search_wine: R0,
  search_placeholder: B0,
  no_matching_wines: O0,
  select_config: N0,
  rack_selection: F0,
  occupied: z0,
  free: U0,
  unknown_wine: V0,
  empty_position: W0,
  row: H0,
  column: G0,
  no_coordinates: Y0,
  positions_without_coordinates: X0,
  not_mapped: q0,
  no_racks: Z0,
  missing_rack: Q0,
  inventory_title: K0,
  filter_color: J0,
  filter_region: j0,
  filter_appellation: $0,
  filter_vintage: t_,
  sort_by: e_,
  sort_name: r_,
  sort_bottles: i_,
  sort_vintage: n_,
  inventory_results: a_,
  inventory_bottle_total: o_,
  clear_filters: s_,
  bottles_short: l_,
  unknown_vintage: u_,
  wine_details: c_,
  grapes: h_,
  cuvee: f_,
  bottle_volume: d_,
  locations: v_,
  picker_overview_name: p_,
  picker_overview_description: g_,
  picker_inventory_name: m_,
  picker_inventory_description: y_,
  picker_rack_name: __,
  picker_rack_description: w_,
  editor_configuration: b_,
  editor_configuration_helper: S_,
  editor_title: x_,
  editor_title_helper: T_,
  statistics_title: C_,
  statistics_bottles: A_,
  statistics_references: M_,
  statistics_color: D_,
  statistics_region: k_,
  statistics_appellation: P_,
  statistics_vintage: L_,
  statistics_format: I_,
  statistics_other: E_,
  statistics_unknown: R_,
  statistics_empty: B_,
  unknown_value: O_,
  stocked_references: N_,
  rack_occupancy: F_,
  inventory_diagnostics: z_,
  diagnostic_unlocated: U_,
  diagnostic_negative: V_,
  diagnostic_surplus: W_,
  statistics_distribution_scope: H_,
  statistics_unknown_wine_positions: G_,
  editor_show_occupancy: Y_,
  editor_show_diagnostics: X_,
  editor_show_statistics: q_,
  editor_show_statistics_legends: Z_,
  diagnostic_detail_open: Q_,
  diagnostic_detail_unlocated: K_,
  diagnostic_detail_negative: J_,
  diagnostic_detail_surplus: j_,
  diagnostic_detail_quantity: $_,
  diagnostic_detail_in_cellar: tw,
  diagnostic_detail_stock: ew,
  diagnostic_detail_purchased: rw,
  diagnostic_detail_consumed: iw,
  diagnostic_detail_balance: nw,
  diagnostic_detail_empty: aw,
  tooltip_vintage: ow,
  tooltip_domain: sw,
  tooltip_appellation: lw,
  tooltip_classification: uw,
  tooltip_color: cw,
  tooltip_region: hw,
  tooltip_country: fw,
  tooltip_region_country: dw,
  tooltip_grapes: vw,
  tooltip_cuvee: pw,
  tooltip_format: gw,
  tooltip_volume: mw,
  tooltip_temperature: yw,
  editor_rack_picker_mode: _w,
  editor_rack_picker_buttons: ww,
  editor_rack_picker_dropdown: bw,
  wine_detail_stock: Sw,
  wine_detail_physical: xw,
  wine_detail_reconstructed: Tw,
  wine_detail_effective: Cw,
  wine_detail_source_stock: Aw,
  wine_detail_movements: Mw,
  wine_detail_purchased: Dw,
  wine_detail_consumed: kw,
  wine_detail_balance: Pw,
  wine_detail_calculated: Lw,
  wine_detail_unlocated: Iw,
  wine_detail_negative: Ew,
  wine_detail_surplus: Rw,
  wine_detail_characteristics: Bw,
  wine_detail_alcohol: Ow,
  wine_detail_comment: Nw,
  wine_detail_meals: Fw,
  meal_aperitif: zw,
  meal_soup: Uw,
  meal_entry: Vw,
  meal_pork_butchery: Ww,
  meal_seafood: Hw,
  meal_fish: Gw,
  meal_white_meat: Yw,
  meal_game: Xw,
  meal_poultry: qw,
  meal_red_meat: Zw,
  meal_dish_vegetable: Qw,
  meal_cheese: Kw,
  meal_dessert: Jw,
  wine_detail_no_locations: jw,
  rack_grid_compacted: $w
};
function At(e, t) {
  return (e.toLocaleLowerCase().startsWith("fr") ? t1 : w0)[t];
}
function Ci(e) {
  const t = typeof navigator > "u" ? "en" : navigator.language;
  return At(t, e);
}
const Fo = /* @__PURE__ */ new WeakMap();
function Zl(e, t) {
  let r = Fo.get(e);
  r || (r = /* @__PURE__ */ new Map(), Fo.set(e, r));
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
    r?.get(t) === a && (r.delete(t), r.size === 0 && Fo.delete(e));
  }), r.set(t, a), a;
}
class e1 {
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
const r1 = [
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
function i1(e) {
  return e == null || !Number.isSafeInteger(e) || e < 0 ? [] : r1.filter(([t]) => Math.floor(e / t) % 2 === 1).map(([, t]) => t);
}
var n1 = Object.defineProperty, a1 = Object.getOwnPropertyDescriptor, _o = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? a1(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (i ? o(t, r, n) : o(n)) || n);
  return i && n && n1(t, r, n), n;
};
let Ai = class extends ke {
  constructor() {
    super(...arguments), this.imageUrl = null, this.imageLoader = new e1();
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
    return At(this.language, e);
  }
  formatNumber(e) {
    return new Intl.NumberFormat(this.language, { maximumFractionDigits: 2 }).format(e);
  }
  field(e, t) {
    return t == null || t === "" ? R : I`
      <div class="field">
        <dt>${this.t(e)}</dt>
        <dd>${t}</dd>
      </div>
    `;
  }
  stockItem(e, t) {
    return t == null ? R : I`
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
    return I`
      <div class="identity">
        <span class="color-swatch" style=${this.colorStyle} aria-hidden="true"></span>
        <div class="identity-text">
          ${t.length ? I`<div class="subtitle">${t.join(" · ")}</div>` : R}
          ${r.length ? I`<div class="tags">${r.map((i) => I`<span class="tag">${i}</span>`)}</div>` : R}
        </div>
      </div>
    `;
  }
  renderStock(e) {
    const t = e.purchased !== null || e.consumed !== null || e.movement_balance !== null || e.calculated_stock !== null || e.negative_movement_bottles !== null || e.physical_surplus_bottles !== null || e.unlocated_bottles !== null;
    return I`
      <section>
        <h3>${this.t("wine_detail_stock")}</h3>
        <div class="stock">
          ${this.stockItem("wine_detail_physical", e.bottles_in_cellar)}
          ${this.stockItem("wine_detail_reconstructed", e.bottles)}
          ${this.stockItem("wine_detail_effective", e.effective_stock)}
          ${this.stockItem("wine_detail_source_stock", e.ploud_bottles)}
        </div>
        ${t ? I`
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
        ` : R}
      </section>
    `;
  }
  renderMeals(e) {
    const t = i1(e.meals);
    return t.length ? I`
      <section>
        <h3>${this.t("wine_detail_meals")}</h3>
        <div class="tags">
          ${t.map((r) => I`<span class="tag">${this.t(r)}</span>`)}
        </div>
      </section>
    ` : R;
  }
  renderLocations(e) {
    return e.locations.length ? I`
      <div class="locations">
        ${e.locations.map((t) => I`
          <div class="location">
            <strong>${t.rack}</strong>
            ${t.row !== null && t.column !== null ? I`<span class="muted"> · ${this.t("row")} ${t.row + 1}, ${this.t("column")} ${t.column + 1}</span>` : R}
          </div>
        `)}
      </div>
    ` : I`<p class="muted">${this.t("wine_detail_no_locations")}</p>`;
  }
  onDialogClosed() {
    this.dispatchEvent(new CustomEvent("wine-detail-closed", {
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    const e = this.wine;
    if (!e) return R;
    const t = e.service_temperature_min !== null || e.service_temperature_max !== null ? `${e.service_temperature_min === null ? "—" : this.formatNumber(e.service_temperature_min)}–${e.service_temperature_max === null ? "—" : this.formatNumber(e.service_temperature_max)} °C` : null;
    return I`
      <ha-dialog .open=${!0} .accessibleLabel=${e.name} @closed=${() => this.onDialogClosed()}>
        <span slot="headerTitle" class="wine-dialog-title">${e.name}</span>
        <div class="content">
          ${this.imageUrl ? I`
            <div class="wine-image-container">
              <img class="wine-image" src=${this.imageUrl} alt=${e.name} />
            </div>
          ` : R}
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
          ${e.comment ? I`
            <section>
              <h3>${this.t("wine_detail_comment")}</h3>
              <div class="comment">${e.comment}</div>
            </section>
          ` : R}
        </div>
      </ha-dialog>
    `;
  }
};
Ai.styles = Vn`
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
_o([
  Ge({ attribute: !1 })
], Ai.prototype, "hass", 2);
_o([
  Ge({ attribute: !1 })
], Ai.prototype, "wine", 2);
_o([
  nt()
], Ai.prototype, "imageUrl", 2);
Ai = _o([
  qr("ploc-cellar-wine-detail")
], Ai);
const o1 = 400, s1 = 4;
function l1(e) {
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
  if (Number.isSafeInteger(a) && Number.isSafeInteger(o) && a > 0 && o > 0 && a <= o1 / o) {
    const c = new Set(e.map((d) => `${d.row}:${d.column}`)), h = [];
    for (let d = t; d <= r; d += 1)
      for (let f = i; f <= n; f += 1)
        c.has(`${d}:${f}`) || h.push({ row: d, column: f });
    return {
      compact: !1,
      rowCount: a,
      columnCount: o,
      positions: e.map((d) => ({
        id: d.id,
        row: d.row - t + 1,
        column: d.column - i + 1
      })),
      missingCoordinates: h.map((d) => ({
        row: d.row - t + 1,
        column: d.column - i + 1
      }))
    };
  }
  const l = Math.min(
    s1,
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
function u1(e, t, r, i, n, a, o = 12) {
  const s = Math.max(o, n - r - o), l = Math.max(o, a - i - o);
  return {
    left: Math.min(Math.max(o, e), s),
    top: Math.min(Math.max(o, t), l)
  };
}
var c1 = Object.defineProperty, h1 = Object.getOwnPropertyDescriptor, Ye = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? h1(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (i ? o(t, r, n) : o(n)) || n);
  return i && n && c1(t, r, n), n;
};
let ve = class extends ke {
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
      const n = await Zl(e, r);
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
    return r ? r.name : At(this.hass?.language ?? "en", "unknown_wine");
  }
  displayWineLabel(e, t) {
    return this.wineLabel(e, t);
  }
  wineColor(e) {
    const t = e?.color_rgb;
    return !t || t.length !== 3 || !t.every((r) => Number.isInteger(r) && r >= 0 && r <= 255) ? "var(--secondary-text-color)" : `rgb(${t[0]} ${t[1]} ${t[2]})`;
  }
  wineTooltipFields(e) {
    const t = this.hass?.language ?? "en", r = (a) => At(t, a), i = [];
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
    const r = u1(
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
    const e = (g) => At(this.hass?.language ?? "en", g), t = this.inventory, r = t?.racks.find((g) => g.id === this.selectedRackId), i = (t?.rack_items ?? []).filter((g) => g.rack_id === this.selectedRackId), n = new Map((t?.wines ?? []).map((g) => [g.id, g])), a = i.reduce((g, p) => g + +!!p.wine_id, 0), o = i.length - a, s = i.length ? a / i.length * 100 : 0, l = i.filter(
      (g) => Number.isSafeInteger(g.row) && Number.isSafeInteger(g.column)
    ), u = /* @__PURE__ */ new Map();
    for (const g of i) {
      if (!g.wine_id) continue;
      const p = n.get(g.wine_id)?.color?.trim();
      p && u.set(p, (u.get(p) ?? 0) + 1);
    }
    const c = [...u.entries()].sort(([g], [p]) => g.localeCompare(p, this.hass?.language)), h = l1(
      l.map((g) => ({
        id: g.id,
        row: g.row,
        column: g.column
      }))
    ), d = new Map(
      h.positions.map((g) => [g.id, g])
    ), f = i.filter(
      (g) => !Number.isSafeInteger(g.row) || !Number.isSafeInteger(g.column)
    ), v = (t?.rack_items ?? []).filter(
      (g) => !t?.racks.some((p) => p.id === g.rack_id)
    );
    return I`
      <ha-card>
        <header>
          <h2>${this.config?.title ?? e("rack_title")}</h2>
          <button ?disabled=${this.loading} @click=${() => this.refresh()}>${this.loading ? "…" : e("refresh")}</button>
        </header>
        ${this.error ? I`<div class="error">${this.error}</div>` : R}
        ${this.config?.config_entry_id ? R : I`<div class="muted">${e("select_config")}</div>`}
        ${t?.stale ? I`<div class="warning">${e("stale")}</div>` : R}
        ${t?.racks.length ? I`
          ${t.racks.length > 1 ? this.config?.rack_picker_mode === "dropdown" ? I`
                <div class="rack-picker">
                  <select class="rack-picker-select"
                    aria-label=${e("rack_selection")}
                    .value=${this.selectedRackId ?? ""}
                    @change=${this.selectRack}>
                    ${t.racks.map((g) => I`
                      <option value=${g.id}>${g.name}</option>
                    `)}
                  </select>
                </div>
              ` : I`
                <nav class="rack-picker" aria-label=${e("rack_selection")}>
                  ${t.racks.map((g) => I`
                    <button aria-pressed=${g.id === this.selectedRackId}
                      @click=${() => {
      this.selectedRackId = g.id;
    }}>${g.name}</button>
                  `)}
                </nav>
              ` : R}
          <div class="rack-summary">
            <div class="rack-name">${r?.name ?? ""}</div>
            ${c.length ? I`<div class="color-counts">${c.map(([g, p], m) => I`${m ? " · " : R}<span class="color-count">${g}: <span class="numeric-value">${p}</span></span>`)}</div>` : R}
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
              <span class="numeric-value">${a}</span>&nbsp;${e("occupied")}&nbsp;·&nbsp;<span class="numeric-value">${o}</span>&nbsp;${e("free")}
            </div>
          </div>
          ${l.length ? I`
            ${h.compact ? I`<div class="warning">${e("rack_grid_compacted")}</div>` : R}
            <div class="grid-wrap">
              <div class="rack-grid" style=${`grid-template-columns: repeat(${h.columnCount}, 98px); grid-template-rows: repeat(${h.rowCount}, 98px);`}>
                ${l.map((g) => {
      const p = d.get(g.id);
      if (!p) return R;
      const m = !!g.wine_id, y = g.wine_id ? n.get(g.wine_id) : void 0, _ = m ? this.wineLabel(g, n) : e("empty_position");
      return I`
                    <div class=${m ? "slot occupied" : "slot empty"}
                      style=${`grid-row: ${p.row}; grid-column: ${p.column};`}
                      aria-label=${_}
                      aria-describedby=${m && this.activeTooltip?.wine === y ? "ploc-cellar-wine-tooltip" : R}
                      role=${y ? "button" : m ? "img" : R}
                      aria-haspopup=${y ? "dialog" : R}
                      tabindex=${m ? "0" : R}
                      @click=${y ? () => {
        this.selectedWine = y;
      } : R}
                      @keydown=${y ? (w) => {
        (w.key === "Enter" || w.key === " ") && (w.preventDefault(), this.selectedWine = y);
      } : R}
                      @pointerenter=${m ? (w) => this.showWineTooltip(w, y) : R}
                      @pointermove=${m ? (w) => this.moveWineTooltip(w) : R}
                      @pointerleave=${m ? () => this.hideWineTooltip() : R}
                      @focus=${m ? (w) => this.showWineTooltip(w, y) : R}
                      @blur=${m ? () => this.hideWineTooltip() : R}>
                      ${m ? I`<span class="bottle-marker" style=${`--bottle-color: ${this.wineColor(y)};`} aria-hidden="true"></span>` : R}
                      ${m ? I`<strong>${this.displayWineLabel(g, n)}</strong>` : I`<span class="empty-shelf" aria-hidden="true"></span>`}
                      <small>r${g.row + 1};c${g.column + 1}</small>
                    </div>
                  `;
    })}
                ${h.missingCoordinates.map((g) => I`
                  <div class="slot missing"
                    style=${`grid-row: ${g.row}; grid-column: ${g.column};`}>
                    <strong>—</strong>
                    <small>${e("not_mapped")}</small>
                  </div>
                `)}
              </div>
            </div>
          ` : I`<div class="warning">${e("no_coordinates")}</div>`}
          ${f.length ? I`
            <div class="unplaced">
              <strong>${e("positions_without_coordinates")}</strong>
              ${f.map((g) => I`<div class="unplaced-item">${this.wineLabel(g, n) || e("empty_position")}</div>`)}
            </div>
          ` : R}
        ` : I`<p class="muted">${e("no_racks")}</p>`}
        ${v.length ? I`
          <div class="warning"><span class="numeric-value">${v.length}</span> ${e("missing_rack")}</div>
        ` : R}
        ${this.activeTooltip ? I`
          <div class="wine-tooltip"
            id="ploc-cellar-wine-tooltip"
            role="tooltip"
            style=${`left: 12px; top: 12px; --wine-tooltip-border-color: ${this.activeTooltip.color};`}>
            ${this.activeTooltip.wine ? I`
              <div class="wine-tooltip-name">${this.activeTooltip.wine.name}</div>
              <dl class="wine-tooltip-details">
                ${this.wineTooltipFields(this.activeTooltip.wine).map(([g, p]) => I`
                  <dt>${g}</dt><dd>${p}</dd>
                `)}
              </dl>
            ` : e("unknown_wine")}
          </div>
        ` : R}
        ${this.selectedWine ? I`
          <ploc-cellar-wine-detail
            .hass=${this.hass}
            .wine=${this.selectedWine}
            @wine-detail-closed=${() => {
      this.selectedWine = void 0;
    }}>
          </ploc-cellar-wine-detail>
        ` : R}
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
ve.styles = Vn`
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
Ye([
  Ge({ attribute: !1 })
], ve.prototype, "hass", 2);
Ye([
  nt()
], ve.prototype, "config", 2);
Ye([
  nt()
], ve.prototype, "inventory", 2);
Ye([
  nt()
], ve.prototype, "selectedRackId", 2);
Ye([
  nt()
], ve.prototype, "loading", 2);
Ye([
  nt()
], ve.prototype, "error", 2);
Ye([
  nt()
], ve.prototype, "activeTooltip", 2);
Ye([
  nt()
], ve.prototype, "selectedWine", 2);
ve = Ye([
  qr("ploc-cellar-rack-card")
], ve);
window.customCards ??= [];
window.customCards.push({
  type: "ploc-cellar-rack-card",
  name: Ci("picker_rack_name"),
  description: Ci("picker_rack_description")
});
var f1 = Object.defineProperty, d1 = Object.getOwnPropertyDescriptor, Jt = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? d1(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (i ? o(t, r, n) : o(n)) || n);
  return i && n && f1(t, r, n), n;
};
let Bt = class extends ke {
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
      const n = await Zl(e, r);
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
    return I`
      <select aria-label=${t} .value=${r}
        @change=${(n) => {
      const a = n.target.value;
      e === "color" ? this.color = a : e === "region" ? this.region = a : e === "appellation" ? this.appellation = a : this.vintage = a;
    }}>
        <option value="" ?selected=${!r}>${t}</option>
        ${i.map((n) => I`<option value=${n} ?selected=${n === r}>${n}</option>`)}
      </select>
    `;
  }
  detail(e, t) {
    return t == null || t === "" ? R : I`<div><span class="detail-label">${e}</span>${t}</div>`;
  }
  renderWine(e) {
    const t = (a) => At(this.hass?.language ?? "en", a), r = e.locations.map((a) => {
      const o = a.row !== null && a.column !== null ? ` · ${t("row")} ${a.row + 1}, ${t("column")} ${a.column + 1}` : "";
      return `${a.rack}${o}`;
    }), i = e.vintage === null ? t("unknown_vintage") : String(e.vintage), n = e.bottle_volume_l === null ? null : `${e.bottle_volume_l.toLocaleString(this.hass?.language ?? void 0)} L`;
    return I`
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
          ${e.color ? I`<span class="tag">${e.color}</span>` : R}
          <span class="tag">${i}</span>
          ${e.bottle_format ? I`<span class="tag">${e.bottle_format}</span>` : R}
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
    const e = (n) => At(this.hass?.language ?? "en", n), t = this.filteredWines, r = t.reduce((n, a) => n + a.bottles_in_cellar, 0), i = !!(this.search || this.color || this.region || this.appellation || this.vintage);
    return I`
      <ha-card>
        <header>
          <h2>${this.config?.title ?? e("inventory_title")}</h2>
          <div class="actions">
            <button ?disabled=${this.loading} @click=${() => this.refresh()}>
              ${this.loading ? e("loading") : e("refresh")}
            </button>
          </div>
        </header>
        ${this.error ? I`<div class="error">${this.error}</div>` : R}
        ${this.config?.config_entry_id ? R : I`<div class="muted">${e("select_config")}</div>`}
        ${this.inventory?.stale ? I`<div class="warning">${e("stale")}</div>` : R}
        ${this.inventory ? I`
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
            ${i ? I`<button @click=${() => this.clearFilters()}>${e("clear_filters")}</button>` : R}
          </div>
          ${this.inventory.stock_reconstruction_complete ? R : I`<div class="warning">${e("reconstruction_incomplete")}</div>`}
          <div class="wine-list">
            ${t.map((n) => this.renderWine(n))}
          </div>
          ${t.length === 0 ? I`<p class="muted">${e("no_matching_wines")}</p>` : R}
          ${this.selectedWine ? I`
            <ploc-cellar-wine-detail
              .hass=${this.hass}
              .wine=${this.selectedWine}
              @wine-detail-closed=${() => {
      this.selectedWine = void 0;
    }}>
            </ploc-cellar-wine-detail>
          ` : R}
        ` : R}
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
Bt.styles = Vn`
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
Jt([
  Ge({ attribute: !1 })
], Bt.prototype, "hass", 2);
Jt([
  nt()
], Bt.prototype, "config", 2);
Jt([
  nt()
], Bt.prototype, "inventory", 2);
Jt([
  nt()
], Bt.prototype, "loading", 2);
Jt([
  nt()
], Bt.prototype, "error", 2);
Jt([
  nt()
], Bt.prototype, "search", 2);
Jt([
  nt()
], Bt.prototype, "color", 2);
Jt([
  nt()
], Bt.prototype, "region", 2);
Jt([
  nt()
], Bt.prototype, "appellation", 2);
Jt([
  nt()
], Bt.prototype, "vintage", 2);
Jt([
  nt()
], Bt.prototype, "sort", 2);
Jt([
  nt()
], Bt.prototype, "selectedWine", 2);
Bt = Jt([
  qr("ploc-cellar-inventory-card")
], Bt);
window.customCards ??= [];
window.customCards.push({
  type: "ploc-cellar-inventory-card",
  name: Ci("picker_inventory_name"),
  description: Ci("picker_inventory_description")
});
var v1 = Object.defineProperty, p1 = Object.getOwnPropertyDescriptor, Ql = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? p1(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (i ? o(t, r, n) : o(n)) || n);
  return i && n && v1(t, r, n), n;
};
let Ya = class extends ke {
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
      return At(
        this.hass?.language ?? "en",
        t[e.name]
      );
    }, this.computeHelper = (e) => {
      if (e.name === "config_entry_id")
        return At(this.hass?.language ?? "en", "editor_configuration_helper");
      if (e.name === "title")
        return At(this.hass?.language ?? "en", "editor_title_helper");
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
                label: At(this.hass?.language ?? "en", "editor_rack_picker_buttons"),
                value: "buttons"
              },
              {
                label: At(this.hass?.language ?? "en", "editor_rack_picker_dropdown"),
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
    return I`
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
Ql([
  Ge({ attribute: !1 })
], Ya.prototype, "hass", 2);
Ql([
  nt()
], Ya.prototype, "config", 2);
Ya = Ql([
  qr("ploc-cellar-card-editor")
], Ya);
var Ks = function(e, t) {
  return Ks = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
    r.__proto__ = i;
  } || function(r, i) {
    for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (r[n] = i[n]);
  }, Ks(e, t);
};
function G(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  Ks(e, t);
  function r() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
}
var g1 = /* @__PURE__ */ (function() {
  function e() {
    this.firefox = !1, this.ie = !1, this.edge = !1, this.newEdge = !1, this.weChat = !1;
  }
  return e;
})(), m1 = /* @__PURE__ */ (function() {
  function e() {
    this.browser = new g1(), this.node = !1, this.wxa = !1, this.worker = !1, this.svgSupported = !1, this.touchEventsSupported = !1, this.pointerEventsSupported = !1, this.domSupported = !1, this.transformSupported = !1, this.transform3dSupported = !1, this.hasGlobalWindow = typeof window < "u";
  }
  return e;
})(), V = new m1();
typeof wx == "object" && typeof wx.getSystemInfoSync == "function" ? (V.wxa = !0, V.touchEventsSupported = !0) : typeof document > "u" && typeof self < "u" ? V.worker = !0 : !V.hasGlobalWindow || "Deno" in window ? (V.node = !0, V.svgSupported = !0) : y1(navigator.userAgent, V);
function y1(e, t) {
  var r = t.browser, i = e.match(/Firefox\/([\d.]+)/), n = e.match(/MSIE\s([\d.]+)/) || e.match(/Trident\/.+?rv:(([\d.]+))/), a = e.match(/Edge?\/([\d.]+)/), o = /micromessenger/i.test(e);
  i && (r.firefox = !0, r.version = i[1]), n && (r.ie = !0, r.version = n[1]), a && (r.edge = !0, r.version = a[1], r.newEdge = +a[1].split(".")[0] > 18), o && (r.weChat = !0), t.svgSupported = typeof SVGRect < "u", t.touchEventsSupported = "ontouchstart" in window && !r.ie && !r.edge, t.pointerEventsSupported = "onpointerdown" in window && (r.edge || r.ie && +r.version >= 11), t.domSupported = typeof document < "u";
  var s = document.documentElement.style;
  t.transform3dSupported = (r.ie && "transition" in s || r.edge || "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix() || "MozPerspective" in s) && !("OTransition" in s), t.transformSupported = t.transform3dSupported || r.ie && +r.version >= 9;
}
var Kl = 12, _1 = "sans-serif", Xr = Kl + "px " + _1, w1 = 20, b1 = 100, S1 = "007LLmW'55;N0500LLLLLLLLLL00NNNLzWW\\\\WQb\\0FWLg\\bWb\\WQ\\WrWWQ000CL5LLFLL0LL**F*gLLLL5F0LF\\FFF5.5N";
function x1(e) {
  var t = {};
  if (typeof JSON > "u")
    return t;
  for (var r = 0; r < e.length; r++) {
    var i = String.fromCharCode(r + 32), n = (e.charCodeAt(r) - w1) / b1;
    t[i] = n;
  }
  return t;
}
var T1 = x1(S1), Pi = {
  createCanvas: function() {
    return typeof document < "u" && document.createElement("canvas");
  },
  measureText: /* @__PURE__ */ (function() {
    var e, t;
    return function(r, i) {
      if (!e) {
        var n = Pi.createCanvas();
        e = n && n.getContext("2d");
      }
      if (e)
        return t !== i && (t = e.font = i || Xr), e.measureText(r);
      r = r || "", i = i || Xr;
      var a = /((?:\d+)?\.?\d*)px/.exec(i), o = a && +a[1] || Kl, s = 0;
      if (i.indexOf("mono") >= 0)
        s = o * r.length;
      else
        for (var l = 0; l < r.length; l++) {
          var u = T1[r[l]];
          s += u == null ? o : u * o;
        }
      return { width: s };
    };
  })(),
  loadImage: function(e, t, r) {
    var i = new Image();
    return i.onload = t, i.onerror = r, i.src = e, i;
  }
}, cd = fr([
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
}, {}), hd = fr([
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
}, {}), Hn = Object.prototype.toString, wo = Array.prototype, C1 = wo.forEach, A1 = wo.filter, Jl = wo.slice, M1 = wo.map, rc = function() {
}.constructor, Kn = rc ? rc.prototype : null, jl = "__proto__", D1 = 2311;
function fd() {
  return D1++;
}
function $l() {
  for (var e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t];
  typeof console < "u" && console.error.apply(console, e);
}
function j(e) {
  if (e == null || typeof e != "object")
    return e;
  var t = e, r = Hn.call(e);
  if (r === "[object Array]") {
    if (!fn(e)) {
      t = [];
      for (var i = 0, n = e.length; i < n; i++)
        t[i] = j(e[i]);
    }
  } else if (hd[r]) {
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
  } else if (!cd[r] && !fn(e) && !Mn(e)) {
    t = {};
    for (var o in e)
      e.hasOwnProperty(o) && o !== jl && (t[o] = j(e[o]));
  }
  return t;
}
function mt(e, t, r) {
  if (!z(t) || !z(e))
    return r ? j(t) : e;
  for (var i in t)
    if (t.hasOwnProperty(i) && i !== jl) {
      var n = e[i], a = t[i];
      z(a) && z(n) && !N(a) && !N(n) && !Mn(a) && !Mn(n) && !ic(a) && !ic(n) && !fn(a) && !fn(n) ? mt(n, a, r) : (r || !(i in e)) && (e[i] = j(t[i]));
    }
  return e;
}
function E(e, t) {
  if (Object.assign)
    Object.assign(e, t);
  else
    for (var r in t)
      t.hasOwnProperty(r) && r !== jl && (e[r] = t[r]);
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
function k1(e, t) {
  var r = e.prototype;
  function i() {
  }
  i.prototype = t.prototype, e.prototype = new i();
  for (var n in r)
    r.hasOwnProperty(n) && (e.prototype[n] = r[n]);
  e.prototype.constructor = e, e.superClass = t;
}
function Xe(e, t, r) {
  if (e = "prototype" in e ? e.prototype : e, t = "prototype" in t ? t.prototype : t, Object.getOwnPropertyNames)
    for (var i = Object.getOwnPropertyNames(t), n = 0; n < i.length; n++) {
      var a = i[n];
      a !== "constructor" && e[a] == null && (e[a] = t[a]);
    }
  else
    ct(e, t);
}
function Ht(e) {
  return !e || typeof e == "string" ? !1 : typeof e.length == "number";
}
function A(e, t, r) {
  if (e && t)
    if (e.forEach && e.forEach === C1)
      e.forEach(t, r);
    else if (e.length === +e.length)
      for (var i = 0, n = e.length; i < n; i++)
        t.call(r, e[i], i, e);
    else
      for (var a in e)
        e.hasOwnProperty(a) && t.call(r, e[a], a, e);
}
function $(e, t, r) {
  if (!e)
    return [];
  if (!t)
    return tu(e);
  if (e.map && e.map === M1)
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
    return tu(e);
  if (e.filter && e.filter === A1)
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
function P1(e, t) {
  for (var r = [], i = 2; i < arguments.length; i++)
    r[i - 2] = arguments[i];
  return function() {
    return e.apply(t, r.concat(Jl.call(arguments)));
  };
}
var lt = Kn && rt(Kn.bind) ? Kn.call.bind(Kn.bind) : P1;
function Qt(e) {
  for (var t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  return function() {
    return e.apply(this, t.concat(Jl.call(arguments)));
  };
}
function N(e) {
  return Array.isArray ? Array.isArray(e) : Hn.call(e) === "[object Array]";
}
function rt(e) {
  return typeof e == "function";
}
function W(e) {
  return typeof e == "string";
}
function Js(e) {
  return Hn.call(e) === "[object String]";
}
function yt(e) {
  return typeof e == "number";
}
function z(e) {
  var t = typeof e;
  return t === "function" || !!e && t === "object";
}
function ic(e) {
  return !!cd[Hn.call(e)];
}
function Gt(e) {
  return !!hd[Hn.call(e)];
}
function Mn(e) {
  return typeof e == "object" && typeof e.nodeType == "number" && typeof e.ownerDocument == "object";
}
function bo(e) {
  return e.colorStops != null;
}
function L1(e) {
  return e.image != null;
}
function I1(e) {
  return e !== e;
}
function Dn() {
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
function tu(e) {
  for (var t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  return Jl.apply(e, t);
}
function dd(e) {
  if (typeof e == "number")
    return [e, e, e, e];
  var t = e.length;
  return t === 2 ? [e[0], e[1], e[0], e[1]] : t === 3 ? [e[0], e[1], e[2], e[1]] : e;
}
function We(e, t) {
  if (!e)
    throw new Error(t);
}
function Me(e) {
  return e == null ? null : typeof e.trim == "function" ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}
var vd = "__ec_primitive__";
function js(e) {
  e[vd] = !0;
}
function fn(e) {
  return e[vd];
}
var E1 = (function() {
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
})(), pd = typeof Map == "function";
function R1() {
  return pd ? /* @__PURE__ */ new Map() : new E1();
}
var B1 = (function() {
  function e(t) {
    var r = N(t);
    this.data = R1();
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
    return pd ? Array.from(t) : t;
  }, e.prototype.removeKey = function(t) {
    this.data.delete(t);
  }, e;
})();
function tt(e) {
  return new B1(e);
}
function O1(e, t) {
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
  return t && E(r, t), r;
}
function gd(e) {
  var t = e.style;
  t.webkitUserSelect = "none", t.userSelect = "none", t.webkitTapHighlightColor = "rgba(0,0,0,0)", t["-webkit-touch-callout"] = "none";
}
function Mi(e, t) {
  return e.hasOwnProperty(t);
}
function Wt() {
}
var N1 = 180 / Math.PI;
function Li(e, t) {
  return e == null && (e = 0), t == null && (t = 0), [e, t];
}
function F1(e) {
  return [e[0], e[1]];
}
function nc(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e;
}
function z1(e, t, r) {
  return e[0] = t[0] - r[0], e[1] = t[1] - r[1], e;
}
function U1(e) {
  return Math.sqrt(V1(e));
}
function V1(e) {
  return e[0] * e[0] + e[1] * e[1];
}
function zo(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e;
}
function W1(e, t) {
  var r = U1(t);
  return r === 0 ? (e[0] = 0, e[1] = 0) : (e[0] = t[0] / r, e[1] = t[1] / r), e;
}
function $s(e, t) {
  return Math.sqrt((e[0] - t[0]) * (e[0] - t[0]) + (e[1] - t[1]) * (e[1] - t[1]));
}
var tl = $s;
function H1(e, t) {
  return (e[0] - t[0]) * (e[0] - t[0]) + (e[1] - t[1]) * (e[1] - t[1]);
}
var mi = H1;
function Uo(e, t, r, i) {
  return e[0] = t[0] + i * (r[0] - t[0]), e[1] = t[1] + i * (r[1] - t[1]), e;
}
function Pe(e, t, r) {
  var i = t[0], n = t[1];
  return e[0] = r[0] * i + r[2] * n + r[4], e[1] = r[1] * i + r[3] * n + r[5], e;
}
function di(e, t, r) {
  return e[0] = Math.min(t[0], r[0]), e[1] = Math.min(t[1], r[1]), e;
}
function vi(e, t, r) {
  return e[0] = Math.max(t[0], r[0]), e[1] = Math.max(t[1], r[1]), e;
}
var Jr = /* @__PURE__ */ (function() {
  function e(t, r) {
    this.target = t, this.topTarget = r && r.topTarget;
  }
  return e;
})(), G1 = (function() {
  function e(t) {
    this.handler = t, t.on("mousedown", this._dragStart, this), t.on("mousemove", this._drag, this), t.on("mouseup", this._dragEnd, this);
  }
  return e.prototype._dragStart = function(t) {
    for (var r = t.target; r && !r.draggable; )
      r = r.parent || r.__hostTarget;
    r && (this._draggingTarget = r, r.dragging = !0, this._x = t.offsetX, this._y = t.offsetY, this.handler.dispatchToElement(new Jr(r, t), "dragstart", t.event));
  }, e.prototype._drag = function(t) {
    var r = this._draggingTarget;
    if (r) {
      var i = t.offsetX, n = t.offsetY, a = i - this._x, o = n - this._y;
      this._x = i, this._y = n, r.drift(a, o, t), this.handler.dispatchToElement(new Jr(r, t), "drag", t.event);
      var s = this.handler.findHover(i, n, r).target, l = this._dropTarget;
      this._dropTarget = s, r !== s && (l && s !== l && this.handler.dispatchToElement(new Jr(l, t), "dragleave", t.event), s && s !== l && this.handler.dispatchToElement(new Jr(s, t), "dragenter", t.event));
    }
  }, e.prototype._dragEnd = function(t) {
    var r = this._draggingTarget;
    r && (r.dragging = !1), this.handler.dispatchToElement(new Jr(r, t), "dragend", t.event), this._dropTarget && this.handler.dispatchToElement(new Jr(this._dropTarget, t), "drop", t.event), this._draggingTarget = null, this._dropTarget = null;
  }, e;
})(), Ee = (function() {
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
})(), Y1 = Math.log(2);
function el(e, t, r, i, n, a) {
  var o = i + "-" + n, s = e.length;
  if (a.hasOwnProperty(o))
    return a[o];
  if (t === 1) {
    var l = Math.round(Math.log((1 << s) - 1 & ~n) / Y1);
    return e[r][l];
  }
  for (var u = i | 1 << r, c = r + 1; i & 1 << c; )
    c++;
  for (var h = 0, d = 0, f = 0; d < s; d++) {
    var v = 1 << d;
    v & n || (h += (f % 2 ? -1 : 1) * e[r][d] * el(e, t - 1, c, u, n | v, a), f++);
  }
  return a[o] = h, h;
}
function ac(e, t) {
  var r = [
    [e[0], e[1], 1, 0, 0, 0, -t[0] * e[0], -t[0] * e[1]],
    [0, 0, 0, e[0], e[1], 1, -t[1] * e[0], -t[1] * e[1]],
    [e[2], e[3], 1, 0, 0, 0, -t[2] * e[2], -t[2] * e[3]],
    [0, 0, 0, e[2], e[3], 1, -t[3] * e[2], -t[3] * e[3]],
    [e[4], e[5], 1, 0, 0, 0, -t[4] * e[4], -t[4] * e[5]],
    [0, 0, 0, e[4], e[5], 1, -t[5] * e[4], -t[5] * e[5]],
    [e[6], e[7], 1, 0, 0, 0, -t[6] * e[6], -t[6] * e[7]],
    [0, 0, 0, e[6], e[7], 1, -t[7] * e[6], -t[7] * e[7]]
  ], i = {}, n = el(r, 8, 0, 0, 0, i);
  if (n !== 0) {
    for (var a = [], o = 0; o < 8; o++)
      for (var s = 0; s < 8; s++)
        a[s] == null && (a[s] = 0), a[s] += ((o + s) % 2 ? -1 : 1) * el(r, 7, o === 0 ? 1 : 0, 1 << o, 1 << s, i) / n * t[o];
    return function(l, u, c) {
      var h = u * a[6] + c * a[7] + 1;
      l[0] = (u * a[0] + c * a[1] + a[2]) / h, l[1] = (u * a[3] + c * a[4] + a[5]) / h;
    };
  }
}
var oc = "___zrEVENTSAVED", Vo = [];
function X1(e, t, r, i, n) {
  return rl(Vo, t, i, n, !0) && rl(e, r, Vo[0], Vo[1]);
}
function rl(e, t, r, i, n) {
  if (t.getBoundingClientRect && V.domSupported && !md(t)) {
    var a = t[oc] || (t[oc] = {}), o = q1(t, a), s = Z1(o, a, n);
    if (s)
      return s(e, r, i), !0;
  }
  return !1;
}
function q1(e, t) {
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
function Z1(e, t, r) {
  for (var i = r ? "invTrans" : "trans", n = t[i], a = t.srcCoords, o = [], s = [], l = !0, u = 0; u < 4; u++) {
    var c = e[u].getBoundingClientRect(), h = 2 * u, d = c.left, f = c.top;
    o.push(d, f), l = l && a && d === a[h] && f === a[h + 1], s.push(e[u].offsetLeft, e[u].offsetTop);
  }
  return l && n ? n : (t.srcCoords = o, t[i] = r ? ac(s, o) : ac(o, s));
}
function md(e) {
  return e.nodeName.toUpperCase() === "CANVAS";
}
var Q1 = /([&<>"'])/g, K1 = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function Ft(e) {
  return e == null ? "" : (e + "").replace(Q1, function(t, r) {
    return K1[r];
  });
}
var J1 = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, Wo = [], j1 = V.browser.firefox && +V.browser.version.split(".")[0] < 39;
function il(e, t, r, i) {
  return r = r || {}, i ? sc(e, t, r) : j1 && t.layerX != null && t.layerX !== t.offsetX ? (r.zrX = t.layerX, r.zrY = t.layerY) : t.offsetX != null ? (r.zrX = t.offsetX, r.zrY = t.offsetY) : sc(e, t, r), r;
}
function sc(e, t, r) {
  if (V.domSupported && e.getBoundingClientRect) {
    var i = t.clientX, n = t.clientY;
    if (md(e)) {
      var a = e.getBoundingClientRect();
      r.zrX = i - a.left, r.zrY = n - a.top;
      return;
    } else if (rl(Wo, e, i, n)) {
      r.zrX = Wo[0], r.zrY = Wo[1];
      return;
    }
  }
  r.zrX = r.zrY = 0;
}
function eu(e) {
  return e || window.event;
}
function re(e, t, r) {
  if (t = eu(t), t.zrX != null)
    return t;
  var i = t.type, n = i && i.indexOf("touch") >= 0;
  if (n) {
    var o = i !== "touchend" ? t.targetTouches[0] : t.changedTouches[0];
    o && il(e, o, t, r);
  } else {
    il(e, t, t, r);
    var a = $1(t);
    t.zrDelta = a ? a / 120 : -(t.detail || 0) / 3;
  }
  var s = t.button;
  return t.which == null && s !== void 0 && J1.test(t.type) && (t.which = s & 1 ? 1 : s & 2 ? 3 : s & 4 ? 2 : 0), t;
}
function $1(e) {
  var t = e.wheelDelta;
  if (t)
    return t;
  var r = e.deltaX, i = e.deltaY;
  if (r == null || i == null)
    return t;
  var n = Math.abs(i !== 0 ? i : r), a = i > 0 ? -1 : i < 0 ? 1 : r > 0 ? -1 : 1;
  return 3 * n * a;
}
function tb(e, t, r, i) {
  e.addEventListener(t, r, i);
}
function eb(e, t, r, i) {
  e.removeEventListener(t, r, i);
}
var yd = function(e) {
  e.preventDefault(), e.stopPropagation(), e.cancelBubble = !0;
}, rb = (function() {
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
        var l = n[o], u = il(i, l, {});
        a.points.push([u.zrX, u.zrY]), a.touches.push(l);
      }
      this._track.push(a);
    }
  }, e.prototype._recognize = function(t) {
    for (var r in Ho)
      if (Ho.hasOwnProperty(r)) {
        var i = Ho[r](this._track, t);
        if (i)
          return i;
      }
  }, e;
})();
function lc(e) {
  var t = e[1][0] - e[0][0], r = e[1][1] - e[0][1];
  return Math.sqrt(t * t + r * r);
}
function ib(e) {
  return [
    (e[0][0] + e[1][0]) / 2,
    (e[0][1] + e[1][1]) / 2
  ];
}
var Ho = {
  pinch: function(e, t) {
    var r = e.length;
    if (r) {
      var i = (e[r - 1] || {}).points, n = (e[r - 2] || {}).points || i;
      if (n && n.length > 1 && i && i.length > 1) {
        var a = lc(i) / lc(n);
        !isFinite(a) && (a = 1), t.pinchScale = a;
        var o = ib(i);
        return t.pinchX = o[0], t.pinchY = o[1], {
          type: "pinch",
          target: e[0].target,
          event: t
        };
      }
    }
  }
};
function yi() {
  return [1, 0, 0, 1, 0, 0];
}
function ru(e) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 1, e[4] = 0, e[5] = 0, e;
}
function nb(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e;
}
function _i(e, t, r) {
  var i = t[0] * r[0] + t[2] * r[1], n = t[1] * r[0] + t[3] * r[1], a = t[0] * r[2] + t[2] * r[3], o = t[1] * r[2] + t[3] * r[3], s = t[0] * r[4] + t[2] * r[5] + t[4], l = t[1] * r[4] + t[3] * r[5] + t[5];
  return e[0] = i, e[1] = n, e[2] = a, e[3] = o, e[4] = s, e[5] = l, e;
}
function nl(e, t, r) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4] + r[0], e[5] = t[5] + r[1], e;
}
function iu(e, t, r, i) {
  i === void 0 && (i = [0, 0]);
  var n = t[0], a = t[2], o = t[4], s = t[1], l = t[3], u = t[5], c = Math.sin(r), h = Math.cos(r);
  return e[0] = n * h + s * c, e[1] = -n * c + s * h, e[2] = a * h + l * c, e[3] = -a * c + h * l, e[4] = h * (o - i[0]) + c * (u - i[1]) + i[0], e[5] = h * (u - i[1]) - c * (o - i[0]) + i[1], e;
}
function ab(e, t, r) {
  var i = r[0], n = r[1];
  return e[0] = t[0] * i, e[1] = t[1] * n, e[2] = t[2] * i, e[3] = t[3] * n, e[4] = t[4] * i, e[5] = t[5] * n, e;
}
function _d(e, t) {
  var r = t[0], i = t[2], n = t[4], a = t[1], o = t[3], s = t[5], l = r * o - a * i;
  return l ? (l = 1 / l, e[0] = o * l, e[1] = -a * l, e[2] = -i * l, e[3] = r * l, e[4] = (i * s - o * n) * l, e[5] = (a * n - r * s) * l, e) : null;
}
var H = (function() {
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
})(), Jn = Math.min, jn = Math.max, gr = new H(), mr = new H(), yr = new H(), _r = new H(), Fi = new H(), zi = new H(), it = (function() {
  function e(t, r, i, n) {
    i < 0 && (t = t + i, i = -i), n < 0 && (r = r + n, n = -n), this.x = t, this.y = r, this.width = i, this.height = n;
  }
  return e.prototype.union = function(t) {
    var r = Jn(t.x, this.x), i = Jn(t.y, this.y);
    isFinite(this.x) && isFinite(this.width) ? this.width = jn(t.x + t.width, this.x + this.width) - r : this.width = t.width, isFinite(this.y) && isFinite(this.height) ? this.height = jn(t.y + t.height, this.y + this.height) - i : this.height = t.height, this.x = r, this.y = i;
  }, e.prototype.applyTransform = function(t) {
    e.applyTransform(this, this, t);
  }, e.prototype.calculateTransform = function(t) {
    var r = this, i = t.width / r.width, n = t.height / r.height, a = yi();
    return nl(a, a, [-r.x, -r.y]), ab(a, a, [i, n]), nl(a, a, [t.x, t.y]), a;
  }, e.prototype.intersect = function(t, r) {
    if (!t)
      return !1;
    t instanceof e || (t = e.create(t));
    var i = this, n = i.x, a = i.x + i.width, o = i.y, s = i.y + i.height, l = t.x, u = t.x + t.width, c = t.y, h = t.y + t.height, d = !(a < l || u < n || s < c || h < o);
    if (r) {
      var f = 1 / 0, v = 0, g = Math.abs(a - l), p = Math.abs(u - n), m = Math.abs(s - c), y = Math.abs(h - o), _ = Math.min(g, p), w = Math.min(m, y);
      a < l || u < n ? _ > v && (v = _, g < p ? H.set(zi, -g, 0) : H.set(zi, p, 0)) : _ < f && (f = _, g < p ? H.set(Fi, g, 0) : H.set(Fi, -p, 0)), s < c || h < o ? w > v && (v = w, m < y ? H.set(zi, 0, -m) : H.set(zi, 0, y)) : _ < f && (f = _, m < y ? H.set(Fi, 0, m) : H.set(Fi, 0, -y));
    }
    return r && H.copy(r, d ? Fi : zi), d;
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
    gr.x = yr.x = r.x, gr.y = _r.y = r.y, mr.x = _r.x = r.x + r.width, mr.y = yr.y = r.y + r.height, gr.transform(i), _r.transform(i), mr.transform(i), yr.transform(i), t.x = Jn(gr.x, mr.x, yr.x, _r.x), t.y = Jn(gr.y, mr.y, yr.y, _r.y);
    var l = jn(gr.x, mr.x, yr.x, _r.x), u = jn(gr.y, mr.y, yr.y, _r.y);
    t.width = l - t.x, t.height = u - t.y;
  }, e;
})(), wd = "silent";
function ob(e, t, r) {
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
    stop: sb
  };
}
function sb() {
  yd(this.event);
}
var lb = (function(e) {
  G(t, e);
  function t() {
    var r = e !== null && e.apply(this, arguments) || this;
    return r.handler = null, r;
  }
  return t.prototype.dispose = function() {
  }, t.prototype.setCursor = function() {
  }, t;
})(Ee), Ui = /* @__PURE__ */ (function() {
  function e(t, r) {
    this.x = t, this.y = r;
  }
  return e;
})(), ub = [
  "click",
  "dblclick",
  "mousewheel",
  "mouseout",
  "mouseup",
  "mousedown",
  "mousemove",
  "contextmenu"
], Go = new it(0, 0, 0, 0), bd = (function(e) {
  G(t, e);
  function t(r, i, n, a, o) {
    var s = e.call(this) || this;
    return s._hovered = new Ui(0, 0), s.storage = r, s.painter = i, s.painterRoot = a, s._pointerSize = o, n = n || new lb(), s.proxy = null, s.setHandlerProxy(n), s._draggingMgr = new G1(s), s;
  }
  return t.prototype.setHandlerProxy = function(r) {
    this.proxy && this.proxy.dispose(), r && (A(ub, function(i) {
      r.on && r.on(i, this[i], this);
    }, this), r.handler = this), this.proxy = r;
  }, t.prototype.mousemove = function(r) {
    var i = r.zrX, n = r.zrY, a = Sd(this, i, n), o = this._hovered, s = o.target;
    s && !s.__zr && (o = this.findHover(o.x, o.y), s = o.target);
    var l = this._hovered = a ? new Ui(i, n) : this.findHover(i, n), u = l.target, c = this.proxy;
    c.setCursor && c.setCursor(u ? u.cursor : "default"), s && u !== s && this.dispatchToElement(o, "mouseout", r), this.dispatchToElement(l, "mousemove", r), u && u !== s && this.dispatchToElement(l, "mouseover", r);
  }, t.prototype.mouseout = function(r) {
    var i = r.zrEventControl;
    i !== "only_globalout" && this.dispatchToElement(this._hovered, "mouseout", r), i !== "no_globalout" && this.trigger("globalout", { type: "globalout", event: r });
  }, t.prototype.resize = function() {
    this._hovered = new Ui(0, 0);
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
      for (var o = "on" + i, s = ob(i, r, n); a && (a[o] && (s.cancelBubble = !!a[o].call(a, s)), a.trigger(i, s), a = a.__hostTarget ? a.__hostTarget : a.parent, !s.cancelBubble); )
        ;
      s.cancelBubble || (this.trigger(i, s), this.painter && this.painter.eachOtherLayer && this.painter.eachOtherLayer(function(l) {
        typeof l[o] == "function" && l[o].call(l, s), l.trigger && l.trigger(i, s);
      }));
    }
  }, t.prototype.findHover = function(r, i, n) {
    var a = this.storage.getDisplayList(), o = new Ui(r, i);
    if (uc(a, o, r, i, n), this._pointerSize && !o.target) {
      for (var s = [], l = this._pointerSize, u = l / 2, c = new it(r - u, i - u, l, l), h = a.length - 1; h >= 0; h--) {
        var d = a[h];
        d !== n && !d.ignore && !d.ignoreCoarsePointer && (!d.parent || !d.parent.ignoreCoarsePointer) && (Go.copy(d.getBoundingRect()), d.transform && Go.applyTransform(d.transform), Go.intersect(c) && s.push(d));
      }
      if (s.length)
        for (var f = 4, v = Math.PI / 12, g = Math.PI * 2, p = 0; p < u; p += f)
          for (var m = 0; m < g; m += v) {
            var y = r + p * Math.cos(m), _ = i + p * Math.sin(m);
            if (uc(s, o, y, _, n), o.target)
              return o;
          }
    }
    return o;
  }, t.prototype.processGesture = function(r, i) {
    this._gestureMgr || (this._gestureMgr = new rb());
    var n = this._gestureMgr;
    i === "start" && n.clear();
    var a = n.recognize(r, this.findHover(r.zrX, r.zrY, null).target, this.proxy.dom);
    if (i === "end" && n.clear(), a) {
      var o = a.type;
      r.gestureEvent = o;
      var s = new Ui();
      s.target = a.target, this.dispatchToElement(s, o, a.event);
    }
  }, t;
})(Ee);
A(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function(e) {
  bd.prototype[e] = function(t) {
    var r = t.zrX, i = t.zrY, n = Sd(this, r, i), a, o;
    if ((e !== "mouseup" || !n) && (a = this.findHover(r, i), o = a.target), e === "mousedown")
      this._downEl = o, this._downPoint = [t.zrX, t.zrY], this._upEl = o;
    else if (e === "mouseup")
      this._upEl = o;
    else if (e === "click") {
      if (this._downEl !== this._upEl || !this._downPoint || tl(this._downPoint, [t.zrX, t.zrY]) > 4)
        return;
      this._downPoint = null;
    }
    this.dispatchToElement(a, e, t);
  };
});
function cb(e, t, r) {
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
    return n ? wd : !0;
  }
  return !1;
}
function uc(e, t, r, i, n) {
  for (var a = e.length - 1; a >= 0; a--) {
    var o = e[a], s = void 0;
    if (o !== n && !o.ignore && (s = cb(o, r, i)) && (!t.topTarget && (t.topTarget = o), s !== wd)) {
      t.target = o;
      break;
    }
  }
}
function Sd(e, t, r) {
  var i = e.painter;
  return t < 0 || t > i.getWidth() || r < 0 || r > i.getHeight();
}
var xd = 32, Vi = 7;
function hb(e) {
  for (var t = 0; e >= xd; )
    t |= e & 1, e >>= 1;
  return e + t;
}
function cc(e, t, r, i) {
  var n = t + 1;
  if (n === r)
    return 1;
  if (i(e[n++], e[t]) < 0) {
    for (; n < r && i(e[n], e[n - 1]) < 0; )
      n++;
    fb(e, t, n);
  } else
    for (; n < r && i(e[n], e[n - 1]) >= 0; )
      n++;
  return n - t;
}
function fb(e, t, r) {
  for (r--; t < r; ) {
    var i = e[t];
    e[t++] = e[r], e[r--] = i;
  }
}
function hc(e, t, r, i, n) {
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
function Yo(e, t, r, i, n, a) {
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
function Xo(e, t, r, i, n, a) {
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
function db(e, t) {
  var r = Vi, i, n, a = 0, o = [];
  i = [], n = [];
  function s(f, v) {
    i[a] = f, n[a] = v, a += 1;
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
    var v = i[f], g = n[f], p = i[f + 1], m = n[f + 1];
    n[f] = g + m, f === a - 3 && (i[f + 1] = i[f + 2], n[f + 1] = n[f + 2]), a--;
    var y = Xo(e[p], e, v, g, 0, t);
    v += y, g -= y, g !== 0 && (m = Yo(e[v + g - 1], e, p, m, m - 1, t), m !== 0 && (g <= m ? h(v, g, p, m) : d(v, g, p, m)));
  }
  function h(f, v, g, p) {
    var m = 0;
    for (m = 0; m < v; m++)
      o[m] = e[f + m];
    var y = 0, _ = g, w = f;
    if (e[w++] = e[_++], --p === 0) {
      for (m = 0; m < v; m++)
        e[w + m] = o[y + m];
      return;
    }
    if (v === 1) {
      for (m = 0; m < p; m++)
        e[w + m] = e[_ + m];
      e[w + p] = o[y];
      return;
    }
    for (var S = r, b, x, T; ; ) {
      b = 0, x = 0, T = !1;
      do
        if (t(e[_], o[y]) < 0) {
          if (e[w++] = e[_++], x++, b = 0, --p === 0) {
            T = !0;
            break;
          }
        } else if (e[w++] = o[y++], b++, x = 0, --v === 1) {
          T = !0;
          break;
        }
      while ((b | x) < S);
      if (T)
        break;
      do {
        if (b = Xo(e[_], o, y, v, 0, t), b !== 0) {
          for (m = 0; m < b; m++)
            e[w + m] = o[y + m];
          if (w += b, y += b, v -= b, v <= 1) {
            T = !0;
            break;
          }
        }
        if (e[w++] = e[_++], --p === 0) {
          T = !0;
          break;
        }
        if (x = Yo(o[y], e, _, p, 0, t), x !== 0) {
          for (m = 0; m < x; m++)
            e[w + m] = e[_ + m];
          if (w += x, _ += x, p -= x, p === 0) {
            T = !0;
            break;
          }
        }
        if (e[w++] = o[y++], --v === 1) {
          T = !0;
          break;
        }
        S--;
      } while (b >= Vi || x >= Vi);
      if (T)
        break;
      S < 0 && (S = 0), S += 2;
    }
    if (r = S, r < 1 && (r = 1), v === 1) {
      for (m = 0; m < p; m++)
        e[w + m] = e[_ + m];
      e[w + p] = o[y];
    } else {
      if (v === 0)
        throw new Error();
      for (m = 0; m < v; m++)
        e[w + m] = o[y + m];
    }
  }
  function d(f, v, g, p) {
    var m = 0;
    for (m = 0; m < p; m++)
      o[m] = e[g + m];
    var y = f + v - 1, _ = p - 1, w = g + p - 1, S = 0, b = 0;
    if (e[w--] = e[y--], --v === 0) {
      for (S = w - (p - 1), m = 0; m < p; m++)
        e[S + m] = o[m];
      return;
    }
    if (p === 1) {
      for (w -= v, y -= v, b = w + 1, S = y + 1, m = v - 1; m >= 0; m--)
        e[b + m] = e[S + m];
      e[w] = o[_];
      return;
    }
    for (var x = r; ; ) {
      var T = 0, C = 0, M = !1;
      do
        if (t(o[_], e[y]) < 0) {
          if (e[w--] = e[y--], T++, C = 0, --v === 0) {
            M = !0;
            break;
          }
        } else if (e[w--] = o[_--], C++, T = 0, --p === 1) {
          M = !0;
          break;
        }
      while ((T | C) < x);
      if (M)
        break;
      do {
        if (T = v - Xo(o[_], e, f, v, v - 1, t), T !== 0) {
          for (w -= T, y -= T, v -= T, b = w + 1, S = y + 1, m = T - 1; m >= 0; m--)
            e[b + m] = e[S + m];
          if (v === 0) {
            M = !0;
            break;
          }
        }
        if (e[w--] = o[_--], --p === 1) {
          M = !0;
          break;
        }
        if (C = p - Yo(e[y], o, 0, p, p - 1, t), C !== 0) {
          for (w -= C, _ -= C, p -= C, b = w + 1, S = _ + 1, m = 0; m < C; m++)
            e[b + m] = o[S + m];
          if (p <= 1) {
            M = !0;
            break;
          }
        }
        if (e[w--] = e[y--], --v === 0) {
          M = !0;
          break;
        }
        x--;
      } while (T >= Vi || C >= Vi);
      if (M)
        break;
      x < 0 && (x = 0), x += 2;
    }
    if (r = x, r < 1 && (r = 1), p === 1) {
      for (w -= v, y -= v, b = w + 1, S = y + 1, m = v - 1; m >= 0; m--)
        e[b + m] = e[S + m];
      e[w] = o[_];
    } else {
      if (p === 0)
        throw new Error();
      for (S = w - (p - 1), m = 0; m < p; m++)
        e[S + m] = o[m];
    }
  }
  return {
    mergeRuns: l,
    forceMergeRuns: u,
    pushRun: s
  };
}
function ka(e, t, r, i) {
  r || (r = 0), i || (i = e.length);
  var n = i - r;
  if (!(n < 2)) {
    var a = 0;
    if (n < xd) {
      a = cc(e, r, i, t), hc(e, r, i, r + a, t);
      return;
    }
    var o = db(e, t), s = hb(n);
    do {
      if (a = cc(e, r, i, t), a < s) {
        var l = n;
        l > s && (l = s), hc(e, r, r + l, r + a, t), a = l;
      }
      o.pushRun(r, a), o.mergeRuns(), n -= a, r += a;
    } while (n !== 0);
    o.forceMergeRuns();
  }
}
var Zt = 1, nn = 2, hi = 4, fc = !1;
function qo() {
  fc || (fc = !0, console.warn("z / z2 / zlevel of displayable is invalid, which may cause unexpected errors"));
}
function dc(e, t) {
  return e.zlevel === t.zlevel ? e.z === t.z ? e.z2 - t.z2 : e.z - t.z : e.zlevel - t.zlevel;
}
var vb = (function() {
  function e() {
    this._roots = [], this._displayList = [], this._displayListLen = 0, this.displayableSortFunc = dc;
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
    i.length = this._displayListLen, ka(i, dc);
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
          t.__dirty && (u.__dirty |= Zt), this._updateAndAddDisplayable(u, r, i);
        }
        t.__dirty = 0;
      } else {
        var c = t;
        r && r.length ? c.__clipPaths = r : c.__clipPaths && c.__clipPaths.length > 0 && (c.__clipPaths = []), isNaN(c.z) && (qo(), c.z = 0), isNaN(c.z2) && (qo(), c.z2 = 0), isNaN(c.zlevel) && (qo(), c.zlevel = 0), this._displayList[this._displayListLen++] = c;
      }
      var h = t.getDecalElement && t.getDecalElement();
      h && this._updateAndAddDisplayable(h, r, i);
      var d = t.getTextGuideLine();
      d && this._updateAndAddDisplayable(d, r, i);
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
})(), Xa;
Xa = V.hasGlobalWindow && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function(e) {
  return setTimeout(e, 16);
};
var dn = {
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
    return 1 - dn.bounceOut(1 - e);
  },
  bounceOut: function(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  bounceInOut: function(e) {
    return e < 0.5 ? dn.bounceIn(e * 2) * 0.5 : dn.bounceOut(e * 2 - 1) * 0.5 + 0.5;
  }
}, $n = Math.pow, ur = Math.sqrt, qa = 1e-8, Td = 1e-4, vc = ur(3), ta = 1 / 3, Ce = Li(), ae = Li(), wi = Li();
function ar(e) {
  return e > -qa && e < qa;
}
function Cd(e) {
  return e > qa || e < -qa;
}
function Et(e, t, r, i, n) {
  var a = 1 - n;
  return a * a * (a * e + 3 * n * t) + n * n * (n * i + 3 * a * r);
}
function pc(e, t, r, i, n) {
  var a = 1 - n;
  return 3 * (((t - e) * a + 2 * (r - t) * n) * a + (i - r) * n * n);
}
function Ad(e, t, r, i, n, a) {
  var o = i + 3 * (t - r) - e, s = 3 * (r - t * 2 + e), l = 3 * (t - e), u = e - n, c = s * s - 3 * o * l, h = s * l - 9 * o * u, d = l * l - 3 * s * u, f = 0;
  if (ar(c) && ar(h))
    if (ar(s))
      a[0] = 0;
    else {
      var v = -l / s;
      v >= 0 && v <= 1 && (a[f++] = v);
    }
  else {
    var g = h * h - 4 * c * d;
    if (ar(g)) {
      var p = h / c, v = -s / o + p, m = -p / 2;
      v >= 0 && v <= 1 && (a[f++] = v), m >= 0 && m <= 1 && (a[f++] = m);
    } else if (g > 0) {
      var y = ur(g), _ = c * s + 1.5 * o * (-h + y), w = c * s + 1.5 * o * (-h - y);
      _ < 0 ? _ = -$n(-_, ta) : _ = $n(_, ta), w < 0 ? w = -$n(-w, ta) : w = $n(w, ta);
      var v = (-s - (_ + w)) / (3 * o);
      v >= 0 && v <= 1 && (a[f++] = v);
    } else {
      var S = (2 * c * s - 3 * o * h) / (2 * ur(c * c * c)), b = Math.acos(S) / 3, x = ur(c), T = Math.cos(b), v = (-s - 2 * x * T) / (3 * o), m = (-s + x * (T + vc * Math.sin(b))) / (3 * o), C = (-s + x * (T - vc * Math.sin(b))) / (3 * o);
      v >= 0 && v <= 1 && (a[f++] = v), m >= 0 && m <= 1 && (a[f++] = m), C >= 0 && C <= 1 && (a[f++] = C);
    }
  }
  return f;
}
function Md(e, t, r, i, n) {
  var a = 6 * r - 12 * t + 6 * e, o = 9 * t + 3 * i - 3 * e - 9 * r, s = 3 * t - 3 * e, l = 0;
  if (ar(o)) {
    if (Cd(a)) {
      var u = -s / a;
      u >= 0 && u <= 1 && (n[l++] = u);
    }
  } else {
    var c = a * a - 4 * o * s;
    if (ar(c))
      n[0] = -a / (2 * o);
    else if (c > 0) {
      var h = ur(c), u = (-a + h) / (2 * o), d = (-a - h) / (2 * o);
      u >= 0 && u <= 1 && (n[l++] = u), d >= 0 && d <= 1 && (n[l++] = d);
    }
  }
  return l;
}
function Za(e, t, r, i, n, a) {
  var o = (t - e) * n + e, s = (r - t) * n + t, l = (i - r) * n + r, u = (s - o) * n + o, c = (l - s) * n + s, h = (c - u) * n + u;
  a[0] = e, a[1] = o, a[2] = u, a[3] = h, a[4] = h, a[5] = c, a[6] = l, a[7] = i;
}
function pb(e, t, r, i, n, a, o, s, l, u, c) {
  var h, d = 5e-3, f = 1 / 0, v, g, p, m;
  Ce[0] = l, Ce[1] = u;
  for (var y = 0; y < 1; y += 0.05)
    ae[0] = Et(e, r, n, o, y), ae[1] = Et(t, i, a, s, y), p = mi(Ce, ae), p < f && (h = y, f = p);
  f = 1 / 0;
  for (var _ = 0; _ < 32 && !(d < Td); _++)
    v = h - d, g = h + d, ae[0] = Et(e, r, n, o, v), ae[1] = Et(t, i, a, s, v), p = mi(ae, Ce), v >= 0 && p < f ? (h = v, f = p) : (wi[0] = Et(e, r, n, o, g), wi[1] = Et(t, i, a, s, g), m = mi(wi, Ce), g <= 1 && m < f ? (h = g, f = m) : d *= 0.5);
  return ur(f);
}
function gb(e, t, r, i, n, a, o, s, l) {
  for (var u = e, c = t, h = 0, d = 1 / l, f = 1; f <= l; f++) {
    var v = f * d, g = Et(e, r, n, o, v), p = Et(t, i, a, s, v), m = g - u, y = p - c;
    h += Math.sqrt(m * m + y * y), u = g, c = p;
  }
  return h;
}
function zt(e, t, r, i) {
  var n = 1 - i;
  return n * (n * e + 2 * i * t) + i * i * r;
}
function gc(e, t, r, i) {
  return 2 * ((1 - i) * (t - e) + i * (r - t));
}
function mb(e, t, r, i, n) {
  var a = e - 2 * t + r, o = 2 * (t - e), s = e - i, l = 0;
  if (ar(a)) {
    if (Cd(o)) {
      var u = -s / o;
      u >= 0 && u <= 1 && (n[l++] = u);
    }
  } else {
    var c = o * o - 4 * a * s;
    if (ar(c)) {
      var u = -o / (2 * a);
      u >= 0 && u <= 1 && (n[l++] = u);
    } else if (c > 0) {
      var h = ur(c), u = (-o + h) / (2 * a), d = (-o - h) / (2 * a);
      u >= 0 && u <= 1 && (n[l++] = u), d >= 0 && d <= 1 && (n[l++] = d);
    }
  }
  return l;
}
function Dd(e, t, r) {
  var i = e + r - 2 * t;
  return i === 0 ? 0.5 : (e - t) / i;
}
function Qa(e, t, r, i, n) {
  var a = (t - e) * i + e, o = (r - t) * i + t, s = (o - a) * i + a;
  n[0] = e, n[1] = a, n[2] = s, n[3] = s, n[4] = o, n[5] = r;
}
function yb(e, t, r, i, n, a, o, s, l) {
  var u, c = 5e-3, h = 1 / 0;
  Ce[0] = o, Ce[1] = s;
  for (var d = 0; d < 1; d += 0.05) {
    ae[0] = zt(e, r, n, d), ae[1] = zt(t, i, a, d);
    var f = mi(Ce, ae);
    f < h && (u = d, h = f);
  }
  h = 1 / 0;
  for (var v = 0; v < 32 && !(c < Td); v++) {
    var g = u - c, p = u + c;
    ae[0] = zt(e, r, n, g), ae[1] = zt(t, i, a, g);
    var f = mi(ae, Ce);
    if (g >= 0 && f < h)
      u = g, h = f;
    else {
      wi[0] = zt(e, r, n, p), wi[1] = zt(t, i, a, p);
      var m = mi(wi, Ce);
      p <= 1 && m < h ? (u = p, h = m) : c *= 0.5;
    }
  }
  return ur(h);
}
function _b(e, t, r, i, n, a, o) {
  for (var s = e, l = t, u = 0, c = 1 / o, h = 1; h <= o; h++) {
    var d = h * c, f = zt(e, r, n, d), v = zt(t, i, a, d), g = f - s, p = v - l;
    u += Math.sqrt(g * g + p * p), s = f, l = v;
  }
  return u;
}
var wb = /cubic-bezier\(([0-9,\.e ]+)\)/;
function kd(e) {
  var t = e && wb.exec(e);
  if (t) {
    var r = t[1].split(","), i = +Me(r[0]), n = +Me(r[1]), a = +Me(r[2]), o = +Me(r[3]);
    if (isNaN(i + n + a + o))
      return;
    var s = [];
    return function(l) {
      return l <= 0 ? 0 : l >= 1 ? 1 : Ad(0, i, a, 1, l, s) && Et(0, n, o, 1, s[0]);
    };
  }
}
var bb = (function() {
  function e(t) {
    this._inited = !1, this._startTime = 0, this._pausedTime = 0, this._paused = !1, this._life = t.life || 1e3, this._delay = t.delay || 0, this.loop = t.loop || !1, this.onframe = t.onframe || Wt, this.ondestroy = t.ondestroy || Wt, this.onrestart = t.onrestart || Wt, t.easing && this.setEasing(t.easing);
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
    this.easing = t, this.easingFunc = rt(t) ? t : dn[t] || kd(t);
  }, e;
})(), Pd = /* @__PURE__ */ (function() {
  function e(t) {
    this.value = t;
  }
  return e;
})(), Sb = (function() {
  function e() {
    this._len = 0;
  }
  return e.prototype.insert = function(t) {
    var r = new Pd(t);
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
    this._list = new Sb(), this._maxSize = 10, this._map = {}, this._maxSize = t;
  }
  return e.prototype.put = function(t, r) {
    var i = this._list, n = this._map, a = null;
    if (n[t] == null) {
      var o = i.len(), s = this._lastRemovedEntry;
      if (o >= this._maxSize && o > 0) {
        var l = i.head;
        i.remove(l), delete n[l.key], a = l.value, this._lastRemovedEntry = l;
      }
      s ? s.value = r : s = new Pd(r), s.key = t, i.insertEntry(s), n[t] = s;
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
})(), mc = {
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
function vn(e) {
  return e = Math.round(e), e < 0 ? 0 : e > 255 ? 255 : e;
}
function yc(e) {
  return e < 0 ? 0 : e > 1 ? 1 : e;
}
function Zo(e) {
  var t = e;
  return t.length && t.charAt(t.length - 1) === "%" ? vn(parseFloat(t) / 100 * 255) : vn(parseInt(t, 10));
}
function pn(e) {
  var t = e;
  return t.length && t.charAt(t.length - 1) === "%" ? yc(parseFloat(t) / 100) : yc(parseFloat(t));
}
function Qo(e, t, r) {
  return r < 0 ? r += 1 : r > 1 && (r -= 1), r * 6 < 1 ? e + (t - e) * r * 6 : r * 2 < 1 ? t : r * 3 < 2 ? e + (t - e) * (2 / 3 - r) * 6 : e;
}
function ee(e, t, r, i, n) {
  return e[0] = t, e[1] = r, e[2] = i, e[3] = n, e;
}
function al(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e;
}
var Ld = new Gn(20), ea = null;
function jr(e, t) {
  ea && al(ea, t), ea = Ld.put(e, ea || t.slice());
}
function bi(e, t) {
  if (e) {
    t = t || [];
    var r = Ld.get(e);
    if (r)
      return al(t, r);
    e = e + "";
    var i = e.replace(/ /g, "").toLowerCase();
    if (i in mc)
      return al(t, mc[i]), jr(e, t), t;
    var n = i.length;
    if (i.charAt(0) === "#") {
      if (n === 4 || n === 5) {
        var a = parseInt(i.slice(1, 4), 16);
        if (!(a >= 0 && a <= 4095)) {
          ee(t, 0, 0, 0, 1);
          return;
        }
        return ee(t, (a & 3840) >> 4 | (a & 3840) >> 8, a & 240 | (a & 240) >> 4, a & 15 | (a & 15) << 4, n === 5 ? parseInt(i.slice(4), 16) / 15 : 1), jr(e, t), t;
      } else if (n === 7 || n === 9) {
        var a = parseInt(i.slice(1, 7), 16);
        if (!(a >= 0 && a <= 16777215)) {
          ee(t, 0, 0, 0, 1);
          return;
        }
        return ee(t, (a & 16711680) >> 16, (a & 65280) >> 8, a & 255, n === 9 ? parseInt(i.slice(7), 16) / 255 : 1), jr(e, t), t;
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
            return ee(t, Zo(u[0]), Zo(u[1]), Zo(u[2]), u.length === 3 ? c : pn(u[3])), jr(e, t), t;
          ee(t, 0, 0, 0, 1);
          return;
        case "hsla":
          if (u.length !== 4) {
            ee(t, 0, 0, 0, 1);
            return;
          }
          return u[3] = pn(u[3]), _c(u, t), jr(e, t), t;
        case "hsl":
          if (u.length !== 3) {
            ee(t, 0, 0, 0, 1);
            return;
          }
          return _c(u, t), jr(e, t), t;
        default:
          return;
      }
    }
    ee(t, 0, 0, 0, 1);
  }
}
function _c(e, t) {
  var r = (parseFloat(e[0]) % 360 + 360) % 360 / 360, i = pn(e[1]), n = pn(e[2]), a = n <= 0.5 ? n * (i + 1) : n + i - n * i, o = n * 2 - a;
  return t = t || [], ee(t, vn(Qo(o, a, r + 1 / 3) * 255), vn(Qo(o, a, r) * 255), vn(Qo(o, a, r - 1 / 3) * 255), 1), e.length === 4 && (t[3] = e[3]), t;
}
function wc(e, t) {
  var r = bi(e);
  if (r) {
    for (var i = 0; i < 3; i++)
      r[i] = r[i] * (1 - t) | 0, r[i] > 255 ? r[i] = 255 : r[i] < 0 && (r[i] = 0);
    return Id(r, r.length === 4 ? "rgba" : "rgb");
  }
}
function Id(e, t) {
  if (!(!e || !e.length)) {
    var r = e[0] + "," + e[1] + "," + e[2];
    return (t === "rgba" || t === "hsva" || t === "hsla") && (r += "," + e[3]), t + "(" + r + ")";
  }
}
function Ka(e, t) {
  var r = bi(e);
  return r ? (0.299 * r[0] + 0.587 * r[1] + 0.114 * r[2]) * r[3] / 255 + (1 - r[3]) * t : 0;
}
var bc = new Gn(100);
function Sc(e) {
  if (W(e)) {
    var t = bc.get(e);
    return t || (t = wc(e, -0.1), bc.put(e, t)), t;
  } else if (bo(e)) {
    var r = E({}, e);
    return r.colorStops = $(e.colorStops, function(i) {
      return {
        offset: i.offset,
        color: wc(i.color, -0.1)
      };
    }), r;
  }
  return e;
}
function xb(e) {
  return e.type === "linear";
}
function Tb(e) {
  return e.type === "radial";
}
(function() {
  return V.hasGlobalWindow && rt(window.btoa) ? function(e) {
    return window.btoa(unescape(encodeURIComponent(e)));
  } : typeof Buffer < "u" ? function(e) {
    return Buffer.from(e).toString("base64");
  } : function(e) {
    return null;
  };
})();
var ol = Array.prototype.slice;
function ze(e, t, r) {
  return (t - e) * r + e;
}
function Ko(e, t, r, i) {
  for (var n = t.length, a = 0; a < n; a++)
    e[a] = ze(t[a], r[a], i);
  return e;
}
function Cb(e, t, r, i) {
  for (var n = t.length, a = n && t[0].length, o = 0; o < n; o++) {
    e[o] || (e[o] = []);
    for (var s = 0; s < a; s++)
      e[o][s] = ze(t[o][s], r[o][s], i);
  }
  return e;
}
function ra(e, t, r, i) {
  for (var n = t.length, a = 0; a < n; a++)
    e[a] = t[a] + r[a] * i;
  return e;
}
function xc(e, t, r, i) {
  for (var n = t.length, a = n && t[0].length, o = 0; o < n; o++) {
    e[o] || (e[o] = []);
    for (var s = 0; s < a; s++)
      e[o][s] = t[o][s] + r[o][s] * i;
  }
  return e;
}
function Ab(e, t) {
  for (var r = e.length, i = t.length, n = r > i ? t : e, a = Math.min(r, i), o = n[a - 1] || { color: [0, 0, 0, 0], offset: 0 }, s = a; s < Math.max(r, i); s++)
    n.push({
      offset: o.offset,
      color: o.color.slice()
    });
}
function Mb(e, t, r) {
  var i = e, n = t;
  if (!(!i.push || !n.push)) {
    var a = i.length, o = n.length;
    if (a !== o) {
      var s = a > o;
      if (s)
        i.length = o;
      else
        for (var l = a; l < o; l++)
          i.push(r === 1 ? n[l] : ol.call(n[l]));
    }
    for (var u = i[0] && i[0].length, l = 0; l < i.length; l++)
      if (r === 1)
        isNaN(i[l]) && (i[l] = n[l]);
      else
        for (var c = 0; c < u; c++)
          isNaN(i[l][c]) && (i[l][c] = n[l][c]);
  }
}
function Pa(e) {
  if (Ht(e)) {
    var t = e.length;
    if (Ht(e[0])) {
      for (var r = [], i = 0; i < t; i++)
        r.push(ol.call(e[i]));
      return r;
    }
    return ol.call(e);
  }
  return e;
}
function La(e) {
  return e[0] = Math.floor(e[0]) || 0, e[1] = Math.floor(e[1]) || 0, e[2] = Math.floor(e[2]) || 0, e[3] = e[3] == null ? 1 : e[3], "rgba(" + e.join(",") + ")";
}
function Db(e) {
  return Ht(e && e[0]) ? 2 : 1;
}
var ia = 0, Ia = 1, Ed = 2, an = 3, sl = 4, ll = 5, Tc = 6;
function Cc(e) {
  return e === sl || e === ll;
}
function na(e) {
  return e === Ia || e === Ed;
}
var Wi = [0, 0, 0, 0], kb = (function() {
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
    var n = this.keyframes, a = n.length, o = !1, s = Tc, l = r;
    if (Ht(r)) {
      var u = Db(r);
      s = u, (u === 1 && !yt(r[0]) || u === 2 && !yt(r[0][0])) && (o = !0);
    } else if (yt(r) && !I1(r))
      s = ia;
    else if (W(r))
      if (!isNaN(+r))
        s = ia;
      else {
        var c = bi(r);
        c && (l = c, s = an);
      }
    else if (bo(r)) {
      var h = E({}, l);
      h.colorStops = $(r.colorStops, function(f) {
        return {
          offset: f.offset,
          color: bi(f.color)
        };
      }), xb(r) ? s = sl : Tb(r) && (s = ll), l = h;
    }
    a === 0 ? this.valType = s : (s !== this.valType || s === Tc) && (o = !0), this.discrete = this.discrete || o;
    var d = {
      time: t,
      value: l,
      rawValue: r,
      percent: 0
    };
    return i && (d.easing = i, d.easingFunc = rt(i) ? i : dn[i] || kd(i)), n.push(d), d;
  }, e.prototype.prepare = function(t, r) {
    var i = this.keyframes;
    this._needsSort && i.sort(function(g, p) {
      return g.time - p.time;
    });
    for (var n = this.valType, a = i.length, o = i[a - 1], s = this.discrete, l = na(n), u = Cc(n), c = 0; c < a; c++) {
      var h = i[c], d = h.value, f = o.value;
      h.percent = h.time / t, s || (l && c !== a - 1 ? Mb(d, f, n) : u && Ab(d.colorStops, f.colorStops));
    }
    if (!s && n !== ll && r && this.needsAnimate() && r.needsAnimate() && n === r.valType && !r._finished) {
      this._additiveTrack = r;
      for (var v = i[0].value, c = 0; c < a; c++)
        n === ia ? i[c].additiveValue = i[c].value - v : n === an ? i[c].additiveValue = ra([], i[c].value, v, -1) : na(n) && (i[c].additiveValue = n === Ia ? ra([], i[c].value, v, -1) : xc([], i[c].value, v, -1));
    }
  }, e.prototype.step = function(t, r) {
    if (!this._finished) {
      this._additiveTrack && this._additiveTrack._finished && (this._additiveTrack = null);
      var i = this._additiveTrack != null, n = i ? "additiveValue" : "value", a = this.valType, o = this.keyframes, s = o.length, l = this.propName, u = a === an, c, h = this._lastFr, d = Math.min, f, v;
      if (s === 1)
        f = v = o[0];
      else {
        if (r < 0)
          c = 0;
        else if (r < this._lastFrP) {
          var g = d(h + 1, s - 1);
          for (c = g; c >= 0 && !(o[c].percent <= r); c--)
            ;
          c = d(c, s - 2);
        } else {
          for (c = h; c < s && !(o[c].percent > r); c++)
            ;
          c = d(c - 1, s - 2);
        }
        v = o[c + 1], f = o[c];
      }
      if (f && v) {
        this._lastFr = c, this._lastFrP = r;
        var p = v.percent - f.percent, m = p === 0 ? 1 : d((r - f.percent) / p, 1);
        v.easingFunc && (m = v.easingFunc(m));
        var y = i ? this._additiveValue : u ? Wi : t[l];
        if ((na(a) || u) && !y && (y = this._additiveValue = []), this.discrete)
          t[l] = m < 1 ? f.rawValue : v.rawValue;
        else if (na(a))
          a === Ia ? Ko(y, f[n], v[n], m) : Cb(y, f[n], v[n], m);
        else if (Cc(a)) {
          var _ = f[n], w = v[n], S = a === sl;
          t[l] = {
            type: S ? "linear" : "radial",
            x: ze(_.x, w.x, m),
            y: ze(_.y, w.y, m),
            colorStops: $(_.colorStops, function(x, T) {
              var C = w.colorStops[T];
              return {
                offset: ze(x.offset, C.offset, m),
                color: La(Ko([], x.color, C.color, m))
              };
            }),
            global: w.global
          }, S ? (t[l].x2 = ze(_.x2, w.x2, m), t[l].y2 = ze(_.y2, w.y2, m)) : t[l].r = ze(_.r, w.r, m);
        } else if (u)
          Ko(y, f[n], v[n], m), i || (t[l] = La(y));
        else {
          var b = ze(f[n], v[n], m);
          i ? this._additiveValue = b : t[l] = b;
        }
        i && this._addToTarget(t);
      }
    }
  }, e.prototype._addToTarget = function(t) {
    var r = this.valType, i = this.propName, n = this._additiveValue;
    r === ia ? t[i] = t[i] + n : r === an ? (bi(t[i], Wi), ra(Wi, Wi, n, 1), t[i] = La(Wi)) : r === Ia ? ra(t[i], t[i], n, 1) : r === Ed && xc(t[i], t[i], n, 1);
  }, e;
})(), nu = (function() {
  function e(t, r, i, n) {
    if (this._tracks = {}, this._trackKeys = [], this._maxTime = 0, this._started = 0, this._clip = null, this._target = t, this._loop = r, r && n) {
      $l("Can' use additive animation on looped animation.");
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
        l = a[s] = new kb(s);
        var u = void 0, c = this._getAdditiveTrack(s);
        if (c) {
          var h = c.keyframes, d = h[h.length - 1];
          u = d && d.value, c.valType === an && u && (u = La(u));
        } else
          u = this._target[s];
        if (u == null)
          continue;
        t > 0 && l.addKeyframe(0, Pa(u), n), this._trackKeys.push(s);
      }
      l.addKeyframe(t, Pa(r[s]), n);
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
        var d = new bb({
          life: n,
          loop: this._loop,
          delay: this._delay || 0,
          onframe: function(f) {
            r._started = 2;
            var v = r._additiveAnimators;
            if (v) {
              for (var g = !1, p = 0; p < v.length; p++)
                if (v[p]._clip) {
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
        this._clip = d, this.animation && this.animation.addClip(d), t && d.setEasing(t);
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
    return $(this._trackKeys, function(r) {
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
          l && (t[a] = Pa(l.rawValue));
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
var Pb = (function(e) {
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
      r._running && (Xa(i), !r._paused && r.update());
    }
    Xa(i);
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
    var n = new nu(r, i.loop);
    return this.addAnimator(n), n;
  }, t;
})(Ee), Lb = 300, Jo = V.domSupported, jo = (function() {
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
  }, i = $(e, function(n) {
    var a = n.replace("mouse", "pointer");
    return r.hasOwnProperty(a) ? a : n;
  });
  return {
    mouse: e,
    touch: t,
    pointer: i
  };
})(), Ac = {
  mouse: ["mousemove", "mouseup"],
  pointer: ["pointermove", "pointerup"]
}, Mc = !1;
function ul(e) {
  var t = e.pointerType;
  return t === "pen" || t === "touch";
}
function Ib(e) {
  e.touching = !0, e.touchTimer != null && (clearTimeout(e.touchTimer), e.touchTimer = null), e.touchTimer = setTimeout(function() {
    e.touching = !1, e.touchTimer = null;
  }, 700);
}
function $o(e) {
  e && (e.zrByTouch = !0);
}
function Eb(e, t) {
  return re(e.dom, new Rb(e, t), !0);
}
function Rd(e, t) {
  for (var r = t, i = !1; r && r.nodeType !== 9 && !(i = r.domBelongToZr || r !== t && r === e.painterRoot); )
    r = r.parentNode;
  return i;
}
var Rb = /* @__PURE__ */ (function() {
  function e(t, r) {
    this.stopPropagation = Wt, this.stopImmediatePropagation = Wt, this.preventDefault = Wt, this.type = r.type, this.target = this.currentTarget = t.dom, this.pointerType = r.pointerType, this.clientX = r.clientX, this.clientY = r.clientY;
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
    Rd(this, t) || (this.__pointerCapturing && (e.zrEventControl = "no_globalout"), this.trigger("mouseout", e));
  },
  wheel: function(e) {
    Mc = !0, e = re(this.dom, e), this.trigger("mousewheel", e);
  },
  mousewheel: function(e) {
    Mc || (e = re(this.dom, e), this.trigger("mousewheel", e));
  },
  touchstart: function(e) {
    e = re(this.dom, e), $o(e), this.__lastTouchMoment = /* @__PURE__ */ new Date(), this.handler.processGesture(e, "start"), ce.mousemove.call(this, e), ce.mousedown.call(this, e);
  },
  touchmove: function(e) {
    e = re(this.dom, e), $o(e), this.handler.processGesture(e, "change"), ce.mousemove.call(this, e);
  },
  touchend: function(e) {
    e = re(this.dom, e), $o(e), this.handler.processGesture(e, "end"), ce.mouseup.call(this, e), +/* @__PURE__ */ new Date() - +this.__lastTouchMoment < Lb && ce.click.call(this, e);
  },
  pointerdown: function(e) {
    ce.mousedown.call(this, e);
  },
  pointermove: function(e) {
    ul(e) || ce.mousemove.call(this, e);
  },
  pointerup: function(e) {
    ce.mouseup.call(this, e);
  },
  pointerout: function(e) {
    ul(e) || ce.mouseout.call(this, e);
  }
};
A(["click", "dblclick", "contextmenu"], function(e) {
  ce[e] = function(t) {
    t = re(this.dom, t), this.trigger(e, t);
  };
});
var cl = {
  pointermove: function(e) {
    ul(e) || cl.mousemove.call(this, e);
  },
  pointerup: function(e) {
    cl.mouseup.call(this, e);
  },
  mousemove: function(e) {
    this.trigger("mousemove", e);
  },
  mouseup: function(e) {
    var t = this.__pointerCapturing;
    this.__togglePointerCapture(!1), this.trigger("mouseup", e), t && (e.zrEventControl = "only_globalout", this.trigger("mouseout", e));
  }
};
function Bb(e, t) {
  var r = t.domHandlers;
  V.pointerEventsSupported ? A(jo.pointer, function(i) {
    Ea(t, i, function(n) {
      r[i].call(e, n);
    });
  }) : (V.touchEventsSupported && A(jo.touch, function(i) {
    Ea(t, i, function(n) {
      r[i].call(e, n), Ib(t);
    });
  }), A(jo.mouse, function(i) {
    Ea(t, i, function(n) {
      n = eu(n), t.touching || r[i].call(e, n);
    });
  }));
}
function Ob(e, t) {
  V.pointerEventsSupported ? A(Ac.pointer, r) : V.touchEventsSupported || A(Ac.mouse, r);
  function r(i) {
    function n(a) {
      a = eu(a), Rd(e, a.target) || (a = Eb(e, a), t.domHandlers[i].call(e, a));
    }
    Ea(t, i, n, { capture: !0 });
  }
}
function Ea(e, t, r, i) {
  e.mounted[t] = r, e.listenerOpts[t] = i, tb(e.domTarget, t, r, i);
}
function ts(e) {
  var t = e.mounted;
  for (var r in t)
    t.hasOwnProperty(r) && eb(e.domTarget, r, t[r], e.listenerOpts[r]);
  e.mounted = {};
}
var Dc = /* @__PURE__ */ (function() {
  function e(t, r) {
    this.mounted = {}, this.listenerOpts = {}, this.touching = !1, this.domTarget = t, this.domHandlers = r;
  }
  return e;
})(), Nb = (function(e) {
  G(t, e);
  function t(r, i) {
    var n = e.call(this) || this;
    return n.__pointerCapturing = !1, n.dom = r, n.painterRoot = i, n._localHandlerScope = new Dc(r, ce), Jo && (n._globalHandlerScope = new Dc(document, cl)), Bb(n, n._localHandlerScope), n;
  }
  return t.prototype.dispose = function() {
    ts(this._localHandlerScope), Jo && ts(this._globalHandlerScope);
  }, t.prototype.setCursor = function(r) {
    this.dom.style && (this.dom.style.cursor = r || "default");
  }, t.prototype.__togglePointerCapture = function(r) {
    if (this.__mayPointerCapture = null, Jo && +this.__pointerCapturing ^ +r) {
      this.__pointerCapturing = r;
      var i = this._globalHandlerScope;
      r ? Ob(this, i) : ts(i);
    }
  }, t;
})(Ee), Bd = 1;
V.hasGlobalWindow && (Bd = Math.max(window.devicePixelRatio || window.screen && window.screen.deviceXDPI / window.screen.logicalXDPI || 1, 1));
var Ja = Bd, hl = 0.4, fl = "#333", dl = "#ccc", Fb = "#eee", kc = ru, Pc = 5e-5;
function wr(e) {
  return e > Pc || e < -Pc;
}
var br = [], $r = [], es = yi(), rs = Math.abs, au = (function() {
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
      i && (kc(i), this.invTransform = null);
      return;
    }
    i = i || yi(), r ? this.getLocalTransform(i) : kc(i), t && (r ? _i(i, t, i) : nb(i, t)), this.transform = i, this._resolveGlobalScaleRatio(i);
  }, e.prototype._resolveGlobalScaleRatio = function(t) {
    var r = this.globalScaleRatio;
    if (r != null && r !== 1) {
      this.getGlobalScale(br);
      var i = br[0] < 0 ? -1 : 1, n = br[1] < 0 ? -1 : 1, a = ((br[0] - i) * r + i) / br[0] || 0, o = ((br[1] - n) * r + n) / br[1] || 0;
      t[0] *= a, t[1] *= a, t[2] *= o, t[3] *= o;
    }
    this.invTransform = this.invTransform || yi(), _d(this.invTransform, t);
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
      t && t.transform && (t.invTransform = t.invTransform || yi(), _i($r, t.invTransform, r), r = $r);
      var i = this.originX, n = this.originY;
      (i || n) && (es[4] = i, es[5] = n, _i($r, r, es), $r[4] -= i, $r[5] -= n, r = $r), this.setLocalTransform(r);
    }
  }, e.prototype.getGlobalScale = function(t) {
    var r = this.transform;
    return t = t || [], r ? (t[0] = Math.sqrt(r[0] * r[0] + r[1] * r[1]), t[1] = Math.sqrt(r[2] * r[2] + r[3] * r[3]), r[0] < 0 && (t[0] = -t[0]), r[3] < 0 && (t[1] = -t[1]), t) : (t[0] = 1, t[1] = 1, t);
  }, e.prototype.transformCoordToLocal = function(t, r) {
    var i = [t, r], n = this.invTransform;
    return n && Pe(i, i, n), i;
  }, e.prototype.transformCoordToGlobal = function(t, r) {
    var i = [t, r], n = this.transform;
    return n && Pe(i, i, n), i;
  }, e.prototype.getLineScale = function() {
    var t = this.transform;
    return t && rs(t[0] - 1) > 1e-10 && rs(t[3] - 1) > 1e-10 ? Math.sqrt(rs(t[0] * t[3] - t[2] * t[1])) : 1;
  }, e.prototype.copyTransform = function(t) {
    zb(this, t);
  }, e.getLocalTransform = function(t, r) {
    r = r || [];
    var i = t.originX || 0, n = t.originY || 0, a = t.scaleX, o = t.scaleY, s = t.anchorX, l = t.anchorY, u = t.rotation || 0, c = t.x, h = t.y, d = t.skewX ? Math.tan(t.skewX) : 0, f = t.skewY ? Math.tan(-t.skewY) : 0;
    if (i || n || s || l) {
      var v = i + s, g = n + l;
      r[4] = -v * a - d * g * o, r[5] = -g * o - f * v * a;
    } else
      r[4] = r[5] = 0;
    return r[0] = a, r[3] = o, r[1] = f * a, r[2] = d * o, u && iu(r, r, u), r[4] += i + c, r[5] += n + h, r;
  }, e.initDefaultProps = (function() {
    var t = e.prototype;
    t.scaleX = t.scaleY = t.globalScaleRatio = 1, t.x = t.y = t.originX = t.originY = t.skewX = t.skewY = t.rotation = t.anchorX = t.anchorY = 0;
  })(), e;
})(), kn = [
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
function zb(e, t) {
  for (var r = 0; r < kn.length; r++) {
    var i = kn[r];
    e[i] = t[i];
  }
}
var Lc = {};
function Kt(e, t) {
  t = t || Xr;
  var r = Lc[t];
  r || (r = Lc[t] = new Gn(500));
  var i = r.get(e);
  return i == null && (i = Pi.measureText(e, t).width, r.put(e, i)), i;
}
function Ic(e, t, r, i) {
  var n = Kt(e, t), a = ou(t), o = on(0, n, r), s = fi(0, a, i), l = new it(o, s, n, a);
  return l;
}
function Od(e, t, r, i) {
  var n = ((e || "") + "").split(`
`), a = n.length;
  if (a === 1)
    return Ic(n[0], t, r, i);
  for (var o = new it(0, 0, 0, 0), s = 0; s < n.length; s++) {
    var l = Ic(n[s], t, r, i);
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
function ou(e) {
  return Kt("国", e);
}
function Di(e, t) {
  return typeof e == "string" ? e.lastIndexOf("%") >= 0 ? parseFloat(e) / 100 * t : parseFloat(e) : e;
}
function Nd(e, t, r) {
  var i = t.position || "inside", n = t.distance != null ? t.distance : 5, a = r.height, o = r.width, s = a / 2, l = r.x, u = r.y, c = "left", h = "top";
  if (i instanceof Array)
    l += Di(i[0], r.width), u += Di(i[1], r.height), c = null, h = null;
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
var is = "__zr_normal__", ns = kn.concat(["ignore"]), Ub = fr(kn, function(e, t) {
  return e[t] = !0, e;
}, { ignore: !1 }), ti = {}, Vb = new it(0, 0, 0, 0), xo = (function() {
  function e(t) {
    this.id = fd(), this.animators = [], this.currentStates = [], this.states = {}, this._init(t);
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
        var c = Vb;
        i.layoutRect ? c.copy(i.layoutRect) : c.copy(this.getBoundingRect()), n || c.applyTransform(this.transform), this.calculateTextPosition ? this.calculateTextPosition(ti, i, c) : Nd(ti, i, c), a.x = ti.x, a.y = ti.y, o = ti.align, s = ti.verticalAlign;
        var h = i.origin;
        if (h && i.rotation != null) {
          var d = void 0, f = void 0;
          h === "center" ? (d = c.width * 0.5, f = c.height * 0.5) : (d = Di(h[0], c.width), f = Di(h[1], c.height)), u = !0, a.originX = -a.x + d + (n ? 0 : c.x), a.originY = -a.y + f + (n ? 0 : c.y);
        }
      }
      i.rotation != null && (a.rotation = i.rotation);
      var v = i.offset;
      v && (a.x += v[0], a.y += v[1], u || (a.originX = -v[0], a.originY = -v[1]));
      var g = i.inside == null ? typeof i.position == "string" && i.position.indexOf("inside") >= 0 : i.inside, p = this._innerTextDefaultStyle || (this._innerTextDefaultStyle = {}), m = void 0, y = void 0, _ = void 0;
      g && this.canBeInsideText() ? (m = i.insideFill, y = i.insideStroke, (m == null || m === "auto") && (m = this.getInsideTextFill()), (y == null || y === "auto") && (y = this.getInsideTextStroke(m), _ = !0)) : (m = i.outsideFill, y = i.outsideStroke, (m == null || m === "auto") && (m = this.getOutsideFill()), (y == null || y === "auto") && (y = this.getOutsideStroke(m), _ = !0)), m = m || "#000", (m !== p.fill || y !== p.stroke || _ !== p.autoStroke || o !== p.align || s !== p.verticalAlign) && (l = !0, p.fill = m, p.stroke = y, p.autoStroke = _, p.align = o, p.verticalAlign = s, r.setDefaultTextStyle(p)), r.__dirty |= Zt, l && r.dirtyStyle(!0);
    }
  }, e.prototype.canBeInsideText = function() {
    return !0;
  }, e.prototype.getInsideTextFill = function() {
    return "#fff";
  }, e.prototype.getInsideTextStroke = function(t) {
    return "#000";
  }, e.prototype.getOutsideFill = function() {
    return this.__zr && this.__zr.isDarkMode() ? dl : fl;
  }, e.prototype.getOutsideStroke = function(t) {
    var r = this.__zr && this.__zr.getBackgroundColor(), i = typeof r == "string" && bi(r);
    i || (i = [255, 255, 255, 1]);
    for (var n = i[3], a = this.__zr.isDarkMode(), o = 0; o < 3; o++)
      i[o] = i[o] * n + (a ? 0 : 255) * (1 - n);
    return i[3] = 1, Id(i, "rgba");
  }, e.prototype.traverse = function(t, r) {
  }, e.prototype.attrKV = function(t, r) {
    t === "textConfig" ? this.setTextConfig(r) : t === "textContent" ? this.setTextContent(r) : t === "clipPath" ? this.setClipPath(r) : t === "extra" ? (this.extra = this.extra || {}, E(this.extra, r)) : this[t] = r;
  }, e.prototype.hide = function() {
    this.ignore = !0, this.markRedraw();
  }, e.prototype.show = function() {
    this.ignore = !1, this.markRedraw();
  }, e.prototype.attr = function(t, r) {
    if (typeof t == "string")
      this.attrKV(t, r);
    else if (z(t))
      for (var i = t, n = pt(i), a = 0; a < n.length; a++) {
        var o = n[a];
        this.attrKV(o, t[o]);
      }
    return this.markRedraw(), this;
  }, e.prototype.saveCurrentToNormalState = function(t) {
    this._innerSaveToNormal(t);
    for (var r = this._normalState, i = 0; i < this.animators.length; i++) {
      var n = this.animators[i], a = n.__fromStateTransition;
      if (!(n.getLoop() || a && a !== is)) {
        var o = n.targetName, s = o ? r[o] : r;
        n.saveTo(s);
      }
    }
  }, e.prototype._innerSaveToNormal = function(t) {
    var r = this._normalState;
    r || (r = this._normalState = {}), t.textConfig && !r.textConfig && (r.textConfig = this.textConfig), this._savePrimaryToNormal(t, r, ns);
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
    this.useState(is, !1, t);
  }, e.prototype.useState = function(t, r, i, n) {
    var a = t === is, o = this.hasState();
    if (!(!o && a)) {
      var s = this.currentStates, l = this.stateTransition;
      if (!(st(s, t) >= 0 && (r || s.length === 1))) {
        var u;
        if (this.stateProxy && !a && (u = this.stateProxy(t)), u || (u = this.states && this.states[t]), !u && !a) {
          $l("State " + t + " not exists.");
          return;
        }
        a || this.saveCurrentToNormalState(u);
        var c = !!(u && u.hoverLayer || n);
        c && this._toggleHoverLayerFlag(!0), this._applyStateObj(t, u, this._normalState, r, !i && !this.__inHover && l && l.duration > 0, l);
        var h = this._textContent, d = this._textGuide;
        return h && h.useState(t, r, i, c), d && d.useState(t, r, i, c), a ? (this.currentStates = [], this._normalState = {}) : r ? this.currentStates.push(t) : this.currentStates = [t], this._updateAnimationTargets(), this.markRedraw(), !c && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~Zt), u;
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
      var h = n[o - 1], d = !!(h && h.hoverLayer || i);
      d && this._toggleHoverLayerFlag(!0);
      var f = this._mergeStates(n), v = this.stateTransition;
      this.saveCurrentToNormalState(f), this._applyStateObj(t.join(","), f, this._normalState, !1, !r && !this.__inHover && v && v.duration > 0, v);
      var g = this._textContent, p = this._textGuide;
      g && g.useStates(t, r, d), p && p.useStates(t, r, d), this._updateAnimationTargets(), this.currentStates = t.slice(), this.markRedraw(), !d && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~Zt);
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
      E(r, a), a.textConfig && (i = i || {}, E(i, a.textConfig));
    }
    return i && (r.textConfig = i), r;
  }, e.prototype._applyStateObj = function(t, r, i, n, a, o) {
    var s = !(r && n);
    r && r.textConfig ? (this.textConfig = E({}, n ? this.textConfig : i.textConfig), E(this.textConfig, r.textConfig)) : s && i.textConfig && (this.textConfig = i.textConfig);
    for (var l = {}, u = !1, c = 0; c < ns.length; c++) {
      var h = ns[c], d = a && Ub[h];
      r && r[h] != null ? d ? (u = !0, l[h] = r[h]) : this[h] = r[h] : s && i[h] != null && (d ? (u = !0, l[h] = i[h]) : this[h] = i[h]);
    }
    if (!a)
      for (var c = 0; c < this.animators.length; c++) {
        var f = this.animators[c], v = f.targetName;
        f.getLoop() || f.__changeFinalValue(v ? (r || i)[v] : r || i);
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
    r !== t && (r && r !== t && this.removeTextContent(), t.innerTransformable = new au(), this._attachComponent(t), this._textContent = t, this.markRedraw());
  }, e.prototype.setTextConfig = function(t) {
    this.textConfig || (this.textConfig = {}), E(this.textConfig, t), this.markRedraw();
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
    this.__dirty |= Zt;
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
    var n = t ? this[t] : this, a = new nu(n, r, i);
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
    as(this, t, r, i);
  }, e.prototype.animateFrom = function(t, r, i) {
    as(this, t, r, i, !0);
  }, e.prototype._transitionState = function(t, r, i, n) {
    for (var a = as(this, r, i, n), o = 0; o < a.length; o++)
      a[o].__fromStateTransition = t;
  }, e.prototype.getBoundingRect = function() {
    return null;
  }, e.prototype.getPaintRect = function() {
    return null;
  }, e.initDefaultProps = (function() {
    var t = e.prototype;
    t.type = "element", t.name = "", t.ignore = t.silent = t.isGroup = t.draggable = t.dragging = t.ignoreClip = t.__inHover = !1, t.__dirty = Zt;
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
Xe(xo, Ee);
Xe(xo, au);
function as(e, t, r, i, n) {
  r = r || {};
  var a = [];
  Fd(e, "", e, t, r, i, a, n);
  var o = a.length, s = !1, l = r.done, u = r.aborted, c = function() {
    s = !0, o--, o <= 0 && (s ? l && l() : u && u());
  }, h = function() {
    o--, o <= 0 && (s ? l && l() : u && u());
  };
  o || l && l(), a.length > 0 && r.during && a[0].during(function(v, g) {
    r.during(g);
  });
  for (var d = 0; d < a.length; d++) {
    var f = a[d];
    c && f.done(c), h && f.aborted(h), r.force && f.duration(r.duration), f.start(r.easing);
  }
  return a;
}
function os(e, t, r) {
  for (var i = 0; i < r; i++)
    e[i] = t[i];
}
function Wb(e) {
  return Ht(e[0]);
}
function Hb(e, t, r) {
  if (Ht(t[r]))
    if (Ht(e[r]) || (e[r] = []), Gt(t[r])) {
      var i = t[r].length;
      e[r].length !== i && (e[r] = new t[r].constructor(i), os(e[r], t[r], i));
    } else {
      var n = t[r], a = e[r], o = n.length;
      if (Wb(n))
        for (var s = n[0].length, l = 0; l < o; l++)
          a[l] ? os(a[l], n[l], s) : a[l] = Array.prototype.slice.call(n[l]);
      else
        os(a, n, o);
      a.length = n.length;
    }
  else
    e[r] = t[r];
}
function Gb(e, t) {
  return e === t || Ht(e) && Ht(t) && Yb(e, t);
}
function Yb(e, t) {
  var r = e.length;
  if (r !== t.length)
    return !1;
  for (var i = 0; i < r; i++)
    if (e[i] !== t[i])
      return !1;
  return !0;
}
function Fd(e, t, r, i, n, a, o, s) {
  for (var l = pt(i), u = n.duration, c = n.delay, h = n.additive, d = n.setToFinal, f = !z(a), v = e.animators, g = [], p = 0; p < l.length; p++) {
    var m = l[p], y = i[m];
    if (y != null && r[m] != null && (f || a[m]))
      if (z(y) && !Ht(y) && !bo(y)) {
        if (t) {
          s || (r[m] = y, e.updateDuringAnimation(t));
          continue;
        }
        Fd(e, m, r[m], y, n, a && a[m], o, s);
      } else
        g.push(m);
    else s || (r[m] = y, e.updateDuringAnimation(t), g.push(m));
  }
  var _ = g.length;
  if (!h && _)
    for (var w = 0; w < v.length; w++) {
      var S = v[w];
      if (S.targetName === t) {
        var b = S.stopTracks(g);
        if (b) {
          var x = st(v, S);
          v.splice(x, 1);
        }
      }
    }
  if (n.force || (g = fe(g, function(D) {
    return !Gb(i[D], r[D]);
  }), _ = g.length), _ > 0 || n.force && !o.length) {
    var T = void 0, C = void 0, M = void 0;
    if (s) {
      C = {}, d && (T = {});
      for (var w = 0; w < _; w++) {
        var m = g[w];
        C[m] = r[m], d ? T[m] = i[m] : r[m] = i[m];
      }
    } else if (d) {
      M = {};
      for (var w = 0; w < _; w++) {
        var m = g[w];
        M[m] = Pa(r[m]), Hb(r, i, m);
      }
    }
    var S = new nu(r, !1, !1, h ? fe(v, function(P) {
      return P.targetName === t;
    }) : null);
    S.targetName = t, n.scope && (S.scope = n.scope), d && T && S.whenWithKeys(0, T, g), M && S.whenWithKeys(0, M, g), S.whenWithKeys(u ?? 500, s ? C : i, g).delay(c || 0), e.addAnimator(S, t), o.push(S);
  }
}
var He = (function(e) {
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
He.prototype.type = "group";
var Ra = {}, zd = {};
function Xb(e) {
  delete zd[e];
}
function qb(e) {
  if (!e)
    return !1;
  if (typeof e == "string")
    return Ka(e, 1) < hl;
  if (e.colorStops) {
    for (var t = e.colorStops, r = 0, i = t.length, n = 0; n < i; n++)
      r += Ka(t[n].color, 1);
    return r /= i, r < hl;
  }
  return !1;
}
var Zb = (function() {
  function e(t, r, i) {
    var n = this;
    this._sleepAfterStill = 10, this._stillFrameAccum = 0, this._needsRefresh = !0, this._needsRefreshHover = !0, this._darkMode = !1, i = i || {}, this.dom = r, this.id = t;
    var a = new vb(), o = i.renderer || "canvas";
    Ra[o] || (o = pt(Ra)[0]), i.useDirtyRect = i.useDirtyRect == null ? !1 : i.useDirtyRect;
    var s = new Ra[o](r, a, i, t), l = i.ssr || s.ssrOnly;
    this.storage = a, this.painter = s;
    var u = !V.node && !V.worker && !l ? new Nb(s.getViewportRoot(), s.root) : null, c = i.useCoarsePointer, h = c == null || c === "auto" ? V.touchEventsSupported : !!c, d = 44, f;
    h && (f = K(i.pointerSize, d)), this.handler = new bd(a, s, u, s.root, f), this.animation = new Pb({
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
    this._disposed || (this.painter.setBackgroundColor && this.painter.setBackgroundColor(t), this.refresh(), this._backgroundColor = t, this._darkMode = qb(t));
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
        t[r] instanceof He && t[r].removeSelfFromZr(this);
      this.storage.delAllRoots(), this.painter.clear();
    }
  }, e.prototype.dispose = function() {
    this._disposed || (this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), this.handler.dispose(), this.animation = this.storage = this.painter = this.handler = null, this._disposed = !0, Xb(this.id));
  }, e;
})();
function Ec(e, t) {
  var r = new Zb(fd(), e, t);
  return zd[r.id] = r, r;
}
function Qb(e, t) {
  Ra[e] = t;
}
var Rc = 1e-4, Ud = 20;
function Kb(e) {
  return e.replace(/^\s+|\s+$/g, "");
}
function Jb(e, t, r, i) {
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
function _t(e, t) {
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
  return W(e) ? Kb(e).match(/%$/) ? parseFloat(e) / 100 * t : parseFloat(e) : e == null ? NaN : +e;
}
function jb(e, t, r) {
  return t == null && (t = 10), t = Math.min(Math.max(0, t), Ud), e = (+e).toFixed(t), r ? e : +e;
}
function Bc(e) {
  if (e = +e, isNaN(e))
    return 0;
  if (e > 1e-14) {
    for (var t = 1, r = 0; r < 15; r++, t *= 10)
      if (Math.round(e * t) / t === e)
        return r;
  }
  return $b(e);
}
function $b(e) {
  var t = e.toString().toLowerCase(), r = t.indexOf("e"), i = r > 0 ? +t.slice(r + 1) : 0, n = r > 0 ? r : t.length, a = t.indexOf("."), o = a < 0 ? 0 : n - 1 - a;
  return Math.max(0, o - i);
}
function tS(e, t) {
  var r = fr(e, function(f, v) {
    return f + (isNaN(v) ? 0 : v);
  }, 0);
  if (r === 0)
    return [];
  for (var i = Math.pow(10, t), n = $(e, function(f) {
    return (isNaN(f) ? 0 : f) / r * i * 100;
  }), a = i * 100, o = $(n, function(f) {
    return Math.floor(f);
  }), s = fr(o, function(f, v) {
    return f + v;
  }, 0), l = $(n, function(f, v) {
    return f - o[v];
  }); s < a; ) {
    for (var u = Number.NEGATIVE_INFINITY, c = null, h = 0, d = l.length; h < d; ++h)
      l[h] > u && (u = l[h], c = h);
    ++o[c], l[c] = 0, ++s;
  }
  return $(o, function(f) {
    return f / i;
  });
}
function eS(e, t) {
  var r = Math.max(Bc(e), Bc(t)), i = e + t;
  return r > Ud ? i : jb(i, r);
}
function Vd(e) {
  var t = Math.PI * 2;
  return (e % t + t) % t;
}
function ja(e) {
  return e > -Rc && e < Rc;
}
var rS = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d{1,2})(?::(\d{1,2})(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/;
function To(e) {
  if (e instanceof Date)
    return e;
  if (W(e)) {
    var t = rS.exec(e);
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
function $a(e) {
  var t = parseFloat(e);
  return t == e && (t !== 0 || !W(e) || e.indexOf("x") <= 0) ? t : NaN;
}
function iS(e) {
  return !isNaN($a(e));
}
function Wd() {
  return Math.round(Math.random() * 9);
}
function Hd(e, t) {
  return t === 0 ? e : Hd(t, e % t);
}
function Oc(e, t) {
  return e == null ? t : t == null ? e : e * t / Hd(e, t);
}
function Ut(e) {
  throw new Error(e);
}
var Gd = "series\0", nS = "\0_ec_\0";
function Rt(e) {
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
var Nc = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "rich", "tag", "color", "textBorderColor", "textBorderWidth", "width", "height", "lineHeight", "align", "verticalAlign", "baseline", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY", "backgroundColor", "borderColor", "borderWidth", "borderRadius", "padding"];
function Co(e) {
  return z(e) && !N(e) && !(e instanceof Date) ? e.value : e;
}
function aS(e) {
  return z(e) && !(e instanceof Array);
}
function oS(e, t, r) {
  var i = r === "normalMerge", n = r === "replaceMerge", a = r === "replaceAll";
  e = e || [], t = (t || []).slice();
  var o = tt();
  A(t, function(l, u) {
    if (!z(l)) {
      t[u] = null;
      return;
    }
  });
  var s = sS(e, o, r);
  return (i || n) && lS(s, e, o, t), i && uS(s, t), i || n ? cS(s, t, n) : a && hS(s, t), fS(s), s;
}
function sS(e, t, r) {
  var i = [];
  if (r === "replaceAll")
    return i;
  for (var n = 0; n < e.length; n++) {
    var a = e[n];
    a && a.id != null && t.set(a.id, n), i.push({
      existing: r === "replaceMerge" || Pn(a) ? null : a,
      newOption: null,
      keyInfo: null,
      brandNew: null
    });
  }
  return i;
}
function lS(e, t, r, i) {
  A(i, function(n, a) {
    if (!(!n || n.id == null)) {
      var o = gn(n.id), s = r.get(o);
      if (s != null) {
        var l = e[s];
        We(!l.newOption, 'Duplicated option on id "' + o + '".'), l.newOption = n, l.existing = t[s], i[a] = null;
      }
    }
  });
}
function uS(e, t) {
  A(t, function(r, i) {
    if (!(!r || r.name == null))
      for (var n = 0; n < e.length; n++) {
        var a = e[n].existing;
        if (!e[n].newOption && a && (a.id == null || r.id == null) && !Pn(r) && !Pn(a) && Yd("name", a, r)) {
          e[n].newOption = r, t[i] = null;
          return;
        }
      }
  });
}
function cS(e, t, r) {
  A(t, function(i) {
    if (i) {
      for (
        var n, a = 0;
        // Be `!resultItem` only when `nextIdx >= result.length`.
        (n = e[a]) && (n.newOption || Pn(n.existing) || // In mode "replaceMerge", here no not-mapped-non-internal-existing.
        n.existing && i.id != null && !Yd("id", i, n.existing));
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
function hS(e, t) {
  A(t, function(r) {
    e.push({
      newOption: r,
      brandNew: !0,
      existing: null,
      keyInfo: null
    });
  });
}
function fS(e) {
  var t = tt();
  A(e, function(r) {
    var i = r.existing;
    i && t.set(i.id, r);
  }), A(e, function(r) {
    var i = r.newOption;
    We(!i || i.id == null || !t.get(i.id) || t.get(i.id) === r, "id duplicates: " + (i && i.id)), i && i.id != null && t.set(i.id, r), !r.keyInfo && (r.keyInfo = {});
  }), A(e, function(r, i) {
    var n = r.existing, a = r.newOption, o = r.keyInfo;
    if (z(a)) {
      if (o.name = a.name != null ? gn(a.name) : n ? n.name : Gd + i, n)
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
function Yd(e, t, r) {
  var i = Le(t[e], null), n = Le(r[e], null);
  return i != null && n != null && i === n;
}
function gn(e) {
  return Le(e, "");
}
function Le(e, t) {
  return e == null ? t : W(e) ? e : yt(e) || Js(e) ? e + "" : t;
}
function Xd(e) {
  var t = e.name;
  return !!(t && t.indexOf(Gd));
}
function Pn(e) {
  return e && e.id != null && gn(e.id).indexOf(nS) === 0;
}
function dS(e, t, r) {
  A(e, function(i) {
    var n = i.newOption;
    z(n) && (i.keyInfo.mainType = t, i.keyInfo.subType = vS(t, n, i.existing, r));
  });
}
function vS(e, t, r, i) {
  var n = t.type ? t.type : r ? r.subType : i.determineSubType(e, t);
  return n;
}
function Yn(e, t) {
  if (t.dataIndexInside != null)
    return t.dataIndexInside;
  if (t.dataIndex != null)
    return N(t.dataIndex) ? $(t.dataIndex, function(r) {
      return e.indexOfRawIndex(r);
    }) : e.indexOfRawIndex(t.dataIndex);
  if (t.name != null)
    return N(t.name) ? $(t.name, function(r) {
      return e.indexOfName(r);
    }) : e.indexOfName(t.name);
}
function wt() {
  var e = "__ec_inner_" + pS++;
  return function(t) {
    return t[e] || (t[e] = {});
  };
}
var pS = Wd();
function ss(e, t, r) {
  var i = su(t, r), n = i.mainTypeSpecified, a = i.queryOptionMap, o = i.others, s = o, l = r ? r.defaultMainType : null;
  return !n && l && a.set(l, {}), a.each(function(u, c) {
    var h = Xn(e, c, u, {
      useDefault: l === c,
      enableAll: r && r.enableAll != null ? r.enableAll : !0,
      enableNone: r && r.enableNone != null ? r.enableNone : !0
    });
    s[c + "Models"] = h.models, s[c + "Model"] = h.models[0];
  }), s;
}
function su(e, t) {
  var r;
  if (W(e)) {
    var i = {};
    i[e + "Index"] = 0, r = i;
  } else
    r = e;
  var n = tt(), a = {}, o = !1;
  return A(r, function(s, l) {
    if (l === "dataIndex" || l === "dataIndexInside") {
      a[l] = s;
      return;
    }
    var u = l.match(/^(\w+)(Index|Id|Name)$/) || [], c = u[1], h = (u[2] || "").toLowerCase();
    if (!(!c || !h || t && t.includeMainTypes && st(t.includeMainTypes, c) < 0)) {
      o = o || !!c;
      var d = n.get(c) || n.set(c, {});
      d[h] = s;
    }
  }), {
    mainTypeSpecified: o,
    queryOptionMap: n,
    others: a
  };
}
var lu = {
  useDefault: !0,
  enableAll: !1,
  enableNone: !1
};
function Xn(e, t, r, i) {
  i = i || lu;
  var n = r.index, a = r.id, o = r.name, s = {
    models: null,
    specified: n != null || a != null || o != null
  };
  if (!s.specified) {
    var l = void 0;
    return s.models = i.useDefault && (l = e.getComponent(t)) ? [l] : [], s;
  }
  return n === "none" || n === !1 ? (We(i.enableNone, '`"none"` or `false` is not a valid value on index option.'), s.models = [], s) : (n === "all" && (We(i.enableAll, '`"all"` is not a valid value on index option.'), n = a = o = null), s.models = e.queryComponents({
    mainType: t,
    index: n,
    id: a,
    name: o
  }), s);
}
function qd(e, t, r) {
  e.setAttribute ? e.setAttribute(t, r) : e[t] = r;
}
function gS(e, t) {
  return e.getAttribute ? e.getAttribute(t) : e[t];
}
function mS(e) {
  return e === "auto" ? V.domSupported ? "html" : "richText" : e || "html";
}
var yS = ".", Sr = "___EC__COMPONENT__CONTAINER___", Zd = "___EC__EXTENDED_CLASS___";
function De(e) {
  var t = {
    main: "",
    sub: ""
  };
  if (e) {
    var r = e.split(yS);
    t.main = r[0] || "", t.sub = r[1] || "";
  }
  return t;
}
function _S(e) {
  We(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(e), 'componentType "' + e + '" illegal');
}
function wS(e) {
  return !!(e && e[Zd]);
}
function uu(e, t) {
  e.$constructor = e, e.extend = function(r) {
    var i = this, n;
    return bS(i) ? n = /** @class */
    (function(a) {
      G(o, a);
      function o() {
        return a.apply(this, arguments) || this;
      }
      return o;
    })(i) : (n = function() {
      (r.$constructor || i).apply(this, arguments);
    }, k1(n, this)), E(n.prototype, r), n[Zd] = !0, n.extend = this.extend, n.superCall = TS, n.superApply = CS, n.superClass = i, n;
  };
}
function bS(e) {
  return rt(e) && /^class\s/.test(Function.prototype.toString.call(e));
}
function Qd(e, t) {
  e.extend = t.extend;
}
var SS = Math.round(Math.random() * 10);
function xS(e) {
  var t = ["__\0is_clz", SS++].join("_");
  e.prototype[t] = !0, e.isInstance = function(r) {
    return !!(r && r[t]);
  };
}
function TS(e, t) {
  for (var r = [], i = 2; i < arguments.length; i++)
    r[i - 2] = arguments[i];
  return this.superClass.prototype[t].apply(e, r);
}
function CS(e, t, r) {
  return this.superClass.prototype[t].apply(e, r);
}
function cu(e) {
  var t = {};
  e.registerClass = function(i) {
    var n = i.type || i.prototype.type;
    if (n) {
      _S(n), i.prototype.type = n;
      var a = De(n);
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
    var n = De(i), a = [], o = t[n.main];
    return o && o[Sr] ? A(o, function(s, l) {
      l !== Sr && a.push(s);
    }) : a.push(o), a;
  }, e.hasClass = function(i) {
    var n = De(i);
    return !!t[n.main];
  }, e.getAllClassMainTypes = function() {
    var i = [];
    return A(t, function(n, a) {
      i.push(a);
    }), i;
  }, e.hasSubTypes = function(i) {
    var n = De(i), a = t[n.main];
    return a && a[Sr];
  };
  function r(i) {
    var n = t[i.main];
    return (!n || !n[Sr]) && (n = t[i.main] = {}, n[Sr] = !0), n;
  }
}
function Ln(e, t) {
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
var AS = [
  ["fill", "color"],
  ["shadowBlur"],
  ["shadowOffsetX"],
  ["shadowOffsetY"],
  ["opacity"],
  ["shadowColor"]
  // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
  // So do not transfer decal directly.
], MS = Ln(AS), DS = (
  /** @class */
  (function() {
    function e() {
    }
    return e.prototype.getAreaStyle = function(t, r) {
      return MS(this, t, r);
    }, e;
  })()
), pl = new Gn(50);
function kS(e) {
  if (typeof e == "string") {
    var t = pl.get(e);
    return t && t.image;
  } else
    return e;
}
function Kd(e, t, r, i, n) {
  if (e)
    if (typeof e == "string") {
      if (t && t.__zrImageSrc === e || !r)
        return t;
      var a = pl.get(e), o = { hostEl: r, cb: i, cbPayload: n };
      return a ? (t = a.image, !Ao(t) && a.pending.push(o)) : (t = Pi.loadImage(e, Fc, Fc), t.__zrImageSrc = e, pl.put(e, t.__cachedImgObj = {
        image: t,
        pending: [o]
      })), t;
    } else
      return e;
  else return t;
}
function Fc() {
  var e = this.__cachedImgObj;
  this.onload = this.onerror = this.__cachedImgObj = null;
  for (var t = 0; t < e.pending.length; t++) {
    var r = e.pending[t], i = r.cb;
    i && i(this, r.cbPayload), r.hostEl.dirty();
  }
  e.pending.length = 0;
}
function Ao(e) {
  return e && e.width && e.height;
}
var ls = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g;
function PS(e, t, r, i, n, a) {
  if (!r) {
    e.text = "", e.isTruncated = !1;
    return;
  }
  var o = (t + "").split(`
`);
  a = Jd(r, i, n, a);
  for (var s = !1, l = {}, u = 0, c = o.length; u < c; u++)
    jd(l, o[u], a), o[u] = l.textLine, s = s || l.isTruncated;
  e.text = o.join(`
`), e.isTruncated = s;
}
function Jd(e, t, r, i) {
  i = i || {};
  var n = E({}, i);
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
function jd(e, t, r) {
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
    var l = s === 0 ? LS(t, a, r.ascCharWidth, r.cnCharWidth) : o > 0 ? Math.floor(t.length * a / o) : 0;
    t = t.substr(0, l), o = Kt(t, n);
  }
  t === "" && (t = r.placeholder), e.textLine = t, e.isTruncated = !0;
}
function LS(e, t, r, i) {
  for (var n = 0, a = 0, o = e.length; a < o && n < t; a++) {
    var s = e.charCodeAt(a);
    n += 0 <= s && s <= 127 ? r : i;
  }
  return a;
}
function IS(e, t) {
  e != null && (e += "");
  var r = t.overflow, i = t.padding, n = t.font, a = r === "truncate", o = ou(n), s = K(t.lineHeight, o), l = !!t.backgroundColor, u = t.lineOverflow === "truncate", c = !1, h = t.width, d;
  h != null && (r === "break" || r === "breakAll") ? d = e ? $d(e, t.font, h, r === "breakAll", 0).lines : [] : d = e ? e.split(`
`) : [];
  var f = d.length * s, v = K(t.height, f);
  if (f > v && u) {
    var g = Math.floor(v / s);
    c = c || d.length > g, d = d.slice(0, g);
  }
  if (e && a && h != null)
    for (var p = Jd(h, n, t.ellipsis, {
      minChar: t.truncateMinChar,
      placeholder: t.placeholder
    }), m = {}, y = 0; y < d.length; y++)
      jd(m, d[y], p), d[y] = m.textLine, c = c || m.isTruncated;
  for (var _ = v, w = 0, y = 0; y < d.length; y++)
    w = Math.max(Kt(d[y], n), w);
  h == null && (h = w);
  var S = w;
  return i && (_ += i[0] + i[2], S += i[1] + i[3], h += i[1] + i[3]), l && (S = h), {
    lines: d,
    height: v,
    outerWidth: S,
    outerHeight: _,
    lineHeight: s,
    calculatedLineHeight: o,
    contentWidth: w,
    contentHeight: f,
    width: h,
    isTruncated: c
  };
}
var ES = /* @__PURE__ */ (function() {
  function e() {
  }
  return e;
})(), zc = /* @__PURE__ */ (function() {
  function e(t) {
    this.tokens = [], t && (this.tokens = t);
  }
  return e;
})(), RS = /* @__PURE__ */ (function() {
  function e() {
    this.width = 0, this.height = 0, this.contentWidth = 0, this.contentHeight = 0, this.outerWidth = 0, this.outerHeight = 0, this.lines = [], this.isTruncated = !1;
  }
  return e;
})();
function BS(e, t) {
  var r = new RS();
  if (e != null && (e += ""), !e)
    return r;
  for (var i = t.width, n = t.height, a = t.overflow, o = (a === "break" || a === "breakAll") && i != null ? { width: i, accumWidth: 0, breakAll: a === "breakAll" } : null, s = ls.lastIndex = 0, l; (l = ls.exec(e)) != null; ) {
    var u = l.index;
    u > s && us(r, e.substring(s, u), t, o), us(r, l[2], t, o, l[1]), s = ls.lastIndex;
  }
  s < e.length && us(r, e.substring(s, e.length), t, o);
  var c = [], h = 0, d = 0, f = t.padding, v = a === "truncate", g = t.lineOverflow === "truncate", p = {};
  function m(Z, J, Y) {
    Z.width = J, Z.lineHeight = Y, h += Y, d = Math.max(d, J);
  }
  t: for (var y = 0; y < r.lines.length; y++) {
    for (var _ = r.lines[y], w = 0, S = 0, b = 0; b < _.tokens.length; b++) {
      var x = _.tokens[b], T = x.styleName && t.rich[x.styleName] || {}, C = x.textPadding = T.padding, M = C ? C[1] + C[3] : 0, D = x.font = T.font || t.font;
      x.contentHeight = ou(D);
      var P = K(T.height, x.contentHeight);
      if (x.innerHeight = P, C && (P += C[0] + C[2]), x.height = P, x.lineHeight = hn(T.lineHeight, t.lineHeight, P), x.align = T && T.align || t.align, x.verticalAlign = T && T.verticalAlign || "middle", g && n != null && h + x.lineHeight > n) {
        var L = r.lines.length;
        b > 0 ? (_.tokens = _.tokens.slice(0, b), m(_, S, w), r.lines = r.lines.slice(0, y + 1)) : r.lines = r.lines.slice(0, y), r.isTruncated = r.isTruncated || r.lines.length < L;
        break t;
      }
      var k = T.width, B = k == null || k === "auto";
      if (typeof k == "string" && k.charAt(k.length - 1) === "%")
        x.percentWidth = k, c.push(x), x.contentWidth = Kt(x.text, D);
      else {
        if (B) {
          var O = T.backgroundColor, X = O && O.image;
          X && (X = kS(X), Ao(X) && (x.width = Math.max(x.width, X.width * P / X.height)));
        }
        var q = v && i != null ? i - S : null;
        q != null && q < x.width ? !B || q < M ? (x.text = "", x.width = x.contentWidth = 0) : (PS(p, x.text, q - M, D, t.ellipsis, { minChar: t.truncateMinChar }), x.text = p.text, r.isTruncated = r.isTruncated || p.isTruncated, x.width = x.contentWidth = Kt(x.text, D)) : x.contentWidth = Kt(x.text, D);
      }
      x.width += M, S += x.width, T && (w = Math.max(w, x.lineHeight));
    }
    m(_, S, w);
  }
  r.outerWidth = r.width = K(i, d), r.outerHeight = r.height = K(n, h), r.contentHeight = h, r.contentWidth = d, f && (r.outerWidth += f[1] + f[3], r.outerHeight += f[0] + f[2]);
  for (var y = 0; y < c.length; y++) {
    var x = c[y], F = x.percentWidth;
    x.width = parseInt(F, 10) / 100 * r.width;
  }
  return r;
}
function us(e, t, r, i, n) {
  var a = t === "", o = n && r.rich[n] || {}, s = e.lines, l = o.font || r.font, u = !1, c, h;
  if (i) {
    var d = o.padding, f = d ? d[1] + d[3] : 0;
    if (o.width != null && o.width !== "auto") {
      var v = Di(o.width, i.width) + f;
      s.length > 0 && v + i.accumWidth > i.width && (c = t.split(`
`), u = !0), i.accumWidth = v;
    } else {
      var g = $d(t, l, i.width, i.breakAll, i.accumWidth);
      i.accumWidth = g.accumWidth + f, h = g.linesWidths, c = g.lines;
    }
  } else
    c = t.split(`
`);
  for (var p = 0; p < c.length; p++) {
    var m = c[p], y = new ES();
    if (y.styleName = n, y.text = m, y.isLineHolder = !m && !a, typeof o.width == "number" ? y.width = o.width : y.width = h ? h[p] : Kt(m, l), !p && !u) {
      var _ = (s[s.length - 1] || (s[0] = new zc())).tokens, w = _.length;
      w === 1 && _[0].isLineHolder ? _[0] = y : (m || !w || a) && _.push(y);
    } else
      s.push(new zc([y]));
  }
}
function OS(e) {
  var t = e.charCodeAt(0);
  return t >= 32 && t <= 591 || t >= 880 && t <= 4351 || t >= 4608 && t <= 5119 || t >= 7680 && t <= 8303;
}
var NS = fr(",&?/;] ".split(""), function(e, t) {
  return e[t] = !0, e;
}, {});
function FS(e) {
  return OS(e) ? !!NS[e] : !0;
}
function $d(e, t, r, i, n) {
  for (var a = [], o = [], s = "", l = "", u = 0, c = 0, h = 0; h < e.length; h++) {
    var d = e.charAt(h);
    if (d === `
`) {
      l && (s += l, c += u), a.push(s), o.push(c), s = "", l = "", u = 0, c = 0;
      continue;
    }
    var f = Kt(d, t), v = i ? !1 : !FS(d);
    if (a.length ? c + f > r : n + c + f > r) {
      c ? (s || l) && (v ? (s || (s = l, l = "", u = 0, c = u), a.push(s), o.push(c - u), l += d, u += f, s = "", c = u) : (l && (s += l, l = "", u = 0), a.push(s), o.push(c), s = d, c = f)) : v ? (a.push(l), o.push(u), l = d, u = f) : (a.push(d), o.push(f));
      continue;
    }
    c += f, v ? (l += d, u += f) : (l && (s += l, l = "", u = 0), s += d);
  }
  return !a.length && !s && (s = e, l = "", u = 0), l && (s += l), s && (a.push(s), o.push(c)), a.length === 1 && (c += n), {
    accumWidth: c,
    lines: a,
    linesWidths: o
  };
}
var gl = "__zr_style_" + Math.round(Math.random() * 10), Wr = {
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
Wr[gl] = !0;
var Uc = ["z", "z2", "invisible"], zS = ["invisible"], qn = (function(e) {
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
    if (this.ignore || this.invisible || this.style.opacity === 0 || this.culling && US(this, r, i) || o && !o[0] && !o[3])
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
    return typeof r == "string" ? this.style[r] = i : E(this.style, r), this.dirtyStyle(), this;
  }, t.prototype.dirtyStyle = function(r) {
    r || this.markRedraw(), this.__dirty |= nn, this._rect && (this._rect = null);
  }, t.prototype.dirty = function() {
    this.dirtyStyle();
  }, t.prototype.styleChanged = function() {
    return !!(this.__dirty & nn);
  }, t.prototype.styleUpdated = function() {
    this.__dirty &= ~nn;
  }, t.prototype.createStyle = function(r) {
    return So(Wr, r);
  }, t.prototype.useStyle = function(r) {
    r[gl] || (r = this.createStyle(r)), this.__inHover ? this.__hoverStyle = r : this.style = r, this.dirtyStyle();
  }, t.prototype.isStyleObject = function(r) {
    return r[gl];
  }, t.prototype._innerSaveToNormal = function(r) {
    e.prototype._innerSaveToNormal.call(this, r);
    var i = this._normalState;
    r.style && !i.style && (i.style = this._mergeStyle(this.createStyle(), this.style)), this._savePrimaryToNormal(r, i, Uc);
  }, t.prototype._applyStateObj = function(r, i, n, a, o, s) {
    e.prototype._applyStateObj.call(this, r, i, n, a, o, s);
    var l = !(i && a), u;
    if (i && i.style ? o ? a ? u = i.style : (u = this._mergeStyle(this.createStyle(), n.style), this._mergeStyle(u, i.style)) : (u = this._mergeStyle(this.createStyle(), a ? this.style : n.style), this._mergeStyle(u, i.style)) : l && (u = n.style), u)
      if (o) {
        var c = this.style;
        if (this.style = this.createStyle(l ? {} : c), l)
          for (var h = pt(c), d = 0; d < h.length; d++) {
            var f = h[d];
            f in u && (u[f] = u[f], this.style[f] = c[f]);
          }
        for (var v = pt(u), d = 0; d < v.length; d++) {
          var f = v[d];
          this.style[f] = this.style[f];
        }
        this._transitionState(r, {
          style: u
        }, s, this.getAnimationStyleProps());
      } else
        this.useStyle(u);
    for (var g = this.__inHover ? zS : Uc, d = 0; d < g.length; d++) {
      var f = g[d];
      i && i[f] != null ? this[f] = i[f] : l && n[f] != null && (this[f] = n[f]);
    }
  }, t.prototype._mergeStates = function(r) {
    for (var i = e.prototype._mergeStates.call(this, r), n, a = 0; a < r.length; a++) {
      var o = r[a];
      o.style && (n = n || {}, this._mergeStyle(n, o.style));
    }
    return n && (i.style = n), i;
  }, t.prototype._mergeStyle = function(r, i) {
    return E(r, i), r;
  }, t.prototype.getAnimationStyleProps = function() {
    return Mo;
  }, t.initDefaultProps = (function() {
    var r = t.prototype;
    r.type = "displayable", r.invisible = !1, r.z = 0, r.z2 = 0, r.zlevel = 0, r.culling = !1, r.cursor = "pointer", r.rectHover = !1, r.incremental = !1, r._rect = null, r.dirtyRectTolerance = 0, r.__dirty = Zt | nn;
  })(), t;
})(xo), cs = new it(0, 0, 0, 0), hs = new it(0, 0, 0, 0);
function US(e, t, r) {
  return cs.copy(e.getBoundingRect()), e.transform && cs.applyTransform(e.transform), hs.width = t, hs.height = r, !cs.intersect(hs);
}
var oe = Math.min, se = Math.max, fs = Math.sin, ds = Math.cos, xr = Math.PI * 2, aa = Li(), oa = Li(), sa = Li();
function Vc(e, t, r, i, n, a) {
  n[0] = oe(e, r), n[1] = oe(t, i), a[0] = se(e, r), a[1] = se(t, i);
}
var Wc = [], Hc = [];
function VS(e, t, r, i, n, a, o, s, l, u) {
  var c = Md, h = Et, d = c(e, r, n, o, Wc);
  l[0] = 1 / 0, l[1] = 1 / 0, u[0] = -1 / 0, u[1] = -1 / 0;
  for (var f = 0; f < d; f++) {
    var v = h(e, r, n, o, Wc[f]);
    l[0] = oe(v, l[0]), u[0] = se(v, u[0]);
  }
  d = c(t, i, a, s, Hc);
  for (var f = 0; f < d; f++) {
    var g = h(t, i, a, s, Hc[f]);
    l[1] = oe(g, l[1]), u[1] = se(g, u[1]);
  }
  l[0] = oe(e, l[0]), u[0] = se(e, u[0]), l[0] = oe(o, l[0]), u[0] = se(o, u[0]), l[1] = oe(t, l[1]), u[1] = se(t, u[1]), l[1] = oe(s, l[1]), u[1] = se(s, u[1]);
}
function WS(e, t, r, i, n, a, o, s) {
  var l = Dd, u = zt, c = se(oe(l(e, r, n), 1), 0), h = se(oe(l(t, i, a), 1), 0), d = u(e, r, n, c), f = u(t, i, a, h);
  o[0] = oe(e, n, d), o[1] = oe(t, a, f), s[0] = se(e, n, d), s[1] = se(t, a, f);
}
function HS(e, t, r, i, n, a, o, s, l) {
  var u = di, c = vi, h = Math.abs(n - a);
  if (h % xr < 1e-4 && h > 1e-4) {
    s[0] = e - r, s[1] = t - i, l[0] = e + r, l[1] = t + i;
    return;
  }
  if (aa[0] = ds(n) * r + e, aa[1] = fs(n) * i + t, oa[0] = ds(a) * r + e, oa[1] = fs(a) * i + t, u(s, aa, oa), c(l, aa, oa), n = n % xr, n < 0 && (n = n + xr), a = a % xr, a < 0 && (a = a + xr), n > a && !o ? a += xr : n < a && o && (n += xr), o) {
    var d = a;
    a = n, n = d;
  }
  for (var f = 0; f < a; f += Math.PI / 2)
    f > n && (sa[0] = ds(f) * r + e, sa[1] = fs(f) * i + t, u(s, sa, s), c(l, sa, l));
}
var et = {
  M: 1,
  L: 2,
  C: 3,
  Q: 4,
  A: 5,
  Z: 6,
  R: 7
}, Tr = [], Cr = [], be = [], Ke = [], Se = [], xe = [], vs = Math.min, ps = Math.max, Ar = Math.cos, Mr = Math.sin, Ne = Math.abs, ml = Math.PI, rr = ml * 2, gs = typeof Float32Array < "u", Hi = [];
function ms(e) {
  var t = Math.round(e / ml * 1e8) / 1e8;
  return t % 2 * ml;
}
function tv(e, t) {
  var r = ms(e[0]);
  r < 0 && (r += rr);
  var i = r - e[0], n = e[1];
  n += i, !t && n - r >= rr ? n = r + rr : t && r - n >= rr ? n = r - rr : !t && r > n ? n = r + (rr - ms(r - n)) : t && r < n && (n = r - (rr - ms(n - r))), e[0] = r, e[1] = n;
}
var ki = (function() {
  function e(t) {
    this.dpr = 1, this._xi = 0, this._yi = 0, this._x0 = 0, this._y0 = 0, this._len = 0, t && (this._saveData = !1), this._saveData && (this.data = []);
  }
  return e.prototype.increaseVersion = function() {
    this._version++;
  }, e.prototype.getVersion = function() {
    return this._version;
  }, e.prototype.setScale = function(t, r, i) {
    i = i || 0, i > 0 && (this._ux = Ne(i / Ja / t) || 0, this._uy = Ne(i / Ja / r) || 0);
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
    var i = Ne(t - this._xi), n = Ne(r - this._yi), a = i > this._ux || n > this._uy;
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
    this._drawPendingPt(), Hi[0] = n, Hi[1] = a, tv(Hi, o), n = Hi[0], a = Hi[1];
    var s = a - n;
    return this.addData(et.A, t, r, i, i, n, s, 0, o ? 0 : 1), this._ctx && this._ctx.arc(t, r, i, n, a, o), this._xi = Ar(a) * i + t, this._yi = Mr(a) * i + r, this;
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
    !(this.data && this.data.length === r) && gs && (this.data = new Float32Array(r));
    for (var i = 0; i < r; i++)
      this.data[i] = t[i];
    this._len = r;
  }, e.prototype.appendPath = function(t) {
    t instanceof Array || (t = [t]);
    for (var r = t.length, i = 0, n = this._len, a = 0; a < r; a++)
      i += t[a].len();
    gs && this.data instanceof Float32Array && (this.data = new Float32Array(n + i));
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
      t instanceof Array && (t.length = this._len, gs && this._len > 11 && (this.data = new Float32Array(t)));
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
          Vc(r, i, t[o], t[o + 1], Se, xe), r = t[o++], i = t[o++];
          break;
        case et.C:
          VS(r, i, t[o++], t[o++], t[o++], t[o++], t[o], t[o + 1], Se, xe), r = t[o++], i = t[o++];
          break;
        case et.Q:
          WS(r, i, t[o++], t[o++], t[o], t[o + 1], Se, xe), r = t[o++], i = t[o++];
          break;
        case et.A:
          var u = t[o++], c = t[o++], h = t[o++], d = t[o++], f = t[o++], v = t[o++] + f;
          o += 1;
          var g = !t[o++];
          l && (n = Ar(f) * h + u, a = Mr(f) * d + c), HS(u, c, h, d, f, v, g, Se, xe), r = Ar(v) * h + u, i = Mr(v) * d + c;
          break;
        case et.R:
          n = r = t[o++], a = i = t[o++];
          var p = t[o++], m = t[o++];
          Vc(n, a, n + p, a + m, Se, xe);
          break;
        case et.Z:
          r = n, i = a;
          break;
      }
      di(be, be, Se), vi(Ke, Ke, xe);
    }
    return o === 0 && (be[0] = be[1] = Ke[0] = Ke[1] = 0), new it(be[0], be[1], Ke[0] - be[0], Ke[1] - be[1]);
  }, e.prototype._calculateLength = function() {
    var t = this.data, r = this._len, i = this._ux, n = this._uy, a = 0, o = 0, s = 0, l = 0;
    this._pathSegLen || (this._pathSegLen = []);
    for (var u = this._pathSegLen, c = 0, h = 0, d = 0; d < r; ) {
      var f = t[d++], v = d === 1;
      v && (a = t[d], o = t[d + 1], s = a, l = o);
      var g = -1;
      switch (f) {
        case et.M:
          a = s = t[d++], o = l = t[d++];
          break;
        case et.L: {
          var p = t[d++], m = t[d++], y = p - a, _ = m - o;
          (Ne(y) > i || Ne(_) > n || d === r - 1) && (g = Math.sqrt(y * y + _ * _), a = p, o = m);
          break;
        }
        case et.C: {
          var w = t[d++], S = t[d++], p = t[d++], m = t[d++], b = t[d++], x = t[d++];
          g = gb(a, o, w, S, p, m, b, x, 10), a = b, o = x;
          break;
        }
        case et.Q: {
          var w = t[d++], S = t[d++], p = t[d++], m = t[d++];
          g = _b(a, o, w, S, p, m, 10), a = p, o = m;
          break;
        }
        case et.A:
          var T = t[d++], C = t[d++], M = t[d++], D = t[d++], P = t[d++], L = t[d++], k = L + P;
          d += 1, v && (s = Ar(P) * M + T, l = Mr(P) * D + C), g = ps(M, D) * vs(rr, Math.abs(L)), a = Ar(k) * M + T, o = Mr(k) * D + C;
          break;
        case et.R: {
          s = a = t[d++], l = o = t[d++];
          var B = t[d++], O = t[d++];
          g = B * 2 + O * 2;
          break;
        }
        case et.Z: {
          var y = s - a, _ = l - o;
          g = Math.sqrt(y * y + _ * _), a = s, o = l;
          break;
        }
      }
      g >= 0 && (u[h++] = g, c += g);
    }
    return this._pathLen = c, c;
  }, e.prototype.rebuildPath = function(t, r) {
    var i = this.data, n = this._ux, a = this._uy, o = this._len, s, l, u, c, h, d, f = r < 1, v, g, p = 0, m = 0, y, _ = 0, w, S;
    if (!(f && (this._pathSegLen || this._calculateLength(), v = this._pathSegLen, g = this._pathLen, y = r * g, !y)))
      t: for (var b = 0; b < o; ) {
        var x = i[b++], T = b === 1;
        switch (T && (u = i[b], c = i[b + 1], s = u, l = c), x !== et.L && _ > 0 && (t.lineTo(w, S), _ = 0), x) {
          case et.M:
            s = u = i[b++], l = c = i[b++], t.moveTo(u, c);
            break;
          case et.L: {
            h = i[b++], d = i[b++];
            var C = Ne(h - u), M = Ne(d - c);
            if (C > n || M > a) {
              if (f) {
                var D = v[m++];
                if (p + D > y) {
                  var P = (y - p) / D;
                  t.lineTo(u * (1 - P) + h * P, c * (1 - P) + d * P);
                  break t;
                }
                p += D;
              }
              t.lineTo(h, d), u = h, c = d, _ = 0;
            } else {
              var L = C * C + M * M;
              L > _ && (w = h, S = d, _ = L);
            }
            break;
          }
          case et.C: {
            var k = i[b++], B = i[b++], O = i[b++], X = i[b++], q = i[b++], F = i[b++];
            if (f) {
              var D = v[m++];
              if (p + D > y) {
                var P = (y - p) / D;
                Za(u, k, O, q, P, Tr), Za(c, B, X, F, P, Cr), t.bezierCurveTo(Tr[1], Cr[1], Tr[2], Cr[2], Tr[3], Cr[3]);
                break t;
              }
              p += D;
            }
            t.bezierCurveTo(k, B, O, X, q, F), u = q, c = F;
            break;
          }
          case et.Q: {
            var k = i[b++], B = i[b++], O = i[b++], X = i[b++];
            if (f) {
              var D = v[m++];
              if (p + D > y) {
                var P = (y - p) / D;
                Qa(u, k, O, P, Tr), Qa(c, B, X, P, Cr), t.quadraticCurveTo(Tr[1], Cr[1], Tr[2], Cr[2]);
                break t;
              }
              p += D;
            }
            t.quadraticCurveTo(k, B, O, X), u = O, c = X;
            break;
          }
          case et.A:
            var Z = i[b++], J = i[b++], Y = i[b++], gt = i[b++], bt = i[b++], Xt = i[b++], _e = i[b++], jt = !i[b++], qt = Y > gt ? Y : gt, xt = Ne(Y - gt) > 1e-3, ht = bt + Xt, U = !1;
            if (f) {
              var D = v[m++];
              p + D > y && (ht = bt + Xt * (y - p) / D, U = !0), p += D;
            }
            if (xt && t.ellipse ? t.ellipse(Z, J, Y, gt, _e, bt, ht, jt) : t.arc(Z, J, qt, bt, ht, jt), U)
              break t;
            T && (s = Ar(bt) * Y + Z, l = Mr(bt) * gt + J), u = Ar(ht) * Y + Z, c = Mr(ht) * gt + J;
            break;
          case et.R:
            s = u = i[b], l = c = i[b + 1], h = i[b++], d = i[b++];
            var Q = i[b++], we = i[b++];
            if (f) {
              var D = v[m++];
              if (p + D > y) {
                var St = y - p;
                t.moveTo(h, d), t.lineTo(h + vs(St, Q), d), St -= Q, St > 0 && t.lineTo(h + Q, d + vs(St, we)), St -= we, St > 0 && t.lineTo(h + ps(Q - St, 0), d + we), St -= Q, St > 0 && t.lineTo(h, d + ps(we - St, 0));
                break t;
              }
              p += D;
            }
            t.rect(h, d, Q, we);
            break;
          case et.Z:
            if (f) {
              var D = v[m++];
              if (p + D > y) {
                var P = (y - p) / D;
                t.lineTo(u * (1 - P) + s * P, c * (1 - P) + l * P);
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
function GS(e, t, r, i, n, a, o, s, l, u, c) {
  if (l === 0)
    return !1;
  var h = l;
  if (c > t + h && c > i + h && c > a + h && c > s + h || c < t - h && c < i - h && c < a - h && c < s - h || u > e + h && u > r + h && u > n + h && u > o + h || u < e - h && u < r - h && u < n - h && u < o - h)
    return !1;
  var d = pb(e, t, r, i, n, a, o, s, u, c);
  return d <= h / 2;
}
function YS(e, t, r, i, n, a, o, s, l) {
  if (o === 0)
    return !1;
  var u = o;
  if (l > t + u && l > i + u && l > a + u || l < t - u && l < i - u && l < a - u || s > e + u && s > r + u && s > n + u || s < e - u && s < r - u && s < n - u)
    return !1;
  var c = yb(e, t, r, i, n, a, s, l);
  return c <= u / 2;
}
var Gc = Math.PI * 2;
function la(e) {
  return e %= Gc, e < 0 && (e += Gc), e;
}
var Gi = Math.PI * 2;
function XS(e, t, r, i, n, a, o, s, l) {
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
  var d = Math.atan2(l, s);
  return d < 0 && (d += Gi), d >= i && d <= n || d + Gi >= i && d + Gi <= n;
}
function Dr(e, t, r, i, n, a) {
  if (a > t && a > i || a < t && a < i || i === t)
    return 0;
  var o = (a - t) / (i - t), s = i < t ? 1 : -1;
  (o === 1 || o === 0) && (s = i < t ? 0.5 : -0.5);
  var l = o * (r - e) + e;
  return l === n ? 1 / 0 : l > n ? s : 0;
}
var Je = ki.CMD, kr = Math.PI * 2, qS = 1e-4;
function ZS(e, t) {
  return Math.abs(e - t) < qS;
}
var Lt = [-1, -1, -1], ne = [-1, -1];
function QS() {
  var e = ne[0];
  ne[0] = ne[1], ne[1] = e;
}
function KS(e, t, r, i, n, a, o, s, l, u) {
  if (u > t && u > i && u > a && u > s || u < t && u < i && u < a && u < s)
    return 0;
  var c = Ad(t, i, a, s, u, Lt);
  if (c === 0)
    return 0;
  for (var h = 0, d = -1, f = void 0, v = void 0, g = 0; g < c; g++) {
    var p = Lt[g], m = p === 0 || p === 1 ? 0.5 : 1, y = Et(e, r, n, o, p);
    y < l || (d < 0 && (d = Md(t, i, a, s, ne), ne[1] < ne[0] && d > 1 && QS(), f = Et(t, i, a, s, ne[0]), d > 1 && (v = Et(t, i, a, s, ne[1]))), d === 2 ? p < ne[0] ? h += f < t ? m : -m : p < ne[1] ? h += v < f ? m : -m : h += s < v ? m : -m : p < ne[0] ? h += f < t ? m : -m : h += s < f ? m : -m);
  }
  return h;
}
function JS(e, t, r, i, n, a, o, s) {
  if (s > t && s > i && s > a || s < t && s < i && s < a)
    return 0;
  var l = mb(t, i, a, s, Lt);
  if (l === 0)
    return 0;
  var u = Dd(t, i, a);
  if (u >= 0 && u <= 1) {
    for (var c = 0, h = zt(t, i, a, u), d = 0; d < l; d++) {
      var f = Lt[d] === 0 || Lt[d] === 1 ? 0.5 : 1, v = zt(e, r, n, Lt[d]);
      v < o || (Lt[d] < u ? c += h < t ? f : -f : c += a < h ? f : -f);
    }
    return c;
  } else {
    var f = Lt[0] === 0 || Lt[0] === 1 ? 0.5 : 1, v = zt(e, r, n, Lt[0]);
    return v < o ? 0 : a < t ? f : -f;
  }
}
function jS(e, t, r, i, n, a, o, s) {
  if (s -= t, s > r || s < -r)
    return 0;
  var l = Math.sqrt(r * r - s * s);
  Lt[0] = -l, Lt[1] = l;
  var u = Math.abs(i - n);
  if (u < 1e-4)
    return 0;
  if (u >= kr - 1e-4) {
    i = 0, n = kr;
    var c = a ? 1 : -1;
    return o >= Lt[0] + e && o <= Lt[1] + e ? c : 0;
  }
  if (i > n) {
    var h = i;
    i = n, n = h;
  }
  i < 0 && (i += kr, n += kr);
  for (var d = 0, f = 0; f < 2; f++) {
    var v = Lt[f];
    if (v + e > o) {
      var g = Math.atan2(s, v), c = a ? 1 : -1;
      g < 0 && (g = kr + g), (g >= i && g <= n || g + kr >= i && g + kr <= n) && (g > Math.PI / 2 && g < Math.PI * 1.5 && (c = -c), d += c);
    }
  }
  return d;
}
function ev(e, t, r, i, n) {
  for (var a = e.data, o = e.len(), s = 0, l = 0, u = 0, c = 0, h = 0, d, f, v = 0; v < o; ) {
    var g = a[v++], p = v === 1;
    switch (g === Je.M && v > 1 && (r || (s += Dr(l, u, c, h, i, n))), p && (l = a[v], u = a[v + 1], c = l, h = u), g) {
      case Je.M:
        c = a[v++], h = a[v++], l = c, u = h;
        break;
      case Je.L:
        if (r) {
          if (ei(l, u, a[v], a[v + 1], t, i, n))
            return !0;
        } else
          s += Dr(l, u, a[v], a[v + 1], i, n) || 0;
        l = a[v++], u = a[v++];
        break;
      case Je.C:
        if (r) {
          if (GS(l, u, a[v++], a[v++], a[v++], a[v++], a[v], a[v + 1], t, i, n))
            return !0;
        } else
          s += KS(l, u, a[v++], a[v++], a[v++], a[v++], a[v], a[v + 1], i, n) || 0;
        l = a[v++], u = a[v++];
        break;
      case Je.Q:
        if (r) {
          if (YS(l, u, a[v++], a[v++], a[v], a[v + 1], t, i, n))
            return !0;
        } else
          s += JS(l, u, a[v++], a[v++], a[v], a[v + 1], i, n) || 0;
        l = a[v++], u = a[v++];
        break;
      case Je.A:
        var m = a[v++], y = a[v++], _ = a[v++], w = a[v++], S = a[v++], b = a[v++];
        v += 1;
        var x = !!(1 - a[v++]);
        d = Math.cos(S) * _ + m, f = Math.sin(S) * w + y, p ? (c = d, h = f) : s += Dr(l, u, d, f, i, n);
        var T = (i - m) * w / _ + m;
        if (r) {
          if (XS(m, y, w, S, S + b, x, t, T, n))
            return !0;
        } else
          s += jS(m, y, w, S, S + b, x, T, n);
        l = Math.cos(S + b) * _ + m, u = Math.sin(S + b) * w + y;
        break;
      case Je.R:
        c = l = a[v++], h = u = a[v++];
        var C = a[v++], M = a[v++];
        if (d = c + C, f = h + M, r) {
          if (ei(c, h, d, h, t, i, n) || ei(d, h, d, f, t, i, n) || ei(d, f, c, f, t, i, n) || ei(c, f, c, h, t, i, n))
            return !0;
        } else
          s += Dr(d, h, d, f, i, n), s += Dr(c, f, c, h, i, n);
        break;
      case Je.Z:
        if (r) {
          if (ei(l, u, c, h, t, i, n))
            return !0;
        } else
          s += Dr(l, u, c, h, i, n);
        l = c, u = h;
        break;
    }
  }
  return !r && !ZS(u, h) && (s += Dr(l, u, c, h, i, n) || 0), s !== 0;
}
function $S(e, t, r) {
  return ev(e, 0, !1, t, r);
}
function tx(e, t, r, i) {
  return ev(e, t, !0, r, i);
}
var rv = ct({
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
}, Wr), ex = {
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
}, ys = kn.concat([
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
      for (var s = 0; s < ys.length; ++s)
        n[ys[s]] = this[ys[s]];
      n.__dirty |= Zt;
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
      o === "style" ? this.style ? E(this.style, s) : this.useStyle(s) : o === "shape" ? E(this.shape, s) : e.prototype.attrKV.call(this, o, s);
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
      if (W(r)) {
        var i = Ka(r, 0);
        return i > 0.5 ? fl : i > 0.2 ? Fb : dl;
      } else if (r)
        return dl;
    }
    return fl;
  }, t.prototype.getInsideTextStroke = function(r) {
    var i = this.style.fill;
    if (W(i)) {
      var n = this.__zr, a = !!(n && n.isDarkMode()), o = Ka(r, 0) < hl;
      if (a === o)
        return i;
    }
  }, t.prototype.buildPath = function(r, i, n) {
  }, t.prototype.pathUpdated = function() {
    this.__dirty &= ~hi;
  }, t.prototype.getUpdatedPathProxy = function(r) {
    return !this.path && this.createPathProxy(), this.path.beginPath(), this.buildPath(this.path, this.shape, r), this.path;
  }, t.prototype.createPathProxy = function() {
    this.path = new ki(!1);
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
        if (u > 1e-10 && (this.hasFill() || (l = Math.max(l, this.strokeContainThreshold)), tx(s, l / u, r, i)))
          return !0;
      }
      if (this.hasFill())
        return $S(s, r, i);
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
    return n || (n = this.shape = {}), typeof r == "string" ? n[r] = i : E(n, r), this.dirtyShape(), this;
  }, t.prototype.shapeChanged = function() {
    return !!(this.__dirty & hi);
  }, t.prototype.createStyle = function(r) {
    return So(rv, r);
  }, t.prototype._innerSaveToNormal = function(r) {
    e.prototype._innerSaveToNormal.call(this, r);
    var i = this._normalState;
    r.shape && !i.shape && (i.shape = E({}, this.shape));
  }, t.prototype._applyStateObj = function(r, i, n, a, o, s) {
    e.prototype._applyStateObj.call(this, r, i, n, a, o, s);
    var l = !(i && a), u;
    if (i && i.shape ? o ? a ? u = i.shape : (u = E({}, n.shape), E(u, i.shape)) : (u = E({}, a ? this.shape : n.shape), E(u, i.shape)) : l && (u = n.shape), u)
      if (o) {
        this.shape = E({}, this.shape);
        for (var c = {}, h = pt(u), d = 0; d < h.length; d++) {
          var f = h[d];
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
    return ex;
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
        return j(r.style);
      }, o.prototype.getDefaultShape = function() {
        return j(r.shape);
      }, o;
    })(t);
    for (var n in r)
      typeof r[n] == "function" && (i.prototype[n] = r[n]);
    return i;
  }, t.initDefaultProps = (function() {
    var r = t.prototype;
    r.type = "path", r.strokeContainThreshold = 5, r.segmentIgnoreThreshold = 0, r.subPixelOptimize = !1, r.autoBatch = !1, r.__dirty = Zt | nn | hi;
  })(), t;
})(qn), rx = ct({
  strokeFirst: !0,
  font: Xr,
  x: 0,
  y: 0,
  textAlign: "left",
  textBaseline: "top",
  miterLimit: 2
}, rv), to = (function(e) {
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
    return So(rx, r);
  }, t.prototype.setBoundingRect = function(r) {
    this._rect = r;
  }, t.prototype.getBoundingRect = function() {
    var r = this.style;
    if (!this._rect) {
      var i = r.text;
      i != null ? i += "" : i = "";
      var n = Od(i, r.font, r.textAlign, r.textBaseline);
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
var ix = ct({
  x: 0,
  y: 0
}, Wr), nx = {
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
function ax(e) {
  return !!(e && typeof e != "string" && e.width && e.height);
}
var Zr = (function(e) {
  G(t, e);
  function t() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return t.prototype.createStyle = function(r) {
    return So(ix, r);
  }, t.prototype._getSize = function(r) {
    var i = this.style, n = i[r];
    if (n != null)
      return n;
    var a = ax(i.image) ? i.image : this.__image;
    if (!a)
      return 0;
    var o = r === "width" ? "height" : "width", s = i[o];
    return s == null ? a[r] : a[r] / a[o] * s;
  }, t.prototype.getWidth = function() {
    return this._getSize("width");
  }, t.prototype.getHeight = function() {
    return this._getSize("height");
  }, t.prototype.getAnimationStyleProps = function() {
    return nx;
  }, t.prototype.getBoundingRect = function() {
    var r = this.style;
    return this._rect || (this._rect = new it(r.x || 0, r.y || 0, this.getWidth(), this.getHeight())), this._rect;
  }, t;
})(qn);
Zr.prototype.type = "image";
function ox(e, t) {
  var r = t.x, i = t.y, n = t.width, a = t.height, o = t.r, s, l, u, c;
  n < 0 && (r = r + n, n = -n), a < 0 && (i = i + a, a = -a), typeof o == "number" ? s = l = u = c = o : o instanceof Array ? o.length === 1 ? s = l = u = c = o[0] : o.length === 2 ? (s = u = o[0], l = c = o[1]) : o.length === 3 ? (s = o[0], l = c = o[1], u = o[2]) : (s = o[0], l = o[1], u = o[2], c = o[3]) : s = l = u = c = 0;
  var h;
  s + l > n && (h = s + l, s *= n / h, l *= n / h), u + c > n && (h = u + c, u *= n / h, c *= n / h), l + u > a && (h = l + u, l *= a / h, u *= a / h), s + c > a && (h = s + c, s *= a / h, c *= a / h), e.moveTo(r + s, i), e.lineTo(r + n - l, i), l !== 0 && e.arc(r + n - l, i + l, l, -Math.PI / 2, 0), e.lineTo(r + n, i + a - u), u !== 0 && e.arc(r + n - u, i + a - u, u, 0, Math.PI / 2), e.lineTo(r + c, i + a), c !== 0 && e.arc(r + c, i + a - c, c, Math.PI / 2, Math.PI), e.lineTo(r, i + s), s !== 0 && e.arc(r + s, i + s, s, Math.PI, Math.PI * 1.5);
}
var gi = Math.round;
function iv(e, t, r) {
  if (t) {
    var i = t.x1, n = t.x2, a = t.y1, o = t.y2;
    e.x1 = i, e.x2 = n, e.y1 = a, e.y2 = o;
    var s = r && r.lineWidth;
    return s && (gi(i * 2) === gi(n * 2) && (e.x1 = e.x2 = zr(i, s, !0)), gi(a * 2) === gi(o * 2) && (e.y1 = e.y2 = zr(a, s, !0))), e;
  }
}
function nv(e, t, r) {
  if (t) {
    var i = t.x, n = t.y, a = t.width, o = t.height;
    e.x = i, e.y = n, e.width = a, e.height = o;
    var s = r && r.lineWidth;
    return s && (e.x = zr(i, s, !0), e.y = zr(n, s, !0), e.width = Math.max(zr(i + a, s, !1) - e.x, a === 0 ? 0 : 1), e.height = Math.max(zr(n + o, s, !1) - e.y, o === 0 ? 0 : 1)), e;
  }
}
function zr(e, t, r) {
  if (!t)
    return e;
  var i = gi(e * 2);
  return (i + gi(t)) % 2 === 0 ? i / 2 : (i + (r ? 1 : -1)) / 2;
}
var sx = /* @__PURE__ */ (function() {
  function e() {
    this.x = 0, this.y = 0, this.width = 0, this.height = 0;
  }
  return e;
})(), lx = {}, de = (function(e) {
  G(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new sx();
  }, t.prototype.buildPath = function(r, i) {
    var n, a, o, s;
    if (this.subPixelOptimize) {
      var l = nv(lx, i, this.style);
      n = l.x, a = l.y, o = l.width, s = l.height, l.r = i.r, i = l;
    } else
      n = i.x, a = i.y, o = i.width, s = i.height;
    i.r ? ox(r, i) : r.rect(n, a, o, s);
  }, t.prototype.isZeroArea = function() {
    return !this.shape.width || !this.shape.height;
  }, t;
})(ot);
de.prototype.type = "rect";
var Yc = {
  fill: "#000"
}, Xc = 2, ux = {
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
    return i.type = "text", i._children = [], i._defaultStyle = Yc, i.attr(r), i;
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
    this._childCursor = 0, vx(this.style), this.style.rich ? this._updateRichTexts() : this._updatePlainTexts(), this._children.length = this._childCursor, this.styleUpdated();
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
    this._defaultStyle = r || Yc;
  }, t.prototype.setTextContent = function(r) {
  }, t.prototype._mergeStyle = function(r, i) {
    if (!i)
      return r;
    var n = i.rich, a = r.rich || n && {};
    return E(r, i), n && a ? (this._mergeRich(a, n), r.rich = a) : a && (r.rich = a), r;
  }, t.prototype._mergeRich = function(r, i) {
    for (var n = pt(i), a = 0; a < n.length; a++) {
      var o = n[a];
      r[o] = r[o] || {}, E(r[o], i[o]);
    }
  }, t.prototype.getAnimationStyleProps = function() {
    return ux;
  }, t.prototype._getOrCreateChild = function(r) {
    var i = this._children[this._childCursor];
    return (!i || !(i instanceof r)) && (i = new r()), this._children[this._childCursor++] = i, i.__zr = this.__zr, i.parent = this, i;
  }, t.prototype._updatePlainTexts = function() {
    var r = this.style, i = r.font || Xr, n = r.padding, a = $c(r), o = IS(a, r), s = _s(r), l = !!r.backgroundColor, u = o.outerHeight, c = o.outerWidth, h = o.contentWidth, d = o.lines, f = o.lineHeight, v = this._defaultStyle;
    this.isTruncated = !!o.isTruncated;
    var g = r.x || 0, p = r.y || 0, m = r.align || v.align || "left", y = r.verticalAlign || v.verticalAlign || "top", _ = g, w = fi(p, o.contentHeight, y);
    if (s || n) {
      var S = on(g, c, m), b = fi(p, u, y);
      s && this._renderBackground(r, r, S, b, c, u);
    }
    w += f / 2, n && (_ = jc(g, m, n), y === "top" ? w += n[0] : y === "bottom" && (w -= n[2]));
    for (var x = 0, T = !1, C = Jc("fill" in r ? r.fill : (T = !0, v.fill)), M = Kc("stroke" in r ? r.stroke : !l && (!v.autoStroke || T) ? (x = Xc, v.stroke) : null), D = r.textShadowBlur > 0, P = r.width != null && (r.overflow === "truncate" || r.overflow === "break" || r.overflow === "breakAll"), L = o.calculatedLineHeight, k = 0; k < d.length; k++) {
      var B = this._getOrCreateChild(to), O = B.createStyle();
      B.useStyle(O), O.text = d[k], O.x = _, O.y = w, O.textAlign = m, O.textBaseline = "middle", O.opacity = r.opacity, O.strokeFirst = !0, D && (O.shadowBlur = r.textShadowBlur || 0, O.shadowColor = r.textShadowColor || "transparent", O.shadowOffsetX = r.textShadowOffsetX || 0, O.shadowOffsetY = r.textShadowOffsetY || 0), O.stroke = M, O.fill = C, M && (O.lineWidth = r.lineWidth || x, O.lineDash = r.lineDash, O.lineDashOffset = r.lineDashOffset || 0), O.font = i, Zc(O, r), w += f, P && B.setBoundingRect(new it(on(O.x, h, O.textAlign), fi(O.y, L, O.textBaseline), h, L));
    }
  }, t.prototype._updateRichTexts = function() {
    var r = this.style, i = $c(r), n = BS(i, r), a = n.width, o = n.outerWidth, s = n.outerHeight, l = r.padding, u = r.x || 0, c = r.y || 0, h = this._defaultStyle, d = r.align || h.align, f = r.verticalAlign || h.verticalAlign;
    this.isTruncated = !!n.isTruncated;
    var v = on(u, o, d), g = fi(c, s, f), p = v, m = g;
    l && (p += l[3], m += l[0]);
    var y = p + a;
    _s(r) && this._renderBackground(r, r, v, g, o, s);
    for (var _ = !!r.backgroundColor, w = 0; w < n.lines.length; w++) {
      for (var S = n.lines[w], b = S.tokens, x = b.length, T = S.lineHeight, C = S.width, M = 0, D = p, P = y, L = x - 1, k = void 0; M < x && (k = b[M], !k.align || k.align === "left"); )
        this._placeToken(k, r, T, m, D, "left", _), C -= k.width, D += k.width, M++;
      for (; L >= 0 && (k = b[L], k.align === "right"); )
        this._placeToken(k, r, T, m, P, "right", _), C -= k.width, P -= k.width, L--;
      for (D += (a - (D - p) - (y - P) - C) / 2; M <= L; )
        k = b[M], this._placeToken(k, r, T, m, D + k.width / 2, "center", _), D += k.width, M++;
      m += T;
    }
  }, t.prototype._placeToken = function(r, i, n, a, o, s, l) {
    var u = i.rich[r.styleName] || {};
    u.text = r.text;
    var c = r.verticalAlign, h = a + n / 2;
    c === "top" ? h = a + r.height / 2 : c === "bottom" && (h = a + n - r.height / 2);
    var d = !r.isLineHolder && _s(u);
    d && this._renderBackground(u, i, s === "right" ? o - r.width : s === "center" ? o - r.width / 2 : o, h - r.height / 2, r.width, r.height);
    var f = !!u.backgroundColor, v = r.textPadding;
    v && (o = jc(o, s, v), h -= r.height / 2 - v[0] - r.innerHeight / 2);
    var g = this._getOrCreateChild(to), p = g.createStyle();
    g.useStyle(p);
    var m = this._defaultStyle, y = !1, _ = 0, w = Jc("fill" in u ? u.fill : "fill" in i ? i.fill : (y = !0, m.fill)), S = Kc("stroke" in u ? u.stroke : "stroke" in i ? i.stroke : !f && !l && (!m.autoStroke || y) ? (_ = Xc, m.stroke) : null), b = u.textShadowBlur > 0 || i.textShadowBlur > 0;
    p.text = r.text, p.x = o, p.y = h, b && (p.shadowBlur = u.textShadowBlur || i.textShadowBlur || 0, p.shadowColor = u.textShadowColor || i.textShadowColor || "transparent", p.shadowOffsetX = u.textShadowOffsetX || i.textShadowOffsetX || 0, p.shadowOffsetY = u.textShadowOffsetY || i.textShadowOffsetY || 0), p.textAlign = s, p.textBaseline = "middle", p.font = r.font || Xr, p.opacity = hn(u.opacity, i.opacity, 1), Zc(p, u), S && (p.lineWidth = hn(u.lineWidth, i.lineWidth, _), p.lineDash = K(u.lineDash, i.lineDash), p.lineDashOffset = i.lineDashOffset || 0, p.stroke = S), w && (p.fill = w);
    var x = r.contentWidth, T = r.contentHeight;
    g.setBoundingRect(new it(on(p.x, x, p.textAlign), fi(p.y, T, p.textBaseline), x, T));
  }, t.prototype._renderBackground = function(r, i, n, a, o, s) {
    var l = r.backgroundColor, u = r.borderWidth, c = r.borderColor, h = l && l.image, d = l && !h, f = r.borderRadius, v = this, g, p;
    if (d || r.lineHeight || u && c) {
      g = this._getOrCreateChild(de), g.useStyle(g.createStyle()), g.style.fill = null;
      var m = g.shape;
      m.x = n, m.y = a, m.width = o, m.height = s, m.r = f, g.dirtyShape();
    }
    if (d) {
      var y = g.style;
      y.fill = l || null, y.fillOpacity = K(r.fillOpacity, 1);
    } else if (h) {
      p = this._getOrCreateChild(Zr), p.onload = function() {
        v.dirtyStyle();
      };
      var _ = p.style;
      _.image = l.image, _.x = n, _.y = a, _.width = o, _.height = s;
    }
    if (u && c) {
      var y = g.style;
      y.lineWidth = u, y.stroke = c, y.strokeOpacity = K(r.strokeOpacity, 1), y.lineDash = r.borderDash, y.lineDashOffset = r.borderDashOffset || 0, g.strokeContainThreshold = 0, g.hasFill() && g.hasStroke() && (y.strokeFirst = !0, y.lineWidth *= 2);
    }
    var w = (g || p).style;
    w.shadowBlur = r.shadowBlur || 0, w.shadowColor = r.shadowColor || "transparent", w.shadowOffsetX = r.shadowOffsetX || 0, w.shadowOffsetY = r.shadowOffsetY || 0, w.opacity = hn(r.opacity, i.opacity, 1);
  }, t.makeFont = function(r) {
    var i = "";
    return dx(r) && (i = [
      r.fontStyle,
      r.fontWeight,
      fx(r.fontSize),
      r.fontFamily || "sans-serif"
    ].join(" ")), i && Me(i) || r.textFont || r.font;
  }, t;
})(qn), cx = { left: !0, right: 1, center: 1 }, hx = { top: 1, bottom: 1, middle: 1 }, qc = ["fontStyle", "fontWeight", "fontSize", "fontFamily"];
function fx(e) {
  return typeof e == "string" && (e.indexOf("px") !== -1 || e.indexOf("rem") !== -1 || e.indexOf("em") !== -1) ? e : isNaN(+e) ? Kl + "px" : e + "px";
}
function Zc(e, t) {
  for (var r = 0; r < qc.length; r++) {
    var i = qc[r], n = t[i];
    n != null && (e[i] = n);
  }
}
function dx(e) {
  return e.fontSize != null || e.fontFamily || e.fontWeight;
}
function vx(e) {
  return Qc(e), A(e.rich, Qc), e;
}
function Qc(e) {
  if (e) {
    e.font = pe.makeFont(e);
    var t = e.align;
    t === "middle" && (t = "center"), e.align = t == null || cx[t] ? t : "left";
    var r = e.verticalAlign;
    r === "center" && (r = "middle"), e.verticalAlign = r == null || hx[r] ? r : "top";
    var i = e.padding;
    i && (e.padding = dd(e.padding));
  }
}
function Kc(e, t) {
  return e == null || t <= 0 || e === "transparent" || e === "none" ? null : e.image || e.colorStops ? "#000" : e;
}
function Jc(e) {
  return e == null || e === "none" ? null : e.image || e.colorStops ? "#000" : e;
}
function jc(e, t, r) {
  return t === "right" ? e - r[1] : t === "center" ? e + r[3] / 2 - r[1] / 2 : e + r[3];
}
function $c(e) {
  var t = e.text;
  return t != null && (t += ""), t;
}
function _s(e) {
  return !!(e.backgroundColor || e.lineHeight || e.borderWidth && e.borderColor);
}
var dt = wt(), px = function(e, t, r, i) {
  if (i) {
    var n = dt(i);
    n.dataIndex = r, n.dataType = t, n.seriesIndex = e, n.ssrType = "chart", i.type === "group" && i.traverse(function(a) {
      var o = dt(a);
      o.seriesIndex = e, o.dataIndex = r, o.dataType = t, o.ssrType = "chart";
    });
  }
}, th = 1, eh = {}, av = wt(), hu = wt(), ov = 0, fu = 1, du = 2, Ie = ["emphasis", "blur", "select"], eo = ["normal", "emphasis", "blur", "select"], gx = 10, mx = 9, Hr = "highlight", Ba = "downplay", mn = "select", Oa = "unselect", yn = "toggleSelect";
function ri(e) {
  return e != null && e !== "none";
}
function Do(e, t, r) {
  e.onHoverStateChange && (e.hoverState || 0) !== r && e.onHoverStateChange(t), e.hoverState = r;
}
function sv(e) {
  Do(e, "emphasis", du);
}
function lv(e) {
  e.hoverState === du && Do(e, "normal", ov);
}
function vu(e) {
  Do(e, "blur", fu);
}
function uv(e) {
  e.hoverState === fu && Do(e, "normal", ov);
}
function yx(e) {
  e.selected = !0;
}
function _x(e) {
  e.selected = !1;
}
function rh(e, t, r) {
  t(e, r);
}
function qe(e, t, r) {
  rh(e, t, r), e.isGroup && e.traverse(function(i) {
    rh(i, t, r);
  });
}
function bx(e, t, r, i) {
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
function Sx(e, t, r, i) {
  var n = r && st(r, "select") >= 0, a = !1;
  if (e instanceof ot) {
    var o = av(e), s = n && o.selectFill || o.normalFill, l = n && o.selectStroke || o.normalStroke;
    if (ri(s) || ri(l)) {
      i = i || {};
      var u = i.style || {};
      u.fill === "inherit" ? (a = !0, i = E({}, i), u = E({}, u), u.fill = s) : !ri(u.fill) && ri(s) ? (a = !0, i = E({}, i), u = E({}, u), u.fill = Sc(s)) : !ri(u.stroke) && ri(l) && (a || (i = E({}, i), u = E({}, u)), u.stroke = Sc(l)), i.style = u;
    }
  }
  if (i && i.z2 == null) {
    a || (i = E({}, i));
    var c = e.z2EmphasisLift;
    i.z2 = e.z2 + (c ?? gx);
  }
  return i;
}
function xx(e, t, r) {
  if (r && r.z2 == null) {
    r = E({}, r);
    var i = e.z2SelectLift;
    r.z2 = e.z2 + (i ?? mx);
  }
  return r;
}
function Tx(e, t, r) {
  var i = st(e.currentStates, t) >= 0, n = e.style.opacity, a = i ? null : bx(e, ["opacity"], t, {
    opacity: 1
  });
  r = r || {};
  var o = r.style || {};
  return o.opacity == null && (r = E({}, r), o = E({
    // Already being applied 'emphasis'. DON'T mul opacity multiple times.
    opacity: i ? n : a.opacity * 0.1
  }, o), r.style = o), r;
}
function ws(e, t) {
  var r = this.states[e];
  if (this.style) {
    if (e === "emphasis")
      return Sx(this, e, t, r);
    if (e === "blur")
      return Tx(this, e, r);
    if (e === "select")
      return xx(this, e, r);
  }
  return r;
}
function Cx(e) {
  e.stateProxy = ws;
  var t = e.getTextContent(), r = e.getTextGuideLine();
  t && (t.stateProxy = ws), r && (r.stateProxy = ws);
}
function ih(e, t) {
  !dv(e, t) && !e.__highByOuter && qe(e, sv);
}
function nh(e, t) {
  !dv(e, t) && !e.__highByOuter && qe(e, lv);
}
function yl(e, t) {
  e.__highByOuter |= 1 << (t || 0), qe(e, sv);
}
function _l(e, t) {
  !(e.__highByOuter &= ~(1 << (t || 0))) && qe(e, lv);
}
function Ax(e) {
  qe(e, vu);
}
function cv(e) {
  qe(e, uv);
}
function hv(e) {
  qe(e, yx);
}
function fv(e) {
  qe(e, _x);
}
function dv(e, t) {
  return e.__highDownSilentOnTouch && t.zrByTouch;
}
function vv(e) {
  var t = e.getModel(), r = [], i = [];
  t.eachComponent(function(n, a) {
    var o = hu(a), s = n === "series", l = s ? e.getViewOfSeriesModel(a) : e.getViewOfComponentModel(a);
    !s && i.push(l), o.isBlured && (l.group.traverse(function(u) {
      uv(u);
    }), s && r.push(a)), o.isBlured = !1;
  }), A(i, function(n) {
    n && n.toggleBlurSeries && n.toggleBlurSeries(r, !1, t);
  });
}
function wl(e, t, r, i) {
  var n = i.getModel();
  r = r || "coordinateSystem";
  function a(u, c) {
    for (var h = 0; h < c.length; h++) {
      var d = u.getItemGraphicEl(c[h]);
      d && cv(d);
    }
  }
  if (e != null && !(!t || t === "none")) {
    var o = n.getSeriesByIndex(e), s = o.coordinateSystem;
    s && s.master && (s = s.master);
    var l = [];
    n.eachSeries(function(u) {
      var c = o === u, h = u.coordinateSystem;
      h && h.master && (h = h.master);
      var d = h && s ? h === s : c;
      if (!// Not blur other series if blurScope series
      (r === "series" && !c || r === "coordinateSystem" && !d || t === "series" && c)) {
        var f = i.getViewOfSeriesModel(u);
        if (f.group.traverse(function(p) {
          p.__highByOuter && c && t === "self" || vu(p);
        }), Ht(t))
          a(u.getData(), t);
        else if (z(t))
          for (var v = pt(t), g = 0; g < v.length; g++)
            a(u.getData(v[g]), t[v[g]]);
        l.push(u), hu(u).isBlured = !0;
      }
    }), n.eachComponent(function(u, c) {
      if (u !== "series") {
        var h = i.getViewOfComponentModel(c);
        h && h.toggleBlurSeries && h.toggleBlurSeries(l, !0, n);
      }
    });
  }
}
function bl(e, t, r) {
  if (!(e == null || t == null)) {
    var i = r.getModel().getComponent(e, t);
    if (i) {
      hu(i).isBlured = !0;
      var n = r.getViewOfComponentModel(i);
      !n || !n.focusBlurEnabled || n.group.traverse(function(a) {
        vu(a);
      });
    }
  }
}
function Mx(e, t, r) {
  var i = e.seriesIndex, n = e.getData(t.dataType);
  if (n) {
    var a = Yn(n, t);
    a = (N(a) ? a[0] : a) || 0;
    var o = n.getItemGraphicEl(a);
    if (!o)
      for (var s = n.count(), l = 0; !o && l < s; )
        o = n.getItemGraphicEl(l++);
    if (o) {
      var u = dt(o);
      wl(i, u.focus, u.blurScope, r);
    } else {
      var c = e.get(["emphasis", "focus"]), h = e.get(["emphasis", "blurScope"]);
      c != null && wl(i, c, h, r);
    }
  }
}
function pu(e, t, r, i) {
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
    if (dt(s[u]).focus === "self") {
      l = !0;
      break;
    }
  return {
    focusSelf: l,
    dispatchers: s
  };
}
function Dx(e, t, r) {
  var i = dt(e), n = pu(i.componentMainType, i.componentIndex, i.componentHighDownName, r), a = n.dispatchers, o = n.focusSelf;
  a ? (o && bl(i.componentMainType, i.componentIndex, r), A(a, function(s) {
    return ih(s, t);
  })) : (wl(i.seriesIndex, i.focus, i.blurScope, r), i.focus === "self" && bl(i.componentMainType, i.componentIndex, r), ih(e, t));
}
function kx(e, t, r) {
  vv(r);
  var i = dt(e), n = pu(i.componentMainType, i.componentIndex, i.componentHighDownName, r).dispatchers;
  n ? A(n, function(a) {
    return nh(a, t);
  }) : nh(e, t);
}
function Px(e, t, r) {
  if (xl(t)) {
    var i = t.dataType, n = e.getData(i), a = Yn(n, t);
    N(a) || (a = [a]), e[t.type === yn ? "toggleSelect" : t.type === mn ? "select" : "unselect"](a, i);
  }
}
function ah(e) {
  var t = e.getAllData();
  A(t, function(r) {
    var i = r.data, n = r.type;
    i.eachItemGraphicEl(function(a, o) {
      e.isSelected(o, n) ? hv(a) : fv(a);
    });
  });
}
function Lx(e) {
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
function Ix(e, t, r) {
  pv(e, !0), qe(e, Cx), Bx(e, t, r);
}
function Ex(e) {
  pv(e, !1);
}
function Rx(e, t, r, i) {
  i ? Ex(e) : Ix(e, t, r);
}
function Bx(e, t, r) {
  var i = dt(e);
  t != null ? (i.focus = t, i.blurScope = r) : i.focus && (i.focus = null);
}
var oh = ["emphasis", "blur", "select"], Ox = {
  itemStyle: "getItemStyle",
  lineStyle: "getLineStyle",
  areaStyle: "getAreaStyle"
};
function Nx(e, t, r, i) {
  r = r || "itemStyle";
  for (var n = 0; n < oh.length; n++) {
    var a = oh[n], o = t.getModel([a, r]), s = e.ensureState(a);
    s.style = o[Ox[r]]();
  }
}
function pv(e, t) {
  var r = t === !1, i = e;
  e.highDownSilentOnTouch && (i.__highDownSilentOnTouch = e.highDownSilentOnTouch), (!r || i.__highDownDispatcher) && (i.__highByOuter = i.__highByOuter || 0, i.__highDownDispatcher = !r);
}
function Sl(e) {
  return !!(e && e.__highDownDispatcher);
}
function Fx(e) {
  var t = eh[e];
  return t == null && th <= 32 && (t = eh[e] = th++), t;
}
function xl(e) {
  var t = e.type;
  return t === mn || t === Oa || t === yn;
}
function sh(e) {
  var t = e.type;
  return t === Hr || t === Ba;
}
function zx(e) {
  var t = av(e);
  t.normalFill = e.style.fill, t.normalStroke = e.style.stroke;
  var r = e.states.select || {};
  t.selectFill = r.style && r.style.fill || null, t.selectStroke = r.style && r.style.stroke || null;
}
var ii = ki.CMD, Ux = [[], [], []], lh = Math.sqrt, Vx = Math.atan2;
function Wx(e, t) {
  if (t) {
    var r = e.data, i = e.len(), n, a, o, s, l, u, c = ii.M, h = ii.C, d = ii.L, f = ii.R, v = ii.A, g = ii.Q;
    for (o = 0, s = 0; o < i; ) {
      switch (n = r[o++], s = o, a = 0, n) {
        case c:
          a = 1;
          break;
        case d:
          a = 1;
          break;
        case h:
          a = 3;
          break;
        case g:
          a = 2;
          break;
        case v:
          var p = t[4], m = t[5], y = lh(t[0] * t[0] + t[1] * t[1]), _ = lh(t[2] * t[2] + t[3] * t[3]), w = Vx(-t[1] / _, t[0] / y);
          r[o] *= y, r[o++] += p, r[o] *= _, r[o++] += m, r[o++] *= y, r[o++] *= _, r[o++] += w, r[o++] += w, o += 2, s = o;
          break;
        case f:
          u[0] = r[o++], u[1] = r[o++], Pe(u, u, t), r[s++] = u[0], r[s++] = u[1], u[0] += r[o++], u[1] += r[o++], Pe(u, u, t), r[s++] = u[0], r[s++] = u[1];
      }
      for (l = 0; l < a; l++) {
        var S = Ux[l];
        S[0] = r[o++], S[1] = r[o++], Pe(S, S, t), r[s++] = S[0], r[s++] = S[1];
      }
    }
    e.increaseVersion();
  }
}
var bs = Math.sqrt, ua = Math.sin, ca = Math.cos, Yi = Math.PI;
function uh(e) {
  return Math.sqrt(e[0] * e[0] + e[1] * e[1]);
}
function Tl(e, t) {
  return (e[0] * t[0] + e[1] * t[1]) / (uh(e) * uh(t));
}
function ch(e, t) {
  return (e[0] * t[1] < e[1] * t[0] ? -1 : 1) * Math.acos(Tl(e, t));
}
function hh(e, t, r, i, n, a, o, s, l, u, c) {
  var h = l * (Yi / 180), d = ca(h) * (e - r) / 2 + ua(h) * (t - i) / 2, f = -1 * ua(h) * (e - r) / 2 + ca(h) * (t - i) / 2, v = d * d / (o * o) + f * f / (s * s);
  v > 1 && (o *= bs(v), s *= bs(v));
  var g = (n === a ? -1 : 1) * bs((o * o * (s * s) - o * o * (f * f) - s * s * (d * d)) / (o * o * (f * f) + s * s * (d * d))) || 0, p = g * o * f / s, m = g * -s * d / o, y = (e + r) / 2 + ca(h) * p - ua(h) * m, _ = (t + i) / 2 + ua(h) * p + ca(h) * m, w = ch([1, 0], [(d - p) / o, (f - m) / s]), S = [(d - p) / o, (f - m) / s], b = [(-1 * d - p) / o, (-1 * f - m) / s], x = ch(S, b);
  if (Tl(S, b) <= -1 && (x = Yi), Tl(S, b) >= 1 && (x = 0), x < 0) {
    var T = Math.round(x / Yi * 1e6) / 1e6;
    x = Yi * 2 + T % 2 * Yi;
  }
  c.addData(u, y, _, o, s, w, x, h, a);
}
var Hx = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/ig, Gx = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;
function Yx(e) {
  var t = new ki();
  if (!e)
    return t;
  var r = 0, i = 0, n = r, a = i, o, s = ki.CMD, l = e.match(Hx);
  if (!l)
    return t;
  for (var u = 0; u < l.length; u++) {
    for (var c = l[u], h = c.charAt(0), d = void 0, f = c.match(Gx) || [], v = f.length, g = 0; g < v; g++)
      f[g] = parseFloat(f[g]);
    for (var p = 0; p < v; ) {
      var m = void 0, y = void 0, _ = void 0, w = void 0, S = void 0, b = void 0, x = void 0, T = r, C = i, M = void 0, D = void 0;
      switch (h) {
        case "l":
          r += f[p++], i += f[p++], d = s.L, t.addData(d, r, i);
          break;
        case "L":
          r = f[p++], i = f[p++], d = s.L, t.addData(d, r, i);
          break;
        case "m":
          r += f[p++], i += f[p++], d = s.M, t.addData(d, r, i), n = r, a = i, h = "l";
          break;
        case "M":
          r = f[p++], i = f[p++], d = s.M, t.addData(d, r, i), n = r, a = i, h = "L";
          break;
        case "h":
          r += f[p++], d = s.L, t.addData(d, r, i);
          break;
        case "H":
          r = f[p++], d = s.L, t.addData(d, r, i);
          break;
        case "v":
          i += f[p++], d = s.L, t.addData(d, r, i);
          break;
        case "V":
          i = f[p++], d = s.L, t.addData(d, r, i);
          break;
        case "C":
          d = s.C, t.addData(d, f[p++], f[p++], f[p++], f[p++], f[p++], f[p++]), r = f[p - 2], i = f[p - 1];
          break;
        case "c":
          d = s.C, t.addData(d, f[p++] + r, f[p++] + i, f[p++] + r, f[p++] + i, f[p++] + r, f[p++] + i), r += f[p - 2], i += f[p - 1];
          break;
        case "S":
          m = r, y = i, M = t.len(), D = t.data, o === s.C && (m += r - D[M - 4], y += i - D[M - 3]), d = s.C, T = f[p++], C = f[p++], r = f[p++], i = f[p++], t.addData(d, m, y, T, C, r, i);
          break;
        case "s":
          m = r, y = i, M = t.len(), D = t.data, o === s.C && (m += r - D[M - 4], y += i - D[M - 3]), d = s.C, T = r + f[p++], C = i + f[p++], r += f[p++], i += f[p++], t.addData(d, m, y, T, C, r, i);
          break;
        case "Q":
          T = f[p++], C = f[p++], r = f[p++], i = f[p++], d = s.Q, t.addData(d, T, C, r, i);
          break;
        case "q":
          T = f[p++] + r, C = f[p++] + i, r += f[p++], i += f[p++], d = s.Q, t.addData(d, T, C, r, i);
          break;
        case "T":
          m = r, y = i, M = t.len(), D = t.data, o === s.Q && (m += r - D[M - 4], y += i - D[M - 3]), r = f[p++], i = f[p++], d = s.Q, t.addData(d, m, y, r, i);
          break;
        case "t":
          m = r, y = i, M = t.len(), D = t.data, o === s.Q && (m += r - D[M - 4], y += i - D[M - 3]), r += f[p++], i += f[p++], d = s.Q, t.addData(d, m, y, r, i);
          break;
        case "A":
          _ = f[p++], w = f[p++], S = f[p++], b = f[p++], x = f[p++], T = r, C = i, r = f[p++], i = f[p++], d = s.A, hh(T, C, r, i, b, x, _, w, S, d, t);
          break;
        case "a":
          _ = f[p++], w = f[p++], S = f[p++], b = f[p++], x = f[p++], T = r, C = i, r += f[p++], i += f[p++], d = s.A, hh(T, C, r, i, b, x, _, w, S, d, t);
          break;
      }
    }
    (h === "z" || h === "Z") && (d = s.Z, t.addData(d), r = n, i = a), o = d;
  }
  return t.toStatic(), t;
}
var gv = (function(e) {
  G(t, e);
  function t() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return t.prototype.applyTransform = function(r) {
  }, t;
})(ot);
function mv(e) {
  return e.setData != null;
}
function yv(e, t) {
  var r = Yx(e), i = E({}, t);
  return i.buildPath = function(n) {
    if (mv(n)) {
      n.setData(r.data);
      var a = n.getContext();
      a && n.rebuildPath(a, 1);
    } else {
      var a = n;
      r.rebuildPath(a, 1);
    }
  }, i.applyTransform = function(n) {
    Wx(r, n), this.dirtyShape();
  }, i;
}
function Xx(e, t) {
  return new gv(yv(e, t));
}
function qx(e, t) {
  var r = yv(e, t), i = (function(n) {
    G(a, n);
    function a(o) {
      var s = n.call(this, o) || this;
      return s.applyTransform = r.applyTransform, s.buildPath = r.buildPath, s;
    }
    return a;
  })(gv);
  return i;
}
function Zx(e, t) {
  for (var r = [], i = e.length, n = 0; n < i; n++) {
    var a = e[n];
    r.push(a.getUpdatedPathProxy(!0));
  }
  var o = new ot(t);
  return o.createPathProxy(), o.buildPath = function(s) {
    if (mv(s)) {
      s.appendPath(r);
      var l = s.getContext();
      l && s.rebuildPath(l, 1);
    }
  }, o;
}
var Qx = /* @__PURE__ */ (function() {
  function e() {
    this.cx = 0, this.cy = 0, this.r = 0;
  }
  return e;
})(), ko = (function(e) {
  G(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new Qx();
  }, t.prototype.buildPath = function(r, i) {
    r.moveTo(i.cx + i.r, i.cy), r.arc(i.cx, i.cy, i.r, 0, Math.PI * 2);
  }, t;
})(ot);
ko.prototype.type = "circle";
var Kx = /* @__PURE__ */ (function() {
  function e() {
    this.cx = 0, this.cy = 0, this.rx = 0, this.ry = 0;
  }
  return e;
})(), gu = (function(e) {
  G(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new Kx();
  }, t.prototype.buildPath = function(r, i) {
    var n = 0.5522848, a = i.cx, o = i.cy, s = i.rx, l = i.ry, u = s * n, c = l * n;
    r.moveTo(a - s, o), r.bezierCurveTo(a - s, o - c, a - u, o - l, a, o - l), r.bezierCurveTo(a + u, o - l, a + s, o - c, a + s, o), r.bezierCurveTo(a + s, o + c, a + u, o + l, a, o + l), r.bezierCurveTo(a - u, o + l, a - s, o + c, a - s, o), r.closePath();
  }, t;
})(ot);
gu.prototype.type = "ellipse";
var _v = Math.PI, Ss = _v * 2, Pr = Math.sin, ni = Math.cos, Jx = Math.acos, Mt = Math.atan2, fh = Math.abs, _n = Math.sqrt, sn = Math.max, Te = Math.min, ue = 1e-4;
function jx(e, t, r, i, n, a, o, s) {
  var l = r - e, u = i - t, c = o - n, h = s - a, d = h * l - c * u;
  if (!(d * d < ue))
    return d = (c * (t - a) - h * (e - n)) / d, [e + d * l, t + d * u];
}
function ha(e, t, r, i, n, a, o) {
  var s = e - r, l = t - i, u = (o ? a : -a) / _n(s * s + l * l), c = u * l, h = -u * s, d = e + c, f = t + h, v = r + c, g = i + h, p = (d + v) / 2, m = (f + g) / 2, y = v - d, _ = g - f, w = y * y + _ * _, S = n - a, b = d * g - v * f, x = (_ < 0 ? -1 : 1) * _n(sn(0, S * S * w - b * b)), T = (b * _ - y * x) / w, C = (-b * y - _ * x) / w, M = (b * _ + y * x) / w, D = (-b * y + _ * x) / w, P = T - p, L = C - m, k = M - p, B = D - m;
  return P * P + L * L > k * k + B * B && (T = M, C = D), {
    cx: T,
    cy: C,
    x0: -c,
    y0: -h,
    x1: T * (n / S - 1),
    y1: C * (n / S - 1)
  };
}
function $x(e) {
  var t;
  if (N(e)) {
    var r = e.length;
    if (!r)
      return e;
    r === 1 ? t = [e[0], e[0], 0, 0] : r === 2 ? t = [e[0], e[0], e[1], e[1]] : r === 3 ? t = e.concat(e[2]) : t = e;
  } else
    t = [e, e, e, e];
  return t;
}
function tT(e, t) {
  var r, i = sn(t.r, 0), n = sn(t.r0 || 0, 0), a = i > 0, o = n > 0;
  if (!(!a && !o)) {
    if (a || (i = n, n = 0), n > i) {
      var s = i;
      i = n, n = s;
    }
    var l = t.startAngle, u = t.endAngle;
    if (!(isNaN(l) || isNaN(u))) {
      var c = t.cx, h = t.cy, d = !!t.clockwise, f = fh(u - l), v = f > Ss && f % Ss;
      if (v > ue && (f = v), !(i > ue))
        e.moveTo(c, h);
      else if (f > Ss - ue)
        e.moveTo(c + i * ni(l), h + i * Pr(l)), e.arc(c, h, i, l, u, !d), n > ue && (e.moveTo(c + n * ni(u), h + n * Pr(u)), e.arc(c, h, n, u, l, d));
      else {
        var g = void 0, p = void 0, m = void 0, y = void 0, _ = void 0, w = void 0, S = void 0, b = void 0, x = void 0, T = void 0, C = void 0, M = void 0, D = void 0, P = void 0, L = void 0, k = void 0, B = i * ni(l), O = i * Pr(l), X = n * ni(u), q = n * Pr(u), F = f > ue;
        if (F) {
          var Z = t.cornerRadius;
          Z && (r = $x(Z), g = r[0], p = r[1], m = r[2], y = r[3]);
          var J = fh(i - n) / 2;
          if (_ = Te(J, m), w = Te(J, y), S = Te(J, g), b = Te(J, p), C = x = sn(_, w), M = T = sn(S, b), (x > ue || T > ue) && (D = i * ni(u), P = i * Pr(u), L = n * ni(l), k = n * Pr(l), f < _v)) {
            var Y = jx(B, O, L, k, D, P, X, q);
            if (Y) {
              var gt = B - Y[0], bt = O - Y[1], Xt = D - Y[0], _e = P - Y[1], jt = 1 / Pr(Jx((gt * Xt + bt * _e) / (_n(gt * gt + bt * bt) * _n(Xt * Xt + _e * _e))) / 2), qt = _n(Y[0] * Y[0] + Y[1] * Y[1]);
              C = Te(x, (i - qt) / (jt + 1)), M = Te(T, (n - qt) / (jt - 1));
            }
          }
        }
        if (!F)
          e.moveTo(c + B, h + O);
        else if (C > ue) {
          var xt = Te(m, C), ht = Te(y, C), U = ha(L, k, B, O, i, xt, d), Q = ha(D, P, X, q, i, ht, d);
          e.moveTo(c + U.cx + U.x0, h + U.cy + U.y0), C < x && xt === ht ? e.arc(c + U.cx, h + U.cy, C, Mt(U.y0, U.x0), Mt(Q.y0, Q.x0), !d) : (xt > 0 && e.arc(c + U.cx, h + U.cy, xt, Mt(U.y0, U.x0), Mt(U.y1, U.x1), !d), e.arc(c, h, i, Mt(U.cy + U.y1, U.cx + U.x1), Mt(Q.cy + Q.y1, Q.cx + Q.x1), !d), ht > 0 && e.arc(c + Q.cx, h + Q.cy, ht, Mt(Q.y1, Q.x1), Mt(Q.y0, Q.x0), !d));
        } else
          e.moveTo(c + B, h + O), e.arc(c, h, i, l, u, !d);
        if (!(n > ue) || !F)
          e.lineTo(c + X, h + q);
        else if (M > ue) {
          var xt = Te(g, M), ht = Te(p, M), U = ha(X, q, D, P, n, -ht, d), Q = ha(B, O, L, k, n, -xt, d);
          e.lineTo(c + U.cx + U.x0, h + U.cy + U.y0), M < T && xt === ht ? e.arc(c + U.cx, h + U.cy, M, Mt(U.y0, U.x0), Mt(Q.y0, Q.x0), !d) : (ht > 0 && e.arc(c + U.cx, h + U.cy, ht, Mt(U.y0, U.x0), Mt(U.y1, U.x1), !d), e.arc(c, h, n, Mt(U.cy + U.y1, U.cx + U.x1), Mt(Q.cy + Q.y1, Q.cx + Q.x1), d), xt > 0 && e.arc(c + Q.cx, h + Q.cy, xt, Mt(Q.y1, Q.x1), Mt(Q.y0, Q.x0), !d));
        } else
          e.lineTo(c + X, h + q), e.arc(c, h, n, u, l, d);
      }
      e.closePath();
    }
  }
}
var eT = /* @__PURE__ */ (function() {
  function e() {
    this.cx = 0, this.cy = 0, this.r0 = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0, this.cornerRadius = 0;
  }
  return e;
})(), Zn = (function(e) {
  G(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new eT();
  }, t.prototype.buildPath = function(r, i) {
    tT(r, i);
  }, t.prototype.isZeroArea = function() {
    return this.shape.startAngle === this.shape.endAngle || this.shape.r === this.shape.r0;
  }, t;
})(ot);
Zn.prototype.type = "sector";
var rT = /* @__PURE__ */ (function() {
  function e() {
    this.cx = 0, this.cy = 0, this.r = 0, this.r0 = 0;
  }
  return e;
})(), mu = (function(e) {
  G(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new rT();
  }, t.prototype.buildPath = function(r, i) {
    var n = i.cx, a = i.cy, o = Math.PI * 2;
    r.moveTo(n + i.r, a), r.arc(n, a, i.r, 0, o, !1), r.moveTo(n + i.r0, a), r.arc(n, a, i.r0, 0, o, !0);
  }, t;
})(ot);
mu.prototype.type = "ring";
function iT(e, t, r, i) {
  var n = [], a = [], o = [], s = [], l, u, c, h;
  if (i) {
    c = [1 / 0, 1 / 0], h = [-1 / 0, -1 / 0];
    for (var d = 0, f = e.length; d < f; d++)
      di(c, c, e[d]), vi(h, h, e[d]);
    di(c, c, i[0]), vi(h, h, i[1]);
  }
  for (var d = 0, f = e.length; d < f; d++) {
    var v = e[d];
    if (r)
      l = e[d ? d - 1 : f - 1], u = e[(d + 1) % f];
    else if (d === 0 || d === f - 1) {
      n.push(F1(e[d]));
      continue;
    } else
      l = e[d - 1], u = e[d + 1];
    z1(a, u, l), zo(a, a, t);
    var g = $s(v, l), p = $s(v, u), m = g + p;
    m !== 0 && (g /= m, p /= m), zo(o, a, -g), zo(s, a, p);
    var y = nc([], v, o), _ = nc([], v, s);
    i && (vi(y, y, c), di(y, y, h), vi(_, _, c), di(_, _, h)), n.push(y), n.push(_);
  }
  return r && n.push(n.shift()), n;
}
function wv(e, t, r) {
  var i = t.smooth, n = t.points;
  if (n && n.length >= 2) {
    if (i) {
      var a = iT(n, i, r, t.smoothConstraint);
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
var nT = /* @__PURE__ */ (function() {
  function e() {
    this.points = null, this.smooth = 0, this.smoothConstraint = null;
  }
  return e;
})(), yu = (function(e) {
  G(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new nT();
  }, t.prototype.buildPath = function(r, i) {
    wv(r, i, !0);
  }, t;
})(ot);
yu.prototype.type = "polygon";
var aT = /* @__PURE__ */ (function() {
  function e() {
    this.points = null, this.percent = 1, this.smooth = 0, this.smoothConstraint = null;
  }
  return e;
})(), Qn = (function(e) {
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
    return new aT();
  }, t.prototype.buildPath = function(r, i) {
    wv(r, i, !1);
  }, t;
})(ot);
Qn.prototype.type = "polyline";
var oT = {}, sT = /* @__PURE__ */ (function() {
  function e() {
    this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.percent = 1;
  }
  return e;
})(), Ii = (function(e) {
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
    return new sT();
  }, t.prototype.buildPath = function(r, i) {
    var n, a, o, s;
    if (this.subPixelOptimize) {
      var l = iv(oT, i, this.style);
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
Ii.prototype.type = "line";
var Ot = [], lT = /* @__PURE__ */ (function() {
  function e() {
    this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.cpx1 = 0, this.cpy1 = 0, this.percent = 1;
  }
  return e;
})();
function dh(e, t, r) {
  var i = e.cpx2, n = e.cpy2;
  return i != null || n != null ? [
    (r ? pc : Et)(e.x1, e.cpx1, e.cpx2, e.x2, t),
    (r ? pc : Et)(e.y1, e.cpy1, e.cpy2, e.y2, t)
  ] : [
    (r ? gc : zt)(e.x1, e.cpx1, e.x2, t),
    (r ? gc : zt)(e.y1, e.cpy1, e.y2, t)
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
    return new lT();
  }, t.prototype.buildPath = function(r, i) {
    var n = i.x1, a = i.y1, o = i.x2, s = i.y2, l = i.cpx1, u = i.cpy1, c = i.cpx2, h = i.cpy2, d = i.percent;
    d !== 0 && (r.moveTo(n, a), c == null || h == null ? (d < 1 && (Qa(n, l, o, d, Ot), l = Ot[1], o = Ot[2], Qa(a, u, s, d, Ot), u = Ot[1], s = Ot[2]), r.quadraticCurveTo(l, u, o, s)) : (d < 1 && (Za(n, l, c, o, d, Ot), l = Ot[1], c = Ot[2], o = Ot[3], Za(a, u, h, s, d, Ot), u = Ot[1], h = Ot[2], s = Ot[3]), r.bezierCurveTo(l, u, c, h, o, s)));
  }, t.prototype.pointAt = function(r) {
    return dh(this.shape, r, !1);
  }, t.prototype.tangentAt = function(r) {
    var i = dh(this.shape, r, !0);
    return W1(i, i);
  }, t;
})(ot);
_u.prototype.type = "bezier-curve";
var uT = /* @__PURE__ */ (function() {
  function e() {
    this.cx = 0, this.cy = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0;
  }
  return e;
})(), Po = (function(e) {
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
    return new uT();
  }, t.prototype.buildPath = function(r, i) {
    var n = i.cx, a = i.cy, o = Math.max(i.r, 0), s = i.startAngle, l = i.endAngle, u = i.clockwise, c = Math.cos(s), h = Math.sin(s);
    r.moveTo(c * o + n, h * o + a), r.arc(n, a, o, s, l, !u);
  }, t;
})(ot);
Po.prototype.type = "arc";
var cT = (function(e) {
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
})(ot), bv = (function() {
  function e(t) {
    this.colorStops = t || [];
  }
  return e.prototype.addColorStop = function(t, r) {
    this.colorStops.push({
      offset: t,
      color: r
    });
  }, e;
})(), hT = (function(e) {
  G(t, e);
  function t(r, i, n, a, o, s) {
    var l = e.call(this, o) || this;
    return l.x = r ?? 0, l.y = i ?? 0, l.x2 = n ?? 1, l.y2 = a ?? 0, l.type = "linear", l.global = s || !1, l;
  }
  return t;
})(bv), fT = (function(e) {
  G(t, e);
  function t(r, i, n, a, o) {
    var s = e.call(this, a) || this;
    return s.x = r ?? 0.5, s.y = i ?? 0.5, s.r = n ?? 0.5, s.type = "radial", s.global = o || !1, s;
  }
  return t;
})(bv), Lr = [0, 0], Ir = [0, 0], fa = new H(), da = new H(), ro = (function() {
  function e(t, r) {
    this._corners = [], this._axes = [], this._origin = [0, 0];
    for (var i = 0; i < 4; i++)
      this._corners[i] = new H();
    for (var i = 0; i < 2; i++)
      this._axes[i] = new H();
    t && this.fromBoundingRect(t, r);
  }
  return e.prototype.fromBoundingRect = function(t, r) {
    var i = this._corners, n = this._axes, a = t.x, o = t.y, s = a + t.width, l = o + t.height;
    if (i[0].set(a, o), i[1].set(s, o), i[2].set(s, l), i[3].set(a, l), r)
      for (var u = 0; u < 4; u++)
        i[u].transform(r);
    H.sub(n[0], i[1], i[0]), H.sub(n[1], i[3], i[0]), n[0].normalize(), n[1].normalize();
    for (var u = 0; u < 2; u++)
      this._origin[u] = n[u].dot(i[0]);
  }, e.prototype.intersect = function(t, r) {
    var i = !0, n = !r;
    return fa.set(1 / 0, 1 / 0), da.set(0, 0), !this._intersectCheckOneSide(this, t, fa, da, n, 1) && (i = !1, n) || !this._intersectCheckOneSide(t, this, fa, da, n, -1) && (i = !1, n) || n || H.copy(r, i ? fa : da), i;
  }, e.prototype._intersectCheckOneSide = function(t, r, i, n, a, o) {
    for (var s = !0, l = 0; l < 2; l++) {
      var u = this._axes[l];
      if (this._getProjMinMaxOnAxis(l, t._corners, Lr), this._getProjMinMaxOnAxis(l, r._corners, Ir), Lr[1] < Ir[0] || Lr[0] > Ir[1]) {
        if (s = !1, a)
          return s;
        var c = Math.abs(Ir[0] - Lr[1]), h = Math.abs(Lr[0] - Ir[1]);
        Math.min(c, h) > n.len() && (c < h ? H.scale(n, u, -c * o) : H.scale(n, u, h * o));
      } else if (i) {
        var c = Math.abs(Ir[0] - Lr[1]), h = Math.abs(Lr[0] - Ir[1]);
        Math.min(c, h) < i.len() && (c < h ? H.scale(i, u, c * o) : H.scale(i, u, -h * o));
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
})(), dT = [], vT = (function(e) {
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
        n.needLocalTransform() && a.applyTransform(n.getLocalTransform(dT)), r.union(a);
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
})(qn), pT = wt();
function gT(e, t, r, i, n) {
  var a;
  if (t && t.ecModel) {
    var o = t.ecModel.getUpdatePayload();
    a = o && o.animation;
  }
  var s = t && t.isAnimationEnabled(), l = e === "update";
  if (s) {
    var u = void 0, c = void 0, h = void 0;
    i ? (u = K(i.duration, 200), c = K(i.easing, "cubicOut"), h = 0) : (u = t.getShallow(l ? "animationDurationUpdate" : "animationDuration"), c = t.getShallow(l ? "animationEasingUpdate" : "animationEasing"), h = t.getShallow(l ? "animationDelayUpdate" : "animationDelay")), a && (a.duration != null && (u = a.duration), a.easing != null && (c = a.easing), a.delay != null && (h = a.delay)), rt(h) && (h = h(r, n)), rt(u) && (u = u(r));
    var d = {
      duration: u || 0,
      delay: h,
      easing: c
    };
    return d;
  } else
    return null;
}
function wu(e, t, r, i, n, a, o) {
  var s = !1, l;
  rt(n) ? (o = a, a = n, n = null) : z(n) && (a = n.cb, o = n.during, s = n.isFrom, l = n.removeOpt, n = n.dataIndex);
  var u = e === "leave";
  u || t.stopAnimation("leave");
  var c = gT(e, i, n, u ? l || {} : null, i && i.getAnimationDelayParams ? i.getAnimationDelayParams(t, n) : null);
  if (c && c.duration > 0) {
    var h = c.duration, d = c.delay, f = c.easing, v = {
      duration: h,
      delay: d || 0,
      easing: f,
      done: a,
      force: !!a || !!o,
      // Set to final state in update/init animation.
      // So the post processing based on the path shape can be done correctly.
      setToFinal: !u,
      scope: e,
      during: o
    };
    s ? t.animateFrom(r, v) : t.animateTo(r, v);
  } else
    t.stopAnimation(), !s && t.attr(r), o && o(1), a && a();
}
function In(e, t, r, i, n, a) {
  wu("update", e, t, r, i, n, a);
}
function Na(e, t, r, i, n, a) {
  wu("enter", e, t, r, i, n, a);
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
function Sv(e, t, r, i, n, a) {
  wn(e) || wu("leave", e, t, r, i, n, a);
}
function vh(e, t, r, i) {
  e.removeTextContent(), e.removeTextGuideLine(), Sv(e, {
    style: {
      opacity: 0
    }
  }, t, r, i);
}
function xv(e, t, r) {
  function i() {
    e.parent && e.parent.remove(e);
  }
  e.isGroup ? e.traverse(function(n) {
    n.isGroup || vh(n, t, r, i);
  }) : vh(e, t, r, i);
}
function mT(e) {
  pT(e).oldStyle = e.style;
}
var io = Math.max, no = Math.min, Cl = {};
function yT(e) {
  return ot.extend(e);
}
var _T = qx;
function wT(e, t) {
  return _T(e, t);
}
function me(e, t) {
  Cl[e] = t;
}
function bT(e) {
  if (Cl.hasOwnProperty(e))
    return Cl[e];
}
function bu(e, t, r, i) {
  var n = Xx(e, t);
  return r && (i === "center" && (r = Cv(r, n.getBoundingRect())), Av(n, r)), n;
}
function Tv(e, t, r) {
  var i = new Zr({
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
        i.setStyle(Cv(t, a));
      }
    }
  });
  return i;
}
function Cv(e, t) {
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
var ST = Zx;
function Av(e, t) {
  if (e.applyTransform) {
    var r = e.getBoundingRect(), i = r.calculateTransform(t);
    e.applyTransform(i);
  }
}
function Su(e, t) {
  return iv(e, e, {
    lineWidth: t
  }), e;
}
function xT(e) {
  return nv(e.shape, e.shape, e.style), e;
}
var TT = zr;
function CT(e, t) {
  for (var r = ru([]); e && e !== t; )
    _i(r, e.getLocalTransform(), r), e = e.parent;
  return r;
}
function xu(e, t, r) {
  return t && !Ht(t) && (t = au.getLocalTransform(t)), r && (t = _d([], t)), Pe([], e, t);
}
function AT(e, t, r) {
  var i = t[4] === 0 || t[5] === 0 || t[0] === 0 ? 1 : Math.abs(2 * t[4] / t[0]), n = t[4] === 0 || t[5] === 0 || t[2] === 0 ? 1 : Math.abs(2 * t[4] / t[2]), a = [e === "left" ? -i : e === "right" ? i : 0, e === "top" ? -n : e === "bottom" ? n : 0];
  return a = xu(a, t, r), Math.abs(a[0]) > Math.abs(a[1]) ? a[0] > 0 ? "right" : "left" : a[1] > 0 ? "bottom" : "top";
}
function ph(e) {
  return !e.isGroup;
}
function MT(e) {
  return e.shape != null;
}
function DT(e, t, r) {
  if (!e || !t)
    return;
  function i(o) {
    var s = {};
    return o.traverse(function(l) {
      ph(l) && l.anid && (s[l.anid] = l);
    }), s;
  }
  function n(o) {
    var s = {
      x: o.x,
      y: o.y,
      rotation: o.rotation
    };
    return MT(o) && (s.shape = E({}, o.shape)), s;
  }
  var a = i(e);
  t.traverse(function(o) {
    if (ph(o) && o.anid) {
      var s = a[o.anid];
      if (s) {
        var l = n(o);
        o.attr(n(s)), In(o, l, r, dt(o).dataIndex);
      }
    }
  });
}
function kT(e, t) {
  return $(e, function(r) {
    var i = r[0];
    i = io(i, t.x), i = no(i, t.x + t.width);
    var n = r[1];
    return n = io(n, t.y), n = no(n, t.y + t.height), [i, n];
  });
}
function PT(e, t) {
  var r = io(e.x, t.x), i = no(e.x + e.width, t.x + t.width), n = io(e.y, t.y), a = no(e.y + e.height, t.y + t.height);
  if (i >= r && a >= n)
    return {
      x: r,
      y: n,
      width: i - r,
      height: a - n
    };
}
function Mv(e, t, r) {
  var i = E({
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
    return e.indexOf("image://") === 0 ? (n.image = e.slice(8), ct(n, r), new Zr(i)) : bu(e.replace("path://", ""), i, r, "center");
}
function LT(e, t, r, i, n) {
  for (var a = 0, o = n[n.length - 1]; a < n.length; a++) {
    var s = n[a];
    if (Dv(e, t, r, i, s[0], s[1], o[0], o[1]))
      return !0;
    o = s;
  }
}
function Dv(e, t, r, i, n, a, o, s) {
  var l = r - e, u = i - t, c = o - n, h = s - a, d = xs(c, h, l, u);
  if (IT(d))
    return !1;
  var f = e - n, v = t - a, g = xs(f, v, l, u) / d;
  if (g < 0 || g > 1)
    return !1;
  var p = xs(f, v, c, h) / d;
  return !(p < 0 || p > 1);
}
function xs(e, t, r, i) {
  return e * i - r * t;
}
function IT(e) {
  return e <= 1e-6 && e >= -1e-6;
}
function Tu(e) {
  var t = e.itemTooltipOption, r = e.componentModel, i = e.itemName, n = W(t) ? {
    formatter: t
  } : t, a = r.mainType, o = r.componentIndex, s = {
    componentType: a,
    name: i,
    $vars: ["name"]
  };
  s[a + "Index"] = o;
  var l = e.formatterParamsExtra;
  l && A(pt(l), function(c) {
    Mi(s, c) || (s[c] = l[c], s.$vars.push(c));
  });
  var u = dt(e.el);
  u.componentMainType = a, u.componentIndex = o, u.tooltipConfig = {
    name: i,
    option: ct({
      content: i,
      encodeHTMLContent: !0,
      formatterParams: s
    }, n)
  };
}
function gh(e, t) {
  var r;
  e.isGroup && (r = t(e)), r || e.traverse(t);
}
function kv(e, t) {
  if (e)
    if (N(e))
      for (var r = 0; r < e.length; r++)
        gh(e[r], t);
    else
      gh(e, t);
}
me("circle", ko);
me("ellipse", gu);
me("sector", Zn);
me("ring", mu);
me("polygon", yu);
me("polyline", Qn);
me("rect", de);
me("line", Ii);
me("bezierCurve", _u);
me("arc", Po);
const ET = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Arc: Po,
  BezierCurve: _u,
  BoundingRect: it,
  Circle: ko,
  CompoundPath: cT,
  Ellipse: gu,
  Group: He,
  Image: Zr,
  IncrementalDisplayable: vT,
  Line: Ii,
  LinearGradient: hT,
  OrientedBoundingRect: ro,
  Path: ot,
  Point: H,
  Polygon: yu,
  Polyline: Qn,
  RadialGradient: fT,
  Rect: de,
  Ring: mu,
  Sector: Zn,
  Text: pe,
  applyTransform: xu,
  clipPointsByRect: kT,
  clipRectByRect: PT,
  createIcon: Mv,
  extendPath: wT,
  extendShape: yT,
  getShapeClass: bT,
  getTransform: CT,
  groupTransition: DT,
  initProps: Na,
  isElementRemoved: wn,
  lineLineIntersect: Dv,
  linePolygonIntersect: LT,
  makeImage: Tv,
  makePath: bu,
  mergePath: ST,
  registerShape: me,
  removeElement: Sv,
  removeElementWithFadeOut: xv,
  resizePath: Av,
  setTooltipConfig: Tu,
  subPixelOptimize: TT,
  subPixelOptimizeLine: Su,
  subPixelOptimizeRect: xT,
  transformDirection: AT,
  traverseElements: kv,
  updateProps: In
}, Symbol.toStringTag, { value: "Module" }));
var Lo = {};
function RT(e, t) {
  for (var r = 0; r < Ie.length; r++) {
    var i = Ie[r], n = t[i], a = e.ensureState(i);
    a.style = a.style || {}, a.style.text = n;
  }
  var o = e.currentStates.slice();
  e.clearStates(!0), e.setStyle({
    text: t.normal
  }), e.useStates(o, !0);
}
function mh(e, t, r) {
  var i = e.labelFetcher, n = e.labelDataIndex, a = e.labelDimIndex, o = t.normal, s;
  i && (s = i.getFormattedLabel(n, "normal", null, a, o && o.get("formatter"), r != null ? {
    interpolatedValue: r
  } : null)), s == null && (s = rt(e.defaultText) ? e.defaultText(n, e, r) : e.defaultText);
  for (var l = {
    normal: s
  }, u = 0; u < Ie.length; u++) {
    var c = Ie[u], h = t[c];
    l[c] = K(i ? i.getFormattedLabel(n, c, null, a, h && h.get("formatter")) : null, s);
  }
  return l;
}
function BT(e, t, r, i) {
  r = r || Lo;
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
    var u = mh(r, t), c = t.normal, h = !!c.getShallow("show"), d = En(c, i, r, !1, !n);
    d.text = u.normal, n || e.setTextConfig(yh(c, r, !1));
    for (var o = 0; o < Ie.length; o++) {
      var f = Ie[o], s = t[f];
      if (s) {
        var v = l.ensureState(f), g = !!K(s.getShallow("show"), h);
        if (g !== h && (v.ignore = !g), v.style = En(s, i, r, !0, !n), v.style.text = u[f], !n) {
          var p = e.ensureState(f);
          p.textConfig = yh(s, r, !0);
        }
      }
    }
    l.silent = !!c.getShallow("silent"), l.style.x != null && (d.x = l.style.x), l.style.y != null && (d.y = l.style.y), l.ignore = !h, l.useStyle(d), l.dirty(), r.enableTextSetter && (UT(l).setLabelText = function(m) {
      var y = mh(r, t, m);
      RT(l, y);
    });
  } else l && (l.ignore = !0);
  e.dirty();
}
function OT(e, t) {
  t = t || "label";
  for (var r = {
    normal: e.getModel(t)
  }, i = 0; i < Ie.length; i++) {
    var n = Ie[i];
    r[n] = e.getModel([n, t]);
  }
  return r;
}
function En(e, t, r, i, n) {
  var a = {};
  return NT(a, e, r, i, n), t && E(a, t), a;
}
function yh(e, t, r) {
  t = t || {};
  var i = {}, n, a = e.getShallow("rotate"), o = K(e.getShallow("distance"), r ? null : 5), s = e.getShallow("offset");
  return n = e.getShallow("position") || (r ? null : "inside"), n === "outside" && (n = t.defaultOutsidePosition || "top"), n != null && (i.position = n), s != null && (i.offset = s), a != null && (a *= Math.PI / 180, i.rotation = a), o != null && (i.distance = o), i.outsideFill = e.get("color") === "inherit" ? t.inheritColor || null : "auto", i;
}
function NT(e, t, r, i, n) {
  r = r || Lo;
  var a = t.ecModel, o = a && a.option.textStyle, s = FT(t), l;
  if (s) {
    l = {};
    for (var u in s)
      if (s.hasOwnProperty(u)) {
        var c = t.getModel(["rich", u]);
        Sh(l[u] = {}, c, o, r, i, n, !1, !0);
      }
  }
  l && (e.rich = l);
  var h = t.get("overflow");
  h && (e.overflow = h);
  var d = t.get("minMargin");
  d != null && (e.margin = d), Sh(e, t, o, r, i, n, !0, !1);
}
function FT(e) {
  for (var t; e && e !== e.ecModel; ) {
    var r = (e.option || Lo).rich;
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
var _h = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY"], wh = ["align", "lineHeight", "width", "height", "tag", "verticalAlign", "ellipsis"], bh = ["padding", "borderWidth", "borderRadius", "borderDashOffset", "backgroundColor", "borderColor", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"];
function Sh(e, t, r, i, n, a, o, s) {
  r = !n && r || Lo;
  var l = i && i.inheritColor, u = t.getShallow("color"), c = t.getShallow("textBorderColor"), h = K(t.getShallow("opacity"), r.opacity);
  (u === "inherit" || u === "auto") && (l ? u = l : u = null), (c === "inherit" || c === "auto") && (l ? c = l : c = null), a || (u = u || r.color, c = c || r.textBorderColor), u != null && (e.fill = u), c != null && (e.stroke = c);
  var d = K(t.getShallow("textBorderWidth"), r.textBorderWidth);
  d != null && (e.lineWidth = d);
  var f = K(t.getShallow("textBorderType"), r.textBorderType);
  f != null && (e.lineDash = f);
  var v = K(t.getShallow("textBorderDashOffset"), r.textBorderDashOffset);
  v != null && (e.lineDashOffset = v), !n && h == null && !s && (h = i && i.defaultOpacity), h != null && (e.opacity = h), !n && !a && e.fill == null && i.inheritColor && (e.fill = i.inheritColor);
  for (var g = 0; g < _h.length; g++) {
    var p = _h[g], m = K(t.getShallow(p), r[p]);
    m != null && (e[p] = m);
  }
  for (var g = 0; g < wh.length; g++) {
    var p = wh[g], m = t.getShallow(p);
    m != null && (e[p] = m);
  }
  if (e.verticalAlign == null) {
    var y = t.getShallow("baseline");
    y != null && (e.verticalAlign = y);
  }
  if (!o || !i.disableBox) {
    for (var g = 0; g < bh.length; g++) {
      var p = bh[g], m = t.getShallow(p);
      m != null && (e[p] = m);
    }
    var _ = t.getShallow("borderType");
    _ != null && (e.borderDash = _), (e.backgroundColor === "auto" || e.backgroundColor === "inherit") && l && (e.backgroundColor = l), (e.borderColor === "auto" || e.borderColor === "inherit") && l && (e.borderColor = l);
  }
}
function zT(e, t) {
  var r = t && t.getModel("textStyle");
  return Me([
    // FIXME in node-canvas fontWeight is before fontStyle
    e.fontStyle || r && r.getShallow("fontStyle") || "",
    e.fontWeight || r && r.getShallow("fontWeight") || "",
    (e.fontSize || r && r.getShallow("fontSize") || 12) + "px",
    e.fontFamily || r && r.getShallow("fontFamily") || "sans-serif"
  ].join(" "));
}
var UT = wt(), VT = ["textStyle", "color"], Ts = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "padding", "lineHeight", "rich", "width", "height", "overflow"], Cs = new pe(), WT = (
  /** @class */
  (function() {
    function e() {
    }
    return e.prototype.getTextColor = function(t) {
      var r = this.ecModel;
      return this.getShallow("color") || (!t && r ? r.get(VT) : null);
    }, e.prototype.getFont = function() {
      return zT({
        fontStyle: this.getShallow("fontStyle"),
        fontWeight: this.getShallow("fontWeight"),
        fontSize: this.getShallow("fontSize"),
        fontFamily: this.getShallow("fontFamily")
      }, this.ecModel);
    }, e.prototype.getTextRect = function(t) {
      for (var r = {
        text: t,
        verticalAlign: this.getShallow("verticalAlign") || this.getShallow("baseline")
      }, i = 0; i < Ts.length; i++)
        r[Ts[i]] = this.getShallow(Ts[i]);
      return Cs.useStyle(r), Cs.update(), Cs.getBoundingRect();
    }, e;
  })()
), Pv = [
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
], HT = Ln(Pv), GT = (
  /** @class */
  (function() {
    function e() {
    }
    return e.prototype.getLineStyle = function(t) {
      return HT(this, t);
    }, e;
  })()
), Lv = [
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
], YT = Ln(Lv), XT = (
  /** @class */
  (function() {
    function e() {
    }
    return e.prototype.getItemStyle = function(t, r) {
      return YT(this, t, r);
    }, e;
  })()
), vt = (
  /** @class */
  (function() {
    function e(t, r, i) {
      this.parentModel = r, this.ecModel = i, this.option = t;
    }
    return e.prototype.init = function(t, r, i) {
    }, e.prototype.mergeOption = function(t, r) {
      mt(this.option, t, !0);
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
      return new t(j(this.option));
    }, e.prototype.parsePath = function(t) {
      return typeof t == "string" ? t.split(".") : t;
    }, e.prototype.resolveParentPath = function(t) {
      return t;
    }, e.prototype.isAnimationEnabled = function() {
      if (!V.node && this.option) {
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
uu(vt);
xS(vt);
Xe(vt, GT);
Xe(vt, XT);
Xe(vt, DS);
Xe(vt, WT);
var qT = Math.round(Math.random() * 10);
function Io(e) {
  return [e || "", qT++].join("_");
}
function ZT(e) {
  var t = {};
  e.registerSubTypeDefaulter = function(r, i) {
    var n = De(r);
    t[n.main] = i;
  }, e.determineSubType = function(r, i) {
    var n = i.type;
    if (!n) {
      var a = De(r).main;
      e.hasSubTypes(r) && t[a] && (n = t[a](i));
    }
    return n;
  };
}
function QT(e, t) {
  e.topologicalTravel = function(a, o, s, l) {
    if (!a.length)
      return;
    var u = r(o), c = u.graph, h = u.noEntryList, d = {};
    for (A(a, function(y) {
      d[y] = !0;
    }); h.length; ) {
      var f = h.pop(), v = c[f], g = !!d[f];
      g && (s.call(l, f, v.originalDeps.slice()), delete d[f]), A(v.successor, g ? m : p);
    }
    A(d, function() {
      var y = "";
      throw new Error(y);
    });
    function p(y) {
      c[y].entryCount--, c[y].entryCount === 0 && h.push(y);
    }
    function m(y) {
      d[y] = !0, p(y);
    }
  };
  function r(a) {
    var o = {}, s = [];
    return A(a, function(l) {
      var u = i(o, l), c = u.originalDeps = t(l), h = n(c, a);
      u.entryCount = h.length, u.entryCount === 0 && s.push(l), A(h, function(d) {
        st(u.predecessor, d) < 0 && u.predecessor.push(d);
        var f = i(o, d);
        st(f.successor, d) < 0 && f.successor.push(l);
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
      st(o, l) >= 0 && s.push(l);
    }), s;
  }
}
const KT = {
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
}, JT = {
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
var ao = "ZH", Cu = "EN", Si = Cu, Fa = {}, Au = {}, Iv = V.domSupported ? (function() {
  var e = (
    /* eslint-disable-next-line */
    (document.documentElement.lang || navigator.language || navigator.browserLanguage || Si).toUpperCase()
  );
  return e.indexOf(ao) > -1 ? ao : Si;
})() : Si;
function Ev(e, t) {
  e = e.toUpperCase(), Au[e] = new vt(t), Fa[e] = t;
}
function jT(e) {
  if (W(e)) {
    var t = Fa[e.toUpperCase()] || {};
    return e === ao || e === Cu ? j(t) : mt(j(t), j(Fa[Si]), !1);
  } else
    return mt(j(e), j(Fa[Si]), !1);
}
function $T(e) {
  return Au[e];
}
function tC() {
  return Au[Si];
}
Ev(Cu, KT);
Ev(ao, JT);
function je(e, t) {
  return e += "", "0000".substr(0, t - e.length) + e;
}
function Rv(e, t, r, i) {
  var n = To(e), a = n[eC(r)](), o = n[rC(r)]() + 1, s = Math.floor((o - 1) / 3) + 1, l = n[iC(r)](), u = n["get" + (r ? "UTC" : "") + "Day"](), c = n[nC(r)](), h = (c - 1) % 12 + 1, d = n[aC(r)](), f = n[oC(r)](), v = n[sC(r)](), g = c >= 12 ? "pm" : "am", p = g.toUpperCase(), m = i instanceof vt ? i : $T(Iv) || tC(), y = m.getModel("time"), _ = y.get("month"), w = y.get("monthAbbr"), S = y.get("dayOfWeek"), b = y.get("dayOfWeekAbbr");
  return (t || "").replace(/{a}/g, g + "").replace(/{A}/g, p + "").replace(/{yyyy}/g, a + "").replace(/{yy}/g, je(a % 100 + "", 2)).replace(/{Q}/g, s + "").replace(/{MMMM}/g, _[o - 1]).replace(/{MMM}/g, w[o - 1]).replace(/{MM}/g, je(o, 2)).replace(/{M}/g, o + "").replace(/{dd}/g, je(l, 2)).replace(/{d}/g, l + "").replace(/{eeee}/g, S[u]).replace(/{ee}/g, b[u]).replace(/{e}/g, u + "").replace(/{HH}/g, je(c, 2)).replace(/{H}/g, c + "").replace(/{hh}/g, je(h + "", 2)).replace(/{h}/g, h + "").replace(/{mm}/g, je(d, 2)).replace(/{m}/g, d + "").replace(/{ss}/g, je(f, 2)).replace(/{s}/g, f + "").replace(/{SSS}/g, je(v, 3)).replace(/{S}/g, v + "");
}
function eC(e) {
  return e ? "getUTCFullYear" : "getFullYear";
}
function rC(e) {
  return e ? "getUTCMonth" : "getMonth";
}
function iC(e) {
  return e ? "getUTCDate" : "getDate";
}
function nC(e) {
  return e ? "getUTCHours" : "getHours";
}
function aC(e) {
  return e ? "getUTCMinutes" : "getMinutes";
}
function oC(e) {
  return e ? "getUTCSeconds" : "getSeconds";
}
function sC(e) {
  return e ? "getUTCMilliseconds" : "getMilliseconds";
}
function lC(e) {
  if (!iS(e))
    return W(e) ? e : "-";
  var t = (e + "").split(".");
  return t[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (t.length > 1 ? "." + t[1] : "");
}
function Bv(e, t) {
  return e = (e || "").toLowerCase().replace(/-(.)/g, function(r, i) {
    return i.toUpperCase();
  }), t && e && (e = e.charAt(0).toUpperCase() + e.slice(1)), e;
}
var Mu = dd;
function Al(e, t, r) {
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
    } else return Rv(l, i, r);
  }
  if (t === "ordinal")
    return Js(e) ? n(e) : yt(e) && a(e) ? e + "" : "-";
  var u = $a(e);
  return a(u) ? lC(u) : Js(e) ? n(e) : typeof e == "boolean" ? e + "" : "-";
}
var xh = ["a", "b", "c", "d", "e", "f", "g"], As = function(e, t) {
  return "{" + e + (t ?? "") + "}";
};
function Ov(e, t, r) {
  N(t) || (t = [t]);
  var i = t.length;
  if (!i)
    return "";
  for (var n = t[0].$vars || [], a = 0; a < n.length; a++) {
    var o = xh[a];
    e = e.replace(As(o), As(o, 0));
  }
  for (var s = 0; s < i; s++)
    for (var l = 0; l < n.length; l++) {
      var u = t[s][n[l]];
      e = e.replace(As(xh[l], s), r ? Ft(u) : u);
    }
  return e;
}
function uC(e, t) {
  var r = W(e) ? {
    color: e,
    extraCssText: t
  } : e || {}, i = r.color, n = r.type;
  t = r.extraCssText;
  var a = r.renderMode || "html";
  if (!i)
    return "";
  if (a === "html")
    return n === "subItem" ? '<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:' + Ft(i) + ";" + (t || "") + '"></span>' : '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:' + Ft(i) + ";" + (t || "") + '"></span>';
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
function Rn(e, t) {
  return t = t || "transparent", W(e) ? e : z(e) && e.colorStops && (e.colorStops[0] || {}).color || t;
}
var za = A, cC = ["left", "right", "top", "bottom", "width", "height"], va = [["width", "left", "right"], ["height", "top", "bottom"]];
function Nv(e, t, r, i, n) {
  var a = 0, o = 0;
  i == null && (i = 1 / 0), n == null && (n = 1 / 0);
  var s = 0;
  t.eachChild(function(l, u) {
    var c = l.getBoundingRect(), h = t.childAt(u + 1), d = h && h.getBoundingRect(), f, v;
    if (e === "horizontal") {
      var g = c.width + (d ? -d.x + c.x : 0);
      f = a + g, f > i || l.newline ? (a = 0, f = g, o += s + r, s = c.height) : s = Math.max(s, c.height);
    } else {
      var p = c.height + (d ? -d.y + c.y : 0);
      v = o + p, v > n || l.newline ? (a += s + r, o = 0, v = p, s = c.width) : s = Math.max(s, c.width);
    }
    l.newline || (l.x = a, l.y = o, l.markRedraw(), e === "horizontal" ? a = f + r : o = v + r);
  });
}
Qt(Nv, "vertical");
Qt(Nv, "horizontal");
function Fv(e, t, r) {
  r = Mu(r || 0);
  var i = t.width, n = t.height, a = _t(e.left, i), o = _t(e.top, n), s = _t(e.right, i), l = _t(e.bottom, n), u = _t(e.width, i), c = _t(e.height, n), h = r[2] + r[0], d = r[1] + r[3], f = e.aspect;
  switch (isNaN(u) && (u = i - s - d - a), isNaN(c) && (c = n - l - h - o), f != null && (isNaN(u) && isNaN(c) && (f > i / n ? u = i * 0.8 : c = n * 0.8), isNaN(u) && (u = f * c), isNaN(c) && (c = u / f)), isNaN(a) && (a = i - s - u - d), isNaN(o) && (o = n - l - c - h), e.left || e.right) {
    case "center":
      a = i / 2 - u / 2 - r[3];
      break;
    case "right":
      a = i - u - d;
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
  a = a || 0, o = o || 0, isNaN(u) && (u = i - d - a - (s || 0)), isNaN(c) && (c = n - h - o - (l || 0));
  var v = new it(a + r[3], o + r[0], u, c);
  return v.margin = r, v;
}
function oo(e) {
  var t = e.layoutMode || e.constructor.layoutMode;
  return z(t) ? t : t ? {
    type: t
  } : null;
}
function so(e, t, r) {
  var i = r && r.ignoreSize;
  !N(i) && (i = [i, i]);
  var n = o(va[0], 0), a = o(va[1], 1);
  u(va[0], e, n), u(va[1], e, a);
  function o(c, h) {
    var d = {}, f = 0, v = {}, g = 0, p = 2;
    if (za(c, function(_) {
      v[_] = e[_];
    }), za(c, function(_) {
      s(t, _) && (d[_] = v[_] = t[_]), l(d, _) && f++, l(v, _) && g++;
    }), i[h])
      return l(t, c[1]) ? v[c[2]] = null : l(t, c[2]) && (v[c[1]] = null), v;
    if (g === p || !f)
      return v;
    if (f >= p)
      return d;
    for (var m = 0; m < c.length; m++) {
      var y = c[m];
      if (!s(d, y) && s(e, y)) {
        d[y] = e[y];
        break;
      }
    }
    return d;
  }
  function s(c, h) {
    return c.hasOwnProperty(h);
  }
  function l(c, h) {
    return c[h] != null && c[h] !== "auto";
  }
  function u(c, h, d) {
    za(c, function(f) {
      h[f] = d[f];
    });
  }
}
function zv(e) {
  return hC({}, e);
}
function hC(e, t) {
  return t && e && za(cC, function(r) {
    t.hasOwnProperty(r) && (e[r] = t[r]);
  }), e;
}
var fC = wt(), at = (
  /** @class */
  (function(e) {
    G(t, e);
    function t(r, i, n) {
      var a = e.call(this, r, i, n) || this;
      return a.uid = Io("ec_cpt_model"), a;
    }
    return t.prototype.init = function(r, i, n) {
      this.mergeDefaultAndTheme(r, n);
    }, t.prototype.mergeDefaultAndTheme = function(r, i) {
      var n = oo(this), a = n ? zv(r) : {}, o = i.getTheme();
      mt(r, o.get(this.mainType)), mt(r, this.getDefaultOption()), n && so(r, a, n);
    }, t.prototype.mergeOption = function(r, i) {
      mt(this.option, r, !0);
      var n = oo(this);
      n && so(this.option, r, n);
    }, t.prototype.optionUpdated = function(r, i) {
    }, t.prototype.getDefaultOption = function() {
      var r = this.constructor;
      if (!wS(r))
        return r.defaultOption;
      var i = fC(this);
      if (!i.defaultOption) {
        for (var n = [], a = r; a; ) {
          var o = a.prototype.defaultOption;
          o && n.push(o), a = a.superClass;
        }
        for (var s = {}, l = n.length - 1; l >= 0; l--)
          s = mt(s, n[l], !0);
        i.defaultOption = s;
      }
      return i.defaultOption;
    }, t.prototype.getReferringComponents = function(r, i) {
      var n = r + "Index", a = r + "Id";
      return Xn(this.ecModel, r, {
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
  })(vt)
);
Qd(at, vt);
cu(at);
ZT(at);
QT(at, dC);
function dC(e) {
  var t = [];
  return A(at.getClassesByMainType(e), function(r) {
    t = t.concat(r.dependencies || r.prototype.dependencies || []);
  }), t = $(t, function(r) {
    return De(r).main;
  }), e !== "dataset" && st(t, "dataset") <= 0 && t.unshift("dataset"), t;
}
var Uv = "";
typeof navigator < "u" && (Uv = navigator.platform || "");
var ai = "rgba(0, 0, 0, 0.2)";
const vC = {
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
    fontFamily: Uv.match(/^Win/) ? "Microsoft YaHei" : "sans-serif",
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
var Vv = tt(["tooltip", "label", "itemName", "itemId", "itemGroupId", "itemChildGroupId", "seriesName"]), Re = "original", Yt = "arrayRows", ye = "objectRows", Be = "keyedColumns", cr = "typedArray", Wv = "unknown", Ve = "column", Ei = "row", Tt = {
  Must: 1,
  Might: 2,
  Not: 3
  // Other cases
}, pC = wt();
function gC(e) {
  pC(e).datasetMap = tt();
}
function mC(e, t, r) {
  var i = {}, n = Hv(e);
  if (!n)
    return i;
  var a = t.sourceFormat, o = t.dimensionsDefine, s;
  (a === ye || a === Be) && A(o, function(c, h) {
    (z(c) ? c.name : c) === "name" && (s = h);
  });
  var l = (function() {
    for (var c = {}, h = {}, d = [], f = 0, v = Math.min(5, r); f < v; f++) {
      var g = Yv(t.data, a, t.seriesLayoutBy, o, t.startIndex, f);
      d.push(g);
      var p = g === Tt.Not;
      if (p && c.v == null && f !== s && (c.v = f), (c.n == null || c.n === c.v || !p && d[c.n] === Tt.Not) && (c.n = f), m(c) && d[c.n] !== Tt.Not)
        return c;
      p || (g === Tt.Might && h.v == null && f !== s && (h.v = f), (h.n == null || h.n === h.v) && (h.n = f));
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
function Hv(e) {
  var t = e.get("data", !0);
  if (!t)
    return Xn(e.ecModel, "dataset", {
      index: e.get("datasetIndex", !0),
      id: e.get("datasetId", !0)
    }, lu).models[0];
}
function yC(e) {
  return !e.get("transform", !0) && !e.get("fromTransformResult", !0) ? [] : Xn(e.ecModel, "dataset", {
    index: e.get("fromDatasetIndex", !0),
    id: e.get("fromDatasetId", !0)
  }, lu).models;
}
function Gv(e, t) {
  return Yv(e.data, e.sourceFormat, e.seriesLayoutBy, e.dimensionsDefine, e.startIndex, t);
}
function Yv(e, t, r, i, n, a) {
  var o, s = 5;
  if (Gt(e))
    return Tt.Not;
  var l, u;
  if (i) {
    var c = i[a];
    z(c) ? (l = c.name, u = c.type) : W(c) && (l = c);
  }
  if (u != null)
    return u === "ordinal" ? Tt.Must : Tt.Not;
  if (t === Yt) {
    var h = e;
    if (r === Ei) {
      for (var d = h[a], f = 0; f < (d || []).length && f < s; f++)
        if ((o = w(d[n + f])) != null)
          return o;
    } else
      for (var f = 0; f < h.length && f < s; f++) {
        var v = h[n + f];
        if (v && (o = w(v[a])) != null)
          return o;
      }
  } else if (t === ye) {
    var g = e;
    if (!l)
      return Tt.Not;
    for (var f = 0; f < g.length && f < s; f++) {
      var p = g[f];
      if (p && (o = w(p[l])) != null)
        return o;
    }
  } else if (t === Be) {
    var m = e;
    if (!l)
      return Tt.Not;
    var d = m[l];
    if (!d || Gt(d))
      return Tt.Not;
    for (var f = 0; f < d.length && f < s; f++)
      if ((o = w(d[f])) != null)
        return o;
  } else if (t === Re)
    for (var y = e, f = 0; f < y.length && f < s; f++) {
      var p = y[f], _ = Co(p);
      if (!N(_))
        return Tt.Not;
      if ((o = w(_[a])) != null)
        return o;
    }
  function w(S) {
    var b = W(S);
    if (S != null && Number.isFinite(Number(S)) && S !== "")
      return b ? Tt.Might : Tt.Not;
    if (b && S !== "-")
      return Tt.Must;
  }
  return Tt.Not;
}
var _C = tt();
function wC(e, t, r) {
  var i = _C.get(t);
  if (!i)
    return r;
  var n = i(e);
  return n ? r.concat(n) : r;
}
var Th = wt();
wt();
var Du = (
  /** @class */
  (function() {
    function e() {
    }
    return e.prototype.getColorFromPalette = function(t, r, i) {
      var n = Rt(this.get("color", !0)), a = this.get("colorLayer", !0);
      return SC(this, Th, n, a, t, r, i);
    }, e.prototype.clearColorPalette = function() {
      xC(this, Th);
    }, e;
  })()
);
function bC(e, t) {
  for (var r = e.length, i = 0; i < r; i++)
    if (e[i].length > t)
      return e[i];
  return e[r - 1];
}
function SC(e, t, r, i, n, a, o) {
  a = a || e;
  var s = t(a), l = s.paletteIdx || 0, u = s.paletteNameMap = s.paletteNameMap || {};
  if (u.hasOwnProperty(n))
    return u[n];
  var c = o == null || !i ? r : bC(i, o);
  if (c = c || r, !(!c || !c.length)) {
    var h = c[l];
    return n && (u[n] = h), s.paletteIdx = (l + 1) % c.length, h;
  }
}
function xC(e, t) {
  t(e).paletteIdx = 0, t(e).paletteNameMap = {};
}
var pa, Xi, Ch, Ah = "\0_ec_inner", TC = 1, ku = (
  /** @class */
  (function(e) {
    G(t, e);
    function t() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return t.prototype.init = function(r, i, n, a, o, s) {
      a = a || {}, this.option = null, this._theme = new vt(a), this._locale = new vt(o), this._optionManager = s;
    }, t.prototype.setOption = function(r, i, n) {
      var a = kh(i);
      this._optionManager.setOption(r, n, a), this._resetOption(null, a);
    }, t.prototype.resetOption = function(r, i) {
      return this._resetOption(r, kh(i));
    }, t.prototype._resetOption = function(r, i) {
      var n = !1, a = this._optionManager;
      if (!r || r === "recreate") {
        var o = a.mountOption(r === "recreate");
        !this.option || r === "recreate" ? Ch(this, o) : (this.restoreData(), this._mergeOption(o, i)), n = !0;
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
      var n = this.option, a = this._componentsMap, o = this._componentsCount, s = [], l = tt(), u = i && i.replaceMergeMainTypeMap;
      gC(this), A(r, function(h, d) {
        h != null && (at.hasClass(d) ? d && (s.push(d), l.set(d, !0)) : n[d] = n[d] == null ? j(h) : mt(n[d], h, !0));
      }), u && u.each(function(h, d) {
        at.hasClass(d) && !l.get(d) && (s.push(d), l.set(d, !0));
      }), at.topologicalTravel(s, at.getAllClassMainTypes(), c, this);
      function c(h) {
        var d = wC(this, h, Rt(r[h])), f = a.get(h), v = (
          // `!oldCmptList` means init. See the comment in `mappingToExists`
          f ? u && u.get(h) ? "replaceMerge" : "normalMerge" : "replaceAll"
        ), g = oS(f, d, v);
        dS(g, h, at), n[h] = null, a.set(h, null), o.set(h, 0);
        var p = [], m = [], y = 0, _;
        A(g, function(w, S) {
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
              if (_)
                return;
              _ = !0;
            }
            if (b && b.constructor === C)
              b.name = w.keyInfo.name, b.mergeOption(x, this), b.optionUpdated(x, !1);
            else {
              var M = E({
                componentIndex: S
              }, w.keyInfo);
              b = new C(x, this, this, M), E(b, M), w.brandNew && (b.__requireNewView = !0), b.init(x, this, this), b.optionUpdated(null, !0);
            }
          }
          b ? (p.push(b.option), m.push(b), y++) : (p.push(void 0), m.push(void 0));
        }, this), n[h] = p, a.set(h, m), o.set(h, y), h === "series" && pa(this);
      }
      this._seriesIndices || pa(this);
    }, t.prototype.getOption = function() {
      var r = j(this.option);
      return A(r, function(i, n) {
        if (at.hasClass(n)) {
          for (var a = Rt(i), o = a.length, s = !1, l = o - 1; l >= 0; l--)
            a[l] && !Pn(a[l]) ? s = !0 : (a[l] = null, !s && o--);
          a.length = o, r[n] = a;
        }
      }), delete r[Ah], r;
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
      return n != null ? (l = [], A(Rt(n), function(u) {
        s[u] && l.push(s[u]);
      })) : a != null ? l = Mh("id", a, s) : o != null ? l = Mh("name", o, s) : l = fe(s, function(u) {
        return !!u;
      }), Dh(l, r);
    }, t.prototype.findComponents = function(r) {
      var i = r.query, n = r.mainType, a = s(i), o = a ? this.queryComponents(a) : fe(this._componentsMap.get(n), function(u) {
        return !!u;
      });
      return l(Dh(o, r));
      function s(u) {
        var c = n + "Index", h = n + "Id", d = n + "Name";
        return u && (u[c] != null || u[h] != null || u[d] != null) ? {
          mainType: n,
          // subType will be filtered finally.
          index: u[c],
          id: u[h],
          name: u[d]
        } : null;
      }
      function l(u) {
        return r.filter ? fe(u, r.filter) : u;
      }
    }, t.prototype.eachComponent = function(r, i, n) {
      var a = this._componentsMap;
      if (rt(r)) {
        var o = i, s = r;
        a.each(function(h, d) {
          for (var f = 0; h && f < h.length; f++) {
            var v = h[f];
            v && s.call(o, d, v, v.componentIndex);
          }
        });
      } else
        for (var l = W(r) ? a.get(r) : z(r) ? this.findComponents(r) : null, u = 0; l && u < l.length; u++) {
          var c = l[u];
          c && i.call(n, c, c.componentIndex);
        }
    }, t.prototype.getSeriesByName = function(r) {
      var i = Le(r, null);
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
      Xi(this), A(this._seriesIndices, function(n) {
        var a = this._componentsMap.get("series")[n];
        r.call(i, a, n);
      }, this);
    }, t.prototype.eachRawSeries = function(r, i) {
      A(this._componentsMap.get("series"), function(n) {
        n && r.call(i, n, n.componentIndex);
      });
    }, t.prototype.eachSeriesByType = function(r, i, n) {
      Xi(this), A(this._seriesIndices, function(a) {
        var o = this._componentsMap.get("series")[a];
        o.subType === r && i.call(n, o, a);
      }, this);
    }, t.prototype.eachRawSeriesByType = function(r, i, n) {
      return A(this.getSeriesByType(r), i, n);
    }, t.prototype.isSeriesFiltered = function(r) {
      return Xi(this), this._seriesIndicesMap.get(r.componentIndex) == null;
    }, t.prototype.getCurrentSeriesIndices = function() {
      return (this._seriesIndices || []).slice();
    }, t.prototype.filterSeries = function(r, i) {
      Xi(this);
      var n = [];
      A(this._seriesIndices, function(a) {
        var o = this._componentsMap.get("series")[a];
        r.call(i, o, a) && n.push(a);
      }, this), this._seriesIndices = n, this._seriesIndicesMap = tt(n);
    }, t.prototype.restoreData = function(r) {
      pa(this);
      var i = this._componentsMap, n = [];
      i.each(function(a, o) {
        at.hasClass(o) && n.push(o);
      }), at.topologicalTravel(n, at.getAllClassMainTypes(), function(a) {
        A(i.get(a), function(o) {
          o && (a !== "series" || !CC(o, r)) && o.restoreData();
        });
      });
    }, t.internalField = (function() {
      pa = function(r) {
        var i = r._seriesIndices = [];
        A(r._componentsMap.get("series"), function(n) {
          n && i.push(n.componentIndex);
        }), r._seriesIndicesMap = tt(i);
      }, Xi = function(r) {
      }, Ch = function(r, i) {
        r.option = {}, r.option[Ah] = TC, r._componentsMap = tt({
          series: []
        }), r._componentsCount = tt();
        var n = i.aria;
        z(n) && n.enabled == null && (n.enabled = !0), AC(i, r._theme.option), mt(i, vC, !1), r._mergeOption(i, null);
      };
    })(), t;
  })(vt)
);
function CC(e, t) {
  if (t) {
    var r = t.seriesIndex, i = t.seriesId, n = t.seriesName;
    return r != null && e.componentIndex !== r || i != null && e.id !== i || n != null && e.name !== n;
  }
}
function AC(e, t) {
  var r = e.color && !e.colorLayer;
  A(t, function(i, n) {
    n === "colorLayer" && r || at.hasClass(n) || (typeof i == "object" ? e[n] = e[n] ? mt(e[n], i, !1) : j(i) : e[n] == null && (e[n] = i));
  });
}
function Mh(e, t, r) {
  if (N(t)) {
    var i = tt();
    return A(t, function(a) {
      if (a != null) {
        var o = Le(a, null);
        o != null && i.set(a, !0);
      }
    }), fe(r, function(a) {
      return a && i.get(a[e]);
    });
  } else {
    var n = Le(t, null);
    return fe(r, function(a) {
      return a && n != null && a[e] === n;
    });
  }
}
function Dh(e, t) {
  return t.hasOwnProperty("subType") ? fe(e, function(r) {
    return r && r.subType === t.subType;
  }) : e;
}
function kh(e) {
  var t = tt();
  return e && A(Rt(e.replaceMerge), function(r) {
    t.set(r, !0);
  }), {
    replaceMergeMainTypeMap: t
  };
}
Xe(ku, Du);
var MC = [
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
], Xv = (
  /** @class */
  /* @__PURE__ */ (function() {
    function e(t) {
      A(MC, function(r) {
        this[r] = lt(t[r], t);
      }, this);
    }
    return e;
  })()
), Ms = {}, qv = (
  /** @class */
  (function() {
    function e() {
      this._coordinateSystems = [];
    }
    return e.prototype.create = function(t, r) {
      var i = [];
      A(Ms, function(n, a) {
        var o = n.create(t, r);
        i = i.concat(o || []);
      }), this._coordinateSystems = i;
    }, e.prototype.update = function(t, r) {
      A(this._coordinateSystems, function(i) {
        i.update && i.update(t, r);
      });
    }, e.prototype.getCoordinateSystems = function() {
      return this._coordinateSystems.slice();
    }, e.register = function(t, r) {
      Ms[t] = r;
    }, e.get = function(t) {
      return Ms[t];
    }, e;
  })()
), DC = /^(min|max)?(.+)$/, kC = (
  /** @class */
  (function() {
    function e(t) {
      this._timelineOptions = [], this._mediaList = [], this._currentMediaIndices = [], this._api = t;
    }
    return e.prototype.setOption = function(t, r, i) {
      t && (A(Rt(t.series), function(o) {
        o && o.data && Gt(o.data) && js(o.data);
      }), A(Rt(t.dataset), function(o) {
        o && o.source && Gt(o.source) && js(o.source);
      })), t = j(t);
      var n = this._optionBackup, a = PC(t, r, !n);
      this._newBaseOption = a.baseOption, n ? (a.timelineOptions.length && (n.timelineOptions = a.timelineOptions), a.mediaList.length && (n.mediaList = a.mediaList), a.mediaDefault && (n.mediaDefault = a.mediaDefault)) : this._optionBackup = a;
    }, e.prototype.mountOption = function(t) {
      var r = this._optionBackup;
      return this._timelineOptions = r.timelineOptions, this._mediaList = r.mediaList, this._mediaDefault = r.mediaDefault, this._currentMediaIndices = [], j(t ? r.baseOption : this._newBaseOption);
    }, e.prototype.getTimelineOption = function(t) {
      var r, i = this._timelineOptions;
      if (i.length) {
        var n = t.getComponent("timeline");
        n && (r = j(
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
        LC(n[l].query, r, i) && o.push(l);
      return !o.length && a && (o = [-1]), o.length && !EC(o, this._currentMediaIndices) && (s = $(o, function(c) {
        return j(c === -1 ? a.option : n[c].option);
      })), this._currentMediaIndices = o, s;
    }, e;
  })()
);
function PC(e, t, r) {
  var i = [], n, a, o = e.baseOption, s = e.timeline, l = e.options, u = e.media, c = !!e.media, h = !!(l || s || o && o.timeline);
  o ? (a = o, a.timeline || (a.timeline = s)) : ((h || c) && (e.options = e.media = null), a = e), c && N(u) && A(u, function(f) {
    f && f.option && (f.query ? i.push(f) : n || (n = f));
  }), d(a), A(l, function(f) {
    return d(f);
  }), A(i, function(f) {
    return d(f.option);
  });
  function d(f) {
    A(t, function(v) {
      v(f, r);
    });
  }
  return {
    baseOption: a,
    timelineOptions: l || [],
    mediaDefault: n,
    mediaList: i
  };
}
function LC(e, t, r) {
  var i = {
    width: t,
    height: r,
    aspectratio: t / r
    // lower case for convenience.
  }, n = !0;
  return A(e, function(a, o) {
    var s = o.match(DC);
    if (!(!s || !s[1] || !s[2])) {
      var l = s[1], u = s[2].toLowerCase();
      IC(i[u], a, l) || (n = !1);
    }
  }), n;
}
function IC(e, t, r) {
  return r === "min" ? e >= t : r === "max" ? e <= t : e === t;
}
function EC(e, t) {
  return e.join(",") === t.join(",");
}
var le = A, Bn = z, Ph = ["areaStyle", "lineStyle", "nodeStyle", "linkStyle", "chordStyle", "label", "labelLine"];
function Ds(e) {
  var t = e && e.itemStyle;
  if (t)
    for (var r = 0, i = Ph.length; r < i; r++) {
      var n = Ph[r], a = t.normal, o = t.emphasis;
      a && a[n] && (e[n] = e[n] || {}, e[n].normal ? mt(e[n].normal, a[n]) : e[n].normal = a[n], a[n] = null), o && o[n] && (e[n] = e[n] || {}, e[n].emphasis ? mt(e[n].emphasis, o[n]) : e[n].emphasis = o[n], o[n] = null);
    }
}
function Pt(e, t, r) {
  if (e && e[t] && (e[t].normal || e[t].emphasis)) {
    var i = e[t].normal, n = e[t].emphasis;
    i && (r ? (e[t].normal = e[t].emphasis = null, ct(e[t], i)) : e[t] = i), n && (e.emphasis = e.emphasis || {}, e.emphasis[t] = n, n.focus && (e.emphasis.focus = n.focus), n.blurScope && (e.emphasis.blurScope = n.blurScope));
  }
}
function ln(e) {
  Pt(e, "itemStyle"), Pt(e, "lineStyle"), Pt(e, "areaStyle"), Pt(e, "label"), Pt(e, "labelLine"), Pt(e, "upperLabel"), Pt(e, "edgeLabel");
}
function ft(e, t) {
  var r = Bn(e) && e[t], i = Bn(r) && r.textStyle;
  if (i)
    for (var n = 0, a = Nc.length; n < a; n++) {
      var o = Nc[n];
      i.hasOwnProperty(o) && (r[o] = i[o]);
    }
}
function ie(e) {
  e && (ln(e), ft(e, "label"), e.emphasis && ft(e.emphasis, "label"));
}
function RC(e) {
  if (Bn(e)) {
    Ds(e), ln(e), ft(e, "label"), ft(e, "upperLabel"), ft(e, "edgeLabel"), e.emphasis && (ft(e.emphasis, "label"), ft(e.emphasis, "upperLabel"), ft(e.emphasis, "edgeLabel"));
    var t = e.markPoint;
    t && (Ds(t), ie(t));
    var r = e.markLine;
    r && (Ds(r), ie(r));
    var i = e.markArea;
    i && ie(i);
    var n = e.data;
    if (e.type === "graph") {
      n = n || e.nodes;
      var a = e.links || e.edges;
      if (a && !Gt(a))
        for (var o = 0; o < a.length; o++)
          ie(a[o]);
      A(e.categories, function(u) {
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
        N(l[o]) ? (ie(l[o][0]), ie(l[o][1])) : ie(l[o]);
    e.type === "gauge" ? (ft(e, "axisLabel"), ft(e, "title"), ft(e, "detail")) : e.type === "treemap" ? (Pt(e.breadcrumb, "itemStyle"), A(e.levels, function(u) {
      ln(u);
    })) : e.type === "tree" && ln(e.leaves);
  }
}
function Fe(e) {
  return N(e) ? e : e ? [e] : [];
}
function Lh(e) {
  return (N(e) ? e[0] : e) || {};
}
function BC(e, t) {
  le(Fe(e.series), function(i) {
    Bn(i) && RC(i);
  });
  var r = ["xAxis", "yAxis", "radiusAxis", "angleAxis", "singleAxis", "parallelAxis", "radar"];
  t && r.push("valueAxis", "categoryAxis", "logAxis", "timeAxis"), le(r, function(i) {
    le(Fe(e[i]), function(n) {
      n && (ft(n, "axisLabel"), ft(n.axisPointer, "label"));
    });
  }), le(Fe(e.parallel), function(i) {
    var n = i && i.parallelAxisDefault;
    ft(n, "axisLabel"), ft(n && n.axisPointer, "label");
  }), le(Fe(e.calendar), function(i) {
    Pt(i, "itemStyle"), ft(i, "dayLabel"), ft(i, "monthLabel"), ft(i, "yearLabel");
  }), le(Fe(e.radar), function(i) {
    ft(i, "name"), i.name && i.axisName == null && (i.axisName = i.name, delete i.name), i.nameGap != null && i.axisNameGap == null && (i.axisNameGap = i.nameGap, delete i.nameGap);
  }), le(Fe(e.geo), function(i) {
    Bn(i) && (ie(i), le(Fe(i.regions), function(n) {
      ie(n);
    }));
  }), le(Fe(e.timeline), function(i) {
    ie(i), Pt(i, "label"), Pt(i, "itemStyle"), Pt(i, "controlStyle", !0);
    var n = i.data;
    N(n) && A(n, function(a) {
      z(a) && (Pt(a, "label"), Pt(a, "itemStyle"));
    });
  }), le(Fe(e.toolbox), function(i) {
    Pt(i, "iconStyle"), le(i.feature, function(n) {
      Pt(n, "iconStyle");
    });
  }), ft(Lh(e.axisPointer), "label"), ft(Lh(e.tooltip).axisPointer, "label");
}
function OC(e, t) {
  for (var r = t.split(","), i = e, n = 0; n < r.length && (i = i && i[r[n]], i != null); n++)
    ;
  return i;
}
function NC(e, t, r, i) {
  for (var n = t.split(","), a = e, o, s = 0; s < n.length - 1; s++)
    o = n[s], a[o] == null && (a[o] = {}), a = a[o];
  a[n[s]] == null && (a[n[s]] = r);
}
function Ih(e) {
  e && A(FC, function(t) {
    t[0] in e && !(t[1] in e) && (e[t[1]] = e[t[0]]);
  });
}
var FC = [["x", "left"], ["y", "top"], ["x2", "right"], ["y2", "bottom"]], zC = ["grid", "geo", "parallel", "legend", "toolbox", "title", "visualMap", "dataZoom", "timeline"], ks = [["borderRadius", "barBorderRadius"], ["borderColor", "barBorderColor"], ["borderWidth", "barBorderWidth"]];
function qi(e) {
  var t = e && e.itemStyle;
  if (t)
    for (var r = 0; r < ks.length; r++) {
      var i = ks[r][1], n = ks[r][0];
      t[i] != null && (t[n] = t[i]);
    }
}
function Eh(e) {
  e && e.alignTo === "edge" && e.margin != null && e.edgeDistance == null && (e.edgeDistance = e.margin);
}
function Rh(e) {
  e && e.downplay && !e.blur && (e.blur = e.downplay);
}
function UC(e) {
  e && e.focusNodeAdjacency != null && (e.emphasis = e.emphasis || {}, e.emphasis.focus == null && (e.emphasis.focus = "adjacency"));
}
function Zv(e, t) {
  if (e)
    for (var r = 0; r < e.length; r++)
      t(e[r]), e[r] && Zv(e[r].children, t);
}
function Qv(e, t) {
  BC(e, t), e.series = Rt(e.series), A(e.series, function(r) {
    if (z(r)) {
      var i = r.type;
      if (i === "line")
        r.clipOverflow != null && (r.clip = r.clipOverflow);
      else if (i === "pie" || i === "gauge") {
        r.clockWise != null && (r.clockwise = r.clockWise), Eh(r.label);
        var n = r.data;
        if (n && !Gt(n))
          for (var a = 0; a < n.length; a++)
            Eh(n[a]);
        r.hoverOffset != null && (r.emphasis = r.emphasis || {}, (r.emphasis.scaleSize = null) && (r.emphasis.scaleSize = r.hoverOffset));
      } else if (i === "gauge") {
        var o = OC(r, "pointer.color");
        o != null && NC(r, "itemStyle.color", o);
      } else if (i === "bar") {
        qi(r), qi(r.backgroundStyle), qi(r.emphasis);
        var n = r.data;
        if (n && !Gt(n))
          for (var a = 0; a < n.length; a++)
            typeof n[a] == "object" && (qi(n[a]), qi(n[a] && n[a].emphasis));
      } else if (i === "sunburst") {
        var s = r.highlightPolicy;
        s && (r.emphasis = r.emphasis || {}, r.emphasis.focus || (r.emphasis.focus = s)), Rh(r), Zv(r.data, Rh);
      } else i === "graph" || i === "sankey" ? UC(r) : i === "map" && (r.mapType && !r.map && (r.map = r.mapType), r.mapLocation && ct(r, r.mapLocation));
      r.hoverAnimation != null && (r.emphasis = r.emphasis || {}, r.emphasis && r.emphasis.scale == null && (r.emphasis.scale = r.hoverAnimation)), Ih(r);
    }
  }), e.dataRange && (e.visualMap = e.dataRange), A(zC, function(r) {
    var i = e[r];
    i && (N(i) || (i = [i]), A(i, function(n) {
      Ih(n);
    }));
  });
}
function VC(e) {
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
  }), t.each(WC);
}
function WC(e) {
  A(e, function(t, r) {
    var i = [], n = [NaN, NaN], a = [t.stackResultDimension, t.stackedOverDimension], o = t.data, s = t.isStackedByIndex, l = t.seriesModel.get("stackStrategy") || "samesign";
    o.modify(a, function(u, c, h) {
      var d = o.get(t.stackedDimension, h);
      if (isNaN(d))
        return n;
      var f, v;
      s ? v = o.getRawIndex(h) : f = o.get(t.stackedByDimension, h);
      for (var g = NaN, p = r - 1; p >= 0; p--) {
        var m = e[p];
        if (s || (v = m.data.rawIndexOf(m.stackedByDimension, f)), v >= 0) {
          var y = m.data.getByRawIndex(m.stackResultDimension, v);
          if (l === "all" || l === "positive" && y > 0 || l === "negative" && y < 0 || l === "samesign" && d >= 0 && y > 0 || l === "samesign" && d <= 0 && y < 0) {
            d = eS(d, y), g = y;
            break;
          }
        }
      }
      return i[0] = d, i[1] = g, i;
    });
  });
}
var Eo = (
  /** @class */
  /* @__PURE__ */ (function() {
    function e(t) {
      this.data = t.data || (t.sourceFormat === Be ? {} : []), this.sourceFormat = t.sourceFormat || Wv, this.seriesLayoutBy = t.seriesLayoutBy || Ve, this.startIndex = t.startIndex || 0, this.dimensionsDetectedCount = t.dimensionsDetectedCount, this.metaRawOption = t.metaRawOption;
      var r = this.dimensionsDefine = t.dimensionsDefine;
      if (r)
        for (var i = 0; i < r.length; i++) {
          var n = r[i];
          n.type == null && Gv(this, i) === Tt.Must && (n.type = "ordinal");
        }
    }
    return e;
  })()
);
function Pu(e) {
  return e instanceof Eo;
}
function Ml(e, t, r) {
  r = r || Jv(e);
  var i = t.seriesLayoutBy, n = GC(e, r, i, t.sourceHeader, t.dimensions), a = new Eo({
    data: e,
    sourceFormat: r,
    seriesLayoutBy: i,
    dimensionsDefine: n.dimensionsDefine,
    startIndex: n.startIndex,
    dimensionsDetectedCount: n.dimensionsDetectedCount,
    metaRawOption: j(t)
  });
  return a;
}
function Kv(e) {
  return new Eo({
    data: e,
    sourceFormat: Gt(e) ? cr : Re
  });
}
function HC(e) {
  return new Eo({
    data: e.data,
    sourceFormat: e.sourceFormat,
    seriesLayoutBy: e.seriesLayoutBy,
    dimensionsDefine: j(e.dimensionsDefine),
    startIndex: e.startIndex,
    dimensionsDetectedCount: e.dimensionsDetectedCount
  });
}
function Jv(e) {
  var t = Wv;
  if (Gt(e))
    t = cr;
  else if (N(e)) {
    e.length === 0 && (t = Yt);
    for (var r = 0, i = e.length; r < i; r++) {
      var n = e[r];
      if (n != null) {
        if (N(n) || Gt(n)) {
          t = Yt;
          break;
        } else if (z(n)) {
          t = ye;
          break;
        }
      }
    }
  } else if (z(e)) {
    for (var a in e)
      if (Mi(e, a) && Ht(e[a])) {
        t = Be;
        break;
      }
  }
  return t;
}
function GC(e, t, r, i, n) {
  var a, o;
  if (!e)
    return {
      dimensionsDefine: Bh(n),
      startIndex: o,
      dimensionsDetectedCount: a
    };
  if (t === Yt) {
    var s = e;
    i === "auto" || i == null ? Oh(function(u) {
      u != null && u !== "-" && (W(u) ? o == null && (o = 1) : o = 0);
    }, r, s, 10) : o = yt(i) ? i : i ? 1 : 0, !n && o === 1 && (n = [], Oh(function(u, c) {
      n[c] = u != null ? u + "" : "";
    }, r, s, 1 / 0)), a = n ? n.length : r === Ei ? s.length : s[0] ? s[0].length : null;
  } else if (t === ye)
    n || (n = YC(e));
  else if (t === Be)
    n || (n = [], A(e, function(u, c) {
      n.push(c);
    }));
  else if (t === Re) {
    var l = Co(e[0]);
    a = N(l) && l.length || 1;
  }
  return {
    startIndex: o,
    dimensionsDefine: Bh(n),
    dimensionsDetectedCount: a
  };
}
function YC(e) {
  for (var t = 0, r; t < e.length && !(r = e[t++]); )
    ;
  if (r)
    return pt(r);
}
function Bh(e) {
  if (e) {
    var t = tt();
    return $(e, function(r, i) {
      r = z(r) ? r : {
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
function Oh(e, t, r, i) {
  if (t === Ei)
    for (var n = 0; n < r.length && n < i; n++)
      e(r[n] ? r[n][0] : null, n);
  else
    for (var a = r[0] || [], n = 0; n < a.length && n < i; n++)
      e(a[n], n);
}
function jv(e) {
  var t = e.sourceFormat;
  return t === ye || t === Be;
}
var Er, Rr, Br, Nh, Fh, $v = (
  /** @class */
  (function() {
    function e(t, r) {
      var i = Pu(t) ? t : Kv(t);
      this._source = i;
      var n = this._data = i.data;
      i.sourceFormat === cr && (this._offset = 0, this._dimSize = r, this._data = n), Fh(this, n, i);
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
      Fh = function(o, s, l) {
        var u = l.sourceFormat, c = l.seriesLayoutBy, h = l.startIndex, d = l.dimensionsDefine, f = Nh[Lu(u, c)];
        if (E(o, f), u === cr)
          o.getItem = r, o.count = n, o.fillStorage = i;
        else {
          var v = tp(u, c);
          o.getItem = lt(v, null, s, h, d);
          var g = ep(u, c);
          o.count = lt(g, null, s, h, d);
        }
      };
      var r = function(o, s) {
        o = o - this._offset, s = s || [];
        for (var l = this._data, u = this._dimSize, c = u * o, h = 0; h < u; h++)
          s[h] = l[c + h];
        return s;
      }, i = function(o, s, l, u) {
        for (var c = this._data, h = this._dimSize, d = 0; d < h; d++) {
          for (var f = u[d], v = f[0] == null ? 1 / 0 : f[0], g = f[1] == null ? -1 / 0 : f[1], p = s - o, m = l[d], y = 0; y < p; y++) {
            var _ = c[y * h + d];
            m[o + y] = _, _ < v && (v = _), _ > g && (g = _);
          }
          f[0] = v, f[1] = g;
        }
      }, n = function() {
        return this._data ? this._data.length / this._dimSize : 0;
      };
      Nh = (t = {}, t[Yt + "_" + Ve] = {
        pure: !0,
        appendData: a
      }, t[Yt + "_" + Ei] = {
        pure: !0,
        appendData: function() {
          throw new Error('Do not support appendData when set seriesLayoutBy: "row".');
        }
      }, t[ye] = {
        pure: !0,
        appendData: a
      }, t[Be] = {
        pure: !0,
        appendData: function(o) {
          var s = this._data;
          A(o, function(l, u) {
            for (var c = s[u] || (s[u] = []), h = 0; h < (l || []).length; h++)
              c.push(l[h]);
          });
        }
      }, t[Re] = {
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
), zh = function(e, t, r, i) {
  return e[i];
}, XC = (Er = {}, Er[Yt + "_" + Ve] = function(e, t, r, i) {
  return e[i + t];
}, Er[Yt + "_" + Ei] = function(e, t, r, i, n) {
  i += t;
  for (var a = n || [], o = e, s = 0; s < o.length; s++) {
    var l = o[s];
    a[s] = l ? l[i] : null;
  }
  return a;
}, Er[ye] = zh, Er[Be] = function(e, t, r, i, n) {
  for (var a = n || [], o = 0; o < r.length; o++) {
    var s = r[o].name, l = e[s];
    a[o] = l ? l[i] : null;
  }
  return a;
}, Er[Re] = zh, Er);
function tp(e, t) {
  var r = XC[Lu(e, t)];
  return r;
}
var Uh = function(e, t, r) {
  return e.length;
}, qC = (Rr = {}, Rr[Yt + "_" + Ve] = function(e, t, r) {
  return Math.max(0, e.length - t);
}, Rr[Yt + "_" + Ei] = function(e, t, r) {
  var i = e[0];
  return i ? Math.max(0, i.length - t) : 0;
}, Rr[ye] = Uh, Rr[Be] = function(e, t, r) {
  var i = r[0].name, n = e[i];
  return n ? n.length : 0;
}, Rr[Re] = Uh, Rr);
function ep(e, t) {
  var r = qC[Lu(e, t)];
  return r;
}
var Ps = function(e, t, r) {
  return e[t];
}, ZC = (Br = {}, Br[Yt] = Ps, Br[ye] = function(e, t, r) {
  return e[r];
}, Br[Be] = Ps, Br[Re] = function(e, t, r) {
  var i = Co(e);
  return i instanceof Array ? i[t] : i;
}, Br[cr] = Ps, Br);
function rp(e) {
  var t = ZC[e];
  return t;
}
function Lu(e, t) {
  return e === Yt ? e + "_" + t : e;
}
function lo(e, t, r) {
  if (e) {
    var i = e.getRawDataItem(t);
    if (i != null) {
      var n = e.getStore(), a = n.getSource().sourceFormat;
      if (r != null) {
        var o = e.getDimensionIndex(r), s = n.getDimensionProperty(o);
        return rp(a)(i, o, s);
      } else {
        var l = i;
        return a === Re && (l = Co(i)), l;
      }
    }
  }
}
var QC = /\{@(.+?)\}/g, KC = (
  /** @class */
  (function() {
    function e() {
    }
    return e.prototype.getDataParams = function(t, r) {
      var i = this.getData(r), n = this.getRawValue(t, r), a = i.getRawIndex(t), o = i.getName(t), s = i.getRawDataItem(t), l = i.getItemVisual(t, "style"), u = l && l[i.getItemVisual(t, "drawType") || "fill"], c = l && l.stroke, h = this.mainType, d = h === "series", f = i.userOutput && i.userOutput.get();
      return {
        componentType: h,
        componentSubType: this.subType,
        componentIndex: this.componentIndex,
        seriesType: d ? this.subType : null,
        seriesIndex: this.seriesIndex,
        seriesId: d ? this.id : null,
        seriesName: d ? this.name : null,
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
      if (o && (l.value = o.interpolatedValue), n != null && N(l.value) && (l.value = l.value[n]), !a) {
        var u = s.getItemModel(t);
        a = u.get(r === "normal" ? ["label", "formatter"] : [r, "label", "formatter"]);
      }
      if (rt(a))
        return l.status = r, l.dimensionIndex = n, a(l);
      if (W(a)) {
        var c = Ov(a, l);
        return c.replace(QC, function(h, d) {
          var f = d.length, v = d;
          v.charAt(0) === "[" && v.charAt(f - 1) === "]" && (v = +v.slice(1, f - 1));
          var g = lo(s, t, v);
          if (o && N(o.interpolatedValue)) {
            var p = s.getDimensionIndex(v);
            p >= 0 && (g = o.interpolatedValue[p]);
          }
          return g != null ? g + "" : "";
        });
      }
    }, e.prototype.getRawValue = function(t, r) {
      return lo(this.getData(r), t);
    }, e.prototype.formatTooltip = function(t, r, i) {
    }, e;
  })()
);
function Vh(e) {
  var t, r;
  return z(e) ? e.type && (r = e) : t = e, {
    text: t,
    // markers: markers || markersExisting,
    frag: r
  };
}
function bn(e) {
  return new JC(e);
}
var JC = (
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
      var d = t && t.step;
      if (r ? this._dueEnd = r._outputDueEnd : this._dueEnd = this._count ? this._count(this.context) : 1 / 0, this._progress) {
        var f = this._dueIndex, v = Math.min(d != null ? this._dueIndex + d : 1 / 0, this._dueEnd);
        if (!i && (h || f < v)) {
          var g = this._progress;
          if (N(g))
            for (var p = 0; p < g.length; p++)
              this._doProgress(g[p], f, v, l, u);
          else
            this._doProgress(g, f, v, l, u);
        }
        this._dueIndex = v;
        var m = this._settedOutputEnd != null ? this._settedOutputEnd : v;
        this._outputDueEnd = m;
      } else
        this._dueIndex = this._outputDueEnd = this._settedOutputEnd != null ? this._settedOutputEnd : this._dueEnd;
      return this.unfinished();
    }, e.prototype.dirty = function() {
      this._dirty = !0, this._onDirty && this._onDirty(this.context);
    }, e.prototype._doProgress = function(t, r, i, n, a) {
      Wh.reset(r, i, n, a), this._callingProgress = t, this._callingProgress({
        start: r,
        end: i,
        count: i - r,
        next: Wh.next
      }, this.context);
    }, e.prototype._doReset = function(t) {
      this._dueIndex = this._outputDueEnd = this._dueEnd = 0, this._settedOutputEnd = null;
      var r, i;
      !t && this._reset && (r = this._reset(this.context), r && r.progress && (i = r.forceFirstProgress, r = r.progress), N(r) && !r.length && (r = null)), this._progress = r, this._modBy = this._modDataCount = null;
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
), Wh = /* @__PURE__ */ (function() {
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
function Ua(e, t) {
  var r = t && t.type;
  return r === "ordinal" ? e : (r === "time" && !yt(e) && e != null && e !== "-" && (e = +To(e)), e == null || e === "" ? NaN : Number(e));
}
tt({
  number: function(e) {
    return parseFloat(e);
  },
  time: function(e) {
    return +To(e);
  },
  trim: function(e) {
    return W(e) ? Me(e) : e;
  }
});
var jC = (
  /** @class */
  (function() {
    function e(t, r) {
      var i = t === "desc";
      this._resultLT = i ? 1 : -1, r == null && (r = i ? "min" : "max"), this._incomparable = r === "min" ? -1 / 0 : 1 / 0;
    }
    return e.prototype.evaluate = function(t, r) {
      var i = yt(t) ? t : $a(t), n = yt(r) ? r : $a(r), a = isNaN(i), o = isNaN(n);
      if (a && (i = this._incomparable), o && (n = this._incomparable), a && o) {
        var s = W(t), l = W(r);
        s && (i = l ? t : 0), l && (n = s ? r : 0);
      }
      return i < n ? this._resultLT : i > n ? -this._resultLT : 0;
    }, e;
  })()
), $C = (
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
      return Ua(t, r);
    }, e;
  })()
);
function tA(e, t) {
  var r = new $C(), i = e.data, n = r.sourceFormat = e.sourceFormat, a = e.startIndex, o = "";
  e.seriesLayoutBy !== Ve && Ut(o);
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
        Mi(l, m) && Ut(_), l[m] = y;
      }
    });
  else
    for (var c = 0; c < e.dimensionsDetectedCount; c++)
      s.push({
        index: c
      });
  var h = tp(n, Ve);
  t.__isBuiltIn && (r.getRawDataItem = function(g) {
    return h(i, a, s, g);
  }, r.getRawData = lt(eA, null, e)), r.cloneRawData = lt(rA, null, e);
  var d = ep(n, Ve);
  r.count = lt(d, null, i, a, s);
  var f = rp(n);
  r.retrieveValue = function(g, p) {
    var m = h(i, a, s, g);
    return v(m, p);
  };
  var v = r.retrieveValueFromItem = function(g, p) {
    if (g != null) {
      var m = s[p];
      if (m)
        return f(g, p, m.name);
    }
  };
  return r.getDimensionInfo = lt(iA, null, s, l), r.cloneAllDimensionInfo = lt(nA, null, s), r;
}
function eA(e) {
  var t = e.sourceFormat;
  if (!Iu(t)) {
    var r = "";
    Ut(r);
  }
  return e.data;
}
function rA(e) {
  var t = e.sourceFormat, r = e.data;
  if (!Iu(t)) {
    var i = "";
    Ut(i);
  }
  if (t === Yt) {
    for (var n = [], a = 0, o = r.length; a < o; a++)
      n.push(r[a].slice());
    return n;
  } else if (t === ye) {
    for (var n = [], a = 0, o = r.length; a < o; a++)
      n.push(E({}, r[a]));
    return n;
  }
}
function iA(e, t, r) {
  if (r != null) {
    if (yt(r) || !isNaN(r) && !Mi(t, r))
      return e[r];
    if (Mi(t, r))
      return t[r];
  }
}
function nA(e) {
  return j(e);
}
var ip = tt();
function aA(e) {
  e = j(e);
  var t = e.type, r = "";
  t || Ut(r);
  var i = t.split(":");
  i.length !== 2 && Ut(r);
  var n = !1;
  i[0] === "echarts" && (t = i[1], n = !0), e.__isBuiltIn = n, ip.set(t, e);
}
function oA(e, t, r) {
  var i = Rt(e), n = i.length, a = "";
  n || Ut(a);
  for (var o = 0, s = n; o < s; o++) {
    var l = i[o];
    t = sA(l, t), o !== s - 1 && (t.length = Math.max(t.length, 1));
  }
  return t;
}
function sA(e, t, r, i) {
  var n = "";
  t.length || Ut(n), z(e) || Ut(n);
  var a = e.type, o = ip.get(a);
  o || Ut(n);
  var s = $(t, function(u) {
    return tA(u, o);
  }), l = Rt(o.transform({
    upstream: s[0],
    upstreamList: s,
    config: j(e.config)
  }));
  return $(l, function(u, c) {
    var h = "";
    z(u) || Ut(h), u.data || Ut(h);
    var d = Jv(u.data);
    Iu(d) || Ut(h);
    var f, v = t[0];
    if (v && c === 0 && !u.dimensions) {
      var g = v.startIndex;
      g && (u.data = v.data.slice(0, g).concat(u.data)), f = {
        seriesLayoutBy: Ve,
        sourceHeader: g,
        dimensions: v.metaRawOption.dimensions
      };
    } else
      f = {
        seriesLayoutBy: Ve,
        sourceHeader: 0,
        dimensions: u.dimensions
      };
    return Ml(u.data, f, null);
  });
}
function Iu(e) {
  return e === Yt || e === ye;
}
var Ro = "undefined", lA = typeof Uint32Array === Ro ? Array : Uint32Array, uA = typeof Uint16Array === Ro ? Array : Uint16Array, np = typeof Int32Array === Ro ? Array : Int32Array, Hh = typeof Float64Array === Ro ? Array : Float64Array, ap = {
  float: Hh,
  int: np,
  // Ordinal data type can be string or int
  ordinal: Array,
  number: Array,
  time: Hh
}, Ls;
function oi(e) {
  return e > 65535 ? lA : uA;
}
function si() {
  return [1 / 0, -1 / 0];
}
function cA(e) {
  var t = e.constructor;
  return t === Array ? e.slice() : new t(e);
}
function Gh(e, t, r, i, n) {
  var a = ap[r || "float"];
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
var Dl = (
  /** @class */
  (function() {
    function e() {
      this._chunks = [], this._rawExtent = [], this._extent = [], this._count = 0, this._rawCount = 0, this._calcDimNameToIdx = tt();
    }
    return e.prototype.initData = function(t, r, i) {
      this._provider = t, this._chunks = [], this._indices = null, this.getRawIndex = this._getRawIdxIdentity;
      var n = t.getSource(), a = this.defaultDimValueGetter = Ls[n.sourceFormat];
      this._dimValueGetter = i || a, this._rawExtent = [], jv(n), this._dimensions = $(r, function(o) {
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
      }, i.set(t, a), this._chunks[a] = new ap[r || "float"](this._rawCount), this._rawExtent[a] = si(), a;
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
        Gh(i, u, c.type, l, !0);
      }
      for (var h = [], d = s; d < l; d++)
        for (var f = d - s, v = 0; v < a; v++) {
          var c = n[v], g = Ls.arrayRows.call(this, t[f] || h, c.property, f, v);
          i[v][d] = g;
          var p = o[v];
          g < p[0] && (p[0] = g), g > p[1] && (p[1] = g);
        }
      return this._rawCount = this._count = l, {
        start: s,
        end: l
      };
    }, e.prototype._initDataFromProvider = function(t, r, i) {
      for (var n = this._provider, a = this._chunks, o = this._dimensions, s = o.length, l = this._rawExtent, u = $(o, function(y) {
        return y.property;
      }), c = 0; c < s; c++) {
        var h = o[c];
        l[c] || (l[c] = si()), Gh(a, c, h.type, r, i);
      }
      if (n.fillStorage)
        n.fillStorage(t, r, a, l);
      else
        for (var d = [], f = t; f < r; f++) {
          d = n.getItem(f, d);
          for (var v = 0; v < s; v++) {
            var g = a[v], p = this._dimValueGetter(d, u[v], f, v);
            g[f] = p;
            var m = l[v];
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
        var d = this.getRawIndex(c), f = r - a[d], v = Math.abs(f);
        v <= i && ((v < s || v === s && f >= 0 && l < 0) && (s = v, l = f, u = 0), f === l && (o[u++] = c));
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
      for (var i = this.clone(), n = i.count(), a = oi(i._rawCount), o = new a(n), s = [], l = t.length, u = 0, c = t[0], h = i._chunks, d = 0; d < n; d++) {
        var f = void 0, v = i.getRawIndex(d);
        if (l === 0)
          f = r(d);
        else if (l === 1) {
          var g = h[c][v];
          f = r(g, d);
        } else {
          for (var p = 0; p < l; p++)
            s[p] = h[t[p]][v];
          s[p] = d, f = r.apply(null, s);
        }
        f && (o[u++] = v);
      }
      return u < n && (i._indices = o), i._count = u, i._extent = [], i._updateGetRawIdx(), i;
    }, e.prototype.selectRange = function(t) {
      var r = this.clone(), i = r._count;
      if (!i)
        return this;
      var n = pt(t), a = n.length;
      if (!a)
        return this;
      var o = r.count(), s = oi(r._rawCount), l = new s(o), u = 0, c = n[0], h = t[c][0], d = t[c][1], f = r._chunks, v = !1;
      if (!r._indices) {
        var g = 0;
        if (a === 1) {
          for (var p = f[n[0]], m = 0; m < i; m++) {
            var y = p[m];
            (y >= h && y <= d || isNaN(y)) && (l[u++] = g), g++;
          }
          v = !0;
        } else if (a === 2) {
          for (var p = f[n[0]], _ = f[n[1]], w = t[n[1]][0], S = t[n[1]][1], m = 0; m < i; m++) {
            var y = p[m], b = _[m];
            (y >= h && y <= d || isNaN(y)) && (b >= w && b <= S || isNaN(b)) && (l[u++] = g), g++;
          }
          v = !0;
        }
      }
      if (!v)
        if (a === 1)
          for (var m = 0; m < o; m++) {
            var x = r.getRawIndex(m), y = f[n[0]][x];
            (y >= h && y <= d || isNaN(y)) && (l[u++] = x);
          }
        else
          for (var m = 0; m < o; m++) {
            for (var T = !0, x = r.getRawIndex(m), C = 0; C < a; C++) {
              var M = n[C], y = f[M][x];
              (y < t[M][0] || y > t[M][1]) && (T = !1);
            }
            T && (l[u++] = r.getRawIndex(m));
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
        for (var d = t.getRawIndex(h), f = 0; f < o; f++)
          l[f] = n[r[f]][d];
        l[o] = h;
        var v = i && i.apply(null, l);
        if (v != null) {
          typeof v != "object" && (a[0] = v, v = a);
          for (var c = 0; c < v.length; c++) {
            var g = r[c], p = v[c], m = u[g], y = n[g];
            y && (y[d] = p), p < m[0] && (m[0] = p), p > m[1] && (m[1] = p);
          }
        }
      }
    }, e.prototype.lttbDownSample = function(t, r) {
      var i = this.clone([t], !0), n = i._chunks, a = n[t], o = this.count(), s = 0, l = Math.floor(1 / r), u = this.getRawIndex(0), c, h, d, f = new (oi(this._rawCount))(Math.min((Math.ceil(o / l) + 2) * 2, o));
      f[s++] = u;
      for (var v = 1; v < o - 1; v += l) {
        for (var g = Math.min(v + l, o - 1), p = Math.min(v + l * 2, o), m = (p + g) / 2, y = 0, _ = g; _ < p; _++) {
          var w = this.getRawIndex(_), S = a[w];
          isNaN(S) || (y += S);
        }
        y /= p - g;
        var b = v, x = Math.min(v + l, o), T = v - 1, C = a[u];
        c = -1, d = b;
        for (var M = -1, D = 0, _ = b; _ < x; _++) {
          var w = this.getRawIndex(_), S = a[w];
          if (isNaN(S)) {
            D++, M < 0 && (M = w);
            continue;
          }
          h = Math.abs((T - m) * (S - C) - (T - _) * (y - C)), h > c && (c = h, d = w);
        }
        D > 0 && D < x - b && (f[s++] = Math.min(M, d), d = Math.max(M, d)), f[s++] = d, u = d;
      }
      return f[s++] = this.getRawIndex(o - 1), i._count = s, i._indices = f, i.getRawIndex = this._getRawIdx, i;
    }, e.prototype.minmaxDownSample = function(t, r) {
      for (var i = this.clone([t], !0), n = i._chunks, a = Math.floor(1 / r), o = n[t], s = this.count(), l = new (oi(this._rawCount))(Math.ceil(s / a) * 2), u = 0, c = 0; c < s; c += a) {
        var h = c, d = o[this.getRawIndex(h)], f = c, v = o[this.getRawIndex(f)], g = a;
        c + a > s && (g = s - c);
        for (var p = 0; p < g; p++) {
          var m = this.getRawIndex(c + p), y = o[m];
          y < d && (d = y, h = c + p), y > v && (v = y, f = c + p);
        }
        var _ = this.getRawIndex(h), w = this.getRawIndex(f);
        h < f ? (l[u++] = _, l[u++] = w) : (l[u++] = w, l[u++] = _);
      }
      return i._count = u, i._indices = l, i._updateGetRawIdx(), i;
    }, e.prototype.downSample = function(t, r, i, n) {
      for (var a = this.clone([t], !0), o = a._chunks, s = [], l = Math.floor(1 / r), u = o[t], c = this.count(), h = a._rawExtent[t] = si(), d = new (oi(this._rawCount))(Math.ceil(c / l)), f = 0, v = 0; v < c; v += l) {
        l > c - v && (l = c - v, s.length = l);
        for (var g = 0; g < l; g++) {
          var p = this.getRawIndex(v + g);
          s[g] = u[p];
        }
        var m = i(s), y = this.getRawIndex(Math.min(v + n(s, m) || 0, c - 1));
        u[y] = m, m < h[0] && (h[0] = m), m > h[1] && (h[1] = m), d[f++] = y;
      }
      return a._count = f, a._indices = d, a._updateGetRawIdx(), a;
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
          i._chunks[o] = a[o] ? cA(n[o]) : n[o];
      else
        i._chunks = n;
      return this._copyCommonProps(i), r || (i._indices = this._cloneIndices()), i._updateGetRawIdx(), i;
    }, e.prototype._copyCommonProps = function(t) {
      t._count = this._count, t._rawCount = this._rawCount, t._provider = this._provider, t._dimensions = this._dimensions, t._extent = j(this._extent), t._rawExtent = j(this._rawExtent);
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
        return Ua(r[a], this._dimensions[a]);
      }
      Ls = {
        arrayRows: t,
        objectRows: function(r, i, n, a) {
          return Ua(r[i], this._dimensions[a]);
        },
        keyedColumns: t,
        original: function(r, i, n, a) {
          var o = r && (r.value == null ? r : r.value);
          return Ua(o instanceof Array ? o[a] : o, this._dimensions[a]);
        },
        typedArray: function(r, i, n, a) {
          return r[a];
        }
      };
    })(), e;
  })()
), hA = (
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
          s = o.get("data", !0), l = Gt(s) ? cr : Re, a = [];
        var h = this._getSourceMetaRawOption() || {}, d = u && u.metaRawOption || {}, f = K(h.seriesLayoutBy, d.seriesLayoutBy) || null, v = K(h.sourceHeader, d.sourceHeader), g = K(h.dimensions, d.dimensions), p = f !== d.seriesLayoutBy || !!v != !!d.sourceHeader || g;
        n = p ? [Ml(s, {
          seriesLayoutBy: f,
          sourceHeader: v,
          dimensions: g
        }, l)] : [];
      } else {
        var m = t;
        if (i) {
          var y = this._applyTransform(r);
          n = y.sourceList, a = y.upstreamSignList;
        } else {
          var _ = m.get("source", !0);
          n = [Ml(_, this._getSourceMetaRawOption(), null)], a = [];
        }
      }
      this._setLocalSource(n, a);
    }, e.prototype._applyTransform = function(t) {
      var r = this._sourceHost, i = r.get("transform", !0), n = r.get("fromTransformResult", !0);
      if (n != null) {
        var a = "";
        t.length !== 1 && Yh(a);
      }
      var o, s = [], l = [];
      return A(t, function(u) {
        u.prepareSource();
        var c = u.getSource(n || 0), h = "";
        n != null && !c && Yh(h), s.push(c), l.push(u._getVersionSign());
      }), i ? o = oA(i, s, {
        datasetIndex: r.componentIndex
      }) : n != null && (o = [HC(s[0])]), {
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
        ga(this._sourceHost) && l ? s = l._innerGetDataStore(t, r, i) : (s = new Dl(), s.initData(new $v(r, t.length), t)), o[i] = s;
      }
      return s;
    }, e.prototype._getUpstreamSourceManagers = function() {
      var t = this._sourceHost;
      if (ga(t)) {
        var r = Hv(t);
        return r ? [r.getSourceManager()] : [];
      } else
        return $(yC(t), function(i) {
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
function Yh(e) {
  throw new Error(e);
}
var fA = "line-height:1";
function op(e) {
  var t = e.lineHeight;
  return t == null ? fA : "line-height:" + Ft(t + "") + "px";
}
function sp(e, t) {
  var r = e.color || "#6e7079", i = e.fontSize || 12, n = e.fontWeight || "400", a = e.color || "#464646", o = e.fontSize || 14, s = e.fontWeight || "900";
  return t === "html" ? {
    // eslint-disable-next-line max-len
    nameStyle: "font-size:" + Ft(i + "") + "px;color:" + Ft(r) + ";font-weight:" + Ft(n + ""),
    // eslint-disable-next-line max-len
    valueStyle: "font-size:" + Ft(o + "") + "px;color:" + Ft(a) + ";font-weight:" + Ft(s + "")
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
var dA = [0, 10, 20, 30], vA = ["", `
`, `

`, `


`];
function On(e, t) {
  return t.type = e, t;
}
function kl(e) {
  return e.type === "section";
}
function lp(e) {
  return kl(e) ? pA : gA;
}
function up(e) {
  if (kl(e)) {
    var t = 0, r = e.blocks.length, i = r > 1 || r > 0 && !e.noHeader;
    return A(e.blocks, function(n) {
      var a = up(n);
      a >= t && (t = a + +(i && // 0 always can not be readable gap level.
      (!a || kl(n) && !n.noHeader)));
    }), t;
  }
  return 0;
}
function pA(e, t, r, i) {
  var n = t.noHeader, a = mA(up(t)), o = [], s = t.blocks || [];
  We(!s || N(s)), s = s || [];
  var l = e.orderMode;
  if (t.sortBlocks && l) {
    s = s.slice();
    var u = {
      valueAsc: "asc",
      valueDesc: "desc"
    };
    if (Mi(u, l)) {
      var c = new jC(u[l], null);
      s.sort(function(g, p) {
        return c.evaluate(g.sortParam, p.sortParam);
      });
    } else l === "seriesDesc" && s.reverse();
  }
  A(s, function(g, p) {
    var m = t.valueFormatter, y = lp(g)(
      // Inherit valueFormatter
      m ? E(E({}, e), {
        valueFormatter: m
      }) : e,
      g,
      p > 0 ? a.html : 0,
      i
    );
    y != null && o.push(y);
  });
  var h = e.renderMode === "richText" ? o.join(a.richText) : Pl(i, o.join(""), n ? r : a.html);
  if (n)
    return h;
  var d = Al(t.header, "ordinal", e.useUTC), f = sp(i, e.renderMode).nameStyle, v = op(i);
  return e.renderMode === "richText" ? cp(e, d, f) + a.richText + h : Pl(i, '<div style="' + f + ";" + v + ';">' + Ft(d) + "</div>" + h, r);
}
function gA(e, t, r, i) {
  var n = e.renderMode, a = t.noName, o = t.noValue, s = !t.markerType, l = t.name, u = e.useUTC, c = t.valueFormatter || e.valueFormatter || function(w) {
    return w = N(w) ? w : [w], $(w, function(S, b) {
      return Al(S, N(f) ? f[b] : f, u);
    });
  };
  if (!(a && o)) {
    var h = s ? "" : e.markupStyleCreator.makeTooltipMarker(t.markerType, t.markerColor || "#333", n), d = a ? "" : Al(l, "ordinal", u), f = t.valueType, v = o ? [] : c(t.value, t.dataIndex), g = !s || !a, p = !s && a, m = sp(i, n), y = m.nameStyle, _ = m.valueStyle;
    return n === "richText" ? (s ? "" : h) + (a ? "" : cp(e, d, y)) + (o ? "" : wA(e, v, g, p, _)) : Pl(i, (s ? "" : h) + (a ? "" : yA(d, !s, y)) + (o ? "" : _A(v, g, p, _)), r);
  }
}
function Xh(e, t, r, i, n, a) {
  if (e) {
    var o = lp(e), s = {
      useUTC: n,
      renderMode: r,
      orderMode: i,
      markupStyleCreator: t,
      valueFormatter: e.valueFormatter
    };
    return o(s, e, 0, a);
  }
}
function mA(e) {
  return {
    html: dA[e],
    richText: vA[e]
  };
}
function Pl(e, t, r) {
  var i = '<div style="clear:both"></div>', n = "margin: " + r + "px 0 0", a = op(e);
  return '<div style="' + n + ";" + a + ';">' + t + i + "</div>";
}
function yA(e, t, r) {
  var i = t ? "margin-left:2px" : "";
  return '<span style="' + r + ";" + i + '">' + Ft(e) + "</span>";
}
function _A(e, t, r, i) {
  var n = r ? "10px" : "20px", a = t ? "float:right;margin-left:" + n : "";
  return e = N(e) ? e : [e], '<span style="' + a + ";" + i + '">' + $(e, function(o) {
    return Ft(o);
  }).join("&nbsp;&nbsp;") + "</span>";
}
function cp(e, t, r) {
  return e.markupStyleCreator.wrapRichTextStyle(t, r);
}
function wA(e, t, r, i, n) {
  var a = [n], o = i ? 10 : 20;
  return r && a.push({
    padding: [0, 0, 0, o],
    align: "right"
  }), e.markupStyleCreator.wrapRichTextStyle(N(t) ? t.join("  ") : t, a);
}
function bA(e, t) {
  var r = e.getData().getItemVisual(t, "style"), i = r[e.visualDrawType];
  return Rn(i);
}
function hp(e, t) {
  var r = e.get("padding");
  return r ?? (t === "richText" ? [8, 10] : 10);
}
var Is = (
  /** @class */
  (function() {
    function e() {
      this.richTextStyles = {}, this._nextStyleNameId = Wd();
    }
    return e.prototype._generateStyleName = function() {
      return "__EC_aUTo_" + this._nextStyleNameId++;
    }, e.prototype.makeTooltipMarker = function(t, r, i) {
      var n = i === "richText" ? this._generateStyleName() : null, a = uC({
        color: r,
        type: t,
        renderMode: i,
        markerId: n
      });
      return W(a) ? a : (this.richTextStyles[n] = a.style, a.content);
    }, e.prototype.wrapRichTextStyle = function(t, r) {
      var i = {};
      N(r) ? A(r, function(a) {
        return E(i, a);
      }) : E(i, r);
      var n = this._generateStyleName();
      return this.richTextStyles[n] = i, "{" + n + "|" + t + "}";
    }, e;
  })()
);
function SA(e) {
  var t = e.series, r = e.dataIndex, i = e.multipleSeries, n = t.getData(), a = n.mapDimensionsAll("defaultedTooltip"), o = a.length, s = t.getRawValue(r), l = N(s), u = bA(t, r), c, h, d, f;
  if (o > 1 || l && !o) {
    var v = xA(s, t, r, a, u);
    c = v.inlineValues, h = v.inlineValueTypes, d = v.blocks, f = v.inlineValues[0];
  } else if (o) {
    var g = n.getDimensionInfo(a[0]);
    f = c = lo(n, r, a[0]), h = g.type;
  } else
    f = c = l ? s[0] : s;
  var p = Xd(t), m = p && t.name || "", y = n.getName(r), _ = i ? m : y;
  return On("section", {
    header: m,
    // When series name is not specified, do not show a header line with only '-'.
    // This case always happens in tooltip.trigger: 'item'.
    noHeader: i || !p,
    sortParam: f,
    blocks: [On("nameValue", {
      markerType: "item",
      markerColor: u,
      // Do not mix display seriesName and itemName in one tooltip,
      // which might confuses users.
      name: _,
      // name dimension might be auto assigned, where the name might
      // be not readable. So we check trim here.
      noName: !Me(_),
      value: c,
      valueType: h,
      dataIndex: r
    })].concat(d || [])
  });
}
function xA(e, t, r, i, n) {
  var a = t.getData(), o = fr(e, function(h, d, f) {
    var v = a.getDimensionInfo(f);
    return h = h || v && v.tooltip !== !1 && v.displayName != null;
  }, !1), s = [], l = [], u = [];
  i.length ? A(i, function(h) {
    c(lo(a, r, h), h);
  }) : A(e, c);
  function c(h, d) {
    var f = a.getDimensionInfo(d);
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
var $e = wt();
function ma(e, t) {
  return e.getName(t) || e.getId(t);
}
var TA = "__universalTransitionEnabled", dr = (
  /** @class */
  (function(e) {
    G(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r._selectedDataIndicesMap = {}, r;
    }
    return t.prototype.init = function(r, i, n) {
      this.seriesIndex = this.componentIndex, this.dataTask = bn({
        count: AA,
        reset: MA
      }), this.dataTask.context = {
        model: this
      }, this.mergeDefaultAndTheme(r, n);
      var a = $e(this).sourceManager = new hA(this);
      a.prepareSource();
      var o = this.getInitialData(r, n);
      Zh(o, this), this.dataTask.context.data = o, $e(this).dataBeforeProcessed = o, qh(this), this._initSelectedMapFromData(o);
    }, t.prototype.mergeDefaultAndTheme = function(r, i) {
      var n = oo(this), a = n ? zv(r) : {}, o = this.subType;
      at.hasClass(o) && (o += "Series"), mt(r, i.getTheme().get(this.subType)), mt(r, this.getDefaultOption()), vl(r, "label", ["show"]), this.fillDataTextStyle(r.data), n && so(r, a, n);
    }, t.prototype.mergeOption = function(r, i) {
      r = mt(this.option, r, !0), this.fillDataTextStyle(r.data);
      var n = oo(this);
      n && so(this.option, r, n);
      var a = $e(this).sourceManager;
      a.dirty(), a.prepareSource();
      var o = this.getInitialData(r, i);
      Zh(o, this), this.dataTask.dirty(), this.dataTask.context.data = o, $e(this).dataBeforeProcessed = o, qh(this), this._initSelectedMapFromData(o);
    }, t.prototype.fillDataTextStyle = function(r) {
      if (r && !Gt(r))
        for (var i = ["show"], n = 0; n < r.length; n++)
          r[n] && r[n].label && vl(r[n], "label", i);
    }, t.prototype.getInitialData = function(r, i) {
    }, t.prototype.appendData = function(r) {
      var i = this.getRawData();
      i.appendData(r.data);
    }, t.prototype.getData = function(r) {
      var i = Ll(this);
      if (i) {
        var n = i.context.data;
        return r == null || !n.getLinkedData ? n : n.getLinkedData(r);
      } else
        return $e(this).data;
    }, t.prototype.getAllData = function() {
      var r = this.getData();
      return r && r.getLinkedDataAll ? r.getLinkedDataAll() : [{
        data: r
      }];
    }, t.prototype.setData = function(r) {
      var i = Ll(this);
      if (i) {
        var n = i.context;
        n.outputData = r, i !== this.dataTask && (n.data = r);
      }
      $e(this).data = r;
    }, t.prototype.getEncode = function() {
      var r = this.get("encode", !0);
      if (r)
        return tt(r);
    }, t.prototype.getSourceManager = function() {
      return $e(this).sourceManager;
    }, t.prototype.getSource = function() {
      return this.getSourceManager().getSource();
    }, t.prototype.getRawData = function() {
      return $e(this).dataBeforeProcessed;
    }, t.prototype.getColorBy = function() {
      var r = this.get("colorBy");
      return r || "series";
    }, t.prototype.isColorBySeries = function() {
      return this.getColorBy() === "series";
    }, t.prototype.getBaseAxis = function() {
      var r = this.coordinateSystem;
      return r && r.getBaseAxis && r.getBaseAxis();
    }, t.prototype.formatTooltip = function(r, i, n) {
      return SA({
        series: this,
        dataIndex: r,
        multipleSeries: i
      });
    }, t.prototype.isAnimationEnabled = function() {
      var r = this.ecModel;
      if (V.node && !(r && r.ssr))
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
          var l = r[s], u = ma(o, l);
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
      return (n === "all" || n[ma(a, r)]) && !a.getItemModel(r).get(["select", "disabled"]);
    }, t.prototype.isUniversalTransitionEnabled = function() {
      if (this[TA])
        return !0;
      var r = this.option.universalTransition;
      return r ? r === !0 ? !0 : r && r.enabled : !1;
    }, t.prototype._innerSelect = function(r, i) {
      var n, a, o = this.option, s = o.selectedMode, l = i.length;
      if (!(!s || !l)) {
        if (s === "series")
          o.selectedMap = "all";
        else if (s === "multiple") {
          z(o.selectedMap) || (o.selectedMap = {});
          for (var u = o.selectedMap, c = 0; c < l; c++) {
            var h = i[c], d = ma(r, h);
            u[d] = !0, this._selectedDataIndicesMap[d] = r.getRawIndex(h);
          }
        } else if (s === "single" || s === !0) {
          var f = i[l - 1], d = ma(r, f);
          o.selectedMap = (n = {}, n[d] = !0, n), this._selectedDataIndicesMap = (a = {}, a[d] = r.getRawIndex(f), a);
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
Xe(dr, KC);
Xe(dr, Du);
Qd(dr, at);
function qh(e) {
  var t = e.name;
  Xd(e) || (e.name = CA(e) || t);
}
function CA(e) {
  var t = e.getRawData(), r = t.mapDimensionsAll("seriesName"), i = [];
  return A(r, function(n) {
    var a = t.getDimensionInfo(n);
    a.displayName && i.push(a.displayName);
  }), i.join(" ");
}
function AA(e) {
  return e.model.getRawData().count();
}
function MA(e) {
  var t = e.model;
  return t.setData(t.getRawData().cloneShallow()), DA;
}
function DA(e, t) {
  t.outputData && e.end > t.outputData.count() && t.model.getRawData().cloneShallow(t.outputData);
}
function Zh(e, t) {
  A(O1(e.CHANGABLE_METHODS, e.DOWNSAMPLE_METHODS), function(r) {
    e.wrapMethod(r, Qt(kA, t));
  });
}
function kA(e, t) {
  var r = Ll(e);
  return r && r.setOutputEnd((t || this).count()), t;
}
function Ll(e) {
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
var vr = (
  /** @class */
  (function() {
    function e() {
      this.group = new He(), this.uid = Io("viewComponent");
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
uu(vr);
cu(vr);
function PA() {
  var e = wt();
  return function(t) {
    var r = e(t), i = t.pipelineContext, n = !!r.large, a = !!r.progressiveRender, o = r.large = !!(i && i.large), s = r.progressiveRender = !!(i && i.progressiveRender);
    return (n !== o || a !== s) && "reset";
  };
}
var fp = wt(), LA = PA(), hr = (
  /** @class */
  (function() {
    function e() {
      this.group = new He(), this.uid = Io("viewChart"), this.renderTask = bn({
        plan: IA,
        reset: EA
      }), this.renderTask.context = {
        view: this
      };
    }
    return e.prototype.init = function(t, r) {
    }, e.prototype.render = function(t, r, i, n) {
    }, e.prototype.highlight = function(t, r, i, n) {
      var a = t.getData(n && n.dataType);
      a && Kh(a, n, "emphasis");
    }, e.prototype.downplay = function(t, r, i, n) {
      var a = t.getData(n && n.dataType);
      a && Kh(a, n, "normal");
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
      kv(this.group, t);
    }, e.markUpdateMethod = function(t, r) {
      fp(t).updateMethod = r;
    }, e.protoInitialize = (function() {
      var t = e.prototype;
      t.type = "chart";
    })(), e;
  })()
);
function Qh(e, t, r) {
  e && Sl(e) && (t === "emphasis" ? yl : _l)(e, r);
}
function Kh(e, t, r) {
  var i = Yn(e, t), n = t && t.highlightKey != null ? Fx(t.highlightKey) : null;
  i != null ? A(Rt(i), function(a) {
    Qh(e.getItemGraphicEl(a), r, n);
  }) : e.eachItemGraphicEl(function(a) {
    Qh(a, r, n);
  });
}
uu(hr);
cu(hr);
function IA(e) {
  return LA(e.model);
}
function EA(e) {
  var t = e.model, r = e.ecModel, i = e.api, n = e.payload, a = t.pipelineContext.progressiveRender, o = e.view, s = n && fp(n).updateMethod, l = a ? "incrementalPrepareRender" : s && o[s] ? s : "render";
  return l !== "render" && o[l](t, r, i, n), RA[l];
}
var RA = {
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
}, uo = "\0__throttleOriginMethod", Jh = "\0__throttleRate", jh = "\0__throttleType";
function dp(e, t, r) {
  var i, n = 0, a = 0, o = null, s, l, u, c;
  t = t || 0;
  function h() {
    a = (/* @__PURE__ */ new Date()).getTime(), o = null, e.apply(l, u || []);
  }
  var d = function() {
    for (var f = [], v = 0; v < arguments.length; v++)
      f[v] = arguments[v];
    i = (/* @__PURE__ */ new Date()).getTime(), l = this, u = f;
    var g = c || t, p = c || r;
    c = null, s = i - (p ? n : a) - g, clearTimeout(o), p ? o = setTimeout(h, g) : s >= 0 ? h() : o = setTimeout(h, -s), n = i;
  };
  return d.clear = function() {
    o && (clearTimeout(o), o = null);
  }, d.debounceNextCall = function(f) {
    c = f;
  }, d;
}
function vp(e, t, r, i) {
  var n = e[t];
  if (n) {
    var a = n[uo] || n, o = n[jh], s = n[Jh];
    if (s !== r || o !== i) {
      if (r == null || !i)
        return e[t] = a;
      n = e[t] = dp(a, r, i === "debounce"), n[uo] = a, n[jh] = i, n[Jh] = r;
    }
    return n;
  }
}
function Il(e, t) {
  var r = e[t];
  r && r[uo] && (r.clear && r.clear(), e[t] = r[uo]);
}
var $h = wt(), tf = {
  itemStyle: Ln(Lv, !0),
  lineStyle: Ln(Pv, !0)
}, BA = {
  lineStyle: "stroke",
  itemStyle: "fill"
};
function pp(e, t) {
  var r = e.visualStyleMapper || tf[t];
  return r || (console.warn("Unknown style type '" + t + "'."), tf.itemStyle);
}
function gp(e, t) {
  var r = e.visualDrawType || BA[t];
  return r || (console.warn("Unknown style type '" + t + "'."), "fill");
}
var OA = {
  createOnAllSeries: !0,
  performRawSeries: !0,
  reset: function(e, t) {
    var r = e.getData(), i = e.visualStyleAccessPath || "itemStyle", n = e.getModel(i), a = pp(e, i), o = a(n), s = n.getShallow("decal");
    s && (r.setVisual("decal", s), s.dirty = !0);
    var l = gp(e, i), u = o[l], c = rt(u) ? u : null, h = o.fill === "auto" || o.stroke === "auto";
    if (!o[l] || c || h) {
      var d = e.getColorFromPalette(
        // TODO series count changed.
        e.name,
        null,
        t.getSeriesCount()
      );
      o[l] || (o[l] = d, r.setVisual("colorFromPalette", !0)), o.fill = o.fill === "auto" || rt(o.fill) ? d : o.fill, o.stroke = o.stroke === "auto" || rt(o.stroke) ? d : o.stroke;
    }
    if (r.setVisual("style", o), r.setVisual("drawType", l), !t.isSeriesFiltered(e) && c)
      return r.setVisual("colorFromPalette", !1), {
        dataEach: function(f, v) {
          var g = e.getDataParams(v), p = E({}, o);
          p[l] = c(g), f.setItemVisual(v, "style", p);
        }
      };
  }
}, Zi = new vt(), NA = {
  createOnAllSeries: !0,
  performRawSeries: !0,
  reset: function(e, t) {
    if (!(e.ignoreStyleOnData || t.isSeriesFiltered(e))) {
      var r = e.getData(), i = e.visualStyleAccessPath || "itemStyle", n = pp(e, i), a = r.getVisual("drawType");
      return {
        dataEach: r.hasItemOption ? function(o, s) {
          var l = o.getRawDataItem(s);
          if (l && l[i]) {
            Zi.option = l[i];
            var u = n(Zi), c = o.ensureUniqueItemVisual(s, "style");
            E(c, u), Zi.option.decal && (o.setItemVisual(s, "decal", Zi.option.decal), Zi.option.decal.dirty = !0), a in u && o.setItemVisual(s, "colorFromPalette", !1);
          }
        } : null
      };
    }
  }
}, FA = {
  performRawSeries: !0,
  overallReset: function(e) {
    var t = tt();
    e.eachSeries(function(r) {
      var i = r.getColorBy();
      if (!r.isColorBySeries()) {
        var n = r.type + "-" + i, a = t.get(n);
        a || (a = {}, t.set(n, a)), $h(r).scope = a;
      }
    }), e.eachSeries(function(r) {
      if (!(r.isColorBySeries() || e.isSeriesFiltered(r))) {
        var i = r.getRawData(), n = {}, a = r.getData(), o = $h(r).scope, s = r.visualStyleAccessPath || "itemStyle", l = gp(r, s);
        a.each(function(u) {
          var c = a.getRawIndex(u);
          n[c] = u;
        }), i.each(function(u) {
          var c = n[u], h = a.getItemVisual(c, "colorFromPalette");
          if (h) {
            var d = a.ensureUniqueItemVisual(c, "style"), f = i.getName(u) || u + "", v = i.count();
            d[l] = r.getColorFromPalette(f, o, v);
          }
        });
      }
    });
  }
}, ya = Math.PI;
function zA(e, t) {
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
  var r = new He(), i = new de({
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
  }), a = new de({
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
  return t.showSpinner && (o = new Po({
    shape: {
      startAngle: -ya / 2,
      endAngle: -ya / 2 + 0.1,
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
    endAngle: ya * 3 / 2
  }).start("circularInOut"), o.animateShape(!0).when(1e3, {
    startAngle: ya * 3 / 2
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
var mp = (
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
      A(this._allHandlers, function(n) {
        var a = t.get(n.uid) || t.set(n.uid, {}), o = "";
        We(!(n.reset && n.overallReset), o), n.reset && this._createSeriesStageTask(n, a, r, i), n.overallReset && this._createOverallStageTask(n, a, r, i);
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
          var c = o._stageTaskMap.get(l.uid), h = c.seriesTaskMap, d = c.overallTask;
          if (d) {
            var f, v = d.agentStubMap;
            v.each(function(p) {
              s(n, p) && (p.dirty(), f = !0);
            }), f && d.dirty(), o.updatePayload(d, i);
            var g = o.getPerformArgs(d, n.block);
            v.each(function(p) {
              p.perform(g);
            }), d.perform(g) && (a = !0);
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
      var a = this, o = r.seriesTaskMap, s = r.seriesTaskMap = tt(), l = t.seriesType, u = t.getTargetSeries;
      t.createOnAllSeries ? i.eachRawSeries(c) : l ? i.eachRawSeriesByType(l, c) : u && u(i, n).each(c);
      function c(h) {
        var d = h.uid, f = s.set(d, o && o.get(d) || bn({
          plan: GA,
          reset: YA,
          count: qA
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
        reset: UA
      });
      o.context = {
        ecModel: i,
        api: n,
        overallReset: t.overallReset,
        scheduler: a
      };
      var s = o.agentStubMap, l = o.agentStubMap = tt(), u = t.seriesType, c = t.getTargetSeries, h = !0, d = !1, f = "";
      We(!t.createOnAllSeries, f), u ? i.eachRawSeriesByType(u, v) : c ? c(i, n).each(v) : (h = !1, A(i.getSeries(), v));
      function v(g) {
        var p = g.uid, m = l.set(p, s && s.get(p) || // When the result of `getTargetSeries` changed, the overallTask
        // should be set as dirty and re-performed.
        (d = !0, bn({
          reset: VA,
          onDirty: HA
        })));
        m.context = {
          model: g,
          overallProgress: h
          // FIXME:TS never used, so comment it
          // modifyOutputEnd: modifyOutputEnd
        }, m.agent = o, m.__block = h, a._pipe(g, m);
      }
      d && o.dirty();
    }, e.prototype._pipe = function(t, r) {
      var i = t.uid, n = this._pipelineMap.get(i);
      !n.head && (n.head = r), n.tail && n.tail.pipe(r), n.tail = r, r.__idxInPipeline = n.count++, r.__pipeline = n;
    }, e.wrapStageHandler = function(t, r) {
      return rt(t) && (t = {
        overallReset: t,
        seriesType: ZA(t)
      }), t.uid = Io("stageHandler"), r && (t.visualType = r), t;
    }, e;
  })()
);
function UA(e) {
  e.overallReset(e.ecModel, e.api, e.payload);
}
function VA(e) {
  return e.overallProgress && WA;
}
function WA() {
  this.agent.dirty(), this.getDownstream().dirty();
}
function HA() {
  this.agent && this.agent.dirty();
}
function GA(e) {
  return e.plan ? e.plan(e.model, e.ecModel, e.api, e.payload) : null;
}
function YA(e) {
  e.useClearVisual && e.data.clearAllVisual();
  var t = e.resetDefines = Rt(e.reset(e.model, e.ecModel, e.api, e.payload));
  return t.length > 1 ? $(t, function(r, i) {
    return yp(i);
  }) : XA;
}
var XA = yp(0);
function yp(e) {
  return function(t, r) {
    var i = r.data, n = r.resetDefines[e];
    if (n && n.dataEach)
      for (var a = t.start; a < t.end; a++)
        n.dataEach(i, a);
    else n && n.progress && n.progress(t, i);
  };
}
function qA(e) {
  return e.data.count();
}
function ZA(e) {
  co = null;
  try {
    e(Nn, _p);
  } catch {
  }
  return co;
}
var Nn = {}, _p = {}, co;
wp(Nn, ku);
wp(_p, Xv);
Nn.eachSeriesByType = Nn.eachRawSeriesByType = function(e) {
  co = e;
};
Nn.eachComponent = function(e) {
  e.mainType === "series" && e.subType && (co = e.subType);
};
function wp(e, t) {
  for (var r in t.prototype)
    e[r] = Wt;
}
var ef = ["#37A2DA", "#32C5E9", "#67E0E3", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#E062AE", "#E690D1", "#e7bcf3", "#9d96f5", "#8378EA", "#96BFFF"];
const QA = {
  color: ef,
  colorLayer: [["#37A2DA", "#ffd85c", "#fd7b5f"], ["#37A2DA", "#67E0E3", "#FFDB5C", "#ff9f7f", "#E062AE", "#9d96f5"], ["#37A2DA", "#32C5E9", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#e7bcf3", "#8378EA", "#96BFFF"], ef]
};
var kt = "#B9B8CE", rf = "#100C2A", _a = function() {
  return {
    axisLine: {
      lineStyle: {
        color: kt
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
}, nf = ["#4992ff", "#7cffb2", "#fddd60", "#ff6e76", "#58d9f9", "#05c091", "#ff8a45", "#8d48e3", "#dd79ff"], bp = {
  darkMode: !0,
  color: nf,
  backgroundColor: rf,
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
      color: kt
    },
    pageTextStyle: {
      color: kt
    }
  },
  textStyle: {
    color: kt
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
      borderColor: kt
    }
  },
  dataZoom: {
    borderColor: "#71708A",
    textStyle: {
      color: kt
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
      color: kt
    }
  },
  timeline: {
    lineStyle: {
      color: kt
    },
    label: {
      color: kt
    },
    controlStyle: {
      color: kt,
      borderColor: kt
    }
  },
  calendar: {
    itemStyle: {
      color: rf
    },
    dayLabel: {
      color: kt
    },
    monthLabel: {
      color: kt
    },
    yearLabel: {
      color: kt
    }
  },
  timeAxis: _a(),
  logAxis: _a(),
  valueAxis: _a(),
  categoryAxis: _a(),
  line: {
    symbol: "circle"
  },
  graph: {
    color: nf
  },
  gauge: {
    title: {
      color: kt
    },
    axisLine: {
      lineStyle: {
        color: [[1, "rgba(207,212,219,0.2)"]]
      }
    },
    axisLabel: {
      color: kt
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
bp.categoryAxis.splitLine.show = !1;
var KA = (
  /** @class */
  (function() {
    function e() {
    }
    return e.prototype.normalizeQuery = function(t) {
      var r = {}, i = {}, n = {};
      if (W(t)) {
        var a = De(t);
        r.mainType = a.main || null, r.subType = a.sub || null;
      } else {
        var o = ["Index", "Name", "Id"], s = {
          name: 1,
          dataIndex: 1,
          dataType: 1
        };
        A(t, function(l, u) {
          for (var c = !1, h = 0; h < o.length; h++) {
            var d = o[h], f = u.lastIndexOf(d);
            if (f > 0 && f === u.length - d.length) {
              var v = u.slice(0, f);
              v !== "data" && (r.mainType = v, r[d.toLowerCase()] = l, c = !0);
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
      function c(h, d, f, v) {
        return h[f] == null || d[v || f] === h[f];
      }
    }, e.prototype.afterTrigger = function() {
      this.eventInfo = null;
    }, e;
  })()
), El = ["symbol", "symbolSize", "symbolRotate", "symbolOffset"], af = El.concat(["symbolKeepAspect"]), JA = {
  createOnAllSeries: !0,
  // For legend.
  performRawSeries: !0,
  reset: function(e, t) {
    var r = e.getData();
    if (e.legendIcon && r.setVisual("legendIcon", e.legendIcon), !e.hasSymbolVisual)
      return;
    for (var i = {}, n = {}, a = !1, o = 0; o < El.length; o++) {
      var s = El[o], l = e.get(s);
      rt(l) ? (a = !0, n[s] = l) : i[s] = l;
    }
    if (i.symbol = i.symbol || e.defaultSymbol, r.setVisual(E({
      legendIcon: e.legendIcon || i.symbol,
      symbolKeepAspect: e.get("symbolKeepAspect")
    }, i)), t.isSeriesFiltered(e))
      return;
    var u = pt(n);
    function c(h, d) {
      for (var f = e.getRawValue(d), v = e.getDataParams(d), g = 0; g < u.length; g++) {
        var p = u[g];
        h.setItemVisual(d, p, n[p](f, v));
      }
    }
    return {
      dataEach: a ? c : null
    };
  }
}, jA = {
  createOnAllSeries: !0,
  // For legend.
  performRawSeries: !0,
  reset: function(e, t) {
    if (!e.hasSymbolVisual || t.isSeriesFiltered(e))
      return;
    var r = e.getData();
    function i(n, a) {
      for (var o = n.getItemModel(a), s = 0; s < af.length; s++) {
        var l = af[s], u = o.getShallow(l, !0);
        u != null && n.setItemVisual(a, l, u);
      }
    }
    return {
      dataEach: r.hasItemOption ? i : null
    };
  }
};
function $A(e, t, r) {
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
function tM(e, t) {
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
function eM(e, t) {
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
      n = E({}, n), o.dispatchAction(E(n, {
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
        var h = o.getData(), d = Yn(h, n.fromActionPayload);
        r.trigger(a, {
          type: a,
          seriesId: o.id,
          name: N(d) ? h.getName(d[0]) : h.getName(d),
          selected: W(l) ? l : E({}, l)
        });
      }
  });
}
function rM(e, t, r) {
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
var iM = Math.round(Math.random() * 9), nM = typeof Object.defineProperty == "function", aM = (function() {
  function e() {
    this._id = "__ec_inner_" + iM++;
  }
  return e.prototype.get = function(t) {
    return this._guard(t)[this._id];
  }, e.prototype.set = function(t, r) {
    var i = this._guard(t);
    return nM ? Object.defineProperty(i, this._id, {
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
})(), oM = ot.extend({
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
}), sM = ot.extend({
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
}), lM = ot.extend({
  type: "pin",
  shape: {
    // x, y on the cusp
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  buildPath: function(e, t) {
    var r = t.x, i = t.y, n = t.width / 5 * 3, a = Math.max(n, t.height), o = n / 2, s = o * o / (a - o), l = i - a + o + s, u = Math.asin(s / o), c = Math.cos(u) * o, h = Math.sin(u), d = Math.cos(u), f = o * 0.6, v = o * 0.7;
    e.moveTo(r - c, l + s), e.arc(r, l, o, Math.PI - u, Math.PI * 2 + u), e.bezierCurveTo(r + c - h * f, l + s + d * f, r, i - v, r, i), e.bezierCurveTo(r, i - v, r - c + h * f, l + s + d * f, r - c, l + s), e.closePath();
  }
}), uM = ot.extend({
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
}), cM = {
  line: Ii,
  rect: de,
  roundRect: de,
  square: de,
  circle: ko,
  diamond: sM,
  pin: lM,
  arrow: uM,
  triangle: oM
}, hM = {
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
A(cM, function(e, t) {
  Rl[t] = new e();
});
var fM = ot.extend({
  type: "symbol",
  shape: {
    symbolType: "",
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  calculateTextPosition: function(e, t, r) {
    var i = Nd(e, t, r), n = this.shape;
    return n && n.symbolType === "pin" && t.position === "inside" && (i.y = r.y + r.height * 0.4), i;
  },
  buildPath: function(e, t, r) {
    var i = t.symbolType;
    if (i !== "none") {
      var n = Rl[i];
      n || (i = "rect", n = Rl[i]), hM[i](t.x, t.y, t.width, t.height, n.shape), n.buildPath(e, n.shape, r);
    }
  }
});
function dM(e, t) {
  if (this.type !== "image") {
    var r = this.style;
    this.__isEmptyBrush ? (r.stroke = e, r.fill = t || "#fff", r.lineWidth = 2) : this.shape.symbolType === "line" ? r.stroke = e : r.fill = e, this.markRedraw();
  }
}
function Sp(e, t, r, i, n, a, o) {
  var s = e.indexOf("empty") === 0;
  s && (e = e.substr(5, 1).toLowerCase() + e.substr(6));
  var l;
  return e.indexOf("image://") === 0 ? l = Tv(e.slice(8), new it(t, r, i, n), o ? "center" : "cover") : e.indexOf("path://") === 0 ? l = bu(e.slice(7), {}, new it(t, r, i, n), o ? "center" : "cover") : l = new fM({
    shape: {
      symbolType: e,
      x: t,
      y: r,
      width: i,
      height: n
    }
  }), l.__isEmptyBrush = s, l.setColor = dM, a && l.setColor(a), l;
}
function vM(e, t) {
  if (e != null)
    return N(e) || (e = [e, e]), [_t(e[0], t[0]) || 0, _t(K(e[1], e[0]), t[1]) || 0];
}
function Ur(e) {
  return isFinite(e);
}
function pM(e, t, r) {
  var i = t.x == null ? 0 : t.x, n = t.x2 == null ? 1 : t.x2, a = t.y == null ? 0 : t.y, o = t.y2 == null ? 0 : t.y2;
  t.global || (i = i * r.width + r.x, n = n * r.width + r.x, a = a * r.height + r.y, o = o * r.height + r.y), i = Ur(i) ? i : 0, n = Ur(n) ? n : 1, a = Ur(a) ? a : 0, o = Ur(o) ? o : 0;
  var s = e.createLinearGradient(i, a, n, o);
  return s;
}
function gM(e, t, r) {
  var i = r.width, n = r.height, a = Math.min(i, n), o = t.x == null ? 0.5 : t.x, s = t.y == null ? 0.5 : t.y, l = t.r == null ? 0.5 : t.r;
  t.global || (o = o * i + r.x, s = s * n + r.y, l = l * a), o = Ur(o) ? o : 0.5, s = Ur(s) ? s : 0.5, l = l >= 0 && Ur(l) ? l : 0.5;
  var u = e.createRadialGradient(o, s, 0, o, s, l);
  return u;
}
function Bl(e, t, r) {
  for (var i = t.type === "radial" ? gM(e, t, r) : pM(e, t, r), n = t.colorStops, a = 0; a < n.length; a++)
    i.addColorStop(n[a].offset, n[a].color);
  return i;
}
function mM(e, t) {
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
function yM(e, t) {
  return !e || e === "solid" || !(t > 0) ? null : e === "dashed" ? [4 * t, 2 * t] : e === "dotted" ? [t] : yt(e) ? [e] : N(e) ? e : null;
}
function xp(e) {
  var t = e.style, r = t.lineDash && t.lineWidth > 0 && yM(t.lineDash, t.lineWidth), i = t.lineDashOffset;
  if (r) {
    var n = t.strokeNoScale && e.getLineScale ? e.getLineScale() : 1;
    n && n !== 1 && (r = $(r, function(a) {
      return a / n;
    }), i /= n);
  }
  return [r, i];
}
var _M = new ki(!0);
function ho(e) {
  var t = e.stroke;
  return !(t == null || t === "none" || !(e.lineWidth > 0));
}
function of(e) {
  return typeof e == "string" && e !== "none";
}
function fo(e) {
  var t = e.fill;
  return t != null && t !== "none";
}
function sf(e, t) {
  if (t.fillOpacity != null && t.fillOpacity !== 1) {
    var r = e.globalAlpha;
    e.globalAlpha = t.fillOpacity * t.opacity, e.fill(), e.globalAlpha = r;
  } else
    e.fill();
}
function lf(e, t) {
  if (t.strokeOpacity != null && t.strokeOpacity !== 1) {
    var r = e.globalAlpha;
    e.globalAlpha = t.strokeOpacity * t.opacity, e.stroke(), e.globalAlpha = r;
  } else
    e.stroke();
}
function Ol(e, t, r) {
  var i = Kd(t.image, t.__image, r);
  if (Ao(i)) {
    var n = e.createPattern(i, t.repeat || "repeat");
    if (typeof DOMMatrix == "function" && n && n.setTransform) {
      var a = new DOMMatrix();
      a.translateSelf(t.x || 0, t.y || 0), a.rotateSelf(0, 0, (t.rotation || 0) * N1), a.scaleSelf(t.scaleX || 1, t.scaleY || 1), n.setTransform(a);
    }
    return n;
  }
}
function wM(e, t, r, i) {
  var n, a = ho(r), o = fo(r), s = r.strokePercent, l = s < 1, u = !t.path;
  (!t.silent || l) && u && t.createPathProxy();
  var c = t.path || _M, h = t.__dirty;
  if (!i) {
    var d = r.fill, f = r.stroke, v = o && !!d.colorStops, g = a && !!f.colorStops, p = o && !!d.image, m = a && !!f.image, y = void 0, _ = void 0, w = void 0, S = void 0, b = void 0;
    (v || g) && (b = t.getBoundingRect()), v && (y = h ? Bl(e, d, b) : t.__canvasFillGradient, t.__canvasFillGradient = y), g && (_ = h ? Bl(e, f, b) : t.__canvasStrokeGradient, t.__canvasStrokeGradient = _), p && (w = h || !t.__canvasFillPattern ? Ol(e, d, t) : t.__canvasFillPattern, t.__canvasFillPattern = w), m && (S = h || !t.__canvasStrokePattern ? Ol(e, f, t) : t.__canvasStrokePattern, t.__canvasStrokePattern = w), v ? e.fillStyle = y : p && (w ? e.fillStyle = w : o = !1), g ? e.strokeStyle = _ : m && (S ? e.strokeStyle = S : a = !1);
  }
  var x = t.getGlobalScale();
  c.setScale(x[0], x[1], t.segmentIgnoreThreshold);
  var T, C;
  e.setLineDash && r.lineDash && (n = xp(t), T = n[0], C = n[1]);
  var M = !0;
  (u || h & hi) && (c.setDPR(e.dpr), l ? c.setContext(null) : (c.setContext(e), M = !1), c.reset(), t.buildPath(c, t.shape, i), c.toStatic(), t.pathUpdated()), M && c.rebuildPath(e, l ? s : 1), T && (e.setLineDash(T), e.lineDashOffset = C), i || (r.strokeFirst ? (a && lf(e, r), o && sf(e, r)) : (o && sf(e, r), a && lf(e, r))), T && e.setLineDash([]);
}
function bM(e, t, r) {
  var i = t.__image = Kd(r.image, t.__image, t, t.onload);
  if (!(!i || !Ao(i))) {
    var n = r.x || 0, a = r.y || 0, o = t.getWidth(), s = t.getHeight(), l = i.width / i.height;
    if (o == null && s != null ? o = s * l : s == null && o != null ? s = o / l : o == null && s == null && (o = i.width, s = i.height), r.sWidth && r.sHeight) {
      var u = r.sx || 0, c = r.sy || 0;
      e.drawImage(i, u, c, r.sWidth, r.sHeight, n, a, o, s);
    } else if (r.sx && r.sy) {
      var u = r.sx, c = r.sy, h = o - u, d = s - c;
      e.drawImage(i, u, c, h, d, n, a, o, s);
    } else
      e.drawImage(i, n, a, o, s);
  }
}
function SM(e, t, r) {
  var i, n = r.text;
  if (n != null && (n += ""), n) {
    e.font = r.font || Xr, e.textAlign = r.textAlign, e.textBaseline = r.textBaseline;
    var a = void 0, o = void 0;
    e.setLineDash && r.lineDash && (i = xp(t), a = i[0], o = i[1]), a && (e.setLineDash(a), e.lineDashOffset = o), r.strokeFirst ? (ho(r) && e.strokeText(n, r.x, r.y), fo(r) && e.fillText(n, r.x, r.y)) : (fo(r) && e.fillText(n, r.x, r.y), ho(r) && e.strokeText(n, r.x, r.y)), a && e.setLineDash([]);
  }
}
var uf = ["shadowBlur", "shadowOffsetX", "shadowOffsetY"], cf = [
  ["lineCap", "butt"],
  ["lineJoin", "miter"],
  ["miterLimit", 10]
];
function Tp(e, t, r, i, n) {
  var a = !1;
  if (!i && (r = r || {}, t === r))
    return !1;
  if (i || t.opacity !== r.opacity) {
    Vt(e, n), a = !0;
    var o = Math.max(Math.min(t.opacity, 1), 0);
    e.globalAlpha = isNaN(o) ? Wr.opacity : o;
  }
  (i || t.blend !== r.blend) && (a || (Vt(e, n), a = !0), e.globalCompositeOperation = t.blend || Wr.blend);
  for (var s = 0; s < uf.length; s++) {
    var l = uf[s];
    (i || t[l] !== r[l]) && (a || (Vt(e, n), a = !0), e[l] = e.dpr * (t[l] || 0));
  }
  return (i || t.shadowColor !== r.shadowColor) && (a || (Vt(e, n), a = !0), e.shadowColor = t.shadowColor || Wr.shadowColor), a;
}
function hf(e, t, r, i, n) {
  var a = Fn(t, n.inHover), o = i ? null : r && Fn(r, n.inHover) || {};
  if (a === o)
    return !1;
  var s = Tp(e, a, o, i, n);
  if ((i || a.fill !== o.fill) && (s || (Vt(e, n), s = !0), of(a.fill) && (e.fillStyle = a.fill)), (i || a.stroke !== o.stroke) && (s || (Vt(e, n), s = !0), of(a.stroke) && (e.strokeStyle = a.stroke)), (i || a.opacity !== o.opacity) && (s || (Vt(e, n), s = !0), e.globalAlpha = a.opacity == null ? 1 : a.opacity), t.hasStroke()) {
    var l = a.lineWidth, u = l / (a.strokeNoScale && t.getLineScale ? t.getLineScale() : 1);
    e.lineWidth !== u && (s || (Vt(e, n), s = !0), e.lineWidth = u);
  }
  for (var c = 0; c < cf.length; c++) {
    var h = cf[c], d = h[0];
    (i || a[d] !== o[d]) && (s || (Vt(e, n), s = !0), e[d] = a[d] || h[1]);
  }
  return s;
}
function xM(e, t, r, i, n) {
  return Tp(e, Fn(t, n.inHover), r && Fn(r, n.inHover), i, n);
}
function Cp(e, t) {
  var r = t.transform, i = e.dpr || 1;
  r ? e.setTransform(i * r[0], i * r[1], i * r[2], i * r[3], i * r[4], i * r[5]) : e.setTransform(i, 0, 0, i, 0, 0);
}
function TM(e, t, r) {
  for (var i = !1, n = 0; n < e.length; n++) {
    var a = e[n];
    i = i || a.isZeroArea(), Cp(t, a), t.beginPath(), a.buildPath(t, a.shape), t.clip();
  }
  r.allClipped = i;
}
function CM(e, t) {
  return e && t ? e[0] !== t[0] || e[1] !== t[1] || e[2] !== t[2] || e[3] !== t[3] || e[4] !== t[4] || e[5] !== t[5] : !(!e && !t);
}
var ff = 1, df = 2, vf = 3, pf = 4;
function AM(e) {
  var t = fo(e), r = ho(e);
  return !(e.lineDash || !(+t ^ +r) || t && typeof e.fill != "string" || r && typeof e.stroke != "string" || e.strokePercent < 1 || e.strokeOpacity < 1 || e.fillOpacity < 1);
}
function Vt(e, t) {
  t.batchFill && e.fill(), t.batchStroke && e.stroke(), t.batchFill = "", t.batchStroke = "";
}
function Fn(e, t) {
  return t && e.__hoverStyle || e.style;
}
function Ap(e, t) {
  Vr(e, t, { inHover: !1, viewWidth: 0, viewHeight: 0 }, !0);
}
function Vr(e, t, r, i) {
  var n = t.transform;
  if (!t.shouldBePainted(r.viewWidth, r.viewHeight, !1, !1)) {
    t.__dirty &= ~Zt, t.__isRendered = !1;
    return;
  }
  var a = t.__clipPaths, o = r.prevElClipPaths, s = !1, l = !1;
  if ((!o || mM(a, o)) && (o && o.length && (Vt(e, r), e.restore(), l = s = !0, r.prevElClipPaths = null, r.allClipped = !1, r.prevEl = null), a && a.length && (Vt(e, r), e.save(), TM(a, e, r), s = !0), r.prevElClipPaths = a), r.allClipped) {
    t.__isRendered = !1;
    return;
  }
  t.beforeBrush && t.beforeBrush(), t.innerBeforeBrush();
  var u = r.prevEl;
  u || (l = s = !0);
  var c = t instanceof ot && t.autoBatch && AM(t.style);
  s || CM(n, u.transform) ? (Vt(e, r), Cp(e, t)) : c || Vt(e, r);
  var h = Fn(t, r.inHover);
  t instanceof ot ? (r.lastDrawType !== ff && (l = !0, r.lastDrawType = ff), hf(e, t, u, l, r), (!c || !r.batchFill && !r.batchStroke) && e.beginPath(), wM(e, t, h, c), c && (r.batchFill = h.fill || "", r.batchStroke = h.stroke || "")) : t instanceof to ? (r.lastDrawType !== vf && (l = !0, r.lastDrawType = vf), hf(e, t, u, l, r), SM(e, t, h)) : t instanceof Zr ? (r.lastDrawType !== df && (l = !0, r.lastDrawType = df), xM(e, t, u, l, r), bM(e, t, h)) : t.getTemporalDisplayables && (r.lastDrawType !== pf && (l = !0, r.lastDrawType = pf), MM(e, t, r)), c && i && Vt(e, r), t.innerAfterBrush(), t.afterBrush && t.afterBrush(), r.prevEl = t, t.__dirty = 0, t.__isRendered = !0;
}
function MM(e, t, r) {
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
    l.beforeBrush && l.beforeBrush(), l.innerBeforeBrush(), Vr(e, l, a, o === s - 1), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), a.prevEl = l;
  }
  for (var u = 0, c = n.length; u < c; u++) {
    var l = n[u];
    l.beforeBrush && l.beforeBrush(), l.innerBeforeBrush(), Vr(e, l, a, u === c - 1), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), a.prevEl = l;
  }
  t.clearTemporalDisplayables(), t.notClear = !0, e.restore();
}
var Es = new aM(), gf = new Gn(100), mf = ["symbol", "symbolSize", "symbolKeepAspect", "color", "backgroundColor", "dashArrayX", "dashArrayY", "maxTileWidth", "maxTileHeight"];
function yf(e, t) {
  if (e === "none")
    return null;
  var r = t.getDevicePixelRatio(), i = t.getZr(), n = i.painter.type === "svg";
  e.dirty && Es.delete(e);
  var a = Es.get(e);
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
  return l(s), s.rotation = o.rotation, s.scaleX = s.scaleY = n ? 1 : 1 / r, Es.set(e, s), e.dirty = !1, s;
  function l(u) {
    for (var c = [r], h = !0, d = 0; d < mf.length; ++d) {
      var f = o[mf[d]];
      if (f != null && !N(f) && !W(f) && !yt(f) && typeof f != "boolean") {
        h = !1;
        break;
      }
      c.push(f);
    }
    var v;
    if (h) {
      v = c.join(",") + (n ? "-svg" : "");
      var g = gf.get(v);
      g && (n ? u.svgElement = g : u.image = g);
    }
    var p = Dp(o.dashArrayX), m = DM(o.dashArrayY), y = Mp(o.symbol), _ = kM(p), w = kp(m), S = !n && Pi.createCanvas(), b = n && {
      tag: "g",
      attrs: {},
      key: "dcl",
      children: []
    }, x = C(), T;
    S && (S.width = x.width * r, S.height = x.height * r, T = S.getContext("2d")), M(), h && gf.put(v, S || b), u.image = S, u.svgElement = b, u.svgWidth = x.width, u.svgHeight = x.height;
    function C() {
      for (var D = 1, P = 0, L = _.length; P < L; ++P)
        D = Oc(D, _[P]);
      for (var k = 1, P = 0, L = y.length; P < L; ++P)
        k = Oc(k, y[P].length);
      D *= k;
      var B = w * _.length * y.length;
      return {
        width: Math.max(1, Math.min(D, o.maxTileWidth)),
        height: Math.max(1, Math.min(B, o.maxTileHeight))
      };
    }
    function M() {
      T && (T.clearRect(0, 0, S.width, S.height), o.backgroundColor && (T.fillStyle = o.backgroundColor, T.fillRect(0, 0, S.width, S.height)));
      for (var D = 0, P = 0; P < m.length; ++P)
        D += m[P];
      if (D <= 0)
        return;
      for (var L = -w, k = 0, B = 0, O = 0; L < x.height; ) {
        if (k % 2 === 0) {
          for (var X = B / 2 % y.length, q = 0, F = 0, Z = 0; q < x.width * 2; ) {
            for (var J = 0, P = 0; P < p[O].length; ++P)
              J += p[O][P];
            if (J <= 0)
              break;
            if (F % 2 === 0) {
              var Y = (1 - o.symbolSize) * 0.5, gt = q + p[O][F] * Y, bt = L + m[k] * Y, Xt = p[O][F] * o.symbolSize, _e = m[k] * o.symbolSize, jt = Z / 2 % y[X].length;
              qt(gt, bt, Xt, _e, y[X][jt]);
            }
            q += p[O][F], ++Z, ++F, F === p[O].length && (F = 0);
          }
          ++O, O === p.length && (O = 0);
        }
        L += m[k], ++B, ++k, k === m.length && (k = 0);
      }
      function qt(xt, ht, U, Q, we) {
        var St = n ? 1 : r, Qe = Sp(we, xt * St, ht * St, U * St, Q * St, o.color, o.symbolKeepAspect);
        if (n) {
          var Oe = i.painter.renderOneToVNode(Qe);
          Oe && b.children.push(Oe);
        } else
          Ap(T, Qe);
      }
    }
  }
}
function Mp(e) {
  if (!e || e.length === 0)
    return [["rect"]];
  if (W(e))
    return [[e]];
  for (var t = !0, r = 0; r < e.length; ++r)
    if (!W(e[r])) {
      t = !1;
      break;
    }
  if (t)
    return Mp([e]);
  for (var i = [], r = 0; r < e.length; ++r)
    W(e[r]) ? i.push([e[r]]) : i.push(e[r]);
  return i;
}
function Dp(e) {
  if (!e || e.length === 0)
    return [[0, 0]];
  if (yt(e)) {
    var t = Math.ceil(e);
    return [[t, t]];
  }
  for (var r = !0, i = 0; i < e.length; ++i)
    if (!yt(e[i])) {
      r = !1;
      break;
    }
  if (r)
    return Dp([e]);
  for (var n = [], i = 0; i < e.length; ++i)
    if (yt(e[i])) {
      var t = Math.ceil(e[i]);
      n.push([t, t]);
    } else {
      var t = $(e[i], function(s) {
        return Math.ceil(s);
      });
      t.length % 2 === 1 ? n.push(t.concat(t)) : n.push(t);
    }
  return n;
}
function DM(e) {
  if (!e || typeof e == "object" && e.length === 0)
    return [0, 0];
  if (yt(e)) {
    var t = Math.ceil(e);
    return [t, t];
  }
  var r = $(e, function(i) {
    return Math.ceil(i);
  });
  return e.length % 2 ? r.concat(r) : r;
}
function kM(e) {
  return $(e, function(t) {
    return kp(t);
  });
}
function kp(e) {
  for (var t = 0, r = 0; r < e.length; ++r)
    t += e[r];
  return e.length % 2 === 1 ? t * 2 : t;
}
function PM(e, t) {
  e.eachRawSeries(function(r) {
    if (!e.isSeriesFiltered(r)) {
      var i = r.getData();
      i.hasItemVisual() && i.each(function(o) {
        var s = i.getItemVisual(o, "decal");
        if (s) {
          var l = i.ensureUniqueItemVisual(o, "style");
          l.decal = yf(s, t);
        }
      });
      var n = i.getVisual("decal");
      if (n) {
        var a = i.getVisual("style");
        a.decal = yf(n, t);
      }
    }
  });
}
var he = new Ee(), Pp = {};
function LM(e, t) {
  Pp[e] = t;
}
function IM(e) {
  return Pp[e];
}
var EM = 1, RM = 800, BM = 900, OM = 1e3, NM = 2e3, FM = 5e3, Lp = 1e3, zM = 1100, Eu = 2e3, Ip = 3e3, UM = 4e3, Bo = 4500, VM = 4600, WM = 5e3, HM = 6e3, Ep = 7e3, GM = {
  PROCESSOR: {
    FILTER: OM,
    SERIES_FILTER: RM,
    STATISTIC: FM
  },
  VISUAL: {
    LAYOUT: Lp,
    PROGRESSIVE_LAYOUT: zM,
    GLOBAL: Eu,
    CHART: Ip,
    POST_CHART_LAYOUT: VM,
    COMPONENT: UM,
    BRUSH: WM,
    CHART_ITEM: Bo,
    ARIA: HM,
    DECAL: Ep
  }
}, Dt = "__flagInMainProcess", Nt = "__pendingUpdate", Rs = "__needsUpdateStatus", _f = /^[a-zA-Z0-9_]+$/, Bs = "__connectUpdateStatus", wf = 0, YM = 1, XM = 2;
function Rp(e) {
  return function() {
    for (var t = [], r = 0; r < arguments.length; r++)
      t[r] = arguments[r];
    if (this.isDisposed()) {
      this.id;
      return;
    }
    return Op(this, e, t);
  };
}
function Bp(e) {
  return function() {
    for (var t = [], r = 0; r < arguments.length; r++)
      t[r] = arguments[r];
    return Op(this, e, t);
  };
}
function Op(e, t, r) {
  return r[0] = r[0] && r[0].toLowerCase(), Ee.prototype[t].apply(e, r);
}
var Np = (
  /** @class */
  (function(e) {
    G(t, e);
    function t() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return t;
  })(Ee)
), Fp = Np.prototype;
Fp.on = Bp("on");
Fp.off = Bp("off");
var ui, Os, Sa, tr, Ns, Fs, zs, Qi, Ki, bf, Sf, Us, xf, xa, Tf, zp, $t, Cf, Up = (
  /** @class */
  (function(e) {
    G(t, e);
    function t(r, i, n) {
      var a = e.call(this, new KA()) || this;
      a._chartsViews = [], a._chartsMap = {}, a._componentsViews = [], a._componentsMap = {}, a._pendingActions = [], n = n || {}, W(i) && (i = Vp[i]), a._dom = r;
      var o = "canvas", s = "auto", l = !1;
      n.ssr;
      var u = a._zr = Ec(r, {
        renderer: n.renderer || o,
        devicePixelRatio: n.devicePixelRatio,
        width: n.width,
        height: n.height,
        ssr: n.ssr,
        useDirtyRect: K(n.useDirtyRect, l),
        useCoarsePointer: K(n.useCoarsePointer, s),
        pointerSize: n.pointerSize
      });
      a._ssr = n.ssr, a._throttledZrFlush = dp(lt(u.flush, u), 17), i = j(i), i && Qv(i, !0), a._theme = i, a._locale = jT(n.locale || Iv), a._coordSysMgr = new qv();
      var c = a._api = Tf(a);
      function h(d, f) {
        return d.__prio - f.__prio;
      }
      return ka(po, h), ka(Nl, h), a._scheduler = new mp(a, c, Nl, po), a._messageCenter = new Np(), a._initEvents(), a.resize = lt(a.resize, a), u.animation.on("frame", a._onframe, a), bf(u, a), Sf(u, a), js(a), a;
    }
    return t.prototype._onframe = function() {
      if (!this._disposed) {
        Cf(this);
        var r = this._scheduler;
        if (this[Nt]) {
          var i = this[Nt].silent;
          this[Dt] = !0;
          try {
            ui(this), tr.update.call(this, null, this[Nt].updateParams);
          } catch (l) {
            throw this[Dt] = !1, this[Nt] = null, l;
          }
          this._zr.flush(), this[Dt] = !1, this[Nt] = null, Qi.call(this, i), Ki.call(this, i);
        } else if (r.unfinished) {
          var n = EM, a = this._model, o = this._api;
          r.unfinished = !1;
          do {
            var s = +/* @__PURE__ */ new Date();
            r.performSeriesTasks(a), r.performDataProcessorTasks(a), Fs(this, a), r.performVisualTasks(a), xa(this, this._model, o, "remain", {}), n -= +/* @__PURE__ */ new Date() - s;
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
      if (!this[Dt]) {
        if (this._disposed) {
          this.id;
          return;
        }
        var a, o, s;
        if (z(i) && (n = i.lazyUpdate, a = i.silent, o = i.replaceMerge, s = i.transition, i = i.notMerge), this[Dt] = !0, !this._model || i) {
          var l = new kC(this._api), u = this._theme, c = this._model = new ku();
          c.scheduler = this._scheduler, c.ssr = this._ssr, c.init(null, null, null, u, this._locale, l);
        }
        this._model.setOption(r, {
          replaceMerge: o
        }, Fl);
        var h = {
          seriesTransition: s,
          optionChanged: !0
        };
        if (n)
          this[Nt] = {
            silent: a,
            updateParams: h
          }, this[Dt] = !1, this.getZr().wakeUp();
        else {
          try {
            ui(this), tr.update.call(this, null, h);
          } catch (d) {
            throw this[Nt] = null, this[Dt] = !1, d;
          }
          this._ssr || this._zr.flush(), this[Nt] = null, this[Dt] = !1, Qi.call(this, a), Ki.call(this, a);
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
      return this._zr.painter.dpr || V.hasGlobalWindow && window.devicePixelRatio || 1;
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
      if (V.svgSupported) {
        var r = this._zr, i = r.storage.getDisplayList();
        return A(i, function(n) {
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
      if (Af[n]) {
        var l = s, u = s, c = -s, h = -s, d = [], f = r && r.pixelRatio || this.getDevicePixelRatio();
        A(xn, function(_, w) {
          if (_.group === n) {
            var S = i ? _.getZr().painter.getSvgDom().innerHTML : _.renderToCanvas(j(r)), b = _.getDom().getBoundingClientRect();
            l = a(b.left, l), u = a(b.top, u), c = o(b.right, c), h = o(b.bottom, h), d.push({
              dom: S,
              left: b.left,
              top: b.top
            });
          }
        }), l *= f, u *= f, c *= f, h *= f;
        var v = c - l, g = h - u, p = Pi.createCanvas(), m = Ec(p, {
          renderer: i ? "svg" : "canvas"
        });
        if (m.resize({
          width: v,
          height: g
        }), i) {
          var y = "";
          return A(d, function(_) {
            var w = _.left - l, S = _.top - u;
            y += '<g transform="translate(' + w + "," + S + ')">' + _.dom + "</g>";
          }), m.painter.getSvgRoot().innerHTML = y, r.connectedBackgroundColor && m.painter.setBackgroundColor(r.connectedBackgroundColor), m.refreshImmediately(), m.painter.toDataURL();
        } else
          return r.connectedBackgroundColor && m.add(new de({
            shape: {
              x: 0,
              y: 0,
              width: v,
              height: g
            },
            style: {
              fill: r.connectedBackgroundColor
            }
          })), A(d, function(_) {
            var w = new Zr({
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
    }, t.prototype.convertToPixel = function(r, i) {
      return Ns(this, "convertToPixel", r, i);
    }, t.prototype.convertFromPixel = function(r, i) {
      return Ns(this, "convertFromPixel", r, i);
    }, t.prototype.containPixel = function(r, i) {
      if (this._disposed) {
        this.id;
        return;
      }
      var n = this._model, a, o = ss(n, r);
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
      var n = this._model, a = ss(n, r, {
        defaultMainType: "series"
      }), o = a.seriesModel, s = o.getData(), l = a.hasOwnProperty("dataIndexInside") ? a.dataIndexInside : a.hasOwnProperty("dataIndex") ? s.indexOfRawIndex(a.dataIndex) : null;
      return l != null ? $A(s, l, i) : tM(s, i);
    }, t.prototype.getViewOfComponentModel = function(r) {
      return this._componentsMap[r.__viewId];
    }, t.prototype.getViewOfSeriesModel = function(r) {
      return this._chartsMap[r.__viewId];
    }, t.prototype._initEvents = function() {
      var r = this;
      A(qM, function(i) {
        var n = function(a) {
          var o = r.getModel(), s = a.target, l, u = i === "globalout";
          if (u ? l = {} : s && un(s, function(v) {
            var g = dt(v);
            if (g && g.dataIndex != null) {
              var p = g.dataModel || o.getSeriesByIndex(g.seriesIndex);
              return l = p && p.getDataParams(g.dataIndex, g.dataType, s) || {}, !0;
            } else if (g.eventData)
              return l = E({}, g.eventData), !0;
          }, !0), l) {
            var c = l.componentType, h = l.componentIndex;
            (c === "markLine" || c === "markPoint" || c === "markArea") && (c = "series", h = l.seriesIndex);
            var d = c && h != null && o.getComponent(c, h), f = d && r[d.mainType === "series" ? "_chartsMap" : "_componentsMap"][d.__viewId];
            l.event = a, l.type = i, r._$eventProcessor.eventInfo = {
              targetEl: s,
              packedEvent: l,
              model: d,
              view: f
            }, r.trigger(i, l);
          }
        };
        n.zrEventfulCallAtLast = !0, r._zr.on(i, n, r);
      }), A(Sn, function(i, n) {
        r._messageCenter.on(n, function(a) {
          this.trigger(n, a);
        }, r);
      }), A(["selectchanged"], function(i) {
        r._messageCenter.on(i, function(n) {
          this.trigger(i, n);
        }, r);
      }), rM(this._messageCenter, this, this._api);
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
      r && qd(this.getDom(), Bu, "");
      var i = this, n = i._api, a = i._model;
      A(i._componentsViews, function(o) {
        o.dispose(a, n);
      }), A(i._chartsViews, function(o) {
        o.dispose(a, n);
      }), i._zr.dispose(), i._dom = i._model = i._chartsMap = i._componentsMap = i._chartsViews = i._componentsViews = i._scheduler = i._api = i._zr = i._throttledZrFlush = i._theme = i._coordSysMgr = i._messageCenter = null, delete xn[i.id];
    }, t.prototype.resize = function(r) {
      if (!this[Dt]) {
        if (this._disposed) {
          this.id;
          return;
        }
        this._zr.resize(r);
        var i = this._model;
        if (this._loadingFX && this._loadingFX.resize(), !!i) {
          var n = i.resetOption("media"), a = r && r.silent;
          this[Nt] && (a == null && (a = this[Nt].silent), n = !0, this[Nt] = null), this[Dt] = !0;
          try {
            n && ui(this), tr.update.call(this, {
              type: "resize",
              animation: E({
                // Disable animation
                duration: 0
              }, r && r.animation)
            });
          } catch (o) {
            throw this[Dt] = !1, o;
          }
          this[Dt] = !1, Qi.call(this, a), Ki.call(this, a);
        }
      }
    }, t.prototype.showLoading = function(r, i) {
      if (this._disposed) {
        this.id;
        return;
      }
      if (z(r) && (i = r, r = ""), r = r || "default", this.hideLoading(), !!zl[r]) {
        var n = zl[r](this._api, i), a = this._zr;
        this._loadingFX = n, a.add(n);
      }
    }, t.prototype.hideLoading = function() {
      if (this._disposed) {
        this.id;
        return;
      }
      this._loadingFX && this._zr.remove(this._loadingFX), this._loadingFX = null;
    }, t.prototype.makeActionFromEvent = function(r) {
      var i = E({}, r);
      return i.type = Sn[r.type], i;
    }, t.prototype.dispatchAction = function(r, i) {
      if (this._disposed) {
        this.id;
        return;
      }
      if (z(i) || (i = {
        silent: !!i
      }), !!vo[r.type] && this._model) {
        if (this[Dt]) {
          this._pendingActions.push(r);
          return;
        }
        var n = i.silent;
        zs.call(this, r, n);
        var a = i.flush;
        a ? this._zr.flush() : a !== !1 && V.browser.weChat && this._throttledZrFlush(), Qi.call(this, n), Ki.call(this, n);
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
        var d = h._scheduler;
        d.restorePipelines(h._model), d.prepareStageTasks(), Os(h, !0), Os(h, !1), d.plan();
      }, Os = function(h, d) {
        for (var f = h._model, v = h._scheduler, g = d ? h._componentsViews : h._chartsViews, p = d ? h._componentsMap : h._chartsMap, m = h._zr, y = h._api, _ = 0; _ < g.length; _++)
          g[_].__alive = !1;
        d ? f.eachComponent(function(b, x) {
          b !== "series" && w(x);
        }) : f.eachSeries(w);
        function w(b) {
          var x = b.__requireNewView;
          b.__requireNewView = !1;
          var T = "_ec_" + b.id + "_" + b.type, C = !x && p[T];
          if (!C) {
            var M = De(b.type), D = d ? vr.getClass(M.main, M.sub) : (
              // FIXME:TS
              // (ChartView as ChartViewConstructor).getClass('series', classType.sub)
              // For backward compat, still support a chart type declared as only subType
              // like "liquidfill", but recommend "series.liquidfill"
              // But need a base class to make a type series.
              hr.getClass(M.sub)
            );
            C = new D(), C.init(f, y), p[T] = C, g.push(C), m.add(C.group);
          }
          b.__viewId = C.__id = T, C.__alive = !0, C.__model = b, C.group.__ecComponentInfo = {
            mainType: b.mainType,
            index: b.componentIndex
          }, !d && v.prepareView(C, b, f, y);
        }
        for (var _ = 0; _ < g.length; ) {
          var S = g[_];
          S.__alive ? _++ : (!d && S.renderTask.dispose(), m.remove(S.group), S.dispose(f, y), g.splice(_, 1), p[S.__id] === S && delete p[S.__id], S.__id = S.group.__ecComponentInfo = null);
        }
      }, Sa = function(h, d, f, v, g) {
        var p = h._model;
        if (p.setUpdatePayload(f), !v) {
          A([].concat(h._componentsViews).concat(h._chartsViews), S);
          return;
        }
        var m = {};
        m[v + "Id"] = f[v + "Id"], m[v + "Index"] = f[v + "Index"], m[v + "Name"] = f[v + "Name"];
        var y = {
          mainType: v,
          query: m
        };
        g && (y.subType = g);
        var _ = f.excludeSeriesId, w;
        _ != null && (w = tt(), A(Rt(_), function(b) {
          var x = Le(b, null);
          x != null && w.set(x, !0);
        })), p && p.eachComponent(y, function(b) {
          var x = w && w.get(b.id) != null;
          if (!x)
            if (sh(f))
              if (b instanceof dr)
                f.type === Hr && !f.notBlur && !b.get(["emphasis", "disabled"]) && Mx(b, f, h._api);
              else {
                var T = pu(b.mainType, b.componentIndex, f.name, h._api), C = T.focusSelf, M = T.dispatchers;
                f.type === Hr && C && !f.notBlur && bl(b.mainType, b.componentIndex, h._api), M && A(M, function(D) {
                  f.type === Hr ? yl(D) : _l(D);
                });
              }
            else xl(f) && b instanceof dr && (Px(b, f, h._api), ah(b), $t(h));
        }, h), p && p.eachComponent(y, function(b) {
          var x = w && w.get(b.id) != null;
          x || S(h[v === "series" ? "_chartsMap" : "_componentsMap"][b.__viewId]);
        }, h);
        function S(b) {
          b && b.__alive && b[d] && b[d](b.__model, p, h._api, f);
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
        update: function(h, d) {
          var f = this._model, v = this._api, g = this._zr, p = this._coordSysMgr, m = this._scheduler;
          if (f) {
            f.setUpdatePayload(h), m.restoreData(f, h), m.performSeriesTasks(f), p.create(f, v), m.performDataProcessorTasks(f, h), Fs(this, f), p.update(f, v), r(f), m.performVisualTasks(f, h), Us(this, f, v, h, d);
            var y = f.get("backgroundColor") || "transparent", _ = f.get("darkMode");
            g.setBackgroundColor(y), _ != null && _ !== "auto" && g.setDarkMode(_), he.trigger("afterupdate", f, v);
          }
        },
        updateTransform: function(h) {
          var d = this, f = this._model, v = this._api;
          if (f) {
            f.setUpdatePayload(h);
            var g = [];
            f.eachComponent(function(m, y) {
              if (m !== "series") {
                var _ = d.getViewOfComponentModel(y);
                if (_ && _.__alive)
                  if (_.updateTransform) {
                    var w = _.updateTransform(y, f, v, h);
                    w && w.update && g.push(_);
                  } else
                    g.push(_);
              }
            });
            var p = tt();
            f.eachSeries(function(m) {
              var y = d._chartsMap[m.__viewId];
              if (y.updateTransform) {
                var _ = y.updateTransform(m, f, v, h);
                _ && _.update && p.set(m.uid, 1);
              } else
                p.set(m.uid, 1);
            }), r(f), this._scheduler.performVisualTasks(f, h, {
              setDirty: !0,
              dirtyMap: p
            }), xa(this, f, v, h, {}, p), he.trigger("afterupdate", f, v);
          }
        },
        updateView: function(h) {
          var d = this._model;
          d && (d.setUpdatePayload(h), hr.markUpdateMethod(h, "updateView"), r(d), this._scheduler.performVisualTasks(d, h, {
            setDirty: !0
          }), Us(this, d, this._api, h, {}), he.trigger("afterupdate", d, this._api));
        },
        updateVisual: function(h) {
          var d = this, f = this._model;
          f && (f.setUpdatePayload(h), f.eachSeries(function(v) {
            v.getData().clearAllVisual();
          }), hr.markUpdateMethod(h, "updateVisual"), r(f), this._scheduler.performVisualTasks(f, h, {
            visualType: "visual",
            setDirty: !0
          }), f.eachComponent(function(v, g) {
            if (v !== "series") {
              var p = d.getViewOfComponentModel(g);
              p && p.__alive && p.updateVisual(g, f, d._api, h);
            }
          }), f.eachSeries(function(v) {
            var g = d._chartsMap[v.__viewId];
            g.updateVisual(v, f, d._api, h);
          }), he.trigger("afterupdate", f, this._api));
        },
        updateLayout: function(h) {
          tr.update.call(this, h);
        }
      }, Ns = function(h, d, f, v) {
        if (h._disposed) {
          h.id;
          return;
        }
        for (var g = h._model, p = h._coordSysMgr.getCoordinateSystems(), m, y = ss(g, f), _ = 0; _ < p.length; _++) {
          var w = p[_];
          if (w[d] && (m = w[d](g, y, v)) != null)
            return m;
        }
      }, Fs = function(h, d) {
        var f = h._chartsMap, v = h._scheduler;
        d.eachSeries(function(g) {
          v.updateStreamModes(g, f[g.__viewId]);
        });
      }, zs = function(h, d) {
        var f = this, v = this.getModel(), g = h.type, p = h.escapeConnect, m = vo[g], y = m.actionInfo, _ = (y.update || "update").split(":"), w = _.pop(), S = _[0] != null && De(_[0]);
        this[Dt] = !0;
        var b = [h], x = !1;
        h.batch && (x = !0, b = $(h.batch, function(k) {
          return k = ct(E({}, k), h), k.batch = null, k;
        }));
        var T = [], C, M = xl(h), D = sh(h);
        if (D && vv(this._api), A(b, function(k) {
          if (C = m.action(k, f._model, f._api), C = C || E({}, k), C.type = y.event || C.type, T.push(C), D) {
            var B = su(h), O = B.queryOptionMap, X = B.mainTypeSpecified, q = X ? O.keys()[0] : "series";
            Sa(f, w, k, q), $t(f);
          } else M ? (Sa(f, w, k, "series"), $t(f)) : S && Sa(f, w, k, S.main, S.sub);
        }), w !== "none" && !D && !M && !S)
          try {
            this[Nt] ? (ui(this), tr.update.call(this, h), this[Nt] = null) : tr[w].call(this, h);
          } catch (k) {
            throw this[Dt] = !1, k;
          }
        if (x ? C = {
          type: y.event || g,
          escapeConnect: p,
          batch: T
        } : C = T[0], this[Dt] = !1, !d) {
          var P = this._messageCenter;
          if (P.trigger(C.type, C), M) {
            var L = {
              type: "selectchanged",
              escapeConnect: p,
              selected: Lx(v),
              isFromClick: h.isFromClick || !1,
              fromAction: h.type,
              fromActionPayload: h
            };
            P.trigger(L.type, L);
          }
        }
      }, Qi = function(h) {
        for (var d = this._pendingActions; d.length; ) {
          var f = d.shift();
          zs.call(this, f, h);
        }
      }, Ki = function(h) {
        !h && this.trigger("updated");
      }, bf = function(h, d) {
        h.on("rendered", function(f) {
          d.trigger("rendered", f), // Although zr is dirty if initial animation is not finished
          // and this checking is called on frame, we also check
          // animation finished for robustness.
          h.animation.isFinished() && !d[Nt] && !d._scheduler.unfinished && !d._pendingActions.length && d.trigger("finished");
        });
      }, Sf = function(h, d) {
        h.on("mouseover", function(f) {
          var v = f.target, g = un(v, Sl);
          g && (Dx(g, f, d._api), $t(d));
        }).on("mouseout", function(f) {
          var v = f.target, g = un(v, Sl);
          g && (kx(g, f, d._api), $t(d));
        }).on("click", function(f) {
          var v = f.target, g = un(v, function(y) {
            return dt(y).dataIndex != null;
          }, !0);
          if (g) {
            var p = g.selected ? "unselect" : "select", m = dt(g);
            d._api.dispatchAction({
              type: p,
              dataType: m.dataType,
              dataIndexInside: m.dataIndex,
              seriesIndex: m.seriesIndex,
              isFromClick: !0
            });
          }
        });
      };
      function r(h) {
        h.clearColorPalette(), h.eachSeries(function(d) {
          d.clearColorPalette();
        });
      }
      function i(h) {
        var d = [], f = [], v = !1;
        if (h.eachComponent(function(y, _) {
          var w = _.get("zlevel") || 0, S = _.get("z") || 0, b = _.getZLevelKey();
          v = v || !!b, (y === "series" ? f : d).push({
            zlevel: w,
            z: S,
            idx: _.componentIndex,
            type: y,
            key: b
          });
        }), v) {
          var g = d.concat(f), p, m;
          ka(g, function(y, _) {
            return y.zlevel === _.zlevel ? y.z - _.z : y.zlevel - _.zlevel;
          }), A(g, function(y) {
            var _ = h.getComponent(y.type, y.idx), w = y.zlevel, S = y.key;
            p != null && (w = Math.max(p, w)), S ? (w === p && S !== m && w++, m = S) : m && (w === p && w++, m = ""), p = w, _.setZLevel(w);
          });
        }
      }
      Us = function(h, d, f, v, g) {
        i(d), xf(h, d, f, v, g), A(h._chartsViews, function(p) {
          p.__alive = !1;
        }), xa(h, d, f, v, g), A(h._chartsViews, function(p) {
          p.__alive || p.remove(d, f);
        });
      }, xf = function(h, d, f, v, g, p) {
        A(p || h._componentsViews, function(m) {
          var y = m.__model;
          u(y, m), m.render(y, d, f, v), s(y, m), c(y, m);
        });
      }, xa = function(h, d, f, v, g, p) {
        var m = h._scheduler;
        g = E(g || {}, {
          updatedSeries: d.getSeries()
        }), he.trigger("series:beforeupdate", d, f, g);
        var y = !1;
        d.eachSeries(function(_) {
          var w = h._chartsMap[_.__viewId];
          w.__alive = !0;
          var S = w.renderTask;
          m.updatePayload(S, v), u(_, w), p && p.get(_.uid) && S.dirty(), S.perform(m.getPerformArgs(S)) && (y = !0), w.group.silent = !!_.get("silent"), o(_, w), ah(_);
        }), m.unfinished = y || m.unfinished, he.trigger("series:layoutlabels", d, f, g), he.trigger("series:transition", d, f, g), d.eachSeries(function(_) {
          var w = h._chartsMap[_.__viewId];
          s(_, w), c(_, w);
        }), a(h, d), he.trigger("series:afterupdate", d, f, g);
      }, $t = function(h) {
        h[Rs] = !0, h.getZr().wakeUp();
      }, Cf = function(h) {
        h[Rs] && (h.getZr().storage.traverse(function(d) {
          wn(d) || n(d);
        }), h[Rs] = !1);
      };
      function n(h) {
        for (var d = [], f = h.currentStates, v = 0; v < f.length; v++) {
          var g = f[v];
          g === "emphasis" || g === "blur" || g === "select" || d.push(g);
        }
        h.selected && h.states.select && d.push("select"), h.hoverState === du && h.states.emphasis ? d.push("emphasis") : h.hoverState === fu && h.states.blur && d.push("blur"), h.useStates(d);
      }
      function a(h, d) {
        var f = h._zr, v = f.storage, g = 0;
        v.traverse(function(p) {
          p.isGroup || g++;
        }), g > d.get("hoverLayerThreshold") && !V.node && !V.worker && d.eachSeries(function(p) {
          if (!p.preventUsingHoverLayer) {
            var m = h._chartsMap[p.__viewId];
            m.__alive && m.eachRendered(function(y) {
              y.states.emphasis && (y.states.emphasis.hoverLayer = !0);
            });
          }
        });
      }
      function o(h, d) {
        var f = h.get("blendMode") || null;
        d.eachRendered(function(v) {
          v.isGroup || (v.style.blend = f);
        });
      }
      function s(h, d) {
        if (!h.preventAutoZ) {
          var f = h.get("z") || 0, v = h.get("zlevel") || 0;
          d.eachRendered(function(g) {
            return l(g, f, v, -1 / 0), !0;
          });
        }
      }
      function l(h, d, f, v) {
        var g = h.getTextContent(), p = h.getTextGuideLine(), m = h.isGroup;
        if (m)
          for (var y = h.childrenRef(), _ = 0; _ < y.length; _++)
            v = Math.max(l(y[_], d, f, v), v);
        else
          h.z = d, h.zlevel = f, v = Math.max(h.z2, v);
        if (g && (g.z = d, g.zlevel = f, isFinite(v) && (g.z2 = v + 2)), p) {
          var w = h.textGuideLineConfig;
          p.z = d, p.zlevel = f, isFinite(v) && (p.z2 = v + (w && w.showAbove ? 1 : -1));
        }
        return v;
      }
      function u(h, d) {
        d.eachRendered(function(f) {
          if (!wn(f)) {
            var v = f.getTextContent(), g = f.getTextGuideLine();
            f.stateTransition && (f.stateTransition = null), v && v.stateTransition && (v.stateTransition = null), g && g.stateTransition && (g.stateTransition = null), f.hasState() ? (f.prevStates = f.currentStates, f.clearStates()) : f.prevStates && (f.prevStates = null);
          }
        });
      }
      function c(h, d) {
        var f = h.getModel("stateAnimation"), v = h.isAnimationEnabled(), g = f.get("duration"), p = g > 0 ? {
          duration: g,
          delay: f.get("delay"),
          easing: f.get("easing")
          // additive: stateAnimationModel.get('additive')
        } : null;
        d.eachRendered(function(m) {
          if (m.states && m.states.emphasis) {
            if (wn(m))
              return;
            if (m instanceof ot && zx(m), m.__dirty) {
              var y = m.prevStates;
              y && m.useStates(y);
            }
            if (v) {
              m.stateTransition = p;
              var _ = m.getTextContent(), w = m.getTextGuideLine();
              _ && (_.stateTransition = p), w && (w.stateTransition = p);
            }
            m.__dirty && n(m);
          }
        });
      }
      Tf = function(h) {
        return new /** @class */
        ((function(d) {
          G(f, d);
          function f() {
            return d !== null && d.apply(this, arguments) || this;
          }
          return f.prototype.getCoordinateSystems = function() {
            return h._coordSysMgr.getCoordinateSystems();
          }, f.prototype.getComponentByElement = function(v) {
            for (; v; ) {
              var g = v.__ecComponentInfo;
              if (g != null)
                return h._model.getComponent(g.mainType, g.index);
              v = v.parent;
            }
          }, f.prototype.enterEmphasis = function(v, g) {
            yl(v, g), $t(h);
          }, f.prototype.leaveEmphasis = function(v, g) {
            _l(v, g), $t(h);
          }, f.prototype.enterBlur = function(v) {
            Ax(v), $t(h);
          }, f.prototype.leaveBlur = function(v) {
            cv(v), $t(h);
          }, f.prototype.enterSelect = function(v) {
            hv(v), $t(h);
          }, f.prototype.leaveSelect = function(v) {
            fv(v), $t(h);
          }, f.prototype.getModel = function() {
            return h.getModel();
          }, f.prototype.getViewOfComponentModel = function(v) {
            return h.getViewOfComponentModel(v);
          }, f.prototype.getViewOfSeriesModel = function(v) {
            return h.getViewOfSeriesModel(v);
          }, f;
        })(Xv))(h);
      }, zp = function(h) {
        function d(f, v) {
          for (var g = 0; g < f.length; g++) {
            var p = f[g];
            p[Bs] = v;
          }
        }
        A(Sn, function(f, v) {
          h._messageCenter.on(v, function(g) {
            if (Af[h.group] && h[Bs] !== wf) {
              if (g && g.escapeConnect)
                return;
              var p = h.makeActionFromEvent(g), m = [];
              A(xn, function(y) {
                y !== h && y.group === h.group && m.push(y);
              }), d(m, wf), A(m, function(y) {
                y[Bs] !== YM && y.dispatchAction(p);
              }), d(m, XM);
            }
          });
        });
      };
    })(), t;
  })(Ee)
), Ru = Up.prototype;
Ru.on = Rp("on");
Ru.off = Rp("off");
Ru.one = function(e, t, r) {
  var i = this;
  function n() {
    for (var a = [], o = 0; o < arguments.length; o++)
      a[o] = arguments[o];
    t && t.apply && t.apply(this, a), i.off(e, n);
  }
  this.on.call(this, e, n, r);
};
var qM = ["click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "globalout", "contextmenu"];
var vo = {}, Sn = {}, Nl = [], Fl = [], po = [], Vp = {}, zl = {}, xn = {}, Af = {}, ZM = +/* @__PURE__ */ new Date() - 0, Bu = "_echarts_instance_";
function QM(e, t, r) {
  var i = !(r && r.ssr);
  if (i) {
    var n = KM(e);
    if (n)
      return n;
  }
  var a = new Up(e, t, r);
  return a.id = "ec_" + ZM++, xn[a.id] = a, i && qd(e, Bu, a.id), zp(a), he.trigger("afterinit", a), a;
}
function KM(e) {
  return xn[gS(e, Bu)];
}
function Wp(e, t) {
  Vp[e] = t;
}
function Hp(e) {
  st(Fl, e) < 0 && Fl.push(e);
}
function Gp(e, t) {
  Nu(Nl, e, t, NM);
}
function JM(e) {
  Ou("afterinit", e);
}
function jM(e) {
  Ou("afterupdate", e);
}
function Ou(e, t) {
  he.on(e, t);
}
function Ri(e, t, r) {
  rt(t) && (r = t, t = "");
  var i = z(e) ? e.type : [e, e = {
    event: t
  }][0];
  e.event = (e.event || i).toLowerCase(), t = e.event, !Sn[t] && (We(_f.test(i) && _f.test(t)), vo[i] || (vo[i] = {
    action: r,
    actionInfo: e
  }), Sn[t] = i);
}
function $M(e, t) {
  qv.register(e, t);
}
function tD(e, t) {
  Nu(po, e, t, Lp, "layout");
}
function Qr(e, t) {
  Nu(po, e, t, Ip, "visual");
}
var Mf = [];
function Nu(e, t, r, i, n) {
  if ((rt(t) || z(t)) && (r = t, t = i), !(st(Mf, r) >= 0)) {
    Mf.push(r);
    var a = mp.wrapStageHandler(r, n);
    a.__prio = t, a.__raw = r, e.push(a);
  }
}
function Yp(e, t) {
  zl[e] = t;
}
function eD(e, t, r) {
  var i = IM("registerMap");
  i && i(e, t, r);
}
var rD = aA;
Qr(Eu, OA);
Qr(Bo, NA);
Qr(Bo, FA);
Qr(Eu, JA);
Qr(Bo, jA);
Qr(Ep, PM);
Hp(Qv);
Gp(BM, VC);
Yp("default", zA);
Ri({
  type: Hr,
  event: Hr,
  update: Hr
}, Wt);
Ri({
  type: Ba,
  event: Ba,
  update: Ba
}, Wt);
Ri({
  type: mn,
  event: mn,
  update: mn
}, Wt);
Ri({
  type: Oa,
  event: Oa,
  update: Oa
}, Wt);
Ri({
  type: yn,
  event: yn,
  update: yn
}, Wt);
Wp("light", QA);
Wp("dark", bp);
function Ji(e) {
  return e == null ? 0 : e.length || 1;
}
function Df(e) {
  return e;
}
var iD = (
  /** @class */
  (function() {
    function e(t, r, i, n, a, o) {
      this._old = t, this._new = r, this._oldKeyGetter = i || Df, this._newKeyGetter = n || Df, this.context = a, this._diffModeMultiple = o === "multiple";
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
        var s = n[o], l = i[s], u = Ji(l);
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
        var l = a[s], u = i[l], c = n[l], h = Ji(u), d = Ji(c);
        if (h > 1 && d === 1)
          this._updateManyToOne && this._updateManyToOne(c, u), n[l] = null;
        else if (h === 1 && d > 1)
          this._updateOneToMany && this._updateOneToMany(c, u), n[l] = null;
        else if (h === 1 && d === 1)
          this._update && this._update(c, u), n[l] = null;
        else if (h > 1 && d > 1)
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
        var n = t[i], a = r[n], o = Ji(a);
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
          var l = r[s], u = Ji(l);
          u === 0 ? (r[s] = o, a && i.push(s)) : u === 1 ? r[s] = [l, o] : l.push(o);
        }
      }
    }, e;
  })()
), nD = (
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
function aD(e, t) {
  var r = {}, i = r.encode = {}, n = tt(), a = [], o = [], s = {};
  A(e.dimensions, function(d) {
    var f = e.getDimensionInfo(d), v = f.coordDim;
    if (v) {
      var g = f.coordDimIndex;
      Vs(i, v)[g] = d, f.isExtraCoord || (n.set(v, 1), oD(f.type) && (a[0] = d), Vs(s, v)[g] = e.getDimensionIndex(f.name)), f.defaultTooltip && o.push(d);
    }
    Vv.each(function(p, m) {
      var y = Vs(i, m), _ = f.otherDims[m];
      _ != null && _ !== !1 && (y[_] = f.name);
    });
  });
  var l = [], u = {};
  n.each(function(d, f) {
    var v = i[f];
    u[f] = v[0], l = l.concat(v);
  }), r.dataDimsOnCoord = l, r.dataDimIndicesOnCoord = $(l, function(d) {
    return e.getDimensionInfo(d).storeDimIndex;
  }), r.encodeFirstDimNotExtra = u;
  var c = i.label;
  c && c.length && (a = c.slice());
  var h = i.tooltip;
  return h && h.length ? o = h.slice() : o.length || (o = a.slice()), i.defaultedLabel = a, i.defaultedTooltip = o, r.userOutput = new nD(s, t), r;
}
function Vs(e, t) {
  return e.hasOwnProperty(t) || (e[t] = []), e[t];
}
function oD(e) {
  return !(e === "ordinal" || e === "time");
}
var Va = (
  /** @class */
  /* @__PURE__ */ (function() {
    function e(t) {
      this.otherDims = {}, t != null && E(this, t);
    }
    return e;
  })()
), sD = wt(), lD = {
  float: "f",
  int: "i",
  ordinal: "o",
  number: "n",
  time: "t"
}, Xp = (
  /** @class */
  (function() {
    function e(t) {
      this.dimensions = t.dimensions, this._dimOmitted = t.dimensionOmitted, this.source = t.source, this._fullDimCount = t.fullDimensionCount, this._updateDimOmitted(t.dimensionOmitted);
    }
    return e.prototype.isDimensionOmitted = function() {
      return this._dimOmitted;
    }, e.prototype._updateDimOmitted = function(t) {
      this._dimOmitted = t, t && (this._dimNameMap || (this._dimNameMap = Zp(this.source)));
    }, e.prototype.getSourceDimensionIndex = function(t) {
      return K(this._dimNameMap.get(t), -1);
    }, e.prototype.getSourceDimension = function(t) {
      var r = this.source.dimensionsDefine;
      if (r)
        return r[t];
    }, e.prototype.makeStoreSchema = function() {
      for (var t = this._fullDimCount, r = jv(this.source), i = !Qp(t), n = "", a = [], o = 0, s = 0; o < t; o++) {
        var l = void 0, u = void 0, c = void 0, h = this.dimensions[s];
        if (h && h.storeDimIndex === o)
          l = r ? h.name : null, u = h.type, c = h.ordinalMeta, s++;
        else {
          var d = this.getSourceDimension(o);
          d && (l = r ? d.name : null, u = d.type);
        }
        a.push({
          property: l,
          type: u,
          ordinalMeta: c
        }), r && l != null && (!h || !h.isCalculationCoord) && (n += i ? l.replace(/\`/g, "`1").replace(/\$/g, "`2") : l), n += "$", n += lD[u] || "f", c && (n += c.uid), n += "$";
      }
      var f = this.source, v = [f.seriesLayoutBy, f.startIndex, n].join("$$");
      return {
        dimensions: a,
        hash: v
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
function uD(e) {
  return e instanceof Xp;
}
function qp(e) {
  for (var t = tt(), r = 0; r < (e || []).length; r++) {
    var i = e[r], n = z(i) ? i.name : i;
    n != null && t.get(n) == null && t.set(n, r);
  }
  return t;
}
function Zp(e) {
  var t = sD(e);
  return t.dimNameMap || (t.dimNameMap = qp(e.dimensionsDefine));
}
function Qp(e) {
  return e > 30;
}
var ji = z, er = $, cD = typeof Int32Array > "u" ? Array : Int32Array, hD = "e\0\0", kf = -1, fD = ["hasItemOption", "_nameList", "_idList", "_invertedIndicesMap", "_dimSummary", "userOutput", "_rawData", "_dimValueGetter", "_nameDimIdx", "_idDimIdx", "_nameRepeatCount"], dD = ["_approximateExtent"], Pf, Ta, $i, tn, Ws, en, Hs, vD = (
  /** @class */
  (function() {
    function e(t, r) {
      this.type = "list", this._dimOmitted = !1, this._nameList = [], this._idList = [], this._visual = {}, this._layout = {}, this._itemVisuals = [], this._itemLayouts = [], this._graphicEls = [], this._approximateExtent = {}, this._calculationInfo = {}, this.hasItemOption = !1, this.TRANSFERABLE_METHODS = ["cloneShallow", "downSample", "minmaxDownSample", "lttbDownSample", "map"], this.CHANGABLE_METHODS = ["filterSelf", "selectRange"], this.DOWNSAMPLE_METHODS = ["downSample", "minmaxDownSample", "lttbDownSample"];
      var i, n = !1;
      uD(t) ? (i = t.dimensions, this._dimOmitted = t.isDimensionOmitted(), this._schema = t) : (n = !0, i = t), i = i || ["x", "y"];
      for (var a = {}, o = [], s = {}, l = !1, u = {}, c = 0; c < i.length; c++) {
        var h = i[c], d = W(h) ? new Va({
          name: h
        }) : h instanceof Va ? h : new Va(h), f = d.name;
        d.type = d.type || "float", d.coordDim || (d.coordDim = f, d.coordDimIndex = 0);
        var v = d.otherDims = d.otherDims || {};
        o.push(f), a[f] = d, u[f] != null && (l = !0), d.createInvertedIndices && (s[f] = []), v.itemName === 0 && (this._nameDimIdx = c), v.itemId === 0 && (this._idDimIdx = c), n && (d.storeDimIndex = c);
      }
      if (this.dimensions = o, this._dimInfos = a, this._initGetDimensionInfo(l), this.hostModel = r, this._invertedIndicesMap = s, this._dimOmitted) {
        var g = this._dimIdxToName = tt();
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
      if (yt(t) || t != null && !isNaN(t) && !this._getDimInfo(t) && (!this._dimOmitted || this._schema.getSourceDimensionIndex(t) < 0))
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
      if (t instanceof Dl && (a = t), !a) {
        var o = this.dimensions, s = Pu(t) || Ht(t) ? new $v(t, o.length) : t;
        a = new Dl();
        var l = er(o, function(u) {
          return {
            type: n._dimInfos[u].type,
            property: u
          };
        });
        a.initData(s, l, i);
      }
      this._store = a, this._nameList = (r || []).slice(), this._idList = [], this._nameRepeatCount = {}, this._doInit(0, a.count()), this._dimSummary = aD(this, this._schema), this.userOutput = this._dimSummary.userOutput;
    }, e.prototype.appendData = function(t) {
      var r = this._store.appendData(t);
      this._doInit(r[0], r[1]);
    }, e.prototype.appendValues = function(t, r) {
      var i = this._store.appendValues(t, r && r.length), n = i.start, a = i.end, o = this._shouldMakeIdFromName();
      if (this._updateOrdinalMeta(), r)
        for (var s = n; s < a; s++) {
          var l = s - n;
          this._nameList[s] = r[l], o && Hs(this, s);
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
        var a = this._nameList, o = this._idList, s = n.getSource().sourceFormat, l = s === Re;
        if (l && !n.pure)
          for (var u = [], c = t; c < r; c++) {
            var h = n.getItem(c, u);
            if (!this.hasItemOption && aS(h) && (this.hasItemOption = !0), h) {
              var d = h.name;
              a[c] == null && d != null && (a[c] = Le(d, null));
              var f = h.id;
              o[c] == null && f != null && (o[c] = Le(f, null));
            }
          }
        if (this._shouldMakeIdFromName())
          for (var c = t; c < r; c++)
            Hs(this, c);
        Pf(this);
      }
    }, e.prototype.getApproximateExtent = function(t) {
      return this._approximateExtent[t] || this._store.getDataExtent(this._getStoreDimIndex(t));
    }, e.prototype.setApproximateExtent = function(t, r) {
      r = this.getDimension(r), this._approximateExtent[r] = t.slice();
    }, e.prototype.getCalculationInfo = function(t) {
      return this._calculationInfo[t];
    }, e.prototype.setCalculationInfo = function(t, r) {
      ji(t) ? E(this._calculationInfo, t) : this._calculationInfo[t] = r;
    }, e.prototype.getName = function(t) {
      var r = this.getRawIndex(t), i = this._nameList[r];
      return i == null && this._nameDimIdx != null && (i = $i(this, this._nameDimIdx, r)), i == null && (i = ""), i;
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
      return N(t) ? n.getValues(er(t, function(a) {
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
      return n == null || isNaN(n) ? kf : n;
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
      return A(n, function(a) {
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
      return new vt(i, r, r && r.ecModel);
    }, e.prototype.diff = function(t) {
      var r = this;
      return new iD(t ? t.getStore().getIndices() : [], this.getStore().getIndices(), function(i) {
        return Ta(t, i);
      }, function(i) {
        return Ta(r, i);
      });
    }, e.prototype.getVisual = function(t) {
      var r = this._visual;
      return r && r[t];
    }, e.prototype.setVisual = function(t, r) {
      this._visual = this._visual || {}, ji(t) ? E(this._visual, t) : this._visual[t] = r;
    }, e.prototype.getItemVisual = function(t, r) {
      var i = this._itemVisuals[t], n = i && i[r];
      return n ?? this.getVisual(r);
    }, e.prototype.hasItemVisual = function() {
      return this._itemVisuals.length > 0;
    }, e.prototype.ensureUniqueItemVisual = function(t, r) {
      var i = this._itemVisuals, n = i[t];
      n || (n = i[t] = {});
      var a = n[r];
      return a == null && (a = this.getVisual(r), N(a) ? a = a.slice() : ji(a) && (a = E({}, a)), n[r] = a), a;
    }, e.prototype.setItemVisual = function(t, r, i) {
      var n = this._itemVisuals[t] || {};
      this._itemVisuals[t] = n, ji(r) ? E(n, r) : n[r] = i;
    }, e.prototype.clearAllVisual = function() {
      this._visual = {}, this._itemVisuals = [];
    }, e.prototype.setLayout = function(t, r) {
      ji(t) ? E(this._layout, t) : this._layout[t] = r;
    }, e.prototype.getLayout = function(t) {
      return this._layout[t];
    }, e.prototype.getItemLayout = function(t) {
      return this._itemLayouts[t];
    }, e.prototype.setItemLayout = function(t, r, i) {
      this._itemLayouts[t] = i ? E(this._itemLayouts[t] || {}, r) : r;
    }, e.prototype.clearItemLayouts = function() {
      this._itemLayouts.length = 0;
    }, e.prototype.setItemGraphicEl = function(t, r) {
      var i = this.hostModel && this.hostModel.seriesIndex;
      px(i, this.dataType, t, r), this._graphicEls[t] = r;
    }, e.prototype.getItemGraphicEl = function(t) {
      return this._graphicEls[t];
    }, e.prototype.eachItemGraphicEl = function(t, r) {
      A(this._graphicEls, function(i, n) {
        i && t && t.call(r, i, n);
      });
    }, e.prototype.cloneShallow = function(t) {
      return t || (t = new e(this._schema ? this._schema : er(this.dimensions, this._getDimInfo, this), this.hostModel)), Ws(t, this), t._store = this._store, t;
    }, e.prototype.wrapMethod = function(t, r) {
      var i = this[t];
      rt(i) && (this.__wrappedMethods = this.__wrappedMethods || [], this.__wrappedMethods.push(t), this[t] = function() {
        var n = i.apply(this, arguments);
        return r.apply(this, [n].concat(tu(arguments)));
      });
    }, e.internalField = (function() {
      Pf = function(t) {
        var r = t._invertedIndicesMap;
        A(r, function(i, n) {
          var a = t._dimInfos[n], o = a.ordinalMeta, s = t._store;
          if (o) {
            i = r[n] = new cD(o.categories.length);
            for (var l = 0; l < i.length; l++)
              i[l] = kf;
            for (var l = 0; l < s.count(); l++)
              i[s.get(a.storeDimIndex, l)] = l;
          }
        });
      }, $i = function(t, r, i) {
        return Le(t._getCategory(r, i), null);
      }, Ta = function(t, r) {
        var i = t._idList[r];
        return i == null && t._idDimIdx != null && (i = $i(t, t._idDimIdx, r)), i == null && (i = hD + r), i;
      }, tn = function(t) {
        return N(t) || (t = t != null ? [t] : []), t;
      }, en = function(t) {
        var r = new e(t._schema ? t._schema : er(t.dimensions, t._getDimInfo, t), t.hostModel);
        return Ws(r, t), r;
      }, Ws = function(t, r) {
        A(fD.concat(r.__wrappedMethods || []), function(i) {
          r.hasOwnProperty(i) && (t[i] = r[i]);
        }), t.__wrappedMethods = r.__wrappedMethods, A(dD, function(i) {
          t[i] = j(r[i]);
        }), t._calculationInfo = E({}, r._calculationInfo);
      }, Hs = function(t, r) {
        var i = t._nameList, n = t._idList, a = t._nameDimIdx, o = t._idDimIdx, s = i[r], l = n[r];
        if (s == null && a != null && (i[r] = s = $i(t, a, r)), l == null && o != null && (n[r] = l = $i(t, o, r)), l == null && s != null) {
          var u = t._nameRepeatCount, c = u[s] = (u[s] || 0) + 1;
          l = s, c > 1 && (l += "__ec__" + c), n[r] = l;
        }
      };
    })(), e;
  })()
);
function pD(e, t) {
  Pu(e) || (e = Kv(e)), t = t || {};
  var r = t.coordDimensions || [], i = t.dimensionsDefine || e.dimensionsDefine || [], n = tt(), a = [], o = mD(e, r, i, t.dimensionsCount), s = t.canOmitUnusedDimensions && Qp(o), l = i === e.dimensionsDefine, u = l ? Zp(e) : qp(i), c = t.encodeDefine;
  !c && t.encodeDefaulter && (c = t.encodeDefaulter(e, o));
  for (var h = tt(c), d = new np(o), f = 0; f < d.length; f++)
    d[f] = -1;
  function v(C) {
    var M = d[C];
    if (M < 0) {
      var D = i[C], P = z(D) ? D : {
        name: D
      }, L = new Va(), k = P.name;
      k != null && u.get(k) != null && (L.name = L.displayName = k), P.type != null && (L.type = P.type), P.displayName != null && (L.displayName = P.displayName);
      var B = a.length;
      return d[C] = B, L.storeDimIndex = C, a.push(L), L;
    }
    return a[M];
  }
  if (!s)
    for (var f = 0; f < o; f++)
      v(f);
  h.each(function(C, M) {
    var D = Rt(C).slice();
    if (D.length === 1 && !W(D[0]) && D[0] < 0) {
      h.set(M, !1);
      return;
    }
    var P = h.set(M, []);
    A(D, function(L, k) {
      var B = W(L) ? u.get(L) : L;
      B != null && B < o && (P[k] = B, p(v(B), M, k));
    });
  });
  var g = 0;
  A(r, function(C) {
    var M, D, P, L;
    if (W(C))
      M = C, L = {};
    else {
      L = C, M = L.name;
      var k = L.ordinalMeta;
      L.ordinalMeta = null, L = E({}, L), L.ordinalMeta = k, D = L.dimsDef, P = L.otherDims, L.name = L.coordDim = L.coordDimIndex = L.dimsDef = L.otherDims = null;
    }
    var B = h.get(M);
    if (B !== !1) {
      if (B = Rt(B), !B.length)
        for (var O = 0; O < (D && D.length || 1); O++) {
          for (; g < o && v(g).coordDim != null; )
            g++;
          g < o && B.push(g++);
        }
      A(B, function(X, q) {
        var F = v(X);
        if (l && L.type != null && (F.type = L.type), p(ct(F, L), M, q), F.name == null && D) {
          var Z = D[q];
          !z(Z) && (Z = {
            name: Z
          }), F.name = F.displayName = Z.name, F.defaultTooltip = Z.defaultTooltip;
        }
        P && ct(F.otherDims, P);
      });
    }
  });
  function p(C, M, D) {
    Vv.get(M) != null ? C.otherDims[M] = D : (C.coordDim = M, C.coordDimIndex = D, n.set(M, !0));
  }
  var m = t.generateCoord, y = t.generateCoordCount, _ = y != null;
  y = m ? y || 1 : 0;
  var w = m || "value";
  function S(C) {
    C.name == null && (C.name = C.coordDim);
  }
  if (s)
    A(a, function(C) {
      S(C);
    }), a.sort(function(C, M) {
      return C.storeDimIndex - M.storeDimIndex;
    });
  else
    for (var b = 0; b < o; b++) {
      var x = v(b), T = x.coordDim;
      T == null && (x.coordDim = yD(w, n, _), x.coordDimIndex = 0, (!m || y <= 0) && (x.isExtraCoord = !0), y--), S(x), x.type == null && (Gv(e, b) === Tt.Must || x.isExtraCoord && (x.otherDims.itemName != null || x.otherDims.seriesName != null)) && (x.type = "ordinal");
    }
  return gD(a), new Xp({
    source: e,
    dimensions: a,
    fullDimensionCount: o,
    dimensionOmitted: s
  });
}
function gD(e) {
  for (var t = tt(), r = 0; r < e.length; r++) {
    var i = e[r], n = i.name, a = t.get(n) || 0;
    a > 0 && (i.name = n + (a - 1)), a++, t.set(n, a);
  }
}
function mD(e, t, r, i) {
  var n = Math.max(e.dimensionsDetectedCount || 1, t.length, r.length, i || 0);
  return A(t, function(a) {
    var o;
    z(a) && (o = a.dimsDef) && (n = Math.max(n, o.length));
  }), n;
}
function yD(e, t, r) {
  if (r || t.hasKey(e)) {
    for (var i = 0; t.hasKey(e + i); )
      i++;
    e += i;
  }
  return t.set(e, !0), e;
}
function Kp(e, t) {
  return e.type === "category" ? e.scale.getLabel(t) : t.value;
}
function _D(e) {
  var t = e.get("interval");
  return t ?? "auto";
}
function wD(e) {
  return e.type === "category" && _D(e.getLabelModel()) === 0;
}
var Lf = [], bD = {
  registerPreprocessor: Hp,
  registerProcessor: Gp,
  registerPostInit: JM,
  registerPostUpdate: jM,
  registerUpdateLifecycle: Ou,
  registerAction: Ri,
  registerCoordinateSystem: $M,
  registerLayout: tD,
  registerVisual: Qr,
  registerTransform: rD,
  registerLoading: Yp,
  registerMap: eD,
  registerImpl: LM,
  PRIORITY: GM,
  ComponentModel: at,
  ComponentView: vr,
  SeriesModel: dr,
  ChartView: hr,
  // TODO Use ComponentModel and SeriesModel instead of Constructor
  registerComponentModel: function(e) {
    at.registerClass(e);
  },
  registerComponentView: function(e) {
    vr.registerClass(e);
  },
  registerSeriesModel: function(e) {
    dr.registerClass(e);
  },
  registerChartView: function(e) {
    hr.registerClass(e);
  },
  registerSubTypeDefaulter: function(e, t) {
    at.registerSubTypeDefaulter(e, t);
  },
  registerPainter: function(e, t) {
    Qb(e, t);
  }
};
function Fu(e) {
  if (N(e)) {
    A(e, function(t) {
      Fu(t);
    });
    return;
  }
  st(Lf, e) >= 0 || (Lf.push(e), rt(e) && (e = {
    install: e
  }), e.install(bD));
}
function Jp(e, t, r, i, n, a, o, s) {
  var l = n - e, u = a - t, c = r - e, h = i - t, d = Math.sqrt(c * c + h * h);
  c /= d, h /= d;
  var f = l * c + u * h, v = f / d;
  v *= d;
  var g = o[0] = e + v * c, p = o[1] = t + v * h;
  return Math.sqrt((g - n) * (g - n) + (p - a) * (p - a));
}
var or = new H(), ut = new H(), Ct = new H(), sr = new H(), Ae = new H(), go = [], It = new H();
function SD(e, t) {
  if (t <= 180 && t > 0) {
    t = t / 180 * Math.PI, or.fromArray(e[0]), ut.fromArray(e[1]), Ct.fromArray(e[2]), H.sub(sr, or, ut), H.sub(Ae, Ct, ut);
    var r = sr.len(), i = Ae.len();
    if (!(r < 1e-3 || i < 1e-3)) {
      sr.scale(1 / r), Ae.scale(1 / i);
      var n = sr.dot(Ae), a = Math.cos(t);
      if (a < n) {
        var o = Jp(ut.x, ut.y, Ct.x, Ct.y, or.x, or.y, go);
        It.fromArray(go), It.scaleAndAdd(Ae, o / Math.tan(Math.PI - t));
        var s = Ct.x !== ut.x ? (It.x - ut.x) / (Ct.x - ut.x) : (It.y - ut.y) / (Ct.y - ut.y);
        if (isNaN(s))
          return;
        s < 0 ? H.copy(It, ut) : s > 1 && H.copy(It, Ct), It.toArray(e[1]);
      }
    }
  }
}
function xD(e, t, r) {
  if (r <= 180 && r > 0) {
    r = r / 180 * Math.PI, or.fromArray(e[0]), ut.fromArray(e[1]), Ct.fromArray(e[2]), H.sub(sr, ut, or), H.sub(Ae, Ct, ut);
    var i = sr.len(), n = Ae.len();
    if (!(i < 1e-3 || n < 1e-3)) {
      sr.scale(1 / i), Ae.scale(1 / n);
      var a = sr.dot(t), o = Math.cos(r);
      if (a < o) {
        var s = Jp(ut.x, ut.y, Ct.x, Ct.y, or.x, or.y, go);
        It.fromArray(go);
        var l = Math.PI / 2, u = Math.acos(Ae.dot(t)), c = l + u - r;
        if (c >= l)
          H.copy(It, Ct);
        else {
          It.scaleAndAdd(Ae, s / Math.tan(Math.PI / 2 - c));
          var h = Ct.x !== ut.x ? (It.x - ut.x) / (Ct.x - ut.x) : (It.y - ut.y) / (Ct.y - ut.y);
          if (isNaN(h))
            return;
          h < 0 ? H.copy(It, ut) : h > 1 && H.copy(It, Ct);
        }
        It.toArray(e[1]);
      }
    }
  }
}
function Gs(e, t, r, i) {
  var n = r === "normal", a = n ? e : e.ensureState(r);
  a.ignore = t;
  var o = i.get("smooth");
  o && o === !0 && (o = 0.3), a.shape = a.shape || {}, o > 0 && (a.shape.smooth = o);
  var s = i.getModel("lineStyle").getLineStyle();
  n ? e.useStyle(s) : a.style = s;
}
function TD(e, t) {
  var r = t.smooth, i = t.points;
  if (i)
    if (e.moveTo(i[0][0], i[0][1]), r > 0 && i.length >= 3) {
      var n = tl(i[0], i[1]), a = tl(i[1], i[2]);
      if (!n || !a) {
        e.lineTo(i[1][0], i[1][1]), e.lineTo(i[2][0], i[2][1]);
        return;
      }
      var o = Math.min(n, a) * r, s = Uo([], i[1], i[0], o / n), l = Uo([], i[1], i[2], o / a), u = Uo([], s, l, 0.5);
      e.bezierCurveTo(s[0], s[1], s[0], s[1], u[0], u[1]), e.bezierCurveTo(l[0], l[1], l[0], l[1], i[2][0], i[2][1]);
    } else
      for (var c = 1; c < i.length; c++)
        e.lineTo(i[c][0], i[c][1]);
}
function CD(e, t, r) {
  var i = e.getTextGuideLine(), n = e.getTextContent();
  if (!n) {
    i && e.removeTextGuideLine();
    return;
  }
  for (var a = t.normal, o = a.get("show"), s = n.ignore, l = 0; l < eo.length; l++) {
    var u = eo[l], c = t[u], h = u === "normal";
    if (c) {
      var d = c.get("show"), f = h ? s : K(n.states[u] && n.states[u].ignore, s);
      if (f || !K(d, o)) {
        var v = h ? i : i && i.states[u];
        v && (v.ignore = !0), i && Gs(i, !0, u, c);
        continue;
      }
      i || (i = new Qn(), e.setTextGuideLine(i), !h && (s || !o) && Gs(i, !0, "normal", t.normal), e.stateProxy && (i.stateProxy = e.stateProxy)), Gs(i, !1, u, c);
    }
  }
  if (i) {
    ct(i.style, r), i.style.fill = null;
    var g = a.get("showAbove"), p = e.textGuideLineConfig = e.textGuideLineConfig || {};
    p.showAbove = g || !1, i.buildPath = TD;
  }
}
function AD(e, t) {
  t = t || "labelLine";
  for (var r = {
    normal: e.getModel(t)
  }, i = 0; i < Ie.length; i++) {
    var n = Ie[i];
    r[n] = e.getModel([n, t]);
  }
  return r;
}
function MD(e) {
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
function DD(e, t, r, i, n, a) {
  var o = e.length;
  if (o < 2)
    return;
  e.sort(function(b, x) {
    return b.rect[t] - x.rect[t];
  });
  for (var s = 0, l, u = !1, c = 0; c < o; c++) {
    var h = e[c], d = h.rect;
    l = d[t] - s, l < 0 && (d[t] -= l, h.label[t] -= l, u = !0), s = d[t] + d[r];
  }
  var f = e[0], v = e[o - 1], g, p;
  m(), g < 0 && w(-g, 0.8), p < 0 && w(p, 0.8), m(), y(g, p, 1), y(p, g, -1), m(), g < 0 && S(-g), p < 0 && S(p);
  function m() {
    g = f.rect[t] - i, p = n - v.rect[t] - v.rect[r];
  }
  function y(b, x, T) {
    if (b < 0) {
      var C = Math.min(x, -b);
      if (C > 0) {
        _(C * T, 0, o);
        var M = C + b;
        M < 0 && w(-M * T, 1);
      } else
        w(-b * T, 1);
    }
  }
  function _(b, x, T) {
    b !== 0 && (u = !0);
    for (var C = x; C < T; C++) {
      var M = e[C], D = M.rect;
      D[t] += b, M.label[t] += b;
    }
  }
  function w(b, x) {
    for (var T = [], C = 0, M = 1; M < o; M++) {
      var D = e[M - 1].rect, P = Math.max(e[M].rect[t] - D[t] - D[r], 0);
      T.push(P), C += P;
    }
    if (C) {
      var L = Math.min(Math.abs(b) / C, x);
      if (b > 0)
        for (var M = 0; M < o - 1; M++) {
          var k = T[M] * L;
          _(k, 0, M + 1);
        }
      else
        for (var M = o - 1; M > 0; M--) {
          var k = T[M - 1] * L;
          _(-k, M, o);
        }
    }
  }
  function S(b) {
    var x = b < 0 ? -1 : 1;
    b = Math.abs(b);
    for (var T = Math.ceil(b / (o - 1)), C = 0; C < o - 1; C++)
      if (x > 0 ? _(T, 0, C + 1) : _(-T, o - C - 1, o), b -= T, b <= 0)
        return;
  }
  return u;
}
function kD(e, t, r, i) {
  return DD(e, "y", "height", t, r);
}
function PD(e) {
  var t = [];
  e.sort(function(g, p) {
    return p.priority - g.priority;
  });
  var r = new it(0, 0, 0, 0);
  function i(g) {
    if (!g.ignore) {
      var p = g.ensureState("emphasis");
      p.ignore == null && (p.ignore = !1);
    }
    g.ignore = !0;
  }
  for (var n = 0; n < e.length; n++) {
    var a = e[n], o = a.axisAligned, s = a.localRect, l = a.transform, u = a.label, c = a.labelLine;
    r.copy(a.rect), r.width -= 0.1, r.height -= 0.1, r.x += 0.05, r.y += 0.05;
    for (var h = a.obb, d = !1, f = 0; f < t.length; f++) {
      var v = t[f];
      if (r.intersect(v.rect)) {
        if (o && v.axisAligned) {
          d = !0;
          break;
        }
        if (v.obb || (v.obb = new ro(v.localRect, v.transform)), h || (h = new ro(s, l)), h.intersect(v.obb)) {
          d = !0;
          break;
        }
      }
    }
    d ? (i(u), c && i(c)) : (u.attr("ignore", a.defaultAttr.ignore), c && c.attr("ignore", a.defaultAttr.labelGuideIgnore), t.push(a));
  }
}
function Ca(e, t, r) {
  var i = e.get("borderRadius");
  if (i == null)
    return r ? {
      cornerRadius: 0
    } : null;
  N(i) || (i = [i, i, i, i]);
  var n = Math.abs(t.r || 0 - t.r0 || 0);
  return {
    cornerRadius: $(i, function(a) {
      return Di(a, n);
    })
  };
}
var If = Math.PI * 2, Aa = Math.PI / 180;
function jp(e, t) {
  return Fv(e.getBoxLayoutParams(), {
    width: t.getWidth(),
    height: t.getHeight()
  });
}
function $p(e, t) {
  var r = jp(e, t), i = e.get("center"), n = e.get("radius");
  N(n) || (n = [0, n]);
  var a = _t(r.width, t.getWidth()), o = _t(r.height, t.getHeight()), s = Math.min(a, o), l = _t(n[0], s / 2), u = _t(n[1], s / 2), c, h, d = e.coordinateSystem;
  if (d) {
    var f = d.dataToPoint(i);
    c = f[0] || 0, h = f[1] || 0;
  } else
    N(i) || (i = [i, i]), c = _t(i[0], a) + r.x, h = _t(i[1], o) + r.y;
  return {
    cx: c,
    cy: h,
    r0: l,
    r: u
  };
}
function LD(e, t, r) {
  t.eachSeriesByType(e, function(i) {
    var n = i.getData(), a = n.mapDimension("value"), o = jp(i, r), s = $p(i, r), l = s.cx, u = s.cy, c = s.r, h = s.r0, d = -i.get("startAngle") * Aa, f = i.get("endAngle"), v = i.get("padAngle") * Aa;
    f = f === "auto" ? d - If : -f * Aa;
    var g = i.get("minAngle") * Aa, p = g + v, m = 0;
    n.each(a, function(X) {
      !isNaN(X) && m++;
    });
    var y = n.getSum(a), _ = Math.PI / (y || m) * 2, w = i.get("clockwise"), S = i.get("roseType"), b = i.get("stillShowZeroSum"), x = n.getDataExtent(a);
    x[0] = 0;
    var T = w ? 1 : -1, C = [d, f], M = T * v / 2;
    tv(C, !w), d = C[0], f = C[1];
    var D = tg(i);
    D.startAngle = d, D.endAngle = f, D.clockwise = w;
    var P = Math.abs(f - d), L = P, k = 0, B = d;
    if (n.setLayout({
      viewRect: o,
      r: c
    }), n.each(a, function(X, q) {
      var F;
      if (isNaN(X)) {
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
      S !== "area" ? F = y === 0 && b ? _ : X * _ : F = P / m, F < p ? (F = p, L -= p) : k += X;
      var Z = B + T * F, J = 0, Y = 0;
      v > F ? (J = B + T * F / 2, Y = J) : (J = B + M, Y = Z - M), n.setItemLayout(q, {
        angle: F,
        startAngle: J,
        endAngle: Y,
        clockwise: w,
        cx: l,
        cy: u,
        r0: h,
        r: S ? Jb(X, x, [h, c]) : c
      }), B = Z;
    }), L < If && m)
      if (L <= 1e-3) {
        var O = P / m;
        n.each(a, function(X, q) {
          if (!isNaN(X)) {
            var F = n.getItemLayout(q);
            F.angle = O;
            var Z = 0, J = 0;
            O < v ? (Z = d + T * (q + 1 / 2) * O, J = Z) : (Z = d + T * q * O + M, J = d + T * (q + 1) * O - M), F.startAngle = Z, F.endAngle = J;
          }
        });
      } else
        _ = L / k, B = d, n.each(a, function(X, q) {
          if (!isNaN(X)) {
            var F = n.getItemLayout(q), Z = F.angle === p ? p : X * _, J = 0, Y = 0;
            Z < v ? (J = B + T * Z / 2, Y = J) : (J = B + M, Y = B + T * Z - M), F.startAngle = J, F.endAngle = Y, B += T * Z;
          }
        });
  });
}
var tg = wt();
function ID(e) {
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
var ED = Math.PI / 180;
function Ef(e, t, r, i, n, a, o, s, l, u) {
  if (e.length < 2)
    return;
  function c(g) {
    for (var p = g.rB, m = p * p, y = 0; y < g.list.length; y++) {
      var _ = g.list[y], w = Math.abs(_.label.y - r), S = i + _.len, b = S * S, x = Math.sqrt(Math.abs((1 - w * w / m) * b)), T = t + (x + _.len2) * n, C = T - _.label.x, M = _.targetTextWidth - C * n;
      eg(_, M, !0), _.label.x = T;
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
        var _ = g[y], w = _.label.y > r ? m : p, S = Math.abs(_.label.y - r);
        if (S >= w.maxY) {
          var b = _.label.x - t - _.len2 * n, x = i + _.len, T = Math.abs(b) < x ? Math.sqrt(S * S / (1 - b * b / x / x)) : x;
          w.rB = T, w.maxY = S;
        }
        w.list.push(_);
      }
    c(p), c(m);
  }
  for (var d = e.length, f = 0; f < d; f++)
    if (e[f].position === "outer" && e[f].labelAlignTo === "labelLine") {
      var v = e[f].label.x - u;
      e[f].linePoints[1][0] += v, e[f].label.x = u;
    }
  kD(e, l, l + o) && h(e);
}
function RD(e, t, r, i, n, a, o, s) {
  for (var l = [], u = [], c = Number.MAX_VALUE, h = -Number.MAX_VALUE, d = 0; d < e.length; d++) {
    var f = e[d].label;
    Ys(e[d]) || (f.x < t ? (c = Math.min(c, f.x), l.push(e[d])) : (h = Math.max(h, f.x), u.push(e[d])));
  }
  for (var d = 0; d < e.length; d++) {
    var v = e[d];
    if (!Ys(v) && v.linePoints) {
      if (v.labelStyleWidth != null)
        continue;
      var f = v.label, g = v.linePoints, p = void 0;
      v.labelAlignTo === "edge" ? f.x < t ? p = g[2][0] - v.labelDistance - o - v.edgeDistance : p = o + n - v.edgeDistance - g[2][0] - v.labelDistance : v.labelAlignTo === "labelLine" ? f.x < t ? p = c - o - v.bleedMargin : p = o + n - h - v.bleedMargin : f.x < t ? p = f.x - o - v.bleedMargin : p = o + n - f.x - v.bleedMargin, v.targetTextWidth = p, eg(v, p);
    }
  }
  Ef(u, t, r, i, 1, n, a, o, s, h), Ef(l, t, r, i, -1, n, a, o, s, c);
  for (var d = 0; d < e.length; d++) {
    var v = e[d];
    if (!Ys(v) && v.linePoints) {
      var f = v.label, g = v.linePoints, m = v.labelAlignTo === "edge", y = f.style.padding, _ = y ? y[1] + y[3] : 0, w = f.style.backgroundColor ? 0 : _, S = v.rect.width + w, b = g[1][0] - g[2][0];
      m ? f.x < t ? g[2][0] = o + v.edgeDistance + S + v.labelDistance : g[2][0] = o + n - v.edgeDistance - S - v.labelDistance : (f.x < t ? g[2][0] = f.x + v.labelDistance : g[2][0] = f.x - v.labelDistance, g[1][0] = g[2][0] + b), g[1][1] = g[2][1] = f.y;
    }
  }
}
function eg(e, t, r) {
  if (r === void 0 && (r = !1), e.labelStyleWidth == null) {
    var i = e.label, n = i.style, a = e.rect, o = n.backgroundColor, s = n.padding, l = s ? s[1] + s[3] : 0, u = n.overflow, c = a.width + (o ? 0 : l);
    if (t < c || r) {
      var h = a.height;
      if (u && u.match("break")) {
        i.setStyle("backgroundColor", null), i.setStyle("width", t - l);
        var d = i.getBoundingRect();
        i.setStyle("width", Math.ceil(d.width)), i.setStyle("backgroundColor", o);
      } else {
        var f = t - l, v = t < c ? f : (
          // Current available width is enough, but the text may have
          // already been wrapped with a smaller available width.
          r ? f > e.unconstrainedWidth ? null : f : null
        );
        i.setStyle("width", v);
      }
      var g = i.getBoundingRect();
      a.width = g.width;
      var p = (i.style.margin || 0) + 2.1;
      a.height = g.height + p, a.y -= (a.height - h) / 2;
    }
  }
}
function Ys(e) {
  return e.position === "center";
}
function BD(e) {
  var t = e.getData(), r = [], i, n, a = !1, o = (e.get("minShowLabelAngle") || 0) * ED, s = t.getLayout("viewRect"), l = t.getLayout("r"), u = s.width, c = s.x, h = s.y, d = s.height;
  function f(b) {
    b.ignore = !0;
  }
  function v(b) {
    if (!b.ignore)
      return !0;
    for (var x in b.states)
      if (b.states[x].ignore === !1)
        return !0;
    return !1;
  }
  t.each(function(b) {
    var x = t.getItemGraphicEl(b), T = x.shape, C = x.getTextContent(), M = x.getTextGuideLine(), D = t.getItemModel(b), P = D.getModel("label"), L = P.get("position") || D.get(["emphasis", "label", "position"]), k = P.get("distanceToLabelLine"), B = P.get("alignTo"), O = _t(P.get("edgeDistance"), u), X = P.get("bleedMargin"), q = D.getModel("labelLine"), F = q.get("length");
    F = _t(F, u);
    var Z = q.get("length2");
    if (Z = _t(Z, u), Math.abs(T.endAngle - T.startAngle) < o) {
      A(C.states, f), C.ignore = !0, M && (A(M.states, f), M.ignore = !0);
      return;
    }
    if (v(C)) {
      var J = (T.startAngle + T.endAngle) / 2, Y = Math.cos(J), gt = Math.sin(J), bt, Xt, _e, jt;
      i = T.cx, n = T.cy;
      var qt = L === "inside" || L === "inner";
      if (L === "center")
        bt = T.cx, Xt = T.cy, jt = "center";
      else {
        var xt = (qt ? (T.r + T.r0) / 2 * Y : T.r * Y) + i, ht = (qt ? (T.r + T.r0) / 2 * gt : T.r * gt) + n;
        if (bt = xt + Y * 3, Xt = ht + gt * 3, !qt) {
          var U = xt + Y * (F + l - T.r), Q = ht + gt * (F + l - T.r), we = U + (Y < 0 ? -1 : 1) * Z, St = Q;
          B === "edge" ? bt = Y < 0 ? c + O : c + u - O : bt = we + (Y < 0 ? -k : k), Xt = St, _e = [[xt, ht], [U, Q], [we, St]];
        }
        jt = qt ? "center" : B === "edge" ? Y > 0 ? "right" : "left" : Y > 0 ? "left" : "right";
      }
      var Qe = Math.PI, Oe = 0, Bi = P.get("rotate");
      if (yt(Bi))
        Oe = Bi * (Qe / 180);
      else if (L === "center")
        Oe = 0;
      else if (Bi === "radial" || Bi === !0) {
        var fg = Y < 0 ? -J + Qe : -J;
        Oe = fg;
      } else if (Bi === "tangential" && L !== "outside" && L !== "outer") {
        var Kr = Math.atan2(Y, gt);
        Kr < 0 && (Kr = Qe * 2 + Kr);
        var dg = gt > 0;
        dg && (Kr = Qe + Kr), Oe = Kr - Qe;
      }
      if (a = !!Oe, C.x = bt, C.y = Xt, C.rotation = Oe, C.setStyle({
        verticalAlign: "middle"
      }), qt) {
        C.setStyle({
          align: jt
        });
        var Oo = C.states.select;
        Oo && (Oo.x += C.x, Oo.y += C.y);
      } else {
        var Oi = C.getBoundingRect().clone();
        Oi.applyTransform(C.getComputedTransform());
        var Wu = (C.style.margin || 0) + 2.1;
        Oi.y -= Wu / 2, Oi.height += Wu, r.push({
          label: C,
          labelLine: M,
          position: L,
          len: F,
          len2: Z,
          minTurnAngle: q.get("minTurnAngle"),
          maxSurfaceAngle: q.get("maxSurfaceAngle"),
          surfaceNormal: new H(Y, gt),
          linePoints: _e,
          textAlign: jt,
          labelDistance: k,
          labelAlignTo: B,
          edgeDistance: O,
          bleedMargin: X,
          rect: Oi,
          unconstrainedWidth: Oi.width,
          labelStyleWidth: C.style.width
        });
      }
      x.setTextConfig({
        inside: qt
      });
    }
  }), !a && e.get("avoidLabelOverlap") && RD(r, i, n, l, u, d, c, h);
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
      var S = p.linePoints;
      _ || !S ? (A(y.states, f), y.ignore = !0) : (SD(S, p.minTurnAngle), xD(S, p.surfaceNormal, p.maxSurfaceAngle), y.setShape({
        points: S
      }), m.__hostTarget.textGuideLineConfig = {
        anchor: new H(S[0][0], S[0][1])
      });
    }
  }
}
var OD = (
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
      var o = this, s = r.hostModel, l = r.getItemModel(i), u = l.getModel("emphasis"), c = r.getItemLayout(i), h = E(Ca(l.getModel("itemStyle"), c, !0), c);
      if (isNaN(h.startAngle)) {
        o.setShape(h);
        return;
      }
      if (a) {
        o.setShape(h);
        var d = s.getShallow("animationType");
        s.ecModel.ssr ? (Na(o, {
          scaleX: 0,
          scaleY: 0
        }, s, {
          dataIndex: i,
          isFrom: !0
        }), o.originX = h.cx, o.originY = h.cy) : d === "scale" ? (o.shape.r = c.r0, Na(o, {
          shape: {
            r: c.r
          }
        }, s, i)) : n != null ? (o.setShape({
          startAngle: n,
          endAngle: n
        }), Na(o, {
          shape: {
            startAngle: c.startAngle,
            endAngle: c.endAngle
          }
        }, s, i)) : (o.shape.endAngle = c.startAngle, In(o, {
          shape: {
            endAngle: c.endAngle
          }
        }, s, i));
      } else
        mT(o), In(o, {
          shape: h
        }, s, i);
      o.useStyle(r.getItemVisual(i, "style")), Nx(o, l);
      var f = (c.startAngle + c.endAngle) / 2, v = s.get("selectedOffset"), g = Math.cos(f) * v, p = Math.sin(f) * v, m = l.getShallow("cursor");
      m && o.attr("cursor", m), this._updateLabel(s, r, i), o.ensureState("emphasis").shape = E({
        r: c.r + (u.get("scale") && u.get("scaleSize") || 0)
      }, Ca(u.getModel("itemStyle"), c)), E(o.ensureState("select"), {
        x: g,
        y: p,
        shape: Ca(l.getModel(["select", "itemStyle"]), c)
      }), E(o.ensureState("blur"), {
        shape: Ca(l.getModel(["blur", "itemStyle"]), c)
      });
      var y = o.getTextGuideLine(), _ = o.getTextContent();
      y && E(y.ensureState("select"), {
        x: g,
        y: p
      }), E(_.ensureState("select"), {
        x: g,
        y: p
      }), Rx(this, u.get("focus"), u.get("blurScope"), u.get("disabled"));
    }, t.prototype._updateLabel = function(r, i, n) {
      var a = this, o = i.getItemModel(n), s = o.getModel("labelLine"), l = i.getItemVisual(n, "style"), u = l && l.fill, c = l && l.opacity;
      BT(a, OT(o), {
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
      var d = r.get(["label", "position"]);
      if (d !== "outside" && d !== "outer")
        a.removeTextGuideLine();
      else {
        var f = this.getTextGuideLine();
        f || (f = new Qn(), this.setTextGuideLine(f)), CD(this, AD(o), {
          stroke: u,
          opacity: hn(s.get(["lineStyle", "opacity"]), c, 1)
        });
      }
    }, t;
  })(Zn)
), ND = (
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
        var d = tg(r), f = new Zn({
          shape: E($p(r, n), d)
        });
        f.useStyle(r.getModel("emptyCircleStyle").getItemStyle()), this._emptyCircleSector = f, l.add(f);
      }
      o.diff(s).add(function(v) {
        var g = new OD(o, v, u);
        o.setItemGraphicEl(v, g), l.add(g);
      }).update(function(v, g) {
        var p = s.getItemGraphicEl(g);
        p.updateData(o, v, u), p.off("click"), l.add(p), o.setItemGraphicEl(v, p);
      }).remove(function(v) {
        var g = s.getItemGraphicEl(v);
        xv(g, r, v);
      }).execute(), BD(r), r.get("animationTypeUpdate") !== "expansion" && (this._data = o);
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
function FD(e, t, r) {
  t = N(t) && {
    coordDimensions: t
  } || E({
    encodeDefine: e.getEncode()
  }, t);
  var i = e.getSource(), n = pD(i, t).dimensions, a = new vD(n, e);
  return a.initData(i, r), a;
}
var zD = (
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
), UD = wt(), VD = (
  /** @class */
  (function(e) {
    G(t, e);
    function t() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return t.prototype.init = function(r) {
      e.prototype.init.apply(this, arguments), this.legendVisualProvider = new zD(lt(this.getData, this), lt(this.getRawData, this)), this._defaultLabelLine(r);
    }, t.prototype.mergeOption = function() {
      e.prototype.mergeOption.apply(this, arguments);
    }, t.prototype.getInitialData = function() {
      return FD(this, {
        coordDimensions: ["value"],
        encodeDefaulter: Qt(mC, this)
      });
    }, t.prototype.getDataParams = function(r) {
      var i = this.getData(), n = UD(i), a = n.seats;
      if (!a) {
        var o = [];
        i.each(i.mapDimension("value"), function(l) {
          o.push(l);
        }), a = n.seats = tS(o, i.hostModel.get("percentPrecision"));
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
  })(dr)
);
function WD(e) {
  return {
    seriesType: e,
    reset: function(t, r) {
      var i = t.getData();
      i.filterSelf(function(n) {
        var a = i.mapDimension("value"), o = i.get(a, n);
        return !(yt(o) && !isNaN(o) && o < 0);
      });
    }
  };
}
function HD(e) {
  e.registerChartView(ND), e.registerSeriesModel(VD), eM("pie", e.registerAction), e.registerLayout(Qt(LD, "pie")), e.registerProcessor(ID("pie")), e.registerProcessor(WD("pie"));
}
function Rf(e, t, r) {
  r = r || {};
  var i = e.coordinateSystem, n = t.axis, a = {}, o = n.getAxesOnZeroOf()[0], s = n.position, l = o ? "onZero" : s, u = n.dim, c = i.getRect(), h = [c.x, c.x + c.width, c.y, c.y + c.height], d = {
    left: 0,
    right: 1,
    top: 0,
    bottom: 1,
    onZero: 2
  }, f = t.get("offset") || 0, v = u === "x" ? [h[2] - f, h[3] + f] : [h[0] - f, h[1] + f];
  if (o) {
    var g = o.toGlobalCoord(o.dataToCoord(0));
    v[d.onZero] = Math.max(Math.min(g, v[1]), v[0]);
  }
  a.position = [u === "y" ? v[d[l]] : h[0], u === "x" ? v[d[l]] : h[3]], a.rotation = Math.PI / 2 * (u === "x" ? 0 : 1);
  var p = {
    top: -1,
    bottom: 1,
    left: -1,
    right: 1
  };
  a.labelDirection = a.tickDirection = a.nameDirection = p[s], a.labelOffset = o ? v[d[s]] - v[d.onZero] : 0, t.get(["axisTick", "inside"]) && (a.tickDirection = -a.tickDirection), Dn(r.labelInside, t.get(["axisLabel", "inside"])) && (a.labelDirection = -a.labelDirection);
  var m = t.get(["axisLabel", "rotate"]);
  return a.labelRotate = l === "top" ? -m : m, a.z2 = 1, a;
}
var lr = Math.PI, Gr = (
  /** @class */
  (function() {
    function e(t, r) {
      this.group = new He(), this.opt = r, this.axisModel = t, ct(r, {
        labelOffset: 0,
        nameDirection: 1,
        tickDirection: 1,
        labelDirection: 1,
        silent: !0,
        handleAutoShown: function() {
          return !0;
        }
      });
      var i = new He({
        x: r.position[0],
        y: r.position[1],
        rotation: r.rotation
      });
      i.updateTransform(), this._transformGroup = i;
    }
    return e.prototype.hasBuilder = function(t) {
      return !!Bf[t];
    }, e.prototype.add = function(t) {
      Bf[t](this.opt, this.axisModel, this.group, this._transformGroup);
    }, e.prototype.getGroup = function() {
      return this.group;
    }, e.innerTextLayout = function(t, r, i) {
      var n = Vd(r - t), a, o;
      return ja(n) ? (o = i > 0 ? "top" : "bottom", a = "center") : ja(n - lr) ? (o = i > 0 ? "bottom" : "top", a = "center") : (o = "middle", n > 0 && n < lr ? a = i > 0 ? "right" : "left" : a = i > 0 ? "left" : "right"), {
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
), Bf = {
  axisLine: function(e, t, r, i) {
    var n = t.get(["axisLine", "show"]);
    if (n === "auto" && e.handleAutoShown && (n = e.handleAutoShown("axisLine")), !!n) {
      var a = t.axis.getExtent(), o = i.transform, s = [a[0], 0], l = [a[1], 0], u = s[0] > l[0];
      o && (Pe(s, s, o), Pe(l, l, o));
      var c = E({
        lineCap: "round"
      }, t.getModel(["axisLine", "lineStyle"]).getLineStyle()), h = new Ii({
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
      Su(h.shape, h.style.lineWidth), h.anid = "line", r.add(h);
      var d = t.get(["axisLine", "symbol"]);
      if (d != null) {
        var f = t.get(["axisLine", "symbolSize"]);
        W(d) && (d = [d, d]), (W(f) || yt(f)) && (f = [f, f]);
        var v = vM(t.get(["axisLine", "symbolOffset"]) || 0, f), g = f[0], p = f[1];
        A([{
          rotate: e.rotation + Math.PI / 2,
          offset: v[0],
          r: 0
        }, {
          rotate: e.rotation - Math.PI / 2,
          offset: v[1],
          r: Math.sqrt((s[0] - l[0]) * (s[0] - l[0]) + (s[1] - l[1]) * (s[1] - l[1]))
        }], function(m, y) {
          if (d[y] !== "none" && d[y] != null) {
            var _ = Sp(d[y], -g / 2, -p / 2, g, p, c.stroke, !0), w = m.r + m.offset, S = u ? l : s;
            _.attr({
              rotation: m.rotate,
              x: S[0] + w * Math.cos(e.rotation),
              y: S[1] - w * Math.sin(e.rotation),
              silent: !0,
              z2: 11
            }), r.add(_);
          }
        });
      }
    }
  },
  axisTickLabel: function(e, t, r, i) {
    var n = XD(r, i, t, e), a = ZD(r, i, t, e);
    if (YD(t, a, n), qD(r, i, t, e.tickDirection), t.get(["axisLabel", "hideOverlap"])) {
      var o = MD($(a, function(s) {
        return {
          label: s,
          priority: s.z2,
          defaultAttr: {
            ignore: s.ignore
          }
        };
      }));
      PD(o);
    }
  },
  axisName: function(e, t, r, i) {
    var n = Dn(e.axisName, t.get("name"));
    if (n) {
      var a = t.get("nameLocation"), o = e.nameDirection, s = t.getModel("nameTextStyle"), l = t.get("nameGap") || 0, u = t.axis.getExtent(), c = u[0] > u[1] ? -1 : 1, h = [
        a === "start" ? u[0] - c * l : a === "end" ? u[1] + c * l : (u[0] + u[1]) / 2,
        // Reuse labelOffset.
        Nf(a) ? e.labelOffset + o * l : 0
      ], d, f = t.get("nameRotate");
      f != null && (f = f * lr / 180);
      var v;
      Nf(a) ? d = Gr.innerTextLayout(
        e.rotation,
        f ?? e.rotation,
        // Adapt to axis.
        o
      ) : (d = GD(e.rotation, a, f || 0, u), v = e.axisNameAvailableWidth, v != null && (v = Math.abs(v / Math.sin(d.rotation)), !isFinite(v) && (v = null)));
      var g = s.getFont(), p = t.get("nameTruncate", !0) || {}, m = p.ellipsis, y = Dn(e.nameTruncateMaxWidth, p.maxWidth, v), _ = new pe({
        x: h[0],
        y: h[1],
        rotation: d.rotation,
        silent: Gr.isLabelSilent(t),
        style: En(s, {
          text: n,
          font: g,
          overflow: "truncate",
          width: y,
          ellipsis: m,
          fill: s.getTextColor() || t.get(["axisLine", "lineStyle", "color"]),
          align: s.get("align") || d.textAlign,
          verticalAlign: s.get("verticalAlign") || d.textVerticalAlign
        }),
        z2: 1
      });
      if (Tu({
        el: _,
        componentModel: t,
        itemName: n
      }), _.__fullText = n, _.anid = "name", t.get("triggerEvent")) {
        var w = Gr.makeAxisEventDataBase(t);
        w.targetType = "axisName", w.name = n, dt(_).eventData = w;
      }
      i.add(_), _.updateTransform(), r.add(_), _.decomposeTransform();
    }
  }
};
function GD(e, t, r, i) {
  var n = Vd(r - e), a, o, s = i[0] > i[1], l = t === "start" && !s || t !== "start" && s;
  return ja(n - lr / 2) ? (o = l ? "bottom" : "top", a = "center") : ja(n - lr * 1.5) ? (o = l ? "top" : "bottom", a = "center") : (o = "middle", n < lr * 1.5 && n > lr / 2 ? a = l ? "left" : "right" : a = l ? "right" : "left"), {
    rotation: n,
    textAlign: a,
    textVerticalAlign: o
  };
}
function YD(e, t, r) {
  if (!wD(e.axis)) {
    var i = e.get(["axisLabel", "showMinLabel"]), n = e.get(["axisLabel", "showMaxLabel"]);
    t = t || [], r = r || [];
    var a = t[0], o = t[1], s = t[t.length - 1], l = t[t.length - 2], u = r[0], c = r[1], h = r[r.length - 1], d = r[r.length - 2];
    i === !1 ? (te(a), te(u)) : Of(a, o) && (i ? (te(o), te(c)) : (te(a), te(u))), n === !1 ? (te(s), te(h)) : Of(l, s) && (n ? (te(l), te(d)) : (te(s), te(h)));
  }
}
function te(e) {
  e && (e.ignore = !0);
}
function Of(e, t) {
  var r = e && e.getBoundingRect().clone(), i = t && t.getBoundingRect().clone();
  if (!(!r || !i)) {
    var n = ru([]);
    return iu(n, n, -e.rotation), r.applyTransform(_i([], n, e.getLocalTransform())), i.applyTransform(_i([], n, t.getLocalTransform())), r.intersect(i);
  }
}
function Nf(e) {
  return e === "middle" || e === "center";
}
function rg(e, t, r, i, n) {
  for (var a = [], o = [], s = [], l = 0; l < e.length; l++) {
    var u = e[l].coord;
    o[0] = u, o[1] = 0, s[0] = u, s[1] = r, t && (Pe(o, o, t), Pe(s, s, t));
    var c = new Ii({
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
    Su(c.shape, c.style.lineWidth), c.anid = n + "_" + e[l].tickValue, a.push(c);
  }
  return a;
}
function XD(e, t, r, i) {
  var n = r.axis, a = r.getModel("axisTick"), o = a.get("show");
  if (o === "auto" && i.handleAutoShown && (o = i.handleAutoShown("axisTick")), !(!o || n.scale.isBlank())) {
    for (var s = a.getModel("lineStyle"), l = i.tickDirection * a.get("length"), u = n.getTicksCoords(), c = rg(u, t.transform, l, ct(s.getLineStyle(), {
      stroke: r.get(["axisLine", "lineStyle", "color"])
    }), "ticks"), h = 0; h < c.length; h++)
      e.add(c[h]);
    return c;
  }
}
function qD(e, t, r, i) {
  var n = r.axis, a = r.getModel("minorTick");
  if (!(!a.get("show") || n.scale.isBlank())) {
    var o = n.getMinorTicksCoords();
    if (o.length)
      for (var s = a.getModel("lineStyle"), l = i * a.get("length"), u = ct(s.getLineStyle(), ct(r.getModel("axisTick").getLineStyle(), {
        stroke: r.get(["axisLine", "lineStyle", "color"])
      })), c = 0; c < o.length; c++)
        for (var h = rg(o[c], t.transform, l, u, "minorticks_" + c), d = 0; d < h.length; d++)
          e.add(h[d]);
  }
}
function ZD(e, t, r, i) {
  var n = r.axis, a = Dn(i.axisLabelShow, r.get(["axisLabel", "show"]));
  if (!(!a || n.scale.isBlank())) {
    var o = r.getModel("axisLabel"), s = o.get("margin"), l = n.getViewLabels(), u = (Dn(i.labelRotate, o.get("rotate")) || 0) * lr / 180, c = Gr.innerTextLayout(i.rotation, u, i.labelDirection), h = r.getCategories && r.getCategories(!0), d = [], f = Gr.isLabelSilent(r), v = r.get("triggerEvent");
    return A(l, function(g, p) {
      var m = n.scale.type === "ordinal" ? n.scale.getRawOrdinalNumber(g.tickValue) : g.tickValue, y = g.formattedLabel, _ = g.rawLabel, w = o;
      if (h && h[m]) {
        var S = h[m];
        z(S) && S.textStyle && (w = new vt(S.textStyle, o, r.ecModel));
      }
      var b = w.getTextColor() || r.get(["axisLine", "lineStyle", "color"]), x = n.dataToCoord(m), T = w.getShallow("align", !0) || c.textAlign, C = K(w.getShallow("alignMinLabel", !0), T), M = K(w.getShallow("alignMaxLabel", !0), T), D = w.getShallow("verticalAlign", !0) || w.getShallow("baseline", !0) || c.textVerticalAlign, P = K(w.getShallow("verticalAlignMinLabel", !0), D), L = K(w.getShallow("verticalAlignMaxLabel", !0), D), k = new pe({
        x,
        y: i.labelOffset + i.labelDirection * s,
        rotation: c.rotation,
        silent: f,
        z2: 10 + (g.level || 0),
        style: En(w, {
          text: y,
          align: p === 0 ? C : p === l.length - 1 ? M : T,
          verticalAlign: p === 0 ? P : p === l.length - 1 ? L : D,
          fill: rt(b) ? b(
            // (1) In category axis with data zoom, tick is not the original
            // index of axis.data. So tick should not be exposed to user
            // in category axis.
            // (2) Compatible with previous version, which always use formatted label as
            // input. But in interval scale the formatted label is like '223,445', which
            // maked user replace ','. So we modify it to return original val but remain
            // it as 'string' to avoid error in replacing.
            n.type === "category" ? _ : n.type === "value" ? m + "" : m,
            p
          ) : b
        })
      });
      if (k.anid = "label_" + m, Tu({
        el: k,
        componentModel: r,
        itemName: y,
        formatterParamsExtra: {
          isTruncated: function() {
            return k.isTruncated;
          },
          value: _,
          tickIndex: p
        }
      }), v) {
        var B = Gr.makeAxisEventDataBase(r);
        B.targetType = "axisLabel", B.value = _, B.tickIndex = p, n.type === "category" && (B.dataIndex = m), dt(k).eventData = B;
      }
      t.add(k), k.updateTransform(), d.push(k), e.add(k), k.decomposeTransform();
    }), d;
  }
}
function QD(e, t) {
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
  return KD(r, e, t), r.seriesInvolved && jD(r, e), r;
}
function KD(e, t, r) {
  var i = t.getComponent("tooltip"), n = t.getComponent("axisPointer"), a = n.get("link", !0) || [], o = [];
  A(r.getCoordinateSystems(), function(s) {
    if (!s.axisPointerEnabled)
      return;
    var l = zn(s.model), u = e.coordSysAxesInfo[l] = {};
    e.coordSysMap[l] = s;
    var c = s.model, h = c.getModel("tooltip", i);
    if (A(s.getAxes(), Qt(g, !1, null)), s.getTooltipAxes && i && h.get("show")) {
      var d = h.get("trigger") === "axis", f = h.get(["axisPointer", "type"]) === "cross", v = s.getTooltipAxes(h.get(["axisPointer", "axis"]));
      (d || f) && A(v.baseAxes, Qt(g, f ? "cross" : !0, d)), f && A(v.otherAxes, Qt(g, "cross", !1));
    }
    function g(p, m, y) {
      var _ = y.model.getModel("axisPointer", n), w = _.get("show");
      if (!(!w || w === "auto" && !p && !Ul(_))) {
        m == null && (m = _.get("triggerTooltip")), _ = p ? JD(y, h, n, t, p, m) : _;
        var S = _.get("snap"), b = _.get("triggerEmphasis"), x = zn(y.model), T = m || S || y.type === "category", C = e.axesInfo[x] = {
          key: x,
          axis: y,
          coordSys: s,
          axisPointerModel: _,
          triggerTooltip: m,
          triggerEmphasis: b,
          involveSeries: T,
          snap: S,
          useHandle: Ul(_),
          seriesModels: [],
          linkGroup: null
        };
        u[x] = C, e.seriesInvolved = e.seriesInvolved || T;
        var M = $D(a, y);
        if (M != null) {
          var D = o[M] || (o[M] = {
            axesInfo: {}
          });
          D.axesInfo[x] = C, D.mapper = a[M].mapper, C.linkGroup = D;
        }
      }
    }
  });
}
function JD(e, t, r, i, n, a) {
  var o = t.getModel("axisPointer"), s = ["type", "snap", "lineStyle", "shadowStyle", "label", "animation", "animationDurationUpdate", "animationEasingUpdate", "z"], l = {};
  A(s, function(d) {
    l[d] = j(o.get(d));
  }), l.snap = e.type !== "category" && !!a, o.get("type") === "cross" && (l.type = "line");
  var u = l.label || (l.label = {});
  if (u.show == null && (u.show = !1), n === "cross") {
    var c = o.get(["label", "show"]);
    if (u.show = c ?? !0, !a) {
      var h = l.lineStyle = o.get("crossStyle");
      h && ct(u, h.textStyle);
    }
  }
  return e.model.getModel("axisPointer", new vt(l, r, i));
}
function jD(e, t) {
  t.eachSeries(function(r) {
    var i = r.coordinateSystem, n = r.get(["tooltip", "trigger"], !0), a = r.get(["tooltip", "show"], !0);
    !i || n === "none" || n === !1 || n === "item" || a === !1 || r.get(["axisPointer", "show"], !0) === !1 || A(e.coordSysAxesInfo[zn(i.model)], function(o) {
      var s = o.axis;
      i.getAxis(s.dim) === s && (o.seriesModels.push(r), o.seriesDataCount == null && (o.seriesDataCount = 0), o.seriesDataCount += r.getData().count());
    });
  });
}
function $D(e, t) {
  for (var r = t.model, i = t.dim, n = 0; n < e.length; n++) {
    var a = e[n] || {};
    if (Xs(a[i + "AxisId"], r.id) || Xs(a[i + "AxisIndex"], r.componentIndex) || Xs(a[i + "AxisName"], r.name))
      return n;
  }
}
function Xs(e, t) {
  return e === "all" || N(e) && st(e, t) >= 0 || e === t;
}
function t2(e) {
  var t = zu(e);
  if (t) {
    var r = t.axisPointerModel, i = t.axis.scale, n = r.option, a = r.get("status"), o = r.get("value");
    o != null && (o = i.parse(o));
    var s = Ul(r);
    a == null && (n.status = s ? "show" : "hide");
    var l = i.getExtent().slice();
    l[0] > l[1] && l.reverse(), // Pick a value on axis when initializing.
    (o == null || o > l[1]) && (o = l[1]), o < l[0] && (o = l[0]), n.value = o, s && (n.status = t.axis.scale.isBlank() ? "hide" : "show");
  }
}
function zu(e) {
  var t = (e.ecModel.getComponent("axisPointer") || {}).coordSysAxesInfo;
  return t && t.axesInfo[zn(e)];
}
function e2(e) {
  var t = zu(e);
  return t && t.axisPointerModel;
}
function Ul(e) {
  return !!e.get(["handle", "show"]);
}
function zn(e) {
  return e.type + "||" + e.id;
}
var Ff = {}, r2 = (
  /** @class */
  (function(e) {
    G(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.prototype.render = function(r, i, n, a) {
      this.axisPointerClass && t2(r), e.prototype.render.apply(this, arguments), this._doUpdateAxisPointerClass(r, n, !0);
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
        var o = e2(r);
        o ? (this._axisPointer || (this._axisPointer = new a())).render(r, o, i, n) : this._disposeAxisPointer(i);
      }
    }, t.prototype._disposeAxisPointer = function(r) {
      this._axisPointer && this._axisPointer.dispose(r), this._axisPointer = null;
    }, t.registerAxisPointerClass = function(r, i) {
      Ff[r] = i;
    }, t.getAxisPointerClass = function(r) {
      return r && Ff[r];
    }, t.type = "axis", t;
  })(vr)
);
function zf(e, t, r) {
  var i = Pi.createCanvas(), n = t.getWidth(), a = t.getHeight(), o = i.style;
  return o && (o.position = "absolute", o.left = "0", o.top = "0", o.width = n + "px", o.height = a + "px", i.setAttribute("data-zr-dom-id", e)), i.width = n * r, i.height = a * r, i;
}
var qs = (function(e) {
  G(t, e);
  function t(r, i, n) {
    var a = e.call(this) || this;
    a.motionBlur = !1, a.lastFrameAlpha = 0.7, a.dpr = 1, a.virtual = !1, a.config = {}, a.incremental = !1, a.zlevel = 0, a.maxRepaintRectCount = 5, a.__dirty = !0, a.__firstTimePaint = !0, a.__used = !1, a.__drawIndex = 0, a.__startIndex = 0, a.__endIndex = 0, a.__prevStartIndex = null, a.__prevEndIndex = null;
    var o;
    n = n || Ja, typeof r == "string" ? o = zf(r, i, n) : z(r) && (o = r, r = o.id), a.id = r, a.dom = o;
    var s = o.style;
    return s && (gd(o), o.onselectstart = function() {
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
    this.domBack = zf("back-" + this.id, this.painter, r), this.ctxBack = this.domBack.getContext("2d"), r !== 1 && this.ctxBack.scale(r, r);
  }, t.prototype.createRepaintRects = function(r, i, n, a) {
    if (this.__firstTimePaint)
      return this.__firstTimePaint = !1, null;
    var o = [], s = this.maxRepaintRectCount, l = !1, u = new it(0, 0, 0, 0);
    function c(y) {
      if (!(!y.isFinite() || y.isZero()))
        if (o.length === 0) {
          var _ = new it(0, 0, 0, 0);
          _.copy(y), o.push(_);
        } else {
          for (var w = !1, S = 1 / 0, b = 0, x = 0; x < o.length; ++x) {
            var T = o[x];
            if (T.intersect(y)) {
              var C = new it(0, 0, 0, 0);
              C.copy(T), C.union(y), o[x] = C, w = !0;
              break;
            } else if (l) {
              u.copy(y), u.union(T);
              var M = y.width * y.height, D = T.width * T.height, P = u.width * u.height, L = P - M - D;
              L < S && (S = L, b = x);
            }
          }
          if (l && (o[b].union(y), w = !0), !w) {
            var _ = new it(0, 0, 0, 0);
            _.copy(y), o.push(_);
          }
          l || (l = o.length >= s);
        }
    }
    for (var h = this.__startIndex; h < this.__endIndex; ++h) {
      var d = r[h];
      if (d) {
        var f = d.shouldBePainted(n, a, !0, !0), v = d.__isRendered && (d.__dirty & Zt || !f) ? d.getPrevPaintRect() : null;
        v && c(v);
        var g = f && (d.__dirty & Zt || !d.__isRendered) ? d.getPaintRect() : null;
        g && c(g);
      }
    }
    for (var h = this.__prevStartIndex; h < this.__prevEndIndex; ++h) {
      var d = i[h], f = d && d.shouldBePainted(n, a, !0, !0);
      if (d && (!f || !d.__zr) && d.__isRendered) {
        var v = d.getPrevPaintRect();
        v && c(v);
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
        for (var m = h + 1; m < o.length; )
          o[h].intersect(o[m]) ? (p = !0, o[h].union(o[m]), o.splice(m, 1)) : m++;
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
    var u = this.motionBlur && !r, c = this.lastFrameAlpha, h = this.dpr, d = this;
    u && (this.domBack || this.createBackBuffer(), this.ctxBack.globalCompositeOperation = "copy", this.ctxBack.drawImage(a, 0, 0, s / h, l / h));
    var f = this.domBack;
    function v(g, p, m, y) {
      if (o.clearRect(g, p, m, y), i && i !== "transparent") {
        var _ = void 0;
        if (bo(i)) {
          var w = i.global || i.__width === m && i.__height === y;
          _ = w && i.__canvasGradient || Bl(o, i, {
            x: 0,
            y: 0,
            width: m,
            height: y
          }), i.__canvasGradient = _, i.__width = m, i.__height = y;
        } else L1(i) && (i.scaleX = i.scaleX || h, i.scaleY = i.scaleY || h, _ = Ol(o, i, {
          dirty: function() {
            d.setUnpainted(), d.painter.refresh();
          }
        }));
        o.save(), o.fillStyle = _ || i, o.fillRect(g, p, m, y), o.restore();
      }
      u && (o.save(), o.globalAlpha = c, o.drawImage(f, g, p, m, y), o.restore());
    }
    !n || u ? v(0, 0, s, l) : n.length && A(n, function(g) {
      v(g.x * h, g.y * h, g.width * h, g.height * h);
    });
  }, t;
})(Ee), Uf = 1e5, Or = 314159, Ma = 0.01, i2 = 1e-3;
function n2(e) {
  return e ? e.__builtin__ ? !0 : !(typeof e.resize != "function" || typeof e.refresh != "function") : !1;
}
function a2(e, t) {
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
var o2 = (function() {
  function e(t, r, i, n) {
    this.type = "canvas", this._zlevelList = [], this._prevDisplayList = [], this._layers = {}, this._layerConfig = {}, this._needsManuallyCompositing = !1, this.type = "canvas";
    var a = !t.nodeName || t.nodeName.toUpperCase() === "CANVAS";
    this._opts = i = E({}, i || {}), this.dpr = i.devicePixelRatio || Ja, this._singleCanvas = a, this.root = t;
    var o = t.style;
    o && (gd(t), t.innerHTML = ""), this.storage = r;
    var s = this._zlevelList;
    this._prevDisplayList = [];
    var l = this._layers;
    if (a) {
      var c = t, h = c.width, d = c.height;
      i.width != null && (h = i.width), i.height != null && (d = i.height), this.dpr = i.devicePixelRatio || 1, c.width = h * this.dpr, c.height = d * this.dpr, this._width = h, this._height = d;
      var f = new qs(c, this, this.dpr);
      f.__builtin__ = !0, f.initContext(), l[Or] = f, f.zlevel = Or, s.push(Or), this._domRoot = t;
    } else {
      this._width = ba(t, 0, i), this._height = ba(t, 1, i);
      var u = this._domRoot = a2(this._width, this._height);
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
        s.__inHover && (i || (i = this._hoverlayer = this.getLayer(Uf)), a || (a = i.ctx, a.save()), Vr(a, s, n, o === r - 1));
      }
      a && a.restore();
    }
  }, e.prototype.getHoverLayer = function() {
    return this.getLayer(Uf);
  }, e.prototype.paintOne = function(t, r) {
    Ap(t, r);
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
        Xa(function() {
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
    for (var c = !0, h = !1, d = function(g) {
      var p = a[g], m = p.ctx, y = o && p.createRepaintRects(t, r, f._width, f._height), _ = i ? p.__startIndex : p.__drawIndex, w = !i && p.incremental && Date.now, S = w && Date.now(), b = p.zlevel === f._zlevelList[0] ? f._backgroundColor : null;
      if (p.__startIndex === p.__endIndex)
        p.clear(!1, b, y);
      else if (_ === p.__startIndex) {
        var x = t[_];
        (!x.incremental || !x.notClear || i) && p.clear(!1, b, y);
      }
      _ === -1 && (console.error("For some unknown reason. drawIndex is -1"), _ = p.__startIndex);
      var T, C = function(L) {
        var k = {
          inHover: !1,
          allClipped: !1,
          prevEl: null,
          viewWidth: n._width,
          viewHeight: n._height
        };
        for (T = _; T < p.__endIndex; T++) {
          var B = t[T];
          if (B.__inHover && (h = !0), n._doPaintEl(B, p, o, L, k, T === p.__endIndex - 1), w) {
            var O = Date.now() - S;
            if (O > 15)
              break;
          }
        }
        k.prevElClipPaths && m.restore();
      };
      if (y)
        if (y.length === 0)
          T = p.__endIndex;
        else
          for (var M = f.dpr, D = 0; D < y.length; ++D) {
            var P = y[D];
            m.save(), m.beginPath(), m.rect(P.x * M, P.y * M, P.width * M, P.height * M), m.clip(), C(P), m.restore();
          }
      else
        m.save(), C(), m.restore();
      p.__drawIndex = T, p.__drawIndex < p.__endIndex && (c = !1);
    }, f = this, v = 0; v < a.length; v++)
      d(v);
    return V.wxa && A(this._layers, function(g) {
      g && g.ctx && g.ctx.draw && g.ctx.draw();
    }), {
      finished: c,
      needsRefreshHover: h
    };
  }, e.prototype._doPaintEl = function(t, r, i, n, a, o) {
    var s = r.ctx;
    if (i) {
      var l = t.getPaintRect();
      (!n || l && l.intersect(n)) && (Vr(s, t, a, o), t.setPrevPaintRect(l));
    } else
      Vr(s, t, a, o);
  }, e.prototype.getLayer = function(t, r) {
    this._singleCanvas && !this._needsManuallyCompositing && (t = Or);
    var i = this._layers[t];
    return i || (i = new qs("zr_" + t, this, this.dpr), i.zlevel = t, i.__builtin__ = !0, this._layerConfig[t] ? mt(i, this._layerConfig[t], !0) : this._layerConfig[t - Ma] && mt(i, this._layerConfig[t - Ma], !0), r && (i.virtual = r), this.insertLayer(t, i), i.initContext()), i;
  }, e.prototype.insertLayer = function(t, r) {
    var i = this._layers, n = this._zlevelList, a = n.length, o = this._domRoot, s = null, l = -1;
    if (!i[t] && n2(r)) {
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
    this.eachBuiltinLayer(function(h, d) {
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
      s !== u && (s = u, o = 0), n.incremental ? (c = this.getLayer(u + i2, this._needsManuallyCompositing), c.incremental = !0, o = 1) : c = this.getLayer(u + (o > 0 ? Ma : 0), this._needsManuallyCompositing), c.__builtin__ || $l("ZLevel " + u + " has been used by unkown layer " + c.id), c !== a && (c.__used = !0, c.__startIndex !== l && (c.__dirty = !0), c.__startIndex = l, c.incremental ? c.__drawIndex = -1 : c.__drawIndex = l, r(l), a = c), n.__dirty & Zt && !n.__inHover && (c.__dirty = !0, c.incremental && c.__drawIndex < 0 && (c.__drawIndex = l));
    }
    r(l), this.eachBuiltinLayer(function(h, d) {
      !h.__used && h.getElementCount() > 0 && (h.__dirty = !0, h.__startIndex = h.__endIndex = h.__drawIndex = 0), h.__dirty && h.__drawIndex < 0 && (h.__drawIndex = h.__startIndex);
    });
  }, e.prototype.clear = function() {
    return this.eachBuiltinLayer(this._clearLayer), this;
  }, e.prototype._clearLayer = function(t) {
    t.clear();
  }, e.prototype.setBackgroundColor = function(t) {
    this._backgroundColor = t, A(this._layers, function(r) {
      r.setUnpainted();
    });
  }, e.prototype.configLayer = function(t, r) {
    if (r) {
      var i = this._layerConfig;
      i[t] ? mt(i[t], r, !0) : i[t] = r;
      for (var n = 0; n < this._zlevelList.length; n++) {
        var a = this._zlevelList[n];
        if (a === t || a === t + Ma) {
          var o = this._layers[a];
          mt(o, i[t], !0);
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
    var r = new qs("image", this, t.pixelRatio || this.dpr);
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
        Vr(i, c, o, l === u - 1);
      }
    return r.dom;
  }, e.prototype.getWidth = function() {
    return this._width;
  }, e.prototype.getHeight = function() {
    return this._height;
  }, e;
})();
function s2(e) {
  e.registerPainter("canvas", o2);
}
var Nr = wt(), Vf = j, Zs = lt, l2 = (
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
          s = this._group = new He(), this.createPointerEl(s, u, t, r), this.createLabelEl(s, u, t, r), i.getZr().add(s);
        else {
          var d = Qt(Wf, r, h);
          this.updatePointerEl(s, u, d), this.updateLabelEl(s, u, d, r);
        }
        Gf(s, r, !0), this._renderHandle(a);
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
          var l = zu(t).seriesDataCount, u = n.getExtent();
          return Math.abs(u[0] - u[1]) / l > s;
        }
        return !1;
      }
      return i === !0;
    }, e.prototype.makeElOption = function(t, r, i, n, a) {
    }, e.prototype.createPointerEl = function(t, r, i, n) {
      var a = r.pointer;
      if (a) {
        var o = Nr(t).pointerEl = new ET[a.type](Vf(r.pointer));
        t.add(o);
      }
    }, e.prototype.createLabelEl = function(t, r, i, n) {
      if (r.label) {
        var a = Nr(t).labelEl = new pe(Vf(r.label));
        t.add(a), Hf(a, n);
      }
    }, e.prototype.updatePointerEl = function(t, r, i) {
      var n = Nr(t).pointerEl;
      n && r.pointer && (n.setStyle(r.pointer.style), i(n, {
        shape: r.pointer.shape
      }));
    }, e.prototype.updateLabelEl = function(t, r, i, n) {
      var a = Nr(t).labelEl;
      a && (a.setStyle(r.label.style), i(a, {
        // Consider text length change in vertical axis, animation should
        // be used on shape, otherwise the effect will be weird.
        // TODOTODO
        // shape: elOption.label.shape,
        x: r.label.x,
        y: r.label.y
      }), Hf(a, n));
    }, e.prototype._renderHandle = function(t) {
      if (!(this._dragging || !this.updateHandleTransform)) {
        var r = this._axisPointerModel, i = this._api.getZr(), n = this._handle, a = r.getModel("handle"), o = r.get("status");
        if (!a.get("show") || !o || o === "hide") {
          n && i.remove(n), this._handle = null;
          return;
        }
        var s;
        this._handle || (s = !0, n = this._handle = Mv(a.get("icon"), {
          cursor: "move",
          draggable: !0,
          onmousemove: function(u) {
            yd(u.event);
          },
          onmousedown: Zs(this._onHandleDragMove, this, 0, 0),
          drift: Zs(this._onHandleDragMove, this),
          ondragend: Zs(this._onHandleDragEnd, this)
        }), i.add(n)), Gf(n, r, !1), n.setStyle(a.getItemStyle(null, ["color", "borderColor", "borderWidth", "opacity", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"]));
        var l = a.get("size");
        N(l) || (l = [l, l]), n.scaleX = l[0] / 2, n.scaleY = l[1] / 2, vp(this, "_doDispatchAxisPointer", a.get("throttle") || 0, "fixRate"), this._moveHandleToValue(t, s);
      }
    }, e.prototype._moveHandleToValue = function(t, r) {
      Wf(this._axisPointerModel, !r && this._moveAnimation, this._handle, Qs(this.getHandleTransform(t, this._axisModel, this._axisPointerModel)));
    }, e.prototype._onHandleDragMove = function(t, r) {
      var i = this._handle;
      if (i) {
        this._dragging = !0;
        var n = this.updateHandleTransform(Qs(i), [t, r], this._axisModel, this._axisPointerModel);
        this._payloadInfo = n, i.stopAnimation(), i.attr(Qs(n)), Nr(i).lastProp = null, this._doDispatchAxisPointer();
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
      r && i && (this._lastGraphicKey = null, i && r.remove(i), n && r.remove(n), this._group = null, this._handle = null, this._payloadInfo = null), Il(this, "_doDispatchAxisPointer");
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
function Wf(e, t, r, i) {
  ig(Nr(r).lastProp, i) || (Nr(r).lastProp = i, t ? In(r, i, e) : (r.stopAnimation(), r.attr(i)));
}
function ig(e, t) {
  if (z(e) && z(t)) {
    var r = !0;
    return A(t, function(i, n) {
      r = r && ig(e[n], i);
    }), !!r;
  } else
    return e === t;
}
function Hf(e, t) {
  e[t.get(["label", "show"]) ? "show" : "hide"]();
}
function Qs(e) {
  return {
    x: e.x || 0,
    y: e.y || 0,
    rotation: e.rotation || 0
  };
}
function Gf(e, t, r) {
  var i = t.get("z"), n = t.get("zlevel");
  e && e.traverse(function(a) {
    a.type !== "group" && (i != null && (a.z = i), n != null && (a.zlevel = n), a.silent = r);
  });
}
function u2(e) {
  var t = e.get("type"), r = e.getModel(t + "Style"), i;
  return t === "line" ? (i = r.getLineStyle(), i.fill = null) : t === "shadow" && (i = r.getAreaStyle(), i.stroke = null), i;
}
function c2(e, t, r, i, n) {
  var a = r.get("value"), o = ng(a, t.axis, t.ecModel, r.get("seriesDataIndices"), {
    precision: r.get(["label", "precision"]),
    formatter: r.get(["label", "formatter"])
  }), s = r.getModel("label"), l = Mu(s.get("padding") || 0), u = s.getFont(), c = Od(o, u), h = n.position, d = c.width + l[1] + l[3], f = c.height + l[0] + l[2], v = n.align;
  v === "right" && (h[0] -= d), v === "center" && (h[0] -= d / 2);
  var g = n.verticalAlign;
  g === "bottom" && (h[1] -= f), g === "middle" && (h[1] -= f / 2), h2(h, d, f, i);
  var p = s.get("backgroundColor");
  (!p || p === "auto") && (p = t.get(["axisLine", "lineStyle", "color"])), e.label = {
    // shape: {x: 0, y: 0, width: width, height: height, r: labelModel.get('borderRadius')},
    x: h[0],
    y: h[1],
    style: En(s, {
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
function h2(e, t, r, i) {
  var n = i.getWidth(), a = i.getHeight();
  e[0] = Math.min(e[0] + t, n) - t, e[1] = Math.min(e[1] + r, a) - r, e[0] = Math.max(e[0], 0), e[1] = Math.max(e[1], 0);
}
function ng(e, t, r, i, n) {
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
      value: Kp(t, {
        value: e
      }),
      axisDimension: t.dim,
      axisIndex: t.index,
      seriesData: []
    };
    A(i, function(l) {
      var u = r.getSeriesByIndex(l.seriesIndex), c = l.dataIndexInside, h = u && u.getDataParams(c);
      h && s.seriesData.push(h);
    }), W(o) ? a = o.replace("{value}", a) : rt(o) && (a = o(s));
  }
  return a;
}
function ag(e, t, r) {
  var i = yi();
  return iu(i, i, r.rotation), nl(i, i, r.position), xu([e.dataToCoord(t), (r.labelOffset || 0) + (r.labelDirection || 1) * (r.labelMargin || 0)], i);
}
function f2(e, t, r, i, n, a) {
  var o = Gr.innerTextLayout(r.rotation, 0, r.labelDirection);
  r.labelMargin = n.get(["label", "margin"]), c2(t, i, n, a, {
    position: ag(i.axis, e, r),
    align: o.textAlign,
    verticalAlign: o.textVerticalAlign
  });
}
function d2(e, t, r) {
  return r = r || 0, {
    x1: e[r],
    y1: e[1 - r],
    x2: t[r],
    y2: t[1 - r]
  };
}
function v2(e, t, r) {
  return r = r || 0, {
    x: e[r],
    y: e[1 - r],
    width: t[r],
    height: t[1 - r]
  };
}
var p2 = (
  /** @class */
  (function(e) {
    G(t, e);
    function t() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return t.prototype.makeElOption = function(r, i, n, a, o) {
      var s = n.axis, l = s.grid, u = a.get("type"), c = Yf(l, s).getOtherAxis(s).getGlobalExtent(), h = s.toGlobalCoord(s.dataToCoord(i, !0));
      if (u && u !== "none") {
        var d = u2(a), f = g2[u](s, h, c);
        f.style = d, r.graphicKey = f.type, r.pointer = f;
      }
      var v = Rf(l.model, n);
      f2(
        // @ts-ignore
        i,
        r,
        v,
        n,
        a,
        o
      );
    }, t.prototype.getHandleTransform = function(r, i, n) {
      var a = Rf(i.axis.grid.model, i, {
        labelInside: !1
      });
      a.labelMargin = n.get(["handle", "margin"]);
      var o = ag(i.axis, r, a);
      return {
        x: o[0],
        y: o[1],
        rotation: a.rotation + (a.labelDirection < 0 ? Math.PI : 0)
      };
    }, t.prototype.updateHandleTransform = function(r, i, n, a) {
      var o = n.axis, s = o.grid, l = o.getGlobalExtent(!0), u = Yf(s, o).getOtherAxis(o).getGlobalExtent(), c = o.dim === "x" ? 0 : 1, h = [r.x, r.y];
      h[c] += i[c], h[c] = Math.min(l[1], h[c]), h[c] = Math.max(l[0], h[c]);
      var d = (u[1] + u[0]) / 2, f = [d, d];
      f[c] = h[c];
      var v = [{
        verticalAlign: "middle"
      }, {
        align: "center"
      }];
      return {
        x: h[0],
        y: h[1],
        rotation: r.rotation,
        cursorPoint: f,
        tooltipOption: v[c]
      };
    }, t;
  })(l2)
);
function Yf(e, t) {
  var r = {};
  return r[t.dim + "AxisIndex"] = t.index, e.getCartesian(r);
}
var g2 = {
  line: function(e, t, r) {
    var i = d2([t, r[0]], [t, r[1]], Xf(e));
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
      shape: v2([t - i / 2, r[0]], [i, n], Xf(e))
    };
  }
};
function Xf(e) {
  return e.dim === "x" ? 0 : 1;
}
var m2 = (
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
), Ue = wt(), y2 = A;
function og(e, t, r) {
  if (!V.node) {
    var i = t.getZr();
    Ue(i).records || (Ue(i).records = {}), _2(i, t);
    var n = Ue(i).records[e] || (Ue(i).records[e] = {});
    n.handler = r;
  }
}
function _2(e, t) {
  if (Ue(e).initialized)
    return;
  Ue(e).initialized = !0, r("click", Qt(qf, "click")), r("mousemove", Qt(qf, "mousemove")), r("globalout", b2);
  function r(i, n) {
    e.on(i, function(a) {
      var o = S2(t);
      y2(Ue(e).records, function(s) {
        s && n(s, a, o.dispatchAction);
      }), w2(o.pendings, t);
    });
  }
}
function w2(e, t) {
  var r = e.showTip.length, i = e.hideTip.length, n;
  r ? n = e.showTip[r - 1] : i && (n = e.hideTip[i - 1]), n && (n.dispatchAction = null, t.dispatchAction(n));
}
function b2(e, t, r) {
  e.handler("leave", null, r);
}
function qf(e, t, r, i) {
  t.handler(e, r, i);
}
function S2(e) {
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
function Vl(e, t) {
  if (!V.node) {
    var r = t.getZr(), i = (Ue(r).records || {})[e];
    i && (Ue(r).records[e] = null);
  }
}
var x2 = (
  /** @class */
  (function(e) {
    G(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.prototype.render = function(r, i, n) {
      var a = i.getComponent("tooltip"), o = r.get("triggerOn") || a && a.get("triggerOn") || "mousemove|click";
      og("axisPointer", n, function(s, l, u) {
        o !== "none" && (s === "leave" || o.indexOf(s) >= 0) && u({
          type: "updateAxisPointer",
          currTrigger: s,
          x: l && l.offsetX,
          y: l && l.offsetY
        });
      });
    }, t.prototype.remove = function(r, i) {
      Vl("axisPointer", i);
    }, t.prototype.dispose = function(r, i) {
      Vl("axisPointer", i);
    }, t.type = "axisPointer", t;
  })(vr)
);
function sg(e, t) {
  var r = [], i = e.seriesIndex, n;
  if (i == null || !(n = t.getSeriesByIndex(i)))
    return {
      point: []
    };
  var a = n.getData(), o = Yn(a, e);
  if (o == null || o < 0 || N(o))
    return {
      point: []
    };
  var s = a.getItemGraphicEl(o), l = n.coordinateSystem;
  if (n.getTooltipPosition)
    r = n.getTooltipPosition(o) || [];
  else if (l && l.dataToPoint)
    if (e.isStacked) {
      var u = l.getBaseAxis(), c = l.getOtherAxis(u), h = c.dim, d = u.dim, f = h === "x" || h === "radius" ? 1 : 0, v = a.mapDimension(d), g = [];
      g[f] = a.get(v, o), g[1 - f] = a.get(a.getCalculationInfo("stackResultDimension"), o), r = l.dataToPoint(g) || [];
    } else
      r = l.dataToPoint(a.getValues($(l.dimensions, function(m) {
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
var Zf = wt();
function T2(e, t, r) {
  var i = e.currTrigger, n = [e.x, e.y], a = e, o = e.dispatchAction || lt(r.dispatchAction, r), s = t.getComponent("axisPointer").coordSysAxesInfo;
  if (s) {
    Wa(n) && (n = sg({
      seriesIndex: a.seriesIndex,
      // Do not use dataIndexInside from other ec instance.
      // FIXME: auto detect it?
      dataIndex: a.dataIndex
    }, t).point);
    var l = Wa(n), u = a.axesInfo, c = s.axesInfo, h = i === "leave" || Wa(n), d = {}, f = {}, v = {
      list: [],
      map: {}
    }, g = {
      showPointer: Qt(A2, f),
      showTooltip: Qt(M2, v)
    };
    A(s.coordSysMap, function(m, y) {
      var _ = l || m.containPoint(n);
      A(s.coordSysAxesInfo[y], function(w, S) {
        var b = w.axis, x = L2(u, w);
        if (!h && _ && (!u || x)) {
          var T = x && x.value;
          T == null && !l && (T = b.pointToData(n)), T != null && Qf(w, T, g, !1, d);
        }
      });
    });
    var p = {};
    return A(c, function(m, y) {
      var _ = m.linkGroup;
      _ && !f[y] && A(_.axesInfo, function(w, S) {
        var b = f[S];
        if (w !== m && b) {
          var x = b.value;
          _.mapper && (x = m.axis.scale.parse(_.mapper(x, Kf(w), Kf(m)))), p[m.key] = x;
        }
      });
    }), A(p, function(m, y) {
      Qf(c[y], m, g, !0, d);
    }), D2(f, c, d), k2(v, n, e, o), P2(c, o, r), d;
  }
}
function Qf(e, t, r, i, n) {
  var a = e.axis;
  if (!(a.scale.isBlank() || !a.containData(t))) {
    if (!e.involveSeries) {
      r.showPointer(e, t);
      return;
    }
    var o = C2(t, e), s = o.payloadBatch, l = o.snapToValue;
    s[0] && n.seriesIndex == null && E(n, s[0]), !i && e.snap && a.containData(l) && l != null && (t = l), r.showPointer(e, t, s), r.showTooltip(e, o, l);
  }
}
function C2(e, t) {
  var r = t.axis, i = r.dim, n = e, a = [], o = Number.MAX_VALUE, s = -1;
  return A(t.seriesModels, function(l, u) {
    var c = l.getData().mapDimensionsAll(i), h, d;
    if (l.getAxisTooltipData) {
      var f = l.getAxisTooltipData(c, e, r);
      d = f.dataIndices, h = f.nestestValue;
    } else {
      if (d = l.getData().indicesOfNearest(
        c[0],
        e,
        // Add a threshold to avoid find the wrong dataIndex
        // when data length is not same.
        // false,
        r.type === "category" ? 0.5 : null
      ), !d.length)
        return;
      h = l.getData().get(c[0], d[0]);
    }
    if (!(h == null || !isFinite(h))) {
      var v = e - h, g = Math.abs(v);
      g <= o && ((g < o || v >= 0 && s < 0) && (o = g, s = v, n = h, a.length = 0), A(d, function(p) {
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
function A2(e, t, r, i) {
  e[t.key] = {
    value: r,
    payloadBatch: i
  };
}
function M2(e, t, r, i) {
  var n = r.payloadBatch, a = t.axis, o = a.model, s = t.axisPointerModel;
  if (!(!t.triggerTooltip || !n.length)) {
    var l = t.coordSys.model, u = zn(l), c = e.map[u];
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
function D2(e, t, r) {
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
function k2(e, t, r, i) {
  if (Wa(t) || !e.list.length) {
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
function P2(e, t, r) {
  var i = r.getZr(), n = "axisPointerLastHighlights", a = Zf(i)[n] || {}, o = Zf(i)[n] = {};
  A(e, function(u, c) {
    var h = u.axisPointerModel.option;
    h.status === "show" && u.triggerEmphasis && A(h.seriesDataIndices, function(d) {
      var f = d.seriesIndex + " | " + d.dataIndex;
      o[f] = d;
    });
  });
  var s = [], l = [];
  A(a, function(u, c) {
    !o[c] && l.push(u);
  }), A(o, function(u, c) {
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
function L2(e, t) {
  for (var r = 0; r < (e || []).length; r++) {
    var i = e[r];
    if (t.axis.dim === i.axisDim && t.axis.model.componentIndex === i.axisIndex)
      return i;
  }
}
function Kf(e) {
  var t = e.axis.model, r = {}, i = r.axisDim = e.axis.dim;
  return r.axisIndex = r[i + "AxisIndex"] = t.componentIndex, r.axisName = r[i + "AxisName"] = t.name, r.axisId = r[i + "AxisId"] = t.id, r;
}
function Wa(e) {
  return !e || e[0] == null || isNaN(e[0]) || e[1] == null || isNaN(e[1]);
}
function I2(e) {
  r2.registerAxisPointerClass("CartesianAxisPointer", p2), e.registerComponentModel(m2), e.registerComponentView(x2), e.registerPreprocessor(function(t) {
    if (t) {
      (!t.axisPointer || t.axisPointer.length === 0) && (t.axisPointer = {});
      var r = t.axisPointer.link;
      r && !N(r) && (t.axisPointer.link = [r]);
    }
  }), e.registerProcessor(e.PRIORITY.PROCESSOR.STATISTIC, function(t, r) {
    t.getComponent("axisPointer").coordSysAxesInfo = QD(t, r);
  }), e.registerAction({
    type: "updateAxisPointer",
    event: "updateAxisPointer",
    update: ":updateAxisPointer"
  }, T2);
}
var E2 = (
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
function lg(e) {
  var t = e.get("confine");
  return t != null ? !!t : e.get("renderMode") === "richText";
}
function ug(e) {
  if (V.domSupported) {
    for (var t = document.documentElement.style, r = 0, i = e.length; r < i; r++)
      if (e[r] in t)
        return e[r];
  }
}
var cg = ug(["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]), R2 = ug(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]);
function hg(e, t) {
  if (!e)
    return t;
  t = Bv(t, !0);
  var r = e.indexOf(t);
  return e = r === -1 ? t : "-" + e.slice(0, r) + "-" + t, e.toLowerCase();
}
function B2(e, t) {
  var r = e.currentStyle || document.defaultView && document.defaultView.getComputedStyle(e);
  return r ? r[t] : null;
}
var O2 = hg(R2, "transition"), Uu = hg(cg, "transform"), N2 = "position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;" + (V.transform3dSupported ? "will-change:transform;" : "");
function F2(e) {
  return e = e === "left" ? "right" : e === "right" ? "left" : e === "top" ? "bottom" : "top", e;
}
function z2(e, t, r) {
  if (!W(r) || r === "inside")
    return "";
  var i = e.get("backgroundColor"), n = e.get("borderWidth");
  t = Rn(t);
  var a = F2(r), o = Math.max(Math.round(n) * 1.5, 6), s = "", l = Uu + ":", u;
  st(["left", "right"], a) > -1 ? (s += "top:50%", l += "translateY(-50%) rotate(" + (u = a === "left" ? -225 : -45) + "deg)") : (s += "left:50%", l += "translateX(-50%) rotate(" + (u = a === "top" ? 225 : 45) + "deg)");
  var c = u * Math.PI / 180, h = o + n, d = h * Math.abs(Math.cos(c)) + h * Math.abs(Math.sin(c)), f = Math.round(((d - Math.SQRT2 * n) / 2 + Math.SQRT2 * n - (d - h) / 2) * 100) / 100;
  s += ";" + a + ":-" + f + "px";
  var v = t + " solid " + n + "px;", g = ["position:absolute;width:" + o + "px;height:" + o + "px;z-index:-1;", s + ";" + l + ";", "border-bottom:" + v, "border-right:" + v, "background-color:" + i + ";"];
  return '<div style="' + g.join("") + '"></div>';
}
function U2(e, t) {
  var r = "cubic-bezier(0.23,1,0.32,1)", i = " " + e / 2 + "s " + r, n = "opacity" + i + ",visibility" + i;
  return t || (i = " " + e + "s " + r, n += V.transformSupported ? "," + Uu + i : ",left" + i + ",top" + i), O2 + ":" + n;
}
function Jf(e, t, r) {
  var i = e.toFixed(0) + "px", n = t.toFixed(0) + "px";
  if (!V.transformSupported)
    return r ? "top:" + n + ";left:" + i + ";" : [["top", n], ["left", i]];
  var a = V.transform3dSupported, o = "translate" + (a ? "3d" : "") + "(" + i + "," + n + (a ? ",0" : "") + ")";
  return r ? "top:0;left:0;" + Uu + ":" + o + ";" : [["top", 0], ["left", 0], [cg, o]];
}
function V2(e) {
  var t = [], r = e.get("fontSize"), i = e.getTextColor();
  i && t.push("color:" + i), t.push("font:" + e.getFont());
  var n = K(e.get("lineHeight"), Math.round(r * 3 / 2));
  r && t.push("line-height:" + n + "px");
  var a = e.get("textShadowColor"), o = e.get("textShadowBlur") || 0, s = e.get("textShadowOffsetX") || 0, l = e.get("textShadowOffsetY") || 0;
  return a && o && t.push("text-shadow:" + s + "px " + l + "px " + o + "px " + a), A(["decoration", "align"], function(u) {
    var c = e.get(u);
    c && t.push("text-" + u + ":" + c);
  }), t.join(";");
}
function W2(e, t, r) {
  var i = [], n = e.get("transitionDuration"), a = e.get("backgroundColor"), o = e.get("shadowBlur"), s = e.get("shadowColor"), l = e.get("shadowOffsetX"), u = e.get("shadowOffsetY"), c = e.getModel("textStyle"), h = hp(e, "html"), d = l + "px " + u + "px " + o + "px " + s;
  return i.push("box-shadow:" + d), t && n && i.push(U2(n, r)), a && i.push("background-color:" + a), A(["width", "color", "radius"], function(f) {
    var v = "border-" + f, g = Bv(v), p = e.get(g);
    p != null && i.push(v + ":" + p + (f === "color" ? "" : "px"));
  }), i.push(V2(c)), h != null && i.push("padding:" + Mu(h).join("px ") + "px"), i.join(";") + ";";
}
function jf(e, t, r, i, n) {
  var a = t && t.painter;
  if (r) {
    var o = a && a.getViewportRoot();
    o && X1(e, o, r, i, n);
  } else {
    e[0] = i, e[1] = n;
    var s = a && a.getViewportRootOffset();
    s && (e[0] += s.offsetLeft, e[1] += s.offsetTop);
  }
  e[2] = e[0] / t.getWidth(), e[3] = e[1] / t.getHeight();
}
var H2 = (
  /** @class */
  (function() {
    function e(t, r) {
      if (this._show = !1, this._styleCoord = [0, 0, 0, 0], this._enterable = !0, this._alwaysShowContent = !1, this._firstShow = !0, this._longHide = !0, V.wxa)
        return null;
      var i = document.createElement("div");
      i.domBelongToZr = !0, this.el = i;
      var n = this._zr = t.getZr(), a = r.appendTo, o = a && (W(a) ? document.querySelector(a) : Mn(a) ? a : rt(a) && a(t.getDom()));
      jf(this._styleCoord, n, o, t.getWidth() / 2, t.getHeight() / 2), (o || t.getDom()).appendChild(i), this._api = t, this._container = o;
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
        var r = this._api.getDom(), i = B2(r, "position"), n = r.style;
        n.position !== "absolute" && i !== "absolute" && (n.position = "relative");
      }
      var a = t.get("alwaysShowContent");
      a && this._moveIfResized(), this._alwaysShowContent = a, this.el.className = t.get("className") || "";
    }, e.prototype.show = function(t, r) {
      clearTimeout(this._hideTimeout), clearTimeout(this._longHideTimeout);
      var i = this.el, n = i.style, a = this._styleCoord;
      i.innerHTML ? n.cssText = N2 + W2(t, !this._firstShow, this._longHide) + Jf(a[0], a[1], !0) + ("border-color:" + Rn(r) + ";") + (t.get("extraCssText") || "") + (";pointer-events:" + (this._enterable ? "auto" : "none")) : n.display = "none", this._show = !0, this._firstShow = !1, this._longHide = !1;
    }, e.prototype.setContent = function(t, r, i, n, a) {
      var o = this.el;
      if (t == null) {
        o.innerHTML = "";
        return;
      }
      var s = "";
      if (W(a) && i.get("trigger") === "item" && !lg(i) && (s = z2(i, n, a)), W(t))
        o.innerHTML = t + s;
      else if (t) {
        o.innerHTML = "", N(t) || (t = [t]);
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
        if (jf(i, this._zr, this._container, t, r), i[0] != null && i[1] != null) {
          var n = this.el.style, a = Jf(i[0], i[1]);
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
      r.visibility = "hidden", r.opacity = "0", V.transform3dSupported && (r.willChange = ""), this._show = !1, this._longHideTimeout = setTimeout(function() {
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
), G2 = (
  /** @class */
  (function() {
    function e(t) {
      this._show = !1, this._styleCoord = [0, 0, 0, 0], this._alwaysShowContent = !1, this._enterable = !0, this._zr = t.getZr(), td(this._styleCoord, this._zr, t.getWidth() / 2, t.getHeight() / 2);
    }
    return e.prototype.update = function(t) {
      var r = t.get("alwaysShowContent");
      r && this._moveIfResized(), this._alwaysShowContent = r;
    }, e.prototype.show = function() {
      this._hideTimeout && clearTimeout(this._hideTimeout), this.el.show(), this._show = !0;
    }, e.prototype.setContent = function(t, r, i, n, a) {
      var o = this;
      z(t) && Ut(""), this.el && this._zr.remove(this.el);
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
          padding: hp(i, "richText"),
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
      var t = this.el, r = this.el.getBoundingRect(), i = $f(t.style);
      return [r.width + i.left + i.right, r.height + i.top + i.bottom];
    }, e.prototype.moveTo = function(t, r) {
      var i = this.el;
      if (i) {
        var n = this._styleCoord;
        td(n, this._zr, t, r), t = n[0], r = n[1];
        var a = i.style, o = ir(a.borderWidth || 0), s = $f(a);
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
function $f(e) {
  var t = ir(e.shadowBlur || 0), r = ir(e.shadowOffsetX || 0), i = ir(e.shadowOffsetY || 0);
  return {
    left: ir(t - r),
    right: ir(t + r),
    top: ir(t - i),
    bottom: ir(t + i)
  };
}
function td(e, t, r, i) {
  e[0] = r, e[1] = i, e[2] = e[0] / t.getWidth(), e[3] = e[1] / t.getHeight();
}
var Y2 = new de({
  shape: {
    x: -1,
    y: -1,
    width: 2,
    height: 2
  }
}), X2 = (
  /** @class */
  (function(e) {
    G(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.prototype.init = function(r, i) {
      if (!(V.node || !i.getDom())) {
        var n = r.getComponent("tooltip"), a = this._renderMode = mS(n.get("renderMode"));
        this._tooltipContent = a === "richText" ? new G2(i) : new H2(i, {
          appendTo: n.get("appendToBody", !0) ? "body" : n.get("appendTo", !0)
        });
      }
    }, t.prototype.render = function(r, i, n) {
      if (!(V.node || !n.getDom())) {
        this.group.removeAll(), this._tooltipModel = r, this._ecModel = i, this._api = n;
        var a = this._tooltipContent;
        a.update(r), a.setEnterable(r.get("enterable")), this._initGlobalListener(), this._keepShow(), this._renderMode !== "richText" && r.get("transitionDuration") ? vp(this, "_updatePosition", 50, "fixRate") : Il(this, "_updatePosition");
      }
    }, t.prototype._initGlobalListener = function() {
      var r = this._tooltipModel, i = r.get("triggerOn");
      og("itemTooltip", this._api, lt(function(n, a, o) {
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
      if (!(a.from === this.uid || V.node || !n.getDom())) {
        var o = ed(a, n);
        this._ticket = "";
        var s = a.dataByCoordSys, l = K2(a, i, n);
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
          var c = Y2;
          c.x = a.x, c.y = a.y, c.update(), dt(c).tooltipConfig = {
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
          var h = sg(a, i), d = h.point[0], f = h.point[1];
          d != null && f != null && this._tryShow({
            offsetX: d,
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
      this._tooltipModel && o.hideLater(this._tooltipModel.get("hideDelay")), this._lastX = this._lastY = this._lastDataByCoordSys = null, a.from !== this.uid && this._hide(ed(a, n));
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
          var s = dt(n);
          if (s.ssrType === "legend")
            return;
          this._lastDataByCoordSys = null;
          var l, u;
          un(n, function(c) {
            if (dt(c).dataIndex != null)
              return l = c, !0;
            if (dt(c).tooltipConfig != null)
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
      }), h = [], d = new Is();
      A(r, function(y) {
        A(y.dataByAxis, function(_) {
          var w = n.getComponent(_.axisDim + "Axis", _.axisIndex), S = _.value;
          if (!(!w || S == null)) {
            var b = ng(S, w.axis, n, _.seriesDataIndices, _.valueLabelOpt), x = On("section", {
              header: b,
              noHeader: !Me(b),
              sortBlocks: !0,
              blocks: []
            });
            c.blocks.push(x), A(_.seriesDataIndices, function(T) {
              var C = n.getSeriesByIndex(T.seriesIndex), M = T.dataIndexInside, D = C.getDataParams(M);
              if (!(D.dataIndex < 0)) {
                D.axisDim = _.axisDim, D.axisIndex = _.axisIndex, D.axisType = _.axisType, D.axisId = _.axisId, D.axisValue = Kp(w.axis, {
                  value: S
                }), D.axisValueLabel = b, D.marker = d.makeTooltipMarker("item", Rn(D.color), l);
                var P = Vh(C.formatTooltip(M, !0, null)), L = P.frag;
                if (L) {
                  var k = rn([C], a).get("valueFormatter");
                  x.blocks.push(k ? E({
                    valueFormatter: k
                  }, L) : L);
                }
                P.text && h.push(P.text), u.push(D);
              }
            });
          }
        });
      }), c.blocks.reverse(), h.reverse();
      var f = i.position, v = s.get("order"), g = Xh(c, d, l, v, n.get("useUTC"), s.get("textStyle"));
      g && h.unshift(g);
      var p = l === "richText" ? `

` : "<br/>", m = h.join(p);
      this._showOrMove(s, function() {
        this._updateContentNotChangedOnAxis(r, u) ? this._updatePosition(s, f, o[0], o[1], this._tooltipContent, u) : this._showTooltipContent(s, m, u, Math.random() + "", o[0], o[1], f, null, d);
      });
    }, t.prototype._showSeriesItemTooltip = function(r, i, n) {
      var a = this._ecModel, o = dt(i), s = o.seriesIndex, l = a.getSeriesByIndex(s), u = o.dataModel || l, c = o.dataIndex, h = o.dataType, d = u.getData(h), f = this._renderMode, v = r.positionDefault, g = rn([d.getItemModel(c), u, l && (l.coordinateSystem || {}).model], this._tooltipModel, v ? {
        position: v
      } : null), p = g.get("trigger");
      if (!(p != null && p !== "item")) {
        var m = u.getDataParams(c, h), y = new Is();
        m.marker = y.makeTooltipMarker("item", Rn(m.color), f);
        var _ = Vh(u.formatTooltip(c, !1, h)), w = g.get("order"), S = g.get("valueFormatter"), b = _.frag, x = b ? Xh(S ? E({
          valueFormatter: S
        }, b) : b, y, f, w, a.get("useUTC"), g.get("textStyle")) : _.text, T = "item_" + u.name + "_" + c;
        this._showOrMove(g, function() {
          this._showTooltipContent(g, x, m, T, r.offsetX, r.offsetY, r.position, r.target, y);
        }), n({
          type: "showTip",
          dataIndexInside: c,
          dataIndex: d.getRawIndex(c),
          seriesIndex: s,
          from: this.uid
        });
      }
    }, t.prototype._showComponentItemTooltip = function(r, i, n) {
      var a = this._renderMode === "html", o = dt(i), s = o.tooltipConfig, l = s.option || {}, u = l.encodeHTMLContent;
      if (W(l)) {
        var c = l;
        l = {
          content: c,
          // Fixed formatter
          formatter: c
        }, u = !0;
      }
      u && a && l.content && (l = j(l), l.content = Ft(l.content));
      var h = [l], d = this._ecModel.getComponent(o.componentMainType, o.componentIndex);
      d && h.push(d), h.push({
        formatter: l.content
      });
      var f = r.positionDefault, v = rn(h, this._tooltipModel, f ? {
        position: f
      } : null), g = v.get("content"), p = Math.random() + "", m = new Is();
      this._showOrMove(v, function() {
        var y = j(v.get("formatterParams") || {});
        this._showTooltipContent(v, g, y, p, r.offsetX, r.offsetY, r.position, i, m);
      }), n({
        type: "showTip",
        from: this.uid
      });
    }, t.prototype._showTooltipContent = function(r, i, n, a, o, s, l, u, c) {
      if (this._ticket = "", !(!r.get("showContent") || !r.get("show"))) {
        var h = this._tooltipContent;
        h.setEnterable(r.get("enterable"));
        var d = r.get("formatter");
        l = l || r.get("position");
        var f = i, v = this._getNearestPoint([o, s], n, r.get("trigger"), r.get("borderColor")), g = v.color;
        if (d)
          if (W(d)) {
            var p = r.ecModel.get("useUTC"), m = N(n) ? n[0] : n, y = m && m.axisType && m.axisType.indexOf("time") >= 0;
            f = d, y && (f = Rv(m.axisValue, f, p)), f = Ov(f, n, !0);
          } else if (rt(d)) {
            var _ = lt(function(w, S) {
              w === this._ticket && (h.setContent(S, c, r, g, l), this._updatePosition(r, l, o, s, h, n, u));
            }, this);
            this._ticket = a, f = d(n, a, _);
          } else
            f = d;
        h.setContent(f, c, r, g, l), h.show(r, g), this._updatePosition(r, l, o, s, h, n, u);
      }
    }, t.prototype._getNearestPoint = function(r, i, n, a) {
      if (n === "axis" || N(i))
        return {
          color: a || (this._renderMode === "html" ? "#fff" : "none")
        };
      if (!N(i))
        return {
          color: a || i.color || i.borderColor
        };
    }, t.prototype._updatePosition = function(r, i, n, a, o, s, l) {
      var u = this._api.getWidth(), c = this._api.getHeight();
      i = i || r.get("position");
      var h = o.getSize(), d = r.get("align"), f = r.get("verticalAlign"), v = l && l.getBoundingRect().clone();
      if (l && v.applyTransform(l.transform), rt(i) && (i = i([n, a], s, o.el, v, {
        viewSize: [u, c],
        contentSize: h.slice()
      })), N(i))
        n = _t(i[0], u), a = _t(i[1], c);
      else if (z(i)) {
        var g = i;
        g.width = h[0], g.height = h[1];
        var p = Fv(g, {
          width: u,
          height: c
        });
        n = p.x, a = p.y, d = null, f = null;
      } else if (W(i) && l) {
        var m = Q2(i, v, h, r.get("borderWidth"));
        n = m[0], a = m[1];
      } else {
        var m = q2(n, a, o, u, c, d ? null : 20, f ? null : 20);
        n = m[0], a = m[1];
      }
      if (d && (n -= rd(d) ? h[0] / 2 : d === "right" ? h[0] : 0), f && (a -= rd(f) ? h[1] / 2 : f === "bottom" ? h[1] : 0), lg(r)) {
        var m = Z2(n, a, o, u, c);
        n = m[0], a = m[1];
      }
      o.moveTo(n, a);
    }, t.prototype._updateContentNotChangedOnAxis = function(r, i) {
      var n = this._lastDataByCoordSys, a = this._cbParamsList, o = !!n && n.length === r.length;
      return o && A(n, function(s, l) {
        var u = s.dataByAxis || [], c = r[l] || {}, h = c.dataByAxis || [];
        o = o && u.length === h.length, o && A(u, function(d, f) {
          var v = h[f] || {}, g = d.seriesDataIndices || [], p = v.seriesDataIndices || [];
          o = o && d.value === v.value && d.axisType === v.axisType && d.axisId === v.axisId && g.length === p.length, o && A(g, function(m, y) {
            var _ = p[y];
            o = o && m.seriesIndex === _.seriesIndex && m.dataIndex === _.dataIndex;
          }), a && A(d.seriesDataIndices, function(m) {
            var y = m.seriesIndex, _ = i[y], w = a[y];
            _ && w && w.data !== _.data && (o = !1);
          });
        });
      }), this._lastDataByCoordSys = r, this._cbParamsList = i, !!o;
    }, t.prototype._hide = function(r) {
      this._lastDataByCoordSys = null, r({
        type: "hideTip",
        from: this.uid
      });
    }, t.prototype.dispose = function(r, i) {
      V.node || !i.getDom() || (Il(this, "_updatePosition"), this._tooltipContent.dispose(), Vl("itemTooltip", i));
    }, t.type = "tooltip", t;
  })(vr)
);
function rn(e, t, r) {
  var i = t.ecModel, n;
  r ? (n = new vt(r, i, i), n = new vt(t.option, n, i)) : n = t;
  for (var a = e.length - 1; a >= 0; a--) {
    var o = e[a];
    o && (o instanceof vt && (o = o.get("tooltip", !0)), W(o) && (o = {
      formatter: o
    }), o && (n = new vt(o, n, i)));
  }
  return n;
}
function ed(e, t) {
  return e.dispatchAction || lt(t.dispatchAction, t);
}
function q2(e, t, r, i, n, a, o) {
  var s = r.getSize(), l = s[0], u = s[1];
  return a != null && (e + l + a + 2 > i ? e -= l + a : e += a), o != null && (t + u + o > n ? t -= u + o : t += o), [e, t];
}
function Z2(e, t, r, i, n) {
  var a = r.getSize(), o = a[0], s = a[1];
  return e = Math.min(e + o, i) - o, t = Math.min(t + s, n) - s, e = Math.max(e, 0), t = Math.max(t, 0), [e, t];
}
function Q2(e, t, r, i) {
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
function rd(e) {
  return e === "center" || e === "middle";
}
function K2(e, t, r) {
  var i = su(e).queryOptionMap, n = i.keys()[0];
  if (!(!n || n === "series")) {
    var a = Xn(t, n, i.get(n), {
      useDefault: !1,
      enableAll: !1,
      enableNone: !1
    }), o = a.models[0];
    if (o) {
      var s = r.getViewOfComponentModel(o), l;
      if (s.group.traverse(function(u) {
        var c = dt(u).tooltipConfig;
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
function J2(e) {
  Fu(I2), e.registerComponentModel(E2), e.registerComponentView(X2), e.registerAction({
    type: "showTip",
    event: "showTip",
    update: "tooltip:manuallyShowTip"
  }, Wt), e.registerAction({
    type: "hideTip",
    event: "hideTip",
    update: "tooltip:manuallyHideTip"
  }, Wt);
}
var j2 = Object.defineProperty, $2 = Object.getOwnPropertyDescriptor, Vu = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? $2(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (i ? o(t, r, n) : o(n)) || n);
  return i && n && j2(t, r, n), n;
};
Fu([HD, J2, s2]);
let Un = class extends ke {
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
    e && (this.chart = QM(e, void 0, { renderer: "canvas" }), this.resizeObserver = new ResizeObserver(() => this.chart?.resize()), this.resizeObserver.observe(e), this.updateChart());
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
    return I`<div class="chart" role="presentation"></div>`;
  }
};
Un.styles = Vn`
    :host { display: block; width: 100%; height: 100%; min-width: 0; min-height: 0; }
    .chart { width: 100%; height: 100%; min-height: 0; }
  `;
Vu([
  Ge({ attribute: !1 })
], Un.prototype, "items", 2);
Vu([
  Ge()
], Un.prototype, "language", 2);
Un = Vu([
  qr("ploc-cellar-donut-chart")
], Un);
var tk = Object.defineProperty, ek = Object.getOwnPropertyDescriptor, Ze = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? ek(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (i ? o(t, r, n) : o(n)) || n);
  return i && n && tk(t, r, n), n;
};
const id = [
  "#D55E00",
  "#0072B2",
  "#009E73",
  "#E69F00",
  "#CC79A7",
  "#56B4E9",
  "#F0E442",
  "#6A3D9A"
];
let ge = class extends ke {
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
      const n = await Zl(e, r);
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
    if (!e) return At(this.hass?.language ?? "en", "never");
    const t = new Date(e);
    return Number.isNaN(t.getTime()) ? e : new Intl.DateTimeFormat(this.hass?.language ?? void 0, {
      dateStyle: "short",
      timeStyle: "short"
    }).format(t);
  }
  metric(e, t) {
    return I`
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
    const t = (o) => At(this.hass?.language ?? "en", o), r = /* @__PURE__ */ new Map();
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
    const r = (s) => At(this.hass?.language ?? "en", s), i = this.distribution(e), n = i.reduce((s, l) => s + l.bottles, 0), a = i.filter((s) => s.bottles > 0).map((s, l) => ({
      ...s,
      color: s.color ?? id[l % id.length]
    })), o = i.map((s) => `${s.name}: ${this.formatNumber(s.bottles)}`).join(", ");
    return I`
      <section class="group">
        <h3 class="group-title">${r(t)}</h3>
        ${n > 0 ? I`
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
            ${this.config?.show_statistics_legends === !1 ? R : I`
              <div class="legend">
                ${a.map((s) => I`
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
        ` : I`<p class="muted">${r("statistics_empty")}</p>`}
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
    if (!e) return R;
    const t = e === "unlocated" ? "diagnostic_unlocated" : e === "negative" ? "diagnostic_negative" : "diagnostic_surplus", r = e === "unlocated" ? "diagnostic_detail_unlocated" : e === "negative" ? "diagnostic_detail_negative" : "diagnostic_detail_surplus", i = this.getDiagnosticWines(e), n = (o) => At(this.hass?.language ?? "en", o), a = (o) => e === "unlocated" ? o.unlocated_bottles ?? 0 : e === "negative" ? o.negative_movement_bottles ?? 0 : o.physical_surplus_bottles ?? 0;
    return I`
      <ha-dialog .open=${!0} header-title=${n(t)} @closed=${() => {
      this.activeDiagnostic = void 0;
    }}>
        <div class="diagnostic-detail-list">
          <p class="muted">${n(r)}</p>
          ${i.length ? i.map((o) => I`
            <section class="diagnostic-detail-item">
              <h4 class="diagnostic-detail-name">
                ${this.inventory?.wines.some((s) => s.id === o.id) || o.wine ? I`<button class="diagnostic-wine-link" type="button"
                      aria-haspopup="dialog"
                      @click=${() => this.openDiagnosticWine(o)}>${o.name}${o.vintage ? ` · ${o.vintage}` : ""}</button>` : I`${o.name}${o.vintage ? ` · ${o.vintage}` : ""}`}
              </h4>
              <dl class="diagnostic-detail-meta">
                <div><dt>${n("diagnostic_detail_quantity")}</dt><dd>${this.formatNumber(a(o))}</dd></div>
                <div><dt>${n("diagnostic_detail_in_cellar")}</dt><dd>${this.formatNumber(o.bottles_in_cellar)}</dd></div>
                <div><dt>${n("diagnostic_detail_stock")}</dt><dd>${this.formatNumber(o.effective_stock)}</dd></div>
                ${e === "negative" ? I`
                  <div><dt>${n("diagnostic_detail_purchased")}</dt><dd>${this.formatNumber(o.purchased ?? 0)}</dd></div>
                  <div><dt>${n("diagnostic_detail_consumed")}</dt><dd>${this.formatNumber(o.consumed ?? 0)}</dd></div>
                  <div><dt>${n("diagnostic_detail_balance")}</dt><dd>${this.formatNumber(o.movement_balance ?? 0)}</dd></div>
                ` : R}
              </dl>
            </section>
          `) : I`<p class="muted">${n("diagnostic_detail_empty")}</p>`}
        </div>
      </ha-dialog>
    `;
  }
  render() {
    const e = (f) => At(this.hass?.language ?? "en", f), t = this.inventory, r = this.config?.title ?? e("card_title"), i = this.config?.show_occupancy !== !1, n = this.config?.show_diagnostics !== !1, a = this.config?.show_statistics !== !1, o = t ? Math.min(t.total_positions, Math.max(0, t.occupied_positions)) : 0, s = t ? Math.max(0, t.total_positions - o) : 0, l = t && t.total_positions > 0 ? Math.round(o / t.total_positions * 100) : 0, u = t?.stock_reconstruction_complete ? [
      { key: "diagnostic_unlocated", value: t.unlocated_bottles ?? 0 },
      { key: "diagnostic_negative", value: t.negative_movement_bottles ?? 0 },
      { key: "diagnostic_surplus", value: t.physical_surplus_bottles ?? 0 }
    ].filter((f) => f.value > 0) : [], c = !!(t && (!t.stock_reconstruction_complete || u.length > 0 || t.positions_with_unknown_wine > 0)), h = t?.wines ?? [], d = t?.wine_references ?? h.length;
    return I`
      <ha-card>
        <header>
          <h2>${r}</h2>
          <button ?disabled=${this.loading} @click=${() => this.refresh()}>
            ${this.loading ? e("loading") : e("refresh")}
          </button>
        </header>
        ${this.error ? I`<div class="error">${this.error}</div>` : R}
        ${this.config?.config_entry_id ? R : I`<div class="muted">${e("select_config")}</div>`}
        ${t ? I`
          ${t.stale ? I`<div class="warning">${e("stale")}</div>` : R}
          <div class="summary">
            ${this.metric(t.total_bottles, e("bottles_in_cellar"))}
            ${this.metric(
      t.total_stock_bottles ?? e("unknown_value"),
      e("reconstructed_stock")
    )}
            ${this.metric(d, e("stocked_references"))}
            ${this.metric(t.rack_count, e("racks"))}
          </div>
          ${i ? I`
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
          ` : R}
          ${n && c ? I`
            <section class="section">
              <h3 class="section-title">${e("inventory_diagnostics")}</h3>
              ${t.stock_reconstruction_complete ? R : I`<div class="warning">${e("reconstruction_incomplete")}</div>`}
              ${u.length ? I`
                <div class="diagnostics">
                  ${u.map((f) => {
      const v = f.key === "diagnostic_unlocated" ? "unlocated" : f.key === "diagnostic_negative" ? "negative" : "surplus";
      return I`
                      <button class="diagnostic" type="button" aria-haspopup="dialog"
                        @click=${() => {
        this.activeDiagnostic = v;
      }}>
                        <span class="diagnostic-value">${this.formatNumber(f.value)}</span>
                        <span class="label">${e(f.key)}</span>
                        <span class="diagnostic-hint">${e("diagnostic_detail_open")}</span>
                      </button>
                    `;
    })}
                </div>
              ` : R}
              ${t.positions_with_unknown_wine > 0 ? I`<div class="warning">${e("statistics_unknown_wine_positions").replace("{count}", this.formatNumber(t.positions_with_unknown_wine))}</div>` : R}
            </section>
          ` : R}
          ${a ? I`
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
          ` : R}
          <div class="muted section">${e("last_sync")}: ${this.formatSync(t.last_sync)}</div>
          ${this.renderDiagnosticDialog()}
          ${this.selectedWine ? I`
            <ploc-cellar-wine-detail
              .hass=${this.hass}
              .wine=${this.selectedWine}
              @wine-detail-closed=${() => {
      this.selectedWine = void 0;
    }}>
            </ploc-cellar-wine-detail>
          ` : R}
        ` : R}
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
ge.styles = Vn`
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
Ze([
  Ge({ attribute: !1 })
], ge.prototype, "hass", 2);
Ze([
  nt()
], ge.prototype, "config", 2);
Ze([
  nt()
], ge.prototype, "inventory", 2);
Ze([
  nt()
], ge.prototype, "loading", 2);
Ze([
  nt()
], ge.prototype, "error", 2);
Ze([
  nt()
], ge.prototype, "activeDiagnostic", 2);
Ze([
  nt()
], ge.prototype, "selectedWine", 2);
ge = Ze([
  qr("ploc-cellar-card")
], ge);
let nd = class extends ge {
};
nd = Ze([
  qr("ploc-cellar-statistics-card")
], nd);
window.customCards ??= [];
window.customCards.push({
  type: "ploc-cellar-card",
  name: Ci("picker_overview_name"),
  description: Ci("picker_overview_description")
});
export {
  ge as PlocCellarCard,
  nd as PlocCellarStatisticsCard
};
