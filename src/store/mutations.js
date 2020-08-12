import {insertUserInfo} from "network/home"

export default {
   nameClick(state,payLoad){
     //console.log(payLoad);
     state.animeMessage = payLoad.item
   },
   loginSuccess(state,payLoad){
     //console.log(payLoad);
     state.loginState = true
     state.loginUsername = payLoad.username.username
   },
   userInfo(state,payLoad){
    //console.log(payLoad.res[0]);
    state.userInfo = payLoad.res[0]
   },
   collect(state,payLoad){
     //console.log(payLoad.collect.id);
     let animeMessage = state.collectAnime.find(item => item.id == payLoad.collect.id)
     if(!animeMessage){
      payLoad.collect.collectButton = true
      console.log(payLoad.collect);
      state.collectAnime.push(payLoad.collect)
     }
     insertUserInfo(state.userInfo.username,state.userInfo.password,state.userInfo.id,state.collectAnime)
   },
   cancelCollect(state,payLoad){
    let animeMessage = state.collectAnime.find(item => item.id == payLoad.cancelCollect.id)
    state.collectAnime = state.collectAnime.filter(item => item.id != animeMessage.id)
    insertUserInfo(state.userInfo.username,state.userInfo.password,state.userInfo.id,state.collectAnime)
   }
}