var R, h, h_, P, e_, d_, v_, m_, Q, z, V, E = {}, L = [], H_ = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, q = Array.isArray;
function $(e, _) {
  for (var t in _) e[t] = _[t];
  return e;
}
function X(e) {
  e && e.parentNode && e.parentNode.removeChild(e);
}
function S_(e, _, t) {
  var o, i, n, u = {};
  for (n in _) n == "key" ? o = _[n] : n == "ref" ? i = _[n] : u[n] = _[n];
  if (arguments.length > 2 && (u.children = arguments.length > 3 ? R.call(arguments, 2) : t), typeof e == "function" && e.defaultProps != null) for (n in e.defaultProps) u[n] === void 0 && (u[n] = e.defaultProps[n]);
  return A(e, u, o, i, null);
}
function A(e, _, t, o, i) {
  var n = { type: e, props: _, key: t, ref: o, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: i ?? ++h_, __i: -1, __u: 0 };
  return i == null && h.vnode != null && h.vnode(n), n;
}
function B(e) {
  return e.children;
}
function D(e, _) {
  this.props = e, this.context = _;
}
function S(e, _) {
  if (_ == null) return e.__ ? S(e.__, e.__i + 1) : null;
  for (var t; _ < e.__k.length; _++) if ((t = e.__k[_]) != null && t.__e != null) return t.__e;
  return typeof e.type == "function" ? S(e) : null;
}
function N_(e) {
  if (e.__P && e.__d) {
    var _ = e.__v, t = _.__e, o = [], i = [], n = $({}, _);
    n.__v = _.__v + 1, h.vnode && h.vnode(n), Y(e.__P, n, _, e.__n, e.__P.namespaceURI, 32 & _.__u ? [t] : null, o, t ?? S(_), !!(32 & _.__u), i), n.__v = _.__v, n.__.__k[n.__i] = n, k_(o, n, i), _.__e = _.__ = null, n.__e != t && y_(n);
  }
}
function y_(e) {
  if ((e = e.__) != null && e.__c != null) return e.__e = e.__c.base = null, e.__k.some(function(_) {
    if (_ != null && _.__e != null) return e.__e = e.__c.base = _.__e;
  }), y_(e);
}
function t_(e) {
  (!e.__d && (e.__d = !0) && P.push(e) && !W.__r++ || e_ != h.debounceRendering) && ((e_ = h.debounceRendering) || d_)(W);
}
function W() {
  try {
    for (var e, _ = 1; P.length; ) P.length > _ && P.sort(v_), e = P.shift(), _ = P.length, N_(e);
  } finally {
    P.length = W.__r = 0;
  }
}
function g_(e, _, t, o, i, n, u, c, f, l, a) {
  var r, p, s, g, k, b, v, d = o && o.__k || L, x = _.length;
  for (f = T_(t, _, d, f, x), r = 0; r < x; r++) (s = t.__k[r]) != null && (p = s.__i != -1 && d[s.__i] || E, s.__i = r, b = Y(e, s, p, i, n, u, c, f, l, a), g = s.__e, s.ref && p.ref != s.ref && (p.ref && Z(p.ref, null, s), a.push(s.ref, s.__c || g, s)), k == null && g != null && (k = g), (v = !!(4 & s.__u)) || p.__k === s.__k ? f = b_(s, f, e, v) : typeof s.type == "function" && b !== void 0 ? f = b : g && (f = g.nextSibling), s.__u &= -7);
  return t.__e = k, f;
}
function T_(e, _, t, o, i) {
  var n, u, c, f, l, a = t.length, r = a, p = 0;
  for (e.__k = new Array(i), n = 0; n < i; n++) (u = _[n]) != null && typeof u != "boolean" && typeof u != "function" ? (typeof u == "string" || typeof u == "number" || typeof u == "bigint" || u.constructor == String ? u = e.__k[n] = A(null, u, null, null, null) : q(u) ? u = e.__k[n] = A(B, { children: u }, null, null, null) : u.constructor === void 0 && u.__b > 0 ? u = e.__k[n] = A(u.type, u.props, u.key, u.ref ? u.ref : null, u.__v) : e.__k[n] = u, f = n + p, u.__ = e, u.__b = e.__b + 1, c = null, (l = u.__i = U_(u, t, f, r)) != -1 && (r--, (c = t[l]) && (c.__u |= 2)), c == null || c.__v == null ? (l == -1 && (i > a ? p-- : i < a && p++), typeof u.type != "function" && (u.__u |= 4)) : l != f && (l == f - 1 ? p-- : l == f + 1 ? p++ : (l > f ? p-- : p++, u.__u |= 4))) : e.__k[n] = null;
  if (r) for (n = 0; n < a; n++) (c = t[n]) != null && (2 & c.__u) == 0 && (c.__e == o && (o = S(c)), $_(c, c));
  return o;
}
function b_(e, _, t, o) {
  var i, n;
  if (typeof e.type == "function") {
    for (i = e.__k, n = 0; i && n < i.length; n++) i[n] && (i[n].__ = e, _ = b_(i[n], _, t, o));
    return _;
  }
  e.__e != _ && (o && (_ && e.type && !_.parentNode && (_ = S(e)), t.insertBefore(e.__e, _ || null)), _ = e.__e);
  do
    _ = _ && _.nextSibling;
  while (_ != null && _.nodeType == 8);
  return _;
}
function U_(e, _, t, o) {
  var i, n, u, c = e.key, f = e.type, l = _[t], a = l != null && (2 & l.__u) == 0;
  if (l === null && c == null || a && c == l.key && f == l.type) return t;
  if (o > (a ? 1 : 0)) {
    for (i = t - 1, n = t + 1; i >= 0 || n < _.length; ) if ((l = _[u = i >= 0 ? i-- : n++]) != null && (2 & l.__u) == 0 && c == l.key && f == l.type) return u;
  }
  return -1;
}
function n_(e, _, t) {
  _[0] == "-" ? e.setProperty(_, t ?? "") : e[_] = t == null ? "" : typeof t != "number" || H_.test(_) ? t : t + "px";
}
function U(e, _, t, o, i) {
  var n, u;
  _: if (_ == "style") if (typeof t == "string") e.style.cssText = t;
  else {
    if (typeof o == "string" && (e.style.cssText = o = ""), o) for (_ in o) t && _ in t || n_(e.style, _, "");
    if (t) for (_ in t) o && t[_] == o[_] || n_(e.style, _, t[_]);
  }
  else if (_[0] == "o" && _[1] == "n") n = _ != (_ = _.replace(m_, "$1")), u = _.toLowerCase(), _ = u in e || _ == "onFocusOut" || _ == "onFocusIn" ? u.slice(2) : _.slice(2), e.l || (e.l = {}), e.l[_ + n] = t, t ? o ? t.u = o.u : (t.u = Q, e.addEventListener(_, n ? V : z, n)) : e.removeEventListener(_, n ? V : z, n);
  else {
    if (i == "http://www.w3.org/2000/svg") _ = _.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if (_ != "width" && _ != "height" && _ != "href" && _ != "list" && _ != "form" && _ != "tabIndex" && _ != "download" && _ != "rowSpan" && _ != "colSpan" && _ != "role" && _ != "popover" && _ in e) try {
      e[_] = t ?? "";
      break _;
    } catch {
    }
    typeof t == "function" || (t == null || t === !1 && _[4] != "-" ? e.removeAttribute(_) : e.setAttribute(_, _ == "popover" && t == 1 ? "" : t));
  }
}
function r_(e) {
  return function(_) {
    if (this.l) {
      var t = this.l[_.type + e];
      if (_.t == null) _.t = Q++;
      else if (_.t < t.u) return;
      return t(h.event ? h.event(_) : _);
    }
  };
}
function Y(e, _, t, o, i, n, u, c, f, l) {
  var a, r, p, s, g, k, b, v, d, x, C, N, __, T, j, w = _.type;
  if (_.constructor !== void 0) return null;
  128 & t.__u && (f = !!(32 & t.__u), n = [c = _.__e = t.__e]), (a = h.__b) && a(_);
  _: if (typeof w == "function") try {
    if (v = _.props, d = w.prototype && w.prototype.render, x = (a = w.contextType) && o[a.__c], C = a ? x ? x.props.value : a.__ : o, t.__c ? b = (r = _.__c = t.__c).__ = r.__E : (d ? _.__c = r = new w(v, C) : (_.__c = r = new D(v, C), r.constructor = w, r.render = D_), x && x.sub(r), r.state || (r.state = {}), r.__n = o, p = r.__d = !0, r.__h = [], r._sb = []), d && r.__s == null && (r.__s = r.state), d && w.getDerivedStateFromProps != null && (r.__s == r.state && (r.__s = $({}, r.__s)), $(r.__s, w.getDerivedStateFromProps(v, r.__s))), s = r.props, g = r.state, r.__v = _, p) d && w.getDerivedStateFromProps == null && r.componentWillMount != null && r.componentWillMount(), d && r.componentDidMount != null && r.__h.push(r.componentDidMount);
    else {
      if (d && w.getDerivedStateFromProps == null && v !== s && r.componentWillReceiveProps != null && r.componentWillReceiveProps(v, C), _.__v == t.__v || !r.__e && r.shouldComponentUpdate != null && r.shouldComponentUpdate(v, r.__s, C) === !1) {
        _.__v != t.__v && (r.props = v, r.state = r.__s, r.__d = !1), _.__e = t.__e, _.__k = t.__k, _.__k.some(function(H) {
          H && (H.__ = _);
        }), L.push.apply(r.__h, r._sb), r._sb = [], r.__h.length && u.push(r);
        break _;
      }
      r.componentWillUpdate != null && r.componentWillUpdate(v, r.__s, C), d && r.componentDidUpdate != null && r.__h.push(function() {
        r.componentDidUpdate(s, g, k);
      });
    }
    if (r.context = C, r.props = v, r.__P = e, r.__e = !1, N = h.__r, __ = 0, d) r.state = r.__s, r.__d = !1, N && N(_), a = r.render(r.props, r.state, r.context), L.push.apply(r.__h, r._sb), r._sb = [];
    else do
      r.__d = !1, N && N(_), a = r.render(r.props, r.state, r.context), r.state = r.__s;
    while (r.__d && ++__ < 25);
    r.state = r.__s, r.getChildContext != null && (o = $($({}, o), r.getChildContext())), d && !p && r.getSnapshotBeforeUpdate != null && (k = r.getSnapshotBeforeUpdate(s, g)), T = a != null && a.type === B && a.key == null ? w_(a.props.children) : a, c = g_(e, q(T) ? T : [T], _, t, o, i, n, u, c, f, l), r.base = _.__e, _.__u &= -161, r.__h.length && u.push(r), b && (r.__E = r.__ = null);
  } catch (H) {
    if (_.__v = null, f || n != null) if (H.then) {
      for (_.__u |= f ? 160 : 128; c && c.nodeType == 8 && c.nextSibling; ) c = c.nextSibling;
      n[n.indexOf(c)] = null, _.__e = c;
    } else {
      for (j = n.length; j--; ) X(n[j]);
      G(_);
    }
    else _.__e = t.__e, _.__k = t.__k, H.then || G(_);
    h.__e(H, _, t);
  }
  else n == null && _.__v == t.__v ? (_.__k = t.__k, _.__e = t.__e) : c = _.__e = A_(t.__e, _, t, o, i, n, u, f, l);
  return (a = h.diffed) && a(_), 128 & _.__u ? void 0 : c;
}
function G(e) {
  e && (e.__c && (e.__c.__e = !0), e.__k && e.__k.some(G));
}
function k_(e, _, t) {
  for (var o = 0; o < t.length; o++) Z(t[o], t[++o], t[++o]);
  h.__c && h.__c(_, e), e.some(function(i) {
    try {
      e = i.__h, i.__h = [], e.some(function(n) {
        n.call(i);
      });
    } catch (n) {
      h.__e(n, i.__v);
    }
  });
}
function w_(e) {
  return typeof e != "object" || e == null || e.__b > 0 ? e : q(e) ? e.map(w_) : $({}, e);
}
function A_(e, _, t, o, i, n, u, c, f) {
  var l, a, r, p, s, g, k, b = t.props || E, v = _.props, d = _.type;
  if (d == "svg" ? i = "http://www.w3.org/2000/svg" : d == "math" ? i = "http://www.w3.org/1998/Math/MathML" : i || (i = "http://www.w3.org/1999/xhtml"), n != null) {
    for (l = 0; l < n.length; l++) if ((s = n[l]) && "setAttribute" in s == !!d && (d ? s.localName == d : s.nodeType == 3)) {
      e = s, n[l] = null;
      break;
    }
  }
  if (e == null) {
    if (d == null) return document.createTextNode(v);
    e = document.createElementNS(i, d, v.is && v), c && (h.__m && h.__m(_, n), c = !1), n = null;
  }
  if (d == null) b === v || c && e.data == v || (e.data = v);
  else {
    if (n = n && R.call(e.childNodes), !c && n != null) for (b = {}, l = 0; l < e.attributes.length; l++) b[(s = e.attributes[l]).name] = s.value;
    for (l in b) s = b[l], l == "dangerouslySetInnerHTML" ? r = s : l == "children" || l in v || l == "value" && "defaultValue" in v || l == "checked" && "defaultChecked" in v || U(e, l, null, s, i);
    for (l in v) s = v[l], l == "children" ? p = s : l == "dangerouslySetInnerHTML" ? a = s : l == "value" ? g = s : l == "checked" ? k = s : c && typeof s != "function" || b[l] === s || U(e, l, s, b[l], i);
    if (a) c || r && (a.__html == r.__html || a.__html == e.innerHTML) || (e.innerHTML = a.__html), _.__k = [];
    else if (r && (e.innerHTML = ""), g_(_.type == "template" ? e.content : e, q(p) ? p : [p], _, t, o, d == "foreignObject" ? "http://www.w3.org/1999/xhtml" : i, n, u, n ? n[0] : t.__k && S(t, 0), c, f), n != null) for (l = n.length; l--; ) X(n[l]);
    c || (l = "value", d == "progress" && g == null ? e.removeAttribute("value") : g != null && (g !== e[l] || d == "progress" && !g || d == "option" && g != b[l]) && U(e, l, g, b[l], i), l = "checked", k != null && k != e[l] && U(e, l, k, b[l], i));
  }
  return e;
}
function Z(e, _, t) {
  try {
    if (typeof e == "function") {
      var o = typeof e.__u == "function";
      o && e.__u(), o && _ == null || (e.__u = e(_));
    } else e.current = _;
  } catch (i) {
    h.__e(i, t);
  }
}
function $_(e, _, t) {
  var o, i;
  if (h.unmount && h.unmount(e), (o = e.ref) && (o.current && o.current != e.__e || Z(o, null, _)), (o = e.__c) != null) {
    if (o.componentWillUnmount) try {
      o.componentWillUnmount();
    } catch (n) {
      h.__e(n, _);
    }
    o.base = o.__P = null;
  }
  if (o = e.__k) for (i = 0; i < o.length; i++) o[i] && $_(o[i], _, t || typeof e.type != "function");
  t || X(e.__e), e.__c = e.__ = e.__e = void 0;
}
function D_(e, _, t) {
  return this.constructor(e, t);
}
function o_(e, _, t) {
  var o, i, n, u;
  _ == document && (_ = document.documentElement), h.__ && h.__(e, _), i = (o = !1) ? null : _.__k, n = [], u = [], Y(_, e = _.__k = S_(B, null, [e]), i || E, E, _.namespaceURI, i ? null : _.firstChild ? R.call(_.childNodes) : null, n, i ? i.__e : _.firstChild, o, u), k_(n, e, u);
}
R = L.slice, h = { __e: function(e, _, t, o) {
  for (var i, n, u; _ = _.__; ) if ((i = _.__c) && !i.__) try {
    if ((n = i.constructor) && n.getDerivedStateFromError != null && (i.setState(n.getDerivedStateFromError(e)), u = i.__d), i.componentDidCatch != null && (i.componentDidCatch(e, o || {}), u = i.__d), u) return i.__E = i;
  } catch (c) {
    e = c;
  }
  throw e;
} }, h_ = 0, D.prototype.setState = function(e, _) {
  var t;
  t = this.__s != null && this.__s != this.state ? this.__s : this.__s = $({}, this.state), typeof e == "function" && (e = e($({}, t), this.props)), e && $(t, e), e != null && this.__v && (_ && this._sb.push(_), t_(this));
}, D.prototype.forceUpdate = function(e) {
  this.__v && (this.__e = !0, e && this.__h.push(e), t_(this));
}, D.prototype.render = B, P = [], d_ = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, v_ = function(e, _) {
  return e.__v.__b - _.__v.__b;
}, W.__r = 0, m_ = /(PointerCapture)$|Capture$/i, Q = 0, z = r_(!1), V = r_(!0);
var F_ = 0;
function F(e, _, t, o, i, n) {
  _ || (_ = {});
  var u, c, f = _;
  if ("ref" in f) for (c in f = {}, _) c == "ref" ? u = _[c] : f[c] = _[c];
  var l = { type: e, props: f, key: t, ref: u, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --F_, __i: -1, __u: 0, __source: i, __self: n };
  if (typeof e == "function" && (u = e.defaultProps)) for (c in u) f[c] === void 0 && (f[c] = u[c]);
  return h.vnode && h.vnode(l), l;
}
var I, m, O, i_, J = 0, x_ = [], y = h, l_ = y.__b, u_ = y.__r, c_ = y.diffed, s_ = y.__c, f_ = y.unmount, a_ = y.__;
function P_(e, _) {
  y.__h && y.__h(m, e, J || _), J = 0;
  var t = m.__H || (m.__H = { __: [], __h: [] });
  return e >= t.__.length && t.__.push({}), t.__[e];
}
function M_(e) {
  return J = 1, E_(C_, e);
}
function E_(e, _, t) {
  var o = P_(I++, 2);
  if (o.t = e, !o.__c && (o.__ = [C_(void 0, _), function(c) {
    var f = o.__N ? o.__N[0] : o.__[0], l = o.t(f, c);
    f !== l && (o.__N = [l, o.__[1]], o.__c.setState({}));
  }], o.__c = m, !m.__f)) {
    var i = function(c, f, l) {
      if (!o.__c.__H) return !0;
      var a = o.__c.__H.__.filter(function(p) {
        return p.__c;
      });
      if (a.every(function(p) {
        return !p.__N;
      })) return !n || n.call(this, c, f, l);
      var r = o.__c.props !== c;
      return a.some(function(p) {
        if (p.__N) {
          var s = p.__[0];
          p.__ = p.__N, p.__N = void 0, s !== p.__[0] && (r = !0);
        }
      }), n && n.call(this, c, f, l) || r;
    };
    m.__f = !0;
    var n = m.shouldComponentUpdate, u = m.componentWillUpdate;
    m.componentWillUpdate = function(c, f, l) {
      if (this.__e) {
        var a = n;
        n = void 0, i(c, f, l), n = a;
      }
      u && u.call(this, c, f, l);
    }, m.shouldComponentUpdate = i;
  }
  return o.__N || o.__;
}
function L_(e, _) {
  var t = P_(I++, 3);
  !y.__s && R_(t.__H, _) && (t.__ = e, t.u = _, m.__H.__h.push(t));
}
function W_() {
  for (var e; e = x_.shift(); ) {
    var _ = e.__H;
    if (e.__P && _) try {
      _.__h.some(M), _.__h.some(K), _.__h = [];
    } catch (t) {
      _.__h = [], y.__e(t, e.__v);
    }
  }
}
y.__b = function(e) {
  m = null, l_ && l_(e);
}, y.__ = function(e, _) {
  e && _.__k && _.__k.__m && (e.__m = _.__k.__m), a_ && a_(e, _);
}, y.__r = function(e) {
  u_ && u_(e), I = 0;
  var _ = (m = e.__c).__H;
  _ && (O === m ? (_.__h = [], m.__h = [], _.__.some(function(t) {
    t.__N && (t.__ = t.__N), t.u = t.__N = void 0;
  })) : (_.__h.some(M), _.__h.some(K), _.__h = [], I = 0)), O = m;
}, y.diffed = function(e) {
  c_ && c_(e);
  var _ = e.__c;
  _ && _.__H && (_.__H.__h.length && (x_.push(_) !== 1 && i_ === y.requestAnimationFrame || ((i_ = y.requestAnimationFrame) || I_)(W_)), _.__H.__.some(function(t) {
    t.u && (t.__H = t.u), t.u = void 0;
  })), O = m = null;
}, y.__c = function(e, _) {
  _.some(function(t) {
    try {
      t.__h.some(M), t.__h = t.__h.filter(function(o) {
        return !o.__ || K(o);
      });
    } catch (o) {
      _.some(function(i) {
        i.__h && (i.__h = []);
      }), _ = [], y.__e(o, t.__v);
    }
  }), s_ && s_(e, _);
}, y.unmount = function(e) {
  f_ && f_(e);
  var _, t = e.__c;
  t && t.__H && (t.__H.__.some(function(o) {
    try {
      M(o);
    } catch (i) {
      _ = i;
    }
  }), t.__H = void 0, _ && y.__e(_, t.__v));
};
var p_ = typeof requestAnimationFrame == "function";
function I_(e) {
  var _, t = function() {
    clearTimeout(o), p_ && cancelAnimationFrame(_), setTimeout(e);
  }, o = setTimeout(t, 35);
  p_ && (_ = requestAnimationFrame(t));
}
function M(e) {
  var _ = m, t = e.__c;
  typeof t == "function" && (e.__c = void 0, t()), m = _;
}
function K(e) {
  var _ = m;
  e.__c = e.__(), m = _;
}
function R_(e, _) {
  return !e || e.length !== _.length || _.some(function(t, o) {
    return t !== e[o];
  });
}
function C_(e, _) {
  return typeof _ == "function" ? _(e) : _;
}
function q_({ sdk: e }) {
  const [_, t] = M_(e.getProps());
  return L_(() => e.on("propsChanged", t), [e]), /* @__PURE__ */ F("section", { class: "preact-widget-section", children: [
    /* @__PURE__ */ F("h3", { class: "preact-widget-title", children: _.title }),
    !!_.description && /* @__PURE__ */ F("p", { class: "preact-widget-description", children: _.description })
  ] });
}
async function B_(e) {
  await e.whenReady(), o_(/* @__PURE__ */ F(q_, { sdk: e }), e.getContainer()), e.on("destroy", () => o_(null, e.getContainer()));
}
export {
  B_ as init
};
