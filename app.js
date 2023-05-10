// app.js
App({
  globalData: {
    screenWidth: 375,
    screenHeight: 667,

    statusHeight: 20,
    contentHeight: 500
  },
  onLaunch() {
    // 1. 获取屏幕的尺寸
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.screenWidth = res.screenWidth
        this.globalData.screenHeight = res.screenHeight
        this.globalData.statusHeight = res.statusBarHeight
        this.globalData.contentHeight = res.screenHeight - res.statusBarHeight - 44
      }
    })
  }
})
