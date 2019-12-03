var o = getApp(), t = (require("../../../../utils/util"), require("../../../../utils/statistics")), e = null, a = null, n = !1;

module.exports = {
    couponTransformData: function(o, t, n, c) {
        e = o, a = n;
        for (var i = 0; i < o.couponImages.length; i++) for (var s in o.couponImages[i]) o.couponImages[i][s].src = this.getImageUrl(o.couponImages[i][s].src);
        var u = o.couponRules.split("\n").map(function(o, t) {
            return {
                txt: o
            };
        });
        return o.txtList = u, o.ruleModalColor = o.ruleModalColor || "#F00", n.coupon ? this.initCoupon(t, c) : n.couponbag ? this.initCouponBag(t, c) : window.console.error("无效券包（优惠券）ID"), 
        this.setData({
            coupon: {
                clockText: "离抢券开始还剩",
                showCouponRule: !1,
                showCouponBag: !1
            }
        }), o;
    },
    initCoupon: function(t, n) {
        var c = this, i = this, s = o.getPublicArg();
        s.rid = a.coupon[0], s.apisign = o.createApisign(s), wx.request({
            url: o.globalData.URL_MACT + t + "-getCouponStatus",
            data: s,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            complete: function(o) {
                var a = o.data;
                if (1e3 == a.code || 1007 == a.code) {
                    a.next_time ? i.countdown({
                        endTime: 1e3 * a.next_time,
                        timeKey: "clock." + e.id,
                        isAct: !0
                    }) : c.countdown({
                        endTime: 1e3 * n,
                        timeKey: "clock." + e.id,
                        isAct: !0
                    });
                    var s = [], u = a.results;
                    e.couponImages.map(function(o, e) {
                        var a = u ? u[e].code : 1;
                        s.push({
                            code: a,
                            img: o["img" + a],
                            activityparam: t + "_" + (2001 + e) + ".0"
                        });
                    }), i.setData({
                        coupon: {
                            couponType: "coupon",
                            couponStateData: s,
                            clockText: i.clockText(s, a.next_time, !1)
                        }
                    });
                }
            }
        });
    },
    initCouponBag: function(t, n) {
        var c = this, i = this, s = o.getPublicArg();
        s.rid = a.couponbag[0], s.apisign = o.createApisign(s), wx.request({
            url: o.globalData.URL_MACT + t + "-getCouponbagStatus",
            data: s,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            complete: function(a) {
                var s = a.data;
                s.next_time ? i.countdown({
                    endTime: 1e3 * s.next_time,
                    timeKey: "clock." + e.id,
                    isAct: !0
                }) : c.countdown({
                    endTime: 1e3 * n,
                    timeKey: "clock." + e.id,
                    isAct: !0
                });
                var u = s.code, p = 2;
                1e3 == +u ? p = 4 : 2002 == +u ? p = 1 : 2003 == +u ? p = 3 : 2004 != +u && 2005 != +u || (p = 2);
                var g = o.globalData.ACT_TIME_DIFF + new Date().getTime(), r = 0, d = void 0, m = void 0, l = [];
                e.dataTime.map(function(o) {
                    g >= 1e3 * o.getCouponTime && (r = 0, d = o.couponMoneyList, m = o.validTime, o.couponMoneyList.map(function(o) {
                        r += +o.ae_money;
                    }));
                }), l.push({
                    code: p,
                    img: e.couponImages[0]["img" + p],
                    activityparam: t + "_2001.0"
                }), i.setData({
                    coupon: {
                        couponType: "couponbag",
                        couponStateData: l,
                        clockText: i.clockText(l, s.next_time, !0),
                        couponMoneyList: d,
                        validTime: m,
                        price: r
                    }
                });
            }
        });
    },
    clockText: function(o, t, a) {
        var n = 0, c = 0, i = 0, s = "离抢券开始还剩", u = e.couponTypeCode;
        return o.map(function(o) {
            switch (o.code) {
              case 2:
                c += 1;
                break;

              case 3:
                n += 1;
                break;

              case 4:
                i += 1;
            }
        }), 1 == +u ? n || c === o.length ? s = t ? "离下轮抢券开始还有" : "离抢券结束还剩" : i && (s = "离本轮抢券结束还剩") : a && 2 == +u || 3 == +u ? n || i ? s = "离本轮抢券结束还剩" : c === o.length && (s = t ? "离下轮抢券开始还有" : "离抢券结束还剩") : a || 2 != +u || (n === o.length || c === o.length ? s = t ? "离下轮抢券开始还有" : "离抢券结束还剩" : i && (s = "离本轮抢券结束还剩")), 
        s;
    },
    getCoupon: function(c) {
        var i = this;
        if (!n) {
            n = !0;
            var s = this, u = c.currentTarget.dataset, p = u.index;
            if (4 == u.code) if (o.checkLogin()) {
                if ("coupon" == s.data.coupon.couponType) {
                    var g = o.getPublicArg();
                    g.rid = a.coupon[0], g.n = p, g.apisign = o.createApisign(g), wx.request({
                        url: o.globalData.URL_MACT + s.data.actName + "-sendCoupon",
                        data: g,
                        method: "POST",
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        },
                        complete: function(o) {
                            var t = o.data, a = +t.code, c = t.msg, i = +t.userNum, u = +e.couponTypeCode, g = s.data.coupon.couponStateData;
                            1e3 === a ? (1 === u || 3 === u || 2 === u && 0 === i ? (g[p].img = e.couponImages[p].img3, 
                            g[p].code = 3) : g[p].code = 4, s.showToastMsg(c)) : 2006 === a || 2002 === a ? (g[p].img = e.couponImages[p].img2, 
                            g[p].code = 2, s.showToastMsg(c)) : 2007 === a ? (50088 == +t.mark ? s.showToastMsg("很遗憾，领取失败！您不符合领取条件") : s.showToastMsg(c), 
                            g[p].code = 4) : 2008 === a ? (g[p].code = 4, s.showToastMsg("此类型券只可领取一张")) : (g[p].code = 4, 
                            s.showToastMsg(c)), s.setData({
                                "coupon.couponStateData": g
                            }), n = !1;
                        },
                        fail: function() {
                            s.showToastMsg("网络繁忙，刷新看看"), n = !1;
                        }
                    });
                } else if ("couponbag" == s.data.coupon.couponType) {
                    var r = o.getPublicArg();
                    r.rid = a.couponbag[0], r.n = p, r.apisign = o.createApisign(r), wx.request({
                        url: o.globalData.URL_MACT + this.data.actName + "-sendCouponbag",
                        data: r,
                        method: "POST",
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        },
                        complete: function(o) {
                            var t = o.data, a = +t.code, c = i.data.coupon.couponStateData, u = t.msg;
                            if (1e3 === a) {
                                if (t.stime) {
                                    var g = i.data.coupon.validTime;
                                    g.startTime = t.stime, g.endTime = t.etime, s.setData({
                                        "coupon.validTime": g
                                    });
                                }
                                s.setData({
                                    "coupon.showCouponBag": !0
                                }), c[p].img = e.couponImages[p].img3;
                            } else 2003 === a ? (c[p].img = e.couponImages[p].img3, s.showToastMsg(u)) : 2005 === a ? (c[p].img = e.couponImages[p].img2, 
                            s.showToastMsg(u)) : 1009 === a ? (50088 == +t.mark ? s.showToastMsg("很遗憾，领取失败！您不符合领取条件") : s.showToastMsg(u), 
                            c[p].code = 4) : (c[p].code = 4, s.showToastMsg(u));
                            s.setData({
                                "coupon.couponStateData": c
                            }), n = !1;
                        },
                        fail: function() {
                            s.showToastMsg("网络繁忙，刷新看看"), n = !1;
                        }
                    });
                }
            } else o.goLogin(!0), n = !1;
            t.sendEventData(u);
        }
    },
    couponRuleTap: function() {
        this.setData({
            "coupon.showCouponRule": !this.data.coupon.showCouponRule
        });
    },
    couponBagTap: function() {
        this.setData({
            "coupon.showCouponBag": !this.data.coupon.showCouponBag
        });
    }
};