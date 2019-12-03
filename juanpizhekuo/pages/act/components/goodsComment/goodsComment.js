function t(t, e, o) {
    return e in t ? Object.defineProperty(t, e, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = o, t;
}

var e = getApp(), o = (require("../../../../utils/util"), void 0), n = void 0, i = void 0;

module.exports = {
    goodsCommentTransformData: function(t, o) {
        var n = this, i = 0;
        t.bg.src = this.getImageUrl(t.bg.src), t.list = [ {
            bg: t.bg,
            title: t.title,
            goods_ids: t.goods_ids
        } ].concat(t.list);
        var s = t.list.length;
        if (s > 1) for (var a = new Date().getTime() + e.globalData.ACT_TIME_DIFF, r = 1; r < s; r++) t.list[r].bg.src = this.getImageUrl(t.list[r].bg.src), 
        t.list[r].time && a > t.list[r].time && (i = r);
        return n.checkGcRounds(i, t.list, t.id, o), t;
    },
    checkGcRounds: function(t, e, o, n) {
        var i = this, s = e.length, a = e[t];
        i.setData({
            curGcRound: t
        }), i.getComments(a.goods_ids, n), s > 1 && e[t + 1].time && t + 1 < s && i.countdown({
            endTime: e[t + 1].time,
            timeKey: "clock." + o,
            isAct: !0,
            onEnd: function() {
                i.checkGcRounds(t + 1, e, o, n);
            }
        });
    },
    getComments: function(t, s) {
        var a = this;
        if (!t) return !1;
        wx.request({
            url: e.globalData.URL_MACT + s + "-goodsComment",
            data: {
                goodsId: t
            },
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                var e = t.data, s = void 0 === e ? {} : e;
                if (1e3 == s.code) {
                    var r = a.transformComment(s.data);
                    o = r.length, n = 0, a.setData({
                        goodsComments: r
                    }), o > 3 && setTimeout(function() {
                        a.setGcAnimation();
                    }, 4e3), i && clearTimeout(i);
                }
            }
        });
    },
    setGcAnimation: function() {
        var e = this;
        n + 3 < o ? n++ : n = 0, setTimeout(function() {
            var o = wx.createAnimation({
                duration: 450
            }).top("-" + 40 * n + "rpx").step();
            e.setData(t({}, "gcAnimation", o.export()));
        }, 50), i = setTimeout(function() {
            e.setGcAnimation();
        }, 2500);
    },
    transformComment: function(t) {
        var e = [];
        return t.forEach(function(t) {
            var o = "/pages/shop/shop?id=" + t.goods_id, n = t.comment.map(function(t, e) {
                return {
                    href: o,
                    comment: t
                };
            });
            e = e.concat(n);
        }), e;
    }
};