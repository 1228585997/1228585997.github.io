var t = require("../../utils/tools").request;

module.exports = {
    apiDoJob: function(a) {
        var e = a.tId, r = a.status;
        return t({
            data: {
                tId: e,
                status: r
            },
            url: "https://mapi.juanpi.com/Xcxact/dojob"
        });
    },
    apiReceive: function(a) {
        var e = a.tId;
        return t({
            data: {
                tId: e
            },
            url: "https://mapi.juanpi.com//Xcxact/getredpacket"
        });
    }
};