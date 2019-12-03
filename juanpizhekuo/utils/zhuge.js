function t(t, e, n) {
    if (t[e]) {
        var i = t[e];
        t[e] = function() {
            i.apply(this, arguments), n.apply(this, arguments);
        };
    } else t[e] = n;
}

var e = {};

!function() {
    var t = Array.prototype, i = Object.prototype, r = t.slice, o = i.hasOwnProperty, s = t.forEach, u = {};
    e.uuid = function() {
        function t() {
            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
        }
        return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t();
    }, e.each = function(t, e, n) {
        if (null != t) if (s && t.forEach === s) t.forEach(e, n); else if (t.length === +t.length) {
            for (var i = 0, r = t.length; i < r; i++) if (i in t && e.call(n, t[i], i, t) === u) return;
        } else for (var c in t) if (o.call(t, c) && e.call(n, t[c], c, t) === u) return;
    }, e.extend = function(t) {
        return e.each(r.call(arguments, 1), function(e) {
            for (var n in e) void 0 !== e[n] && (t[n] = e[n]);
        }), t;
    }, e.isUndefined = function(t) {
        return void 0 === t;
    }, e.isString = function(t) {
        return "[object String]" == Object.prototype.toString.call(t);
    }, e.isArray = function(t) {
        return "[object Array]" === Object.prototype.toString.call(t);
    }, e.isFunction = function(t) {
        try {
            return /^\s*\bfunction\b/.test(t);
        } catch (t) {
            return !1;
        }
    }, e.isObject = function(t) {
        return t === Object(t) && !e.isArray(t);
    }, e.getSystemInfo = function() {
        var t = wx.getSystemInfoSync();
        return t.resolution = t.windowWidth + "x" + t.windowHeight, t;
    }, e.encode = function(t) {
        var e = {};
        for (var n in t) e["_" + n] = t[n];
        return e;
    }, e.getNet = function(t) {
        wx.getNetworkType({
            complete: function(e) {
                var i = "wifi" === e.networkType ? 1 : 0, r = {
                    "2g": 1,
                    "3g": 3,
                    "4g": 13
                }, o = "wifi" === e.networkType ? 0 : r[e.networkType];
                n.set("net", i), n.set("mnet", o), t && t({
                    net: i,
                    mnet: o
                });
            }
        });
    };
}();

var n = {
    key: "zg"
};

n.get = function(t) {
    var e = this.getAll();
    return e ? e[t] : null;
}, n.set = function(t, e) {
    var n = this.getAll();
    n[t] = e, wx.setStorageSync(this.key, n);
}, n.del = function(t) {
    var e = this.getAll();
    delete e[t], wx.setStorageSync(this.key, e);
}, n.getAll = function() {
    var t = wx.getStorageSync(this.key);
    return t || (t = {
        cache: [],
        ec: 0,
        net: 0,
        mnet: 0
    }, wx.setStorageSync(this.key, t)), t;
}, n.clear = function() {
    wx.removeStorageSync(this.key);
}, n.getDid = function() {
    return wx.getStorageSync("zg-did");
}, n.registerDid = function() {
    wx.setStorageSync("zg-did", e.uuid());
}, n.flush = function() {
    for (var t = this.get("sid"), e = this.get("cache"), n = 0, i = e.length; n < i; n++) {
        var r = e[n];
        r.hasOwnProperty("sid") && (r.sid = t);
    }
    return this.set("cache", []), e;
};

var i = function() {
    this._props = {
        appKey: "",
        br: "wx-app",
        an: "",
        vn: ""
    }, this._url = {
        normal: "https://zhuge.juanpi.com/web_event",
        bac: "https://zhuge.juanpi.com/web_event"
    }, this._config = {
        debug: !1,
        an: "wxApp",
        vn: "1.0"
    }, this._sdk = "web", this._sdkv = "2.0";
};

