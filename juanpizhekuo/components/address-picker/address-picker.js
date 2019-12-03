function e(e) {
    var r = [], t = [];
    for (var i in n) n[i][1] === e && (t.push(n[i][0]), r.push(i));
    return [ r, t ];
}

var r, t, i, a, s = function() {
    function e(e, r) {
        var t = [], i = !0, a = !1, s = void 0;
        try {
            for (var n, c = e[Symbol.iterator](); !(i = (n = c.next()).done) && (t.push(n.value), 
            !r || t.length !== r); i = !0) ;
        } catch (e) {
            a = !0, s = e;
        } finally {
            try {
                !i && c.return && c.return();
            } finally {
                if (a) throw s;
            }
        }
        return t;
    }
    return function(r, t) {
        if (Array.isArray(r)) return r;
        if (Symbol.iterator in Object(r)) return e(r, t);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), n = require("./address-data"), c = require("../../utils/util"), d = e("1"), o = s(d, 2), v = o[0], u = o[1], l = {
    onLoad: function() {
        this.setData({
            addressPicker: {
                provinceIdx: 0,
                cityIdx: 0,
                townIdx: 0,
                provinces: [ "选择省份" ].concat(u),
                cities: [ "选择城市" ],
                towns: [ "选择所在区域" ]
            }
        }), this.clearCity();
    },
    clearProvince: function() {
        this.setData({
            "addressPicker.provinceIdx": 0,
            "addressPicker.province": "",
            "addressPicker.provinceId": ""
        });
    },
    clearCity: function() {
        (!(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0]) && this.setData({
            "addressPicker.cities": [ "选择城市" ]
        }), this.setData({
            "addressPicker.cityIdx": 0,
            "addressPicker.city": "",
            "addressPicker.cityId": ""
        });
    },
    clearTown: function() {
        this.setData({
            "addressPicker.towns": [ "选择所在区域" ],
            "addressPicker.townIdx": 0,
            "addressPicker.town": "",
            "addressPicker.townId": ""
        });
    },
    provinceChange: function(i) {
        var a = i.detail.value;
        if (a < 1) return this.clearProvince(), this.clearCity(), void this.clearTown();
        var c = v[a - 1];
        this.setData({
            "addressPicker.provinceIdx": a,
            "addressPicker.provinceId": c,
            "addressPicker.province": n[c][0]
        });
        var d = e(c), o = s(d, 2);
        r = o[0], t = o[1], this.clearCity(), this.clearTown(), this.setData({
            "addressPicker.cities": [ "选择城市" ].concat(t)
        });
    },
    cityChange: function(t) {
        var c = t.detail.value;
        if (c < 1) return this.clearCity(!1), void this.clearTown();
        var d = r[c - 1];
        this.setData({
            "addressPicker.cityIdx": c,
            "addressPicker.cityId": d,
            "addressPicker.city": n[d][0]
        });
        var o = e(d), v = s(o, 2);
        i = v[0], a = v[1], this.clearTown(), this.setData({
            "addressPicker.towns": [ "选择所在区域" ].concat(a)
        });
    },
    townChange: function(e) {
        var r = e.detail.value;
        if (!(r < 1)) {
            var t = i[r - 1];
            this.setData({
                "addressPicker.townIdx": r,
                "addressPicker.townId": t,
                "addressPicker.town": n[t][0]
            });
        }
    },
    setAddress: function(e) {
        if (e.province) {
            var r = u.indexOf(e.province);
            this.provinceChange({
                detail: {
                    value: r + 1
                }
            });
        }
        if (e.city) {
            var i = t.indexOf(e.city);
            this.cityChange({
                detail: {
                    value: i + 1
                }
            });
        }
        if (e.town) {
            var s = a.indexOf(e.town);
            this.townChange({
                detail: {
                    value: s + 1
                }
            });
        }
    },
    checkAddress: function(e) {
        var r = {
            username: "请输入收货人",
            mobile: "请输入手机号码",
            province: "请选择省份",
            city: "请选择城市",
            town: "请选择所在区域",
            addr: "请输入详细地址"
        };
        for (var t in e) if (e[t].length < 1) {
            if ("town" == t && 1 === this.data.addressPicker.towns.length) return;
            return r[t];
        }
        if (!c.isMobile(e.mobile)) return "手机格式错误，请重新填写";
    }
};

module.exports = l;