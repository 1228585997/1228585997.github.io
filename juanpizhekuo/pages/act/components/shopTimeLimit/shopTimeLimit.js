var o = getApp();

require("../../../../utils/util");

module.exports = {
    shopTimeLimitTransformData: function(s, t, a) {
        var r = this, g = this, i = a[s.zidIndex];
        return s.bgImage.src = this.getImageUrl(s.bgImage.src), wx.request({
            url: o.globalData.URL_MACT + t + "-getGoodsList?zid[]=" + i,
            method: "GET",
            success: function(o) {
                var t = o.data.data[i] || [];
                (t = r.sortGoods(t, "m"))[0].zid = i;
                for (var a = 0; a < t.length; a++) for (var m = 0; m < t[a].goodsList.length; m++) {
                    var e = t[a].goodsList[m];
                    if (Number(e.n) > 0 && "1790483" !== e.n && 1 === Number(e.m) ? (e.isZc = !0, e.url = "/pages/brand/brand?brand_id=" + e.l + "&shop_id=" + e.n + "&goods_id=" + e.p) : (e.isZc = !1, 
                    e.url = "/pages/shop/shop?id=" + e.p), s.commonTag && (e.tag = s.commonTag, e.tag.src = r.getImageUrl(s.commonTag.src)), 
                    s.customTags) for (var c = 0; c < s.customTags.length; c++) s.customTags[c].id == e.p && s.customTags[c].customTag.src && (e.tag = s.customTags[c].customTag, 
                    e.tag.src = r.getImageUrl(s.customTags[c].customTag.src));
                }
                g.setData({
                    gFloorsLimit: t[0].goodsList
                });
            },
            complete: function() {}
        }), s;
    },
    sortGoods: function(o, s) {
        return o.map(function(o, t) {
            if (void 0 !== o.abSort && null !== o.abSort) {
                var a = [], r = o.abSort[s] ? o.abSort[s] : o.abSort.m;
                o.abSort && (r.map(function(s) {
                    void 0 !== o.goodsList[s] && a.push(o.goodsList[s]);
                }), o.goodsList = a);
            }
        }), o;
    }
};