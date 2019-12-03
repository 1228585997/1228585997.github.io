module.exports = {
    uploadTap: function() {
        var t = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "compressed" ],
            success: function(a) {
                var e = a.tempFilePaths;
                wx.uploadFile({
                    url: "https://m.juanpi.com/xcxuserfeedback/upimg",
                    filePath: e[0],
                    name: "fileImage",
                    formData: {
                        xcx_uid: wx.getStorageSync("uid"),
                        xcx_sign: wx.getStorageSync("xcx_sign")
                    },
                    success: function(a) {
                        var s = JSON.parse(a.data), i = t.data.imgList, c = {};
                        c.lsrc = e[0], c.osrc = s.data.path[0], i.push(c), t.setData({
                            imgList: i
                        });
                    },
                    fail: function(t) {
                        wx.showModal({
                            title: "提示",
                            content: "图片上传失败，请稍后再试",
                            showCancel: !1
                        });
                    }
                });
            }
        });
    },
    delImageTap: function(t) {
        var a = t.currentTarget.dataset.index;
        this.data.imgList.splice(a, 1), this.setData({
            imgList: this.data.imgList
        });
    }
};