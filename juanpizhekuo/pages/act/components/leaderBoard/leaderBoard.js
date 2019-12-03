var e = getApp();

require("../../../../utils/util");

module.exports = {
    initLeaderBoard: function(e, t) {
        console.log(e);
        var a = this;
        return e.img.src = a.getImageUrl(e.img.src), a.getLeaderBoardList(t, e.type), e;
    },
    getLeaderBoardList: function(t, a) {
        var r = this;
        wx.request({
            url: "" + e.globalData.URL_MACT + t + "-biUserPayTop?cate=" + a + "&num=20",
            method: "GET",
            success: function(e) {
                console.log(e), 1e3 == e.data.code && r.setData({
                    leaderBoardList: e.data.data
                });
            },
            complete: function() {
                r.setData({
                    ready: !0
                }), wx.hideLoading && wx.hideLoading();
            }
        });
    }
};