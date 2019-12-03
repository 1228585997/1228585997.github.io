var t = getApp(), a = require("../../../utils/util"), e = (require("../../../utils/http"), 
require("../../../utils/statistics")), i = require("../../../components/backtop/backtop");

Page(a.mergePage({
    data: {
        ready: !1,
        pageType: 1,
        page: 1,
        orderList: [],
        isTopHidden: !0,
        hasMore: !0,
        asking: !1
    },
    onLoad: function(t) {
        var a = this;
        wx.setNavigationBarTitle({
            title: "3" === t.type ? "自购返现" : "分享赚钱"
        }), this.data.pageType = t.type, this.init(), wx.getSystemInfo({
            success: function(t) {
                a.setData({
                    lh: t.windowHeight
                });
            }
        }), this.setData({
            title: "3" === t.type ? "自购返现 (元)" : "分享赚钱 (元)",
            noList: "3" === t.type ? "暂无自购返现明细" : "暂无分享赚钱明细"
        });
    },
    onShow: function() {
        this.data.dateArr = new Set([]);
    },
    init: function() {
        wx.showLoading && wx.showLoading({
            title: "加载中"
        }), this.getList();
    },
    getList: function() {
        var e = this;
        if (!this.data.asking && this.data.hasMore) {
            this.data.asking = !0;
            var i = t.getPublicArg();
            i.type = this.data.pageType, i.p = this.data.page, i.apisign = t.createApisign(i), 
            wx.request({
                url: t.globalData.URL_MAPI + "Distribution/income/list",
                method: "GET",
                data: i,
                success: function(i) {
                    if (1e3 == +(i = i.data).code) {
                        e.data.asking = !1;
                        var s = [];
                        i.data.lists && i.data.lists.forEach(function(t, i) {
                            var d = t.ui_settleTime && a.formatDate(new Date(1e3 * t.ui_settleTime), "yyyy-MM-dd");
                            t.ui_settleTime && d && !e.data.dateArr.has(d) && (s.push({
                                dates: d,
                                hasDate: !0
                            }), e.data.dateArr.add(d)), s.push(t);
                        }), wx.hideLoading && wx.hideLoading(), e.data.page++, e.setData({
                            ready: !0,
                            orderList: e.data.orderList.concat(s),
                            totalMoney: i.data.totalMoney
                        }), (!i.data.lists || i.data.lists && !i.data.lists.length) && (e.data.hasMore = !1);
                    } else "2001" === i.code && (e.data.asking = !1, t.goLogin());
                }
            });
        }
    }
}, e.pageEvents, i));