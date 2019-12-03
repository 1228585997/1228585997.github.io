var e = getApp(), t = (require("../../../../utils/util"), require("../../common/actutil")), a = require("../../../../utils/statistics"), i = null, s = void 0;

module.exports = {
    secKillTransformData: function(a, n, o, d) {
        s = d, i = a;
        var l = this, c = o[a.zidIndex];
        return wx.request({
            url: "https://act.juancdn.com/ActGoodsJs/" + c + "/xcx_default.json",
            method: "GET",
            success: function(a) {
                var i = a.data.data[c] || [];
                l.initSecKillData(i, c, n), t.getStock(o, n).then(function(t) {
                    var a = t.data;
                    if (a && a.data && a.data.map(function(e) {
                        l.setGoodPropByProp(l.data.secKill.times, [ "p", e ], [ "g", "end" ]);
                    }), e.checkLogin()) {
                        var i = wx.getStorageSync("goods_list");
                        i && i.map(function(e) {
                            Number(e) > 0 && l.setGoodPropByProp(l.data.secKill.times, [ "d2", e ], [ "favored", !0 ]);
                        });
                    }
                    l.setData({
                        "secKill.times": l.data.secKill.times
                    });
                });
            }
        }), a;
    },
    initSecKillData: function(t, a, n) {
        var o = this;
        if (new Date(t[0].gname).getTime()) {
            var d = 0, l = [], c = [], r = [], m = [], g = [], h = [], u = void 0, T = void 0, v = 0;
            (t = o.sortGoods(t, "m")).map(function(s, o) {
                h.push(new Date(s.gname).getTime()), u = s.gname.slice(0, 10), T = s.gname, 0 === o ? (c[0] = T, 
                r[0] = T.slice(5, 10).replace("/", "月") + "日", m[0] = [ T ], g[0] = [ T.slice(11, 14) + "00" ], 
                l[0] = 0) : u !== c[c.length - 1].slice(0, 10) ? (c.push(T), r.push(T.slice(5, 10).replace("/", "月") + "日"), 
                m[++v] = [ T ], g[v] = [ T.slice(11, 14) + "00" ], l[v] = 0) : T !== m[m.length - 1] && (m[v].push(T), 
                g[v].push(T.slice(11, 14) + "00")), new Date().getTime() + e.globalData.ACT_TIME_DIFF >= new Date(T).getTime() && (d = c.length - 1, 
                l[v] = m[v].length - 1, v - 1 >= 0 && (l[v - 1] = 0)), t[o].combineIndex = m.length - 1 + "." + (m[v].length - 1), 
                t[o].isOver = new Date(s.gname).getTime() < new Date().getTime() + e.globalData.ACT_TIME_DIFF;
                for (var D = 0; D < t[o].goodsList.length; D++) {
                    var p = t[o].goodsList[D];
                    Number(p.n) > 0 && "1790483" !== p.n && 1 === Number(p.m) ? p.url = "/pages/brand/brand?brand_id=" + p.l + "&shop_id=" + p.n + "&goods_id=" + p.p : p.url = "/pages/shop/shop?id=" + p.p, 
                    i.xcxlanding && (p.url = i.xcxlanding), p.activityparam = n + "." + a + "." + (2001 + Number(t[o].combineIndex.slice(0, 1))) + "." + (Number(t[o].combineIndex.slice(-1)) + 1) + "." + (D + 1) + "." + p.l + "." + p.n + "." + p.p;
                }
            });
            var D = new Date(m[d][l[d]]).getTime(), p = void 0, I = void 0;
            new Date().getTime() + e.globalData.ACT_TIME_DIFF < D ? (p = D, I = "离本场开始还有:") : (p = 1e3 * s, 
            I = "离本场结束还剩:"), this.countdown({
                endTime: p,
                timeKey: "clock." + i.id,
                isAct: !0,
                onEnd: function() {
                    o.getAct(this.data.actName);
                }
            });
            var x = 0;
            if (d >= 5) {
                var f = e.globalData.SYSTIME_INFO.windowWidth / 5;
                x = f * (d + 1 - 5), setTimeout(function() {
                    o.setData({
                        "secKill.scrollLeft": x
                    });
                }, 100);
            }
            o.setData({
                secKill: {
                    activeDateIndex: d,
                    activeTimesIndex: l,
                    times: t,
                    dateArr: c,
                    dateTxtArr: r,
                    timeArr: m,
                    timeTxtArr: g,
                    timesArr: h,
                    windowWidth: e.globalData.SYSTIME_INFO.windowWidth,
                    timeText: I
                }
            });
        } else console.error("数据格式有误");
    },
    dateItemTap: function(t) {
        var n = this, o = t.target.dataset, d = o.index;
        if (d != this.data.secKill.activeDateIndex) {
            var l = new Date(this.data.secKill.timeArr[d][this.data.secKill.activeTimesIndex[d]]).getTime(), c = void 0, r = void 0;
            new Date().getTime() + e.globalData.ACT_TIME_DIFF < l ? (c = l, r = "离本场开始还有:") : (c = 1e3 * s, 
            r = "离本场结束还剩:"), this.countdown({
                endTime: c,
                timeKey: "clock." + i.id,
                isAct: !0,
                onEnd: function() {
                    n.getAct(n.data.actName);
                }
            }), this.setData({
                "secKill.activeDateIndex": d,
                "secKill.timeText": r
            }), a.sendEventData(o);
        }
    },
    timeItemTap: function(t) {
        var n = this, o = t.target.dataset, d = o.index;
        if (d != this.data.secKill.activeTimesIndex[this.data.secKill.activeDateIndex]) {
            this.data.secKill.activeTimesIndex[this.data.secKill.activeDateIndex] = d;
            var l = new Date(this.data.secKill.timeArr[this.data.secKill.activeDateIndex][d]).getTime(), c = void 0, r = void 0;
            new Date().getTime() + e.globalData.ACT_TIME_DIFF < l ? (c = l, r = "离本场开始还有:") : (c = 1e3 * s, 
            r = "离本场结束还剩:"), this.countdown({
                endTime: c,
                timeKey: "clock." + i.id,
                isAct: !0,
                onEnd: function() {
                    n.getAct(n.data.actName);
                }
            }), this.setData({
                "secKill.activeTimesIndex": this.data.secKill.activeTimesIndex,
                "secKill.timeText": r
            }), a.sendEventData(o);
        }
    },
    secKillCollectTap: function(t) {
        var a = this;
        if (e.checkLogin()) {
            var i = this, s = t.currentTarget.dataset;
            if (!s.favored) {
                var n = {
                    goodsCode: s.goodscode,
                    goodsId: s.goodsid,
                    salesType: s.salestype
                };
                this.addEnshrine(n).then(function(e) {
                    a.setGoodPropByProp(a.data.secKill.times, [ "d2", s.goodscode ], [ "favored", !0 ]), 
                    a.setData({
                        "secKill.times": a.data.secKill.times
                    }), i.showToastMsg("收藏成功，开抢前10分钟提醒你");
                }).catch(function(e) {
                    i.showToastMsg("收藏失败"), console.log(e);
                });
            }
        } else e.goLogin();
    }
};