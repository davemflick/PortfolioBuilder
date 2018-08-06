  <template>
    <v-card style="max-width: 500px;">
      <v-card-title class="headline grey lighten-2" primary-title> File Uploader </v-card-title>
      <v-layout wrap>
        <v-flex xs12 class="text-center">
          <div v-if="file.url && file.type.indexOf('image') >= 0" id="uploaded-image-container">
            <vue-draggable-resizable v-if="needImgCrop" :active="true" :w="300" :h="300" v-on:dragging="onDrag" :resizable="false" :parent="true" id="img-crop-box">
            </vue-draggable-resizable>
            <img :src="file.url" id="uploaded-img" v-if="file.url" />
          </div>
        </v-flex>
        <v-flex xs-12>
          <div v-if="file && file.type.indexOf('pdf') >= 0">
            <div class="selected-pdf-file">
              <div class="text-xs-center">
                <v-chip>{{ file.name }}</v-chip>
              </div>
            </div>
          </div>
        </v-flex>
      </v-layout>
      <v-layout wrap>
        <v-flex xs12>
          <form id="upload-form">
            <div id="upload-fields-container">
              <v-text-field label="Select Image" @focus="pickFile" v-model="file.name" prepend-icon="attach_file"></v-text-field>
              <input type="file" style="display: none;" ref="image" accept=".pdf,image/*" @change="onFilePicked" />
            </div>
          </form>
        </v-flex>
        <br>
        <br>
        <v-btn dark color="primary" @click="uploadToServer">Upload</v-btn>
        <br>
        <br>
        <p v-if="error" class="alert error-alert">{{ error }}</p>
        <p v-if="success" class="alert success-alert">{{ success }}</p>
      </v-layout>
    </v-card>
  </template>

  <script>
    import UploadService from '@/services/UploadService';
    var FormData = require('form-data');

    function randomString(length, chars) {
      var result = '-';
      for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }
    function newFileName(value, rand, index) {
      value = value.replace(new RegExp(' ', 'g'), '-');
      return value.substring(0, index) + rand + value.substring(index);
    }

    export default {
      props: ['uploadTarget'],
      data(){
        return{
          file:{
            type: 'notta',
            name: null,
            url: null,
            file: null
          },
          needImgCrop: true,
          imgCrop: {
            width: 300,
            height: 300,
            x: 0,
            y: 0
          },
          error: null,
          success: null
        }
      },
      watch:{
        uploadTarget(){
          if(this.uploadTarget){
            let type = this.uploadTarget.type;
            if(type === 'certification' || type === 'pdf' || type === 'banner' ){
              this.needImgCrop = false;
            } else {
              this.needImgCrop = true;
            }
          }
        }
      },
      methods:{
        onDrag: function (x, y) {
          this.imgCrop.x = x;
          this.imgCrop.y = y;
        },
        pickFile(){
          this.$refs.image.value = null;
          this.$refs.image.click();
          this.error = null;
          this.success = null;
          this.clearUploader();
        },
        clearUploader(){
          this.file.type = 'notta';
          this.file.name = null;
          this.file.url = null;
          this.file.file = null;
          this.success = null;
          this.error = null;
        },
        onFilePicked(e){
          const files = e.target.files;
          const file = files[0];
          if(file){
            this.file.type = file.type
            this.file.name = file.name;
            let lastDot = this.file.name.lastIndexOf('.');
            if(lastDot <= 0){
              return;
            } else {
              let randStr = randomString(12, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
              this.file.name = newFileName(this.file.name, randStr, lastDot);
            }

            const fr = new FileReader();
            fr.readAsDataURL(file);
            fr.addEventListener('load', ()=>{
              this.file.url = fr.result;
              this.file.file = files[0];
            });
            console.log(this.file)
          } else{
            this.clearUploader();
          }
        },
        async uploadToServer(){
          let formData = new FormData();
          let boundaries;
          if(this.file.type.indexOf('pdf')>= 1){
            boundaries = JSON.stringify({type: 'pdf', dbTarget: this.uploadTarget});
          } else {
            const myImage = document.getElementById('uploaded-img');
            boundaries = {
              type: 'image',
              resize: {width: myImage.clientWidth, height: myImage.clientHeight},
              dbTarget: this.uploadTarget
            }
            if(this.needImgCrop){
              boundaries.crop = this.imgCrop;
              if(myImage.clientWidth < 300 || myImage.clientHeight < 300){
                this.clearUploader();
                this.error = "Image does not fit boundaries, upload cancelled"
                return false;
              }
            } else {
              boundaries.crop = {
                width: myImage.clientWidth,
                height: myImage.clientHeight,
                x: 0,
                y: 0
              }
            }
            
            boundaries = JSON.stringify(boundaries);
          }
          formData.append('boundaries', boundaries);
          formData.append("myfile", this.file.file, this.file.name);
          try{
            const uploadedFile = await UploadService.UploadUserProfileImage(formData, boundaries);
            if(uploadedFile.data.ok){
              this.clearUploader();
              this.success = "Image Uploaded Successful"
              setTimeout(()=>{
                this.$emit('close', uploadedFile.data)
              }, 500)
            } else {
              console.log(uploadedFile.data)
            }
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
    margin: 10px auto;
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
  .selected-pdf-file{
    padding: 10px;
  }
  .alert{
    text-align: center;
    font-size: 15px;
  }
  .success-alert{
    color: #01b900;
  }
  .error-alert{
    color: #dc0000;
  }

</style>
