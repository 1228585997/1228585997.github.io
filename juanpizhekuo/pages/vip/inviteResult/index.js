var t = getApp(), i = void 0, e = require("../../../utils/util"), n = (require("../../../utils/http"), 
require("../../../utils/statistics")), o = require("../../../components/toast/toast"), a = require("../../../components/send-formid/index"), s = require("../../../components/vip-invite-goods/index"), d = require("../../../components/share/share");

Page(e.mergePage({
    data: {
        isLogin: t.checkLogin(),
        ready: !1,
        type: -6,
        leftNumber: 0,
        showdetail: !1
    },
    onLoad: function(t) {
        wx.showLoading && wx.showLoading({
            title: "加载中"
        }), i = t.inviteCode || wx.getStorageSync("otherInviteCode"), this.init(), this.data.isLogin || wx.hideShareMenu();
    },
    onShow: function() {
        n.sendPageData("page_vip_share");
    },
    init: function() {
        var t = this;
        n.getData("afterLogin") ? this._init() : setTimeout(function() {
            t.init();
        }, 100);
    },
    _init: function() {
        var i = this;
        t.checkLogin() ? this.getRecommendInfo() : (wx.hideLoading && wx.hideLoading(), 
        this.showLoginModal(), this.setData({
            ready: !0
        })), i.getNewGoodsInfo();
    },
    getRecommendInfo: function(t) {
        return;
    },
    loginTip: function(t) {
        this.showLoginModal(), n.sendEventData({
            activity: "click_invite",
            activityparam: ""
        });
    },
    onPullDownRefresh: function() {
        this.getRecommendInfo(!0);
    },
    gotoIndex: function() {
        wx.switchTab({
            url: "../../index/index"
        }), n.sendEventData({
            activity: "click_temai_stroll",
            activityparam: ""
        });
    },
    onShareAppMessage: function(i) {
        var e = void 0 !== i.target ? i.target.dataset : {}, n = e.title, o = void 0 === n ? "快来帮我！我马上要成为VIP了！关键时刻还是要靠你。" : n, a = e.img, s = void 0 === a ? "https://jp.juancdn.com/wxMapp/vip/share.png" : a, d = e.path, r = void 0 === d ? "pages/vip/inviteResult/index?inviteCode=" + this.data.inviteCode : d;
        return t.setShare(o, r, null, s);
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
}, n.pageEvents, o, a, s, d));