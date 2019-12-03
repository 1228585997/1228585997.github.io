function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

getApp(), require("../../../../utils/util");

var e = require("../../../../utils/statistics");

module.exports = {
    ruleTransformData: function(e) {
        for (var a = /^#\s*/, r = [], l = e.rules.split("\n"), s = 0; s < l.length; s++) {
            var i = {};
            0 != s ? (l[s].length > 0 && "#" === l[s].charAt(0) ? (i.txt = l[s].replace(a, ""), 
            i.class = "modal__title") : (i.txt = l[s], i.class = "modal__txt"), r.push(i)) : (l[s].length > 0 && "#" === l[s].charAt(0) ? (i.txt = l[s].replace(a, ""), 
            i.class = "modal__title") : (i.txt = "活动规则", i.class = "modal__title", r.push(i), 
            (i = {}).txt = l[s], i.class = "modal__txt"), r.push(i));
        }
        return e.txtList = r, e.color = e.color || "#FF5050", this.setData(t({}, "ruleIsOpen." + e.id, "")), 
        e;
    },
    ruleTap: function(a) {
        var r = a.currentTarget.dataset, l = r.id;
        l || (l = this.data.defaultRuleId);
        var s = "open" == this.data.ruleIsOpen[l] ? "" : "open";
        this.setData(t({}, "ruleIsOpen." + l, s)), r.activity && e.sendEventData(r);
    }
};