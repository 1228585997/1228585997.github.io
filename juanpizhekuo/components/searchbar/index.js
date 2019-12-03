require("../../components/send-formid/index"), require("../../utils/statistics");

var t = {
    searchImgLoad: function(t) {
        t.currentTarget.dataset;
        var e = t.detail, r = 15 * e.width / e.height, s = {
            "searchBar.width": parseInt(r, 10)
        };
        this.setData(s);
    }
};

module.exports = t;