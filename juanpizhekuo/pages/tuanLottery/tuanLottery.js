var e = getApp(), t = void 0, a = void 0, o = void 0, n = require("../../utils/util"), i = require("../../utils/statistics"), s = require("../../components/backtop/backtop"), r = require("../../components/countdown/countdown");

Page(n.mergePage({
    data: {
        list: [],
        noMore: !1,
        isTopHidden: !0,
        timeArr: [],
        time: {
            minutes: 3,
            seconds: 40
        },
        recGoods: []
    },
    onLoad: function(e) {
        t = !1, a = 1, this.getGoods();
        var s = this;
        n.getZyId(function(e) {
            o = "p16_" + e, s.getRecGoods(), s = null;
        }), wx.canIUse && wx.canIUse("showShareMenu") && wx.showShareMenu({
            withShareTicket: !0
        }), i.sendZhugePageData("进入一分钱抽奖", {});
    },
    onShow: function() {
        i.sendPageData("page_choujiang_pintuan", "", "进入一分钱抽奖");
    },
    getGoods: function(t) {
        var a = this, o = {
            is_ajax: 1,
            show_type: "topic",
            page: 1
        };
        wx.request({
            url: e.globalData.URL_TUAN + "topic/meirichoujiang/getTopicList",
            data: o,
            header: {
                "Content-Type": "application/json"
            },
            success: function(e) {
                var t = e.data, o = void 0 === t ? {} : t;
                if (1e3 === o.code) {
                    var i = o.data;
                    a.setData({
                        list: i
                    });
                    for (var s = new Array(i.length), r = 0; r < i.length; r++) {
                        var c = i[r], u = new Date();
                        1 == c.button ? a.countdown({
                            endTime: 1e3 * c.lottery_etime,
                            timeKey: "lotteryTimes." + r,
                            onEnd: function() {}
                        }) : 2 == c.button ? u = new Date(1e3 * c.lottery_stime) : 4 == c.button && (u = new Date(1e3 * c.lottery_outtime)), 
                        s[r] = n.formatDate(u, "MM月dd日  HH:mm");
                    }
                    a.setData({
                        timeArr: s
                    });
                }
            }
        });
    },
    getRecGoods: function() {
        var n = this;
        wx.request({
            url: e.globalData.URL_TUAN + "pintuan/get_goods_list",
            data: {
                cid: "pinhaohuo_sx",
                show_type: "wap",
                zhouyi_ids: o,
                page: a,
                app_version: e.globalData.APP_VERSION,
                pageSize: 10
            },
            method: "GET",
            header: {
                "Content-Type": "application/json"
            },
            success: function(e) {
                var o = e.data, i = void 0 === o ? {} : o;
                if (t = !1, 1e3 == i.code) {
                    var s = i.data.goods, r = {
                        recGoods: n.data.recGoods.concat(s)
                    };
                    1 == i.data.has_next_page ? a++ : (a = !1, r.noMore = !0), n.setData(r);
                } else a = !1, n.setData({
                    noMore: !0
                });
            }
        });
    },
    scrollGetGoods: function(e) {
        a && !t && (t = !0, this.getRecGoods());
    },
    onShareAppMessage: function() {
        var t = "1分钱抢购会场，太疯狂了赶紧来！";
        return Math.floor(new Date().getTime() / 1e3) + e.globalData.TIME_DIFF <= 1510624800 && (t = "【11.11来啦！】1分钱抢购会场，太疯狂了赶紧来！"), 
        e.setShare(t, "pages/tuanLottery/tuanLottery", null, "https://jp.juancdn.com/xcx_images/tuanLottery/share.jpg");
    }
}, s, i.pageEvents, r));