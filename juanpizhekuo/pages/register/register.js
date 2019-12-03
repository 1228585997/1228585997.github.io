var t = getApp(), a = require("../../utils/util.js"), e = require("../../utils/statistics"), o = require("../../components/error-msg/error-msg"), d = void 0;

Page(a.mergePage({
    data: {
        authCodeDisabled: !1,
        authCodeText: "获取验证码",
        loginDisabled: !0
    },
    onLoad: function(t) {
        this.setData({
            phone: t.mobile
        }), e.sendZhugePageData("进入注册页", {});
    },
    getAuthCode: function() {
        var a = this;
        this.data.authCodeDisabled || (a.setData({
            authCodeDisabled: !0
        }), t.getAuthCode({
            phone: this.data.phone,
            complete: function(t) {
                if (t.data && t.data.code && 1e3 === t.data.code) {
                    var e = t.data.limit_time;
                    a.setData({
                        authCodeText: "重新发送(" + e + ")"
                    }), function t(e) {
                        e > 0 ? (d && clearTimeout(d), d = setTimeout(function() {
                            a.setData({
                                authCodeText: "重新发送(" + --e + ")"
                            }), t(e);
                        }, 1e3)) : a.setData({
                            authCodeDisabled: !1,
                            authCodeText: "获取验证码"
                        });
                    }(parseInt(e));
                } else a.showErrorMsg(t.data && t.data.msg ? t.data.msg : "获取验证码失败，请重试"), a.setData({
                    authCodeDisabled: !1
                });
            }
        }));
    },
    formSubmit: function(e) {
        var o = this;
        this.setData({
            loginDisabled: !0
        }), a.post({
            url: t.globalData.URL_API_PREFIX + "login/phoneQlogin",
            data: Object.assign(e.detail.value, {
                phone: this.data.phone
            }),
            complete: function(e) {
                if (e.data && e.data.code && 1e3 === e.data.code) {
                    a.post({
                        url: t.globalData.URL_API_PREFIX + "address/update",
                        data: a.getCache("addressInfo"),
                        complete: function(t) {
                            if (t.data && t.data.code && 1e3 === t.data.code) try {
                                wx.removeStorageSync("addressInfo");
                            } catch (t) {}
                            wx.redirectTo({
                                url: "/pages/user/checkout/checkout"
                            });
                        }
                    });
                    try {
                        wx.setStorageSync("uid", e.data.uid);
                    } catch (t) {}
                } else o.showErrorMsg(e.data && e.data.msg ? e.data.msg : "网络异常");
                o.setData({
                    loginDisabled: !1
                });
            }
        });
    },
    checkLength: function(t) {
        this.setData({
            loginDisabled: !(6 === t.detail.value.length)
        });
    }
}, o, e.pageEvents));