i.prototype._registerOnce = function() {
    n.getDid() || n.registerDid();
}, i.prototype._sendRequest = function(t) {
    var e = new Date(), i = {
        method: "web_event_srv.upload",
        event: {
            sln: "itn",
            pl: "js",
            sdk: "zg-js",
            sdkv: this._sdkv,
            owner: "zg",
            ut: [ e.getFullYear(), e.getMonth() + 1, e.getDate() ].join("-") + " " + e.toTimeString().match(/\d{2}:\d{2}:\d{2}/)[0],
            tz: 6e4 * -e.getTimezoneOffset(),
            debug: this._config.debug ? 1 : 0,
            ak: this._props.appKey,
            usr: {
                did: n.getDid()
            },
            data: []
        },
        _: new Date().getTime().toString()
    }, r = n.get("cache");
    n.get("sid") ? (r.length && i.event.data.push(n.flush()), i.event.data.push(t), 
    this._request(i)) : (r.push(t), n.set("cache", r));
}, i.prototype._request = function(t) {
    var e = this;
    wx.request({
        url: this._url.normal,
        data: t,
        fail: function() {
            wx.request({
                url: e._url.bac,
                data: t
            });
        }
    });
}, i.prototype._info = function() {
    var t = e.getSystemInfo(), i = new Date(), r = {
        dt: "pl",
        pr: {
            $rs: t.resolution,
            $tz: 6e4 * -i.getTimezoneOffset(),
            $ct: i.getTime(),
            $cuid: n.get("cuid")
        }
    };
    this._sendRequest(r);
}, i.prototype._sessionStart = function() {
    var t = new Date(), i = t.getTime(), r = e.getSystemInfo(), o = this;
    n.set("sid", i), e.getNet(function(s) {
        var u = {
            dt: "ss",
            pr: {
                $ct: t.getTime(),
                $sid: i,
                $cuid: n.get("cuid"),
                $tz: 6e4 * -t.getTimezoneOffset(),
                $url: n.get("$url"),
                $os: r.system.split(/\s/)[0],
                $ov: r.system.split(/\s/)[1],
                $wv: r.version,
                $mnet: s.mnet,
                $net: s.net,
                $vn: o._props.vn
            }
        };
        u.pr = e.extend(u.pr, n.get("utm")), o._sendRequest(u);
    });
}, i.prototype._sessionEnd = function() {
    var t = n.get("sid"), e = new Date(), i = e.getTime() - t, r = {
        dt: "se",
        pr: {
            $ct: e.getTime(),
            $tz: 6e4 * -e.getTimezoneOffset(),
            $dru: i,
            $sid: t,
            $cuid: n.get("cuid")
        }
    };
    this._sendRequest(r), n.clear();
}, i.prototype._init = function() {
    this._registerOnce(), this._sessionStart(), this._info();
}, i.prototype.load = function(t, i) {
    this._props.appKey = t, n.set("appKey", t), e.isObject(i) && (this._config = e.extend(this._config, i), 
    this._config.an && (this._props.an = this._config.an), this._config.vn && (this._props.vn = this._config.vn));
}, i.prototype.identify = function(t, i) {
    var r = n.get("sid"), o = new Date();
    n.set("cuid", t);
    var s = {
        dt: "usr",
        pr: {
            $ct: o.getTime(),
            $tz: 6e4 * -o.getTimezoneOffset(),
            $cuid: t,
            $sid: r,
            $url: n.get("$url")
        }
    };
    e.isObject(i) && (s.pr = e.extend(s.pr, e.encode(i))), this._sendRequest(s);
}, i.prototype.track = function(t, i) {
    var r = n.get("sid"), o = new Date(), s = e.getSystemInfo(), u = this;
    n.set("ec", n.get("ec") + 1), e.getNet(function(c) {
        var a = {
            dt: "evt",
            pr: {
                $eid: t,
                $ct: o.getTime(),
                $tz: 6e4 * -o.getTimezoneOffset(),
                $cuid: n.get("cuid"),
                $sid: r,
                $url: n.get("$url"),
                $os: s.system.split(/\s/)[0],
                $ov: s.system.split(/\s/)[1],
                $wv: s.version,
                $mnet: c.mnet + "",
                $net: c.net + "",
                $vn: u._props.vn
            }
        };
        e.isObject(i) && (a.pr = e.extend(a.pr, e.encode(i))), u._sendRequest(a);
    });
}, i.prototype.start = function() {
    this._init();
}, i.prototype.end = function() {
    this._sessionEnd();
};

var r = new i(), o = function() {}, s = function() {
    r.start();
}, u = function() {
    r.end();
}, c = App;

App = function(e) {
    t(e, "onLaunch", o), t(e, "onShow", s), t(e, "onHide", u), c(e);
};

var a = function(t) {
    var e = t || {}, i = {};
    [ "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term" ].forEach(function(t) {
        e[t] && (i["$" + t] = e[t]);
    }), n.set("utm", i);
}, g = function() {
    n.set("$url", this.__route__);
}, p = function() {}, f = Page;

Page = function(e) {
    t(e, "onLoad", a), t(e, "onShow", g), t(e, "onHide", p), f(e);
}, App.zhuge = r, module.exports = new i();