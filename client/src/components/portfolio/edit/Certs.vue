<template>
  <app-form-panel class="mb-4" title="Certifications" v-if="portfolio">
    <br> <br>
    <h4>Current Certifications</h4>
    <br>
    <p v-show="portfolio.certifications.length === 0">You have no certifications</p>
    <v-expansion-panel>
      <v-expansion-panel-content v-for="(cert, i) in portfolio.certifications" :key="`cert-${i}`">
        <div slot="header">{{ cert.name }}</div>
        <app-cert-form 
        :portfolioId="portfolio._id" 
        :cert="cert" 
        v-on:openUploadModal="openUploadModal" 
        v-on:submit="submitCert"
        v-on:delete="deleteCert"
        :error="!editError ? null : editError.cid === cert._id ? editError.errMsg : null"
        :success="!editSuccess ? null : editSuccess.cid === cert._id ? editSuccess.msg : null"
        ></app-cert-form>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <br> <br>
    <h4>Add New Certification</h4>
    <br>
    <div class="new-cert pa-2">
      <app-cert-form 
      :portfolioId="portfolio._id" 
      :cert="newCert" 
      v-on:openUploadModal="openUploadModal" 
      v-on:submit="submitCert" 
      :error="newError"
      :success="newSuccess"
      ></app-cert-form>
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
  import moment from 'moment';
  export default {
    props: ['portfolio'],
    components:{
      appFileUploader,
      appFormPanel,
      appCertForm
    },
    data(){
      return {
        editError: null,
        newError: null,
        editSuccess: null,
        newSuccess: null,
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
    mounted(){
      this.formatCertDates();
    },
    watch:{
      uploadModal(){
        if(!this.uploadModal){
          this.uploadTarget = null;
          this.$refs.fileUploadComponent.clearUploader();
        }
      }
    },
    methods:{
     formatCertDates(){
      this.portfolio.certifications.forEach(c=> c.dateObtained = moment(String(c.dateObtained)).format('YYYY-MM-DD'))
     },
     async submitCert(cert){
      this.editError = null;
      this.newError = null;
      this.editSuccess =  null;
      this.newSuccess =  null;
      let curCerts = JSON.parse(JSON.stringify(this.portfolio.certifications))
      let certType = 'edit';

      cert.dateObtained = new Date(cert.dateObtained);
      if(cert._id){
        curCerts = curCerts.map(c=> c._id === cert._id ? cert : c);
      } else {
        curCerts.push(cert);
        certType = 'new';
      }
      try{
        const updatedPortfolio = await PortfolioService.updatePortfolio(this.portfolio._id, {certifications: curCerts});
        if(updatedPortfolio.data.ok){
          this.portfolio.certifications = updatedPortfolio.data.portfolio.certifications;
          this.formatCertDates();
          if(certType === 'edit'){
            this.editSuccess = {msg: "Certification Updated", cid: cert._id};
          } else {
           this.newSuccess = "Certification Added";
           for(let key in this.newCert){
            this.newCert[key] = null;
          }
        }
      } else {
        let errMsg = "An error has occured trying to update your certification";
        certType === 'edit' ? this.editError = {errMsg, cid: cert._id} : this.newError = errMsg;
      }
    }catch(error){
      console.log("ERROR", error)
      let err = "Something has gone terribly wrong."
      certType === 'edit' ? this.editError = {err, cid: cert._id} : this.newError = err;
    }
  },
  async deleteCert(certId){
    const certs = this.portfolio.certifications.filter( c => c._id !== certId);
    try{
      const updatedPortfolio = await PortfolioService.updatePortfolio(this.portfolio._id, {certifications: certs});
      console.log(updatedPortfolio.certifications);
      if(updatedPortfolio.data.ok){
        alert("Certification removed");
        this.portfolio.certifications = updatedPortfolio.data.portfolio.certifications;
        this.formatCertDates();
      } else {
        alert("Something went wrong removing certification");
      }
    }catch(error){
      console.log("ERROR", error)
      alert("Something has gone terribly wrong removing certification");
    }
  },
  openUploadModal(targetData){
    console.log(targetData)
    this.uploadTarget = targetData
    this.uploadModal = true;
  },
  closeUploadModal(resp){
    console.log("NOW", resp);
    if(this.uploadTarget.cid){
      this.portfolio.certifications.find(c => c._id === this.uploadTarget.cid).picturePath = resp.filePath;
    } else {
      this.newCert.picturePath = resp.filePath;
      console.log(this.newCert);
    }
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
