// pages/datail-search/detail-search.js
import { getHotList, getSuggestion } from "../../services/search"

Page({
  data: {
    hotLists: [],
    hisWords: [],
    keywords: "",
    options: ""
  },
  onLoad(options) {
    this.getHotListAction()
    
  },

  async getHotListAction() {
    const hotList = await getHotList()
    this.setData({ hotLists: hotList.data })
  },
  async getSuggestionAction(keywords) {
    const suggestion = await getSuggestion(keywords)
    if (suggestion.result.albums && suggestion.result.artists && suggestion.result.songs) {
      const suggLists = [suggestion.result.albums, suggestion.result.artists, suggestion.result.songs]
      const itemList = []
      for (const items of suggLists) {
        for (const item of items) {
          itemList.push(item)
        }
      }
      this.setData({ options: itemList })
    } else {
      console.log("获取数据失败");
    }
  },

  onHotItemClick(event) {
    const hisName = event.currentTarget.dataset.hotitem

    const index = this.data.hisWords.indexOf(hisName)
    if(index!==-1){
      this.data.hisWords.splice(index,1)
    }

    this.setData({ hisWords: [hisName, ...this.data.hisWords] })
  },

  ondetailClick() {
    this.setData({ hisWords: "" })
  },
  onChangeClick(event) {
    const keywords = event.detail
    
    if(keywords !== "") {
      this.getSuggestionAction(keywords)
    }
    this.setData({ keywords })
  }
})