// pages/address/fillAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addrSign: '', //地址判断 b1=帮我买 购买地址,b2=帮我买 收货地址,s1=帮我送 发货地址,s2=帮我送 收货地址,f1=帮我取 取货地址,f2=帮我取 收货地址,d1=其他服务 地址
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
  onLoad: function (e) {
    let addrSign = e.addrSign; //地址判断
    let title = ''; //填写地址页面标题

    if (addrSign == 'b1') {
      title = '帮我买 购买地址'
    } else if (addrSign == 'b2') {
      title = '帮我买 收货地址'
    } else if (addrSign == 's1') {
      title = '帮我送 发货地址'
    } else if (addrSign == 's2') {
      title = '帮我送 收货地址'
    } else if (addrSign == 'f1') {
      title = '帮我取 取货地址'
    } else if (addrSign == 'f2') {
      title = '帮我取 收货地址'
    } else if (addrSign == 'd1') {
      title = '其他服务 地址'
    }

    if (addrSign && title) {
      wx.setStorageSync('addrSign', addrSign); //放入缓存 地址判断
      wx.setStorageSync('fillAddressTitle', title); //放入缓存 填写地址页面标题
    }
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
    let addrSign = wx.getStorageSync('addrSign'); //地址判断
    let title = wx.getStorageSync('fillAddressTitle'); //填写地址页面标题
    let chooseAddress = wx.getStorageSync('chooseAddress'); //已选择地址

    wx.removeStorageSync('chooseAddress'); //删除缓存 已选择地址
    if (chooseAddress) {
      that.setData({
        address: chooseAddress.title,
        region: chooseAddress.address,
        location: chooseAddress.location
      })
    }

    // 设置填写地址页面标题
    wx.setNavigationBarTitle({
      title: title
    })

    that.setData({
      addrSign //地址判断
    })
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
  getDetailAddr: function (e) { //详细地址
    this.setData({
      detailAddr: e.detail.value
    })
  },
  getName: function (e) { //姓名
    this.setData({
      name: e.detail.value
    })
  },
  getTel: function (e) { //电话
    this.setData({
      tel: e.detail.value
    })
  },
  smartFill: function (e) { //智能填写
  },
  sure: function () { //确定
    let that = this;
    let addrSign = that.data.addrSign; //地址判断
    let address = that.data.address; //地址名称
    let region = that.data.region; //地区
    let location = that.data.location; //经纬度
    let detailAddr = that.data.detailAddr; //详细地址
    let name = that.data.name; //姓名
    let tel = that.data.tel; //电话
    let addrInfo = {
      addrSign: addrSign,
      address: address,
      region: region,
      location: location,
      detailAddr: detailAddr,
      name: name,
      tel: tel
    }; //填写地址信息

    if (!address || !region || !detailAddr || !name || !tel) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
    } else {
      wx.showToast({
        title: '添加地址成功',
        success() {
          wx.setStorageSync('addrInfo', addrInfo); //放入缓存 填写地址信息
          wx.switchTab({
            url: '/pages/index/index',
            success() {
              wx.removeStorageSync('addrSign'); //删除缓存 地址判断
              wx.removeStorageSync('fillAddressTitle'); //删除缓存 填写地址页面标题

              console.log('填写地址信息', addrInfo);
            }
          })
        }
      })
    }
  }
})