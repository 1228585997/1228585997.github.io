var a = getApp(), t = void 0, e = void 0, s = [], o = [ 1 ], i = [ 0 ], n = require("../../utils/util"), d = require("../../utils/statistics"), r = require("../../components/blockAds/index"), c = require("../../components/error-msg/error-msg");

Page(n.mergePage({
    data: {
        scrollTop: 0,
        curTab: 0,
        tabLocation: 0,
        tabs: [],
        bannersList: [],
        goodsList: [ [] ],
        noMore: !0,
        isTopHidden: !0
    },
    onShow: function() {
        d.sendPageData("page_haohuo_pintuan", "", "进入拼爆款页");
    },
    onLoad: function(a) {
        t = !1, this.getTabs(), wx.canIUse && wx.canIUse("showShareMenu") && wx.showShareMenu({
            withShareTicket: !0
        }), d.sendZhugePageData("进入拼爆款页", {});
    },
    bindNavTap: function(a) {
        var t = a.currentTarget.dataset, e = t.index;
        e != this.data.curTab && this.setData({
            curTab: e
        }), t.zhugeActivityparam = {
            "tab名称": t.name
        }, d.sendEventData(t);
    },
    bindSwiperChange: function(a) {
        var t = a.detail.current;
        this.setTabChange(t);
    },
    setTabChange: function(a) {
        var i = o[a], n = 0;
        a > 2 && (n = 50 * (a - 2)), this.setData({
            curTab: a,
            tabLocation: n,
            isTopHidden: s[a] < 1e3,
            scrollTop: s[a]
        }), t = !1, 1 === i && (this.getAds(e, "pinhaohuonew", 0), this.getGoods());
    },
    getTabs: function() {
        var t = this;
        wx.request({
            url: a.globalData.URL_TUAN + "xcxptgoods/category_list",
            data: {},
            method: "GET",
            complete: function() {
                var a = t;
                n.getZyId(function(t) {
                    e = "p16_" + t, a.getAds(e, "pinhaohuonew", 0), a.getGoods(), a = null;
                });
            },
            success: function(a) {
                var e = a.data;
                if (e && 1e3 == e.code && e.data && e.data.length) {
                    var n = e.data, d = t.data.goodsList;
                    n.forEach(function(a, t) {
                        d[t] = [], o[t] = 1, i[t] = 0, s[t] = 0;
                    }), t.setData({
                        tabs: n,
                        goodsList: d
                    });
                }
            }
        });
    },
    getBanners: function() {
        var t = this;
        wx.request({
            url: a.globalData.URL_API_PREFIX + "index/pinhaohuoads",
            data: {},
            method: "GET",
            success: function(a) {
                var e = a.data;
                if (e && 1e3 == e.code && e.data && e.data.slide_ads && e.data.slide_ads.length) {
                    var s = e.data.slide_ads;
                    t.setData({
                        bannersList: s
                    });
                }
            }
        });
    },
    getGoods: function() {
        var s = this;
        t = !0;
        var n = this.data, d = n.curTab, r = n.tabs, c = n.goodsList, u = this.data.noMore, h = {
            cid: r[d] ? r[d].id : 368,
            show_type: a.globalData.PLATFORM,
            zhouyi_ids: e,
            page: o[d],
            app_version: a.globalData.APP_VERSION,
            pageSize: 20
        };
        wx.request({
            url: a.globalData.URL_TUAN + "pintuan/get_goods_list",
            data: h,
            method: "GET",
            success: function(a) {
                var e = a.data;
                if (e && 1e3 == e.code && e.data && e.data && e.data.goods && e.data.goods.length) {
                    var n = e.data, r = n.goods, h = n.has_next_page;
                    i[d] = Number(h), u = !!i[d], c[d] = c[d].concat(r), o[d]++, s.setData({
                        goodsList: c,
                        noMore: u
                    }), t = !1;
                } else s.setData({
                    noMore: !0
                });
            }
        });
    },
    scrollGetGoods: function() {
        var a = this.data.curTab;
        i[a] && !t && this.getGoods();
    },
    bindTopTap: function(a) {
        s[this.data.curTab] = 0, this.setData({
            isTopHidden: !1,
            scrollTop: 0
        });
    },
    dealScroll: function(a) {
        var t = a.detail.scrollTop;
        if (s[this.data.curTab] = t, t > 1e3) this.data.isTopHidden && this.setData({
            isTopHidden: !1
        }); else if (t < 100 && !this.data.isTopHidden) {
            var e = {
                isTopHidden: !0
            };
            this.setData(e);
        }
    },
    onShareAppMessage: function() {
        var t = "爆款拼团会场，低至1元起拼";
        return Math.floor(new Date().getTime() / 1e3) + a.globalData.TIME_DIFF <= 1510624800 && (t = "【11.11来啦！】爆款拼团会场，低至1元起拼"), 
        a.setShare(t, "pages/pinhaohuo/index", null, "https://jp.juancdn.com/xcx_images/pinhaohuo/share.jpg");
    }
}, c, r, d.pageEvents));