// pages/coupon/coupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cSign: '', //b=帮我买,s=帮我送,f=帮我取,h=其他服务
    price: '', //跑腿费
    coupons: [] //优惠券
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    let cSign = e.cSign; //b=帮我买,s=帮我送,f=帮我取,h=其他服务
    let price = wx.getStorageSync('price'); //跑腿费
    this.setData({
      cSign,
      price
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
    let userId = wx.getStorageSync('userId'); //用户id

    if (!userId) { //未登录
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000,
        success() {
          wx.switchTab({
            url: '/pages/user/user'
          })
        }
      })
    } else {
      wx.request({ //获取个人优惠券
        url: 'https://daizongpaotui.zlogic.cn/index.php/api/youhui/index',
        method: "POST",
        data: {
          token: userId
        },
        success: function (res) {
          let coupons = Object.values(res.data);

          console.log('优惠券', coupons);

          that.setData({
            coupons
          })
        }
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
  getCoupon: function (e) { //领取优惠券
    let cSign = this.data.cSign; //b=帮我买,s=帮我送,f=帮我取,h=其他服务
    let price = this.data.price; //跑腿费
    let index = e.currentTarget.dataset.index; //优惠券索引
    let coupons = this.data.coupons; //优惠券
    let useCoupon = coupons[index]; //当前使用优惠券

    // 如果 从帮我买进入优惠券并且帮我买跑腿费大于等于当前使用优惠券额度 或 从帮我送进入优惠券并且帮我送跑腿费大于等于当前使用优惠券额度 或 从帮我取进入优惠券并且帮我取跑腿费大于等于当前使用优惠券额度 或 从其他服务进入优惠券并且其他服务跑腿费大于等于当前使用优惠券额度
    if ((cSign == 'b' && price.bPrice >= useCoupon.quota) || (cSign == 's' && price.sPrice >= useCoupon.quota) || (cSign == 'f' && price.fPrice >= useCoupon.quota) || (cSign == 'h' && price.hPrice >= useCoupon.quota)) {
      useCoupon.cSign = cSign;
      console.log('当前使用优惠券', useCoupon);

      coupons.forEach(value => {
        value.tag = 1
      })
      coupons[index].tag = 0;
      this.setData({
        coupons
      })

      wx.setStorageSync('useCoupon', useCoupon); //放入缓存 当前使用优惠券
      wx.showToast({
        title: '使用成功'
      })
    } else {
      wx.showToast({
        title: '订单金额不满足条件',
        icon: 'none'
      })
    }
  }
})