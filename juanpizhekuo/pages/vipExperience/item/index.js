var t = getApp(), a = require("../../../utils/util.js"), e = require("../../../utils/statistics"), i = require("../../../components/countdown/countdown.js"), n = require("../../../components/toast/toast"), o = require("../../../components/sku/sku"), s = require("../../cart/common/index"), r = require("../../../components/mask/mask"), d = void 0, u = void 0, c = void 0, l = void 0, g = void 0;

Page(a.mergePage({
    data: {
        ready: !1,
        canUseSelector: wx.canIUse && wx.canIUse("createSelectorQuery"),
        isTopHidden: !0,
        curIndex: 0,
        Cates: [],
        role: "",
        shareImg: "",
        queryTailId: "",
        uuID: "",
        hasAsked: !1
    },
    onShow: function() {
        wx.canIUse && wx.canIUse("showShareMenu") && wx.showShareMenu({
            withShareTicket: !0
        }), this.getGroupDetail(), e.sendPageData("page_pintuan_item_new", u);
    },
    onLoad: function(i) {
        var n = this;
        t.checkLogin() ? wx.showLoading && wx.showLoading({
            title: "加载中"
        }) : t.goLogin(), u = i.item_id || i.tuanID, g = e.getData("tailID"), i.tailID && !g && (g = i.tailID, 
        e.setData("tailID", g)), n.data.uuID = i.uuid || "", n.data.queryTailId = i.tailID, 
        a.getZyId(function(t) {
            d = "p16_" + t, n.getGoods(0, 1, "2936");
        }), this.getBannerAds(), this.getGid();
    },
    getGroupDetail: function() {
        var a = this, e = this, i = 2, n = t.getPublicArg();
        n.tuanID = u, wx.request({
            url: t.globalData.URL_MAPI + "pintuan/item",
            data: n,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                var n = t.data, o = void 0 === n ? {} : n;
                if (e.data.hasAsked = !1, 1e3 == o.code) {
                    var s = o.data, r = s.item, d = s.goods, u = s.button, h = (s.flow_intro, s.joins), p = +r.proportion, w = +r.is_opening, m = !1;
                    if (r.max && r.max < h.length && (h = h.slice(0, r.max)), r.max && r.max <= 10) for (var v = h.length; v < r.max; v++) h.push({
                        avatar: "/images/sofa.png"
                    });
                    h.length < 5 && (m = !0), i = w ? 2 : "3" == p ? 1 : "2" == r.tuan_status ? 3 : 2, 
                    c = d.cprice, l = d.title, g = g || s.tailID, a.data.role = p, a.data.shareImg = s.share_info && s.share_info.share_image, 
                    a.setData({
                        goods: d,
                        joins: h,
                        role: p,
                        tuan: r,
                        isOpen: w,
                        button: u,
                        showExperience: !1,
                        showGainCard: !1,
                        progressIndex: i,
                        shareButton: "3" == u.status ? "share" : "",
                        showBottomTitle: !0,
                        isSupervip: !0,
                        onlyNewerPop: !1,
                        isCenter: m
                    }), s.title && wx.setNavigationBarTitle({
                        title: s.title
                    }), w && a.countdown({
                        left: parseInt(r.times, 10),
                        timeKey: "clock.10",
                        onEnd: function() {
                            wx.navigateTo({
                                url: "/pages/vipExperience/list/index"
                            });
                        }
                    }), r.trialTime && "0" != r.trialTime && (a.setData({
                        cardLimit: !0
                    }), a.countdown({
                        left: parseInt(r.trialTime, 10),
                        timeKey: "clock.11",
                        onEnd: function() {
                            this.setData({
                                showBottomTitle: !1
                            });
                        }
                    })), 1 == u.status && e.initSku(d.goods_id);
                }
                e.data.hasAsked = !0;
            }
        });
    },
    getBannerAds: function() {
        var a = this, e = t.getPublicArg();
        e.identify = "xcxyypbanner", wx.request({
            url: t.globalData.URL_MAPI + "appads/new_ads",
            data: e,
            method: "GET",
            success: function(t) {
                var e = t.data, i = void 0 === e ? {} : e;
                "1000" == i.code && i.data && i.data.banner_ads && i.data.banner_ads.ads && i.data.banner_ads.ads.length && a.setData({
                    ads: i.data.banner_ads.ads,
                    rate: parseFloat(i.data.banner_ads.rate) * wx.getSystemInfoSync().windowWidth
                });
            }
        });
    },
    handleButton: function(a) {
        var i = a.currentTarget.dataset;
        if (t.checkLogin()) switch (i.status) {
          case "1":
            this.openSku(a);
            break;

          case "2":
            var n = 2 == this.data.tuan.tuan_status ? "1" : "2", o = "";
            o = "1" == this.data.tuan.role ? "1" : "2" == this.data.tuan.role ? "0" : "2", e.sendEventData({
                activity: "click_pintuan_more",
                activityparam: n + "_" + o
            }), wx.navigateTo({
                url: i.url
            });
            break;

          case "3":
            wx.canIUse && !wx.canIUse("button.open-type.share") && wx.showModal({
                title: "提示",
                content: "请点击右上角的菜单进行分享。"
            }), e.sendEventData({
                activity: "click_pintuan_invite",
                activityparam: ""
            });
            break;

          case "4":
            e.sendEventData({
                activity: "click_pintuan_offered",
                activityparam: ""
            }), this.joinTuan();
            break;

          default:
            wx.navigateTo({
                url: i.url
            });
        } else t.goLogin();
    },
    showErrorMsg: function(t) {
        this.showToastMsg(t);
    },
    getGid: function() {
        var t = this;
        e.getData("afterLogin") && e.getData("afterDecode") && t.data.hasAsked ? t.data.queryTailId && t.reportShareStatistic("2") : setTimeout(function() {
            t.getGid();
        }, 100);
    },
    onShareAppMessage: function(a) {
        var e = this, i = "送你一张至尊会员卡，" + c + "元购买" + l + "。", n = "pages/vipExperience/item/index?item_id=" + u + "&tailID=" + g + "&uuid=" + wx.getStorageSync("uid");
        return t.setShare(i, n, function() {
            var t = "1" == e.data.role ? "1" : "4";
            e.reportShareStatistic(t);
        }, this.data.shareImg);
    },
    showJoinModal: function(t) {
        this.setData({
            onlyNewerPop: !0
        });
    },
    closeTip: function(t) {
        this.setData({
            onlyNewerPop: !1
        });
    },
    goLists: function(t) {
        var a = t.currentTarget.dataset;
        this.closeTip(), e.sendEventData(a);
    },
    joinTuan: function(a) {
        var e = this, i = t.getPublicArg();
        i.tuanID = u, i.openId = wx.getStorageSync("openid"), i.formId = a.detail.formId, 
        wx.request({
            url: t.globalData.URL_MAPI + "pintuan/jointuan",
            data: i,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                var a = t.data, i = void 0 === a ? {} : a;
                1e3 == i.code ? (e.reportShareStatistic("3"), wx.navigateTo({
                    url: i.data.jumpUrl
                })) : "2001" == i.code ? e.showJoinModal() : "2002" == i.code ? e.setData({
                    showExperience: !0
                }) : wx.navigateTo({
                    url: "/pages/vipExperience/list/index"
                });
            }
        });
    },
    gainVip: function() {
        var a = this, e = t.getPublicArg();
        wx.request({
            url: t.globalData.URL_MAPI + "pintuan/getcard",
            data: e,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                var e = t.data, i = void 0 === e ? {} : e;
                1e3 == i.code ? a.setData({
                    showGainCard: !0
                }) : a.showToastMsg(i.info);
            }
        });
    },
    showGainPop: function() {
        this.setData({
            showExperience: !1
        });
    },
    reportShareStatistic: function(a) {
        var i = "1" == a || "4" == a ? g : this.data.queryTailId, n = "1" == a || "4" == a ? wx.getStorageSync("uid") : this.data.uuID, o = t.getPublicArg();
        o.tailID = g, o.tuanID = u, o.groupID = e.getData("open_gid"), o.sceneID = e.getData("scene_value"), 
        o.platform = "107", o.shareTitle = "送你一张至尊会员卡，" + c + "元购买" + l + "。", o.shareImg = this.data.shareImg, 
        o.sharePath = "pages/vipExperience/item/index?item_id=" + u + "&tailID=" + i + "&uuid=" + n, 
        o.openID = wx.getStorageSync("openid"), o.userID = wx.getStorageSync("uid"), o.utm = e.getData("utm"), 
        o.pushType = a, o.uuid = this.data.uuID, wx.request({
            url: t.globalData.URL_MAPI + "tail/push_pintuan",
            data: o,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                var a = t.data;
                (void 0 === a ? {} : a).code;
            }
        });
    }
}, i, n, e.pageEvents, o, s, r));