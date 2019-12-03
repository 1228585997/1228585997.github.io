var e = getApp(), t = void 0, a = void 0, o = void 0, i = require("../../../utils/util"), s = require("../../../components/qipao/qipao"), n = require("../../../utils/statistics"), r = require("../../../components/backtop/backtop");

require("../../../components/send-formid/index");

Page(i.mergePage({
    data: function(e, t, a) {
        return t in e ? Object.defineProperty(e, t, {
            value: a,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = a, e;
    }({
        ishidden: !1,
        scrollTop: 0,
        recGoods: [],
        noMore: !1,
        isTopHidden: !0,
        showRule: !1,
        userLists: [],
        qipaoTop: "250rpx"
    }, "ishidden", !0),
    onLoad: function(s) {
        wx.showLoading();
        var n = this;
        t = !1, o = 1, i.getZyId(function(e) {
            a = "p16_" + e, n.getRecGoods();
        }), n.getBroadcast(e.globalData.URL_MACT + "ShakeLottery-getActPrizeList");
    },
    onShow: function() {
        this.getUserList(), n.sendPageData("page_yaoyiyao_share");
    },
    getUserList: function() {
        var t = this;
        wx.request({
            url: e.globalData.URL_MACT + "ShakeLottery-getActPrizeList",
            data: {},
            method: "GET",
            header: {
                "Content-Type": "application/json"
            },
            success: function(e) {
                var a = e.data, o = void 0 === a ? {} : a;
                if (wx.hideLoading && wx.hideLoading(), 1e3 === o.code) {
                    var i = o.data.prizePeople;
                    t.setData({
                        userLists: i
                    });
                }
            }
        });
    },
    showRule: function(e) {
        var t = e.currentTarget.dataset;
        this.setData({
            showRule: !0
        }), n.sendEventData(t);
    },
    closeRule: function(e) {
        this.setData({
            showRule: !1
        });
    },
    getRecGoods: function() {
        var a = this;
        wx.request({
            url: e.globalData.URL_TUAN + "oldbringnew/invitation?page=" + o + "&platform=xcx&page_size=20",
            data: {},
            method: "GET",
            header: {
                "Content-Type": "application/json"
            },
            success: function(e) {
                var i = e.data, s = void 0 === i ? {} : i;
                if (t = !1, 1e3 == s.code) {
                    var n = s.data, r = {
                        recGoods: a.data.recGoods.concat(n)
                    };
                    o++, a.setData(r);
                } else o = !1, a.setData({
                    noMore: !0
                });
            }
        });
    },
    scrollGetGoods: function(e) {
        o && !t && (t = !0, this.getRecGoods());
    },
    goIndex: function(e) {
        wx.switchTab({
            url: "../../index/index"
        });
        var t = e.currentTarget.dataset;
        n.sendEventData(t);
    }
}, n.pageEvents, r, s));