var t = require("../../utils/util"), e = require("../../utils/statistics"), o = getApp();

module.exports = {
    loginCallback: function(t) {
        t.data && t.data.code && 1e3 == t.data.code ? this.goto() : wx.showToast({
            title: "网络异常",
            icon: "none"
        });
    },
    getOauthUserInfo: function(t) {
        var e = this;
        "getUserInfo:ok" == t.detail.errMsg ? e.goto() : wx.openSetting({
            success: function(t) {
                t.authSetting["scope.userInfo"] && e.goto();
            }
        });
    },
    goto: function() {
        var t = this;
        this.setData({
            showLoginModal: !1,
            isLogining: !0
        });
        var e = getCurrentPages(), i = e[e.length - 1];
        o.getAuth({}, function() {
            wx.setStorageSync("reloadIndex", !0), void 0 != i && null != i && (i.onShow({
                __type: 0
            }), t.setData({
                isLogining: !1
            }));
        });
    },
    getPhoneNumber: function(i) {
        var n = this;
        i.detail.encryptedData ? (e.sendEventData({
            activity: "click_login_authorise_allow"
        }), wx.login({
            success: function(e) {
                var a = n, s = o.getPublicArg();
                s.code = e.code, s.session_id = wx.getStorageSync("session_id"), s.encryptedData = i.detail.encryptedData, 
                s.iv = i.detail.iv, s.apisign = o.createApisign(s), t.post({
                    url: o.globalData.URL_MUSER + "login/xcxQuickMobileCheck",
                    data: s,
                    complete: function(t) {
                        return a.loginCallback(t);
                    }
                }, !0);
            }
        })) : e.sendEventData({
            activity: "click_login_authorise_reject"
        });
    },
    goLogin: function() {
        wx.navigateTo({
            url: "/pages/handLogin/login"
        });
    },
    showLoginModal: function() {
        var t = this, e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], o = this;
        wx.getSetting({
            success: function(i) {
                i.authSetting["scope.userInfo"] ? setTimeout(function() {
                    o.goto();
                }, 300) : t.setData({
                    showLoginModal: !0,
                    canClose: e
                });
            }
        });
    },
    hideLoginModal: function() {
        this.setData({
            showLoginModal: !1
        });
    }
};