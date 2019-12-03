var t = require("../../../utils/consts").DETAILS_IMAGES;

Component({
    properties: {
        codeUrl: String
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