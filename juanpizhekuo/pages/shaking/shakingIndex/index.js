var e = getApp(), t = void 0, a = void 0, o = void 0, n = void 0, i = void 0, s = require("../../../utils/util"), r = require("../../../utils/statistics"), d = require("../../../components/qipao/qipao"), c = require("../../../components/countdown/countdown"), h = require("../../../components/toast/toast"), u = require("../../../components/send-formid/index"), p = wx.getBackgroundAudioManager();

Page(s.mergePage({
    data: {
        qipaoTop: "190rpx",
        recGoods: [],
        noMore: !1,
        isTopHidden: !0,
        qipaoList: [],
        ishidden: !0,
        showCode: !1,
        alertWindow: !1,
        showRule: !1,
        peopleNum: 100,
        shaked: !1,
        ifShared: !1,
        prizeType: -1,
        orderNo: 0,
        clockShow: !1
    },
    onLoad: function(n) {
        wx.showLoading();
        var r = this;
        t = !1, a = !1, i = 1, r.getBroadcast(e.globalData.URL_MACT + "ShakeLottery-getActPrizeList"), 
        this.init(), s.getZyId(function(e) {
            o = "p16_" + e, r.getRecGoods();
        });
    },
    onShow: function() {
        this.shake();
    },
    onPullDownRefresh: function() {
        t = !1, a = !1, i = 1, wx.getStorageSync("openid") ? this.getLotteryInfo() : wx.stopPullDownRefresh();
    },
    shake: function() {
        var e = this;
        e.data.shaked || wx.onAccelerometerChange(function(t) {
            if ((Math.abs(t.x) > .5 || Math.abs(t.y) > .5) && Math.abs(t.x) > 1 && Math.abs(t.y) > 1 && !a && !e.data.shaked) {
                p.title = "shake", p.src = "https://jp.juancdn.com/wxMapp/yaoyiyao/shakingAudio.mp3", 
                a = !0;
                e.getLotteryInfo(!0);
            }
        });
    },
    init: function() {
        var e = this;
        r.getData("afterLogin") ? this._init() : setTimeout(function() {
            e.init();
        }, 100);
    },
    _init: function() {
        e.checkLogin() ? this.getLotteryInfo() : (wx.hideLoading && wx.hideLoading(), this.setData({
            ready: !0
        }));
    },
    getLotteryInfo: function(t) {
        var o = this, i = this, s = e.getPublicArg(), d = "GET", c = "application/x-www-form-urlencoded", h = void 0;
        t ? (s.openId = wx.getStorageSync("openid"), s.headImg = wx.getStorageSync("avatarUrl"), 
        s.name = wx.getStorageSync("nickName"), d = "POST", h = e.globalData.URL_MACT + "ShakeLottery-lottery") : (c = "application/json", 
        h = e.globalData.URL_MACT + "ShakeLottery-baseInfo"), wx.request({
            url: h,
            data: s,
            method: d,
            header: {
                "Content-Type": c
            },
            success: function(e) {
                var s = e.data, d = void 0 === s ? {} : s, c = d.code, h = d.msg;
                if (1e3 === c) {
                    var u = d.data;
                    switch (u.status) {
                      case 1e3:
                        n = u.orderNo;
                        var l = -1;
                        if (l = 1 === u.type ? 3 : 3 === u.type ? 1 : u.type, i.setData({
                            prizeType: l,
                            content: u.content,
                            shaked: !0,
                            rewardMoney: u.money,
                            headImg: u.headImg
                        }), r.sendPageData("page_yaoyiyao", o.data.prizeType), t ? (p.title = "end", p.src = "https://jp.juancdn.com/wxMapp/yaoyiyao/shakingResult.mp3") : i.setData({
                            ifShared: !!u.isShare
                        }), 4 !== l && 5 !== l) {
                            var g = parseInt(u.leftTime, 10);
                            g > 0 && (i.setData({
                                clockShow: !0
                            }), i.data.ifShared || i.countdown({
                                left: g,
                                timeKey: "shareTime",
                                onEnd: function() {
                                    i.data.ifShared || i.setData({
                                        alertWindow: !0,
                                        clockShow: !1
                                    });
                                }
                            }));
                        }
                        setTimeout(function() {
                            a = !1;
                        }, 2e3);
                        break;

                      case 1001:
                        break;

                      case 1002:
                        i.setData({
                            peopleNum: u.peopleNum
                        }), i.showToastMsg(h);
                        break;

                      case 1003:
                        i.setData({
                            shaked: !1,
                            peopleNum: u.peopleNum
                        });
                        break;

                      default:
                        i.showToastMsg(h);
                    }
                }
            },
            complete: function() {
                wx.hideLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    showRule: function(e) {
        var t = e.currentTarget.dataset;
        this.setData({
            showRule: !0
        }), r.sendEventData(t);
    },
    closeRule: function(e) {
        this.setData({
            showRule: !1
        });
    },
    showCode: function(e) {
        this.setData({
            showCode: !0
        });
        var t = e.currentTarget.dataset;
        r.sendEventData(t);
    },
    closeCode: function(e) {
        this.setData({
            showCode: !1
        });
    },
    closeWindow: function(e) {
        this.setData({
            alertWindow: !1
        });
    },
    getRecGoods: function() {
        var a = this;
        wx.request({
            url: e.globalData.URL_TUAN + "oldbringnew/invitation?page=" + i + "&platform=xcx&page_size=20",
            data: {},
            method: "GET",
            header: {
                "Content-Type": "application/json"
            },
            success: function(e) {
                var o = e.data, n = void 0 === o ? {} : o;
                if (t = !1, 1e3 == n.code) {
                    var s = n.data, r = {
                        recGoods: a.data.recGoods.concat(s)
                    };
                    i++, a.setData(r);
                } else i = !1, a.setData({
                    noMore: !0
                });
            }
        });
    },
    onReachBottom: function(e) {
        i && !t && (t = !0, this.getRecGoods());
    },
    onShareAppMessage: function(t) {
        if ("button" === t.from) {
            var a = this.data.ifShared ? 2 : 1;
            r.sendEventData({
                activity: "click_yaoyiyao_share",
                activityparam: this.data.prizeType + "_" + a
            });
        }
        var o = this, n = o.data.ifShared, i = "天掉馅饼啦！快来卷皮下单，赢取免单奖励，最高可免200元！", s = "/pages/shaking/shakingShare/shakingShare", d = wx.getStorageSync("uid") || "", c = wx.getStorageSync("openid") || "", h = [], u = o.data.prizeType;
        n ? (2 === u && (h = [ "我刚在卷皮获得了" + this.data.rewardMoney + "元全额免单，想要赶紧来！" ]), 3 === u && (h = [ "我刚在卷皮获得了" + this.data.rewardMoney + "元购物基金，想要赶紧来！" ])) : h = [ "天掉馅饼啦，快来卷皮下单，赢取200元全额免单！", "快来卷皮赢取免单奖励，最高可免200元！", "你有一个200元免单机会待领取，不点就撤回了哦！", "买东西不要钱，还有这种好事？不信来卷皮下单！", "没有天理了，买东西不要钱，机不可失失不再来！", "撒钱啦撒钱啦！卷皮送你一次200元免单的机会！" ];
        var p = Math.floor(Math.random() * h.length);
        return i = h[p], s += "?shareUid=" + d + "&shareId=" + c + "&shareTxt=" + p, e.setShare(i, s, function(e) {
            1 !== u && 2 !== u && 3 !== u || o.data.ifShared || o.setShareRecord();
        }, "https://jp.juancdn.com/wxMapp/yaoyiyao/shareImg.png");
    },
    setShareRecord: function() {
        var t = this, a = this, o = e.getPublicArg();
        o.orderNo = n, wx.request({
            url: e.globalData.URL_MACT + "ShakeLottery-share",
            data: o,
            method: "GET",
            header: {
                "Content-Type": "application/json"
            },
            success: function(e) {
                var o = e.data, n = void 0 === o ? {} : o, i = n.code, s = n.msg;
                switch (i) {
                  case 1e3:
                    a.setData({
                        ifShared: !0,
                        clockShow: !1
                    }), t.showToastMsg("分享成功，恭喜你获得" + a.data.content + "！"), a.countdown.onEnd = null;
                    break;

                  case 1005:
                    a.setData({
                        alertWindow: !0
                    });
                    break;

                  default:
                    a.showToastMsg(s);
                }
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
    goIndex: function(e) {
        wx.switchTab({
            url: "../../index/index"
        });
        var t = e.currentTarget.dataset;
        r.sendEventData(t);
    },
    goPersonCenter: function(e) {
        wx.switchTab({
            url: "../../user/index/index"
        });
        var t = e.currentTarget.dataset;
        r.sendEventData(t);
    }
}, r.pageEvents, d, c, h, u));