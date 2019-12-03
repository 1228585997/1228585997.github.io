function t(t) {
    if (Array.isArray(t)) {
        for (var a = 0, e = Array(t.length); a < t.length; a++) e[a] = t[a];
        return e;
    }
    return Array.from(t);
}

var a = getApp(), e = require("../../../utils/util.js"), r = require("../../../components/error-msg/error-msg"), i = require("../../../utils/statistics");

Page(e.mergePage({
    data: {
        curTab: "0",
        textareaPlaceholder: "",
        scrollTop: 0,
        textLen: 0,
        unread: 0,
        hasBtn: !0,
        imgArr: [ {
            tempFilePaths: "",
            param_url: ""
        }, {
            tempFilePaths: "",
            param_url: ""
        }, {
            tempFilePaths: "",
            param_url: ""
        }, {
            tempFilePaths: "",
            param_url: ""
        }, {
            tempFilePaths: "",
            param_url: ""
        } ],
        imgArrLen: 5,
        getAskItems: [],
        getQuestionItems: [],
        param_sendCurRadio: "",
        param_imgArr: [],
        param_content: "",
        param_desc: ""
    },
    onLoad: function(t) {
        this.getFeedbackInfo();
    },
    onShow: function() {
        i.sendPageData("page_feedback");
    },
    bindNavTap: function(t) {
        var a = t.currentTarget.dataset.index;
        a != this.data.curTab && 0 == a ? i.sendEventData({
            activity: "click_feedback_item",
            activityparam: "feedback"
        }) : a != this.data.curTab && 1 == a && i.sendEventData({
            activity: "click_feedback_item",
            activityparam: "history"
        }), a != this.data.curTab && this.setData({
            curTab: a,
            scrollTop: 0
        });
    },
    radioChange: function(t) {
        i.sendEventData({
            activity: "click_feedback_type",
            activityparam: JSON.stringify(t.detail.value)
        }), this.setData({
            param_sendCurRadio: t.detail.value,
            textareaPlaceholder: this.data.getAskItems.find(function(a) {
                return a.id == t.detail.value;
            }).state
        });
    },
    changeText: function(t) {
        var a = t.detail;
        a.cursor >= 10 && this.setData({
            hasBtn: !1,
            param_content: a.value,
            textLen: a.cursor
        }), a.cursor < 10 && this.setData({
            hasBtn: !0,
            textLen: a.cursor
        });
    },
    bindKeyInput: function(t) {
        this.setData({
            param_desc: t.detail.value
        });
    },
    getFeedbackInfo: function() {
        this.http_feedback(), this.http_question();
    },
    uploadFn: function(t) {
        wx.openBluetoothAdapter ? this.wx_uploadImg(t.currentTarget.dataset.arridx) : wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        });
    },
    delImgFn: function(t) {
        var a = this.data.imgArrLen, e = t.target.dataset.imgidx, r = {
            tempFilePaths: "",
            param_url: ""
        }, i = this.data.imgArr;
        i.splice(e, 1), i.push(r), this.setData({
            imgArr: i,
            imgArrLen: ++a >= 5 ? 5 : a
        });
    },
    submitClick: function(a) {
        var e = this, r = this;
        i.sendEventData({
            activity: "click_feedback_submit"
        }), this.http_submit().then(function(a) {
            e.http_question().then(function(a) {
                wx.showModal({
                    title: "",
                    content: "感谢您的反馈~我们会尽快处理并通知您",
                    confirmText: "我知道了",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm && r.setData({
                            param_desc: "",
                            param_imgArr: [],
                            param_content: "",
                            imgArr: [ {
                                tempFilePaths: "",
                                param_url: ""
                            }, {
                                tempFilePaths: "",
                                param_url: ""
                            }, {
                                tempFilePaths: "",
                                param_url: ""
                            }, {
                                tempFilePaths: "",
                                param_url: ""
                            }, {
                                tempFilePaths: "",
                                param_url: ""
                            } ],
                            curTab: "1",
                            imgArrLen: 5,
                            dashedArr: [].concat(t(Array(4).keys())),
                            scrollTop: 0
                        });
                    }
                });
            });
        });
    },
    http_feedback: function() {
        var t = this, r = {
            xcx_uid: wx.getStorageSync("uid")
        };
        e.post({
            url: a.globalData.URL_M + "xcxuserfeedback/ask",
            data: r,
            complete: function(a) {
                if (1e3 == a.data.code) {
                    var e = a.data.data;
                    t.setData({
                        getAskItems: e.fd_categories,
                        param_sendCurRadio: e.fd_categories[0].id,
                        textareaPlaceholder: e.fd_categories[0].state
                    });
                }
            }
        });
    },
    http_question: function() {
        var t = this, r = {
            xcx_uid: wx.getStorageSync("uid")
        };
        return new Promise(function(i, s) {
            e.post({
                url: a.globalData.URL_M + "xcxuserfeedback/question",
                data: r,
                complete: function(a) {
                    if (1e3 == a.data.code) {
                        var e = a.data.data;
                        t.setData({
                            getQuestionItems: e.feedbacks,
                            unread: parseInt(e.unread),
                            scrollTop: 0
                        }), i(a);
                    } else s(a);
                }
            });
        });
    },
    http_submit: function() {
        var t = [];
        this.data.imgArr.forEach(function(a) {
            a.param_url && t.push(a.param_url);
        });
        var r = {
            xcx_uid: wx.getStorageSync("uid"),
            type: this.data.param_sendCurRadio,
            content: this.data.param_content,
            ask_img: JSON.stringify(t),
            attach_desc: this.data.param_desc
        };
        return console.log(r), new Promise(function(t, i) {
            e.post({
                url: a.globalData.URL_M + "xcxuserfeedback/handdle_ask",
                data: r,
                complete: function(a) {
                    t(a);
                }
            });
        });
    },
    wx_uploadImg: function(t) {
        var a = this;
        wx.chooseImage({
            count: a.data.imgArrLen,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                e.tempFilePaths.forEach(function(e, r) {
                    wx.uploadFile({
                        url: "https://m.juanpi.com/xcxuserfeedback/upimg",
                        filePath: e,
                        name: "fileImage",
                        formData: {
                            xcx_uid: wx.getStorageSync("uid"),
                            xcx_sign: wx.getStorageSync("xcx_sign")
                        },
                        success: function(i) {
                            var s = JSON.parse(i.data), n = a.data.imgArr, c = a.data.imgArrLen, o = r + t;
                            n[o].tempFilePaths = e, n[o].param_url = s.data.path[0], a.setData({
                                imgArr: n,
                                imgArrLen: --c <= 0 ? 0 : c
                            });
                        },
                        fail: function(t) {
                            console.log(t), wx.showModal({
                                title: "提示",
                                content: "图片上传失败，请稍后再试",
                                showCancel: !1
                            });
                        }
                    });
                });
            }
        });
    }
}, r, i.pageEvents));