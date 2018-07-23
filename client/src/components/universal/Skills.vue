<template>
  <app-form-panel :title="'Skills'">
    <h2>
      Current Skills
    </h2>
    <p v-if="currentSkills.length === 0">No skills for you</p>
    <v-layout wrap justify-start>
      <v-flex xs4 sm3 class="pa-2 text-xs-center" v-for="skill in currentSkills" :key="skill">
        <v-badge class="add-skill-badge" overlap color="red" >
          <v-icon slot="badge" dark small @click="removeFromCurrentSkills(skill)" >close</v-icon>
          <div class="pa-1 single-icon">
            <i :class="`devicon-icon devicon-${skill}`"></i>
          </div>
        </v-badge>
      </v-flex>
    </v-layout>
    <br><br>
    <h2>
      Add Skills
    </h2>
    <v-layout wrap>
      <v-flex xs12 class="p-2">
        <v-text-field
        hide-details
        prepend-icon="search"
        v-model="searchTerm"
        @keyup="createSearchResults"
        single-line
        ></v-text-field>
      </v-flex>
    </v-layout>
    <div v-if="searchResults.length > 0">
      <h2>
        Results <small>brought to you by <a href="http://konpa.github.io/devicon/" target="_blank" title="Devicon">Devicon</a></small>
      </h2>
      <v-layout column justify-center>
        <v-flex xs12 v-for="(skill, i) in searchResults" :key="`${skill.name}-${i}`">
          <h5 class="results-type">{{ skill.name }}</h5>
          <v-layout wrap justify-start>
            <v-flex sm6 class="text-xs-center" v-for="(icon, index) in skill.versions.font" :key="`icon-${index}`">
              <v-layout wrap justify-start>
                <v-flex sm6 class="pa-2">
                  <v-badge class="add-skill-badge" overlap >
                    <v-icon v-if="!checkIfCurrent(`${skill.name}-${icon}`)" 
                    slot="badge" dark small  
                    @click="addToCurrentSkills(`${skill.name}-${icon}`)"
                    >library_add</v-icon>
                    <v-icon v-else  slot="badge" dark small @click="removeFromCurrentSkills(`${skill.name}-${icon}`)" >close</v-icon>
                    <div class="pa-1 single-icon">
                      <i :class="`devicon-icon devicon-${skill.name}-${icon}`"></i>
                      <br>
                      <p>{{ icon }}</p>
                    </div>
                  </v-badge>
                </v-flex>
                <v-flex sm6 class="pa-2">
                  <v-badge class="add-skill-badge"  overlap  >
                    <v-icon v-if="!checkIfCurrent(`${skill.name}-${icon} colored`)"
                    slot="badge" dark small 
                    @click="addToCurrentSkills(`${skill.name}-${icon} colored`)"
                    >library_add</v-icon>
                    <v-icon v-else  slot="badge" dark small @click="removeFromCurrentSkills(`${skill.name}-${icon} colored`)" >close</v-icon>
                    <div class=" pa-1 single-icon">
                     <i :class="`devicon-icon devicon-${skill.name}-${icon} colored`"></i>
                     <br>
                     <p>{{ icon }} with color</p>
                   </div>
                 </v-badge>
               </v-flex>
             </v-layout>
           </v-flex>
         </v-layout>
       </v-flex>
     </v-layout>
   </div>
 </app-form-panel>
</template>

<script>
  import FormPanel from './FormPanel.vue';

  export default{
    props: ["portfolioSkills"],
    data(){
      return {
        allSkills: this.$store.state.allSkills,
        searchTerm: null,
        searchResults: [],
        currentSkills: this.portfolioSkills
      }
    },
    components:{
      appFormPanel: FormPanel
    },
    methods: {
      createSearchResults(){
        if(this.searchTerm){
          if(this.searchTerm.length >= 1){
            this.searchResults = this.allSkills.filter(skill=> skill.name.includes(this.searchTerm));
          } else {
            this.searchResults = [];
          }
        } else {
          this.searchResults = [];
        }
      },
      addToCurrentSkills(skill){
        this.currentSkills.push(skill);
      },
      removeFromCurrentSkills(skill){
        this.currentSkills.splice(this.currentSkills.indexOf(skill), 1);
      },
      checkIfCurrent(skill){
        return this.currentSkills.includes(skill);
      }
    }
  }

</script>

<style scoped>
.results-type{
  font-size: 1.25em;
  margin-bottom: 10px;
}
.single-icon{
  border: 1px solid #ccc;
  border-radius: 3px;
}
.v-badge{
  width: 100%;
}

.add-skill-badge .v-badge__badge i.v-icon:hover{
  transform: scale(1.15);
  cursor: pointer;
}

h2 small{
  font-size: 11px;
  color: #aaa;
}
</style>
