function t(t, e) {
    return new Promise(function(r, i) {
        wx.request(Object.assign({}, e, {
            url: t,
            header: {
                "content-type": "application/json",
                jpId: n.getData("id_num"),
                jpUid: wx.getStorageSync("uid") || 0
            },
            success: function(t) {
                return r(t);
            },
            fail: function(t) {
                return i(t);
            }
        }));
    });
}

function e(t) {
    var e = t.indexOf("{") + 1, n = t.indexOf("}"), r = t.substring(e, n), i = getApp().getPublicArg();
    return i[r] ? i[r] : "";
}

var n = require("./statistics"), r = require("./md5.min");

module.exports = {
    createApi: t,
    createApisign: function(t) {
        var e = Object.keys(t).sort().map(function(e) {
            return e + "=" + t[e];
        });
        return e = r(e.join("&") + "juanpi_oauth#$A.*$%(#$%16rwtr712^");
    },
    GET: function(e, n, r) {
        return t(e, Object.assign({}, r, {
            method: "GET",
            data: n
        }));
    },
    POST: function(e, n, r) {
        return t(e, Object.assign({}, r, {
            method: "POST",
            data: n
        }));
    },
    getRequestParams: function(t) {
        var n = new Object();
        if (-1 != t.indexOf("?")) for (var r = t.substring(t.indexOf("?") + 1).split("&"), i = 0; i < r.length; i++) {
            var u = unescape(r[i].split("=")[1]);
            if (-1 != u.indexOf("$")) {
                var s = e(u);
                n[r[i].split("=")[0]] = s;
            } else n[r[i].split("=")[0]] = u;
        }
        return n;
    }
};