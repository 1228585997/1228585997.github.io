var t = require("../../utils/statistics");

module.exports = {
    quickMenuTap: function() {
        this.setData({
            showQuickMenu: !this.data.showQuickMenu
        }), t.sendEventData({
            activity: "click_quickentry",
            activityparam: ""
        });
    }
};