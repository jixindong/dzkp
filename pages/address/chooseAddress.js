// pages/address/chooseAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addrSign: '', //地址判断 new=新增地址,fill=填写地址
    address: [], //搜索地址 结果
    timeout: null //搜索地址 延时器
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    let addrSign = e.addrSign; //地址判断

    this.setData({
      addrSign
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
  searchAddr: function (e) { //搜索框
    let that = this;
    let searchAddr = e.detail.value; //输入搜索地址

    if (searchAddr) {
      if (that.timeout) { //如果有延时器 清除延时器
        clearTimeout(this.timeout)
      }

      that.timeout = setTimeout(function () { //设置延时器 防抖
        wx.request({ //搜索地址
          url: 'https://daizongpaotui.zlogic.cn/index.php/api/selectaddress/search',
          method: 'POST',
          data: {
            keyword: searchAddr, //输入搜索地址
            cityName: '大连市' //城市
          },
          success: function (res) {
            let address = res.data.data; //搜索地址 结果

            that.setData({
              address
            })
          }
        })
      }, 500);
    }
  },
  chooseAddr: function (e) { //选择地址卡片
    let addrSign = this.data.addrSign; //地址判断
    let chooseAddress = {
      title: e.currentTarget.dataset.t,
      address: e.currentTarget.dataset.a,
      location: e.currentTarget.dataset.l
    } //已选择地址

    wx.setStorageSync('chooseAddress', chooseAddress); //放入缓存 已选择地址

    if (addrSign == 'new') { //跳转 新增地址
      wx.redirectTo({
        url: '/pages/address/addAddress'
      })
    } else if (addrSign == 'fill') { //跳转 填写地址
      wx.redirectTo({
        url: '/pages/address/fillAddress'
      })
    }
  }
})