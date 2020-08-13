<template>
  <div class="login" :style="backgroundImg">
    <div class="login-all">
      <div class="title">
        <span class="login-page"><a @click="loginPage">登录</a></span>
        <span>/</span>
        <span><a>注册</a></span>
      </div>
      <span class="warn" v-show="isExist">注册的用户名已存在,请重新输入</span>
      <form action="" class="login-form">
        <div class="user">
          <img src="~assets/img/registeruser.svg" alt="">
          <input name="username" v-model="user.username" type="text" placeholder="请输入用户名~">
          <span v-show="isNullUsername" class="userInfo">用户名不能为空</span>
        </div>
        <div class="password">
          <img src="~assets/img/registerpassword.svg" alt="">
          <input name="password" v-model="user.password" type="password" placeholder="请输入密码~">
          <span v-show="isNullPassword" class="userInfo">密码不能为空</span>
        </div>
        <button type="button" @click="register">注册</button>
      </form>
    </div>
  </div>
</template>

<script>
import {register,findUsername} from "network/home"
export default {
  name: '',
  data() {
    return {
      user: {},
      count: "",
      isExist: false,
      isNullUsername: false,
      isNullPassword: false,
      backgroundImg: {
      backgroundImage: "url(" + require("assets/img/register.jpg") + ")",
      backgroundRepeat: "no-repeat",
      backgroundSize: "100% 100%",
      },
    }
  },
  methods: {
    register(){
      findUsername(this.user.username).then(res => {
        if(res[0] != null){
          //console.log('-----');
          this.isExist = true
          setTimeout(() => {
            this.isExist = false
          },2000)
          //console.log(res[0]);
        }
        else{
          if(this.user.username == null){
            this.isNullUsername = true
            setTimeout(() => {
              this.isNullUsername = false
            },1000)
          }
          else if(this.user.password == null){
            this.isNullPassword = true
            setTimeout(() => {
              this.isNullPassword = false
            },1000)
          }
          else {
              register(this.user.username,this.user.password)
              alert("注册成功！")
              this.$router.replace("/login")
          }
        }
      })
    },
    loginPage(){
      this.$router.replace("/login")
    },
  },
}
</script>

<style scoped>
  a {
    color: white;
    text-decoration: none;
  }
  a:hover {
    color: #4ec0d4;
    cursor:pointer;
  }
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
  .warn {
    color: red;
    font-size: 15px;
  }
  .login-page{
    font-size: 15px;
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
