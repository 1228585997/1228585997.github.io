getApp();

var t = require("../../../utils/util"), e = require("../../../utils/statistics"), a = require("../../../components/toast/toast");

Page(t.mergePage({
    data: {
        ifEmpty: !0,
        targetValue: null
    },
    onLoad: function(t) {},
    onShow: function() {
        e.sendPageData("page_tab", "all", "进入首页");
    },
    init: function(t) {},
    listener: function(t) {
        t.detail.value ? this.setData({
            ifEmpty: !1,
            targetValue: t.detail.value
        }) : this.setData({
            ifEmpty: !0
        });
    },
    withDraw: function() {
        /^\d+[.]?\d+$/.test(this.data.targetValue) ? console.log("ok") : (console.log("不匹配"), 
        console.log(this), console.log(this.showToastMsg), this.showToastMsg("请输入正确的金额"));
    }
}, e.pageEvents, a));