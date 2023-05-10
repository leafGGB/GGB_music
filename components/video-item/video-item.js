// components/video-item/video-item.js
Component({
  properties: {
    itemData: {
      type: Object,
      value: {}
    }
  },
  methods: {
    // 视频页面跳转第二种方法
    onItemTap() {
      const item = this.properties.itemData
      wx.navigateTo({
        url: `/packageVideo/pages/detail-video/detail-video?id=${item.id}`,
      })
    }
  }
})
