var t = require("./consts"), e = t.apiDoJob, a = t.apiReceive;

(0, getApp().deps.patchComponent)(Component)({
    computed: {
        duration: {
            require: [ "departuretime", "backtime" ],
            fn: function(t) {
                var e = t.departuretime;
                return t.backtime - e;
            }
        }
    },
    watch: {
        isLogin: function() {
            var t = this.data.isLogin;
            t && this.goDoJob();
        },
        backtime: function() {
            var t = this, a = this.data, i = a.currentIndex, r = a.list, n = a.duration, s = r[i];
            if (s) {
                var o = s.wt_id, d = s.wt_type, u = s.wt_reward_type, c = s.wt_reward_step_num;
                1 == d && 1 == u ? n > 2e4 ? e({
                    tId: o,
                    status: 3
                }).then(function() {
                    t.$setData({
                        showModal: !0,
                        rewardSteps: c,
                        rewardSuccess: !0
                    });
                }) : this.$setData({
                    showModal: !0,
                    rewardSuccess: !1
                }) : 1 == d && 2 == u && (n > 2e4 ? this.data.isLogin ? this.goDoJob() : this.triggerEvent("login") : this.$setData({
                    showModal: !0,
                    rewardSuccess: !1
                }));
            }
        }
    },
    properties: {
        list: Array,
        backtime: {
            type: Number,
            value: 0
        },
        isLogin: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        currentIndex: null,
        departuretime: 0,
        showModal: !1,
        showHbModal: !1,
        money: null,
        rewardSuccess: !1,
        rewardSteps: 0,
        rewardType: 0
    },
    methods: {
        goDoJob: function() {
            var t = this, a = this.data, i = a.currentIndex, r = a.list[i];
            if (r) {
                var n = r.wt_id;
                e({
                    tId: n,
                    status: 3
                }).then(function() {
                    t.$setData({
                        showModal: !0,
                        rewardSuccess: !0
                    });
                });
            }
        },
        onClickConfirm: function() {
            this.$setData({
                currentIndex: null
            }), this.$setData({
                showModal: !1
            });
        },
        onClickLook: function() {
            this.onClickClose(), wx.navigateTo({
                url: "/pages/qiandao/record/index"
            });
        },
        onClickClose: function() {
            this.$setData({
                currentIndex: null
            }), this.$setData({
                showHbModal: !1
            });
        },
        onClickReceived: function() {
            var t = this, e = this.data, i = e.currentIndex, r = e.list[i];
            if (r) {
                var n = r.wt_id;
                a({
                    tId: n
                }).then(function(e) {
                    var a = e.money;
                    t.$setData({
                        showModal: !1,
                        money: a,
                        showHbModal: !0
                    });
                });
            }
        },
        onTapItem: function(t) {
            var a = t.currentTarget.dataset.index, i = this.data.list[a];
            if (i) {
                var r = i.wt_id, n = i.wt_app_id, s = i.wt_url, o = i.wt_reward_type;
                e({
                    tId: r,
                    status: 2
                });
                var d = this;
                wx.navigateToMiniProgram({
                    appId: n,
                    path: s,
                    success: function() {
                        d.$setData({
                            departuretime: Date.now(),
                            currentIndex: a,
                            rewardType: o
                        });
                    }
                });
            }
        }
    }
});