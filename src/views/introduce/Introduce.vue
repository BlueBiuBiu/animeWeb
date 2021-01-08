<template>
  <div>
    <Top></Top>
    <div class="introduce">
      <Video v-show="isShow" :animeLink="animeLink" ref="videoPlay"></Video>
      <div class="message" v-show="!isShow">
        <img class="AnimeImg" :src="animeMessage.img" alt="" />
        <div class="AnimeMessage">
          <ul>
            <li>
              <div>{{ animeMessage.name }}</div>
            </li>
            <li><span>类型:</span> {{ animeMessage.type }}</li>
            <li><span>地区:</span> {{ animeMessage.place }}</li>
            <li><span>语言:</span> {{ animeMessage.language }}</li>
            <li><span>年份:</span> {{ animeMessage.year }}</li>
            <li><span>导演:</span> {{ animeMessage.author }}</li>
            <li>
              <div v-if="!this.collect" class="collect">
                <img src="~assets/img/wodezhuifan_before.svg" alt="" />
                <a @click="collectClick">收藏</a>
              </div>
              <div v-else class="collect">
                <img src="~assets/img/wodezhuifan.svg" alt="" />
                <a @click="collectClick">已收藏</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="video-play">
        <img src="~assets/img/liebiaodaohang_dongman.svg" alt="" />
        <div>sky动漫在线观看</div>
      </div>
      <div class="play">
        <!-- <div class="play-item" v-for="item in number"><a href="">{{item}}</a></div>
         -->
        <a v-for="(item, index) in number" @click="playIndex(index)">{{
          item
        }}</a>
      </div>
    </div>
    <div class="comment">
      <div class="title" ref="title">评论区</div>
      <div class="commentSubmit">
        <el-input
          class="comment-input"
          :rows="3.5"
          type="textarea"
          placeholder="发表一条评论吧~"
          v-model="commentContent"
          maxlength="1000"
          change="inputChange"
          show-word-limit
        >
        </el-input>
        <el-button type="primary" @click="commentSubmit">发表评论</el-button>
      </div>
      <Comment
        :isComment="isComment"
        :comments="comments"
        @uploadComment="uploadComment"
      />
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <span>请先登录，是否跳转到登录?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="toLogin">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Top from "components/home/Top.vue";
import Video from "components/video/Video.vue";
import Comment from "components/comment/Comment.vue";

import { getAnimePlayIndex } from "network/home";
import { getCommentByAnimeId, uploadCommentInfo } from "network/home2";

