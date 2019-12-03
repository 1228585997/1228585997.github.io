function e(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = i, e;
}

var t = getApp(), i = require("../../utils/util"), o = (require("../../utils/md5.min"), 
require("../../components/countdown/countdown")), a = require("../../components/enshrine/index"), n = void 0, d = {
    getAds: function(i, o, a, d) {
        var s = this;
        n = a;
        var l = this;
        if (!(l.data.blockadsArr && l.data.blockadsArr[a].length > 0)) {
            var c = {
                app_version: t.globalData.APP_VERSION,
                scene_key: o || "msmall",
                platform: "msmall",
                zy_ids: i
            };
            c.apisign = t.createApisign(c), wx.request({
                url: t.globalData.URL_MAPI + "appads/banner",
                data: c,
                header: {
                    "Content-Type": "application/json"
                },
                success: function(i) {
                    var o = i.data, n = void 0 === o ? {} : o, c = t.globalData.SYSTIME_INFO;
                    if (1e3 == parseInt(n.code, 10)) {
                        if (n.data.block && n.data.block.length) {
                            var r = n.data.block[0].multi_block;
                            if (r && r.length) {
                                for (var h = 0; h < r.length; h++) {
                                    var g = r[h];
                                    if ("1" == g.block_type || "2" == g.block_type || "3" == g.block_type || "4" == g.block_type || "11" == g.block_type || "13" == g.block_type) for (var p = g.data, _ = 0; _ < p.length; _++) {
                                        var f = p[_].child;
                                        p[_].height = (c.windowWidth * p[_].height).toFixed(0);
                                        for (var u = 0, b = f.length; u < b; u++) if (parseInt(f[u].countdown.enable_time, 10)) {
                                            var w = 1e3 * parseInt(f[u].countdown.end_time, 10), m = 1e3 * parseInt(f[u].countdown.start_time, 10), k = f[u].bd_id, y = new Date().getTime();
                                            l.setData(e({}, "countDownText." + k, m - y >= 0 ? f[u].countdown.start_text : f[u].countdown.end_text)), 
                                            l.countdown({
                                                endTime: m - y >= 0 ? m : w,
                                                timeKey: "blockTimes." + k,
                                                onEnd: function() {}
                                            });
                                        }
                                    }
                                    if ("21" == g.block_type) {
                                        var v = 1e3 * parseInt(g.data.end_time, 10), x = g.data.bd_id;
                                        l.countdown({
                                            endTime: v,
                                            timeKey: "blockTimes." + x,
                                            onEnd: function() {}
                                        });
                                    } else if ("26" == g.block_type) {
                                        var T = 1e3 * parseInt(g.data.img_info.end_time, 10);
                                        l.countdown({
                                            endTime: T,
                                            timeKey: "blockTimes26",
                                            onEnd: function() {}
                                        });
                                    }
                                    if ("18" == g.block_type ? g.height = (g.height * c.windowWidth).toFixed(0) + "px;" : "20" == g.block_type && (g.height = (g.height * c.windowWidth - 20).toFixed(0) + "px;"), 
                                    "22" == g.block_type) for (var E = g.data.child, A = 0; A < E.length; A++) 3 == E[A].type ? (E[A].width = (g.width * c.windowWidth).toFixed(0) + "px;", 
                                    E[A].height = (g.height * c.windowWidth).toFixed(0) + "px;") : 2 == E[A].type ? E[A].width = "35%" : 1 == E[A].type && (E[A].width = "25%");
                                    if ("23" == g.block_type) for (var I = g.data.child, D = 0; D < I.length; D++) I[D].goods_info && (s.isEnshrineFn(I[D].goods_info.code) ? I[D].hasEnshrined = !0 : I[D].hasEnshrined = !1);
                                }
                                l.setData(e({}, "blockadsArr.[" + a + "]", r)), "function" == typeof d && d(r);
                            }
                        }
                        if (n.data.slide_ads && n.data.slide_ads.config && n.data.slide_ads.config.slide && n.data.slide_ads.config.slide.length) {
                            var F = n.data.slide_ads.config.slide;
                            l.setData({
                                slide_ads: F
                            });
                        }
                    }
                }
            });
        }
    },
    blockAdCollectedTap: function(i) {
        var o = this, a = this, d = i.currentTarget.dataset, s = d.pindex, l = d.index, c = d.goodsid, r = d.goodscode, h = d.iscollected;
        if (t.checkLogin()) if ("collected" == h) {
            var g = [ {
                goods_code: r,
                goods_type: "3",
                goods_id: c
            } ];
            this.cancelEnshrine(g).then(function(t) {
                a.showToastMsg("已取消收藏"), o.setData(e({}, "blockadsArr.[" + n + "].[" + s + "].data.child.[" + l + "].hasEnshrined", !1));
            });
        } else {
            var p = {
                goodsCode: r,
                goodsId: c,
                salesType: ""
            };
            a.addEnshrine(p).then(function(t) {
                a.showToastMsg("收藏成功"), a.setData(e({}, "blockadsArr.[" + n + "].[" + s + "].data.child.[" + l + "].hasEnshrined", !0));
            });
        } else t.goLogin();
    }
};

i.mergePage(d, o, a), module.exports = d;