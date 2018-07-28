<template>
  <v-container>
    <app-edit-user v-if="user" :user="user" :portfolioId="portfolio._id"></app-edit-user>
    <br><br>
    <app-edit-portfolio v-if="portfolio" :portfolio="portfolio"></app-edit-portfolio>
    <br><br>
    <app-skills v-if="portfolio" :portfolio="portfolio"></app-skills>
  </v-container>
</template>

<script>
  import PortfolioService from '@/services/PortfolioService';
  import appEditUser from './UserForm.vue';
  import appEditPortfolio from './PortfolioForm.vue';
  import appSkills from '../../universal/Skills.vue';
  
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
      if(!userData.data.ok){
        this.$router.push({name: 'Portfolio', params: {username}});
        return;
      }
      const portfolio = userData.data.portfolio;
      const user = userData.data.user;
      this.portfolio = portfolio;
      if(this.$store.state.user.username !== user.username){
         this.$router.push({name: 'Portfolio', params: {username}});
         return;
      }
      this.user = user;
      console.log({user, portfolio})

    },
    components:{
      appEditUser,
      appEditPortfolio,
      appSkills
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
