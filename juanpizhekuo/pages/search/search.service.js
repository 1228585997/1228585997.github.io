var t = require("../../utils/http").GET, e = getApp().globalData;

module.exports = {
    getSearchKeywords: function(r) {
        return t(e.URL_MAPI + "goods/search_keywords", r).then(function(t) {
            return t.data;
        });
    },
    getSearchSuggest: function(r) {
        return t(e.URL_MAPI + "xcxgoods/search/suggest", {
            keyword: r
        }).then(function(t) {
            return t.data;
        });
    },
    getSearchGoods: function(r) {
        var n = {
            msort: 0,
            page: 1,
            platform: e.PLATFORM
        };
        return t(e.URL_MAPI + "goods/search", Object.assign({}, n, r)).then(function(t) {
            return t.data;
        });
    },
    getCateGoods: function(r) {
        return t(e.URL_MAPI + "xcxgoods/goodslist", Object.assign({}, r)).then(function(t) {
            return t.data;
        });
    }
};