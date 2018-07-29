<template>
  <v-container v-if="portfolio && user">
    <transition name="slide" mode="out-in">
      <app-edit-user v-if="bottomNav === 'user'" :user="user" :portfolioId="portfolio._id"></app-edit-user>
      <app-edit-portfolio  v-if="bottomNav === 'portfolio'" :portfolio="portfolio"></app-edit-portfolio>
      <app-skills v-if="bottomNav === 'skills'" :portfolio="portfolio"></app-skills>
      <app-certs  v-if="bottomNav === 'certs'" :portfolio="portfolio"></app-certs>
    </transition>
    <v-bottom-nav
    :active.sync="bottomNav"
    :value="true"
    fixed
    color="primary"
    >
    <v-btn color="white" flat value="user" >
      <span>User</span>
      <v-icon>history</v-icon>
    </v-btn>

    <v-btn color="white" flat value="portfolio" >
      <span>Portfolio</span>
      <v-icon>favorite</v-icon>
    </v-btn>

    <v-btn color="white" flat value="skills" >
      <span>Skills</span>
      <v-icon>place</v-icon>
    </v-btn>

    <v-btn color="white" flat value="certs" >
      <span>Certs</span>
      <v-icon>place</v-icon>
    </v-btn>
  </v-bottom-nav>
</v-container>
</template>

<script>
  import PortfolioService from '@/services/PortfolioService';
  import appEditUser from './UserForm.vue';
  import appEditPortfolio from './PortfolioForm.vue';
  import appCerts from './Certs.vue';
  import appSkills from '../../universal/Skills.vue';
  
  export default {
    data () {
      return {
        user: null,
        portfolio: null,
        bottomNav: 'user'
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
    appCerts,
    appSkills
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.delete-badge{
  cursor: pointer;
  transform: rotate(0deg);
  transition: transform .35s linear;
}
.delete-badge:hover{
  cursor: pointer;
  transform: rotate(180deg);
}
.slide-enter-active {
  animation: slide-in .5s;
}
.slide-leave-active {
  animation: slide-out .5s;
}
@keyframes slide-in {
  0% {
    transform: translateX(-200%);
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes slide-out {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(200%);
  }
}

</style>
