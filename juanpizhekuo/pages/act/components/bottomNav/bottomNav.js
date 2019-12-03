function t(t, a, o) {
    return a in t ? Object.defineProperty(t, a, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = o, t;
}

getApp(), require("../../../../utils/util");

var a = {
    bottomNavTransformData: function(t, a) {
        var o = this, e = !1, i = [];
        return t.navs.forEach(function(t, n) {
            t.bg && t.bg.src && (t.bg.src = o.getImageUrl(t.bg.src)), t.bgActive && t.bgActive.src && (t.bgActive.src = o.getImageUrl(t.bgActive.src)), 
            1 == t.type ? (t.bgPop && t.bgPop.src && (t.bgPop.src = o.getImageUrl(t.bgPop.src)), 
            t.bgPop && t.bgPop.anchors && o.dealAnchors(t.bgPop.anchors, a), i[n] = {
                active: !1,
                zIndex: 110
            }) : 2 == t.type && (e = !0);
        }), e && o.getMiniCart(), o.setData({
            bottomPop: i
        }), t;
    },
    dealBottomNavPop: function(t) {
        var a = this, o = t.currentTarget.dataset.index, e = this.data.bottomPop, i = "bottomPop[" + o + "]";
        !e[o].active ? (e.forEach(function(t, e) {
            t.active && e != o && a.maskDownAnimation("bottomPop[" + e + "]");
        }), a.maskUpAnimation(i)) : a.maskDownAnimation(i);
    },
    maskUpAnimation: function(a) {
        var o, e = this;
        this.setData((o = {}, t(o, a + ".zIndex", 111), t(o, a + ".active", !0), o)), setTimeout(function() {
            var o = wx.createAnimation({
                duration: 500
            }).bottom("100rpx").step();
            e.setData(t({}, a + ".animation", o.export()));
        }, 50);
    },
    maskDownAnimation: function(a) {
        var o, e = this, i = wx.createAnimation({
            duration: 500
        }).bottom("-100%").step();
        this.setData((o = {}, t(o, a + ".zIndex", 110), t(o, a + ".animation", i.export()), 
        o)), setTimeout(function() {
            e.setData(t({}, a + ".active", !1));
        }, 500);
    }
};

module.exports = a;