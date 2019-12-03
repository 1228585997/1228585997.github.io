function t(t, e, r) {
    return e in t ? Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = r, t;
}

var e = getApp();

module.exports = {
    countdown: function(r) {
        for (var n = this, i = r.timeKey + "_clear", a = this.data, o = i.split("."), s = 0; s < o.length; s++) a[o[s]] && (a = a[o[s]]);
        clearTimeout(a);
        var h = void 0;
        if (h = r.isAct ? r.left || r.endTime - (new Date().getTime() + e.globalData.ACT_TIME_DIFF) : r.left || r.endTime - (new Date().getTime() + e.globalData.TIME_DIFF), 
        r.timeKey = r.timeKey || "time", h > 0) {
            var u = Math.floor(h / 864e5), c = Math.floor(h / 36e5), l = c % 24, m = Math.floor(h % 36e5 / 6e4), A = Math.floor(h % 6e4 / 1e3);
            r.noShow || this.setData(t({}, r.timeKey, {
                days: u,
                hours: c,
                hoursAfterDays: l,
                minutes: m,
                seconds: A,
                hoursArr: c >= 10 ? [ String(c).charAt(0), String(c).charAt(1) ] : [ "0", String(c) ],
                minutesArr: m >= 10 ? [ String(m).charAt(0), String(m).charAt(1) ] : [ "0", String(m) ],
                secondsArr: A >= 10 ? [ String(A).charAt(0), String(A).charAt(1) ] : [ "0", String(A) ]
            })), r.left = h - 1e3, this.setData(t({}, i, setTimeout(function() {
                n.countdown(r);
            }, 1e3)));
        } else r.noShow || this.setData(t({}, r.timeKey, {
            hours: 0,
            hoursAfterDays: 0,
            minutes: 0,
            seconds: 0,
            hoursArr: [ "0", "0" ],
            minutesArr: [ "0", "0" ],
            secondsArr: [ "0", "0" ]
        })), r.onEnd && r.onEnd(r.data);
    }
};