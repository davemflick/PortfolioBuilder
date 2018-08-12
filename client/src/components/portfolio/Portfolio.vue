<template>
	<div>
		<v-container>
			<v-progress-linear v-show="!pageLoaded" :indeterminate="true"></v-progress-linear>
			<v-card v-if="portfolioUser && portfolio" :style="`font-family: ${portfolio.styles.fontFamily}`">
				<v-card-media v-if="portfolio.styles.banner" :src="`http://localhost:8081/${portfolio.styles.banner}`" height="250px"></v-card-media>
				<v-card-media v-else :src="defaultBanner" height="250px"></v-card-media>
				<v-layout wrap>
					<v-flex xs8 sm4 md3 offset-xs2 offset-sm4 offset-md0 class="px-1" id="image-card-container">
						<app-portfolio-image-card :portfolio="portfolio" v-on:showEmail="showEmail"></app-portfolio-image-card>
					</v-flex>
					<v-flex xs12 md9 class="pa-3">
						<h1>{{ portfolioUser.name.first }} {{ portfolioUser.name.last }}</h1>
						<h3 class="mb-3"><em>{{ portfolioUser.email }}</em></h3>
						<p id="about-user">{{ portfolio.aboutUser }}</p>
					</v-flex>
				</v-layout>
				<v-layout column class="pa-3">
					<app-all-projects v-on:open="openSingleProject" :projects="portfolio.projects"></app-all-projects>
					<br><br>
					<app-all-skills :skills="portfolio.skills"></app-all-skills>
					<br><br>
					<app-all-certs :certs="portfolio.certifications" v-on:open="openSingleCert"></app-all-certs>
				</v-layout>
			</v-card>
			<h1 v-show="noPortfolioFound.status" class="text-xs-center">
				{{ noPortfolioFound.msg }}<br>
				Go <router-link tag="a" to="/"><a title="Go Home">Home</a></router-link>
			</h1>
			<app-project-modal :project="projectTarget" :isOpen="projectModal" v-on:close="projectModal = false; projectTarget = null;"></app-project-modal>
			<app-cert-modal :cert="certTarget" :isOpen="certModal" v-on:close="certModal = false; certTarget = null;"></app-cert-modal>
			<app-email-form v-if="portfolioUser" :emailSheet="emailSheet" :user="portfolioUser" v-on:close="showEmail"></app-email-form>
		</v-container>
	</div>
</template>

<script>
	import PortfolioService from '@/services/PortfolioService';
	import appFormPanel from '../universal/FormPanel.vue';
	import appEmailForm from '../universal/EmailForm.vue';
	import defaultProfileImg from '@/assets/images/emptyProfile.png';
	import defaultBanner from '@/assets/images/default-banner.png';
	import defaultProject from '@/assets/images/default-project.png';
	import appPortfolioImageCard from './PortfolioImageCard.vue'
	import appAllProjects from './AllProjects.vue'
	import appProjectModal from './ProjectModal.vue'
	import appAllSkills from './AllSkills.vue'
	import appAllCerts from './AllCerts.vue'
	import appCertModal from './CertModal.vue'

	export default{
		data(){
			return {
				loggedInUser: null,
				portfolio: null,
				portfolioUser: null,
				defaultProfileImg: defaultProfileImg,
				defaultBanner: defaultBanner,
				defaultProject: defaultProject,
				projectTarget: null,
				projectModal: false,
				certTarget: null,
				certModal: false,
				noPortfolioFound: {
					status: false,
					msg: null
				},
				pageLoaded: false,
				emailSheet: false
			}
		},
		components:{
			appPortfolioImageCard,
			appProjectModal,
			appAllProjects,
			appAllSkills,
			appAllCerts,
			appCertModal,
			appEmailForm
		},
		methods:{
			setNoPortfolioMsg(msg){
				this.pageLoaded = true;
				this.noPortfolioFound.status = true;
				this.noPortfolioFound.msg = msg;
			},
			openSingleProject(project){
				this.projectTarget = project;
				this.projectModal = true;
			},
			openSingleCert(cert){
				this.certTarget = cert;
				this.certModal = true;
			},
			showEmail(){
				this.emailSheet = !this.emailSheet;
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

h1{
	font-size: 2.25em;
}


#image-card-container{
	position: relative;
	min-height: 200px;
}

img.img-responsive{
	max-width: 100%;
}

#about-user{
	font-size: 1.2em;
}

@media (min-width: 600px) and (max-width: 750px){
	#image-card-container{
		min-height: 110px;
	}
}

@media (min-width: 455px) and (max-width: 599px){
	#image-card-container{
		min-height: 200px;
	}
}

@media screen and (max-width: 600px){
	.container{
		padding: 0;
	}
}

@media screen and (max-width: 425px){
	#image-card-container{
		min-height: 130px;
	}
}

</style>
