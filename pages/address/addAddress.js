// pages/address/addAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: null,
    name: '', //姓名
    tel: '', //电话
    address: '', //地址名称
    region: '', //地区
    location: '', //经纬度
    detailAddr: '', //详细地址
    isDefault: false //是否默认地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    let userId = wx.getStorageSync('userId');
    let addrId = e.addrId; //新增地址判断 1=新增发货地址,2=新增收货地址

    if (addrId) {
      wx.setStorageSync('addrId', addrId); //放入缓存 新增地址判断
    }

    if (addrId == 1) {
      wx.setNavigationBarTitle({
        title: '新增发货地址'
      })
    } else {
      wx.setNavigationBarTitle({
        title: '新增收货地址'
      })
    }

    this.setData({
      userId
    })
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
    let chooseAddress = wx.getStorageSync('chooseAddress'); //已选择地址

    wx.removeStorageSync('chooseAddress'); //删除缓存 已选择地址
    if (chooseAddress) {
      let location = chooseAddress.location.lat + ',' + chooseAddress.location.lng; //经纬度

      that.setData({
        address: chooseAddress.title,
        region: chooseAddress.address,
        location
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
  getName: function (e) { //姓名
    console.log('姓名为', e.detail.value);
    this.setData({
      name: e.detail.value
    })
  },
  getTel: function (e) { //电话
    console.log('电话为', e.detail.value);
    this.setData({
      tel: e.detail.value
    })
  },
  getDetailAddr: function (e) { //详细地址
    console.log('详细地址为', e.detail.value);
    this.setData({
      detailAddr: e.detail.value
    })
  },
  defaultAddr: function (e) { //默认地址 复选框
    this.setData({
      isDefault: !this.data.isDefault
    });
    console.log('是否默认地址', this.data.isDefault);
  },
  saveAddr: function () { //保存地址
    let that = this;
    let userId = that.data.userId; //用户id
    let addrId = wx.getStorageSync('addrId'); //新增地址判断 1=新增发货地址,2=新增收货地址
    let name = that.data.name; //姓名
    let tel = that.data.tel; //电话
    let address = that.data.address; //地址名称
    let region = that.data.region; //地区
    let location = that.data.location; //经纬度
    let detailAddr = that.data.detailAddr; //详细地址
    let isDefault = that.data.isDefault == true ? '1' : '0'; //是否默认地址

    if (!name || !tel || region.length == 0 || !detailAddr) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
    } else {
      wx.request({
        url: 'https://daizongpaotui.zlogic.cn/index.php/api/address/index',
        method: 'POST',
        data: {
          name: name, //姓名
          tel: tel, //电话
          address: address,
          region: region, //地区
          location: location,
          detailAddr: detailAddr, //详细地址
          address_sign: addrId, //新增地址判断 1=新增发货地址,2=新增收货地址
          default: isDefault, //是否默认地址
          token: userId
        },
        success: function (res) {
          let code = res.data.code;

          if (code == 200) {
            wx.showToast({
              title: '添加地址成功',
              success() {
                wx.redirectTo({
                  url: '/pages/address/address',
                  success() {
                    wx.removeStorageSync('addrId'); //删除缓存 新增地址判断
                  }
                })
              }
            })
          } else {
            wx.showToast({
              title: '添加地址失败',
              icon: 'none'
            })
          }
        }
      })
    }
  }
})