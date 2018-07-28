<template>
  <app-form-panel title="Certifications" v-if="portfolio">
    <br> <br>
    <h4>Current Certifications</h4>
    <br>
    <p v-show="portfolio.certifications.length === 0">You have no certifications</p>
    <br> <br>
    <h4>Add New Certification</h4>
    <br>
    <div class="new-cert pa-2">
     <v-layout wrap class="my-2">
      <v-flex xs12 sm6 px-1>
        <v-text-field type="text" label="Name" v-model="newCert.name"></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 px-1>
        <v-text-field type="text" label="Date Obtained" v-model="newCert.dateObtained" @click="dateModal = true"></v-text-field>
        <v-dialog ref="dialog" v-model="dateModal" persistent lazy full-width width="290px" >
          <v-date-picker v-model="newCert.dateObtained" scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="dateModal = false; newCert.dateObtained = null">Remove</v-btn>
            <v-btn flat color="primary" @click="dateModal = false">Set</v-btn>
          </v-date-picker>
        </v-dialog>
      </v-flex>
      <v-flex xs12 px-1>
        <v-textarea type="text" 
        label="Description" 
        v-model="newCert.about"
        ></v-textarea>
      </v-flex>
      <v-flex xs4 sm2>
        <v-btn @click="openUploadModal({type: 'certification', _id: portfolio._id})">Add Image</v-btn>
      </v-flex>
      <v-flex v-if="!newCert.picturePath" xs8 sm10>
        <p class="text-lg-right">No Certification Image</p>
      </v-flex>
      <v-flex xs12 class="py-1">
        <v-btn class="primary" @click="submitNewCert">Add Certification</v-btn>
      </v-flex>
    </v-layout>
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
  export default {
    props: ['portfolio'],
    components:{
      appFileUploader,
      appFormPanel
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
     async submitNewCert(){
      let cert = JSON.parse(JSON.stringify(this.newCert));
      // if(cert.dateObtained){
      //   cert.dateObtained = new Date(cert.dateObtained);
      // }
      console.log(cert.dateObtained);
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
