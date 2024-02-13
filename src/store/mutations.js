import * as types from './mutation-types'
import {delMusicList, getMusicListMap} from "@/utils/storage";

const mutations = {
  // 修改audio元素
  [types.SET_AUDIOELE](state, audioEle) {
    state.audioEle = audioEle
  },
  // 修改播放模式
  [types.SET_PLAYMODE](state, mode) {
    state.mode = mode
  },
  // 修改播放状态
  [types.SET_PLAYING](state, playing) {
    state.playing = playing
  },
  // 修改播放列表
  [types.SET_PLAYLIST](state, playlist) {
    console.log('mutation 修改playlist')
    state.playlist = playlist
  },
  // 修改顺序列表
  [types.SET_ORDERLIST](state, orderList) {
    state.orderList = orderList
  },
  // 修改当前音乐索引
  [types.SET_CURRENTINDEX](state, currentIndex) {
    console.log('mutation 修改当前音乐索引')
    state.currentIndex = currentIndex
  },
  // 修改播放历史列表
  [types.SET_HISTORYLIST](state, historyList) {
    state.historyList = historyList
  },
  // 修改网易云用户UID
  [types.SET_UID](state, uid) {
    state.uid = uid
  },
  SET_COMMENT_OPEN(state, commentOpen) {
    state.commentOpen = commentOpen
  },
  SET_SEARCH_AUDIO(state, targetMusic= null) {
    state.searchAudio = targetMusic
  },
  // 点击播放时, 需要为当前song添加urls
  SET_MUSIC_AUDIO_URLS(state, urls) {
    state.playlist[state.currentIndex].audioSource.urls = urls
  },


  ADD_MUSIC_LIST_TO_LOCAL(state, res) {
    state.manageMusicListRes = res
    state.musicListMap = getMusicListMap()
    console.log('state.manageMusicListRes', state.manageMusicListRes)
  },
  DEL_MUSIC_LIST(state, {platform, id}) {
    //让map重新更新
    delMusicList(platform, id)
    state.musicListMap = getMusicListMap()
  },


  // 添加歌曲到歌单
  ADD_MUSIC_TO_CUSTOM_LIST(state, res) {
    state.manageMusicListRes = res
    state.musicListMap = getMusicListMap()
  },


  SET_MANAGE_MUSIC_LIST_RES(state, flag) {
    state.manageMusicListRes = flag
  },

}

export default mutations
