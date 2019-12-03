var t = require("../../utils/statistics"), o = {
    onPageScroll: function(t) {
        t.scrollTop >= 400 ? this.setData({
            isTopHidden: !1
        }) : this.setData({
            isTopHidden: !0
        });
    },
    bindTopTap: function(o) {
        wx.pageScrollTo ? wx.pageScrollTo({
            scrollTop: 0
        }) : wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        });
        var e = o.currentTarget.dataset;
        t.sendEventData(e);
    }
};

module.exports = o;