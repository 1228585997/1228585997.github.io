var t = getApp(), e = 0, a = require("../../../utils/util"), n = require("../../../utils/statistics"), i = require("../../../components/toast/toast");

Page(a.mergePage({
    data: {
        cash_status: 0,
        cash_money: 0,
        nickname: "",
        add_time: 0,
        callback_time: 0
    },
    init: function(e) {
        t.checkLogin() ? this.get_cash_detail() : t.goLogin();
    },
    get_cash_detail: function() {
        var a = this, n = Object.assign({
            gc_id: e
        }, t.getPublicArg());
        n.apisign = t.createApisign(n), wx.request({
            url: t.globalData.URL_MAPI + "Distribution/get/cash/detail",
            method: "GET",
            data: n,
            success: function(e) {
                (e = e.data).code && "1000" === e.code ? a.setData({
                    cash_status: e.data.gc_status,
                    cash_money: e.data.gc_money,
                    nickname: e.data.gc_nickname,
                    add_time: a.dateFormat(e.data.gc_addTime, "yyyy-MM-dd hh:mm:ss"),
                    callback_time: a.dateFormat(e.data.gc_callbackTime, "yyyy-MM-dd hh:mm:ss")
                }) : e.code && "2001" === e.code && t.goLogin();
            }
        });
    },
    dateFormat: function(t, e) {
        var a = new Date(1e3 * t), n = {
            "M+": a.getMonth() + 1,
            "d+": a.getDate(),
            "h+": a.getHours(),
            "m+": a.getMinutes(),
            "s+": a.getSeconds(),
            "q+": Math.floor((a.getMonth() + 3) / 3),
            S: a.getMilliseconds()
        };
        /(y+)/.test(e) && (e = e.replace(RegExp.$1, (a.getFullYear() + "").substr(4 - RegExp.$1.length)));
        for (var i in n) new RegExp("(" + i + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? n[i] : ("00" + n[i]).substr(("" + n[i]).length)));
        return e;
    },
    onLoad: function(t) {
        e = t.id, this.init();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
}, n.pageEvents, i));