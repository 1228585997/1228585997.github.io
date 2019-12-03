var e = require("../../../utils/consts").DETAILS_IMAGES;

Component({
    properties: {
        state: null,
        userInfo: null,
        courier: null,
        cid: null
    },
    data: {
        DETAILS_IMAGES: e
    },
    methods: {
        onTapAddressButton: function() {
            var e = this.data.cid;
            e && wx.redirectTo({
                url: "/pages/bargain/expressAddress/index?cid=" + e
            });
        }
    }
});