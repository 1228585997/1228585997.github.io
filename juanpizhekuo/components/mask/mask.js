function t(t, e, i) {
    return e in t ? Object.defineProperty(t, e, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = i, t;
}

var e = require("../../utils/util"), i = require("../../utils/statistics");

module.exports = {
    openMask: function(t) {
        var a = t.currentTarget.dataset, n = a.target;
        e.maskUpAnimation(this, n), a.activity && i.sendEventData(a);
    },
    closeMask: function(a) {
        var n = a.currentTarget.dataset, r = n.target, s = n.direction;
        "right" == s ? e.maskRightAnimation(this, r) : "none" == s ? this.setData(t({}, r, !1)) : e.maskDownAnimation(this, r), 
        n.activity && i.sendEventData(n);
    }
};