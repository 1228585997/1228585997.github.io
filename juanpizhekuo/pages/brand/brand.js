var t = getApp(), e = void 0, a = void 0, i = void 0, r = void 0, o = void 0, s = void 0, n = void 0, d = void 0, c = void 0, l = require("../../utils/util"), h = require("../../utils/statistics"), f = require("../../components/backtop/backtop"), p = require("../../components/countdown/countdown"), u = require("../../components/get-coupon/index"), g = require("../../components/mask/mask"), _ = require("../../components/error-msg/error-msg"), v = require("../../utils/throttle"), D = require("../../components/todesk-tip/index"), m = require("../../components/enshrine/index"), T = require("../../components/toast/toast"), w = require("../../components/minicart/minicart"), x = v(function(t) {
    var e = this, a = t.detail.scrollTop;
    if (a > 1e3) e.data.isTopHidden && e.setData({
        isTopHidden: !1
    }); else if (a < 100 && !e.data.isTopHidden) {
        var i = {
            isTopHidden: !0
        };
        e.setData(i);
    }
    if (e.data.ifFloorMode && e.data.canUseSelector) {
        var r = wx.createSelectorQuery();
        r.select("#floor-wrap").boundingClientRect().exec(function(t) {
            t[0].top < 40 ? !e.data.ifFloorFixed && e.setData({
                ifFloorFixed: !0
            }) : e.data.ifFloorFixed && e.setData({
                ifFloorFixed: !1
            });
        }), e.data.ifFloorTap ? e.setData({
            ifFloorTap: !1
        }) : r.selectAll(".floor-data").boundingClientRect().exec(function(t) {
            for (var a = t[1], i = a.length, r = 0; r < i; r++) if ((a[r].top <= 0 && a[r + 1].top > 40 || r == i - 1 && a[r].top <= 40) && r != e.data.curFloor) {
                e.setData({
                    curFloor: r,
                    ifFloorTap: !1
                });
                break;
            }
        });
    }
}, 100);

