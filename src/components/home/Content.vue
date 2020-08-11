<template>
  <div class="anime">
    <div class="anime-title">
      <slot name="anime-icon"><img class="title-img" src="~assets/img/tuijian.svg" alt=""></slot>
      <span class="recommand"><slot name="leftTitle">sky动漫推荐</slot></span>
      <span class="more"><slot name="more"><a>更多>></a></slot></span>
      <div class="anime-content">
        <div class="anime-content-item"  v-for="(item,index) in anime" v-if="index < 12">
          <img :src="item.img" alt="">
          <div class="introduce">
            <div class="item-name"><a @click="nameClick(item)">{{item.name}}</a></div>
            <div class="item-author">{{item.author}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="hot">
      <slot name="hot-icon"><img src="~assets/img/hot.svg" alt=""></slot>
      <span class="hot-text"><slot name="rightTitle">sky动漫每周热门排行</slot></span>
      <div class="hot-recommand">
        <ul>
          <li><span style="background: #ff5777;">1</span><a href="">{{hotAnime[0] | hotAnimeFilters}}</a></li>
          <li><span style="background: #ff5777;">2</span><a href="">{{hotAnime[1] | hotAnimeFilters}}</a></li>
          <li><span style="background: #ff5777;">3</span><a href="">{{hotAnime[2] | hotAnimeFilters}}</a></li>
          <li><span>4</span><a href="">{{hotAnime[3] | hotAnimeFilters}}</a></li>
          <li><span>5</span><a href="">{{hotAnime[4] | hotAnimeFilters}}</a></li>
          <li><span>6</span><a href="">{{hotAnime[5] | hotAnimeFilters}}</a></li>
          <li><span>7</span><a href="">{{hotAnime[6] | hotAnimeFilters}}</a></li>
          <li><span>8</span><a href="">{{hotAnime[7] | hotAnimeFilters}}</a></li>
          <li><span>9</span><a href="">{{hotAnime[8] | hotAnimeFilters}}</a></li>
          <li><span>10</span><a href="">{{hotAnime[9] | hotAnimeFilters}}</a></li>
          <li><span>11</span><a href="">{{hotAnime[10] | hotAnimeFilters}}</a></li>
          <li><span>12</span><a href="">{{hotAnime[11] | hotAnimeFilters}}</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      more: '更多 >>',
      hot: '每周推荐',
      img: require("assets/img/animetest.jpg"),
    }
  },
  props: {
    anime: {
      type: Array,
      default(){
        return []
      }
    },
    hotAnime: {
      type: Array,
      default(){
        return []
      }
    }
  },
  methods: {
    nameClick(item){
      //console.log("--------",item);
      this.$store.commit({
        type: "nameClick",
        item
      })
      this.$router.push("/introduce")
    }
  },
  filters: {
    hotAnimeFilters(value){
      if(value == null) return "暂无更多"
      return value
    }
  }
}
</script>

<style scoped>
  a {
    color: black;
    text-decoration: none;
  }
  a:hover {
    color: #ff5777;
    cursor:pointer;
  }
  .anime {
    display: flex;
    height: 550px;
    margin-top: 70px;
    margin-bottom: 60px;
  }
  .anime-title {
    margin-left: 100px;
    height: 50px;
    line-height: 50px;
    position: relative;
    border-bottom: 2px solid rgba(100,100, 100, .1);
    position: relative;
  }
  .title-img {
    position: absolute;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    padding-right: 10px;
    top: 15px;
    left: 0px;
  }
  .recommand {
    padding-left: 40px;
    font-size: 20px;

  }
  .more a{
    position: absolute;
    bottom: -10px;
    right: 0px;
    font-size: 16px;
    color: #999;
  }
  .more a:hover {
    color: #ff5777;
  }
  .anime-content {
    margin-top: 20px;
    background: white;
    width: 1010px;
    display: flex;
    flex-wrap: wrap;
  }
  .anime-content-item {
    padding-right: 5px;
    width: 16%;
  }
  .anime-content-item img {
    width: 150px;
    height: 200px;
  }
  .introduce {
    position: relative;
  }
  .item-name {
    position: absolute;
    top: -25px;
  }
  .item-author {
    width: 150px;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #999;
  }
  .hot {
    width: 100%;
    height: 50px;
    line-height: 50px;
    margin-left: 15px;
    position: relative;
    border-bottom: 2px solid rgba(100,100, 100, .1);
  }
  .hot img {
    position: absolute;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    top: 5px;
    left: 25px;
  }
  .hot-text {
    padding-left: 60px;
    font-size: 20px;
  }

  .hot-recommand li{
    list-style-type:none;
    height: 40px;
    border-bottom: 1px solid rgba(100,100, 100, 0.04);
  }
  .hot-recommand li span {
    display: inline-block;
    width: 18px;
    height: 18px;
    text-align: center;
    line-height: 18px;
    border-radius: 2px;
    font-size: 12px;
    color: white;
    background: rgb(209, 208, 208);
  }
  .hot-recommand li a {
    padding-left: 15px;
  }
</style>
