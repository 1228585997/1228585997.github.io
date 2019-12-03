var e = getApp(), t = require("../../../utils/util"), i = require("../../../utils/statistics"), s = require("../../../components/toast/toast"), a = require("../../../components/mask/mask"), o = require("../../../components/sku/sku"), n = require("./components/after-sales-form"), r = void 0, u = void 0;

Page(t.mergePage({
    data: {
        isNoteRequired: 1,
        isProofRequired: 0,
        imgList: []
    },
    onLoad: function(t) {
        e.checkLogin() || e.goLogin(!0), r = t.boid, u = t.sgid;
    },
    onShow: function() {},
    bindFormSubmit: function(t) {
        var i = this;
        if (1 != this.data.isNoteRequired || t.detail.value.note) if (1 != this.data.isProofRequired || 0 != this.data.imgList.length) {
            for (var s = [], a = 0; a < this.data.imgList.length; a++) s.push(this.data.imgList[a].osrc);
            var o = e.getPublicArg();
            o.boid = r, o.sgid = u, o.note = t.detail.value.note, o.pics = s.join(","), o.request_time = new Date().getTime() + 1e3 * e.globalData.TIME_DIFF, 
            o.consult_type = 2, o.apisign = e.createApisign(o), wx.request({
                url: e.globalData.URL_MTRADE + "refund/consult",
                data: o,
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(e) {
                    "1000" == e.data.code ? wx.navigateBack({
                        delta: 1
                    }) : i.showToastMsg(e.data.info);
                }
            });
        } else i.showToastMsg("请上传凭证"); else i.showToastMsg("请填写售后说明");
    }
}, i.pageEvents, a, n, o, s));