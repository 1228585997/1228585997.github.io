getApp();

var p = require("../../../utils/util.js"), e = require("../../../utils/statistics"), a = require("../../../components/error-msg/error-msg");

Page(p.mergePage({
    data: {
        images: [ "http://jp.juancdn.com/jpwebapp/images/dmqc/promise/1.png", "http://jp.juancdn.com/jpwebapp/images/dmqc/promise/2.png", "http://jp.juancdn.com/jpwebapp/images/dmqc/promise/3.png", "http://jp.juancdn.com/jpwebapp/images/dmqc/promise/4.png", "http://jp.juancdn.com/jpwebapp/images/dmqc/promise/5.png", "http://jp.juancdn.com/jpwebapp/images/dmqc/promise/6.png", "http://jp.juancdn.com/jpwebapp/images/dmqc/promise/7.png", "http://jp.juancdn.com/jpwebapp/images/dmqc/promise/8.png", "http://jp.juancdn.com/jpwebapp/images/dmqc/promise/9.png", "http://jp.juancdn.com/jpwebapp/images/dmqc/promise/10.png", "http://jp.juancdn.com/jpwebapp/images/dmqc/promise/11.png" ]
    },
    onLoad: function() {},
    onShow: function() {
        e.sendPageData("page_authentic_guarantee", "");
    }
}, a, e.pageEvents, p));