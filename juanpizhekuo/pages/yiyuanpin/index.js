var e = getApp(), a = void 0, t = void 0, o = void 0, s = require("../../utils/util"), n = require("../../utils/statistics"), i = require("../../components/backtop/backtop"), r = require("../../components/error-msg/error-msg"), d = require("../../components/blockAds/index");

Page(s.mergePage({
    data: {
        forU: [],
        forNews: [],
        recGoods: [],
        scrollTop: 0,
        forNewsPage: 1,
        forNewsHasMore: !1,
        totalPages: 1,
        isTopHidden: !0
    },
    onShow: function() {
        n.sendPageData("page_yiyuan_pintuan", "", "进入一元拼");
    },
    onLoad: function(e) {
        a = !1, t = 1;
        var i = this;
        s.getZyId(function(e) {
            o = "p16_" + e, i.getAds(o, "yiyuanpin", 0, function() {
                i.data.blockadsArr[0] && i.setData({
                    middleAds: i.data.blockadsArr[0].slice(1)
                }), i = null;
            });
        }), this.getRecGoods(), this.getForNews(), wx.canIUse && wx.canIUse("showShareMenu") && wx.showShareMenu({
            withShareTicket: !0
        }), n.sendZhugePageData("进入一元拼", {});
    },
    getForNews: function() {
        var t = this, n = this.data.forNewsPage, i = this.data.forNews;
        wx.request({
            url: e.globalData.URL_TUAN + "oldbringnew/invitation?page=" + n + "&platform=xcx&page_size=20",
            data: {},
            method: "GET",
            complete: function() {
                a = !1;
            },
            success: function(e) {
                var a = e.data;
                if (1e3 == a.code && a.data && a.data.length) {
                    n++, i = i.concat(a.data);
                    var r = {
                        forNewsHasMore: !0,
                        forNewsPage: n
                    };
                    2 === n && (r.forNews0 = i.slice(0, 4), r.forNews1 = i.slice(4, 9), i = i.slice(9)), 
                    r.forNews = i, t.setData(r);
                } else {
                    t.setData({
                        forNewsHasMore: !1
                    });
                    var d = t;
                    s.getZyId(function(e) {
                        o = "p16_" + e, d.getBestGoods(), d = null;
                    });
                }
            }
        });
    },
    getRecGoods: function() {
        var a = this, t = e.getPublicArg();
        t.apisign = e.createApisign(t), wx.request({
            url: e.globalData.URL_TUAN + "oldbringnew/recommend",
            data: t,
            method: "GET",
            header: {
                "Content-Type": "application/json"
            },
            success: function(e) {
                var t = e.data, o = void 0 === t ? {} : t;
                1e3 == o.code && a.setData({
                    forU: o.data
                });
            }
        });
    },
    getBestGoods: function() {
        var s = this;
        wx.request({
            url: e.globalData.URL_TUAN + "pintuan/get_goods_list",
            data: {
                cid: "pinhaohuo_sx",
                show_type: "wap",
                zhouyi_ids: o,
                page: t,
                app_version: e.globalData.APP_VERSION,
                pageSize: 10
            },
            method: "GET",
            header: {
                "Content-Type": "application/json"
            },
            success: function(e) {
                var o = e.data, n = void 0 === o ? {} : o;
                if (a = !1, 1e3 == n.code) {
                    var i = n.data.goods, r = {
                        recGoods: s.data.recGoods.concat(i)
                    };
                    1 == n.data.has_next_page ? t++ : (t = !1, r.noMore = !0), s.setData(r);
                } else t = !1, s.setData({
                    noMore: !0
                });
            }
        });
    },
    scrollGetGoods: function() {
        if (a) return !1;
        a = !0, this.data.forNewsHasMore ? this.getForNews() : t && this.getBestGoods();
    },
    onShareAppMessage: function() {
        var a = "分享给你1元抢购机会，限量拼手速！";
        return Math.floor(new Date().getTime() / 1e3) + e.globalData.TIME_DIFF <= 1510624800 && (a = "【卷皮11.11】分享给你1元抢购机会，限量拼手速！"), 
        e.setShare(a, "pages/yiyuanpin/index", null, "https://jp.juancdn.com/xcx_images/yiyuanpin/share.jpg");
    }
}, d, i, r, n.pageEvents));