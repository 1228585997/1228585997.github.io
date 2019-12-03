var e = getApp().deps.imageUrl, t = 1 == wx.getStorageSync("add_favorite_guide");

Component({
    data: {
        shown: !t,
        bgImageUrl: e("/pages/user/index/components/AddFavoriteGuide/images/pointer", "gif")
    },
    methods: {
        onTap: function() {
            wx.setStorageSync("add_favorite_guide", 1), this.setData({
                shown: !1
            }), this.triggerEvent("click");
        }
    }
});