var a = getApp(), t = require("../../../utils/util"), e = require("../../../utils/statistics"), o = require("../../../components/error-msg/error-msg"), r = require("../../../components/jp-pay/index"), n = require("../../../components/toast/toast");

Page(t.mergePage({
    data: {
        buyMemCardParamNum: -1,
        cardList: [],
        avatar: "",
        username: "",
        defaultIndex: "",
        goodsInfo: ""
    },
    onLoad: function(a) {
        e.sendZhugePageData("进入开卡结算页", {});
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        a.checkLogin() ? (wx.showLoading && wx.showLoading({
            title: "加载中"
        }), t.getPayData()) : a.goLogin();
    },
    changeMember: function(a) {
        this.setData({
            defaultIndex: a.currentTarget.dataset.index,
            goodsInfo: a.currentTarget.dataset.goodinfo
        });
    },
    openMember: function() {
        var t = this, e = this;
        wx.showToast({
            title: "提交中...",
            icon: "loading",
            duration: 1e4
        });
        var o = a.getPublicArg(), r = {
            page_from: 3,
            request_time: new Date().getTime() + 1e3 * a.globalData.TIME_DIFF,
            goods_info: this.data.goodsInfo,
            buyMemCardParam: this.data.buyMemCardParamNum
        };
        (r = Object.assign({}, r, o)).apisign = a.createApisign(r), wx.request({
            url: a.globalData.URL_MTRADE + "settle/check",
            data: r,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            complete: function(a) {
                wx.hideToast(), a.data.data.msg_code > 1 ? t.showErrorMsg(a.data.data.msg) : e.gopost();
            }
        });
    },
    pay: function(a, t) {
        wx.requestPayment(Object.assign({
            timeStamp: "",
            nonceStr: "",
            package: "",
            signType: "MD5",
            paySign: "",
            success: function(a) {
                getCurrentPages();
                wx.navigateBack({
                    delta: 1
                });
            },
            fail: function() {
                getCurrentPages();
                wx.navigateBack({
                    delta: 1
                });
            }
        }, a));
    },
    gopost: function() {
        var t = this, o = a.getPublicArg();
        o.content = '{"type":"7"}', o.wxcode = wx.getStorageSync("openid"), o.username = wx.getStorageSync("wxname") || wx.getStorageSync("uname"), 
        o.pay_type = 109, o.goods_info = this.data.goodsInfo, (o = Object.assign({}, o, {
            buyMemCardParam: this.data.buyMemCardParamNum
        })).apisign = a.createApisign(o), wx.request({
            url: a.globalData.URL_MTRADE + "settle/create",
            data: o,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            complete: function(a) {
                var o = a.data;
                return wx.hideToast(), 1e3 != o.code ? t.showErrorMsg(o.info || o.msg || "error") : o.data.pay ? (e.sendEventData({
                    activity: "click_temai_conpage_gotopay",
                    activityparam: o.data.order_no,
                    zhugeActivity: o.data.zg_event,
                    zhugeActivityparam: o.data.zg_json
                }), void t.pay(o.data.pay, o.data.order_no)) : t.showErrorMsg("缺少支付参数！");
            }
        });
    },
    getPayData: function() {
        var t = this, e = a.getPublicArg();
        (e = Object.assign({}, e, {
            buyMemCardParam: this.data.buyMemCardParamNum,
            content: '{ "type": "7" }'
        })).apisign = a.createApisign(e), wx.request({
            url: a.globalData.URL_MTRADE + "settle/info",
            data: e,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            complete: function(a) {
                wx.hideLoading && wx.hideLoading();
                var e = a.data;
                e && e.code && 1e3 == e.code && t.setData({
                    cardList: e.data.cardList,
                    avatar: e.data.user.avatar,
                    username: e.data.user.username,
                    isVipuser: e.data.user.isVipUser
                });
                for (var o = 0; o < t.data.cardList.length; o++) "1" == t.data.cardList[o].default && t.setData({
                    goodsInfo: t.data.cardList[o].goods_info
                });
            }
        });
    }
}, o, r, n, e.pageEvents));