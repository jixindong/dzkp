// pages/address/addAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: null,
    addrId: null, //1=新增发货地址,2=新增收货地址
    name: '', //姓名
    tel: '', //电话
    region: [], //地区 picker
    detailAddr: '', //详细地址
    isDefault: false //是否默认地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    let userId = wx.getStorageSync('userId');
    let addrId = e.addrId; //1=新增发货地址,2=新增收货地址

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
      userId,
      addrId
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
  bindRegionChange: function (e) { //地区 picker
    console.log('地区为', e.detail.value);
    this.setData({
      region: e.detail.value
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
    let userId = that.data.userId;
    let addrId = that.data.addrId; //1=新增发货地址,2=新增收货地址
    let name = that.data.name; //姓名
    let tel = that.data.tel; //电话
    let region = that.data.region.toString(); //地区
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
          username: name, //姓名
          phone: tel, //电话
          address: region, //地区
          address_detail: detailAddr, //详细地址
          address_sign: addrId, //1=新增发货地址,2=新增收货地址
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
                  url: '/pages/address/address'
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