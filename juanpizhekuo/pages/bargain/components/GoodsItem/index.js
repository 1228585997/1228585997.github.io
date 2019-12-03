function e(e) {
    return e > 9 ? e : "0" + e;
}

function t(t) {
    return a(t).map(e).join(":");
}

var a = require("../../utils/tools").countdown;

Component({
    properties: {
        data: {
            type: Object
        },
        type: {
            type: Number,
            value: 0
        }
    },
    attached: function() {
        var e = this, a = 1e3 * (this.data.data || {}).end_time;
        if (!isNaN(a)) {
            var i = a - Date.now();
            this.setData({
                _endTime: i,
                _remainingTime: t(i)
            }), this.timer = setInterval(function() {
                var a = e.data._endTime;
                if (a <= 0) clearInterval(e.timer); else {
                    var i = a - 1e3;
                    e.setData({
                        _endTime: i,
                        _remainingTime: t(i)
                    });
                }
            }, 1e3);
        }
    },
    detached: function() {
        clearInterval(this.timer);
    },
    data: {
        _endTime: 0,
        _remainingTime: ""
    },
    methods: {
        onTap: function(e) {
            var t = e.currentTarget.dataset.url;
            wx.redirectTo({
                url: t
            });
        }
    }
});