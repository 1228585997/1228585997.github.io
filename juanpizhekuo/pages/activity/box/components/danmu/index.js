Component({
    properties: {
        data: Array,
        interval: {
            type: Number,
            value: 1e3
        },
        time: {
            type: Number,
            value: 1e4
        }
    },
    data: {
        danmuData: [],
        index: 0
    },
    detached: function() {
        this.setData({
            danmuData: []
        }), clearInterval(this.timer);
    },
    ready: function() {
        var t = this, a = this.data.interval;
        this.timer = setInterval(function() {
            var a = t.data, e = a.data, n = a.danmuData, r = a.index, i = a.time;
            r >= e.length && (r = 0);
            var o = e[r];
            r++;
            var d = {
                display: !0,
                text: o,
                top: t._getDefRamdom([ 40, 60, 80, 100 ]),
                time: i / 1e3
            };
            n.push(d), t.setData({
                danmuData: n,
                index: r
            }), setTimeout(function() {
                d.display = !1;
            }, i);
        }, a);
    },
    methods: {
        _getRandomColor: function() {
            for (var t = [], a = 0; a < 3; ++a) {
                var e = Math.floor(256 * Math.random()).toString(16);
                e = 1 == e.length ? "0" + e : e, t.push(e);
            }
            return "#" + t.join("");
        },
        _getDefRamdom: function(a) {
            var e = 0, n = 0;
            return t.length > 0 ? (e = Math.floor(Math.random() * t.length), n = t[e]) : n = a[e = Math.floor(Math.random() * a.length)], 
            a.splice(a.indexOf(n), 1), t = a, n;
        }
    }
});

var t = [];