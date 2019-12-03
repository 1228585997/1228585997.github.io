getApp();

var a = require("../../../utils/util.js"), e = require("../../../utils/statistics"), t = require("../../../components/error-msg/error-msg"), i = require("../../../components/toast/toast"), s = require("../dmqc.service.js");

Page(a.mergePage({
    data: {
        title: "请填写您的相关信息，以便我们更好为您推荐尺码",
        size: "",
        sex: -1,
        ready: !1,
        height: "",
        weight: "",
        arg3: "",
        arg4: "",
        arg5: "",
        arg6: ""
    },
    onReady: function() {
        var a = this;
        wx.getStorage({
            key: "dmqc_size_record",
            success: function(e) {
                if (e && e.data) {
                    var t = e.data, i = t.size, s = t.sex, r = t.height, g = t.weight, o = t.arg3, h = t.arg4, n = t.arg5, c = t.arg6;
                    a.setData({
                        title: "根据当前尺码信息为您推荐：",
                        size: i,
                        sex: s,
                        height: r,
                        weight: g,
                        arg3: o,
                        arg4: h,
                        arg5: n,
                        arg6: c
                    });
                }
            }
        });
    },
    onShow: function() {},
    tapSex: function(a) {
        var e = a.currentTarget.id;
        this.setData({
            sex: "male" == e ? 1 : 0
        });
    },
    infoInput: function(a) {
        switch (a.currentTarget.id) {
          case "1":
            this.setData({
                height: a.detail.value
            });
            break;

          case "2":
            this.setData({
                weight: a.detail.value
            });
            break;

          case "3":
            this.setData({
                arg3: a.detail.value
            });
            break;

          case "4":
            this.setData({
                arg4: a.detail.value
            });
            break;

          case "5":
            this.setData({
                arg5: a.detail.value
            });
            break;

          case "6":
            this.setData({
                arg6: a.detail.value
            });
        }
    },
    goBack: function() {
        wx.navigateBack();
    },
    upLoad: function(a) {
        var e = this, t = this, i = this.data, s = i.sex, r = i.height, g = i.weight, o = i.arg3, h = i.arg4, n = i.arg5, c = i.arg6;
        -1 != s ? r && g ? (wx.showLoading && wx.showLoading({
            title: "加载中"
        }), this.upLoadRecord(s + "", r + "", g + "", o, h, n, c).then(function(a) {
            if (wx.hideLoading && wx.hideLoading(), "1000" === a.code) {
                var i = {
                    size: a.data.info.size,
                    sex: s,
                    height: r,
                    weight: g,
                    arg3: o,
                    arg4: h,
                    arg5: n,
                    arg6: c
                };
                wx.setStorage({
                    key: "dmqc_size_record",
                    data: i
                }), e.setData({
                    title: "根据当前尺码信息为您推荐：",
                    size: a.data.info.size
                });
            } else t.showToastMsg(a.info);
        })) : this.showToastMsg("请输入正确尺码") : this.showToastMsg("请选择性别");
    }
}, t, i, e, a, s));