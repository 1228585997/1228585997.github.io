var a = getApp(), e = require("../../../utils/util");

require("../../../utils/statistics");

Page(e.mergePage({
    data: {
        pageNum: 1,
        ordergoods: [],
        morePage: 1,
        ReachBottom: !0
    },
    onLoad: function(a) {},
    onShow: function() {
        a.checkLogin() ? (wx.showLoading && wx.showLoading({
            title: "加载中"
        }), this.getData()) : a.goLogin();
    },
    getData: function() {
        var e = this, t = this, o = Object.assign({}, a.getPublicArg(), {
            uid: wx.getStorageSync("uid"),
            period: 0,
            page: this.data.pageNum,
            pagenum: 10,
            request_time: new Date().getTime() + 1e3 * a.globalData.TIME_DIFF
        });
        o.apisign = a.createApisign(o), wx.request({
            url: a.globalData.URL_MTRADE + "order/salesback",
            data: o,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            complete: function(a) {
                var o = a.data;
                if (wx.hideLoading && wx.hideLoading(), e.setData({
                    ReachBottom: !0
                }), "1000" == o.code) {
                    if (0 != o.data.has_more_page) {
                        var i = e.data.pageNum;
                        e.setData({
                            pageNum: ++i
                        });
                    } else e.setData({
                        morePage: o.data.has_more_page
                    });
                    var r = t.data.ordergoods.slice();
                    e.setData({
                        ordergoods: r.concat(o.data.ordergoods),
                        more_page: o.data.has_more_page
                    });
                }
            }
        });
    },
    jumperUrl: function(a) {
        wx.navigateTo({
            url: "./after-sales-details?sgid=" + a.currentTarget.dataset.sgid + "&boid=" + a.currentTarget.dataset.boid
        });
    },
    onReachBottom: function() {
        0 != this.data.morePage && this.data.ReachBottom && (this.getData(), this.setData({
            ReachBottom: !1
        }));
    }
}));