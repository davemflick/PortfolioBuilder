<template>
  <div class="container">
    <h1>Home Page</h1>
  </div>
</template>

<script>
  import PortfolioService from '@/services/PortfolioService';
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
      console.log(this.user, this.portfolio);

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
