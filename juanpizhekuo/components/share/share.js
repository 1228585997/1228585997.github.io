var e = require("../../utils/util"), a = require("../../utils/api"), t = require("../../utils/statistics"), i = require("../../components/login-modal/index"), o = {}, n = {}, s = getApp();

module.exports = e.mergePage({
    goVipTab: function(e) {
        wx.navigateTo({
            url: "/pages/vip/index2/index"
        });
        var a = e.currentTarget.dataset;
        t.sendEventData(a);
    },
    showShare: function(e) {
        var i = e.currentTarget.dataset, r = this;
        if (o = {}, this.setData({
            vipInfo: !1,
            goodsInfo: !1,
            actInfo: !1,
            shareReady: !1,
            shareImgSrc: ""
        }), o = i, s.checkLogin()) {
            if (wx.showLoading(), n = {
                avatarUrl: wx.getStorageSync("avatarUrl"),
                nickname: wx.getStorageSync("nickName")
            }, o.goodsid) o.scene = "st=sp&id=" + o.goodsid, Promise.all([ a.getGoodsDetail(s, o.goodsid), a.getGoodsSkuInfo(s, o.goodsid) ]).then(function(e) {
                var a = {};
                if (e[0].info && (a = {
                    images: e[0].info.images[0],
                    price: e[0].info.cprice,
                    fan_price: e[0].info.fan_price,
                    tag: e[0].info.tag_list[0].text,
                    title: e[0].info.short_title,
                    goodsid: o.goodsid
                }).images) {
                    var t = a.images.split(".");
                    t[0] = "https://goods2", a.images = t.join("."), t = a.images.split("?"), a.images = t[0] + "?imageMogr2/thumbnail/536x536!/quality/70!/format/jpg";
                }
                e[1].info && (a.joinNumber = e[1].info.join_number), r.setData({
                    goodsInfo: a,
                    showShareModal: !0
                }), wx.hideLoading();
            }).catch(function(e) {
                console.log("showShare goods error", e), r.catchErr();
            }); else if (o.actname) {
                "shareBox" == o.actname ? o.scene = "st=hd&name=box" : "shareMoney618" == o.actname ? o.scene = "st=hd&name=fu" : "shareMoney" == o.actname && (o.scene = "st=hd&name=sm");
                var c = {
                    images: o.shareimg,
                    name: o.actname
                };
                r.setData({
                    actInfo: c,
                    clickEvent: o.actname,
                    showShareModal: !0
                }), wx.hideLoading();
            } else {
                o.scene = "st=vip";
                r.setData({
                    vipInfo: {
                        images: "https://goods2.juancdn.com/seller/180626/b/8/5b31efeb33b08931994741af_600x796.png?imageMogr2/quality/70!/format/jpg"
                    },
                    clickEvent: "vip",
                    showShareModal: !0
                }), wx.hideLoading();
            }
            r.setData({
                isVip: wx.getStorageSync("vipStatus") > 0
            }), t.sendEventData({
                activity: "click_show_share",
                activityparam: o.actname || o.path || o.goodsid
            });
        } else this.showLoginModal();
    },
    hideShare: function() {
        var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
        this.setData({
            showShareModal: !1
        }), e && (o = {});
    },
    closeImgModal: function() {
        this.setData({
            showShareImgModal: !1
        });
    },
    createShareImg: function() {
        wx.showLoading({
            title: "图片生成中..."
        }), this.hideShare(!1), o.goodsid ? this.beforeDraw(this.data.goodsInfo) : o.actname ? this.beforeDraw(this.data.actInfo) : this.beforeDraw(this.data.vipInfo);
    },
    downloadFile: function(e) {
        return new Promise(function(a, t) {
            wx.downloadFile({
                url: e,
                success: function(e) {
                    200 === e.statusCode ? a(e.tempFilePath) : t(!1);
                },
                fail: function(e) {
                    t(!1);
                }
            });
        });
    },
    beforeDraw: function(e) {
        var t = [];
        if (t.push(this.downloadFile(e.images)), o.scene ? o.scene += "&code=" + wx.getStorageSync("myInviteCode") || "" : o.scene = "code=" + wx.getStorageSync("myInviteCode") || "", 
        t.push(a.getwxacode(s, o.scene, o.width || 168)), t.push(this.downloadFile(n.avatarUrl)), 
        o.goodsid) {
            t.push(this.downloadFile("https://jp.juancdn.com/wxMapp/share/icons-jp-logo.png"));
        }
        this.setData({
            showCanvas: !0,
            showShareImgModal: !0
        });
        var i = this;
        Promise.all(t).then(function(a) {
            return e.images = a[0], e.codeUrl = a[1].path, n.avatarUrl = a[2], o.goodsid && (e.titleImage = a[3]), 
            i.downloadFile(e.codeUrl);
        }).then(function(a) {
            return e.codeUrl = a, i.drawCode(a);
        }).then(function(a) {
            return a && (e.codeUrl = a), i.drawAvatar();
        }).then(function() {
            i.drawImg(e);
        }).catch(function(e) {
            console.log("beforeDraw error", e), i.catchErr();
        });
    },
    catchErr: function() {
        this.setData({
            showCanvas: !1
        }), wx.hideLoading(), wx.showToast({
            icon: "none",
            title: "系统繁忙，请稍后再试"
        });
    },
    drawImg: function(e) {
        var a = this, t = wx.createCanvasContext("myCanvas"), i = 600, n = 912;
        o.goodsid ? (t.setFillStyle("white"), t.fillRect(0, 0, i, n), this.drawGoods(t, e)) : o.actname ? ("shareMoney" == o.actname && (n = 514, 
        this.drawShareMoney(t, e)), "shareMoney618" == o.actname && (i = 600, n = 750, this.drawShareMoney618(t, e)), 
        "shareBox" == o.actname && (i = 750, n = 600, this.drawShareBox(t, e))) : (n = 796, 
        this.drawVip(t, e)), t.draw(!0, setTimeout(function() {
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: i,
                height: n,
                destWidth: i,
                destHeight: n,
                canvasId: "myCanvas",
                success: function(e) {
                    a.setData({
                        shareImgSrc: e.tempFilePath,
                        showShareImgModal: !0,
                        showCanvas: !1
                    }), wx.hideLoading();
                },
                fail: function(e) {
                    console.log("ctx.draw", e), a.catchErr();
                }
            });
        }, 200));
    },
    drawAvatar: function() {
        return new Promise(function(e, a) {
            var t = wx.createCanvasContext("avatar");
            t.save(), t.beginPath(), t.arc(80, 80, 80, 0, 2 * Math.PI, !1), t.clip(), t.drawImage(n.avatarUrl, 0, 0, 160, 160), 
            t.restore(), t.draw(!0, setTimeout(function() {
                wx.canvasToTempFilePath({
                    x: 0,
                    y: 0,
                    width: 160,
                    height: 160,
                    destWidth: 160,
                    destHeight: 160,
                    canvasId: "avatar",
                    success: function(a) {
                        n.avatarUrl = a.tempFilePath, e();
                    },
                    fail: function(a) {
                        console.log("drawAvatar err", a), e();
                    }
                });
            }, 200));
        });
    },
    drawCode: function(e) {
        return new Promise(function(a, t) {
            var i = wx.createCanvasContext("code");
            i.save(), i.beginPath(), i.arc(84, 84, 84, 0, 2 * Math.PI, !1), i.clip(), i.drawImage(e, 0, 0, 168, 168), 
            i.restore(), i.draw(!0, setTimeout(function() {
                wx.canvasToTempFilePath({
                    x: 0,
                    y: 0,
                    width: 168,
                    height: 168,
                    destWidth: 168,
                    destHeight: 168,
                    canvasId: "code",
                    success: function(e) {
                        a(e.tempFilePath);
                    },
                    fail: function(e) {
                        console.log("drawCode err", e), a(!1);
                    }
                });
            }, 200));
        });
    },
    drawShareMoney: function(e, a) {
        e.drawImage(a.images, 0, 0, 600, 514), e.drawImage(n.avatarUrl, 197, 432, 40, 40), 
        e.setFontSize(20), e.setFillStyle("#FFF"), e.fillText("来自" + n.nickname + "的分享", 247, 459), 
        e.drawImage(a.codeUrl, 350, 225, 168, 168);
    },
    drawShareMoney618: function(e, a) {
        e.drawImage(a.images, 0, 0, 600, 750), e.drawImage(n.avatarUrl, 50, 640, 65, 65), 
        e.setFontSize(24), e.setFillStyle("#FFF"), e.fillText("来自" + n.nickname + "的分享", 130, 675), 
        e.drawImage(a.codeUrl, 385, 480, 168, 168);
    },
    drawShareBox: function(e, a) {
        e.drawImage(a.images, 0, 0, 750, 600), e.drawImage(a.codeUrl, 225, 276, 300, 300);
    },
    drawVip: function(e, a) {
        e.drawImage(a.images, 0, 0, 600, 796), e.drawImage(n.avatarUrl, 32, 723, 40, 40), 
        e.setFontSize(20), e.setFillStyle("#666666"), e.fillText("来自" + n.nickname + "的分享", 87, 750), 
        e.drawImage(a.codeUrl, 380, 535, 168, 168), e.setFontSize(20), e.setFillStyle("#666666"), 
        e.fillText("长按二维码购买", 395, 750);
    },
    drawGoods: function(e, a) {
        e.drawImage(a.titleImage, 187, 40, 226, 60), e.drawImage(a.images, 32, 121, 536, 536);
        e.setFontSize(30), e.setFillStyle("#333333");
        var t = function(e, a, t) {
            for (var i = 0, o = "", n = "", s = 0; s < e.length; s++) e.charCodeAt(s) > 128 ? i += 2 : i++, 
            i > a && i <= t ? n += e.charAt(s) : i <= a && (o += e.charAt(s));
            return [ o, n ];
        }(a.title, 20, 38);
        e.fillText(t[0], 32, 700), t[1] && e.fillText(t[1] + "...", 32, 740), e.setFontSize(24), 
        e.setFillStyle("#ff464e"), e.fillText("￥", 32, 767), e.setFontSize(40), e.setFillStyle("#ff464e"), 
        e.fillText(a.price, 54, 767);
        var i = 20 * a.price.length + 32 + 22, o = 10 * function(e) {
            for (var a = e.length, t = 0, i = 0; i < a; i++) 0 != (65280 & e.charCodeAt(i)) && t++, 
            t++;
            return t;
        }(a.tag);
        e.setFillStyle("#ff464e"), e.fillRect(i + 15, 740, o + 10, 28), e.setFontSize(20), 
        e.setFillStyle("#FFF"), e.fillText(a.tag, i + 20, 761), e.setFontSize(20), e.setFillStyle("#999999"), 
        e.fillText(a.joinNumber, i + o + 40, 763), e.drawImage(n.avatarUrl, 32, 853, 40, 40), 
        e.setFontSize(20), e.setFillStyle("#666666"), e.fillText("来自" + n.nickname + "的分享", 87, 880), 
        e.drawImage(a.codeUrl, 380, 675, 168, 168), e.setFontSize(20), e.setFillStyle("#666666"), 
        e.fillText("长按二维码购买", 395, 880);
    },
    saveimg: function() {
        var e = this;
        wx.saveImageToPhotosAlbum({
            filePath: e.data.shareImgSrc,
            success: function(t) {
                wx.showToast({
                    icon: "none",
                    title: "海报已保存至系统相册"
                }), e.setData({
                    showShareImgModal: !1
                }), o.actname && ("shareBox" == o.actname && (e.hideHelp(), e.hideReceive()), "shareMoney" == o.actname && a.act88Share(s).catch(function(e) {}));
            },
            fail: function(a) {
                console.log("saveimg fail", a), "saveImageToPhotosAlbum:fail auth deny" == a.errMsg && e.checkSetting(e.saveimg);
            }
        });
    },
    checkSetting: function(e) {
        wx.getSetting({
            success: function(a) {
                a.authSetting["scope.writePhotosAlbum"] ? e() : wx.openSetting({
                    success: function(a) {
                        a.authSetting["scope.writePhotosAlbum"] && e();
                    }
                });
            },
            fail: function(e) {
                console.log("checkSetting fail", e);
            }
        });
    },
    buttonShare: function(e) {
        return s.setShare(e.title, e.path, null, e.img);
    }
}, i);