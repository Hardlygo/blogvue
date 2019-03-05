<template>
    <div>
        <div id="header">
            <mt-header fixed title="说说你想说的吧">
                <mt-button @click.native="back" slot="left"><i class="fa fa-chevron-left fa-lg"></i>返回</mt-button>
                <mt-button @click="doPublish" slot="right">发表</mt-button>
            </mt-header>
        </div>
        <div id="content">
            <vue-html5-editor :auto-height="true" @change="updateData" :content="content" :height="500"></vue-html5-editor>
        </div>
    </div>
</template>
<script>
import { Api } from "@/utils/Api.js";
export default {
  data() {
    return {
      content: ""
    };
  },
  methods: {
    updateData(val) {
      this.content = val;
    },
    /**新建post文 */
    doPublish() {
        let post={
            content:this.content
        }
      this.http(Api.post.newpost,post)
        .then(data => {
          if(data.statu==0){
             this.myToast=this.Toast({
              message: data.data.msg+",mama看不懂",
              position: "bottom"
            });
          }
          else{
            this.myToast=this.Toast({
              message: '收到！我会帮你告诉mama',
              position: "bottom"
            });
            this.$router.push({ path: "/home" });
          }
        })
        .catch(err => {
          this.myToast=this.Toast({
              message: err,
              position: "bottom"
            });
        });
    },
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
  }
};
</script>
<style>
#content {
  padding-top: 44px;
}
</style>
