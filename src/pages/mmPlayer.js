import { PLAY_MODE } from '@/config'

// 重试次数
let retry = 1

// 下面是在给audio元素绑定事件的回调函数. 这些事件大多是自动触发的.
//触发这些事件的函数有: audio.play()/pause()/load()
const mmPlayerMusic = {
  initAudio(that) {
    console.log('init-----, retry=', retry)
    const ele = that.audioEle
    // 音频缓冲事件
    ele.onprogress = () => {
      try {
        if (ele.buffered.length > 0) {
          const duration = that.currentMusic.duration
          let buffered = 0
          // ele.buffered.end(0)没看懂作用
          ele.buffered.end(0)
          buffered = ele.buffered.end(0) > duration ? duration : ele.buffered.end(0)
          // console.log('buffered=', buffered / duration)
          //console.log('duration=' ,duration)
          // console.log(buffered)
          // console.log(typeof duration)
          that.currentProgress = buffered / duration
        }
      } catch (e) {}
    }
    // 开始播放音乐
    ele.onplay = () => {
      let timer
      clearTimeout(timer)
      timer = setTimeout(() => {
        that.musicReady = true
      }, 100)
    }
    // 获取当前播放时间
    ele.ontimeupdate = () => {
      that.currentTime = ele.currentTime
    }
    // 当前音乐播放完毕
    ele.onended = () => {
      if (that.mode === PLAY_MODE.LOOP) {
        that.loop()
      } else {
        that.next()
      }
    }
    // 音乐播放出错 -- 在MDN没有看到该事件,但是能用
    ele.onerror = () => {
      console.log("------------ onerror")
      console.log(that.currentMusic)
      if (retry === 1) {
        console.log('!!!!!!!!!!!!!! 第一次, url: ', retry)
        console.log(that.currentMusic.urls[0].substring(that.currentMusic.urls[0].length - 25, that.currentMusic.urls[0].length - 10))
      }
      const urlsLength = that.currentMusic.urls.length
      if (retry >= urlsLength) {
        let toastText = '当前音乐源全部尝试, 不可播放，已自动播放下一曲'
        if (that.playlist.length === 1) {
          toastText = '歌单只有一首, 没有可播放的音乐了~'
        }
        that.$mmToast(toastText)
        console.log('*** next()')
        retry = 1
        that.next(true)
      } else {
        // eslint-disable-next-line no-console
        console.log('!!!!!!!!!!!!!! 重试一次, url: ')
        console.log(that.currentMusic.urls[retry].substring(that.currentMusic.urls[retry].length - 25, that.currentMusic.urls[retry].length - 10))
        //that.currentMusic.canUrls.push(that.currentMusic.urls[retry])
        ele.urls = that.currentMusic.urls[retry]
        console.log('change url')
        // console.dir(ele)
        ele.load()
        retry += 1
      }
      // console.log('播放出错啦！')
    }
    // 音乐进度拖动大于加载时重载音乐 -- 这个描述应该不对
/*    ele.onstalled = () => {
      ele.load()
      that.setPlaying(false)
      let timer
      clearTimeout(timer)
      timer = setTimeout(() => {
        that.setPlaying(true)
      }, 10)
    }*/
    // 将能播放的音乐加入播放历史
    ele.oncanplay = () => {
      retry = 1
      if (that.historyList.length === 0 || that.currentMusic.id !== that.historyList[0].id) {
        that.setHistory(that.currentMusic)
      }
    }
    // 音频数据不可用时
    ele.onstalled = () => {
      ele.load()
      that.setPlaying(false)
      let timer
      clearTimeout(timer)
      timer = setTimeout(() => {
        that.setPlaying(true)
      }, 10)
    }
    // 当音频已暂停时
    ele.onpause = () => {
      that.setPlaying(false)
    }
  },
}

export default mmPlayerMusic
