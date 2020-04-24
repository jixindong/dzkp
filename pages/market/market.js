// pages/market/market.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0, //当前选项卡
    scrollLeft: 0, //tab标题列表滚动位置
    height: '', //当前选项卡高度
    minHeight: '', //当前选项卡最小高度
    goods: [], //商品
    selectedGoods: [], //已选商品
    selectedGoodsStr: '', //已选商品字符串（即帮我买 已选购商品）
    selectedNum: 0, //已选商品数量
    selectedNumHeight: '', //已选商品数量盒子高度
    totalPrice: '0', //同济市场选购商品总价
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const that = this;

    wx.request({ //获取 商品列表
      url: 'https://daizongpaotui.zlogic.cn/index.php/api/productlist/index',
      success: function (res) {
        console.log('商品列表', res.data);

        that.setData({
          goods: res.data
        })

        that.swiperHeight(); //设置当前选项卡高度
      }
    })

    that.calcMinHeight(); //设置当前选项卡最小高度
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
  swiperHeight: function () { //设置当前选项卡高度
    const that = this;
    const query = wx.createSelectorQuery();

    query.select('#s' + this.data.currentTab).boundingClientRect(function (rect) {
      that.setData({
        height: rect.height + 5 + 'px'
      })
    }).exec();
  },
  calcMinHeight: function () { //设置当前选项卡最小高度（当商品数量较少时使轮播图填满剩余页面）
    const that = this;

    wx.getSystemInfo({
      success: function (res) {
        let clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;

        let calc = clientHeight * rpxR - 450 + 'rpx';

        console.log(calc);

        that.setData({
          minHeight: calc
        });
      }
    });
  },
  tabScroll: function () { //设置tab标题列表滚动位置
    const that = this;
    const currentTab = that.data.currentTab;
    const page = Math.ceil((currentTab + 1) / 4);

    // 判断当前滚动超过一屏时,设置tab标题列表滚动位置
    if (currentTab <= 3) {
      that.setData({
        scrollLeft: 0
      })
    } else {
      that.setData({
        scrollLeft: 750 * (page - 1)
      })
    }
  },
  swichNav: function (e) { //点击标题切换对应选项卡
    let cur = e.target.dataset.current;

    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }

    this.swiperHeight(); //设置当前选项卡高度
  },
  switchTab: function (e) { //滚动选项卡切换标题及内容
    this.setData({
      currentTab: e.detail.current
    })

    this.swiperHeight(); //设置当前选项卡高度
    this.tabScroll(); //设置tab标题列表滚动位置
  },
  selNumHeight: function () { //设置已选商品数量盒子高度
    const that = this;
    const query = wx.createSelectorQuery();

    // 把 已选商品数量盒子宽度 赋值给 已选商品数量盒子高度
    query.select('.cart .goodsNum .num').boundingClientRect(function (rect) {
      that.setData({
        selectedNumHeight: rect.width + 'px'
      })
    }).exec();
  },
  calcPrice: function (e) { //更新已选商品、计算总价
    let selectedGoods = this.data.selectedGoods; //已选商品
    let selectedGoodsStr = ''; //已选商品字符串（即帮我买 已选购商品）
    let selectedNum = 0; //已选商品数量
    let totalPrice = 0; //同济市场选购商品总价
    let pid = e.detail.pid; //当前商品id
    let pdetail = e.detail.pdetail; //当前商品 名称、重量
    let num = e.detail.num; //当前商品数量
    let price = e.detail.price; //当前商品价格

    //更新已选商品
    selectedGoods[pid] = {
      pid: pid,
      num: num,
      pdetail,
      price: price
    };
    console.log('已选商品', selectedGoods);


    // 更新已选商品字符串（即帮我买 已选购商品）、更新已选商品数量、根据已选商品计算总价
    selectedGoods.forEach((value, index) => {
      if (value.num != 0) {
        selectedGoodsStr += value.pdetail + ' ' + 'x' + value.num + '、'; // 更新已选商品字符串（即帮我买 已选购商品）
        selectedNum += value.num; //更新已选商品数量
        totalPrice += (value.price * value.num); // 根据已选商品计算总价
      }
    })
    selectedGoodsStr = selectedGoodsStr.slice(0, selectedGoodsStr.length - 1); //删除 已选商品字符串 末尾顿号

    console.log('已选商品字符串', selectedGoodsStr);
    console.log('已选商品数量', selectedNum);
    console.log('同济市场选购商品总价', totalPrice);

    this.setData({
      selectedGoods,
      selectedGoodsStr,
      selectedNum,
      totalPrice
    })

    this.selNumHeight(); //设置已选商品数量盒子高度
  },
  sure: function () { //确定按钮
    let selectedGoods = this.data.selectedGoods; //已选商品
    let marketSelGoods = [];
    let selectedGoodsStr = this.data.selectedGoodsStr; //已选商品字符串（即帮我买 已选购商品）
    let totalPrice = this.data.totalPrice; //同济市场选购商品总价

    // 清空 已选商品中的空值 并转为字符串
    selectedGoods.forEach(value => {
      if (value != '') {
        marketSelGoods.push(value)
      }
    })
    marketSelGoods = JSON.stringify(marketSelGoods);

    wx.setStorageSync('marketSelGoods', marketSelGoods); //放入缓存 已选商品
    wx.setStorageSync('marketDetail', selectedGoodsStr); //放入缓存 已选商品字符串
    wx.setStorageSync('marketPrice', totalPrice); //放入缓存 同济市场选购商品总价

    wx.showToast({
      title: '选购成功',
      success() {
        wx.switchTab({
          url: '/pages/index/index'
        })
      }
    })
  }
})