function n(n) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "png";
    return "" + a + n + "." + t;
}

function t(t, a) {
    for (var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "png", e = {}, o = 0; o < a.length; o++) e[a[o]] = n(t + "/images/" + a[o], i);
    return e;
}

var a = "https://jp.juancdn.com/jpwebapp_v4/dist/stylesheets/", i = t("bargain/common", [ "box-bg", "name-bg" ]), e = t("bargain/details", [ "award", "button5", "close", "closeItem", "congratulation", "guide", "left", "openItem", "right", "slash", "thumbnail_for_wxshare" ]);

Object.assign(e, t("bargain/details", [ "button1", "button2", "button3", "button4" ], "gif"));

var o = t("bargain", [ "bargaining", "join", "unbargaining", "unjoin" ]), r = t("bargain/list", [ "process" ]);

module.exports = {
    COMMON_IMAGES: i,
    DETAILS_IMAGES: e,
    BARGAIN_IMAGES: o,
    LIST_IMAGES: r
};