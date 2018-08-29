<template>
  <app-form-panel class="mb-3" title="Portfolio" v-if="portfolio">
    <v-switch
    :label="portfolio.isActive ? 'Portfolio Active' : 'Portfolio Deactivated'"
    v-model="portfolio.isActive"
    @change="portfolioActivation('active')"
    ></v-switch>
    <v-switch
    :label="portfolio.canEmail ? 'Can be emailed' : 'Can\'t be emailed'"
    v-model="portfolio.canEmail"
    @change="portfolioActivation('email')"
    ></v-switch>
    <edit-portfolio-general 
    :portfolio="portfolio" 
    :error="generalError" 
    :success="generalSuccess" 
    v-on:update="updatePortfolioGeneral"
    v-on:removeResume="removeResume">
    <div slot="addResume">
      <v-btn @click="openUploadModal({type: 'pdf', _id: portfolio._id})">Upload Resume</v-btn>
    </div>
    <div slot="addProfileImage">
     <v-btn @click="openUploadModal({type: 'portfolioImage', _id: portfolio._id})">Upload New Image</v-btn>
     <br>
     <v-btn @click="profilePicturesModal = true">Edit Profile Images</v-btn>
   </div>
 </edit-portfolio-general>
 <v-dialog v-model="uploadModal" width="500" >
  <app-file-uploader :uploadTarget="uploadTarget" ref="fileUploadComponent" v-on:close="closeUploadModal"></app-file-uploader>
</v-dialog>
<v-dialog v-model="profilePicturesModal" width="1000" >
  <app-profile-images :images="portfolio.profilePicture" :portfolioId="portfolio._id" v-on:updated="profilePicsUpdated"></app-profile-images>
</v-dialog>
</app-form-panel>
</template>

<script>
  import appFormPanel from '../../universal/FormPanel.vue';
  import PortfolioService from '@/services/PortfolioService';
  import editPortfolioGeneral from './PortfolioGeneral.vue';
  import appFileUploader from '../../universal/FileUploader.vue';
  import appProfileImages from './ProfileImages.vue';
  
  export default {
    props: ['portfolio'],
    data(){
      return{
        profilePictures: JSON.parse(JSON.stringify(this.portfolio.profilePicture)),
        selectedProfilePicture: null,
        generalError: null,
        generalSuccess: null,
        uploadModal: false,
        uploadTarget: null,
        profilePicturesModal: false
      }
    },
    components:{
      appFormPanel,
      appFileUploader,
      editPortfolioGeneral,
      appProfileImages
    },
    mounted(){
      if(this.portfolio.profilePicture.length > 0){
        this.selectedProfilePicture = JSON.parse(JSON.stringify(this.portfolio.profilePicture.find((p)=>{return p.isMain}).path))
      }
    },
    watch:{
      uploadModal(){
        if(!this.uploadModal){
          this.uploadTarget = null;
          this.$refs.fileUploadComponent.clearUploader();
        }
      }
    },
    methods: {
      validate(type, value){
        const validations = {
          url: {
            re: /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9-.%_#]+\/?)*$/,
            required: false
          }
        }
        if(!value){
          return !validations[type].required
        }
        return validations[type].re.test(value.toLowerCase());
      },
      profilePicsUpdated(pics){
        this.portfolio.profilePicture = pics;
      },
      async portfolioActivation(type){
       let updateInfo = {};
       if(type === 'active'){
        updateInfo.isActive = this.portfolio.isActive;
       } else if(type === 'email'){
        updateInfo.canEmail = this.portfolio.canEmail;
       }else{
        alert("Type change not detected");
        return false;
       }
       try{
        const updatedPortfolio = await PortfolioService.updatePortfolio(this.portfolio._id, updateInfo);
        if(!updatedPortfolio.data.ok){
          alert("Something has gone wrong updating your account.");
        }
      } catch(error){
        console.log("ERROR", error);
        alert("Something has gone wrong updating active state");
      }
    },
    openUploadModal(targetData){
      var newPics = null;
      if(targetData.type === 'portfolioImage'){
        newPics = this.profilePictures.map((pic)=>{ pic.isMain = false; return pic});
      }
      targetData.currentPictures = newPics
      this.uploadTarget = targetData
      console.log(this.uploadTarget);
      this.uploadModal = true;
    },
    closeUploadModal(resp){
      if(resp.portfolio && resp.uploadType === 'portfolioImage'){
        this.portfolio.profilePicture = resp.portfolio.profilePicture;
      } else if(resp.uploadType === 'pdf'){
        this.portfolio.resume = resp.filePath;
      }
      this.uploadTarget = null;
      this.uploadModal = false;
    },
    async removeResume(){
      try{
        const updatedPortfolio = await PortfolioService.updatePortfolio(this.portfolio._id, {resume: null});
        console.log("Resume Removed", updatedPortfolio)
        if(updatedPortfolio.data.ok){
          this.generalSuccess = "Resume Removed"
          this.portfolio.resume = null;
        }
      } catch(error){
        console.log("ERROR", error);
        this.generalError = "500 Internal Service Error, Data did not update."
      }
    },
    async updatePortfolioGeneral(){
      this.generalError = null;
      this.generalSuccess = null;
      let generalData = {
        aboutUser: this.portfolio.aboutUser,
        otherProfiles: this.portfolio.otherProfiles
      }
      for(let link in generalData.otherProfiles){
        if(!this.validate('url', generalData.otherProfiles[link])){
          this.generalError = `Link for ${link} is invalid`;
          console.log(this.generalError);
          return false;
        }
      }
      let portfolioId = this.portfolio._id;
      try{
        const updatedPortfolio = await PortfolioService.updatePortfolio(portfolioId, generalData);
        console.log("DONE", updatedPortfolio)
        if(updatedPortfolio.data.ok){
          this.generalSuccess = "Portfolio information updated!"
        }
      } catch(error){
        console.log("ERROR", error);
        this.generalError = "500 Internal Service Error, Data did not update."
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.new-project{
  border: 1px solid #ccc;
  border-radius: 5px;
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
