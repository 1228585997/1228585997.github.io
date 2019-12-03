var t = {
    changeStar: function(t) {
        var e = t.currentTarget.dataset.index, a = {};
        a[t.currentTarget.dataset.key] = e, this.setData(a);
    }
};

module.exports = t;