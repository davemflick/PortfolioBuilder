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
      <div v-if="error" class="error-alert alert">{{ error }}</div>
      <div v-if="successfulUpdate" class="success-alert alert">{{ successfulUpdate }}</div>
      <br>
      <v-btn dark color="primary" @click="updateUser">Update</v-btn>
    </form>
  </app-form-panel>
</template>

<script>

  import appFormPanel from '../universal/FormPanel.vue';
  import UserService from '@/services/UserService.js';
  
  export default {
    props: ['user', 'portfolioId'],
    data(){
      return {
        error: null,
        successfulUpdate: null
      }
    },
    components:{
      appFormPanel
    },
    methods:{
      async updateUser(){
        this.error = null;
        this.successfulUpdate = null;
        let userData = this.user
        let updateData = {
          userId: userData._id,
          user: {
            email: userData.email,
            name: userData.name,
            username: userData.username
          },
          portfolioId: this.portfolioId
        }
        const updatedUser = await UserService.updateUserInfo(updateData);
        var updatedData = updatedUser.data;
        if(!updatedData.ok){
          this.error = '500 internal server error. User did not update';
          return;
        }
        this.$store.dispatch('setUser', updatedData.user);
        this.successfulUpdate = 'User data updated!';
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
