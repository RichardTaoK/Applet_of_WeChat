const util = require('../../utils/util.js');
// pages/product-show/product-show.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    bannerImg: null,
    product: null,
    prices: null,
    options: null,
    button: 'descript',
    sku_num: 1,
    items_count:0,
    animote_drop:false
  },
  
  addToFavorite: function () {
    util.showLoading(),
      wx.request({
        url: util.url + 'catalog/product/favorite',
        data: {
          product_id: this.data.id
        },
        header: {
          "access-token": wx.getStorageSync('access-token')
        },
        success: res => {
          wx.hideLoading();
          if (res.data.code === 200) {
            wx.showToast({
              title: '收藏成功',
              icon: "success",
            })
          }
          else if (res.data.code === 1100003) {
            wx.navigateTo({
              url: '/pages/Login/Login'
            })
          }
        },
        fail: () => util.fail()
      })
  },
  changeOption: function (e) {
    this.setData({
      id: e.currentTarget.dataset.key
    }),
      this.fetchData()
  },
  subSkuNum: function () {
    if (this.data.sku_num > 1) {
      this.setData({
        sku_num: this.data.sku_num - 1
      })
    }
  },
  addSkuNum: function () {
    if (this.data.sku_num < 100) {
      this.setData({
        sku_num: this.data.sku_num + 1
      })
    }
  },
  setSkuNum: function (e) {
    console.log(e),
      this.setData({
        sku_num: Number(e.detail.value)
      })
  },
  fetchData: function () {
    util.showLoading(),
      wx.request({
        url: util.url + 'catalog/product/index',
        data: {
          product_id: this.data.id
        },
        success: res => {
          console.log(res),
            wx.hideLoading(),
            this.setData({
              product: res.data.data.product,
              bannerImg: res.data.data.product.image_detail,
              prices: res.data.data.product.price_info,
              options: res.data.data.product.options,
              items_count:wx.getStorageSync('items_count')
            })
        },
        fail: () => util.fail()
      })
  },
  dec: function (e) {

    this.setData({
      button: e.currentTarget.dataset.key
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id || '57bab0d5f656f2940a3bf56e'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  addToCart: function () {
    util.showLoading(),
      wx.request({
        method: 'POST',
        url: util.url + 'checkout/cart/add',
        data: {
          custom_option: {},
          product_id: this.data.id,
          qty: this.data.sku_num
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          "access-token": wx.getStorageSync('access-token'),
          'fecshop-uuid': wx.getStorageSync('uuid')
        },
        success: res => {
          wx.hideLoading();
          if (res.data.code === 200) {
            let v = res.data.data.items_count;
            wx.showToast({
              title: '加入成功',
              icon: 'success',
              duration: 300
            })
            wx.setStorageSync('items_count', v)
            this.setData({
              items_count:v,
              animote_drop:true
            })
          }
          else if (res.data.code === 1100003) {
            wx.navigateTo({
              url: '/pages/Login/Login'
            })
          }
        },
        fail: () => util.fail()
      })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(!wx.getStorageSync("access-token")){
      wx.navigateTo({
        url: '/pages/Login/Login',
      })
    }else{
      if (!this.data.product) {
        this.fetchData()
      };
      if(wx.getStorageSync('items_count')){
        this.setData({
          item_count:wx.getStorageSync("items_count")
        })
      }
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

  }
})