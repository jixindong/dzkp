// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null, //用户信息
    userId: null, //用户id
    tel: '', //用户手机号
    iTel: '', //用户输入手机号
    telBox: true, //验证手机号隐藏盒子
    verifyCode: '', //验证码
    status: 1, //发送验证码按钮状态 1=获取验证码,2=重新发送,3=倒计时
    timer: null, //定时器
    countTime: 120, //倒计时 秒数
    contactBox: true, //联系我们隐藏盒子
    contact: '' //联系我们
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
    this.getPhone(); //获取用户手机号
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
    let that = this;

    wx.setStorageSync('userInfo', e.detail.userInfo); //放入缓存 用户信息

    that.setData({
      userInfo: e.detail.userInfo
    })

    wx.login({
      success: function (res) {
        let code = res.code;
        console.log('code', code);

        wx.request({
          url: 'https://daizongpaotui.zlogic.cn/index.php/api/wxlogin/index',
          method: 'POST',
          data: {
            code: code,
            username: e.detail.userInfo.nickName,
            headimages: e.detail.userInfo.avatarUrl
          },
          success: function (res) {
            let userId = res.data;

            wx.setStorageSync('userId', userId); //放入缓存 userId
            that.setData({
              userId
            })
            that.getPhone(); //获取用户手机号
          }
        })
      }
    })
  },
  showTelBox: function () { //验证手机号按钮
    this.setData({
      telBox: !this.data.telBox //验证手机号隐藏盒子
    })
  },
  telkMask: function () { //验证手机号 mask
    this.setData({
      telBox: !this.data.telBox, //验证手机号隐藏盒子
      iTel: '', //用户输入手机号
      verifyCode: '' //验证码
    })
  },
  catchTouchMove: function () { //阻止屏幕滑动

  },
  iTel: function (e) { //输入 用户手机号
    this.setData({
      iTel: e.detail.value
    })
  },
  iVerifyCode: function (e) { //输入 验证码
    this.setData({
      verifyCode: e.detail.value
    })
  },
  countDown: function () { //倒计时
    let that = this;
    let countTime = that.data.countTime; //倒计时 秒数

    that.setData({
      status: 3, //发送验证码按钮状态
      timer: setInterval(() => {
        countTime--; //倒计时 秒数

        that.setData({
          countTime
        })

        if (countTime == 0) { //当倒计时为0时 清除定时器
          clearInterval(that.data.timer);

          that.setData({
            status: 2, //发送验证码按钮状态
            countTime: 120 //倒计时 秒数
          })
        }
      }, 1000) //定时器
    })
  },
  getVerifyCode: function () { //获取 验证码
    let userId = this.data.userId; //用户id
    let iTel = this.data.iTel; //用户输入手机号

    // 验证手机号
    if (!(/^1[3456789]\d{9}$/.test(iTel)) || iTel.length < 11) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
    } else {
      wx.request({ //获取 短信验证码
        url: 'https://daizongpaotui.zlogic.cn/index.php/api/sendmsg/index',
        method: 'POST',
        data: {
          token: userId, //用户id
          phone: iTel //用户输入手机号
        },
        success: function () {
          wx.showToast({
            title: '发送成功'
          })
        }
      })

      this.countDown(); //倒计时
    }
  },
  sure: function () { //确定按钮
    let that = this;
    let userId = that.data.userId; //用户id
    let iTel = this.data.iTel; //用户输入手机号
    let verifyCode = that.data.verifyCode; //验证码

    if (verifyCode) { //已输入 验证码
      wx.request({ //校验短信验证码
        url: 'https://daizongpaotui.zlogic.cn/api/sendmsg/checkCode',
        method: 'POST',
        data: {
          token: userId, //用户id
          phone: iTel, //用户输入手机号
          code: verifyCode //验证码
        },
        success: function (res) {
          let code = res.data.code; //200=成功

          if (code == 200) {
            wx.showToast({
              title: '手机号验证成功',
              success() {
                that.setData({
                  telBox: !that.data.telBox, //验证手机号隐藏盒子
                  tel: that.data.iTel, //用户手机号
                  iTel: '', //用户输入手机号
                  verifyCode: '' //验证码
                })
              }
            })
          } else if (code == 300) {
            wx.showToast({
              title: '请勿更改相同手机号',
              icon: 'none'
            })
          } else {
            wx.showToast({
              title: '验证码有误',
              icon: 'none'
            })
          }
        }
      })
    } else { //未输入 验证码
      wx.showToast({
        title: '请输入验证码',
        icon: 'none'
      })
    }
  },
  toAddress: function () { //跳转 地址管理
    let userInfo = this.data.userInfo;

    if (userInfo) {
      wx.navigateTo({
        url: '/pages/address/address'
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
  },
  getPhone: function () { //获取用户手机号
    let that = this;
    let userInfo = wx.getStorageSync('userInfo'); //用户信息
    let userId = wx.getStorageSync('userId'); //用户id

    if (userId) {
      wx.request({ //获取 用户手机号
        url: 'https://daizongpaotui.zlogic.cn/index.php/api/sendmsg/getphone',
        method: 'POST',
        data: {
          token: userId //用户id
        },
        success: function (res) {
          let tel = res.data; //用户手机号

          console.log('用户手机号', tel);

          that.setData({
            tel //用户手机号
          })
        }
      })

      that.setData({
        userInfo,
        userId
      })
    }
  },
  quit: function () { //退出登录
    let that = this;
    wx.showModal({
      cancelColor: '#1865F3',
      cancelText: '点错啦',
      confirmColor: '#999',
      confirmText: '残忍退出',
      title: '退出登录',
      content: '您确定退出登录吗？',
      success(res) {
        if (res.confirm) {
          wx.removeStorageSync('userInfo'); //清除缓存 用户信息
          wx.removeStorageSync('userId'); //清除缓存 用户id
          that.setData({
            userInfo: null,
            userId: null
          })
          wx.showToast({
            title: '成功退出'
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
  showContactBox: function () { //联系我们 按钮
    this.setData({
      contactBox: !this.data.contactBox
    })
  },
  contactMask: function () { //联系我们隐藏盒子 mask
    this.setData({
      contactBox: !this.data.contactBox
    })
  },
  inputContact: function (e) { //联系我们 输入框
    this.setData({
      contact: e.detail.value
    })
  },
  contact: function () { //联系我们
    let contact = this.data.contact; //联系我们

    if (contact) {
      wx.showToast({
        title: '感谢您的反馈'
      })
      this.setData({
        contactBox: !this.data.contactBox
      })
    } else {
      wx.showToast({
        title: '内容不能为空',
        icon: 'none'
      })
    }
  }
})