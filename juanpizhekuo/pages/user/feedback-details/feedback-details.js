var o = getApp(), e = void 0, r = require("../../../utils/util.js"), t = require("../../../components/error-msg/error-msg"), a = require("../../../utils/statistics");

Page(r.mergePage({
    data: {
        detailsData: {},
        userImgArr: [],
        serverImgArr: [],
        ifNotBigMode: !0,
        scrollTop: 0
    },
    onLoad: function(e) {
        var t = this;
        console.log(e);
        var a = {
            fdid: e.fdid
        };
        r.post({
            url: o.globalData.URL_M + "xcxuserfeedback/detail",
            data: a,
            complete: function(o) {
                if (1e3 == o.data.code) {
                    var e = o.data.data;
                    console.log(e), t.setData({
                        detailsData: e,
                        userImgArr: e.fd_ask_img_json ? t.imgJsonToArr(e.fd_ask_img_json) : [],
                        serverImgArr: e.fd_reply_img_json ? t.imgJsonToArr(e.fd_reply_img_json) : []
                    });
                }
            }
        });
    },
    imgJsonToArr: function(o) {
        var e = "string" == typeof o ? JSON.parse(o) : o;
        console.log(e);
        var r = [];
        return 0 === e.length ? r : (Array.isArray(e) ? (console.log("isArray", e), e.forEach(function(o) {
            var e = JSON.parse(o);
            console.log(e), r.push(decodeURIComponent(e.data[0].pic_url));
        })) : (console.log("isNoArray", e), r.push(decodeURIComponent(e.data[0].pic_url))), 
        r);
    },
    onShow: function() {
        a.sendPageData("click_feedback_historydetails");
    },
    checkBigMode: function(o) {
        console.log(o);
        var e = o.currentTarget.dataset, r = e.idx, t = e.cur, a = e.imgjson, i = a[r];
        this.setData({
            ifNotBigMode: !1,
            curPic: t,
            curComment: i,
            bigPics: a
        });
    },
    closeBigMode: function() {
        this.setData({
            ifNotBigMode: !0,
            scrollTop: e
        });
    },
    bindSwiperChange: function(o) {
        var e = o.detail.current;
        this.setData({
            curPic: e
        });
    },
    setScrollTop: function(o) {
        e = o.detail.scrollTop;
    }
}, t, a.pageEvents));