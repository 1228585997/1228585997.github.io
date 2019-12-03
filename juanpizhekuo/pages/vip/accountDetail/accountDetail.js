var t = getApp(), a = 1, e = !1, i = require("../../../utils/util"), n = require("../../../utils/statistics"), o = require("../../../components/toast/toast");

Page(i.mergePage({
    data: {
        amountAll: 0,
        countList: []
    },
    onLoad: function(t) {
        e = !1, a = 1, this.init();
    },
    onShow: function() {
        n.sendPageData("page_balance_detail");
    },
    init: function(a) {
        t.checkLogin() ? this.balanceDetail() : t.goLogin();
    },
    onPullDownRefresh: function() {
        this.data = {
            amountAll: 0,
            countList: []
        }, this.balanceDetail();
    },
    balanceDetail: function() {
        var i = this, n = Object.assign({
            page: a
        }, t.getPublicArg());
        n.apisign = t.createApisign(n), wx.request({
            url: t.globalData.URL_MAPI + "distribution/cash/flow",
            data: n,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            complete: function(t) {
                var n = t.data, o = void 0 === n ? {} : n;
                if (1e3 == o.code) {
                    e = !1;
                    var s = [], r = void 0, d = void 0, l = void 0, c = void 0, u = void 0, g = void 0, h = void 0;
                    o.data.length < 1 && i.showToastMsg("我是有底线的。", 2e3, null, "");
                    for (var v = 0; v < o.data.length; v++) {
                        var p = o.data;
                        r = p[v].cash_id, d = p[v].amount, l = p[v].trade_msg, c = p[v].add_time, c = i.dateFormat(c, "yyyy-MM-dd hh:mm:ss"), 
                        u = p[v].type, h = p[v].balance, 3 == u ? (u = "-", g = "moneyGetSub") : (u = "+", 
                        g = "moneyGetAdd");
                        var m = {
                            amout: d,
                            trade_msg: l,
                            add_time: c,
                            direction: u,
                            fontclass: g,
                            cash_id: r,
                            balance: h
                        };
                        if (p[v].valid > 0 && "8.80" == p[v].amount) {
                            var f = i.dateFormat(p[v].valid, "yyyy.MM.dd");
                            m.valid = f;
                        }
                        s.push(m);
                    }
                    var b = i;
                    i.setData({
                        countList: b.data.countList.concat(s)
                    });
                } else e = !0, a = 1;
            }
        });
    },
    scrollGetList: function(t) {
        a && !e && (a++, this.balanceDetail());
    },
    withdrawClick: function(t) {
        var a = t.currentTarget.dataset;
        if (a.id) {
            var e = parseInt(a.id);
            isNaN(e) || e <= 0 || wx.navigateTo({
                url: "/pages/user/cash/cash-result?id=" + e
            });
        }
    },
    dateFormat: function(t, a) {
        var e = new Date(1e3 * t), i = {
            "M+": e.getMonth() + 1,
            "d+": e.getDate(),
            "h+": e.getHours(),
            "m+": e.getMinutes(),
            "s+": e.getSeconds(),
            "q+": Math.floor((e.getMonth() + 3) / 3),
            S: e.getMilliseconds()
        };
        /(y+)/.test(a) && (a = a.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length)));
        for (var n in i) new RegExp("(" + n + ")").test(a) && (a = a.replace(RegExp.$1, 1 == RegExp.$1.length ? i[n] : ("00" + i[n]).substr(("" + i[n]).length)));
        return a;
    }
}, n.pageEvents, o));