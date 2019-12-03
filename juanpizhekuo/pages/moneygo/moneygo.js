var e = getApp(), t = void 0, i = 1, r = require("../../utils/util"), a = require("../../components/error-msg/error-msg"), s = require("../../utils/statistics");

Page(r.mergePage({
    data: {},
    onLoad: function(e) {
        t = e.refund_order_no, i = e.type || i, this.getLogistics(), s.sendZhugePageData("进入钱款去向页", {});
    },
    getLogistics: function() {
        var r = this, a = this, s = e.getPublicArg();
        s.gid = t, s.type = i, s.apisign = e.createApisign(s), wx.request({
            url: e.globalData.URL_MTRADE + "refund/moneytrace",
            data: s,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                wx.hideToast();
                var t = e.data.data;
                r.setData({
                    info: t.traceList[0]
                });
            },
            fail: function(e) {
                a.showErrorMsg("数据提交失败");
            }
        });
    }
}, a));