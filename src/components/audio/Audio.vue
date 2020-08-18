<template>
  <div>
    <button v-if="isShow" @click="btnClick">收起</button>
    <button v-else @click="btnClick">听歌</button>
    <div class="audio" v-show="isShow">
      <input type="text" placeholder="请输入歌名enter寻找~" @keyup.enter="search" v-model="searchContent">
      <div v-show='isSearch'>
        <div class="search-list" :style="backgroundImg">
          <div v-for="(item,index) in result" class="item">
            <span>{{index+1}}. </span>
            <span class="name">{{item.name}}</span>
            <img src="~assets/img/bofang.svg" @click="play(item.id)" alt="">
          </div>
        </div>
        <footer>
          <audio ref="audio" :src="url" controls></audio>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: '',
  data() {
    return {
      searchContent: '',
      result: '',
      url: '',
      isShow: true,
      isSearch: false,
      backgroundImg: {
        backgroundImage: "url(" + require("assets/img/bofangbackground.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      },
    }
  },
  methods: {
    play(id){
      axios({
        url: 'https://autumnfish.cn/song/url',
        methods: 'get',
        params: {
          id
        }
      }).then(res => {
        console.log(res);
        this.url =res.data.data[0].url
      })
      this.$refs.audio.play()
    },
    search(){
      axios({
        url: 'https://autumnfish.cn/search',
        method: "get",
        params: {
          keywords: this.searchContent
        }
      }).then(res => {
        //console.log(res);
        this.result = res.data.result.songs
      })
      this.isSearch = true
    },
    btnClick(){
      this.isShow = !this.isShow
      if(this.isShow == true){
        this.isSearch = false
      }
    }
  },
}
</script>

<style scoped>
  button {
    position: fixed;
    font-size: 13px;
    width: 50px;
    height: 50px;
    top: 70px;
    right: 0;
    border-radius: 50%;
    background-image: linear-gradient(120deg, #fccb90 0%, #d57eeb 100%);
  }
  .audio {
    width: 300px;
    height: 200px;
    position: fixed;
    top: 120px;
    right: 0;
  }
  input {
    width: 290px;
    height: 30px;
    border-radius: 10px;
  }
  input::placeholder {
    font-size: 13px;
  }
  .search-list {
    width: 100%;
    height: 200px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .item {
    display: flex;
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(100, 100, 100, .3);
    background: #ffffff40;
  }
  img {
    width: 30px;
    height: 30px;
    position: relative;
    top: 10px;
  }
  .name {
    padding-left: 10px;
    width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
