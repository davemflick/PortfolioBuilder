<template>
	<div>
		<v-jumbotron style="height: 250px;">
			<v-container fill-height>
				<v-layout align-center text-xs-center>
					<v-flex>
						<h3 class="display-2">Welcome to PortBuilder<span v-if="user"> {{ user.name.first }}</span>!</h3>
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
		<v-stepper v-model="stage" vertical>
			<v-stepper-step :complete="stage > 1" step="1">
				Basic Information
			</v-stepper-step>

			<v-stepper-content step="1">
				<v-card color="grey lighten-1" class="mb-5">
					<app-stage-one :portfolioId="portfolioId" :profilePictures="portfolioPictures" v-on:next="nextStage"></app-stage-one>
				</v-card>
			</v-stepper-content>

			<v-stepper-step :complete="stage > 2" step="2">Add a Project</v-stepper-step>

			<v-stepper-content step="2">
				<v-card color="grey lighten-1" class="mb-5">
					<app-stage-two :portfolioId="portfolioId"></app-stage-two>
				</v-card>
			</v-stepper-content>
		</v-stepper>
	</div>
</template>

<script>
	import PortfolioService from '@/services/PortfolioService';
	import appFormPanel from '../../universal/FormPanel.vue';
	import appStageOne from './StageOne.vue';
	import appStageTwo from './StageTwo.vue';

	export default{
		data(){
			return {
				user: null,
				error: null,
				portfolioId: null,
				portfolioPictures: null,
				stage: 1
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
			console.log(portfolio)
			//UNCOMMENT THIS WHEN DONE!!
			/*if(portfolio.isSetUp){
				this.$router.push({name: 'Portfolio', params: {username}});
				return;
			}*/
			this.portfolioId = portfolio._id;
			this.portfolioPictures = portfolio.profilePicture
		},
		methods:{
			nextStage(){
				this.stage++;
			}
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