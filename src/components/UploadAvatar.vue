<template>
  <div class="example-avatar">
    <!-- <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active">
      <h3>Drop files to upload</h3>
    </div> -->
    <div class="avatar-upload" v-show="!edit">
      <div class="text-center p-2">
        <label for="avatar">
          <img :src="files.length ? files[0].url : 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'" class="rounded-circle" />
          <!-- <h4 class="pt-2">or<br/>Drop files anywhere to upload</h4> -->
        </label>
      </div>
      <div class="text-center p-2">
        <!-- :post-action="baseUrl" -->
        <file-upload :maximum="1" :data="uploadform" extensions="gif,jpg,jpeg,png,webp" accept="image/png,image/gif,image/jpeg,image/webp" name="avatar" class="btn btn-primary" :custom-action="customAction" :drop="false" v-model="files" @input-filter="inputFilter" @input-file="inputFile" ref="upload">
          <span v-show="files.length==0">选择头像</span>
        </file-upload>
      </div>
    </div>

    <div class="avatar-edit" v-show="files.length && edit">
      <div class="text-center p-4">
        <div style="z-index:999999;padding:6px;">
          <mt-button style="float:left" @click.native.prevent="$refs.upload.clear">
            <span slot="icon" style="color: red">
              <i class="fa fa-close fa-2x"></i>
            </span>
          </mt-button>
          <mt-button style="float:right" @click.native.prevent="editSave">
            <span slot="icon" style="color: green">
              <i class="fa fa-check fa-2x"></i>
            </span>
          </mt-button>
        </div>
      </div>
      <div style="height:500px;margin-top:50px;" class="avatar-edit-image" v-if="files.length">
        <img ref="editImage" :src="files[0].url" />
      </div>
    </div>
  </div>
</template>
<style>
.example-avatar .avatar-upload .rounded-circle {
  width: 80px;
  height: 80px;
}
.rounded-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.example-avatar .text-center .btn {
  margin: 0 0.5rem;
}
.example-avatar .avatar-edit-image {
  max-width: 100%;
}
.example-avatar .drop-active {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 9999;
  opacity: 0.6;
  text-align: center;
  background: #000;
}
.example-avatar .drop-active h3 {
  margin: -0.5em 0 0;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 40px;
  color: #fff;
  padding: 0;
}
</style>


<script>
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import FileUpload from "vue-upload-component";
import {Api} from '../utils/Api.js'
export default {
  components: {
    FileUpload
  },
  props: {
    uploadform: {
      type: Object
    }
  },
  data() {
    return {
      files: [],
      cutFile: undefined,
      edit: false,
      cropper: false,
    };
  },
  mounted() {
    //this.$refs.upload.active = false;
  },
  watch: {
    edit(value) {
      if (value) {
        this.$nextTick(function() {
          if (!this.$refs.editImage) {
            return;
          }
          let cropper = new Cropper(this.$refs.editImage, {
            aspectRatio: 1 / 1,
            viewMode: 1,
            modal: true
          });
          this.cropper = cropper;
          this.$emit("onShowForm", false);
        });
      } else {
        if (this.cropper) {
          this.cropper.destroy();
          this.cropper = false;
          this.$emit("onShowForm", true);
        }
      }
    }
  },
  methods: {
    customAction(){
      //空操作
      return 
    },
    //注册
    goUpload() {
        var file = this.cutFile;
        //构造传递参数
        var data = {};
        Object.assign(data, { avatar: file }, this.uploadform);
        return this.http(Api.user.register,data)
    },
    editSave() {
      this.edit = false;
      let oldFile = this.files[0];
      let binStr = atob(
        this.cropper
          .getCroppedCanvas()
          .toDataURL(oldFile.type)
          .split(",")[1]
      );
      let arr = new Uint8Array(binStr.length);
      for (let i = 0; i < binStr.length; i++) {
        arr[i] = binStr.charCodeAt(i);
      }
      let file = new File([arr], oldFile.name, { type: oldFile.type });
      //取得修剪后的图片文件
      this.cutFile = file;

      this.$refs.upload.update(oldFile.id, {
        file,
        type: file.type,
        size: file.size,
        active: false
      });
    },
    alert(message) {
      alert(message);
    },
    inputFile(newFile, oldFile, prevent) {
      //添加文件
      if (newFile && !oldFile) {
        console.log(1);
        this.$nextTick(function() {
          this.edit = true;
        });
      }
      //删除文件
      if (!newFile && oldFile) {
        console.log(2);
        this.edit = false;
      }
    },
    inputFilter(newFile, oldFile, prevent) {
      if (!newFile && !oldFile) {
      //没有选择文件
        console.log(3);
      }
      if (newFile && !oldFile) {
        console.log(4);
        //添加文件
        if (!/\.(gif|jpg|jpeg|png|webp)$/i.test(newFile.name)) {
          this.alert("Your choice is not a picture");
          return prevent();
        }
      }
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        console.log(5);
        //新添加文件或者修改图片
        newFile.url = "";
        let URL = window.URL || window.webkitURL;
        if (URL && URL.createObjectURL) {
          newFile.url = URL.createObjectURL(newFile.file);
        }
      }
      // if(newFile && oldFile){
      //   // 更新文件
      //    // 上传成功
      //   if (newFile.success !== oldFile.success) {
      //     console.log('success', newFile.success, newFile)
      //   }
      // }
    }
  }
};
</script>