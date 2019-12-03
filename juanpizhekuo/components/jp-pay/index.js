var a = require("../../utils/util"), t = getApp();

module.exports = {
    onLoad: function() {},
    closeKeyboard: function() {
        a.maskDownAnimation(this, "showKeyboard");
    },
    showKeyboard: function(t) {
        a.maskUpAnimation(this, "showKeyboard");
    },
    getWallet: function(e, l) {
        wx.request({
            url: t.globalData.URL_M + "xcxwallet/ajaxGetInfo?pf=1",
            data: {
                xcx_uid: wx.getStorageSync("uid"),
                xcx_sign: wx.getStorageSync("xcx_sign")
            },
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                var n = t.data;
                0 == (n = n.data).is_set_pwd || 1 == n.is_blacklist || 1 == n.is_locked ? (n.canpay = "0.00", 
                n.needpay = l.pay_amount, n.wallet_amount = "0.00") : 0 == parseFloat(n.balance) ? (n.canpay = "0.00", 
                n.needpay = l.pay_amount, n.wallet_amount = "0.00") : parseFloat(n.balance) >= parseFloat(l.pay_amount) ? (n.canpay = l.pay_amount, 
                n.needpay = "0.00", n.wallet_amount = l.pay_amount) : parseFloat(n.balance) < parseFloat(l.pay_amount) && (n.canpay = n.balance, 
                n.needpay = a.accSub(l.pay_amount, n.balance), n.wallet_amount = n.balance), n.wallet_pwd = "", 
                "function" == typeof e && e(n);
            },
            fail: function() {
                this.setData({
                    wallet: {
                        canpay: "0.00",
                        needpay: l.pay_amount,
                        wallet_amount: "0.00",
                        is_set_pwd: 0,
                        wallet_pwd: ""
                    }
                });
            }
        });
    },
    walletChange: function(t) {
        t.detail.value ? this.setData({
            "wallet.needpay": a.accSub(this.data.money.pay_amount, this.data.wallet.canpay),
            "wallet.wallet_amount": this.data.wallet.canpay
        }) : this.setData({
            "wallet.needpay": this.data.money.pay_amount,
            "wallet.wallet_amount": "0.00"
        });
    },
    payItemTap: function(t) {
        if (1 == t.currentTarget.dataset.issel) {
            if (this.data.wallet.canpay <= 0) return;
            parseFloat(this.data.wallet.balance) >= parseFloat(this.data.money.pay_amount) && this.setData({
                "wallet.needpay": "0.00",
                "wallet.wallet_amount": this.data.money.pay_amount
            });
        } else parseFloat(this.data.wallet.balance) >= parseFloat(this.data.money.pay_amount) ? this.setData({
            "wallet.needpay": this.data.money.pay_amount,
            "wallet.wallet_amount": "0.00"
        }) : this.setData({
            "wallet.needpay": a.accSub(this.data.money.pay_amount, this.data.wallet.balance),
            "wallet.wallet_amount": this.data.wallet.balance
        });
    },
    useWallet: function(a) {
        this.data.wallet.wallet_amount > 0 ? this.showKeyboard(a) : a();
    },
    keyboardItemTap: function(a) {
        var t = a.currentTarget.dataset.value, e = this.data.wallet.wallet_pwd.length;
        "empty" != t && ("del" == t ? e > 0 && this.setData({
            "wallet.wallet_pwd": this.data.wallet.wallet_pwd.substring(0, e - 1)
        }) : this.setData({
            "wallet.wallet_pwd": this.data.wallet.wallet_pwd + t
        }), 6 == this.data.wallet.wallet_pwd.length && callback());
    }
};