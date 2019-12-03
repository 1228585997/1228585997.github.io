function e(e) {
    for (var a = e.length, s = {}, c = [], o = 0, n = {}, r = [], d = 0, f = !1, _ = void 0, l = 0, p = 0; p < a; p++) {
        var v = e[p], k = v.av_zid;
        v.av_zvalue && (t(k, c, "av_zid") ? s[k].push(v) : (c.push(v), s[k] = [ v ]), o++);
        var g = v.av_fid;
        v.av_fvalue && (t(g, r, "av_fid") ? n[g].push(v) : (r.push(v), n[g] = [ v ]), d++), 
        0 != v.stock && (0 != v.default_select_type && (f = v), l++, _ = v);
    }
    if (!o && !d) return {
        selectedSkuId: e[0].sku_id,
        cprice: e[0].fprice,
        sprice: e[0].sprice,
        oprice: e[0].price,
        fan_price: e[0].fan_price,
        selectedSkuTxt: ""
    };
    1 === l && ((f = _).default_select_type = o ? d ? 1 : 2 : 3), u.zMap = s, u.fMap = n, 
    u.zList = c, u.fList = r;
    var m = {
        isZ: o,
        zList: c,
        selectedZ: o ? "" : e[0].av_zid,
        isF: d,
        fList: r,
        selectedF: d ? "" : e[0].av_fid,
        isCombine: o && d
    }, h = void 0;
    return f ? 1 == f.default_select_type ? (h = i(0, f.av_zid, m), h = i(1, f.av_fid, h.sku)) : h = 2 == f.default_select_type ? i(0, f.av_zid, m) : i(1, f.av_fid, m) : h = {
        sku: m
    }, h;
}

function t(e, t, i) {
    for (var a = t.length, s = 0; s < a; s++) if (t[s][i] === e) return !0;
    return !1;
}

function i(e, t, i) {
    var c = {}, o = void 0, n = 0 == e, r = !1, d = !1, f = !1, _ = "已选择：", l = "cprice", p = "price", v = "fprice";
    return n ? i.selectedZ == t ? (r = !0, i.selectedZ = "") : i.selectedZ = t : i.selectedF == t ? (d = !0, 
    i.selectedF = "") : i.selectedF = t, i.isCombine ? r || d ? r ? i.selectedF ? (i.fList = u.fList, 
    i.zList = a(i.selectedF, u.fMap), o = i.fList[0], l = "f_c_area", p = "f_o_area", 
    v = "f_f_area", c.selectedSkuId = null) : (i.fList = u.fList, i.zList = u.zList, 
    f = !0) : i.selectedZ ? (i.zList = u.zList, i.fList = a(i.selectedZ, u.zMap), o = i.fList[0], 
    l = "z_c_area", p = "z_o_area", v = "z_f_area", c.selectedSkuId = null) : (i.fList = u.fList, 
    i.zList = u.zList, f = !0) : n ? (i.fList = a(i.selectedZ, u.zMap), i.selectedF ? (o = s(i.selectedZ, i.selectedF, i.fList), 
    c.selectedSkuId = o.sku_id) : (o = i.fList[0], l = "z_c_area", p = "z_o_area", v = "z_f_area"), 
    o && o.av_zpic && (c.goods_pic_url = o.av_zpic)) : (i.zList = a(i.selectedF, u.fMap), 
    i.selectedZ ? (o = s(i.selectedZ, i.selectedF, i.zList), c.selectedSkuId = o.sku_id) : (o = i.zList[0], 
    l = "f_c_area", p = "f_o_area", v = "f_f_area"), o && o.av_fpic && (c.goods_pic_url = o.av_fpic)) : n ? r ? f = !0 : ((o = s(i.selectedZ, i.selectedF, i.zList)) && o.av_zpic && (c.goods_pic_url = o.av_zpic), 
    c.selectedSkuId = o.sku_id) : d ? f = !0 : ((o = s(i.selectedZ, i.selectedF, i.fList)) && o.av_fpic && (c.goods_pic_url = o.av_fpic), 
    c.selectedSkuId = o.sku_id), f ? c = u.initGoodsInfo : (c.cprice = o[l], c.oprice = o[p], 
    c.sprice = o.sprice, c.fprice = o[v], c.fan_price = o.fan_price, c.vip_text = "", 
    c.sku_zg_json = o.zg_json, o.vip_mark && (c.vip_text = o.vip_mark.text), i.selectedZ && "0" != i.selectedZ ? (_ += o.av_zvalue, 
    i.selectedF && "0" != i.selectedF && (_ += "、" + o.av_fvalue)) : _ += o.av_fvalue, 
    c.selectedSkuTxt = _), c.sku = i, c;
}

function a(e, t) {
    for (var i = t[e], a = i.length, s = [], c = 0; c < a; c++) s.push(i[c]);
    return s;
}

