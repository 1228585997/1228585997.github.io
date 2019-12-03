var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

module.exports = function(n) {
    function e(t) {
        if (r[t]) return r[t].exports;
        var o = r[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return n[t].call(o.exports, o, o.exports, e), o.l = !0, o.exports;
    }
    var r = {};
    return e.m = n, e.c = r, e.d = function(t, n, r) {
        e.o(t, n) || Object.defineProperty(t, n, {
            enumerable: !0,
            get: r
        });
    }, e.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, e.t = function(n, r) {
        if (1 & r && (n = e(n)), 8 & r) return n;
        if (4 & r && "object" == (void 0 === n ? "undefined" : t(n)) && n && n.__esModule) return n;
        var o = Object.create(null);
        if (e.r(o), Object.defineProperty(o, "default", {
            enumerable: !0,
            value: n
        }), 2 & r && "string" != typeof n) for (var i in n) e.d(o, i, function(t) {
            return n[t];
        }.bind(null, i));
        return o;
    }, e.n = function(t) {
        var n = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return e.d(n, "a", n), n;
    }, e.o = function(t, n) {
        return Object.prototype.hasOwnProperty.call(t, n);
    }, e.p = "", e(e.s = 4);
}([ function(t, n, e) {
    for (var r = function() {
        function t(n) {
            !function(t, n) {
                if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function");
            }(this, t), this.domain = n;
        }
        return t.prototype.host = function() {
            return "https://" + this.domain;
        }, t.prototype.url = function(t) {
            return t ? (t.startsWith("/") || (t = "/" + t), this.host() + t) : this.host();
        }, t;
    }(), o = {}, i = [ "wxpt", "shop", "m", "tuan", "mapi", "api", "mtrade", "muser", "mact", "api" ], u = 0; u < i.length; u++) o[i[u]] = new r(i[u] + ".juanpi.com");
    o.detailApi = new r("detail-api.juanpi.com"), t.exports = o;
}, function(t, n, e) {
    function r() {
        var t = wx.getStorageSync("cache_jp_id");
        return t || (t = new Date().getTime() + "" + Math.random(), wx.setStorageSync("cache_jp_id", t)), 
        t;
    }
    var o = Object.assign || function(t) {
        for (var n = 1; n < arguments.length; n++) {
            var e = arguments[n];
            for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        }
        return t;
    }, i = wx.getSystemInfoSync(), u = i.system, a = i.model, c = {
        jpSystemVersion: u,
        jpPlatform: ~u.toLowerCase().indexOf("android") ? "Android_xcx" : "iPhone_xcx",
        jpDeviceName: a,
        jpAppNetwork: "unknown",
        jpTicks: 0
    }, s = function() {
        function t(n) {
            !function(t, n) {
                if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function");
            }(this, t);
            var e = n || {}, r = e.appName, o = e.appVersion;
            this.appName = r, this.appVersion = o;
        }
        return t.prototype.extendArgs = function(t) {
            return Object.assign({
                jpAppName: this.appName,
                jpAppVersion: this.appVersion
            }, t);
        }, t.prototype.getArgsAsync = function() {
            return function(t) {
                return new Promise(function(n) {
                    wx.getNetworkType({
                        success: function(e) {
                            n(Object.assign({}, t, {
                                jpAppNetwork: e.networkType
                            }));
                        },
                        fail: function() {
                            n(t);
                        }
                    });
                });
            }(this.getArgsSync());
        }, t.prototype.getArgsSync = function() {
            return this.extendArgs(o({}, c, {
                jpDid: r(),
                jpId: r(),
                jpSign: wx.getStorageSync("jpSign"),
                jpUid: wx.getStorageSync("uid") || "0"
            }));
        }, t;
    }();
    t.exports = s;
}, function(t, n, e) {
    var r = {
        hasLocalUid: function() {
            var t = this.getLocalUid();
            return !(!t || 0 == t);
        },
        getLocalUid: function() {
            return wx.getStorageSync("uid");
        },
        setLocalUid: function(t) {
            wx.setStorageSync("uid", t || "");
        },
        wxLogin: function(t, n) {
            return new Promise(function(e, r) {
                wx.login({
                    timeout: t,
                    success: e,
                    fail: r,
                    complete: n
                });
            });
        },
        wxGetSetting: function(t) {
            return new Promise(function(n, e) {
                wx.getSetting({
                    success: n,
                    fail: e,
                    complete: t
                });
            });
        },
        hasAuthorizedScope: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "userInfo";
            return this.wxGetSetting().then(function(n) {
                return !!n.authSetting["scope." + t];
            });
        }
    };
    t.exports = r;
}, function(t, n, e) {
    var r = Object.assign || function(t) {
        for (var n = 1; n < arguments.length; n++) {
            var e = arguments[n];
            for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        }
        return t;
    };
    t.exports = function(t) {
        var n = void 0, e = new Promise(function(e, o) {
            n = wx.request(r({}, t, {
                success: function(t) {
                    var n = t.data;
                    n || (n = {}), 1e3 == n.code ? e(n.data) : o({
                        code: n.code,
                        errMsg: n.info || n.msg || ""
                    });
                },
                fail: function(t) {
                    o(t);
                }
            }));
        });
        return e.requestTask = n, e;
    };
}, function(t, n, e) {
    var r = Object.assign || function(t) {
        for (var n = 1; n < arguments.length; n++) {
            var e = arguments[n];
            for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        }
        return t;
    }, o = e(5), i = e(6), u = i.patchPage, a = i.patchComponent, c = e(1), s = e(7), f = e(2), l = e(8), d = e(9), p = e(11), v = e(0), h = e(3), g = e(13), y = function() {
        var t = new s("zhe");
        return function(n) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "png";
            return t.url(n, e);
        };
    }(), m = new c({
        appName: "zhe",
        appVersion: "4.7.3"
    }), b = Object.assign({}, o), _ = {
        LOGIN: "login"
    };
    t.exports = {
        EVTS: _,
        appDevName: "zhe",
        appName: "zhe",
        appVersion: "4.7.3",
        bus: b,
        checkJPLoginState: function() {
            return new Promise(function(t) {
                wx.checkSession({
                    success: function() {
                        return t(l());
                    },
                    fail: function() {
                        wx.removeStorageSync("uid"), t(!1);
                    }
                });
            }).then(function(t) {
                return t || b.pub(_.LOGIN, {
                    success: !1
                }), t;
            });
        },
        commonArguments: m,
        identity: f,
        imageUrl: y,
        loginToJP: function() {
            return d().then(function() {
                b.pub(_.LOGIN, {
                    success: !0
                });
            });
        },
        patchComponent: a,
        patchPage: u,
        request: function(t) {
            t || (t = {});
            var n = t.data;
            return (n = r({}, m.getArgsSync(), {
                xcx_sign: wx.getStorageSync("xcx_sign")
            }, n)).apisign = p(n), t.data = n, h(t);
        },
        signApi: p,
        sites: v,
        spy: g
    };
}, function(n, e, r) {
    "undefined" != typeof self && self, n.exports = function(n) {
        function e(t) {
            if (r[t]) return r[t].exports;
            var o = r[t] = {
                i: t,
                l: !1,
                exports: {}
            };
            return n[t].call(o.exports, o, o.exports, e), o.l = !0, o.exports;
        }
        var r = {};
        return e.m = n, e.c = r, e.d = function(t, n, r) {
            e.o(t, n) || Object.defineProperty(t, n, {
                enumerable: !0,
                get: r
            });
        }, e.r = function(t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(t, "__esModule", {
                value: !0
            });
        }, e.t = function(n, r) {
            if (1 & r && (n = e(n)), 8 & r) return n;
            if (4 & r && "object" == (void 0 === n ? "undefined" : t(n)) && n && n.__esModule) return n;
            var o = Object.create(null);
            if (e.r(o), Object.defineProperty(o, "default", {
                enumerable: !0,
                value: n
            }), 2 & r && "string" != typeof n) for (var i in n) e.d(o, i, function(t) {
                return n[t];
            }.bind(null, i));
            return o;
        }, e.n = function(t) {
            var n = t && t.__esModule ? function() {
                return t.default;
            } : function() {
                return t;
            };
            return e.d(n, "a", n), n;
        }, e.o = function(t, n) {
            return Object.prototype.hasOwnProperty.call(t, n);
        }, e.p = "", e(e.s = 0);
    }([ function(t, n, e) {
        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var o = r(e(1)), i = e(4), u = r(i), a = r(e(5)), c = e(2), s = {
            hasSub: function(t, n, e) {
                var r = this._armorPubSub;
                if ((0, c.isEmptyArray)(r)) return !1;
                var o = e || {}, i = o.ns, u = o.ctx, a = void 0;
                for (a = 0; a < r.length; a++) {
                    var s = r[a], f = s.topic, l = s.callback, d = s.ns, p = s.ctx;
                    if (!(void 0 != t && t !== f || void 0 != n && n !== l || void 0 != i && i !== d || u && u !== p)) return !0;
                }
                return !1;
            },
            sub: function(t, n, e) {
                if ((0, c.isFunction)(n)) {
                    var r = e || {}, u = r.ns, a = r.ctx, s = (0, o.default)(this, t, n, {
                        ns: u,
                        ctx: a
                    });
                    return function() {
                        return (0, i.unsubscribeByIdInQueue)(s);
                    };
                }
            },
            subOnce: function(t, n, e) {
                if ((0, c.isFunction)(n)) {
                    var r = e || {}, u = r.ns, a = r.ctx, s = (0, o.default)(this, t, n, {
                        ns: u,
                        ctx: a,
                        once: !0
                    });
                    return function() {
                        return (0, i.unsubscribeByIdInQueue)(s);
                    };
                }
            },
            pub: function(t, n, e) {
                return (0, a.default)(t, n, e);
            },
            unsub: function(t, n, e) {
                return (0, u.default)(this, t, n, e);
            }
        };
        t.exports = s;
    }, function(t, n, e) {
        n.__esModule = !0, n.default = function(t, n, e, i) {
            var u = i || {}, a = u.once, c = u.ns, s = u.ctx;
            c = (0, r.safeNs)(c), n = (0, r.safeTopic)(n), s || (s = t);
            var f = (0, o.getRegistry)(c, !0), l = f[n] || (f[n] = []), d = (0, r.subId)(), p = {
                id: d,
                callback: e,
                ctx: s,
                ns: c,
                once: a,
                subscriber: t,
                topic: n
            };
            return o.book.register(p), l.push(p), (t._armorPubSub || (t._armorPubSub = [])).push(p), 
            d;
        };
        var r = e(2), o = e(3);
    }, function(t, n, e) {
        n.__esModule = !0, n.safeNs = function(t) {
            return void 0 == t ? "default" : t;
        }, n.safeTopic = function(t) {
            return void 0 == t ? "" : t;
        }, n.isString = function(t) {
            return "string" == typeof t;
        }, n.isEmptyArray = function(t) {
            return !t || 0 === t.length;
        }, n.isFunction = function(t) {
            return "function" == typeof t;
        }, n.queue = function() {
            var t = [], n = !1, e = void 0;
            return function(r) {
                if (t.push(r), n) return e;
                var o = void 0, i = void 0;
                e = new Promise(function(t, n) {
                    o = t, i = n;
                }), n = !0, r = t.shift();
                try {
                    for (;r; ) {
                        var u;
                        (u = r).fn.apply(u, r.args), r = t.shift();
                    }
                    n = !1, o();
                } catch (t) {
                    n = !1, i(t);
                }
                return e;
            };
        }(), n.subId = function() {
            var t = 0;
            return function() {
                return ++t;
            };
        }();
    }, function(t, n, e) {
        n.__esModule = !0, n.namespaces = n.book = void 0, n.registerSubscribing = function(t) {
            var n = t.id;
            SUBSCRIBINGS[n] = t;
        }, n.getRegistry = function(t, n) {
            t = (0, r.safeNs)(t);
            var e = o[t];
            return !e && n && (e = o[t] = {}), e;
        }, n.removeRegistry = function(t) {
            delete o[t];
        };
        var r = e(2);
        n.book = {
            subscribings: {},
            register: function(t) {
                var n = t.id;
                this.subscribings[n] = t;
            },
            get: function(t) {
                return this.subscribings[t];
            },
            remove: function(t) {
                var n = this.subscribings[t];
                return n && delete this.subscribings[t], n;
            }
        };
        var o = n.namespaces = {
            default: {}
        };
    }, function(t, n, e) {
        function r(t, n, e, r) {
            var u = t._armorPubSub;
            if (!(0, i.isEmptyArray)(u)) {
                var a = r || {}, c = a.ns, s = a.ctx, f = [], l = void 0, d = void 0;
                for (d = 0; d < u.length; d++) {
                    var p = l = u[d], v = p.topic, h = p.callback, g = p.ns, y = p.ctx;
                    void 0 != n && n !== v || void 0 != e && e !== h || void 0 != c && c !== g || s && s !== y || f.push(l);
                }
                for (d = 0; d < f.length; d++) o(f[d].id);
            }
        }
        function o(t) {
            var n = u.book.get(t);
            n && (u.book.remove(t), function(t) {
                var n = t.ns, e = t.id, r = t.topic, o = (0, u.getRegistry)(n);
                if (o) {
                    var i = o[r];
                    if (i) {
                        var a = i.findIndex(function(t) {
                            return t.id === e;
                        });
                        i.splice(a, 1), 0 === i.length && (delete o[r], 0 === Object.keys(o).length && (0, 
                        u.removeRegistry)(n));
                    }
                }
            }(n), function(t) {
                var n = t.id, e = t.subscriber._armorPubSub;
                if (e) {
                    var r = e.findIndex(function(t) {
                        return t.id === n;
                    });
                    e.splice(r, 1);
                }
            }(n));
        }
        n.__esModule = !0, n.unsubscribeById = o, n.unsubscribeByIdInQueue = function(t) {
            return (0, i.queue)({
                fn: o,
                args: [ t ]
            });
        }, n.default = function(t, n, e, o) {
            return (0, i.queue)({
                fn: r,
                args: [ t, n, e, o ]
            });
        };
        var i = e(2), u = e(3);
    }, function(t, n, e) {
        function r(t, n) {
            var e = t.callback, r = t.ctx;
            e.call(r, n);
        }
        function o(t, n) {
            setTimeout(function() {
                r(t, n);
            });
        }
        function i(t, n, e) {
            var i = e || {}, s = i.ns, f = i.sync;
            s = (0, u.safeNs)(s), t = (0, u.safeTopic)(t);
            var l = (0, a.getRegistry)(s);
            if (l) {
                var d = l[t];
                if (!(0, u.isEmptyArray)(d)) {
                    for (var p = [], v = f ? r : o, h = 0, g = void 0; h < d.length; ) v(g = d[h++], n), 
                    g.once && p.push(g);
                    for (var y = 0; y < p.length; y++) (0, c.unsubscribeById)(p[y].id);
                }
            }
        }
        n.__esModule = !0, n.default = function(t, n, e) {
            return (0, u.queue)({
                fn: i,
                args: [ t, n, e ]
            });
        };
        var u = e(2), a = e(3), c = e(4);
    } ]);
}, function(n, e, r) {
    "undefined" != typeof self && self, n.exports = function(n) {
        function e(t) {
            if (r[t]) return r[t].exports;
            var o = r[t] = {
                i: t,
                l: !1,
                exports: {}
            };
            return n[t].call(o.exports, o, o.exports, e), o.l = !0, o.exports;
        }
        var r = {};
        return e.m = n, e.c = r, e.d = function(t, n, r) {
            e.o(t, n) || Object.defineProperty(t, n, {
                enumerable: !0,
                get: r
            });
        }, e.r = function(t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(t, "__esModule", {
                value: !0
            });
        }, e.t = function(n, r) {
            if (1 & r && (n = e(n)), 8 & r) return n;
            if (4 & r && "object" == (void 0 === n ? "undefined" : t(n)) && n && n.__esModule) return n;
            var o = Object.create(null);
            if (e.r(o), Object.defineProperty(o, "default", {
                enumerable: !0,
                value: n
            }), 2 & r && "string" != typeof n) for (var i in n) e.d(o, i, function(t) {
                return n[t];
            }.bind(null, i));
            return o;
        }, e.n = function(t) {
            var n = t && t.__esModule ? function() {
                return t.default;
            } : function() {
                return t;
            };
            return e.d(n, "a", n), n;
        }, e.o = function(t, n) {
            return Object.prototype.hasOwnProperty.call(t, n);
        }, e.p = "", e(e.s = 0);
    }([ function(t, n, e) {
        var r = e(1), o = e(6);
        t.exports = {
            patchComponent: o.patchComponent,
            patchPage: r.patchPage
        };
    }, function(t, n, e) {
        n.__esModule = !0, n.patchPage = function(t, n) {
            if (t.__patchPage) return t;
            var e = !1, a = (n || {}).debug, c = function(n) {
                (n = Object.assign({}, n)).__computed = (0, r.initializeComputed)(n.computed || {});
                var c = n, s = c.onLoad, f = c.watch;
                return n.onLoad = function(t) {
                    if (!this.$setData) {
                        this.__setData = this.setData, this.$setData = this.updateData = function(t, n) {
                            return (0, o.default)(t, n, {
                                ctx: this
                            });
                        };
                        var n = (0, r.evaluateComputed)(this, null, {
                            initial: !0
                        });
                        this.__setData(n), this.__watch = (0, u.initializeWatchers)(this, f || {});
                        try {
                            e || (this.setData = this.$setData);
                        } catch (t) {
                            e = !0, a && (console.log(t), console.log("using this.$setData instead of this.setData to support watch and computed features."));
                        }
                    }
                    (0, i.isFunction)(s) && s.call(this, t);
                }, t(n);
            };
            return c.__patchPage = !0, c;
        };
        var r = e(2), o = function(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }(e(4)), i = e(3), u = e(5);
    }, function(t, n, e) {
        n.__esModule = !0, n.initializeComputed = function(t) {
            var n = [], e = void 0, o = void 0;
            for (e in t) if (o = t[e], (0, r.isFunction)(o)) n.push({
                name: e,
                require: [],
                fn: o
            }); else if ((0, r.isObject)(o)) {
                var i = o, u = i.require, a = void 0 === u ? [] : u, c = i.fn;
                (0, r.isFunction)(c) && n.push({
                    name: e,
                    require: a,
                    fn: c
                });
            }
            return n.length > 1 && n.sort(function(t, n) {
                return ~n.require.indexOf(t.name) ? -1 : ~t.require.indexOf(n.name) ? 1 : 0;
            }), n;
        }, n.evaluateComputed = function(t, n, e) {
            var o = (e || {}).initial, i = {}, u = t.__computed, a = void 0;
            if (u && u.length) if (o) for (var c in u) {
                var s = u[c], f = s.fn, l = s.require, d = s.name;
                a = l.reduce(function(n, e) {
                    var o = (0, r.result)(t.data, e), u = o.key, a = o.value;
                    return n[e] = u ? a : (0, r.result)(i, e).value, n;
                }, {}), i[d] = f.call(t, a);
            } else {
                var p = Object.keys(n);
                if (p.length) {
                    var v = {}, h = p.map(function(t) {
                        return v[t] = (0, r.pathToArray)(t);
                    });
                    for (var g in u) {
                        var y = u[g], f = y.fn, l = y.require, d = y.name;
                        l.length && function() {
                            var n = !1, e = void 0, o = void 0;
                            for (var u in l) if (e = l[u], o = v[e] || (v[e] = (0, r.pathToArray)(e)), ~h.findIndex(function(t) {
                                return (0, r.isUpstream)(o, t);
                            })) {
                                h.push(v[d] || (v[d] = (0, r.pathToArray)(d))), n = !0;
                                break;
                            }
                            n && (a = l.reduce(function(n, e) {
                                var o = (0, r.result)(i, e), u = o.key, a = o.value;
                                return n[e] = u ? a : (0, r.result)(t.__data || t.data, e).value, n;
                            }, {}), i[d] = f.call(t, a));
                        }();
                    }
                }
            }
            return i;
        };
        var r = e(3);
    }, function(n, e, r) {
        function o(t) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            if (t = s(t), d(t)) return o(t = f(t), n);
            if (l(t)) {
                var e = /^\[(\d+)\]/.exec(t);
                if (e) return n.push({
                    name: e[1],
                    type: "array"
                }), e[0] === t ? n : o(t.slice(e[0].length), n);
                throw Error("Only number 0-9 could inside []");
            }
            var r = /^([^\[\.]+)/.exec(t);
            return r ? (n.push({
                name: r[1],
                type: "object"
            }), r[0] === t ? n : o(t.slice(r[0].length), n)) : n;
        }
        function i(t) {
            return c(t) ? "array" : a(t) ? "object" : "other";
        }
        e.__esModule = !0;
        var u = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(n) {
            return void 0 === n ? "undefined" : t(n);
        } : function(n) {
            return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : void 0 === n ? "undefined" : t(n);
        };
        e.result = function(t, n) {
            if (!t) return {
                key: !1
            };
            if (t.hasOwnProperty(n)) return {
                key: !0,
                value: t[n],
                path: [ n ]
            };
            n = p(n);
            var e = void 0;
            for (var r in n) {
                if (!a(t) || !t.hasOwnProperty(n[r])) return {
                    key: !1
                };
                t = e = t[n[r]];
            }
            return {
                key: !0,
                value: e,
                path: n
            };
        }, e.setResult = function(t, n, e) {
            var r = t, u = void 0, a = void 0;
            if (!(n = o(n)).length) throw Error("Path can not be empty");
            for (var c in n) {
                var s = n[c], f = s.name, l = s.type;
                if (0 == c) {
                    if ("array" === l) throw Error("Path can not start with []");
                } else i(t) !== l && (t = u[a] = "array" === l ? [] : {});
                t = (u = t)[f], a = f;
            }
            return u[a] = e, r;
        }, e.isUpstream = function(t, n, e) {
            if (t.length > n.length) return !1;
            if (e && t.length === n.length) return !1;
            for (var r in t) if (t[r] !== n[r]) return !1;
            return !0;
        }, e.hasIntersection = function(t, n) {
            for (var e in t) if (t[e] === n[e]) return !0;
            return !1;
        };
        var a = e.isObject = function(t) {
            return null !== t && "object" === (void 0 === t ? "undefined" : u(t));
        }, c = (e.isFunction = function(t) {
            return "function" == typeof t;
        }, e.isString = function(t) {
            return "string" == typeof t;
        }, e.isArray = function(t) {
            return t && t.constructor === Array;
        }), s = e.trim = function(t) {
            return t.replace(/(^\s+)|(\s+$)/g, "");
        }, f = function(t) {
            return t.replace(/^\.|\.$/g, "");
        }, l = function(t) {
            return /^\[/.test(t);
        }, d = function(t) {
            return /^\./.test(t);
        }, p = e.pathToArray = function(t) {
            return o(t).map(function(t) {
                return t.name;
            });
        };
    }, function(t, n, e) {
        function r(t, n) {
            for (var e in n) (0, i.setResult)(t, e, n[e]);
        }
        n.__esModule = !0;
        var o = Object.assign || function(t) {
            for (var n = 1; n < arguments.length; n++) {
                var e = arguments[n];
                for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
            }
            return t;
        };
        n.default = function(t, n, e) {
            if ((0, i.isObject)(t)) {
                var c = e.ctx, s = e.initial, f = c.__changing;
                c.__changing = !0, f || (c.__data = o({}, c.data), c.__changed = {}, c.__unchanged = {});
                for (var l = Object.keys(t), d = {}, p = void 0, v = void 0, h = 0; h < l.length; h++) v = l[h], 
                (0, i.result)(c.__data, v).value !== (p = t[v]) ? d[v] = p : c.__unchanged[v] = p;
                Object.assign(c.__changed, d), r(c.__data, t);
                var g = (0, u.evaluateComputed)(c, d, {
                    initial: s
                });
                if (Object.assign(c.__changed, g), r(c.__data, g), f) return c.__data;
                var y = {};
                for (var m in c.__changed) {
                    var b = (0, i.result)(c.__data, m), _ = b.key, x = b.value;
                    _ && (y[m] = x);
                }
                var S = Object.assign(c.__unchanged, y);
                c.__changing = !1, c.__data = null, c.__changed = null, c.__unchanged = null, c.__setData(S, n), 
                (0, a.default)(c, y);
            }
        };
        var i = e(3), u = e(2), a = function(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }(e(5));
    }, function(t, n, e) {
        n.__esModule = !0, n.initializeWatchers = function(t, n) {
            var e = {}, o = void 0;
            for (var i in n) o = n[i], (0, r.isFunction)(o) && (e[i] = {
                cb: o,
                value: (0, r.result)(t.data, i).value,
                path: (0, r.pathToArray)(i)
            });
            return e;
        }, n.default = function(t, n) {
            var e = t.__watch, o = e ? Object.keys(e) : [], i = Object.keys(n), u = {}, a = void 0;
            if (o.length && i.length) {
                for (var c in e) !function(o) {
                    var i = a = e[o], c = i.cb, s = i.value, f = i.path;
                    for (var l in n) (0, r.hasIntersection)(f, u[l] || (u[l] = (0, r.pathToArray)(l))) && function() {
                        var n = (0, r.result)(t.data, o).value;
                        n !== s && (a.value = n, setTimeout(function() {
                            return c.call(t, n, s);
                        }));
                    }();
                }(c);
            }
        };
        var r = e(3);
    }, function(t, n, e) {
        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        n.__esModule = !0, n.patchComponent = function(t, n) {
            if (t.__patchComponent) return t;
            var e = !1, r = (n || {}).debug, s = function(n) {
                (n = Object.assign({}, n)).properties = function(t) {
                    for (var n in t) !function(n) {
                        var e = t[n];
                        ((0, u.isFunction)(e) || null === e) && (e = t[n] = {
                            type: e
                        });
                        var r = e.observer;
                        e.observer = function(t, e, i) {
                            var a, s, f = (0, o.evaluateComputed)(this, ((a = {})[n] = t, a));
                            Object.keys(f).length && this.$setData(f), (0, c.default)(this, ((s = {})[n] = t, 
                            s)), (0, u.isFunction)(r) && r.call(this, t, e, i);
                        };
                    }(n);
                    return t;
                }(n.properties || {});
                var s = n.lifetimes || n, f = s.attached, l = s.created, d = s.watch, p = function() {
                    this.$setData || (this.$setData = function() {
                        return this.setData.call(this, arguments);
                    }), (0, u.isFunction)(l) && l.apply(this, arguments);
                }, v = function() {
                    if (!this.$setData || !this.$setData.__attached) {
                        this.__setData = this.setData, this.$setData = this.updateData = function(t, n) {
                            return (0, i.default)(t, n, {
                                ctx: this
                            });
                        }, this.$setData.__attached = !0, this.__computed = (0, o.initializeComputed)(n.computed || {});
                        var t = (0, o.evaluateComputed)(this, null, {
                            initial: !0
                        });
                        this.__setData(t), this.__watch = (0, a.initializeWatchers)(this, d || {});
                        try {
                            e || (this.setData = this.$setData);
                        } catch (t) {
                            e = !0, r && (console.log(t), console.log("using this.$setData instead of this.setData to support watch and computed features."));
                        }
                    }
                    (0, u.isFunction)(f) && f.apply(this, arguments);
                };
                return n.lifetimes ? (n.lifetimes.attached = v, n.lifetimes.created = p) : (n.attached = v, 
                n.created = p), t(n);
            };
            return s.__patchComponent = !0, s;
        };
        var o = e(2), i = r(e(4)), u = e(3), a = e(5), c = r(a);
    } ]);
}, function(t, n, e) {
    var r = function() {
        function t(n) {
            !function(t, n) {
                if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function");
            }(this, t), this.appName = n;
        }
        return t.prototype.url = function(t) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "png", e = arguments[2];
            return t.startsWith("/") || (t = "/" + t), n ? n.startsWith(".") || (n = "." + n) : n = "", 
            "https://jp.juancdn.com/xcx_images/apps/" + (void 0 == e ? this.appName : e) + t + n;
        }, t;
    }();
    t.exports = r;
}, function(t, n, e) {
    var r = function(t) {
        return t && t.__esModule ? t : {
            default: t
        };
    }(e(0)).default.mapi.url("/game/history_list");
    t.exports = function() {
        var t = wx.getStorageSync("uid");
        return t && 0 != t ? getApp().deps.request({
            url: r
        }).then(function() {
            return Promise.resolve(!0);
        }).catch(function(t) {
            var n = 2001 != t.code;
            return n || wx.removeStorageSync("uid"), Promise.resolve(n);
        }) : Promise.resolve(!1);
    };
}, function(t, n, e) {
    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        };
    }
    var o = r(e(0)), i = r(e(2)), u = r(e(10)), a = o.default.muser.url("/oauth/xcxAccess"), c = o.default.muser.url("/favorite/goods_list_id"), s = {
        "content-type": "application/x-www-form-urlencoded"
    };
    t.exports = function() {
        var t = getApp().deps.request;
        return i.default.wxLogin().then(function(n) {
            var e = n.code;
            return new Promise(function(t) {
                return wx.getUserInfo({
                    success: t
                });
            }).then(function(n) {
                var r = {
                    code: e,
                    user_info: encodeURIComponent(JSON.stringify(n)),
                    session_id: wx.getStorageSync("session_id"),
                    jpUid: 0
                };
                return t({
                    url: a,
                    data: r,
                    method: "POST",
                    header: s
                }).then(function(t) {
                    var n = t.unionid, e = t.session_id, r = t.openid, o = t.session_key, i = t.sign, a = t.username, c = t.uid, s = t.xcx_sign, f = t.uname;
                    (0, u.default)({
                        unionId: n,
                        session_id: e,
                        openid: r,
                        session_key: o,
                        jpSign: i,
                        wxname: a
                    }), c && (0, u.default)({
                        uid: c,
                        xcx_sign: s,
                        uname: f
                    });
                }).then(function() {
                    return t({
                        url: c,
                        method: "POST",
                        header: s
                    });
                });
            });
        });
    };
}, function(t, n, e) {
    t.exports = function(t) {
        if (t) for (var n in t) t.hasOwnProperty(n) && wx.setStorageSync(n, t[n]);
    };
}, function(t, n, e) {
    var r = e(12);
    t.exports = function(t) {
        var n = Object.keys(t).sort().map(function(n) {
            return n + "=" + t[n];
        });
        return r(n.join("&") + "juanpi_oauth#$A.*$%(#$%16rwtr712^");
    };
}, function(t, n, e) {
    var r;
    "function" == typeof Symbol && Symbol.iterator, function(o) {
        function i(t, n) {
            var e = (65535 & t) + (65535 & n);
            return (t >> 16) + (n >> 16) + (e >> 16) << 16 | 65535 & e;
        }
        function u(t, n, e, r, o, u) {
            return i(function(t, n) {
                return t << n | t >>> 32 - n;
            }(i(i(n, t), i(r, u)), o), e);
        }
        function a(t, n, e, r, o, i, a) {
            return u(n & e | ~n & r, t, n, o, i, a);
        }
        function c(t, n, e, r, o, i, a) {
            return u(n & r | e & ~r, t, n, o, i, a);
        }
        function s(t, n, e, r, o, i, a) {
            return u(n ^ e ^ r, t, n, o, i, a);
        }
        function f(t, n, e, r, o, i, a) {
            return u(e ^ (n | ~r), t, n, o, i, a);
        }
        function l(t, n) {
            t[n >> 5] |= 128 << n % 32, t[14 + (n + 64 >>> 9 << 4)] = n;
            var e, r, o, u, l, d = 1732584193, p = -271733879, v = -1732584194, h = 271733878;
            for (e = 0; e < t.length; e += 16) r = d, o = p, u = v, l = h, p = f(p = f(p = f(p = f(p = s(p = s(p = s(p = s(p = c(p = c(p = c(p = c(p = a(p = a(p = a(p = a(p, v = a(v, h = a(h, d = a(d, p, v, h, t[e], 7, -680876936), p, v, t[e + 1], 12, -389564586), d, p, t[e + 2], 17, 606105819), h, d, t[e + 3], 22, -1044525330), v = a(v, h = a(h, d = a(d, p, v, h, t[e + 4], 7, -176418897), p, v, t[e + 5], 12, 1200080426), d, p, t[e + 6], 17, -1473231341), h, d, t[e + 7], 22, -45705983), v = a(v, h = a(h, d = a(d, p, v, h, t[e + 8], 7, 1770035416), p, v, t[e + 9], 12, -1958414417), d, p, t[e + 10], 17, -42063), h, d, t[e + 11], 22, -1990404162), v = a(v, h = a(h, d = a(d, p, v, h, t[e + 12], 7, 1804603682), p, v, t[e + 13], 12, -40341101), d, p, t[e + 14], 17, -1502002290), h, d, t[e + 15], 22, 1236535329), v = c(v, h = c(h, d = c(d, p, v, h, t[e + 1], 5, -165796510), p, v, t[e + 6], 9, -1069501632), d, p, t[e + 11], 14, 643717713), h, d, t[e], 20, -373897302), v = c(v, h = c(h, d = c(d, p, v, h, t[e + 5], 5, -701558691), p, v, t[e + 10], 9, 38016083), d, p, t[e + 15], 14, -660478335), h, d, t[e + 4], 20, -405537848), v = c(v, h = c(h, d = c(d, p, v, h, t[e + 9], 5, 568446438), p, v, t[e + 14], 9, -1019803690), d, p, t[e + 3], 14, -187363961), h, d, t[e + 8], 20, 1163531501), v = c(v, h = c(h, d = c(d, p, v, h, t[e + 13], 5, -1444681467), p, v, t[e + 2], 9, -51403784), d, p, t[e + 7], 14, 1735328473), h, d, t[e + 12], 20, -1926607734), v = s(v, h = s(h, d = s(d, p, v, h, t[e + 5], 4, -378558), p, v, t[e + 8], 11, -2022574463), d, p, t[e + 11], 16, 1839030562), h, d, t[e + 14], 23, -35309556), v = s(v, h = s(h, d = s(d, p, v, h, t[e + 1], 4, -1530992060), p, v, t[e + 4], 11, 1272893353), d, p, t[e + 7], 16, -155497632), h, d, t[e + 10], 23, -1094730640), v = s(v, h = s(h, d = s(d, p, v, h, t[e + 13], 4, 681279174), p, v, t[e], 11, -358537222), d, p, t[e + 3], 16, -722521979), h, d, t[e + 6], 23, 76029189), v = s(v, h = s(h, d = s(d, p, v, h, t[e + 9], 4, -640364487), p, v, t[e + 12], 11, -421815835), d, p, t[e + 15], 16, 530742520), h, d, t[e + 2], 23, -995338651), v = f(v, h = f(h, d = f(d, p, v, h, t[e], 6, -198630844), p, v, t[e + 7], 10, 1126891415), d, p, t[e + 14], 15, -1416354905), h, d, t[e + 5], 21, -57434055), v = f(v, h = f(h, d = f(d, p, v, h, t[e + 12], 6, 1700485571), p, v, t[e + 3], 10, -1894986606), d, p, t[e + 10], 15, -1051523), h, d, t[e + 1], 21, -2054922799), v = f(v, h = f(h, d = f(d, p, v, h, t[e + 8], 6, 1873313359), p, v, t[e + 15], 10, -30611744), d, p, t[e + 6], 15, -1560198380), h, d, t[e + 13], 21, 1309151649), v = f(v, h = f(h, d = f(d, p, v, h, t[e + 4], 6, -145523070), p, v, t[e + 11], 10, -1120210379), d, p, t[e + 2], 15, 718787259), h, d, t[e + 9], 21, -343485551), 
            d = i(d, r), p = i(p, o), v = i(v, u), h = i(h, l);
            return [ d, p, v, h ];
        }
        function d(t) {
            var n, e = "", r = 32 * t.length;
            for (n = 0; n < r; n += 8) e += String.fromCharCode(t[n >> 5] >>> n % 32 & 255);
            return e;
        }
        function p(t) {
            var n, e = [];
            for (e[(t.length >> 2) - 1] = void 0, n = 0; n < e.length; n += 1) e[n] = 0;
            var r = 8 * t.length;
            for (n = 0; n < r; n += 8) e[n >> 5] |= (255 & t.charCodeAt(n / 8)) << n % 32;
            return e;
        }
        function v(t) {
            var n, e, r = "0123456789abcdef", o = "";
            for (e = 0; e < t.length; e += 1) n = t.charCodeAt(e), o += r.charAt(n >>> 4 & 15) + r.charAt(15 & n);
            return o;
        }
        function h(t) {
            return unescape(encodeURIComponent(t));
        }
        function g(t) {
            return function(t) {
                return d(l(p(t), 8 * t.length));
            }(h(t));
        }
        function y(t, n) {
            return function(t, n) {
                var e, r, o = p(t), i = [], u = [];
                for (i[15] = u[15] = void 0, o.length > 16 && (o = l(o, 8 * t.length)), e = 0; e < 16; e += 1) i[e] = 909522486 ^ o[e], 
                u[e] = 1549556828 ^ o[e];
                return r = l(i.concat(p(n)), 512 + 8 * n.length), d(l(u.concat(r), 640));
            }(h(t), h(n));
        }
        function m(t, n, e) {
            return n ? e ? y(n, t) : function(t, n) {
                return v(y(t, n));
            }(n, t) : e ? g(t) : function(t) {
                return v(g(t));
            }(t);
        }
        void 0 === (r = function() {
            return m;
        }.call(n, e, n, t)) || (t.exports = r);
    }();
}, function(n, e, r) {
    function o(t) {
        return t && t.__esModule ? t : {
            default: t
        };
    }
    var i = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(n) {
        return void 0 === n ? "undefined" : t(n);
    } : function(n) {
        return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : void 0 === n ? "undefined" : t(n);
    }, u = o(r(3)), a = o(r(1)), c = o(r(0)), s = new a.default(), f = c.default.mapi.url("/spy"), l = {
        debug: function(t) {
            var n = "object" === (void 0 === t ? "undefined" : i(t)) ? t : {
                msg: t
            };
            return (0, u.default)({
                url: f,
                data: Object.assign({}, s.getArgsSync(), n)
            }).catch(function() {});
        }
    };
    n.exports = l;
} ]);