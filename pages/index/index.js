//index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topSwiper: [{
        img: 'https://s1.ax1x.com/2020/04/06/GyAOXV.png'
      },
      {
        img: 'https://s1.ax1x.com/2020/04/06/GyAOXV.png'
      }
    ], //顶部轮播图
    currentTab: 0, //当前选项卡
    height: '', //当前选项卡高度
    feeIndex: 0, //小费 picker index
    fee: ['打赏小费', '1元', '2元', '3元', '4元', '5元'], //小费 picker
    price: 0, //跑腿费
    choiceInfoBox: true, //选择物品信息隐藏盒子
    remarkBox: true, //留言隐藏盒子
    remark: '备注', //留言
    discount: 1, //优惠券（帮我送、帮我取）
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
        value: '1元（保100）',
        checked: false
      },
      {
        value: '3元（保300）',
        checked: false
      },
      {
        value: '5元（保500）',
        checked: false
      }
    ], //保价服务（帮我送、帮我取）
    goodWeight: 1, //物品重量（帮我送、帮我取）

    marketDetail: '', //市场选购详情（帮我买）
    buyTimeIndex: 0, //购买时间 picker index（帮我买）
    buyTime: ['购买时间', '立即购买', '预约购买'], //购买时间 picker（帮我买）
    buyAddress: '这是购买地址', //购买地址（帮我买）
    buyAddressArea: '这是购买地区', //购买地址区域（帮我买）
    takeAddress: '这是收货地址', //收货地址（帮我买）
    takeAddressArea: '这是收货地区', //收货地址区域（帮我买）

    sendGoods: '', //物品信息（帮我送）
    sendGoodsImg: false, //物品图片（帮我送）
    sendTimeIndex: 0, //发货时间 picker index（帮我送）
    sendTime: ['发货时间', '立即发货', '预约发货'], //购买时间 picker（帮我送）
    sendAddress: '这是发货地址233', //发货地址（帮我送）
    sendAddressArea: '这是发货地区233', //发货地址区域（帮我送）
    sendTakeAddress: '这是收货地址233', //收货地址（帮我送）
    sendTakeAddressArea: '这是收货地区233', //收货地址区域（帮我送）


    fetchGoods: '', //物品信息（帮我取）
    fetchGoodsImg: false, //物品图片（帮我取）
    fetchTimeIndex: 0, //发货时间 picker index（帮我取）
    fetchTime: ['取货时间', '立即取货', '预约取货'], //购买时间 picker（帮我取）
    fetchAddress: '这是取货地址666', //发货地址（帮我取）
    fetchAddressArea: '这是取货地区666', //发货地址区域（帮我取）
    fetchTakeAddress: '这是收货地址666', //收货地址（帮我取）
    fetchTakeAddressArea: '这是收货地区666', //收货地址区域（帮我取）

    helpAddress: '帮忙地址', //帮忙地址（其他服务）
    helpAddressArea: '帮忙地区', //帮忙地区（其他服务）
    helpTimeIndex: 0, //服务时间 picker index（其他服务）
    helpTime: ['服务时间', '立即服务', '预约服务'], //服务时间 picker（其他服务）
    serveDetail: '', //服务具体事项（其他服务）
    serveItems: [{
        value: '遛狗',
        img: 'https://s1.ax1x.com/2020/04/10/GoWIUI.png',
        imgSelected: 'https://s1.ax1x.com/2020/04/10/GoW5VA.png',
        checked: false
      },
      {
        value: '遛狗2',
        img: 'https://s1.ax1x.com/2020/04/10/GoWIUI.png',
        imgSelected: 'https://s1.ax1x.com/2020/04/10/GoW5VA.png',
        checked: false
      },
      {
        value: '遛狗3',
        img: 'https://s1.ax1x.com/2020/04/10/GoWIUI.png',
        imgSelected: 'https://s1.ax1x.com/2020/04/10/GoW5VA.png',
        checked: false
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    const that = this;

    wx.removeStorageSync('marketDetail'); //清除缓存 已选商品字符串

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
    let marketDetail = wx.getStorageSync('marketDetail'); //市场选购详情（帮我买）

    this.setData({
      marketDetail //市场选购详情（帮我买）
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
  swiperHeight: function () { //设置当前选项卡高度
    const that = this;
    const query = wx.createSelectorQuery();

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
      this.setData({
        currentTab: cur,
        feeIndex: 0, //购买时间 picker
        sendGoods: '', //物品信息（帮我送）
        fetchGoods: '', //物品信息（帮我取）
        goodWeight: 1, //物品重量（帮我送、帮我取）
        remark: '备注', //留言
        price: 0 //跑腿费
      })
    }

    this.swiperHeight(); //设置当前选项卡高度
  },
  switchTab: function (e) { //滚动选项卡切换标题及内容
    this.setData({
      currentTab: e.detail.current,
      feeIndex: 0, //购买时间 picker
      sendGoods: '', //物品信息（帮我送）
      fetchGoods: '', //物品信息（帮我取）
      goodWeight: 1, //物品重量（帮我送、帮我取）
      remark: '备注', //留言
      price: 0 //跑腿费
    })

    this.swiperHeight(); //设置当前选项卡高度
  },
  feeChange: function (e) { //小费 picker
    console.log('小费为', e.detail.value)
    this.setData({
      feeIndex: e.detail.value
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

    goodItems.forEach((value, index) => {
      value.checked = false
    })
    valueItems.forEach((value, index) => {
      value.checked = false
    })
    guardItems.forEach((value, index) => {
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

    goodItems.forEach((value, index) => {
      value.checked = false
    })

    e.detail.value.forEach((value, index) => {
      goodItems[value].checked = true
    })

    this.setData({
      goodItems
    })
  },
  valueRadioChange: function (e) { //物品价值单选（帮我送、帮我取）
    let valueItems = this.data.valueItems;

    valueItems.forEach((value, index) => {
      value.checked = false
    })

    valueItems[e.detail.value].checked = true;

    this.setData({
      valueItems
    })
  },
  guardRadioChange: function (e) { //保价服务单选（帮我送、帮我取）
    let guardItems = this.data.guardItems;

    guardItems.forEach((value, index) => {
      value.checked = false
    })

    guardItems[e.detail.value].checked = true;

    this.setData({
      guardItems
    })
  },
  goodWeight: function (e) { //物品重量（帮我送、帮我取）
    console.log('物品重量', e.detail.value);

    this.setData({
      goodWeight: e.detail.value
    })
  },
  subGoodInfo: function () { //物品信息确定按钮（帮我送、帮我取）
    let currentTab = this.data.currentTab; //当前选项卡
    let goodItems = this.data.goodItems; //物品类型（帮我送、帮我取）
    let valueItems = this.data.valueItems; //物品价值（帮我送、帮我取）
    let guardItems = this.data.guardItems; //保价服务（帮我送、帮我取）
    let goodWeight = this.data.goodWeight; //物品重量
    let goodItemsSel = []; //物品类型已选择（数组格式）
    let valueItemsSel = []; //物品价值已选择
    let guardItemsSel = []; //保价服务已选择
    let goodItemsSelS = ''; //物品类型已选择（字符串格式）
    let finalSelected = ''; //最终选择

    // 物品类型
    goodItems.forEach((value, index) => {
      if (value.checked == true) {
        goodItemsSel.push(value.value)
      }
    })
    goodItemsSelS = goodItemsSel.join(' ');

    // 物品价值
    valueItems.forEach((value, index) => {
      if (value.checked == true) {
        valueItemsSel.push(value.value)
      }
    })

    // 保价服务
    guardItems.forEach((value, index) => {
      if (value.checked == true) {
        guardItemsSel.push(value.value)
      }
    })

    // 最终选择
    finalSelected = goodItemsSelS + '/' + valueItemsSel[0] + '/' + guardItemsSel[0] + '/' + goodWeight + '公斤';

    // 判断物品信息是否完善
    if (goodItemsSelS && valueItemsSel[0] && guardItemsSel[0]) {
      console.log('已选物品类型为', goodItemsSelS);
      console.log('已选物品价值为', valueItemsSel[0]);
      console.log('已选保价服务为', guardItemsSel[0]);
      console.log('最终选择为', finalSelected);

      // 清空已选择
      goodItems.forEach((value, index) => {
        value.checked = false
      });
      valueItems.forEach((value, index) => {
        value.checked = false
      });
      guardItems.forEach((value, index) => {
        value.checked = false
      });
      this.setData({
        choiceInfoBox: !this.data.choiceInfoBox,
        goodItems,
        valueItems,
        guardItems
      });

      // 判断当前选项卡是 帮我送 或者 帮我取
      if (currentTab == 1) {
        console.log('帮我送 物品信息');

        this.setData({
          sendGoods: finalSelected //物品信息（帮我送）
        })
      } else if (currentTab == 2) {
        console.log('帮我取 物品信息');

        this.setData({
          fetchGoods: finalSelected //物品信息（帮我取）
        })
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
      choiceInfoBox: !this.data.choiceInfoBox
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
  buyTimeChange: function (e) { //购买时间 picker（帮我买）
    console.log('购买时间为', e.detail.value)
    this.setData({
      buyTimeIndex: e.detail.value
    })
  },
  sendTimeChange: function (e) { //发货时间 picker（帮我送）
    console.log('发货时间为', e.detail.value)
    this.setData({
      sendTimeIndex: e.detail.value
    })
  },
  fetchTimeChange: function (e) { //发货时间 picker（帮我取）
    console.log('取货时间为', e.detail.value)
    this.setData({
      fetchTimeIndex: e.detail.value
    })
  },
  helpTimeChange: function (e) { //服务时间 picker（其他服务）
    console.log('取货时间为', e.detail.value)
    this.setData({
      helpTimeIndex: e.detail.value
    })
  },
  serveDetail: function (e) { //服务具体事项（其他服务）
    console.log('具体服务事项', e.detail.value);
    this.setData({
      serveDetail: e.detail.value
    })
  },
  serveRadioChange: function (e) { //服务事项单选（其他服务）
    let serveItems = this.data.serveItems;

    serveItems.forEach((value, index) => {
      value.checked = false
    })

    serveItems[e.detail.value].checked = true;

    this.setData({
      serveItems
    })
  }
})