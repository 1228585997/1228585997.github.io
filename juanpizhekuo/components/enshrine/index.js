var t = getApp(), e = require("../../utils/util"), o = (require("../../utils/statistics"), 
wx.getStorageSync("goods_list") || []), i = {
    initEnshrine: function() {
        var o = t.getPublicArg();
        o.apisign = t.createApisign(o), e.post({
            url: t.globalData.URL_MUSER + "favorite/goods_list_id",
            data: o,
            complete: function(t) {
                var e = [], o = [];
                if (200 == t.statusCode) {
                    var i = t.data.data.goods_code;
                    e = i ? i.split(",") : [];
                    var s = t.data.data.store_id;
                    o = s ? s.split(",") : [];
                }
                wx.setStorage({
                    key: "goods_list",
                    data: e
                }), wx.setStorage({
                    key: "collect_store_id",
                    data: o
                });
            }
        }, !0);
    },
    isEnshrineFn: function(t) {
        return (o = wx.getStorageSync("goods_list") || []).includes(t);
    },
    addEnshrine: function(i) {
        o = wx.getStorageSync("goods_list") || [];
        var s = t.getPublicArg();
        return s.goods_id = i.goodsId, s.goods_type = "3", s.goods_code = i.goodsCode, s.sales_type = i.salesType, 
        s.from = "7", s.form_id = i.form_id, s.upRemind = i.upRemind, s.openid = i.openid, 
        s.apisign = t.createApisign(s), new Promise(function(a, n) {
            e.post({
                url: t.globalData.URL_MUSER + "favorite/add",
                data: s,
                success: function(t) {
                    var e = t.data.code;
                    "2003" == e || "1000" == e ? (o.push(i.goodsCode), wx.setStorage({
                        key: "goods_list",
                        data: o
                    }), a(t)) : n(t);
                },
                fail: function(t) {
                    n(t);
                }
            }, !0);
        });
    },
    cancelEnshrine: function(i) {
        o = wx.getStorageSync("goods_list") || [];
        var s = t.getPublicArg();
        return s.gid_type = JSON.stringify(i), s.apisign = t.createApisign(s), new Promise(function(a, n) {
            e.post({
                url: t.globalData.URL_MUSER + "favorite/cancel",
                data: s,
                success: function(t) {
                    var e = t.data.code;
                    if ("2002" == e || "1000" == e) {
                        if (1 == i.length) {
                            var s = o.indexOf(i[0].goods_code);
                            o.splice(s, 1);
                        }
                        wx.setStorage({
                            key: "goods_list",
                            data: o
                        }), a(t);
                    } else n(t);
                },
                fail: function(t) {
                    n(t);
                }
            }, !0);
        });
    }
};

module.exports = i;