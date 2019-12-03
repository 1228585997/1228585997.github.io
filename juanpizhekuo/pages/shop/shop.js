var t = getApp(), e = void 0, i = void 0, a = void 0, o = void 0, s = require("../../utils/util"), n = require("../../utils/statistics"), r = require("../../components/sku/sku"), d = require("../../components/backtop/backtop"), c = require("../../components/error-msg/error-msg"), u = require("../../components/countdown/countdown"), g = require("../../components/minicart/minicart"), _ = require("../../components/near-group/index"), l = require("../../components/mask/mask"), h = require("../../components/get-coupon/index"), p = require("../../components/actinfo/index"), m = require("../cart/common/index"), v = require("../../components/toast/toast"), f = require("../../components/enshrine/index"), w = require("../../components/quick-menu/index"), y = require("../../components/send-formid/index"), S = require("../../components/share/share");

Page(s.mergePage({
    data: {
        slideImgs: [],
        slideLength: 0,
        curSlide: 1,
        descImgs: [],
        shopStatus: 2,
        isCartTip: !1,
        isTopHidden: !0,
        curAttr: 0,
        isEnshrine: !0,
        isSuspend: !0,
        recommendArr: [],
        actInfo: [],
        startTime: "",
        startShoppingTime: "",
        isCartTip2: !1,
        showOprice: !1,
        showQuickMenu: !1,
        is_vip_goods: "0",
        is_vip: "0",
        isShowCommentBubble: !1,
        midway: 1,
        middleJump: "",
        isDistributionVip: !1
    },
    onLoad: function(t) {
        var o = this;
        i = t.id;
        var s = t.item_id;
        a = 1 == t.is_lottery ? 1 : 0, e = "", this.setData({
            goods_id: i,
            ifLottery: a,
            ifShowFanPrice: !1,
            isVip: wx.getStorageSync("vipStatus") > 0
        }), wx.showLoading && wx.showLoading({
            title: "加载中"
        }), this.getGoodsInfo(), this.initSku(i, s, function() {
            1 != o.data.shopStatus && 2 != o.data.shopStatus && o.recommendInfo();
        }), this.getComment(), this.getMiniCart(), wx.canIUse && wx.canIUse("showShareMenu") && wx.showShareMenu({
            withShareTicket: !0
        }), this.checkXSQG();
    },
    checkXSQG: function() {
        var t = wx.getStorageSync("detailFromtimeBuy"), e = new Date().getTime();
        e = Math.ceil(e / 1e3);
        var a = {}, o = {}, s = !0, n = !1, r = void 0;
        try {
            for (var d, c = t[Symbol.iterator](); !(s = (d = c.next()).done); s = !0) {
                var u = d.value;
                if (!(u.end_time && u.end_time < e)) {
                    var g = !0, _ = !1, l = void 0;
                    try {
                        for (var h, p = u.goodslist[Symbol.iterator](); !(g = (h = p.next()).done); g = !0) {
                            var m = h.value;
                            if (m.goods_id == i) {
                                o = m;
                                break;
                            }
                        }
                    } catch (t) {
                        _ = !0, l = t;
                    } finally {
                        try {
                            !g && p.return && p.return();
                        } finally {
                            if (_) throw l;
                        }
                    }
                    if (o.goods_id) {
                        a = u;
                        break;
                    }
                }
            }
        } catch (t) {
            n = !0, r = t;
        } finally {
            try {
                !s && c.return && c.return();
            } finally {
                if (n) throw r;
            }
        }
        if (o.goods_id) if (a.start_time > e) {
            var v = a.module_item.indexOf("today") > 0 ? "今日" : "明日";
            this.setData({
                showXSQG: 1,
                XSQG_title: v + a.tab_title
            });
        } else {
            this.setData({
                showXSQG: 2
            });
            var f = a.end_time - e;
            this.countDownXSQG(f);
            var w = this, y = setInterval(function() {
                --f <= 0 && (clearInterval(y), w.setData({
                    showXSQG: 3
                })), w.countDownXSQG(f);
            }, 1e3);
        }
    },
    countDownXSQG: function(t) {
        var e = Math.floor(t / 3600), i = Math.floor(t % 3600 / 60), a = t % 3600 % 60;
        this.setData({
            XSQG_hour: e < 10 ? "0" + e : e,
            XSQG_min: i < 10 ? "0" + i : i,
            XSQG_second: a < 10 ? "0" + a : a
        });
    },
    onShow: function() {
        n.sendPageData("page_temai_goods", i, "进入商祥页"), this.checkIsLogin() && this.getCart();
    },
    getGoodsInfo: function() {
        var o = this, s = {
            goods_id: i,
            is_lottery: a,
            xcx_uid: wx.getStorageSync("uid"),
            xcx_sign: wx.getStorageSync("xcx_sign"),
            platform: t.globalData.PLATFORM,
            app_version: t.globalData.APP_VERSION,
            uid: wx.getStorageSync("uid")
        };
        s.apisign = t.createApisign(s), wx.request({
            url: t.globalData.URL_DETAIL + "ptgoods/detail",
            data: s,
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                var s = t.data, r = void 0 === s ? {} : s;
                if (wx.hideLoading && wx.hideLoading(), 1e3 == r.code) {
                    var d = r.data.info, c = 1 == d.is_laodaixin ? 1 : 0;
                    e = d.title, wx.setNavigationBarTitle({
                        title: e
                    }), o.setCountDown(parseInt(r.data.systime), parseInt(d.end_time));
                    var u = 1e3 * d.start_time, g = 1e3 * r.data.systime, _ = "";
                    u > g && (_ = o.formatDuring(u, g), o.setData({
                        startTime: _
                    })), o.data.is_vip_goods = d.is_vip_goods, o.data.is_vip = d.is_vip;
                    var l = {
                        is_pt_goods: d.is_pt_goods,
                        slideImgs: d.images,
                        slideLength: d.images.length,
                        title: d.title,
                        shipping_origin: d.shipping_origin,
                        baoyou_tips: d.baoyou_tips || "",
                        pa_max: d.pa_max || "",
                        req_coupons_id: d.req_coupons_id || "",
                        jpPromise: d.service_promise.show_content,
                        goods_content: d.goods_content,
                        rules: d.rule_intro || "",
                        lottery_status: d.lottery_status,
                        tag_list: d.tag_list,
                        ae_tag: d.ae_tag || "",
                        store: d.schedule_info,
                        brand_info: d.brand_info,
                        ifLaodaixin: c,
                        tab_newer_mark: d.tab_newer_mark || "",
                        share_info: d.share_info,
                        sales_type: d.sales_type,
                        ready: !0,
                        goods_code: d.goods_code,
                        ad_info: d.ad_info,
                        promotion_info: d.promotion_info,
                        is_virtual: "0" !== d.is_virtual,
                        is_virtualNum: d.is_virtual,
                        price_corner: d.price_corner,
                        showOprice: d.hide_oprice,
                        brand_id: d.brand_id,
                        shop_id: d.shop_id,
                        showVipmark: !!d.vip_mark,
                        vip_mark: d.vip_mark,
                        vip_text: d.vip_mark ? d.vip_mark.text : "",
                        is_vip: d.is_vip,
                        is_vip_goods: d.is_vip_goods,
                        middleWay: "1" == d.is_pt_goods ? "1" : "0",
                        act_mark: d.act_mark
                    };
                    l.tag_list && l.tag_list.map(function(t, e) {
                        Object.keys(t).forEach(function(i) {
                            l.tag_list[e][i] = t[i].replace("0x", "#");
                        });
                    }), o.setData(l), o.enshrineInfo(), a || c || (o.getActInfo(i, d.is_pt_goods), o.getCoupon("", i)), 
                    1 != d.is_pt_goods || a || o.getNearGroup(i), "0" === d.is_virtual && "3" != d.is_vip_goods || o.getBuyBtn(i), 
                    n.sendZhugePageData("进入商祥页", r.data.zg_json);
                }
            }
        });
    },
    getBuyBtn: function(e) {
        var i = this, a = this, o = Object.assign({
            goods_id: e,
            app_version: t.globalData.APP_VERSION,
            platform: "wx_xcx",
            uid: wx.getStorageSync("uid")
        }, t.getPublicArg());
        o.apisign = t.createApisign(o), wx.request({
            url: t.globalData.URL_DETAIL + "ptgoods/buybtn",
            data: o,
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                var e = t.data, o = void 0 === e ? {} : e;
                if (1e3 == o.code) {
                    var s = o.data, n = s.pop_sku, r = s.single_jump_url, d = s.toast_vip_msg;
                    i.setData({
                        pop_sku: n,
                        single_jump_url: r,
                        toast_vip_msg: d,
                        middleWay: "1" == n ? "1" : a.data.middleWay,
                        middleJump: "2" == n ? "javascript:;" : ""
                    });
                }
            }
        });
    },
    bindSlideChange: function(t) {
        var e = t.detail.current + 1;
        this.setData({
            curSlide: e
        });
    },
    attrsTap: function(t) {
        var e = t.currentTarget.dataset, i = e.index;
        this.setData({
            curAttr: i
        }), n.sendEventData(e);
    },
    setCountDown: function(t, e) {
        var i = e - t;
        i > 0 && i < 86400 && this.countdown({
            left: 1e3 * i,
            onEnd: function() {}
        });
    },
    handleVip: function(e) {
        if (!t.checkLogin()) return t.goLogin(), !1;
        var i = e.currentTarget.dataset;
        if ("0" == i.sku) i.jump && wx.navigateTo({
            url: "/pages/user/cardCheckout/cardCheckout"
        }); else if (2 == this.data.shopStatus) if ("2" == i.sku) this.openSku(e, 1); else {
            if ("1" != i.sku) return !1;
            this.openSku(e);
        }
    },
    buyNow: function(e) {
        if (!t.checkLogin()) return t.goLogin(), !1;
        var i = e.currentTarget.dataset;
        "1" == i.pop ? "3" == this.data.is_vip_goods ? this.openSku(e, 1) : this.openSku(e) : i.jump ? wx.navigateTo({
            url: "/pages/user/cardCheckout/cardCheckout"
        }) : this.showToastMsg(i.msg);
    },
    openMiddleSku: function(t) {
        t.currentTarget.dataset.jump || ("3" == this.data.is_vip_goods ? this.openSku(t, 1) : this.openSku(t));
    },
    getComment: function() {
        var e = this, a = Object.assign({
            goods_id: i,
            app_version: t.globalData.APP_VERSION
        }, t.getPublicArg());
        a.apisign = t.createApisign(a), wx.request({
            url: t.globalData.URL_DETAIL + "ptgoods/valuation",
            data: a,
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                var i = t.data, a = void 0 === i ? {} : i;
                if (1e3 == a.code) {
                    var o = a.data, s = {
                        ifHasComment: o.valuation_list && o.valuation_list.length > 0,
                        title: o.info,
                        tags: o.tag_list,
                        comment: o.valuation_list,
                        rate: o.favorable_rate,
                        bubble: o.bubble_info,
                        zg_event: o.zg_event,
                        zg_json: o.zg_json
                    }, n = s.rate;
                    if (n) {
                        var r = n.indexOf(">") + 1, d = n.indexOf("%") + 1;
                        s.rate = n.substring(r, d);
                    }
                    e.setData({
                        isShowCommentBubble: s.bubble && s.bubble.content,
                        comment: s
                    }), setTimeout(function() {
                        e.setData({
                            isShowCommentBubble: !1
                        });
                    }, 5e3);
                }
            }
        });
    },
    openCartWin: function(t) {
        var e = t.currentTarget.dataset;
        s.maskUpAnimation(this, "showCartWin"), this.checkIsLogin() && this.getCart(), n.sendEventData(e);
    },
    onShareAppMessage: function(e) {
        var a = {
            "分享场景": "商详页",
            "分享id": i
        }, o = this.data, s = o.share_info, n = void 0 === s ? {} : s, r = o.ifLottery, d = n.share_text, c = n.share_image, u = n.xcxShare, g = (void 0 === u ? {} : u).xcxPath;
        return g || (g = "pages/shop/shop?id=" + i + "&is_lottery=" + r), t.setShare(d, g, c, null, a);
    },
    enshrineInfo: function() {
        var t = this.isEnshrineFn(this.data.goods_code);
        this.setData({
            isEnshrine: t
        });
    },
    enshrineBtn: function() {
        var e = this, a = this, o = this.data.isEnshrine;
        if (t.checkLogin()) if (o) {
            var s = [ {
                goods_code: this.data.goods_code,
                goods_type: "3",
                goods_id: this.data.goods_id
            } ];
            n.sendEventData({
                activity: "click_startdetails_collection_cancel",
                activityparam: i
            }), this.cancelEnshrine(s).then(function(t) {
                a.showToastMsg("取消收藏成功"), e.setData({
                    isEnshrine: !o
                });
            });
        } else {
            var r = {
                goodsCode: this.data.goods_code,
                goodsId: this.data.goods_id,
                salesType: this.data.sales_type
            };
            n.sendEventData({
                activity: "click_startdetails_collection",
                activityparam: i,
                zhugeActivity: "收藏",
                zhugeActivityparam: {
                    "收藏类型": "商品",
                    "收藏值": this.data.goods_code,
                    "值名称": this.data.title
                }
            }), this.addEnshrine(r).then(function(t) {
                a.showToastMsg("收藏成功"), e.setData({
                    isEnshrine: !o
                });
            }).catch(function(t) {
                console.log(t);
            });
        } else t.goLogin();
    },
    suspendBtn: function() {
        var t = this.data.isSuspend;
        this.setData({
            isSuspend: !t
        }), n.sendEventData({
            activity: "click_temai_retract",
            activityparam: ""
        });
    },
    recommendInfo: function() {
        var e = this, i = t.getPublicArg();
        i.goods_id = this.data.goods_id, i.apisign = t.createApisign(i), s.post({
            url: t.globalData.URL_MAPI + "goodsintro/detail/goods",
            data: i,
            complete: function(t) {
                if (1e3 == t.data.code) {
                    var i = t.data.data;
                    e.setData({
                        recommendArr: i.goods
                    });
                }
            }
        }, !0);
    },
    shareBtn: function() {
        n.sendEventData({
            activity: "click_share",
            activityparam: ""
        });
    },
    formatDuring: function(t, e) {
        var i = "", a = new Date(t).getDate(), o = new Date(e).getDate(), s = new Date(t), n = s.getHours(), r = 1 * s.getMinutes();
        return n < 10 && (n = "0" + n), r < 10 && (r = "0" + r), a - o >= 3 ? i = this.timeTransform(t) + "开抢" : a - o == 2 ? i = "后天" + n + ":" + r + "开抢" : a - o == 1 ? i = "明天" + new Date(t).getHours() + ":" + r + "开抢" : a == o && (i = "今天" + new Date(t).getHours() + ":" + r + "开抢"), 
        i;
    },
    timeTransform: function(t) {
        var e = new Date(t), i = 1 * e.getMonth() + 1, a = e.getDate(), o = e.getHours(), s = e.getMinutes();
        return o < 10 && (o = "0" + o), s < 10 && (s = "0" + s), i + "/" + a + " " + o + ":" + s;
    },
    delTap: function(t) {
        console.log(t);
    },
    submit: function(e) {
        var a = this, o = this, s = this.data.isEnshrine, r = e.detail.formId;
        if (t.checkLogin()) if (s) {
            var d = [ {
                goods_code: this.data.goods_code,
                goods_type: "3",
                goods_id: this.data.goods_id
            } ];
            n.sendEventData({
                activity: "click_startdetails_collection_cancel",
                activityparam: i
            }), this.cancelEnshrine(d).then(function(t) {
                o.showToastMsg("取消收藏成功"), a.setData({
                    isEnshrine: !s
                });
            });
        } else {
            var c = {
                goodsCode: this.data.goods_code,
                goodsId: this.data.goods_id,
                salesType: this.data.sales_type,
                form: 7,
                form_id: r,
                upRemind: 1,
                openid: wx.getStorageSync("openid")
            };
            n.sendEventData({
                activity: "click_startdetails_collection_cancel",
                activityparam: i
            }), this.addEnshrine(c).then(function(t) {
                o.showToastMsg("开抢前10分钟提醒", null, null, "收藏成功"), a.setData({
                    isEnshrine: !s
                });
            }).catch(function(t) {
                console.log(t);
            });
        } else t.goLogin();
    },
    addCartCallback: function(t, e, i) {
        return;
    },
    clickPicInfo: function(t) {
        var e = t.detail.url;
        console.log(e, t), wx.navigateTo({
            url: e
        });
    },
    buyTipScroll: function() {
        var t = this;
        clearTimeout(o), o = setTimeout(function() {
            t.setData({
                isCartTip2: !1
            });
        }, 5e3);
    }
}, r, v, w, f, d, m, c, u, l, _, h, p, g, n.pageEvents, y, S));