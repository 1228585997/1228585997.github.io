function t(t) {
    var e = t.data.interval;
    if (e) {
        var a = function() {
            var e = t.data, a = e.index, n = e.data, i = e.even;
            ++a >= n.length && (a = 0), t.$setData({
                index: a,
                even: !i
            });
        };
        return a(), setInterval(a, e);
    }
}

Component({
    watch: {
        data: function() {
            this.$setData({
                index: 0
            });
        }
    },
    computed: {
        stylestr: {
            require: [ "interval" ],
            fn: function(t) {
                var e = t.interval;
                return e ? "animation-duration:" + e / 1e3 + "s;" : "";
            }
        }
    },
    properties: {
        data: Array,
        extraStyle: String,
        interval: {
            type: Number,
            value: 3e3
        }
    },
    data: {
        even: !0,
        index: 0
    },
    attached: function() {
        this.start();
    },
    detached: function() {
        this.stop();
    },
    methods: {
        start: function() {
            clearInterval(this._timer), this._timer = t(this);
        },
        stop: function() {
            clearInterval(this._timer);
        }
    }
});