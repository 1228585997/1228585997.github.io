var e = require("../../consts").imageRefs;

Component({
    computed: {
        boxStyle: {
            require: [ "type" ],
            fn: function(t) {
                return "background-image:url(" + (5 === t.type ? e.treasure_box : e.success_bg) + ");";
            }
        },
        closeImage: function() {
            return e.close_btn;
        },
        moneyShown: {
            require: [ "money" ],
            fn: function(e) {
                return e.money;
            }
        },
        bodyStyleType: {
            require: [ "type" ],
            fn: function(e) {
                var t = e.type;
                return 0 === t || 1 === t ? 0 : 2 === t || 3 === t || 4 === t ? 1 : 5 === t ? 2 : void 0;
            }
        }
    },
    properties: {
        type: {
            type: Number,
            value: -1
        },
        money: {
            type: Number,
            value: 2
        }
    },
    data: {
        imageRefs: e
    },
    methods: {
        onTapClose: function() {
            this.triggerEvent("close", {
                type: this.data.type
            });
        },
        onTapBtn: function() {
            this.triggerEvent("clickbtn", {
                type: this.data.type
            }), console.log("tap button");
        }
    }
});