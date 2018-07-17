<template>
	<v-container>
		<v-layout wrap v-if="portfolioUser && portfolio">
			<v-flex xs12 sm4>
				<v-avatar :size="150" :tile="true">
					<img v-if="portfolio.profilePicture.length > 0"
							 :src="'http://localhost:8081/' + portfolio.profilePicture.find((p)=>{return p.isMain}).path" />
					<img v-else :src="defaultProfileImg" />
				</v-avatar>
			</v-flex>
			<v-flex xs12 sm8>
				<h2>{{ portfolioUser.name.first }} {{ portfolioUser.name.last }}</h2>
				<p>{{ portfolio.aboutUser }}</p>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
	import PortfolioService from '@/services/PortfolioService';
	import appFormPanel from '../universal/FormPanel.vue';
	import defaultProfileImg from '@/assets/emptyProfile.png';

	export default{
		data(){
			return {
				loggedInUser: null,
				portfolio: null,
				portfolioUser: null,
				defaultProfileImg: defaultProfileImg
			}
		},
		async mounted(){
			const username= this.$store.state.route.params.username
			if(!username){
				this.$router.push({name: 'Home'});
				return;
			}
			if(this.$store.state.userLoggedIn){
				this.loggedInUser = this.$store.state.user;
			}
			try{
				const portfolio = await PortfolioService.findPortfolio(username);
				if(!portfolio.data.portfolio){
					console.log('Portfolio not found');
				} else {
					this.portfolio = portfolio.data.portfolio;
				}
				if(!portfolio.data.user){
					console.log('Portfolio User not found');
				} else {
					this.portfolioUser = portfolio.data.user;
				}
				console.log(portfolio);
			}catch(error){
				if(error){
					console.log(error);
				}
			}
		}
	}
</script>
<style scoped>
.error-alert{
	text-align: center;
	color: #dd1212;
}

</style>
