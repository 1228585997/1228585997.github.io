var e = getApp(), t = void 0, a = require("../../../utils/util"), i = (require("../../../utils/http"), 
require("../../../components/toast/toast")), n = require("../../../utils/statistics"), o = require("../../../components/login-modal/index");

Page(a.mergePage({
    data: {
        isLogin: e.checkLogin(),
        goods: [],
        start: "",
        end: "",
        isVip: !1,
        inviteNum: 0,
        ready: !1,
        showRule: !1
    },
    onLoad: function(e) {
        wx.showLoading && wx.showLoading({
            title: "加载中"
        }), t = e.inviteCode || "", this.init(), this.data.isLogin || wx.hideShareMenu();
    },
    init: function() {
        var e = this;
        n.getData("afterLogin") ? this._init() : setTimeout(function() {
            e.init();
        }, 100);
    },
    _init: function() {
        e.checkLogin() ? t ? this.getRecommendInfo() : this.getUserInfo() : (wx.hideLoading && wx.hideLoading(), 
        this.showLoginModal(!1), this.setData({
            ready: !0
        })), this.getGoodsInfo();
    },
    getRecommendInfo: function(e) {
        return;
    },
    getGoodsInfo: function() {
        var t = this, i = e.getPublicArg();
        wx.request({
            url: e.globalData.URL_MAPI + "distribution/act1805/info",
            data: i,
            method: "get",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                var i = e.data, n = void 0 === i ? {} : i, o = n.code, s = n.info;
                if ("1000" === o && n.data.goods && n.data.goods.length) {
                    var d = a.formatDate(new Date(1e3 * n.data.starttime), "yyyy年MM月dd日") + "10:00:00-" + a.formatDate(new Date(1e3 * n.data.endtime), "yyyy年MM月dd日") + "10:00:00；", r = 1e3 * (parseInt(n.data.starttime) + 259200), c = a.formatDate(new Date(1e3 * n.data.starttime), "yyyy年MM月dd日") + "10:00:00-" + a.formatDate(new Date(r), "yyyy年MM月dd日") + "10:00:00";
                    t.setData({
                        goods: n.data.goods,
                        start: a.formatDate(new Date(1e3 * n.data.starttime), "yyyy.MM.dd"),
                        end: a.formatDate(new Date(1e3 * n.data.endtime), "yyyy.MM.dd"),
                        popupActTimeStr: d,
                        before3day: c,
                        shareImg: n.data.shareImg
                    });
                } else t.showToastMsg(s || "似乎遇到点了问题");
            },
            complete: function() {
                wx.hideLoading && wx.hideLoading();
            }
        });
    },
    getUserInfo: function(t) {
        var i = this, n = this, o = e.getPublicArg();
        wx.request({
            url: e.globalData.URL_MAPI + "distribution/user/info",
            data: o,
            method: "get",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                var t = e.data, o = void 0 === t ? {} : t, s = o.info, d = o.code;
                if ("1000" === d) {
                    var r = o.data;
                    if (n.setData({
                        vipType: r.vipType,
                        inviteNum: r.inviteNum,
                        inviteCode: r.inviteCode
                    }), "0" !== r.vipType) {
                        var c = void 0, g = void 0;
                        switch (r.vipType) {
                          case "1":
                            c = "有效期至：" + a.formatDate(new Date(1e3 * r.endTime), "yyyy年MM月dd日"), g = "vip";
                            break;

                          case "2":
                            c = "会员有效期：永久有效", g = "supervip";
                            break;

                          case "3":
                            c = "您的VIP会员已过期", g = "expirevip";
                        }
                        n.setData({
                            nickName: wx.getStorageSync("nickName") || r.nickName,
                            endTimeStr: c,
                            avatar: wx.getStorageSync("avatarUrl") || r.avatar,
                            totalIncome: r.totalIncome,
                            pendingIncome: r.pendingIncome,
                            shareIncome: r.shareIncome,
                            selfIncome: r.selfIncome,
                            vipImg: "https://jp.juancdn.com/wxMapp/vip/" + g + ".png",
                            balance: r.balance,
                            fansNum: r.fansNum
                        });
                    }
                } else "2001" == d ? i.showLoginModal(!1) : n.showToastMsg(s);
            },
            complete: function() {
                wx.hideLoading && wx.hideLoading(), t && wx.stopPullDownRefresh(), n.setData({
                    ready: !0,
                    isLogin: e.checkLogin()
                });
            }
        });
    },
    showRule: function() {
        this.setData({
            showRule: !0
        });
    },
    hideRule: function() {
        this.setData({
            showRule: !1
        });
    },
    onShow: function() {
        n.sendPageData("page_activity_newuser");
    },
    onShareAppMessage: function() {
        var t = this, a = this.data.shareImg ? this.data.shareImg.indexOf("http") >= 0 ? this.data.shareImg : "https://" + this.data.shareImg : "https://s2.juancdn.com/goods/180510/a/1/5af42b0e33b0897495260001_620x496.png", i = "pages/activity/newUser/index?inviteCode=" + t.data.inviteCode;
        return e.setShare("邀请好友升VIP,专享好礼,省钱赚佣金！快来一起躺着赚钱！", i, null, a);
    }
}, n.pageEvents, i, o));