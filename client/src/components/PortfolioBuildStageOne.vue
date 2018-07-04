<template>
	<app-form-panel title="Add Some Information" >
		<form id="login-form">
			<v-textarea label="About You" v-model="portfolioData.aboutUser"></v-textarea>
			<v-text-field type="text" label="Profile Picture" v-model="profilePicturePath"></v-text-field>
		</form>
		<br>
		<div v-if="error" class="error-alert">{{ error }}</div>
		<br>
		<v-btn dark color="primary" @click="completeStageOne">Next Step</v-btn>
	</app-form-panel>
</template>

<script>
	import appFormPanel from './universal/FormPanel.vue';
	import PortfolioService from '@/services/PortfolioService.js';
	export default{
		props: ['portfolioId', 'profilePictures'],
		data(){
			return {
				portfolioData:{
					aboutUser: null,
					profilePicture: null
				},
				profilePicturePath: null,
				error: null
			}
		},
		components:{
			appFormPanel
		},
		methods: {
			async completeStageOne(){
				const pics =  [];
				if(this.profilePictures){
					this.profilePictures.forEach((pic)=> {
						if(pic){
							pic.isMain = false;
							pics.push(pic);
						}
					});
				}
				pics.push({path: this.profilePicturePath, isMain: true});
				this.portfolioData.profilePicture = pics;
				try{
					const portfolioUpdate = await PortfolioService.updatePortfolio(this.portfolioId, this.portfolioData);
					console.log(portfolioUpdate);
				}catch(error){
					console.log("ERROR", error);
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