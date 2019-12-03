var t = getApp(), e = require("../../../utils/util"), i = (require("../../../utils/http"), 
require("../../../utils/statistics")), o = require("../../../components/toast/toast"), n = (require("../../../components/send-formid/index"), 
require("../../../components/vip-invite-goods/index")), a = require("../../../components/share/share");

Page(e.mergePage({
    data: {
        isLogin: t.checkLogin(),
        inviteNum: 0,
        vipType: 0,
        inviteCode: "",
        showShareModal: !1,
        showdetail: !1
    },
    onLoad: function(t) {
        wx.showLoading && wx.showLoading({
            title: "加载中"
        }), this.init(), this.data.isLogin || wx.hideShareMenu();
    },
    init: function() {
        var t = this;
        i.getData("afterLogin") ? this._init() : setTimeout(function() {
            t.init();
        }, 100);
    },
    _init: function() {
        var e = this;
        t.checkLogin() ? this.getUserInfo() : (wx.hideLoading && wx.hideLoading(), t.goLogin()), 
        e.getVIPGoodsInfo(), e.getNewGoodsInfo();
    },
    getUserInfo: function(e) {
        var i = this, o = t.getPublicArg();
        wx.request({
            url: t.globalData.URL_MAPI + "distribution/user/info",
            data: o,
            method: "get",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                var e = t.data, o = void 0 === e ? {} : e, n = o.info, a = o.code;
                if ("1000" === a) {
                    var s = o.data;
                    i.setData({
                        vipType: s.vipType,
                        inviteNum: s.inviteNum % 5,
                        inviteCode: s.inviteCode
                    });
                } else "2001" == a ? i.loginTip() : i.showToastMsg(n);
            },
            complete: function() {
                wx.hideLoading && wx.hideLoading(), e && wx.stopPullDownRefresh(), i.setData({
                    isLogin: t.checkLogin()
                });
            }
        });
    },
    loginTip: function(e) {
        var o = this;
        if (t.showAuthTip(function(e) {
            e && t.getAuth(null, function() {
                o.getUserInfo();
            });
        }), void 0 != e) {
            var n = e.currentTarget.dataset;
            n && n.activity && i.sendEventData(n);
        }
    },
    onShow: function() {
        i.sendPageData("page_activity_newuser");
    },
    onShareAppMessage: function(e) {
        var i = this.data.NEWgoods[0], o = [ {
            title: "送你5元优惠券，享券后价" + parseFloat(i.cprice - 5).toFixed(1) + "元购买" + i.title,
            img: i.pic_url
        }, {
            title: "还在等什么，购物可返现，一年省下一部手机。",
            img: "https://goods2.juancdn.com/seller/180626/e/b/5b31f674b6f8ea37094d5ff3_750x600.png"
        }, {
            title: "就差你了轻轻一点，帮我升级为VIP，享全平台购物平均返现15%。",
            img: "https://goods2.juancdn.com/seller/180626/3/0/5b31f690b6f8ea353475231d_750x600.png"
        } ];
        o = o[Math.floor(3 * Math.random())];
        var n = void 0 !== e.target ? e.target.dataset : {}, a = n.title, s = void 0 === a ? o.title : a, d = n.img, r = void 0 === d ? o.img : d, g = n.path, h = void 0 === g ? "pages/index/index?goto=" + encodeURIComponent("/pages/vip/inviteResult/index?inviteCode=" + this.data.inviteCode) : g, u = t.setShare(s, h, null, r);
        return this.setData({
            showShareModal: !1
        }), u;
    },
    onPullDownRefresh: function() {
        this.getUserInfo(!0);
    },
    copecode: function() {
        wx.setClipboardData({
            data: this.data.inviteCode
        });
    },
    showdetail: function() {
        this.setData({
            showdetail: !0
        });
    },
    closedetail: function() {
        this.setData({
            showdetail: !1
        });
    }
}, i.pageEvents, o, a, n));