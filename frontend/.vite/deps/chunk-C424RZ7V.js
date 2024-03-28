// node_modules/proxy-compare/dist/index.modern.js
var e = Symbol();
var t = Symbol();
var r = "a";
var n = "w";
var o = (e2, t2) => new Proxy(e2, t2);
var s = Object.getPrototypeOf;
var c = /* @__PURE__ */ new WeakMap();
var l = (e2) => e2 && (c.has(e2) ? c.get(e2) : s(e2) === Object.prototype || s(e2) === Array.prototype);
var f = (e2) => "object" == typeof e2 && null !== e2;
var i = (e2) => {
  if (Array.isArray(e2))
    return Array.from(e2);
  const t2 = Object.getOwnPropertyDescriptors(e2);
  return Object.values(t2).forEach((e3) => {
    e3.configurable = true;
  }), Object.create(s(e2), t2);
};
var u = (e2) => e2[t] || e2;
var a = (s2, c2, f2, p2) => {
  if (!l(s2))
    return s2;
  let g = p2 && p2.get(s2);
  if (!g) {
    const e2 = u(s2);
    g = ((e3) => Object.values(Object.getOwnPropertyDescriptors(e3)).some((e4) => !e4.configurable && !e4.writable))(e2) ? [e2, i(e2)] : [e2], null == p2 || p2.set(s2, g);
  }
  const [y2, h2] = g;
  let w2 = f2 && f2.get(y2);
  return w2 && w2[1].f === !!h2 || (w2 = ((o2, s3) => {
    const c3 = { f: s3 };
    let l2 = false;
    const f3 = (e2, t2) => {
      if (!l2) {
        let s4 = c3[r].get(o2);
        if (s4 || (s4 = {}, c3[r].set(o2, s4)), e2 === n)
          s4[n] = true;
        else {
          let r2 = s4[e2];
          r2 || (r2 = /* @__PURE__ */ new Set(), s4[e2] = r2), r2.add(t2);
        }
      }
    }, i2 = { get: (e2, n2) => n2 === t ? o2 : (f3("k", n2), a(Reflect.get(e2, n2), c3[r], c3.c, c3.t)), has: (t2, n2) => n2 === e ? (l2 = true, c3[r].delete(o2), true) : (f3("h", n2), Reflect.has(t2, n2)), getOwnPropertyDescriptor: (e2, t2) => (f3("o", t2), Reflect.getOwnPropertyDescriptor(e2, t2)), ownKeys: (e2) => (f3(n), Reflect.ownKeys(e2)) };
    return s3 && (i2.set = i2.deleteProperty = () => false), [i2, c3];
  })(y2, !!h2), w2[1].p = o(h2 || y2, w2[0]), f2 && f2.set(y2, w2)), w2[1][r] = c2, w2[1].c = f2, w2[1].t = p2, w2[1].p;
};
var p = (e2, t2, r2, o2) => {
  if (Object.is(e2, t2))
    return false;
  if (!f(e2) || !f(t2))
    return true;
  const s2 = r2.get(u(e2));
  if (!s2)
    return true;
  if (o2) {
    const r3 = o2.get(e2);
    if (r3 && r3.n === t2)
      return r3.g;
    o2.set(e2, { n: t2, g: false });
  }
  let c2 = null;
  try {
    for (const r3 of s2.h || [])
      if (c2 = Reflect.has(e2, r3) !== Reflect.has(t2, r3), c2)
        return c2;
    if (true === s2[n]) {
      if (c2 = ((e3, t3) => {
        const r3 = Reflect.ownKeys(e3), n2 = Reflect.ownKeys(t3);
        return r3.length !== n2.length || r3.some((e4, t4) => e4 !== n2[t4]);
      })(e2, t2), c2)
        return c2;
    } else
      for (const r3 of s2.o || [])
        if (c2 = !!Reflect.getOwnPropertyDescriptor(e2, r3) != !!Reflect.getOwnPropertyDescriptor(t2, r3), c2)
          return c2;
    for (const n2 of s2.k || [])
      if (c2 = p(e2[n2], t2[n2], r2, o2), c2)
        return c2;
    return null === c2 && (c2 = true), c2;
  } finally {
    o2 && o2.set(e2, { n: t2, g: c2 });
  }
};
var y = (e2) => l(e2) && e2[t] || null;
var h = (e2, t2 = true) => {
  c.set(e2, t2);
};
var w = (e2, t2, r2) => {
  const o2 = [], s2 = /* @__PURE__ */ new WeakSet(), c2 = (e3, l2) => {
    if (s2.has(e3))
      return;
    f(e3) && s2.add(e3);
    const i2 = f(e3) && t2.get(u(e3));
    if (i2) {
      var a2, p2;
      if (null == (a2 = i2.h) || a2.forEach((e4) => {
        const t3 = `:has(${String(e4)})`;
        o2.push(l2 ? [...l2, t3] : [t3]);
      }), true === i2[n]) {
        const e4 = ":ownKeys";
        o2.push(l2 ? [...l2, e4] : [e4]);
      } else {
        var g;
        null == (g = i2.o) || g.forEach((e4) => {
          const t3 = `:hasOwn(${String(e4)})`;
          o2.push(l2 ? [...l2, t3] : [t3]);
        });
      }
      null == (p2 = i2.k) || p2.forEach((t3) => {
        r2 && !("value" in (Object.getOwnPropertyDescriptor(e3, t3) || {})) || c2(e3[t3], l2 ? [...l2, t3] : [t3]);
      });
    } else
      l2 && o2.push(l2);
  };
  return c2(e2), o2;
};

