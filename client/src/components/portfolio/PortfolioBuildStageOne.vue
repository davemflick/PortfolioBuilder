<template>
	<app-form-panel title="Add Some Information" >
		<form id="login-form">
			<v-textarea label="About You" v-model="portfolioData.aboutUser"></v-textarea>
			<br><br>
			<v-btn @click="openUploadModal({type: 'portfolioImage', _id: portfolioId})">Add Portfolio Image</v-btn>
		</form>
		<br>
		<div v-if="error" class="error-alert">{{ error }}</div>
		<br>
		<v-btn dark color="primary" @click="completeStageOne">Next Step</v-btn>
		<v-dialog v-model="uploadModal" width="500" >
			<app-file-uploader :uploadTarget="uploadTarget" ref="fileUploadComponent" v-on:close="closeUploadModal"></app-file-uploader>
		</v-dialog>
	</app-form-panel>
</template>

<script>
	import appFormPanel from '../universal/FormPanel.vue';
	import PortfolioService from '@/services/PortfolioService.js';
	import appFileUploader from '../universal/FileUploader.vue';
	export default{
		props: ['portfolioId', 'profilePictures'],
		data(){
			return {
				portfolioData:{
					aboutUser: null,
					profilePicture: null,
					setUpStage: {
						one: true,
						two: false
					}
				},
				profilePicturePath: null,
				error: null,
				uploadModal: false,
				uploadTarget: null
			}
		},
		components:{
			appFormPanel,
			appFileUploader
		},
		watch:{
			uploadModal(){
				if(!this.uploadModal){
					this.uploadTarget = null;
					this.$refs.fileUploadComponent.clearUploader();
				}
			}
		},
		methods: {
			async completeStageOne(){
				try{
					const portfolioUpdate = await PortfolioService.updatePortfolio(this.portfolioId, this.portfolioData);
					console.log(portfolioUpdate);
					if(!portfolioUpdate.data.Ok){
						this.error = "Error updating portfolio";
						return;
					} else {
						this.$store.dispatch('setBuildStage', 'two');
						this.$router.push({name: 'PortfolioBuild', params: {stage: 'two'}});
					}
				}catch(error){
					console.log("ERROR", error);
					this.error = error;
				}
			},
			openUploadModal(targetData){
				targetData.currentPictures = [];
				console.log(targetData);
				this.uploadTarget = targetData
				this.uploadModal = true;
			},
			closeUploadModal(){
        this.uploadModal = false;
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