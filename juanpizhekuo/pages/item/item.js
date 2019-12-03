var e = require("../../utils/util"), t = require("../../utils/statistics"), o = require("../../components/countdown/countdown"), a = require("../../components/mask/mask"), i = require("../../components/near-group/index"), n = require("../../components/sku/sku"), s = require("../../components/get-coupon/index"), r = require("../../components/actinfo/index"), u = require("../../components/error-msg/error-msg"), d = require("../../components/todesk-tip/index"), c = require("../../components/blockAds/index"), p = getApp(), g = void 0, l = void 0, _ = void 0, h = void 0, m = void 0, f = void 0;

Page(e.mergePage({
    data: {
        groupingList: [],
        noMoreGrouping: !1,
        recGoods: [],
        noMore: !1,
        ifHead: !1,
        if2ToGroup: !1,
        twoToGroupTitle: "",
        twoToGroupGoods: []
    },
    onLoad: function(t) {
        var o = decodeURIComponent(t.scene);
        g = 1, l = "0", _ = !1, f = 1, h = "" != o && void 0 !== o && "undefined" !== o ? o : t.item_id, 
        this.setData({
            item_id: h,
            is_pt_goods: 1
        }), this.getGroupDetail();
        var a = this;
        e.getZyId(function(e) {
            m = "p16_" + e, a.getRecGoods(), a.getAds(m, "pdetail", 0), a = null;
        }), wx.canIUse && wx.canIUse("showShareMenu") && wx.showShareMenu({
            withShareTicket: !0
        });
    },
    onShow: function() {
        "page_temai_paysuccess" === t.getData("pre_pagename") && this.setDeskTip("Item", "随时查看订单、物流状态"), 
        t.sendPageData("page_pintuan_item", h, "进入拼详页");
    },
    handleVip: function(e) {
        if (!p.checkLogin()) return p.goLogin(), !1;
        var t = e.currentTarget.dataset;
        if ("0" == t.sku) t.jump && wx.navigateTo({
            url: "/pages/user/cardCheckout/cardCheckout"
        }); else if ("2" == t.sku) this.openSku(e, 1); else {
            if ("1" != t.sku) return;
            this.openSku(e);
        }
    },
    getGroupDetail: function() {
        var e = this, o = this;
        wx.request({
            url: p.globalData.URL_TUAN + "xcxptitem/detail",
            data: {
                item_id: h,
                uid: wx.getStorageSync("uid")
            },
            header: {
                "Content-Type": "application/json"
            },
            success: function(a) {
                var i = a.data, n = void 0 === i ? {} : i;
                if (1e3 == n.code) {
                    var s = n.data, r = s.item, u = s.goods, d = s.button, c = s.flow_intro, p = s.joins, g = +r.proportion, _ = +r.is_opening;
                    o.getTwoToGroupGoods(u.goods_id);
                    var h = !1;
                    if (h = !(!s.share_info || !s.share_info.share_tuan_image), r.max < p.length && (p = p.slice(0, r.max)), 
                    r.max <= 10) for (var m = p.length; m < r.max; m++) p.push({
                        avatar: "/images/sofa.png"
                    });
                    e.setData({
                        goods: u,
                        tuan: r,
                        joins: p,
                        button: d,
                        intro: c,
                        actAlert: s.ad_info,
                        jpPromise: s.service_promise.show_content,
                        ifLottery: 1 == r.is_lottery ? 1 : 0,
                        ifLaodaixin: 1 == r.is_laodaixin ? 1 : 0,
                        goods_id: u.goods_id,
                        cprice: u.cprice,
                        max: r.max,
                        share_info: s.share_info,
                        ifHead: h
                    }), _ && e.countdown({
                        left: r.times,
                        onEnd: function() {}
                    }), 1 != r.is_laodaixin && 3 === g && (u.req_coupons_id && 0 != u.req_coupons_id && e.getCoupon("", u.req_coupons_id), 
                    e.getActInfo(u.goods_id, "1")), 1 == r.near && e.getNearGroup(u.goods_id);
                    var f = r.req_master_orders_url;
                    f && "0" != f && (l = f, e.getGrouping()), 1 == d.status && e.initSku(u.goods_id), 
                    t.sendZhugePageData("进入拼详页", s.zg_json);
                } else 2001 == n.code && wx.navigateTo({
                    url: n.data.jumpUrl
                });
            }
        });
    },
    showAllJoins: function() {
        this.setData({
            isShowAllJoins: !this.data.isShowAllJoins
        });
    },
    getGrouping: function() {
        var e = this;
        if (_) return !1;
        _ = !0, wx.request({
            url: l.replace("${page}", g),
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                var o = t.data, a = void 0 === o ? {} : o;
                if (_ = !1, 1e3 == a.code) {
                    var i = a.data, n = i.tuan_list, s = e.data.groupingList.concat(n);
                    e.setData({
                        groupingList: s
                    }), 1 == g && e.setData({
                        groupingTitle: i.title
                    }), 1 == i.has_more_page ? g++ : (g = !1, e.setData({
                        noMoreGrouping: !0
                    }));
                } else 2002 == a.code && (g = !1, e.setData({
                    noMoreGrouping: !0
                }));
            }
        });
    },
    getRecGoods: function() {
        var e = this;
        wx.request({
            url: p.globalData.URL_TUAN + "pintuan/get_goods_list",
            data: {
                cid: "pinhaohuo_sx",
                show_type: "wap",
                zhouyi_ids: m,
                page: f,
                app_version: p.globalData.APP_VERSION,
                pageSize: 10
            },
            method: "GET",
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                var o = t.data, a = void 0 === o ? {} : o;
                if (_ = !1, 1e3 == a.code) {
                    var i = a.data.goods, n = {
                        recGoods: e.data.recGoods.concat(i)
                    };
                    1 == a.data.has_next_page ? f++ : (f = !1, n.noMore = !0), e.setData(n);
                } else f = !1, e.setData({
                    noMore: !0
                });
            }
        });
    },
    scrollGetGoods: function(e) {
        f && !_ && (_ = !0, this.getRecGoods());
    },
    getTwoToGroupGoods: function(e) {
        var o = this;
        wx.request({
            url: p.globalData.URL_MAPI + "Goodsintro/similargoods/item",
            method: "POST",
            data: {
                cgids: e,
                platform: p.globalData.PLATFORM,
                jpUid: wx.getStorageSync("uid") || "",
                jpDid: t.getData("id_num"),
                jpId: t.getData("id_num")
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                var t = e.data, a = void 0 === t ? {} : t;
                if (1e3 == a.code) {
                    var i = a.data.title, n = a.data.goods;
                    o.setData({
                        twoToGroupTitle: i,
                        twoToGroupGoods: n,
                        if2ToGroup: !0
                    });
                }
            }
        });
    },
    itemBtnTap: function(e) {
        var o = this.data, a = o.button;
        switch (+a.status) {
          case 2:
            wx.redirectTo({
                url: a.jump_url
            });
            break;

          case 3:
            wx.canIUse && !wx.canIUse("button.open-type.share") && wx.showModal({
                title: "提示",
                content: "请点击右上角的菜单进行分享。"
            }), t.sendEventData({
                activity: "click_pintuan_invite",
                activityparam: h
            });
            break;

          default:
            this.setData({
                ifCanTuan: 3 == o.tuan.proportion && 1 == o.tuan.is_opening && h
            }), this.openSku(e);
        }
    },
    cancle: function() {
        this.setData({
            ifHead: !1
        });
    },
    closeCouponConfirm: function() {
        this.setData({
            actAlert: null
        });
    },
    onShareAppMessage: function() {
        var e = this.data.share_info, t = e.share_text, o = "pages/item/item?item_id=" + h, a = e.share_tuan_image || e.share_image, i = {
            "分享场景": "拼团页",
            "分享id": h
        };
        return p.setShare(t, o, null, a, i);
    }
}, o, a, i, s, r, n, u, d, c, t.pageEvents));