// node_modules/valtio/esm/vanilla.mjs
var isObject = (x) => typeof x === "object" && x !== null;
var proxyStateMap = /* @__PURE__ */ new WeakMap();
var refSet = /* @__PURE__ */ new WeakSet();
var buildProxyFunction = (objectIs = Object.is, newProxy = (target, handler) => new Proxy(target, handler), canProxy = (x) => isObject(x) && !refSet.has(x) && (Array.isArray(x) || !(Symbol.iterator in x)) && !(x instanceof WeakMap) && !(x instanceof WeakSet) && !(x instanceof Error) && !(x instanceof Number) && !(x instanceof Date) && !(x instanceof String) && !(x instanceof RegExp) && !(x instanceof ArrayBuffer), defaultHandlePromise = (promise) => {
  switch (promise.status) {
    case "fulfilled":
      return promise.value;
    case "rejected":
      throw promise.reason;
    default:
      throw promise;
  }
}, snapCache = /* @__PURE__ */ new WeakMap(), createSnapshot = (target, version, handlePromise = defaultHandlePromise) => {
  const cache = snapCache.get(target);
  if ((cache == null ? void 0 : cache[0]) === version) {
    return cache[1];
  }
  const snap = Array.isArray(target) ? [] : Object.create(Object.getPrototypeOf(target));
  h(snap, true);
  snapCache.set(target, [version, snap]);
  Reflect.ownKeys(target).forEach((key) => {
    if (Object.getOwnPropertyDescriptor(snap, key)) {
      return;
    }
    const value = Reflect.get(target, key);
    const desc = {
      value,
      enumerable: true,
      // This is intentional to avoid copying with proxy-compare.
      // It's still non-writable, so it avoids assigning a value.
      configurable: true
    };
    if (refSet.has(value)) {
      h(value, false);
    } else if (value instanceof Promise) {
      delete desc.value;
      desc.get = () => handlePromise(value);
    } else if (proxyStateMap.has(value)) {
      const [target2, ensureVersion] = proxyStateMap.get(
        value
      );
      desc.value = createSnapshot(
        target2,
        ensureVersion(),
        handlePromise
      );
    }
    Object.defineProperty(snap, key, desc);
  });
  return Object.preventExtensions(snap);
}, proxyCache = /* @__PURE__ */ new WeakMap(), versionHolder = [1, 1], proxyFunction = (initialObject) => {
  if (!isObject(initialObject)) {
    throw new Error("object required");
  }
  const found = proxyCache.get(initialObject);
  if (found) {
    return found;
  }
  let version = versionHolder[0];
  const listeners = /* @__PURE__ */ new Set();
  const notifyUpdate = (op, nextVersion = ++versionHolder[0]) => {
    if (version !== nextVersion) {
      version = nextVersion;
      listeners.forEach((listener) => listener(op, nextVersion));
    }
  };
  let checkVersion = versionHolder[1];
  const ensureVersion = (nextCheckVersion = ++versionHolder[1]) => {
    if (checkVersion !== nextCheckVersion && !listeners.size) {
      checkVersion = nextCheckVersion;
      propProxyStates.forEach(([propProxyState]) => {
        const propVersion = propProxyState[1](nextCheckVersion);
        if (propVersion > version) {
          version = propVersion;
        }
      });
    }
    return version;
  };
  const createPropListener = (prop) => (op, nextVersion) => {
    const newOp = [...op];
    newOp[1] = [prop, ...newOp[1]];
    notifyUpdate(newOp, nextVersion);
  };
  const propProxyStates = /* @__PURE__ */ new Map();
  const addPropListener = (prop, propProxyState) => {
    if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production" && propProxyStates.has(prop)) {
      throw new Error("prop listener already exists");
    }
    if (listeners.size) {
      const remove = propProxyState[3](createPropListener(prop));
      propProxyStates.set(prop, [propProxyState, remove]);
    } else {
      propProxyStates.set(prop, [propProxyState]);
    }
  };
  const removePropListener = (prop) => {
    var _a;
    const entry = propProxyStates.get(prop);
    if (entry) {
      propProxyStates.delete(prop);
      (_a = entry[1]) == null ? void 0 : _a.call(entry);
    }
  };
  const addListener = (listener) => {
    listeners.add(listener);
    if (listeners.size === 1) {
      propProxyStates.forEach(([propProxyState, prevRemove], prop) => {
        if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production" && prevRemove) {
          throw new Error("remove already exists");
        }
        const remove = propProxyState[3](createPropListener(prop));
        propProxyStates.set(prop, [propProxyState, remove]);
      });
    }
    const removeListener = () => {
      listeners.delete(listener);
      if (listeners.size === 0) {
        propProxyStates.forEach(([propProxyState, remove], prop) => {
          if (remove) {
            remove();
            propProxyStates.set(prop, [propProxyState]);
          }
        });
      }
    };
    return removeListener;
  };
  const baseObject = Array.isArray(initialObject) ? [] : Object.create(Object.getPrototypeOf(initialObject));
  const handler = {
    deleteProperty(target, prop) {
      const prevValue = Reflect.get(target, prop);
      removePropListener(prop);
      const deleted = Reflect.deleteProperty(target, prop);
      if (deleted) {
        notifyUpdate(["delete", [prop], prevValue]);
      }
      return deleted;
    },
    set(target, prop, value, receiver) {
      const hasPrevValue = Reflect.has(target, prop);
      const prevValue = Reflect.get(target, prop, receiver);
      if (hasPrevValue && (objectIs(prevValue, value) || proxyCache.has(value) && objectIs(prevValue, proxyCache.get(value)))) {
        return true;
      }
      removePropListener(prop);
      if (isObject(value)) {
        value = y(value) || value;
      }
      let nextValue = value;
      if (value instanceof Promise) {
        value.then((v) => {
          value.status = "fulfilled";
          value.value = v;
          notifyUpdate(["resolve", [prop], v]);
        }).catch((e2) => {
          value.status = "rejected";
          value.reason = e2;
          notifyUpdate(["reject", [prop], e2]);
        });
      } else {
        if (!proxyStateMap.has(value) && canProxy(value)) {
          nextValue = proxyFunction(value);
        }
        const childProxyState = !refSet.has(nextValue) && proxyStateMap.get(nextValue);
        if (childProxyState) {
          addPropListener(prop, childProxyState);
        }
      }
      Reflect.set(target, prop, nextValue, receiver);
      notifyUpdate(["set", [prop], value, prevValue]);
      return true;
    }
  };
  const proxyObject = newProxy(baseObject, handler);
  proxyCache.set(initialObject, proxyObject);
  const proxyState = [
    baseObject,
    ensureVersion,
    createSnapshot,
    addListener
  ];
  proxyStateMap.set(proxyObject, proxyState);
  Reflect.ownKeys(initialObject).forEach((key) => {
    const desc = Object.getOwnPropertyDescriptor(
      initialObject,
      key
    );
    if ("value" in desc) {
      proxyObject[key] = initialObject[key];
      delete desc.value;
      delete desc.writable;
    }
    Object.defineProperty(baseObject, key, desc);
  });
  return proxyObject;
}) => [
  // public functions
  proxyFunction,
  // shared state
  proxyStateMap,
  refSet,
  // internal things
  objectIs,
  newProxy,
  canProxy,
  defaultHandlePromise,
  snapCache,
  createSnapshot,
  proxyCache,
  versionHolder
];
var [defaultProxyFunction] = buildProxyFunction();
function proxy(initialObject = {}) {
  return defaultProxyFunction(initialObject);
}
function subscribe(proxyObject, callback, notifyInSync) {
  const proxyState = proxyStateMap.get(proxyObject);
  if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production" && !proxyState) {
    console.warn("Please use proxy object");
  }
  let promise;
  const ops = [];
  const addListener = proxyState[3];
  let isListenerActive = false;
  const listener = (op) => {
    ops.push(op);
    if (notifyInSync) {
      callback(ops.splice(0));
      return;
    }
    if (!promise) {
      promise = Promise.resolve().then(() => {
        promise = void 0;
        if (isListenerActive) {
          callback(ops.splice(0));
        }
      });
    }
  };
  const removeListener = addListener(listener);
  isListenerActive = true;
  return () => {
    isListenerActive = false;
    removeListener();
  };
}
function snapshot(proxyObject, handlePromise) {
  const proxyState = proxyStateMap.get(proxyObject);
  if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production" && !proxyState) {
    console.warn("Please use proxy object");
  }
  const [target, ensureVersion, createSnapshot] = proxyState;
  return createSnapshot(target, ensureVersion(), handlePromise);
}
function ref(obj) {
  refSet.add(obj);
  return obj;
}

export {
  a,
  p,
  w,
  proxy,
  subscribe,
  snapshot,
  ref
};
//# sourceMappingURL=chunk-C424RZ7V.js.map