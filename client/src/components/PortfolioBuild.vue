<template>
	<div>
	 <v-jumbotron>
    <v-container fill-height>
      <v-layout align-center text-xs-center>
        <v-flex>
          <h3 class="display-3">Welcome to PortBuilder<span v-if="user"> {{ user.name.first }}</span>!</h3>
          <p>
          	Let's get started by creating your profile.
          </p>
          <p class='error-alert' v-if="error">
          	{{ error }}
          </p>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
  <v-container id="build-stage" v-if="!error && buildStage">
  	<h2>Pull stage {{ buildStage }}</h2>
  </v-container>
</div>
</template>

<script>
	import PortfolioService from '@/services/PortfolioService';
	import appFormPanel from './universal/FormPanel.vue';

	export default{
		data(){
			return {
				user: null,
				buildStage: null,
				error: null
			}
		},
		async mounted(){
			const username= this.$store.state.route.params.username;
			const buildState = this.$store.state.route.params.build;
			if(this.$store.state.userLoggedIn){
				this.user = this.$store.state.user;
			} else {
				this.$router.push({name: 'Portfolio', params: {username}});
			}
			
			const userData = await PortfolioService.findPortfolio(username);
			const portfolio = userData.data.portfolio;
			console.log(portfolio)
			if(portfolio.isSetUp){
				this.$router.push({name: 'Portfolio', params: {username}});
				return;
			}
			const stage = !portfolio.setUpStage.one ? 'one' : !portfolio.setUpStage.two ? 'two' : null;
			if(!stage){
				this.error = "Error finding build stage."
				return;
			}
			this.buildStage = stage;

		}
	}
</script>
<style scoped>
.error-alert{
	text-align: center;
	color: #dd1212;
}

</style>