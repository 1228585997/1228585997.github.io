Array.prototype.findIndex || Object.defineProperty(Array.prototype, "findIndex", {
    value: function(e) {
        if (null == this) throw new TypeError("Array.prototype.findIndex called on null or undefined");
        if ("function" != typeof e) throw new TypeError("predicate must be a function");
        for (var r, n = Object(this), t = n.length >>> 0, o = arguments[1], i = 0; i < t; i++) if (r = n[i], 
        e.call(o, r, i, n)) return i;
        return -1;
    },
    enumerable: !1,
    configurable: !1,
    writable: !1
});