<template>
  <div class="white elevation-2">
    <form>
      <v-layout wrap>
        <v-flex xs12>
          <img :src="imgUrl" height="150" v-if="imgUrl" />
          <v-text-field label="Select Image" @click="pickFile" v-model="imgName" prepend-icon="attach_file"></v-text-field>
          <input type="file" style="display: none;" ref="image" accept="image/*" @change="onFilePicked" />
        </v-flex>
      </v-layout>
    </form>
  </div>
</template>

<script>
export default {
  data(){
    return{
      imgName: null,
      imgUrl: null,
      imgFile: null
    }
  },
  methods:{
    pickFile(){
      this.$refs.image.click();
    },
    async onFilePicked(e){
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
    }
  }
}
</script>

<style scoped>

</style>
