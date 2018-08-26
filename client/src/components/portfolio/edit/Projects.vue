<template>
  <app-form-panel class="mb-3" title="Projects" v-if="portfolio">
   <h4>Current Projects</h4>
   <br>
   <v-layout wrap>
    <v-flex xs12 pr-1>
      <v-expansion-panel popout>
        <v-expansion-panel-content v-for="(project, i) in portfolio.projects" :key="`project-${i}`" :class="{'fade-out': fadeOut.indexOf(`project-${i}`) >= 0, 'fade-in': fadeIn.indexOf(`project-${i}`) >= 0 }">
          <div slot="header" :key="`transitionProject-${i}`">
            <div class="project-order-btns">
              <v-icon v-if="i !== 0 && portfolio.projects.length > 1" @click="adjustProjectOrder(true, i)" class="project-up">arrow_upward</v-icon>
              <v-icon v-if="i !== portfolio.projects.length - 1" @click="adjustProjectOrder(false, i)" class="project-down">arrow_downward</v-icon>
            </div>
            <h3 class="text-xs-center ma-0 pa-0" style="display: inline-block">{{ project.name }}</h3>
          </div>
          <v-card>
            <v-card-text>
              <form>
                <v-layout wrap>
                  <v-flex xs12 px-1>
                    <v-text-field type="text" label="Name" v-model="project.name"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 px-1>
                    <v-text-field type="text" label="Link" v-model="project.link" @input="validate('url', project.link)"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 px-1>
                    <v-text-field type="text" label="Source Code" v-model="project.codeLink" @input="validate('url', project.link)"></v-text-field>
                  </v-flex>
                  <v-flex xs12 px-1>
                    <v-text-field type="text" label="Stack" v-model="project.stack"></v-text-field>
                  </v-flex>
                  <v-flex xs12 px-1>
                    <v-textarea type="text" 
                    label="Description" 
                    v-model="project.description"
                    ></v-textarea>
                    <v-layout row class="my-2">
                      <v-flex xs4 sm2>
                       <v-btn @click="openUploadModal({type: 'project', _id: project._id})">Add Project Image</v-btn>
                     </v-flex>
                     <v-flex xs8 sm10>
                      <p class="text-lg-right" v-if="project.images.length === 0"> This project has no images </p>
                    </v-flex>
                    <v-flex xs8 sm10 v-for="(img, i) in project.images" :key="`projectImg-${i}`">
                      <div class="pi-container">
                        <v-badge color="red" small overlap>
                          <v-icon class="delete-badge" 
                          slot="badge" dark small 
                          @click="deleteProjectImage({projectId: project._id, imageId: img._id})"
                          >close</v-icon>
                          <v-avatar :size="50" :tile="true">
                            <img :src="'http://porteloper.net/' + img.path" alt="Project Image" />
                          </v-avatar>
                        </v-badge>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12>
                  <v-btn dark color="primary" @click="updateProject(project._id)">Update Project</v-btn>
                  <v-btn dark color="secondary" @click="deleteProject(project._id)">Delete Project</v-btn>
                  <p v-if="projectError" class="alert error-alert">{{ projectError }}</p>
                  <p v-if="projectSuccess" class="alert success-alert">{{ projectSuccess }}</p>
                </v-flex>
              </v-layout>
            </form>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-flex>
  <br>
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
  import appFormPanel from '../../universal/FormPanel.vue';
  import PortfolioService from '@/services/PortfolioService';
  import addProject from './AddProject.vue';
  import appFileUploader from '../../universal/FileUploader.vue';

  
  export default {
    props: ['portfolio'],
    data(){
      return{
        projectError: null,
        projectSuccess: null,
        uploadModal: false,
        uploadTarget: null,
        newProjectImages: [],
        fadeOut: 'no no no',
        fadeIn: 'no no no'
      }
    },
    components:{
      appFormPanel,
      appFileUploader,
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
      async adjustProjectOrder(up, index){
        event.stopPropagation();
        let tempProjects = [...this.portfolio.projects];
        let changingProject = tempProjects[index];
        let newIndex = up ? index - 1 : index + 1
        this.fadeOut = `project-${index} project-${newIndex}`;
        tempProjects.splice(index, 1);
        tempProjects.splice(newIndex, 0, changingProject);
        try{
          const updatedPortfolio = await PortfolioService.updatePortfolio(this.portfolio._id, {projects: tempProjects});
          console.log(updatedPortfolio);
          if(updatedPortfolio.data.ok){
            this.portfolio.projects = tempProjects;
            this.fadeOut = 'no no no';
            this.fadeIn = `project-${index} project-${newIndex}`;
            setTimeout(function(){this.fadeIn = 'no no no'}, 500);
          } else {
            this.projectError = "Something has gone terribly wrong. It's all your fault."
          }
        }catch(error){
          console.log("ERROR", error);
        }
      },
      validate(type, value){
        const validations = {
          url: {
            re: /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            required: false
          }
        }
        if(!value){
          return !validations[type].required
        }
        return validations[type].re.test(value.toLowerCase());
      },
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
        var newPics = null;
        console.log(targetData._id);
        if(targetData.type === 'project'){
          newPics = this.portfolio.projects.find(p => p._id === targetData._id).images.map((pic)=>{ pic.isMain = false; return pic});
          console.log(newPics);
        }
        targetData.currentPictures = newPics
        this.uploadTarget = targetData
        console.log(this.uploadTarget);
        this.uploadModal = true;
      },
      closeUploadModal(resp){
        if(resp.project && resp.uploadType === 'project'){
          this.updateProjectState(resp.project);
        } else if(resp.uploadType === 'NewProjectImage'){
          this.newProjectImages = this.newProjectImages.map(img => {img.isMain = false; return img});
          this.newProjectImages.push({path: resp.filePath, isMain: true});
        }
        this.uploadTarget = null;
        this.uploadModal = false;
      },
      async updateProject(projectId){
        this.projectSuccess = null;
        this.projectError = null;
        const thisProject = this.portfolio.projects.find(p => p._id === projectId);
        console.log(thisProject);
        if(!this.validate('url', thisProject.link)){
          alert("Invalid Link");
          return false;
        }
        const updateFields = {
          name: thisProject.name,
          link: thisProject.link,
          codeLink: thisProject.codeLink,
          stack: thisProject.stack,
          description: thisProject.description
        }
        try{
          const updatedProject = await PortfolioService.editProject(projectId, updateFields);
          console.log(updatedProject)
          if(updatedProject.data.ok){
            this.updateProjectState(updatedProject.data.project);
            this.projectSuccess = "Project Updated";
          } else {
            this.projectError = "Something has gone terribly wrong. It's all your fault."
          }
        }catch(error){
          console.log("ERROR", error);
        }
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
      async deleteProject(id){
        if(!confirm('Are you sure you want to delete this project?')){
          return false;
        }
        try{
          const updatedPortfolio = await PortfolioService.deleteProject(this.portfolio._id, id);
          console.log(updatedPortfolio.data);
          if(updatedPortfolio.data.ok){
            this.portfolio.projects = this.portfolio.projects.filter(project => project._id != id);
          }
        }catch(error){
          console.log("ERROR", error);
        }
      },
      updatePortfolioProjects(portfolioProjects){
        this.newProjectImages = [];
        this.portfolio.projects = portfolioProjects;
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

.project-order-btns{
  display: inline-block;
  min-width: 100px;
}

.project-up{
  color: #1976d2;
  transition: color .2s linear;
}
.project-up:hover{
  color: #7ca8d4;
}

.project-down{
  color: #808080;
  transition: color .2s linear;
}
.project-down:hover{
  color: #bfbfbf;
}

.fade-in{
  animation: fade-in 0.75s forwards;
}
.fade-out{
  animation: fade-out 0.5s forwards;
}

@keyframes fade-in {
  0% {
    opacity: 0
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade-out {
 0% {
  opacity: 1
}
100% {
  opacity: 0;
}
}

</style>
