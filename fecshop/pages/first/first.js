// pages/first/first.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null
  },

  setUserInfo:function(){
    
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
    
      wx.getUserInfo({
        lang: 'zh_CN',
        success: res => {
          console.log(res);
          this.setData({
            userInfo:res.userInfo
          }),
          wx.setStorage({
            key: 'avatarUrl',
            data: res.userInfo.avatarUrl,
            success:function(){
              wx.reLaunch({
                url: '/pages/index/index',
              })
            }
          })
        }
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
  
  }
})