Page(l.mergePage({
    data: {
        canUseSelector: wx.canIUse && wx.canIUse("createSelectorQuery"),
        curSort: 0,
        isPriceUp: 0,
        actInfo: [],
        list: [],
        noMore: !1,
        isTopHidden: !0,
        ready: !1,
        isEnshrine: !1,
        lasting: !0,
        btn_info: "",
        floor_data: "",
        price_start: "",
        price_end: "",
        cat_threeid: [],
        filterGroup: []
    },
    onLoad: function(t) {
        a = 1, s = t.brand_id, n = t.shop_id, d = t.goods_id, o = 1, i = "", e = !1, wx.showLoading && wx.showLoading({
            title: "加载中"
        });
        var c = this;
        l.getZyId(function(t) {
            r = t.slice(0, 2), c.getGoods(), c = null;
        }), wx.canIUse && wx.canIUse("showShareMenu") && wx.showShareMenu({
            withShareTicket: !0
        }), this.getMiniCart();
    },
    onShow: function() {
        this.setDeskTip("", "随时查阅爆款新品"), h.sendPageData("page_home_brand_in", s + "_" + n, "进入专场页");
    },
    getGoods: function(i) {
        var l = this, f = {
            brand_id: s + "_" + n + (d ? "_" + d : ""),
            msort: o,
            page: a,
            goods_utype: r,
            platform: t.globalData.PLATFORM,
            app_version: t.globalData.APP_VERSION
        };
        c && (f = Object.assign(f, c)), f.apisign = t.createApisign(f), wx.request({
            url: t.globalData.URL_MAPI + "goods/pinpai/goods",
            data: f,
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                var e = t.data, r = void 0 === e ? {} : e, o = r.data.systime;
                if (l.data.systime = o, 1e3 == r.code) {
                    l.data.lasting = !0;
                    var s = r.data, n = s.floor_bar, d = n && n.length, c = {
                        ifFloorMode: d
                    };
                    l.data.ready || (l.setBrandInfo(s.brand, s.store), c.ready = !0, wx.hideLoading && wx.hideLoading(), 
                    h.sendZhugePageData("进入专场页", s.zg_json));
                    var f = l;
                    if (d) c.curFloor = 0, c.floor_bar = n, c.floor_data = s.floor_data.map(function(t) {
                        for (var e = t.shift(), a = 0; a < t.length; a++) f.isEnshrineFn(t[a].goods_code) ? t[a].hasEnshrined = !0 : t[a].hasEnshrined = !1;
                        return {
                            title: e,
                            goods: t
                        };
                    }), c.noMore = !0, a = !1; else {
                        for (var p = s.goods, u = 0; u < p.length; u++) l.isEnshrineFn(p[u].goods_code) ? p[u].hasEnshrined = !0 : p[u].hasEnshrined = !1;
                        var g = i ? p : l.data.list.concat(p);
                        c.list = g, 0 == s.has_more_page ? (a++, g.length < 6 && l.getGoods(), c.noMore = !1) : (a = !1, 
                        c.noMore = !0);
                    }
                    l.setData(c), r.data.aggs && (r.data.aggs.cat_threeid && !l.data.cat_threeid.length && l.setData({
                        cat_threeid: r.data.aggs.cat_threeid
                    }), r.data.aggs.tbar && !l.data.filterGroup.length && l.setData({
                        filterGroup: r.data.aggs.tbar
                    }));
                } else if (2099 == r.code) {
                    wx.hideLoading && wx.hideLoading();
                    var _ = r.data.btn_info;
                    l.setData({
                        lasting: !1,
                        btn_info: _
                    });
                } else 0 === r.data.goods.length && l.setData({
                    list: r.data.goods,
                    noMore: !0
                });
            },
            complete: function() {
                e = !1;
            }
        });
    },
    setBrandInfo: function(t, e) {
        var a = this;
        t.req_coupons_id && this.getCoupon("专享券", t.req_coupons_id, function(t) {
            a.setData({
                couponInfo: t.info
            }), a = null;
        });
        var r = this.data.systime;
        i = t.gs_start_time > r ? this.formatDuring(1e3 * t.gs_start_time, 1e3 * r) : e.title, 
        wx.setNavigationBarTitle({
            title: i
        });
        var o = t.coupon_data, s = {
            title: e.title,
            logo: e.logo,
            join_num: t.store_info
        };
        o && o.length > 0 && (s.actInfo = o), this.setData(s);
    },
    dealSortTap: function(t) {
        if (e) return !1;
        var i = t.currentTarget.dataset, r = i.index, s = {
            curSort: r
        };
        switch (r) {
          case "1":
            1 == this.data.isPriceUp ? (o = 16, s.isPriceUp = 2, i.activityparam = 1) : (o = 8, 
            s.isPriceUp = 1, i.activityparam = 0);
            break;

          case "2":
            o = 2, s.isPriceUp = 0;
            break;

          default:
            o = 1, s.isPriceUp = 0;
        }
        a = 1, e = !0, this.getGoods(!0), s.noMore = !1, this.setData(s), h.sendEventData(i);
    },
    dealScroll: function(t) {
        this._dealScroll(t);
    },
    _dealScroll: x,
    floorTap: function(t) {
        var e = t.currentTarget.dataset, a = e.index, i = this;
        if (i.data.canUseSelector) {
            var r = wx.createSelectorQuery();
            r.select("#floor_" + a).boundingClientRect(), r.select("#container").fields({
                scrollOffset: !0
            }, function(t) {
                t.scrollTop;
            }).exec(function(t) {
                if (t.length <= 0) return !1;
                var e = t[1], r = t[0].top + e.scrollTop - 40;
                i.setData({
                    scrollTop: r,
                    curFloor: a,
                    ifFloorTap: !0,
                    ifFloorFixed: !0,
                    ifExpandBar: !1
                });
            });
        } else this.setData({
            curFloor: a,
            ifFloorTap: !0,
            ifExpandBar: !1
        });
        h.sendEventData(e);
    },
    toggleBar: function() {
        this.setData({
            ifExpandBar: !this.data.ifExpandBar
        });
    },
    scrollGetGoods: function(t) {
        a && !e && (e = !0, this.getGoods());
    },
    setDeskTip: function() {
        "android" === t.globalData.SYSTIME_INFO.platform.toLowerCase() && 1 != wx.getStorageSync("ifShowedDeskTip") && (wx.setStorageSync("ifShowedDeskTip", 1), 
        this.setData({
            ifShowDeskTip: !0
        }));
    },
    closeDeskTip: function() {
        this.setData({
            ifShowDeskTip: !1
        });
    },
    submit: function(e) {
        var a = this, i = !1, r = e.detail.formId, o = e.detail.target.dataset, s = o.goods_id, n = e.detail.target.dataset.goods_code, d = o.index, c = o.floor;
        if (i = !!this.isEnshrineFn(n), t.checkLogin()) if (i) {
            var l = [ {
                goods_code: n,
                goods_type: "3",
                goods_id: s
            } ];
            this.cancelEnshrine(l).then(function(t) {
                a.showToastMsg("取消收藏成功"), a.setData({
                    isEnshrine: !i
                });
            }).catch(function(t) {});
        } else {
            var h = {
                goodsCode: n,
                goodsId: s,
                salesType: "",
                form: 7,
                form_id: r,
                upRemind: 1,
                openid: wx.getStorageSync("openid")
            };
            this.addEnshrine(h).then(function(t) {
                a.showToastMsg("开抢前10分钟提醒", null, null, "收藏成功"), a.setData({
                    isEnshrine: !i
                });
            });
        } else t.goLogin();
        if (this.data.ifFloorMode) {
            for (var f = this.data.floor_data[c].goods, p = 0; p < f.length; p++) p == d && (f[p].hasEnshrined = !f[p].hasEnshrined);
            this.setData({
                floor_data: this.data.floor_data
            });
        } else this.data.list[d].hasEnshrined = !this.data.list[d].hasEnshrined, this.setData({
            list: this.data.list
        });
    },
    delTap: function(t) {},
    formatDuring: function(t, e) {
        var a = "", i = new Date(t).getDate(), r = new Date(e).getDate(), o = new Date(t), s = o.getHours(), n = 1 * o.getMinutes();
        return s < 10 && (s = "0" + s), n < 10 && (n = "0" + n), i - r >= 3 ? a = this.timeTransform(t) + "开抢" : i - r == 2 ? a = "后天" + s + ":" + n + "开抢" : i - r == 1 ? a = "明天" + new Date(t).getHours() + ":" + n + "开抢" : i == r && (a = "今天" + new Date(t).getHours() + ":" + n + "开抢"), 
        a;
    },
    timeTransform: function(t) {
        var e = new Date(t), a = 1 * e.getMonth() + 1, i = e.getDate(), r = e.getHours(), o = e.getMinutes();
        return o < 10 && (o = "0" + o), a + "/" + i + " " + r + ":" + o;
    },
    onShareAppMessage: function(e) {
        var a = this.data, i = a.title, r = "pages/brand/brand?brand_id=" + s + "&shop_id=" + n, o = a.ifFloorMode ? a.floor_data[0].goods[0].pic_url : a.list[0].pic_url;
        a.actInfo.length > 0 && (i += "【" + a.actInfo[0].content + "】");
        var d = {
            "分享场景": "专场",
            "分享id": s + "_" + n
        };
        return t.setShare(i, r, null, o, d);
    },
    openFilter: function() {
        this.setData({
            ifHideFilter: 1
        });
    },
    priceStartBlur: function(t) {
        this.setData({
            price_start: t.detail.value
        }), h.sendEventData({
            activity: "click_screen_lowestprice",
            activityparam: ""
        });
    },
    priceEndBlur: function(t) {
        this.setData({
            price_end: t.detail.value
        }), h.sendEventData({
            activity: "click_screen_highestprice",
            activityparam: ""
        });
    },
    filterOkTap: function(t) {
        var e, i = [];
        if (this.data.cat_threeid) for (s = 0; s < this.data.cat_threeid.length; s++) e = this.data.cat_threeid[s].id, 
        this.data.cat_threeid[s].issel && -1 === i.indexOf(e) && i.push(e);
        var r = [];
        if (this.data.filterGroup) for (var o, s = 0; s < this.data.filterGroup.length; s++) o = this.data.filterGroup[s].filter_id, 
        "1" == this.data.filterGroup[s].clicked && -1 === r.indexOf(o) && r.push(o);
        var n = "";
        if (this.data.price_start && this.data.price_end) {
            if (n = this.data.price_start + "," + this.data.price_end, parseInt(this.data.price_start) > parseInt(this.data.price_end)) {
                var d = this.data.price_end, l = this;
                setTimeout(function() {
                    l.setData({
                        price_end: l.data.price_start,
                        price_start: d
                    });
                }, 1e3);
            }
        } else this.data.price_start && !this.data.price_end ? n = this.data.price_start : this.data.price_end && !this.data.price_start && (n = "0," + this.data.price_end);
        c = {
            price_range: n,
            cat_threeids: i.join(","),
            filter_id: r.join(",")
        }, a = 1, this.getGoods(!0);
        var f = !this.data.price_start && !this.data.price_end && 0 === i.length && 0 === r.length;
        this.setData({
            ifHideFilter: 0,
            curFilter: !f
        }), h.sendEventData({
            activity: "click_screen_sure",
            activityparam: ""
        });
    },
    filterResetTap: function(t) {
        if (this.data.cat_threeid) for (e = 0; e < this.data.cat_threeid.length; e++) this.data.cat_threeid[e].issel = !1;
        if (this.data.filterGroup) for (var e = 0; e < this.data.filterGroup.length; e++) this.data.filterGroup[e].clicked = "0";
        this.setData({
            price_start: "",
            price_end: "",
            cat_threeid: this.data.cat_threeid,
            filterGroup: this.data.filterGroup
        }), h.sendEventData({
            activity: "click_screen_reset",
            activityparam: ""
        });
    },
    filterItemTap: function(t) {
        var e = t.currentTarget.dataset.ctid, a = t.currentTarget.dataset.type;
        if (this.data.cat_threeid) for (var i = 0; i < this.data.cat_threeid.length; i++) this.data.cat_threeid[i].id == e ? this.data.cat_threeid[i].issel = !this.data.cat_threeid[i].issel : this.data.cat_threeid[i].issel = !1;
        this.setData({
            cat_threeid: this.data.cat_threeid
        }), h.sendEventData({
            activity: "quick" === a ? "click_category_sort_cate" : "click_screen_item",
            activityparam: e
        });
    },
    filterItemTap2: function(t) {
        var e = t.currentTarget.dataset.filterid;
        if (this.data.filterGroup) for (var a = 0; a < this.data.filterGroup.length; a++) this.data.filterGroup[a].filter_id == e && ("0" == this.data.filterGroup[a].clicked ? this.data.filterGroup[a].clicked = "1" : "1" == this.data.filterGroup[a].clicked && (this.data.filterGroup[a].clicked = "0"));
        this.setData({
            filterGroup: this.data.filterGroup
        });
    },
    closeFilter: function(t) {
        this.setData({
            ifHideFilter: 0
        });
    }
}, p, u, _, g, w, {
    bindTopTap: f.bindTopTap
}, m, T, D, h.pageEvents));