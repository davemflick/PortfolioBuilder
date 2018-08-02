<template>
  <div id="app">
    <v-app>
      <app-header></app-header>
      <v-content>
        <v-container fluid>
          <router-view/>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
  import appHeader from './components/universal/Header.vue';
  import AuthService from './services/AuthenticationService.js';

  export default {
    name: 'App',
    components: {
      appHeader
    },
    async mounted(){
      try{
        if(this.$store.state.token){
          const tokenIsValid = await AuthService.checkToken(this.$store.state.token);
          console.log(tokenIsValid.data)
          if(!tokenIsValid.data.ok){
            this.$store.dispatch('setUser', null);
            this.$store.dispatch('setToken', null);
          }
        }
    } catch(error){
      console.log("ERROR in checking token expiration");
    }
  }
}
</script>

<style>
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
.devicon-icon{
  font-size: 6em;
}
.v-jumbotron__image{
  min-width: 100px;
  max-width: 100%;
}

@media screen and (max-width: 600px){
  .v-bottom-nav{
    flex-wrap: wrap;
    height: 112px !important;
  }
  .v-bottom-nav button.v-btn{
    max-height: 50px;
    max-width: 32%;
  }
}


</style>
