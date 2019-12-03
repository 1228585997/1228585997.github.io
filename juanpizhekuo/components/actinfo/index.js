require("../../utils/util");

var t = getApp();

module.exports = {
    getActInfo: function(a, o) {
        var e = this, i = t.getPublicArg();
        wx.request({
            url: t.globalData.URL_MAPI + "goods/discount/detail",
            data: {
                goods_id: a,
                goods_utype: i.jpGoodsUtype,
                user_label: wx.getStorageSync("jpUserLabel"),
                platform: t.globalData.PLATFORM,
                app_version: t.globalData.APP_VERSION,
                uid: wx.getStorageSync("uid")
            },
            method: "GET",
            complete: function(t) {
                var a = t.data, i = void 0 === a ? {} : a;
                if (1e3 == i.code) {
                    var d = 1;
                    d = o ? 1 : i.data.vip_info && "2" == i.data.vip_info.is_pop_sku ? 1 : 0, e.setData({
                        actInfo: i.data.coupon,
                        vipInfo: i.data.vip_info,
                        buyWay: d,
                        isPtGoods: "1" === o ? 0 : 1
                    });
                }
            }
        });
    }
};