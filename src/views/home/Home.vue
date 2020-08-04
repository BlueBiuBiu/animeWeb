<template>
  <div>
    <Top></Top>
    <Content><span slot="more"></span></Content>
    <Content>
      <img slot="anime-icon" class="title-img" src="~assets/img/shipin.svg" alt="">
      <span slot="leftTitle">日本动漫推荐</span>
      <span slot="rightTitle">日本动漫每周热门排行</span>
    </Content>
    <Content>
      <img slot="anime-icon" class="title-img" src="~assets/img/shipin2.svg" alt="">
      <span slot="leftTitle">国内动漫推荐</span>
      <span slot="rightTitle">国内动漫每周热门排行</span>
    </Content>
    <Content>
      <img slot="anime-icon" class="title-img" src="~assets/img/shipin3.svg" alt="">
      <span slot="leftTitle">欧美动漫推荐</span>
      <span slot="rightTitle">欧美动漫每周热门排行</span>
    </Content>
    <Content>
      <img slot="anime-icon" class="title-img" src="~assets/img/shipin4.svg" alt="">
      <span slot="leftTitle">其它动漫推荐</span>
      <span slot="rightTitle">其它动漫每周热门排行</span>
    </Content>
  </div>
</template>

<script>
import Content from "components/home/Content.vue"
import Top from "components/home/Top.vue"
export default {
  name: '',
  components: {
    Content,
    Top,
  }
}
</script>

<style scoped>

</style>
