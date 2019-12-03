var t = getApp(), a = {
    getBottomMenu: function(a) {
        var e = this;
        wx.request({
            url: t.globalData.URL_MAPI + "timebuy/getTable",
            data: {
                platform: t.globalData.PLATFORM
            },
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                var o = t.data, n = void 0 === o ? {} : o;
                if (1e3 == n.code) {
                    for (var i = n.data.menulist, l = i.length, r = 0; r < l; r++) {
                        var s = i[r], u = s.link.indexOf(a) > -1 ? s.act_icon : s.bg_icon;
                        s.img = u;
                    }
                    e.setData({
                        bottomMenu: i
                    });
                }
            }
        });
    }
};

module.exports = a;