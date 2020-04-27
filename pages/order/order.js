// pages/order/order.js

let util = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0, //当前选项卡
    contentHeight: '', //内容窗口高度
    orderAll: [], //全部订单
    orderNoPay: [], //待支付订单
    orderNoRec: [], //待接单订单
    orderUnderway: [], //进行中订单
    orderComplete: [], //已完成订单
    orderCanceled: [] //已取消订单
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
    let that = this;
    let userId = wx.getStorageSync('userId'); //用户id

    if (userId) {
      wx.request({ //获取我的所有订单
        url: 'https://daizongpaotui.zlogic.cn/index.php/api/orders/getMyorders',
        method: 'POST',
        data: {
          token: userId
        },
        success: function (res) {
          let orderAll = res.data[0]; //全部订单
          let orderNoPay = res.data[1]; //待支付订单
          let orderNoRec = res.data[2]; //待接单订单
          let orderUnderway = res.data[3]; //进行中订单
          let orderComplete = res.data[4]; //已完成订单
          let orderCanceled = res.data[5]; //已取消订单

          orderAll.forEach(value => {
            let timestamp = value.create_time * 1000; //订单时间 时间戳
            let date = new Date(timestamp); //订单时间 时间对象
            let orderTime = util.formatTimeA(date); //订单时间
            value.create_time = orderTime;
          })
          orderNoPay.forEach(value => {
            let timestamp = value.create_time * 1000;
            let date = new Date(timestamp);
            let orderTime = util.formatTimeA(date);
            value.create_time = orderTime;
          })
          orderNoRec.forEach(value => {
            let timestamp = value.create_time * 1000;
            let date = new Date(timestamp);
            let orderTime = util.formatTimeA(date);
            value.create_time = orderTime;
          })
          orderUnderway.forEach(value => {
            let timestamp = value.create_time * 1000;
            let date = new Date(timestamp);
            let orderTime = util.formatTimeA(date);
            value.create_time = orderTime;
          })
          orderComplete.forEach(value => {
            let timestamp = value.create_time * 1000;
            let date = new Date(timestamp);
            let orderTime = util.formatTimeA(date);
            value.create_time = orderTime;
          })
          orderCanceled.forEach(value => {
            let timestamp = value.create_time * 1000;
            let date = new Date(timestamp);
            let orderTime = util.formatTimeA(date);
            value.create_time = orderTime;
          })

          that.setData({
            orderAll, //全部订单
            orderNoPay, //待支付订单
            orderNoRec, //待接单订单
            orderUnderway, //进行中订单
            orderComplete, //已完成订单
            orderCanceled //已取消订单
          })
        }
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        success() {
          wx.switchTab({
            url: '/pages/user/user'
          })
        }
      })
    }

    that.calcContentHeight(); //内容高度自适应
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
  calcContentHeight: function () { //内容高度自适应
    const that = this;

    wx.getSystemInfo({
      success: function (res) {
        let clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;

        let calc = clientHeight * rpxR - 80;

        console.log(calc);

        that.setData({
          contentHeight: calc
        });
      }
    });
  },
  swichNav: function (e) { //点击标题切换对应选项卡
    let cur = e.target.dataset.current;

    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur,
      })
    }
  },
  switchTab: function (e) { //滚动选项卡切换标题及内容
    this.setData({
      currentTab: e.detail.current,
    })
  }
})