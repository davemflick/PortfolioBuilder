<template>
  <v-layout>
    <v-flex xs12>
      <v-card class="pa-2">
        <v-layout wrap>
          <v-flex xs12 sm6 md4 class="text-xs-center pa-1">
            <img v-if="hasImages" class="boxey-boy" :src="`${serverImageHost}${mainImage.path}`" />
            <img v-else class="boxey-boy" :src="`${defaultProfileImg}`" />
          </v-flex>
          <v-flex v-if="images" xs12 sm6 md8 class="pa-1 text-xs-center">
            <v-layout wrap justify-space-between>
              <v-flex xs4 sm3 class="pa-2 mx-2" v-for="(img, i) in images" :key="`img-thumb-${i}`">
               <v-avatar :size="80" :tile="true">
                <img class="boxey-boy" 
                     :src="serverImageHost + img.path" alt="Project Image"
                     @click="mainImage = img"/>
              </v-avatar>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <p :class="['py-1 px-3 alert text-xs-left', {'success-alert': successfulUpdate, 'error-alert': error}]"
           v-if="error || successfulUpdate">{{ error }}{{ successfulUpdate }}</p>
      <v-card-actions v-show="mainImage">
        <v-btn @click="makeMainImage" flat color="orange">Make Main</v-btn>
        <v-btn @click="deleteImage" flat color="orange">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</v-layout>
</template>

<script>
  import PortfolioService from '@/services/PortfolioService';
  import defaultProfileImg from '@/assets/images/emptyProfile.png';
  export default {
    props: ['images', 'portfolioId'],
    data(){
      return {
        error: null,
        successfulUpdate: null,
        mainImage: this.hasImages,
        defaultProfileImg: defaultProfileImg
      }
    },
    computed:{
      hasImages(){
        if(this.images.length > 0){
          this.mainImage = this.images.find(p=> p.isMain);
          return true;
        } else {
          this.mainImage = null;
          return false;
        }
      }
    },
    methods:{
      async updatePortfolio(pics){
        this.error = null;
        this.successfulUpdate = null;
        try{
          const updated = await PortfolioService.updatePortfolio(this.portfolioId, {profilePicture: pics});
          if(updated.data.ok){
            this.successfulUpdate = "Portfolio Image Updated"
            let newPics = updated.data.portfolio.profilePicture
            this.mainImage = newPics.find(p=>p.isMain);
            this.$emit('updated', newPics); 
          }
        }catch(error){
          console.log("ERROR", error);
          this.error = error;
        }
      },
      async makeMainImage(){
        const imageUpdates = this.images.map(pic => {
          pic.path === this.mainImage.path ? pic.isMain = true : pic.isMain = false;
          return pic;
        });
        this.updatePortfolio(imageUpdates);
      },
      async deleteImage(){
        let imageUpdates = this.images.filter(pic => pic.path !== this.mainImage.path);
        if(imageUpdates.length > 0){
          imageUpdates[0].isMain = true;
        }
        this.updatePortfolio(imageUpdates);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.boxey-boy{
  box-shadow: 2px 3px 1px #888;
  max-width: 100%;
}
.v-avatar .boxey-boy{
  cursor: pointer;
}

</style>
