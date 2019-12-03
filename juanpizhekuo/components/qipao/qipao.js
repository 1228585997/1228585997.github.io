getApp();

var e = {
    getBroadcast: function(e) {
        var t = this;
        wx.request({
            url: e,
            data: {},
            header: {
                "Content-Type": "application/json"
            },
            success: function(e) {
                var a = e.data, n = void 0 === a ? {} : a, s = t;
                if (1e3 == n.code) {
                    var i = n.data, o = i.list || i.prizePeople, r = 0;
                    i.amount && s.setData({
                        totalNumber: i.amount
                    }), setInterval(function() {
                        o && r < o.length ? (s.setData({
                            username: o[r].nickName || o[r].name,
                            money: o[r].money || o[r].msg,
                            list: o
                        }), r++) : r = 0;
                    }, 4e3), setTimeout(function() {
                        setInterval(function() {
                            s.setData({
                                ishidden: !s.data.ishidden
                            });
                        }, 2e3);
                    }, 2e3);
                }
            }
        });
    }
};

module.exports = e;