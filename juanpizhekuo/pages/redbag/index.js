var t = getApp(), a = void 0, e = void 0, o = void 0, i = require("../../utils/util"), n = require("../../utils/statistics"), s = require("../../components/toast/toast"), r = require("../../components/send-formid/index");

Page(i.mergePage({
    data: {
        ready: !1,
        isLogin: t.checkLogin(),
        bannerImg: "https://jp.juancdn.com/xcx_images/redbag/ad_pic.png",
        recGoods: [],
        groups: [],
        noMore: !1,
        isTopHidden: !0,
        showRule: !1,
        showDialog: !1,
        status: 0,
        bc: -1,
        userType: 0,
        showType: 0,
        bannerUrl: "/pages/index/index",
        bannerNaviType: "switchTab"
    },
    cData: {
        itemId: "",
        shareTxt: -1
    },
    onLoad: function(t) {
        wx.showLoading && wx.showLoading({
            title: "加载中"
        }), e = 1, o = !1;
        var s = this;
        this.cData.itemId = t.itemId || "", this.cData.shareTxt = t.shareTxt && t.shareTxt >= 0 ? t.shareTxt : -1, 
        this.getBanner(), i.getZyId(function(t) {
            a = "p16_" + t, s.getRecGoods();
        }), n.sendZhugePageData("进入1000元开年红包页", {});
    },
    onShow: function() {
        this.init(), this.sendPageBc();
    },
    onReady: function() {
        this.cData.itemId ? (wx.setNavigationBarTitle({
            title: "红包详情"
        }), this.setData({
            status: 2
        })) : this.getBroadcast();
    },
    init: function() {
        var t = this;
        n.getData("afterLogin") ? this._init() : setTimeout(function() {
            t.init();
        }, 100);
    },
    _init: function() {
        t.checkLogin() || this.cData.itemId ? this.getRedbagDetail() : (wx.hideLoading && wx.hideLoading(), 
        this.setData({
            ready: !0
        }));
    },
    sendPageBc: function() {
        var t = this;
        t.data.ready ? n.sendPageData("page_redenvelope_openyear", t.data.bc + "_" + t.data.userType + "_" + this.cData.shareTxt, "进入1000元开年红包页") : setTimeout(function() {
            t.sendPageBc();
        }, 100);
    },
    getRedbagDetail: function() {
        var a = this, e = t.getPublicArg(), o = {
            jpUid: e.jpUid,
            jpDid: e.jpDid,
            jpSign: e.jpSign,
            jpPlatform: e.jpPlatform,
            openId: wx.getStorageSync("openid"),
            uname: wx.getStorageSync("nickName"),
            userImg: wx.getStorageSync("avatarUrl"),
            itemId: this.cData.itemId
        };
        wx.request({
            url: t.globalData.URL_MACT + "GetNewYearCoupon-getShareCoupon",
            data: o,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            complete: function(e) {
                var o = e.data, n = void 0 === o ? {} : o;
                wx.hideLoading && wx.hideLoading();
                var s = {
                    ready: !0,
                    isLogin: t.checkLogin(),
                    bc: n.bc,
                    userType: n.userType
                };
                if (1e3 === parseInt(n.code, 10)) {
                    var r = n.data, d = r.allMoney, g = r.couponUserList || {};
                    if (s.bannerImg = r.bannerImg, a.cData.itemId) {
                        s.creater = g.master, s.curUser = g.myCoupon, s.groups = g.groupUser || [];
                        var c = s.groups.length >= 10, h = c ? s.groups[0].money : 0, u = 0;
                        s.groups.map(function(t, a) {
                            t.isBest = 0, c && t.money > h && (u = a) && (h = t.money), t.createTime = i.formatDate(new Date(1e3 * t.createTime), "yyyy.MM.dd HH:mm:ss");
                        }), c && (s.groups[u].isBest = 1), a.setCouponDialog(r.couponList);
                    } else d.money > 0 && (s.status = 1);
                    s.allMoney = d;
                } else a.showToastMsg(n.msg);
                a.setData(s);
            }
        });
    },
    setCouponDialog: function(t) {
        if (t && t.num) {
            var a = t.limitMoney.split(","), e = {
                showDialog: !0,
                showDialogType: "coupon"
            };
            if (a.length <= 0) return !1;
            t.num && (t.limit = a[0].split("-")[0]), t.limits = a, e.coupons = t, this.setData(e);
        }
    },
    goShare: function(a) {
        if (this.data.isLogin) this.cData.myItemId ? (this.setData({
            showDialog: !0,
            showDialogType: "share"
        }), this.goStatus1()) : this.getShareId("share"); else {
            var e = this;
            t.goLogin(function() {
                e.getRedbagDetail(), e.getShareId("share");
            });
        }
        var o = a.currentTarget.dataset;
        o && o.activity && n.sendEventData(o);
    },
    goStatus1: function() {
        1 !== this.data.status && this.setData({
            status: 1
        });
    },
    goLogin: function(a) {
        var e = this;
        t.goLogin(function() {
            t.getAuth(null, function() {
                e.getRedbagDetail();
            });
        });
        var o = a.currentTarget.dataset;
        n.sendEventData(o);
    },
    getShareId: function(a) {
        var e = this, o = t.getPublicArg(), i = {
            jpUid: o.jpUid,
            jpDid: o.jpDid,
            jpSign: o.jpSign,
            jpPlatform: o.jpPlatform,
            openId: wx.getStorageSync("openid"),
            uname: wx.getStorageSync("nickName"),
            userImg: wx.getStorageSync("avatarUrl")
        };
        wx.request({
            url: t.globalData.URL_MACT + "GetNewYearCoupon-createShareCoupon",
            data: i,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            complete: function(t) {
                var o = t.data, i = void 0 === o ? {} : o;
                1e3 == i.code ? (e.cData.myItemId = i.data.itemId, e.setData({
                    showDialog: !0,
                    showDialogType: a
                }), e.goStatus1()) : e.showToastMsg(i.msg);
            }
        });
    },
    goWithdraw: function(t) {
        this.data.allMoney.money >= 1e3 ? 1 == this.data.allMoney.status ? this.setData({
            showDialog: !0,
            showDialogType: "withdraw"
        }) : this.withdraw() : this.cData.myItemId ? this.setData({
            showDialog: !0,
            showDialogType: "withdrawTip"
        }) : this.getShareId("withdrawTip");
    },
    withdraw: function() {
        var a = this, e = t.getPublicArg(), o = {
            jpUid: e.jpUid,
            jpSign: e.jpSign,
            jpPlatform: e.jpPlatform,
            openId: wx.getStorageSync("openid"),
            uname: wx.getStorageSync("nickName"),
            userImg: wx.getStorageSync("avatarUrl")
        };
        wx.request({
            url: t.globalData.URL_MACT + "GetNewYearCoupon-applyMoney",
            data: o,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            complete: function(t) {
                var e = t.data, o = void 0 === e ? {} : e;
                1e3 === parseInt(o.code, 10) ? a.setData({
                    showDialog: !0,
                    showDialogType: "withdraw"
                }) : a.showToastMsg(o.msg);
            }
        });
    },
    getBroadcast: function() {
        var a = this;
        wx.request({
            url: t.globalData.URL_MACT + "GetNewYearCoupon-getTopList",
            data: {},
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            complete: function(t) {
                var e = t.data, o = void 0 === e ? {} : e;
                if (1e3 == o.code && o.data && o.data.length > 0) {
                    a.setData({
                        curCast: -1,
                        ifShowCast: !1,
                        broadcast: o.data
                    });
                    var i = a, n = o.data.length;
                    setInterval(function() {
                        var t = i.data.curCast + 1;
                        t >= n && (t = 0), i.setData({
                            curCast: t,
                            ifShowCast: !0
                        }), setTimeout(function() {
                            i.setData({
                                ifShowCast: !1
                            });
                        }, 2e3);
                    }, 3e3);
                }
            }
        });
    },
    showRule: function(t) {
        var a = t.currentTarget.dataset;
        this.setData({
            showRule: !0
        }), n.sendEventData(a);
    },
    showCode: function(t) {
        this.setData({
            showCode: !this.data.showCode
        });
    },
    closeDialog: function(t) {
        this.setData({
            showRule: !1,
            showDialog: !1
        });
        var a = t.currentTarget.dataset;
        a && a.activity && n.sendEventData(a);
    },
    getBanner: function() {
        var a = this;
        wx.request({
            url: t.globalData.URL_MACT + "GetNewYearCoupon-getBanner",
            data: {
                jpPlatform: "xcx"
            },
            success: function(t) {
                var e = t.data, o = void 0 === e ? {} : e;
                if (1e3 == o.code) {
                    var i = o.data, n = "navigate";
                    i.url.indexOf("pages/index/index") && (n = "switchTab"), a.setData({
                        banner: i.img,
                        bannerUrl: i.url,
                        bannerNaviType: n
                    });
                }
            }
        });
    },
    getRecGoods: function() {
        var a = this;
        wx.getStorageSync("uid"), t.globalData.PLATFORM;
        wx.request({
            url: t.globalData.URL_TUAN + "oldbringnew/invitation?page=" + e + "&platform=xcx&page_size=20",
            data: {},
            success: function(t) {
                var i = t.data, n = void 0 === i ? {} : i;
                if (o = !1, 1e3 == n.code) {
                    var s = n.data, r = {
                        recGoods: a.data.recGoods.concat(s)
                    };
                    e++, a.setData(r);
                } else e = !1, a.setData({
                    noMore: !0
                });
            }
        });
    },
    onPageScroll: function(t) {
        t.scrollTop >= 400 ? this.setData({
            isTopHidden: !1
        }) : this.setData({
            isTopHidden: !0
        });
    },
    bindTopTap: function(t) {
        wx.pageScrollTo ? wx.pageScrollTo({
            scrollTop: 0
        }) : wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        });
    },
    onReachBottom: function(t) {
        e && !o && (o = !0, this.getRecGoods());
    },
    onShareAppMessage: function(a) {
        var e = this, o = "开年行大运，领1000元现金", i = "/pages/redbag/index", n = [ "【微信红包】恭喜发财，大吉大利", "@所有人，领开年红包啦!手气最好的再发一个。", "2018开运红包，据说领了这个红包的人，全年都一帆风顺哦！", "@所有人，几个红包送给大家，祝大家新春快乐，开年大吉", "测测你的18年运势，领红包越多，运气越旺哦!", "据说没有比领个1000元开年红包更令人开心的事了。", "【开年红包】新的一年，我们一起加油", "【消息提醒】你的蛙蛙给你带回来1个1000元现金红包，请查收", "【开年红包】新年行大运，财源滚滚来", "送你一个开年红包，听说里面有伍佰哦！", "世间万物，唯有发红包的人不可辜负", "\t送你1000元开门红包，祝你狗年旺旺旺", "上班了，领个红包先开心一下" ], s = n.length, r = Math.floor(Math.random() * s);
        return o = n[r], i = i + "?shareTxt=" + r, e.cData.myItemId && (i = i + "&itemId=" + e.cData.myItemId), 
        t.setShare(o, i, function(t) {
            e.showToastMsg("分享的红包被领完后，即可分享一个新红包哦");
        }, "https://jp.juancdn.com/xcx_images/redbag/xcx_share.png");
    }
}, n.pageEvents, s, r));