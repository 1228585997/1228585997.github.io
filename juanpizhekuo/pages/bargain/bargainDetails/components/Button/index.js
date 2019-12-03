var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var r = arguments[e];
        for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (t[a] = r[a]);
    }
    return t;
}, e = require("../../../utils/consts");

Component({
    properties: {
        data: {
            type: Object,
            value: {}
        },
        activityState: Number
    },
    data: t({}, e, {
        pageState: null,
        image: null
    }),
    methods: {
        onTapButton: function(t) {
            var e = t.currentTarget.dataset.state;
            if (1 == e) ; else if (4 == e) this.triggerEvent("subscribe"); else {
                var r = this.data.data.goods_list_url;
                r && wx.redirectTo({
                    url: r
                });
            }
        }
    }
});