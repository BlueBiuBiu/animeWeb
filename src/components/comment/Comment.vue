<template>
  <div>
    <div v-for="(item, index) in comments">
      <div
        class="comments"
        v-if="
          index >= maxCount * (currentPage - 1) &&
          index < maxCount * currentPage &&
          !isComment
        "
      >
        <div class="avatar">
          <img :src="item.user.avatar | noAvatar" alt="" />
        </div>
        <div class="content">
          <div class="user">
            <span class="name">{{ item.user.username }}</span>
            <span class="create">{{ item.createTime | timeFormat }}</span>
            <span v-if="item.replyTo">
              <span class="reply">回复</span>
              <span class="reply-to">@{{ item.replyTo }}</span>
            </span>
          </div>
          <p class="comment-content">
            {{ item.content }}
          </p>
          <div class="info">
            <div>
              <i v-if="(item.thumbUpIds && item.thumbUpIds.includes(item.id)) || 0" class="thumb-up-active" @click="childThumbUp(item)"></i>
              <i v-else class="thumb-up" @click="childThumbUp(item)"></i>
              <span>{{ item.thumb_up }}</span>
            </div>
            <div>
              <i v-if="(item.thumbDownIds && item.thumbDownIds.includes(item.id)) || 0" class="thumb-down-active" @click="childThumbDown(item)"></i>
              <i v-else class="thumb-down" @click="childThumbDown(item)"></i>
            </div>
            <div>
              <span class="reply" @click="replyChild($event, item, index)">
                回复
              </span>
            </div>
          </div>
          <div>
            <div
              v-if="
                more &&
                (index === maxCount * currentPage - 1 ||
                  index === comments.length - 1)
              "
              class="pagination"
            >
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="6"
                layout="total, prev, pager, next"
                next-text="下一页"
                :total="comments.length"
              >
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
      <div
        class="comments"
        v-if="
          index >= 10 * (currentPage1 - 1) &&
          index < 10 * currentPage1 &&
          isComment
        "
      >
        <div class="avatar">
          <img :src="item.user.avatar | noAvatar" alt="" />
        </div>
        <div class="content">
          <div class="user">
            <span class="name">{{ item.user.username }}</span>
            <el-tooltip class="item" effect="dark" :content="item.createTime | tooltipFormat" placement="top">
              <span class="create">{{ item.createTime | timeFormat }}</span>
            </el-tooltip>
          </div>
          <p class="comment-content">
            {{ item.content }}
          </p>
          <div class="info">
            <div>
              <i v-if="(item.user.thumbUpIds && item.user.thumbUpIds.includes(item.id)) || 0" class="thumb-up-active" @click="mainThumbUp(item)"></i>
              <i v-else class="thumb-up" @click="mainThumbUp(item)"></i>
              <span>{{ item.thumb_up }}</span>
            </div>
            <div>
              <i v-if="(item.user.thumbDownIds && item.user.thumbDownIds.includes(item.id)) || 0" class="thumb-down-active" @click="mainThumbDown(item)"></i>
              <i v-else class="thumb-down" @click="mainThumbDown(item)"></i>
            </div>
            <div>
              <span class="reply" @click="replyMain($event, item, index)"
                >回复</span
              >
            </div>
          </div>
          <Comment
            :comments="item.reply"
            :isComment="false"
            :more="moreReply"
            :maxCount="childCount"
            :mainIndex="index"
            @replyChild="replyTo"
            @mainThumbUp="mainThumbUp"
            @mainThumbDown="mainThumbDown"
          />
          <div
            v-if="isComment && item.reply.length > 2 && !moreReply"
            class="more"
          >
            共
            <span class="count">{{ item.reply.length - 3 }}</span>
            条回复,
            <a @click="allReply">点击查看</a>
          </div>
          <div
            v-if="index === currentIndex"
            class="commentSubmit2"
            @click="commentClick"
            ref="replyMainComment"
          >
            <el-input
              class="comment-input"
              :rows="3.5"
              type="textarea"
              placeholder="请输入评论内容"
              v-model="commentContent"
              maxlength="1000"
              change="inputChange"
              show-word-limit
            >
            </el-input>
            <el-button type="primary" @click="replyComment">发表评论</el-button>
          </div>
          <div
            v-if="
              index === 10 * currentPage1 - 1 || index === comments.length - 1
            "
            class="pagination1"
          >
            <div class="commentSubmit">
              <el-input
                class="comment-input"
                :rows="3.5"
                type="textarea"
                placeholder="请输入评论内容"
                v-model="commentContent"
                maxlength="1000"
                change="inputChange"
                show-word-limit
              >
              </el-input>
              <el-button type="primary" @click="commentSubmit"
                >发表评论</el-button
              >
            </div>
            <el-pagination
              @current-change="handleCurrentChange1"
              :current-page.sync="currentPage1"
              :page-size="10"
              layout="total, prev, pager, next"
              next-text="下一页"
              :total="comments.length"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
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
</template>

