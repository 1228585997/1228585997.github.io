function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var r = t[a];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, a, r) {
        return a && e(t.prototype, a), r && e(t, r), t;
    };
}(), a = function() {
    function a(t, r) {
        e(this, a), this.options = r || {}, this.page = t, this.page.setData({
            goodsTabs: r.data || []
        }), this.page.handleTapSortTab = this.handleTap.bind(this);
    }
    return t(a, [ {
        key: "handleTap",
        value: function(e) {
            var t, a, r = e.currentTarget.dataset.value, n = this.page.data.goodsTabs;
            n = n.map(function(e) {
                return e.sort = e.sortIndex, e.selected && r === e.value && e.orderType && (e.orderType = "asc" === e.orderType ? "desc" : "asc"), 
                e.orderType && (e.sort = "asc" === e.orderType ? e.sortIndex[0] : e.sortIndex[1]), 
                "filter" != r && "filter" != e.value && (e.selected = r === e.value), r === e.value && "filter" != r && (t = e), 
                a = "filter" == r, e;
            }), this.options.fallback && this.options.fallback(n.find(function(e) {
                return e.value === r;
            })), this.page.setData({
                goodsTabs: n
            }), this.page.sortTabTapHandler && this.page.sortTabTapHandler(t, a);
        }
    } ]), a;
}();

module.exports = a;