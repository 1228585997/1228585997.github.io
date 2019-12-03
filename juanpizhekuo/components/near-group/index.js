var a = getApp(), e = {
    getNearGroup: function(e) {
        var t = this;
        wx.request({
            url: a.globalData.URL_DETAIL + "ptgoods/guess/like",
            data: {
                goods_id: e,
                app_version: a.globalData.APP_VERSION,
                platform: a.globalData.PLATFORM
            },
            header: {
                "Content-Type": "application/json"
            },
            success: function(a) {
                var e = a.data, o = void 0 === e ? {} : e;
                if (1e3 == o.code) {
                    var r = o.data.list;
                    t.setData({
                        nears: r
                    });
                    for (var s = 0; s < r.length; s++) t.countdown({
                        left: r[s].remaining_time,
                        timeKey: "nearTimes." + s
                    });
                }
            }
        });
    }
};

module.exports = e;