var t = getApp(), e = require("../../../utils/util.js"), o = require("../../../utils/statistics"), n = require("../../../components/error-msg/error-msg"), a = require("../../../components/get-coupon/index"), r = require("../../../components/mask/mask"), i = require("../../../components/minicart/minicart");

Page(e.mergePage({
    data: {
        goodsArr: [],
        day: "00",
        hour: "00",
        minute: "00",
        second: "00"
    },
    onLoad: function() {
        var e = this, o = t.getPublicArg();
        o.apisign = t.createApisign(o), wx.request({
            url: t.globalData.URL_MACT + "specifyAct-getGoodsList",
            data: o,
            method: "GET",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            complete: function(t) {
                var o = t.data;
                if ("1000" == o.code && o.data.length > 0) {
                    var n = parseInt((o.actEndTime - new Date().getTime() / 1e3).toString());
                    e.calcTime(n), e.setData({
                        goodsArr: o.data
                    });
                }
            }
        });
    },
    calcTime: function(t) {
        var e = this;
        if (t <= 0) return !1;
        var o = Math.floor(parseInt(t) / 60 / 60 / 24).toString(), n = Math.floor(parseInt(t) / 60 / 60 % 24).toString(), a = Math.floor(parseInt(t) / 60 % 60).toString(), r = Math.floor(parseInt(t) % 60).toString();
        return this.setData({
            day: o.length <= 1 ? "0" + o : o,
            hour: n.length <= 1 ? "0" + n : n,
            minute: a.length <= 1 ? "0" + a : a,
            second: r.length <= 1 ? "0" + r : r
        }), setTimeout(function() {
            e.calcTime(--t);
        }, 1e3), !0;
    },
    onHide: function() {},
    onShow: function() {
        o.sendPageData("page_custom", "");
    },
    onPageScroll: function(t) {
        t.scrollTop >= 400 ? this.setData({
            isTopHidden: !1
        }) : this.setData({
            isTopHidden: !0
        });
    },
    bindTopTap: function(t) {
        wx.pageScrollTo ? wx.pageScrollTo({
            scrollTop: 0
        }) : wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        });
    }
}, n, a, r, i, o.pageEvents));