<template>
  <div class="comments">
    <img class="avatar" :src="imgUrl" />
    <div style="margin-left:32px;font-size:10px;">
      <span style="line-height:8px;color:#87CEEB"><a href="javacript:void(0);">{{comment.author?comment.author.name:''}}</a></span>
      &nbsp;<span style="color:#999;font-size:8px;text-align: left;">时间：{{comment.create_at}}</span><br/>
      <div class="comment" style="" v-html="comment.content"></div>
    </div>
    <div style="padding:8px 0px 8px 0px; border-top:#CCC solid 0.5px;"></div>
  </div>
</template>
<script>
  export default {
    props: {
      comment: {
        type: Object
      }
    },
    computed: {
      imgUrl() {
        if (this.comment.author.avatar) {
          return 'http://127.0.0.1:3000/' + this.comment.author.avatar;
        } else {
          return 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm';
        }
      }
    },
    data() {
      return {

      }
    },
    methods: {

    }
  }

</script>
<style>
.comments .avatar {
    border-radius: 50%;
    width: 30px;
    height: 30px;
    float: left;
  }
</style>
