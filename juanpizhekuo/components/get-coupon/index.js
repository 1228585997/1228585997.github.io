var t = require("../../utils/util"), o = require("../../utils/statistics"), a = getApp(), e = require("../../components/send-formid/index");

module.exports = {
    getCoupon: function(t, o, e) {
        var n = this, s = a.getPublicArg();
        s.goods_utype = s.jpGoodsUtype, s.platform = s.jpPlatform, s.uid = s.jpUid, s.req_coupons_id = o, 
        s.apisign = a.createApisign(s), wx.request({
            url: a.globalData.URL_MAPI + "coupons/get/list",
            data: s,
            method: "GET",
            complete: function(o) {
                var a = o.data, s = void 0 === a ? {} : a;
                if (1e3 == s.code) {
                    var i = s.data.coupons, d = i.length;
                    if (d <= 0) return !1;
                    for (var u = s.data.info, r = 1 != u.status ? "disabled" : "", p = "", c = 0; c < d; c++) p += i[c].coupon_id + "_";
                    p = p.substring(0, p.length - 1), n.setData({
                        coupon: {
                            coupon_list: i,
                            coupon_name: t,
                            coupon_btn_class: r,
                            coupon_btn_txt: u.status_txt,
                            coupon_ids: p
                        }
                    }), "function" == typeof e && e(s.data);
                }
            }
        });
    },
    getCouponTap: function(t) {
        var n = this, s = e.changeDataset(t.currentTarget.dataset.dataset);
        if ("disabled" != s.classname) {
            if (!a.checkLogin()) return a.goLogin(), !1;
            var i = a.getPublicArg();
            i.goods_utype = i.jpGoodsUtype, i.platform = i.jpPlatform, i.uid = i.jpUid, i.sign = i.jpSign, 
            i.idList = s.couponids, i.apisign = a.createApisign(i), wx.request({
                url: a.globalData.URL_MAPI + "coupons/add",
                data: i,
                method: "GET",
                complete: function(t) {
                    2 == t.data.data.status ? n.setData({
                        "coupon.coupon_btn_class": "disabled",
                        "coupon.coupon_btn_txt": "已领取"
                    }) : n.showErrorMsg("领取失败！请联系客服");
                }
            }), e.sendFormId(t.detail.formId, 3), o.sendEventData(s);
        }
    },
    closeCoupon: function(a) {
        var n = e.changeDataset(a.currentTarget.dataset.dataset), s = n.target;
        t.maskDownAnimation(this, s), e.sendFormId(a.detail.formId, 4), n.activity && o.sendEventData(n);
    }
};