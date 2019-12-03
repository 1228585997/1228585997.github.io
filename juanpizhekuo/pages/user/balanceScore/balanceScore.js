var t = getApp(), a = require("../../../utils/util"), e = require("../../../utils/statistics");

Page(a.mergePage({
    onLoad: function() {
        wx.getStorageSync("uid") ? this.getBalanceInfo() : (wx.showToast({
            title: "请先登录",
            icon: "success",
            duration: 3e3
        }), setTimeout(function() {
            wx.navigateTo({
                url: "../../login/login"
            });
        }, 1e3));
    },
    getBalanceInfo: function() {
        var a = this;
        wx.request({
            url: t.globalData.URL_M + "xcxpurse/wallet",
            method: "POST",
            data: {
                xcx_uid: wx.getStorageSync("uid"),
                xcx_sign: wx.getStorageSync("xcx_sign")
            },
            success: function(t) {
                var e = t.data, s = void 0 === e ? {} : e;
                2001 == s.code || 2002 == s.code ? wx.showToast({
                    title: "您的网络有问题，请稍后重试",
                    icon: "success",
                    duration: 2e3
                }) : (console.log(s), a.setData({
                    amount: s.data.amount,
                    cash_balance: s.data.cash_balance,
                    consume_balance: s.data.consume_balance,
                    lists: s.data.lists,
                    url: s.data.url
                }));
            }
        });
    },
    JpTips: function() {
        wx.showToast({
            title: "功能开发中，请前往卷皮app/微信商城操作",
            icon: "success",
            duration: 2e3
        });
    }
}, e.pageEvents));