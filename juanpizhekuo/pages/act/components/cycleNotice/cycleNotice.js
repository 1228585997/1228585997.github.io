getApp(), require("../../../../utils/util");

module.exports = {
    initCycleNotice: function(e, r) {
        e.textArr.map(function(e) {
            switch (e.type) {
              case "2":
                return e.xcxUrl = "/pages/brand/brand?brand_id=0&shop_id=" + e.id;

              case "1":
                return e.xcxUrl = "/pages/shop/shop?id=" + e.id;

              case "3":
                return e.xcxUrl = "/pages/store/store?store_id=" + e.id;

              case "0":
                return e.xcxUrl = e.xcxUrl;

              case "4":
                return e.xcxUrl = "/pages/index/index";
            }
        });
    }
};