var a = getApp(), t = require("../../../utils/util"), e = require("../../../utils/statistics"), i = require("../../../components/toast/toast"), s = require("../../../components/mask/mask"), o = require("../../../components/sku/sku"), n = require("./components/after-sales-form"), d = void 0, r = void 0, u = void 0;

Page(t.mergePage({
    data: {
        ready: !1,
        info: null,
        curStep: 0,
        imgList: [],
        ifGoCheckout: !1,
        isVirtual: 0,
        ifAftersales: !0,
        selSkuTxt: "请选择：颜色、尺码",
        selSkuId: "",
        num: 1
    },
    onLoad: function(t) {
        var e = this;
        a.checkLogin() || a.goLogin(!0), u = t, e.getInfo();
    },
    getInfo: function(t) {
        var e = this;
        wx.showLoading && wx.showLoading({
            title: "加载中"
        }), d = JSON.parse(u.comparam).refundType;
        var i = a.getPublicArg();
        i.app_version = i.jpAppVersion, i.comParam = u.comparam, i.extraParam = u.extraparam, 
        i.request_time = new Date().getTime() + 1e3 * a.globalData.TIME_DIFF, i.uid = i.jpUid, 
        t && (i.num = t), i.apisign = a.createApisign(i), wx.request({
            url: a.globalData.URL_MTRADE + "refundapply/info",
            data: i,
            method: "GET",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(a) {
                if (wx.hideLoading && wx.hideLoading(), "1000" == a.data.code) {
                    r = a.data.data.comParam;
                    for (var i = 0, s = a.data.data.flowView.length; s--; ) if (a.data.data.flowView[s].step_status > 0) {
                        i = s;
                        break;
                    }
                    for (s = a.data.data.flowView.length; s--; ) a.data.data.flowView[s].step_name = a.data.data.flowView[s].step_name.replace("(客服介入中)", "");
                    e.setData({
                        info: a.data.data,
                        curStep: i,
                        stepWidth: 100 / a.data.data.flowView.length,
                        curStepWidth: i * (100 / a.data.data.flowView.length),
                        refundType: d
                    }), t || e.setData({
                        num: a.data.data.goodsInfo.num
                    });
                } else _this.showToastMsg(a.data.info);
            },
            complete: function() {
                e.setData({
                    ready: !0
                });
            }
        });
    },
    onShow: function() {},
    bindFormSubmit: function(t) {
        var e = this;
        t.currentTarget.dataset;
        if (1 != this.data.info.isNoteRequired || t.detail.value.note) if (1 != this.data.info.isProofRequired || 0 != this.data.imgList.length) {
            if (6 == this.data.refundType) {
                if (!this.data.selSkuId) return void e.showToastMsg("请先选择你要更换的商品");
                if (parseFloat(this.data.info.goodsInfo.cprice) != parseFloat(this.data.selSkuCprice)) return void e.showToastMsg("请选择同等价格的商品");
            }
            for (var i = [], s = 0; s < this.data.imgList.length; s++) i.push(this.data.imgList[s].osrc);
            var o = a.getPublicArg();
            o.comParam = r, o.note = t.detail.value.note, o.num = this.data.num, o.pics = i.join(","), 
            o.request_time = new Date().getTime() + 1e3 * a.globalData.TIME_DIFF, 6 == this.data.refundType && (o.skuId = this.data.selSkuId), 
            o.apisign = a.createApisign(o), wx.request({
                url: a.globalData.URL_MTRADE + "refund/apply",
                data: o,
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(a) {
                    if ("1000" == a.data.code) {
                        var t = JSON.parse(r).sg_id;
                        wx.redirectTo({
                            url: "/pages/user/after-sales/after-sales-details?sgid=" + t + "&boid=" + a.data.data.boid
                        });
                    } else e.showToastMsg(a.data.info);
                }
            });
        } else e.showToastMsg("请上传凭证"); else e.showToastMsg("请填写售后说明");
    },
    closeRule: function() {
        t.maskDownAnimation(this, "showRule");
    },
    showRule: function() {
        t.maskUpAnimation(this, "showRule");
    },
    showSku: function(a) {
        var t = this;
        this.initSku(this.data.info.goodsInfo.s_sgoods_id, function() {
            t.openSku(a, 1);
        });
    },
    decGood: function() {
        if (!(this.data.num <= 1)) {
            var a = --this.data.num;
            this.setData({
                num: a
            }), this.getInfo(a);
        }
    },
    incGood: function() {
        if (!(this.data.num >= this.data.info.goodsInfo.num)) {
            var a = ++this.data.num;
            this.setData({
                num: a
            }), this.getInfo(a);
        }
    }
}, e.pageEvents, s, n, o, i));