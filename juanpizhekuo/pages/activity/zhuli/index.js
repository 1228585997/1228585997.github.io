var t = getApp(), e = require("../../../utils/util"), a = (require("../../../utils/api"), 
require("../../../components/login-modal/index")), i = require("../../../components/share/share"), o = require("../../bargain/utils/tools").toast;

Page(e.mergePage({
    data: {
        isLogin: t.checkLogin(),
        uid: 0,
        isExpire: !1,
        goods: [],
        shareUser: [],
        msgList: [],
        isZhuli: !1,
        showRule: !1,
        personNum1: 0,
        personNum2: 8,
        shareImg: "https://jp.juancdn.com/wxMapp/zhuli/zhuli-02.png"
    },
    onLoad: function(e) {
        var a = this;
        this.setData({
            msgList: [ {
                title: "jp342123 成功领取 加厚垃圾袋(100只)"
            }, {
                title: "jp285327 成功领取 韩国多色面容干发帽"
            }, {
                title: "jp145643 成功领取 旅行收纳洗漱包6件套"
            }, {
                title: "jp637651 成功领取 升级彩编数据线二合一"
            }, {
                title: "jp345329 成功领取 防静电按摩美发梳"
            }, {
                title: "jp321412 成功领取 麦粒索牙刷-2支"
            }, {
                title: "jp451438 成功领取 厨房耐高温贴纸-2张"
            }, {
                title: "jp768678 成功领取 钢丝球(3个装)"
            } ]
        }), t.checkLogin() ? wx.showLoading({
            title: "加载中",
            mask: !0,
            success: function() {
                void 0 !== e.uid && a.setData({
                    uid: e.uid
                }), a.initData(a.data.uid);
            }
        }) : this.showLoginModal(!1);
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh(), wx.showLoading({
            title: "正在加载"
        }), this.initData(this.data.uid), wx.stopPullDownRefresh();
    },
    initData: function(t) {
        this.getNoticeList(), this.checkZhuli(t), this.sendShareInfo(t), this.getShareInfo(), 
        this.getGoodsInfo();
    },
    getNoticeList: function() {
        var e = this, a = {};
        wx.request({
            url: t.globalData.URL_MAPI + "act/getNoticeList",
            data: a,
            method: "GET",
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                var a = t.data, i = void 0 === a ? {} : a;
                i && 1e3 == i.code && i.data && e.setData({
                    msgList: i.data.notice,
                    isExpire: i.data.isExpire
                });
            },
            complete: function() {}
        });
    },
    checkZhuli: function(e) {
        var a = this;
        if (void 0 === e || "" == e || 0 == e) return this.setData({
            isZhuli: !1
        }), !1;
        var i = {
            uid: wx.getStorageSync("uid")
        };
        wx.request({
            url: t.globalData.URL_MAPI + "act/check",
            data: i,
            method: "GET",
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                var i = t.data, s = void 0 === i ? {} : i;
                s && 1e3 == s.code && 1 == s.data ? a.setData({
                    isZhuli: !0
                }) : (a.setData({
                    isZhuli: !1
                }), e != wx.getStorageSync("uid") && o("您不能帮助好友助力，可自己发起免费领取商品", 5e3));
            },
            complete: function() {}
        });
    },
    sendShareInfo: function(e) {
        if (void 0 === e || "" == e || 0 == e) return !1;
        var a = {
            spread_uid: e,
            approach_uid: wx.getStorageSync("uid"),
            avatar: wx.getStorageSync("avatarUrl")
        };
        wx.request({
            url: t.globalData.URL_MAPI + "act/auth",
            data: a,
            method: "GET",
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                var e = t.data, a = void 0 === e ? {} : e;
                a && 1e3 == a.code && a.data;
            },
            complete: function() {}
        });
    },
    getShareInfo: function() {
        var e = this, a = {
            spread_uid: wx.getStorageSync("uid"),
            platform: t.globalData.PLATFORM
        };
        wx.request({
            url: t.globalData.URL_MAPI + "act/count",
            data: a,
            method: "GET",
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                var a = t.data, i = void 0 === a ? {} : a;
                if (i && 1e3 == i.code && i.data) {
                    var o = i.data.data, s = i.data.total;
                    e.setData({
                        shareUser: o,
                        personNum1: s,
                        personNum2: 8 - s
                    });
                }
            },
            complete: function() {}
        });
    },
    getGoodsInfo: function() {
        var e = this, a = {
            page: 1,
            app_version: t.globalData.APP_VERSION,
            pageSize: 20,
            uid: wx.getStorageSync("uid"),
            msort: 0,
            platform: t.globalData.PLATFORM
        };
        wx.request({
            url: t.globalData.URL_MAPI + "act/prize",
            data: a,
            method: "GET",
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                var a = t.data, i = void 0 === a ? {} : a;
                if (i && 1e3 == i.code && i.data) {
                    var o = i.data;
                    e.setData({
                        goods: o
                    });
                }
                wx.hideLoading();
            },
            complete: function() {
                wx.hideLoading();
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
    pickFreeGoods: function(t) {
        if (this.data.personNum1 < 8) return o("成功邀请8个用户关注卷皮公众号即可免费领取商品哦", 5e3), !1;
        if (1 == this.data.isExpire) return o("活动结束了", 5e3), !1;
        var e = t.currentTarget.dataset.goods_id;
        if ("" == e || 0 == e) return o("网络忙，请稍后再试", 5e3), !1;
        wx.redirectTo({
            url: "/pages/bargain/expressAddress/index?goodsId=" + e
        });
    },
    gotoZhuliIndex: function() {
        wx.redirectTo({
            url: "/pages/activity/zhuli/index"
        });
    },
    gotoGoodsListIndex: function() {
        wx.redirectTo({
            url: "/pages/activity/zhuli/goodslist/index"
        });
    },
    onShareAppMessage: function(t) {
        var e = {
            title: "好友助力，免费领商品",
            img: this.data.shareImg,
            path: "pages/activity/zhuli/index?uid=" + wx.getStorageSync("uid")
        };
        return this.setData({
            showShareModal: !1
        }), e;
    }
}, o, a, i));