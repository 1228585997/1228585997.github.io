var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
    }
    return t;
}, e = getApp();

module.exports = {
    request: function(n) {
        return new Promise(function(o, a) {
            wx.request(t({}, n, {
                data: Object.assign({}, e.getPublicArg(), n.data),
                success: function(t) {
                    var e = t.data, n = void 0 === e ? {} : e;
                    1e3 == n.code ? o(n.data) : a(n.info);
                },
                fail: function(t) {
                    a(t);
                }
            }));
        });
    },
    toast: function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3e3;
        t && wx.showToast({
            title: t,
            icon: "none",
            duration: e
        });
    }
};