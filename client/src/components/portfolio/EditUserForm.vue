<template>
  <app-form-panel title="User Information" v-if="user" >
    <form id="edit-user-form">
      <v-layout wrap>
        <v-flex xs12 sm6 pr-1>
          <v-text-field type="text" label="First Name" v-model="user.name.first"></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 pl-1>
          <v-text-field type="text" label="Last Name" v-model="user.name.last"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout wrap>
        <v-flex xs12 sm6 pr-1>
          <v-text-field type="text" label="Username" v-model="user.username"></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 pr-1>
          <v-text-field type="email" label="Email" v-model="user.email"></v-text-field>
        </v-flex>
      </v-layout>
      <br>
      <div v-if="error" class="error-alert">{{ error }}</div>
      <br>
      <v-btn dark color="primary" @click="updateUser">Update</v-btn>
    </form>
  </app-form-panel>
</template>

<script>

  import appFormPanel from '../universal/FormPanel.vue';
  
  export default {
    props: ['user'],
    data(){
      return {
        error: null
      }
    },
    components:{
      appFormPanel
    },
    methods:{
      updateUser(){
        console.log(this.user);
      }
    }
  }
  </script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>

</style>
