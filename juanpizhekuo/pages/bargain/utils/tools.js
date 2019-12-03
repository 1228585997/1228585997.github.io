var t = Object.assign || function(t) {
    for (var n = 1; n < arguments.length; n++) {
        var e = arguments[n];
        for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    }
    return t;
}, n = getApp();

module.exports = {
    countdown: function(t) {
        var n = (t = Math.floor(t / 1e3)) % 3600, e = n % 60;
        return [ (t - n) / 3600, (n - e) / 60, e ];
    },
    request: function(e) {
        return new Promise(function(o, r) {
            wx.request(t({}, e, {
                data: Object.assign({}, n.getPublicArg(), e.data),
                success: function(t) {
                    var n = t.data;
                    1e3 == n.code ? o(n.data) : r(n.info);
                },
                fail: function(t) {
                    r(t);
                }
            }));
        });
    },
    toast: function(t) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3e3;
        t && wx.showToast({
            title: t,
            icon: "none",
            duration: n
        });
    }
};