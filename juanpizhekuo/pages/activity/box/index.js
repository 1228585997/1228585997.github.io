var t = getApp(), e = void 0, o = void 0, a = void 0, n = void 0, i = require("../../../utils/util"), s = (require("../../../utils/api"), 
require("../../../components/toast/toast")), c = require("../../../utils/statistics"), r = require("../../../components/login-modal/index"), d = require("../../../components/share/share"), h = require("../../../components/send-formid/index");

Page(i.mergePage({
    data: {
        isLogin: t.checkLogin(),
        goods: [],
        ready: !1,
        showRule: !1,
        showHelp: !1,
        showReceive: !1,
        showInviteSuccess: !1,
        showRedenvelope: !1,
        shareModalImg: "https://goods2.juancdn.com/seller/180629/2/8/5b35ddb133b08962561e9f79_750x600.png?imageMogr2/quality/70!/format/jpg",
        shareImg: "https://jp.juancdn.com/wxMapp/box/act-box-share-image.png",
        shareTitle: "",
        title: "",
        start: 0,
        end: 0,
        notice: [],
        endTime: 0,
        status: 0,
        helpList: [ {}, {}, {} ],
        createErr: 0,
        countDownDay: 0,
        countDownHour: 0,
        countDownMinute: 0,
        countDownSecond: 0,
        helpShorthanded: "",
        percent: 0,
        interval: null,
        rules: [ "1.用户可邀请好友开宝箱，集齐三位好友便可打开宝箱，赢取无门槛现金券；", "2.每个红包发起后24小时未组满3人即失败，无法获得无门槛现金券奖励；", "3.获得期间，每个用户不能多次帮同一好友开宝箱，但发起开宝箱次数不限；", "4.发起开宝箱的用户需在该宝箱满3人拆成功或逾期失败后，才可再发起拆下一个宝箱；", "5.开宝箱活动赠送无门槛现金券；", "6.如果用户存在违规行为（包括但不限于虚假交易，恶意操作，作弊等），主办方将取消相关违规交易，收回奖励（包括已消费金额）等利益，同时依照相关规则进行处罚；", "7.如出现不可抗力或者情势变更的情况（包括但不限于重大灾害事件、活动受政府机关指令需要停止举办或者调整的、活动遭受严重网络攻击或因系统故障需要暂停举办的），则主办方可依相关法律法规的规则主张免责。" ],
        inviteName: ""
    },
    onLoad: function(t) {
        wx.showLoading && wx.showLoading({
            title: "加载中",
            mask: !0
        }), n = t.inviteName || "", e = t.inviteCode || wx.getStorageSync("otherInviteCode"), 
        this.init(), this.data.isLogin || wx.hideShareMenu(), this.setData({
            avatarUrl: wx.getStorageSync("avatarUrl"),
            inviteName: n
        });
    },
    init: function(t) {
        var e = this;
        t && (wx.showLoading({
            title: "加载中",
            mask: !0
        }), this.setData({
            helpList: [ {}, {}, {} ]
        }), e.data.interval && clearInterval(this.data.interval), e.data.interval = null), 
        c.getData("afterLogin") ? this._init(t) : setTimeout(function() {
            e.init();
        }, 100);
    },
    _init: function(o) {
        t.checkLogin() ? e && this.getRecommendInfo() : (wx.hideLoading && wx.hideLoading(), 
        this.showLoginModal(), this.setData({
            ready: !0
        })), this.getActInfo(), this.getGoodsInfo(), o && (wx.stopPullDownRefresh(), wx.hideLoading());
    },
    onPullDownRefresh: function() {
        this.init(!0);
    },
    showNotice: function() {
        var t = this, e = 0, a = 1;
        o || (o = setInterval(function() {
            e = Math.floor(5 * Math.random()), a = Math.floor(5 * Math.random()) + 5, t.setData({
                notice1: t.data.notice[e],
                notice2: t.data.notice[a]
            });
        }, 3e3), this.setData({
            notice1: this.data.notice[0],
            notice2: this.data.notice[1]
        }));
    },
    getRecommendInfo: function(o) {
        var a = this, n = t.getPublicArg();
        n.code = e, n.name = wx.getStorageSync("nickName"), n.avatar = wx.getStorageSync("avatarUrl"), 
        wx.request({
            url: t.globalData.URL_MAPI + "distribution/actBox/help",
            data: n,
            method: "get",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                var e = t.data, o = void 0 === e ? {} : e;
                o && 1e3 == o.code && a.showInviteSuccess();
            }
        });
    },
    getGoodsInfo: function() {
        var e = this, o = {
            scene_key: "fenxiao_9.9baoyou",
            page: 1,
            app_version: t.globalData.APP_VERSION,
            pageSize: 20,
            uid: wx.getStorageSync("uid"),
            msort: 0,
            platform: t.globalData.PLATFORM
        };
        wx.request({
            url: t.globalData.URL_MAPI + "xcxgoods/goodslist",
            data: o,
            method: "GET",
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                var o = t.data, a = void 0 === o ? {} : o;
                if (a && 1e3 == a.code && a.data && a.data) {
                    var n = a.data;
                    e.setData({
                        goods: n.goods
                    });
                }
            },
            complete: function() {}
        });
    },
    getActInfo: function() {
        var e = this, o = t.getPublicArg();
        wx.getStorageSync("openid") ? (o.openid = wx.getStorageSync("openid"), wx.request({
            url: t.globalData.URL_MAPI + "distribution/actBox/info",
            data: o,
            method: "get",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(o) {
                var a = o.data, n = void 0 === a ? {} : a, i = n.info;
                if ("1000" === n.code) {
                    var s = n.data;
                    s.actInfo.title && wx.setNavigationBarTitle({
                        title: s.actInfo.title
                    }), s.helpList = s.helpList ? s.helpList : [];
                    for (var c = 0; c < s.helpList.length; c++) e.data.helpList[c] = s.helpList[c];
                    e.setData({
                        notice: s.notice,
                        endTime: s.endTime || 0,
                        status: s.status,
                        helpList: e.data.helpList,
                        createErr: s.createErr,
                        personNum: 3 - s.helpList.length,
                        money: s.money
                    }), 1 == s.helpList.length && e.showHelp(), 1 == s.status && e.showReceive(), 0 == s.createErr && t.checkLogin() && e.showLeftTime();
                } else wx.showToast({
                    title: i,
                    icon: "none",
                    duration: 3e3,
                    mask: !0
                });
            },
            complete: function() {
                wx.hideLoading && wx.hideLoading(), e.setData({
                    ready: !0,
                    isLogin: t.checkLogin()
                });
            }
        })) : setTimeout(function() {
            e.getActInfo();
        }, 300);
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
    showReceive: function() {
        this.setData({
            showReceive: !0
        });
    },
    hideReceive: function() {
        this.setData({
            showReceive: !1
        });
        var e = t.getPublicArg();
        wx.request({
            url: t.globalData.URL_MAPI + "distribution/actBox/receive",
            data: e,
            method: "get",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                t.data;
            }
        });
    },
    showHelp: function() {
        this.setData({
            showHelp: !0
        });
    },
    hideHelp: function() {
        this.setData({
            showHelp: !1
        });
    },
    showInviteSuccess: function() {
        this.setData({
            showInviteSuccess: !0
        });
    },
    hideInviteSuccess: function() {
        this.setData({
            showInviteSuccess: !1
        }), this.showRedenvelope();
    },
    showRedenvelope: function() {
        this.setData({
            showRedenvelope: !0
        });
    },
    hideRedenvelope: function() {
        this.setData({
            showRedenvelope: !1
        });
    },
    showLogin: function() {
        t.checkLogin() || this.showLoginModal();
    },
    onShow: function() {
        c.sendPageData("page_activity_box");
    },
    onShareAppMessage: function(e) {
        var o = wx.getStorageSync("nickName"), a = [ o + "喊你来瓜分百万奖金，点击就有！", "点击【领钱】，来就有奖金！", o + "喊你来白拿钱，不要白不要！", "【" + o + "@你】就差你1人，就能领现金" ], n = void 0 !== e.target ? e.target.dataset : {}, i = n.title, s = void 0 === i ? a[Math.floor(Math.random() * a.length)] : i, c = n.img, r = void 0 === c ? this.data.shareImg : c, d = n.path, h = void 0 === d ? "pages/index/index?goto=" + encodeURIComponent("/pages/activity/box/index?inviteCode=" + wx.getStorageSync("myInviteCode") + "&inviteName=" + o) : d, l = t.setShare(s, h, null, r);
        return this.setData({
            showShareModal: !1
        }), this.hideHelp(), this.hideReceive(), l;
    },
    bindCreate: function(e) {
        if (!0 !== a) {
            a = !0;
            var o = this, n = t.getPublicArg();
            n.openid = wx.getStorageSync("openid"), wx.showLoading(), wx.request({
                url: t.globalData.URL_MAPI + "distribution/actBox/create",
                data: n,
                method: "get",
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    wx.hideLoading(), 1e3 == t.data.code ? o.init(!0) : wx.showToast({
                        title: "系统异常,请稍后再试!",
                        icon: "none",
                        duration: 3e3,
                        mask: !0
                    });
                },
                complete: function() {
                    a = !1;
                }
            });
        }
    },
    gotoIndex: function() {
        wx.switchTab({
            url: "/pages/index/index"
        });
    },
    showLeftTime: function() {
        var t = this.data.endTime - Date.parse(new Date()) / 1e3;
        t >= 86400 && (t = 86399), t <= 0 ? this.setData({
            countDownDay: "00",
            countDownHour: "00",
            countDownMinute: "00",
            countDownSecond: "00"
        }) : this.data.interval = setInterval(function() {
            var e = t, o = Math.floor(e / 3600 / 24), a = o.toString();
            1 == a.length && (a = "0" + a);
            var n = Math.floor((e - 3600 * o * 24) / 3600), i = n.toString();
            1 == i.length && (i = "0" + i);
            var s = Math.floor((e - 3600 * o * 24 - 3600 * n) / 60), c = s.toString();
            1 == c.length && (c = "0" + c);
            var r = (e - 3600 * o * 24 - 3600 * n - 60 * s).toString();
            1 == r.length && (r = "0" + r), this.setData({
                countDownDay: a,
                countDownHour: i,
                countDownMinute: c,
                countDownSecond: r
            }), --t < 0 && (clearInterval(this.data.interval), this.setData({
                countDownDay: "00",
                countDownHour: "00",
                countDownMinute: "00",
                countDownSecond: "00"
            }));
        }.bind(this), 1e3);
    }
}, c.pageEvents, s, r, d, h));