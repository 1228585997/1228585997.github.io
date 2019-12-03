var t = getApp(), e = new Array(), a = require("../../../utils/util.js"), r = require("../../../components/error-msg/error-msg"), n = require("../../../utils/statistics"), s = require("../../../components/go-webview/index");

Page(a.mergePage({
    data: {},
    onShow: function() {
        n.sendPageData("page_service");
    },
    onLoad: function(t) {
        this.getContent();
    },
    showItem: function(t) {
        var a = t.currentTarget.dataset.aindex, r = t.currentTarget.dataset.bindex, s = t.currentTarget.dataset;
        e[a][r] = !e[a][r], this.setData({
            showArr: e
        }), e[a][r] || n.sendEventData(s);
    },
    serviceTap: function(t) {
        var e = t.currentTarget.dataset, a = e.option;
        1 == a ? (e.title = "小卷在线", e.url = "https://im.juanpi.com/chat/chatBox?pType=11&uid=" + wx.getStorageSync("uid") + "&uname=" + wx.getStorageSync("uname"), 
        this.goWebview(t)) : 2 == a && wx.makePhoneCall({
            phoneNumber: e.num
        }), n.sendEventData(e);
    },
    getContent: function() {
        var a = [], r = this, n = {
            type: 3,
            app_version: t.globalData.APP_VERSION
        };
        wx.request({
            url: "https://m.juanpi.com/xcxservice/question_list",
            data: n,
            method: "GET",
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                var n = t.data;
                if (1e3 == n.code) {
                    for (var s = 0; s < n.data.list.length; s++) {
                        a.push(n.data.list[s]);
                        for (var i = n.data.list[s].child.length, o = new Array(), u = 0; u < i; u++) o.push(!0);
                        e[s] = o;
                    }
                    r.setData({
                        main_list: a,
                        showArr: e,
                        customer_list: n.data.contact
                    });
                } else r.showErrorMsg(n.msg);
            },
            fail: function(t) {
                r.showErrorMsg("请求数据失败");
            }
        });
    }
}, s, r, n.pageEvents));