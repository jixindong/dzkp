// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0, //当前选项卡
    contentHeight: '', //内容窗口高度
    userId: null, //用户id
    sendAddress: [], //发货地址
    receiveAddress: [], //收货地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let userId = wx.getStorageSync('userId'); //用户id

    this.setData({
      userId
    })

    this.calcContentHeight(); //内容高度自适应
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
    let userId = that.data.userId; //用户id

    wx.request({ //获取 发货地址
      url: 'https://daizongpaotui.zlogic.cn/index.php/api/address/getDeliver',
      method: 'POST',
      data: {
        token: userId
      },
      success: function (res) {
        let sendAddress = res.data; //发货地址

        // 判断地址是否为常用地址
        if (sendAddress.length != 0) {
          sendAddress.forEach((value, index) => {
            if (value.default == 0) { //非常用地址
              value.checked = false
            } else { //常用地址
              value.checked = true
            }
          })
        }

        console.log('发货地址', sendAddress);

        that.setData({
          sendAddress //发货地址
        })
      }
    })
    wx.request({ //获取 收货地址
      url: 'https://daizongpaotui.zlogic.cn/index.php/api/address/getReceive',
      method: 'POST',
      data: {
        token: userId
      },
      success: function (res) {
        let receiveAddress = res.data; //收货地址

        // 判断地址是否为常用地址
        if (receiveAddress.length != 0) {
          receiveAddress.forEach((value, index) => {
            if (value.default == 0) { //非常用地址
              value.checked = false
            } else { //常用地址
              value.checked = true
            }
          })
        }

        console.log('收货地址', receiveAddress);

        that.setData({
          receiveAddress //收货地址
        })
      }
    })
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
  },
  sAddrRadioChange: function (e) { //发货地址 单选
    let userId = this.data.userId; //用户id
    let sendAddress = this.data.sendAddress; //发货地址
    let addressId = sendAddress[e.detail.value].id; //设置的默认发货地址 id

    // 修改 发货地址数组的 checked
    sendAddress.forEach((value, index) => {
      value.checked = false
    })
    sendAddress[e.detail.value].checked = true;
    this.setData({
      sendAddress
    })

    wx.request({ //设置 默认发货地址
      url: 'https://daizongpaotui.zlogic.cn/index.php/api/address/setDefault',
      method: 'POST',
      data: {
        token: userId, //用户id,
        type: 1, //1=发货地址
        addressid: addressId //设置的默认发货地址 id
      }
    })
  },
  delSendAddr: function (e) { //删除 发货地址
    let that = this;
    let sendAddress = this.data.sendAddress; //发货地址
    let index = e.currentTarget.dataset.index; //删除的发货地址 索引
    let addressId = sendAddress[index].id; //删除的发货地址 id

    wx.showModal({
      title: '删除发货地址',
      content: '您确认删除此发货地址吗？',
      cancelColor: '#1865F3',
      cancelText: '点错啦',
      confirmColor: '#999',
      confirmText: '删除地址',
      success(res) {
        if (res.confirm) {
          wx.showToast({
            title: '地址已删除'
          })

          wx.request({ //删除 发货地址
            url: 'https://daizongpaotui.zlogic.cn/index.php/api/address/delDefault',
            method: 'POST',
            data: {
              addressid: addressId //删除的发货地址 id
            },
            success: function () {
              //删除 发货地址数组中索引为 index 的地址
              sendAddress.splice(index, 1);
              that.setData({
                sendAddress
              })
            }
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
  rAddrRadioChange: function (e) { //收货地址 单选
    let userId = this.data.userId; //用户id
    let receiveAddress = this.data.receiveAddress; //收货地址
    let addressId = receiveAddress[e.detail.value].id; //设置的默认收货地址 id

    // 修改 收货地址数组的 checked
    receiveAddress.forEach((value, index) => {
      value.checked = false
    })
    receiveAddress[e.detail.value].checked = true;
    this.setData({
      receiveAddress
    })

    wx.request({ //设置 默认收货地址
      url: 'https://daizongpaotui.zlogic.cn/index.php/api/address/setDefault',
      method: 'POST',
      data: {
        token: userId, //用户id,
        type: 2, //2=收货地址
        addressid: addressId //设置的默认收货地址 id
      }
    })
  },
  delReceiveAddr: function (e) { //删除 收货地址
    let that = this;
    let receiveAddress = this.data.receiveAddress; //收货地址
    let index = e.currentTarget.dataset.index; //删除的收货地址 索引
    let addressId = receiveAddress[index].id; //删除的收货地址 id

    wx.showModal({
      title: '删除收货地址',
      content: '您确认删除此收货地址吗？',
      cancelColor: '#1865F3',
      cancelText: '点错啦',
      confirmColor: '#999',
      confirmText: '删除地址',
      success(res) {
        if (res.confirm) {
          wx.showToast({
            title: '地址已删除'
          })

          wx.request({ //删除 收货地址
            url: 'https://daizongpaotui.zlogic.cn/index.php/api/address/delDefault',
            method: 'POST',
            data: {
              addressid: addressId //删除的收货地址 id
            },
            success: function () {
              //删除 收货地址数组中索引为 index 的地址
              receiveAddress.splice(index, 1);
              that.setData({
                receiveAddress
              })
            }
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