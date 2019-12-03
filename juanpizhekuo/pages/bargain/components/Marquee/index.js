var t = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    }
    return t;
}, a = require("../../utils/consts");

Component({
    properties: {
        users: {
            type: null,
            value: []
        }
    },
    attached: function() {
        var t = this, a = this.data.users;
        if (a && a.length) {
            var e = Math.ceil(a.length / 3), r = 0;
            this.timer = setInterval(function() {
                t.setData({
                    _listData: a.slice(3 * r, 3 * (r + 1)),
                    _animate: !t.data._animate
                }), ++r >= e && (r = 0);
            }, 1500);
        }
    },
    detached: function() {
        clearInterval(this.timer);
    },
    data: t({}, a, {
        _animate: !1,
        _listData: []
    })
});