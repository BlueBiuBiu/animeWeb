<template>
  <div class="mine">
    <div v-for="item in collectAnime" class="all">
      <img :src="item.img" alt="">
      <div class="desc">
        <div>类型: {{item.type}}</div>
        <div>地区: {{item.place}}</div>
        <div>语言: {{item.language}}</div>
      </div>
      <div class="name"><a @click="nameClick(item)">{{item.name}}</a></div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      collectAnime: []
    }
  },
  methods: {
    nameClick(item){
      this.$store.commit({
        type: "nameClick",
        item
      })
      this.$router.push("/introduce")
    }
  },
  created() {
    this.collectAnime = JSON.parse(this.$store.state.userInfo.collect)
    //console.log(JSON.parse(this.collectAnime));
  },

}
</script>

<style scoped>
  a {
    text-decoration: none;
  }
  a:hover {
    color: white;
    cursor:pointer;
  }
  .mine {
    width: 450px;
    height: 500px;
    margin: 0 auto;
    margin-top: 60px;
    background: #ffffff10;
    border-radius: 5px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .mine::-webkit-scrollbar {
    display: none;
  }
  .all {
    width: 420px;
    height: 60px;
    border: 1px solid pink;
    display: flex;
    padding: 5px;
    margin: 10px;
    background: rgba(92, 92, 241,.4);
    border-radius: 5px;
    margin-bottom: 5px;
  }
  .desc {
    padding-left: 15px;
    font-size: 13px;
    color: white;
  }
  .name {
    padding-top: 18px;
    padding-left: 160px;
    font-size: 16px;
    color: white;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .mine img {
    width: 65px;
    height: 65px;
    border-radius: 50%;
  }
</style>
