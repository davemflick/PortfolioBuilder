<template>
  <app-form-panel :title="'Skills'">
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
      <v-layout column justify-space-between>
        <v-flex xs12 v-for="skill in searchResults" :key="skill.name">
          <h5 class="results-type">{{ skill.name }}</h5>
          <v-layout wrap justify-space-between>
            <v-flex sm6 class="text-xs-center" v-for="icon in skill.versions.font" :key="icon">
              <v-layout wrap justify-space-between>
                <v-flex sm6 class="pa-2">
                  <div class="pa-1 single-icon">
                    <i :class="`devicon-icon devicon-${skill.name}-${icon}`"></i>
                    <br>
                    <p>{{ icon }}</p>
                  </div>
                </v-flex>
                <v-flex sm6 class="pa-2">
                  <div class=" pa-1 single-icon">
                   <i :class="`devicon-icon devicon-${skill.name}-${icon} colored`"></i>
                   <br>
                   <p>{{ icon }} with color</p>
                 </div>
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
    data(){
      return {
        allSkills: this.$store.state.allSkills,
        searchTerm: null,
        searchResults: []
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

h2 small{
  font-size: 11px;
  color: #aaa;
}
</style>
