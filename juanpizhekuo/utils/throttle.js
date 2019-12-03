module.exports = function(t, n) {
    function e() {
        l = 0, o = +new Date(), i = t.apply(u, r), u = null, r = null;
    }
    var u, r, i, l, o = 0;
    return function() {
        u = this, r = arguments;
        var t = new Date() - o;
        return l || (t >= n ? e() : l = setTimeout(e, n - t)), i;
    };
};