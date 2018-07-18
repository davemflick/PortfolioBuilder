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
  <v-container fluid id="build-stage" v-if="!error && buildStage">
  	<app-stage-one v-if="buildStage === 'one'" :portfolioId="portfolioId" :profilePictures="portfolioPictures"></app-stage-one>
  	<app-stage-two v-if="buildStage === 'two'" :portfolioId="portfolioId"></app-stage-two>
  </v-container fluid>
</div>
</template>

<script>
	import PortfolioService from '@/services/PortfolioService';
	import appFormPanel from '../universal/FormPanel.vue';
	import appStageOne from './PortfolioBuildStageOne.vue';
	import appStageTwo from './PortfolioBuildStageTwo.vue';

	export default{
		computed: {
			buildStage: {
				get(){
					return this.$store.state.buildStage;
				},
				set(stage){
					this.$store.dispatch('setBuildStage', stage);
				}
			}
		},
		data(){
			return {
				user: null,
				error: null,
				portfolioId: null,
				portfolioPictures: null
			}
		},
		async mounted(){
			console.log(this.buildStage);
			const username= this.$store.state.route.params.username;
			if(this.$store.state.userLoggedIn){
				this.user = this.$store.state.user;
			} else {
				this.$router.push({name: 'Portfolio', params: {username}});
			}
			
			const userData = await PortfolioService.findPortfolio(username);
			const portfolio = userData.data.portfolio;
			console.log(portfolio)

			this.portfolioId = portfolio._id;
			/*if(portfolio.isSetUp){
				this.$router.push({name: 'Portfolio', params: {username}});
				return;
			}*/
			this.portfolioPictures = portfolio.profilePicture
			const stage = !portfolio.setUpStage.one ? 'two' : !portfolio.setUpStage.two ? 'two' : null;
			if(!stage){
				this.error = "Error finding build stage."
				return;
			}
			this.$store.dispatch('setBuildStage', stage)
			this.buildStage = this.$store.state.buildStage;

		},
		components:{
			appStageOne,
			appStageTwo
		}
	}
</script>
<style scoped>
.error-alert{
	text-align: center;
	color: #dd1212;
}
#build-stage{
	background-color: #fff;
}

</style>