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
    state.userInfo = payLoad.res
   },

   refreshUserInfo(state,payload){
    state.userInfo.thumb_up_ids = payload.res[0].thumb_up_ids
    state.userInfo.thumb_down_ids = payload.res[0].thumb_down_ids
   },

   collect(state,payLoad){
     //console.log(payLoad.collect.id);
    if(state.collectAnime == null){
      state.collectAnime = []
      //console.log("----------");
      payLoad.collect.collectButton = true
      state.collectAnime.push(payLoad.collect)
    }
    else{
      let animeMessage = state.collectAnime.find(item => item.id == payLoad.collect.id)
      if(!animeMessage){
        payLoad.collect.collectButton = true
        //console.log(payLoad.collect);
        state.collectAnime.push(payLoad.collect)
      }
    }
    insertUserInfo(state.userInfo.username,state.userInfo.password,state.userInfo.id,state.collectAnime)
   },
   cancelCollect(state,payLoad){
    let animeMessage = state.collectAnime.find(item => item.id == payLoad.cancelCollect.id)
    state.collectAnime = state.collectAnime.filter(item => item.id != animeMessage.id)
    insertUserInfo(state.userInfo.username,state.userInfo.password,state.userInfo.id,state.collectAnime)
   },

   search(state,payLoad){
     //console.log(payLoad);
     state.searchResult = payLoad.searchResult
   },

   originalPosition(state,payload){
     state.originalPosition = payload.scrollY
   },

   commentInfo(state,payload){
    state.commentInfo = payload.commentInfo
   },

   titleOffsetTop(state, payload){
     state.titleOffsetTop = payload.titleOffsetTop
   }
}