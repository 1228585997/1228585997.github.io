var t = require("../../../utils/util"), a = require("../../../utils/statistics"), o = getApp();

module.exports = {
    checkIsLogin: function() {
        var t = this;
        return o.checkLogin() ? (t.setData({
            hasLogin: !1,
            scrollTopCart: 0
        }), !0) : (t.setData({
            isEmpty: !0,
            hasLogin: !0,
            ready: !0,
            scrollTopCart: 0
        }), !1);
    },
    getCart: function() {
        var a = this, e = this, i = o.getPublicArg();
        i.goods_info = t.getCache("sel_good") || "[]", this.data.buyMemberCard ? 0 != this.data.buyMemberCard.check ? i.buyMemCardParam = this.data.buyMemberCard.buyMemCardParam : i.buyMemCardParam = 0 : i.buyMemCardParam = -1, 
        i.apisign = o.createApisign(i), wx.request({
            url: o.globalData.URL_MTRADE + "cart/lists",
            data: i,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            complete: function(i) {
                if (wx.hideLoading && wx.hideLoading(), wx.hideToast(), 1e3 == i.data.code) {
                    var r = i.data.data;
                    if (r.cart_group && 0 == r.cart_group.length && 0 == r.history_goods.length) e.setData({
                        isEmpty: !0,
                        ready: !0
                    }), e.getLikeGoods && e.getLikeGoods(""); else {
                        for (var s = r.cart_group, d = !0, n = [], g = !1, c = !1, u = 0; u < s.length; u++) {
                            for (var l = s[u].activity_goods, _ = !0, h = 0; h < l.length; h++) for (w = 0; w < l[h].cart_goods.length; w++) {
                                e.isInSelGood(l[h].cart_goods[w].sku_id) ? l[h].cart_goods[w].is_sel = !0 : (l[h].cart_goods[w].is_sel = !1, 
                                _ = !1, d = !1), n.push(l[h].cart_goods[w].goods_id), l[h].cart_goods[w].num = parseInt(l[h].cart_goods[w].num);
                                var p = l[h].cart_goods[w].priceList;
                                p && 2 == p[1].price_type ? !g && (g = !0) : !c && (c = !0);
                            }
                            s[u].is_sel = _;
                        }
                        a.setData({
                            showFanTip: g && c
                        }), r.isVipUser && e.setData({
                            isVipUser: r.isVipUser
                        }), e.getLikeGoods && e.getLikeGoods(n.join(","));
                        for (var f = JSON.parse(t.getCache("sel_good") || "[]"), m = !1, v = 0; v < f.length; v++) {
                            for (var y = !1, u = 0; u < s.length; u++) for (var l = s[u].activity_goods, h = 0; h < l.length; h++) for (var w = 0; w < l[h].cart_goods.length; w++) l[h].cart_goods[w].sku_id == f[v].sku_id && (y = !0);
                            y || (f.splice(v, 1), m = !0);
                        }
                        if (t.setCache("sel_good", JSON.stringify(f)), m) return void e.getCart();
                        var k = o.globalData.SYSTIME_INFO;
                        e.setData({
                            isEmpty: !1,
                            cart_group: r.cart_group,
                            history_goods: r.history_goods,
                            isAllSel: d,
                            total_real_price: r.total_real_price,
                            total_goods_price: r.total_goods_price,
                            total_reduce_money: r.total_reduce_money,
                            total_fan_money: r.total_fan_money || 0,
                            buyMemberCard: r.buyMemCard,
                            selectSku: r.selectSku,
                            ready: !0,
                            wh: k.windowHeight
                        });
                    }
                    r && r.cart_sku && e.updateMiniCart && e.updateMiniCart(r.cart_sku);
                } else wx.showModal({
                    title: "提示",
                    content: i.data.info || "获取购物车数据失败",
                    showCancel: !1,
                    success: function(t) {
                        3004 != i.data.code && 3002 != i.data.code || (wx.setStorageSync("jpSign", ""), 
                        wx.setStorageSync("uid", ""), wx.redirectTo({
                            url: "/pages/login/login"
                        }));
                    }
                });
            }
        });
    },
    isInSelGood: function(a) {
        for (var o = JSON.parse(t.getCache("sel_good") || "[]"), e = !1, i = 0; i < o.length; i++) if (o[i].sku_id == a) return e = !0;
        return e;
    },
    couponTap: function(a) {
        var o = this, e = a.target.dataset;
        t.maskDownAnimation(o, "showCartWin"), setTimeout(function() {
            t.maskUpAnimation(o, "showGetCoupon");
        }, 200), this.getCoupon(e.name, e.couponid, function() {
            return !1;
        });
    },
    postageFactivityTap: function(t) {
        for (var a = t.target.dataset.cartgroupindex, o = this.data.cart_group[a], e = [], i = 0; i < o.activity_goods.length; i++) for (var r = 0; r < o.activity_goods[i].cart_goods.length; r++) if (o.activity_goods[i].cart_goods[r].is_sel) {
            var s = {};
            s.goods_id = o.activity_goods[i].cart_goods[r].goods_id, s.sku_id = o.activity_goods[i].cart_goods[r].sku_id, 
            s.num = o.activity_goods[i].cart_goods[r].num, e.push(s);
        }
        wx.navigateTo({
            url: "/pages/postageFactivity/postageFactivity?goods_info=" + JSON.stringify(e)
        });
    },
    cartTap: function(e) {
        var i = this;
        a.sendEventData(e.target.dataset);
        var r = JSON.parse(t.getCache("sel_good"));
        if (r.length < 1) this.showErrorMsg("请选择一个商品"); else {
            for (var s = !1, d = 0; d < r.length; d++) for (var n = 0; n < this.data.cart_group.length; n++) for (var g = this.data.cart_group[n].activity_goods, c = 0; c < g.length; c++) for (var u = 0; u < g[c].cart_goods.length; u++) if (g[c].cart_goods[u].sku_id == r[d].sku_id && 3 == g[c].cart_goods[u].sourceType) {
                s = !0;
                break;
            }
            if (s) this.showErrorMsg("全球购商品仅支持APP购买，需删除全球购商品后才能结算"); else {
                var l = o.getPublicArg();
                l.request_time = new Date().getTime() + 1e3 * o.globalData.TIME_DIFF, l.page_from = 1, 
                l.goods_info = JSON.stringify(r), l.isVipUser = this.data.isVipUser, l.apisign = o.createApisign(l), 
                t.post({
                    url: o.globalData.URL_MTRADE + "settle/check",
                    data: l,
                    complete: function(t) {
                        if ("1000" == t.data.code) {
                            var a = t.data.data;
                            if (a.goods.length > 0 && t.data.data.msg_code >= 6) if (r.length == a.goods.length) i.setData({
                                limitTitle: a.msg,
                                limitArr: a.goods,
                                limitRemainingGood: ""
                            }); else {
                                var o = r.filter(function(t) {
                                    return a.goods.every(function(a) {
                                        return a.goods_id != t.goods_id;
                                    });
                                });
                                i.setData({
                                    limitTitle: a.msg,
                                    limitArr: a.goods,
                                    limitRemainingGood: JSON.stringify(o)
                                });
                            } else {
                                var e = i.data.buyMemberCard && i.data.buyMemberCard.buyMemCardParam && parseInt(i.data.buyMemberCard.check) ? i.data.buyMemberCard.buyMemCardParam : "";
                                wx.navigateTo({
                                    url: "/pages/user/checkout/checkout?type=2&goods_info=" + JSON.stringify(r) + "&buyMemCardParam=" + e
                                });
                            }
                        }
                    }
                }, !0);
            }
        }
    },
    goChangeNum: function(t) {
        var a = t.currentTarget.dataset;
        this.setData({
            limitArr: [],
            limitGoodId: "goodId" + a.limitgoodid
        });
    },
    goCheckout: function(t) {
        var a = t.target.dataset;
        a.limitremaininggood && wx.navigateTo({
            url: "/pages/user/checkout/checkout?type=2&goods_info=" + a.limitremaininggood
        });
    },
    delGood: function(t) {
        var e = this, i = t.target.dataset, r = [], s = {};
        s.goods_id = i.gid, s.sku_id = i.skuid, s.num = i.num, r.push(s), wx.showModal({
            title: "删除",
            content: "您确认要删除商品？",
            success: function(t) {
                if (t.confirm) {
                    wx.showToast({
                        title: "删除中",
                        icon: "loading",
                        duration: 1e4
                    });
                    var a = o.getPublicArg();
                    a.goods_info = JSON.stringify(r), a.apisign = o.createApisign(a), wx.request({
                        url: o.globalData.URL_MTRADE + "cart/del",
                        data: a,
                        method: "POST",
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        },
                        complete: function(t) {
                            1e3 == t.data.code ? (e.setSelGood(t, !1), e.getCart()) : (wx.hideToast(), e.showErrorMsg(t.data.info || "出问题了！请联系客服"));
                        }
                    });
                } else t.cancel;
            }
        }), a.sendEventData(i);
    },
    delHistoryGood: function(t) {
        for (var e = this, i = [], r = 0; r < this.data.history_goods.length; r++) {
            var s = this.data.history_goods[r], d = {};
            d.goods_id = s.goods_id, d.sku_id = s.sku_id, d.num = s.num, i.push(d);
        }
        wx.showToast({
            title: "删除中",
            icon: "loading",
            duration: 1e4
        });
        var n = o.getPublicArg();
        n.goods_info = JSON.stringify(i), n.apisign = o.createApisign(n), wx.request({
            url: o.globalData.URL_MTRADE + "cart/del",
            data: n,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            complete: function(t) {
                1e3 == t.data.code ? e.getCart() : (wx.hideToast(), e.showErrorMsg(t.data.info || "出问题了！请联系客服"));
            }
        }), a.sendEventData(t.target.dataset);
    },
    decGood: function(t) {
        var e = this, i = t.target.dataset;
        if (!(i.num <= i.moq_info)) {
            wx.showToast({
                title: "请稍候",
                icon: "loading",
                duration: 1e4
            });
            var r = o.getPublicArg();
            r.goods_id = i.gid, r.sku_id = i.skuid, r.num = --i.num, r.apisign = o.createApisign(r), 
            wx.request({
                url: o.globalData.URL_MTRADE + "cart/incr",
                data: r,
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                complete: function(t) {
                    1e3 == t.data.code ? (e.setSelGood(r, i.issel), e.getCart()) : (wx.hideToast(), 
                    e.showErrorMsg(t.data.info || "出问题了！请联系客服"));
                }
            }), a.sendEventData(i);
        }
    },
    incGood: function(t) {
        var e = this, i = t.target.dataset;
        if (!(i.num >= 50)) {
            wx.showToast({
                title: "处理中",
                icon: "loading",
                duration: 1e4
            });
            var r = o.getPublicArg();
            r.goods_id = i.gid, r.sku_id = i.skuid, r.num = ++i.num, r.apisign = o.createApisign(r), 
            wx.request({
                url: o.globalData.URL_MTRADE + "cart/incr",
                data: r,
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                complete: function(t) {
                    1e3 == t.data.code ? (e.setSelGood(r, i.issel), e.getCart()) : (wx.hideToast(), 
                    e.showErrorMsg(t.data.info || "出问题了！请联系客服"));
                }
            }), a.sendEventData(i);
        }
    },
    setSelGood: function(a, o) {
        for (var e = JSON.parse(t.getCache("sel_good")), i = !1, r = 0; r < e.length; r++) a.sku_id == e[r].sku_id && (i = !0, 
        o ? e.splice(r, 1, {
            goods_id: a.goods_id,
            sku_id: a.sku_id,
            num: a.num
        }) : e.splice(r, 1));
        !i && o && e.push({
            goods_id: a.goods_id,
            sku_id: a.sku_id,
            num: a.num
        }), t.setCache("sel_good", JSON.stringify(e));
    },
    groupTap: function(t) {
        for (var o = t.target.dataset.index, e = this.data.cart_group[o].activity_goods, i = 0; i < e.length; i++) for (var r = 0; r < e[i].cart_goods.length; r++) this.setSelGood(e[i].cart_goods[r], !this.data.cart_group[o].is_sel);
        this.data.cart_group[o].is_sel = !this.data.cart_group[o].is_sel, wx.showToast({
            title: "处理中",
            icon: "loading",
            duration: 1e4
        }), this.getCart(), a.sendEventData(t.target.dataset);
    },
    goodsTap: function(t) {
        for (var o = t.currentTarget.dataset.skuid, e = t.currentTarget.dataset.buymemcard, i = 0; i < this.data.cart_group.length; i++) for (var r = this.data.cart_group[i].activity_goods, s = 0; s < r.length; s++) for (var d = 0; d < r[s].cart_goods.length; d++) if (r[s].cart_goods[d].sku_id == o) {
            e ? (this.data.buyMemberCard.check = 1, this.setSelGood(r[s].cart_goods[d], !0)) : this.setSelGood(r[s].cart_goods[d], !r[s].cart_goods[d].is_sel);
            break;
        }
        wx.showToast({
            title: "处理中",
            icon: "loading",
            duration: 1e4
        }), this.getCart(), a.sendEventData(t.target.dataset);
    },
    allSelTap: function(t) {
        for (var o = 0; o < this.data.cart_group.length; o++) for (var e = this.data.cart_group[o].activity_goods, i = 0; i < e.length; i++) for (var r = 0; r < e[i].cart_goods.length; r++) this.setSelGood(e[i].cart_goods[r], !this.data.isAllSel);
        wx.showToast({
            title: "处理中",
            icon: "loading",
            duration: 1e4
        }), this.getCart(), a.sendEventData(t.target.dataset);
    },
    onTipCheck: function(t) {
        var a = this.data.buyMemberCard;
        1 == a.check ? a.check = 0 : 0 == a.check && (a.check = 1), this.setData({
            buyMemberCard: a
        }), this.getCart();
    },
    goLogin: function() {
        o.goLogin();
    }
};