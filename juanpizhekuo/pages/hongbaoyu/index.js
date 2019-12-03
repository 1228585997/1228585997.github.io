function a(a) {
    a || (a = {});
    var e = "";
    for (var t in a) e += "&" + t + "=" + a[t];
    return o + e;
}

var e = Object.assign || function(a) {
    for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (a[n] = t[n]);
    }
    return a;
}, t = require("../../components/login-modal/index"), n = getApp(), o = "https://m.juanpi.com/page/index?act=hongbaoyu";

Page(e({}, t, {
    data: {
        shareData: {},
        showWebview: !1,
        webviewUrl: null
    },
    onLoad: function(e) {
        if (n.checkLogin()) {
            var t = wx.getStorageSync("uid");
            this.setData({
                webviewUrl: a({
                    uid: t
                }),
                showWebview: !0
            });
        } else this.showLoginModal(!1);
    },
    onShareAppMessage: function(a) {
        return this.data.shareData;
    },
    onPostMessage: function(a) {
        var e = a.detail.data, t = void 0 === e ? [] : e;
        this.setData({
            shareData: t[0] || {}
        });
    }
}));