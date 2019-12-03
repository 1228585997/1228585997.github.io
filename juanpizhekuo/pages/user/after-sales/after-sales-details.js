var e = getApp(), a = require("../../../utils/util"), t = (require("../../../utils/statistics"), 
require("../../../components/toast/toast"));

Page(a.mergePage({
    data: {
        sgid: "",
        boid: "",
        refundFlow: [],
        subsidy: [],
        stepWidth: 1,
        curStepWidth: 1,
        curStep: 1,
        desc: "",
        amountInfo: {},
        subDesc: "",
        oprate: [],
        applyInfo: {},
        sellerInfo: {
            seller_adress: "",
            seller_name: "",
            seller_phone: ""
        },
        messages: {},
        expire: "",
        comparam: "",
        customer_deal_time: ""
    },
    onLoad: function(e) {
        (e.sgid || e.boid) && this.setData({
            sgid: e.sgid,
            boid: e.boid
        });
    },
    onReady: function() {},
    onShow: function() {
        e.checkLogin() ? (wx.showLoading && wx.showLoading({
            title: "加载中"
        }), this.getData()) : e.goLogin();
    },
    oprate: function(a) {
        var t = this, i = a.currentTarget.dataset.btn, s = a.currentTarget.dataset.comparam;
        if ("cancel" == i) wx.showLoading && wx.showLoading({
            title: "加载中"
        }), (d = Object.assign({}, e.getPublicArg(), {
            boid: this.data.boid,
            request_time: new Date().getTime() + 1e3 * e.globalData.TIME_DIFF,
            type: this.data.applyInfo.type
        })).apisign = e.createApisign(d), wx.request({
            url: e.globalData.URL_MTRADE + "refund/cancel",
            data: d,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            complete: function(e) {
                var a = e.data;
                wx.hideLoading && wx.hideLoading(), "1000" == a.code ? t.getData() : wx.showToast({
                    title: a.info,
                    icon: "loading",
                    duration: 2e3
                });
            }
        }); else if ("h5Jump" == i) wx.navigateTo({
            url: "../evaluate/evaluate?boid=" + this.data.boid
        }); else if ("moneyTrace" == i) wx.navigateTo({
            url: "../../moneygo/moneygo?type=1&boid=" + this.data.boid + "&refund_order_no=" + this.data.sgid
        }); else if ("inputDeliv" == i) wx.navigateTo({
            url: "../after-sales/after-sales-logistics?boid=" + this.data.boid
        }); else if ("delivView" == i) wx.navigateTo({
            url: "/pages/user/after-sales/after-sales-look-logistics?boid=" + this.data.boid
        }); else if ("contactCusSer" == i) wx.navigateTo({
            url: "../../webview/webview?url=https%3A%2F%2Fim.juanpi.com%2Fchat%2FchatBox%3FpType%3D11%26uid%3D3296719693%26uname%3Dleihou666&title=小卷在线"
        }); else if ("cusSerInter" == i) {
            if (this.data.customer_deal_time <= 0) return void this.showToastMsg(this.data.messages.cusSerInterErr);
            wx.navigateTo({
                url: "/pages/user/after-sales/after-sales-apply-service?boid=" + this.data.boid + "&sgid=" + this.data.sgid
            });
        } else if ("reapply" == i) {
            if (this.data.expire <= 0) return void this.showToastMsg(this.data.messages.reapplyErr);
            if (this.data.applyInfo.left_num <= 0) return void this.showToastMsg(this.data.messages.applyMaxErr);
            wx.navigateTo({
                url: "/pages/user/after-sales/after-sales-type?comparam=" + s
            });
        } else if ("urgeProcess" == i) {
            var o = this.data.applyInfo.type;
            4 != o && 6 != o || (o = 3), wx.showLoading && wx.showLoading({
                title: "加载中"
            });
            var d = Object.assign({}, e.getPublicArg(), {
                sgid: this.data.sgid,
                remindType: o
            });
            d.apisign = e.createApisign(d), wx.request({
                url: e.globalData.URL_MTRADE + "refund/urgeprocess",
                data: d,
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                complete: function(e) {
                    var a = e.data;
                    wx.hideLoading && wx.hideLoading(), a.code, wx.showToast({
                        title: a.info,
                        icon: "loading",
                        duration: 1500
                    });
                }
            });
        }
    },
    getData: function() {
        var a = this, t = Object.assign({}, e.getPublicArg(), {
            sgid: this.data.sgid,
            boid: this.data.boid,
            request_time: new Date().getTime() + 1e3 * e.globalData.TIME_DIFF
        });
        t.apisign = e.createApisign(t), wx.request({
            url: e.globalData.URL_MTRADE + "refund/info",
            data: t,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            complete: function(e) {
                var t = e.data;
                if (wx.hideLoading && wx.hideLoading(), "1000" == t.code) {
                    var i = void 0;
                    i = t.data.desc.subDesc.txt.split("\n");
                    for (var s = "", o = 0; o < i.length; o++) {
                        if (-1 != i[o].indexOf("*")) {
                            var d = i[o].match(/\*(.*)\*/)[1], r = i[o].split(i[o].match(/\*(.*)\*/)[0]);
                            i[o] = r.join('<span class="timeColor">' + d + "</span>");
                        }
                        s += "<div>" + i[o] + "</div>";
                    }
                    for (var n = 0, l = t.data.refundFlow.length; l--; ) if (t.data.refundFlow[l].step_status > 0) {
                        n = l;
                        break;
                    }
                    for (l = t.data.refundFlow.length; l--; ) t.data.refundFlow[l].step_name = t.data.refundFlow[l].step_name.replace("(客服介入中)", "");
                    a.setData({
                        subDesc: s,
                        curStep: n,
                        refundFlow: t.data.refundFlow,
                        stepWidth: 100 / t.data.refundFlow.length,
                        curStepWidth: n * (100 / t.data.refundFlow.length),
                        desc: t.data.desc.desc,
                        amountInfo: t.data.amountInfo,
                        applyInfo: t.data.applyInfo,
                        oprate: t.data.oprate,
                        subsidy: t.data.subsidy,
                        boid: t.data.boid,
                        sellerInfo: t.data.sellerInfo,
                        messages: t.data.messages,
                        expire: t.data.expire,
                        customer_deal_time: t.data.customer_deal_time
                    });
                } else wx.showToast({
                    title: t.info,
                    icon: "loading",
                    duration: 1500
                });
            }
        });
    }
}, t));