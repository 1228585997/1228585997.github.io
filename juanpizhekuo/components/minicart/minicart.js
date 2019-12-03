getApp(), require("../../utils/util");

module.exports = {
    updateMiniCart: function(t) {
        var i = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        this.setData({
            miniCartNum: t,
            showCartWindow: this.showCartWindow || !1
        }), i && wx.setStorageSync("miniCartNum", t);
    },
    getMiniCart: function() {
        if (!wx.getStorageSync("uid")) return !1;
        var t = wx.getStorageSync("miniCartNum");
        t && t > 0 && this.updateMiniCart(t, !1);
    }
};