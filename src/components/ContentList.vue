<template>
    <div>
        <div class="content-card" style="padding: 8px;text-align: left">
            <div class="card-heard">
                <img class="avatar" src="https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm" />
                <div style="margin-left:6px;">
                    <h3 style="line-height:8px;color:#87CEEB">第一次</h3>
                    <span style="color:#999;font-size:12px;text-align: left;">作者：hardly | 时间：2018-01-01 | 浏览：8 | <a href="#">详情</a> </span>
                </div>
            </div>
                <div  class="content" style="font-size:14px;line-height:1.7;text-indent: 1em;" v-html="content">
                </div>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    DataList: {
      type: Object
    }
  },
  data() {
    return {
      content:
        "<p>欢迎来踩</p>\ndasda<br/>adasdasdfsdfsdfsdfsdfsdfsdfsdfafsdfsdafsdafsdfsdfsdfsadfs111111<br/>asdasdas<br/>asdsad<br/>"
    };
  },
  methods: {}
};
</script>
<style>
.content-card {
  /* border: #ccc solid 1px; */
  box-shadow: 0px 1px 3px rgba(34, 25, 25, 0.2);
  /* max-height: 180px; */
  text-overflow: ellipsis; /*当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  /* white-space: nowrap; 不换行 */
  overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容*/
  display: -webkit-box;/*最多显示行数的显示方式*/
  -webkit-line-clamp: 4; /*（行数）*/
  -webkit-box-orient: vertical;/*竖直排列*/
}

.avatar {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  float: left;
}
.content{
    word-wrap: break-word;/*文字自动换行*/
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
p a:link{color:#FFD39B;}
p a:visited{color:#FFD39B;}
p a:active{
    color:#87CEEB;
}
</style>
