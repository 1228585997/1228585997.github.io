var t = getApp(), e = void 0, a = void 0, i = void 0, o = void 0, s = void 0, n = void 0, g = void 0, r = require("../../utils/util"), d = require("../../utils/statistics"), c = require("../../components/backtop/backtop");

Page(r.mergePage({
    data: {
        curTag: 0,
        ifNotBigMode: !0,
        list: [],
        noMore: !1,
        isTopHidden: !0,
        scrollTop: 0
    },
    onLoad: function(t) {
        o = 1, s = t.goods_id, i = !1, n = !0, e = !!t.tag && t.tag, a = !!t.index && t.index, 
        g = 0, this.setData({
            goods_id: s
        }), this.getComment();
    },
    onShow: function() {
        d.sendPageData("page_evaluate_all", s, "进入全部评价页");
    },
    getComment: function(g) {
        var r = this, c = Object.assign({
            show_list: 1,
            goods_id: s,
            page: o,
            app_version: t.globalData.APP_VERSION
        }, t.getPublicArg());
        !1 !== e && (c.tag = e), !1 !== a && (c.bubble_index = a), c.apisign = t.createApisign(c), 
        wx.request({
            url: t.globalData.URL_DETAIL + "ptgoods/valuation",
            data: c,
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                var e = t.data, a = void 0 === e ? {} : e;
                if (1e3 == a.code) {
                    var i = a.data, s = i.valuation_list;
                    if (s && s.length) {
                        var c = g ? s : r.data.list.concat(s);
                        r.setData({
                            list: c
                        });
                    }
                    1 == i.request_next_page ? o++ : (o = !1, r.setData({
                        noMore: !0
                    })), n && (n = !1, r.setData({
                        goods: i.goods_info,
                        tags: i.tag_list
                    }), d.sendZhugePageData("进入全部评价页", i.zg_json));
                } else 2002 == a.code && (o = !1, r.setData({
                    noMore: !0
                }));
            },
            complete: function() {
                i = !1;
            }
        });
    },
    dealTagTap: function(t) {
        if (i) return !1;
        var a = t.currentTarget.dataset, s = a.index;
        e = a.tag, o = 1, i = !0, this.getComment(!0), this.setData({
            curTag: s,
            noMore: !1
        });
    },
    scrollGetComment: function(t) {
        o && !i && (i = !0, this.getComment());
    },
    setScrollTop: function(t) {
        g = t.detail.scrollTop;
    },
    checkBigMode: function(t) {
        var e = t.currentTarget.dataset, a = e.idx, i = e.cur, o = this.data.list[a], s = o.images;
        this.setData({
            ifNotBigMode: !1,
            curPic: i,
            curComment: o,
            bigPics: s
        }), d.sendEventData(e);
    },
    closeBigMode: function() {
        this.setData({
            ifNotBigMode: !0,
            scrollTop: g
        });
    },
    bindSwiperChange: function(t) {
        var e = t.detail.current;
        this.setData({
            curPic: e
        });
    }
}, c, d.pageEvents));