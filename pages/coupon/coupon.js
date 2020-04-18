// pages/coupon/coupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coupons: [{
        id: 1001,
        stattime: '2020.4.1',
        endtime: '2020.10.1',
        quota: '30',
        price: '5',
        tag: 1
      },
      {
        id: 1002,
        stattime: '2020.4.1',
        endtime: '2020.10.1',
        quota: '30',
        price: '5',
        tag: 1
      },
      {
        id: 1003,
        stattime: '2020.4.1',
        endtime: '2020.10.1',
        quota: '30',
        price: '5',
        tag: 1
      }
    ] //优惠券
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
  getCoupon: function (e) { //领取优惠券
    const index = e.currentTarget.dataset.index; //优惠券索引
    const cid = e.currentTarget.dataset.cid; //优惠券id
    const coupons = this.data.coupons; //优惠券

    coupons.forEach((value, index) => {
      value.tag = 1
    })

    coupons[index].tag = 0;

    this.setData({
      coupons
    })
    wx.setStorageSync('cid', cid);

    wx.showToast({
      title: '使用成功'
    })
  }
})