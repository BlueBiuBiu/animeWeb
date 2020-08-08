<template>
  <div class="login" :style="backgroundImg">
    <div class="login-all">
      <div class="title">Login</div>
      <form action="" class="login-form">
        <div class="user">
          <img src="~assets/img/user.svg" alt="">
          <input name="username" type="text" placeholder="请输入用户名~">
        </div>
        <div class="password">
          <img src="~assets/img/password.svg" alt="">
          <input name="password" type="password" placeholder="请输入密码~">
        </div>
        <button type="submit">登录</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      backgroundImg: {
      backgroundImage: "url(" + require("assets/img/background.jpg") + ")",
      backgroundRepeat: "no-repeat",
      backgroundSize: "100% 100%",
      },
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
  .user img{
    padding-top: 5px;
    width: 27px;
    height: 27px;
    left: 75px;
    position: absolute;
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
</style>
