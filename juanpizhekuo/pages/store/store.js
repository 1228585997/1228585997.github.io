var t = getApp(), e = void 0, o = void 0, a = void 0, i = void 0, s = void 0, r = void 0, n = require("../../utils/util"), c = require("../../utils/statistics"), p = require("../../components/backtop/backtop"), d = require("../../components/countdown/countdown"), u = require("../../components/get-coupon/index"), g = require("../../components/actinfo/index"), l = require("../../components/mask/mask"), f = require("../../components/error-msg/error-msg");

Page(n.mergePage({
    data: {
        curSort: 0,
        isPriceUp: 0,
        actInfo: [],
        list: [],
        noMore: !1,
        isTopHidden: !0,
        sortList: []
    },
    onLoad: function(t) {
        o = 1, i = t.store_id, a = "", e = !1, r = !1, s = "", this.getGoods(), wx.canIUse && wx.canIUse("showShareMenu") && wx.showShareMenu({
            withShareTicket: !0
        });
    },
    onShow: function() {
        c.sendPageData("page_temai_shop", i, "进入店铺页");
    },
    setStoreInfo: function(t) {
        var e = t;
        a = e.title, wx.setNavigationBarTitle({
            title: a
        }), this.setData({
            title: e.title,
            logo: e.logo,
            bg: e.bg_img,
            icon: e.icon
        });
    },
    getGoods: function(a) {
        var n = this, c = this, p = t.getPublicArg(), d = {
            app_name: p.jpAppName,
            app_version: p.jpAppVersion,
            msort: s,
            page: o,
            platform: p.jpPlatform,
            seller_uid: i,
            source_type: "",
            xunsou: 50
        };
        wx.request({
            url: t.globalData.URL_MAPI + "goods/store/goods",
            data: d,
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                var e = t.data, i = void 0 === e ? {} : e;
                if (1e3 == i.code) {
                    var s = i.data.goods, p = a ? s : n.data.list.concat(s);
                    if (n.setData({
                        list: p
                    }), !r) {
                        r = !0, n.setStoreInfo(i.data.store), n.setData({
                            sortList: i.data.msort
                        });
                        var d = s[0].goods_id;
                        n.getCoupon("专享券", d, function(t) {
                            c.setData({
                                couponInfo: t.info
                            }), c = null;
                        }), n.getActInfo(d);
                    }
                    "0" == i.data.has_more_page ? (o++, p.length < 6 && n.getGoods()) : (o = !1, n.setData({
                        noMore: !0
                    }));
                }
            },
            complete: function() {
                e = !1;
            }
        });
    },
    dealSortTap: function(t) {
        if (e) return !1;
        var a = t.currentTarget.dataset, i = a.type, r = a.first, n = a.sec, p = {
            curSort: a.index
        };
        switch (i) {
          case "1":
            1 == this.data.isPriceUp ? (s = n, p.isPriceUp = 2, a.activityparam = 1) : (s = r, 
            p.isPriceUp = 1, a.activityparam = 0);
            break;

          case "2":
            p.isPriceUp = 0, s = r;
            break;

          default:
            p.isPriceUp = 0, s = "";
        }
        o = 1, e = !0, this.getGoods(!0), p.noMore = !1, this.setData(p), c.sendEventData(a);
    },
    scrollGetGoods: function(t) {
        o && !e && (e = !0, this.getGoods());
    },
    onShareAppMessage: function() {
        var e = this.data, o = e.title, a = "pages/store/store?store_id=" + i, s = e.list[0].pic_url, r = {
            "分享场景": "店铺页",
            "分享id": i
        };
        return t.setShare(o, a, null, s, r);
    }
}, p, d, u, f, l, g, c.pageEvents));