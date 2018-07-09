<template>
  <app-form-panel title="Portfolio Content" v-if="portfolio">
    <h3>General</h3>
    <br> <br>
    <form>
      <v-layout wrap>
        <v-flex xs12 sm6 pr-1>
          <v-text-field type="text" label="About" v-model="portfolio.aboutUser"></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 pl-1>
          <v-text-field type="text" 
          label="Profile Picture" 
          v-model="selectedProfilePicture"
          ></v-text-field>
        </v-flex>
        <br><br>
        <v-btn dark color="primary" @click="updatePortfolioGeneral">Update</v-btn>
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
                <p v-if="project.description">{{ project.description }}</p>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </app-form-panel>
</template>

<script>
  import appFormPanel from '../universal/FormPanel.vue';
  import PortfolioService from '@/services/PortfolioService';
  export default {
    props: ['portfolio'],
    data(){
      return{
        profilePictures: JSON.parse(JSON.stringify(this.portfolio.profilePicture)),
        selectedProfilePicture: JSON.parse(JSON.stringify(this.portfolio.profilePicture.find((p)=>{return p.isMain}).path)),
        generalError: null,
        generalSuccess: null
      }
    },
    components:{
      appFormPanel
    },
    methods: {
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
