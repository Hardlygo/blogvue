<template>
    <div>
        <div style="text-align: center; margin-top:85px;">
            <img src="@/assets/mylogo.png">
            <div id="request-form" style="padding:10px;">
                <mt-field label="用户名" placeholder="请输入用户名" v-model="name" />
                <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password" />
            </div>
            <mt-button type="primary" size="large" @click.native="checkLogin">登陆</mt-button>
        </div>
        <div style="text-align:right;margin-top:8px;">
            <span @click="goRegister" style="color:#8a6d3b;font-size:8px">还没有账号？现在就注册</span>
        </div>
    </div>
</template>
<script>
import { Api } from "../../utils/Api.js";
export default {
  data() {
    return {
      name: "",
      password: ""
    };
  },
  methods: {
    /**
     * 获取用户输入
     * 请求接口
     * 返回数据
     */
    checkLogin() {
      //每次新的点击都会把当前显示的toast清除显示
      if (this.timer) {
        this.myToast.close();
      }
      this.Indicator.open({
        text: "马路锦无敌可爱...",
        spinnerType: "fading-circle"
      });
      let user = {
        name: this.name,
        password: this.password
      };
      this.http(Api.user.login, user)
        .then(data => {
           this.timer = setTimeout(() => {
            //关闭转圈
            this.Indicator.close();
            if (data.statu == 1) {
              setTimeout(() => {
                this.$router.push({ path: "/home" });
              }, 1500);
            } else {
              this.myToast = this.Toast({
                message: data.detail,
                position: "bottom"
              });
            }
          }, 3000);
        })
        .catch(err => {
          this.timer = setTimeout(() => {
            this.Indicator.close();
            this.myToast = this.Toast({
              message: "你惹马路锦生气了，去低头认错乖",
              position: "bottom"
            });
          }, 2000);
        });
    },
    goRegister() {
      console.log("去注册了");
      this.$router.push({ path: "/register" });
    }
  },
  created() {},
  mounted() {}
};
</script>
<style>
/* img{
    position:absolute;
    left: 50%;
    top: 35%;
    transform: translate(-50%, -35%);
} */
#parent {
  display: table;
}
#child {
  display: table-cell;
  vertical-align: middle;
}
</style>

