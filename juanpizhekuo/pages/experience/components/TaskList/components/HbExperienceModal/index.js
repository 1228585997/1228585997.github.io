var e = function(e) {
    return "//jp.juancdn.com/xcx_images/dasabi/" + e + ".png";
};

(0, getApp().deps.patchComponent)(Component)({
    computed: {
        bgImage: {
            require: [ "success" ],
            fn: function(n) {
                var t = n.success;
                return e(t ? "experienced" : "unexperienced");
            }
        }
    },
    properties: {
        success: {
            type: Boolean,
            value: !1
        }
    },
    methods: {
        onTapConfirmBtn: function() {
            this.triggerEvent("confirmed");
        },
        onTapReceive: function() {
            this.triggerEvent("received");
        }
    }
});