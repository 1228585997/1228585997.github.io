var t = require("../../utils/statistics"), s = {
    closeCoupon: function() {
        this.setData({
            alertCouponShow: !1
        });
    },
    couponTap: function(s) {
        this.setData({
            alertCouponShow: !1
        }), t.pageEvents.statisticsTap(s);
    }
};

module.exports = s;