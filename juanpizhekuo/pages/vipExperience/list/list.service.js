var t = require("../../../utils/http"), n = t.GET, a = (t.createApisign, getApp()), e = getApp().globalData;

module.exports = {
    getVipGoods: function(t) {
        var i = a.getPublicArg(), r = a.globalData;
        return i.app_version = r.APP_VERSION, t = Object.assign(t, i), n(e.URL_MAPI + "pintuan/goodslist", Object.assign({}, t)).then(function(t) {
            return t.data;
        });
    },
    achieveVipExCard: function(t) {
        var i = a.getPublicArg(), r = a.globalData;
        return i.app_version = r.APP_VERSION, t = Object.assign(t, i), n(e.URL_MAPI + "pintuan/getcard", Object.assign({}, t)).then(function(t) {
            return t.data;
        });
    },
    openTuan: function(t) {
        var i = a.getPublicArg(), r = a.globalData;
        return i.app_version = r.APP_VERSION, i.openId = wx.getStorageSync("openid"), t = Object.assign(t, i), 
        n(e.URL_MAPI + "pintuan/opentuan", Object.assign({}, t)).then(function(t) {
            return t.data;
        });
    }
};