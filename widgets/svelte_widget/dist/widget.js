var Kn = Object.defineProperty;
var Ht = (e) => {
  throw TypeError(e);
};
var Gn = (e, t, n) => t in e ? Kn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var G = (e, t, n) => Gn(e, typeof t != "symbol" ? t + "" : t, n), yt = (e, t, n) => t.has(e) || Ht("Cannot " + n);
var s = (e, t, n) => (yt(e, t, "read from private field"), n ? n.call(e) : t.get(e)), w = (e, t, n) => t.has(e) ? Ht("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), v = (e, t, n, r) => (yt(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), x = (e, t, n) => (yt(e, t, "access private method"), n);
var Wn = Array.isArray, $n = Array.prototype.indexOf, He = Array.prototype.includes, Zn = Array.from, Jn = Object.defineProperty, $e = Object.getOwnPropertyDescriptor, Qn = Object.prototype, Xn = Array.prototype, er = Object.getPrototypeOf, zt = Object.isExtensible;
const tr = () => {
};
function nr(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function un() {
  var e, t, n = new Promise((r, i) => {
    e = r, t = i;
  });
  return { promise: n, resolve: e, reject: t };
}
const R = 2, Qe = 4, gt = 8, an = 1 << 24, me = 16, ie = 32, Re = 64, St = 128, U = 512, k = 1024, F = 2048, se = 4096, ne = 8192, re = 16384, Fe = 32768, Kt = 1 << 25, ze = 65536, Gt = 1 << 17, rr = 1 << 18, We = 1 << 19, ir = 1 << 20, Ne = 65536, kt = 1 << 21, jt = 1 << 22, we = 1 << 23, Et = Symbol("$state"), ae = new class extends Error {
  constructor() {
    super(...arguments);
    G(this, "name", "StaleReactionError");
    G(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
function sr() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function lr(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function fr() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function ur(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function ar() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function or() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function cr() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function hr() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function dr() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
const _r = 2, N = Symbol(), vr = "http://www.w3.org/1999/xhtml";
function pr() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function on(e) {
  return e === this.v;
}
let z = null;
function Ke(e) {
  z = e;
}
function cn(e, t = !1, n) {
  z = {
    p: z,
    i: !1,
    c: null,
    e: null,
    s: e,
    x: null,
    r: (
      /** @type {Effect} */
      m
    ),
    l: null
  };
}
function hn(e) {
  var t = (
    /** @type {ComponentContext} */
    z
  ), n = t.e;
  if (n !== null) {
    t.e = null;
    for (var r of n)
      Fn(r);
  }
  return t.i = !0, z = t.p, /** @type {T} */
  {};
}
function dn() {
  return !0;
}
let Me = [];
function wr() {
  var e = Me;
  Me = [], nr(e);
}
function je(e) {
  if (Me.length === 0) {
    var t = Me;
    queueMicrotask(() => {
      t === Me && wr();
    });
  }
  Me.push(e);
}
function _n(e) {
  var t = m;
  if (t === null)
    return p.f |= we, e;
  if ((t.f & Fe) === 0 && (t.f & Qe) === 0)
    throw e;
  pe(e, t);
}
function pe(e, t) {
  for (; t !== null; ) {
    if ((t.f & St) !== 0) {
      if ((t.f & Fe) === 0)
        throw e;
      try {
        t.b.error(e);
        return;
      } catch (n) {
        e = n;
      }
    }
    t = t.parent;
  }
  throw e;
}
const gr = -7169;
function T(e, t) {
  e.f = e.f & gr | t;
}
function Lt(e) {
  (e.f & U) !== 0 || e.deps === null ? T(e, k) : T(e, se);
}
function vn(e) {
  if (e !== null)
    for (const t of e)
      (t.f & R) === 0 || (t.f & Ne) === 0 || (t.f ^= Ne, vn(
        /** @type {Derived} */
        t.deps
      ));
}
function pn(e, t, n) {
  (e.f & F) !== 0 ? t.add(e) : (e.f & se) !== 0 && n.add(e), vn(e.deps), T(e, k);
}
const Ee = /* @__PURE__ */ new Set();
let g = null, C = null, At = null, bt = !1, Pe = null, ut = null;
var Wt = 0;
let mr = 1;
var Le, Ve, qe, Ye, et, j, xe, oe, ce, Be, D, Rt, Nt, Ct, Dt, wn;
const vt = class vt {
  constructor() {
    w(this, D);
    // for debugging. TODO remove once async is stable
    G(this, "id", mr++);
    /**
     * The current values of any sources that are updated in this batch
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Source, any>}
     */
    G(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any sources that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Source, any>}
     */
    G(this, "previous", /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<(batch: Batch) => void>}
     */
    w(this, Le, /* @__PURE__ */ new Set());
    /**
     * If a fork is discarded, we need to destroy any effects that are no longer needed
     * @type {Set<(batch: Batch) => void>}
     */
    w(this, Ve, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    w(this, qe, 0);
    /**
     * The number of async effects that are currently in flight, _not_ inside a pending boundary
     */
    w(this, Ye, 0);
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    w(this, et, null);
    /**
     * The root effects that need to be flushed
     * @type {Effect[]}
     */
    w(this, j, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Set<Effect>}
     */
    w(this, xe, /* @__PURE__ */ new Set());
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Set<Effect>}
     */
    w(this, oe, /* @__PURE__ */ new Set());
    /**
     * A map of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`.
     * The value contains child effects that were dirty/maybe_dirty before being reset,
     * so they can be rescheduled if the branch survives.
     * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
     */
    w(this, ce, /* @__PURE__ */ new Map());
    G(this, "is_fork", !1);
    w(this, Be, !1);
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(t) {
    s(this, ce).has(t) || s(this, ce).set(t, { d: [], m: [] });
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   */
  unskip_effect(t) {
    var n = s(this, ce).get(t);
    if (n) {
      s(this, ce).delete(t);
      for (var r of n.d)
        T(r, F), this.schedule(r);
      for (r of n.m)
        T(r, se), this.schedule(r);
    }
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} old_value
   */
  capture(t, n) {
    n !== N && !this.previous.has(t) && this.previous.set(t, n), (t.f & we) === 0 && (this.current.set(t, t.v), C == null || C.set(t, t.v));
  }
  activate() {
    g = this;
  }
  deactivate() {
    g = null, C = null;
  }
  flush() {
    try {
      bt = !0, g = this, x(this, D, Nt).call(this);
    } finally {
      Wt = 0, At = null, Pe = null, ut = null, bt = !1, g = null, C = null, ge.clear();
    }
  }
  discard() {
    for (const t of s(this, Ve)) t(this);
    s(this, Ve).clear(), Ee.delete(this);
  }
  /**
   *
   * @param {boolean} blocking
   */
  increment(t) {
    v(this, qe, s(this, qe) + 1), t && v(this, Ye, s(this, Ye) + 1);
  }
  /**
   * @param {boolean} blocking
   * @param {boolean} skip - whether to skip updates (because this is triggered by a stale reaction)
   */
  decrement(t, n) {
    v(this, qe, s(this, qe) - 1), t && v(this, Ye, s(this, Ye) - 1), !(s(this, Be) || n) && (v(this, Be, !0), je(() => {
      v(this, Be, !1), this.flush();
    }));
  }
  /**
   * @param {Set<Effect>} dirty_effects
   * @param {Set<Effect>} maybe_dirty_effects
   */
  transfer_effects(t, n) {
    for (const r of t)
      s(this, xe).add(r);
    for (const r of n)
      s(this, oe).add(r);
    t.clear(), n.clear();
  }
  /** @param {(batch: Batch) => void} fn */
  oncommit(t) {
    s(this, Le).add(t);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(t) {
    s(this, Ve).add(t);
  }
  settled() {
    return (s(this, et) ?? v(this, et, un())).promise;
  }
  static ensure() {
    if (g === null) {
      const t = g = new vt();
      bt || (Ee.add(g), je(() => {
        g === t && t.flush();
      }));
    }
    return g;
  }
  apply() {
    {
      C = null;
      return;
    }
  }
  /**
   *
   * @param {Effect} effect
   */
  schedule(t) {
    var i;
    if (At = t, (i = t.b) != null && i.is_pending && (t.f & (Qe | gt | an)) !== 0 && (t.f & Fe) === 0) {
      t.b.defer_effect(t);
      return;
    }
    for (var n = t; n.parent !== null; ) {
      n = n.parent;
      var r = n.f;
      if (Pe !== null && n === m && (p === null || (p.f & R) === 0))
        return;
      if ((r & (Re | ie)) !== 0) {
        if ((r & k) === 0)
          return;
        n.f ^= k;
      }
    }
    s(this, j).push(n);
  }
};
Le = new WeakMap(), Ve = new WeakMap(), qe = new WeakMap(), Ye = new WeakMap(), et = new WeakMap(), j = new WeakMap(), xe = new WeakMap(), oe = new WeakMap(), ce = new WeakMap(), Be = new WeakMap(), D = new WeakSet(), Rt = function() {
  return this.is_fork || s(this, Ye) > 0;
}, Nt = function() {
  var a, u;
  if (Wt++ > 1e3 && (Ee.delete(this), yr()), !x(this, D, Rt).call(this)) {
    for (const f of s(this, xe))
      s(this, oe).delete(f), T(f, F), this.schedule(f);
    for (const f of s(this, oe))
      T(f, se), this.schedule(f);
  }
  const t = s(this, j);
  v(this, j, []), this.apply();
  var n = Pe = [], r = [], i = ut = [];
  for (const f of t)
    try {
      x(this, D, Ct).call(this, f, n, r);
    } catch (c) {
      throw En(f), c;
    }
  if (g = null, i.length > 0) {
    var l = vt.ensure();
    for (const f of i)
      l.schedule(f);
  }
  if (Pe = null, ut = null, x(this, D, Rt).call(this)) {
    x(this, D, Dt).call(this, r), x(this, D, Dt).call(this, n);
    for (const [f, c] of s(this, ce))
      yn(f, c);
  } else {
    s(this, qe) === 0 && Ee.delete(this), s(this, xe).clear(), s(this, oe).clear();
    for (const f of s(this, Le)) f(this);
    s(this, Le).clear(), $t(r), $t(n), (a = s(this, et)) == null || a.resolve();
  }
  var o = (
    /** @type {Batch | null} */
    /** @type {unknown} */
    g
  );
  if (s(this, j).length > 0) {
    const f = o ?? (o = this);
    s(f, j).push(...s(this, j).filter((c) => !s(f, j).includes(c)));
  }
  o !== null && (Ee.add(o), x(u = o, D, Nt).call(u)), Ee.has(this) || x(this, D, wn).call(this);
}, /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 * @param {Effect[]} effects
 * @param {Effect[]} render_effects
 */
Ct = function(t, n, r) {
  t.f ^= k;
  for (var i = t.first; i !== null; ) {
    var l = i.f, o = (l & (ie | Re)) !== 0, a = o && (l & k) !== 0, u = a || (l & ne) !== 0 || s(this, ce).has(i);
    if (!u && i.fn !== null) {
      o ? i.f ^= k : (l & Qe) !== 0 ? n.push(i) : st(i) && ((l & me) !== 0 && s(this, oe).add(i), Ge(i));
      var f = i.first;
      if (f !== null) {
        i = f;
        continue;
      }
    }
    for (; i !== null; ) {
      var c = i.next;
      if (c !== null) {
        i = c;
        break;
      }
      i = i.parent;
    }
  }
}, /**
 * @param {Effect[]} effects
 */
Dt = function(t) {
  for (var n = 0; n < t.length; n += 1)
    pn(t[n], s(this, xe), s(this, oe));
}, wn = function() {
  var u;
  for (const f of Ee) {
    var t = f.id < this.id, n = [];
    for (const [c, _] of this.current) {
      if (f.current.has(c))
        if (t && _ !== f.current.get(c))
          f.current.set(c, _);
        else
          continue;
      n.push(c);
    }
    var r = [...f.current.keys()].filter((c) => !this.current.has(c));
    if (r.length === 0)
      t && f.discard();
    else if (n.length > 0) {
      f.activate();
      var i = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Map();
      for (var o of n)
        gn(o, r, i, l);
      if (s(f, j).length > 0) {
        f.apply();
        for (var a of s(f, j))
          x(u = f, D, Ct).call(u, a, [], []);
        v(f, j, []);
      }
      f.deactivate();
    }
  }
};
let Ce = vt;
function yr() {
  try {
    ar();
  } catch (e) {
    pe(e, At);
  }
}
let W = null;
function $t(e) {
  var t = e.length;
  if (t !== 0) {
    for (var n = 0; n < t; ) {
      var r = e[n++];
      if ((r.f & (re | ne)) === 0 && st(r) && (W = /* @__PURE__ */ new Set(), Ge(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Pn(r), (W == null ? void 0 : W.size) > 0)) {
        ge.clear();
        for (const i of W) {
          if ((i.f & (re | ne)) !== 0) continue;
          const l = [i];
          let o = i.parent;
          for (; o !== null; )
            W.has(o) && (W.delete(o), l.push(o)), o = o.parent;
          for (let a = l.length - 1; a >= 0; a--) {
            const u = l[a];
            (u.f & (re | ne)) === 0 && Ge(u);
          }
        }
        W.clear();
      }
    }
    W = null;
  }
}
function gn(e, t, n, r) {
  if (!n.has(e) && (n.add(e), e.reactions !== null))
    for (const i of e.reactions) {
      const l = i.f;
      (l & R) !== 0 ? gn(
        /** @type {Derived} */
        i,
        t,
        n,
        r
      ) : (l & (jt | me)) !== 0 && (l & F) === 0 && mn(i, t, r) && (T(i, F), Vt(
        /** @type {Effect} */
        i
      ));
    }
}
function mn(e, t, n) {
  const r = n.get(e);
  if (r !== void 0) return r;
  if (e.deps !== null)
    for (const i of e.deps) {
      if (He.call(t, i))
        return !0;
      if ((i.f & R) !== 0 && mn(
        /** @type {Derived} */
        i,
        t,
        n
      ))
        return n.set(
          /** @type {Derived} */
          i,
          !0
        ), !0;
    }
  return n.set(e, !1), !1;
}
function Vt(e) {
  g.schedule(e);
}
function yn(e, t) {
  if (!((e.f & ie) !== 0 && (e.f & k) !== 0)) {
    (e.f & F) !== 0 ? t.d.push(e) : (e.f & se) !== 0 && t.m.push(e), T(e, k);
    for (var n = e.first; n !== null; )
      yn(n, t), n = n.next;
  }
}
function En(e) {
  T(e, k);
  for (var t = e.first; t !== null; )
    En(t), t = t.next;
}
function Er(e) {
  let t = 0, n = mt(0), r;
  return () => {
    Bt() && (te(n), Kr(() => (t === 0 && (r = Xr(() => e(() => Ze(n)))), t += 1, () => {
      je(() => {
        t -= 1, t === 0 && (r == null || r(), r = void 0, Ze(n));
      });
    })));
  };
}
var br = ze | We;
function xr(e, t, n, r) {
  new Tr(e, t, n, r);
}
var B, It, Q, Te, O, X, L, $, he, Se, ve, Ue, tt, nt, de, pt, A, Sr, kr, Ar, Ft, at, ot, Ot;
class Tr {
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(t, n, r, i) {
    w(this, A);
    /** @type {Boundary | null} */
    G(this, "parent");
    G(this, "is_pending", !1);
    /**
     * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
     * Inherited from parent boundary, or defaults to identity.
     * @type {(error: unknown) => unknown}
     */
    G(this, "transform_error");
    /** @type {TemplateNode} */
    w(this, B);
    /** @type {TemplateNode | null} */
    w(this, It, null);
    /** @type {BoundaryProps} */
    w(this, Q);
    /** @type {((anchor: Node) => void)} */
    w(this, Te);
    /** @type {Effect} */
    w(this, O);
    /** @type {Effect | null} */
    w(this, X, null);
    /** @type {Effect | null} */
    w(this, L, null);
    /** @type {Effect | null} */
    w(this, $, null);
    /** @type {DocumentFragment | null} */
    w(this, he, null);
    w(this, Se, 0);
    w(this, ve, 0);
    w(this, Ue, !1);
    /** @type {Set<Effect>} */
    w(this, tt, /* @__PURE__ */ new Set());
    /** @type {Set<Effect>} */
    w(this, nt, /* @__PURE__ */ new Set());
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    w(this, de, null);
    w(this, pt, Er(() => (v(this, de, mt(s(this, Se))), () => {
      v(this, de, null);
    })));
    var l;
    v(this, B, t), v(this, Q, n), v(this, Te, (o) => {
      var a = (
        /** @type {Effect} */
        m
      );
      a.b = this, a.f |= St, r(o);
    }), this.parent = /** @type {Effect} */
    m.b, this.transform_error = i ?? ((l = this.parent) == null ? void 0 : l.transform_error) ?? ((o) => o), v(this, O, On(() => {
      x(this, A, Ft).call(this);
    }, br));
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(t) {
    pn(t, s(this, tt), s(this, nt));
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!s(this, Q).pending;
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  update_pending_count(t, n) {
    x(this, A, Ot).call(this, t, n), v(this, Se, s(this, Se) + t), !(!s(this, de) || s(this, Ue)) && (v(this, Ue, !0), je(() => {
      v(this, Ue, !1), s(this, de) && dt(s(this, de), s(this, Se));
    }));
  }
  get_effect_pending() {
    return s(this, pt).call(this), te(
      /** @type {Source<number>} */
      s(this, de)
    );
  }
  /** @param {unknown} error */
  error(t) {
    var n = s(this, Q).onerror;
    let r = s(this, Q).failed;
    if (!n && !r)
      throw t;
    s(this, X) && (q(s(this, X)), v(this, X, null)), s(this, L) && (q(s(this, L)), v(this, L, null)), s(this, $) && (q(s(this, $)), v(this, $, null));
    var i = !1, l = !1;
    const o = () => {
      if (i) {
        pr();
        return;
      }
      i = !0, l && dr(), s(this, $) !== null && Je(s(this, $), () => {
        v(this, $, null);
      }), x(this, A, ot).call(this, () => {
        x(this, A, Ft).call(this);
      });
    }, a = (u) => {
      try {
        l = !0, n == null || n(u, o), l = !1;
      } catch (f) {
        pe(f, s(this, O) && s(this, O).parent);
      }
      r && v(this, $, x(this, A, ot).call(this, () => {
        try {
          return ue(() => {
            var f = (
              /** @type {Effect} */
              m
            );
            f.b = this, f.f |= St, r(
              s(this, B),
              () => u,
              () => o
            );
          });
        } catch (f) {
          return pe(
            f,
            /** @type {Effect} */
            s(this, O).parent
          ), null;
        }
      }));
    };
    je(() => {
      var u;
      try {
        u = this.transform_error(t);
      } catch (f) {
        pe(f, s(this, O) && s(this, O).parent);
        return;
      }
      u !== null && typeof u == "object" && typeof /** @type {any} */
      u.then == "function" ? u.then(
        a,
        /** @param {unknown} e */
        (f) => pe(f, s(this, O) && s(this, O).parent)
      ) : a(u);
    });
  }
}
B = new WeakMap(), It = new WeakMap(), Q = new WeakMap(), Te = new WeakMap(), O = new WeakMap(), X = new WeakMap(), L = new WeakMap(), $ = new WeakMap(), he = new WeakMap(), Se = new WeakMap(), ve = new WeakMap(), Ue = new WeakMap(), tt = new WeakMap(), nt = new WeakMap(), de = new WeakMap(), pt = new WeakMap(), A = new WeakSet(), Sr = function() {
  try {
    v(this, X, ue(() => s(this, Te).call(this, s(this, B))));
  } catch (t) {
    this.error(t);
  }
}, /**
 * @param {unknown} error The deserialized error from the server's hydration comment
 */
kr = function(t) {
  const n = s(this, Q).failed;
  n && v(this, $, ue(() => {
    n(
      s(this, B),
      () => t,
      () => () => {
      }
    );
  }));
}, Ar = function() {
  const t = s(this, Q).pending;
  t && (this.is_pending = !0, v(this, L, ue(() => t(s(this, B)))), je(() => {
    var n = v(this, he, document.createDocumentFragment()), r = _t();
    n.append(r), v(this, X, x(this, A, ot).call(this, () => ue(() => s(this, Te).call(this, r)))), s(this, ve) === 0 && (s(this, B).before(n), v(this, he, null), Je(
      /** @type {Effect} */
      s(this, L),
      () => {
        v(this, L, null);
      }
    ), x(this, A, at).call(
      this,
      /** @type {Batch} */
      g
    ));
  }));
}, Ft = function() {
  try {
    if (this.is_pending = this.has_pending_snippet(), v(this, ve, 0), v(this, Se, 0), v(this, X, ue(() => {
      s(this, Te).call(this, s(this, B));
    })), s(this, ve) > 0) {
      var t = v(this, he, document.createDocumentFragment());
      Ln(s(this, X), t);
      const n = (
        /** @type {(anchor: Node) => void} */
        s(this, Q).pending
      );
      v(this, L, ue(() => n(s(this, B))));
    } else
      x(this, A, at).call(
        this,
        /** @type {Batch} */
        g
      );
  } catch (n) {
    this.error(n);
  }
}, /**
 * @param {Batch} batch
 */
at = function(t) {
  this.is_pending = !1, t.transfer_effects(s(this, tt), s(this, nt));
}, /**
 * @template T
 * @param {() => T} fn
 */
ot = function(t) {
  var n = m, r = p, i = z;
  le(s(this, O)), K(s(this, O)), Ke(s(this, O).ctx);
  try {
    return Ce.ensure(), t();
  } catch (l) {
    return _n(l), null;
  } finally {
    le(n), K(r), Ke(i);
  }
}, /**
 * Updates the pending count associated with the currently visible pending snippet,
 * if any, such that we can replace the snippet with content once work is done
 * @param {1 | -1} d
 * @param {Batch} batch
 */
Ot = function(t, n) {
  var r;
  if (!this.has_pending_snippet()) {
    this.parent && x(r = this.parent, A, Ot).call(r, t, n);
    return;
  }
  v(this, ve, s(this, ve) + t), s(this, ve) === 0 && (x(this, A, at).call(this, n), s(this, L) && Je(s(this, L), () => {
    v(this, L, null);
  }), s(this, he) && (s(this, B).before(s(this, he)), v(this, he, null)));
};
function Rr(e, t, n, r) {
  const i = Cr;
  var l = e.filter((h) => !h.settled);
  if (n.length === 0 && l.length === 0) {
    r(t.map(i));
    return;
  }
  var o = (
    /** @type {Effect} */
    m
  ), a = Nr(), u = l.length === 1 ? l[0].promise : l.length > 1 ? Promise.all(l.map((h) => h.promise)) : null;
  function f(h) {
    a();
    try {
      r(h);
    } catch (y) {
      (o.f & re) === 0 && pe(y, o);
    }
    ht();
  }
  if (n.length === 0) {
    u.then(() => f(t.map(i)));
    return;
  }
  var c = bn();
  function _() {
    Promise.all(n.map((h) => /* @__PURE__ */ Dr(h))).then((h) => f([...t.map(i), ...h])).catch((h) => pe(h, o)).finally(() => c());
  }
  u ? u.then(() => {
    a(), _(), ht();
  }) : _();
}
function Nr() {
  var e = (
    /** @type {Effect} */
    m
  ), t = p, n = z, r = (
    /** @type {Batch} */
    g
  );
  return function(l = !0) {
    le(e), K(t), Ke(n), l && (e.f & re) === 0 && (r == null || r.activate(), r == null || r.apply());
  };
}
function ht(e = !0) {
  le(null), K(null), Ke(null), e && (g == null || g.deactivate());
}
function bn() {
  var e = (
    /** @type {Boundary} */
    /** @type {Effect} */
    m.b
  ), t = (
    /** @type {Batch} */
    g
  ), n = e.is_rendered();
  return e.update_pending_count(1, t), t.increment(n), (r = !1) => {
    e.update_pending_count(-1, t), t.decrement(n, r);
  };
}
// @__NO_SIDE_EFFECTS__
function Cr(e) {
  var t = R | F, n = p !== null && (p.f & R) !== 0 ? (
    /** @type {Derived} */
    p
  ) : null;
  return m !== null && (m.f |= We), {
    ctx: z,
    deps: null,
    effects: null,
    equals: on,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      N
    ),
    wv: 0,
    parent: n ?? m,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function Dr(e, t, n) {
  let r = (
    /** @type {Effect | null} */
    m
  );
  r === null && sr();
  var i = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), l = mt(
    /** @type {V} */
    N
  ), o = !p, a = /* @__PURE__ */ new Map();
  return zr(() => {
    var y;
    var u = (
      /** @type {Effect} */
      m
    ), f = un();
    i = f.promise;
    try {
      Promise.resolve(e()).then(f.resolve, f.reject).finally(ht);
    } catch (d) {
      f.reject(d), ht();
    }
    var c = (
      /** @type {Batch} */
      g
    );
    if (o) {
      if ((u.f & Fe) !== 0)
        var _ = bn();
      if (
        /** @type {Boundary} */
        r.b.is_rendered()
      )
        (y = a.get(c)) == null || y.reject(ae), a.delete(c);
      else {
        for (const d of a.values())
          d.reject(ae);
        a.clear();
      }
      a.set(c, f);
    }
    const h = (d, E = void 0) => {
      if (_) {
        var b = E === ae;
        _(b);
      }
      if (!(E === ae || (u.f & re) !== 0)) {
        if (c.activate(), E)
          l.f |= we, dt(l, E);
        else {
          (l.f & we) !== 0 && (l.f ^= we), dt(l, d);
          for (const [S, P] of a) {
            if (a.delete(S), S === c) break;
            P.reject(ae);
          }
        }
        c.deactivate();
      }
    };
    f.promise.then(h, (d) => h(null, d || "unknown"));
  }), Br(() => {
    for (const u of a.values())
      u.reject(ae);
  }), new Promise((u) => {
    function f(c) {
      function _() {
        c === i ? u(l) : f(i);
      }
      c.then(_, _);
    }
    f(i);
  });
}
function Fr(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var n = 0; n < t.length; n += 1)
      q(
        /** @type {Effect} */
        t[n]
      );
  }
}
function Or(e) {
  for (var t = e.parent; t !== null; ) {
    if ((t.f & R) === 0)
      return (t.f & re) === 0 ? (
        /** @type {Effect} */
        t
      ) : null;
    t = t.parent;
  }
  return null;
}
function qt(e) {
  var t, n = m;
  le(Or(e));
  try {
    e.f &= ~Ne, Fr(e), t = Bn(e);
  } finally {
    le(n);
  }
  return t;
}
function xn(e) {
  var t = e.v, n = qt(e);
  if (!e.equals(n) && (e.wv = qn(), (!(g != null && g.is_fork) || e.deps === null) && (e.v = n, g == null || g.capture(e, t), e.deps === null))) {
    T(e, k);
    return;
  }
  De || (C !== null ? (Bt() || g != null && g.is_fork) && C.set(e, n) : Lt(e));
}
function Mr(e) {
  var t, n;
  if (e.effects !== null)
    for (const r of e.effects)
      (r.teardown || r.ac) && ((t = r.teardown) == null || t.call(r), (n = r.ac) == null || n.abort(ae), r.teardown = tr, r.ac = null, Xe(r, 0), Ut(r));
}
function Tn(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      t.teardown && Ge(t);
}
let Mt = /* @__PURE__ */ new Set();
const ge = /* @__PURE__ */ new Map();
let Sn = !1;
function mt(e, t) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: on,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function fe(e, t) {
  const n = mt(e);
  return Zr(n), n;
}
function _e(e, t, n = !1) {
  p !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!J || (p.f & Gt) !== 0) && dn() && (p.f & (R | me | jt | Gt)) !== 0 && (H === null || !He.call(H, e)) && hr();
  let r = n ? Ie(t) : t;
  return dt(e, r, ut);
}
function dt(e, t, n = null) {
  if (!e.equals(t)) {
    var r = e.v;
    De ? ge.set(e, t) : ge.set(e, r), e.v = t;
    var i = Ce.ensure();
    if (i.capture(e, r), (e.f & R) !== 0) {
      const l = (
        /** @type {Derived} */
        e
      );
      (e.f & F) !== 0 && qt(l), C === null && Lt(l);
    }
    e.wv = qn(), kn(e, F, n), m !== null && (m.f & k) !== 0 && (m.f & (ie | Re)) === 0 && (Y === null ? Jr([e]) : Y.push(e)), !i.is_fork && Mt.size > 0 && !Sn && Pr();
  }
  return t;
}
function Pr() {
  Sn = !1;
  for (const e of Mt)
    (e.f & k) !== 0 && T(e, se), st(e) && Ge(e);
  Mt.clear();
}
function Ze(e) {
  _e(e, e.v + 1);
}
function kn(e, t, n) {
  var r = e.reactions;
  if (r !== null)
    for (var i = r.length, l = 0; l < i; l++) {
      var o = r[l], a = o.f, u = (a & F) === 0;
      if (u && T(o, t), (a & R) !== 0) {
        var f = (
          /** @type {Derived} */
          o
        );
        C == null || C.delete(f), (a & Ne) === 0 && (a & U && (o.f |= Ne), kn(f, se, n));
      } else if (u) {
        var c = (
          /** @type {Effect} */
          o
        );
        (a & me) !== 0 && W !== null && W.add(c), n !== null ? n.push(c) : Vt(c);
      }
    }
}
function Ie(e) {
  if (typeof e != "object" || e === null || Et in e)
    return e;
  const t = er(e);
  if (t !== Qn && t !== Xn)
    return e;
  var n = /* @__PURE__ */ new Map(), r = Wn(e), i = /* @__PURE__ */ fe(0), l = Ae, o = (a) => {
    if (Ae === l)
      return a();
    var u = p, f = Ae;
    K(null), Xt(l);
    var c = a();
    return K(u), Xt(f), c;
  };
  return r && n.set("length", /* @__PURE__ */ fe(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(a, u, f) {
        (!("value" in f) || f.configurable === !1 || f.enumerable === !1 || f.writable === !1) && or();
        var c = n.get(u);
        return c === void 0 ? o(() => {
          var _ = /* @__PURE__ */ fe(f.value);
          return n.set(u, _), _;
        }) : _e(c, f.value, !0), !0;
      },
      deleteProperty(a, u) {
        var f = n.get(u);
        if (f === void 0) {
          if (u in a) {
            const c = o(() => /* @__PURE__ */ fe(N));
            n.set(u, c), Ze(i);
          }
        } else
          _e(f, N), Ze(i);
        return !0;
      },
      get(a, u, f) {
        var y;
        if (u === Et)
          return e;
        var c = n.get(u), _ = u in a;
        if (c === void 0 && (!_ || (y = $e(a, u)) != null && y.writable) && (c = o(() => {
          var d = Ie(_ ? a[u] : N), E = /* @__PURE__ */ fe(d);
          return E;
        }), n.set(u, c)), c !== void 0) {
          var h = te(c);
          return h === N ? void 0 : h;
        }
        return Reflect.get(a, u, f);
      },
      getOwnPropertyDescriptor(a, u) {
        var f = Reflect.getOwnPropertyDescriptor(a, u);
        if (f && "value" in f) {
          var c = n.get(u);
          c && (f.value = te(c));
        } else if (f === void 0) {
          var _ = n.get(u), h = _ == null ? void 0 : _.v;
          if (_ !== void 0 && h !== N)
            return {
              enumerable: !0,
              configurable: !0,
              value: h,
              writable: !0
            };
        }
        return f;
      },
      has(a, u) {
        var h;
        if (u === Et)
          return !0;
        var f = n.get(u), c = f !== void 0 && f.v !== N || Reflect.has(a, u);
        if (f !== void 0 || m !== null && (!c || (h = $e(a, u)) != null && h.writable)) {
          f === void 0 && (f = o(() => {
            var y = c ? Ie(a[u]) : N, d = /* @__PURE__ */ fe(y);
            return d;
          }), n.set(u, f));
          var _ = te(f);
          if (_ === N)
            return !1;
        }
        return c;
      },
      set(a, u, f, c) {
        var Oe;
        var _ = n.get(u), h = u in a;
        if (r && u === "length")
          for (var y = f; y < /** @type {Source<number>} */
          _.v; y += 1) {
            var d = n.get(y + "");
            d !== void 0 ? _e(d, N) : y in a && (d = o(() => /* @__PURE__ */ fe(N)), n.set(y + "", d));
          }
        if (_ === void 0)
          (!h || (Oe = $e(a, u)) != null && Oe.writable) && (_ = o(() => /* @__PURE__ */ fe(void 0)), _e(_, Ie(f)), n.set(u, _));
        else {
          h = _.v !== N;
          var E = o(() => Ie(f));
          _e(_, E);
        }
        var b = Reflect.getOwnPropertyDescriptor(a, u);
        if (b != null && b.set && b.set.call(c, f), !h) {
          if (r && typeof u == "string") {
            var S = (
              /** @type {Source<number>} */
              n.get("length")
            ), P = Number(u);
            Number.isInteger(P) && P >= S.v && _e(S, P + 1);
          }
          Ze(i);
        }
        return !0;
      },
      ownKeys(a) {
        te(i);
        var u = Reflect.ownKeys(a).filter((_) => {
          var h = n.get(_);
          return h === void 0 || h.v !== N;
        });
        for (var [f, c] of n)
          c.v !== N && !(f in a) && u.push(f);
        return u;
      },
      setPrototypeOf() {
        cr();
      }
    }
  );
}
var Zt, An, Rn, Nn;
function Ir() {
  if (Zt === void 0) {
    Zt = window, An = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, n = Text.prototype;
    Rn = $e(t, "firstChild").get, Nn = $e(t, "nextSibling").get, zt(e) && (e.__click = void 0, e.__className = void 0, e.__attributes = null, e.__style = void 0, e.__e = void 0), zt(n) && (n.__t = void 0);
  }
}
function _t(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function Cn(e) {
  return (
    /** @type {TemplateNode | null} */
    Rn.call(e)
  );
}
// @__NO_SIDE_EFFECTS__
function Yt(e) {
  return (
    /** @type {TemplateNode | null} */
    Nn.call(e)
  );
}
function xt(e, t) {
  return /* @__PURE__ */ Cn(e);
}
function jr(e, t = 1, n = !1) {
  let r = e;
  for (; t--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ Yt(r);
  return r;
}
function Lr() {
  return !1;
}
function Vr(e, t, n) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    document.createElementNS(vr, e, void 0)
  );
}
function Dn(e) {
  var t = p, n = m;
  K(null), le(null);
  try {
    return e();
  } finally {
    K(t), le(n);
  }
}
function qr(e) {
  m === null && (p === null && ur(), fr()), De && lr();
}
function Yr(e, t) {
  var n = t.last;
  n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function ye(e, t) {
  var n = m;
  n !== null && (n.f & ne) !== 0 && (e |= ne);
  var r = {
    ctx: z,
    deps: null,
    nodes: null,
    f: e | F | U,
    first: null,
    fn: t,
    last: null,
    next: null,
    parent: n,
    b: n && n.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null
  }, i = r;
  if ((e & Qe) !== 0)
    Pe !== null ? Pe.push(r) : Ce.ensure().schedule(r);
  else if (t !== null) {
    try {
      Ge(r);
    } catch (o) {
      throw q(r), o;
    }
    i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && // either `null`, or a singular child
    (i.f & We) === 0 && (i = i.first, (e & me) !== 0 && (e & ze) !== 0 && i !== null && (i.f |= ze));
  }
  if (i !== null && (i.parent = n, n !== null && Yr(i, n), p !== null && (p.f & R) !== 0 && (e & Re) === 0)) {
    var l = (
      /** @type {Derived} */
      p
    );
    (l.effects ?? (l.effects = [])).push(i);
  }
  return r;
}
function Bt() {
  return p !== null && !J;
}
function Br(e) {
  const t = ye(gt, null);
  return T(t, k), t.teardown = e, t;
}
function Ur(e) {
  qr();
  var t = (
    /** @type {Effect} */
    m.f
  ), n = !p && (t & ie) !== 0 && (t & Fe) === 0;
  if (n) {
    var r = (
      /** @type {ComponentContext} */
      z
    );
    (r.e ?? (r.e = [])).push(e);
  } else
    return Fn(e);
}
function Fn(e) {
  return ye(Qe | ir, e);
}
function Hr(e) {
  Ce.ensure();
  const t = ye(Re | We, e);
  return (n = {}) => new Promise((r) => {
    n.outro ? Je(t, () => {
      q(t), r(void 0);
    }) : (q(t), r(void 0));
  });
}
function zr(e) {
  return ye(jt | We, e);
}
function Kr(e, t = 0) {
  return ye(gt | t, e);
}
function Jt(e, t = [], n = [], r = []) {
  Rr(r, t, n, (i) => {
    ye(gt, () => e(...i.map(te)));
  });
}
function On(e, t = 0) {
  var n = ye(me | t, e);
  return n;
}
function ue(e) {
  return ye(ie | We, e);
}
function Mn(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = De, r = p;
    Qt(!0), K(null);
    try {
      t.call(null);
    } finally {
      Qt(n), K(r);
    }
  }
}
function Ut(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    const i = n.ac;
    i !== null && Dn(() => {
      i.abort(ae);
    });
    var r = n.next;
    (n.f & Re) !== 0 ? n.parent = null : q(n, t), n = r;
  }
}
function Gr(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    (t.f & ie) === 0 && q(t), t = n;
  }
}
function q(e, t = !0) {
  var n = !1;
  (t || (e.f & rr) !== 0) && e.nodes !== null && e.nodes.end !== null && (Wr(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), n = !0), T(e, Kt), Ut(e, t && !n), Xe(e, 0);
  var r = e.nodes && e.nodes.t;
  if (r !== null)
    for (const l of r)
      l.stop();
  Mn(e), e.f ^= Kt, e.f |= re;
  var i = e.parent;
  i !== null && i.first !== null && Pn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = null;
}
function Wr(e, t) {
  for (; e !== null; ) {
    var n = e === t ? null : /* @__PURE__ */ Yt(e);
    e.remove(), e = n;
  }
}
function Pn(e) {
  var t = e.parent, n = e.prev, r = e.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Je(e, t, n = !0) {
  var r = [];
  In(e, r, !0);
  var i = () => {
    n && q(e), t && t();
  }, l = r.length;
  if (l > 0) {
    var o = () => --l || i();
    for (var a of r)
      a.out(o);
  } else
    i();
}
function In(e, t, n) {
  if ((e.f & ne) === 0) {
    e.f ^= ne;
    var r = e.nodes && e.nodes.t;
    if (r !== null)
      for (const a of r)
        (a.is_global || n) && t.push(a);
    for (var i = e.first; i !== null; ) {
      var l = i.next, o = (i.f & ze) !== 0 || // If this is a branch effect without a block effect parent,
      // it means the parent block effect was pruned. In that case,
      // transparency information was transferred to the branch effect.
      (i.f & ie) !== 0 && (e.f & me) !== 0;
      In(i, t, o ? n : !1), i = l;
    }
  }
}
function $r(e) {
  jn(e, !0);
}
function jn(e, t) {
  if ((e.f & ne) !== 0) {
    e.f ^= ne, (e.f & k) === 0 && (T(e, F), Ce.ensure().schedule(e));
    for (var n = e.first; n !== null; ) {
      var r = n.next, i = (n.f & ze) !== 0 || (n.f & ie) !== 0;
      jn(n, i ? t : !1), n = r;
    }
    var l = e.nodes && e.nodes.t;
    if (l !== null)
      for (const o of l)
        (o.is_global || t) && o.in();
  }
}
function Ln(e, t) {
  if (e.nodes)
    for (var n = e.nodes.start, r = e.nodes.end; n !== null; ) {
      var i = n === r ? null : /* @__PURE__ */ Yt(n);
      t.append(n), n = i;
    }
}
let ct = !1, De = !1;
function Qt(e) {
  De = e;
}
let p = null, J = !1;
function K(e) {
  p = e;
}
let m = null;
function le(e) {
  m = e;
}
let H = null;
function Zr(e) {
  p !== null && (H === null ? H = [e] : H.push(e));
}
let M = null, I = 0, Y = null;
function Jr(e) {
  Y = e;
}
let Vn = 1, be = 0, Ae = be;
function Xt(e) {
  Ae = e;
}
function qn() {
  return ++Vn;
}
function st(e) {
  var t = e.f;
  if ((t & F) !== 0)
    return !0;
  if (t & R && (e.f &= ~Ne), (t & se) !== 0) {
    for (var n = (
      /** @type {Value[]} */
      e.deps
    ), r = n.length, i = 0; i < r; i++) {
      var l = n[i];
      if (st(
        /** @type {Derived} */
        l
      ) && xn(
        /** @type {Derived} */
        l
      ), l.wv > e.wv)
        return !0;
    }
    (t & U) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    C === null && T(e, k);
  }
  return !1;
}
function Yn(e, t, n = !0) {
  var r = e.reactions;
  if (r !== null && !(H !== null && He.call(H, e)))
    for (var i = 0; i < r.length; i++) {
      var l = r[i];
      (l.f & R) !== 0 ? Yn(
        /** @type {Derived} */
        l,
        t,
        !1
      ) : t === l && (n ? T(l, F) : (l.f & k) !== 0 && T(l, se), Vt(
        /** @type {Effect} */
        l
      ));
    }
}
function Bn(e) {
  var E;
  var t = M, n = I, r = Y, i = p, l = H, o = z, a = J, u = Ae, f = e.f;
  M = /** @type {null | Value[]} */
  null, I = 0, Y = null, p = (f & (ie | Re)) === 0 ? e : null, H = null, Ke(e.ctx), J = !1, Ae = ++be, e.ac !== null && (Dn(() => {
    e.ac.abort(ae);
  }), e.ac = null);
  try {
    e.f |= kt;
    var c = (
      /** @type {Function} */
      e.fn
    ), _ = c();
    e.f |= Fe;
    var h = e.deps, y = g == null ? void 0 : g.is_fork;
    if (M !== null) {
      var d;
      if (y || Xe(e, I), h !== null && I > 0)
        for (h.length = I + M.length, d = 0; d < M.length; d++)
          h[I + d] = M[d];
      else
        e.deps = h = M;
      if (Bt() && (e.f & U) !== 0)
        for (d = I; d < h.length; d++)
          ((E = h[d]).reactions ?? (E.reactions = [])).push(e);
    } else !y && h !== null && I < h.length && (Xe(e, I), h.length = I);
    if (dn() && Y !== null && !J && h !== null && (e.f & (R | se | F)) === 0)
      for (d = 0; d < /** @type {Source[]} */
      Y.length; d++)
        Yn(
          Y[d],
          /** @type {Effect} */
          e
        );
    if (i !== null && i !== e) {
      if (be++, i.deps !== null)
        for (let b = 0; b < n; b += 1)
          i.deps[b].rv = be;
      if (t !== null)
        for (const b of t)
          b.rv = be;
      Y !== null && (r === null ? r = Y : r.push(.../** @type {Source[]} */
      Y));
    }
    return (e.f & we) !== 0 && (e.f ^= we), _;
  } catch (b) {
    return _n(b);
  } finally {
    e.f ^= kt, M = t, I = n, Y = r, p = i, H = l, Ke(o), J = a, Ae = u;
  }
}
function Qr(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = $n.call(n, e);
    if (r !== -1) {
      var i = n.length - 1;
      i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
    }
  }
  if (n === null && (t.f & R) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (M === null || !He.call(M, t))) {
    var l = (
      /** @type {Derived} */
      t
    );
    (l.f & U) !== 0 && (l.f ^= U, l.f &= ~Ne), Lt(l), Mr(l), Xe(l, 0);
  }
}
function Xe(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var r = t; r < n.length; r++)
      Qr(e, n[r]);
}
function Ge(e) {
  var t = e.f;
  if ((t & re) === 0) {
    T(e, k);
    var n = m, r = ct;
    m = e, ct = !0;
    try {
      (t & (me | an)) !== 0 ? Gr(e) : Ut(e), Mn(e);
      var i = Bn(e);
      e.teardown = typeof i == "function" ? i : null, e.wv = Vn;
      var l;
    } finally {
      ct = r, m = n;
    }
  }
}
function te(e) {
  var t = e.f, n = (t & R) !== 0;
  if (p !== null && !J) {
    var r = m !== null && (m.f & re) !== 0;
    if (!r && (H === null || !He.call(H, e))) {
      var i = p.deps;
      if ((p.f & kt) !== 0)
        e.rv < be && (e.rv = be, M === null && i !== null && i[I] === e ? I++ : M === null ? M = [e] : M.push(e));
      else {
        (p.deps ?? (p.deps = [])).push(e);
        var l = e.reactions;
        l === null ? e.reactions = [p] : He.call(l, p) || l.push(p);
      }
    }
  }
  if (De && ge.has(e))
    return ge.get(e);
  if (n) {
    var o = (
      /** @type {Derived} */
      e
    );
    if (De) {
      var a = o.v;
      return ((o.f & k) === 0 && o.reactions !== null || Hn(o)) && (a = qt(o)), ge.set(o, a), a;
    }
    var u = (o.f & U) === 0 && !J && p !== null && (ct || (p.f & U) !== 0), f = (o.f & Fe) === 0;
    st(o) && (u && (o.f |= U), xn(o)), u && !f && (Tn(o), Un(o));
  }
  if (C != null && C.has(e))
    return C.get(e);
  if ((e.f & we) !== 0)
    throw e.v;
  return e.v;
}
function Un(e) {
  if (e.f |= U, e.deps !== null)
    for (const t of e.deps)
      (t.reactions ?? (t.reactions = [])).push(e), (t.f & R) !== 0 && (t.f & U) === 0 && (Tn(
        /** @type {Derived} */
        t
      ), Un(
        /** @type {Derived} */
        t
      ));
}
function Hn(e) {
  if (e.v === N) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (ge.has(t) || (t.f & R) !== 0 && Hn(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function Xr(e) {
  var t = J;
  try {
    return J = !0, e();
  } finally {
    J = t;
  }
}
const ei = ["touchstart", "touchmove"];
function ti(e) {
  return ei.includes(e);
}
const lt = Symbol("events"), ni = /* @__PURE__ */ new Set(), en = /* @__PURE__ */ new Set();
let tn = null;
function nn(e) {
  var b, S;
  var t = this, n = (
    /** @type {Node} */
    t.ownerDocument
  ), r = e.type, i = ((b = e.composedPath) == null ? void 0 : b.call(e)) || [], l = (
    /** @type {null | Element} */
    i[0] || e.target
  );
  tn = e;
  var o = 0, a = tn === e && e[lt];
  if (a) {
    var u = i.indexOf(a);
    if (u !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e[lt] = t;
      return;
    }
    var f = i.indexOf(t);
    if (f === -1)
      return;
    u <= f && (o = u);
  }
  if (l = /** @type {Element} */
  i[o] || e.target, l !== t) {
    Jn(e, "currentTarget", {
      configurable: !0,
      get() {
        return l || n;
      }
    });
    var c = p, _ = m;
    K(null), le(null);
    try {
      for (var h, y = []; l !== null; ) {
        var d = l.assignedSlot || l.parentNode || /** @type {any} */
        l.host || null;
        try {
          var E = (S = l[lt]) == null ? void 0 : S[r];
          E != null && (!/** @type {any} */
          l.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === l) && E.call(l, e);
        } catch (P) {
          h ? y.push(P) : h = P;
        }
        if (e.cancelBubble || d === t || d === null)
          break;
        l = d;
      }
      if (h) {
        for (let P of y)
          queueMicrotask(() => {
            throw P;
          });
        throw h;
      }
    } finally {
      e[lt] = t, delete e.currentTarget, K(c), le(_);
    }
  }
}
var ln;
const Tt = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  ((ln = globalThis == null ? void 0 : globalThis.window) == null ? void 0 : ln.trustedTypes) && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (e) => e
  })
);
function ri(e) {
  return (
    /** @type {string} */
    (Tt == null ? void 0 : Tt.createHTML(e)) ?? e
  );
}
function ii(e) {
  var t = Vr("template");
  return t.innerHTML = ri(e.replaceAll("<!>", "<!---->")), t.content;
}
function si(e, t) {
  var n = (
    /** @type {Effect} */
    m
  );
  n.nodes === null && (n.nodes = { start: e, end: t, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function zn(e, t) {
  var n = (t & _r) !== 0, r, i = !e.startsWith("<!>");
  return () => {
    r === void 0 && (r = ii(i ? e : "<!>" + e), r = /** @type {TemplateNode} */
    /* @__PURE__ */ Cn(r));
    var l = (
      /** @type {TemplateNode} */
      n || An ? document.importNode(r, !0) : r.cloneNode(!0)
    );
    return si(l, l), l;
  };
}
function rn(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
function sn(e, t) {
  var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
  n !== (e.__t ?? (e.__t = e.nodeValue)) && (e.__t = n, e.nodeValue = `${n}`);
}
function li(e, t) {
  return fi(e, t);
}
const ft = /* @__PURE__ */ new Map();
function fi(e, { target: t, anchor: n, props: r = {}, events: i, context: l, intro: o = !0, transformError: a }) {
  Ir();
  var u = void 0, f = Hr(() => {
    var c = n ?? t.appendChild(_t());
    xr(
      /** @type {TemplateNode} */
      c,
      {
        pending: () => {
        }
      },
      (y) => {
        cn({});
        var d = (
          /** @type {ComponentContext} */
          z
        );
        l && (d.c = l), i && (r.$$events = i), u = e(y, r) || {}, hn();
      },
      a
    );
    var _ = /* @__PURE__ */ new Set(), h = (y) => {
      for (var d = 0; d < y.length; d++) {
        var E = y[d];
        if (!_.has(E)) {
          _.add(E);
          var b = ti(E);
          for (const Oe of [t, document]) {
            var S = ft.get(Oe);
            S === void 0 && (S = /* @__PURE__ */ new Map(), ft.set(Oe, S));
            var P = S.get(E);
            P === void 0 ? (Oe.addEventListener(E, nn, { passive: b }), S.set(E, 1)) : S.set(E, P + 1);
          }
        }
      }
    };
    return h(Zn(ni)), en.add(h), () => {
      var b;
      for (var y of _)
        for (const S of [t, document]) {
          var d = (
            /** @type {Map<string, number>} */
            ft.get(S)
          ), E = (
            /** @type {number} */
            d.get(y)
          );
          --E == 0 ? (S.removeEventListener(y, nn), d.delete(y), d.size === 0 && ft.delete(S)) : d.set(y, E);
        }
      en.delete(h), c !== n && ((b = c.parentNode) == null || b.removeChild(c));
    };
  });
  return Pt.set(u, f), u;
}
let Pt = /* @__PURE__ */ new WeakMap();
function ui(e, t) {
  const n = Pt.get(e);
  return n ? (Pt.delete(e), n(t)) : Promise.resolve();
}
var Z, ee, V, ke, rt, it, wt;
class ai {
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(t, n = !0) {
    /** @type {TemplateNode} */
    G(this, "anchor");
    /** @type {Map<Batch, Key>} */
    w(this, Z, /* @__PURE__ */ new Map());
    /**
     * Map of keys to effects that are currently rendered in the DOM.
     * These effects are visible and actively part of the document tree.
     * Example:
     * ```
     * {#if condition}
     * 	foo
     * {:else}
     * 	bar
     * {/if}
     * ```
     * Can result in the entries `true->Effect` and `false->Effect`
     * @type {Map<Key, Effect>}
     */
    w(this, ee, /* @__PURE__ */ new Map());
    /**
     * Similar to #onscreen with respect to the keys, but contains branches that are not yet
     * in the DOM, because their insertion is deferred.
     * @type {Map<Key, Branch>}
     */
    w(this, V, /* @__PURE__ */ new Map());
    /**
     * Keys of effects that are currently outroing
     * @type {Set<Key>}
     */
    w(this, ke, /* @__PURE__ */ new Set());
    /**
     * Whether to pause (i.e. outro) on change, or destroy immediately.
     * This is necessary for `<svelte:element>`
     */
    w(this, rt, !0);
    /**
     * @param {Batch} batch
     */
    w(this, it, (t) => {
      if (s(this, Z).has(t)) {
        var n = (
          /** @type {Key} */
          s(this, Z).get(t)
        ), r = s(this, ee).get(n);
        if (r)
          $r(r), s(this, ke).delete(n);
        else {
          var i = s(this, V).get(n);
          i && (s(this, ee).set(n, i.effect), s(this, V).delete(n), i.fragment.lastChild.remove(), this.anchor.before(i.fragment), r = i.effect);
        }
        for (const [l, o] of s(this, Z)) {
          if (s(this, Z).delete(l), l === t)
            break;
          const a = s(this, V).get(o);
          a && (q(a.effect), s(this, V).delete(o));
        }
        for (const [l, o] of s(this, ee)) {
          if (l === n || s(this, ke).has(l)) continue;
          const a = () => {
            if (Array.from(s(this, Z).values()).includes(l)) {
              var f = document.createDocumentFragment();
              Ln(o, f), f.append(_t()), s(this, V).set(l, { effect: o, fragment: f });
            } else
              q(o);
            s(this, ke).delete(l), s(this, ee).delete(l);
          };
          s(this, rt) || !r ? (s(this, ke).add(l), Je(o, a, !1)) : a();
        }
      }
    });
    /**
     * @param {Batch} batch
     */
    w(this, wt, (t) => {
      s(this, Z).delete(t);
      const n = Array.from(s(this, Z).values());
      for (const [r, i] of s(this, V))
        n.includes(r) || (q(i.effect), s(this, V).delete(r));
    });
    this.anchor = t, v(this, rt, n);
  }
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(t, n) {
    var r = (
      /** @type {Batch} */
      g
    ), i = Lr();
    if (n && !s(this, ee).has(t) && !s(this, V).has(t))
      if (i) {
        var l = document.createDocumentFragment(), o = _t();
        l.append(o), s(this, V).set(t, {
          effect: ue(() => n(o)),
          fragment: l
        });
      } else
        s(this, ee).set(
          t,
          ue(() => n(this.anchor))
        );
    if (s(this, Z).set(r, t), i) {
      for (const [a, u] of s(this, ee))
        a === t ? r.unskip_effect(u) : r.skip_effect(u);
      for (const [a, u] of s(this, V))
        a === t ? r.unskip_effect(u.effect) : r.skip_effect(u.effect);
      r.oncommit(s(this, it)), r.ondiscard(s(this, wt));
    } else
      s(this, it).call(this, r);
  }
}
Z = new WeakMap(), ee = new WeakMap(), V = new WeakMap(), ke = new WeakMap(), rt = new WeakMap(), it = new WeakMap(), wt = new WeakMap();
function oi(e, t, n = !1) {
  var r = new ai(e), i = n ? ze : 0;
  function l(o, a) {
    r.ensure(o, a);
  }
  On(() => {
    var o = !1;
    t((a, u = 0) => {
      o = !0, l(u, a);
    }), o || l(-1, null);
  }, i);
}
const ci = "5";
var fn;
typeof window < "u" && ((fn = window.__svelte ?? (window.__svelte = {})).v ?? (fn.v = /* @__PURE__ */ new Set())).add(ci);
var hi = /* @__PURE__ */ zn('<p class="svelte-widget-description"> </p>'), di = /* @__PURE__ */ zn('<section class="svelte-widget-section"><h3 class="svelte-widget-title"> </h3> <!></section>');
function _i(e, t) {
  cn(t, !0);
  let n = /* @__PURE__ */ fe(Ie(t.sdk.getProps()));
  Ur(() => t.sdk.on("propsChanged", (u) => {
    _e(n, u, !0);
  }));
  var r = di(), i = xt(r), l = xt(i), o = jr(i, 2);
  {
    var a = (u) => {
      var f = hi(), c = xt(f);
      Jt(() => sn(c, te(n).description)), rn(u, f);
    };
    oi(o, (u) => {
      te(n).description && u(a);
    });
  }
  Jt(() => sn(l, te(n).title)), rn(e, r), hn();
}
async function wi(e) {
  await e.whenReady();
  const t = li(_i, { target: e.getContainer(), props: { sdk: e } });
  e.on("destroy", () => ui(t));
}
export {
  wi as init
};
