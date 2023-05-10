// components/menu-area/menu-area.js
const app = getApp()

Component({
  properties: {
    title: {
      type: String,
      value: "啥也没有"
    },
    menuList: {
      type: Array,
      value: []
    }
  },
  data: {
    screenWidth: 375
  },

  lifetimes: {
    attached() {
      this.setData({ screenWidth: app.globalData.screenWidth })
    }
  },
  methods: {
    onMenuMoreClick() {
      wx.navigateTo({
        url: '/pages/detail-menu/detail-menu',
      })
    }
  }
})
