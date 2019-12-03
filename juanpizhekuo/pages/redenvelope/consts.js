var e = function() {
    function e(e, r) {
        var t = [], n = !0, i = !1, o = void 0;
        try {
            for (var a, u = e[Symbol.iterator](); !(n = (a = u.next()).done) && (t.push(a.value), 
            !r || t.length !== r); n = !0) ;
        } catch (e) {
            i = !0, o = e;
        } finally {
            try {
                !n && u.return && u.return();
            } finally {
                if (i) throw o;
            }
        }
        return t;
    }
    return function(r, t) {
        if (Array.isArray(r)) return r;
        if (Symbol.iterator in Object(r)) return e(r, t);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), r = getApp().deps, t = r.sites, n = r.request, i = r.imageUrl, o = {}, a = [ "claim.gif", "click_me.gif", "close_btn.png", "join_second.gif", "open_treasure_box.gif", "popup_home.png", "share_cover.png", "share_to_group.gif", "success_bg.png", "treasure_box.png", "using_now.gif" ];

for (var u in a) {
    var s = e(a[u].split("."), 2), g = s[0], p = s[1];
    o[g] = function(e) {
        var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "png";
        return i("/pages/redenvelope/images/" + e, r);
    }(g, p);
}

module.exports = {
    apiMsgBubble: function() {
        return n({
            url: t.mact.url("/HelpRedBag-getActUserList")
        });
    },
    imageRefs: o
};