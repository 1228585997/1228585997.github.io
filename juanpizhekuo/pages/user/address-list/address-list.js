var e = getApp(), t = require("../../../utils/util"), a = require("../../../components/error-msg/error-msg"), s = require("../../../utils/statistics"), o = require("../../../components/toast/toast");

Page(t.mergePage({
    data: {
        empty: !1
    },
    onShow: function(a) {
        var o = this;
        t.post({
            url: e.globalData.URL_M + "xcxaddress/index",
            data: {
                xcx_uid: wx.getStorageSync("uid"),
                xcx_sign: wx.getStorageSync("xcx_sign")
            },
            complete: function(e) {
                var t = e.data, a = void 0 === t ? {} : t;
                0 == a.data.addrnum ? o.setData({
                    empty: !0
                }) : o.setData({
                    empty: !1
                }), "1000" === a.code && o.setData(a.data);
            }
        }), s.sendPageData("page_address");
    },
    getWxAddress: function(a) {
        var o = this;
        wx.getSetting({
            success: function(a) {
                1 != wx.getStorageSync("ifNotFirstAddress") || a.authSetting["scope.address"] ? wx.chooseAddress && (wx.setStorageSync("ifNotFirstAddress", 1), 
                wx.chooseAddress({
                    success: function(a) {
                        var s = a.userName, r = (a.postalCode, a.provinceName, a.cityName, a.countyName, 
                        a.detailInfo), d = (a.nationalCode, a.telNumber);
                        wx.request({
                            url: e.globalData.URL_M + "xcxaddress/addWxAddress",
                            method: "POST",
                            data: {
                                xcx_uid: wx.getStorageSync("uid"),
                                xcx_sign: wx.getStorageSync("xcx_sign"),
                                province: a.provinceName,
                                city: a.cityName,
                                town: a.countyName,
                                postcode: a.postalCode,
                                addr: a.detailInfo,
                                mobile: a.telNumber,
                                username: a.userName
                            },
                            success: function(a) {
                                if (1001 == a.data.code) return o.showToastMsg(a.data.msg);
                                1002 == a.data.code ? (wx.setStorageSync("userName", s), wx.setStorageSync("detailInfo", r), 
                                wx.setStorageSync("telNumber", d), wx.navigateTo({
                                    url: "../address-edit/address-edit?formWxAdLists=true"
                                })) : (t.post({
                                    url: e.globalData.URL_M + "xcxaddress/index",
                                    data: {
                                        xcx_uid: wx.getStorageSync("uid"),
                                        xcx_sign: wx.getStorageSync("xcx_sign")
                                    },
                                    complete: function(e) {
                                        var t = e.data, a = void 0 === t ? {} : t;
                                        "1000" === a.code && o.setData(a.data);
                                    }
                                }), o.setData({
                                    empty: !1
                                }));
                            }
                        });
                    }
                })) : wx.showModal({
                    content: "卷皮需要获取您的通讯地址才能进行此步操作。",
                    confirmText: "去授权",
                    success: function(e) {
                        e.confirm ? wx.openSetting({
                            success: function(e) {}
                        }) : e.cancel;
                    }
                });
            }
        }), s.sendEventData(a.currentTarget.dataset);
    }
}, a, o, s.pageEvents));