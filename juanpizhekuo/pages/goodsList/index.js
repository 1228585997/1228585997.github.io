var e = getApp(), t = void 0, o = void 0, a = void 0, n = void 0, i = "fenxiao_gaoyong", s = "高佣好货 省钱省心", r = require("../../utils/util"), d = (require("../../utils/http"), 
require("../../utils/statistics")), u = require("../../components/send-formid/index"), c = require("../../components/backtop-page/index"), g = require("../../utils/throttle"), l = require("../../components/toast/toast"), p = require("../../components/share/share.js");

Page(r.mergePage({
    data: {
        ready: !1,
        lists: [],
        noMore: !1,
        empty: !0
    },
    onLoad: function(e) {
        e.scene && (i = e.scene), e.title && (s = e.title), wx.setNavigationBarTitle({
            title: s
        }), d.sendZhugePageData("进入推荐榜单页", {
            "类目id": i,
            "类目名称": s
        }), this.init(!1), wx.canIUse && wx.canIUse("showShareMenu") && wx.showShareMenu({
            withShareTicket: !0
        });
    },
    onShow: function() {
        var e = wx.getStorageSync("vipStatus") > 0;
        this.setData({
            isVip: e
        });
    },
    init: function(e) {
        wx.showLoading && wx.showLoading({
            title: "加载中"
        }), o = !1, a = 1, n = 0, e && this.setData({
            noMore: !1
        });
        var i = this;
        r.getZyId(function(e) {
            t = "p16_" + e, i.getGoods();
        });
    },
    onPullDownRefresh: function() {
        this.init(!0);
    },
    getGoods: function() {
        var t = this, n = {
            scene_key: i,
            page: a,
            app_version: e.globalData.APP_VERSION,
            pageSize: 20,
            uid: wx.getStorageSync("uid"),
            msort: 0,
            platform: e.globalData.PLATFORM
        };
        wx.request({
            url: e.globalData.URL_MAPI + "xcxgoods/goodslist",
            data: n,
            method: "GET",
            header: {
                "Content-Type": "application/json"
            },
            success: function(e) {
                var o = e.data, n = void 0 === o ? {} : o;
                if (n && 1e3 == n.code && n.data && n.data) {
                    var i = n.data, s = i.goods || [], r = t.data.lists, d = {};
                    r = 1 === a ? s : r.concat(s), d.lists = r, 0 == i.has_more_page ? a++ : (a = !1, 
                    d.noMore = !0), i.new_goods_count > 0 && (d.empty = !1), d.banner = i.banner || "", 
                    d.ready = !0, t.setData(d);
                }
            },
            complete: function() {
                o = !1, 1 === n.page && wx.hideLoading && wx.hideLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    onReachBottom: function(e) {
        a && !o && (o = !0, this.getGoods());
    },
    bindTopTap: c.bindTopTap,
    onPageScroll: g(function(e) {
        c.onPageScroll.call(this, e);
        var t = e.scrollTop;
        n = t;
    }, 200),
    onShareAppMessage: function(t) {
        if ("button" == t.from && p.buttonShare) return p.buttonShare(t.target.dataset);
        return e.setShare(s, "pages/goodsList/index");
    }
}, d.pageEvents, u, l, p));