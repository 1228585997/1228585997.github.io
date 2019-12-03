var t = getApp(), a = require("../../utils/util.js"), e = require("../../utils/statistics"), s = require("../../components/countdown/countdown.js"), i = require("../../components/backtop/backtop"), n = require("../../components/enshrine/index"), d = require("../../components/toast/toast"), r = require("../../components/blockAds/index"), o = require("../../components/bottom-menu/index"), h = require("../../utils/throttle"), c = void 0, u = !1;

Page(a.mergePage({
    data: {
        ready: !1,
        isTopHidden: !0,
        isEnshrine: !1,
        blockadsArr: [ [], [], [], [], [], [], [], [], [], [] ],
        cate_item: "",
        ifSupportQuery: !!wx.createSelectorQuery,
        inViemportArr: {}
    },
    onShow: function() {
        var t = this;
        if (this.data.time_tabs && this.data.time_tabs.length) {
            for (var a = this.data.time_tabs[this.data.curIndex].goodslist, s = 0; s < a.length; s++) this.isEnshrineFn(a[s].goods_code) ? a[s].hasEnshrined = !0 : a[s].hasEnshrined = !1;
            this.setData(t.data);
        }
        e.sendPageData("page_purchase", "", "进入限量秒杀页");
    },
    onLoad: function() {
        var t = this;
        wx.showLoading && wx.showLoading({
            title: "加载中"
        }), a.getZyId(function(a) {
            c = "p16_" + a, t.getTab();
        }), this.getBottomMenu("pages/timeBuy/timeBuy");
        var s = wx.createAnimation({
            duration: 500
        }).translateX(0).step(), i = wx.createAnimation({
            duration: 500
        }).translateX("-100%").step();
        this.setData({
            animation: s.export(),
            backAnimation: i.export()
        }), e.sendZhugePageData("进入限量秒杀页", {});
    },
    getTab: function(a) {
        var s = this;
        if (!u) {
            u = !0;
            var i = this, n = {};
            if (a >= 0) {
                if (1 == this.data.time_tabs[a].has_more_page) return void (u = !1);
                this.data.time_tabs[a].page = ++this.data.time_tabs[a].page, n.page = this.data.time_tabs[a].page, 
                n.tab_id = this.data.time_tabs[a].tab_id;
            }
            n.platform = t.globalData.PLATFORM, n.app_version = t.globalData.APP_VERSION, n.utm = e.getData("utm"), 
            n.cate_item = this.data.cate_item, n.apisign = t.createApisign(n), wx.request({
                url: t.globalData.URL_MAPI + "timebuy/xrlist",
                data: n,
                method: "GET",
                header: {
                    "Content-Type": "application/json"
                },
                success: function(t) {
                    u = !1;
                    var e = t.data.data;
                    if (a >= 0) {
                        for (o = 0; o < e.goodslist.length; o++) e.goodslist[o].rate = (100 * e.goodslist[o].rate).toFixed(0);
                        s.data.time_tabs[a].has_more_page = e.info.has_more_page, s.data.time_tabs[a].goodslist = s.data.time_tabs[a].goodslist.concat(e.goodslist), 
                        s.setData(s.data);
                    } else {
                        for (var n = 0, d = 0; d < e.time_tabs.length; d++) {
                            var r = e.time_tabs[d];
                            "抢购中" == r.tab_txt && (n = d, i.countdown({
                                endTime: 1e3 * parseInt(r.end_time, 10),
                                timeKey: "clock." + r.tab_id
                            })), r.tab_txt, r.page = 1;
                            for (var o = 0; o < r.goodslist.length; o++) {
                                r.goodslist[o].rate = (100 * r.goodslist[o].rate).toFixed(0);
                                wx.getStorageSync("goods_list");
                                s.isEnshrineFn(r.goodslist[o].goods_code) ? r.goodslist[o].hasEnshrined = !0 : r.goodslist[o].hasEnshrined = !1;
                            }
                        }
                        e.curIndex = n, e.ready = !0;
                        var h = wx.getSystemInfoSync();
                        if (s.wwidth = h.windowWidth, s.swiperItemWidth = s.wwidth / 5, s.swiperItemCount = e.time_tabs.length + 4, 
                        e.swiperWidth = s.swiperItemCount * s.swiperItemWidth, e.swiperItemWidth = s.swiperItemWidth, 
                        e.time_tabs[n].sub_tabs) {
                            for (var m = 0; m < e.time_tabs[n].sub_tabs.length; m++) if ("1" == e.time_tabs[n].sub_tabs[m].selected) {
                                e.cate_item = e.time_tabs[n].sub_tabs[m].cate_item;
                                break;
                            }
                        } else e.cate_item = "";
                        s.setData(e), s.initTab(), s.getAds(c, e.time_tabs[n].module_item, n), wx.hideLoading && wx.hideLoading();
                    }
                    setTimeout(s.setBarAni, 200);
                }
            });
        }
    },
    getMoreGoods: function() {
        this.getTab(this.data.curIndex);
    },
    initTab: function() {
        wx.setStorageSync("detailFromtimeBuy", this.data.time_tabs), this.translate = -this.data.curIndex * this.swiperItemWidth, 
        this.setSwiperPos(this.translate, !1);
    },
    timeTabTap: function(t) {
        var a = t.currentTarget.dataset.index;
        if (this.data.curIndex = a, this.translate = -this.data.curIndex * this.swiperItemWidth, 
        this.setSwiperPos(this.translate, !0), this.data.time_tabs[this.data.curIndex].sub_tabs) {
            for (var s = 0; s < this.data.time_tabs[this.data.curIndex].sub_tabs.length; s++) if ("1" == this.data.time_tabs[this.data.curIndex].sub_tabs[s].selected) {
                this.data.cate_item = this.data.time_tabs[this.data.curIndex].sub_tabs[s].cate_item;
                break;
            }
        } else this.data.cate_item = "";
        this.setData(this.data), this.getAds(c, this.data.time_tabs[this.data.curIndex].module_item, this.data.curIndex), 
        e.sendEventData(t.currentTarget.dataset), setTimeout(this.setBarAni, 200);
    },
    cateItemTap: function(t) {
        var a = t.currentTarget.dataset.index;
        if (this.data.cate_item != this.data.time_tabs[this.data.curIndex].sub_tabs[a].cate_item) {
            for (var e = 0; e < this.data.time_tabs[this.data.curIndex].sub_tabs.length; e++) this.data.time_tabs[this.data.curIndex].sub_tabs[e].selected && e != a && (this.data.time_tabs[this.data.curIndex].sub_tabs[e].selected = "0"), 
            e == a && (this.data.time_tabs[this.data.curIndex].sub_tabs[e].selected = "1", this.data.cate_item = this.data.time_tabs[this.data.curIndex].sub_tabs[e].cate_item);
            this.data.time_tabs[this.data.curIndex].page = 0, this.data.time_tabs[this.data.curIndex].goodslist = [], 
            this.data.time_tabs[this.data.curIndex].has_more_page = 0, this.getTab(this.data.curIndex), 
            setTimeout(this.setBarAni, 200);
        }
    },
    setSwiperPos: function(t, a) {
        var e = wx.createAnimation({
            duration: a ? 300 : 0,
            timingFunction: "ease",
            transformOrigin: "50% 50%",
            dealy: 0
        });
        e.translateX(t).step(), this.setData({
            animationData: e.export()
        });
    },
    bindTopTap: function(t) {
        i.bindTopTap.call(this, t);
    },
    dealScroll: function(t) {
        i.dealScroll.call(this, t), this.setBarAni();
    },
    setBarAni: h(function() {
        if (this.data.ifSupportQuery) {
            var a = this;
            wx.createSelectorQuery().selectAll(".needAni").boundingClientRect().exec(function(e) {
                var s = t.globalData.SYSTIME_INFO, i = {};
                (e = e[0]).forEach(function(t) {
                    var a = t.top >= 0 && t.left >= 0 && t.bottom <= s.windowHeight && t.right <= s.windowWidth;
                    i[t.id] = a;
                }), a.setData({
                    inViemportArr: i
                });
            });
        }
    }, 200),
    swiperTouchstart: function(t) {
        var a = t.changedTouches[0];
        this.touchStart = a.clientX, this.translate = -this.data.curIndex * this.swiperItemWidth;
    },
    swiperTouchmove: function(a) {
        var e = t.globalData.SYSTIME_INFO, s = a.changedTouches[0].clientX, i = this.translate + s - this.touchStart;
        i >= 0 || i <= -(this.swiperItemWidth * this.swiperItemCount - e.windowWidth) || this.setSwiperPos(i, !1);
    },
    swiperTouchend: function(t) {
        var a = t.changedTouches[0].clientX, e = this.translate + a - this.touchStart;
        this.data.curIndex = Math.round(Math.abs(e) / this.swiperItemWidth), e >= 0 && (this.data.curIndex = 0), 
        e <= -(this.swiperItemWidth * this.swiperItemCount - this.wwidth) && (this.data.curIndex = this.swiperItemCount - 5), 
        this.setSwiperPos(-this.data.curIndex * this.swiperItemWidth, !0), this.setData({
            curIndex: this.data.curIndex,
            scrollTop: 0
        });
    },
    enshrineBtn: function(a) {
        var e = this, s = this, i = !1, n = a.currentTarget.dataset.goodsid, d = a.currentTarget.dataset.goodscodes, r = a.currentTarget.dataset.index, o = parseInt(this.data.time_tabs[this.data.curIndex].goodslist[r].person_stock_text);
        if (i = !!this.isEnshrineFn(d), t.checkLogin()) if (i) {
            o -= 1;
            var h = [ {
                goods_code: d,
                goods_type: "3",
                goods_id: n
            } ];
            this.cancelEnshrine(h).then(function(t) {
                s.showToastMsg("你可能会错过这次抢购哦", null, null, "限时提醒已取消，"), e.setData({
                    isEnshrine: !i
                });
            });
        } else {
            o += 1;
            var c = {
                goodsCode: d,
                goodsId: n,
                salesType: ""
            };
            this.addEnshrine(c).then(function(t) {
                s.showToastMsg("收藏成功"), e.setData({
                    isEnshrine: !i
                });
            });
        } else t.goLogin();
        o = String(o) + "人准备抢", this.data.time_tabs[this.data.curIndex].goodslist[r].hasEnshrined = !this.data.time_tabs[this.data.curIndex].goodslist[r].hasEnshrined, 
        this.data.time_tabs[this.data.curIndex].goodslist[r].person_stock_text = o, this.setData(s.data);
    },
    onShareAppMessage: function() {
        return t.setShare("每日限时疯抢，海量爆款轮番秒！", "pages/timeBuy/timeBuy", null, "https://goods6.juancdn.com/act/180205/a/a/5a77f7ff8150a10e0a63a257_750x600.png");
    }
}, s, n, d, r, o, e.pageEvents));