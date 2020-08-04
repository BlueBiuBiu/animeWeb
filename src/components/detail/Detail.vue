<template>
  <div>
    <top></top>
    <div class="detail">
      <div class="top">
        <span><slot name="topImg"><img src="~assets/img/caidan.svg" alt=""></slot></span>
        <span class="top-text"><slot name="topTitle">日本动漫</slot></span>
        <span class="top-right">
          <span v-for="(item,index) in rankType"
            @click="rankClick(index)" 
            :class="{topRightActive : index === rankIndex}">
            <a :class="{topRightActiveFont : index === rankIndex}">{{item}}</a></span>
        </span>
      </div>
      <div class="center">
        <table>
          <tr>
            <th>类型</th>
            <td v-for="(item,index) in animeType">
              <span :class="{active: index === typeIndex}"
              @click="typeClick(index)">
                <a :class="{active: index === typeIndex}">{{item}}</a>
              </span>
            </td>
          </tr>
          <tr>
            <th>地区</th>
            <td v-for="(item,index) in animePlace">
              <span :class="{active: index === placeIndex}"
              @click="placeClick(index)">
                <a :class="{active: index === placeIndex}">{{item}}</a>
              </span>
            </td>
          </tr>
          <tr>
            <th>年份</th>
            <td v-for="(item,index) in animeBirth">
              <span :class="{active: index === birthIndex}"
              @click="birthClick(index)">
                <a :class="{active: index === birthIndex}">{{item}}</a>
              </span>
            </td>
          </tr>
          <tr>
            <th>语言</th>
            <td v-for="(item,index) in animeLanguage">
              <span :class="{active: index === languageIndex}"
              @click="languageClick(index)">
                <a :class="{active: index === languageIndex}">{{item}}</a>
              </span>
            </td>
          </tr>
        </table>
      </div>
      <div class="bottom">
        <div class="bottom-item" v-for="item in anime">
          <img :src="item.src" alt="">
          <div class="introduce">
            <div class="item-name"><a href="">{{item.name}}</a></div>
            <div class="item-author">{{item.author}}</div>
          </div>
        </div>
      </div>
      <div class="block">
        <!-- <span class="demonstration">直接前往</span> -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="100"
          layout="total, prev, pager, next, jumper"
          :page-sizes="[42,42,42]"
          :total="300">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Top from "components/home/Top"
export default {
  name: 'Detail',
  data() {
    return {
      currentPage1: 1,
      typeIndex: 0,
      placeIndex: 0,
      birthIndex: 0,
      languageIndex: 0,
      rankIndex: 0,
      rankType: ['按时间','按人气','按推荐'],
      animeType: ['全部','恋爱','竞技','校园','热血','青春'],
      animePlace: ['全部','日本','国内','欧美','其它'],
      animeBirth: ['全部','2021','2020','2019','2018','2017','2016'],
      animeLanguage: ['全部','日语','国语','英语','粤语'],
      anime: [
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      },
      {
          name: 'sky动漫',
          author: '张三,李四,王五,sky动漫,动漫网站',
          src: require("assets/img/animetest.jpg") 
      }
      ]
    }
  },
  components: {
    Top
  },
  methods: {
    typeClick(index){
      //console.log(index);
      this.typeIndex = index
    },
    placeClick(index){
      //console.log(index);
      this.placeIndex = index
    },
    birthClick(index){  
      this.birthIndex = index
    },
    languageClick(index){
      this.languageIndex = index
    },
    rankClick(index){
      this.rankIndex = index
    },
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
    }
  },
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

  .detail {
    margin-top: 70px;
    margin-left: 95px;
  }
  .top {
    height: 40px;
    position: relative;
    border-bottom: 2px solid rgba(100,100, 100, .1);
  }
  .top img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    position: absolute;
    bottom: 9px;
  }
  .top-text {
    font-size: 20px;
    padding-left: 40px;
  }
  .top-right {
    font-size: 14px;
    display: flex;
    width: 180px;
    position: absolute;
    left: 1170px;
    top: 10px;
    justify-content: space-between;
  }
  .top-right span {
    padding-bottom: 8px;
  }
  .topRightActive {
    border-bottom: 2px solid #ff5777;
  }
  .topRightActiveFont {
    color: #ff5777;
  }
  .center {
    font-size: 15px;
    text-align: center;
  }
  .center td {
    padding: 10px;
    height: 30px;
    line-height: 30px;
  }
  .center th {
    color: rgb(177, 175, 175);
    padding-right: 5px;
  }
  .center a {
    width: 30px;
    height: 30px;
  }
  .center span {
    display: inline-block;
    width: 60px;
    height: 30px;
  }
  .active{
    color: white;
    background-color: #ff5777;
  }
  .bottom {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
  }
  .bottom-item {
    width: 14%;
    padding-bottom: 20px;
  }
  .bottom-item img {
    width: 180px;
    height: 260px;
  }
  .item-name {
    padding-top: 2px;
  }
  .item-author {
    padding-top: 6px;
    width: 150px;
    font-size: 13px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    color: #999;
  }
  .block {
    text-align: center;
    margin-top: 20px;
  }
</style>
