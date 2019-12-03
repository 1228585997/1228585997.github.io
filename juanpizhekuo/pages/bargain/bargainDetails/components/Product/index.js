Component({
    properties: {
        data: Object
    },
    methods: {
        onTapRule: function() {
            this.triggerEvent("display");
        }
    }
});