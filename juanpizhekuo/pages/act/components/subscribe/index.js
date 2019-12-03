function s(s, t, a) {
    return t in s ? Object.defineProperty(s, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : s[t] = a, s;
}

var t = getApp();

require("../../../../utils/util");

module.exports = {
    subscribeTransformData: function(t, a) {
        var e;
        console.log(t.dialogBgStatus1.src);
        var r = this;
        t.bg.src = this.getImageUrl(t.bg.src), t.dialogBgStatus1.src = this.getImageUrl(t.dialogBgStatus1.src), 
        t.dialogBgStatus2.src = this.getImageUrl(t.dialogBgStatus2.src), r.setData((e = {}, 
        s(e, "subscribe.isShow." + a, !1), s(e, "subscribe.status." + a, 0), e));
    },
    subscribeTap: function(a) {
        var e = this, r = e.data.actName, i = a.currentTarget.dataset.index, c = t.getPublicArg();
        wx.request({
            url: t.globalData.URL_MACT + r + "-subscribe",
            data: c,
            success: function(a) {
                var r, c, u = a.data;
                if (u && u.code) switch (u.code) {
                  case 1e3:
                    e.setData((r = {}, s(r, "subscribe.isShow." + i, !0), s(r, "subscribe.status." + i, 1), 
                    r));
                    break;

                  case 1002:
                    e.setData((c = {}, s(c, "subscribe.isShow." + i, !0), s(c, "subscribe.status." + i, 2), 
                    c));
                    break;

                  case 1001:
                    t.goLogin(!0);
                }
            }
        });
    },
    closeModal: function(t) {
        var a = this, e = t.currentTarget.dataset.index;
        a.setData(s({}, "subscribe.isShow." + e, !1));
    }
};