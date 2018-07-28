<template>
  <app-form-panel title="Certifications" v-if="portfolio">
    <br> <br>
    <h4>Current Certifications</h4>
    <br>
    <p v-show="portfolio.certifications.length === 0">You have no certifications</p>
    <v-expansion-panel>
      <v-expansion-panel-content v-for="(cert, i) in portfolio.certifications" :key="`cert-${i}`">
        <div slot="header">{{ cert.name }}</div>
        <app-cert-form :portfolioId="portfolio._id" :cert="cert" v-on:openUploadModal="openUploadModal" v-on:submit="submitCert"></app-cert-form>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <br> <br>
    <h4>Add New Certification</h4>
    <br>
    <div class="new-cert pa-2">
      <app-cert-form :portfolioId="portfolio._id" :cert="newCert" v-on:openUploadModal="openUploadModal" v-on:submit="submitCert"></app-cert-form>
   </div>
   <v-dialog v-model="uploadModal" width="500" >
    <app-file-uploader :uploadTarget="uploadTarget" ref="fileUploadComponent" v-on:close="closeUploadModal"></app-file-uploader>
  </v-dialog>
</app-form-panel>
</template>

<script>
  import PortfolioService from '@/services/PortfolioService';
  import appFileUploader from '../../universal/FileUploader.vue';
  import appFormPanel from '../../universal/FormPanel.vue';
  import appCertForm from './CertForm.vue';
  export default {
    props: ['portfolio'],
    components:{
      appFileUploader,
      appFormPanel,
      appCertForm
    },
    data(){
      return {
        error: null,
        uploadTarget: null,
        uploadModal: false,
        dateModal: false,
        newCert: {
          name: null,
          about: null,
          picturePath: null,
          dateObtained: null
        }
      }
    },
    methods:{
     async submitCert(cert){
      let curCerts = JSON.parse(JSON.stringify(this.portfolio.certifications))
      if(cert._id){
        curCerts = curCerts.map(c=> c._id === cert._id ? cert : c);
      } else {
        curCerts.push(cert);
      }
      try{
        const updatedPortfolio = await PortfolioService.updatePortfolio(this.portfolio._id, {certifications: curCerts});
        console.log(updatedPortfolio);
      }catch(error){
        console.log("ERROR", error)
        this.error = error;
      }
    },
    openUploadModal(targetData){
      console.log(targetData);
      this.uploadTarget = targetData
      this.uploadModal = true;
    },
    closeUploadModal(resp){
      this.uploadTarget = null;
      this.uploadModal = false;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.new-cert{
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
