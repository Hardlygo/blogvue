<template>
  <div>
    <div id="header">
      <mt-header fixed title="圈圈内容">
        <mt-button @click.native="back" slot="left"><i class="fa fa-chevron-left fa-lg"></i>返回</mt-button>
      </mt-header>
    </div>
    <div id="postcontent">
      <scroller ref="myscroller">
        <!-- 用户头像信息 -->
        <div class="card-heard">
          <img class="avatar" :src="imgUrl" />
          <div style="margin-left:6px;">
            <span style="line-height:8px;color:#87CEEB"><a href="javacript:void(0);">{{post.author?post.author.name:''}}</a></span><br />
            <span style="color:#999;font-size:12px;text-align: left;">时间：{{post.create_at}} | 浏览：{{post.pv}}
            </span>
          </div>
        </div>
        <!-- post内容 -->
        <div class="content" style="font-size:14px;line-height:1.7;" v-html="post.content"></div>
        <!-- 留言区域 -->
        <div class="comments">
          <h6 style="background:#DCDCDC">留言{{'('+commentsCount+')'}} <i @click="showCommentInput" style="float:right;padding:3px;color:#CD5C5C;margin-right:6px"
              class="fa fa-plus fa-lg"></i></h6>
          <template v-for="(item,index) in comments">
            <comment :key="index" :comment="item" />
          </template>
        </div>
      </scroller>
    </div>
    <mt-popup style="width:100%;" position="bottom" v-model="showInput" popup-transition="popup-fade">
      <mt-field style="background:#E8E8E8" placeholder="马路锦最可爱~~" type="textarea" rows="4" v-model="commentContent"></mt-field>
      <mt-button @click.native="newComment" style="width:100%;padding-bottom:8px;">
        <span style="color:#FF6A6A">让她知道吧</span>
      </mt-button>

    </mt-popup>

  </div>
</template>
<script>
  import comment from "@/components/Comment";
  import {
    Api
  } from "@/utils/Api.js";
  export default {
    components: {
      comment
    },
    data() {
      return {
        post: {},
        comments: [],
        commentsCount: 0,
        showInput: false,
        commentContent: ''
      }
    },
    computed: {
      imgUrl: function () {
        if (this.post.author) {
          return 'http://127.0.0.1:3000/' + this.post.author.avatar;
        } else {
          return 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm';
        }
      }
    },
    created() {
      /**获取文章内容 */
      this.getPost({
        id: this.$route.params.id
      });
      /**获取文章评论 */
      this.getComments({
        id: this.$route.params.id
      });
      /**获取文章数量 */
      this.getCommentCount({
        postId: this.$route.params.id
      })
    },
    methods: {
      /**回退 */
      back() {
        if (window.history.length <= 1) {
          this.$router.push({
            path: '/'
          })
          return false
        } else {
          this.$router.go(-1)
        }
      },
      /**获取文章详情 */
      getPost(params = {}) {
        this.http(Api.post.getpost, params)
          .then(data => {
            this.post = data.data;
          })
          .catch(err => {
            this.Toast({
              message: err,
              position: "bottom"
            });
          });
      },
      /**获取评论详情 */
      getComments(params = {}) {
        this.http(Api.comment.getcomments, params)
          .then(data => {
            this.comments = data.data;
          })
          .catch(err => {
            this.Toast({
              message: err,
              position: "bottom"
            });
          })
      },
      /**获取留言数 */
      getCommentCount(params = {}) {
        this.http(Api.comment.commentcounts, params)
          .then(data => {
            if (!isNaN(data.data)) {
              this.commentsCount = data.data;
            }
          })
          .catch(err => {
            this.Toast({
              message: err,
              position: "bottom"
            });
          })
      },
      showCommentInput() {
        this.showInput = true
      },
      newComment() {
        if (this.commentContent == '') {
          return
        }
        this.showInput = false
        var params = {
          postId: this.$route.params.id,
          content: this.commentContent
        }
        this.http(Api.comment.addcomment, params)
          .then(data => {
            /**再次刷新数据 */
            if (data.statu == 1) {
              /**获取文章评论 */
              this.getComments({
                id: this.$route.params.id
              });
              /**获取文章数量 */
              this.getCommentCount({
                postId: this.$route.params.id
              });
              //清空输入
              this.commentContent = ""
            } else {
              this.Toast({
                message: data.data.msg,
                position: "bottom"
              });
            }
          })
          .catch(err => {
            this.Toast({
              message: err,
              position: "bottom"
            });
          })
      }
    }
  }

</script>
<style>
img{vertical-align:middle;}
    /* 控制scroller的布局 */
   #postcontent div[id*="inner-"]._v-content {
      padding-top: 45px;
      padding-bottom: 55px;
      box-sizing: border-box;
      padding-left: 5px;
      padding-right: 5px;
      /* padding-bottom:65px; */
    }

  #postcontent {
    box-sizing: border-box;
    display: block;
    /* position: absolute; */
    padding-left: 4px;

  }

  #postcontent .content {
    box-sizing: border-box;
    padding-top: 5px;
  }

  .avatar {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    float: left;
  }

  #postcontent .card-heard {
    border-radius: 5px;
    padding: 4px;
  }

</style>
