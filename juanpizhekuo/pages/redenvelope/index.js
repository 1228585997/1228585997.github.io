var e = getApp(), t = void 0, a = void 0, o = void 0, n = void 0, i = void 0, s = void 0, r = require("../../utils/util"), d = require("../../utils/statistics"), c = (require("../../components/backtop/backtop"), 
require("../../components/countdown/countdown")), u = require("../../components/toast/toast"), p = require("../../components/send-formid/index"), g = require("../../components/share/share"), h = require("./consts"), l = h.apiMsgBubble, w = h.imageRefs, f = e.deps, S = f.patchPage, m = f.sites, v = m.mact.url("HelpRedBag-helpAddCoupon"), T = m.mact.url("HelpRedBag-getActInfo"), x = m.mact.url("HelpRedBag-receiveCoupon");

S(Page)(r.mergePage({
    data: {
        totalNumber: 1e4,
        msgBubbleData: [],
        popupType: -1,
        isLogin: e.checkLogin(),
        recGoods: [],
        noMore: !1,
        isTopHidden: !0,
        showRule: !1,
        actStatus: 1,
        couponMoney: 666,
        endTime: 0,
        headText: "红包最高可达",
        helpList: [],
        ae_money: 0,
        ae_min_money: 0,
        linkUrl: "",
        showCoupon: !1,
        couponId: 0,
        pageStatus: 0
    },
    onLoad: function(e) {
        wx.showLoading && wx.showLoading({
            title: "加载中"
        });
        t = !1, a = 1, o = e.shareId || "", n = e.shareUid || "", i = e.shareTxt && e.shareTxt >= 0 ? e.shareTxt : -1, 
        s = !1, this.getRecGoods(), this.fetchMsgBubble(), d.sendZhugePageData("进入助力抢红包页", {}), 
        this.setData({
            isVip: wx.getStorageSync("vipStatus") > 0
        });
    },
    fetchMsgBubble: function() {
        var e = this;
        return l().then(function(t) {
            var a = t.amount, o = (t.list || []).map(function(e) {
                return e.nickName + "的红包增大到" + e.money + "元";
            });
            return e.$setData({
                totalNumber: a,
                msgBubbleData: o
            }), t;
        });
    },
    onCloseRedEnvelope: function(e) {
        var t = this, a = e.detail.type;
        this.$setData({
            popupType: -1
        }), setTimeout(function() {
            0 == a || 1 == a ? t.$setData({
                popupType: 2
            }) : 2 == a || 4 == a ? t.$setData({
                popupType: 5
            }) : 5 == a && t.$setData({
                popupType: 3
            });
        }, 100);
    },
    onClickRedEnvelopeBtn: function(e) {
        var t = e.detail.type;
        2 == t ? this.receiveCoupon() : 3 == t ? wx.redirectTo({
            url: "/pages/timeBuy/timeBuy"
        }) : 4 == t ? wx.redirectTo({
            url: "/pages/timeBuy/timeBuy"
        }) : 5 == t && wx.redirectTo({
            url: "/pages/activity/box/index"
        });
    },
    onShow: function() {
        4 !== this.data.actStatus && this.init(), this.sendPageBc();
    },
    init: function() {
        var e = this;
        d.getData("afterLogin") ? this._init() : setTimeout(function() {
            e.init();
        }, 100);
    },
    _init: function() {
        var t = this, a = wx.getStorageSync("openid"), n = wx.getStorageSync("uid");
        if (a && n ? (this.getUserZhuliStatus(o ? 2 : 1), this.helpAddCoupon()) : (s || e.goLogin(), 
        wx.hideLoading && wx.hideLoading(), this.setData({
            pageStatus: 4
        }), s = !0), e.checkLogin() || wx.setStorageSync("ifNotLoginFirst", 1), wx.getStorageSync("ifNotLoginFirst") && e.checkLogin()) return wx.removeStorageSync("ifNotLoginFirst"), 
        t.showToastMsg("登录成功，去邀请好友帮您增大红包吧！");
    },
    sendPageBc: function() {
        var e = this;
        s ? d.sendPageData("page_redenvelope_zhuli", this.data.couponId + "_" + this.data.pageStatus + "_" + i, "进入助力抢红包页") : setTimeout(function() {
            e.sendPageBc();
        }, 100);
    },
    getUserZhuliStatus: function(t, a) {
        var n = this, i = e.getPublicArg(), r = {
            jpUid: i.jpUid,
            jpSign: i.jpSign,
            jpPlatform: i.jpPlatform
        };
        r.openId = wx.getStorageSync("openid"), r.uname = wx.getStorageSync("nickName"), 
        r.type = t, r.avatar = wx.getStorageSync("avatarUrl"), r.apisign = e.createApisign(r), 
        s = !1, wx.request({
            url: T,
            data: r,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            complete: function(t) {
                var i = t.data, r = void 0 === i ? {} : i;
                if (s = !0, wx.hideLoading && wx.hideLoading(), a && wx.stopPullDownRefresh(), 1e3 !== parseInt(r.code, 10)) return n.showToastMsg(r.code);
                var d = r.data, c = d.actStatus, u = void 0;
                if (1 === c) u = {
                    actStatus: 1,
                    pageStatus: 1
                }; else {
                    if (3 == c || 2 == c) {
                        var p = 1e3 * parseInt(d.endTime, 10) - (new Date().getTime() + 1e3 * e.globalData.TIME_DIFF);
                        n.countdown({
                            left: p,
                            timeKey: "zhuliTime",
                            onEnd: function() {
                                n.setData({
                                    actStatus: 4
                                });
                            }
                        });
                    }
                    u = {
                        actStatus: c,
                        pageStatus: c,
                        couponId: d.couponId || 0,
                        couponMoney: d.money,
                        endTime: d.endTime,
                        headText: d.headText,
                        helpList: d.helpList,
                        isShowCouponTips: d.isShowCouponTips
                    };
                }
                u.isLogin = e.checkLogin();
                var g = {
                    2: 1,
                    3: 4
                }[c];
                1 == g && o && o !== wx.getStorageSync("openid") && (g = 0), void 0 === g && (g = -1), 
                u.popupType = g, n.setData(u);
            }
        });
    },
    helpAddCoupon: function() {
        var t = this;
        if (!o || o === wx.getStorageSync("openid") && n === wx.getStorageSync("uid")) return !1;
        var a = this, i = e.getPublicArg(), s = {
            jpUid: i.jpUid,
            jpSign: i.jpSign,
            jpPlatform: i.jpPlatform
        };
        s.openId = wx.getStorageSync("openid"), s.uname = wx.getStorageSync("nickName"), 
        s.avatar = wx.getStorageSync("avatarUrl"), s.shareId = o, s.shareUid = n, s.apisign = e.createApisign(s), 
        wx.request({
            url: v,
            data: s,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            complete: function(e) {
                var o = e.data, n = void 0 === o ? {} : o;
                1e3 == n.code || 1009 == n.code ? t.$setData({
                    popupType: 0
                }) : 1004 == n.code && a.showToastMsg("您今天帮别人助力的次数已超过3次，明天再接再励哦！");
            }
        });
    },
    loginTip: function(t) {
        e.goLogin();
        var a = t.currentTarget.dataset;
        d.sendEventData(a);
    },
    goSnatch: function(t) {
        var a = p.changeDataset(t.currentTarget.dataset.dataset);
        if (d.sendEventData(a), p.sendFormId(t.detail.formId, 5), (wx.getStorageSync("openid") || "") && e.checkLogin()) this.getUserZhuliStatus(2); else {
            var n = this;
            e.showAuthTip(function(t) {
                t && e.getAuth(null, function() {
                    n.getUserZhuliStatus(o ? 2 : 1), n.helpAddCoupon();
                });
            });
        }
    },
    goReceiveCoupon: function(t) {
        var a = p.changeDataset(t.currentTarget.dataset.dataset);
        wx.getStorageSync("openid");
        if (d.sendEventData(a), p.sendFormId(t.detail.formId, 5), !e.checkLogin()) return e.goLogin(), 
        !1;
        var o = this;
        wx.showModal({
            content: "领取到帐户，红包就不能继续增大了哦",
            cancelText: "我偏要领",
            confirmText: "继续增大",
            confirmColor: "#ff464e",
            success: function(e) {
                e.confirm || e.cancel && o.receiveCoupon();
            }
        });
    },
    receiveCoupon: function(t) {
        var a = this, o = e.getPublicArg();
        wx.request({
            url: x,
            data: o,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            complete: function(e) {
                if (1e3 !== parseInt(e.data.code, 10)) return a.showToastMsg(e.data.msg);
                var t = e.data.data;
                a.setData({
                    popupType: 4,
                    actStatus: 3,
                    showCoupon: !0,
                    couponId: t.couponId || 0,
                    ae_min_money: t.ae_min_money,
                    ae_money: t.ae_money,
                    linkUrl: t.linkUrl
                });
            }
        });
    },
    goMyCoupon: function(e) {
        var t = p.changeDataset(e.currentTarget.dataset.dataset);
        d.sendEventData(t), p.sendFormId(e.detail.formId, 5), wx.navigateTo({
            url: "/pages/user/coupons/coupons"
        });
    },
    closeCoupon: function(e) {
        var t = p.changeDataset(e.currentTarget.dataset.dataset);
        d.sendEventData(t), p.sendFormId(e.detail.formId, 5), this.setData({
            showCoupon: !1
        }), this.getUserZhuliStatus(2);
    },
    showRule: function(e) {
        var t = e.currentTarget.dataset;
        this.setData({
            showRule: !0
        }), d.sendEventData(t);
    },
    closeRule: function(e) {
        this.setData({
            showRule: !1
        });
    },
    showCode: function(e) {
        var t = p.changeDataset(e.currentTarget.dataset.dataset);
        d.sendEventData(t), p.sendFormId(e.detail.formId, 5), this.setData({
            showCode: !0
        });
    },
    closeCode: function(e) {
        this.setData({
            showCode: !1
        });
    },
    getRecGoods: function() {
        var o = this, n = {
            cid: 3152,
            show_type: e.globalData.PLATFORM,
            zhouyi_ids: wx.getStorageSync("zhouyi_ids"),
            page: a,
            is_need_ad: 1,
            app_version: e.globalData.APP_VERSION,
            pageSize: 20
        };
        wx.request({
            url: e.globalData.URL_TUAN + "pintuan/get_goods_list",
            data: n,
            method: "GET",
            header: {
                "Content-Type": "application/json"
            },
            success: function(e) {
                var n = e.data, i = void 0 === n ? {} : n;
                if (i && 1e3 == i.code && i.data && i.data) {
                    var s = i.data, r = s.goods || [], d = o.data.recGoods, c = {};
                    d = 1 === a ? r : d.concat(r), c.recGoods = d, 1 == s.has_next_page ? a++ : (a = !1, 
                    c.noMore = !0), s.new_goods_count > 0 && (c.empty = !1), c.ready = !0, o.setData(c);
                }
                t = !1;
            }
        });
    },
    onReachBottom: function(e) {
        a && !t && (t = !0, this.getRecGoods());
    },
    onShareAppMessage: function(t) {
        var a = this, o = a.data.actStatus, n = "送你一个会膨胀的红包，最高可领666元哦!", i = "/pages/redenvelope/index";
        if (2 == o) {
            var s = wx.getStorageSync("uid") || "", r = wx.getStorageSync("nickName") || "我", d = wx.getStorageSync("openid") || "", c = [ "憋说话，领红包", "是真的，抢会膨胀的红包，最高可领666元哦", "小手一抖，红包到手，你不点一下吗？", r + "刚领到" + this.data.couponMoney + "元红包，是真的，最高可增大到666元哦！", "来不及解释了，快点！一不小心就领666元红包哟！", "这才是真的双击666~，领最高666元红包！", "宝宝发的不是红包，是财运", "叮咚！恭喜你获得一个会增大的红包", r + "给大家发红包喽！见者有份", "@所有人，捡钱了，领会膨胀的红包，最高得666元！", "偷偷告诉你，这里有一个666元大红包哦！", "hi!朋友，送你一个会膨胀的红包" ], u = Math.floor(Math.random() * c.length);
            n = c[u], i += "?shareUid=" + s + "&shareId=" + d + "&shareTxt=" + u;
        }
        return e.setShare(n, i, function(e) {
            2 == o && a.showToastMsg("分享成功，好友助力成功后红包会增大哦");
        }, w.share_cover);
    },
    onPullDownRefresh: function() {
        wx.getStorageSync("openid") ? this.getUserZhuliStatus(1, !0) : wx.stopPullDownRefresh();
    },
    onPageScroll: function(e) {
        e.scrollTop >= 400 ? this.setData({
            isTopHidden: !1
        }) : this.setData({
            isTopHidden: !0
        });
    },
    bindTopTap: function(e) {
        wx.pageScrollTo ? wx.pageScrollTo({
            scrollTop: 0
        }) : wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        });
    },
    goIndex: function() {
        wx.switchTab({
            url: "../index/index"
        });
    }
}, d.pageEvents, c, u, g));