var a = getApp(), e = require("../../../utils/util"), t = require("../../../utils/statistics"), o = require("../../../components/toast/toast"), r = require("../../../components/go-webview/index"), i = require("../../../components/mask/mask"), n = "", s = "";

Page(e.mergePage({
    data: {
        ready: !1
    },
    onLoad: function(e) {
        var t = this, o = this;
        a.checkLogin() || a.goLogin(!0), wx.showLoading && wx.showLoading({
            title: "加载中"
        });
        var r = a.getPublicArg();
        r.app_version = r.jpAppVersion, r.comParam = e.comparam, r.request_time = new Date().getTime() + 1e3 * a.globalData.TIME_DIFF, 
        r.uid = r.jpUid, r.platform = r.jpPlatform, r.apisign = a.createApisign(r), wx.request({
            url: a.globalData.URL_MTRADE + "refundapply/type",
            data: r,
            method: "GET",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(a) {
                wx.hideLoading && wx.hideLoading(), "1000" == a.data.code ? (o.setData(a.data.data.list[1]), 
                n = a.data.data.comParam) : o.showToastMsg(a.data.info);
            },
            complete: function() {
                t.setData({
                    ready: !0
                });
            }
        });
    },
    serviceTap: function(a) {
        var e = a.currentTarget.dataset;
        e.title = "小卷在线", e.url = "https://im.juanpi.com/chat/chatBox?pType=11&uid=" + wx.getStorageSync("uid") + "&uname=" + wx.getStorageSync("uname"), 
        this.goWebview(a);
    },
    onShow: function() {},
    typeTap: function(t) {
        var o = this, r = this, i = t.currentTarget.dataset, p = a.getPublicArg();
        p.app_version = p.jpAppVersion, p.comParam = n, p.extraParam = i.extraparam, p.request_time = new Date().getTime() + 1e3 * a.globalData.TIME_DIFF, 
        p.uid = p.jpUid, p.platform = p.jpPlatform, p.apisign = a.createApisign(p), wx.request({
            url: a.globalData.URL_MTRADE + "refundapply/reason",
            data: p,
            method: "GET",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(a) {
                wx.hideLoading && wx.hideLoading(), "1000" == a.data.code ? (r.setData({
                    reasons: a.data.data.reasons
                }), s = a.data.data.comParam, e.maskUpAnimation(o, "showReason")) : r.showToastMsg(a.data.info);
            }
        });
    },
    closeReason: function() {
        e.maskDownAnimation(this, "showReason");
    },
    reasonTap: function(a) {
        var e = a.currentTarget.dataset;
        wx.redirectTo({
            url: "/pages/user/after-sales/after-sales-confirm?comparam=" + s + "&extraparam=" + e.extraparam
        });
    }
}, t.pageEvents, r, i, o));