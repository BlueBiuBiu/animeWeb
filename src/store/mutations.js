export default {
   nameClick(state,payLoad){
     //console.log(payLoad);
     state.animeMessage = payLoad.item
   },
   loginSuccess(state,payLoad){
     //console.log(payLoad.username);
     state.loginState = true
     state.loginUsername = payLoad.username
   }
}