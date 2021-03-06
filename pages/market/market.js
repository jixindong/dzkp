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
    marketBanner: '',
    goods: [], //商品
    selectedGoods: [], //已选商品
    selectedGoodsStr: '', //已选商品字符串（即帮我买 已选购商品）
    selectedNum: 0, //已选商品数量
    selectedWeight: 0, //已选商品重量
    selectedNumHeight: '', //已选商品数量盒子高度
    totalPrice: '0', //同济市场选购商品总价
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
    this.getMarketBanner(); //获取 市场banner
    this.getMarketGoods(); //获取 市场商品
    this.calcMinHeight(); //设置当前选项卡最小高度
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
        height: rect.height + 70 + 'px'
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
  calcPrice: function (e) { //更新 已选商品、计算总价
    let selectedGoods = this.data.selectedGoods; //已选商品
    let selectedGoodsStr = ''; //已选商品字符串（即帮我买 已选购商品）
    let selectedNum = 0; //已选商品数量
    let selectedWeight = 0; //已选商品重量
    let totalPrice = 0; //同济市场选购商品总价
    let pid = e.detail.pid; //当前商品id
    let pdetail = e.detail.pdetail; //当前商品 名称、重量
    let pname = e.detail.pname; //当前商品 名称
    let pweight = e.detail.pweight; //当前商品 重量
    let num = e.detail.num; //当前商品数量
    let price = e.detail.price; //当前商品价格

    //更新 已选商品
    let flag = true;
    selectedGoods.forEach(value => {
      if (value.pid == pid) {
        flag = false;
        value.num = num;
      }
    })
    if (flag) {
      selectedGoods.push({
        pid,
        num,
        pdetail,
        pname,
        pweight,
        price
      })
    }
    console.log('已选商品', selectedGoods);

    // 更新 已选商品字符串（即帮我买 已选购商品）、已选商品数量、根据已选商品计算总价
    selectedGoods.forEach(value => {
      if (value.num != 0) {
        selectedGoodsStr += value.pname + ' ' + value.pweight + '公斤 ' + 'x' + value.num + '、'; // 更新 已选商品字符串（即帮我买 已选购商品）
        selectedNum += value.num; //更新 已选商品数量
        selectedWeight += value.num * parseFloat(value.pweight); //更新 已选商品重量
        totalPrice += (value.price * value.num); // 根据已选商品计算总价
      }
    })
    selectedGoodsStr = selectedGoodsStr.slice(0, selectedGoodsStr.length - 1); //删除 已选商品字符串 末尾顿号
    // console.log('已选商品字符串', selectedGoodsStr);
    // console.log('已选商品数量', selectedNum);
    // console.log('已选商品重量', selectedWeight);
    // console.log('同济市场选购商品总价', totalPrice.toFixed(2));
    this.setData({
      selectedGoods,
      selectedGoodsStr,
      selectedNum,
      selectedWeight: parseFloat(selectedWeight).toFixed(2),
      totalPrice: parseFloat(totalPrice).toFixed(2)
    })

    this.selNumHeight(); //设置已选商品数量盒子高度
  },
  sure: function () { //确定按钮
    let selectedGoods = this.data.selectedGoods; //已选商品
    let selectedGoodsStr = this.data.selectedGoodsStr; //已选商品字符串（即帮我买 已选购商品）
    let totalPrice = this.data.totalPrice; //同济市场选购商品总价

    wx.setStorageSync('marketSelGoods', selectedGoods); //放入缓存 已选商品
    wx.setStorageSync('marketDetail', selectedGoodsStr); //放入缓存 已选商品字符串
    wx.setStorageSync('selectedWeight', this.data.selectedWeight); //放入缓存 已选商品重量
    wx.setStorageSync('marketPrice', totalPrice); //放入缓存 同济市场选购商品总价

    wx.showToast({
      title: '选购成功',
      success() {
        wx.switchTab({
          url: '/pages/index/index'
        })
      }
    })
  },
  getMarketBanner: function () { //获取 市场banner
    let that = this;
    wx.request({
      url: 'https://daizongpaotui.zlogic.cn/index.php/api/shouye/index',
      method: 'POST',
      data: {
        token: ''
      },
      success: function (res) {
        that.setData({
          marketBanner: 'https://daizongpaotui.zlogic.cn' + res.data.nongmao
        })
      }
    })
  },
  getMarketGoods: function () { //获取 市场商品
    let that = this;
    let marketSelGoods = wx.getStorageSync('marketSelGoods'); //已选商品
    let selectedNum = 0; //已选商品数量
    let selectedWeight = 0; //已选商品重量
    let totalPrice = 0; //同济市场选购商品总价

    if (marketSelGoods) {
      // 更新已选商品字符串（即帮我买 已选购商品）、更新已选商品数量、根据已选商品计算总价
      marketSelGoods.forEach(value => {
        if (value.num != 0) {
          selectedNum += value.num; //更新已选商品数量
          selectedWeight += value.num * parseFloat(value.pweight); //更新已选商品重量
          totalPrice += (value.price * value.num); // 根据已选商品计算总价
        }
      })

      that.setData({
        selectedGoods: marketSelGoods,
        selectedNum,
        selectedWeight,
        totalPrice: parseFloat(totalPrice).toFixed(2)
      })
      that.selNumHeight(); //设置已选商品数量盒子高度
    }

    wx.request({ //获取 商品列表
      url: 'https://daizongpaotui.zlogic.cn/index.php/api/productlist/index',
      success: function (res) {
        if (res.data) {
          res.data.forEach(value => {
            if (value.child) {
              value.child.forEach(value => {
                value.goodImgs = value.photoimages.split(',');
                value.zhongliang = value.zhongliang / 1000;
              })
            }
          })
        }
        console.log('商品列表', res.data);

        res.data.forEach(value => {
          value.child.forEach(value => {
            value.num = 0;
          })
        })

        if (marketSelGoods) {
          marketSelGoods.forEach(value => {
            let pid = value.pid;
            let num = value.num;

            res.data.forEach(value => {
              value.child.forEach(value => {
                if (value.id == pid) {
                  value.num = num;
                }
              })
            })
          })
        }
        that.setData({
          goods: res.data
        })
        that.swiperHeight(); //设置当前选项卡高度
      }
    })
  },
  goodImg: function (e) { //查看 商品图片
    let imgUrl = e.currentTarget.dataset.img;
    let urls = [];

    for (let i = 0; i < imgUrl.length; i++) {
      urls[i] = 'https://daizongpaotui.zlogic.cn' + imgUrl[i];
    }
    wx.previewImage({
      urls: urls,
      current: urls[0]
    })
  }
})