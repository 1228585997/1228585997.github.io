var a = getApp(), t = require("../../utils/util"), e = require("../../utils/statistics");

Page(t.mergePage({
    data: {
        nickName: "",
        img: "",
        personalHeadImg: "",
        groupId: "",
        shareAct: !1,
        type: 1,
        ranking: !0,
        AuthSuccess: !1,
        way: ""
    },
    onLoad: function(a) {
        this.data.way = a.way, wx.canIUse && wx.canIUse("showShareMenu") && wx.showShareMenu({
            withShareTicket: !0
        }), e.sendZhugePageData("进入签到领红包页", {});
    },
    init: function(a) {
        var t = this;
        if (e.getData("afterLogin") && e.getData("afterDecode")) {
            var n = "share" === a ? e.getData("open_gid") : "";
            t._init(n);
        } else setTimeout(function() {
            t.init(a);
        }, 100);
    },
    _init: function(a) {
        var t = this;
        t.checks(), wx.getUserInfo({
            success: function(e) {
                var n = e.userInfo, i = n.nickName, s = n.avatarUrl, o = {
                    nickName: i,
                    img: s
                }, c = t.data.type;
                a && (c = 2, o.shareAct = !0, o.type = c), t.setData(o), t.userInfoReadyCallback && t.userInfoReadyCallback(e), 
                t.getList(c, a, i, s);
            },
            fail: function() {
                console.log("getUserInfo fail");
            }
        });
    },
    onShow: function(a) {
        this.init(this.data.way), e.sendPageData("page_redenvelope_leaderboard", "", "进入签到领红包页");
    },
    getList: function(t, e, n, i) {
        var s = this;
        wx.request({
            url: a.globalData.URL_M + "xcxredpacket/redranking",
            method: "POST",
            data: {
                group: e,
                username: n,
                img: i,
                xcx_uid: wx.getStorageSync("uid"),
                xcx_sign: wx.getStorageSync("xcx_sign"),
                type: t
            },
            success: function(a) {
                if (1e3 == a.data.code) {
                    var t = a.data.data.list;
                    0 == t.today_sign ? s.setData({
                        ifqiandao: !0
                    }) : 1 == t.today_sign && s.setData({
                        ifqiandao: !1
                    }), s.setData({
                        sign_msg: t.sign_msg,
                        amount: t.amount || "0"
                    });
                    var e = a.data.data.ranking;
                    e && e.length && s.setData({
                        friendList: e
                    });
                }
            },
            fail: function(a) {
                console.log(a);
            }
        });
    },
    onShareAppMessage: function(t) {
        return a.setShare("签到红包排行榜，看看你排第几", "pages/hongbaoList/hongbaoList?way=share", function(a) {
            a && a.shareTickets && a.shareTickets.length;
        });
    },
    checks: function() {
        a.checkLogin() ? this.goAth(!0) : a.showAuthTip(this.goAth);
    },
    goAth: function(t) {
        (t || !1) && (a.checkLogin() ? this.setData({
            AuthSuccess: !0
        }) : wx.showModal({
            title: "友情提醒",
            content: "您还未登录，请先登录",
            complete: function(a) {
                a.confirm && wx.navigateTo({
                    url: "/pages/login/login"
                });
            }
        }));
    }
}, e.pageEvents));