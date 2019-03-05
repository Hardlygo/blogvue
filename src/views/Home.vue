<template>
    <div>
        <div id="header">
            <mt-header fixed :title="active">
                <mt-button @click.native="newPost" slot="right"><i class="fa fa-plus fa-lg"></i></mt-button>
            </mt-header>

        </div>
        <div id="content">
            <mt-tab-container swipeable v-model="active">
                <mt-tab-container-item id="部落">
                    <div></div>
                    <!-- <div id="postlist" style="position:absolute;"> -->
                    <scroller ref="myscroller">
                        <PostList :PostList="posts"></PostList>
                    </scroller>
                    <!-- </div> -->
                </mt-tab-container-item>
                <mt-tab-container-item id="我的">
                    <scroller ref="myscroller">
                    <userinfo/>
                    </scroller>
                </mt-tab-container-item>
            </mt-tab-container>

        </div>
        <div id="footer">
            <mt-tabbar fixed v-model="active">
                <mt-tab-item id="部落">
                    <span style="font-size:12px" slot="icon">
                        <i class="fa fa-home fa-2x"></i>
                    </span>
                    <span>部落</span>
                </mt-tab-item>
                <mt-tab-item id="我的">
                    <span style="font-size:12px" slot="icon">
                        <i class="fa fa-user-o fa-2x"></i>
                    </span>
                    <span>我的</span>
                </mt-tab-item>
            </mt-tabbar>

        </div>
        <!-- <mt-button type="primary" size="large" @click.native="logout">注销登录</mt-button> -->
    </div>
</template>
<script>
import PostList from "@/components/PostList";
import userinfo from "@/components/UserInfo"
import { Api } from "@/utils/Api.js";
export default {
  components: {
    PostList,
    userinfo
  },
  data() {
    return {
      active: "部落",
      posts: [],
    };
  },
  methods: {
    logout() {
      this.http(Api.user.logout)
        .then(data => {
        })
        .catch(err => {});
    },
    getposts() {
      this.http(Api.post.getposts)
        .then(data => {
            if(data.statu==0){
                this.myToast = this.Toast({
                message: data.data.msg,
                position: "bottom"
              });
            }
            else{
                this.posts = data.data;
            }
        })
        .catch(err => {
            this.myToast=this.Toast({
              message: err,
              position: "bottom"
            });
        });
    },
    newPost(){
        this.$router.push({ path: "/input" });
    }
     
  },
  created() {
      //获取全部文章
    this.getposts();

  }
};
</script>
<style>
.mint-tab-item {
  color: #999;
}
#content {
  padding-top: 41px;
}

/* 控制scroller的布局 */
div[id*="inner-"]._v-content {
  padding-top: 45px;
  padding-bottom: 55px;
  box-sizing:border-box;
  /* padding-bottom:65px; */
}

#content .mint-tab-container {
  overflow: hidden;
  position: static;
  /* 使得padding生效 */
  box-sizing:border-box;
}
#footer{
    z-index: 99999;
}
</style>
