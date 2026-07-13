const W = (e, t) => e === t, x = {
  equals: W
};
let J = R;
const g = 1, E = 2, I = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var u = null;
let B = null, K = null, f = null, c = null, w = null, T = 0;
function X(e, t) {
  const s = f, n = u, l = e.length === 0, o = t === void 0 ? n : t, r = l ? I : {
    owned: null,
    cleanups: null,
    context: o ? o.context : null,
    owner: o
  }, i = l ? e : () => e(() => S(() => b(r)));
  u = r, f = null;
  try {
    return A(i, !0);
  } finally {
    f = s, u = n;
  }
}
function Y(e, t) {
  t = t ? Object.assign({}, x, t) : x;
  const s = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, n = (l) => (typeof l == "function" && (l = l(s.value)), M(s, l));
  return [L.bind(s), n];
}
function U(e, t, s) {
  const n = V(e, t, !1, g);
  N(n);
}
function _(e, t, s) {
  s = s ? Object.assign({}, x, s) : x;
  const n = V(e, t, !0, 0);
  return n.observers = null, n.observerSlots = null, n.comparator = s.equals || void 0, N(n), L.bind(n);
}
function S(e) {
  if (f === null) return e();
  const t = f;
  f = null;
  try {
    return e();
  } finally {
    f = t;
  }
}
function Z(e) {
  return u === null || (u.cleanups === null ? u.cleanups = [e] : u.cleanups.push(e)), e;
}
function L() {
  if (this.sources && this.state)
    if (this.state === g) N(this);
    else {
      const e = c;
      c = null, A(() => m(this), !1), c = e;
    }
  if (f) {
    const e = this.observers ? this.observers.length : 0;
    f.sources ? (f.sources.push(this), f.sourceSlots.push(e)) : (f.sources = [this], f.sourceSlots = [e]), this.observers ? (this.observers.push(f), this.observerSlots.push(f.sources.length - 1)) : (this.observers = [f], this.observerSlots = [f.sources.length - 1]);
  }
  return this.value;
}
function M(e, t, s) {
  let n = e.value;
  return (!e.comparator || !e.comparator(n, t)) && (e.value = t, e.observers && e.observers.length && A(() => {
    for (let l = 0; l < e.observers.length; l += 1) {
      const o = e.observers[l], r = B && B.running;
      r && B.disposed.has(o), (r ? !o.tState : !o.state) && (o.pure ? c.push(o) : w.push(o), o.observers && j(o)), r || (o.state = g);
    }
    if (c.length > 1e6)
      throw c = [], new Error();
  }, !1)), t;
}
function N(e) {
  if (!e.fn) return;
  b(e);
  const t = T;
  z(e, e.value, t);
}
function z(e, t, s) {
  let n;
  const l = u, o = f;
  f = u = e;
  try {
    n = e.fn(t);
  } catch (r) {
    return e.pure && (e.state = g, e.owned && e.owned.forEach(b), e.owned = null), e.updatedAt = s + 1, F(r);
  } finally {
    f = o, u = l;
  }
  (!e.updatedAt || e.updatedAt <= s) && (e.updatedAt != null && "observers" in e ? M(e, n) : e.value = n, e.updatedAt = s);
}
function V(e, t, s, n = g, l) {
  const o = {
    fn: e,
    state: n,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: u,
    context: u ? u.context : null,
    pure: s
  };
  return u === null || u !== I && (u.owned ? u.owned.push(o) : u.owned = [o]), o;
}
function P(e) {
  if (e.state === 0) return;
  if (e.state === E) return m(e);
  if (e.suspense && S(e.suspense.inFallback)) return e.suspense.effects.push(e);
  const t = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < T); )
    e.state && t.push(e);
  for (let s = t.length - 1; s >= 0; s--)
    if (e = t[s], e.state === g)
      N(e);
    else if (e.state === E) {
      const n = c;
      c = null, A(() => m(e, t[0]), !1), c = n;
    }
}
function A(e, t) {
  if (c) return e();
  let s = !1;
  t || (c = []), w ? s = !0 : w = [], T++;
  try {
    const n = e();
    return k(s), n;
  } catch (n) {
    s || (w = null), c = null, F(n);
  }
}
function k(e) {
  if (c && (R(c), c = null), e) return;
  const t = w;
  w = null, t.length && A(() => J(t), !1);
}
function R(e) {
  for (let t = 0; t < e.length; t++) P(e[t]);
}
function m(e, t) {
  e.state = 0;
  for (let s = 0; s < e.sources.length; s += 1) {
    const n = e.sources[s];
    if (n.sources) {
      const l = n.state;
      l === g ? n !== t && (!n.updatedAt || n.updatedAt < T) && P(n) : l === E && m(n, t);
    }
  }
}
function j(e) {
  for (let t = 0; t < e.observers.length; t += 1) {
    const s = e.observers[t];
    s.state || (s.state = E, s.pure ? c.push(s) : w.push(s), s.observers && j(s));
  }
}
function b(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const s = e.sources.pop(), n = e.sourceSlots.pop(), l = s.observers;
      if (l && l.length) {
        const o = l.pop(), r = s.observerSlots.pop();
        n < l.length && (o.sourceSlots[r] = n, l[n] = o, s.observerSlots[n] = r);
      }
    }
  if (e.tOwned) {
    for (t = e.tOwned.length - 1; t >= 0; t--) b(e.tOwned[t]);
    delete e.tOwned;
  }
  if (e.owned) {
    for (t = e.owned.length - 1; t >= 0; t--) b(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0;
}
function ee(e) {
  return e instanceof Error ? e : new Error(typeof e == "string" ? e : "Unknown error", {
    cause: e
  });
}
function F(e, t = u) {
  throw ee(e);
}
function G(e, t) {
  return S(() => e(t || {}));
}
const te = (e) => `Stale read from <${e}>.`;
function se(e) {
  const t = e.keyed, s = _(() => e.when, void 0, void 0), n = t ? s : _(s, void 0, {
    equals: (l, o) => !l == !o
  });
  return _(() => {
    const l = n();
    if (l) {
      const o = e.children;
      return typeof o == "function" && o.length > 0 ? S(() => o(t ? l : () => {
        if (!S(n)) throw te("Show");
        return s();
      })) : o;
    }
    return e.fallback;
  }, void 0, void 0);
}
function ne(e, t, s) {
  let n = s.length, l = t.length, o = n, r = 0, i = 0, h = t[l - 1].nextSibling, p = null;
  for (; r < l || i < o; ) {
    if (t[r] === s[i]) {
      r++, i++;
      continue;
    }
    for (; t[l - 1] === s[o - 1]; )
      l--, o--;
    if (l === r) {
      const a = o < n ? i ? s[i - 1].nextSibling : s[o - i] : h;
      for (; i < o; ) e.insertBefore(s[i++], a);
    } else if (o === i)
      for (; r < l; )
        (!p || !p.has(t[r])) && t[r].remove(), r++;
    else if (t[r] === s[o - 1] && s[i] === t[l - 1]) {
      const a = t[--l].nextSibling;
      e.insertBefore(s[i++], t[r++].nextSibling), e.insertBefore(s[--o], a), t[l] = s[o];
    } else {
      if (!p) {
        p = /* @__PURE__ */ new Map();
        let d = i;
        for (; d < o; ) p.set(s[d], d++);
      }
      const a = p.get(t[r]);
      if (a != null)
        if (i < a && a < o) {
          let d = r, O = 1, q;
          for (; ++d < l && d < o && !((q = p.get(t[d])) == null || q !== a + O); )
            O++;
          if (O > a - i) {
            const Q = t[r];
            for (; i < a; ) e.insertBefore(s[i++], Q);
          } else e.replaceChild(s[i++], t[r++]);
        } else r++;
      else t[r++].remove();
    }
  }
}
function le(e, t, s, n = {}) {
  let l;
  return X((o) => {
    l = o, t === document ? e() : C(t, e(), t.firstChild ? null : void 0, s);
  }, n.owner), () => {
    l(), t.textContent = "";
  };
}
function H(e, t, s, n) {
  let l;
  const o = () => {
    const i = document.createElement("template");
    return i.innerHTML = e, i.content.firstChild;
  }, r = () => (l || (l = o())).cloneNode(!0);
  return r.cloneNode = r, r;
}
function C(e, t, s, n) {
  if (s !== void 0 && !n && (n = []), typeof t != "function") return v(e, t, n, s);
  U((l) => v(e, t(), l, s), n);
}
function v(e, t, s, n, l) {
  for (; typeof s == "function"; ) s = s();
  if (t === s) return s;
  const o = typeof t, r = n !== void 0;
  if (e = r && s[0] && s[0].parentNode || e, o === "string" || o === "number") {
    if (o === "number" && (t = t.toString(), t === s))
      return s;
    if (r) {
      let i = s[0];
      i && i.nodeType === 3 ? i.data !== t && (i.data = t) : i = document.createTextNode(t), s = y(e, s, n, i);
    } else
      s !== "" && typeof s == "string" ? s = e.firstChild.data = t : s = e.textContent = t;
  } else if (t == null || o === "boolean")
    s = y(e, s, n);
  else {
    if (o === "function")
      return U(() => {
        let i = t();
        for (; typeof i == "function"; ) i = i();
        s = v(e, i, s, n);
      }), () => s;
    if (Array.isArray(t)) {
      const i = [], h = s && Array.isArray(s);
      if ($(i, t, s, l))
        return U(() => s = v(e, i, s, n, !0)), () => s;
      if (i.length === 0) {
        if (s = y(e, s, n), r) return s;
      } else h ? s.length === 0 ? D(e, i, n) : ne(e, s, i) : (s && y(e), D(e, i));
      s = i;
    } else if (t.nodeType) {
      if (Array.isArray(s)) {
        if (r) return s = y(e, s, n, t);
        y(e, s, null, t);
      } else s == null || s === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      s = t;
    }
  }
  return s;
}
function $(e, t, s, n) {
  let l = !1;
  for (let o = 0, r = t.length; o < r; o++) {
    let i = t[o], h = s && s[e.length], p;
    if (!(i == null || i === !0 || i === !1)) if ((p = typeof i) == "object" && i.nodeType)
      e.push(i);
    else if (Array.isArray(i))
      l = $(e, i, h) || l;
    else if (p === "function")
      if (n) {
        for (; typeof i == "function"; ) i = i();
        l = $(e, Array.isArray(i) ? i : [i], Array.isArray(h) ? h : [h]) || l;
      } else
        e.push(i), l = !0;
    else {
      const a = String(i);
      h && h.nodeType === 3 && h.data === a ? e.push(h) : e.push(document.createTextNode(a));
    }
  }
  return l;
}
function D(e, t, s = null) {
  for (let n = 0, l = t.length; n < l; n++) e.insertBefore(t[n], s);
}
function y(e, t, s, n) {
  if (s === void 0) return e.textContent = "";
  const l = n || document.createTextNode("");
  if (t.length) {
    let o = !1;
    for (let r = t.length - 1; r >= 0; r--) {
      const i = t[r];
      if (l !== i) {
        const h = i.parentNode === e;
        !o && !r ? h ? e.replaceChild(l, i) : e.insertBefore(l, s) : h && i.remove();
      } else o = !0;
    }
  } else e.insertBefore(l, s);
  return [l];
}
var ie = /* @__PURE__ */ H("<p class=solid-widget-description>"), oe = /* @__PURE__ */ H("<section class=solid-widget-section><h3 class=solid-widget-title>");
function re({
  sdk: e
}) {
  const [t, s] = Y(e.getProps()), n = e.on("propsChanged", s);
  return Z(n), (() => {
    var l = oe(), o = l.firstChild;
    return C(o, () => t().title), C(l, G(se, {
      get when() {
        return t().description;
      },
      get children() {
        var r = ie();
        return C(r, () => t().description), r;
      }
    }), null), l;
  })();
}
async function fe(e) {
  await e.whenReady();
  const t = le(() => G(re, {
    sdk: e
  }), e.getContainer());
  e.on("destroy", t);
}
export {
  fe as init
};
