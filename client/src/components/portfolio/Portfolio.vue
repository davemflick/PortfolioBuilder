<template>
	<div>
		<v-container>
			<v-progress-linear v-show="!pageLoaded" :indeterminate="true"></v-progress-linear>
			<v-card v-if="portfolioUser && portfolio">
				<v-card-media :src="defaultBanner" height="250px"></v-card-media>
				<v-layout wrap>
					<v-flex xs8 sm4 md3 offset-xs2 offset-sm4 offset-md0 class="px-1" id="image-card-container">
						<v-card class="pa-2 text-xs-center" id="image-card">
							<img class="img-responsive" v-if="portfolio.profilePicture.length > 0"  :src="'http://localhost:8081/' + portfolio.profilePicture.find((p)=>{return p.isMain}).path" />
							<img class="img-responsive" v-else :src="defaultProfileImg" />
							<br>
							<h2>{{ portfolioUser.name.first }} {{ portfolioUser.name.last }}</h2>
							<div class="other-portfolios">
								<a class="op-link mx-2" v-if="portfolio.otherProfiles.github" :href="portfolio.otherProfiles.github" target="_blank"><i class="fa fa-github fa-2x"></i></a>
								<a class="op-link mx-2" v-if="portfolio.otherProfiles.linkedin" :href="portfolio.otherProfiles.linkedin" target="_blank"><i class="fa fa-linkedin fa-2x"></i></a>
								<a class="op-link mx-2" v-if="portfolio.otherProfiles.otherPortfolio" :href="portfolio.otherProfiles.otherPortfolio" target="_blank"><i class="fa fa-user fa-2x"></i></a>
							</div>
						</v-card>
					</v-flex>
					<v-flex xs12 md9 class="px-1">
						<p>{{ portfolio.aboutUser }}</p>
					</v-flex>
				</v-layout>
			</v-card>

			<h1 v-show="noPortfolioFound.status" class="text-xs-center">
				{{ noPortfolioFound.msg }}<br>
				Go <router-link tag="a" to="/"><a title="Go Home">Home</a></router-link>
			</h1>
		</v-container>
	</div>
</template>

<script>
	import PortfolioService from '@/services/PortfolioService';
	import appFormPanel from '../universal/FormPanel.vue';
	import defaultProfileImg from '@/assets/images/emptyProfile.png';
	import defaultBanner from '@/assets/images/default-banner.png';

	export default{
		data(){
			return {
				loggedInUser: null,
				portfolio: null,
				portfolioUser: null,
				defaultProfileImg: defaultProfileImg,
				defaultBanner: defaultBanner,
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

#image-card-container{
	position: relative;
	min-height: 220px;
}

#image-card{
	position: absolute;
	top: -155px;
	box-shadow: none;
	border-top-left-radius: 7px;
	border-top-right-radius: 7px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-content: center;
	align-items: center;
}

.jtron{
	background-position: center !important;
	background-size: cover !important;
}
.error-alert{
	text-align: center;
	color: #dd1212;
}

img.img-responsive{
	max-width: 100%;
	border-radius: 7px;
}

.v-card>:first-child:not(.v-btn):not(.v-chip).img-responsive {
	border-top-left-radius: 7px;
	border-top-right-radius: 7px;
}

.op-link{
	outline: none;
	text-decoration: none;
}
.op-link .fa-github{
	color: #202529;
}
.op-link .fa-linkedin{
	color: #006CAC;
}
.op-link .fa-user{
	color: #243641;
}

@media (min-width: 600px) and (max-width: 750px){
	#image-card-container{
		min-height: 150px;
	}
}

@media (min-width: 455px) and (max-width: 599px){
	#image-card-container{
		min-height: 250px;
	}
}

@media screen and (max-width: 600px){
	.container{
		padding: 0;
	}
}

@media screen and (max-width: 425px){
	#image-card-container{
		min-height: 180px;
	}
}

</style>
