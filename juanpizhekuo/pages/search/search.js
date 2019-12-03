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
}(), e = void 0, i = require("../../components/goods/sort-tabs/sort-tabs"), s = require("../../components/goods/quick-sort/quick-sort"), r = require("../../utils/debounce"), c = (require("../../utils/throttle"), 
require("./search.service")), n = c.getSearchKeywords, o = c.getSearchSuggest, h = c.getSearchGoods, d = require("../../utils/util"), l = require("../../utils/statistics"), u = require("../../components/minicart/minicart"), g = require("../../components/blockAds/index"), p = require("../../components/share/share");

Page(d.mergePage({
    data: {
        visiblePanel: "tags",
        hiddenSearchClose: !0,
        searchPlaceholder: null,
        inputValue: "",
        hotTagsData: [],
        hotTagsUrl: "",
        historyTagsData: [],
        suggestData: [],
        goodsTabs: [],
        goodsList: [],
        isajaxing: !1,
        noMore: !1,
        price_start: "",
        price_end: "",
        cat_threeid: [],
        filterGroup: [],
        quickSortCatesWrapperOpen: !1,
        activeCateIndex: 1,
        activeCateText: "全部分类",
        quickSortFilter: [],
        cates: []
    },
    onShow: function() {
        l.sendPageData("page_search", "", "进入搜索页");
    },
    onShareAppMessage: function(t) {
        var a = "pages/index/index";
        if ("button" == t.from && p.buttonShare) {
            t.target.dataset.path = a = "pages/index/index?goto=" + encodeURIComponent("/" + t.target.dataset.path);
            var e = p.buttonShare(t.target.dataset);
            return this.setData({
                showShareModal: !1
            }), e;
        }
        return app.setShare("推荐一家有品质的折扣店《卷皮折扣》", a);
    },
    onLoad: function(t) {
        var a = this;
        this.SearchInput = new f(this), this.SearchHistory = new v(), this.SearchResult = new _(this), 
        this.QuickSort = new s(this), this.loadInitialData(), t.item && this.setKeyResult({
            item: t.item,
            keyword: "",
            page: 1
        }), wx.getSystemInfo({
            success: function(t) {
                var e = t.windowHeight;
                a.setData({
                    goodsheight: e - 41
                });
            }
        }), d.getZyId(function(t) {
            e = "p16_" + t, a.getAds(e, "souciyexcx", 0);
        }), l.sendZhugePageData("进入搜索页", {}), this.getMiniCart(), this.setData({
            isVip: wx.getStorageSync("vipStatus") > 0
        });
    },
    loadInitialData: function() {
        var t = this, a = {
            platform: getApp().globalData.PLATFORM,
            user_group: wx.getStorageSync("jpUserGroup"),
            zy_ids: wx.getStorageSync("jpZyids")
        };
        n(a).then(function(a) {
            if ("1000" === a.code) {
                var e = a.data.def_jump_url || "";
                t.setData({
                    hotTagsData: a.data.hot_keywords,
                    searchPlaceholder: a.data.def_keywords,
                    hotTagsUrl: e
                });
            }
        }), this.updateHistoryTagView();
    },
    updateHistoryTagView: function() {
        var t = this;
        this.SearchHistory.getAll().then(function(a) {
            t.setData({
                historyTagsData: a
            });
        }, function(a) {
            return t.setData({
                historyTagsData: a
            });
        });
    },
    handleSearchInput: function(t) {
        this.SearchInput.debounceHandleInput(t);
    },
    handleSearchConfirm: function(t) {
        !t.detail.value && this.data.hotTagsUrl ? (this.SearchHistory.set({
            is_red: 0,
            text: this.data.searchPlaceholder,
            jump_url: this.data.hotTagsUrl
        }), this.skipUrl(this.data.hotTagsUrl)) : (this.SearchHistory.set({
            is_red: 0,
            text: t.detail.value
        }), this.SearchInput.changePanel("result"), this.SearchResult.getSearchGoods({
            keyword: t.detail.value,
            page: 1
        }, "key"), this.updateHistoryTagView(), this.setData({
            inputValue: t.detail.value
        }), this.SearchInput.changeToHiddenSearchClose(!1), this.resetConditions());
        var a = {
            "搜索词": t.detail.value,
            "搜索类型": "用户输入"
        };
        l.sendEventData({
            activity: "click_search_button",
            activityparam: t.detail.value,
            zhugeActivity: "搜索",
            zhugeActivityparam: a
        });
    },
    handleClose: function(t) {
        this.setData({
            inputValue: ""
        }), this.SearchInput.changePanel("tags"), this.SearchInput.changeToHiddenSearchClose(!0), 
        this.resetConditions();
    },
    setKeyResult: function(t) {
        this.SearchInput.changePanel("result"), this.SearchResult.getSearchGoods(t, "key");
    },
    handleTapTags: function(t) {
        var a = t.currentTarget.dataset;
        this.SearchHistory.set({
            is_red: a.red,
            text: a.text,
            jump_url: a.url
        }), a.url ? this.skipUrl(a.url) : (this.setKeyResult({
            keyword: a.text,
            page: 1
        }), this.updateHistoryTagView(), this.setData({
            inputValue: a.text
        }), this.SearchInput.changeToHiddenSearchClose(!1), this.resetConditions());
        var e = {
            "搜索词": a.text,
            "搜索类型": "click_search_history" === a.activity ? "搜索记录" : a.is_red ? "热搜词" : "搜索建议"
        };
        a.zhugeActivity = "搜索", a.zhugeActivityparam = e, l.sendEventData(a);
    },
    handleClearHistory: function(t) {
        this.SearchHistory.clear(), this.updateHistoryTagView(), l.sendEventData(t.currentTarget.dataset);
    },
    scrollGetGoods: function(t) {
        this.data.isajaxing || this.data.noMore || (this.setData({
            isajaxing: !0
        }), this.SearchResult.getSearchGoods());
    },
    priceStartBlur: function(t) {
        this.setData({
            price_start: t.detail.value
        }), l.sendEventData({
            activity: "click_screen_lowestprice",
            activityparam: ""
        });
    },
    priceEndBlur: function(t) {
        this.setData({
            price_end: t.detail.value
        }), l.sendEventData({
            activity: "click_screen_highestprice",
            activityparam: ""
        });
    },
    filterOkTap: function(t) {
        var a, e = [];
        if (this.data.cat_threeid) for (c = 0; c < this.data.cat_threeid.length; c++) a = this.data.cat_threeid[c].id, 
        this.data.cat_threeid[c].issel && -1 === e.indexOf(a) && (this.data.activeCateText = this.data.cat_threeid[c].name, 
        e.push(a));
        if (this.data.cates.length) {
            var i = this.data.cates[this.data.activeCateIndex];
            if (i) for (c = 0; c < i.sub_cat.length; c++) a = i.sub_cat[c].id, i.sub_cat[c].issel && -1 === e.indexOf(a) && (this.data.activeCateText = i.sub_cat[c].name, 
            e.push(a));
        }
        var s = [];
        if (this.data.filterGroup) for (c = 0; c < this.data.filterGroup.length; c++) r = this.data.filterGroup[c].id, 
        "1" == this.data.filterGroup[c].clicked && -1 === s.indexOf(r) && s.push(r);
        if (this.data.quickSortFilter) for (var r, c = 0; c < this.data.quickSortFilter.length; c++) r = this.data.quickSortFilter[c].filter_id, 
        "1" == this.data.quickSortFilter[c].clicked && -1 === s.indexOf(r) && s.push(r);
        var n = "";
        this.data.price_start && this.data.price_end ? n = this.data.price_start + "," + this.data.price_end : this.data.price_start && !this.data.price_end ? n = this.data.price_start : this.data.price_end && !this.data.price_start && (n = "0," + this.data.price_end), 
        this.SearchResult.getSearchGoods({
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
        }), t && "quick" === t.type || l.sendEventData({
            activity: "click_screen_sure",
            activityparam: ""
        });
    },
    filterResetTap: function(t) {
        if (this.data.cat_threeid) for (a = 0; a < this.data.cat_threeid.length; a++) this.data.cat_threeid[a].issel = !1;
        if (this.data.cates.length) for (a = 0; a < this.data.cates[this.data.activeCateIndex].sub_cat.length; a++) this.data.cates[this.data.activeCateIndex].sub_cat[a].issel = !1;
        if (this.data.filterGroup) for (a = 0; a < this.data.filterGroup.length; a++) this.data.filterGroup[a].clicked = "0";
        if (this.data.quickSortFilter) for (var a = 0; a < this.data.quickSortFilter.length; a++) this.data.quickSortFilter[a].clicked = "0";
        this.setData({
            price_start: "",
            price_end: "",
            cat_threeid: this.data.cat_threeid,
            filterGroup: this.data.filterGroup,
            cates: this.data.cates,
            quickSortFilter: this.data.quickSortFilter
        }), l.sendEventData({
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
        })), l.sendEventData({
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
            }), l.sendEventData({
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
    skipUrl: function(t) {
        wx.navigateTo({
            url: t
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
    }
}, l.pageEvents, g, u, p));

var f = function() {
    function e(a) {
        t(this, e), this.page = a, this.debounceHandleInput = r(this.handleInput, 100);
    }
    return a(e, [ {
        key: "handleInput",
        value: function(t) {
            var a = t.detail.value;
            a.length > 0 ? (this.requestSearch(a), this.changePanel("fuzzy"), this.changeToHiddenSearchClose(!1)) : (this.changePanel("tags"), 
            this.changeToHiddenSearchClose(!0));
        }
    }, {
        key: "changeToHiddenSearchClose",
        value: function(t) {
            t !== this.page.data.hiddenSearchClose && this.page.setData({
                hiddenSearchClose: t
            });
        }
    }, {
        key: "changePanel",
        value: function(t) {
            t !== this.page.data.visiblePanel && this.page.setData({
                visiblePanel: t
            });
        }
    }, {
        key: "requestSearch",
        value: function(t) {
            var a = this;
            o(t).then(function(t) {
                "1000" === t.code && a.page.setData({
                    suggestData: t.data.list
                });
            });
        }
    } ]), e;
}(), v = function() {
    function e() {
        var a = this;
        t(this, e), this.key = "shopSearchKeys", this.getAll().then(function(t) {
            a.value = t;
        }, function(t) {
            a.value = t;
        });
    }
    return a(e, [ {
        key: "getAll",
        value: function() {
            var t = this;
            return new Promise(function(a, e) {
                wx.getStorage({
                    key: t.key,
                    success: function(t) {
                        "[object Array]" == Object.prototype.toString.call(t.data) && (a(t.data || []), 
                        this.value = t.data || []);
                    },
                    fail: function() {
                        e([]), this.value = [];
                    }
                });
            });
        }
    }, {
        key: "set",
        value: function(t) {
            var a = this;
            if (t.text) return this.value.length >= 10 ? (this.value.pop(), this.value.unshift(t)) : this.value = this.value.filter(function(a) {
                return a.text !== t.text;
            }).concat([ t ]), new Promise(function(t, e) {
                wx.setStorage({
                    key: a.key,
                    data: a.value,
                    success: function(a) {
                        t(!0);
                    },
                    fail: function() {
                        e(!1);
                    }
                });
            });
        }
    }, {
        key: "clear",
        value: function() {
            var t = this;
            wx.removeStorage({
                key: this.key,
                success: function(a) {
                    t.value = [], console.log("search keys clear success ...");
                },
                fail: function() {
                    console.log("search keys clear fail ...");
                }
            });
        }
    } ]), e;
}(), _ = function() {
    function e(a) {
        var s = this;
        t(this, e);
        var r = this;
        r.page = a, this.SortTabs = new i(a, {
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
                "filter" == t.value ? (s.page.setData({
                    ifHideFilter: 1
                }), l.sendEventData({
                    activity: "click_category_sort_screen",
                    activityparam: ""
                })) : (r.getSearchGoods({
                    msort: t.sort,
                    page: 1
                }, "sort"), "recommendation" == t.value ? l.sendEventData({
                    activity: "click_category_sort_multiple",
                    activityparam: ""
                }) : "price" == t.value ? l.sendEventData({
                    activity: "click_category_sort_price",
                    activityparam: "asc" == t.orderType ? 1 : 0
                }) : "sales" == t.value && l.sendEventData({
                    activity: "click_category_sort_sales",
                    activityparam: ""
                }));
            }
        });
    }
    return a(e, [ {
        key: "getSearchGoods",
        value: function(t, a) {
            var e = this;
            "key" == a ? (this.params = t, wx.showLoading && wx.showLoading({
                title: "加载中"
            }), h(this.params).then(function(t) {
                if (wx.hideLoading && wx.hideLoading(), t.data.aggs.cat_threeid) for (var a = 0; a < t.data.aggs.cat_threeid.length; a++) t.data.aggs.cat_threeid[a].issel = !1;
                if (t.data.aggs.tbar && t.data.aggs.tbar.length) for (var i = 0; i < t.data.aggs.tbar.length; i++) t.data.aggs.tbar[i].clicked = "0";
                if (t.data.aggs.goods_type && t.data.aggs.goods_type.length) for (var s = 0; s < t.data.aggs.goods_type.length; s++) t.data.aggs.goods_type[s].clicked = "0"; else t.data.aggs.goods_type = [ {
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
                    cat_threeid: t.data.aggs.cat_threeid,
                    filterGroup: t.data.aggs.goods_type,
                    price_start: "",
                    price_end: "",
                    quickSortFilter: t.data.aggs.tbar,
                    cates: t.data.aggs.tcat
                });
            })) : "sort" == a || "filter" == a ? (this.params = Object.assign({}, this.params, t), 
            wx.showLoading && wx.showLoading({
                title: "加载中"
            }), h(this.params).then(function(t) {
                wx.hideLoading && wx.hideLoading(), e.page.setData({
                    goodsList: t.data.goods || [],
                    noMore: "1" == t.data.has_more_page,
                    isajaxing: !1
                });
            })) : (this.params.page = ++this.params.page, t = this.params, h(t).then(function(t) {
                e.page.setData({
                    goodsList: e.page.data.goodsList.concat(t.data.goods || []),
                    noMore: "1" == t.data.has_more_page,
                    isajaxing: !1
                });
            }));
        }
    } ]), e;
}();