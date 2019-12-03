var t = getApp(), e = require("../../../utils/util"), i = (require("../../../utils/statistics"), 
require("./components/rate"));

Page(e.mergePage({
    data: {
        textLen: 0,
        startNum: 5,
        Speed: "processingSpeed",
        processingSpeed: -1,
        Attitude: "HandlingAttitude",
        HandlingAttitude: -1,
        comment: "",
        boid: ""
    },
    onLoad: function(t) {
        this.setData({
            boid: t.boid
        });
    },
    onReady: function() {},
    onShow: function() {},
    changeText: function(t) {
        this.setData({
            textLen: t.detail.cursor,
            comment: t.detail.value
        });
    },
    SubmitRate: function() {
        if (-1 != this.data.processingSpeed && -1 != this.data.HandlingAttitude) {
            wx.showLoading && wx.showLoading({
                title: "加载中"
            });
            var e = Object.assign({}, t.getPublicArg(), {
                id: this.data.boid,
                action: "save",
                description_score: this.data.processingSpeed + 1,
                quality_score: this.data.HandlingAttitude + 1,
                comment: this.data.comment
            });
            e.apisign = t.createApisign(e), wx.request({
                url: t.globalData.URL_MTRADE + "refundcomment/save",
                data: e,
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                complete: function(t) {
                    var e = t.data;
                    wx.hideLoading && wx.hideLoading(), "1000" == e.code ? wx.navigateBack({
                        delta: 1
                    }) : wx.showToast({
                        title: e.info,
                        icon: "loading",
                        duration: 1500
                    });
                }
            });
        } else wx.showToast({
            title: "请填写处理意见",
            icon: "loading",
            duration: 1500
        });
    }
}, i));