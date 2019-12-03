var a = getApp(), t = require("../../../utils/util.js"), e = require("../../../components/toast/toast"), n = require("../../../components/error-msg/error-msg"), o = require("../../../utils/statistics");

Page(t.mergePage({
    data: {
        exchangeVal: ""
    },
    onLoad: function(t) {
        var e = this;
        wx.request({
            url: a.globalData.URL_M + "xcxcoupon/mylist",
            data: {
                xcx_uid: wx.getStorageSync("uid"),
                xcx_sign: wx.getStorageSync("xcx_sign"),
                pagenum: 99,
                app_version: a.globalData.APP_VERSION
            },
            method: "POST",
            complete: function(a) {
                a.data && a.data.code && e.setData({
                    code: a.data.code,
                    is_available: a.data.data.is_available,
                    empty_list: a.data.data.empty_list,
                    couponList: a.data.data.list
                });
            }
        }), o.sendZhugePageData("进入优惠券页", {});
    },
    onReady: function() {},
    onShow: function() {
        o.sendPageData("page_temai_couponavailable", "", "进入优惠券页");
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    submitExchange: function() {
        var a = this.data.exchangeVal;
        a && this.http_exchange(a);
    },
    bindExchangge: function(a) {
        this.setData({
            exchangeVal: a.detail.value
        });
    },
    http_exchange: function(e) {
        var n = this;
        wx.showLoading({
            title: "请稍后...",
            mask: !0
        });
        var o = a.getPublicArg();
        o.coupon_code = e, o.apisign = a.createApisign(o), t.post({
            url: a.globalData.URL_MUSER + "coupon/activate",
            data: o,
            complete: function(a) {
                wx.hideLoading(), "1000" == a.data.code ? n.showToastMsg("兑换成功", null, null, null) : n.showToastMsg(a.data.info, null, null, null);
            }
        }, !0);
    }
}, n, o.pageEvents, e));