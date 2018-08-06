<template>
  <app-form-panel class="mb-3" title="Portfolio Styling" v-if="portfolio">
    <form>
      <v-layout column>
        <v-flex xs-12>
          <h4>Portfolio Banner</h4>
          <v-layout wrap>
            <v-flex xs-12 sm-4>
              <div v-if="portfolio.styles.banner">
                <p>Current</p>
                <img class="img-responsive banner" :src="`http://localhost:8081/${portfolio.styles.banner}`" />
              </div>
              <div v-else>
                <p>Current (default banner)</p>
                <img class="img-responsive banner" :src="defaultBanner" />
              </div>
            </v-flex>
            <v-flex xs-12 sm-8>
              <v-btn color="primary" @click="openUploadModal({type: 'banner', _id: portfolio._id})">Change Banner Image</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12>
          <h4>Pick Portfolio Font</h4>
          <v-radio-group v-model="font" @change="styleUpdate({type: 'fontFamily', value: font})">
            <v-radio label="Roboto (default)" value="'Roboto', sans-serif" style="font-family: 'Roboto', sans-serif"></v-radio>
            <v-radio label="Libre Franklin" value="'Libre Franklin', sans-serif" style="font-family: 'Libre Franklin', sans-serif"></v-radio>
            <v-radio label="Merriweather Sans" value="'Merriweather Sans', sans-serif" style="font-family: 'Merriweather Sans', sans-serif"></v-radio>
          </v-radio-group>
        </v-flex>
      </v-layout>
    </form>
    <v-dialog v-model="uploadModal" width="500" >
      <app-file-uploader :uploadTarget="uploadTarget" ref="fileUploadComponent" v-on:close="closeUploadModal"></app-file-uploader>
    </v-dialog>
  </app-form-panel>
</template>

<script>
  import appFormPanel from '../../universal/FormPanel.vue';
  import PortfolioService from '@/services/PortfolioService';
  import defaultBanner from '@/assets/images/default-banner.png';
  import appFileUploader from '../../universal/FileUploader.vue';
  export default {
    props: ['portfolio', 'success', 'error'],
    data(){
      return{
        font: this.portfolio.styles.fontFamily ? this.portfolio.styles.fontFamily : "'Roboto', sans-serif",
        uploadModal: false,
        uploadTarget: null,
        defaultBanner: defaultBanner
      }
    },
    components:{
      appFormPanel,
      appFileUploader
    },
    methods: {
      async styleUpdate(style){
        this.portfolio.styles[style.type] = style.value;
        console.log(this.portfolio.styles)
        try{
          const updatedPortfolio = await PortfolioService.updatePortfolio(this.portfolio._id, {styles: this.portfolio.styles});
          if(updatedPortfolio.data.ok){
            this.generalSuccess = 'Style Updated';
          }
        } catch(error){
          console.log("ERROR", error);
          alert("Something has gone wrong updating active state");
        }
      },
      openUploadModal(targetData){
        this.uploadTarget = targetData
        console.log(this.uploadTarget);
        this.uploadModal = true;
      },
      closeUploadModal(resp){
        console.log(resp);
        if(resp.ok){
          this.portfolio.styles.banner = resp.portfolio.styles.banner;
        }
        this.uploadTarget = null;
        this.uploadModal = false;
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.view-resume{
  text-decoration: none;
}

.banner{
  max-width: 300px;
  max-height: 200px;
}
</style>
