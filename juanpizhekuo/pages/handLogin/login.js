var t = getApp(), a = require("../../utils/util.js"), e = require("../../utils/statistics"), i = require("../../components/error-msg/error-msg"), o = void 0;

Page(a.mergePage({
    data: {
        authCodeDisabled: !0,
        authCodeText: "获取验证码",
        loginDisabled: !0
    },
    onLoad: function(t) {
        e.sendZhugePageData("进入验证手机页", {});
    },
    onShow: function() {},
    getAuthCode: function() {
        var a = this;
        this.data.authCodeDisabled || (a.setData({
            authCodeDisabled: !0
        }), t.getAuthCode({
            phone: this.data.phone,
            complete: function(t) {
                if (t.data && t.data.code && 1e3 == t.data.code) {
                    var e = t.data.data.limit_time;
                    a.setData({
                        authCodeText: "重新发送(" + e + ")"
                    }), function t(e) {
                        e > 0 ? (o && clearTimeout(o), o = setTimeout(function() {
                            a.setData({
                                authCodeText: "重新发送(" + --e + ")"
                            }), t(e);
                        }, 1e3)) : a.setData({
                            authCodeDisabled: !1,
                            authCodeText: "获取验证码"
                        });
                    }(parseInt(e));
                } else a.showErrorMsg(t.data && t.data.info ? t.data.info : "获取验证码失败，请重试"), a.setData({
                    authCodeDisabled: !1
                });
            }
        }), e.sendEventData({
            activity: "click_login_requet_verifycode",
            activityparam: this.data.phone
        }));
    },
    getPhone: function(t) {
        var e = t.detail.value;
        this.setData({
            phone: e,
            authCodeDisabled: !a.isMobile(e)
        });
    },
    formSubmit: function(i) {
        var o = i.detail.value, n = t.getPublicArg();
        n.session_id = wx.getStorageSync("session_id");
        var s = Object.assign({}, o, n);
        s.apisign = t.createApisign(s);
        var l = this;
        this.setData({
            loginDisabled: !0
        }), a.post({
            url: t.globalData.URL_MUSER + "login/phoneQlogin",
            data: s,
            complete: function(t) {
                return l.loginCallback(t);
            }
        }, !0), e.sendEventData({
            activity: "click_mobile_login_btn",
            activityparam: this.data.phone
        });
    },
    checkLength: function(t) {
        6 === t.detail.value.length ? this.setData({
            loginDisabled: !1
        }) : this.setData({
            loginDisabled: !0
        });
    },
    loginCallback: function(a) {
        if (a.data && a.data.code && 1e3 == a.data.code) try {
            t.getAuth({
                withoutCheckLogin: !0
            }, function() {
                wx.navigateBack();
            });
        } catch (t) {
            console.log(t);
        } else this.showErrorMsg(a.data && a.data.info ? a.data.info : "网络异常");
        this.setData({
            loginDisabled: !1
        });
    },
    getPhoneNumber: function(i) {
        var o = this;
        i.detail.encryptedData ? (e.sendEventData({
            activity: "click_login_authorise_allow"
        }), wx.login({
            success: function(e) {
                var n = o, s = t.getPublicArg();
                s.code = e.code, s.session_id = wx.getStorageSync("session_id"), s.encryptedData = i.detail.encryptedData, 
                s.iv = i.detail.iv, s.apisign = t.createApisign(s), a.post({
                    url: t.globalData.URL_MUSER + "login/xcxQuickMobileCheck",
                    data: s,
                    complete: function(t) {
                        return n.loginCallback(t);
                    }
                }, !0);
            }
        })) : e.sendEventData({
            activity: "click_login_authorise_reject"
        });
    }
}, i, e.pageEvents));