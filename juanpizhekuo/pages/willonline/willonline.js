function e(e, a, t) {
    return a in e ? Object.defineProperty(e, a, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = t, e;
}

var a = getApp(), t = void 0, i = void 0, n = void 0, o = void 0, s = require("../../utils/util"), c = require("../../utils/statistics"), r = require("../../components/blockAds/index"), d = require("../../components/backtop/backtop");

Page(s.mergePage({
    data: {
        tabLocation: 0,
        tabList: [ {
            name: "推荐",
            id: "xcx_home"
        }, {
            name: "居家",
            id: "xcx_jujia"
        }, {
            name: "女装",
            id: "xcx_nvzhuang"
        }, {
            name: "鞋包",
            id: "xcx_xiebao"
        }, {
            name: "家电数码",
            id: "xcx_jiadianshuma"
        }, {
            name: "男士",
            id: "xcx_nanshi"
        }, {
            name: "母婴",
            id: "xcx_muying"
        }, {
            name: "美妆",
            id: "xcx_meizhuang"
        }, {
            name: "美食",
            id: "xcx_meishi"
        } ],
        lists: [ [] ],
        scrollTop: 0,
        noMore: !1,
        isTopHidden: !0,
        searchBar: {
            search_logo: "",
            keyword: ""
        }
    },
    onLoad: function(e) {
        n = [ 1 ], o = [ 0 ], i = !1;
        var a = this;
        this.setData({
            curTab: 0
        }), s.getZyId(function(e) {
            t = "p16_" + e, a.getGoods(0), a = null;
        }), wx.canIUse && wx.canIUse("showShareMenu") && wx.showShareMenu({
            withShareTicket: !0
        });
    },
    onHide: function() {},
    onShow: function() {
        c.sendPageData("page_tab", "all");
    },
    getGoods: function(o) {
        var s = this, c = Object.assign(e({
            zy_ids: t,
            scene_key: this.data.tabList[o].id,
            page: n[o],
            app_name: a.globalData.APP_NAME,
            platform: a.globalData.PLATFORM,
            app_version: a.globalData.APP_VERSION
        }, "scene_key", "xcx_upcoming"), a.getPublicArg());
        c.apisign = a.createApisign(c), wx.request({
            url: a.globalData.URL_MAPI + "goods/zhe/list",
            data: c,
            header: {
                "Content-Type": "application/json"
            },
            success: function(e) {
                var a = e.data, t = void 0 === a ? {} : a;
                if (1e3 == t.code) {
                    var i = t.data, c = i.goods, r = s.data.lists;
                    r[o] = r[o].concat(c), s.setData({
                        lists: r
                    }), 0 == i.has_more_page ? n[o]++ : (n[o] = !1, s.setData({
                        noMore: !0
                    }));
                }
            },
            complete: function() {
                i = !1;
            }
        });
    },
    scrollGetGoods: function(e) {
        var a = this.data.curTab;
        n[a] && !i && (i = !0, this.getGoods(a));
    },
    onShareAppMessage: function() {
        return a.setShare("推荐一家有品质的折扣店《卷皮折扣》", "pages/index/index");
    }
}, c.pageEvents, r, d));