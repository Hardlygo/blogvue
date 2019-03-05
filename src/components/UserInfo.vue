<template>
  <div>

    <!-- <mt-swipe :showIndicators="false" style="height:140px"> -->
    <!-- <mt-swipe-item style="background:brown;text-align: center"> -->
    <div class="info-card">
      <img class="myself" :src="imgUrl"><br/>
      <span style="margin-top:2px">{{user.name}}</span><br/>
      <span style="margin-top:2px;color: #999;font-size:10px">{{user.bio}}</span><br/>
    </div>
    <div>
    </div>
    <!-- </mt-swipe-item> -->
    <!-- </mt-swipe> -->

  </div>
</template>
<script>
  import {
    Api
  } from "@/utils/Api.js";
  import StackBlur from '@/utils/OutSideJS/StackBlur'
  export default {
    created() {
      this.getUserInfo()
    },
    data() {
      return {
        user: {}
      }
    },
    computed: {
      imgUrl: function () {
        if (this.user.avatar) {
          return 'http://127.0.0.1:3000/' + this.user.avatar;
        } else {
          return 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm';
        }
      }
    },
    methods: {
      /**获取个人信息，请求结果被覆盖console.log(data) */
      getUserInfo() {
        this.http(Api.user.userinfo)
          .then(data => {
            if (data.statu) {
              this.user = data.data
              console.log(this.user)
            }
          })
          .catch(err => {
            this.myToast = this.Toast({
              message: err,
              position: "bottom"
            });
          });
      }
    }
  }

</script>
<style>
  .myself {
    margin-top: 6px;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    border: 4px solid white;
  }

  .info-card {
    box-sizing:border-box;
    display: table-cell;
    position: absolute;
    top: 40px;
    left: 0px;
    right: 0px;
    width: 100%;
    height: 142px;
    background: 	#B0C4DE;
    text-align: center;
  }


</style>
