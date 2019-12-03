getApp();

var t = require("../../utils/statistics"), i = {
    bindTopTap: function(i) {
        this.setData({
            isTopHidden: !1,
            scrollTop: 0
        });
        var s = i.currentTarget.dataset;
        t.sendEventData(s);
    },
    dealScroll: function(t) {
        var i = t.detail.scrollTop;
        i > 1e3 ? this.data.isTopHidden && this.setData({
            isTopHidden: !1
        }) : i < 100 && !this.data.isTopHidden && this.setData({
            isTopHidden: !0
        });
    }
};

module.exports = i;