<template>
  <div>
    <Top :isShow="isShow"></Top>
    <div class="userInfo" :style="tabBackgroundImg">
      <div class="tabControl">
        <div><a @click="profile">个人资料</a></div>
        <div><a @click="history">历史记录</a></div>
        <div><a @click="mine">我的追番</a></div>
        <div><a @click="logout">退出登录</a></div>
      </div>
      <div class="tabDetail" :style="backgroundImg">
        <Profile v-if="isProfile"></Profile>
        <History v-else-if="isHistory"></History>
        <Mine v-else></Mine>
      </div>
    </div>
  </div>
</template>

<script>
import Top from "components/home/Top.vue"
import History from 'views/user/History'
import Mine from 'views/user/Mine'
import Profile from 'views/user/Profile'

export default {
  name: '',
  data() {
    return {
      isShow: false,
      isProfile: true,
      isHistory: false,
      tabBackgroundImg: {
        backgroundImage: "url(" + require("assets/img/tabbackground.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      },
      backgroundImg: {
      backgroundImage: "url(" + require("assets/img/userbackground.jpg") + ")",
      backgroundRepeat: "no-repeat",
      backgroundSize: "100% 100%",
      },
    }
  },
  components: {
    Top,
    History,
    Mine,
    Profile
  },
  methods: {
    logout(){
      this.$router.push("/login")
    },
    profile(){
      this.backgroundImg.backgroundImage = "url(" + require("assets/img/userbackground.jpg") + ")"
      this.isProfile = true
      this.isHistory = false
    },
    history(){
      this.backgroundImg.backgroundImage = "url(" + require("assets/img/historybackground.jpg") + ")"
      this.isHistory = true
      this.isProfile = false
    },
    mine(){
      this.backgroundImg.backgroundImage = "url(" + require("assets/img/minebackground.jpg") + ")"
      this.isProfile = false
      this.isHistory = false
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
    color: blue;
    cursor:pointer;
  }
  .userInfo{
    width: 300px;
    height: 90vh;
    margin-top: 8px;
    text-align: center;
    border-radius: 3px;
  }
  .tabControl {
    margin-top: 78px;
    padding-top: 20px;
  }
  .tabControl div{
    font-size: 13px;
    height: 35px;
    line-height: 35px;
    margin: 10px;
    background: rgba(231, 117, 145, 0.7);
    border-radius: 5px;
  }
  .tabDetail {
    position: absolute;
    left: 315px;
    top: 77px;
    right: 8px;
    bottom: 0;
    border-radius: 3px;
  }
</style>
