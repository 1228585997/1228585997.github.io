var o = getApp(), t = (require("../../../../utils/util"), require("../../common/actutil"));

module.exports = {
    goodsTransformData: function(t, a, s) {
        for (var e = this, r = this, i = s[t.zidIndex], d = 0; d < t.pFloors.length; d++) {
            t.pFloors[d].banner.src && (t.pFloors[d].banner.src = this.getImageUrl(t.pFloors[d].banner.src));
            for (var c = 0; c < t.pFloors[d].areas.length; c++) t.pFloors[d].areas[c].area.src && (t.pFloors[d].areas[c].area.src = this.getImageUrl(t.pFloors[d].areas[c].area.src), 
            t.pFloors[d].areas[c].area.anchors && this.dealAnchors(t.pFloors[d].areas[c].area.anchors, a));
            t.pFloors[d].goodStyle = parseInt(t.pFloors[d].goodStyle);
        }
        return wx.request({
            url: "https://act.juancdn.com/ActGoodsJs/" + i + "/xcx_default.json",
            method: "GET",
            success: function(d) {
                var c = d.data.data[i] || [];
                c = e.sortGoods(c, "m");
                for (var n = 0; n < c.length; n++) {
                    for (var g = Number(t.pFloors[n].goodStyle) + 1, l = 0; l < c[n].goodsList.length; l++) {
                        var p = c[n].goodsList[l];
                        p.activityparam = a + "." + i + "." + (2001 + n) + "." + (l + 1) + "." + p.l + "." + p.n + "." + p.p;
                        var u = o.globalData.ACT_TIME_DIFF + new Date().getTime();
                        if (u < 1e3 * p.k) {
                            if (1 == t.checkStart) {
                                c[n].goodsList.splice(l, 1), l -= 1;
                                continue;
                            }
                            p.isKaiShou = !1;
                        } else p.isKaiShou = !0;
                        Number(p.n) > 0 && "1790483" !== p.n && 1 === Number(p.m) ? (p.isZc = !0, p.url = "/pages/brand/brand?brand_id=" + p.l + "&shop_id=" + p.n + "&goods_id=" + p.p) : (p.isZc = !1, 
                        p.url = "/pages/shop/shop?id=" + p.p), p.finalPrice = p.u || p.h;
                        var f = p.f1 && p.f1.indexOf("¥");
                        f && (f++, (f = p.f1.slice(f)) && (p.finalPrice = f)), e.getJiao(p, t, n, l), e.getDiscount(p, t, n, l), 
                        e.dealPtData(p, g, u);
                    }
                    if (-1 === [ 7, 8, 11, 12, 13 ].indexOf(g) && c[n].goodsList.length % 2 == 1) {
                        var h = Object.assign({}, c[n].goodsList[c[n].goodsList.length - 1]);
                        h.placehodler = !0, h.type = t.blankImg, h.p = h.p + "0", c[n].goodsList.push(h);
                    }
                }
                for (var b = JSON.parse(JSON.stringify(c)), m = 0; m < c.length; m++) c[m].goodsList = b[m].goodsList.splice(0, 6);
                r.setData({
                    gFloors: c
                }), r.splitLoad(b, function() {
                    r.dealStockAndFavors(t, a, s, r.data.gFloors);
                });
            },
            complete: function() {}
        }), t;
    },
    splitLoad: function(o, t) {
        var a = this;
        setTimeout(function() {
            for (var s = 0; s < a.data.gFloors.length; s++) a.data.gFloors[s].goodsList = a.data.gFloors[s].goodsList.concat(o[s].goodsList.slice(0));
            a.setData({
                gFloors: a.data.gFloors
            }), t();
        }, 300);
    },
    sortGoods: function(o, t) {
        return o.map(function(o, a) {
            if (void 0 !== o.abSort && null !== o.abSort) {
                var s = [], e = o.abSort[t] ? o.abSort[t] : o.abSort.m;
                o.abSort && (e.map(function(t) {
                    void 0 !== o.goodsList[t] && s.push(o.goodsList[t]);
                }), o.goodsList = s);
            }
        }), o;
    },
    setGoodPropByProp: function(t, a, s) {
        var e = o.globalData.ACT_TIME_DIFF + new Date().getTime();
        return t.map(function(o, r) {
            o.goodsList.map(function(o, i) {
                o.placehodler || (e < 1e3 * o.k ? t[r].goodsList[i].g = "todo" : e > 1e3 * o.j && (t[r].goodsList[i].g = "done"), 
                o[a[0]] == a[1] && ("a1" === a[0] ? o.isZc && (t[r].goodsList[i][s[0]] = s[1]) : "p" === a[0] && e < 1e3 * o.k ? t[r].goodsList[i].g = "" : t[r].goodsList[i][s[0]] = s[1]));
            });
        }), t;
    },
    getJiao: function(o, t, a, s) {
        var e = t.pFloors[a], r = {};
        if (1 == t.hasHong && o.b) e && "1" == e.tagType && s < 99 ? (r.type = "text", r.txt = 1 + s, 
        r.class = "jiao_top") : o.n > 0 && 1 == o.m && (r.type = "text", r.txt = o.b, r.class = "jiao_hong"); else if (e && "1" == e.tagType) s < 99 ? (r.type = "text", 
        r.txt = 1 + s, r.class = "jiao_top") : (r.type = "image", r.class = "jiao_good", 
        r.src = this.getImageUrl(t.tag.src) || ""); else if (e && "0" == e.tagType) r.type = "image", 
        r.class = "jiao_good", r.src = this.getImageUrl(t.tag.src) || ""; else if (e.tagType) {
            var i = "";
            i = "tag" + (i = 1 !== o.c1 && o.u > 0 ? "3" : 1 == Number(o.v) ? "1" : 3 == Number(o.w) ? "2" : "0"), 
            r.type = "image", r.class = "jiao_good", r.style = "width:" + e[i].width + "rpx;height:" + e[i].height + "rpx;", 
            r.src = e && this.getImageUrl(e[i].src) || this.getImageUrl(t.tag.src) || "";
        }
        o.jiao = r;
    },
    getDiscount: function(o, t, a, s) {
        var e = t.pFloors[a], r = {};
        switch (e.discount) {
          case "0":
            break;

          case "1":
            o.a && (r.class = "good-discount", r.txt = o.a);
            break;

          case "2":
            o.f1 ? (r.class = "good-discount-red", r.txt = o.f1) : o.a && (r.class = "good-discount", 
            r.txt = o.a);
            break;

          default:
            e.discount && (r.class = "good-discount", r.txt = e.discount);
        }
        o.discount = r;
    },
    dealPtData: function(o, t, a) {
        if (-1 != [ 10, 11, 12, 13 ].indexOf(t)) o.z || (o.z = {}), a < 1e3 * o.z.a ? (o.buyStatus = 0, 
        o.btnTxt = "即将开售") : a < 1e3 * o.z.b ? (o.buyStatus = 1, o.btnTxt = "马上开团", 3 === o.z.c && (o.btnTxt = "免费申请")) : (o.buyStatus = 2, 
        1 === o.z.d ? (o.btnTxt = "查看中奖名单", 3 === o.z.c && (o.btnTxt = "查看试用名单")) : (o.btnTxt = "等待开奖", 
        3 === o.z.c && (o.btnTxt = "等待揭晓"))), o.goodStyle = "t" + t; else if (o.isZc) o.goodStyle = "p" + t; else switch (t) {
          case 1:
          case 9:
            o.goodStyle = "d1";
            break;

          case 2:
          case 3:
          case 4:
            o.goodStyle = "d2";
            break;

          case 5:
            o.goodStyle = "d5";
            break;

          case 6:
            o.goodStyle = "d6";
            break;

          case 7:
            o.goodStyle = "d7";
            break;

          case 8:
            o.goodStyle = "d8";
        }
    },
    dealStockAndFavors: function(a, s, e, r) {
        var i = this;
        t.getStock(e, s).then(function(t) {
            var s = t.data;
            if (s && s.data && s.data.map(function(o) {
                r = i.setGoodPropByProp(r, [ "p", o ], [ "g", "end" ]);
            }), o.checkLogin()) {
                var e = wx.getStorageSync("goods_list");
                if (e && e.map(function(o) {
                    Number(o) > 0 && (r = i.setGoodPropByProp(r, [ "d2", o ], [ "favored", !0 ]));
                }), 1 == a.hasHong) {
                    var d = wx.getStorageSync("collect_store_id");
                    d && d.map(function(o) {
                        r = i.setGoodPropByProp(r, [ "a1", o ], [ "favored", !0 ]);
                    });
                }
            }
            i.setData({
                gFloors: r
            });
        });
    },
    collectHongbaoTap: function(t) {
        var a = this;
        if (o.checkLogin()) {
            var s = this, e = t.currentTarget.dataset;
            if (!e.favored) {
                var r = o.getPublicArg();
                r.bid = e.bid, r.soldoutime = e.soldoutime, r.startime = e.startime, r.storeid = e.storeid, 
                r.goodsid = e.goodsid, r.apisign = o.createApisign(r), wx.request({
                    url: o.globalData.URL_MACT + "/Actcomm-addFavGift",
                    data: r,
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    complete: function(o) {
                        var t = o.data, r = a.data.gFloors, i = wx.getStorageSync("collect_store_id") || [];
                        switch (t.code) {
                          case 1001:
                            s.showToastMsg("收藏失败，请先登录");
                            break;

                          case 2003:
                            s.showToastMsg("收藏失败，刷新看看");
                            break;

                          case 2004:
                            s.showToastMsg("收藏成功"), r = s.setGoodPropByProp(r, [ "p", e.goodsid ], [ "favored", !0 ]), 
                            a.setData({
                                gFloors: r
                            }), i.push(e.storeid), wx.setStorage({
                                key: "collect_store_id",
                                data: i
                            });
                            break;

                          case 2005:
                            s.showToastMsg("恭喜你，抢券成功！"), r = s.setGoodPropByProp(r, [ "p", e.goodsid ], [ "favored", !0 ]), 
                            a.setData({
                                gFloors: r
                            }), i.push(e.storeid), wx.setStorage({
                                key: "collect_store_id",
                                data: i
                            });
                            break;

                          default:
                            s.showToastMsg("收藏失败，刷新看看");
                        }
                    }
                });
            }
        } else o.goLogin();
    },
    dealYypGoodsTap: function(t) {
        var a = this, s = t.currentTarget.dataset, e = s.class;
        if ("0" === s.type && "end" !== e && "todo" !== e && "done" !== e) {
            if (!o.checkLogin()) return void o.goLogin();
            var r = o.getPublicArg();
            r.goods_id = s.id, r.apisign = o.createApisign(r), wx.request({
                url: o.globalData.URL_MAPI + "yiyuanpin/transfer",
                data: r,
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(o) {
                    var t = o.data, s = void 0 === t ? {} : t;
                    1e3 == s.code ? wx.navigateTo({
                        url: s.data.jump_url
                    }) : a.showToastMsg(s.info);
                }
            });
        } else wx.navigateTo({
            url: s.url
        });
    }
};