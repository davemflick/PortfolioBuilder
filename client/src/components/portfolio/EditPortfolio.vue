<template>
  <v-container>
    <app-form-panel title="User Information" v-if="user">
      <form id="login-form">
        <v-layout wrap>
          <v-flex xs12 sm6 pr-1>
            <v-text-field type="text" label="First Name" required v-model="user.name.first"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 pl-1>
            <v-text-field type="text" label="Last Name" required v-model="user.name.last"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout wrap>
          <v-flex xs12 sm6 pr-1>
            <v-text-field type="text" label="Username" required v-model="user.username"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 pr-1>
            <v-text-field type="email" label="Email" required v-model="user.email"></v-text-field>
          </v-flex>
        </v-layout>
      </v-layout>
    </form>
  </app-form-panel>
</v-container>
</template>

<script>
  import PortfolioService from '@/services/PortfolioService';
  import appFormPanel from '../universal/FormPanel.vue';
  export default {
    name: 'HelloWorld',
    data () {
      return {
        user: null,
        portfolio: null
      }
    },
    async mounted(){
      const username= this.$store.state.route.params.username;
      if(this.$store.state.userLoggedIn){
        this.user = this.$store.state.user;
      } else {
        this.$router.push({name: 'Portfolio', params: {username}});
      }
      
      const userData = await PortfolioService.findPortfolio(username);
      const portfolio = userData.data.portfolio;
      this.portfolio = portfolio;

    },
    components:{
      appFormPanel
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
