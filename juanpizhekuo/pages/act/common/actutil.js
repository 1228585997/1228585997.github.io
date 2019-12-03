var t = getApp();

module.exports = {
    getSystemTime: function(e, n, a) {
        t.globalData.TIME_DIFF + new Date().getTime() < 1e3 * n - 72e5 ? new Promise(function(n, a) {
            wx.request({
                url: t.globalData.URL_MACT + e + "-systime",
                method: "GET",
                success: function(t) {
                    n(t);
                },
                fail: function(t) {
                    return a(t);
                }
            });
        }).then(function(e) {
            t.globalData.ACT_TIME_DIFF = parseInt(e.data) - new Date().getTime(), a();
        }) : (t.globalData.ACT_TIME_DIFF = t.globalData.TIME_DIFF, a());
    },
    getStock: function(e, n) {
        return new Promise(function(a, o) {
            for (var u = [], i = 0; i < e.length; i++) u.push("zid[]=" + e[i]);
            wx.request({
                url: t.globalData.URL_MACT + n + "-getNewGoodsStock?" + u.join("&"),
                method: "GET",
                success: function(t) {
                    a(t);
                },
                fail: function(t) {
                    return o(t);
                }
            });
        });
    }
};