var e = require("../../../utils/util"), t = require("../../../components/countdown/countdown"), a = require("../../../components/toast/toast"), i = require("../../../utils/statistics"), s = require("../../../components/go-webview/index"), r = getApp();

Page(e.mergePage({
    data: {
        ready: !1
    },
    service: function(e) {
        var t = e.currentTarget.dataset;
        return i.sendEventData(t), this.showToastMsg("该功能正在开发，如需售后请前往卷皮APP。");
    },
    copyOrder: function(e) {
        var t = e.currentTarget.dataset;
        i.sendEventData(t);
        var a = this;
        wx.setClipboardData({
            data: this.data.orderid,
            success: function(e) {
                wx.getClipboardData({
                    success: function(e) {
                        return a.showToastMsg("复制成功");
                    }
                });
            }
        });
    },
    bntClick: function(e) {
        var t = e.target.dataset.bnt, a = r.getPublicArg();
        a.order_no = this.data.orderid;
        var s = r.globalData.URL_MTRADE + "order/", n = [];
        switch (n.activityparam = this.data.orderid, t) {
          case "confirmDelivery":
            n.activity = "click_temai_orderdetails_receipt", s += "confirm";
            break;

          case "h5Jump":
            return n.activity = "click_temai_orderdetails_item", n.activityparam = this.data.ptid ? this.data.ptid : 0, 
            i.sendEventData(n), void wx.navigateTo({
                url: e.target.dataset.url
            });

          case "remindDelivery":
            n.activity = "click_temai_orderdetails_remind", s += "reminddelivery";
            break;

          case "showExpress":
            return n.activity = "click_temai_orderdetails_logisticsdetails", i.sendEventData(n), 
            void this.logistics();

          case "cancelOrder":
            n.activity = "click_temai_orderdetails_cancel";
            for (var o = this.data.cancelReasons, d = this, c = [], u = void 0, l = 0; l < o.length; l++) c.push(o[l].value);
            return void wx.showActionSheet({
                itemList: c,
                success: function(e) {
                    if (void 0 !== e.tapIndex) {
                        var n = e.tapIndex;
                        u = o[n].key, s += "cancel", a.reason = u, a.apisign = r.createApisign(a), d.bntOperation(s, a, t), 
                        i.sendEventData({
                            zhugeActivity: "取消订单",
                            zhugeActivityparam: {
                                "订单号": d.data.orderid,
                                "取消原因": o[n].value
                            }
                        });
                    }
                },
                fail: function(e) {
                    console.log(e.errMsg);
                }
            });

          case "delOrder":
            n.activity = "click_temai_orderdetails_delorder", s += "delete";
        }
        i.sendEventData(n), a.apisign = r.createApisign(a), this.bntOperation(s, a, t);
    },
    bntOperation: function(e, t, a) {
        var i = this;
        wx.request({
            url: e,
            data: t,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                return "delOrder" == a && 1e3 == e.data.code && setTimeout(function() {
                    wx.navigateTo({
                        url: "/pages/user/orders/orders"
                    });
                }, 3e3), "cancelOrder" != a && "confirmDelivery" != a || 1e3 != e.data.code || setTimeout(function() {
                    i.getData();
                }, 3e3), i.showToastMsg(e.data.info);
            },
            fail: function(e) {
                return i.showToastMsg("网络错误，请稍后再试~");
            }
        });
    },
    openlogistics: function(e) {
        var t = e.currentTarget.dataset;
        i.sendEventData(t), this.logistics();
    },
    logistics: function() {
        1 == this.data.express.isJump && wx.navigateTo({
            url: "/pages/user/logistics/logistics?orderId=" + this.data.orderid
        });
    },
    getData: function() {
        var e = this;
        if (r.checkLogin()) {
            wx.showLoading && wx.showLoading({
                title: "加载中"
            });
            var t = r.getPublicArg();
            t.order_no = this.data.orderid, t.xcx_sign = wx.getStorageSync("xcx_sign"), t.apisign = r.createApisign(t), 
            wx.request({
                url: r.globalData.URL_MTRADE + "order/detail",
                data: t,
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    if (wx.hideLoading && wx.hideLoading(), 1e3 == t.data.code) {
                        var a = t.data.data, i = "", s = [], r = "", n = "", o = "", d = parseInt(a.status.code);
                        switch (d) {
                          case 9:
                            i = "../../../images/pay_status_1.png";
                            break;

                          case 3:
                            i = "../../../images/pay_status_3.png";
                            break;

                          case 11:
                          case 12:
                          case 8:
                            i = "../../../images/pay_status_2.png";
                            break;

                          case 4:
                            i = "../../../images/pay_status_4.png";
                            break;

                          case 5:
                            i = "../../../images/pay_status_5.png";
                        }
                        a.extra && a.extra.orderRelatedQuestion && a.extra.orderRelatedQuestion.btnTxt && (o = a.extra.orderRelatedQuestion.btnTxt), 
                        a.extra && a.extra.orderAction && s.push(a.extra.orderAction);
                        for (var c = 0; c < a.operate.length; c++) s.push(a.operate[c]);
                        a.express && a.express.data && a.express.data[0] ? (n = a.express.data[0].context, 
                        r = a.express.data[0].time) : n = a.express.msg;
                        var u = "", l = "";
                        a.contact && (u = a.contact.user + " " + a.contact.mobile, l = a.contact.pca + a.contact.address), 
                        e.setData({
                            pay_status: a.status.msg,
                            pay_content: a.status.content,
                            pay_desc_img: i,
                            order_question: o,
                            status_code: d,
                            username: u,
                            address: l,
                            original_order_no: a.info.original_order_no,
                            shops: a.shop_goods,
                            details: a.money.detail,
                            totalTips: a.money.pay_amount,
                            fan_money: a.money.fan_money,
                            create_time: a.info.create_time,
                            pay_type_name: a.pay.pay_type_name,
                            order_no: a.info.order_no,
                            bnts: s,
                            cancelReasons: a.extra.cancelReasons || [],
                            refundDirection: a.extra.refundDirection || {},
                            remark: a.status.remark || "",
                            express_text: n || "",
                            express_time: r,
                            ptid: a.info.ptId,
                            express: a.express,
                            ready: !0,
                            virtualType: a.info.virtualType > 0
                        });
                    }
                },
                fail: function(e) {
                    console.log(e);
                }
            });
        } else this.showToastMsg("请登录后再来查看订单信息");
    },
    onLoad: function(e) {
        this.setData({
            orderid: e.orderid
        }), this.init(), i.sendZhugePageData("进入订单详情页", {});
    },
    init: function() {
        var e = this;
        i.getData("afterLogin") ? this.getData() : setTimeout(function() {
            e.init();
        }, 100);
    },
    onShow: function() {
        i.sendPageData("page_temai_orderdetails", this.data.orderid, "进入订单详情页");
    }
}, t, a, i.pageEvents, s));