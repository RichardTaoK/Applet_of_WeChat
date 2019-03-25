const util = require('../../utils/util.js');
// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: '',
    show: false,
    selectData: ['English', 'Français', 'Español', '中文'],
    currencyData: ['€EUR', '$USD', '£GBP', '￥CNY'],
    index: 0
  },
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    });
  },
  fetchData: function () {
    util.showLoading(),
      wx.request({
        url: 'http://appserver.fecshoptest.com/',
        success: res => {
          wx.hideLoading(),
            this.setData({
              result: res.data.data
            })
        },
        fail: () =>util.fail()
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
    if (!this.data.result) {
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