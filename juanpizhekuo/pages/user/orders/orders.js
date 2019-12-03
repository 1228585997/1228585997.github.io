function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t = getApp(), a = require("../../../utils/util"), o = require("../../../components/countdown/countdown.js"), r = require("../../../components/toast/toast"), n = require("../../../utils/statistics"), i = require("../../../components/todesk-tip/index"), s = require("../../../components/go-webview/index");

Page(a.mergePage({
    data: {
        tabs: [],
        curIndex: 0,
        pages: [],
        tabLists: [ "order", "nopay", "gopintuan", "transport" ],
        ready: !1
    },
    changeTab: function(e) {
        var t = e.currentTarget.dataset, a = e.currentTarget.dataset.index;
        this.setData({
            curIndex: a
        }), 0 === this.data.pages[a].orders.length && this.getNextPage(a), n.sendEventData(t);
    },
    btnTap: function(e) {
        var t = this, a = e.currentTarget.dataset.type, o = e.currentTarget.dataset.orderid;
        "催促发货" === a && wx.request({
            url: "https://mtrade.juanpi.com/xcxorder/reminddelivery",
            data: {
                xcx_uid: wx.getStorageSync("uid"),
                xcx_sign: wx.getStorageSync("xcx_sign"),
                order_no: o
            },
            method: "POST",
            complete: function(e) {
                t.showToastMsg(e.data.info);
            }
        }), n.sendEventData(e.currentTarget.dataset);
    },
    onLoad: function(e) {
        var t = parseInt(e.index, 10) || 0, a = parseInt(e.type, 10) || 0;
        wx.showLoading && wx.showLoading({
            title: "加载中"
        }), this.init(t, a), n.sendZhugePageData("进入订单列表页", {});
    },
    init: function(e, t) {
        var a = this;
        n.getData("afterLogin") ? this._init(e, t) : setTimeout(function() {
            a.init(e, t);
        }, 100);
    },
    _init: function(e, a) {
        var o = this;
        t.checkLogin() ? this.getOrders({
            page: 1,
            params: "0," + a
        }, function(t) {
            if (wx.hideLoading && wx.hideLoading(), "1000" === t.code) {
                var a = t.data.tab_menu.down;
                a.pop();
                var r = t.data.order_list, n = "0" !== t.data.hasMorePage, i = a.map(function(t, a) {
                    return {
                        title: t.txt,
                        param: "0," + t.type,
                        loaded: a === e
                    };
                }), s = t.data.queuePop, d = !!s, g = "";
                if (s) if (s.curStepNum >= 100) g = "position:absolute;right:44rpx;margin-left:0;"; else {
                    var u = 6.02 * s.curStepNum + 74 - 15;
                    g = "margin-left:" + u + "rpx";
                }
                var c = a.map(function(t, a) {
                    return {
                        orders: a === e ? r : [],
                        pageControl: {
                            page: a === e ? 1 : 0,
                            noMore: a === e && !n
                        },
                        showQueensView: a === e && d,
                        curPointStyle: a === e ? g : "",
                        queueData: a === e ? s : {}
                    };
                });
                o.initCountdown(c[e]), c[e] = o.formatPageData(c[e]);
                for (var p = 0; p < r.length; p++) {
                    var l = r[p].operate;
                    if (l && l.length) {
                        var f = l[0];
                        switch (f.order_param = r[p].info.order_no, f.btnTxt) {
                          case "立即邀请":
                            f.order_id = "click_temai_orderlist_invite", f.order_param = r[p].info.ptId;
                            break;

                          case "提醒发货":
                            f.order_id = "click_temai_orderlist_remind";
                            break;

                          case "查看物流":
                            f.order_id = "click_temai_orderlist_logisticsdetails";
                            break;

                          case "确认收货":
                            f.order_id = "click_temai_orderlist_receipt";
                            break;

                          case "去付款":
                            f.order_id = "click_temai_orderlist_pay";
                        }
                    }
                }
                o.setData({
                    tabs: i,
                    pages: c,
                    curIndex: e,
                    ready: !0
                });
            }
        }) : this.showToastMsg("请登录后再来查看订单信息");
    },
    getOrders: function(e, a) {
        var o = this, r = t.getPublicArg();
        r.page = e.page, r.params = e.params, r.apisign = t.createApisign(r), wx.request({
            url: t.globalData.URL_MTRADE + "order/lists2",
            data: r,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            complete: function(e) {
                e && e.data && (a(e.data), o.setData({
                    nowDate: new Date().getTime()
                }));
            }
        });
    },
    onReady: function() {},
    initCountdown: function(e) {
        var t = this;
        e.orders.forEach(function(e, a) {
            "0" !== e.info.leftTime && t.countdown({
                left: parseInt(e.info.leftTime, 10),
                timeKey: "clock." + e.info.order_no
            });
        });
    },
    formatPageData: function(e) {
        return e.orders.forEach(function(t, a) {
            var o = void 0;
            o = "待付款" === t.info.status_msg ? "/pages/user/waitpayorder/waitpayorder?orderid=" + t.info.order_no : "待成团" === t.info.status_msg && t.operate ? t.operate[0].xcx_jump_url : "/pages/user/orderdetail/orderdetail?orderid=" + t.info.order_no, 
            e.orders[a].jumpUrl = o, t.goods.forEach(function(t, o) {
                t.goodsTag && t.goodsTag.map(function(t, r) {
                    e.orders[a].goods[o].goodsTag[r].bdColor && (e.orders[a].goods[o].goodsTag[r].bdColor = e.orders[a].goods[o].goodsTag[r].bdColor.replace("0x", "#")), 
                    e.orders[a].goods[o].goodsTag[r].bgColor && (e.orders[a].goods[o].goodsTag[r].bgColor = e.orders[a].goods[o].goodsTag[r].bgColor.replace("0x", "#")), 
                    e.orders[a].goods[o].goodsTag[r].ftColor && (e.orders[a].goods[o].goodsTag[r].ftColor = e.orders[a].goods[o].goodsTag[r].ftColor.replace("0x", "#"));
                });
            });
        }), e;
    },
    getNextPage: function(t) {
        var a = this, o = this.data.pages[t].pageControl.page + 1;
        this.getOrders({
            page: o,
            params: this.data.tabs[t].param
        }, function(r) {
            if ("1000" === r.code) {
                var n, i = r.data.order_list, s = a.data.pages[t].showQueensView, d = a.data.pages[t].curPointStyle, g = a.data.pages[t].queueData;
                1 == o && r.data.queuePop && (s = !!(g = r.data.queuePop), d = g.curStepNum >= 100 ? "position:absolute;right:44rpx;margin-left:0;" : "margin-left:" + (6.02 * g.curStepNum + 74 - 15) + "rpx");
                var u = {
                    orders: a.data.pages[t].orders.concat(i),
                    pageControl: {
                        page: o,
                        noMore: "0" === r.data.hasMorePage
                    },
                    showQueensView: s,
                    curPointStyle: d,
                    queueData: g
                };
                a.initCountdown(u), u = a.formatPageData(u), a.setData((n = {}, e(n, "pages[" + t + "]", u), 
                e(n, "tabs[" + t + "].loaded", !0), n));
            }
        });
    },
    onShow: function() {
        "page_temai_paysuccess" === n.getData("pre_pagename") && this.setDeskTip("Order", "随时查看订单、物流状态"), 
        n.sendPageData("page_temai_orderlist", "", "进入订单列表页");
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.data.pages[this.data.curIndex].pageControl.noMore || this.getNextPage(this.data.curIndex);
    }
}, o, r, i, n.pageEvents, s));