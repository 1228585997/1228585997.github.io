var e = getApp(), t = require("../../utils/util"), a = require("./common/actutil"), n = require("../../utils/statistics"), o = require("../../utils/throttle"), i = require("../../components/countdown/countdown"), r = require("../../components/minicart/minicart"), c = require("../../components/enshrine/index"), s = require("../../components/toast/toast"), m = (require("../../components/backtop/backtop"), 
require("components/image/image")), u = require("components/tab/tab"), d = require("components/rule/rule"), l = require("components/goods/goods"), p = require("components/coupon/coupon"), T = require("components/bottomNav/bottomNav"), g = require("components/secKill/secKill"), h = require("components/leaderBoard/leaderBoard"), f = require("components/goodsComment/goodsComment"), w = require("components/shopTimeLimit/shopTimeLimit"), b = require("components/specialCoupons/specialCoupons"), x = require("components/slideImage/slideImage"), v = require("components/cycleNotice/cycleNotice"), N = require("components/subscribe/index"), D = void 0, S = o(function(e) {
    this.dealScrollForTab(e), e.scrollTop >= 400 ? this.setData({
        isTopHidden: !1
    }) : this.setData({
        isTopHidden: !0
    });
}, 100);

Page(t.mergePage({
    data: {
        spcGroups: {},
        isTopHidden: !0,
        ready: !1
    },
    onLoad: function(e) {
        wx.showLoading && wx.showLoading({
            title: "加载中"
        }), D = e.name, this.getAct(e.name), wx.canIUse && wx.canIUse("showShareMenu") && wx.showShareMenu({
            withShareTicket: !0
        });
    },
    onShow: function() {
        n.sendPageData("page_act", D, "进入活动页");
    },
    getAct: function(o) {
        var i = this;
        wx.request({
            url: e.globalData.URL_MACT + o + "-getPageConfig",
            header: {
                "Content-Type": "application/json"
            },
            success: function(r) {
                var c = r.data, s = void 0 === c ? {} : c;
                if (1e3 == s.code) {
                    var m = s.data;
                    a.getSystemTime(m.actName, m.actStartTime, function() {
                        var t = e.globalData.ACT_TIME_DIFF + new Date().getTime();
                        !m.actEndTime || t >= 1e3 * m.actEndTime ? "/pages/index/index" == m.jieshuUrl ? wx.switchTab({
                            url: m.jieshuUrl
                        }) : wx.redirectTo({
                            url: m.jieshuUrl
                        }) : i.transformData(m);
                    });
                    var u = m.seo;
                    n.sendZhugePageData("进入活动页", {
                        "活动id": o,
                        "活动URL": t.getCurrrentPageUrl(),
                        "活动名称": u.title
                    });
                }
            },
            complete: function() {
                i.setData({
                    ready: !0
                }), wx.hideLoading && wx.hideLoading();
            }
        });
    },
    transformData: function(e) {
        var t, a = this, n = -1, o = "#fff", i = !1;
        wx.setNavigationBarTitle({
            title: e.seo.title
        });
        var r = [];
        e.components.map(function(e, t) {
            "Template" === e.ctype && (r = r.concat(e.components));
        }), e.components = e.components.concat(r);
        var c = !1;
        e.components.map(function(r, s) {
            switch (r.ctype) {
              case "TabNew":
                return n = r.jumpType, a.tabTransformData(r);

              case "Image":
                return a.imageTransformData(r, e.actName);

              case "Rule":
                return t = r.id, a.ruleTransformData(r);

              case "Goods":
                return a.goodsTransformData(r, e.actName, e.newZid);

              case "PageConfig":
                return r.bg && (o = r.bg), r;

              case "Clock":
                return a.countdown({
                    endTime: r.endTime || 1e3 * parseInt(e.actEndTime, 10),
                    timeKey: "clock." + r.id,
                    isAct: !0,
                    onEnd: function() {
                        "/pages/index/index" == e.jieshuUrl ? wx.switchTab({
                            url: e.jieshuUrl
                        }) : wx.redirectTo({
                            url: e.jieshuUrl
                        });
                    }
                }), r.bg.src = a.getImageUrl(r.bg.src), c = !0, r;

              case "Coupons":
                return a.couponTransformData(r, e.actName, e.rule, e.actEndTime);

              case "BottomNav":
                return i = !0, a.bottomNavTransformData(r, e.actName);

              case "Seckill":
                return a.secKillTransformData(r, e.actName, e.newZid, e.actEndTime);

              case "LeaderBoard":
                return a.initLeaderBoard(r, e.actName);

              case "GoodsComment":
                return a.goodsCommentTransformData(r, e.actName);

              case "ShopTimeLimit":
                return function t() {
                    for (var n = void 0, o = new Date().valueOf(), i = 0; i < r.endTimeList.length; i++) if (o < r.endTimeList[i].endTime) {
                        n = i;
                        break;
                    }
                    void 0 !== n ? (a.setData({
                        shopTimeLimitHidden: !1
                    }), a.countdown({
                        endTime: parseInt(r.endTimeList[n].endTime, 10) || 1e3 * parseInt(e.actEndTime, 10),
                        timeKey: "clock." + r.id,
                        isAct: !0,
                        onEnd: t
                    })) : (a.countdown({
                        endTime: 0,
                        timeKey: "clock." + r.id
                    }), a.setData({
                        shopTimeLimitHidden: !0
                    }));
                }(), a.shopTimeLimitTransformData(r, e.actName, e.newZid);

              case "SpecialCoupons":
                a.getSpecialCouponsStatus(r.groups, e.actName, r.id);
                break;

              case "SlideImage":
                a.slideImageTransformData(r, s);
                break;

              case "CycleNotice":
                a.initCycleNotice(r, e.actName);
                break;

              case "Subscribe":
                a.subscribeTransformData(r, s);
                break;

              default:
                return r;
            }
        }), c || a.countdown({
            endTime: 1e3 * parseInt(e.actEndTime, 10),
            timeKey: "clock." + e.actName,
            isAct: !0,
            noShow: !0,
            onEnd: function() {
                "/pages/index/index" == e.jieshuUrl ? wx.switchTab({
                    url: e.jieshuUrl
                }) : wx.redirectTo({
                    url: e.jieshuUrl
                });
            }
        }), this.setData({
            actName: e.actName,
            components: e.components,
            newZid: e.newZid,
            share: e.share,
            curTab: 0,
            ifFixedTabs: !1,
            tabJumpType: n,
            pageStyle: "background-color:" + o + ";",
            hasBottomNav: i,
            actStartTime: e.actStartTime,
            actEndTime: e.actEndTime,
            defaultRuleId: t,
            canUseSelector: wx.canIUse && wx.canIUse("createSelectorQuery")
        });
    },
    getImageUrl: function(e) {
        if ("webp" === e.slice(-4)) return e.slice(0, -4) + "jpg";
        if ("/" === e.charAt(0) && "/" === e.charAt(1)) return "https:" + e;
        if ("/" !== e.charAt(0) || "/" === e.charAt(1)) return e;
        var t = e.slice(-3);
        return "jpg" !== t && "png" !== t ? "https://s2.juancdn.com" + e : "https://s2.juancdn.com" + e + "?iopcmd=convert&Q=88&dst=" + t;
    },
    onPageScroll: function(e) {
        S.call(this, e);
    },
    bindTopTap: function(e) {
        wx.pageScrollTo ? wx.pageScrollTo({
            scrollTop: 0
        }) : wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        });
    },
    onUnload: function() {
        var e = this.data.clock;
        for (var t in e) clearTimeout(e[t]);
    },
    onShareAppMessage: function() {
        var t = this.data, a = t.share.share_title, n = "pages/act/act?name=" + t.actName, o = {
            "分享场景": a,
            "分享id": t.actName
        };
        return e.setShare(a, n, null, null, o);
    }
}, m, u, i, d, l, p, T, h, g, f, w, b, x, v, N, s, c, r, n.pageEvents));