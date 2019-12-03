Page({
    onLoad: function(e) {
        wx.canIUse && wx.canIUse("web-view") || wx.showModal({
            title: "温馨提醒",
            content: "您的微信版本较低，无法使用该功能，请升级您的微信。",
            confirmText: "知道了",
            showCancel: !1
        });
        var t = encodeURI(decodeURIComponent(e.url) + "#wechat_redirect");
        this.setData({
            webUrl: t
        }), wx.setNavigationBarTitle({
            title: e.title
        });
    }
});