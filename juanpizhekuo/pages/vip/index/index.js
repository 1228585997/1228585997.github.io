var e = getApp(), t = require("../../../utils/util"), n = (require("../../../utils/http"), 
require("../../../utils/statistics")), i = require("../../../components/toast/toast"), o = require("../../../components/countdown/countdown"), a = require("../../../components/send-formid/index"), s = require("../../../components/vip-invite-goods/index"), r = require("../../../components/share/share"), c = t.mergePage({
    data: {
        isLogin: e.checkLogin(),
        ready: !1,
        vipType: "0",
        inviteNum: 0,
        ruleShow: !1,
        showdetail: !1
    },
    onLoad: function(e) {
        wx.showLoading && wx.showLoading({
            title: "加载中"
        }), this.init(), this.data.isLogin || wx.hideShareMenu();
    },
    onShow: function() {
        n.sendPageData("page_free_vip");
    },
    init: function() {
        var e = this;
        n.getData("afterLogin") ? this._init() : setTimeout(function() {
            e.init();
        }, 100);
    },
    _init: function() {
        e.checkLogin() ? this.getUserInfo() : this.setData({
            ready: !0
        });
    },
    getUserInfo: function(n) {
        var i = this, o = e.getPublicArg();
        this.getVIPGoodsInfo(), this.getNewGoodsInfo(), wx.request({
            url: e.globalData.URL_MAPI + "distribution/user/info",
            data: o,
            method: "get",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                var n = e.data, o = void 0 === n ? {} : n;
                wx.hideLoading && wx.hideLoading();
                var a = o.info, s = o.code;
                if ("1000" === s) {
                    var r = o.data;
                    if (i.setData({
                        vipType: r.vipType,
                        inviteNum: r.inviteNum,
                        inviteCode: r.inviteCode,
                        notice: r.notice || {},
                        orderNum: r.orderNum || 0
                    }), "0" != r.vipType) {
                        var c = void 0, d = void 0;
                        switch (r.vipType) {
                          case "1":
                            c = "有效期至：" + t.formatDate(new Date(1e3 * r.endTime), "yyyy年MM月dd日"), d = "new_vip";
                            break;

                          case "2":
                            c = "会员有效期：永久有效", d = "new_supervip";
                            break;

                          case "3":
                            c = "您的VIP会员已过期", d = "new_expirevip";
                        }
                        i.setData({
                            nickName: wx.getStorageSync("wxname") || r.nickName,
                            endTimeStr: c,
                            avatar: wx.getStorageSync("avatarUrl") || r.avatar,
                            totalIncome: r.totalIncome,
                            pendingIncome: r.pendingIncome,
                            shareIncome: r.shareIncome,
                            selfIncome: r.selfIncome,
                            vipImg: "https://jp.juancdn.com/wxMapp/new-vip/" + d + ".png",
                            balance: r.balance,
                            fansNum: r.fansNum
                        });
                    } else wx.setNavigationBarTitle({
                        title: "免费升级VIP"
                    });
                } else "2001" == s ? i.loginTip() : i.showToastMsg(a);
            },
            complete: function() {
                wx.hideLoading && wx.hideLoading(), n && wx.stopPullDownRefresh(), i.setData({
                    ready: !0,
                    isLogin: e.checkLogin()
                });
            }
        });
    },
    loginTip: function(e) {
        if (this.showLoginModal(), e) {
            var t = e.currentTarget.dataset;
            t && t.activity && n.sendEventData(t);
        }
    },
    onPullDownRefresh: function() {
        this.getUserInfo(!0);
    },
    showRule: function(e) {
        var t = e.currentTarget.dataset;
        n.sendEventData(t), wx.showModal({
            title: "什么是VIP有效期？",
            content: "成功邀请5位好友即可升级为VIP，VIP有效期为30天。之后每邀请5位好友，VIP有效期延长30天。\r\n VIP有效期最长只能为365天，之后邀请的好友会在每邀请5位后补满365天。",
            showCancel: !1,
            confirmText: "我知道了"
        });
    },
    showTime: function(e) {
        var t = e.currentTarget.dataset;
        n.sendEventData(t), wx.showModal({
            title: "如何延长VIP有效期？",
            content: "每邀请5位好友，VIP有效期延长30天。\r\n 成功自购5件商品后，VIP有效期延长15天。",
            showCancel: !1,
            confirmText: "我知道了"
        });
    },
    noticeTap: function() {
        1 == this.data.notice.event ? wx.showModal({
            title: "",
            content: this.data.notice.txt,
            confirmText: "我知道了",
            confirmColor: "#ff464e",
            showCancel: !1,
            success: function(e) {}
        }) : 2 == this.data.notice.event && wx.navigateTo({
            url: this.data.notice.url
        });
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
    },
    shownotice: function() {
        wx.showModal({
            title: "通知",
            content: "亲爱的卷皮会员：自小程序VIP上线以来，非常感谢各位的关注与支持！由于平台业务调整，将于2018年7月21日起，停止VIP续期服务和新VIP注册服务。在2018年7月21前已属于VIP的用户，继续享受VIP商品及返利服务，提现规则不变。请及时享受VIP特权。",
            showCancel: !1
        });
    }
}, n.pageEvents, i, o, a, s, r);

Page(c), module.exports = c;