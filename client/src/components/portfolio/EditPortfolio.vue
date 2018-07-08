<template>
  <v-container>
    <app-edit-user v-if="user"></app-edit-user>
    <br><br>
    <app-edit-portfolio v-if="portfolio" :portfolio="portfolio"></app-edit-portfolio>
  </v-container>
</template>

<script>
  import PortfolioService from '@/services/PortfolioService';
  import appEditUser from './EditUserForm.vue';
  import appEditPortfolio from './EditPortfolioForm.vue';
  export default {
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
      console.log(portfolio);

    },
    components:{
      appEditUser,
      appEditPortfolio
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
