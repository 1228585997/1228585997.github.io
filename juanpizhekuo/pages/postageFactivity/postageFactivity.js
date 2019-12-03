var t = getApp(), a = require("../../utils/util.js"), e = require("../../utils/statistics"), i = require("../../components/error-msg/error-msg"), s = require("../../components/sku/sku"), o = require("../../components/minicart/minicart");

Page(a.mergePage({
    data: {
        filter_id: "",
        page: 1,
        more: 1,
        goods: [],
        isajaxing: !1
    },
    joinCartTap: function(t) {
        var a = this, e = t.currentTarget.dataset.goodsid;
        1 != t.currentTarget.dataset.over && (a.setData({
            cprice: t.currentTarget.dataset.cprice
        }), this.initSku(e, function() {
            a.openSku(t);
        }));
    },
    addCartCallback: function() {
        this.getShopFactivity();
    },
    filterTap: function(t) {
        var a = t.currentTarget.dataset.filterid;
        this.setData({
            filter_id: a,
            goods: [],
            page: 1,
            more: 1,
            isajaxing: !1
        }), this.getGood(), e.sendEventData(t.currentTarget.dataset);
    },
    getGood: function() {
        if (0 != this.data.more && !this.data.isajaxing) {
            this.setData({
                isajaxing: !0
            });
            var e = this;
            a.getZyId(function(a) {
                a = "p8_c3_l4_51_18_5_128", wx.request({
                    url: t.globalData.URL_SHOP_JP + "gsort",
                    data: {
                        filter_id: e.data.filter_id,
                        page: e.data.page,
                        zhouyi_ids: a,
                        key: '{"cdt":{"sale_mode":1,"source_type":1},"order":{"cprice":"asc","is_soldout":"asc","sales":"desc"}}',
                        type: "50",
                        machining: "danpin",
                        rembaoyou: 1,
                        dtype: "JSON",
                        rows: 20
                    },
                    method: "GET",
                    header: {
                        "Content-Type": "application/json"
                    },
                    success: function(t) {
                        var a = t.data;
                        e.setData({
                            goods: e.data.goods.concat(a.list),
                            page: ++e.data.page,
                            more: a.more,
                            isajaxing: !1
                        });
                    }
                });
            });
        }
    },
    getShopFactivity: function() {
        var a = this;
        wx.request({
            url: t.globalData.URL_M + "shop/postfactivity",
            data: {
                goods_info: this.data.query.goods_info,
                is_ajax: 1,
                xcx_uid: wx.getStorageSync("uid"),
                xcx_sign: wx.getStorageSync("xcx_sign")
            },
            method: "GET",
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                var e = t.data, i = 0;
                i = e.data.shopInfo && e.data.shopInfo[0].balance, a.setData({
                    balance: i
                });
            }
        });
    },
    onShow: function() {
        e.sendPageData("page_temai_factivity", "", "进入包邮凑单页");
    },
    onLoad: function(t) {
        var a = this;
        this.getGood(), this.setData({
            query: t
        }), this.getShopFactivity(), wx.getSystemInfo({
            success: function(t) {
                a.setData({
                    wh: t.windowHeight
                });
            }
        }), e.sendZhugePageData("进入包邮凑单页", {});
    }
}, i, s, o, e.pageEvents));