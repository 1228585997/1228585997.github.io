var e = function(e) {
    return "//jp.juancdn.com/xcx_images/apps/walkmoney/components/TaskList/components/ExperienceModal/images/" + e + ".png";
};

(0, getApp().deps.patchComponent)(Component)({
    computed: {
        bgImage: {
            require: [ "success" ],
            fn: function(n) {
                var s = n.success;
                return e(s ? "experienced" : "unexperienced");
            }
        }
    },
    properties: {
        steps: {
            type: null,
            value: 0
        },
        success: {
            type: Boolean,
            value: !1
        }
    },
    methods: {
        onTapConfirmBtn: function() {
            this.triggerEvent("confirmed");
        }
    }
});