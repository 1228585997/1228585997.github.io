var t = require("../../../utils/consts").DETAILS_IMAGES;

Component({
    properties: {
        msg: {
            type: null,
            value: ""
        }
    },
    data: {
        DETAILS_IMAGES: t
    },
    methods: {
        onTap: function() {
            this.triggerEvent("tapped");
        }
    }
});