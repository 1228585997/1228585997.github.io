var t = getApp(), a = require("../../../utils/util.js"), e = require("../../../utils/statistics"), n = require("../../../components/error-msg/error-msg"), i = require("../dmqc.service.js"), s = require("../../../components/mask/mask.js"), o = require("../../../components/toast/toast");

Page(a.mergePage({
    data: {
        ready: !1,
        curTab: 0,
        tabList: [],
        showTab: !0,
        brandInfo: ""
    },
    onLoad: function() {
        this.sectionTop = [], wx.showLoading && wx.showLoading({
            title: "加载中"
        }), this.loadBrandWall(""), e.sendZhugePageData("进入心水大牌页", {});
    },
    onShow: function() {
        e.sendPageData("page_like_brand", "", "进入心水大牌页");
    },
    loadBrandWall: function(t) {
        var a = this;
        this.getBrandWall(t).then(function(t) {
            for (var e = [], n = [], i = 0; i < t.data.brands.length; i++) {
                var s, o = t.data.brands[i];
                if ("1" == o.type) {
                    var r = {
                        item: o.tab_item,
                        title: o.tab_name
                    };
                    s = r, e.push(r);
                } else n.push({
                    title: s.title,
                    list: o.list
                });
            }
            a.originList = n, a.setData({
                tabList: e,
                brandList: n,
                ready: !0
            }), wx.hideLoading && wx.hideLoading();
            for (var d = 0, i = 0; i < n.length; i++) {
                a.sectionTop[i] = d, d = d + 48 + 11;
                var h = a.data.brandList[i].list.length;
                d += 80 * Math.ceil(h / 4);
            }
        });
    },
    dealScroll: function(t) {
        var a, e = t.detail.scrollTop, n = this.sectionTop.length - 1;
        if (e >= this.sectionTop[n]) a = n; else for (var i = 0; i < this.sectionTop.length - 1; i++) if (e >= this.sectionTop[i] && e < this.sectionTop[i + 1]) {
            a = i;
            break;
        }
        this.setData({
            curTab: a
        });
    },
    bindNavTap: function(t) {
        var a = t.currentTarget.dataset, n = a.index, i = this.sectionTop[n];
        this.setData({
            curTab: n,
            scrollTop: i
        }), a.zhugeActivityparam = {
            "tab名称": a.title
        }, e.sendEventData(a);
    },
    brandcelltap: function(t) {
        var a = t.currentTarget.dataset, n = a.jump_url, i = a.status;
        e.sendEventData(a), n.length && 1 == i ? wx.navigateTo({
            url: n
        }) : 0 == i && this.setData({
            showPopWin: !0
        });
    },
    onSearchInput: function(t) {
        var a = this;
        "" == t.detail.value && this.setData({
            showTab: !0,
            brandList: a.originList
        });
    },
    onSearchFocus: function(t) {
        var a = t.currentTarget.dataset;
        e.sendEventData(a);
    },
    onSearchConfirm: function(t) {
        var a = this, e = t.detail.value;
        e && (wx.showLoading && wx.showLoading({
            title: "加载中"
        }), this.searchBrand(e).then(function(t) {
            if (wx.hideLoading(), "1000" === t.code) {
                var e = [], n = [];
                if (t.data.brands.length > 0) {
                    for (var i = 0; i < t.data.brands.length; i++) {
                        var s, o = t.data.brands[i];
                        if ("1" == o.type) {
                            var r = {
                                item: o.tab_item,
                                title: o.tab_name
                            };
                            s = r, e.push(r);
                        } else n.push({
                            title: s.title,
                            list: o.list
                        });
                    }
                    a.setData({
                        showTab: !1,
                        brandList: n
                    });
                } else a.setData({
                    brandInfo: "",
                    noBrandPop: !0
                });
            }
        }));
    },
    favoriteInput: function(t) {
        this.setData({
            brandInfo: t.detail.value
        });
    },
    tabUpload: function() {
        var a = this;
        a.showToastMsg(this.data.brandInfo), t.checkLogin() ? a.upLoadBrand() : t.goLogin();
    },
    upLoadBrand: function() {
        var t = this;
        this.data.brandInfo && (wx.showLoading && wx.showLoading({
            title: "加载中"
        }), this.uploadBrand(this.data.brandInfo).then(function(a) {
            wx.hideLoading(), "1000" === a.code ? (t.showToastMsg("提交成功"), t.setData({
                noBrandPop: !1,
                brandInfo: ""
            })) : t.showToastMsg(a.info);
        }));
    }
}, n, e.pageEvents, i, a, s, o));