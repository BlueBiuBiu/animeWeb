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
        <div class="bottom-item" v-for="item in anime1">
          <img :src="require('assets/img/animetest.jpg')" alt="">
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
          :page-size="14"
          layout="total, prev, pager, next, jumper"
          :page-sizes="[14,14,14]"
          :total="42">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Top from "components/home/Top"

import {getAnimeType,getAnimeTypePage} from 'network/home'
export default {
  name: 'Detail',
  data() {
    return {
      currentPage: 1,
      typeIndex: 0,
      placeIndex: 0,
      birthIndex: 0,
      languageIndex: 0,
      rankIndex: 0,
      page: 1,
      pageSize: 14,
      type: '全部',
      place: '全部',
      birth: '全部',
      language: '全部',
      rankType: ['按时间','按人气','按推荐'],
      animeType: ['全部','恋爱','竞技','校园','热血','青春'],
      animePlace: ['全部','日本','国内','欧美','其它'],
      animeBirth: ['全部','2021','2020','2019','2018','2017','2016'],
      animeLanguage: ['全部','日语','国语','英语','粤语'],
      anime: null,
      anime1: null
    }
  },
  created() {
    // getAnimeType(this.type,this.place,this.birth,this.language).then(res => {
    //     this.anime = res
    //   })
    getAnimeTypePage(this.type,this.place,this.birth,this.language,this.page,this.pageSize).then(res => {
        this.anime1 = res.content
    })
  },
  components: {
    Top
  },
  methods: {
    typeClick(index){
      //console.log(index);
      this.typeIndex = index
       switch (index) {
        case 0:
          this.type = '全部'
          break;
        case 1:
          this.type = '恋爱'
          break;
        case 2:
          this.type = '竞技'
          break;
        case 3:
          this.type = '校园'
          break;
        case 4:
          this.type = '热血'
          break;
        default:
          this.type = '青春'
          break;
      }
      getAnimeTypePage(this.type,this.place,this.birth,this.language,this.page,this.pageSize).then(res => {
        this.anime1 = res.content
      })
      //console.log(this.anime);
    },
    placeClick(index){
      //console.log(index);
      this.placeIndex = index
      switch (index) {
        case 0:
          this.place = '全部'
          break;
        case 1:
          this.place = '日本'
          break;
        case 2:
          this.place = '国内'
          break;
        case 3:
          this.place = '欧美'
          break;
        default:
          this.place = '其它'
          break;
      }
      //console.log("place",index);
      getAnimeTypePage(this.type,this.place,this.birth,this.language,this.page,this.pageSize).then(res => {
        this.anime1 = res.content
      })
    },
    birthClick(index){  
      this.birthIndex = index
       switch (index) {
        case 0:
          this.birth = '全部'
          break;
        case 1:
          this.birth = '2021'
          break;
        case 2:
          this.birth = '2020'
          break;
        case 3:
          this.birth = '2019'
          break;
        case 4:
          this.birth = '2018'
          break;
        case 5:
          this.birth = '2017'
          break;
        default:
          this.birth = '2016'
          break;
      }
      //console.log("birth",index);
      getAnimeTypePage(this.type,this.place,this.birth,this.language,this.page,this.pageSize).then(res => {
        this.anime1 = res.content
      })
    },
    languageClick(index){
      this.languageIndex = index
       switch (index) {
        case 0:
          this.language = '全部'
          break;
        case 1:
          this.language = '日语'
          break;
        case 2:
          this.language = '中文'
          break;
        case 3:
          this.language = '英语'
          break;
        default:
          this.language = '粤语'
          break;
      }
      getAnimeTypePage(this.type,this.place,this.birth,this.language,this.page,this.pageSize).then(res => {
        this.anime1 = res.content
      })
    },
    rankClick(index){
      this.rankIndex = index
    },
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val
      getAnimeTypePage(this.type,this.place,this.birth,this.language,val,14).then(res => {
        this.anime1 = res.content
      })
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
