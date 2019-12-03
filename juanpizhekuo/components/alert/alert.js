var t = getApp(), a = require("../../utils/util.js"), e = require("../../utils/statistics"), i = void 0, o = {
    closeAlert: function() {
        this.setData({
            alertShow: !1
        });
    },
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
                        authCodeText: e + "s重新发送"
                    }), function t(e) {
                        e > 0 ? (i && clearTimeout(i), i = setTimeout(function() {
                            a.setData({
                                authCodeText: --e + "s重新发送"
                            }), t(e);
                        }, 1e3)) : a.setData({
                            authCodeDisabled: !1,
                            authCodeText: "获取验证码"
                        });
                    }(parseInt(e));
                } else wx.showModal({
                    title: "提示",
                    content: t.data && t.data.info ? t.data.info : "获取验证码失败，请重试"
                }), a.setData({
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
        var o = i.detail.value, s = t.getPublicArg();
        s.session_id = wx.getStorageSync("session_id");
        var l = Object.assign({}, o, s);
        l.apisign = t.createApisign(l);
        var n = this;
        this.setData({
            loginDisabled: !0
        }), a.post({
            url: t.globalData.URL_MUSER + "login/phoneQlogin",
            data: l,
            complete: function(t) {
                return n.loginCallback(t);
            }
        }, !0), e.sendEventData({
            activity: "click_mobile_login_btn",
            activityparam: this.data.phone
        });
    },
    checkLength: function(t) {
        if (6 === t.detail.value.length) {
            if (!a.isMobile(this.data.phone)) return;
            this.setData({
                loginDisabled: !1
            });
        } else this.setData({
            loginDisabled: !0
        });
    },
    loginCallback: function(e) {
        var i = this;
        if (e.data && e.data.code && 1e3 == e.data.code) try {
            this.setData({
                alertShow: !1
            }), a.post({
                url: t.globalData.URL_MAPI + "coupons/newlist",
                data: Object.assign({}, t.getPublicArg(), {
                    jpUid: e.data.data.uid
                }),
                complete: function(t) {
                    "1000" == t.data.code ? i.setData({
                        alertShow: !1,
                        alertCouponShow: !0,
                        couponList: t.data.data.list,
                        explain_msg: t.data.data.explain_msg
                    }) : i.setData({
                        alertShow: !1
                    });
                }
            }, !0);
        } catch (t) {
            console.log(t);
        } else wx.showModal({
            title: "提示",
            content: e.data && e.data.info ? e.data.info : "获取验证码失败，请重试"
        });
        this.setData({
            loginDisabled: !1
        });
    }
};

module.exports = o;