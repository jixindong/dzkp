// pages/address/fillAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: [], //地区 picker
    detailAddr: '', //详细地址
    name: '', //姓名
    tel: '' //电话
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

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
  smartFill: function (e) { //智能填写
    console.log('智能填写为', e.detail.value);
  },
  sure: function () { //确定
    const that = this;
    const name = that.data.name; //姓名
    const tel = that.data.tel; //电话
    const region = that.data.region; //地区
    const detailAddr = that.data.detailAddr; //详细地址

    if (!name || !tel || region.length == 0 || !detailAddr) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
    } else {
      wx.showToast({
        title: '添加地址成功'
      })
    }
  }
})