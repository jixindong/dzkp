// pages/buy/buyFillAddressA.js

let key = 'OLLBZ-XNXKW-G43RM-OS4UB-LGRNO-QFFM4';
let referer = '代综快跑';
let location = JSON.stringify({
  latitude: 39.89631551,
  longitude: 116.323459711
});
let category = ''; //英文逗号区分关键词,最多支持3个 生活服务,娱乐休闲
let chooseLocation = requirePlugin('chooseLocation');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selfLongitude: '', //经度
    selfLatitude: '', //纬度 
    address: '', //地址名称
    region: '', //地区
    location: '', //经纬度
    detailAddr: '', //详细地址
    name: '', //姓名
    tel: '' //电话
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getSelfLocation(); //获取用户位置
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    let chooseAddress = chooseLocation.getLocation();

    if (chooseAddress) {
      that.setData({
        address: chooseAddress.name,
        region: chooseAddress.address,
        location: chooseAddress.latitude + ',' + chooseAddress.longitude
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  map: function () { //选择地址
    if (this.data.selfLatitude && this.data.selfLongitude) {
      location = JSON.stringify({
        latitude: this.data.selfLatitude,
        longitude: this.data.selfLongitude
      })
    }

    wx.navigateTo({
      url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location + '&category=' + category
    })
  },
  getDetailAddr: function (e) { //详细地址
    this.setData({
      detailAddr: e.detail.value
    })
  },
  // getName: function (e) { //姓名
  //   this.setData({
  //     name: e.detail.value
  //   })
  // },
  // getTel: function (e) { //电话
  //   this.setData({
  //     tel: e.detail.value
  //   })
  // },
  sure: function () { //确定
    let that = this;
    let address = that.data.address; //地址名称
    let region = that.data.region; //地区
    let location = that.data.location; //经纬度
    let detailAddr = that.data.detailAddr; //详细地址
    let name = that.data.name; //姓名
    let tel = that.data.tel; //电话
    let addrInfo = {
      addrSign: 'b1', //地址判断 b1=帮我买 购买地址,b2=帮我买 收货地址
      address: address,
      region: region,
      location: location,
      detailAddr: detailAddr,
      name: name,
      tel: tel
    }; //填写地址信息

    if (!address || !region || !detailAddr) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
    } else {
      wx.showToast({
        title: '添加地址成功',
        success() {
          wx.setStorageSync('addrInfo', addrInfo); //放入缓存 填写地址信息
          wx.navigateBack({
            url: '/pages/buy/buy',
            success() {
              console.log('填写地址信息', addrInfo);
            }
          })
        }
      });
    }
  },
  getSelfLocation: function () { //获取用户位置
    let that = this;
    //用户授权过可以直接获取位置
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        that.setData({
          selfLongitude: longitude, //经度
          selfLatitude: latitude, //纬度        
        });
      },
      fail: function () {
        setTimeout(function () {
          //需要用户授权获取位置
          wx.getSetting({
            success: (res) => {
              if (!res.authSetting['scope.userLocation']) {
                wx.openSetting({
                  success: () => {
                    wx.showModal({
                      title: '请重新授权',
                      content: '需要获取您的地址信息',
                      success: function () {
                        wx.getLocation({
                          success: function (res) {
                            var latitude = res.latitude;
                            var longitude = res.longitude;
                            that.setData({
                              selfLongitude: longitude, //经度
                              selfLatitude: latitude, //纬度        
                            });
                          }
                        })
                      }
                    });
                  }
                })
              }
            }
          })
        }, 1000);
      }
    });
  }
})