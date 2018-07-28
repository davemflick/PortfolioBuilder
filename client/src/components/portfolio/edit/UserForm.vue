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
          <v-text-field :error="!validEmail" type="email" label="Email" v-model="user.email"></v-text-field>
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

  import appFormPanel from '../../universal/FormPanel.vue';
  import UserService from '@/services/UserService.js';
  
  export default {
    props: ['user', 'portfolioId'],
    data(){
      return {
        error: null,
        successfulUpdate: null,
        email: this.user.email,
        validEmail: true
      }
    },
    components:{
      appFormPanel
    },
    methods:{
      validate(type, value){
        const validations = {
          email: {
            re: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            required: true
          }
        }
        if(!value){
          return !validations[type].required
        }
        return validations[type].re.test(value.toLowerCase());
      },
      async updateUser(){
        this.error = null;
        this.successfulUpdate = null;
        this.validEmail = true;
        let userData = this.user
        
        if(!this.validate( 'email', userData.email)){
          this.error = "Invalid Email Address";
          this.validEmail = false;
          return false;
        }
        let updateData = {
          userId: userData._id,
          user: {
            email: userData.email,
            name: userData.name,
            username: userData.username
          },
          portfolioId: this.portfolioId
        }
        try{
          const updatedUser = await UserService.updateUserInfo(updateData);
          var updatedData = updatedUser.data;
          if(!updatedData.ok){
            this.error = '500 internal server error. User did not update';
            return;
          }
          this.$store.dispatch('setUser', updatedData.user);
          this.successfulUpdate = 'User data updated!';
        }catch(error){
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
