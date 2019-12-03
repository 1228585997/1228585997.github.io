var t = getApp(), a = require("../../../utils/util.js"), e = require("../../../utils/statistics"), i = require("../../../components/blockAds/index"), d = !1;

Page(a.mergePage({
    data: {
        query: null,
        time: 3
    },
    getResult: function() {
        var a = this, i = t.getPublicArg();
        i.order_no = this.data.query.order_no, i.pay_no = this.data.query.pay_no, i.type = this.data.query.type, 
        i.pay_type = 109, i.client_pay_code = "SUCCESS", i.apisign = t.createApisign(i), 
        wx.request({
            url: t.globalData.URL_MTRADE + "order/result",
            data: i,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            complete: function(t) {
                if (1 == (t.data.data || {}).is_lottery && wx.navigateTo({
                    url: "/pages/bigsixwheel/index?act=guide"
                }), a.setData({
                    title: t.data.data.title,
                    order_tips: t.data.data.order_tips.length > 0 ? t.data.data.order_tips[0].desc : "",
                    url: 3 == a.data.query.type || 4 == a.data.query.type || 5 == a.data.query.type ? t.data.data.finish_url : "/pages/user/orderdetail/orderdetail?orderid=" + a.data.query.order_no,
                    queuePop: t.data.data.queuePop || !1,
                    fan_price: wx.getStorageSync("totalFanPrice"),
                    isVip: wx.getStorageSync("vipStatus") > 0
                }), t.data.data.bottom_content.new_ads_url) a.getMiddlePopAds(t.data.data.bottom_content.new_ads_url); else {
                    a.getMiddlePopAds("https://mapi.juanpi.com/appads/new_ads?app_version=${jpAppVersion}&identify=${identify}&platform=${jpPlatform}");
                }
                e.sendEventData({
                    zhugeActivity: t.data.data.zg_event,
                    zhugeActivityparam: t.data.data.zg_json
                });
            }
        });
    },
    getMiddlePopAds: function(a) {
        var e = this;
        a = (a = (a = a.replace("${identify}", "paysuccessxcx")).replace("${jpPlatform}", t.globalData.PLATFORM)).replace("${jpAppVersion}", t.globalData.APP_VERSION), 
        wx.request({
            url: a,
            method: "GET",
            complete: function(t) {
                e.setData({
                    banner_ads: t.data.data.banner_ads || !1,
                    mid_popup_ads: t.data.data.mid_popup_ads || !1
                });
            }
        });
    },
    onShow: function() {
        e.sendPageData("page_temai_paysuccess", this.data.query.order_no, "进入支付结果页");
    },
    onLoad: function(t) {
        this.setData({
            query: t
        });
        var i = this;
        a.getZyId(function(t) {
            d = "p16_" + t, i.getResult(), i.getAds(d, "paysuccess", 0), i.getLikeGoods();
        }), 3 != t.type && 4 != t.type && 5 != t.type || (this.inter = setInterval(function() {
            var t = --i.data.time;
            if (t <= 0) {
                if (i.data.url) return i.setData({
                    time: t
                }), clearInterval(i.inter), void wx.redirectTo({
                    url: i.data.url
                });
                clearInterval(i.inter), wx.redirectTo({
                    url: "/pages/user/orders/orders"
                });
            }
            i.getResult(), i.setData({
                time: t
            });
        }, 1e3)), e.sendZhugePageData("进入支付结果页", {});
    },
    getLikeGoods: function() {
        var a = this, e = {
            uid: wx.getStorageSync("uid"),
            app_version: t.globalData.APP_VERSION,
            platform: t.globalData.PLATFORM
        };
        e.apisign = t.createApisign(e), wx.request({
            url: t.globalData.URL_MAPI + "goodsintro/pay/goods",
            data: e,
            method: "GET",
            complete: function(t) {
                var e = t.data.data;
                a.setData({
                    likeGoodsList: e.goods
                });
            }
        });
    },
    closeAdsDialog: function() {
        this.setData({
            mid_popup_ads: !1
        });
    },
    closePrincessBox: function() {
        this.setData({
            queuePop: !1
        });
    },
    doNothing: function() {}
}, i, e.pageEvents));