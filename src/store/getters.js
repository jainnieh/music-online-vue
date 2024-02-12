
// audio元素
import {getCustomList} from "@/utils/storage";

export const audioEle = (state) => state.audioEle
// 播放模式
export const mode = (state) => state.mode
// 播放状态
export const playing = (state) => state.playing
// 播放列表
export const playlist = (state) => state.playlist
// 顺序列表
export const orderList = (state) => state.orderList
// 当前音乐索引
export const currentIndex = (state) => state.currentIndex
// 当前音乐
export const currentMusic = (state) => {
  console.log('getters currentMusic')
  return state.playlist[state.currentIndex] || {}
}
// 播放历史列表
export const historyList = (state) => state.historyList
// 网易云用户UID
export const uid = (state) => state.uid
// 评论开关
export const commentOpen = (state) => state.commentOpen
// 自定义歌单
export const customMusicList = (state) => {
  console.log('customMusicList customMusicList')
  // return '1212'
  return getCustomList(state.customListId)
}
// 歌单映射表
export const musicListMap = (state) => state.musicListMap
// 添加歌曲到歌单的结果信息
export const manageCustomMusicListRes = (state) => state.manageCustomMusicListRes
