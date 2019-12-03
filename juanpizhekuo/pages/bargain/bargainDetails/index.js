var t = Object.assign || function(t) {
    for (var o = 1; o < arguments.length; o++) {
        var a = arguments[o];
        for (var e in a) Object.prototype.hasOwnProperty.call(a, e) && (t[e] = a[e]);
    }
    return t;
}, o = require("../utils/tools"), a = o.request, e = o.toast, i = require("../../../components/login-modal/index"), n = getApp();

Page(t({}, i, {
    data: {
        cid: null,
        goods_id: null,
        goodsList: [],
        showError: !1,
        activityState: 1,
        remainingSeconds: 0,
        showQR: !1,
        showRules: !1,
        congMsg: "",
        data: null
    },
    closeCong: function() {
        this.setData({
            congMsg: ""
        });
    },
    closeQR: function() {
        this.setData({
            showQR: !1
        });
    },
    closeRules: function() {
        this.setData({
            showRules: !1
        });
    },
    fetchDetails: function(t) {
        var o = this, e = t.cid, i = t.goods_id;
        return a({
            url: "https://mapi.juanpi.com/Cutdown/cut",
            data: {
                cid: e,
                goods_id: i,
                openid: wx.getStorageSync("openid")
            }
        }).then(function(t) {
            return o.setData({
                data: t,
                congMsg: t.reduced
            }), t;
        });
    },
    fetchGoods: function(t) {
        var o = this;
        return a({
            url: "https://mapi.juanpi.com/Cutdown/goods"
        }).then(function(a) {
            var e = a.list, i = void 0 === e ? [] : e, n = (t || {}).goods, s = (void 0 === n ? {} : n).goods_id, r = i.filter(function(t) {
                return t.goods_id != s;
            });
            return o.setData({
                goodsList: r
            }), {
                detailsData: t,
                goodsData: r
            };
        });
    },
    onLoad: function(t) {
        var o = this, a = t.cid, i = void 0 === a ? null : a, s = t.goods_id, r = void 0 === s ? null : s;
        this.setData({
            cid: i,
            goods_id: r
        }), n.checkLogin() ? wx.showLoading({
            title: "加载中",
            mask: !0,
            success: function() {
                o.fetchDetails({
                    cid: i,
                    goods_id: r
                }).then(function(t) {
                    return o.fetchGoods(t);
                }).then(function(t) {
                    var a = t.detailsData, i = (t.goodsData, a.status), n = a.end_time, s = a.toast;
                    if (s && e(s), 2 == i) o.setData({
                        activityState: 0
                    }); else {
                        var r = 1 * n;
                        if (!isNaN(r)) {
                            var d = r - Math.floor(Date.now() / 1e3);
                            o.setData({
                                remainingSeconds: d
                            }), o.timer = setInterval(function() {
                                d <= 0 ? (clearInterval(o.timer), o.setData({
                                    remainingSeconds: 0,
                                    activityState: 0
                                })) : (d--, o.setData({
                                    remainingSeconds: d
                                }));
                            }, 1e3);
                        }
                    }
                }).catch(function(t) {
                    o.setData({
                        showError: !0
                    }), e(t);
                }).then(function() {
                    wx.hideLoading();
                });
            }
        }) : this.showLoginModal(!1);
    },
    onShareAppMessage: function() {
        var t = this.data.data.share;
        return {
            title: t.title,
            imageUrl: t.image,
            path: t.url
        };
    },
    toShowQR: function() {
        this.setData({
            showQR: !0
        });
    },
    toShowRules: function() {
        this.setData({
            showRules: !0
        });
    }
}));