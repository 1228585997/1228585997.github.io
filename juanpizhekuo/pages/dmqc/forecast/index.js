getApp();

var t = require("../../../utils/util.js"), a = require("../../../utils/statistics"), e = require("../../../components/error-msg/error-msg"), s = require("../dmqc.service.js"), o = require("../../../components/countdown/countdown.js");

Page(t.mergePage({
    data: {
        ready: !1,
        curIndex: 0,
        Cates: [],
        goods: []
    },
    onLoad: function() {
        this.hasLoadCates = !1, wx.showLoading && wx.showLoading({
            title: "加载中"
        }), this.getBrandCates(), a.sendZhugePageData("进入品牌预告页", {});
    },
    onShow: function() {
        a.sendPageData("dmqc_forecast", "", "进入品牌预告页");
    },
    dealScroll: function(t) {},
    getBrandCates: function() {
        var t = this;
        this.getForecastBrands("", 0).then(function(a) {
            for (var e = a.data.category, s = [], o = 0; o < e.length; o++) {
                var n = e[o];
                n.page = 1, s.push(n);
            }
            s.length ? (t.setData({
                Cates: s
            }), t.getFirstPageGoods(t.data.curIndex)) : t.dealGoods(a, null);
        });
    },
    getFirstPageGoods: function(t) {
        var a = this, e = this.data.Cates ? this.data.Cates[t] : null, s = e ? e.item : "";
        this.getForecastBrands(s, 1).then(function(t) {
            a.dealGoods(t, e);
        });
    },
    dealGoods: function(t, a) {
        a || (a = new Object()), a.goods = t && t.data && t.data.goods ? t.data.goods : [];
        for (var e = 0; e < a.goods.length; e++) {
            var s = t.data.goods[e], o = 1e3 * parseInt(s.start_time, 10), n = "brandTimers." + e;
            this.countdown({
                endTime: o,
                timeKey: n
            });
        }
        wx.hideLoading(), this.setData({
            Cates: this.data.Cates,
            goods: a.goods,
            ready: !0
        });
    },
    getMoreGoods: function(t) {
        var a = this.data.Cates ? this.data.Cates[t] : null, e = a ? a.item : "";
        this.getForecastBrands(e, a.page).then(function(t) {
            console.log(t);
        });
    },
    cateItemTap: function(t) {
        var e = t.currentTarget.dataset, s = e.index;
        s != this.data.curIndex && (this.data.Cates[s].goods && 0 != this.data.Cates[s].goods.length || this.getFirstPageGoods(s), 
        this.setData({
            curIndex: s
        }), a.sendEventData(e));
    },
    onRemindClick: function(t) {
        t.currentTarget.dataset.goods.isFav;
    }
}, e, a.pageEvents, t, s, o));