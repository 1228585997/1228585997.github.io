getApp();

var e = require("../../../utils/util.js"), s = require("../../../utils/statistics"), t = require("../../../components/error-msg/error-msg"), a = require("../TabsGoods/index.js"), i = require("../../../components/mask/mask.js"), o = void 0;

Page(e.mergePage({
    data: {
        ready: !1,
        curIndex: 0,
        Cates: [],
        cid: "yzzq"
    },
    onLoad: function() {
        var t = this;
        this.hasLoadCates = !1, wx.showLoading && wx.showLoading({
            title: "加载中"
        }), e.getZyId(function(e) {
            o = "p16_" + e, t.getFilterGoods(0, "", "", "", !1);
        }), s.sendZhugePageData("进入一折专区页", {});
    },
    onShow: function() {
        s.sendPageData("dmqc_discount", "", "进入一折专区页");
    }
}, t, s.pageEvents, a, e, i));