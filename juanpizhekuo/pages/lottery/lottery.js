var t, a, e, o = getApp(), i = require("../../utils/util"), s = require("../../utils/statistics"), d = require("../../components/error-msg/error-msg"), n = require("../../components/backtop/backtop");

Page(i.mergePage({
    data: {
        query: null,
        page: 1,
        isShowMore: !1,
        isTopHidden: !0,
        recGoods: [],
        noMore: !1
    },
    onLoad: function(s) {
        if (o.checkLogin()) {
            this.data.query = s, this.getData();
            var d = this;
            t = !1, e = 1, i.getZyId(function(t) {
                a = "p16_" + t, d.getRecGoods(), d = null;
            });
        }
    },
    getData: function() {
        var t = this;
        wx.request({
            url: o.globalData.URL_TUAN + "xcxptprize/index",
            header: {
                "Content-Type": "application/json"
            },
            data: {
                uid: wx.getStorageSync("uid"),
                goods_id: this.data.query.goods_id
            },
            method: "POST",
            complete: function(a) {
                var e = a.data, o = !0;
                e.data.user_list.length < 10 && (o = !1), t.setData({
                    info: e.data,
                    isShowMore: o,
                    goods_id: t.data.query.goods_id
                });
            }
        });
    },
    getMoreTap: function() {
        var t = this, a = ++this.data.page;
        wx.request({
            url: o.globalData.URL_TUAN + "xcxptprize/prizelist",
            header: {
                "Content-Type": "application/json"
            },
            data: {
                goods_id: this.data.query.goods_id,
                p: a
            },
            method: "POST",
            complete: function(a) {
                var e = a.data, o = !0;
                e.data ? (t.data.info.user_list = t.data.info.user_list.concat(e.data), e.data.length < 10 && (o = !1)) : o = !1, 
                t.setData({
                    info: t.data.info,
                    isShowMore: o
                });
            }
        });
    },
    getRecGoods: function() {
        var i = this;
        wx.request({
            url: o.globalData.URL_TUAN + "pintuan/get_goods_list",
            data: {
                cid: "pinhaohuo_sx",
                show_type: "wap",
                zhouyi_ids: a,
                page: e,
                app_version: o.globalData.APP_VERSION,
                pageSize: 10
            },
            method: "GET",
            header: {
                "Content-Type": "application/json"
            },
            success: function(a) {
                var o = a.data, s = void 0 === o ? {} : o;
                if (t = !1, 1e3 == s.code) {
                    var d = s.data.goods, n = {
                        recGoods: i.data.recGoods.concat(d)
                    };
                    1 == s.data.has_next_page ? e++ : (e = !1, n.noMore = !0), i.setData(n);
                } else e = !1, i.setData({
                    noMore: !0
                });
            }
        });
    },
    scrollGetGoods: function(a) {
        e && !t && (t = !0, this.getRecGoods());
    }
}, d, s.pageEvents, n));