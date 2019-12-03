var t = getApp(), a = [], e = "0", i = require("../../../utils/util.js"), s = require("../../../components/error-msg/error-msg"), o = require("../../../utils/statistics"), n = require("../../../components/sku/sku"), r = require("../../../components/minicart/minicart"), d = require("../../../components/toast/toast"), c = require("../../../components/enshrine/index"), g = require("../../../components/share/share.js");

Page(i.mergePage({
    data: {
        dataArr: [],
        isajaxing: !1,
        noMore: !1,
        isRedact: !1,
        radioArr: [],
        page: "1"
    },
    onLoad: function(t) {
        this.getInfo(), this.getMiniCart(), o.sendZhugePageData("进入我的收藏", {});
    },
    onShow: function() {
        o.sendPageData("page_collection", "", "进入我的收藏");
        var t = wx.getStorageSync("vipStatus") > 0;
        this.setData({
            isVip: t
        });
    },
    getInfo: function() {
        this.http_goodsList();
    },
    redactBtn: function() {
        if (0 === this.data.dataArr.length) return !1;
        var t = this.data.isRedact, a = this.data.dataArr.map(function(t, a) {
            return t.isChecked = !1, t;
        });
        t ? o.sendEventData({
            activity: "click_collection_edition"
        }) : o.sendEventData({
            activity: "click_collection_edition_cancel"
        }), this.setData({
            isRedact: !t,
            radioArr: [],
            dataArr: a
        });
    },
    radioBtn: function(t) {
        var a = t.currentTarget.dataset, e = parseInt(a.idx), i = a.ischecked;
        this.data.dataArr[e].isChecked = !i, console.log(a);
        var s = {
            goods_code: "" + a.goodscode,
            goods_type: "3",
            goods_id: "" + a.goodsid
        };
        if (i) {
            var o = this.data.radioArr.indexOf(s);
            this.data.radioArr.splice(o, 1);
        } else this.data.radioArr.push(s);
        this.setData(this.data);
    },
    http_goodsList: function() {
        var s = this, o = this, n = t.getPublicArg();
        n.page = o.data.page, n.pagenum = "10", n.tabname_type = e, n.apisign = t.createApisign(n), 
        o.setData({
            isajaxing: !0
        }), i.post({
            url: t.globalData.URL_MUSER + "favorite/fav_list",
            data: n,
            complete: function(t) {
                if (t.data && 0 != t.data.data.goods.length) {
                    var i = t.data.data.goods;
                    1 == o.data.page && (a = []);
                    var s = i.map(function(t, e) {
                        return t.isChecked = !1, t.goods_code && a.push(t.goods_code), t;
                    });
                    e = s[s.length - 1].tabname_type;
                    var n = o.data.dataArr.concat(s);
                    1 == o.data.page && (n = s), s.length >= 20 ? (o.data.noMore = !1, o.setData({
                        noMore: !1
                    })) : o.setData({
                        noMore: !0
                    }), wx.setStorage({
                        key: "goods_list",
                        data: a
                    }), o.setData({
                        dataArr: n,
                        isajaxing: !1
                    });
                }
            },
            fail: function(t) {
                s.showToastMsg("网络异常,请稍后再试~"), o.setData({
                    isajaxing: !1,
                    noMore: !1
                });
            }
        }, !0);
    },
    openSkuBtn: function(t) {
        var a = t.currentTarget.dataset;
        2 == a.status || 6 == a.status || 8 == a.status || 9 == a.status ? (this.initSku(a.goodsid), 
        this.openSku(t)) : console.log(a.status);
    },
    cancelBtn: function() {
        var t = this, a = this.data.radioArr;
        if (0 == a.length) return t.showToastMsg("请至少选择一个收藏"), !1;
        console.log(a), o.sendEventData({
            activity: "click_collection_edition_del"
        }), wx.showModal({
            title: "确定删除这些商品吗？",
            success: function(e) {
                e.confirm ? (o.sendEventData({
                    activity: "click_collection_edition_delsure"
                }), console.log(a), t.cancelEnshrine(a).then(function(a) {
                    console.log(a), t.showToastMsg("取消收藏成功"), t.http_goodsList(), t.setData({
                        radioArr: [],
                        isRedact: !1
                    });
                })) : e.cancel && (o.sendEventData({
                    activity: "click_collection_edition_deldel"
                }), console.log("用户点击取消"));
            }
        });
    },
    testFn: function() {
        var t = this.data.page;
        this.data.isajaxing || this.data.noMore || (++this.data.page, this.setData({
            page: ++t
        }), this.http_goodsList());
    },
    statisticsTap: function() {
        o.sendEventData({
            activity: "click_cube_goods"
        });
    },
    onShareAppMessage: function(a) {
        if ("button" == a.from && g.buttonShare) return g.buttonShare(a.target.dataset);
        return t.setShare("推荐一家有品质的折扣店《卷皮折扣》", "pages/index/index");
    }
}, n, d, c, r, s, o.pageEvents, g));