<template>
  <div>
    <div :style="backgroundImg" class="top-logo" v-show="isShow"></div>
    <div class="top" :class="offsetTop?'isFixed':'noFixed'">
      <span class="top-left"><a href="">sky动漫</a></span>
      <span class="top-center" v-for="(item,index) in title">
        <span class="top-center-item"><a @click="handleClick(index)">{{item}}</a></span>
      </span>
      <span class="top-search">
        <form action="">
          <input class="top-search-input" type="text" placeholder="输入相关动漫名" v-model="searchContent">
          <div><a @click="search"><img class="search-img" src="~assets/img/sousu.svg" alt=""></a></div>
        </form>
      </span>
      <div class="top-right">
        <span>
          <a v-if="this.$store.state.loginState" @click="userInfo"><img class="top-right-img" src="~assets/img/akari.jpg" alt=""></a>
          <a v-else @click="login"><img class="top-right-img" src="~assets/img/akari.jpg" alt=""></a>
          <span v-if="this.$store.state.loginState" class="top-right-login">
            <a @click="userInfo" class="userInfo">欢迎你~{{this.$store.state.loginUsername}}</a>
          </span>
          <span v-else class="top-right-login"><a @click="login">登录/注册</a></span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {getHomeAnime} from 'network/home'

export default {
  name: '',
  data() {
    return {
      backgroundImg: {
      backgroundImage: "url(" + require("assets/img/top.png") + ")",
      backgroundRepeat: "no-repeat",
      backgroundSize: "100% 100%",
      },
      title: ['首页','日本动漫','国内动漫','欧美动漫','其它动漫'],
      searchContent: "",
      anime: [],
      searchResult: [],
      offsetTop: false,
    }
  },
  props: {
    isShow: {
      type: Boolean,
      default(){
        return true
      }
    }
  },
  created() {
    getHomeAnime().then(res => {
      //console.log(res);
      this.anime = res
    })
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed(){
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll(){
    // 得到页面滚动的距离
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    // 判断页面滚动的距离是否大于吸顶元素的位置
    this.offsetTop = (scrollTop > 220)
    },
    handleClick(index){
      switch(index){
        case 0:
          this.$router.push("/")
          break;
        case 1:
          this.$router.push("/japan")
          break;
        case 2:
          this.$router.push("/chinese")
          break;
        case 3:
          this.$router.push("/europe")
          break;
        case 4:
          this.$router.push("/other")
          break;
      }
    },
    login(){
      this.$router.push("/login")
    },
    userInfo(){
      this.$router.push("/userInfo")
    },
    search(){
      this.searchResult = []
      //console.log(this.$route.path);
      if(this.searchContent != ""){
        this.searchResult = this.anime.filter(item => {
        if(item.name.includes(this.searchContent)){
          return item
          }
        })
        this.$store.commit({
          type: "search",
          searchResult: this.searchResult
        })
        if(this.$route.path != "/searchResult"){
          this.$router.replace("/searchResult")
        }
      }
    }
  }
}
</script>

<style scoped>
  a {
    color: white;
    text-decoration: none;
  }
  a:hover {
    color: #2892f5;
    cursor: pointer;
  }
  .userInfo {
    color: turquoise;
  }
  .top-logo {
    margin-top: 8px;
    width: 100%;
    height: 200px;
  }
  .isFixed {
    background: #ff5777;
    position: fixed;
    top: 0;
    z-index: 9;
  }
  .noFixed {
    background: rgba(88, 85, 85,.5);
    position: fixed;
    top: 8px;
  }
  .top 
  {
    width: 99%;
    height: 60px;
    color: white;
    font-size: 16px;
    display: flex;
    text-align: center;
    line-height: 60px;
  }
  .top-left {
    width: 100px;
    font-size: 25px;
    margin-left: 90px;
  }
  .top-center {
    width: 100px;
    line-height: 55px;
    height: 55px;
    padding-top: 5px;
    display: flex;
  }
  .top-center-item {
    flex: 1;
  }
  .top-search {
    margin-left: 200px;
  }
  .top-search-input {
    border-radius: 5px;
    font-size: 16px;
    width: 250px;
    height: 25px;
    position: relative;
  }
  .search-img {
    position: absolute;
    width: 25px;
    height: 25px;
    top: 23px;
    right: 362px;
  }
  .top-right {
    margin-left: 160px;
    padding-top: 10px;
  }
  .top-right-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: relative;
  }
  .top-right-login {
    position: absolute;
    top: 2px;
    padding-left: 10px;
  }
</style>
