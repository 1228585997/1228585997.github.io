var e = getApp(), t = require("../../../utils/util"), a = require("../../../utils/statistics"), i = require("../../../components/toast/toast");

Page(t.mergePage({
    data: {},
    onLoad: function(t) {
        var a = this;
        e.checkLogin() || e.goLogin(!0);
        var i = e.getPublicArg();
        i.boid = t.boid, i.app_version = i.jpAppVersion, i.uid = i.jpUid, i.request_time = new Date().getTime() + 1e3 * e.globalData.TIME_DIFF, 
        i.apisign = e.createApisign(i), wx.request({
            url: e.globalData.URL_MTRADE + "refund/express",
            data: i,
            method: "GET",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                "1000" == e.data.code ? a.setData(e.data.data) : a.showToastMsg(e.data.info);
            }
        });
    },
    onShow: function() {}
}, a.pageEvents, i));