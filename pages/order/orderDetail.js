// pages/order/orderDetail.js

let util = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    oId: null, //订单id
    orderType: null, //订单类型 1=帮我送,2=帮我取,3=帮我买,4=其他服务
    statusCode: null, //订单状态:1=待支付,2=待接单,3=进行中,4=已完成,5=已取消,6=已退单,7=已拒单
    getCode: null, //订单取件码
    orderNumber: '', //订单编号
    orderTime: '', //订单时间
    serve: '', //服务内容
    // orderImg: 'http://img5.imgtn.bdimg.com/it/u=2701377388,507364627&fm=26&gp=0.jpg', //订单照片
    price: '', //订单金额
    payForFlag:0,//是否支付 骑手垫付
    payForNum:'',//骑手垫付编号
    payFor: 0, //骑手垫付金额
    supportValue: '', //保价
    remark: '', //备注
    getImg: '', //取件拍照
    horsemanTel: '', //骑手电话（订单进行、订单完成）
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    let that = this;
    let oId = e.oId;//订单id

    wx.request({
      url: 'https://daizongpaotui.zlogic.cn/index.php/api/orders/seeOrder',
      method: 'POST',
      data: {
        orderId: oId
      },
      success: function (res) {
        let timestamp = res.data.create_time * 1000; //订单时间 时间戳
        let date = new Date(timestamp); //订单时间 时间对象
        let orderTime = util.formatTimeA(date); //订单时间

        console.log(res)

        that.setData({
          orderType: res.data.order_type, //订单类型
          statusCode: res.data.state, //订单状态
          getCode: res.data.receipt_code, //订单取件码
          orderNumber: res.data.order_num, //订单编号
          orderTime, //订单时间
          price: res.data.price + '元', //订单金额
          supportValue: res.data.insured_price == '' || null ? '不保价' : res.data.insured_price, //保价
          remark: res.data.remark == null ? '' : res.data.remark, //备注
          getImg: 'https://daizongpaotui.zlogic.cn' + res.data.ticketimages, //取件拍照
          horsemanTel: res.data.qishouphone, //骑手电话
          payForFlag:res.data.status,//是否支付 骑手垫付
          payForNum:res.data.pay_other,//骑手垫付编号
          payFor: res.data.yonghu_pay //骑手垫付金额
        })
      }
    })

    that.setData({
      oId
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
  copyNum: function () { //复制订单编号
    wx.setClipboardData({
      data: this.data.orderNumber
    })
  },
  cancelOrderA: function () { //取消订单 待支付
    let that = this;

    wx.showModal({
      title: '取消订单',
      content: '您确认取消订单吗？',
      cancelColor: '#1865F3',
      cancelText: '点错啦',
      confirmColor: '#999',
      confirmText: '取消订单',
      success(res) {
        if (res.confirm) {

          wx.request({ //取消订单 待支付
            url: 'https://daizongpaotui.zlogic.cn/index.php/api/orders/cancelOrder',
            method: 'POST',
            data: {
              id: that.data.oId
            },
            success: function (res) {
              console.log(res)

              if (res.data.code == 200) {
                wx.showToast({
                  title: '订单已取消'
                })

                that.setData({
                  statusCode: 5 //订单状态 已取消
                })
              } else {
                wx.showToast({
                  title: '订单取消失败',
                  icon: 'none'
                })
              }
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
  cancelOrderB: function () { //取消订单 退款
    let that = this;

    wx.showModal({
      title: '取消订单',
      content: '您确认取消订单吗？',
      cancelColor: '#1865F3',
      cancelText: '点错啦',
      confirmColor: '#999',
      confirmText: '取消订单',
      success(res) {
        if (res.confirm) {
          wx.request({ //取消订单 退款
            url: 'https://daizongpaotui.zlogic.cn/index.php/api/orders/refund',
            method: 'POST',
            data: {
              orderId: that.data.oId
            },
            success: function (res) {
              console.log(res)

              if (res.data.code == 200) {
                wx.showToast({
                  title: '订单已退款'
                })

                that.setData({
                  statusCode: 5 //订单状态 已取消
                })
              } else {
                wx.showToast({
                  title: '订单退款失败',
                  icon: 'none'
                })
              }
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
  paymentA: function () { //立即支付 跑腿费
    let that = this;
    let userId = wx.getStorageSync('userId'); //用户id
    let orderType = that.data.orderType; //订单类型 1=帮我送,2=帮我取,3=帮我买,4=其他服务
    let orderNumber = that.data.orderNumber; //订单编号
    let price = that.data.price.slice(0, that.data.price.length - 1); //订单金额

    if (orderType == 3) { //帮我买
      wx.request({ //发起微信支付
        url: 'https://daizongpaotui.zlogic.cn/index.php/api/orders/payProduct',
        method: 'POST',
        data: {
          token: userId,
          orderNumber: orderNumber,
          total: price
        },
        success: function (res) {
          console.log(res)

          wx.requestPayment({
            nonceStr: res.data.nonceStr,
            package: res.data.package,
            paySign: res.data.paySign,
            timeStamp: res.data.timeStamp,
            signType: res.data.signType,
            success: (res) => {
              wx.showToast({
                title: '支付成功'
              })

              that.setData({
                statusCode: 2 //订单状态 待接单
              })
            }
          })
        }
      })
    } else { //帮我送、帮我取、其他服务
      wx.request({ //发起微信支付
        url: 'https://daizongpaotui.zlogic.cn/index.php/api/orders/pay',
        method: 'POST',
        data: {
          token: userId,
          orderNumber: orderNumber,
          total: price
        },
        success: function (res) {
          // console.log(res)

          wx.requestPayment({
            nonceStr: res.data.nonceStr,
            package: res.data.package,
            paySign: res.data.paySign,
            timeStamp: res.data.timeStamp,
            signType: res.data.signType,
            success: () => {
              wx.showToast({
                title: '支付成功'
              })

              that.setData({
                statusCode: 2 //订单状态 待接单
              })
            }
          })
        }
      })
    }
  },
  paymentB: function () { //立即支付 骑手垫付金额
    let that = this;
    let userId = wx.getStorageSync('userId'); //用户id
    let payForNum = that.data.payForNum; //骑手垫付编号
    let payFor = that.data.payFor; //骑手垫付金额

    wx.request({
      url: 'https://daizongpaotui.zlogic.cn/index.php/api/orders/pay_other',
      method: 'POST',
      data: {
        token: userId,
        pay_other: payForNum,
        total: payFor
      },
      success: function (res) {
        // console.log(res)

        wx.requestPayment({
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          paySign: res.data.paySign,
          timeStamp: res.data.timeStamp,
          signType: res.data.signType,
          success: () => {
            wx.showToast({
              title: '支付成功'
            })

            that.setData({
              payForFlag:1//是否支付 骑手垫付
            })
          }
        })
      }
    })
  },
  telHorseman: function () { //联系骑手（订单进行、订单完成）
    let that = this;

    wx.showModal({
      title: '联系骑手',
      content: that.data.horsemanTel,
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
  },
  complete: function () { //签收订单
    let that = this;

    wx.showModal({
      title: '签收订单',
      content: '您确认签收订单吗？',
      cancelColor: '#999',
      cancelText: '点错啦',
      confirmColor: '#1865F3',
      confirmText: '确认签收',
      success(res) {
        if (res.confirm) {
          wx.request({ //签收订单
            url: 'https://daizongpaotui.zlogic.cn/index.php/api/orders/confirm_receipt',
            method: 'POST',
            data: {
              orderid: that.data.oId
            },
            success: function (res) {
              if (res.data.code == 200) {
                wx.showToast({
                  title: '签收成功'
                })
                that.setData({
                  statusCode:4//订单状态 已完成
                })
              } else {
                wx.showToast({
                  title: '签收失败',
                  icon: 'none'
                })
              }
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