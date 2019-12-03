var t = getApp(), a = void 0, e = void 0, o = void 0, i = void 0, n = void 0, s = require("../../utils/util"), r = require("../../utils/http"), c = require("../../utils/statistics"), d = require("../../components/blockAds/index"), g = require("../../components/alert/alert"), p = require("../../components/alertCoupon/alertCoupon"), u = require("../../components/searchbar/index"), h = require("../../components/send-formid/index"), l = require("../../components/backtop-page/index"), v = require("../../utils/throttle"), x = require("../../components/toast/toast"), f = "fenxiao_shangxin", w = require("../../components/share/share");

Page(s.mergePage({
    data: {
        ready: !1,
        canUseSelector: wx.canIUse && wx.canIUse("createSelectorQuery"),
        curTab: 0,
        alertShow: !1,
        alertCouponShow: !1,
        phone: "",
        authCodeDisabled: !0,
        authCodeText: "获取验证码",
        loginDisabled: !0,
        couponsImg: "",
        couponList: [],
        couponNum: "",
        explain_msg: "",
        tabLocation: 0,
        tabList: [],
        lists: [ [], [], [], [], [], [], [], [], [], [] ],
        blockadsArr: [ [] ],
        noMore: !1,
        isTopHidden: !0,
        searchBar: {
            open: "0"
        },
        isLogin: t.checkLogin()
    },
    checkFormXcxCode: function(t) {
        if (t && t.st) switch (t.inviteCode && wx.setStorageSync("otherInviteCode", t.inviteCode), 
        t.st) {
          case "sp":
            c.sendEventData({
                activity: "navigate_from_xcx_code_to_goods",
                activityparam: t.id
            }), wx.navigateTo({
                url: "/pages/shop/shop?id=" + t.id
            });
            break;

          case "hd":
            "box" == t.name ? (c.sendEventData({
                activity: "navigate_from_xcx_code_to_act",
                activityparam: "share_box"
            }), wx.navigateTo({
                url: "/pages/activity/box/index?inviteCode=" + t.inviteCode
            })) : "sm" == t.name ? (c.sendEventData({
                activity: "navigate_from_xcx_code_to_act",
                activityparam: "share_money"
            }), wx.navigateTo({
                url: "/pages/activity/shareMoney/index?inviteCode=" + t.inviteCode
            })) : t.name;
        } else if (t && t.goto) {
            var a = decodeURIComponent(t.goto);
            wx.navigateTo({
                url: a
            });
        }
    },
    onLoad: function(t) {
        s.getQueryFromShareSence(t), this.checkFormXcxCode(t), this.init(!1), wx.canIUse && wx.canIUse("showShareMenu") && wx.showShareMenu({
            withShareTicket: !0
        }), c.sendZhugePageData("进入首页", {});
    },
    onShow: function() {
        wx.getStorageSync("reloadIndex") && (this.init(!0), wx.setStorageSync("reloadIndex", !1)), 
        c.sendPageData("page_tab", "all", "进入首页");
    },
    init: function(r) {
        wx.showLoading && wx.showLoading({
            title: "加载中"
        }), this.setData({
            nickName: wx.getStorageSync("wxname"),
            avatar: wx.getStorageSync("avatarUrl")
        }), e = !1, o = [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ], n = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], 
        i = 0, r && this.setData({
            tabLocation: 0,
            curTab: 0,
            noMore: !1
        }), this.getTabs(r);
        var c = this;
        s.getZyId(function(t) {
            a = "p16_" + t, c.getSearchSet(), c.getAds(a, "xcx_shangxin", 0), c.getGoods(0, 1, f), 
            c.initPopup(a);
        }), this.data.gotoVip && t.checkLogin() && (wx.navigateTo({
            url: "../vip/index2/index"
        }), this.setData({
            gotoVip: !1,
            isLogin: t.checkLogin()
        }));
    },
    onPullDownRefresh: function() {
        this.init(!0);
    },
    goLoginAndToVip: function() {
        this.showLoginModal(), this.setData({
            gotoVip: !0
        }), c.sendEventData({
            activity: "click_index_top_login"
        });
    },
    newUserRegister: function() {
        var a = this;
        t.checkLogin() || (r.GET(t.globalData.URL_MAPI + "coupons/bagprice", {}).then(function(t) {
            "1000" == t.data.code && a.setData({
                couponNum: t.data.data.bagPirce
            });
        }), this.setData({
            alertShow: !0
        }));
    },
    getSearchSet: function() {
        var e = this, o = t.getPublicArg(), i = {
            zy_ids: a,
            utype: o.jpGoodsUtype,
            utm: c.getData("utm"),
            ugroup: o.jpUserGroup,
            to_switch: 0,
            location: "",
            app_name: t.globalData.APP_NAME,
            platform: t.globalData.PLATFORM,
            app_version: t.globalData.APP_VERSION
        };
        i.apisign = t.createApisign(i), wx.request({
            url: t.globalData.URL_API + "setting/leaf",
            data: i,
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                var a = t.data, o = void 0 === a ? {} : a;
                if (1e3 == o.code) {
                    var i = o.data.app_menu.menulist;
                    if (i.length <= 0) return !1;
                    var n = i[0].search_info;
                    e.setData({
                        searchBar: n
                    });
                }
            }
        });
    },
    getTabs: function(a) {
        var e = this;
        wx.request({
            url: t.globalData.URL_TUAN + "xcxptgoods/category_list",
            data: {
                scene_key: f
            },
            method: "GET",
            success: function(t) {
                var a = t.data, i = void 0 === a ? {} : a;
                if (i && 1e3 == i.code && i.data && i.data.length) {
                    var s = i.data, r = [];
                    o = [], n = [], s.forEach(function(t) {
                        r.push([]), o.push(1), n.push(0);
                    }), f === s[0].id ? (o[0] = 2, r[0] = e.data.lists[0]) : e.getGoods(0, 1, s[0].id), 
                    e.setData({
                        tabList: s,
                        lists: r
                    });
                }
            },
            complete: function() {
                a && wx.stopPullDownRefresh();
            }
        });
    },
    bindNavTap: function(t) {
        var a = t.currentTarget.dataset, e = a.index;
        e != this.data.curTab && this.setTabChange(e), c.sendEventData({
            activity: "click_menu_item",
            activityparam: a.cid,
            zhugeActivity: "商品流tab栏",
            zhugeActivityparam: {
                "tab名称": a.name
            }
        });
    },
    setTabChange: function(t) {
        n[this.data.curTab] = i;
        var a = o[t], e = 0;
        t > 2 && (e = 50 * (t - 2));
        var s = {}, r = !1, c = {
            tabLocation: e,
            isTopHidden: !0,
            curTab: t
        };
        1 === a ? (wx.showLoading && wx.showLoading({
            title: "加载中"
        }), r = !0, this.getGoods(t, a, this.data.tabList[t].id, r, c)) : s = c, !1 === a ? !this.data.noMore && (s.noMore = !0) : this.data.noMore && (s.noMore = !1), 
        this.setData(s), !r && this.goToTabs(!1);
    },
    getGoods: function(i, n) {
        var s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : f, r = this, c = arguments[3], d = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {}, g = {
            cid: s,
            show_type: t.globalData.PLATFORM,
            zhouyi_ids: a,
            page: n,
            is_need_ad: 1,
            app_version: t.globalData.APP_VERSION,
            pageSize: 20
        };
        wx.request({
            url: t.globalData.URL_TUAN + "pintuan/get_goods_list",
            data: g,
            method: "GET",
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                var a = t.data, e = void 0 === a ? {} : a;
                if (e && 1e3 == e.code && e.data && e.data && e.data.goods && e.data.goods.length) {
                    var s = e.data.hongbaoyu;
                    s && s != wx.getStorageSync("hongbaoyu") && (wx.setStorageSync("hongbaoyu", s), 
                    wx.navigateTo({
                        url: "/pages/hongbaoyu/index"
                    }));
                    var c = e.data, d = c.goods, g = r.data.lists, p = {};
                    g[i] = 1 === n ? d : g[i].concat(d), p.lists = g, 1 == c.has_next_page ? o[i] = n + 1 : (o[i] = !1, 
                    p.noMore = !0), r.setData(p);
                } else e && 1001 == e.code && r.setData({
                    noMore: !0
                });
            },
            complete: function() {
                e = !1, 1 === g.page && (!r.data.ready && (d.ready = !0), d.isVip = wx.getStorageSync("vipStatus") > 0, 
                wx.hideLoading && wx.hideLoading()), r.setData(d), c && r.goToTabs(!0);
            }
        });
    },
    goToTabs: function(t) {
        var a = this;
        if (t) {
            if (a.data.tabFix && a.data.canUseSelector) {
                var e = wx.createSelectorQuery();
                e.select("#tabs").boundingClientRect(), e.selectViewport().scrollOffset(), e.exec(function(t) {
                    if (t.length <= 0) return !1;
                    var a = t[1], e = t[0].top + a.scrollTop + 1;
                    wx.pageScrollTo && wx.pageScrollTo({
                        scrollTop: e
                    });
                });
            }
        } else wx.pageScrollTo && setTimeout(function() {
            wx.pageScrollTo({
                scrollTop: n[a.data.curTab]
            });
        }, 200);
    },
    onReachBottom: function(t) {
        var a = this.data.curTab;
        o[a] && !e && (e = !0, this.getGoods(a, o[a], this.data.tabList[a] ? this.data.tabList[a].id : f));
    },
    bindTopTap: l.bindTopTap,
    onPageScroll: v(function(t) {
        l.onPageScroll.call(this, t);
        var a = this, e = t.scrollTop;
        i = e, this.data.canUseSelector && wx.createSelectorQuery().select("#tabs").boundingClientRect().exec(function(t) {
            if (a.data.tabList.length <= 0) return !1;
            t[0].top < 0 ? !a.data.tabFix && a.setData({
                tabFix: !0
            }) : a.data.tabFix && a.setData({
                tabFix: !1
            });
        });
    }, 200),
    onShareAppMessage: function(a) {
        var e = "pages/index/index";
        if ("button" == a.from && w.buttonShare) {
            a.target.dataset.path = e = "pages/index/index?goto=" + encodeURIComponent("/" + a.target.dataset.path);
            var o = w.buttonShare(a.target.dataset);
            return this.setData({
                showShareModal: !1
            }), o;
        }
        return t.setShare("推荐一家有品质的折扣店《卷皮折扣》", e);
    },
    initPopup: function(a) {
        var e = !0;
        s.getCache("sideBarTime") ? new Date(s.getCache("sideBarTime")).getDate() == new Date().getDate() && (e = !1) : s.getCache("sideBarFlag") && (e = !1);
        var o = this, i = t.getPublicArg();
        i.zy_ids = a, i.apisign = t.createApisign(i), s.post({
            url: t.globalData.URL_MAPI + "appads/home/popup",
            data: i,
            complete: function(t) {
                var a = t.data.data;
                if (0 != a.length) {
                    var i = [];
                    a.sidebar_ads && (i = a.sidebar_ads[0]);
                    var n = !0, s = wx.getStorageSync("popup");
                    s.id == a.config.id && s.version == a.config.version && (-1 == a.config.times || a.config.times >= 1) && s.count <= 0 && (n = !1), 
                    o.setData({
                        popup: a.config,
                        popupShow: n,
                        sideAd: i,
                        sideAdShow: e
                    }), a.config && (s.id == a.config.id && s.version == a.config.version || wx.setStorage({
                        key: "popup",
                        data: {
                            id: a.config.id,
                            version: a.config.version,
                            times: a.config.times,
                            count: a.config.times
                        }
                    }));
                }
            }
        }, !0);
    },
    closeSidebar: function() {
        1 == this.data.sideAd.ads_info.sa_close_type ? s.setCache("sideBarTime", new Date().getTime(), this.data.sideAd.ads_info.end_time - new Date().getTime() / 1e3) : 2 == this.data.sideAd.ads_info.sa_close_type && s.setCache("sideBarFlag", !0, this.data.sideAd.ads_info.end_time - new Date().getTime() / 1e3), 
        this.setData({
            sideAdShow: !1
        });
    },
    closePopup: function(t) {
        var a = wx.getStorageSync("popup");
        -1 == a.times && (a.count = 0), a.times >= 1 && (a.count = --a.count), wx.setStorage({
            key: "popup",
            data: a
        }), this.setData({
            popupShow: !1
        });
    },
    onPopupTap: function(t) {
        var a = t.currentTarget.dataset.url;
        -1 != a.indexOf("tryoutVipcard") ? this.getVipExpCard(a) : this.jumpToPage(a);
    },
    jumpToPage: function(a) {
        t.isPageInTab(a) ? wx.switchTab({
            url: a
        }) : wx.navigateTo({
            url: a
        });
    },
    getVipExpCard: function(a) {
        var e = this, o = {
            uid: wx.getStorageSync("uid"),
            platform: t.globalData.PLATFORM
        };
        wx.request({
            url: t.globalData.URL_MAPI + "Coupons/receiveOnedayVipcard",
            data: o,
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                var o = t.data, i = void 0 === o ? {} : o;
                1e3 == i.code ? (wx.showToast({
                    title: "领取成功"
                }), e.jumpToPage(a)) : e.showToastMsg(i.info);
            }
        });
    }
}, c.pageEvents, d, u, g, p, h, x, w));