const util = require("../../utils/util.js");
// pages/Login/Login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData:{
      email: null,
      password: null,
      firstname: null,
      lastname: null
      // captcha: null
    },
    formLoginData:{
      email: null,
      password: null
    },
    // captchaPic:null,
    navSelect:'login',

  },
  selected:function(e){
    this.setData({
      navSelect:e.currentTarget.dataset.key
    })
  },
  updataFormData:function(e){
    let o = this.data.formData;
    o[e.currentTarget.dataset.key] = e.detail.value;
    this.setData({
      formData:o
    })
  }, 
  loginFormData:function(e){
    let ob = this.data.formLoginData;
    ob[e.currentTarget.dataset.key] = e.detail.value;
    this.setData({
      formLoginData: ob
    })
  },
  // captchaImg:function(){
  //   wx.request({
  //     url: util.url +'customer/site/captcha',
  //     success:res=>{
  //       this.setData({
  //         captchaPic:res.data.data.image
  //       })
  //     },
  //     fail:()=>util.fail
  //   })
  // },
  submit:function(){
    util.showLoading(),
    wx.request({
      url: util.url+'customer/register/account',
      method:'POST',
      header:{
        'fecshop-uuid':wx.getStorageSync('uuid'),
        'Content-Type':'application/x-www-form-urlencoded'
      },
      data:this.data.formData,
      success:res=>{
        wx.hideLoading();
        if(res.data.code==200 || res.data.code == 0){
          wx.setStorageSync('uuid', res.header['Fecshop-Uuid']);
          wx.setStorage({
            key: 'access-token',
            data: res.header['Access-Token'],
            success:function(){
              wx.navigateBack()
            }
          })
        }else{
          wx.showToast({
            title: res.data.data.error,
            icon:'none'
          })
        }
      },
      fail:()=>util.fail()
    })
  },
  loginSubmit:function(){
    util.showLoading(),
      wx.request({
        url: util.url + 'customer/login/account',
        method: 'POST',
        header: {
          'access-token': wx.getStorageSync('access-token'),
          'fecshop-uuid':wx.getStorageSync('uuid'),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: this.data.formLoginData,
        success: res => {
          wx.hideLoading()
          if (res.data.code == 200 || res.data.code == 0) {
            wx.setStorageSync('uuid', res.header['Fecshop-Uuid']);
            wx.setStorage({
              key: 'access-token',
              data: res.header['Access-Token'],
              success:function(){
                wx.navigateBack({
                  delta:2
                })
              }
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
    // this.captchaImg()
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