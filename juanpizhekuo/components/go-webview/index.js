var e = require("../../utils/statistics");

module.exports = {
    goWebview: function(t) {
        var i = t.currentTarget.dataset, a = i.url;
        wx.canIUse && wx.canIUse("web-view") ? (a = "/pages/webview/webview?url=" + encodeURIComponent(a) + "&title=" + (i.title || ""), 
        wx.navigateTo({
            url: a
        })) : wx.showModal({
            title: "温馨提醒",
            content: "您的微信版本较低，无法使用该功能，请升级您的微信。",
            confirmText: "知道了",
            showCancel: !1
        }), i.activity && e.sendEventData(i);
    }
};