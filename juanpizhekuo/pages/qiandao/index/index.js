var t = getApp(), e = void 0, a = void 0, o = void 0, n = require("../../../utils/util"), s = require("../../../utils/statistics"), i = require("../../../components/error-msg/error-msg"), r = require("../../../utils/throttle"), c = require("../../../components/send-formid/index"), d = require("../../../components/blockAds/index"), u = require("../../../components/share/share"), l = r(function(t) {
    var e = this, a = t.detail.scrollTop;
    if (a > 1e3) e.data.isTopHidden && e.setData({
        isTopHidden: !1
    }); else if (a < 100 && !e.data.isTopHidden) {
        var o = {
            isTopHidden: !0
        };
        e.setData(o);
    }
}, 100);

Page(n.mergePage({
    data: {
        days: [ "第一天", "第二天", "第三天", "第四天", "第五天", "第六天", "第七天" ],
        title: "恭喜你今天领到微信红包",
        cls: "",
        signDays: 0,
        signStatus: 2,
        amount: 0,
        otherAmount: 0,
        waitAmount: 0,
        sevenAmount: 0,
        shareAmount: 0,
        couponId: 0,
        couponImg: "",
        couponName: "",
        showAlert: !1,
        showActAlert: !1,
        shareAct: !1,
        scrollTop: 0,
        isTopHidden: !0,
        shareEnd: !1,
        fixedToTop: "",
        actAlertInfo: "",
        nowTime: Math.floor(new Date().getTime() / 1e3),
        recGoods: [],
        dsbcenter: !1,
        dsbcenter_url: ""
    },
    onShow: function() {
        s.sendPageData("page_redenvelope", "", "进入签到领红包页");
    },
    onLoad: function(t) {
        this.loginAction(), this.checkShareFriend(), wx.canIUse && wx.canIUse("showShareMenu") && wx.showShareMenu({
            withShareTicket: !0
        }), this.setData({
            isVip: wx.getStorageSync("vipStatus") > 0
        });
        var i = this, r = {
            jpUid: wx.getStorageSync("uid"),
            xcx_sign: wx.getStorageSync("xcx_sign"),
            jpAppName: wx.getStorageSync("jpAppName")
        };
        wx.request({
            url: "https://mapi.juanpi.com/Xcxact/dsbenter",
            data: r,
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                t && t.data && 1e3 == t.data.code && t.data.data && t.data.data.jpUrl && i.setData({
                    dsbcenter: !0,
                    dsbcenter_url: t.data.data.jpUrl
                });
            }
        }), this.data.nowTime >= 1509465599 && this.data.nowTime <= 1509674399 && this.setData({
            isAct: !0
        }), o = 1, a = !1;
        var c = this;
        n.getZyId(function(t) {
            e = "p16_" + t, c.getGoods(), c.getAds(e, "xcx-qiandao", 0), c.getActAlertInfo(), 
            c = null;
        }), s.sendZhugePageData("进入签到领红包页", {});
    },
    checkShareFriend: function() {
        var e = this;
        wx.request({
            url: t.globalData.URL_M + "xcxredpacket/checkShare",
            data: {
                xcx_uid: wx.getStorageSync("uid"),
                xcx_sign: wx.getStorageSync("xcx_sign"),
                from: "xcx_zhekou"
            },
            success: function(t) {
                2e3 == t.data.code && e.setData({
                    shareEnd: !0,
                    cls: ""
                });
            }
        });
    },
    loginAction: function(e) {
        var a = this;
        if (s.getData("afterLogin")) {
            if (!t.checkLogin()) return void t.showAuthTip(this.getSignInfo);
            a.getSignInfo(!0);
        } else setTimeout(function() {
            a.loginAction();
        }, 100);
    },
    getSignInfo: function(e) {
        var a = this;
        (e || !1) && wx.request({
            url: t.globalData.URL_M + "xcxredpacket/redPacketInfo",
            data: {
                xcx_uid: wx.getStorageSync("uid"),
                xcx_sign: wx.getStorageSync("xcx_sign"),
                from: "xcx_zhekou"
            },
            success: function(t) {
                var e = t.data, o = e.code, s = e.data;
                if (s && s.popup_msg) {
                    if (n.getCache("shouldAlert")) return !1;
                    a.setData({
                        actAlertInfo: s.popup_msg
                    }), n.setCache("shouldAlert", "1", 3600 * (24 - new Date().getHours()));
                }
                if (1e3 == o && s && s.redpacket_info) {
                    var i = s.redpacket_info, r = s.status, c = i.amount, d = i.days, u = i.withdrawals_amount, l = i.couponid, g = i.ae_ab_name, h = i.extra_total_money;
                    1 == r ? a.getSignElStatus(c, h, l, g) : 0 == r && 0 == c && 0 == h && "" == g && 0 == l ? a.setData({
                        title: "今日红包已抢光, 明天早点来哦",
                        cls: "over"
                    }) : 0 == r && 0 == c && 0 == h && l > 0 && "" != g && a.setData({
                        title: "今日红包已抢光, 明天早点来哦",
                        cls: "fiveover"
                    }), a.setData({
                        amount: Number(c),
                        otherAmount: Number(h),
                        waitAmount: u,
                        couponId: l,
                        couponName: g,
                        signDays: d,
                        signStatus: r
                    });
                } else -1 == o && wx.showModal({
                    title: "友情提醒",
                    content: "您还未登录，请先登录",
                    complete: function(t) {
                        t.confirm && wx.navigateTo({
                            url: "/pages/login/login"
                        });
                    }
                });
            }
        });
    },
    getPacketInfo: function(e) {
        var a = this, o = c.changeDataset(e.currentTarget.dataset.dataset);
        s.sendEventData(o), t.checkLogin() ? (c.sendFormId(e.detail.formId, 6), wx.request({
            url: t.globalData.URL_M + "xcxredpacket/reciveRedPacket",
            data: {
                xcx_uid: wx.getStorageSync("uid"),
                xcx_sign: wx.getStorageSync("xcx_sign"),
                from: "xcx_zhekou"
            },
            success: function(t) {
                var e = t.data, o = e.code, n = e.data, s = a.data.showAlert, i = a.data.showActAlert;
                if (1e3 == o && n) {
                    var r = n.amount, c = n.addedMoney, d = n.days, u = n.withdrawals_amount, l = n.couponid, g = n.couponimg, h = n.ae_ab_name, x = n.extra_total_money;
                    a.getSignElStatus(r, x, l, h), 0 == e.data.first_receive && wx.showModal({
                        title: "每日签到",
                        content: '关注"卷皮"公众号，一键签到操作更简单！每日签到提醒，连签奖励不错过!',
                        showCancel: !1
                    }), c > 0 || l > 0 && h ? s = !0 : 5 !== d && 7 !== d && (i = !0), a.setData({
                        amount: Number(r),
                        otherAmount: Number(x),
                        waitAmount: u,
                        sevenAmount: Number(c),
                        couponId: l,
                        couponImg: g,
                        couponName: h,
                        signDays: d,
                        signStatus: 1,
                        showAlert: s,
                        showActAlert: i
                    });
                } else if (1003 == o) {
                    var p = a.data, m = p.amount, w = p.otherAmount, f = p.couponId, _ = p.couponName;
                    a.getSignElStatus(m, w, f, _), a.setData({
                        signStatus: 1
                    }), wx.showModal({
                        title: "友情提醒",
                        content: e.msg,
                        showCancel: !1
                    });
                } else wx.showModal({
                    title: "友情提醒",
                    content: e.msg,
                    showCancel: !1
                });
            }
        })) : this.loginAction();
    },
    getActAlertInfo: function() {
        var a = this, o = this;
        wx.request({
            url: t.globalData.URL_MAPI + "ad/info",
            data: {
                app_name: t.globalData.APP_NAME,
                app_version: t.globalData.APP_VERSION,
                zhouyi_ids: e,
                platform: "msmall",
                scene_key: "xcx_redbag"
            },
            method: "GET",
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                var e = t.data, n = void 0 === e ? {} : e;
                if (1e3 == n.code && n.data) {
                    var s = n.data[0], i = parseInt(s.start_time, 10), r = parseInt(s.end_time, 10);
                    (o.data.nowTime < i || a.data.nowTime > r) && o.setData({
                        showActAlert: !1
                    }), o.setData({
                        actAlert: s
                    });
                } else o.setData({
                    showActAlert: !1
                });
            }
        });
    },
    closeActAlert: function() {
        this.setData({
            actAlertInfo: ""
        });
    },
    goRecord: function(e) {
        var a = e.currentTarget.dataset;
        s.sendEventData(a), t.checkLogin() ? wx.navigateTo({
            url: "../record/index"
        }) : this.loginAction();
    },
    getShareResult: function() {
        var e = this;
        wx.request({
            url: t.globalData.URL_M + "xcxredpacket/checkShare",
            data: {
                xcx_uid: wx.getStorageSync("uid"),
                xcx_sign: wx.getStorageSync("xcx_sign"),
                from: "xcx_zhekou"
            },
            success: function(t) {
                var a = t.data;
                1e3 == a.code ? e.setData({
                    showAlert: !0,
                    shareAct: !0,
                    cls: ""
                }) : 2e3 == a.code && wx.showToast({
                    title: a.msg
                });
            }
        });
    },
    getSharePacket: function(e) {
        var a = this, o = e.currentTarget.dataset;
        s.sendEventData(o), wx.request({
            url: t.globalData.URL_M + "xcxredpacket/getSharePacket",
            data: {
                xcx_uid: wx.getStorageSync("uid"),
                xcx_sign: wx.getStorageSync("xcx_sign"),
                from: "xcx_zhekou"
            },
            success: function(t) {
                var e = t.data;
                if (1e3 == e.code && e.data) {
                    var o = e.data, n = o.share_amount, s = o.withdrawals_amount, i = a.data.otherAmount, r = a.data, c = r.amount, d = r.couponId, u = r.couponName;
                    i = (Number(i) + Number(n)).toFixed(2), a.getSignElStatus(c, i, d, u), a.setData({
                        otherAmount: i,
                        shareAmount: Number(n),
                        waitAmount: s,
                        shareEnd: !0
                    });
                } else a.data.showAlert && a.setData({
                    showAlert: !1
                }), wx.showModal({
                    title: "友情提醒",
                    content: e.msg,
                    showCancel: !1
                });
            }
        });
    },
    getSignElStatus: function(t, e, a, o) {
        var n = this.data.title, s = this.data.cls;
        (t > 0 || e > 0) && a > 0 && "" != o ? s = "fiveall" : 0 == t && 0 == e && a > 0 && "" != o ? (n = "今日红包已抢光, 明天早点来哦", 
        s = "fiveover") : 0 == t && 0 == e && 0 == a && "" == o ? (n = "今日红包已抢光, 明天早点来哦", 
        s = "over") : (n = "恭喜你今天领到微信红包", s = ""), this.setData({
            title: n,
            cls: s
        });
    },
    closeAlert: function(t) {
        var e = t.currentTarget.dataset;
        s.sendEventData(e), this.setData({
            showAlert: !1,
            showActAlert: !1
        });
    },
    getGoods: function() {
        var e = this, n = {
            page: o,
            scene_key: "fenxiao_gaoyong",
            app_version: t.globalData.APP_VERSION,
            platform: t.globalData.PLATFORM
        };
        wx.request({
            url: t.globalData.URL_MAPI + "xcxgoods/goodslist",
            data: n,
            method: "GET",
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                var n = t.data, s = void 0 === n ? {} : n;
                if (s && 1e3 == s.code && s.data && s.data) {
                    var i = s.data, r = i.goods || [], c = e.data.recGoods, d = {};
                    c = 1 === o ? r : c.concat(r), d.recGoods = c, 0 == i.has_more_page ? o++ : (o = !1, 
                    d.noMore = !0), i.new_goods_count > 0 && (d.empty = !1), d.ready = !0, e.setData(d);
                }
                a = !1;
            }
        });
    },
    scrollGetGoods: function(t) {
        o && !a && (a = !0, this.getGoods());
    },
    onShareAppMessage: function(e) {
        if ("button" === e.from && u.buttonShare && e.target.dataset.path) {
            e.target.dataset.path = n = "pages/index/index?goto=" + encodeURIComponent("/" + e.target.dataset.path);
            var a = u.buttonShare(e.target.dataset);
            return this.setData({
                showShareModal: !1
            }), a;
        }
        var o = this, n = "pages/qiandao/index/index";
        return t.setShare("领现金红包还可提现！快来和我一起签到领红包吧！", n, function(t) {
            t && t.shareTickets ? wx.getShareInfo({
                shareTicket: t.shareTickets[0],
                complete: function(t) {
                    t.encryptedData ? o.getShareResult() : wx.showToast({
                        image: "../../../images/i.png",
                        title: "分享到群才能领取红包哦"
                    });
                }
            }) : wx.showToast({
                image: "../../../images/i.png",
                title: "分享到群才能领取红包哦"
            });
        }, "https://goods2.juancdn.com/seller/180530/3/2/5b0e64dd33b0896aaf3d86ed_750x600.png?imageMogr2/quality/70!/format/jpg");
    },
    bindTopTap: function(t) {
        this.setData({
            isTopHidden: !1,
            scrollTop: 0
        });
        var e = t.currentTarget.dataset;
        s.sendEventData(e);
    },
    dealScroll: function(t) {
        this._dealScroll(t);
    },
    _dealScroll: l
}, i, s.pageEvents, d, u));