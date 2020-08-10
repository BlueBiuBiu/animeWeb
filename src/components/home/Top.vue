<template>
  <div>
    <div class="top">
      <span class="top-left"><a href="">sky动漫</a></span>
      <span class="top-center" v-for="(item,index) in title">
        <span class="top-center-item"><a @click="handleClick(index)">{{item}}</a></span>
      </span>
      <span class="top-search">
        <form action="">
          <input class="top-search-input" type="text" placeholder="输入相关动漫名">
          <div><a href=""><img class="search-img" src="~assets/img/sousu.svg" alt=""></a></div>
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
export default {
  name: '',
  data() {
    return {
      title: ['首页','日本动漫','国内动漫','欧美动漫','其它动漫']
    }
  },
  methods: {
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
    cursor: pointer;
  }
  .userInfo{
    color: turquoise;
  }
  .top {
    width: 100%;
    height: 60px;
    background: #ff5777;
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
    width: 250px;
    height: 25px;
    position: relative;
  }
  .search-img {
    position: absolute;
    width: 25px;
    height: 25px;
    top: 29px;
    right: 385px;
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
    top: 10px;
    padding-left: 10px;
  }
</style>
