var e = getApp(), t = require("../../utils/util.js"), a = require("../../utils/statistics"), o = require("../../components/error-msg/error-msg"), i = require("../../components/get-coupon/index"), s = require("../../components/mask/mask"), r = require("../../components/minicart/minicart"), n = require("../../components/share/share"), d = require("../../pages/cart/common/index"), g = t.mergePage({
    data: {
        cart_group: [],
        history_goods: [],
        isEmpty: !0,
        isAllSel: !1,
        total_real_price: 0,
        total_goods_price: 0,
        total_reduce_money: 0,
        isVipUser: "",
        ready: !1,
        limitGoodId: "",
        limitArr: [],
        isVip: !1
    },
    onLoad: function() {
        a.sendZhugePageData("进入购物车", {}), this.setData({
            isVip: wx.getStorageSync("vipStatus") > 0
        });
    },
    onHide: function() {
        this.setData({
            limitArr: []
        });
    },
    dealScroll: function(e) {
        console.log(e);
    },
    onShow: function() {
        var e = this;
        e.checkIsLogin() && (wx.showLoading && wx.showLoading({
            title: "加载中"
        }), e.getCart()), a.sendPageData("page_temai_bag", "", "进入购物车");
    },
    getLikeGoods: function(e) {
        this.getGoods();
    },
    getGoods: function() {
        var t = this, a = {
            scene_key: "fenxiao_gaoyong",
            app_version: e.globalData.APP_VERSION,
            platform: e.globalData.PLATFORM
        };
        wx.request({
            url: e.globalData.URL_MAPI + "xcxgoods/goodslist",
            data: a,
            method: "GET",
            header: {
                "Content-Type": "application/json"
            },
            success: function(e) {
                var a = e.data, o = void 0 === a ? {} : a;
                if (o && 1e3 == o.code && o.data && o.data) {
                    var i = o.data.goods || [], s = {};
                    s.likeGoodsList = i.slice(0, 6), t.setData(s);
                }
            }
        });
    },
    onShareAppMessage: function(t) {
        var a = "pages/index/index";
        if ("button" == t.from && n.buttonShare) {
            t.target.dataset.path = a = "pages/index/index?goto=" + encodeURIComponent("/" + t.target.dataset.path);
            var o = n.buttonShare(t.target.dataset);
            return this.setData({
                showShareModal: !1
            }), o;
        }
        return e.setShare("推荐一家有品质的折扣店《卷皮折扣》", a);
    }
}, o, i, d, s, r, a.pageEvents, n);

Page(g), module.exports = g;