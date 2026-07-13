/**
* @vue/shared v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Je(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const B = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, vt = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], Q = () => {
}, Ss = () => !1, Bt = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), pn = (e) => e.startsWith("onUpdate:"), Y = Object.assign, fo = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Wr = Object.prototype.hasOwnProperty, j = (e, t) => Wr.call(e, t), T = Array.isArray, ct = (e) => kt(e) === "[object Map]", Cs = (e) => kt(e) === "[object Set]", Ko = (e) => kt(e) === "[object Date]", $ = (e) => typeof e == "function", G = (e) => typeof e == "string", Fe = (e) => typeof e == "symbol", L = (e) => e !== null && typeof e == "object", uo = (e) => (L(e) || $(e)) && $(e.then) && $(e.catch), Ts = Object.prototype.toString, kt = (e) => Ts.call(e), ao = (e) => kt(e).slice(8, -1), $s = (e) => kt(e) === "[object Object]", po = (e) => G(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Pt = /* @__PURE__ */ Je(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Br = /* @__PURE__ */ Je(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
), Dn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, kr = /-\w/g, ae = Dn(
  (e) => e.replace(kr, (t) => t.slice(1).toUpperCase())
), qr = /\B([A-Z])/g, tt = Dn(
  (e) => e.replace(qr, "-$1").toLowerCase()
), wn = Dn((e) => e.charAt(0).toUpperCase() + e.slice(1)), rt = Dn(
  (e) => e ? `on${wn(e)}` : ""
), Ae = (e, t) => !Object.is(e, t), xt = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, dn = (e, t, n, o = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: o,
    value: n
  });
}, Gr = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Wo;
const qt = () => Wo || (Wo = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function ho(e) {
  if (T(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n], s = G(o) ? Xr(o) : ho(o);
      if (s)
        for (const r in s)
          t[r] = s[r];
    }
    return t;
  } else if (G(e) || L(e))
    return e;
}
const Jr = /;(?![^(]*\))/g, Yr = /:([^]+)/, zr = /\/\*[^]*?\*\//g;
function Xr(e) {
  const t = {};
  return e.replace(zr, "").split(Jr).forEach((n) => {
    if (n) {
      const o = n.split(Yr);
      o.length > 1 && (t[o[0].trim()] = o[1].trim());
    }
  }), t;
}
function go(e) {
  let t = "";
  if (G(e))
    t = e;
  else if (T(e))
    for (let n = 0; n < e.length; n++) {
      const o = go(e[n]);
      o && (t += o + " ");
    }
  else if (L(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Zr = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", Qr = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", ei = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics", ti = /* @__PURE__ */ Je(Zr), ni = /* @__PURE__ */ Je(Qr), oi = /* @__PURE__ */ Je(ei), si = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", ri = /* @__PURE__ */ Je(si);
function Ps(e) {
  return !!e || e === "";
}
function ii(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let o = 0; n && o < e.length; o++)
    n = mo(e[o], t[o]);
  return n;
}
function mo(e, t) {
  if (e === t) return !0;
  let n = Ko(e), o = Ko(t);
  if (n || o)
    return n && o ? e.getTime() === t.getTime() : !1;
  if (n = Fe(e), o = Fe(t), n || o)
    return e === t;
  if (n = T(e), o = T(t), n || o)
    return n && o ? ii(e, t) : !1;
  if (n = L(e), o = L(t), n || o) {
    if (!n || !o)
      return !1;
    const s = Object.keys(e).length, r = Object.keys(t).length;
    if (s !== r)
      return !1;
    for (const i in e) {
      const c = e.hasOwnProperty(i), f = t.hasOwnProperty(i);
      if (c && !f || !c && f || !mo(e[i], t[i]))
        return !1;
    }
  }
  return String(e) === String(t);
}
const As = (e) => !!(e && e.__v_isRef === !0), qn = (e) => G(e) ? e : e == null ? "" : T(e) || L(e) && (e.toString === Ts || !$(e.toString)) ? As(e) ? qn(e.value) : JSON.stringify(e, Ms, 2) : String(e), Ms = (e, t) => As(t) ? Ms(e, t.value) : ct(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [o, s], r) => (n[In(o, r) + " =>"] = s, n),
    {}
  )
} : Cs(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => In(n))
} : Fe(t) ? In(t) : L(t) && !T(t) && !$s(t) ? String(t) : t, In = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Fe(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function ye(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let ue;
class ci {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.__v_skip = !0, this.parent = ue, !t && ue && (this.index = (ue.scopes || (ue.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].pause();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].resume();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = ue;
      try {
        return ue = this, t();
      } finally {
        ue = n;
      }
    } else process.env.NODE_ENV !== "production" && ye("cannot run an inactive effect scope.");
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = ue, ue = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (ue = this.prevScope, this.prevScope = void 0);
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let n, o;
      for (n = 0, o = this.effects.length; n < o; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, o = this.cleanups.length; n < o; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        for (n = 0, o = this.scopes.length; n < o; n++)
          this.scopes[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop();
        s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function li() {
  return ue;
}
let K;
const Rn = /* @__PURE__ */ new WeakSet();
class Is {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ue && ue.active && ue.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Rn.has(this) && (Rn.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Fs(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Bo(this), js(this);
    const t = K, n = be;
    K = this, be = !0;
    try {
      return this.fn();
    } finally {
      process.env.NODE_ENV !== "production" && K !== this && ye(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), Hs(this), K = t, be = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Eo(t);
      this.deps = this.depsTail = void 0, Bo(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Rn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Gn(this) && this.run();
  }
  get dirty() {
    return Gn(this);
  }
}
let Rs = 0, At, Mt;
function Fs(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Mt, Mt = e;
    return;
  }
  e.next = At, At = e;
}
function _o() {
  Rs++;
}
function vo() {
  if (--Rs > 0)
    return;
  if (Mt) {
    let t = Mt;
    for (Mt = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; At; ) {
    let t = At;
    for (At = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (o) {
          e || (e = o);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function js(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Hs(e) {
  let t, n = e.depsTail, o = n;
  for (; o; ) {
    const s = o.prevDep;
    o.version === -1 ? (o === n && (n = s), Eo(o), fi(o)) : t = o, o.dep.activeLink = o.prevActiveLink, o.prevActiveLink = void 0, o = s;
  }
  e.deps = t, e.depsTail = n;
}
function Gn(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Ls(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Ls(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === jt) || (e.globalVersion = jt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Gn(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = K, o = be;
  K = e, be = !0;
  try {
    js(e);
    const s = e.fn(e._value);
    (t.version === 0 || Ae(s, e._value)) && (e.flags |= 128, e._value = s, t.version++);
  } catch (s) {
    throw t.version++, s;
  } finally {
    K = n, be = o, Hs(e), e.flags &= -3;
  }
}
function Eo(e, t = !1) {
  const { dep: n, prevSub: o, nextSub: s } = e;
  if (o && (o.nextSub = s, e.prevSub = void 0), s && (s.prevSub = o, e.nextSub = void 0), process.env.NODE_ENV !== "production" && n.subsHead === e && (n.subsHead = s), n.subs === e && (n.subs = o, !o && n.computed)) {
    n.computed.flags &= -5;
    for (let r = n.computed.deps; r; r = r.nextDep)
      Eo(r, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function fi(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let be = !0;
const Us = [];
function Oe() {
  Us.push(be), be = !1;
}
function De() {
  const e = Us.pop();
  be = e === void 0 ? !0 : e;
}
function Bo(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = K;
    K = void 0;
    try {
      t();
    } finally {
      K = n;
    }
  }
}
let jt = 0;
class ui {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class No {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0, process.env.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(t) {
    if (!K || !be || K === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== K)
      n = this.activeLink = new ui(K, this), K.deps ? (n.prevDep = K.depsTail, K.depsTail.nextDep = n, K.depsTail = n) : K.deps = K.depsTail = n, Ks(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const o = n.nextDep;
      o.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = o), n.prevDep = K.depsTail, n.nextDep = void 0, K.depsTail.nextDep = n, K.depsTail = n, K.deps === n && (K.deps = o);
    }
    return process.env.NODE_ENV !== "production" && K.onTrack && K.onTrack(
      Y(
        {
          effect: K
        },
        t
      )
    ), n;
  }
  trigger(t) {
    this.version++, jt++, this.notify(t);
  }
  notify(t) {
    _o();
    try {
      if (process.env.NODE_ENV !== "production")
        for (let n = this.subsHead; n; n = n.nextSub)
          n.sub.onTrigger && !(n.sub.flags & 8) && n.sub.onTrigger(
            Y(
              {
                effect: n.sub
              },
              t
            )
          );
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      vo();
    }
  }
}
function Ks(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let o = t.deps; o; o = o.nextDep)
        Ks(o);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), process.env.NODE_ENV !== "production" && e.dep.subsHead === void 0 && (e.dep.subsHead = e), e.dep.subs = e;
  }
}
const Jn = /* @__PURE__ */ new WeakMap(), lt = /* @__PURE__ */ Symbol(
  process.env.NODE_ENV !== "production" ? "Object iterate" : ""
), Yn = /* @__PURE__ */ Symbol(
  process.env.NODE_ENV !== "production" ? "Map keys iterate" : ""
), Ht = /* @__PURE__ */ Symbol(
  process.env.NODE_ENV !== "production" ? "Array iterate" : ""
);
function Z(e, t, n) {
  if (be && K) {
    let o = Jn.get(e);
    o || Jn.set(e, o = /* @__PURE__ */ new Map());
    let s = o.get(n);
    s || (o.set(n, s = new No()), s.map = o, s.key = n), process.env.NODE_ENV !== "production" ? s.track({
      target: e,
      type: t,
      key: n
    }) : s.track();
  }
}
function Me(e, t, n, o, s, r) {
  const i = Jn.get(e);
  if (!i) {
    jt++;
    return;
  }
  const c = (f) => {
    f && (process.env.NODE_ENV !== "production" ? f.trigger({
      target: e,
      type: t,
      key: n,
      newValue: o,
      oldValue: s,
      oldTarget: r
    }) : f.trigger());
  };
  if (_o(), t === "clear")
    i.forEach(c);
  else {
    const f = T(e), d = f && po(n);
    if (f && n === "length") {
      const p = Number(o);
      i.forEach((a, m) => {
        (m === "length" || m === Ht || !Fe(m) && m >= p) && c(a);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && c(i.get(n)), d && c(i.get(Ht)), t) {
        case "add":
          f ? d && c(i.get("length")) : (c(i.get(lt)), ct(e) && c(i.get(Yn)));
          break;
        case "delete":
          f || (c(i.get(lt)), ct(e) && c(i.get(Yn)));
          break;
        case "set":
          ct(e) && c(i.get(lt));
          break;
      }
  }
  vo();
}
function ht(e) {
  const t = /* @__PURE__ */ M(e);
  return t === e ? t : (Z(t, "iterate", Ht), /* @__PURE__ */ pe(e) ? t : t.map(Ge));
}
function bo(e) {
  return Z(e = /* @__PURE__ */ M(e), "iterate", Ht), e;
}
function $e(e, t) {
  return /* @__PURE__ */ je(e) ? Lt(/* @__PURE__ */ ft(e) ? Ge(t) : t) : Ge(t);
}
const ai = {
  __proto__: null,
  [Symbol.iterator]() {
    return Fn(this, Symbol.iterator, (e) => $e(this, e));
  },
  concat(...e) {
    return ht(this).concat(
      ...e.map((t) => T(t) ? ht(t) : t)
    );
  },
  entries() {
    return Fn(this, "entries", (e) => (e[1] = $e(this, e[1]), e));
  },
  every(e, t) {
    return Ue(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Ue(
      this,
      "filter",
      e,
      t,
      (n) => n.map((o) => $e(this, o)),
      arguments
    );
  },
  find(e, t) {
    return Ue(
      this,
      "find",
      e,
      t,
      (n) => $e(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return Ue(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Ue(
      this,
      "findLast",
      e,
      t,
      (n) => $e(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return Ue(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Ue(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return jn(this, "includes", e);
  },
  indexOf(...e) {
    return jn(this, "indexOf", e);
  },
  join(e) {
    return ht(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return jn(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Ue(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Vt(this, "pop");
  },
  push(...e) {
    return Vt(this, "push", e);
  },
  reduce(e, ...t) {
    return ko(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return ko(this, "reduceRight", e, t);
  },
  shift() {
    return Vt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Ue(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Vt(this, "splice", e);
  },
  toReversed() {
    return ht(this).toReversed();
  },
  toSorted(e) {
    return ht(this).toSorted(e);
  },
  toSpliced(...e) {
    return ht(this).toSpliced(...e);
  },
  unshift(...e) {
    return Vt(this, "unshift", e);
  },
  values() {
    return Fn(this, "values", (e) => $e(this, e));
  }
};
function Fn(e, t, n) {
  const o = bo(e), s = o[t]();
  return o !== e && !/* @__PURE__ */ pe(e) && (s._next = s.next, s.next = () => {
    const r = s._next();
    return r.done || (r.value = n(r.value)), r;
  }), s;
}
const pi = Array.prototype;
function Ue(e, t, n, o, s, r) {
  const i = bo(e), c = i !== e && !/* @__PURE__ */ pe(e), f = i[t];
  if (f !== pi[t]) {
    const a = f.apply(e, r);
    return c ? Ge(a) : a;
  }
  let d = n;
  i !== e && (c ? d = function(a, m) {
    return n.call(this, $e(e, a), m, e);
  } : n.length > 2 && (d = function(a, m) {
    return n.call(this, a, m, e);
  }));
  const p = f.call(i, d, o);
  return c && s ? s(p) : p;
}
function ko(e, t, n, o) {
  const s = bo(e), r = s !== e && !/* @__PURE__ */ pe(e);
  let i = n, c = !1;
  s !== e && (r ? (c = o.length === 0, i = function(d, p, a) {
    return c && (c = !1, d = $e(e, d)), n.call(this, d, $e(e, p), a, e);
  }) : n.length > 3 && (i = function(d, p, a) {
    return n.call(this, d, p, a, e);
  }));
  const f = s[t](i, ...o);
  return c ? $e(e, f) : f;
}
function jn(e, t, n) {
  const o = /* @__PURE__ */ M(e);
  Z(o, "iterate", Ht);
  const s = o[t](...n);
  return (s === -1 || s === !1) && /* @__PURE__ */ hn(n[0]) ? (n[0] = /* @__PURE__ */ M(n[0]), o[t](...n)) : s;
}
function Vt(e, t, n = []) {
  Oe(), _o();
  const o = (/* @__PURE__ */ M(e))[t].apply(e, n);
  return vo(), De(), o;
}
const di = /* @__PURE__ */ Je("__proto__,__v_isRef,__isVue"), Ws = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Fe)
);
function hi(e) {
  Fe(e) || (e = String(e));
  const t = /* @__PURE__ */ M(this);
  return Z(t, "has", e), t.hasOwnProperty(e);
}
class Bs {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, o) {
    if (n === "__v_skip") return t.__v_skip;
    const s = this._isReadonly, r = this._isShallow;
    if (n === "__v_isReactive")
      return !s;
    if (n === "__v_isReadonly")
      return s;
    if (n === "__v_isShallow")
      return r;
    if (n === "__v_raw")
      return o === (s ? r ? zs : Ys : r ? Js : Gs).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(o) ? t : void 0;
    const i = T(t);
    if (!s) {
      let f;
      if (i && (f = ai[n]))
        return f;
      if (n === "hasOwnProperty")
        return hi;
    }
    const c = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ z(t) ? t : o
    );
    if ((Fe(n) ? Ws.has(n) : di(n)) || (s || Z(t, "get", n), r))
      return c;
    if (/* @__PURE__ */ z(c)) {
      const f = i && po(n) ? c : c.value;
      return s && L(f) ? /* @__PURE__ */ Xn(f) : f;
    }
    return L(c) ? s ? /* @__PURE__ */ Xn(c) : /* @__PURE__ */ yo(c) : c;
  }
}
class ks extends Bs {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, o, s) {
    let r = t[n];
    const i = T(t) && po(n);
    if (!this._isShallow) {
      const d = /* @__PURE__ */ je(r);
      if (!/* @__PURE__ */ pe(o) && !/* @__PURE__ */ je(o) && (r = /* @__PURE__ */ M(r), o = /* @__PURE__ */ M(o)), !i && /* @__PURE__ */ z(r) && !/* @__PURE__ */ z(o))
        return d ? (process.env.NODE_ENV !== "production" && ye(
          `Set operation on key "${String(n)}" failed: target is readonly.`,
          t[n]
        ), !0) : (r.value = o, !0);
    }
    const c = i ? Number(n) < t.length : j(t, n), f = Reflect.set(
      t,
      n,
      o,
      /* @__PURE__ */ z(t) ? t : s
    );
    return t === /* @__PURE__ */ M(s) && (c ? Ae(o, r) && Me(t, "set", n, o, r) : Me(t, "add", n, o)), f;
  }
  deleteProperty(t, n) {
    const o = j(t, n), s = t[n], r = Reflect.deleteProperty(t, n);
    return r && o && Me(t, "delete", n, void 0, s), r;
  }
  has(t, n) {
    const o = Reflect.has(t, n);
    return (!Fe(n) || !Ws.has(n)) && Z(t, "has", n), o;
  }
  ownKeys(t) {
    return Z(
      t,
      "iterate",
      T(t) ? "length" : lt
    ), Reflect.ownKeys(t);
  }
}
class qs extends Bs {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return process.env.NODE_ENV !== "production" && ye(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return process.env.NODE_ENV !== "production" && ye(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const gi = /* @__PURE__ */ new ks(), mi = /* @__PURE__ */ new qs(), _i = /* @__PURE__ */ new ks(!0), vi = /* @__PURE__ */ new qs(!0), zn = (e) => e, en = (e) => Reflect.getPrototypeOf(e);
function Ei(e, t, n) {
  return function(...o) {
    const s = this.__v_raw, r = /* @__PURE__ */ M(s), i = ct(r), c = e === "entries" || e === Symbol.iterator && i, f = e === "keys" && i, d = s[e](...o), p = n ? zn : t ? Lt : Ge;
    return !t && Z(
      r,
      "iterate",
      f ? Yn : lt
    ), Y(
      // inheriting all iterator properties
      Object.create(d),
      {
        // iterator protocol
        next() {
          const { value: a, done: m } = d.next();
          return m ? { value: a, done: m } : {
            value: c ? [p(a[0]), p(a[1])] : p(a),
            done: m
          };
        }
      }
    );
  };
}
function tn(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      ye(
        `${wn(e)} operation ${n}failed: target is readonly.`,
        /* @__PURE__ */ M(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Ni(e, t) {
  const n = {
    get(s) {
      const r = this.__v_raw, i = /* @__PURE__ */ M(r), c = /* @__PURE__ */ M(s);
      e || (Ae(s, c) && Z(i, "get", s), Z(i, "get", c));
      const { has: f } = en(i), d = t ? zn : e ? Lt : Ge;
      if (f.call(i, s))
        return d(r.get(s));
      if (f.call(i, c))
        return d(r.get(c));
      r !== i && r.get(s);
    },
    get size() {
      const s = this.__v_raw;
      return !e && Z(/* @__PURE__ */ M(s), "iterate", lt), s.size;
    },
    has(s) {
      const r = this.__v_raw, i = /* @__PURE__ */ M(r), c = /* @__PURE__ */ M(s);
      return e || (Ae(s, c) && Z(i, "has", s), Z(i, "has", c)), s === c ? r.has(s) : r.has(s) || r.has(c);
    },
    forEach(s, r) {
      const i = this, c = i.__v_raw, f = /* @__PURE__ */ M(c), d = t ? zn : e ? Lt : Ge;
      return !e && Z(f, "iterate", lt), c.forEach((p, a) => s.call(r, d(p), d(a), i));
    }
  };
  return Y(
    n,
    e ? {
      add: tn("add"),
      set: tn("set"),
      delete: tn("delete"),
      clear: tn("clear")
    } : {
      add(s) {
        const r = /* @__PURE__ */ M(this), i = en(r), c = /* @__PURE__ */ M(s), f = !t && !/* @__PURE__ */ pe(s) && !/* @__PURE__ */ je(s) ? c : s;
        return i.has.call(r, f) || Ae(s, f) && i.has.call(r, s) || Ae(c, f) && i.has.call(r, c) || (r.add(f), Me(r, "add", f, f)), this;
      },
      set(s, r) {
        !t && !/* @__PURE__ */ pe(r) && !/* @__PURE__ */ je(r) && (r = /* @__PURE__ */ M(r));
        const i = /* @__PURE__ */ M(this), { has: c, get: f } = en(i);
        let d = c.call(i, s);
        d ? process.env.NODE_ENV !== "production" && qo(i, c, s) : (s = /* @__PURE__ */ M(s), d = c.call(i, s));
        const p = f.call(i, s);
        return i.set(s, r), d ? Ae(r, p) && Me(i, "set", s, r, p) : Me(i, "add", s, r), this;
      },
      delete(s) {
        const r = /* @__PURE__ */ M(this), { has: i, get: c } = en(r);
        let f = i.call(r, s);
        f ? process.env.NODE_ENV !== "production" && qo(r, i, s) : (s = /* @__PURE__ */ M(s), f = i.call(r, s));
        const d = c ? c.call(r, s) : void 0, p = r.delete(s);
        return f && Me(r, "delete", s, void 0, d), p;
      },
      clear() {
        const s = /* @__PURE__ */ M(this), r = s.size !== 0, i = process.env.NODE_ENV !== "production" ? ct(s) ? new Map(s) : new Set(s) : void 0, c = s.clear();
        return r && Me(
          s,
          "clear",
          void 0,
          void 0,
          i
        ), c;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((s) => {
    n[s] = Ei(s, e, t);
  }), n;
}
function xn(e, t) {
  const n = Ni(e, t);
  return (o, s, r) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? o : Reflect.get(
    j(n, s) && s in o ? n : o,
    s,
    r
  );
}
const bi = {
  get: /* @__PURE__ */ xn(!1, !1)
}, yi = {
  get: /* @__PURE__ */ xn(!1, !0)
}, Oi = {
  get: /* @__PURE__ */ xn(!0, !1)
}, Di = {
  get: /* @__PURE__ */ xn(!0, !0)
};
function qo(e, t, n) {
  const o = /* @__PURE__ */ M(n);
  if (o !== n && t.call(e, o)) {
    const s = ao(e);
    ye(
      `Reactive ${s} contains both the raw and reactive versions of the same object${s === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Gs = /* @__PURE__ */ new WeakMap(), Js = /* @__PURE__ */ new WeakMap(), Ys = /* @__PURE__ */ new WeakMap(), zs = /* @__PURE__ */ new WeakMap();
function wi(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function xi(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : wi(ao(e));
}
// @__NO_SIDE_EFFECTS__
function yo(e) {
  return /* @__PURE__ */ je(e) ? e : Vn(
    e,
    !1,
    gi,
    bi,
    Gs
  );
}
// @__NO_SIDE_EFFECTS__
function Vi(e) {
  return Vn(
    e,
    !1,
    _i,
    yi,
    Js
  );
}
// @__NO_SIDE_EFFECTS__
function Xn(e) {
  return Vn(
    e,
    !0,
    mi,
    Oi,
    Ys
  );
}
// @__NO_SIDE_EFFECTS__
function Ie(e) {
  return Vn(
    e,
    !0,
    vi,
    Di,
    zs
  );
}
function Vn(e, t, n, o, s) {
  if (!L(e))
    return process.env.NODE_ENV !== "production" && ye(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = xi(e);
  if (r === 0)
    return e;
  const i = s.get(e);
  if (i)
    return i;
  const c = new Proxy(
    e,
    r === 2 ? o : n
  );
  return s.set(e, c), c;
}
// @__NO_SIDE_EFFECTS__
function ft(e) {
  return /* @__PURE__ */ je(e) ? /* @__PURE__ */ ft(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function je(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function pe(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function hn(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function M(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ M(t) : e;
}
function Si(e) {
  return !j(e, "__v_skip") && Object.isExtensible(e) && dn(e, "__v_skip", !0), e;
}
const Ge = (e) => L(e) ? /* @__PURE__ */ yo(e) : e, Lt = (e) => L(e) ? /* @__PURE__ */ Xn(e) : e;
// @__NO_SIDE_EFFECTS__
function z(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Ci(e) {
  return Ti(e, !1);
}
function Ti(e, t) {
  return /* @__PURE__ */ z(e) ? e : new $i(e, t);
}
class $i {
  constructor(t, n) {
    this.dep = new No(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ M(t), this._value = n ? t : Ge(t), this.__v_isShallow = n;
  }
  get value() {
    return process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, o = this.__v_isShallow || /* @__PURE__ */ pe(t) || /* @__PURE__ */ je(t);
    t = o ? t : /* @__PURE__ */ M(t), Ae(t, n) && (this._rawValue = t, this._value = o ? t : Ge(t), process.env.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: t,
      oldValue: n
    }) : this.dep.trigger());
  }
}
function Pi(e) {
  return /* @__PURE__ */ z(e) ? e.value : e;
}
const Ai = {
  get: (e, t, n) => t === "__v_raw" ? e : Pi(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const s = e[t];
    return /* @__PURE__ */ z(s) && !/* @__PURE__ */ z(n) ? (s.value = n, !0) : Reflect.set(e, t, n, o);
  }
};
function Xs(e) {
  return /* @__PURE__ */ ft(e) ? e : new Proxy(e, Ai);
}
class Mi {
  constructor(t, n, o) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new No(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = jt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = o;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    K !== this)
      return Fs(this, !0), !0;
    process.env.NODE_ENV;
  }
  get value() {
    const t = process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track();
    return Ls(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter ? this.setter(t) : process.env.NODE_ENV !== "production" && ye("Write operation failed: computed value is readonly");
  }
}
// @__NO_SIDE_EFFECTS__
function Ii(e, t, n = !1) {
  let o, s;
  $(e) ? o = e : (o = e.get, s = e.set);
  const r = new Mi(o, s, n);
  return process.env.NODE_ENV, r;
}
const nn = {}, gn = /* @__PURE__ */ new WeakMap();
let it;
function Ri(e, t = !1, n = it) {
  if (n) {
    let o = gn.get(n);
    o || gn.set(n, o = []), o.push(e);
  } else process.env.NODE_ENV !== "production" && !t && ye(
    "onWatcherCleanup() was called when there was no active watcher to associate with."
  );
}
function Fi(e, t, n = B) {
  const { immediate: o, deep: s, once: r, scheduler: i, augmentJob: c, call: f } = n, d = (S) => {
    (n.onWarn || ye)(
      "Invalid watch source: ",
      S,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, p = (S) => s ? S : /* @__PURE__ */ pe(S) || s === !1 || s === 0 ? et(S, 1) : et(S);
  let a, m, w, P, x = !1, J = !1;
  if (/* @__PURE__ */ z(e) ? (m = () => e.value, x = /* @__PURE__ */ pe(e)) : /* @__PURE__ */ ft(e) ? (m = () => p(e), x = !0) : T(e) ? (J = !0, x = e.some((S) => /* @__PURE__ */ ft(S) || /* @__PURE__ */ pe(S)), m = () => e.map((S) => {
    if (/* @__PURE__ */ z(S))
      return S.value;
    if (/* @__PURE__ */ ft(S))
      return p(S);
    if ($(S))
      return f ? f(S, 2) : S();
    process.env.NODE_ENV !== "production" && d(S);
  })) : $(e) ? t ? m = f ? () => f(e, 2) : e : m = () => {
    if (w) {
      Oe();
      try {
        w();
      } finally {
        De();
      }
    }
    const S = it;
    it = a;
    try {
      return f ? f(e, 3, [P]) : e(P);
    } finally {
      it = S;
    }
  } : (m = Q, process.env.NODE_ENV !== "production" && d(e)), t && s) {
    const S = m, ee = s === !0 ? 1 / 0 : s;
    m = () => et(S(), ee);
  }
  const q = li(), U = () => {
    a.stop(), q && q.active && fo(q.effects, a);
  };
  if (r && t) {
    const S = t;
    t = (...ee) => {
      S(...ee), U();
    };
  }
  let H = J ? new Array(e.length).fill(nn) : nn;
  const de = (S) => {
    if (!(!(a.flags & 1) || !a.dirty && !S))
      if (t) {
        const ee = a.run();
        if (s || x || (J ? ee.some((_e, te) => Ae(_e, H[te])) : Ae(ee, H))) {
          w && w();
          const _e = it;
          it = a;
          try {
            const te = [
              ee,
              // pass undefined as the old value when it's changed for the first time
              H === nn ? void 0 : J && H[0] === nn ? [] : H,
              P
            ];
            H = ee, f ? f(t, 3, te) : (
              // @ts-expect-error
              t(...te)
            );
          } finally {
            it = _e;
          }
        }
      } else
        a.run();
  };
  return c && c(de), a = new Is(m), a.scheduler = i ? () => i(de, !1) : de, P = (S) => Ri(S, !1, a), w = a.onStop = () => {
    const S = gn.get(a);
    if (S) {
      if (f)
        f(S, 4);
      else
        for (const ee of S) ee();
      gn.delete(a);
    }
  }, process.env.NODE_ENV !== "production" && (a.onTrack = n.onTrack, a.onTrigger = n.onTrigger), t ? o ? de(!0) : H = a.run() : i ? i(de.bind(null, !0), !0) : a.run(), U.pause = a.pause.bind(a), U.resume = a.resume.bind(a), U.stop = U, U;
}
function et(e, t = 1 / 0, n) {
  if (t <= 0 || !L(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ z(e))
    et(e.value, t, n);
  else if (T(e))
    for (let o = 0; o < e.length; o++)
      et(e[o], t, n);
  else if (Cs(e) || ct(e))
    e.forEach((o) => {
      et(o, t, n);
    });
  else if ($s(e)) {
    for (const o in e)
      et(e[o], t, n);
    for (const o of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, o) && et(e[o], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const ut = [];
function on(e) {
  ut.push(e);
}
function sn() {
  ut.pop();
}
let Hn = !1;
function y(e, ...t) {
  if (Hn) return;
  Hn = !0, Oe();
  const n = ut.length ? ut[ut.length - 1].component : null, o = n && n.appContext.config.warnHandler, s = ji();
  if (o)
    bt(
      o,
      n,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        e + t.map((r) => {
          var i, c;
          return (c = (i = r.toString) == null ? void 0 : i.call(r)) != null ? c : JSON.stringify(r);
        }).join(""),
        n && n.proxy,
        s.map(
          ({ vnode: r }) => `at <${Xt(n, r.type)}>`
        ).join(`
`),
        s
      ]
    );
  else {
    const r = [`[Vue warn]: ${e}`, ...t];
    s.length && r.push(`
`, ...Hi(s)), console.warn(...r);
  }
  De(), Hn = !1;
}
function ji() {
  let e = ut[ut.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const o = e.component && e.component.parent;
    e = o && o.vnode;
  }
  return t;
}
function Hi(e) {
  const t = [];
  return e.forEach((n, o) => {
    t.push(...o === 0 ? [] : [`
`], ...Li(n));
  }), t;
}
function Li({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", o = e.component ? e.component.parent == null : !1, s = ` at <${Xt(
    e.component,
    e.type,
    o
  )}`, r = ">" + n;
  return e.props ? [s, ...Ui(e.props), r] : [s + r];
}
function Ui(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((o) => {
    t.push(...Zs(o, e[o]));
  }), n.length > 3 && t.push(" ..."), t;
}
function Zs(e, t, n) {
  return G(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : /* @__PURE__ */ z(t) ? (t = Zs(e, /* @__PURE__ */ M(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : $(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = /* @__PURE__ */ M(t), n ? t : [`${e}=`, t]);
}
const Oo = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush",
  15: "component update",
  16: "app unmount cleanup function"
};
function bt(e, t, n, o) {
  try {
    return o ? e(...o) : e();
  } catch (s) {
    Gt(s, t, n);
  }
}
function He(e, t, n, o) {
  if ($(e)) {
    const s = bt(e, t, n, o);
    return s && uo(s) && s.catch((r) => {
      Gt(r, t, n);
    }), s;
  }
  if (T(e)) {
    const s = [];
    for (let r = 0; r < e.length; r++)
      s.push(He(e[r], t, n, o));
    return s;
  } else process.env.NODE_ENV !== "production" && y(
    `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
  );
}
function Gt(e, t, n, o = !0) {
  const s = t ? t.vnode : null, { errorHandler: r, throwUnhandledErrorInProduction: i } = t && t.appContext.config || B;
  if (t) {
    let c = t.parent;
    const f = t.proxy, d = process.env.NODE_ENV !== "production" ? Oo[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; c; ) {
      const p = c.ec;
      if (p) {
        for (let a = 0; a < p.length; a++)
          if (p[a](e, f, d) === !1)
            return;
      }
      c = c.parent;
    }
    if (r) {
      Oe(), bt(r, null, 10, [
        e,
        f,
        d
      ]), De();
      return;
    }
  }
  Ki(e, n, s, o, i);
}
function Ki(e, t, n, o = !0, s = !1) {
  if (process.env.NODE_ENV !== "production") {
    const r = Oo[t];
    if (n && on(n), y(`Unhandled error${r ? ` during execution of ${r}` : ""}`), n && sn(), o)
      throw e;
    console.error(e);
  } else {
    if (s)
      throw e;
    console.error(e);
  }
}
const se = [];
let Te = -1;
const Et = [];
let Qe = null, _t = 0;
const Qs = /* @__PURE__ */ Promise.resolve();
let mn = null;
const Wi = 100;
function Bi(e) {
  const t = mn || Qs;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function ki(e) {
  let t = Te + 1, n = se.length;
  for (; t < n; ) {
    const o = t + n >>> 1, s = se[o], r = Ut(s);
    r < e || r === e && s.flags & 2 ? t = o + 1 : n = o;
  }
  return t;
}
function Sn(e) {
  if (!(e.flags & 1)) {
    const t = Ut(e), n = se[se.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Ut(n) ? se.push(e) : se.splice(ki(t), 0, e), e.flags |= 1, er();
  }
}
function er() {
  mn || (mn = Qs.then(or));
}
function tr(e) {
  T(e) ? Et.push(...e) : Qe && e.id === -1 ? Qe.splice(_t + 1, 0, e) : e.flags & 1 || (Et.push(e), e.flags |= 1), er();
}
function Go(e, t, n = Te + 1) {
  for (process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()); n < se.length; n++) {
    const o = se[n];
    if (o && o.flags & 2) {
      if (e && o.id !== e.uid || process.env.NODE_ENV !== "production" && Do(t, o))
        continue;
      se.splice(n, 1), n--, o.flags & 4 && (o.flags &= -2), o(), o.flags & 4 || (o.flags &= -2);
    }
  }
}
function nr(e) {
  if (Et.length) {
    const t = [...new Set(Et)].sort(
      (n, o) => Ut(n) - Ut(o)
    );
    if (Et.length = 0, Qe) {
      Qe.push(...t);
      return;
    }
    for (Qe = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), _t = 0; _t < Qe.length; _t++) {
      const n = Qe[_t];
      process.env.NODE_ENV !== "production" && Do(e, n) || (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2);
    }
    Qe = null, _t = 0;
  }
}
const Ut = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function or(e) {
  process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map());
  const t = process.env.NODE_ENV !== "production" ? (n) => Do(e, n) : Q;
  try {
    for (Te = 0; Te < se.length; Te++) {
      const n = se[Te];
      if (n && !(n.flags & 8)) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        n.flags & 4 && (n.flags &= -2), bt(
          n,
          n.i,
          n.i ? 15 : 14
        ), n.flags & 4 || (n.flags &= -2);
      }
    }
  } finally {
    for (; Te < se.length; Te++) {
      const n = se[Te];
      n && (n.flags &= -2);
    }
    Te = -1, se.length = 0, nr(e), mn = null, (se.length || Et.length) && or(e);
  }
}
function Do(e, t) {
  const n = e.get(t) || 0;
  if (n > Wi) {
    const o = t.i, s = o && jr(o.type);
    return Gt(
      `Maximum recursive updates exceeded${s ? ` in component <${s}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
      null,
      10
    ), !0;
  }
  return e.set(t, n + 1), !1;
}
let Re = !1;
const rn = /* @__PURE__ */ new Map();
process.env.NODE_ENV !== "production" && (qt().__VUE_HMR_RUNTIME__ = {
  createRecord: Ln(sr),
  rerender: Ln(Ji),
  reload: Ln(Yi)
});
const pt = /* @__PURE__ */ new Map();
function qi(e) {
  const t = e.type.__hmrId;
  let n = pt.get(t);
  n || (sr(t, e.type), n = pt.get(t)), n.instances.add(e);
}
function Gi(e) {
  pt.get(e.type.__hmrId).instances.delete(e);
}
function sr(e, t) {
  return pt.has(e) ? !1 : (pt.set(e, {
    initialDef: _n(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function _n(e) {
  return Hr(e) ? e.__vccOpts : e;
}
function Ji(e, t) {
  const n = pt.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((o) => {
    t && (o.render = t, _n(o.type).render = t), o.renderCache = [], Re = !0, o.job.flags & 8 || o.update(), Re = !1;
  }));
}
function Yi(e, t) {
  const n = pt.get(e);
  if (!n) return;
  t = _n(t), Jo(n.initialDef, t);
  const o = [...n.instances];
  for (let s = 0; s < o.length; s++) {
    const r = o[s], i = _n(r.type);
    let c = rn.get(i);
    c || (i !== n.initialDef && Jo(i, t), rn.set(i, c = /* @__PURE__ */ new Set())), c.add(r), r.appContext.propsCache.delete(r.type), r.appContext.emitsCache.delete(r.type), r.appContext.optionsCache.delete(r.type), r.ceReload ? (c.add(r), r.ceReload(t.styles), c.delete(r)) : r.parent ? Sn(() => {
      r.job.flags & 8 || (Re = !0, r.parent.update(), Re = !1, c.delete(r));
    }) : r.appContext.reload ? r.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    ), r.root.ce && r !== r.root && r.root.ce._removeChildStyle(i);
  }
  tr(() => {
    rn.clear();
  });
}
function Jo(e, t) {
  Y(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Ln(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (o) {
      console.error(o), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
let Ne, Tt = [], Zn = !1;
function Jt(e, ...t) {
  Ne ? Ne.emit(e, ...t) : Zn || Tt.push({ event: e, args: t });
}
function wo(e, t) {
  var n, o;
  Ne = e, Ne ? (Ne.enabled = !0, Tt.forEach(({ event: s, args: r }) => Ne.emit(s, ...r)), Tt = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((o = (n = window.navigator) == null ? void 0 : n.userAgent) != null && o.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((r) => {
    wo(r, t);
  }), setTimeout(() => {
    Ne || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, Zn = !0, Tt = []);
  }, 3e3)) : (Zn = !0, Tt = []);
}
function zi(e, t) {
  Jt("app:init", e, t, {
    Fragment: Pe,
    Text: Yt,
    Comment: me,
    Static: fn
  });
}
function Xi(e) {
  Jt("app:unmount", e);
}
const Zi = /* @__PURE__ */ xo(
  "component:added"
  /* COMPONENT_ADDED */
), rr = /* @__PURE__ */ xo(
  "component:updated"
  /* COMPONENT_UPDATED */
), Qi = /* @__PURE__ */ xo(
  "component:removed"
  /* COMPONENT_REMOVED */
), ec = (e) => {
  Ne && typeof Ne.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !Ne.cleanupBuffer(e) && Qi(e);
};
// @__NO_SIDE_EFFECTS__
function xo(e) {
  return (t) => {
    Jt(
      e,
      t.appContext.app,
      t.uid,
      t.parent ? t.parent.uid : void 0,
      t
    );
  };
}
const tc = /* @__PURE__ */ ir(
  "perf:start"
  /* PERFORMANCE_START */
), nc = /* @__PURE__ */ ir(
  "perf:end"
  /* PERFORMANCE_END */
);
function ir(e) {
  return (t, n, o) => {
    Jt(e, t.appContext.app, t.uid, t, n, o);
  };
}
function oc(e, t, n) {
  Jt(
    "component:emit",
    e.appContext.app,
    e,
    t,
    n
  );
}
let he = null, cr = null;
function vn(e) {
  const t = he;
  return he = e, cr = e && e.type.__scopeId || null, t;
}
function sc(e, t = he, n) {
  if (!t || e._n)
    return e;
  const o = (...s) => {
    o._d && fs(-1);
    const r = vn(t);
    let i;
    try {
      i = e(...s);
    } finally {
      vn(r), o._d && fs(1);
    }
    return process.env.NODE_ENV !== "production" && rr(t), i;
  };
  return o._n = !0, o._c = !0, o._d = !0, o;
}
function lr(e) {
  Br(e) && y("Do not use built-in directive ids as custom directive id: " + e);
}
function ot(e, t, n, o) {
  const s = e.dirs, r = t && t.dirs;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    r && (c.oldValue = r[i].value);
    let f = c.dir[o];
    f && (Oe(), He(f, n, 8, [
      e.el,
      c,
      e,
      t
    ]), De());
  }
}
function rc(e, t) {
  if (process.env.NODE_ENV !== "production" && (!X || X.isMounted) && y("provide() can only be used inside setup()."), X) {
    let n = X.provides;
    const o = X.parent && X.parent.provides;
    o === n && (n = X.provides = Object.create(o)), n[e] = t;
  }
}
function cn(e, t, n = !1) {
  const o = Ir();
  if (o || Nt) {
    let s = Nt ? Nt._context.provides : o ? o.parent == null || o.ce ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides : void 0;
    if (s && e in s)
      return s[e];
    if (arguments.length > 1)
      return n && $(t) ? t.call(o && o.proxy) : t;
    process.env.NODE_ENV !== "production" && y(`injection "${String(e)}" not found.`);
  } else process.env.NODE_ENV !== "production" && y("inject() can only be used inside setup() or functional components.");
}
const ic = /* @__PURE__ */ Symbol.for("v-scx"), cc = () => {
  {
    const e = cn(ic);
    return e || process.env.NODE_ENV !== "production" && y(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function Un(e, t, n) {
  return process.env.NODE_ENV !== "production" && !$(t) && y(
    "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
  ), fr(e, t, n);
}
function fr(e, t, n = B) {
  const { immediate: o, deep: s, flush: r, once: i } = n;
  process.env.NODE_ENV !== "production" && !t && (o !== void 0 && y(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), s !== void 0 && y(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), i !== void 0 && y(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const c = Y({}, n);
  process.env.NODE_ENV !== "production" && (c.onWarn = y);
  const f = t && o || !t && r !== "post";
  let d;
  if (Wt) {
    if (r === "sync") {
      const w = cc();
      d = w.__watcherHandles || (w.__watcherHandles = []);
    } else if (!f) {
      const w = () => {
      };
      return w.stop = Q, w.resume = Q, w.pause = Q, w;
    }
  }
  const p = X;
  c.call = (w, P, x) => He(w, p, P, x);
  let a = !1;
  r === "post" ? c.scheduler = (w) => {
    fe(w, p && p.suspense);
  } : r !== "sync" && (a = !0, c.scheduler = (w, P) => {
    P ? w() : Sn(w);
  }), c.augmentJob = (w) => {
    t && (w.flags |= 4), a && (w.flags |= 2, p && (w.id = p.uid, w.i = p));
  };
  const m = Fi(e, t, c);
  return Wt && (d ? d.push(m) : f && m()), m;
}
function lc(e, t, n) {
  const o = this.proxy, s = G(e) ? e.includes(".") ? ur(o, e) : () => o[e] : e.bind(o, o);
  let r;
  $(t) ? r = t : (r = t.handler, n = t);
  const i = zt(this), c = fr(s, r.bind(o), n);
  return i(), c;
}
function ur(e, t) {
  const n = t.split(".");
  return () => {
    let o = e;
    for (let s = 0; s < n.length && o; s++)
      o = o[n[s]];
    return o;
  };
}
const fc = /* @__PURE__ */ Symbol("_vte"), uc = (e) => e.__isTeleport, ac = /* @__PURE__ */ Symbol("_leaveCb");
function Vo(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Vo(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function pc(e, t) {
  return $(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Y({ name: e.name }, t, { setup: e })
  ) : e;
}
function ar(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const Yo = /* @__PURE__ */ new WeakSet();
function zo(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const En = /* @__PURE__ */ new WeakMap();
function It(e, t, n, o, s = !1) {
  if (T(e)) {
    e.forEach(
      (x, J) => It(
        x,
        t && (T(t) ? t[J] : t),
        n,
        o,
        s
      )
    );
    return;
  }
  if (Rt(o) && !s) {
    o.shapeFlag & 512 && o.type.__asyncResolved && o.component.subTree.component && It(e, t, n, o.component.subTree);
    return;
  }
  const r = o.shapeFlag & 4 ? Ro(o.component) : o.el, i = s ? null : r, { i: c, r: f } = e;
  if (process.env.NODE_ENV !== "production" && !c) {
    y(
      "Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function."
    );
    return;
  }
  const d = t && t.r, p = c.refs === B ? c.refs = {} : c.refs, a = c.setupState, m = /* @__PURE__ */ M(a), w = a === B ? Ss : (x) => process.env.NODE_ENV !== "production" && (j(m, x) && !/* @__PURE__ */ z(m[x]) && y(
    `Template ref "${x}" used on a non-ref value. It will not work in the production build.`
  ), Yo.has(m[x])) || zo(p, x) ? !1 : j(m, x), P = (x, J) => !(process.env.NODE_ENV !== "production" && Yo.has(x) || J && zo(p, J));
  if (d != null && d !== f) {
    if (Xo(t), G(d))
      p[d] = null, w(d) && (a[d] = null);
    else if (/* @__PURE__ */ z(d)) {
      const x = t;
      P(d, x.k) && (d.value = null), x.k && (p[x.k] = null);
    }
  }
  if ($(f))
    bt(f, c, 12, [i, p]);
  else {
    const x = G(f), J = /* @__PURE__ */ z(f);
    if (x || J) {
      const q = () => {
        if (e.f) {
          const U = x ? w(f) ? a[f] : p[f] : P(f) || !e.k ? f.value : p[e.k];
          if (s)
            T(U) && fo(U, r);
          else if (T(U))
            U.includes(r) || U.push(r);
          else if (x)
            p[f] = [r], w(f) && (a[f] = p[f]);
          else {
            const H = [r];
            P(f, e.k) && (f.value = H), e.k && (p[e.k] = H);
          }
        } else x ? (p[f] = i, w(f) && (a[f] = i)) : J ? (P(f, e.k) && (f.value = i), e.k && (p[e.k] = i)) : process.env.NODE_ENV !== "production" && y("Invalid template ref type:", f, `(${typeof f})`);
      };
      if (i) {
        const U = () => {
          q(), En.delete(e);
        };
        U.id = -1, En.set(e, U), fe(U, n);
      } else
        Xo(e), q();
    } else process.env.NODE_ENV !== "production" && y("Invalid template ref type:", f, `(${typeof f})`);
  }
}
function Xo(e) {
  const t = En.get(e);
  t && (t.flags |= 8, En.delete(e));
}
qt().requestIdleCallback;
qt().cancelIdleCallback;
const Rt = (e) => !!e.type.__asyncLoader, So = (e) => e.type.__isKeepAlive;
function dc(e, t) {
  pr(e, "a", t);
}
function hc(e, t) {
  pr(e, "da", t);
}
function pr(e, t, n = X) {
  const o = e.__wdc || (e.__wdc = () => {
    let s = n;
    for (; s; ) {
      if (s.isDeactivated)
        return;
      s = s.parent;
    }
    return e();
  });
  if (Cn(t, o, n), n) {
    let s = n.parent;
    for (; s && s.parent; )
      So(s.parent.vnode) && gc(o, t, n, s), s = s.parent;
  }
}
function gc(e, t, n, o) {
  const s = Cn(
    t,
    e,
    o,
    !0
    /* prepend */
  );
  Co(() => {
    fo(o[t], s);
  }, n);
}
function Cn(e, t, n = X, o = !1) {
  if (n) {
    const s = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...i) => {
      Oe();
      const c = zt(n), f = He(t, n, e, i);
      return c(), De(), f;
    });
    return o ? s.unshift(r) : s.push(r), r;
  } else if (process.env.NODE_ENV !== "production") {
    const s = rt(Oo[e].replace(/ hook$/, ""));
    y(
      `${s} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const Ye = (e) => (t, n = X) => {
  (!Wt || e === "sp") && Cn(e, (...o) => t(...o), n);
}, mc = Ye("bm"), _c = Ye("m"), vc = Ye(
  "bu"
), Ec = Ye("u"), Nc = Ye(
  "bum"
), Co = Ye("um"), bc = Ye(
  "sp"
), yc = Ye("rtg"), Oc = Ye("rtc");
function Dc(e, t = X) {
  Cn("ec", e, t);
}
const wc = /* @__PURE__ */ Symbol.for("v-ndc"), Qn = (e) => e ? Rr(e) ? Ro(e) : Qn(e.parent) : null, at = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Y(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Ie(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Ie(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Ie(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Ie(e.refs) : e.refs,
    $parent: (e) => Qn(e.parent),
    $root: (e) => Qn(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => gr(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Sn(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Bi.bind(e.proxy)),
    $watch: (e) => lc.bind(e)
  })
), To = (e) => e === "_" || e === "$", Kn = (e, t) => e !== B && !e.__isScriptSetup && j(e, t), dr = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: o, data: s, props: r, accessCache: i, type: c, appContext: f } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    if (t[0] !== "$") {
      const m = i[t];
      if (m !== void 0)
        switch (m) {
          case 1:
            return o[t];
          case 2:
            return s[t];
          case 4:
            return n[t];
          case 3:
            return r[t];
        }
      else {
        if (Kn(o, t))
          return i[t] = 1, o[t];
        if (s !== B && j(s, t))
          return i[t] = 2, s[t];
        if (j(r, t))
          return i[t] = 3, r[t];
        if (n !== B && j(n, t))
          return i[t] = 4, n[t];
        eo && (i[t] = 0);
      }
    }
    const d = at[t];
    let p, a;
    if (d)
      return t === "$attrs" ? (Z(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && bn()) : process.env.NODE_ENV !== "production" && t === "$slots" && Z(e, "get", t), d(e);
    if (
      // css module (injected by vue-loader)
      (p = c.__cssModules) && (p = p[t])
    )
      return p;
    if (n !== B && j(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      a = f.config.globalProperties, j(a, t)
    )
      return a[t];
    process.env.NODE_ENV !== "production" && he && (!G(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (s !== B && To(t[0]) && j(s, t) ? y(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === he && y(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: o, setupState: s, ctx: r } = e;
    return Kn(s, t) ? (s[t] = n, !0) : process.env.NODE_ENV !== "production" && s.__isScriptSetup && j(s, t) ? (y(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : o !== B && j(o, t) ? (o[t] = n, !0) : j(e.props, t) ? (process.env.NODE_ENV !== "production" && y(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && y(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(r, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : r[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: o, appContext: s, props: r, type: i }
  }, c) {
    let f;
    return !!(n[c] || e !== B && c[0] !== "$" && j(e, c) || Kn(t, c) || j(r, c) || j(o, c) || j(at, c) || j(s.config.globalProperties, c) || (f = i.__cssModules) && f[c]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : j(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (dr.ownKeys = (e) => (y(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function xc(e) {
  const t = {};
  return Object.defineProperty(t, "_", {
    configurable: !0,
    enumerable: !1,
    get: () => e
  }), Object.keys(at).forEach((n) => {
    Object.defineProperty(t, n, {
      configurable: !0,
      enumerable: !1,
      get: () => at[n](e),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: Q
    });
  }), t;
}
function Vc(e) {
  const {
    ctx: t,
    propsOptions: [n]
  } = e;
  n && Object.keys(n).forEach((o) => {
    Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[o],
      set: Q
    });
  });
}
function Sc(e) {
  const { ctx: t, setupState: n } = e;
  Object.keys(/* @__PURE__ */ M(n)).forEach((o) => {
    if (!n.__isScriptSetup) {
      if (To(o[0])) {
        y(
          `setup() return property ${JSON.stringify(
            o
          )} should not start with "$" or "_" which are reserved prefixes for Vue internals.`
        );
        return;
      }
      Object.defineProperty(t, o, {
        enumerable: !0,
        configurable: !0,
        get: () => n[o],
        set: Q
      });
    }
  });
}
function Zo(e) {
  return T(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function Cc() {
  const e = /* @__PURE__ */ Object.create(null);
  return (t, n) => {
    e[n] ? y(`${t} property "${n}" is already defined in ${e[n]}.`) : e[n] = t;
  };
}
let eo = !0;
function Tc(e) {
  const t = gr(e), n = e.proxy, o = e.ctx;
  eo = !1, t.beforeCreate && Qo(t.beforeCreate, e, "bc");
  const {
    // state
    data: s,
    computed: r,
    methods: i,
    watch: c,
    provide: f,
    inject: d,
    // lifecycle
    created: p,
    beforeMount: a,
    mounted: m,
    beforeUpdate: w,
    updated: P,
    activated: x,
    deactivated: J,
    beforeDestroy: q,
    beforeUnmount: U,
    destroyed: H,
    unmounted: de,
    render: S,
    renderTracked: ee,
    renderTriggered: _e,
    errorCaptured: te,
    serverPrefetch: re,
    // public API
    expose: Le,
    inheritAttrs: ze,
    // assets
    components: ve,
    directives: Zt,
    filters: Fo
  } = t, Xe = process.env.NODE_ENV !== "production" ? Cc() : null;
  if (process.env.NODE_ENV !== "production") {
    const [R] = e.propsOptions;
    if (R)
      for (const I in R)
        Xe("Props", I);
  }
  if (d && $c(d, o, Xe), i)
    for (const R in i) {
      const I = i[R];
      $(I) ? (process.env.NODE_ENV !== "production" ? Object.defineProperty(o, R, {
        value: I.bind(n),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }) : o[R] = I.bind(n), process.env.NODE_ENV !== "production" && Xe("Methods", R)) : process.env.NODE_ENV !== "production" && y(
        `Method "${R}" has type "${typeof I}" in the component definition. Did you reference the function correctly?`
      );
    }
  if (s) {
    process.env.NODE_ENV !== "production" && !$(s) && y(
      "The data option must be a function. Plain object usage is no longer supported."
    );
    const R = s.call(n, n);
    if (process.env.NODE_ENV !== "production" && uo(R) && y(
      "data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."
    ), !L(R))
      process.env.NODE_ENV !== "production" && y("data() should return an object.");
    else if (e.data = /* @__PURE__ */ yo(R), process.env.NODE_ENV !== "production")
      for (const I in R)
        Xe("Data", I), To(I[0]) || Object.defineProperty(o, I, {
          configurable: !0,
          enumerable: !0,
          get: () => R[I],
          set: Q
        });
  }
  if (eo = !0, r)
    for (const R in r) {
      const I = r[R], we = $(I) ? I.bind(n, n) : $(I.get) ? I.get.bind(n, n) : Q;
      process.env.NODE_ENV !== "production" && we === Q && y(`Computed property "${R}" has no getter.`);
      const Pn = !$(I) && $(I.set) ? I.set.bind(n) : process.env.NODE_ENV !== "production" ? () => {
        y(
          `Write operation failed: computed property "${R}" is readonly.`
        );
      } : Q, yt = Vl({
        get: we,
        set: Pn
      });
      Object.defineProperty(o, R, {
        enumerable: !0,
        configurable: !0,
        get: () => yt.value,
        set: (dt) => yt.value = dt
      }), process.env.NODE_ENV !== "production" && Xe("Computed", R);
    }
  if (c)
    for (const R in c)
      hr(c[R], o, n, R);
  if (f) {
    const R = $(f) ? f.call(n) : f;
    Reflect.ownKeys(R).forEach((I) => {
      rc(I, R[I]);
    });
  }
  p && Qo(p, e, "c");
  function ie(R, I) {
    T(I) ? I.forEach((we) => R(we.bind(n))) : I && R(I.bind(n));
  }
  if (ie(mc, a), ie(_c, m), ie(vc, w), ie(Ec, P), ie(dc, x), ie(hc, J), ie(Dc, te), ie(Oc, ee), ie(yc, _e), ie(Nc, U), ie(Co, de), ie(bc, re), T(Le))
    if (Le.length) {
      const R = e.exposed || (e.exposed = {});
      Le.forEach((I) => {
        Object.defineProperty(R, I, {
          get: () => n[I],
          set: (we) => n[I] = we,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  S && e.render === Q && (e.render = S), ze != null && (e.inheritAttrs = ze), ve && (e.components = ve), Zt && (e.directives = Zt), re && ar(e);
}
function $c(e, t, n = Q) {
  T(e) && (e = to(e));
  for (const o in e) {
    const s = e[o];
    let r;
    L(s) ? "default" in s ? r = cn(
      s.from || o,
      s.default,
      !0
    ) : r = cn(s.from || o) : r = cn(s), /* @__PURE__ */ z(r) ? Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (i) => r.value = i
    }) : t[o] = r, process.env.NODE_ENV !== "production" && n("Inject", o);
  }
}
function Qo(e, t, n) {
  He(
    T(e) ? e.map((o) => o.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function hr(e, t, n, o) {
  let s = o.includes(".") ? ur(n, o) : () => n[o];
  if (G(e)) {
    const r = t[e];
    $(r) ? Un(s, r) : process.env.NODE_ENV !== "production" && y(`Invalid watch handler specified by key "${e}"`, r);
  } else if ($(e))
    Un(s, e.bind(n));
  else if (L(e))
    if (T(e))
      e.forEach((r) => hr(r, t, n, o));
    else {
      const r = $(e.handler) ? e.handler.bind(n) : t[e.handler];
      $(r) ? Un(s, r, e) : process.env.NODE_ENV !== "production" && y(`Invalid watch handler specified by key "${e.handler}"`, r);
    }
  else process.env.NODE_ENV !== "production" && y(`Invalid watch option: "${o}"`, e);
}
function gr(e) {
  const t = e.type, { mixins: n, extends: o } = t, {
    mixins: s,
    optionsCache: r,
    config: { optionMergeStrategies: i }
  } = e.appContext, c = r.get(t);
  let f;
  return c ? f = c : !s.length && !n && !o ? f = t : (f = {}, s.length && s.forEach(
    (d) => Nn(f, d, i, !0)
  ), Nn(f, t, i)), L(t) && r.set(t, f), f;
}
function Nn(e, t, n, o = !1) {
  const { mixins: s, extends: r } = t;
  r && Nn(e, r, n, !0), s && s.forEach(
    (i) => Nn(e, i, n, !0)
  );
  for (const i in t)
    if (o && i === "expose")
      process.env.NODE_ENV !== "production" && y(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const c = Pc[i] || n && n[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const Pc = {
  data: es,
  props: ts,
  emits: ts,
  // objects
  methods: $t,
  computed: $t,
  // lifecycle
  beforeCreate: oe,
  created: oe,
  beforeMount: oe,
  mounted: oe,
  beforeUpdate: oe,
  updated: oe,
  beforeDestroy: oe,
  beforeUnmount: oe,
  destroyed: oe,
  unmounted: oe,
  activated: oe,
  deactivated: oe,
  errorCaptured: oe,
  serverPrefetch: oe,
  // assets
  components: $t,
  directives: $t,
  // watch
  watch: Mc,
  // provide / inject
  provide: es,
  inject: Ac
};
function es(e, t) {
  return t ? e ? function() {
    return Y(
      $(e) ? e.call(this, this) : e,
      $(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Ac(e, t) {
  return $t(to(e), to(t));
}
function to(e) {
  if (T(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function oe(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function $t(e, t) {
  return e ? Y(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ts(e, t) {
  return e ? T(e) && T(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Y(
    /* @__PURE__ */ Object.create(null),
    Zo(e),
    Zo(t ?? {})
  ) : t;
}
function Mc(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Y(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    n[o] = oe(e[o], t[o]);
  return n;
}
function mr() {
  return {
    app: null,
    config: {
      isNativeTag: Ss,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let Ic = 0;
function Rc(e, t) {
  return function(o, s = null) {
    $(o) || (o = Y({}, o)), s != null && !L(s) && (process.env.NODE_ENV !== "production" && y("root props passed to app.mount() must be an object."), s = null);
    const r = mr(), i = /* @__PURE__ */ new WeakSet(), c = [];
    let f = !1;
    const d = r.app = {
      _uid: Ic++,
      _component: o,
      _props: s,
      _container: null,
      _context: r,
      _instance: null,
      version: hs,
      get config() {
        return r.config;
      },
      set config(p) {
        process.env.NODE_ENV !== "production" && y(
          "app.config cannot be replaced. Modify individual options instead."
        );
      },
      use(p, ...a) {
        return i.has(p) ? process.env.NODE_ENV !== "production" && y("Plugin has already been applied to target app.") : p && $(p.install) ? (i.add(p), p.install(d, ...a)) : $(p) ? (i.add(p), p(d, ...a)) : process.env.NODE_ENV !== "production" && y(
          'A plugin must either be a function or an object with an "install" function.'
        ), d;
      },
      mixin(p) {
        return r.mixins.includes(p) ? process.env.NODE_ENV !== "production" && y(
          "Mixin has already been applied to target app" + (p.name ? `: ${p.name}` : "")
        ) : r.mixins.push(p), d;
      },
      component(p, a) {
        return process.env.NODE_ENV !== "production" && co(p, r.config), a ? (process.env.NODE_ENV !== "production" && r.components[p] && y(`Component "${p}" has already been registered in target app.`), r.components[p] = a, d) : r.components[p];
      },
      directive(p, a) {
        return process.env.NODE_ENV !== "production" && lr(p), a ? (process.env.NODE_ENV !== "production" && r.directives[p] && y(`Directive "${p}" has already been registered in target app.`), r.directives[p] = a, d) : r.directives[p];
      },
      mount(p, a, m) {
        if (f)
          process.env.NODE_ENV !== "production" && y(
            "App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`"
          );
        else {
          process.env.NODE_ENV !== "production" && p.__vue_app__ && y(
            "There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first."
          );
          const w = d._ceVNode || ke(o, s);
          return w.appContext = r, m === !0 ? m = "svg" : m === !1 && (m = void 0), process.env.NODE_ENV !== "production" && (r.reload = () => {
            const P = nt(w);
            P.el = null, e(P, p, m);
          }), e(w, p, m), f = !0, d._container = p, p.__vue_app__ = d, process.env.NODE_ENV !== "production" && (d._instance = w.component, zi(d, hs)), Ro(w.component);
        }
      },
      onUnmount(p) {
        process.env.NODE_ENV !== "production" && typeof p != "function" && y(
          `Expected function as first argument to app.onUnmount(), but got ${typeof p}`
        ), c.push(p);
      },
      unmount() {
        f ? (He(
          c,
          d._instance,
          16
        ), e(null, d._container), process.env.NODE_ENV !== "production" && (d._instance = null, Xi(d)), delete d._container.__vue_app__) : process.env.NODE_ENV !== "production" && y("Cannot unmount an app that is not mounted.");
      },
      provide(p, a) {
        return process.env.NODE_ENV !== "production" && p in r.provides && (j(r.provides, p) ? y(
          `App already provides property with key "${String(p)}". It will be overwritten with the new value.`
        ) : y(
          `App already provides property with key "${String(p)}" inherited from its parent element. It will be overwritten with the new value.`
        )), r.provides[p] = a, d;
      },
      runWithContext(p) {
        const a = Nt;
        Nt = d;
        try {
          return p();
        } finally {
          Nt = a;
        }
      }
    };
    return d;
  };
}
let Nt = null;
const Fc = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${ae(t)}Modifiers`] || e[`${tt(t)}Modifiers`];
function jc(e, t, ...n) {
  if (e.isUnmounted) return;
  const o = e.vnode.props || B;
  if (process.env.NODE_ENV !== "production") {
    const {
      emitsOptions: p,
      propsOptions: [a]
    } = e;
    if (p)
      if (!(t in p))
        (!a || !(rt(ae(t)) in a)) && y(
          `Component emitted event "${t}" but it is neither declared in the emits option nor as an "${rt(ae(t))}" prop.`
        );
      else {
        const m = p[t];
        $(m) && (m(...n) || y(
          `Invalid event arguments: event validation failed for event "${t}".`
        ));
      }
  }
  let s = n;
  const r = t.startsWith("update:"), i = r && Fc(o, t.slice(7));
  if (i && (i.trim && (s = n.map((p) => G(p) ? p.trim() : p)), i.number && (s = n.map(Gr))), process.env.NODE_ENV !== "production" && oc(e, t, s), process.env.NODE_ENV !== "production") {
    const p = t.toLowerCase();
    p !== t && o[rt(p)] && y(
      `Event "${p}" is emitted in component ${Xt(
        e,
        e.type
      )} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${tt(
        t
      )}" instead of "${t}".`
    );
  }
  let c, f = o[c = rt(t)] || // also try camelCase event handler (#2249)
  o[c = rt(ae(t))];
  !f && r && (f = o[c = rt(tt(t))]), f && He(
    f,
    e,
    6,
    s
  );
  const d = o[c + "Once"];
  if (d) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[c])
      return;
    e.emitted[c] = !0, He(
      d,
      e,
      6,
      s
    );
  }
}
const Hc = /* @__PURE__ */ new WeakMap();
function _r(e, t, n = !1) {
  const o = n ? Hc : t.emitsCache, s = o.get(e);
  if (s !== void 0)
    return s;
  const r = e.emits;
  let i = {}, c = !1;
  if (!$(e)) {
    const f = (d) => {
      const p = _r(d, t, !0);
      p && (c = !0, Y(i, p));
    };
    !n && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  return !r && !c ? (L(e) && o.set(e, null), null) : (T(r) ? r.forEach((f) => i[f] = null) : Y(i, r), L(e) && o.set(e, i), i);
}
function Tn(e, t) {
  return !e || !Bt(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), j(e, t[0].toLowerCase() + t.slice(1)) || j(e, tt(t)) || j(e, t));
}
let no = !1;
function bn() {
  no = !0;
}
function ns(e) {
  const {
    type: t,
    vnode: n,
    proxy: o,
    withProxy: s,
    propsOptions: [r],
    slots: i,
    attrs: c,
    emit: f,
    render: d,
    renderCache: p,
    props: a,
    data: m,
    setupState: w,
    ctx: P,
    inheritAttrs: x
  } = e, J = vn(e);
  let q, U;
  process.env.NODE_ENV !== "production" && (no = !1);
  try {
    if (n.shapeFlag & 4) {
      const S = s || o, ee = process.env.NODE_ENV !== "production" && w.__isScriptSetup ? new Proxy(S, {
        get(_e, te, re) {
          return y(
            `Property '${String(
              te
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(_e, te, re);
        }
      }) : S;
      q = Ee(
        d.call(
          ee,
          S,
          p,
          process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Ie(a) : a,
          w,
          m,
          P
        )
      ), U = c;
    } else {
      const S = t;
      process.env.NODE_ENV !== "production" && c === a && bn(), q = Ee(
        S.length > 1 ? S(
          process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Ie(a) : a,
          process.env.NODE_ENV !== "production" ? {
            get attrs() {
              return bn(), /* @__PURE__ */ Ie(c);
            },
            slots: i,
            emit: f
          } : { attrs: c, slots: i, emit: f }
        ) : S(
          process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Ie(a) : a,
          null
        )
      ), U = t.props ? c : Lc(c);
    }
  } catch (S) {
    Ft.length = 0, Gt(S, e, 1), q = ke(me);
  }
  let H = q, de;
  if (process.env.NODE_ENV !== "production" && q.patchFlag > 0 && q.patchFlag & 2048 && ([H, de] = vr(q)), U && x !== !1) {
    const S = Object.keys(U), { shapeFlag: ee } = H;
    if (S.length) {
      if (ee & 7)
        r && S.some(pn) && (U = Uc(
          U,
          r
        )), H = nt(H, U, !1, !0);
      else if (process.env.NODE_ENV !== "production" && !no && H.type !== me) {
        const _e = Object.keys(c), te = [], re = [];
        for (let Le = 0, ze = _e.length; Le < ze; Le++) {
          const ve = _e[Le];
          Bt(ve) ? pn(ve) || te.push(ve[2].toLowerCase() + ve.slice(3)) : re.push(ve);
        }
        re.length && y(
          `Extraneous non-props attributes (${re.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.`
        ), te.length && y(
          `Extraneous non-emits event listeners (${te.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
        );
      }
    }
  }
  return n.dirs && (process.env.NODE_ENV !== "production" && !os(H) && y(
    "Runtime directive used on component with non-element root node. The directives will not function as intended."
  ), H = nt(H, null, !1, !0), H.dirs = H.dirs ? H.dirs.concat(n.dirs) : n.dirs), n.transition && (process.env.NODE_ENV !== "production" && !os(H) && y(
    "Component inside <Transition> renders non-element root node that cannot be animated."
  ), Vo(H, n.transition)), process.env.NODE_ENV !== "production" && de ? de(H) : q = H, vn(J), q;
}
const vr = (e) => {
  const t = e.children, n = e.dynamicChildren, o = $o(t, !1);
  if (o) {
    if (process.env.NODE_ENV !== "production" && o.patchFlag > 0 && o.patchFlag & 2048)
      return vr(o);
  } else return [e, void 0];
  const s = t.indexOf(o), r = n ? n.indexOf(o) : -1, i = (c) => {
    t[s] = c, n && (r > -1 ? n[r] = c : c.patchFlag > 0 && (e.dynamicChildren = [...n, c]));
  };
  return [Ee(o), i];
};
function $o(e, t = !0) {
  let n;
  for (let o = 0; o < e.length; o++) {
    const s = e[o];
    if ($n(s)) {
      if (s.type !== me || s.children === "v-if") {
        if (n)
          return;
        if (n = s, process.env.NODE_ENV !== "production" && t && n.patchFlag > 0 && n.patchFlag & 2048)
          return $o(n.children);
      }
    } else
      return;
  }
  return n;
}
const Lc = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Bt(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Uc = (e, t) => {
  const n = {};
  for (const o in e)
    (!pn(o) || !(o.slice(9) in t)) && (n[o] = e[o]);
  return n;
}, os = (e) => e.shapeFlag & 7 || e.type === me;
function Kc(e, t, n) {
  const { props: o, children: s, component: r } = e, { props: i, children: c, patchFlag: f } = t, d = r.emitsOptions;
  if (process.env.NODE_ENV !== "production" && (s || c) && Re || t.dirs || t.transition)
    return !0;
  if (n && f >= 0) {
    if (f & 1024)
      return !0;
    if (f & 16)
      return o ? ss(o, i, d) : !!i;
    if (f & 8) {
      const p = t.dynamicProps;
      for (let a = 0; a < p.length; a++) {
        const m = p[a];
        if (Er(i, o, m) && !Tn(d, m))
          return !0;
      }
    }
  } else
    return (s || c) && (!c || !c.$stable) ? !0 : o === i ? !1 : o ? i ? ss(o, i, d) : !0 : !!i;
  return !1;
}
function ss(e, t, n) {
  const o = Object.keys(t);
  if (o.length !== Object.keys(e).length)
    return !0;
  for (let s = 0; s < o.length; s++) {
    const r = o[s];
    if (Er(t, e, r) && !Tn(n, r))
      return !0;
  }
  return !1;
}
function Er(e, t, n) {
  const o = e[n], s = t[n];
  return n === "style" && L(o) && L(s) ? !mo(o, s) : o !== s;
}
function Wc({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.el = e.el), o === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const Nr = {}, br = () => Object.create(Nr), yr = (e) => Object.getPrototypeOf(e) === Nr;
function Bc(e, t, n, o = !1) {
  const s = {}, r = br();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Or(e, t, s, r);
  for (const i in e.propsOptions[0])
    i in s || (s[i] = void 0);
  process.env.NODE_ENV !== "production" && wr(t || {}, s, e), n ? e.props = o ? s : /* @__PURE__ */ Vi(s) : e.type.props ? e.props = s : e.props = r, e.attrs = r;
}
function kc(e) {
  for (; e; ) {
    if (e.type.__hmrId) return !0;
    e = e.parent;
  }
}
function qc(e, t, n, o) {
  const {
    props: s,
    attrs: r,
    vnode: { patchFlag: i }
  } = e, c = /* @__PURE__ */ M(s), [f] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !(process.env.NODE_ENV !== "production" && kc(e)) && (o || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const p = e.vnode.dynamicProps;
      for (let a = 0; a < p.length; a++) {
        let m = p[a];
        if (Tn(e.emitsOptions, m))
          continue;
        const w = t[m];
        if (f)
          if (j(r, m))
            w !== r[m] && (r[m] = w, d = !0);
          else {
            const P = ae(m);
            s[P] = oo(
              f,
              c,
              P,
              w,
              e,
              !1
            );
          }
        else
          w !== r[m] && (r[m] = w, d = !0);
      }
    }
  } else {
    Or(e, t, s, r) && (d = !0);
    let p;
    for (const a in c)
      (!t || // for camelCase
      !j(t, a) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((p = tt(a)) === a || !j(t, p))) && (f ? n && // for camelCase
      (n[a] !== void 0 || // for kebab-case
      n[p] !== void 0) && (s[a] = oo(
        f,
        c,
        a,
        void 0,
        e,
        !0
      )) : delete s[a]);
    if (r !== c)
      for (const a in r)
        (!t || !j(t, a)) && (delete r[a], d = !0);
  }
  d && Me(e.attrs, "set", ""), process.env.NODE_ENV !== "production" && wr(t || {}, s, e);
}
function Or(e, t, n, o) {
  const [s, r] = e.propsOptions;
  let i = !1, c;
  if (t)
    for (let f in t) {
      if (Pt(f))
        continue;
      const d = t[f];
      let p;
      s && j(s, p = ae(f)) ? !r || !r.includes(p) ? n[p] = d : (c || (c = {}))[p] = d : Tn(e.emitsOptions, f) || (!(f in o) || d !== o[f]) && (o[f] = d, i = !0);
    }
  if (r) {
    const f = /* @__PURE__ */ M(n), d = c || B;
    for (let p = 0; p < r.length; p++) {
      const a = r[p];
      n[a] = oo(
        s,
        f,
        a,
        d[a],
        e,
        !j(d, a)
      );
    }
  }
  return i;
}
function oo(e, t, n, o, s, r) {
  const i = e[n];
  if (i != null) {
    const c = j(i, "default");
    if (c && o === void 0) {
      const f = i.default;
      if (i.type !== Function && !i.skipFactory && $(f)) {
        const { propsDefaults: d } = s;
        if (n in d)
          o = d[n];
        else {
          const p = zt(s);
          o = d[n] = f.call(
            null,
            t
          ), p();
        }
      } else
        o = f;
      s.ce && s.ce._setProp(n, o);
    }
    i[
      0
      /* shouldCast */
    ] && (r && !c ? o = !1 : i[
      1
      /* shouldCastTrue */
    ] && (o === "" || o === tt(n)) && (o = !0));
  }
  return o;
}
const Gc = /* @__PURE__ */ new WeakMap();
function Dr(e, t, n = !1) {
  const o = n ? Gc : t.propsCache, s = o.get(e);
  if (s)
    return s;
  const r = e.props, i = {}, c = [];
  let f = !1;
  if (!$(e)) {
    const p = (a) => {
      f = !0;
      const [m, w] = Dr(a, t, !0);
      Y(i, m), w && c.push(...w);
    };
    !n && t.mixins.length && t.mixins.forEach(p), e.extends && p(e.extends), e.mixins && e.mixins.forEach(p);
  }
  if (!r && !f)
    return L(e) && o.set(e, vt), vt;
  if (T(r))
    for (let p = 0; p < r.length; p++) {
      process.env.NODE_ENV !== "production" && !G(r[p]) && y("props must be strings when using array syntax.", r[p]);
      const a = ae(r[p]);
      rs(a) && (i[a] = B);
    }
  else if (r) {
    process.env.NODE_ENV !== "production" && !L(r) && y("invalid props options", r);
    for (const p in r) {
      const a = ae(p);
      if (rs(a)) {
        const m = r[p], w = i[a] = T(m) || $(m) ? { type: m } : Y({}, m), P = w.type;
        let x = !1, J = !0;
        if (T(P))
          for (let q = 0; q < P.length; ++q) {
            const U = P[q], H = $(U) && U.name;
            if (H === "Boolean") {
              x = !0;
              break;
            } else H === "String" && (J = !1);
          }
        else
          x = $(P) && P.name === "Boolean";
        w[
          0
          /* shouldCast */
        ] = x, w[
          1
          /* shouldCastTrue */
        ] = J, (x || j(w, "default")) && c.push(a);
      }
    }
  }
  const d = [i, c];
  return L(e) && o.set(e, d), d;
}
function rs(e) {
  return e[0] !== "$" && !Pt(e) ? !0 : (process.env.NODE_ENV !== "production" && y(`Invalid prop name: "${e}" is a reserved property.`), !1);
}
function Jc(e) {
  return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function wr(e, t, n) {
  const o = /* @__PURE__ */ M(t), s = n.propsOptions[0], r = Object.keys(e).map((i) => ae(i));
  for (const i in s) {
    let c = s[i];
    c != null && Yc(
      i,
      o[i],
      c,
      process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Ie(o) : o,
      !r.includes(i)
    );
  }
}
function Yc(e, t, n, o, s) {
  const { type: r, required: i, validator: c, skipCheck: f } = n;
  if (i && s) {
    y('Missing required prop: "' + e + '"');
    return;
  }
  if (!(t == null && !i)) {
    if (r != null && r !== !0 && !f) {
      let d = !1;
      const p = T(r) ? r : [r], a = [];
      for (let m = 0; m < p.length && !d; m++) {
        const { valid: w, expectedType: P } = Xc(t, p[m]);
        a.push(P || ""), d = w;
      }
      if (!d) {
        y(Zc(e, t, a));
        return;
      }
    }
    c && !c(t, o) && y('Invalid prop: custom validator check failed for prop "' + e + '".');
  }
}
const zc = /* @__PURE__ */ Je(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function Xc(e, t) {
  let n;
  const o = Jc(t);
  if (o === "null")
    n = e === null;
  else if (zc(o)) {
    const s = typeof e;
    n = s === o.toLowerCase(), !n && s === "object" && (n = e instanceof t);
  } else o === "Object" ? n = L(e) : o === "Array" ? n = T(e) : n = e instanceof t;
  return {
    valid: n,
    expectedType: o
  };
}
function Zc(e, t, n) {
  if (n.length === 0)
    return `Prop type [] for prop "${e}" won't match anything. Did you mean to use type Array instead?`;
  let o = `Invalid prop: type check failed for prop "${e}". Expected ${n.map(wn).join(" | ")}`;
  const s = n[0], r = ao(t), i = is(t, s), c = is(t, r);
  return n.length === 1 && cs(s) && !Qc(s, r) && (o += ` with value ${i}`), o += `, got ${r} `, cs(r) && (o += `with value ${c}.`), o;
}
function is(e, t) {
  return t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
function cs(e) {
  return ["string", "number", "boolean"].some((n) => e.toLowerCase() === n);
}
function Qc(...e) {
  return e.some((t) => t.toLowerCase() === "boolean");
}
const Po = (e) => e === "_" || e === "_ctx" || e === "$stable", Ao = (e) => T(e) ? e.map(Ee) : [Ee(e)], el = (e, t, n) => {
  if (t._n)
    return t;
  const o = sc((...s) => (process.env.NODE_ENV !== "production" && X && !(n === null && he) && !(n && n.root !== X.root) && y(
    `Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
  ), Ao(t(...s))), n);
  return o._c = !1, o;
}, xr = (e, t, n) => {
  const o = e._ctx;
  for (const s in e) {
    if (Po(s)) continue;
    const r = e[s];
    if ($(r))
      t[s] = el(s, r, o);
    else if (r != null) {
      process.env.NODE_ENV !== "production" && y(
        `Non-function value encountered for slot "${s}". Prefer function slots for better performance.`
      );
      const i = Ao(r);
      t[s] = () => i;
    }
  }
}, Vr = (e, t) => {
  process.env.NODE_ENV !== "production" && !So(e.vnode) && y(
    "Non-function value encountered for default slot. Prefer function slots for better performance."
  );
  const n = Ao(t);
  e.slots.default = () => n;
}, so = (e, t, n) => {
  for (const o in t)
    (n || !Po(o)) && (e[o] = t[o]);
}, tl = (e, t, n) => {
  const o = e.slots = br();
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (so(o, t, n), n && dn(o, "_", s, !0)) : xr(t, o);
  } else t && Vr(e, t);
}, nl = (e, t, n) => {
  const { vnode: o, slots: s } = e;
  let r = !0, i = B;
  if (o.shapeFlag & 32) {
    const c = t._;
    c ? process.env.NODE_ENV !== "production" && Re ? (so(s, t, n), Me(e, "set", "$slots")) : n && c === 1 ? r = !1 : so(s, t, n) : (r = !t.$stable, xr(t, s)), i = t;
  } else t && (Vr(e, t), i = { default: 1 });
  if (r)
    for (const c in s)
      !Po(c) && i[c] == null && delete s[c];
};
let St, We;
function gt(e, t) {
  e.appContext.config.performance && yn() && We.mark(`vue-${t}-${e.uid}`), process.env.NODE_ENV !== "production" && tc(e, t, yn() ? We.now() : Date.now());
}
function mt(e, t) {
  if (e.appContext.config.performance && yn()) {
    const n = `vue-${t}-${e.uid}`, o = n + ":end", s = `<${Xt(e, e.type)}> ${t}`;
    We.mark(o), We.measure(s, n, o), We.clearMeasures(s), We.clearMarks(n), We.clearMarks(o);
  }
  process.env.NODE_ENV !== "production" && nc(e, t, yn() ? We.now() : Date.now());
}
function yn() {
  return St !== void 0 || (typeof window < "u" && window.performance ? (St = !0, We = window.performance) : St = !1), St;
}
function ol() {
  const e = [];
  if (process.env.NODE_ENV !== "production" && e.length) {
    const t = e.length > 1;
    console.warn(
      `Feature flag${t ? "s" : ""} ${e.join(", ")} ${t ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
    );
  }
}
const fe = ll;
function sl(e) {
  return rl(e);
}
function rl(e, t) {
  ol();
  const n = qt();
  n.__VUE__ = !0, process.env.NODE_ENV !== "production" && wo(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
  const {
    insert: o,
    remove: s,
    patchProp: r,
    createElement: i,
    createText: c,
    createComment: f,
    setText: d,
    setElementText: p,
    parentNode: a,
    nextSibling: m,
    setScopeId: w = Q,
    insertStaticContent: P
  } = e, x = (l, u, h, E = null, g = null, _ = null, O = void 0, b = null, N = process.env.NODE_ENV !== "production" && Re ? !1 : !!u.dynamicChildren) => {
    if (l === u)
      return;
    l && !Ct(l, u) && (E = Qt(l), Ze(l, g, _, !0), l = null), u.patchFlag === -2 && (N = !1, u.dynamicChildren = null);
    const { type: v, ref: C, shapeFlag: D } = u;
    switch (v) {
      case Yt:
        J(l, u, h, E);
        break;
      case me:
        q(l, u, h, E);
        break;
      case fn:
        l == null ? U(u, h, E, O) : process.env.NODE_ENV !== "production" && H(l, u, h, O);
        break;
      case Pe:
        Zt(
          l,
          u,
          h,
          E,
          g,
          _,
          O,
          b,
          N
        );
        break;
      default:
        D & 1 ? ee(
          l,
          u,
          h,
          E,
          g,
          _,
          O,
          b,
          N
        ) : D & 6 ? Fo(
          l,
          u,
          h,
          E,
          g,
          _,
          O,
          b,
          N
        ) : D & 64 || D & 128 ? v.process(
          l,
          u,
          h,
          E,
          g,
          _,
          O,
          b,
          N,
          Dt
        ) : process.env.NODE_ENV !== "production" && y("Invalid VNode type:", v, `(${typeof v})`);
    }
    C != null && g ? It(C, l && l.ref, _, u || l, !u) : C == null && l && l.ref != null && It(l.ref, null, _, l, !0);
  }, J = (l, u, h, E) => {
    if (l == null)
      o(
        u.el = c(u.children),
        h,
        E
      );
    else {
      const g = u.el = l.el;
      u.children !== l.children && d(g, u.children);
    }
  }, q = (l, u, h, E) => {
    l == null ? o(
      u.el = f(u.children || ""),
      h,
      E
    ) : u.el = l.el;
  }, U = (l, u, h, E) => {
    [l.el, l.anchor] = P(
      l.children,
      u,
      h,
      E,
      l.el,
      l.anchor
    );
  }, H = (l, u, h, E) => {
    if (u.children !== l.children) {
      const g = m(l.anchor);
      S(l), [u.el, u.anchor] = P(
        u.children,
        h,
        g,
        E
      );
    } else
      u.el = l.el, u.anchor = l.anchor;
  }, de = ({ el: l, anchor: u }, h, E) => {
    let g;
    for (; l && l !== u; )
      g = m(l), o(l, h, E), l = g;
    o(u, h, E);
  }, S = ({ el: l, anchor: u }) => {
    let h;
    for (; l && l !== u; )
      h = m(l), s(l), l = h;
    s(u);
  }, ee = (l, u, h, E, g, _, O, b, N) => {
    if (u.type === "svg" ? O = "svg" : u.type === "math" && (O = "mathml"), l == null)
      _e(
        u,
        h,
        E,
        g,
        _,
        O,
        b,
        N
      );
    else {
      const v = l.el && l.el._isVueCE ? l.el : null;
      try {
        v && v._beginPatch(), Le(
          l,
          u,
          g,
          _,
          O,
          b,
          N
        );
      } finally {
        v && v._endPatch();
      }
    }
  }, _e = (l, u, h, E, g, _, O, b) => {
    let N, v;
    const { props: C, shapeFlag: D, transition: V, dirs: A } = l;
    if (N = l.el = i(
      l.type,
      _,
      C && C.is,
      C
    ), D & 8 ? p(N, l.children) : D & 16 && re(
      l.children,
      N,
      null,
      E,
      g,
      Wn(l, _),
      O,
      b
    ), A && ot(l, null, E, "created"), te(N, l, l.scopeId, O, E), C) {
      for (const k in C)
        k !== "value" && !Pt(k) && r(N, k, null, C[k], _, E);
      "value" in C && r(N, "value", null, C.value, _), (v = C.onVnodeBeforeMount) && Ce(v, E, l);
    }
    process.env.NODE_ENV !== "production" && (dn(N, "__vnode", l, !0), dn(N, "__vueParentComponent", E, !0)), A && ot(l, null, E, "beforeMount");
    const F = il(g, V);
    F && V.beforeEnter(N), o(N, u, h), ((v = C && C.onVnodeMounted) || F || A) && fe(() => {
      v && Ce(v, E, l), F && V.enter(N), A && ot(l, null, E, "mounted");
    }, g);
  }, te = (l, u, h, E, g) => {
    if (h && w(l, h), E)
      for (let _ = 0; _ < E.length; _++)
        w(l, E[_]);
    if (g) {
      let _ = g.subTree;
      if (process.env.NODE_ENV !== "production" && _.patchFlag > 0 && _.patchFlag & 2048 && (_ = $o(_.children) || _), u === _ || Tr(_.type) && (_.ssContent === u || _.ssFallback === u)) {
        const O = g.vnode;
        te(
          l,
          O,
          O.scopeId,
          O.slotScopeIds,
          g.parent
        );
      }
    }
  }, re = (l, u, h, E, g, _, O, b, N = 0) => {
    for (let v = N; v < l.length; v++) {
      const C = l[v] = b ? Be(l[v]) : Ee(l[v]);
      x(
        null,
        C,
        u,
        h,
        E,
        g,
        _,
        O,
        b
      );
    }
  }, Le = (l, u, h, E, g, _, O) => {
    const b = u.el = l.el;
    process.env.NODE_ENV !== "production" && (b.__vnode = u);
    let { patchFlag: N, dynamicChildren: v, dirs: C } = u;
    N |= l.patchFlag & 16;
    const D = l.props || B, V = u.props || B;
    let A;
    if (h && st(h, !1), (A = V.onVnodeBeforeUpdate) && Ce(A, h, u, l), C && ot(u, l, h, "beforeUpdate"), h && st(h, !0), process.env.NODE_ENV !== "production" && Re && (N = 0, O = !1, v = null), (D.innerHTML && V.innerHTML == null || D.textContent && V.textContent == null) && p(b, ""), v ? (ze(
      l.dynamicChildren,
      v,
      b,
      h,
      E,
      Wn(u, g),
      _
    ), process.env.NODE_ENV !== "production" && ln(l, u)) : O || we(
      l,
      u,
      b,
      null,
      h,
      E,
      Wn(u, g),
      _,
      !1
    ), N > 0) {
      if (N & 16)
        ve(b, D, V, h, g);
      else if (N & 2 && D.class !== V.class && r(b, "class", null, V.class, g), N & 4 && r(b, "style", D.style, V.style, g), N & 8) {
        const F = u.dynamicProps;
        for (let k = 0; k < F.length; k++) {
          const W = F[k], ce = D[W], le = V[W];
          (le !== ce || W === "value") && r(b, W, ce, le, g, h);
        }
      }
      N & 1 && l.children !== u.children && p(b, u.children);
    } else !O && v == null && ve(b, D, V, h, g);
    ((A = V.onVnodeUpdated) || C) && fe(() => {
      A && Ce(A, h, u, l), C && ot(u, l, h, "updated");
    }, E);
  }, ze = (l, u, h, E, g, _, O) => {
    for (let b = 0; b < u.length; b++) {
      const N = l[b], v = u[b], C = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        N.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (N.type === Pe || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Ct(N, v) || // - In the case of a component, it could contain anything.
        N.shapeFlag & 198) ? a(N.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          h
        )
      );
      x(
        N,
        v,
        C,
        null,
        E,
        g,
        _,
        O,
        !0
      );
    }
  }, ve = (l, u, h, E, g) => {
    if (u !== h) {
      if (u !== B)
        for (const _ in u)
          !Pt(_) && !(_ in h) && r(
            l,
            _,
            u[_],
            null,
            g,
            E
          );
      for (const _ in h) {
        if (Pt(_)) continue;
        const O = h[_], b = u[_];
        O !== b && _ !== "value" && r(l, _, b, O, g, E);
      }
      "value" in h && r(l, "value", u.value, h.value, g);
    }
  }, Zt = (l, u, h, E, g, _, O, b, N) => {
    const v = u.el = l ? l.el : c(""), C = u.anchor = l ? l.anchor : c("");
    let { patchFlag: D, dynamicChildren: V, slotScopeIds: A } = u;
    process.env.NODE_ENV !== "production" && // #5523 dev root fragment may inherit directives
    (Re || D & 2048) && (D = 0, N = !1, V = null), A && (b = b ? b.concat(A) : A), l == null ? (o(v, h, E), o(C, h, E), re(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      u.children || [],
      h,
      C,
      g,
      _,
      O,
      b,
      N
    )) : D > 0 && D & 64 && V && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    l.dynamicChildren && l.dynamicChildren.length === V.length ? (ze(
      l.dynamicChildren,
      V,
      h,
      g,
      _,
      O,
      b
    ), process.env.NODE_ENV !== "production" ? ln(l, u) : (
      // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //  get moved around. Make sure all root level vnodes inherit el.
      // #2134 or if it's a component root, it may also get moved around
      // as the component is being moved.
      (u.key != null || g && u === g.subTree) && ln(
        l,
        u,
        !0
        /* shallow */
      )
    )) : we(
      l,
      u,
      h,
      C,
      g,
      _,
      O,
      b,
      N
    );
  }, Fo = (l, u, h, E, g, _, O, b, N) => {
    u.slotScopeIds = b, l == null ? u.shapeFlag & 512 ? g.ctx.activate(
      u,
      h,
      E,
      O,
      N
    ) : Xe(
      u,
      h,
      E,
      g,
      _,
      O,
      N
    ) : ie(l, u, N);
  }, Xe = (l, u, h, E, g, _, O) => {
    const b = l.component = vl(
      l,
      E,
      g
    );
    if (process.env.NODE_ENV !== "production" && b.type.__hmrId && qi(b), process.env.NODE_ENV !== "production" && (on(l), gt(b, "mount")), So(l) && (b.ctx.renderer = Dt), process.env.NODE_ENV !== "production" && gt(b, "init"), Nl(b, !1, O), process.env.NODE_ENV !== "production" && mt(b, "init"), process.env.NODE_ENV !== "production" && Re && (l.el = null), b.asyncDep) {
      if (g && g.registerDep(b, R, O), !l.el) {
        const N = b.subTree = ke(me);
        q(null, N, u, h), l.placeholder = N.el;
      }
    } else
      R(
        b,
        l,
        u,
        h,
        g,
        _,
        O
      );
    process.env.NODE_ENV !== "production" && (sn(), mt(b, "mount"));
  }, ie = (l, u, h) => {
    const E = u.component = l.component;
    if (Kc(l, u, h))
      if (E.asyncDep && !E.asyncResolved) {
        process.env.NODE_ENV !== "production" && on(u), I(E, u, h), process.env.NODE_ENV !== "production" && sn();
        return;
      } else
        E.next = u, E.update();
    else
      u.el = l.el, E.vnode = u;
  }, R = (l, u, h, E, g, _, O) => {
    const b = () => {
      if (l.isMounted) {
        let { next: D, bu: V, u: A, parent: F, vnode: k } = l;
        {
          const Ve = Sr(l);
          if (Ve) {
            D && (D.el = k.el, I(l, D, O)), Ve.asyncDep.then(() => {
              fe(() => {
                l.isUnmounted || v();
              }, g);
            });
            return;
          }
        }
        let W = D, ce;
        process.env.NODE_ENV !== "production" && on(D || l.vnode), st(l, !1), D ? (D.el = k.el, I(l, D, O)) : D = k, V && xt(V), (ce = D.props && D.props.onVnodeBeforeUpdate) && Ce(ce, F, D, k), st(l, !0), process.env.NODE_ENV !== "production" && gt(l, "render");
        const le = ns(l);
        process.env.NODE_ENV !== "production" && mt(l, "render");
        const xe = l.subTree;
        l.subTree = le, process.env.NODE_ENV !== "production" && gt(l, "patch"), x(
          xe,
          le,
          // parent may have changed if it's in a teleport
          a(xe.el),
          // anchor may have changed if it's in a fragment
          Qt(xe),
          l,
          g,
          _
        ), process.env.NODE_ENV !== "production" && mt(l, "patch"), D.el = le.el, W === null && Wc(l, le.el), A && fe(A, g), (ce = D.props && D.props.onVnodeUpdated) && fe(
          () => Ce(ce, F, D, k),
          g
        ), process.env.NODE_ENV !== "production" && rr(l), process.env.NODE_ENV !== "production" && sn();
      } else {
        let D;
        const { el: V, props: A } = u, { bm: F, m: k, parent: W, root: ce, type: le } = l, xe = Rt(u);
        st(l, !1), F && xt(F), !xe && (D = A && A.onVnodeBeforeMount) && Ce(D, W, u), st(l, !0);
        {
          ce.ce && ce.ce._hasShadowRoot() && ce.ce._injectChildStyle(
            le,
            l.parent ? l.parent.type : void 0
          ), process.env.NODE_ENV !== "production" && gt(l, "render");
          const Ve = l.subTree = ns(l);
          process.env.NODE_ENV !== "production" && mt(l, "render"), process.env.NODE_ENV !== "production" && gt(l, "patch"), x(
            null,
            Ve,
            h,
            E,
            l,
            g,
            _
          ), process.env.NODE_ENV !== "production" && mt(l, "patch"), u.el = Ve.el;
        }
        if (k && fe(k, g), !xe && (D = A && A.onVnodeMounted)) {
          const Ve = u;
          fe(
            () => Ce(D, W, Ve),
            g
          );
        }
        (u.shapeFlag & 256 || W && Rt(W.vnode) && W.vnode.shapeFlag & 256) && l.a && fe(l.a, g), l.isMounted = !0, process.env.NODE_ENV !== "production" && Zi(l), u = h = E = null;
      }
    };
    l.scope.on();
    const N = l.effect = new Is(b);
    l.scope.off();
    const v = l.update = N.run.bind(N), C = l.job = N.runIfDirty.bind(N);
    C.i = l, C.id = l.uid, N.scheduler = () => Sn(C), st(l, !0), process.env.NODE_ENV !== "production" && (N.onTrack = l.rtc ? (D) => xt(l.rtc, D) : void 0, N.onTrigger = l.rtg ? (D) => xt(l.rtg, D) : void 0), v();
  }, I = (l, u, h) => {
    u.component = l;
    const E = l.vnode.props;
    l.vnode = u, l.next = null, qc(l, u.props, E, h), nl(l, u.children, h), Oe(), Go(l), De();
  }, we = (l, u, h, E, g, _, O, b, N = !1) => {
    const v = l && l.children, C = l ? l.shapeFlag : 0, D = u.children, { patchFlag: V, shapeFlag: A } = u;
    if (V > 0) {
      if (V & 128) {
        yt(
          v,
          D,
          h,
          E,
          g,
          _,
          O,
          b,
          N
        );
        return;
      } else if (V & 256) {
        Pn(
          v,
          D,
          h,
          E,
          g,
          _,
          O,
          b,
          N
        );
        return;
      }
    }
    A & 8 ? (C & 16 && Ot(v, g, _), D !== v && p(h, D)) : C & 16 ? A & 16 ? yt(
      v,
      D,
      h,
      E,
      g,
      _,
      O,
      b,
      N
    ) : Ot(v, g, _, !0) : (C & 8 && p(h, ""), A & 16 && re(
      D,
      h,
      E,
      g,
      _,
      O,
      b,
      N
    ));
  }, Pn = (l, u, h, E, g, _, O, b, N) => {
    l = l || vt, u = u || vt;
    const v = l.length, C = u.length, D = Math.min(v, C);
    let V;
    for (V = 0; V < D; V++) {
      const A = u[V] = N ? Be(u[V]) : Ee(u[V]);
      x(
        l[V],
        A,
        h,
        null,
        g,
        _,
        O,
        b,
        N
      );
    }
    v > C ? Ot(
      l,
      g,
      _,
      !0,
      !1,
      D
    ) : re(
      u,
      h,
      E,
      g,
      _,
      O,
      b,
      N,
      D
    );
  }, yt = (l, u, h, E, g, _, O, b, N) => {
    let v = 0;
    const C = u.length;
    let D = l.length - 1, V = C - 1;
    for (; v <= D && v <= V; ) {
      const A = l[v], F = u[v] = N ? Be(u[v]) : Ee(u[v]);
      if (Ct(A, F))
        x(
          A,
          F,
          h,
          null,
          g,
          _,
          O,
          b,
          N
        );
      else
        break;
      v++;
    }
    for (; v <= D && v <= V; ) {
      const A = l[D], F = u[V] = N ? Be(u[V]) : Ee(u[V]);
      if (Ct(A, F))
        x(
          A,
          F,
          h,
          null,
          g,
          _,
          O,
          b,
          N
        );
      else
        break;
      D--, V--;
    }
    if (v > D) {
      if (v <= V) {
        const A = V + 1, F = A < C ? u[A].el : E;
        for (; v <= V; )
          x(
            null,
            u[v] = N ? Be(u[v]) : Ee(u[v]),
            h,
            F,
            g,
            _,
            O,
            b,
            N
          ), v++;
      }
    } else if (v > V)
      for (; v <= D; )
        Ze(l[v], g, _, !0), v++;
    else {
      const A = v, F = v, k = /* @__PURE__ */ new Map();
      for (v = F; v <= V; v++) {
        const ne = u[v] = N ? Be(u[v]) : Ee(u[v]);
        ne.key != null && (process.env.NODE_ENV !== "production" && k.has(ne.key) && y(
          "Duplicate keys found during update:",
          JSON.stringify(ne.key),
          "Make sure keys are unique."
        ), k.set(ne.key, v));
      }
      let W, ce = 0;
      const le = V - F + 1;
      let xe = !1, Ve = 0;
      const wt = new Array(le);
      for (v = 0; v < le; v++) wt[v] = 0;
      for (v = A; v <= D; v++) {
        const ne = l[v];
        if (ce >= le) {
          Ze(ne, g, _, !0);
          continue;
        }
        let Se;
        if (ne.key != null)
          Se = k.get(ne.key);
        else
          for (W = F; W <= V; W++)
            if (wt[W - F] === 0 && Ct(ne, u[W])) {
              Se = W;
              break;
            }
        Se === void 0 ? Ze(ne, g, _, !0) : (wt[Se - F] = v + 1, Se >= Ve ? Ve = Se : xe = !0, x(
          ne,
          u[Se],
          h,
          null,
          g,
          _,
          O,
          b,
          N
        ), ce++);
      }
      const Ho = xe ? cl(wt) : vt;
      for (W = Ho.length - 1, v = le - 1; v >= 0; v--) {
        const ne = F + v, Se = u[ne], Lo = u[ne + 1], Uo = ne + 1 < C ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Lo.el || Cr(Lo)
        ) : E;
        wt[v] === 0 ? x(
          null,
          Se,
          h,
          Uo,
          g,
          _,
          O,
          b,
          N
        ) : xe && (W < 0 || v !== Ho[W] ? dt(Se, h, Uo, 2) : W--);
      }
    }
  }, dt = (l, u, h, E, g = null) => {
    const { el: _, type: O, transition: b, children: N, shapeFlag: v } = l;
    if (v & 6) {
      dt(l.component.subTree, u, h, E);
      return;
    }
    if (v & 128) {
      l.suspense.move(u, h, E);
      return;
    }
    if (v & 64) {
      O.move(l, u, h, Dt);
      return;
    }
    if (O === Pe) {
      o(_, u, h);
      for (let D = 0; D < N.length; D++)
        dt(N[D], u, h, E);
      o(l.anchor, u, h);
      return;
    }
    if (O === fn) {
      de(l, u, h);
      return;
    }
    if (E !== 2 && v & 1 && b)
      if (E === 0)
        b.beforeEnter(_), o(_, u, h), fe(() => b.enter(_), g);
      else {
        const { leave: D, delayLeave: V, afterLeave: A } = b, F = () => {
          l.ctx.isUnmounted ? s(_) : o(_, u, h);
        }, k = () => {
          _._isLeaving && _[ac](
            !0
            /* cancelled */
          ), D(_, () => {
            F(), A && A();
          });
        };
        V ? V(_, F, k) : k();
      }
    else
      o(_, u, h);
  }, Ze = (l, u, h, E = !1, g = !1) => {
    const {
      type: _,
      props: O,
      ref: b,
      children: N,
      dynamicChildren: v,
      shapeFlag: C,
      patchFlag: D,
      dirs: V,
      cacheIndex: A
    } = l;
    if (D === -2 && (g = !1), b != null && (Oe(), It(b, null, h, l, !0), De()), A != null && (u.renderCache[A] = void 0), C & 256) {
      u.ctx.deactivate(l);
      return;
    }
    const F = C & 1 && V, k = !Rt(l);
    let W;
    if (k && (W = O && O.onVnodeBeforeUnmount) && Ce(W, u, l), C & 6)
      Kr(l.component, h, E);
    else {
      if (C & 128) {
        l.suspense.unmount(h, E);
        return;
      }
      F && ot(l, null, u, "beforeUnmount"), C & 64 ? l.type.remove(
        l,
        u,
        h,
        Dt,
        E
      ) : v && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !v.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (_ !== Pe || D > 0 && D & 64) ? Ot(
        v,
        u,
        h,
        !1,
        !0
      ) : (_ === Pe && D & 384 || !g && C & 16) && Ot(N, u, h), E && An(l);
    }
    (k && (W = O && O.onVnodeUnmounted) || F) && fe(() => {
      W && Ce(W, u, l), F && ot(l, null, u, "unmounted");
    }, h);
  }, An = (l) => {
    const { type: u, el: h, anchor: E, transition: g } = l;
    if (u === Pe) {
      process.env.NODE_ENV !== "production" && l.patchFlag > 0 && l.patchFlag & 2048 && g && !g.persisted ? l.children.forEach((O) => {
        O.type === me ? s(O.el) : An(O);
      }) : Ur(h, E);
      return;
    }
    if (u === fn) {
      S(l);
      return;
    }
    const _ = () => {
      s(h), g && !g.persisted && g.afterLeave && g.afterLeave();
    };
    if (l.shapeFlag & 1 && g && !g.persisted) {
      const { leave: O, delayLeave: b } = g, N = () => O(h, _);
      b ? b(l.el, _, N) : N();
    } else
      _();
  }, Ur = (l, u) => {
    let h;
    for (; l !== u; )
      h = m(l), s(l), l = h;
    s(u);
  }, Kr = (l, u, h) => {
    process.env.NODE_ENV !== "production" && l.type.__hmrId && Gi(l);
    const { bum: E, scope: g, job: _, subTree: O, um: b, m: N, a: v } = l;
    ls(N), ls(v), E && xt(E), g.stop(), _ && (_.flags |= 8, Ze(O, l, u, h)), b && fe(b, u), fe(() => {
      l.isUnmounted = !0;
    }, u), process.env.NODE_ENV !== "production" && ec(l);
  }, Ot = (l, u, h, E = !1, g = !1, _ = 0) => {
    for (let O = _; O < l.length; O++)
      Ze(l[O], u, h, E, g);
  }, Qt = (l) => {
    if (l.shapeFlag & 6)
      return Qt(l.component.subTree);
    if (l.shapeFlag & 128)
      return l.suspense.next();
    const u = m(l.anchor || l.el), h = u && u[fc];
    return h ? m(h) : u;
  };
  let Mn = !1;
  const jo = (l, u, h) => {
    let E;
    l == null ? u._vnode && (Ze(u._vnode, null, null, !0), E = u._vnode.component) : x(
      u._vnode || null,
      l,
      u,
      null,
      null,
      null,
      h
    ), u._vnode = l, Mn || (Mn = !0, Go(E), nr(), Mn = !1);
  }, Dt = {
    p: x,
    um: Ze,
    m: dt,
    r: An,
    mt: Xe,
    mc: re,
    pc: we,
    pbc: ze,
    n: Qt,
    o: e
  };
  return {
    render: jo,
    hydrate: void 0,
    createApp: Rc(jo)
  };
}
function Wn({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function st({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function il(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function ln(e, t, n = !1) {
  const o = e.children, s = t.children;
  if (T(o) && T(s))
    for (let r = 0; r < o.length; r++) {
      const i = o[r];
      let c = s[r];
      c.shapeFlag & 1 && !c.dynamicChildren && ((c.patchFlag <= 0 || c.patchFlag === 32) && (c = s[r] = Be(s[r]), c.el = i.el), !n && c.patchFlag !== -2 && ln(i, c)), c.type === Yt && (c.patchFlag === -1 && (c = s[r] = Be(c)), c.el = i.el), c.type === me && !c.el && (c.el = i.el), process.env.NODE_ENV !== "production" && c.el && (c.el.__vnode = c);
    }
}
function cl(e) {
  const t = e.slice(), n = [0];
  let o, s, r, i, c;
  const f = e.length;
  for (o = 0; o < f; o++) {
    const d = e[o];
    if (d !== 0) {
      if (s = n[n.length - 1], e[s] < d) {
        t[o] = s, n.push(o);
        continue;
      }
      for (r = 0, i = n.length - 1; r < i; )
        c = r + i >> 1, e[n[c]] < d ? r = c + 1 : i = c;
      d < e[n[r]] && (r > 0 && (t[o] = n[r - 1]), n[r] = o);
    }
  }
  for (r = n.length, i = n[r - 1]; r-- > 0; )
    n[r] = i, i = t[i];
  return n;
}
function Sr(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Sr(t);
}
function ls(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Cr(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Cr(t.subTree) : null;
}
const Tr = (e) => e.__isSuspense;
function ll(e, t) {
  t && t.pendingBranch ? T(e) ? t.effects.push(...e) : t.effects.push(e) : tr(e);
}
const Pe = /* @__PURE__ */ Symbol.for("v-fgt"), Yt = /* @__PURE__ */ Symbol.for("v-txt"), me = /* @__PURE__ */ Symbol.for("v-cmt"), fn = /* @__PURE__ */ Symbol.for("v-stc"), Ft = [];
let ge = null;
function ro(e = !1) {
  Ft.push(ge = e ? null : []);
}
function fl() {
  Ft.pop(), ge = Ft[Ft.length - 1] || null;
}
let Kt = 1;
function fs(e, t = !1) {
  Kt += e, e < 0 && ge && t && (ge.hasOnce = !0);
}
function $r(e) {
  return e.dynamicChildren = Kt > 0 ? ge || vt : null, fl(), Kt > 0 && ge && ge.push(e), e;
}
function us(e, t, n, o, s, r) {
  return $r(
    Mo(
      e,
      t,
      n,
      o,
      s,
      r,
      !0
    )
  );
}
function ul(e, t, n, o, s) {
  return $r(
    ke(
      e,
      t,
      n,
      o,
      s,
      !0
    )
  );
}
function $n(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Ct(e, t) {
  if (process.env.NODE_ENV !== "production" && t.shapeFlag & 6 && e.component) {
    const n = rn.get(t.type);
    if (n && n.has(e.component))
      return e.shapeFlag &= -257, t.shapeFlag &= -513, !1;
  }
  return e.type === t.type && e.key === t.key;
}
const al = (...e) => Ar(
  ...e
), Pr = ({ key: e }) => e ?? null, un = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? G(e) || /* @__PURE__ */ z(e) || $(e) ? { i: he, r: e, k: t, f: !!n } : e : null);
function Mo(e, t = null, n = null, o = 0, s = null, r = e === Pe ? 0 : 1, i = !1, c = !1) {
  const f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Pr(t),
    ref: t && un(t),
    scopeId: cr,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: o,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: he
  };
  return c ? (Io(f, n), r & 128 && e.normalize(f)) : n && (f.shapeFlag |= G(n) ? 8 : 16), process.env.NODE_ENV !== "production" && f.key !== f.key && y("VNode created with invalid key (NaN). VNode type:", f.type), Kt > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  ge && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (f.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  f.patchFlag !== 32 && ge.push(f), f;
}
const ke = process.env.NODE_ENV !== "production" ? al : Ar;
function Ar(e, t = null, n = null, o = 0, s = null, r = !1) {
  if ((!e || e === wc) && (process.env.NODE_ENV !== "production" && !e && y(`Invalid vnode type when creating vnode: ${e}.`), e = me), $n(e)) {
    const c = nt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Io(c, n), Kt > 0 && !r && ge && (c.shapeFlag & 6 ? ge[ge.indexOf(e)] = c : ge.push(c)), c.patchFlag = -2, c;
  }
  if (Hr(e) && (e = e.__vccOpts), t) {
    t = pl(t);
    let { class: c, style: f } = t;
    c && !G(c) && (t.class = go(c)), L(f) && (/* @__PURE__ */ hn(f) && !T(f) && (f = Y({}, f)), t.style = ho(f));
  }
  const i = G(e) ? 1 : Tr(e) ? 128 : uc(e) ? 64 : L(e) ? 4 : $(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && /* @__PURE__ */ hn(e) && (e = /* @__PURE__ */ M(e), y(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), Mo(
    e,
    t,
    n,
    o,
    s,
    i,
    r,
    !0
  );
}
function pl(e) {
  return e ? /* @__PURE__ */ hn(e) || yr(e) ? Y({}, e) : e : null;
}
function nt(e, t, n = !1, o = !1) {
  const { props: s, ref: r, patchFlag: i, children: c, transition: f } = e, d = t ? gl(s || {}, t) : s, p = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && Pr(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? T(r) ? r.concat(un(t)) : [r, un(t)] : un(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && i === -1 && T(c) ? c.map(Mr) : c,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Pe ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: f,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && nt(e.ssContent),
    ssFallback: e.ssFallback && nt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return f && o && Vo(
    p,
    f.clone(p)
  ), p;
}
function Mr(e) {
  const t = nt(e);
  return T(e.children) && (t.children = e.children.map(Mr)), t;
}
function dl(e = " ", t = 0) {
  return ke(Yt, null, e, t);
}
function hl(e = "", t = !1) {
  return t ? (ro(), ul(me, null, e)) : ke(me, null, e);
}
function Ee(e) {
  return e == null || typeof e == "boolean" ? ke(me) : T(e) ? ke(
    Pe,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : $n(e) ? Be(e) : ke(Yt, null, String(e));
}
function Be(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : nt(e);
}
function Io(e, t) {
  let n = 0;
  const { shapeFlag: o } = e;
  if (t == null)
    t = null;
  else if (T(t))
    n = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Io(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !yr(t) ? t._ctx = he : s === 3 && he && (he.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else $(t) ? (t = { default: t, _ctx: he }, n = 32) : (t = String(t), o & 64 ? (n = 16, t = [dl(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function gl(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const s in o)
      if (s === "class")
        t.class !== o.class && (t.class = go([t.class, o.class]));
      else if (s === "style")
        t.style = ho([t.style, o.style]);
      else if (Bt(s)) {
        const r = t[s], i = o[s];
        i && r !== i && !(T(r) && r.includes(i)) && (t[s] = r ? [].concat(r, i) : i);
      } else s !== "" && (t[s] = o[s]);
  }
  return t;
}
function Ce(e, t, n, o = null) {
  He(e, t, 7, [
    n,
    o
  ]);
}
const ml = mr();
let _l = 0;
function vl(e, t, n) {
  const o = e.type, s = (t ? t.appContext : e.appContext) || ml, r = {
    uid: _l++,
    vnode: e,
    type: o,
    parent: t,
    appContext: s,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new ci(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(s.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Dr(o, s),
    emitsOptions: _r(o, s),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: B,
    // inheritAttrs
    inheritAttrs: o.inheritAttrs,
    // state
    ctx: B,
    data: B,
    props: B,
    attrs: B,
    slots: B,
    refs: B,
    setupState: B,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return process.env.NODE_ENV !== "production" ? r.ctx = xc(r) : r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = jc.bind(null, r), e.ce && e.ce(r), r;
}
let X = null;
const Ir = () => X || he;
let On, io;
{
  const e = qt(), t = (n, o) => {
    let s;
    return (s = e[n]) || (s = e[n] = []), s.push(o), (r) => {
      s.length > 1 ? s.forEach((i) => i(r)) : s[0](r);
    };
  };
  On = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => X = n
  ), io = t(
    "__VUE_SSR_SETTERS__",
    (n) => Wt = n
  );
}
const zt = (e) => {
  const t = X;
  return On(e), e.scope.on(), () => {
    e.scope.off(), On(t);
  };
}, as = () => {
  X && X.scope.off(), On(null);
}, El = /* @__PURE__ */ Je("slot,component");
function co(e, { isNativeTag: t }) {
  (El(e) || t(e)) && y(
    "Do not use built-in or reserved HTML elements as component id: " + e
  );
}
function Rr(e) {
  return e.vnode.shapeFlag & 4;
}
let Wt = !1;
function Nl(e, t = !1, n = !1) {
  t && io(t);
  const { props: o, children: s } = e.vnode, r = Rr(e);
  Bc(e, o, r, t), tl(e, s, n || t);
  const i = r ? bl(e, t) : void 0;
  return t && io(!1), i;
}
function bl(e, t) {
  const n = e.type;
  if (process.env.NODE_ENV !== "production") {
    if (n.name && co(n.name, e.appContext.config), n.components) {
      const s = Object.keys(n.components);
      for (let r = 0; r < s.length; r++)
        co(s[r], e.appContext.config);
    }
    if (n.directives) {
      const s = Object.keys(n.directives);
      for (let r = 0; r < s.length; r++)
        lr(s[r]);
    }
    n.compilerOptions && yl() && y(
      '"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.'
    );
  }
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, dr), process.env.NODE_ENV !== "production" && Vc(e);
  const { setup: o } = n;
  if (o) {
    Oe();
    const s = e.setupContext = o.length > 1 ? Dl(e) : null, r = zt(e), i = bt(
      o,
      e,
      0,
      [
        process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Ie(e.props) : e.props,
        s
      ]
    ), c = uo(i);
    if (De(), r(), (c || e.sp) && !Rt(e) && ar(e), c) {
      if (i.then(as, as), t)
        return i.then((f) => {
          ps(e, f, t);
        }).catch((f) => {
          Gt(f, e, 0);
        });
      if (e.asyncDep = i, process.env.NODE_ENV !== "production" && !e.suspense) {
        const f = Xt(e, n);
        y(
          `Component <${f}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
        );
      }
    } else
      ps(e, i, t);
  } else
    Fr(e, t);
}
function ps(e, t, n) {
  $(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : L(t) ? (process.env.NODE_ENV !== "production" && $n(t) && y(
    "setup() should not return VNodes directly - return a render function instead."
  ), process.env.NODE_ENV !== "production" && (e.devtoolsRawSetupState = t), e.setupState = Xs(t), process.env.NODE_ENV !== "production" && Sc(e)) : process.env.NODE_ENV !== "production" && t !== void 0 && y(
    `setup() should return an object. Received: ${t === null ? "null" : typeof t}`
  ), Fr(e, n);
}
const yl = () => !0;
function Fr(e, t, n) {
  const o = e.type;
  e.render || (e.render = o.render || Q);
  {
    const s = zt(e);
    Oe();
    try {
      Tc(e);
    } finally {
      De(), s();
    }
  }
  process.env.NODE_ENV !== "production" && !o.render && e.render === Q && !t && (o.template ? y(
    'Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".'
  ) : y("Component is missing template or render function: ", o));
}
const ds = process.env.NODE_ENV !== "production" ? {
  get(e, t) {
    return bn(), Z(e, "get", ""), e[t];
  },
  set() {
    return y("setupContext.attrs is readonly."), !1;
  },
  deleteProperty() {
    return y("setupContext.attrs is readonly."), !1;
  }
} : {
  get(e, t) {
    return Z(e, "get", ""), e[t];
  }
};
function Ol(e) {
  return new Proxy(e.slots, {
    get(t, n) {
      return Z(e, "get", "$slots"), t[n];
    }
  });
}
function Dl(e) {
  const t = (n) => {
    if (process.env.NODE_ENV !== "production" && (e.exposed && y("expose() should be called only once per setup()."), n != null)) {
      let o = typeof n;
      o === "object" && (T(n) ? o = "array" : /* @__PURE__ */ z(n) && (o = "ref")), o !== "object" && y(
        `expose() should be passed a plain object, received ${o}.`
      );
    }
    e.exposed = n || {};
  };
  if (process.env.NODE_ENV !== "production") {
    let n, o;
    return Object.freeze({
      get attrs() {
        return n || (n = new Proxy(e.attrs, ds));
      },
      get slots() {
        return o || (o = Ol(e));
      },
      get emit() {
        return (s, ...r) => e.emit(s, ...r);
      },
      expose: t
    });
  } else
    return {
      attrs: new Proxy(e.attrs, ds),
      slots: e.slots,
      emit: e.emit,
      expose: t
    };
}
function Ro(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Xs(Si(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in at)
        return at[n](e);
    },
    has(t, n) {
      return n in t || n in at;
    }
  })) : e.proxy;
}
const wl = /(?:^|[-_])\w/g, xl = (e) => e.replace(wl, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function jr(e, t = !0) {
  return $(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Xt(e, t, n = !1) {
  let o = jr(t);
  if (!o && t.__file) {
    const s = t.__file.match(/([^/\\]+)\.\w+$/);
    s && (o = s[1]);
  }
  if (!o && e) {
    const s = (r) => {
      for (const i in r)
        if (r[i] === t)
          return i;
    };
    o = s(e.components) || e.parent && s(
      e.parent.type.components
    ) || s(e.appContext.components);
  }
  return o ? xl(o) : n ? "App" : "Anonymous";
}
function Hr(e) {
  return $(e) && "__vccOpts" in e;
}
const Vl = (e, t) => {
  const n = /* @__PURE__ */ Ii(e, t, Wt);
  if (process.env.NODE_ENV !== "production") {
    const o = Ir();
    o && o.appContext.config.warnRecursiveComputed && (n._warnRecursive = !0);
  }
  return n;
};
function Sl() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, o = { style: "color:#eb2f96" }, s = {
    __vue_custom_formatter: !0,
    header(a) {
      if (!L(a))
        return null;
      if (a.__isVue)
        return ["div", e, "VueInstance"];
      if (/* @__PURE__ */ z(a)) {
        Oe();
        const m = a.value;
        return De(), [
          "div",
          {},
          ["span", e, p(a)],
          "<",
          c(m),
          ">"
        ];
      } else {
        if (/* @__PURE__ */ ft(a))
          return [
            "div",
            {},
            ["span", e, /* @__PURE__ */ pe(a) ? "ShallowReactive" : "Reactive"],
            "<",
            c(a),
            `>${/* @__PURE__ */ je(a) ? " (readonly)" : ""}`
          ];
        if (/* @__PURE__ */ je(a))
          return [
            "div",
            {},
            ["span", e, /* @__PURE__ */ pe(a) ? "ShallowReadonly" : "Readonly"],
            "<",
            c(a),
            ">"
          ];
      }
      return null;
    },
    hasBody(a) {
      return a && a.__isVue;
    },
    body(a) {
      if (a && a.__isVue)
        return [
          "div",
          {},
          ...r(a.$)
        ];
    }
  };
  function r(a) {
    const m = [];
    a.type.props && a.props && m.push(i("props", /* @__PURE__ */ M(a.props))), a.setupState !== B && m.push(i("setup", a.setupState)), a.data !== B && m.push(i("data", /* @__PURE__ */ M(a.data)));
    const w = f(a, "computed");
    w && m.push(i("computed", w));
    const P = f(a, "inject");
    return P && m.push(i("injected", P)), m.push([
      "div",
      {},
      [
        "span",
        {
          style: o.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: a }]
    ]), m;
  }
  function i(a, m) {
    return m = Y({}, m), Object.keys(m).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        a
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(m).map((w) => [
          "div",
          {},
          ["span", o, w + ": "],
          c(m[w], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function c(a, m = !0) {
    return typeof a == "number" ? ["span", t, a] : typeof a == "string" ? ["span", n, JSON.stringify(a)] : typeof a == "boolean" ? ["span", o, a] : L(a) ? ["object", { object: m ? /* @__PURE__ */ M(a) : a }] : ["span", n, String(a)];
  }
  function f(a, m) {
    const w = a.type;
    if ($(w))
      return;
    const P = {};
    for (const x in a.ctx)
      d(w, x, m) && (P[x] = a.ctx[x]);
    return P;
  }
  function d(a, m, w) {
    const P = a[w];
    if (T(P) && P.includes(m) || L(P) && m in P || a.extends && d(a.extends, m, w) || a.mixins && a.mixins.some((x) => d(x, m, w)))
      return !0;
  }
  function p(a) {
    return /* @__PURE__ */ pe(a) ? "ShallowRef" : a.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(s) : window.devtoolsFormatters = [s];
}
const hs = "3.5.30", qe = process.env.NODE_ENV !== "production" ? y : Q;
process.env.NODE_ENV;
process.env.NODE_ENV;
/**
* @vue/runtime-dom v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let lo;
const gs = typeof window < "u" && window.trustedTypes;
if (gs)
  try {
    lo = /* @__PURE__ */ gs.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch (e) {
    process.env.NODE_ENV !== "production" && qe(`Error creating trusted types policy: ${e}`);
  }
const Lr = lo ? (e) => lo.createHTML(e) : (e) => e, Cl = "http://www.w3.org/2000/svg", Tl = "http://www.w3.org/1998/Math/MathML", Ke = typeof document < "u" ? document : null, ms = Ke && /* @__PURE__ */ Ke.createElement("template"), $l = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, o) => {
    const s = t === "svg" ? Ke.createElementNS(Cl, e) : t === "mathml" ? Ke.createElementNS(Tl, e) : n ? Ke.createElement(e, { is: n }) : Ke.createElement(e);
    return e === "select" && o && o.multiple != null && s.setAttribute("multiple", o.multiple), s;
  },
  createText: (e) => Ke.createTextNode(e),
  createComment: (e) => Ke.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Ke.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, o, s, r) {
    const i = n ? n.previousSibling : t.lastChild;
    if (s && (s === r || s.nextSibling))
      for (; t.insertBefore(s.cloneNode(!0), n), !(s === r || !(s = s.nextSibling)); )
        ;
    else {
      ms.innerHTML = Lr(
        o === "svg" ? `<svg>${e}</svg>` : o === "mathml" ? `<math>${e}</math>` : e
      );
      const c = ms.content;
      if (o === "svg" || o === "mathml") {
        const f = c.firstChild;
        for (; f.firstChild; )
          c.appendChild(f.firstChild);
        c.removeChild(f);
      }
      t.insertBefore(c, n);
    }
    return [
      // first
      i ? i.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, Pl = /* @__PURE__ */ Symbol("_vtc");
function Al(e, t, n) {
  const o = e[Pl];
  o && (t = (t ? [t, ...o] : [...o]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const _s = /* @__PURE__ */ Symbol("_vod"), Ml = /* @__PURE__ */ Symbol("_vsh"), Il = /* @__PURE__ */ Symbol(process.env.NODE_ENV !== "production" ? "CSS_VAR_TEXT" : ""), Rl = /(?:^|;)\s*display\s*:/;
function Fl(e, t, n) {
  const o = e.style, s = G(n);
  let r = !1;
  if (n && !s) {
    if (t)
      if (G(t))
        for (const i of t.split(";")) {
          const c = i.slice(0, i.indexOf(":")).trim();
          n[c] == null && an(o, c, "");
        }
      else
        for (const i in t)
          n[i] == null && an(o, i, "");
    for (const i in n)
      i === "display" && (r = !0), an(o, i, n[i]);
  } else if (s) {
    if (t !== n) {
      const i = o[Il];
      i && (n += ";" + i), o.cssText = n, r = Rl.test(n);
    }
  } else t && e.removeAttribute("style");
  _s in e && (e[_s] = r ? o.display : "", e[Ml] && (o.display = "none"));
}
const jl = /[^\\];\s*$/, vs = /\s*!important$/;
function an(e, t, n) {
  if (T(n))
    n.forEach((o) => an(e, t, o));
  else if (n == null && (n = ""), process.env.NODE_ENV !== "production" && jl.test(n) && qe(
    `Unexpected semicolon at the end of '${t}' style value: '${n}'`
  ), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const o = Hl(e, t);
    vs.test(n) ? e.setProperty(
      tt(o),
      n.replace(vs, ""),
      "important"
    ) : e[o] = n;
  }
}
const Es = ["Webkit", "Moz", "ms"], Bn = {};
function Hl(e, t) {
  const n = Bn[t];
  if (n)
    return n;
  let o = ae(t);
  if (o !== "filter" && o in e)
    return Bn[t] = o;
  o = wn(o);
  for (let s = 0; s < Es.length; s++) {
    const r = Es[s] + o;
    if (r in e)
      return Bn[t] = r;
  }
  return t;
}
const Ns = "http://www.w3.org/1999/xlink";
function bs(e, t, n, o, s, r = ri(t)) {
  o && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Ns, t.slice(6, t.length)) : e.setAttributeNS(Ns, t, n) : n == null || r && !Ps(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : Fe(n) ? String(n) : n
  );
}
function ys(e, t, n, o, s) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Lr(n) : n);
    return;
  }
  const r = e.tagName;
  if (t === "value" && r !== "PROGRESS" && // custom elements may use _value internally
  !r.includes("-")) {
    const c = r === "OPTION" ? e.getAttribute("value") || "" : e.value, f = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (c !== f || !("_value" in e)) && (e.value = f), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let i = !1;
  if (n === "" || n == null) {
    const c = typeof e[t];
    c === "boolean" ? n = Ps(n) : n == null && c === "string" ? (n = "", i = !0) : c === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch (c) {
    process.env.NODE_ENV !== "production" && !i && qe(
      `Failed setting prop "${t}" on <${r.toLowerCase()}>: value ${n} is invalid.`,
      c
    );
  }
  i && e.removeAttribute(s || t);
}
function Ll(e, t, n, o) {
  e.addEventListener(t, n, o);
}
function Ul(e, t, n, o) {
  e.removeEventListener(t, n, o);
}
const Os = /* @__PURE__ */ Symbol("_vei");
function Kl(e, t, n, o, s = null) {
  const r = e[Os] || (e[Os] = {}), i = r[t];
  if (o && i)
    i.value = process.env.NODE_ENV !== "production" ? ws(o, t) : o;
  else {
    const [c, f] = Wl(t);
    if (o) {
      const d = r[t] = ql(
        process.env.NODE_ENV !== "production" ? ws(o, t) : o,
        s
      );
      Ll(e, c, d, f);
    } else i && (Ul(e, c, i, f), r[t] = void 0);
  }
}
const Ds = /(?:Once|Passive|Capture)$/;
function Wl(e) {
  let t;
  if (Ds.test(e)) {
    t = {};
    let o;
    for (; o = e.match(Ds); )
      e = e.slice(0, e.length - o[0].length), t[o[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : tt(e.slice(2)), t];
}
let kn = 0;
const Bl = /* @__PURE__ */ Promise.resolve(), kl = () => kn || (Bl.then(() => kn = 0), kn = Date.now());
function ql(e, t) {
  const n = (o) => {
    if (!o._vts)
      o._vts = Date.now();
    else if (o._vts <= n.attached)
      return;
    He(
      Gl(o, n.value),
      t,
      5,
      [o]
    );
  };
  return n.value = e, n.attached = kl(), n;
}
function ws(e, t) {
  return $(e) || T(e) ? e : (qe(
    `Wrong type passed as event handler to ${t} - did you forget @ or : in front of your prop?
Expected function or array of functions, received type ${typeof e}.`
  ), Q);
}
function Gl(e, t) {
  if (T(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map(
      (o) => (s) => !s._stopped && o && o(s)
    );
  } else
    return t;
}
const xs = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Jl = (e, t, n, o, s, r) => {
  const i = s === "svg";
  t === "class" ? Al(e, o, i) : t === "style" ? Fl(e, n, o) : Bt(t) ? pn(t) || Kl(e, t, n, o, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Yl(e, t, o, i)) ? (ys(e, t, o), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && bs(e, t, o, i, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (zl(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !G(o))) ? ys(e, ae(t), o, r, t) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o), bs(e, t, o, i));
};
function Yl(e, t, n, o) {
  if (o)
    return !!(t === "innerHTML" || t === "textContent" || t in e && xs(t) && $(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const s = e.tagName;
    if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE")
      return !1;
  }
  return xs(t) && G(n) ? !1 : t in e;
}
function zl(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const o = ae(t);
  return Array.isArray(n) ? n.some((s) => ae(s) === o) : Object.keys(n).some((s) => ae(s) === o);
}
const Xl = /* @__PURE__ */ Y({ patchProp: Jl }, $l);
let Vs;
function Zl() {
  return Vs || (Vs = sl(Xl));
}
const Ql = ((...e) => {
  const t = Zl().createApp(...e);
  process.env.NODE_ENV !== "production" && (tf(t), nf(t));
  const { mount: n } = t;
  return t.mount = (o) => {
    const s = of(o);
    if (!s) return;
    const r = t._component;
    !$(r) && !r.render && !r.template && (r.template = s.innerHTML), s.nodeType === 1 && (s.textContent = "");
    const i = n(s, !1, ef(s));
    return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), i;
  }, t;
});
function ef(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function tf(e) {
  Object.defineProperty(e.config, "isNativeTag", {
    value: (t) => ti(t) || ni(t) || oi(t),
    writable: !1
  });
}
function nf(e) {
  {
    const t = e.config.isCustomElement;
    Object.defineProperty(e.config, "isCustomElement", {
      get() {
        return t;
      },
      set() {
        qe(
          "The `isCustomElement` config option is deprecated. Use `compilerOptions.isCustomElement` instead."
        );
      }
    });
    const n = e.config.compilerOptions, o = 'The `compilerOptions` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, `compilerOptions` must be passed to `@vue/compiler-dom` in the build setup instead.\n- For vue-loader: pass it via vue-loader\'s `compilerOptions` loader option.\n- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader\n- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc';
    Object.defineProperty(e.config, "compilerOptions", {
      get() {
        return qe(o), n;
      },
      set() {
        qe(o);
      }
    });
  }
}
function of(e) {
  if (G(e)) {
    const t = document.querySelector(e);
    return process.env.NODE_ENV !== "production" && !t && qe(
      `Failed to mount app: mount target selector "${e}" returned null.`
    ), t;
  }
  return process.env.NODE_ENV !== "production" && window.ShadowRoot && e instanceof window.ShadowRoot && e.mode === "closed" && qe(
    'mounting on a ShadowRoot with `{mode: "closed"}` may lead to unpredictable bugs'
  ), e;
}
/**
* vue v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function sf() {
  Sl();
}
process.env.NODE_ENV !== "production" && sf();
const rf = { class: "vue-widget-section" }, cf = { class: "vue-widget-title" }, lf = {
  key: 0,
  class: "vue-widget-description"
}, ff = /* @__PURE__ */ pc({
  __name: "App",
  props: {
    sdk: {}
  },
  setup(e) {
    const t = /* @__PURE__ */ Ci(e.sdk.getProps()), n = e.sdk.on("propsChanged", (o) => {
      t.value = o;
    });
    return Co(() => n()), (o, s) => (ro(), us("section", rf, [
      Mo("h3", cf, qn(t.value.title), 1),
      t.value.description ? (ro(), us("p", lf, qn(t.value.description), 1)) : hl("", !0)
    ]));
  }
});
async function af(e) {
  await e.whenReady();
  const t = Ql(ff, { sdk: e });
  t.mount(e.getContainer()), e.on("destroy", () => t.unmount());
}
export {
  af as init
};
