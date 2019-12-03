var t = require("../../../components/goods/sort-tabs/sort-tabs.js"), e = getApp(), a = !1, s = (new Date().getTime(), 
require("../../../utils/statistics")), i = require("../../../components/backtop/backtop"), o = require("../../../utils/util.js"), n = (require("../../../components/mask/mask"), 
require("../../../utils/http.js")), d = {
    getFilterGoods: function(t, i, o, n, d) {
        var r = this, c = this, u = c.data.Cates;
        if ((!d || !(a || u && u[t] && !u[t].hasMorePage)) && u) {
            this.setData({
                isajaxing: !0
            }), a = !0, d && u[t] && (u[t].page = u[t].page + 1), this.filter_id = o, this.filter_size = n;
            var l = {
                cid: this.data.cid,
                item: i,
                filter_id: o,
                filter_size: n,
                page: u[t] && u[t].page ? u[t].page : 1,
                uid: wx.getStorageSync("uid"),
                platform: e.globalData.PLATFORM
            };
            wx.request({
                url: e.globalData.URL_MAPI + "dmqc/goodslist",
                data: l,
                header: {
                    "Content-Type": "application/json"
                },
                success: function(e) {
                    var i = e.data, o = void 0 === i ? {} : i;
                    if (a = !1, r.setData({
                        isajaxing: !1
                    }), 1e3 == o.code) {
                        if (d && u.length > 0 && u[t].item) o.data.goods.length > 0 && (u[t].goods = u[t].goods.concat(o.data.goods)), 
                        u[t].hasMorePage = "0" == o.data.has_more_page, r.setData({
                            Cates: u,
                            curIndex: t
                        }); else if (r.hasLoadCates) {
                            var n = r.data.Cates[t];
                            n.page = 1, n.hasMorePage = "0" == o.data.has_more_page, n.goods = o.data.goods, 
                            o.data.size_info && (n.sizeInfo = {
                                num_size: r.reformSizeItem(o.data.size_info.num_size),
                                str_size: r.reformSizeItem(o.data.size_info.str_size)
                            }), c.setData({
                                Cates: r.data.Cates,
                                curIndex: t
                            }), r.data.tabFix && r.goToTabs();
                        } else r.initCates(o), o.data.goods && o.data.goods.length && c.initSort(c), c.setData({
                            Cates: o.data.category,
                            curIndex: t
                        }), s.sendPageData("page_tab", c.data.Cates[t].item), r.hasLoadCates = !0;
                        s.sendPageData("page_tab", r.data.Cates[t].item);
                    }
                    c.setData({
                        ready: !0
                    }), wx.hideLoading && wx.hideLoading();
                }
            });
        }
    },
    getCateGoods: function(t, i, o, d, r, c) {
        var u = this, l = this, h = l.data.Cates;
        if ((!c || !(a || h && h[t] && !h[t].hasMorePage)) && h) {
            this.setData({
                isajaxing: !0
            }), a = !0, c && h[t] && (h[t].page = h[t].page + 1);
            var g = n.getRequestParams(r), m = Object.assign(g, {
                cid: o,
                item: d,
                page: h[t] && h[t].page ? h[t].page : 1,
                uid: wx.getStorageSync("uid"),
                platform: e.globalData.PLATFORM
            });
            wx.request({
                url: r.length ? r : e.globalData.URL_MAPI + "dmqc/catelist",
                data: m,
                header: {
                    "Content-Type": "application/json"
                },
                success: function(e) {
                    var o = e.data, n = void 0 === o ? {} : o;
                    if (a = !1, u.setData({
                        isajaxing: !1
                    }), 1e3 == n.code) {
                        if (c && h.length > 0 && h[t].item) i != u.data.curSubIndex && (Cate[t].goods = []), 
                        n.data.goods.length > 0 && (h[t].goods = h[t].goods.concat(n.data.goods)), h[t].hasMorePage = "0" == n.data.has_more_page, 
                        u.setData({
                            Cates: h,
                            curIndex: t,
                            curSubIndex: i
                        }); else if (u.hasLoadCates) {
                            var d = u.data.Cates[t], r = n.data.category_tab ? n.data.category_tab : [];
                            d.page = 1, d.hasMorePage = "0" == n.data.has_more_page, d.goods = n.data.goods, 
                            n.data.size_info && (d.sizeInfo = {
                                num_size: u.reformSizeItem(n.data.size_info.num_size),
                                str_size: u.reformSizeItem(n.data.size_info.str_size)
                            }), t != u.data.curIndex ? (d.subCates = r, l.setData({
                                Cates: u.data.Cates,
                                curIndex: t,
                                curSubIndex: i,
                                subCates: r
                            })) : l.setData({
                                Cates: u.data.Cates,
                                curIndex: t,
                                curSubIndex: i
                            }), u.data.tabFix && u.goToTabs();
                        } else u.initCates(n), l.setData({
                            Cates: n.data.category,
                            curIndex: t,
                            curSubIndex: i,
                            subCates: n.data.category_tab
                        }), u.hasLoadCates = !0;
                        s.sendPageData("page_tab", u.data.Cates[t].item);
                    }
                    l.setData({
                        ready: !0
                    }), wx.hideLoading && wx.hideLoading();
                }
            });
        }
    },
    goToTabs: function(t) {
        var e = this;
        wx.canIUse && wx.canIUse("createSelectorQuery") && (t = t || 500, setTimeout(function() {
            var t = wx.createSelectorQuery();
            t.select("#tab").boundingClientRect(), t.select("#container").fields({
                scrollOffset: !0
            }, function(t) {
                t.scrollTop;
            }).exec(function(t) {
                if (t.length <= 0) return !1;
                var a = t[1], s = e.data.Cates && "dmqc" != e.data.cid ? 40 : 1, i = t[0].top + a.scrollTop - s + 1;
                e.setData({
                    scrollTop: i
                });
            });
        }, t));
    },
    initCates: function(t) {
        for (var e = t.data.category ? t.data.category.length : 0, a = 0; a < e; a++) {
            var s = t.data.category[a];
            a == this.data.curIndex ? (s.page = 1, s.hasMorePage = "0" == t.data.has_more_page, 
            s.goods = t.data.goods, t.data.size_info && (s.sizeInfo = {
                num_size: this.reformSizeItem(t.data.size_info.num_size),
                str_size: this.reformSizeItem(t.data.size_info.str_size)
            }), s.subCates = t.data.category_tab ? t.data.category_tab : []) : (this.resetCate(s), 
            s.sizeInfo = {});
        }
    },
    reformSizeItem: function(t) {
        var e = this, a = [];
        return t.map(function(t) {
            var s = {};
            s.title = t, s.selected = e.isItemSelected(t), a.push(s);
        }), a;
    },
    isItemSelected: function(t) {
        if (!this.selected_size_items || !this.selected_size_items.length) return !1;
        for (var e = 0; e < this.selected_size_items.length; e++) if (this.selected_size_items[e] == t) return !0;
        return !1;
    },
    resetCate: function(t) {
        t.page = 1, t.hasMorePage = !0, t.goods = [], t.subCates = [];
    },
    initSort: function(e) {
        this.SortTabs = new t(e, {
            data: [ {
                selected: !0,
                text: "推荐",
                value: "recommendation",
                sortIndex: 0
            }, {
                text: "折扣",
                value: "discount",
                orderType: "asc",
                sortIndex: [ 256, 512 ]
            }, {
                text: "价格",
                value: "price",
                orderType: "asc",
                sortIndex: [ 8, 16 ]
            }, {
                text: "尺码",
                value: "filter",
                sortIndex: 128
            } ]
        });
    },
    resetSort: function() {
        this.SortTabs && (this.SortTabs = null, this.initSort(this));
    },
    dealScroll: function(t) {
        var e = this;
        t.detail.scrollTop;
        wx.canIUse && wx.canIUse("createSelectorQuery") && wx.createSelectorQuery().select("#tab").boundingClientRect().exec(function(t) {
            t[0].top < 0 ? e.setData({
                tabFix: !0
            }) : e.setData({
                tabFix: !1
            });
        }), i.dealScroll.call(this, t);
    },
    bindTopTap: i.bindTopTap,
    getMoreGoods: function() {
        var t = this.data, e = t.Cates ? t.Cates[t.curIndex] : null;
        if (e && e.hasMorePage) t.hasSubCates ? this.getCateGoods(t.curIndex, "", t.Cates[t.curIndex].item, "", t.Cates[t.curIndex].link, !0) : this.getFilterGoods(t.curIndex, e ? e.item : "", this.filter_id, this.filter_size, !0); else if (1 === t.pullDownCount) {
            var a = t.curIndex, s = t.Cates && t.Cates.length - 1 <= a ? 0 : a + 1;
            this.cateChange(s), this.setData({
                pullDownCount: 0,
                pullDownCountTime: new Date().getTime()
            });
        } else {
            var i = t.pullDownCountTime || 0;
            if (new Date().getTime() - i > 1e3) {
                var o = t.pullDownCount || 0;
                o++, this.setData({
                    pullDownCount: o,
                    pullDownCountTime: new Date().getTime()
                });
            }
        }
    },
    cateItemTap: function(t) {
        var e = t.currentTarget.dataset, a = e.index;
        this.cateChange(a), e.zhugeActivityparam = {
            "tab名称": e.name
        }, s.sendEventData(e);
    },
    cateChange: function(t) {
        t != this.data.curIndex && (this.selected_size_items = [], this.resetSort(), 0 == this.data.Cates[t].goods.length ? (wx.showLoading && wx.showLoading({
            title: "加载中"
        }), this.data.hasSubCates ? this.getCateGoods(t, "", "dmqc", this.data.Cates[t].item, this.data.Cates[t].link, !1) : this.getFilterGoods(t, this.data.Cates[t].item, "", "", !1)) : (this.setData({
            curIndex: t,
            subCates: this.data.Cates[t].subCates ? this.data.Cates[t].subCates : []
        }), this.data.tabFix && this.goToTabs(800)));
    },
    subCateTap: function(t) {
        var e = t.currentTarget.dataset, a = e.index, s = e.subcid;
        if (a != this.data.curSubIndex) {
            wx.showLoading && wx.showLoading({
                title: "加载中"
            });
            var i = this.data.Cates[this.data.curIndex].subCates;
            this.getCateGoods(this.data.curIndex, a, s, "", i[a].link, !1);
        }
    },
    sortTabTapHandler: function(t, e) {
        var a = this.data.Cates[this.data.curIndex];
        e ? (this.setData({
            size_info: a.sizeInfo
        }), o.maskLeftAnimation(this, "showFilterWin")) : (this.resetCate(a), this.getFilterGoods(this.data.curIndex, this.data.Cates[this.data.curIndex].item, t.sort, "", !1));
    },
    sizeItemTap: function(t) {
        var e = t.currentTarget.dataset, a = e.item, s = e.sizetype;
        if (this.selected_size_items || (this.selected_size_items = []), this.isItemSelected(a.title)) {
            var i = this.selected_size_items.indexOf(a.title);
            this.selected_size_items.splice(i, 1), a.selected = !1;
        } else this.selected_size_items.push(a.title), a.selected = !0;
        var o, n = this.data.Cates[this.data.curIndex].sizeInfo;
        o = "str" == s ? n.str_size : n.num_size;
        for (var d = 0; d < o.length; d++) if (o[d].title == a.title) {
            o.splice(d, 1, a);
            break;
        }
        console.log(n), this.setData({
            size_info: n
        });
    },
    resetBtnTap: function(t) {
        this.selected_size_items = [];
        var e = this.data.Cates[this.data.curIndex], a = e.sizeInfo;
        a.num_size.map(function(t) {
            t.selected = !1;
        }), a.str_size.map(function(t) {
            t.selected = !1;
        }), this.setData({
            size_info: e.sizeInfo
        });
    },
    confirmBtnTap: function(t) {
        var e = this.selected_size_items.toString(), a = this.data.Cates ? this.data.Cates[this.data.curIndex] : null;
        this.getFilterGoods(this.data.curIndex, a ? a.item : "", this.filter_id, e, !1), 
        o.maskRightAnimation(this, "showFilterWin");
    }
};

module.exports = d;