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
          v-model="portfolio.profilePicture.find((p)=>{return p.isMain}).path"
          ></v-text-field>
        </v-flex>
        <br><br>
        <v-btn dark color="primary" @click="updatePortfolioGeneral">Update</v-btn>
      </v-layout>
    </form>
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
  export default {
    props: ['portfolio'],
    components:{
      appFormPanel
    },
    methods: {
      updatePortfolioGeneral(){
        //Will actually need to create new portfolio picture instance (this is just temporary)
        let generalData = {
          aboutUser: this.portfolio.aboutUser,
          portfolioPicutre: this.portfolio.profilePicture.find((p)=>{return p.isMain}).path
        }
        console.log(generalData);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
