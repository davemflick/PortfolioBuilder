<template>
  <div class="white elevation-2">
    <v-layout wrap>
      <v-flex xs12>
        <div v-if="imgUrl" id="uploaded-image-container">
          <vue-draggable-resizable  :active="true" :w="300" :h="300" v-on:dragging="onDrag" :resizable="false" :parent="true" id="img-crop-box">
          </vue-draggable-resizable>
          <img :src="imgUrl" id="uploaded-img" v-if="imgUrl" />
        </div>
      </v-flex>
    </v-layout>
    <v-layout wrap>
      <v-flex xs12>
        <form id="upload-form">
          <div id="upload-fields-container">
            <v-text-field label="Select Image" @click="pickFile" v-model="imgName" prepend-icon="attach_file"></v-text-field>
            <input type="file" style="display: none;" ref="image" accept="image/*" @change="onFilePicked" />
          </div>
        </form>
      </v-flex>
      <br>
      <br>
      <v-btn dark color="primary" @click="uploadImgToServer">Upload</v-btn>
    </v-layout>
  </div>
</template>

<script>
  import UploadService from '@/services/UploadService';
  var FormData = require('form-data');

  function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
      return result;
  }
  function newFileName(value, rand, index) {
    return value.substring(0, index) + rand + value.substring(index);
}

  export default {
    data(){
      return{
        imgName: null,
        imgUrl: null,
        imgFile: null,
        imgSize: null,
        width: 300,
        height: 300,
        x: 0,
        y: 0
      }
    },
    methods:{
      onDrag: function (x, y) {
        this.x = x;
        this.y = y;
      },
      pickFile(){
        this.$refs.image.click();
      },
      onFilePicked(e){
        const files = e.target.files;
        const file = files[0];
        if(file){
          this.imgName = file.name;
          let lastDot = this.imgName.lastIndexOf('.');
          if(lastDot <= 0){
            return;
          } else {
            let randStr = randomString(12, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
            this.imgName = newFileName(this.imgName, randStr, lastDot);
          }
          const fr = new FileReader();
          fr.readAsDataURL(file);
          fr.addEventListener('load', ()=>{
            this.imgUrl = fr.result;
            this.imgFile = files[0];
          });

        } else{
          this.imgName = null;
          this.imgUrl = null;
          this.imgFile = null;
        }
      },
      async uploadImgToServer(){
        const myImage = document.getElementById('uploaded-img');
        let formData = new FormData();
        
        const boundaries = JSON.stringify({
          crop: {width: this.width, height: this.height, x: this.x, y: this.y},
          resize: {width: myImage.clientWidth, height: myImage.clientHeight}
        });
        formData.append('boundaries', boundaries);
        formData.append("image", this.imgFile, this.imgName);
        
        console.log(formData);
        try{
          const uploadedFile = await UploadService.UploadUserProfileImage(formData, boundaries);
          console.log("SUCCESS", uploadedFile);
        }catch(error){
          console.log("ERROR", error);
        }
      }
    }
  }
</script>

<style scoped>
#uploaded-image-container{
  width: 100%;
  height: 100%;
  max-width: 400px;
  min-width: 310px;
  max-height: 400px;
  min-height: 310px;
  border: 2px solid #aaa;
  padding: 5px;
  background-color: #ddd;
  position: relative;
  margin-bottom: 25px;
  overflow: hidden;
}
#upload-fields-container{
  margin-top: 10px;
  padding: 5px;
  display: block;
}

#uploaded-img{
  max-height: 100%;
  max-width: 100%;
}

#img-crop-box{
  border: 3px solid #333;
  cursor: move;
  -webkit-box-shadow: 0 0 100px 100px rgba(255,255,255, 0.55);
  -moz-box-shadow: 0 0 100px 100px rgba(255,255,255, 0.55);
  box-shadow: 0 0 100px 100px rgba(255,255,255, 0.55);
}

</style>
