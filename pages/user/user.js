// pages/user/user.js
const app = getApp(); //获取应用实例

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false, //是否登录
    userInfo: {}, //用户信息
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  getUserInfo: function (e) { //微信授权
    const that = this;

    app.globalData.userInfo = e.detail.userInfo;
    wx.setStorageSync('userInfo', e.detail.userInfo);

    that.setData({
      isLogin: true, //是否登录
      userInfo: e.detail.userInfo
    })

    // wx.login({
    //   success: function(res) {
    //     var code = res.code
    //     console.log(code)
    //     wx.request({
    //       url: 'https://fangzhi.zlogic.cn/api/main/getuserinfo',
    //       method: 'post',
    //       data: {
    //         code,
    //         nickname: that.data.userInfo.nickName,
    //         gender: that.data.userInfo.gender,
    //         country: that.data.userInfo.country,
    //         province: that.data.userInfo.province,
    //         city: that.data.userInfo.city
    //       },
    //       success: function(res) {
    //         var userId = res.data.userid
    //         wx.setStorageSync('userid', userId)
    //       }
    //     })
    //   }
    // })
  }
})