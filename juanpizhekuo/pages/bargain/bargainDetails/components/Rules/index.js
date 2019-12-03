var t = require("../../../utils/consts").DETAILS_IMAGES;

Component({
    data: {
        DETAILS_IMAGES: t
    },
    methods: {
        onTap: function() {
            this.triggerEvent("close");
        }
    }
});