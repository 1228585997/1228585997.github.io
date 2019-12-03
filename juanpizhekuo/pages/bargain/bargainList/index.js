var t = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var n = arguments[a];
        for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
    }
    return t;
}, a = require("../utils/consts"), n = require("../utils/tools"), o = n.request, s = n.toast, i = require("../../../components/login-modal/index"), e = getApp();

Page(t({}, i, {
    data: t({}, a, {
        everShowedMyBargains: !1,
        tab: 0,
        goodsListData: [],
        myBargainsData: [],
        users: []
    }),
    fetchGoodsList: function() {
        var t = this;
        return o({
            url: "https://mapi.juanpi.com/Cutdown/goods"
        }).then(function(a) {
            t.setData({
                goodsListData: a.list || []
            });
        }).catch(function(t) {
            s(t);
        });
    },
    fetchMyBargains: function() {
        var t = this;
        return o({
            url: "https://mapi.juanpi.com/Cutdown/my"
        }).then(function(a) {
            var n = a || {}, o = n.list, s = void 0 === o ? [] : o, i = n.username, e = void 0 === i ? [] : i;
            t.setData({
                myBargainsData: s,
                users: e
            });
        }).catch(function(t) {
            s(t);
        });
    },
    onLoad: function(t) {
        var a = this;
        e.checkLogin() ? wx.showLoading({
            title: "加载中",
            mask: !0,
            success: function() {
                a.fetchGoodsList().then(function() {
                    wx.hideLoading();
                });
            }
        }) : this.showLoginModal(!1);
    },
    onTapBottomButton: function(t) {
        var a = t.currentTarget.dataset.order;
        if (this.data.everShowedMyBargains || 1 != a) this.setData({
            tab: a
        }); else {
            var n = this;
            wx.showLoading({
                title: "加载中",
                mask: !0,
                success: function() {
                    n.fetchMyBargains().then(function() {
                        wx.hideLoading(), n.setData({
                            tab: a,
                            everShowedMyBargains: !0
                        });
                    });
                }
            });
        }
    }
}));