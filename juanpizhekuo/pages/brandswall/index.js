function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a = getApp(), e = void 0, n = require("../../utils/util.js"), o = require("../../utils/statistics");

Page(n.mergePage({
    data: {
        list: [ "推荐品牌", "女装", "男装", "鞋子", "母婴", "内衣", "居家百货", "家纺家装", "美妆", "数码电器", "美食", "运动户外", "箱包", "配饰" ],
        idList: [ "tab0", "tab1", "tab2", "tab3", "tab4", "tab5", "tab6", "tab7", "tab8", "tab9", "tab10", "tab11", "tab12", "tab13" ],
        target: 0,
        blockadsArr: [],
        notShow: !0,
        scrollLeft: 0
    },
    onShow: function() {
        var t = this;
        n.getZyId(function(a) {
            e = "p16_" + a, t.getAds(e), t = null;
        }), o.sendPageData("page_brand_aggregation");
    },
    onLoad: function() {},
    getAds: function(e, n) {
        var o = this, i = {
            app_version: a.globalData.APP_VERSION,
            catname: "jx_brand",
            platform: "msmall",
            zy_ids: e
        };
        i.apisign = a.createApisign(i), wx.request({
            url: a.globalData.URL_MAPI + "appads/banner",
            data: i,
            header: {
                "Content-Type": "application/json"
            },
            success: function(e) {
                var i = e.data, r = void 0 === i ? {} : i, s = a.globalData.SYSTIME_INFO;
                if (1e3 == parseInt(r.code, 10) && r.data.block && r.data.block.length) {
                    var c = r.data.block[0].multi_block;
                    if (c && c.length) {
                        for (var l = 0; l < c.length; l++) {
                            var d = c[l];
                            if ("1" == d.block_type) for (var u = d.data, b = 0; b < u.length; b++) {
                                var g = u[b].child;
                                u[b].height = (s.windowWidth * u[b].height).toFixed(0);
                                for (var f = 0, h = g.length; f < h; f++) if (parseInt(g[f].countdown.enable_time, 10)) {
                                    var p = 1e3 * parseInt(g[f].countdown.end_time, 10), v = 1e3 * parseInt(g[f].countdown.start_time, 10), w = g[f].bd_id, _ = new Date().getTime();
                                    o.setData(t({}, "countDownText." + w, v - _ >= 0 ? g[f].countdown.start_text : g[f].countdown.end_text)), 
                                    o.countdown({
                                        endTime: v - _ >= 0 ? v : p,
                                        timeKey: "blockTimes." + w,
                                        onEnd: function() {}
                                    });
                                }
                            }
                        }
                        o.setData({
                            blockadsArr: c
                        }), "function" == typeof n && n(c);
                    }
                }
            }
        });
    },
    jumpTo: function(t) {
        var a = t.currentTarget.dataset.index, e = this.data.idList[a];
        this.setData({
            toView: e,
            target: a
        });
    },
    jumpToScroll: function(t) {
        var a = t.currentTarget.dataset.index, e = this.data.idList[a];
        this.setData({
            toView: e,
            target: a
        }), a > 4 ? this.setData({
            scrollLeft: 60 * (a - 1)
        }) : this.setData({
            scrollLeft: 0
        });
    },
    showNavtabs: function() {
        this.setData({
            notShow: !this.data.notShow
        });
    },
    chooseNavTabs: function(t) {
        var a = this;
        wx.createSelectorQuery && wx.createSelectorQuery().selectAll(".location").boundingClientRect().exec(function(t) {
            for (var e = t[0], n = e.length, o = 0; o < n; o++) if (e[o].top >= 0 && e[o].top <= 44) {
                a.setData({
                    curTab: o,
                    ifTabTap: !1,
                    target: o
                }), o > 4 ? a.setData({
                    scrollLeft: 60 * (o - 1)
                }) : a.setData({
                    scrollLeft: 0
                });
                break;
            }
        });
    }
}, o.pageEvents));