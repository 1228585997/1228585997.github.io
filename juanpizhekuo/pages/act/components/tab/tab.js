getApp();

var t = require("../../../../utils/statistics"), e = void 0, a = {
    tabTransformData: function(t) {
        var a = this, r = t.basic, i = t.tabs, o = i.tabList;
        return e = t, t.nStyle = "background-color:" + r.bg + ";color:" + r.txt + ";", t.aStyle = "background-color:" + r.bgActive + ";color:" + r.txtActive + ";", 
        t.brStyle = "border-right: 2rpx solid " + r.cutline + ";", t.bbStyle = "border-bottom: 2rpx solid " + r.cutline + ";", 
        t.gt5 = o.length > 5, t.tabLength = o.length, t.col = t.gt5 ? 6 === t.tabLength ? 3 : 7 === t.tabLength || 8 === t.tabLength ? 4 : 5 : 1, 
        t.tabs.tabImg.src = a.getImageUrl(i.tabImg.src), t.tabs.tabImgActive.src = a.getImageUrl(i.tabImgActive.src), 
        1 == t.type && o.forEach(function(e, r) {
            e.activeBgPos = a.imgPosition(t.tabLength, r, t.col);
        }), t;
    },
    imgPosition: function(t, e, a) {
        var r = 0, i = void 0;
        return t > 5 ? (e > a - 1 && (r = "100%"), i = 100 * (e % a / (a - 1)).toFixed(4) + "%") : i = 100 * (e / (t - 1)).toFixed(4) + "%", 
        i + " " + r;
    },
    tabTap: function(a) {
        var r = a.currentTarget.dataset, i = r.index, o = +r.jump, c = this;
        if (i != this.data.curTab) {
            switch (o) {
              case 1:
                wx.redirectTo({
                    url: r.url
                });
                break;

              case 2:
                if (c.data.canUseSelector) {
                    var s = wx.createSelectorQuery();
                    s.select("#" + e.id).boundingClientRect(), s.selectViewport().scrollOffset(), s.exec(function(t) {
                        if (t.length <= 0) return !1;
                        var e = t[1], a = t[0].top + e.scrollTop;
                        c.setData({
                            curTab: i,
                            ifTabTap: !0,
                            ifExpandTabs: !1
                        }), wx.pageScrollTo({
                            scrollTop: a
                        });
                    });
                } else c.setData({
                    curTab: i,
                    ifTabTap: !0,
                    ifExpandTabs: !1
                });
                break;

              default:
                if (c.data.canUseSelector) {
                    var n = wx.createSelectorQuery();
                    n.select("#floor_" + i).boundingClientRect(), n.selectViewport().scrollOffset(), 
                    n.exec(function(t) {
                        if (t.length <= 0) return !1;
                        var e = t[1], a = t[0].top + e.scrollTop - 44;
                        c.setData({
                            curTab: i,
                            ifTabTap: !0,
                            ifFixedTabs: !0,
                            ifExpandTabs: !1
                        }), wx.pageScrollTo({
                            scrollTop: a
                        });
                    });
                } else c.setData({
                    curTab: i,
                    ifTabTap: !0,
                    ifExpandTabs: !1
                });
            }
            t.sendEventData(r);
        }
    },
    toggleTab: function(t) {
        var e = this.data.ifExpandTabs;
        t.currentTarget.dataset;
        this.setData({
            ifExpandTabs: !e
        });
    },
    dealScrollForTab: function(t) {
        var e = this, a = e.data;
        if (-1 != a.tabJumpType && a.canUseSelector) {
            var r = wx.createSelectorQuery();
            if (r.select(".tabs-wrap").boundingClientRect().exec(function(t) {
                if (t.length <= 0) return !1;
                t[0].top + t[0].height <= 44 ? !a.ifFixedTabs && e.setData({
                    ifFixedTabs: !0
                }) : a.ifFixedTabs && e.setData({
                    ifFixedTabs: !1,
                    ifExpandTabs: !1
                });
            }), 0 != a.tabJumpType) return !1;
            a.ifTabTap ? e.setData({
                ifTabTap: !1
            }) : r.selectAll(".floor").boundingClientRect().exec(function(t) {
                for (var a = t[1], r = a.length, i = 0; i < r; i++) if ((a[i].top <= 0 && a[i + 1].top > 44 || i == r - 1 && a[i].top <= 44) && i != e.data.curTab) {
                    e.setData({
                        curTab: i,
                        ifTabTap: !1
                    });
                    break;
                }
            });
        }
    }
};

module.exports = a;