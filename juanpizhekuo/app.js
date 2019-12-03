function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, n = require("./deps"), i = n.patchComponent;

Component = i(Component), Object.assign || (Object.assign = require("./utils/object-assign")), 
Array.prototype.find || require("./utils/array-find"), Array.prototype.findIndex || require("./utils/array-findIndex");

var o = require("./utils/util"), r = require("./utils/api"), s = require("./utils/statistics"), c = require("./utils/md5.min"), u = wx.getSystemInfoSync() || {};

App({
    deps: n,
    onLaunch: function(e) {
        s.setStartDataOnLaunch(e), s.setLaunchOptionsData(e);
    },
    onShow: function(e) {
        e.query && e.query.scene && wx.setStorageSync("report_scene", e.query.scene), o.getQueryFromShareSence(e.query), 
        s.setLaunchOptionsData(e);
        var t = this, a = function(a) {
            if (s.sendStartData(), e) {
                var n = e.query;
                if (1058 == e.scene || 1067 == e.scene) {
                    var i = {};
                    i.querystring = JSON.stringify(n), i.traceid = n.traceid, i.aid = n.aid, i.openid = wx.getStorageSync("openid");
                    var r = JSON.stringify(i);
                    o.setCache("traceData", r), s.sendEventData({
                        activity: "mkt_onload",
                        activityparam: r
                    });
                }
            }
            !a && s.setData("afterDecode", !0), t.getPersonalConfig();
        };
        if (!e || 1058 != e.scene && 1067 != e.scene ? t.getAuth({
            withoutCheckLogin: !0
        }, a) : a(!1), r.getDefaultStorageInfo(t).then(function(e) {
            for (var t in e) wx.setStorageSync(t, e[t]);
        }).catch(function(e) {}), e && e.query && e.query.inviteCode && wx.setStorageSync("otherInviteCode", e.query.inviteCode), 
        wx.getStorageSync("report_scene")) var n = setInterval(function() {
            if (wx.getStorageSync("openid")) {
                var e = wx.getStorageSync("openid"), a = wx.getStorageSync("uid"), i = decodeURIComponent(wx.getStorageSync("report_scene"));
                r.reportScene(e, a, i, t), wx.removeStorageSync("report_scene"), clearInterval(n);
            }
        }, 500);
    },
    onHide: function() {
        wx.removeStorageSync("zhouyi_ids"), wx.removeStorageSync("report_scene");
    },
    getAuth: function(e, t) {
        var a = this;
        !this.checkLogin() || e && e.withoutCheckLogin ? wx.login({
            success: function(n) {
                if (n.code) {
                    var i = n.code, o = a;
                    wx.getSetting ? wx.getSetting({
                        success: function(a) {
                            var n = !1;
                            a.authSetting["scope.userInfo"] || (n = !0), o._getAuth(e, t, i, n);
                        },
                        fail: function() {
                            o._getAuth(e, t, i, !1);
                        }
                    }) : o._getAuth(e, t, i, !1);
                } else console.log("获取用户登录态失败！" + n.errMsg), "function" == typeof t && t();
            },
            fail: function(e) {
                console.log("获取用户登录态失败！" + e.errMsg), "function" == typeof t && t();
            }
        }) : "function" == typeof t && t();
    },
    _getAuth: function(e, t, a, n) {
        var i = this;
        wx.getSetting({
            success: function(o) {
                o.authSetting["scope.userInfo"] ? wx.getUserInfo({
                    lang: "zh_CN",
                    fail: function(e) {
                        console.log("获取用户签名失败！" + e.errMsg);
                    },
                    complete: function(o) {
                        var r = !1;
                        if (wx.getStorageSync("uid") ? i.checkLogin() || (r = !0) : r = !0, o.errMsg.indexOf("fail") > -1) return "function" == typeof t && t(), 
                        void s.sendEventData({
                            activity: "click_authorise_reject",
                            activityparam: ""
                        });
                        wx.setStorageSync("avatarUrl", o.userInfo.avatarUrl), wx.setStorageSync("nickName", o.userInfo.nickName);
                        var c = i.getPublicArg();
                        c.code = a, c.user_info = encodeURIComponent(JSON.stringify(o)), c.session_id = wx.getStorageSync("session_id"), 
                        c.apisign = i.createApisign(c), wx.request({
                            url: i.globalData.URL_MUSER + "oauth/xcxAccess",
                            data: c,
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            complete: function(a) {
                                if (e && e.complete && e.complete(), a.data && a.data.code && 1e3 == a.data.code) {
                                    try {
                                        var o = a.data.data;
                                        wx.setStorageSync("unionId", o.unionid), wx.setStorageSync("session_id", o.session_id), 
                                        wx.setStorageSync("openid", o.openid), wx.setStorageSync("session_key", o.session_key), 
                                        wx.setStorageSync("jpSign", o.sign), wx.setStorageSync("wxname", o.username), o.uid && (wx.setStorageSync("uid", o.uid), 
                                        wx.setStorageSync("xcx_sign", o.xcx_sign), wx.setStorageSync("uname", o.uname), 
                                        i.getCollectedGoodsCode(), i.setDistributionStuff(), s.getZhugeUserData(o.uid)), 
                                        s.getOpenGid(o.session_key), n && s.sendEventData({
                                            activity: "click_authorise_allow",
                                            activityparam: ""
                                        });
                                        var c = i.getPublicArg();
                                        c.apisign = i.createApisign(c), wx.request({
                                            url: i.globalData.URL_MAPI + "usertype/get/usertype",
                                            data: c,
                                            method: "POST",
                                            header: {
                                                "content-type": "application/x-www-form-urlencoded"
                                            },
                                            complete: function(e) {
                                                if (1e3 == e.data.code) {
                                                    if (e.data.data._md_json) {
                                                        var t = JSON.parse(e.data.data._md_json);
                                                        c.jpGoodsUtype = wx.setStorageSync("jpGoodsUtype", t.gid), c.jpUserGroup = wx.setStorageSync("jpUserGroup", t.ugroup);
                                                    }
                                                    e.data.data.custom_hd && (wx.setStorageSync("jpUserLabel", e.data.data.custom_hd.jpUSERLABEL), 
                                                    wx.setStorageSync("jpZyids", e.data.data.custom_hd.jpZYIDS));
                                                }
                                            }
                                        }), "function" == typeof t && t(!0);
                                    } catch (e) {}
                                    if (r) {
                                        var u = getCurrentPages(), g = u[u.length - 1];
                                        "pages/index/index" == g.route && g.newUserRegister();
                                    }
                                } else "function" == typeof t && t();
                            }
                        });
                    }
                }) : (wx.getStorageSync("openid") || r.getUserOpenid(i, a).then(function(e) {
                    e.openid && (wx.setStorageSync("unionId", e.unionid), wx.setStorageSync("openid", e.openid), 
                    wx.setStorageSync("session_key", e.session_key));
                }).catch(function(e) {
                    console.log(e);
                }), "function" == typeof t && t());
            }
        });
    },
    getAuthCode: function(e) {
        var t = this.getPublicArg();
        t.phone = e.phone, t.session_id = wx.getStorageSync("session_id"), t.jpUid = wx.getStorageSync("uid") || 0, 
        t.apisign = this.createApisign(t), o.post({
            url: this.globalData.URL_MUSER + "login/sendLoginPhoneCode",
            data: t,
            complete: function(t) {
                e.complete(t);
            }
        }, !0);
    },
    showAuthTip: function(e) {
        var t = this;
        wx.canIUse && wx.canIUse("getSetting") ? wx.getSetting({
            success: function(a) {
                if (a.authSetting["scope.userInfo"]) "function" == typeof e && e(!0); else {
                    if (o.getCache("traceData") && 1 != wx.getStorageSync("ifFirstAuth")) return wx.setStorageSync("ifFirstAuth", 1), 
                    t.getAuth({
                        withoutCheckLogin: !0
                    }, e), !1;
                    wx.navigateTo({
                        url: "/pages/login/login"
                    });
                }
            }
        }) : e(!1);
    },
    getPersonalConfig: function() {
        var e = this, t = this.getPublicArg();
        t.apisign = this.createApisign(t), o.post({
            url: this.globalData.URL_API + "member/personal/config",
            data: t,
            success: function(t) {
                var a = t.data, n = void 0 === a ? {} : a;
                if (1e3 == n.code) {
                    var i = n.data;
                    e.globalData.TIME_DIFF = parseInt((+i.cart.systemTime - new Date().getTime()) / 1e3), 
                    i.cart && i.cart.shopCartNum > 0 && wx.setStorageSync("miniCartNum", i.cart.shopCartNum);
                }
            }
        }, !0);
    },
    setDistributionStuff: function() {
        var e = this.getPublicArg(), t = wx.getStorageSync("otherInviteCode"), a = getCurrentPages(), n = a && a.length > 0 && a[0].route && -1 === a[0].route.indexOf("pages/vip/inviteResult/index");
        if (t && n) {
            var i = Object.assign({
                code: t,
                avatar: wx.getStorageSync("avatarUrl"),
                name: wx.getStorageSync("nickName")
            }, e);
            i.apisign = this.createApisign(i);
        }
        e.apisign = this.createApisign(e), wx.request({
            url: this.globalData.URL_MAPI + "distribution/user/code",
            data: e,
            success: function(e) {
                var t = e.data, a = void 0 === t ? {} : t;
                if (1e3 == a.code) {
                    var n = a.data;
                    wx.setStorageSync("myInviteCode", n.code || ""), wx.setStorageSync("vipStatus", n.vipType);
                }
            }
        });
    },
    checkLogin: function() {
        var e = wx.getStorageSync("uid");
        return !(!e || "0" === e);
    },
    goLogin: function(e) {
        var t = this, a = this;
        return wx.getSetting ? wx.getSetting({
            success: function(n) {
                n.authSetting["scope.userInfo"] ? wx.navigateTo({
                    url: "/pages/login/login"
                }) : t.showAuthTip(function(t) {
                    a.getAuth(null, e);
                });
            }
        }) : wx.navigateTo({
            url: "/pages/login/login"
        }), !1;
    },
    setShare: function(e, t, n, i, o) {
        -1 != t.indexOf("?") ? t += "&" : t += "?", t = (t += "utm=108201") + "&inviteCode=" + (wx.getStorageSync("myInviteCode") || ""), 
        "object" === (void 0 === o ? "undefined" : a(o)) && (o = Object.assign({}, o, {
            "分享平台": "微信好友",
            "分享类型": "小程序",
            "分享链接": t
        }), s.sendEventData({
            zhugeActivity: "分享",
            zhugeActivityparam: o
        }));
        var r = {
            title: e,
            path: t,
            success: function(e) {
                "function" == typeof n && n(e);
                var t = 0, a = wx.getStorageSync("session_key");
                e && e.shareTickets && a ? wx.getShareInfo({
                    shareTicket: e.shareTickets[0],
                    success: function(e) {
                        wx.request({
                            url: "https://wxpt.juanpi.com/xcxdecode/decode_data",
                            data: {
                                session_key: a,
                                encryptedData: e.encryptedData,
                                iv: e.iv
                            },
                            method: "POST",
                            header: {
                                "Content-Type": "application/json"
                            },
                            success: function(e) {
                                var a = e.data, n = void 0 === a ? {} : a;
                                1e3 == n.code ? (t = n.info.openGId, s.sendEventData({
                                    activity: "click_xcxshare",
                                    activityparam: t + "_1"
                                })) : s.sendEventData({
                                    activity: "click_xcxshare",
                                    activityparam: t + "_1"
                                });
                            }
                        });
                    },
                    fail: function() {
                        s.sendEventData({
                            activity: "click_xcxshare",
                            activityparam: t + "_1"
                        });
                    }
                }) : s.sendEventData({
                    activity: "click_xcxshare",
                    activityparam: t + "_1"
                });
            },
            fail: function(e) {
                s.sendEventData({
                    activity: "click_xcxshare",
                    activityparam: "0_0"
                });
            }
        };
        return i && (r.imageUrl = i), r;
    },
    createApisign: function(e) {
        var t = Object.keys(e).sort().map(function(t) {
            return t + "=" + e[t];
        });
        return t = c(t.join("&") + "juanpi_oauth#$A.*$%(#$%16rwtr712^");
    },
    getPublicArg: function() {
        var e = this.globalData, t = {};
        return t.jpSystemVersion = e.SYSTIME_INFO.system, t.jpAppName = "zhe", t.jpAppVersion = e.APP_VERSION, 
        t.jpPlatform = e.PLATFORM, t.jpDeviceName = e.SYSTIME_INFO.model, t.jpAppNetwork = s.getData("network"), 
        t.jpTicks = 0, t.jpUid = wx.getStorageSync("uid") || 0, t.jpDid = s.getData("id_num"), 
        t.jpUtm = s.getData("utm"), t.jpId = s.getData("id_num"), t.jpGoodsUtype = wx.getStorageSync("jpGoodsUtype") || "C4", 
        t.jpUserGroup = wx.getStorageSync("jpUserGroup") || "", t.jpSign = wx.getStorageSync("jpSign"), 
        t.request_time = new Date().getTime() + 1e3 * e.TIME_DIFF, t.xcx_sign = wx.getStorageSync("xcx_sign"), 
        t;
    },
    getCollectedGoodsCode: function() {
        var e = this.getPublicArg();
        e.apisign = this.createApisign(e), o.post({
            url: this.globalData.URL_MUSER + "favorite/goods_list_id",
            data: e,
            complete: function(e) {
                var t = [], a = [];
                if (200 == e.statusCode) {
                    var n = e.data.data.goods_code;
                    t = n ? n.split(",") : [];
                    var i = e.data.data.store_id;
                    a = i ? i.split(",") : [];
                }
                wx.setStorage({
                    key: "goods_list",
                    data: t
                }), wx.setStorage({
                    key: "collect_store_id",
                    data: a
                });
            }
        }, !0);
    },
    isPageInTab: function(e) {
        for (var t = [ "/pages/index/index", "/pages/vip/index/index", "/pages/search/classify/classify", "/pages/cart/cart", "/pages/user/index/index" ], a = 0; a < t.length; a++) {
            var n = t[a];
            if (-1 != e.indexOf(n)) return !0;
        }
        return !1;
    },
    globalData: (t = {
        SYSTIME_INFO: u,
        TIME_DIFF: 0,
        URL_API_PREFIX: "https://wxpt.juanpi.com/",
        URL_SHOP_JP: "https://shop.juanpi.com/",
        URL_M: "https://m.juanpi.com/",
        URL_TUAN: "https://tuan.juanpi.com/",
        URL_MAPI: "https://mapi.juanpi.com/",
        URL_API: "https://api.juanpi.com/",
        URL_MTRADE: "https://mtrade.juanpi.com/",
        URL_MUSER: "https://muser.juanpi.com/",
        URL_DETAIL: "https://detail-api.juanpi.com/",
        URL_MACT: "https://mact.juanpi.com/"
    }, e(t, "URL_API", "https://api.juanpi.com/"), e(t, "APP_VERSION", "4.7.3"), e(t, "APP_NAME", "zhe"), 
    e(t, "PLATFORM", u && -1 != u.system.toLowerCase().indexOf("android") ? "Android_xcx" : "iPhone_xcx"), 
    t),
    gotoOtherXcx: function(e) {
        var t = e.replace("xcx://", "").split("?amp;"), a = {}, n = !0, i = !1, o = void 0;
        try {
            for (var r, s = t[Symbol.iterator](); !(n = (r = s.next()).done); n = !0) {
                var c = r.value, u = c.split("=");
                a[u[0]] = c.replace(u[0] + "=", ""), "path" == u[0] && -1 == a[u[0]].indexOf("?") && a[u[0]].indexOf("&") >= 0 && (a[u[0]] = a[u[0]].replace("&", "?"));
            }
        } catch (e) {
            i = !0, o = e;
        } finally {
            try {
                !n && s.return && s.return();
            } finally {
                if (i) throw o;
            }
        }
        wx.navigateToMiniProgram({
            appId: a.appId,
            path: a.path,
            extraData: a.extraData ? JSON.parse(a.extraData) : {},
            success: function(e) {
                console.log(e);
            },
            fail: function(e) {
                console.log(e);
            },
            complete: function() {}
        });
    }
});