<template>
  <!-- <div>
        Wrap the image or canvas element with a block element (container)
        <div>
          <label for="avatar">
          <img :src="files.length ? files[0].url : 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'" class="rounded-circle" />
          <h4 class="pt-2">or<br/>Drop files anywhere to upload</h4>
        </label>
            <img @click="cropImag" id="image" src="@/assets/mylogo.png">
            <input type="file" name="file" accept=".jpg, .jpeg, .png" @change="uploadAvatar">
        </div>
    </div> -->
  <div>

    

    <a href="javascript:;" class="upload" style="" @click="chooseFile">
      <div>
      <label for="avatar">
        <img :src="files.length ? files[0].url : 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'" class="rounded-circle" />
      </label>
    </div>

      <!-- <span>选择文件</span>  -->
      <input ref="file" class="change" type="file" style="dispaly:none" />
    </a>

  </div>

</template>
<style>
.upload {
  padding: 4px 10px;
  /* height: 20px; */
  line-height: 20px;
  position: relative;
  /* border: 1px solid #999; */
  text-decoration: none;
  color: #666;
  
}
.change {
  position: absolute;
  overflow: hidden;
  right: 0;
  top: 0;
  opacity: 0;
}
.rounded-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
</style>

<script>
//读取不到文件实体
import axios from "axios";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
export default {
  data() {
    return {
      files: [],

    };
  },
  methods: {
    chooseFile(){
      console.log(this.$refs.file) 
      this.$refs.file.change(function(e){
        console.log(1111)
      })
    },
    uploadAvatar(avatar) {
      console.log(avatar.target.files[0]);
      let file = avatar.target.files[0];
      let data = new FormData();
      data.append("file", file, file.name);
      data.append("data", 112);
      console.log(data.get("file"));
      return axios.post("http://127.0.0.1:3000/user/file", data, {
        headers: { "content-type": "multipart/form-data" }
      });
    },
    cropImag() {
      const image = document.getElementById("image");
      const cropper = new Cropper(image, {
        aspectRatio: 16 / 9,
        crop(event) {
          console.log(event.detail.x);
          console.log(event.detail.y);
          console.log(event.detail.width);
          console.log(event.detail.height);
          console.log(event.detail.rotate);
          console.log(event.detail.scaleX);
          console.log(event.detail.scaleY);
        }
      });
    }
  }
};
</script>
<style>
/* Limit image width to avoid overflow the container */
img {
  max-width: 100%; /* This rule is very important, please do not ignore this! */
}
</style>
