getApp();

var e = require("../../../utils/util"), t = require("../../../utils/statistics");

Page(e.mergePage({
    data: {
        rules: []
    },
    onShow: function() {
        t.sendPageData("page_withdrawal", "");
    }
}, t.pageEvents));