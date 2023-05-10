// pages/main-music/main-music.js
import { getMusicBanner, getSongMenuList } from "../../services/music"
import recommendSong from "../../store/recommendStore"
import querySelect from "../../utils/query-select"
import playerStore from "../../store/playerStore"
import rankingStore from "../../store/rankingStore"
// import throttle from "../../utils/throttle"
import { throttle } from "underscore"
import recommendSongs from "../../store/recommendStore"

const querySelectThrottle = throttle(querySelect, 100)
const app = getApp()

Page({
  data: {
    searchValue: "",
    banners: [],
    bannerHeight: 0,
    screenWidth: 375,

    recommendSongs: [],

    // 歌单数据
    hotMenuList: [],
    recMenuList: [],
    // 巅峰榜数据
    isRankingData: false,
    rankingInfos: {},

    // 当前正在播放的歌曲信息
    currentSong: {},
    isPlaying: false
  },

  onLoad() {
    this.fetchMusicBanner()
    // this.fetchRecommendSongs()
    this.fetchSongMenuList()

    // 发起action
    recommendSong.onState("recommendSongInfo", this.handleRecommendSongs)
    recommendSongs.dispatch("fetchRecommendSongsAction")
    rankingStore.onState("newRanking", this.handleNewRanking)
    rankingStore.onState("originRanking", this.handleOriginRanking)
    rankingStore.onState("upRanking", this.handleUpRanking)
    // rankingStore.onState("newRanking", this.getRankingHanlder("newRanking"))
    // rankingStore.onState("originRanking", this.getRankingHanlder("originRanking"))
    // rankingStore.onState("upRanking", this.getRankingHanlder("upRanking"))
    rankingStore.dispatch("fetchRankingDataAction")

    playerStore.onStates(["currentSong", "isPlaying"], this.handlePlayInfos)

    // 获取屏幕的尺寸
    this.setData({ screenWidth: app.globalData.screenWidth })
  },

  // 网络请求的方法封装
  async fetchMusicBanner() {
    const res = await getMusicBanner()
    this.setData({ banners: res.banners })
  },

  // async fetchRecommendSongs() {
  //   const res = await getPlaylistDetail(3778678)
  //   const playlist = res.playlist
  //   const recommendSongs = playlist.tracks.slice(0, 6)
  //   this.setData({ recommendSongs })
  // },

  async fetchSongMenuList() {
    getSongMenuList().then(res => {
      this.setData({ hotMenuList: res.playlists })
    })
    getSongMenuList("华语").then(res => {
      this.setData({ recMenuList: res.playlists })
    })
  },

  // 界面的事件监听方法
  onSearchClick() {
    wx.navigateTo({url: '/pages/datail-search/detail-search'})
  },
  onBannerImageLoad(event) {
    // 获取image组件的高度
    // const query = wx.createSelectorQuery()
    // query.select(".banner-image").boundingClientRect()
    // query.exec((res => {
    //   console.log(res);
    //   this.setData({ bannerHeight: res[0].height })
    // }))

    querySelectThrottle(".banner-image").then(res => {
      this.setData({ bannerHeight: res[0].height })
    })
  },
  onRecommendMoreClick() {
    wx.navigateTo({
      url: '/pages/detail-song/detail-song?type=recommend',
    })
  },
  onSongItemTap(event) {
    const index = event.currentTarget.dataset.index
    playerStore.setState("playSongList", this.data.recommendSongs)
    playerStore.setState("playSongIndex", index)
  },

  onPlayOrPauseBtnTap() {
    playerStore.dispatch("playMusicStatusAction")
  },

  onPlayBarAlbumTap() {
    wx.navigateTo({
      url: '/pages/music-player/music-player',
    })
  },

  // ===================== 从Store中获取数据 =====================
  handleRecommendSongs(value) {
    if (!value.tracks) return
    this.setData({ recommendSongs: value.tracks.slice(0, 6) })
  },

  handleNewRanking(value) {
    // console.log("新歌榜", value);
    if (!value.name) return
    const newRankingInfos = { ...this.data.rankingInfos, newRanking: value }
    this.setData({ rankingInfos: newRankingInfos })
  },
  handleOriginRanking(value) {
    // console.log("原创榜", value);
    if (!value.name) return
    this.setData({ isRankingData: true })
    const newRankingInfos = { ...this.data.rankingInfos, originRanking: value }
    this.setData({ rankingInfos: newRankingInfos })
  },
  handleUpRanking(value) {
    // console.log("飙升榜", value);
    if (!value.name) return
    this.setData({ isRankingData: true })
    const newRankingInfos = { ...this.data.rankingInfos, upRanking: value }
    this.setData({ rankingInfos: newRankingInfos })
  },

  // 可以将上面三个函数封装成一个函数
  // getRankingHanlder(ranking) {
  //   return value => {
  //     const newRankingInfos = { ...this.data.rankingInfos, [ranking]: value }
  //     this.setData({ rankingInfos: newRankingInfos })
  //   }
  // },

  handlePlayInfos({ currentSong, isPlaying }) {
    if (currentSong) {
      this.setData({ currentSong })
    }
    if (isPlaying !== undefined) {
      this.setData({ isPlaying })
    }
  },
  
  onUnload() {
    recommendSong.offState("recommendSong", this.handleRecommendSongs)

    rankingStore.offState("newRanking", this.handleNewRanking)
    rankingStore.offState("originRanking", this.handleOriginRanking)
    rankingStore.offState("upRanking", this.handleUpRanking)

    playerStore.offState(["currentSong", "isPlaying"], this.handlePlayInfos)
  }
})