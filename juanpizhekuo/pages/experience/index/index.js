var t = Object.assign || function(t) {
    for (var i = 1; i < arguments.length; i++) {
        var e = arguments[i];
        for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    }
    return t;
}, i = getApp(), e = require("../utils/tools").request, n = require("../../../components/login-modal/index");

(0, getApp().deps.patchPage)(Page)(t({}, n, {
    data: {
        showTime: 0,
        taskList: [],
        isLogin: !1
    },
    bindJump: function() {
        wx.navigateTo({
            url: "/pages/experience/rule/index"
        });
    },
    fetchTaskList: function() {
        var t = this;
        return e({
            url: "https://mapi.juanpi.com/Xcxact/list"
        }).then(function(i) {
            t.$setData({
                taskList: i.list || []
            });
        });
    },
    onLoad: function(t) {
        this.fetchTaskList();
        var e = i.checkLogin();
        this.setData({
            isLogin: e
        });
    },
    onShow: function(t) {
        t || (t = {}), 0 == t.__type ? this.setData({
            isLogin: !0
        }) : this.$setData({
            showTime: Date.now()
        });
    },
    onLogin: function() {
        this.showLoginModal(!1);
    }
}));