/*
import { media } from '@kit.MediaKit'
import { GlobalMusic } from '../models/globalMusic'
import { SongItemType } from '../models/music'
import { AppStorageV2 } from '@kit.ArkUI'
import { identifier } from '@kit.AdsKit'
import { sessionManager } from './AvSessionManager'


class AvPlayerManager {
  //属性＋方法
  //播放器
  player: media.AVPlayer | null = null

  //共享播放数据
  currentSong: GlobalMusic = AppStorageV2.connect(GlobalMusic,'SONG_KEY',()=>new GlobalMusic())!


  //定义方法 创建播放器  +  监听播放器的状态
  async init () {
    if (!this.player) {
      this.player = await media.createAVPlayer()
    }

    this.player.on('stateChange',(State) => {
      if (State === 'initialized') {
        this.player?.prepare()
      }else if (State === 'prepared') {
        this.player?.play()
        this.currentSong.isPlay = true
      }else if (State === 'completed') {
        this.nextPlay(true) //自动下一首
      }else if(State === 'released'){
        this.currentSong.reset()
      }
    })


    //时间变化
    this.player.on('durationUpdate',(duration)=>{
      this.currentSong.duration = duration
      sessionManager.setAVMetadata(this.currentSong.playList[this.currentSong.playIndex])
    })
    this.player.on('timeUpdate',(time)=>{
      this.currentSong.time = time
      sessionManager.setAVPlayBackState()

    })

  }

  // // 播放歌曲 设置播放资源处
  // singPlay (song: SongItemType){
  //   this.player!.url = song.url
  //   this.currentSong.img = song.img
  // }

  singPlay (song: SongItemType){
    // 当播放器运行时，直接申请长时任务
    sessionManager.startBackgroundTask()
    sessionManager.setAVPlayBackState()
    //是否在列表 some检查数组里面的数据是否满足条件 -》 只要有一个满足some 返回true
    const inList = this.currentSong.playList.some((item) => item.id === song.id)
    if (inList) {
      //歌曲在列表里 1看是否属于正在播放的歌曲 是的话接着播放 不是的换就切歌
      if (this.currentSong.url === song.url) {
        this.player?.play()
        this.currentSong.isPlay = true

      }else {
        //不是正在播放的歌 那么进行切歌  findIndex 意为查找索引 括号内为判断语句
        this.currentSong.playIndex = this.currentSong.playList.findIndex(item => item.id === song.id)
        //此时索引已经找到，准备切歌
        this.changSong()
      }
    }else {
      // 不在列表里，添加到列表+切换歌曲
      // unshift 意为将某个值加到数组最前边
      this.currentSong.playList.unshift(song)
      this.currentSong.playIndex = 0
      //此时索引为零 定位为第一个 所以准备切歌
      this.changSong()
    }
  }


  //  跳转进度 seek
  seekPlay(value:number){
    this.player?.seek(value)
  }

  // 切歌方法
  async changSong() {
    await this.player?.reset() //重置
    this.currentSong.duration = 0 //歌曲总时长设置为零
    this.currentSong.time = 0 //当前播放时间设置为零
    this.currentSong.img = this.currentSong.playList[this.currentSong.playIndex].img //图片赋值过来
    this.currentSong.name = this.currentSong.playList[this.currentSong.playIndex].name //歌曲名字
    this.currentSong.author = this.currentSong.playList[this.currentSong.playIndex].author //歌曲作者
    this.currentSong.url = this.currentSong.playList[this.currentSong.playIndex].url //歌曲音频
    this.player!.url = this.currentSong.url //播放器的url也要进行更换

  }


  // 暂停歌曲
  paused() {
    this.player?.pause() //播放器暂停
    this.currentSong.isPlay = false //状态也同步设置为暂停
    sessionManager.setAVPlayBackState()

  }

  // 上一首
  prevPlay(){
    if (this.currentSong.playMode === 'random') {
      this.currentSong.playIndex = Math.floor(Math.random()*this.currentSong.playList.length)//Math.floor() 指向下取整 如4.5为4
    }else {
      this.currentSong.playIndex--
      if (this.currentSong.playIndex < 0) {
        this.currentSong.playIndex = this.currentSong.playList.length - 1
      }
    }

    this.singPlay(this.currentSong.playList[this.currentSong.playIndex])
  }

  // 下一首 搞if语句 判断三种播放的情况 有随机播放 单曲混合 列表顺序播放
  // 重复播放则播放模式为repeat 并且播放器自动下一首 complete传入一个数据true则表示是自动播放
  // 随机播放则索引随机
  nextPlay(autoNextPlay?:boolean) {
    if (this.currentSong.playMode === 'repeat' && autoNextPlay) {
      // 真的重复 则 索引不变
      this.currentSong.playIndex = this.currentSong.playIndex
    }else if (this.currentSong.playMode === 'random') {
      // 随机播放
      // Math.random() 指 [0,1)随机小数
      this.currentSong.playIndex = Math.floor(Math.random()*this.currentSong.playList.length)//Math.floor() 指向下取整 如4.5为4
    }else {
      //列表播放
      this.currentSong.playIndex++
      // 如果当前的歌曲索引被加到超过了该歌曲列表的最大长度，则索引变为0跑到第一曲
      if (this.currentSong.playIndex >= this.currentSong.playList.length) {
        this.currentSong.playIndex = 0
      }
    }

    this.singPlay(this.currentSong.playList[this.currentSong.playIndex])

  }

  // 列表移除歌曲
  removeSong (index:number) {
    if (index === this.currentSong.playIndex) {
      // 此时删除的是正在播放的歌曲
      if (this.currentSong.playList.length > 1) {
        // 列表里面有多首歌
        this.currentSong.playList.splice(index,1)
        // 播放索引如果大于等于了长度，回第一首播放
        if (this.currentSong.playIndex >= this.currentSong.playList.length) {
          this.currentSong.playIndex = 0
        }
        this.singPlay(this.currentSong.playList[this.currentSong.playIndex])
      }else {
       // 列表里面只有一首歌
        // 数据跟播放器都要重置
        this.player?.reset()
        this.currentSong.reset()
        // this.currentSong.playList.pop()


      }
    }else {
      // 否则删除的不是正在播放的歌曲
      if (index < this.currentSong.playIndex) {
        // 要删除的歌曲在正在播放歌曲的前面
        this.currentSong.playIndex--
      }

      // 移除列表中刚刚删除的歌曲
      this.currentSong.playList.splice(index,1)//根据所有index删除1个
    }
  }

  // 释放播放器 和 播放数据
  async release(){
    await this.player?.release()
  }

}

export const playerManager: AvPlayerManager = new AvPlayerManager()*/
