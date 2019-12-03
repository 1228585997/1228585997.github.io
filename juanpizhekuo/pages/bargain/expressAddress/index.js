var t = require("../utils/tools"), i = t.toast, a = t.request;

Page({
    data: {
        cid: void 0,
        goodsId: void 0,
        labels: [ "收货人", "手机号码", "详细地址" ],
        inputs: []
    },
    onLoad: function(t) {
        var i = t.cid, a = t.goodsId;
        this.setData({
            cid: i,
            goodsId: a
        });
    },
    onInput: function(t) {
        var i = t.detail.value, a = t.currentTarget.dataset.index, s = this.data.inputs;
        s[a] = i, this.setData({
            inputs: s
        });
    },
    submit: function() {
        for (var t = this.data, s = t.inputs, d = t.cid, o = t.goodsId, e = void 0, n = void 0, r = 0; r < 3; r++) {
            if (!(n = s[r]) || !n.trim()) {
                e = r + 1;
                break;
            }
            e = 0;
        }
        switch (e) {
          case 1:
            return void i("请填写收货人");

          case 2:
            return void i("请填写手机号码");

          case 3:
            return void i("请填写详细地址");

          default:
            wx.showLoading({
                title: "正在提交",
                mask: !0,
                success: function() {
                    a({
                        url: o ? "https://mapi.juanpi.com/act/exchange" : "https://mapi.juanpi.com/Cutdown/saveAddress",
                        data: {
                            cid: d,
                            goodsId: o,
                            consignee: s[0].trim(),
                            mobile: s[1].trim(),
                            address: s[2].trim()
                        }
                    }).then(function(t) {
                        t.url && wx.redirectTo({
                            url: t.url
                        });
                    }).catch(function(t) {
                        i(t), wx.hideLoading();
                    });
                }
            });
        }
    }
});