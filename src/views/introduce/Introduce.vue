<template>
  <div>
    <Top></Top>
    <div class="introduce">
      <div class="message" v-for="item in AnimeMessage">
        <img class="AnimeImg" :src="item.src" alt="">
        <div class="AnimeMessage">
          <ul>
            <li><div>{{item.animeName}}</div></li>
            <li><span>类型:</span> {{item.type}}</li>
            <li><span>地区:</span> {{item.birth}}</li>
            <li><span>语言:</span> {{item.language}}</li>
            <li><span>年份:</span> {{item.year}}</li>
            <li><span>导演:</span> {{item.author}}</li>
            <li>
              <div v-if="!collect">
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
         <a v-for="item in number">{{item}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import Top from "components/home/Top.vue"
export default {
  name: '',
  data() {
    return {
      collect: false,
      number: ['第一集','第一集','第一集','第一集','第一集',
      '第一集','第一集','第一集','第一集','第一集','第一集'
      ],
      AnimeMessage: [
      {
        src: require("assets/img/animetest.jpg") ,
        animeName: '动漫名',
        type: '恋爱',
        birth: '日本',
        language: '日语',
        year: '2016',
        author: '宫崎骏、久让石'
      }
      ]
    }
  },
  components: {
    Top
  },
  methods: {
    collectClick(){
      this.collect = !this.collect
    }
  },
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
