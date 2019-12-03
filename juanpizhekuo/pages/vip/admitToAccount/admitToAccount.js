var t = getApp(), i = 1, e = !1, a = require("../../../utils/util"), s = require("../../../utils/statistics"), n = require("../../../components/toast/toast");

Page(a.mergePage({
    data: {
        ifShowRule: !1,
        totalMoney: 0,
        list: []
    },
    onLoad: function(t) {
        e = !1, i = 1, this.init();
    },
    onShow: function() {
        s.sendPageData("page_enter_account");
    },
    init: function(i) {
        t.checkLogin() ? this.incomeList() : t.goLogin();
    },
    incomeList: function() {
        var a = this, s = this, n = Object.assign({
            type: 1,
            p: i
        }, t.getPublicArg());
        n.apisign = t.createApisign(n), wx.request({
            url: t.globalData.URL_MAPI + "Distribution/income/list",
            data: n,
            method: "GET",
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                var n = t.data, o = void 0 === n ? {} : n;
                1e3 == o.code && o.data.lists && o.data.lists.length > 0 ? (e = !1, a.setData({
                    totalMoney: o.data.totalMoney,
                    list: s.data.list.concat(o.data.lists)
                })) : (e = !0, i = 1);
            }
        });
    },
    scrollGetList: function(t) {
        i && !e && (i++, this.incomeList());
    },
    showRule: function(t) {
        var i = t.currentTarget.dataset;
        this.setData({
            ifShowRule: !0
        }), s.sendEventData(i);
    },
    closeRule: function() {
        this.setData({
            ifShowRule: !1
        });
    }
}, s.pageEvents, n));