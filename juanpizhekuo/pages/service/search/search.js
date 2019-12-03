getApp();

var t = require("../../../utils/util.js"), e = require("../../../components/error-msg/error-msg"), a = require("../../../utils/statistics");

Page(t.mergePage({
    data: {
        key: "",
        ContentShow: !(!wx.canIUse || !wx.canIUse("rich-text"))
    },
    onShow: function() {
        a.sendPageData("page_problem_search");
    },
    onLoad: function(t) {
        this.getContent(this.data.key);
    },
    searchInput: function(t) {
        this.data.key = t.detail.value;
    },
    searchQuestion: function(t) {
        var e = t.currentTarget.dataset;
        this.getContent(this.data.key), a.sendEventData(e);
    },
    getContent: function(t) {
        var e = this, a = {
            key: t
        };
        wx.request({
            url: "https://m.juanpi.com/xcxservice/qSearch",
            data: a,
            method: "GET",
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                var a = t.data;
                1e3 == a.code ? a.data.hasOwnProperty("defquestions") ? e.setData({
                    question_list: a.data.defquestions,
                    hasContent: !1,
                    show_all: !1
                }) : e.setData({
                    question_list: a.data.list,
                    hasContent: !(a.data.list.length > 0),
                    show_all: !0
                }) : e.showErrorMsg(a.msg);
            },
            fail: function(t) {
                e.showErrorMsg("请求数据失败");
            }
        });
    }
}, e, a.pageEvents));