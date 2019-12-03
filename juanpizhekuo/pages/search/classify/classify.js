var a = getApp(), t = require("../../../utils/util"), e = require("../../../components/error-msg/error-msg"), i = require("../../../utils/statistics");

Page(t.mergePage({
    data: {
        cate: [],
        curindex: 0,
        ready: !1
    },
    onShow: function() {
        i.sendPageData("page_category", "", "进入分类菜单页");
    },
    onLoad: function(e) {
        var d = this;
        wx.showLoading && wx.showLoading({
            title: "加载中"
        }), t.post({
            url: a.globalData.URL_MAPI + "xcxcategory/main/list",
            data: {
                uid: wx.getStorageSync("uid")
            },
            complete: function(a) {
                var t = a.data, e = void 0 === t ? {} : t;
                wx.hideLoading && wx.hideLoading(), "1000" === e.code && (e.data[0].issel = !0, 
                d.setData({
                    cate: e.data,
                    ready: !0
                }));
            }
        }), i.sendZhugePageData("进入分类菜单页", {});
    },
    cateParentTap: function(a) {
        var t = a.currentTarget.dataset;
        t.index != this.data.curindex && (this.data.cate[t.index].issel = !0, this.data.cate[this.data.curindex].issel = !1, 
        this.setData({
            cate: this.data.cate,
            curindex: t.index
        }));
    }
}, e, i.pageEvents));