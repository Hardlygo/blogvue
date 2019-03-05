<template>
  <div>
    <mt-header fixed title="注册账号">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div style="padding-top:40px;">
      <upload-avatart ref="avatar" :uploadform="userData" style="text-align:center;" v-on:onShowForm="onShowForm" />
      <!-- 输入表单 -->
      <div v-show="ShowForm">
        <div>
          <mt-field label="用户名" placeholder="请输入用户名" v-model="userData.name"></mt-field>
          <mt-field label="性别" placeholder="请输入男|女|保密"  v-model="gender" readonly @click.native="getSex" disableClear ></mt-field>
          <mt-field label="密码" type="password" placeholder="请输入密码" v-model="userData.password"></mt-field>
          <mt-field label="确认密码" type="password" placeholder="请再次输入密码" v-model="userData.password1"></mt-field>
          <mt-field label="自我介绍" placeholder="自我介绍" type="textarea" rows="4" v-model="userData.bio"></mt-field>
        </div>
        <div style="margin-top:12px;">
          <mt-button type="primary" size="large" @click.native="regist">注册</mt-button>
        </div>
        <mt-actionsheet :actions="sexActions" :closeOnClickModal="true" v-model="chooseSex">
        </mt-actionsheet>

      </div>
    </div>
  </div>
</template>
<script>
import UploadAvatart from "../../components/UploadAvatar";
export default {
  data() {
    return {
      imageURI: require("@/assets/mylogo.png"),
      ShowForm: true,
      userData: {
        name: "",
        password: "",
        password1: "",
        bio: "",
        gender: ""
      },
      gender: "",
      chooseSex: false,
      sexActions:[{name:'男',method:()=>{this.gender='男';this.userData.gender='f'}},{name:'女',method:()=>{this.gender='女';this.userData.gender='m'}},{name:'保密',method:()=>{this.gender='保密';this.userData.gender='x'}}]
    };
  },
  methods: {
    regist() {
      //每次新的点击都会把当前显示的toast清除显示
      if (this.timer) {
        this.myToast.close();
      }
      this.Indicator.open({
        text: "马路锦无敌可爱...",
        spinnerType: "fading-circle"
      });
      //调用file-upload组件的自动上传功能（这里不使用）
      // this.$refs.avatar.$refs.upload.active = true;
      //调用头像组件的上传方法
      this.$refs.avatar
        .goUpload()
        .then(data => {
          //关闭加载，提示错误或跳转
          console.log(data);
          if (data.statu == 1) {
            //注册成功，为您跳转
            this.timer = setTimeout(() => {
              this.Indicator.close();
              this.myToast = this.Toast({
                message: "小仙女批准了，为您跳转登陆",
                iconClass: "icon icon-success",
                position: "middle"
              });
              setTimeout(() => {
                this.myToast.close();
                this.$router.push({ path: "/login" });
              }, 1500);
            }, 3000);
          } else {
            //提示错误信息
            this.timer = setTimeout(() => {
              this.Indicator.close();
              this.myToast = this.Toast({
                message: data.detail,
                position: "bottom"
              });
            }, 2000);
          }
        })
        .catch(e => {
          this.timer = setTimeout(() => {
            this.Indicator.close();
            this.myToast = this.Toast({
              message: "你惹马路锦生气了，去低头认错乖",
              position: "bottom"
            });
          }, 2000);
        });
    },
    onShowForm(flage) {
      //是否显示输入框
      this.ShowForm = flage;
    },
    getSex(){
      this.chooseSex=!this.chooseSex
    }
  },
  created() {},
  mounted() {},
  watch: {/*
    gender(newValue, oldValue) {
      var genderFilter = [
        { label: "男", value: "m" },
        { label: "女", value: "f" },
        { label: "保密", value: "x" }
      ];
      var genderChoosed = genderFilter.filter(item => {
        return item.label === newValue;
      });
      if (genderChoosed.length == 0) {
        this.genderState = "error";
      } else {
        this.userData.gender = genderChoosed[0].value;
        this.genderState = "success";
      }
    }*/
  },
  components: {
    UploadAvatart
  }
};
</script>
<style>
.logoimage {
  text-align: center;
}
</style>

