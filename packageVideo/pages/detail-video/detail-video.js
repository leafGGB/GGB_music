// pages/detail-video/detail-video.js
import { getMVUrl, getMVInfo, getMVRelated } from "../../../services/video"
Page({
  data: {
    id: 0,
    mvUrl: "",
    mvInfo: {},
    relatedVideo: [],
    danmuList: [
      { text: "哎呀妈呀", color: "#ff0000", time: 2 },
      { text: "wc有蚊子", color: "#ffff00", time: 7 },
      { text: "GGB", color: "#0000ff", time: 5 },
    ]
  },
  onLoad(options) {
    // 获取id
    const id = options.id
    this.setData({ id })

    // 2. 请求数据
    this.fetchMVurl()
    this.fetchMVInfo()
    this.fetchMVRelated()
  },

  async fetchMVurl() {
    const res = await getMVUrl(this.data.id)
    this.setData({ mvUrl: res.data.url })
  },
  async fetchMVInfo() {
    const res = await getMVInfo(this.data.id)
    this.setData({ mvInfo: res.data })
  },
  async fetchMVRelated() {
    const res = await getMVRelated(this.data.id)
    this.setData({ relatedVideo: res.data })
  }
})