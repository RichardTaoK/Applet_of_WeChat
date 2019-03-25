// pages/favorite/favorite.js
const util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    favorite_list: null,
  },
  showDetail:function(e){
    wx.navigateTo({
      url: '/pages/product-show/product-show?id='+e.currentTarget.dataset.id,
    })
  },
  fetchData: function () {
    util.showLoading(),
      wx.request({
        url: util.url + 'customer/productfavorite/index',
        header: {
          'fecshop-uuid': wx.getStorageSync('uuid'),
          'access-token': wx.getStorageSync('access-token'),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: res => {
          wx.hideLoading();
          if (res.data.code == 1100003) {
            wx.navigateTo({
              url: '/pages/Login/Login',
            })
          }
          else {
            this.setData({
              favorite_list: res.data.data.productList
            })
          }
        },
        fail: () => util.fail()
      })
  },
  removeFavoriteProduct: function (e) {

    wx.request({
      method: 'POST',
      url: util.url + 'customer/productfavorite/remove',
      data: {
        favorite_id: e.currentTarget.dataset.key
      },
      header: {
        'fecshop-uuid': wx.getStorageSync('uuid'),
        'access-token': wx.getStorageSync('access-token'),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        if (res.data.code === 200) {
          wx.showToast({
            title: '删除成功',
            icon: 'none'
          }),
            console.log(res),
            this.fetchData();
        } else if (res.data.code === 1100003) {
          wx.navigateTo({
            url: '/pages/Login/Login'
          })
        }

      },
      fail: () => util.fail()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    if (!this.data.favorite_list) {
      this.fetchData()
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