var t = getApp(), a = require("../../../utils/util.js"), e = require("../common/actutil"), o = require("../../../components/error-msg/error-msg"), n = require("../../../components/toast/toast"), s = require("../../../utils/statistics"), i = require("../../../components/countdown/countdown");

Page(a.mergePage({
    data: {
        CouponStatus: [],
        rid: "",
        showTopcoupon: !1,
        showImages: !1,
        queryname: "",
        isSending: !1,
        limitText: "",
        limit_t: "",
        yure: [ "shuang11nzyr", "shuang11nzhcyr", "shuang11xbhcyr", "shuang11myfhcyr", "jjfhcyr", "mzyr", "smce1111", "shuangshiyimsyr", "shuang11ydyr", "czbkykj" ],
        kaishou: [ "shuang11nzsz", "shuang11nzhcsz", "shuang11xbhcks", "shuang11myfhc", "csjjfhc", "shuang11yzmz", "smjdks1111", "mszym", "shuang11ydks", "ssyccbkks" ]
    },
    onShow: function() {
        this.setData({
            actImgURL: "https://act.juancdn.com/jpwebapp/171111/_dist/coupon_page/images/",
            showImages: !0
        });
    },
    onLoad: function(t) {
        this.data.queryname = t.name, this.setData({
            actName: t.name
        }), s.sendPageData("page_act", t.name), this.getTopCoupon(this.data.queryname), 
        this.getAct(this.data.queryname);
    },
    getTopCoupon: function(a) {
        var e = this;
        if (t.checkLogin()) {
            var o = t.getPublicArg();
            o.apisign = t.createApisign(o), wx.request({
                url: t.globalData.URL_MACT + "Act1111-sendCoupon",
                data: o,
                method: "post",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    var o = t.data, n = void 0 === o ? {} : o;
                    1e3 == n.code && s.sendEventData({
                        activity: "normal_activity",
                        activityparam: a + "_hongbao11_1001.0"
                    }), 1e3 != n.code && 1004 != n.code || (e.data.showTopcoupon = !0, e.setData({
                        topCouponNum: n.money,
                        showTopcoupon: e.data.showTopcoupon,
                        numType: n.money - 10 >= 0 ? "normal" : "small"
                    }));
                },
                complete: function() {}
            });
        }
    },
    getAct: function(a) {
        var o = this, n = t.getPublicArg();
        n.apisign = t.createApisign(n), wx.request({
            url: t.globalData.URL_MACT + a + "-getPageConfig",
            data: n,
            method: "post",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(a) {
                var n = a.data, s = void 0 === n ? {} : n;
                1e3 == s.code && (wx.setNavigationBarTitle({
                    title: s.data.seo.title
                }), e.getSystemTime(s.data.actName, s.data.actStartTime, function() {
                    var a = t.globalData.ACT_TIME_DIFF + new Date().getTime(), e = (new Date("2017/11/3 10:0:0").getTime(), 
                    new Date("2017/11/10 10:0:0").getTime()), n = new Date("2017/11/10 20:0:0").getTime(), i = new Date("2017/11/13 10:0:0").getTime();
                    o.setData({
                        huichangURL: o.data.yure
                    }), !s.data.actEndTime || a >= 1e3 * s.data.actEndTime ? "/pages/index/index" == s.data.jieshuUrl ? wx.switchTab({
                        url: s.data.jieshuUrl
                    }) : wx.navigateTo({
                        url: s.data.jieshuUrl
                    }) : (o.data.rid = s.data.rule.coupon[0], o.countdown({
                        endTime: 1e3 * parseInt(s.data.actEndTime, 10),
                        timeKey: "clock." + s.data.actName,
                        isAct: !0,
                        noShow: !0,
                        onEnd: function() {
                            "/pages/index/index" == s.data.jieshuUrl ? wx.switchTab({
                                url: s.data.jieshuUrl
                            }) : wx.redirectTo({
                                url: s.data.jieshuUrl
                            });
                        }
                    }), o.data.limitText = "11.3~11.10 每种券限抢两张", o.data.limit_t = "全场通用券 每天早10点限量抢", 
                    o.setData({
                        limitText: o.data.limitText,
                        limit_t: o.data.limit_t
                    }), o.countdown({
                        endTime: e,
                        timeKey: "clock.prekaishou",
                        isAct: !0,
                        noShow: !0,
                        onEnd: function() {
                            o.data.limitText = "每日10点、20点准时开抢", o.data.limit_t = "全场通用券 每天限量抢", o.setData({
                                limitText: o.data.limitText,
                                limit_t: o.data.limit_t
                            });
                        }
                    }), o.countdown({
                        endTime: n,
                        timeKey: "clock.huichang",
                        isAct: !0,
                        noShow: !0,
                        onEnd: function() {
                            o.setData({
                                huichangURL: o.data.kaishou
                            });
                        }
                    }), o.countdown({
                        endTime: i,
                        timeKey: "clock.fanchang",
                        isAct: !0,
                        noShow: !0,
                        onEnd: function() {
                            o.data.kaishou[0] = "shuang11nzfc", o.data.kaishou[1] = "shuang11nzhcfc", o.data.kaishou[2] = "shuang11xbhcfc", 
                            o.data.kaishou[4] = "jjfhczh", o.setData({
                                huichangURL: o.data.kaishou
                            });
                        }
                    }), o.getCommon(o.data.rid, o.data.queryname));
                }));
            },
            complete: function() {}
        });
    },
    getCommon: function(a, e) {
        var o = this, n = t.getPublicArg();
        n.rid = a, n.apisign = t.createApisign(n), wx.request({
            url: t.globalData.URL_MACT + e + "-getCouponStatus",
            data: n,
            method: "post",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                var a = t.data;
                if (1e3 == a.code) {
                    for (var e = 0; e < a.results.length; e++) "已领完" == a.results[e].status && (a.results[e].status = "已领取"), 
                    o.data.CouponStatus.push(a.results[e]), o.data.CouponStatus[e].no = "", 2 == a.results[e].code && (o.data.CouponStatus[e].no = "1");
                    o.setData({
                        CommonCoupon: o.data.CouponStatus,
                        showCommon: !0,
                        showItem: !0
                    });
                } else o.setData({
                    showCommon: !1,
                    showItem: !0
                });
            },
            fail: function(t) {
                o.showErrorMsg("请求数据失败");
            }
        });
    },
    receiveCoupon: function(a) {
        var e = this, o = a.currentTarget.dataset.option || a.target.dataset.option, n = a.currentTarget.dataset.code || a.target.dataset.code;
        if (!(4 != n && 5 != n || this.data.isSending)) {
            this.data.isSending = !0;
            var i = Number(o) + 2;
            s.sendEventData({
                activity: "normal_activity",
                activityparam: this.data.queryname + "_hongbao11_101" + i + ".0"
            });
            var u = t.getPublicArg();
            u.rid = this.data.rid, u.n = o, u.apisign = t.createApisign(u), wx.request({
                url: t.globalData.URL_MACT + this.data.queryname + "-sendCoupon",
                data: u,
                method: "post",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(a) {
                    var n = a.data;
                    1e3 == n.code ? 0 == n.userNum ? (e.showToastMsg("领取成功"), e.data.CouponStatus[o].code = 3, 
                    e.data.CouponStatus[o].status = "已领取", e.setData({
                        CommonCoupon: e.data.CouponStatus
                    })) : (e.data.CouponStatus[o].status = "再领一张", e.data.CouponStatus[o].code = 5, 
                    e.showToastMsg("领取成功"), e.setData({
                        CommonCoupon: e.data.CouponStatus
                    })) : 2006 == n.code ? (e.data.CouponStatus[o].code = 2, e.data.CouponStatus[o].status = "已抢光", 
                    e.data.CouponStatus[o].no = "1", e.setData({
                        CommonCoupon: e.data.CouponStatus
                    })) : 2011 == n.code ? (e.data.isSending = !1, t.goLogin(!0)) : e.showToastMsg("网络繁忙，请稍后再试"), 
                    e.data.isSending = !1;
                },
                fail: function(t) {
                    e.showToastMsg("网络繁忙，请稍后再试"), e.data.isSending = !1;
                }
            });
        }
    }
}, o, s.pageEvents, i, n));