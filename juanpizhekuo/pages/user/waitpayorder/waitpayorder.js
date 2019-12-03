var t = require("../../../utils/util"), e = require("../../../components/countdown/countdown"), a = require("../../../components/toast/toast"), o = require("../../../utils/statistics"), n = getApp();

Page(t.mergePage({
    data: {},
    copyOrder: function(t) {
        var e = t.currentTarget.dataset;
        o.sendEventData(e);
        var a = this;
        wx.setClipboardData({
            data: this.data.orderid,
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {
                        return a.showToastMsg("复制成功");
                    }
                });
            }
        });
    },
    bntClick: function(t) {
        var e = t.target.dataset.bnt;
        o.sendEventData(t.currentTarget.dataset);
        var a = n.getPublicArg();
        a.order_no = this.data.orderid;
        var r = n.globalData.URL_MTRADE + "order/";
        if ("cancelOrder" == e) {
            for (var i = this.data.cancelReasons, s = this, d = [], c = void 0, u = 0; u < i.length; u++) d.push(i[u].value);
            wx.showActionSheet({
                itemList: d,
                success: function(t) {
                    if (void 0 !== t.tapIndex) {
                        var d = t.tapIndex;
                        c = i[d].key, r += "cancel", a.reason = c, a.apisign = n.createApisign(a), s.bntOperation(r, a, e), 
                        o.sendEventData({
                            zhugeActivity: "取消订单",
                            zhugeActivityparam: {
                                "订单号": s.data.orderid,
                                "取消原因": i[d].value
                            }
                        });
                    }
                },
                fail: function(t) {
                    console.log(t.errMsg);
                }
            });
        }
    },
    bntOperation: function(t, e, a) {
        var o = this, n = this;
        wx.request({
            url: t,
            data: e,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                return 1e3 == t.data.code && setTimeout(function() {
                    wx.navigateTo({
                        url: "/pages/user/orderdetail/orderdetail?orderid=" + n.data.orderid
                    });
                }, 3e3), o.showToastMsg(t.data.info);
            },
            fail: function(t) {
                return o.showToastMsg("网络错误，请稍后再试~");
            }
        });
    },
    getData: function() {
        var t = this;
        if (n.checkLogin()) {
            wx.showLoading && wx.showLoading({
                title: "加载中"
            });
            var e = n.getPublicArg();
            e.order_no = this.data.orderid, e.apisign = n.createApisign(e), wx.request({
                url: n.globalData.URL_MTRADE + "order/detail",
                data: e,
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(e) {
                    if (wx.hideLoading && wx.hideLoading(), 1e3 == e.data.code) {
                        var a = e.data.data, o = "";
                        a.extra && a.extra.orderRelatedQuestion && a.extra.orderRelatedQuestion.btnTxt && (o = a.extra.orderRelatedQuestion.btnTxt), 
                        t.setData({
                            pay_status: a.status.msg,
                            remainPay: a.money.wait_pay,
                            username: a.contact && a.contact.user + " " + a.contact.mobile || "",
                            address: a.contact && a.contact.pca + a.contact.address || "",
                            hadpay: a.money.paid_amount,
                            wallet: a.money.amountTips,
                            walletPay: a.money.payTips.top,
                            original_order_no: a.info.original_order_no,
                            shops: a.shop_goods,
                            details: a.money.detail,
                            totalTips: a.money.pay_amount,
                            fan_money: a.money.fan_money,
                            create_time: a.info.create_time,
                            pay_type_name: a.pay.pay_type_name,
                            order_no: a.info.order_no,
                            cancelReasons: a.extra.cancelReasons,
                            order_question: o,
                            ready: !0,
                            virtualType: a.info.virtualType > 0,
                            leftTime: a.info.left_time
                        }), a.money.fan_money > 0 ? wx.setStorageSync("totalFanPrice", a.money.fan_money) : a.fanList && a.fanList.total > 0 && wx.setStorageSync("totalFanPrice", a.fanList.total), 
                        0 == parseInt(a.info.pay_status) && t.countdown({
                            left: a.info.left_time,
                            onEnd: function() {}
                        });
                    }
                },
                fail: function(t) {
                    console.log(t);
                }
            });
        } else this.showToastMsg("请登录后再来查看订单信息");
    },
    onLoad: function(t) {
        this.setData({
            orderid: t.orderid
        }), this.init(), o.sendZhugePageData("进入订单详情页", {});
    },
    init: function() {
        var t = this;
        o.getData("afterLogin") ? this.getData() : setTimeout(function() {
            t.init();
        }, 100);
    },
    pay: function(t, e, a) {
        wx.requestPayment(Object.assign({
            timeStamp: "",
            nonceStr: "",
            package: "",
            signType: "MD5",
            paySign: "",
            success: function(o) {
                wx.redirectTo({
                    url: "/pages/user/paysuccess/paysuccess?type=" + a + "&order_no=" + e + "&pay_no=" + t.pay_no
                });
            },
            fail: function() {
                wx.redirectTo({
                    url: "/pages/user/waitpayorder/waitpayorder?orderid=" + e
                });
            }
        }, t));
    },
    goPayTap: function(t) {
        var e = this, a = t.currentTarget.dataset;
        o.sendEventData(a);
        var r = n.getPublicArg();
        r.order_no = this.data.order_no, r.pay_type = 109, r.wxcode = wx.getStorageSync("openid"), 
        r.apisign = n.createApisign(r), wx.request({
            url: n.globalData.URL_MTRADE + "order/pay",
            data: r,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                var a = t.data;
                return 1e3 != a.code ? e.showToastMsg(a.msg || a.info || "error") : a.data.pay ? (o.sendEventData({
                    zhugeActivity: a.data.zg_event,
                    zhugeActivityparam: a.data.zg_json
                }), void e.pay(a.data.pay, e.data.order_no, a.data.type)) : e.showToastMsg("缺少支付参数！");
            }
        });
    },
    onShow: function() {
        o.sendPageData("page_temai_orderdetails", this.data.orderid, "进入订单详情页");
    }
}, e, a, o.pageEvents));