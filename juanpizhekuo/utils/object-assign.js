module.exports = function(r) {
    if (void 0 === r || null === r) throw new TypeError("Cannot convert undefined or null to object");
    for (var n = Object(r), o = 1; o < arguments.length; o++) {
        var e = arguments[o];
        if (void 0 !== e && null !== e) for (var t in e) e.hasOwnProperty(t) && (n[t] = e[t]);
    }
    return n;
};