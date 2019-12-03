var t = getApp(), a = require("../../../utils/util"), i = (require("../../../utils/http"), 
require("../../../utils/statistics")), s = require("../../../components/toast/toast");

Page(a.mergePage({
    data: {
        ready: !1,
        page: 1,
        fanList: [],
        isTopHidden: !0,
        hasMore: !0,
        asking: !1
    },
    onLoad: function(t) {
        var a = this;
        this.init(), wx.getSystemInfo({
            success: function(t) {
                a.setData({
                    lh: t.windowHeight
                });
            }
        });
    },
    onShow: function() {},
    init: function() {
        wx.showLoading && wx.showLoading({
            title: "加载中"
        }), this.getList();
    },
    getList: function() {
        var a = this;
        if (!this.data.asking && this.data.hasMore) {
            this.data.asking = !0;
            var i = t.getPublicArg();
            i.p = this.data.page, i.apisign = t.createApisign(i), wx.request({
                url: t.globalData.URL_MAPI + "Distribution/fans/list",
                method: "GET",
                data: i,
                success: function(i) {
                    (i = i.data).code && "1000" === i.code ? (a.data.asking = !1, wx.hideLoading && wx.hideLoading(), 
                    a.data.page++, a.setData({
                        ready: !0,
                        count: i.data.count,
                        fanList: i.data.lists && a.data.fanList.concat(i.data.lists)
                    }), (!i.data.lists || i.data.lists && !i.data.lists.length) && (a.data.hasMore = !1)) : i.code && "2001" === i.code && (a.data.asking = !1, 
                    t.goLogin());
                }
            });
        }
    }
}, i.pageEvents, s));