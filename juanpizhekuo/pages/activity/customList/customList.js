var e = getApp(), t = require("../../../utils/util.js"), r = require("../../../utils/statistics"), o = require("../../../components/error-msg/error-msg"), a = require("../../../components/get-coupon/index"), i = require("../../../components/mask/mask"), n = require("../../../components/minicart/minicart");

Page(t.mergePage({
    data: {
        goodsArr: []
    },
    onLoad: function() {
        var t = this, r = e.getPublicArg();
        r.apisign = e.createApisign(r), wx.request({
            url: e.globalData.URL_MACT + "specifyAct-lotteryNameList",
            data: r,
            method: "GET",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            complete: function(e) {
                var r = e.data;
                "1000" == r.code && r.data.length > 0 && t.setData({
                    goodsArr: r.data
                });
            }
        });
    },
    onHide: function() {},
    onShow: function() {}
}, o, a, i, n, r.pageEvents));