export default {
  name: "",
  data() {
    return {
      collect: false,
      isShow: false,
      number: [],
      animeMessage: null,
      animeLink: null,
      allReplyCount: 3,
      isComment: true,
      comments: [],
      commentContent: "",
      dialogVisible: false,
    };
  },
  created() {
    this.animeMessage = this.$store.state.animeMessage;
    this.get_comment_list(this.$store.state.animeMessage.id);
    this.number = this.animeMessage.index.split(",");
    //console.log(this.index);
    if (this.$store.state.collectAnime != null) {
      this.collect = this.$store.state.collectAnime.find(
        (item) => item.id == this.animeMessage.id
      );
    }
    //console.log(this.collect);
  },
  components: {
    Top,
    Video,
    Comment,
  },
  methods: {
    commentSubmit() {
      const user = this.$store.state.userInfo;
      const animeMessage = this.$store.state.animeMessage;
      const animeId = this.$store.state.animeMessage.id;
      if (!user.id) {
        this.dialogVisible = true;
      } else {
        if (!this.commentContent) {
          this.$message({
            showClose: true,
            message: "评论内容不能为空哦",
            type: "warning",
          });
        } else {
          uploadCommentInfo(animeId, this.commentContent, user.id).then(() => {
            this.commentContent = "";
            this.$message({
              title: "成功",
              message: "发表评论成功",
              type: "success",
            });
            this.$store.commit({
              type: "commentInfo",
              commentInfo: "",
            });
            this.uploadComment()
            const titleOffsetTop = this.$store.state.titleOffsetTop;
            window.scroll(0, titleOffsetTop);
          });
        }
      }
    },
    collectClick() {
      if (this.$store.state.loginState == true) {
        this.collect = !this.collect;
        if (this.collect == true) {
          this.$store.commit({
            type: "collect",
            collect: this.animeMessage,
          });
          if (this.$store.state.collectAnime != null) {
            this.collect = this.$store.state.collectAnime.find(
              (item) => item.id == this.animeMessage.id
            ).collectButton;
          }
        } else {
          this.$store.commit({
            type: "cancelCollect",
            cancelCollect: this.animeMessage,
          });
        }
      } else {
        alert("请先登录！");
      }
    },
    playIndex(index) {
      //getAnimePlayIndex(this.animeMessage.id,index);
      if (this.isShow != true) {
        this.isShow = !this.isShow;
      }
      getAnimePlayIndex(this.animeMessage.id, index).then((res) => {
        this.animeLink = res;
        console.log(this.animeLink);
      });
      this.$refs.videoPlay.playVideo();
    },
    async get_comment_list(animeId) {
      const result = await getCommentByAnimeId(animeId);
      const userId = this.$store.state.userInfo.id
      const thumbUpIds = this.$store.state.userInfo.thumb_up_ids
      const thumbDownIds = this.$store.state.userInfo.thumb_down_ids
      // this.comments = result
      let comment = [];
      let childComment = [];
      for (let item of result) {
        if (!item.comment_id) {
          item.reply = [];
          comment.push(item);
        } else {
          childComment.push(item);
        }
      }
      for (let child of childComment) {
        child.reply = [];
        child.thumbUpIds = thumbUpIds
        child.thumbDownIds = thumbDownIds
        for (let child2 of childComment) {
          if (child2.comment_id === child.id) {
            child.reply.push(child2);
          }
        }
      }
      // console.log(childComment);
      for (let item of comment) {
        for (let child of childComment) {
          if (child.comment_id === item.id) {
            if (child.reply.length) {
              for (let child2 of child.reply) {
                child2.replyTo = child.user.username;
              }
              item.reply = [...item.reply, ...child.reply];
            }
            item.reply.push(child);
          }
        }
      }
      for(let item of comment){
        if(userId && userId === item.user.id){
          item.user.thumbUpIds = thumbUpIds
          item.user.thumbDownIds = thumbDownIds
        }
      }
      // console.log(comment);
      this.comments = comment;
    },
    uploadComment() {
      this.animeMessage = this.$store.state.animeMessage;
      this.get_comment_list(this.$store.state.animeMessage.id);
      const title = this.$refs.title;
      const titleOffsetTop = title.offsetTop;
      this.$store.commit({
        type: "titleOffsetTop",
        titleOffsetTop,
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    toLogin() {
      this.$router.push("/login");
      let scrollY =
        window.pageYOffset !== undefined
          ? window.pageYOffset
          : (
              document.documentElement ||
              document.body.parentNode ||
              document.body
            ).scrollTop;
      this.$store.dispatch({
        type: "originalPosition",
        scrollY,
      });
      this.$store.commit({
        type: "commentInfo",
        commentInfo: this.commentContent,
      });
      this.dialogVisible = false;
    },
  },
};
</script>

<style scoped>
a {
  color: black;
  text-decoration: none;
}
a:hover {
  color: white;
  cursor: pointer;
  background: #ff5777;
}
.introduce {
  margin-top: 60px;
  margin-left: 80px;
  width: 1020px;
}
.message {
  display: flex;
  padding-bottom: 30px;
}
.AnimeImg {
  width: 220px;
  height: 300px;
}
.AnimeMessage {
  position: relative;
}
.AnimeMessage li {
  list-style-type: none;
  padding: 10px;
}
.AnimeMessage span {
  color: #999;
  padding-right: 10px;
}
.AnimeMessage div {
  font-size: 20px;
}
.AnimeMessage .collect {
  font-size: 15px;
  position: relative;
}
.AnimeMessage img {
  width: 35px;
  height: 35px;
}
.AnimeMessage a {
  position: absolute;
  font-size: 15px;
  left: 50px;
  top: 10px;
  white-space: nowrap;
}
.video-play {
  display: flex;
  margin-top: 20px;
  font-size: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid rgba(100, 100, 100, 0.1);
}
.video-play img {
  width: 30px;
  height: 30px;
  padding-right: 10px;
}
.play {
  width: 1020px;
  height: 200px;
  overflow: scroll;
  margin-top: 10px;
}
.play a {
  text-align: center;
  display: inline-block;
  width: 130px;
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  border: 1px solid rgba(100, 100, 100, 0.1);
  margin-right: 10px;
  margin-top: 10px;
}
.comment {
  width: 1020px;
  margin-top: 20px;
  margin-left: 80px;
}
.title {
  font-size: 20px;
}
.commentSubmit {
  display: flex;
  width: 80%;
  margin: 20px 0;
}
.comment-input {
  margin-right: 20px;
}
</style>
