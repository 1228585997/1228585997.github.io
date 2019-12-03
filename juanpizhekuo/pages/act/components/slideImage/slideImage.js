function e(e, a, r) {
    return a in e ? Object.defineProperty(e, a, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = r, e;
}

var a = getApp();

require("../../../../utils/util");

module.exports = {
    slideImageTransformData: function(r, i) {
        var s = this, t = new Date().getTime() + a.globalData.ACT_TIME_DIFF, c = 10;
        if ("0" == r.slideType) {
            for (var l = [], d = 0; d < r.slideList.length; d++) {
                var g = r.slideList[d];
                this.dealJump(g), g.img.src = this.getImageUrl(g.img.src), console.log(g.img.src), 
                g.startTime && g.startTime > t || g.endTime && g.endTime < t || l.push(g);
            }
            r.slideList = l;
        } else if ("1" == r.slideType) {
            r.cardPanel.img && r.cardPanel.img.src && (r.cardPanel.img.src !== r.img.src || r.cardPanel.img.src !== r.cardImg.src) && (r.cardPanel.img.src = this.getImageUrl(r.cardPanel.img.src), 
            c = (c = (r.cardPanel.img.height - r.cardPanel.cardList[0].img.height) / 2) > 0 ? c : 10);
            for (var n = 0; n < r.cardPanel.cardList.length; n++) {
                var m = r.cardPanel.cardList[n];
                m.img.src = this.getImageUrl(m.img.src), this.dealJump(m);
            }
        }
        return s.setData(e({}, "cardPadding." + i, c + "rpx 60rpx")), r;
    },
    dealJump: function(e) {
        switch (e.jumpType) {
          case "0":
            e.href = e.xcxUrl;
            break;

          case "1":
            e.href = "/pages/brand/brand?brand_id=0&shop_id=" + e.id;
            break;

          case "2":
            e.href = "/pages/act/act?name=" + e.actName;
        }
    }
};