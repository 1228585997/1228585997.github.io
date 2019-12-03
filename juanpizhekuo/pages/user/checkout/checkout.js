var t, a = getApp(), e = require("../../../utils/util"), s = require("../../../utils/statistics"), o = require("../../../components/error-msg/error-msg"), d = require("../../../components/toast/toast"), i = require("../../../utils/aes.js"), r = require("../../../utils/md5.min.js"), n = !1;

Page(e.mergePage({
    data: {
        query: null,
        addressList: [],
        defaultAddress: null,
        maxAddressLimit: 5,
        memberCard: {},
        goodsImage: [],
        goodsItem: null,
        memberIcon: "",
        memberDesc: "",
        rightIcon: "",
        jumpUrl: "",
        isVipUser: "",
        memberCheck: "",
        memberShow: !1,
        memberCheckShow: !1,
        buyMemCardParamNum: -1,
        msgTipExpanded: !1,
        money: null,
        selectedCoupon: null,
        subCheckoutExpanded: !1,
        selCoupon: [],
        submitTipShow: !1,
        ready: !1,
        jpPurse: null,
        jpPurseChecked: !1,
        jpWxPayChecked: !1,
        jpwallet_amount: "",
        jpneedpay: "",
        showkeyboard: !1,
        wallet: {
            wallet_pwd: ""
        },
        jpPhoneNumber: "",
        jpShowPhoneNumber: "",
        getVeriCodeTips: "获取验证码",
        getVeriBtnEnable: !0,
        isVip: !1
    },
    msgTipTap: function(t) {
        this.setData({
            msgTipExpanded: !this.data.msgTipExpanded
        }), s.sendEventData(t.currentTarget.dataset);
    },
    subCheckoutTap: function(t) {
        this.setData({
            subCheckoutExpanded: !this.data.subCheckoutExpanded
        }), s.sendEventData(t.currentTarget.dataset);
    },
    submitTipTap: function(t) {},
    toggleAddressList: function(t) {
        this.setData({
            expanded: !this.data.expanded
        });
        var a = t.currentTarget.dataset;
        s.sendEventData(a);
    },
    addressChange: function(t) {
        for (var a = parseFloat(t.detail.value), e = null, o = 0; o < this.data.addressList.length; o++) this.data.addressList[o].id == a && (e = this.data.addressList[o]);
        this.setData({
            defaultAddress: e,
            expanded: !this.data.expanded
        }), s.sendEventData(t.currentTarget.dataset);
    },
    submitVerificationCode: function(a) {
        var e = a.detail.value.purseCode;
        e.length < 6 ? this.showErrorMsg("请输入6位手机验证码") : (t.mobileCode = e, this.gopost(t));
    },
    changePurseCheckStatus: function(t) {
        var a = this.data.jpWxPayChecked, e = this.data.jpPurseChecked, s = this.data.jpwallet_amount, o = this.data.jpneedpay;
        1002 != this.data.jpPurse.status && (1e3 == this.data.jpPurse.status ? this.data.jpPurseChecked ? (e = !1, 
        a = !0, s = "0.00", o = this.data.money.pay_amount) : (e = !0, a = !1, s = this.data.money.pay_amount, 
        o = "") : 1003 == this.data.jpPurse.status && (this.data.jpPurseChecked ? (e = !1, 
        s = "0.00", o = this.data.money.pay_amount) : (e = !0, s = this.data.jpPurse.balance, 
        o = this.data.jpPurse.payListTips.substring(this.data.jpPurse.payListTips.indexOf("¥") + 1))), 
        this.setData({
            jpPurseChecked: e,
            jpWxPayChecked: a,
            jpwallet_amount: s,
            jpneedpay: o
        }));
    },
    wxpayCheck: function(t) {
        var a = this.data.jpWxPayChecked, e = this.data.jpPurseChecked, s = this.data.jpwallet_amount, o = this.data.jpneedpay;
        if (1002 != this.data.jpPurse.status) {
            if (1e3 == this.data.jpPurse.status) this.data.jpWxPayChecked ? (e = !0, a = !1, 
            s = this.data.money.pay_amount, o = "") : (e = !1, a = !0, s = "0.00", o = this.data.money.pay_amount); else if (1003 == this.data.jpPurse.status) return;
            this.setData({
                jpPurseChecked: e,
                jpWxPayChecked: a,
                jpwallet_amount: s,
                jpneedpay: o
            });
        }
    },
    addressClick: function(t) {
        var a = parseFloat(t.currentTarget.dataset.addressid);
        this.data.defaultAddress.id == a && this.setData({
            expanded: !1
        });
    },
    stopBtnPropagation: function(t) {
        var a = t.currentTarget.dataset;
        s.sendEventData(a);
    },
    submitCheckout: function(t) {
        var a = this, e = t.detail.value;
        if (this.data.virtualType > 0) {
            if (!new RegExp(this.data.phoneReg).test(parseInt(e.phone, 10))) return this.showErrorMsg("手机号码不正确");
            if (e.virtualType = this.data.virtualType, e.virtualAddress = JSON.stringify({
                type: this.data.virtualType,
                chargephone: e.phone
            }), e.phone != this.data.mobile) return wx.showModal({
                title: "提示",
                content: "请确认是否为当前手机号充值",
                success: function(s) {
                    s.confirm ? a.http_checkFn(e, t) : s.cancel;
                }
            }), !1;
        } else if (!e.addr) return this.showErrorMsg("请填写收货地址");
        this.http_checkFn(e, t);
    },
    hiddenMemberShow: function() {
        this.setData({
            memberCheckShow: !1
        });
    },
    checkMember: function() {
        if (wx.showLoading && wx.showLoading({
            title: "加载中"
        }), this.setData({
            memberCheckShow: !1
        }), "" != this.data.jumpUrl) wx.navigateTo({
            url: "../cardCheckout/cardCheckout"
        }); else {
            if ("2" == this.data.memberCheck) return void wx.hideLoading();
            "1" == this.data.memberCheck ? (this.setData({
                buyMemCardParamNum: 0
            }), this.getPayData()) : this.getPayData();
        }
    },
    getJpPurseAmount: function() {
        var t = "";
        return (this.data.jpPurse.status = 1e3) ? t = this.data.money.pay_amount : 1003 == this.data.jpPurse.status && (t = this.data.jpPurse.balance), 
        t;
    },
    http_checkFn: function(e, o) {
        var d = this, i = this;
        wx.showToast({
            title: "提交中...",
            icon: "loading",
            duration: 1e4
        }), e.user_notes = {};
        for (var r in e) 0 === r.indexOf("user_notes.") && (e.user_notes[r.replace("user_notes.", "")] = e[r], 
        delete e[r]);
        e.user_notes = JSON.stringify(e.user_notes), e.goods_info = i.data.query.goods_info, 
        e.wxcode = wx.getStorageSync("openid"), e.formId = o.detail.formId, e.utm = s.getData("utm"), 
        e.wx_name = wx.getStorageSync("uname"), e.username = wx.getStorageSync("wxname") || wx.getStorageSync("uname"), 
        e.pay_type = 109, (t = a.getPublicArg()).content = JSON.stringify({
            type: i.data.query.type,
            itemId: i.data.query.itemId || 0,
            is_try: i.data.query.is_try || 0,
            pa_type: i.data.query.pa_type || 0
        }), t = Object.assign({}, e, t, {
            buyMemCardParam: "0" == this.data.memberCheck ? "0" : this.data.buyMemCardParamNum
        });
        var n = a.getPublicArg();
        n.content = JSON.stringify({
            type: this.data.query.type
        }), this.data.jpPurseChecked && (n.jpPurse_amount = this.data.jpwallet_amount), 
        (n = Object.assign({}, n, this.data.query, {
            isVipUser: this.data.isVipUser
        }, {
            buyMemCardParam: "0" == this.data.memberCheck ? "0" : this.data.buyMemCardParamNum
        })).apisign = a.createApisign(n), wx.request({
            url: a.globalData.URL_MTRADE + "settle/check",
            data: n,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            complete: function(a) {
                a.data.data.msg_code > 1 ? d.showErrorMsg(a.data.data.msg) : d.data.jpPurseChecked ? (wx.hideToast(), 
                d.showKeyboard()) : i.gopost(t);
            }
        });
    },
    gopost: function(t) {
        var o = this;
        this.data.jpPurseChecked && (t.jpPurse_amount = this.data.jpwallet_amount, t.jpPurse_pwd = i.aesEncrypt(r(this.data.wallet.wallet_pwd), r("juanpi_oauth#$A.*$%(#$%16rwtr712^"))), 
        delete t.apisign, t.apisign = a.createApisign(t), wx.request({
            url: a.globalData.URL_MTRADE + "settle/create",
            data: t,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            complete: function(t) {
                e.setCache("address_id", "");
                var a = t.data;
                if (wx.hideToast(), 1e3 != a.code) return o.showErrorMsg(a.info || a.msg || "error");
                if (3 == a.data.is_paid) {
                    var d = i.aesDecrypt(a.data.mobile, r("juanpi_oauth#$A.*$%(#$%16rwtr712^"));
                    return o.setData({
                        jpPhoneNumber: d,
                        jpShowPhoneNumber: d.substring(0, 3) + "****" + d.substring(7)
                    }), o.closeKeyboard(), void o.showPurseWindControl();
                }
                if (1 != a.data.is_paid) if (2 != a.data.is_paid) {
                    if (!a.data.pay) return o.showErrorMsg("缺少支付参数！");
                    s.sendEventData({
                        activity: "click_temai_conpage_gotopay",
                        activityparam: a.data.order_no,
                        zhugeActivity: a.data.zg_event,
                        zhugeActivityparam: a.data.zg_json
                    }), o.pay(a.data.pay, a.data.order_no);
                    var n = e.getCache("traceData");
                    if (n) {
                        var u = JSON.parse(n);
                        u.orderno = a.data.order_no, s.sendEventData({
                            activity: "mkt_order",
                            activityparam: JSON.stringify(u)
                        });
                    }
                } else wx.redirectTo({
                    url: "/pages/user/waitpayorder/waitpayorder?orderid=" + a.data.order_no
                }); else wx.redirectTo({
                    url: "/pages/user/paysuccess/paysuccess?type=" + o.data.query.type + "&order_no=" + a.data.order_no + "&pay_no=" + a.data.pay
                });
            }
        });
    },
    pay: function(t, a) {
        var e = this;
        wx.requestPayment(Object.assign({
            timeStamp: "",
            nonceStr: "",
            package: "",
            signType: "MD5",
            paySign: "",
            success: function(s) {
                wx.redirectTo({
                    url: "/pages/user/paysuccess/paysuccess?type=" + e.data.query.type + "&order_no=" + a + "&pay_no=" + t.pay_no
                });
            },
            fail: function() {
                wx.redirectTo({
                    url: "/pages/user/waitpayorder/waitpayorder?orderid=" + a
                });
            }
        }, t));
    },
    getVerificationCode: function() {
        if (this.data.getVeriBtnEnable) {
            var t = this, e = a.getPublicArg();
            e.mobile = i.aesEncrypt(this.data.jpPhoneNumber, r("juanpi_oauth#$A.*$%(#$%16rwtr712^")), 
            e.referer = "24", e.apisign = a.createApisign(e), wx.request({
                url: a.globalData.URL_MUSER + "msgcode/send",
                data: e,
                method: "post",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(a) {
                    1e3 == a.data.code ? (wx.showToast({
                        title: a.data.info
                    }), t.getVericountdown()) : 2110 == a.data.code ? t.showErrorMsg(a.data.info) : 3010 == a.data.code ? (t.showErrorMsg(a.data.info), 
                    t.closePurseWindControl()) : t.showErrorMsg(a.data.info);
                },
                fail: function(a) {
                    t.getVericountdown(), t.showErrorMsg("获取失败，请重试～");
                }
            });
        }
    },
    getVericountdown: function() {
        var t = this;
        this.setData({
            getVeriBtnEnable: !1
        });
        var a = 60, e = setInterval(function() {
            t.setData({
                getVeriCodeTips: a + "s后重新获取"
            }), --a < 0 && (clearInterval(e), t.setData({
                getVeriCodeTips: "重新获取",
                getVeriBtnEnable: !0
            }));
        }, 1e3);
    },
    getCoupon: function(t) {
        var e = this;
        t ? (this.data.query.coupon_code = t, delete this.data.query.cancel_coupon) : (this.data.query.cancel_coupon = 1, 
        delete this.data.query.coupon_code);
        var s = a.getPublicArg();
        s.content = JSON.stringify({
            type: this.data.query.type,
            itemId: this.data.query.itemId || 0,
            is_try: this.data.query.is_try || 0,
            pa_type: this.data.query.pa_type || 0
        });
        var o = Object.assign({}, s, this.data.query, {
            buyMemCardParam: this.data.buyMemCardParamNum
        });
        o.apisign = a.createApisign(o), wx.request({
            url: a.globalData.URL_MTRADE + "settle/coupon",
            data: o,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            complete: function(t) {
                var a = t.data;
                if (a.data.brandList) for (r = 0; r < a.data.brandList.length; r++) for (i = 0; i < a.data.brandList[r].list.length; i++) a.data.brandList[r].list[i].is_sel = !1;
                if (a.data.couponList) for (r = 0; r < a.data.couponList.length; r++) a.data.couponList[r].is_sel = !1;
                var s = [];
                if (a.data.selectedCoupon.coupon_code) for (var o = a.data.selectedCoupon.coupon_code.split(","), d = 0; d < o.length; d++) {
                    if (a.data.brandList) for (r = 0; r < a.data.brandList.length; r++) for (var i = 0; i < a.data.brandList[r].list.length; i++) a.data.brandList[r].list[i].coupon_code == o[d] && (s.push({
                        bid: a.data.brandList[r].gcId,
                        code: a.data.brandList[r].list[i].coupon_code
                    }), a.data.brandList[r].list[i].is_sel = !0);
                    if (a.data.couponList) for (var r = 0; r < a.data.couponList.length; r++) a.data.couponList[r].coupon_code == o[d] && (s.push({
                        code: a.data.couponList[r].coupon_code
                    }), a.data.couponList[r].is_sel = !0);
                }
                e.setData({
                    selCoupon: s,
                    brandList: a.data.brandList || [],
                    couponList: a.data.couponList || [],
                    invalidList: a.data.invalidList || []
                });
            }
        });
    },
    closeUseCoupon: function() {
        e.maskDownAnimation(this, "showUseCoupon");
    },
    closeKeyboard: function() {
        this.setData({
            "wallet.wallet_pwd": ""
        }), e.maskDownAnimation(this, "showkeyboard");
    },
    showPurseWindControl: function() {
        this.setData({
            getVeriCodeTips: "获取验证码",
            getVeriBtnEnable: !0
        }), e.maskUpAnimation(this, "showpurseWindControl");
    },
    closePurseWindControl: function() {
        e.maskDownAnimation(this, "showpurseWindControl");
    },
    cancelVerificationCode: function() {
        this.closePurseWindControl();
    },
    confirmVerificationCode: function() {},
    showKeyboard: function(t) {
        e.maskUpAnimation(this, "showkeyboard");
    },
    couponTap: function(t) {
        var a = t.currentTarget.dataset;
        if ("0" == a.hascoupon || void 0 == a.hascoupon || "undefined" == a.hascoupon) return !1;
        e.maskUpAnimation(this, "showUseCoupon");
    },
    couponItemTap: function(t) {
        var a = t.currentTarget.dataset;
        if ("invalid" == a.hasinvalid) return this.showErrorMsg("平台券未达使用门槛！"), !1;
        var e = a.bid, s = a.couponcode, o = a.status, d = a.issel;
        if (5 == o) return e ? this.showErrorMsg("请先取消已选中的平台券") : this.showErrorMsg("平台券未达使用门槛！"), 
        !1;
        for (var i = !1, r = 0; r < this.data.selCoupon.length; r++) e ? e == this.data.selCoupon[r].bid && (i = !0, 
        d ? this.data.selCoupon.splice(r, 1) : this.data.selCoupon.splice(r, 1, {
            bid: e,
            code: s
        })) : s == this.data.selCoupon[r].code && (i = !0, d ? this.data.selCoupon.splice(r, 1) : this.data.selCoupon.splice(r, 1, {
            code: s
        }));
        i || d || (e ? this.data.selCoupon.push({
            bid: e,
            code: s
        }) : this.data.selCoupon.push({
            code: s
        }));
        for (var n = [], r = 0; r < this.data.selCoupon.length; r++) n.push(this.data.selCoupon[r].code);
        this.getCoupon(n.join(","));
    },
    couponBtnTap: function() {
        for (var t = [], a = 0; a < this.data.selCoupon.length; a++) t.push(this.data.selCoupon[a].code);
        var s = t.join(",");
        s ? (this.data.query.coupon_code = s, delete this.data.query.cancel_coupon) : (this.data.query.cancel_coupon = 1, 
        delete this.data.query.coupon_code), this.getPayData(), e.maskDownAnimation(this, "showUseCoupon");
    },
    getPayData: function() {
        var t = this, s = a.getPublicArg();
        s.content = JSON.stringify({
            type: this.data.query.type
        }), (s = Object.assign({}, s, this.data.query, {
            buyMemCardParam: this.data.buyMemCardParamNum
        })).apisign = a.createApisign(s), wx.request({
            url: a.globalData.URL_MTRADE + "settle/info",
            data: s,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            complete: function(a) {
                wx.hideLoading && wx.hideLoading();
                var s = a.data;
                if (s && s.code && 1e3 == s.code) {
                    var o = [], d = [];
                    if (s.data.shopInfo.barn) for (var i = s.data.shopInfo.barn, r = 0; r < i.shopList.length; r++) for (u = 0; u < i.shopList[r].goods.length; u++) o.push(i.shopList[r].goods[u]);
                    if (s.data.shopInfo.common) for (var n = s.data.shopInfo.common, r = 0; r < n.shopList.length; r++) for (var u = 0; u < n.shopList[r].goods.length; u++) d.push(n.shopList[r].goods[u]);
                    var p = null;
                    o.length + d.length == 1 && (1 == o.length && ((p = s.data.shopInfo.barn.shopList[0].goods[0]).shop_id = s.data.shopInfo.barn.shopList[0].shop_id), 
                    1 == d.length && ((p = s.data.shopInfo.common.shopList[0].goods[0]).shop_id = s.data.shopInfo.common.shopList[0].shop_id)), 
                    t.getCoupon(s.data.selectedCoupon && s.data.selectedCoupon.coupon_code);
                    var c = e.getCache("address_id");
                    if (s.data.address.list) if (c) for (r = 0; r < s.data.address.list.length; r++) c == s.data.address.list[r].id && (s.data.defaultAddress = s.data.address.list[r]); else for (r = 0; r < s.data.address.list.length; r++) s.data.address.selectedId == s.data.address.list[r].id && (s.data.defaultAddress = s.data.address.list[r]); else s.data.defaultAddress = null;
                    s.data.isVipUser && t.setData({
                        isVipUser: s.data.isVipUser
                    });
                    var h = !1, l = !0, g = "0.00", m = s.data.money.pay_amount;
                    if (s.data.jpPurse) {
                        var y = s.data.jpPurse.msg;
                        s.data.jpPurse.msg = y.substring(y.indexOf(">") + 1, y.lastIndexOf("<")), 1002 == s.data.jpPurse.status ? l = !0 : 1e3 == s.data.jpPurse.status ? 1 == s.data.jpPurse.checked ? (h = !0, 
                        l = !1, g = s.data.money.pay_amount, m = "0.00") : (h = !1, l = !0, g = "0.00", 
                        m = s.data.money.pay_amount) : 1003 == s.data.jpPurse.status && (1 == s.data.jpPurse.checked ? (h = !0, 
                        l = !0, g = s.data.jpPurse.balance, m = s.data.jpPurse.payListTips.substring(s.data.jpPurse.payListTips.indexOf("¥") + 1)) : (h = !1, 
                        l = !0, g = "0.00"));
                    }
                    if (s.data.fanList) {
                        var f = 0;
                        (f = s.data.money.totalFanMoney) > 0 && (s.data.fanList.total = f);
                    }
                    t.setData({
                        memberIcon: s.data.buyMemCard ? s.data.buyMemCard.icon : "",
                        cart_sku: s.data.cart_sku,
                        defaultAddress: s.data.defaultAddress,
                        addressList: s.data.address.list || [],
                        goodsImage: o.concat(d),
                        goodsItem: p,
                        money: s.data.money,
                        selectedCoupon: s.data.selectedCoupon,
                        memberCard: s.data.memberCard,
                        ready: !0,
                        virtualType: s.data.virtual_goods && s.data.virtual_goods.type,
                        mobile: s.data.virtual_goods && s.data.virtual_goods.chargePhone || "",
                        phoneReg: s.data.virtual_goods && s.data.virtual_goods.content[0].rule,
                        jpPurse: s.data.jpPurse,
                        jpPurseChecked: h,
                        jpWxPayChecked: l,
                        jpwallet_amount: g,
                        jpneedpay: m,
                        fanList: s.data.fanList,
                        isVip: wx.getStorageSync("vipStatus") > 0
                    }), s.data.fanList && s.data.fanList.total > 0 && wx.setStorageSync("totalFanPrice", s.data.fanList.total);
                }
            }
        });
    },
    onShow: function() {
        var t = this;
        n = !1, a.checkLogin() ? (wx.showLoading && wx.showLoading({
            title: "加载中"
        }), t.getPayData()) : a.goLogin(), s.sendPageData("page_temai_orderconfirmation", "", "进入结算页");
    },
    onLoad: function(t) {
        t.xcx_uid = wx.getStorageSync("uid"), t.xcx_sign = wx.getStorageSync("xcx_sign"), 
        this.data.query = t, t.buyMemCardParam && (this.data.buyMemCardParamNum = t.buyMemCardParam), 
        s.sendZhugePageData("进入结算页", {});
    },
    getWxAddress: function(t) {
        var o = this;
        wx.getSetting({
            success: function(t) {
                1 != wx.getStorageSync("ifNotFirstAddress") || t.authSetting["scope.address"] ? wx.chooseAddress ? (wx.setStorageSync("ifNotFirstAddress", 1), 
                wx.chooseAddress({
                    success: function(t) {
                        var s = t.userName, d = (t.postalCode, t.provinceName, t.cityName, t.countyName, 
                        t.detailInfo), i = (t.nationalCode, t.telNumber);
                        wx.request({
                            url: a.globalData.URL_M + "xcxaddress/addWxAddress",
                            method: "POST",
                            data: {
                                xcx_uid: wx.getStorageSync("uid"),
                                xcx_sign: wx.getStorageSync("xcx_sign"),
                                province: t.provinceName,
                                city: t.cityName,
                                town: t.countyName,
                                postcode: t.postalCode,
                                addr: t.detailInfo,
                                mobile: t.telNumber,
                                username: t.userName
                            },
                            success: function(t) {
                                if (1001 == t.data.code) return o.showToastMsg(t.data.msg);
                                1002 == t.data.code ? (wx.setStorageSync("userName", s), wx.setStorageSync("detailInfo", d), 
                                wx.setStorageSync("telNumber", i), wx.navigateTo({
                                    url: "../address-edit/address-edit?formWxAdLists=true"
                                })) : (e.setCache("address_id", t.data.address_id), o.getPayData());
                            }
                        });
                    }
                })) : wx.showModal({
                    title: "提示",
                    content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。",
                    showCancel: !1
                }) : wx.showModal({
                    content: "卷皮需要获取您的通讯地址才能进行此步操作。",
                    confirmText: "去授权",
                    success: function(t) {
                        t.confirm ? wx.openSetting({
                            success: function(t) {}
                        }) : t.cancel;
                    }
                });
            }
        }), s.sendEventData(t.currentTarget.dataset);
    },
    keyboardItemTap: function(a) {
        var e = a.currentTarget.dataset.value, s = this.data.wallet.wallet_pwd.length;
        "empty" != e && ("del" == e ? s > 0 && this.setData({
            "wallet.wallet_pwd": this.data.wallet.wallet_pwd.substring(0, s - 1)
        }) : this.setData({
            "wallet.wallet_pwd": this.data.wallet.wallet_pwd + e
        }), 6 == this.data.wallet.wallet_pwd.length && this.gopost(t));
    }
}, o, d, s.pageEvents));