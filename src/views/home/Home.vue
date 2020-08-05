<template>
  <div>
    <Top></Top>
    <Content :anime="anime"><span slot="more"> </span></Content>
    <Content :anime="japanAnime">
      <a slot="more" @click="handleJapan">更多>></a>
      <img slot="anime-icon" class="title-img" src="~assets/img/shipin.svg" alt="">
      <span slot="leftTitle">日本动漫推荐</span>
      <span slot="rightTitle">日本动漫每周热门排行</span>
    </Content>
    <Content :anime="chineseAnime">
      <a slot="more" @click="handleChinese">更多>></a>
      <img slot="anime-icon" class="title-img" src="~assets/img/shipin2.svg" alt="">
      <span slot="leftTitle">国内动漫推荐</span>
      <span slot="rightTitle">国内动漫每周热门排行</span>
    </Content>
    <Content :anime="europeAnime">
      <a slot="more" @click="handleEurope">更多>></a>
      <img slot="anime-icon" class="title-img" src="~assets/img/shipin3.svg" alt="">
      <span slot="leftTitle">欧美动漫推荐</span>
      <span slot="rightTitle">欧美动漫每周热门排行</span>
    </Content>
    <Content :anime="otherAnime">
      <a slot="more" @click="handleOther">更多>></a>
      <img slot="anime-icon" class="title-img" src="~assets/img/shipin4.svg" alt="">
      <span slot="leftTitle">其它动漫推荐</span>
      <span slot="rightTitle">其它动漫每周热门排行</span>
    </Content>
  </div>
</template>

<script>
import Content from "components/home/Content.vue"
import Top from "components/home/Top.vue"

//网络请求
import {getHomeAnime} from 'network/home'

export default {
  name: '',
  data() {
    return {
      anime: [],
      japanAnime: [],
      europeAnime: [],
      chineseAnime: [],
      otherAnime: [],
    }
  },
  components: {
    Content,
    Top,
  },
  created() {
    getHomeAnime().then(res => {
      console.log(res);
      this.anime = res
      for(let item of res){
        if(item.place == '国内'){
          this.chineseAnime.push(item)
        }
        else if(item.place == '日本'){
          this.japanAnime.push(item)
        }
        else if(item.place == '欧美'){
          this.europeAnime.push(item)
        }
        else if(item.place == '其它'){
          this.otherAnime.push(item)
        }
      }
      //console.log(this.chineseAnime);
    })
  },
  methods: {
    handleJapan(){
      this.$router.push("/japan")
    },
    handleChinese(){
      this.$router.push("/chinese")
    },
    handleEurope(){
      this.$router.push("/europe")
    },
    handleOther(){
      this.$router.push("/other")
    }
  },
}
</script>

<style scoped>

</style>
