// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pic:wx.getStorageSync('avatarUrl'),
    signShow:true
  },
  sign_out:function(){
    wx.removeStorage({
      key: 'access-token',
      success: function(res) {
        wx.navigateTo({
          url: '/pages/Login/Login',
        })
      },
    }),
    wx.removeStorageSync('uuid')
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
    if(wx.getStorageSync('access-token')){
      this.setData({
        signShow:false
      })
    }else{
      this.setData({
        signShow:true
      })
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