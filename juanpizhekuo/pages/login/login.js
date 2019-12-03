var t = getApp(), e = require("../../utils/util.js"), i = require("../../utils/statistics"), n = require("../../components/error-msg/error-msg");

Page(e.mergePage({
    onLoad: function(t) {
        i.sendZhugePageData("进入登录页", {});
    },
    onShow: function() {
        var e = this;
        t.getAuth({
            withoutCheckLogin: !0
        }, function() {
            wx.getStorageSync("uid") && wx.navigateBack();
        }), wx.getSetting({
            success: function(i) {
                i.authSetting["scope.userInfo"] ? t.getAuth({
                    withoutCheckLogin: !0
                }, function() {
                    wx.getStorageSync("uid") && wx.navigateBack();
                }) : e.setData({
                    showPhone: !1
                });
            }
        }), i.sendPageData("page_login", "", "进入登录页");
    },
    loginCallback: function(e) {
        if (e.data && e.data.code && 1e3 == e.data.code) try {
            t.getAuth({
                withoutCheckLogin: !0
            }, function() {
                wx.navigateBack();
            });
        } catch (t) {
            console.log(t);
        } else this.showErrorMsg(e.data && e.data.info ? e.data.info : "网络异常");
        this.setData({
            loginDisabled: !1
        });
    },
    getUserInfo: function(t) {
        "getUserInfo:ok" == t.detail.errMsg ? this.onShow() : wx.openSetting({
            success: function(t) {
                t.authSetting["scope.userInfo"];
            }
        });
    },
    getPhoneNumber: function(n) {
        var a = this;
        n.detail.encryptedData ? (i.sendEventData({
            activity: "click_login_authorise_allow"
        }), wx.login({
            success: function(i) {
                var o = a, c = t.getPublicArg();
                c.code = i.code, c.session_id = wx.getStorageSync("session_id"), c.encryptedData = n.detail.encryptedData, 
                c.iv = n.detail.iv, c.apisign = t.createApisign(c), e.post({
                    url: t.globalData.URL_MUSER + "login/xcxQuickMobileCheck",
                    data: c,
                    complete: function(t) {
                        return o.loginCallback(t);
                    }
                }, !0);
            }
        })) : i.sendEventData({
            activity: "click_login_authorise_reject"
        });
    },
    goLogin: function() {
        wx.redirectTo({
            url: "/pages/handLogin/login"
        });
    }
}, n, i.pageEvents));