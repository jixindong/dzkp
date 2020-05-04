// pages/buy/buy.js

let date = new Date(); // 选择时间
let currentHours = date.getHours(); // 选择时间
let currentMinute = date.getMinutes(); // 选择时间

Page({

  /**
   * 页面的初始数据
   */
  data: {
    buyAddrInfo: '', //购买地址 详情
    buyTakeAddrInfo: '', //收货地址 详情
    defaultAddrA: '', //默认地址A
    defaultAddrB: '', //默认地址B
    marketAddr: {
      address: '红星美凯龙金州商场-北1门',
      region: '辽宁省大连市金州区同济路',
      location: '39.099133,121.702724'
    }, //同济市场地址信息
    marketSelGoods: [], //已选商品
    marketDetail: '', //市场选购详情
    marketPrice: 0, //同济市场选购商品总价
    buyGoods: '', //填写购买商品
    goodWeight: '', //物品重量
    imgArr: [], //上传图片
    imgStr: '', //上传图片 字符串
    startDate: "立即购买", // 选择时间
    multiArray: [
      ['今天', '明天'],
      [0, 1],
      [0, 10]
    ], // 选择时间
    multiIndex: [0, 0, 0], // 选择时间
    discount: 0, //优惠券
    useCoupon: '', //当前使用优惠券
    feeIndex: 0, //小费 picker index
    fee: ['打赏小费', '1元', '2元', '3元', '4元', '5元'], //小费 picker
    feeNum: 0, //小费金额
    remarkBox: true, //备注隐藏盒子
    remark: '备注', //备注
    price: 0 //跑腿费
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let that = this;
    let userId = wx.getStorageSync('userId'); //用户id
    let marketSelGoods = wx.getStorageSync('marketSelGoods'); //已选商品
    let marketDetail = wx.getStorageSync('marketDetail'); //市场选购详情
    let marketPrice = wx.getStorageSync('marketPrice'); //同济市场选购商品总价
    let buyGoods = wx.getStorageSync('buyGoods'); //填写购买商品

    wx.request({ //获取首页信息
      url: 'https://daizongpaotui.zlogic.cn/index.php/api/shouye/index',
      method: 'POST',
      data: {
        token: userId
      },
      success: function (res) {
        let defaultAddrA = ''; //默认地址A
        let defaultAddrB = ''; //默认地址B

        if (res.data.code == 1001) { //用户已登录
          if (res.data.fahuo[0]) {
            defaultAddrA = res.data.fahuo[0]; //默认地址A
          }
          if (res.data.shouhuo[0]) {
            defaultAddrB = res.data.shouhuo[0]; //默认地址B
          }
        }

        that.setData({
          defaultAddrA, //默认地址A
          defaultAddrB, //默认地址B
          discount: res.data.num //优惠券
        })
      }
    })

    that.setData({
      marketSelGoods, //已选商品
      marketDetail, //市场选购详情
      marketPrice, //同济市场选购商品总价
      buyGoods //填写购买商品
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
    let addrInfo = wx.getStorageSync('addrInfo'); //填写地址信息
    let selectedWeight = wx.getStorageSync('selectedWeight'); //已选商品重量
    let useCoupon = wx.getStorageSync('useCoupon'); //当前使用优惠券

    that.setData({
      useCoupon //当前使用优惠券
    })

    if (selectedWeight) { //如果 已选商品重量 大于0 则赋值
      that.setData({
        goodWeight: selectedWeight
      })
    }


    if (addrInfo) {
      if (addrInfo.addrSign == 'b1') { //帮我买 购买地址
        that.setData({
          buyAddrInfo: addrInfo //购买地址 详情
        })
      } else if (addrInfo.addrSign == 'b2') { //帮我买 收货地址
        that.setData({
          buyTakeAddrInfo: addrInfo //收货地址 详情
        })
      }
      wx.removeStorageSync('addrInfo'); //删除缓存 填写地址信息

      that.addrCalc(that.data.buyAddrInfo, that.data.buyTakeAddrInfo); //通过经纬度计算价格
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
  addrCalc: function (addrA, addrB) { //通过经纬度计算价格
    let that = this;
    let price = that.data.price; //跑腿费
    let marketAddr = that.data.marketAddr; //同济市场地址信息
    // let marketDetail = that.data.marketDetail; //市场选购详情
    let goodWeight = that.data.goodWeight == 0 || '' ? 0 : parseFloat(that.data.goodWeight); //物品重量

    if (that.data.marketSelGoods.length != 0) { //如果 已选商品 存在（即有市场选购商品）
      addrA = marketAddr //将 同济市场地址信息 赋值给 计算价格经纬度A
    }

    if (addrA && addrB) {
      if (goodWeight <= 0) {
        wx.showToast({
          title: '请输入有效重量',
          icon: 'none'
        })
      } else {
        wx.request({
          url: 'https://daizongpaotui.zlogic.cn/index.php/api/selectaddress/calculate',
          method: 'POST',
          data: {
            from: addrA.location, //购买地址 经纬度
            to: addrB.location, //购买地址 经纬度
            weight: goodWeight
          },
          success: function (res) {
            console.log('通过经纬度计算价格', res.data);

            price = res.data;
            that.setData({
              price
            })
            // 因为 帮我买跑腿费 和 主页中跑腿费 格式不一致 所以重新定义一个对象放入缓存
            let priceB = {
              bPrice: price, //跑腿费 帮我买
              sPrice: 0, //跑腿费 帮我送
              fPrice: 0, //跑腿费 帮我取
              hPrice: 0 //跑腿费 其他服务
            }; //跑腿费
            wx.setStorageSync('price', priceB); //放入缓存 跑腿费
          }
        })
      }
    }
  },
  setDefaultAddrA: function () { //设置默认地址A
    let that = this;
    let userId = wx.getStorageSync('userId'); //用户id
    let defaultAddrA = that.data.defaultAddrA; //默认地址A
    let addrA = ''; //计算距离临时变量A
    let addrB = ''; //计算距离临时变量B

    if (userId) {
      if (defaultAddrA) {
        that.setData({
          buyAddrInfo: defaultAddrA
        })
        if (that.data.buyAddrInfo != '' && that.data.buyTakeAddrInfo != '') { //帮我买 收发地址完善
          addrA = that.data.buyAddrInfo; //计算距离临时变量A
          addrB = that.data.buyTakeAddrInfo; //计算距离临时变量B

          that.addrCalc(addrA, addrB); //通过经纬度计算价格
        }
        wx.showToast({
          title: '已使用默认地址'
        })
      } else {
        wx.showToast({
          title: '暂无默认地址',
          icon: 'none'
        })
      }
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
  },
  setDefaultAddrB: function () { //设置默认地址B
    let that = this;
    let userId = wx.getStorageSync('userId'); //用户id
    let defaultAddrB = that.data.defaultAddrB; //默认地址B
    let addrA = ''; //计算距离临时变量A
    let addrB = ''; //计算距离临时变量B

    if (userId) {
      if (defaultAddrB) {
        that.setData({
          buyTakeAddrInfo: defaultAddrB
        })
        // 如果 购买地址存在或已选商品不为空 并且 收货地址存在
        if ((that.data.buyAddrInfo != '' || that.data.marketSelGoods.length != 0) && that.data.buyTakeAddrInfo != '') { //帮我买 收发地址完善
          addrA = that.data.buyAddrInfo; //计算距离临时变量A
          addrB = that.data.buyTakeAddrInfo; //计算距离临时变量B

          that.addrCalc(addrA, addrB); //通过经纬度计算价格
        }
        wx.showToast({
          title: '已使用默认地址'
        })
      } else {
        wx.showToast({
          title: '暂无默认地址',
          icon: 'none'
        })
      }
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
  },
  buyGoods: function (e) { //填写购买商品
    this.setData({
      buyGoods: e.detail.value
    })
  },
  goodWeight: function (e) { //物品重量
    let that = this;

    this.setData({
      goodWeight: e.detail.value
    })
    that.addrCalc(that.data.buyAddrInfo, that.data.buyTakeAddrInfo); //通过经纬度计算价格
  },
  uploadImg: function () { //上传图片
    let that = this;
    let imgArr = that.data.imgArr;
    let imgStr = that.data.imgStr;

    wx.chooseImage({
      success(res) {
        let tempFilePaths = res.tempFilePaths;

        tempFilePaths.forEach(value => {
          wx.uploadFile({
            url: 'https://daizongpaotui.zlogic.cn/index.php/api/common/upload',
            filePath: value,
            name: 'file',
            success(res) {
              let imgUrl = JSON.parse(res.data);

              imgStr = imgStr + ',' + imgUrl.data.url;
              if (imgStr.substr(0, 1) == ',') {
                imgStr = imgStr.substr(1)
              }

              imgArr.push('https://daizongpaotui.zlogic.cn' + imgUrl.data.url);

              that.setData({
                imgStr,
                imgArr
              })
            }
          })
        })
      }
    })
  },
  delUpImg: function (e) { //删除已上传图片
    let imgArr = this.data.imgArr;
    let index = e.currentTarget.dataset.index;

    imgArr.splice(index, 1);

    this.setData({
      imgArr
    })
  },
  pickerTap: function () { // 选择时间
    date = new Date();

    var monthDay = ['今天', '明天'];
    var hours = [];
    var minute = [];

    currentHours = date.getHours();
    currentMinute = date.getMinutes();

    // 月-日
    for (var i = 2; i <= 5; i++) {
      var time = new Date(date);
      time.setDate(date.getDate() + i);
      var md = (time.getMonth() + 1) + "-" + time.getDate();
      monthDay.push(md);
    }

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };

    if (data.multiIndex[0] === 0) {
      if (data.multiIndex[1] === 0) {
        this.loadData(hours, minute);
      } else {
        this.loadMinute(hours, minute);
      }
    } else {
      this.loadHoursMinute(hours, minute);
    }

    data.multiArray[0] = monthDay;
    data.multiArray[1] = hours;
    data.multiArray[2] = minute;

    this.setData(data);
  },
  bindMultiPickerColumnChange: function (e) { // 选择时间
    date = new Date();

    var that = this;

    var monthDay = ['今天', '明天'];
    var hours = [];
    var minute = [];

    currentHours = date.getHours();
    currentMinute = date.getMinutes();

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    // 把选择的对应值赋值给 multiIndex
    data.multiIndex[e.detail.column] = e.detail.value;

    // 然后再判断当前改变的是哪一列,如果是第1列改变
    if (e.detail.column === 0) {
      // 如果第一列滚动到第一行
      if (e.detail.value === 0) {

        that.loadData(hours, minute);

      } else {
        that.loadHoursMinute(hours, minute);
      }

      data.multiIndex[1] = 0;
      data.multiIndex[2] = 0;

      // 如果是第2列改变
    } else if (e.detail.column === 1) {

      // 如果第一列为今天
      if (data.multiIndex[0] === 0) {
        if (e.detail.value === 0) {
          that.loadData(hours, minute);
        } else {
          that.loadMinute(hours, minute);
        }
        // 第一列不为今天
      } else {
        that.loadHoursMinute(hours, minute);
      }
      data.multiIndex[2] = 0;

      // 如果是第3列改变
    } else {
      // 如果第一列为'今天'
      if (data.multiIndex[0] === 0) {

        // 如果第一列为 '今天'并且第二列为当前时间
        if (data.multiIndex[1] === 0) {
          that.loadData(hours, minute);
        } else {
          that.loadMinute(hours, minute);
        }
      } else {
        that.loadHoursMinute(hours, minute);
      }
    }
    data.multiArray[1] = hours;
    data.multiArray[2] = minute;
    this.setData(data);
  },
  loadData: function (hours, minute) { // 选择时间
    var minuteIndex;
    if (currentMinute > 0 && currentMinute <= 10) {
      minuteIndex = 10;
    } else if (currentMinute > 10 && currentMinute <= 20) {
      minuteIndex = 20;
    } else if (currentMinute > 20 && currentMinute <= 30) {
      minuteIndex = 30;
    } else if (currentMinute > 30 && currentMinute <= 40) {
      minuteIndex = 40;
    } else if (currentMinute > 40 && currentMinute <= 50) {
      minuteIndex = 50;
    } else {
      minuteIndex = 60;
    }

    if (minuteIndex == 60) {
      // 时
      for (var i = currentHours + 1; i < 24; i++) {
        hours.push(i + '时');
      }
      // 分
      for (var i = 0; i < 60; i += 10) {
        minute.push(i + '分');
      }
    } else {
      // 时
      for (var i = currentHours; i < 24; i++) {
        hours.push(i + '时');
      }
      // 分
      for (var i = minuteIndex; i < 60; i += 10) {
        minute.push(i + '分');
      }
    }
  },
  loadHoursMinute: function (hours, minute) { // 选择时间
    // 时
    for (var i = 0; i < 24; i++) {
      hours.push(i + '时');
    }
    // 分
    for (var i = 0; i < 60; i += 10) {
      minute.push(i + '分');
    }
  },
  loadMinute: function (hours, minute) { // 选择时间
    var minuteIndex;
    if (currentMinute > 0 && currentMinute <= 10) {
      minuteIndex = 10;
    } else if (currentMinute > 10 && currentMinute <= 20) {
      minuteIndex = 20;
    } else if (currentMinute > 20 && currentMinute <= 30) {
      minuteIndex = 30;
    } else if (currentMinute > 30 && currentMinute <= 40) {
      minuteIndex = 40;
    } else if (currentMinute > 40 && currentMinute <= 50) {
      minuteIndex = 50;
    } else {
      minuteIndex = 60;
    }

    if (minuteIndex == 60) {
      // 时
      for (var i = currentHours + 1; i < 24; i++) {
        hours.push(i + '时');
      }
    } else {
      // 时
      for (var i = currentHours; i < 24; i++) {
        hours.push(i + '时');
      }
    }
    // 分
    for (var i = 0; i < 60; i += 10) {
      minute.push(i + '分');
    }
  },
  bindStartMultiPickerChange: function (e) { // 选择时间
    var that = this;
    var currentTab = that.data.currentTab; //当前选项卡
    var monthDay = that.data.multiArray[0][e.detail.value[0]];
    var hours = that.data.multiArray[1][e.detail.value[1]];
    var minute = that.data.multiArray[2][e.detail.value[2]];

    if (monthDay === "今天") {
      var month = date.getMonth() + 1;
      var day = date.getDate();
      monthDay = month + "月" + day + "日";
    } else if (monthDay === "明天") {
      var time = new Date(date);
      time.setDate(date.getDate() + 1);
      monthDay = (time.getMonth() + 1) + "月" + time.getDate() + "日";

    } else {
      var month = monthDay.split("-")[0]; // 返回月
      var day = monthDay.split("-")[1]; // 返回日
      monthDay = month + "月" + day + "日";
    }

    var startDate = monthDay + " " + hours + minute;
    console.log('时间', startDate);
    that.setData({
      startDate: startDate
    })
  },
  feeChange: function (e) { //小费 picker
    let feeIndex = e.detail.value;
    let feeNum = this.data.fee[feeIndex] == '打赏小费' ? 0 : parseInt(this.data.fee[feeIndex]); //小费金额

    this.setData({
      feeIndex,
      feeNum
    })
  },
  showRemarkBox: function () { //备注按钮
    this.setData({
      remarkBox: !this.data.remarkBox
    })
  },
  remarkMask: function () { //备注隐藏盒子 mask
    this.setData({
      remarkBox: !this.data.remarkBox
    })
  },
  inputRemark: function (e) { //备注输入框
    this.setData({
      remark: e.detail.value
    })
  },
  returnRemark: function () { //返回备注
    this.setData({
      remarkBox: !this.data.remarkBox
    })
  },
  catchTouchMove: function () { //阻止屏幕滑动

  },
  bPlaceOrder: function () { //下单
    let that = this;
    let userId = wx.getStorageSync('userId'); //用户id
    let buyAddrInfo = that.data.buyAddrInfo; //购买地址 详情
    let buyTakeAddrInfo = that.data.buyTakeAddrInfo; //收货地址 详情
    let marketAddr = that.data.marketAddr; //同济市场地址信息
    let marketSelGoods = wx.getStorageSync('marketSelGoods'); //已选商品
    let marketPrice = that.data.marketPrice; //同济市场选购商品总价
    let buyGoods = that.data.buyGoods; //填写购买商品
    let goodWeight = that.data.goodWeight == '' || 0 ? 0 : parseFloat(that.data.goodWeight); //物品重量
    let buyTime = that.data.startDate; //购买时间
    let feeNum = that.data.feeNum; //小费金额
    let bPrice = that.data.price; //跑腿费 帮我买
    let price = 0; //跑腿费
    let remark = that.data.remark; //备注

    // 地址信息 经纬度 格式
    if (buyAddrInfo) {
      buyAddrInfo.site = buyAddrInfo.location;
    }
    if (buyTakeAddrInfo) {
      buyTakeAddrInfo.site = buyTakeAddrInfo.location;
    }

    if (that.data.marketSelGoods.length != 0) { //如果 已选商品 不为空
      buyAddrInfo = marketAddr //将 同济市场地址信息 赋值给 购买地址
    }

    // 计算跑腿费
    marketPrice = marketPrice == '' ? '0' : marketPrice;
    if (marketPrice >= 0) {
      bPrice = bPrice / 2;
    }
    price = bPrice + parseFloat(marketPrice) + parseInt(feeNum);

    if (userId) {
      //如果 购买地址不存在并且已选商品为空 或 收货地址不存在
      if ((buyAddrInfo == '' && that.data.marketSelGoods.length == 0) || buyTakeAddrInfo == '') {
        wx.showToast({
          title: '请完善地址信息',
          icon: 'none'
        })
      } else if (that.data.marketSelGoods.length == 0 && buyGoods == '') {
        wx.showToast({
          title: '请选择或填写购买物品',
          icon: 'none'
        })
      } else if (goodWeight == 0 || goodWeight == '') {
        wx.showToast({
          title: '请输入有效重量',
          icon: 'none'
        })
      } else {
        wx.request({
          url: 'https://daizongpaotui.zlogic.cn/index.php/api/orders/shop',
          method: 'POST',
          data: {
            yuyue: buyTime
          },
          success: function (res) {
            if (res.data.code == 2001) {
              wx.showLoading({
                title: '请稍后'
              })

              wx.request({ //下订单
                url: 'https://daizongpaotui.zlogic.cn/index.php/api/orders/placeOrder',
                method: 'POST',
                data: {
                  token: userId, //用户id
                  orderType: 3, //订单类型 1=帮我送,2=帮我取,3=帮我买,4=其他服务
                  from: buyAddrInfo.address, //购买地址
                  from_jw: buyAddrInfo.site, //购买地址 经纬度
                  fahuoren: buyAddrInfo.name, //购买地址 联系人
                  fahuophone: buyAddrInfo.tel, //购买地址 电话
                  to: buyTakeAddrInfo.address, //收货地址
                  to_jw: buyTakeAddrInfo.site, //收货地址 经纬度
                  shouhuoren: buyTakeAddrInfo.name, //收货地址 联系人
                  shouhuophone: buyTakeAddrInfo.tel, //收货地址 电话
                  goods: JSON.stringify(marketSelGoods), //已选商品
                  detail: buyGoods, //填写购买商品
                  photoimages: that.data.sImgStr, //上传图片 字符串
                  fahuo: buyTime, //购买时间
                  tip: feeNum, //小费金额
                  price: price, //跑腿费
                  paotuifei: bPrice,
                  shangpin: parseFloat(marketPrice),
                  remark: remark, //备注
                  insured_price: '', //保价
                  weight: goodWeight //物品重量
                },
                success: function (res) {
                  console.log(res)

                  if (res.data.code == 200) {
                    let oId = res.data.orderID //订单id
                    wx.hideLoading({
                      complete: () => {
                        wx.navigateTo({
                          url: '/pages/order/orderDetail?oId=' + oId
                        })
                      }
                    })
                  } else {
                    wx.showToast({
                      title: '下单失败',
                      icon: 'none'
                    })
                  }
                }
              })
            } else {
              wx.showToast({
                title: '本店打烊啦',
                icon: 'none'
              })
            }
          }
        })
      }
    } else {
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
    }
  },
  delMarketSel: function () { //清空同济市场选购商品
    wx.removeStorageSync('marketSelGoods'); //清除缓存 已选商品
    wx.removeStorageSync('marketDetail'); //清除缓存 已选商品字符串
    wx.removeStorageSync('selectedWeight'); //清除缓存 已选商品重量
    wx.removeStorageSync('marketPrice'); //清除缓存 同济市场选购商品总价

    this.setData({
      marketSelGoods: [], //已选商品
      marketDetail: '', //市场选购详情
      marketPrice: 0, //同济市场选购商品总价
      goodWeight: '', //物品重量
      price: 0 //跑腿费
    })
    wx.showToast({
      title: '商品已清空'
    })
  }
})