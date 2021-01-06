<template>
  <div>
    <div v-for="(item, index) in comments">
      <div class="comments" v-if="index >= (maxCount * (currentPage-1)) && index < (maxCount * currentPage) && !isComment">
        <div class="avatar">
          <img :src="item.user.avatar | noAvatar" alt="" />
        </div>
        <div class="content">
          <div class="user">
            <span class="name">{{ item.user.username }}</span>
            <span class="create">{{ item.createTime }}</span>
          </div>
          <p class="comment-content">
            {{ item.content }}
          </p>
          <div class="info">
            <div>
              <i class="thumb-up"></i>
              <span>12345</span>
            </div>
            <div>
              <i class="thumb-down"></i>
            </div>
            <div>
              <span class="reply">回复</span>
            </div>
          </div>
          <div>
            <div v-if="more && (index === maxCount * currentPage - 1 || index === comments.length - 1)" class="pagination">
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
      <div class="comments" v-if="index < 10 && isComment">
        <div class="avatar">
          <img :src="item.user.avatar | noAvatar" alt="" />
        </div>
        <div class="content">
          <div class="user">
            <span class="name">{{ item.user.username }}</span>
            <span class="create">{{ item.createTime }}</span>
          </div>
          <p class="comment-content">
            {{ item.content }}
          </p>
          <div class="info">
            <div>
              <i class="thumb-up"></i>
              <span>12345</span>
            </div>
            <div>
              <i class="thumb-down"></i>
            </div>
            <div>
              <span class="reply">回复</span>
            </div>
          </div>
          <Comment :comments="item.reply" :isComment="false" :more="moreReply" :maxCount="childCount"/>
          <div v-if="isComment && item.reply.length > 2 && !moreReply" class="more">
            共
            <span class="count">{{item.reply.length - 3}}</span>
            条回复,
            <a @click="allReply">点击查看</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from "components/comment/Comment";

export default {
  name: "Comment",
  data() {
    return {
      currentPage: 1,
      moreReply: false,
      childCount: 3,
      minCount: 0
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
      default(){
        return false
      }
    },
    maxCount: {
      type: Number,
      default(){
        return 3
      }
    }
  },
  components: {
    Comment,
  },
  filters: {
    noAvatar(value) {
      if (value) {
        return value;
      } else {
        return require("assets/img/akari.jpg");
      }
    },
  },
  methods: {
    allReply() {
      this.moreReply = true;
      this.childCount = 6
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
  },
};
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
}
.thumb-up {
  background: url("../../assets/img/thumb.svg") no-repeat;
  background-size: contain;
}
.thumb-down {
  background: url("../../assets/img/thumb_down.svg") no-repeat;
  background-size: contain;
  margin-left: 10px;
}
.reply {
  margin-left: 10px;
  font-size: 12px;
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
</style>
