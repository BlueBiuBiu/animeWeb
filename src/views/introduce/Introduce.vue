<template>
  <div>
    <Top></Top>
    <div class="introduce">
      <Video v-show="isShow" :animeLink="animeLink" ref="videoPlay"></Video>
      <div class="message" v-show="!isShow">
        <img class="AnimeImg" :src="animeMessage.img" alt="">
        <div class="AnimeMessage">
          <ul>
            <li><div>{{animeMessage.name}}</div></li>
            <li><span>类型:</span> {{animeMessage.type}}</li>
            <li><span>地区:</span> {{animeMessage.place}}</li>
            <li><span>语言:</span> {{animeMessage.language}}</li>
            <li><span>年份:</span> {{animeMessage.year}}</li>
            <li><span>导演:</span> {{animeMessage.author}}</li>
            <li>
              <div v-if="!this.collect">
                <img src="~assets/img/wodezhuifan_before.svg" alt="">
                <a @click="collectClick">收藏</a>
              </div>
              <div v-else>
                <img src="~assets/img/wodezhuifan.svg" alt="">
                <a @click="collectClick">已收藏</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="video-play">
        <img src="~assets/img/liebiaodaohang_dongman.svg" alt="">
        <div>sky动漫在线观看</div>
      </div>
      <div class="play">
        <!-- <div class="play-item" v-for="item in number"><a href="">{{item}}</a></div>
         -->
         <a v-for="(item,index) in number" @click="playIndex(index)">{{item}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import Top from "components/home/Top.vue"
import Video from "components/video/Video.vue"

import {getAnimePlayIndex} from "network/home"
export default {
  name: '',
  data() {
    return {
      collect: false,
      isShow: false,
      number: [],
      animeMessage: null,
      animeLink: null
    }
  },
  created() {
    this.animeMessage = this.$store.state.animeMessage
    //console.log(this.$store.state.animeMessage);
    this.number = this.animeMessage.index.split(',')
    //console.log(this.index);
    if(this.$store.state.collectAnime != null){
      this.collect = this.$store.state.collectAnime.find(item => item.id == this.animeMessage.id).collectButton
    }
    //console.log(this.collect);
  },
  components: {
    Top,
    Video
  },
  methods: {
    collectClick(){
      if(this.$store.state.loginState == true)
      {
        this.collect = !this.collect
        if(this.collect == true){
            this.$store.commit({
            type: "collect",
            collect: this.animeMessage
          })
          if(this.$store.state.collectAnime != null){
            this.collect = this.$store.state.collectAnime.find(item => item.id == this.animeMessage.id).collectButton
          }
        }
        else{
          this.$store.commit({
            type: "cancelCollect",
            cancelCollect: this.animeMessage
          })
        }
      } 
      else{
        alert("请先登录！")
      }
    },
    playIndex(index){
      //getAnimePlayIndex(this.animeMessage.id,index);
      if(this.isShow != true){
        this.isShow = !this.isShow
      }
      getAnimePlayIndex(this.animeMessage.id,index).then( res => {
        this.animeLink = res
        console.log(this.animeLink);
      })
      this.$refs.videoPlay.playVideo();
    }

  }
}
</script>

<style scoped>
  a {
    color: black;
    text-decoration: none;
  }
  a:hover {
    color: white;
    cursor:pointer;
    background: #ff5777;
  }
  .introduce {
    margin-top: 60px;
    margin-left: 80px;
    width: 1020px;
  }
  .message {
    display: flex;
    padding-bottom: 30px;
  }
  .AnimeImg {
    width: 220px;
    height: 300px;
  }
  .AnimeMessage {
    position: relative;
  }
  .AnimeMessage li{
    list-style-type: none;
    padding: 10px;
  }
  .AnimeMessage span {
    color: #999;
    padding-right: 10px;
  }
  .AnimeMessage div {
    font-size: 20px;
  }
  .AnimeMessage img{
    position: absolute;
    top: 265px;
    width: 35px;
    height: 35px;
  }
  .AnimeMessage a {
    position: absolute;
    font-size: 15px;
    left: 100px;
    top: 275px;
    color: #999;
  }
  .video-play {
    display: flex;
    margin-top: 20px;
    font-size: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid rgba(100, 100, 100, .1);
  }
  .video-play img{
    width: 30px;
    height: 30px;
    padding-right: 10px;
  }
  .play {
    width: 1020px;
    height: 200px;
    overflow: scroll;
    margin-top: 10px;
  }
  .play a {
    text-align: center;
    display: inline-block;
    width: 130px;
    height: 30px;
    line-height: 30px;
    border-radius: 5px;
    border: 1px solid rgba(100, 100, 100, .1);
    margin-right: 10px;
    margin-top: 10px;
  }
</style>
