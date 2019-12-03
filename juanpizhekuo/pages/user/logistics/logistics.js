var a = getApp(), e = require("../../../utils/util.js"), t = require("../../../utils/statistics"), r = require("../../../components/error-msg/error-msg"), o = void 0;

Page(e.mergePage({
    data: {
        packages: [],
        orderId: ""
    },
    onLoad: function(r) {
        var s = this;
        o = r.orderId, this.setData({
            orderId: o
        }), e.post({
            url: a.globalData.URL_M + "xcxorder/multexpress",
            data: {
                xcx_uid: wx.getStorageSync("uid"),
                xcx_sign: wx.getStorageSync("xcx_sign"),
                order_no: r.orderId
            },
            complete: function(a) {
                if (a.data && a.data.code && "1000" === a.data.code) {
                    if (a.data.data.expressPackage && 0 !== a.data.data.expressPackage[0].goodsList.length) {
                        var e = !1, t = a.data.data.solution.oprate;
                        if (t && t.length > 0) for (var r = 0; r < t.length; r++) if ("urgeDeliver" === t[r].btn) {
                            e = !0;
                            break;
                        }
                        s.setData({
                            ifShowUrge: e,
                            packages: a.data.data.expressPackage
                        });
                    }
                } else s.showErrorMsg(a.data && a.data.info ? a.data.info : "网络异常");
            }
        }), t.sendZhugePageData("进入物流详情页", {});
    },
    onShow: function(a) {
        t.sendPageData("page_temai_multi_logistics", '{"order_no":' + o + "}", "进入物流详情页");
    },
    copyNo: function(a) {
        var e = a.currentTarget.dataset.no;
        wx.setClipboardData({
            data: e,
            success: function(a) {
                wx.getClipboardData({
                    success: function(a) {
                        wx.showToast({
                            title: "复制成功",
                            duration: 2e3
                        });
                    }
                });
            }
        });
    },
    callPhone: function(a) {
        var e = a.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: e
        });
    },
    urgingLogistics: function(e) {
        var r = a.getPublicArg();
        r.order_no = this.data.orderId, r.apisign = a.createApisign(r), wx.request({
            url: a.globalData.URL_MTRADE + "order/urgeDeliver",
            data: r,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(a) {
                var e = a.data.info;
                wx.showModal({
                    content: e,
                    showCancel: !1
                });
            }
        });
        var o = e.currentTarget.dataset;
        t.sendEventData(o);
    }
}, r, t.pageEvents));