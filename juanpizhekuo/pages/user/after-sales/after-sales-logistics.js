var t = getApp(), i = require("../../../utils/util"), s = require("../../../utils/statistics"), o = require("../../../components/toast/toast"), a = require("../../../components/mask/mask"), e = "", n = !1;

Page(i.mergePage({
    data: {
        logistics: "请选择物流公司",
        logisticsArr: []
    },
    onLoad: function(i) {
        var s = this;
        t.checkLogin() || t.goLogin(!0), e = i.boid, wx.request({
            url: t.globalData.URL_MTRADE + "constant/expresscompamy",
            method: "GET",
            success: function(t) {
                "1000" == t.data.code ? s.setData({
                    logisticsArr: t.data.data
                }) : s.showToastMsg(t.data.info);
            }
        });
    },
    onShow: function() {},
    logisticsItemTap: function(t) {
        var s = t.currentTarget.dataset, o = s.companyname, a = s.code;
        this.setData({
            logistics: o,
            logisticscode: a
        }), i.maskDownAnimation(this, "showLogistics");
    },
    bindFormSubmit: function(i) {
        var s = this, o = i.detail.value.logisticsnum;
        if (!n) {
            if (n = !0, !this.data.logisticscode) return s.showToastMsg("请选择物流公司"), void (n = !1);
            if (!o) return s.showToastMsg("请填写物流单号"), void (n = !1);
            var a = t.getPublicArg();
            a.logistics = this.data.logisticscode, a.boid = e, a.boType = 1, a.code = o, a.giftcfm = 0, 
            a.request_time = new Date().getTime() + 1e3 * t.globalData.TIME_DIFF, a.apisign = t.createApisign(a), 
            wx.request({
                url: t.globalData.URL_MTRADE + "refund/delivery",
                data: a,
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    n = !1, "1000" == t.data.code ? wx.navigateBack({
                        delta: 1
                    }) : s.showToastMsg(t.data.info);
                }
            });
        }
    },
    closeLogistics: function() {
        i.maskDownAnimation(this, "showLogistics");
    },
    logisticsTap: function(t) {
        i.maskUpAnimation(this, "showLogistics");
    }
}, s.pageEvents, a, o));