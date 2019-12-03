var t = getApp(), a = require("../../../utils/util"), e = require("../../../utils/statistics"), i = require("../../../components/toast/toast"), o = require("../../../components/error-msg/error-msg"), n = void 0;

Page(a.mergePage({
    data: {
        isLogin: t.checkLogin(),
        balance: 0,
        minAmount: 1,
        amount: 0,
        disable: !0,
        next: !1,
        ready: !1,
        authCodeDisabled: !1,
        authCodeText: "获取验证码",
        phone: "",
        canSubmit: !1,
        showTips: !1,
        showRule: !1
    },
    showTip: function() {
        this.setData({
            showTips: !0
        });
    },
    hideTip: function() {
        this.setData({
            showTips: !1
        });
    },
    showRule: function() {
        this.setData({
            showRule: !0
        });
    },
    hideRule: function() {
        this.setData({
            showRule: !1
        });
    },
    onLoad: function(t) {
        wx.hideShareMenu(), wx.showLoading && wx.showLoading({
            title: "加载中"
        }), this.init(), this.setData({
            isVip: wx.getStorageSync("vipStatus") > 0
        });
    },
    onShow: function() {
        e.sendPageData("page_cash_balance");
    },
    init: function() {
        var t = this;
        e.getData("afterLogin") ? this._init() : setTimeout(function() {
            t.init();
        }, 100);
    },
    _init: function() {
        t.checkLogin() ? this.getUserInfo() : (wx.hideLoading && wx.hideLoading(), this.setData({
            ready: !0
        }), t.goLogin());
    },
    showTips: function() {
        wx.showModal({
            title: "活动赠送金",
            content: "活动：当前的活动名称；赠送日期：用户获得8.8元的日期；过期时间：统一过期时间；提现要求：总提现金额达28元"
        });
    },
    getUserInfo: function() {
        var e = this, i = t.getPublicArg();
        wx.request({
            url: t.globalData.URL_MAPI + "distribution/cash/info",
            data: i,
            method: "get",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                var i = t.data, o = void 0 === i ? {} : i, n = o.info, s = o.code;
                if ("1000" == s && o.data) {
                    var c = o.data;
                    c.actInfo && (c.actInfo.start = a.dateFormat(c.actInfo.start, "yyyy.MM.dd"), c.actInfo.end = a.dateFormat(c.actInfo.end, "yyyy.MM.dd"), 
                    c.actInfo.valid = a.dateFormat(c.actInfo.valid, "yyyy年MM月dd日")), e.setData({
                        balance: c.balance,
                        minAmount: c.minConsumeAmount || 1,
                        phone: c.mobile,
                        actAmount: c.actAmount,
                        isAct: 1 == c.isAct,
                        actInfo: c.actInfo,
                        rebateTime: c.rebateTime > 0 ? a.dateFormat(c.rebateTime, "yyyy年MM月dd日") : "-"
                    }), e.checkActMoneyLimit();
                } else "2001" == s ? e.loginTip() : e.showToastMsg(n);
            },
            complete: function() {
                wx.hideLoading && wx.hideLoading(), e.setData({
                    ready: !0,
                    isLogin: t.checkLogin()
                });
            }
        });
    },
    submitNext: function() {
        this.data.disable || this.setData({
            next: !0,
            cryptPhone: this.data.phone ? this.data.phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2") : "-"
        });
    },
    checkBalance: function(t) {
        var a = parseFloat(t.detail.value);
        return isNaN(a) ? (this.showToastMsg("请输入提现金额"), void this.setData({
            disable: !0
        })) : a < 1 * this.data.minAmount ? (this.showToastMsg("最低提现金额为" + this.data.minAmount + "元"), 
        void this.setData({
            disable: !0
        })) : a > 1 * this.data.balance ? (this.showToastMsg("提现金额不能超过余额"), void this.setData({
            disable: !0
        })) : this.checkActMoneyLimit(a) ? void this.setData({
            disable: !1,
            amount: a
        }) : (this.showToastMsg("活动赠送金需满" + this.data.actInfo.cash_limit + "元才能提现"), void this.setData({
            disable: !0
        }));
    },
    checkActMoneyLimit: function(t) {
        var e = "请输入提现金额";
        if (this.data.isAct && this.data.actAmount > 0 && a.accSub(this.data.balance, this.data.actInfo.cash_limit) < 0) {
            var i = a.accSub(this.data.balance, this.data.actAmount);
            if (a.accSub(i, this.data.minAmount) >= 0 && (e = "提现金额，最多可提现" + i + "元"), t && a.accSub(t, i) > 0) return !1;
        } else a.accSub(this.data.balance, this.data.minAmount) >= 0 && (e = "提现金额，最多可提现" + this.data.balance + "元");
        return this.setData({
            placeholder: e
        }), !0;
    },
    loginTip: function(a) {
        var i = this;
        t.showAuthTip(function(a) {
            a && t.getAuth(null, function() {
                t.checkLogin() && i.getUserInfo();
            });
        }), e.sendEventData({
            activity: "click_invite",
            activityparam: ""
        });
    },
    checkLength: function(t) {
        6 === t.detail.value.length ? this.setData({
            canSubmit: !0
        }) : this.setData({
            canSubmit: !1
        });
    },
    getAuthCode: function() {
        var i = this;
        if (!this.data.authCodeDisabled) {
            i.setData({
                authCodeDisabled: !0
            });
            var o = t.getPublicArg();
            o.phone = this.data.phone, o.session_id = wx.getStorageSync("session_id"), o.jpUid = wx.getStorageSync("uid") || 0, 
            o.apisign = t.createApisign(o), a.post({
                url: t.globalData.URL_MUSER + "login/sendCashCode",
                data: o,
                complete: function(t) {
                    if (t.data && t.data.code && 1e3 == t.data.code) {
                        var a = t.data.data.limit_time;
                        i.setData({
                            authCodeText: "重新发送(" + a + ")"
                        }), function t(a) {
                            a > 0 ? (n && clearTimeout(n), n = setTimeout(function() {
                                i.setData({
                                    authCodeText: "重新发送(" + --a + ")"
                                }), t(a);
                            }, 1e3)) : i.setData({
                                authCodeDisabled: !1,
                                authCodeText: "获取验证码"
                            });
                        }(parseInt(a));
                    } else i.showErrorMsg(t.data && t.data.info ? t.data.info : "获取验证码失败，请重试"), i.setData({
                        authCodeDisabled: !1
                    });
                }
            }, !0), e.sendEventData({
                activity: "click_login_requet_verifycode",
                activityparam: this.data.phone
            });
        }
    },
    submitCash: function(a) {
        var e = this, i = a.detail.value, o = t.getPublicArg();
        o.openid = wx.getStorageSync("openid"), o.phone = this.data.phone, o.amount = this.data.amount, 
        o.nickname = wx.getStorageSync("nickName");
        var n = Object.assign({}, i, o);
        wx.showLoading({
            title: "提交中"
        }), wx.request({
            url: t.globalData.URL_MAPI + "distribution/get/cash",
            data: n,
            method: "post",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                var a = t.data, i = void 0 === a ? {} : a, o = i.info, n = i.code;
                if ("1000" == n) {
                    e.showToastMsg("提现申请提交成功");
                    var s = i.data.id;
                    wx.redirectTo({
                        url: "/pages/user/cash/cash-result?id=" + s
                    });
                } else "2001" == n ? e.loginTip() : e.showToastMsg(o);
            },
            complete: function() {
                wx.hideLoading && wx.hideLoading();
            }
        });
    },
    bindPhoneNumber: function(i) {
        var o = this;
        i.detail.encryptedData ? (e.sendEventData({
            activity: "click_login_authorise_allow"
        }), wx.login({
            success: function(e) {
                var n = t.getPublicArg();
                n.code = e.code, n.uid = wx.getStorageSync("uid"), n.encryptedData = i.detail.encryptedData, 
                n.iv = i.detail.iv, n.apisign = t.createApisign(n), a.post({
                    url: t.globalData.URL_MUSER + "login/xcxUserBindMobile",
                    data: n,
                    success: function(t) {
                        var a = t.data;
                        1e3 == a.code && a.data.phone ? o.setData({
                            phone: a.data.phone,
                            cryptPhone: a.data.phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")
                        }) : o.showToastMsg(a.info);
                    }
                }, !0);
            }
        })) : e.sendEventData({
            activity: "click_login_authorise_reject"
        });
    }
}, e.pageEvents, i, o));