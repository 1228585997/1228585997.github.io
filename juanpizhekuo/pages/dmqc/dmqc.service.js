var t = require("../../utils/http"), n = t.GET, e = (t.createApisign, getApp()), r = getApp().globalData;

module.exports = {
    getGoods: function(t) {
        var a = e.getPublicArg();
        return t = Object.assign(t, a), n(r.URL_MAPI + "dmqc/goodslist", Object.assign({}, t)).then(function(t) {
            return t.data;
        });
    },
    getForecastBrands: function(t, a) {
        var c = {
            cid: t,
            page: a
        }, i = e.getPublicArg();
        return c = Object.assign(c, i), n(r.URL_MAPI + "dmqc/brandadvancenotice", Object.assign({}, c)).then(function(t) {
            return t.data;
        });
    },
    getBrandWall: function(t) {
        var a = {
            item: t
        }, c = e.getPublicArg();
        return a = Object.assign(a, c), n(r.URL_MAPI + "dmqc/brandwall", Object.assign({}, a)).then(function(t) {
            return t.data;
        });
    },
    searchBrand: function(t) {
        var a = {
            search: t
        }, c = e.getPublicArg();
        return a = Object.assign(a, c), n(r.URL_MAPI + "dmqc/brandwallsearch", Object.assign({}, a)).then(function(t) {
            return t.data;
        });
    },
    upLoadRecord: function(t, a, c) {
        var i = {
            sex: t,
            height: a,
            weight: c
        }, s = e.getPublicArg();
        return i = Object.assign(i, s), n(r.URL_MAPI + "dmqc/recommendsize", Object.assign({}, i)).then(function(t) {
            return t.data;
        });
    },
    uploadBrand: function(t) {
        var a = {
            brand_name: t
        }, c = e.getPublicArg();
        return a = Object.assign(a, c), n(r.URL_MAPI + "dmqc/brandwallreport", Object.assign({}, a)).then(function(t) {
            return t.data;
        });
    }
};