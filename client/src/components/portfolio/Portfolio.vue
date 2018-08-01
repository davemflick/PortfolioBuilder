<template>
	<v-container>
		<v-progress-linear v-show="!pageLoaded" :indeterminate="true"></v-progress-linear>
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
		<h1 v-show="noPortfolioFound.status" class="text-xs-center">
			{{ noPortfolioFound.msg }}<br>
			Go <router-link tag="a" to="/"><a title="Go Home">Home</a></router-link>
		</h1>
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
				defaultProfileImg: defaultProfileImg,
				noPortfolioFound: {
					status: false,
					msg: null
				},
				pageLoaded: false
			}
		},
		methods:{
			setNoPortfolioMsg(msg){
				this.pageLoaded = true;
				this.noPortfolioFound.status = true;
				this.noPortfolioFound.msg = msg;
			}
		},
		async mounted(){
			const username = this.$store.state.route.params.username
			//If route does not contain a username parameter
			if(!username){
				this.$router.push({name: 'Home'});
				return;
			}
			if(this.$store.state.userLoggedIn){
				this.loggedInUser = this.$store.state.user;
			}

			try{
				const portfolio = await PortfolioService.findPortfolio(username);
				//Check to make sure a portfolio associated to username is found
				if(!portfolio.data.portfolio){
					console.log('Portfolio not found');
					this.setNoPortfolioMsg("Portfolio not found.");
					return;
				} else {
					//Make sure portfolio is active
					if(!portfolio.data.portfolio.isActive){
						this.setNoPortfolioMsg("User has deactivated their portfolio.");
						return;
					} else {
						this.portfolio = portfolio.data.portfolio;
					}
				}
				//Check to make sure a user associated to username is found
				if(!portfolio.data.user){
					this.setNoPortfolioMsg("User account not found.")
				} else {
					this.portfolioUser = portfolio.data.user;
				}
				//Stop page loader if both a portfolio and user are found
				if(this.portfolio && this.portfolioUser){
					this.pageLoaded = true;
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
