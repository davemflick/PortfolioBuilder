<template>
  <app-form-panel title="Portfolio Content" v-if="portfolio">
    <h3>General</h3>
    <br> <br>
    <form>
      <v-layout wrap>
        <v-flex xs12 pr-1>
          <v-text-field type="text" label="About" v-model="portfolio.aboutUser"></v-text-field>
        </v-flex>
        <br><br>
        <v-btn dark color="primary" @click="updatePortfolioGeneral">Update</v-btn>
        <br><br>
        <v-flex xs12 sm6 pl-1>
          <v-btn @click="openUploadModal">Change Portfolio Image</v-btn>
        </v-flex>
      </v-layout>
    </form>
    <br>
    <div v-if="generalError" class="error-alert alert">{{ generalError }}</div>
    <div v-if="generalSuccess" class="success-alert alert">{{ generalSuccess }}</div>
    <br><br>
    <h3>Projects</h3>
    <br> <br>
    <v-layout wrap>
      <v-flex xs12 pr-1>
        <v-expansion-panel>
          <v-expansion-panel-content v-for="(project, i) in portfolio.projects" :key="project._id">
            <div slot="header">{{ project.name }}</div>
            <v-card>
              <v-card-text>
                <form>
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-text-field type="text" label="Name" v-model="project.name"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field type="text" label="Link" v-model="project.link"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field type="text" 
                      label="Description" 
                      v-model="project.description"
                      ></v-text-field>
                      <v-layout wrap>
                        <v-flex xs-6>
                         <v-btn @click="openUploadModal">Add Project Image</v-btn>
                       </v-flex>
                       <v-flex xs-6>
                        <p class="text-lg-right" v-if="project.images.length === 0"> This project has no images </p>
                      </v-flex>
                      <v-flex xs-6 sm-3 v-for="(img, i) in project.images" :key="`projectImg-${i}`">
                        <v-avatar :size="50" :tile="true">
                          <img :src="img.path" alt="Project Image" />
                        </v-avatar>
                        <br>
                        <v-icon dark>delete</v-icon>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </form>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
  </v-layout>
  <v-dialog v-model="uploadModal" width="500" >
    <v-btn slot="activator" color="red lighten-2" dark > Edit Profile Image </v-btn>
    <app-file-uploader></app-file-uploader>
  </v-dialog>
</app-form-panel>
</template>

<script>
  import appFormPanel from '../universal/FormPanel.vue';
  import PortfolioService from '@/services/PortfolioService';
  import appFileUploader from '../universal/FileUploader.vue';
  export default {
    props: ['portfolio'],
    data(){
      return{
        profilePictures: JSON.parse(JSON.stringify(this.portfolio.profilePicture)),
        selectedProfilePicture: JSON.parse(JSON.stringify(this.portfolio.profilePicture.find((p)=>{return p.isMain}).path)),
        generalError: null,
        generalSuccess: null,
        uploadModal: false
      }
    },
    components:{
      appFormPanel,
      appFileUploader
    },
    methods: {
      openUploadModal(){
        this.uploadModal = !this.uploadModal;
      },
      async updatePortfolioGeneral(){
        this.generalError = null;
        this.generalSuccess = null;
        let generalData = {aboutUser: this.portfolio.aboutUser}
        let initialProfilePic = this.portfolio.profilePicture.find((p)=>{return p.isMain}).path;
        if(initialProfilePic !== this.selectedProfilePicture){
          let newPics = this.profilePictures.map((pic)=>{ pic.isMain = false; return pic});
          newPics.push({isMain: true, path: this.selectedProfilePicture})
          generalData.profilePicture = newPics
        } 
        let portfolioId = this.portfolio._id;
        try{
          const updatedPortfolio = await PortfolioService.updatePortfolio(portfolioId, generalData);
          console.log("DONE", updatedPortfolio)
          if(updatedPortfolio.data.Ok){
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
