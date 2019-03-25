const showLoading = (tip="正在加载")=>{
  wx.showLoading({
    title: tip,
    mask:true
  })
} 
const fail = function (tip="加载失败"){
  wx.hideLoading();
  wx.showToast({
    title: tip,
    icon:'none'
  })
}

module.exports = {
  showLoading:showLoading,
  fail:fail,
  url:'http://appserver.fecshoptest.com/'
}