<script>
import Comment from "components/comment/Comment";
import moment from "moment"
import { uploadCommentInfo, getAvatarById, thumbUpAdd, thumbDownAdd } from "network/home2";

export default {
  name: "Comment",
  data() {
    return {
      currentPage: 1,
      currentPage1: 1,
      moreReply: false,
      childCount: 3,
      minCount: 0,
      commentContent: "",
      dialogVisible: false,
      currentIndex: -1,
      commentId: null
    };
  },
  props: {
    isComment: {
      type: Boolean,
      default() {
        return false;
      },
    },
    comments: {
      type: Array,
      default() {
        return [];
      },
    },
    more: {
      type: Boolean,
      default() {
        return false;
      },
    },
    maxCount: {
      type: Number,
      default() {
        return 3;
      },
    },
    mainIndex: {
      type: Number,
      default() {
        return -1;
      },
    },
  },
  components: {
    Comment,
  },
  mounted() {
    const scrollY = this.$store.state.originalPosition;
    this.commentContent = this.$store.state.commentInfo;
    window.scroll(0, scrollY);
  },
  updated() {
    document.body.onclick = () => {
      this.currentIndex = -1;
    };
  },
  filters: {
    noAvatar(value) {
      if (value) {
        return value;
      } else {
        return require("assets/img/akari.jpg");
      }
    },
    timeFormat(value){
      const result = value.split(".")
      const time = result[0].replace("T"," ")
      // console.log(moment(time).fromNow());
      return moment(time).fromNow()
    },
    tooltipFormat(value){
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  methods: {
    async childThumbUp(item){ 
      this.$emit("mainThumbUp",item)
    },
    async childThumbDown(item){
      this.$emit("mainThumbDown",item)
    },
    async mainThumbUp(item){
      const user = this.$store.state.userInfo;
      const thumbUpIds = this.$store.state.userInfo.thumb_up_ids
      const thumbDownIds = this.$store.state.userInfo.thumb_down_ids
      if (!user.id) {
        this.dialogVisible = true;
      } else {
        if(thumbUpIds && thumbUpIds.includes(item.id)){
          this.$message({
            message: '你已经点过赞了~',
            type: 'warning'
          })
          return
        }
        if(thumbDownIds && thumbDownIds.includes(item.id)){
           this.$message({
            message: '你已经点踩了~',
            type: 'warning'
          })
          return
        }
        await thumbUpAdd(item.id,user.id)
        this.refreshUserInfo(user.id)
        this.$message({
          message: '点赞成功~',
          type: 'success'
        })
        this.$emit("uploadComment");
      }
    },
    async mainThumbDown(item){
      const user = this.$store.state.userInfo;
      const thumbUpIds = this.$store.state.userInfo.thumb_up_ids
      const thumbDownIds = this.$store.state.userInfo.thumb_down_ids
       if (!user.id) {
        this.dialogVisible = true;
      } else {
        if(thumbDownIds && thumbDownIds.includes(item.id)){
          this.$message({
            message: '你已经点过踩了~',
            type: 'warning'
          })
          return
        }
        if(thumbUpIds && thumbUpIds.includes(item.id)){
           this.$message({
            message: '你已经点赞了~',
            type: 'warning'
          })
          return
        }
        await thumbDownAdd(item.id,user.id)
        this.refreshUserInfo(user.id)
        this.$message({
          message: '点踩成功~',
          type: 'success'
        })
        this.$emit("uploadComment");
      }
    },
    replyTo(replyToId, mainIndex) {
      console.log(replyToId, mainIndex);
      this.currentIndex = mainIndex;
      this.commentId = replyToId;
      this.$nextTick(() => {
        const scrollElement = this.$refs.replyMainComment[0];
        window.scrollTo(0, scrollElement.offsetTop - window.screen.height / 2);
      });
    },
    replyChild(e, item, index) {
      e.stopPropagation();
      const replyToId = item.id;
      this.$emit("replyChild", replyToId, this.mainIndex);
    },
    commentClick(e) {
      e.stopPropagation();
    },
    replyMain(e, item, index) {
      e.stopPropagation();
      // console.log(item);
      if (this.currentIndex !== index) {
        this.currentIndex = index;
        this.commentId = item.id;
        this.$nextTick(() => {
          const scrollElement = this.$refs.replyMainComment[0];
          window.scrollTo(
            0,
            scrollElement.offsetTop - window.screen.height / 2
          );
        });
      }
    },
    replyComment() {
      const user = this.$store.state.userInfo;
      const animeMessage = this.$store.state.animeMessage;
      const animeId = animeMessage.id;
      const userId = user.id;
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
          uploadCommentInfo(
            animeId,
            this.commentContent,
            userId,
            this.commentId
          ).then(() => {
            this.commentContent = "";
            this.$message({
              title: "成功",
              message: "发表评论成功",
              type: "success",
            });
            this.$emit("uploadComment");
            // console.log(this.$refs.replyMainComment[0].offsetTop);
            const scrollElement = this.$refs.replyMainComment[0];
            window.scroll(
              0,
              scrollElement.offsetTop - scrollElement.offsetWidth
            );
          });
        }
      }
    },
    allReply() {
      this.moreReply = true;
      this.childCount = 6;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
    handleCurrentChange1(val) {
      this.currentPage1 = val;
      console.log(`当前页: ${val}`);
    },
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
            this.$emit("uploadComment");
            const titleOffsetTop = this.$store.state.titleOffsetTop;
            window.scroll(0, titleOffsetTop);
          });
        }
      }
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
    refreshUserInfo(id){
      const userInfo = this.$store.state.userInfo
      getAvatarById(id).then(res => {
      // console.log(res);
        this.$store.commit({
          type: "refreshUserInfo",
          res
        });
      })
    }
  }
}
</script>

