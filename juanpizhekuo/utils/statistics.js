function e() {
    var a = this, r = !1, n = 0;
    "function" != typeof this.setStartDataOnLaunch && (e.afterLogin = !1, e.afterDecode = !1, 
    e.shareTicket = "", e.applet_type = 1, e.sysInfo = wx.getSystemInfoSync(), e.latitude = "", 
    e.longitude = "", e.idfa = "", e.server_jsonstr = "", e.carrier = "", e.network = "", 
    e.pagename = "", e.param = "", e.pre_pagename = "", e.pre_param = "", e.utm = 0, 
    e.scene_value = 0, e.open_gid = "", e.source = "", e.create_utm = "0", e.referrer_id = "", 
    e.referrer_data = "", e.zhuge_pagename = "", e.zhuge_pre_pagename = "", e.tailID = "", 
    e.prototype.setStartDataOnLaunch = function(t) {
        e.timestamp = new Date().getTime();
        var a = wx.getStorageSync("cache_jp_id");
        a || (a = e.timestamp + "" + Math.random(), wx.setStorageSync("cache_jp_id", a));
        var r = wx.getStorageSync("create_utm");
        "" === r && (r = t && t.query.utm ? t.query.utm + "" : "0", wx.setStorageSync("create_utm", r)), 
        e.id_num = a, e.create_utm = r, wx.getNetworkType({
            success: function(t) {
                e.network = t.networkType;
            }
        });
    }, e.prototype.setLaunchOptionsData = function(t) {
        if (t && "page_temai_orderconfirmation" !== e.pagename) {
            e.scene_value = t.scene;
            var a = t.query;
            e.utm = a.utm || 0, e.tailID = a.tailID || "", e.source = a.source || "", e.open_gid = "", 
            t.shareTicket ? e.afterDecode = !1 : e.afterDecode = !0, e.shareTicket = t.shareTicket || "";
            var r = t.referrerInfo;
            r && (e.referrer_id = r.appId || "", r.extraData && (e.referrer_data = JSON.stringify(r.extraData)), 
            r.appId && wx.request({
                url: "https://mapi.juanpi.com/Xcx/getAppIdUtm",
                data: {
                    appid: r.appId
                },
                header: {
                    "Content-Type": "application/json"
                },
                success: function(t) {
                    var a = t.data, r = void 0 === a ? {} : a;
                    1e3 == r.code && (e.utm = r.utm || 0);
                }
            }));
        }
    }, e.prototype.getOpenGid = function(t) {
        if (e.shareTicket) {
            wx.getShareInfo({
                shareTicket: e.shareTicket,
                success: function(a) {
                    wx.request({
                        url: "https://wxpt.juanpi.com/xcxdecode/decode_data",
                        data: {
                            session_key: t,
                            encryptedData: a.encryptedData,
                            iv: a.iv
                        },
                        method: "POST",
                        header: {
                            "Content-Type": "application/json"
                        },
                        success: function(t) {
                            var a = t.data, r = void 0 === a ? {} : a;
                            1e3 == r.code && (e.open_gid = r.info.openGId);
                        },
                        complete: function() {
                            e.afterDecode = !0;
                        }
                    });
                },
                fail: function() {
                    e.afterDecode = !0;
                }
            });
        } else e.afterDecode = !0;
    }, e.prototype._getCommonArgs = function() {
        var t = e.sysInfo;
        return {
            applet_type: e.applet_type,
            uid: wx.getStorageSync("uid") || "",
            session_id: wx.getStorageSync("session_id") || "",
            openid: wx.getStorageSync("openid") || "",
            wx_version: t.version,
            os: t.platform,
            os_version: t.system,
            utm: e.utm,
            create_utm: e.create_utm,
            source: e.source,
            scene_value: e.scene_value,
            referrer_id: e.referrer_id,
            referrer_data: e.referrer_data,
            open_gid: e.open_gid,
            id_num: e.id_num
        };
    }, e.prototype.sendStartData = function() {
        if (r) console.log("start data sended"); else {
            if (e.afterLogin = !0, !e.afterDecode && n < 50) {
                var t = this;
                return setTimeout(function() {
                    n++, t.sendStartData();
                }, 1e3), !1;
            }
            r = !0;
            var o = e.sysInfo, i = Object.assign({}, a._getCommonArgs(), {
                timestamp: e.timestamp,
                devicename: o.model,
                language: o.language,
                length: o.windowHeight,
                width: o.windowWidth,
                dpi: o.pixelRatio,
                network: e.network,
                carrier: e.carrier,
                latitude: e.latitude,
                longitude: e.longitude,
                idfa: e.idfa
            });
            a._sendData(i, "bootstrap");
        }
    }, e.prototype.sendPageData = function(t, r, o) {
        if ((!e.afterLogin || !e.afterDecode) && n < 50) {
            var i = this;
            return setTimeout(function() {
                n++, i.sendPageData(t, r, o);
            }, 1e3), !1;
        }
        e.pagename = t, o && (e.zhuge_pagename = o);
        var p = void 0;
        "page_temai_multi_logistics" === t ? (e.param = "", p = r) : (e.param = r, p = "");
        var s = Object.assign({}, a._getCommonArgs(), {
            pagename: e.pagename,
            param: e.param,
            pre_pagename: e.pre_pagename,
            pre_param: e.pre_param,
            timestamp: new Date().getTime(),
            server_jsonstr: p
        });
        a._sendData(s, "pageinfo");
    }, e.prototype._sendEventData = function(t) {
        var r = void 0, n = void 0;
        switch (t.activity) {
          case "click_cube_goods":
          case "click_cube_block":
          case "click_cube_ad_in_goods":
          case "click_cube_slide_goods":
          case "click_cube_banner":
            r = "", n = t.activityparam;
            break;

          default:
            r = t.activityparam, n = e.server_jsonstr;
        }
        var o = Object.assign({}, a._getCommonArgs(), {
            pagename: e.pagename,
            param: e.param,
            pre_pagename: e.pre_pagename,
            pre_param: e.pre_param,
            timestamp: new Date().getTime(),
            activityname: t.activity,
            activityparams: r,
            server_jsonstr: n
        });
        a._sendData(o, "event");
    }, e.prototype.sendEventData = function(t) {
        if ((!e.afterLogin || !e.afterDecode) && n < 50) {
            var r = this;
            return setTimeout(function() {
                n++, r.sendEventData(t);
            }, 1e3), !1;
        }
        "string" == typeof t.activity && a._sendEventData(t), "string" == typeof t.zhugeActivity && a.sendZhugeEventData(t.zhugeActivity, t.zhugeActivityparam);
    }, e.prototype._sendData = function(e, a) {
        var r = {
            sign: t(JSON.stringify(e) + "juanpi_wxapp#$PPV2719#$%tREwqq666^"),
            api: "wxapplet." + a,
            data: e,
            version: "1.0.1"
        };
        wx.request({
            url: "https://d.juanpi.com/wxapplet/receiver/receive.do",
            data: r,
            header: {
                "Content-Type": "application/json"
            },
            success: function(e) {
                e.data;
            }
        });
    }, e.prototype._getZhugeCommonData = function(t) {
        return {
            "App应用名称": "卷皮折扣",
            "终端": "小程序",
            "app渠道号": e.utm,
            "来源": e.source,
            "页面名称": e.zhuge_pagename,
            "页面来源": e.zhuge_pre_pagename,
            "用户标签": wx.getStorageSync("jpGoodsUtype") || "C4",
            "人群id": wx.getStorageSync("jpUserGroup") || "",
            "卷皮设备id": e.id_num,
            "场景值": e.scene_value
        };
    }, e.prototype.getZhugeUserData = function(e) {
        return;
    }, e.prototype.sendZhugeEventData = function(e, t) {
        return;
    }, e.prototype.sendZhugePageData = function(e) {
        arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return;
    }, e.prototype.pageEvents = {
        onHide: function() {
            e.pre_pagename = e.pagename, e.pre_param = e.param, e.zhuge_pre_pagename = e.zhuge_pagename;
        },
        onUnload: function() {
            e.pre_pagename = e.pagename, e.pre_param = e.param, e.zhuge_pre_pagename = e.zhuge_pagename;
        },
        statisticsTap: function(e) {
            var t = e.currentTarget.dataset;
            a.sendEventData(t), t.url && t.url.indexOf("xcx://") >= 0 && getApp().gotoOtherXcx(t.url);
        }
    }, e.prototype.getData = function(t) {
        return e[t];
    }, e.prototype.setData = function(t, a) {
        e[t] = a;
    });
}

"function" == typeof Symbol && Symbol.iterator;

var t = require("./md5.min");

module.exports = new e();