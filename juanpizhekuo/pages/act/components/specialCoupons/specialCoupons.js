function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    }
    return t;
}, e = getApp();

require("../../../../utils/util");

module.exports = {
    specialCouponsFormatCouponsData: function(t, a, o, n) {
        var i = this, c = e.globalData.ACT_TIME_DIFF + new Date().getTime(), r = [];
        t && t.length && t.forEach(function(t, a) {
            r[a] = [];
            var e = t.defaultCoupons, o = t.packages;
            if (e && e.length && (r[a] = e), o && o.length) {
                var n = new Date(o[o.length - 1].changeTime).getTime(), i = o[o.length - 1].coupons || [];
                c >= n && i.length ? r[a] = i : o.forEach(function(t, e) {
                    var n = t.coupons;
                    if (o[e + 1]) {
                        var i = o[e + 1].changeTime, s = new Date(i).getTime();
                        n && s && c < s && (r[a] = n);
                    }
                });
            }
        }), i.setSpecialCouponsStatus(r, a, o, n);
    },
    setSpecialCouponsStatus: function(e, o, n, i) {
        var c = this, r = e || [];
        r.forEach(function(t) {
            t && t.length && t.forEach(function(t) {
                t.status = "立即领取", t.logo.indexOf("http") < 0 && (t.logo = "https:" + t.logo);
            });
        }), n.forEach(function(t) {
            r.forEach(function(a) {
                a && a.length && a.forEach(function(a) {
                    a.couponId === t && (a.status = "已抢光");
                });
            });
        }), o.forEach(function(t) {
            r.forEach(function(a) {
                a && a.length && a.forEach(function(a) {
                    a.couponId === t && (a.status = "已领取");
                });
            });
        }), c.setData({
            spcGroups: a({}, c.data.spcGroups, t({}, i, r))
        });
    },
    getSpecialCouponsStatus: function(t, a, o) {
        var n = this, i = e.getPublicArg();
        i.apisign = e.createApisign(i), wx.request({
            url: "" + e.globalData.URL_MACT + a + "-getShopCouponStatus",
            method: "POST",
            data: i,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            complete: function(a) {
                var e = a.data, i = [], c = [];
                1e3 === e.code && (i = e.data.haveCoupon || [], c = e.data.overCoupon || []), n.specialCouponsFormatCouponsData(t, i, c, o);
            }
        });
    },
    getSpecialCoupon: function(t) {
        var a = t.currentTarget.dataset, o = a.actname, n = a.cid, i = a.sid, c = a.status, r = a.componentid;
        if ("立即领取" !== c) return wx.navigateTo({
            url: "/pages/brand/brand?brand_id=0&shop_id=" + i
        }), !1;
        var s = this, u = s.data.spcGroups;
        wx.showLoading && wx.showLoading({
            title: "加载中"
        });
        var p = e.getPublicArg();
        p.cid = n, p.apisign = e.createApisign(p), wx.request({
            url: "" + e.globalData.URL_MACT + o + "-sendShopCoupon",
            method: "POST",
            data: p,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            complete: function(t) {
                var a = t.data;
                wx.hideLoading && wx.hideLoading();
                var e = a.code, o = a.msg;
                switch (e) {
                  case 1002:
                  case 1003:
                  case 1004:
                  case 1006:
                  case 2007:
                  case 3001:
                    wx.showToast({
                        image: "/images/i.png",
                        title: o || "领取失败"
                    });
                    break;

                  case 1005:
                    wx.navigateTo({
                        url: "/pages/login/login"
                    });
                    break;

                  case 1e3:
                    wx.showToast({
                        title: o
                    }), u[r].forEach(function(t) {
                        t && t.length && t.forEach(function(t) {
                            t.couponId === n && (t.status = "已领取");
                        });
                    }), s.setData({
                        spcGroups: u
                    });
                }
            }
        });
    }
};