function s(e, t, i) {
    for (var a = i.length, s = 0; s < a; s++) {
        var c = i[s];
        if (e == c.av_zid && t == c.av_fid) return c;
    }
}

var c = getApp(), o = require("../../utils/util"), n = require("../../utils/statistics"), r = require("../../components/send-formid/index"), u = {}, d = void 0, f = "", _ = {}, l = {
    initSku: function(t, i, a) {
        var s = this;
        d = t;
        var o = {
            goods_id: t,
            item_id: i || "",
            is_lottery: 1 == this.data.ifLottery ? 1 : 0,
            platform: c.globalData.PLATFORM,
            app_version: c.globalData.APP_VERSION,
            uid: wx.getStorageSync("uid")
        };
        o.apisign = c.createApisign(o), wx.request({
            url: c.globalData.URL_DETAIL + "ptgoods/sku",
            data: o,
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                var i = t.data, c = void 0 === i ? {} : i;
                if (1e3 == c.code) {
                    var o = c.data.info, n = "请选择：" + (o.zav_name ? o.fav_name ? o.zav_name + "、" + o.fav_name : o.zav_name : o.fav_name), r = {
                        sprice: o.sprice,
                        cprice: o.cprice,
                        oprice: o.oprice,
                        fprice: o.fprice,
                        vprice: o.vprice,
                        fan_price: o.fan_price,
                        buy_num: o.moq_info ? o.moq_info.num : "1",
                        moq_info_num: o.moq_info ? o.moq_info.num : "1",
                        join_number: o.join_number,
                        goods_pic_url: o.goods_pic_url,
                        zav_name: o.zav_name || "颜色",
                        fav_name: o.fav_name || "尺码",
                        shopStatus: o.status,
                        selectedSkuTxt: n,
                        isVirtual: o.is_virtual
                    };
                    u.initGoodsInfo = {
                        selectedSkuId: null,
                        goods_pic_url: o.goods_pic_url,
                        selectedSkuTxt: n,
                        cprice: o.cprice,
                        oprice: o.oprice,
                        sprice: o.sprice,
                        fprice: o.fprice,
                        fan_price: o.fan_price
                    };
                    var d = e(c.data.sku);
                    r = Object.assign(r, d), s.setData(r), "function" == typeof a && a();
                }
            }
        });
    },
    bindSkuTap: function(e) {
        var t = this.data.sku, a = e.currentTarget.dataset, s = a.type, c = a.id;
        if (0 == a.stock) return !1;
        this.setData(i(s, c, t));
    },
    closeSku: function() {
        o.maskDownAnimation(this, "showSku");
    },
    incBuyNum: function(e) {
        var t = this.data.buy_num;
        if (t >= 50) return !1;
        t++, this.setData({
            buy_num: t
        });
        var i = e.currentTarget.dataset;
        n.sendEventData(i);
    },
    decBuyNum: function(e) {
        var t = this.data.buy_num;
        if (t <= this.data.moq_info_num) return !1;
        t--, this.setData({
            buy_num: t
        });
        var i = e.currentTarget.dataset;
        n.sendEventData(i);
    },
    openSku: function(e, t) {
        var i = e.currentTarget.dataset, a = 1 == i.way, s = 1 == i.pop, c = 1 == i.disabled, n = this.data, r = n.ifLottery, u = void 0;
        if (a ? s ? (u = "click_temai_settle", f = "立即购买") : n.ifCanTuan ? (u = "click_pintuan_offered", 
        f = "立即参团") : (u = "click_pintuan_opengroup", f = "立即开团") : (u = "click_temai_joinbag", 
        f = "加入购物车"), c) return !1;
        this.setData({
            activity: u,
            ifGoCheckout: a,
            ifPop: s,
            showNum: 1 !== t
        }), n.ifLaodaixin && n.ifCanTuan ? (_["是否sku弹窗"] = "是", this.checkUserLabel()) : r ? (_["是否sku弹窗"] = "否", 
        this.dealSkuSubmit()) : (_["是否sku弹窗"] = "是", o.maskUpAnimation(this, "showSku"));
    },
    dealSkuSubmit: function(e) {
        if (!c.checkLogin()) return c.goLogin(), !1;
        var t = this.data;
        if (t.selectedSkuId) if (t.ifGoCheckout || t.isVirtual > 1) {
            var i = [ {
                goods_id: d,
                sku_id: t.selectedSkuId,
                num: t.buy_num
            } ];
            t.ifLaodaixin ? (t.ifCanTuan && (i[0].item_id = t.ifCanTuan), this.checkGoods(i)) : this.goCheckoutShop(t, i);
        } else t.ifAftersales ? (this.setData({
            selSkuTxt: t.selectedSkuTxt,
            selSkuId: t.selectedSkuId,
            selSkuCprice: t.cprice
        }), this.closeSku()) : (this.addToCart(t.selectedSkuId, t.buy_num), e && r.sendFormId(e.detail.formId, 2));
    },
    checkGoods: function(e) {
        var t = this, i = {
            goods_info: JSON.stringify(e),
            pf: 9
        };
        e[0].item_id && (i.itemId = e[0].item_id), o.post({
            url: c.globalData.URL_M + "shopcart/check",
            data: i,
            success: function(i) {
                var a = i.data, s = void 0 === a ? {} : a;
                1e3 == s.code ? t.goCheckoutShop(t.data, e) : 2002 == s.code ? c.goLogin() : (console.log(s.info), 
                e[0].item_id ? wx.showModal({
                    title: "",
                    cancelColor: "#666666",
                    confirmColor: "#ff464e",
                    confirmText: "我要开团",
                    content: s.info,
                    success: function(e) {
                        e.confirm && (t.setData({
                            ifCanTuan: null
                        }), t.dealSkuSubmit());
                    }
                }) : wx.showModal({
                    title: "",
                    showCancel: !1,
                    confirmColor: "#333333",
                    confirmText: "知道了",
                    content: s.info
                }));
            }
        });
    },
    checkUserLabel: function() {
        var e = this;
        if (!c.checkLogin()) return c.goLogin(), !1;
        var t = this;
        o.post({
            url: c.globalData.URL_M + "shopcart/checklabel",
            success: function(i) {
                var a = i.data, s = void 0 === a ? {} : a;
                1e3 == s.code ? o.maskUpAnimation(e, "showSku") : wx.showModal({
                    title: "",
                    cancelColor: "#666666",
                    confirmColor: "#ff464e",
                    confirmText: "我要开团",
                    content: s.info,
                    success: function(e) {
                        e.confirm && (t.setData({
                            ifCanTuan: null
                        }), t.openSku({
                            currentTarget: {
                                dataset: {
                                    way: 1
                                }
                            }
                        }));
                    }
                });
            }
        });
    },
    goCheckoutShop: function(e, t) {
        var i = void 0, a = 0, s = "/pages/user/checkout/checkout?goods_info=" + JSON.stringify(t) + "&is_try=0";
        _["售卖价"] = e.cprice, e.ifPop ? (i = 1, _["售卖价"] = e.sprice) : e.ifLottery ? (i = 5, 
        a = 3) : i = e.ifCanTuan ? 4 : 3, s += "&type=" + i + "&pa_type=" + a, e.ifCanTuan && (s += "&itemId=" + e.ifCanTuan), 
        wx.navigateTo({
            url: s
        }), _["加购数量"] = e.buy_num;
        var c = e.sku_zg_json ? JSON.parse(e.sku_zg_json) : {};
        _ = Object.assign({}, _, c), n.sendEventData({
            activity: this.data.activity,
            activityparam: t[0].sku_id,
            zhugeActivity: f,
            zhugeActivityparam: _
        });
    },
    addToCart: function(e, t) {
        var i = this;
        wx.showToast({
            title: "加入中",
            icon: "loading",
            duration: 1e4
        });
        var a = this.data;
        _["售卖价"] = a.cprice, _["加购数量"] = t;
        var s = a.sku_zg_json ? JSON.parse(a.sku_zg_json) : {};
        _ = Object.assign({}, _, s);
        var r = Object.assign(c.getPublicArg(), {
            goods_id: d,
            sku_id: e,
            num: t
        });
        r.apisign = c.createApisign(r), o.post({
            url: c.globalData.URL_MTRADE + "cart/add",
            data: r,
            success: function(a) {
                var s = a.data, c = void 0 === s ? {} : s;
                if (wx.hideToast(), 1e3 == c.code) {
                    i.closeSku(), i.setData({
                        isCartTip: !0
                    }), i.updateMiniCart(c.data.cart_sku);
                    var r = i;
                    setTimeout(function() {
                        r.setData({
                            isCartTip: !1
                        });
                    }, 2e3);
                    for (var u = JSON.parse(o.getCache("sel_good") || "[]"), l = !1, p = 0; p < u.length; p++) u[p].sku_id == e && (l = !0);
                    l || ((k = {}).goods_id = d, k.sku_id = e, k.num = t, u.push(k)), o.setCache("sel_good", JSON.stringify(u)), 
                    "function" == typeof i.addCartCallback && i.addCartCallback(d, e, t), i.setData({
                        goods_pic_url: ""
                    }), n.sendEventData({
                        activity: i.data.activity,
                        activityparam: e,
                        zhugeActivity: f,
                        zhugeActivityparam: _
                    });
                    var v = o.getCache("traceData");
                    if (v) {
                        var k = JSON.parse(v);
                        k.skuid = e, k.goodsid = d, n.sendEventData({
                            activity: "mkt_car",
                            activityparam: JSON.stringify(k)
                        });
                    }
                } else i.showErrorMsg(c.info);
            }
        }, !0);
    }
};

module.exports = l;