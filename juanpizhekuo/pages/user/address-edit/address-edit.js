var e = function() {
    function e(e, t) {
        var r = [], s = !0, a = !1, d = void 0;
        try {
            for (var o, i = e[Symbol.iterator](); !(s = (o = i.next()).done) && (r.push(o.value), 
            !t || r.length !== t); s = !0) ;
        } catch (e) {
            a = !0, d = e;
        } finally {
            try {
                !s && i.return && i.return();
            } finally {
                if (a) throw d;
            }
        }
        return r;
    }
    return function(t, r) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, r);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), t = getApp(), r = require("../../../utils/util"), s = require("../../../components/error-msg/error-msg"), a = require("../../../components/address-picker/address-picker"), d = require("../../../utils/statistics"), o = require("../../../components/address-picker/address-data");

Page(r.mergePage({
    data: {
        addressInfo: {},
        id: null,
        showPicker: !0,
        provincesList: []
    },
    saveAddress: function(e) {
        wx.removeStorageSync("userNameEdit"), wx.removeStorageSync("mobileEdit");
        var s = e.detail.value, a = void 0;
        if (a = this.checkAddress(s)) return this.showErrorMsg(a);
        if ("" == s.username) return this.showErrorMsg("请输入收货人");
        if ("" == s.mobile) return this.showErrorMsg("请输入手机号码");
        if (!r.isMobile(s.mobile)) return this.showErrorMsg("手机格式错误，请重新填写");
        if ("" == s.province) return this.showErrorMsg("请选择省份");
        if ("" == s.city) return this.showErrorMsg("请选择城市");
        if ("" == s.town) {
            if (1 !== this.data.addressPicker.towns.length) return this.showErrorMsg("请选择所在区域");
            s.town = s.city, s.townId = "", s.cdcode = this.data.addressPicker.cityId;
        }
        if ("" == s.addr) return this.showErrorMsg("请输入详细地址");
        var d = this;
        r.post({
            url: t.globalData.URL_M + "xcxaddress/checkLocationAddress",
            method: "POST",
            data: {
                xcx_uid: wx.getStorageSync("uid"),
                xcx_sign: wx.getStorageSync("xcx_sign"),
                province: s.province,
                city: s.city,
                town: s.town
            },
            complete: function(e) {
                1e3 == e.data.code ? r.post({
                    url: t.globalData.URL_API_PREFIX + "mpaddress/update",
                    header: {
                        "Content-Type": "application/json"
                    },
                    data: s,
                    complete: function(e) {
                        var t = e.data, a = void 0 === t ? {} : t;
                        if (1e3 !== a.code) return d.showErrorMsg(a.msg || "保存失败");
                        wx.removeStorageSync("userName"), wx.removeStorageSync("telNumber"), wx.removeStorageSync("detailInfo"), 
                        wx.showToast({
                            title: "保存成功"
                        }), s.address_id || r.setCache("address_id", a.address_id), wx.navigateBack();
                    }
                }) : 1002 == e.data.code ? wx.showToast({
                    title: "请先登录",
                    icon: "success",
                    duration: 2e3
                }) : 1001 == e.data.code && (wx.showToast({
                    title: "地址获取成功,请确认省市区",
                    icon: "success",
                    duration: 2e3
                }), this.setData({
                    addressShow: !0
                }));
            }
        });
    },
    deleteAddress: function(e) {
        var s = this, a = {};
        a.address_id = this.data.id, r.post({
            url: t.globalData.URL_API_PREFIX + "mpaddress/delete",
            header: {
                "Content-Type": "application/json"
            },
            data: a,
            complete: function(e) {
                var t = e.data, r = void 0 === t ? {} : t;
                if (1e3 !== r.code) return s.showErrorMsg(r.msg || "删除失败");
                wx.showToast({
                    title: "删除成功"
                }), wx.navigateBack();
            }
        }), d.sendEventData(e.currentTarget.dataset);
    },
    showCachedAddress: function(e) {
        var t = wx.getStorageSync("addressList");
        if (t) {
            var r = t.filter(function(t) {
                return t.id == e;
            })[0];
            r && (this.setData({
                addressInfo: r,
                saveDisabled: !1
            }), this.setAddress(r));
        }
    },
    onLoad: function(e) {
        var s = this;
        this.data.provincesList = this.data.addressPicker.provinces, e.formWxAdLists && (wx.showModal({
            content: "遇到一点小问题，请重新选择省市区并保存。",
            showCancel: !1
        }), this.setData({
            addressInfo: {
                username: wx.getStorageSync("userName"),
                mobile: wx.getStorageSync("telNumber"),
                addr: wx.getStorageSync("detailInfo")
            }
        })), e.id && (this.showCachedAddress(e.id), r.post({
            url: t.globalData.URL_API_PREFIX + "mpaddress/get",
            data: {
                address_id: e.id
            },
            complete: function(t) {
                var r = t.data, a = void 0 === r ? {} : r;
                if (1e3 === a.code) {
                    var d = a.address;
                    s.setData({
                        id: e.id,
                        addressInfo: d,
                        saveDisabled: !1
                    }), s.setAddress(d);
                }
            }
        }));
    },
    chooseLocation: function(t) {
        var r = this;
        wx.getSetting({
            success: function(t) {
                1 != wx.getStorageSync("ifNotFirstAddress2") || t.authSetting["scope.userLocation"] ? wx.getLocation && (wx.setStorageSync("ifNotFirstAddress2", 1), 
                wx.chooseLocation && wx.chooseLocation({
                    success: function(t) {
                        function s(e, r, s) {
                            var a = (d = /^(.*?[市州]|.*?地区|.*?特别行政区)(.*?[市区县])(.*?)$/g).exec(e);
                            s ? r.ADDRESS = t.name : (r.REGION_CITY = a[1], r.REGION_COUNTRY = a[2], r.ADDRESS = a[3] + "(" + t.name + ")");
                        }
                        function a(e) {
                            var t = [], r = [];
                            for (var s in o) o[s][1] === e && (r.push(o[s][0]), t.push(s));
                            return [ t, r ];
                        }
                        var d = /^(北京市|天津市|重庆市|上海市|香港特别行政区|澳门特别行政区)/, i = [], n = {
                            REGION_PROVINCE: null,
                            REGION_CITY: null,
                            REGION_COUNTRY: null,
                            ADDRESS: null
                        };
                        (i = d.exec(t.address)) ? (n.REGION_PROVINCE = i[1], s(t.address, n)) : (d = /^(.*?(省|自治区))(.*?)$/).exec(t.address) ? (i = d.exec(t.address), 
                        n.REGION_PROVINCE = i[1], s(i[3], n)) : s(i = t.address, n, !0);
                        r.data.addressInfo;
                        r.setData({
                            "addressInfo.province": n.REGION_PROVINCE,
                            "addressInfo.city": n.REGION_CITY,
                            "addressInfo.town": n.REGION_COUNTRY,
                            "addressInfo.addr": n.ADDRESS
                        });
                        var c = n.REGION_PROVINCE;
                        for (var u in o) {
                            var l = "";
                            if (o[u][0] === c) {
                                for (var h = r.data.provincesList, f = 0; f < h.length; f++) h[f] == o[u][0] && (l = f);
                                r.setData({
                                    "addressPicker.provinceIdx": l,
                                    "addressPicker.provinceId": u,
                                    "addressPicker.province": o[u][0]
                                });
                                var g, w, v = a(u), I = e(v, 2);
                                g = I[0], w = I[1], r.setData({
                                    "addressPicker.cities": [ "选择城市" ].concat(w)
                                });
                                for (var p = 0; p < w.length; p++) {
                                    if (w[p] == n.REGION_CITY) {
                                        var x = g[p];
                                        r.setData({
                                            "addressPicker.cityIdx": p + 1,
                                            "addressPicker.cityId": x,
                                            "addressPicker.city": o[x][0]
                                        });
                                        var S, E, m = a(x), y = e(m, 2);
                                        S = y[0], E = y[1], r.setData({
                                            "addressPicker.towns": [ "选择所在区域" ].concat(E)
                                        });
                                        for (var R = 0; R < E.length; R++) if (E[R] == n.REGION_COUNTRY) {
                                            var _ = S[R];
                                            r.setData({
                                                "addressPicker.townIdx": R + 1,
                                                "addressPicker.townId": _,
                                                "addressPicker.town": o[_][0]
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    }
                })) : wx.showModal({
                    content: "卷皮需要获取您的地理位置才能进行此步操作。",
                    confirmText: "去授权",
                    success: function(e) {
                        e.confirm ? wx.openSetting({
                            success: function(e) {}
                        }) : e.cancel;
                    }
                });
            }
        });
        var s = t.currentTarget.dataset;
        d.sendEventData(s);
    },
    onShow: function() {
        d.sendPageData("page_address_add", this.data.address_id || "");
    },
    onReady: function() {
        this.data.id && wx.setNavigationBarTitle({
            title: "编辑收货地址"
        });
    }
}, a, s, d.pageEvents));