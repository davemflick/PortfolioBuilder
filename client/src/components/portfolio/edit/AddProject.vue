<template>
  <form>
    <v-layout wrap>
      <v-flex xs12 sm6 px-1>
        <v-text-field type="text" label="Name" v-model="project.name"></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 px-1>
        <v-text-field type="text" label="Link" v-model="project.link"></v-text-field>
      </v-flex>
      <v-flex xs12 px-1>
        <v-text-field type="text" label="Stack" v-model="project.stack"></v-text-field>
      </v-flex>
      <v-flex xs12 px-1>
        <v-textarea type="text" 
        label="Description" 
        v-model="project.description"
        ></v-textarea>
        <v-layout row my-2>
          <v-flex xs4 sm2>
            <slot name="addImage"></slot>
          </v-flex>
          <v-flex xs8 sm10>
            <p class="text-lg-right" v-if="projectImages.length === 0"> This project has no images </p>
          </v-flex>
          <v-flex xs8 sm10 v-for="(img, i) in projectImages" :key="`projectImg-${i}`">
            <div class="pi-container">
              <v-badge color="red" small overlap>
                <v-icon slot="badge" dark small @click="removeImage(i)" >close</v-icon>
                <v-avatar :size="50" :tile="true">
                  <img :src="serverImageHost + img.path" alt="Project Image" />
                </v-avatar>
              </v-badge>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex class="py-2">
        <v-btn class="primary" @click="addNewProject">
          Create Project
        </v-btn>
      </v-flex>
    </v-layout>
    <br>
    <p v-if="error" class="error error-alert">{{ error }}</p>
  </form>
</template>

<script>
  import PortfolioService from '@/services/PortfolioService';
  const emptyProject = function(id){
    this.images = [];
    this.name = null;
    this.link = null;
    this.description = null;
    this.portfolioId = id;
    this.stack = null;
  }
  export default {
    props: ['portfolio', 'projectImages'],
    data(){
      return {
        project: new emptyProject(this.portfolio._id),
        error: null
      }
    },
    methods:{
      removeImage(index){
        this.projectImages.splice(index, 1);
      },
      async addNewProject(){
        this.project.images = this.projectImages
        try{
          const updatedPortfolio = await PortfolioService.addUserProject(this.portfolio._id, this.project);
          if(updatedPortfolio.data.ok){
            this.$emit('update', updatedPortfolio.data.portfolio.projects);
            this.project = new emptyProject(this.portfolio._id);
            console.log(updatedPortfolio.data);
          }
        }catch(error){
          console.log("ERRROR", error);
          this.error = error;
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
