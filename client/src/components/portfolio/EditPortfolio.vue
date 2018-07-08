<template>
  <v-container>
    <app-edit-user v-if="user" :user="user"></app-edit-user>
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
      if(!this.$store.state.userLoggedIn){
        this.$router.push({name: 'Portfolio', params: {username}});
        return;
      }
      
      const userData = await PortfolioService.findPortfolio(username);
      const portfolio = userData.data.portfolio;
      const user = userData.data.user;
      this.portfolio = portfolio;
      if(this.$store.state.user.username !== user.username){
         this.$router.push({name: 'Portfolio', params: {username}});
         return;
      }
      this.user = user;

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
