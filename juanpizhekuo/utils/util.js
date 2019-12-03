function t(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = n, t;
}

function e(t, e) {
    var n = "";
    if (!e) return n;
    if (t instanceof Array && t.length > 0) {
        for (var a = t.length, r = "", o = 0; o < a; o++) switch (t[o]) {
          case "zhouyi":
            r += "|_\\d+";
            break;

          default:
            r += "|_" + t[o] + "\\d+";
        }
        if (r) {
            e = "_" + e, r = r.substring(1);
            var i = new RegExp(r, "gi"), u = e.match(i);
            u && (n = (n = u.join("")).substring(1));
        }
    }
    return n;
}

var n = function() {
    function t(t) {
        return ("0" + t).substr(-2);
    }
    var e = {
        yyyy: function(t) {
            return t.getFullYear();
        },
        MM: function(e) {
            return t(e.getMonth() + 1);
        },
        dd: function(e) {
            return t(e.getDate());
        },
        HH: function(e) {
            return t(e.getHours());
        },
        mm: function(e) {
            return t(e.getMinutes());
        },
        ss: function(e) {
            return t(e.getSeconds());
        }
    };
    return function(t, n) {
        return n.replace(/([a-zA-Z])\1{0,3}/g, function(n) {
            return e[n](t);
        });
    };
}();

module.exports = {
    formatDate: n,
    mergePage: function(t) {
        for (var e = arguments.length, n = Array(e > 1 ? e - 1 : 0), a = 1; a < e; a++) n[a - 1] = arguments[a];
        var r = arguments, o = {
            onLoad: [],
            onReady: [],
            onShow: [],
            onHide: [],
            onUnload: [],
            onPullDownRefresh: [],
            onReachBottom: []
        };
        for (var i in o) for (var u = r.length - 1; u >= 0; u--) r[u][i] && o[i].push(r[u][i]);
        Object.assign.apply(null, r);
        for (var s in o) !function(e) {
            t[e] = function() {
                for (var t = 0; t < o[e].length; t++) o[e][t].apply(this, arguments);
            };
        }(s);
        return t;
    },
    isMobile: function(t) {
        return /^1[34578]\d{9}$/.test(t.trim());
    },
    post: function(t, e) {
        var n = t.data, a = {
            method: "POST"
        };
        e ? a.header = {
            "content-type": "application/x-www-form-urlencoded"
        } : n = Object.assign({
            xcx_uid: wx.getStorageSync("uid"),
            xcx_sign: wx.getStorageSync("xcx_sign")
        }, n), a.data = n, wx.request(Object.assign(t, a));
    },
    getCache: function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, n = wx.getStorageSync(t);
        return n && n.expires && new Date().getTime() <= n.expires && wx.getStorageSync("session_id") === n.session_id ? n.value : e;
    },
    setCache: function(t, e) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 604800;
        wx.setStorageSync(t, {
            value: e,
            expires: new Date().getTime() + 1e3 * n,
            session_id: wx.getStorageSync("session_id")
        });
    },
    getRealPx: function(t) {
        var e = getApp(), n = e.globalData.SYSTIME_INFO.windowWidth;
        e.globalData.SYSTIME_INFO.pixelRatio;
        return Math.round(t * n / 750);
    },
    getZyId: function(t) {
        var n = wx.getStorageSync("zhouyi_ids");
        void 0 !== (n = e([ "c", "zhouyi", "l", "b" ], n)) && n ? t(n) : wx.request({
            url: "https://m.juanpi.com/usergroup/zhouyi",
            method: "GET",
            data: {
                xcx_uid: wx.getStorageSync("uid"),
                sign: wx.getStorageSync("xcx_sign")
            },
            complete: function(n) {
                wx.getStorageSync("uid") && wx.setStorageSync("zhouyi_ids", n.data), t(e([ "c", "zhouyi", "l", "b" ], n.data));
            }
        });
    },
    maskUpAnimation: function(e, n) {
        e.setData(t({}, n, !0)), setTimeout(function() {
            var t = wx.createAnimation({
                duration: 300
            }).translateY(0).step();
            e.setData({
                maskAnimation: t.export()
            });
        }, 50);
    },
    maskDownAnimation: function(e, n) {
        var a = wx.createAnimation({
            duration: 300
        }).translateY("100%").step();
        e.setData({
            maskAnimation: a.export()
        }), setTimeout(function() {
            e.setData(t({}, n, !1));
        }, 300);
    },
    maskLeftAnimation: function(e, n) {
        e.setData(t({}, n, !0)), setTimeout(function() {
            var t = wx.createAnimation({
                duration: 300
            }).translateX(0).step();
            e.setData({
                maskAnimation: t.export()
            });
        }, 50);
    },
    maskRightAnimation: function(e, n) {
        var a = wx.createAnimation({
            duration: 300
        }).translateX("100%").step();
        e.setData({
            maskAnimation: a.export()
        }), setTimeout(function() {
            e.setData(t({}, n, !1));
        }, 300);
    },
    accSub: function(t, e) {
        var n, a, r;
        try {
            n = t.toString().split(".")[1].length;
        } catch (t) {
            n = 0;
        }
        try {
            a = e.toString().split(".")[1].length;
        } catch (t) {
            a = 0;
        }
        r = Math.pow(10, Math.max(n, a));
        var o = n >= a ? n : a;
        return (Math.round(t * r - e * r) / r).toFixed(o);
    },
    getCurrrentPageUrl: function() {
        var t = getCurrentPages(), e = t[t.length - 1], n = e.route, a = e.options || {}, r = [];
        for (var o in a) {
            var i = a[o];
            r.push(o + "=" + i);
        }
        return r.length && (n = n + "?" + r.join("&")), n;
    },
    dateFormat: function(t, e) {
        var n = new Date(1e3 * t), a = {
            "M+": n.getMonth() + 1,
            "d+": n.getDate(),
            "h+": n.getHours(),
            "m+": n.getMinutes(),
            "s+": n.getSeconds(),
            "q+": Math.floor((n.getMonth() + 3) / 3),
            S: n.getMilliseconds()
        };
        /(y+)/.test(e) && (e = e.replace(RegExp.$1, (n.getFullYear() + "").substr(4 - RegExp.$1.length)));
        for (var r in a) new RegExp("(" + r + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? a[r] : ("00" + a[r]).substr(("" + a[r]).length)));
        return e;
    },
    getQueryFromShareSence: function(t) {
        if (t.scene) {
            var e = decodeURIComponent(t.scene), n = {};
            if (e.indexOf("=") >= 0) {
                var a = !0, r = !1, o = void 0;
                try {
                    for (var i, u = e.split("&")[Symbol.iterator](); !(a = (i = u.next()).done); a = !0) {
                        var s = i.value.split("=");
                        "code" == s[0] && (s[0] = "inviteCode"), n[s[0]] = s[1];
                    }
                } catch (t) {
                    r = !0, o = t;
                } finally {
                    try {
                        !a && u.return && u.return();
                    } finally {
                        if (r) throw o;
                    }
                }
                delete t.scene;
            }
            Object.assign(t, n);
        }
    }
};