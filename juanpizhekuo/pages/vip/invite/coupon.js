var t = getApp(), i = require("../../../utils/util"), n = (require("../../../utils/http"), 
require("../../../utils/statistics")), e = require("../../../components/toast/toast"), o = (require("../../../components/send-formid/index"), 
require("../../../components/vip-invite-goods/index"));

Page(i.mergePage({
    data: {},
    onLoad: function(t) {
        wx.showLoading && wx.showLoading({
            title: "加载中"
        }), this.init(), this.data.isLogin || wx.hideShareMenu();
    },
    init: function() {
        var t = this;
        n.getData("afterLogin") ? this._init() : setTimeout(function() {
            t.init();
        }, 100);
    },
    _init: function() {
        t.checkLogin() ? this.getUserInfo() : (wx.hideLoading && wx.hideLoading(), t.goLogin()), 
        this.getNewGoodsInfo();
    },
    getUserInfo: function(i) {
        var n = this, e = t.getPublicArg();
        wx.request({
            url: t.globalData.URL_MAPI + "distribution/user/info",
            data: e,
            method: "get",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            complete: function() {
                wx.hideLoading && wx.hideLoading(), i && wx.stopPullDownRefresh(), n.setData({
                    isLogin: t.checkLogin()
                });
            }
        });
    },
    loginTip: function(i) {
        var e = this;
        if (t.showAuthTip(function(i) {
            i && t.getAuth(null, function() {
                e.getUserInfo();
            });
        }), void 0 != i) {
            var o = i.currentTarget.dataset;
            o && o.activity && n.sendEventData(o);
        }
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    formSubmit: function(t) {
        var i = t.detail.value.code;
        !i || i.length < 5 ? wx.showToast({
            title: "请输入正确的邀请码!",
            icon: "none",
            mask: !0
        }) : wx.navigateTo({
            url: "/pages/vip/inviteResult/index?inviteCode=" + i
        });
    },
    formReset: function() {}
}, n.pageEvents, e, o));