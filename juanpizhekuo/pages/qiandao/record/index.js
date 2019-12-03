var e = getApp(), t = require("../../../utils/util"), o = require("../../../utils/statistics"), a = require("../../../components/error-msg/error-msg");

Page(t.mergePage({
    data: {
        scrollTop: 0,
        recordList: [],
        total_money: 0,
        redexpire_amount: 0
    },
    onShow: function() {
        o.sendPageData("page_reveive_record", "");
    },
    onLoad: function(e) {
        this.getRecordInfo(), this.getSignInfo();
    },
    getRecordInfo: function() {
        var t = this;
        wx.request({
            url: e.globalData.URL_M + "xcxredpacket/redPacketRecord",
            data: {
                xcx_uid: wx.getStorageSync("uid"),
                xcx_sign: wx.getStorageSync("xcx_sign"),
                from: "xcx_zhekou"
            },
            success: function(e) {
                var o = e.data, a = o.code, n = o.data;
                1e3 == a && n && n.length && t.setData({
                    recordList: n
                });
            }
        });
    },
    getSignInfo: function() {
        var t = this;
        wx.request({
            url: e.globalData.URL_M + "xcxredpacket/redPacketInfo",
            data: {
                xcx_uid: wx.getStorageSync("uid"),
                xcx_sign: wx.getStorageSync("xcx_sign"),
                from: "xcx_zhekou"
            },
            success: function(e) {
                var o = e.data, a = o.code, n = o.data;
                console.log("rsssss", n), 1e3 == a && n && n.redpacket_info ? t.setData({
                    total_money: n.redpacket_info.total_money,
                    redexpire_amount: n.redpacket_info.redexpire_amount
                }) : -1 == a && wx.showModal({
                    title: "友情提醒",
                    content: "您还未登录，请先登录",
                    complete: function(e) {
                        e.confirm && wx.navigateTo({
                            url: "/pages/login/login"
                        });
                    }
                });
            }
        });
    },
    onTapGoMoney: function() {
        wx.navigateTo({
            url: "/pages/qiandao/guide/index"
        });
    }
}, a, o.pageEvents));