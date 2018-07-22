<template>
  <app-form-panel title="Portfolio Content" v-if="portfolio">
    <h2>General</h2>
    <br> <br>
    <edit-portfolio-general 
        :portfolio="portfolio" 
        :error="generalError" 
        :success="generalSuccess" 
        v-on:update="updatePortfolioGeneral">
      <template slot="addProfileImage">
         <v-btn @click="openUploadModal({type: 'portfolioImage', _id: portfolio._id})">Change Portfolio Image</v-btn>
      </template>
    </edit-portfolio-general>
    <br><br>
    <h2>Projects</h2>
    <br> <br>
    <h4>Current Projects</h4>
    <br>
    <v-layout wrap>
      <v-flex xs12 pr-1>
        <v-expansion-panel>
          <v-expansion-panel-content v-for="(project, i) in portfolio.projects" :key="`${project.name}-${i}`">
            <div slot="header">{{ project.name }}</div>
            <v-card>
              <v-card-text>
                <form>
                  <v-layout wrap>
                    <v-flex xs12 sm6 px-1>
                      <v-text-field type="text" label="Name" v-model="project.name"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 px-1>
                      <v-text-field type="text" label="Link" v-model="project.link"></v-text-field>
                    </v-flex>
                    <v-flex xs12 px-1>
                      <v-textarea type="text" 
                      label="Description" 
                      v-model="project.description"
                      ></v-textarea>
                      <v-layout row my-2>
                        <v-flex xs4 sm2>
                         <v-btn @click="openUploadModal({type: 'project', _id: project._id})">Add Project Image</v-btn>
                       </v-flex>
                       <v-flex xs8 sm10>
                        <p class="text-lg-right" v-if="project.images.length === 0"> This project has no images </p>
                      </v-flex>
                      <v-flex xs8 sm10 v-for="(img, i) in project.images" :key="`projectImg-${i}`">
                        <div class="pi-container">
                          <v-badge color="red" small overlap>
                            <v-icon class="delete-project" 
                            slot="badge" dark small 
                            @click="deleteProjectImage({projectId: project._id, imageId: img._id})"
                            >close</v-icon>
                            <v-avatar :size="50" :tile="true">
                              <img :src="'http://localhost:8081/' + img.path" alt="Project Image" />
                            </v-avatar>
                          </v-badge>
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12>
                    <v-btn dark color="primary">Update Project</v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
    <br>
    <h4 class="py-3">Add New Project</h4>
    <br>
    <v-flex xs12 pa-2 class="new-project p-5">
      <add-project :portfolio="portfolio" :projectImages="newProjectImages" v-on:update="updatePortfolioProjects">
        <div slot="addImage">
           <v-btn @click="openUploadModal({type: 'NewProjectImage'})">Add Project Image</v-btn>
        </div>
      </add-project>
    </v-flex>
  </v-layout>
  <v-dialog v-model="uploadModal" width="500" >
    <app-file-uploader :uploadTarget="uploadTarget" ref="fileUploadComponent" v-on:close="closeUploadModal"></app-file-uploader>
  </v-dialog>
</app-form-panel>
</template>

<script>
  import appFormPanel from '../universal/FormPanel.vue';
  import PortfolioService from '@/services/PortfolioService';
  import editPortfolioGeneral from './EditPortfolioGeneral.vue';
  import addProject from './AddProject.vue';
  import appFileUploader from '../universal/FileUploader.vue';
  
  export default {
    props: ['portfolio'],
    data(){
      return{
        profilePictures: JSON.parse(JSON.stringify(this.portfolio.profilePicture)),
        selectedProfilePicture: JSON.parse(JSON.stringify(this.portfolio.profilePicture.find((p)=>{return p.isMain}).path)),
        generalError: null,
        generalSuccess: null,
        uploadModal: false,
        uploadTarget: null,
        newProjectImages: []
      }
    },
    components:{
      appFormPanel,
      appFileUploader,
      editPortfolioGeneral,
      addProject
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
      updateProjectState(project){
        let index = -1;
        this.portfolio.projects.find((proj, i)=>{
          if(proj._id === project._id){
            index = i;
          }
        });
        if(index >= 0){
          this.portfolio.projects.splice(index, 1, project);
        }
      },
      openUploadModal(targetData){
        var newPics = '';
        if(targetData.type === 'portfolioImage'){
          newPics = this.profilePictures.map((pic)=>{ pic.isMain = false; return pic});
        } else if (targetData.type === 'project'){
          newPics = this.portfolio.projects.find(p => p._id = targetData._id).images.map((pic)=>{ pic.isMain = false; return pic});
        }
        targetData.currentPictures = newPics
        console.log(targetData);
        this.uploadTarget = targetData
        this.uploadModal = true;
      },
      closeUploadModal(resp){
        if(resp.project && resp.uploadType === 'project'){
          this.updateProjectState(resp.project);
        } else if(resp.portfolio && resp.uploadType === 'portfolioImage'){
          this.portfolio.profilePicture = resp.portfolio.profilePicture;
        } else if(resp.uploadType === 'NewProjectImage'){
          this.newProjectImages = this.newProjectImages.map(img => {img.isMain = false; return img});
          this.newProjectImages.push({path: resp.filePath, isMain: true});
        }
        this.uploadTarget = null;
        this.uploadModal = false;
      },
      async deleteProjectImage(target){
        try{
          const project = await PortfolioService.removeProjectImage(target);
          console.log(project);
          if(project.data.ok && project.data.project){
            this.updateProjectState(project.data.project);
          }
        }catch(error){
          console.log("ERROR", error);
        }
        
      },
      updatePortfolioProjects(portfolioProjects){
        this.newProjectImages = [];
        this.portfolio.projects = portfolioProjects;
      },
      async updatePortfolioGeneral(){
        this.generalError = null;
        this.generalSuccess = null;
        let generalData = {aboutUser: this.portfolio.aboutUser}
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
.delete-project{
  cursor: pointer;
  transform: rotate(0deg);
  transition: transform .35s linear;
}
.delete-project:hover{
  cursor: pointer;
  transform: rotate(180deg);
}

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
