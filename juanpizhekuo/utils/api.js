module.exports = {
    getwxacode: function(t, e, a) {
        return new Promise(function(n, i) {
            wx.request({
                url: t.globalData.URL_MAPI + "distribution/share/QrCode",
                data: {
                    path: "pages/index/index",
                    scene: e || "",
                    width: a || "100"
                },
                method: "GET",
                success: function(t) {
                    var e = t.data, a = void 0 === e ? {} : e;
                    "1000" != a.code ? i(a) : n(a.data);
                },
                fail: function(t) {
                    return i(t);
                }
            });
        });
    },
    getGoodsDetail: function(t, e) {
        return new Promise(function(a, n) {
            var i = {
                goods_id: e,
                xcx_uid: wx.getStorageSync("uid"),
                xcx_sign: wx.getStorageSync("xcx_sign"),
                platform: t.globalData.PLATFORM,
                app_version: t.globalData.APP_VERSION,
                uid: wx.getStorageSync("uid")
            };
            i.apisign = t.createApisign(i), wx.request({
                url: t.globalData.URL_DETAIL + "ptgoods/detail",
                data: i,
                header: {
                    "Content-Type": "application/json"
                },
                success: function(t) {
                    var e = t.data, i = void 0 === e ? {} : e;
                    "1000" != i.code ? n(i) : a(i.data);
                },
                fail: function(t) {
                    return n(t);
                }
            });
        });
    },
    getGoodsSkuInfo: function(t, e) {
        return new Promise(function(a, n) {
            var i = {
                goods_id: e,
                item_id: "",
                platform: t.globalData.PLATFORM,
                app_version: t.globalData.APP_VERSION,
                uid: wx.getStorageSync("uid")
            };
            i.apisign = t.createApisign(i), wx.request({
                url: t.globalData.URL_DETAIL + "ptgoods/sku",
                data: i,
                header: {
                    "Content-Type": "application/json"
                },
                success: function(t) {
                    var e = t.data, i = void 0 === e ? {} : e;
                    "1000" != i.code ? n(i) : a(i.data);
                },
                fail: function(t) {
                    return n(t);
                }
            });
        });
    },
    getAct88Info: function(t) {
        return new Promise(function(e, a) {
            var n = t.getPublicArg();
            n.openid = wx.getStorageSync("openid"), n.apisign = t.createApisign(n), wx.request({
                url: t.globalData.URL_MAPI + "distribution/act88/info",
                data: n,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    var n = t.data, i = void 0 === n ? {} : n;
                    "1000" != i.code ? a(i) : e(i.data);
                },
                fail: function(t) {
                    return a(t);
                }
            });
        });
    },
    createAct88: function(t) {
        return new Promise(function(e, a) {
            var n = t.getPublicArg();
            n.openid = wx.getStorageSync("openid"), n.apisign = t.createApisign(n), wx.request({
                url: t.globalData.URL_MAPI + "distribution/act88/create",
                data: n,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    var n = t.data, i = void 0 === n ? {} : n;
                    "1000" != i.code ? a(i) : e(i.data);
                },
                fail: function(t) {
                    return a(t);
                }
            });
        });
    },
    act88Share: function(t) {
        return new Promise(function(e, a) {
            var n = t.getPublicArg();
            n.apisign = t.createApisign(n), wx.request({
                url: t.globalData.URL_MAPI + "distribution/act88/share",
                data: n,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    var n = t.data, i = void 0 === n ? {} : n;
                    "1000" != i.code ? a(i) : e(i.data);
                },
                fail: function(t) {
                    return a(t);
                }
            });
        });
    },
    getUserOpenid: function(t, e) {
        return new Promise(function(a, n) {
            var i = t.getPublicArg();
            i.code = e, i.apisign = t.createApisign(i), wx.request({
                url: t.globalData.URL_MUSER + "oauth/xcxOpenid",
                data: i,
                method: "POST",
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    var e = t.data, i = void 0 === e ? {} : e;
                    "1000" != i.code ? n(i) : a(i.data);
                },
                fail: function(t) {
                    return n(t);
                }
            });
        });
    },
    reportScene: function(t, e, a, n) {
        return new Promise(function(i, o) {
            var r = n.getPublicArg();
            r.openId = t, r.uid = e, r.scene = a, r.apisign = n.createApisign(r), wx.request({
                url: n.globalData.URL_MAPI + "distribution/mini/report",
                data: r,
                method: "POST",
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    var e = t.data, a = void 0 === e ? {} : e;
                    "1000" != a.code ? o(a) : i(a.data);
                },
                fail: function(t) {
                    return o(t);
                }
            });
        });
    },
    getDefaultStorageInfo: function(t) {
        return new Promise(function(e, a) {
            var n = t.getPublicArg();
            n.apisign = t.createApisign(n), wx.request({
                url: t.globalData.URL_MAPI + "distribution/xcx/store",
                data: n,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    var n = t.data, i = void 0 === n ? {} : n;
                    "1000" != i.code ? a(i) : e(i.data);
                },
                fail: function(t) {
                    return a(t);
                }
            });
        });
    }
};