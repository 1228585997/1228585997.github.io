var t = getApp(), a = require("../../utils/util.js"), e = require("../../utils/statistics"), i = require("../../components/error-msg/error-msg"), r = require("../../components/sku/sku"), s = require("../../components/minicart/minicart"), d = require("../../components/goods/quick-sort/quick-sort");

Page(a.mergePage({
    data: {
        page: 1,
        goods: [],
        goodsid: "",
        price_start: "",
        price_end: "",
        cat_threeid: [],
        filterGroup: [],
        hideFilterBox: !0,
        quickSortCatesWrapperOpen: !1,
        activeCateIndex: 1,
        activeCateText: "全部分类",
        cates: []
    },
    joinCartTap: function(t) {
        var a = this, e = t.currentTarget.dataset.goodsid;
        1 != t.currentTarget.dataset.over && (a.setData({
            cprice: t.currentTarget.dataset.reprice
        }), this.initSku(e, null, function() {
            a.openSku(t);
        }));
    },
    sortTap: function(t) {
        var a = t.currentTarget.dataset.sort, i = t.currentTarget.dataset.active, r = t.currentTarget.dataset.msort;
        if ("sales" == a) {
            if (1 == i) return;
            this.setData({
                order: "sales",
                sort: "",
                more: "0",
                page: 1,
                goods: []
            });
        } else "cprice" == a && this.setData({
            order: "cprice",
            sort: "asc" == this.data.sort ? "desc" : "asc",
            more: "0",
            page: 1,
            goods: []
        });
        this.getGood({
            msort: r
        }), e.sendEventData(t.currentTarget.dataset);
    },
    addCartCallback: function() {
        this.getFactivity();
    },
    getFactivity: function() {
        var e = a.getCache("sel_good") || "[]";
        if (this.data.goodsid) {
            var i = this, r = Object.assign(t.getPublicArg(), {
                actid: i.data.query.factivity_id,
                goods_info: e
            });
            r.apisign = t.createApisign(r), wx.request({
                url: t.globalData.URL_MTRADE + "coupon/activityInfo",
                data: r,
                method: "POST",
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    var a = t.data;
                    1e3 == a.code && i.setData({
                        actinfo: a.data.coupon_info,
                        mzinfo: a.data.mzinfo
                    });
                }
            });
        }
    },
    getGood: function(a) {
        var e = this, a = a || {};
        if (("1" != this.data.more || "filter" === a.type) && !this.isajaxing) {
            this.isajaxing = !0;
            var i, r = this, s = Object.assign({
                page: r.data.page,
                actid: r.data.query.factivity_id,
                filter_id: "",
                cat_threeid: "",
                keyword: "",
                attr_id: "",
                platform: t.globalData.PLATFORM,
                app_version: t.globalData.APP_VERSION,
                msort: ""
            }, a);
            void 0 == a.price_start && void 0 == a.price_end ? i = s : (i = "" == a.price_end && "" != a.price_start ? Object.assign(s, {
                price_range: "" + a.price_start
            }, a) : Object.assign(s, {
                price_range: ("" == a.price_start ? 0 : a.price_start) + "," + a.price_end
            }, a), "" == a.price_end && "" == a.price_start && (i = Object.assign({
                page: r.data.page,
                actid: r.data.query.factivity_id,
                filter_id: "",
                cat_threeid: "",
                keyword: "",
                attr_id: "",
                platform: t.globalData.PLATFORM,
                app_version: t.globalData.APP_VERSION,
                msort: ""
            }, a))), wx.request({
                url: t.globalData.URL_MAPI + "addongoods/coudan/list",
                data: i,
                method: "GET",
                header: {
                    "Content-Type": "application/json"
                },
                success: function(t) {
                    console.log(t.data), r.isajaxing = !1;
                    var i = t.data;
                    r.data.goodsid ? "filter" === a.type ? i.data.goods ? r.setData({
                        goods: i.data.goods,
                        page: 2,
                        more: i.data.has_more_page
                    }) : r.setData({
                        goods: [],
                        page: 2,
                        more: "1"
                    }) : r.setData({
                        goods: r.data.goods.concat(i.data.goods),
                        page: ++r.data.page,
                        more: i.data.has_more_page
                    }) : i.data.goods ? (e.data.filterGroup = i.data.aggs && i.data.aggs.goods_type, 
                    r.setData({
                        goods: r.data.goods.concat(i.data.goods),
                        page: ++r.data.page,
                        more: i.data.has_more_page,
                        goodsid: i.data.goods[0].goods_id,
                        goodsTabs: i.data.msort,
                        cat_threeid: i.data.aggs && i.data.aggs.cat_threeid,
                        cates: i.data.aggs && i.data.aggs.tcat,
                        filterGroup: e.data.filterGroup
                    }), r.getFactivity()) : r.setData({
                        goods: [],
                        page: 2,
                        more: "1"
                    });
                }
            });
        }
    },
    onShow: function() {
        e.sendPageData("page_activity_factivity", this.data.query.factivity_id, "进入活动凑单页");
    },
    onLoad: function(t) {
        this.QuickSort = new d(this);
        var a = this;
        this.setData({
            query: t
        }), this.getGood(), wx.getSystemInfo({
            success: function(t) {
                a.setData({
                    wh: t.windowHeight
                });
            }
        }), e.sendZhugePageData("进入活动凑单页", {});
    },
    triggerFilter: function() {
        this.setData({
            hideFilterBox: !this.data.hideFilterBox
        });
    },
    closeFilter: function() {
        this.setData({
            hideFilterBox: !0
        });
    },
    priceStartBlur: function(t) {
        this.setData({
            price_start: t.detail.value
        }), e.sendEventData({
            activity: "click_screen_lowestprice",
            activityparam: ""
        });
    },
    priceEndBlur: function(t) {
        this.setData({
            price_end: t.detail.value
        }), e.sendEventData({
            activity: "click_screen_highestprice",
            activityparam: ""
        });
    },
    filterOkTap: function(t) {
        var a = [];
        if (this.data.cat_threeid) for (s = 0; s < this.data.cat_threeid.length; s++) i = this.data.cat_threeid[s].id, 
        this.data.cat_threeid[s].issel && -1 === a.indexOf(i) && (this.data.activeCateText = this.data.cat_threeid[s].name, 
        a.push(i));
        if (this.data.cates.length > 0) for (var i, r = this.data.cates[this.data.activeCateIndex], s = 0; s < r.sub_cat.length; s++) i = r.sub_cat[s].id, 
        r.sub_cat[s].issel && -1 === a.indexOf(i) && (this.data.activeCateText = r.sub_cat[s].name, 
        a.push(i));
        var d, c = [];
        if (this.data.filterGroup) for (s = 0; s < this.data.filterGroup.length; s++) d = this.data.filterGroup[s].id, 
        "1" == this.data.filterGroup[s].clicked && -1 === c.indexOf(d) && c.push(d);
        if (this.data.quickSortFilter) for (s = 0; s < this.data.quickSortFilter.length; s++) d = this.data.quickSortFilter[s].filter_id, 
        "1" == this.data.quickSortFilter[s].clicked && -1 === c.indexOf(d) && c.push(d);
        this.getGood({
            price_start: this.data.price_start,
            price_end: this.data.price_end,
            cat_threeid: a.join(","),
            filter_id: c.join(","),
            page: 1,
            type: "filter"
        });
        var o = !this.data.price_start && !this.data.price_end && 0 === a.length && 0 === c.length;
        0 === a.length && this.setData({
            activeCateIndex: 1,
            quickSortCatesWrapperOpen: !1,
            activeCateText: "全部分类"
        }), this.setData({
            hideFilterBox: !0,
            filterIconActive: !o,
            activeCateText: this.data.activeCateText
        }), t && "quick" === t.type || e.sendEventData({
            activity: "click_screen_sure",
            activityparam: ""
        });
    },
    filterResetTap: function(t) {
        if (this.data.cat_threeid) for (a = 0; a < this.data.cat_threeid.length; a++) this.data.cat_threeid[a].issel = !1;
        if (this.data.cates.length > 0) for (a = 0; a < this.data.cates[this.data.activeCateIndex].sub_cat.length; a++) this.data.cates[this.data.activeCateIndex].sub_cat[a].issel = !1;
        if (this.data.filterGroup) for (a = 0; a < this.data.filterGroup.length; a++) this.data.filterGroup[a].clicked = "0";
        if (this.data.quickSortFilter) for (var a = 0; a < this.data.quickSortFilter.length; a++) this.data.quickSortFilter[a].clicked = "0";
        this.setData({
            price_start: "",
            price_end: "",
            cat_threeid: this.data.cat_threeid,
            filterGroup: this.data.filterGroup,
            cates: this.data.cates,
            quickSortFilter: this.data.quickSortFilter
        }), e.sendEventData({
            activity: "click_screen_reset",
            activityparam: ""
        });
    },
    filterItemTap: function(t) {
        var a = t.currentTarget.dataset.ctid, i = t.currentTarget.dataset.type;
        if (this.data.cat_threeid) for (r = 0; r < this.data.cat_threeid.length; r++) this.data.cat_threeid[r].id == a ? this.data.cat_threeid[r].issel = !this.data.cat_threeid[r].issel : this.data.cat_threeid[r].issel = !1;
        if (this.data.cates) for (var r = 0; r < this.data.cates.length; r++) for (var s = 0; s < this.data.cates[r].sub_cat.length; s++) this.data.cates[r].sub_cat[s].id == a ? (this.data.activeCateIndex = r, 
        this.data.cates[r].sub_cat[s].issel = !this.data.cates[r].sub_cat[s].issel) : this.data.cates[r].sub_cat[s].issel = !1;
        this.setData({
            cat_threeid: this.data.cat_threeid,
            cates: this.data.cates,
            activeCateIndex: this.data.activeCateIndex
        }), "quick" === i && (this.filterOkTap({
            type: i
        }), this.quickSortCatesTap({
            type: "close"
        })), e.sendEventData({
            activity: "quick" === i ? "click_category_sort_cate" : "click_screen_item",
            activityparam: a
        });
    },
    filterItemTap2: function(t) {
        var a = this, i = t.currentTarget.dataset.filterid;
        if (this.data.filterGroup) for (r = 0; r < this.data.filterGroup.length; r++) this.data.filterGroup[r].id == i && ("1" != this.data.filterGroup[r].clicked ? this.data.filterGroup[r].clicked = "1" : this.data.filterGroup[r].clicked = "0");
        if (this.data.quickSortFilter) for (var r = 0; r < this.data.quickSortFilter.length; r++) this.data.quickSortFilter[r].filter_id == i && ("1" !== this.data.quickSortFilter[r].clicked ? this.data.quickSortFilter[r].clicked = "1" : this.data.quickSortFilter[r].clicked = "0");
        this.setData({
            filterGroup: this.data.filterGroup,
            quickSortFilter: this.data.quickSortFilter
        }, function() {
            "quick" === t.currentTarget.dataset.type && (a.filterOkTap({
                type: "quick"
            }), e.sendEventData({
                activity: t.currentTarget.dataset.activity,
                activityparam: t.currentTarget.dataset.activityparam
            }));
        });
    }
}, i, r, s, e.pageEvents));