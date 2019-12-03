var e = require("../../utils/util"), t = require("../../utils/statistics"), a = getApp(), o = require("../../components/qipao/qipao"), n = require("../../components/send-formid/index"), i = require("../../components/countdown/countdown"), s = require("../../components/toast/toast"), r = require("../../components/share/share"), c = void 0, u = void 0, d = void 0, g = void 0, p = void 0, h = void 0, l = void 0, m = void 0;

Page(e.mergePage({
    data: {
        isLogin: a.checkLogin(),
        showRule: !1,
        recGoods: [],
        noMore: !1,
        isTopHidden: !0,
        qipaoTop: "39rpx",
        ishidden: !0,
        actStatus: -1,
        userType: 1,
        showShareModal2: !1,
        isShare: !1,
        memberList: [],
        couponStatus: -1,
        couponId: 0
    },
    onLoad: function(e) {
        this.setData({
            isVip: wx.getStorageSync("vipStatus") > 0
        }), wx.showLoading && wx.showLoading({
            title: "加载中"
        });
        decodeURIComponent(e.scene);
        c = !1, u = 1, d = e.itemId || "", g = e.shareId || "", p = e.shareUid || "", h = e.shareTxt && e.shareTxt >= 0 ? e.shareTxt : -1, 
        l = !1, m = "https://jp.juancdn.com/xcx_images/envelopDivide/persons.png", this.getRecGoods(), 
        this.getBroadcast(a.globalData.URL_MACT + "SplitCoupon-broadcast"), wx.canIUse && wx.canIUse("showShareMenu") && wx.showShareMenu({
            withShareTicket: !0
        }), t.sendZhugePageData("进入瓜分60元红包页", {});
    },
    onShow: function() {
        0 !== this.data.actStatus && this.init(), this.sendPageBc();
    },
    init: function() {
        var e = this;
        t.getData("afterLogin") ? e._init() : setTimeout(function() {
            e.init();
        }, 100);
    },
    _init: function() {
        var e = this;
        if (wx.getStorageSync("openid") ? e.getActInfo() : (wx.hideLoading && wx.hideLoading(), 
        l = !0), a.checkLogin() || wx.setStorageSync("ifEveDivNotLoginFirst", 1), wx.getStorageSync("ifEveDivNotLoginFirst") && a.checkLogin()) return wx.removeStorageSync("ifEveDivNotLoginFirst"), 
        e.setData({
            isLogin: !0
        }), e.showToastMsg("登录成功，去邀请好友帮您瓜分红包吧！");
    },
    sendPageBc: function() {
        var e = this;
        l ? t.sendPageData("page_redenvelope_carveup", e.data.actStatus + "_" + e.data.userType + "_" + h, "进入瓜分60元红包页") : setTimeout(function() {
            e.sendPageBc();
        }, 100);
    },
    getActInfo: function(e) {
        var t = this, o = a.getPublicArg(), n = {
            jpUid: o.jpUid,
            jpSign: o.jpSign,
            jpPlatform: o.jpPlatform
        };
        n.itemId = d, l = !1, wx.request({
            url: a.globalData.URL_MACT + "SplitCoupon-getActInfo",
            data: n,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            complete: function(o) {
                l = !0, wx.hideLoading && wx.hideLoading(), e && wx.stopPullDownRefresh();
                var n = parseInt(o.data.code, 10);
                if (1e3 === n) {
                    var i = o.data.data;
                    d = i.itemId, t.setCountDown(i.etime);
                    var s = i.memberList;
                    if (s && s.length < i.totalNum) for (var r = s.length, c = i.totalNum; r < c; r++) s[r] = {
                        userName: "",
                        userImg: m,
                        userType: 0,
                        couponMoney: 0,
                        ctime: ""
                    };
                    t.setData({
                        isLogin: a.checkLogin(),
                        totalMoney: i.totalMoney,
                        actStatus: i.status,
                        couponStatus: i.couponStatus,
                        userType: i.userType,
                        oweNum: i.oweNum,
                        couponMoney: i.money,
                        minMoney: i.minMoney,
                        memberList: i.memberList,
                        itemUserName: i.itemUserName,
                        isShare: 0 === i.status && 2 !== i.userType,
                        showShareModal2: 0 === i.status && 2 !== i.userType && !e
                    });
                } else if (1002 === n) t.setData({
                    isLogin: a.checkLogin(),
                    actStatus: -1
                }); else {
                    if (1001 !== n) return t.setData({
                        isLogin: a.checkLogin()
                    }), t.showToastMsg(o.data.msg);
                    t.setData({
                        isLogin: !1
                    });
                }
            }
        });
    },
    goSnatch: function(e) {
        var o = e.currentTarget.dataset;
        t.sendEventData(o);
        var n = this;
        wx.getStorageSync("openid") || "" ? n.createAct() : (n = this, a.showAuthTip(function(e) {
            e && a.getAuth(null, function() {
                n.createAct();
            });
        }));
    },
    createAct: function() {
        var e = this, t = a.getPublicArg();
        t.openId = wx.getStorageSync("openid"), t.uname = wx.getStorageSync("nickName"), 
        t.userImg = wx.getStorageSync("avatarUrl"), wx.request({
            url: a.globalData.URL_MACT + "SplitCoupon-createAct",
            data: t,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            complete: function(o) {
                var n = parseInt(o.data.code, 10);
                if (1e3 === n) {
                    var i = o.data.data;
                    d = i.itemId, e.setCountDown(i.etime);
                    for (var s = [], r = 0; r < 4; r++) s[r] = {
                        userName: "",
                        userImg: m,
                        userType: 0,
                        couponMoney: 0,
                        ctime: ""
                    }, 0 === r && (s[r] = {
                        userImg: t.userImg,
                        userType: 1,
                        userName: t.uname
                    });
                    e.setData({
                        isLogin: a.checkLogin(),
                        showShareModal2: !0,
                        itemUserName: i.itemUserName,
                        isShare: !0,
                        oweNum: i.oweNum,
                        totalMoney: i.totalMoney,
                        actStatus: 0,
                        userType: 1,
                        memberList: s
                    });
                } else if (1001 === n) e.setData({
                    isLogin: !1
                }); else {
                    if (e.setData({
                        isLogin: a.checkLogin()
                    }), 1003 !== n) return e.showToastMsg(o.data.msg);
                    wx.redirectTo({
                        url: "/pages/envelopDivide/envelopDivide"
                    });
                }
            }
        });
    },
    goJoin: function(e) {
        var o = e.currentTarget.dataset;
        t.sendEventData(o);
        var n = this;
        wx.getStorageSync("openid") || "" ? n.joinAct() : (n = this, a.showAuthTip(function(e) {
            e && a.getAuth(null, function() {
                n.joinAct();
            });
        }));
    },
    joinAct: function() {
        var e = this, t = a.getPublicArg();
        t.itemId = d, t.openId = wx.getStorageSync("openid"), t.uname = wx.getStorageSync("nickName"), 
        t.userImg = wx.getStorageSync("avatarUrl"), wx.request({
            url: a.globalData.URL_MACT + "SplitCoupon-joinAct",
            data: t,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            complete: function(t) {
                var o = parseInt(t.data.code, 10);
                if (1e3 === o) {
                    var n = t.data.data;
                    d = n.itemId, e.setCountDown(n.etime);
                    var i = n.memberList;
                    if (i && i.length < n.totalNum) for (var s = i.length, r = n.totalNum; s < r; s++) i[s] = {
                        userName: "",
                        userImg: m,
                        userType: 0,
                        couponMoney: 0,
                        ctime: ""
                    };
                    e.setData({
                        isLogin: a.checkLogin(),
                        itemUserName: n.itemUserName,
                        totalMoney: n.totalMoney,
                        actStatus: n.status,
                        couponStatus: n.couponStatus,
                        userType: n.userType,
                        oweNum: n.oweNum,
                        couponMoney: n.money,
                        minMoney: n.minMoney,
                        memberList: n.memberList,
                        isShare: 0 === n.status && 2 !== n.userType
                    }), 0 === n.status && n.oweNum > 0 && e.setData({
                        showShareModal2: !0
                    });
                } else if (1002 === o) e.setData({
                    isLogin: a.checkLogin(),
                    actStatus: -1
                }); else {
                    if (1001 !== o) return e.setData({
                        isLogin: a.checkLogin()
                    }), e.showToastMsg(t.data.msg);
                    e.setData({
                        isLogin: !1
                    });
                }
            }
        });
    },
    setCountDown: function(t) {
        var o = this, n = 1e3 * parseInt(t, 10) - (new Date().getTime() + 1e3 * a.globalData.TIME_DIFF);
        if (n > 0) o.countdown({
            left: n,
            timeKey: "actEndTime",
            onEnd: function() {
                o.getActInfo();
            }
        }); else {
            var i = e.formatDate(new Date(1e3 * t), "yyyy-MM-dd HH:mm:ss");
            o.setData({
                endTime: i
            });
        }
    },
    loginTip: function(e) {
        a.goLogin();
        var o = e.currentTarget.dataset;
        t.sendEventData(o);
    },
    onPullDownRefresh: function() {
        wx.getStorageSync("openid") ? this.getActInfo(!0) : wx.stopPullDownRefresh();
    },
    getRecGoods: function() {
        var e = this, t = {
            cid: 3152,
            show_type: a.globalData.PLATFORM,
            zhouyi_ids: wx.getStorageSync("zhouyi_ids"),
            page: u,
            is_need_ad: 1,
            app_version: a.globalData.APP_VERSION,
            pageSize: 20
        };
        wx.request({
            url: a.globalData.URL_TUAN + "pintuan/get_goods_list",
            data: t,
            method: "GET",
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                var a = t.data, o = void 0 === a ? {} : a;
                if (o && 1e3 == o.code && o.data && o.data) {
                    var n = o.data, i = n.goods || [], s = e.data.recGoods, r = {};
                    s = 1 === u ? i : s.concat(i), r.recGoods = s, 1 == n.has_next_page ? u++ : (u = !1, 
                    r.noMore = !0), n.new_goods_count > 0 && (r.empty = !1), r.ready = !0, e.setData(r);
                }
                c = !1;
            }
        });
    },
    onReachBottom: function(e) {
        u && !c && (c = !0, this.getRecGoods());
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
        var a = e.currentTarget.dataset;
        t.sendEventData(a);
    },
    showRule: function(e) {
        this.setData({
            showRule: !0
        });
        var a = e.currentTarget.dataset;
        t.sendEventData(a);
    },
    closeRule: function(e) {
        this.setData({
            showRule: !1
        });
    },
    closeShareModal: function(e) {
        this.setData({
            showShareModal2: !1
        });
    },
    goMyCoupon: function(e) {
        var a = e.currentTarget.dataset;
        t.sendEventData(a), wx.navigateTo({
            url: "/pages/user/coupons/coupons"
        });
    },
    goIndex: function() {
        wx.switchTab({
            url: "../index/index"
        });
    },
    onShareAppMessage: function(e) {
        if ("button" === e.from) {
            if (r.buttonShare && e.target.dataset.path) {
                e.target.dataset.path = s = "pages/index/index?goto=" + encodeURIComponent("/" + e.target.dataset.path);
                var o = r.buttonShare(e.target.dataset);
                return this.setData({
                    showShareModal: !1
                }), o;
            }
            t.sendEventData({
                activity: "click_invite_redenvelope",
                activityparam: this.data.actStatus + "_" + this.data.userType
            });
        }
        var n = this, i = "你的好友给你发来一笔巨款，不点就撤回了哦！", s = "/pages/envelopDivide/envelopDivide";
        if (n.data.showShareModal2 || n.data.isShare) {
            wx.getStorageSync("uid"), wx.getStorageSync("openid");
            var c = [ "【转账60元】请你确认收钱", "拼手气，第2个领取的金额最大", "在吗？人满瓜分60元现金，就差你1个人了", "你的好友给你发来一笔巨款，不点就撤回了哦！", "你运气好的很，点一下就能瓜分60元现金！" ], u = Math.floor(Math.random() * c.length);
            i = c[u], s += "?itemId=" + d + "&shareTxt=" + u;
        }
        return a.setShare(i, s, function(e) {
            n.setData({
                showShareModal2: !1
            }), n.showToastMsg("已发送邀请，分享到微信群拆开红包概率高达97%");
        }, "https://goods2.juancdn.com/seller/180621/c/e/5b2b458733b089126e468bc0_750x600.png?imageMogr2/quality/80!/format/jpg");
    }
}, o, t.pageEvents, i, s, n, r));