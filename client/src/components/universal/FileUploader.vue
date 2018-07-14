<template>
  <div class="white elevation-2">
    <div style="height: 500px; width: 500px; border: 1px solid red; position: relative;">
      <vue-draggable-resizable  :active="true" :w="100" :h="100" v-on:dragging="onDrag" v-on:resizing="onResize" :parent="true">
        <p>Hello! I'm a flexible component. You can drag me around and you can resize me.<br>
        X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}</p>
      </vue-draggable-resizable>
    </div>
    <br>
    <br>
    <form id="upload-form">
      <v-layout wrap>
        <v-flex xs12>
          <img :src="imgUrl" height="150" v-if="imgUrl" />
          <v-text-field label="Select Image" @click="pickFile" v-model="imgName" prepend-icon="attach_file"></v-text-field>
          <input type="file" style="display: none;" ref="image" accept="image/*" @change="onFilePicked" />
        </v-flex>
        <br>
        <br>
        <v-btn dark color="primary" @click="uploadImgToServer">Upload</v-btn>
      </v-layout>
    </form>
  </div>
</template>

<script>
  import UploadService from '@/services/UploadService';
  var FormData = require('form-data');
  export default {
    data(){
      return{
        imgName: null,
        imgUrl: null,
        imgFile: null,
        width: 0,
        height: 0,
        x: 0,
        y: 0
      }
    },
    methods:{
      onResize: function (x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
      },
      onDrag: function (x, y) {
        this.x = x
        this.y = y
      },
      pickFile(){
        this.$refs.image.click();
      },
      onFilePicked(e){
        const files = e.target.files;
        console.log(files);
        const file = files[0];
        if(file){
          this.imgName = file.name;
          if(this.imgName.lastIndexOf('.') <= 0){
            return;
          }
          const fr = new FileReader();
          fr.readAsDataURL(file);
          console.log(fr);
          fr.addEventListener('load', ()=>{
            this.imgUrl = fr.result;
            this.imgFile = files[0];
            console.log(this.imgName, this.imgFile);
          });
        } else{
          this.imgName = null;
          this.imgUrl = null;
          this.imgFile = null;
        }
      },
      async uploadImgToServer(){
        let formData = new FormData();
        formData.append("image", this.imgFile, this.imgName);
        console.log(formData);
        try{
          const uploadedFile = await UploadService.UploadUserProfileImage(formData);
          console.log("SUCCESS", uploadedFile);
        }catch(error){
          console.log("ERROR", error);
        }
      }
    }
  }
</script>

<style scoped>

</style>