<style scoped>
.comments {
  display: flex;
  margin-top: 10px;
  padding: 20px 0;
  border-top: 1px solid #e5e9ef;
}
.avatar {
  width: 48px;
  height: 48px;
}
.avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.content {
  margin-left: 30px;
  flex: 1;
}
.user .name {
  color: #ff5777;
  font-size: 14px;
  font-weight: 600;
}
.user .create {
  margin-left: 10px;
  color: #99a2aa;
}
.user .reply {
  color: #00a1d6;
  font-size: 14px;
}
.user .reply-to {
  color: #00a1d6;
  font-size: 14px;
}
.comment-content {
  margin: 15px 0;
  font-size: 14px;
  line-height: 20px;
  word-wrap: break-word;
}
.content .info {
  display: flex;
  color: #99a2aa;
  height: 20px;
  line-height: 20px;
}
i {
  font-style: normal;
  display: inline-block;
  width: 14px;
  height: 14px;
  margin: 0 8px;
  cursor: pointer;
}
.thumb-up {
  background: url("../../assets/img/thumb.svg") no-repeat;
  background-size: contain;
}
.thumb-up-active {
  background: url("../../assets/img/thumb_active.svg") no-repeat;
  background-size: contain;
}
.thumb-down {
  background: url("../../assets/img/thumb_down.svg") no-repeat;
  background-size: contain;
  margin-left: 10px;
}
.thumb-down-active {
  background: url("../../assets/img/thumb_down_active.svg") no-repeat;
  background-size: contain;
  margin-left: 10px;
}
.reply {
  margin-left: 10px;
  font-size: 12px;
  padding: 5px;
  cursor: pointer;
}
.reply:hover {
  padding: 3px;
  border-radius: 3px;
  background-color: #e5e9ef;
}
.more {
  color: #99a2aa;
}
.count {
  color: #6d757a;
  font-weight: 700;
}
.more a {
  font-size: 13px;
  color: #00a1d6;
}
.more a:hover {
  cursor: pointer;
  padding: 3px;
  border-radius: 3px;
  background-color: #e5e9ef;
}
.pagination {
  margin-top: 20px;
}
.pagination1 {
  text-align: center;
}
.commentSubmit {
  display: flex;
  margin: 20px 0;
}
.commentSubmit2 {
  display: flex;
  margin: 20px 0;
  width: 80%;
}
.comment-input {
  margin-right: 20px;
}
</style>
