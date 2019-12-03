var e = getApp(), t = require("../../../utils/util.js"), a = require("../../../utils/statistics"), s = require("../../../components/toast/toast"), i = require("../../../components/address-picker/address-picker");

Page(t.mergePage({
    data: {
        order: "",
        username: "",
        tel: "",
        addrdetail: ""
    },
    onLoad: function(e) {
        e.order && this.setData({
            order: e.order
        });
    },
    onHide: function() {},
    onShow: function() {},
    usernameChange: function(e) {
        this.setData({
            username: e.detail.value
        });
    },
    telChange: function(e) {
        this.setData({
            tel: e.detail.value
        });
    },
    addrdetailChange: function(e) {
        this.setData({
            addrdetail: e.detail.value
        });
    },
    sumbitAddForm: function() {
        var t = this, a = this.data, s = a.addressPicker, i = a.order, n = a.username, r = a.tel, o = a.addrdetail, d = e.getPublicArg();
        return d.username = n, d.tel = r, d.province = s.province, d.city = s.city, d.region = s.town, 
        d.addrdetail = o, d.apisign = e.createApisign(d), n ? r ? o && s.province && s.city && s.town ? void wx.request({
            url: e.globalData.URL_MACT + "WheelLottery-address?id=" + i,
            data: d,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                1e3 == e.data.code ? (t.showToastMsg("提交地址成功～", 3e3), setTimeout(function() {
                    wx.navigateBack();
                }, 3e3)) : t.showToastMsg(e.data.msg);
            }
        }) : (this.showToastMsg("请确保收货地址正确", null, null, "- 温馨提示 -"), !1) : (this.showToastMsg("请填写收件人电话", null, null, "- 温馨提示 -"), 
        !1) : (this.showToastMsg("请填写收件人名称", null, null, "- 温馨提示 -"), !1);
    }
}, i, s, a.pageEvents));