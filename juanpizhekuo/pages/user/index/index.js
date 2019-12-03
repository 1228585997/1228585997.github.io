var t = getApp(), a = void 0, e = require("../../../utils/util"), n = require("../../../utils/statistics"), o = require("../../../components/toast/toast"), r = require("../../../components/blockAds/index");

Page(e.mergePage({
    data: {
        blockadsArr: [ [] ],
        backgroundSlide_ads: "",
        new_mark: !0,
        balance: "0.00",
        adId: "adunit-ca895d8156f742ae"
    },
    onLoad: function() {
        this.setData({
            curTab: 0
        });
        var t = this;
        e.getZyId(function(e) {
            a = "p16_" + e, t.getAds(a, "per_center", 0), t = null;
        }), 15206472e5 > new Date().getTime() > 15198696e5 ? this.setData({
            new_mark: !0
        }) : this.setData({
            new_mark: !1
        }), n.sendZhugePageData("进入我的卷皮", {});
    },
    getVipInfo: function(a) {
        var n = this, o = t.getPublicArg();
        wx.request({
            url: t.globalData.URL_MAPI + "distribution/user/info",
            data: o,
            method: "get",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                var a = t.data, o = void 0 === a ? {} : a;
                wx.hideLoading && wx.hideLoading();
                o.info;
                if ("1000" === o.code) {
                    var r = o.data;
                    if ("0" !== r.vipType) {
                        var i = void 0;
                        switch (r.vipType) {
                          case "1":
                            i = "VIP有效期至：" + e.formatDate(new Date(1e3 * r.endTime), "yyyy年MM月dd日");
                            break;

                          case "2":
                            i = "VIP有效期：永久有效";
                            break;

                          case "3":
                            i = "您的VIP会员已过期";
                        }
                        n.setData({
                            endTimeStr: i
                        });
                    }
                }
            }
        });
    },
    getUserInfo: function() {
        var a = this;
        wx.request({
            url: t.globalData.URL_M + "xcxuser/index",
            method: "POST",
            data: {
                xcx_uid: wx.getStorageSync("uid"),
                xcx_sign: wx.getStorageSync("xcx_sign")
            },
            success: function(t) {
                if (t.data && "1000" === t.data.code) {
                    var e = t.data.data;
                    a.setData({
                        uname: e.username,
                        avatar: e.avatar,
                        myAddress: e.myAddress,
                        recharge: e.recharge || "/pages/store/store?store_id=354376185",
                        allOrder: e.allOrder,
                        kefu: e.kefu,
                        userfeedback: e.userfeedback,
                        orderNo1Num: e.orderNo1.num,
                        orderNo1Url: e.orderNo1.url,
                        orderNo3Num: e.orderNo3.num,
                        orderNo3Url: e.orderNo3.url,
                        orderNo5Num: e.orderNo5.num,
                        orderNo5Url: e.orderNo5.url,
                        couponnum: e.couponnum,
                        myWalletNum: e.myWallet.num,
                        myWalletUrl: e.myWallet.url,
                        myCoupon: e.myCoupon,
                        notice: e.notice,
                        vipCardInfo: e.vipCardInfo
                    });
                }
            }
        });
    },
    getVipAccount: function() {
        var a = this;
        wx.request({
            url: t.globalData.URL_MAPI + "distribution/cash/info",
            method: "get",
            data: t.getPublicArg(),
            success: function(t) {
                (t = t.data).data && "1000" == t.code && a.setData({
                    balance: t.data.balance || 0
                });
            }
        });
    },
    onShow: function() {
        var a = this;
        t.checkLogin() ? (a.setData({
            hasLogin: !1,
            vipStatus: wx.getStorageSync("vipStatus")
        }), setTimeout(function() {
            a.getUserInfo();
        })) : (a.setData({
            hasLogin: !0
        }), a.getUserInfo()), this.getVipAccount(), this.getVipInfo(), n.sendPageData("page_center", "", "进入我的卷皮");
    },
    goLogin: function() {
        var a = this;
        t.goLogin(function(t) {
            t && wx.getStorageSync("uid") && (a.setData({
                hasLogin: !1
            }), setTimeout(function() {
                a.getUserInfo();
            }));
        });
    },
    hasLoginFn: function() {
        t.checkLogin() ? wx.navigateTo({
            url: this.data.userfeedback
        }) : this.goLogin();
    },
    wiatPay: function(a) {
        t.checkLogin() ? wx.navigateTo({
            url: this.data.orderNo1Url
        }) : this.goLogin();
        var e = a.currentTarget.dataset;
        n.sendEventData(e);
    },
    waitGroup: function(a) {
        t.checkLogin() ? wx.navigateTo({
            url: this.data.orderNo5Url
        }) : this.goLogin();
        var e = a.currentTarget.dataset;
        n.sendEventData(e);
    },
    waitThings: function(a) {
        t.checkLogin() ? wx.navigateTo({
            url: this.data.orderNo3Url
        }) : this.goLogin();
        var e = a.currentTarget.dataset;
        n.sendEventData(e);
    },
    allOrders: function(a) {
        t.checkLogin() ? wx.navigateTo({
            url: this.data.allOrder
        }) : this.goLogin();
        var e = a.currentTarget.dataset;
        n.sendEventData(e);
    },
    mySelect: function(a) {
        t.checkLogin() ? wx.navigateTo({
            url: "/pages/user/enshrine/enshrine"
        }) : this.goLogin(!0);
        var e = a.currentTarget.dataset;
        n.sendEventData(e);
    },
    myCoupon: function(a) {
        t.checkLogin() ? wx.navigateTo({
            url: this.data.myCoupon
        }) : this.goLogin(!0);
        var e = a.currentTarget.dataset;
        n.sendEventData(e);
    },
    topVipCard: function(a) {
        t.isPageInTab(this.data.vipCardImg.url) ? wx.switchTab({
            url: this.data.vipCardImg.url
        }) : wx.navigateTo({
            url: this.data.vipCardImg.url
        });
        var e = a.currentTarget.dataset;
        n.sendEventData(e);
    },
    vipCard: function(t) {
        this.showToastMsg("请前往卷皮App使用该功能");
        var a = t.currentTarget.dataset;
        n.sendEventData(a);
    },
    upGrade: function() {
        t.checkLogin() ? wx.navigateTo({
            url: "/pages/vip/accountDetail/accountDetail"
        }) : this.goLogin();
    },
    noticeTap: function() {
        1 == this.data.notice.event ? wx.showModal({
            title: "",
            content: this.data.notice.txt,
            confirmText: "我知道了",
            confirmColor: "#ff464e",
            showCancel: !1,
            success: function(t) {}
        }) : 2 == this.data.notice.event && wx.navigateTo({
            url: this.data.notice.url
        });
    }
}, n.pageEvents, r, o));