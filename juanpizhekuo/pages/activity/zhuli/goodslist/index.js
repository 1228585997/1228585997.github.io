var t = getApp(), o = require("../../../../utils/util"), e = require("../../../../components/login-modal/index");

Page(o.mergePage({
    data: {
        count: 0,
        goods: [ {
            title: "afsfdasfasd",
            pic_url: "https://goods1.juancdn.com/bao/170703/1/3/5959d93e8150a1019d75e843_800x800.jpg?iopcmd=thumbnail&type=11&height=285&width=285%7Ciopcmd=convert&Q=88&dst=jpg",
            oprice: "19.9",
            send_status: "已发货",
            delivery_no: "2132312fsfafsdf"
        }, {
            title: "afsfdasfasd",
            pic_url: "https://goods1.juancdn.com/bao/170703/1/3/5959d93e8150a1019d75e843_800x800.jpg?iopcmd=thumbnail&type=11&height=285&width=285%7Ciopcmd=convert&Q=88&dst=jpg",
            oprice: "19.9",
            send_status: "未发货",
            delivery_no: ""
        } ]
    },
    onLoad: function(o) {
        var e = this;
        t.checkLogin() ? (wx.showLoading({
            title: "加载中",
            mask: !0,
            success: function() {
                e.getGoodsList();
            }
        }), wx.hideLoading()) : this.showLoginModal(!1);
    },
    getGoodsList: function() {
        var o = this, e = {
            spread_uid: wx.getStorageSync("uid")
        };
        wx.request({
            url: t.globalData.URL_MAPI + "act/my_exchange",
            data: e,
            method: "GET",
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                var e = t.data, i = void 0 === e ? {} : e;
                if (i && 1e3 == i.code && i.data) {
                    var a = i.data.total, d = i.data.data;
                    a > 0 && o.setData({
                        count: a,
                        goods: d
                    });
                }
            },
            complete: function() {}
        });
    },
    gotoZhuliIndex: function() {
        wx.redirectTo({
            url: "/pages/activity/zhuli/index"
        });
    },
    gotoGoodsListIndex: function() {
        wx.redirectTo({
            url: "/pages/activity/zhuli/goodslist/index"
        });
    }
}, e));