var t = require("../../../utils/consts").DETAILS_IMAGES;

Component({
    properties: {
        data: Array
    },
    data: {
        DETAILS_IMAGES: t,
        showMore: !1
    },
    methods: {
        onTapToggle: function() {
            var t = this.data.showMore;
            this.setData({
                showMore: !t
            });
        }
    }
});