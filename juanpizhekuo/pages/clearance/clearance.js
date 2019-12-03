function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var t = getApp(), e = require("../../utils/util"), o = require("../../utils/statistics"), i = require("../../components/blockAds/index"), s = require("../../components/backtop/backtop"), n = require("../../components/bottom-menu/index"), r = require("../../utils/throttle"), c = void 0, u = !1, d = require("../../components/toast/toast");

Page(e.mergePage({
    data: {
        curTab: 0,
        cate: [ {
            txt: "精选",
            val: "ppqc_jingxuan",
            page: 1,
            noMore: 0,
            goods_list: [],
            subCates: [],
            curSubCate: -1,
            zg_json: {
                "tab名称": "精选"
            }
        }, {
            txt: "鞋包配饰",
            val: "xiezi",
            page: 1,
            noMore: 0,
            goods_list: [],
            subCates: [],
            curSubCate: -1,
            zg_json: {
                "tab名称": "鞋包配饰"
            }
        }, {
            txt: "美妆",
            val: "meizhuang",
            page: 1,
            noMore: 0,
            goods_list: [],
            subCates: [],
            curSubCate: -1,
            zg_json: {
                "tab名称": "美妆"
            }
        }, {
            txt: "运动",
            val: "yundong",
            page: 1,
            noMore: 0,
            goods_list: [],
            subCates: [],
            curSubCate: -1,
            zg_json: {
                "tab名称": "运动"
            }
        }, {
            txt: "母婴童装",
            val: "muyingtongzhuang",
            page: 1,
            noMore: 0,
            goods_list: [],
            subCates: [],
            curSubCate: -1,
            zg_json: {
                "tab名称": "母婴童装"
            }
        }, {
            txt: "居家数码",
            val: "jujiashuma",
            page: 1,
            noMore: 0,
            goods_list: [],
            subCates: [],
            curSubCate: -1,
            zg_json: {
                "tab名称": "居家数码"
            }
        } ],
        ready: !1,
        scrollTop: 0,
        ifSupportQuery: !!wx.createSelectorQuery,
        inViemportArr: {},
        isTopHidden: !0
    },
    bindTabTap: function(a) {
        var t = a.currentTarget.dataset, e = t.index, i = "1" === t.sub, s = this.data.curTab;
        if (i) {
            if (e == this.data.cate[s].curSubCate) return;
            this.getData(s, !1, e, !0);
        } else {
            if (e == s) return;
            this.getData(e, !0);
        }
        this.setData({
            scrollTop: 0
        }), setTimeout(this.setBarAni, 200), o.sendEventData(t);
    },
    bindTimeTabTap: function(a) {
        var t = a.currentTarget.dataset.index;
        t != this.data.curTimeTab && this.setData({
            curTimeTab: t
        });
    },
    scrollBottom: function(a) {
        this.getData(this.data.curTab);
    },
    dealScroll: function(a) {
        this._dealScroll(a);
    },
    _dealScroll: r(function(a) {
        var t = this, e = a.detail.scrollTop;
        if (e > 1e3) t.data.isTopHidden && t.setData({
            isTopHidden: !1
        }); else if (e < 100 && !t.data.isTopHidden) {
            var o = {
                isTopHidden: !0
            };
            t.setData(o);
        }
        t.setBarAni();
    }, 200),
    setBarAni: function() {
        var a = this.data;
        if (0 == a.curTab && a.ifSupportQuery) {
            var e = this;
            wx.createSelectorQuery().selectAll(".needAni").boundingClientRect().exec(function(a) {
                var o = t.globalData.SYSTIME_INFO, i = {};
                (a = a[0]).forEach(function(a) {
                    var t = a.top >= 0 && a.left >= 0 && a.bottom <= o.windowHeight && a.right <= o.windowWidth;
                    i[a.id] = t;
                }), e.setData({
                    inViemportArr: i
                });
            });
        }
    },
    onLoad: function() {
        wx.showLoading && wx.showLoading({
            title: "加载中"
        });
        var a = this;
        e.getZyId(function(t) {
            c = "p16_" + t, a.getData(a.data.curTab);
        }), this.getBottomMenu("pages/clearance/clearance");
        var t = wx.createAnimation({
            duration: 500
        }).translateX(0).step(), i = wx.createAnimation({
            duration: 500
        }).translateX("-100%").step();
        this.setData({
            animation: t.export(),
            backAnimation: i.export()
        }), o.sendZhugePageData("进入品牌特卖页", {});
    },
    onShow: function() {
        o.sendPageData("page_tab", "ppqc_jingxuan", "进入品牌特卖页");
    },
    getData: function(a, t, e, o) {
        0 == a ? this.getFirstCateData(c, t) : this.getOtherCateData(a, t, e, o);
    },
    getFirstCateData: function(a, e) {
        var o = this;
        if (1 == this.data.cate[0].noMore || e && 1 != this.data.cate[0].page || u) this.setData({
            curTab: 0
        }); else {
            u = !0;
            var i = this, s = t.getPublicArg();
            1 == i.data.cate[0].page && (wx.request({
                url: t.globalData.URL_MAPI + "brandclearance/xsjl",
                data: {
                    platform: s.jpPlatform
                },
                success: function(a) {
                    var t = a.data, e = void 0 === t ? {} : t;
                    wx.hideLoading && wx.hideLoading(), i.setData({
                        curTimeTab: e.time_index,
                        timeTab: e.data,
                        ready: !0
                    }), setTimeout(i.setBarAni, 200);
                }
            }), i.getAds(a, i.data.cate[0].val, 0), i.getCoupon());
            var n = {};
            n.app_name = s.jpAppName, n.app_version = s.jpAppVersion, n.cid = i.data.cate[0].val, 
            n.platform = s.jpPlatform, n.utm = s.jpUtm, n.page = i.data.cate[0].page, n.zy_ids = a, 
            n.apisign = t.createApisign(n), wx.request({
                url: t.globalData.URL_MAPI + "goods/zhe/list",
                data: n,
                success: function(a) {
                    var t = a.data, e = void 0 === t ? {} : t;
                    if (u = !1, 1e3 == e.code) {
                        var s = e.data.goods;
                        i.setData({
                            "cate[0].goods_list": o.data.cate[0].goods_list.concat(s),
                            "cate[0].page": ++i.data.cate[0].page,
                            "cate[0].noMore": e.data.has_more_page,
                            curTab: 0
                        });
                    }
                }
            });
        }
    },
    getOtherCateData: function(e, o, i, s) {
        var n = this, r = n.data.cate[e];
        if (s && (r.page = 1, r.noMore = 0, r.curSubCate = i), 1 == r.noMore || o && 1 != r.page || u) this.setData({
            curTab: e
        }); else {
            u = !0;
            var c = t.getPublicArg(), d = {
                brandclear: "brandclear_127_419_A"
            };
            d.cate_key = r.val, -1 != r.curSubCate && (d.cate_id = r.subCates[r.curSubCate].cate_id), 
            d.pf = c.jpPlatform, d.page = r.page, d.apisign = t.createApisign(d), wx.request({
                url: t.globalData.URL_MAPI + "brandclearance/other_goods_list",
                data: d,
                success: function(t) {
                    var o = t.data, i = void 0 === o ? {} : o;
                    if (u = !1, 1e3 == i.code) {
                        var s, c = i.data;
                        n.setData((s = {}, a(s, "cate[" + e + "].goods_list", 1 == r.page ? c.goods : r.goods_list.concat(c.goods)), 
                        a(s, "cate[" + e + "].subCates", c.cate_key_info || []), a(s, "cate[" + e + "].page", ++r.page), 
                        a(s, "cate[" + e + "].curSubCate", r.curSubCate), a(s, "cate[" + e + "].noMore", 1 == c.more_page ? 0 : 1), 
                        a(s, "curTab", e), s));
                    }
                }
            });
        }
    },
    getCoupon: function() {
        var a = this, e = t.getPublicArg();
        wx.request({
            url: t.globalData.URL_MAPI + "brandclearance/coupons",
            data: {
                uid: e.jpUid,
                platform: e.jpPlatform,
                app_version: e.jpAppVersion
            },
            success: function(t) {
                var e = t.data, o = void 0 === e ? {} : e;
                a.setData({
                    coupon: o.data.info || []
                });
            }
        });
    },
    bindCouponTap: function(a) {
        var e = this;
        if (!t.checkLogin()) return t.goLogin(), !1;
        var i = this, s = a.currentTarget.dataset, n = s.index, r = s.id;
        if (1 == s.status) {
            var c = t.getPublicArg();
            c.goods_utype = c.jpGoodsUtype, c.platform = c.jpPlatform, c.uid = c.jpUid, c.sign = c.jpSign, 
            c.idList = r, c.source = "ppqc", c.apisign = t.createApisign(c), wx.request({
                url: t.globalData.URL_MAPI + "coupons/add",
                data: c,
                success: function(a) {
                    var t = a.data, o = void 0 === t ? {} : t;
                    1e3 == o.code ? (e.data.coupon[n].pic_url = o.data.coupon_pic, e.data.coupon[n].status = o.data.status, 
                    e.setData({
                        coupon: e.data.coupon
                    }), i.showToastMsg(o.info)) : i.showToastMsg(o.info);
                }
            }), o.sendEventData({
                activity: "click_temai_coupons_receive",
                activityparam: r,
                zhugeActivity: "领券"
            });
        }
    },
    onShareAppMessage: function() {
        return t.setShare("超大品牌特卖会，折扣给力价格划算快来看！", "pages/clearance/clearance", null, "https://goods3.juancdn.com/act/180205/4/c/5a77f874a9fcf84b812857fe_750x600.png");
    }
}, i, {
    bindTopTap: s.bindTopTap
}, d, o.pageEvents, n));