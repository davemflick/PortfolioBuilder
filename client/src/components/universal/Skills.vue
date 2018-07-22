<template>
  <app-form-panel :title="'Skills'">
    <v-layout wrap>
      <v-flex xs-12 class="p-2">
        <v-text-field
        hide-details
        prepend-icon="search"
        v-model="searchTerm"
        @keyup="createSearchResults"
        single-line
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout v-if="searchResults.length > 0">
      <v-flex xs-6 sm-3 v-for="skill in searchResults" :key="skill.name">
        <p>{{ skill.name }}</p>
      </v-flex>
    </v-layout>
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
          if(this.searchTerm.length > 1){
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

</style>
