var t = getApp().deps, e = t.sites, n = t.request, a = t.patchComponent, i = e.mapi.url("/appads/homepopupnew");

a(Component)({
    computed: {
        imageUrl: {
            require: [ "currentItem" ],
            fn: function(t) {
                return t.currentItem.image_url || "";
            }
        },
        currentItem: {
            require: [ "index", "popupList" ],
            fn: function(t) {
                var e = t.index;
                return t.popupList[e] || {};
            }
        }
    },
    attached: function() {
        var t = this;
        n({
            url: i
        }).then(function(e) {
            var n = e.items;
            n && n.length && t.$setData({
                popupList: n,
                index: 0,
                shown: !0
            });
        });
    },
    data: {
        shown: !1,
        index: -1,
        popupList: []
    },
    methods: {
        onTapClose: function() {
            var t = this;
            this.$setData({
                shown: !1
            });
            var e = this.data, n = e.index, a = e.popupList.length;
            n++, a && n < a && setTimeout(function() {
                t.$setData({
                    index: n,
                    shown: !0
                });
            }, 100);
        },
        onTapImage: function() {
            var t = (this.data.currentItem || {}).jump_url;
            t ? (wx.navigateTo({
                url: t
            }), this.$setData({
                shown: !1
            })) : this.onTapClose();
        }
    }
});