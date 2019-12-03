var e = getApp(), t = void 0, a = void 0, o = require("../../../utils/util"), i = require("../../../utils/statistics"), n = require("../../../components/toast/toast");

Page(o.mergePage({
    data: {
        ready: !1,
        groups: [],
        noMore: !1,
        isTopHidden: !0
    },
    onLoad: function(e) {
        wx.showLoading && wx.showLoading({
            title: "加载中"
        }), t = 1, a = !1, this.getDetailList();
    },
    onShow: function() {
        i.sendPageData("page_redenvelope_record", "");
    },
    getDetailList: function() {
        var i = this, n = e.getPublicArg(), r = {
            jpUid: n.jpUid,
            jpDid: n.jpDid,
            jpSign: n.jpSign,
            jpPlatform: n.jpPlatform,
            openId: wx.getStorageSync("openid"),
            uname: wx.getStorageSync("nickName"),
            userImg: wx.getStorageSync("avatarUrl"),
            page: t
        };
        wx.request({
            url: e.globalData.URL_MACT + "GetNewYearCoupon-getMyList",
            data: r,
            method: "GET",
            complete: function(e) {
                var n = e.data, r = void 0 === n ? {} : n;
                a = !1;
                var s = {};
                if (1 === t && (s.ready = !0, wx.hideLoading && wx.hideLoading()), 1e3 === parseInt(r.code, 10)) {
                    var d = r.data;
                    d.map(function(e) {
                        e.createTime = o.formatDate(new Date(1e3 * e.createTime), "yyyy.MM.dd HH:mm:ss");
                    });
                    var g = i.data.groups.concat(d);
                    s.groups = g, 1 === t && (s.allMoney = r.allMoney), r.allPage > t ? t++ : (t = !1, 
                    s.noMore = !0);
                } else t = !1, s.noMore = !0;
                i.setData(s);
            }
        });
    },
    onPageScroll: function(e) {
        e.scrollTop >= 400 ? this.setData({
            isTopHidden: !1
        }) : this.setData({
            isTopHidden: !0
        });
    },
    bindTopTap: function(e) {
        wx.pageScrollTo ? wx.pageScrollTo({
            scrollTop: 0
        }) : wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        });
    },
    onReachBottom: function(e) {
        t && !a && (a = !0, this.getDetailList());
    }
}, i.pageEvents, n));