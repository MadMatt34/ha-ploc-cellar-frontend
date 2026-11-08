// \0rolldown/runtime.js
var e = Object.defineProperty, t = (t, n) => {
	let r = {};
	for (var i in t) e(r, i, {
		get: t[i],
		enumerable: !0
	});
	return n || e(r, Symbol.toStringTag, { value: "Module" }), r;
}, n = globalThis, r = n.ShadowRoot && (n.ShadyCSS === void 0 || n.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, i = Symbol(), a = /* @__PURE__ */ new WeakMap(), o = class {
	constructor(e, t, n) {
		if (this._$cssResult$ = !0, n !== i) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, t = this.t;
		if (r && e === void 0) {
			let n = t !== void 0 && t.length === 1;
			n && (e = a.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && a.set(t, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, s = (e) => new o(typeof e == "string" ? e : e + "", void 0, i), c = (e, ...t) => new o(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, i), l = (e, t) => {
	if (r) e.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let r of t) {
		let t = document.createElement("style"), i = n.litNonce;
		i !== void 0 && t.setAttribute("nonce", i), t.textContent = r.cssText, e.appendChild(t);
	}
}, u = r ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return s(t);
})(e) : e, { is: d, defineProperty: f, getOwnPropertyDescriptor: p, getOwnPropertyNames: m, getOwnPropertySymbols: h, getPrototypeOf: g } = Object, _ = globalThis, v = _.trustedTypes, y = v ? v.emptyScript : "", b = _.reactiveElementPolyfillSupport, x = (e, t) => e, S = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? y : null;
				break;
			case Object:
			case Array: e = e == null ? e : JSON.stringify(e);
		}
		return e;
	},
	fromAttribute(e, t) {
		let n = e;
		switch (t) {
			case Boolean:
				n = e !== null;
				break;
			case Number:
				n = e === null ? null : Number(e);
				break;
			case Object:
			case Array: try {
				n = JSON.parse(e);
			} catch {
				n = null;
			}
		}
		return n;
	}
}, C = (e, t) => !d(e, t), w = {
	attribute: !0,
	type: String,
	converter: S,
	reflect: !1,
	useDefault: !1,
	hasChanged: C
};
Symbol.metadata ??= Symbol("metadata"), _.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var T = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = w) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && f(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = p(this.prototype, e) ?? {
			get() {
				return this[t];
			},
			set(e) {
				this[t] = e;
			}
		};
		return {
			get: r,
			set(t) {
				let a = r?.call(this);
				i?.call(this, t), this.requestUpdate(e, a, n);
			},
			configurable: !0,
			enumerable: !0
		};
	}
	static getPropertyOptions(e) {
		return this.elementProperties.get(e) ?? w;
	}
	static _$Ei() {
		if (this.hasOwnProperty(x("elementProperties"))) return;
		let e = g(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(x("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(x("properties"))) {
			let e = this.properties, t = [...m(e), ...h(e)];
			for (let n of t) this.createProperty(n, e[n]);
		}
		let e = this[Symbol.metadata];
		if (e !== null) {
			let t = litPropertyMetadata.get(e);
			if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
		}
		this._$Eh = /* @__PURE__ */ new Map();
		for (let [e, t] of this.elementProperties) {
			let n = this._$Eu(e, t);
			n !== void 0 && this._$Eh.set(n, e);
		}
		this.elementStyles = this.finalizeStyles(this.styles);
	}
	static finalizeStyles(e) {
		let t = [];
		if (Array.isArray(e)) {
			let n = new Set(e.flat(1 / 0).reverse());
			for (let e of n) t.unshift(u(e));
		} else e !== void 0 && t.push(u(e));
		return t;
	}
	static _$Eu(e, t) {
		let n = t.attribute;
		return !1 === n ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
	}
	constructor() {
		super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
	}
	_$Ev() {
		this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
	}
	addController(e) {
		(this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
	}
	removeController(e) {
		this._$EO?.delete(e);
	}
	_$E_() {
		let e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
		for (let n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
		e.size > 0 && (this._$Ep = e);
	}
	createRenderRoot() {
		let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
		return l(e, this.constructor.elementStyles), e;
	}
	connectedCallback() {
		this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
	}
	enableUpdating(e) {}
	disconnectedCallback() {
		this._$EO?.forEach((e) => e.hostDisconnected?.());
	}
	attributeChangedCallback(e, t, n) {
		this._$AK(e, n);
	}
	_$ET(e, t) {
		let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
		if (r !== void 0 && !0 === n.reflect) {
			let i = (n.converter?.toAttribute === void 0 ? S : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? S : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? C)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
			this.C(e, t, n);
		}
		!1 === this.isUpdatePending && (this._$ES = this._$EP());
	}
	C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
		n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
	}
	async _$EP() {
		this.isUpdatePending = !0;
		try {
			await this._$ES;
		} catch (e) {
			Promise.reject(e);
		}
		let e = this.scheduleUpdate();
		return e != null && await e, !this.isUpdatePending;
	}
	scheduleUpdate() {
		return this.performUpdate();
	}
	performUpdate() {
		if (!this.isUpdatePending) return;
		if (!this.hasUpdated) {
			if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
				for (let [e, t] of this._$Ep) this[e] = t;
				this._$Ep = void 0;
			}
			let e = this.constructor.elementProperties;
			if (e.size > 0) for (let [t, n] of e) {
				let { wrapped: e } = n, r = this[t];
				!0 !== e || this._$AL.has(t) || r === void 0 || this.C(t, void 0, n, r);
			}
		}
		let e = !1, t = this._$AL;
		try {
			e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((e) => e.hostUpdate?.()), this.update(t)) : this._$EM();
		} catch (t) {
			throw e = !1, this._$EM(), t;
		}
		e && this._$AE(t);
	}
	willUpdate(e) {}
	_$AE(e) {
		this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
	shouldUpdate(e) {
		return !0;
	}
	update(e) {
		this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
	}
	updated(e) {}
	firstUpdated(e) {}
};
T.elementStyles = [], T.shadowRootOptions = { mode: "open" }, T[x("elementProperties")] = /* @__PURE__ */ new Map(), T[x("finalized")] = /* @__PURE__ */ new Map(), b?.({ ReactiveElement: T }), (_.reactiveElementVersions ??= []).push("2.1.2");
// node_modules/lit-html/lit-html.js
var E = globalThis, D = (e) => e, O = E.trustedTypes, k = O ? O.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, A = "$lit$", j = `lit$${Math.random().toFixed(9).slice(2)}$`, ee = "?" + j, te = `<${ee}>`, ne = document, re = () => ne.createComment(""), ie = (e) => e === null || typeof e != "object" && typeof e != "function", ae = Array.isArray, oe = (e) => ae(e) || typeof e?.[Symbol.iterator] == "function", se = "[ 	\n\f\r]", ce = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, le = /-->/g, ue = />/g, de = RegExp(`>|${se}(?:([^\\s"'>=/]+)(${se}*=${se}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), fe = /'/g, pe = /"/g, M = /^(?:script|style|textarea|title)$/i, N = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), me = Symbol.for("lit-noChange"), P = Symbol.for("lit-nothing"), he = /* @__PURE__ */ new WeakMap(), ge = ne.createTreeWalker(ne, 129);
function _e(e, t) {
	if (!ae(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return k === void 0 ? t : k.createHTML(t);
}
var ve = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = ce;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === ce ? c[1] === "!--" ? o = le : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = de) : (M.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = de) : o = ue : o === de ? c[0] === ">" ? (o = i ?? ce, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? de : c[3] === "\"" ? pe : fe) : o === pe || o === fe ? o = de : o === le || o === ue ? o = ce : (o = de, i = void 0);
		let d = o === de && e[t + 1].startsWith("/>") ? " " : "";
		a += o === ce ? n + te : l >= 0 ? (r.push(s), n.slice(0, l) + A + n.slice(l) + j + d) : n + j + (l === -2 ? t : d);
	}
	return [_e(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, ye = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = ve(t, n);
		if (this.el = e.createElement(l, r), ge.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = ge.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(A)) {
					let t = u[o++], n = i.getAttribute(e).split(j), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? we : r[1] === "?" ? Te : r[1] === "@" ? Ee : Ce
					}), i.removeAttribute(e);
				} else e.startsWith(j) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (M.test(i.tagName)) {
					let e = i.textContent.split(j), t = e.length - 1;
					if (t > 0) {
						i.textContent = O ? O.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], re()), ge.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], re());
					}
				}
			} else if (i.nodeType === 8) {
				if (i.data === ee) c.push({
					type: 2,
					index: a
				});
				else {
					let e = -1;
					for (; (e = i.data.indexOf(j, e + 1)) !== -1;) c.push({
						type: 7,
						index: a
					}), e += j.length - 1;
				}
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = ne.createElement("template");
		return n.innerHTML = e, n;
	}
};
function be(e, t, n = e, r) {
	if (t === me) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = ie(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = be(e, i._$AS(e, t.values), i, r)), t;
}
var xe = class {
	constructor(e, t) {
		this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
	}
	get parentNode() {
		return this._$AM.parentNode;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	u(e) {
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? ne).importNode(t, !0);
		ge.currentNode = r;
		let i = ge.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new Se(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new De(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = ge.nextNode(), a++);
		}
		return ge.currentNode = ne, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, Se = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = P, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
	}
	get parentNode() {
		let e = this._$AA.parentNode, t = this._$AM;
		return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
	}
	get startNode() {
		return this._$AA;
	}
	get endNode() {
		return this._$AB;
	}
	_$AI(e, t = this) {
		e = be(this, e, t), ie(e) ? e === P || e == null || e === "" ? (this._$AH !== P && this._$AR(), this._$AH = P) : e !== this._$AH && e !== me && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? oe(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== P && ie(this._$AH) ? this._$AA.nextSibling.data = e : this.T(ne.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = ye.createElement(_e(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new xe(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = he.get(e.strings);
		return t === void 0 && he.set(e.strings, t = new ye(e)), t;
	}
	k(t) {
		ae(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(re()), this.O(re()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = D(e).nextSibling;
			D(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, Ce = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = P, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = P;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = be(this, e, t, 0), a = !ie(e) || e !== this._$AH && e !== me, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = be(this, r[n + o], t, o), s === me && (s = this._$AH[o]), a ||= !ie(s) || s !== this._$AH[o], s === P ? e = P : e !== P && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === P ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, we = class extends Ce {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === P ? void 0 : e;
	}
}, Te = class extends Ce {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== P);
	}
}, Ee = class extends Ce {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = be(this, e, t, 0) ?? P) === me) return;
		let n = this._$AH, r = e === P && n !== P || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== P && (n === P || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, De = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		be(this, e);
	}
}, Oe = E.litHtmlPolyfillSupport;
Oe?.(ye, Se), (E.litHtmlVersions ??= []).push("3.3.3");
var ke = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new Se(t.insertBefore(re(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, Ae = globalThis, je = class extends T {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ke(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return me;
	}
};
je._$litElement$ = !0, je.finalized = !0, Ae.litElementHydrateSupport?.({ LitElement: je });
var Me = Ae.litElementPolyfillSupport;
Me?.({ LitElement: je }), (Ae.litElementVersions ??= []).push("4.2.2");
// src/fonts/cormorant-garamond-latin-500-normal.woff2?url
var Ne = "data:font/woff2;base64,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", Pe = "data:font/woff2;base64,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", Fe = "ploc-cellar-wine-typography";
if (typeof document < "u" && !document.getElementById(Fe)) {
	let e = document.createElement("style");
	e.id = Fe, e.textContent = `
    @font-face {
      font-family: "Cormorant Garamond";
      font-style: normal;
      font-weight: 500;
      font-display: swap;
      src: url("${Ne}") format("woff2");
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    @font-face {
      font-family: "Cormorant Garamond";
      font-style: normal;
      font-weight: 500;
      font-display: swap;
      src: url("${Pe}") format("woff2");
      unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }

    :root {
      --ploc-wine-font-family: "Cormorant Garamond", Georgia, serif;
    }
  `, document.head.append(e);
}
// src/fonts/djbgetdigital.woff2?url
var Ie = "data:font/woff2;base64,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", Le = "ploc-cellar-numeric-typography";
if (typeof document < "u" && !document.getElementById(Le)) {
	let e = document.createElement("style");
	e.id = Le, e.textContent = `
    @font-face {
      font-family: "DJB Get Digital";
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url("${Ie}") format("woff2");
    }

    :root {
      --ploc-numeric-font-family: "DJB Get Digital", monospace;
    }
  `, document.head.append(e);
}
// node_modules/@lit/reactive-element/decorators/custom-element.js
var Re = (e) => (t, n) => {
	n === void 0 ? customElements.define(e, t) : n.addInitializer(() => {
		customElements.define(e, t);
	});
}, ze = {
	attribute: !0,
	type: String,
	converter: S,
	reflect: !1,
	hasChanged: C
}, Be = (e = ze, t, n) => {
	let { kind: r, metadata: i } = n, a = globalThis.litPropertyMetadata.get(i);
	if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(n.name, e), r === "accessor") {
		let { name: r } = n;
		return {
			set(n) {
				let i = t.get.call(this);
				t.set.call(this, n), this.requestUpdate(r, i, e, !0, n);
			},
			init(t) {
				return t !== void 0 && this.C(r, void 0, e, t), t;
			}
		};
	}
	if (r === "setter") {
		let { name: r } = n;
		return function(n) {
			let i = this[r];
			t.call(this, n), this.requestUpdate(r, i, e, !0, n);
		};
	}
	throw Error("Unsupported decorator location: " + r);
};
function Ve(e) {
	return (t, n) => typeof n == "object" ? Be(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
// node_modules/@lit/reactive-element/decorators/state.js
function F(e) {
	return Ve({
		...e,
		state: !0,
		attribute: !1
	});
}
var He = {
	card_title: "Ploc Cellar",
	rack_title: "Cellar storage",
	refresh: "Refresh",
	loading: "Loading…",
	never: "Never",
	bottles_in_cellar: "Bottles in cellar",
	reconstructed_stock: "Reconstructed stock",
	racks: "Racks",
	positions: "positions",
	empty_positions: "Empty positions",
	stale: "Data may be stale: the latest synchronization failed.",
	reconstruction_incomplete: "Stock reconstruction is incomplete: only physical quantities are available.",
	last_sync: "Last successful synchronization",
	search_wine: "Search wines",
	search_placeholder: "Search wines…",
	no_matching_wines: "No matching wines.",
	select_config: "Select a Ploc Cellar configuration in the card editor.",
	rack_selection: "Rack selection",
	occupied: "occupied",
	free: "free",
	unknown_wine: "Unknown wine",
	empty_position: "Empty position",
	row: "Row",
	column: "Column",
	no_coordinates: "No row/column coordinates are available for this rack.",
	positions_without_coordinates: "Positions without coordinates",
	not_mapped: "Not mapped",
	no_racks: "No racks available.",
	missing_rack: "position(s) reference a missing rack.",
	inventory_filters: "Filters",
	inventory_title: "Wine inventory",
	filter_color: "All colors",
	filter_region: "All regions",
	filter_appellation: "All appellations",
	filter_meal: "All food pairings",
	filter_vintage: "All vintages",
	filter_unknown: "Unknown",
	sort_by: "Sort by:",
	inventory_results: "{count} wine(s)",
	inventory_bottle_total: "{count} bottle(s)",
	clear_filters: "Clear filters",
	bottles_short: "btl.",
	unknown_vintage: "Unknown vintage",
	wine_details: "Wine details",
	grapes: "Grapes",
	cuvee: "Cuvée",
	bottle_volume: "Volume",
	locations: "Locations",
	picker_overview_name: "Ploc Cellar",
	picker_overview_description: "Cellar overview and stock indicators.",
	picker_inventory_name: "Wine inventory",
	picker_inventory_description: "Search, filter and browse the wine inventory.",
	picker_rack_name: "Cellar racks",
	picker_rack_description: "Visualize rack positions and the wines stored in them.",
	editor_configuration: "Ploc Cellar configuration",
	editor_configuration_helper: "Select the PLOUD connection used by this card.",
	editor_title: "Card title",
	editor_title_helper: "Optional. Leave empty to use the default title.",
	statistics_title: "Cellar statistics",
	statistics_bottles: "Bottles in stock",
	statistics_references: "wine references",
	statistics_color: "By color",
	statistics_region: "By region",
	statistics_appellation: "By appellation",
	statistics_vintage: "By vintage",
	statistics_format: "By bottle format",
	statistics_other: "Other",
	statistics_unknown: "Not specified",
	statistics_empty: "No data available for this category.",
	unknown_value: "Unknown",
	stocked_references: "Wine references in stock",
	rack_occupancy: "Rack occupancy",
	inventory_diagnostics: "Stock diagnostics",
	diagnostic_unlocated: "Unlocated bottles",
	diagnostic_negative: "Negative movement balance",
	diagnostic_surplus: "Physical surplus",
	statistics_distribution_scope: "Breakdowns include known wine references only.",
	statistics_unknown_wine_positions: "{count} occupied position(s) have an unknown wine reference. They are included in total stock but not in the breakdowns.",
	editor_show_occupancy: "Show rack occupancy",
	editor_show_rack_occupancy: "Show rack occupancy bar",
	editor_show_diagnostics: "Show diagnostics",
	editor_show_statistics: "Show statistics",
	editor_show_statistics_legends: "Show chart legends",
	diagnostic_detail_open: "View details",
	diagnostic_detail_unlocated: "Wine references with stock that is not assigned to a physical rack position.",
	diagnostic_detail_negative: "Wine references where recorded outgoing movements exceed incoming movements.",
	diagnostic_detail_surplus: "Wine references with more bottles physically stored than the reconstructed movement stock.",
	diagnostic_detail_quantity: "Bottles concerned",
	diagnostic_detail_in_cellar: "In cellar",
	diagnostic_detail_stock: "Reconstructed stock",
	diagnostic_detail_purchased: "Incoming",
	diagnostic_detail_consumed: "Outgoing",
	diagnostic_detail_balance: "Movement balance",
	diagnostic_detail_empty: "No wine-level details are available for this diagnostic.",
	tooltip_vintage: "Vintage",
	tooltip_domain: "Producer",
	tooltip_appellation: "Appellation",
	tooltip_classification: "Classification",
	tooltip_color: "Wine color",
	tooltip_region: "Region",
	tooltip_country: "Country",
	tooltip_region_country: "Region / country",
	tooltip_grapes: "Grapes",
	tooltip_cuvee: "Cuvée",
	tooltip_format: "Bottle format",
	tooltip_volume: "Volume",
	tooltip_temperature: "Serving temperature",
	editor_rack_picker_mode: "Rack selection display",
	editor_rack_picker_buttons: "Buttons",
	editor_rack_picker_dropdown: "Dropdown list",
	wine_detail_stock: "Stock",
	wine_detail_bottles_in_stock: "bottles in cellar",
	wine_detail_effective_stock_suffix: "{count} in effective stock",
	wine_detail_issue_unlocated: "Unlocated bottles: {count}",
	wine_detail_issue_negative: "Negative balance: {count} bottle(s)",
	wine_detail_issue_surplus: "Physical surplus: {count} bottle(s)",
	wine_detail_physical: "Physically in cellar",
	wine_detail_reconstructed: "Reconstructed stock",
	wine_detail_effective: "Effective stock",
	wine_detail_source_stock: "PLOUD source stock",
	wine_detail_movements: "Stock movements and diagnostics",
	wine_detail_purchased: "Purchased",
	wine_detail_consumed: "Consumed",
	wine_detail_balance: "Movement balance",
	wine_detail_calculated: "Calculated stock",
	wine_detail_unlocated: "Unlocated bottles",
	wine_detail_negative: "Negative movement bottles",
	wine_detail_surplus: "Physical surplus",
	wine_detail_characteristics: "Wine characteristics",
	wine_detail_alcohol: "Alcohol",
	wine_detail_comment: "Notes",
	wine_detail_meals: "Food pairings",
	meal_aperitif: "Aperitif",
	meal_soup: "Soup",
	meal_entry: "Starter",
	meal_pork_butchery: "Pork and charcuterie",
	meal_seafood: "Seafood",
	meal_fish: "Fish",
	meal_white_meat: "White meat",
	meal_game: "Game",
	meal_poultry: "Poultry",
	meal_red_meat: "Red meat",
	meal_dish_vegetable: "Dishes and vegetables",
	meal_cheese: "Cheese",
	meal_dessert: "Dessert",
	meal_spicy: "Spicy dishes",
	wine_detail_no_locations: "No physical location is assigned to this wine.",
	rack_grid_compacted: "Rack positions are shown in a compact layout because their coordinates are too far apart.",
	sort_name_asc: "Name ascending",
	sort_name_desc: "Name descending",
	sort_bottles_asc: "Quantity ascending",
	sort_bottles_desc: "Quantity descending",
	sort_vintage_asc: "Vintage ascending",
	sort_vintage_desc: "Vintage descending",
	wine_detail_origin: "Origin and identification",
	wine_detail_tasting: "Tasting and composition"
}, Ue = {
	card_title: "Cave Ploc",
	rack_title: "Rangement de la cave",
	refresh: "Actualiser",
	loading: "Chargement…",
	never: "Jamais",
	bottles_in_cellar: "Bouteilles en cave",
	reconstructed_stock: "Stock reconstitué",
	racks: "Casiers",
	positions: "places",
	empty_positions: "Places libres",
	stale: "Données potentiellement obsolètes : la dernière synchronisation a échoué.",
	reconstruction_incomplete: "Reconstitution du stock en cours : seules les quantités physiques sont disponibles.",
	last_sync: "Dernière synchronisation réussie",
	search_wine: "Rechercher un vin",
	search_placeholder: "Rechercher un vin…",
	no_matching_wines: "Aucun vin correspondant.",
	select_config: "Sélectionnez une configuration Ploc Cellar dans l’éditeur de carte.",
	rack_selection: "Sélection du casier",
	occupied: "occupées",
	free: "libres",
	unknown_wine: "Vin inconnu",
	empty_position: "Emplacement libre",
	row: "Rangée",
	column: "Colonne",
	no_coordinates: "Aucune coordonnée de rangée/colonne disponible pour ce casier.",
	positions_without_coordinates: "Emplacements sans coordonnées",
	not_mapped: "Non renseigné",
	no_racks: "Aucun casier disponible.",
	missing_rack: "emplacement(s) référencent un casier absent.",
	inventory_filters: "Filtres",
	inventory_title: "Inventaire des vins",
	filter_color: "Toutes les couleurs",
	filter_region: "Toutes les régions",
	filter_appellation: "Toutes les appellations",
	filter_meal: "Tous les mets",
	filter_vintage: "Tous les millésimes",
	filter_unknown: "Inconnu",
	sort_by: "Trier par :",
	inventory_results: "{count} référence(s)",
	inventory_bottle_total: "{count} bouteille(s)",
	clear_filters: "Effacer les filtres",
	bottles_short: "bt.",
	unknown_vintage: "Millésime inconnu",
	wine_details: "Détails du vin",
	grapes: "Cépages",
	cuvee: "Cuvée",
	bottle_volume: "Volume",
	locations: "Emplacements",
	picker_overview_name: "Cave Ploc",
	picker_overview_description: "Vue d’ensemble de la cave et indicateurs de stock.",
	picker_inventory_name: "Inventaire des vins",
	picker_inventory_description: "Rechercher, filtrer et parcourir l’inventaire des vins.",
	picker_rack_name: "Casiers de la cave",
	picker_rack_description: "Visualiser les emplacements des casiers et les vins qui y sont rangés.",
	editor_configuration: "Configuration Ploc Cellar",
	editor_configuration_helper: "Sélectionnez la connexion PLOUD utilisée par cette carte.",
	editor_title: "Titre de la carte",
	editor_title_helper: "Facultatif. Laissez vide pour utiliser le titre par défaut.",
	statistics_title: "Statistiques de la cave",
	statistics_bottles: "Bouteilles en stock",
	statistics_references: "références de vin",
	statistics_color: "Par couleur",
	statistics_region: "Par région",
	statistics_appellation: "Par appellation",
	statistics_vintage: "Par millésime",
	statistics_format: "Par format de bouteille",
	statistics_other: "Autres",
	statistics_unknown: "Non renseigné",
	statistics_empty: "Aucune donnée disponible pour cette catégorie.",
	unknown_value: "Inconnu",
	stocked_references: "Références de vins en stock",
	rack_occupancy: "Occupation des casiers",
	inventory_diagnostics: "Diagnostics du stock",
	diagnostic_unlocated: "Bouteilles non localisées",
	diagnostic_negative: "Solde de mouvements négatif",
	diagnostic_surplus: "Excédent physique",
	statistics_distribution_scope: "Les répartitions ne portent que sur les références de vins connues.",
	statistics_unknown_wine_positions: "{count} emplacement(s) occupé(s) font référence à un vin inconnu. Ils sont inclus dans le stock total, mais pas dans les répartitions.",
	editor_show_occupancy: "Afficher l’occupation des casiers",
	editor_show_rack_occupancy: "Afficher la barre d’occupation du casier",
	editor_show_diagnostics: "Afficher les diagnostics",
	editor_show_statistics: "Afficher les statistiques",
	editor_show_statistics_legends: "Afficher les légendes des graphiques",
	diagnostic_detail_open: "Voir le détail",
	diagnostic_detail_unlocated: "Références de vins dont une partie du stock n’est affectée à aucun emplacement physique de casier.",
	diagnostic_detail_negative: "Références de vins pour lesquelles les sorties enregistrées dépassent les entrées.",
	diagnostic_detail_surplus: "Références de vins ayant davantage de bouteilles physiquement rangées que le stock reconstitué à partir des mouvements.",
	diagnostic_detail_quantity: "Bouteilles concernées",
	diagnostic_detail_in_cellar: "En cave",
	diagnostic_detail_stock: "Stock reconstitué",
	diagnostic_detail_purchased: "Entrées",
	diagnostic_detail_consumed: "Sorties",
	diagnostic_detail_balance: "Solde des mouvements",
	diagnostic_detail_empty: "Aucun détail par référence de vin n’est disponible pour ce diagnostic.",
	tooltip_vintage: "Millésime",
	tooltip_domain: "Domaine",
	tooltip_appellation: "Appellation",
	tooltip_classification: "Classement",
	tooltip_color: "Couleur du vin",
	tooltip_region: "Région",
	tooltip_country: "Pays",
	tooltip_region_country: "Région / pays",
	tooltip_grapes: "Cépages",
	tooltip_cuvee: "Cuvée",
	tooltip_format: "Format de bouteille",
	tooltip_volume: "Volume",
	tooltip_temperature: "Température de service",
	editor_rack_picker_mode: "Affichage du choix de la cave",
	editor_rack_picker_buttons: "Boutons",
	editor_rack_picker_dropdown: "Liste déroulante",
	wine_detail_stock: "Stock",
	wine_detail_bottles_in_stock: "bouteilles en cave",
	wine_detail_effective_stock_suffix: "{count} en stock effectif",
	wine_detail_issue_unlocated: "Bouteilles non localisées : {count}",
	wine_detail_issue_negative: "Solde négatif : {count} bouteille(s)",
	wine_detail_issue_surplus: "Excédent physique : {count} bouteille(s)",
	wine_detail_physical: "En cave physiquement",
	wine_detail_reconstructed: "Stock reconstitué",
	wine_detail_effective: "Stock effectif",
	wine_detail_source_stock: "Stock source PLOUD",
	wine_detail_movements: "Mouvements et diagnostics du stock",
	wine_detail_purchased: "Achats",
	wine_detail_consumed: "Consommations",
	wine_detail_balance: "Solde des mouvements",
	wine_detail_calculated: "Stock calculé",
	wine_detail_unlocated: "Bouteilles non localisées",
	wine_detail_negative: "Bouteilles au solde négatif",
	wine_detail_surplus: "Excédent physique",
	wine_detail_characteristics: "Caractéristiques du vin",
	wine_detail_alcohol: "Degré d’alcool",
	wine_detail_comment: "Notes",
	wine_detail_meals: "Accords mets et vins",
	meal_aperitif: "Apéritif",
	meal_soup: "Soupe",
	meal_entry: "Entrée",
	meal_pork_butchery: "Charcuterie et porc",
	meal_seafood: "Fruits de mer",
	meal_fish: "Poissons",
	meal_white_meat: "Viandes blanches",
	meal_game: "Gibier",
	meal_poultry: "Volailles",
	meal_red_meat: "Viandes rouges",
	meal_dish_vegetable: "Plats et légumes",
	meal_cheese: "Fromages",
	meal_dessert: "Desserts",
	meal_spicy: "Épicés",
	wine_detail_no_locations: "Aucun emplacement physique n’est affecté à ce vin.",
	rack_grid_compacted: "La disposition des emplacements est condensée car les coordonnées sont trop espacées.",
	sort_name_asc: "Nom ascendant",
	sort_name_desc: "Nom descendant",
	sort_bottles_asc: "Quantité ascendante",
	sort_bottles_desc: "Quantité descendante",
	sort_vintage_asc: "Millésime ascendant",
	sort_vintage_desc: "Millésime descendant",
	wine_detail_origin: "Origine et identification",
	wine_detail_tasting: "Dégustation et composition"
};
// src/translations.ts
function We(e, t) {
	return (e.toLocaleLowerCase().startsWith("fr") ? Ue : He)[t];
}
function Ge(e) {
	return We(typeof navigator > "u" ? "en" : navigator.language, e);
}
// src/inventory-client.ts
var Ke = /* @__PURE__ */ new WeakMap();
function qe(e, t) {
	let n = Ke.get(e);
	n || (n = /* @__PURE__ */ new Map(), Ke.set(e, n));
	let r = n.get(t);
	if (r) return r;
	let i = e.callWS({
		type: "call_service",
		domain: "ploc_cellar",
		service: "get_inventory",
		service_data: { config_entry_id: t },
		return_response: !0
	}).then((e) => e.response), a;
	return a = i.finally(() => {
		n?.get(t) === a && (n.delete(t), n.size === 0 && Ke.delete(e));
	}), n.set(t, a), a;
}
// src/wine-image.ts
var Je = class {
	constructor(e = (e) => URL.createObjectURL(e), t = (e) => URL.revokeObjectURL(e)) {
		this.createObjectUrl = e, this.revokeObjectUrl = t, this.objectUrl = null, this.loadedPath = null, this.pendingPath = null, this.attemptedPath = null, this.request = 0;
	}
	async load(e, t, n) {
		if (e === this.loadedPath && (this.objectUrl !== null || this.pendingPath === e || this.attemptedPath === e)) return;
		let r = ++this.request;
		if (this.revokeCurrent(), n(null), this.loadedPath = e, this.pendingPath = e, this.attemptedPath = null, !e) this.pendingPath = null;
		else if (!t) this.loadedPath = null, this.pendingPath = null;
		else {
			this.attemptedPath = e;
			try {
				let i = await t(e);
				if (!i.ok) return;
				let a = await i.blob();
				if (r !== this.request) return;
				let o = this.createObjectUrl(a);
				this.objectUrl = o, n(o);
			} catch {} finally {
				r === this.request && (this.pendingPath = null);
			}
		}
	}
	dispose(e) {
		this.request += 1, this.loadedPath = null, this.pendingPath = null, this.attemptedPath = null, this.revokeCurrent(), e?.(null);
	}
	revokeCurrent() {
		this.objectUrl !== null && (this.revokeObjectUrl(this.objectUrl), this.objectUrl = null);
	}
}, Ye = [
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
	[4096, "meal_dessert"],
	[8192, "meal_spicy"]
], Xe = {
	meal_aperitif: "mdi:glass-cocktail",
	meal_soup: "mdi:soup",
	meal_entry: "mdi:food-apple",
	meal_pork_butchery: "mdi:pig",
	meal_seafood: "mdi:waves",
	meal_fish: "mdi:fish",
	meal_white_meat: "mdi:food-drumstick",
	meal_game: "mdi:cow",
	meal_poultry: "mdi:turkey",
	meal_red_meat: "mdi:food-steak",
	meal_dish_vegetable: "mdi:carrot",
	meal_cheese: "mdi:cheese",
	meal_dessert: "mdi:cupcake",
	meal_spicy: "mdi:chili-hot"
};
function Ze(e) {
	return Xe[e];
}
function Qe(e) {
	return e == null || !Number.isSafeInteger(e) || e < 0 ? [] : Ye.filter(([t]) => Math.floor(e / t) % 2 == 1).map(([, e]) => e);
}
// src/grape-composition.ts
function $e(e) {
	return e.split(/(?<!\d),(?!\d)|[;\n]+/).map((e) => e.trim()).filter(Boolean).map((e) => {
		let t = /^(\d+(?:[.,]\d+)?)\s*%\s*(.+)$/.exec(e), n = /^(.*?)\s*(?:\(\s*)?(\d+(?:[.,]\d+)?)\s*%\s*\)?$/.exec(e), r = t ?? n;
		if (!r) return {
			name: e,
			percentage: /%/.test(e) ? null : 100
		};
		let i = (t ? r[2] : r[1]).trim().replace(/^[:\-–—]+|[:\-–—]+$/g, "").trim(), a = Number((t ? r[1] : r[2]).replace(",", "."));
		return !i || !Number.isFinite(a) || a < 0 || a > 100 ? {
			name: e,
			percentage: null
		} : {
			name: i,
			percentage: a
		};
	});
}
// src/wine-locations.ts
function et(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = t.get(n.rack_id);
		e || (e = {
			rack: n.rack,
			rackId: n.rack_id,
			coordinates: []
		}, t.set(n.rack_id, e)), e.coordinates.push({
			row: n.row,
			column: n.column
		});
	}
	return [...t.values()];
}
function tt(e) {
	return e.filter(({ row: e, column: t }) => e === null || t === null);
}
function nt(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		if (n.row === null || n.column === null) continue;
		let e = t.get(n.row) ?? [];
		e.push(n.column), t.set(n.row, e);
	}
	return [...t].map(([e, t]) => ({
		row: e,
		columns: t
	}));
}
// \0@oxc-project+runtime@0.156.0/helpers/esm/decorate.js
function I(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
// src/ploc-cellar-wine-detail.ts
var rt = class extends je {
	constructor(...e) {
		super(...e), this.imageUrl = null, this.imageLoader = new Je();
	}
	static {
		this.styles = c`
    :host {
      color: var(--primary-text-color);
      --mdc-dialog-min-width: min(560px, calc(100vw - 32px));
      --mdc-dialog-max-width: min(760px, calc(100vw - 32px));
    }
    :host { --ploc-wine-font-family: "Cormorant Garamond", Georgia, serif; }
    .content { display: grid; gap: 10px; min-width: 0; }
    .detail-section { min-width: 0; border: 1px solid var(--divider-color); border-radius: 12px; overflow: hidden; background: var(--card-background-color, var(--ha-card-background)); }
    .section-summary { display: flex; align-items: center; gap: 10px; min-height: 40px; padding: 4px 14px; cursor: pointer; list-style: none; font-size: 1rem; font-weight: 600; }
    .section-summary::-webkit-details-marker { display: none; }
    .section-summary::after { content: ""; width: 8px; height: 8px; margin-left: auto; border-right: 2px solid var(--secondary-text-color); border-bottom: 2px solid var(--secondary-text-color); transform: rotate(45deg); transition: transform .16s ease; }
    details[open] > .section-summary::after { transform: rotate(225deg); }
    .section-summary ha-icon { color: var(--secondary-text-color); }
    .section-body { padding: 0 14px 14px; min-width: 0; }
    .section-subtitle { margin: 12px 0 5px; color: var(--secondary-text-color); font-size: .78rem; font-weight: 700; letter-spacing: .10em; text-transform: uppercase; }
    .section-subtitle:first-child { margin-top: 2px; }
    .nested-details { margin-top: 14px; border-top: 1px solid var(--divider-color); }
    .nested-details > .section-summary { min-height: 42px; padding: 9px 0; font-size: .88rem; }
    .nested-details > .section-body { padding: 0 0 4px; }
    .wine-dialog-title { font-family: var(--ploc-wine-font-family); font-size: 1.4rem; font-weight: 600; line-height: 1.2; white-space: normal; }
    .wine-hero { display: grid; grid-template-columns: 8px minmax(0, 1fr); align-items: stretch; gap: 14px; min-width: 0; }
    .wine-hero-banner { width: 8px; min-height: 120px; border-radius: 999px; }
    .wine-hero-main { display: grid; grid-template-columns: minmax(0, 1fr) minmax(100px, 32%); align-items: center; gap: 14px; min-width: 0; }
    .wine-image-container { display: flex; justify-content: flex-end; align-items: center; min-width: 0; max-height: 160px; overflow: hidden; padding-right: 10px; border-radius: 20px; }
    .wine-image { display: block; max-width: 100%; max-height: 160px; object-fit: contain; border-radius: 10px; }
    .identity { min-width: 0; }
    .identity-text { min-width: 0; }
    .subtitle { margin-top: 4px; color: var(--secondary-text-color); line-height: 1.45; }
    .tags { display: flex; flex-wrap: wrap; gap: 6px; }
    .wine-vintage { margin: 5px 20px; font-family: var(--ploc-wine-font-family); font-size: 2.5rem; font-weight: 600; line-height: 1.2; }
    .wine-stock-line { display: flex; align-items: center; gap: 6px; margin-top: 7px; color: var(--secondary-text-color); font-size: 1rem; }
    .wine-stock-line ha-icon { --mdc-icon-size: 30px; flex: 0 0 auto; }
    .wine-stock-count { font-family: var(--ploc-numeric-font-family); font-size: 1.4rem; font-variant-numeric: tabular-nums; color: var(--primary-text-color); }
    .tag {
      padding: 4px 9px;
      border-radius: 999px;
      background: var(--secondary-background-color);
      font-size: .82rem;
    }
    .meal-tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(125px, 1fr)); gap: 8px; }
    .meal-tile { display: flex; align-items: center; gap: 9px; min-width: 0; padding: 11px 12px; border: 1px solid var(--divider-color); border-radius: 10px; background: var(--secondary-background-color); }
    .meal-tile ha-icon { flex: 0 0 auto; }
    .meal-tile span { min-width: 0; overflow-wrap: anywhere; font-size: 1rem; }
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
    .characteristics { display: grid; gap: 0; }
    .characteristic { display: grid; grid-template-columns: 28px minmax(0, 1fr); align-items: center; gap: 12px; min-width: 0; padding: 10px 2px; border-bottom: 1px solid var(--divider-color); }
    .characteristic:last-child { border-bottom: 0; }
    .characteristic ha-icon { --mdc-icon-size: 21px; color: var(--secondary-text-color); }
    .characteristic-copy { display: grid; grid-template-columns: minmax(100px, .8fr) minmax(0, 1.4fr); align-items: baseline; gap: 12px; min-width: 0; }
    .characteristic-label { color: var(--secondary-text-color); font-size: .9rem; }
    .characteristic-value { min-width: 0; overflow-wrap: anywhere; line-height: 1.4; }
    .grapes-list { display: grid; gap: 2px; }
    .grape-row { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(90px, 1fr); align-items: center; gap: 16px; padding: 0 0 7px 0; }
    .grape-name { min-width: 0; overflow-wrap: anywhere; }
    .grape-composition { display: flex; align-items: center; gap: 10px; min-width: 0; }
    .grape-percentage { flex: 0 0 42px; text-align: right; font-variant-numeric: tabular-nums; }
    .grape-track { display: block; flex: 1 1 0; width: 100%; min-width: 0; height: 7px; overflow: hidden; border-radius: 999px; background: var(--divider-color); }
    .grape-fill { height: 100%; background: var(--wine-accent, var(--secondary-text-color)); }
    .grape-row:not(.has-percentage) { grid-template-columns: minmax(0, 1fr); }
    .grape-row:not(.has-percentage) .grape-composition { display: none; }
    .stock-details.has-inventory-issues { border-color: var(--error-color, #db4437); }
    .stock-issues { display: flex; align-items: flex-start; gap: 8px; margin: 0 0 12px; color: var(--error-color, #db4437); font-size: .88rem; line-height: 1.4; }
    .stock-issues ha-icon { --mdc-icon-size: 19px; flex: 0 0 auto; }
    .stock { display: grid; grid-template-columns: repeat(auto-fit, minmax(125px, 1fr)); gap: 8px; }
    .stock-item {
      min-width: 0;
      padding: 10px 12px;
      border-radius: 9px;
      background: var(--secondary-background-color);
    }
    .stock-value { display: block; font-family: var(--ploc-numeric-font-family); font-size: 1.4rem; font-weight: 400; font-variant-numeric: tabular-nums; }
    .stock-details .characteristic-value { font-family: var(--ploc-numeric-font-family); font-variant-numeric: tabular-nums; }
    .stock-label { display: block; margin-top: 3px; color: var(--secondary-text-color); font-size: .8rem; }
    .locations { display: grid; gap: 9px; }
    .location { padding: 10px 12px; border: 1px solid var(--divider-color); border-radius: 9px; background: var(--secondary-background-color); }
    .location-name { display: block; }
    .location-coordinates { display: grid; gap: 6px; margin-top: 8px; }
    .location-coordinate-row { display: flex; flex-wrap: wrap; gap: 6px; }
    .location-coordinate { display: inline-flex; align-items: center; gap: 5px; width: fit-content; max-width: 100%; padding: 4px 9px; border-radius: 999px; background: var(--primary-background-color); color: var(--primary-text-color); font-size: .82rem; line-height: 1.4; }
    .location-coordinate.incomplete { border: 1px dashed var(--divider-color); color: var(--secondary-text-color); }
    .location-coordinate.selected { background: var(--primary-color); color: var(--text-primary-color, white); box-shadow: 0 0 0 2px var(--primary-color); font-weight: 600; }
    .location-coordinate.selected ha-icon { --mdc-icon-size: 16px; color: inherit; }
    .muted { color: var(--secondary-text-color); font-size: .88rem; }
    .comment { white-space: pre-wrap; overflow-wrap: anywhere; line-height: 1.5; }
    @media (max-width: 560px) {
      .content { gap: 11px; }
      .characteristic-copy { grid-template-columns: minmax(0, 1fr); gap: 2px; }
      .characteristic { padding: 10px 2px; }
      .wine-hero { gap: 9px; }
      .wine-hero-main { grid-template-columns: minmax(0, 1fr) minmax(88px, 34%); gap: 9px; }
      .wine-image-container, .wine-image { max-height: 145px; }
    }
    @media (max-width: 480px) {
      .content { gap: 16px; }
      dl { grid-template-columns: minmax(0, 1fr); }
    }
  `;
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
		let e = this.hass;
		await this.imageLoader.load(this.wine?.image_url ?? null, e ? (t) => e.fetchWithAuth(t) : void 0, (e) => {
			this.imageUrl = e;
		});
	}
	get language() {
		return this.hass?.language ?? "en";
	}
	t(e) {
		return We(this.language, e);
	}
	formatNumber(e) {
		return new Intl.NumberFormat(this.language, { maximumFractionDigits: 2 }).format(e);
	}
	characteristic(e, t, n) {
		return n == null || n === "" ? P : N`
      <div class="characteristic">
        <ha-icon icon=${e} aria-hidden="true"></ha-icon>
        <div class="characteristic-copy">
          <span class="characteristic-label">${this.t(t)}</span>
          <span class="characteristic-value">${n}</span>
        </div>
      </div>
    `;
	}
	get grapeAccentStyle() {
		let e = this.wine?.color_rgb;
		return !e || e.length !== 3 || !e.every((e) => Number.isInteger(e) && e >= 0 && e <= 255) ? "" : `--wine-accent: rgb(${e[0]} ${e[1]} ${e[2]});`;
	}
	renderGrapes(e) {
		if (!e?.trim()) return P;
		let t = $e(e);
		return t.length ? N`
      <div class="characteristic">
        <ha-icon icon="mdi:grape" aria-hidden="true"></ha-icon>
        <div class="characteristic-value">
          <div class="grapes-list" style=${this.grapeAccentStyle}>
            ${t.map((e) => N`
              <div class="grape-row ${e.percentage === null ? "" : "has-percentage"}">
                <span class="grape-name">${e.name}</span>
                <div class="grape-composition">
                  <span class="grape-percentage">${e.percentage === null ? "" : `${this.formatNumber(e.percentage)}%`}</span>
                  <div class="grape-track" role="img" aria-label=${e.percentage === null ? "" : `${this.formatNumber(e.percentage)}%`}>
                    <div class="grape-fill" style=${e.percentage === null ? "" : `width: ${e.percentage}%`}></div>
                  </div>
                </div>
              </div>
            `)}
          </div>
        </div>
      </div>
    ` : P;
	}
	stockItem(e, t) {
		return t == null ? P : N`
      <div class="stock-item">
        <span class="stock-value">${this.formatNumber(t)}</span>
        <span class="stock-label">${this.t(e)}</span>
      </div>
    `;
	}
	get bottleColorStyle() {
		let e = this.wine?.color_rgb;
		return !e || e.length !== 3 || !e.every((e) => Number.isInteger(e) && e >= 0 && e <= 255) ? "color: var(--secondary-text-color);" : `color: rgb(${e[0]} ${e[1]} ${e[2]});`;
	}
	get colorStyle() {
		let e = this.wine?.color_rgb;
		return !e || e.length !== 3 || !e.every((e) => Number.isInteger(e) && e >= 0 && e <= 255) ? "background: var(--secondary-text-color);" : `background: rgb(${e[0]} ${e[1]} ${e[2]});`;
	}
	renderIdentity(e) {
		let t = [e.color, e.bottle_format].filter((e) => !!e);
		return N`
      <div class="identity">
        <div class="identity-text">
          ${e.vintage === null ? P : N`<div class="wine-vintage">${e.vintage}</div>`}
          <div class="wine-stock-line">
            <ha-icon icon="mdi:bottle-wine" style=${this.bottleColorStyle} aria-hidden="true"></ha-icon>
            <span class="wine-stock-count">${this.formatNumber(e.bottles_in_cellar)}</span>
            <span>${this.t("wine_detail_bottles_in_stock")}</span>
            ${e.bottles_in_cellar === 0 && e.effective_stock !== null ? N`<span>(${this.t("wine_detail_effective_stock_suffix").replace("{count}", this.formatNumber(e.effective_stock))})</span>` : P}
          </div>
          ${t.length ? N`<div class="tags">${t.map((e) => N`<span class="tag">${e}</span>`)}</div>` : P}
        </div>
      </div>
    `;
	}
	renderStock(e) {
		let t = [
			{
				key: "wine_detail_issue_unlocated",
				count: e.unlocated_bottles ?? 0
			},
			{
				key: "wine_detail_issue_negative",
				count: e.negative_movement_bottles ?? 0
			},
			{
				key: "wine_detail_issue_surplus",
				count: e.physical_surplus_bottles ?? 0
			}
		].filter((e) => e.count > 0), n = t.length > 0, r = e.purchased !== null || e.consumed !== null || e.movement_balance !== null || e.calculated_stock !== null || e.negative_movement_bottles !== null || e.physical_surplus_bottles !== null || e.unlocated_bottles !== null;
		return N`
      <details class="detail-section stock-details ${n ? "has-inventory-issues" : ""}">
        <summary class="section-summary"><ha-icon icon="mdi:chart-box-outline" aria-hidden="true"></ha-icon>${this.t("wine_detail_stock")}</summary>
        <div class="section-body">
        ${n ? N`
          <div class="stock-issues" role="alert">
            <ha-icon icon="mdi:alert-circle" aria-hidden="true"></ha-icon>
            <span>${t.map((e) => this.t(e.key).replace("{count}", this.formatNumber(e.count))).join(" · ")}</span>
          </div>
        ` : P}
        <div class="stock">
          ${this.stockItem("wine_detail_physical", e.bottles_in_cellar)}
          ${this.stockItem("wine_detail_reconstructed", e.bottles)}
          ${this.stockItem("wine_detail_effective", e.effective_stock)}
        </div>
        ${r ? N`
          <div class="section-subtitle"><ha-icon icon="mdi:swap-horizontal" aria-hidden="true"></ha-icon>${this.t("wine_detail_movements")}</div>
          <div class="section-body"><dl>
          ${this.characteristic("mdi:cart-arrow-down", "wine_detail_purchased", e.purchased)}
          ${this.characteristic("mdi:cart-arrow-up", "wine_detail_consumed", e.consumed)}
          ${this.characteristic("mdi:swap-horizontal", "wine_detail_balance", e.movement_balance)}
          ${this.characteristic("mdi:calculator-variant", "wine_detail_calculated", e.calculated_stock)}
          ${this.characteristic("mdi:alert-circle-outline", "wine_detail_negative", e.negative_movement_bottles)}
          ${this.characteristic("mdi:plus-circle-outline", "wine_detail_surplus", e.physical_surplus_bottles)}
          ${this.characteristic("mdi:map-marker-question-outline", "wine_detail_unlocated", e.unlocated_bottles)}
          </dl></div>
        ` : P}
        </div>
      </details>
    `;
	}
	renderMeals(e) {
		let t = Qe(e.meals);
		return t.length ? N`
      <details class="detail-section" open>
        <summary class="section-summary"><ha-icon icon="mdi:food-apple-outline" aria-hidden="true"></ha-icon>${this.t("wine_detail_meals")}</summary>
        <div class="section-body"><div class="meal-tiles">
          ${t.map((e) => N`<div class="meal-tile"><ha-icon icon=${Ze(e)} aria-hidden="true"></ha-icon><span>${this.t(e)}</span></div>`)}
        </div></div>
      </details>
    ` : P;
	}
	isSelectedLocation(e, t, n) {
		let r = this.selectedLocation;
		return r !== void 0 && r.rackId === e && r.row === t && r.column === n;
	}
	renderLocations(e) {
		return e.locations.length ? N`
      <div class="locations">
        ${et(e.locations).map((e) => N`
          <div class="location">
            <strong class="location-name">${e.rack}</strong>
            ${e.coordinates.length ? N`
                <div class="location-coordinates">
                  ${nt(e.coordinates).map(({ row: t, columns: n }) => N`
                    <div class="location-coordinate-row">
                      ${n.map((n) => {
			let r = this.isSelectedLocation(e.rackId, t, n);
			return N`<span class="location-coordinate ${r ? "selected" : ""}">
                              ${r ? N`<ha-icon icon="mdi:target" aria-hidden="true"></ha-icon>` : P}
                              ${this.t("row")} ${t + 1}, ${this.t("column")} ${n + 1}
                            </span>`;
		})}
                    </div>
                  `)}
                  ${tt(e.coordinates).map(({ row: e, column: t }) => N`
                    <div class="location-coordinate-row">
                      <span class="location-coordinate incomplete">
                        ${this.t("row")} ${e === null ? "—" : e + 1}, ${this.t("column")} ${t === null ? "—" : t + 1}
                      </span>
                    </div>
                  `)}
                </div>
              ` : P}
          </div>
        `)}
      </div>
    ` : N`<p class="muted">${this.t("wine_detail_no_locations")}</p>`;
	}
	onDialogClosed() {
		this.dispatchEvent(new CustomEvent("wine-detail-closed", {
			bubbles: !0,
			composed: !0
		}));
	}
	render() {
		let e = this.wine;
		if (!e) return P;
		let t = e.service_temperature_min !== null || e.service_temperature_max !== null ? `${e.service_temperature_min === null ? "—" : this.formatNumber(e.service_temperature_min)}–${e.service_temperature_max === null ? "—" : this.formatNumber(e.service_temperature_max)} °C` : null;
		return N`
      <ha-dialog .open=${!0} .accessibleLabel=${e.name} @closed=${() => this.onDialogClosed()}>
        <span slot="headerTitle" class="wine-dialog-title">${e.name}</span>
        <div class="content">
          <div class="wine-hero">
            <div class="wine-hero-banner" style=${this.colorStyle} aria-hidden="true"></div>
            <div class="wine-hero-main">
              ${this.renderIdentity(e)}
              ${this.imageUrl ? N`
                <div class="wine-image-container">
                  <img class="wine-image" src=${this.imageUrl} alt=${e.name} />
                </div>
              ` : P}
            </div>
          </div>
          <details class="detail-section" open>
            <summary class="section-summary"><ha-icon icon="mdi:clipboard-list-outline" aria-hidden="true"></ha-icon>${this.t("wine_detail_characteristics")}</summary>
            <div class="section-body">
            <div class="section-subtitle">${this.t("wine_detail_origin")}</div>
            <div class="characteristics">
              ${this.characteristic("mdi:medal-outline", "tooltip_classification", e.classification)}
              ${this.characteristic("mdi:account-outline", "tooltip_domain", e.domain)}
              ${this.characteristic("mdi:map-marker-radius", "tooltip_appellation", e.appellation)}
              ${this.characteristic("mdi:map-outline", "tooltip_region", e.region)}
              ${this.characteristic("mdi:earth", "tooltip_country", e.country)}
            </div>
            <div class="section-subtitle">${this.t("wine_detail_tasting")}</div>
            <div class="characteristics">
              ${this.characteristic("mdi:palette-outline", "tooltip_color", e.color)}
              ${this.renderGrapes(e.grapes)}
              ${this.characteristic("mdi:tag-outline", "tooltip_cuvee", e.cuvee)}
              ${this.characteristic("mdi:bottle-wine-outline", "tooltip_format", e.bottle_format ? `${e.bottle_format}${e.bottle_volume_l === null ? "" : ` (${this.formatNumber(e.bottle_volume_l)} L)`}` : null)}
              ${this.characteristic("mdi:percent-outline", "wine_detail_alcohol", e.alcohol_percent === null ? null : `${this.formatNumber(e.alcohol_percent)} %`)}
              ${this.characteristic("mdi:thermometer", "tooltip_temperature", t)}
            </div>
            </div>
          </details>
          ${this.renderMeals(e)}
          ${e.comment ? N`
            <details class="detail-section">
              <summary class="section-summary"><ha-icon icon="mdi:note-text-outline" aria-hidden="true"></ha-icon>${this.t("wine_detail_comment")}</summary>
              <div class="section-body"><div class="comment">${e.comment}</div></div>
            </details>
          ` : P}
          <details class="detail-section" open>
            <summary class="section-summary"><ha-icon icon="mdi:map-marker-multiple-outline" aria-hidden="true"></ha-icon>${this.t("locations")}</summary>
            <div class="section-body">${this.renderLocations(e)}</div>
          </details>
          ${this.renderStock(e)}
        </div>
      </ha-dialog>
    `;
	}
};
I([Ve({ attribute: !1 })], rt.prototype, "hass", void 0), I([Ve({ attribute: !1 })], rt.prototype, "wine", void 0), I([Ve({ attribute: !1 })], rt.prototype, "selectedLocation", void 0), I([F()], rt.prototype, "imageUrl", void 0), rt = I([Re("ploc-cellar-wine-detail")], rt);
var it = 4;
function at(e) {
	if (e.length === 0) return {
		compact: !1,
		rowCount: 0,
		columnCount: 0,
		positions: [],
		missingCoordinates: []
	};
	let t = Infinity, n = -Infinity, r = Infinity, i = -Infinity;
	for (let a of e) t = Math.min(t, a.row), n = Math.max(n, a.row), r = Math.min(r, a.column), i = Math.max(i, a.column);
	let a = n - t + 1, o = i - r + 1;
	if (Number.isSafeInteger(a) && Number.isSafeInteger(o) && a > 0 && o > 0 && a <= 400 / o) {
		let s = new Set(e.map((e) => `${e.row}:${e.column}`)), c = [];
		for (let e = t; e <= n; e += 1) for (let t = r; t <= i; t += 1) s.has(`${e}:${t}`) || c.push({
			row: e,
			column: t
		});
		return {
			compact: !1,
			rowCount: a,
			columnCount: o,
			positions: e.map((e) => ({
				id: e.id,
				row: e.row - t + 1,
				column: e.column - r + 1
			})),
			missingCoordinates: c.map((e) => ({
				row: e.row - t + 1,
				column: e.column - r + 1
			}))
		};
	}
	let s = Math.min(it, Math.max(1, Math.ceil(Math.sqrt(e.length)))), c = [...e].sort((e, t) => e.row - t.row || e.column - t.column || e.id.localeCompare(t.id));
	return {
		compact: !0,
		rowCount: Math.ceil(c.length / s),
		columnCount: s,
		positions: c.map((e, t) => ({
			id: e.id,
			row: Math.floor(t / s) + 1,
			column: t % s + 1
		})),
		missingCoordinates: []
	};
}
function ot(e, t, n, r, i, a, o = 12) {
	let s = Math.max(o, i - n - o), c = Math.max(o, a - r - o);
	return {
		left: Math.min(Math.max(o, e), s),
		top: Math.min(Math.max(o, t), c)
	};
}
// src/ploc-cellar-rack-card.ts
var st = class extends je {
	constructor(...e) {
		super(...e), this.loading = !1, this.requestGeneration = 0;
	}
	static {
		this.styles = c`
    :host { display: block; }
    ha-card { padding: 16px; color: var(--primary-text-color); }
    header { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    h2 { margin: 0; font-size: 1.2rem; font-weight: 500; }
    button { color: var(--primary-text-color); background: var(--secondary-background-color); border: 1px solid var(--divider-color); border-radius: 8px; padding: 8px 12px; cursor: pointer; }
    button[aria-pressed="true"] { border-color: var(--primary-color); background: var(--secondary-background-color); }
    button[disabled] { opacity: .5; cursor: default; }
    .rack-picker { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin: 14px 0; }
    .rack-picker-select { width: 100%; max-width: 360px; min-height: 40px; padding: 8px 12px; color: var(--primary-text-color); background: var(--card-background-color); border: 1px solid var(--divider-color); border-radius: 8px; font: inherit; }
    .rack-visualization { width: max-content; max-width: 100%; margin: 4px auto 0; }
    .grid-wrap { display: flex; justify-content: safe center; overflow-x: auto; width: 100%; box-sizing: border-box; padding: 0; }
    .rack-grid { display: grid; flex: 0 0 auto; gap: 6px; width: max-content; min-width: min-content; }
    .rack-summary { color: var(--secondary-text-color); font-size: .85rem; line-height: 1.2; text-align: center; }
    .rack-name { color: var(--primary-text-color); font-size: 1rem; font-weight: 500; }
    .color-counts { color: var(--secondary-text-color); text-align: center; }
    .rack-occupancy { position: relative; box-sizing: border-box; width: 100%; height: 20px; margin: 0 0 8px; overflow: hidden; border-radius: 6px; background: var(--secondary-background-color); }
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
		let e = this.hass, t = this.config;
		if (!e || !t?.config_entry_id || this.loading) return;
		let n = t.config_entry_id, r = ++this.requestGeneration;
		this.loading = !0, this.error = void 0;
		try {
			let t = await qe(e, n);
			r === this.requestGeneration && (this.inventory = t, this.selectedRackId && this.inventory.racks.some((e) => e.id === this.selectedRackId) || (this.selectedRackId = this.inventory.racks[0]?.id));
		} catch (e) {
			r === this.requestGeneration && (this.error = e instanceof Error ? e.message : String(e));
		} finally {
			r === this.requestGeneration && (this.loading = !1);
		}
	}
	selectRack(e) {
		e.currentTarget instanceof HTMLSelectElement && (this.selectedRackId = e.currentTarget.value);
	}
	wineLabel(e, t) {
		if (!e.wine_id) return "";
		let n = t.get(e.wine_id);
		return n ? n.name : We(this.hass?.language ?? "en", "unknown_wine");
	}
	displayWineLabel(e, t) {
		return this.wineLabel(e, t);
	}
	wineColor(e) {
		let t = e?.color_rgb;
		return !t || t.length !== 3 || !t.every((e) => Number.isInteger(e) && e >= 0 && e <= 255) ? "var(--secondary-text-color)" : `rgb(${t[0]} ${t[1]} ${t[2]})`;
	}
	wineTooltipFields(e) {
		let t = this.hass?.language ?? "en", n = (e) => We(t, e), r = [];
		e.vintage !== null && r.push([n("tooltip_vintage"), String(e.vintage)]), e.appellation && r.push([n("tooltip_appellation"), e.appellation]);
		let i = [e.region, e.country].filter(Boolean).join(" / ");
		return i && r.push([n("tooltip_region_country"), i]), r;
	}
	showWineTooltip(e, t) {
		let n = e.currentTarget;
		if (!(n instanceof HTMLElement)) return;
		let r = n.getBoundingClientRect(), i = "clientX" in e;
		this.tooltipPosition = {
			left: i ? e.clientX + 12 : r.right + 8,
			top: i ? e.clientY + 12 : r.top
		}, this.activeTooltip = {
			wine: t,
			color: this.wineColor(t)
		};
	}
	moveWineTooltip(e) {
		this.activeTooltip && (this.tooltipPosition = {
			left: e.clientX + 12,
			top: e.clientY + 12
		}, this.applyTooltipPosition());
	}
	applyTooltipPosition() {
		let e = this.renderRoot.querySelector(".wine-tooltip"), t = this.tooltipPosition;
		if (!e || !t) return;
		let n = ot(t.left, t.top, e.offsetWidth, e.offsetHeight, window.innerWidth, window.innerHeight);
		e.style.left = `${n.left}px`, e.style.top = `${n.top}px`;
	}
	hideWineTooltip() {
		this.activeTooltip = void 0, this.tooltipPosition = void 0;
	}
	render() {
		let e = (e) => We(this.hass?.language ?? "en", e), t = this.inventory, n = t?.racks.find((e) => e.id === this.selectedRackId), r = (t?.rack_items ?? []).filter((e) => e.rack_id === this.selectedRackId), i = new Map((t?.wines ?? []).map((e) => [e.id, e])), a = r.reduce((e, t) => e + Number(!!t.wine_id), 0), o = r.length - a, s = r.length ? a / r.length * 100 : 0, c = r.filter((e) => Number.isSafeInteger(e.row) && Number.isSafeInteger(e.column)), l = /* @__PURE__ */ new Map();
		for (let e of r) {
			if (!e.wine_id) continue;
			let t = i.get(e.wine_id)?.color?.trim();
			t && l.set(t, (l.get(t) ?? 0) + 1);
		}
		let u = [...l.entries()].sort(([e], [t]) => e.localeCompare(t, this.hass?.language)), d = at(c.map((e) => ({
			id: e.id,
			row: e.row,
			column: e.column
		}))), f = new Map(d.positions.map((e) => [e.id, e])), p = r.filter((e) => !Number.isSafeInteger(e.row) || !Number.isSafeInteger(e.column)), m = (t?.rack_items ?? []).filter((e) => !t?.racks.some((t) => t.id === e.rack_id));
		return N`
      <ha-card>
        <header>
          <h2>${this.config?.title ?? e("rack_title")}</h2>
          <button ?disabled=${this.loading} @click=${() => this.refresh()}>${this.loading ? "…" : e("refresh")}</button>
        </header>
        ${this.error ? N`<div class="error">${this.error}</div>` : P}
        ${this.config?.config_entry_id ? P : N`<div class="muted">${e("select_config")}</div>`}
        ${t?.stale ? N`<div class="warning">${e("stale")}</div>` : P}
        ${t?.racks.length ? N`
          ${t.racks.length > 1 ? this.config?.rack_picker_mode === "dropdown" ? N`
                <div class="rack-picker">
                  <select class="rack-picker-select"
                    aria-label=${e("rack_selection")}
                    .value=${this.selectedRackId ?? ""}
                    @change=${this.selectRack}>
                    ${t.racks.map((e) => N`
                      <option value=${e.id}>${e.name}</option>
                    `)}
                  </select>
                </div>
              ` : N`
                <nav class="rack-picker" aria-label=${e("rack_selection")}>
                  ${t.racks.map((e) => N`
                    <button aria-pressed=${e.id === this.selectedRackId}
                      @click=${() => {
			this.selectedRackId = e.id;
		}}>${e.name}</button>
                  `)}
                </nav>
              ` : P}
          <div class="rack-summary">
            <div class="rack-name">${n?.name ?? ""}</div>
            ${u.length ? N`<div class="color-counts">${u.map(([e, t], n) => N`${n ? " · " : P}<span class="color-count">${e}: <span class="numeric-value">${t}</span></span>`)}</div>` : P}
          </div>
          <div class="rack-visualization"
            style=${`width: ${c.length ? `${d.columnCount * 104 - 6}px` : "100%"};`}>
            ${this.config?.show_rack_occupancy === !1 ? P : N`
              <div class="rack-occupancy"
                role="progressbar"
                aria-label="${e("occupied")} / ${e("free")}"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow=${Math.round(s)}
                aria-valuetext=${`${r.length} ${e("positions")}, ${a} ${e("occupied")}, ${o} ${e("free")}`}>
                <div class="rack-occupancy-fill" style=${`width: ${s}%;`}></div>
                <div class="rack-occupancy-label">
                  <span class="numeric-value">${r.length}</span>&nbsp;${e("positions")}&nbsp;·&nbsp;<span class="numeric-value">${a}</span>&nbsp;${e("occupied")}&nbsp;·&nbsp;<span class="numeric-value">${o}</span>&nbsp;${e("free")}
                </div>
              </div>
            `}
            ${c.length ? N`
              ${d.compact ? N`<div class="warning">${e("rack_grid_compacted")}</div>` : P}
              <div class="grid-wrap">
                <div class="rack-grid" style=${`grid-template-columns: repeat(${d.columnCount}, 98px); grid-template-rows: repeat(${d.rowCount}, 98px);`}>
                ${c.map((t) => {
			let n = f.get(t.id);
			if (!n) return P;
			let r = !!t.wine_id, a = t.wine_id ? i.get(t.wine_id) : void 0, o = r ? this.wineLabel(t, i) : e("empty_position");
			return N`
                    <div class=${r ? "slot occupied" : "slot empty"}
                      style=${`grid-row: ${n.row}; grid-column: ${n.column};`}
                      aria-label=${o}
                      aria-describedby=${r && this.activeTooltip?.wine === a ? "ploc-cellar-wine-tooltip" : P}
                      role=${a ? "button" : r ? "img" : P}
                      aria-haspopup=${a ? "dialog" : P}
                      tabindex=${r ? "0" : P}
                      @click=${a ? () => {
				this.selectedWine = a, this.selectedLocation = {
					rackId: t.rack_id,
					row: t.row,
					column: t.column
				};
			} : P}
                      @keydown=${a ? (e) => {
				(e.key === "Enter" || e.key === " ") && (e.preventDefault(), this.selectedWine = a, this.selectedLocation = {
					rackId: t.rack_id,
					row: t.row,
					column: t.column
				});
			} : P}
                      @pointerenter=${r ? (e) => this.showWineTooltip(e, a) : P}
                      @pointermove=${r ? (e) => this.moveWineTooltip(e) : P}
                      @pointerleave=${r ? () => this.hideWineTooltip() : P}
                      @focus=${r ? (e) => this.showWineTooltip(e, a) : P}
                      @blur=${r ? () => this.hideWineTooltip() : P}>
                      ${r ? N`<span class="bottle-marker" style=${`--bottle-color: ${this.wineColor(a)};`} aria-hidden="true"></span>` : P}
                      ${r ? N`<strong>${this.displayWineLabel(t, i)}</strong>` : N`<span class="empty-shelf" aria-hidden="true"></span>`}
                      <small>r${t.row + 1}&nbsp;·&nbsp;c${t.column + 1}</small>
                    </div>
                  `;
		})}
                ${d.missingCoordinates.map((t) => N`
                  <div class="slot missing"
                    style=${`grid-row: ${t.row}; grid-column: ${t.column};`}>
                    <strong>—</strong>
                    <small>${e("not_mapped")}</small>
                  </div>
                `)}
              </div>
              </div>
            ` : N`<div class="warning">${e("no_coordinates")}</div>`}
          </div>
          ${p.length ? N`
            <div class="unplaced">
              <strong>${e("positions_without_coordinates")}</strong>
              ${p.map((t) => N`<div class="unplaced-item">${this.wineLabel(t, i) || e("empty_position")}</div>`)}
            </div>
          ` : P}
        ` : N`<p class="muted">${e("no_racks")}</p>`}
        ${m.length ? N`
          <div class="warning"><span class="numeric-value">${m.length}</span> ${e("missing_rack")}</div>
        ` : P}
        ${this.activeTooltip ? N`
          <div class="wine-tooltip"
            id="ploc-cellar-wine-tooltip"
            role="tooltip"
            style=${`left: 12px; top: 12px; --wine-tooltip-border-color: ${this.activeTooltip.color};`}>
            ${this.activeTooltip.wine ? N`
              <div class="wine-tooltip-name">${this.activeTooltip.wine.name}</div>
              <dl class="wine-tooltip-details">
                ${this.wineTooltipFields(this.activeTooltip.wine).map(([e, t]) => N`
                  <dt>${e}</dt><dd>${t}</dd>
                `)}
              </dl>
            ` : e("unknown_wine")}
          </div>
        ` : P}
        ${this.selectedWine ? N`
          <ploc-cellar-wine-detail
            .hass=${this.hass}
            .wine=${this.selectedWine}
            .selectedLocation=${this.selectedLocation}
            @wine-detail-closed=${() => {
			this.selectedWine = void 0, this.selectedLocation = void 0;
		}}>
          </ploc-cellar-wine-detail>
        ` : P}
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
I([Ve({ attribute: !1 })], st.prototype, "hass", void 0), I([F()], st.prototype, "config", void 0), I([F()], st.prototype, "inventory", void 0), I([F()], st.prototype, "selectedRackId", void 0), I([F()], st.prototype, "loading", void 0), I([F()], st.prototype, "error", void 0), I([F()], st.prototype, "activeTooltip", void 0), I([F()], st.prototype, "selectedWine", void 0), I([F()], st.prototype, "selectedLocation", void 0), st = I([Re("ploc-cellar-rack-card")], st), window.customCards ??= [], window.customCards.push({
	type: "ploc-cellar-rack-card",
	name: Ge("picker_rack_name"),
	description: Ge("picker_rack_description")
});
// src/inventory-filters.ts
var ct = { kind: "all" }, lt = { kind: "unknown" };
function ut(e) {
	return e == null || typeof e == "string" && e.trim() === "";
}
function dt(e, t) {
	return t.kind === "all" ? !0 : t.kind === "unknown" ? ut(e) : !ut(e) && String(e) === t.value;
}
function ft(e, t) {
	if (e.kind === "all") return "all";
	if (e.kind === "unknown") return "unknown";
	let n = t.indexOf(e.value);
	return n < 0 ? "all" : `value:${n}`;
}
function pt(e, t) {
	if (e === "unknown") return lt;
	if (e.startsWith("value:")) {
		let n = Number(e.slice(6));
		if (Number.isInteger(n) && n >= 0 && n < t.length) return {
			kind: "value",
			value: t[n]
		};
	}
	return ct;
}
// src/ploc-cellar-inventory-card.ts
var mt = class extends je {
	constructor(...e) {
		super(...e), this.loading = !1, this.search = "", this.color = ct, this.region = ct, this.appellation = ct, this.vintage = ct, this.meal = "", this.sort = "name-asc", this.requestGeneration = 0;
	}
	static {
		this.styles = c`
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
    .toolbar { display: grid; grid-template-columns: repeat(auto-fit, minmax(145px, 1fr)); gap: 8px; margin: 10px 0 0; }
    .search { grid-column: 1 / -1; }
    .summary { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px; color: var(--secondary-text-color); font-size: .85rem; margin: 12px 0; }
    .wine-list { display: grid; gap: 8px; }
    .wine { display: block; width: 100%; box-sizing: border-box; border: 1px solid var(--divider-color); border-left: 6px solid var(--wine-color, var(--divider-color)); border-radius: 10px; padding: 12px; min-width: 0; background: var(--card-background-color, var(--ha-card-background)); color: var(--primary-text-color); font: inherit; text-align: left; cursor: pointer; }
    .wine:hover { background: var(--secondary-background-color); }
    .wine:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
    .wine-main { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
    .wine-name { font-family: var(--ploc-wine-font-family); font-size: 1.4rem; font-weight: 600; line-height: 1.2; overflow-wrap: anywhere; }
    .quantity { display: flex; flex: 0 0 auto; align-items: center; gap: 5px; white-space: nowrap; font-family: var(--ploc-numeric-font-family); font-size: 1.5rem; font-weight: 400; font-variant-numeric: tabular-nums; }
    .quantity ha-icon { --mdc-icon-size: 25px; color: var(--wine-color, var(--secondary-text-color)); }
    .metadata { color: var(--secondary-text-color); font-size: .85rem; margin-top: 5px; line-height: 1.45; }
    .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 9px; }
    .tag { border-radius: 999px; background: var(--secondary-background-color); padding: 3px 8px; font-size: .75rem; }
    .filters { margin: 14px 0; }
    .filters[open] { padding: 10px; border: 1px solid var(--outline-color, var(--divider-color)); border-radius: 10px; background: var(--secondary-background-color); }
    .filters > summary { display: flex; align-items: center; gap: 8px; cursor: pointer; font-weight: 500; padding: 4px 0; list-style: none; }
    .filters[open] > summary { color: var(--primary-text-color); padding-bottom: 8px; border-bottom: 1px solid var(--divider-color); }
    .filters > summary::-webkit-details-marker { display: none; }
    .filters-icon { --mdc-icon-size: 18px; color: var(--secondary-text-color); }
    .filters-chevron { --mdc-icon-size: 18px; margin-left: auto; color: var(--secondary-text-color); transition: transform 120ms ease; }
    .filters[open] .filters-chevron { transform: rotate(90deg); }
    .sort-row { display: flex; align-items: center; gap: 10px; margin-top: 10px; }
    .sort-row > span { flex: 0 0 auto; color: var(--secondary-text-color); font-size: .9rem; }
    .sort-row select { flex: 1; width: 100%; }
    .filters > summary:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 4px; border-radius: 2px; }
    .warning { color: var(--warning-color); padding: 8px 0; }
    .error { color: var(--error-color); padding: 8px 0; }
    .muted { color: var(--secondary-text-color); font-size: .85rem; }
    .actions { display: flex; gap: 8px; align-items: center; }
    @media (max-width: 420px) {
      ha-card { padding: 12px; }
      .toolbar { grid-template-columns: 1fr 1fr; }
    }
  `;
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
		let e = this.hass, t = this.config;
		if (!e || !t?.config_entry_id || this.loading) return;
		let n = t.config_entry_id, r = ++this.requestGeneration;
		this.loading = !0, this.error = void 0;
		try {
			let t = await qe(e, n);
			r === this.requestGeneration && (this.inventory = t);
		} catch (e) {
			r === this.requestGeneration && (this.error = e instanceof Error ? e.message : String(e));
		} finally {
			r === this.requestGeneration && (this.loading = !1);
		}
	}
	valuesFor(e) {
		let t = (this.inventory?.wines ?? []).map((t) => t[e]).filter((e) => !ut(e));
		return [...new Set(t.map(String))].sort((e, t) => e.localeCompare(t, this.hass?.language ?? void 0, {
			numeric: !0,
			sensitivity: "base"
		}));
	}
	get filteredWines() {
		let e = this.search.trim().toLocaleLowerCase(), t = (this.inventory?.wines ?? []).filter((t) => !dt(t.color, this.color) || !dt(t.region, this.region) || !dt(t.appellation, this.appellation) || !dt(t.vintage, this.vintage) || this.meal && !Qe(t.meals).includes(this.meal) ? !1 : !e || [t.name, t.domain].filter((e) => e !== null).join(" ").toLocaleLowerCase().includes(e)), n = new Intl.Collator(this.hass?.language ?? void 0, {
			numeric: !0,
			sensitivity: "base"
		});
		return [...t].sort((e, t) => {
			if (this.sort === "name-desc") return n.compare(t.name, e.name);
			if (this.sort === "bottles-asc" || this.sort === "bottles-desc") {
				let r = e.bottles_in_cellar - t.bottles_in_cellar;
				return (this.sort === "bottles-asc" ? r : -r) || n.compare(e.name, t.name);
			}
			if (this.sort === "vintage-asc" || this.sort === "vintage-desc") {
				if (e.vintage == null && t.vintage != null) return 1;
				if (e.vintage != null && t.vintage == null) return -1;
				let r = (e.vintage ?? 0) - (t.vintage ?? 0);
				return (this.sort === "vintage-asc" ? r : -r) || n.compare(e.name, t.name);
			}
			return n.compare(e.name, t.name);
		});
	}
	clearFilters() {
		this.search = "", this.color = ct, this.region = ct, this.appellation = ct, this.vintage = ct, this.meal = "", this.sort = "name-asc";
	}
	mealValues() {
		let e = /* @__PURE__ */ new Set();
		for (let t of this.inventory?.wines ?? []) for (let n of Qe(t.meals)) e.add(n);
		return [...e].sort((e, t) => We(this.hass?.language ?? "en", e).localeCompare(We(this.hass?.language ?? "en", t), this.hass?.language ?? void 0, { sensitivity: "base" }));
	}
	selectMealFilter() {
		let e = (e) => We(this.hass?.language ?? "en", e);
		return N`
      <select aria-label=${e("filter_meal")} .value=${this.meal}
        @change=${(e) => {
			this.meal = e.target.value;
		}}>
        <option value="" ?selected=${!this.meal}>${e("filter_meal")}</option>
        ${this.mealValues().map((t) => N`<option value=${t} ?selected=${t === this.meal}>${e(t)}</option>`)}
      </select>
    `;
	}
	selectFilter(e, t, n, r) {
		return N`
      <select aria-label=${t} .value=${ft(n, r)}
        @change=${(t) => {
			let n = pt(t.target.value, r);
			e === "color" ? this.color = n : e === "region" ? this.region = n : e === "appellation" ? this.appellation = n : this.vintage = n;
		}}>
        <option value="all" ?selected=${n.kind === "all"}>${t}</option>
        <option value="unknown" ?selected=${n.kind === "unknown"}>${We(this.hass?.language ?? "en", "filter_unknown")}</option>
        ${r.map((e, t) => N`<option value=${`value:${t}`} ?selected=${n.kind === "value" && n.value === e}>${e}</option>`)}
      </select>
    `;
	}
	renderWine(e) {
		let t = (e) => We(this.hass?.language ?? "en", e), n = e.vintage === null ? t("unknown_vintage") : String(e.vintage), r = e.color_rgb?.every(Number.isFinite) ? e.color_rgb.map((e) => Math.round(Math.min(255, Math.max(0, e)))) : null, i = r ? `rgb(${r.join(", ")})` : "";
		return N`
      <button class="wine" type="button" aria-haspopup="dialog"
        aria-label=${`${e.name}, ${new Intl.NumberFormat(this.hass?.language ?? void 0).format(e.bottles_in_cellar)} ${t("bottles_short")}`}
        style=${i ? "--wine-color: " + i : ""}
        @click=${() => {
			this.selectedWine = e;
		}}>
        <div class="wine-main">
          <div>
            <div class="wine-name">${e.name}</div>
            <div class="metadata">${[
			e.appellation,
			e.region,
			e.country
		].filter(Boolean).join(" · ")}</div>
          </div>
          <div class="quantity"><span>${new Intl.NumberFormat(this.hass?.language ?? void 0).format(e.bottles_in_cellar)}</span><ha-icon icon="mdi:bottle-wine" aria-hidden="true"></ha-icon></div>
        </div>
        <div class="tags">
          ${e.color ? N`<span class="tag">${e.color}</span>` : P}
          <span class="tag">${n}</span>
          ${e.bottle_format ? N`<span class="tag">${e.bottle_format}</span>` : P}
        </div>
      </button>
    `;
	}
	render() {
		let e = (e) => We(this.hass?.language ?? "en", e), t = this.filteredWines, n = t.reduce((e, t) => e + t.bottles_in_cellar, 0), r = !!(this.search || this.color.kind !== "all" || this.region.kind !== "all" || this.appellation.kind !== "all" || this.vintage.kind !== "all" || this.meal);
		return N`
      <ha-card>
        <header>
          <h2>${this.config?.title ?? e("inventory_title")}</h2>
          <div class="actions">
            <button ?disabled=${this.loading} @click=${() => this.refresh()}>
              ${this.loading ? e("loading") : e("refresh")}
            </button>
          </div>
        </header>
        ${this.error ? N`<div class="error">${this.error}</div>` : P}
        ${this.config?.config_entry_id ? P : N`<div class="muted">${e("select_config")}</div>`}
        ${this.inventory?.stale ? N`<div class="warning">${e("stale")}</div>` : P}
        ${this.inventory ? N`
          <input class="search" type="search" aria-label=${e("search_wine")}
            placeholder=${e("search_placeholder")} .value=${this.search}
            @input=${(e) => {
			this.search = e.target.value;
		}} />
          <details class="filters">
            <summary><ha-icon class="filters-icon" icon="mdi:filter-variant" aria-hidden="true"></ha-icon><span>${e("inventory_filters")}</span><ha-icon class="filters-chevron" icon="mdi:chevron-right" aria-hidden="true"></ha-icon></summary>
            <div class="toolbar">
              ${this.selectFilter("color", e("filter_color"), this.color, this.valuesFor("color"))}
              ${this.selectFilter("region", e("filter_region"), this.region, this.valuesFor("region"))}
              ${this.selectFilter("appellation", e("filter_appellation"), this.appellation, this.valuesFor("appellation"))}
              ${this.selectFilter("vintage", e("filter_vintage"), this.vintage, this.valuesFor("vintage"))}
              ${this.selectMealFilter()}
            </div>
            <label class="sort-row">
              <span>${e("sort_by")}</span>
              <select aria-label=${e("sort_by")} .value=${this.sort}
                @change=${(e) => {
			this.sort = e.target.value;
		}}>
                <option value="name-asc">${e("sort_name_asc")}</option>
                <option value="name-desc">${e("sort_name_desc")}</option>
                <option value="bottles-asc">${e("sort_bottles_asc")}</option>
                <option value="bottles-desc">${e("sort_bottles_desc")}</option>
                <option value="vintage-asc">${e("sort_vintage_asc")}</option>
                <option value="vintage-desc">${e("sort_vintage_desc")}</option>
              </select>
            </label>
          </details>
          <div class="summary">
            <span>${e("inventory_results").replace("{count}", String(t.length))}</span>
            <span>${e("inventory_bottle_total").replace("{count}", String(n))}</span>
            ${r ? N`<button @click=${() => this.clearFilters()}>${e("clear_filters")}</button>` : P}
          </div>
          ${this.inventory.stock_reconstruction_complete ? P : N`<div class="warning">${e("reconstruction_incomplete")}</div>`}
          <div class="wine-list">
            ${t.map((e) => this.renderWine(e))}
          </div>
          ${t.length === 0 ? N`<p class="muted">${e("no_matching_wines")}</p>` : P}
          ${this.selectedWine ? N`
            <ploc-cellar-wine-detail
              .hass=${this.hass}
              .wine=${this.selectedWine}
              @wine-detail-closed=${() => {
			this.selectedWine = void 0;
		}}>
            </ploc-cellar-wine-detail>
          ` : P}
        ` : P}
      </ha-card>
    `;
	}
	getCardSize() {
		return 6;
	}
	getGridOptions() {
		return {
			columns: 12,
			min_columns: 6,
			rows: "auto"
		};
	}
};
I([Ve({ attribute: !1 })], mt.prototype, "hass", void 0), I([F()], mt.prototype, "config", void 0), I([F()], mt.prototype, "inventory", void 0), I([F()], mt.prototype, "loading", void 0), I([F()], mt.prototype, "error", void 0), I([F()], mt.prototype, "search", void 0), I([F()], mt.prototype, "color", void 0), I([F()], mt.prototype, "region", void 0), I([F()], mt.prototype, "appellation", void 0), I([F()], mt.prototype, "vintage", void 0), I([F()], mt.prototype, "meal", void 0), I([F()], mt.prototype, "sort", void 0), I([F()], mt.prototype, "selectedWine", void 0), mt = I([Re("ploc-cellar-inventory-card")], mt), window.customCards ??= [], window.customCards.push({
	type: "ploc-cellar-inventory-card",
	name: Ge("picker_inventory_name"),
	description: Ge("picker_inventory_description")
});
// src/ploc-cellar-card-editor.ts
var ht = class extends je {
	constructor(...e) {
		super(...e), this.computeLabel = (e) => We(this.hass?.language ?? "en", {
			config_entry_id: "editor_configuration",
			title: "editor_title",
			rack_picker_mode: "editor_rack_picker_mode",
			show_rack_occupancy: "editor_show_rack_occupancy",
			show_occupancy: "editor_show_occupancy",
			show_diagnostics: "editor_show_diagnostics",
			show_statistics: "editor_show_statistics",
			show_statistics_legends: "editor_show_statistics_legends"
		}[e.name]), this.computeHelper = (e) => {
			if (e.name === "config_entry_id") return We(this.hass?.language ?? "en", "editor_configuration_helper");
			if (e.name === "title") return We(this.hass?.language ?? "en", "editor_title_helper");
		};
	}
	get isOverviewCard() {
		return this.config?.type === "custom:ploc-cellar-card" || this.config?.type === "custom:ploc-cellar-statistics-card";
	}
	get isRackCard() {
		return this.config?.type === "custom:ploc-cellar-rack-card";
	}
	get schema() {
		let e = [{
			name: "config_entry_id",
			required: !0,
			selector: { config_entry: { integration: "ploc_cellar" } }
		}];
		return this.isOverviewCard ? (e.push({
			name: "title",
			selector: { text: {} }
		}, {
			name: "show_occupancy",
			selector: { boolean: {} }
		}, {
			name: "show_diagnostics",
			selector: { boolean: {} }
		}, {
			name: "show_statistics",
			selector: { boolean: {} }
		}), this.config?.show_statistics !== !1 && e.push({
			name: "show_statistics_legends",
			selector: { boolean: {} }
		})) : this.isRackCard && e.push({
			name: "title",
			selector: { text: {} }
		}, {
			name: "show_rack_occupancy",
			selector: { boolean: {} }
		}, {
			name: "rack_picker_mode",
			selector: { select: {
				mode: "dropdown",
				options: [{
					label: We(this.hass?.language ?? "en", "editor_rack_picker_buttons"),
					value: "buttons"
				}, {
					label: We(this.hass?.language ?? "en", "editor_rack_picker_dropdown"),
					value: "dropdown"
				}]
			} }
		}), e;
	}
	setConfig(e) {
		let t = { ...e };
		this.isOverviewType(e.type) ? (t.show_occupancy = e.show_occupancy !== !1, t.show_diagnostics = e.show_diagnostics !== !1, t.show_statistics = e.show_statistics !== !1, t.show_statistics_legends = e.show_statistics_legends !== !1) : e.type === "custom:ploc-cellar-rack-card" && (t.rack_picker_mode = e.rack_picker_mode ?? "buttons", t.show_rack_occupancy = e.show_rack_occupancy !== !1), this.config = t;
	}
	isOverviewType(e) {
		return e === "custom:ploc-cellar-card" || e === "custom:ploc-cellar-statistics-card";
	}
	valueChanged(e) {
		e.stopPropagation();
		let t = {
			...this.config,
			...e.detail.value
		};
		this.config = t, this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: t },
			bubbles: !0,
			composed: !0
		}));
	}
	render() {
		return N`
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
I([Ve({ attribute: !1 })], ht.prototype, "hass", void 0), I([F()], ht.prototype, "config", void 0), ht = I([Re("ploc-cellar-card-editor")], ht);
// node_modules/tslib/tslib.es6.js
var gt = function(e, t) {
	return gt = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
	}, gt(e, t);
};
function L(e, t) {
	if (typeof t != "function" && t !== null) throw TypeError("Class extends value " + String(t) + " is not a constructor or null");
	gt(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
// node_modules/zrender/lib/core/env.js
var _t = function() {
	function e() {
		this.firefox = !1, this.ie = !1, this.edge = !1, this.newEdge = !1, this.weChat = !1;
	}
	return e;
}(), R = new (function() {
	function e() {
		this.browser = new _t(), this.node = !1, this.wxa = !1, this.worker = !1, this.svgSupported = !1, this.touchEventsSupported = !1, this.pointerEventsSupported = !1, this.domSupported = !1, this.transformSupported = !1, this.transform3dSupported = !1, this.hasGlobalWindow = typeof window < "u";
	}
	return e;
}())();
typeof wx == "object" && typeof wx.getSystemInfoSync == "function" ? (R.wxa = !0, R.touchEventsSupported = !0) : typeof document > "u" && typeof self < "u" ? R.worker = !0 : !R.hasGlobalWindow || "Deno" in window || typeof navigator < "u" && typeof navigator.userAgent == "string" && navigator.userAgent.indexOf("Node.js") > -1 ? (R.node = !0, R.svgSupported = !0) : vt(navigator.userAgent, R);
function vt(e, t) {
	var n = t.browser, r = e.match(/Firefox\/([\d.]+)/), i = e.match(/MSIE\s([\d.]+)/) || e.match(/Trident\/.+?rv:(([\d.]+))/), a = e.match(/Edge?\/([\d.]+)/), o = /micromessenger/i.test(e);
	if (r && (n.firefox = !0, n.version = r[1]), i && (n.ie = !0, n.version = i[1]), a && (n.edge = !0, n.version = a[1], n.newEdge = +a[1].split(".")[0] > 18), o && (n.weChat = !0), t.svgSupported = typeof SVGRect < "u", t.touchEventsSupported = "ontouchstart" in window && !n.ie && !n.edge, t.pointerEventsSupported = "onpointerdown" in window && (n.edge || n.ie && +n.version >= 11), t.domSupported = typeof document < "u") {
		var s = document.documentElement.style;
		t.transform3dSupported = (n.ie && "transition" in s || n.edge || "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix() || "MozPerspective" in s) && !("OTransition" in s), t.transformSupported = t.transform3dSupported || n.ie && +n.version >= 9;
	}
}
var yt = "12px sans-serif", bt = 20, xt = 100, St = "007LLmW'55;N0500LLLLLLLLLL00NNNLzWW\\\\WQb\\0FWLg\\bWb\\WQ\\WrWWQ000CL5LLFLL0LL**F*gLLLL5F0LF\\FFF5.5N";
function Ct(e) {
	var t = {};
	if (typeof JSON > "u") return t;
	for (var n = 0; n < e.length; n++) {
		var r = String.fromCharCode(n + 32);
		t[r] = (e.charCodeAt(n) - bt) / xt;
	}
	return t;
}
var wt = Ct(St), Tt = {
	createCanvas: function() {
		return typeof document < "u" && document.createElement("canvas");
	},
	measureText: (function() {
		var e, t;
		return function(n, r) {
			if (!e) {
				var i = Tt.createCanvas();
				e = i && i.getContext("2d");
			}
			if (e) return t !== r && (t = e.font = r || "12px sans-serif"), e.measureText(n);
			n ||= "", r ||= "12px sans-serif";
			var a = /((?:\d+)?\.?\d*)px/.exec(r), o = a && +a[1] || 12, s = 0;
			if (r.indexOf("mono") >= 0) s = o * n.length;
			else for (var c = 0; c < n.length; c++) {
				var l = wt[n[c]];
				s += l == null ? o : l * o;
			}
			return { width: s };
		};
	})(),
	loadImage: function(e, t, n) {
		var r = new Image();
		return r.onload = t, r.onerror = n, r.src = e, r;
	},
	getTime: function() {
		return Date.now ? Date.now() : +/* @__PURE__ */ new Date();
	}
}, Et = Jt([
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
}, {}), Dt = Jt([
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
}, {}), Ot = Object.prototype.toString, kt = Array.prototype, At = kt.forEach, jt = kt.filter, Mt = kt.slice, Nt = kt.map, Pt = function() {}.constructor, Ft = Pt ? Pt.prototype : null, It = "__proto__", Lt = 2311, Rt = 2 ** 53 - 1;
function zt() {
	return Lt >= Rt && (Lt = 0), Lt++;
}
function Bt() {
	var e = [...arguments];
	typeof console < "u" && console.error.apply(console, e);
}
function z(e) {
	if (typeof e != "object" || !e) return e;
	var t = e, n = Ot.call(e);
	if (n === "[object Array]") {
		if (!_n(e)) {
			t = [];
			for (var r = 0, i = e.length; r < i; r++) t[r] = z(e[r]);
		}
	} else if (Dt[n]) {
		if (!_n(e)) {
			var a = e.constructor;
			if (a.from) t = a.from(e);
			else {
				t = new a(e.length);
				for (var r = 0, i = e.length; r < i; r++) t[r] = e[r];
			}
		}
	} else if (!Et[n] && !_n(e) && !an(e)) for (var o in t = {}, e) e.hasOwnProperty(o) && o !== It && (t[o] = z(e[o]));
	return t;
}
function Vt(e, t, n) {
	if (!K(t) || !K(e)) return n ? z(t) : e;
	for (var r in t) if (t.hasOwnProperty(r) && r !== It) {
		var i = e[r], a = t[r];
		K(a) && K(i) && !U(a) && !U(i) && !an(a) && !an(i) && !nn(a) && !nn(i) && !_n(a) && !_n(i) ? Vt(i, a, n) : (n || !(r in e)) && (e[r] = z(t[r]));
	}
	return e;
}
function B(e, t) {
	if (Object.assign) Object.assign(e, t);
	else for (var n in t) t.hasOwnProperty(n) && n !== It && (e[n] = t[n]);
	return e;
}
function Ht(e, t, n) {
	e ||= {};
	for (var r = 0; r < n.length; r++) {
		var i = n[r];
		e[i] = t[i];
	}
	return e;
}
function Ut(e, t, n) {
	for (var r = Xt(t), i = 0, a = r.length; i < a; i++) {
		var o = r[i];
		(n ? t[o] != null : e[o] == null) && (e[o] = t[o]);
	}
	return e;
}
Tt.createCanvas;
function Wt(e, t) {
	if (e) {
		if (e.indexOf) return e.indexOf(t);
		for (var n = 0, r = e.length; n < r; n++) if (e[n] === t) return n;
	}
	return -1;
}
function Gt(e, t) {
	var n = e.prototype;
	function r() {}
	for (var i in r.prototype = t.prototype, e.prototype = new r(), n) n.hasOwnProperty(i) && (e.prototype[i] = n[i]);
	e.prototype.constructor = e, e.superClass = t;
}
function Kt(e, t, n) {
	if (e = "prototype" in e ? e.prototype : e, t = "prototype" in t ? t.prototype : t, Object.getOwnPropertyNames) for (var r = Object.getOwnPropertyNames(t), i = 0; i < r.length; i++) {
		var a = r[i];
		a !== "constructor" && (n ? t[a] != null : e[a] == null) && (e[a] = t[a]);
	}
	else Ut(e, t, n);
}
function qt(e) {
	return !e || typeof e == "string" ? !1 : typeof e.length == "number";
}
function V(e, t, n) {
	if (e && t) {
		if (e.forEach && e.forEach === At) e.forEach(t, n);
		else if (e.length === +e.length) for (var r = 0, i = e.length; r < i; r++) t.call(n, e[r], r, e);
		else for (var a in e) e.hasOwnProperty(a) && t.call(n, e[a], a, e);
	}
}
function H(e, t, n) {
	if (!e) return [];
	if (!t) return dn(e);
	if (e.map && e.map === Nt) return e.map(t, n);
	for (var r = [], i = 0, a = e.length; i < a; i++) r.push(t.call(n, e[i], i, e));
	return r;
}
function Jt(e, t, n, r) {
	if (e && t) {
		for (var i = 0, a = e.length; i < a; i++) n = t.call(r, n, e[i], i, e);
		return n;
	}
}
function Yt(e, t, n) {
	if (!e) return [];
	if (!t) return dn(e);
	if (e.filter && e.filter === jt) return e.filter(t, n);
	for (var r = [], i = 0, a = e.length; i < a; i++) t.call(n, e[i], i, e) && r.push(e[i]);
	return r;
}
function Xt(e) {
	if (!e) return [];
	if (Object.keys) return Object.keys(e);
	var t = [];
	for (var n in e) e.hasOwnProperty(n) && t.push(n);
	return t;
}
function Zt(e, t) {
	var n = [...arguments].slice(2);
	return function() {
		return e.apply(t, n.concat(Mt.call(arguments)));
	};
}
var Qt = Ft && W(Ft.bind) ? Ft.call.bind(Ft.bind) : Zt;
function $t(e) {
	var t = [...arguments].slice(1);
	return function() {
		return e.apply(this, t.concat(Mt.call(arguments)));
	};
}
function U(e) {
	return Array.isArray ? Array.isArray(e) : Ot.call(e) === "[object Array]";
}
function W(e) {
	return typeof e == "function";
}
function G(e) {
	return typeof e == "string";
}
function en(e) {
	return Ot.call(e) === "[object String]";
}
function tn(e) {
	return typeof e == "number";
}
function K(e) {
	var t = typeof e;
	return t === "function" || !!e && t === "object";
}
function nn(e) {
	return !!Et[Ot.call(e)];
}
function rn(e) {
	return !!Dt[Ot.call(e)];
}
function an(e) {
	return typeof e == "object" && typeof e.nodeType == "number" && typeof e.ownerDocument == "object";
}
function on(e) {
	return e.colorStops != null;
}
function sn(e) {
	return e.image != null;
}
function cn(e) {
	return e !== e;
}
function ln() {
	for (var e = [...arguments], t = 0, n = e.length; t < n; t++) if (e[t] != null) return e[t];
}
function q(e, t) {
	return e ?? t;
}
function un(e, t, n) {
	return e ?? t ?? n;
}
function dn(e) {
	var t = [...arguments].slice(1);
	return Mt.apply(e, t);
}
function fn(e) {
	if (typeof e == "number") return [
		e,
		e,
		e,
		e
	];
	var t = e.length;
	return t === 2 ? [
		e[0],
		e[1],
		e[0],
		e[1]
	] : t === 3 ? [
		e[0],
		e[1],
		e[2],
		e[1]
	] : e;
}
function pn(e, t) {
	if (!e) throw Error(t);
}
function mn(e) {
	return e == null ? null : typeof e.trim == "function" ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}
var hn = "__ec_primitive__";
function gn(e) {
	e[hn] = !0;
}
function _n(e) {
	return e[hn];
}
var vn = function() {
	function e() {
		this.data = {};
	}
	return e.prototype.delete = function(e) {
		var t = this.has(e);
		return t && delete this.data[e], t;
	}, e.prototype.has = function(e) {
		return this.data.hasOwnProperty(e);
	}, e.prototype.get = function(e) {
		return this.data[e];
	}, e.prototype.set = function(e, t) {
		return this.data[e] = t, this;
	}, e.prototype.keys = function() {
		return Xt(this.data);
	}, e.prototype.forEach = function(e) {
		var t = this.data;
		for (var n in t) t.hasOwnProperty(n) && e(t[n], n);
	}, e;
}(), yn = typeof Map == "function";
function bn() {
	return yn ? /* @__PURE__ */ new Map() : new vn();
}
var xn = function() {
	function e(t) {
		var n = U(t);
		this.data = bn();
		var r = this;
		t instanceof e ? t.each(i) : t && V(t, i);
		function i(e, t) {
			n ? r.set(e, t) : r.set(t, e);
		}
	}
	return e.prototype.hasKey = function(e) {
		return this.data.has(e);
	}, e.prototype.get = function(e) {
		return this.data.get(e);
	}, e.prototype.set = function(e, t) {
		return this.data.set(e, t), t;
	}, e.prototype.each = function(e, t) {
		this.data.forEach(function(n, r) {
			e.call(t, n, r);
		});
	}, e.prototype.keys = function() {
		var e = this.data.keys();
		return yn ? Array.from(e) : e;
	}, e.prototype.removeKey = function(e) {
		this.data.delete(e);
	}, e;
}();
function J(e) {
	return new xn(e);
}
function Sn(e, t) {
	for (var n = new e.constructor(e.length + t.length), r = 0; r < e.length; r++) n[r] = e[r];
	for (var i = e.length, r = 0; r < t.length; r++) n[r + i] = t[r];
	return n;
}
function Cn(e, t) {
	var n;
	if (Object.create) n = Object.create(e);
	else {
		var r = function() {};
		r.prototype = e, n = new r();
	}
	return t && B(n, t), n;
}
function wn(e) {
	var t = e.style;
	t.webkitUserSelect = "none", t.userSelect = "none", t.webkitTapHighlightColor = "rgba(0,0,0,0)", t["-webkit-touch-callout"] = "none";
}
function Tn(e, t) {
	return e.hasOwnProperty(t);
}
function En() {}
var Dn = 180 / Math.PI;
// node_modules/zrender/lib/core/vector.js
function On(e, t) {
	return e ??= 0, t ??= 0, [e, t];
}
function kn(e) {
	return [e[0], e[1]];
}
function An(e, t, n) {
	return e[0] = t, e[1] = n, e;
}
function jn(e, t, n) {
	return e[0] = t[0] + n[0], e[1] = t[1] + n[1], e;
}
function Mn(e, t, n) {
	return e[0] = t[0] - n[0], e[1] = t[1] - n[1], e;
}
function Nn(e) {
	return Math.sqrt(Pn(e));
}
function Pn(e) {
	return e[0] * e[0] + e[1] * e[1];
}
function Fn(e, t, n) {
	return e[0] = t[0] * n, e[1] = t[1] * n, e;
}
function In(e, t) {
	var n = Nn(t);
	return n === 0 ? (e[0] = 0, e[1] = 0) : (e[0] = t[0] / n, e[1] = t[1] / n), e;
}
function Ln(e, t) {
	return Math.sqrt((e[0] - t[0]) * (e[0] - t[0]) + (e[1] - t[1]) * (e[1] - t[1]));
}
var Rn = Ln;
function zn(e, t) {
	return (e[0] - t[0]) * (e[0] - t[0]) + (e[1] - t[1]) * (e[1] - t[1]);
}
var Bn = zn;
function Vn(e, t, n, r) {
	return e[0] = t[0] + r * (n[0] - t[0]), e[1] = t[1] + r * (n[1] - t[1]), e;
}
function Hn(e, t, n) {
	var r = t[0], i = t[1];
	return e[0] = n[0] * r + n[2] * i + n[4], e[1] = n[1] * r + n[3] * i + n[5], e;
}
function Un(e, t, n) {
	return e[0] = Math.min(t[0], n[0]), e[1] = Math.min(t[1], n[1]), e;
}
function Wn(e, t, n) {
	return e[0] = Math.max(t[0], n[0]), e[1] = Math.max(t[1], n[1]), e;
}
// node_modules/zrender/lib/mixin/Draggable.js
var Gn = function() {
	function e(e, t) {
		this.target = e, this.topTarget = t && t.topTarget;
	}
	return e;
}(), Kn = function() {
	function e(e) {
		this.handler = e, e.on("mousedown", this._dragStart, this), e.on("mousemove", this._drag, this), e.on("mouseup", this._dragEnd, this);
	}
	return e.prototype._dragStart = function(e) {
		for (var t = e.target; t && !t.draggable;) t = t.parent || t.__hostTarget;
		t && (this._draggingTarget = t, t.dragging = !0, this._x = e.offsetX, this._y = e.offsetY, this.handler.dispatchToElement(new Gn(t, e), "dragstart", e.event));
	}, e.prototype._drag = function(e) {
		var t = this._draggingTarget;
		if (t) {
			var n = e.offsetX, r = e.offsetY, i = n - this._x, a = r - this._y;
			this._x = n, this._y = r, t.drift(i, a, e), this.handler.dispatchToElement(new Gn(t, e), "drag", e.event);
			var o = this.handler.findHover(n, r, t).target, s = this._dropTarget;
			this._dropTarget = o, t !== o && (s && o !== s && this.handler.dispatchToElement(new Gn(s, e), "dragleave", e.event), o && o !== s && this.handler.dispatchToElement(new Gn(o, e), "dragenter", e.event));
		}
	}, e.prototype._dragEnd = function(e) {
		var t = this._draggingTarget;
		t && (t.dragging = !1), this.handler.dispatchToElement(new Gn(t, e), "dragend", e.event), this._dropTarget && this.handler.dispatchToElement(new Gn(this._dropTarget, e), "drop", e.event), this._draggingTarget = null, this._dropTarget = null;
	}, e;
}(), qn = function() {
	function e(e) {
		e && (this._$eventProcessor = e);
	}
	return e.prototype.on = function(e, t, n, r) {
		this._$handlers ||= {};
		var i = this._$handlers;
		if (typeof t == "function" && (r = n, n = t, t = null), !n || !e) return this;
		var a = this._$eventProcessor;
		t != null && a && a.normalizeQuery && (t = a.normalizeQuery(t)), i[e] || (i[e] = []);
		for (var o = 0; o < i[e].length; o++) if (i[e][o].h === n) return this;
		var s = {
			h: n,
			query: t,
			ctx: r || this,
			callAtLast: n.zrEventfulCallAtLast
		}, c = i[e].length - 1, l = i[e][c];
		return l && l.callAtLast ? i[e].splice(c, 0, s) : i[e].push(s), this;
	}, e.prototype.isSilent = function(e) {
		var t = this._$handlers;
		return !t || !t[e] || !t[e].length;
	}, e.prototype.off = function(e, t) {
		var n = this._$handlers;
		if (!n) return this;
		if (!e) return this._$handlers = {}, this;
		if (t) {
			if (n[e]) {
				for (var r = [], i = 0, a = n[e].length; i < a; i++) n[e][i].h !== t && r.push(n[e][i]);
				n[e] = r;
			}
			n[e] && n[e].length === 0 && delete n[e];
		} else delete n[e];
		return this;
	}, e.prototype.trigger = function(e) {
		var t = [...arguments].slice(1);
		if (!this._$handlers) return this;
		var n = this._$handlers[e], r = this._$eventProcessor;
		if (n) for (var i = t.length, a = n.length, o = 0; o < a; o++) {
			var s = n[o];
			if (!(r && r.filter && s.query != null && !r.filter(e, s.query))) switch (i) {
				case 0:
					s.h.call(s.ctx);
					break;
				case 1:
					s.h.call(s.ctx, t[0]);
					break;
				case 2:
					s.h.call(s.ctx, t[0], t[1]);
					break;
				default: s.h.apply(s.ctx, t);
			}
		}
		return r && r.afterTrigger && r.afterTrigger(e), this;
	}, e.prototype.triggerWithContext = function(e) {
		var t = [...arguments].slice(1);
		if (!this._$handlers) return this;
		var n = this._$handlers[e], r = this._$eventProcessor;
		if (n) for (var i = t.length, a = t[i - 1], o = n.length, s = 0; s < o; s++) {
			var c = n[s];
			if (!(r && r.filter && c.query != null && !r.filter(e, c.query))) switch (i) {
				case 0:
					c.h.call(a);
					break;
				case 1:
					c.h.call(a, t[0]);
					break;
				case 2:
					c.h.call(a, t[0], t[1]);
					break;
				default: c.h.apply(a, t.slice(1, i - 1));
			}
		}
		return r && r.afterTrigger && r.afterTrigger(e), this;
	}, e;
}(), Jn = Math.log(2);
function Yn(e, t, n, r, i, a) {
	var o = r + "-" + i, s = e.length;
	if (a.hasOwnProperty(o)) return a[o];
	if (t === 1) {
		var c = Math.round(Math.log((1 << s) - 1 & ~i) / Jn);
		return e[n][c];
	}
	for (var l = r | 1 << n, u = n + 1; r & 1 << u;) u++;
	for (var d = 0, f = 0, p = 0; f < s; f++) {
		var m = 1 << f;
		m & i || (d += (p % 2 ? -1 : 1) * e[n][f] * Yn(e, t - 1, u, l, i | m, a), p++);
	}
	return a[o] = d, d;
}
function Xn(e, t) {
	var n = [
		[
			e[0],
			e[1],
			1,
			0,
			0,
			0,
			-t[0] * e[0],
			-t[0] * e[1]
		],
		[
			0,
			0,
			0,
			e[0],
			e[1],
			1,
			-t[1] * e[0],
			-t[1] * e[1]
		],
		[
			e[2],
			e[3],
			1,
			0,
			0,
			0,
			-t[2] * e[2],
			-t[2] * e[3]
		],
		[
			0,
			0,
			0,
			e[2],
			e[3],
			1,
			-t[3] * e[2],
			-t[3] * e[3]
		],
		[
			e[4],
			e[5],
			1,
			0,
			0,
			0,
			-t[4] * e[4],
			-t[4] * e[5]
		],
		[
			0,
			0,
			0,
			e[4],
			e[5],
			1,
			-t[5] * e[4],
			-t[5] * e[5]
		],
		[
			e[6],
			e[7],
			1,
			0,
			0,
			0,
			-t[6] * e[6],
			-t[6] * e[7]
		],
		[
			0,
			0,
			0,
			e[6],
			e[7],
			1,
			-t[7] * e[6],
			-t[7] * e[7]
		]
	], r = {}, i = Yn(n, 8, 0, 0, 0, r);
	if (i !== 0) {
		for (var a = [], o = 0; o < 8; o++) for (var s = 0; s < 8; s++) a[s] ?? (a[s] = 0), a[s] += ((o + s) % 2 ? -1 : 1) * Yn(n, 7, +(o === 0), 1 << o, 1 << s, r) / i * t[o];
		return function(e, t, n) {
			var r = t * a[6] + n * a[7] + 1;
			e[0] = (t * a[0] + n * a[1] + a[2]) / r, e[1] = (t * a[3] + n * a[4] + a[5]) / r;
		};
	}
}
// node_modules/zrender/lib/core/dom.js
var Zn = "___zrEVENTSAVED", Qn = [];
function $n(e, t, n, r, i) {
	return tr(Qn, t, r, i, !0) && tr(e, n, Qn[0], Qn[1]);
}
function er(e, t) {
	e && n(e), t && n(t);
	function n(e) {
		var t = e[Zn];
		t && (t.clearMarkers && t.clearMarkers(), delete e[Zn]);
	}
}
function tr(e, t, n, r, i) {
	if (t.getBoundingClientRect && R.domSupported && !ir(t)) {
		var a = t[Zn] || (t[Zn] = {}), o = rr(nr(t, a), a, i);
		if (o) return o(e, n, r), !0;
	}
	return !1;
}
function nr(e, t) {
	var n = t.markers;
	if (n) return n;
	n = t.markers = [];
	for (var r = ["left", "right"], i = ["top", "bottom"], a = 0; a < 4; a++) {
		var o = document.createElement("div"), s = o.style, c = a % 2, l = (a >> 1) % 2;
		s.cssText = [
			"position: absolute",
			"visibility: hidden",
			"padding: 0",
			"margin: 0",
			"border-width: 0",
			"user-select: none",
			"width:0",
			"height:0",
			r[c] + ":0",
			i[l] + ":0",
			r[1 - c] + ":auto",
			i[1 - l] + ":auto",
			""
		].join("!important;"), e.appendChild(o), n.push(o);
	}
	return t.clearMarkers = function() {
		V(n, function(e) {
			e.parentNode && e.parentNode.removeChild(e);
		});
	}, n;
}
function rr(e, t, n) {
	for (var r = n ? "invTrans" : "trans", i = t[r], a = t.srcCoords, o = [], s = [], c = !0, l = 0; l < 4; l++) {
		var u = e[l].getBoundingClientRect(), d = 2 * l, f = u.left, p = u.top;
		o.push(f, p), c = c && a && f === a[d] && p === a[d + 1], s.push(e[l].offsetLeft, e[l].offsetTop);
	}
	return c && i ? i : (t.srcCoords = o, t[r] = n ? Xn(s, o) : Xn(o, s));
}
function ir(e) {
	return e.nodeName.toUpperCase() === "CANVAS";
}
var ar = /([&<>"'])/g, or = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
};
function sr(e) {
	return e == null ? "" : (e + "").replace(ar, function(e, t) {
		return or[t];
	});
}
// node_modules/zrender/lib/core/event.js
var cr = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, lr = [], ur = R.browser.firefox && +R.browser.version.split(".")[0] < 39;
function dr(e, t, n, r) {
	return n ||= {}, r ? fr(e, t, n) : ur && t.layerX != null && t.layerX !== t.offsetX ? (n.zrX = t.layerX, n.zrY = t.layerY) : t.offsetX == null ? fr(e, t, n) : (n.zrX = t.offsetX, n.zrY = t.offsetY), n;
}
function fr(e, t, n) {
	if (R.domSupported && e.getBoundingClientRect) {
		var r = t.clientX, i = t.clientY;
		if (ir(e)) {
			var a = e.getBoundingClientRect();
			n.zrX = r - a.left, n.zrY = i - a.top;
			return;
		}
		if (tr(lr, e, r, i)) {
			n.zrX = lr[0], n.zrY = lr[1];
			return;
		}
	}
	n.zrX = n.zrY = 0;
}
function pr(e) {
	return e || window.event;
}
function mr(e, t, n) {
	if (t = pr(t), t.zrX != null) return t;
	var r = t.type;
	if (r && r.indexOf("touch") >= 0) {
		var i = r === "touchend" ? t.changedTouches[0] : t.targetTouches[0];
		i && dr(e, i, t, n);
	} else {
		dr(e, t, t, n);
		var a = hr(t);
		t.zrDelta = a ? a / 120 : -(t.detail || 0) / 3;
	}
	var o = t.button;
	return t.which == null && o !== void 0 && cr.test(t.type) && (t.which = o & 1 ? 1 : o & 2 ? 3 : o & 4 ? 2 : 0), t;
}
function hr(e) {
	var t = e.wheelDelta;
	if (t) return t;
	var n = e.deltaX, r = e.deltaY;
	if (n == null || r == null) return t;
	var i = Math.abs(r === 0 ? n : r), a = r > 0 ? -1 : r < 0 ? 1 : n > 0 ? -1 : 1;
	return 3 * i * a;
}
function gr(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function _r(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
var vr = function(e) {
	e.preventDefault(), e.stopPropagation(), e.cancelBubble = !0;
}, yr = function() {
	function e() {
		this._track = [];
	}
	return e.prototype.recognize = function(e, t, n) {
		return this._doTrack(e, t, n), this._recognize(e);
	}, e.prototype.clear = function() {
		return this._track.length = 0, this;
	}, e.prototype._doTrack = function(e, t, n) {
		var r = e.touches;
		if (r) {
			for (var i = {
				points: [],
				touches: [],
				target: t,
				event: e
			}, a = 0, o = r.length; a < o; a++) {
				var s = r[a], c = dr(n, s, {});
				i.points.push([c.zrX, c.zrY]), i.touches.push(s);
			}
			this._track.push(i);
		}
	}, e.prototype._recognize = function(e) {
		for (var t in Sr) if (Sr.hasOwnProperty(t)) {
			var n = Sr[t](this._track, e);
			if (n) return n;
		}
	}, e;
}();
function br(e) {
	var t = e[1][0] - e[0][0], n = e[1][1] - e[0][1];
	return Math.sqrt(t * t + n * n);
}
function xr(e) {
	return [(e[0][0] + e[1][0]) / 2, (e[0][1] + e[1][1]) / 2];
}
var Sr = { pinch: function(e, t) {
	var n = e.length;
	if (n) {
		var r = (e[n - 1] || {}).points, i = (e[n - 2] || {}).points || r;
		if (i && i.length > 1 && r && r.length > 1) {
			var a = br(r) / br(i);
			!isFinite(a) && (a = 1), t.pinchScale = a;
			var o = xr(r);
			return t.pinchX = o[0], t.pinchY = o[1], {
				type: "pinch",
				target: e[0].target,
				event: t
			};
		}
	}
} };
// node_modules/zrender/lib/core/matrix.js
function Cr() {
	return [
		1,
		0,
		0,
		1,
		0,
		0
	];
}
function wr(e) {
	return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 1, e[4] = 0, e[5] = 0, e;
}
function Tr(e, t) {
	return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e;
}
function Er(e, t, n) {
	var r = t[0] * n[0] + t[2] * n[1], i = t[1] * n[0] + t[3] * n[1], a = t[0] * n[2] + t[2] * n[3], o = t[1] * n[2] + t[3] * n[3], s = t[0] * n[4] + t[2] * n[5] + t[4], c = t[1] * n[4] + t[3] * n[5] + t[5];
	return e[0] = r, e[1] = i, e[2] = a, e[3] = o, e[4] = s, e[5] = c, e;
}
function Dr(e, t, n) {
	return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4] + n[0], e[5] = t[5] + n[1], e;
}
function Or(e, t, n, r) {
	r === void 0 && (r = [0, 0]);
	var i = t[0], a = t[2], o = t[4], s = t[1], c = t[3], l = t[5], u = Math.sin(n), d = Math.cos(n);
	return e[0] = i * d + s * u, e[1] = -i * u + s * d, e[2] = a * d + c * u, e[3] = -a * u + d * c, e[4] = d * (o - r[0]) + u * (l - r[1]) + r[0], e[5] = d * (l - r[1]) - u * (o - r[0]) + r[1], e;
}
function kr(e, t, n) {
	var r = n[0], i = n[1];
	return e[0] = t[0] * r, e[1] = t[1] * i, e[2] = t[2] * r, e[3] = t[3] * i, e[4] = t[4] * r, e[5] = t[5] * i, e;
}
function Ar(e, t) {
	var n = t[0], r = t[2], i = t[4], a = t[1], o = t[3], s = t[5], c = n * o - a * r;
	return c ? (c = 1 / c, e[0] = o * c, e[1] = -a * c, e[2] = -r * c, e[3] = n * c, e[4] = (r * s - o * i) * c, e[5] = (a * i - n * s) * c, e) : null;
}
// node_modules/zrender/lib/core/Point.js
var Y = function() {
	function e(e, t) {
		this.x = e || 0, this.y = t || 0;
	}
	return e.prototype.copy = function(e) {
		return this.x = e.x, this.y = e.y, this;
	}, e.prototype.clone = function() {
		return new e(this.x, this.y);
	}, e.prototype.set = function(e, t) {
		return this.x = e, this.y = t, this;
	}, e.prototype.equal = function(e) {
		return e.x === this.x && e.y === this.y;
	}, e.prototype.add = function(e) {
		return this.x += e.x, this.y += e.y, this;
	}, e.prototype.scale = function(e) {
		this.x *= e, this.y *= e;
	}, e.prototype.scaleAndAdd = function(e, t) {
		this.x += e.x * t, this.y += e.y * t;
	}, e.prototype.sub = function(e) {
		return this.x -= e.x, this.y -= e.y, this;
	}, e.prototype.dot = function(e) {
		return this.x * e.x + this.y * e.y;
	}, e.prototype.len = function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}, e.prototype.lenSquare = function() {
		return this.x * this.x + this.y * this.y;
	}, e.prototype.normalize = function() {
		var e = this.len();
		return this.x /= e, this.y /= e, this;
	}, e.prototype.distance = function(e) {
		var t = this.x - e.x, n = this.y - e.y;
		return Math.sqrt(t * t + n * n);
	}, e.prototype.distanceSquare = function(e) {
		var t = this.x - e.x, n = this.y - e.y;
		return t * t + n * n;
	}, e.prototype.negate = function() {
		return this.x = -this.x, this.y = -this.y, this;
	}, e.prototype.transform = function(e) {
		if (e) {
			var t = this.x, n = this.y;
			return this.x = e[0] * t + e[2] * n + e[4], this.y = e[1] * t + e[3] * n + e[5], this;
		}
	}, e.prototype.toArray = function(e) {
		return e[0] = this.x, e[1] = this.y, e;
	}, e.prototype.fromArray = function(e) {
		this.x = e[0], this.y = e[1];
	}, e.set = function(e, t, n) {
		e.x = t, e.y = n;
	}, e.copy = function(e, t) {
		e.x = t.x, e.y = t.y;
	}, e.len = function(e) {
		return Math.sqrt(e.x * e.x + e.y * e.y);
	}, e.lenSquare = function(e) {
		return e.x * e.x + e.y * e.y;
	}, e.dot = function(e, t) {
		return e.x * t.x + e.y * t.y;
	}, e.add = function(e, t, n) {
		e.x = t.x + n.x, e.y = t.y + n.y;
	}, e.sub = function(e, t, n) {
		e.x = t.x - n.x, e.y = t.y - n.y;
	}, e.scale = function(e, t, n) {
		e.x = t.x * n, e.y = t.y * n;
	}, e.scaleAndAdd = function(e, t, n, r) {
		e.x = t.x + n.x * r, e.y = t.y + n.y * r;
	}, e.lerp = function(e, t, n, r) {
		var i = 1 - r;
		e.x = i * t.x + r * n.x, e.y = i * t.y + r * n.y;
	}, e;
}(), jr = Math.min, Mr = Math.max, Nr = Math.abs, Pr = ["x", "y"], Fr = ["width", "height"], Ir = new Y(), Lr = new Y(), Rr = new Y(), zr = new Y(), Br = Zr(), Vr = Br.minTv, Hr = Br.maxTv, Ur = [0, 0], X = function() {
	function e(e, t, n, r) {
		Wr(this, e, t, n, r);
	}
	return e.set = function(e, t, n, r, i) {
		return r < 0 && (t += r, r = -r), i < 0 && (n += i, i = -i), e.x = t, e.y = n, e.width = r, e.height = i, e;
	}, e.prototype.union = function(e) {
		var t = jr(e.x, this.x), n = jr(e.y, this.y);
		this.width = isFinite(this.x) && isFinite(this.width) ? Mr(e.x + e.width, this.x + this.width) - t : e.width, this.height = isFinite(this.y) && isFinite(this.height) ? Mr(e.y + e.height, this.y + this.height) - n : e.height, this.x = t, this.y = n;
	}, e.prototype.applyTransform = function(t) {
		e.applyTransform(this, this, t);
	}, e.prototype.calculateTransform = function(e) {
		return Kr(Cr(), this, e);
	}, e.prototype.intersect = function(t, n, r) {
		return e.intersect(this, t, n, r);
	}, e.intersect = function(t, n, r, i) {
		r && Y.set(r, 0, 0);
		var a = i && i.outIntersectRect || null, o = i && i.clamp;
		if (a && (a.x = a.y = a.width = a.height = NaN), !t || !n) return !1;
		t instanceof e || (t = Wr(qr, t.x, t.y, t.width, t.height)), n instanceof e || (n = Wr(Jr, n.x, n.y, n.width, n.height));
		var s = !!r;
		Br.reset(i, s);
		var c = Br.touchThreshold, l = t.x + c, u = t.x + t.width - c, d = t.y + c, f = t.y + t.height - c, p = n.x + c, m = n.x + n.width - c, h = n.y + c, g = n.y + n.height - c;
		if (l > u || d > f || p > m || h > g) return !1;
		var _ = !(u < p || m < l || f < h || g < d);
		return (s || a) && (Ur[0] = Infinity, Ur[1] = 0, Xr(l, u, p, m, 0, s, a, o), Xr(d, f, h, g, 1, s, a, o), s && Y.copy(r, _ ? Br.useDir ? Br.dirMinTv : Vr : Hr)), _;
	}, e.contain = function(e, t, n) {
		return t >= e.x && t <= e.x + e.width && n >= e.y && n <= e.y + e.height;
	}, e.prototype.contain = function(t, n) {
		return e.contain(this, t, n);
	}, e.prototype.clone = function() {
		return new e(this.x, this.y, this.width, this.height);
	}, e.prototype.copy = function(e) {
		Gr(this, e);
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
	}, e.copy = function(e, t) {
		return e.x = t.x, e.y = t.y, e.width = t.width, e.height = t.height, e;
	}, e.applyTransform = function(e, t, n) {
		if (!n) e !== t && Gr(e, t);
		else if (n[1] < 1e-5 && n[1] > -1e-5 && n[2] < 1e-5 && n[2] > -1e-5) {
			var r = n[0], i = n[3], a = n[4], o = n[5];
			e.x = t.x * r + a, e.y = t.y * i + o, e.width = t.width * r, e.height = t.height * i, e.width < 0 && (e.x += e.width, e.width = -e.width), e.height < 0 && (e.y += e.height, e.height = -e.height);
		} else {
			Ir.x = Rr.x = t.x, Ir.y = zr.y = t.y, Lr.x = zr.x = t.x + t.width, Lr.y = Rr.y = t.y + t.height, Ir.transform(n), zr.transform(n), Lr.transform(n), Rr.transform(n), e.x = jr(Ir.x, Lr.x, Rr.x, zr.x), e.y = jr(Ir.y, Lr.y, Rr.y, zr.y);
			var s = Mr(Ir.x, Lr.x, Rr.x, zr.x), c = Mr(Ir.y, Lr.y, Rr.y, zr.y);
			e.width = s - e.x, e.height = c - e.y;
		}
	}, e.calculateTransform = function(e, t, n) {
		var r = n.width / t.width, i = n.height / t.height;
		return e = wr(e || []), Dr(e, e, An(Yr, -t.x, -t.y)), kr(e, e, An(Yr, r, i)), Dr(e, e, An(Yr, n.x, n.y)), e;
	}, e;
}();
X.create;
var Wr = X.set, Gr = X.copy, Kr = X.calculateTransform;
X.applyTransform, X.contain;
var qr = new X(0, 0, 0, 0), Jr = new X(0, 0, 0, 0), Yr = [];
function Xr(e, t, n, r, i, a, o, s) {
	var c = Nr(t - n), l = Nr(r - e), u = jr(c, l), d = Pr[i], f = Pr[1 - i], p = Fr[i];
	t < n || r < e ? c < l ? (a && (Hr[d] = -c), s && (o[d] = t, o[p] = 0)) : (a && (Hr[d] = l), s && (o[d] = e, o[p] = 0)) : (o && (o[d] = Mr(e, n), o[p] = jr(t, r) - o[d]), a && (u < Ur[0] || Br.useDir) && (Ur[0] = jr(u, Ur[0]), (c < l || !Br.bidirectional) && (Vr[d] = c, Vr[f] = 0, Br.useDir && Br.calcDirMTV()), (c >= l || !Br.bidirectional) && (Vr[d] = -l, Vr[f] = 0, Br.useDir && Br.calcDirMTV())));
}
function Zr() {
	var e = 0, t = new Y(), n = new Y(), r = {
		minTv: new Y(),
		maxTv: new Y(),
		useDir: !1,
		dirMinTv: new Y(),
		touchThreshold: 0,
		bidirectional: !0,
		negativeSize: !1,
		reset: function(i, a) {
			r.touchThreshold = 0, i && i.touchThreshold != null && (r.touchThreshold = Mr(0, i.touchThreshold)), r.negativeSize = !1, a && (r.minTv.set(Infinity, Infinity), r.maxTv.set(0, 0), r.useDir = !1, i && i.direction != null && (r.useDir = !0, r.dirMinTv.copy(r.minTv), n.copy(r.minTv), e = i.direction, r.bidirectional = i.bidirectional == null || !!i.bidirectional, r.bidirectional || t.set(Math.cos(e), Math.sin(e))));
		},
		calcDirMTV: function() {
			var a = r.minTv, o = r.dirMinTv, s = a.y * a.y + a.x * a.x, c = Math.sin(e), l = Math.cos(e), u = c * a.y + l * a.x;
			i(u) ? i(a.x) && i(a.y) && o.set(0, 0) : (n.x = s * l / u, n.y = s * c / u, i(n.x) && i(n.y) ? o.set(0, 0) : (r.bidirectional || t.dot(n) > 0) && n.len() < o.len() && o.copy(n));
		}
	};
	function i(e) {
		return Nr(e) < 1e-10;
	}
	return r;
}
// node_modules/zrender/lib/Handler.js
var Qr = "silent";
function $r(e, t, n) {
	return {
		type: e,
		event: n,
		target: t.target,
		topTarget: t.topTarget,
		cancelBubble: !1,
		offsetX: n.zrX,
		offsetY: n.zrY,
		gestureEvent: n.gestureEvent,
		pinchX: n.pinchX,
		pinchY: n.pinchY,
		pinchScale: n.pinchScale,
		wheelDelta: n.zrDelta,
		zrByTouch: n.zrByTouch,
		which: n.which,
		stop: ei
	};
}
function ei() {
	vr(this.event);
}
var ti = function(e) {
	L(t, e);
	function t() {
		var t = e !== null && e.apply(this, arguments) || this;
		return t.handler = null, t;
	}
	return t.prototype.dispose = function() {}, t.prototype.setCursor = function() {}, t;
}(qn), ni = function() {
	function e(e, t) {
		this.x = e, this.y = t;
	}
	return e;
}(), ri = [
	"click",
	"dblclick",
	"mousewheel",
	"mouseout",
	"mouseup",
	"mousedown",
	"mousemove",
	"contextmenu"
], ii = new X(0, 0, 0, 0), ai = function(e) {
	L(t, e);
	function t(t, n, r, i, a) {
		var o = e.call(this) || this;
		return o._hovered = new ni(0, 0), o.storage = t, o.painter = n, o.painterRoot = i, o._pointerSize = a, r ||= new ti(), o.proxy = null, o.setHandlerProxy(r), o._draggingMgr = new Kn(o), o;
	}
	return t.prototype.setHandlerProxy = function(e) {
		this.proxy && this.proxy.dispose(), e && (V(ri, function(t) {
			e.on && e.on(t, this[t], this);
		}, this), e.handler = this), this.proxy = e;
	}, t.prototype.mousemove = function(e) {
		var t = e.zrX, n = e.zrY, r = ci(this, t, n), i = this._hovered, a = i.target;
		a && !a.__zr && (i = this.findHover(i.x, i.y), a = i.target);
		var o = this._hovered = r ? new ni(t, n) : this.findHover(t, n), s = o.target, c = this.proxy;
		c.setCursor && c.setCursor(s ? s.cursor : "default"), a && s !== a && this.dispatchToElement(i, "mouseout", e), this.dispatchToElement(o, "mousemove", e), s && s !== a && this.dispatchToElement(o, "mouseover", e);
	}, t.prototype.mouseout = function(e) {
		var t = e.zrEventControl;
		t !== "only_globalout" && this.dispatchToElement(this._hovered, "mouseout", e), t !== "no_globalout" && this.trigger("globalout", {
			type: "globalout",
			event: e
		});
	}, t.prototype.resize = function() {
		this._hovered = new ni(0, 0);
	}, t.prototype.dispatch = function(e, t) {
		var n = this[e];
		n && n.call(this, t);
	}, t.prototype.dispose = function() {
		this.proxy.dispose(), this.storage = null, this.proxy = null, this.painter = null;
	}, t.prototype.setCursorStyle = function(e) {
		var t = this.proxy;
		t.setCursor && t.setCursor(e);
	}, t.prototype.dispatchToElement = function(e, t, n) {
		e ||= {};
		var r = e.target;
		if (!(r && r.silent)) {
			for (var i = "on" + t, a = $r(t, e, n); r && (r[i] && (a.cancelBubble = !!r[i].call(r, a)), r.trigger(t, a), r = r.__hostTarget ? r.__hostTarget : r.parent, !a.cancelBubble););
			a.cancelBubble || (this.trigger(t, a), this.painter && this.painter.eachOtherLayer && this.painter.eachOtherLayer(function(e) {
				typeof e[i] == "function" && e[i].call(e, a), e.trigger && e.trigger(t, a);
			}));
		}
	}, t.prototype.findHover = function(e, t, n) {
		var r = this.storage.getDisplayList(), i = new ni(e, t);
		if (si(r, i, e, t, n), this._pointerSize && !i.target) {
			for (var a = [], o = this._pointerSize, s = o / 2, c = new X(e - s, t - s, o, o), l = r.length - 1; l >= 0; l--) {
				var u = r[l];
				u === n || u.ignore || u.ignoreCoarsePointer || u.parent && u.parent.ignoreCoarsePointer || (ii.copy(u.getBoundingRect()), u.transform && ii.applyTransform(u.transform), ii.intersect(c) && a.push(u));
			}
			if (a.length) {
				for (var d = 4, f = Math.PI / 12, p = Math.PI * 2, m = 0; m < s; m += d) for (var h = 0; h < p; h += f) if (si(a, i, e + m * Math.cos(h), t + m * Math.sin(h), n), i.target) return i;
			}
		}
		return i;
	}, t.prototype.processGesture = function(e, t) {
		this._gestureMgr ||= new yr();
		var n = this._gestureMgr;
		t === "start" && n.clear();
		var r = n.recognize(e, this.findHover(e.zrX, e.zrY, null).target, this.proxy.dom);
		if (t === "end" && n.clear(), r) {
			var i = r.type;
			e.gestureEvent = i;
			var a = new ni();
			a.target = r.target, this.dispatchToElement(a, i, r.event);
		}
	}, t;
}(qn);
V([
	"click",
	"mousedown",
	"mouseup",
	"mousewheel",
	"dblclick",
	"contextmenu"
], function(e) {
	ai.prototype[e] = function(t) {
		var n = t.zrX, r = t.zrY, i = ci(this, n, r), a, o;
		if (e === "mouseup" && i || (a = this.findHover(n, r), o = a.target), e === "mousedown") this._downEl = o, this._downPoint = [t.zrX, t.zrY], this._upEl = o;
		else if (e === "mouseup") this._upEl = o;
		else if (e === "click") {
			if (this._downEl !== this._upEl || !this._downPoint || Rn(this._downPoint, [t.zrX, t.zrY]) > 4) return;
			this._downPoint = null;
		}
		this.dispatchToElement(a, e, t);
	};
});
function oi(e, t, n) {
	if (e[e.rectHover ? "rectContain" : "contain"](t, n)) {
		for (var r = e, i = void 0, a = !1; r;) {
			if (r.ignoreClip && (a = !0), !a) {
				var o = r.getClipPath();
				if (o && !o.contain(t, n)) return !1;
			}
			r.silent && (i = !0);
			var s = r.__hostTarget;
			r = s ? r.ignoreHostSilent ? null : s : r.parent;
		}
		return !i || Qr;
	}
	return !1;
}
function si(e, t, n, r, i) {
	for (var a = e.length - 1; a >= 0; a--) {
		var o = e[a], s = void 0;
		if (o !== i && !o.ignore && (s = oi(o, n, r)) && (!t.topTarget && (t.topTarget = o), s !== Qr)) {
			t.target = o;
			break;
		}
	}
}
function ci(e, t, n) {
	var r = e.painter;
	return t < 0 || t > r.getWidth() || n < 0 || n > r.getHeight();
}
// node_modules/zrender/lib/core/timsort.js
var li = 32, ui = 7;
function di(e) {
	for (var t = 0; e >= li;) t |= e & 1, e >>= 1;
	return e + t;
}
function fi(e, t, n, r) {
	var i = t + 1;
	if (i === n) return 1;
	if (r(e[i++], e[t]) < 0) {
		for (; i < n && r(e[i], e[i - 1]) < 0;) i++;
		pi(e, t, i);
	} else for (; i < n && r(e[i], e[i - 1]) >= 0;) i++;
	return i - t;
}
function pi(e, t, n) {
	for (n--; t < n;) {
		var r = e[t];
		e[t++] = e[n], e[n--] = r;
	}
}
function mi(e, t, n, r, i) {
	for (r === t && r++; r < n; r++) {
		for (var a = e[r], o = t, s = r, c; o < s;) c = o + s >>> 1, i(a, e[c]) < 0 ? s = c : o = c + 1;
		var l = r - o;
		switch (l) {
			case 3: e[o + 3] = e[o + 2];
			case 2: e[o + 2] = e[o + 1];
			case 1:
				e[o + 1] = e[o];
				break;
			default: for (; l > 0;) e[o + l] = e[o + l - 1], l--;
		}
		e[o] = a;
	}
}
function hi(e, t, n, r, i, a) {
	var o = 0, s = 0, c = 1;
	if (a(e, t[n + i]) > 0) {
		for (s = r - i; c < s && a(e, t[n + i + c]) > 0;) o = c, c = (c << 1) + 1, c <= 0 && (c = s);
		c > s && (c = s), o += i, c += i;
	} else {
		for (s = i + 1; c < s && a(e, t[n + i - c]) <= 0;) o = c, c = (c << 1) + 1, c <= 0 && (c = s);
		c > s && (c = s);
		var l = o;
		o = i - c, c = i - l;
	}
	for (o++; o < c;) {
		var u = o + (c - o >>> 1);
		a(e, t[n + u]) > 0 ? o = u + 1 : c = u;
	}
	return c;
}
function gi(e, t, n, r, i, a) {
	var o = 0, s = 0, c = 1;
	if (a(e, t[n + i]) < 0) {
		for (s = i + 1; c < s && a(e, t[n + i - c]) < 0;) o = c, c = (c << 1) + 1, c <= 0 && (c = s);
		c > s && (c = s);
		var l = o;
		o = i - c, c = i - l;
	} else {
		for (s = r - i; c < s && a(e, t[n + i + c]) >= 0;) o = c, c = (c << 1) + 1, c <= 0 && (c = s);
		c > s && (c = s), o += i, c += i;
	}
	for (o++; o < c;) {
		var u = o + (c - o >>> 1);
		a(e, t[n + u]) < 0 ? c = u : o = u + 1;
	}
	return c;
}
function _i(e, t) {
	var n = ui, r, i, a = 0, o = [];
	r = [], i = [];
	function s(e, t) {
		r[a] = e, i[a] = t, a += 1;
	}
	function c() {
		for (; a > 1;) {
			var e = a - 2;
			if (e >= 1 && i[e - 1] <= i[e] + i[e + 1] || e >= 2 && i[e - 2] <= i[e] + i[e - 1]) i[e - 1] < i[e + 1] && e--;
			else if (i[e] > i[e + 1]) break;
			u(e);
		}
	}
	function l() {
		for (; a > 1;) {
			var e = a - 2;
			e > 0 && i[e - 1] < i[e + 1] && e--, u(e);
		}
	}
	function u(n) {
		var o = r[n], s = i[n], c = r[n + 1], l = i[n + 1];
		i[n] = s + l, n === a - 3 && (r[n + 1] = r[n + 2], i[n + 1] = i[n + 2]), a--;
		var u = gi(e[c], e, o, s, 0, t);
		o += u, s -= u, s !== 0 && (l = hi(e[o + s - 1], e, c, l, l - 1, t), l !== 0 && (s <= l ? d(o, s, c, l) : f(o, s, c, l)));
	}
	function d(r, i, a, s) {
		var c = 0;
		for (c = 0; c < i; c++) o[c] = e[r + c];
		var l = 0, u = a, d = r;
		if (e[d++] = e[u++], --s === 0) for (c = 0; c < i; c++) e[d + c] = o[l + c];
		else if (i === 1) {
			for (c = 0; c < s; c++) e[d + c] = e[u + c];
			e[d + s] = o[l];
		} else {
			for (var f = n, p, m, h;;) {
				p = 0, m = 0, h = !1;
				do
					if (t(e[u], o[l]) < 0) {
						if (e[d++] = e[u++], m++, p = 0, --s === 0) {
							h = !0;
							break;
						}
					} else if (e[d++] = o[l++], p++, m = 0, --i === 1) {
						h = !0;
						break;
					}
				while ((p | m) < f);
				if (h) break;
				do {
					if (p = gi(e[u], o, l, i, 0, t), p !== 0) {
						for (c = 0; c < p; c++) e[d + c] = o[l + c];
						if (d += p, l += p, i -= p, i <= 1) {
							h = !0;
							break;
						}
					}
					if (e[d++] = e[u++], --s === 0) {
						h = !0;
						break;
					}
					if (m = hi(o[l], e, u, s, 0, t), m !== 0) {
						for (c = 0; c < m; c++) e[d + c] = e[u + c];
						if (d += m, u += m, s -= m, s === 0) {
							h = !0;
							break;
						}
					}
					if (e[d++] = o[l++], --i === 1) {
						h = !0;
						break;
					}
					f--;
				} while (p >= ui || m >= ui);
				if (h) break;
				f < 0 && (f = 0), f += 2;
			}
			if (n = f, n < 1 && (n = 1), i === 1) {
				for (c = 0; c < s; c++) e[d + c] = e[u + c];
				e[d + s] = o[l];
			} else if (i === 0) throw Error();
			else for (c = 0; c < i; c++) e[d + c] = o[l + c];
		}
	}
	function f(r, i, a, s) {
		var c = 0;
		for (c = 0; c < s; c++) o[c] = e[a + c];
		var l = r + i - 1, u = s - 1, d = a + s - 1, f = 0, p = 0;
		if (e[d--] = e[l--], --i === 0) for (f = d - (s - 1), c = 0; c < s; c++) e[f + c] = o[c];
		else if (s === 1) {
			for (d -= i, l -= i, p = d + 1, f = l + 1, c = i - 1; c >= 0; c--) e[p + c] = e[f + c];
			e[d] = o[u];
		} else {
			for (var m = n;;) {
				var h = 0, g = 0, _ = !1;
				do
					if (t(o[u], e[l]) < 0) {
						if (e[d--] = e[l--], h++, g = 0, --i === 0) {
							_ = !0;
							break;
						}
					} else if (e[d--] = o[u--], g++, h = 0, --s === 1) {
						_ = !0;
						break;
					}
				while ((h | g) < m);
				if (_) break;
				do {
					if (h = i - gi(o[u], e, r, i, i - 1, t), h !== 0) {
						for (d -= h, l -= h, i -= h, p = d + 1, f = l + 1, c = h - 1; c >= 0; c--) e[p + c] = e[f + c];
						if (i === 0) {
							_ = !0;
							break;
						}
					}
					if (e[d--] = o[u--], --s === 1) {
						_ = !0;
						break;
					}
					if (g = s - hi(e[l], o, 0, s, s - 1, t), g !== 0) {
						for (d -= g, u -= g, s -= g, p = d + 1, f = u + 1, c = 0; c < g; c++) e[p + c] = o[f + c];
						if (s <= 1) {
							_ = !0;
							break;
						}
					}
					if (e[d--] = e[l--], --i === 0) {
						_ = !0;
						break;
					}
					m--;
				} while (h >= ui || g >= ui);
				if (_) break;
				m < 0 && (m = 0), m += 2;
			}
			if (n = m, n < 1 && (n = 1), s === 1) {
				for (d -= i, l -= i, p = d + 1, f = l + 1, c = i - 1; c >= 0; c--) e[p + c] = e[f + c];
				e[d] = o[u];
			} else if (s === 0) throw Error();
			else for (f = d - (s - 1), c = 0; c < s; c++) e[f + c] = o[c];
		}
	}
	return {
		mergeRuns: c,
		forceMergeRuns: l,
		pushRun: s
	};
}
function vi(e, t, n, r) {
	n ||= 0, r ||= e.length;
	var i = r - n;
	if (!(i < 2)) {
		var a = 0;
		if (i < li) a = fi(e, n, r, t), mi(e, n, r, n + a, t);
		else {
			var o = _i(e, t), s = di(i);
			do {
				if (a = fi(e, n, r, t), a < s) {
					var c = i;
					c > s && (c = s), mi(e, n, n + c, n + a, t), a = c;
				}
				o.pushRun(n, a), o.mergeRuns(), i -= a, n += a;
			} while (i !== 0);
			o.forceMergeRuns();
		}
	}
}
// node_modules/zrender/lib/Storage.js
var yi = !1;
function bi() {
	yi || (yi = !0, console.warn("z / z2 / zlevel of displayable is invalid, which may cause unexpected errors"));
}
function xi(e, t) {
	return e.zlevel === t.zlevel ? e.z === t.z ? e.z2 - t.z2 : e.z - t.z : e.zlevel - t.zlevel;
}
var Si = function() {
	function e() {
		this._roots = [], this._displayList = [], this._displayListLen = 0, this.displayableSortFunc = xi;
	}
	return e.prototype.traverse = function(e, t) {
		for (var n = 0; n < this._roots.length; n++) this._roots[n].traverse(e, t);
	}, e.prototype.getDisplayList = function(e, t) {
		t ||= !1;
		var n = this._displayList;
		return (e || !n.length) && this.updateDisplayList(t), n;
	}, e.prototype.updateDisplayList = function(e) {
		this._displayListLen = 0;
		for (var t = this._roots, n = this._displayList, r = 0, i = t.length; r < i; r++) this._updateAndAddDisplayable(t[r], null, e);
		n.length = this._displayListLen, vi(n, xi);
	}, e.prototype._updateAndAddDisplayable = function(e, t, n) {
		if (!e.ignore || n) {
			e.beforeUpdate(), e.update(), e.afterUpdate();
			var r = e.getClipPath(), i = t && t.length, a = 0, o = e.__clipPaths;
			if (!e.ignoreClip && (i || r)) {
				if (o ||= e.__clipPaths = [], i) for (var s = 0; s < t.length; s++) o[a++] = t[s];
				for (var c = r, l = e; c;) c.parent = l, c.updateTransform(), o[a++] = c, l = c, c = c.getClipPath();
			}
			if (o && (o.length = a), e.childrenRef) {
				for (var u = e.childrenRef(), d = 0; d < u.length; d++) {
					var f = u[d];
					e.__dirty && (f.__dirty |= 1), this._updateAndAddDisplayable(f, o, n);
				}
				e.__dirty = 0;
			} else {
				var p = e;
				isNaN(p.z) && (bi(), p.z = 0), isNaN(p.z2) && (bi(), p.z2 = 0), isNaN(p.zlevel) && (bi(), p.zlevel = 0), this._displayList[this._displayListLen++] = p;
			}
			var m = e.getDecalElement && e.getDecalElement();
			m && this._updateAndAddDisplayable(m, o, n);
			var h = e.getTextGuideLine();
			h && this._updateAndAddDisplayable(h, o, n);
			var g = e.getTextContent();
			g && this._updateAndAddDisplayable(g, o, n);
		}
	}, e.prototype.addRoot = function(e) {
		e.__zr && e.__zr.storage === this || this._roots.push(e);
	}, e.prototype.delRoot = function(e) {
		if (e instanceof Array) for (var t = 0, n = e.length; t < n; t++) this.delRoot(e[t]);
		else {
			var r = Wt(this._roots, e);
			r >= 0 && this._roots.splice(r, 1);
		}
	}, e.prototype.delAllRoots = function() {
		this._roots = [], this._displayList = [], this._displayListLen = 0;
	}, e.prototype.getRoots = function() {
		return this._roots;
	}, e.prototype.dispose = function() {
		this._displayList = null, this._roots = null;
	}, e;
}(), Ci = R.hasGlobalWindow && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function(e) {
	return setTimeout(e, 16);
}, wi = {
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
		return (e *= 2) < 1 ? .5 * e * e : -.5 * (--e * (e - 2) - 1);
	},
	cubicIn: function(e) {
		return e * e * e;
	},
	cubicOut: function(e) {
		return --e * e * e + 1;
	},
	cubicInOut: function(e) {
		return (e *= 2) < 1 ? .5 * e * e * e : .5 * ((e -= 2) * e * e + 2);
	},
	quarticIn: function(e) {
		return e * e * e * e;
	},
	quarticOut: function(e) {
		return 1 - --e * e * e * e;
	},
	quarticInOut: function(e) {
		return (e *= 2) < 1 ? .5 * e * e * e * e : -.5 * ((e -= 2) * e * e * e - 2);
	},
	quinticIn: function(e) {
		return e * e * e * e * e;
	},
	quinticOut: function(e) {
		return --e * e * e * e * e + 1;
	},
	quinticInOut: function(e) {
		return (e *= 2) < 1 ? .5 * e * e * e * e * e : .5 * ((e -= 2) * e * e * e * e + 2);
	},
	sinusoidalIn: function(e) {
		return 1 - Math.cos(e * Math.PI / 2);
	},
	sinusoidalOut: function(e) {
		return Math.sin(e * Math.PI / 2);
	},
	sinusoidalInOut: function(e) {
		return .5 * (1 - Math.cos(Math.PI * e));
	},
	exponentialIn: function(e) {
		return e === 0 ? 0 : 1024 ** (e - 1);
	},
	exponentialOut: function(e) {
		return e === 1 ? 1 : 1 - 2 ** (-10 * e);
	},
	exponentialInOut: function(e) {
		return e === 0 ? 0 : e === 1 ? 1 : (e *= 2) < 1 ? .5 * 1024 ** (e - 1) : .5 * (-(2 ** (-10 * (e - 1))) + 2);
	},
	circularIn: function(e) {
		return 1 - Math.sqrt(1 - e * e);
	},
	circularOut: function(e) {
		return Math.sqrt(1 - --e * e);
	},
	circularInOut: function(e) {
		return (e *= 2) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
	},
	elasticIn: function(e) {
		var t, n = .1, r = .4;
		return e === 0 ? 0 : e === 1 ? 1 : (!n || n < 1 ? (n = 1, t = r / 4) : t = r * Math.asin(1 / n) / (2 * Math.PI), -(n * 2 ** (10 * --e) * Math.sin((e - t) * (2 * Math.PI) / r)));
	},
	elasticOut: function(e) {
		var t, n = .1, r = .4;
		return e === 0 ? 0 : e === 1 ? 1 : (!n || n < 1 ? (n = 1, t = r / 4) : t = r * Math.asin(1 / n) / (2 * Math.PI), n * 2 ** (-10 * e) * Math.sin((e - t) * (2 * Math.PI) / r) + 1);
	},
	elasticInOut: function(e) {
		var t, n = .1, r = .4;
		return e === 0 ? 0 : e === 1 ? 1 : (!n || n < 1 ? (n = 1, t = r / 4) : t = r * Math.asin(1 / n) / (2 * Math.PI), (e *= 2) < 1 ? -.5 * (n * 2 ** (10 * --e) * Math.sin((e - t) * (2 * Math.PI) / r)) : n * 2 ** (-10 * --e) * Math.sin((e - t) * (2 * Math.PI) / r) * .5 + 1);
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
		return (e *= 2) < 1 ? .5 * (e * e * ((t + 1) * e - t)) : .5 * ((e -= 2) * e * ((t + 1) * e + t) + 2);
	},
	bounceIn: function(e) {
		return 1 - wi.bounceOut(1 - e);
	},
	bounceOut: function(e) {
		return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375;
	},
	bounceInOut: function(e) {
		return e < .5 ? wi.bounceIn(e * 2) * .5 : wi.bounceOut(e * 2 - 1) * .5 + .5;
	}
}, Ti = Math.pow, Ei = Math.sqrt, Di = 1e-8, Oi = 1e-4, ki = Ei(3), Ai = 1 / 3, ji = On(), Mi = On(), Ni = On();
function Pi(e) {
	return e > -Di && e < Di;
}
function Fi(e) {
	return e > Di || e < -Di;
}
function Ii(e, t, n, r, i) {
	var a = 1 - i;
	return a * a * (a * e + 3 * i * t) + i * i * (i * r + 3 * a * n);
}
function Li(e, t, n, r, i) {
	var a = 1 - i;
	return 3 * (((t - e) * a + 2 * (n - t) * i) * a + (r - n) * i * i);
}
function Ri(e, t, n, r, i, a) {
	var o = r + 3 * (t - n) - e, s = 3 * (n - t * 2 + e), c = 3 * (t - e), l = e - i, u = s * s - 3 * o * c, d = s * c - 9 * o * l, f = c * c - 3 * s * l, p = 0;
	if (Pi(u) && Pi(d)) {
		if (Pi(s)) a[0] = 0;
		else {
			var m = -c / s;
			m >= 0 && m <= 1 && (a[p++] = m);
		}
	} else {
		var h = d * d - 4 * u * f;
		if (Pi(h)) {
			var g = d / u, m = -s / o + g, _ = -g / 2;
			m >= 0 && m <= 1 && (a[p++] = m), _ >= 0 && _ <= 1 && (a[p++] = _);
		} else if (h > 0) {
			var v = Ei(h), y = u * s + 1.5 * o * (-d + v), b = u * s + 1.5 * o * (-d - v);
			y = y < 0 ? -Ti(-y, Ai) : Ti(y, Ai), b = b < 0 ? -Ti(-b, Ai) : Ti(b, Ai);
			var m = (-s - (y + b)) / (3 * o);
			m >= 0 && m <= 1 && (a[p++] = m);
		} else {
			var x = (2 * u * s - 3 * o * d) / (2 * Ei(u * u * u)), S = Math.acos(x) / 3, C = Ei(u), w = Math.cos(S), m = (-s - 2 * C * w) / (3 * o), _ = (-s + C * (w + ki * Math.sin(S))) / (3 * o), T = (-s + C * (w - ki * Math.sin(S))) / (3 * o);
			m >= 0 && m <= 1 && (a[p++] = m), _ >= 0 && _ <= 1 && (a[p++] = _), T >= 0 && T <= 1 && (a[p++] = T);
		}
	}
	return p;
}
function zi(e, t, n, r, i) {
	var a = 6 * n - 12 * t + 6 * e, o = 9 * t + 3 * r - 3 * e - 9 * n, s = 3 * t - 3 * e, c = 0;
	if (Pi(o)) {
		if (Fi(a)) {
			var l = -s / a;
			l >= 0 && l <= 1 && (i[c++] = l);
		}
	} else {
		var u = a * a - 4 * o * s;
		if (Pi(u)) i[0] = -a / (2 * o);
		else if (u > 0) {
			var d = Ei(u), l = (-a + d) / (2 * o), f = (-a - d) / (2 * o);
			l >= 0 && l <= 1 && (i[c++] = l), f >= 0 && f <= 1 && (i[c++] = f);
		}
	}
	return c;
}
function Bi(e, t, n, r, i, a) {
	var o = (t - e) * i + e, s = (n - t) * i + t, c = (r - n) * i + n, l = (s - o) * i + o, u = (c - s) * i + s, d = (u - l) * i + l;
	a[0] = e, a[1] = o, a[2] = l, a[3] = d, a[4] = d, a[5] = u, a[6] = c, a[7] = r;
}
function Vi(e, t, n, r, i, a, o, s, c, l, u) {
	var d, f = .005, p = Infinity, m, h, g, _;
	ji[0] = c, ji[1] = l;
	for (var v = 0; v < 1; v += .05) Mi[0] = Ii(e, n, i, o, v), Mi[1] = Ii(t, r, a, s, v), g = Bn(ji, Mi), g < p && (d = v, p = g);
	p = Infinity;
	for (var y = 0; y < 32 && !(f < Oi); y++) m = d - f, h = d + f, Mi[0] = Ii(e, n, i, o, m), Mi[1] = Ii(t, r, a, s, m), g = Bn(Mi, ji), m >= 0 && g < p ? (d = m, p = g) : (Ni[0] = Ii(e, n, i, o, h), Ni[1] = Ii(t, r, a, s, h), _ = Bn(Ni, ji), h <= 1 && _ < p ? (d = h, p = _) : f *= .5);
	return u && (u[0] = Ii(e, n, i, o, d), u[1] = Ii(t, r, a, s, d)), Ei(p);
}
function Hi(e, t, n, r, i, a, o, s, c) {
	for (var l = e, u = t, d = 0, f = 1 / c, p = 1; p <= c; p++) {
		var m = p * f, h = Ii(e, n, i, o, m), g = Ii(t, r, a, s, m), _ = h - l, v = g - u;
		d += Math.sqrt(_ * _ + v * v), l = h, u = g;
	}
	return d;
}
function Ui(e, t, n, r) {
	var i = 1 - r;
	return i * (i * e + 2 * r * t) + r * r * n;
}
function Wi(e, t, n, r) {
	return 2 * ((1 - r) * (t - e) + r * (n - t));
}
function Gi(e, t, n, r, i) {
	var a = e - 2 * t + n, o = 2 * (t - e), s = e - r, c = 0;
	if (Pi(a)) {
		if (Fi(o)) {
			var l = -s / o;
			l >= 0 && l <= 1 && (i[c++] = l);
		}
	} else {
		var u = o * o - 4 * a * s;
		if (Pi(u)) {
			var l = -o / (2 * a);
			l >= 0 && l <= 1 && (i[c++] = l);
		} else if (u > 0) {
			var d = Ei(u), l = (-o + d) / (2 * a), f = (-o - d) / (2 * a);
			l >= 0 && l <= 1 && (i[c++] = l), f >= 0 && f <= 1 && (i[c++] = f);
		}
	}
	return c;
}
function Ki(e, t, n) {
	var r = e + n - 2 * t;
	return r === 0 ? .5 : (e - t) / r;
}
function qi(e, t, n, r, i) {
	var a = (t - e) * r + e, o = (n - t) * r + t, s = (o - a) * r + a;
	i[0] = e, i[1] = a, i[2] = s, i[3] = s, i[4] = o, i[5] = n;
}
function Ji(e, t, n, r, i, a, o, s, c) {
	var l, u = .005, d = Infinity;
	ji[0] = o, ji[1] = s;
	for (var f = 0; f < 1; f += .05) {
		Mi[0] = Ui(e, n, i, f), Mi[1] = Ui(t, r, a, f);
		var p = Bn(ji, Mi);
		p < d && (l = f, d = p);
	}
	d = Infinity;
	for (var m = 0; m < 32 && !(u < Oi); m++) {
		var h = l - u, g = l + u;
		Mi[0] = Ui(e, n, i, h), Mi[1] = Ui(t, r, a, h);
		var p = Bn(Mi, ji);
		if (h >= 0 && p < d) l = h, d = p;
		else {
			Ni[0] = Ui(e, n, i, g), Ni[1] = Ui(t, r, a, g);
			var _ = Bn(Ni, ji);
			g <= 1 && _ < d ? (l = g, d = _) : u *= .5;
		}
	}
	return c && (c[0] = Ui(e, n, i, l), c[1] = Ui(t, r, a, l)), Ei(d);
}
function Yi(e, t, n, r, i, a, o) {
	for (var s = e, c = t, l = 0, u = 1 / o, d = 1; d <= o; d++) {
		var f = d * u, p = Ui(e, n, i, f), m = Ui(t, r, a, f), h = p - s, g = m - c;
		l += Math.sqrt(h * h + g * g), s = p, c = m;
	}
	return l;
}
// node_modules/zrender/lib/animation/cubicEasing.js
var Xi = /cubic-bezier\(([0-9,\.e ]+)\)/;
function Zi(e) {
	var t = e && Xi.exec(e);
	if (t) {
		var n = t[1].split(","), r = +mn(n[0]), i = +mn(n[1]), a = +mn(n[2]), o = +mn(n[3]);
		if (isNaN(r + i + a + o)) return;
		var s = [];
		return function(e) {
			return e <= 0 ? 0 : e >= 1 ? 1 : Ri(0, r, a, 1, e, s) && Ii(0, i, o, 1, s[0]);
		};
	}
}
// node_modules/zrender/lib/animation/Clip.js
var Qi = function() {
	function e(e) {
		this._inited = !1, this._startTime = 0, this._pausedTime = 0, this._paused = !1, this._life = e.life || 1e3, this._delay = e.delay || 0, this.loop = e.loop || !1, this.onframe = e.onframe || En, this.ondestroy = e.ondestroy || En, this.onrestart = e.onrestart || En, e.easing && this.setEasing(e.easing);
	}
	return e.prototype.step = function(e, t) {
		if (this._inited ||= (this._startTime = e + this._delay, !0), this._paused) this._pausedTime += t;
		else {
			var n = this._life, r = e - this._startTime - this._pausedTime, i = r / n;
			i < 0 && (i = 0), i = Math.min(i, 1);
			var a = this.easingFunc, o = a ? a(i) : i;
			if (this.onframe(o), i === 1) {
				if (this.loop) {
					var s = r % n;
					this._startTime = e - s, this._pausedTime = 0, this.onrestart();
				} else return !0;
			}
			return !1;
		}
	}, e.prototype.pause = function() {
		this._paused = !0;
	}, e.prototype.resume = function() {
		this._paused = !1;
	}, e.prototype.setEasing = function(e) {
		this.easing = e, this.easingFunc = W(e) ? e : wi[e] || Zi(e);
	}, e;
}(), $i = function() {
	function e(e) {
		this.value = e;
	}
	return e;
}(), ea = function() {
	function e() {
		this._len = 0;
	}
	return e.prototype.insert = function(e) {
		var t = new $i(e);
		return this.insertEntry(t), t;
	}, e.prototype.insertEntry = function(e) {
		this.head ? (this.tail.next = e, e.prev = this.tail, e.next = null, this.tail = e) : this.head = this.tail = e, this._len++;
	}, e.prototype.remove = function(e) {
		var t = e.prev, n = e.next;
		t ? t.next = n : this.head = n, n ? n.prev = t : this.tail = t, e.next = e.prev = null, this._len--;
	}, e.prototype.len = function() {
		return this._len;
	}, e.prototype.clear = function() {
		this.head = this.tail = null, this._len = 0;
	}, e;
}(), ta = function() {
	function e(e) {
		this._list = new ea(), this._maxSize = 10, this._map = {}, this._maxSize = e;
	}
	return e.prototype.put = function(e, t) {
		var n = this._list, r = this._map, i = null;
		if (r[e] == null) {
			var a = n.len(), o = this._lastRemovedEntry;
			if (a >= this._maxSize && a > 0) {
				var s = n.head;
				n.remove(s), delete r[s.key], i = s.value, this._lastRemovedEntry = s;
			}
			o ? o.value = t : o = new $i(t), o.key = e, n.insertEntry(o), r[e] = o;
		}
		return i;
	}, e.prototype.get = function(e) {
		var t = this._map[e], n = this._list;
		if (t != null) return t !== n.tail && (n.remove(t), n.insertEntry(t)), t.value;
	}, e.prototype.clear = function() {
		this._list.clear(), this._map = {};
	}, e.prototype.len = function() {
		return this._list.len();
	}, e;
}(), na = {
	transparent: [
		0,
		0,
		0,
		0
	],
	aliceblue: [
		240,
		248,
		255,
		1
	],
	antiquewhite: [
		250,
		235,
		215,
		1
	],
	aqua: [
		0,
		255,
		255,
		1
	],
	aquamarine: [
		127,
		255,
		212,
		1
	],
	azure: [
		240,
		255,
		255,
		1
	],
	beige: [
		245,
		245,
		220,
		1
	],
	bisque: [
		255,
		228,
		196,
		1
	],
	black: [
		0,
		0,
		0,
		1
	],
	blanchedalmond: [
		255,
		235,
		205,
		1
	],
	blue: [
		0,
		0,
		255,
		1
	],
	blueviolet: [
		138,
		43,
		226,
		1
	],
	brown: [
		165,
		42,
		42,
		1
	],
	burlywood: [
		222,
		184,
		135,
		1
	],
	cadetblue: [
		95,
		158,
		160,
		1
	],
	chartreuse: [
		127,
		255,
		0,
		1
	],
	chocolate: [
		210,
		105,
		30,
		1
	],
	coral: [
		255,
		127,
		80,
		1
	],
	cornflowerblue: [
		100,
		149,
		237,
		1
	],
	cornsilk: [
		255,
		248,
		220,
		1
	],
	crimson: [
		220,
		20,
		60,
		1
	],
	cyan: [
		0,
		255,
		255,
		1
	],
	darkblue: [
		0,
		0,
		139,
		1
	],
	darkcyan: [
		0,
		139,
		139,
		1
	],
	darkgoldenrod: [
		184,
		134,
		11,
		1
	],
	darkgray: [
		169,
		169,
		169,
		1
	],
	darkgreen: [
		0,
		100,
		0,
		1
	],
	darkgrey: [
		169,
		169,
		169,
		1
	],
	darkkhaki: [
		189,
		183,
		107,
		1
	],
	darkmagenta: [
		139,
		0,
		139,
		1
	],
	darkolivegreen: [
		85,
		107,
		47,
		1
	],
	darkorange: [
		255,
		140,
		0,
		1
	],
	darkorchid: [
		153,
		50,
		204,
		1
	],
	darkred: [
		139,
		0,
		0,
		1
	],
	darksalmon: [
		233,
		150,
		122,
		1
	],
	darkseagreen: [
		143,
		188,
		143,
		1
	],
	darkslateblue: [
		72,
		61,
		139,
		1
	],
	darkslategray: [
		47,
		79,
		79,
		1
	],
	darkslategrey: [
		47,
		79,
		79,
		1
	],
	darkturquoise: [
		0,
		206,
		209,
		1
	],
	darkviolet: [
		148,
		0,
		211,
		1
	],
	deeppink: [
		255,
		20,
		147,
		1
	],
	deepskyblue: [
		0,
		191,
		255,
		1
	],
	dimgray: [
		105,
		105,
		105,
		1
	],
	dimgrey: [
		105,
		105,
		105,
		1
	],
	dodgerblue: [
		30,
		144,
		255,
		1
	],
	firebrick: [
		178,
		34,
		34,
		1
	],
	floralwhite: [
		255,
		250,
		240,
		1
	],
	forestgreen: [
		34,
		139,
		34,
		1
	],
	fuchsia: [
		255,
		0,
		255,
		1
	],
	gainsboro: [
		220,
		220,
		220,
		1
	],
	ghostwhite: [
		248,
		248,
		255,
		1
	],
	gold: [
		255,
		215,
		0,
		1
	],
	goldenrod: [
		218,
		165,
		32,
		1
	],
	gray: [
		128,
		128,
		128,
		1
	],
	green: [
		0,
		128,
		0,
		1
	],
	greenyellow: [
		173,
		255,
		47,
		1
	],
	grey: [
		128,
		128,
		128,
		1
	],
	honeydew: [
		240,
		255,
		240,
		1
	],
	hotpink: [
		255,
		105,
		180,
		1
	],
	indianred: [
		205,
		92,
		92,
		1
	],
	indigo: [
		75,
		0,
		130,
		1
	],
	ivory: [
		255,
		255,
		240,
		1
	],
	khaki: [
		240,
		230,
		140,
		1
	],
	lavender: [
		230,
		230,
		250,
		1
	],
	lavenderblush: [
		255,
		240,
		245,
		1
	],
	lawngreen: [
		124,
		252,
		0,
		1
	],
	lemonchiffon: [
		255,
		250,
		205,
		1
	],
	lightblue: [
		173,
		216,
		230,
		1
	],
	lightcoral: [
		240,
		128,
		128,
		1
	],
	lightcyan: [
		224,
		255,
		255,
		1
	],
	lightgoldenrodyellow: [
		250,
		250,
		210,
		1
	],
	lightgray: [
		211,
		211,
		211,
		1
	],
	lightgreen: [
		144,
		238,
		144,
		1
	],
	lightgrey: [
		211,
		211,
		211,
		1
	],
	lightpink: [
		255,
		182,
		193,
		1
	],
	lightsalmon: [
		255,
		160,
		122,
		1
	],
	lightseagreen: [
		32,
		178,
		170,
		1
	],
	lightskyblue: [
		135,
		206,
		250,
		1
	],
	lightslategray: [
		119,
		136,
		153,
		1
	],
	lightslategrey: [
		119,
		136,
		153,
		1
	],
	lightsteelblue: [
		176,
		196,
		222,
		1
	],
	lightyellow: [
		255,
		255,
		224,
		1
	],
	lime: [
		0,
		255,
		0,
		1
	],
	limegreen: [
		50,
		205,
		50,
		1
	],
	linen: [
		250,
		240,
		230,
		1
	],
	magenta: [
		255,
		0,
		255,
		1
	],
	maroon: [
		128,
		0,
		0,
		1
	],
	mediumaquamarine: [
		102,
		205,
		170,
		1
	],
	mediumblue: [
		0,
		0,
		205,
		1
	],
	mediumorchid: [
		186,
		85,
		211,
		1
	],
	mediumpurple: [
		147,
		112,
		219,
		1
	],
	mediumseagreen: [
		60,
		179,
		113,
		1
	],
	mediumslateblue: [
		123,
		104,
		238,
		1
	],
	mediumspringgreen: [
		0,
		250,
		154,
		1
	],
	mediumturquoise: [
		72,
		209,
		204,
		1
	],
	mediumvioletred: [
		199,
		21,
		133,
		1
	],
	midnightblue: [
		25,
		25,
		112,
		1
	],
	mintcream: [
		245,
		255,
		250,
		1
	],
	mistyrose: [
		255,
		228,
		225,
		1
	],
	moccasin: [
		255,
		228,
		181,
		1
	],
	navajowhite: [
		255,
		222,
		173,
		1
	],
	navy: [
		0,
		0,
		128,
		1
	],
	oldlace: [
		253,
		245,
		230,
		1
	],
	olive: [
		128,
		128,
		0,
		1
	],
	olivedrab: [
		107,
		142,
		35,
		1
	],
	orange: [
		255,
		165,
		0,
		1
	],
	orangered: [
		255,
		69,
		0,
		1
	],
	orchid: [
		218,
		112,
		214,
		1
	],
	palegoldenrod: [
		238,
		232,
		170,
		1
	],
	palegreen: [
		152,
		251,
		152,
		1
	],
	paleturquoise: [
		175,
		238,
		238,
		1
	],
	palevioletred: [
		219,
		112,
		147,
		1
	],
	papayawhip: [
		255,
		239,
		213,
		1
	],
	peachpuff: [
		255,
		218,
		185,
		1
	],
	peru: [
		205,
		133,
		63,
		1
	],
	pink: [
		255,
		192,
		203,
		1
	],
	plum: [
		221,
		160,
		221,
		1
	],
	powderblue: [
		176,
		224,
		230,
		1
	],
	purple: [
		128,
		0,
		128,
		1
	],
	red: [
		255,
		0,
		0,
		1
	],
	rosybrown: [
		188,
		143,
		143,
		1
	],
	royalblue: [
		65,
		105,
		225,
		1
	],
	saddlebrown: [
		139,
		69,
		19,
		1
	],
	salmon: [
		250,
		128,
		114,
		1
	],
	sandybrown: [
		244,
		164,
		96,
		1
	],
	seagreen: [
		46,
		139,
		87,
		1
	],
	seashell: [
		255,
		245,
		238,
		1
	],
	sienna: [
		160,
		82,
		45,
		1
	],
	silver: [
		192,
		192,
		192,
		1
	],
	skyblue: [
		135,
		206,
		235,
		1
	],
	slateblue: [
		106,
		90,
		205,
		1
	],
	slategray: [
		112,
		128,
		144,
		1
	],
	slategrey: [
		112,
		128,
		144,
		1
	],
	snow: [
		255,
		250,
		250,
		1
	],
	springgreen: [
		0,
		255,
		127,
		1
	],
	steelblue: [
		70,
		130,
		180,
		1
	],
	tan: [
		210,
		180,
		140,
		1
	],
	teal: [
		0,
		128,
		128,
		1
	],
	thistle: [
		216,
		191,
		216,
		1
	],
	tomato: [
		255,
		99,
		71,
		1
	],
	turquoise: [
		64,
		224,
		208,
		1
	],
	violet: [
		238,
		130,
		238,
		1
	],
	wheat: [
		245,
		222,
		179,
		1
	],
	white: [
		255,
		255,
		255,
		1
	],
	whitesmoke: [
		245,
		245,
		245,
		1
	],
	yellow: [
		255,
		255,
		0,
		1
	],
	yellowgreen: [
		154,
		205,
		50,
		1
	]
};
function ra(e) {
	return e = Math.round(e), e < 0 ? 0 : e > 255 ? 255 : e;
}
function ia(e) {
	return e = Math.round(e), e < 0 ? 0 : e > 360 ? 360 : e;
}
function aa(e) {
	return e < 0 ? 0 : e > 1 ? 1 : e;
}
function oa(e) {
	var t = e;
	return t.length && t.charAt(t.length - 1) === "%" ? ra(parseFloat(t) / 100 * 255) : ra(parseInt(t, 10));
}
function sa(e) {
	var t = e;
	return t.length && t.charAt(t.length - 1) === "%" ? aa(parseFloat(t) / 100) : aa(parseFloat(t));
}
function ca(e, t, n) {
	return n < 0 ? n += 1 : n > 1 && --n, n * 6 < 1 ? e + (t - e) * n * 6 : n * 2 < 1 ? t : n * 3 < 2 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function la(e, t, n, r, i) {
	return e[0] = t, e[1] = n, e[2] = r, e[3] = i, e;
}
function ua(e, t) {
	return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e;
}
var da = new ta(20), fa = null;
function pa(e, t) {
	fa && ua(fa, t), fa = da.put(e, fa || t.slice());
}
function ma(e, t) {
	if (e) {
		t ||= [];
		var n = da.get(e);
		if (n) return ua(t, n);
		e += "";
		var r = e.replace(/ /g, "").toLowerCase();
		if (r in na) return ua(t, na[r]), pa(e, t), t;
		var i = r.length;
		if (r.charAt(0) === "#") {
			if (i === 4 || i === 5) {
				var a = parseInt(r.slice(1, 4), 16);
				if (!(a >= 0 && a <= 4095)) {
					la(t, 0, 0, 0, 1);
					return;
				}
				return la(t, (a & 3840) >> 4 | (a & 3840) >> 8, a & 240 | (a & 240) >> 4, a & 15 | (a & 15) << 4, i === 5 ? parseInt(r.slice(4), 16) / 15 : 1), pa(e, t), t;
			}
			if (i === 7 || i === 9) {
				var a = parseInt(r.slice(1, 7), 16);
				if (!(a >= 0 && a <= 16777215)) {
					la(t, 0, 0, 0, 1);
					return;
				}
				return la(t, (a & 16711680) >> 16, (a & 65280) >> 8, a & 255, i === 9 ? parseInt(r.slice(7), 16) / 255 : 1), pa(e, t), t;
			}
		} else {
			var o = r.indexOf("("), s = r.indexOf(")");
			if (o !== -1 && s + 1 === i) {
				var c = r.substr(0, o), l = r.substr(o + 1, s - (o + 1)).split(","), u = 1;
				switch (c) {
					case "rgba":
						if (l.length !== 4) return l.length === 3 ? la(t, +l[0], +l[1], +l[2], 1) : la(t, 0, 0, 0, 1);
						u = sa(l.pop());
					case "rgb":
						if (l.length >= 3) return la(t, oa(l[0]), oa(l[1]), oa(l[2]), l.length === 3 ? u : sa(l[3])), pa(e, t), t;
						la(t, 0, 0, 0, 1);
						return;
					case "hsla":
						if (l.length !== 4) {
							la(t, 0, 0, 0, 1);
							return;
						}
						return l[3] = sa(l[3]), ha(l, t), pa(e, t), t;
					case "hsl":
						if (l.length !== 3) {
							la(t, 0, 0, 0, 1);
							return;
						}
						return ha(l, t), pa(e, t), t;
					default: return;
				}
			}
			la(t, 0, 0, 0, 1);
		}
	}
}
function ha(e, t) {
	var n = (parseFloat(e[0]) % 360 + 360) % 360 / 360, r = sa(e[1]), i = sa(e[2]), a = i <= .5 ? i * (r + 1) : i + r - i * r, o = i * 2 - a;
	return t ||= [], la(t, ra(ca(o, a, n + 1 / 3) * 255), ra(ca(o, a, n) * 255), ra(ca(o, a, n - 1 / 3) * 255), 1), e.length === 4 && (t[3] = e[3]), t;
}
function ga(e) {
	if (e) {
		var t = e[0] / 255, n = e[1] / 255, r = e[2] / 255, i = Math.min(t, n, r), a = Math.max(t, n, r), o = a - i, s = (a + i) / 2, c, l;
		if (o === 0) c = 0, l = 0;
		else {
			l = s < .5 ? o / (a + i) : o / (2 - a - i);
			var u = ((a - t) / 6 + o / 2) / o, d = ((a - n) / 6 + o / 2) / o, f = ((a - r) / 6 + o / 2) / o;
			t === a ? c = f - d : n === a ? c = 1 / 3 + u - f : r === a && (c = 2 / 3 + d - u), c < 0 && (c += 1), c > 1 && --c;
		}
		var p = [
			c * 360,
			l,
			s
		];
		return e[3] != null && p.push(e[3]), p;
	}
}
function _a(e, t) {
	var n = ma(e);
	if (n) {
		for (var r = 0; r < 3; r++) t < 0 ? n[r] = n[r] * (1 - t) | 0 : n[r] = (255 - n[r]) * t + n[r] | 0, n[r] > 255 ? n[r] = 255 : n[r] < 0 && (n[r] = 0);
		return ya(n, n.length === 4 ? "rgba" : "rgb");
	}
}
function va(e, t, n, r) {
	var i = ma(e);
	if (e) return i = ga(i), t != null && (i[0] = ia(W(t) ? t(i[0]) : t)), n != null && (i[1] = sa(W(n) ? n(i[1]) : n)), r != null && (i[2] = sa(W(r) ? r(i[2]) : r)), ya(ha(i), "rgba");
}
function ya(e, t) {
	if (e && e.length) {
		var n = e[0] + "," + e[1] + "," + e[2];
		return (t === "rgba" || t === "hsva" || t === "hsla") && (n += "," + e[3]), t + "(" + n + ")";
	}
}
function ba(e, t) {
	var n = ma(e);
	return n ? (.299 * n[0] + .587 * n[1] + .114 * n[2]) * n[3] / 255 + (1 - n[3]) * t : 0;
}
var xa = new ta(100);
function Sa(e) {
	if (G(e)) {
		var t = xa.get(e);
		return t || (t = _a(e, -.1), xa.put(e, t)), t;
	}
	if (on(e)) {
		var n = B({}, e);
		return n.colorStops = H(e.colorStops, function(e) {
			return {
				offset: e.offset,
				color: _a(e.color, -.1)
			};
		}), n;
	}
	return e;
}
// node_modules/zrender/lib/svg/helper.js
function Ca(e) {
	return e.type === "linear";
}
function wa(e) {
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
// node_modules/zrender/lib/animation/Animator.js
var Ta = Array.prototype.slice;
function Ea(e, t, n) {
	return (t - e) * n + e;
}
function Da(e, t, n, r) {
	for (var i = t.length, a = 0; a < i; a++) e[a] = Ea(t[a], n[a], r);
	return e;
}
function Oa(e, t, n, r) {
	for (var i = t.length, a = i && t[0].length, o = 0; o < i; o++) {
		e[o] || (e[o] = []);
		for (var s = 0; s < a; s++) e[o][s] = Ea(t[o][s], n[o][s], r);
	}
	return e;
}
function ka(e, t, n, r) {
	for (var i = t.length, a = 0; a < i; a++) e[a] = t[a] + n[a] * r;
	return e;
}
function Aa(e, t, n, r) {
	for (var i = t.length, a = i && t[0].length, o = 0; o < i; o++) {
		e[o] || (e[o] = []);
		for (var s = 0; s < a; s++) e[o][s] = t[o][s] + n[o][s] * r;
	}
	return e;
}
function ja(e, t) {
	for (var n = e.length, r = t.length, i = n > r ? t : e, a = Math.min(n, r), o = i[a - 1] || {
		color: [
			0,
			0,
			0,
			0
		],
		offset: 0
	}, s = a; s < Math.max(n, r); s++) i.push({
		offset: o.offset,
		color: o.color.slice()
	});
}
function Ma(e, t, n) {
	var r = e, i = t;
	if (r.push && i.push) {
		var a = r.length, o = i.length;
		if (a !== o) {
			if (a > o) r.length = o;
			else for (var s = a; s < o; s++) r.push(n === 1 ? i[s] : Ta.call(i[s]));
		}
		for (var c = r[0] && r[0].length, s = 0; s < r.length; s++) if (n === 1) isNaN(r[s]) && (r[s] = i[s]);
		else for (var l = 0; l < c; l++) isNaN(r[s][l]) && (r[s][l] = i[s][l]);
	}
}
function Na(e) {
	if (qt(e)) {
		var t = e.length;
		if (qt(e[0])) {
			for (var n = [], r = 0; r < t; r++) n.push(Ta.call(e[r]));
			return n;
		}
		return Ta.call(e);
	}
	return e;
}
function Pa(e) {
	return e[0] = Math.floor(e[0]) || 0, e[1] = Math.floor(e[1]) || 0, e[2] = Math.floor(e[2]) || 0, e[3] = e[3] == null ? 1 : e[3], "rgba(" + e.join(",") + ")";
}
function Fa(e) {
	return qt(e && e[0]) ? 2 : 1;
}
var Ia = 0, La = 1, Ra = 2, za = 3, Ba = 4, Va = 5, Ha = 6;
function Ua(e) {
	return e === Ba || e === Va;
}
function Wa(e) {
	return e === La || e === Ra;
}
var Ga = [
	0,
	0,
	0,
	0
], Ka = function() {
	function e(e) {
		this.keyframes = [], this.discrete = !1, this._invalid = !1, this._needsSort = !1, this._lastFr = 0, this._lastFrP = 0, this.propName = e;
	}
	return e.prototype.isFinished = function() {
		return this._finished;
	}, e.prototype.setFinished = function() {
		this._finished = !0, this._additiveTrack && this._additiveTrack.setFinished();
	}, e.prototype.needsAnimate = function() {
		return this.keyframes.length >= 1;
	}, e.prototype.getAdditiveTrack = function() {
		return this._additiveTrack;
	}, e.prototype.addKeyframe = function(e, t, n) {
		this._needsSort = !0;
		var r = this.keyframes, i = r.length, a = !1, o = Ha, s = t;
		if (qt(t)) {
			var c = Fa(t);
			o = c, (c === 1 && !tn(t[0]) || c === 2 && !tn(t[0][0])) && (a = !0);
		} else if (tn(t) && !cn(t)) o = Ia;
		else if (G(t)) {
			if (!isNaN(+t)) o = Ia;
			else {
				var l = ma(t);
				l && (s = l, o = za);
			}
		} else if (on(t)) {
			var u = B({}, s);
			u.colorStops = H(t.colorStops, function(e) {
				return {
					offset: e.offset,
					color: ma(e.color)
				};
			}), Ca(t) ? o = Ba : wa(t) && (o = Va), s = u;
		}
		i === 0 ? this.valType = o : (o !== this.valType || o === Ha) && (a = !0), this.discrete = this.discrete || a;
		var d = {
			time: e,
			value: s,
			rawValue: t,
			percent: 0
		};
		return n && (d.easing = n, d.easingFunc = W(n) ? n : wi[n] || Zi(n)), r.push(d), d;
	}, e.prototype.prepare = function(e, t) {
		var n = this.keyframes;
		this._needsSort && n.sort(function(e, t) {
			return e.time - t.time;
		});
		for (var r = this.valType, i = n.length, a = n[i - 1], o = this.discrete, s = Wa(r), c = Ua(r), l = 0; l < i; l++) {
			var u = n[l], d = u.value, f = a.value;
			u.percent = u.time / e, o || (s && l !== i - 1 ? Ma(d, f, r) : c && ja(d.colorStops, f.colorStops));
		}
		if (!o && r !== Va && t && this.needsAnimate() && t.needsAnimate() && r === t.valType && !t._finished) {
			this._additiveTrack = t;
			for (var p = n[0].value, l = 0; l < i; l++) r === Ia ? n[l].additiveValue = n[l].value - p : r === za ? n[l].additiveValue = ka([], n[l].value, p, -1) : Wa(r) && (n[l].additiveValue = r === La ? ka([], n[l].value, p, -1) : Aa([], n[l].value, p, -1));
		}
	}, e.prototype.step = function(e, t) {
		if (!this._finished) {
			this._additiveTrack && this._additiveTrack._finished && (this._additiveTrack = null);
			var n = this._additiveTrack != null, r = n ? "additiveValue" : "value", i = this.valType, a = this.keyframes, o = a.length, s = this.propName, c = i === za, l, u = this._lastFr, d = Math.min, f, p;
			if (o === 1) f = p = a[0];
			else {
				if (t < 0) l = 0;
				else if (t < this._lastFrP) {
					for (l = d(u + 1, o - 1); l >= 0 && !(a[l].percent <= t); l--);
					l = d(l, o - 2);
				} else {
					for (l = u; l < o && !(a[l].percent > t); l++);
					l = d(l - 1, o - 2);
				}
				p = a[l + 1], f = a[l];
			}
			if (f && p) {
				this._lastFr = l, this._lastFrP = t;
				var m = p.percent - f.percent, h = m === 0 ? 1 : d((t - f.percent) / m, 1);
				p.easingFunc && (h = p.easingFunc(h));
				var g = n ? this._additiveValue : c ? Ga : e[s];
				if ((Wa(i) || c) && !g && (g = this._additiveValue = []), this.discrete) e[s] = h < 1 ? f.rawValue : p.rawValue;
				else if (Wa(i)) i === La ? Da(g, f[r], p[r], h) : Oa(g, f[r], p[r], h);
				else if (Ua(i)) {
					var _ = f[r], v = p[r], y = i === Ba;
					e[s] = {
						type: y ? "linear" : "radial",
						x: Ea(_.x, v.x, h),
						y: Ea(_.y, v.y, h),
						colorStops: H(_.colorStops, function(e, t) {
							var n = v.colorStops[t];
							return {
								offset: Ea(e.offset, n.offset, h),
								color: Pa(Da([], e.color, n.color, h))
							};
						}),
						global: v.global
					}, y ? (e[s].x2 = Ea(_.x2, v.x2, h), e[s].y2 = Ea(_.y2, v.y2, h)) : e[s].r = Ea(_.r, v.r, h);
				} else if (c) Da(g, f[r], p[r], h), n || (e[s] = Pa(g));
				else {
					var b = Ea(f[r], p[r], h);
					n ? this._additiveValue = b : e[s] = b;
				}
				n && this._addToTarget(e);
			}
		}
	}, e.prototype._addToTarget = function(e) {
		var t = this.valType, n = this.propName, r = this._additiveValue;
		t === Ia ? e[n] = e[n] + r : t === za ? (ma(e[n], Ga), ka(Ga, Ga, r, 1), e[n] = Pa(Ga)) : t === La ? ka(e[n], e[n], r, 1) : t === Ra && Aa(e[n], e[n], r, 1);
	}, e;
}(), qa = function() {
	function e(e, t, n, r) {
		this._tracks = {}, this._trackKeys = [], this._maxTime = 0, this._started = 0, this._clip = null, this._target = e, this._loop = t, t && r ? Bt("Can' use additive animation on looped animation.") : (this._additiveAnimators = r, this._allowDiscrete = n);
	}
	return e.prototype.getMaxTime = function() {
		return this._maxTime;
	}, e.prototype.getDelay = function() {
		return this._delay;
	}, e.prototype.getLoop = function() {
		return this._loop;
	}, e.prototype.getTarget = function() {
		return this._target;
	}, e.prototype.changeTarget = function(e) {
		this._target = e;
	}, e.prototype.when = function(e, t, n) {
		return this.whenWithKeys(e, t, Xt(t), n);
	}, e.prototype.whenWithKeys = function(e, t, n, r) {
		for (var i = this._tracks, a = 0; a < n.length; a++) {
			var o = n[a], s = i[o];
			if (!s) {
				s = i[o] = new Ka(o);
				var c = void 0, l = this._getAdditiveTrack(o);
				if (l) {
					var u = l.keyframes, d = u[u.length - 1];
					c = d && d.value, l.valType === za && c && (c = Pa(c));
				} else c = this._target[o];
				if (c == null) continue;
				e > 0 && s.addKeyframe(0, Na(c), r), this._trackKeys.push(o);
			}
			s.addKeyframe(e, Na(t[o]), r);
		}
		return this._maxTime = Math.max(this._maxTime, e), this;
	}, e.prototype.pause = function() {
		this._clip.pause(), this._paused = !0;
	}, e.prototype.resume = function() {
		this._clip.resume(), this._paused = !1;
	}, e.prototype.isPaused = function() {
		return !!this._paused;
	}, e.prototype.duration = function(e) {
		return this._maxTime = e, this._force = !0, this;
	}, e.prototype._doneCallback = function() {
		this._setTracksFinished(), this._clip = null;
		var e = this._doneCbs;
		if (e) for (var t = e.length, n = 0; n < t; n++) e[n].call(this);
	}, e.prototype._abortedCallback = function() {
		this._setTracksFinished();
		var e = this.animation, t = this._abortedCbs;
		if (e && e.removeClip(this._clip), this._clip = null, t) for (var n = 0; n < t.length; n++) t[n].call(this);
	}, e.prototype._setTracksFinished = function() {
		for (var e = this._tracks, t = this._trackKeys, n = 0; n < t.length; n++) e[t[n]].setFinished();
	}, e.prototype._getAdditiveTrack = function(e) {
		var t, n = this._additiveAnimators;
		if (n) for (var r = 0; r < n.length; r++) {
			var i = n[r].getTrack(e);
			i && (t = i);
		}
		return t;
	}, e.prototype.start = function(e) {
		if (!(this._started > 0)) {
			this._started = 1;
			for (var t = this, n = [], r = this._maxTime || 0, i = 0; i < this._trackKeys.length; i++) {
				var a = this._trackKeys[i], o = this._tracks[a], s = this._getAdditiveTrack(a), c = o.keyframes, l = c.length;
				if (o.prepare(r, s), o.needsAnimate()) {
					if (!this._allowDiscrete && o.discrete) {
						var u = c[l - 1];
						u && (t._target[o.propName] = u.rawValue), o.setFinished();
					} else n.push(o);
				}
			}
			if (n.length || this._force) {
				var d = new Qi({
					life: r,
					loop: this._loop,
					delay: this._delay || 0,
					onframe: function(e) {
						t._started = 2;
						var r = t._additiveAnimators;
						if (r) {
							for (var i = !1, a = 0; a < r.length; a++) if (r[a]._clip) {
								i = !0;
								break;
							}
							i || (t._additiveAnimators = null);
						}
						for (var a = 0; a < n.length; a++) n[a].step(t._target, e);
						var o = t._onframeCbs;
						if (o) for (var a = 0; a < o.length; a++) o[a](t._target, e);
					},
					ondestroy: function() {
						t._doneCallback();
					}
				});
				this._clip = d, this.animation && this.animation.addClip(d), e && d.setEasing(e);
			} else this._doneCallback();
			return this;
		}
	}, e.prototype.stop = function(e) {
		if (this._clip) {
			var t = this._clip;
			e && t.onframe(1), this._abortedCallback();
		}
	}, e.prototype.delay = function(e) {
		return this._delay = e, this;
	}, e.prototype.during = function(e) {
		return e && (this._onframeCbs ||= [], this._onframeCbs.push(e)), this;
	}, e.prototype.done = function(e) {
		return e && (this._doneCbs ||= [], this._doneCbs.push(e)), this;
	}, e.prototype.aborted = function(e) {
		return e && (this._abortedCbs ||= [], this._abortedCbs.push(e)), this;
	}, e.prototype.getClip = function() {
		return this._clip;
	}, e.prototype.getTrack = function(e) {
		return this._tracks[e];
	}, e.prototype.getTracks = function() {
		var e = this;
		return H(this._trackKeys, function(t) {
			return e._tracks[t];
		});
	}, e.prototype.stopTracks = function(e, t) {
		if (!e.length || !this._clip) return !0;
		for (var n = this._tracks, r = this._trackKeys, i = 0; i < e.length; i++) {
			var a = n[e[i]];
			a && !a.isFinished() && (t ? a.step(this._target, 1) : this._started === 1 && a.step(this._target, 0), a.setFinished());
		}
		for (var o = !0, i = 0; i < r.length; i++) if (!n[r[i]].isFinished()) {
			o = !1;
			break;
		}
		return o && this._abortedCallback(), o;
	}, e.prototype.saveTo = function(e, t, n) {
		if (e) {
			t ||= this._trackKeys;
			for (var r = 0; r < t.length; r++) {
				var i = t[r], a = this._tracks[i];
				if (a && !a.isFinished()) {
					var o = a.keyframes, s = o[n ? 0 : o.length - 1];
					s && (e[i] = Na(s.rawValue));
				}
			}
		}
	}, e.prototype.__changeFinalValue = function(e, t) {
		t ||= Xt(e);
		for (var n = 0; n < t.length; n++) {
			var r = t[n], i = this._tracks[r];
			if (i) {
				var a = i.keyframes;
				if (a.length > 1) {
					var o = a.pop();
					i.addKeyframe(o.time, e[r]), i.prepare(this._maxTime, i.getAdditiveTrack());
				}
			}
		}
	}, e;
}();
// node_modules/zrender/lib/animation/Animation.js
function Ja() {
	return (/* @__PURE__ */ new Date()).getTime();
}
var Ya = function(e) {
	L(t, e);
	function t(t) {
		var n = e.call(this) || this;
		return n._running = !1, n._time = 0, n._pausedTime = 0, n._pauseStart = 0, n._paused = !1, t ||= {}, n.stage = t.stage || {}, n;
	}
	return t.prototype.addClip = function(e) {
		e.animation && this.removeClip(e), this._head ? (this._tail.next = e, e.prev = this._tail, e.next = null, this._tail = e) : this._head = this._tail = e, e.animation = this;
	}, t.prototype.addAnimator = function(e) {
		e.animation = this;
		var t = e.getClip();
		t && this.addClip(t);
	}, t.prototype.removeClip = function(e) {
		if (e.animation) {
			var t = e.prev, n = e.next;
			t ? t.next = n : this._head = n, n ? n.prev = t : this._tail = t, e.next = e.prev = e.animation = null;
		}
	}, t.prototype.removeAnimator = function(e) {
		var t = e.getClip();
		t && this.removeClip(t), e.animation = null;
	}, t.prototype.update = function(e) {
		for (var t = Ja() - this._pausedTime, n = t - this._time, r = this._head; r;) {
			var i = r.next;
			r.step(t, n) && (r.ondestroy(), this.removeClip(r)), r = i;
		}
		this._time = t, e || (this.trigger("frame", n), this.stage.update && this.stage.update());
	}, t.prototype._startLoop = function() {
		var e = this;
		this._running = !0;
		function t() {
			e._running && (Ci(t), !e._paused && e.update());
		}
		Ci(t);
	}, t.prototype.start = function() {
		this._running || (this._time = Ja(), this._pausedTime = 0, this._startLoop());
	}, t.prototype.stop = function() {
		this._running = !1;
	}, t.prototype.pause = function() {
		this._paused ||= (this._pauseStart = Ja(), !0);
	}, t.prototype.resume = function() {
		this._paused &&= (this._pausedTime += Ja() - this._pauseStart, !1);
	}, t.prototype.clear = function() {
		for (var e = this._head; e;) {
			var t = e.next;
			e.prev = e.next = e.animation = null, e = t;
		}
		this._head = this._tail = null;
	}, t.prototype.isFinished = function() {
		return this._head == null;
	}, t.prototype.animate = function(e, t) {
		t ||= {}, this.start();
		var n = new qa(e, t.loop);
		return this.addAnimator(n), n;
	}, t;
}(qn), Xa = 300, Za = R.domSupported, Qa = (function() {
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
	], n = {
		pointerdown: 1,
		pointerup: 1,
		pointermove: 1,
		pointerout: 1
	};
	return {
		mouse: e,
		touch: t,
		pointer: H(e, function(e) {
			var t = e.replace("mouse", "pointer");
			return n.hasOwnProperty(t) ? t : e;
		})
	};
})(), $a = {
	mouse: ["mousemove", "mouseup"],
	pointer: ["pointermove", "pointerup"]
}, eo = !1;
function to(e) {
	var t = e.pointerType;
	return t === "pen" || t === "touch";
}
function no(e) {
	e.touching = !0, e.touchTimer != null && (clearTimeout(e.touchTimer), e.touchTimer = null), e.touchTimer = setTimeout(function() {
		e.touching = !1, e.touchTimer = null;
	}, 700);
}
function ro(e) {
	e && (e.zrByTouch = !0);
}
function io(e, t) {
	return mr(e.dom, new oo(e, t), !0);
}
function ao(e, t) {
	for (var n = t, r = !1; n && n.nodeType !== 9 && !(r = n.domBelongToZr || n !== t && n === e.painterRoot);) n = n.parentNode;
	return r;
}
var oo = function() {
	function e(e, t) {
		this.stopPropagation = En, this.stopImmediatePropagation = En, this.preventDefault = En, this.type = t.type, this.target = this.currentTarget = e.dom, this.pointerType = t.pointerType, this.clientX = t.clientX, this.clientY = t.clientY;
	}
	return e;
}(), so = {
	mousedown: function(e) {
		e = mr(this.dom, e), this.__mayPointerCapture = [e.zrX, e.zrY], this.trigger("mousedown", e);
	},
	mousemove: function(e) {
		e = mr(this.dom, e);
		var t = this.__mayPointerCapture;
		t && (e.zrX !== t[0] || e.zrY !== t[1]) && this.__togglePointerCapture(!0), this.trigger("mousemove", e);
	},
	mouseup: function(e) {
		e = mr(this.dom, e), this.__togglePointerCapture(!1), this.trigger("mouseup", e);
	},
	mouseout: function(e) {
		e = mr(this.dom, e);
		var t = e.toElement || e.relatedTarget;
		ao(this, t) || (this.__pointerCapturing && (e.zrEventControl = "no_globalout"), this.trigger("mouseout", e));
	},
	wheel: function(e) {
		eo = !0, e = mr(this.dom, e), this.trigger("mousewheel", e);
	},
	mousewheel: function(e) {
		eo || (e = mr(this.dom, e), this.trigger("mousewheel", e));
	},
	touchstart: function(e) {
		e = mr(this.dom, e), ro(e), this.__lastTouchMoment = /* @__PURE__ */ new Date(), this.handler.processGesture(e, "start"), so.mousemove.call(this, e), so.mousedown.call(this, e);
	},
	touchmove: function(e) {
		e = mr(this.dom, e), ro(e), this.handler.processGesture(e, "change"), so.mousemove.call(this, e);
	},
	touchend: function(e) {
		e = mr(this.dom, e), ro(e), this.handler.processGesture(e, "end"), so.mouseup.call(this, e), +/* @__PURE__ */ new Date() - this.__lastTouchMoment < Xa && so.click.call(this, e);
	},
	pointerdown: function(e) {
		so.mousedown.call(this, e);
	},
	pointermove: function(e) {
		to(e) || so.mousemove.call(this, e);
	},
	pointerup: function(e) {
		so.mouseup.call(this, e);
	},
	pointerout: function(e) {
		to(e) || so.mouseout.call(this, e);
	}
};
V([
	"click",
	"dblclick",
	"contextmenu"
], function(e) {
	so[e] = function(t) {
		t = mr(this.dom, t), this.trigger(e, t);
	};
});
var co = {
	pointermove: function(e) {
		to(e) || co.mousemove.call(this, e);
	},
	pointerup: function(e) {
		co.mouseup.call(this, e);
	},
	mousemove: function(e) {
		this.trigger("mousemove", e);
	},
	mouseup: function(e) {
		var t = this.__pointerCapturing;
		this.__togglePointerCapture(!1), this.trigger("mouseup", e), t && (e.zrEventControl = "only_globalout", this.trigger("mouseout", e));
	}
};
function lo(e, t) {
	var n = t.domHandlers;
	R.pointerEventsSupported ? V(Qa.pointer, function(r) {
		fo(t, r, function(t) {
			n[r].call(e, t);
		});
	}) : (R.touchEventsSupported && V(Qa.touch, function(r) {
		fo(t, r, function(i) {
			n[r].call(e, i), no(t);
		});
	}), V(Qa.mouse, function(r) {
		fo(t, r, function(i) {
			i = pr(i), t.touching || n[r].call(e, i);
		});
	}));
}
function uo(e, t) {
	R.pointerEventsSupported ? V($a.pointer, n) : R.touchEventsSupported || V($a.mouse, n);
	function n(n) {
		function r(r) {
			r = pr(r), ao(e, r.target) || (r = io(e, r), t.domHandlers[n].call(e, r));
		}
		fo(t, n, r, { capture: !0 });
	}
}
function fo(e, t, n, r) {
	e.mounted[t] = n, e.listenerOpts[t] = r, gr(e.domTarget, t, n, r);
}
function po(e) {
	var t = e.mounted;
	for (var n in t) t.hasOwnProperty(n) && _r(e.domTarget, n, t[n], e.listenerOpts[n]);
	e.mounted = {};
}
var mo = function() {
	function e(e, t) {
		this.mounted = {}, this.listenerOpts = {}, this.touching = !1, this.domTarget = e, this.domHandlers = t;
	}
	return e;
}(), ho = function(e) {
	L(t, e);
	function t(t, n) {
		var r = e.call(this) || this;
		return r.__pointerCapturing = !1, r.dom = t, r.painterRoot = n, r._localHandlerScope = new mo(t, so), Za && (r._globalHandlerScope = new mo(document, co)), lo(r, r._localHandlerScope), r;
	}
	return t.prototype.dispose = function() {
		po(this._localHandlerScope), Za && po(this._globalHandlerScope);
	}, t.prototype.setCursor = function(e) {
		this.dom.style && (this.dom.style.cursor = e || "default");
	}, t.prototype.__togglePointerCapture = function(e) {
		if (this.__mayPointerCapture = null, Za && +this.__pointerCapturing ^ e) {
			this.__pointerCapturing = e;
			var t = this._globalHandlerScope;
			e ? uo(this, t) : po(t);
		}
	}, t;
}(qn), go = 1;
R.hasGlobalWindow && (go = Math.max(window.devicePixelRatio || window.screen && window.screen.deviceXDPI / window.screen.logicalXDPI || 1, 1));
var _o = go, vo = .4, yo = "#333", bo = "#ccc", xo = "#eee", So = wr, Co = 5e-5;
function wo(e) {
	return e > Co || e < -Co;
}
var To = [], Eo = [], Do = Cr(), Oo = Math.abs, ko = function() {
	function e() {}
	return e.prototype.getLocalTransform = function(e) {
		return Ao(this, e);
	}, e.prototype.setPosition = function(e) {
		this.x = e[0], this.y = e[1];
	}, e.prototype.setScale = function(e) {
		this.scaleX = e[0], this.scaleY = e[1];
	}, e.prototype.setSkew = function(e) {
		this.skewX = e[0], this.skewY = e[1];
	}, e.prototype.setOrigin = function(e) {
		this.originX = e[0], this.originY = e[1];
	}, e.prototype.needLocalTransform = function() {
		return wo(this.rotation) || wo(this.x) || wo(this.y) || wo(this.scaleX - 1) || wo(this.scaleY - 1) || wo(this.skewX) || wo(this.skewY);
	}, e.prototype.updateTransform = function() {
		var e = this.parent && this.parent.transform, t = this.needLocalTransform(), n = this.transform;
		t || e ? (n ||= Cr(), t ? this.getLocalTransform(n) : So(n), e && (t ? Er(n, e, n) : Tr(n, e)), this.transform = n, this._resolveGlobalScaleRatio(n), this.invTransform = this.invTransform || Cr(), Ar(this.invTransform, n)) : n && (So(n), this.invTransform = null);
	}, e.prototype._resolveGlobalScaleRatio = function(e) {
		var t = this.globalScaleRatio;
		if (t != null && t !== 1) {
			this.getGlobalScale(To);
			var n = To[0] < 0 ? -1 : 1, r = To[1] < 0 ? -1 : 1, i = ((To[0] - n) * t + n) / To[0] || 0, a = ((To[1] - r) * t + r) / To[1] || 0;
			e[0] *= i, e[1] *= i, e[2] *= a, e[3] *= a;
		}
	}, e.prototype.getComputedTransform = function() {
		for (var e = this, t = []; e;) t.push(e), e = e.parent;
		for (; e = t.pop();) e.updateTransform();
		return this.transform;
	}, e.prototype.setLocalTransform = function(e) {
		if (e) {
			var t = e[0] * e[0] + e[1] * e[1], n = e[2] * e[2] + e[3] * e[3], r = Math.atan2(e[1], e[0]), i = Math.PI / 2 + r - Math.atan2(e[3], e[2]);
			n = Math.sqrt(n) * Math.cos(i), t = Math.sqrt(t), this.skewX = i, this.skewY = 0, this.rotation = -r, this.x = +e[4], this.y = +e[5], this.scaleX = t, this.scaleY = n, this.originX = 0, this.originY = 0;
		}
	}, e.prototype.decomposeTransform = function() {
		if (this.transform) {
			var e = this.parent, t = this.transform;
			e && e.transform && (e.invTransform = e.invTransform || Cr(), Er(Eo, e.invTransform, t), t = Eo);
			var n = this.originX, r = this.originY;
			(n || r) && (Do[4] = n, Do[5] = r, Er(Eo, t, Do), Eo[4] -= n, Eo[5] -= r, t = Eo), this.setLocalTransform(t);
		}
	}, e.prototype.getGlobalScale = function(e) {
		var t = this.transform;
		return e ||= [], t ? (e[0] = Math.sqrt(t[0] * t[0] + t[1] * t[1]), e[1] = Math.sqrt(t[2] * t[2] + t[3] * t[3]), t[0] < 0 && (e[0] = -e[0]), t[3] < 0 && (e[1] = -e[1]), e) : (e[0] = 1, e[1] = 1, e);
	}, e.prototype.transformCoordToLocal = function(e, t) {
		var n = [e, t], r = this.invTransform;
		return r && Hn(n, n, r), n;
	}, e.prototype.transformCoordToGlobal = function(e, t) {
		var n = [e, t], r = this.transform;
		return r && Hn(n, n, r), n;
	}, e.prototype.getLineScale = function() {
		var e = this.transform;
		return e && Oo(e[0] - 1) > 1e-10 && Oo(e[3] - 1) > 1e-10 ? Math.sqrt(Oo(e[0] * e[3] - e[2] * e[1])) : 1;
	}, e.prototype.copyTransform = function(e) {
		Mo(this, e);
	}, e.getLocalTransform = function(e, t) {
		t ||= [];
		var n = e.originX || 0, r = e.originY || 0, i = e.scaleX, a = e.scaleY, o = e.anchorX, s = e.anchorY, c = e.rotation || 0, l = e.x, u = e.y, d = e.skewX ? Math.tan(e.skewX) : 0, f = e.skewY ? Math.tan(-e.skewY) : 0;
		if (n || r || o || s) {
			var p = n + o, m = r + s;
			t[4] = -p * i - d * m * a, t[5] = -m * a - f * p * i;
		} else t[4] = t[5] = 0;
		return t[0] = i, t[3] = a, t[1] = f * i, t[2] = d * a, c && Or(t, t, c), t[4] += n + l, t[5] += r + u, t;
	}, e.initDefaultProps = (function() {
		var t = e.prototype;
		t.scaleX = t.scaleY = t.globalScaleRatio = 1, t.x = t.y = t.originX = t.originY = t.skewX = t.skewY = t.rotation = t.anchorX = t.anchorY = 0;
	})(), e;
}(), Ao = ko.getLocalTransform, jo = [
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
function Mo(e, t) {
	return Ht(e, t, jo);
}
// node_modules/zrender/lib/contain/text.js
function No(e) {
	Po ||= new ta(100), e ||= "12px sans-serif";
	var t = Po.get(e);
	return t || (t = {
		font: e,
		strWidthCache: new ta(500),
		asciiWidthMap: null,
		asciiWidthMapTried: !1,
		stWideCharWidth: Tt.measureText("国", e).width,
		asciiCharWidth: Tt.measureText("a", e).width
	}, Po.put(e, t)), t;
}
var Po;
function Fo(e) {
	if (!(Io >= Lo)) {
		e ||= "12px sans-serif";
		for (var t = [], n = +/* @__PURE__ */ new Date(), r = 0; r <= 127; r++) t[r] = Tt.measureText(String.fromCharCode(r), e).width;
		var i = +/* @__PURE__ */ new Date() - n;
		return i > 16 ? Io = Lo : i > 2 && Io++, t;
	}
}
var Io = 0, Lo = 5;
function Ro(e, t) {
	return e.asciiWidthMapTried ||= (e.asciiWidthMap = Fo(e.font), !0), 0 <= t && t <= 127 ? e.asciiWidthMap == null ? e.asciiCharWidth : e.asciiWidthMap[t] : e.stWideCharWidth;
}
function zo(e, t) {
	var n = e.strWidthCache, r = n.get(t);
	return r ?? (r = Tt.measureText(t, e.font).width, n.put(t, r)), r;
}
function Bo(e, t, n, r) {
	var i = zo(No(t), e), a = Wo(t);
	return new X(Ho(0, i, n), Uo(0, a, r), i, a);
}
function Vo(e, t, n, r) {
	var i = ((e || "") + "").split("\n");
	if (i.length === 1) return Bo(i[0], t, n, r);
	for (var a = new X(0, 0, 0, 0), o = 0; o < i.length; o++) {
		var s = Bo(i[o], t, n, r);
		o === 0 ? a.copy(s) : a.union(s);
	}
	return a;
}
function Ho(e, t, n, r) {
	return n === "right" ? r ? e += t : e -= t : n === "center" && (r ? e += t / 2 : e -= t / 2), e;
}
function Uo(e, t, n, r) {
	return n === "middle" ? r ? e += t / 2 : e -= t / 2 : n === "bottom" && (r ? e += t : e -= t), e;
}
function Wo(e) {
	return No(e).stWideCharWidth;
}
function Go(e, t) {
	return typeof e == "string" ? e.lastIndexOf("%") >= 0 ? parseFloat(e) / 100 * t : parseFloat(e) : e;
}
function Ko(e, t, n) {
	var r = t.position || "inside", i = t.distance == null ? 5 : t.distance, a = n.height, o = n.width, s = a / 2, c = n.x, l = n.y, u = "left", d = "top";
	if (r instanceof Array) c += Go(r[0], n.width), l += Go(r[1], n.height), u = null, d = null;
	else switch (r) {
		case "left":
			c -= i, l += s, u = "right", d = "middle";
			break;
		case "right":
			c += i + o, l += s, d = "middle";
			break;
		case "top":
			c += o / 2, l -= i, u = "center", d = "bottom";
			break;
		case "bottom":
			c += o / 2, l += a + i, u = "center";
			break;
		case "inside":
			c += o / 2, l += s, u = "center", d = "middle";
			break;
		case "insideLeft":
			c += i, l += s, d = "middle";
			break;
		case "insideRight":
			c += o - i, l += s, u = "right", d = "middle";
			break;
		case "insideTop":
			c += o / 2, l += i, u = "center";
			break;
		case "insideBottom":
			c += o / 2, l += a - i, u = "center", d = "bottom";
			break;
		case "insideTopLeft":
			c += i, l += i;
			break;
		case "insideTopRight":
			c += o - i, l += i, u = "right";
			break;
		case "insideBottomLeft":
			c += i, l += a - i, d = "bottom";
			break;
		case "insideBottomRight": c += o - i, l += a - i, u = "right", d = "bottom";
	}
	return e ||= {}, e.x = c, e.y = l, e.align = u, e.verticalAlign = d, e;
}
// node_modules/zrender/lib/Element.js
var qo = "__zr_normal__", Jo = jo.concat(["ignore"]), Yo = Jt(jo, function(e, t) {
	return e[t] = !0, e;
}, { ignore: !1 }), Xo = {}, Zo = new X(0, 0, 0, 0), Qo = [], $o = function() {
	function e(e) {
		this.id = zt(), this.animators = [], this.currentStates = [], this.states = {}, this._init(e);
	}
	return e.prototype._init = function(e) {
		this.attr(e);
	}, e.prototype.drift = function(e, t, n) {
		switch (this.draggable) {
			case "horizontal":
				t = 0;
				break;
			case "vertical": e = 0;
		}
		var r = this.transform;
		r ||= this.transform = [
			1,
			0,
			0,
			1,
			0,
			0
		], r[4] += e, r[5] += t, this.decomposeTransform(), this.markRedraw();
	}, e.prototype.beforeUpdate = function() {}, e.prototype.afterUpdate = function() {}, e.prototype.update = function() {
		this.updateTransform(), this.__dirty && this.updateInnerText();
	}, e.prototype.updateInnerText = function(e) {
		var t = this._textContent;
		if (t && (!t.ignore || e)) {
			this.textConfig ||= {};
			var n = this.textConfig, r = n.local, i = t.innerTransformable, a = void 0, o = void 0, s = !1;
			i.parent = r ? this : null;
			var c = !1;
			i.copyTransform(t);
			var l = n.position != null, u = n.autoOverflowArea, d = void 0;
			if ((u || l) && (d = Zo, n.layoutRect ? d.copy(n.layoutRect) : d.copy(this.getBoundingRect()), r || d.applyTransform(this.transform)), l) {
				this.calculateTextPosition ? this.calculateTextPosition(Xo, n, d) : Ko(Xo, n, d), i.x = Xo.x, i.y = Xo.y, a = Xo.align, o = Xo.verticalAlign;
				var f = n.origin;
				if (f && n.rotation != null) {
					var p = void 0, m = void 0;
					f === "center" ? (p = d.width * .5, m = d.height * .5) : (p = Go(f[0], d.width), m = Go(f[1], d.height)), c = !0, i.originX = -i.x + p + (r ? 0 : d.x), i.originY = -i.y + m + (r ? 0 : d.y);
				}
			}
			n.rotation != null && (i.rotation = n.rotation);
			var h = n.offset;
			h && (i.x += h[0], i.y += h[1], c || (i.originX = -h[0], i.originY = -h[1]));
			var g = this._innerTextDefaultStyle ||= {};
			if (u) {
				var _ = g.overflowRect = g.overflowRect || new X(0, 0, 0, 0);
				i.getLocalTransform(Qo), Ar(Qo, Qo), X.copy(_, d), _.applyTransform(Qo);
			} else g.overflowRect = null;
			var v = n.inside == null ? typeof n.position == "string" && n.position.indexOf("inside") >= 0 : n.inside, y = void 0, b = void 0, x = void 0;
			v && this.canBeInsideText() ? (y = n.insideFill, b = n.insideStroke, (y == null || y === "auto") && (y = this.getInsideTextFill()), (b == null || b === "auto") && (b = this.getInsideTextStroke(y), x = !0)) : (y = n.outsideFill, b = n.outsideStroke, (y == null || y === "auto") && (y = this.getOutsideFill()), (b == null || b === "auto") && (b = this.getOutsideStroke(y), x = !0)), y ||= "#000", (y !== g.fill || b !== g.stroke || x !== g.autoStroke || a !== g.align || o !== g.verticalAlign) && (s = !0, g.fill = y, g.stroke = b, g.autoStroke = x, g.align = a, g.verticalAlign = o, t.setDefaultTextStyle(g)), t.__dirty |= 1, s && t.dirtyStyle(!0);
		}
	}, e.prototype.canBeInsideText = function() {
		return !0;
	}, e.prototype.getInsideTextFill = function() {
		return "#fff";
	}, e.prototype.getInsideTextStroke = function(e) {
		return "#000";
	}, e.prototype.getOutsideFill = function() {
		return this.__zr && this.__zr.isDarkMode() ? bo : yo;
	}, e.prototype.getOutsideStroke = function(e) {
		var t = this.__zr && this.__zr.getBackgroundColor(), n = typeof t == "string" && ma(t);
		n ||= [
			255,
			255,
			255,
			1
		];
		for (var r = n[3], i = this.__zr.isDarkMode(), a = 0; a < 3; a++) n[a] = n[a] * r + (i ? 0 : 255) * (1 - r);
		return n[3] = 1, ya(n, "rgba");
	}, e.prototype.traverse = function(e, t) {}, e.prototype.attrKV = function(e, t) {
		e === "textConfig" ? this.setTextConfig(t) : e === "textContent" ? this.setTextContent(t) : e === "clipPath" ? this.setClipPath(t) : e === "extra" ? (this.extra = this.extra || {}, B(this.extra, t)) : this[e] = t;
	}, e.prototype.hide = function() {
		this.ignore = !0, this.markRedraw();
	}, e.prototype.show = function() {
		this.ignore = !1, this.markRedraw();
	}, e.prototype.attr = function(e, t) {
		if (typeof e == "string") this.attrKV(e, t);
		else if (K(e)) for (var n = Xt(e), r = 0; r < n.length; r++) {
			var i = n[r];
			this.attrKV(i, e[i]);
		}
		return this.markRedraw(), this;
	}, e.prototype.saveCurrentToNormalState = function(e) {
		this._innerSaveToNormal(e);
		for (var t = this._normalState, n = 0; n < this.animators.length; n++) {
			var r = this.animators[n], i = r.__fromStateTransition;
			if (!(r.getLoop() || i && i !== "__zr_normal__")) {
				var a = r.targetName, o = a ? t[a] : t;
				r.saveTo(o);
			}
		}
	}, e.prototype._innerSaveToNormal = function(e) {
		var t = this._normalState;
		t ||= this._normalState = {}, e.textConfig && !t.textConfig && (t.textConfig = this.textConfig), this._savePrimaryToNormal(e, t, Jo);
	}, e.prototype._savePrimaryToNormal = function(e, t, n) {
		for (var r = 0; r < n.length; r++) {
			var i = n[r];
			e[i] != null && !(i in t) && (t[i] = this[i]);
		}
	}, e.prototype.hasState = function() {
		return this.currentStates.length > 0;
	}, e.prototype.getState = function(e) {
		return this.states[e];
	}, e.prototype.ensureState = function(e) {
		var t = this.states;
		return t[e] || (t[e] = {}), t[e];
	}, e.prototype.clearStates = function(e) {
		this.useState(qo, !1, e);
	}, e.prototype.useState = function(e, t, n, r) {
		var i = e === qo;
		if (this.hasState() || !i) {
			var a = this.currentStates, o = this.stateTransition;
			if (!(Wt(a, e) >= 0 && (t || a.length === 1))) {
				var s;
				if (this.stateProxy && !i && (s = this.stateProxy(e)), s ||= this.states && this.states[e], !s && !i) Bt("State " + e + " not exists.");
				else {
					i || this.saveCurrentToNormalState(s);
					var c = this._textContent, l = ss(this, c, s, r);
					l && !this.__inHover && (this.__inHover = l), this._applyStateObj(e, s, this._normalState, t, ls(this, n, o), o);
					var u = this._textGuide;
					return c && c.useState(e, t, n, !!l), u && u.useState(e, t, n, !!l), i ? (this.currentStates = [], this._normalState = {}) : t ? this.currentStates.push(e) : this.currentStates = [e], this._updateAnimationTargets(), this.markRedraw(), !l && this.__inHover && (this.__inHover = 0, this.__dirty &= -2), s;
				}
			}
		}
	}, e.prototype.useStates = function(e, t, n) {
		if (!e.length) this.clearStates();
		else {
			var r = [], i = this.currentStates, a = e.length, o = a === i.length;
			if (o) {
				for (var s = 0; s < a; s++) if (e[s] !== i[s]) {
					o = !1;
					break;
				}
			}
			if (o) return;
			for (var s = 0; s < a; s++) {
				var c = e[s], l = void 0;
				this.stateProxy && (l = this.stateProxy(c, e)), l ||= this.states[c], l && r.push(l);
			}
			var u = r[a - 1], d = this._textContent, f = ss(this, d, u, n);
			f && !this.__inHover && (this.__inHover = f);
			var p = this._mergeStates(r), m = this.stateTransition;
			this.saveCurrentToNormalState(p), this._applyStateObj(e.join(","), p, this._normalState, !1, ls(this, t, m), m);
			var h = this._textGuide;
			d && d.useStates(e, t, !!f), h && h.useStates(e, t, !!f), this._updateAnimationTargets(), this.currentStates = e.slice(), this.markRedraw(), !f && this.__inHover && (this.__inHover = 0, this.__dirty &= -2);
		}
	}, e.prototype.isSilent = function() {
		for (var e = this; e;) {
			if (e.silent) return !0;
			var t = e.__hostTarget;
			e = t ? e.ignoreHostSilent ? null : t : e.parent;
		}
		return !1;
	}, e.prototype._updateAnimationTargets = function() {
		for (var e = 0; e < this.animators.length; e++) {
			var t = this.animators[e];
			t.targetName && t.changeTarget(this[t.targetName]);
		}
	}, e.prototype.removeState = function(e) {
		var t = Wt(this.currentStates, e);
		if (t >= 0) {
			var n = this.currentStates.slice();
			n.splice(t, 1), this.useStates(n);
		}
	}, e.prototype.replaceState = function(e, t, n) {
		var r = this.currentStates.slice(), i = Wt(r, e), a = Wt(r, t) >= 0;
		i >= 0 ? a ? r.splice(i, 1) : r[i] = t : n && !a && r.push(t), this.useStates(r);
	}, e.prototype.toggleState = function(e, t) {
		t ? this.useState(e, !0) : this.removeState(e);
	}, e.prototype._mergeStates = function(e) {
		for (var t = {}, n, r = 0; r < e.length; r++) {
			var i = e[r];
			B(t, i), i.textConfig && (n ||= {}, B(n, i.textConfig));
		}
		return n && (t.textConfig = n), t;
	}, e.prototype._applyStateObj = function(e, t, n, r, i, a) {
		if (this.__inHover !== 1) {
			var o = !(t && r);
			t && t.textConfig ? (this.textConfig = B({}, r ? this.textConfig : n.textConfig), B(this.textConfig, t.textConfig)) : o && n.textConfig && (this.textConfig = n.textConfig);
			for (var s = {}, c = !1, l = 0; l < Jo.length; l++) {
				var u = Jo[l], d = i && Yo[u];
				t && t[u] != null ? d ? (c = !0, s[u] = t[u]) : this[u] = t[u] : o && n[u] != null && (d ? (c = !0, s[u] = n[u]) : this[u] = n[u]);
			}
			if (!i) for (var l = 0; l < this.animators.length; l++) {
				var f = this.animators[l], p = f.targetName;
				f.getLoop() || f.__changeFinalValue(p ? (t || n)[p] : t || n);
			}
			c && this._transitionState(e, s, a);
		}
	}, e.prototype._attachComponent = function(e) {
		if ((!e.__zr || e.__hostTarget) && e !== this) {
			var t = this.__zr;
			t && e.addSelfToZr(t), e.__zr = t, e.__hostTarget = this;
		}
	}, e.prototype._detachComponent = function(e) {
		e.__zr && e.removeSelfFromZr(e.__zr), e.__zr = null, e.__hostTarget = null;
	}, e.prototype.getClipPath = function() {
		return this._clipPath;
	}, e.prototype.setClipPath = function(e) {
		this._clipPath && this._clipPath !== e && this.removeClipPath(), this._attachComponent(e), this._clipPath = e, this.markRedraw();
	}, e.prototype.removeClipPath = function() {
		var e = this._clipPath;
		e && (this._detachComponent(e), this._clipPath = null, this.markRedraw());
	}, e.prototype.getTextContent = function() {
		return this._textContent;
	}, e.prototype.setTextContent = function(e) {
		var t = this._textContent;
		t !== e && (t && t !== e && this.removeTextContent(), e.innerTransformable = new ko(), this._attachComponent(e), this._textContent = e, this.markRedraw());
	}, e.prototype.setTextConfig = function(e) {
		this.textConfig ||= {}, B(this.textConfig, e), this.markRedraw();
	}, e.prototype.removeTextConfig = function() {
		this.textConfig = null, this.markRedraw();
	}, e.prototype.removeTextContent = function() {
		var e = this._textContent;
		e && (e.innerTransformable = null, this._detachComponent(e), this._textContent = null, this._innerTextDefaultStyle = null, this.markRedraw());
	}, e.prototype.getTextGuideLine = function() {
		return this._textGuide;
	}, e.prototype.setTextGuideLine = function(e) {
		this._textGuide && this._textGuide !== e && this.removeTextGuideLine(), this._attachComponent(e), this._textGuide = e, this.markRedraw();
	}, e.prototype.removeTextGuideLine = function() {
		var e = this._textGuide;
		e && (this._detachComponent(e), this._textGuide = null, this.markRedraw());
	}, e.prototype.markRedraw = function() {
		this.__dirty |= 1;
		var e = this.__zr;
		e && (this.__inHover ? e.refreshHover() : e.refresh()), this.__hostTarget && this.__hostTarget.markRedraw();
	}, e.prototype.dirty = function() {
		this.markRedraw();
	}, e.prototype.addSelfToZr = function(e) {
		if (this.__zr !== e) {
			this.__zr = e;
			var t = this.animators;
			if (t) for (var n = 0; n < t.length; n++) e.animation.addAnimator(t[n]);
			this._clipPath && this._clipPath.addSelfToZr(e), this._textContent && this._textContent.addSelfToZr(e), this._textGuide && this._textGuide.addSelfToZr(e);
		}
	}, e.prototype.removeSelfFromZr = function(e) {
		if (this.__zr) {
			this.__zr = null;
			var t = this.animators;
			if (t) for (var n = 0; n < t.length; n++) e.animation.removeAnimator(t[n]);
			this._clipPath && this._clipPath.removeSelfFromZr(e), this._textContent && this._textContent.removeSelfFromZr(e), this._textGuide && this._textGuide.removeSelfFromZr(e);
		}
	}, e.prototype.animate = function(e, t, n) {
		var r = new qa(e ? this[e] : this, t, n);
		return e && (r.targetName = e), this.addAnimator(r, e), r;
	}, e.prototype.addAnimator = function(e, t) {
		var n = this.__zr, r = this;
		e.during(function() {
			r.updateDuringAnimation(t);
		}).done(function() {
			var t = r.animators, n = Wt(t, e);
			n >= 0 && t.splice(n, 1);
		}), this.animators.push(e), n && n.animation.addAnimator(e), n && n.wakeUp();
	}, e.prototype.updateDuringAnimation = function(e) {
		this.markRedraw();
	}, e.prototype.stopAnimation = function(e, t) {
		for (var n = this.animators, r = n.length, i = [], a = 0; a < r; a++) {
			var o = n[a];
			!e || e === o.scope ? o.stop(t) : i.push(o);
		}
		return this.animators = i, this;
	}, e.prototype.animateTo = function(e, t, n) {
		es(this, e, t, n);
	}, e.prototype.animateFrom = function(e, t, n) {
		es(this, e, t, n, !0);
	}, e.prototype._transitionState = function(e, t, n, r) {
		for (var i = es(this, t, n, r), a = 0; a < i.length; a++) i[a].__fromStateTransition = e;
	}, e.prototype.getBoundingRect = function() {
		return null;
	}, e.prototype.getPaintRect = function() {
		return null;
	}, e.initDefaultProps = (function() {
		var t = e.prototype;
		t.type = "element", t.name = "", t.ignore = t.silent = t.ignoreHostSilent = t.isGroup = t.draggable = t.dragging = t.ignoreClip = !1, t.__inHover = 0, t.__dirty = 1;
		function n(e, n, r, i) {
			Object.defineProperty(t, e, {
				get: function() {
					if (!this[n]) {
						var e = this[n] = [];
						a(this, e);
					}
					return this[n];
				},
				set: function(e) {
					this[r] = e[0], this[i] = e[1], this[n] = e, a(this, e);
				}
			});
			function a(e, t) {
				Object.defineProperty(t, 0, {
					get: function() {
						return e[r];
					},
					set: function(t) {
						e[r] = t;
					}
				}), Object.defineProperty(t, 1, {
					get: function() {
						return e[i];
					},
					set: function(t) {
						e[i] = t;
					}
				});
			}
		}
		Object.defineProperty && (n("position", "_legacyPos", "x", "y"), n("scale", "_legacyScale", "scaleX", "scaleY"), n("origin", "_legacyOrigin", "originX", "originY"));
	})(), e;
}();
Kt($o, qn), Kt($o, ko);
function es(e, t, n, r, i) {
	n ||= {};
	var a = [];
	os(e, "", e, t, n, r, a, i);
	var o = a.length, s = !1, c = n.done, l = n.aborted, u = function() {
		s = !0, o--, o <= 0 && (s ? c && c() : l && l());
	}, d = function() {
		o--, o <= 0 && (s ? c && c() : l && l());
	};
	o || c && c(), a.length > 0 && n.during && a[0].during(function(e, t) {
		n.during(t);
	});
	for (var f = 0; f < a.length; f++) {
		var p = a[f];
		u && p.done(u), d && p.aborted(d), n.force && p.duration(n.duration), p.start(n.easing);
	}
	return a;
}
function ts(e, t, n) {
	for (var r = 0; r < n; r++) e[r] = t[r];
}
function ns(e) {
	return qt(e[0]);
}
function rs(e, t, n) {
	if (qt(t[n])) {
		if (qt(e[n]) || (e[n] = []), rn(t[n])) {
			var r = t[n].length;
			e[n].length !== r && (e[n] = new t[n].constructor(r), ts(e[n], t[n], r));
		} else {
			var i = t[n], a = e[n], o = i.length;
			if (ns(i)) for (var s = i[0].length, c = 0; c < o; c++) a[c] ? ts(a[c], i[c], s) : a[c] = Array.prototype.slice.call(i[c]);
			else ts(a, i, o);
			a.length = i.length;
		}
	} else e[n] = t[n];
}
function is(e, t) {
	return e === t || qt(e) && qt(t) && as(e, t);
}
function as(e, t) {
	var n = e.length;
	if (n !== t.length) return !1;
	for (var r = 0; r < n; r++) if (e[r] !== t[r]) return !1;
	return !0;
}
function os(e, t, n, r, i, a, o, s) {
	for (var c = Xt(r), l = i.duration, u = i.delay, d = i.additive, f = i.setToFinal, p = !K(a), m = e.animators, h = [], g = 0; g < c.length; g++) {
		var _ = c[g], v = r[_];
		if (v != null && n[_] != null && (p || a[_])) {
			if (K(v) && !qt(v) && !on(v)) {
				if (t) {
					s || (n[_] = v, e.updateDuringAnimation(t));
					continue;
				}
				os(e, _, n[_], v, i, a && a[_], o, s);
			} else h.push(_);
		} else s || (n[_] = v, e.updateDuringAnimation(t), h.push(_));
	}
	var y = h.length;
	if (!d && y) for (var b = 0; b < m.length; b++) {
		var x = m[b];
		if (x.targetName === t && x.stopTracks(h)) {
			var S = Wt(m, x);
			m.splice(S, 1);
		}
	}
	if (i.force || (h = Yt(h, function(e) {
		return !is(r[e], n[e]);
	}), y = h.length), y > 0 || i.force && !o.length) {
		var C = void 0, w = void 0, T = void 0;
		if (s) {
			w = {}, f && (C = {});
			for (var b = 0; b < y; b++) {
				var _ = h[b];
				w[_] = n[_], f ? C[_] = r[_] : n[_] = r[_];
			}
		} else if (f) {
			T = {};
			for (var b = 0; b < y; b++) {
				var _ = h[b];
				T[_] = Na(n[_]), rs(n, r, _);
			}
		}
		var x = new qa(n, !1, !1, d ? Yt(m, function(e) {
			return e.targetName === t;
		}) : null);
		x.targetName = t, i.scope && (x.scope = i.scope), f && C && x.whenWithKeys(0, C, h), T && x.whenWithKeys(0, T, h), x.whenWithKeys(l ?? 500, s ? w : r, h).delay(u || 0), e.addAnimator(x, t), o.push(x);
	}
}
function ss(e, t, n, r) {
	return !(n && n.hoverLayer || r) || cs(e) || t && cs(t) ? 0 : 1;
}
function cs(e) {
	return e.type === "text" || e.type === "tspan";
}
function ls(e, t, n) {
	return !t && !e.__inHover && n && n.duration > 0;
}
// node_modules/zrender/lib/graphic/Group.js
var us = function(e) {
	L(t, e);
	function t(t) {
		var n = e.call(this) || this;
		return n.isGroup = !0, n._children = [], n.attr(t), n;
	}
	return t.prototype.childrenRef = function() {
		return this._children;
	}, t.prototype.children = function() {
		return this._children.slice();
	}, t.prototype.childAt = function(e) {
		return this._children[e];
	}, t.prototype.childOfName = function(e) {
		for (var t = this._children, n = 0; n < t.length; n++) if (t[n].name === e) return t[n];
	}, t.prototype.childCount = function() {
		return this._children.length;
	}, t.prototype.add = function(e) {
		return e && e !== this && e.parent !== this && (this._children.push(e), this._doAdd(e)), this;
	}, t.prototype.addBefore = function(e, t) {
		if (e && e !== this && e.parent !== this && t && t.parent === this) {
			var n = this._children, r = n.indexOf(t);
			r >= 0 && (n.splice(r, 0, e), this._doAdd(e));
		}
		return this;
	}, t.prototype.replace = function(e, t) {
		var n = Wt(this._children, e);
		return n >= 0 && this.replaceAt(t, n), this;
	}, t.prototype.replaceAt = function(e, t) {
		var n = this._children, r = n[t];
		if (e && e !== this && e.parent !== this && e !== r) {
			n[t] = e, r.parent = null;
			var i = this.__zr;
			i && r.removeSelfFromZr(i), this._doAdd(e);
		}
		return this;
	}, t.prototype._doAdd = function(e) {
		e.parent && e.parent.remove(e), e.parent = this;
		var t = this.__zr;
		t && t !== e.__zr && e.addSelfToZr(t), t && t.refresh();
	}, t.prototype.remove = function(e) {
		var t = this.__zr, n = this._children, r = Wt(n, e);
		return r < 0 || (n.splice(r, 1), e.parent = null, t && e.removeSelfFromZr(t), t && t.refresh()), this;
	}, t.prototype.removeAll = function() {
		for (var e = this._children, t = this.__zr, n = 0; n < e.length; n++) {
			var r = e[n];
			t && r.removeSelfFromZr(t), r.parent = null;
		}
		return e.length = 0, this;
	}, t.prototype.eachChild = function(e, t) {
		for (var n = this._children, r = 0; r < n.length; r++) {
			var i = n[r];
			e.call(t, i, r);
		}
		return this;
	}, t.prototype.traverse = function(e, t) {
		for (var n = 0; n < this._children.length; n++) {
			var r = this._children[n], i = e.call(t, r);
			r.isGroup && !i && r.traverse(e, t);
		}
		return this;
	}, t.prototype.addSelfToZr = function(t) {
		e.prototype.addSelfToZr.call(this, t);
		for (var n = 0; n < this._children.length; n++) this._children[n].addSelfToZr(t);
	}, t.prototype.removeSelfFromZr = function(t) {
		e.prototype.removeSelfFromZr.call(this, t);
		for (var n = 0; n < this._children.length; n++) this._children[n].removeSelfFromZr(t);
	}, t.prototype.getBoundingRect = function(e) {
		for (var t = new X(0, 0, 0, 0), n = e || this._children, r = [], i = null, a = 0; a < n.length; a++) {
			var o = n[a];
			if (!(o.ignore || o.invisible)) {
				var s = o.getBoundingRect(), c = o.getLocalTransform(r);
				c ? (X.applyTransform(t, s, c), i ||= t.clone(), i.union(t)) : (i ||= s.clone(), i.union(s));
			}
		}
		return i || t;
	}, t;
}($o);
us.prototype.type = "group";
// node_modules/zrender/lib/zrender.js
var ds = {}, fs = {};
function ps(e) {
	delete fs[e];
}
function ms(e) {
	if (!e) return !1;
	if (typeof e == "string") return ba(e, 1) < vo;
	if (e.colorStops) {
		for (var t = e.colorStops, n = 0, r = t.length, i = 0; i < r; i++) n += ba(t[i].color, 1);
		return n /= r, n < vo;
	}
	return !1;
}
var hs = function() {
	function e(e, t, n) {
		var r = this;
		this._sleepAfterStill = 10, this._stillFrameAccum = 0, this._needsRefresh = !0, this._needsRefreshHover = !1, this._darkMode = !1, n ||= {}, this.dom = t, this.id = e;
		var i = new Si(), a = n.renderer || "canvas";
		ds[a] || (a = Xt(ds)[0]), n.useDirtyRect = n.useDirtyRect != null && n.useDirtyRect;
		var o = new ds[a](t, i, n, e), s = n.ssr || o.ssrOnly;
		this.storage = i, this.painter = o;
		var c = !R.node && !R.worker && !s ? new ho(o.getViewportRoot(), o.root) : null, l = n.useCoarsePointer, u = l == null || l === "auto" ? R.touchEventsSupported : !!l, d = 44, f;
		u && (f = q(n.pointerSize, d)), this.handler = new ai(i, o, c, o.root, f), this.animation = new Ya({ stage: { update: s ? null : function() {
			return r._flush(!1);
		} } }), s || this.animation.start();
	}
	return e.prototype.add = function(e) {
		!this._disposed && e && (this.storage.addRoot(e), e.addSelfToZr(this), this.refresh());
	}, e.prototype.remove = function(e) {
		!this._disposed && e && (this.storage.delRoot(e), e.removeSelfFromZr(this), this.refresh());
	}, e.prototype.configLayer = function(e, t) {
		this._disposed || (this.painter.configLayer && this.painter.configLayer(e, t), this.refresh());
	}, e.prototype.setBackgroundColor = function(e) {
		this._disposed || (this.painter.setBackgroundColor && this.painter.setBackgroundColor(e), this.refresh(), this._backgroundColor = e, this._darkMode = ms(e));
	}, e.prototype.getBackgroundColor = function() {
		return this._backgroundColor;
	}, e.prototype.setDarkMode = function(e) {
		this._darkMode = e;
	}, e.prototype.isDarkMode = function() {
		return this._darkMode;
	}, e.prototype.refreshImmediately = function(e) {
		this._disposed || this._refresh({
			animUpdate: !e,
			refresh: !0,
			refreshHover: !1
		});
	}, e.prototype._refresh = function(e) {
		e.animUpdate && this.animation.update(!0), this._needsRefresh = this._needsRefreshHover = !1, this.painter.refresh({
			refresh: e.refresh,
			refreshHover: e.refreshHover
		}), this._needsRefresh = this._needsRefreshHover = !1;
	}, e.prototype.refresh = function() {
		this._disposed || (this._needsRefresh = !0, this.animation.start());
	}, e.prototype.flush = function() {
		this._disposed || this._flush(!0);
	}, e.prototype._flush = function(e) {
		var t, n = Ja(), r = this._needsRefresh, i = this._needsRefreshHover;
		(r || i) && (t = !0, this._refresh({
			animUpdate: e,
			refresh: r,
			refreshHover: i
		}));
		var a = Ja();
		t ? (this._stillFrameAccum = 0, this.trigger("rendered", { elapsedTime: a - n })) : this._sleepAfterStill > 0 && (this._stillFrameAccum++, this._stillFrameAccum > this._sleepAfterStill && this.animation.stop());
	}, e.prototype.setSleepAfterStill = function(e) {
		this._sleepAfterStill = e;
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
	}, e.prototype.resize = function(e) {
		this._disposed || (e ||= {}, this.painter.resize(e.width, e.height), this.handler.resize());
	}, e.prototype.clearAnimation = function() {
		this._disposed || this.animation.clear();
	}, e.prototype.getWidth = function() {
		if (!this._disposed) return this.painter.getWidth();
	}, e.prototype.getHeight = function() {
		if (!this._disposed) return this.painter.getHeight();
	}, e.prototype.setCursorStyle = function(e) {
		this._disposed || this.handler.setCursorStyle(e);
	}, e.prototype.findHover = function(e, t) {
		if (!this._disposed) return this.handler.findHover(e, t);
	}, e.prototype.on = function(e, t, n) {
		return this._disposed || this.handler.on(e, t, n), this;
	}, e.prototype.off = function(e, t) {
		this._disposed || this.handler.off(e, t);
	}, e.prototype.trigger = function(e, t) {
		this._disposed || this.handler.trigger(e, t);
	}, e.prototype.clear = function() {
		if (!this._disposed) {
			for (var e = this.storage.getRoots(), t = 0; t < e.length; t++) e[t] instanceof us && e[t].removeSelfFromZr(this);
			this.storage.delAllRoots(), this.painter.clear();
		}
	}, e.prototype.dispose = function() {
		this._disposed || (this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), this.handler.dispose(), this.animation = this.storage = this.painter = this.handler = null, this._disposed = !0, ps(this.id));
	}, e;
}();
function gs(e, t) {
	var n = new hs(zt(), e, t);
	return fs[n.id] = n, n;
}
function _s(e, t) {
	ds[e] = t;
}
// node_modules/echarts/lib/util/number.js
var vs = 1e-4, ys = 20;
function bs(e) {
	return e.replace(/^\s+|\s+$/g, "");
}
var xs = Math.min, Ss = Math.max, Cs = Math.abs, ws = Math.round, Ts = Math.floor, Es = Math.pow, Ds = Math.PI, Os = Math.random;
function ks(e, t, n, r) {
	var i = t[0], a = t[1], o = n[0], s = n[1], c = a - i, l = s - o;
	if (c === 0) return l === 0 ? o : (o + s) / 2;
	if (r) {
		if (c > 0) {
			if (e <= i) return o;
			if (e >= a) return s;
		} else if (e >= i) return o;
		else if (e <= a) return s;
	} else {
		if (e === i) return o;
		if (e === a) return s;
	}
	return (e - i) / c * l + o;
}
var As = js;
function js(e, t, n) {
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
		case "bottom": e = "100%";
	}
	return Ms(e, t, n);
}
function Ms(e, t, n) {
	return G(e) ? Ns(e) ? parseFloat(e) / 100 * t + (n || 0) : parseFloat(e) : e == null ? NaN : +e;
}
function Ns(e) {
	return !!bs(e).match(/%$/);
}
function Ps(e, t, n) {
	return isNaN(t) ? n ? "" + e : +e : (t = xs(Ss(0, t), ys), e = (+e).toFixed(t), n ? e : +e);
}
function Fs(e) {
	return e.sort(function(e, t) {
		return e - t;
	}), e;
}
function Is(e) {
	if (e = +e, isNaN(e)) return 0;
	if (e > 1e-14) {
		for (var t = 1, n = 0; n < 15; n++, t *= 10) if (ws(e * t) / t === e) return n;
	}
	return Ls(e);
}
function Ls(e) {
	var t = e.toString().toLowerCase(), n = t.indexOf("e"), r = n > 0 ? +t.slice(n + 1) : 0, i = n > 0 ? n : t.length, a = t.indexOf(".");
	return Ss(0, (a < 0 ? 0 : i - 1 - a) - r);
}
function Rs(e, t) {
	var n = Jt(e, function(e, t) {
		return e + (isNaN(t) ? 0 : t);
	}, 0);
	if (n === 0) return [];
	for (var r = Es(10, t), i = H(e, function(e) {
		return (isNaN(e) ? 0 : e) / n * r * 100;
	}), a = r * 100, o = H(i, function(e) {
		return Ts(e);
	}), s = Jt(o, function(e, t) {
		return e + t;
	}, 0), c = H(i, function(e, t) {
		return e - o[t];
	}); s < a;) {
		for (var l = -Infinity, u = null, d = 0, f = c.length; d < f; ++d) c[d] > l && (l = c[d], u = d);
		++o[u], c[u] = 0, ++s;
	}
	return H(o, function(e) {
		return e / r;
	});
}
function zs(e, t) {
	var n = Ss(Is(e), Is(t)), r = e + t;
	return n > ys ? r : Ps(r, n);
}
Es(2, 53) - 1;
function Bs(e) {
	var t = Ds * 2;
	return (e % t + t) % t;
}
function Vs(e) {
	return e > -vs && e < vs;
}
var Hs = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d{1,2})(?::(\d{1,2})(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/;
function Us(e) {
	if (e instanceof Date) return e;
	if (G(e)) {
		var t = Hs.exec(e);
		if (!t) return /* @__PURE__ */ new Date(NaN);
		if (t[8]) {
			var n = +t[4] || 0;
			return t[8].toUpperCase() !== "Z" && (n -= +t[8].slice(0, 3)), new Date(Date.UTC(+t[1], (t[2] || 1) - 1, +t[3] || 1, n, +(t[5] || 0), +t[6] || 0, t[7] ? +t[7].substring(0, 3) : 0));
		}
		return new Date(+t[1], (t[2] || 1) - 1, +t[3] || 1, +t[4] || 0, +(t[5] || 0), +t[6] || 0, t[7] ? +t[7].substring(0, 3) : 0);
	}
	return e == null ? /* @__PURE__ */ new Date(NaN) : new Date(ws(e));
}
function Ws(e) {
	var t = parseFloat(e);
	return t == e && (t !== 0 || !G(e) || e.indexOf("x") <= 0) ? t : NaN;
}
function Gs(e) {
	return !isNaN(Ws(e));
}
function Ks() {
	return ws(Os() * 9);
}
function qs(e, t) {
	return t === 0 ? e : qs(t, e % t);
}
function Js(e, t) {
	return e == null ? t : t == null ? e : e * t / qs(e, t);
}
function Ys(e) {
	return e != null && isFinite(e);
}
// node_modules/echarts/lib/util/log.js
var Xs = "[ECharts] ", Zs = {}, Qs = typeof console < "u" && console.warn && console.log;
function $s(e, t, n) {
	if (Qs) {
		if (n) {
			if (Zs[t]) return;
			Zs[t] = !0;
		}
		console[e](Xs + t);
	}
}
function ec(e, t) {
	$s("error", e, t);
}
function tc(e) {
	throw Error(e);
}
// node_modules/echarts/lib/util/model.js
var nc = "series\0", rc = "\0_ec_\0";
function ic(e) {
	return e instanceof Array ? e : e == null ? [] : [e];
}
function ac(e, t, n) {
	if (e) {
		e[t] = e[t] || {}, e.emphasis = e.emphasis || {}, e.emphasis[t] = e.emphasis[t] || {};
		for (var r = 0, i = n.length; r < i; r++) {
			var a = n[r];
			!e.emphasis[t].hasOwnProperty(a) && e[t].hasOwnProperty(a) && (e.emphasis[t][a] = e[t][a]);
		}
	}
}
var oc = /* @__PURE__ */ "fontStyle.fontWeight.fontSize.fontFamily.rich.tag.color.textBorderColor.textBorderWidth.width.height.lineHeight.align.verticalAlign.baseline.shadowColor.shadowBlur.shadowOffsetX.shadowOffsetY.textShadowColor.textShadowBlur.textShadowOffsetX.textShadowOffsetY.backgroundColor.borderColor.borderWidth.borderRadius.padding".split(".");
function sc(e) {
	return K(e) && !U(e) && !(e instanceof Date) ? e.value : e;
}
function cc(e) {
	return K(e) && !(e instanceof Array);
}
function lc(e, t, n) {
	var r = n === "normalMerge", i = n === "replaceMerge", a = n === "replaceAll";
	e ||= [], t = (t || []).slice();
	var o = J();
	V(t, function(e, n) {
		K(e) || (t[n] = null);
	});
	var s = uc(e, o, n);
	return (r || i) && dc(s, e, o, t), r && fc(s, t), r || i ? pc(s, t, i) : a && mc(s, t), hc(s), s;
}
function uc(e, t, n) {
	var r = [];
	if (n === "replaceAll") return r;
	for (var i = 0; i < e.length; i++) {
		var a = e[i];
		a && a.id != null && t.set(a.id, i), r.push({
			existing: n === "replaceMerge" || bc(a) ? null : a,
			newOption: null,
			keyInfo: null,
			brandNew: null
		});
	}
	return r;
}
function dc(e, t, n, r) {
	V(r, function(i, a) {
		if (i && i.id != null) {
			var o = _c(i.id), s = n.get(o);
			if (s != null) {
				var c = e[s];
				pn(!c.newOption, "Duplicated option on id \"" + o + "\"."), c.newOption = i, c.existing = t[s], r[a] = null;
			}
		}
	});
}
function fc(e, t) {
	V(t, function(n, r) {
		if (n && n.name != null) for (var i = 0; i < e.length; i++) {
			var a = e[i].existing;
			if (!e[i].newOption && a && (a.id == null || n.id == null) && !bc(n) && !bc(a) && gc("name", a, n)) {
				e[i].newOption = n, t[r] = null;
				return;
			}
		}
	});
}
function pc(e, t, n) {
	V(t, function(t) {
		if (t) {
			for (var r, i = 0; (r = e[i]) && (r.newOption || bc(r.existing) || r.existing && t.id != null && !gc("id", t, r.existing));) i++;
			r ? (r.newOption = t, r.brandNew = n) : e.push({
				newOption: t,
				brandNew: n,
				existing: null,
				keyInfo: null
			}), i++;
		}
	});
}
function mc(e, t) {
	V(t, function(t) {
		e.push({
			newOption: t,
			brandNew: !0,
			existing: null,
			keyInfo: null
		});
	});
}
function hc(e) {
	var t = J();
	V(e, function(e) {
		var n = e.existing;
		n && t.set(n.id, e);
	}), V(e, function(e) {
		var n = e.newOption;
		pn(!n || n.id == null || !t.get(n.id) || t.get(n.id) === e, "id duplicates: " + (n && n.id)), n && n.id != null && t.set(n.id, e), !e.keyInfo && (e.keyInfo = {});
	}), V(e, function(e, n) {
		var r = e.existing, i = e.newOption, a = e.keyInfo;
		if (K(i)) {
			if (a.name = i.name == null ? r ? r.name : nc + n : _c(i.name), r) a.id = _c(r.id);
			else if (i.id != null) a.id = _c(i.id);
			else {
				var o = 0;
				do
					a.id = "\0" + a.name + "\0" + o++;
				while (t.get(a.id));
			}
			t.set(a.id, e);
		}
	});
}
function gc(e, t, n) {
	var r = vc(t[e], null), i = vc(n[e], null);
	return r != null && i != null && r === i;
}
function _c(e) {
	return vc(e, "");
}
function vc(e, t) {
	return e == null ? t : G(e) ? e : tn(e) || en(e) ? e + "" : t;
}
function yc(e) {
	var t = e.name;
	return !!(t && t.indexOf(nc));
}
function bc(e) {
	return e && e.id != null && _c(e.id).indexOf(rc) === 0;
}
function xc(e, t, n) {
	V(e, function(e) {
		var r = e.newOption;
		K(r) && (e.keyInfo.mainType = t, e.keyInfo.subType = Sc(t, r, e.existing, n));
	});
}
function Sc(e, t, n, r) {
	return t.type ? t.type : n ? n.subType : r.determineSubType(e, t);
}
function Cc(e, t) {
	if (t.dataIndexInside != null) return t.dataIndexInside;
	if (t.dataIndex != null) return U(t.dataIndex) ? H(t.dataIndex, function(t) {
		return e.indexOfRawIndex(t);
	}) : e.indexOfRawIndex(t.dataIndex);
	if (t.name != null) return U(t.name) ? H(t.name, function(t) {
		return e.indexOfName(t);
	}) : e.indexOfName(t.name);
}
function Z() {
	var e = "__ec_inner_" + wc++;
	return function(t) {
		return t[e] || (t[e] = {});
	};
}
var wc = Ks();
function Tc(e, t, n) {
	var r = Ec(t, n), i = r.mainTypeSpecified, a = r.queryOptionMap, o = r.others, s = n ? n.defaultMainType : null;
	return !i && s && a.set(s, {}), a.each(function(t, r) {
		var i = Oc(e, r, t, {
			useDefault: s === r,
			enableAll: n && n.enableAll != null ? n.enableAll : !0,
			enableNone: n && n.enableNone != null ? n.enableNone : !0
		});
		o[r + "Models"] = i.models, o[r + "Model"] = i.models[0];
	}), o;
}
function Ec(e, t) {
	var n;
	if (G(e)) {
		var r = {};
		r[e + "Index"] = 0, n = r;
	} else n = e;
	var i = J(), a = {}, o = !1;
	return V(n, function(e, n) {
		if (n === "dataIndex" || n === "dataIndexInside") a[n] = e;
		else {
			var r = n.match(/^(\w+)(Index|Id|Name)$/) || [], s = r[1], c = (r[2] || "").toLowerCase();
			if (!(!s || !c || t && t.includeMainTypes && Wt(t.includeMainTypes, s) < 0)) {
				o ||= !!s;
				var l = i.get(s) || i.set(s, {});
				l[c] = e;
			}
		}
	}), {
		mainTypeSpecified: o,
		queryOptionMap: i,
		others: a
	};
}
var Dc = {
	useDefault: !0,
	enableAll: !1,
	enableNone: !1
};
function Oc(e, t, n, r) {
	r ||= Dc;
	var i = n.index, a = n.id, o = n.name, s = {
		models: null,
		specified: i != null || a != null || o != null
	};
	if (!s.specified) {
		var c = void 0;
		return s.models = r.useDefault && (c = e.getComponent(t)) ? [c] : [], s;
	}
	if (i === "none" || i === !1) {
		if (r.enableNone) return s.models = [], s;
		i = -1;
	}
	return i === "all" && (i = r.enableAll ? a = o = null : -1), s.models = e.queryComponents({
		mainType: t,
		index: i,
		id: a,
		name: o
	}), s;
}
function kc(e, t, n) {
	var r = {};
	r[t + "Id"] = e[t + "Id"], r[t + "Index"] = e[t + "Index"], r[t + "Name"] = e[t + "Name"];
	var i = {
		mainType: t,
		query: r
	};
	return n && (i.subType = n), i;
}
function Ac(e, t, n) {
	e.setAttribute ? e.setAttribute(t, n) : e[t] = n;
}
function jc(e, t) {
	return e.getAttribute ? e.getAttribute(t) : e[t];
}
function Mc(e) {
	return e === "auto" ? R.domSupported ? "html" : "richText" : e || "html";
}
(function() {
	function e() {}
	return e.prototype.reset = function(e, t, n, r) {
		return this._list = e, this._step = r ||= 1, this._idx = t, this._end = n ?? (r > 0 ? e.length : 0), this.item = null, this.key = NaN, this;
	}, e.prototype.next = function() {
		return (this._step > 0 ? this._idx < this._end : this._idx >= this._end) && (this.item = this._list[this._idx], this.key = this._idx += this._step, !0);
	}, e;
})();
function Nc() {
	return [Infinity, -Infinity];
}
function Pc() {
	var e = "__ec_once_" + Fc++;
	return function(t, n) {
		Tn(t, e) || (t[e] = 1, n());
	};
}
var Fc = Ks();
function Ic(e, t, n) {
	var r = J(), i = 0;
	V(e, function(a) {
		var o = t(a), s = r.get(o) || 0;
		n && n(a, s), !s && !n && (e[i++] = a), r.set(o, s + 1);
	}), n || (e.length = i);
}
function Lc(e, t, n) {
	var r = e.getData().count();
	return {
		progressiveRender: n.progressiveEnabled && t.incrementalPrepareRender && r >= n.threshold,
		large: e.get("large") && r >= e.get("largeThreshold"),
		modDataCount: e.get("progressiveChunkMode") === "mod" ? e.getData().count() : null
	};
}
function Rc(e, t) {
	return {
		seriesType: e,
		overallReset: t
	};
}
function zc(e) {
	return { overallReset: e };
}
// node_modules/echarts/lib/util/clazz.js
var Bc = ".", Vc = "___EC__COMPONENT__CONTAINER___", Hc = "___EC__EXTENDED_CLASS___";
function Uc(e) {
	var t = {
		main: "",
		sub: ""
	};
	if (e) {
		var n = e.split(Bc);
		t.main = n[0] || "", t.sub = n[1] || "";
	}
	return t;
}
function Wc(e) {
	pn(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(e), "componentType \"" + e + "\" illegal");
}
function Gc(e) {
	return !!(e && e[Hc]);
}
function Kc(e, t) {
	e.$constructor = e, e.extend = function(e) {
		var t = this, n;
		return qc(t) ? n = function(e) {
			L(t, e);
			function t() {
				return e.apply(this, arguments) || this;
			}
			return t;
		}(t) : (n = function() {
			(e.$constructor || t).apply(this, arguments);
		}, Gt(n, this)), B(n.prototype, e), n[Hc] = !0, n.extend = this.extend, n.superCall = Zc, n.superApply = Qc, n.superClass = t, n;
	};
}
function qc(e) {
	return W(e) && /^class\s/.test(Function.prototype.toString.call(e));
}
function Jc(e, t) {
	e.extend = t.extend;
}
var Yc = Math.round(Math.random() * 10);
function Xc(e) {
	var t = ["__\0is_clz", Yc++].join("_");
	e.prototype[t] = !0, e.isInstance = function(e) {
		return !!(e && e[t]);
	};
}
function Zc(e, t) {
	var n = [...arguments].slice(2);
	return this.superClass.prototype[t].apply(e, n);
}
function Qc(e, t, n) {
	return this.superClass.prototype[t].apply(e, n);
}
function $c(e) {
	var t = {};
	e.registerClass = function(e) {
		var r = e.type || e.prototype.type;
		if (r) {
			Wc(r), e.prototype.type = r;
			var i = Uc(r);
			if (!i.sub) t[i.main] = e;
			else if (i.sub !== Vc) {
				var a = n(i);
				a[i.sub] = e;
			}
		}
		return e;
	}, e.getClass = function(e, n, r) {
		var i = t[e];
		if (i && i[Vc] && (i = n ? i[n] : null), r && !i) throw Error(n ? "Component " + e + "." + (n || "") + " is used but not imported." : e + ".type should be specified.");
		return i;
	}, e.getClassesByMainType = function(e) {
		var n = Uc(e), r = [], i = t[n.main];
		return i && i[Vc] ? V(i, function(e, t) {
			t !== Vc && r.push(e);
		}) : r.push(i), r;
	}, e.hasClass = function(e) {
		return !!t[Uc(e).main];
	}, e.getAllClassMainTypes = function() {
		var e = [];
		return V(t, function(t, n) {
			e.push(n);
		}), e;
	}, e.hasSubTypes = function(e) {
		var n = t[Uc(e).main];
		return n && n[Vc];
	};
	function n(e) {
		var n = t[e.main];
		return n && n[Vc] || (n = t[e.main] = {}, n[Vc] = !0), n;
	}
}
// node_modules/echarts/lib/model/mixin/makeStyleMapper.js
function el(e, t) {
	for (var n = 0; n < e.length; n++) e[n][1] || (e[n][1] = e[n][0]);
	return t ||= !1, function(n, r, i) {
		for (var a = {}, o = 0; o < e.length; o++) {
			var s = e[o][1];
			if (!(r && Wt(r, s) >= 0 || i && Wt(i, s) < 0)) {
				var c = n.getShallow(s, t);
				c != null && (a[e[o][0]] = c);
			}
		}
		return a;
	};
}
var tl = el([
	["fill", "color"],
	["shadowBlur"],
	["shadowOffsetX"],
	["shadowOffsetY"],
	["opacity"],
	["shadowColor"]
]), nl = function() {
	function e() {}
	return e.prototype.getAreaStyle = function(e, t) {
		return tl(this, e, t);
	}, e;
}(), rl = new ta(50);
function il(e) {
	if (typeof e == "string") {
		var t = rl.get(e);
		return t && t.image;
	}
	return e;
}
function al(e, t, n, r, i) {
	if (!e) return t;
	if (typeof e == "string") {
		if (t && t.__zrImageSrc === e || !n) return t;
		var a = rl.get(e), o = {
			hostEl: n,
			cb: r,
			cbPayload: i
		};
		return a ? (t = a.image, !sl(t) && a.pending.push(o)) : (t = Tt.loadImage(e, ol, ol), t.__zrImageSrc = e, rl.put(e, t.__cachedImgObj = {
			image: t,
			pending: [o]
		})), t;
	}
	return e;
}
function ol() {
	var e = this.__cachedImgObj;
	this.onload = this.onerror = this.__cachedImgObj = null;
	for (var t = 0; t < e.pending.length; t++) {
		var n = e.pending[t], r = n.cb;
		r && r(this, n.cbPayload), n.hostEl.dirty();
	}
	e.pending.length = 0;
}
function sl(e) {
	return e && e.width && e.height;
}
// node_modules/zrender/lib/graphic/helper/parseText.js
var cl = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g;
function ll(e, t, n, r, i, a) {
	if (!n) e.text = "", e.isTruncated = !1;
	else {
		var o = (t + "").split("\n");
		a = ul(n, r, i, a);
		for (var s = !1, c = {}, l = 0, u = o.length; l < u; l++) dl(c, o[l], a), o[l] = c.textLine, s ||= c.isTruncated;
		e.text = o.join("\n"), e.isTruncated = s;
	}
}
function ul(e, t, n, r) {
	r ||= {};
	var i = B({}, r);
	n = q(n, "..."), i.maxIterations = q(r.maxIterations, 2);
	var a = i.minChar = q(r.minChar, 0), o = i.fontMeasureInfo = No(t), s = o.asciiCharWidth;
	i.placeholder = q(r.placeholder, "");
	for (var c = e = Math.max(0, e - 1), l = 0; l < a && c >= s; l++) c -= s;
	var u = zo(o, n);
	return u > c && (n = "", u = 0), c = e - u, i.ellipsis = n, i.ellipsisWidth = u, i.contentWidth = c, i.containerWidth = e, i;
}
function dl(e, t, n) {
	var r = n.containerWidth, i = n.contentWidth, a = n.fontMeasureInfo;
	if (!r) e.textLine = "", e.isTruncated = !1;
	else {
		var o = zo(a, t);
		if (o <= r) e.textLine = t, e.isTruncated = !1;
		else {
			for (var s = 0;; s++) {
				if (o <= i || s >= n.maxIterations) {
					t += n.ellipsis;
					break;
				}
				var c = s === 0 ? fl(t, i, a) : o > 0 ? Math.floor(t.length * i / o) : 0;
				t = t.substr(0, c), o = zo(a, t);
			}
			t === "" && (t = n.placeholder), e.textLine = t, e.isTruncated = !0;
		}
	}
}
function fl(e, t, n) {
	for (var r = 0, i = 0, a = e.length; i < a && r < t; i++) r += Ro(n, e.charCodeAt(i));
	return i;
}
function pl(e, t, n, r) {
	var i = El(e), a = t.overflow, o = t.padding, s = o ? o[1] + o[3] : 0, c = o ? o[0] + o[2] : 0, l = t.font, u = a === "truncate", d = Wo(l), f = q(t.lineHeight, d), p = t.lineOverflow === "truncate", m = !1, h = t.width;
	h == null && n != null && (h = n - s);
	var g = t.height;
	g == null && r != null && (g = r - c);
	var _ = h != null && (a === "break" || a === "breakAll") ? i ? Sl(i, t.font, h, a === "breakAll", 0).lines : [] : i ? i.split("\n") : [], v = _.length * f;
	if (g ??= v, v > g && p) {
		var y = Math.floor(g / f);
		m ||= _.length > y, _ = _.slice(0, y), v = _.length * f;
	}
	if (i && u && h != null) for (var b = ul(h, l, t.ellipsis, {
		minChar: t.truncateMinChar,
		placeholder: t.placeholder
	}), x = {}, S = 0; S < _.length; S++) dl(x, _[S], b), _[S] = x.textLine, m ||= x.isTruncated;
	for (var C = g, w = 0, T = No(l), S = 0; S < _.length; S++) w = Math.max(zo(T, _[S]), w);
	h ??= w;
	var E = h;
	return C += c, E += s, {
		lines: _,
		height: g,
		outerWidth: E,
		outerHeight: C,
		lineHeight: f,
		calculatedLineHeight: d,
		contentWidth: w,
		contentHeight: v,
		width: h,
		isTruncated: m
	};
}
var ml = function() {
	function e() {}
	return e;
}(), hl = function() {
	function e(e) {
		this.tokens = [], e && (this.tokens = e);
	}
	return e;
}(), gl = function() {
	function e() {
		this.width = 0, this.height = 0, this.contentWidth = 0, this.contentHeight = 0, this.outerWidth = 0, this.outerHeight = 0, this.lines = [], this.isTruncated = !1;
	}
	return e;
}();
function _l(e, t, n, r, i) {
	var a = new gl(), o = El(e);
	if (!o) return a;
	var s = t.padding, c = s ? s[1] + s[3] : 0, l = s ? s[0] + s[2] : 0, u = t.width;
	u == null && n != null && (u = n - c);
	var d = t.height;
	d == null && r != null && (d = r - l);
	for (var f = t.overflow, p = (f === "break" || f === "breakAll") && u != null ? {
		width: u,
		accumWidth: 0,
		breakAll: f === "breakAll"
	} : null, m = cl.lastIndex = 0, h; (h = cl.exec(o)) != null;) {
		var g = h.index;
		g > m && vl(a, o.substring(m, g), t, p), vl(a, h[2], t, p, h[1]), m = cl.lastIndex;
	}
	m < o.length && vl(a, o.substring(m, o.length), t, p);
	var _ = [], v = 0, y = 0, b = f === "truncate", x = t.lineOverflow === "truncate", S = {};
	function C(e, t, n) {
		e.width = t, e.lineHeight = n, v += n, y = Math.max(y, t);
	}
	outer: for (var w = 0; w < a.lines.length; w++) {
		for (var T = a.lines[w], E = 0, D = 0, O = 0; O < T.tokens.length; O++) {
			var k = T.tokens[O], A = k.styleName && t.rich[k.styleName] || {}, j = k.textPadding = A.padding, ee = j ? j[1] + j[3] : 0, te = k.font = A.font || t.font;
			k.contentHeight = Wo(te);
			var ne = q(A.height, k.contentHeight);
			if (k.innerHeight = ne, j && (ne += j[0] + j[2]), k.height = ne, k.lineHeight = un(A.lineHeight, t.lineHeight, ne), k.align = A && A.align || i, k.verticalAlign = A && A.verticalAlign || "middle", x && d != null && v + k.lineHeight > d) {
				var re = a.lines.length;
				O > 0 ? (T.tokens = T.tokens.slice(0, O), C(T, D, E), a.lines = a.lines.slice(0, w + 1)) : a.lines = a.lines.slice(0, w), a.isTruncated = a.isTruncated || a.lines.length < re;
				break outer;
			}
			var ie = A.width, ae = ie == null || ie === "auto";
			if (typeof ie == "string" && ie.charAt(ie.length - 1) === "%") k.percentWidth = ie, _.push(k), k.contentWidth = zo(No(te), k.text);
			else {
				if (ae) {
					var oe = A.backgroundColor, se = oe && oe.image;
					se && (se = il(se), sl(se) && (k.width = Math.max(k.width, se.width * ne / se.height)));
				}
				var ce = b && u != null ? u - D : null;
				ce != null && ce < k.width ? !ae || ce < ee ? (k.text = "", k.width = k.contentWidth = 0) : (ll(S, k.text, ce - ee, te, t.ellipsis, { minChar: t.truncateMinChar }), k.text = S.text, a.isTruncated = a.isTruncated || S.isTruncated, k.width = k.contentWidth = zo(No(te), k.text)) : k.contentWidth = zo(No(te), k.text);
			}
			k.width += ee, D += k.width, A && (E = Math.max(E, k.lineHeight));
		}
		C(T, D, E);
	}
	a.outerWidth = a.width = q(u, y), a.outerHeight = a.height = q(d, v), a.contentHeight = v, a.contentWidth = y, a.outerWidth += c, a.outerHeight += l;
	for (var w = 0; w < _.length; w++) {
		var k = _[w], le = k.percentWidth;
		k.width = parseInt(le, 10) / 100 * a.width;
	}
	return a;
}
function vl(e, t, n, r, i) {
	var a = t === "", o = i && n.rich[i] || {}, s = e.lines, c = o.font || n.font, l = !1, u, d;
	if (r) {
		var f = o.padding, p = f ? f[1] + f[3] : 0;
		if (o.width != null && o.width !== "auto") {
			var m = Go(o.width, r.width) + p;
			s.length > 0 && m + r.accumWidth > r.width && (u = t.split("\n"), l = !0), r.accumWidth = m;
		} else {
			var h = Sl(t, c, r.width, r.breakAll, r.accumWidth);
			r.accumWidth = h.accumWidth + p, d = h.linesWidths, u = h.lines;
		}
	}
	u ||= t.split("\n");
	for (var g = No(c), _ = 0; _ < u.length; _++) {
		var v = u[_], y = new ml();
		if (y.styleName = i, y.text = v, y.isLineHolder = !v && !a, y.width = typeof o.width == "number" ? o.width : d ? d[_] : zo(g, v), !_ && !l) {
			var b = (s[s.length - 1] || (s[0] = new hl())).tokens, x = b.length;
			x === 1 && b[0].isLineHolder ? b[0] = y : (v || !x || a) && b.push(y);
		} else s.push(new hl([y]));
	}
}
function yl(e) {
	var t = e.charCodeAt(0);
	return t >= 32 && t <= 591 || t >= 880 && t <= 4351 || t >= 4608 && t <= 5119 || t >= 7680 && t <= 8303;
}
var bl = Jt(",&?/;] ".split(""), function(e, t) {
	return e[t] = !0, e;
}, {});
function xl(e) {
	return !yl(e) || !!bl[e];
}
function Sl(e, t, n, r, i) {
	for (var a = [], o = [], s = "", c = "", l = 0, u = 0, d = No(t), f = 0; f < e.length; f++) {
		var p = e.charAt(f);
		if (p === "\n") c && (s += c, u += l), a.push(s), o.push(u), s = "", c = "", l = 0, u = 0;
		else {
			var m = Ro(d, p.charCodeAt(0)), h = !r && !xl(p);
			(a.length ? u + m > n : i + u + m > n) ? u ? (s || c) && (h ? (s || (s = c, c = "", l = 0, u = l), a.push(s), o.push(u - l), c += p, l += m, s = "", u = l) : (c && (s += c, c = "", l = 0), a.push(s), o.push(u), s = p, u = m)) : h ? (a.push(c), o.push(l), c = p, l = m) : (a.push(p), o.push(m)) : (u += m, h ? (c += p, l += m) : (c && (s += c, c = "", l = 0), s += p));
		}
	}
	return c && (s += c), s && (a.push(s), o.push(u)), a.length === 1 && (u += i), {
		accumWidth: u,
		lines: a,
		linesWidths: o
	};
}
function Cl(e, t, n, r, i, a) {
	if (e.baseX = n, e.baseY = r, e.outerWidth = e.outerHeight = null, t) {
		var o = t.width * 2, s = t.height * 2;
		X.set(wl, Ho(n, o, i), Uo(r, s, a), o, s), X.intersect(t, wl, null, Tl);
		var c = Tl.outIntersectRect;
		e.outerWidth = c.width, e.outerHeight = c.height, e.baseX = Ho(c.x, c.width, i, !0), e.baseY = Uo(c.y, c.height, a, !0);
	}
}
var wl = new X(0, 0, 0, 0), Tl = {
	outIntersectRect: {},
	clamp: !0
};
function El(e) {
	return e == null ? e = "" : e += "";
}
function Dl(e) {
	var t = El(e.text), n = e.font;
	return Ol(e, zo(No(n), t), Wo(n), null);
}
function Ol(e, t, n, r) {
	var i = new X(Ho(e.x || 0, t, e.textAlign), Uo(e.y || 0, n, e.textBaseline), t, n), a = r ?? (kl(e) ? e.lineWidth : 0);
	return a > 0 && (i.x -= a / 2, i.y -= a / 2, i.width += a, i.height += a), i;
}
function kl(e) {
	var t = e.stroke;
	return t != null && t !== "none" && e.lineWidth > 0;
}
// node_modules/zrender/lib/graphic/Displayable.js
var Al = "__zr_style_" + Math.round(Math.random() * 10), jl = {
	shadowBlur: 0,
	shadowOffsetX: 0,
	shadowOffsetY: 0,
	shadowColor: "#000",
	opacity: 1,
	blend: "source-over"
}, Ml = { style: {
	shadowBlur: !0,
	shadowOffsetX: !0,
	shadowOffsetY: !0,
	shadowColor: !0,
	opacity: !0
} };
jl[Al] = !0;
var Nl = [
	"z",
	"z2",
	"invisible"
], Pl = ["invisible"], Fl = function(e) {
	L(t, e);
	function t(t) {
		return e.call(this, t) || this;
	}
	return t.prototype._init = function(t) {
		for (var n = Xt(t), r = 0; r < n.length; r++) {
			var i = n[r];
			i === "style" ? this.useStyle(t[i]) : e.prototype.attrKV.call(this, i, t[i]);
		}
		this.style || this.useStyle({});
	}, t.prototype.beforeBrush = function(e) {}, t.prototype.afterBrush = function() {}, t.prototype.innerBeforeBrush = function() {}, t.prototype.innerAfterBrush = function() {}, t.prototype.shouldBePainted = function(e, t, n, r) {
		var i = this.transform;
		if (this.ignore || this.invisible || this.style.opacity === 0 || this.culling && Rl(this, e, t) || i && !i[0] && !i[3]) return !1;
		if (n && this.__clipPaths && this.__clipPaths.length) {
			for (var a = 0; a < this.__clipPaths.length; ++a) if (this.__clipPaths[a].isZeroArea()) return !1;
		}
		if (r && this.parent) for (var o = this.parent; o;) {
			if (o.ignore) return !1;
			o = o.parent;
		}
		return !0;
	}, t.prototype.contain = function(e, t) {
		return this.rectContain(e, t);
	}, t.prototype.traverse = function(e, t) {
		e.call(t, this);
	}, t.prototype.rectContain = function(e, t) {
		var n = this.transformCoordToLocal(e, t);
		return this.getBoundingRect().contain(n[0], n[1]);
	}, t.prototype.getPaintRect = function() {
		var e = this._paintRect;
		if (!this._paintRect || this.__dirty) {
			var t = this.transform, n = this.getBoundingRect(), r = this.style, i = r.shadowBlur || 0, a = r.shadowOffsetX || 0, o = r.shadowOffsetY || 0;
			e = this._paintRect ||= new X(0, 0, 0, 0), t ? X.applyTransform(e, n, t) : e.copy(n), (i || a || o) && (e.width += i * 2 + Math.abs(a), e.height += i * 2 + Math.abs(o), e.x = Math.min(e.x, e.x + a - i), e.y = Math.min(e.y, e.y + o - i));
			var s = this.dirtyRectTolerance;
			e.isZero() || (e.x = Math.floor(e.x - s), e.y = Math.floor(e.y - s), e.width = Math.ceil(e.width + 1 + s * 2), e.height = Math.ceil(e.height + 1 + s * 2));
		}
		return e;
	}, t.prototype.setPrevPaintRect = function(e) {
		e ? (this._prevPaintRect = this._prevPaintRect || new X(0, 0, 0, 0), this._prevPaintRect.copy(e)) : this._prevPaintRect = null;
	}, t.prototype.getPrevPaintRect = function() {
		return this._prevPaintRect;
	}, t.prototype.animateStyle = function(e) {
		return this.animate("style", e);
	}, t.prototype.updateDuringAnimation = function(e) {
		e === "style" ? this.dirtyStyle() : this.markRedraw();
	}, t.prototype.attrKV = function(t, n) {
		t === "style" ? this.style ? this.setStyle(n) : this.useStyle(n) : e.prototype.attrKV.call(this, t, n);
	}, t.prototype.setStyle = function(e, t) {
		return typeof e == "string" ? this.style[e] = t : B(this.style, e), this.dirtyStyle(), this;
	}, t.prototype.dirtyStyle = function(e) {
		e || this.markRedraw(), this.__dirty |= 2, this._rect &&= null;
	}, t.prototype.dirty = function() {
		this.dirtyStyle();
	}, t.prototype.styleChanged = function() {
		return !!(this.__dirty & 2);
	}, t.prototype.styleUpdated = function() {
		this.__dirty &= -3;
	}, t.prototype.createStyle = function(e) {
		return Cn(jl, e);
	}, t.prototype.useStyle = function(e) {
		e[Al] || (e = this.createStyle(e)), this.style = e, this.dirtyStyle();
	}, t.prototype._useHoverStyle = function(e) {
		this.__hoverStyle = e;
	}, t.prototype.isStyleObject = function(e) {
		return e[Al];
	}, t.prototype._innerSaveToNormal = function(t) {
		e.prototype._innerSaveToNormal.call(this, t);
		var n = this._normalState;
		t.style && !n.style && (n.style = this._mergeStyle(this.createStyle(), this.style)), this._savePrimaryToNormal(t, n, Nl);
	}, t.prototype._applyStateObj = function(t, n, r, i, a, o) {
		e.prototype._applyStateObj.call(this, t, n, r, i, a, o);
		var s = !(n && i), c = this.__inHover === 1, l;
		if (n && n.style ? a ? i ? l = n.style : (l = this._mergeStyle(this.createStyle(), r.style), this._mergeStyle(l, n.style)) : (l = this._mergeStyle(this.createStyle(), i ? this.style : r.style), this._mergeStyle(l, n.style)) : s && (l = r.style), l) {
			if (a) {
				var u = this.style;
				if (this.style = this.createStyle(s ? {} : u), s) for (var d = Xt(u), f = 0; f < d.length; f++) {
					var p = d[f];
					p in l && (l[p] = l[p], this.style[p] = u[p]);
				}
				for (var m = Xt(l), f = 0; f < m.length; f++) {
					var p = m[f];
					this.style[p] = this.style[p];
				}
				this._transitionState(t, { style: l }, o, this.getAnimationStyleProps());
			} else c ? this._useHoverStyle(l) : this.useStyle(l);
		}
		if (!c) for (var h = this.__inHover ? Pl : Nl, f = 0; f < h.length; f++) {
			var p = h[f];
			n && n[p] != null ? this[p] = n[p] : s && r[p] != null && (this[p] = r[p]);
		}
	}, t.prototype._mergeStates = function(t) {
		for (var n = e.prototype._mergeStates.call(this, t), r, i = 0; i < t.length; i++) {
			var a = t[i];
			a.style && (r ||= {}, this._mergeStyle(r, a.style));
		}
		return r && (n.style = r), n;
	}, t.prototype._mergeStyle = function(e, t) {
		return B(e, t), e;
	}, t.prototype.getAnimationStyleProps = function() {
		return Ml;
	}, t.initDefaultProps = (function() {
		var e = t.prototype;
		e.type = "displayable", e.invisible = !1, e.z = 0, e.z2 = 0, e.zlevel = 0, e.culling = !1, e.cursor = "pointer", e.rectHover = !1, e.incremental = 0, e._rect = null, e.dirtyRectTolerance = 0, e.__dirty = 3;
	})(), t;
}($o), Il = new X(0, 0, 0, 0), Ll = new X(0, 0, 0, 0);
function Rl(e, t, n) {
	return Il.copy(e.getBoundingRect()), e.transform && Il.applyTransform(e.transform), Ll.width = t, Ll.height = n, !Il.intersect(Ll);
}
// node_modules/zrender/lib/core/bbox.js
var zl = Math.min, Bl = Math.max, Vl = Math.sin, Hl = Math.cos, Ul = Math.PI * 2, Wl = On(), Gl = On(), Kl = On();
function ql(e, t, n, r, i, a) {
	i[0] = zl(e, n), i[1] = zl(t, r), a[0] = Bl(e, n), a[1] = Bl(t, r);
}
var Jl = [], Yl = [];
function Xl(e, t, n, r, i, a, o, s, c, l) {
	var u = zi, d = Ii, f = u(e, n, i, o, Jl);
	c[0] = Infinity, c[1] = Infinity, l[0] = -Infinity, l[1] = -Infinity;
	for (var p = 0; p < f; p++) {
		var m = d(e, n, i, o, Jl[p]);
		c[0] = zl(m, c[0]), l[0] = Bl(m, l[0]);
	}
	f = u(t, r, a, s, Yl);
	for (var p = 0; p < f; p++) {
		var h = d(t, r, a, s, Yl[p]);
		c[1] = zl(h, c[1]), l[1] = Bl(h, l[1]);
	}
	c[0] = zl(e, c[0]), l[0] = Bl(e, l[0]), c[0] = zl(o, c[0]), l[0] = Bl(o, l[0]), c[1] = zl(t, c[1]), l[1] = Bl(t, l[1]), c[1] = zl(s, c[1]), l[1] = Bl(s, l[1]);
}
function Zl(e, t, n, r, i, a, o, s) {
	var c = Ki, l = Ui, u = Bl(zl(c(e, n, i), 1), 0), d = Bl(zl(c(t, r, a), 1), 0), f = l(e, n, i, u), p = l(t, r, a, d);
	o[0] = zl(e, i, f), o[1] = zl(t, a, p), s[0] = Bl(e, i, f), s[1] = Bl(t, a, p);
}
function Ql(e, t, n, r, i, a, o, s, c) {
	var l = Un, u = Wn, d = Math.abs(i - a);
	if (d % Ul < 1e-4 && d > 1e-4) s[0] = e - n, s[1] = t - r, c[0] = e + n, c[1] = t + r;
	else {
		if (Wl[0] = Hl(i) * n + e, Wl[1] = Vl(i) * r + t, Gl[0] = Hl(a) * n + e, Gl[1] = Vl(a) * r + t, l(s, Wl, Gl), u(c, Wl, Gl), i %= Ul, i < 0 && (i += Ul), a %= Ul, a < 0 && (a += Ul), i > a && !o ? a += Ul : i < a && o && (i += Ul), o) {
			var f = a;
			a = i, i = f;
		}
		for (var p = 0; p < a; p += Math.PI / 2) p > i && (Kl[0] = Hl(p) * n + e, Kl[1] = Vl(p) * r + t, l(s, Kl, s), u(c, Kl, c));
	}
}
// node_modules/zrender/lib/core/PathProxy.js
var Q = {
	M: 1,
	L: 2,
	C: 3,
	Q: 4,
	A: 5,
	Z: 6,
	R: 7
}, $l = [], eu = [], tu = [], nu = [], ru = [], iu = [], au = Math.min, ou = Math.max, su = Math.cos, cu = Math.sin, lu = Math.abs, uu = Math.PI, du = uu * 2, fu = typeof Float32Array < "u", pu = [];
function mu(e) {
	return Math.round(e / uu * 1e8) / 1e8 % 2 * uu;
}
function hu(e, t) {
	var n = mu(e[0]);
	n < 0 && (n += du);
	var r = n - e[0], i = e[1];
	i += r, !t && i - n >= du ? i = n + du : t && n - i >= du ? i = n - du : !t && n > i ? i = n + (du - mu(n - i)) : t && n < i && (i = n - (du - mu(i - n))), e[0] = n, e[1] = i;
}
var gu = function() {
	function e(e) {
		this.dpr = 1, this._xi = 0, this._yi = 0, this._x0 = 0, this._y0 = 0, this._len = 0, e && (this._saveData = !1), this._saveData && (this.data = []);
	}
	return e.prototype.increaseVersion = function() {
		this._version++;
	}, e.prototype.getVersion = function() {
		return this._version;
	}, e.prototype.setScale = function(e, t, n) {
		n ||= 0, n > 0 && (this._ux = lu(n / _o / e) || 0, this._uy = lu(n / _o / t) || 0);
	}, e.prototype.setDPR = function(e) {
		this.dpr = e;
	}, e.prototype.setContext = function(e) {
		this._ctx = e;
	}, e.prototype.getContext = function() {
		return this._ctx;
	}, e.prototype.beginPath = function() {
		return this._ctx && this._ctx.beginPath(), this.reset(), this;
	}, e.prototype.reset = function() {
		this._saveData && (this._len = 0), this._pathSegLen && (this._pathSegLen = null, this._pathLen = 0), this._version++;
	}, e.prototype.moveTo = function(e, t) {
		return this._drawPendingPt(), this.addData(Q.M, e, t), this._ctx && this._ctx.moveTo(e, t), this._x0 = e, this._y0 = t, this._xi = e, this._yi = t, this;
	}, e.prototype.lineTo = function(e, t) {
		var n = lu(e - this._xi), r = lu(t - this._yi), i = n > this._ux || r > this._uy;
		if (this.addData(Q.L, e, t), this._ctx && i && this._ctx.lineTo(e, t), i) this._xi = e, this._yi = t, this._pendingPtDist = 0;
		else {
			var a = n * n + r * r;
			a > this._pendingPtDist && (this._pendingPtX = e, this._pendingPtY = t, this._pendingPtDist = a);
		}
		return this;
	}, e.prototype.bezierCurveTo = function(e, t, n, r, i, a) {
		return this._drawPendingPt(), this.addData(Q.C, e, t, n, r, i, a), this._ctx && this._ctx.bezierCurveTo(e, t, n, r, i, a), this._xi = i, this._yi = a, this;
	}, e.prototype.quadraticCurveTo = function(e, t, n, r) {
		return this._drawPendingPt(), this.addData(Q.Q, e, t, n, r), this._ctx && this._ctx.quadraticCurveTo(e, t, n, r), this._xi = n, this._yi = r, this;
	}, e.prototype.arc = function(e, t, n, r, i, a) {
		this._drawPendingPt(), pu[0] = r, pu[1] = i, hu(pu, a), r = pu[0], i = pu[1];
		var o = i - r;
		return this.addData(Q.A, e, t, n, n, r, o, 0, +!a), this._ctx && this._ctx.arc(e, t, n, r, i, a), this._xi = su(i) * n + e, this._yi = cu(i) * n + t, this;
	}, e.prototype.arcTo = function(e, t, n, r, i) {
		return this._drawPendingPt(), this._ctx && this._ctx.arcTo(e, t, n, r, i), this;
	}, e.prototype.rect = function(e, t, n, r) {
		return this._drawPendingPt(), this._ctx && this._ctx.rect(e, t, n, r), this.addData(Q.R, e, t, n, r), this;
	}, e.prototype.closePath = function() {
		this._drawPendingPt(), this.addData(Q.Z);
		var e = this._ctx, t = this._x0, n = this._y0;
		return e && e.closePath(), this._xi = t, this._yi = n, this;
	}, e.prototype.fill = function(e) {
		e && e.fill(), this.toStatic();
	}, e.prototype.stroke = function(e) {
		e && e.stroke(), this.toStatic();
	}, e.prototype.len = function() {
		return this._len;
	}, e.prototype.setData = function(e) {
		if (this._saveData) {
			var t = e.length;
			!(this.data && this.data.length === t) && fu && (this.data = new Float32Array(t));
			for (var n = 0; n < t; n++) this.data[n] = e[n];
			this._len = t;
		}
	}, e.prototype.appendPath = function(e) {
		if (this._saveData) {
			e instanceof Array || (e = [e]);
			for (var t = e.length, n = 0, r = this._len, i = 0; i < t; i++) n += e[i].len();
			var a = this.data;
			if (fu && (a instanceof Float32Array || !a) && (this.data = new Float32Array(r + n), r > 0 && a)) for (var o = 0; o < r; o++) this.data[o] = a[o];
			for (var i = 0; i < t; i++) for (var s = e[i].data, o = 0; o < s.length; o++) this.data[r++] = s[o];
			this._len = r;
		}
	}, e.prototype.addData = function(e, t, n, r, i, a, o, s, c) {
		if (this._saveData) {
			var l = this.data;
			this._len + arguments.length > l.length && (this._expandData(), l = this.data);
			for (var u = 0; u < arguments.length; u++) l[this._len++] = arguments[u];
		}
	}, e.prototype._drawPendingPt = function() {
		this._pendingPtDist > 0 && (this._ctx && this._ctx.lineTo(this._pendingPtX, this._pendingPtY), this._pendingPtDist = 0);
	}, e.prototype._expandData = function() {
		if (!(this.data instanceof Array)) {
			for (var e = [], t = 0; t < this._len; t++) e[t] = this.data[t];
			this.data = e;
		}
	}, e.prototype.toStatic = function() {
		if (this._saveData) {
			this._drawPendingPt();
			var e = this.data;
			e instanceof Array && (e.length = this._len, fu && this._len > 11 && (this.data = new Float32Array(e)));
		}
	}, e.prototype.getBoundingRect = function() {
		tu[0] = tu[1] = ru[0] = ru[1] = Number.MAX_VALUE, nu[0] = nu[1] = iu[0] = iu[1] = -Number.MAX_VALUE;
		for (var e = this.data, t = 0, n = 0, r = 0, i = 0, a = 0; a < this._len;) {
			var o = e[a++], s = a === 1;
			switch (s && (t = e[a], n = e[a + 1], r = t, i = n), o) {
				case Q.M:
					t = r = e[a++], n = i = e[a++], ru[0] = r, ru[1] = i, iu[0] = r, iu[1] = i;
					break;
				case Q.L:
					ql(t, n, e[a], e[a + 1], ru, iu), t = e[a++], n = e[a++];
					break;
				case Q.C:
					Xl(t, n, e[a++], e[a++], e[a++], e[a++], e[a], e[a + 1], ru, iu), t = e[a++], n = e[a++];
					break;
				case Q.Q:
					Zl(t, n, e[a++], e[a++], e[a], e[a + 1], ru, iu), t = e[a++], n = e[a++];
					break;
				case Q.A:
					var c = e[a++], l = e[a++], u = e[a++], d = e[a++], f = e[a++], p = e[a++] + f;
					a += 1;
					var m = !e[a++];
					s && (r = su(f) * u + c, i = cu(f) * d + l), Ql(c, l, u, d, f, p, m, ru, iu), t = su(p) * u + c, n = cu(p) * d + l;
					break;
				case Q.R:
					r = t = e[a++], i = n = e[a++];
					var h = e[a++], g = e[a++];
					ql(r, i, r + h, i + g, ru, iu);
					break;
				case Q.Z: t = r, n = i;
			}
			Un(tu, tu, ru), Wn(nu, nu, iu);
		}
		return a === 0 && (tu[0] = tu[1] = nu[0] = nu[1] = 0), new X(tu[0], tu[1], nu[0] - tu[0], nu[1] - tu[1]);
	}, e.prototype._calculateLength = function() {
		var e = this.data, t = this._len, n = this._ux, r = this._uy, i = 0, a = 0, o = 0, s = 0;
		this._pathSegLen ||= [];
		for (var c = this._pathSegLen, l = 0, u = 0, d = 0; d < t;) {
			var f = e[d++], p = d === 1;
			p && (i = e[d], a = e[d + 1], o = i, s = a);
			var m = -1;
			switch (f) {
				case Q.M:
					i = o = e[d++], a = s = e[d++];
					break;
				case Q.L:
					var h = e[d++], g = e[d++], _ = h - i, v = g - a;
					(lu(_) > n || lu(v) > r || d === t - 1) && (m = Math.sqrt(_ * _ + v * v), i = h, a = g);
					break;
				case Q.C:
					var y = e[d++], b = e[d++], h = e[d++], g = e[d++], x = e[d++], S = e[d++];
					m = Hi(i, a, y, b, h, g, x, S, 10), i = x, a = S;
					break;
				case Q.Q:
					var y = e[d++], b = e[d++], h = e[d++], g = e[d++];
					m = Yi(i, a, y, b, h, g, 10), i = h, a = g;
					break;
				case Q.A:
					var C = e[d++], w = e[d++], T = e[d++], E = e[d++], D = e[d++], O = e[d++], k = O + D;
					d += 1, p && (o = su(D) * T + C, s = cu(D) * E + w), m = ou(T, E) * au(du, Math.abs(O)), i = su(k) * T + C, a = cu(k) * E + w;
					break;
				case Q.R:
					o = i = e[d++], s = a = e[d++];
					var A = e[d++], j = e[d++];
					m = A * 2 + j * 2;
					break;
				case Q.Z:
					var _ = o - i, v = s - a;
					m = Math.sqrt(_ * _ + v * v), i = o, a = s;
			}
			m >= 0 && (c[u++] = m, l += m);
		}
		return this._pathLen = l, l;
	}, e.prototype.rebuildPath = function(e, t) {
		var n = this.data, r = this._ux, i = this._uy, a = this._len, o, s, c, l, u, d, f = t < 1, p, m, h = 0, g = 0, _, v = 0, y, b;
		if (!(f && (this._pathSegLen || this._calculateLength(), p = this._pathSegLen, m = this._pathLen, _ = t * m, !_))) lo: for (var x = 0; x < a;) {
			var S = n[x++], C = x === 1;
			switch (C && (c = n[x], l = n[x + 1], o = c, s = l), S !== Q.L && v > 0 && (e.lineTo(y, b), v = 0), S) {
				case Q.M:
					o = c = n[x++], s = l = n[x++], e.moveTo(c, l);
					break;
				case Q.L:
					u = n[x++], d = n[x++];
					var w = lu(u - c), T = lu(d - l);
					if (w > r || T > i) {
						if (f) {
							var E = p[g++];
							if (h + E > _) {
								var D = (_ - h) / E;
								e.lineTo(c * (1 - D) + u * D, l * (1 - D) + d * D);
								break lo;
							}
							h += E;
						}
						e.lineTo(u, d), c = u, l = d, v = 0;
					} else {
						var O = w * w + T * T;
						O > v && (y = u, b = d, v = O);
					}
					break;
				case Q.C:
					var k = n[x++], A = n[x++], j = n[x++], ee = n[x++], te = n[x++], ne = n[x++];
					if (f) {
						var E = p[g++];
						if (h + E > _) {
							var D = (_ - h) / E;
							Bi(c, k, j, te, D, $l), Bi(l, A, ee, ne, D, eu), e.bezierCurveTo($l[1], eu[1], $l[2], eu[2], $l[3], eu[3]);
							break lo;
						}
						h += E;
					}
					e.bezierCurveTo(k, A, j, ee, te, ne), c = te, l = ne;
					break;
				case Q.Q:
					var k = n[x++], A = n[x++], j = n[x++], ee = n[x++];
					if (f) {
						var E = p[g++];
						if (h + E > _) {
							var D = (_ - h) / E;
							qi(c, k, j, D, $l), qi(l, A, ee, D, eu), e.quadraticCurveTo($l[1], eu[1], $l[2], eu[2]);
							break lo;
						}
						h += E;
					}
					e.quadraticCurveTo(k, A, j, ee), c = j, l = ee;
					break;
				case Q.A:
					var re = n[x++], ie = n[x++], ae = n[x++], oe = n[x++], se = n[x++], ce = n[x++], le = n[x++], ue = !n[x++], de = ae > oe ? ae : oe, fe = lu(ae - oe) > .001, pe = se + ce, M = !1;
					if (f) {
						var E = p[g++];
						h + E > _ && (pe = se + ce * (_ - h) / E, M = !0), h += E;
					}
					if (fe && e.ellipse ? e.ellipse(re, ie, ae, oe, le, se, pe, ue) : e.arc(re, ie, de, se, pe, ue), M) break lo;
					C && (o = su(se) * ae + re, s = cu(se) * oe + ie), c = su(pe) * ae + re, l = cu(pe) * oe + ie;
					break;
				case Q.R:
					o = c = n[x], s = l = n[x + 1], u = n[x++], d = n[x++];
					var N = n[x++], me = n[x++];
					if (f) {
						var E = p[g++];
						if (h + E > _) {
							var P = _ - h;
							e.moveTo(u, d), e.lineTo(u + au(P, N), d), P -= N, P > 0 && e.lineTo(u + N, d + au(P, me)), P -= me, P > 0 && e.lineTo(u + ou(N - P, 0), d + me), P -= N, P > 0 && e.lineTo(u, d + ou(me - P, 0));
							break lo;
						}
						h += E;
					}
					e.rect(u, d, N, me);
					break;
				case Q.Z:
					if (f) {
						var E = p[g++];
						if (h + E > _) {
							var D = (_ - h) / E;
							e.lineTo(c * (1 - D) + o * D, l * (1 - D) + s * D);
							break lo;
						}
						h += E;
					}
					e.closePath(), c = o, l = s;
			}
		}
	}, e.prototype.clone = function() {
		var t = new e(), n = this.data;
		return t.data = n.slice ? n.slice() : Array.prototype.slice.call(n), t._len = this._len, t;
	}, e.prototype.canSave = function() {
		return !!this._saveData;
	}, e.CMD = Q, e.initDefaultProps = (function() {
		var t = e.prototype;
		t._saveData = !0, t._ux = 0, t._uy = 0, t._pendingPtDist = 0, t._version = 0;
	})(), e;
}();
// node_modules/zrender/lib/contain/line.js
function _u(e, t, n, r, i, a, o) {
	if (i === 0) return !1;
	var s = i, c = 0, l = e;
	if (o > t + s && o > r + s || o < t - s && o < r - s || a > e + s && a > n + s || a < e - s && a < n - s) return !1;
	if (e !== n) c = (t - r) / (e - n), l = (e * r - n * t) / (e - n);
	else return Math.abs(a - e) <= s / 2;
	var u = c * a - o + l;
	return u * u / (c * c + 1) <= s / 2 * s / 2;
}
// node_modules/zrender/lib/contain/cubic.js
function vu(e, t, n, r, i, a, o, s, c, l, u) {
	if (c === 0) return !1;
	var d = c;
	return u > t + d && u > r + d && u > a + d && u > s + d || u < t - d && u < r - d && u < a - d && u < s - d || l > e + d && l > n + d && l > i + d && l > o + d || l < e - d && l < n - d && l < i - d && l < o - d ? !1 : Vi(e, t, n, r, i, a, o, s, l, u, null) <= d / 2;
}
// node_modules/zrender/lib/contain/quadratic.js
function yu(e, t, n, r, i, a, o, s, c) {
	if (o === 0) return !1;
	var l = o;
	return c > t + l && c > r + l && c > a + l || c < t - l && c < r - l && c < a - l || s > e + l && s > n + l && s > i + l || s < e - l && s < n - l && s < i - l ? !1 : Ji(e, t, n, r, i, a, s, c, null) <= l / 2;
}
// node_modules/zrender/lib/contain/util.js
var bu = Math.PI * 2;
function xu(e) {
	return e %= bu, e < 0 && (e += bu), e;
}
// node_modules/zrender/lib/contain/arc.js
var Su = Math.PI * 2;
function Cu(e, t, n, r, i, a, o, s, c) {
	if (o === 0) return !1;
	var l = o;
	s -= e, c -= t;
	var u = Math.sqrt(s * s + c * c);
	if (u - l > n || u + l < n) return !1;
	if (Math.abs(r - i) % Su < 1e-4) return !0;
	if (a) {
		var d = r;
		r = xu(i), i = xu(d);
	} else r = xu(r), i = xu(i);
	r > i && (i += Su);
	var f = Math.atan2(c, s);
	return f < 0 && (f += Su), f >= r && f <= i || f + Su >= r && f + Su <= i;
}
// node_modules/zrender/lib/contain/windingLine.js
function wu(e, t, n, r, i, a) {
	if (a > t && a > r || a < t && a < r || r === t) return 0;
	var o = (a - t) / (r - t), s = r < t ? 1 : -1;
	(o === 1 || o === 0) && (s = r < t ? .5 : -.5);
	var c = o * (n - e) + e;
	return c === i ? Infinity : c > i ? s : 0;
}
// node_modules/zrender/lib/contain/path.js
var Tu = gu.CMD, Eu = Math.PI * 2, Du = 1e-4;
function Ou(e, t) {
	return Math.abs(e - t) < Du;
}
var ku = [
	-1,
	-1,
	-1
], Au = [-1, -1];
function ju() {
	var e = Au[0];
	Au[0] = Au[1], Au[1] = e;
}
function Mu(e, t, n, r, i, a, o, s, c, l) {
	if (l > t && l > r && l > a && l > s || l < t && l < r && l < a && l < s) return 0;
	var u = Ri(t, r, a, s, l, ku);
	if (u === 0) return 0;
	for (var d = 0, f = -1, p = void 0, m = void 0, h = 0; h < u; h++) {
		var g = ku[h], _ = g === 0 || g === 1 ? .5 : 1;
		Ii(e, n, i, o, g) < c || (f < 0 && (f = zi(t, r, a, s, Au), Au[1] < Au[0] && f > 1 && ju(), p = Ii(t, r, a, s, Au[0]), f > 1 && (m = Ii(t, r, a, s, Au[1]))), f === 2 ? g < Au[0] ? d += p < t ? _ : -_ : g < Au[1] ? d += m < p ? _ : -_ : d += s < m ? _ : -_ : g < Au[0] ? d += p < t ? _ : -_ : d += s < p ? _ : -_);
	}
	return d;
}
function Nu(e, t, n, r, i, a, o, s) {
	if (s > t && s > r && s > a || s < t && s < r && s < a) return 0;
	var c = Gi(t, r, a, s, ku);
	if (c === 0) return 0;
	var l = Ki(t, r, a);
	if (l >= 0 && l <= 1) {
		for (var u = 0, d = Ui(t, r, a, l), f = 0; f < c; f++) {
			var p = ku[f] === 0 || ku[f] === 1 ? .5 : 1, m = Ui(e, n, i, ku[f]);
			m < o || (ku[f] < l ? u += d < t ? p : -p : u += a < d ? p : -p);
		}
		return u;
	}
	var p = ku[0] === 0 || ku[0] === 1 ? .5 : 1, m = Ui(e, n, i, ku[0]);
	return m < o ? 0 : a < t ? p : -p;
}
function Pu(e, t, n, r, i, a, o, s) {
	if (s -= t, s > n || s < -n) return 0;
	var c = Math.sqrt(n * n - s * s);
	ku[0] = -c, ku[1] = c;
	var l = Math.abs(r - i);
	if (l < 1e-4) return 0;
	if (l >= Eu - 1e-4) {
		r = 0, i = Eu;
		var u = a ? 1 : -1;
		return o >= ku[0] + e && o <= ku[1] + e ? u : 0;
	}
	if (r > i) {
		var d = r;
		r = i, i = d;
	}
	r < 0 && (r += Eu, i += Eu);
	for (var f = 0, p = 0; p < 2; p++) {
		var m = ku[p];
		if (m + e > o) {
			var h = Math.atan2(s, m), u = a ? 1 : -1;
			h < 0 && (h = Eu + h), (h >= r && h <= i || h + Eu >= r && h + Eu <= i) && (h > Math.PI / 2 && h < Math.PI * 1.5 && (u = -u), f += u);
		}
	}
	return f;
}
function Fu(e, t, n, r, i) {
	for (var a = e.data, o = e.len(), s = 0, c = 0, l = 0, u = 0, d = 0, f, p, m = 0; m < o;) {
		var h = a[m++], g = m === 1;
		switch (h === Tu.M && m > 1 && (n || (s += wu(c, l, u, d, r, i))), g && (c = a[m], l = a[m + 1], u = c, d = l), h) {
			case Tu.M:
				u = a[m++], d = a[m++], c = u, l = d;
				break;
			case Tu.L:
				if (n) {
					if (_u(c, l, a[m], a[m + 1], t, r, i)) return !0;
				} else s += wu(c, l, a[m], a[m + 1], r, i) || 0;
				c = a[m++], l = a[m++];
				break;
			case Tu.C:
				if (n) {
					if (vu(c, l, a[m++], a[m++], a[m++], a[m++], a[m], a[m + 1], t, r, i)) return !0;
				} else s += Mu(c, l, a[m++], a[m++], a[m++], a[m++], a[m], a[m + 1], r, i) || 0;
				c = a[m++], l = a[m++];
				break;
			case Tu.Q:
				if (n) {
					if (yu(c, l, a[m++], a[m++], a[m], a[m + 1], t, r, i)) return !0;
				} else s += Nu(c, l, a[m++], a[m++], a[m], a[m + 1], r, i) || 0;
				c = a[m++], l = a[m++];
				break;
			case Tu.A:
				var _ = a[m++], v = a[m++], y = a[m++], b = a[m++], x = a[m++], S = a[m++];
				m += 1;
				var C = !!(1 - a[m++]);
				f = Math.cos(x) * y + _, p = Math.sin(x) * b + v, g ? (u = f, d = p) : s += wu(c, l, f, p, r, i);
				var w = (r - _) * b / y + _;
				if (n) {
					if (Cu(_, v, b, x, x + S, C, t, w, i)) return !0;
				} else s += Pu(_, v, b, x, x + S, C, w, i);
				c = Math.cos(x + S) * y + _, l = Math.sin(x + S) * b + v;
				break;
			case Tu.R:
				u = c = a[m++], d = l = a[m++];
				var T = a[m++], E = a[m++];
				if (f = u + T, p = d + E, n) {
					if (_u(u, d, f, d, t, r, i) || _u(f, d, f, p, t, r, i) || _u(f, p, u, p, t, r, i) || _u(u, p, u, d, t, r, i)) return !0;
				} else s += wu(f, d, f, p, r, i), s += wu(u, p, u, d, r, i);
				break;
			case Tu.Z:
				if (n) {
					if (_u(c, l, u, d, t, r, i)) return !0;
				} else s += wu(c, l, u, d, r, i);
				c = u, l = d;
		}
	}
	return !n && !Ou(l, d) && (s += wu(c, l, u, d, r, i) || 0), s !== 0;
}
function Iu(e, t, n) {
	return Fu(e, 0, !1, t, n);
}
function Lu(e, t, n, r) {
	return Fu(e, t, !0, n, r);
}
// node_modules/zrender/lib/graphic/Path.js
var Ru = Ut({
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
}, jl), zu = { style: Ut({
	fill: !0,
	stroke: !0,
	strokePercent: !0,
	fillOpacity: !0,
	strokeOpacity: !0,
	lineDashOffset: !0,
	lineWidth: !0,
	miterLimit: !0
}, Ml.style) }, Bu = jo.concat([
	"invisible",
	"culling",
	"z",
	"z2",
	"zlevel",
	"parent"
]), Vu = function(e) {
	L(t, e);
	function t(t) {
		return e.call(this, t) || this;
	}
	return t.prototype.update = function() {
		var n = this;
		e.prototype.update.call(this);
		var r = this.style;
		if (r.decal) {
			var i = this._decalEl = this._decalEl || new t();
			i.buildPath === t.prototype.buildPath && (i.buildPath = function(e) {
				n.buildPath(e, n.shape);
			}), i.silent = !0;
			var a = i.style;
			for (var o in r) a[o] !== r[o] && (a[o] = r[o]);
			a.fill = r.fill ? r.decal : null, a.decal = null, a.shadowColor = null, r.strokeFirst && (a.stroke = null);
			for (var s = 0; s < Bu.length; ++s) i[Bu[s]] = this[Bu[s]];
			i.__dirty |= 1;
		} else this._decalEl &&= null;
	}, t.prototype.getDecalElement = function() {
		return this._decalEl;
	}, t.prototype._init = function(t) {
		var n = Xt(t);
		this.shape = this.getDefaultShape();
		var r = this.getDefaultStyle();
		r && this.useStyle(r);
		for (var i = 0; i < n.length; i++) {
			var a = n[i], o = t[a];
			a === "style" ? this.style ? B(this.style, o) : this.useStyle(o) : a === "shape" ? B(this.shape, o) : e.prototype.attrKV.call(this, a, o);
		}
		this.style || this.useStyle({});
	}, t.prototype.getDefaultStyle = function() {
		return null;
	}, t.prototype.getDefaultShape = function() {
		return {};
	}, t.prototype.canBeInsideText = function() {
		return this.hasFill();
	}, t.prototype.getInsideTextFill = function() {
		var e = this.style.fill;
		if (e !== "none") {
			if (G(e)) {
				var t = ba(e, 0);
				return t > .5 ? yo : t > .2 ? xo : bo;
			}
			if (e) return bo;
		}
		return yo;
	}, t.prototype.getInsideTextStroke = function(e) {
		var t = this.style.fill;
		if (G(t)) {
			var n = this.__zr;
			if (!!(n && n.isDarkMode()) == ba(e, 0) < .4) return t;
		}
	}, t.prototype.buildPath = function(e, t, n) {}, t.prototype.pathUpdated = function() {
		this.__dirty &= -5;
	}, t.prototype.getUpdatedPathProxy = function(e) {
		return !this.path && this.createPathProxy(), this.path.beginPath(), this.buildPath(this.path, this.shape, e), this.path;
	}, t.prototype.createPathProxy = function() {
		this.path = new gu(!1);
	}, t.prototype.hasStroke = function() {
		var e = this.style, t = e.stroke;
		return !(t == null || t === "none" || !(e.lineWidth > 0));
	}, t.prototype.hasFill = function() {
		var e = this.style.fill;
		return e != null && e !== "none";
	}, t.prototype.getBoundingRect = function() {
		var e = this._rect, t = this.style, n = !e;
		if (n) {
			var r = !1;
			this.path || (r = !0, this.createPathProxy());
			var i = this.path;
			(r || this.__dirty & 4) && (i.beginPath(), this.buildPath(i, this.shape, !1), this.pathUpdated()), e = i.getBoundingRect();
		}
		if (this._rect = e, this.hasStroke() && this.path && this.path.len() > 0) {
			var a = this._rectStroke ||= e.clone();
			if (this.__dirty || n) {
				a.copy(e);
				var o = t.strokeNoScale ? this.getLineScale() : 1, s = t.lineWidth;
				if (!this.hasFill()) {
					var c = this.strokeContainThreshold;
					s = Math.max(s, c ?? 4);
				}
				o > 1e-10 && (a.width += s / o, a.height += s / o, a.x -= s / o / 2, a.y -= s / o / 2);
			}
			return a;
		}
		return e;
	}, t.prototype.contain = function(e, t) {
		var n = this.transformCoordToLocal(e, t), r = this.getBoundingRect(), i = this.style;
		if (e = n[0], t = n[1], r.contain(e, t)) {
			var a = this.path;
			if (this.hasStroke()) {
				var o = i.lineWidth, s = i.strokeNoScale ? this.getLineScale() : 1;
				if (s > 1e-10 && (this.hasFill() || (o = Math.max(o, this.strokeContainThreshold)), Lu(a, o / s, e, t))) return !0;
			}
			if (this.hasFill()) return Iu(a, e, t);
		}
		return !1;
	}, t.prototype.dirtyShape = function() {
		this.__dirty |= 4, this._rect &&= null, this._decalEl && this._decalEl.dirtyShape(), this.markRedraw();
	}, t.prototype.dirty = function() {
		this.dirtyStyle(), this.dirtyShape();
	}, t.prototype.animateShape = function(e) {
		return this.animate("shape", e);
	}, t.prototype.updateDuringAnimation = function(e) {
		e === "style" ? this.dirtyStyle() : e === "shape" ? this.dirtyShape() : this.markRedraw();
	}, t.prototype.attrKV = function(t, n) {
		t === "shape" ? this.setShape(n) : e.prototype.attrKV.call(this, t, n);
	}, t.prototype.setShape = function(e, t) {
		var n = this.shape;
		return n ||= this.shape = {}, typeof e == "string" ? n[e] = t : B(n, e), this.dirtyShape(), this;
	}, t.prototype.shapeChanged = function() {
		return !!(this.__dirty & 4);
	}, t.prototype.createStyle = function(e) {
		return Cn(Ru, e);
	}, t.prototype._innerSaveToNormal = function(t) {
		e.prototype._innerSaveToNormal.call(this, t);
		var n = this._normalState;
		t.shape && !n.shape && (n.shape = B({}, this.shape));
	}, t.prototype._applyStateObj = function(t, n, r, i, a, o) {
		if (e.prototype._applyStateObj.call(this, t, n, r, i, a, o), this.__inHover !== 1) {
			var s = !(n && i), c;
			if (n && n.shape ? a ? i ? c = n.shape : (c = B({}, r.shape), B(c, n.shape)) : (c = B({}, i ? this.shape : r.shape), B(c, n.shape)) : s && (c = r.shape), c) {
				if (a) {
					this.shape = B({}, this.shape);
					for (var l = {}, u = Xt(c), d = 0; d < u.length; d++) {
						var f = u[d];
						typeof c[f] == "object" ? this.shape[f] = c[f] : l[f] = c[f];
					}
					this._transitionState(t, { shape: l }, o);
				} else this.shape = c, this.dirtyShape();
			}
		}
	}, t.prototype._mergeStates = function(t) {
		for (var n = e.prototype._mergeStates.call(this, t), r, i = 0; i < t.length; i++) {
			var a = t[i];
			a.shape && (r ||= {}, this._mergeStyle(r, a.shape));
		}
		return r && (n.shape = r), n;
	}, t.prototype.getAnimationStyleProps = function() {
		return zu;
	}, t.prototype.isZeroArea = function() {
		return !1;
	}, t.extend = function(e) {
		var n = function(t) {
			L(n, t);
			function n(n) {
				var r = t.call(this, n) || this;
				return e.init && e.init.call(r, n), r;
			}
			return n.prototype.getDefaultStyle = function() {
				return z(e.style);
			}, n.prototype.getDefaultShape = function() {
				return z(e.shape);
			}, n;
		}(t);
		for (var r in e) typeof e[r] == "function" && (n.prototype[r] = e[r]);
		return n;
	}, t.initDefaultProps = (function() {
		var e = t.prototype;
		e.type = "path", e.strokeContainThreshold = 5, e.segmentIgnoreThreshold = 0, e.subPixelOptimize = !1, e.autoBatch = !1, e.__dirty = 7;
	})(), t;
}(Fl), Hu = Ut({
	strokeFirst: !0,
	font: yt,
	x: 0,
	y: 0,
	textAlign: "left",
	textBaseline: "top",
	miterLimit: 2
}, Ru), Uu = function(e) {
	L(t, e);
	function t() {
		return e !== null && e.apply(this, arguments) || this;
	}
	return t.prototype.hasStroke = function() {
		return kl(this.style);
	}, t.prototype.hasFill = function() {
		var e = this.style.fill;
		return e != null && e !== "none";
	}, t.prototype.createStyle = function(e) {
		return Cn(Hu, e);
	}, t.prototype.setBoundingRect = function(e) {
		this._rect = e;
	}, t.prototype.getBoundingRect = function() {
		return this._rect ||= Dl(this.style), this._rect;
	}, t.initDefaultProps = (function() {
		var e = t.prototype;
		e.dirtyRectTolerance = 10;
	})(), t;
}(Fl);
Uu.prototype.type = "tspan";
// node_modules/zrender/lib/graphic/Image.js
var Wu = Ut({
	x: 0,
	y: 0
}, jl), Gu = { style: Ut({
	x: !0,
	y: !0,
	width: !0,
	height: !0,
	sx: !0,
	sy: !0,
	sWidth: !0,
	sHeight: !0
}, Ml.style) };
function Ku(e) {
	return !!(e && typeof e != "string" && e.width && e.height);
}
var qu = function(e) {
	L(t, e);
	function t() {
		return e !== null && e.apply(this, arguments) || this;
	}
	return t.prototype.createStyle = function(e) {
		return Cn(Wu, e);
	}, t.prototype._getSize = function(e) {
		var t = this.style, n = t[e];
		if (n != null) return n;
		var r = Ku(t.image) ? t.image : this.__image;
		if (!r) return 0;
		var i = e === "width" ? "height" : "width", a = t[i];
		return a == null ? r[e] : r[e] / r[i] * a;
	}, t.prototype.getWidth = function() {
		return this._getSize("width");
	}, t.prototype.getHeight = function() {
		return this._getSize("height");
	}, t.prototype.getAnimationStyleProps = function() {
		return Gu;
	}, t.prototype.getBoundingRect = function() {
		var e = this.style;
		return this._rect ||= new X(e.x || 0, e.y || 0, this.getWidth(), this.getHeight()), this._rect;
	}, t;
}(Fl);
qu.prototype.type = "image";
// node_modules/zrender/lib/graphic/helper/roundRect.js
function Ju(e, t) {
	var n = t.x, r = t.y, i = t.width, a = t.height, o = t.r, s, c, l, u;
	i < 0 && (n += i, i = -i), a < 0 && (r += a, a = -a), typeof o == "number" ? s = c = l = u = o : o instanceof Array ? o.length === 1 ? s = c = l = u = o[0] : o.length === 2 ? (s = l = o[0], c = u = o[1]) : o.length === 3 ? (s = o[0], c = u = o[1], l = o[2]) : (s = o[0], c = o[1], l = o[2], u = o[3]) : s = c = l = u = 0;
	var d;
	s + c > i && (d = s + c, s *= i / d, c *= i / d), l + u > i && (d = l + u, l *= i / d, u *= i / d), c + l > a && (d = c + l, c *= a / d, l *= a / d), s + u > a && (d = s + u, s *= a / d, u *= a / d), e.moveTo(n + s, r), e.lineTo(n + i - c, r), c !== 0 && e.arc(n + i - c, r + c, c, -Math.PI / 2, 0), e.lineTo(n + i, r + a - l), l !== 0 && e.arc(n + i - l, r + a - l, l, 0, Math.PI / 2), e.lineTo(n + u, r + a), u !== 0 && e.arc(n + u, r + a - u, u, Math.PI / 2, Math.PI), e.lineTo(n, r + s), s !== 0 && e.arc(n + s, r + s, s, Math.PI, Math.PI * 1.5), e.closePath();
}
// node_modules/zrender/lib/graphic/helper/subPixelOptimize.js
var Yu = Math.round;
function Xu(e, t, n) {
	if (t) {
		var r = t.x1, i = t.x2, a = t.y1, o = t.y2;
		e.x1 = r, e.x2 = i, e.y1 = a, e.y2 = o;
		var s = n && n.lineWidth;
		return s && (Yu(r * 2) === Yu(i * 2) && (e.x1 = e.x2 = Qu(r, s, !0)), Yu(a * 2) === Yu(o * 2) && (e.y1 = e.y2 = Qu(a, s, !0))), e;
	}
}
function Zu(e, t, n) {
	if (t) {
		var r = t.x, i = t.y, a = t.width, o = t.height;
		e.x = r, e.y = i, e.width = a, e.height = o;
		var s = n && n.lineWidth;
		return s && (e.x = Qu(r, s, !0), e.y = Qu(i, s, !0), e.width = Math.max(Qu(r + a, s, !1) - e.x, a === 0 ? 0 : 1), e.height = Math.max(Qu(i + o, s, !1) - e.y, o === 0 ? 0 : 1)), e;
	}
}
function Qu(e, t, n) {
	if (!t) return e;
	var r = Yu(e * 2);
	return (r + Yu(t)) % 2 == 0 ? r / 2 : (r + (n ? 1 : -1)) / 2;
}
// node_modules/zrender/lib/graphic/shape/Rect.js
var $u = function() {
	function e() {
		this.x = 0, this.y = 0, this.width = 0, this.height = 0;
	}
	return e;
}(), ed = {}, td = function(e) {
	L(t, e);
	function t(t) {
		return e.call(this, t) || this;
	}
	return t.prototype.getDefaultShape = function() {
		return new $u();
	}, t.prototype.buildPath = function(e, t) {
		var n, r, i, a;
		if (this.subPixelOptimize) {
			var o = Zu(ed, t, this.style);
			n = o.x, r = o.y, i = o.width, a = o.height, o.r = t.r, t = o;
		} else n = t.x, r = t.y, i = t.width, a = t.height;
		t.r ? Ju(e, t) : e.rect(n, r, i, a);
	}, t.prototype.isZeroArea = function() {
		return !this.shape.width || !this.shape.height;
	}, t;
}(Vu);
td.prototype.type = "rect";
// node_modules/zrender/lib/graphic/Text.js
var nd = { fill: "#000" }, rd = 2, id = {}, ad = { style: Ut({
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
}, Ml.style) }, od = function(e) {
	L(t, e);
	function t(t) {
		var n = e.call(this) || this;
		return n.type = "text", n._children = [], n._defaultStyle = nd, n.attr(t), n;
	}
	return t.prototype.childrenRef = function() {
		return this._children;
	}, t.prototype.update = function() {
		e.prototype.update.call(this), this.styleChanged() && this._updateSubTexts();
		for (var t = 0; t < this._children.length; t++) {
			var n = this._children[t];
			n.zlevel = this.zlevel, n.z = this.z, n.z2 = this.z2, n.culling = this.culling, n.cursor = this.cursor, n.invisible = this.invisible;
		}
	}, t.prototype.updateTransform = function() {
		var t = this.innerTransformable;
		t ? (t.updateTransform(), t.transform && (this.transform = t.transform)) : e.prototype.updateTransform.call(this);
	}, t.prototype.getLocalTransform = function(t) {
		var n = this.innerTransformable;
		return n ? n.getLocalTransform(t) : e.prototype.getLocalTransform.call(this, t);
	}, t.prototype.getComputedTransform = function() {
		return this.__hostTarget && (this.__hostTarget.getComputedTransform(), this.__hostTarget.updateInnerText(!0)), e.prototype.getComputedTransform.call(this);
	}, t.prototype._updateSubTexts = function() {
		this._childCursor = 0, pd(this.style), this.style.rich ? this._updateRichTexts() : this._updatePlainTexts(), this._children.length = this._childCursor, this.styleUpdated();
	}, t.prototype.addSelfToZr = function(t) {
		e.prototype.addSelfToZr.call(this, t);
		for (var n = 0; n < this._children.length; n++) this._children[n].__zr = t;
	}, t.prototype.removeSelfFromZr = function(t) {
		e.prototype.removeSelfFromZr.call(this, t);
		for (var n = 0; n < this._children.length; n++) this._children[n].__zr = null;
	}, t.prototype.getBoundingRect = function() {
		if (this.styleChanged() && this._updateSubTexts(), !this._rect) {
			for (var e = new X(0, 0, 0, 0), t = this._children, n = [], r = null, i = 0; i < t.length; i++) {
				var a = t[i], o = a.getBoundingRect(), s = a.getLocalTransform(n);
				s ? (e.copy(o), e.applyTransform(s), r ||= e.clone(), r.union(e)) : (r ||= o.clone(), r.union(o));
			}
			this._rect = r || e;
		}
		return this._rect;
	}, t.prototype.setDefaultTextStyle = function(e) {
		this._defaultStyle = e || nd;
	}, t.prototype.setTextContent = function(e) {}, t.prototype._mergeStyle = function(e, t) {
		if (!t) return e;
		var n = t.rich, r = e.rich || n && {};
		return B(e, t), n && r ? (this._mergeRich(r, n), e.rich = r) : r && (e.rich = r), e;
	}, t.prototype._mergeRich = function(e, t) {
		for (var n = Xt(t), r = 0; r < n.length; r++) {
			var i = n[r];
			e[i] = e[i] || {}, B(e[i], t[i]);
		}
	}, t.prototype.getAnimationStyleProps = function() {
		return ad;
	}, t.prototype._getOrCreateChild = function(e) {
		var t = this._children[this._childCursor];
		return t && t instanceof e || (t = new e()), this._children[this._childCursor++] = t, t.__zr = this.__zr, t.parent = this, t;
	}, t.prototype._updatePlainTexts = function() {
		var e = this.style, t = e.font || "12px sans-serif", n = e.padding, r = this._defaultStyle, i = e.x || 0, a = e.y || 0, o = e.align || r.align || "left", s = e.verticalAlign || r.verticalAlign || "top";
		Cl(id, r.overflowRect, i, a, o, s), i = id.baseX, a = id.baseY;
		var c = pl(vd(e), e, id.outerWidth, id.outerHeight), l = yd(e), u = !!e.backgroundColor, d = c.outerHeight, f = c.outerWidth, p = c.lines, m = c.lineHeight;
		this.isTruncated = !!c.isTruncated;
		var h = i, g = Uo(a, c.contentHeight, s);
		if (l || n) {
			var _ = Ho(i, f, o), v = Uo(a, d, s);
			l && this._renderBackground(e, e, _, v, f, d);
		}
		g += m / 2, n && (h = _d(i, o, n), s === "top" ? g += n[0] : s === "bottom" && (g -= n[2]));
		for (var y = 0, b = !1, x = !1, S = gd("fill" in e ? e.fill : (x = !0, r.fill)), C = hd("stroke" in e ? e.stroke : !u && (!r.autoStroke || x) ? (y = rd, b = !0, r.stroke) : null), w = e.textShadowBlur > 0, T = 0; T < p.length; T++) {
			var E = this._getOrCreateChild(Uu), D = E.createStyle();
			E.useStyle(D), D.text = p[T], D.x = h, D.y = g, o && (D.textAlign = o), D.textBaseline = "middle", D.opacity = e.opacity, D.strokeFirst = !0, w && (D.shadowBlur = e.textShadowBlur || 0, D.shadowColor = e.textShadowColor || "transparent", D.shadowOffsetX = e.textShadowOffsetX || 0, D.shadowOffsetY = e.textShadowOffsetY || 0), D.stroke = C, D.fill = S, C && (D.lineWidth = e.lineWidth || y, D.lineDash = e.lineDash, D.lineDashOffset = e.lineDashOffset || 0), D.font = t, dd(D, e), g += m, E.setBoundingRect(Ol(D, c.contentWidth, c.calculatedLineHeight, b ? 0 : null));
		}
	}, t.prototype._updateRichTexts = function() {
		var e = this.style, t = this._defaultStyle, n = e.align || t.align, r = e.verticalAlign || t.verticalAlign, i = e.x || 0, a = e.y || 0;
		Cl(id, t.overflowRect, i, a, n, r), i = id.baseX, a = id.baseY;
		var o = _l(vd(e), e, id.outerWidth, id.outerHeight, n), s = o.width, c = o.outerWidth, l = o.outerHeight, u = e.padding;
		this.isTruncated = !!o.isTruncated;
		var d = Ho(i, c, n), f = Uo(a, l, r), p = d, m = f;
		u && (p += u[3], m += u[0]);
		var h = p + s;
		yd(e) && this._renderBackground(e, e, d, f, c, l);
		for (var g = !!e.backgroundColor, _ = 0; _ < o.lines.length; _++) {
			for (var v = o.lines[_], y = v.tokens, b = y.length, x = v.lineHeight, S = v.width, C = 0, w = p, T = h, E = b - 1, D = void 0; C < b && (D = y[C], !D.align || D.align === "left");) this._placeToken(D, e, x, m, w, "left", g), S -= D.width, w += D.width, C++;
			for (; E >= 0 && (D = y[E], D.align === "right");) this._placeToken(D, e, x, m, T, "right", g), S -= D.width, T -= D.width, E--;
			for (w += (s - (w - p) - (h - T) - S) / 2; C <= E;) D = y[C], this._placeToken(D, e, x, m, w + D.width / 2, "center", g), w += D.width, C++;
			m += x;
		}
	}, t.prototype._placeToken = function(e, t, n, r, i, a, o) {
		var s = t.rich[e.styleName] || {};
		s.text = e.text;
		var c = e.verticalAlign, l = r + n / 2;
		c === "top" ? l = r + e.height / 2 : c === "bottom" && (l = r + n - e.height / 2), !e.isLineHolder && yd(s) && this._renderBackground(s, t, a === "right" ? i - e.width : a === "center" ? i - e.width / 2 : i, l - e.height / 2, e.width, e.height);
		var u = !!s.backgroundColor, d = e.textPadding;
		d && (i = _d(i, a, d), l -= e.height / 2 - d[0] - e.innerHeight / 2);
		var f = this._getOrCreateChild(Uu), p = f.createStyle();
		f.useStyle(p);
		var m = this._defaultStyle, h = !1, g = 0, _ = !1, v = gd("fill" in s ? s.fill : "fill" in t ? t.fill : (h = !0, m.fill)), y = hd("stroke" in s ? s.stroke : "stroke" in t ? t.stroke : !u && !o && (!m.autoStroke || h) ? (g = rd, _ = !0, m.stroke) : null), b = s.textShadowBlur > 0 || t.textShadowBlur > 0;
		p.text = e.text, p.x = i, p.y = l, b && (p.shadowBlur = s.textShadowBlur || t.textShadowBlur || 0, p.shadowColor = s.textShadowColor || t.textShadowColor || "transparent", p.shadowOffsetX = s.textShadowOffsetX || t.textShadowOffsetX || 0, p.shadowOffsetY = s.textShadowOffsetY || t.textShadowOffsetY || 0), p.textAlign = a, p.textBaseline = "middle", p.font = e.font || "12px sans-serif", p.opacity = un(s.opacity, t.opacity, 1), dd(p, s), y && (p.lineWidth = un(s.lineWidth, t.lineWidth, g), p.lineDash = q(s.lineDash, t.lineDash), p.lineDashOffset = t.lineDashOffset || 0, p.stroke = y), v && (p.fill = v), f.setBoundingRect(Ol(p, e.contentWidth, e.contentHeight, _ ? 0 : null));
	}, t.prototype._renderBackground = function(e, t, n, r, i, a) {
		var o = e.backgroundColor, s = e.borderWidth, c = e.borderColor, l = o && o.image, u = o && !l, d = e.borderRadius, f = this, p, m;
		if (u || e.lineHeight || s && c) {
			p = this._getOrCreateChild(td), p.useStyle(p.createStyle()), p.style.fill = null;
			var h = p.shape;
			h.x = n, h.y = r, h.width = i, h.height = a, h.r = d, p.dirtyShape();
		}
		if (u) {
			var g = p.style;
			g.fill = o || null, g.fillOpacity = q(e.fillOpacity, 1);
		} else if (l) {
			m = this._getOrCreateChild(qu), m.onload = function() {
				f.dirtyStyle();
			};
			var _ = m.style;
			_.image = o.image, _.x = n, _.y = r, _.width = i, _.height = a;
		}
		if (s && c) {
			var g = p.style;
			g.lineWidth = s, g.stroke = c, g.strokeOpacity = q(e.strokeOpacity, 1), g.lineDash = e.borderDash, g.lineDashOffset = e.borderDashOffset || 0, p.strokeContainThreshold = 0, p.hasFill() && p.hasStroke() && (g.strokeFirst = !0, g.lineWidth *= 2);
		}
		var v = (p || m).style;
		v.shadowBlur = e.shadowBlur || 0, v.shadowColor = e.shadowColor || "transparent", v.shadowOffsetX = e.shadowOffsetX || 0, v.shadowOffsetY = e.shadowOffsetY || 0, v.opacity = un(e.opacity, t.opacity, 1);
	}, t.makeFont = function(e) {
		var t = "";
		return fd(e) && (t = [
			e.fontStyle,
			e.fontWeight,
			ud(e.fontSize),
			e.fontFamily || "sans-serif"
		].join(" ")), t && mn(t) || e.textFont || e.font;
	}, t;
}(Fl), sd = {
	left: !0,
	right: 1,
	center: 1
}, cd = {
	top: 1,
	bottom: 1,
	middle: 1
}, ld = [
	"fontStyle",
	"fontWeight",
	"fontSize",
	"fontFamily"
];
function ud(e) {
	return typeof e == "string" && (e.indexOf("px") !== -1 || e.indexOf("rem") !== -1 || e.indexOf("em") !== -1) ? e : isNaN(+e) ? "12px" : e + "px";
}
function dd(e, t) {
	for (var n = 0; n < ld.length; n++) {
		var r = ld[n], i = t[r];
		i != null && (e[r] = i);
	}
}
function fd(e) {
	return e.fontSize != null || e.fontFamily || e.fontWeight;
}
function pd(e) {
	return md(e), V(e.rich, md), e;
}
function md(e) {
	if (e) {
		e.font = od.makeFont(e);
		var t = e.align;
		t === "middle" && (t = "center"), e.align = t == null || sd[t] ? t : "left";
		var n = e.verticalAlign;
		n === "center" && (n = "middle"), e.verticalAlign = n == null || cd[n] ? n : "top", e.padding &&= fn(e.padding);
	}
}
function hd(e, t) {
	return e == null || t <= 0 || e === "transparent" || e === "none" ? null : e.image || e.colorStops ? "#000" : e;
}
function gd(e) {
	return e == null || e === "none" ? null : e.image || e.colorStops ? "#000" : e;
}
function _d(e, t, n) {
	return t === "right" ? e - n[1] : t === "center" ? e + n[3] / 2 - n[1] / 2 : e + n[3];
}
function vd(e) {
	var t = e.text;
	return t != null && (t += ""), t;
}
function yd(e) {
	return !!(e.backgroundColor || e.lineHeight || e.borderWidth && e.borderColor);
}
// node_modules/echarts/lib/util/innerStore.js
var bd = Z(), xd = function(e, t, n, r) {
	if (r) {
		var i = bd(r);
		i.dataIndex = n, i.dataType = t, i.seriesIndex = e, i.ssrType = "chart", r.type === "group" && r.traverse(function(r) {
			var i = bd(r);
			i.seriesIndex = e, i.dataIndex = n, i.dataType = t, i.ssrType = "chart";
		});
	}
}, Sd = J([
	"tooltip",
	"label",
	"itemName",
	"itemId",
	"itemGroupId",
	"itemChildGroupId",
	"seriesName"
]), Cd = "original", wd = "arrayRows", Td = "objectRows", Ed = "keyedColumns", Dd = "typedArray", Od = "unknown", kd = "column", Ad = [
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
	"getOption",
	"getId",
	"updateLabelLayout"
], jd = function() {
	function e(e) {
		V(Ad, function(t) {
			this[t] = Qt(e[t], e);
		}, this);
	}
	return e;
}();
function Md(e, t) {
	return t.mainType === "series" ? e.getViewOfSeriesModel(t) : e.getViewOfComponentModel(t);
}
// node_modules/echarts/lib/util/states.js
var Nd = 1, Pd = {}, Fd = Z(), Id = Z(), Ld = [
	"emphasis",
	"blur",
	"select"
], Rd = [
	"normal",
	"emphasis",
	"blur",
	"select"
], zd = "highlight", Bd = "downplay", Vd = "select", Hd = "unselect", Ud = "toggleSelect", Wd = "selectchanged";
function Gd(e) {
	return e != null && e !== "none";
}
function Kd(e, t, n) {
	e.onHoverStateChange && (e.hoverState || 0) !== n && e.onHoverStateChange(t), e.hoverState = n;
}
function qd(e) {
	Kd(e, "emphasis", 2);
}
function Jd(e) {
	e.hoverState === 2 && Kd(e, "normal", 0);
}
function Yd(e) {
	Kd(e, "blur", 1);
}
function Xd(e) {
	e.hoverState === 1 && Kd(e, "normal", 0);
}
function Zd(e) {
	e.selected = !0;
}
function Qd(e) {
	e.selected = !1;
}
function $d(e, t, n) {
	t(e, n);
}
function ef(e, t, n) {
	$d(e, t, n), e.isGroup && e.traverse(function(e) {
		$d(e, t, n);
	});
}
function tf(e, t, n, r) {
	for (var i = e.style, a = {}, o = 0; o < t.length; o++) {
		var s = t[o];
		a[s] = i[s] ?? (r && r[s]);
	}
	for (var o = 0; o < e.animators.length; o++) {
		var c = e.animators[o];
		c.__fromStateTransition && c.__fromStateTransition.indexOf(n) < 0 && c.targetName === "style" && c.saveTo(a, t);
	}
	return a;
}
function nf(e, t, n, r) {
	var i = n && Wt(n, "select") >= 0, a = !1;
	if (e instanceof Vu) {
		var o = Fd(e), s = i && o.selectFill || o.normalFill, c = i && o.selectStroke || o.normalStroke;
		if (Gd(s) || Gd(c)) {
			r ||= {};
			var l = r.style || {};
			l.fill === "inherit" ? (a = !0, r = B({}, r), l = B({}, l), l.fill = s) : !Gd(l.fill) && Gd(s) ? (a = !0, r = B({}, r), l = B({}, l), l.fill = Sa(s)) : !Gd(l.stroke) && Gd(c) && (a || (r = B({}, r), l = B({}, l)), l.stroke = Sa(c)), r.style = l;
		}
	}
	if (r && r.z2 == null) {
		a || (r = B({}, r));
		var u = e.z2EmphasisLift;
		r.z2 = e.z2 + (u ?? 10);
	}
	return r;
}
function rf(e, t, n) {
	if (n && n.z2 == null) {
		n = B({}, n);
		var r = e.z2SelectLift;
		n.z2 = e.z2 + (r ?? 9);
	}
	return n;
}
function af(e, t, n) {
	var r = Wt(e.currentStates, t) >= 0, i = e.style.opacity, a = r ? null : tf(e, ["opacity"], t, { opacity: 1 });
	n ||= {};
	var o = n.style || {};
	return o.opacity ?? (n = B({}, n), o = B({ opacity: r ? i : a.opacity * .1 }, o), n.style = o), n;
}
function of(e, t) {
	var n = this.states[e];
	if (this.style) {
		if (e === "emphasis") return nf(this, e, t, n);
		if (e === "blur") return af(this, e, n);
		if (e === "select") return rf(this, e, n);
	}
	return n;
}
function sf(e) {
	e.stateProxy = of;
	var t = e.getTextContent(), n = e.getTextGuideLine();
	t && (t.stateProxy = of), n && (n.stateProxy = of);
}
function cf(e, t) {
	!gf(e, t) && !e.__highByOuter && ef(e, qd);
}
function lf(e, t) {
	!gf(e, t) && !e.__highByOuter && ef(e, Jd);
}
function uf(e, t) {
	e.__highByOuter |= 1 << (t || 0), ef(e, qd);
}
function df(e, t) {
	!(e.__highByOuter &= ~(1 << (t || 0))) && ef(e, Jd);
}
function ff(e) {
	ef(e, Yd);
}
function pf(e) {
	ef(e, Xd);
}
function mf(e) {
	ef(e, Zd);
}
function hf(e) {
	ef(e, Qd);
}
function gf(e, t) {
	return e.__highDownSilentOnTouch && t.zrByTouch;
}
function _f(e) {
	var t = e.getModel(), n = [], r = [];
	t.eachComponent(function(t, i) {
		var a = Id(i), o = Md(e, i), s = t === "series";
		!s && r.push(o), a.isBlured && (o.group.traverse(function(e) {
			Xd(e);
		}), s && n.push(i)), a.isBlured = !1;
	}), V(r, function(e) {
		e && e.toggleBlurSeries && e.toggleBlurSeries(n, !1, t);
	});
}
function vf(e, t, n, r) {
	var i = r.getModel();
	n ||= "coordinateSystem";
	function a(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = e.getItemGraphicEl(t[n]);
			r && pf(r);
		}
	}
	if (e != null && t && t !== "none") {
		var o = i.getSeriesByIndex(e), s = o.coordinateSystem;
		s && s.master && (s = s.master);
		var c = [];
		i.eachSeries(function(e) {
			var i = o === e, l = e.coordinateSystem;
			if (l && l.master && (l = l.master), !(n === "series" && !i || n === "coordinateSystem" && !(l && s ? l === s : i) || t === "series" && i)) {
				if (r.getViewOfSeriesModel(e).group.traverse(function(e) {
					e.__highByOuter && i && t === "self" || Yd(e);
				}), qt(t)) a(e.getData(), t);
				else if (K(t)) for (var u = Xt(t), d = 0; d < u.length; d++) a(e.getData(u[d]), t[u[d]]);
				c.push(e), Id(e).isBlured = !0;
			}
		}), i.eachComponent(function(e, t) {
			if (e !== "series") {
				var n = r.getViewOfComponentModel(t);
				n && n.toggleBlurSeries && n.toggleBlurSeries(c, !0, i);
			}
		});
	}
}
function yf(e, t, n) {
	if (e != null && t != null) {
		var r = n.getModel().getComponent(e, t);
		if (r) {
			Id(r).isBlured = !0;
			var i = n.getViewOfComponentModel(r);
			i && i.focusBlurEnabled && i.group.traverse(function(e) {
				Yd(e);
			});
		}
	}
}
function bf(e, t, n) {
	var r = e.seriesIndex, i = e.getData(t.dataType);
	if (i) {
		var a = Cc(i, t);
		a = (U(a) ? a[0] : a) || 0;
		var o = i.getItemGraphicEl(a);
		if (!o) for (var s = i.count(), c = 0; !o && c < s;) o = i.getItemGraphicEl(c++);
		if (o) {
			var l = bd(o);
			vf(r, l.focus, l.blurScope, n);
		} else {
			var u = e.get(["emphasis", "focus"]), d = e.get(["emphasis", "blurScope"]);
			u != null && vf(r, u, d, n);
		}
	}
}
function xf(e, t, n, r) {
	var i = {
		focusSelf: !1,
		dispatchers: null
	};
	if (e == null || e === "series" || t == null || n == null) return i;
	var a = r.getModel().getComponent(e, t);
	if (!a) return i;
	var o = r.getViewOfComponentModel(a);
	if (!o || !o.findHighDownDispatchers) return i;
	for (var s = o.findHighDownDispatchers(n), c, l = 0; l < s.length; l++) if (bd(s[l]).focus === "self") {
		c = !0;
		break;
	}
	return {
		focusSelf: c,
		dispatchers: s
	};
}
function Sf(e, t, n) {
	var r = bd(e), i = xf(r.componentMainType, r.componentIndex, r.componentHighDownName, n), a = i.dispatchers, o = i.focusSelf;
	a ? (o && yf(r.componentMainType, r.componentIndex, n), V(a, function(e) {
		return cf(e, t);
	})) : (vf(r.seriesIndex, r.focus, r.blurScope, n), r.focus === "self" && yf(r.componentMainType, r.componentIndex, n), cf(e, t));
}
function Cf(e, t, n) {
	_f(n);
	var r = bd(e), i = xf(r.componentMainType, r.componentIndex, r.componentHighDownName, n).dispatchers;
	i ? V(i, function(e) {
		return lf(e, t);
	}) : lf(e, t);
}
function wf(e, t, n) {
	if (Lf(t)) {
		var r = t.dataType, i = Cc(e.getData(r), t);
		U(i) || (i = [i]), e[t.type === "toggleSelect" ? "toggleSelect" : t.type === "select" ? "select" : "unselect"](i, r);
	}
}
function Tf(e) {
	V(e.getAllData(), function(t) {
		var n = t.data, r = t.type;
		n.eachItemGraphicEl(function(t, n) {
			e.isSelected(n, r) ? mf(t) : hf(t);
		});
	});
}
function Ef(e) {
	var t = [];
	return e.eachSeries(function(e) {
		V(e.getAllData(), function(n) {
			n.data;
			var r = n.type, i = e.getSelectedDataIndices();
			if (i.length > 0) {
				var a = {
					dataIndex: i,
					seriesIndex: e.seriesIndex
				};
				r != null && (a.dataType = r), t.push(a);
			}
		});
	}), t;
}
function Df(e, t, n) {
	Pf(e, !0), ef(e, sf), Af(e, t, n);
}
function Of(e) {
	Pf(e, !1);
}
function kf(e, t, n, r) {
	r ? Of(e) : Df(e, t, n);
}
function Af(e, t, n) {
	var r = bd(e);
	t == null ? r.focus &&= null : (r.focus = t, r.blurScope = n);
}
var jf = [
	"emphasis",
	"blur",
	"select"
], Mf = {
	itemStyle: "getItemStyle",
	lineStyle: "getLineStyle",
	areaStyle: "getAreaStyle"
};
function Nf(e, t, n, r) {
	n ||= "itemStyle";
	for (var i = 0; i < jf.length; i++) {
		var a = jf[i], o = t.getModel([a, n]), s = e.ensureState(a);
		s.style = r ? r(o) : o[Mf[n]]();
	}
}
function Pf(e, t) {
	var n = t === !1, r = e;
	e.highDownSilentOnTouch && (r.__highDownSilentOnTouch = e.highDownSilentOnTouch), (!n || r.__highDownDispatcher) && (r.__highByOuter = r.__highByOuter || 0, r.__highDownDispatcher = !n);
}
function Ff(e) {
	return !!(e && e.__highDownDispatcher);
}
function If(e) {
	var t = Pd[e];
	return t == null && Nd <= 32 && (t = Pd[e] = Nd++), t;
}
function Lf(e) {
	var t = e.type;
	return t === "select" || t === "unselect" || t === "toggleSelect";
}
function Rf(e) {
	var t = e.type;
	return t === "highlight" || t === "downplay";
}
function zf(e) {
	var t = Fd(e);
	t.normalFill = e.style.fill, t.normalStroke = e.style.stroke;
	var n = e.states.select || {};
	t.selectFill = n.style && n.style.fill || null, t.selectStroke = n.style && n.style.stroke || null;
}
// node_modules/zrender/lib/tool/transformPath.js
var Bf = gu.CMD, Vf = [
	[],
	[],
	[]
], Hf = Math.sqrt, Uf = Math.atan2;
function Wf(e, t) {
	if (t) {
		var n = e.data, r = e.len(), i, a, o, s, c, l, u = Bf.M, d = Bf.C, f = Bf.L, p = Bf.R, m = Bf.A, h = Bf.Q;
		for (o = 0, s = 0; o < r;) {
			switch (i = n[o++], s = o, a = 0, i) {
				case u:
					a = 1;
					break;
				case f:
					a = 1;
					break;
				case d:
					a = 3;
					break;
				case h:
					a = 2;
					break;
				case m:
					var g = t[4], _ = t[5], v = Hf(t[0] * t[0] + t[1] * t[1]), y = Hf(t[2] * t[2] + t[3] * t[3]), b = Uf(-t[1] / y, t[0] / v);
					n[o] *= v, n[o++] += g, n[o] *= y, n[o++] += _, n[o++] *= v, n[o++] *= y, n[o++] += b, n[o++] += b, o += 2, s = o;
					break;
				case p: l[0] = n[o++], l[1] = n[o++], Hn(l, l, t), n[s++] = l[0], n[s++] = l[1], l[0] += n[o++], l[1] += n[o++], Hn(l, l, t), n[s++] = l[0], n[s++] = l[1];
			}
			for (c = 0; c < a; c++) {
				var x = Vf[c];
				x[0] = n[o++], x[1] = n[o++], Hn(x, x, t), n[s++] = x[0], n[s++] = x[1];
			}
		}
		e.increaseVersion();
	}
}
// node_modules/zrender/lib/tool/path.js
var Gf = Math.sqrt, Kf = Math.sin, qf = Math.cos, Jf = Math.PI;
function Yf(e) {
	return Math.sqrt(e[0] * e[0] + e[1] * e[1]);
}
function Xf(e, t) {
	return (e[0] * t[0] + e[1] * t[1]) / (Yf(e) * Yf(t));
}
function Zf(e, t) {
	return (e[0] * t[1] < e[1] * t[0] ? -1 : 1) * Math.acos(Xf(e, t));
}
function Qf(e, t, n, r, i, a, o, s, c, l, u) {
	var d = Jf / 180 * c, f = qf(d) * (e - n) / 2 + Kf(d) * (t - r) / 2, p = -1 * Kf(d) * (e - n) / 2 + qf(d) * (t - r) / 2, m = f * f / (o * o) + p * p / (s * s);
	m > 1 && (o *= Gf(m), s *= Gf(m));
	var h = (i === a ? -1 : 1) * Gf((o * o * (s * s) - o * o * (p * p) - s * s * (f * f)) / (o * o * (p * p) + s * s * (f * f))) || 0, g = h * o * p / s, _ = h * -s * f / o, v = (e + n) / 2 + qf(d) * g - Kf(d) * _, y = (t + r) / 2 + Kf(d) * g + qf(d) * _, b = Zf([1, 0], [(f - g) / o, (p - _) / s]), x = [(f - g) / o, (p - _) / s], S = [(-1 * f - g) / o, (-1 * p - _) / s], C = Zf(x, S);
	if (Xf(x, S) <= -1 && (C = Jf), Xf(x, S) >= 1 && (C = 0), C < 0) {
		var w = Math.round(C / Jf * 1e6) / 1e6;
		C = Jf * 2 + w % 2 * Jf;
	}
	u.addData(l, v, y, o, s, b, C, d, a);
}
var $f = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/gi, ep = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;
function tp(e) {
	var t = new gu();
	if (!e) return t;
	var n = 0, r = 0, i = n, a = r, o, s = gu.CMD, c = e.match($f);
	if (!c) return t;
	for (var l = 0; l < c.length; l++) {
		for (var u = c[l], d = u.charAt(0), f = void 0, p = u.match(ep) || [], m = p.length, h = 0; h < m; h++) p[h] = parseFloat(p[h]);
		for (var g = 0; g < m;) {
			var _ = void 0, v = void 0, y = void 0, b = void 0, x = void 0, S = void 0, C = void 0, w = n, T = r, E = void 0, D = void 0;
			switch (d) {
				case "l":
					n += p[g++], r += p[g++], f = s.L, t.addData(f, n, r);
					break;
				case "L":
					n = p[g++], r = p[g++], f = s.L, t.addData(f, n, r);
					break;
				case "m":
					n += p[g++], r += p[g++], f = s.M, t.addData(f, n, r), i = n, a = r, d = "l";
					break;
				case "M":
					n = p[g++], r = p[g++], f = s.M, t.addData(f, n, r), i = n, a = r, d = "L";
					break;
				case "h":
					n += p[g++], f = s.L, t.addData(f, n, r);
					break;
				case "H":
					n = p[g++], f = s.L, t.addData(f, n, r);
					break;
				case "v":
					r += p[g++], f = s.L, t.addData(f, n, r);
					break;
				case "V":
					r = p[g++], f = s.L, t.addData(f, n, r);
					break;
				case "C":
					f = s.C, t.addData(f, p[g++], p[g++], p[g++], p[g++], p[g++], p[g++]), n = p[g - 2], r = p[g - 1];
					break;
				case "c":
					f = s.C, t.addData(f, p[g++] + n, p[g++] + r, p[g++] + n, p[g++] + r, p[g++] + n, p[g++] + r), n += p[g - 2], r += p[g - 1];
					break;
				case "S":
					_ = n, v = r, E = t.len(), D = t.data, o === s.C && (_ += n - D[E - 4], v += r - D[E - 3]), f = s.C, w = p[g++], T = p[g++], n = p[g++], r = p[g++], t.addData(f, _, v, w, T, n, r);
					break;
				case "s":
					_ = n, v = r, E = t.len(), D = t.data, o === s.C && (_ += n - D[E - 4], v += r - D[E - 3]), f = s.C, w = n + p[g++], T = r + p[g++], n += p[g++], r += p[g++], t.addData(f, _, v, w, T, n, r);
					break;
				case "Q":
					w = p[g++], T = p[g++], n = p[g++], r = p[g++], f = s.Q, t.addData(f, w, T, n, r);
					break;
				case "q":
					w = p[g++] + n, T = p[g++] + r, n += p[g++], r += p[g++], f = s.Q, t.addData(f, w, T, n, r);
					break;
				case "T":
					_ = n, v = r, E = t.len(), D = t.data, o === s.Q && (_ += n - D[E - 4], v += r - D[E - 3]), n = p[g++], r = p[g++], f = s.Q, t.addData(f, _, v, n, r);
					break;
				case "t":
					_ = n, v = r, E = t.len(), D = t.data, o === s.Q && (_ += n - D[E - 4], v += r - D[E - 3]), n += p[g++], r += p[g++], f = s.Q, t.addData(f, _, v, n, r);
					break;
				case "A":
					y = p[g++], b = p[g++], x = p[g++], S = p[g++], C = p[g++], w = n, T = r, n = p[g++], r = p[g++], f = s.A, Qf(w, T, n, r, S, C, y, b, x, f, t);
					break;
				case "a": y = p[g++], b = p[g++], x = p[g++], S = p[g++], C = p[g++], w = n, T = r, n += p[g++], r += p[g++], f = s.A, Qf(w, T, n, r, S, C, y, b, x, f, t);
			}
		}
		(d === "z" || d === "Z") && (f = s.Z, t.addData(f), n = i, r = a), o = f;
	}
	return t.toStatic(), t;
}
var np = function(e) {
	L(t, e);
	function t() {
		return e !== null && e.apply(this, arguments) || this;
	}
	return t.prototype.applyTransform = function(e) {}, t;
}(Vu);
function rp(e) {
	return e.setData != null;
}
function ip(e, t) {
	var n = tp(e), r = B({}, t);
	return r.buildPath = function(e) {
		var t = rp(e);
		if (t && e.canSave()) {
			e.appendPath(n);
			var r = e.getContext();
			r && e.rebuildPath(r, 1);
		} else {
			var r = t ? e.getContext() : e;
			r && n.rebuildPath(r, 1);
		}
	}, r.applyTransform = function(e) {
		Wf(n, e), this.dirtyShape();
	}, r;
}
function ap(e, t) {
	return new np(ip(e, t));
}
function op(e, t) {
	var n = ip(e, t);
	return function(e) {
		L(t, e);
		function t(t) {
			var r = e.call(this, t) || this;
			return r.applyTransform = n.applyTransform, r.buildPath = n.buildPath, r;
		}
		return t;
	}(np);
}
function sp(e, t) {
	for (var n = [], r = e.length, i = 0; i < r; i++) {
		var a = e[i];
		n.push(a.getUpdatedPathProxy(!0));
	}
	var o = new Vu(t);
	return o.createPathProxy(), o.buildPath = function(e) {
		if (rp(e)) {
			e.appendPath(n);
			var t = e.getContext();
			t && e.rebuildPath(t, 1);
		}
	}, o;
}
// node_modules/zrender/lib/graphic/shape/Circle.js
var cp = function() {
	function e() {
		this.cx = 0, this.cy = 0, this.r = 0;
	}
	return e;
}(), lp = function(e) {
	L(t, e);
	function t(t) {
		return e.call(this, t) || this;
	}
	return t.prototype.getDefaultShape = function() {
		return new cp();
	}, t.prototype.buildPath = function(e, t) {
		e.moveTo(t.cx + t.r, t.cy), e.arc(t.cx, t.cy, t.r, 0, Math.PI * 2);
	}, t;
}(Vu);
lp.prototype.type = "circle";
// node_modules/zrender/lib/graphic/shape/Ellipse.js
var up = function() {
	function e() {
		this.cx = 0, this.cy = 0, this.rx = 0, this.ry = 0;
	}
	return e;
}(), dp = function(e) {
	L(t, e);
	function t(t) {
		return e.call(this, t) || this;
	}
	return t.prototype.getDefaultShape = function() {
		return new up();
	}, t.prototype.buildPath = function(e, t) {
		var n = .5522848, r = t.cx, i = t.cy, a = t.rx, o = t.ry, s = a * n, c = o * n;
		e.moveTo(r - a, i), e.bezierCurveTo(r - a, i - c, r - s, i - o, r, i - o), e.bezierCurveTo(r + s, i - o, r + a, i - c, r + a, i), e.bezierCurveTo(r + a, i + c, r + s, i + o, r, i + o), e.bezierCurveTo(r - s, i + o, r - a, i + c, r - a, i), e.closePath();
	}, t;
}(Vu);
dp.prototype.type = "ellipse";
// node_modules/zrender/lib/graphic/helper/roundSector.js
var fp = Math.PI, pp = fp * 2, mp = Math.sin, hp = Math.cos, gp = Math.acos, _p = Math.atan2, vp = Math.abs, yp = Math.sqrt, bp = Math.max, xp = Math.min, Sp = 1e-4;
function Cp(e, t, n, r, i, a, o, s) {
	var c = n - e, l = r - t, u = o - i, d = s - a, f = d * c - u * l;
	if (!(f * f < Sp)) return f = (u * (t - a) - d * (e - i)) / f, [e + f * c, t + f * l];
}
function wp(e, t, n, r, i, a, o) {
	var s = e - n, c = t - r, l = (o ? a : -a) / yp(s * s + c * c), u = l * c, d = -l * s, f = e + u, p = t + d, m = n + u, h = r + d, g = (f + m) / 2, _ = (p + h) / 2, v = m - f, y = h - p, b = v * v + y * y, x = i - a, S = f * h - m * p, C = (y < 0 ? -1 : 1) * yp(bp(0, x * x * b - S * S)), w = (S * y - v * C) / b, T = (-S * v - y * C) / b, E = (S * y + v * C) / b, D = (-S * v + y * C) / b, O = w - g, k = T - _, A = E - g, j = D - _;
	return O * O + k * k > A * A + j * j && (w = E, T = D), {
		cx: w,
		cy: T,
		x0: -u,
		y0: -d,
		x1: w * (i / x - 1),
		y1: T * (i / x - 1)
	};
}
function Tp(e) {
	var t;
	if (U(e)) {
		var n = e.length;
		if (!n) return e;
		t = n === 1 ? [
			e[0],
			e[0],
			0,
			0
		] : n === 2 ? [
			e[0],
			e[0],
			e[1],
			e[1]
		] : n === 3 ? e.concat(e[2]) : e;
	} else t = [
		e,
		e,
		e,
		e
	];
	return t;
}
function Ep(e, t) {
	var n, r = bp(t.r, 0), i = bp(t.r0 || 0, 0), a = r > 0;
	if (a || i > 0) {
		if (a || (r = i, i = 0), i > r) {
			var o = r;
			r = i, i = o;
		}
		var s = t.startAngle, c = t.endAngle;
		if (!(isNaN(s) || isNaN(c))) {
			var l = t.cx, u = t.cy, d = !!t.clockwise, f = vp(c - s), p = f > pp && f % pp;
			if (p > Sp && (f = p), !(r > Sp)) e.moveTo(l, u);
			else if (f > pp - Sp) e.moveTo(l + r * hp(s), u + r * mp(s)), e.arc(l, u, r, s, c, !d), i > Sp && (e.moveTo(l + i * hp(c), u + i * mp(c)), e.arc(l, u, i, c, s, d));
			else {
				var m = void 0, h = void 0, g = void 0, _ = void 0, v = void 0, y = void 0, b = void 0, x = void 0, S = void 0, C = void 0, w = void 0, T = void 0, E = void 0, D = void 0, O = void 0, k = void 0, A = r * hp(s), j = r * mp(s), ee = i * hp(c), te = i * mp(c), ne = f > Sp;
				if (ne) {
					var re = t.cornerRadius;
					re && (n = Tp(re), m = n[0], h = n[1], g = n[2], _ = n[3]);
					var ie = vp(r - i) / 2;
					if (v = xp(ie, g), y = xp(ie, _), b = xp(ie, m), x = xp(ie, h), w = S = bp(v, y), T = C = bp(b, x), (S > Sp || C > Sp) && (E = r * hp(c), D = r * mp(c), O = i * hp(s), k = i * mp(s), f < fp)) {
						var ae = Cp(A, j, O, k, E, D, ee, te);
						if (ae) {
							var oe = A - ae[0], se = j - ae[1], ce = E - ae[0], le = D - ae[1], ue = 1 / mp(gp((oe * ce + se * le) / (yp(oe * oe + se * se) * yp(ce * ce + le * le))) / 2), de = yp(ae[0] * ae[0] + ae[1] * ae[1]);
							w = xp(S, (r - de) / (ue + 1)), T = xp(C, (i - de) / (ue - 1));
						}
					}
				}
				if (!ne) e.moveTo(l + A, u + j);
				else if (w > Sp) {
					var fe = xp(g, w), pe = xp(_, w), M = wp(O, k, A, j, r, fe, d), N = wp(E, D, ee, te, r, pe, d);
					e.moveTo(l + M.cx + M.x0, u + M.cy + M.y0), w < S && fe === pe ? e.arc(l + M.cx, u + M.cy, w, _p(M.y0, M.x0), _p(N.y0, N.x0), !d) : (fe > 0 && e.arc(l + M.cx, u + M.cy, fe, _p(M.y0, M.x0), _p(M.y1, M.x1), !d), e.arc(l, u, r, _p(M.cy + M.y1, M.cx + M.x1), _p(N.cy + N.y1, N.cx + N.x1), !d), pe > 0 && e.arc(l + N.cx, u + N.cy, pe, _p(N.y1, N.x1), _p(N.y0, N.x0), !d));
				} else e.moveTo(l + A, u + j), e.arc(l, u, r, s, c, !d);
				if (!(i > Sp) || !ne) e.lineTo(l + ee, u + te);
				else if (T > Sp) {
					var fe = xp(m, T), pe = xp(h, T), M = wp(ee, te, E, D, i, -pe, d), N = wp(A, j, O, k, i, -fe, d);
					e.lineTo(l + M.cx + M.x0, u + M.cy + M.y0), T < C && fe === pe ? e.arc(l + M.cx, u + M.cy, T, _p(M.y0, M.x0), _p(N.y0, N.x0), !d) : (pe > 0 && e.arc(l + M.cx, u + M.cy, pe, _p(M.y0, M.x0), _p(M.y1, M.x1), !d), e.arc(l, u, i, _p(M.cy + M.y1, M.cx + M.x1), _p(N.cy + N.y1, N.cx + N.x1), d), fe > 0 && e.arc(l + N.cx, u + N.cy, fe, _p(N.y1, N.x1), _p(N.y0, N.x0), !d));
				} else e.lineTo(l + ee, u + te), e.arc(l, u, i, c, s, d);
			}
			e.closePath();
		}
	}
}
// node_modules/zrender/lib/graphic/shape/Sector.js
var Dp = function() {
	function e() {
		this.cx = 0, this.cy = 0, this.r0 = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0, this.cornerRadius = 0;
	}
	return e;
}(), Op = function(e) {
	L(t, e);
	function t(t) {
		return e.call(this, t) || this;
	}
	return t.prototype.getDefaultShape = function() {
		return new Dp();
	}, t.prototype.buildPath = function(e, t) {
		Ep(e, t);
	}, t.prototype.isZeroArea = function() {
		return this.shape.startAngle === this.shape.endAngle || this.shape.r === this.shape.r0;
	}, t;
}(Vu);
Op.prototype.type = "sector";
// node_modules/zrender/lib/graphic/shape/Ring.js
var kp = function() {
	function e() {
		this.cx = 0, this.cy = 0, this.r = 0, this.r0 = 0;
	}
	return e;
}(), Ap = function(e) {
	L(t, e);
	function t(t) {
		return e.call(this, t) || this;
	}
	return t.prototype.getDefaultShape = function() {
		return new kp();
	}, t.prototype.buildPath = function(e, t) {
		var n = t.cx, r = t.cy, i = Math.PI * 2;
		e.moveTo(n + t.r, r), e.arc(n, r, t.r, 0, i, !1), e.moveTo(n + t.r0, r), e.arc(n, r, t.r0, 0, i, !0);
	}, t;
}(Vu);
Ap.prototype.type = "ring";
// node_modules/zrender/lib/graphic/helper/smoothBezier.js
function jp(e, t, n, r) {
	var i = [], a = [], o = [], s = [], c, l, u, d;
	if (r) {
		u = [Infinity, Infinity], d = [-Infinity, -Infinity];
		for (var f = 0, p = e.length; f < p; f++) Un(u, u, e[f]), Wn(d, d, e[f]);
		Un(u, u, r[0]), Wn(d, d, r[1]);
	}
	for (var f = 0, p = e.length; f < p; f++) {
		var m = e[f];
		if (n) c = e[f ? f - 1 : p - 1], l = e[(f + 1) % p];
		else if (f === 0 || f === p - 1) {
			i.push(kn(e[f]));
			continue;
		} else c = e[f - 1], l = e[f + 1];
		Mn(a, l, c), Fn(a, a, t);
		var h = Ln(m, c), g = Ln(m, l), _ = h + g;
		_ !== 0 && (h /= _, g /= _), Fn(o, a, -h), Fn(s, a, g);
		var v = jn([], m, o), y = jn([], m, s);
		r && (Wn(v, v, u), Un(v, v, d), Wn(y, y, u), Un(y, y, d)), i.push(v), i.push(y);
	}
	return n && i.push(i.shift()), i;
}
// node_modules/zrender/lib/graphic/helper/poly.js
function Mp(e, t, n) {
	var r = t.smooth, i = t.points;
	if (i && i.length >= 2) {
		if (r) {
			var a = jp(i, r, n, t.smoothConstraint);
			e.moveTo(i[0][0], i[0][1]);
			for (var o = i.length, s = 0; s < (n ? o : o - 1); s++) {
				var c = a[s * 2], l = a[s * 2 + 1], u = i[(s + 1) % o];
				e.bezierCurveTo(c[0], c[1], l[0], l[1], u[0], u[1]);
			}
		} else {
			e.moveTo(i[0][0], i[0][1]);
			for (var s = 1, d = i.length; s < d; s++) e.lineTo(i[s][0], i[s][1]);
		}
		n && e.closePath();
	}
}
// node_modules/zrender/lib/graphic/shape/Polygon.js
var Np = function() {
	function e() {
		this.points = null, this.smooth = 0, this.smoothConstraint = null;
	}
	return e;
}(), Pp = function(e) {
	L(t, e);
	function t(t) {
		return e.call(this, t) || this;
	}
	return t.prototype.getDefaultShape = function() {
		return new Np();
	}, t.prototype.buildPath = function(e, t) {
		Mp(e, t, !0);
	}, t;
}(Vu);
Pp.prototype.type = "polygon";
// node_modules/zrender/lib/graphic/shape/Polyline.js
var Fp = function() {
	function e() {
		this.points = null, this.percent = 1, this.smooth = 0, this.smoothConstraint = null;
	}
	return e;
}(), Ip = function(e) {
	L(t, e);
	function t(t) {
		return e.call(this, t) || this;
	}
	return t.prototype.getDefaultStyle = function() {
		return {
			stroke: "#000",
			fill: null
		};
	}, t.prototype.getDefaultShape = function() {
		return new Fp();
	}, t.prototype.buildPath = function(e, t) {
		Mp(e, t, !1);
	}, t;
}(Vu);
Ip.prototype.type = "polyline";
// node_modules/zrender/lib/graphic/shape/Line.js
var Lp = {}, Rp = function() {
	function e() {
		this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.percent = 1;
	}
	return e;
}(), zp = function(e) {
	L(t, e);
	function t(t) {
		return e.call(this, t) || this;
	}
	return t.prototype.getDefaultStyle = function() {
		return {
			stroke: "#000",
			fill: null
		};
	}, t.prototype.getDefaultShape = function() {
		return new Rp();
	}, t.prototype.buildPath = function(e, t) {
		var n, r, i, a;
		if (this.subPixelOptimize) {
			var o = Xu(Lp, t, this.style);
			n = o.x1, r = o.y1, i = o.x2, a = o.y2;
		} else n = t.x1, r = t.y1, i = t.x2, a = t.y2;
		var s = t.percent;
		s !== 0 && (e.moveTo(n, r), s < 1 && (i = n * (1 - s) + i * s, a = r * (1 - s) + a * s), e.lineTo(i, a));
	}, t.prototype.pointAt = function(e) {
		var t = this.shape;
		return [t.x1 * (1 - e) + t.x2 * e, t.y1 * (1 - e) + t.y2 * e];
	}, t;
}(Vu);
zp.prototype.type = "line";
// node_modules/zrender/lib/graphic/shape/BezierCurve.js
var Bp = [], Vp = function() {
	function e() {
		this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.cpx1 = 0, this.cpy1 = 0, this.percent = 1;
	}
	return e;
}();
function Hp(e, t, n) {
	var r = e.cpx2, i = e.cpy2;
	return r != null || i != null ? [(n ? Li : Ii)(e.x1, e.cpx1, e.cpx2, e.x2, t), (n ? Li : Ii)(e.y1, e.cpy1, e.cpy2, e.y2, t)] : [(n ? Wi : Ui)(e.x1, e.cpx1, e.x2, t), (n ? Wi : Ui)(e.y1, e.cpy1, e.y2, t)];
}
var Up = function(e) {
	L(t, e);
	function t(t) {
		return e.call(this, t) || this;
	}
	return t.prototype.getDefaultStyle = function() {
		return {
			stroke: "#000",
			fill: null
		};
	}, t.prototype.getDefaultShape = function() {
		return new Vp();
	}, t.prototype.buildPath = function(e, t) {
		var n = t.x1, r = t.y1, i = t.x2, a = t.y2, o = t.cpx1, s = t.cpy1, c = t.cpx2, l = t.cpy2, u = t.percent;
		u !== 0 && (e.moveTo(n, r), c == null || l == null ? (u < 1 && (qi(n, o, i, u, Bp), o = Bp[1], i = Bp[2], qi(r, s, a, u, Bp), s = Bp[1], a = Bp[2]), e.quadraticCurveTo(o, s, i, a)) : (u < 1 && (Bi(n, o, c, i, u, Bp), o = Bp[1], c = Bp[2], i = Bp[3], Bi(r, s, l, a, u, Bp), s = Bp[1], l = Bp[2], a = Bp[3]), e.bezierCurveTo(o, s, c, l, i, a)));
	}, t.prototype.pointAt = function(e) {
		return Hp(this.shape, e, !1);
	}, t.prototype.tangentAt = function(e) {
		var t = Hp(this.shape, e, !0);
		return In(t, t);
	}, t;
}(Vu);
Up.prototype.type = "bezier-curve";
// node_modules/zrender/lib/graphic/shape/Arc.js
var Wp = function() {
	function e() {
		this.cx = 0, this.cy = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0;
	}
	return e;
}(), Gp = function(e) {
	L(t, e);
	function t(t) {
		return e.call(this, t) || this;
	}
	return t.prototype.getDefaultStyle = function() {
		return {
			stroke: "#000",
			fill: null
		};
	}, t.prototype.getDefaultShape = function() {
		return new Wp();
	}, t.prototype.buildPath = function(e, t) {
		var n = t.cx, r = t.cy, i = Math.max(t.r, 0), a = t.startAngle, o = t.endAngle, s = t.clockwise, c = Math.cos(a), l = Math.sin(a);
		e.moveTo(c * i + n, l * i + r), e.arc(n, r, i, a, o, !s);
	}, t;
}(Vu);
Gp.prototype.type = "arc";
// node_modules/zrender/lib/graphic/CompoundPath.js
var Kp = function(e) {
	L(t, e);
	function t() {
		var t = e !== null && e.apply(this, arguments) || this;
		return t.type = "compound", t;
	}
	return t.prototype._updatePathDirty = function() {
		for (var e = this.shape.paths, t = this.shapeChanged(), n = 0; n < e.length; n++) t ||= e[n].shapeChanged();
		t && this.dirtyShape();
	}, t.prototype.beforeBrush = function() {
		this._updatePathDirty();
		for (var e = this.shape.paths || [], t = this.getGlobalScale(), n = 0; n < e.length; n++) e[n].path || e[n].createPathProxy(), e[n].path.setScale(t[0], t[1], e[n].segmentIgnoreThreshold);
	}, t.prototype.buildPath = function(e, t) {
		for (var n = t.paths || [], r = 0; r < n.length; r++) n[r].buildPath(e, n[r].shape, !0);
	}, t.prototype.afterBrush = function() {
		for (var e = this.shape.paths || [], t = 0; t < e.length; t++) e[t].pathUpdated();
	}, t.prototype.getBoundingRect = function() {
		return this._updatePathDirty.call(this), Vu.prototype.getBoundingRect.call(this);
	}, t;
}(Vu), qp = function() {
	function e(e) {
		this.colorStops = e || [];
	}
	return e.prototype.addColorStop = function(e, t) {
		this.colorStops.push({
			offset: e,
			color: t
		});
	}, e;
}(), Jp = function(e) {
	L(t, e);
	function t(t, n, r, i, a, o) {
		var s = e.call(this, a) || this;
		return s.x = t ?? 0, s.y = n ?? 0, s.x2 = r ?? 1, s.y2 = i ?? 0, s.type = "linear", s.global = o || !1, s;
	}
	return t;
}(qp), Yp = function(e) {
	L(t, e);
	function t(t, n, r, i, a) {
		var o = e.call(this, i) || this;
		return o.x = t ?? .5, o.y = n ?? .5, o.r = r ?? .5, o.type = "radial", o.global = a || !1, o;
	}
	return t;
}(qp), Xp = Math.min, Zp = Math.max, Qp = Math.abs, $p = [0, 0], em = [0, 0], tm = Zr(), nm = tm.minTv, rm = tm.maxTv, im = function() {
	function e(e, t) {
		this._corners = [], this._axes = [], this._origin = [0, 0];
		for (var n = 0; n < 4; n++) this._corners[n] = new Y();
		for (var n = 0; n < 2; n++) this._axes[n] = new Y();
		e && this.fromBoundingRect(e, t);
	}
	return e.prototype.fromBoundingRect = function(e, t) {
		var n = this._corners, r = this._axes, i = e.x, a = e.y, o = i + e.width, s = a + e.height;
		if (n[0].set(i, a), n[1].set(o, a), n[2].set(o, s), n[3].set(i, s), t) for (var c = 0; c < 4; c++) n[c].transform(t);
		Y.sub(r[0], n[1], n[0]), Y.sub(r[1], n[3], n[0]), r[0].normalize(), r[1].normalize();
		for (var c = 0; c < 2; c++) this._origin[c] = r[c].dot(n[0]);
	}, e.prototype.intersect = function(e, t, n) {
		var r = !0, i = !t;
		return t && Y.set(t, 0, 0), tm.reset(n, !i), !this._intersectCheckOneSide(this, e, i, 1) && (r = !1, i) || !this._intersectCheckOneSide(e, this, i, -1) && (r = !1, i) || !i && !tm.negativeSize && Y.copy(t, r ? tm.useDir ? tm.dirMinTv : nm : rm), r;
	}, e.prototype._intersectCheckOneSide = function(e, t, n, r) {
		for (var i = !0, a = 0; a < 2; a++) {
			var o = e._axes[a];
			if (e._getProjMinMaxOnAxis(a, e._corners, $p), e._getProjMinMaxOnAxis(a, t._corners, em), tm.negativeSize || $p[1] < em[0] || $p[0] > em[1]) {
				if (i = !1, tm.negativeSize || n) return i;
				var s = Qp(em[0] - $p[1]), c = Qp($p[0] - em[1]);
				Xp(s, c) > rm.len() && (s < c ? Y.scale(rm, o, -s * r) : Y.scale(rm, o, c * r));
			} else if (!n) {
				var s = Qp(em[0] - $p[1]), c = Qp($p[0] - em[1]);
				(tm.useDir || Xp(s, c) < nm.len()) && ((s < c || !tm.bidirectional) && (Y.scale(nm, o, s * r), tm.useDir && tm.calcDirMTV()), (s >= c || !tm.bidirectional) && (Y.scale(nm, o, -c * r), tm.useDir && tm.calcDirMTV()));
			}
		}
		return i;
	}, e.prototype._getProjMinMaxOnAxis = function(e, t, n) {
		for (var r = this._axes[e], i = this._origin, a = t[0].dot(r) + i[e], o = a, s = a, c = 1; c < t.length; c++) {
			var l = t[c].dot(r) + i[e];
			o = Xp(l, o), s = Zp(l, s);
		}
		n[0] = o + tm.touchThreshold, n[1] = s - tm.touchThreshold, tm.negativeSize = n[1] < n[0];
	}, e;
}(), am = [], om = function(e) {
	L(t, e);
	function t() {
		var t = e !== null && e.apply(this, arguments) || this;
		return t.notClear = !0, t.incremental = 1, t._displayables = [], t._temporaryDisplayables = [], t._cursor = 0, t;
	}
	return t.prototype.traverse = function(e, t) {
		e.call(t, this);
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
	}, t.prototype.addDisplayable = function(e, t) {
		t ? this._temporaryDisplayables.push(e) : this._displayables.push(e), this.markRedraw();
	}, t.prototype.addDisplayables = function(e, t) {
		t ||= !1;
		for (var n = 0; n < e.length; n++) this.addDisplayable(e[n], t);
	}, t.prototype.getDisplayables = function() {
		return this._displayables;
	}, t.prototype.getTemporalDisplayables = function() {
		return this._temporaryDisplayables;
	}, t.prototype.eachPendingDisplayable = function(e) {
		for (var t = this._cursor; t < this._displayables.length; t++) e && e(this._displayables[t]);
		for (var t = 0; t < this._temporaryDisplayables.length; t++) e && e(this._temporaryDisplayables[t]);
	}, t.prototype.update = function() {
		this.updateTransform();
		for (var e = this._cursor; e < this._displayables.length; e++) {
			var t = this._displayables[e];
			t.parent = this, t.update(), t.parent = null;
		}
		for (var e = 0; e < this._temporaryDisplayables.length; e++) {
			var t = this._temporaryDisplayables[e];
			t.parent = this, t.update(), t.parent = null;
		}
	}, t.prototype.getBoundingRect = function() {
		if (!this._rect) {
			for (var e = new X(Infinity, Infinity, -Infinity, -Infinity), t = 0; t < this._displayables.length; t++) {
				var n = this._displayables[t], r = n.getBoundingRect().clone();
				n.needLocalTransform() && r.applyTransform(n.getLocalTransform(am)), e.union(r);
			}
			this._rect = e;
		}
		return this._rect;
	}, t.prototype.contain = function(e, t) {
		var n = this.transformCoordToLocal(e, t);
		if (this.getBoundingRect().contain(n[0], n[1])) {
			for (var r = 0; r < this._displayables.length; r++) if (this._displayables[r].contain(e, t)) return !0;
		}
		return !1;
	}, t;
}(Fl), sm = Z();
function cm(e, t, n, r, i) {
	var a;
	if (t && t.ecModel) {
		var o = t.ecModel.getUpdatePayload();
		a = o && o.animation;
	}
	var s = t && t.isAnimationEnabled(), c = e === "update";
	if (s) {
		var l = void 0, u = void 0, d = void 0;
		return r ? (l = q(r.duration, 200), u = q(r.easing, "cubicOut"), d = 0) : (l = t.getShallow(c ? "animationDurationUpdate" : "animationDuration"), u = t.getShallow(c ? "animationEasingUpdate" : "animationEasing"), d = t.getShallow(c ? "animationDelayUpdate" : "animationDelay")), a && (a.duration != null && (l = a.duration), a.easing != null && (u = a.easing), a.delay != null && (d = a.delay)), W(d) && (d = d(n, i)), W(l) && (l = l(n)), {
			duration: l || 0,
			delay: d,
			easing: u
		};
	}
	return null;
}
function lm(e, t, n, r, i, a, o) {
	var s = !1, c;
	W(i) ? (o = a, a = i, i = null) : K(i) && (a = i.cb, o = i.during, s = i.isFrom, c = i.removeOpt, i = i.dataIndex);
	var l = e === "leave";
	l || t.stopAnimation("leave");
	var u = cm(e, r, i, l ? c || {} : null, r && r.getAnimationDelayParams ? r.getAnimationDelayParams(t, i) : null);
	if (u && u.duration > 0) {
		var d = u.duration, f = u.delay, p = u.easing, m = {
			duration: d,
			delay: f || 0,
			easing: p,
			done: a,
			force: !!a || !!o,
			setToFinal: !l,
			scope: e,
			during: o
		};
		s ? t.animateFrom(n, m) : t.animateTo(n, m);
	} else t.stopAnimation(), !s && t.attr(n), o && o(1), a && a();
}
function um(e, t, n, r, i, a) {
	lm("update", e, t, n, r, i, a);
}
function dm(e, t, n, r, i, a) {
	lm("enter", e, t, n, r, i, a);
}
function fm(e) {
	if (!e.__zr) return !0;
	for (var t = 0; t < e.animators.length; t++) if (e.animators[t].scope === "leave") return !0;
	return !1;
}
function pm(e, t, n, r, i, a) {
	fm(e) || lm("leave", e, t, n, r, i, a);
}
function mm(e, t, n, r) {
	e.removeTextContent(), e.removeTextGuideLine(), pm(e, { style: { opacity: 0 } }, t, n, r);
}
function hm(e, t, n) {
	function r() {
		e.parent && e.parent.remove(e);
	}
	e.isGroup ? e.traverse(function(e) {
		e.isGroup || mm(e, t, n, r);
	}) : mm(e, t, n, r);
}
function gm(e) {
	sm(e).oldStyle = e.style;
}
// node_modules/echarts/lib/util/graphic.js
var _m = /* @__PURE__ */ t({
	Arc: () => Gp,
	BezierCurve: () => Up,
	BoundingRect: () => X,
	Circle: () => lp,
	CompoundPath: () => Kp,
	Ellipse: () => dp,
	Group: () => us,
	HOVER_LAYER_FOR_INCREMENTAL: () => 2,
	HOVER_LAYER_FROM_THRESHOLD: () => 1,
	HOVER_LAYER_NO: () => 0,
	Image: () => qu,
	IncrementalDisplayable: () => om,
	Line: () => zp,
	LinearGradient: () => Jp,
	OrientedBoundingRect: () => im,
	Path: () => Vu,
	Point: () => Y,
	Polygon: () => Pp,
	Polyline: () => Ip,
	RadialGradient: () => Yp,
	Rect: () => td,
	Ring: () => Ap,
	Sector: () => Op,
	Text: () => od,
	WH: () => bm,
	XY: () => ym,
	applyTransform: () => Fm,
	calcZ2Range: () => ih,
	clipPointsByRect: () => Bm,
	clipRectByRect: () => Vm,
	createIcon: () => Hm,
	decomposeTransform: () => ch,
	ensureCopyRect: () => th,
	ensureCopyTransform: () => nh,
	expandOrShrinkRect: () => qm,
	extendPath: () => Cm,
	extendShape: () => xm,
	getCurrentCanvasPainter: () => uh,
	getShapeClass: () => Tm,
	getTransform: () => Pm,
	groupTransition: () => zm,
	initProps: () => dm,
	isBoundingRectAxisAligned: () => $m,
	isElementRemoved: () => fm,
	lineLineIntersect: () => Wm,
	linePolygonIntersect: () => Um,
	makeImage: () => Dm,
	makePath: () => Em,
	mergePath: () => km,
	payloadDisableAnimation: () => sh,
	registerShape: () => wm,
	removeElement: () => pm,
	removeElementWithFadeOut: () => hm,
	resizePath: () => Am,
	retrieveZInfo: () => rh,
	setTooltipConfig: () => Xm,
	subPixelOptimize: () => Nm,
	subPixelOptimizeLine: () => jm,
	subPixelOptimizeRect: () => Mm,
	transformDirection: () => Im,
	traverseElements: () => Qm,
	traverseUpdateZ: () => ah,
	updateProps: () => um
}), vm = {}, ym = ["x", "y"], bm = ["width", "height"];
function xm(e) {
	return Vu.extend(e);
}
var Sm = op;
function Cm(e, t) {
	return Sm(e, t);
}
function wm(e, t) {
	vm[e] = t;
}
function Tm(e) {
	if (vm.hasOwnProperty(e)) return vm[e];
}
function Em(e, t, n, r) {
	var i = ap(e, t);
	return n && (r === "center" && (n = Om(n, i.getBoundingRect())), Am(i, n)), i;
}
function Dm(e, t, n) {
	var r = new qu({
		style: {
			image: e,
			x: t.x,
			y: t.y,
			width: t.width,
			height: t.height
		},
		onload: function(e) {
			if (n === "center") {
				var i = {
					width: e.width,
					height: e.height
				};
				r.setStyle(Om(t, i));
			}
		}
	});
	return r;
}
function Om(e, t) {
	var n = t.width / t.height, r = e.height * n, i;
	r <= e.width ? i = e.height : (r = e.width, i = r / n);
	var a = e.x + e.width / 2, o = e.y + e.height / 2;
	return {
		x: a - r / 2,
		y: o - i / 2,
		width: r,
		height: i
	};
}
var km = sp;
function Am(e, t) {
	if (e.applyTransform) {
		var n = e.getBoundingRect().calculateTransform(t);
		e.applyTransform(n);
	}
}
function jm(e, t) {
	return Xu(e, e, { lineWidth: t }), e;
}
function Mm(e, t) {
	return Zu(e, e, t), e;
}
var Nm = Qu;
function Pm(e, t) {
	for (var n = wr([]); e && e !== t;) Er(n, e.getLocalTransform(), n), e = e.parent;
	return n;
}
function Fm(e, t, n) {
	return t && !qt(t) && (t = ko.getLocalTransform(t)), n && (t = Ar([], t)), Hn([], e, t);
}
function Im(e, t, n) {
	var r = t[4] === 0 || t[5] === 0 || t[0] === 0 ? 1 : Cs(2 * t[4] / t[0]), i = t[4] === 0 || t[5] === 0 || t[2] === 0 ? 1 : Cs(2 * t[4] / t[2]), a = [e === "left" ? -r : e === "right" ? r : 0, e === "top" ? -i : e === "bottom" ? i : 0];
	return a = Fm(a, t, n), Cs(a[0]) > Cs(a[1]) ? a[0] > 0 ? "right" : "left" : a[1] > 0 ? "bottom" : "top";
}
function Lm(e) {
	return !e.isGroup;
}
function Rm(e) {
	return e.shape != null;
}
function zm(e, t, n) {
	if (!e || !t) return;
	function r(e) {
		var t = {};
		return e.traverse(function(e) {
			Lm(e) && e.anid && (t[e.anid] = e);
		}), t;
	}
	function i(e) {
		var t = {
			x: e.x,
			y: e.y,
			rotation: e.rotation
		};
		return Rm(e) && (t.shape = z(e.shape)), t;
	}
	var a = r(e);
	t.traverse(function(e) {
		if (Lm(e) && e.anid) {
			var t = a[e.anid];
			if (t) {
				var r = i(e);
				e.attr(i(t)), um(e, r, n, bd(e).dataIndex);
			}
		}
	});
}
function Bm(e, t) {
	return H(e, function(e) {
		var n = e[0];
		n = Ss(n, t.x), n = xs(n, t.x + t.width);
		var r = e[1];
		return r = Ss(r, t.y), r = xs(r, t.y + t.height), [n, r];
	});
}
function Vm(e, t) {
	var n = Ss(e.x, t.x), r = xs(e.x + e.width, t.x + t.width), i = Ss(e.y, t.y), a = xs(e.y + e.height, t.y + t.height);
	if (r >= n && a >= i) return {
		x: n,
		y: i,
		width: r - n,
		height: a - i
	};
}
function Hm(e, t, n) {
	var r = B({ rectHover: !0 }, t), i = r.style = { strokeNoScale: !0 };
	if (n ||= {
		x: -1,
		y: -1,
		width: 2,
		height: 2
	}, e) return e.indexOf("image://") === 0 ? (i.image = e.slice(8), Ut(i, n), new qu(r)) : Em(e.replace("path://", ""), r, n, "center");
}
function Um(e, t, n, r, i) {
	for (var a = 0, o = i[i.length - 1]; a < i.length; a++) {
		var s = i[a];
		if (Wm(e, t, n, r, s[0], s[1], o[0], o[1])) return !0;
		o = s;
	}
}
function Wm(e, t, n, r, i, a, o, s) {
	var c = n - e, l = r - t, u = o - i, d = s - a, f = Gm(u, d, c, l);
	if (Km(f)) return !1;
	var p = e - i, m = t - a, h = Gm(p, m, c, l) / f;
	if (h < 0 || h > 1) return !1;
	var g = Gm(p, m, u, d) / f;
	return !(g < 0 || g > 1);
}
function Gm(e, t, n, r) {
	return e * r - n * t;
}
function Km(e) {
	return e <= 1e-6 && e >= -1e-6;
}
function qm(e, t, n, r, i) {
	return t == null || (tn(t) ? Jm[0] = Jm[1] = Jm[2] = Jm[3] = t : (Jm[0] = t[0], Jm[1] = t[1], Jm[2] = t[2], Jm[3] = t[3]), r && (Jm[0] = Ss(0, Jm[0]), Jm[1] = Ss(0, Jm[1]), Jm[2] = Ss(0, Jm[2]), Jm[3] = Ss(0, Jm[3])), n && (Jm[0] = -Jm[0], Jm[1] = -Jm[1], Jm[2] = -Jm[2], Jm[3] = -Jm[3]), Ym(e, Jm, "x", "width", 3, 1, i && i[0] || 0), Ym(e, Jm, "y", "height", 0, 2, i && i[1] || 0)), e;
}
var Jm = [
	0,
	0,
	0,
	0
];
function Ym(e, t, n, r, i, a, o) {
	var s = t[a] + t[i], c = e[r];
	e[r] += s, o = Ss(0, xs(o, c)), e[r] < o ? (e[r] = o, e[n] += t[i] >= 0 ? -t[i] : t[a] >= 0 ? c + t[a] : Cs(s) > 1e-8 ? (c - o) * t[i] / s : 0) : e[n] -= t[i];
}
function Xm(e) {
	var t = e.itemTooltipOption, n = e.componentModel, r = e.itemName, i = G(t) ? { formatter: t } : t, a = n.mainType, o = n.componentIndex, s = {
		componentType: a,
		name: r,
		$vars: ["name"]
	};
	s[a + "Index"] = o;
	var c = e.formatterParamsExtra;
	c && V(Xt(c), function(e) {
		Tn(s, e) || (s[e] = c[e], s.$vars.push(e));
	});
	var l = bd(e.el);
	l.componentMainType = a, l.componentIndex = o, l.tooltipConfig = {
		name: r,
		option: Ut({
			content: r,
			encodeHTMLContent: !0,
			formatterParams: s
		}, i)
	};
}
function Zm(e, t) {
	var n;
	e.isGroup && (n = t(e)), n || e.traverse(t);
}
function Qm(e, t) {
	if (e) {
		if (U(e)) for (var n = 0; n < e.length; n++) Zm(e[n], t);
		else Zm(e, t);
	}
}
function $m(e) {
	return !e || Cs(e[1]) < eh && Cs(e[2]) < eh || Cs(e[0]) < eh && Cs(e[3]) < eh;
}
var eh = 1e-5;
function th(e, t) {
	return e ? X.copy(e, t) : t.clone();
}
function nh(e, t) {
	return t ? Tr(e || Cr(), t) : void 0;
}
function rh(e) {
	return {
		z: e.get("z") || 0,
		zlevel: e.get("zlevel") || 0
	};
}
function ih(e) {
	var t = -Infinity, n = Infinity;
	Zm(e, function(e) {
		r(e), r(e.getTextContent()), r(e.getTextGuideLine());
	});
	function r(e) {
		if (e && !e.isGroup) {
			var t = e.currentStates;
			if (t.length) for (var n = 0; n < t.length; n++) i(e.states[t[n]]);
			i(e);
		}
	}
	function i(e) {
		if (e) {
			var r = e.z2;
			r > t && (t = r), r < n && (n = r);
		}
	}
	return n > t && (n = t = 0), {
		min: n,
		max: t
	};
}
function ah(e, t, n) {
	oh(e, t, n, -Infinity);
}
function oh(e, t, n, r) {
	if (e.ignoreModelZ) return r;
	var i = e.getTextContent(), a = e.getTextGuideLine();
	if (e.isGroup) for (var o = e.childrenRef(), s = 0; s < o.length; s++) r = Ss(oh(o[s], t, n, r), r);
	else e.z = t, e.zlevel = n, r = Ss(e.z2 || 0, r);
	if (i && (i.z = t, i.zlevel = n, isFinite(r) && (i.z2 = r + 2)), a) {
		var c = e.textGuideLineConfig;
		a.z = t, a.zlevel = n, isFinite(r) && (a.z2 = r + (c && c.showAbove ? 1 : -1));
	}
	return r;
}
function sh(e) {
	return e.animation = { duration: 0 }, e;
}
function ch(e, t) {
	return t ? Tr(lh.transform, t) : wr(lh.transform), lh.decomposeTransform(), Mo(e, lh), e;
}
var lh = new ko();
lh.transform = Cr();
function uh(e) {
	var t = e.getZr().painter;
	return t.getType() === "canvas" ? t : null;
}
wm("circle", lp), wm("ellipse", dp), wm("sector", Op), wm("ring", Ap), wm("polygon", Pp), wm("polyline", Ip), wm("rect", td), wm("line", zp), wm("bezierCurve", Up), wm("arc", Gp);
// node_modules/echarts/lib/label/labelStyle.js
var dh = {};
function fh(e, t) {
	for (var n = 0; n < Ld.length; n++) {
		var r = Ld[n], i = t[r], a = e.ensureState(r);
		a.style = a.style || {}, a.style.text = i;
	}
	var o = e.currentStates.slice();
	e.clearStates(!0), e.setStyle({ text: t.normal }), e.useStates(o, !0);
}
function ph(e, t, n) {
	var r = e.labelFetcher, i = e.labelDataIndex, a = e.labelDimIndex, o = t.normal, s;
	r && (s = r.getFormattedLabel(i, "normal", null, a, o && o.get("formatter"), n == null ? null : { interpolatedValue: n })), s ??= W(e.defaultText) ? e.defaultText(i, e, n) : e.defaultText;
	for (var c = { normal: s }, l = 0; l < Ld.length; l++) {
		var u = Ld[l], d = t[u];
		c[u] = q(r ? r.getFormattedLabel(i, u, null, a, d && d.get("formatter")) : null, s);
	}
	return c;
}
function mh(e, t, n, r) {
	n ||= dh;
	for (var i = e instanceof od, a = !1, o = 0; o < Rd.length; o++) {
		var s = t[Rd[o]];
		if (s && s.getShallow("show")) {
			a = !0;
			break;
		}
	}
	var c = i ? e : e.getTextContent();
	if (a) {
		i || (c || (c = new od(), e.setTextContent(c)), e.stateProxy && (c.stateProxy = e.stateProxy));
		var l = ph(n, t), u = t.normal, d = !!u.getShallow("show"), f = gh(u, r && r.normal, n, !1, !i);
		f.text = l.normal, i || e.setTextConfig(_h(u, n, !1));
		for (var o = 0; o < Ld.length; o++) {
			var p = Ld[o], s = t[p];
			if (s) {
				var m = c.ensureState(p), h = !!q(s.getShallow("show"), d);
				if (h !== d && (m.ignore = !h), m.style = gh(s, r && r[p], n, !0, !i), m.style.text = l[p], !i) {
					var g = e.ensureState(p);
					g.textConfig = _h(s, n, !0);
				}
			}
		}
		c.silent = !!u.getShallow("silent"), c.style.x != null && (f.x = c.style.x), c.style.y != null && (f.y = c.style.y), c.ignore = !d, c.useStyle(f), c.dirty(), n.enableTextSetter && (Th(c).setLabelText = function(e) {
			var r = ph(n, t, e);
			fh(c, r);
		});
	} else c && (c.ignore = !0);
	e.dirty();
}
function hh(e, t) {
	t ||= "label";
	for (var n = { normal: e.getModel(t) }, r = 0; r < Ld.length; r++) {
		var i = Ld[r];
		n[i] = e.getModel([i, t]);
	}
	return n;
}
function gh(e, t, n, r, i) {
	var a = {};
	return vh(a, e, n, r, i), t && B(a, t), a;
}
function _h(e, t, n) {
	t ||= {};
	var r = {}, i, a = e.getShallow("rotate"), o = q(e.getShallow("distance"), n ? null : 5), s = e.getShallow("offset");
	return i = e.getShallow("position") || (n ? null : "inside"), i === "outside" && (i = t.defaultOutsidePosition || "top"), i != null && (r.position = i), s != null && (r.offset = s), a != null && (a *= Math.PI / 180, r.rotation = a), o != null && (r.distance = o), r.outsideFill = e.get("color") === "inherit" ? t.inheritColor || null : "auto", t.autoOverflowArea != null && (r.autoOverflowArea = t.autoOverflowArea), t.layoutRect != null && (r.layoutRect = t.layoutRect), r;
}
function vh(e, t, n, r, i) {
	n ||= dh;
	var a = t.ecModel, o = a && a.option.textStyle, s = yh(t), c;
	if (s) {
		c = {};
		var l = "richInheritPlainLabel", u = q(t.get(l), a ? a.get(l) : void 0);
		for (var d in s) if (s.hasOwnProperty(d)) {
			var f = t.getModel(["rich", d]);
			Ch(c[d] = {}, f, o, t, u, n, r, i, !1, !0);
		}
	}
	c && (e.rich = c);
	var p = t.get("overflow");
	p && (e.overflow = p);
	var m = t.get("lineOverflow");
	m && (e.lineOverflow = m);
	var h = e, g = t.get("minMargin");
	if (g != null) g = tn(g) ? g / 2 : 0, h.margin = [
		g,
		g,
		g,
		g
	], h.__marginType = Eh.minMargin;
	else {
		var _ = t.get("textMargin");
		_ != null && (h.margin = fn(_), h.__marginType = Eh.textMargin);
	}
	Ch(e, t, o, null, null, n, r, i, !0, !1);
}
function yh(e) {
	for (var t; e && e !== e.ecModel;) {
		var n = (e.option || dh).rich;
		if (n) {
			t ||= {};
			for (var r = Xt(n), i = 0; i < r.length; i++) {
				var a = r[i];
				t[a] = 1;
			}
		}
		e = e.parentModel;
	}
	return t;
}
var bh = [
	"fontStyle",
	"fontWeight",
	"fontSize",
	"fontFamily",
	"textShadowColor",
	"textShadowBlur",
	"textShadowOffsetX",
	"textShadowOffsetY"
], xh = [
	"align",
	"lineHeight",
	"width",
	"height",
	"tag",
	"verticalAlign",
	"ellipsis"
], Sh = [
	"padding",
	"borderWidth",
	"borderRadius",
	"borderDashOffset",
	"backgroundColor",
	"borderColor",
	"shadowColor",
	"shadowBlur",
	"shadowOffsetX",
	"shadowOffsetY"
];
function Ch(e, t, n, r, i, a, o, s, c, l) {
	n = !o && n || dh;
	var u = a && a.inheritColor, d = t.getShallow("color"), f = t.getShallow("textBorderColor"), p = q(t.getShallow("opacity"), n.opacity);
	(d === "inherit" || d === "auto") && (d = u || null), (f === "inherit" || f === "auto") && (f = u || null), s || (d ||= n.color, f ||= n.textBorderColor), d != null && (e.fill = d), f != null && (e.stroke = f);
	var m = q(t.getShallow("textBorderWidth"), n.textBorderWidth);
	m != null && (e.lineWidth = m);
	var h = q(t.getShallow("textBorderType"), n.textBorderType);
	h != null && (e.lineDash = h);
	var g = q(t.getShallow("textBorderDashOffset"), n.textBorderDashOffset);
	g != null && (e.lineDashOffset = g), !o && p == null && !l && (p = a && a.defaultOpacity), p != null && (e.opacity = p), !o && !s && e.fill == null && a.inheritColor && (e.fill = a.inheritColor);
	for (var _ = 0; _ < bh.length; _++) {
		var v = bh[_], y = i !== !1 && r ? un(t.getShallow(v), r.getShallow(v), n[v]) : q(t.getShallow(v), n[v]);
		y != null && (e[v] = y);
	}
	for (var _ = 0; _ < xh.length; _++) {
		var v = xh[_], y = t.getShallow(v);
		y != null && (e[v] = y);
	}
	if (e.verticalAlign == null) {
		var b = t.getShallow("baseline");
		b != null && (e.verticalAlign = b);
	}
	if (!c || !a.disableBox) {
		for (var _ = 0; _ < Sh.length; _++) {
			var v = Sh[_], y = t.getShallow(v);
			y != null && (e[v] = y);
		}
		var x = t.getShallow("borderType");
		x != null && (e.borderDash = x), (e.backgroundColor === "auto" || e.backgroundColor === "inherit") && u && (e.backgroundColor = u), (e.borderColor === "auto" || e.borderColor === "inherit") && u && (e.borderColor = u);
	}
}
function wh(e, t) {
	var n = t && t.getModel("textStyle");
	return mn([
		e.fontStyle || n && n.getShallow("fontStyle") || "",
		e.fontWeight || n && n.getShallow("fontWeight") || "",
		(e.fontSize || n && n.getShallow("fontSize") || 12) + "px",
		e.fontFamily || n && n.getShallow("fontFamily") || "sans-serif"
	].join(" "));
}
var Th = Z(), Eh = {
	minMargin: 1,
	textMargin: 2
}, Dh = ["textStyle", "color"], Oh = [
	"fontStyle",
	"fontWeight",
	"fontSize",
	"fontFamily",
	"padding",
	"lineHeight",
	"rich",
	"width",
	"height",
	"overflow"
], kh = new od(), Ah = function() {
	function e() {}
	return e.prototype.getTextColor = function(e) {
		var t = this.ecModel;
		return this.getShallow("color") || (!e && t ? t.get(Dh) : null);
	}, e.prototype.getFont = function() {
		return wh({
			fontStyle: this.getShallow("fontStyle"),
			fontWeight: this.getShallow("fontWeight"),
			fontSize: this.getShallow("fontSize"),
			fontFamily: this.getShallow("fontFamily")
		}, this.ecModel);
	}, e.prototype.getTextRect = function(e) {
		for (var t = {
			text: e,
			verticalAlign: this.getShallow("verticalAlign") || this.getShallow("baseline")
		}, n = 0; n < Oh.length; n++) t[Oh[n]] = this.getShallow(Oh[n]);
		return kh.useStyle(t), kh.update(), kh.getBoundingRect();
	}, e;
}(), jh = [
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
], Mh = el(jh), Nh = function() {
	function e() {}
	return e.prototype.getLineStyle = function(e) {
		return Mh(this, e);
	}, e;
}(), Ph = [
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
], Fh = el(Ph), Ih = function() {
	function e() {}
	return e.prototype.getItemStyle = function(e, t) {
		return Fh(this, e, t);
	}, e;
}(), Lh = function() {
	function e(e, t, n) {
		this.parentModel = t, this.ecModel = n, this.option = e;
	}
	return e.prototype.init = function(e, t, n) {}, e.prototype.mergeOption = function(e, t) {
		Vt(this.option, e, !0);
	}, e.prototype.get = function(e, t) {
		return e == null ? this.option : this._doGet(this.parsePath(e), !t && this.parentModel);
	}, e.prototype.getShallow = function(e, t) {
		var n = this.option, r = n == null ? n : n[e];
		if (r == null && !t) {
			var i = this.parentModel;
			i && (r = i.getShallow(e));
		}
		return r;
	}, e.prototype.getModel = function(t, n) {
		var r = t != null, i = r ? this.parsePath(t) : null, a = r ? this._doGet(i) : this.option;
		return n ||= this.parentModel && this.parentModel.getModel(this.resolveParentPath(i)), new e(a, n, this.ecModel);
	}, e.prototype.isEmpty = function() {
		return this.option == null;
	}, e.prototype.restoreData = function() {}, e.prototype.clone = function() {
		var e = this.constructor;
		return new e(z(this.option));
	}, e.prototype.parsePath = function(e) {
		return typeof e == "string" ? e.split(".") : e;
	}, e.prototype.resolveParentPath = function(e) {
		return e;
	}, e.prototype.isAnimationEnabled = function() {
		if (!R.node && this.option) {
			if (this.option.animation != null) return !!this.option.animation;
			if (this.parentModel) return this.parentModel.isAnimationEnabled();
		}
	}, e.prototype._doGet = function(e, t) {
		var n = this.option;
		if (!e) return n;
		for (var r = 0; r < e.length && !(e[r] && (n = n && typeof n == "object" ? n[e[r]] : null, n == null)); r++);
		return n == null && t && (n = t._doGet(this.resolveParentPath(e), t.parentModel)), n;
	}, e;
}();
Kc(Lh), Xc(Lh), Kt(Lh, Nh), Kt(Lh, Ih), Kt(Lh, nl), Kt(Lh, Ah);
// node_modules/echarts/lib/util/component.js
var Rh = Math.round(Math.random() * 10);
function zh(e) {
	return [e || "", Rh++].join("_");
}
function Bh(e) {
	var t = {};
	e.registerSubTypeDefaulter = function(e, n) {
		var r = Uc(e);
		t[r.main] = n;
	}, e.determineSubType = function(n, r) {
		var i = r.type;
		if (!i) {
			var a = Uc(n).main;
			e.hasSubTypes(n) && t[a] && (i = t[a](r));
		}
		return i;
	};
}
function Vh(e, t) {
	e.topologicalTravel = function(e, t, r, i) {
		if (!e.length) return;
		var a = n(t), o = a.graph, s = a.noEntryList, c = {};
		for (V(e, function(e) {
			c[e] = !0;
		}); s.length;) {
			var l = s.pop(), u = o[l], d = !!c[l];
			d && (r.call(i, l, u.originalDeps.slice()), delete c[l]), V(u.successor, d ? p : f);
		}
		V(c, function() {
			throw Error("");
		});
		function f(e) {
			o[e].entryCount--, o[e].entryCount === 0 && s.push(e);
		}
		function p(e) {
			c[e] = !0, f(e);
		}
	};
	function n(e) {
		var n = {}, a = [];
		return V(e, function(o) {
			var s = r(n, o), c = i(s.originalDeps = t(o), e);
			s.entryCount = c.length, s.entryCount === 0 && a.push(o), V(c, function(e) {
				Wt(s.predecessor, e) < 0 && s.predecessor.push(e);
				var t = r(n, e);
				Wt(t.successor, e) < 0 && t.successor.push(o);
			});
		}), {
			graph: n,
			noEntryList: a
		};
	}
	function r(e, t) {
		return e[t] || (e[t] = {
			predecessor: [],
			successor: []
		}), e[t];
	}
	function i(e, t) {
		var n = [];
		return V(e, function(e) {
			Wt(t, e) >= 0 && n.push(e);
		}), n;
	}
}
// node_modules/echarts/lib/i18n/langEN.js
var Hh = {
	time: {
		month: [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		],
		monthAbbr: [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec"
		],
		dayOfWeek: [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday"
		],
		dayOfWeekAbbr: [
			"Sun",
			"Mon",
			"Tue",
			"Wed",
			"Thu",
			"Fri",
			"Sat"
		]
	},
	legend: { selector: {
		all: "All",
		inverse: "Inv"
	} },
	toolbox: {
		brush: { title: {
			rect: "Box Select",
			polygon: "Lasso Select",
			lineX: "Horizontally Select",
			lineY: "Vertically Select",
			keep: "Keep Selections",
			clear: "Clear Selections"
		} },
		dataView: {
			title: "Data View",
			lang: [
				"Data View",
				"Close",
				"Refresh"
			]
		},
		dataZoom: { title: {
			zoom: "Zoom",
			back: "Zoom Reset"
		} },
		magicType: { title: {
			line: "Switch to Line Chart",
			bar: "Switch to Bar Chart",
			stack: "Stack",
			tiled: "Tile"
		} },
		restore: { title: "Restore" },
		saveAsImage: {
			title: "Save as Image",
			lang: ["Right Click to Save Image"]
		}
	},
	series: { typeNames: {
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
	} },
	aria: {
		general: {
			withTitle: "This is a chart about \"{title}\"",
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
}, Uh = {
	time: {
		month: [
			"一月",
			"二月",
			"三月",
			"四月",
			"五月",
			"六月",
			"七月",
			"八月",
			"九月",
			"十月",
			"十一月",
			"十二月"
		],
		monthAbbr: [
			"1月",
			"2月",
			"3月",
			"4月",
			"5月",
			"6月",
			"7月",
			"8月",
			"9月",
			"10月",
			"11月",
			"12月"
		],
		dayOfWeek: [
			"星期日",
			"星期一",
			"星期二",
			"星期三",
			"星期四",
			"星期五",
			"星期六"
		],
		dayOfWeekAbbr: [
			"日",
			"一",
			"二",
			"三",
			"四",
			"五",
			"六"
		]
	},
	legend: { selector: {
		all: "全选",
		inverse: "反选"
	} },
	toolbox: {
		brush: { title: {
			rect: "矩形选择",
			polygon: "圈选",
			lineX: "横向选择",
			lineY: "纵向选择",
			keep: "保持选择",
			clear: "清除选择"
		} },
		dataView: {
			title: "数据视图",
			lang: [
				"数据视图",
				"关闭",
				"刷新"
			]
		},
		dataZoom: { title: {
			zoom: "区域缩放",
			back: "区域缩放还原"
		} },
		magicType: { title: {
			line: "切换为折线图",
			bar: "切换为柱状图",
			stack: "切换为堆叠",
			tiled: "切换为平铺"
		} },
		restore: { title: "还原" },
		saveAsImage: {
			title: "保存为图片",
			lang: ["右键另存为图片"]
		}
	},
	series: { typeNames: {
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
	} },
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
}, Wh = "ZH", Gh = "EN", Kh = Gh, qh = {}, Jh = {}, Yh = R.domSupported ? function() {
	return (document.documentElement.lang || navigator.language || navigator.browserLanguage || Kh).toUpperCase().indexOf(Wh) > -1 ? Wh : Kh;
}() : Kh;
function Xh(e, t) {
	e = e.toUpperCase(), Jh[e] = new Lh(t), qh[e] = t;
}
function Zh(e) {
	if (G(e)) {
		var t = qh[e.toUpperCase()] || {};
		return e === Wh || e === Gh ? z(t) : Vt(z(t), z(qh[Kh]), !1);
	}
	return Vt(z(e), z(qh[Kh]), !1);
}
function Qh(e) {
	return Jh[e];
}
function $h() {
	return Jh[Kh];
}
Xh(Gh, Hh), Xh(Wh, Uh);
// node_modules/echarts/lib/scale/break.js
var eg = null;
function tg() {
	return eg;
}
function ng(e) {
	var t = e.brk;
	return t ? t.hasBreaks() : !1;
}
var rg = {
	year: "{yyyy}",
	month: "{MMM}",
	day: "{d}",
	hour: "{HH}:{mm}",
	minute: "{HH}:{mm}",
	second: "{HH}:{mm}:{ss}",
	millisecond: "{HH}:{mm}:{ss} {SSS}"
}, ig = "{yyyy}-{MM}-{dd}";
ig + "" + rg.hour, ig + "" + rg.minute, ig + "" + rg.second;
function ag(e, t) {
	return e += "", "0000".substr(0, t - e.length) + e;
}
function og(e, t, n, r) {
	var i = Us(e), a = i[sg(n)](), o = i[cg(n)]() + 1, s = Math.floor((o - 1) / 3) + 1, c = i[lg(n)](), l = i["get" + (n ? "UTC" : "") + "Day"](), u = i[ug(n)](), d = (u - 1) % 12 + 1, f = i[dg(n)](), p = i[fg(n)](), m = i[pg(n)](), h = u >= 12 ? "pm" : "am", g = h.toUpperCase(), _ = (r instanceof Lh ? r : Qh(r || Yh) || $h()).getModel("time"), v = _.get("month"), y = _.get("monthAbbr"), b = _.get("dayOfWeek"), x = _.get("dayOfWeekAbbr");
	return (t || "").replace(/{a}/g, h + "").replace(/{A}/g, g + "").replace(/{yyyy}/g, a + "").replace(/{yy}/g, ag(a % 100 + "", 2)).replace(/{Q}/g, s + "").replace(/{MMMM}/g, v[o - 1]).replace(/{MMM}/g, y[o - 1]).replace(/{MM}/g, ag(o, 2)).replace(/{M}/g, o + "").replace(/{dd}/g, ag(c, 2)).replace(/{d}/g, c + "").replace(/{eeee}/g, b[l]).replace(/{ee}/g, x[l]).replace(/{e}/g, l + "").replace(/{HH}/g, ag(u, 2)).replace(/{H}/g, u + "").replace(/{hh}/g, ag(d + "", 2)).replace(/{h}/g, d + "").replace(/{mm}/g, ag(f, 2)).replace(/{m}/g, f + "").replace(/{ss}/g, ag(p, 2)).replace(/{s}/g, p + "").replace(/{SSS}/g, ag(m, 3)).replace(/{S}/g, m + "");
}
function sg(e) {
	return e ? "getUTCFullYear" : "getFullYear";
}
function cg(e) {
	return e ? "getUTCMonth" : "getMonth";
}
function lg(e) {
	return e ? "getUTCDate" : "getDate";
}
function ug(e) {
	return e ? "getUTCHours" : "getHours";
}
function dg(e) {
	return e ? "getUTCMinutes" : "getMinutes";
}
function fg(e) {
	return e ? "getUTCSeconds" : "getSeconds";
}
function pg(e) {
	return e ? "getUTCMilliseconds" : "getMilliseconds";
}
// node_modules/echarts/lib/util/format.js
function mg(e) {
	if (!Gs(e)) return G(e) ? e : "-";
	var t = (e + "").split(".");
	return t[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (t.length > 1 ? "." + t[1] : "");
}
function hg(e, t) {
	return e = (e || "").toLowerCase().replace(/-(.)/g, function(e, t) {
		return t.toUpperCase();
	}), t && e && (e = e.charAt(0).toUpperCase() + e.slice(1)), e;
}
var gg = fn;
function _g(e, t, n) {
	var r = "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}";
	function i(e) {
		return e && mn(e) ? e : "-";
	}
	function a(e) {
		return Ys(e);
	}
	var o = t === "time", s = e instanceof Date;
	if (o || s) {
		var c = o ? Us(e) : e;
		if (!isNaN(+c)) return og(c, r, n);
		if (s) return "-";
	}
	if (t === "ordinal") return en(e) ? i(e) : tn(e) && a(e) ? e + "" : "-";
	var l = Ws(e);
	return a(l) ? mg(l) : en(e) ? i(e) : typeof e == "boolean" ? e + "" : "-";
}
var vg = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g"
], yg = function(e, t) {
	return "{" + e + (t ?? "") + "}";
};
function bg(e, t, n) {
	U(t) || (t = [t]);
	var r = t.length;
	if (!r) return "";
	for (var i = t[0].$vars || [], a = 0; a < i.length; a++) {
		var o = vg[a];
		e = e.replace(yg(o), yg(o, 0));
	}
	for (var s = 0; s < r; s++) for (var c = 0; c < i.length; c++) {
		var l = t[s][i[c]];
		e = e.replace(yg(vg[c], s), n ? sr(l) : l);
	}
	return e;
}
function xg(e, t) {
	var n = G(e) ? {
		color: e,
		extraCssText: t
	} : e || {}, r = n.color, i = n.type;
	t = n.extraCssText;
	var a = n.renderMode || "html";
	return r ? a === "html" ? i === "subItem" ? "<span style=\"display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:" + sr(r) + ";" + (t || "") + "\"></span>" : "<span style=\"display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:" + sr(r) + ";" + (t || "") + "\"></span>" : {
		renderMode: a,
		content: "{" + (n.markerId || "markerX") + "|}  ",
		style: i === "subItem" ? {
			width: 4,
			height: 4,
			borderRadius: 2,
			backgroundColor: r
		} : {
			width: 10,
			height: 10,
			borderRadius: 5,
			backgroundColor: r
		}
	} : "";
}
function Sg(e, t) {
	return t ||= "transparent", G(e) ? e : K(e) && e.colorStops && (e.colorStops[0] || {}).color || t;
}
// node_modules/echarts/lib/core/CoordinateSystem.js
var Cg = {}, wg = {}, Tg = function() {
	function e() {
		this._normalMasterList = [], this._nonSeriesBoxMasterList = [];
	}
	return e.prototype.create = function(e, t) {
		this._nonSeriesBoxMasterList = n(Cg, !0), this._normalMasterList = n(wg, !1);
		function n(n, r) {
			var i = [];
			return V(n, function(n, r) {
				var a = n.create(e, t);
				i = i.concat(a || []);
			}), i;
		}
	}, e.prototype.update = function(e, t) {
		V(this._normalMasterList, function(n) {
			n.update && n.update(e, t);
		});
	}, e.prototype.getCoordinateSystems = function() {
		return this._normalMasterList.concat(this._nonSeriesBoxMasterList);
	}, e.register = function(e, t) {
		e === "matrix" || e === "calendar" ? Cg[e] = t : wg[e] = t;
	}, e.get = function(e) {
		return wg[e] || Cg[e];
	}, e;
}();
function Eg(e) {
	Dg.set(e.fullType, { getCoord2: void 0 }).getCoord2 = e.getCoord2;
}
var Dg = J();
function Og(e) {
	var t = e.getShallow("coord", !0), n = 1;
	if (t == null) {
		var r = Dg.get(e.type);
		r && r.getCoord2 && (n = 2, t = r.getCoord2(e));
	}
	return {
		coord: t,
		from: n
	};
}
// node_modules/echarts/lib/util/layout.js
var kg = V, Ag = [
	"left",
	"right",
	"top",
	"bottom",
	"width",
	"height"
], jg = [[
	"width",
	"left",
	"right"
], [
	"height",
	"top",
	"bottom"
]];
function Mg(e, t, n, r, i) {
	var a = 0, o = 0;
	r ??= Infinity, i ??= Infinity;
	var s = 0;
	t.eachChild(function(c, l) {
		var u = c.getBoundingRect(), d = t.childAt(l + 1), f = d && d.getBoundingRect(), p, m;
		if (e === "horizontal") {
			var h = u.width + (f ? -f.x + u.x : 0);
			p = a + h, p > r || c.newline ? (a = 0, p = h, o += s + n, s = u.height) : s = Math.max(s, u.height);
		} else {
			var g = u.height + (f ? -f.y + u.y : 0);
			m = o + g, m > i || c.newline ? (a += s + n, o = 0, m = g, s = u.width) : s = Math.max(s, u.width);
		}
		c.newline || (c.x = a, c.y = o, c.markRedraw(), e === "horizontal" ? a = p + n : o = m + n);
	});
}
$t(Mg, "vertical"), $t(Mg, "horizontal");
function Ng(e, t) {
	return {
		left: e.getShallow("left", t),
		top: e.getShallow("top", t),
		right: e.getShallow("right", t),
		bottom: e.getShallow("bottom", t),
		width: e.getShallow("width", t),
		height: e.getShallow("height", t)
	};
}
function Pg(e, t) {
	var n = Rg(e, t, { enableLayoutOnlyByCenter: !0 }), r = e.getBoxLayoutParams(), i, a;
	if (n.type === Lg.point) a = n.refPoint, i = Ig(r, {
		width: t.getWidth(),
		height: t.getHeight()
	});
	else {
		var o = e.get("center"), s = U(o) ? o : [o, o];
		i = Ig(r, n.refContainer), a = n.boxCoordFrom === 2 ? n.refPoint : [As(s[0], i.width) + i.x, As(s[1], i.height) + i.y];
	}
	return {
		viewRect: i,
		center: a
	};
}
function Fg(e, t) {
	var n = Pg(e, t), r = n.viewRect, i = n.center, a = e.get("radius");
	U(a) || (a = [0, a]);
	var o = As(r.width, t.getWidth()), s = As(r.height, t.getHeight()), c = Math.min(o, s), l = As(a[0], c / 2), u = As(a[1], c / 2);
	return {
		cx: i[0],
		cy: i[1],
		r0: l,
		r: u,
		viewRect: r
	};
}
function Ig(e, t, n) {
	n = gg(n || 0);
	var r = t.width, i = t.height, a = As(e.left, r), o = As(e.top, i), s = As(e.right, r), c = As(e.bottom, i), l = As(e.width, r), u = As(e.height, i), d = n[2] + n[0], f = n[1] + n[3], p = e.aspect;
	switch (isNaN(l) && (l = r - s - f - a), isNaN(u) && (u = i - c - d - o), p != null && (isNaN(l) && isNaN(u) && (p > r / i ? l = r * .8 : u = i * .8), isNaN(l) && (l = p * u), isNaN(u) && (u = l / p)), isNaN(a) && (a = r - s - l - f), isNaN(o) && (o = i - c - u - d), e.left || e.right) {
		case "center":
			a = r / 2 - l / 2 - n[3];
			break;
		case "right": a = r - l - f;
	}
	switch (e.top || e.bottom) {
		case "middle":
		case "center":
			o = i / 2 - u / 2 - n[0];
			break;
		case "bottom": o = i - u - d;
	}
	a ||= 0, o ||= 0, isNaN(l) && (l = r - f - a - (s || 0)), isNaN(u) && (u = i - d - o - (c || 0));
	var m = new X((t.x || 0) + a + n[3], (t.y || 0) + o + n[0], l, u);
	return m.margin = n, m;
}
var Lg = {
	rect: 1,
	point: 2
};
function Rg(e, t, n) {
	var r, i, a, o = e.boxCoordinateSystem, s;
	if (o) {
		var c = Og(e), l = c.coord, u = c.from;
		if (o.dataToLayout) {
			a = Lg.rect, s = u;
			var d = o.dataToLayout(l);
			r = d.contentRect || d.rect;
		} else n && n.enableLayoutOnlyByCenter && o.dataToPoint && (a = Lg.point, s = u, i = o.dataToPoint(l));
	}
	return a ??= Lg.rect, a === Lg.rect && (r ||= {
		x: 0,
		y: 0,
		width: t.getWidth(),
		height: t.getHeight()
	}, i = [r.x + r.width / 2, r.y + r.height / 2]), {
		type: a,
		refContainer: r,
		refPoint: i,
		boxCoordFrom: s
	};
}
function zg(e) {
	var t = e.layoutMode || e.constructor.layoutMode;
	return K(t) ? t : t ? { type: t } : null;
}
function Bg(e, t, n) {
	var r = n && n.ignoreSize;
	!U(r) && (r = [r, r]);
	var i = o(jg[0], 0), a = o(jg[1], 1);
	c(jg[0], e, i), c(jg[1], e, a);
	function o(n, i) {
		var a = {}, o = 0, c = {}, l = 0, u = 2;
		if (kg(n, function(t) {
			c[t] = e[t];
		}), kg(n, function(e) {
			Tn(t, e) && (a[e] = c[e] = t[e]), s(a, e) && o++, s(c, e) && l++;
		}), r[i]) return s(t, n[1]) ? c[n[2]] = null : s(t, n[2]) && (c[n[1]] = null), c;
		if (l === u || !o) return c;
		if (o >= u) return a;
		for (var d = 0; d < n.length; d++) {
			var f = n[d];
			if (!Tn(a, f) && Tn(e, f)) {
				a[f] = e[f];
				break;
			}
		}
		return a;
	}
	function s(e, t) {
		return e[t] != null && e[t] !== "auto";
	}
	function c(e, t, n) {
		kg(e, function(e) {
			t[e] = n[e];
		});
	}
}
function Vg(e) {
	return Hg({}, e);
}
function Hg(e, t) {
	return t && e && kg(Ag, function(n) {
		Tn(t, n) && (e[n] = t[n]);
	}), e;
}
// node_modules/echarts/lib/model/Component.js
var Ug = Z(), Wg = function(e) {
	L(t, e);
	function t(t, n, r) {
		var i = e.call(this, t, n, r) || this;
		return i.uid = zh("ec_cpt_model"), i;
	}
	return t.prototype.init = function(e, t, n) {
		this.mergeDefaultAndTheme(e, n);
	}, t.prototype.mergeDefaultAndTheme = function(e, t) {
		var n = zg(this), r = n ? Vg(e) : {};
		Vt(e, t.getTheme().get(this.mainType)), Vt(e, this.getDefaultOption()), n && Bg(e, r, n);
	}, t.prototype.mergeOption = function(e, t) {
		Vt(this.option, e, !0);
		var n = zg(this);
		n && Bg(this.option, e, n);
	}, t.prototype.optionUpdated = function(e, t) {}, t.prototype.getDefaultOption = function() {
		var e = this.constructor;
		if (!Gc(e)) return e.defaultOption;
		var t = Ug(this);
		if (!t.defaultOption) {
			for (var n = [], r = e; r;) {
				var i = r.prototype.defaultOption;
				i && n.push(i), r = r.superClass;
			}
			for (var a = {}, o = n.length - 1; o >= 0; o--) a = Vt(a, n[o], !0);
			t.defaultOption = a;
		}
		return t.defaultOption;
	}, t.prototype.getReferringComponents = function(e, t) {
		var n = e + "Index", r = e + "Id";
		return Oc(this.ecModel, e, {
			index: this.get(n, !0),
			id: this.get(r, !0)
		}, t);
	}, t.prototype.getBoxLayoutParams = function() {
		return Ng(this, !1);
	}, t.prototype.getZLevelKey = function() {
		return "";
	}, t.prototype.setZLevel = function(e) {
		this.option.zlevel = e;
	}, t.protoInitialize = function() {
		var e = t.prototype;
		e.type = "component", e.id = "", e.name = "", e.mainType = "", e.subType = "", e.componentIndex = 0;
	}(), t;
}(Lh);
Jc(Wg, Lh), $c(Wg), Bh(Wg), Vh(Wg, Gg);
function Gg(e) {
	var t = [];
	return V(Wg.getClassesByMainType(e), function(e) {
		t = t.concat(e.dependencies || e.prototype.dependencies || []);
	}), t = H(t, function(e) {
		return Uc(e).main;
	}), e !== "dataset" && Wt(t, "dataset") <= 0 && t.unshift("dataset"), t;
}
// node_modules/echarts/lib/visual/tokens.js
var Kg = {
	color: {},
	darkColor: {},
	size: {}
}, qg = Kg.color = {
	theme: [
		"#5070dd",
		"#b6d634",
		"#505372",
		"#ff994d",
		"#0ca8df",
		"#ffd10a",
		"#fb628b",
		"#785db0",
		"#3fbe95"
	],
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
for (var Jg in B(qg, {
	primary: qg.neutral80,
	secondary: qg.neutral70,
	tertiary: qg.neutral60,
	quaternary: qg.neutral50,
	disabled: qg.neutral20,
	border: qg.neutral30,
	borderTint: qg.neutral20,
	borderShade: qg.neutral40,
	background: qg.neutral05,
	backgroundTint: "rgba(234,237,245,0.5)",
	backgroundTransparent: "rgba(255,255,255,0)",
	backgroundShade: qg.neutral10,
	shadow: "rgba(0,0,0,0.2)",
	shadowTint: "rgba(129,130,136,0.2)",
	axisLine: qg.neutral70,
	axisLineTint: qg.neutral40,
	axisTick: qg.neutral70,
	axisTickMinor: qg.neutral60,
	axisLabel: qg.neutral70,
	axisSplitLine: qg.neutral15,
	axisMinorSplitLine: qg.neutral05
}), qg) if (qg.hasOwnProperty(Jg)) {
	var Yg = qg[Jg];
	Jg === "theme" ? Kg.darkColor.theme = qg.theme.slice() : Jg === "highlight" ? Kg.darkColor.highlight = "rgba(255,231,130,0.4)" : Jg.indexOf("accent") === 0 ? Kg.darkColor[Jg] = va(Yg, null, function(e) {
		return e * .5;
	}, function(e) {
		return Math.min(1, 1.3 - e);
	}) : Kg.darkColor[Jg] = va(Yg, null, function(e) {
		return e * .9;
	}, function(e) {
		return 1 - e ** 1.5;
	});
}
Kg.size = {
	xxs: 2,
	xs: 5,
	s: 10,
	m: 15,
	l: 20,
	xl: 30,
	xxl: 40,
	xxxl: 50
};
// node_modules/echarts/lib/model/globalDefault.js
var Xg = "";
typeof navigator < "u" && (Xg = navigator.platform || "");
var Zg = "rgba(0, 0, 0, 0.2)", Qg = Kg.color.theme[0], $g = va(Qg, null, null, .9), e_ = {
	darkMode: "auto",
	colorBy: "series",
	color: Kg.color.theme,
	gradientColor: [$g, Qg],
	aria: { decal: { decals: [
		{
			color: Zg,
			dashArrayX: [1, 0],
			dashArrayY: [2, 5],
			symbolSize: 1,
			rotation: Math.PI / 6
		},
		{
			color: Zg,
			symbol: "circle",
			dashArrayX: [[8, 8], [
				0,
				8,
				8,
				0
			]],
			dashArrayY: [6, 0],
			symbolSize: .8
		},
		{
			color: Zg,
			dashArrayX: [1, 0],
			dashArrayY: [4, 3],
			rotation: -Math.PI / 4
		},
		{
			color: Zg,
			dashArrayX: [[6, 6], [
				0,
				6,
				6,
				0
			]],
			dashArrayY: [6, 0]
		},
		{
			color: Zg,
			dashArrayX: [[1, 0], [1, 6]],
			dashArrayY: [
				1,
				0,
				6,
				0
			],
			rotation: Math.PI / 4
		},
		{
			color: Zg,
			symbol: "triangle",
			dashArrayX: [[9, 9], [
				0,
				9,
				9,
				0
			]],
			dashArrayY: [7, 2],
			symbolSize: .75
		}
	] } },
	textStyle: {
		fontFamily: Xg.match(/^Win/) ? "Microsoft YaHei" : "sans-serif",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal"
	},
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
	progressiveThreshold: 3e3,
	progressive: 400,
	hoverLayerThreshold: 3e3,
	useUTC: !1
}, t_ = {
	Must: 1,
	Might: 2,
	Not: 3
}, n_ = Z();
function r_(e) {
	n_(e).datasetMap = J();
}
function i_(e, t, n) {
	var r = {};
	if (!a_(e)) return r;
	var i = t.sourceFormat, a = t.dimensionsDefine, o;
	(i === "objectRows" || i === "keyedColumns") && V(a, function(e, t) {
		(K(e) ? e.name : e) === "name" && (o = t);
	});
	var s = function() {
		for (var e = {}, r = {}, s = [], c = 0, l = Math.min(5, n); c < l; c++) {
			var u = c_(t.data, i, t.seriesLayoutBy, a, t.startIndex, c);
			s.push(u);
			var d = u === t_.Not;
			if (d && e.v == null && c !== o && (e.v = c), (e.n == null || e.n === e.v || !d && s[e.n] === t_.Not) && (e.n = c), f(e) && s[e.n] !== t_.Not) return e;
			d || (u === t_.Might && r.v == null && c !== o && (r.v = c), (r.n == null || r.n === r.v) && (r.n = c));
		}
		function f(e) {
			return e.v != null && e.n != null;
		}
		return f(e) ? e : f(r) ? r : null;
	}();
	if (s) {
		r.value = [s.v];
		var c = o ?? s.n;
		r.itemName = [c], r.seriesName = [c];
	}
	return r;
}
function a_(e) {
	if (!e.get("data", !0)) return Oc(e.ecModel, "dataset", {
		index: e.get("datasetIndex", !0),
		id: e.get("datasetId", !0)
	}, Dc).models[0];
}
function o_(e) {
	return !e.get("transform", !0) && !e.get("fromTransformResult", !0) ? [] : Oc(e.ecModel, "dataset", {
		index: e.get("fromDatasetIndex", !0),
		id: e.get("fromDatasetId", !0)
	}, Dc).models;
}
function s_(e, t) {
	return c_(e.data, e.sourceFormat, e.seriesLayoutBy, e.dimensionsDefine, e.startIndex, t);
}
function c_(e, t, n, r, i, a) {
	var o, s = 5;
	if (rn(e)) return t_.Not;
	var c, l;
	if (r) {
		var u = r[a];
		K(u) ? (c = u.name, l = u.type) : G(u) && (c = u);
	}
	if (l != null) return l === "ordinal" ? t_.Must : t_.Not;
	if (t === "arrayRows") {
		var d = e;
		if (n === "row") {
			for (var f = d[a], p = 0; p < (f || []).length && p < s; p++) if ((o = b(f[i + p])) != null) return o;
		} else for (var p = 0; p < d.length && p < s; p++) {
			var m = d[i + p];
			if (m && (o = b(m[a])) != null) return o;
		}
	} else if (t === "objectRows") {
		var h = e;
		if (!c) return t_.Not;
		for (var p = 0; p < h.length && p < s; p++) {
			var g = h[p];
			if (g && (o = b(g[c])) != null) return o;
		}
	} else if (t === "keyedColumns") {
		var _ = e;
		if (!c) return t_.Not;
		var f = _[c];
		if (!f || rn(f)) return t_.Not;
		for (var p = 0; p < f.length && p < s; p++) if ((o = b(f[p])) != null) return o;
	} else if (t === "original") for (var v = e, p = 0; p < v.length && p < s; p++) {
		var g = v[p], y = sc(g);
		if (!U(y)) return t_.Not;
		if ((o = b(y[a])) != null) return o;
	}
	function b(e) {
		var t = G(e);
		if (e != null && isFinite(Number(e)) && e !== "") return t ? t_.Might : t_.Not;
		if (t && e !== "-") return t_.Must;
	}
	return t_.Not;
}
// node_modules/echarts/lib/model/internalComponentCreator.js
var l_ = J();
function u_(e, t, n) {
	var r = l_.get(t);
	if (!r) return n;
	var i = r(e);
	return i ? n.concat(i) : n;
}
// node_modules/echarts/lib/model/mixin/palette.js
var d_ = Z();
Z();
var f_ = function() {
	function e() {}
	return e.prototype.getColorFromPalette = function(e, t, n) {
		var r = ic(this.get("color", !0)), i = this.get("colorLayer", !0);
		return m_(this, d_, r, i, e, t, n);
	}, e.prototype.clearColorPalette = function() {
		h_(this, d_);
	}, e;
}();
function p_(e, t) {
	for (var n = e.length, r = 0; r < n; r++) if (e[r].length > t) return e[r];
	return e[n - 1];
}
function m_(e, t, n, r, i, a, o) {
	a ||= e;
	var s = t(a), c = s.paletteIdx || 0, l = s.paletteNameMap = s.paletteNameMap || {};
	if (l.hasOwnProperty(i)) return l[i];
	var u = o == null || !r ? n : p_(r, o);
	if (u ||= n, u && u.length) {
		var d = u[c];
		return i && (l[i] = d), s.paletteIdx = (c + 1) % u.length, d;
	}
}
function h_(e, t) {
	t(e).paletteIdx = 0, t(e).paletteNameMap = {};
}
// node_modules/echarts/lib/model/Global.js
var g_, __, v_, y_ = "\0_ec_inner", b_ = 1, x_ = function(e) {
	L(t, e);
	function t() {
		return e !== null && e.apply(this, arguments) || this;
	}
	return t.prototype.init = function(e, t, n, r, i, a) {
		r ||= {}, this.option = null, this._theme = new Lh(r), this._locale = new Lh(i), this._optionManager = a;
	}, t.prototype.setOption = function(e, t, n) {
		var r = E_(t);
		this._optionManager.setOption(e, n, r), this._resetOption(null, r);
	}, t.prototype.resetOption = function(e, t) {
		return this._resetOption(e, E_(t));
	}, t.prototype._resetOption = function(e, t) {
		var n = !1, r = this._optionManager;
		if (!e || e === "recreate") {
			var i = r.mountOption(e === "recreate");
			!this.option || e === "recreate" ? v_(this, i) : (this.restoreData(), this._mergeOption(i, t)), n = !0;
		}
		if ((e === "timeline" || e === "media") && this.restoreData(), !e || e === "recreate" || e === "timeline") {
			var a = r.getTimelineOption(this);
			a && (n = !0, this._mergeOption(a, t));
		}
		if (!e || e === "recreate" || e === "media") {
			var o = r.getMediaOption(this);
			o.length && V(o, function(e) {
				n = !0, this._mergeOption(e, t);
			}, this);
		}
		return n;
	}, t.prototype.mergeOption = function(e) {
		this._mergeOption(e, null);
	}, t.prototype._mergeOption = function(e, t) {
		var n = this.option, r = this._componentsMap, i = this._componentsCount, a = [], o = J(), s = t && t.replaceMergeMainTypeMap;
		r_(this), V(e, function(e, t) {
			e != null && (Wg.hasClass(t) ? t && (a.push(t), o.set(t, !0)) : n[t] = n[t] == null ? z(e) : Vt(n[t], e, !0));
		}), s && s.each(function(e, t) {
			Wg.hasClass(t) && !o.get(t) && (a.push(t), o.set(t, !0));
		}), Wg.topologicalTravel(a, Wg.getAllClassMainTypes(), c, this);
		function c(t) {
			var a = u_(this, t, ic(e[t])), o = r.get(t), c = lc(o, a, o ? s && s.get(t) ? "replaceMerge" : "normalMerge" : "replaceAll");
			xc(c, t, Wg), n[t] = null, r.set(t, null), i.set(t, 0);
			var l = [], u = [], d = 0, f;
			V(c, function(e, n) {
				var r = e.existing, i = e.newOption;
				if (!i) r && (r.mergeOption({}, this), r.optionUpdated({}, !1));
				else {
					var a = t === "series", o = Wg.getClass(t, e.keyInfo.subType, !a);
					if (!o) return;
					if (t === "tooltip") {
						if (f) return;
						f = !0;
					}
					if (r && r.constructor === o) r.name = e.keyInfo.name, r.mergeOption(i, this), r.optionUpdated(i, !1);
					else {
						var s = B({ componentIndex: n }, e.keyInfo);
						r = new o(i, this, this, s), B(r, s), e.brandNew && (r.__requireNewView = !0), r.init(i, this, this), r.optionUpdated(null, !0);
					}
				}
				r ? (l.push(r.option), u.push(r), d++) : (l.push(void 0), u.push(void 0));
			}, this), n[t] = l, r.set(t, u), i.set(t, d), t === "series" && g_(this);
		}
		this._seriesIndices || g_(this);
	}, t.prototype.getOption = function() {
		var e = z(this.option);
		return V(e, function(t, n) {
			if (Wg.hasClass(n)) {
				for (var r = ic(t), i = r.length, a = !1, o = i - 1; o >= 0; o--) r[o] && !bc(r[o]) ? a = !0 : (r[o] = null, !a && i--);
				r.length = i, e[n] = r;
			}
		}), delete e[y_], e;
	}, t.prototype.setTheme = function(e) {
		this._theme = new Lh(e), this._resetOption("recreate", null);
	}, t.prototype.getTheme = function() {
		return this._theme;
	}, t.prototype.getLocaleModel = function() {
		return this._locale;
	}, t.prototype.setUpdatePayload = function(e) {
		this._payload = e;
	}, t.prototype.getUpdatePayload = function() {
		return this._payload;
	}, t.prototype.getComponent = function(e, t) {
		var n = this._componentsMap.get(e);
		if (n) {
			var r = n[t || 0];
			if (r) return r;
			if (t == null) {
				for (var i = 0; i < n.length; i++) if (n[i]) return n[i];
			}
		}
	}, t.prototype.queryComponents = function(e) {
		var t = e.mainType;
		if (!t) return [];
		var n = e.index, r = e.id, i = e.name, a = this._componentsMap.get(t);
		if (!a || !a.length) return [];
		var o;
		return n == null ? o = r == null ? i == null ? Yt(a, function(e) {
			return !!e;
		}) : w_("name", i, a) : w_("id", r, a) : (o = [], V(ic(n), function(e) {
			a[e] && o.push(a[e]);
		})), T_(o, e);
	}, t.prototype.findComponents = function(e) {
		var t = e.query, n = e.mainType, r = i(t);
		return a(T_(r ? this.queryComponents(r) : Yt(this._componentsMap.get(n), function(e) {
			return !!e;
		}), e));
		function i(e) {
			var t = n + "Index", r = n + "Id", i = n + "Name";
			return e && (e[t] != null || e[r] != null || e[i] != null) ? {
				mainType: n,
				index: e[t],
				id: e[r],
				name: e[i]
			} : null;
		}
		function a(t) {
			return e.filter ? Yt(t, e.filter) : t;
		}
	}, t.prototype.eachComponent = function(e, t, n) {
		var r = this._componentsMap;
		if (W(e)) {
			var i = t, a = e;
			r.each(function(e, t) {
				for (var n = 0; e && n < e.length; n++) {
					var r = e[n];
					r && a.call(i, t, r, r.componentIndex);
				}
			});
		} else for (var o = G(e) ? r.get(e) : K(e) ? this.findComponents(e) : null, s = 0; o && s < o.length; s++) {
			var c = o[s];
			c && t.call(n, c, c.componentIndex);
		}
	}, t.prototype.getSeriesByName = function(e) {
		var t = vc(e, null);
		return Yt(this._componentsMap.get("series"), function(e) {
			return !!e && t != null && e.name === t;
		});
	}, t.prototype.getSeriesByIndex = function(e) {
		return this._componentsMap.get("series")[e];
	}, t.prototype.getSeriesByType = function(e) {
		return Yt(this._componentsMap.get("series"), function(t) {
			return !!t && t.subType === e;
		});
	}, t.prototype.getSeries = function() {
		return Yt(this._componentsMap.get("series"), function(e) {
			return !!e;
		});
	}, t.prototype.getSeriesCount = function() {
		return this._componentsCount.get("series");
	}, t.prototype.eachSeries = function(e, t) {
		__(this), V(this._seriesIndices, function(n) {
			var r = this._componentsMap.get("series")[n];
			e.call(t, r, n);
		}, this);
	}, t.prototype.eachRawSeries = function(e, t) {
		V(this._componentsMap.get("series"), function(n) {
			n && e.call(t, n, n.componentIndex);
		});
	}, t.prototype.eachSeriesByType = function(e, t, n) {
		__(this), V(this._seriesIndices, function(r) {
			var i = this._componentsMap.get("series")[r];
			i.subType === e && t.call(n, i, r);
		}, this);
	}, t.prototype.eachRawSeriesByType = function(e, t, n) {
		return V(this.getSeriesByType(e), t, n);
	}, t.prototype.isSeriesFiltered = function(e) {
		return __(this), this._seriesIndicesMap.get(e.componentIndex) == null;
	}, t.prototype.getCurrentSeriesIndices = function() {
		return (this._seriesIndices || []).slice();
	}, t.prototype.filterSeries = function(e, t) {
		__(this);
		var n = [];
		V(this._seriesIndices, function(r) {
			var i = this._componentsMap.get("series")[r];
			e.call(t, i, r) && n.push(r);
		}, this), this._seriesIndices = n, this._seriesIndicesMap = J(n);
	}, t.prototype.restoreData = function(e) {
		g_(this);
		var t = this._componentsMap, n = [];
		t.each(function(e, t) {
			Wg.hasClass(t) && n.push(t);
		}), Wg.topologicalTravel(n, Wg.getAllClassMainTypes(), function(n) {
			V(t.get(n), function(t) {
				t && (n !== "series" || !S_(t, e)) && t.restoreData();
			});
		});
	}, t.internalField = function() {
		g_ = function(e) {
			var t = e._seriesIndices = [];
			V(e._componentsMap.get("series"), function(e) {
				e && t.push(e.componentIndex);
			}), e._seriesIndicesMap = J(t);
		}, __ = function(e) {}, v_ = function(e, t) {
			e.option = {}, e.option[y_] = b_, e._componentsMap = J({ series: [] }), e._componentsCount = J();
			var n = t.aria;
			K(n) && n.enabled == null && (n.enabled = !0), C_(t, e._theme.option), Vt(t, e_, !1), e._mergeOption(t, null);
		};
	}(), t;
}(Lh);
function S_(e, t) {
	if (t) {
		var n = t.seriesIndex, r = t.seriesId, i = t.seriesName;
		return n != null && e.componentIndex !== n || r != null && e.id !== r || i != null && e.name !== i;
	}
}
function C_(e, t) {
	var n = e.color && !e.colorLayer;
	V(t, function(t, r) {
		r === "colorLayer" && n || r === "color" && e.color || Wg.hasClass(r) || (typeof t == "object" ? e[r] = e[r] ? Vt(e[r], t, !1) : z(t) : e[r] ?? (e[r] = t));
	});
}
function w_(e, t, n) {
	if (U(t)) {
		var r = J();
		return V(t, function(e) {
			e != null && vc(e, null) != null && r.set(e, !0);
		}), Yt(n, function(t) {
			return t && r.get(t[e]);
		});
	}
	var i = vc(t, null);
	return Yt(n, function(t) {
		return t && i != null && t[e] === i;
	});
}
function T_(e, t) {
	return t.hasOwnProperty("subType") ? Yt(e, function(e) {
		return e && e.subType === t.subType;
	}) : e;
}
function E_(e) {
	var t = J();
	return e && V(ic(e.replaceMerge), function(e) {
		t.set(e, !0);
	}), { replaceMergeMainTypeMap: t };
}
Kt(x_, f_);
// node_modules/echarts/lib/model/OptionManager.js
var D_ = /^(min|max)?(.+)$/, O_ = function() {
	function e(e) {
		this._timelineOptions = [], this._mediaList = [], this._currentMediaIndices = [], this._api = e;
	}
	return e.prototype.setOption = function(e, t, n) {
		e && (V(ic(e.series), function(e) {
			e && e.data && rn(e.data) && gn(e.data);
		}), V(ic(e.dataset), function(e) {
			e && e.source && rn(e.source) && gn(e.source);
		})), e = z(e);
		var r = this._optionBackup, i = k_(e, t, !r);
		this._newBaseOption = i.baseOption, r ? (i.timelineOptions.length && (r.timelineOptions = i.timelineOptions), i.mediaList.length && (r.mediaList = i.mediaList), i.mediaDefault && (r.mediaDefault = i.mediaDefault)) : this._optionBackup = i;
	}, e.prototype.mountOption = function(e) {
		var t = this._optionBackup;
		return this._timelineOptions = t.timelineOptions, this._mediaList = t.mediaList, this._mediaDefault = t.mediaDefault, this._currentMediaIndices = [], z(e ? t.baseOption : this._newBaseOption);
	}, e.prototype.getTimelineOption = function(e) {
		var t, n = this._timelineOptions;
		if (n.length) {
			var r = e.getComponent("timeline");
			r && (t = z(n[r.getCurrentIndex()]));
		}
		return t;
	}, e.prototype.getMediaOption = function(e) {
		var t = this._api.getWidth(), n = this._api.getHeight(), r = this._mediaList, i = this._mediaDefault, a = [], o = [];
		if (!r.length && !i) return o;
		for (var s = 0, c = r.length; s < c; s++) A_(r[s].query, t, n) && a.push(s);
		return !a.length && i && (a = [-1]), a.length && !M_(a, this._currentMediaIndices) && (o = H(a, function(e) {
			return z(e === -1 ? i.option : r[e].option);
		})), this._currentMediaIndices = a, o;
	}, e;
}();
function k_(e, t, n) {
	var r = [], i, a, o = e.baseOption, s = e.timeline, c = e.options, l = e.media, u = !!e.media, d = !!(c || s || o && o.timeline);
	o ? (a = o, a.timeline || (a.timeline = s)) : ((d || u) && (e.options = e.media = null), a = e), u && U(l) && V(l, function(e) {
		e && e.option && (e.query ? r.push(e) : i ||= e);
	}), f(a), V(c, function(e) {
		return f(e);
	}), V(r, function(e) {
		return f(e.option);
	});
	function f(e) {
		V(t, function(t) {
			t(e, n);
		});
	}
	return {
		baseOption: a,
		timelineOptions: c || [],
		mediaDefault: i,
		mediaList: r
	};
}
function A_(e, t, n) {
	var r = {
		width: t,
		height: n,
		aspectratio: t / n
	}, i = !0;
	return V(e, function(e, t) {
		var n = t.match(D_);
		if (n && n[1] && n[2]) {
			var a = n[1];
			j_(r[n[2].toLowerCase()], e, a) || (i = !1);
		}
	}), i;
}
function j_(e, t, n) {
	return n === "min" ? e >= t : n === "max" ? e <= t : e === t;
}
function M_(e, t) {
	return e.join(",") === t.join(",");
}
// node_modules/echarts/lib/preprocessor/helper/compatStyle.js
var N_ = V, P_ = K, F_ = [
	"areaStyle",
	"lineStyle",
	"nodeStyle",
	"linkStyle",
	"chordStyle",
	"label",
	"labelLine"
];
function I_(e) {
	var t = e && e.itemStyle;
	if (t) for (var n = 0, r = F_.length; n < r; n++) {
		var i = F_[n], a = t.normal, o = t.emphasis;
		a && a[i] && (e[i] = e[i] || {}, e[i].normal ? Vt(e[i].normal, a[i]) : e[i].normal = a[i], a[i] = null), o && o[i] && (e[i] = e[i] || {}, e[i].emphasis ? Vt(e[i].emphasis, o[i]) : e[i].emphasis = o[i], o[i] = null);
	}
}
function L_(e, t, n) {
	if (e && e[t] && (e[t].normal || e[t].emphasis)) {
		var r = e[t].normal, i = e[t].emphasis;
		r && (n ? (e[t].normal = e[t].emphasis = null, Ut(e[t], r)) : e[t] = r), i && (e.emphasis = e.emphasis || {}, e.emphasis[t] = i, i.focus && (e.emphasis.focus = i.focus), i.blurScope && (e.emphasis.blurScope = i.blurScope));
	}
}
function R_(e) {
	L_(e, "itemStyle"), L_(e, "lineStyle"), L_(e, "areaStyle"), L_(e, "label"), L_(e, "labelLine"), L_(e, "upperLabel"), L_(e, "edgeLabel");
}
function z_(e, t) {
	var n = P_(e) && e[t], r = P_(n) && n.textStyle;
	if (r) for (var i = 0, a = oc.length; i < a; i++) {
		var o = oc[i];
		r.hasOwnProperty(o) && (n[o] = r[o]);
	}
}
function B_(e) {
	e && (R_(e), z_(e, "label"), e.emphasis && z_(e.emphasis, "label"));
}
function V_(e) {
	if (P_(e)) {
		I_(e), R_(e), z_(e, "label"), z_(e, "upperLabel"), z_(e, "edgeLabel"), e.emphasis && (z_(e.emphasis, "label"), z_(e.emphasis, "upperLabel"), z_(e.emphasis, "edgeLabel"));
		var t = e.markPoint;
		t && (I_(t), B_(t));
		var n = e.markLine;
		n && (I_(n), B_(n));
		var r = e.markArea;
		r && B_(r);
		var i = e.data;
		if (e.type === "graph") {
			i ||= e.nodes;
			var a = e.links || e.edges;
			if (a && !rn(a)) for (var o = 0; o < a.length; o++) B_(a[o]);
			V(e.categories, function(e) {
				R_(e);
			});
		}
		if (i && !rn(i)) for (var o = 0; o < i.length; o++) B_(i[o]);
		if (t = e.markPoint, t && t.data) for (var s = t.data, o = 0; o < s.length; o++) B_(s[o]);
		if (n = e.markLine, n && n.data) for (var c = n.data, o = 0; o < c.length; o++) U(c[o]) ? (B_(c[o][0]), B_(c[o][1])) : B_(c[o]);
		e.type === "gauge" ? (z_(e, "axisLabel"), z_(e, "title"), z_(e, "detail")) : e.type === "treemap" ? (L_(e.breadcrumb, "itemStyle"), V(e.levels, function(e) {
			R_(e);
		})) : e.type === "tree" && R_(e.leaves);
	}
}
function H_(e) {
	return U(e) ? e : e ? [e] : [];
}
function U_(e) {
	return (U(e) ? e[0] : e) || {};
}
function W_(e, t) {
	N_(H_(e.series), function(e) {
		P_(e) && V_(e);
	});
	var n = [
		"xAxis",
		"yAxis",
		"radiusAxis",
		"angleAxis",
		"singleAxis",
		"parallelAxis",
		"radar"
	];
	t && n.push("valueAxis", "categoryAxis", "logAxis", "timeAxis"), N_(n, function(t) {
		N_(H_(e[t]), function(e) {
			e && (z_(e, "axisLabel"), z_(e.axisPointer, "label"));
		});
	}), N_(H_(e.parallel), function(e) {
		var t = e && e.parallelAxisDefault;
		z_(t, "axisLabel"), z_(t && t.axisPointer, "label");
	}), N_(H_(e.calendar), function(e) {
		L_(e, "itemStyle"), z_(e, "dayLabel"), z_(e, "monthLabel"), z_(e, "yearLabel");
	}), N_(H_(e.radar), function(e) {
		z_(e, "name"), e.name && e.axisName == null && (e.axisName = e.name, delete e.name), e.nameGap != null && e.axisNameGap == null && (e.axisNameGap = e.nameGap, delete e.nameGap);
	}), N_(H_(e.geo), function(e) {
		P_(e) && (B_(e), N_(H_(e.regions), function(e) {
			B_(e);
		}));
	}), N_(H_(e.timeline), function(e) {
		B_(e), L_(e, "label"), L_(e, "itemStyle"), L_(e, "controlStyle", !0);
		var t = e.data;
		U(t) && V(t, function(e) {
			K(e) && (L_(e, "label"), L_(e, "itemStyle"));
		});
	}), N_(H_(e.toolbox), function(e) {
		L_(e, "iconStyle"), N_(e.feature, function(e) {
			L_(e, "iconStyle");
		});
	}), z_(U_(e.axisPointer), "label"), z_(U_(e.tooltip).axisPointer, "label");
}
// node_modules/echarts/lib/preprocessor/backwardCompat.js
function G_(e, t) {
	for (var n = t.split(","), r = e, i = 0; i < n.length && (r &&= r[n[i]], r != null); i++);
	return r;
}
function K_(e, t, n, r) {
	for (var i = t.split(","), a = e, o, s = 0; s < i.length - 1; s++) o = i[s], a[o] ?? (a[o] = {}), a = a[o];
	(r || a[i[s]] == null) && (a[i[s]] = n);
}
function q_(e) {
	e && V(J_, function(t) {
		t[0] in e && !(t[1] in e) && (e[t[1]] = e[t[0]]);
	});
}
var J_ = [
	["x", "left"],
	["y", "top"],
	["x2", "right"],
	["y2", "bottom"]
], Y_ = [
	"grid",
	"geo",
	"parallel",
	"legend",
	"toolbox",
	"title",
	"visualMap",
	"dataZoom",
	"timeline"
], X_ = [
	["borderRadius", "barBorderRadius"],
	["borderColor", "barBorderColor"],
	["borderWidth", "barBorderWidth"]
];
function Z_(e) {
	var t = e && e.itemStyle;
	if (t) for (var n = 0; n < X_.length; n++) {
		var r = X_[n][1], i = X_[n][0];
		t[r] != null && (t[i] = t[r]);
	}
}
function Q_(e) {
	e && e.alignTo === "edge" && e.margin != null && e.edgeDistance == null && (e.edgeDistance = e.margin);
}
function $_(e) {
	e && e.downplay && !e.blur && (e.blur = e.downplay);
}
function ev(e) {
	e && e.focusNodeAdjacency != null && (e.emphasis = e.emphasis || {}, e.emphasis.focus ?? (e.emphasis.focus = "adjacency"));
}
function tv(e, t) {
	if (e) for (var n = 0; n < e.length; n++) t(e[n]), e[n] && tv(e[n].children, t);
}
function nv(e, t) {
	W_(e, t), e.series = ic(e.series), V(e.series, function(e) {
		if (K(e)) {
			var t = e.type;
			if (t === "line") e.clipOverflow != null && (e.clip = e.clipOverflow);
			else if (t === "pie" || t === "gauge") {
				e.clockWise != null && (e.clockwise = e.clockWise), Q_(e.label);
				var n = e.data;
				if (n && !rn(n)) for (var r = 0; r < n.length; r++) Q_(n[r]);
				e.hoverOffset != null && (e.emphasis = e.emphasis || {}, (e.emphasis.scaleSize = null) && (e.emphasis.scaleSize = e.hoverOffset));
			} else if (t === "gauge") {
				var i = G_(e, "pointer.color");
				i != null && K_(e, "itemStyle.color", i);
			} else if (t === "bar") {
				Z_(e), Z_(e.backgroundStyle), Z_(e.emphasis);
				var n = e.data;
				if (n && !rn(n)) for (var r = 0; r < n.length; r++) typeof n[r] == "object" && (Z_(n[r]), Z_(n[r] && n[r].emphasis));
			} else if (t === "sunburst") {
				var a = e.highlightPolicy;
				a && (e.emphasis = e.emphasis || {}, e.emphasis.focus || (e.emphasis.focus = a)), $_(e), tv(e.data, $_);
			} else t === "graph" || t === "sankey" ? ev(e) : t === "map" && (e.mapType && !e.map && (e.map = e.mapType), e.mapLocation && Ut(e, e.mapLocation));
			e.hoverAnimation != null && (e.emphasis = e.emphasis || {}, e.emphasis && e.emphasis.scale == null && (e.emphasis.scale = e.hoverAnimation)), q_(e);
		}
	}), e.dataRange && (e.visualMap = e.dataRange), V(Y_, function(t) {
		var n = e[t];
		n && (U(n) || (n = [n]), V(n, function(e) {
			q_(e);
		}));
	});
}
// node_modules/echarts/lib/processor/dataStack.js
var rv = zc(iv);
function iv(e) {
	var t = J();
	e.eachSeries(function(e) {
		var n = e.get("stack");
		if (n) {
			var r = t.get(n) || t.set(n, []), i = e.getData(), a = {
				stackResultDimension: i.getCalculationInfo("stackResultDimension"),
				stackedOverDimension: i.getCalculationInfo("stackedOverDimension"),
				stackedDimension: i.getCalculationInfo("stackedDimension"),
				stackedByDimension: i.getCalculationInfo("stackedByDimension"),
				isStackedByIndex: i.getCalculationInfo("isStackedByIndex"),
				data: i,
				seriesModel: e
			};
			if (!a.stackedDimension || !(a.isStackedByIndex || a.stackedByDimension)) return;
			r.push(a);
		}
	}), t.each(function(e) {
		e.length !== 0 && ((e[0].seriesModel.get("stackOrder") || "seriesAsc") === "seriesDesc" && e.reverse(), V(e, function(t, n) {
			t.data.setCalculationInfo("stackedOnSeries", n > 0 ? e[n - 1].seriesModel : null);
		}), av(e));
	});
}
function av(e) {
	V(e, function(t, n) {
		var r = [], i = [NaN, NaN], a = [t.stackResultDimension, t.stackedOverDimension], o = t.data, s = t.isStackedByIndex, c = t.seriesModel.get("stackStrategy") || "samesign";
		o.modify(a, function(a, l, u) {
			var d = o.get(t.stackedDimension, u);
			if (isNaN(d)) return i;
			var f, p;
			s ? p = o.getRawIndex(u) : f = o.get(t.stackedByDimension, u);
			for (var m = NaN, h = n - 1; h >= 0; h--) {
				var g = e[h];
				if (s || (p = g.data.rawIndexOf(g.stackedByDimension, f)), p >= 0) {
					var _ = g.data.getByRawIndex(g.stackResultDimension, p);
					if (c === "all" || c === "positive" && _ > 0 || c === "negative" && _ < 0 || c === "samesign" && d >= 0 && _ > 0 || c === "samesign" && d <= 0 && _ < 0) {
						d = zs(d, _), m = _;
						break;
					}
				}
			}
			return r[0] = d, r[1] = m, r;
		});
	});
}
// node_modules/echarts/lib/data/Source.js
var ov = function() {
	function e(e) {
		this.data = e.data || (e.sourceFormat === "keyedColumns" ? {} : []), this.sourceFormat = e.sourceFormat || "unknown", this.seriesLayoutBy = e.seriesLayoutBy || "column", this.startIndex = e.startIndex || 0, this.dimensionsDetectedCount = e.dimensionsDetectedCount, this.metaRawOption = e.metaRawOption;
		var t = this.dimensionsDefine = e.dimensionsDefine;
		if (t) for (var n = 0; n < t.length; n++) {
			var r = t[n];
			r.type == null && s_(this, n) === t_.Must && (r.type = "ordinal");
		}
	}
	return e;
}();
function sv(e) {
	return e instanceof ov;
}
function cv(e, t, n) {
	n ||= dv(e);
	var r = t.seriesLayoutBy, i = fv(e, n, r, t.sourceHeader, t.dimensions);
	return new ov({
		data: e,
		sourceFormat: n,
		seriesLayoutBy: r,
		dimensionsDefine: i.dimensionsDefine,
		startIndex: i.startIndex,
		dimensionsDetectedCount: i.dimensionsDetectedCount,
		metaRawOption: z(t)
	});
}
function lv(e) {
	return new ov({
		data: e,
		sourceFormat: rn(e) ? Dd : Cd
	});
}
function uv(e) {
	return new ov({
		data: e.data,
		sourceFormat: e.sourceFormat,
		seriesLayoutBy: e.seriesLayoutBy,
		dimensionsDefine: z(e.dimensionsDefine),
		startIndex: e.startIndex,
		dimensionsDetectedCount: e.dimensionsDetectedCount
	});
}
function dv(e) {
	var t = Od;
	if (rn(e)) t = Dd;
	else if (U(e)) {
		e.length === 0 && (t = wd);
		for (var n = 0, r = e.length; n < r; n++) {
			var i = e[n];
			if (i != null) {
				if (U(i) || rn(i)) {
					t = wd;
					break;
				}
				if (K(i)) {
					t = Td;
					break;
				}
			}
		}
	} else if (K(e)) {
		for (var a in e) if (Tn(e, a) && qt(e[a])) {
			t = Ed;
			break;
		}
	}
	return t;
}
function fv(e, t, n, r, i) {
	var a, o;
	if (!e) return {
		dimensionsDefine: mv(i),
		startIndex: o,
		dimensionsDetectedCount: a
	};
	if (t === "arrayRows") {
		var s = e;
		r === "auto" || r == null ? hv(function(e) {
			e != null && e !== "-" && (G(e) ? o ??= 1 : o = 0);
		}, n, s, 10) : o = tn(r) ? r : +!!r, !i && o === 1 && (i = [], hv(function(e, t) {
			i[t] = e == null ? "" : e + "";
		}, n, s, Infinity)), a = i ? i.length : n === "row" ? s.length : s[0] ? s[0].length : null;
	} else if (t === "objectRows") i ||= pv(e);
	else if (t === "keyedColumns") i || (i = [], V(e, function(e, t) {
		i.push(t);
	}));
	else if (t === "original") {
		var c = sc(e[0]);
		a = U(c) && c.length || 1;
	}
	return {
		startIndex: o,
		dimensionsDefine: mv(i),
		dimensionsDetectedCount: a
	};
}
function pv(e) {
	for (var t = 0, n; t < e.length && !(n = e[t++]););
	if (n) return Xt(n);
}
function mv(e) {
	if (e) {
		var t = J();
		return H(e, function(e, n) {
			e = K(e) ? e : { name: e };
			var r = {
				name: e.name,
				displayName: e.displayName,
				type: e.type
			};
			if (r.name == null) return r;
			r.name += "", r.displayName ??= r.name;
			var i = t.get(r.name);
			return i ? r.name += "-" + i.count++ : t.set(r.name, { count: 1 }), r;
		});
	}
}
function hv(e, t, n, r) {
	if (t === "row") for (var i = 0; i < n.length && i < r; i++) e(n[i] ? n[i][0] : null, i);
	else for (var a = n[0] || [], i = 0; i < a.length && i < r; i++) e(a[i], i);
}
function gv(e) {
	var t = e.sourceFormat;
	return t === "objectRows" || t === "keyedColumns";
}
// node_modules/echarts/lib/data/helper/dataProvider.js
var _v, vv, yv, bv, xv, Sv, Cv = function() {
	function e(e, t) {
		var n = sv(e) ? e : lv(e);
		this._source = n;
		var r = this._data = n.data, i = n.sourceFormat;
		n.seriesLayoutBy, i === "typedArray" && (this._offset = 0, this._dimSize = t, this._data = r), Sv(this, r, n);
	}
	return e.prototype.getSource = function() {
		return this._source;
	}, e.prototype.count = function() {
		return 0;
	}, e.prototype.getItem = function(e, t) {}, e.prototype.appendData = function(e) {}, e.prototype.clean = function() {}, e.protoInitialize = function() {
		var t = e.prototype;
		t.pure = !1, t.persistent = !0;
	}(), e.internalField = function() {
		var e;
		Sv = function(e, i, a) {
			var o = a.sourceFormat, s = a.seriesLayoutBy, c = a.startIndex, l = a.dimensionsDefine, u = xv[Pv(o, s)];
			B(e, u), o === "typedArray" ? (e.getItem = t, e.count = r, e.fillStorage = n) : (e.getItem = Qt(Dv(o, s), null, i, c, l), e.count = Qt(Av(o, s), null, i, c, l));
		};
		var t = function(e, t) {
			e -= this._offset, t ||= [];
			for (var n = this._data, r = this._dimSize, i = r * e, a = 0; a < r; a++) t[a] = n[i + a];
			return t;
		}, n = function(e, t, n, r) {
			for (var i = this._data, a = this._dimSize, o = 0; o < a; o++) {
				for (var s = r[o], c = s[0] == null ? Infinity : s[0], l = s[1] == null ? -Infinity : s[1], u = t - e, d = n[o], f = 0; f < u; f++) {
					var p = i[f * a + o];
					d[e + f] = p, p < c && (c = p), p > l && (l = p);
				}
				s[0] = c, s[1] = l;
			}
		}, r = function() {
			return this._data ? this._data.length / this._dimSize : 0;
		};
		xv = (e = {}, e[wd + "_" + kd] = {
			pure: !0,
			appendData: i
		}, e[wd + "_row"] = {
			pure: !0,
			appendData: function() {
				throw Error("Do not support appendData when set seriesLayoutBy: \"row\".");
			}
		}, e[Td] = {
			pure: !0,
			appendData: i
		}, e[Ed] = {
			pure: !0,
			appendData: function(e) {
				var t = this._data;
				V(e, function(e, n) {
					for (var r = t[n] || (t[n] = []), i = 0; i < (e || []).length; i++) r.push(e[i]);
				});
			}
		}, e[Cd] = { appendData: i }, e[Dd] = {
			persistent: !1,
			pure: !0,
			appendData: function(e) {
				this._data = e;
			},
			clean: function() {
				this._offset += this.count(), this._data = null;
			}
		}, e);
		function i(e) {
			for (var t = 0; t < e.length; t++) this._data.push(e[t]);
		}
	}(), e;
}(), wv = function(e) {
	U(e) || ec("series.data or dataset.source must be an array.");
};
_v = {}, _v[wd + "_" + kd] = wv, _v[wd + "_row"] = wv, _v[Td] = wv, _v[Ed] = function(e, t) {
	for (var n = 0; n < t.length; n++) t[n].name ?? ec("dimension name must not be null/undefined.");
}, _v[Cd] = wv;
var Tv = function(e, t, n, r) {
	return e[r];
}, Ev = (vv = {}, vv[wd + "_" + kd] = function(e, t, n, r) {
	return e[r + t];
}, vv[wd + "_row"] = function(e, t, n, r, i) {
	r += t;
	for (var a = i || [], o = e, s = 0; s < o.length; s++) {
		var c = o[s];
		a[s] = c ? c[r] : null;
	}
	return a;
}, vv[Td] = Tv, vv[Ed] = function(e, t, n, r, i) {
	for (var a = i || [], o = 0; o < n.length; o++) {
		var s = n[o].name, c = s == null ? null : e[s];
		a[o] = c ? c[r] : null;
	}
	return a;
}, vv[Cd] = Tv, vv);
function Dv(e, t) {
	return Ev[Pv(e, t)];
}
var Ov = function(e, t, n) {
	return e.length;
}, kv = (yv = {}, yv[wd + "_" + kd] = function(e, t, n) {
	return Math.max(0, e.length - t);
}, yv[wd + "_row"] = function(e, t, n) {
	var r = e[0];
	return r ? Math.max(0, r.length - t) : 0;
}, yv[Td] = Ov, yv[Ed] = function(e, t, n) {
	var r = n[0].name, i = r == null ? null : e[r];
	return i ? i.length : 0;
}, yv[Cd] = Ov, yv);
function Av(e, t) {
	return kv[Pv(e, t)];
}
var jv = function(e, t, n) {
	return e[t];
}, Mv = (bv = {}, bv[wd] = jv, bv[Td] = function(e, t, n) {
	return e[n];
}, bv[Ed] = jv, bv[Cd] = function(e, t, n) {
	var r = sc(e);
	return r instanceof Array ? r[t] : r;
}, bv[Dd] = jv, bv);
function Nv(e) {
	return Mv[e];
}
function Pv(e, t) {
	return e === "arrayRows" ? e + "_" + t : e;
}
function Fv(e, t, n) {
	if (e) {
		var r = e.getRawDataItem(t);
		if (r != null) {
			var i = e.getStore(), a = i.getSource().sourceFormat;
			if (n != null) {
				var o = e.getDimensionIndex(n), s = i.getDimensionProperty(o);
				return Nv(a)(r, o, s);
			}
			var c = r;
			return a === "original" && (c = sc(r)), c;
		}
	}
}
// node_modules/echarts/lib/model/mixin/dataFormat.js
var Iv = /\{@(.+?)\}/g, Lv = function() {
	function e() {}
	return e.prototype.getDataParams = function(e, t) {
		var n = this.getData(t), r = this.getRawValue(e, t), i = n.getRawIndex(e), a = n.getName(e), o = n.getRawDataItem(e), s = n.getItemVisual(e, "style"), c = s && s[n.getItemVisual(e, "drawType") || "fill"], l = s && s.stroke, u = this.mainType, d = u === "series", f = n.userOutput && n.userOutput.get();
		return {
			componentType: u,
			componentSubType: this.subType,
			componentIndex: this.componentIndex,
			seriesType: d ? this.subType : null,
			seriesIndex: this.seriesIndex,
			seriesId: d ? this.id : null,
			seriesName: d ? this.name : null,
			name: a,
			dataIndex: i,
			data: o,
			dataType: t,
			value: r,
			color: c,
			borderColor: l,
			dimensionNames: f ? f.fullDimensions : null,
			encode: f ? f.encode : null,
			$vars: [
				"seriesName",
				"name",
				"value"
			]
		};
	}, e.prototype.getFormattedLabel = function(e, t, n, r, i, a) {
		t ||= "normal";
		var o = this.getData(n), s = this.getDataParams(e, n);
		if (a && (s.value = a.interpolatedValue), r != null && U(s.value) && (s.value = s.value[r]), i ||= o.getItemModel(e).get(t === "normal" ? ["label", "formatter"] : [
			t,
			"label",
			"formatter"
		]), W(i)) return s.status = t, s.dimensionIndex = r, i(s);
		if (G(i)) return bg(i, s).replace(Iv, function(t, n) {
			var r = n.length, i = n;
			i.charAt(0) === "[" && i.charAt(r - 1) === "]" && (i = +i.slice(1, r - 1));
			var s = Fv(o, e, i);
			if (a && U(a.interpolatedValue)) {
				var c = o.getDimensionIndex(i);
				c >= 0 && (s = a.interpolatedValue[c]);
			}
			return s == null ? "" : s + "";
		});
	}, e.prototype.getRawValue = function(e, t) {
		return Fv(this.getData(t), e);
	}, e.prototype.formatTooltip = function(e, t, n) {}, e;
}();
function Rv(e) {
	var t, n;
	return K(e) ? e.type && (n = e) : t = e, {
		text: t,
		frag: n
	};
}
// node_modules/echarts/lib/core/task.js
function zv(e) {
	return new Bv(e);
}
var Bv = function() {
	function e(e) {
		e ||= {}, this._reset = e.reset, this._plan = e.plan, this._count = e.count, this._onDirty = e.onDirty, this._dirty = !0;
	}
	return e.prototype.perform = function(e) {
		var t = this._upstream, n = e && e.skip;
		if (this._dirty && t) {
			var r = this.context;
			r.data = r.outputData = t.context.outputData;
		}
		this.__pipeline && (this.__pipeline.currentTask = this);
		var i;
		this._plan && !n && (i = this._plan(this.context));
		var a = l(this._modBy), o = this._modDataCount || 0, s = l(e && e.modBy), c = e && e.modDataCount || 0;
		(a !== s || o !== c) && (i = "reset");
		function l(e) {
			return !(e >= 1) && (e = 1), e;
		}
		var u;
		(this._dirty || i === "reset") && (this._dirty = !1, u = this._doReset(n)), this._modBy = s, this._modDataCount = c;
		var d = e && e.step;
		if (this._dueEnd = t ? t._outputDueEnd : this._count ? this._count(this.context) : Infinity, this._progress) {
			var f = this._dueIndex, p = Math.min(d == null ? Infinity : this._dueIndex + d, this._dueEnd);
			if (!n && (u || f < p)) {
				var m = this._progress;
				if (U(m)) for (var h = 0; h < m.length; h++) this._doProgress(m[h], f, p, s, c);
				else this._doProgress(m, f, p, s, c);
			}
			this._dueIndex = p;
			var g = this._settedOutputEnd == null ? p : this._settedOutputEnd;
			this._outputDueEnd = g;
		} else this._dueIndex = this._outputDueEnd = this._settedOutputEnd == null ? this._dueEnd : this._settedOutputEnd;
		return this.unfinished();
	}, e.prototype.dirty = function() {
		this._dirty = !0, this._onDirty && this._onDirty(this.context);
	}, e.prototype._doProgress = function(e, t, n, r, i) {
		Vv.reset(t, n, r, i), this._callingProgress = e, this._callingProgress({
			start: t,
			end: n,
			count: n - t,
			next: Vv.next
		}, this.context);
	}, e.prototype._doReset = function(e) {
		this._dueIndex = this._outputDueEnd = this._dueEnd = 0, this._settedOutputEnd = null;
		var t, n;
		!e && this._reset && (t = this._reset(this.context), t && t.progress && (n = t.forceFirstProgress, t = t.progress), U(t) && !t.length && (t = null)), this._progress = t, this._modBy = this._modDataCount = null;
		var r = this._downstream;
		return r && r.dirty(), n;
	}, e.prototype.unfinished = function() {
		return this._progress && this._dueIndex < this._dueEnd;
	}, e.prototype.pipe = function(e) {
		(this._downstream !== e || this._dirty) && (this._downstream = e, e._upstream = this, e.dirty());
	}, e.prototype.dispose = function() {
		this._disposed ||= (this._upstream && (this._upstream._downstream = null), this._downstream && (this._downstream._upstream = null), this._dirty = !1, !0);
	}, e.prototype.getUpstream = function() {
		return this._upstream;
	}, e.prototype.getDownstream = function() {
		return this._downstream;
	}, e.prototype.setOutputEnd = function(e) {
		this._outputDueEnd = this._settedOutputEnd = e;
	}, e;
}(), Vv = function() {
	var e, t, n, r, i, a = { reset: function(c, l, u, d) {
		t = c, e = l, n = u, r = d, i = Math.ceil(r / n), a.next = n > 1 && r > 0 ? s : o;
	} };
	return a;
	function o() {
		return t < e ? t++ : null;
	}
	function s() {
		var a = t % i * n + Math.ceil(t / i), o = t >= e ? null : a < r ? a : t;
		return t++, o;
	}
}();
// node_modules/echarts/lib/data/helper/dataValueHelper.js
function Hv(e, t) {
	var n = t && t.type;
	return n === "ordinal" ? e : (n === "time" && !tn(e) && e != null && e !== "-" && (e = +Us(e)), e == null || e === "" ? NaN : Number(e));
}
J({
	number: function(e) {
		return parseFloat(e);
	},
	time: function(e) {
		return +Us(e);
	},
	trim: function(e) {
		return G(e) ? mn(e) : e;
	}
});
var Uv = {
	lt: function(e, t) {
		return e < t;
	},
	lte: function(e, t) {
		return e <= t;
	},
	gt: function(e, t) {
		return e > t;
	},
	gte: function(e, t) {
		return e >= t;
	}
};
(function() {
	function e(e, t) {
		tn(t) || tc(""), this._opFn = Uv[e], this._rvalFloat = Ws(t);
	}
	return e.prototype.evaluate = function(e) {
		return tn(e) ? this._opFn(e, this._rvalFloat) : this._opFn(Ws(e), this._rvalFloat);
	}, e;
})();
var Wv = function() {
	function e(e, t) {
		var n = e === "desc";
		this._resultLT = n ? 1 : -1, t ??= n ? "min" : "max", this._incomparable = t === "min" ? -Infinity : Infinity;
	}
	return e.prototype.evaluate = function(e, t) {
		var n = tn(e) ? e : Ws(e), r = tn(t) ? t : Ws(t), i = isNaN(n), a = isNaN(r);
		if (i && (n = this._incomparable), a && (r = this._incomparable), i && a) {
			var o = G(e), s = G(t);
			o && (n = s ? e : 0), s && (r = o ? t : 0);
		}
		return n < r ? this._resultLT : n > r ? -this._resultLT : 0;
	}, e;
}();
(function() {
	function e(e, t) {
		this._rval = t, this._isEQ = e, this._rvalTypeof = typeof t, this._rvalFloat = Ws(t);
	}
	return e.prototype.evaluate = function(e) {
		var t = e === this._rval;
		if (!t) {
			var n = typeof e;
			n !== this._rvalTypeof && (n === "number" || this._rvalTypeof === "number") && (t = Ws(e) === this._rvalFloat);
		}
		return this._isEQ ? t : !t;
	}, e;
})();
function Gv(e) {
	var t = "", n = -Infinity, r = -Infinity, i = Infinity, a = Infinity;
	return e && (e.g != null && (t += "G" + e.g, n = e.g), e.ge != null && (t += "GE" + e.ge, r = e.ge), e.l != null && (t += "L" + e.l, i = e.l), e.le != null && (t += "LE" + e.le, a = e.le)), {
		key: t,
		g: n,
		ge: r,
		l: i,
		le: a
	};
}
function Kv(e, t) {
	return t > e.g && t >= e.ge && t < e.l && t <= e.le;
}
// node_modules/echarts/lib/data/helper/transform.js
var qv = function() {
	function e() {}
	return e.prototype.getRawData = function() {
		throw Error("not supported");
	}, e.prototype.getRawDataItem = function(e) {
		throw Error("not supported");
	}, e.prototype.cloneRawData = function() {}, e.prototype.getDimensionInfo = function(e) {}, e.prototype.cloneAllDimensionInfo = function() {}, e.prototype.count = function() {}, e.prototype.retrieveValue = function(e, t) {}, e.prototype.retrieveValueFromItem = function(e, t) {}, e.prototype.convertValue = function(e, t) {
		return Hv(e, t);
	}, e;
}();
function Jv(e, t) {
	var n = new qv(), r = e.data, i = n.sourceFormat = e.sourceFormat, a = e.startIndex;
	e.seriesLayoutBy !== "column" && tc("");
	var o = [], s = {}, c = e.dimensionsDefine;
	if (c) V(c, function(e, t) {
		var n = e.name, r = {
			index: t,
			name: n,
			displayName: e.displayName
		};
		o.push(r), n != null && (Tn(s, n) && tc(""), s[n] = r);
	});
	else for (var l = 0; l < e.dimensionsDetectedCount; l++) o.push({ index: l });
	var u = Dv(i, kd);
	t.__isBuiltIn && (n.getRawDataItem = function(e) {
		return u(r, a, o, e);
	}, n.getRawData = Qt(Yv, null, e)), n.cloneRawData = Qt(Xv, null, e), n.count = Qt(Av(i, kd), null, r, a, o);
	var d = Nv(i);
	n.retrieveValue = function(e, t) {
		return f(u(r, a, o, e), t);
	};
	var f = n.retrieveValueFromItem = function(e, t) {
		if (e != null) {
			var n = o[t];
			if (n) return d(e, t, n.name);
		}
	};
	return n.getDimensionInfo = Qt(Zv, null, o, s), n.cloneAllDimensionInfo = Qt(Qv, null, o), n;
}
function Yv(e) {
	var t = e.sourceFormat;
	return ry(t) || tc(""), e.data;
}
function Xv(e) {
	var t = e.sourceFormat, n = e.data;
	if (ry(t) || tc(""), t === "arrayRows") {
		for (var r = [], i = 0, a = n.length; i < a; i++) r.push(n[i].slice());
		return r;
	}
	if (t === "objectRows") {
		for (var r = [], i = 0, a = n.length; i < a; i++) r.push(B({}, n[i]));
		return r;
	}
}
function Zv(e, t, n) {
	if (n != null) {
		if (tn(n) || !isNaN(n) && !Tn(t, n)) return e[n];
		if (Tn(t, n)) return t[n];
	}
}
function Qv(e) {
	return z(e);
}
var $v = J();
function ey(e) {
	e = z(e);
	var t = e.type, n = "";
	t || tc(n);
	var r = t.split(":");
	r.length !== 2 && tc(n);
	var i = !1;
	r[0] === "echarts" && (t = r[1], i = !0), e.__isBuiltIn = i, $v.set(t, e);
}
function ty(e, t, n) {
	var r = ic(e), i = r.length;
	i || tc("");
	for (var a = 0, o = i; a < o; a++) {
		var s = r[a];
		t = ny(s, t, n, i === 1 ? null : a), a !== o - 1 && (t.length = Math.max(t.length, 1));
	}
	return t;
}
function ny(e, t, n, r) {
	var i = "";
	t.length || tc(i), K(e) || tc(i);
	var a = e.type, o = $v.get(a);
	o || tc(i);
	var s = H(t, function(e) {
		return Jv(e, o);
	});
	return H(ic(o.transform({
		upstream: s[0],
		upstreamList: s,
		config: z(e.config)
	})), function(e, n) {
		var r = "";
		K(e) || tc(r), e.data || tc(r), ry(dv(e.data)) || tc(r);
		var i, a = t[0];
		if (a && n === 0 && !e.dimensions) {
			var o = a.startIndex;
			o && (e.data = a.data.slice(0, o).concat(e.data)), i = {
				seriesLayoutBy: kd,
				sourceHeader: o,
				dimensions: a.metaRawOption.dimensions
			};
		} else i = {
			seriesLayoutBy: kd,
			sourceHeader: 0,
			dimensions: e.dimensions
		};
		return cv(e.data, i, null);
	});
}
function ry(e) {
	return e === "arrayRows" || e === "objectRows";
}
// node_modules/echarts/lib/data/DataStore.js
var iy = typeof Uint32Array > "u" ? Array : Uint32Array, ay = typeof Uint16Array > "u" ? Array : Uint16Array, oy = typeof Int32Array > "u" ? Array : Int32Array, sy = typeof Float64Array > "u" ? Array : Float64Array, cy = {
	float: sy,
	int: oy,
	ordinal: Array,
	number: Array,
	time: sy
}, ly;
function uy(e) {
	return e > 65535 ? iy : ay;
}
function dy(e) {
	var t = e.constructor;
	return t === Array ? e.slice() : new t(e);
}
function fy(e, t, n, r, i) {
	var a = cy[n || "float"];
	if (i) {
		var o = e[t], s = o && o.length;
		if (s !== r) {
			for (var c = new a(r), l = 0; l < s; l++) c[l] = o[l];
			e[t] = c;
		}
	} else e[t] = new a(r);
}
var py = function() {
	function e() {
		this._chunks = [], this._rawExtent = [], this._extent = [], this._count = 0, this._rawCount = 0, this._calcDimNameToIdx = J();
	}
	return e.prototype.initData = function(e, t, n) {
		this._provider = e, this._chunks = [], this._indices = null, this.getRawIndex = this._getRawIdxIdentity;
		var r = e.getSource(), i = this.defaultDimValueGetter = ly[r.sourceFormat];
		this._dimValueGetter = n || i, this._rawExtent = [], gv(r), this._dimensions = H(t, function(e) {
			return {
				type: e.type,
				property: e.property
			};
		}), this._initDataFromProvider(0, e.count());
	}, e.prototype.getProvider = function() {
		return this._provider;
	}, e.prototype.getSource = function() {
		return this._provider.getSource();
	}, e.prototype.ensureCalculationDimension = function(e, t) {
		var n = this._calcDimNameToIdx, r = this._dimensions, i = n.get(e);
		if (i != null) {
			if (r[i].type === t) return i;
		} else i = r.length;
		return r[i] = { type: t }, n.set(e, i), this._chunks[i] = new cy[t || "float"](this._rawCount), this._rawExtent[i] = Nc(), i;
	}, e.prototype.collectOrdinalMeta = function(e, t) {
		var n = this._chunks[e], r = this._dimensions[e], i = this._rawExtent, a = r.ordinalOffset || 0, o = n.length;
		a === 0 && (i[e] = Nc());
		for (var s = i[e], c = a; c < o; c++) {
			var l = n[c] = t.parseAndCollect(n[c]);
			isNaN(l) || (s[0] = Math.min(l, s[0]), s[1] = Math.max(l, s[1]));
		}
		r.ordinalMeta = t, r.ordinalOffset = o, r.type = "ordinal";
	}, e.prototype.getOrdinalMeta = function(e) {
		return this._dimensions[e].ordinalMeta;
	}, e.prototype.getDimensionProperty = function(e) {
		var t = this._dimensions[e];
		return t && t.property;
	}, e.prototype.appendData = function(e) {
		var t = this._provider, n = this.count();
		t.appendData(e);
		var r = t.count();
		return t.persistent || (r += n), n < r && this._initDataFromProvider(n, r, !0), [n, r];
	}, e.prototype.appendValues = function(e, t) {
		for (var n = this._chunks, r = this._dimensions, i = r.length, a = this._rawExtent, o = this.count(), s = o + Math.max(e.length, t || 0), c = 0; c < i; c++) {
			var l = r[c];
			fy(n, c, l.type, s, !0);
		}
		for (var u = [], d = o; d < s; d++) for (var f = d - o, p = 0; p < i; p++) {
			var l = r[p], m = ly.arrayRows.call(this, e[f] || u, l.property, f, p);
			n[p][d] = m;
			var h = a[p];
			m < h[0] && (h[0] = m), m > h[1] && (h[1] = m);
		}
		return this._rawCount = this._count = s, {
			start: o,
			end: s
		};
	}, e.prototype._initDataFromProvider = function(e, t, n) {
		for (var r = this._provider, i = this._chunks, a = this._dimensions, o = a.length, s = this._rawExtent, c = H(a, function(e) {
			return e.property;
		}), l = 0; l < o; l++) {
			var u = a[l];
			s[l] || (s[l] = Nc()), fy(i, l, u.type, t, n);
		}
		if (r.fillStorage) r.fillStorage(e, t, i, s);
		else for (var d = [], f = e; f < t; f++) {
			d = r.getItem(f, d);
			for (var p = 0; p < o; p++) {
				var m = i[p], h = this._dimValueGetter(d, c[p], f, p);
				m[f] = h;
				var g = s[p];
				h < g[0] && (g[0] = h), h > g[1] && (g[1] = h);
			}
		}
		!r.persistent && r.clean && r.clean(), this._rawCount = this._count = t, this._extent = [];
	}, e.prototype.count = function() {
		return this._count;
	}, e.prototype.get = function(e, t) {
		if (!(t >= 0 && t < this._count)) return NaN;
		var n = this._chunks[e];
		return n ? n[this.getRawIndex(t)] : NaN;
	}, e.prototype.getValues = function(e, t) {
		var n = [], r = [];
		if (t == null) {
			t = e, e = [];
			for (var i = 0; i < this._dimensions.length; i++) r.push(i);
		} else r = e;
		for (var i = 0, a = r.length; i < a; i++) n.push(this.get(r[i], t));
		return n;
	}, e.prototype.getByRawIndex = function(e, t) {
		if (!(t >= 0 && t < this._rawCount)) return NaN;
		var n = this._chunks[e];
		return n ? n[t] : NaN;
	}, e.prototype.getSum = function(e) {
		var t = this._chunks[e], n = 0;
		if (t) for (var r = 0, i = this.count(); r < i; r++) {
			var a = this.get(e, r);
			isNaN(a) || (n += a);
		}
		return n;
	}, e.prototype.getMedian = function(e) {
		var t = [];
		this.each([e], function(e) {
			isNaN(e) || t.push(e);
		}), Fs(t);
		var n = this.count();
		return n === 0 ? 0 : n % 2 == 1 ? t[(n - 1) / 2] : (t[n / 2] + t[n / 2 - 1]) / 2;
	}, e.prototype.indexOfRawIndex = function(e) {
		if (e >= this._rawCount || e < 0) return -1;
		if (!this._indices) return e;
		var t = this._indices, n = t[e];
		if (n != null && n < this._count && n === e) return e;
		for (var r = 0, i = this._count - 1; r <= i;) {
			var a = (r + i) / 2 | 0;
			if (t[a] < e) r = a + 1;
			else if (t[a] > e) i = a - 1;
			else return a;
		}
		return -1;
	}, e.prototype.getIndices = function() {
		var e, t = this._indices;
		if (t) {
			var n = t.constructor, r = this._count;
			if (n === Array) {
				e = new n(r);
				for (var i = 0; i < r; i++) e[i] = t[i];
			} else e = new n(t.buffer, 0, r);
		} else {
			var n = uy(this._rawCount);
			e = new n(this.count());
			for (var i = 0; i < e.length; i++) e[i] = i;
		}
		return e;
	}, e.prototype.filter = function(e, t) {
		if (!this._count) return this;
		for (var n = this.clone(), r = n.count(), i = new (uy(n._rawCount))(r), a = [], o = e.length, s = 0, c = e[0], l = n._chunks, u = 0; u < r; u++) {
			var d = void 0, f = n.getRawIndex(u);
			if (o === 0) d = t(u);
			else if (o === 1) {
				var p = l[c][f];
				d = t(p, u);
			} else {
				for (var m = 0; m < o; m++) a[m] = l[e[m]][f];
				a[m] = u, d = t.apply(null, a);
			}
			d && (i[s++] = f);
		}
		return s < r && (n._indices = i), n._count = s, n._extent = [], n._updateGetRawIdx(), n;
	}, e.prototype.selectRange = function(e) {
		var t = this.clone(), n = t._count;
		if (!n) return this;
		var r = Xt(e), i = r.length;
		if (!i) return this;
		var a = t.count(), o = new (uy(t._rawCount))(a), s = 0, c = r[0], l = e[c][0], u = e[c][1], d = t._chunks, f = !1;
		if (!t._indices) {
			var p = 0;
			if (i === 1) {
				for (var m = d[r[0]], h = 0; h < n; h++) {
					var g = m[h];
					(g >= l && g <= u || isNaN(g)) && (o[s++] = p), p++;
				}
				f = !0;
			} else if (i === 2) {
				for (var m = d[r[0]], _ = d[r[1]], v = e[r[1]][0], y = e[r[1]][1], h = 0; h < n; h++) {
					var g = m[h], b = _[h];
					(g >= l && g <= u || isNaN(g)) && (b >= v && b <= y || isNaN(b)) && (o[s++] = p), p++;
				}
				f = !0;
			}
		}
		if (!f) {
			if (i === 1) for (var h = 0; h < a; h++) {
				var x = t.getRawIndex(h), g = d[r[0]][x];
				(g >= l && g <= u || isNaN(g)) && (o[s++] = x);
			}
			else for (var h = 0; h < a; h++) {
				for (var S = !0, x = t.getRawIndex(h), C = 0; C < i; C++) {
					var w = r[C], g = d[w][x];
					(g < e[w][0] || g > e[w][1]) && (S = !1);
				}
				S && (o[s++] = t.getRawIndex(h));
			}
		}
		return s < a && (t._indices = o), t._count = s, t._extent = [], t._updateGetRawIdx(), t;
	}, e.prototype.map = function(e, t) {
		var n = this.clone(e);
		return this._updateDims(n, e, t), n;
	}, e.prototype.modify = function(e, t) {
		this._updateDims(this, e, t);
	}, e.prototype._updateDims = function(e, t, n) {
		for (var r = e._chunks, i = [], a = t.length, o = e.count(), s = [], c = e._rawExtent, l = 0; l < t.length; l++) c[t[l]] = Nc();
		for (var u = 0; u < o; u++) {
			for (var d = e.getRawIndex(u), f = 0; f < a; f++) s[f] = r[t[f]][d];
			s[a] = u;
			var p = n && n.apply(null, s);
			if (p != null) {
				typeof p != "object" && (i[0] = p, p = i);
				for (var l = 0; l < p.length; l++) {
					var m = t[l], h = p[l], g = c[m], _ = r[m];
					_ && (_[d] = h), h < g[0] && (g[0] = h), h > g[1] && (g[1] = h);
				}
			}
		}
	}, e.prototype.lttbDownSample = function(e, t) {
		var n = this.clone([e], !0), r = n._chunks[e], i = this.count(), a = 0, o = Math.floor(1 / t), s = this.getRawIndex(0), c, l, u, d = new (uy(this._rawCount))(Math.min((Math.ceil(i / o) + 2) * 2, i));
		d[a++] = s;
		for (var f = 1; f < i - 1; f += o) {
			for (var p = Math.min(f + o, i - 1), m = Math.min(f + o * 2, i), h = (m + p) / 2, g = 0, _ = p; _ < m; _++) {
				var v = this.getRawIndex(_), y = r[v];
				isNaN(y) || (g += y);
			}
			g /= m - p;
			var b = f, x = Math.min(f + o, i), S = f - 1, C = r[s];
			c = -1, u = b;
			for (var w = -1, T = 0, _ = b; _ < x; _++) {
				var v = this.getRawIndex(_), y = r[v];
				isNaN(y) ? (T++, w < 0 && (w = v)) : (l = Math.abs((S - h) * (y - C) - (S - _) * (g - C)), l > c && (c = l, u = v));
			}
			T > 0 && T < x - b && (d[a++] = Math.min(w, u), u = Math.max(w, u)), d[a++] = u, s = u;
		}
		return d[a++] = this.getRawIndex(i - 1), n._count = a, n._indices = d, n.getRawIndex = this._getRawIdx, n;
	}, e.prototype.minmaxDownSample = function(e, t) {
		for (var n = this.clone([e], !0), r = n._chunks, i = Math.floor(1 / t), a = r[e], o = this.count(), s = new (uy(this._rawCount))(Math.ceil(o / i) * 2), c = 0, l = 0; l < o; l += i) {
			var u = l, d = a[this.getRawIndex(u)], f = l, p = a[this.getRawIndex(f)], m = i;
			l + i > o && (m = o - l);
			for (var h = 0; h < m; h++) {
				var g = a[this.getRawIndex(l + h)];
				g < d && (d = g, u = l + h), g > p && (p = g, f = l + h);
			}
			var _ = this.getRawIndex(u), v = this.getRawIndex(f);
			u < f ? (s[c++] = _, s[c++] = v) : (s[c++] = v, s[c++] = _);
		}
		return n._count = c, n._indices = s, n._updateGetRawIdx(), n;
	}, e.prototype.downSample = function(e, t, n, r) {
		for (var i = this.clone([e], !0), a = i._chunks, o = [], s = Math.floor(1 / t), c = a[e], l = this.count(), u = i._rawExtent[e] = Nc(), d = new (uy(this._rawCount))(Math.ceil(l / s)), f = 0, p = 0; p < l; p += s) {
			s > l - p && (s = l - p, o.length = s);
			for (var m = 0; m < s; m++) {
				var h = this.getRawIndex(p + m);
				o[m] = c[h];
			}
			var g = n(o), _ = this.getRawIndex(Math.min(p + r(o, g) || 0, l - 1));
			c[_] = g, g < u[0] && (u[0] = g), g > u[1] && (u[1] = g), d[f++] = _;
		}
		return i._count = f, i._indices = d, i._updateGetRawIdx(), i;
	}, e.prototype.each = function(e, t) {
		if (this._count) for (var n = e.length, r = this._chunks, i = 0, a = this.count(); i < a; i++) {
			var o = this.getRawIndex(i);
			switch (n) {
				case 0:
					t(i);
					break;
				case 1:
					t(r[e[0]][o], i);
					break;
				case 2:
					t(r[e[0]][o], r[e[1]][o], i);
					break;
				default:
					for (var s = 0, c = []; s < n; s++) c[s] = r[e[s]][o];
					c[s] = i, t.apply(null, c);
			}
		}
	}, e.prototype.getDataExtent = function(e, t) {
		var n = this._chunks[e], r = Nc();
		if (!n) return r;
		var i = this.count();
		if (!this._indices && !t) return this._rawExtent[e].slice();
		var a = this._extent, o = a[e] || (a[e] = {}), s = Gv(t), c = s.key, l = o[c];
		if (l) return l.slice();
		for (var u = r[0], d = r[1], f = 0; f < i; f++) {
			var p = n[this.getRawIndex(f)];
			(!t || Kv(s, p)) && (p < u && (u = p), p > d && (d = p));
		}
		return o[c] = [u, d];
	}, e.prototype.getRawDataItem = function(e) {
		var t = this.getRawIndex(e);
		if (this._provider.persistent) return this._provider.getItem(t);
		for (var n = [], r = this._chunks, i = 0; i < r.length; i++) n.push(r[i][t]);
		return n;
	}, e.prototype.clone = function(t, n) {
		var r = new e(), i = this._chunks, a = t && Jt(t, function(e, t) {
			return e[t] = !0, e;
		}, {});
		if (a) for (var o = 0; o < i.length; o++) r._chunks[o] = a[o] ? dy(i[o]) : i[o];
		else r._chunks = i;
		return this._copyCommonProps(r), n || (r._indices = this._cloneIndices()), r._updateGetRawIdx(), r;
	}, e.prototype._copyCommonProps = function(e) {
		e._count = this._count, e._rawCount = this._rawCount, e._provider = this._provider, e._dimensions = this._dimensions, e._extent = z(this._extent), e._rawExtent = z(this._rawExtent);
	}, e.prototype._cloneIndices = function() {
		if (this._indices) {
			var e = this._indices.constructor, t = void 0;
			if (e === Array) {
				var n = this._indices.length;
				t = new e(n);
				for (var r = 0; r < n; r++) t[r] = this._indices[r];
			} else t = new e(this._indices);
			return t;
		}
		return null;
	}, e.prototype._getRawIdxIdentity = function(e) {
		return e;
	}, e.prototype._getRawIdx = function(e) {
		return e < this._count && e >= 0 ? this._indices[e] : -1;
	}, e.prototype._updateGetRawIdx = function() {
		this.getRawIndex = this._indices ? this._getRawIdx : this._getRawIdxIdentity;
	}, e.internalField = function() {
		function e(e, t, n, r) {
			return Hv(e[r], this._dimensions[r]);
		}
		ly = {
			arrayRows: e,
			objectRows: function(e, t, n, r) {
				return Hv(e[t], this._dimensions[r]);
			},
			keyedColumns: e,
			original: function(e, t, n, r) {
				var i = e && (e.value == null ? e : e.value);
				return Hv(i instanceof Array ? i[r] : i, this._dimensions[r]);
			},
			typedArray: function(e, t, n, r) {
				return e[r];
			}
		};
	}(), e;
}(), my = function() {
	function e(e) {
		this._sourceList = [], this._storeList = [], this._upstreamSignList = [], this._versionSignBase = 0, this._dirty = !0, this._sourceHost = e;
	}
	return e.prototype.dirty = function() {
		this._setLocalSource([], []), this._storeList = [], this._dirty = !0;
	}, e.prototype._setLocalSource = function(e, t) {
		this._sourceList = e, this._upstreamSignList = t, this._versionSignBase++, this._versionSignBase > 9e10 && (this._versionSignBase = 0);
	}, e.prototype._getVersionSign = function() {
		return this._sourceHost.uid + "_" + this._versionSignBase;
	}, e.prototype.prepareSource = function() {
		this._isDirty() && (this._createSource(), this._dirty = !1);
	}, e.prototype._createSource = function() {
		this._setLocalSource([], []);
		var e = this._sourceHost, t = this._getUpstreamSourceManagers(), n = !!t.length, r, i;
		if (hy(e)) {
			var a = e, o = void 0, s = void 0, c = void 0;
			if (n) {
				var l = t[0];
				l.prepareSource(), c = l.getSource(), o = c.data, s = c.sourceFormat, i = [l._getVersionSign()];
			} else o = a.get("data", !0), s = rn(o) ? Dd : Cd, i = [];
			var u = this._getSourceMetaRawOption() || {}, d = c && c.metaRawOption || {}, f = q(u.seriesLayoutBy, d.seriesLayoutBy) || null, p = q(u.sourceHeader, d.sourceHeader), m = q(u.dimensions, d.dimensions);
			r = f !== d.seriesLayoutBy || !!p != !!d.sourceHeader || m ? [cv(o, {
				seriesLayoutBy: f,
				sourceHeader: p,
				dimensions: m
			}, s)] : [];
		} else {
			var h = e;
			if (n) {
				var g = this._applyTransform(t);
				r = g.sourceList, i = g.upstreamSignList;
			} else r = [cv(h.get("source", !0), this._getSourceMetaRawOption(), null)], i = [];
		}
		this._setLocalSource(r, i);
	}, e.prototype._applyTransform = function(e) {
		var t = this._sourceHost, n = t.get("transform", !0), r = t.get("fromTransformResult", !0);
		r != null && e.length !== 1 && gy("");
		var i, a = [], o = [];
		return V(e, function(e) {
			e.prepareSource();
			var t = e.getSource(r || 0);
			r != null && !t && gy(""), a.push(t), o.push(e._getVersionSign());
		}), n ? i = ty(n, a, { datasetIndex: t.componentIndex }) : r != null && (i = [uv(a[0])]), {
			sourceList: i,
			upstreamSignList: o
		};
	}, e.prototype._isDirty = function() {
		if (this._dirty) return !0;
		for (var e = this._getUpstreamSourceManagers(), t = 0; t < e.length; t++) {
			var n = e[t];
			if (n._isDirty() || this._upstreamSignList[t] !== n._getVersionSign()) return !0;
		}
	}, e.prototype.getSource = function(e) {
		e ||= 0;
		var t = this._sourceList[e];
		if (!t) {
			var n = this._getUpstreamSourceManagers();
			return n[0] && n[0].getSource(e);
		}
		return t;
	}, e.prototype.getSharedDataStore = function(e) {
		var t = e.makeStoreSchema();
		return this._innerGetDataStore(t.dimensions, e.source, t.hash);
	}, e.prototype._innerGetDataStore = function(e, t, n) {
		var r = 0, i = this._storeList, a = i[r];
		a ||= i[r] = {};
		var o = a[n];
		if (!o) {
			var s = this._getUpstreamSourceManagers()[0];
			hy(this._sourceHost) && s ? o = s._innerGetDataStore(e, t, n) : (o = new py(), o.initData(new Cv(t, e.length), e)), a[n] = o;
		}
		return o;
	}, e.prototype._getUpstreamSourceManagers = function() {
		var e = this._sourceHost;
		if (hy(e)) {
			var t = a_(e);
			return t ? [t.getSourceManager()] : [];
		}
		return H(o_(e), function(e) {
			return e.getSourceManager();
		});
	}, e.prototype._getSourceMetaRawOption = function() {
		var e = this._sourceHost, t, n, r;
		if (hy(e)) t = e.get("seriesLayoutBy", !0), n = e.get("sourceHeader", !0), r = e.get("dimensions", !0);
		else if (!this._getUpstreamSourceManagers().length) {
			var i = e;
			t = i.get("seriesLayoutBy", !0), n = i.get("sourceHeader", !0), r = i.get("dimensions", !0);
		}
		return {
			seriesLayoutBy: t,
			sourceHeader: n,
			dimensions: r
		};
	}, e;
}();
function hy(e) {
	return e.mainType === "series";
}
function gy(e) {
	throw Error(e);
}
// node_modules/echarts/lib/component/tooltip/tooltipMarkup.js
var _y = "line-height:1";
function vy(e) {
	var t = e.lineHeight;
	return t == null ? _y : "line-height:" + sr(t + "") + "px";
}
function yy(e, t) {
	var n = e.color || Kg.color.tertiary, r = e.fontSize || 12, i = e.fontWeight || "400", a = e.color || Kg.color.secondary, o = e.fontSize || 14, s = e.fontWeight || "900";
	return t === "html" ? {
		nameStyle: "font-size:" + sr(r + "") + "px;color:" + sr(n) + ";font-weight:" + sr(i + ""),
		valueStyle: "font-size:" + sr(o + "") + "px;color:" + sr(a) + ";font-weight:" + sr(s + "")
	} : {
		nameStyle: {
			fontSize: r,
			fill: n,
			fontWeight: i
		},
		valueStyle: {
			fontSize: o,
			fill: a,
			fontWeight: s
		}
	};
}
var by = [
	0,
	10,
	20,
	30
], xy = [
	"",
	"\n",
	"\n\n",
	"\n\n\n"
];
function Sy(e, t) {
	return t.type = e, t;
}
function Cy(e) {
	return e.type === "section";
}
function wy(e) {
	return Cy(e) ? Ey : Dy;
}
function Ty(e) {
	if (Cy(e)) {
		var t = 0, n = e.blocks.length, r = n > 1 || n > 0 && !e.noHeader;
		return V(e.blocks, function(e) {
			var n = Ty(e);
			n >= t && (t = n + +(r && (!n || Cy(e) && !e.noHeader)));
		}), t;
	}
	return 0;
}
function Ey(e, t, n, r) {
	var i = t.noHeader, a = ky(Ty(t)), o = [], s = t.blocks || [];
	pn(!s || U(s)), s ||= [];
	var c = e.orderMode;
	if (t.sortBlocks && c) {
		s = s.slice();
		var l = {
			valueAsc: "asc",
			valueDesc: "desc"
		};
		if (Tn(l, c)) {
			var u = new Wv(l[c], null);
			s.sort(function(e, t) {
				return u.evaluate(e.sortParam, t.sortParam);
			});
		} else c === "seriesDesc" && s.reverse();
	}
	V(s, function(n, i) {
		var s = t.valueFormatter, c = wy(n)(s ? B(B({}, e), { valueFormatter: s }) : e, n, i > 0 ? a.html : 0, r);
		c != null && o.push(c);
	});
	var d = e.renderMode === "richText" ? o.join(a.richText) : Ay(r, o.join(""), i ? n : a.html);
	if (i) return d;
	var f = _g(t.header, "ordinal", e.useUTC), p = yy(r, e.renderMode).nameStyle, m = vy(r);
	return e.renderMode === "richText" ? Ny(e, f, p) + a.richText + d : Ay(r, "<div style=\"" + p + ";" + m + ";\">" + sr(f) + "</div>" + d, n);
}
function Dy(e, t, n, r) {
	var i = e.renderMode, a = t.noName, o = t.noValue, s = !t.markerType, c = t.name, l = e.useUTC, u = t.valueFormatter || e.valueFormatter || function(e) {
		return e = U(e) ? e : [e], H(e, function(e, t) {
			return _g(e, U(p) ? p[t] : p, l);
		});
	};
	if (!(a && o)) {
		var d = s ? "" : e.markupStyleCreator.makeTooltipMarker(t.markerType, t.markerColor || Kg.color.secondary, i), f = a ? "" : _g(c, "ordinal", l), p = t.valueType, m = o ? [] : u(t.value, t.rawDataIndex), h = !s || !a, g = !s && a, _ = yy(r, i), v = _.nameStyle, y = _.valueStyle;
		return i === "richText" ? (s ? "" : d) + (a ? "" : Ny(e, f, v)) + (o ? "" : Py(e, m, h, g, y)) : Ay(r, (s ? "" : d) + (a ? "" : jy(f, !s, v)) + (o ? "" : My(m, h, g, y)), n);
	}
}
function Oy(e, t, n, r, i, a) {
	if (e) return wy(e)({
		useUTC: i,
		renderMode: n,
		orderMode: r,
		markupStyleCreator: t,
		valueFormatter: e.valueFormatter
	}, e, 0, a);
}
function ky(e) {
	return {
		html: by[e],
		richText: xy[e]
	};
}
function Ay(e, t, n) {
	var r = "<div style=\"clear:both\"></div>", i = "margin: " + n + "px 0 0", a = vy(e);
	return "<div style=\"" + i + ";" + a + ";\">" + t + r + "</div>";
}
function jy(e, t, n) {
	var r = t ? "margin-left:2px" : "";
	return "<span style=\"" + n + ";" + r + "\">" + sr(e) + "</span>";
}
function My(e, t, n, r) {
	var i = t ? "float:right;margin-left:" + (n ? "10px" : "20px") : "";
	return e = U(e) ? e : [e], "<span style=\"" + i + ";" + r + "\">" + H(e, function(e) {
		return sr(e);
	}).join("&nbsp;&nbsp;") + "</span>";
}
function Ny(e, t, n) {
	return e.markupStyleCreator.wrapRichTextStyle(t, n);
}
function Py(e, t, n, r, i) {
	var a = [i], o = r ? 10 : 20;
	return n && a.push({
		padding: [
			0,
			0,
			0,
			o
		],
		align: "right"
	}), e.markupStyleCreator.wrapRichTextStyle(U(t) ? t.join("  ") : t, a);
}
function Fy(e, t) {
	var n = e.getData().getItemVisual(t, "style")[e.visualDrawType];
	return Sg(n);
}
function Iy(e, t) {
	return e.get("padding") ?? (t === "richText" ? [8, 10] : 10);
}
var Ly = function() {
	function e() {
		this.richTextStyles = {}, this._nextStyleNameId = Ks();
	}
	return e.prototype._generateStyleName = function() {
		return "__EC_aUTo_" + this._nextStyleNameId++;
	}, e.prototype.makeTooltipMarker = function(e, t, n) {
		var r = n === "richText" ? this._generateStyleName() : null, i = xg({
			color: t,
			type: e,
			renderMode: n,
			markerId: r
		});
		return G(i) ? i : (this.richTextStyles[r] = i.style, i.content);
	}, e.prototype.wrapRichTextStyle = function(e, t) {
		var n = {};
		U(t) ? V(t, function(e) {
			return B(n, e);
		}) : B(n, t);
		var r = this._generateStyleName();
		return this.richTextStyles[r] = n, "{" + r + "|" + e + "}";
	}, e;
}();
// node_modules/echarts/lib/component/tooltip/seriesFormatTooltip.js
function Ry(e) {
	var t = e.series, n = e.dataIndex, r = e.multipleSeries, i = t.getData(), a = i.mapDimensionsAll("defaultedTooltip"), o = a.length, s = t.getRawValue(n), c = U(s), l = Fy(t, n), u, d, f, p;
	if (o > 1 || c && !o) {
		var m = zy(s, t, n, a, l);
		u = m.inlineValues, d = m.inlineValueTypes, f = m.blocks, p = m.inlineValues[0];
	} else if (o) {
		var h = i.getDimensionInfo(a[0]);
		p = u = Fv(i, n, a[0]), d = h.type;
	} else p = u = c ? s[0] : s;
	var g = yc(t), _ = g && t.name || "", v = i.getName(n), y = r ? _ : v;
	return Sy("section", {
		header: _,
		noHeader: r || !g,
		sortParam: p,
		blocks: [Sy("nameValue", {
			markerType: "item",
			markerColor: l,
			name: y,
			noName: !mn(y),
			value: u,
			valueType: d,
			rawDataIndex: i.getRawIndex(n)
		})].concat(f || [])
	});
}
function zy(e, t, n, r, i) {
	var a = t.getData(), o = Jt(e, function(e, t, n) {
		var r = a.getDimensionInfo(n);
		return e ||= r && r.tooltip !== !1 && r.displayName != null;
	}, !1), s = [], c = [], l = [];
	r.length ? V(r, function(e) {
		u(Fv(a, n, e), e);
	}) : V(e, u);
	function u(e, t) {
		var n = a.getDimensionInfo(t);
		n && n.otherDims.tooltip !== !1 && (o ? l.push(Sy("nameValue", {
			markerType: "subItem",
			markerColor: i,
			name: n.displayName,
			value: e,
			valueType: n.type
		})) : (s.push(e), c.push(n.type)));
	}
	return {
		inlineValues: s,
		inlineValueTypes: c,
		blocks: l
	};
}
// node_modules/echarts/lib/model/Series.js
var By = Z();
function Vy(e, t) {
	return e.getName(t) || e.getId(t);
}
var Hy = function(e) {
	L(t, e);
	function t() {
		var t = e !== null && e.apply(this, arguments) || this;
		return t._selectedDataIndicesMap = {}, t;
	}
	return t.prototype.init = function(e, t, n) {
		this.seriesIndex = this.componentIndex, this.dataTask = zv({
			count: Gy,
			reset: Ky
		}), this.dataTask.context = { model: this }, this.mergeDefaultAndTheme(e, n), (By(this).sourceManager = new my(this)).prepareSource();
		var r = this.getInitialData(e, n);
		Jy(r, this), this.dataTask.context.data = r, By(this).dataBeforeProcessed = r, Uy(this), this._initSelectedMapFromData(r);
	}, t.prototype.mergeDefaultAndTheme = function(e, t) {
		var n = zg(this), r = n ? Vg(e) : {}, i = this.subType;
		Wg.hasClass(i) && (i += "Series"), Vt(e, t.getTheme().get(this.subType)), Vt(e, this.getDefaultOption()), ac(e, "label", ["show"]), this.fillDataTextStyle(e.data), n && Bg(e, r, n);
	}, t.prototype.mergeOption = function(e, t) {
		e = Vt(this.option, e, !0), this.fillDataTextStyle(e.data);
		var n = zg(this);
		n && Bg(this.option, e, n);
		var r = By(this).sourceManager;
		r.dirty(), r.prepareSource();
		var i = this.getInitialData(e, t);
		Jy(i, this), this.dataTask.dirty(), this.dataTask.context.data = i, By(this).dataBeforeProcessed = i, Uy(this), this._initSelectedMapFromData(i);
	}, t.prototype.fillDataTextStyle = function(e) {
		if (e && !rn(e)) for (var t = ["show"], n = 0; n < e.length; n++) e[n] && e[n].label && ac(e[n], "label", t);
	}, t.prototype.getInitialData = function(e, t) {}, t.prototype.appendData = function(e) {
		this.getRawData().appendData(e.data);
	}, t.prototype.getData = function(e) {
		var t = Xy(this);
		if (t) {
			var n = t.context.data;
			return e == null || !n.getLinkedData ? n : n.getLinkedData(e);
		}
		return By(this).data;
	}, t.prototype.getAllData = function() {
		var e = this.getData();
		return e && e.getLinkedDataAll ? e.getLinkedDataAll() : [{ data: e }];
	}, t.prototype.setData = function(e) {
		var t = Xy(this);
		if (t) {
			var n = t.context;
			n.outputData = e, t !== this.dataTask && (n.data = e);
		}
		By(this).data = e;
	}, t.prototype.getEncode = function() {
		var e = this.get("encode", !0);
		if (e) return J(e);
	}, t.prototype.getSourceManager = function() {
		return By(this).sourceManager;
	}, t.prototype.getSource = function() {
		return this.getSourceManager().getSource();
	}, t.prototype.getRawData = function() {
		return By(this).dataBeforeProcessed;
	}, t.prototype.getColorBy = function() {
		return this.get("colorBy") || "series";
	}, t.prototype.isColorBySeries = function() {
		return this.getColorBy() === "series";
	}, t.prototype.getBaseAxis = function() {
		var e = this.coordinateSystem;
		return e && e.getBaseAxis && e.getBaseAxis();
	}, t.prototype.indicesOfNearest = function(e, t, n, r) {
		var i = this.getData(), a = this.coordinateSystem, o = a && a.getAxis(e);
		if (!a || !o) return [];
		var s = o.dataToCoord(n);
		r ??= Infinity;
		for (var c = [], l = Infinity, u = -1, d = 0, f = i.getDimensionIndex(t), p = i.getStore(), m = 0, h = p.count(); m < h; m++) {
			var g = p.get(f, m), _ = s - o.dataToCoord(g), v = Math.abs(_);
			v <= r && ((v < l || v === l && _ >= 0 && u < 0) && (l = v, u = _, d = 0), _ === u && (c[d++] = m));
		}
		return c.length = d, c;
	}, t.prototype.formatTooltip = function(e, t, n) {
		return Ry({
			series: this,
			dataIndex: e,
			multipleSeries: t
		});
	}, t.prototype.isAnimationEnabled = function() {
		var e = this.ecModel;
		if (R.node && !(e && e.ssr)) return !1;
		var t = this.getShallow("animation");
		return t && this.getData().count() > this.getShallow("animationThreshold") && (t = !1), !!t;
	}, t.prototype.restoreData = function() {
		this.dataTask.dirty();
	}, t.prototype.getColorFromPalette = function(e, t, n) {
		var r = this.ecModel, i = f_.prototype.getColorFromPalette.call(this, e, t, n);
		return i ||= r.getColorFromPalette(e, t, n), i;
	}, t.prototype.coordDimToDataDim = function(e) {
		return this.getRawData().mapDimensionsAll(e);
	}, t.prototype.getProgressive = function() {
		return this.get("progressive");
	}, t.prototype.getProgressiveThreshold = function() {
		return this.get("progressiveThreshold");
	}, t.prototype.select = function(e, t) {
		this._innerSelect(this.getData(t), e);
	}, t.prototype.unselect = function(e, t) {
		var n = this.option.selectedMap;
		if (n) {
			var r = this.option.selectedMode, i = this.getData(t);
			if (r === "series" || n === "all") this.option.selectedMap = {}, this._selectedDataIndicesMap = {};
			else for (var a = 0; a < e.length; a++) {
				var o = e[a], s = Vy(i, o);
				n[s] = !1, this._selectedDataIndicesMap[s] = -1;
			}
		}
	}, t.prototype.toggleSelect = function(e, t) {
		for (var n = [], r = 0; r < e.length; r++) n[0] = e[r], this.isSelected(e[r], t) ? this.unselect(n, t) : this.select(n, t);
	}, t.prototype.getSelectedDataIndices = function() {
		if (this.option.selectedMap === "all") return [].slice.call(this.getData().getIndices());
		for (var e = this._selectedDataIndicesMap, t = Xt(e), n = [], r = 0; r < t.length; r++) {
			var i = e[t[r]];
			i >= 0 && n.push(i);
		}
		return n;
	}, t.prototype.isSelected = function(e, t) {
		var n = this.option.selectedMap;
		if (!n) return !1;
		var r = this.getData(t);
		return (n === "all" || n[Vy(r, e)]) && !r.getItemModel(e).get(["select", "disabled"]);
	}, t.prototype.isUniversalTransitionEnabled = function() {
		if (this.__universalTransitionEnabled) return !0;
		var e = this.option.universalTransition;
		return e ? e === !0 || e && e.enabled : !1;
	}, t.prototype._innerSelect = function(e, t) {
		var n, r, i = this.option, a = i.selectedMode, o = t.length;
		if (a && o) {
			if (a === "series") i.selectedMap = "all";
			else if (a === "multiple") {
				K(i.selectedMap) || (i.selectedMap = {});
				for (var s = i.selectedMap, c = 0; c < o; c++) {
					var l = t[c], u = Vy(e, l);
					s[u] = !0, this._selectedDataIndicesMap[u] = e.getRawIndex(l);
				}
			} else if (a === "single" || a === !0) {
				var d = t[o - 1], u = Vy(e, d);
				i.selectedMap = (n = {}, n[u] = !0, n), this._selectedDataIndicesMap = (r = {}, r[u] = e.getRawIndex(d), r);
			}
		}
	}, t.prototype._initSelectedMapFromData = function(e) {
		if (!this.option.selectedMap) {
			var t = [];
			e.hasItemOption && e.each(function(n) {
				var r = e.getRawDataItem(n);
				r && r.selected && t.push(n);
			}), t.length > 0 && this._innerSelect(e, t);
		}
	}, t.registerClass = function(e) {
		return Wg.registerClass(e);
	}, t.protoInitialize = function() {
		var e = t.prototype;
		e.type = "series.__base__", e.seriesIndex = 0, e.ignoreStyleOnData = !1, e.hasSymbolVisual = !1, e.defaultSymbol = "circle", e.visualStyleAccessPath = "itemStyle", e.visualDrawType = "fill";
	}(), t;
}(Wg);
Kt(Hy, Lv), Kt(Hy, f_), Jc(Hy, Wg);
function Uy(e) {
	var t = e.name;
	yc(e) || (e.name = Wy(e) || t);
}
function Wy(e) {
	var t = e.getRawData(), n = t.mapDimensionsAll("seriesName"), r = [];
	return V(n, function(e) {
		var n = t.getDimensionInfo(e);
		n.displayName && r.push(n.displayName);
	}), r.join(" ");
}
function Gy(e) {
	return e.model.getRawData().count();
}
function Ky(e) {
	var t = e.model;
	return t.setData(t.getRawData().cloneShallow()), qy;
}
function qy(e, t) {
	t.outputData && e.end > t.outputData.count() && t.model.getRawData().cloneShallow(t.outputData);
}
function Jy(e, t) {
	V(Sn(e.CHANGABLE_METHODS, e.DOWNSAMPLE_METHODS), function(n) {
		e.wrapMethod(n, $t(Yy, t));
	});
}
function Yy(e, t) {
	var n = Xy(e);
	return n && n.setOutputEnd((t || this).count()), t;
}
function Xy(e) {
	var t = (e.ecModel || {}).scheduler, n = t && t.getPipeline(e.uid);
	if (n) {
		var r = n.currentTask;
		if (r) {
			var i = r.agentStubMap;
			i && (r = i.get(e.uid));
		}
		return r;
	}
}
// node_modules/echarts/lib/view/Component.js
var Zy = function() {
	function e() {
		this.group = new us(), this.uid = zh("viewComponent");
	}
	return e.prototype.init = function(e, t) {}, e.prototype.render = function(e, t, n, r) {}, e.prototype.dispose = function(e, t) {}, e.prototype.updateView = function(e, t, n, r) {}, e.prototype.updateLayout = function(e, t, n, r) {}, e.prototype.updateVisual = function(e, t, n, r) {}, e.prototype.toggleBlurSeries = function(e, t, n) {}, e.prototype.eachRendered = function(e) {
		var t = this.group;
		t && t.traverse(e);
	}, e;
}();
Kc(Zy), $c(Zy);
// node_modules/echarts/lib/chart/helper/createRenderPlanner.js
function Qy() {
	var e = Z();
	return function(t) {
		var n = e(t), r = t.pipelineContext, i = !!n.large, a = !!n.progressiveRender, o = n.large = !!(r && r.large), s = n.progressiveRender = !!(r && r.progressiveRender);
		return (i !== o || a !== s) && "reset";
	};
}
// node_modules/echarts/lib/view/Chart.js
var $y = Z(), eb = Qy(), tb = function() {
	function e() {
		this.group = new us(), this.uid = zh("viewChart"), this.renderTask = zv({
			plan: ib,
			reset: ab
		}), this.renderTask.context = { view: this };
	}
	return e.prototype.init = function(e, t) {}, e.prototype.render = function(e, t, n, r) {}, e.prototype.highlight = function(e, t, n, r) {
		var i = e.getData(r && r.dataType);
		i && rb(i, r, "emphasis");
	}, e.prototype.downplay = function(e, t, n, r) {
		var i = e.getData(r && r.dataType);
		i && rb(i, r, "normal");
	}, e.prototype.remove = function(e, t) {
		this.group.removeAll();
	}, e.prototype.dispose = function(e, t) {}, e.prototype.updateView = function(e, t, n, r) {
		this.render(e, t, n, r);
	}, e.prototype.updateVisual = function(e, t, n, r) {
		this.render(e, t, n, r);
	}, e.prototype.eachRendered = function(e) {
		Qm(this.group, e);
	}, e.markUpdateMethod = function(e, t) {
		$y(e).updateMethod = t;
	}, e.protoInitialize = function() {
		var t = e.prototype;
		t.type = "chart";
	}(), e;
}();
function nb(e, t, n) {
	e && Ff(e) && (t === "emphasis" ? uf : df)(e, n);
}
function rb(e, t, n) {
	var r = Cc(e, t), i = t && t.highlightKey != null ? If(t.highlightKey) : null;
	r == null ? e.eachItemGraphicEl(function(e) {
		nb(e, n, i);
	}) : V(ic(r), function(t) {
		nb(e.getItemGraphicEl(t), n, i);
	});
}
Kc(tb, ["dispose"]), $c(tb);
function ib(e) {
	return eb(e.model);
}
function ab(e) {
	var t = e.model, n = e.ecModel, r = e.api, i = e.payload, a = t.pipelineContext.progressiveRender, o = e.view, s = i && $y(i).updateMethod, c = a ? "incrementalPrepareRender" : s && o[s] ? s : "render";
	return c !== "render" && o[c](t, n, r, i), ob[c];
}
var ob = {
	incrementalPrepareRender: { progress: function(e, t) {
		t.view.incrementalRender(e, t.model, t.ecModel, t.api, t.payload);
	} },
	render: {
		forceFirstProgress: !0,
		progress: function(e, t) {
			t.view.render(t.model, t.ecModel, t.api, t.payload);
		}
	}
}, sb = "\0__throttleOriginMethod", cb = "\0__throttleRate", lb = "\0__throttleType";
function ub(e, t, n) {
	var r, i = 0, a = 0, o = null, s, c, l, u;
	t ||= 0;
	function d() {
		a = (/* @__PURE__ */ new Date()).getTime(), o = null, e.apply(c, l || []);
	}
	var f = function() {
		var e = [...arguments];
		r = (/* @__PURE__ */ new Date()).getTime(), c = this, l = e;
		var f = u || t, p = u || n;
		u = null, s = r - (p ? i : a) - f, clearTimeout(o), p ? o = setTimeout(d, f) : s >= 0 ? d() : o = setTimeout(d, -s), i = r;
	};
	return f.clear = function() {
		o &&= (clearTimeout(o), null);
	}, f.debounceNextCall = function(e) {
		u = e;
	}, f;
}
function db(e, t, n, r) {
	var i = e[t];
	if (i) {
		var a = i[sb] || i, o = i[lb];
		if (i[cb] !== n || o !== r) {
			if (n == null || !r) return e[t] = a;
			i = e[t] = ub(a, n, r === "debounce"), i[sb] = a, i[lb] = r, i[cb] = n;
		}
		return i;
	}
}
function fb(e, t) {
	var n = e[t];
	n && n[sb] && (n.clear && n.clear(), e[t] = n[sb]);
}
// node_modules/echarts/lib/visual/style.js
var pb = Z(), mb = {
	itemStyle: el(Ph, !0),
	lineStyle: el(jh, !0)
}, hb = {
	lineStyle: "stroke",
	itemStyle: "fill"
};
function gb(e, t) {
	return e.visualStyleMapper || mb[t] || (console.warn("Unknown style type '" + t + "'."), mb.itemStyle);
}
function _b(e, t) {
	return e.visualDrawType || hb[t] || (console.warn("Unknown style type '" + t + "'."), "fill");
}
var vb = {
	createOnAllSeries: !0,
	performRawSeries: !0,
	reset: function(e, t) {
		var n = e.getData(), r = e.visualStyleAccessPath || "itemStyle", i = e.getModel(r), a = gb(e, r)(i), o = i.getShallow("decal");
		o && (n.setVisual("decal", o), o.dirty = !0);
		var s = _b(e, r), c = a[s], l = W(c) ? c : null, u = a.fill === "auto" || a.stroke === "auto";
		if (!a[s] || l || u) {
			var d = e.getColorFromPalette(e.name, null, t.getSeriesCount());
			a[s] || (a[s] = d, n.setVisual("colorFromPalette", !0)), a.fill = a.fill === "auto" || W(a.fill) ? d : a.fill, a.stroke = a.stroke === "auto" || W(a.stroke) ? d : a.stroke;
		}
		if (n.setVisual("style", a), n.setVisual("drawType", s), !t.isSeriesFiltered(e) && l) return n.setVisual("colorFromPalette", !1), { dataEach: function(t, n) {
			var r = e.getDataParams(n), i = B({}, a);
			i[s] = l(r), t.setItemVisual(n, "style", i);
		} };
	}
}, yb = new Lh(), bb = {
	createOnAllSeries: !0,
	reset: function(e, t) {
		if (!e.ignoreStyleOnData) {
			var n = e.getData(), r = e.visualStyleAccessPath || "itemStyle", i = gb(e, r), a = n.getVisual("drawType");
			return { dataEach: n.hasItemOption ? function(e, t) {
				var n = e.getRawDataItem(t);
				if (n && n[r]) {
					yb.option = n[r];
					var o = i(yb);
					B(e.ensureUniqueItemVisual(t, "style"), o), yb.option.decal && (e.setItemVisual(t, "decal", yb.option.decal), yb.option.decal.dirty = !0), a in o && e.setItemVisual(t, "colorFromPalette", !1);
				}
			} : null };
		}
	}
}, xb = {
	performRawSeries: !0,
	overallReset: function(e) {
		var t = J();
		e.eachSeries(function(e) {
			if (!e.isColorBySeries()) {
				var n = e.type + "-" + e.getColorBy();
				pb(e).scope = t.get(n) || t.set(n, {});
			}
		}), e.eachSeries(function(e) {
			if (!e.isColorBySeries()) {
				var t = e.getRawData(), n = {}, r = e.getData(), i = pb(e).scope, a = _b(e, e.visualStyleAccessPath || "itemStyle");
				r.each(function(e) {
					var t = r.getRawIndex(e);
					n[t] = e;
				}), t.each(function(o) {
					var s = n[o];
					if (r.getItemVisual(s, "colorFromPalette")) {
						var c = r.ensureUniqueItemVisual(s, "style"), l = t.getName(o) || o + "", u = t.count();
						c[a] = e.getColorFromPalette(l, i, u);
					}
				});
			}
		});
	}
}, Sb = Math.PI;
function Cb(e, t) {
	t ||= {}, Ut(t, {
		text: "loading",
		textColor: Kg.color.primary,
		fontSize: 12,
		fontWeight: "normal",
		fontStyle: "normal",
		fontFamily: "sans-serif",
		maskColor: "rgba(255,255,255,0.8)",
		showSpinner: !0,
		color: Kg.color.theme[0],
		spinnerRadius: 10,
		lineWidth: 5,
		zlevel: 0
	});
	var n = new us(), r = new td({
		style: { fill: t.maskColor },
		zlevel: t.zlevel,
		z: 1e4
	});
	n.add(r);
	var i = new od({
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
	}), a = new td({
		style: { fill: "none" },
		textContent: i,
		textConfig: {
			position: "right",
			distance: 10
		},
		zlevel: t.zlevel,
		z: 10001
	});
	n.add(a);
	var o;
	return t.showSpinner && (o = new Gp({
		shape: {
			startAngle: -Sb / 2,
			endAngle: -Sb / 2 + .1,
			r: t.spinnerRadius
		},
		style: {
			stroke: t.color,
			lineCap: "round",
			lineWidth: t.lineWidth
		},
		zlevel: t.zlevel,
		z: 10001
	}), o.animateShape(!0).when(1e3, { endAngle: Sb * 3 / 2 }).start("circularInOut"), o.animateShape(!0).when(1e3, { startAngle: Sb * 3 / 2 }).delay(300).start("circularInOut"), n.add(o)), n.resize = function() {
		var n = i.getBoundingRect().width, s = t.showSpinner ? t.spinnerRadius : 0, c = (e.getWidth() - s * 2 - (t.showSpinner && n ? 10 : 0) - n) / 2 - (t.showSpinner && n ? 0 : 5 + n / 2) + (t.showSpinner ? 0 : n / 2) + (n ? 0 : s), l = e.getHeight() / 2;
		t.showSpinner && o.setShape({
			cx: c,
			cy: l
		}), a.setShape({
			x: c - s,
			y: l - s,
			width: s * 2,
			height: s * 2
		}), r.setShape({
			x: 0,
			y: 0,
			width: e.getWidth(),
			height: e.getHeight()
		});
	}, n.resize(), n;
}
// node_modules/echarts/lib/core/Scheduler.js
var wb = function() {
	function e(e, t, n, r) {
		this._stageTaskMap = J(), this.ecInstance = e, this.api = t, n = this._dataProcessorHandlers = n.slice(), r = this._visualHandlers = r.slice(), this._allHandlers = n.concat(r);
	}
	return e.prototype.restoreData = function(e, t) {
		e.restoreData(t), this._stageTaskMap.each(function(e) {
			var t = e.overallTask;
			t && t.dirty();
		});
	}, e.prototype.getPerformArgs = function(e, t) {
		if (e.__pipeline) {
			var n = this._pipelineMap.get(e.__pipeline.id), r = n.context, i = !t && n.progressiveEnabled && (!r || r.progressiveRender) && e.__idxInPipeline > n.blockIndex ? n.step : null, a = r && r.modDataCount;
			return {
				step: i,
				modBy: a == null ? null : Math.ceil(a / i),
				modDataCount: a
			};
		}
	}, e.prototype.getPipeline = function(e) {
		return this._pipelineMap.get(e);
	}, e.prototype.updateStreamModes = function(e, t) {
		var n = this._pipelineMap.get(e.uid);
		e.pipelineContext = n.context = e.__preparePipelineContext ? e.__preparePipelineContext(t, n) : Lc(e, t, n);
	}, e.prototype.restorePipelines = function(e, t) {
		var n = this, r = n._pipelineMap = J();
		t.eachSeries(function(t) {
			var i = e.painter.type === "canvas" && t.getProgressive(), a = t.uid;
			r.set(a, {
				id: a,
				head: null,
				tail: null,
				threshold: t.getProgressiveThreshold(),
				progressiveEnabled: i && !(t.preventIncremental && t.preventIncremental()),
				blockIndex: -1,
				step: Math.round(i || 700),
				count: 0
			}), n._pipe(t, t.dataTask);
		});
	}, e.prototype.prepareStageTasks = function() {
		var e = this._stageTaskMap, t = this.api.getModel(), n = this.api;
		V(this._allHandlers, function(r) {
			var i = e.get(r.uid) || e.set(r.uid, {});
			pn(!(r.reset && r.overallReset), ""), r.reset && this._createSeriesStageTask(r, i, t, n), r.overallReset && this._createOverallStageTask(r, i, t, n);
		}, this);
	}, e.prototype.prepareView = function(e, t, n, r) {
		var i = e.renderTask, a = i.context;
		a.model = t, a.ecModel = n, a.api = r, i.__block = !e.incrementalPrepareRender, this._pipe(t, i);
	}, e.prototype.performDataProcessorTasks = function(e, t) {
		this._performStageTasks(this._dataProcessorHandlers, e, t, { block: !0 });
	}, e.prototype.performVisualTasks = function(e, t, n) {
		this._performStageTasks(this._visualHandlers, e, t, n);
	}, e.prototype._performStageTasks = function(e, t, n, r) {
		r ||= {};
		var i = !1, a = this;
		V(e, function(e, s) {
			if (!(r.visualType && r.visualType !== e.visualType)) {
				var c = a._stageTaskMap.get(e.uid), l = c.seriesTaskMap, u = c.overallTask;
				if (u) {
					var d, f = u.agentStubMap;
					f.each(function(e) {
						o(r, e) && (e.dirty(), d = !0);
					}), d && u.dirty(), a.updatePayload(u, n);
					var p = a.getPerformArgs(u, r.block);
					f.each(function(e) {
						e.perform(p);
					}), u.perform(p) && (i = !0);
				} else l && l.each(function(s, c) {
					o(r, s) && s.dirty();
					var l = a.getPerformArgs(s, r.block);
					l.skip = !e.performRawSeries && t.isSeriesFiltered(s.context.model), a.updatePayload(s, n), s.perform(l) && (i = !0);
				});
			}
		});
		function o(e, t) {
			return e.setDirty && (!e.dirtyMap || e.dirtyMap.get(t.__pipeline.id));
		}
		this.unfinished = i || this.unfinished;
	}, e.prototype.performSeriesTasks = function(e) {
		var t;
		e.eachSeries(function(e) {
			t = e.dataTask.perform() || t;
		}), this.unfinished = t || this.unfinished;
	}, e.prototype.plan = function() {
		this._pipelineMap.each(function(e) {
			var t = e.tail;
			do {
				if (t.__block) {
					e.blockIndex = t.__idxInPipeline;
					break;
				}
				t = t.getUpstream();
			} while (t);
		});
	}, e.prototype.updatePayload = function(e, t) {
		t !== "remain" && (e.context.payload = t);
	}, e.prototype._createSeriesStageTask = function(e, t, n, r) {
		var i = this, a = t.seriesTaskMap, o = t.seriesTaskMap = J(), s = e.seriesType, c = e.getTargetSeries;
		e.createOnAllSeries ? n.eachRawSeries(l) : s ? n.eachRawSeriesByType(s, l) : c && c(n, r).each(l);
		function l(t) {
			var s = t.uid, c = o.set(s, a && a.get(s) || zv({
				plan: kb,
				reset: Ab,
				count: Nb
			}));
			c.context = {
				model: t,
				ecModel: n,
				api: r,
				useClearVisual: e.isVisual && !e.isLayout,
				plan: e.plan,
				reset: e.reset,
				scheduler: i
			}, i._pipe(t, c);
		}
	}, e.prototype._createOverallStageTask = function(e, t, n, r) {
		var i = this, a = t.overallTask = t.overallTask || zv({ reset: Tb });
		a.context = {
			ecModel: n,
			api: r,
			overallReset: e.overallReset,
			scheduler: i
		};
		var o = a.agentStubMap, s = a.agentStubMap = J(), c = e.seriesType, l = e.getTargetSeries, u = e.dirtyOnOverallProgress, d = !1;
		pn(!e.createOnAllSeries, ""), c ? n.eachRawSeriesByType(c, f) : l ? l(n, r).each(f) : V(n.getSeries(), f);
		function f(e) {
			var t = e.uid, n = s.set(t, o && o.get(t) || (d = !0, zv({
				reset: Eb,
				onDirty: Ob
			})));
			n.context = {
				model: e,
				dirtyOnOverallProgress: u
			}, n.agent = a, n.__block = u, i._pipe(e, n);
		}
		d && a.dirty();
	}, e.prototype._pipe = function(e, t) {
		var n = e.uid, r = this._pipelineMap.get(n);
		!r.head && (r.head = t), r.tail && r.tail.pipe(t), r.tail = t, t.__idxInPipeline = r.count++, t.__pipeline = r;
	}, e.wrapStageHandler = function(e, t) {
		return W(e) && (e = {
			overallReset: e,
			seriesType: Pb(e)
		}), e.uid = zh("stageHandler"), t && (e.visualType = t), e;
	}, e;
}();
function Tb(e) {
	e.overallReset(e.ecModel, e.api, e.payload);
}
function Eb(e) {
	return e.dirtyOnOverallProgress && Db;
}
function Db() {
	this.agent.dirty(), this.getDownstream().dirty();
}
function Ob() {
	this.agent && this.agent.dirty();
}
function kb(e) {
	return e.plan ? e.plan(e.model, e.ecModel, e.api, e.payload) : null;
}
function Ab(e) {
	e.useClearVisual && e.data.clearAllVisual();
	var t = e.resetDefines = ic(e.reset(e.model, e.ecModel, e.api, e.payload));
	return t.length > 1 ? H(t, function(e, t) {
		return Mb(t);
	}) : jb;
}
var jb = Mb(0);
function Mb(e) {
	return function(t, n) {
		var r = n.data, i = n.resetDefines[e];
		if (i && i.dataEach) for (var a = t.start; a < t.end; a++) i.dataEach(r, a);
		else i && i.progress && i.progress(t, r);
	};
}
function Nb(e) {
	return e.data.count();
}
function Pb(e) {
	Lb = null;
	try {
		e(Fb, Ib);
	} catch {}
	return Lb;
}
var Fb = {}, Ib = {}, Lb;
Rb(Fb, x_), Rb(Ib, jd), Fb.eachSeriesByType = Fb.eachRawSeriesByType = function(e) {
	Lb = e;
}, Fb.eachComponent = function(e) {
	e.mainType === "series" && e.subType && (Lb = e.subType);
};
function Rb(e, t) {
	for (var n in t.prototype) e[n] = En;
}
// node_modules/echarts/lib/theme/dark.js
var $ = Kg.darkColor, zb = $.background, Bb = function() {
	return {
		axisLine: { lineStyle: { color: $.axisLine } },
		splitLine: { lineStyle: { color: $.axisSplitLine } },
		splitArea: { areaStyle: { color: [$.backgroundTint, $.backgroundTransparent] } },
		minorSplitLine: { lineStyle: { color: $.axisMinorSplitLine } },
		axisLabel: { color: $.axisLabel },
		axisName: {}
	};
}, Vb = {
	label: { color: $.secondary },
	itemStyle: { borderColor: $.borderTint },
	dividerLineStyle: { color: $.border }
}, Hb = {
	darkMode: !0,
	color: $.theme,
	backgroundColor: zb,
	axisPointer: {
		lineStyle: { color: $.border },
		crossStyle: { color: $.borderShade },
		label: { color: $.tertiary }
	},
	legend: {
		textStyle: { color: $.secondary },
		pageTextStyle: { color: $.tertiary }
	},
	textStyle: { color: $.secondary },
	title: {
		textStyle: { color: $.primary },
		subtextStyle: { color: $.quaternary }
	},
	toolbox: {
		iconStyle: { borderColor: $.accent50 },
		feature: { dataView: {
			backgroundColor: zb,
			textColor: $.primary,
			textareaColor: $.background,
			textareaBorderColor: $.border,
			buttonColor: $.accent50,
			buttonTextColor: $.neutral00
		} }
	},
	tooltip: {
		backgroundColor: $.neutral20,
		defaultBorderColor: $.border,
		textStyle: { color: $.tertiary }
	},
	dataZoom: {
		borderColor: $.accent10,
		textStyle: { color: $.tertiary },
		brushStyle: { color: $.backgroundTint },
		handleStyle: {
			color: $.neutral00,
			borderColor: $.accent20
		},
		moveHandleStyle: { color: $.accent40 },
		emphasis: { handleStyle: { borderColor: $.accent50 } },
		dataBackground: {
			lineStyle: { color: $.accent30 },
			areaStyle: { color: $.accent20 }
		},
		selectedDataBackground: {
			lineStyle: { color: $.accent50 },
			areaStyle: { color: $.accent30 }
		}
	},
	visualMap: {
		textStyle: { color: $.secondary },
		handleStyle: { borderColor: $.neutral30 }
	},
	timeline: {
		lineStyle: { color: $.accent10 },
		label: { color: $.tertiary },
		controlStyle: {
			color: $.accent30,
			borderColor: $.accent30
		}
	},
	calendar: {
		itemStyle: {
			color: $.neutral00,
			borderColor: $.neutral20
		},
		dayLabel: { color: $.tertiary },
		monthLabel: { color: $.secondary },
		yearLabel: { color: $.secondary }
	},
	matrix: {
		x: Vb,
		y: Vb,
		backgroundColor: { borderColor: $.axisLine },
		body: { itemStyle: { borderColor: $.borderTint } }
	},
	timeAxis: Bb(),
	logAxis: Bb(),
	valueAxis: Bb(),
	categoryAxis: Bb(),
	line: { symbol: "circle" },
	graph: { color: $.theme },
	gauge: {
		title: { color: $.secondary },
		axisLine: { lineStyle: { color: [[1, $.neutral05]] } },
		axisLabel: { color: $.axisLabel },
		detail: { color: $.primary }
	},
	candlestick: { itemStyle: {
		color: "#f64e56",
		color0: "#54ea92",
		borderColor: "#f64e56",
		borderColor0: "#54ea92"
	} },
	funnel: { itemStyle: { borderColor: $.background } },
	radar: function() {
		var e = Bb();
		return e.axisName = { color: $.axisLabel }, e.axisLine.lineStyle.color = $.neutral20, e;
	}(),
	treemap: { breadcrumb: {
		itemStyle: {
			color: $.neutral20,
			textStyle: { color: $.secondary }
		},
		emphasis: { itemStyle: { color: $.neutral30 } }
	} },
	sunburst: { itemStyle: { borderColor: $.background } },
	map: {
		itemStyle: {
			borderColor: $.border,
			areaColor: $.neutral10
		},
		label: { color: $.tertiary },
		emphasis: {
			label: { color: $.primary },
			itemStyle: { areaColor: $.highlight }
		},
		select: {
			label: { color: $.primary },
			itemStyle: { areaColor: $.highlight }
		}
	},
	geo: {
		itemStyle: {
			borderColor: $.border,
			areaColor: $.neutral10
		},
		emphasis: {
			label: { color: $.primary },
			itemStyle: { areaColor: $.highlight }
		},
		select: {
			label: { color: $.primary },
			itemStyle: { color: $.highlight }
		}
	}
};
Hb.categoryAxis.splitLine.show = !1;
// node_modules/echarts/lib/util/ECEventProcessor.js
var Ub = function() {
	function e() {}
	return e.prototype.normalizeQuery = function(e) {
		var t = {}, n = {}, r = {};
		if (G(e)) {
			var i = Uc(e);
			t.mainType = i.main || null, t.subType = i.sub || null;
		} else {
			var a = [
				"Index",
				"Name",
				"Id"
			], o = {
				name: 1,
				dataIndex: 1,
				dataType: 1
			};
			V(e, function(e, i) {
				for (var s = !1, c = 0; c < a.length; c++) {
					var l = a[c], u = i.lastIndexOf(l);
					if (u > 0 && u === i.length - l.length) {
						var d = i.slice(0, u);
						d !== "data" && (t.mainType = d, t[l.toLowerCase()] = e, s = !0);
					}
				}
				o.hasOwnProperty(i) && (n[i] = e, s = !0), s || (r[i] = e);
			});
		}
		return {
			cptQuery: t,
			dataQuery: n,
			otherQuery: r
		};
	}, e.prototype.filter = function(e, t) {
		var n = this.eventInfo;
		if (!n) return !0;
		var r = n.targetEl, i = n.packedEvent, a = n.model, o = n.view;
		if (!a || !o) return !0;
		var s = t.cptQuery, c = t.dataQuery;
		return l(s, a, "mainType") && l(s, a, "subType") && l(s, a, "index", "componentIndex") && l(s, a, "name") && l(s, a, "id") && l(c, i, "name") && l(c, i, "dataIndex") && l(c, i, "dataType") && (!o.filterForExposedEvent || o.filterForExposedEvent(e, t.otherQuery, r, i));
		function l(e, t, n, r) {
			return e[n] == null || t[r || n] === e[n];
		}
	}, e.prototype.afterTrigger = function() {
		this.eventInfo = null;
	}, e;
}(), Wb = [
	"symbol",
	"symbolSize",
	"symbolRotate",
	"symbolOffset"
], Gb = Wb.concat(["symbolKeepAspect"]), Kb = {
	createOnAllSeries: !0,
	performRawSeries: !0,
	reset: function(e, t) {
		var n = e.getData();
		if (e.legendIcon && n.setVisual("legendIcon", e.legendIcon), !e.hasSymbolVisual) return;
		for (var r = {}, i = {}, a = !1, o = 0; o < Wb.length; o++) {
			var s = Wb[o], c = e.get(s);
			W(c) ? (a = !0, i[s] = c) : r[s] = c;
		}
		if (r.symbol = r.symbol || e.defaultSymbol, n.setVisual(B({
			legendIcon: e.legendIcon || r.symbol,
			symbolKeepAspect: e.get("symbolKeepAspect")
		}, r)), t.isSeriesFiltered(e)) return;
		var l = Xt(i);
		function u(t, n) {
			for (var r = e.getRawValue(n), a = e.getDataParams(n), o = 0; o < l.length; o++) {
				var s = l[o];
				t.setItemVisual(n, s, i[s](r, a));
			}
		}
		return { dataEach: a ? u : null };
	}
}, qb = {
	createOnAllSeries: !0,
	performRawSeries: !0,
	reset: function(e, t) {
		if (!e.hasSymbolVisual || t.isSeriesFiltered(e)) return;
		var n = e.getData();
		function r(e, t) {
			for (var n = e.getItemModel(t), r = 0; r < Gb.length; r++) {
				var i = Gb[r], a = n.getShallow(i, !0);
				a != null && e.setItemVisual(t, i, a);
			}
		}
		return { dataEach: n.hasItemOption ? r : null };
	}
};
// node_modules/echarts/lib/visual/helper.js
function Jb(e, t, n) {
	switch (n) {
		case "color": return e.getItemVisual(t, "style")[e.getVisual("drawType")];
		case "opacity": return e.getItemVisual(t, "style").opacity;
		case "symbol":
		case "symbolSize":
		case "liftZ": return e.getItemVisual(t, n);
	}
}
function Yb(e, t) {
	switch (t) {
		case "color": return e.getVisual("style")[e.getVisual("drawType")];
		case "opacity": return e.getVisual("style").opacity;
		case "symbol":
		case "symbolSize":
		case "liftZ": return e.getVisual(t);
	}
}
// node_modules/echarts/lib/legacy/dataSelectAction.js
function Xb(e, t) {
	function n(t, n) {
		var r = [];
		return t.eachComponent({
			mainType: "series",
			subType: e,
			query: n
		}, function(e) {
			r.push(e.seriesIndex);
		}), r;
	}
	V([
		[e + "ToggleSelect", "toggleSelect"],
		[e + "Select", "select"],
		[e + "UnSelect", "unselect"]
	], function(e) {
		t(e[0], function(t, r, i) {
			t = B({}, t), i.dispatchAction(B(t, {
				type: e[1],
				seriesIndex: n(r, t)
			}));
		});
	});
}
function Zb(e, t, n, r, i) {
	var a = e + t;
	n.isSilent(a) || r.eachComponent({
		mainType: "series",
		subType: "pie"
	}, function(e) {
		for (var t = e.seriesIndex, r = e.option.selectedMap, o = i.selected, s = 0; s < o.length; s++) if (o[s].seriesIndex === t) {
			var c = e.getData(), l = Cc(c, i.fromActionPayload);
			n.trigger(a, {
				type: a,
				seriesId: e.id,
				name: U(l) ? c.getName(l[0]) : c.getName(l),
				selected: G(r) ? r : B({}, r)
			});
		}
	});
}
function Qb(e, t, n) {
	e.on("selectchanged", function(e) {
		var r = n.getModel();
		e.isFromClick ? (Zb("map", "selectchanged", t, r, e), Zb("pie", "selectchanged", t, r, e)) : e.fromAction === "select" ? (Zb("map", "selected", t, r, e), Zb("pie", "selected", t, r, e)) : e.fromAction === "unselect" && (Zb("map", "unselected", t, r, e), Zb("pie", "unselected", t, r, e));
	});
}
// node_modules/echarts/lib/util/event.js
function $b(e, t, n) {
	for (var r; e && !(t(e) && (r = e, n));) e = e.__hostTarget || e.parent;
	return r;
}
// node_modules/echarts/lib/core/lifecycle.js
var ex = new qn(), tx = {};
function nx(e, t) {
	tx[e] = t;
}
function rx(e) {
	return tx[e];
}
// node_modules/echarts/lib/chart/custom/customSeriesRegister.js
var ix = {};
function ax(e, t) {
	ix[e] = t;
}
// node_modules/echarts/lib/util/cycleCache.js
var ox = Z();
function sx(e) {
	ox(e).prepare = {};
}
function cx(e) {
	ox(e).fullUpdate = {};
}
function lx(e) {
	return ox(e).fullUpdate;
}
// node_modules/zrender/lib/core/WeakMap.js
var ux = Math.round(Math.random() * 9), dx = typeof Object.defineProperty == "function", fx = function() {
	function e() {
		this._id = "__ec_inner_" + ux++;
	}
	return e.prototype.get = function(e) {
		return this._guard(e)[this._id];
	}, e.prototype.set = function(e, t) {
		var n = this._guard(e);
		return dx ? Object.defineProperty(n, this._id, {
			value: t,
			enumerable: !1,
			configurable: !0
		}) : n[this._id] = t, this;
	}, e.prototype.delete = function(e) {
		return this.has(e) ? (delete this._guard(e)[this._id], !0) : !1;
	}, e.prototype.has = function(e) {
		return !!this._guard(e)[this._id];
	}, e.prototype._guard = function(e) {
		if (e !== Object(e)) throw TypeError("Value of WeakMap is not a non-null object.");
		return e;
	}, e;
}(), px = Vu.extend({
	type: "triangle",
	shape: {
		cx: 0,
		cy: 0,
		width: 0,
		height: 0
	},
	buildPath: function(e, t) {
		var n = t.cx, r = t.cy, i = t.width / 2, a = t.height / 2;
		e.moveTo(n, r - a), e.lineTo(n + i, r + a), e.lineTo(n - i, r + a), e.closePath();
	}
}), mx = {
	line: zp,
	rect: td,
	roundRect: td,
	square: td,
	circle: lp,
	diamond: Vu.extend({
		type: "diamond",
		shape: {
			cx: 0,
			cy: 0,
			width: 0,
			height: 0
		},
		buildPath: function(e, t) {
			var n = t.cx, r = t.cy, i = t.width / 2, a = t.height / 2;
			e.moveTo(n, r - a), e.lineTo(n + i, r), e.lineTo(n, r + a), e.lineTo(n - i, r), e.closePath();
		}
	}),
	pin: Vu.extend({
		type: "pin",
		shape: {
			x: 0,
			y: 0,
			width: 0,
			height: 0
		},
		buildPath: function(e, t) {
			var n = t.x, r = t.y, i = t.width / 5 * 3, a = Math.max(i, t.height), o = i / 2, s = o * o / (a - o), c = r - a + o + s, l = Math.asin(s / o), u = Math.cos(l) * o, d = Math.sin(l), f = Math.cos(l), p = o * .6, m = o * .7;
			e.moveTo(n - u, c + s), e.arc(n, c, o, Math.PI - l, Math.PI * 2 + l), e.bezierCurveTo(n + u - d * p, c + s + f * p, n, r - m, n, r), e.bezierCurveTo(n, r - m, n - u + d * p, c + s + f * p, n - u, c + s), e.closePath();
		}
	}),
	arrow: Vu.extend({
		type: "arrow",
		shape: {
			x: 0,
			y: 0,
			width: 0,
			height: 0
		},
		buildPath: function(e, t) {
			var n = t.height, r = t.width, i = t.x, a = t.y, o = r / 3 * 2;
			e.moveTo(i, a), e.lineTo(i + o, a + n), e.lineTo(i, a + n / 4 * 3), e.lineTo(i - o, a + n), e.lineTo(i, a), e.closePath();
		}
	}),
	triangle: px
}, hx = {
	line: function(e, t, n, r, i) {
		i.x1 = e, i.y1 = t + r / 2, i.x2 = e + n, i.y2 = t + r / 2;
	},
	rect: function(e, t, n, r, i) {
		i.x = e, i.y = t, i.width = n, i.height = r;
	},
	roundRect: function(e, t, n, r, i) {
		i.x = e, i.y = t, i.width = n, i.height = r, i.r = Math.min(n, r) / 4;
	},
	square: function(e, t, n, r, i) {
		var a = Math.min(n, r);
		i.x = e, i.y = t, i.width = a, i.height = a;
	},
	circle: function(e, t, n, r, i) {
		i.cx = e + n / 2, i.cy = t + r / 2, i.r = Math.min(n, r) / 2;
	},
	diamond: function(e, t, n, r, i) {
		i.cx = e + n / 2, i.cy = t + r / 2, i.width = n, i.height = r;
	},
	pin: function(e, t, n, r, i) {
		i.x = e + n / 2, i.y = t + r / 2, i.width = n, i.height = r;
	},
	arrow: function(e, t, n, r, i) {
		i.x = e + n / 2, i.y = t + r / 2, i.width = n, i.height = r;
	},
	triangle: function(e, t, n, r, i) {
		i.cx = e + n / 2, i.cy = t + r / 2, i.width = n, i.height = r;
	}
}, gx = {};
V(mx, function(e, t) {
	gx[t] = new e();
});
var _x = Vu.extend({
	type: "symbol",
	shape: {
		symbolType: "",
		x: 0,
		y: 0,
		width: 0,
		height: 0
	},
	calculateTextPosition: function(e, t, n) {
		var r = Ko(e, t, n), i = this.shape;
		return i && i.symbolType === "pin" && t.position === "inside" && (r.y = n.y + n.height * .4), r;
	},
	buildPath: function(e, t, n) {
		var r = t.symbolType;
		if (r !== "none") {
			var i = gx[r];
			i ||= (r = "rect", gx[r]), hx[r](t.x, t.y, t.width, t.height, i.shape), i.buildPath(e, i.shape, n);
		}
	}
});
function vx(e, t) {
	if (this.type !== "image") {
		var n = this.style;
		this.__isEmptyBrush ? (n.stroke = e, n.fill = t || Kg.color.neutral00, n.lineWidth = 2) : this.shape.symbolType === "line" ? n.stroke = e : n.fill = e, this.markRedraw();
	}
}
function yx(e, t, n, r, i, a, o) {
	var s = e.indexOf("empty") === 0;
	s && (e = e.substr(5, 1).toLowerCase() + e.substr(6));
	var c = e.indexOf("image://") === 0 ? Dm(e.slice(8), new X(t, n, r, i), o ? "center" : "cover") : e.indexOf("path://") === 0 ? Em(e.slice(7), {}, new X(t, n, r, i), o ? "center" : "cover") : new _x({ shape: {
		symbolType: e,
		x: t,
		y: n,
		width: r,
		height: i
	} });
	return c.__isEmptyBrush = s, c.setColor = vx, a && c.setColor(a), c;
}
function bx(e, t) {
	if (e != null) return U(e) || (e = [e, e]), [As(e[0], t[0]) || 0, As(q(e[1], e[0]), t[1]) || 0];
}
// node_modules/zrender/lib/canvas/helper.js
function xx(e) {
	return isFinite(e);
}
function Sx(e, t, n) {
	var r = t.x == null ? 0 : t.x, i = t.x2 == null ? 1 : t.x2, a = t.y == null ? 0 : t.y, o = t.y2 == null ? 0 : t.y2;
	return t.global || (r = r * n.width + n.x, i = i * n.width + n.x, a = a * n.height + n.y, o = o * n.height + n.y), r = xx(r) ? r : 0, i = xx(i) ? i : 1, a = xx(a) ? a : 0, o = xx(o) ? o : 0, e.createLinearGradient(r, a, i, o);
}
function Cx(e, t, n) {
	var r = n.width, i = n.height, a = Math.min(r, i), o = t.x == null ? .5 : t.x, s = t.y == null ? .5 : t.y, c = t.r == null ? .5 : t.r;
	return t.global || (o = o * r + n.x, s = s * i + n.y, c *= a), o = xx(o) ? o : .5, s = xx(s) ? s : .5, c = c >= 0 && xx(c) ? c : .5, e.createRadialGradient(o, s, 0, o, s, c);
}
function Tx(e, t, n) {
	for (var r = t.type === "radial" ? Cx(e, t, n) : Sx(e, t, n), i = t.colorStops, a = 0; a < i.length; a++) r.addColorStop(i[a].offset, i[a].color);
	return r;
}
function Ex(e, t) {
	if (e === t || !e && !t) return !1;
	if (!e || !t || e.length !== t.length) return !0;
	for (var n = 0; n < e.length; n++) if (e[n] !== t[n]) return !0;
	return !1;
}
function Dx(e) {
	return parseInt(e, 10);
}
function Ox(e, t, n) {
	var r = ["width", "height"][t], i = ["clientWidth", "clientHeight"][t], a = ["paddingLeft", "paddingTop"][t], o = ["paddingRight", "paddingBottom"][t];
	if (n[r] != null && n[r] !== "auto") return parseFloat(n[r]);
	var s = document.defaultView.getComputedStyle(e);
	return (e[i] || Dx(s[r]) || Dx(e.style[r])) - (Dx(s[a]) || 0) - (Dx(s[o]) || 0) || 0;
}
// node_modules/zrender/lib/canvas/dashStyle.js
function kx(e, t) {
	return !e || e === "solid" || !(t > 0) ? null : e === "dashed" ? [4 * t, 2 * t] : e === "dotted" ? [t] : tn(e) ? [e] : U(e) ? e : null;
}
function Ax(e) {
	var t = e.style, n = t.lineDash && t.lineWidth > 0 && kx(t.lineDash, t.lineWidth), r = t.lineDashOffset;
	if (n) {
		var i = t.strokeNoScale && e.getLineScale ? e.getLineScale() : 1;
		i && i !== 1 && (n = H(n, function(e) {
			return e / i;
		}), r /= i);
	}
	return [n, r];
}
// node_modules/zrender/lib/canvas/graphic.js
var jx = new gu(!0);
function Mx(e) {
	var t = e.stroke;
	return !(t == null || t === "none" || !(e.lineWidth > 0));
}
function Nx(e) {
	return typeof e == "string" && e !== "none";
}
function Px(e) {
	var t = e.fill;
	return t != null && t !== "none";
}
function Fx(e, t) {
	if (t.fillOpacity != null && t.fillOpacity !== 1) {
		var n = e.globalAlpha;
		e.globalAlpha = t.fillOpacity * t.opacity, e.fill(), e.globalAlpha = n;
	} else e.fill();
}
function Ix(e, t) {
	if (t.strokeOpacity != null && t.strokeOpacity !== 1) {
		var n = e.globalAlpha;
		e.globalAlpha = t.strokeOpacity * t.opacity, e.stroke(), e.globalAlpha = n;
	} else e.stroke();
}
function Lx(e, t, n) {
	var r = al(t.image, t.__image, n);
	if (sl(r)) {
		var i = e.createPattern(r, t.repeat || "repeat");
		if (typeof DOMMatrix == "function" && i && i.setTransform) {
			var a = new DOMMatrix();
			a.translateSelf(t.x || 0, t.y || 0), a.rotateSelf(0, 0, (t.rotation || 0) * Dn), a.scaleSelf(t.scaleX || 1, t.scaleY || 1), i.setTransform(a);
		}
		return i;
	}
}
function Rx(e, t, n, r, i) {
	var a, o = Mx(n), s = Px(n), c = n.strokePercent, l = c < 1, u = !t.path;
	(!t.silent || l) && u && t.createPathProxy();
	var d = t.path || jx, f = t.__dirty;
	if (!r) {
		var p = n.fill, m = n.stroke, h = s && !!p.colorStops, g = o && !!m.colorStops, _ = s && !!p.image, v = o && !!m.image, y = void 0, b = void 0, x = void 0, S = void 0, C = void 0;
		(h || g) && (C = t.getBoundingRect()), h && (y = f ? Tx(e, p, C) : t.__canvasFillGradient, t.__canvasFillGradient = y), g && (b = f ? Tx(e, m, C) : t.__canvasStrokeGradient, t.__canvasStrokeGradient = b), _ && (x = f || !t.__canvasFillPattern ? Lx(e, p, t) : t.__canvasFillPattern, t.__canvasFillPattern = x), v && (S = f || !t.__canvasStrokePattern ? Lx(e, m, t) : t.__canvasStrokePattern, t.__canvasStrokePattern = S), h ? e.fillStyle = y : _ && (x ? e.fillStyle = x : s = !1), g ? e.strokeStyle = b : v && (S ? e.strokeStyle = S : o = !1);
	}
	var w = t.getGlobalScale();
	d.setScale(w[0], w[1], t.segmentIgnoreThreshold);
	var T, E;
	e.setLineDash && n.lineDash && (a = Ax(t), T = a[0], E = a[1]);
	var D = !0;
	(u || f & 4) && (d.setDPR(e.dpr), l ? d.setContext(null) : (d.setContext(e), D = !1), d.reset(), t.buildPath(d, t.shape, r), d.toStatic(), t.pathUpdated()), D && d.rebuildPath(e, l ? c : 1), T && (e.setLineDash(T), e.lineDashOffset = E), r ? (i.batchFill = s, i.batchStroke = o) : n.strokeFirst ? (o && Ix(e, n), s && Fx(e, n)) : (s && Fx(e, n), o && Ix(e, n)), T && e.setLineDash([]);
}
function zx(e, t, n) {
	var r = t.__image = al(n.image, t.__image, t, t.onload);
	if (r && sl(r)) {
		var i = n.x || 0, a = n.y || 0, o = t.getWidth(), s = t.getHeight(), c = r.width / r.height;
		if (o == null && s != null ? o = s * c : s == null && o != null ? s = o / c : o == null && s == null && (o = r.width, s = r.height), n.sWidth && n.sHeight) {
			var l = n.sx || 0, u = n.sy || 0;
			e.drawImage(r, l, u, n.sWidth, n.sHeight, i, a, o, s);
		} else if (n.sx && n.sy) {
			var l = n.sx, u = n.sy, d = o - l, f = s - u;
			e.drawImage(r, l, u, d, f, i, a, o, s);
		} else e.drawImage(r, i, a, o, s);
	}
}
function Bx(e, t, n) {
	var r, i = n.text;
	if (i != null && (i += ""), i) {
		e.font = n.font || "12px sans-serif", e.textAlign = n.textAlign, e.textBaseline = n.textBaseline;
		var a = void 0, o = void 0;
		e.setLineDash && n.lineDash && (r = Ax(t), a = r[0], o = r[1]), a && (e.setLineDash(a), e.lineDashOffset = o), n.strokeFirst ? (Mx(n) && e.strokeText(i, n.x, n.y), Px(n) && e.fillText(i, n.x, n.y)) : (Px(n) && e.fillText(i, n.x, n.y), Mx(n) && e.strokeText(i, n.x, n.y)), a && e.setLineDash([]);
	}
}
var Vx = [
	"shadowBlur",
	"shadowOffsetX",
	"shadowOffsetY"
], Hx = [
	["lineCap", "butt"],
	["lineJoin", "miter"],
	["miterLimit", 10]
];
function Ux(e, t, n, r, i) {
	var a = !1;
	if (!r && (n ||= {}, t === n)) return !1;
	if (r || t.opacity !== n.opacity) {
		eS(e, i), a = !0;
		var o = Math.max(Math.min(t.opacity, 1), 0);
		e.globalAlpha = isNaN(o) ? jl.opacity : o;
	}
	(r || t.blend !== n.blend) && (a ||= (eS(e, i), !0), e.globalCompositeOperation = t.blend || jl.blend);
	for (var s = 0; s < Vx.length; s++) {
		var c = Vx[s];
		(r || t[c] !== n[c]) && (a ||= (eS(e, i), !0), e[c] = e.dpr * (t[c] || 0));
	}
	return (r || t.shadowColor !== n.shadowColor) && (a ||= (eS(e, i), !0), e.shadowColor = t.shadowColor || jl.shadowColor), a;
}
function Wx(e, t, n, r, i) {
	var a = t.style, o = r ? null : n && n.style || {};
	if (a === o) return !1;
	var s = Ux(e, a, o, r, i);
	if ((r || a.fill !== o.fill) && (s ||= (eS(e, i), !0), Nx(a.fill) && (e.fillStyle = a.fill)), (r || a.stroke !== o.stroke) && (s ||= (eS(e, i), !0), Nx(a.stroke) && (e.strokeStyle = a.stroke)), (r || a.opacity !== o.opacity) && (s ||= (eS(e, i), !0), e.globalAlpha = a.opacity == null ? 1 : a.opacity), t.hasStroke()) {
		var c = a.lineWidth / (a.strokeNoScale && t.getLineScale ? t.getLineScale() : 1);
		e.lineWidth !== c && (s ||= (eS(e, i), !0), e.lineWidth = c);
	}
	for (var l = 0; l < Hx.length; l++) {
		var u = Hx[l], d = u[0];
		(r || a[d] !== o[d]) && (s ||= (eS(e, i), !0), e[d] = a[d] || u[1]);
	}
	return s;
}
function Gx(e, t, n, r, i) {
	return Ux(e, t.style, n && n.style, r, i);
}
function Kx(e, t) {
	var n = t.transform, r = e.dpr || 1;
	n ? e.setTransform(r * n[0], r * n[1], r * n[2], r * n[3], r * n[4], r * n[5]) : e.setTransform(r, 0, 0, r, 0, 0);
}
function qx(e, t, n) {
	for (var r = !1, i = 0; i < e.length; i++) {
		var a = e[i];
		r ||= a.isZeroArea(), Kx(t, a), t.beginPath(), a.buildPath(t, a.shape), t.clip();
	}
	n.allClipped = r;
}
function Jx(e, t) {
	return e && t ? e[0] !== t[0] || e[1] !== t[1] || e[2] !== t[2] || e[3] !== t[3] || e[4] !== t[4] || e[5] !== t[5] : !(!e && !t);
}
var Yx = 1, Xx = 2, Zx = 3, Qx = 4;
function $x(e) {
	var t = Px(e), n = Mx(e);
	return !(e.lineDash || !(+t ^ n) || t && typeof e.fill != "string" || n && typeof e.stroke != "string" || e.strokePercent < 1 || e.strokeOpacity < 1 || e.fillOpacity < 1);
}
function eS(e, t) {
	t.batchFill && (t.batchFill = !1, e.fill()), t.batchStroke && (t.batchStroke = !1, e.stroke());
}
function tS(e, t) {
	var n = {
		inHover: !1,
		viewWidth: 0,
		viewHeight: 0,
		beforeBrushParam: {}
	};
	nS(e, t, n), rS(e, n);
}
function nS(e, t, n) {
	var r = t.transform;
	if (!t.shouldBePainted(n.viewWidth, n.viewHeight, !1, !1)) t.__dirty &= -2, t.__isRendered = !1;
	else {
		var i = t.__clipPaths, a = n.prevElClipPaths, o = t.style, s = !1, c = !1;
		if ((!a || Ex(i, a)) && (a && (eS(e, n), e.restore(), c = s = !0, n.prevElClipPaths = null, n.allClipped = !1, n.prevEl = null), i && i.length && (eS(e, n), e.save(), qx(i, e, n), s = !0, n.prevElClipPaths = i)), n.allClipped) t.__dirty &= -2, t.__isRendered = !1;
		else {
			t.beforeBrush && t.beforeBrush(n.beforeBrushParam), t.innerBeforeBrush();
			var l = n.prevEl;
			l || (c = s = !0);
			var u = t instanceof Vu && t.autoBatch && $x(o);
			s || Jx(r, l.transform) ? (eS(e, n), Kx(e, t)) : u || eS(e, n), t instanceof Vu ? (n.lastDrawType !== Yx && (c = !0, n.lastDrawType = Yx), Wx(e, t, l, c, n), u && (n.batchFill || n.batchStroke) || e.beginPath(), Rx(e, t, o, u, n)) : t instanceof Uu ? (n.lastDrawType !== Zx && (c = !0, n.lastDrawType = Zx), Wx(e, t, l, c, n), Bx(e, t, o)) : t instanceof qu ? (n.lastDrawType !== Xx && (c = !0, n.lastDrawType = Xx), Gx(e, t, l, c, n), zx(e, t, o)) : t.getTemporalDisplayables && (n.lastDrawType !== Qx && (c = !0, n.lastDrawType = Qx), iS(e, t, n)), t.innerAfterBrush(), t.afterBrush && (u && eS(e, n), t.afterBrush()), n.prevEl = t, t.__dirty = 0, t.__isRendered = !0;
		}
	}
}
function rS(e, t) {
	eS(e, t), t.prevElClipPaths && e.restore();
}
function iS(e, t, n) {
	var r = t.getDisplayables(), i = t.getTemporalDisplayables();
	e.save();
	for (var a = {
		prevElClipPaths: null,
		prevEl: null,
		allClipped: !1,
		viewWidth: n.viewWidth,
		viewHeight: n.viewHeight,
		inHover: n.inHover,
		beforeBrushParam: {}
	}, o = t.getCursor(), s = r.length; o < s; o++) {
		var c = r[o];
		c.beforeBrush && c.beforeBrush(n.beforeBrushParam), c.innerBeforeBrush(), nS(e, c, a), c.innerAfterBrush(), c.afterBrush && c.afterBrush(), a.prevEl = c;
	}
	rS(e, a);
	for (var l = 0, u = i.length; l < u; l++) {
		var c = i[l];
		c.beforeBrush && c.beforeBrush(n.beforeBrushParam), c.innerBeforeBrush(), nS(e, c, a), c.innerAfterBrush(), c.afterBrush && c.afterBrush(), a.prevEl = c;
	}
	rS(e, a), t.clearTemporalDisplayables(), t.notClear = !0, e.restore();
}
// node_modules/echarts/lib/util/decal.js
var aS = new fx(), oS = new ta(100), sS = [
	"symbol",
	"symbolSize",
	"symbolKeepAspect",
	"color",
	"backgroundColor",
	"dashArrayX",
	"dashArrayY",
	"maxTileWidth",
	"maxTileHeight"
];
function cS(e, t) {
	if (e === "none") return null;
	var n = t.getDevicePixelRatio(), r = t.getZr(), i = r.painter.type === "svg";
	e.dirty && aS.delete(e);
	var a = aS.get(e);
	if (a) return a;
	var o = Ut(e, {
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
	var s = { repeat: "repeat" };
	return c(s), s.rotation = o.rotation, s.scaleX = s.scaleY = i ? 1 : 1 / n, aS.set(e, s), e.dirty = !1, s;
	function c(e) {
		for (var t = [n], a = !0, s = 0; s < sS.length; ++s) {
			var c = o[sS[s]];
			if (c != null && !U(c) && !G(c) && !tn(c) && typeof c != "boolean") {
				a = !1;
				break;
			}
			t.push(c);
		}
		var l;
		if (a) {
			l = t.join(",") + (i ? "-svg" : "");
			var u = oS.get(l);
			u && (i ? e.svgElement = u : e.image = u);
		}
		var d = uS(o.dashArrayX), f = dS(o.dashArrayY), p = lS(o.symbol), m = fS(d), h = pS(f), g = !i && Tt.createCanvas(), _ = i && {
			tag: "g",
			attrs: {},
			key: "dcl",
			children: []
		}, v = b(), y;
		g && (g.width = v.width * n, g.height = v.height * n, y = g.getContext("2d")), x(), a && oS.put(l, g || _), e.image = g, e.svgElement = _, e.svgWidth = v.width, e.svgHeight = v.height;
		function b() {
			for (var e = 1, t = 0, n = m.length; t < n; ++t) e = Js(e, m[t]);
			for (var r = 1, t = 0, n = p.length; t < n; ++t) r = Js(r, p[t].length);
			e *= r;
			var i = h * m.length * p.length;
			return {
				width: Math.max(1, Math.min(e, o.maxTileWidth)),
				height: Math.max(1, Math.min(i, o.maxTileHeight))
			};
		}
		function x() {
			y && (y.clearRect(0, 0, g.width, g.height), o.backgroundColor && (y.fillStyle = o.backgroundColor, y.fillRect(0, 0, g.width, g.height)));
			for (var e = 0, t = 0; t < f.length; ++t) e += f[t];
			if (e <= 0) return;
			for (var a = -h, s = 0, c = 0, l = 0; a < v.height;) {
				if (s % 2 == 0) {
					for (var u = c / 2 % p.length, m = 0, b = 0, x = 0; m < v.width * 2;) {
						for (var S = 0, t = 0; t < d[l].length; ++t) S += d[l][t];
						if (S <= 0) break;
						if (b % 2 == 0) {
							var C = (1 - o.symbolSize) * .5, w = m + d[l][b] * C, T = a + f[s] * C, E = d[l][b] * o.symbolSize, D = f[s] * o.symbolSize, O = x / 2 % p[u].length;
							k(w, T, E, D, p[u][O]);
						}
						m += d[l][b], ++x, ++b, b === d[l].length && (b = 0);
					}
					++l, l === d.length && (l = 0);
				}
				a += f[s], ++c, ++s, s === f.length && (s = 0);
			}
			function k(e, t, a, s, c) {
				var l = i ? 1 : n, u = yx(c, e * l, t * l, a * l, s * l, o.color, o.symbolKeepAspect);
				if (i) {
					var d = r.painter.renderOneToVNode(u);
					d && _.children.push(d);
				} else tS(y, u);
			}
		}
	}
}
function lS(e) {
	if (!e || e.length === 0) return [["rect"]];
	if (G(e)) return [[e]];
	for (var t = !0, n = 0; n < e.length; ++n) if (!G(e[n])) {
		t = !1;
		break;
	}
	if (t) return lS([e]);
	for (var r = [], n = 0; n < e.length; ++n) G(e[n]) ? r.push([e[n]]) : r.push(e[n]);
	return r;
}
function uS(e) {
	if (!e || e.length === 0) return [[0, 0]];
	if (tn(e)) {
		var t = Math.ceil(e);
		return [[t, t]];
	}
	for (var n = !0, r = 0; r < e.length; ++r) if (!tn(e[r])) {
		n = !1;
		break;
	}
	if (n) return uS([e]);
	for (var i = [], r = 0; r < e.length; ++r) if (tn(e[r])) {
		var t = Math.ceil(e[r]);
		i.push([t, t]);
	} else {
		var t = H(e[r], function(e) {
			return Math.ceil(e);
		});
		t.length % 2 == 1 ? i.push(t.concat(t)) : i.push(t);
	}
	return i;
}
function dS(e) {
	if (!e || typeof e == "object" && e.length === 0) return [0, 0];
	if (tn(e)) {
		var t = Math.ceil(e);
		return [t, t];
	}
	var n = H(e, function(e) {
		return Math.ceil(e);
	});
	return e.length % 2 ? n.concat(n) : n;
}
function fS(e) {
	return H(e, function(e) {
		return pS(e);
	});
}
function pS(e) {
	for (var t = 0, n = 0; n < e.length; ++n) t += e[n];
	return e.length % 2 == 1 ? t * 2 : t;
}
// node_modules/echarts/lib/visual/decal.js
var mS = zc(hS);
function hS(e, t) {
	e.eachRawSeries(function(n) {
		if (!e.isSeriesFiltered(n)) {
			var r = n.getData();
			r.hasItemVisual() && r.each(function(e) {
				var n = r.getItemVisual(e, "decal");
				if (n) {
					var i = r.ensureUniqueItemVisual(e, "style");
					i.decal = cS(n, t);
				}
			});
			var i = r.getVisual("decal");
			if (i) {
				var a = r.getVisual("style");
				a.decal = cS(i, t);
			}
		}
	});
}
// node_modules/echarts/lib/core/echarts.js
var gS = 1, _S = 800, vS = 900, yS = 920, bS = 1e3, xS = 2e3, SS = 5e3, CS = 1e3, wS = 1100, TS = 2e3, ES = 3e3, DS = 4e3, OS = 4500, kS = 4600, AS = 5e3, jS = 6e3, MS = 7e3, NS = {
	PROCESSOR: {
		SERIES_FILTER: _S,
		AXIS_STATISTICS: yS,
		FILTER: bS,
		STATISTIC: SS,
		STATISTICS: SS
	},
	VISUAL: {
		LAYOUT: CS,
		PROGRESSIVE_LAYOUT: wS,
		GLOBAL: TS,
		CHART: ES,
		POST_CHART_LAYOUT: kS,
		COMPONENT: DS,
		BRUSH: AS,
		CHART_ITEM: OS,
		ARIA: jS,
		DECAL: MS
	}
}, PS = "__flagInMainProcess", FS = "__mainProcessVersion", IS = "__pendingUpdate", LS = "__needsUpdateStatus", RS = /^[a-zA-Z0-9_]+$/, zS = "__connectUpdateStatus", BS = 0, VS = 1, HS = 2;
function US(e) {
	return function() {
		var t = [...arguments];
		if (this.isDisposed()) this.id;
		else return GS(this, e, t);
	};
}
function WS(e) {
	return function() {
		var t = [...arguments];
		return GS(this, e, t);
	};
}
function GS(e, t, n) {
	return n[0] = n[0] && n[0].toLowerCase(), qn.prototype[t].apply(e, n);
}
var KS = function(e) {
	L(t, e);
	function t() {
		return e !== null && e.apply(this, arguments) || this;
	}
	return t;
}(qn), qS = KS.prototype;
qS.on = WS("on"), qS.off = WS("off");
var JS, YS, XS, ZS, QS, $S, eC, tC, nC, rC, iC, aC, oC, sC, cC, lC, uC, dC, fC, pC = function(e) {
	L(t, e);
	function t(t, n, r) {
		var i = e.call(this, new Ub()) || this;
		i._chartsViews = [], i._chartsMap = {}, i._componentsViews = [], i._componentsMap = {}, i._pendingActions = [], r ||= {}, i.__v_skip = !0, i._dom = t;
		var a = "canvas", o = "auto", s = !1;
		i[FS] = 1, r.ssr;
		var c = i._zr = gs(t, {
			renderer: r.renderer || a,
			devicePixelRatio: r.devicePixelRatio,
			width: r.width,
			height: r.height,
			ssr: r.ssr,
			useDirtyRect: q(r.useDirtyRect, s),
			useCoarsePointer: q(r.useCoarsePointer, o),
			pointerSize: r.pointerSize
		});
		i._ssr = r.ssr, i._throttledZrFlush = ub(Qt(c.flush, c), 17), i._updateTheme(n), i._locale = Zh(r.locale || Yh), i._coordSysMgr = new Tg();
		var l = i._api = cC(i);
		function u(e, t) {
			return e.__prio - t.__prio;
		}
		return vi(xC, u), vi(yC, u), i._scheduler = new wb(i, l, yC, xC), i._messageCenter = new KS(), i._initEvents(), i.resize = Qt(i.resize, i), c.animation.on("frame", i._onframe, i), rC(c, i), iC(c, i), gn(i), i;
	}
	return t.prototype._onframe = function() {
		if (!this._disposed) {
			var e = this._scheduler, t = this._model, n = this._api;
			if (dC(this), this[IS]) {
				var r = this[IS].silent;
				this[PS] = !0, fC(this);
				try {
					JS(this), ZS.update.call(this, null, this[IS].updateParams);
				} catch (e) {
					throw this[PS] = !1, this[IS] = null, e;
				}
				this._zr.flush(), this[PS] = !1, this[IS] = null, tC.call(this, r), nC.call(this, r);
			} else if (e.unfinished) {
				var i = gS;
				do {
					e.unfinished = !1;
					var a = Tt.getTime();
					e.performSeriesTasks(t), e.performDataProcessorTasks(t), $S(this, t), e.performVisualTasks(t), sC(this, this._model, n, "remain", {}), i -= Tt.getTime() - a;
				} while (i > 0 && e.unfinished);
				e.unfinished || this._zr.flush();
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
	}, t.prototype.setOption = function(e, t, n) {
		if (!this[PS]) {
			if (this._disposed) this.id;
			else {
				var r, i, a;
				if (K(t) && (n = t.lazyUpdate, r = t.silent, i = t.replaceMerge, a = t.transition, t = t.notMerge), this[PS] = !0, fC(this), !this._model || t) {
					var o = new O_(this._api), s = this._theme, c = this._model = new x_();
					c.scheduler = this._scheduler, c.ssr = this._ssr, c.init(null, null, null, s, this._locale, o);
				}
				this._model.setOption(e, { replaceMerge: i }, bC);
				var l = {
					seriesTransition: a,
					optionChanged: !0
				};
				if (n) this[IS] = {
					silent: r,
					updateParams: l
				}, this[PS] = !1, this.getZr().wakeUp();
				else {
					try {
						JS(this), ZS.update.call(this, null, l);
					} catch (e) {
						throw this[IS] = null, this[PS] = !1, e;
					}
					this._ssr || this._zr.flush(), this[IS] = null, this[PS] = !1, tC.call(this, r), nC.call(this, r);
				}
			}
		}
	}, t.prototype.setTheme = function(e, t) {
		if (!this[PS]) {
			if (this._disposed) this.id;
			else {
				var n = this._model;
				if (n) {
					var r = t && t.silent, i = null;
					this[IS] && (r ??= this[IS].silent, i = this[IS].updateParams, this[IS] = null), this[PS] = !0, fC(this);
					try {
						this._updateTheme(e), n.setTheme(this._theme), JS(this), ZS.update.call(this, { type: "setTheme" }, i);
					} catch (e) {
						throw this[PS] = !1, e;
					}
					this[PS] = !1, tC.call(this, r), nC.call(this, r);
				}
			}
		}
	}, t.prototype._updateTheme = function(e) {
		G(e) && (e = SC[e]), e && (e = z(e), e && nv(e, !0), this._theme = e);
	}, t.prototype.getModel = function() {
		return this._model;
	}, t.prototype.getOption = function() {
		return this._model && this._model.getOption();
	}, t.prototype.getWidth = function() {
		return this._zr.getWidth();
	}, t.prototype.getHeight = function() {
		return this._zr.getHeight();
	}, t.prototype.getDevicePixelRatio = function() {
		return this._zr.painter.dpr || R.hasGlobalWindow && window.devicePixelRatio || 1;
	}, t.prototype.getRenderedCanvas = function(e) {
		return this.renderToCanvas(e);
	}, t.prototype.renderToCanvas = function(e) {
		return e ||= {}, this._zr.painter.getRenderedCanvas({
			backgroundColor: e.backgroundColor || this._model.get("backgroundColor"),
			pixelRatio: e.pixelRatio || this.getDevicePixelRatio()
		});
	}, t.prototype.renderToSVGString = function(e) {
		return e ||= {}, this._zr.painter.renderToString({ useViewBox: e.useViewBox });
	}, t.prototype.getSvgDataURL = function() {
		var e = this._zr;
		return V(e.storage.getDisplayList(), function(e) {
			e.stopAnimation(null, !0);
		}), e.painter.toDataURL();
	}, t.prototype.getDataURL = function(e) {
		if (this._disposed) this.id;
		else {
			e ||= {};
			var t = e.excludeComponents, n = this._model, r = [], i = this;
			V(t, function(e) {
				n.eachComponent({ mainType: e }, function(e) {
					var t = i._componentsMap[e.__viewId];
					t.group.ignore || (r.push(t), t.group.ignore = !0);
				});
			});
			var a = this._zr.painter.getType() === "svg" ? this.getSvgDataURL() : this.renderToCanvas(e).toDataURL("image/" + (e && e.type || "png"));
			return V(r, function(e) {
				e.group.ignore = !1;
			}), a;
		}
	}, t.prototype.getConnectedDataURL = function(e) {
		if (this._disposed) this.id;
		else {
			var t = e.type === "svg", n = this.group, r = Math.min, i = Math.max, a = Infinity;
			if (TC[n]) {
				var o = a, s = a, c = -a, l = -a, u = [], d = e && e.pixelRatio || this.getDevicePixelRatio();
				V(wC, function(a, d) {
					if (a.group === n) {
						var f = t ? a.getZr().painter.getSvgDom().innerHTML : a.renderToCanvas(z(e)), p = a.getDom().getBoundingClientRect();
						o = r(p.left, o), s = r(p.top, s), c = i(p.right, c), l = i(p.bottom, l), u.push({
							dom: f,
							left: p.left,
							top: p.top
						});
					}
				}), o *= d, s *= d, c *= d, l *= d;
				var f = c - o, p = l - s, m = Tt.createCanvas(), h = gs(m, { renderer: t ? "svg" : "canvas" });
				if (h.resize({
					width: f,
					height: p
				}), t) {
					var g = "";
					return V(u, function(e) {
						var t = e.left - o, n = e.top - s;
						g += "<g transform=\"translate(" + t + "," + n + ")\">" + e.dom + "</g>";
					}), h.painter.getSvgRoot().innerHTML = g, e.connectedBackgroundColor && h.painter.setBackgroundColor(e.connectedBackgroundColor), h.refreshImmediately(), h.painter.toDataURL();
				}
				return e.connectedBackgroundColor && h.add(new td({
					shape: {
						x: 0,
						y: 0,
						width: f,
						height: p
					},
					style: { fill: e.connectedBackgroundColor }
				})), V(u, function(e) {
					var t = new qu({ style: {
						x: e.left * d - o,
						y: e.top * d - s,
						image: e.dom
					} });
					h.add(t);
				}), h.refreshImmediately(), m.toDataURL("image/" + (e && e.type || "png"));
			}
			return this.getDataURL(e);
		}
	}, t.prototype.convertToPixel = function(e, t, n) {
		return QS(this, "convertToPixel", e, t, n);
	}, t.prototype.convertToLayout = function(e, t, n) {
		return QS(this, "convertToLayout", e, t, n);
	}, t.prototype.convertFromPixel = function(e, t, n) {
		return QS(this, "convertFromPixel", e, t, n);
	}, t.prototype.containPixel = function(e, t) {
		if (this._disposed) this.id;
		else {
			var n = this._model, r;
			return V(Tc(n, e), function(e, n) {
				n.indexOf("Models") >= 0 && V(e, function(e) {
					var i = e.coordinateSystem;
					if (i && i.containPoint) r ||= !!i.containPoint(t);
					else if (n === "seriesModels") {
						var a = this._chartsMap[e.__viewId];
						a && a.containPoint && (r ||= a.containPoint(t, e));
					}
				}, this);
			}, this), !!r;
		}
	}, t.prototype.getVisual = function(e, t) {
		var n = this._model, r = Tc(n, e, { defaultMainType: "series" }), i = r.seriesModel.getData(), a = r.hasOwnProperty("dataIndexInside") ? r.dataIndexInside : r.hasOwnProperty("dataIndex") ? i.indexOfRawIndex(r.dataIndex) : null;
		return a == null ? Yb(i, t) : Jb(i, a, t);
	}, t.prototype.getViewOfComponentModel = function(e) {
		return this._componentsMap[e.__viewId];
	}, t.prototype.getViewOfSeriesModel = function(e) {
		return this._chartsMap[e.__viewId];
	}, t.prototype._initEvents = function() {
		var e = this;
		V(hC, function(t) {
			var n = function(n) {
				var r = e.getModel(), i = n.target, a;
				if (t === "globalout" ? a = {} : i && $b(i, function(e) {
					var t = bd(e);
					if (t && t.dataIndex != null) {
						var n = t.dataModel || r.getSeriesByIndex(t.seriesIndex);
						return a = n && n.getDataParams(t.dataIndex, t.dataType, i) || {}, !0;
					}
					if (t.eventData) return a = B({}, t.eventData), !0;
				}, !0), a) {
					var o = a.componentType, s = a.componentIndex;
					(o === "markLine" || o === "markPoint" || o === "markArea") && (o = "series", s = a.seriesIndex);
					var c = o && s != null && r.getComponent(o, s), l = c && e[c.mainType === "series" ? "_chartsMap" : "_componentsMap"][c.__viewId];
					a.event = n, a.type = t, e._$eventProcessor.eventInfo = {
						targetEl: i,
						packedEvent: a,
						model: c,
						view: l
					}, e.trigger(t, a);
				}
			};
			n.zrEventfulCallAtLast = !0, e._zr.on(t, n, e);
		});
		var t = this._messageCenter;
		V(vC, function(n, r) {
			t.on(r, function(t) {
				e.trigger(r, t);
			});
		}), Qb(t, this, this._api);
	}, t.prototype.isDisposed = function() {
		return this._disposed;
	}, t.prototype.clear = function() {
		this._disposed ? this.id : this.setOption({ series: [] }, !0);
	}, t.prototype.dispose = function() {
		if (this._disposed) this.id;
		else {
			this._disposed = !0, this.getDom() && Ac(this.getDom(), DC, "");
			var e = this, t = e._api, n = e._model;
			V(e._componentsViews, function(e) {
				e.dispose(n, t);
			}), V(e._chartsViews, function(e) {
				e.dispose(n, t);
			}), e._zr.dispose(), e._dom = e._model = e._chartsMap = e._componentsMap = e._chartsViews = e._componentsViews = e._scheduler = e._api = e._zr = e._throttledZrFlush = e._theme = e._coordSysMgr = e._messageCenter = null, delete wC[e.id];
		}
	}, t.prototype.resize = function(e) {
		if (!this[PS]) {
			if (this._disposed) this.id;
			else {
				this._zr.resize(e);
				var t = this._model;
				if (this._loadingFX && this._loadingFX.resize(), t) {
					var n = t.resetOption("media"), r = e && e.silent;
					this[IS] && (r ??= this[IS].silent, n = !0, this[IS] = null), this[PS] = !0, fC(this);
					try {
						n && JS(this), ZS.update.call(this, {
							type: "resize",
							animation: B({ duration: 0 }, e && e.animation)
						});
					} catch (e) {
						throw this[PS] = !1, e;
					}
					this[PS] = !1, tC.call(this, r), nC.call(this, r);
				}
			}
		}
	}, t.prototype.showLoading = function(e, t) {
		if (this._disposed) this.id;
		else if (K(e) && (t = e, e = ""), e ||= "default", this.hideLoading(), CC[e]) {
			var n = CC[e](this._api, t), r = this._zr;
			this._loadingFX = n, r.add(n);
		}
	}, t.prototype.hideLoading = function() {
		this._disposed ? this.id : (this._loadingFX && this._zr.remove(this._loadingFX), this._loadingFX = null);
	}, t.prototype.makeActionFromEvent = function(e) {
		var t = B({}, e);
		return t.type = _C[e.type], t;
	}, t.prototype.dispatchAction = function(e, t) {
		if (this._disposed) this.id;
		else if (K(t) || (t = { silent: !!t }), gC[e.type] && this._model) {
			if (this[PS]) this._pendingActions.push(e);
			else {
				var n = t.silent;
				eC.call(this, e, n);
				var r = t.flush;
				r ? this._zr.flush() : r !== !1 && R.browser.weChat && this._throttledZrFlush(), tC.call(this, n), nC.call(this, n);
			}
		}
	}, t.prototype.updateLabelLayout = function() {
		ex.trigger("series:layoutlabels", this._model, this._api, { updatedSeries: [] });
	}, t.prototype.appendData = function(e) {
		if (this._disposed) this.id;
		else {
			var t = e.seriesIndex;
			this.getModel().getSeriesByIndex(t).appendData(e), this._scheduler.unfinished = !0, this.getZr().wakeUp();
		}
	}, t.internalField = function() {
		JS = function(e) {
			sx(e._model);
			var t = e._scheduler;
			t.restorePipelines(e._zr, e._model), t.prepareStageTasks(), YS(e, !0), YS(e, !1), t.plan();
		}, YS = function(e, t) {
			for (var n = e._model, r = e._scheduler, i = t ? e._componentsViews : e._chartsViews, a = t ? e._componentsMap : e._chartsMap, o = e._zr, s = e._api, c = 0; c < i.length; c++) i[c].__alive = !1;
			t ? n.eachComponent(function(e, t) {
				e !== "series" && l(t);
			}) : n.eachSeries(l);
			function l(e) {
				var c = e.__requireNewView;
				e.__requireNewView = !1;
				var l = "_ec_" + e.id + "_" + e.type, u = !c && a[l];
				if (!u) {
					var d = Uc(e.type);
					u = new (t ? Zy.getClass(d.main, d.sub) : tb.getClass(d.sub))(), u.init(n, s), a[l] = u, i.push(u), o.add(u.group);
				}
				e.__viewId = u.__id = l, u.__alive = !0, u.__model = e, u.group.__ecComponentInfo = {
					mainType: e.mainType,
					index: e.componentIndex
				}, !t && r.prepareView(u, e, n, s);
			}
			for (var c = 0; c < i.length;) {
				var u = i[c];
				u.__alive ? c++ : (!t && u.renderTask.dispose(), o.remove(u.group), u.dispose(n, s), i.splice(c, 1), a[u.__id] === u && delete a[u.__id], u.__id = u.group.__ecComponentInfo = null);
			}
		}, XS = function(e, t, n, r, i) {
			var a = e._model;
			if (a.setUpdatePayload(n), !r) {
				V([].concat(e._componentsViews, e._chartsViews), l);
				return;
			}
			var o = kc(n, r, i), s = n.excludeSeriesId, c;
			s != null && (c = J(), V(ic(s), function(e) {
				var t = vc(e, null);
				t != null && c.set(t, !0);
			})), a && a.eachComponent(o, function(t) {
				if (!(c && c.get(t.id) != null)) {
					if (Rf(n)) {
						if (t instanceof Hy) n.type === "highlight" && !n.notBlur && !t.get(["emphasis", "disabled"]) && bf(t, n, e._api);
						else {
							var r = xf(t.mainType, t.componentIndex, n.name, e._api), i = r.focusSelf, a = r.dispatchers;
							n.type === "highlight" && i && !n.notBlur && yf(t.mainType, t.componentIndex, e._api), a && V(a, function(e) {
								n.type === "highlight" ? uf(e) : df(e);
							});
						}
					} else Lf(n) && t instanceof Hy && (wf(t, n, e._api), Tf(t), uC(e));
				}
			}, e), a && a.eachComponent(o, function(t) {
				c && c.get(t.id) != null || l(e[r === "series" ? "_chartsMap" : "_componentsMap"][t.__viewId]);
			}, e);
			function l(r) {
				r && r.__alive && r[t] && r[t](r.__model, a, e._api, n);
			}
		}, ZS = {
			prepareAndUpdate: function(e) {
				JS(this), ZS.update.call(this, e, e && { optionChanged: e.newOption != null });
			},
			update: function(e, n) {
				var r = this._model, i = this._api, a = this._zr, o = this._coordSysMgr, s = this._scheduler;
				if (r) {
					cx(r), r.setUpdatePayload(e), s.restoreData(r, e), s.performSeriesTasks(r), o.create(r, i), ex.trigger("coordsys:aftercreate", r, i), s.performDataProcessorTasks(r, e), $S(this, r), o.update(r, i), t(r), s.performVisualTasks(r, e);
					var c = r.get("backgroundColor") || "transparent";
					a.setBackgroundColor(c);
					var l = r.get("darkMode");
					l != null && l !== "auto" && a.setDarkMode(l), aC(this, r, i, e, n), ex.trigger("afterupdate", r, i);
				}
			},
			updateTransform: function(e) {
				var t = this, n = t._model, r = t._api;
				if (n) {
					n.setUpdatePayload(e);
					var i = [];
					n.eachComponent(function(a, o) {
						if (a !== "series") {
							var s = t.getViewOfComponentModel(o);
							if (s && s.__alive) {
								if (s.updateTransform) {
									var c = s.updateTransform(o, n, r, e);
									c && c.update && i.push(s);
								} else i.push(s);
							}
						}
					});
					var a = J();
					n.eachSeries(function(i) {
						var o = t._chartsMap[i.__viewId], s = i.pipelineContext;
						if (o.updateTransform && !s.progressiveRender) {
							var c = o.updateTransform(i, n, r, e);
							c && c.update && a.set(i.uid, 1);
						} else a.set(i.uid, 1);
					}), t._scheduler.performVisualTasks(n, e, {
						setDirty: !0,
						dirtyMap: a
					}), sC(t, n, r, e, {}, a), ex.trigger("afterupdate", n, r);
				}
			},
			updateView: function(e) {
				var n = this._model;
				n && (n.setUpdatePayload(e), tb.markUpdateMethod(e, "updateView"), t(n), this._scheduler.performVisualTasks(n, e, { setDirty: !0 }), aC(this, n, this._api, e, {}), ex.trigger("afterupdate", n, this._api));
			},
			updateVisual: function(e) {
				var n = this, r = this._model;
				r && (r.setUpdatePayload(e), r.eachSeries(function(e) {
					e.getData().clearAllVisual();
				}), tb.markUpdateMethod(e, "updateVisual"), t(r), this._scheduler.performVisualTasks(r, e, {
					visualType: "visual",
					setDirty: !0
				}), r.eachComponent(function(t, i) {
					if (t !== "series") {
						var a = n.getViewOfComponentModel(i);
						a && a.__alive && a.updateVisual(i, r, n._api, e);
					}
				}), r.eachSeries(function(t) {
					n._chartsMap[t.__viewId].updateVisual(t, r, n._api, e);
				}), ex.trigger("afterupdate", r, this._api));
			},
			updateLayout: function(e) {
				ZS.update.call(this, e);
			}
		};
		function e(e, t, n, r, i) {
			if (e._disposed) e.id;
			else for (var a = e._model, o = e._coordSysMgr.getCoordinateSystems(), s, c = Tc(a, n), l = 0; l < o.length; l++) {
				var u = o[l];
				if (u[t] && (s = u[t](a, c, r, i)) != null) return s;
			}
		}
		QS = e, $S = function(e, t) {
			var n = e._chartsMap, r = e._scheduler;
			t.eachSeries(function(e) {
				r.updateStreamModes(e, n[e.__viewId]);
			});
		}, eC = function(e, t) {
			var n = this, r = this.getModel(), i = e.type, a = e.escapeConnect, o = gC[i], s = (o.update || "update").split(":"), c = s.pop(), l = s[0] != null && Uc(s[0]);
			this[PS] = !0, fC(this);
			var u = [e], d = !1;
			e.batch && (d = !0, u = H(e.batch, function(t) {
				return t = Ut(B({}, t), e), t.batch = null, t;
			}));
			var f = [], p, m = [], h = o.nonRefinedEventType, g = Lf(e), _ = Rf(e);
			if (_ && _f(this._api), V(u, function(t) {
				var i = o.action(t, r, n._api);
				if (o.refineEvent ? m.push(i) : p = i, p ||= B({}, t), p.type = h, f.push(p), _) {
					var a = Ec(e), s = a.queryOptionMap, u = a.mainTypeSpecified ? s.keys()[0] : "series";
					XS(n, c, t, u), uC(n);
				} else g ? (XS(n, c, t, "series"), uC(n)) : l && XS(n, c, t, l.main, l.sub);
			}), c !== "none" && !_ && !g && !l) try {
				this[IS] ? (JS(this), ZS.update.call(this, e), this[IS] = null) : ZS[c].call(this, e);
			} catch (e) {
				throw this[PS] = !1, e;
			}
			if (p = d ? {
				type: h,
				escapeConnect: a,
				batch: f
			} : f[0], this[PS] = !1, !t) {
				var v = void 0;
				if (o.refineEvent) {
					var y = o.refineEvent(m, e, r, this._api).eventContent;
					pn(K(y)), v = Ut({ type: o.refinedEventType }, y), v.fromAction = e.type, v.fromActionPayload = e, v.escapeConnect = !0;
				}
				var b = this._messageCenter;
				b.trigger(p.type, p), v && b.trigger(v.type, v);
			}
		}, tC = function(e) {
			for (var t = this._pendingActions; t.length;) {
				var n = t.shift();
				eC.call(this, n, e);
			}
		}, nC = function(e) {
			!e && this.trigger("updated");
		}, rC = function(e, t) {
			e.on("rendered", function(n) {
				t.trigger("rendered", n), e.animation.isFinished() && !t[IS] && !t._scheduler.unfinished && !t._pendingActions.length ? t.trigger("finished") : e.refresh();
			});
		}, iC = function(e, t) {
			e.on("mouseover", function(e) {
				var n = e.target, r = $b(n, Ff);
				r && (Sf(r, e, t._api), uC(t));
			}).on("mouseout", function(e) {
				var n = e.target, r = $b(n, Ff);
				r && (Cf(r, e, t._api), uC(t));
			}).on("click", function(e) {
				var n = e.target, r = $b(n, function(e) {
					return bd(e).dataIndex != null;
				}, !0);
				if (r) {
					var i = r.selected ? "unselect" : "select", a = bd(r);
					t._api.dispatchAction({
						type: i,
						dataType: a.dataType,
						dataIndexInside: a.dataIndex,
						seriesIndex: a.seriesIndex,
						isFromClick: !0
					});
				}
			});
		};
		function t(e) {
			e.clearColorPalette(), e.eachSeries(function(e) {
				e.clearColorPalette();
			});
		}
		function n(e) {
			var t = [], n = [], r = !1;
			if (e.eachComponent(function(e, i) {
				var a = i.get("zlevel") || 0, o = i.get("z") || 0, s = i.getZLevelKey();
				r ||= !!s, (e === "series" ? n : t).push({
					zlevel: a,
					z: o,
					idx: i.componentIndex,
					type: e,
					key: s
				});
			}), r) {
				var i = t.concat(n), a, o;
				vi(i, function(e, t) {
					return e.zlevel === t.zlevel ? e.z - t.z : e.zlevel - t.zlevel;
				}), V(i, function(t) {
					var n = e.getComponent(t.type, t.idx), r = t.zlevel, i = t.key;
					a != null && (r = Math.max(a, r)), i ? (r === a && i !== o && r++, o = i) : o &&= (r === a && r++, ""), a = r, n.setZLevel(r);
				});
			}
		}
		aC = function(e, t, r, i, a) {
			n(t), oC(e, t, r, i, a), V(e._chartsViews, function(e) {
				e.__alive = !1;
			}), sC(e, t, r, i, a), V(e._chartsViews, function(e) {
				e.__alive || e.remove(t, r);
			});
		}, oC = function(e, t, n, r, i, a) {
			V(a || e._componentsViews, function(e) {
				var i = e.__model;
				s(i, e), e.render(i, t, n, r), o(i, e), c(i, e);
			});
		}, sC = function(e, t, n, r, l, u) {
			var d = e._scheduler;
			l = B(l || {}, { updatedSeries: t.getSeries() }), ex.trigger("series:beforeupdate", t, n, l);
			var f = !1;
			t.eachSeries(function(t) {
				var n = e._chartsMap[t.__viewId];
				n.__alive = !0;
				var i = n.renderTask;
				d.updatePayload(i, r), s(t, n), u && u.get(t.uid) && i.dirty(), i.perform(d.getPerformArgs(i)) && (f = !0), n.group.silent = !!t.get("silent"), a(t, n), Tf(t);
			}), d.unfinished = f || d.unfinished, ex.trigger("series:layoutlabels", t, n, l), ex.trigger("series:transition", t, n, l), t.eachSeries(function(t) {
				var n = e._chartsMap[t.__viewId];
				o(t, n), c(t, n);
			}), i(e, t), ex.trigger("series:afterupdate", t, n, l);
		}, uC = function(e) {
			e[LS] = !0, e.getZr().wakeUp();
		}, fC = function(e) {
			e[FS] = (e[FS] + 1) % 1e6;
		}, dC = function(e) {
			e[LS] && (e.getZr().storage.traverse(function(e) {
				fm(e) || r(e);
			}), e[LS] = !1);
		};
		function r(e) {
			for (var t = [], n = e.currentStates, r = 0; r < n.length; r++) {
				var i = n[r];
				i !== "emphasis" && i !== "blur" && i !== "select" && t.push(i);
			}
			e.selected && e.states.select && t.push("select"), e.hoverState === 2 && e.states.emphasis ? t.push("emphasis") : e.hoverState === 1 && e.states.blur && t.push("blur"), e.useStates(t);
		}
		function i(e, t) {
			var n = e._zr;
			if (n.painter.type === "canvas") {
				var r = n.storage, i = 0;
				r.traverse(function(e) {
					e.isGroup || i++;
				});
				var a = i > q(t.get("hoverLayerThreshold"), e_.hoverLayerThreshold) && !R.node && !R.worker;
				(e._usingTHL || a) && (t.eachSeries(function(t) {
					if (!t.preventUsingHoverLayer) {
						var n = e._chartsMap[t.__viewId];
						n.__alive && n.eachRendered(function(e) {
							var t = e.states.emphasis;
							t && t.hoverLayer !== 2 && (t.hoverLayer = +!!a);
						});
					}
				}), e._usingTHL = a);
			}
		}
		function a(e, t) {
			var n = e.get("blendMode") || null;
			t.eachRendered(function(e) {
				e.isGroup || (e.style.blend = n);
			});
		}
		function o(e, t) {
			if (!e.preventAutoZ) {
				var n = rh(e);
				t.eachRendered(function(e) {
					return ah(e, n.z, n.zlevel), !0;
				});
			}
		}
		function s(e, t) {
			t.eachRendered(function(e) {
				if (!fm(e)) {
					var t = e.getTextContent(), n = e.getTextGuideLine();
					e.stateTransition &&= null, t && t.stateTransition && (t.stateTransition = null), n && n.stateTransition && (n.stateTransition = null), e.hasState() ? (e.prevStates = e.currentStates, e.clearStates()) : e.prevStates &&= null;
				}
			});
		}
		function c(e, t) {
			var n = e.getModel("stateAnimation"), i = e.isAnimationEnabled(), a = n.get("duration"), o = a > 0 ? {
				duration: a,
				delay: n.get("delay"),
				easing: n.get("easing")
			} : null;
			t.eachRendered(function(e) {
				if (e.states && e.states.emphasis) {
					if (fm(e)) return;
					if (e instanceof Vu && zf(e), e.__dirty) {
						var t = e.prevStates;
						t && e.useStates(t);
					}
					if (i) {
						e.stateTransition = o;
						var n = e.getTextContent(), a = e.getTextGuideLine();
						n && (n.stateTransition = o), a && (a.stateTransition = o);
					}
					e.__dirty && r(e);
				}
			});
		}
		cC = function(e) {
			return new (function(t) {
				L(n, t);
				function n() {
					return t !== null && t.apply(this, arguments) || this;
				}
				return n.prototype.getCoordinateSystems = function() {
					return e._coordSysMgr.getCoordinateSystems();
				}, n.prototype.getComponentByElement = function(t) {
					for (; t;) {
						var n = t.__ecComponentInfo;
						if (n != null) return e._model.getComponent(n.mainType, n.index);
						t = t.parent;
					}
				}, n.prototype.enterEmphasis = function(t, n) {
					uf(t, n), uC(e);
				}, n.prototype.leaveEmphasis = function(t, n) {
					df(t, n), uC(e);
				}, n.prototype.enterBlur = function(t) {
					ff(t), uC(e);
				}, n.prototype.leaveBlur = function(t) {
					pf(t), uC(e);
				}, n.prototype.enterSelect = function(t) {
					mf(t), uC(e);
				}, n.prototype.leaveSelect = function(t) {
					hf(t), uC(e);
				}, n.prototype.getModel = function() {
					return e.getModel();
				}, n.prototype.getViewOfComponentModel = function(t) {
					return e.getViewOfComponentModel(t);
				}, n.prototype.getViewOfSeriesModel = function(t) {
					return e.getViewOfSeriesModel(t);
				}, n.prototype.getECUpdateCycleVersion = function() {
					return e[FS];
				}, n.prototype.usingTHL = function() {
					return e._usingTHL;
				}, n;
			}(jd))(e);
		}, lC = function(e) {
			function t(e, t) {
				for (var n = 0; n < e.length; n++) {
					var r = e[n];
					r[zS] = t;
				}
			}
			V(_C, function(n, r) {
				e._messageCenter.on(r, function(n) {
					if (TC[e.group] && e[zS] !== BS) {
						if (n && n.escapeConnect) return;
						var r = e.makeActionFromEvent(n), i = [];
						V(wC, function(t) {
							t !== e && t.group === e.group && i.push(t);
						}), t(i, BS), V(i, function(e) {
							e[zS] !== VS && e.dispatchAction(r);
						}), t(i, HS);
					}
				});
			});
		};
	}(), t;
}(qn), mC = pC.prototype;
mC.on = US("on"), mC.off = US("off"), mC.one = function(e, t, n) {
	var r = this;
	function i() {
		var n = [...arguments];
		t && t.apply && t.apply(this, n), r.off(e, i);
	}
	this.on.call(this, e, i, n);
};
var hC = [
	"click",
	"dblclick",
	"mouseover",
	"mouseout",
	"mousemove",
	"mousedown",
	"mouseup",
	"globalout",
	"contextmenu"
], gC = {}, _C = {}, vC = {}, yC = [], bC = [], xC = [], SC = {}, CC = {}, wC = {}, TC = {}, EC = /* @__PURE__ */ new Date() - 0;
/* @__PURE__ */ new Date() - 0;
var DC = "_echarts_instance_";
function OC(e, t, n) {
	var r = !(n && n.ssr);
	if (r) {
		var i = kC(e);
		if (i) return i;
	}
	var a = new pC(e, t, n);
	return a.id = "ec_" + EC++, wC[a.id] = a, r && Ac(e, DC, a.id), lC(a), ex.trigger("afterinit", a), a;
}
function kC(e) {
	return wC[jc(e, DC)];
}
function AC(e, t) {
	SC[e] = t;
}
function jC(e) {
	Wt(bC, e) < 0 && bC.push(e);
}
function MC(e, t) {
	VC(yC, e, t, xS);
}
function NC(e) {
	FC("afterinit", e);
}
function PC(e) {
	FC("afterupdate", e);
}
function FC(e, t) {
	ex.on(e, t);
}
function IC(e, t, n) {
	var r, i, a, o, s;
	W(t) && (n = t, t = ""), K(e) ? (r = e.type, i = e.event, o = e.update, s = e.publishNonRefinedEvent, n ||= e.action, a = e.refineEvent) : (r = e, i = t);
	function c(e) {
		return e.toLowerCase();
	}
	i = c(i || r);
	var l = a ? c(r) : i;
	gC[r] || (pn(RS.test(r) && RS.test(i)), a && pn(i !== r), gC[r] = {
		actionType: r,
		refinedEventType: i,
		nonRefinedEventType: l,
		update: o,
		action: n,
		refineEvent: a
	}, vC[i] = 1, a && s && (vC[l] = 1), _C[l] = r);
}
function LC(e, t) {
	Tg.register(e, t);
}
function RC(e, t) {
	VC(xC, e, t, CS, "layout", !0);
}
function zC(e, t) {
	VC(xC, e, t, ES, "visual", !0);
}
var BC = [];
function VC(e, t, n, r, i, a) {
	if ((W(t) || K(t)) && (n = t, t = r), !(Wt(BC, n) >= 0)) {
		BC.push(n);
		var o = wb.wrapStageHandler(n, i);
		o.__prio = t, o.__raw = n, e.push(o);
	}
}
function HC(e, t) {
	CC[e] = t;
}
function UC(e, t, n) {
	var r = rx("registerMap");
	r && r(e, t, n);
}
var WC = ey;
zC(TS, vb), zC(OS, bb), zC(OS, xb), zC(TS, Kb), zC(OS, qb), zC(MS, mS), jC(nv), MC(vS, rv), HC("default", Cb), IC({
	type: zd,
	event: zd,
	update: zd
}, En), IC({
	type: Bd,
	event: Bd,
	update: Bd
}, En), IC({
	type: Vd,
	event: Wd,
	update: Vd,
	action: En,
	refineEvent: GC,
	publishNonRefinedEvent: !0
}), IC({
	type: Hd,
	event: Wd,
	update: Hd,
	action: En,
	refineEvent: GC,
	publishNonRefinedEvent: !0
}), IC({
	type: Ud,
	event: Wd,
	update: Ud,
	action: En,
	refineEvent: GC,
	publishNonRefinedEvent: !0
});
function GC(e, t, n, r) {
	return { eventContent: {
		selected: Ef(n),
		isFromClick: t.isFromClick || !1
	} };
}
AC("default", {}), AC("dark", Hb);
// node_modules/echarts/lib/data/DataDiffer.js
function KC(e) {
	return e == null ? 0 : e.length || 1;
}
function qC(e) {
	return e;
}
var JC = function() {
	function e(e, t, n, r, i, a) {
		this._old = e, this._new = t, this._oldKeyGetter = n || qC, this._newKeyGetter = r || qC, this.context = i, this._diffModeMultiple = a === "multiple";
	}
	return e.prototype.add = function(e) {
		return this._add = e, this;
	}, e.prototype.update = function(e) {
		return this._update = e, this;
	}, e.prototype.updateManyToOne = function(e) {
		return this._updateManyToOne = e, this;
	}, e.prototype.updateOneToMany = function(e) {
		return this._updateOneToMany = e, this;
	}, e.prototype.updateManyToMany = function(e) {
		return this._updateManyToMany = e, this;
	}, e.prototype.remove = function(e) {
		return this._remove = e, this;
	}, e.prototype.execute = function() {
		this[this._diffModeMultiple ? "_executeMultiple" : "_executeOneToOne"]();
	}, e.prototype._executeOneToOne = function() {
		var e = this._old, t = this._new, n = {}, r = Array(e.length), i = Array(t.length);
		this._initIndexMap(e, null, r, "_oldKeyGetter"), this._initIndexMap(t, n, i, "_newKeyGetter");
		for (var a = 0; a < e.length; a++) {
			var o = r[a], s = n[o], c = KC(s);
			if (c > 1) {
				var l = s.shift();
				s.length === 1 && (n[o] = s[0]), this._update && this._update(l, a);
			} else c === 1 ? (n[o] = null, this._update && this._update(s, a)) : this._remove && this._remove(a);
		}
		this._performRestAdd(i, n);
	}, e.prototype._executeMultiple = function() {
		var e = this._old, t = this._new, n = {}, r = {}, i = [], a = [];
		this._initIndexMap(e, n, i, "_oldKeyGetter"), this._initIndexMap(t, r, a, "_newKeyGetter");
		for (var o = 0; o < i.length; o++) {
			var s = i[o], c = n[s], l = r[s], u = KC(c), d = KC(l);
			if (u > 1 && d === 1) this._updateManyToOne && this._updateManyToOne(l, c), r[s] = null;
			else if (u === 1 && d > 1) this._updateOneToMany && this._updateOneToMany(l, c), r[s] = null;
			else if (u === 1 && d === 1) this._update && this._update(l, c), r[s] = null;
			else if (u > 1 && d > 1) this._updateManyToMany && this._updateManyToMany(l, c), r[s] = null;
			else if (u > 1) for (var f = 0; f < u; f++) this._remove && this._remove(c[f]);
			else this._remove && this._remove(c);
		}
		this._performRestAdd(a, r);
	}, e.prototype._performRestAdd = function(e, t) {
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = t[r], a = KC(i);
			if (a > 1) for (var o = 0; o < a; o++) this._add && this._add(i[o]);
			else a === 1 && this._add && this._add(i);
			t[r] = null;
		}
	}, e.prototype._initIndexMap = function(e, t, n, r) {
		for (var i = this._diffModeMultiple, a = 0; a < e.length; a++) {
			var o = "_ec_" + this[r](e[a], a);
			if (i || (n[a] = o), t) {
				var s = t[o], c = KC(s);
				c === 0 ? (t[o] = a, i && n.push(o)) : c === 1 ? t[o] = [s, a] : s.push(a);
			}
		}
	}, e;
}(), YC = function() {
	function e(e, t) {
		this._encode = e, this._schema = t;
	}
	return e.prototype.get = function() {
		return {
			fullDimensions: this._getFullDimensionNames(),
			encode: this._encode
		};
	}, e.prototype._getFullDimensionNames = function() {
		return this._cachedDimNames ||= this._schema ? this._schema.makeOutputDimensionNames() : [], this._cachedDimNames;
	}, e;
}();
function XC(e, t) {
	var n = {}, r = n.encode = {}, i = J(), a = [], o = [], s = {};
	V(e.dimensions, function(t) {
		var n = e.getDimensionInfo(t), c = n.coordDim;
		if (c) {
			var l = n.coordDimIndex;
			ZC(r, c)[l] = t, n.isExtraCoord || (i.set(c, 1), QC(n.type) && (a[0] = t), ZC(s, c)[l] = e.getDimensionIndex(n.name)), n.defaultTooltip && o.push(t);
		}
		Sd.each(function(e, t) {
			var i = ZC(r, t), a = n.otherDims[t];
			a != null && a !== !1 && (i[a] = n.name);
		});
	});
	var c = [], l = {};
	i.each(function(e, t) {
		var n = r[t];
		l[t] = n[0], c = c.concat(n);
	}), n.dataDimsOnCoord = c, n.dataDimIndicesOnCoord = H(c, function(t) {
		return e.getDimensionInfo(t).storeDimIndex;
	}), n.encodeFirstDimNotExtra = l;
	var u = r.label;
	u && u.length && (a = u.slice());
	var d = r.tooltip;
	return d && d.length ? o = d.slice() : o.length || (o = a.slice()), r.defaultedLabel = a, r.defaultedTooltip = o, n.userOutput = new YC(s, t), n;
}
function ZC(e, t) {
	return e.hasOwnProperty(t) || (e[t] = []), e[t];
}
function QC(e) {
	return e !== "ordinal" && e !== "time";
}
// node_modules/echarts/lib/data/SeriesDimensionDefine.js
var $C = function() {
	function e(e) {
		this.otherDims = {}, e != null && B(this, e);
	}
	return e;
}(), ew = Z(), tw = {
	float: "f",
	int: "i",
	ordinal: "o",
	number: "n",
	time: "t"
}, nw = function() {
	function e(e) {
		this.dimensions = e.dimensions, this._dimOmitted = e.dimensionOmitted, this.source = e.source, this._fullDimCount = e.fullDimensionCount, this._updateDimOmitted(e.dimensionOmitted);
	}
	return e.prototype.isDimensionOmitted = function() {
		return this._dimOmitted;
	}, e.prototype._updateDimOmitted = function(e) {
		this._dimOmitted = e, e && (this._dimNameMap ||= aw(this.source));
	}, e.prototype.getSourceDimensionIndex = function(e) {
		return q(this._dimNameMap.get(e), -1);
	}, e.prototype.getSourceDimension = function(e) {
		var t = this.source.dimensionsDefine;
		if (t) return t[e];
	}, e.prototype.makeStoreSchema = function() {
		for (var e = this._fullDimCount, t = gv(this.source), n = !ow(e), r = "", i = [], a = 0, o = 0; a < e; a++) {
			var s = void 0, c = void 0, l = void 0, u = this.dimensions[o];
			if (u && u.storeDimIndex === a) s = t ? u.name : null, c = u.type, l = u.ordinalMeta, o++;
			else {
				var d = this.getSourceDimension(a);
				d && (s = t ? d.name : null, c = d.type);
			}
			i.push({
				property: s,
				type: c,
				ordinalMeta: l
			}), !t || s == null || u && u.isCalculationCoord || (r += n ? s.replace(/\`/g, "`1").replace(/\$/g, "`2") : s), r += "$", r += tw[c] || "f", l && (r += l.uid), r += "$";
		}
		var f = this.source;
		return {
			dimensions: i,
			hash: [
				f.seriesLayoutBy,
				f.startIndex,
				r
			].join("$$")
		};
	}, e.prototype.makeOutputDimensionNames = function() {
		for (var e = [], t = 0, n = 0; t < this._fullDimCount; t++) {
			var r = void 0, i = this.dimensions[n];
			if (i && i.storeDimIndex === t) i.isCalculationCoord || (r = i.name), n++;
			else {
				var a = this.getSourceDimension(t);
				a && (r = a.name);
			}
			e.push(r);
		}
		return e;
	}, e.prototype.appendCalculationDimension = function(e) {
		this.dimensions.push(e), e.isCalculationCoord = !0, this._fullDimCount++, this._updateDimOmitted(!0);
	}, e;
}();
function rw(e) {
	return e instanceof nw;
}
function iw(e) {
	for (var t = J(), n = 0; n < (e || []).length; n++) {
		var r = e[n], i = K(r) ? r.name : r;
		i != null && t.get(i) == null && t.set(i, n);
	}
	return t;
}
function aw(e) {
	var t = ew(e);
	return t.dimNameMap ||= iw(e.dimensionsDefine);
}
function ow(e) {
	return e > 30;
}
// node_modules/echarts/lib/data/SeriesData.js
var sw = K, cw = H, lw = typeof Int32Array > "u" ? Array : Int32Array, uw = "e\0\0", dw = -1, fw = [
	"hasItemOption",
	"_nameList",
	"_idList",
	"_invertedIndicesMap",
	"_dimSummary",
	"userOutput",
	"_rawData",
	"_dimValueGetter",
	"_nameDimIdx",
	"_idDimIdx",
	"_nameRepeatCount"
], pw = ["_approximateExtent"], mw, hw, gw, _w, vw, yw, bw, xw = function() {
	function e(e, t) {
		this.type = "list", this._dimOmitted = !1, this._nameList = [], this._idList = [], this._visual = {}, this._layout = {}, this._itemVisuals = [], this._itemLayouts = [], this._graphicEls = [], this._approximateExtent = {}, this._calculationInfo = {}, this.hasItemOption = !1, this.TRANSFERABLE_METHODS = [
			"cloneShallow",
			"downSample",
			"minmaxDownSample",
			"lttbDownSample",
			"map"
		], this.CHANGABLE_METHODS = ["filterSelf", "selectRange"], this.DOWNSAMPLE_METHODS = [
			"downSample",
			"minmaxDownSample",
			"lttbDownSample"
		];
		var n, r = !1;
		rw(e) ? (n = e.dimensions, this._dimOmitted = e.isDimensionOmitted(), this._schema = e) : (r = !0, n = e), n ||= ["x", "y"];
		for (var i = {}, a = [], o = {}, s = !1, c = {}, l = 0; l < n.length; l++) {
			var u = n[l], d = G(u) ? new $C({ name: u }) : u instanceof $C ? u : new $C(u), f = d.name;
			d.type = d.type || "float", d.coordDim || (d.coordDim = f, d.coordDimIndex = 0);
			var p = d.otherDims = d.otherDims || {};
			a.push(f), i[f] = d, c[f] != null && (s = !0), d.createInvertedIndices && (o[f] = []), r && (d.storeDimIndex = l), p.itemName === 0 && (this._nameDimIdx = d.storeDimIndex), p.itemId === 0 && (this._idDimIdx = d.storeDimIndex);
		}
		if (this.dimensions = a, this._dimInfos = i, this._initGetDimensionInfo(s), this.hostModel = t, this._invertedIndicesMap = o, this._dimOmitted) {
			var m = this._dimIdxToName = J();
			V(a, function(e) {
				m.set(i[e].storeDimIndex, e);
			});
		}
	}
	return e.prototype.getDimension = function(e) {
		var t = this._recognizeDimIndex(e);
		if (t == null) return e;
		if (t = e, !this._dimOmitted) return this.dimensions[t];
		var n = this._dimIdxToName.get(t);
		if (n != null) return n;
		var r = this._schema.getSourceDimension(t);
		if (r) return r.name;
	}, e.prototype.getDimensionIndex = function(e) {
		var t = this._recognizeDimIndex(e);
		if (t != null) return t;
		if (e == null) return -1;
		var n = this._getDimInfo(e);
		return n ? n.storeDimIndex : this._dimOmitted ? this._schema.getSourceDimensionIndex(e) : -1;
	}, e.prototype._recognizeDimIndex = function(e) {
		if (tn(e) || e != null && !isNaN(e) && !this._getDimInfo(e) && (!this._dimOmitted || this._schema.getSourceDimensionIndex(e) < 0)) return +e;
	}, e.prototype._getStoreDimIndex = function(e) {
		return this.getDimensionIndex(e);
	}, e.prototype.getDimensionInfo = function(e) {
		return this._getDimInfo(this.getDimension(e));
	}, e.prototype._initGetDimensionInfo = function(e) {
		var t = this._dimInfos;
		this._getDimInfo = e ? function(e) {
			return t.hasOwnProperty(e) ? t[e] : void 0;
		} : function(e) {
			return t[e];
		};
	}, e.prototype.getDimensionsOnCoord = function() {
		return this._dimSummary.dataDimsOnCoord.slice();
	}, e.prototype.mapDimension = function(e, t) {
		var n = this._dimSummary;
		if (t == null) return n.encodeFirstDimNotExtra[e];
		var r = n.encode[e];
		return r ? r[t] : null;
	}, e.prototype.mapDimensionsAll = function(e) {
		return (this._dimSummary.encode[e] || []).slice();
	}, e.prototype.getStore = function() {
		return this._store;
	}, e.prototype.initData = function(e, t, n) {
		var r = this, i;
		if (e instanceof py && (i = e), !i) {
			var a = this.dimensions, o = sv(e) || qt(e) ? new Cv(e, a.length) : e;
			i = new py();
			var s = cw(a, function(e) {
				return {
					type: r._dimInfos[e].type,
					property: e
				};
			});
			i.initData(o, s, n);
		}
		this._store = i, this._nameList = (t || []).slice(), this._idList = [], this._nameRepeatCount = {}, this._doInit(0, i.count()), this._dimSummary = XC(this, this._schema), this.userOutput = this._dimSummary.userOutput;
	}, e.prototype.appendData = function(e) {
		var t = this._store.appendData(e);
		this._doInit(t[0], t[1]);
	}, e.prototype.appendValues = function(e, t) {
		var n = this._store.appendValues(e, t && t.length), r = n.start, i = n.end, a = this._shouldMakeIdFromName();
		if (this._updateOrdinalMeta(), t) for (var o = r; o < i; o++) {
			var s = o - r;
			this._nameList[o] = t[s], a && bw(this, o);
		}
	}, e.prototype._updateOrdinalMeta = function() {
		for (var e = this._store, t = this.dimensions, n = 0; n < t.length; n++) {
			var r = this._dimInfos[t[n]];
			r.ordinalMeta && e.collectOrdinalMeta(r.storeDimIndex, r.ordinalMeta);
		}
	}, e.prototype._shouldMakeIdFromName = function() {
		var e = this._store.getProvider();
		return this._idDimIdx == null && e.getSource().sourceFormat !== "typedArray" && !e.fillStorage;
	}, e.prototype._doInit = function(e, t) {
		if (!(e >= t)) {
			var n = this._store.getProvider();
			this._updateOrdinalMeta();
			var r = this._nameList, i = this._idList;
			if (n.getSource().sourceFormat === "original" && !n.pure) for (var a = [], o = e; o < t; o++) {
				var s = n.getItem(o, a);
				if (!this.hasItemOption && cc(s) && (this.hasItemOption = !0), s) {
					var c = s.name;
					r[o] == null && c != null && (r[o] = vc(c, null));
					var l = s.id;
					i[o] == null && l != null && (i[o] = vc(l, null));
				}
			}
			if (this._shouldMakeIdFromName()) for (var o = e; o < t; o++) bw(this, o);
			mw(this);
		}
	}, e.prototype.getApproximateExtent = function(e, t) {
		return this._approximateExtent[e] || this._store.getDataExtent(this._getStoreDimIndex(e), t);
	}, e.prototype.setApproximateExtent = function(e, t) {
		t = this.getDimension(t), this._approximateExtent[t] = e.slice();
	}, e.prototype.getCalculationInfo = function(e) {
		return this._calculationInfo[e];
	}, e.prototype.setCalculationInfo = function(e, t) {
		sw(e) ? B(this._calculationInfo, e) : this._calculationInfo[e] = t;
	}, e.prototype.getName = function(e) {
		var t = this.getRawIndex(e), n = this._nameList[t];
		return n == null && this._nameDimIdx != null && (n = gw(this, this._nameDimIdx, t)), n ??= "", n;
	}, e.prototype._getCategory = function(e, t) {
		var n = this._store.get(e, t), r = this._store.getOrdinalMeta(e);
		return r ? r.categories[n] : n;
	}, e.prototype.getId = function(e) {
		return hw(this, this.getRawIndex(e));
	}, e.prototype.count = function() {
		return this._store.count();
	}, e.prototype.get = function(e, t) {
		var n = this._store, r = this._dimInfos[e];
		if (r) return n.get(r.storeDimIndex, t);
	}, e.prototype.getByRawIndex = function(e, t) {
		var n = this._store, r = this._dimInfos[e];
		if (r) return n.getByRawIndex(r.storeDimIndex, t);
	}, e.prototype.getIndices = function() {
		return this._store.getIndices();
	}, e.prototype.getDataExtent = function(e) {
		return this._store.getDataExtent(this._getStoreDimIndex(e), null);
	}, e.prototype.getSum = function(e) {
		return this._store.getSum(this._getStoreDimIndex(e));
	}, e.prototype.getMedian = function(e) {
		return this._store.getMedian(this._getStoreDimIndex(e));
	}, e.prototype.getValues = function(e, t) {
		var n = this, r = this._store;
		return U(e) ? r.getValues(cw(e, function(e) {
			return n._getStoreDimIndex(e);
		}), t) : r.getValues(e);
	}, e.prototype.hasValue = function(e) {
		for (var t = this._dimSummary.dataDimIndicesOnCoord, n = 0, r = t.length; n < r; n++) if (isNaN(this._store.get(t[n], e))) return !1;
		return !0;
	}, e.prototype.indexOfName = function(e) {
		for (var t = 0, n = this._store.count(); t < n; t++) if (this.getName(t) === e) return t;
		return -1;
	}, e.prototype.getRawIndex = function(e) {
		return this._store.getRawIndex(e);
	}, e.prototype.indexOfRawIndex = function(e) {
		return this._store.indexOfRawIndex(e);
	}, e.prototype.rawIndexOf = function(e, t) {
		var n = e && this._invertedIndicesMap[e], r = n && n[t];
		return r == null || isNaN(r) ? dw : r;
	}, e.prototype.each = function(e, t, n) {
		W(e) && (n = t, t = e, e = []);
		var r = n || this, i = cw(_w(e), this._getStoreDimIndex, this);
		this._store.each(i, r ? Qt(t, r) : t);
	}, e.prototype.filterSelf = function(e, t, n) {
		W(e) && (n = t, t = e, e = []);
		var r = n || this, i = cw(_w(e), this._getStoreDimIndex, this);
		return this._store = this._store.filter(i, r ? Qt(t, r) : t), this;
	}, e.prototype.selectRange = function(e) {
		var t = this, n = {}, r = Xt(e), i = [];
		return V(r, function(r) {
			var a = t._getStoreDimIndex(r);
			n[a] = e[r], i.push(a);
		}), this._store = this._store.selectRange(n), this;
	}, e.prototype.mapArray = function(e, t, n) {
		W(e) && (n = t, t = e, e = []), n ||= this;
		var r = [];
		return this.each(e, function() {
			r.push(t && t.apply(this, arguments));
		}, n), r;
	}, e.prototype.map = function(e, t, n, r) {
		var i = n || r || this, a = cw(_w(e), this._getStoreDimIndex, this), o = yw(this);
		return o._store = this._store.map(a, i ? Qt(t, i) : t), o;
	}, e.prototype.modify = function(e, t, n, r) {
		var i = n || r || this, a = cw(_w(e), this._getStoreDimIndex, this);
		this._store.modify(a, i ? Qt(t, i) : t);
	}, e.prototype.downSample = function(e, t, n, r) {
		var i = yw(this);
		return i._store = this._store.downSample(this._getStoreDimIndex(e), t, n, r), i;
	}, e.prototype.minmaxDownSample = function(e, t) {
		var n = yw(this);
		return n._store = this._store.minmaxDownSample(this._getStoreDimIndex(e), t), n;
	}, e.prototype.lttbDownSample = function(e, t) {
		var n = yw(this);
		return n._store = this._store.lttbDownSample(this._getStoreDimIndex(e), t), n;
	}, e.prototype.getRawDataItem = function(e) {
		return this._store.getRawDataItem(e);
	}, e.prototype.getItemModel = function(e) {
		var t = this.hostModel;
		return new Lh(this.getRawDataItem(e), t, t && t.ecModel);
	}, e.prototype.diff = function(e) {
		var t = this;
		return new JC(e ? e.getStore().getIndices() : [], this.getStore().getIndices(), function(t) {
			return hw(e, t);
		}, function(e) {
			return hw(t, e);
		});
	}, e.prototype.getVisual = function(e) {
		var t = this._visual;
		return t && t[e];
	}, e.prototype.setVisual = function(e, t) {
		this._visual = this._visual || {}, sw(e) ? B(this._visual, e) : this._visual[e] = t;
	}, e.prototype.getItemVisual = function(e, t) {
		var n = this._itemVisuals[e];
		return (n && n[t]) ?? this.getVisual(t);
	}, e.prototype.hasItemVisual = function() {
		return this._itemVisuals.length > 0;
	}, e.prototype.ensureUniqueItemVisual = function(e, t) {
		var n = this._itemVisuals, r = n[e];
		r ||= n[e] = {};
		var i = r[t];
		return i ?? (i = this.getVisual(t), U(i) ? i = i.slice() : sw(i) && (i = B({}, i)), r[t] = i), i;
	}, e.prototype.setItemVisual = function(e, t, n) {
		var r = this._itemVisuals[e] || {};
		this._itemVisuals[e] = r, sw(t) ? B(r, t) : r[t] = n;
	}, e.prototype.clearAllVisual = function() {
		this._visual = {}, this._itemVisuals = [];
	}, e.prototype.setLayout = function(e, t) {
		sw(e) ? B(this._layout, e) : this._layout[e] = t;
	}, e.prototype.getLayout = function(e) {
		return this._layout[e];
	}, e.prototype.getItemLayout = function(e) {
		return this._itemLayouts[e];
	}, e.prototype.setItemLayout = function(e, t, n) {
		this._itemLayouts[e] = n ? B(this._itemLayouts[e] || {}, t) : t;
	}, e.prototype.clearItemLayouts = function() {
		this._itemLayouts.length = 0;
	}, e.prototype.setItemGraphicEl = function(e, t) {
		xd(this.hostModel && this.hostModel.seriesIndex, this.dataType, e, t), this._graphicEls[e] = t;
	}, e.prototype.getItemGraphicEl = function(e) {
		return this._graphicEls[e];
	}, e.prototype.eachItemGraphicEl = function(e, t) {
		V(this._graphicEls, function(n, r) {
			n && e && e.call(t, n, r);
		});
	}, e.prototype.cloneShallow = function(t) {
		return t ||= new e(this._schema ? this._schema : cw(this.dimensions, this._getDimInfo, this), this.hostModel), vw(t, this), t._store = this._store, t;
	}, e.prototype.wrapMethod = function(e, t) {
		var n = this[e];
		W(n) && (this.__wrappedMethods = this.__wrappedMethods || [], this.__wrappedMethods.push(e), this[e] = function() {
			var e = n.apply(this, arguments);
			return t.apply(this, [e].concat(dn(arguments)));
		});
	}, e.internalField = function() {
		mw = function(e) {
			var t = e._invertedIndicesMap;
			V(t, function(n, r) {
				var i = e._dimInfos[r], a = i.ordinalMeta, o = e._store;
				if (a) {
					n = t[r] = new lw(a.categories.length);
					for (var s = 0; s < n.length; s++) n[s] = dw;
					for (var s = 0; s < o.count(); s++) n[o.get(i.storeDimIndex, s)] = s;
				}
			});
		}, gw = function(e, t, n) {
			return vc(e._getCategory(t, n), null);
		}, hw = function(e, t) {
			var n = e._idList[t];
			return n == null && e._idDimIdx != null && (n = gw(e, e._idDimIdx, t)), n ??= uw + t, n;
		}, _w = function(e) {
			return U(e) || (e = e == null ? [] : [e]), e;
		}, yw = function(t) {
			var n = new e(t._schema ? t._schema : cw(t.dimensions, t._getDimInfo, t), t.hostModel);
			return vw(n, t), n;
		}, vw = function(e, t) {
			V(fw.concat(t.__wrappedMethods || []), function(n) {
				t.hasOwnProperty(n) && (e[n] = t[n]);
			}), e.__wrappedMethods = t.__wrappedMethods, V(pw, function(n) {
				e[n] = z(t[n]);
			}), e._calculationInfo = B({}, t._calculationInfo);
		}, bw = function(e, t) {
			var n = e._nameList, r = e._idList, i = e._nameDimIdx, a = e._idDimIdx, o = n[t], s = r[t];
			if (o == null && i != null && (n[t] = o = gw(e, i, t)), s == null && a != null && (r[t] = s = gw(e, a, t)), s == null && o != null) {
				var c = e._nameRepeatCount, l = c[o] = (c[o] || 0) + 1;
				s = o, l > 1 && (s += "__ec__" + l), r[t] = s;
			}
		};
	}(), e;
}();
// node_modules/echarts/lib/data/helper/createDimensions.js
function Sw(e, t) {
	sv(e) || (e = lv(e)), t ||= {};
	var n = t.coordDimensions || [], r = t.dimensionsDefine || e.dimensionsDefine || [], i = J(), a = [], o = Cw(e, n, r, t.dimensionsCount), s = t.canOmitUnusedDimensions && ow(o), c = r === e.dimensionsDefine, l = c ? aw(e) : iw(r), u = t.encodeDefine;
	!u && t.encodeDefaulter && (u = t.encodeDefaulter(e, o));
	for (var d = J(u), f = new oy(o), p = 0; p < f.length; p++) f[p] = -1;
	function m(e) {
		var t = f[e];
		if (t < 0) {
			var n = r[e], i = K(n) ? n : { name: n }, o = new $C(), s = i.name;
			return s != null && l.get(s) != null && (o.name = o.displayName = s), i.type != null && (o.type = i.type), i.displayName != null && (o.displayName = i.displayName), f[e] = a.length, o.storeDimIndex = e, a.push(o), o;
		}
		return a[t];
	}
	if (!s) for (var p = 0; p < o; p++) m(p);
	d.each(function(e, t) {
		var n = ic(e).slice();
		if (n.length === 1 && !G(n[0]) && n[0] < 0) d.set(t, !1);
		else {
			var r = d.set(t, []);
			V(n, function(e, n) {
				var i = G(e) ? l.get(e) : e;
				i != null && i < o && (r[n] = i, g(m(i), t, n));
			});
		}
	});
	var h = 0;
	V(n, function(e) {
		var t, n, r, i;
		if (G(e)) t = e, i = {};
		else {
			i = e, t = i.name;
			var a = i.ordinalMeta;
			i.ordinalMeta = null, i = B({}, i), i.ordinalMeta = a, n = i.dimsDef, r = i.otherDims, i.name = i.coordDim = i.coordDimIndex = i.dimsDef = i.otherDims = null;
		}
		var s = d.get(t);
		if (s !== !1) {
			if (s = ic(s), !s.length) for (var l = 0; l < (n && n.length || 1); l++) {
				for (; h < o && m(h).coordDim != null;) h++;
				h < o && s.push(h++);
			}
			V(s, function(e, a) {
				var o = m(e);
				if (c && i.type != null && (o.type = i.type), g(Ut(o, i), t, a), o.name == null && n) {
					var s = n[a];
					!K(s) && (s = { name: s }), o.name = o.displayName = s.name, o.defaultTooltip = s.defaultTooltip;
				}
				r && Ut(o.otherDims, r);
			});
		}
	});
	function g(e, t, n) {
		Sd.get(t) == null ? (e.coordDim = t, e.coordDimIndex = n, i.set(t, !0)) : e.otherDims[t] = n;
	}
	var _ = t.generateCoord, v = t.generateCoordCount, y = v != null;
	v = _ ? v || 1 : 0;
	var b = _ || "value";
	function x(e) {
		e.name ??= e.coordDim;
	}
	if (s) V(a, function(e) {
		x(e);
	}), a.sort(function(e, t) {
		return e.storeDimIndex - t.storeDimIndex;
	});
	else for (var S = 0; S < o; S++) {
		var C = m(S);
		C.coordDim ?? (C.coordDim = ww(b, i, y), C.coordDimIndex = 0, (!_ || v <= 0) && (C.isExtraCoord = !0), v--), x(C), C.type == null && (s_(e, S) === t_.Must || C.isExtraCoord && (C.otherDims.itemName != null || C.otherDims.seriesName != null)) && (C.type = "ordinal");
	}
	return Ic(a, function(e) {
		return e.name;
	}, function(e, t) {
		t > 0 && (e.name += t - 1);
	}), new nw({
		source: e,
		dimensions: a,
		fullDimensionCount: o,
		dimensionOmitted: s
	});
}
function Cw(e, t, n, r) {
	var i = Math.max(e.dimensionsDetectedCount || 1, t.length, n.length, r || 0);
	return V(t, function(e) {
		var t;
		K(e) && (t = e.dimsDef) && (i = Math.max(i, t.length));
	}), i;
}
function ww(e, t, n) {
	if (n || t.hasKey(e)) {
		for (var r = 0; t.hasKey(e + r);) r++;
		e += r;
	}
	return t.set(e, !0), e;
}
Xt({
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
});
function Tw(e, t) {
	return e.getExtentUnsafe(1, t) || e.getExtentUnsafe(0, t);
}
function Ew(e) {
	var t = Tw(e, 3);
	return t[1] - t[0];
}
// node_modules/echarts/lib/scale/helper.js
function Dw(e) {
	return e.type === "time";
}
function Ow(e) {
	return e.type === "ordinal";
}
Z();
function kw(e, t) {
	var n = e.scale;
	return Ow(n) ? n.getLabel(t) : t.value;
}
function Aw(e) {
	return e.get("interval") ?? "auto";
}
function jw(e) {
	return e.type === "category" && Aw(e.getLabelModel()) === 0;
}
function Mw(e) {
	return e === "middle" || e === "center";
}
function Nw(e, t) {
	return Ow(e) ? e.getRawOrdinalNumber(t.value) : t.value;
}
Pc();
var Pw = Z();
Z();
function Fw(e, t) {
	var n = e.model, r = Pw(lx(n.ecModel)).keyed, i = r && r.get(t);
	return i && i.get(n.uid);
}
function Iw(e, t) {
	return zw(Fw(e, t));
}
function Lw(e, t) {
	var n = [];
	return Rw(e.model.ecModel, function(e) {
		for (var r = 0; r < t.length; r++) t[r] && e.serByIdx[t[r].seriesIndex] && n.push(zw(e));
	}), n;
}
function Rw(e, t) {
	var n = Pw(lx(e)).keyed;
	n && n.each(function(e, n) {
		e.each(function(e, r) {
			t(e, n, r);
		});
	});
}
function zw(e) {
	return { liPosMinGap: e ? e.liPosMinGap : void 0 };
}
J();
// node_modules/echarts/lib/extension.js
var Bw = [], Vw = {
	registerPreprocessor: jC,
	registerProcessor: MC,
	registerPostInit: NC,
	registerPostUpdate: PC,
	registerUpdateLifecycle: FC,
	registerAction: IC,
	registerCoordinateSystem: LC,
	registerLayout: RC,
	registerVisual: zC,
	registerTransform: WC,
	registerLoading: HC,
	registerMap: UC,
	registerImpl: nx,
	PRIORITY: NS,
	ComponentModel: Wg,
	ComponentView: Zy,
	SeriesModel: Hy,
	ChartView: tb,
	registerComponentModel: function(e) {
		Wg.registerClass(e);
	},
	registerComponentView: function(e) {
		Zy.registerClass(e);
	},
	registerSeriesModel: function(e) {
		Hy.registerClass(e);
	},
	registerChartView: function(e) {
		tb.registerClass(e);
	},
	registerCustomSeries: function(e, t) {
		ax(e, t);
	},
	registerSubTypeDefaulter: function(e, t) {
		Wg.registerSubTypeDefaulter(e, t);
	},
	registerPainter: function(e, t) {
		_s(e, t);
	}
};
function Hw(e) {
	U(e) ? V(e, function(e) {
		Hw(e);
	}) : Wt(Bw, e) >= 0 || (Bw.push(e), W(e) && (e = { install: e }), e.install(Vw));
}
Z(), Z();
var Uw = {
	estimate: 1,
	determine: 2
};
function Ww(e) {
	return {
		out: { noPxChangeTryDetermine: [] },
		kind: e
	};
}
// node_modules/echarts/lib/coord/axisBand.js
var Gw = .8;
function Kw(e, t) {
	t ||= {};
	var n = {
		w: NaN,
		w2: NaN
	}, r = e.scale, i = t.fromStat, a = t.min, o = Ew(r);
	Ys(o) || (o = NaN);
	var s = e.getExtent(), c = Cs(s[1] - s[0]);
	return Ow(r) ? qw(n, e, o, c) : i && Jw(n, e, o, c, i), a != null && (n.w = Ys(n.w) ? Ss(a, n.w) : a), n;
}
function qw(e, t, n, r) {
	var i = t.onBand, a = n + +!!i;
	a === 0 && (a = 1), e.w = r / a, !i && n && r && (e.w2 = e.w * n / r);
}
function Jw(e, t, n, r, i) {
	var a = !1, o = -Infinity;
	V(i.key ? [Iw(t, i.key)] : Lw(t, i.sers || []), function(e) {
		var t = e.liPosMinGap;
		t != null && (t > 0 ? (t > o && (o = t), a = !1) : t === -2 && (a = !0));
	}), Ys(n) && n > 0 && Ys(o) ? (e.w = r / n * o, e.w2 = o) : a && (e.w = r * Gw, e.w2 = e.w * n / r);
}
gu.CMD;
function Yw(e, t, n, r, i, a, o, s) {
	var c = i - e, l = a - t, u = n - e, d = r - t, f = Math.sqrt(u * u + d * d);
	u /= f, d /= f;
	var p = (c * u + l * d) / f;
	s && (p = Math.min(Math.max(p, 0), 1)), p *= f;
	var m = o[0] = e + p * u, h = o[1] = t + p * d;
	return Math.sqrt((m - i) * (m - i) + (h - a) * (h - a));
}
var Xw = new Y(), Zw = new Y(), Qw = new Y(), $w = new Y(), eT = new Y(), tT = [], nT = new Y();
function rT(e, t) {
	if (t <= 180 && t > 0) {
		t = t / 180 * Math.PI, Xw.fromArray(e[0]), Zw.fromArray(e[1]), Qw.fromArray(e[2]), Y.sub($w, Xw, Zw), Y.sub(eT, Qw, Zw);
		var n = $w.len(), r = eT.len();
		if (!(n < .001 || r < .001)) {
			$w.scale(1 / n), eT.scale(1 / r);
			var i = $w.dot(eT);
			if (Math.cos(t) < i) {
				var a = Yw(Zw.x, Zw.y, Qw.x, Qw.y, Xw.x, Xw.y, tT, !1);
				nT.fromArray(tT), nT.scaleAndAdd(eT, a / Math.tan(Math.PI - t));
				var o = Qw.x === Zw.x ? (nT.y - Zw.y) / (Qw.y - Zw.y) : (nT.x - Zw.x) / (Qw.x - Zw.x);
				if (isNaN(o)) return;
				o < 0 ? Y.copy(nT, Zw) : o > 1 && Y.copy(nT, Qw), nT.toArray(e[1]);
			}
		}
	}
}
function iT(e, t, n) {
	if (n <= 180 && n > 0) {
		n = n / 180 * Math.PI, Xw.fromArray(e[0]), Zw.fromArray(e[1]), Qw.fromArray(e[2]), Y.sub($w, Zw, Xw), Y.sub(eT, Qw, Zw);
		var r = $w.len(), i = eT.len();
		if (!(r < .001 || i < .001) && ($w.scale(1 / r), eT.scale(1 / i), $w.dot(t) < Math.cos(n))) {
			var a = Yw(Zw.x, Zw.y, Qw.x, Qw.y, Xw.x, Xw.y, tT, !1);
			nT.fromArray(tT);
			var o = Math.PI / 2, s = o + Math.acos(eT.dot(t)) - n;
			if (s >= o) Y.copy(nT, Qw);
			else {
				nT.scaleAndAdd(eT, a / Math.tan(Math.PI / 2 - s));
				var c = Qw.x === Zw.x ? (nT.y - Zw.y) / (Qw.y - Zw.y) : (nT.x - Zw.x) / (Qw.x - Zw.x);
				if (isNaN(c)) return;
				c < 0 ? Y.copy(nT, Zw) : c > 1 && Y.copy(nT, Qw);
			}
			nT.toArray(e[1]);
		}
	}
}
function aT(e, t, n, r) {
	var i = n === "normal", a = i ? e : e.ensureState(n);
	a.ignore = t;
	var o = r.get("smooth");
	o = o === !0 ? .3 : Math.max(+o, 0) || 0, a.shape = a.shape || {}, a.shape.smooth = o;
	var s = r.getModel("lineStyle").getLineStyle();
	i ? e.useStyle(s) : a.style = s;
}
function oT(e, t) {
	var n = t.smooth, r = t.points;
	if (r) {
		if (e.moveTo(r[0][0], r[0][1]), n > 0 && r.length >= 3) {
			var i = Rn(r[0], r[1]), a = Rn(r[1], r[2]);
			if (!i || !a) {
				e.lineTo(r[1][0], r[1][1]), e.lineTo(r[2][0], r[2][1]);
				return;
			}
			var o = Math.min(i, a) * n, s = Vn([], r[1], r[0], o / i), c = Vn([], r[1], r[2], o / a), l = Vn([], s, c, .5);
			e.bezierCurveTo(s[0], s[1], s[0], s[1], l[0], l[1]), e.bezierCurveTo(c[0], c[1], c[0], c[1], r[2][0], r[2][1]);
		} else for (var u = 1; u < r.length; u++) e.lineTo(r[u][0], r[u][1]);
	}
}
function sT(e, t, n) {
	var r = e.getTextGuideLine(), i = e.getTextContent();
	if (!i) r && e.removeTextGuideLine();
	else {
		for (var a = t.normal, o = a.get("show"), s = i.ignore, c = 0; c < Rd.length; c++) {
			var l = Rd[c], u = t[l], d = l === "normal";
			if (u) {
				var f = u.get("show");
				if ((d ? s : q(i.states[l] && i.states[l].ignore, s)) || !q(f, o)) {
					var p = d ? r : r && r.states[l];
					p && (p.ignore = !0), r && aT(r, !0, l, u);
					continue;
				}
				r || (r = new Ip(), e.setTextGuideLine(r), d || !s && o || aT(r, !0, "normal", t.normal), e.stateProxy && (r.stateProxy = e.stateProxy)), aT(r, !1, l, u);
			}
		}
		if (r) {
			Ut(r.style, n), r.style.fill = null;
			var m = a.get("showAbove"), h = e.textGuideLineConfig = e.textGuideLineConfig || {};
			h.showAbove = m || !1, r.buildPath = oT;
		}
	}
}
function cT(e, t) {
	t ||= "labelLine";
	for (var n = { normal: e.getModel(t) }, r = 0; r < Ld.length; r++) {
		var i = Ld[r];
		n[i] = e.getModel([i, t]);
	}
	return n;
}
// node_modules/echarts/lib/label/labelLayoutHelper.js
var lT = [
	"label",
	"labelLine",
	"layoutOption",
	"priority",
	"defaultAttr",
	"marginForce",
	"minMarginForce",
	"marginDefault",
	"suggestIgnore"
], uT = 1, dT = 2, fT = uT | dT;
function pT(e, t, n) {
	n ||= fT, t ? e.dirty |= n : e.dirty &= ~n;
}
function mT(e, t) {
	return t ||= fT, e.dirty == null || !!(e.dirty & t);
}
function hT(e) {
	if (e) return mT(e) && gT(e, e.label, e), e;
}
function gT(e, t, n) {
	var r = t.getComputedTransform();
	e.transform = nh(e.transform, r);
	var i = e.localRect = th(e.localRect, t.getBoundingRect()), a = t.style, o = a.margin, s = n && n.marginForce, c = n && n.minMarginForce, l = n && n.marginDefault, u = a.__marginType;
	u == null && l && (o = l, u = Eh.textMargin);
	for (var d = 0; d < 4; d++) _T[d] = u === Eh.minMargin && c && c[d] != null ? c[d] : s && s[d] != null ? s[d] : o ? o[d] : 0;
	u === Eh.textMargin && qm(i, _T, !1, !1);
	var f = e.rect = th(e.rect, i);
	return r && f.applyTransform(r), u === Eh.minMargin && qm(f, _T, !1, !1), e.axisAligned = $m(r), (e.label = e.label || {}).ignore = t.ignore, pT(e, !1), pT(e, !0, dT), e;
}
var _T = [
	0,
	0,
	0,
	0
];
function vT(e, t, n) {
	return e.transform = nh(e.transform, n), e.localRect = th(e.localRect, t), e.rect = th(e.rect, t), n && e.rect.applyTransform(n), e.axisAligned = $m(n), e.obb = void 0, (e.label = e.label || {}).ignore = !1, e;
}
function yT(e, t) {
	if (e) {
		e.label.x += t.x, e.label.y += t.y, e.label.markRedraw();
		var n = e.transform;
		n && (n[4] += t.x, n[5] += t.y);
		var r = e.rect;
		r && (r.x += t.x, r.y += t.y);
		var i = e.obb;
		i && i.fromBoundingRect(e.localRect, n);
	}
}
function bT(e, t) {
	for (var n = 0; n < lT.length; n++) {
		var r = lT[n];
		e[r] ?? (e[r] = t[r]);
	}
	return hT(e);
}
function xT(e) {
	var t = e.obb;
	return (!t || mT(e, dT)) && (e.obb = t ||= new im(), t.fromBoundingRect(e.localRect, e.transform), pT(e, !1, dT)), t;
}
function ST(e, t, n, r, i) {
	var a = e.length, o = ym[t], s = bm[t];
	if (a < 2) return !1;
	e.sort(function(e, t) {
		return e.rect[o] - t.rect[o];
	});
	for (var c = 0, l, u = !1, d = 0, f = 0; f < a; f++) {
		var p = e[f], m = p.rect;
		l = m[o] - c, l < 0 && (m[o] -= l, p.label[o] -= l, u = !0);
		var h = Math.max(-l, 0);
		d += h, c = m[o] + m[s];
	}
	d > 0 && i && S(-d / a, 0, a);
	var g = e[0], _ = e[a - 1], v, y;
	b(), v < 0 && C(-v, .8), y < 0 && C(y, .8), b(), x(v, y, 1), x(y, v, -1), b(), v < 0 && w(-v), y < 0 && w(y);
	function b() {
		v = g.rect[o] - n, y = r - _.rect[o] - _.rect[s];
	}
	function x(e, t, n) {
		if (e < 0) {
			var r = Math.min(t, -e);
			if (r > 0) {
				S(r * n, 0, a);
				var i = r + e;
				i < 0 && C(-i * n, 1);
			} else C(-e * n, 1);
		}
	}
	function S(t, n, r) {
		t !== 0 && (u = !0);
		for (var i = n; i < r; i++) {
			var a = e[i], s = a.rect;
			s[o] += t, a.label[o] += t;
		}
	}
	function C(t, n) {
		for (var r = [], i = 0, c = 1; c < a; c++) {
			var l = e[c - 1].rect, u = Math.max(e[c].rect[o] - l[o] - l[s], 0);
			r.push(u), i += u;
		}
		if (i) {
			var d = Math.min(Math.abs(t) / i, n);
			if (t > 0) for (var c = 0; c < a - 1; c++) {
				var f = r[c] * d;
				S(f, 0, c + 1);
			}
			else for (var c = a - 1; c > 0; c--) {
				var f = r[c - 1] * d;
				S(-f, c, a);
			}
		}
	}
	function w(e) {
		var t = e < 0 ? -1 : 1;
		e = Math.abs(e);
		for (var n = Math.ceil(e / (a - 1)), r = 0; r < a - 1; r++) if (t > 0 ? S(n, 0, r + 1) : S(-n, a - r - 1, a), e -= n, e <= 0) return;
	}
	return u;
}
function CT(e) {
	var t = [];
	e.sort(function(e, t) {
		return +!!t.suggestIgnore - !!e.suggestIgnore || t.priority - e.priority;
	});
	function n(e) {
		if (!e.ignore) {
			var t = e.ensureState("emphasis");
			t.ignore ??= !1;
		}
		e.ignore = !0;
	}
	for (var r = 0; r < e.length; r++) {
		var i = hT(e[r]);
		if (!i.label.ignore) {
			for (var a = i.label, o = i.labelLine, s = !1, c = 0; c < t.length; c++) if (wT(i, t[c], null, { touchThreshold: .05 })) {
				s = !0;
				break;
			}
			s ? (n(a), o && n(o)) : t.push(i);
		}
	}
}
function wT(e, t, n, r) {
	return !e || !t || e.label && e.label.ignore || t.label && t.label.ignore || !e.rect.intersect(t.rect, n, r) ? !1 : e.axisAligned && t.axisAligned ? !0 : xT(e).intersect(xT(t), n, r);
}
// node_modules/echarts/lib/component/axis/axisBreakHelper.js
var TT = null;
function ET() {
	return TT;
}
// node_modules/echarts/lib/component/axis/axisAction.js
var DT = "expandAxisBreak", OT = Math.PI, kT = [
	[
		1,
		2,
		1,
		2
	],
	[
		5,
		3,
		5,
		3
	],
	[
		8,
		3,
		8,
		3
	]
], AT = [
	[
		0,
		1,
		0,
		1
	],
	[
		0,
		3,
		0,
		3
	],
	[
		0,
		3,
		0,
		3
	]
], jT = Z(), MT = Z(), NT = function() {
	function e(e) {
		this.recordMap = {}, this.resolveAxisNameOverlap = e;
	}
	return e.prototype.ensureRecord = function(e) {
		var t = e.axis.dim, n = e.componentIndex, r = this.recordMap, i = r[t] || (r[t] = []);
		return i[n] || (i[n] = { ready: {} });
	}, e;
}();
function PT(e, t, n, r) {
	var i = n.axis, a = t.ensureRecord(n), o = [], s, c = iE(e.axisName) && Mw(e.nameLocation);
	V(r, function(e) {
		var t = hT(e);
		if (t && !t.label.ignore) {
			o.push(t);
			var n = a.transGroup;
			c && (n.transform ? Ar(FT, n.transform) : wr(FT), t.transform && Er(FT, FT, t.transform), X.copy(IT, t.localRect), IT.applyTransform(FT), s ? s.union(IT) : X.copy(s = new X(0, 0, 0, 0), IT));
		}
	});
	var l = Math.abs(a.dirVec.x) > .1 ? "x" : "y", u = a.transGroup[l];
	if (o.sort(function(e, t) {
		return Math.abs(e.label[l] - u) - Math.abs(t.label[l] - u);
	}), c && s) {
		var d = i.getExtent(), f = Math.min(d[0], d[1]), p = Math.max(d[0], d[1]) - f;
		s.union(new X(f, 0, p, 1));
	}
	a.stOccupiedRect = s, a.labelInfoList = o;
}
var FT = Cr(), IT = new X(0, 0, 0, 0), LT = function(e, t, n, r, i, a) {
	if (Mw(e.nameLocation)) {
		var o = a.stOccupiedRect;
		o && RT(vT({}, o, a.transGroup.transform), r, i);
	} else zT(a.labelInfoList, a.dirVec, r, i);
};
function RT(e, t, n) {
	var r = new Y();
	wT(e, t, r, {
		direction: Math.atan2(n.y, n.x),
		bidirectional: !1,
		touchThreshold: .05
	}) && yT(t, r);
}
function zT(e, t, n, r) {
	for (var i = Y.dot(r, t) >= 0, a = 0, o = e.length; a < o; a++) {
		var s = e[i ? a : o - 1 - a];
		s.label.ignore || RT(s, n, r);
	}
}
var BT = function() {
	function e(e, t, n, r) {
		this.group = new us(), this._axisModel = e, this._api = t, this._local = {}, this._shared = r || new NT(LT), this._resetCfgDetermined(n);
	}
	return e.prototype.updateCfg = function(e) {
		var t = this._cfg.raw;
		t.position = e.position, t.labelOffset = e.labelOffset, this._resetCfgDetermined(t);
	}, e.prototype.__getRawCfg = function() {
		return this._cfg.raw;
	}, e.prototype._resetCfgDetermined = function(e) {
		var t = this._axisModel, n = t.getDefaultOption ? t.getDefaultOption() : {}, r = q(e.axisName, t.get("name")), i = t.get("nameMoveOverlap");
		(i == null || i === "auto") && (i = q(e.defaultNameMoveOverlap, !0));
		var a = {
			raw: e,
			position: e.position,
			rotation: e.rotation,
			nameDirection: q(e.nameDirection, 1),
			tickDirection: q(e.tickDirection, 1),
			labelDirection: q(e.labelDirection, 1),
			labelOffset: q(e.labelOffset, 0),
			silent: q(e.silent, !0),
			axisName: r,
			nameLocation: un(t.get("nameLocation"), n.nameLocation, "end"),
			shouldNameMoveOverlap: iE(r) && i,
			optionHideOverlap: t.get(["axisLabel", "hideOverlap"]),
			showMinorTicks: t.get(["minorTick", "show"])
		};
		this._cfg = a;
		var o = new us({
			x: a.position[0],
			y: a.position[1],
			rotation: a.rotation
		});
		o.updateTransform(), this._transformGroup = o;
		var s = this._shared.ensureRecord(t);
		s.transGroup = this._transformGroup, s.dirVec = new Y(Math.cos(-a.rotation), Math.sin(-a.rotation));
	}, e.prototype.build = function(e, t) {
		var n = this;
		return e ||= {
			axisLine: !0,
			axisTickLabelEstimate: !1,
			axisTickLabelDetermine: !0,
			axisName: !0
		}, V(VT, function(r) {
			e[r] && HT[r](n._cfg, n._local, n._shared, n._axisModel, n.group, n._transformGroup, n._api, t || {});
		}), this;
	}, e.innerTextLayout = function(e, t, n) {
		var r = Bs(t - e), i, a;
		return Vs(r) ? (a = n > 0 ? "top" : "bottom", i = "center") : Vs(r - OT) ? (a = n > 0 ? "bottom" : "top", i = "center") : (a = "middle", i = r > 0 && r < OT ? n > 0 ? "right" : "left" : n > 0 ? "left" : "right"), {
			rotation: r,
			textAlign: i,
			textVerticalAlign: a
		};
	}, e.makeAxisEventDataBase = function(e) {
		var t = {
			componentType: e.mainType,
			componentIndex: e.componentIndex
		};
		return t[e.mainType + "Index"] = e.componentIndex, t;
	}, e.isLabelSilent = function(e) {
		var t = e.get("tooltip");
		return e.get("silent") || !(e.get("triggerEvent") || t && t.show);
	}, e;
}(), VT = [
	"axisLine",
	"axisTickLabelEstimate",
	"axisTickLabelDetermine",
	"axisName"
], HT = {
	axisLine: function(e, t, n, r, i, a, o) {
		var s = r.get(["axisLine", "show"]);
		if (s === "auto" && (s = !0, e.raw.axisLineAutoShow != null && (s = !!e.raw.axisLineAutoShow)), s) {
			var c = r.axis.getExtent(), l = a.transform, u = [c[0], 0], d = [c[1], 0], f = u[0] > d[0];
			l && (Hn(u, u, l), Hn(d, d, l));
			var p = B({ lineCap: "round" }, r.getModel(["axisLine", "lineStyle"]).getLineStyle()), m = {
				strokeContainThreshold: e.raw.strokeContainThreshold || 5,
				silent: !0,
				z2: 1,
				style: p
			};
			if (r.get(["axisLine", "breakLine"]) && ng(r.axis.scale)) ET().buildAxisBreakLine(r, i, a, m);
			else {
				var h = new zp(B({ shape: {
					x1: u[0],
					y1: u[1],
					x2: d[0],
					y2: d[1]
				} }, m));
				jm(h.shape, h.style.lineWidth), h.anid = "line", i.add(h);
			}
			var g = r.get(["axisLine", "symbol"]);
			if (g != null) {
				var _ = r.get(["axisLine", "symbolSize"]);
				G(g) && (g = [g, g]), (G(_) || tn(_)) && (_ = [_, _]);
				var v = bx(r.get(["axisLine", "symbolOffset"]) || 0, _), y = _[0], b = _[1];
				V([{
					rotate: e.rotation + Math.PI / 2,
					offset: v[0],
					r: 0
				}, {
					rotate: e.rotation - Math.PI / 2,
					offset: v[1],
					r: Math.sqrt((u[0] - d[0]) * (u[0] - d[0]) + (u[1] - d[1]) * (u[1] - d[1]))
				}], function(t, n) {
					if (g[n] !== "none" && g[n] != null) {
						var r = yx(g[n], -y / 2, -b / 2, y, b, p.stroke, !0), a = t.r + t.offset, o = f ? d : u;
						r.attr({
							rotation: t.rotate,
							x: o[0] + a * Math.cos(e.rotation),
							y: o[1] - a * Math.sin(e.rotation),
							silent: !0,
							z2: 11
						}), i.add(r);
					}
				});
			}
		}
	},
	axisTickLabelEstimate: function(e, t, n, r, i, a, o, s) {
		ZT(t, i, s) && UT(e, t, n, r, i, a, o, Uw.estimate);
	},
	axisTickLabelDetermine: function(e, t, n, r, i, a, o, s) {
		ZT(t, i, s) && UT(e, t, n, r, i, a, o, Uw.determine);
		var c = YT(e, i, a, r);
		KT(e, t.labelLayoutList, c), XT(e, i, a, r, e.tickDirection);
	},
	axisName: function(e, t, n, r, i, a, o, s) {
		var c = n.ensureRecord(r);
		t.nameEl &&= (i.remove(t.nameEl), c.nameLayout = c.nameLocation = null);
		var l = e.axisName;
		if (iE(l)) {
			var u = e.nameLocation, d = e.nameDirection, f = r.getModel("nameTextStyle"), p = r.get("nameGap") || 0, m = r.axis.getExtent(), h = r.axis.inverse ? -1 : 1, g = new Y(0, 0), _ = new Y(0, 0);
			u === "start" ? (g.x = m[0] - h * p, _.x = -h) : u === "end" ? (g.x = m[1] + h * p, _.x = h) : (g.x = (m[0] + m[1]) / 2, g.y = e.labelOffset + d * p, _.y = d);
			var v = Cr();
			_.transform(Or(v, v, e.rotation));
			var y = r.get("nameRotate");
			y != null && (y = y * OT / 180);
			var b, x;
			Mw(u) ? b = BT.innerTextLayout(e.rotation, y ?? e.rotation, d) : (b = WT(e.rotation, u, y || 0, m), x = e.raw.axisNameAvailableWidth, x != null && (x = Math.abs(x / Math.sin(b.rotation)), !isFinite(x) && (x = null)));
			var S = f.getFont(), C = r.get("nameTruncate", !0) || {}, w = C.ellipsis, T = ln(e.raw.nameTruncateMaxWidth, C.maxWidth, x), E = s.nameMarginLevel || 0, D = new od({
				x: g.x,
				y: g.y,
				rotation: b.rotation,
				silent: BT.isLabelSilent(r),
				style: gh(f, {
					text: l,
					font: S,
					overflow: "truncate",
					width: T,
					ellipsis: w,
					fill: f.getTextColor() || r.get([
						"axisLine",
						"lineStyle",
						"color"
					]),
					align: f.get("align") || b.textAlign,
					verticalAlign: f.get("verticalAlign") || b.textVerticalAlign
				}),
				z2: 1
			});
			if (Xm({
				el: D,
				componentModel: r,
				itemName: l
			}), D.__fullText = l, D.anid = "name", r.get("triggerEvent")) {
				var O = BT.makeAxisEventDataBase(r);
				O.targetType = "axisName", O.name = l, bd(D).eventData = O;
			}
			a.add(D), D.updateTransform(), t.nameEl = D;
			var k = c.nameLayout = hT({
				label: D,
				priority: D.z2,
				defaultAttr: { ignore: D.ignore },
				marginDefault: Mw(u) ? kT[E] : AT[E]
			});
			if (c.nameLocation = u, i.add(D), D.decomposeTransform(), e.shouldNameMoveOverlap && k) {
				var A = n.ensureRecord(r);
				n.resolveAxisNameOverlap(e, n, r, k, _, A);
			}
		}
	}
};
function UT(e, t, n, r, i, a, o, s) {
	$T(t) || QT(e, t, i, s, r, o);
	var c = t.labelLayoutList;
	tE(e, r, c, a), oE(r, e.rotation, c);
	var l = e.optionHideOverlap;
	GT(r, c, l), l && CT(Yt(c, function(e) {
		return e && !e.label.ignore;
	})), PT(e, n, r, c);
}
function WT(e, t, n, r) {
	var i = Bs(n - e), a, o, s = r[0] > r[1], c = t === "start" && !s || t !== "start" && s;
	return Vs(i - OT / 2) ? (o = c ? "bottom" : "top", a = "center") : Vs(i - OT * 1.5) ? (o = c ? "top" : "bottom", a = "center") : (o = "middle", a = i < OT * 1.5 && i > OT / 2 ? c ? "left" : "right" : c ? "right" : "left"), {
		rotation: i,
		textAlign: a,
		textVerticalAlign: o
	};
}
function GT(e, t, n) {
	var r = e.axis, i = e.get(["axisLabel", "customValues"]);
	if (jw(r)) return;
	function a(e, a, o) {
		var s = hT(t[a]), c = hT(t[o]), l = r.scale;
		if (s && c) {
			if (e == null) {
				if (!n && i) return;
				var u = jT(s.label).labelInfo.tick;
				if (Dw(l) && u.notNice || Ow(l) && u.offInterval) {
					qT(s.label);
					return;
				}
			}
			if (e === !1 || s.suggestIgnore) qT(s.label);
			else if (c.suggestIgnore) qT(c.label);
			else {
				var d = .1;
				if (!n) {
					var f = [
						0,
						0,
						0,
						0
					];
					s = bT({ marginForce: f }, s), c = bT({ marginForce: f }, c);
				}
				wT(s, c, null, { touchThreshold: d }) && qT(e ? c.label : s.label);
			}
		}
	}
	var o = e.get(["axisLabel", "showMinLabel"]), s = e.get(["axisLabel", "showMaxLabel"]), c = t.length;
	a(o, 0, 1), a(s, c - 1, c - 2);
}
function KT(e, t, n) {
	e.showMinorTicks || V(t, function(e) {
		if (e && e.label.ignore) for (var t = 0; t < n.length; t++) {
			var r = n[t], i = MT(r), a = jT(e.label);
			if (i.tickValue != null && !i.onBand && i.tickValue === a.labelInfo.tick.value) {
				qT(r);
				return;
			}
		}
	});
}
function qT(e) {
	e && (e.ignore = !0);
}
function JT(e, t, n, r, i) {
	for (var a = [], o = [], s = [], c = 0; c < e.length; c++) {
		var l = e[c].coord;
		o[0] = l, o[1] = 0, s[0] = l, s[1] = n, t && (Hn(o, o, t), Hn(s, s, t));
		var u = new zp({
			shape: {
				x1: o[0],
				y1: o[1],
				x2: s[0],
				y2: s[1]
			},
			style: r,
			z2: 2,
			autoBatch: !0,
			silent: !0
		});
		jm(u.shape, u.style.lineWidth), u.anid = i + "_" + e[c].tickValue, a.push(u);
		var d = MT(u);
		d.onBand = !!e[c].onBand, d.tickValue = e[c].tickValue;
	}
	return a;
}
function YT(e, t, n, r) {
	var i = r.axis, a = r.getModel("axisTick"), o = a.get("show");
	if (o === "auto" && (o = !0, e.raw.axisTickAutoShow != null && (o = !!e.raw.axisTickAutoShow)), !o || i.scale.isBlank()) return [];
	for (var s = a.getModel("lineStyle"), c = e.tickDirection * a.get("length"), l = JT(i.getTicksCoords(), n.transform, c, Ut(s.getLineStyle(), { stroke: r.get([
		"axisLine",
		"lineStyle",
		"color"
	]) }), "ticks"), u = 0; u < l.length; u++) t.add(l[u]);
	return l;
}
function XT(e, t, n, r, i) {
	var a = r.axis, o = r.getModel("minorTick");
	if (e.showMinorTicks && !a.scale.isBlank()) {
		var s = a.getMinorTicksCoords();
		if (s.length) for (var c = o.getModel("lineStyle"), l = i * o.get("length"), u = Ut(c.getLineStyle(), Ut(r.getModel("axisTick").getLineStyle(), { stroke: r.get([
			"axisLine",
			"lineStyle",
			"color"
		]) })), d = 0; d < s.length; d++) for (var f = JT(s[d], n.transform, l, u, "minorticks_" + d), p = 0; p < f.length; p++) t.add(f[p]);
	}
}
function ZT(e, t, n) {
	if ($T(e)) {
		var r = e.axisLabelsCreationContext.out.noPxChangeTryDetermine;
		if (n.noPxChange) {
			for (var i = !0, a = 0; a < r.length; a++) i &&= r[a]();
			if (i) return !1;
		}
		r.length && (t.remove(e.labelGroup), eE(e, null, null, null));
	}
	return !0;
}
function QT(e, t, n, r, i, a) {
	var o = i.axis, s = ln(e.raw.axisLabelShow, i.get(["axisLabel", "show"])), c = new us();
	n.add(c);
	var l = Ww(r);
	if (!s || o.scale.isBlank()) eE(t, [], c, l);
	else {
		var u = i.getModel("axisLabel"), d = o.getViewLabels(l), f = (ln(e.raw.labelRotate, u.get("rotate")) || 0) * OT / 180, p = BT.innerTextLayout(e.rotation, f, e.labelDirection), m = i.getCategories && i.getCategories(!0), h = [], g = i.get("triggerEvent"), _ = Infinity, v = -Infinity;
		V(d, function(e, t) {
			var n = e.tick, r = e.formattedLabel, s = e.rawLabel, l = u, f = Nw(o.scale, n);
			if (m && m[f]) {
				var y = m[f];
				K(y) && y.textStyle && (l = new Lh(y.textStyle, u, i.ecModel));
			}
			var b = l.getTextColor() || i.get([
				"axisLine",
				"lineStyle",
				"color"
			]), x = l.getShallow("align", !0) || p.textAlign, S = q(l.getShallow("alignMinLabel", !0), x), C = q(l.getShallow("alignMaxLabel", !0), x), w = l.getShallow("verticalAlign", !0) || l.getShallow("baseline", !0) || p.textVerticalAlign, T = q(l.getShallow("verticalAlignMinLabel", !0), w), E = q(l.getShallow("verticalAlignMaxLabel", !0), w), D = 10 + (n.time?.level || 0);
			_ = Math.min(_, D), v = Math.max(v, D);
			var O = new od({
				x: 0,
				y: 0,
				rotation: 0,
				silent: BT.isLabelSilent(i),
				z2: D,
				style: gh(l, {
					text: r,
					align: t === 0 ? S : t === d.length - 1 ? C : x,
					verticalAlign: t === 0 ? T : t === d.length - 1 ? E : w,
					fill: W(b) ? b(o.type === "category" ? s : o.type === "value" ? f + "" : f, t) : b
				})
			});
			O.anid = "label_" + f;
			var k = jT(O);
			if (k.labelInfo = e, k.layoutRotation = p.rotation, Xm({
				el: O,
				componentModel: i,
				itemName: r,
				formatterParamsExtra: {
					isTruncated: function() {
						return O.isTruncated;
					},
					value: s,
					tickIndex: t
				}
			}), g) {
				var A = BT.makeAxisEventDataBase(i);
				A.targetType = "axisLabel", A.value = s, A.tickIndex = t;
				var j = e.tick.break;
				if (j) {
					var ee = j.parsedBreak;
					A.break = {
						start: ee.vmin,
						end: ee.vmax
					};
				}
				o.type === "category" && (A.dataIndex = f), bd(O).eventData = A, j && aE(i, a, O, j);
			}
			h.push(O), c.add(O);
		}), eE(t, H(h, function(e) {
			return {
				label: e,
				priority: jT(e).labelInfo.tick.break ? e.z2 + (v - _ + 1) : e.z2,
				defaultAttr: { ignore: e.ignore }
			};
		}), c, l);
	}
}
function $T(e) {
	return !!e.labelLayoutList;
}
function eE(e, t, n, r) {
	e.labelLayoutList = t, e.labelGroup = n, e.axisLabelsCreationContext = r;
}
function tE(e, t, n, r) {
	var i = t.get(["axisLabel", "margin"]);
	V(n, function(n, a) {
		var o = hT(n);
		if (o) {
			var s = o.label, c = jT(s);
			o.suggestIgnore = s.ignore, s.ignore = !1, Mo(nE, rE);
			var l = t.axis;
			nE.x = l.dataToCoord(Nw(l.scale, c.labelInfo.tick)), nE.y = e.labelOffset + e.labelDirection * i, nE.rotation = c.layoutRotation, r.add(nE), nE.updateTransform(), r.remove(nE), nE.decomposeTransform(), Mo(s, nE), s.markRedraw(), pT(o, !0), hT(o);
		}
	});
}
var nE = new td(), rE = new td();
function iE(e) {
	return !!e;
}
function aE(e, t, n, r) {
	n.on("click", function(n) {
		var i = {
			type: DT,
			breaks: [{
				start: r.parsedBreak.breakOption.start,
				end: r.parsedBreak.breakOption.end
			}]
		};
		i[e.axis.dim + "AxisIndex"] = e.componentIndex, t.dispatchAction(i);
	});
}
function oE(e, t, n) {
	var r = tg();
	if (r) {
		var i = r.retrieveAxisBreakPairs(n, function(e) {
			return e && jT(e.label).labelInfo.tick.break;
		}, !0), a = e.get(["breakLabelLayout", "moveOverlap"], !0);
		(a === !0 || a === "auto") && V(i, function(r) {
			ET().adjustBreakLabelPair(e.axis.inverse, t, [hT(n[r[0]]), hT(n[r[1]])]);
		});
	}
}
// node_modules/echarts/lib/coord/cartesian/cartesianAxisHelper.js
function sE(e, t, n) {
	n ||= {};
	var r = t.axis, i = {}, a = r.getAxesOnZeroOf()[0], o = r.position, s = a ? "onZero" : o, c = r.dim, l = [
		e.x,
		e.x + e.width,
		e.y,
		e.y + e.height
	], u = {
		left: 0,
		right: 1,
		top: 0,
		bottom: 1,
		onZero: 2
	}, d = t.get("offset") || 0, f = c === "x" ? [l[2] - d, l[3] + d] : [l[0] - d, l[1] + d];
	if (a) {
		var p = a.toGlobalCoord(a.dataToCoord(0));
		f[u.onZero] = Math.max(Math.min(p, f[1]), f[0]);
	}
	i.position = [c === "y" ? f[u[s]] : l[0], c === "x" ? f[u[s]] : l[3]], i.rotation = Math.PI / 2 * (c === "x" ? 0 : 1), i.labelDirection = i.tickDirection = i.nameDirection = {
		top: -1,
		bottom: 1,
		left: -1,
		right: 1
	}[o], i.labelOffset = a ? f[u[o]] - f[u.onZero] : 0, t.get(["axisTick", "inside"]) && (i.tickDirection = -i.tickDirection), ln(n.labelInside, t.get(["axisLabel", "inside"])) && (i.labelDirection = -i.labelDirection);
	var m = t.get(["axisLabel", "rotate"]);
	return i.labelRotate = s === "top" ? -m : m, i.z2 = 1, i;
}
// node_modules/echarts/lib/chart/helper/sectorHelper.js
function cE(e, t, n) {
	var r = e.get("borderRadius");
	if (r == null) return n ? { cornerRadius: 0 } : null;
	U(r) || (r = [
		r,
		r,
		r,
		r
	]);
	var i = Math.abs(t.r || 0 - t.r0 || 0);
	return { cornerRadius: H(r, function(e) {
		return Go(e, i);
	}) };
}
// node_modules/echarts/lib/processor/dataFilter.js
function lE(e) {
	return {
		seriesType: e,
		reset: function(e, t) {
			var n = t.findComponents({ mainType: "legend" });
			if (n && n.length) {
				var r = e.getData();
				r.filterSelf(function(e) {
					for (var t = r.getName(e), i = 0; i < n.length; i++) if (!n[i].isSelected(t)) return !1;
					return !0;
				});
			}
		}
	};
}
// node_modules/echarts/lib/chart/helper/createSeriesDataSimply.js
function uE(e, t, n) {
	t = U(t) && { coordDimensions: t } || B({ encodeDefine: e.getEncode() }, t);
	var r = e.getSource(), i = Sw(r, t).dimensions, a = new xw(i, e);
	return a.initData(r, n), a;
}
// node_modules/echarts/lib/visual/LegendVisualProvider.js
var dE = function() {
	function e(e, t) {
		this._getDataWithEncodedVisual = e, this._getRawData = t;
	}
	return e.prototype.getAllNames = function() {
		var e = this._getRawData();
		return e.mapArray(e.getName);
	}, e.prototype.containName = function(e) {
		return this._getRawData().indexOfName(e) >= 0;
	}, e.prototype.indexOfName = function(e) {
		return this._getDataWithEncodedVisual().indexOfName(e);
	}, e.prototype.getItemVisual = function(e, t) {
		return this._getDataWithEncodedVisual().getItemVisual(e, t);
	}, e;
}(), fE = Z(), pE = function(e) {
	L(t, e);
	function t() {
		var n = e !== null && e.apply(this, arguments) || this;
		return n.type = t.type, n;
	}
	return t.prototype.init = function(t) {
		e.prototype.init.apply(this, arguments), this.legendVisualProvider = new dE(Qt(this.getData, this), Qt(this.getRawData, this)), this._defaultLabelLine(t);
	}, t.prototype.mergeOption = function() {
		e.prototype.mergeOption.apply(this, arguments);
	}, t.prototype.getInitialData = function() {
		return uE(this, {
			coordDimensions: ["value"],
			encodeDefaulter: $t(i_, this)
		});
	}, t.prototype.getDataParams = function(t) {
		var n = this.getData(), r = fE(n), i = r.seats;
		if (!i) {
			var a = [];
			n.each(n.mapDimension("value"), function(e) {
				a.push(e);
			}), i = r.seats = Rs(a, n.hostModel.get("percentPrecision"));
		}
		var o = e.prototype.getDataParams.call(this, t);
		return o.percent = i[t] || 0, o.$vars.push("percent"), o;
	}, t.prototype._defaultLabelLine = function(e) {
		ac(e, "labelLine", ["show"]);
		var t = e.labelLine, n = e.emphasis.labelLine;
		t.show = t.show && e.label.show, n.show = n.show && e.emphasis.label.show;
	}, t.type = "series.pie", t.defaultOption = {
		z: 2,
		legendHoverLink: !0,
		colorBy: "data",
		center: ["50%", "50%"],
		radius: [0, "50%"],
		clockwise: !0,
		startAngle: 90,
		endAngle: "auto",
		padAngle: 0,
		minAngle: 0,
		minShowLabelAngle: 0,
		selectedOffset: 10,
		percentPrecision: 2,
		stillShowZeroSum: !0,
		coordinateSystemUsage: "box",
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
		width: null,
		height: null,
		label: {
			rotate: 0,
			show: !0,
			overflow: "truncate",
			position: "outer",
			alignTo: "none",
			edgeDistance: "25%",
			distanceToLabelLine: 5
		},
		labelLine: {
			show: !0,
			length: 15,
			length2: 30,
			smooth: !1,
			minTurnAngle: 90,
			maxSurfaceAngle: 90,
			lineStyle: {
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
		labelLayout: { hideOverlap: !0 },
		emphasis: {
			scale: !0,
			scaleSize: 5
		},
		avoidLabelOverlap: !0,
		animationType: "expansion",
		animationDuration: 1e3,
		animationTypeUpdate: "transition",
		animationEasingUpdate: "cubicInOut",
		animationDurationUpdate: 500,
		animationEasing: "cubicInOut"
	}, t;
}(Hy);
Eg({
	fullType: pE.type,
	getCoord2: function(e) {
		return e.getShallow("center");
	}
});
// node_modules/echarts/lib/chart/pie/labelLayout.js
var mE = Math.PI / 180;
function hE(e, t, n, r, i, a, o, s, c, l) {
	if (e.length < 2) return;
	function u(e) {
		for (var a = e.rB, o = a * a, s = 0; s < e.list.length; s++) {
			var c = e.list[s], l = Math.abs(c.label.y - n), u = r + c.len, d = u * u, f = t + (Math.sqrt(Math.abs((1 - l * l / o) * d)) + c.len2) * i, p = f - c.label.x;
			_E(c, c.targetTextWidth - p * i, !0), c.label.x = f;
		}
	}
	function d(e) {
		for (var a = {
			list: [],
			maxY: 0
		}, o = {
			list: [],
			maxY: 0
		}, s = 0; s < e.length; s++) if (e[s].labelAlignTo === "none") {
			var c = e[s], l = c.label.y > n ? o : a, d = Math.abs(c.label.y - n);
			if (d >= l.maxY) {
				var f = c.label.x - t - c.len2 * i, p = r + c.len;
				l.rB = Math.abs(f) < p ? Math.sqrt(d * d / (1 - f * f / p / p)) : p, l.maxY = d;
			}
			l.list.push(c);
		}
		u(a), u(o);
	}
	for (var f = e.length, p = 0; p < f; p++) if (e[p].position === "outer" && e[p].labelAlignTo === "labelLine") {
		var m = e[p].label.x - l;
		e[p].linePoints[1][0] += m, e[p].label.x = l;
	}
	ST(e, 1, c, c + o) && d(e);
}
function gE(e, t, n, r, i, a, o, s) {
	for (var c = [], l = [], u = Number.MAX_VALUE, d = -Number.MAX_VALUE, f = 0; f < e.length; f++) {
		var p = e[f].label;
		xE(e[f]) || (p.x < t ? (u = Math.min(u, p.x), c.push(e[f])) : (d = Math.max(d, p.x), l.push(e[f])));
	}
	for (var f = 0; f < e.length; f++) {
		var m = e[f];
		if (!xE(m) && m.linePoints) {
			if (m.labelStyleWidth != null) continue;
			var p = m.label, h = m.linePoints, g = void 0;
			g = m.labelAlignTo === "edge" ? p.x < t ? h[2][0] - m.labelDistance - o - m.edgeDistance : o + i - m.edgeDistance - h[2][0] - m.labelDistance : m.labelAlignTo === "labelLine" ? p.x < t ? u - o - m.bleedMargin : o + i - d - m.bleedMargin : p.x < t ? p.x - o - m.bleedMargin : o + i - p.x - m.bleedMargin, m.targetTextWidth = g, _E(m, g, !1);
		}
	}
	hE(l, t, n, r, 1, i, a, o, s, d), hE(c, t, n, r, -1, i, a, o, s, u);
	for (var f = 0; f < e.length; f++) {
		var m = e[f];
		if (!xE(m) && m.linePoints) {
			var p = m.label, h = m.linePoints, _ = m.labelAlignTo === "edge", v = p.style.padding, y = v ? v[1] + v[3] : 0, b = p.style.backgroundColor ? 0 : y, x = m.rect.width + b, S = h[1][0] - h[2][0];
			_ ? p.x < t ? h[2][0] = o + m.edgeDistance + x + m.labelDistance : h[2][0] = o + i - m.edgeDistance - x - m.labelDistance : (p.x < t ? h[2][0] = p.x + m.labelDistance : h[2][0] = p.x - m.labelDistance, h[1][0] = h[2][0] + S), h[1][1] = h[2][1] = p.y;
		}
	}
}
function _E(e, t, n) {
	if (e.labelStyleWidth == null) {
		var r = e.label, i = r.style, a = e.rect, o = i.backgroundColor, s = i.padding, c = s ? s[1] + s[3] : 0, l = i.overflow, u = a.width + (o ? 0 : c);
		if (t < u || n) {
			if (l && l.match("break")) {
				r.setStyle("backgroundColor", null), r.setStyle("width", t - c);
				var d = r.getBoundingRect();
				r.setStyle("width", Math.ceil(d.width)), r.setStyle("backgroundColor", o);
			} else {
				var f = t - c, p = t < u ? f : n ? f > e.unconstrainedWidth ? null : f : null;
				r.setStyle("width", p);
			}
			vE(a, r);
		}
	}
}
function vE(e, t) {
	bE.rect = e, gT(bE, t, yE);
}
var yE = {
	minMarginForce: [
		null,
		0,
		null,
		0
	],
	marginDefault: [
		1,
		0,
		1,
		0
	]
}, bE = {};
function xE(e) {
	return e.position === "center";
}
function SE(e) {
	var t = e.getData(), n = [], r, i, a = !1, o = (e.get("minShowLabelAngle") || 0) * mE, s = t.getLayout("viewRect"), c = t.getLayout("r"), l = s.width, u = s.x, d = s.y, f = s.height;
	function p(e) {
		e.ignore = !0;
	}
	function m(e) {
		if (!e.ignore) return !0;
		for (var t in e.states) if (e.states[t].ignore === !1) return !0;
		return !1;
	}
	t.each(function(e) {
		var s = t.getItemGraphicEl(e), d = s.shape, h = s.getTextContent(), g = s.getTextGuideLine(), _ = t.getItemModel(e), v = _.getModel("label"), y = v.get("position") || _.get([
			"emphasis",
			"label",
			"position"
		]), b = v.get("distanceToLabelLine"), x = v.get("alignTo"), S = As(v.get("edgeDistance"), l), C = v.get("bleedMargin");
		C ??= Math.min(l, f) > 200 ? 10 : 2;
		var w = _.getModel("labelLine"), T = w.get("length");
		T = As(T, l);
		var E = w.get("length2");
		if (E = As(E, l), Math.abs(d.endAngle - d.startAngle) < o) V(h.states, p), h.ignore = !0, g && (V(g.states, p), g.ignore = !0);
		else if (m(h)) {
			var D = (d.startAngle + d.endAngle) / 2, O = Math.cos(D), k = Math.sin(D), A, j, ee, te;
			r = d.cx, i = d.cy;
			var ne = y === "inside" || y === "inner";
			if (y === "center") A = d.cx, j = d.cy, te = "center";
			else {
				var re = (ne ? (d.r + d.r0) / 2 * O : d.r * O) + r, ie = (ne ? (d.r + d.r0) / 2 * k : d.r * k) + i;
				if (A = re + O * 3, j = ie + k * 3, !ne) {
					var ae = re + O * (T + c - d.r), oe = ie + k * (T + c - d.r), se = ae + (O < 0 ? -1 : 1) * E, ce = oe;
					A = x === "edge" ? O < 0 ? u + S : u + l - S : se + (O < 0 ? -b : b), j = ce, ee = [
						[re, ie],
						[ae, oe],
						[se, ce]
					];
				}
				te = ne ? "center" : x === "edge" ? O > 0 ? "right" : "left" : O > 0 ? "left" : "right";
			}
			var le = Math.PI, ue = 0, de = v.get("rotate");
			if (tn(de)) ue = le / 180 * de;
			else if (y === "center") ue = 0;
			else if (de === "radial" || de === !0) ue = O < 0 ? -D + le : -D;
			else if (de === "tangential" || de === "tangential-noflip" && y !== "outside" && y !== "outer") {
				var fe = Math.atan2(O, k);
				fe < 0 && (fe = le * 2 + fe), k > 0 && de !== "tangential-noflip" && (fe = le + fe), ue = fe - le;
			}
			if (a = !!ue, h.x = A, h.y = j, h.rotation = ue, h.setStyle({ verticalAlign: "middle" }), ne) {
				h.setStyle({ align: te });
				var pe = h.states.select;
				pe && (pe.x += h.x, pe.y += h.y);
			} else {
				var M = new X(0, 0, 0, 0);
				vE(M, h), n.push({
					label: h,
					labelLine: g,
					position: y,
					len: T,
					len2: E,
					minTurnAngle: w.get("minTurnAngle"),
					maxSurfaceAngle: w.get("maxSurfaceAngle"),
					surfaceNormal: new Y(O, k),
					linePoints: ee,
					textAlign: te,
					labelDistance: b,
					labelAlignTo: x,
					edgeDistance: S,
					bleedMargin: C,
					rect: M,
					unconstrainedWidth: M.width,
					labelStyleWidth: h.style.width
				});
			}
			s.setTextConfig({ inside: ne });
		}
	}), !a && e.get("avoidLabelOverlap") && gE(n, r, i, c, l, f, u, d);
	for (var h = 0; h < n.length; h++) {
		var g = n[h], _ = g.label, v = g.labelLine, y = isNaN(_.x) || isNaN(_.y);
		if (_) {
			_.setStyle({ align: g.textAlign }), y && (V(_.states, p), _.ignore = !0);
			var b = _.states.select;
			b && (b.x += _.x, b.y += _.y);
		}
		if (v) {
			var x = g.linePoints;
			y || !x ? (V(v.states, p), v.ignore = !0) : (rT(x, g.minTurnAngle), iT(x, g.surfaceNormal, g.maxSurfaceAngle), v.setShape({ points: x }), _.__hostTarget.textGuideLineConfig = { anchor: new Y(x[0][0], x[0][1]) });
		}
	}
}
// node_modules/echarts/lib/chart/pie/pieLayout.js
var CE = Math.PI * 2, wE = Math.PI / 180, TE = Rc("pie", EE);
function EE(e, t) {
	e.eachSeriesByType("pie", function(e) {
		var n = e.getData(), r = n.mapDimension("value"), i = Fg(e, t), a = i.cx, o = i.cy, s = i.r, c = i.r0, l = i.viewRect, u = -e.get("startAngle") * wE, d = e.get("endAngle"), f = e.get("padAngle") * wE;
		d = d === "auto" ? u - CE : -d * wE;
		var p = e.get("minAngle") * wE + f, m = 0;
		n.each(r, function(e) {
			!isNaN(e) && m++;
		});
		var h = n.getSum(r), g = Math.PI / (h || m) * 2, _ = e.get("clockwise"), v = e.get("roseType"), y = e.get("stillShowZeroSum"), b = n.getDataExtent(r);
		b[0] = 0;
		var x = _ ? 1 : -1, S = [u, d], C = x * f / 2;
		hu(S, !_), u = S[0], d = S[1];
		var w = DE(e);
		w.startAngle = u, w.endAngle = d, w.clockwise = _, w.cx = a, w.cy = o, w.r = s, w.r0 = c;
		var T = Math.abs(d - u), E = T, D = 0, O = u;
		if (n.setLayout({
			viewRect: l,
			r: s
		}), n.each(r, function(e, t) {
			var r;
			if (isNaN(e)) n.setItemLayout(t, {
				angle: NaN,
				startAngle: NaN,
				endAngle: NaN,
				clockwise: _,
				cx: a,
				cy: o,
				r0: c,
				r: v ? NaN : s
			});
			else {
				r = v === "area" ? T / m : h === 0 && y ? g : e * g, r < p ? (r = p, E -= p) : D += e;
				var i = O + x * r, l = 0, u = 0;
				f > r ? (l = O + x * r / 2, u = l) : (l = O + C, u = i - C), n.setItemLayout(t, {
					angle: r,
					startAngle: l,
					endAngle: u,
					clockwise: _,
					cx: a,
					cy: o,
					r0: c,
					r: v ? ks(e, b, [c, s]) : s
				}), O = i;
			}
		}), E < CE && m) {
			if (E <= .001) {
				var k = T / m;
				n.each(r, function(e, t) {
					if (!isNaN(e)) {
						var r = n.getItemLayout(t);
						r.angle = k;
						var i = 0, a = 0;
						k < f ? (i = u + x * (t + 1 / 2) * k, a = i) : (i = u + x * t * k + C, a = u + x * (t + 1) * k - C), r.startAngle = i, r.endAngle = a;
					}
				});
			} else g = E / D, O = u, n.each(r, function(e, t) {
				if (!isNaN(e)) {
					var r = n.getItemLayout(t), i = r.angle === p ? p : e * g, a = 0, o = 0;
					i < f ? (a = O + x * i / 2, o = a) : (a = O + C, o = O + x * i - C), r.startAngle = a, r.endAngle = o, O += x * i;
				}
			});
		}
	});
}
var DE = Z(), OE = function(e) {
	L(t, e);
	function t(t, n, r) {
		var i = e.call(this) || this;
		i.z2 = 2;
		var a = new od();
		return i.setTextContent(a), i.updateData(t, n, r, !0), i;
	}
	return t.prototype.updateData = function(e, t, n, r) {
		var i = this, a = e.hostModel, o = e.getItemModel(t), s = o.getModel("emphasis"), c = e.getItemLayout(t), l = B(cE(o.getModel("itemStyle"), c, !0), c);
		if (isNaN(l.startAngle)) i.setShape(l);
		else {
			if (r) {
				i.setShape(l);
				var u = a.getShallow("animationType");
				a.ecModel.ssr ? (dm(i, {
					scaleX: 0,
					scaleY: 0
				}, a, {
					dataIndex: t,
					isFrom: !0
				}), i.originX = l.cx, i.originY = l.cy) : u === "scale" ? (i.shape.r = c.r0, dm(i, { shape: { r: c.r } }, a, t)) : n == null ? (i.shape.endAngle = c.startAngle, um(i, { shape: { endAngle: c.endAngle } }, a, t)) : (i.setShape({
					startAngle: n,
					endAngle: n
				}), dm(i, { shape: {
					startAngle: c.startAngle,
					endAngle: c.endAngle
				} }, a, t));
			} else gm(i), um(i, { shape: l }, a, t);
			i.useStyle(e.getItemVisual(t, "style")), Nf(i, o);
			var d = (c.startAngle + c.endAngle) / 2, f = a.get("selectedOffset"), p = Math.cos(d) * f, m = Math.sin(d) * f, h = o.getShallow("cursor");
			h && i.attr("cursor", h), this._updateLabel(a, e, t), i.ensureState("emphasis").shape = B({ r: c.r + (s.get("scale") && s.get("scaleSize") || 0) }, cE(s.getModel("itemStyle"), c)), B(i.ensureState("select"), {
				x: p,
				y: m,
				shape: cE(o.getModel(["select", "itemStyle"]), c)
			}), B(i.ensureState("blur"), { shape: cE(o.getModel(["blur", "itemStyle"]), c) });
			var g = i.getTextGuideLine(), _ = i.getTextContent();
			g && B(g.ensureState("select"), {
				x: p,
				y: m
			}), B(_.ensureState("select"), {
				x: p,
				y: m
			}), kf(this, s.get("focus"), s.get("blurScope"), s.get("disabled"));
		}
	}, t.prototype._updateLabel = function(e, t, n) {
		var r = this, i = t.getItemModel(n), a = i.getModel("labelLine"), o = t.getItemVisual(n, "style"), s = o && o.fill, c = o && o.opacity;
		mh(r, hh(i), {
			labelFetcher: t.hostModel,
			labelDataIndex: n,
			inheritColor: s,
			defaultOpacity: c,
			defaultText: e.getFormattedLabel(n, "normal") || t.getName(n)
		});
		var l = r.getTextContent();
		r.setTextConfig({
			position: null,
			rotation: null
		}), l.attr({ z2: 10 });
		var u = i.get(["label", "position"]);
		if (u !== "outside" && u !== "outer") r.removeTextGuideLine();
		else {
			var d = this.getTextGuideLine();
			d || (d = new Ip(), this.setTextGuideLine(d)), sT(this, cT(i), {
				stroke: s,
				opacity: un(a.get(["lineStyle", "opacity"]), c, 1)
			});
		}
	}, t;
}(Op), kE = function(e) {
	L(t, e);
	function t() {
		var t = e !== null && e.apply(this, arguments) || this;
		return t.type = "pie", t.ignoreLabelLineUpdate = !0, t;
	}
	return t.prototype.render = function(e, t, n, r) {
		var i = e.getData(), a = this._data, o = this.group, s;
		if (!a && i.count() > 0) {
			for (var c = i.getItemLayout(0), l = 1; isNaN(c && c.startAngle) && l < i.count(); ++l) c = i.getItemLayout(l);
			c && (s = c.startAngle);
		}
		if (this._emptyCircleSector && o.remove(this._emptyCircleSector), i.count() === 0 && e.get("showEmptyCircle")) {
			var u = new Op({ shape: z(DE(e)) });
			u.useStyle(e.getModel("emptyCircleStyle").getItemStyle()), this._emptyCircleSector = u, o.add(u);
		}
		i.diff(a).add(function(e) {
			var t = new OE(i, e, s);
			i.setItemGraphicEl(e, t), o.add(t);
		}).update(function(e, t) {
			var n = a.getItemGraphicEl(t);
			n.updateData(i, e, s), n.off("click"), o.add(n), i.setItemGraphicEl(e, n);
		}).remove(function(t) {
			hm(a.getItemGraphicEl(t), e, t);
		}).execute(), SE(e), e.get("animationTypeUpdate") !== "expansion" && (this._data = i);
	}, t.prototype.dispose = function() {}, t.prototype.containPoint = function(e, t) {
		var n = t.getData().getItemLayout(0);
		if (n) {
			var r = e[0] - n.cx, i = e[1] - n.cy, a = Math.sqrt(r * r + i * i);
			return a <= n.r && a >= n.r0;
		}
	}, t.type = "pie", t;
}(tb);
// node_modules/echarts/lib/processor/negativeDataFilter.js
function AE(e) {
	return {
		seriesType: e,
		reset: function(e, t) {
			var n = e.getData();
			n.filterSelf(function(e) {
				var t = n.mapDimension("value"), r = n.get(t, e);
				return !(tn(r) && !isNaN(r) && r < 0);
			});
		}
	};
}
// node_modules/echarts/lib/chart/pie/install.js
function jE(e) {
	e.registerChartView(kE), e.registerSeriesModel(pE), Xb("pie", e.registerAction), e.registerLayout(TE), e.registerProcessor(lE("pie")), e.registerProcessor(AE("pie"));
}
// node_modules/echarts/lib/component/axisPointer/modelHelper.js
function ME(e, t) {
	var n = {
		axesInfo: {},
		seriesInvolved: !1,
		coordSysAxesInfo: {},
		coordSysMap: {}
	};
	return NE(n, e, t), n.seriesInvolved && FE(n, e), n;
}
function NE(e, t, n) {
	var r = t.getComponent("tooltip"), i = t.getComponent("axisPointer"), a = i.get("link", !0) || [], o = [];
	V(n.getCoordinateSystems(), function(n) {
		if (!n.axisPointerEnabled) return;
		var s = HE(n.model), c = e.coordSysAxesInfo[s] = {};
		e.coordSysMap[s] = n;
		var l = n.model.getModel("tooltip", r);
		if (V(n.getAxes(), $t(p, !1, null)), n.getTooltipAxes && r && l.get("show")) {
			var u = l.get("trigger") === "axis", d = l.get(["axisPointer", "type"]) === "cross", f = n.getTooltipAxes(l.get(["axisPointer", "axis"]));
			(u || d) && V(f.baseAxes, $t(p, !d || "cross", u)), d && V(f.otherAxes, $t(p, "cross", !1));
		}
		function p(r, s, u) {
			var d = u.model.getModel("axisPointer", i), f = d.get("show");
			if (f && (f !== "auto" || r || VE(d))) {
				s ??= d.get("triggerTooltip"), d = r ? PE(u, l, i, t, r, s) : d;
				var p = d.get("snap"), m = d.get("triggerEmphasis"), h = HE(u.model), g = s || p || u.type === "category", _ = e.axesInfo[h] = {
					key: h,
					axis: u,
					coordSys: n,
					axisPointerModel: d,
					triggerTooltip: s,
					triggerEmphasis: m,
					involveSeries: g,
					snap: p,
					useHandle: VE(d),
					seriesModels: [],
					linkGroup: null
				};
				c[h] = _, e.seriesInvolved = e.seriesInvolved || g;
				var v = IE(a, u);
				if (v != null) {
					var y = o[v] || (o[v] = { axesInfo: {} });
					y.axesInfo[h] = _, y.mapper = a[v].mapper, _.linkGroup = y;
				}
			}
		}
	});
}
function PE(e, t, n, r, i, a) {
	var o = t.getModel("axisPointer"), s = [
		"type",
		"snap",
		"lineStyle",
		"shadowStyle",
		"label",
		"animation",
		"animationDurationUpdate",
		"animationEasingUpdate",
		"z"
	], c = {};
	V(s, function(e) {
		c[e] = z(o.get(e));
	}), c.snap = e.type !== "category" && !!a, o.get("type") === "cross" && (c.type = "line");
	var l = c.label ||= {};
	if (l.show ??= !1, i === "cross" && (l.show = o.get(["label", "show"]) ?? !0, !a)) {
		var u = c.lineStyle = o.get("crossStyle");
		u && Ut(l, u.textStyle);
	}
	return e.model.getModel("axisPointer", new Lh(c, n, r));
}
function FE(e, t) {
	t.eachSeries(function(t) {
		var n = t.coordinateSystem, r = t.get(["tooltip", "trigger"], !0), i = t.get(["tooltip", "show"], !0);
		n && n.model && r !== "none" && r !== !1 && r !== "item" && i !== !1 && t.get(["axisPointer", "show"], !0) !== !1 && V(e.coordSysAxesInfo[HE(n.model)], function(e) {
			var r = e.axis;
			n.getAxis(r.dim) === r && (e.seriesModels.push(t), e.seriesDataCount ??= 0, e.seriesDataCount += t.getData().count());
		});
	});
}
function IE(e, t) {
	for (var n = t.model, r = t.dim, i = 0; i < e.length; i++) {
		var a = e[i] || {};
		if (LE(a[r + "AxisId"], n.id) || LE(a[r + "AxisIndex"], n.componentIndex) || LE(a[r + "AxisName"], n.name)) return i;
	}
}
function LE(e, t) {
	return e === "all" || U(e) && Wt(e, t) >= 0 || e === t;
}
function RE(e) {
	var t = zE(e);
	if (t) {
		var n = t.axisPointerModel, r = t.axis.scale, i = n.option, a = n.get("status"), o = n.get("value");
		o != null && (o = r.parse(o));
		var s = VE(n);
		a ?? (i.status = s ? "show" : "hide");
		var c = r.getExtent();
		(o == null || o > c[1]) && (o = c[1]), o < c[0] && (o = c[0]), i.value = o, s && (i.status = t.axis.scale.isBlank() ? "hide" : "show");
	}
}
function zE(e) {
	var t = (e.ecModel.getComponent("axisPointer") || {}).coordSysAxesInfo;
	return t && t.axesInfo[HE(e)];
}
function BE(e) {
	var t = zE(e);
	return t && t.axisPointerModel;
}
function VE(e) {
	return !!e.get(["handle", "show"]);
}
function HE(e) {
	return e.type + "||" + e.id;
}
// node_modules/echarts/lib/component/axis/AxisView.js
var UE = {}, WE = function(e) {
	L(t, e);
	function t() {
		var n = e !== null && e.apply(this, arguments) || this;
		return n.type = t.type, n;
	}
	return t.prototype.render = function(t, n, r, i) {
		this.axisPointerClass && RE(t), e.prototype.render.apply(this, arguments), this._doUpdateAxisPointerClass(t, r, !0);
	}, t.prototype.updateAxisPointer = function(e, t, n, r) {
		this._doUpdateAxisPointerClass(e, n, !1);
	}, t.prototype.remove = function(e, t) {
		var n = this._axisPointer;
		n && n.remove(t);
	}, t.prototype.dispose = function(t, n) {
		this._disposeAxisPointer(n), e.prototype.dispose.apply(this, arguments);
	}, t.prototype._doUpdateAxisPointerClass = function(e, n, r) {
		var i = t.getAxisPointerClass(this.axisPointerClass);
		if (i) {
			var a = BE(e);
			a ? (this._axisPointer ||= new i()).render(e, a, n, r) : this._disposeAxisPointer(n);
		}
	}, t.prototype._disposeAxisPointer = function(e) {
		this._axisPointer && this._axisPointer.dispose(e), this._axisPointer = null;
	}, t.registerAxisPointerClass = function(e, t) {
		UE[e] = t;
	}, t.getAxisPointerClass = function(e) {
		return e && UE[e];
	}, t.type = "axis", t;
}(Zy);
// node_modules/zrender/lib/canvas/Layer.js
function GE(e, t, n) {
	var r = Tt.createCanvas(), i = t.getWidth(), a = t.getHeight(), o = r.style;
	return o && (o.position = "absolute", o.left = "0", o.top = "0", o.width = i + "px", o.height = a + "px", r.setAttribute("data-zr-dom-id", e)), r.width = i * n, r.height = a * n, r;
}
function KE(e) {
	return !e.__cursors.get(0);
}
function qE(e) {
	var t = e.__cursors.get(0);
	return {
		startIdx: t ? t.startIdx : 0,
		endIdx: t ? t.endIdx : 0
	};
}
var JE = function(e) {
	L(t, e);
	function t(t, n, r) {
		var i = e.call(this) || this;
		i.motionBlur = !1, i.lastFrameAlpha = .7, i.dpr = 1, i.virtual = !1, i.config = {}, i.zlevel = 0, i.zlevel2 = 0, i.maxRepaintRectCount = 5, i.__dirty = !0, i.__firstTimePaint = !0, i.__prevIdx = {
			startIdx: 0,
			endIdx: 0
		};
		var a;
		r ||= _o, typeof t == "string" ? a = GE(t, n, r) : K(t) && (a = t, t = a.id), i.id = t, i.dom = a;
		var o = a.style;
		return o && (wn(a), a.onselectstart = function() {
			return !1;
		}, o.padding = "0", o.margin = "0", o.borderWidth = "0"), i.painter = n, i.dpr = r, i;
	}
	return t.prototype.afterBrush = function() {
		this.__prevIdx = qE(this);
	}, t.prototype.initContext = function() {
		this.ctx = this.dom.getContext("2d"), this.ctx.dpr = this.dpr;
	}, t.prototype.setUnpainted = function() {
		this.__firstTimePaint = !0;
	}, t.prototype.createBackBuffer = function() {
		var e = this.dpr;
		this.domBack = GE("back-" + this.id, this.painter, e), this.ctxBack = this.domBack.getContext("2d"), e !== 1 && this.ctxBack.scale(e, e);
	}, t.prototype.createRepaintRects = function(e, t, n, r) {
		if (this.__firstTimePaint) return this.__firstTimePaint = !1, null;
		var i = [], a = this.maxRepaintRectCount, o = !1, s = new X(0, 0, 0, 0);
		function c(e) {
			if (e.isFinite() && !e.isZero()) {
				if (i.length === 0) {
					var t = new X(0, 0, 0, 0);
					t.copy(e), i.push(t);
				} else {
					for (var n = !1, r = Infinity, c = 0, l = 0; l < i.length; ++l) {
						var u = i[l];
						if (u.intersect(e)) {
							var d = new X(0, 0, 0, 0);
							d.copy(u), d.union(e), i[l] = d, n = !0;
							break;
						}
						if (o) {
							s.copy(e), s.union(u);
							var f = e.width * e.height, p = u.width * u.height, m = s.width * s.height - f - p;
							m < r && (r = m, c = l);
						}
					}
					if (o && (i[c].union(e), n = !0), !n) {
						var t = new X(0, 0, 0, 0);
						t.copy(e), i.push(t);
					}
					o ||= i.length >= a;
				}
			}
		}
		for (var l = qE(this), u = l.startIdx; u < l.endIdx; ++u) {
			var d = e[u];
			if (d) {
				var f = d.shouldBePainted(n, r, !0, !0), p = d.__isRendered && (d.__dirty & 1 || !f) ? d.getPrevPaintRect() : null;
				p && c(p);
				var m = f && (d.__dirty & 1 || !d.__isRendered) ? d.getPaintRect() : null;
				m && c(m);
			}
		}
		for (var h = this.__prevIdx, u = h.startIdx; u < h.endIdx; ++u) {
			var d = t[u], f = d && d.shouldBePainted(n, r, !0, !0);
			if (d && (!f || !d.__zr) && d.__isRendered) {
				var p = d.getPrevPaintRect();
				p && c(p);
			}
		}
		var g;
		do {
			g = !1;
			for (var u = 0; u < i.length;) if (i[u].isZero()) i.splice(u, 1);
			else {
				for (var _ = u + 1; _ < i.length;) i[u].intersect(i[_]) ? (g = !0, i[u].union(i[_]), i.splice(_, 1)) : _++;
				u++;
			}
		} while (g);
		return this._paintRects = i, i;
	}, t.prototype.debugGetPaintRects = function() {
		return (this._paintRects || []).slice();
	}, t.prototype.resize = function(e, t) {
		var n = this.dpr, r = this.dom, i = r.style, a = this.domBack;
		i && (i.width = e + "px", i.height = t + "px"), r.width = e * n, r.height = t * n, a && (a.width = e * n, a.height = t * n, n !== 1 && this.ctxBack.scale(n, n));
	}, t.prototype.clear = function(e, t, n) {
		var r = this.dom, i = this.ctx, a = r.width, o = r.height;
		t ||= this.clearColor;
		var s = this.motionBlur && !e, c = this.lastFrameAlpha, l = this.dpr, u = this;
		s && (this.domBack || this.createBackBuffer(), this.ctxBack.globalCompositeOperation = "copy", this.ctxBack.drawImage(r, 0, 0, a / l, o / l));
		var d = this.domBack;
		function f(e, n, r, a) {
			if (i.clearRect(e, n, r, a), t && t !== "transparent") {
				var o = void 0;
				on(t) ? (o = (t.global || t.__width === r && t.__height === a) && t.__canvasGradient || Tx(i, t, {
					x: 0,
					y: 0,
					width: r,
					height: a
				}), t.__canvasGradient = o, t.__width = r, t.__height = a) : sn(t) && (t.scaleX = t.scaleX || l, t.scaleY = t.scaleY || l, o = Lx(i, t, { dirty: function() {
					u.setUnpainted(), u.painter.refresh();
				} })), i.save(), i.fillStyle = o || t, i.fillRect(e, n, r, a), i.restore();
			}
			s && (i.save(), i.globalAlpha = c, i.drawImage(d, e, n, r, a), i.restore());
		}
		!n || s ? f(0, 0, a, o) : n.length && V(n, function(e) {
			f(e.x * l, e.y * l, e.width * l, e.height * l);
		});
	}, t;
}(qn), YE = 1e5, XE = 314159, ZE = void 0, QE = 1, $E = 2;
function eD(e) {
	return e ? e.__builtin__ ? !0 : typeof e.resize == "function" && typeof e.refresh == "function" : !1;
}
function tD(e, t) {
	var n = document.createElement("div");
	return n.style.cssText = [
		"position:relative",
		"width:" + e + "px",
		"height:" + t + "px",
		"padding:0",
		"margin:0",
		"border-width:0"
	].join(";") + ";", n;
}
function nD(e, t, n, r) {
	var i = new JE(e, t, t.dpr);
	return i.zlevel = n, i.zlevel2 = r, i.__builtin__ = !0, rD(i), i;
}
function rD(e) {
	e.__cursorStack = [], e.__cursors = J();
}
function iD(e) {
	return e.startIdx = e.drawIdx = e.endIdx = e.endIdxNew = 0, e.used = !1, e.first = e.last = NaN, e.notClearIdx = -1, e;
}
function aD(e, t) {
	var n = e.__cursors, r = +t;
	return n.get(r) || (e.__cursorStack.push(r), n.set(r, iD({ key: r })));
}
function oD(e, t) {
	for (var n = e.__cursorStack, r = 0; r < n.length; r++) t(e.__cursors.get(n[r]));
}
function sD(e, t) {
	var n = e.layers;
	return n[t] || (n[t] = [
		,
		,
		,
	]);
}
function cD(e, t, n) {
	for (var r = e.layerStack, i = 0; i < r.length; i++) {
		var a = r[i].zl, o = r[i].zl2, s = e.layers[a][o];
		n && (n & lD && !s.__builtin__ || n & uD && s.__builtin__ || n & dD && s === e.hoverlayer) || t(s, a, o, i);
	}
}
var lD = 1, uD = 2, dD = 4, fD = lD | dD, pD = function() {
	function e(e, t, n, r) {
		this.type = "canvas", this._prevDisplayList = [], this._layerConfig = {}, this._needsManuallyCompositing = !1, this.type = "canvas", this._i = {
			layerStack: [],
			layers: []
		};
		var i = !e.nodeName || e.nodeName.toUpperCase() === "CANVAS";
		if (this._opts = n = B({}, n || {}), this.dpr = n.devicePixelRatio || _o, this._singleCanvas = i, this.root = e, e.style && (wn(e), e.innerHTML = ""), this.storage = t, this._prevDisplayList = [], i) {
			var a = e, o = a.width, s = a.height;
			n.width != null && (o = n.width), n.height != null && (s = n.height), this.dpr = n.devicePixelRatio || 1, a.width = o * this.dpr, a.height = s * this.dpr, this._width = o, this._height = s;
			var c = nD(a, this, XE, 0);
			c.initContext(), this._insertLayer(c, XE, 0, !0), this._domRoot = e;
		} else {
			this._width = Ox(e, 0, n), this._height = Ox(e, 1, n);
			var l = this._domRoot = tD(this._width, this._height);
			e.appendChild(l);
		}
	}
	return e.prototype.getType = function() {
		return "canvas";
	}, e.prototype.isSingleCanvas = function() {
		return this._singleCanvas;
	}, e.prototype.getViewportRoot = function() {
		return this._domRoot;
	}, e.prototype.getViewportRootOffset = function() {
		var e = this.getViewportRoot();
		if (e) return {
			offsetLeft: e.offsetLeft || 0,
			offsetTop: e.offsetTop || 0
		};
	}, e.prototype.refresh = function(e) {
		var t = e && !K(e) ? { paintAll: !!e } : e || {}, n = q(t.refresh, !0), r = q(t.refreshHover, !1);
		if (r && (this._hoverLayerDirty = $E), !n) return r && this._paintHoverList(this.storage.getDisplayList(!1)), this;
		var i = this.storage.getDisplayList(!0);
		this._updateLayerStatus(i, t.paintAll), this._redrawId = Math.random();
		var a = this._prevDisplayList;
		this._paintList(i, a, this._redrawId);
		var o = this._backgroundColor;
		return cD(this._i, function(e, t, n, r) {
			e.refresh && e.refresh(r === 0 ? o : null);
		}, uD), this._opts.useDirtyRect && (this._prevDisplayList = i.slice()), this;
	}, e.prototype._paintHoverList = function(e) {
		var t = this._i.hoverlayer, n = this._hoverLayerDirty;
		if (this._hoverLayerDirty = ZE, n !== ZE && (!t && n === $E && (t = this._i.hoverlayer = this._ensureLayer(YE)), t)) {
			t.clear();
			for (var r = {
				inHover: !0,
				viewWidth: this._width,
				viewHeight: this._height,
				beforeBrushParam: {}
			}, i, a = 0, o = e.length; a < o; a++) {
				var s = e[a];
				if (s.__inHover) {
					i || (i = t.ctx, i.save());
					var c = s.__hoverStyle, l = void 0;
					c && (l = s.style, s.style = c), nS(i, s, r), c && (s.style = l);
				}
			}
			i && (rS(i, r), i.restore());
		}
	}, e.prototype.getHoverLayer = function() {
		return this._ensureLayer(YE);
	}, e.prototype.paintOne = function(e, t) {
		tS(e, t);
	}, e.prototype._paintList = function(e, t, n) {
		if (this._redrawId === n) {
			var r = this._doPaintList(e, t);
			if (this._needsManuallyCompositing && this._compositeManually(), r) cD(this._i, function(e) {
				e.afterBrush && e.afterBrush();
			}, fD), this._paintHoverList(e);
			else {
				var i = this;
				Ci(function() {
					i._paintList(e, t, n);
				});
			}
		}
	}, e.prototype._compositeManually = function() {
		var e = this._ensureLayer(XE).ctx, t = this._domRoot.width, n = this._domRoot.height;
		e.clearRect(0, 0, t, n), cD(this._i, function(r) {
			r.virtual && e.drawImage(r.dom, 0, 0, t, n);
		}, lD);
	}, e.prototype._doPaintList = function(e, t) {
		var n = this, r = !0;
		return cD(this._i, function(i) {
			var a = !1;
			if (oD(i, function(e) {
				(e.drawIdx < e.endIdx || e.notClearIdx >= 0) && (a = !0);
			}), a || i.__dirty) {
				var o = n._opts.useDirtyRect && !KE(i) ? i.createRepaintRects(e, t, n._width, n._height) : null, s = n._i.layerStack[0], c = !0;
				if (i.__dirty) {
					c = !1, i.__dirty = !1;
					var l = i.zlevel === s.zl && i.zlevel2 === s.zl2 ? n._backgroundColor : null;
					i.clear(!1, l, o);
				}
				oD(i, function(t) {
					var a = n._paintPerCursor(i, t, e, o, c);
					r &&= a;
				});
			}
		}, fD), R.wxa && cD(this._i, function(e) {
			e && e.ctx && e.ctx.draw && e.ctx.draw();
		}), r;
	}, e.prototype._paintPerCursor = function(e, t, n, r, i) {
		var a = e.ctx;
		if (r) {
			if (!r.length) t.drawIdx = t.endIdx;
			else for (var o = this.dpr, s = 0; s < r.length; ++s) {
				var c = r[s];
				a.save(), a.beginPath(), a.rect(c.x * o, c.y * o, c.width * o, c.height * o), a.clip(), this._paintPerCursorInRect(e, t, n, c, i), a.restore();
			}
		} else a.save(), this._paintPerCursorInRect(e, t, n, null, i), a.restore();
		return t.drawIdx >= t.endIdx;
	}, e.prototype._paintPerCursorInRect = function(e, t, n, r, i) {
		for (var a = {
			inHover: !1,
			allClipped: !1,
			prevEl: null,
			viewWidth: this._width,
			viewHeight: this._height,
			beforeBrushParam: { contentRetained: i }
		}, o = e.ctx, s = KE(e), c = s && Tt.getTime(), l = t.drawIdx, u = t.notClearIdx, d = u >= 0 ? Math.min(u, l) : l; d < t.endIdx; d++) {
			var f = n[d];
			if (!(d < l && !f.notClear)) {
				if (f.__inHover && (this._hoverLayerDirty = $E), r != null) {
					var p = f.getPaintRect();
					p && p.intersect(r) && (nS(o, f, a), f.setPrevPaintRect(p));
				} else nS(o, f, a);
				if (s && Tt.getTime() - c > 15) {
					d++;
					break;
				}
			}
		}
		rS(o, a), t.drawIdx = Math.max(d, l);
	}, e.prototype.getLayer = function(e, t) {
		return this._ensureLayer(e, 0, t);
	}, e.prototype._ensureLayer = function(e, t, n) {
		t ||= 0;
		var r = this._singleCanvas;
		r && !this._needsManuallyCompositing && (e = XE, t = 0);
		var i = sD(this._i, e)[t];
		return i || (i = nD("zr_" + e + "." + t, this, e, t), this._layerConfig[e] && Vt(i, this._layerConfig[e], !0), (n || r && e !== XE) && (i.virtual = !0), this._insertLayer(i, e, t, !1), i.initContext()), i;
	}, e.prototype.insertLayer = function(e, t) {
		this._insertLayer(t, e, 0, !1);
	}, e.prototype._insertLayer = function(e, t, n, r) {
		var i = this._i, a = i.layers, o = i.layerStack, s = this._domRoot, c = null;
		if (!(a[t] && a[t][n]) && eD(e)) {
			for (var l = o.length, u = 0; u < l && (o[u].zl < t || o[u].zl === t && o[u].zl2 < n);) u++;
			if (u > 0 && (c = sD(i, o[u - 1].zl)[o[u - 1].zl2]), o.splice(u, 0, {
				zl: t,
				zl2: n
			}), sD(i, t)[n] = e, !r && !e.virtual) {
				if (c) {
					var d = c.dom;
					d.nextSibling ? s.insertBefore(e.dom, d.nextSibling) : s.appendChild(e.dom);
				} else s.firstChild ? s.insertBefore(e.dom, s.firstChild) : s.appendChild(e.dom);
			}
			e.painter ||= this;
		}
	}, e.prototype.eachLayer = function(e, t) {
		return cD(this._i, function(n, r) {
			e.call(t, n, r);
		});
	}, e.prototype.eachBuiltinLayer = function(e, t) {
		return cD(this._i, function(n, r) {
			e.call(t, n, r);
		}, lD);
	}, e.prototype.eachOtherLayer = function(e, t) {
		return cD(this._i, function(n, r) {
			e.call(t, n, r);
		}, uD);
	}, e.prototype.getLayers = function() {
		var e = {};
		return cD(this._i, function(t, n, r) {
			e[t.id] = t;
		}), e;
	}, e.prototype._updateLayerStatus = function(e, t) {
		var n = this;
		if (n._singleCanvas) for (var r = 1; r < e.length; r++) {
			var i = e[r];
			if (i.zlevel !== e[r - 1].zlevel || i.incremental) {
				n._needsManuallyCompositing = !0;
				break;
			}
		}
		cD(n._i, function(e) {
			e.__dirty = !1, oD(e, function(e) {
				e.used = !1, e.endIdxNew = 0, e.notClearIdx = -1;
			});
		}, fD);
		for (var a, o = null, s = null, c = !1, l = 0, u = e.length; l < u; l++) {
			var i = e[l], d = i.zlevel, f = i.incremental, p = void 0;
			if (a !== d && (a = d, c = !1), f ? (c = !0, p = 1) : p = c ? 2 : 0, (!o || d !== o.zlevel || p !== o.zlevel2) && (o = n._ensureLayer(d, p), s = null, !o.__builtin__)) Bt("ZLevel " + d + " has been used by unknown layer " + o.id);
			else {
				if ((!s || f !== s.key) && (s = aD(o, f), !s.used)) {
					if (s.used = !0, !t && s.first === i.id) {
						var m = l - s.startIdx;
						s.startIdx = l, s.drawIdx += m, s.endIdx += m;
					} else o.__dirty = !0, s.first = i.id, s.startIdx = s.drawIdx = l, s.endIdx = l + 1;
				}
				s.endIdxNew = l + 1, i.__dirty & 1 && !i.__inHover && ((!f || !i.notClear && l < s.drawIdx) && (o.__dirty = !0), f && i.notClear && s.notClearIdx < 0 && (s.notClearIdx = l));
			}
		}
		cD(n._i, function(t) {
			for (var r = t.__cursorStack, i = t.__cursors, a = r.length - 1; a >= 0; a--) {
				var o = i.get(r[a]);
				if (!o.used) t.__dirty = !0, i.removeKey(r[a]), r.splice(a, 1);
				else {
					var s = o.endIdxNew;
					(KE(t) ? s < o.drawIdx : s !== o.endIdx || !s || e[s - 1].id !== o.last) && (t.__dirty = !0), o.endIdx = o.endIdxNew, o.last = s ? e[s - 1].id : NaN;
				}
			}
			t.__dirty && (oD(t, function(e) {
				e.drawIdx = e.startIdx;
			}), n._hoverLayerDirty === ZE && (n._hoverLayerDirty = QE));
		}, fD);
	}, e.prototype.clear = function() {
		return cD(this._i, function(e) {
			e.clear(), rD(e);
		}, lD), this;
	}, e.prototype.setBackgroundColor = function(e) {
		this._backgroundColor = e, cD(this._i, function(e) {
			e.setUnpainted();
		});
	}, e.prototype.configLayer = function(e, t) {
		if (t) {
			var n = this._layerConfig;
			n[e] ? Vt(n[e], t, !0) : n[e] = t, cD(this._i, function(e, t) {
				Vt(e, n[t], !0);
			});
		}
	}, e.prototype.delLayer = function(e) {
		for (var t = this._i.layerStack, n = this._i.layers, r = t.length - 1; r >= 0; r--) {
			var i = t[r];
			if (i.zl === e) {
				var a = n[e][i.zl2];
				if (a.__builtin__) continue;
				if (t.splice(r, 1), n[e][i.zl2] = void 0, !a.virtual) {
					var o = a.dom.parentNode;
					o && o.removeChild(a.dom);
				}
			}
		}
	}, e.prototype.resize = function(e, t) {
		if (this._domRoot.style) {
			var n = this._domRoot;
			n.style.display = "none";
			var r = this._opts, i = this.root;
			e != null && (r.width = e), t != null && (r.height = t), e = Ox(i, 0, r), t = Ox(i, 1, r), n.style.display = "", (this._width !== e || t !== this._height) && (n.style.width = e + "px", n.style.height = t + "px", cD(this._i, function(n) {
				n.resize(e, t);
			}), this.refresh({ paintAll: !0 })), this._width = e, this._height = t;
		} else {
			if (e == null || t == null) return;
			this._width = e, this._height = t, this._ensureLayer(XE).resize(e, t);
		}
		return this;
	}, e.prototype.clearLayer = function(e) {
		V(this._i.layers[e], function(e) {
			e && !e.__builtin__ && e.clear();
		});
	}, e.prototype.dispose = function() {
		this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._i = null;
	}, e.prototype.getRenderedCanvas = function(e) {
		if (e ||= {}, this._singleCanvas && !this._compositeManually) return this._i.layers[XE][0].dom;
		var t = new JE("image", this, e.pixelRatio || this.dpr);
		t.initContext(), t.clear(!1, e.backgroundColor || this._backgroundColor);
		var n = t.ctx;
		if (e.pixelRatio <= this.dpr) {
			this.refresh();
			var r = t.dom.width, i = t.dom.height;
			cD(this._i, function(e) {
				e.__builtin__ ? n.drawImage(e.dom, 0, 0, r, i) : e.renderToCanvas && (n.save(), e.renderToCanvas(n), n.restore());
			});
		} else {
			for (var a = {
				inHover: !1,
				viewWidth: this._width,
				viewHeight: this._height,
				beforeBrushParam: {}
			}, o = this.storage.getDisplayList(!0), s = 0, c = o.length; s < c; s++) {
				var l = o[s];
				nS(n, l, a);
			}
			rS(n, a);
		}
		return t.dom;
	}, e.prototype.getWidth = function() {
		return this._width;
	}, e.prototype.getHeight = function() {
		return this._height;
	}, e;
}();
// node_modules/echarts/lib/renderer/installCanvasRenderer.js
function mD(e) {
	e.registerPainter("canvas", pD);
}
// node_modules/echarts/lib/component/axisPointer/BaseAxisPointer.js
var hD = Z(), gD = z, _D = Qt, vD = function() {
	function e() {
		this._dragging = !1, this.animationThreshold = 15;
	}
	return e.prototype.render = function(e, t, n, r) {
		var i = t.get("value"), a = t.get("status");
		if (this._axisModel = e, this._axisPointerModel = t, this._api = n, r || this._lastValue !== i || this._lastStatus !== a) {
			this._lastValue = i, this._lastStatus = a;
			var o = this._group, s = this._handle;
			if (!a || a === "hide") o && o.hide(), s && s.hide();
			else {
				o && o.show(), s && s.show();
				var c = {};
				this.makeElOption(c, i, e, t, n);
				var l = c.graphicKey;
				l !== this._lastGraphicKey && this.clear(n), this._lastGraphicKey = l;
				var u = this._moveAnimation = this.determineAnimation(e, t);
				if (!o) o = this._group = new us(), this.createPointerEl(o, c, e, t), this.createLabelEl(o, c, e, t), n.getZr().add(o);
				else {
					var d = $t(yD, t, u);
					this.updatePointerEl(o, c, d), this.updateLabelEl(o, c, d, t);
				}
				CD(o, t, !0), this._renderHandle(i);
			}
		}
	}, e.prototype.remove = function(e) {
		this.clear(e);
	}, e.prototype.dispose = function(e) {
		this.clear(e);
	}, e.prototype.determineAnimation = function(e, t) {
		var n = t.get("animation"), r = e.axis, i = r.type === "category", a = t.get("snap");
		if (!a && !i) return !1;
		if (n === "auto" || n == null) {
			var o = this.animationThreshold;
			if (i && Kw(r).w > o) return !0;
			if (a) {
				var s = zE(e).seriesDataCount, c = r.getExtent();
				return Math.abs(c[0] - c[1]) / s > o;
			}
			return !1;
		}
		return n === !0;
	}, e.prototype.makeElOption = function(e, t, n, r, i) {}, e.prototype.createPointerEl = function(e, t, n, r) {
		var i = t.pointer;
		if (i) {
			var a = hD(e).pointerEl = new _m[i.type](gD(t.pointer));
			e.add(a);
		}
	}, e.prototype.createLabelEl = function(e, t, n, r) {
		if (t.label) {
			var i = hD(e).labelEl = new od(gD(t.label));
			e.add(i), xD(i, r);
		}
	}, e.prototype.updatePointerEl = function(e, t, n) {
		var r = hD(e).pointerEl;
		r && t.pointer && (r.setStyle(t.pointer.style), n(r, { shape: t.pointer.shape }));
	}, e.prototype.updateLabelEl = function(e, t, n, r) {
		var i = hD(e).labelEl;
		i && (i.setStyle(t.label.style), n(i, {
			x: t.label.x,
			y: t.label.y
		}), xD(i, r));
	}, e.prototype._renderHandle = function(e) {
		if (!this._dragging && this.updateHandleTransform) {
			var t = this._axisPointerModel, n = this._api.getZr(), r = this._handle, i = t.getModel("handle"), a = t.get("status");
			if (!i.get("show") || !a || a === "hide") r && n.remove(r), this._handle = null;
			else {
				var o;
				this._handle || (o = !0, r = this._handle = Hm(i.get("icon"), {
					cursor: "move",
					draggable: !0,
					onmousemove: function(e) {
						vr(e.event);
					},
					onmousedown: _D(this._onHandleDragMove, this, 0, 0),
					drift: _D(this._onHandleDragMove, this),
					ondragend: _D(this._onHandleDragEnd, this)
				}), n.add(r)), CD(r, t, !1), r.setStyle(i.getItemStyle(null, [
					"color",
					"borderColor",
					"borderWidth",
					"opacity",
					"shadowColor",
					"shadowBlur",
					"shadowOffsetX",
					"shadowOffsetY"
				]));
				var s = i.get("size");
				U(s) || (s = [s, s]), r.scaleX = s[0] / 2, r.scaleY = s[1] / 2, db(this, "_doDispatchAxisPointer", i.get("throttle") || 0, "fixRate"), this._moveHandleToValue(e, o);
			}
		}
	}, e.prototype._moveHandleToValue = function(e, t) {
		yD(this._axisPointerModel, !t && this._moveAnimation, this._handle, SD(this.getHandleTransform(e, this._axisModel, this._axisPointerModel)));
	}, e.prototype._onHandleDragMove = function(e, t) {
		var n = this._handle;
		if (n) {
			this._dragging = !0;
			var r = this.updateHandleTransform(SD(n), [e, t], this._axisModel, this._axisPointerModel);
			this._payloadInfo = r, n.stopAnimation(), n.attr(SD(r)), hD(n).lastProp = null, this._doDispatchAxisPointer();
		}
	}, e.prototype._doDispatchAxisPointer = function() {
		if (this._handle) {
			var e = this._payloadInfo, t = this._axisModel;
			this._api.dispatchAction({
				type: "updateAxisPointer",
				x: e.cursorPoint[0],
				y: e.cursorPoint[1],
				tooltipOption: e.tooltipOption,
				axesInfo: [{
					axisDim: t.axis.dim,
					axisIndex: t.componentIndex
				}]
			});
		}
	}, e.prototype._onHandleDragEnd = function() {
		if (this._dragging = !1, this._handle) {
			var e = this._axisPointerModel.get("value");
			this._moveHandleToValue(e), this._api.dispatchAction({ type: "hideTip" });
		}
	}, e.prototype.clear = function(e) {
		this._lastValue = null, this._lastStatus = null;
		var t = e.getZr(), n = this._group, r = this._handle;
		t && n && (this._lastGraphicKey = null, n && t.remove(n), r && t.remove(r), this._group = null, this._handle = null, this._payloadInfo = null), fb(this, "_doDispatchAxisPointer");
	}, e.prototype.doClear = function() {}, e.prototype.buildLabel = function(e, t, n) {
		return n ||= 0, {
			x: e[n],
			y: e[1 - n],
			width: t[n],
			height: t[1 - n]
		};
	}, e;
}();
function yD(e, t, n, r) {
	bD(hD(n).lastProp, r) || (hD(n).lastProp = r, t ? um(n, r, e) : (n.stopAnimation(), n.attr(r)));
}
function bD(e, t) {
	if (K(e) && K(t)) {
		var n = !0;
		return V(t, function(t, r) {
			n &&= bD(e[r], t);
		}), !!n;
	}
	return e === t;
}
function xD(e, t) {
	e[t.get(["label", "show"]) ? "show" : "hide"]();
}
function SD(e) {
	return {
		x: e.x || 0,
		y: e.y || 0,
		rotation: e.rotation || 0
	};
}
function CD(e, t, n) {
	var r = t.get("z"), i = t.get("zlevel");
	e && e.traverse(function(e) {
		e.type !== "group" && (r != null && (e.z = r), i != null && (e.zlevel = i), e.silent = n);
	});
}
// node_modules/echarts/lib/component/axisPointer/viewHelper.js
function wD(e) {
	var t = e.get("type"), n = e.getModel(t + "Style"), r;
	return t === "line" ? (r = n.getLineStyle(), r.fill = null) : t === "shadow" && (r = n.getAreaStyle(), r.stroke = null), r;
}
function TD(e, t, n, r, i) {
	var a = DD(n.get("value"), t.axis, t.ecModel, n.get("seriesDataIndices"), {
		precision: n.get(["label", "precision"]),
		formatter: n.get(["label", "formatter"])
	}), o = n.getModel("label"), s = gg(o.get("padding") || 0), c = o.getFont(), l = Vo(a, c), u = i.position, d = l.width + s[1] + s[3], f = l.height + s[0] + s[2], p = i.align;
	p === "right" && (u[0] -= d), p === "center" && (u[0] -= d / 2);
	var m = i.verticalAlign;
	m === "bottom" && (u[1] -= f), m === "middle" && (u[1] -= f / 2), ED(u, d, f, r);
	var h = o.get("backgroundColor");
	h && h !== "auto" || (h = t.get([
		"axisLine",
		"lineStyle",
		"color"
	])), e.label = {
		x: u[0],
		y: u[1],
		style: gh(o, {
			text: a,
			font: c,
			fill: o.getTextColor(),
			padding: s,
			backgroundColor: h
		}),
		z2: 10
	};
}
function ED(e, t, n, r) {
	var i = r.getWidth(), a = r.getHeight();
	e[0] = Math.min(e[0] + t, i) - t, e[1] = Math.min(e[1] + n, a) - n, e[0] = Math.max(e[0], 0), e[1] = Math.max(e[1], 0);
}
function DD(e, t, n, r, i) {
	e = t.scale.parse(e);
	var a = t.scale.getLabel({ value: e }, { precision: i.precision }), o = i.formatter;
	if (o) {
		var s = {
			value: kw(t, { value: e }),
			axisDimension: t.dim,
			axisIndex: t.index,
			seriesData: []
		};
		V(r, function(e) {
			var t = n.getSeriesByIndex(e.seriesIndex), r = e.dataIndexInside, i = t && t.getDataParams(r);
			i && s.seriesData.push(i);
		}), G(o) ? a = o.replace("{value}", a) : W(o) && (a = o(s));
	}
	return a;
}
function OD(e, t, n) {
	var r = Cr();
	return Or(r, r, n.rotation), Dr(r, r, n.position), Fm([e.dataToCoord(t), (n.labelOffset || 0) + (n.labelDirection || 1) * (n.labelMargin || 0)], r);
}
function kD(e, t, n, r, i, a) {
	var o = BT.innerTextLayout(n.rotation, 0, n.labelDirection);
	n.labelMargin = i.get(["label", "margin"]), TD(t, r, i, a, {
		position: OD(r.axis, e, n),
		align: o.textAlign,
		verticalAlign: o.textVerticalAlign
	});
}
function AD(e, t, n) {
	return n ||= 0, {
		x1: e[n],
		y1: e[1 - n],
		x2: t[n],
		y2: t[1 - n]
	};
}
function jD(e, t, n) {
	return n ||= 0, {
		x: e[n],
		y: e[1 - n],
		width: t[n],
		height: t[1 - n]
	};
}
function MD(e, t, n) {
	return Kw(e, {
		fromStat: { sers: H(t, function(e) {
			return n.getSeriesByIndex(e.seriesIndex);
		}) },
		min: 1
	}).w;
}
function ND(e, t, n) {
	return [Ss(xs(t[0], t[1]), e - n / 2), xs(e + n / 2, Ss(t[0], t[1]))];
}
// node_modules/echarts/lib/component/axisPointer/CartesianAxisPointer.js
var PD = function(e) {
	L(t, e);
	function t() {
		return e !== null && e.apply(this, arguments) || this;
	}
	return t.prototype.makeElOption = function(e, t, n, r, i) {
		var a = n.axis, o = a.grid, s = r.get("type"), c = a.getGlobalExtent(), l = FD(o, a).getOtherAxis(a).getGlobalExtent(), u = a.toGlobalCoord(a.dataToCoord(t, !0));
		if (s && s !== "none") {
			var d = wD(r), f = ID[s](a, u, c, l, r.get("seriesDataIndices"), r.ecModel);
			f.style = d, e.graphicKey = f.type, e.pointer = f;
		}
		kD(t, e, sE(o.getRect(), n), n, r, i);
	}, t.prototype.getHandleTransform = function(e, t, n) {
		var r = sE(t.axis.grid.getRect(), t, { labelInside: !1 });
		r.labelMargin = n.get(["handle", "margin"]);
		var i = OD(t.axis, e, r);
		return {
			x: i[0],
			y: i[1],
			rotation: r.rotation + (r.labelDirection < 0 ? Math.PI : 0)
		};
	}, t.prototype.updateHandleTransform = function(e, t, n, r) {
		var i = n.axis, a = i.grid, o = i.getGlobalExtent(!0), s = FD(a, i).getOtherAxis(i).getGlobalExtent(), c = i.dim === "x" ? 0 : 1, l = [e.x, e.y];
		l[c] += t[c], l[c] = xs(o[1], l[c]), l[c] = Ss(o[0], l[c]);
		var u = (s[1] + s[0]) / 2, d = [u, u];
		return d[c] = l[c], {
			x: l[0],
			y: l[1],
			rotation: e.rotation,
			cursorPoint: d,
			tooltipOption: [{ verticalAlign: "middle" }, { align: "center" }][c]
		};
	}, t;
}(vD);
function FD(e, t) {
	var n = {};
	return n[t.dim + "AxisIndex"] = t.index, e.getCartesian(n);
}
var ID = {
	line: function(e, t, n, r) {
		return {
			type: "Line",
			subPixelOptimize: !0,
			shape: AD([t, r[0]], [t, r[1]], LD(e))
		};
	},
	shadow: function(e, t, n, r, i, a) {
		var o = MD(e, i, a), s = r[1] - r[0], c = ND(t, n, o), l = c[0], u = c[1];
		return {
			type: "Rect",
			shape: jD([l, r[0]], [u - l, s], LD(e))
		};
	}
};
function LD(e) {
	return e.dim === "x" ? 0 : 1;
}
// node_modules/echarts/lib/component/axisPointer/AxisPointerModel.js
var RD = function(e) {
	L(t, e);
	function t() {
		var n = e !== null && e.apply(this, arguments) || this;
		return n.type = t.type, n;
	}
	return t.type = "axisPointer", t.defaultOption = {
		show: "auto",
		z: 50,
		type: "line",
		snap: !1,
		triggerTooltip: !0,
		triggerEmphasis: !0,
		value: null,
		status: null,
		link: [],
		animation: null,
		animationDurationUpdate: 200,
		lineStyle: {
			color: Kg.color.border,
			width: 1,
			type: "dashed"
		},
		shadowStyle: { color: Kg.color.shadowTint },
		label: {
			show: !0,
			formatter: null,
			precision: "auto",
			margin: 3,
			color: Kg.color.neutral00,
			padding: [
				5,
				7,
				5,
				7
			],
			backgroundColor: Kg.color.accent60,
			borderColor: null,
			borderWidth: 0,
			borderRadius: 3
		},
		handle: {
			show: !1,
			icon: "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z",
			size: 45,
			margin: 50,
			color: Kg.color.accent40,
			throttle: 40
		}
	}, t;
}(Wg), zD = Z(), BD = V;
function VD(e, t, n) {
	if (!R.node) {
		var r = t.getZr();
		zD(r).records || (zD(r).records = {}), HD(r, t);
		var i = zD(r).records[e] || (zD(r).records[e] = {});
		i.handler = n;
	}
}
function HD(e, t) {
	if (zD(e).initialized) return;
	zD(e).initialized = !0, n("click", $t(GD, "click")), n("mousemove", $t(GD, "mousemove")), n("mousewheel", $t(GD, "mousewheel")), n("globalout", WD);
	function n(n, r) {
		e.on(n, function(n) {
			var i = KD(t);
			BD(zD(e).records, function(e) {
				e && r(e, n, i.dispatchAction);
			}), UD(i.pendings, t);
		});
	}
}
function UD(e, t) {
	var n = e.showTip.length, r = e.hideTip.length, i;
	n ? i = e.showTip[n - 1] : r && (i = e.hideTip[r - 1]), i && (i.dispatchAction = null, t.dispatchAction(i));
}
function WD(e, t, n) {
	e.handler("leave", null, n);
}
function GD(e, t, n, r) {
	t.handler(e, n, r);
}
function KD(e) {
	var t = {
		showTip: [],
		hideTip: []
	}, n = function(r) {
		var i = t[r.type];
		i ? i.push(r) : (r.dispatchAction = n, e.dispatchAction(r));
	};
	return {
		dispatchAction: n,
		pendings: t
	};
}
function qD(e, t) {
	if (!R.node) {
		var n = t.getZr();
		(zD(n).records || {})[e] && (zD(n).records[e] = null);
	}
}
// node_modules/echarts/lib/component/axisPointer/AxisPointerView.js
var JD = function(e) {
	L(t, e);
	function t() {
		var n = e !== null && e.apply(this, arguments) || this;
		return n.type = t.type, n;
	}
	return t.prototype.render = function(e, t, n) {
		var r = t.getComponent("tooltip"), i = e.get("triggerOn") || r && r.get("triggerOn") || "mousemove|click|mousewheel";
		VD("axisPointer", n, function(e, t, n) {
			i !== "none" && (e === "leave" || i.indexOf(e) >= 0) && n({
				type: "updateAxisPointer",
				currTrigger: e,
				x: t && t.offsetX,
				y: t && t.offsetY
			});
		});
	}, t.prototype.remove = function(e, t) {
		qD("axisPointer", t);
	}, t.prototype.dispose = function(e, t) {
		qD("axisPointer", t);
	}, t.type = "axisPointer", t;
}(Zy);
// node_modules/echarts/lib/component/axisPointer/findPointFromSeries.js
function YD(e, t) {
	var n = [], r = e.seriesIndex, i;
	if (r == null || !(i = t.getSeriesByIndex(r))) return { point: [] };
	var a = i.getData(), o = Cc(a, e);
	if (o == null || o < 0 || U(o)) return { point: [] };
	var s = a.getItemGraphicEl(o), c = i.coordinateSystem;
	if (i.getTooltipPosition) n = i.getTooltipPosition(o) || [];
	else if (c && c.dataToPoint) {
		if (e.isStacked) {
			var l = c.getBaseAxis(), u = c.getOtherAxis(l).dim, d = l.dim, f = +(u === "x" || u === "radius"), p = a.mapDimension(d), m = [];
			m[f] = a.get(p, o), m[1 - f] = a.get(a.getCalculationInfo("stackResultDimension"), o), n = c.dataToPoint(m) || [];
		} else n = c.dataToPoint(a.getValues(H(c.dimensions, function(e) {
			return a.mapDimension(e);
		}), o)) || [];
	} else if (s) {
		var h = s.getBoundingRect().clone();
		h.applyTransform(s.transform), n = [h.x + h.width / 2, h.y + h.height / 2];
	}
	return {
		point: n,
		el: s
	};
}
// node_modules/echarts/lib/component/axisPointer/axisTrigger.js
var XD = Z();
function ZD(e, t, n) {
	var r = e.currTrigger, i = [e.x, e.y], a = e, o = e.dispatchAction || Qt(n.dispatchAction, n), s = t.getComponent("axisPointer").coordSysAxesInfo;
	if (s) {
		sO(i) && (i = YD({
			seriesIndex: a.seriesIndex,
			dataIndex: a.dataIndex
		}, t).point);
		var c = sO(i), l = a.axesInfo, u = s.axesInfo, d = r === "leave" || sO(i), f = {}, p = {}, m = {
			list: [],
			map: {}
		}, h = {
			showPointer: $t(eO, p),
			showTooltip: $t(tO, m)
		};
		V(s.coordSysMap, function(e, t) {
			var n = c || e.containPoint(i);
			V(s.coordSysAxesInfo[t], function(e, t) {
				var r = e.axis, a = aO(l, e);
				if (!d && n && (!l || a)) {
					var o = a && a.value;
					o == null && !c && (o = r.pointToData(i)), o != null && QD(e, o, h, !1, f);
				}
			});
		});
		var g = {};
		return V(u, function(e, t) {
			var n = e.linkGroup;
			n && !p[t] && V(n.axesInfo, function(t, r) {
				var i = p[r];
				if (t !== e && i) {
					var a = i.value;
					n.mapper && (a = e.axis.scale.parse(n.mapper(a, oO(t), oO(e)))), g[e.key] = a;
				}
			});
		}), V(g, function(e, t) {
			QD(u[t], e, h, !0, f);
		}), nO(p, u, f), rO(m, i, e, o), iO(u, o, n), f;
	}
}
function QD(e, t, n, r, i) {
	var a = e.axis;
	if (!a.scale.isBlank() && a.containData(t)) {
		if (!e.involveSeries) n.showPointer(e, t);
		else {
			var o = $D(t, e), s = o.payloadBatch, c = o.snapToValue;
			s[0] && i.seriesIndex == null && B(i, s[0]), !r && e.snap && a.containData(c) && c != null && (t = c), n.showPointer(e, t, s), n.showTooltip(e, o, c);
		}
	}
}
function $D(e, t) {
	var n = t.axis, r = n.dim, i = e, a = [], o = Number.MAX_VALUE, s = -1;
	return V(t.seriesModels, function(t, c) {
		var l = t.getData().mapDimensionsAll(r), u, d;
		if (t.getAxisTooltipData) {
			var f = t.getAxisTooltipData(l, e, n);
			d = f.dataIndices, u = f.nestestValue;
		} else {
			if (d = t.indicesOfNearest(r, l[0], e, n.type === "category" ? .5 : null), !d.length) return;
			u = t.getData().get(l[0], d[0]);
		}
		if (Ys(u)) {
			var p = e - u, m = Math.abs(p);
			m <= o && ((m < o || p >= 0 && s < 0) && (o = m, s = p, i = u, a.length = 0), V(d, function(e) {
				a.push({
					seriesIndex: t.seriesIndex,
					dataIndexInside: e,
					dataIndex: t.getData().getRawIndex(e)
				});
			}));
		}
	}), {
		payloadBatch: a,
		snapToValue: i
	};
}
function eO(e, t, n, r) {
	e[t.key] = {
		value: n,
		payloadBatch: r
	};
}
function tO(e, t, n, r) {
	var i = n.payloadBatch, a = t.axis, o = a.model, s = t.axisPointerModel;
	if (t.triggerTooltip && i.length) {
		var c = t.coordSys.model, l = HE(c), u = e.map[l];
		u || (u = e.map[l] = {
			coordSysId: c.id,
			coordSysIndex: c.componentIndex,
			coordSysType: c.type,
			coordSysMainType: c.mainType,
			dataByAxis: []
		}, e.list.push(u)), u.dataByAxis.push({
			axisDim: a.dim,
			axisIndex: o.componentIndex,
			axisType: o.type,
			axisId: o.id,
			value: r,
			valueLabelOpt: {
				precision: s.get(["label", "precision"]),
				formatter: s.get(["label", "formatter"])
			},
			seriesDataIndices: i.slice()
		});
	}
}
function nO(e, t, n) {
	var r = n.axesInfo = [];
	V(t, function(t, n) {
		var i = t.axisPointerModel.option, a = e[n];
		a ? (!t.useHandle && (i.status = "show"), i.value = a.value, i.seriesDataIndices = (a.payloadBatch || []).slice()) : !t.useHandle && (i.status = "hide"), i.status === "show" && r.push({
			axisDim: t.axis.dim,
			axisIndex: t.axis.model.componentIndex,
			value: i.value
		});
	});
}
function rO(e, t, n, r) {
	if (sO(t) || !e.list.length) r({ type: "hideTip" });
	else {
		var i = ((e.list[0].dataByAxis[0] || {}).seriesDataIndices || [])[0] || {};
		r({
			type: "showTip",
			escapeConnect: !0,
			x: t[0],
			y: t[1],
			tooltipOption: n.tooltipOption,
			position: n.position,
			dataIndexInside: i.dataIndexInside,
			dataIndex: i.dataIndex,
			seriesIndex: i.seriesIndex,
			dataByCoordSys: e.list
		});
	}
}
function iO(e, t, n) {
	var r = n.getZr(), i = "axisPointerLastHighlights", a = XD(r)[i] || {}, o = XD(r)[i] = {};
	V(e, function(e, t) {
		var n = e.axisPointerModel.option;
		n.status === "show" && e.triggerEmphasis && V(n.seriesDataIndices, function(e) {
			o[e.seriesIndex + "|" + e.dataIndex] = e;
		});
	});
	var s = [], c = [];
	function l(e) {
		return {
			seriesIndex: e.seriesIndex,
			dataIndex: e.dataIndex
		};
	}
	V(a, function(e, t) {
		!o[t] && c.push(l(e));
	}), V(o, function(e, t) {
		!a[t] && s.push(l(e));
	}), c.length && n.dispatchAction({
		type: "downplay",
		escapeConnect: !0,
		notBlur: !0,
		batch: c
	}), s.length && n.dispatchAction({
		type: "highlight",
		escapeConnect: !0,
		notBlur: !0,
		batch: s
	});
}
function aO(e, t) {
	for (var n = 0; n < (e || []).length; n++) {
		var r = e[n];
		if (t.axis.dim === r.axisDim && t.axis.model.componentIndex === r.axisIndex) return r;
	}
}
function oO(e) {
	var t = e.axis.model, n = {}, r = n.axisDim = e.axis.dim;
	return n.axisIndex = n[r + "AxisIndex"] = t.componentIndex, n.axisName = n[r + "AxisName"] = t.name, n.axisId = n[r + "AxisId"] = t.id, n;
}
function sO(e) {
	return !e || e[0] == null || isNaN(e[0]) || e[1] == null || isNaN(e[1]);
}
// node_modules/echarts/lib/component/axisPointer/install.js
function cO(e) {
	WE.registerAxisPointerClass("CartesianAxisPointer", PD), e.registerComponentModel(RD), e.registerComponentView(JD), e.registerPreprocessor(function(e) {
		if (e) {
			e.axisPointer && e.axisPointer.length !== 0 || (e.axisPointer = {});
			var t = e.axisPointer.link;
			t && !U(t) && (e.axisPointer.link = [t]);
		}
	}), e.registerProcessor(e.PRIORITY.PROCESSOR.STATISTIC, { overallReset: function(e, t) {
		e.getComponent("axisPointer").coordSysAxesInfo = ME(e, t);
	} }), e.registerAction({
		type: "updateAxisPointer",
		event: "updateAxisPointer",
		update: ":updateAxisPointer"
	}, ZD);
}
// node_modules/echarts/lib/component/tooltip/TooltipModel.js
var lO = function(e) {
	L(t, e);
	function t() {
		var n = e !== null && e.apply(this, arguments) || this;
		return n.type = t.type, n;
	}
	return t.type = "tooltip", t.dependencies = ["axisPointer"], t.defaultOption = {
		z: 60,
		show: !0,
		showContent: !0,
		trigger: "item",
		triggerOn: "mousemove|click|mousewheel",
		alwaysShowContent: !1,
		renderMode: "auto",
		confine: null,
		showDelay: 0,
		hideDelay: 100,
		transitionDuration: .4,
		displayTransition: !0,
		enterable: !1,
		backgroundColor: Kg.color.neutral00,
		shadowBlur: 10,
		shadowColor: "rgba(0, 0, 0, .2)",
		shadowOffsetX: 1,
		shadowOffsetY: 2,
		borderRadius: 4,
		borderWidth: 1,
		defaultBorderColor: Kg.color.border,
		padding: null,
		extraCssText: "",
		axisPointer: {
			type: "line",
			axis: "auto",
			animation: "auto",
			animationDurationUpdate: 200,
			animationEasingUpdate: "exponentialOut",
			crossStyle: {
				color: Kg.color.borderShade,
				width: 1,
				type: "dashed",
				textStyle: {}
			}
		},
		textStyle: {
			color: Kg.color.tertiary,
			fontSize: 14
		}
	}, t;
}(Wg);
// node_modules/echarts/lib/component/tooltip/helper.js
function uO(e) {
	var t = e.get("confine");
	return t == null ? e.get("renderMode") === "richText" : !!t;
}
function dO(e) {
	if (R.domSupported) {
		for (var t = document.documentElement.style, n = 0, r = e.length; n < r; n++) if (e[n] in t) return e[n];
	}
}
var fO = dO([
	"transform",
	"webkitTransform",
	"OTransform",
	"MozTransform",
	"msTransform"
]), pO = dO([
	"webkitTransition",
	"transition",
	"OTransition",
	"MozTransition",
	"msTransition"
]);
function mO(e, t) {
	if (!e) return t;
	t = hg(t, !0);
	var n = e.indexOf(t);
	return e = n === -1 ? t : "-" + e.slice(0, n) + "-" + t, e.toLowerCase();
}
function hO(e, t) {
	var n = e.currentStyle || document.defaultView && document.defaultView.getComputedStyle(e);
	return n ? t ? n[t] : n : null;
}
// node_modules/echarts/lib/component/tooltip/TooltipHTMLContent.js
var gO = mO(pO, "transition"), _O = mO(fO, "transform"), vO = "position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;" + (R.transform3dSupported ? "will-change:transform;" : "");
function yO(e) {
	return e = e === "left" ? "right" : e === "right" ? "left" : e === "top" ? "bottom" : "top", e;
}
function bO(e, t, n) {
	if (!G(n) || n === "inside") return "";
	var r = e.get("backgroundColor"), i = e.get("borderWidth");
	t = Sg(t);
	var a = yO(n), o = Math.max(Math.round(i) * 1.5, 6), s = "", c = _O + ":", l;
	Wt(["left", "right"], a) > -1 ? (s += "top:50%", c += "translateY(-50%) rotate(" + (l = a === "left" ? -225 : -45) + "deg)") : (s += "left:50%", c += "translateX(-50%) rotate(" + (l = a === "top" ? 225 : 45) + "deg)");
	var u = l * Math.PI / 180, d = o + i, f = d * Math.abs(Math.cos(u)) + d * Math.abs(Math.sin(u)), p = Math.round(((f - Math.SQRT2 * i) / 2 + Math.SQRT2 * i - (f - d) / 2) * 100) / 100;
	s += ";" + a + ":-" + p + "px";
	var m = t + " solid " + i + "px;";
	return "<div style=\"" + [
		"position:absolute;width:" + o + "px;height:" + o + "px;z-index:-1;",
		s + ";" + c + ";",
		"border-bottom:" + m,
		"border-right:" + m,
		"background-color:" + r + ";"
	].join("") + "\"></div>";
}
function xO(e, t, n) {
	var r = "cubic-bezier(0.23,1,0.32,1)", i = "", a = "";
	return n && (i = " " + e / 2 + "s " + r, a = "opacity" + i + ",visibility" + i), t || (i = " " + e + "s " + r, a += (a.length ? "," : "") + (R.transformSupported ? "" + _O + i : ",left" + i + ",top" + i)), gO + ":" + a;
}
function SO(e, t, n) {
	var r = e.toFixed(0) + "px", i = t.toFixed(0) + "px";
	if (!R.transformSupported) return n ? "top:" + i + ";left:" + r + ";" : [["top", i], ["left", r]];
	var a = R.transform3dSupported, o = "translate" + (a ? "3d" : "") + "(" + r + "," + i + (a ? ",0" : "") + ")";
	return n ? "top:0;left:0;" + _O + ":" + o + ";" : [
		["top", 0],
		["left", 0],
		[fO, o]
	];
}
function CO(e) {
	var t = [], n = e.get("fontSize"), r = e.getTextColor();
	r && t.push("color:" + r), t.push("font:" + e.getFont());
	var i = q(e.get("lineHeight"), Math.round(n * 3 / 2));
	n && t.push("line-height:" + i + "px");
	var a = e.get("textShadowColor"), o = e.get("textShadowBlur") || 0, s = e.get("textShadowOffsetX") || 0, c = e.get("textShadowOffsetY") || 0;
	return a && o && t.push("text-shadow:" + s + "px " + c + "px " + o + "px " + a), V(["decoration", "align"], function(n) {
		var r = e.get(n);
		r && t.push("text-" + n + ":" + r);
	}), t.join(";");
}
function wO(e, t, n, r) {
	var i = [], a = e.get("transitionDuration"), o = e.get("backgroundColor"), s = e.get("shadowBlur"), c = e.get("shadowColor"), l = e.get("shadowOffsetX"), u = e.get("shadowOffsetY"), d = e.getModel("textStyle"), f = Iy(e, "html"), p = l + "px " + u + "px " + s + "px " + c;
	return i.push("box-shadow:" + p), t && a > 0 && i.push(xO(a, n, r)), o && i.push("background-color:" + o), V([
		"width",
		"color",
		"radius"
	], function(t) {
		var n = "border-" + t, r = hg(n), a = e.get(r);
		a != null && i.push(n + ":" + a + (t === "color" ? "" : "px"));
	}), i.push(CO(d)), f != null && i.push("padding:" + gg(f).join("px ") + "px"), i.join(";") + ";";
}
function TO(e, t, n, r, i) {
	var a = t && t.painter;
	if (n) {
		var o = a && a.getViewportRoot();
		o && $n(e, o, n, r, i);
	} else {
		e[0] = r, e[1] = i;
		var s = a && a.getViewportRootOffset();
		s && (e[0] += s.offsetLeft, e[1] += s.offsetTop);
	}
	e[2] = e[0] / t.getWidth(), e[3] = e[1] / t.getHeight();
}
var EO = function() {
	function e(e, t) {
		if (this._show = !1, this._styleCoord = [
			0,
			0,
			0,
			0
		], this._enterable = !0, this._alwaysShowContent = !1, this._firstShow = !0, this._longHide = !0, R.wxa) return null;
		var n = document.createElement("div");
		n.domBelongToZr = !0, this.el = n;
		var r = this._zr = e.getZr(), i = t.appendTo, a = i && (G(i) ? document.querySelector(i) : an(i) ? i : W(i) && i(e.getDom()));
		TO(this._styleCoord, r, a, e.getWidth() / 2, e.getHeight() / 2), (a || e.getDom()).appendChild(n), this._api = e, this._container = a;
		var o = this;
		n.onmouseenter = function() {
			o._enterable && (clearTimeout(o._hideTimeout), o._show = !0), o._inContent = !0;
		}, n.onmousemove = function(e) {
			if (e ||= window.event, !o._enterable) {
				var t = r.handler;
				mr(r.painter.getViewportRoot(), e, !0), t.dispatch("mousemove", e);
			}
		}, n.onmouseleave = function() {
			o._inContent = !1, o._enterable && o._show && o.hideLater(o._hideDelay);
		};
	}
	return e.prototype.update = function(e) {
		if (!this._container) {
			var t = this._api.getDom(), n = hO(t, "position"), r = t.style;
			r.position !== "absolute" && n !== "absolute" && (r.position = "relative");
		}
		var i = e.get("alwaysShowContent");
		i && this._moveIfResized(), this._alwaysShowContent = i, this._enableDisplayTransition = e.get("displayTransition") && e.get("transitionDuration") > 0, this.el.className = e.get("className") || "";
	}, e.prototype.show = function(e, t) {
		clearTimeout(this._hideTimeout), clearTimeout(this._longHideTimeout);
		var n = this.el, r = n.style, i = this._styleCoord;
		n.innerHTML ? r.cssText = vO + wO(e, !this._firstShow, this._longHide, this._enableDisplayTransition) + SO(i[0], i[1], !0) + ("border-color:" + Sg(t) + ";") + (e.get("extraCssText") || "") + (";pointer-events:" + (this._enterable ? "auto" : "none")) : r.display = "none", this._show = !0, this._firstShow = !1, this._longHide = !1;
	}, e.prototype.setContent = function(e, t, n, r, i) {
		var a = this.el;
		if (e == null) a.innerHTML = "";
		else {
			var o = "";
			if (G(i) && n.get("trigger") === "item" && !uO(n) && (o = bO(n, r, i)), G(e)) a.innerHTML = e + o;
			else if (e) {
				a.innerHTML = "", U(e) || (e = [e]);
				for (var s = 0; s < e.length; s++) an(e[s]) && e[s].parentNode !== a && a.appendChild(e[s]);
				if (o && a.childNodes.length) {
					var c = document.createElement("div");
					c.innerHTML = o, a.appendChild(c);
				}
			}
		}
	}, e.prototype.setEnterable = function(e) {
		this._enterable = e;
	}, e.prototype.getSize = function() {
		var e = this.el;
		return e ? [e.offsetWidth, e.offsetHeight] : [0, 0];
	}, e.prototype.moveTo = function(e, t) {
		if (this.el) {
			var n = this._styleCoord;
			if (TO(n, this._zr, this._container, e, t), n[0] != null && n[1] != null) {
				var r = this.el.style;
				V(SO(n[0], n[1]), function(e) {
					r[e[0]] = e[1];
				});
			}
		}
	}, e.prototype._moveIfResized = function() {
		var e = this._styleCoord[2], t = this._styleCoord[3];
		this.moveTo(e * this._zr.getWidth(), t * this._zr.getHeight());
	}, e.prototype.hide = function() {
		var e = this, t = this.el.style;
		this._enableDisplayTransition ? (t.visibility = "hidden", t.opacity = "0") : t.display = "none", R.transform3dSupported && (t.willChange = ""), this._show = !1, this._longHideTimeout = setTimeout(function() {
			return e._longHide = !0;
		}, 500);
	}, e.prototype.hideLater = function(e) {
		this._show && !(this._inContent && this._enterable) && !this._alwaysShowContent && (e ? (this._hideDelay = e, this._show = !1, this._hideTimeout = setTimeout(Qt(this.hide, this), e)) : this.hide());
	}, e.prototype.isShow = function() {
		return this._show;
	}, e.prototype.dispose = function() {
		clearTimeout(this._hideTimeout), clearTimeout(this._longHideTimeout);
		var e = this._zr;
		er(e && e.painter && e.painter.getViewportRoot(), this._container);
		var t = this.el;
		if (t) {
			t.onmouseenter = t.onmousemove = t.onmouseleave = null;
			var n = t.parentNode;
			n && n.removeChild(t);
		}
		this.el = this._container = null;
	}, e;
}(), DO = function() {
	function e(e) {
		this._show = !1, this._styleCoord = [
			0,
			0,
			0,
			0
		], this._alwaysShowContent = !1, this._enterable = !0, this._zr = e.getZr(), AO(this._styleCoord, this._zr, e.getWidth() / 2, e.getHeight() / 2);
	}
	return e.prototype.update = function(e) {
		var t = e.get("alwaysShowContent");
		t && this._moveIfResized(), this._alwaysShowContent = t;
	}, e.prototype.show = function() {
		this._hideTimeout && clearTimeout(this._hideTimeout), this.el.show(), this._show = !0;
	}, e.prototype.setContent = function(e, t, n, r, i) {
		var a = this;
		K(e) && tc(""), this.el && this._zr.remove(this.el);
		var o = n.getModel("textStyle");
		this.el = new od({
			style: {
				rich: t.richTextStyles,
				text: e,
				lineHeight: 22,
				borderWidth: 1,
				borderColor: r,
				textShadowColor: o.get("textShadowColor"),
				fill: n.get(["textStyle", "color"]),
				padding: Iy(n, "richText"),
				verticalAlign: "top",
				align: "left"
			},
			z: n.get("z")
		}), V([
			"backgroundColor",
			"borderRadius",
			"shadowColor",
			"shadowBlur",
			"shadowOffsetX",
			"shadowOffsetY"
		], function(e) {
			a.el.style[e] = n.get(e);
		}), V([
			"textShadowBlur",
			"textShadowOffsetX",
			"textShadowOffsetY"
		], function(e) {
			a.el.style[e] = o.get(e) || 0;
		}), this._zr.add(this.el);
		var s = this;
		this.el.on("mouseover", function() {
			s._enterable && (clearTimeout(s._hideTimeout), s._show = !0), s._inContent = !0;
		}), this.el.on("mouseout", function() {
			s._enterable && s._show && s.hideLater(s._hideDelay), s._inContent = !1;
		});
	}, e.prototype.setEnterable = function(e) {
		this._enterable = e;
	}, e.prototype.getSize = function() {
		var e = this.el, t = this.el.getBoundingRect(), n = kO(e.style);
		return [t.width + n.left + n.right, t.height + n.top + n.bottom];
	}, e.prototype.moveTo = function(e, t) {
		var n = this.el;
		if (n) {
			var r = this._styleCoord;
			AO(r, this._zr, e, t), e = r[0], t = r[1];
			var i = n.style, a = OO(i.borderWidth || 0), o = kO(i);
			n.x = e + a + o.left, n.y = t + a + o.top, n.markRedraw();
		}
	}, e.prototype._moveIfResized = function() {
		var e = this._styleCoord[2], t = this._styleCoord[3];
		this.moveTo(e * this._zr.getWidth(), t * this._zr.getHeight());
	}, e.prototype.hide = function() {
		this.el && this.el.hide(), this._show = !1;
	}, e.prototype.hideLater = function(e) {
		this._show && !(this._inContent && this._enterable) && !this._alwaysShowContent && (e ? (this._hideDelay = e, this._show = !1, this._hideTimeout = setTimeout(Qt(this.hide, this), e)) : this.hide());
	}, e.prototype.isShow = function() {
		return this._show;
	}, e.prototype.dispose = function() {
		this._zr.remove(this.el);
	}, e;
}();
function OO(e) {
	return Math.max(0, e);
}
function kO(e) {
	var t = OO(e.shadowBlur || 0), n = OO(e.shadowOffsetX || 0), r = OO(e.shadowOffsetY || 0);
	return {
		left: OO(t - n),
		right: OO(t + n),
		top: OO(t - r),
		bottom: OO(t + r)
	};
}
function AO(e, t, n, r) {
	e[0] = n, e[1] = r, e[2] = e[0] / t.getWidth(), e[3] = e[1] / t.getHeight();
}
// node_modules/echarts/lib/component/tooltip/TooltipView.js
var jO = new td({ shape: {
	x: -1,
	y: -1,
	width: 2,
	height: 2
} }), MO = function(e) {
	L(t, e);
	function t() {
		var n = e !== null && e.apply(this, arguments) || this;
		return n.type = t.type, n;
	}
	return t.prototype.init = function(e, t) {
		if (!R.node && t.getDom()) {
			var n = e.getComponent("tooltip"), r = this._renderMode = Mc(n.get("renderMode"));
			this._tooltipContent = r === "richText" ? new DO(t) : new EO(t, { appendTo: n.get("appendToBody", !0) ? "body" : n.get("appendTo", !0) });
		}
	}, t.prototype.render = function(e, t, n) {
		if (!R.node && n.getDom()) {
			this.group.removeAll(), this._tooltipModel = e, this._ecModel = t, this._api = n;
			var r = this._tooltipContent;
			r.update(e), r.setEnterable(e.get("enterable")), this._initGlobalListener(), this._keepShow(), this._renderMode !== "richText" && e.get("transitionDuration") ? db(this, "_updatePosition", 50, "fixRate") : fb(this, "_updatePosition");
		}
	}, t.prototype._initGlobalListener = function() {
		var e = this._tooltipModel.get("triggerOn");
		VD("itemTooltip", this._api, Qt(function(t, n, r) {
			e !== "none" && (e.indexOf(t) >= 0 ? this._tryShow(n, r) : t === "leave" && this._hide(r));
		}, this));
	}, t.prototype._keepShow = function() {
		var e = this._tooltipModel, t = this._ecModel, n = this._api, r = e.get("triggerOn");
		if (e.get("trigger") !== "axis" && (this._lastDataByCoordSys = null, this._cbParamsList = null), this._lastX != null && this._lastY != null && r !== "none" && r !== "click") {
			var i = this;
			clearTimeout(this._refreshUpdateTimeout), this._refreshUpdateTimeout = setTimeout(function() {
				!n.isDisposed() && i.manuallyShowTip(e, t, n, {
					x: i._lastX,
					y: i._lastY,
					dataByCoordSys: i._lastDataByCoordSys
				});
			});
		}
	}, t.prototype.manuallyShowTip = function(e, t, n, r) {
		if (r.from !== this.uid && !R.node && n.getDom()) {
			var i = PO(r, n);
			this._ticket = "";
			var a = r.dataByCoordSys, o = zO(r, t, n);
			if (o) {
				var s = o.el.getBoundingRect().clone();
				s.applyTransform(o.el.transform), this._tryShow({
					offsetX: s.x + s.width / 2,
					offsetY: s.y + s.height / 2,
					target: o.el,
					position: r.position,
					positionDefault: "bottom"
				}, i);
			} else if (r.tooltip && r.x != null && r.y != null) {
				var c = jO;
				c.x = r.x, c.y = r.y, c.update(), bd(c).tooltipConfig = {
					name: null,
					option: r.tooltip
				}, this._tryShow({
					offsetX: r.x,
					offsetY: r.y,
					target: c
				}, i);
			} else if (a) this._tryShow({
				offsetX: r.x,
				offsetY: r.y,
				position: r.position,
				dataByCoordSys: a,
				tooltipOption: r.tooltipOption
			}, i);
			else if (r.seriesIndex != null) {
				if (this._manuallyAxisShowTip(e, t, n, r)) return;
				var l = YD(r, t), u = l.point[0], d = l.point[1];
				u != null && d != null && this._tryShow({
					offsetX: u,
					offsetY: d,
					target: l.el,
					position: r.position,
					positionDefault: "bottom"
				}, i);
			} else r.x != null && r.y != null && (n.dispatchAction({
				type: "updateAxisPointer",
				x: r.x,
				y: r.y
			}), this._tryShow({
				offsetX: r.x,
				offsetY: r.y,
				position: r.position,
				target: n.getZr().findHover(r.x, r.y).target
			}, i));
		}
	}, t.prototype.manuallyHideTip = function(e, t, n, r) {
		var i = this._tooltipContent;
		this._tooltipModel && i.hideLater(this._tooltipModel.get("hideDelay")), this._lastX = this._lastY = this._lastDataByCoordSys = null, this._cbParamsList = null, r.from !== this.uid && this._hide(PO(r, n));
	}, t.prototype._manuallyAxisShowTip = function(e, t, n, r) {
		var i = r.seriesIndex, a = r.dataIndex, o = t.getComponent("axisPointer").coordSysAxesInfo;
		if (i != null && a != null && o != null) {
			var s = t.getSeriesByIndex(i);
			if (s && NO([
				s.getData().getItemModel(a),
				s,
				(s.coordinateSystem || {}).model
			], this._tooltipModel).get("trigger") === "axis") return n.dispatchAction({
				type: "updateAxisPointer",
				seriesIndex: i,
				dataIndex: a,
				position: r.position
			}), !0;
		}
	}, t.prototype._tryShow = function(e, t) {
		var n = e.target;
		if (this._tooltipModel) {
			this._lastX = e.offsetX, this._lastY = e.offsetY;
			var r = e.dataByCoordSys;
			if (r && r.length) this._showAxisTooltip(r, e);
			else if (n) {
				if (bd(n).ssrType === "legend") return;
				this._lastDataByCoordSys = null, this._cbParamsList = null;
				var i, a;
				$b(n, function(e) {
					if (e.tooltipDisabled) return i = a = null, !0;
					i || a || (bd(e).dataIndex == null ? bd(e).tooltipConfig != null && (a = e) : i = e);
				}, !0), i ? this._showSeriesItemTooltip(e, i, t) : a ? this._showComponentItemTooltip(e, a, t) : this._hide(t);
			} else this._lastDataByCoordSys = null, this._cbParamsList = null, this._hide(t);
		}
	}, t.prototype._showOrMove = function(e, t) {
		var n = e.get("showDelay");
		t = Qt(t, this), clearTimeout(this._showTimout), n > 0 ? this._showTimout = setTimeout(t, n) : t();
	}, t.prototype._showAxisTooltip = function(e, t) {
		var n = this._ecModel, r = this._tooltipModel, i = [t.offsetX, t.offsetY], a = NO([t.tooltipOption], r), o = this._renderMode, s = [], c = Sy("section", {
			blocks: [],
			noHeader: !0
		}), l = [], u = new Ly();
		V(e, function(e) {
			V(e.dataByAxis, function(e) {
				var t = n.getComponent(e.axisDim + "Axis", e.axisIndex), i = e.value, a = t.axis, d = a.scale.parse(i);
				if (t && i != null) {
					var f = DD(i, a, n, e.seriesDataIndices, e.valueLabelOpt), p = Sy("section", {
						header: f,
						noHeader: !mn(f),
						sortBlocks: !0,
						blocks: []
					});
					c.blocks.push(p), V(e.seriesDataIndices, function(i) {
						var a = n.getSeriesByIndex(i.seriesIndex), c = i.dataIndexInside, m = a.getDataParams(c);
						if (!(m.dataIndex < 0)) {
							m.axisDim = e.axisDim, m.axisIndex = e.axisIndex, m.axisType = e.axisType, m.axisId = e.axisId, m.axisValue = kw(t.axis, { value: d }), m.axisValueLabel = f, m.marker = u.makeTooltipMarker("item", Sg(m.color), o);
							var h = Rv(a.formatTooltip(c, !0, null)), g = h.frag;
							if (g) {
								var _ = NO([a], r).get("valueFormatter");
								p.blocks.push(_ ? B({ valueFormatter: _ }, g) : g);
							}
							h.text && l.push(h.text), s.push(m);
						}
					});
				}
			});
		}), c.blocks.reverse(), l.reverse();
		var d = t.position, f = Oy(c, u, o, a.get("order"), n.get("useUTC"), a.get("textStyle"));
		f && l.unshift(f);
		var p = o === "richText" ? "\n\n" : "<br/>", m = l.join(p);
		this._showOrMove(a, function() {
			this._updateContentNotChangedOnAxis(e, s) ? this._updatePosition(a, d, i[0], i[1], this._tooltipContent, s) : this._showTooltipContent(a, m, s, Math.random() + "", i[0], i[1], d, null, u);
		});
	}, t.prototype._showSeriesItemTooltip = function(e, t, n) {
		var r = this._ecModel, i = bd(t), a = i.seriesIndex, o = r.getSeriesByIndex(a), s = i.dataModel || o, c = i.dataIndex, l = i.dataType, u = s.getData(l), d = this._renderMode, f = e.positionDefault, p = NO([
			u.getItemModel(c),
			s,
			o && (o.coordinateSystem || {}).model
		], this._tooltipModel, f ? { position: f } : null), m = p.get("trigger");
		if (m == null || m === "item") {
			var h = s.getDataParams(c, l), g = new Ly();
			h.marker = g.makeTooltipMarker("item", Sg(h.color), d);
			var _ = Rv(s.formatTooltip(c, !1, l)), v = p.get("order"), y = p.get("valueFormatter"), b = _.frag, x = b ? Oy(y ? B({ valueFormatter: y }, b) : b, g, d, v, r.get("useUTC"), p.get("textStyle")) : _.text, S = "item_" + s.name + "_" + c;
			this._showOrMove(p, function() {
				this._showTooltipContent(p, x, h, S, e.offsetX, e.offsetY, e.position, e.target, g);
			}), n({
				type: "showTip",
				dataIndexInside: c,
				dataIndex: u.getRawIndex(c),
				seriesIndex: a,
				from: this.uid
			});
		}
	}, t.prototype._showComponentItemTooltip = function(e, t, n) {
		var r = this._renderMode === "html", i = bd(t), a = i.tooltipConfig.option || {}, o = a.encodeHTMLContent;
		if (G(a)) {
			var s = a;
			a = {
				content: s,
				formatter: s
			}, o = !0;
		}
		o && r && a.content && (a = z(a), a.content = sr(a.content));
		var c = [a], l = this._ecModel.getComponent(i.componentMainType, i.componentIndex);
		l && c.push(l), c.push({ formatter: a.content });
		var u = e.positionDefault, d = NO(c, this._tooltipModel, u ? { position: u } : null), f = d.get("content"), p = Math.random() + "", m = new Ly();
		this._showOrMove(d, function() {
			var n = z(d.get("formatterParams") || {});
			this._showTooltipContent(d, f, n, p, e.offsetX, e.offsetY, e.position, t, m);
		}), n({
			type: "showTip",
			from: this.uid
		});
	}, t.prototype._showTooltipContent = function(e, t, n, r, i, a, o, s, c) {
		if (this._ticket = "", e.get("showContent") && e.get("show")) {
			var l = this._tooltipContent;
			l.setEnterable(e.get("enterable"));
			var u = e.get("formatter");
			o ||= e.get("position");
			var d = t, f = this._getNearestPoint([i, a], n, e.get("trigger"), e.get("borderColor"), e.get("defaultBorderColor", !0)).color;
			if (u) {
				if (G(u)) {
					var p = e.ecModel.get("useUTC"), m = U(n) ? n[0] : n, h = m && m.axisType && m.axisType.indexOf("time") >= 0;
					d = u, h && (d = og(m.axisValue, d, p)), d = bg(d, n, !0);
				} else if (W(u)) {
					var g = Qt(function(t, r) {
						t === this._ticket && (l.setContent(r, c, e, f, o), this._updatePosition(e, o, i, a, l, n, s));
					}, this);
					this._ticket = r, d = u(n, r, g);
				} else d = u;
			}
			l.setContent(d, c, e, f, o), l.show(e, f), this._updatePosition(e, o, i, a, l, n, s);
		}
	}, t.prototype._getNearestPoint = function(e, t, n, r, i) {
		if (n === "axis" || U(t)) return { color: r || i };
		if (!U(t)) return { color: r || t.color || t.borderColor };
	}, t.prototype._updatePosition = function(e, t, n, r, i, a, o) {
		var s = this._api.getWidth(), c = this._api.getHeight();
		t ||= e.get("position");
		var l = i.getSize(), u = e.get("align"), d = e.get("verticalAlign"), f = o && o.getBoundingRect().clone();
		if (o && f.applyTransform(o.transform), W(t) && (t = t([n, r], a, i.el, f, {
			viewSize: [s, c],
			contentSize: l.slice()
		})), U(t)) n = As(t[0], s), r = As(t[1], c);
		else if (K(t)) {
			var p = t;
			p.width = l[0], p.height = l[1];
			var m = Ig(p, {
				width: s,
				height: c
			});
			n = m.x, r = m.y, u = null, d = null;
		} else if (G(t) && o) {
			var h = LO(t, f, l, e.get("borderWidth"));
			n = h[0], r = h[1];
		} else {
			var h = FO(n, r, i, s, c, u ? null : 20, d ? null : 20);
			n = h[0], r = h[1];
		}
		if (u && (n -= RO(u) ? l[0] / 2 : u === "right" ? l[0] : 0), d && (r -= RO(d) ? l[1] / 2 : d === "bottom" ? l[1] : 0), uO(e)) {
			var h = IO(n, r, i, s, c);
			n = h[0], r = h[1];
		}
		i.moveTo(n, r);
	}, t.prototype._updateContentNotChangedOnAxis = function(e, t) {
		var n = this._lastDataByCoordSys, r = this._cbParamsList, i = !!n && n.length === e.length;
		return i && V(n, function(n, a) {
			var o = n.dataByAxis || [], s = (e[a] || {}).dataByAxis || [];
			i &&= o.length === s.length, i && V(o, function(e, n) {
				var a = s[n] || {}, o = e.seriesDataIndices || [], c = a.seriesDataIndices || [];
				i = i && e.value === a.value && e.axisType === a.axisType && e.axisId === a.axisId && o.length === c.length, i && V(o, function(e, t) {
					var n = c[t];
					i = i && e.seriesIndex === n.seriesIndex && e.dataIndex === n.dataIndex;
				}), r && V(e.seriesDataIndices, function(e) {
					var n = e.seriesIndex, a = t[n], o = r[n];
					a && o && o.data !== a.data && (i = !1);
				});
			});
		}), this._lastDataByCoordSys = e, this._cbParamsList = t, !!i;
	}, t.prototype._hide = function(e) {
		this._lastDataByCoordSys = null, this._cbParamsList = null, e({
			type: "hideTip",
			from: this.uid
		});
	}, t.prototype.dispose = function(e, t) {
		!R.node && t.getDom() && (fb(this, "_updatePosition"), this._tooltipContent.dispose(), qD("itemTooltip", t), this._tooltipContent = null, this._tooltipModel = null, this._lastDataByCoordSys = null, this._cbParamsList = null);
	}, t.type = "tooltip", t;
}(Zy);
function NO(e, t, n) {
	var r = t.ecModel, i;
	n ? (i = new Lh(n, r, r), i = new Lh(t.option, i, r)) : i = t;
	for (var a = e.length - 1; a >= 0; a--) {
		var o = e[a];
		o && (o instanceof Lh && (o = o.get("tooltip", !0)), G(o) && (o = { formatter: o }), o && (i = new Lh(o, i, r)));
	}
	return i;
}
function PO(e, t) {
	return e.dispatchAction || Qt(t.dispatchAction, t);
}
function FO(e, t, n, r, i, a, o) {
	var s = n.getSize(), c = s[0], l = s[1];
	return a != null && (e + c + a + 2 > r ? e -= c + a : e += a), o != null && (t + l + o > i ? t -= l + o : t += o), [e, t];
}
function IO(e, t, n, r, i) {
	var a = n.getSize(), o = a[0], s = a[1];
	return e = Math.min(e + o, r) - o, t = Math.min(t + s, i) - s, e = Math.max(e, 0), t = Math.max(t, 0), [e, t];
}
function LO(e, t, n, r) {
	var i = n[0], a = n[1], o = Math.ceil(Math.SQRT2 * r) + 8, s = 0, c = 0, l = t.width, u = t.height;
	switch (e) {
		case "inside":
			s = t.x + l / 2 - i / 2, c = t.y + u / 2 - a / 2;
			break;
		case "top":
			s = t.x + l / 2 - i / 2, c = t.y - a - o;
			break;
		case "bottom":
			s = t.x + l / 2 - i / 2, c = t.y + u + o;
			break;
		case "left":
			s = t.x - i - o, c = t.y + u / 2 - a / 2;
			break;
		case "right": s = t.x + l + o, c = t.y + u / 2 - a / 2;
	}
	return [s, c];
}
function RO(e) {
	return e === "center" || e === "middle";
}
function zO(e, t, n) {
	var r = Ec(e).queryOptionMap, i = r.keys()[0];
	if (i && i !== "series") {
		var a = Oc(t, i, r.get(i), {
			useDefault: !1,
			enableAll: !1,
			enableNone: !1
		}).models[0];
		if (a) {
			var o = n.getViewOfComponentModel(a), s;
			if (o.group.traverse(function(t) {
				var n = bd(t).tooltipConfig;
				if (n && n.name === e.name) return s = t, !0;
			}), s) return {
				componentMainType: i,
				componentIndex: a.componentIndex,
				el: s
			};
		}
	}
}
// node_modules/echarts/lib/component/tooltip/install.js
function BO(e) {
	Hw(cO), e.registerComponentModel(lO), e.registerComponentView(MO), e.registerAction({
		type: "showTip",
		event: "showTip",
		update: "tooltip:manuallyShowTip"
	}, En), e.registerAction({
		type: "hideTip",
		event: "hideTip",
		update: "tooltip:manuallyHideTip"
	}, En);
}
// src/donut-chart.ts
Hw([
	jE,
	BO,
	mD
]);
var VO = class extends je {
	constructor(...e) {
		super(...e), this.items = [], this.language = "en";
	}
	static {
		this.styles = c`
    :host { display: block; width: 100%; height: 100%; min-width: 0; min-height: 0; }
    .chart { width: 100%; height: 100%; min-height: 0; }
  `;
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
		let e = this.renderRoot.querySelector(".chart");
		e && (this.chart = OC(e, void 0, { renderer: "canvas" }), this.resizeObserver = new ResizeObserver(() => this.chart?.resize()), this.resizeObserver.observe(e), this.updateChart());
	}
	updated() {
		this.updateChart();
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.resizeObserver?.disconnect(), this.resizeObserver = void 0, this.chart?.dispose(), this.chart = void 0;
	}
	updateChart() {
		if (!this.chart) return;
		let e = new Intl.NumberFormat(this.language), t = {
			animation: !1,
			tooltip: {
				trigger: "item",
				renderMode: "html",
				confine: !0,
				appendTo: () => this.chart?.getDom() ?? this.renderRoot.querySelector(".chart"),
				backgroundColor: "var(--card-background-color)",
				borderWidth: 1,
				textStyle: {
					color: "var(--primary-text-color)",
					fontSize: 10
				},
				extraCssText: "border-radius: 6px; line-height: normal; box-shadow: 0 2px 8px rgb(0 0 0 / 20%);",
				valueFormatter: (t) => e.format(Number(t))
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
				itemStyle: {
					borderWidth: 2,
					borderColor: "transparent"
				},
				emphasis: {
					scale: !0,
					scaleSize: 4
				},
				data: this.items.map((e) => ({
					name: e.name,
					value: e.bottles,
					itemStyle: { color: e.color },
					tooltip: { borderColor: e.color }
				}))
			}]
		};
		this.chart.setOption(t, {
			notMerge: !0,
			lazyUpdate: !0
		});
	}
	render() {
		return N`<div class="chart" role="presentation"></div>`;
	}
};
I([Ve({ attribute: !1 })], VO.prototype, "items", void 0), I([Ve()], VO.prototype, "language", void 0), VO = I([Re("ploc-cellar-donut-chart")], VO);
// src/ploc-cellar-card.ts
var HO = [
	"#D55E00",
	"#0072B2",
	"#009E73",
	"#E69F00",
	"#CC79A7",
	"#56B4E9",
	"#F0E442",
	"#6A3D9A"
], UO = class extends je {
	constructor(...e) {
		super(...e), this.loading = !1, this.requestGeneration = 0;
	}
	static {
		this.styles = c`
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
    details.section > summary { display: list-item; cursor: pointer; }
    details.section > summary:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 4px; border-radius: 2px; }
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
		let e = this.hass, t = this.config;
		if (!e || !t?.config_entry_id || this.loading) return;
		let n = t.config_entry_id, r = ++this.requestGeneration;
		this.loading = !0, this.error = void 0;
		try {
			let t = await qe(e, n);
			r === this.requestGeneration && (this.inventory = t);
		} catch (e) {
			r === this.requestGeneration && (this.error = e instanceof Error ? e.message : String(e));
		} finally {
			r === this.requestGeneration && (this.loading = !1);
		}
	}
	formatNumber(e) {
		return new Intl.NumberFormat(this.hass?.language ?? void 0).format(e);
	}
	formatSync(e) {
		if (!e) return We(this.hass?.language ?? "en", "never");
		let t = new Date(e);
		return Number.isNaN(t.getTime()) ? e : new Intl.DateTimeFormat(this.hass?.language ?? void 0, {
			dateStyle: "short",
			timeStyle: "short"
		}).format(t);
	}
	metric(e, t) {
		return N`
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
		let t = (e) => We(this.hass?.language ?? "en", e), n = /* @__PURE__ */ new Map();
		for (let r of this.inventory?.wines ?? []) {
			let i = r[e], a = i === null || i === "" ? t("statistics_unknown") : String(i), o = n.get(a) ?? {
				name: a,
				bottles: 0,
				wines: 0
			};
			o.bottles += this.getBottleCount(r), o.wines += 1, e === "color" && r.color_rgb && !o.color && (o.color = `rgb(${r.color_rgb.map((e) => Math.min(255, Math.max(0, Math.round(e)))).join(", ")})`), n.set(a, o);
		}
		let r = [...n.values()].sort((e, t) => t.bottles - e.bottles || e.name.localeCompare(t.name, this.hass?.language));
		if (r.length <= 8) return r;
		let i = r.slice(0, 7), a = r.slice(7).reduce((e, n) => ({
			name: t("statistics_other"),
			bottles: e.bottles + n.bottles,
			wines: e.wines + n.wines
		}), {
			name: t("statistics_other"),
			bottles: 0,
			wines: 0
		});
		return [...i, a];
	}
	renderDistribution(e, t) {
		let n = (e) => We(this.hass?.language ?? "en", e), r = this.distribution(e), i = r.reduce((e, t) => e + t.bottles, 0), a = r.filter((e) => e.bottles > 0).map((e, t) => ({
			...e,
			color: e.color ?? HO[t % HO.length]
		})), o = r.map((e) => `${e.name}: ${this.formatNumber(e.bottles)}`).join(", ");
		return N`
      <section class="group">
        <h3 class="group-title">${n(t)}</h3>
        ${i > 0 ? N`
          <div class=${this.config?.show_statistics_legends === !1 ? "chart-content chart-content-no-legend" : "chart-content"}>
            <div class="donut" role="img"
              aria-label=${n(t) + ": " + o}>
              <ploc-cellar-donut-chart
                class="donut-chart"
                .items=${a}
                .language=${this.hass?.language ?? "en"}>
              </ploc-cellar-donut-chart>
              <div class="donut-center">
                <span class="donut-total">${this.formatNumber(i)}</span>
                <span class="donut-caption">${n("statistics_bottles")}</span>
              </div>
            </div>
            ${this.config?.show_statistics_legends === !1 ? P : N`
              <div class="legend">
                ${a.map((e) => N`
                <div class="legend-item">
                  <span class="legend-swatch" style=${`background: ${e.color}`}></span>
                  <span class="legend-name">${e.name}</span>
                  <span class="legend-value">${this.formatNumber(e.bottles)}</span>
                  <span class="legend-meta">
                    ${new Intl.NumberFormat(this.hass?.language ?? void 0, {
			style: "percent",
			maximumFractionDigits: 1
		}).format(e.bottles / i)}
                    · ${this.formatNumber(e.wines)} ${n("statistics_references")}
                  </span>
                </div>
                `)}
              </div>
            `}
          </div>
        ` : N`<p class="muted">${n("statistics_empty")}</p>`}
      </section>
    `;
	}
	getDiagnosticWines(e) {
		let t = e === "unlocated" ? "unlocated_bottles" : e === "negative" ? "negative_movement_bottles" : "physical_surplus_bottles";
		return (this.inventory?.wine_diagnostics ?? []).filter((e) => (e[t] ?? 0) > 0).sort((e, n) => (n[t] ?? 0) - (e[t] ?? 0) || e.name.localeCompare(n.name, this.hass?.language));
	}
	openDiagnosticWine(e) {
		let t = this.inventory?.wines.find((t) => t.id === e.id) ?? e.wine;
		t && (this.activeDiagnostic = void 0, this.selectedWine = t);
	}
	renderDiagnosticDialog() {
		let e = this.activeDiagnostic;
		if (!e) return P;
		let t = e === "unlocated" ? "diagnostic_unlocated" : e === "negative" ? "diagnostic_negative" : "diagnostic_surplus", n = e === "unlocated" ? "diagnostic_detail_unlocated" : e === "negative" ? "diagnostic_detail_negative" : "diagnostic_detail_surplus", r = this.getDiagnosticWines(e), i = (e) => We(this.hass?.language ?? "en", e), a = (t) => e === "unlocated" ? t.unlocated_bottles ?? 0 : e === "negative" ? t.negative_movement_bottles ?? 0 : t.physical_surplus_bottles ?? 0;
		return N`
      <ha-dialog .open=${!0} header-title=${i(t)} @closed=${() => {
			this.activeDiagnostic = void 0;
		}}>
        <div class="diagnostic-detail-list">
          <p class="muted">${i(n)}</p>
          ${r.length ? r.map((t) => N`
            <section class="diagnostic-detail-item">
              <h4 class="diagnostic-detail-name">
                ${this.inventory?.wines.some((e) => e.id === t.id) || t.wine ? N`<button class="diagnostic-wine-link" type="button"
                      aria-haspopup="dialog"
                      @click=${() => this.openDiagnosticWine(t)}>${t.name}${t.vintage ? ` · ${t.vintage}` : ""}</button>` : N`${t.name}${t.vintage ? ` · ${t.vintage}` : ""}`}
              </h4>
              <dl class="diagnostic-detail-meta">
                <div><dt>${i("diagnostic_detail_quantity")}</dt><dd>${this.formatNumber(a(t))}</dd></div>
                <div><dt>${i("diagnostic_detail_in_cellar")}</dt><dd>${this.formatNumber(t.bottles_in_cellar)}</dd></div>
                <div><dt>${i("diagnostic_detail_stock")}</dt><dd>${this.formatNumber(t.effective_stock)}</dd></div>
                ${e === "negative" ? N`
                  <div><dt>${i("diagnostic_detail_purchased")}</dt><dd>${this.formatNumber(t.purchased ?? 0)}</dd></div>
                  <div><dt>${i("diagnostic_detail_consumed")}</dt><dd>${this.formatNumber(t.consumed ?? 0)}</dd></div>
                  <div><dt>${i("diagnostic_detail_balance")}</dt><dd>${this.formatNumber(t.movement_balance ?? 0)}</dd></div>
                ` : P}
              </dl>
            </section>
          `) : N`<p class="muted">${i("diagnostic_detail_empty")}</p>`}
        </div>
      </ha-dialog>
    `;
	}
	render() {
		let e = (e) => We(this.hass?.language ?? "en", e), t = this.inventory, n = this.config?.title ?? e("card_title"), r = this.config?.show_occupancy !== !1, i = this.config?.show_diagnostics !== !1, a = this.config?.show_statistics !== !1, o = t ? Math.min(t.total_positions, Math.max(0, t.occupied_positions)) : 0, s = t ? Math.max(0, t.total_positions - o) : 0, c = t && t.total_positions > 0 ? Math.round(o / t.total_positions * 100) : 0, l = t?.stock_reconstruction_complete ? [
			{
				key: "diagnostic_unlocated",
				value: t.unlocated_bottles ?? 0
			},
			{
				key: "diagnostic_negative",
				value: t.negative_movement_bottles ?? 0
			},
			{
				key: "diagnostic_surplus",
				value: t.physical_surplus_bottles ?? 0
			}
		].filter((e) => e.value > 0) : [], u = !!(t && (!t.stock_reconstruction_complete || l.length > 0 || t.positions_with_unknown_wine > 0)), d = t?.wines ?? [], f = t?.wine_references ?? d.length;
		return N`
      <ha-card>
        <header>
          <h2>${n}</h2>
          <button ?disabled=${this.loading} @click=${() => this.refresh()}>
            ${this.loading ? e("loading") : e("refresh")}
          </button>
        </header>
        ${this.error ? N`<div class="error">${this.error}</div>` : P}
        ${this.config?.config_entry_id ? P : N`<div class="muted">${e("select_config")}</div>`}
        ${t ? N`
          ${t.stale ? N`<div class="warning">${e("stale")}</div>` : P}
          <div class="summary">
            ${this.metric(t.total_bottles, e("bottles_in_cellar"))}
            ${this.metric(t.total_stock_bottles ?? e("unknown_value"), e("reconstructed_stock"))}
            ${this.metric(f, e("stocked_references"))}
            ${this.metric(t.rack_count, e("racks"))}
          </div>
          ${r ? N`
            <section class="section" aria-label=${e("rack_occupancy")}>
              <div class="occupancy-bar" role="progressbar"
                aria-label=${e("rack_occupancy")}
                aria-valuemin="0" aria-valuemax=${t.total_positions}
                aria-valuenow=${o}
                aria-valuetext=${`${o} ${e("occupied")}, ${s} ${e("free")}, ${t.total_positions} ${e("positions")}`}>
                <div class="occupancy-fill" style=${`width: ${c}%`}></div>
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
          ` : P}
          ${i && u ? N`
            <details class="section" open>
              <summary class="section-title">${e("inventory_diagnostics")}</summary>
              ${t.stock_reconstruction_complete ? P : N`<div class="warning">${e("reconstruction_incomplete")}</div>`}
              ${l.length ? N`
                <div class="diagnostics">
                  ${l.map((t) => {
			let n = t.key === "diagnostic_unlocated" ? "unlocated" : t.key === "diagnostic_negative" ? "negative" : "surplus";
			return N`
                      <button class="diagnostic" type="button" aria-haspopup="dialog"
                        @click=${() => {
				this.activeDiagnostic = n;
			}}>
                        <span class="diagnostic-value">${this.formatNumber(t.value)}</span>
                        <span class="label">${e(t.key)}</span>
                        <span class="diagnostic-hint">${e("diagnostic_detail_open")}</span>
                      </button>
                    `;
		})}
                </div>
              ` : P}
              ${t.positions_with_unknown_wine > 0 ? N`<div class="warning">${e("statistics_unknown_wine_positions").replace("{count}", this.formatNumber(t.positions_with_unknown_wine))}</div>` : P}
            </details>
          ` : P}
          ${a ? N`
            <details class="section" open>
              <summary class="section-title">${e("statistics_title")}</summary>
              <p class="muted">${e("statistics_distribution_scope")}</p>
              <div class="groups">
                ${this.renderDistribution("color", "statistics_color")}
                ${this.renderDistribution("region", "statistics_region")}
                ${this.renderDistribution("appellation", "statistics_appellation")}
                ${this.renderDistribution("vintage", "statistics_vintage")}
                ${this.renderDistribution("bottle_format", "statistics_format")}
              </div>
            </details>
          ` : P}
          <div class="muted section">${e("last_sync")}: ${this.formatSync(t.last_sync)}</div>
          ${this.renderDiagnosticDialog()}
          ${this.selectedWine ? N`
            <ploc-cellar-wine-detail
              .hass=${this.hass}
              .wine=${this.selectedWine}
              @wine-detail-closed=${() => {
			this.selectedWine = void 0;
		}}>
            </ploc-cellar-wine-detail>
          ` : P}
        ` : P}
      </ha-card>
    `;
	}
	getCardSize() {
		return 12;
	}
	getGridOptions() {
		return {
			columns: 12,
			min_columns: 6
		};
	}
};
I([Ve({ attribute: !1 })], UO.prototype, "hass", void 0), I([F()], UO.prototype, "config", void 0), I([F()], UO.prototype, "inventory", void 0), I([F()], UO.prototype, "loading", void 0), I([F()], UO.prototype, "error", void 0), I([F()], UO.prototype, "activeDiagnostic", void 0), I([F()], UO.prototype, "selectedWine", void 0), UO = I([Re("ploc-cellar-card")], UO);
var WO = class extends UO {};
WO = I([Re("ploc-cellar-statistics-card")], WO), window.customCards ??= [], window.customCards.push({
	type: "ploc-cellar-card",
	name: Ge("picker_overview_name"),
	description: Ge("picker_overview_description")
});
export { UO as PlocCellarCard, WO as PlocCellarStatisticsCard };
