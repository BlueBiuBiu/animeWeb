<template>
  <div class="login" :style="backgroundImg">
    <div class="login-all">
      <div class="title">Login</div>
      <form action="" class="login-form">
        <div class="user">
          <img src="~assets/img/user.svg" alt="">
          <input name="username" v-model="user.username" type="text" placeholder="请输入用户名~">
          <span v-if="isNullUsername" v-show="isNullUsername" class="userInfo">用户名不能为空</span>
          <span v-else v-show="isUsername" class="userInfo">用户名不正确</span>
        </div>
        <div class="password">
          <img src="~assets/img/password.svg" alt="">
          <input name="password" v-model="user.password" type="password" placeholder="请输入密码~">
          <span v-if="isNullPassword" v-show="isNullPassword" class="userInfo">密码不能为空</span>
          <span v-else v-show="isPassword" class="userInfo">密码不正确</span>
        </div>
        <button type="button" @click="login">登录</button>
      </form>
    </div>
  </div>
</template>

<script>
import {getUserInfo} from "network/home"
export default {
  name: '',
  data() {
    return {
      user: {},
      isUsername: false,
      isPassword: false,
      isNullUsername: false,
      isNullPassword: false,
      backgroundImg: {
      backgroundImage: "url(" + require("assets/img/background.jpg") + ")",
      backgroundRepeat: "no-repeat",
      backgroundSize: "100% 100%",
      },
    }
  },
  methods: {
    login(){
      //console.log(this.user);
      if(this.user.username == null){
        this.isNullUsername = true
        this.user.password = null
        setTimeout(() => {
          this.isNullUsername = false
        },1000)
      }
      else if(this.user.password == null){
        this.isNullPassword = true
        this.user.username = null
        setTimeout(() => {
          this.isNullPassword = false
        },1000)
      }
      else {
          getUserInfo(this.user.username,this.user.password).then(res => {
          //console.log(res);
          if(typeof(res[0]) == "undefined"){
            //console.log('用户名不正确');
            this.isUsername = true
            this.user = {}
          }
          else if(res[0].password != this.user.password){
            //console.log("密码不正确");
            this.isPassword = true
            this.user = {}
          }
          else{
            //console.log("登录成功");
            this.$store.commit({
              type: "loginSuccess",
              username: this.user
            })
            this.$store.commit({
              type: "userInfo",
              res
            })
            this.$router.replace("/")
          }
          setTimeout(() => {
            this.isUsername = false
            this.isPassword = false
          },1000)
        })
      }
    }
  },
}
</script>

<style scoped>
  .login{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    text-align: center;
  }
  .title {
    padding-bottom: 20px;
    font-size: 30px;
    font-weight: 700;
    color: #fff;
  }
  .login-all {
    width: 30%;
    height: 300px;
    margin: 0 auto;
    margin-top: 220px;
    background: #ffffff15;
    padding-top: 40px;
    position: relative;
  }
  .login-form div {
    padding: 8px;
  }
  .user img {
    padding-top: 5px;
    width: 27px;
    height: 27px;
    left: 75px;
    position: absolute;
  }
  .user span {
    padding-top: 8px;
  }
  .userInfo {
    position: absolute;
    color: red;
    font-size: 14px;
  }
  .password img {
    padding-top: 0px;
    width: 32px;
    height: 32px;
    left: 75px;
    position: absolute;
  }
  .login-form input {
    width: 225px;
    border: none;
    padding: 8px;
    border-bottom: 2px solid white;
    color: #fff;
    background: #ffffff00;
    
  } 
  .login-form input::placeholder{
    color: white;
  }
  .login-form button {
    width: 225px;
    height: 25px;
    margin-top: 10px;
    border-radius: 10px;
    background: white;
    border: none;
    background-image: linear-gradient(120deg, #4689d6 0%, #e0abee 100%);
  }
  .login-form button:hover {
    cursor: pointer;
  }
</style>
