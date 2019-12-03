Component({
    properties: {
        money: {
            type: String,
            value: null
        }
    },
    methods: {
        onTapLookBtn: function() {
            this.triggerEvent("looked");
        },
        onTapCloseBtn: function() {
            this.triggerEvent("closed");
        }
    }
});