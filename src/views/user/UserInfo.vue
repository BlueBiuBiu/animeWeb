<template>
  <div>
    <Top></Top>
    <div class="userInfo">
      <div class="tabControl">
        <div><a @click="profile">个人资料</a></div>
        <div><a @click="history">历史记录</a></div>
        <div><a @click="mine">我的追番</a></div>
        <div><a @click="logout">退出登录</a></div>
      </div>
      <div class="tabDetail">
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
      isProfile: true,
      isHistory: false
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
      this.isProfile = true
      this.isHistory = false
    },
    history(){
      this.isHistory = true
      this.isProfile = false
    },
    mine(){
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
    color: #ff5777;
    cursor:pointer;
  }
  .userInfo{
    width: 300px;
    height: 90vh;
    margin-top: 8px;
    background: rgb(243, 158, 61);
    text-align: center;
    border-radius: 3px;
  }
  .tabControl {
    margin: 0 auto;
    padding-top: 20px;
  }
  .tabControl div{
    height: 35px;
    line-height: 35px;
    margin: 10px;
    background-color: thistle;
    border-radius: 5px;
  }
  .tabDetail {
    position: absolute;
    background: tomato;
    left: 315px;
    top: 77px;
    right: 8px;
    bottom: 0;
    border-radius: 3px;
  }
</style>
