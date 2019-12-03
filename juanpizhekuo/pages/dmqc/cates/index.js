getApp();

var e = require("../../../utils/util.js"), s = require("../../../utils/statistics"), a = require("../../../components/error-msg/error-msg"), t = require("../TabsGoods/index.js");

Page(e.mergePage({
    data: {
        ready: !1,
        curIndex: 0,
        curSubIndex: 0,
        Cates: [],
        cid: "dmqc",
        hasSubCates: !0
    },
    onLoad: function() {
        var e = this;
        this.hasLoadCates = !1, wx.showLoading && wx.showLoading({
            title: "加载中"
        }), e.getCateGoods(0, "", "", "", "", !1), s.sendZhugePageData("进入分类精选页", {});
    },
    onShow: function() {
        s.sendPageData("dmqc_cates", "", "进入分类精选页");
    }
}, a, s.pageEvents, t, e));