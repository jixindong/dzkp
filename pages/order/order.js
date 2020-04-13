// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0, //当前选项卡
    contentHeight: '', //内容窗口高度
    orderAll:[
      {
        nameCode:1,
        statusCode:1,
        getCode:5001,
        address1:'北京同仁堂',
        address2:'人民大会堂',
        tel:'12345678910',
        time:'2020年4月13日09:42:10'
      },
      {
        nameCode:2,
        statusCode:2,
        getCode:5002,
        address1:'北京同仁堂',
        address2:'人民大会堂',
        tel:'12345678910',
        time:'2020年4月13日09:42:10'
      },
      {
        nameCode:3,
        statusCode:3,
        getCode:5003,
        address1:'北京同仁堂',
        address2:'人民大会堂',
        tel:'12345678910',
        time:'2020年4月13日09:42:10'
      },
      {
        nameCode:1,
        statusCode:4,
        getCode:5004,
        address1:'北京同仁堂',
        address2:'人民大会堂',
        tel:'12345678910',
        time:'2020年4月13日09:42:10'
      },
      {
        nameCode:1,
        statusCode:5,
        getCode:5005,
        address1:'北京同仁堂',
        address2:'人民大会堂',
        tel:'12345678910',
        time:'2020年4月13日09:42:10'
      }
    ],//全部订单
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    const that = this;

    that.calcContentHeight(); //内容高度自适应
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