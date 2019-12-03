var i = getApp(), e = void 0, a = require("../../../utils/util.js"), t = require("../../../utils/statistics"), o = require("../../../components/toast/toast"), s = require("./list.service.js"), n = s.getVipGoods, c = s.achieveVipExCard, d = s.openTuan;

Page(a.mergePage({
    data: {
        goods: [],
        noMore: 1,
        achieveDialog: !1,
        vipExpDialog: !1,
        startActDialog: !1,
        dialogSrc: -1,
        selectId: ""
    },
    onShow: function() {
        t.sendPageData("page_yifen_pintuan", "");
    },
    onLoad: function() {
        e = 1, wx.showLoading && wx.showLoading({
            title: "加载中"
        }), this.getSupervipInfo();
    },
    getSupervipInfo: function() {
        var i = this;
        n({
            page: e
        }).then(function(a) {
            if (a) {
                if (1e3 == a.code) {
                    var t = void 0;
                    t = 1 == e ? a.data.goods ? a.data.goods : [] : i.data.goods.concat(a.data.goods), 
                    i.setData({
                        goods: t
                    });
                }
                wx.hideLoading && wx.hideLoading();
            }
        });
    },
    showAchieveDialog: function() {
        this.setData({
            achieveDialog: !0
        });
    },
    processFormId: function(e) {
        t.sendEventData({
            activity: "click_pintuan_opengroup",
            activityparam: ""
        });
        this.mformId = e.detail.formId, this.selectId = e.currentTarget.dataset.goods.goods_id, 
        this.cprice = e.currentTarget.dataset.goods.cprice, 2 != e.currentTarget.dataset.goods.goods_status && (i.checkLogin() ? this.reuqestOpenTuan(this.mformId, this.selectId) : wx.navigateTo({
            url: "/pages/login/login"
        }));
    },
    fakeTab: function(i) {},
    reuqestOpenTuan: function(i, e) {
        var a = this;
        wx.showLoading && wx.showLoading({
            title: "加载中"
        });
        var t = this;
        d({
            formId: i,
            goodsId: e
        }).then(function(i) {
            if (wx.hideLoading && wx.hideLoading(), i) if (1e3 == i.code) wx.navigateTo({
                url: i.data.jumpUrl
            }); else if (2001 == i.code) a.setData({
                achieveDialog: !0,
                dialogSrc: 1
            }); else if (2002 == i.code) {
                if (i.data.num) {
                    i.data.num;
                    t.showToastMsg(i.info);
                }
            } else 2003 == i.code ? wx.navigateTo({
                url: "/pages/login/login"
            }) : t.showToastMsg(i.info);
        });
    },
    goPintuan: function(i) {
        t.sendEventData({
            activity: "click_yifen_reveive_popup",
            activityparam: ""
        });
        1 == this.data.dialogSrc ? this.reuqestOpenTuan(this.mformId, this.selectId) : this.setData({
            vipExpDialog: !1
        });
    },
    topAchieveVipExCard: function(i) {
        t.sendEventData({
            activity: "click_yifen_reveive",
            activityparam: ""
        }), this.achieveVipExCard(0);
    },
    listAchieveVipExCard: function(i) {
        t.sendEventData({
            activity: "click_yifen_reveive_popup_reveice",
            activityparam: ""
        }), this.achieveVipExCard(1);
    },
    achieveVipExCard: function(e) {
        var a = this, t = this;
        i.checkLogin() ? (wx.showLoading && wx.showLoading({
            title: "加载中"
        }), c({}).then(function(i) {
            if (i) if (1e3 == i.code || 2002 == i.code) {
                var o = a.cprice ? a.cprice : "0.01";
                a.setData({
                    achieveDialog: !1,
                    vipExpDialog: !0,
                    startActDialog: !1,
                    dialogSrc: e,
                    cprice: o
                });
            } else 2004 == i.code ? a.setData({
                achieveDialog: !1,
                vipExpDialog: !1,
                startActDialog: !0
            }) : t.showToastMsg(i.info);
            wx.hideLoading && wx.hideLoading();
        })) : wx.navigateTo({
            url: "/pages/login/login"
        });
    },
    onShareAppMessage: function() {
        return i.setShare("送你一张至尊会员卡，1分钱购买优质会员商品。", "pages/vipExperience/list/index");
    },
    shareClick: function() {
        t.sendEventData({
            activity: "click_share_wechat",
            activityparam: ""
        }), this.closeDialog();
    },
    closeDialog: function() {
        this.setData({
            achieveDialog: !1,
            vipExpDialog: !1,
            startActDialog: !1
        });
    }
}, o, t.pageEvents));