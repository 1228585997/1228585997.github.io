var e = getApp();

module.exports = {
    sendFormId: function(t, a) {
        var r = wx.getStorageSync("openid");
        if (!r) return !1;
        var n = "send_form_id_limit_" + (3 == a || 4 == a ? 0 : 1), o = wx.getStorageSync(n);
        if (o) {
            if (new Date().getTime() + e.globalData.TIME_DIFF < o) return !1;
            wx.removeStorageSync(n);
        }
        wx.request({
            url: e.globalData.URL_MAPI + "Xcx/saveWxUserFormId",
            data: {
                uid: wx.getStorageSync("uid"),
                openId: r,
                formId: t,
                type: a
            },
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                var a = t.data, r = void 0 === a ? {} : a;
                if (5002 == r.code) {
                    var o = new Date().getTime() + e.globalData.TIME_DIFF + 1e3 * r.expireTime;
                    wx.getStorageSync(n, o);
                }
            }
        });
    },
    changeDataset: function(e) {
        var t = {};
        return e.map(function(e) {
            t[e[0]] = e[1];
        }), t;
    },
    sendPageFormId: function(e) {
        var t = e.currentTarget.dataset.type || 1, a = e.detail.formId;
        this.sendFormId(a, t);
    }
};