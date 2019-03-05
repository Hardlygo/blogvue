<template>
  <div>
    <div class="content-card" style="margin:6px;text-align: left;margin-bottom:2px;padding:3px;">
      <div class="card-heard">
        <img class="avatar" :src="imgUrl" />
        <div style="margin-left:6px;">
          <span style="line-height:8px;color:#87CEEB"><a href="javacript:void(0);">{{post.author.name}}</a></span><br />
          <span style="color:#999;font-size:12px;text-align: left;">时间：{{post.create_at}} | 浏览：{{post.pv}}
          </span>
        </div>
      </div>
      <!-- <router-link  :to="{name:'postcontent',params:{id:post._id}}"> -->
      <!-- v-clampy="3"最多显示三行 -->
      <div @click="toContent(post._id)" v-clampy="5" class="content" style="font-size:14px;line-height:1.7;" v-html="post.content">

      </div>
      <!-- </router-link> -->
    </div>
    <!-- <div style="border-top:#CCC solid 1px;"></div> -->
  </div>
</template>
<script>
  import clampy from '@clampy-js/vue-clampy';
  import Vue from 'vue';
  export default {
    directives: {
      clampy
    },
    props: {
      post: {
        type: Object
      }
    },
    data() {
      return {};
    },
    computed: {
      imgUrl: function () {
        if (this.post.author.avatar) {
          return 'http://127.0.0.1:3000/' + this.post.author.avatar;
        } else {
          return 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm';
        }
      }
    },
    methods: {
      toContent(id){
         this.$router.push({ name: 'postcontent', params: { id: id }});
      }
    }
  };

</script>
<style>
a div{
  text-decoration: none;
}
webkit-any-link {
    color: black;
    cursor: pointer;
    text-decoration: none;
}
  .content-card {
    border: 1px solid #ddd;
    border-radius: 5px;
    /* border: #ccc solid 1px; */
    /* box-shadow: 0px 1px 3px rgba(34, 25, 25, 0.2); */
    /* max-height: 180px; */
    text-overflow: ellipsis;
    /*当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
    /* white-space: nowrap; 不换行 */
    overflow: hidden;
    /* 内容超出宽度时隐藏超出部分的内容*/
    display: -webkit-box;
    /*最多显示行数的显示方式*/
    -webkit-line-clamp: 4;
    /*（行数）*/
    -webkit-box-orient: vertical;
    /*竖直排列*/
  }

  .avatar {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    float: left;
  }

  .content {
    word-wrap: break-word;
    /*文字自动换行*/
  }

  .card-heard {
    width: 100%;
    text-align: left;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    flex-direction: row;
  }

  span a:link {
    color: #ffd39b;
    text-decoration: none;
  }

  span a:visited {
    color: #ffd39b;
    text-decoration: none;
  }

  span a:active {
    color: #87ceeb;
    text-decoration: none;
  }

  .content {
    /* display: flex;
  justify-content: center;
  align-items: center;   */
    display: table-cell;
    vertical-align: middle;
    text-align: justify;
  }

  .content div img {
    width: 90%;
    margin-top: 4px;
  }

</style>
