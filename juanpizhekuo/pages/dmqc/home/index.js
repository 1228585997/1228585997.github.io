var e = getApp(), s = require("../../../utils/util.js"), t = require("../../../utils/statistics"), a = require("../../../components/error-msg/error-msg"), o = require("../../../components/blockAds/index"), n = require("../TabsGoods/index.js"), r = require("../../../components/mask/mask.js"), i = void 0;

Page(s.mergePage({
    data: {
        ready: !1,
        curIndex: 0,
        Cates: [],
        cid: "dmqc"
    },
    onLoad: function() {
        var e = this;
        this.hasLoadCates = !1, wx.showLoading && wx.showLoading({
            title: "加载中"
        }), s.getZyId(function(s) {
            i = "p16_" + s, e.getAds(i, "dmqc", 0), e.getFilterGoods(0, "", "", "", !1);
        }), t.sendZhugePageData("进入断码清仓页", {});
    },
    onShow: function() {
        t.sendPageData("dmqc_home", "", "进入断码清仓页");
    },
    onShareAppMessage: function() {
        return e.setShare("大牌断码抄底价，总有一款适合你！", "pages/dmqc/home/index", null, "https://goods2.juancdn.com/act/180205/2/f/5a77f8538150a15ea81137c7_750x600.png");
    }
}, a, o, t.pageEvents, n, s, r));