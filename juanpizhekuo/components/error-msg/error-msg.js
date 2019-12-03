var r;

module.exports = {
    showErrorMsg: function(t, e) {
        var s = this;
        clearTimeout(r), this.setData({
            errorMsg: t
        }), r = setTimeout(function() {
            s.setData({
                errorMsg: !1
            }), e && e();
        }, 2e3);
    }
};