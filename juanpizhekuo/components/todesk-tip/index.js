var e = getApp(), t = {
    setDeskTip: function(t, s) {
        t = "ifShowedDeskTip" + t, "android" === e.globalData.SYSTIME_INFO.platform.toLowerCase() && 1 != wx.getStorageSync(t) && (wx.setStorageSync(t, 1), 
        this.setData({
            ifShowDeskTip: !0,
            deskTip: s
        }));
    },
    closeDeskTip: function() {
        this.setData({
            ifShowDeskTip: !1
        });
    }
};

module.exports = t;