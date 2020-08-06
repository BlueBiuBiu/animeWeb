export default {
   nameClick(state,payLoad){
     console.log(payLoad);
     state.animeMessage = payLoad.item
   }
}