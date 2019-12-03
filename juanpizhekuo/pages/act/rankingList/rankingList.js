var a = getApp(), t = !1, e = require("../../../utils/util"), i = require("../../../utils/statistics"), n = require("../common/actutil");

Page(e.mergePage({
    data: {
        rankingList: [],
        SpecialKind: 1,
        ifbag: !1
    },
    onLoad: function(a) {
        var t = this, e = "", i = 0;
        a && (e = a.cate, i = a.num, 685 == e ? t.setData({
            SpecialKind: 1
        }) : 686 == e ? t.setData({
            SpecialKind: 2
        }) : 690 == e ? t.setData({
            SpecialKind: 3
        }) : 697 == e ? t.setData({
            SpecialKind: 4,
            ifbag: !0
        }) : 704 == e && t.setData({
            SpecialKind: 5
        })), this.getAct(a.name, e, i);
    },
    onShow: function() {
        i.sendPageData("topbang11", "topbang11_1001.0");
    },
    getAct: function(t, e, i) {
        var s = this, c = a.getPublicArg();
        c.apisign = a.createApisign(c), wx.request({
            url: a.globalData.URL_MACT + t + "-getPageConfig",
            data: c,
            header: {
                "Content-Type": "application/json"
            },
            success: function(c) {
                var o = c.data, d = void 0 === o ? {} : o;
                1e3 == d.code && n.getSystemTime(d.data.actName, d.data.actStartTime, function() {
                    var n = a.globalData.ACT_TIME_DIFF + new Date().getTime();
                    !d.data.actEndTime || n >= 1e3 * d.data.actEndTime ? "/pages/index/index" == d.data.jieshuUrl ? wx.switchTab({
                        url: d.data.jieshuUrl
                    }) : wx.redirectTo({
                        url: d.data.jieshuUrl
                    }) : s.getGoods(t, e, i);
                });
            },
            complete: function() {
                s.setData({
                    ready: !0
                }), wx.hideLoading && wx.hideLoading();
            }
        });
    },
    getGoods: function(t, e, i) {
        var n = this, s = e || 685, c = i || 200;
        wx.request({
            url: a.globalData.URL_MACT + t + "-biUserPayTop",
            data: {
                cate: s,
                num: c
            },
            success: function(a) {
                var t = a.data;
                if (1e3 == t.code) {
                    var e = t.data;
                    n.setData({
                        rankingList: e
                    });
                }
            }
        });
    },
    ScrollListen: function() {
        0 == t && (i.sendEventData({
            activity: "topbang11",
            activityparam: "topbang11_1002.0"
        }), t = !0);
    }
}, i.pageEvents));