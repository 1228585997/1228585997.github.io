var t = getApp(), e = void 0, a = require("../../../utils/util.js"), n = require("../../../components/error-msg/error-msg"), o = require("../../../utils/statistics"), i = require("../../../components/go-webview/index");

Page(a.mergePage({
    data: {
        ContentShow: !0
    },
    onShow: function() {
        o.sendPageData("page_problem");
    },
    onLoad: function(t) {
        e = t.id, this.getContent();
    },
    serviceTap: function(t) {
        var e = t.currentTarget.dataset, a = e.option;
        1 == a ? (e.title = "小卷在线", e.url = "https://im.juanpi.com/chat/chatBox?pType=11&uid=" + wx.getStorageSync("uid") + "&uname=" + wx.getStorageSync("uname"), 
        this.goWebview(t)) : 2 == a && wx.makePhoneCall({
            phoneNumber: e.num
        }), o.sendEventData(e);
    },
    getContent: function() {
        var a = this, n = {
            id: e,
            app_version: t.globalData.APP_VERSION
        };
        wx.request({
            url: "https://m.juanpi.com/xcxservice/question_detail",
            data: n,
            method: "GET",
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                var e = t.data;
                1e3 == e.code ? a.setData({
                    title: e.data.list.ri_title,
                    nodes: e.data.list.ri_content,
                    ContentShow: !(!wx.canIUse || !wx.canIUse("rich-text")),
                    customer_list: e.data.contact
                }) : a.showErrorMsg(e.msg);
            },
            fail: function(t) {
                a.showErrorMsg("请求数据失败");
            }
        });
    }
}, i, n, o.pageEvents));