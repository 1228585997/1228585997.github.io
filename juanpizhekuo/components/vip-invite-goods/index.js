require("../../utils/util");

var t = getApp(), o = !1, e = !1;

module.exports = {
    getVIPGoodsInfo: function() {
        if (!o) {
            o = !0;
            var e = this, a = t.getPublicArg();
            a.actType = "40", wx.request({
                url: t.globalData.URL_TUAN + "pintuan/getXcxSpecialGoodsList",
                data: a,
                method: "get",
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    var o = t.data, a = void 0 === o ? {} : o, d = a.code;
                    a.info;
                    1e3 === d && a.data.goods && a.data.goods.length && e.setData({
                        VIPgoods: a.data.goods
                    });
                },
                complete: function() {
                    o = !1;
                }
            });
        }
    },
    getNewGoodsInfo: function() {
        if (!e) {
            e = !0;
            var o = this, a = t.getPublicArg();
            a.act = "189456", wx.request({
                url: t.globalData.URL_TUAN + "pintuan/getXcxSpecialGoodsList",
                data: a,
                method: "get",
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    var e = t.data, a = void 0 === e ? {} : e, d = a.code;
                    a.info;
                    1e3 === d && a.data.goods && a.data.goods.length && o.setData({
                        NEWgoods: a.data.goods
                    });
                },
                complete: function() {
                    e = !1;
                }
            });
        }
    },
    checkCanBuyVipGoods: function(t) {
        var o = t.currentTarget.dataset;
        wx.getStorageSync("vipStatus") > 0 ? wx.navigateTo({
            url: "/pages/shop/shop?id=" + o.goodsid
        }) : wx.showToast({
            title: "仅限VIP购买",
            icon: "none"
        });
    }
};