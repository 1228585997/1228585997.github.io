function e(e, a, i) {
    return a in e ? Object.defineProperty(e, a, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = i, e;
}

var a = getApp(), i = (require("../../../../utils/util"), 0);

module.exports = {
    imageTransformData: function(i, t) {
        var r = this, s = new Date().getTime() + a.globalData.ACT_TIME_DIFF;
        i.img.src = this.getImageUrl(i.img.src), i.img.anchors && this.dealAnchors(i.img.anchors, t);
        var h = 0, n = !1;
        if (i.list.length > 0) {
            for (var o = 0; o < i.list.length; o++) i.list[o].img.src = this.getImageUrl(i.list[o].img.src), 
            s > i.list[o].time && (h = o + 1, o == i.list.length - 1 && (n = !0)), i.list[o].img.anchors && this.dealAnchors(i.list[o].img.anchors, t);
            n || this.countdown({
                endTime: i.list[h].time,
                timeKey: "clock." + i.id,
                isAct: !0,
                onEnd: function() {
                    r.imageTransformData(i);
                }
            });
        }
        return this.setData(e({}, "imageIndex." + i.id, h)), i;
    },
    dealAnchors: function(e, a) {
        ++i;
        for (var t = 0; t < e.length; t++) {
            var r = e[t];
            switch (r.top = 375 * r.top / 16 * 2, r.left = 375 * r.left / 16 * 2, r.width = 375 * r.width / 16 * 2, 
            r.height = 375 * r.height / 16 * 2, r.activityparam = a + "_" + (1e3 + i) + "." + (t + 1), 
            r.type) {
              case "23":
                r.href = "/pages/brand/brand?brand_id=" + r.id + "&shop_id=" + r.shop_id;
                break;

              case "23.1":
                r.href = "/pages/brand/brand?brand_id=0&shop_id=" + r.id;
                break;

              case "22":
                r.href = "/pages/shop/shop?id=" + r.id;
                break;

              case "22.1":
                r.href = "/pages/shop/shop?id=" + r.good_id;
                break;

              case "88":
                r.href = "/pages/store/store?store_id=" + r.id;
                break;

              case "80":
                r.href = "/pages/shop/shop?id=" + r.id;
                break;

              case "2":
                r.href = "/pages/act/act?name=" + r.actName;
                break;

              case "1":
                r.href = r.xcxUrl;
            }
        }
    }
};