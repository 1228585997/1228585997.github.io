function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function t(t, e) {
        for (var a = 0; a < e.length; a++) {
            var i = e[a];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(e, a, i) {
        return a && t(e.prototype, a), i && t(e, i), e;
    };
}(), a = require("../../../utils/statistics"), i = function() {
    function i(e) {
        t(this, i), this.page = e, this.page.quickSortCatesTap = this.quickSortCatesTap.bind(this), 
        this.page.quickSortCateTap = this.quickSortCateTap.bind(this), this.page.handleScroll = this.handleScroll.bind(this);
    }
    return e(i, [ {
        key: "quickSortCatesTap",
        value: function(t) {
            this.page.setData({
                quickSortCatesWrapperOpen: !this.page.data.quickSortCatesWrapperOpen
            }), "close" !== t.type && "close" !== t.currentTarget.dataset.type && a.sendEventData({
                activity: t.currentTarget.dataset.activity,
                activityparam: t.currentTarget.dataset.activityparam
            });
        }
    }, {
        key: "quickSortCateTap",
        value: function(t) {
            for (var e = t.currentTarget.dataset, a = this.page.data, i = 0; i < a.cates[a.activeCateIndex].sub_cat.length; i++) a.cates[a.activeCateIndex].sub_cat[i].id == e.ctid ? a.cates[a.activeCateIndex].sub_cat[i].issel = !a.cates[a.activeCateIndex].sub_cat[i].issel : a.cates[a.activeCateIndex].sub_cat[i].issel = !1;
            this.page.setData({
                activeCateIndex: e.index
            }), e.ctid || (this.page.filterItemTap(t), this.quickSortCatesTap({
                type: "close"
            }));
        }
    }, {
        key: "handleScroll",
        value: function(t) {
            t.detail.scrollTop > 0 ? (t.detail.deltaY > 30 && this.page.setData({
                hideSearchBar: !1
            }), t.detail.deltaY < -15 && this.page.setData({
                hideSearchBar: !0
            })) : this.page.setData({
                hideSearchBar: !1
            });
        }
    } ]), i;
}();

module.exports = i;