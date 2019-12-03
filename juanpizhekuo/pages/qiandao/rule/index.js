var t = getApp(), e = require("../../../utils/util"), a = require("../../../utils/statistics"), r = require("../../../components/error-msg/error-msg");

Page(e.mergePage({
    data: {
        rules: []
    },
    onShow: function() {
        a.sendPageData("page_activity_rule", "");
    },
    onLoad: function(t) {
        this.getRules();
    },
    getRules: function() {
        var e = this;
        wx.request({
            url: t.globalData.URL_M + "xcxredpacket/getActivityInstruction",
            data: {
                xcx_uid: wx.getStorageSync("uid"),
                xcx_sign: wx.getStorageSync("xcx_sign"),
                from: "xcx_zhekou"
            },
            success: function(t) {
                var a = t.data;
                1e3 == a.code && a.data && a.data.length && e.setData({
                    rules: a.data
                });
            }
        });
    }
}, r, a.pageEvents));