// components/stepper/stepper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pid: {
      type: Number,
      value: 0
    }, //当前商品id
    pdetail: {
      type: String,
      value: ''
    }, //当前商品 名称、重量
    pname:{
      type:String,
      value:''
    },//当前商品 名称
    pweight:{
      type:Number,
      value:0
    },//当前商品 重量
    price: {
      type: Number,
      value: 0
    } //当前商品数量
  },

  /**
   * 组件的初始数据
   */
  data: {
    num: 0, //数值
    minusStatus: 'disabled' //减号按钮样式
  },

  /**
   * 组件挂载后执行
   */
  ready: function () {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindMinus: function () { //减号按钮
      let num = this.data.num;

      if (num >= 1) {
        num--;
      }

      let minusStatus = num < 1 ? 'disabled' : ''; //减号按钮状态

      this.setData({
        num,
        minusStatus
      })

      this.returnGood(); //返回商品
    },
    bindPlus: function () { //加号按钮
      let num = this.data.num;

      num++;

      let minusStatus = num >= 1 ? '' : 'disabled'; //减号按钮状态

      this.setData({
        num,
        minusStatus
      })

      this.returnGood(); //返回商品
    },
    bindManual: function (e) { //输入框
      let num = e.detail.value;
      let minusStatus = num < 1 ? 'disabled' : ''; //减号按钮状态

      this.setData({
        num,
        minusStatus
      })
    },
    returnGood: function () { //返回商品
      let pid = this.data.pid; //当前商品id
      let pdetail = this.data.pdetail; //当前商品 名称、重量
      let pname = this.data.pname;//当前商品 名称
      let pweight = this.data.pweight;//当前商品 重量
      let price = this.data.price; //当前商品价格
      let num = this.data.num;
      let goodInfo = {
        'pid': pid,
        'pdetail': pdetail,
        'pname':pname,
        'pweight':pweight,
        'price': price,
        'num': num
      };

      this.triggerEvent('goodInfo', goodInfo);
    }
  }
})