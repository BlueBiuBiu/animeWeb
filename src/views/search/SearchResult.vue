<template>
  <div>
    <Top></Top>
    <div class="noResult" v-show="!isResult">
      <img :src="require('assets/img/searchResult.jpg')" alt="">
    </div>
    <div v-for="item in this.$store.state.searchResult">
      <div class="search">
        <div><img :src="item.img" alt=""></div>
        <div class="desc">
          <ul>
            <li><span>类型:</span> {{item.type}}</li>
            <li><span>地区:</span> {{item.place}}</li>
            <li><span>语言:</span> {{item.language}}</li>
            <li><span>年份:</span> {{item.year}}</li>
            <li><span>导演:</span> {{item.author}}</li>
          </ul>
        </div>
        <div class="name"><a @click="nameClick(item)">{{item.name}}</a></div>
      </div>
    </div>
  </div>
</template>

<script>
import Top from "components/home/Top.vue"

export default {
  name: '',
  data() {
    return {
      isResult: true
    }
  },
  updated() {
    this.$nextTick(() => {
      if(this.$store.state.searchResult[0] == null){
        this.isResult = false
      }
      else{
        this.isResult = true
      }
    })
  },
  components: {
    Top
  },
  methods: {
    nameClick(item){
      this.$store.commit({
        type: "nameClick",
        item
      })
      this.$router.replace("/introduce")
    }
  },
}
</script>

<style scoped>
  .search {
    margin-top: 20px;
    margin-left: 30px;
    display: flex;
    padding: 5px;
    position: relative;
    border-bottom: 2px solid rgba(100, 100, 100, .3);
  }
  .search img {
    width: 180px;
    height: 250px;
  }
  .desc ul {
    position: absolute;
    top: 45px;
  }
  .desc ul span {
    color: #999;
    padding-right: 10px;
  }
  .desc ul li{
    list-style-type: none;
    padding: 8px;
  }
  .name {
    font-size: 25px;
    margin-left: 350px;
    margin-top: 100px;
  }
  .noResult{
    display: flex;
    justify-content: center;
  }
  .noResult img {
    width: 448px;
    height: 628px;
  }
</style>
