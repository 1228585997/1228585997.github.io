var t = getApp(), a = require("../../../utils/util.js"), e = require("../../../utils/statistics");

Page(a.mergePage({
    data: {
        animationData: {},
        alertShow: !1,
        afterRequest: !1,
        ruleShow: !1,
        luckying: !1,
        nomoreNum: 3,
        alertData: {
            type: "",
            sort: ""
        },
        shareNum: 0,
        luckyArr: [],
        activeId: "",
        myLuckyArr: [],
        heLuckyArr: [],
        msgBtn: "he"
    },
    onLoad: function() {
        this.getWheelLottery();
    },
    onShow: function() {
        this.init();
    },
    init: function() {
        var t = this;
        e.getData("afterLogin") && this.data.activeId ? this._init() : setTimeout(function() {
            t.init();
        }, 100);
    },
    _init: function() {
        if (this.getHeLucky(), !t.checkLogin()) return !1;
        this.getLuckyNum(), this.getMyLucky();
    },
    ruleBtn: function() {
        this.setData({
            alertShow: !0,
            ruleShow: !0
        });
    },
    turnplateInit: function() {
        var t = wx.createAnimation({
            duration: 30,
            timingFunction: "step-start"
        });
        this.animation = t, t.rotate(0).step(), this.setData({
            animationData: t.export()
        });
    },
    turnplateLucky: function(t) {
        var a = this, e = wx.createAnimation({
            duration: 3500,
            timingFunction: "ease"
        });
        e.rotate(1800 + t).step(), this.setData({
            nomoreNum: --this.data.nomoreNum,
            animationData: e.export()
        }), setTimeout(function() {
            a.getMyLucky(), a.setData({
                alertShow: !0,
                afterRequest: !0
            });
        }, 4e3);
    },
    luckyBtn: function() {
        var a = this;
        return t.checkLogin() ? 0 == this.data.nomoreNum ? (this.setData({
            alertShow: !0,
            afterRequest: !1
        }), !1) : (this.setData({
            luckying: !0
        }), void this.getLucky()) : (t.goLogin(function() {
            a._init();
        }), !1);
    },
    msgNav: function(t) {
        var a = t.target.dataset.msg;
        if (this.data.msgBtn == a) return !1;
        this.setData({
            msgBtn: a
        });
    },
    closeAlert: function() {
        this.turnplateInit(), this.setData({
            alertShow: !1,
            ruleShow: !1,
            luckying: !1
        });
    },
    getWheelLottery: function() {
        var a = this;
        if (this.data.activeId) return !1;
        var e = t.getPublicArg();
        e.apisign = t.createApisign(e), wx.request({
            url: t.globalData.URL_MACT + "WheelLottery-opts",
            data: e,
            method: "GET",
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                1e3 == t.data.code ? a.setData({
                    activeId: t.data.id,
                    luckyArr: t.data.opts
                }) : 1012 == t.data.code && wx.redirectTo({
                    url: "/pages/act/jieshu/index"
                });
            }
        });
    },
    getLucky: function() {
        var a = this, e = t.getPublicArg();
        e.id = this.data.activeId, e.apisign = t.createApisign(e), wx.request({
            url: t.globalData.URL_MACT + "WheelLottery-lottery",
            data: e,
            method: "GET",
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                if (1e3 == t.data.code) {
                    var e = a.getRandomIntInclusive(2, 42);
                    a.setData({
                        order: t.data.order ? t.data.order : "",
                        alertData: {
                            type: t.data.type,
                            sort: t.data.sort
                        }
                    }), a.turnplateLucky(45 * (t.data.sort - 1) + e), 5 != t.data.type && a.getMyLucky();
                }
            }
        });
    },
    getLuckyNum: function() {
        var a = this, e = t.getPublicArg();
        e.id = this.data.activeId, e.apisign = t.createApisign(e), wx.request({
            url: t.globalData.URL_MACT + "WheelLottery-uinfo",
            data: e,
            method: "GET",
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                1e3 == t.data.code && a.setData({
                    nomoreNum: t.data.times,
                    shareNum: t.data.shareNum
                });
            }
        });
    },
    getMyLucky: function() {
        var a = this, e = t.getPublicArg();
        e.id = this.data.activeId, e.apisign = t.createApisign(e), wx.request({
            url: t.globalData.URL_MACT + "WheelLottery-uwin",
            data: e,
            method: "GET",
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                if (1e3 == t.data.code) {
                    t.data.code;
                    var e = t.data.data.length, i = t.data.data, n = [];
                    e && (n = i.map(function(t) {
                        return t.time = a.timeToDate(t.time), t;
                    }), a.setData({
                        myLuckyArr: n
                    }));
                }
            }
        });
    },
    getHeLucky: function() {
        var a = this, e = t.getPublicArg();
        e.id = this.data.activeId, e.apisign = t.createApisign(e), wx.request({
            url: t.globalData.URL_MACT + "WheelLottery-latestwin",
            data: e,
            method: "GET",
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                if (1e3 == t.data.code) {
                    var e = t.data, i = t.data.data.length, n = (t.data.code, []);
                    i && (n = e.data.map(function(t) {
                        return t.time = a.timeToDate(t.time), t;
                    }), a.setData({
                        heLuckyArr: n
                    }));
                }
            }
        });
    },
    timeToDate: function(t) {
        t = t < 1e12 ? 1e3 * t : t;
        var a = new Date(t);
        return a.getFullYear() + "-" + this.paddingLeft(a.getMonth() + 1) + "-" + this.paddingLeft(a.getDate()) + " " + this.paddingLeft(a.getHours()) + ":" + this.paddingLeft(a.getMinutes());
    },
    paddingLeft: function(t) {
        return t < 10 ? "0" + t : t;
    },
    getShareLucky: function() {
        var a = this, e = t.getPublicArg();
        e.id = this.data.activeId, e.apisign = t.createApisign(e), wx.request({
            url: t.globalData.URL_MACT + "WheelLottery-share",
            data: e,
            method: "GET",
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                1e3 == t.data.code && a.setData({
                    nomoreNum: ++a.data.nomoreNum,
                    shareNum: ++a.data.shareNum
                });
            }
        });
    },
    getRandomIntInclusive: function(t, a) {
        return t = Math.ceil(t), a = Math.floor(a), Math.floor(Math.random() * (a - t + 1)) + t;
    },
    onShareAppMessage: function() {
        var a = this;
        return this.data.alertShow && this.closeAlert(), t.setShare("卷皮大转盘，免费抽豆浆机，还有大量无门槛券任意抽~", "pages/activity/turnplate/turnplate", function(t) {
            a.data.shareNum < 3 && a.getShareLucky();
        }, "https://goods4.juancdn.com/act/180129/7/e/5a6e99808150a15d750d72d9_750x600.png");
    }
}, e.pageEvents));