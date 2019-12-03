module.exports = function(l, n, u) {
    function t() {
        var c = Date.now() - a;
        c < n && c >= 0 ? e = setTimeout(t, n - c) : (e = null, u || (i = l.apply(r, o), 
        r = o = null));
    }
    var e, o, r, a, i;
    null == n && (n = 100);
    var c = function() {
        r = this, o = arguments, a = Date.now();
        var c = u && !e;
        return e || (e = setTimeout(t, n)), c && (i = l.apply(r, o), r = o = null), i;
    };
    return c.clear = function() {
        e && (clearTimeout(e), e = null);
    }, c.flush = function() {
        e && (i = l.apply(r, o), r = o = null, clearTimeout(e), e = null);
    }, c;
};