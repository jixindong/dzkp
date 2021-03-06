//index.js

let date = new Date(); // 选择时间
let currentHours = date.getHours(); // 选择时间
let currentMinute = date.getMinutes(); // 选择时间

Page({

  /**
   * 页面的初始数据
   */
  data: {
    topSwiper: [], //顶部轮播图
    currentTab: 0, //当前选项卡 0=帮我买,1=帮我送,2=帮我取,4=其他服务
    height: '', //当前选项卡高度
    startDate: "立即购买", // 选择时间
    multiArray: [
      ['今天', '明天'],
      [0, 1],
      [0, 10]
    ], // 选择时间
    multiIndex: [0, 0, 0], // 选择时间
    useCoupon: '', //当前使用优惠券
    feeIndex: 0, //小费 picker index
    fee: ['打赏小费', '1元', '2元', '3元', '4元', '5元'], //小费 picker
    feeNum: 0, //小费金额
    price: {
      bPrice: 0, //跑腿费 帮我买
      sPrice: 0, //跑腿费 帮我送
      fPrice: 0, //跑腿费 帮我取
      hPrice: 0 //跑腿费 其他服务
    }, //跑腿费
    choiceInfoBox: true, //选择物品信息隐藏盒子
    imgArr: [], //上传图片
    imgStr: '', //上传图片 字符串
    remarkBox: true, //备注隐藏盒子
    remark: '备注', //备注
    discount: 0, //优惠券
    goodItems: [{
        value: '食品',
        checked: false
      },
      {
        value: '文件',
        checked: false
      },
      {
        value: '水果',
        checked: false
      },
      {
        value: '服饰',
        checked: false
      },
      {
        value: '数码',
        checked: false
      },
      {
        value: '其他',
        checked: false
      },
    ], //物品类型（帮我送、帮我取）
    valueItems: [{
        value: '50元以下',
        checked: false
      },
      {
        value: '50~100元',
        checked: false
      },
      {
        value: '100~500元',
        checked: false
      },
      {
        value: '500~1000元',
        checked: false
      },
      {
        value: '1000~5000元',
        checked: false
      },
      {
        value: '5000元以上',
        checked: false
      }
    ], //物品价值（帮我送、帮我取）
    guardItems: [{
        value: '0元（不投保）',
        num: 0,
        checked: false
      },
      {
        value: '1元（保100）',
        num: 1,
        checked: false
      },
      {
        value: '2元（保200）',
        num: 2,
        checked: false
      },
      {
        value: '3元（保300）',
        num: 3,
        checked: false
      },
      {
        value: '5元（保500）',
        num: 5,
        checked: false
      },
      {
        value: '10元（保1000）',
        num: 10,
        checked: false
      }
    ], //保价服务（帮我送、帮我取）
    supportValueNum: '', //保价价格（帮我送、帮我取）
    goodWeight: '', //物品重量（帮我送、帮我取）
    defaultAddrA: '', //默认地址A
    defaultAddrB: '', //默认地址B

    // 帮我买
    marketShow: 0,
    marketBanner: '',
    marketSelGoods: [], //已选商品
    marketDetail: '', //市场选购详情
    marketPrice: 0, //同济市场选购商品总价
    buyGoods: '', //填写购买商品
    buyTime: '立即购买',
    buyAddrInfo: '', //购买地址 详情
    buyTakeAddrInfo: '', //收货地址 详情

    // 帮我送
    sendGoods: '', //物品信息
    sendGoodsImg: false, //物品图片
    sendTime: '立即购买',
    sendAddrInfo: '', //发货地址 详情
    sendTakeAddrInfo: '', //收货地址 详情
    sendGoodType: '', //物品类型
    sendGoodValue: '', //物品价值
    sendSupportValue: '', //保价服务
    sendSupportValueNum: '', //保价价格
    sendGoodWeight: 0, //物品重量
    sImgStr: '', //上传图片 字符串

    // 帮我取
    fetchGoods: '', //物品信息
    fetchGoodsImg: false, //物品图片
    fetchTime: '立即购买',
    fetchAddrInfo: '', //取货地址 详情
    fetchTakeAddrInfo: '', //收货地址 详情
    fetchGoodType: '', //物品类型
    fetchGoodValue: '', //物品价值
    fetchSupportValue: '', //保价服务
    fetchSupportValueNum: '', //保价价格
    fetchGoodWeight: 0, //物品重量
    fImgStr: '', //上传图片 字符串

    // 其他服务
    helpTime: '立即购买',
    serveDetail: '', //服务具体事项
    helpAddrInfo: '', //帮忙地址 详情
    serveItems: [], //服务事项 列表
    serve: '' //已选服务事项
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let that = this;

    wx.removeStorageSync('marketSelGoods'); //清除缓存 已选商品
    wx.removeStorageSync('marketDetail'); //清除缓存 已选商品字符串
    wx.removeStorageSync('selectedWeight'); //清除缓存 已选商品重量
    wx.removeStorageSync('marketPrice'); //清除缓存 同济市场选购商品总价
    wx.removeStorageSync('buyGoods'); //清除缓存 填写购买商品

    that.swiperHeight(); //设置当前选项卡高度
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
    let marketSelGoods = wx.getStorageSync('marketSelGoods'); //已选商品
    let marketDetail = wx.getStorageSync('marketDetail'); //市场选购详情（帮我买）
    let marketPrice = wx.getStorageSync('marketPrice'); //同济市场选购商品总价
    let addrInfo = wx.getStorageSync('addrInfo'); //填写地址信息
    let useCoupon = wx.getStorageSync('useCoupon'); //当前使用优惠券
    let addrA = ''; //计算距离临时变量A
    let addrB = ''; //计算距离临时变量B
    let addrC = ''; //计算距离临时变量C
    let serveItems = that.data.serveItems; //服务事项 列表

    if (!userId) { //如果 用户id不存在
      userId = '';
    }

    wx.request({ //获取首页信息
      url: 'https://daizongpaotui.zlogic.cn/index.php/api/shouye/index',
      method: 'POST',
      data: {
        token: userId
      },
      success: function (res) {
        if (res) {
          let topSwiper = res.data.photos == '' || null ? [] : res.data.photos.split(','); //顶部轮播图
          let defaultAddrA = ''; //默认地址A
          let defaultAddrB = ''; //默认地址B
          let discount = 0; //优惠券（帮我送、帮我取）
          let marketShow = res.data.xianshi;
          let marketBanner = 'https://daizongpaotui.zlogic.cn' + res.data.shichang;

          if (that.data.serveItems.length == 0) { //如果 服务事项列表不存在
            serveItems = res.data.qita; //服务事项 列表
            serveItems.forEach(value => {
              value.checked = false
            })
          }
          // console.log('获取首页信息', res.data);

          if (res.data.code == 1001) { //用户已登录
            if (res.data.fahuo[0]) {
              defaultAddrA = res.data.fahuo[0]; //默认地址A
            }
            if (res.data.shouhuo[0]) {
              defaultAddrB = res.data.shouhuo[0]; //默认地址B
            }

            if (typeof (defaultAddrA.location) == 'string') {
              let site = defaultAddrA.location.split(',');
              let location = {
                lat: site[0],
                lng: site[1]
              }
              defaultAddrA.location = location;
            }
            if (typeof (defaultAddrB.location) == 'string') {
              let site = defaultAddrB.location.split(',');
              let location = {
                lat: site[0],
                lng: site[1]
              }
              defaultAddrB.location = location;
            }

            discount = res.data.num; //优惠券（帮我送、帮我取）
          }

          that.setData({
            topSwiper, //顶部轮播图
            defaultAddrA, //默认地址A
            defaultAddrB, //默认地址B
            marketDetail, //市场选购详情（帮我买）
            discount, //优惠券（帮我送、帮我取）
            serveItems, //服务事项 列表
            marketShow,
            marketBanner
          })
          that.swiperHeight(); //设置当前选项卡高度
        }
      }
    })

    if (addrInfo) {
      if (addrInfo.addrSign == 'b1') { //帮我买 购买地址
        that.setData({
          buyAddrInfo: addrInfo //购买地址 详情
        })

      } else if (addrInfo.addrSign == 'b2') { //帮我买 收货地址
        that.setData({
          buyTakeAddrInfo: addrInfo //收货地址 详情
        })

      } else if (addrInfo.addrSign == 's1') { //帮我送 发货地址
        that.setData({
          sendAddrInfo: addrInfo //发货地址 详情
        })

      } else if (addrInfo.addrSign == 's2') { //帮我送 收货地址
        that.setData({
          sendTakeAddrInfo: addrInfo //收货地址 详情
        })
      } else if (addrInfo.addrSign == 'f1') { //帮我取 取货地址
        that.setData({
          fetchAddrInfo: addrInfo //取货地址 详情
        })
      } else if (addrInfo.addrSign == 'f2') { //帮我取 收货地址
        that.setData({
          fetchTakeAddrInfo: addrInfo //收货地址 详情
        })
      } else if (addrInfo.addrSign == 'd1') { //其他服务 帮忙地址
        that.setData({
          helpAddrInfo: addrInfo //帮忙地址 详情
        })
      }
      wx.removeStorageSync('addrInfo'); //删除缓存 填写地址信息

      if (that.data.buyAddrInfo != '' && that.data.buyTakeAddrInfo != '') { //帮我买 收发地址完善
        addrA = that.data.buyAddrInfo; //计算距离临时变量A
        addrB = that.data.buyTakeAddrInfo; //计算距离临时变量B
        addrC = 1;

        that.addrCalc(addrA, addrB, addrC); //通过经纬度计算价格
      } else if (that.data.sendAddrInfo != '' && that.data.sendTakeAddrInfo != '') { //帮我送 收发地址完善
        addrA = that.data.sendAddrInfo; //计算距离临时变量A
        addrB = that.data.sendTakeAddrInfo; //计算距离临时变量B
        addrC = 2;

        that.addrCalc(addrA, addrB, addrC); //通过经纬度计算价格
      } else if (that.data.fetchAddrInfo != '' && that.data.fetchTakeAddrInfo != '') { //帮我取 收发地址完善
        addrA = that.data.fetchAddrInfo; //计算距离临时变量A
        addrB = that.data.fetchTakeAddrInfo; //计算距离临时变量B
        addrC = 3;

        that.addrCalc(addrA, addrB, addrC); //通过经纬度计算价格
      }
    }

    that.setData({
      marketSelGoods, //已选商品
      marketDetail, //市场选购详情（帮我买）
      marketPrice, //同济市场选购商品总价
      useCoupon //当前使用优惠券
    })
    that.swiperHeight(); //设置当前选项卡高度
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
  swiperHeight: function () { //设置当前选项卡高度
    let that = this;
    let query = wx.createSelectorQuery();

    if (that.data.currentTab == 0) {
      query.select('.toBuy').boundingClientRect(function (rect) {
        that.setData({
          height: rect.height + 5 + 'px'
        })
      }).exec();
    } else if (that.data.currentTab == 1) {
      query.select('.toSend').boundingClientRect(function (rect) {
        that.setData({
          height: rect.height + 5 + 'px'
        })
      }).exec();
    } else if (that.data.currentTab == 2) {
      query.select('.toFetch').boundingClientRect(function (rect) {
        that.setData({
          height: rect.height + 5 + 'px'
        })
      }).exec();
    } else if (that.data.currentTab == 3) {
      query.select('.toDo').boundingClientRect(function (rect) {
        that.setData({
          height: rect.height + 5 + 'px'
        })
      }).exec();
    }
  },
  swichNav: function (e) { //点击标题切换对应选项卡
    let cur = e.target.dataset.current;

    if (this.data.currentTab == cur) {
      return false;
    } else {
      wx.removeStorageSync('price'); //清除缓存 跑腿费
      wx.removeStorageSync('useCoupon'); //清除缓存 当前使用优惠券
      this.setData({
        currentTab: cur,
        feeIndex: 0, //小费 picker
        sendGoods: '', //物品信息（帮我送）
        fetchGoods: '', //物品信息（帮我取）
        supportValueNum: '', //保价价格（帮我送、帮我取）
        goodWeight: '', //物品重量（帮我送、帮我取）
        imgArr: [], //上传图片
        imgStr: '', //上传图片 字符串
        sendGoodType: '', //物品类型
        sendGoodValue: '', //物品价值
        sendSupportValue: '', //保价服务
        sendSupportValueNum: '', //保价价格
        sendGoodWeight: 0, //物品重量
        fetchGoodType: '', //物品类型
        fetchGoodValue: '', //物品价值
        fetchSupportValue: '', //保价服务
        fetchSupportValueNum: '', //保价价格
        fetchGoodWeight: 0, //物品重量
        feeNum: 0, //小费金额
        remark: '备注', //留言
        startDate: "立即购买",
        buyTime: '立即购买',
        sendTime: '立即购买',
        fetchTime: '立即购买',
        helpTime: '立即购买'
      })
    }

    this.swiperHeight(); //设置当前选项卡高度
  },
  switchTab: function (e) { //滚动选项卡切换标题及内容
    wx.removeStorageSync('price'); //清除缓存 跑腿费
    wx.removeStorageSync('useCoupon'); //清除缓存 当前使用优惠券
    this.setData({
      currentTab: e.detail.current,
      feeIndex: 0, //购买时间 picker
      sendGoods: '', //物品信息（帮我送）
      fetchGoods: '', //物品信息（帮我取）
      supportValueNum: '', //保价价格（帮我送、帮我取）
      goodWeight: '', //物品重量（帮我送、帮我取）
      imgArr: [], //上传图片
      imgStr: '', //上传图片 字符串
      sendGoodType: '', //物品类型
      sendGoodValue: '', //物品价值
      sendSupportValue: '', //保价服务
      sendSupportValueNum: '', //保价价格
      sendGoodWeight: 0, //物品重量
      fetchGoodType: '', //物品类型
      fetchGoodValue: '', //物品价值
      fetchSupportValue: '', //保价服务
      fetchSupportValueNum: '', //保价价格
      fetchGoodWeight: 0, //物品重量
      feeNum: 0, //小费金额
      remark: '备注', //留言
      startDate: "立即购买",
      buyTime: '立即购买',
      sendTime: '立即购买',
      fetchTime: '立即购买',
      helpTime: '立即购买'
    })

    this.swiperHeight(); //设置当前选项卡高度
  },
  feeChange: function (e) { //小费 picker
    let feeIndex = e.detail.value;
    let feeNum = this.data.fee[feeIndex] == '打赏小费' ? 0 : parseInt(this.data.fee[feeIndex]); //小费金额

    this.setData({
      feeIndex,
      feeNum
    })
  },
  showChoiceInfokBox: function () { //选择物品规格按钮
    this.setData({
      choiceInfoBox: !this.data.choiceInfoBox
    })
  },
  choiceInfoMask: function () { //选择物品信息隐藏盒子 mask
    // 清空已选择
    let goodItems = this.data.goodItems;
    let valueItems = this.data.valueItems;
    let guardItems = this.data.guardItems;

    goodItems.forEach(value => {
      value.checked = false
    })
    valueItems.forEach(value => {
      value.checked = false
    })
    guardItems.forEach(value => {
      value.checked = false
    })

    this.setData({
      choiceInfoBox: !this.data.choiceInfoBox,
      goodItems,
      valueItems,
      guardItems
    })
  },
  goodCheckboxChange: function (e) { //物品类型复选框（帮我送、帮我取）
    let goodItems = this.data.goodItems;

    goodItems.forEach(value => {
      value.checked = false
    })

    e.detail.value.forEach(value => {
      goodItems[value].checked = true
    })

    this.setData({
      goodItems
    })
  },
  valueRadioChange: function (e) { //物品价值单选（帮我送、帮我取）
    let valueItems = this.data.valueItems;

    valueItems.forEach(value => {
      value.checked = false
    })
    valueItems[e.detail.value].checked = true;

    this.setData({
      valueItems
    })
  },
  guardRadioChange: function (e) { //保价服务单选（帮我送、帮我取）
    let guardItems = this.data.guardItems;

    guardItems.forEach(value => {
      value.checked = false
    })

    guardItems[e.detail.value].checked = true;

    this.setData({
      guardItems
    })
  },
  goodWeight: function (e) { //物品重量（帮我送、帮我取）
    this.setData({
      goodWeight: e.detail.value
    })
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
  subGoodInfo: function () { //物品信息确定按钮（帮我送、帮我取）
    let that = this;
    let currentTab = this.data.currentTab; //当前选项卡
    let goodItems = this.data.goodItems; //物品类型（帮我送、帮我取）
    let valueItems = this.data.valueItems; //物品价值（帮我送、帮我取）
    let guardItems = this.data.guardItems; //保价服务（帮我送、帮我取）
    let supportValueNum = this.data.supportValueNum; //保价价格（帮我送、帮我取
    let goodWeight = this.data.goodWeight; //物品重量
    let goodItemsSel = []; //物品类型已选择（数组格式）
    let valueItemsSel = []; //物品价值已选择
    let guardItemsSel = []; //保价服务已选择
    let goodItemsSelS = ''; //物品类型已选择（字符串格式）
    let imgStr = this.data.imgStr; //上传图片 字符串
    let finalSelected = ''; //最终选择

    // 物品类型
    goodItems.forEach(value => {
      if (value.checked == true) {
        goodItemsSel.push(value.value)
      }
    })
    goodItemsSelS = goodItemsSel.join(' ');

    // 物品价值
    valueItems.forEach(value => {
      if (value.checked == true) {
        valueItemsSel.push(value.value)
      }
    })

    // 保价服务
    guardItems.forEach(value => {
      if (value.checked == true) {
        guardItemsSel.push(value.value);
        supportValueNum = value.num;
      }
    })

    // 最终选择
    finalSelected = goodItemsSelS + '/' + valueItemsSel[0] + '/' + guardItemsSel[0] + '/' + goodWeight + '公斤';

    // 判断物品信息是否完善
    if (goodItemsSelS && valueItemsSel[0] && guardItemsSel[0] && goodWeight > 0) {
      // 清空已选择
      goodItems.forEach(value => {
        value.checked = false
      });
      valueItems.forEach(value => {
        value.checked = false
      });
      guardItems.forEach(value => {
        value.checked = false
      });
      this.setData({
        choiceInfoBox: !this.data.choiceInfoBox,
        goodItems,
        valueItems,
        guardItems
      });

      // 根据 当前选项卡 判断是 帮我送 或者 帮我取
      if (currentTab == 1) {
        console.log('帮我送 物品信息');

        this.setData({
          sendGoods: finalSelected, //物品信息（帮我送）
          sendGoodType: goodItemsSelS, //物品类型
          sendGoodValue: valueItemsSel[0], //物品价值
          sendSupportValue: guardItemsSel[0], //保价服务
          sendSupportValueNum: supportValueNum, //保价价格
          sendGoodWeight: goodWeight, //物品重量
          sImgStr: imgStr //上传图片 字符串
        })

        that.addrCalc(that.data.sendAddrInfo, that.data.sendTakeAddrInfo, 2);
      } else if (currentTab == 2) {
        console.log('帮我取 物品信息');

        this.setData({
          fetchGoods: finalSelected, //物品信息（帮我取）
          fetchGoodType: goodItemsSelS, //物品类型
          fetchGoodValue: valueItemsSel[0], //物品价值
          fetchSupportValue: guardItemsSel[0], //保价服务
          fetchSupportValueNum: supportValueNum, //保价价格
          fetchGoodWeight: goodWeight, //物品重量
          fImgStr: imgStr //上传图片 字符串
        })

        that.addrCalc(that.data.fetchAddrInfo, that.data.fetchTakeAddrInfo, 3);
      }
    } else {
      wx.showToast({
        title: '请完善物品信息',
        icon: 'none'
      })
    }
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
  buyGoods: function (e) { //填写购买商品
    wx.setStorageSync('buyGoods', e.detail.value); //放入缓存 填写购买商品
    this.setData({
      buyGoods: e.detail.value
    })
  },
  serveDetail: function (e) { //服务具体事项（其他服务）
    this.setData({
      serveDetail: e.detail.value
    })
  },
  serveRadioChange: function (e) { //服务事项单选（其他服务）
    let serveItems = this.data.serveItems; //服务事项 列表
    let serve = ''; //已选服务事项
    let price = this.data.price; //跑腿费

    serveItems.forEach(value => {
      value.checked = false
    })
    serveItems[e.detail.value].checked = true;
    serve = serveItems[e.detail.value]; //已选服务事项
    price.hPrice = serveItems[e.detail.value].tag_price; //服务费

    this.setData({
      serveItems,
      serve,
      price
    })
    wx.setStorageSync('price',this.data.price);//放入缓存 跑腿费
  },
  addrCalc: function (addrA, addrB, addrC) { //通过经纬度计算价格
    let that = this;
    let price = that.data.price; //跑腿费
    let sendGoodWeight = that.data.sendGoodWeight;
    let fetchGoodWeight = that.data.fetchGoodWeight;

    if (addrA && addrB && addrC && sendGoodWeight) {
      wx.request({
        url: 'https://daizongpaotui.zlogic.cn/index.php/api/selectaddress/calculate',
        method: 'POST',
        data: {
          from: addrA.location.lat + ',' + addrA.location.lng, //购买地址 经纬度
          to: addrB.location.lat + ',' + addrB.location.lng, //购买地址 经纬度
          weight: sendGoodWeight
        },
        success: function (res) {
          console.log('通过经纬度计算价格', res.data);

          if (addrC == 1) {
            price.bPrice = res.data;
          } else if (addrC == 2) {
            price.sPrice = res.data;
          } else if (addrC == 3) {
            price.fPrice = res.data;
          }
          wx.setStorageSync('price', price); //放入缓存 跑腿费
          that.setData({
            price
          })
        }
      })
    } else if (addrA && addrB && addrC && fetchGoodWeight) {
      wx.request({
        url: 'https://daizongpaotui.zlogic.cn/index.php/api/selectaddress/calculate',
        method: 'POST',
        data: {
          from: addrA.location.lat + ',' + addrA.location.lng, //购买地址 经纬度
          to: addrB.location.lat + ',' + addrB.location.lng, //购买地址 经纬度
          weight: fetchGoodWeight
        },
        success: function (res) {
          console.log('通过经纬度计算价格', res.data);

          if (addrC == 1) {
            price.bPrice = res.data;
          } else if (addrC == 2) {
            price.sPrice = res.data;
          } else if (addrC == 3) {
            price.fPrice = res.data;
          }
          wx.setStorageSync('price', price); //放入缓存 跑腿费
          that.setData({
            price
          })
        }
      })
    }
  },
  addrCalcB: function (addrA, addrB, addrC) { //通过经纬度计算价格
    let that = this;
    let price = that.data.price; //跑腿费
    let sendGoodWeight = that.data.sendGoodWeight;
    let fetchGoodWeight = that.data.fetchGoodWeight;

    if (addrA && addrB && addrC && sendGoodWeight) {
      wx.request({
        url: 'https://daizongpaotui.zlogic.cn/index.php/api/selectaddress/calculate',
        method: 'POST',
        data: {
          from: addrA.location.lat + ',' + addrA.location.lng, //购买地址 经纬度
          to: addrB.location.lat + ',' + addrB.location.lng, //购买地址 经纬度
          weight: sendGoodWeight
        },
        success: function (res) {
          console.log('通过经纬度计算价格', res.data);

          if (addrC == 1) {
            price.bPrice = res.data;
          } else if (addrC == 2) {
            price.sPrice = res.data;
          } else if (addrC == 3) {
            price.fPrice = res.data;
          }
          wx.setStorageSync('price', price); //放入缓存 跑腿费
          that.setData({
            price
          })
        }
      })
    } else if (addrA && addrB && addrC && fetchGoodWeight) {
      wx.request({
        url: 'https://daizongpaotui.zlogic.cn/index.php/api/selectaddress/calculate',
        method: 'POST',
        data: {
          from: addrA.location.lat + ',' + addrA.location.lng, //购买地址 经纬度
          to: addrB.location.lat + ',' + addrB.location.lng, //购买地址 经纬度
          weight: fetchGoodWeight
        },
        success: function (res) {
          console.log('通过经纬度计算价格', res.data);

          if (addrC == 1) {
            price.bPrice = res.data;
          } else if (addrC == 2) {
            price.sPrice = res.data;
          } else if (addrC == 3) {
            price.fPrice = res.data;
          }
          wx.setStorageSync('price', price); //放入缓存 跑腿费
          that.setData({
            price
          })
        }
      })
    }
  },
  sPlaceOrder: function () { //下单（帮我送）
    let that = this;
    let userId = wx.getStorageSync('userId'); //用户id
    let sendAddrInfo = that.data.sendAddrInfo; //发货地址 详情
    let sendTakeAddrInfo = that.data.sendTakeAddrInfo; //收货地址 详情
    let sendGoodType = that.data.sendGoodType; //物品类型
    let sendGoodValue = that.data.sendGoodValue; //物品价值
    let sendSupportValue = that.data.sendSupportValue; //保价服务
    let sendSupportValueNum = that.data.sendSupportValueNum; //保价价格
    let sendGoodWeight = that.data.sendGoodWeight == 0 || '' ? 0 : parseInt(that.data.sendGoodWeight); //物品重量
    let sImgStr = that.data.sImgStr; //上传图片 字符串
    let sendTime = that.data.sendTime;
    let useCoupon = wx.getStorageSync('useCoupon'); //当前使用优惠券
    let useCouponId = useCoupon == '' ? '' : useCoupon.id; //当前使用优惠券id
    let feeNum = that.data.feeNum; //小费金额
    let sPrice = that.data.price.sPrice; //跑腿费 帮我送
    let price = 0; //跑腿费
    let remark = that.data.remark; //备注

    // 地址信息 经纬度 格式
    if (sendAddrInfo) {
      sendAddrInfo.site = sendAddrInfo.location.lat + ',' + sendAddrInfo.location.lng;
    }
    if (sendTakeAddrInfo) {
      sendTakeAddrInfo.site = sendTakeAddrInfo.location.lat + ',' + sendTakeAddrInfo.location.lng;
    }

    // 计算跑腿费
    price = sPrice + parseInt(feeNum);

    // 计算当前使用优惠券
    if (useCoupon && sPrice >= useCoupon.quota) {
      price = price - useCoupon.price
    }

    if (userId) {
      if (sendAddrInfo == '' || sendTakeAddrInfo == '') {
        wx.showToast({
          title: '请完善地址信息',
          icon: 'none'
        })
      } else if (sendGoodType == '' && sendGoodValue == '' && sendSupportValue == '') {
        wx.showToast({
          title: '请完善品信息',
          icon: 'none'
        })
      } else {
        if (sendAddrInfo.address == sendTakeAddrInfo.address && sendAddrInfo.region == sendTakeAddrInfo.region) {
          wx.showToast({
            title: '送货地址不能与收货地址一样',
            icon: 'none'
          })
        } else {
          wx.request({
            url: 'https://daizongpaotui.zlogic.cn/index.php/api/orders/shop',
            method: 'POST',
            data: {
              yuyue: sendTime
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
                    orderType: 1, //订单类型 1=帮我送,2=帮我取,3=帮我买,4=其他服务
                    from: sendAddrInfo.address, //发货地址
                    from_jw:sendAddrInfo.site,//发货地址 经纬度
                    fahuoren: sendAddrInfo.name, //发货地址 联系人
                    fahuophone: sendAddrInfo.tel, //发货地址 电话
                    to: sendTakeAddrInfo.address, //收货地址
                    to_jw:sendTakeAddrInfo.site,//收货地址 经纬度
                    shouhuoren: sendTakeAddrInfo.name, //收货地址 联系人
                    shouhuophone: sendTakeAddrInfo.tel, //收货地址 电话
                    class: sendGoodType, //物品类型
                    jiazhi: sendGoodValue, //物品价值
                    insured_price: parseInt(sendSupportValue), //保价服务
                    weight: sendGoodWeight, //物品重量
                    photoimages: sImgStr, //上传图片 字符串
                    fahuo: sendTime, //发货时间
                    youhuijuanid: useCouponId, //当前使用优惠券id
                    tip: feeNum, //小费金额
                    price: price, //跑腿费
                    paotuifei: sPrice,
                    yiyouhui: parseInt(useCoupon.price), //已优惠
                    remark: remark //备注
                  },
                  success: function (res) {
                    console.log(res)

                    if (res.data.code == 200) {
                      let oId = res.data.orderID //订单id

                      wx.hideLoading({
                        complete: () => {
                          wx.removeStorageSync('useCoupon'); //删除缓存 当前使用优惠券

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
  fPlaceOrder: function () { //下单（帮我取）
    let that = this;
    let userId = wx.getStorageSync('userId'); //用户id
    let fetchAddrInfo = that.data.fetchAddrInfo; //发货地址 详情
    let fetchTakeAddrInfo = that.data.fetchTakeAddrInfo; //收货地址 详情
    let fetchGoodType = that.data.fetchGoodType; //物品类型
    let fetchGoodValue = that.data.fetchGoodValue; //物品价值
    let fetchSupportValue = that.data.fetchSupportValue; //保价服务
    let fetchSupportValueNum = that.data.fetchSupportValueNum; //保价价格
    let fetchGoodWeight = that.data.fetchGoodWeight == 0 || '' ? 0 : parseInt(that.data.fetchGoodWeight); //物品重量
    let fetchTime = that.data.fetchTime;
    let useCoupon = wx.getStorageSync('useCoupon'); //当前使用优惠券
    let useCouponId = useCoupon == '' ? '' : useCoupon.id; //当前使用优惠券id
    let feeNum = that.data.feeNum; //小费金额
    let fPrice = that.data.price.fPrice; //跑腿费 帮我送
    let price = 0; //跑腿费
    let remark = that.data.remark; //备注

    // 地址信息 经纬度 格式
    if (fetchAddrInfo) {
      fetchAddrInfo.site = fetchAddrInfo.location.lat + ',' + fetchAddrInfo.location.lng;
    }
    if (fetchTakeAddrInfo) {
      fetchTakeAddrInfo.site = fetchTakeAddrInfo.location.lat + ',' + fetchTakeAddrInfo.location.lng;
    }

    // 计算跑腿费
    price = fPrice + parseInt(feeNum);

    // 计算当前使用优惠券
    if (useCoupon && sPrice >= useCoupon.quota) {
      price = price - useCoupon.price
    }

    if (userId) {
      if (fetchAddrInfo == '' || fetchTakeAddrInfo == '') {
        wx.showToast({
          title: '请完善地址信息',
          icon: 'none'
        })
      } else if (fetchGoodType == '' && fetchGoodValue == '' && fetchSupportValue == '') {
        wx.showToast({
          title: '请完善品信息',
          icon: 'none'
        })
      } else {
        if (fetchAddrInfo.address == fetchTakeAddrInfo.address && fetchAddrInfo.region == fetchTakeAddrInfo.region) {
          wx.showToast({
            title: '送货地址不能与收货地址一样',
            icon: 'none'
          })
        } else {
          wx.request({
            url: 'https://daizongpaotui.zlogic.cn/index.php/api/orders/shop',
            method: 'POST',
            data: {
              yuyue: fetchTime
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
                    orderType: 2, //订单类型 1=帮我送,2=帮我取,3=帮我买,4=其他服务
                    from: fetchAddrInfo.address, //取货地址
                    from_jw:fetchAddrInfo.site,//取货地址 经纬度
                    fahuoren: fetchAddrInfo.name, //取货地址 联系人
                    fahuophone: fetchAddrInfo.tel, //取货地址 电话
                    to: fetchTakeAddrInfo.address, //收货地址
                    to_jw:fetchTakeAddrInfo.site,//收货地址 经纬度
                    shouhuoren: fetchTakeAddrInfo.name, //收货地址 联系人
                    shouhuophone: fetchTakeAddrInfo.tel, //收货地址 电话
                    class: fetchGoodType, //物品类型
                    jiazhi: fetchGoodValue, //物品价值
                    insured_price: parseInt(fetchSupportValue), //保价服务
                    weight: fetchGoodWeight, //物品重量
                    photoimages: that.data.sImgStr, //上传图片 字符串
                    fahuo: fetchTime, //取货时间
                    youhuijuanid: useCouponId, //当前使用优惠券id
                    tip: feeNum, //小费金额
                    price: price, //跑腿费
                    paotuifei: fPrice,
                    yiyouhui: parseInt(useCoupon.price), //已优惠
                    remark: remark //备注
                  },
                  success: function (res) {
                    console.log(res)

                    if (res.data.code == 200) {
                      let oId = res.data.orderID //订单id

                      wx.hideLoading({
                        complete: () => {
                          wx.removeStorageSync('useCoupon'); //删除缓存 当前使用优惠券

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
  dPlaceOrder: function () { //下单（其他服务）
    let that = this;
    let userId = wx.getStorageSync('userId'); //用户id
    let helpAddrInfo = that.data.helpAddrInfo; //发货地址 详情
    let serve = that.data.serve; //已选服务事项
    let serveDetail = that.data.serveDetail; //服务具体事项
    let helpTime = that.data.helpTime;
    let feeNum = that.data.feeNum; //小费金额
    let hPrice = that.data.price.hPrice; //跑腿费 其他服务
    let price = 0; //跑腿费

    // 地址信息 经纬度 格式
    if (helpAddrInfo) {
      helpAddrInfo.site = helpAddrInfo.location.lat + ',' + helpAddrInfo.location.lng;
    }

    // 计算跑腿费
    price = hPrice + parseInt(feeNum);

    if (userId) {
      if (helpAddrInfo == '') {
        wx.showToast({
          title: '请完善地址信息',
          icon: 'none'
        })
      } else if (serve == '' && serveDetail == '') {
        wx.showToast({
          title: '请选择或填写服务',
          icon: 'none'
        })
      } else {
        wx.request({
          url: 'https://daizongpaotui.zlogic.cn/index.php/api/orders/shop',
          method: 'POST',
          data: {
            yuyue: helpTime
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
                  orderType: 4, //订单类型 1=帮我送,2=帮我取,3=帮我买,4=其他服务
                  from: helpAddrInfo.address, //服务地址
                  from_jw:helpAddrInfo.site,//服务地址 经纬度
                  fahuoren: helpAddrInfo.name, //服务地址 联系人
                  fahuophone: helpAddrInfo.tel, //服务地址 电话
                  class: serve.tag_name, //服务事项 名称
                  remark: serveDetail, //服务具体事项
                  fahuo: helpTime, //服务时间
                  tip: feeNum, //小费金额
                  price: price, //跑腿费
                  paotuifei: hPrice
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
  setDefaultAddrA: function () { //设置默认地址A
    let that = this;
    let userId = wx.getStorageSync('userId'); //用户id
    let currentTab = that.data.currentTab; //当前选项卡
    let defaultAddrA = that.data.defaultAddrA; //默认地址A
    let addrA = ''; //计算距离临时变量A
    let addrB = ''; //计算距离临时变量B
    let addrC = ''; //计算距离临时变量C

    if (userId) {
      if (defaultAddrA) {
        if (currentTab == 0) { //帮我买
          that.setData({
            buyAddrInfo: defaultAddrA
          })

          if (that.data.buyAddrInfo != '' && that.data.buyTakeAddrInfo != '') { //帮我买 收发地址完善
            addrA = that.data.buyAddrInfo; //计算距离临时变量A
            addrB = that.data.buyTakeAddrInfo; //计算距离临时变量B
            addrC = 1;

            that.addrCalcB(addrA, addrB, addrC); //通过经纬度计算价格
          }
        } else if (currentTab == 1) { //帮我送
          that.setData({
            sendAddrInfo: defaultAddrA
          })

          if (that.data.sendAddrInfo != '' && that.data.sendTakeAddrInfo != '') { //帮我送 收发地址完善
            addrA = that.data.sendAddrInfo; //计算距离临时变量A
            addrB = that.data.sendTakeAddrInfo; //计算距离临时变量B
            addrC = 2;

            that.addrCalcB(addrA, addrB, addrC); //通过经纬度计算价格
          }
        } else if (currentTab == 2) { //帮我取
          that.setData({
            fetchAddrInfo: defaultAddrA
          })
          if (that.data.fetchAddrInfo != '' && that.data.fetchTakeAddrInfo != '') { //帮我取 收发地址完善
            addrA = that.data.fetchAddrInfo; //计算距离临时变量A
            addrB = that.data.fetchTakeAddrInfo; //计算距离临时变量B
            addrC = 3;

            that.addrCalcB(addrA, addrB, addrC); //通过经纬度计算价格
          }
        } else if (currentTab == 3) { //其他服务
          that.setData({
            helpAddrInfo: defaultAddrA
          })
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

    that.swiperHeight(); //设置当前选项卡高度
  },
  setDefaultAddrB: function () { //设置默认地址B
    let that = this;
    let userId = wx.getStorageSync('userId'); //用户id
    let currentTab = that.data.currentTab; //当前选项卡
    let defaultAddrB = that.data.defaultAddrB; //默认地址B
    let addrA = ''; //计算距离临时变量A
    let addrB = ''; //计算距离临时变量B
    let addrC = ''; //计算距离临时变量C

    if (userId) {
      if (defaultAddrB) {
        if (currentTab == 0) { //帮我买
          that.setData({
            buyTakeAddrInfo: defaultAddrB
          })

          if (that.data.buyAddrInfo != '' && that.data.buyTakeAddrInfo != '') { //帮我买 收发地址完善
            addrA = that.data.buyAddrInfo; //计算距离临时变量A
            addrB = that.data.buyTakeAddrInfo; //计算距离临时变量B
            addrC = 1;

            that.addrCalcB(addrA, addrB, addrC); //通过经纬度计算价格
          }
        } else if (currentTab == 1) { //帮我送
          that.setData({
            sendTakeAddrInfo: defaultAddrB
          })

          if (that.data.sendAddrInfo != '' && that.data.sendTakeAddrInfo != '') { //帮我送 收发地址完善
            addrA = that.data.sendAddrInfo; //计算距离临时变量A
            addrB = that.data.sendTakeAddrInfo; //计算距离临时变量B
            addrC = 2;

            that.addrCalcB(addrA, addrB, addrC); //通过经纬度计算价格
          }
        } else if (currentTab == 2) { //帮我取
          that.setData({
            fetchTakeAddrInfo: defaultAddrB
          })

          if (that.data.fetchAddrInfo != '' && that.data.fetchTakeAddrInfo != '') { //帮我取 收发地址完善
            addrA = that.data.fetchAddrInfo; //计算距离临时变量A
            addrB = that.data.fetchTakeAddrInfo; //计算距离临时变量B
            addrC = 3;

            that.addrCalcB(addrA, addrB, addrC); //通过经纬度计算价格
          }
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

    that.swiperHeight(); //设置当前选项卡高度
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

    if (currentTab == 0) {
      that.setData({
        buyTime: startDate
      })
    } else if (currentTab == 1) {
      that.setData({
        sendTime: startDate
      })
    } else if (currentTab == 2) {
      that.setData({
        fetchTime: startDate
      })
    } else if (currentTab == 3) {
      that.setData({
        helpTime: startDate
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
    })
    wx.showToast({
      title: '商品已清空'
    })
    this.swiperHeight(); //设置当前选项卡高度
  },
  calcGoods: function (e) { //更新已选商品、计算总价
    let marketSelGoods = this.data.marketSelGoods; //已选商品
    let marketPrice = 0; //同济市场选购商品总价
    let selectedWeight = 0; //已选商品重量
    let pid = e.detail.pid; //当前商品id
    let num = e.detail.num; //当前商品数量

    marketSelGoods.forEach(value => { //更新 已选商品数量
      if (value.pid == pid && value.num != num) {
        value.num = num;
      }
    })
    marketSelGoods.forEach(value => { //更新 已选商品重量、数量
      selectedWeight += value.num * parseFloat(value.pweight); //更新已选商品重量
      marketPrice += (value.price * value.num); // 根据已选商品计算总价
    })

    wx.setStorageSync('marketSelGoods', marketSelGoods); //放入缓存 已选商品
    wx.setStorageSync('selectedWeight', selectedWeight); //放入缓存 已选商品重量
    wx.setStorageSync('marketPrice', marketPrice); //放入缓存 同济市场选购商品总价
    this.setData({
      marketSelGoods
    })
  }
})