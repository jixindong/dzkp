// pages/order/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusCode: 1, //订单状态:1=待支付,2=待接单,3=进行中,4=已完成,5=已取消,6=已退单,7=已拒单
    getCode: 5001, //订单取件码
    orderNumber: '20200407123456789', //订单编号
    orderTime: '2020年4月13日16:28:56', //订单时间
    serve: '帮我取 | 水果生鲜/50~100元/1公斤', //服务内容
    orderImg: 'http://img5.imgtn.bdimg.com/it/u=2701377388,507364627&fm=26&gp=0.jpg', //订单照片
    price: '12元', //订单金额
    supportValue: '3元（保300）', //保价
    remark: '备注2333', //备注
    getImg: 'http://img1.imgtn.bdimg.com/it/u=4072095123,1934148536&fm=26&gp=0.jpg', //取件拍照
    horsemanTel: '12345678910', //骑手电话（订单进行、订单完成）
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
  copyNum: function () { //复制订单编号
    const that = this;

    wx.setClipboardData({
      data: that.data.orderNumber
    })
  },
  cancelOrder: function () { //取消订单
    const that = this;

    wx.showModal({
      title: '取消订单',
      content: '您确认取消订单吗？',
      cancelColor: '#999',
      cancelText: '点错啦',
      confirmColor: '#1865F3',
      confirmText: '取消订单',
      success(res) {
        if (res.confirm) {
          wx.showToast({
            title: '订单已取消'
          })

          that.setData({
            statusCode: 5
          })
        } else if (res.cancel) {
          wx.showToast({
            title: '操作已取消',
            icon: 'none'
          })
        }
      }
    })
  },
  telHorseman: function () { //联系骑手（订单进行、订单完成）
    const that = this;

    wx.showModal({
      title: '联系骑手',
      content: this.data.horsemanTel,
      cancelColor: '#999',
      cancelText: '点错啦',
      confirmColor: '#1865F3',
      confirmText: '拨打电话',
      success(res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: that.data.horsemanTel
          })
        } else if (res.cancel) {
          wx.showToast({
            title: '操作已取消',
            icon: 'none'
          })
        }
      }
    })
  }
})