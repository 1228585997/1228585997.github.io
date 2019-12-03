var t = require("../../../utils/tools").countdown;

Component({
    properties: {
        state: {
            type: Number,
            value: 1
        },
        seconds: {
            type: Number,
            value: 0,
            observer: function(e) {
                this.setData({
                    formatted: t(1e3 * e).map(function(t) {
                        return t <= 9 ? "0" + t : t;
                    })
                });
            }
        }
    },
    data: {
        formatted: []
    }
});