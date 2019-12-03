function e(e) {
    e || (e = {});
    var t = "";
    for (var a in e) t += "&" + a + "=" + e[a];
    return n + t;
}

var t = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i]);
    }
    return e;
}, a = require("../../components/login-modal/index"), i = getApp(), n = "https://m.juanpi.com/page/index?";

Page(t({}, a, {
    data: {
        showWebview: !1,
        webviewUrl: null
    },
    onLoad: function(a) {
        if (wx.hideShareMenu(), i.checkLogin()) {
            var n = a.act, o = wx.getStorageSync("uid"), r = wx.getStorageSync("jpSign"), g = i.globalData.PLATFORM;
            this.setData({
                webviewUrl: e(t({}, a, {
                    act: "bigsixwheel/" + n,
                    jpUid: o,
                    jpSign: r,
                    jpPlatform: g
                })),
                showWebview: !0
            });
        } else this.showLoginModal(!1);
    }
}));