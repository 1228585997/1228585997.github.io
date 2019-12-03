Component({
    properties: {
        data: Array
    },
    data: {},
    methods: {
        catchmove: function() {},
        hide: function() {
            this.triggerEvent("hide");
        }
    }
});