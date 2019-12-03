function t(t, a) {
    if (!(t instanceof a)) throw new TypeError("Cannot call a class as a function");
}

var a = function() {
    function t(t, a) {
        for (var e = 0; e < a.length; e++) {
            var i = a[e];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(a, e, i) {
        return e && t(a.prototype, e), i && t(a, i), a;
    };
}(), e = require("../../../components/goods/sort-tabs/sort-tabs"), i = require("../search.service").getCateGoods, s = (require("../../../components/backtop/backtop"), 
require("../../../utils/util")), r = require("../../../utils/statistics"), d = require("../../../components/minicart/minicart"), c = require("../../../components/share/share"), n = getApp();

Page(s.mergePage({
    data: {
        goodsTabs: [],
        goodsList: [],
        subCate: [],
        params: {},
        subcateindex: 0,
        isajaxing: !1,
        noMore: !1,
        activeCateIndex: 1,
        activeCateText: "全部分类",
        quickSortFilter: [],
        cates: [],
        banner: ""
    },
    bindTopTap: function(t) {
        this.setData({
            scrollTop: 0
        });
    },
    onShow: function() {
        r.sendPageData("page_tab", this.data.params.cid, "进入类目页");
    },
    onLoad: function(t) {
        this.SearchResult = new o(this);
        var a = t.cid || 0, e = t.front_cid, i = t.brand_id, s = t.app_version, d = t.hide_cate, c = t.tab_item, h = t.source, l = t.scene_key || "";
        this.data.params = Object.assign(this.data.params, {
            cid: a,
            front_cid: e || "",
            page: 1,
            uid: wx.getStorageSync("uid"),
            msort: 0,
            platform: n.globalData.PLATFORM,
            source: h || "",
            tab_item: c || "",
            brand_id: i || "",
            hide_cate: d || "",
            app_version: s || "",
            scene_key: l
        }), this.getMiniCart(), this.loadInitialData(), wx.setNavigationBarTitle({
            title: t.cname
        }), this.setData({
            isVip: wx.getStorageSync("vipStatus") > 0
        }), r.sendZhugePageData("进入类目页", {
            "类目id": a,
            "类目名称": t.cname
        });
    },
    subCateTap: function(t) {
        var a = this, e = t.target.dataset;
        this.data.subCate[this.data.subcateindex].seldefault = "0", this.data.subCate[e.index].seldefault = "1", 
        this.data.params.cid = e.subcid, this.data.params.page = 1, i(this.data.params).then(function(t) {
            a.setData({
                goodsList: t.data.goods || [],
                subCate: a.data.subCate,
                subcateindex: e.index,
                noMore: "0" != t.data.has_more_page
            });
        }), r.sendEventData({
            activity: "click_category_sub",
            activityparam: e.subcid
        });
    },
    scrollGetGoods: function(t) {
        var a = this;
        this.data.isajaxing || this.data.noMore || (this.data.params.page = ++this.data.params.page, 
        this.setData({
            isajaxing: !0
        }), i(this.data.params).then(function(t) {
            a.setData({
                goodsList: a.data.goodsList.concat(t.data.goods || []),
                subCate: a.data.subCate,
                noMore: "0" != t.data.has_more_page,
                isajaxing: !1
            });
        }));
    },
    openFilter: function() {
        this.setData({
            ifHideFilter: 1
        });
    },
    priceStartBlur: function(t) {
        this.setData({
            price_start: t.detail.value
        }), r.sendEventData({
            activity: "click_screen_lowestprice",
            activityparam: ""
        });
    },
    priceEndBlur: function(t) {
        this.setData({
            price_end: t.detail.value
        }), r.sendEventData({
            activity: "click_screen_highestprice",
            activityparam: ""
        });
    },
    filterOkTap: function(t) {
        var a, e = [];
        if (this.data.cat_threeid) for (c = 0; c < this.data.cat_threeid.length; c++) a = this.data.cat_threeid[c].id, 
        this.data.cat_threeid[c].issel && -1 === e.indexOf(a) && (this.data.activeCateText = this.data.cat_threeid[c].name, 
        e.push(a));
        if (this.data.cates && this.data.cates.length) {
            var i = this.data.cates[this.data.activeCateIndex];
            if (i) for (c = 0; c < i.sub_cat.length; c++) a = i.sub_cat[c].id, i.sub_cat[c].issel && -1 === e.indexOf(a) && (this.data.activeCateText = i.sub_cat[c].name, 
            e.push(a));
        }
        var s = [];
        if (this.data.filterGroup) for (c = 0; c < this.data.filterGroup.length; c++) d = this.data.filterGroup[c].id, 
        "1" == this.data.filterGroup[c].clicked && -1 === s.indexOf(d) && s.push(d);
        if (this.data.quickSortFilter) for (var d, c = 0; c < this.data.quickSortFilter.length; c++) d = this.data.quickSortFilter[c].filter_id, 
        "1" == this.data.quickSortFilter[c].clicked && -1 === s.indexOf(d) && s.push(d);
        var n = "";
        this.data.price_start && this.data.price_end ? n = this.data.price_start + "," + this.data.price_end : this.data.price_start && !this.data.price_end ? n = this.data.price_start : this.data.price_end && !this.data.price_start && (n = "0," + this.data.price_end), 
        this.SearchResult.getCateGoods({
            price_range: n,
            cat_threeids: e.join(","),
            filter_id: s.join(","),
            page: 1
        }, "filter");
        var o = !this.data.price_start && !this.data.price_end && 0 === e.length && 0 === s.length;
        0 === e.length && this.setData({
            activeCateIndex: 1,
            quickSortCatesWrapperOpen: !1,
            activeCateText: "全部分类"
        }), this.setData({
            ifHideFilter: 0,
            "goodsTabs[3].selected": !o,
            activeCateText: this.data.activeCateText
        }), t && "quick" === t.type || r.sendEventData({
            activity: "click_screen_sure",
            activityparam: ""
        });
    },
    filterResetTap: function(t) {
        if (this.data.cat_threeid) for (a = 0; a < this.data.cat_threeid.length; a++) this.data.cat_threeid[a].issel = !1;
        if (this.data.cates && this.data.cates.length) for (a = 0; a < this.data.cates[this.data.activeCateIndex].sub_cat.length; a++) this.data.cates[this.data.activeCateIndex].sub_cat[a].issel = !1;
        if (this.data.filterGroup) for (a = 0; a < this.data.filterGroup.length; a++) this.data.filterGroup[a].clicked = "0";
        if (this.data.quickSortFilter) for (var a = 0; a < this.data.quickSortFilter.length; a++) this.data.quickSortFilter[a].clicked = "0";
        this.setData({
            price_start: "",
            price_end: "",
            cat_threeid: this.data.cat_threeid,
            filterGroup: this.data.filterGroup,
            cates: this.data.cates,
            quickSortFilter: this.data.quickSortFilter
        }), r.sendEventData({
            activity: "click_screen_reset",
            activityparam: ""
        });
    },
    filterItemTap: function(t) {
        var a = t.currentTarget.dataset.ctid, e = t.currentTarget.dataset.type;
        if (this.data.cat_threeid) for (i = 0; i < this.data.cat_threeid.length; i++) this.data.cat_threeid[i].id == a ? this.data.cat_threeid[i].issel = !this.data.cat_threeid[i].issel : this.data.cat_threeid[i].issel = !1;
        if (this.data.cates) for (var i = 0; i < this.data.cates.length; i++) for (var s = 0; s < this.data.cates[i].sub_cat.length; s++) this.data.cates[i].sub_cat[s].id == a ? (this.data.activeCateIndex = i, 
        this.data.cates[i].sub_cat[s].issel = !this.data.cates[i].sub_cat[s].issel) : this.data.cates[i].sub_cat[s].issel = !1;
        this.setData({
            cat_threeid: this.data.cat_threeid,
            cates: this.data.cates,
            activeCateIndex: this.data.activeCateIndex
        }), "quick" === e && (this.filterOkTap({
            type: e
        }), this.quickSortCatesTap({
            type: "close"
        })), r.sendEventData({
            activity: "quick" === e ? "click_category_sort_cate" : "click_screen_item",
            activityparam: a
        });
    },
    filterItemTap2: function(t) {
        var a = this, e = t.currentTarget.dataset.filterid;
        if (this.data.filterGroup) for (i = 0; i < this.data.filterGroup.length; i++) this.data.filterGroup[i].id == e && ("0" == this.data.filterGroup[i].clicked ? this.data.filterGroup[i].clicked = "1" : "1" == this.data.filterGroup[i].clicked && (this.data.filterGroup[i].clicked = "0"));
        if (this.data.quickSortFilter) for (var i = 0; i < this.data.quickSortFilter.length; i++) this.data.quickSortFilter[i].filter_id == e && ("1" !== this.data.quickSortFilter[i].clicked ? this.data.quickSortFilter[i].clicked = "1" : this.data.quickSortFilter[i].clicked = "0");
        this.setData({
            filterGroup: this.data.filterGroup,
            quickSortFilter: this.data.quickSortFilter
        }, function() {
            "quick" === t.currentTarget.dataset.type && (a.filterOkTap({
                type: "quick"
            }), r.sendEventData({
                activity: t.currentTarget.dataset.activity,
                activityparam: t.currentTarget.dataset.activityparam
            }));
        });
    },
    closeFilter: function(t) {
        this.setData({
            ifHideFilter: 0
        });
    },
    resetConditions: function() {
        this.setData({
            price_start: "",
            price_end: "",
            cat_threeid: [],
            filterGroup: [],
            quickSortCatesWrapperOpen: !1,
            activeCateIndex: 1,
            activeCateText: "全部分类",
            quickSortFilter: [],
            cates: [],
            "goodsTabs[3].selected": !1
        });
    },
    loadInitialData: function() {
        this.setData({
            isajaxing: !0,
            params: this.data.params
        }), this.SearchResult.getCateGoods(this.data.params, "key");
    },
    onShareAppMessage: function(t) {
        var a = "pages/index/index";
        if ("button" == t.from && c.buttonShare) {
            t.target.dataset.path = a = "pages/index/index?goto=" + encodeURIComponent("/" + t.target.dataset.path);
            var e = c.buttonShare(t.target.dataset);
            return this.setData({
                showShareModal: !1
            }), e;
        }
        return n.setShare("推荐一家有品质的折扣店《卷皮折扣》", a);
    }
}, r.pageEvents, d, c));

var o = function() {
    function s(a) {
        var i = this;
        t(this, s);
        var d = this;
        d.page = a, this.SortTabs = new e(a, {
            data: [ {
                selected: !0,
                text: "推荐",
                value: "recommendation",
                sortIndex: 0
            }, {
                text: "价格",
                value: "price",
                orderType: "asc",
                sortIndex: [ 8, 16 ]
            }, {
                text: "销量",
                value: "sales",
                sortIndex: 2
            }, {
                text: "筛选",
                value: "filter"
            } ],
            fallback: function(t) {
                "filter" == t.value ? (i.page.setData({
                    ifHideFilter: 1
                }), r.sendEventData({
                    activity: "click_category_sort_screen",
                    activityparam: ""
                })) : (d.getCateGoods(Object.assign(d.page.data.params, {
                    msort: t.sort,
                    page: 1
                })), "recommendation" == t.value ? r.sendEventData({
                    activity: "click_category_sort_multiple",
                    activityparam: ""
                }) : "price" == t.value ? r.sendEventData({
                    activity: "click_category_sort_price",
                    activityparam: "asc" == t.orderType ? 1 : 0
                }) : "sales" == t.value ? r.sendEventData({
                    activity: "click_category_sort_sales",
                    activityparam: ""
                }) : "start_time" == t.value && r.sendEventData({
                    activity: "click_category_sort_new",
                    activityparam: ""
                }));
            }
        });
    }
    return a(s, [ {
        key: "getCateGoods",
        value: function(t, a) {
            var e = this;
            this.page.setData({
                isajaxing: !0
            }), "key" == a ? (this.params = t, wx.showLoading && wx.showLoading({
                title: "加载中"
            }), i(this.params).then(function(t) {
                if (t.data.banner && e.page.setData({
                    banner: t.data.banner
                }), wx.hideLoading && wx.hideLoading(), t.data.cat_threeid) for (var a = 0; a < t.data.cat_threeid.length; a++) t.data.cat_threeid[a].issel = !1;
                if (t.data.tbar && t.data.tbar.length) for (var i = 0; i < t.data.tbar.length; i++) t.data.tbar[i].clicked = "0";
                if (t.data.goods_type && t.data.goods_type.length) for (var s = 0; s < t.data.goods_type.length; s++) t.data.goods_type[s].clicked = "0"; else t.data.goods_type = [ {
                    id: "1",
                    name: "卷皮直发",
                    clicked: "0"
                }, {
                    id: "2",
                    name: "卷皮优选",
                    clicked: "0"
                } ];
                e.page.setData({
                    goodsList: t.data.goods || [],
                    noMore: "1" == t.data.has_more_page,
                    isajaxing: !1,
                    cat_threeid: t.data.cat_threeid,
                    filterGroup: t.data.goods_type,
                    price_start: "",
                    price_end: "",
                    quickSortFilter: t.data.tbar || [],
                    cates: t.data.tcat || []
                });
            })) : (this.params = Object.assign({}, this.params, t), wx.showLoading && wx.showLoading({
                title: "加载中"
            }), i(this.params).then(function(t) {
                wx.hideLoading && wx.hideLoading(), e.page.setData({
                    goodsList: t.data.goods || [],
                    noMore: "1" == t.data.has_more_page,
                    isajaxing: !1
                });
            }));
        }
    } ]), s;
}();